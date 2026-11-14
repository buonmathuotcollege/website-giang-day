import type { APIRoute } from 'astro';
import { GoogleGenAI } from '@google/genai';

export const prerender = false;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json;charset=UTF-8"
};

const SYSTEM_INSTRUCTION = `Bạn là Trợ Lý AI Học Tập chuyên gia Phần cứng Máy tính (website: phamtiendong.name.vn).
Nhiệm vụ: Tạo một đề bài sát hạch kỹ thuật viên phần cứng máy tính chuẩn theo Thông tư 55/2026/TT-BGDĐT cho học sinh Trung cấp 9+3 (15-18 tuổi).
QUY CHUẨN BẮT BUỘC:
1. TUYỆT ĐỐI KHÔNG dùng từ lóng dân dã (không dùng: "thợ", "bí kíp", "xưởng thợ"). Dùng thuật ngữ tiêu chuẩn: "Kỹ thuật viên (KTV)", "Bàn kỹ thuật", "Quy trình tiêu chuẩn".
2. TUYỆT ĐỐI KHÔNG đưa tên bất kỳ trường học cụ thể nào vào đề thi.
3. CẤU TRÚC ĐỀ THI: Gồm 3 phần tích hợp: (1) Xử lý 1 sự cố phần cứng có thật; (2) Cứu dữ liệu & Lắp ráp nâng cấp; (3) Cài đặt phần mềm tiện ích & Kiểm tra nghiệm thu.
4. ĐỊNH DẠNG JSON HỢP LỆ: Chỉ trả về JSON duy nhất (không có markdown backticks xung quanh, hoặc nếu có markdown thì bọc json chuẩn).
Cấu trúc JSON yêu cầu:
{
  "code": "ĐỀ THI AI STUDIO",
  "title": "Tiêu đề ngắn gọn mô tả sự cố và yêu cầu",
  "studentRole": "Kỹ thuật viên Xử lý sự cố",
  "customerName": "Khách hàng Văn phòng",
  "machineInfo": "PC Văn phòng Core i5 · RAM 8GB · C: 120GB, D: 500GB",
  "problemReport": "Mô tả lời kể của khách hàng khi mang máy đến",
  "hardwareIssue": "Mã lỗi ngắn gọn",
  "hardwareRemedy": "Quy trình các bước xử lý chuẩn của KTV",
  "targetDriveC_GB": 120,
  "targetDriveD_GB": 500,
  "dataFolder": "Desktop\\\\DU_LIEU_QUAN_TRONG (15 tệp, 180 MB)",
  "expectedRAM_GB": 8,
  "printerTask": false,
  "maxScore": 10.0
}`;

function getGeminiKey(env: any): string {
  return (env?.GEMINI_API_KEY || (typeof process !== 'undefined' ? (process as any).env?.GEMINI_API_KEY : '') || '').trim();
}

// Fallback dynamic generator when API key is missing or quota exceeded
const PRESET_TICKETS = [
  {
    ticketId: 'TICKET_AI_01',
    code: 'ĐỀ THI AI-01',
    title: 'Xử lý Máy tính bật lên kêu 1 tiếng bíp dài 2 tiếng bíp ngắn & Nâng cấp SSD NVMe',
    studentRole: 'Kỹ thuật viên Chẩn đoán & Xử lý sự cố đồ họa',
    customerName: 'Anh Nam (Phòng Thiết kế Đồ họa)',
    machineInfo: 'PC Đồ họa Core i5 · VGA rời GTX 1660 · RAM 16GB · C: 240GB, D: 1TB',
    problemReport: 'Sáng nay mở máy loa mainboard kêu 1 tiếng bíp dài 2 tiếng bíp ngắn, quạt quay nhưng màn hình không lên hình. Khách mang theo 1 ổ SSD M.2 NVMe 500GB mới nhờ lắp thêm và cứu tài liệu thiết kế.',
    hardwareIssue: 'vga_loose_or_dirty_pcie',
    hardwareRemedy: 'Rút điện xả tụ. Mở chốt PCIe tháo VGA, dùng gôm tẩy chà sạch 2 mặt chân mạ vàng. Cắm lại chặt thẳng góc, cắm nguồn phụ 6-pin. Lắp SSD NVMe vặn ốc tỳ. Khởi động Windows khởi tạo GPT và format NTFS.',
    targetDriveC_GB: 240,
    targetDriveD_GB: 1000,
    dataFolder: 'D:\\THIET_KE_2026 (18 tệp, 1.2 GB)',
    expectedRAM_GB: 16,
    printerTask: false,
    maxScore: 10.0,
  },
  {
    ticketId: 'TICKET_AI_02',
    code: 'ĐỀ THI AI-02',
    title: 'Xử lý Máy tính bị ngắt nguồn đột ngột khi mở ứng dụng nặng & Thay keo tản nhiệt CPU',
    studentRole: 'Kỹ thuật viên Bảo dưỡng Phần cứng',
    customerName: 'Chị Mai (Phòng Kế toán)',
    machineInfo: 'PC Văn phòng Core i3 · RAM 8GB · C: 120GB SSD, D: 500GB HDD',
    problemReport: 'Máy bật vào Windows gõ Word thì bình thường nhưng hễ mở YouTube hoặc phần mềm kế toán thì máy phát tiếng hú gió rất lớn rồi tự động sập nguồn đen ngòm. Khách cần bảo toàn dữ liệu kế toán.',
    hardwareIssue: 'cpu_overheating_thermal_paste',
    hardwareRemedy: 'Rút điện xả tụ. Tháo tản nhiệt CPU, lau sạch keo khô cũ bằng cồn/giấy mềm. Bơm đúng 1 giọt keo tản nhiệt hạt đậu xanh vào giữa lưng CPU. Khóa chốt tản nhiệt chéo đối xứng, cắm CPU_FAN. Đo HWMonitor < 65°C.',
    targetDriveC_GB: 120,
    targetDriveD_GB: 500,
    dataFolder: 'Desktop\\SO_SACH_KETOAN (42 tệp, 85 MB)',
    expectedRAM_GB: 8,
    printerTask: false,
    maxScore: 10.0,
  },
  {
    ticketId: 'TICKET_AI_03',
    code: 'ĐỀ THI AI-03',
    title: 'Xử lý Mất kết nối mạng LAN chấm than vàng & Kích hoạt máy in Canon văn phòng',
    studentRole: 'Kỹ thuật viên Mạng & Ngoại vi',
    customerName: 'Phòng Hành chính - Tổng hợp',
    machineInfo: 'PC Văn phòng Core i5 · RAM 8GB · C: 128GB SSD, D: 1TB HDD',
    problemReport: 'Máy tính không thể kết nối vào Internet, biểu tượng mạng góc phải màn hình hiện chấm than vàng, không in được tài liệu qua máy in văn phòng. Cần kiểm tra cáp mạng và xử lý kẹt lệnh in.',
    hardwareIssue: 'network_ip_conflict_and_printer_jam',
    hardwareRemedy: 'Kiểm tra cáp mạng RJ45, cấu hình card mạng sang DHCP tự động. Mở Services khởi động lại dịch vụ Print Spooler, hủy tài liệu kẹt Cancel All Documents, đặt máy in làm mặc định và in Test Page.',
    targetDriveC_GB: 128,
    targetDriveD_GB: 1000,
    dataFolder: 'Downloads\\VAN_BAN_2026 (25 tệp, 110 MB)',
    expectedRAM_GB: 8,
    printerTask: true,
    maxScore: 10.0,
  }
];

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any)?.runtime?.env || (process as any)?.env || {};

  try {
    const body = await request.json().catch(() => ({}));
    const userPrompt = String(body.prompt || '').trim().slice(0, 300);
    const category = String(body.category || '').trim();

    const apiKey = getGeminiKey(env);

    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      const modelName = env?.GEMINI_MODEL || 'gemini-2.5-flash';

      let promptText = `Hãy tạo 1 đề thi sát hạch thực hành phần cứng máy tính chuẩn TT55.`;
      if (userPrompt) {
        promptText += `\nYêu cầu tình huống khách hàng hoặc lỗi phần cứng cần mô phỏng: "${userPrompt}"`;
      } else if (category) {
        promptText += `\nChủ đề trọng tâm: ${category}`;
      } else {
        promptText += `\nHãy tạo 1 tình huống thực tế thường gặp nhất ở phòng máy / văn phòng.`;
      }
      promptText += `\nĐảm bảo chỉ trả về JSON thuần túy theo đúng cấu trúc đã chỉ định, không thêm bất kỳ văn bản giải thích nào khác.`;

      try {
        const res = await ai.models.generateContent({
          model: modelName,
          contents: promptText,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: "application/json"
          }
        });

        const rawText = res.text?.trim() || '';
        if (rawText) {
          const cleanJson = rawText.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
          const parsed = JSON.parse(cleanJson);

          const ticket = {
            ticketId: 'TICKET_AI_' + Date.now(),
            code: parsed.code || 'ĐỀ THI AI STUDIO',
            title: parsed.title || 'Ca bệnh thực hành kỹ thuật viên',
            studentRole: parsed.studentRole || 'Kỹ thuật viên Xử lý sự cố',
            customerName: parsed.customerName || 'Khách hàng Văn phòng',
            machineInfo: parsed.machineInfo || 'PC Văn phòng Core i5 · RAM 8GB · C: 120GB, D: 500GB',
            problemReport: parsed.problemReport || parsed.customerProblem || 'Sự cố phần cứng máy tính cần kiểm tra xử lý.',
            hardwareIssue: parsed.hardwareIssue || 'general_hardware_fault',
            hardwareRemedy: parsed.hardwareRemedy || parsed.correctAction || 'Rút điện xả tụ, vệ sinh chân cắm, tra keo tản nhiệt và kiểm tra vận hành.',
            targetDriveC_GB: Number(parsed.targetDriveC_GB) || 120,
            targetDriveD_GB: Number(parsed.targetDriveD_GB) || 500,
            dataFolder: parsed.dataFolder || parsed.dataTarget || 'Desktop\\DU_LIEU (15 files, 150 MB)',
            expectedRAM_GB: Number(parsed.expectedRAM_GB) || 8,
            printerTask: Boolean(parsed.printerTask),
            maxScore: 10.0,
          };

          return new Response(JSON.stringify({ ok: true, ticket, source: 'gemini' }), { headers: CORS_HEADERS });
        }
      } catch (geminiErr) {
        // Fall through to preset on API error
      }
    }

    // Dynamic preset fallback
    const selectedPreset = PRESET_TICKETS[Math.floor(Math.random() * PRESET_TICKETS.length)];
    const fallbackTicket = {
      ...selectedPreset,
      ticketId: 'TICKET_PRESET_' + Date.now(),
    };

    return new Response(JSON.stringify({ ok: true, ticket: fallbackTicket, source: 'preset' }), { headers: CORS_HEADERS });
  } catch (err: any) {
    const defaultPreset = PRESET_TICKETS[0];
    return new Response(JSON.stringify({
      ok: true,
      ticket: {
        ...defaultPreset,
        ticketId: 'TICKET_PRESET_DEFAULT',
      },
      source: 'preset'
    }), { headers: CORS_HEADERS });
  }
};
