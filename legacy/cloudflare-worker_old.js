// ============================================================================
// HỆ THỐNG BACKEND TOÀN DIỆN CHO WEB GIẢNG DẠY (cloudflare-worker.js)
// Đơn vị: Cổng Giảng Dạy & Thực Hành CNTT - CN. Phạm Tiến Đông
// Tích hợp:
// 1. Cơ sở dữ liệu Cloudflare D1 (SQL chuẩn) + KV Fallback
// 2. API Quản lý Bảng điểm Lớp học (/api/scores)
// 3. API Danh sách học sinh theo lớp (/api/roster)
// 4. API Quản lý buổi học & Mã PIN (/api/session)
// 5. Kiểm tra mã bí mật Giảng viên (TEACHER_SECRET / ADMIN_TOKEN)
// 6. Phục vụ toàn bộ giao diện Web Frontend tĩnh
// ============================================================================

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Vary": "Origin"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    const configuredSecret = (env && (env.TEACHER_SECRET || env.ADMIN_TOKEN))
      ? String(env.TEACHER_SECRET || env.ADMIN_TOKEN).trim()
      : "";

    const authHeader = request.headers.get("Authorization") || "";
    const isAuthorizedTeacher = configuredSecret.length >= 4 && authHeader === `Bearer ${configuredSecret}`;

    // Memory Store dự phòng khi chưa cấu hình D1 hoặc KV
    globalThis.MEM_SUBMISSIONS = globalThis.MEM_SUBMISSIONS || new Map();
    globalThis.ACTIVE_PINS = globalThis.ACTIVE_PINS || new Map();

    // ------------------------------------------------------------------------
    // ROUTE 1: KIỂM TRA TRẠNG THÁI HỆ THỐNG (/api/health)
    // ------------------------------------------------------------------------
    if (url.pathname === "/api/health") {
      return new Response(JSON.stringify({
        status: "healthy",
        school: "Cổng Giảng Dạy & Thực Hành CNTT",
        major: "Tin học ứng dụng (Hệ 9+3)",
        hasD1Database: !!(env && env.DB),
        hasKVStorage: !!(env && env.SCORES_KV),
        hasSecretConfigured: configuredSecret.length >= 4,
        timestamp: new Date().toISOString()
      }), {
        headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
      });
    }

    // ------------------------------------------------------------------------
    // ROUTE 2: LẤY DANH SÁCH LỚP & HỌC SINH TỪ CSDL D1 (/api/roster)
    // ------------------------------------------------------------------------
    if (url.pathname === "/api/roster") {
      const classCode = url.searchParams.get("class") || "THUD_K26A";
      let roster = [];

      if (env && env.DB) {
        try {
          const { results } = await env.DB.prepare(
            "SELECT student_number, full_name FROM students WHERE class_code = ? ORDER BY student_number ASC"
          ).bind(classCode).all();
          roster = results.map(r => `${String(r.student_number).padStart(2, '0')}. ${r.full_name}`);
        } catch (e) {}
      }

      if (!roster.length) {
        roster = [
          "01. Nguyễn Văn An", "02. Trần Văn Ba", "03. Lê Thị Bích Cúc", "04. Phạm Minh Dũng",
          "05. Hoàng Quốc Đạt", "06. H'Hen Niê", "07. Y Đam San Êban", "08. Vũ Thị Hương Giang",
          "09. Đặng Gia Huy", "10. Bùi Tuấn Kiệt", "-- Học sinh mới (Tự nhập tên ở ô dưới) --"
        ];
      }

      return new Response(JSON.stringify({ ok: true, classCode, roster }), {
        headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
      });
    }

    // ------------------------------------------------------------------------
    // ROUTE 3: API QUẢN LÝ BẢNG ĐIỂM (/api/scores)
    // ------------------------------------------------------------------------
    if (url.pathname === "/api/scores") {
      // --- A. HỌC SINH NỘP ĐIỂM (POST) ---
      if (request.method === "POST") {
        const rawText = await request.text();
        if (rawText.length > 8192) {
          return new Response(JSON.stringify({ ok: false, error: "Dữ liệu vượt quá 8 KB" }), {
            status: 413,
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }

        let body;
        try { body = JSON.parse(rawText); } catch (e) {
          return new Response(JSON.stringify({ ok: false, error: "JSON không hợp lệ" }), {
            status: 400,
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }

        const incoming = Array.isArray(body.records) ? body.records : [body];
        if (incoming.length === 0 || incoming.length > 10) {
          return new Response(JSON.stringify({ ok: false, error: "Số bản ghi mỗi lần nộp từ 1 đến 10" }), {
            status: 400,
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }

        const clientIp = request.headers.get("CF-Connecting-IP") || "local";
        const todayIso = new Date().toISOString().slice(0, 10);
        const nowVn = new Date().toLocaleString("vi-VN", { hour12: false });
        let savedCount = 0;

        for (const item of incoming) {
          if (!item || !item.studentName) continue;
          const sName = String(item.studentName).trim();
          if (!sName || sName.startsWith("Em số 1") || sName.startsWith("Em số 2") || sName.includes("-- Học sinh mới")) {
            continue;
          }

          const cName = String(item.className || "Tin học ứng dụng 9+3 (K26A)").trim();
          const sesName = String(item.sessionName || "Buổi 1").trim();
          const stn = String(item.station || "01").trim();
          const pin = String(item.classPin || "").trim();

          const m = Math.max(0, Math.min(100, Math.round(Number(item.mouseScore) || 0)));
          const t = Math.max(0, Math.min(100, Math.round(Number(item.telexScore) || 0)));
          const w = Math.max(0, Math.min(100, Math.round(Number(item.wordScore != null ? item.wordScore : item.chAvgScore) || 0)));
          const x = Math.max(0, Math.min(100, Math.round(Number(item.excelScore != null ? item.excelScore : item.chAvgScore) || 0)));

          // Server tự tính điểm tổng kết Thang 10: Chuột 25% + Telex 30% + Word 25% + Excel/An toàn 20%
          const grade10 = Number((((m * 0.25) + (t * 0.30) + (w * 0.25) + (x * 0.20)) / 10).toFixed(1));
          const status = grade10 >= 5.0 ? "ĐẠT" : "Cần luyện thêm";
          const missed = String(item.mostMissed || "Không có").slice(0, 80);
          const clicks = Number(item.telemetry && item.telemetry.clicks) || 0;
          const typos = Number(item.telemetry && item.telemetry.typos) || 0;
          const dur = Number(item.telemetry && item.telemetry.durationSec) || 0;

          const recordId = `${todayIso}|${cName}|${sesName}|${stn}|${sName}`;

          // Ưu tiên 1: Ghi vào CSDL Cloudflare D1 (SQL Serverless trên Edge)
          if (env && env.DB) {
            try {
              await env.DB.prepare(`CREATE TABLE IF NOT EXISTS submissions (
                id TEXT PRIMARY KEY, date_only TEXT NOT NULL, submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                class_name TEXT NOT NULL, session_name TEXT NOT NULL, class_pin TEXT DEFAULT '',
                station TEXT NOT NULL, student_name TEXT NOT NULL, ip_address TEXT DEFAULT '',
                mouse_score INTEGER DEFAULT 0, telex_score INTEGER DEFAULT 0, word_score INTEGER DEFAULT 0,
                excel_score INTEGER DEFAULT 0, ch_avg_score INTEGER DEFAULT 0, grade10 REAL DEFAULT 0.0,
                status TEXT DEFAULT 'Cần luyện thêm', most_missed TEXT DEFAULT 'Không có',
                clicks INTEGER DEFAULT 0, typos INTEGER DEFAULT 0, duration_sec INTEGER DEFAULT 0,
                UNIQUE(date_only, class_name, session_name, station, student_name)
              )`).run();
              await env.DB.prepare(`
                INSERT INTO submissions (
                  id, date_only, class_name, session_name, class_pin, station, student_name,
                  ip_address, mouse_score, telex_score, word_score, excel_score, ch_avg_score,
                  grade10, status, most_missed, clicks, typos, duration_sec
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(date_only, class_name, session_name, station, student_name)
                DO UPDATE SET
                  mouse_score = excluded.mouse_score,
                  telex_score = excluded.telex_score,
                  word_score = excluded.word_score,
                  excel_score = excluded.excel_score,
                  ch_avg_score = excluded.ch_avg_score,
                  grade10 = excluded.grade10,
                  status = excluded.status,
                  most_missed = excluded.most_missed,
                  clicks = excluded.clicks,
                  typos = excluded.typos,
                  duration_sec = excluded.duration_sec,
                  submitted_at = CURRENT_TIMESTAMP
              `).bind(
                recordId, todayIso, cName, sesName, pin, stn, sName,
                clientIp, m, t, w, x, Math.round((w + x) / 2),
                grade10, status, missed, clicks, typos, dur
              ).run();
              savedCount++;
              continue;
            } catch (d1Err) {}
          }

          // Ưu tiên 2: Ghi vào Cloudflare KV (Lưu gom theo Lớp-Ngày, TTL 180 ngày)
          if (env && env.SCORES_KV) {
            try {
              const bucketKey = `bucket:${todayIso}:${encodeURIComponent(cName)}`;
              let bucketObj = (await env.SCORES_KV.get(bucketKey, { type: "json" })) || {};
              bucketObj[recordId] = {
                recordId, dateOnly: todayIso, timestamp: nowVn, sessionName: sesName,
                classPin: pin, station: stn, studentName: sName, className: cName,
                mouseScore: m, telexScore: t, wordScore: w, excelScore: x,
                chAvgScore: Math.round((w + x) / 2), grade10, status, mostMissed: missed
              };
              await env.SCORES_KV.put(bucketKey, JSON.stringify(bucketObj), { expirationTtl: 15552000 });
              savedCount++;
              continue;
            } catch (kvErr) {}
          }

          // Dự phòng 3: Ghi vào Memory trên Edge
          globalThis.MEM_SUBMISSIONS.set(recordId, {
            recordId, dateOnly: todayIso, timestamp: nowVn, sessionName: sesName,
            classPin: pin, station: stn, studentName: sName, className: cName,
            mouseScore: m, telexScore: t, wordScore: w, excelScore: x,
            chAvgScore: Math.round((w + x) / 2), grade10, status, mostMissed: missed
          });
          savedCount++;
        }

        return new Response(JSON.stringify({ ok: true, saved: savedCount }), {
          headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
        });
      }

      // --- B. GIẢNG VIÊN XEM BẢNG ĐIỂM (GET) & XÓA (DELETE) ---
      if (request.method === "GET" || request.method === "DELETE") {
        if (!configuredSecret) {
          return new Response(JSON.stringify({
            ok: false,
            error: "Chưa đặt biến TEACHER_SECRET / ADMIN_TOKEN trên Cloudflare (HTTP 503)."
          }), {
            status: 503,
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }
        if (!isAuthorizedTeacher) {
          return new Response(JSON.stringify({ ok: false, error: "Sai Mã Giảng Viên (HTTP 401)." }), {
            status: 401,
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }

        if (request.method === "GET") {
          let records = [];

          // 1. Đọc từ CSDL D1
          if (env && env.DB) {
            try {
              const { results } = await env.DB.prepare(`
                SELECT
                  id AS recordId, date_only AS dateOnly, submitted_at AS timestamp,
                  session_name AS sessionName, class_pin AS classPin, station,
                  student_name AS studentName, class_name AS className,
                  mouse_score AS mouseScore, telex_score AS telexScore,
                  word_score AS wordScore, excel_score AS excelScore,
                  ch_avg_score AS chAvgScore, grade10, status, most_missed AS mostMissed
                FROM submissions
                ORDER BY submitted_at DESC
                LIMIT 1000
              `).all();
              records = results;
            } catch (e) {}
          }

          // 2. Đọc từ KV nếu D1 chưa có dữ liệu
          if (!records.length && env && env.SCORES_KV) {
            try {
              const listRes = await env.SCORES_KV.list({ prefix: "bucket:", limit: 100 });
              const buckets = await Promise.all(listRes.keys.map(k => env.SCORES_KV.get(k.name, { type: "json" })));
              for (const b of buckets) {
                if (b && typeof b === "object") records.push(...Object.values(b));
              }
            } catch (e) {}
          }

          // 3. Đọc từ Memory
          if (!records.length) {
            records = Array.from(globalThis.MEM_SUBMISSIONS.values());
          }

          return new Response(JSON.stringify({ ok: true, records }), {
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }

        if (request.method === "DELETE") {
          if (env && env.DB) {
            try { await env.DB.prepare("DELETE FROM submissions").run(); } catch (e) {}
          }
          if (env && env.SCORES_KV) {
            try {
              const listRes = await env.SCORES_KV.list({ prefix: "bucket:", limit: 100 });
              await Promise.all(listRes.keys.map(k => env.SCORES_KV.delete(k.name)));
            } catch (e) {}
          }
          globalThis.MEM_SUBMISSIONS.clear();
          return new Response(JSON.stringify({ ok: true }), {
            headers: { ...cors, "content-type": "application/json;charset=UTF-8" }
          });
        }
      }
    }

    // ------------------------------------------------------------------------
    // ROUTE 4: PHỤC VỤ TRANG TĨNH TỪ KHO GITHUB (HỖ TRỢ /gv VÀO THẲNG BẢNG ĐIỂM)
    // ------------------------------------------------------------------------
    // Nếu Cloudflare đã gắn Static Assets trực tiếp (env.ASSETS) -> Phục vụ trực tiếp từ CDN siêu tốc, không bị GitHub chặn giới hạn!
    if (env && env.ASSETS) {
      if (url.pathname === "/gv") {
        return env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
      }
      return env.ASSETS.fetch(request);
    }
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
