// ============================================================================
// HỆ THỐNG XÁC THỰC GIẢNG VIÊN BẰNG TOKEN CHỮ KÝ SỐ HMAC-SHA256
// Không lưu mật khẩu thô trong token, có thời hạn và chữ ký số chống giả mạo
// ============================================================================

function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function bufferToBase64Url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Tạo token JWT ký bằng HMAC-SHA256 với khóa TEACHER_SECRET
 * Payload không chứa mật khẩu, chỉ chứa role và thời hạn
 */
export async function createTeacherToken(secret: string, expiresInDays = 7): Promise<string> {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const exp = now + (expiresInDays * 86400);
  const payload = base64UrlEncode(JSON.stringify({ role: "teacher", sub: "admin", iat: now, exp }));
  
  const dataToSign = `${header}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(dataToSign));
  const sig = bufferToBase64Url(sigBuf);
  return `cntt_jwt_${header}.${payload}.${sig}`;
}

/**
 * Xác minh token JWT có chữ ký HMAC-SHA256 hợp lệ và chưa hết hạn
 */
export async function verifyTeacherToken(token: string, secret: string): Promise<boolean> {
  if (!token || !secret) return false;
  if (!token.startsWith("cntt_jwt_")) return false;
  
  const rawJwt = token.replace("cntt_jwt_", "");
  const parts = rawJwt.split(".");
  if (parts.length !== 3) return false;
  
  const [headerB64, payloadB64, sigB64] = parts;
  try {
    const payloadStr = base64UrlDecode(payloadB64);
    const payload = JSON.parse(payloadStr);
    
    // 1. Kiểm tra thời hạn
    const now = Math.floor(Date.now() / 1000);
    if (!payload.exp || now > payload.exp) {
      return false; // Token hết hạn
    }
    
    // 2. Kiểm tra chữ ký HMAC
    const dataToSign = `${headerB64}.${payloadB64}`;
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    
    let b64Sig = sigB64.replace(/-/g, '+').replace(/_/g, '/');
    while (b64Sig.length % 4) b64Sig += '=';
    const binSig = atob(b64Sig);
    const sigBytes = new Uint8Array(binSig.length);
    for (let i = 0; i < binSig.length; i++) sigBytes[i] = binSig.charCodeAt(i);
    
    const isValid = await crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(dataToSign));
    return isValid;
  } catch(e) {
    return false;
  }
}

/**
 * Kiểm tra quyền truy cập Giảng viên từ Request
 * Hỗ trợ: Header x-admin-secret, Bearer token HMAC-SHA256, và legacy token trong thời hạn
 */
export async function checkAdminAuth(request: Request, env: any): Promise<boolean> {
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

  // 1. Kiểm tra trực tiếp qua header x-admin-secret (dành cho server-to-server hoặc CLI nội bộ)
  if (secretHeader && secretHeader.trim() === validSecret) {
    return true;
  }

  // 2. Kiểm tra qua Bearer token
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token) return false;

    // Chuẩn 1: Token HMAC-SHA256 Signed JWT mới
    if (token.startsWith("cntt_jwt_")) {
      return await verifyTeacherToken(token, validSecret);
    }

    // Chuẩn 2: Mật khẩu thô gửi qua Bearer
    if (token === validSecret) {
      return true;
    }
    
    // Chuẩn 3: Tạm thời tương thích ngược token legacy (chỉ chấp nhận nếu còn trong hạn 7 ngày)
    const legacyPrefixes = ["cntt_sec_", "bmtc_sec_"];
    for (const prefix of legacyPrefixes) {
      if (token.startsWith(prefix)) {
        try {
          const rawPayload = token.replace(prefix, "");
          let decoded = "";
          if (typeof Buffer !== 'undefined') {
            decoded = Buffer.from(rawPayload, 'base64').toString('utf-8');
          } else if (typeof atob !== 'undefined') {
            const bytes = Uint8Array.from(atob(rawPayload), c => c.charCodeAt(0));
            decoded = new TextDecoder().decode(bytes);
          }
          const [tokenSecret, timestampStr] = decoded.split(":");
          
          if (tokenSecret !== validSecret) {
            continue;
          }

          if (timestampStr) {
            const tokenTime = Number(timestampStr);
            const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
            if (Number.isFinite(tokenTime) && Date.now() - tokenTime > MAX_AGE_MS) {
              return false;
            }
          }

          return true;
        } catch(e) {}
      }
    }
  }

  return false;
}
