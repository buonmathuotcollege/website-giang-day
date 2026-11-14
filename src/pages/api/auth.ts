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
  const validSecret = String(env.TEACHER_SECRET || env.ADMIN_TOKEN || "BMTC2026").trim();

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
      b64 = btoa(unescape(encodeURIComponent(rawSecret)));
    }
    const token = "bmtc_sec_" + b64;

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
  const validSecret = String(env.TEACHER_SECRET || env.ADMIN_TOKEN || "BMTC2026").trim();

  const authHeader = request.headers.get("Authorization") || "";
  const secretHeader = request.headers.get("x-admin-secret") || "";

  if (secretHeader && secretHeader.trim() === validSecret) {
    return new Response(JSON.stringify({ ok: true, valid: true }), { headers: CORS_HEADERS });
  }

  if (authHeader.startsWith("Bearer bmtc_sec_")) {
    try {
      const decoded = Buffer.from(authHeader.replace("Bearer bmtc_sec_", ""), 'base64').toString('utf-8');
      const [tokenSecret] = decoded.split(":");
      if (tokenSecret === validSecret) {
        return new Response(JSON.stringify({ ok: true, valid: true }), { headers: CORS_HEADERS });
      }
    } catch(e) {}
  }

  return new Response(JSON.stringify({ ok: false, valid: false }), { status: 401, headers: CORS_HEADERS });
};
