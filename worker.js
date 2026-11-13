// ============================================================================
// CLOUDFLARE WORKER: ĐIỀU HƯỚNG TÊN MIỀN PHỤ, API VÀ PHỤC VỤ WEB ASTRO
// Trường Cao đẳng Buôn Ma Thuột
// ============================================================================

const SUBDOMAIN_MAP = {
  'nanglucso': '/courses/nang-luc-so',
  'kientruc': '/courses/kien-truc-may-tinh',
  'phancung': '/courses/phan-cung-may-tinh',
  'mang': '/courses/mang-can-ban',
  'lanwan': '/courses/thiet-ke-quan-tri-lan-wan',
  'winlinux': '/courses/quan-tri-windows-linux',
  'danhgia': '/assessment'
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json;charset=UTF-8"
};

const QUESTION_BANKS = {
  "phan-cung": [
    { id: "pc_01", question: "Linh kiện nào sau đây được coi là 'bộ não' điều khiển mọi hoạt động tính toán của máy tính?", options: ["RAM (Random Access Memory)", "CPU (Central Processing Unit)", "GPU (Graphics Processing Unit)", "Bộ nguồn (PSU)"], correct: 1, explanation: "CPU (Central Processing Unit) là bộ vi xử lý trung tâm, thực thi các lệnh chương trình." },
    { id: "pc_02", question: "Khi tắt máy tính hoặc mất điện đột ngột, dữ liệu lưu trong linh kiện nào sau đây sẽ bị mất hoàn toàn?", options: ["Ổ đĩa cứng SSD", "Ổ đĩa cứng HDD", "Bộ nhớ RAM", "ROM BIOS"], correct: 2, explanation: "RAM là bộ nhớ truy xuất ngẫu nhiên khả biến (volatile), mất toàn bộ dữ liệu khi ngắt điện." },
    { id: "pc_03", question: "Cổng giao tiếp nào hiện nay phổ biến nhất để xuất hình ảnh kèm âm thanh kỹ thuật số chất lượng cao ra màn hình?", options: ["VGA (D-Sub)", "DVI", "HDMI / DisplayPort", "Cổng COM (RS-232)"], correct: 2, explanation: "HDMI và DisplayPort truyền tải đồng thời cả hình ảnh kỹ thuật số độ nét cao lẫn tín hiệu âm thanh." },
    { id: "pc_04", question: "Keo tản nhiệt (Thermal Paste) có tác dụng chủ yếu nào sau đây trong phần cứng máy tính?", options: ["Gắn dính vĩnh viễn CPU vào socket", "Lấp đầy các khe hở siêu vi giữa bề mặt CPU và đế tản nhiệt để dẫn nhiệt tốt hơn", "Làm sạch bụi bẩn trên vi xử lý", "Cung cấp nguồn điện phụ cho quạt tản nhiệt"], correct: 1, explanation: "Keo tản nhiệt loại bỏ các bọt khí siêu nhỏ giữa bề mặt IHS của CPU và quạt tản nhiệt, tối đa hóa hiệu suất tản nhiệt." },
    { id: "pc_05", question: "Ổ lưu trữ thể rắn SSD chuẩn NVMe sử dụng khe cắm vật lý nào trên bo mạch chủ (Mainboard)?", options: ["Khe PCI thông thường", "Khe cắm M.2 PCIe", "Cổng SATA 2", "Khe cắm RAM DDR4"], correct: 1, explanation: "SSD NVMe sử dụng giao tiếp khe cắm chuẩn M.2 chạy trên băng thông PCIe tốc độ cao." }
  ],
  "mang": [
    { id: "net_01", question: "Mô hình tham chiếu OSI chuẩn hóa truyền thông mạng máy tính bao gồm bao nhiêu tầng (layers)?", options: ["4 tầng", "5 tầng", "7 tầng", "9 tầng"], correct: 2, explanation: "Mô hình OSI gồm 7 tầng: Vật lý, Liên kết dữ liệu, Mạng, Giao vận, Phiên, Trình diễn, Ứng dụng." },
    { id: "net_02", question: "Thiết bị mạng nào hoạt động tại Tầng 3 (Network Layer) để định tuyến gói tin giữa các mạng IP khác nhau?", options: ["Hub", "Switch chuẩn Layer 2", "Router (Bộ định tuyến)", "Repeater (Bộ lặp sóng)"], correct: 2, explanation: "Router là thiết bị tầng 3 chịu trách nhiệm định tuyến đường đi cho gói tin giữa các mạng logic khác nhau." },
    { id: "net_03", question: "Địa chỉ IPv4 nào sau đây thuộc dải địa chỉ mạng riêng (Private IP) dùng trong mạng nội bộ LAN?", options: ["8.8.8.8", "192.168.1.100", "1.1.1.1", "203.162.0.11"], correct: 1, explanation: "Dải IP riêng theo RFC 1918 gồm: 10.0.0.0/8, 172.16.0.0/12, và 192.168.0.0/16." },
    { id: "net_04", question: "Giao thức nào có nhiệm vụ tự động cấp phát địa chỉ IP, Subnet Mask và Gateway cho các thiết bị khi kết nối vào mạng?", options: ["DNS (Domain Name System)", "DHCP (Dynamic Host Configuration Protocol)", "FTP (File Transfer Protocol)", "HTTP (Hypertext Transfer Protocol)"], correct: 1, explanation: "DHCP tự động cấu hình và cấp phát thông số mạng (IP, Mask, Gateway, DNS) cho client." },
    { id: "net_05", question: "Lệnh dòng lệnh (Command Line) nào dùng để kiểm tra tính thông suốt kết nối giữa 2 nút mạng bằng gói tin ICMP?", options: ["ipconfig / all", "ping", "tracert", "netstat"], correct: 1, explanation: "Lệnh ping gửi gói tin ICMP Echo Request để xác định khả năng phản hồi và độ trễ tới máy đích." }
  ]
};

const DEFAULT_CLASSES = [
  { id: 'cls_thud_k26a', class_code: 'THUD_K26A', class_name: 'Tin học ứng dụng K26A', academic_year: '2026-2027' },
  { id: 'cls_thud_k26b', class_code: 'THUD_K26B', class_name: 'Tin học ứng dụng K26B', academic_year: '2026-2027' },
  { id: 'cls_qtm_k26',   class_code: 'QTM_K26',   class_name: 'Quản trị mạng K26',     academic_year: '2026-2027' },
  { id: 'cls_dien_93',   class_code: 'DIEN_93',   class_name: 'Điện công nghiệp 9+3',   academic_year: '2026-2027' },
  { id: 'cls_oto_93',    class_code: 'OTO_93',    class_name: 'Công nghệ Ô tô 9+3',     academic_year: '2026-2027' }
];

async function ensureD1(db) {
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // ------------------------------------------------------------------------
    // PHẦN 1: ROUTING TÊN MIỀN PHỤ (SUBDOMAIN)
    // ------------------------------------------------------------------------
    const hostname = url.hostname.toLowerCase();
    const parts = hostname.split('.');
    let sub = '';
    if (parts.length >= 3 && parts[0] !== 'www') {
      sub = parts[0];
    }

    // Nếu vào trang chủ của một subdomain -> rewrite nội bộ đến thư mục môn học
    if (sub && SUBDOMAIN_MAP[sub] && (url.pathname === '/' || url.pathname === '')) {
      const rewritten = new URL(SUBDOMAIN_MAP[sub], url.origin);
      if (env.ASSETS) {
        return env.ASSETS.fetch(new Request(rewritten, request));
      }
    }

    // ------------------------------------------------------------------------
    // PHẦN 2: CÁC ROUTE BACKEND API (/api/*)
    // ------------------------------------------------------------------------
    if (url.pathname === "/api/health") {
      return new Response(JSON.stringify({
        status: "ok",
        app: "Cổng Giảng Dạy CNTT - CĐ Buôn Ma Thuột",
        domain: "phamtiendong.name.vn",
        hasD1: !!(env && env.DB),
        timestamp: new Date().toISOString()
      }), { headers: CORS_HEADERS });
    }

    if (url.pathname === "/api/auth" && request.method === "POST") {
      try {
        const body = await request.json();
        const enteredSecret = (body.secret || "").trim();
        const serverSecret = (env && (env.TEACHER_SECRET || env.ADMIN_TOKEN) ? (env.TEACHER_SECRET || env.ADMIN_TOKEN) : "BMTC2026").trim();
        if (enteredSecret && enteredSecret === serverSecret) {
          return new Response(JSON.stringify({ ok: true, message: "Xác thực thành công", token: serverSecret }), { headers: CORS_HEADERS });
        }
        return new Response(JSON.stringify({ ok: false, error: "Mật khẩu quản trị không chính xác" }), { status: 401, headers: CORS_HEADERS });
      } catch (e) {
        return new Response(JSON.stringify({ ok: false, error: "Dữ liệu không hợp lệ" }), { status: 400, headers: CORS_HEADERS });
      }
    }

    if (url.pathname === "/api/classes") {
      let list = DEFAULT_CLASSES;
      if (env && env.DB) {
        try {
          const res = await env.DB.prepare("SELECT * FROM classes WHERE is_active = 1 ORDER BY class_name ASC").all();
          if (res.results && res.results.length) list = res.results;
        } catch (e) {}
      }
      return new Response(JSON.stringify({ ok: true, data: list }), { headers: CORS_HEADERS });
    }

    if (url.pathname === "/api/scores") {
      if (request.method === "POST") {
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
            return new Response(JSON.stringify({ ok: false, error: "Họ tên không được để trống" }), { status: 400, headers: CORS_HEADERS });
          }

          if (env && env.DB) {
            await ensureD1(env.DB);
            await env.DB.prepare(`
              INSERT INTO submissions (id, class_name, session_name, student_name, station, date_only, score, details_json, status)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).bind(id, className, sessionName, studentName, station, dateOnly, score, details, status).run();
          } else {
            globalThis.MEM_SCORES = globalThis.MEM_SCORES || [];
            globalThis.MEM_SCORES.unshift({ id, className, sessionName, studentName, station, dateOnly, score, status, submittedAt: new Date().toISOString() });
          }
          return new Response(JSON.stringify({ ok: true, id, message: "Nộp bài thành công!" }), { headers: CORS_HEADERS });
        } catch (e) {
          return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500, headers: CORS_HEADERS });
        }
      }

      if (request.method === "GET") {
        const className = url.searchParams.get("class");
        let list = [];
        if (env && env.DB) {
          try {
            await ensureD1(env.DB);
            let query = "SELECT * FROM submissions";
            const params = [];
            if (className) {
              query += " WHERE class_name = ?";
              params.push(className);
            }
            query += " ORDER BY submitted_at DESC LIMIT 100";
            const res = await env.DB.prepare(query).bind(...params).all();
            list = res.results || [];
          } catch (e) {}
        } else {
          list = globalThis.MEM_SCORES || [];
          if (className) list = list.filter(item => item.className === className);
        }
        return new Response(JSON.stringify({ ok: true, data: list }), { headers: CORS_HEADERS });
      }
    }

    if (url.pathname === "/api/assessments") {
      const slug = url.searchParams.get("slug") || "phan-cung";
      const bank = QUESTION_BANKS[slug] || QUESTION_BANKS["phan-cung"];

      if (request.method === "GET") {
        const questionsForStudent = bank.map((q, idx) => ({
          id: q.id,
          num: idx + 1,
          question: q.question,
          options: q.options
        }));
        return new Response(JSON.stringify({ ok: true, slug, total: questionsForStudent.length, questions: questionsForStudent }), { headers: CORS_HEADERS });
      }

      if (request.method === "POST") {
        try {
          const body = await request.json();
          const targetSlug = body.slug || "phan-cung";
          const studentName = String(body.studentName || "Học sinh").trim();
          const className = String(body.className || "Lớp").trim();
          const station = String(body.station || "").trim();
          const userAnswers = body.answers || {};

          const curBank = QUESTION_BANKS[targetSlug] || QUESTION_BANKS["phan-cung"];
          let correctCount = 0;
          const review = [];

          curBank.forEach((q) => {
            const selected = userAnswers[q.id];
            const isCorrect = selected === q.correct;
            if (isCorrect) correctCount++;
            review.push({
              id: q.id,
              question: q.question,
              options: q.options,
              userSelected: selected !== undefined ? selected : -1,
              correctOption: q.correct,
              isCorrect,
              explanation: q.explanation
            });
          });

          const total = curBank.length;
          const percentage = Math.round((correctCount / total) * 100);
          const score10 = Number(((correctCount / total) * 10).toFixed(1));
          const status = score10 >= 5.0 ? "ĐẠT" : "CHƯA ĐẠT";

          return new Response(JSON.stringify({
            ok: true,
            studentName,
            className,
            correctCount,
            total,
            percentage,
            score10,
            status,
            review
          }), { headers: CORS_HEADERS });
        } catch (e) {
          return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500, headers: CORS_HEADERS });
        }
      }
    }

    // ------------------------------------------------------------------------
    // PHẦN 3: PHỤC VỤ CÁC TRANG WEB TĨNH ASTRO TỪ BINDING ASSETS
    // ------------------------------------------------------------------------
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Cổng Giảng Dạy CNTT đang hoạt động", { status: 200 });
  }
};
