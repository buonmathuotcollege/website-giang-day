import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LabSplitView } from "@/components/practice/lab-split-view";
import type { LabLesson } from "@/types/practice";

/**
 * Bài thực hành chuyên đề: Cấu hình Chia sẻ File & Cấp quyền Thư mục qua mạng LAN trên Windows 10
 * Chuẩn thiết kế chia đôi màn hình iFixit (Cầm tay chỉ việc - 100% thực hành tại phòng máy)
 * Giảng viên phụ trách: CN. Phạm Tiến Đông
 */
const LAB_FILE_SHARING_LESSON: LabLesson = {
  id: "lab-chia-se-file",
  code: "LAB-SHARE-01",
  title: "Cấu Hình Chia Sẻ File & Cấp Quyền Thư Mục Qua Mạng LAN Trên Windows 10",
  moduleName: "Quản Trị Mạng & Chia Sẻ Tài Nguyên",
  level: "Hệ Trung cấp 9+3",
  durationMinutes: 45,
  totalSteps: 5,
  safetyBrief: "Phải cấp quyền đồng thời cả 2 lớp (Sharing & Security) · Đổi sang Private Network · Chống lỗi Access Denied",
  steps: [
    {
      id: 1,
      stepNumber: 1,
      title: "Chuyển cấu hình mạng sang chế độ Private Network",
      role: "KTV 1 (Thi công bấm cáp)",
      timeEstimate: "4 phút",
      instructions: [
        "Mặc định Windows 10 đặt mạng ở chế độ Public làm tường lửa chặn toàn bộ cổng chia sẻ file.",
        "Nhấn tổ hợp phím Windows + I để mở Settings, chọn Network & Internet.",
        "Chọn Ethernet (nếu cắm dây mạng) hoặc Wi-Fi tùy kết nối hiện tại.",
        "Nhấp vào tên mạng đang dùng, tại mục Network profile chuyển từ Public sang Private.",
      ],
      pokaYoke: "Cả máy chủ (chứa file) và máy khách (nhận file) đều bắt buộc phải chọn Private Network.",
      analogy: "Mở cổng hàng xóm: Đổi từ chế độ 'ngoài đường công cộng' sang chế độ 'trong nội bộ gia đình'.",
      diagramType: "share_private_network",
      realImageUrl: "/images/chia-se-file/step-1-private-network.webp",
    },
    {
      id: 2,
      stepNumber: 2,
      title: "Cấu hình Advanced Sharing (Discovery & Tắt Password)",
      role: "KTV 3 (Cấu hình & Báo cáo)",
      timeEstimate: "5 phút",
      instructions: [
        "Nhấn Windows + R, gõ control.exe /name Microsoft.NetworkAndSharingCenter rồi nhấn Enter.",
        "Click vào dòng Change advanced sharing settings ở cột bên trái.",
        "Tại mục Private: Tích chọn Turn on network discovery và Turn on file and printer sharing.",
        "Cuộn xuống mục All Networks: Chọn Turn off password protected sharing để vào nhanh.",
        "Nhấn nút Save changes để lưu lại thiết lập mạng.",
      ],
      pokaYoke: "KTV 2 kiểm tra: Đảm bảo đã chọn 'Turn off password protected' để các máy học sinh không bị chặn mật khẩu.",
      analogy: "Bật đèn hành lang: Bật đèn để mọi người nhìn thấy nhau và mở cửa cổng không khóa then cài.",
      diagramType: "share_advanced_settings",
      realImageUrl: "/images/chia-se-file/step-2-advanced-sharing.jpg",
    },
    {
      id: 3,
      stepNumber: 3,
      title: "Thiết lập chia sẻ mạng qua tab Sharing (Cấp quyền Everyone)",
      role: "KTV 1 (Thi công bấm cáp)",
      timeEstimate: "6 phút",
      instructions: [
        "Tạo thư mục cần chia sẻ trên ổ D hoặc Desktop (Ví dụ: D:\\TAI_LIEU_THUC_HANH).",
        "Nhấp chuột phải vào thư mục, chọn Properties, chuyển sang thẻ Sharing.",
        "Nhấn vào nút Advanced Sharing... và tích chọn ô Share this folder.",
        "Nhấn nút Permissions, chọn nhóm Everyone, tích chọn Full Control (hoặc Read nếu chỉ cho xem).",
        "Nhấn Apply và OK để đóng cửa sổ chia sẻ nâng cao.",
      ],
      pokaYoke: "Đặt tên Share Name ngắn gọn không dấu tiếng Việt, không chứa ký tự đặc biệt để tránh lỗi đường dẫn.",
      analogy: "Mở quầy bốc thuốc: Đặt biển thông báo cho phép tất cả mọi người được vào lấy tài liệu.",
      diagramType: "share_permissions",
      realImageUrl: "/images/chia-se-file/step-3-sharing-permissions.webp",
    },
    {
      id: 4,
      stepNumber: 4,
      title: "Cấp quyền bảo mật hệ thống tập tin NTFS qua tab Security",
      role: "KTV 2 (Kiểm soát an toàn)",
      timeEstimate: "5 phút",
      instructions: [
        "Chuyển sang thẻ Security (nằm ngay cạnh thẻ Sharing trong hộp thoại Properties).",
        "Nhấn vào nút Edit... bên dưới danh sách người dùng để chỉnh sửa quyền NTFS.",
        "Nhấn nút Add..., gõ chữ Everyone vào khung trống rồi bấm Check Names -> Nhấn OK.",
        "Tích chọn ô Full Control ở cột Allow để cấp toàn quyền chỉnh sửa và chép file.",
        "Nhấn Apply -> OK -> Close để hoàn tất cấu hình an toàn 2 lớp.",
      ],
      pokaYoke: "ĐIỂM DỪNG BẮT BUỘC: Nếu thiếu bước cấp quyền ở thẻ Security, máy khách sẽ gặp lỗi 'Access Denied'!",
      analogy: "Mở khóa 2 lớp: Thẻ Sharing là mở cổng rào, thẻ Security là mở chìa khóa phòng chứa đồ.",
      diagramType: "share_security_tab",
      realImageUrl: "/images/chia-se-file/step-4-security-tab-ntfs.webp",
    },
    {
      id: 5,
      stepNumber: 5,
      title: "Truy cập và sao chép dữ liệu từ máy trạm qua lệnh Run \\\\IP",
      role: "KTV 3 (Cấu hình & Báo cáo)",
      timeEstimate: "5 phút",
      instructions: [
        "Trên máy chủ: Nhấn Windows + R, gõ cmd -> gõ ipconfig lấy địa chỉ IPv4 (VD: 192.168.1.50).",
        "Trên máy khách: Nhấn Windows + R, gõ cú pháp: \\\\192.168.1.50 rồi nhấn Enter.",
        "Thư mục chia sẻ sẽ mở ra tức thì trong File Explorer.",
        "Tạo thử một file văn bản test.txt để kiểm tra quyền ghi (Write) thành công 100%.",
      ],
      pokaYoke: "Phải gõ 2 dấu gạch chéo ngược \\\\, nếu gõ nhầm // sẽ bị trình duyệt web hiểu nhầm là URL.",
      analogy: "Đi theo số nhà: Nhập đúng địa chỉ số nhà là xe hàng tự động chạy đến tận cửa giao nhận đồ.",
      diagramType: "share_run_ip",
      realImageUrl: "/images/chia-se-file/step-5-access-shared-folder.jpg",
    },
  ],
};

export default function ChiaSeFilePage() {
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
          <Link href="/#danh-sach-lab" className="hover:text-slate-900 hover:underline">
            Khóa Học
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Chia Sẻ File & Cấp Quyền Mạng LAN (Windows 10)</span>
        </div>

        {/* Khung chia đôi màn hình chuẩn iFixit */}
        <LabSplitView lesson={LAB_FILE_SHARING_LESSON} />
      </main>

      <Footer />
    </div>
  );
}
