'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// ============================================================================
// TRANG CHỦ CỔNG HỌC TẬP & GIẢNG DẠY CNTT (NEXT.JS APP ROUTER)
// Phụ trách: CN. Phạm Tiến Đông
// Trọng tâm: 2 Chuyên đề thực chiến cho học sinh Cơ sở Ea H'leo (Lớp 04THA3)
// ============================================================================

export default function HomePage() {
  // Practice Station & Lottery State
  const [selectedStation, setSelectedStation] = useState('Máy 01');
  const [drawnTicket, setDrawnTicket] = useState({
    code: 'TH-01',
    title: 'Máy bật quạt quay nhưng không lên hình, còi bíp liên tục không ngừng',
    mainboard: 'MSI H510M-B',
    symptom: 'Quạt CPU quay bình thường, màn hình đen, đèn báo DRAM sáng cam.',
    cause: 'Chân RAM DDR4 bị oxy hóa bám bụi hoặc lỏng ngàm gài.',
    remedy: 'Rút nguồn xả điện 30s ➔ Dùng cục tẩy chà sạch 2 mặt chân vàng RAM ➔ Thổi bụi khe cắm ➔ Gài đều 2 đầu ngàm.',
    targetUrl: '/courses/ol-01-phan-cung',
  });
  const [isSpinning, setIsSpinning] = useState(false);

  const tickets = [
    {
      code: 'TH-01',
      title: 'Máy bật quạt quay nhưng không lên hình, còi bíp liên tục không ngừng',
      mainboard: 'MSI H510M-B',
      symptom: 'Quạt CPU quay bình thường, màn hình đen, đèn báo DRAM sáng cam.',
      cause: 'Chân RAM DDR4 bị oxy hóa bám bụi hoặc lỏng ngàm gài.',
      remedy: 'Rút nguồn xả điện 30s ➔ Dùng cục tẩy chà sạch 2 mặt chân vàng RAM ➔ Thổi bụi khe cắm ➔ Gài đều 2 đầu ngàm.',
      targetUrl: '/courses/ol-01-phan-cung',
    },
    {
      code: 'TH-02',
      title: 'Khách mang máy đến yêu cầu cài lại Windows 10 do dính virus, máy chứa dữ liệu kế toán',
      mainboard: 'ASUS Prime H510M-K',
      symptom: 'Windows khởi động chậm, có nhiều pop-up lạ, dữ liệu khách nằm trên Desktop và thư mục Zalo.',
      cause: 'Hệ điều hành nhiễm mã độc.',
      remedy: 'Cắm USB WinPE ➔ Vào ổ C cũ copy thư mục Desktop/Documents/Zalo sang ổ D ➔ Chia đúng phân vùng ổ C cài mới Windows 10.',
      targetUrl: '/courses/ol-01-phan-cung',
    },
    {
      code: 'TH-03',
      title: 'Đấu nối cáp mạng LAN nhưng chỉ nhận tốc độ 100 Mbps thay vì Gigabit 1000 Mbps',
      mainboard: 'Gigabit LAN Switch',
      symptom: 'Đèn cổng LAN trên Switch sáng màu cam (100Mbps), copy file qua mạng nội bộ chỉ đạt 11 MB/s.',
      cause: 'Cáp mạng bị đứt ngầm hoặc bấm sai chuẩn 1 trong 4 sợi (chân 4, 5, 7, 8). Chuẩn Gigabit bắt buộc thông đủ 8/8 sợi.',
      remedy: 'Dùng kìm cắt bỏ 2 đầu hạt mạng cũ ➔ Vuốt thẳng 8 sợi theo chuẩn TIA-568B ➔ Bấm ngậm sâu vỏ cáp > 5mm ➔ Test thông mạch 8/8 sợi.',
      targetUrl: '/courses/hsg-phan-cung-mang',
    },
    {
      code: 'TH-04',
      title: 'Phân mạng IPv4 CIDR /27 cho Ban Giám Đốc (cần tối đa 28 máy tính)',
      mainboard: 'Hạ tầng Router Core',
      symptom: 'Mạng bị nghẽn do chung Broadcast Domain với toàn bộ khối văn phòng.',
      cause: 'Chưa phân tách VLAN và chia mạng con tối ưu.',
      remedy: 'Áp dụng công thức Subnetting 30s: Mượn 3 bit (/27), bước nhảy 32. Cấp dải host khả dụng từ .33 đến .62, Broadcast .63.',
      targetUrl: '/courses/hsg-phan-cung-mang',
    },
    {
      code: 'TH-05',
      title: 'Khách lắp thêm ổ SSD 256GB mới nhưng vào My Computer (This PC) không thấy ổ',
      mainboard: 'WINNFOX H510',
      symptom: 'BIOS nhận đủ tên SSD, nhưng trong Windows File Explorer không xuất hiện ổ đĩa.',
      cause: 'Ổ cứng mới xuất xưởng chưa được khởi tạo (Initialize) và chưa định dạng phân vùng (New Simple Volume).',
      remedy: 'Bấm chuột phải vào Start ➔ Chọn Disk Management ➔ Khởi tạo GPT ➔ Bấm chuột phải vào vùng Unallocated chọn New Simple Volume định dạng NTFS.',
      targetUrl: '/courses/ol-01-phan-cung',
    },
  ];

  const handleDrawTicket = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      const randIdx = Math.floor(Math.random() * tickets.length);
      setDrawnTicket(tickets[randIdx]);
      count++;
      if (count >= 10) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 80);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white pb-16">
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
            <a
              href="https://pc.phamtiendong.name.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black hover:bg-emerald-100 transition-colors"
            >
              <span>🖥️</span>
              <span>pc.phamtiendong ↗</span>
            </a>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
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

      {/* PHÂN KHU 2: TIẾN ĐỘ THỰC HÀNH LỚP 04THA3 (EA H'LEO) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-blue-600 text-white">
                  TIẾN ĐỘ THỰC HÀNH
                </span>
                <span className="text-xs font-bold text-slate-800">
                  Lớp 04THA3 · Cơ sở Ea H'leo
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                Lịch Phòng Máy & Nhiệm Vụ Huấn Luyện Tuần
              </h2>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Phòng Máy: Sẵn sàng 20 Bàn KTV
            </span>
          </div>

          <div className="py-6 border-b border-slate-100 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-slate-900 text-white">
                  TUẦN 2
                </span>
                <span className="text-xs font-bold text-slate-500">
                  17/11/2026 - 22/11/2026
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                  ĐANG DIỄN RA
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  📍 Phòng Thực Hành Máy Tính 01
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                Bấm Cáp Gigabit TIA-568B & Cài Đặt Windows 10 Chuẩn UEFI GPT
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-2">
                  <span className="text-emerald-600 font-black shrink-0">✓</span>
                  <span className="font-medium">Bấm cáp mạng Cat5e/Cat6 chuẩn B, vỏ ngậm sâu hạt RJ45 &gt; 5mm</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-2">
                  <span className="text-emerald-600 font-black shrink-0">✓</span>
                  <span className="font-medium">Test thông mạch 8/8 sợi, kết nối Gigabit 1000 Mbps</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-2">
                  <span className="text-emerald-600 font-black shrink-0">✓</span>
                  <span className="font-medium">Phân vùng GPT cài Windows 10 Pro không mất dữ liệu ổ D</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <span className="text-base shrink-0">⚠️</span>
                <div>
                  <strong className="font-bold block mb-0.5">Nhắc nhở an toàn Poka-Yoke:</strong>
                  <span>Cắm USB WinPE copy toàn bộ Desktop, Documents, Zalo sang ổ D trước khi xóa phân vùng hệ thống!</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-2">
                  Cấu hình phần cứng phòng máy:
                </span>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li>🎛️ Mainboard: <strong>Intel H510 (ASUS/MSI)</strong></li>
                  <li>🧠 RAM: <strong>8GB DDR4 Bus 2666MHz</strong></li>
                  <li>🎮 VGA: <strong>GT 730 2GB GDDR5</strong></li>
                  <li>💾 Ổ cứng: <strong>SSD SATA III / NVMe</strong></li>
                  <li>🪟 HĐH: <strong>Windows 10 Pro 64-bit</strong></li>
                </ul>
              </div>

              <Link
                href="/courses/ol-01-phan-cung"
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black text-center block transition-all shadow-xs no-underline"
              >
                Vào Bàn Kỹ Thuật 7 Bước →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PHÂN KHU 3: LƯỚI HỆ SINH THÁI & SUBDOMAIN (pc.phamtiendong.name.vn) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-slate-900 text-white">
                HỆ SINH THÁI
              </span>
              <span className="text-xs text-slate-500 font-semibold">Tên miền phụ & Phân hệ trực thuộc</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Hạ Tầng Giảng Dạy & Các Trang Con Chuyên Sâu
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Subdomain Card 1: PC */}
          <div className="rounded-2xl p-5 border-2 border-emerald-400 bg-gradient-to-b from-emerald-50/40 via-white to-white shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider bg-emerald-100 text-emerald-800 border-emerald-200">
                  SUBDOMAIN MỚI
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  ↗ External
                </span>
              </div>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl shrink-0 p-2 rounded-xl bg-slate-50">🖥️</span>
                <div>
                  <h3 className="text-sm font-black text-slate-900 leading-snug">Chuyên Trang Phần Cứng PC</h3>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold block mt-0.5">pc.phamtiendong.name.vn</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Chuyên trang thực hành tháo lắp, đo đạc điện áp nguồn PSU, bảo trì keo tản nhiệt và bắt bệnh bo mạch chủ H510/RAM DDR4.
              </p>
            </div>
            <a
              href="https://pc.phamtiendong.name.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 no-underline min-h-[44px]"
            >
              <span>Mở Chuyên Trang PC</span>
              <span>↗</span>
            </a>
          </div>

          {/* Subdomain Card 2: Mạng */}
          <div className="rounded-2xl p-5 border border-slate-200 bg-white hover:border-slate-300 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider bg-blue-100 text-blue-800 border-blue-200 block w-fit mb-3">
                MÔN CHUYÊN NGÀNH
              </span>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl shrink-0 p-2 rounded-xl bg-slate-50">🌐</span>
                <div>
                  <h3 className="text-sm font-black text-slate-900 leading-snug">Mạng Máy Tính & LAN/WAN</h3>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold block mt-0.5">mang.phamtiendong.name.vn</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Mô hình OSI 7 tầng, phân loại cáp mạng, cấu hình Switch Cisco Packet Tracer và chia mạng con CIDR/VLSM.
              </p>
            </div>
            <Link
              href="/courses/mang-can-ban"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 no-underline min-h-[44px]"
            >
              <span>Vào Phân Hệ Mạng</span>
              <span>→</span>
            </Link>
          </div>

          {/* Subdomain Card 3: Win / Linux */}
          <div className="rounded-2xl p-5 border border-slate-200 bg-white hover:border-slate-300 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider bg-purple-100 text-purple-800 border-purple-200 block w-fit mb-3">
                HỆ ĐIỀU HÀNH & SERVER
              </span>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl shrink-0 p-2 rounded-xl bg-slate-50">🐧</span>
                <div>
                  <h3 className="text-sm font-black text-slate-900 leading-snug">Quản Trị Windows & Linux</h3>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold block mt-0.5">quantri.phamtiendong.name.vn</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Cài đặt Windows 10 Pro, phân quyền NTFS, chia sẻ tệp SMB an toàn và quản trị máy chủ Ubuntu/CentOS lệnh CLI.
              </p>
            </div>
            <Link
              href="/courses/quan-tri-windows-linux"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 no-underline min-h-[44px]"
            >
              <span>Vào Phân Hệ Server</span>
              <span>→</span>
            </Link>
          </div>

          {/* Subdomain Card 4: Năng lực số */}
          <div className="rounded-2xl p-5 border border-slate-200 bg-white hover:border-slate-300 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider bg-amber-100 text-amber-800 border-amber-200 block w-fit mb-3">
                KỸ NĂNG NỀN TẢNG
              </span>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl shrink-0 p-2 rounded-xl bg-slate-50">💡</span>
                <div>
                  <h3 className="text-sm font-black text-slate-900 leading-snug">Năng Lực Số & AI Học Tập</h3>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold block mt-0.5">nanglucso.phamtiendong.name.vn</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Khai thác công cụ số an toàn, bảo vệ dữ liệu cá nhân, nhận diện lừa đảo trên mạng và ứng dụng AI hỗ trợ học tập.
              </p>
            </div>
            <Link
              href="/courses/nang-luc-so"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 no-underline min-h-[44px]"
            >
              <span>Vào Phân Hệ Năng Lực Số</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PHÂN KHU 4: TRẠM BỐC THĂM ĐỀ THI SÁT HẠCH & TRA CỨU BÀN KỸ THUẬT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-amber-600 text-white">
                  TRẠM THỰC HÀNH 1-CHẠM
                </span>
                <span className="text-xs font-bold text-slate-800">
                  Tra Cứu Bàn Kỹ Thuật & Bốc Thăm Tình Huống
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                Máy Tạo Đề Sát Hạch Thực Tế Tại Phòng Lab
              </h2>
            </div>

            <button
              type="button"
              onClick={handleDrawTicket}
              disabled={isSpinning}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer min-h-[48px] shrink-0"
            >
              <span className={isSpinning ? 'animate-spin' : ''}>🎲</span>
              <span>{isSpinning ? 'Đang quay số đề thi...' : 'Bốc Thăm Đề Thi Ngẫu Nhiên'}</span>
            </button>
          </div>

          <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chọn số máy */}
            <div className="lg:col-span-5 space-y-4">
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                1. Chọn Số Máy (Bàn Kỹ Thuật):
              </label>
              <div className="grid grid-cols-5 gap-1.5 max-h-[220px] overflow-y-auto p-1.5 border border-slate-200 rounded-2xl bg-slate-50">
                {Array.from({ length: 20 }, (_, i) => {
                  const m = `Máy ${String(i + 1).padStart(2, '0')}`;
                  const isSelected = selectedStation === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelectedStation(m)}
                      className={`py-2 rounded-xl text-xs text-center border transition-all cursor-pointer min-h-[40px] flex items-center justify-center ${
                        isSelected
                          ? 'bg-slate-900 text-white font-black shadow-sm ring-2 ring-slate-900 border-slate-900'
                          : 'bg-white text-slate-700 hover:bg-slate-100 font-semibold border-slate-200'
                      }`}
                    >
                      M{String(i + 1).padStart(2, '0')}
                    </button>
                  );
                })}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-900">{selectedStation} (Phòng Lab 01)</span>
                  <span className="font-mono text-[11px] text-slate-500 font-bold">192.168.10.x</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                  <div>Main: <strong className="text-slate-800">Intel H510</strong></div>
                  <div>RAM: <strong className="text-slate-800">8GB DDR4</strong></div>
                  <div>VGA: <strong className="text-slate-800">GT 730 2GB</strong></div>
                  <div>HĐH: <strong className="text-slate-800">Win 10 Pro</strong></div>
                </div>
              </div>
            </div>

            {/* Thẻ tình huống */}
            <div className="lg:col-span-7">
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                2. Đề Thi Sát Hạch / Tình Huống Kỹ Thuật Tiếp Nhận:
              </label>

              <div className="p-5 sm:p-6 rounded-2xl border-2 border-amber-300 bg-amber-50/40 space-y-3.5 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-black bg-amber-500 text-slate-950 font-mono tracking-wider">
                    {drawnTicket.code}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Linh kiện: {drawnTicket.mainboard}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                  {drawnTicket.title}
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-amber-200">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">
                      Triệu chứng lâm sàng:
                    </span>
                    <span className="text-slate-800 font-medium">{drawnTicket.symptom}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-amber-200">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">
                      Nguyên nhân gốc rễ:
                    </span>
                    <span className="text-slate-800 font-medium">{drawnTicket.cause}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                    <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider block mb-0.5">
                      Quy trình xử lý Poka-Yoke:
                    </span>
                    <span className="font-medium">{drawnTicket.remedy}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500 font-semibold">
                    Thời gian sát hạch: <strong>15 - 30 phút</strong>
                  </span>

                  <Link
                    href={drawnTicket.targetUrl}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs transition-all flex items-center gap-1.5 no-underline min-h-[44px]"
                  >
                    <span>Vào Xử Lý Tình Huống Này</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
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
