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
  diagramType: 
    | "strip_cable"      // Tuốt vỏ bảo vệ cáp
    | "arrange_wires"    // Sắp xếp thứ tự 8 sợi màu
    | "trim_wires"       // Cắt bằng đầu dây cáp
    | "crimp_rj45"       // Bấm kìm mạng RJ45
    | "cable_tester"     // Hộp test cáp 8 đèn LED
    | "switch_plug";     // Cắm vào Switch thử mạng
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
