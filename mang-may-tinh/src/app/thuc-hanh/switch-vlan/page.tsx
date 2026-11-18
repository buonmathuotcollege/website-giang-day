import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LabSplitView } from "@/components/practice/lab-split-view";
import type { LabLesson } from "@/types/practice";

// Dữ liệu bài thực hành 4: Đấu nối Switch & Cấu hình VLAN (5 bước tiêu chuẩn)
const LAB_04_LESSON: LabLesson = {
  id: "lab-04",
  code: "LAB-04",
  title: "Đấu Nối Tủ Rack Mạng, Switch Quản Trị & Phân Tách Mạng Ảo VLAN",
  moduleName: "Thiết Bị Mạng & Hạ Tầng Tủ Rack",
  level: "Hệ Trung cấp 9+3",
  durationMinutes: 45,
  totalSteps: 5,
  safetyBrief: "Cắm đúng cổng nguồn an toàn · Đi dây Patch Cord thẳng hàng vào thanh quản lý cáp · Không cắm Loop mạng",
  steps: [
    {
      id: 1,
      stepNumber: 1,
      title: "Gá lắp Switch vào thanh ray tủ Rack 19 inch chuẩn 1U",
      role: "KTV 1 (Thi công bấm cáp)",
      timeEstimate: "5 phút",
      instructions: [
        "Kiểm tra bộ ốc cài (Cage Nuts) và ốc vít M6 chuyên dụng cho tủ Rack.",
        "Cài 4 ốc lồng vào 2 bên thanh trụ đứng của tủ Rack tại độ cao chỉ định (1U).",
        "Đưa Switch vào vị trí, KTV 2 đỡ máy trong khi KTV 1 siết chặt 4 ốc chéo nhau.",
      ],
      pokaYoke: "Siết ốc đối xứng theo đường chéo để Switch không bị xô lệch, không làm trầy xước tai bắt rack.",
      analogy: "Lắp ngăn kéo tủ: Phải bắt vít cân đối cả 2 bên ray thì ngăn kéo mới trượt êm và chắc chắn.",
      diagramType: "switch_vlan",
    },
    {
      id: 2,
      stepNumber: 2,
      title: "Đấu nối dây nhảy mạng Patch Cord từ Patch Panel sang Switch",
      role: "KTV 1 (Thi công bấm cáp)",
      timeEstimate: "6 phút",
      instructions: [
        "Sử dụng dây nhảy đúc sẵn (Patch Cord) Cat6 độ dài 0.5m đến 1m.",
        "Cắm một đầu vào cổng Patch Panel tương ứng với số bàn thực hành của sinh viên.",
        "Luồn dây gọn gàng qua thanh quản lý cáp ngang (Cable Management).",
        "Cắm đầu còn lại vào Port chỉ định trên Switch (Port 1 đến 12 cho VLAN 10).",
      ],
      pokaYoke: "Tuyệt đối không để dây lòng thòng trước mặt tủ Rack, nghe tiếng 'tách' của lẫy nhựa khi cắm.",
      analogy: "Đi dây điện thoại bàn: Dây nhảy ngắn kết nối từ ổ cắm tường vào máy điện thoại trên bàn làm việc.",
      diagramType: "switch_plug",
    },
    {
      id: 3,
      stepNumber: 3,
      title: "Đăng nhập giao diện cấu hình Switch qua cổng Console/Web",
      role: "KTV 3 (Cấu hình & Báo cáo)",
      timeEstimate: "4 phút",
      instructions: [
        "Cắm cáp Console USB-to-RJ45 vào cổng CONSOLE phía sau Switch.",
        "Mở phần mềm PuTTY trên máy trạm, chọn giao thức Serial, tốc độ Baud 9600.",
        "Nhấn Enter để xuất hiện dòng lệnh cấu hình (Switch> hoặc Switch#).",
      ],
      pokaYoke: "KTV 2 kiểm tra dây cắm chắc chắn, tránh rung lắc cáp Console trong lúc Switch đang nạp cấu hình.",
      analogy: "Cắm chìa khóa bảo mật: Cáp Console là lối đi nội bộ an toàn để kỹ sư giao tiếp trực tiếp với não của Switch.",
      diagramType: "troubleshoot_cmd",
    },
    {
      id: 4,
      stepNumber: 4,
      title: "Tạo VLAN và gán các Port vào từng nhóm mạng cô lập",
      role: "KTV 3 (Cấu hình & Báo cáo)",
      timeEstimate: "7 phút",
      instructions: [
        "Gõ lệnh tạo VLAN 10: vlan 10 -> name PHONG_LAB_SINHVIEN.",
        "Gán dải cổng: interface range gigabitEthernet 0/1 - 12 -> switchport mode access -> switchport access vlan 10.",
        "Gõ lệnh tạo VLAN 20: vlan 20 -> name PHONG_GIANG_VIEN.",
        "Gán dải cổng: interface range gigabitEthernet 0/13 - 20 -> switchport access vlan 20.",
      ],
      pokaYoke: "Phải gõ lệnh 'copy running-config startup-config' để lưu cấu hình, tránh mất khi mất điện phòng máy.",
      analogy: "Chia ranh giới các phòng ban: Cổng 1-12 chỉ cho sinh viên vào, cổng 13-20 dành riêng cho giáo viên.",
      diagramType: "switch_vlan",
    },
    {
      id: 5,
      stepNumber: 5,
      title: "Kiểm tra đèn LED trạng thái cổng và thử nghiệm cô lập Broadcast",
      role: "KTV 2 (Kiểm soát an toàn)",
      timeEstimate: "4 phút",
      instructions: [
        "Quan sát đèn LED xanh lá trên các Port đã cắm dây hoạt động ở tốc độ 1000 Mbps.",
        "Máy tính ở Port 1 (VLAN 10) gửi gói tin Broadcast kiểm tra.",
        "Xác nhận máy tính ở Port 15 (VLAN 20) không hề nhận được gói tin này.",
      ],
      pokaYoke: "Đảm bảo không tạo thành vòng lặp mạng (Loop) bằng cách không cắm 2 đầu của một sợi dây vào cùng một Switch.",
      analogy: "Hộp thư riêng từng lớp: Thư của lớp 10A chỉ gửi trong lớp 10A, lớp 10B bên cạnh hoàn toàn không bị làm phiền.",
      diagramType: "switch_plug",
    },
  ],
};

export default function SwitchVlanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Thanh breadcrumb điều hướng nhanh */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
          <Link href="/" className="hover:text-slate-900 hover:underline">
            Trang Chủ
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Thực Hành LAB-04: Đấu Nối Tủ Rack & Cấu Hình VLAN</span>
        </div>

        {/* Khung chia đôi màn hình chuẩn iFixit */}
        <LabSplitView lesson={LAB_04_LESSON} />
      </main>

      <Footer />
    </div>
  );
}
