// ============================================================================
// BACKEND TỰ ĐỘNG CHO CLOUDFLARE PAGES (functions/api/scores.js)
// Khi thầy đẩy thư mục `functions/` này lên GitHub, Cloudflare sẽ TỰ ĐỘNG biến
// tệp này thành Backend API tại địa chỉ: https://phamtiendong.name.vn/api/scores
// Hỗ trợ:
// 1. Tự động khởi tạo bảng SQLite trên Cloudflare D1 (Zero-Setup Auto-Migration)
// 2. Nộp điểm (POST), Xem điểm & Thống kê (GET), Xóa điểm (DELETE)
// 3. Tự động lưu dự phòng vào KV hoặc Bộ nhớ Edge nếu chưa gắn D1
// ============================================================================

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "content-type": "application/json;charset=UTF-8"
};

async function ensureD1Tables(db) {
  if (!db) return;
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      date_only TEXT NOT NULL,
      submitted_at TEXT NOT NULL,
      class_name TEXT NOT NULL,
      session_name TEXT NOT NULL,
      station TEXT NOT NULL,
      student_name TEXT NOT NULL,
      mouse_score INTEGER DEFAULT 0,
      telex_score INTEGER DEFAULT 0,
      word_score INTEGER DEFAULT 0,
      excel_score INTEGER DEFAULT 0,
      ch_avg_score INTEGER DEFAULT 0,
      grade10 REAL DEFAULT 0.0,
      status TEXT DEFAULT 'Cần luyện thêm',
      UNIQUE(date_only, class_name, session_name, station, student_name)
    )
  `).run();
}

function checkTeacherAuth(request, env) {
  const secret = (env && (env.TEACHER_SECRET || env.ADMIN_TOKEN))
    ? String(env.TEACHER_SECRET || env.ADMIN_TOKEN).trim()
    : "";
  if (!secret) return { ok: false, status: 503, error: "Chưa đặt biến TEACHER_SECRET trên Cloudflare." };
  const auth = request.headers.get("Authorization") || "";
  if (auth !== `Bearer ${secret}`) return { ok: false, status: 401, error: "Sai Mã bí mật Giảng viên." };
  return { ok: true };
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

// 1. HỌC SINH NỘP ĐIỂM (POST /api/scores)
export async function onRequestPost(context) {
  const { request, env } = context;
  globalThis.EDGE_SCORES = globalThis.EDGE_SCORES || new Map();

  const rawText = await request.text();
  if (rawText.length > 8192) {
    return new Response(JSON.stringify({ ok: false, error: "Dữ liệu vượt quá 8 KB" }), { status: 413, headers: CORS_HEADERS });
  }

  let body;
  try { body = JSON.parse(rawText); } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "JSON không hợp lệ" }), { status: 400, headers: CORS_HEADERS });
  }

  const incoming = Array.isArray(body.records) ? body.records : [body];
  if (!incoming.length || incoming.length > 10) {
    return new Response(JSON.stringify({ ok: false, error: "Số lượng bản ghi từ 1 đến 10" }), { status: 400, headers: CORS_HEADERS });
  }

  const todayIso = new Date().toISOString().slice(0, 10);
  const nowVn = new Date().toLocaleString("vi-VN", { hour12: false });
  let saved = 0;

  if (env && env.DB) {
    try { await ensureD1Tables(env.DB); } catch (e) {}
  }

  for (const item of incoming) {
    if (!item || !item.studentName) continue;
    const sName = String(item.studentName).trim().slice(0, 80);
    if (!sName) continue;

    const cName = String(item.className || "Tin học ứng dụng 9+3").trim().slice(0, 60);
    const sesName = String(item.sessionName || "Buổi 1").trim().slice(0, 30);
    const stn = String(item.station || "01").trim().slice(0, 15);

    const m = Math.max(0, Math.min(100, Math.round(Number(item.mouseScore) || 0)));
    const t = Math.max(0, Math.min(100, Math.round(Number(item.telexScore) || 0)));
    const w = Math.max(0, Math.min(100, Math.round(Number(item.wordScore != null ? item.wordScore : item.chAvgScore) || 0)));
    const x = Math.max(0, Math.min(100, Math.round(Number(item.excelScore != null ? item.excelScore : item.chAvgScore) || 0)));
    const chAvg = Math.max(w, x);

    // Server tự tính điểm tổng kết Thang 10 (Chuột 30% + Telex 40% + Word/Excel 30%)
    const grade10 = Number((((m * 0.30) + (t * 0.40) + (chAvg * 0.30)) / 10).toFixed(1));
    const status = grade10 >= 5.0 ? "ĐẠT" : "Cần luyện thêm";
    const recordId = `${todayIso}|${cName}|${sesName}|${stn}|${sName}`;

    const recordObj = {
      recordId, dateOnly: todayIso, timestamp: nowVn,
      className: cName, sessionName: sesName, station: stn, studentName: sName,
      mouseScore: m, telexScore: t, wordScore: w, excelScore: x, chAvgScore: chAvg,
      grade10, status
    };

    // Lưu vào CSDL D1 nếu có gắn biến DB
    if (env && env.DB) {
      try {
        await env.DB.prepare(`
          INSERT INTO submissions (
            id, date_only, submitted_at, class_name, session_name, station, student_name,
            mouse_score, telex_score, word_score, excel_score, ch_avg_score, grade10, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(date_only, class_name, session_name, station, student_name)
          DO UPDATE SET
            mouse_score = excluded.mouse_score,
            telex_score = excluded.telex_score,
            word_score = excluded.word_score,
            excel_score = excluded.excel_score,
            ch_avg_score = excluded.ch_avg_score,
            grade10 = excluded.grade10,
            status = excluded.status,
            submitted_at = excluded.submitted_at
        `).bind(recordId, todayIso, nowVn, cName, sesName, stn, sName, m, t, w, x, chAvg, grade10, status).run();
      } catch (e) {}
    }

    // Lưu vào KV nếu có gắn biến SCORES_KV
    if (env && env.SCORES_KV) {
      try {
        const bKey = `bucket:${todayIso}:${encodeURIComponent(cName)}`;
        const bucket = (await env.SCORES_KV.get(bKey, { type: "json" })) || {};
        bucket[recordId] = recordObj;
        await env.SCORES_KV.put(bKey, JSON.stringify(bucket), { expirationTtl: 15552000 });
      } catch (e) {}
    }

    globalThis.EDGE_SCORES.set(recordId, recordObj);
    saved++;
  }

  return new Response(JSON.stringify({ ok: true, saved }), { headers: CORS_HEADERS });
}

// 2. GIẢNG VIÊN XEM BẢNG ĐIỂM (GET /api/scores)
export async function onRequestGet(context) {
  const { request, env } = context;
  globalThis.EDGE_SCORES = globalThis.EDGE_SCORES || new Map();

  const authCheck = checkTeacherAuth(request, env);
  if (!authCheck.ok) {
    return new Response(JSON.stringify({ ok: false, error: authCheck.error }), { status: authCheck.status, headers: CORS_HEADERS });
  }

  let records = [];
  if (env && env.DB) {
    try {
      await ensureD1Tables(env.DB);
      const { results } = await env.DB.prepare(`
        SELECT id AS recordId, date_only AS dateOnly, submitted_at AS timestamp,
               class_name AS className, session_name AS sessionName, station,
               student_name AS studentName, mouse_score AS mouseScore,
               telex_score AS telexScore, word_score AS wordScore,
               excel_score AS excelScore, ch_avg_score AS chAvgScore, grade10, status
        FROM submissions ORDER BY submitted_at DESC LIMIT 1000
      `).all();
      records = results;
    } catch (e) {}
  }

  if (!records.length && env && env.SCORES_KV) {
    try {
      const listRes = await env.SCORES_KV.list({ prefix: "bucket:", limit: 100 });
      const buckets = await Promise.all(listRes.keys.map(k => env.SCORES_KV.get(k.name, { type: "json" })));
      for (const b of buckets) {
        if (b && typeof b === "object") records.push(...Object.values(b));
      }
    } catch (e) {}
  }

  if (!records.length) {
    records = Array.from(globalThis.EDGE_SCORES.values());
  }

  return new Response(JSON.stringify({ ok: true, records }), { headers: CORS_HEADERS });
}

// 3. GIẢNG VIÊN XÓA BẢNG ĐIỂM (DELETE /api/scores)
export async function onRequestDelete(context) {
  const { request, env } = context;
  globalThis.EDGE_SCORES = globalThis.EDGE_SCORES || new Map();

  const authCheck = checkTeacherAuth(request, env);
  if (!authCheck.ok) {
    return new Response(JSON.stringify({ ok: false, error: authCheck.error }), { status: authCheck.status, headers: CORS_HEADERS });
  }

  if (env && env.DB) {
    try { await env.DB.prepare("DELETE FROM submissions").run(); } catch (e) {}
  }
  if (env && env.SCORES_KV) {
    try {
      const listRes = await env.SCORES_KV.list({ prefix: "bucket:", limit: 100 });
      await Promise.all(listRes.keys.map(k => env.SCORES_KV.delete(k.name)));
    } catch (e) {}
  }
  globalThis.EDGE_SCORES.clear();

  return new Response(JSON.stringify({ ok: true }), { headers: CORS_HEADERS });
}
