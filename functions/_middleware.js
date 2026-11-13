// ============================================================================
// CLOUDFLARE PAGES MIDDLEWARE: SUBDOMAIN ROUTER CHO TỪNG MÔN HỌC
// ============================================================================

const SUBDOMAIN_MAP = {
  'nanglucso': '/courses/nang-luc-so',
  'kientruc': '/courses/kien-truc-may-tinh',
  'phancung': '/courses/phan-cung-may-tinh',
  'mang': '/courses/mang-can-ban',
  'lanwan': '/courses/thiet-ke-quan-tri-lan-wan',
  'winlinux': '/courses/quan-tri-windows-linux',
  'danhgia': '/assessment'
};

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Không can thiệp các request API và static assets thông thường
  if (url.pathname.startsWith('/api/') || url.pathname.includes('.')) {
    return next();
  }

  const hostname = url.hostname.toLowerCase();
  const parts = hostname.split('.');

  // Kiểm tra nếu là subdomain (ví dụ: nanglucso.phamtiendong.name.vn hoặc phancung.localhost)
  let sub = '';
  if (parts.length >= 3 && parts[0] !== 'www') {
    sub = parts[0];
  }

  if (sub && SUBDOMAIN_MAP[sub]) {
    const targetBase = SUBDOMAIN_MAP[sub];
    // Nếu truy cập trang chủ subdomain "/" -> chuyển nội bộ đến môn học tương ứng
    if (url.pathname === '/' || url.pathname === '') {
      const rewrittenUrl = new URL(targetBase, url.origin);
      return context.env.ASSETS ? context.env.ASSETS.fetch(new Request(rewrittenUrl, request)) : next();
    }
  }

  return next();
}
