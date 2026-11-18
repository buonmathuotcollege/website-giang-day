import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chuyên Ngành Mạng Máy Tính (Hệ 9+3) - CN. Phạm Tiến Đông",
  description: "Cổng Học Tập, Thực Hành & Sát Hạch Chuyên Ngành Mạng Máy Tính - CN. Phạm Tiến Đông",
};

/**
 * Layout tổng thể của ứng dụng Mạng máy tính
 * Thiết kế tối giản Slate/Zinc, tương thích hoàn hảo thiết bị di động
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
