import { NextResponse } from "next/server";

// Cấu hình force-static để hỗ trợ xuất tĩnh (Static Export) trên Cloudflare Pages
export const dynamic = "force-static";
export const revalidate = 3600; // Tự động làm mới cache mỗi 1 giờ

export interface TechNewsArticle {
  id: string;
  title: string;
  snippet: string;
  url: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
}

/**
 * Danh sách tin tức an ninh mạng mẫu chuẩn (Fallback Data)
 * Đảm bảo Dashboard luôn hoạt động mượt mà ngay cả khi chưa cấu hình API Key hoặc mất kết nối ngoại mạng
 */
const FALLBACK_SECURITY_NEWS: TechNewsArticle[] = [
  {
    id: "sec-01",
    title: "Cảnh Báo Lỗ Hổng Bảo Mật Tầng Mạng Nghiêm Trọng Trên Thiết Bị Định Tuyến Router",
    snippet: "Các chuyên gia an toàn thông tin phát hiện lỗ hổng cho phép thực thi mã từ xa qua giao thức quản trị. Khuyến nghị nâng cấp firmware và đóng cổng WAN.",
    url: "https://www.cisa.gov/news-events/cybersecurity-advisories",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
    source: "CISA Security Advisory",
    publishedAt: "2026-11-17T09:30:00Z",
  },
  {
    id: "sec-02",
    title: "Bản Vá Bảo Mật Patch Tuesday: Khắc Phục Lỗ Hổng Tràn Bộ Đệm Dịch Vụ Mạng Windows",
    snippet: "Bản cập nhật khẩn cấp khắc phục sự cố tại giao thức SMBv3 và DNS Client, ngăn chặn nguy cơ lây lan mã độc tự động trong mạng nội bộ LAN.",
    url: "https://msrc.microsoft.com/update-guide",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    source: "Microsoft Security Response",
    publishedAt: "2026-11-16T14:15:00Z",
  },
  {
    id: "sec-03",
    title: "Khuyến Nghị Phân Tách VLAN & Kiểm Soát Truy Cập Chống Tấn Công Ransomware",
    snippet: "Quy chuẩn an ninh mạng 2026 yêu cầu cách ly dải mạng phòng học và khối văn phòng bằng Access Control List (ACL) trên Core Switch.",
    url: "https://www.sans.org/blog/network-security-basics/",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80",
    source: "SANS Network Security",
    publishedAt: "2026-11-15T08:00:00Z",
  },
  {
    id: "sec-04",
    title: "Tiêu Chuẩn Wi-Fi WPA3 Enterprise: Giải Pháp Triệt Tiêu Nguy Cơ Nghe Lén Gói Tin",
    snippet: "Nâng cấp giao thức bắt tay 4 bước lên Simultaneous Authentication of Equals (SAE), vô hiệu hóa hoàn toàn kỹ thuật dò mật khẩu từ điển.",
    url: "https://www.wi-fi.org/discover-wi-fi/security",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80",
    source: "Wi-Fi Alliance Bulletin",
    publishedAt: "2026-11-14T11:20:00Z",
  },
  {
    id: "sec-05",
    title: "Mô Hình Zero Trust Network Access (ZTNA) Thay Thế VPN Truyền Thống Trong Quản Trị",
    snippet: "Xác thực danh tính liên tục và cấp quyền tối thiểu (Least Privilege) cho từng phiên làm việc của Kỹ thuật viên quản trị mạng.",
    url: "https://csrc.nist.gov/publications/detail/sp/800-207/final",
    imageUrl: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=600&auto=format&fit=crop&q=80",
    source: "NIST Security Standards",
    publishedAt: "2026-11-13T16:45:00Z",
  },
];

/**
 * API Route: GET /api/tech-news/
 * Tự động tìm kiếm và lấy 5 bài viết mới nhất về "Network Security Updates"
 * Ưu tiên gọi News API -> Google Custom Search API -> Fallback an toàn
 */
export async function GET() {
  const newsApiKey = process.env.NEWS_API_KEY;
  const googleApiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const googleCx = process.env.GOOGLE_SEARCH_CX;

  // ==========================================================================
  // 1. TÙY CHỌN 1: GỌI NEWS API (NẾU CÓ KEY)
  // ==========================================================================
  if (newsApiKey && newsApiKey !== "your_news_api_key_here") {
    try {
      const query = encodeURIComponent("Network Security Updates");
      const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&pageSize=5&language=en&apiKey=${newsApiKey}`;
      
      const response = await fetch(url, {
        headers: { "User-Agent": "Antigravity-Network-Lab/1.0" },
        next: { revalidate: 3600 },
      });

      if (response.ok) {
        const json = await response.json();
        if (json.articles && Array.isArray(json.articles) && json.articles.length > 0) {
          const articles: TechNewsArticle[] = json.articles.slice(0, 5).map((a: any, idx: number) => ({
            id: `newsapi-${idx}-${Date.now()}`,
            title: a.title || "Tin tức bảo mật mạng mới",
            snippet: a.description || a.content || "Không có đoạn trích.",
            url: a.url || "#",
            imageUrl: a.urlToImage || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
            source: a.source?.name || "News API",
            publishedAt: a.publishedAt || new Date().toISOString(),
          }));

          return NextResponse.json({
            success: true,
            provider: "NewsAPI",
            query: "Network Security Updates",
            count: articles.length,
            data: articles,
          });
        }
      }
    } catch {
      // Tự động chuyển xuống phương thức kế tiếp khi gặp lỗi mạng
    }
  }

  // ==========================================================================
  // 2. TÙY CHỌN 2: GỌI GOOGLE CUSTOM SEARCH API (NẾU CÓ KEY & CX)
  // ==========================================================================
  if (googleApiKey && googleCx && googleApiKey !== "your_google_api_key_here") {
    try {
      const query = encodeURIComponent("Network Security Updates");
      const url = `https://www.googleapis.com/customsearch/v1?q=${query}&num=5&key=${googleApiKey}&cx=${googleCx}`;

      const response = await fetch(url, { next: { revalidate: 3600 } });

      if (response.ok) {
        const json = await response.json();
        if (json.items && Array.isArray(json.items) && json.items.length > 0) {
          const articles: TechNewsArticle[] = json.items.slice(0, 5).map((item: any, idx: number) => {
            const thumbnail =
              item.pagemap?.cse_image?.[0]?.src ||
              item.pagemap?.cse_thumbnail?.[0]?.src ||
              "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80";

            return {
              id: `google-${idx}-${Date.now()}`,
              title: item.title || "Cập nhật an toàn mạng",
              snippet: item.snippet || "Không có tóm tắt chi tiết.",
              url: item.link || "#",
              imageUrl: thumbnail,
              source: item.displayLink || "Google Search",
              publishedAt: new Date().toISOString(),
            };
          });

          return NextResponse.json({
            success: true,
            provider: "GoogleCustomSearch",
            query: "Network Security Updates",
            count: articles.length,
            data: articles,
          });
        }
      }
    } catch {
      // Tự động chuyển xuống Fallback
    }
  }

  // ==========================================================================
  // 3. FALLBACK AN TOÀN: TRẢ VỀ DANH SÁCH 5 BẢN TIN AN NINH MẠNG MỚI NHẤT
  // ==========================================================================
  return NextResponse.json({
    success: true,
    provider: "CuratedFallback",
    query: "Network Security Updates",
    count: FALLBACK_SECURITY_NEWS.length,
    data: FALLBACK_SECURITY_NEWS,
  });
}
