import * as React from "react";

/**
 * Chân trang bản quyền (Footer Component)
 * Tuân thủ quy chuẩn thương hiệu cá nhân của CN. Phạm Tiến Đông
 */
export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-8 mt-16 text-center text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 space-y-2">
        <p className="font-bold text-slate-700">
          Cổng Học Tập & Giảng Dạy Chuyên Ngành Mạng Máy Tính (Hệ Trung cấp 9+3)
        </p>
        <p>
          Bản quyền thuộc về{" "}
          <a
            href="https://phamtiendong.name.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-slate-900 underline underline-offset-4 hover:text-blue-700"
          >
            CN. Phạm Tiến Đông
          </a>{" "}
          · Giảng viên / Kỹ sư CNTT
        </p>
        <p className="text-[11px] text-slate-400">
          Phương châm đào tạo: Kỹ năng thực chiến · An toàn Poka-Yoke · 100% Thực hành tại Bàn Kỹ Thuật
        </p>
      </div>
    </footer>
  );
}
