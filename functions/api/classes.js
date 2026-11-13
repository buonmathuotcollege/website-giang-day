// ============================================================================
// API QUẢN LÝ LỚP HỌC & HỌC SINH (/api/classes)
// ============================================================================

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json;charset=UTF-8"
};

const DEFAULT_CLASSES = [
  { id: 'cls_thud_k26a', class_code: 'THUD_K26A', class_name: 'Tin học ứng dụng K26A', academic_year: '2026-2027' },
  { id: 'cls_thud_k26b', class_code: 'THUD_K26B', class_name: 'Tin học ứng dụng K26B', academic_year: '2026-2027' },
  { id: 'cls_qtm_k26',   class_code: 'QTM_K26',   class_name: 'Quản trị mạng K26',     academic_year: '2026-2027' },
  { id: 'cls_dien_93',   class_code: 'DIEN_93',   class_name: 'Điện công nghiệp 9+3',   academic_year: '2026-2027' },
  { id: 'cls_oto_93',    class_code: 'OTO_93',    class_name: 'Công nghệ Ô tô 9+3',     academic_year: '2026-2027' }
];

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const classId = url.searchParams.get("id");

  if (env && env.DB) {
    try {
      if (classId) {
        // Lấy danh sách học sinh của lớp
        const students = await env.DB.prepare(
          "SELECT * FROM students WHERE class_id = ? ORDER BY student_number ASC"
        ).bind(classId).all();
        return new Response(JSON.stringify({ ok: true, data: students.results || [] }), { headers: CORS_HEADERS });
      }

      const classes = await env.DB.prepare("SELECT * FROM classes WHERE is_active = 1 ORDER BY class_name ASC").all();
      const list = classes.results && classes.results.length ? classes.results : DEFAULT_CLASSES;
      return new Response(JSON.stringify({ ok: true, data: list }), { headers: CORS_HEADERS });
    } catch (e) {
      return new Response(JSON.stringify({ ok: true, data: DEFAULT_CLASSES }), { headers: CORS_HEADERS });
    }
  }

  return new Response(JSON.stringify({ ok: true, data: DEFAULT_CLASSES }), { headers: CORS_HEADERS });
}
