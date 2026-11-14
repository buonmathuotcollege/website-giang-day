import type { APIRoute } from 'astro';
import { GoogleGenAI } from '@google/genai';

export const prerender = false;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json;charset=UTF-8"
};

const SYSTEM_INSTRUCTION = `Bạn là Thầy giáo dạy thực hành phần cứng CNTT tại Trường Cao đẳng Buôn Ma Thuột.
Đối tượng học sinh: Học sinh hệ Trung cấp 9+3 (15-18 tuổi, lực học trung bình, rất ngại đọc chữ dài).
Nhiệm vụ: Giải thích vì sao học sinh chọn sai hoặc giải thích bản chất câu hỏi trắc nghiệm kỹ thuật.
YÊU CẦU BẮT BUỘC:
1. ĐỘ DÀI: Tối đa đúng 2 đến 3 câu văn (dưới 50 từ).
2. PHONG CÁCH: Thân mật như người thầy đang đứng bên cạnh bàn máy: "Em chọn câu đó chưa đúng rồi...", "Em nhớ quy tắc này: ...".
3. VÍ VON ĐỜI THƯỜNG: Dùng hình ảnh cục tẩy, hạt đậu xanh, xe đạp vs xe hơi, tủ đựng đồ, rãnh khuyết... Tuyệt đối không dùng từ ngữ hàn lâm tiếng Anh khó hiểu.`;

function getGeminiKey(env: any): string {
  const direct = env?.GEMINI_API_KEY || (typeof process !== 'undefined' ? (process as any).env?.GEMINI_API_KEY : '');
  if (direct && direct.trim()) return direct.trim();
  try {
    const b64 = "QVEuQWI4Uk42S1FGZWhUczBPWHBROXBUUEdtQy1vS2tZOFQ0Yjhha2RsNXEwd2NlNFVRWWc=";
    return typeof Buffer !== 'undefined' ? Buffer.from(b64, 'base64').toString('utf-8') : atob(b64);
  } catch (e) {
    return "";
  }
}

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any)?.runtime?.env || (process as any)?.env || {};

  try {
    const body = await request.json();
    const { question, options = [], selectedOption = '', correctOption = '', fallbackExplanation = '' } = body;

    const apiKey = getGeminiKey(env);

    if (!apiKey) {
      return new Response(JSON.stringify({
        ok: true,
        explanation: fallbackExplanation || "Em chú ý đối chiếu lại kiến thức thực tế trên bàn máy nhé!"
      }), { headers: CORS_HEADERS });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Câu hỏi trắc nghiệm: "${question}"
Các lựa chọn: ${options.join(' | ')}
Học sinh chọn: "${selectedOption}"
Đáp án đúng là: "${correctOption}"
Thầy hãy giải thích cho học sinh 9+3 hiểu vì sao chọn như vậy bằng 2 câu đời thường ngắn nhất.`;

    let reply = '';
    try {
      const interaction = await ai.interactions.create({
        model: 'gemini-3.5-flash-lite',
        input: prompt,
        system_instruction: SYSTEM_INSTRUCTION,
      });
      reply = (interaction as any).output_text?.trim() || '';
    } catch (e) {
      const res = await ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: prompt,
        config: { systemInstruction: SYSTEM_INSTRUCTION },
      });
      reply = res.text?.trim() || '';
    }

    reply = reply || fallbackExplanation || "Em chú ý đối chiếu lại kiến thức thực tế trên bàn máy nhé!";
    return new Response(JSON.stringify({ ok: true, explanation: reply }), { headers: CORS_HEADERS });
  } catch (err: any) {
    return new Response(JSON.stringify({
      ok: true,
      explanation: "Em xem lại mẹo của người thợ 20 năm nghề trên lớp nhé!"
    }), { headers: CORS_HEADERS });
  }
};
