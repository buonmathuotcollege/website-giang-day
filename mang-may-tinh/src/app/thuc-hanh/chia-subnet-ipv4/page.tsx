import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LabSplitView } from "@/components/practice/lab-split-view";
import type { LabLesson } from "@/types/practice";

// Dữ liệu bài thực hành 3: Chia mạng con Subnetting IPv4 lớp C (5 bước tiêu chuẩn)
const LAB_03_LESSON: LabLesson = {
  id: "lab-03",
  code: "LAB-03",
  title: "Phân Chia Mạng Con IPv4 (Subnetting /24 thành /26) Cho Các Phòng Máy",
  moduleName: "Logic Mạng & Thiết Kế IP",
  level: "Hệ Trung cấp 9+3",
  durationMinutes: 45,
  totalSteps: 5,
  safetyBrief: "Không được gán IP trùng Network ID hoặc Broadcast ID · Kiểm tra Subnet Mask mới /26",
  steps: [
    {
      id: 1,
      stepNumber: 1,
      title: "Xác định nhu cầu số lượng máy trạm và mượn bit Host",
      role: "KTV 3 (Cấu hình & Báo cáo)",
      timeEstimate: "5 phút",
      instructions: [
        "Đề bài: Phân chia dải mạng 192.168.1.0/24 cho 4 phòng thực hành độc lập.",
        "Mỗi phòng yêu cầu tối đa 50 máy tính hoạt động đồng thời.",
        "Áp dụng công thức 2^n >= 4 nhóm mạng ➔ Cần mượn n = 2 bit từ phần Host ID.",
      ],
      pokaYoke: "Số bit Host còn lại là 8 - 2 = 6 bit ➔ Cung cấp được 2^6 - 2 = 62 máy mỗi phòng (thỏa mãn >50 máy).",
      analogy: "Chia phòng trọ: Một ngôi nhà lớn chia thành 4 phòng khép kín bằng các vách ngăn thạch cao.",
      diagramType: "subnetting",
    },
    {
      id: 2,
      stepNumber: 2,
      title: "Tính toán Subnet Mask mới theo chuẩn CIDR (/26)",
      role: "KTV 3 (Cấu hình & Báo cáo)",
      timeEstimate: "4 phút",
      instructions: [
        "Subnet mask cũ (/24): 11111111.11111111.11111111.00000000 (255.255.255.0).",
        "Mượn thêm 2 bit 1: 11111111.11111111.11111111.11000000.",
        "Đổi octet cuối ra thập phân: 128 + 64 = 192 ➔ Subnet Mask mới là 255.255.255.192.",
      ],
      pokaYoke: "Subnet Mask mới bắt buộc kết thúc bằng số 192, nếu gõ nhầm 255.255.255.0 sẽ bị lộ dữ liệu giữa các phòng.",
      analogy: "Dựng tường rào mới: Tường rào cao hơn để bảo đảm hai lớp học không nghe tiếng ồn của nhau.",
      diagramType: "subnetting",
    },
    {
      id: 3,
      stepNumber: 3,
      title: "Lập bảng quy hoạch 4 Subnet (Network ID, Host Range, Broadcast)",
      role: "KTV 3 (Cấu hình & Báo cáo)",
      timeEstimate: "6 phút",
      instructions: [
        "Bước nhảy mạng = 2^(8-2) = 64 địa chỉ IP mỗi mạng con.",
        "Subnet 1 (Lab 1): 192.168.1.0/26 | Dải gán: .1 đến .62 | Broadcast: .63",
        "Subnet 2 (Lab 2): 192.168.1.64/26 | Dải gán: .65 đến .126 | Broadcast: .127",
        "Subnet 3 (Phòng GV): 192.168.1.128/26 | Dải gán: .129 đến .190 | Broadcast: .191",
        "Subnet 4 (Server): 192.168.1.192/26 | Dải gán: .193 đến .254 | Broadcast: .255",
      ],
      pokaYoke: "Tuyệt đối không gán địa chỉ đầu tiên (Net ID) và địa chỉ cuối cùng (Broadcast) cho máy trạm.",
      analogy: "Địa chỉ đầu là tên cổng thôn, địa chỉ cuối là loa phát thanh của thôn. Không ai được lấy làm số nhà riêng.",
      diagramType: "subnetting",
    },
    {
      id: 4,
      stepNumber: 4,
      title: "Cài đặt thông số Subnet mới trên máy trạm thực hành",
      role: "KTV 1 (Thi công bấm cáp)",
      timeEstimate: "5 phút",
      instructions: [
        "Vào Properties card mạng Ethernet của máy trạm Bàn 1 (thuộc Lab 1).",
        "Gán IP address: 192.168.1.10.",
        "Nhập Subnet mask: 255.255.255.192 (Thay cho giá trị mặc định .0).",
        "Nhập Default gateway: 192.168.1.1 (Cổng ra của Subnet 1).",
      ],
      pokaYoke: "KTV 2 kiểm tra: Đảm bảo máy trạm Lab 1 không được gán IP vượt quá ngưỡng 192.168.1.62.",
      analogy: "Cấp thẻ căn cước mới: Đổi thẻ cư dân đúng với phòng ban làm việc mới được phân công.",
      diagramType: "ip_config",
    },
    {
      id: 5,
      stepNumber: 5,
      title: "Kiểm tra tính cô lập mạng giữa các Subnet bằng lệnh Ping",
      role: "KTV 2 (Kiểm soát an toàn)",
      timeEstimate: "5 phút",
      instructions: [
        "Từ máy Lab 1 (192.168.1.10), ping tới máy cùng mạng (192.168.1.20) ➔ Phản hồi Reply time<1ms.",
        "Thực hiện ping sang máy Lab 2 (192.168.1.70) khi chưa cấu hình định tuyến Router.",
        "Kết quả trả về Request timed out chứng minh việc phân chia mạng con đã thành công tuyệt đối.",
      ],
      pokaYoke: "Nếu ping giữa 2 subnet vẫn thông mà không qua Router, chứng tỏ Subnet Mask gõ sai về 255.255.255.0.",
      analogy: "Thử gọi cửa phòng bên: Cửa đã khóa kín nên hai phòng không thể đi thông sang nhau nếu bảo vệ chưa mở cổng.",
      diagramType: "troubleshoot_cmd",
    },
  ],
};

export default function ChiaSubnetIpv4Page() {
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
          <span className="text-slate-900 font-bold">Thực Hành LAB-03: Chia Mạng Con IPv4 Subnetting</span>
        </div>

        {/* Khung chia đôi màn hình chuẩn iFixit */}
        <LabSplitView lesson={LAB_03_LESSON} />
      </main>

      <Footer />
    </div>
  );
}
