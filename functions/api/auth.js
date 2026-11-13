export async function onRequestPost(context) {
  const { request, env } = context;
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json;charset=UTF-8"
  };

  try {
    const body = await request.json();
    const enteredSecret = (body.secret || "").trim();
    const serverSecret = (env && (env.TEACHER_SECRET || env.ADMIN_TOKEN) ? (env.TEACHER_SECRET || env.ADMIN_TOKEN) : "BMTC2026").trim();

    if (enteredSecret && enteredSecret === serverSecret) {
      return new Response(JSON.stringify({
        ok: true,
        message: "Xác thực thành công",
        token: serverSecret
      }), { headers: cors });
    }

    return new Response(JSON.stringify({
      ok: false,
      error: "Mật khẩu quản trị không chính xác"
    }), { status: 401, headers: cors });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "Dữ liệu gửi lên không hợp lệ" }), { status: 400, headers: cors });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
