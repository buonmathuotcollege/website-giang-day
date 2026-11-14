// ============================================================================
// API QUẢN LÝ LỚP HỌC & HỌC SINH (/api/classes)
// Hỗ trợ đầy đủ: Lớp chính khóa, Lớp ghép, Ca sát hạch liên lớp
// Chuẩn thông tin Đại học: MSHS, Họ tên, Ngày sinh, Giới tính, Lớp gốc
// Tối ưu cho Cloudflare D1 (SQLite on Edge)
// ============================================================================

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json;charset=UTF-8"
};

// Đảm bảo cấu trúc bảng và chỉ mục luôn tồn tại (Tự migrate an toàn)
async function ensureTables(db) {
  if (!db) return;
  await db.batch([
    db.prepare(`
      CREATE TABLE IF NOT EXISTS classes (
        id TEXT PRIMARY KEY,
        class_code TEXT UNIQUE NOT NULL,
        class_name TEXT NOT NULL,
        academic_year TEXT DEFAULT '2026-2027',
        is_composite INTEGER DEFAULT 0,
        source_classes TEXT DEFAULT '',
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        class_id TEXT NOT NULL,
        student_number INTEGER NOT NULL,
        student_code TEXT NOT NULL DEFAULT '',
        full_name TEXT NOT NULL,
        date_of_birth TEXT DEFAULT '',
        gender TEXT DEFAULT 'Nam',
        phone TEXT DEFAULT '',
        status TEXT DEFAULT 'Đang học',
        original_class TEXT DEFAULT '',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
      );
    `),
    db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_students_class ON students(class_id);
    `),
    db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_students_code ON students(student_code);
    `)
  ]);

  // Migration an toàn cho database đã khởi tạo từ trước (SQLite idempotent)
  const columnsToAdd = [
    "ALTER TABLE classes ADD COLUMN is_composite INTEGER DEFAULT 0",
    "ALTER TABLE classes ADD COLUMN source_classes TEXT DEFAULT ''",
    "ALTER TABLE students ADD COLUMN student_code TEXT DEFAULT ''",
    "ALTER TABLE students ADD COLUMN date_of_birth TEXT DEFAULT ''",
    "ALTER TABLE students ADD COLUMN gender TEXT DEFAULT 'Nam'",
    "ALTER TABLE students ADD COLUMN phone TEXT DEFAULT ''",
    "ALTER TABLE students ADD COLUMN status TEXT DEFAULT 'Đang học'",
    "ALTER TABLE students ADD COLUMN original_class TEXT DEFAULT ''"
  ];

  for (const alterSql of columnsToAdd) {
    try {
      await db.prepare(alterSql).run();
    } catch (e) {
      // Bỏ qua nếu cột đã tồn tại trong SQLite
    }
  }
}

const DEFAULT_CLASSES = [
  { id: 'cls_thud_k26a', class_code: 'THUD_K26A', class_name: 'Tin học ứng dụng K26A', academic_year: '2026-2027', is_composite: 0, student_count: 0 },
  { id: 'cls_thud_k26b', class_code: 'THUD_K26B', class_name: 'Tin học ứng dụng K26B', academic_year: '2026-2027', is_composite: 0, student_count: 0 },
  { id: 'cls_qtm_k26',   class_code: 'QTM_K26',   class_name: 'Quản trị mạng K26',     academic_year: '2026-2027', is_composite: 0, student_count: 0 },
  { id: 'cls_dien_93',   class_code: 'DIEN_93',   class_name: 'Điện công nghiệp 9+3',   academic_year: '2026-2027', is_composite: 0, student_count: 0 },
  { id: 'cls_oto_93',    class_code: 'OTO_93',    class_name: 'Công nghệ Ô tô 9+3',     academic_year: '2026-2027', is_composite: 0, student_count: 0 }
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
  const action = url.searchParams.get("action");

  if (env && env.DB) {
    try {
      await ensureTables(env.DB);

      // Tra cứu tất cả học sinh toàn trường (cho tìm kiếm nhanh trong phòng thi / đánh giá)
      if (action === "all_students") {
        const query = `
          SELECT s.id, s.class_id, s.student_number, s.student_code, s.full_name, s.date_of_birth, s.gender, s.original_class, c.class_name, c.class_code, c.is_composite
          FROM students s
          JOIN classes c ON s.class_id = c.id
          WHERE c.is_active = 1
          ORDER BY s.student_code ASC, s.full_name ASC
          LIMIT 500
        `;
        const allStudents = await env.DB.prepare(query).all();
        return new Response(JSON.stringify({ ok: true, data: allStudents.results || [] }), { headers: CORS_HEADERS });
      }

      // Nếu truyền id hoặc code: Lấy danh sách học sinh đầy đủ của lớp
      if (classId || classCode) {
        let targetId = classId;
        if (!targetId && classCode) {
          const cls = await env.DB.prepare("SELECT id FROM classes WHERE class_code = ? OR class_name LIKE ?")
            .bind(classCode, `%${classCode}%`).first();
          if (cls) targetId = cls.id;
        }

        if (targetId) {
          const students = await env.DB.prepare(
            `SELECT id, class_id, student_number, student_code, full_name, date_of_birth, gender, phone, status, original_class, created_at
             FROM students 
             WHERE class_id = ? 
             ORDER BY student_number ASC, student_code ASC, full_name ASC`
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
        ORDER BY c.is_composite DESC, c.class_name ASC
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

// 2. TẠO LỚP MỚI / GHÉP LỚP / NHẬP HỌC SINH / THÊM-SỬA HỌC SINH (POST)
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

    // =========================================================================
    // ACTION A: GHÉP LỚP TỰ ĐỘNG TỪ CÁC LỚP CÓ SẴN (MERGE CLASSES)
    // Dành cho Ca sát hạch / Buổi đánh giá năng lực ghép từ nhiều lớp
    // =========================================================================
    if (action === "merge_classes") {
      const compCode = String(body.composite_code || "").trim().toUpperCase();
      const compName = String(body.composite_name || "").trim();
      const academicYear = String(body.academic_year || "2026-2027").trim();
      const sourceClassIds = body.source_class_ids || [];
      const selectedStudentIds = body.student_ids || null; // Tùy chọn nếu chỉ ghép một số học sinh

      if (!compCode || !compName) {
        return new Response(JSON.stringify({ ok: false, error: "Vui lòng nhập Mã lớp ghép và Tên lớp ghép" }), { status: 400, headers: CORS_HEADERS });
      }

      if (!Array.isArray(sourceClassIds) || sourceClassIds.length === 0) {
        return new Response(JSON.stringify({ ok: false, error: "Vui lòng chọn ít nhất 1 lớp nguồn để ghép" }), { status: 400, headers: CORS_HEADERS });
      }

      // Tạo id cho lớp ghép
      const compClassId = "cls_ghep_" + compCode.toLowerCase().replace(/[^a-z0-9]/g, "_") + "_" + Date.now().toString(36).slice(-4);

      // Lấy thông tin các lớp nguồn
      const placeholders = sourceClassIds.map(() => "?").join(",");
      const sourceClassesRes = await env.DB.prepare(`SELECT id, class_code, class_name FROM classes WHERE id IN (${placeholders})`).bind(...sourceClassIds).all();
      const sourceClassMap = {};
      (sourceClassesRes.results || []).forEach(sc => {
        sourceClassMap[sc.id] = sc.class_code;
      });

      // Lấy danh sách học sinh từ các lớp nguồn
      let studentsQuery = `SELECT * FROM students WHERE class_id IN (${placeholders})`;
      let studentsParams = [...sourceClassIds];

      if (Array.isArray(selectedStudentIds) && selectedStudentIds.length > 0) {
        const stuPlaceholders = selectedStudentIds.map(() => "?").join(",");
        studentsQuery += ` AND id IN (${stuPlaceholders})`;
        studentsParams.push(...selectedStudentIds);
      }
      studentsQuery += ` ORDER BY class_id ASC, student_number ASC, full_name ASC`;

      const sourceStudents = await env.DB.prepare(studentsQuery).bind(...studentsParams).all();
      const studentsList = sourceStudents.results || [];

      if (studentsList.length === 0) {
        return new Response(JSON.stringify({ ok: false, error: "Các lớp đã chọn chưa có học sinh nào để ghép" }), { status: 400, headers: CORS_HEADERS });
      }

      // 1. Tạo bản ghi lớp ghép trong bảng classes
      const sourceClassesStr = JSON.stringify(Object.values(sourceClassMap));
      await env.DB.prepare(`
        INSERT INTO classes (id, class_code, class_name, academic_year, is_composite, source_classes, is_active)
        VALUES (?, ?, ?, ?, 1, ?, 1)
      `).bind(compClassId, compCode, compName, academicYear, sourceClassesStr).run();

      // 2. Clone học sinh sang lớp ghép với original_class được gán chuẩn xác
      const insertStatements = studentsList.map((stu, idx) => {
        const newStuId = "stu_ghep_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6) + "_" + idx;
        const newNum = idx + 1;
        const origClass = stu.original_class || sourceClassMap[stu.class_id] || "Gốc";

        return env.DB.prepare(`
          INSERT INTO students (id, class_id, student_number, student_code, full_name, date_of_birth, gender, phone, status, original_class)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          newStuId,
          compClassId,
          newNum,
          stu.student_code || "",
          stu.full_name,
          stu.date_of_birth || "",
          stu.gender || "Nam",
          stu.phone || "",
          stu.status || "Đang học",
          origClass
        );
      });

      await env.DB.batch(insertStatements);

      return new Response(JSON.stringify({
        ok: true,
        message: `Đã tạo lớp ghép "${compName}" thành công với ${insertStatements.length} học sinh từ ${sourceClassIds.length} lớp!`,
        data: { id: compClassId, class_code: compCode, count: insertStatements.length }
      }), { headers: CORS_HEADERS });
    }

    // =========================================================================
    // ACTION B: NHẬP DANH SÁCH HỌC SINH HÀNG LOẠT TỪ EXCEL (KÈM LỚP GỐC)
    // =========================================================================
    if (action === "import_students") {
      const classId = String(body.class_id || "").trim();
      const studentList = body.students || [];

      if (!classId) {
        return new Response(JSON.stringify({ ok: false, error: "Thiếu class_id của lớp học" }), { status: 400, headers: CORS_HEADERS });
      }

      if (!Array.isArray(studentList) || studentList.length === 0) {
        return new Response(JSON.stringify({ ok: false, error: "Danh sách học sinh trống" }), { status: 400, headers: CORS_HEADERS });
      }

      // Lấy thông tin lớp đích để mặc định original_class nếu chưa có
      const targetClass = await env.DB.prepare("SELECT class_code, is_composite FROM classes WHERE id = ?").bind(classId).first();
      const defaultOriginal = targetClass ? targetClass.class_code : "";

      // Nếu có cờ overwrite, xóa danh sách cũ của lớp này trước
      if (body.overwrite) {
        await env.DB.prepare("DELETE FROM students WHERE class_id = ?").bind(classId).run();
      }

      // Chuẩn bị batch insert tối ưu thành 1 transaction duy nhất
      const statements = studentList.map((stu, idx) => {
        const stuId = "stu_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6) + "_" + idx;
        const stuNum = Number(stu.student_number || idx + 1);
        const stuCode = String(stu.student_code || "").trim();
        const fullName = String(stu.full_name || "").trim();
        const dob = String(stu.date_of_birth || "").trim();
        const gender = String(stu.gender || "Nam").trim();
        const phone = String(stu.phone || "").trim();
        const status = String(stu.status || "Đang học").trim();
        const origClass = String(stu.original_class || defaultOriginal).trim();

        return env.DB.prepare(`
          INSERT INTO students (id, class_id, student_number, student_code, full_name, date_of_birth, gender, phone, status, original_class)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(stuId, classId, stuNum, stuCode, fullName, dob, gender, phone, status, origClass);
      });

      await env.DB.batch(statements);

      return new Response(JSON.stringify({
        ok: true,
        message: `Đã nạp thành công ${statements.length} học sinh chuẩn hóa vào lớp!`,
        count: statements.length
      }), { headers: CORS_HEADERS });
    }

    // =========================================================================
    // ACTION C: THÊM HOẶC CẬP NHẬT 1 HỌC SINH ĐƠN LẺ
    // =========================================================================
    if (action === "save_student") {
      const studentId = body.id;
      const classId = String(body.class_id || "").trim();
      const stuNum = Number(body.student_number || 1);
      const stuCode = String(body.student_code || "").trim();
      const fullName = String(body.full_name || "").trim();
      const dob = String(body.date_of_birth || "").trim();
      const gender = String(body.gender || "Nam").trim();
      const phone = String(body.phone || "").trim();
      const status = String(body.status || "Đang học").trim();
      const origClass = String(body.original_class || "").trim();

      if (!fullName) {
        return new Response(JSON.stringify({ ok: false, error: "Họ và tên học sinh không được để trống" }), { status: 400, headers: CORS_HEADERS });
      }

      if (studentId) {
        // Cập nhật thông tin học sinh hiện có
        await env.DB.prepare(`
          UPDATE students 
          SET student_number = ?, student_code = ?, full_name = ?, date_of_birth = ?, gender = ?, phone = ?, status = ?, original_class = ?
          WHERE id = ?
        `).bind(stuNum, stuCode, fullName, dob, gender, phone, status, origClass, studentId).run();

        return new Response(JSON.stringify({
          ok: true,
          message: "Cập nhật thông tin học sinh thành công!"
        }), { headers: CORS_HEADERS });
      } else {
        // Thêm học sinh mới vào lớp
        if (!classId) {
          return new Response(JSON.stringify({ ok: false, error: "Thiếu class_id khi thêm học sinh" }), { status: 400, headers: CORS_HEADERS });
        }
        const newStuId = "stu_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6);
        await env.DB.prepare(`
          INSERT INTO students (id, class_id, student_number, student_code, full_name, date_of_birth, gender, phone, status, original_class)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(newStuId, classId, stuNum, stuCode, fullName, dob, gender, phone, status, origClass).run();

        return new Response(JSON.stringify({
          ok: true,
          message: "Thêm học sinh mới vào lớp thành công!",
          data: { id: newStuId }
        }), { headers: CORS_HEADERS });
      }
    }

    // =========================================================================
    // ACTION D: TẠO LỚP HỌC MỚI (CHÍNH KHÓA HOẶC GHÉP RỖNG)
    // =========================================================================
    const classCode = String(body.class_code || "").trim().toUpperCase();
    const className = String(body.class_name || "").trim();
    const academicYear = String(body.academic_year || "2026-2027").trim();
    const isComposite = Number(body.is_composite || 0);

    if (!classCode || !className) {
      return new Response(JSON.stringify({ ok: false, error: "Vui lòng nhập đầy đủ Mã lớp và Tên lớp" }), { status: 400, headers: CORS_HEADERS });
    }

    const classId = (isComposite ? "cls_ghep_" : "cls_") + classCode.toLowerCase().replace(/[^a-z0-9]/g, "_") + "_" + Date.now().toString(36).slice(-4);

    await env.DB.prepare(
      "INSERT INTO classes (id, class_code, class_name, academic_year, is_composite, is_active) VALUES (?, ?, ?, ?, ?, 1)"
    ).bind(classId, classCode, className, academicYear, isComposite).run();

    return new Response(JSON.stringify({
      ok: true,
      message: `Tạo ${isComposite ? 'lớp ghép' : 'lớp học'} mới thành công!`,
      data: { id: classId, class_code: classCode, class_name: className, academic_year: academicYear, is_composite: isComposite }
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
