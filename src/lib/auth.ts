export function checkAdminAuth(request: Request, env: any): boolean {
  const validSecret = String(
    env?.TEACHER_SECRET ||
    env?.ADMIN_TOKEN ||
    (typeof process !== 'undefined' ? (process as any).env?.TEACHER_SECRET : '') ||
    ''
  ).trim();

  // Nếu máy chủ chưa cấu hình mã bí mật, từ chối mọi yêu cầu quản trị để đảm bảo an toàn
  if (!validSecret) {
    return false;
  }

  const authHeader = request.headers.get("Authorization") || "";
  const secretHeader = request.headers.get("x-admin-secret") || "";

  // 1. Kiểm tra trực tiếp qua header x-admin-secret
  if (secretHeader && secretHeader.trim() === validSecret) {
    return true;
  }

  // 2. Kiểm tra qua Bearer token
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (token === validSecret) {
      return true;
    }
    
    // Hỗ trợ cả tiền tố mới cntt_sec_ và tiền tố cũ bmtc_sec_
    const prefixes = ["cntt_sec_", "bmtc_sec_"];
    for (const prefix of prefixes) {
      if (token.startsWith(prefix)) {
        try {
          const rawPayload = token.replace(prefix, "");
          let decoded = "";
          if (typeof Buffer !== 'undefined') {
            decoded = Buffer.from(rawPayload, 'base64').toString('utf-8');
          } else if (typeof atob !== 'undefined') {
            decoded = decodeURIComponent(escape(atob(rawPayload)));
          }
          const [tokenSecret, timestampStr] = decoded.split(":");
          
          // Kiểm tra khớp mật khẩu
          if (tokenSecret !== validSecret) {
            continue;
          }

          // Kiểm tra thời hạn token (tối đa 7 ngày)
          if (timestampStr) {
            const tokenTime = Number(timestampStr);
            const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
            if (Number.isFinite(tokenTime) && Date.now() - tokenTime > MAX_AGE_MS) {
              return false; // Token hết hạn
            }
          }

          return true;
        } catch(e) {}
      }
    }
  }

  return false;
}
