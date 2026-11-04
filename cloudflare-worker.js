// ============================================================================
// MÃ CLOUDFLARE WORKER BẢO MẬT & CHỐNG GHI ĐÈ ĐỒNG THỜI (cloudflare-worker.js)
// Đã khắc phục toàn bộ 4 mục Bảo mật & Hiệu năng theo Báo cáo Rà soát 03/11/2026:
// 1. Xác thực Bearer Token (env.TEACHER_SECRET, mặc định 'BMTC2026') cho GET và DELETE /api/scores
// 2. Lưu từng bản ghi thành 1 khóa KV riêng biệt ('score:<recordId>') -> 50 máy nộp cùng lúc không bao giờ ghi đè nhau!
// 3. Khóa bản ghi kết hợp: Ngày + Lớp + Buổi học + Số máy + Họ tên (không bị trùng tên giữa các lớp)
// 4. Truyền trực tiếp luồng nhị phân (res.body) thay vì res.text() để không làm hỏng file ảnh/font
// ============================================================================

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    const teacherSecret = (env && env.TEACHER_SECRET) ? env.TEACHER_SECRET : "BMTC2026";
    const authHeader = request.headers.get("Authorization") || "";
    const isAuthorizedTeacher = (authHeader === `Bearer ${teacherSecret}`);

    // Bộ nhớ dự phòng khi chưa gắn KV (Dùng Map theo khóa riêng biệt)
    globalThis.SCORE_MAP = globalThis.SCORE_MAP || new Map();

    // 1. API QUẢN LÝ BẢNG ĐIỂM LỚP HỌC (/api/scores)
    if (url.pathname === "/api/scores") {
      // Học sinh nộp điểm (POST): Cho phép các máy trạm gửi kết quả thực hành
      if (request.method === "POST") {
        const body = await request.json();
        const incoming = Array.isArray(body.records) ? body.records : [body];
        let saved = 0;

        for (const rawItem of incoming) {
          if (!rawItem || !rawItem.studentName) continue;
          const dateKey = String(rawItem.dateOnly || new Date().toLocaleDateString("vi-VN")).slice(0, 20);
          const cls = String(rawItem.className || "Lớp 9+3").slice(0, 60);
          const ses = String(rawItem.sessionName || "Buổi 1").slice(0, 40);
          const stn = String(rawItem.station || "Máy 01").slice(0, 30);
          const name = String(rawItem.studentName || "").slice(0, 80);
          const recordId = String(rawItem.recordId || `${dateKey}|${cls}|${ses}|${stn}|${name}`).slice(0, 220);

          const cleanRecord = {
            recordId: recordId,
            dateOnly: dateKey,
            timestamp: String(rawItem.timestamp || new Date().toLocaleString("vi-VN")).slice(0, 40),
            sessionName: ses,
            station: stn,
            studentName: name,
            className: cls,
            mouseScore: Math.max(0, Math.min(100, Number(rawItem.mouseScore) || 0)),
            telexScore: Math.max(0, Math.min(100, Number(rawItem.telexScore) || 0)),
            chAvgScore: Math.max(0, Math.min(100, Number(rawItem.chAvgScore) || 0)),
            grade10: Math.max(0, Math.min(10, Number(rawItem.grade10) || 0)),
            status: (Number(rawItem.grade10) || 0) >= 5.0 ? "ĐẠT" : "Cần luyện thêm"
          };

          const kvKey = `score:${recordId}`;
          globalThis.SCORE_MAP.set(kvKey, cleanRecord);
          if (env && env.SCORES_KV) {
            // Lưu mỗi học sinh 1 khóa KV độc lập -> Không bao giờ xung đột khi 25-50 máy nộp đồng thời!
            await env.SCORES_KV.put(kvKey, JSON.stringify(cleanRecord));
          }
          saved++;
        }

        return new Response(JSON.stringify({ ok: true, saved: saved }), {
          headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
        });
      }

      // Giảng viên xem bảng điểm (GET): Bắt buộc có Authorization Bearer Token
      if (request.method === "GET") {
        if (!isAuthorizedTeacher) {
          return new Response(JSON.stringify({ ok: false, error: "Unauthorized: Sai Mã Bí Mật Giảng Viên" }), {
            status: 401,
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }

        let records = [];
        if (env && env.SCORES_KV) {
          const listRes = await env.SCORES_KV.list({ prefix: "score:", limit: 1000 });
          const fetched = await Promise.all(
            listRes.keys.map(k => env.SCORES_KV.get(k.name, { type: "json" }))
          );
          records = fetched.filter(Boolean);
        } else {
          records = Array.from(globalThis.SCORE_MAP.values());
        }

        return new Response(JSON.stringify({ ok: true, records: records }), {
          headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
        });
      }

      // Giảng viên xóa danh sách điểm (DELETE): Bắt buộc có Authorization Bearer Token
      if (request.method === "DELETE") {
        if (!isAuthorizedTeacher) {
          return new Response(JSON.stringify({ ok: false, error: "Unauthorized: Chỉ Giảng viên mới được xóa điểm" }), {
            status: 401,
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }

        globalThis.SCORE_MAP.clear();
        if (env && env.SCORES_KV) {
          const listRes = await env.SCORES_KV.list({ prefix: "score:", limit: 1000 });
          await Promise.all(listRes.keys.map(k => env.SCORES_KV.delete(k.name)));
        }

        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
        });
      }
    }

    // 2. PHỤC VỤ TỆP TĨNH TỪ KHO GITHUB (Truyền trực tiếp res.body để hỗ trợ cả ảnh nhị phân .png, .jpg, .woff2)
    let path = url.pathname === "/" ? "/index.html" : url.pathname;
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
