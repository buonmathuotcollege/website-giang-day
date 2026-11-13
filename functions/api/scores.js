// ============================================================================
// API BẢNG ĐIỂM & NỘP BÀI THỰC HÀNH (/api/scores)
// ============================================================================

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json;charset=UTF-8"
};

async function ensureTable(db) {
  if (!db) return;
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      session_id TEXT,
      class_name TEXT NOT NULL,
      session_name TEXT NOT NULL,
      student_name TEXT NOT NULL,
      station TEXT DEFAULT '',
      date_only TEXT NOT NULL,
      score REAL DEFAULT 0.0,
      details_json TEXT DEFAULT '{}',
      status TEXT DEFAULT 'Đạt',
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
}

function checkAuth(request, env) {
  const secret = (env && (env.TEACHER_SECRET || env.ADMIN_TOKEN) ? (env.TEACHER_SECRET || env.ADMIN_TOKEN) : "BMTC2026").trim();
  const auth = request.headers.get("Authorization") || "";
  return auth === `Bearer ${secret}`;
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

// 1. HỌC SINH NỘP ĐIỂM (POST)
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const id = "sub_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6);
    const dateOnly = new Date().toISOString().slice(0, 10);
    const className = String(data.className || data.class_name || "Lớp chung").trim();
    const sessionName = String(data.sessionName || data.session_name || "Buổi thực hành").trim();
    const studentName = String(data.studentName || data.student_name || "").trim();
    const station = String(data.station || "").trim();
    const score = Number(data.score || data.grade10 || 10.0);
    const details = JSON.stringify(data.details || {});
    const status = score >= 5.0 ? "Đạt" : "Cần rèn luyện";

    if (!studentName) {
      return new Response(JSON.stringify({ ok: false, error: "Họ tên học sinh không được để trống" }), { status: 400, headers: CORS_HEADERS });
    }

    if (env && env.DB) {
      await ensureTable(env.DB);
      await env.DB.prepare(`
        INSERT INTO submissions (id, class_name, session_name, student_name, station, date_only, score, details_json, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(id, className, sessionName, studentName, station, dateOnly, score, details, status).run();
    } else {
      // Memory store fallback
      globalThis.MEM_SCORES = globalThis.MEM_SCORES || [];
      globalThis.MEM_SCORES.unshift({ id, className, sessionName, studentName, station, dateOnly, score, status, submittedAt: new Date().toISOString() });
    }

    return new Response(JSON.stringify({ ok: true, id, message: "Nộp bài thành công!" }), { headers: CORS_HEADERS });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500, headers: CORS_HEADERS });
  }
}

// 2. GIẢNG VIÊN XEM BẢNG ĐIỂM (GET)
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const className = url.searchParams.get("class");
  const limit = Math.min(Number(url.searchParams.get("limit") || 100), 200);

  let list = [];

  if (env && env.DB) {
    try {
      await ensureTable(env.DB);
      let query = "SELECT * FROM submissions";
      const params = [];
      if (className) {
        query += " WHERE class_name = ?";
        params.push(className);
      }
      query += " ORDER BY submitted_at DESC LIMIT ?";
      params.push(limit);

      const res = await env.DB.prepare(query).bind(...params).all();
      list = res.results || [];
    } catch (e) {
      list = [];
    }
  } else {
    list = (globalThis.MEM_SCORES || []).slice(0, limit);
    if (className) {
      list = list.filter(item => item.className === className);
    }
  }

  return new Response(JSON.stringify({ ok: true, count: list.length, data: list }), { headers: CORS_HEADERS });
}

// 3. XÓA BẢN GHI (DELETE - CẦN MẬT KHẨU GV)
export async function onRequestDelete(context) {
  const { request, env } = context;
  if (!checkAuth(request, env)) {
    return new Response(JSON.stringify({ ok: false, error: "Yêu cầu quyền Giảng viên" }), { status: 401, headers: CORS_HEADERS });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ ok: false, error: "Thiếu ID bản ghi cần xóa" }), { status: 400, headers: CORS_HEADERS });
  }

  if (env && env.DB) {
    await env.DB.prepare("DELETE FROM submissions WHERE id = ?").bind(id).run();
  } else if (globalThis.MEM_SCORES) {
    globalThis.MEM_SCORES = globalThis.MEM_SCORES.filter(item => item.id !== id);
  }

  return new Response(JSON.stringify({ ok: true, message: "Đã xóa bản ghi" }), { headers: CORS_HEADERS });
}
