import type { APIRoute } from 'astro';
import { GoogleGenAI } from '@google/genai';

export const prerender = false;

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

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { message, history = [], courseContext = '' } = body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'Nội dung tin nhắn không được để trống.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Lấy API key từ process.env, import.meta.env hoặc Cloudflare runtime env
    const apiKey =
      process.env.GEMINI_API_KEY ||
      import.meta.env.GEMINI_API_KEY ||
      (locals as any)?.runtime?.env?.GEMINI_API_KEY ||
      '';

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'Chưa cấu hình GEMINI_API_KEY trên máy chủ. Vui lòng kiểm tra file .env!',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Tạo prompt hoàn chỉnh kèm context
    let promptText = message.trim();
    if (courseContext) {
      promptText = `[Bối cảnh môn học đang xem: ${courseContext}]\n\nCâu hỏi của sinh viên: ${promptText}`;
    }

    // Gọi Gemini Interactions API (dùng mô hình gemini-4-hydrogen nhanh và thông minh)
    const interaction = await ai.interactions.create({
      model: 'gemini-4-hydrogen',
      input: promptText,
      system_instruction: SYSTEM_INSTRUCTION,
    });

    const reply = interaction.output_text || 'Xin lỗi, tôi chưa nhận được câu trả lời từ hệ thống.';

    return new Response(
      JSON.stringify({ reply }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error: any) {
    console.error('Lỗi khi gọi Gemini API:', error);
    return new Response(
      JSON.stringify({
        error: error?.message || 'Có lỗi xảy ra khi xử lý phản hồi từ Gemini AI.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
