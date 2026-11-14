import type { APIRoute } from 'astro';
import { checkAdminAuth } from '../../lib/auth';

export const prerender = false;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-admin-secret",
  "Content-Type": "application/json;charset=UTF-8"
};

const DEFAULT_CLASSES = [
  { id: 'cls_03tha8', class_code: '03THA8', class_name: 'EHL Tin học ứng dụng 03THA8', academic_year: '2024-2026', is_composite: 0, student_count: 0 },
  { id: 'cls_03tha9', class_code: '03THA9', class_name: 'EHL Tin học ứng dụng 03THA9', academic_year: '2024-2026', is_composite: 0, student_count: 0 }
];

// In-memory fallback
(globalThis as any).MEM_CLASSES = (globalThis as any).MEM_CLASSES || [...DEFAULT_CLASSES];
(globalThis as any).MEM_STUDENTS = (globalThis as any).MEM_STUDENTS || [];

async function ensureTables(db: any) {
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
      // Column exists
    }
  }
}

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};

// 1. GET CLASSES OR STUDENTS
export const GET: APIRoute = async ({ request, locals }) => {
  const env = (locals as any)?.runtime?.env || (process as any)?.env || {};
  const url = new URL(request.url);
  const classId = url.searchParams.get("id");
  const classCode = url.searchParams.get("code");
  const action = url.searchParams.get("action");

  if (env && env.DB) {
    try {
      await ensureTables(env.DB);

      // Tra cứu tất cả học sinh toàn trường (Bảo mật: Chỉ Giảng viên mới được xem)
      if (action === "all_students") {
        if (!checkAdminAuth(request, env)) {
          return new Response(JSON.stringify({ ok: false, error: "Yêu cầu quyền Giảng viên để truy xuất danh sách toàn trường!" }), { status: 401, headers: CORS_HEADERS });
        }
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

      // Lấy danh sách học sinh của một lớp
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

      // Lấy danh sách tất cả các lớp kèm theo sĩ số
      const query = `
        SELECT c.*, COUNT(s.id) AS student_count
        FROM classes c
        LEFT JOIN students s ON c.id = s.class_id
        WHERE c.is_active = 1
        GROUP BY c.id
        ORDER BY c.is_composite DESC, c.class_name ASC
      `;
      const classes = await env.DB.prepare(query).all();
      const list = classes.results && classes.results.length ? classes.results : (globalThis as any).MEM_CLASSES;
      return new Response(JSON.stringify({ ok: true, data: list, from_d1: true }), { headers: CORS_HEADERS });
    } catch (e: any) {
      // Fallback
    }
  }

  // Memory fallback khi D1 chưa kết nối
  const memClasses = (globalThis as any).MEM_CLASSES;
  const memStudents = (globalThis as any).MEM_STUDENTS;

  if (action === "all_students") {
    if (!checkAdminAuth(request, env)) {
      return new Response(JSON.stringify({ ok: false, error: "Yêu cầu quyền Giảng viên để truy xuất danh sách toàn trường!" }), { status: 401, headers: CORS_HEADERS });
    }
    return new Response(JSON.stringify({ ok: true, data: memStudents, from_d1: false }), { headers: CORS_HEADERS });
  }

  if (classId || classCode) {
    const targetCode = (classCode || "").toUpperCase();
    const cleanTarget = (classCode || classId || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const list = memStudents.filter((s: any) => 
      (classId && s.class_id === classId) || 
      (classCode && (
        (s.class_code && s.class_code.toUpperCase() === targetCode) ||
        (s.original_class && s.original_class.toUpperCase() === targetCode) ||
        (s.class_id && s.class_id.toLowerCase().replace(/[^a-z0-9]/g, "").includes(cleanTarget))
      ))
    );
    return new Response(JSON.stringify({ ok: true, data: list, from_d1: false }), { headers: CORS_HEADERS });
  }

  const result = memClasses.map((c: any) => ({
    ...c,
    student_count: memStudents.filter((s: any) => s.class_id === c.id).length
  }));

  return new Response(JSON.stringify({ ok: true, data: result, from_d1: false }), { headers: CORS_HEADERS });
};

// 2. POST CREATE CLASS, MERGE CLASSES, IMPORT, OR SAVE STUDENT
export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any)?.runtime?.env || (process as any)?.env || {};

  try {
    const body = await request.json();
    const action = body.action || "create_class";

    // -------------------------------------------------------------
    // ACTION 0: ĐỒNG BỘ DANH SÁCH LỚP TỪ CLIENT LÊN WORKER MEMORY
    // -------------------------------------------------------------
    if (action === "sync_classes") {
      const incomingClasses = body.classes || [];
      if (Array.isArray(incomingClasses) && incomingClasses.length > 0) {
        (globalThis as any).MEM_CLASSES = incomingClasses;
      }
      return new Response(JSON.stringify({ ok: true, count: incomingClasses.length }), { headers: CORS_HEADERS });
    }

    // Kiểm tra quyền Giảng viên cho mọi thao tác sửa đổi lớp và học sinh
    if (!checkAdminAuth(request, env)) {
      return new Response(JSON.stringify({ ok: false, error: "Yêu cầu quyền Giảng viên để thực hiện thao tác này!" }), { status: 401, headers: CORS_HEADERS });
    }

    // -------------------------------------------------------------
    // ACTION A: GHÉP LỚP TỰ ĐỘNG TỪ CÁC LỚP CÓ SẴN (MERGE CLASSES)
    // -------------------------------------------------------------
    if (action === "merge_classes") {
      const compCode = String(body.composite_code || "").trim().toUpperCase();
      const compName = String(body.composite_name || "").trim();
      const academicYear = String(body.academic_year || "2026-2027").trim();
      const sourceClassIds = body.source_class_ids || [];

      if (!compCode || !compName) {
        return new Response(JSON.stringify({ ok: false, error: "Vui lòng nhập đầy đủ Mã lớp ghép và Tên lớp ghép" }), { status: 400, headers: CORS_HEADERS });
      }

      if (!Array.isArray(sourceClassIds) || sourceClassIds.length === 0) {
        return new Response(JSON.stringify({ ok: false, error: "Vui lòng chọn ít nhất 1 lớp nguồn để ghép" }), { status: 400, headers: CORS_HEADERS });
      }

      const compClassId = String(body.id || ("cls_ghep_" + compCode.toLowerCase().replace(/[^a-z0-9]/g, "_"))).trim();

      if (env && env.DB) {
        await ensureTables(env.DB);

        const placeholders = sourceClassIds.map(() => "?").join(",");
        const sourceClassesRes = await env.DB.prepare(`SELECT id, class_code, class_name FROM classes WHERE id IN (${placeholders})`).bind(...sourceClassIds).all();
        const sourceClassMap: Record<string, string> = {};
        (sourceClassesRes.results || []).forEach((sc: any) => {
          sourceClassMap[sc.id] = sc.class_code;
        });

        const sourceStudents = await env.DB.prepare(
          `SELECT * FROM students WHERE class_id IN (${placeholders}) ORDER BY class_id ASC, student_number ASC, full_name ASC`
        ).bind(...sourceClassIds).all();
        const studentsList = sourceStudents.results || [];

        if (studentsList.length === 0) {
          return new Response(JSON.stringify({ ok: false, error: "Các lớp đã chọn chưa có học sinh nào để ghép" }), { status: 400, headers: CORS_HEADERS });
        }

        const sourceClassesStr = JSON.stringify(Object.values(sourceClassMap));
        await env.DB.prepare(`
          INSERT INTO classes (id, class_code, class_name, academic_year, is_composite, source_classes, is_active)
          VALUES (?, ?, ?, ?, 1, ?, 1)
        `).bind(compClassId, compCode, compName, academicYear, sourceClassesStr).run();

        const insertStatements = studentsList.map((stu: any, idx: number) => {
          const newStuId = "stu_ghep_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6) + "_" + idx;
          const origClass = stu.original_class || sourceClassMap[stu.class_id] || "Gốc";

          return env.DB.prepare(`
            INSERT INTO students (id, class_id, student_number, student_code, full_name, date_of_birth, gender, phone, status, original_class)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(newStuId, compClassId, idx + 1, stu.student_code || "", stu.full_name, stu.date_of_birth || "", stu.gender || "Nam", stu.phone || "", stu.status || "Đang học", origClass);
        });

        await env.DB.batch(insertStatements);

        return new Response(JSON.stringify({
          ok: true,
          message: `Đã tạo lớp ghép "${compName}" với ${insertStatements.length} học sinh!`,
          data: { id: compClassId, class_code: compCode, count: insertStatements.length }
        }), { headers: CORS_HEADERS });
      } else {
        // In-memory fallback
        const sourceStudents = (globalThis as any).MEM_STUDENTS.filter((s: any) => sourceClassIds.includes(s.class_id));
        const newClass = { id: compClassId, class_code: compCode, class_name: compName, academic_year: academicYear, is_composite: 1, student_count: sourceStudents.length };
        (globalThis as any).MEM_CLASSES.unshift(newClass);

        sourceStudents.forEach((stu: any, idx: number) => {
          (globalThis as any).MEM_STUDENTS.push({
            ...stu,
            id: "stu_ghep_" + Date.now() + "_" + idx,
            class_id: compClassId,
            student_number: idx + 1,
            original_class: stu.original_class || stu.class_code || "Gốc"
          });
        });

        return new Response(JSON.stringify({
          ok: true,
          message: `Đã tạo lớp ghép "${compName}" với ${sourceStudents.length} học sinh!`,
          data: newClass
        }), { headers: CORS_HEADERS });
      }
    }

    // -------------------------------------------------------------
    // ACTION B: NHẬP DANH SÁCH HỌC SINH TỪ EXCEL
    // -------------------------------------------------------------
    if (action === "import_students") {
      const classId = String(body.class_id || "").trim();
      const classCode = String(body.class_code || "").trim();
      const studentList = body.students || [];

      if (!classId && !classCode) {
        return new Response(JSON.stringify({ ok: false, error: "Thiếu class_id hoặc class_code của lớp học" }), { status: 400, headers: CORS_HEADERS });
      }

      if (!Array.isArray(studentList) || studentList.length === 0) {
        return new Response(JSON.stringify({ ok: false, error: "Danh sách học sinh trống" }), { status: 400, headers: CORS_HEADERS });
      }

      if (env && env.DB) {
        await ensureTables(env.DB);
        const targetClass = await env.DB.prepare("SELECT id, class_code, is_composite FROM classes WHERE id = ? OR class_code = ?").bind(classId, classCode).first();
        const defaultOriginal = targetClass ? targetClass.class_code : (classCode || classId);
        const realClassId = targetClass ? targetClass.id : classId;

        if (body.overwrite) {
          await env.DB.prepare("DELETE FROM students WHERE class_id = ?").bind(realClassId).run();
        }

        const statements = studentList.map((stu: any, idx: number) => {
          const stuId = "stu_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6) + "_" + idx;
          const origClass = String(stu.original_class || defaultOriginal).trim();
          return env.DB.prepare(`
            INSERT INTO students (id, class_id, student_number, student_code, full_name, date_of_birth, gender, phone, status, original_class)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(
            stuId, realClassId, Number(stu.student_number || idx + 1),
            String(stu.student_code || "").trim(),
            String(stu.full_name || "").trim(),
            String(stu.date_of_birth || "").trim(),
            String(stu.gender || "Nam").trim(),
            String(stu.phone || "").trim(),
            String(stu.status || "Đang học").trim(),
            origClass
          );
        });

        await env.DB.batch(statements);

        return new Response(JSON.stringify({
          ok: true,
          message: `Đã nạp thành công ${statements.length} học sinh chuẩn hóa vào lớp!`,
          count: statements.length
        }), { headers: CORS_HEADERS });
      } else {
        // In-memory fallback
        if (body.overwrite) {
          (globalThis as any).MEM_STUDENTS = (globalThis as any).MEM_STUDENTS.filter(
            (s: any) => s.class_id !== classId && s.class_code !== classCode
          );
        }
        studentList.forEach((stu: any, idx: number) => {
          (globalThis as any).MEM_STUDENTS.push({
            id: stu.id || ("stu_" + Date.now() + "_" + idx),
            class_id: classId,
            class_code: classCode,
            student_number: idx + 1,
            student_code: stu.student_code || "",
            full_name: stu.full_name || "",
            date_of_birth: stu.date_of_birth || "",
            gender: stu.gender || "Nam",
            phone: stu.phone || "",
            status: stu.status || "Đang học",
            original_class: stu.original_class || classCode || "Gốc"
          });
        });

        return new Response(JSON.stringify({
          ok: true,
          message: `Đã nạp thành công ${studentList.length} học sinh vào bộ nhớ!`,
          count: studentList.length
        }), { headers: CORS_HEADERS });
      }
    }

    // -------------------------------------------------------------
    // ACTION C: THÊM HOẶC CẬP NHẬT 1 HỌC SINH ĐƠN LẺ
    // -------------------------------------------------------------
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

      if (env && env.DB) {
        await ensureTables(env.DB);
        if (studentId) {
          await env.DB.prepare(`
            UPDATE students 
            SET student_number = ?, student_code = ?, full_name = ?, date_of_birth = ?, gender = ?, phone = ?, status = ?, original_class = ?
            WHERE id = ?
          `).bind(stuNum, stuCode, fullName, dob, gender, phone, status, origClass, studentId).run();
        } else {
          const newStuId = "stu_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6);
          await env.DB.prepare(`
            INSERT INTO students (id, class_id, student_number, student_code, full_name, date_of_birth, gender, phone, status, original_class)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(newStuId, classId, stuNum, stuCode, fullName, dob, gender, phone, status, origClass).run();
        }
      } else {
        // Memory fallback
        if (studentId) {
          const found = (globalThis as any).MEM_STUDENTS.find((s: any) => s.id === studentId);
          if (found) {
            Object.assign(found, { student_number: stuNum, student_code: stuCode, full_name: fullName, date_of_birth: dob, gender, phone, status, original_class: origClass });
          }
        } else {
          (globalThis as any).MEM_STUDENTS.push({
            id: "stu_" + Date.now(),
            class_id: classId,
            student_number: stuNum,
            student_code: stuCode,
            full_name: fullName,
            date_of_birth: dob,
            gender,
            phone,
            status,
            original_class: origClass
          });
        }
      }

      return new Response(JSON.stringify({
        ok: true,
        message: studentId ? "Cập nhật hồ sơ học sinh thành công!" : "Thêm học sinh mới thành công!"
      }), { headers: CORS_HEADERS });
    }

    // -------------------------------------------------------------
    // ACTION D: TẠO LỚP HỌC MỚI (CHÍNH KHÓA HOẶC GHÉP RỖNG)
    // -------------------------------------------------------------
    const classCode = String(body.class_code || "").trim().toUpperCase();
    const className = String(body.class_name || "").trim();
    const academicYear = String(body.academic_year || "2026-2027").trim();
    const isComposite = Number(body.is_composite || 0);

    if (!classCode || !className) {
      return new Response(JSON.stringify({ ok: false, error: "Vui lòng nhập đầy đủ Mã lớp và Tên lớp" }), { status: 400, headers: CORS_HEADERS });
    }

    const classId = String(body.id || ((isComposite ? "cls_ghep_" : "cls_") + classCode.toLowerCase().replace(/[^a-z0-9]/g, "_"))).trim();

    if (env && env.DB) {
      await ensureTables(env.DB);
      await env.DB.prepare(
        "INSERT INTO classes (id, class_code, class_name, academic_year, is_composite, is_active) VALUES (?, ?, ?, ?, ?, 1)"
      ).bind(classId, classCode, className, academicYear, isComposite).run();
    } else {
      (globalThis as any).MEM_CLASSES.unshift({
        id: classId,
        class_code: classCode,
        class_name: className,
        academic_year: academicYear,
        is_composite: isComposite,
        student_count: 0
      });
    }

    return new Response(JSON.stringify({
      ok: true,
      message: `Tạo ${isComposite ? 'lớp ghép' : 'lớp học'} mới thành công!`,
      data: { id: classId, class_code: classCode, class_name: className, academic_year: academicYear, is_composite: isComposite }
    }), { headers: CORS_HEADERS });

  } catch (e: any) {
    const errorMsg = (e.message || "").includes("UNIQUE")
      ? "Mã lớp này đã tồn tại trên hệ thống, vui lòng chọn mã khác!"
      : (e.message || "Lỗi xử lý yêu cầu");
    return new Response(JSON.stringify({ ok: false, error: errorMsg }), { status: 500, headers: CORS_HEADERS });
  }
};

// 3. DELETE CLASS OR STUDENT
export const DELETE: APIRoute = async ({ request, locals }) => {
  const env = (locals as any)?.runtime?.env || (process as any)?.env || {};

  if (!checkAdminAuth(request, env)) {
    return new Response(JSON.stringify({ ok: false, error: "Yêu cầu quyền Giảng viên để xóa dữ liệu!" }), { status: 401, headers: CORS_HEADERS });
  }

  const url = new URL(request.url);
  const classId = url.searchParams.get("id");
  const studentId = url.searchParams.get("student_id");

  try {
    if (studentId) {
      if (env && env.DB) {
        await env.DB.prepare("DELETE FROM students WHERE id = ?").bind(studentId).run();
      } else {
        (globalThis as any).MEM_STUDENTS = (globalThis as any).MEM_STUDENTS.filter((s: any) => s.id !== studentId);
      }
      return new Response(JSON.stringify({ ok: true, message: "Đã xóa học sinh khỏi danh sách" }), { headers: CORS_HEADERS });
    }

    if (classId) {
      if (env && env.DB) {
        await env.DB.batch([
          env.DB.prepare("DELETE FROM students WHERE class_id = ?").bind(classId),
          env.DB.prepare("DELETE FROM classes WHERE id = ?").bind(classId)
        ]);
      } else {
        (globalThis as any).MEM_STUDENTS = (globalThis as any).MEM_STUDENTS.filter((s: any) => s.class_id !== classId);
        (globalThis as any).MEM_CLASSES = (globalThis as any).MEM_CLASSES.filter((c: any) => c.id !== classId);
      }
      return new Response(JSON.stringify({ ok: true, message: "Đã xóa lớp học thành công" }), { headers: CORS_HEADERS });
    }

    return new Response(JSON.stringify({ ok: false, error: "Thiếu id hoặc student_id để xóa" }), { status: 400, headers: CORS_HEADERS });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500, headers: CORS_HEADERS });
  }
};
