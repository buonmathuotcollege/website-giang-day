export async function onRequestGet(context) {
  const { env } = context;
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=UTF-8"
  };

  return new Response(JSON.stringify({
    status: "ok",
    app: "Cổng Giảng Dạy CNTT - CĐ Buôn Ma Thuột",
    domain: "phamtiendong.name.vn",
    hasD1: !!(env && env.DB),
    timestamp: new Date().toISOString()
  }), { headers: cors });
}
