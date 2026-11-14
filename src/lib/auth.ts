export function checkAdminAuth(request: Request, env: any): boolean {
  const validSecret = String(
    env?.TEACHER_SECRET ||
    env?.ADMIN_TOKEN ||
    (typeof process !== 'undefined' ? (process as any).env?.TEACHER_SECRET : '') ||
    "BMTC2026"
  ).trim();

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
    if (token.startsWith("bmtc_sec_")) {
      try {
        const rawPayload = token.replace("bmtc_sec_", "");
        let decoded = "";
        if (typeof Buffer !== 'undefined') {
          decoded = Buffer.from(rawPayload, 'base64').toString('utf-8');
        } else if (typeof atob !== 'undefined') {
          decoded = decodeURIComponent(escape(atob(rawPayload)));
        }
        const [tokenSecret] = decoded.split(":");
        if (tokenSecret === validSecret) {
          return true;
        }
      } catch(e) {}
    }
  }

  return false;
}
