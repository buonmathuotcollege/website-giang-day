import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LabSplitView } from "@/components/practice/lab-split-view";
import type { LabLesson } from "@/types/practice";

// Dữ liệu bài thực hành 6: Xử lý 5 sự cố mạng kinh điển (5 bước tiêu chuẩn)
const LAB_06_LESSON: LabLesson = {
  id: "lab-06",
  code: "LAB-06",
  title: "Quy Trình Chuẩn Đoán & Khắc Phục 5 Sự Cố Mạng Máy Tính Kinh Điển",
  moduleName: "Chẩn Đoán & Bảo Trì Hệ Thống Mạng",
  level: "Hệ Trung cấp 9+3",
  durationMinutes: 45,
  totalSteps: 5,
  safetyBrief: "Chẩn đoán từ tầng Vật lý lên tầng Ứng dụng (Mô hình OSI) · Luôn kiểm tra đèn LED phần cứng trước tiên",
  steps: [
    {
      id: 1,
      stepNumber: 1,
      title: "Sự cố 1: Đèn card mạng không sáng hoặc gãy lẫy hạt RJ45",
      role: "KTV 1 (Thi công bấm cáp)",
      timeEstimate: "5 phút",
      instructions: [
        "Hiện tượng: Biểu tượng mạng có dấu gạch chéo đỏ (Network cable unplugged).",
        "Bước 1: Rút đầu cáp mạng ra kiểm tra lẫy nhựa gài có bị gãy hoặc lỏng lẻo không.",
        "Bước 2: Cắm thử sang một Port khác trên Switch hoặc dùng hộp test cáp kiểm tra 8 đèn.",
        "Xử lý: Nếu gãy lẫy hoặc đứt sợi, cắt bỏ 3cm và bấm lại hạt mạng RJ45 mới chuẩn T568B.",
      ],
      pokaYoke: "Phải nghe tiếng 'tách' của lẫy nhựa khi cắm vào card mạng, dùng tay kéo nhẹ xem có bị tuột không.",
      analogy: "Ổ cắm điện bị lỏng: Phích cắm rơi ra ngoài thì bóng đèn không thể sáng được.",
      diagramType: "switch_plug",
    },
    {
      id: 2,
      stepNumber: 2,
      title: "Sự cố 2: Đứt sợi truyền tín hiệu số 3 và 6 (Nhận cáp nhưng không thông mạng)",
      role: "KTV 2 (Kiểm soát an toàn)",
      timeEstimate: "6 phút",
      instructions: [
        "Hiện tượng: Cắm cáp đèn có sáng mờ nhưng máy không nhận IP hoặc báo Unidentified Network.",
        "Cắm 2 đầu cáp vào hộp test cáp Master và Remote.",
        "Quan sát thứ tự đèn LED: Sợi 1, 2 sáng nhưng Sợi 3 hoặc Sợi 6 bị tắt ngấm.",
        "Kết luận: Cặp dây truyền nhận dữ liệu TX/RX (Sợi 1,2,3,6) bị đứt ngậm bên trong hoặc chưa cắn ngàm đồng.",
      ],
      pokaYoke: "Đầu kìm bấm phải bóp dứt khoát đủ lực để 8 lưỡi dao đồng cắt ngập vào lõi dây.",
      analogy: "Đứt dây thắng xe đạp: Dây vỏ ngoài còn nguyên nhưng ruột thép bên trong đã bị đứt làm đôi.",
      diagramType: "cable_tester",
    },
    {
      id: 3,
      stepNumber: 3,
      title: "Sự cố 3: Xung đột địa chỉ IP nội bộ (IP Address Conflict)",
      role: "KTV 3 (Cấu hình & Báo cáo)",
      timeEstimate: "5 phút",
      instructions: [
        "Hiện tượng: Windows hiện thông báo tam giác vàng 'There is an IP address conflict with another system'.",
        "Nguyên nhân: Hai máy tính trong cùng phòng bị gán trùng một địa chỉ IP tĩnh.",
        "Bước 1: Mở CMD gõ ipconfig /all để xem IP và địa chỉ MAC hiện tại.",
        "Bước 2: KTV 3 đối chiếu bảng phân công IP số bàn, đổi IP sang số chưa ai dùng (VD: 192.168.1.55).",
      ],
      pokaYoke: "Trước khi gán IP tĩnh mới, luôn gõ 'ping [IP_dự_kiến]' để chắc chắn chưa có thiết bị nào đang dùng.",
      analogy: "Trùng số căn cước công dân: Hai người trùng một số hộ khẩu thì công an phường sẽ không cấp giấy tờ.",
      diagramType: "ip_config",
    },
    {
      id: 4,
      stepNumber: 4,
      title: "Sự cố 4: Lỗi phân giải tên miền DNS (Ping IP được nhưng không mở được Web)",
      role: "KTV 3 (Cấu hình & Báo cáo)",
      timeEstimate: "5 phút",
      instructions: [
        "Hiện tượng: Trình duyệt báo 'Server IP address could not be found' (DNS_PROBE_FINISHED_NO_INTERNET).",
        "Kiểm tra thử: Mở CMD gõ ping 8.8.8.8 ➔ Trả về time<20ms (Mạng thông suốt ra quốc tế).",
        "Nhưng gõ: ping google.com ➔ Báo 'Could not find host google.com'.",
        "Khắc phục: Mở ncpa.cpl, đổi Preferred DNS sang 8.8.8.8 và Alternate DNS sang 1.1.1.1. Gõ lệnh ipconfig /flushdns.",
      ],
      pokaYoke: "Lệnh 'ipconfig /flushdns' là bắt buộc để xóa bộ nhớ đệm phân giải tên miền cũ của Windows.",
      analogy: "Mất sổ danh bạ: Bạn có điện thoại và sóng rất khỏe, nhưng bạn quên mất số điện thoại của bạn bè nên không gọi được.",
      diagramType: "troubleshoot_cmd",
    },
    {
      id: 5,
      stepNumber: 5,
      title: "Sự cố 5: Dùng lệnh Tracert tìm chính xác điểm nút đứt gãy mạng",
      role: "KTV 2 (Kiểm soát an toàn)",
      timeEstimate: "5 phút",
      instructions: [
        "Mở CMD, gõ lệnh theo dõi hành trình gói tin: tracert 8.8.8.8.",
        "Hop 1: 192.168.1.1 (Router phòng lab) - phản hồi <1ms.",
        "Hop 2: 10.0.0.1 (Router trung tâm trường) - phản hồi 2ms.",
        "Nếu từ Hop 3 trở đi hiện dấu hoa thị * * * (Request timed out): Sự cố xảy ra tại đường truyền ra ngoài của nhà mạng ISP.",
      ],
      pokaYoke: "Biết rõ điểm nghẽn nằm ở máy tính mình, ở Router phòng lab, hay ở nhà mạng bên ngoài để báo cáo chính xác.",
      analogy: "Lần theo từng trạm thu phí: Đi qua trạm nào thông trạm đó, dừng ở trạm nào là biết đoạn đường sau đó đang bị sạt lở.",
      diagramType: "troubleshoot_cmd",
    },
  ],
};

export default function XuLySuCoMangPage() {
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
          <span className="text-slate-900 font-bold">Thực Hành LAB-06: Chuẩn Đoán & Xử Lý Sự Cố Mạng</span>
        </div>

        {/* Khung chia đôi màn hình chuẩn iFixit */}
        <LabSplitView lesson={LAB_06_LESSON} />
      </main>

      <Footer />
    </div>
  );
}
