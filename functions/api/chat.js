// ============================================================================
// API TRỢ GIẢNG AI GEMINI (/api/chat)
// ============================================================================
import { GoogleGenAI } from '@google/genai';

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json;charset=UTF-8"
};

const SYSTEM_INSTRUCTION = `Bạn là Trợ giảng AI thông minh, tận tâm và thân thiện của Cổng Giảng Dạy CNTT - Trường Cao đẳng Buôn Ma Thuột (website: phamtiendong.name.vn).
Nhiệm vụ của bạn là hỗ trợ sinh viên học tập, ôn luyện và thực hành các môn học trong chương trình:
1. Mạng máy tính căn bản & Thiết kế mạng LAN/WAN (mô hình OSI, TCP/IP, IP addressing, subnetting, định tuyến, VLAN, bấm cáp mạng...).
2. Kiến trúc & Phần cứng máy tính (CPU, RAM, Mainboard, ổ cứng, bus, lắp ráp, bảo trì, xử lý sự cố phần cứng...).
3. Quản trị hệ thống Windows & Linux (cài đặt, phân quyền, Active Directory, shell script, quản lý người dùng, dịch vụ mạng...).
4. Năng lực số & Kỹ năng CNTT.

Phong cách trả lời:
- Luôn lịch sự, khuyến khích tinh thần học tập của sinh viên.
- Giải thích rõ ràng, ngắn gọn, dễ hiểu, chia theo từng bước (bullet points) hoặc khối mã lệnh nếu có lệnh/code.
- Nếu sinh viên hỏi ngoài lĩnh vực công nghệ thông tin hoặc môn học, khéo léo chuyển hướng về nội dung học tập.`;

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const { message, courseContext = '' } = body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'Nội dung tin nhắn không được để trống.' }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const apiKey = env?.GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Chưa cấu hình GEMINI_API_KEY trên hệ thống.' }),
        { status: 500, headers: CORS_HEADERS }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    let promptText = message.trim();
    if (courseContext) {
      promptText = `[Bối cảnh môn học: ${courseContext}]\n\nCâu hỏi của sinh viên: ${promptText}`;
    }

    const interaction = await ai.interactions.create({
      model: 'gemini-4-hydrogen',
      input: promptText,
      system_instruction: SYSTEM_INSTRUCTION,
    });

    const reply = interaction.output_text || 'Xin lỗi, tôi chưa nhận được phản hồi từ hệ thống.';
    return new Response(JSON.stringify({ reply }), { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Lỗi Gemini API:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Lỗi khi gọi Gemini AI' }),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
