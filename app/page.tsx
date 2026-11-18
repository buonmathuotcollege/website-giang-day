'use client';

import React from 'react';
import Link from 'next/link';

// ============================================================================
// TRANG CHỦ CỔNG HỌC TẬP & GIẢNG DẠY CNTT (NEXT.JS APP ROUTER)
// Phụ trách: CN. Phạm Tiến Đông
// Trọng tâm: 2 Chuyên đề thực chiến cho học sinh Cơ sở Ea H'leo (Lớp 04THA3)
// ============================================================================

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <div>
              <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight block">
                Cổng Học Tập & Giảng Dạy CNTT
              </span>
              <span className="text-[10px] text-slate-500 font-medium block">
                CN. Phạm Tiến Đông · Cơ sở Ea H'leo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Lớp 04THA3 · Ea H'leo
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
          <span>🛡️ Chuẩn hóa Poka-Yoke</span>
          <span>•</span>
          <span>Thực hành "Mắt thấy - Tay làm"</span>
          <span>•</span>
          <span>Windows 10 Pro</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
          Hệ Thống Huấn Luyện Kỹ Thuật Viên & Bồi Dưỡng Học Sinh Giỏi CNTT
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Tập trung rèn luyện 2 chuyên đề cốt lõi: Đánh giá năng lực thực tế phần cứng theo quy chuẩn doanh nghiệp 
          và Sa bàn thi công mạng trọn gói 180 - 240 phút cho Đội tuyển HSG Cơ sở Ea H'leo.
        </p>
      </section>

      {/* Main Focus: 2 Chuyên Đề Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* CHUYÊN ĐỀ 01 CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-indigo-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  🛠️ CHUYÊN ĐỀ 01
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Chuẩn TT55 Phụ lục II
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                  💻
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-indigo-700 transition-colors">
                    Đánh Giá Năng Lực Phần Cứng Máy Tính
                  </h2>
                  <span className="text-xs text-slate-500 font-mono font-medium block mt-0.5">
                    MÃ: OL-01_PHAN_CUNG
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Mô phỏng bàn kỹ thuật 7 bước chuẩn Poka-Yoke, ngân hàng 100 câu trắc nghiệm tình huống, 
                20 câu vấn đáp tại bàn máy, nhận diện linh kiện thực tế (ASUS, MSI, WINNFOX H510) 
                và in phiếu nghiệm thu bàn giao chuẩn khổ A4.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <span>⏱️</span>
                  <span>Thời gian: <strong>15 - 180</strong> phút</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <span>🎯</span>
                  <span>Thang điểm: <strong>10.0</strong> Rubric</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Đang mở luyện tập
              </span>

              {/* Nút bấm 1 trỏ chính xác về /courses/ol-01-phan-cung */}
              <Link
                href="/courses/ol-01-phan-cung"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-black transition-all shadow-md hover:shadow-lg flex items-center gap-2 no-underline min-h-[48px]"
              >
                <span>Vào Ôn Luyện</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* CHUYÊN ĐỀ 02 CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  🏆 CHUYÊN ĐỀ 02
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                  Đội Tuyển HSG Ea H'leo
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                  🥇
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-amber-800 transition-colors">
                    Thi Học Sinh Giỏi Phần Cứng & Mạng
                  </h2>
                  <span className="text-xs text-slate-500 font-mono font-medium block mt-0.5">
                    MÃ: HSG-02_PHAN_CUNG_MANG
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Bồi dưỡng chuyên sâu: Bí quyết tính nhẩm Subnetting IPv4 & VLSM trong 30 giây, 
                ngân hàng 54 câu trắc nghiệm vận dụng cao và Sa bàn mô phỏng nhà thầu thi công 
                dự án trọn gói 5 chặng (180 - 240 phút) kèm Rubric 100 điểm.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <span>⚡</span>
                  <span>Subnetting: <strong>30 giây</strong></span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <span>📊</span>
                  <span>Sa bàn: <strong>5 chặng 100đ</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                Đang mở luyện thi
              </span>

              {/* Nút bấm 2 trỏ chính xác về /courses/hsg-phan-cung-mang */}
              <Link
                href="/courses/hsg-phan-cung-mang"
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-black transition-all shadow-md hover:shadow-lg flex items-center gap-2 no-underline min-h-[48px]"
              >
                <span>Vào Luyện Thi</span>
                <span>→</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 py-10 border-t border-slate-200 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-700">
          Cổng Học Tập & Giảng Dạy Kỹ Thuật CNTT · Giảng viên CN. Phạm Tiến Đông
        </p>
        <p className="mt-1 text-slate-400">
          Phục vụ đào tạo thực hành Trung cấp 9+3 · Cơ sở Ea H'leo
        </p>
      </footer>
    </main>
  );
}
