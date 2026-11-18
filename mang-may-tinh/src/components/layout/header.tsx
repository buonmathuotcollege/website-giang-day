import * as React from "react";
import Link from "next/link";

/**
 * Thanh điều hướng chính (Header Component)
 * Định vị thương hiệu: Cổng Học Tập & Giảng Dạy CNTT - CN. Phạm Tiến Đông
 * Chuẩn phong cách Slate/Zinc tối giản, hỗ trợ xem tốt trên điện thoại
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo & Định danh */}
        <Link href="/" className="flex items-center gap-2.5 text-slate-900 font-extrabold text-base sm:text-lg no-underline">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-900 text-white font-mono text-base shadow-xs">
            🌐
          </span>
          <div className="flex flex-col">
            <span className="leading-tight font-black tracking-tight">MẠNG MÁY TÍNH</span>
            <span className="text-[10px] text-slate-500 font-medium">Hệ 9+3 · CN. Phạm Tiến Đông</span>
          </div>
        </Link>

        {/* Menu Điều Hướng Nhanh */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-bold">
          <a
            href="#tong-quan"
            className="px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Tổng quan
          </a>
          <a
            href="#bam-cap-rj45"
            className="px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Bấm cáp RJ45
          </a>
          <a
            href="#chia-subnet"
            className="px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Tính Subnet
          </a>
          <a
            href="#so-do-ban"
            className="px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            10 Bàn KTV
          </a>
          <a
            href="#diem-danh"
            className="px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Điểm danh
          </a>
        </nav>

        {/* Nút Giảng viên */}
        <div className="flex items-center gap-2">
          <a
            href="https://phamtiendong.name.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <span>👨‍🏫</span>
            <span>CN. Phạm Tiến Đông</span>
          </a>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Hệ 9+3
          </span>
        </div>
      </div>
    </header>
  );
}
