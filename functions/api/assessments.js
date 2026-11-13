// ============================================================================
// API ĐÁNH GIÁ NĂNG LỰC TRẮC NGHIỆM (/api/assessments)
// ============================================================================

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json;charset=UTF-8"
};

// Ngân hàng câu hỏi chuẩn cho 2 môn Đánh giá năng lực
const QUESTION_BANKS = {
  "phan-cung": [
    {
      id: "pc_01",
      question: "Linh kiện nào sau đây được coi là 'bộ não' điều khiển mọi hoạt động tính toán của máy tính?",
      options: ["RAM (Random Access Memory)", "CPU (Central Processing Unit)", "GPU (Graphics Processing Unit)", "Bộ nguồn (PSU)"],
      correct: 1,
      explanation: "CPU (Central Processing Unit) là bộ vi xử lý trung tâm, thực thi các lệnh chương trình."
    },
    {
      id: "pc_02",
      question: "Khi tắt máy tính hoặc mất điện đột ngột, dữ liệu lưu trong linh kiện nào sau đây sẽ bị mất hoàn toàn?",
      options: ["Ổ đĩa cứng SSD", "Ổ đĩa cứng HDD", "Bộ nhớ RAM", "ROM BIOS"],
      correct: 2,
      explanation: "RAM là bộ nhớ truy xuất ngẫu nhiên khả biến (volatile), mất toàn bộ dữ liệu khi ngắt điện."
    },
    {
      id: "pc_03",
      question: "Cổng giao tiếp nào hiện nay phổ biến nhất để xuất hình ảnh kèm âm thanh kỹ thuật số chất lượng cao ra màn hình?",
      options: ["VGA (D-Sub)", "DVI", "HDMI / DisplayPort", "Cổng COM (RS-232)"],
      correct: 2,
      explanation: "HDMI và DisplayPort truyền tải đồng thời cả hình ảnh kỹ thuật số độ nét cao lẫn tín hiệu âm thanh."
    },
    {
      id: "pc_04",
      question: "Keo tản nhiệt (Thermal Paste) có tác dụng chủ yếu nào sau đây trong phần cứng máy tính?",
      options: ["Gắn dính vĩnh viễn CPU vào socket", "Lấp đầy các khe hở siêu vi giữa bề mặt CPU và đế tản nhiệt để dẫn nhiệt tốt hơn", "Làm sạch bụi bẩn trên vi xử lý", "Cung cấp nguồn điện phụ cho quạt tản nhiệt"],
      correct: 1,
      explanation: "Keo tản nhiệt loại bỏ các bọt khí siêu nhỏ giữa bề mặt IHS của CPU và quạt tản nhiệt, tối đa hóa hiệu suất tản nhiệt."
    },
    {
      id: "pc_05",
      question: "Ổ lưu trữ thể rắn SSD chuẩn NVMe sử dụng khe cắm vật lý nào trên bo mạch chủ (Mainboard)?",
      options: ["Khe PCI thông thường", "Khe cắm M.2 PCIe", "Cổng SATA 2", "Khe cắm RAM DDR4"],
      correct: 1,
      explanation: "SSD NVMe sử dụng giao tiếp khe cắm chuẩn M.2 chạy trên băng thông PCIe tốc độ cao."
    }
  ],
  "mang": [
    {
      id: "net_01",
      question: "Mô hình tham chiếu OSI chuẩn hóa truyền thông mạng máy tính bao gồm bao nhiêu tầng (layers)?",
      options: ["4 tầng", "5 tầng", "7 tầng", "9 tầng"],
      correct: 2,
      explanation: "Mô hình OSI gồm 7 tầng: Vật lý, Liên kết dữ liệu, Mạng, Giao vận, Phiên, Trình diễn, Ứng dụng."
    },
    {
      id: "net_02",
      question: "Thiết bị mạng nào hoạt động tại Tầng 3 (Network Layer) để định tuyến gói tin giữa các mạng IP khác nhau?",
      options: ["Hub", "Switch chuẩn Layer 2", "Router (Bộ định tuyến)", "Repeater (Bộ lặp sóng)"],
      correct: 2,
      explanation: "Router là thiết bị tầng 3 chịu trách nhiệm định tuyến đường đi cho gói tin giữa các mạng logic khác nhau."
    },
    {
      id: "net_03",
      question: "Địa chỉ IPv4 nào sau đây thuộc dải địa chỉ mạng riêng (Private IP) dùng trong mạng nội bộ LAN?",
      options: ["8.8.8.8", "192.168.1.100", "1.1.1.1", "203.162.0.11"],
      correct: 1,
      explanation: "Dải IP riêng theo RFC 1918 gồm: 10.0.0.0/8, 172.16.0.0/12, và 192.168.0.0/16."
    },
    {
      id: "net_04",
      question: "Giao thức nào có nhiệm vụ tự động cấp phát địa chỉ IP, Subnet Mask và Gateway cho các thiết bị khi kết nối vào mạng?",
      options: ["DNS (Domain Name System)", "DHCP (Dynamic Host Configuration Protocol)", "FTP (File Transfer Protocol)", "HTTP (Hypertext Transfer Protocol)"],
      correct: 1,
      explanation: "DHCP tự động cấu hình và cấp phát thông số mạng (IP, Mask, Gateway, DNS) cho client."
    },
    {
      id: "net_05",
      question: "Lệnh dòng lệnh (Command Line) nào dùng để kiểm tra tính thông suốt kết nối giữa 2 nút mạng bằng gói tin ICMP?",
      options: ["ipconfig / all", "ping", "tracert", "netstat"],
      correct: 1,
      explanation: "Lệnh ping gửi gói tin ICMP Echo Request để xác định khả năng phản hồi và độ trễ tới máy đích."
    }
  ]
};

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

// 1. LẤY BỘ ĐỀ THI TRẮC NGHIỆM (GET)
export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug") || "phan-cung";

  const bank = QUESTION_BANKS[slug] || QUESTION_BANKS["phan-cung"];

  // Khi học sinh nhận đề, ẩn đáp án đúng đi
  const questionsForStudent = bank.map((q, idx) => ({
    id: q.id,
    num: idx + 1,
    question: q.question,
    options: q.options
  }));

  return new Response(JSON.stringify({
    ok: true,
    slug,
    total: questionsForStudent.length,
    questions: questionsForStudent
  }), { headers: CORS_HEADERS });
}

// 2. NỘP BÀI VÀ TỰ ĐỘNG CHẤM ĐIỂM (POST)
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const slug = body.slug || "phan-cung";
    const studentName = String(body.studentName || "Học sinh").trim();
    const className = String(body.className || "Lớp").trim();
    const station = String(body.station || "").trim();
    const userAnswers = body.answers || {}; // Object dạng: { pc_01: 1, pc_02: 2 }

    const bank = QUESTION_BANKS[slug] || QUESTION_BANKS["phan-cung"];
    let correctCount = 0;
    const reviewDetails = [];

    bank.forEach((q) => {
      const selected = userAnswers[q.id];
      const isCorrect = selected === q.correct;
      if (isCorrect) correctCount++;

      reviewDetails.push({
        id: q.id,
        question: q.question,
        options: q.options,
        userSelected: selected !== undefined ? selected : -1,
        correctOption: q.correct,
        isCorrect,
        explanation: q.explanation
      });
    });

    const total = bank.length;
    const percentage = Math.round((correctCount / total) * 100);
    const score10 = Number(((correctCount / total) * 10).toFixed(1));
    const status = score10 >= 5.0 ? "ĐẠT" : "CHƯA ĐẠT";

    // Lưu kết quả nếu có CSDL D1
    if (env && env.DB) {
      try {
        const resId = "asm_res_" + Date.now();
        await env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS assessment_results (
            id TEXT PRIMARY KEY,
            assessment_id TEXT NOT NULL,
            student_name TEXT NOT NULL,
            class_name TEXT NOT NULL,
            station TEXT DEFAULT '',
            score REAL NOT NULL,
            total INTEGER NOT NULL,
            percentage REAL NOT NULL,
            status TEXT NOT NULL,
            answers_json TEXT DEFAULT '{}',
            completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `).run();

        await env.DB.prepare(`
          INSERT INTO assessment_results (id, assessment_id, student_name, class_name, station, score, total, percentage, status, answers_json)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(resId, slug, studentName, className, station, score10, total, percentage, status, JSON.stringify(userAnswers)).run();
      } catch (err) {}
    }

    return new Response(JSON.stringify({
      ok: true,
      studentName,
      className,
      correctCount,
      total,
      percentage,
      score10,
      status,
      review: reviewDetails
    }), { headers: CORS_HEADERS });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500, headers: CORS_HEADERS });
  }
}
