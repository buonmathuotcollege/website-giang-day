import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LabSplitView } from "@/components/practice/lab-split-view";
import type { LabLesson } from "@/types/practice";

// Dữ liệu bài thực hành 1: Bấm cáp mạng RJ45 chuẩn T568B (6 bước tiêu chuẩn)
const LAB_01_LESSON: LabLesson = {
  id: "lab-01",
  code: "LAB-01",
  title: "Gia Công Bấm Cáp Mạng UTP Chuẩn T568B & Test 8 Đèn Poka-Yoke",
  moduleName: "Mạng Căn Bản & Hạ Tầng",
  level: "Hệ Trung cấp 9+3",
  durationMinutes: 45,
  totalSteps: 6,
  safetyBrief: "Không bấm phạm vào lõi đồng · Thu gom mẩu dây thừa vào khay 5S · Test đủ 8 đèn mới cắm Switch",
  steps: [
    {
      id: 1,
      stepNumber: 1,
      title: "Tuốt vỏ bảo vệ ngoài cáp xoắn đôi UTP",
      role: "KTV 1 (Thi công bấm cáp)",
      timeEstimate: "3 phút",
      instructions: [
        "Đặt dây mạng vào khe tuốt vỏ của kìm bấm cáp chuyên dụng.",
        "Căn khoảng cách từ đầu dây vào khoảng 2.5 cm đến 3.0 cm.",
        "Xoay kìm nhẹ nhàng 1 vòng tròn, dùng tay bẻ nhẹ và rút lớp vỏ nhựa ngoài.",
      ],
      pokaYoke: "Tuyệt đối không bóp kìm quá mạnh làm cứa đứt lớp vỏ bọc bảo vệ của 8 lõi dây bên trong.",
      analogy: "Giống như gọt vỏ mía: Chỉ gọt lớp vỏ cứng bên ngoài, không phạm vào ruột ngọt bên trong.",
      diagramType: "strip_cable",
    },
    {
      id: 2,
      stepNumber: 2,
      title: "Tháo xoắn và miết thẳng 4 cặp dây màu",
      role: "KTV 1 (Thi công bấm cáp)",
      timeEstimate: "4 phút",
      instructions: [
        "Tách 4 cặp dây xoắn đôi riêng biệt theo hình chữ thập.",
        "Dùng ngón tay cái và ngón trỏ miết từng sợi dây thật thẳng và song song.",
        "Cắt bỏ sợi chỉ chịu lực (nylon) sát gốc vỏ nhựa để tránh cộm hạt mạng.",
      ],
      pokaYoke: "Dây phải được miết thật thẳng, không để gập gãy hoặc cong queo trước khi sắp màu.",
      analogy: "Giống như chải tóc: Dây càng thẳng thì đút vào khe hạt RJ45 càng trơn tru, không bị kẹt.",
      diagramType: "strip_cable",
    },
    {
      id: 3,
      stepNumber: 3,
      title: "Sắp xếp thứ tự 8 sợi màu chuẩn T568B",
      role: "KTV 1 (Thi công bấm cáp)",
      timeEstimate: "5 phút",
      instructions: [
        "Xếp 8 sợi màu phẳng cạnh nhau từ trái sang phải theo thứ tự chuẩn T568B:",
        "1. Trắng Cam — 2. Cam — 3. Trắng Xanh Lá — 4. Xanh Dương",
        "5. Trắng Xanh Dương — 6. Xanh Lá — 7. Trắng Nâu — 8. Nâu.",
        "Kẹp chặt 8 sợi phẳng và ép sát vào nhau, kiểm tra chéo thứ tự màu.",
      ],
      pokaYoke: "Quy tắc KTV 2 kiểm tra: Cặp Xanh Lá bị tách đôi (Sợi 3 Trắng Xanh Lá, Sợi 6 Xanh Lá kẹp giữa Xanh Dương).",
      analogy: "Thần chú nhớ màu: Cam xen Lá — Dương kẹp giữa — Nâu về cuối.",
      diagramType: "arrange_wires",
    },
    {
      id: 4,
      stepNumber: 4,
      title: "Cắt bằng phẳng đầu dây cáp đúng 1.3 cm",
      role: "KTV 1 (Thi công bấm cáp)",
      timeEstimate: "2 phút",
      instructions: [
        "Giữ chặt 8 sợi dây không để xô lệch thứ tự màu.",
        "Đặt lưỡi dao kìm bấm vuông góc 90 độ với các sợi dây.",
        "Cắt dứt khoát 1 nhát phẳng, chừa lại chiều dài lõi đồng khoảng 1.2 cm đến 1.5 cm.",
      ],
      pokaYoke: "Đường cắt phải bằng tăm tắp, không cắt chéo lệch khiến sợi ngắn không chạm tới lá đồng.",
      analogy: "Như xếp hàng chào cờ: Tất cả các sợi phải cao bằng nhau thì đội trưởng mới duyệt.",
      diagramType: "trim_wires",
    },
    {
      id: 5,
      stepNumber: 5,
      title: "Đút hạt RJ45 và bấm kìm mạng dứt khoát",
      role: "KTV 1 (Thi công bấm cáp)",
      timeEstimate: "4 phút",
      instructions: [
        "Hướng lẫy nhựa của hạt mạng RJ45 úp xuống dưới, đầu tiếp xúc vàng hướng lên trên.",
        "Đút nhẹ nhàng 8 sợi dây vào 8 rãnh dẫn hướng bên trong hạt mạng.",
        "Đẩy thật kịch tay cho đến khi nhìn thấy ánh đồng lấp lánh ở mặt trước hạt.",
        "Đưa hạt vào ổ bấm 8P của kìm, bóp chặt tay 1 nhát dứt khoát kịch nấc.",
      ],
      pokaYoke: "Kiểm tra 2 điểm: 8 đầu đồng chạm kịch đỉnh và ngàm nhựa khóa chặt vỏ cáp xanh.",
      analogy: "Như khóa then cửa: Ngàm nhựa cắn chặt vào vỏ cáp thì học sinh giật mạnh cũng không tuột.",
      diagramType: "crimp_rj45",
    },
    {
      id: 6,
      stepNumber: 6,
      title: "Kiểm tra thông mạch 8 đèn LED trên hộp test cáp",
      role: "KTV 2 (Kiểm soát an toàn)",
      timeEstimate: "3 phút",
      instructions: [
        "Cắm 1 đầu dây cáp vào cổng RJ45 máy phát (Master).",
        "Cắm đầu dây cáp còn lại vào cổng RJ45 máy thu (Remote).",
        "Bật công tắc nguồn của hộp test sang vị trí ON (hoặc S để chạy chậm).",
        "Quan sát chu kỳ đèn LED nhảy tuần tự từ đèn 1 đến đèn 8 trên cả 2 máy.",
      ],
      pokaYoke: "Chỉ nghiệm thu khi đủ 8 đèn sáng xanh lá và cùng nhịp. Nếu đèn tắt hoặc nhảy sai số: Báo KTV 1 cắt bấm lại.",
      analogy: "Hộp test cáp giống như đèn tín hiệu giao thông: 8 đèn xanh mới được thông xe ra xa lộ mạng.",
      diagramType: "cable_tester",
    },
  ],
};

/**
 * Trang bài học thực hành chuyên sâu chuẩn iFixit
 * Đường dẫn: /thuc-hanh/bam-cap-rj45/
 */
export default function BamCapRj45Page() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Breadcrumb điều hướng */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-slate-900 hover:underline">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/#bam-cap-rj45" className="hover:text-slate-900 hover:underline">
            Thực hành mạng
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Gia công bấm cáp RJ45 (LAB-01)</span>
        </nav>

        {/* Khung điều phối iFixit Split View */}
        <LabSplitView lesson={LAB_01_LESSON} />
      </main>

      <Footer />
    </div>
  );
}
