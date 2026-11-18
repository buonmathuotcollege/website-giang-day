import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LabSplitView } from "@/components/practice/lab-split-view";
import type { LabLesson } from "@/types/practice";

// Dữ liệu bài thực hành 5: Cấu hình Router & Dịch vụ DHCP Server (5 bước tiêu chuẩn)
const LAB_05_LESSON: LabLesson = {
  id: "lab-05",
  code: "LAB-05",
  title: "Cấu Hình Router Gateway & Dịch Vụ Cấp Phát IP Tự Động (DHCP Server)",
  moduleName: "Định Tuyến & Dịch Vụ Mạng Cốt Lõi",
  level: "Hệ Trung cấp 9+3",
  durationMinutes: 45,
  totalSteps: 5,
  safetyBrief: "Loại trừ IP tĩnh của Server và Router khỏi DHCP Pool · Kiểm tra thời gian thuê Lease Time",
  steps: [
    {
      id: 1,
      stepNumber: 1,
      title: "Gán IP tĩnh cho cổng LAN của Router (Cổng Gateway)",
      role: "KTV 3 (Cấu hình & Báo cáo)",
      timeEstimate: "5 phút",
      instructions: [
        "Kết nối cổng Console vào Router Cisco / MikroTik hoặc Router thực hành.",
        "Truy cập cổng LAN nội bộ: interface gigabitEthernet 0/0.",
        "Gán địa chỉ IP Gateway: ip address 192.168.1.1 255.255.255.0.",
        "Mở cổng mạng hoạt động: no shutdown (Đèn cổng chuyển sang màu xanh lá).",
      ],
      pokaYoke: "Bắt buộc gõ 'no shutdown', nhiều KTV quên lệnh này khiến cổng ở trạng thái administratively down.",
      analogy: "Mở cổng ủy ban: Gán địa chỉ cố định và kéo thanh chắn barie lên cho xe cộ lưu thông.",
      diagramType: "router_dhcp",
    },
    {
      id: 2,
      stepNumber: 2,
      title: "Cấu hình dải IP loại trừ (Excluded Addresses)",
      role: "KTV 3 (Cấu hình & Báo cáo)",
      timeEstimate: "3 phút",
      instructions: [
        "Xác định dải IP cần giữ lại cho thiết bị cố định (Router, Máy in, Máy chủ Lab).",
        "Gõ lệnh loại trừ từ 192.168.1.1 đến 192.168.1.50:",
        "Lệnh: ip dhcp excluded-address 192.168.1.1 192.168.1.50.",
      ],
      pokaYoke: "Không được bỏ qua bước này, nếu không Router sẽ cấp nhầm IP 192.168.1.1 cho học sinh gây sập mạng.",
      analogy: "Chỗ đậu xe ưu tiên: Giữ chỗ riêng cho xe cứu thương và xe công vụ, không phát thẻ bãi xe cho người ngoài.",
      diagramType: "router_dhcp",
    },
    {
      id: 3,
      stepNumber: 3,
      title: "Khởi tạo DHCP Pool và khai báo các thông số mạng tự động",
      role: "KTV 3 (Cấu hình & Báo cáo)",
      timeEstimate: "6 phút",
      instructions: [
        "Tạo tên hồ chứa IP: ip dhcp pool PHONG_MAY_93.",
        "Khai báo dải mạng cấp phát: network 192.168.1.0 255.255.255.0.",
        "Khai báo Gateway mặc định: default-router 192.168.1.1.",
        "Khai báo máy chủ phân giải tên miền: dns-server 8.8.8.8 1.1.1.1.",
        "Thiết lập thời gian thuê (Lease time): lease 1 (1 ngày = 24 giờ).",
      ],
      pokaYoke: "KTV 2 kiểm tra: Đảm bảo default-router trùng khớp 100% với IP cổng g0/0 đã đặt ở bước 1.",
      analogy: "Quầy phát vé tự động: Khi khách đến hội trường, máy tự phát vé ghi rõ số ghế, lối ra và bản đồ.",
      diagramType: "router_dhcp",
    },
    {
      id: 4,
      stepNumber: 4,
      title: "Chuyển card mạng máy trạm sang chế độ nhận IP tự động",
      role: "KTV 1 (Thi công bấm cáp)",
      timeEstimate: "3 phút",
      instructions: [
        "Trên máy trạm sinh viên, mở ncpa.cpl -> Properties của card mạng Ethernet.",
        "Nhấp đúp chuột vào Internet Protocol Version 4 (TCP/IPv4).",
        "Tích chọn: Obtain an IP address automatically và Obtain DNS server address automatically.",
        "Nhấn OK để máy tính gửi gói tin DHCP Discover tìm kiếm Router.",
      ],
      pokaYoke: "Đảm bảo cắm cáp mạng RJ45 chắc chắn trước khi chuyển sang chế độ tự động.",
      analogy: "Chìa tay nhận quà: Máy trạm không tự đặt tên nữa mà chìa tay nhận vé số từ tay Router phát.",
      diagramType: "ip_config",
    },
    {
      id: 5,
      stepNumber: 5,
      title: "Xác nhận địa chỉ IP nhận được bằng lệnh ipconfig /all",
      role: "KTV 2 (Kiểm soát an toàn)",
      timeEstimate: "4 phút",
      instructions: [
        "Mở CMD, gõ lệnh: ipconfig /all.",
        "Kiểm tra dòng IPv4 Address: Phải nằm trong dải 192.168.1.100 - 192.168.1.200.",
        "Kiểm tra dòng DHCP Server: Phải hiện 192.168.1.1.",
        "Thử giải phóng và xin lại IP: ipconfig /release sau đó ipconfig /renew.",
      ],
      pokaYoke: "Nếu nhận IP dạng 169.254.x.x (APIPA) nghĩa là DHCP không hoạt động hoặc đứt cáp mạng.",
      analogy: "Soi vé xe: Xem lại cuống vé xem có đúng số xe của đoàn mình hay bị lạc sang đoàn xe khác.",
      diagramType: "troubleshoot_cmd",
    },
  ],
};

export default function RouterDhcpPage() {
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
          <span className="text-slate-900 font-bold">Thực Hành LAB-05: Cấu Hình Router Gateway & DHCP</span>
        </div>

        {/* Khung chia đôi màn hình chuẩn iFixit */}
        <LabSplitView lesson={LAB_05_LESSON} />
      </main>

      <Footer />
    </div>
  );
}
