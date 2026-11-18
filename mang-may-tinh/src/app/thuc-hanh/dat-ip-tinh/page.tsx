import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LabSplitView } from "@/components/practice/lab-split-view";
import type { LabLesson } from "@/types/practice";

// Dữ liệu bài thực hành 2: Đặt IP tĩnh & Default Gateway Windows (5 bước tiêu chuẩn)
const LAB_02_LESSON: LabLesson = {
  id: "lab-02",
  code: "LAB-02",
  title: "Quy Hoạch & Cấu Hình Địa Chỉ IPv4 Tĩnh, Gateway, DNS Trên Windows",
  moduleName: "Logic Mạng & Giao Thức TCP/IP",
  level: "Hệ Trung cấp 9+3",
  durationMinutes: 45,
  totalSteps: 5,
  safetyBrief: "Kiểm tra chống trùng lặp IP nội bộ · Ghi chép nhật ký bàn KTV · Ping <1ms mới bàn giao",
  steps: [
    {
      id: 1,
      stepNumber: 1,
      title: "Mở cửa sổ Network Connections (ncpa.cpl)",
      role: "KTV 1 (Thi công bấm cáp)",
      timeEstimate: "3 phút",
      instructions: [
        "Nhấn tổ hợp phím Windows + R trên bàn phím máy tính trạm.",
        "Gõ lệnh ncpa.cpl và nhấn phím Enter để mở trực tiếp danh sách card mạng.",
        "Tìm đúng card mạng có dây mang tên Ethernet hoặc Local Area Connection.",
      ],
      pokaYoke: "Không chỉnh sửa nhầm trên card mạng ảo của VMware, VirtualBox hoặc Wi-Fi.",
      analogy: "Mở sổ hộ khẩu: Giống như mở sổ quản lý danh sách các cửa ra vào của ngôi nhà.",
      diagramType: "ip_config",
    },
    {
      id: 2,
      stepNumber: 2,
      title: "Mở thuộc tính Internet Protocol Version 4 (TCP/IPv4)",
      role: "KTV 1 (Thi công bấm cáp)",
      timeEstimate: "3 phút",
      instructions: [
        "Nhấp chuột phải vào biểu tượng Ethernet, chọn Properties.",
        "Cuộn danh sách xuống và nhấp đúp chuột vào Internet Protocol Version 4 (TCP/IPv4).",
        "Chọn mục Use the following IP address để kích hoạt chế độ gán IP tĩnh.",
      ],
      pokaYoke: "Phải chọn đúng IPv4, tuyệt đối không chọn nhầm vào IPv6 (Internet Protocol Version 6).",
      analogy: "Chọn biển số nhà: Chuyển từ việc chờ phát số ngẫu nhiên sang việc gắn biển số nhà cố định.",
      diagramType: "ip_config",
    },
    {
      id: 3,
      stepNumber: 3,
      title: "Nhập thông số IP, Subnet Mask và Default Gateway",
      role: "KTV 1 (Thi công bấm cáp)",
      timeEstimate: "5 phút",
      instructions: [
        "Nhập IP address theo số bàn: 192.168.1.(10 + Bàn số). Ví dụ Bàn 1 nhập 192.168.1.11.",
        "Nhấn phím Tab, hệ thống tự động điền Subnet mask là 255.255.255.0.",
        "Nhập Default gateway là 192.168.1.1 (Địa chỉ Router dẫn ra mạng ngoài).",
      ],
      pokaYoke: "KTV 2 đối chiếu số bàn trên tem máy tính, ngăn chặn việc gõ trùng IP với bàn khác gây xung đột mạng.",
      analogy: "Ghi địa chỉ bì thư: IP là số nhà của bạn, Subnet Mask là ranh giới phường, Gateway là trạm bưu điện.",
      diagramType: "ip_config",
    },
    {
      id: 4,
      stepNumber: 4,
      title: "Thiết lập DNS Server Google và Cloudflare",
      role: "KTV 1 (Thi công bấm cáp)",
      timeEstimate: "3 phút",
      instructions: [
        "Tại mục Preferred DNS server: Gõ dãy số 8.8.8.8 (Google DNS).",
        "Tại mục Alternate DNS server: Gõ dãy số 1.1.1.1 (Cloudflare DNS).",
        "Nhấn nút OK 2 lần để lưu và áp dụng cấu hình mạng mới.",
      ],
      pokaYoke: "Gõ đủ 4 octet số cách nhau bởi dấu chấm, không để sót dấu chấm giữa các số.",
      analogy: "Danh bạ điện thoại: Giúp dịch tên trang web (như google.com) thành địa chỉ IP máy chủ để truy cập.",
      diagramType: "ip_config",
    },
    {
      id: 5,
      stepNumber: 5,
      title: "Dùng lệnh Ping kiểm tra độ trễ mạng trong Command Prompt",
      role: "KTV 2 (Kiểm soát an toàn)",
      timeEstimate: "5 phút",
      instructions: [
        "Mở CMD (Gõ cmd vào hộp Run).",
        "Gõ lệnh: ping 192.168.1.1 và nhấn Enter để kiểm tra thông mạch tới Gateway.",
        "Kiểm tra phản hồi: time<1ms và Lost = 0 (0% loss) là đường truyền hoàn hảo.",
      ],
      pokaYoke: "Nếu báo Request timed out hoặc Destination host unreachable, KTV 2 yêu cầu kiểm tra lại dây cáp và Gateway.",
      analogy: "Tiếng vang trong hang: Bạn hét lên 'A', trong vòng 1ms có tiếng 'A' dội lại nghĩa là đường đi không bị nghẽn.",
      diagramType: "troubleshoot_cmd",
    },
  ],
};

export default function DatIpTinhPage() {
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
          <span className="text-slate-900 font-bold">Thực Hành LAB-02: Đặt IP Tĩnh & Gateway</span>
        </div>

        {/* Khung chia đôi màn hình chuẩn iFixit */}
        <LabSplitView lesson={LAB_02_LESSON} />
      </main>

      <Footer />
    </div>
  );
}
