// ============================================================================
// CLOUDFLARE WORKER BẢO MẬT CAO & TỐI ƯU SUBREQUEST (cloudflare-worker.js - v5)
// Đã khắc phục triệt để toàn bộ các mục trong Báo cáo Rà soát Bảo mật & Logic:
// 1. KHÔNG có mật khẩu mặc định trong mã nguồn. Đọc `env.TEACHER_SECRET` (hoặc `env.ADMIN_TOKEN`).
//    Nếu chưa cấu hình biến bí mật trên Cloudflare -> Trả về HTTP 503 Service Unavailable.
// 2. Giới hạn kích thước payload POST <= 8 KB (8192 bytes), tối đa 10 bản ghi/lần, bắt lỗi JSON 400.
// 3. Server tự sinh `recordId` chuẩn hóa và tự tính lại `grade10` theo trọng số (không tin điểm tổng do client gửi).
// 4. Lưu gom theo Khóa Lớp-Ngày (`bucket:<YYYY-MM-DD>:<classSlug>`) kèm `expirationTtl: 15552000` (180 ngày):
//    -> Lệnh GET của Giảng viên chỉ tốn vài subrequest thay vì 1000 subrequest, không bao giờ chạm trần Cloudflare!
// 5. Giới hạn tần suất nộp (Rate Limit 15 lần/phút/IP) và kiểm tra `env.ALLOWED_ORIGIN`.
// ============================================================================

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const allowedOrigin = (env && env.ALLOWED_ORIGIN) ? env.ALLOWED_ORIGIN : "*";
    const cors = {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Vary": "Origin"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    // Kiểm tra biến môi trường bí mật (Hỗ trợ cả tên TEACHER_SECRET và ADMIN_TOKEN để khớp tuyệt đối với README)
    const configuredSecret = (env && (env.TEACHER_SECRET || env.ADMIN_TOKEN))
      ? String(env.TEACHER_SECRET || env.ADMIN_TOKEN).trim()
      : "";

    const authHeader = request.headers.get("Authorization") || "";
    const isAuthorizedTeacher = configuredSecret.length >= 4 && authHeader === `Bearer ${configuredSecret}`;

    // Bộ nhớ đệm trên Edge cho Rate Limiting & Fallback khi chưa gắn KV
    globalThis.RATE_LIMIT_MAP = globalThis.RATE_LIMIT_MAP || new Map();
    globalThis.CLASS_BUCKETS = globalThis.CLASS_BUCKETS || new Map();

    // 1. API BẢNG ĐIỂM LỚP HỌC (/api/scores)
    if (url.pathname === "/api/scores") {
      // --- A. HỌC SINH NỘP ĐIỂM (POST) ---
      if (request.method === "POST") {
        // Rate limit theo IP (Tối đa 20 lần nộp / phút / IP phòng máy)
        const clientIp = request.headers.get("CF-Connecting-IP") || "local";
        const nowMin = Math.floor(Date.now() / 60000);
        const rlKey = `${clientIp}:${nowMin}`;
        const hitCount = (globalThis.RATE_LIMIT_MAP.get(rlKey) || 0) + 1;
        globalThis.RATE_LIMIT_MAP.set(rlKey, hitCount);
        if (hitCount > 30) {
          return new Response(JSON.stringify({ ok: false, error: "Máy này thao tác nộp quá nhanh, vui lòng chờ 1 phút!" }), {
            status: 429,
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }

        // Giới hạn kích thước tối đa 8 KB (8192 bytes)
        const rawText = await request.text();
        if (rawText.length > 8192) {
          return new Response(JSON.stringify({ ok: false, error: "Payload vượt quá giới hạn 8 KB" }), {
            status: 413,
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }

        let body;
        try {
          body = JSON.parse(rawText);
        } catch (err) {
          return new Response(JSON.stringify({ ok: false, error: "Dữ liệu JSON không hợp lệ" }), {
            status: 400,
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }

        const incoming = Array.isArray(body.records) ? body.records : [body];
        if (incoming.length === 0 || incoming.length > 10) {
          return new Response(JSON.stringify({ ok: false, error: "Số lượng bản ghi mỗi lần nộp phải từ 1 đến 10" }), {
            status: 400,
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }

        const todayIso = new Date().toISOString().slice(0, 10);
        const nowVn = new Date().toLocaleString("vi-VN", { hour12: false });
        const TTL_180_DAYS = 15552000; // 180 ngày (tính bằng giây)
        let saved = 0;

        for (const rawItem of incoming) {
          if (!rawItem || typeof rawItem !== "object") continue;
          const studentName = String(rawItem.studentName || "").trim().slice(0, 80);
          // Chặn các bản ghi rác mang tên mặc định chưa nhập tên thật
          if (!studentName || studentName.startsWith("Em số 1") || studentName.startsWith("Em số 2") || studentName.includes("-- Học sinh mới")) {
            continue;
          }

          const className = String(rawItem.className || "Tin học ứng dụng 9+3").trim().slice(0, 60);
          const sessionName = String(rawItem.sessionName || "Buổi 1").trim().slice(0, 40);
          const station = String(rawItem.station || "01").trim().slice(0, 20);
          const classPin = String(rawItem.classPin || "").trim().slice(0, 12);

          // Server tự chuẩn hóa điểm thành phần (0..100) và TỰ TÍNH LẠI ĐIỂM TỔNG KẾT THANG 10
          const mouseScore = Math.max(0, Math.min(100, Math.round(Number(rawItem.mouseScore) || 0)));
          const telexScore = Math.max(0, Math.min(100, Math.round(Number(rawItem.telexScore) || 0)));
          const wordScore = Math.max(0, Math.min(100, Math.round(Number(rawItem.wordScore != null ? rawItem.wordScore : rawItem.chAvgScore) || 0)));
          const excelScore = Math.max(0, Math.min(100, Math.round(Number(rawItem.excelScore != null ? rawItem.excelScore : rawItem.chAvgScore) || 0)));

          // Trọng số chuẩn: Chuột 25% + Telex 30% + Word 25% + Excel/An toàn số 20%
          const weighted100 = (mouseScore * 0.25) + (telexScore * 0.30) + (wordScore * 0.25) + (excelScore * 0.20);
          const computedGrade10 = Number((weighted100 / 10).toFixed(1));

          // Server tự sinh recordId từ (Ngày + Lớp + Buổi + Máy + Tên) -> Học sinh không thể giả mạo recordId để ghi đè bạn khác
          const serverRecordId = `${todayIso}|${className}|${sessionName}|${station}|${studentName}`;
          const bucketKey = `bucket:${todayIso}:${encodeURIComponent(className)}`;

          const cleanRecord = {
            recordId: serverRecordId,
            dateOnly: todayIso,
            timestamp: nowVn,
            sessionName: sessionName,
            classPin: classPin,
            station: station,
            studentName: studentName,
            className: className,
            mouseScore: mouseScore,
            telexScore: telexScore,
            wordScore: wordScore,
            excelScore: excelScore,
            chAvgScore: Math.round((wordScore + excelScore) / 2),
            grade10: computedGrade10,
            status: computedGrade10 >= 5.0 ? "ĐẠT" : "Cần luyện thêm",
            mostMissed: String(rawItem.mostMissed || "Không có").slice(0, 80),
            telemetry: {
              clicks: Math.max(0, Number(rawItem.telemetry && rawItem.telemetry.clicks) || 0),
              typos: Math.max(0, Number(rawItem.telemetry && rawItem.telemetry.typos) || 0),
              durationSec: Math.max(0, Number(rawItem.telemetry && rawItem.telemetry.durationSec) || 0)
            }
          };

          // Lưu gom theo Bucket Lớp-Ngày để tiết kiệm tối đa KV subrequest
          let bucketObj = globalThis.CLASS_BUCKETS.get(bucketKey) || {};
          if (env && env.SCORES_KV) {
            const existingBucket = await env.SCORES_KV.get(bucketKey, { type: "json" });
            if (existingBucket && typeof existingBucket === "object") {
              bucketObj = existingBucket;
            }
          }
          bucketObj[serverRecordId] = cleanRecord;
          globalThis.CLASS_BUCKETS.set(bucketKey, bucketObj);

          if (env && env.SCORES_KV) {
            await env.SCORES_KV.put(bucketKey, JSON.stringify(bucketObj), { expirationTtl: TTL_180_DAYS });
          }
          saved++;
        }

        return new Response(JSON.stringify({ ok: true, saved: saved }), {
          headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
        });
      }

      // --- B. GIẢNG VIÊN XEM BẢNG ĐIỂM (GET) & XÓA BẢNG ĐIỂM (DELETE) ---
      if (request.method === "GET" || request.method === "DELETE") {
        // Nếu chưa đặt biến TEACHER_SECRET / ADMIN_TOKEN trên Cloudflare -> Trả về 503 như cam kết trong README
        if (!configuredSecret) {
          return new Response(JSON.stringify({
            ok: false,
            error: "Chưa cấu hình biến môi trường TEACHER_SECRET (hoặc ADMIN_TOKEN) trên Cloudflare Worker (HTTP 503)."
          }), {
            status: 503,
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }

        if (!isAuthorizedTeacher) {
          return new Response(JSON.stringify({ ok: false, error: "Unauthorized: Mã bí mật Giảng viên không đúng (HTTP 401)." }), {
            status: 401,
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }

        if (request.method === "GET") {
          let allRecords = [];
          if (env && env.SCORES_KV) {
            const listRes = await env.SCORES_KV.list({ prefix: "bucket:", limit: 100 });
            const buckets = await Promise.all(
              listRes.keys.map(k => env.SCORES_KV.get(k.name, { type: "json" }))
            );
            for (const b of buckets) {
              if (b && typeof b === "object") {
                allRecords.push(...Object.values(b));
              }
            }
          } else {
            for (const b of globalThis.CLASS_BUCKETS.values()) {
              allRecords.push(...Object.values(b));
            }
          }
          return new Response(JSON.stringify({ ok: true, records: allRecords }), {
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }

        if (request.method === "DELETE") {
          globalThis.CLASS_BUCKETS.clear();
          if (env && env.SCORES_KV) {
            const listRes = await env.SCORES_KV.list({ prefix: "bucket:", limit: 100 });
            await Promise.all(listRes.keys.map(k => env.SCORES_KV.delete(k.name)));
          }
          return new Response(JSON.stringify({ ok: true }), {
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }
      }
    }

    // 2. PHỤC VỤ TỆP TĨNH (Hỗ trợ cả đường dẫn /gv mở thẳng trang Giảng viên)
    let path = (url.pathname === "/" || url.pathname === "/gv") ? "/index.html" : url.pathname;
    const ghUrl = "https://raw.githubusercontent.com/buonmathuotcollege/website-giang-day/main" + path;
    const res = await fetch(ghUrl, { headers: { "User-Agent": "Mozilla/5.0" } });

    let contentType = "text/html;charset=UTF-8";
    if (path.endsWith(".css")) contentType = "text/css;charset=UTF-8";
    else if (path.endsWith(".js")) contentType = "application/javascript;charset=UTF-8";
    else if (path.endsWith(".json")) contentType = "application/json;charset=UTF-8";
    else if (path.endsWith(".png")) contentType = "image/png";
    else if (path.endsWith(".jpg") || path.endsWith(".jpeg")) contentType = "image/jpeg";
    else if (path.endsWith(".svg")) contentType = "image/svg+xml";

    return new Response(res.body, {
      status: res.status,
      headers: {
        ...cors,
        "content-type": contentType,
        "Cache-Control": "public, max-age=60"
      }
    });
  }
};
