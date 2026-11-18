import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Rj45Simulator } from "@/components/network/rj45-simulator";
import { SubnetCalculator } from "@/components/network/subnet-calculator";
import { BenchesTable } from "@/components/network/benches-table";
import { CheckinForm } from "@/components/network/checkin-form";
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
            <a href="#bam-cap-rj45">
              <Button size="touch" className="bg-slate-900 hover:bg-slate-800 text-white font-bold">
                Bấm Cáp RJ45 (KTV 1)
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
        {/* 6. PHIẾU ĐIỂM DANH & NỘP BÀI THỰC HÀNH (KẾT NỐI SUPABASE)          */}
        {/* ================================================================== */}
        <section id="diem-danh" className="scroll-mt-20">
          <CheckinForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
