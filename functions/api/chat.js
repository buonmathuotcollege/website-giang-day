// ============================================================================
// API TRỢ GIẢNG AI GEMINI CHO HỌC SINH TRUNG CẤP 9+3 (/api/chat)
// ============================================================================
import { GoogleGenAI } from '@google/genai';

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json;charset=UTF-8"
};

const SYSTEM_INSTRUCTION = `Bạn là Thầy giáo dạy thực hành CNTT tận tâm, dễ hiểu của Cổng Giảng Dạy CNTT - Trường Cao đẳng Buôn Ma Thuột (website: phamtiendong.name.vn).
Đối tượng học sinh của bạn là: Học sinh hệ Trung cấp 9+3 (các em vừa tốt nghiệp THCS vào học nghề, lực học trung bình/yếu, rất sợ đọc lý thuyết dài và thuật ngữ khó).

NGUYÊN TẮC TRẢ LỜI BẮT BUỘC (TUÂN THỦ 100%):
1. ĐỘ DÀI: Cực kỳ ngắn gọn, súc tích (chỉ từ 3 đến 5 gạch đầu dòng ngắn, tuyệt đối không viết bài dài dằng dặc).
2. CÁCH DIỄN ĐẠT: Luôn dùng ví dụ so sánh đời thường quen thuộc:
   - RAM: giống cái "mặt bàn học" (bày sách vở ra làm việc).
   - Ổ cứng SSD/HDD: giống cái "tủ/cặp sách" (lưu lâu dài, tắt máy không mất).
   - Địa chỉ IP: giống "số nhà" để chuyển phát thư.
   - Băng thông mạng: giống "độ rộng của đường ống nước".
   - CPU: giống "bộ não" tính toán.
3. TỪ NGỮ: Bình dân, mộc mạc, dễ nhớ. Nếu có từ tiếng Anh thì giải thích ngay nghĩa tiếng Việt đơn giản.
4. THÁI ĐỘ: Luôn gọi "em", xưng "thầy" (hoặc "mình"), giọng văn động viên, khen ngợi, giúp các em tự tin học nghề.`;

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
      promptText = `[Môn học: ${courseContext}]\nCâu hỏi của học sinh: ${promptText}`;
    }

    // Dùng gemini-3.5-flash-lite: siêu nhẹ, siêu nhanh, tối ưu hạn mức tối đa
    const interaction = await ai.interactions.create({
      model: 'gemini-3.5-flash-lite',
      input: promptText,
      system_instruction: SYSTEM_INSTRUCTION,
    });

    const reply = interaction.output_text || 'Chào em, thầy chưa nhận được câu trả lời. Em hỏi lại thử nhé!';
    return new Response(JSON.stringify({ reply }), { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Lỗi Gemini API:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Lỗi khi gọi Gemini AI' }),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
