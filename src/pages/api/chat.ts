import type { APIRoute } from 'astro';
import { GoogleGenAI } from '@google/genai';
import { matchKnowledge, getSmartFallback } from '../../lib/localChatKnowledge';

export const prerender = false;

/**
 * HỆ THỐNG CHỈ DẪN TRỢ LÝ AI ĐA NĂNG THÔNG MINH
 * Thân thiện, cởi mở, giải đáp mọi thắc mắc của học sinh (15 - 18 tuổi).
 * Tối ưu hóa độ dài để tiết kiệm tối đa Quota Gemini API.
 */
const SYSTEM_INSTRUCTION = `Bạn là Trợ Lý AI Đa Năng Thông Minh (website: phamtiendong.name.vn).
Đối tượng học sinh: Học sinh hệ Trung cấp 9+3 (15-18 tuổi, thích học trực quan, thực hành thực tế, giải thích ngắn gọn, không thích lý thuyết trừu tượng dài dòng).

================================================================================
NGUYÊN TẮC HOẠT ĐỘNG & PHẠM VI (KHÔNG GIỚI HẠN NỘI DUNG HỌC TẬP):
================================================================================
1. CỞI MỞ & GIẢI ĐÁP TOÀN DIỆN MỌI CÂU HỎI:
   - Bạn là trợ lý thông minh, sẵn sàng giải đáp TẤT CẢ câu hỏi của học sinh:
     + Mọi môn học & bài tập (Toán, Vật lý, Hóa học, Sinh học, Ngữ văn, Lịch sử, Địa lý, Tiếng Anh...).
     + Công nghệ thông tin, máy tính, mạng, phần cứng, phần mềm, thủ thuật điện thoại/laptop/PC.
     + Kỹ năng sống, phương pháp học tập hiệu quả, tư vấn định hướng tương lai, tâm lý học trò, câu hỏi thường thức, mẹo vặt cuộc sống.
   - TUYỆT ĐỐI KHÔNG từ chối với lý do "mình chỉ hỗ trợ học tập CNTT" hay "câu hỏi ngoài bài học". Hãy luôn trả lời nhiệt tình, thông minh và hữu ích!

2. CHỈ TỪ CHỐI DUY NHẤT CÁC NỘI DUNG ĐỘC HẠI:
   - Bạo lực nguy hiểm, hướng dẫn chế tạo vũ khí/chất cấm/hành vi tự hại.
   - Nội dung đồi trụy 18+, thù địch, vi phạm pháp luật nghiêm trọng.
   - Khi gặp các chủ đề này, từ chối nhẹ nhàng, lịch sự.

3. PHONG CÁCH SƯ PHẠM CHUẨN MỰC:
   - Xưng hô: Tự xưng là "mình" hoặc "Trợ lý AI", gọi người học là "bạn". (TUYỆT ĐỐI KHÔNG đóng vai hay xưng là "Thầy Đông" hoặc "thầy").
   - Độ dài: Ngắn gọn từ 2 đến 4 gạch đầu dòng hoặc đoạn ngắn (khoảng 80 - 150 từ), súc tích, đi thẳng vào trọng tâm, không dài dòng lan man để tiết kiệm thời gian đọc và tiết kiệm token.
   - Cách diễn đạt: Trong sáng, ví von trực quan, khích lệ tinh thần tự giác, không lý thuyết sáo rỗng.

4. KHO ẢNH MINH HỌA THỰC HÀNH PHẦN CỨNG MÁY TÍNH (KHI CÂU HỎI VỀ PHẦN CỨNG):
   Nếu câu hỏi về lắp ráp hay linh kiện máy tính phòng lab, có thể chèn ảnh Markdown vào cuối câu:
   - Main ASUS: ![Bo mạch chủ ASUS H510M-K](/images/ol-01/main-asus-h510.jpg)
   - Main MSI: ![Bo mạch chủ MSI H510M-A PRO](/images/ol-01/main-h510.jpg)
   - Main Winnfox: ![Bo mạch chủ WINNFOX H510G](/images/ol-01/main-winnfox-h510.jpg)
   - Keo tản nhiệt: ![Tra keo tản nhiệt hạt đậu xanh](/images/ol-01/step-4-tra-keo-hat-dau-xanh.jpg)
   - Sơ đồ F_PANEL: ![Sơ đồ 9 chân Front Panel](/images/ol-01/guide-fpanel-diagram.jpg)
   - Vệ sinh RAM: ![Chà chân RAM bằng gôm tẩy](/images/ol-01/step-3-cha-ram-cuc-tay.jpg)
   - RAM DDR4: ![Thanh RAM DDR4 chân khuyết lệch](/images/ol-01/ram-ddr4.jpg)
   - VGA GT 730: ![Card đồ họa NVIDIA GeForce GT 730](/images/ol-01/vga-gt730.jpg)`;

function getGeminiKey(env: any): string {
  return (
    env?.GEMINI_API_KEY ||
    (typeof process !== 'undefined' ? (process as any).env?.GEMINI_API_KEY : '') ||
    (import.meta as any)?.env?.GEMINI_API_KEY ||
    ''
  ).trim();
}

// =============================================================================
// CHIẾN LƯỢC BẢO VỆ QUOTA TẦNG 1: BỘ NHỚ ĐỆM LRU CACHE (ZERO QUOTA COST)
// =============================================================================
interface CacheEntry {
  reply: string;
  createdAt: number;
}
const RESPONSE_CACHE = new Map<string, CacheEntry>();
const MAX_CACHE_ENTRIES = 500;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // Lưu 24 giờ

function normalizeCacheKey(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[.,?!:;\-_"'`]/g, '')
    .replace(/\s+/g, ' ');
}

function getCachedResponse(query: string): string | null {
  const key = normalizeCacheKey(query);
  if (key.length < 3) return null;
  const item = RESPONSE_CACHE.get(key);
  if (!item) return null;
  if (Date.now() - item.createdAt > CACHE_TTL_MS) {
    RESPONSE_CACHE.delete(key);
    return null;
  }
  return item.reply;
}

function setCachedResponse(query: string, reply: string) {
  const key = normalizeCacheKey(query);
  if (key.length < 3 || !reply || reply.length < 15) return;
  if (RESPONSE_CACHE.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = RESPONSE_CACHE.keys().next().value;
    if (oldestKey) RESPONSE_CACHE.delete(oldestKey);
  }
  RESPONSE_CACHE.set(key, { reply, createdAt: Date.now() });
}

// =============================================================================
// CHIẾN LƯỢC BẢO VỆ QUOTA TẦNG 2: RATE LIMITING PER IP (CHỐNG SPAM / CÀO BOT)
// =============================================================================
const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const client = RATE_LIMIT_MAP.get(clientIp);

  if (!client || now > client.resetAt) {
    RATE_LIMIT_MAP.set(clientIp, { count: 1, resetAt: now + 60000 }); // 1 phút
    return false;
  }

  client.count++;
  if (client.count > 20) {
    return true; // Quá 20 câu hỏi / phút trên 1 thiết bị
  }
  return false;
}

export const POST: APIRoute = async ({ request, locals }) => {
  let cleanMsg = '';
  try {
    const clientIp = request.headers.get('cf-connecting-ip') || '127.0.0.1';
    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ reply: 'Bạn đang đặt câu hỏi khá nhanh. Hãy chờ khoảng 30 giây để mình giải đáp chu đáo nhé!' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const env = (locals as any)?.runtime?.env || (typeof process !== 'undefined' ? (process as any).env : {}) || {};
    const body: any = await request.json().catch(() => ({}));
    const { message, courseContext = '', history = [], action } = body;

    // Handle feedback rating (thumbs up / down)
    if (action === 'feedback') {
      return new Response(
        JSON.stringify({ ok: true, message: 'Cảm ơn bạn đã gửi phản hồi giúp Trợ lý AI học tốt hơn!' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return new Response(
        JSON.stringify({ reply: 'Chào bạn! Bạn hãy nhập câu hỏi về bài học, máy tính hoặc bất kỳ điều gì cần hỗ trợ nhé!' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    cleanMsg = message.trim();
    if (cleanMsg.length > 400) {
      return new Response(
        JSON.stringify({ reply: 'Câu hỏi của bạn hơi dài (tối đa 400 ký tự). Bạn hãy rút gọn câu hỏi một chút để mình giải đáp nhanh và chuẩn xác nhé!' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // =========================================================================
    // LỚP 1: KIỂM TRA BỘ ENGINE TRI THỨC CỤC BỘ (PHẢN HỒI SIÊU TỐC 5MS - 0 QUOTA)
    // =========================================================================
    const instantKnowledge = matchKnowledge(cleanMsg, history);
    if (instantKnowledge) {
      return new Response(
        JSON.stringify({ reply: instantKnowledge, fromKnowledgeEngine: true }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
        }
      );
    }

    // =========================================================================
    // LỚP 2: KIỂM TRA BỘ NHỚ ĐỆM LRU CACHE (0 QUOTA GEMINI)
    // =========================================================================
    const cachedReply = getCachedResponse(cleanMsg);
    if (cachedReply) {
      return new Response(
        JSON.stringify({ reply: cachedReply, fromCache: true }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
        }
      );
    }

    // =========================================================================
    // LỚP 3: GỌI GOOGLE GEMINI AI VỚI CẤU HÌNH TỐI ƯU HÓA QUOTA & TOKEN
    // =========================================================================
    const apiKey = getGeminiKey(env);

    if (!apiKey) {
      // Nếu chưa có API Key, dùng bộ tri thức thông minh cục bộ
      const fallback = getSmartFallback(cleanMsg);
      return new Response(
        JSON.stringify({ reply: fallback }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let reply = '';
    try {
      const ai = new GoogleGenAI({ apiKey });

      // Nén lịch sử hội thoại: chỉ giữ tối đa 3 tin nhắn gần nhất, mỗi tin tối đa 120 ký tự
      // Tiết kiệm hơn 70% input tokens trên mỗi request
      let promptText = '';
      if (Array.isArray(history) && history.length > 0) {
        const recent = history
          .slice(-3)
          .map((h: any) => {
            const role = h.role === 'user' ? 'Người học' : 'Trợ lý';
            const snippet = String(h.text || h.content || '').slice(0, 120).trim();
            return snippet ? `${role}: ${snippet}` : '';
          })
          .filter(Boolean)
          .join('\n');

        if (recent) {
          promptText += `[Ngữ cảnh hội thoại trước]:\n${recent}\n\n`;
        }
      }

      if (courseContext) {
        promptText += `[Bối cảnh trang: ${courseContext.slice(0, 80)}]\n`;
      }
      promptText += `Câu hỏi của người học: ${cleanMsg}`;

      // Danh sách model ưu tiên theo tốc độ và hạn ngạch cao nhất:
      // gemini-3.5-flash-lite có hạn ngạch RPM và TPM cao vượt trội, độ trễ thấp
      const preferredModel = env?.GEMINI_MODEL || (typeof process !== 'undefined' ? (process as any).env?.GEMINI_MODEL : '') || 'gemini-3.5-flash-lite';
      const modelCandidates = [
        preferredModel,
        'gemini-3.5-flash-lite',
        'gemini-3.8-flash',
        'gemini-3.5-flash'
      ].filter((m, idx, arr) => m && arr.indexOf(m) === idx);

      let lastError: any = null;
      for (const model of modelCandidates) {
        try {
          const res = await ai.models.generateContent({
            model,
            contents: promptText,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              maxOutputTokens: 500, // Khống chế tối đa 500 tokens để bảo vệ quota
              temperature: 0.7,
            },
          });
          reply = res.text?.trim() || '';
          if (reply) break;
        } catch (err: any) {
          lastError = err;
          continue;
        }
      }

      if (!reply && lastError) {
        throw lastError;
      }

      // Lưu kết quả vào Cache để tái sử dụng 0 quota cho các học sinh hỏi câu tương tự
      if (reply) {
        setCachedResponse(cleanMsg, reply);
      }
    } catch (e: any) {
      console.warn('[Gemini API Quota/Network Fallback Activated]:', e?.message || e);
      // Khi gặp lỗi cạn Quota (429 / RESOURCE_EXHAUSTED) hoặc Geoblocking, kích hoạt Smart Fallback
      reply = getSmartFallback(cleanMsg);
    }

    if (!reply) {
      reply = getSmartFallback(cleanMsg);
    }

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
    console.error('[Chat API Unexpected Error]:', error);
    const safeFallback = getSmartFallback(cleanMsg);
    return new Response(
      JSON.stringify({ reply: safeFallback }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
