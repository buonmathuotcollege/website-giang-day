import type { APIRoute } from 'astro';

export const prerender = false;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-admin-secret",
  "Content-Type": "application/json;charset=UTF-8"
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any)?.runtime?.env || (typeof process !== 'undefined' ? (process as any).env : {}) || {};
  const validSecret = String(env.TEACHER_SECRET || env.ADMIN_TOKEN || "").trim();

  if (!validSecret) {
    return new Response(JSON.stringify({
      ok: false,
      error: "Hệ thống chưa cấu hình biến môi trường TEACHER_SECRET trên máy chủ. Vui lòng cấu hình trên Dashboard Cloudflare."
    }), { status: 503, headers: CORS_HEADERS });
  }

  try {
    const body = await request.json();
    const inputSecret = String(body.secret || "").trim();

    if (!inputSecret) {
      return new Response(JSON.stringify({ 
        ok: false, 
        error: "Vui lòng nhập mã bí mật của Giảng viên!" 
      }), { status: 400, headers: CORS_HEADERS });
    }

    if (inputSecret !== validSecret) {
      // Bảo mật chống dò mã (Brute-force delay nhẹ)
      await new Promise(r => setTimeout(r, 400));
      return new Response(JSON.stringify({ 
        ok: false, 
        error: "Mã bí mật không chính xác. Quyền truy cập bị từ chối!" 
      }), { status: 401, headers: CORS_HEADERS });
    }

    // Mã chính xác -> Cấp token phiên làm việc có thời hạn
    const rawSecret = inputSecret + ":" + Date.now();
    let b64 = "";
    if (typeof Buffer !== 'undefined') {
      b64 = Buffer.from(rawSecret, 'utf-8').toString('base64');
    } else {
      const bytes = new TextEncoder().encode(rawSecret);
      let binary = '';
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
      b64 = btoa(binary);
    }
    const token = "cntt_sec_" + b64;

    return new Response(JSON.stringify({
      ok: true,
      message: "Xác thực Giảng viên thành công!",
      token: token,
      teacher: {
        name: "CN. Phạm Tiến Đông",
        role: "Giảng viên CNTT",
        authenticated_at: new Date().toISOString()
      }
    }), { headers: CORS_HEADERS });

  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: "Dữ liệu yêu cầu không hợp lệ" }), { status: 400, headers: CORS_HEADERS });
  }
};

// Kiểm tra token còn hợp lệ hay không
export const GET: APIRoute = async ({ request, locals }) => {
  const env = (locals as any)?.runtime?.env || (typeof process !== 'undefined' ? (process as any).env : {}) || {};
  const validSecret = String(env.TEACHER_SECRET || env.ADMIN_TOKEN || "").trim();

  if (!validSecret) {
    return new Response(JSON.stringify({ ok: false, valid: false, error: "TEACHER_SECRET chưa được thiết lập" }), { status: 503, headers: CORS_HEADERS });
  }

  const authHeader = request.headers.get("Authorization") || "";
  const secretHeader = request.headers.get("x-admin-secret") || "";

  if (secretHeader && secretHeader.trim() === validSecret) {
    return new Response(JSON.stringify({ ok: true, valid: true }), { headers: CORS_HEADERS });
  }

  const prefixes = ["cntt_sec_", "bmtc_sec_"];
  for (const prefix of prefixes) {
    const bearerPrefix = `Bearer ${prefix}`;
    if (authHeader.startsWith(bearerPrefix)) {
      try {
        const rawPayload = authHeader.replace(bearerPrefix, "");
        let decoded = "";
        if (typeof Buffer !== 'undefined') {
          decoded = Buffer.from(rawPayload, 'base64').toString('utf-8');
        } else {
          const bytes = Uint8Array.from(atob(rawPayload), c => c.charCodeAt(0));
          decoded = new TextDecoder().decode(bytes);
        }
        const [tokenSecret, timestampStr] = decoded.split(":");
        if (tokenSecret === validSecret) {
          if (timestampStr) {
            const tokenTime = Number(timestampStr);
            const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
            if (Number.isFinite(tokenTime) && Date.now() - tokenTime > MAX_AGE_MS) {
              return new Response(JSON.stringify({ ok: false, valid: false, error: "Token đã hết hạn" }), { status: 401, headers: CORS_HEADERS });
            }
          }
          return new Response(JSON.stringify({ ok: true, valid: true }), { headers: CORS_HEADERS });
        }
      } catch(e) {}
    }
  }

  return new Response(JSON.stringify({ ok: false, valid: false }), { status: 401, headers: CORS_HEADERS });
};
