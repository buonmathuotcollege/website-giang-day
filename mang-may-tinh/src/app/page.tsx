import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Rj45Simulator } from "@/components/network/rj45-simulator";
import { SubnetCalculator } from "@/components/network/subnet-calculator";
import { BenchesTable } from "@/components/network/benches-table";
import { CheckinForm } from "@/components/network/checkin-form";
import { TechNewsWidget } from "@/components/network/tech-news-widget";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Trang chủ Ứng dụng Giáo dục Nghề nghiệp: Mạng Máy Tính (Hệ 9+3)
 * Xây dựng bằng Next.js (App Router), Tailwind CSS, Shadcn UI và Supabase
 * Giảng viên phụ trách: CN. Phạm Tiến Đông
 */
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-12 sm:space-y-16">
        {/* ================================================================== */}
        {/* 1. HERO SECTION: MÔN HỌC & ĐỐI TƯỢNG HỌC SINH 9+3                  */}
        {/* ================================================================== */}
        <section id="tong-quan" className="text-center space-y-4 max-w-3xl mx-auto pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
            <span>🛠️</span>
            <span>Chương trình Đào tạo Nghề Kỹ thuật viên Mạng (Chuẩn TT55)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Mạng Máy Tính & Truyền Thông Dữ Liệu
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Thiết kế dành riêng cho học sinh hệ <strong>Trung cấp 9+3 (15 — 18 tuổi)</strong>. 
            Học tập theo phương pháp trực quan <em>"Mắt thấy — Tay làm"</em>, ví von dễ hiểu, 
            rèn luyện tác phong công nghiệp và an toàn kỹ thuật chuẩn Nhật Bản.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a href="#danh-sach-lab">
              <Button size="touch" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md">
                <span>📖 6 Bài Thực Hành Lab (iFixit)</span>
              </Button>
            </a>
            <a href="#bam-cap-rj45">
              <Button size="touch" className="bg-slate-900 hover:bg-slate-800 text-white font-bold">
                Mô Phỏng 8 Màu RJ45
              </Button>
            </a>
            <a href="#chia-subnet">
              <Button size="touch" variant="outline" className="border-slate-300 font-bold">
                Tính Subnet IPv4 (KTV 3)
              </Button>
            </a>
            <a href="#diem-danh">
              <Button size="touch" variant="secondary" className="font-bold">
                Điểm Danh Bàn KTV
              </Button>
            </a>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 2. CHƯƠNG TRÌNH 6 BÀI THỰC HÀNH MẠNG iFixit (CẦM TAY CHỈ VIỆC)       */}
        {/* ================================================================== */}
        <section id="danh-sach-lab" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-mono text-xs font-bold mb-2">
                <span>✓</span>
                <span>CHUẨN THỰC HÀNH 100% PHÒNG MÁY · KHÔNG BÀI TẬP VỀ NHÀ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Chuyên Đề Thực Hành Mạng Máy Tính Chuẩn iFixit
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Giao diện chia đôi màn hình: Trái là quy trình chuẩn, Phải là sơ đồ trực quan có chế độ chiếu sáng phòng Lab.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg shrink-0">
              7 / 7 BÀI ĐÃ SẴN SÀNG
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                code: "LAB-01",
                title: "Gia Công Bấm Cáp Mạng RJ45 Chuẩn T568B & Test 8 Đèn",
                category: "Hạ tầng cáp mạng",
                steps: "6 bước",
                duration: "45 phút",
                desc: "Đo cắt, tuốt vỏ cáp, xếp 8 màu chuẩn T568B, miết thẳng, cắt bằng và bấm kìm dứt khoát. Test đủ 8 đèn xanh.",
                href: "/thuc-hanh/bam-cap-rj45/",
                tag: "Thi công bấm cáp",
              },
              {
                code: "LAB-SHARE-01",
                title: "Cấu Hình Chia Sẻ File & Cấp Quyền Thư Mục LAN (Win 10)",
                category: "Quản trị chia sẻ tài nguyên",
                steps: "5 bước",
                duration: "45 phút",
                desc: "Đổi Private Network, bật Advanced Sharing, phân quyền 2 lớp (Sharing & Security tab) chống lỗi Access Denied.",
                href: "/courses/chia-se-file/",
                tag: "Quản trị Windows",
              },
              {
                code: "LAB-02",
                title: "Quy Hoạch & Cấu Hình Địa Chỉ IPv4 Tĩnh, Gateway, DNS",
                category: "Giao thức TCP/IP",
                steps: "5 bước",
                duration: "45 phút",
                desc: "Thiết lập thông số IP số nhà, Subnet Mask ngõ xóm và Default Gateway cổng làng. Ping kiểm tra độ trễ <1ms.",
                href: "/thuc-hanh/dat-ip-tinh/",
                tag: "Cấu hình trạm",
              },
              {
                code: "LAB-03",
                title: "Phân Chia Mạng Con IPv4 Subnetting (/24 Thành /26)",
                category: "Logic mạng nâng cao",
                steps: "5 bước",
                duration: "45 phút",
                desc: "Mượn 2 bit Host, tính toán bước nhảy 64 IP, lập bảng 4 Subnet độc lập và kiểm chứng cô lập Broadcast.",
                href: "/thuc-hanh/chia-subnet-ipv4/",
                tag: "Tính toán logic",
              },
              {
                code: "LAB-04",
                title: "Đấu Nối Tủ Rack Mạng, Switch & Phân Tách Mạng Ảo VLAN",
                category: "Hạ tầng tủ Rack",
                steps: "5 bước",
                duration: "45 phút",
                desc: "Bắt vít ốc cài 1U, đi dây Patch Cord vào thanh quản lý cáp, chia VLAN 10 phòng sinh viên & VLAN 20 giảng viên.",
                href: "/thuc-hanh/switch-vlan/",
                tag: "Thiết bị tủ Rack",
              },
              {
                code: "LAB-05",
                title: "Cấu Hình Router Gateway & Cấp Phát IP Tự Động (DHCP)",
                category: "Dịch vụ mạng cốt lõi",
                steps: "5 bước",
                duration: "45 phút",
                desc: "Khởi tạo DHCP Pool, khai báo dải loại trừ Excluded IP, cấu hình Gateway và kiểm tra nhận IP tự động.",
                href: "/thuc-hanh/router-dhcp/",
                tag: "Dịch vụ DHCP",
              },
              {
                code: "LAB-06",
                title: "Chuẩn Đoán & Khắc Phục 5 Sự Cố Mạng Máy Tính Kinh Điển",
                category: "Bảo trì & Chẩn đoán",
                steps: "5 bước",
                duration: "45 phút",
                desc: "Xử lý lỏng cáp gãy lẫy, đứt sợi 3/6, trùng IP, lỗi phân giải DNS và khoanh vùng đứt cáp với Tracert.",
                href: "/thuc-hanh/xu-ly-su-co-mang/",
                tag: "Thực chiến phòng lab",
              },
            ].map((lab) => (
              <Card key={lab.code} className="border-slate-200 bg-white flex flex-col justify-between hover:border-slate-400 transition-all shadow-2xs group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-mono text-xs font-black">
                      {lab.code}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {lab.steps} · {lab.duration}
                    </span>
                  </div>
                  <CardTitle className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {lab.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    {lab.category} · {lab.tag}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {lab.desc}
                  </p>
                  <Link href={lab.href} className="block no-underline">
                    <Button
                      size="touch"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs"
                    >
                      <span>Vào Thực Hành Ngay</span>
                      <span className="ml-1 font-mono">➔</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* 2. BA NGUYÊN TẮC KỸ THUẬT CỐT LÕI (POKA-YOKE 5S)                   */}
        {/* ================================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-slate-200 bg-white">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-950 flex items-center justify-center font-bold text-lg mb-2">
                1
              </div>
              <CardTitle className="text-base font-bold">Luật Bấm Cáp 8 Đèn</CardTitle>
              <CardDescription>Kiểm tra an toàn Poka-Yoke (KTV 2)</CardDescription>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tuyệt đối không cắm dây cáp vào Switch hay máy tính khi chưa test qua hộp kiểm tra cáp. 
              Sáng đủ 8 đèn xanh lá mới được bàn giao và nghiệm thu.
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-950 flex items-center justify-center font-bold text-lg mb-2">
                2
              </div>
              <CardTitle className="text-base font-bold">Luật Số Nhà IP</CardTitle>
              <CardDescription>Cấu hình logic chính xác (KTV 3)</CardDescription>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Địa chỉ IP giống như số nhà: Trong cùng một mạng LAN, không được phép có hai máy tính trùng số nhà. 
              Subnet Mask định rõ ranh giới ngõ xóm.
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-950 flex items-center justify-center font-bold text-lg mb-2">
                3
              </div>
              <CardTitle className="text-base font-bold">Tác Phong 5S Bàn Máy</CardTitle>
              <CardDescription>Kỷ luật an toàn lao động (KTV 1)</CardDescription>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Thu gom toàn bộ mẩu lõi đồng và vỏ nhựa vào khay 5S. 
              Dây nhảy mạng Patch Cord phải được bó gọn gàng bằng dây rút trước khi rời xưởng.
            </CardContent>
          </Card>
        </section>

        {/* ================================================================== */}
        {/* 3. MÔ PHỎNG BẤM CÁP MẠNG RJ45 & TEST ĐÈN LED                       */}
        {/* ================================================================== */}
        <section id="bam-cap-rj45" className="scroll-mt-20">
          <Rj45Simulator />
        </section>

        {/* ================================================================== */}
        {/* 4. CÔNG CỤ TÍNH VÀ CHIA MẠNG CON IPV4 (SUBNETTING)                 */}
        {/* ================================================================== */}
        <section id="chia-subnet" className="scroll-mt-20">
          <SubnetCalculator />
        </section>

        {/* ================================================================== */}
        {/* 5. SƠ ĐỒ PHÂN BỔ 10 BÀN KỸ THUẬT VIÊN                              */}
        {/* ================================================================== */}
        <section id="so-do-ban" className="scroll-mt-20">
          <BenchesTable />
        </section>

        {/* ================================================================== */}
        {/* 6. TIN TỨC AN NINH MẠNG MỚI NHẤT (NETWORK SECURITY UPDATES)        */}
        {/* ================================================================== */}
        <section id="tin-an-ninh-mang" className="scroll-mt-20">
          <TechNewsWidget />
        </section>

        {/* ================================================================== */}
        {/* 7. PHIẾU ĐIỂM DANH & NỘP BÀI THỰC HÀNH (KẾT NỐI SUPABASE)          */}
        {/* ================================================================== */}
        <section id="diem-danh" className="scroll-mt-20">
          <CheckinForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
