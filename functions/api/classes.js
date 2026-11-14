// ============================================================================
// API QUẢN LÝ LỚP HỌC & HỌC SINH (/api/classes)
// Tối ưu cho Cloudflare D1 (SQLite on Edge)
// ============================================================================

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json;charset=UTF-8"
};

// Đảm bảo cấu trúc bảng và chỉ mục luôn tồn tại (Tự khởi tạo tự động)
async function ensureTables(db) {
  if (!db) return;
  await db.batch([
    db.prepare(`
      CREATE TABLE IF NOT EXISTS classes (
        id TEXT PRIMARY KEY,
        class_code TEXT UNIQUE NOT NULL,
        class_name TEXT NOT NULL,
        academic_year TEXT DEFAULT '2026-2027',
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        class_id TEXT NOT NULL,
        student_number INTEGER NOT NULL,
        full_name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
      );
    `),
    db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_students_class ON students(class_id);
    `)
  ]);
}

const DEFAULT_CLASSES = [
  { id: 'cls_thud_k26a', class_code: 'THUD_K26A', class_name: 'Tin học ứng dụng K26A', academic_year: '2026-2027', student_count: 0 },
  { id: 'cls_thud_k26b', class_code: 'THUD_K26B', class_name: 'Tin học ứng dụng K26B', academic_year: '2026-2027', student_count: 0 },
  { id: 'cls_qtm_k26',   class_code: 'QTM_K26',   class_name: 'Quản trị mạng K26',     academic_year: '2026-2027', student_count: 0 },
  { id: 'cls_dien_93',   class_code: 'DIEN_93',   class_name: 'Điện công nghiệp 9+3',   academic_year: '2026-2027', student_count: 0 },
  { id: 'cls_oto_93',    class_code: 'OTO_93',    class_name: 'Công nghệ Ô tô 9+3',     academic_year: '2026-2027', student_count: 0 }
];

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

// 1. LẤY DANH SÁCH LỚP HOẶC HỌC SINH (GET)
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const classId = url.searchParams.get("id");
  const classCode = url.searchParams.get("code");

  if (env && env.DB) {
    try {
      await ensureTables(env.DB);

      // Nếu truyền id hoặc code: Lấy danh sách học sinh của lớp
      if (classId || classCode) {
        let targetId = classId;
        if (!targetId && classCode) {
          const cls = await env.DB.prepare("SELECT id FROM classes WHERE class_code = ? OR class_name LIKE ?")
            .bind(classCode, `%${classCode}%`).first();
          if (cls) targetId = cls.id;
        }

        if (targetId) {
          const students = await env.DB.prepare(
            "SELECT * FROM students WHERE class_id = ? ORDER BY student_number ASC, full_name ASC"
          ).bind(targetId).all();
          return new Response(JSON.stringify({ ok: true, data: students.results || [] }), { headers: CORS_HEADERS });
        }
      }

      // Lấy danh sách tất cả các lớp kèm theo sĩ số học sinh
      const query = `
        SELECT c.*, COUNT(s.id) AS student_count
        FROM classes c
        LEFT JOIN students s ON c.id = s.class_id
        WHERE c.is_active = 1
        GROUP BY c.id
        ORDER BY c.class_name ASC
      `;
      const classes = await env.DB.prepare(query).all();
      const list = classes.results && classes.results.length ? classes.results : DEFAULT_CLASSES;
      return new Response(JSON.stringify({ ok: true, data: list }), { headers: CORS_HEADERS });
    } catch (e) {
      return new Response(JSON.stringify({ ok: false, error: e.message, data: DEFAULT_CLASSES }), { headers: CORS_HEADERS });
    }
  }

  // Fallback nếu chưa kết nối D1
  return new Response(JSON.stringify({ ok: true, data: DEFAULT_CLASSES }), { headers: CORS_HEADERS });
}

// 2. TẠO LỚP MỚI HOẶC NHẬP HỌC SINH TỪ EXCEL (POST)
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const action = body.action || "create_class";

    if (!env || !env.DB) {
      return new Response(JSON.stringify({
        ok: false,
        error: "Chưa cấu hình liên kết Cloudflare D1 database. Vui lòng kiểm tra wrangler.toml!"
      }), { status: 500, headers: CORS_HEADERS });
    }

    await ensureTables(env.DB);

    // ACTION A: NHẬP DANH SÁCH HỌC SINH HÀNG LOẠT TỪ EXCEL
    if (action === "import_students") {
      const classId = String(body.class_id || "").trim();
      const studentList = body.students || [];

      if (!classId) {
        return new Response(JSON.stringify({ ok: false, error: "Thiếu class_id của lớp học" }), { status: 400, headers: CORS_HEADERS });
      }

      if (!Array.isArray(studentList) || studentList.length === 0) {
        return new Response(JSON.stringify({ ok: false, error: "Danh sách học sinh trống" }), { status: 400, headers: CORS_HEADERS });
      }

      // Nếu có cờ overwrite, xóa danh sách cũ trước
      if (body.overwrite) {
        await env.DB.prepare("DELETE FROM students WHERE class_id = ?").bind(classId).run();
      }

      // Chuẩn bị batch insert để tối ưu 1 transaction duy nhất
      const statements = studentList.map((stu, idx) => {
        const stuId = "stu_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6);
        const stuNum = Number(stu.student_number || idx + 1);
        const fullName = String(stu.full_name || "").trim();
        return env.DB.prepare(
          "INSERT INTO students (id, class_id, student_number, full_name) VALUES (?, ?, ?, ?)"
        ).bind(stuId, classId, stuNum, fullName);
      });

      await env.DB.batch(statements);

      return new Response(JSON.stringify({
        ok: true,
        message: `Đã nạp thành công ${statements.length} học sinh vào lớp!`,
        count: statements.length
      }), { headers: CORS_HEADERS });
    }

    // ACTION B: TẠO LỚP HỌC MỚI
    const classCode = String(body.class_code || "").trim().toUpperCase();
    const className = String(body.class_name || "").trim();
    const academicYear = String(body.academic_year || "2026-2027").trim();

    if (!classCode || !className) {
      return new Response(JSON.stringify({ ok: false, error: "Vui lòng nhập đầy đủ Mã lớp và Tên lớp" }), { status: 400, headers: CORS_HEADERS });
    }

    const classId = "cls_" + classCode.toLowerCase().replace(/[^a-z0-9]/g, "_") + "_" + Date.now().toString(36).slice(-4);

    await env.DB.prepare(
      "INSERT INTO classes (id, class_code, class_name, academic_year, is_active) VALUES (?, ?, ?, ?, 1)"
    ).bind(classId, classCode, className, academicYear).run();

    return new Response(JSON.stringify({
      ok: true,
      message: "Tạo lớp học mới thành công!",
      data: { id: classId, class_code: classCode, class_name: className, academic_year: academicYear }
    }), { headers: CORS_HEADERS });

  } catch (e) {
    const errorMsg = e.message.includes("UNIQUE")
      ? "Mã lớp này đã tồn tại trên hệ thống, vui lòng chọn mã khác!"
      : e.message;
    return new Response(JSON.stringify({ ok: false, error: errorMsg }), { status: 500, headers: CORS_HEADERS });
  }
}

// 3. XÓA LỚP HOẶC HỌC SINH (DELETE)
export async function onRequestDelete(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const classId = url.searchParams.get("id");
  const studentId = url.searchParams.get("student_id");

  if (!env || !env.DB) {
    return new Response(JSON.stringify({ ok: false, error: "Chưa kết nối CSDL D1" }), { status: 500, headers: CORS_HEADERS });
  }

  try {
    if (studentId) {
      await env.DB.prepare("DELETE FROM students WHERE id = ?").bind(studentId).run();
      return new Response(JSON.stringify({ ok: true, message: "Đã xóa học sinh khỏi danh sách" }), { headers: CORS_HEADERS });
    }

    if (classId) {
      // Xóa các học sinh thuộc lớp và xóa lớp
      await env.DB.batch([
        env.DB.prepare("DELETE FROM students WHERE class_id = ?").bind(classId),
        env.DB.prepare("DELETE FROM classes WHERE id = ?").bind(classId)
      ]);
      return new Response(JSON.stringify({ ok: true, message: "Đã xóa lớp học thành công" }), { headers: CORS_HEADERS });
    }

    return new Response(JSON.stringify({ ok: false, error: "Thiếu id hoặc student_id để xóa" }), { status: 400, headers: CORS_HEADERS });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500, headers: CORS_HEADERS });
  }
}
