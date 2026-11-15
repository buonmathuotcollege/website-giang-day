import type { APIRoute } from 'astro';
import { createTeacherToken, checkAdminAuth } from '../../lib/auth';

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

// 1. ĐĂNG NHẬP / XÁC THỰC GIẢNG VIÊN -> CẤP TOKEN KÝ SỐ HMAC-SHA256
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
    const body = await request.json().catch(() => ({}));
    const inputSecret = String(body.secret || "").trim();

    if (!inputSecret) {
      return new Response(JSON.stringify({ 
        ok: false, 
        error: "Vui lòng nhập mã bí mật của Giảng viên!" 
      }), { status: 400, headers: CORS_HEADERS });
    }

    if (inputSecret !== validSecret) {
      // Bảo mật chống dò mã (Brute-force delay nhẹ 400ms)
      await new Promise(r => setTimeout(r, 400));
      return new Response(JSON.stringify({ 
        ok: false, 
        error: "Mã bí mật không chính xác. Quyền truy cập bị từ chối!" 
      }), { status: 401, headers: CORS_HEADERS });
    }

    // Mã chính xác -> Cấp Token JWT chữ ký số HMAC-SHA256 (hạn 7 ngày)
    // Token KHÔNG chứa mật khẩu, không thể giải mã ngược ra bí mật
    const token = await createTeacherToken(validSecret, 7);

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

// 2. KIỂM TRA TÍNH HỢP LỆ CỦA PHIÊN ĐĂNG NHẬP
export const GET: APIRoute = async ({ request, locals }) => {
  const env = (locals as any)?.runtime?.env || (typeof process !== 'undefined' ? (process as any).env : {}) || {};
  const validSecret = String(env.TEACHER_SECRET || env.ADMIN_TOKEN || "").trim();

  if (!validSecret) {
    return new Response(JSON.stringify({ ok: false, valid: false, error: "TEACHER_SECRET chưa được thiết lập" }), { status: 503, headers: CORS_HEADERS });
  }

  const isValid = await checkAdminAuth(request, env);
  if (isValid) {
    return new Response(JSON.stringify({ ok: true, valid: true }), { headers: CORS_HEADERS });
  }

  return new Response(JSON.stringify({ ok: false, valid: false, error: "Phiên làm việc hết hạn hoặc không hợp lệ" }), { status: 401, headers: CORS_HEADERS });
};
