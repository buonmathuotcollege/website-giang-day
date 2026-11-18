/**
 * Kiểu dữ liệu cho các bài học thực hành mạng theo chuẩn iFixit
 * Giảng viên: CN. Phạm Tiến Đông
 */

export type KtvRole = 
  | "KTV 1 (Thi công bấm cáp)"
  | "KTV 2 (Kiểm soát an toàn)"
  | "KTV 3 (Cấu hình & Báo cáo)";

export interface LabStep {
  id: number;
  stepNumber: number;
  title: string;
  role: KtvRole;
  timeEstimate: string; // Ví dụ: "3 phút"
  instructions: string[]; // Các gạch đầu dòng ngắn gọn (dưới 15 từ mỗi ý)
  pokaYoke: string; // Quy tắc chống sai lỗi (Poka-Yoke) bắt buộc kiểm tra
  analogy?: string; // Ví von đời thường dễ hiểu
  imageUrl?: string; // Đường dẫn ảnh minh họa cục bộ (/images/chia-se-file/...)
  realImageUrl?: string; // Ảnh chụp màn hình thực tế Windows tải về từ web
  diagramType: 
    | "strip_cable"           // Tuốt vỏ bảo vệ cáp
    | "arrange_wires"         // Sắp xếp thứ tự 8 sợi màu
    | "trim_wires"            // Cắt bằng đầu dây cáp
    | "crimp_rj45"            // Bấm kìm mạng RJ45
    | "cable_tester"          // Hộp test cáp 8 đèn LED
    | "switch_plug"           // Cắm vào Switch thử mạng
    | "ip_config"             // Cửa sổ cài đặt IPv4 Windows
    | "subnetting"            // Phân chia mạng con Subnetting
    | "switch_vlan"           // Phân chia VLAN trên Switch tủ Rack
    | "router_dhcp"           // Cấu hình Router & DHCP Pool
    | "troubleshoot_cmd"      // Lệnh CMD chẩn đoán lỗi mạng (Ping/Tracert)
    | "share_private_network" // Chuyển mạng sang Private Network
    | "share_advanced_settings"// Bật Network Discovery & Tắt Password
    | "share_permissions"     // Cấp quyền Everyone ở Tab Sharing
    | "share_security_tab"    // Cấp quyền Everyone ở Tab Security (NTFS)
    | "share_run_ip";         // Truy cập qua lệnh Run \\IP
}

export interface LabLesson {
  id: string;
  code: string; // LAB-01
  title: string;
  moduleName: string; // Mạng Căn Bản & Hạ Tầng Mạng
  level: string; // Hệ Trung cấp 9+3
  durationMinutes: number;
  totalSteps: number;
  safetyBrief: string; // 3 Điểm dừng an toàn 5S
  steps: LabStep[];
}
