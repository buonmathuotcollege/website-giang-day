import type { APIRoute } from 'astro';
import { checkAdminAuth } from '../../lib/auth';

export const prerender = false;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-admin-secret",
  "Content-Type": "application/json;charset=UTF-8"
};

// In-memory fallback
(globalThis as any).MEM_SCORES = (globalThis as any).MEM_SCORES || [];

async function ensureTable(db: any) {
  if (!db) return;
  if ((globalThis as any)._scoresTableEnsured) return;

  try {
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS submissions (
        id TEXT PRIMARY KEY,
        session_id TEXT,
        class_name TEXT NOT NULL,
        session_name TEXT NOT NULL,
        student_name TEXT NOT NULL,
        student_code TEXT DEFAULT '',
        original_class TEXT DEFAULT '',
        station TEXT DEFAULT '',
        date_only TEXT NOT NULL,
        score REAL DEFAULT 0.0,
        details_json TEXT DEFAULT '{}',
        status TEXT DEFAULT 'Đạt',
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    try { await db.prepare("ALTER TABLE submissions ADD COLUMN student_code TEXT DEFAULT ''").run(); } catch(e){}
    try { await db.prepare("ALTER TABLE submissions ADD COLUMN original_class TEXT DEFAULT ''").run(); } catch(e){}
    (globalThis as any)._scoresTableEnsured = true;
  } catch(e) {}
}

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};

// 1. POST SCORE
export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any)?.runtime?.env || (process as any)?.env || {};

  try {
    const data = await request.json();
    const id = "sub_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6);
    // Tính đúng ngày theo múi giờ Việt Nam (GMT+7)
    const dateOnly = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date());
    const className = String(data.className || data.class_name || "Lớp chung").trim();
    const sessionName = String(data.sessionName || data.session_name || "Buổi thực hành").trim();
    const studentName = String(data.studentName || data.student_name || "").trim();
    const studentCode = String(data.studentCode || data.student_code || "").trim();
    const originalClass = String(data.originalClass || data.original_class || "").trim();
    const station = String(data.station || "").trim();
    
    // Nhận diện nếu là lượt điểm danh đơn thuần (không phải bài thi đánh giá năng lực)
    const isAttendance = Boolean(data.isAttendance || data.details?.type === 'DiemDanhBuoi' || sessionName.toLowerCase().includes('điểm danh'));

    // Giới hạn điểm hợp lệ trong khoảng [0, 10]
    const rawScore = data.score !== undefined ? data.score : (data.grade10 !== undefined ? data.grade10 : 0);
    const numScore = Number(rawScore);
    const score = isAttendance ? 0.0 : (isNaN(numScore) ? 0 : Math.max(0, Math.min(10, Math.round(numScore * 10) / 10)));

    const details = JSON.stringify({
      ...(data.details || {}),
      isAttendance: isAttendance
    });
    const status = isAttendance ? "Đã điểm danh" : (score >= 5.0 ? "Đạt" : "Cần rèn luyện");

    if (!studentName) {
      return new Response(JSON.stringify({ ok: false, error: "Họ tên học sinh không được để trống" }), { status: 400, headers: CORS_HEADERS });
    }

    // Yêu cầu quyền Giảng viên khi chấm điểm sát hạch xưởng hoặc có rubric đánh giá
    const isTeacherGrading = Boolean(data.isTeacherGraded || data.details?.rubric || sessionName.includes("Sát hạch"));
    if (isTeacherGrading && !checkAdminAuth(request, env)) {
      return new Response(JSON.stringify({ 
        ok: false, 
        error: "Yêu cầu quyền Giảng viên để ghi nhận điểm đánh giá kỹ năng vào sổ điểm!" 
      }), { status: 401, headers: CORS_HEADERS });
    }

    if (env && env.DB) {
      await ensureTable(env.DB);
      await env.DB.prepare(`
        INSERT INTO submissions (id, class_name, session_name, student_name, student_code, original_class, station, date_only, score, details_json, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(id, className, sessionName, studentName, studentCode, originalClass, station, dateOnly, score, details, status).run();
    } else {
      (globalThis as any).MEM_SCORES.unshift({
        id,
        className,
        sessionName,
        studentName,
        studentCode,
        originalClass,
        station,
        date_only: dateOnly,
        score,
        status,
        submitted_at: new Date().toISOString()
      });
    }

    return new Response(JSON.stringify({ ok: true, id, message: "Nộp bài thành công!" }), { headers: CORS_HEADERS });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e.message || "Lỗi nộp bài" }), { status: 500, headers: CORS_HEADERS });
  }
};

// 2. GET SCORES (Chỉ Giảng viên mới được xem bảng điểm)
export const GET: APIRoute = async ({ request, locals }) => {
  const env = (locals as any)?.runtime?.env || (process as any)?.env || {};

  if (!checkAdminAuth(request, env)) {
    return new Response(JSON.stringify({ ok: false, error: "Yêu cầu quyền Giảng viên để xem toàn bộ bảng điểm!" }), { status: 401, headers: CORS_HEADERS });
  }

  const url = new URL(request.url);
  const className = url.searchParams.get("class");
  const originalClass = url.searchParams.get("original_class");
  const limit = Math.min(Number(url.searchParams.get("limit") || 200), 500);

  let list = [];

  if (env && env.DB) {
    try {
      await ensureTable(env.DB);
      let query = "SELECT * FROM submissions WHERE 1=1";
      const params: any[] = [];

      if (className) {
        query += " AND (class_name = ? OR class_name LIKE ?)";
        params.push(className, `%${className}%`);
      }

      if (originalClass) {
        query += " AND (original_class = ? OR original_class LIKE ?)";
        params.push(originalClass, `%${originalClass}%`);
      }

      query += " ORDER BY submitted_at DESC LIMIT ?";
      params.push(limit);

      const res = await env.DB.prepare(query).bind(...params).all();
      list = res.results || [];
    } catch (e: any) {
      list = [];
    }
  } else {
    list = ((globalThis as any).MEM_SCORES || []).slice(0, limit);
    if (className) {
      list = list.filter((item: any) => (item.className || item.class_name) === className);
    }
    if (originalClass) {
      list = list.filter((item: any) => (item.originalClass || item.original_class) === originalClass);
    }
  }

  return new Response(JSON.stringify({ ok: true, count: list.length, data: list }), { headers: CORS_HEADERS });
};

// 3. DELETE SCORE
export const DELETE: APIRoute = async ({ request, locals }) => {
  const env = (locals as any)?.runtime?.env || (process as any)?.env || {};
  if (!checkAdminAuth(request, env)) {
    return new Response(JSON.stringify({ ok: false, error: "Yêu cầu quyền Giảng viên" }), { status: 401, headers: CORS_HEADERS });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ ok: false, error: "Thiếu ID bản ghi cần xóa" }), { status: 400, headers: CORS_HEADERS });
  }

  if (env && env.DB) {
    await env.DB.prepare("DELETE FROM submissions WHERE id = ?").bind(id).run();
  } else {
    (globalThis as any).MEM_SCORES = (globalThis as any).MEM_SCORES.filter((s: any) => s.id !== id);
  }

  return new Response(JSON.stringify({ ok: true, message: "Đã xóa bản ghi bảng điểm" }), { headers: CORS_HEADERS });
};
