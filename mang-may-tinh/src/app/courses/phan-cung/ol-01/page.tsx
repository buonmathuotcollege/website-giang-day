"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShieldAlert,
  Lightbulb,
  Cpu,
  Layers,
  Monitor,
  CheckCircle2,
  Maximize2,
  X,
  Send,
  Sparkles,
  Info,
  RotateCcw,
  Zap,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  HardDrive,
  Printer,
  Wrench,
  Flame,
  AlertTriangle,
  FileCheck2,
  Clock,
  CheckSquare,
} from "lucide-react";

/**
 * Kiểu dữ liệu cho bước thực hành KTV
 */
interface KtvStep {
  id: string;
  stepNumber: number;
  shortName: string;
  title: string;
  role: string;
  timeEstimate: string;
  checkpoint?: {
    code: string;
    name: string;
    requirement: string;
  };
  instructions: string[];
  pokaYoke: string;
  analogy: string;
  marketNote?: string;
  imageSrc: string;
  imageAlt: string;
  hotspotTarget?: string;
}

/**
 * 01 QUY TRÌNH 7 BƯỚC XUYÊN SUỐT: NHẬN – CỨU – BẮT – SẠCH – CÀI – THỬ – GIAO
 * Tối ưu hóa 100% cho học sinh hệ 9+3 có học lực yếu - trung bình
 */
const KTV_7_STEPS: KtvStep[] = [
  {
    id: "step-1",
    stepNumber: 1,
    shortName: "1. Nhận máy",
    title: "Tiếp Nhận Máy, Khám Bên Ngoài & Đọc Cấu Hình Ban Đầu",
    role: "KTV 3 (Ghi chép & Thông số)",
    timeEstimate: "15 phút",
    imageSrc: "/images/ol-01/main-h510.jpg",
    imageAlt: "Khảo sát bo mạch chủ MSI H510M-A PRO và khám vỏ thùng máy",
    hotspotTarget: "socket-cpu",
    instructions: [
      "Khám vỏ ngoài: Quan sát móp méo, vỡ nhựa, thiếu ốc nắp hông hay đứt dây nguồn/cáp màn hình.",
      "Bấm nút nguồn thử máy: Xem máy rơi vào trường hợp nào (A: Vào Win bình thường; B: Im re; C: Quạt quay màn đen; D: Lỗi ổ cứng No Bootable).",
      "Đọc cấu hình máy: Mở phần mềm CPU-Z xem tên chip CPU, model Mainboard, đời RAM (DDR4), dung lượng RAM (8GB). Mở CrystalDiskInfo xem sức khỏe ổ cứng (Good = Xanh).",
      "Kiểm tra linh kiện lắp thêm: Đối chiếu chuẩn DDR trên thanh RAM rời với Mainboard H510 (phải cùng chuẩn DDR4 mới lắp vừa, DDR3 bị lệch khe khuyết).",
    ],
    pokaYoke:
      "QUY TẮC BẮT BUỘC: Luôn kiểm tra tình trạng máy ban đầu trước khi tháo lắp để tránh nhận máy đã cháy hỏng từ trước.",
    analogy:
      "Như bác sĩ khám tổng quát lúc mới nhận bệnh nhân: Bắt mạch, đo huyết áp xem người bệnh còn tỉnh hay hôn mê trước khi kê đơn.",
    marketNote:
      "Mainboard dòng H (H510, H610) phổ thông giá rẻ; dòng B (B560, B660) tầm trung cho đồ họa/gaming; dòng Z (Z590, Z690) cao cấp ép xung.",
  },
  {
    id: "step-2",
    stepNumber: 2,
    shortName: "2. Cứu dữ liệu",
    title: "Cứu & Sao Lưu Dữ Liệu Khách Hàng (Desktop & Documents)",
    role: "KTV 2 (Kiểm soát an toàn Poka-Yoke)",
    timeEstimate: "15 phút",
    checkpoint: {
      code: "ĐIỂM DỪNG 1",
      name: "Xác Nhận Dữ Liệu Khách & An Toàn Điện",
      requirement: "Thầy kiểm tra: Dữ liệu đã copy đủ 100% sang ổ D; dây nguồn AC đã rút và đã bấm xả điện 3 lần.",
    },
    imageSrc: "/images/ol-01/main-h510.jpg",
    imageAlt: "Ổ cứng lưu trữ SSD SATA và cấu trúc phân vùng dữ liệu an toàn",
    hotspotTarget: "sata-m2",
    instructions: [
      "Xác định 3 vị trí sống còn: Toàn bộ file Word, Excel, ảnh quan trọng của khách nằm ở Desktop, Documents và Downloads (đều thuộc Ổ ĐĨA C).",
      "Nếu máy còn vào được Windows: Bấm chuột phải vào thư mục tài liệu ngoài Desktop -> chọn Properties ghi lại số Files và số MB. Mở ổ D tạo thư mục SAO_LUU_KHACH rồi COPY (tuyệt đối không Cut) toàn bộ dữ liệu sang.",
      "Nếu máy hỏng Windows: Cắm USB Cứu hộ WinPE -> Bật máy bấm liên tục F11 (MSI) chọn UEFI: Tên USB -> Vào WinPE mở ổ C:Users Desktop copy hết sang ổ D.",
      "Đối chiếu Properties thư mục ở ổ D đảm bảo khớp 100% số file gốc và mở thử 2 file bất kỳ.",
    ],
    pokaYoke:
      "LUẬT DỮ LIỆU TRƯỚC, MÁY SAU: Sửa máy giỏi mấy mà làm mất file của khách là phải đền tiền! Chưa sao lưu xong thì TUYỆT ĐỐI không được format hay tháo ổ cứng.",
    analogy:
      "Như chuyển hết đồ đạc quý giá ra khỏi nhà trước khi đập tường sửa nhà: Phải cất đồ đạc vào két an toàn mới được bắt đầu cưa đục.",
  },
  {
    id: "step-3",
    stepNumber: 3,
    shortName: "3. Bắt bệnh 60s",
    title: "Chẩn Đoán ('Bắt Bệnh 60 Giây') & Cứu Sống Máy Không Hoạt Động",
    role: "KTV 1 (Thao tác kỹ thuật chính)",
    timeEstimate: "20 phút",
    imageSrc: "/images/ol-01/ram-ddr4.jpg",
    imageAlt: "Tuyệt chiêu chà tẩy trắng chân mạ vàng thanh RAM DDR4 cứu 80% máy lỗi",
    hotspotTarget: "ram-slots",
    instructions: [
      "Ca 1 (Máy im re): Cắm chặt dây nguồn, gạt công tắc sau nguồn sang 'I'. Cắm lại dây POWER SW vào 2 chân kim sát cạnh chỗ mất kim trên cụm F_PANEL. Thử quẹt nhẹ tua vít vào 2 chân kim để kiểm tra nút bấm.",
      "Ca 2 (Quạt quay nhưng màn hình đen - Chiếm 80% máy lỗi): Rút điện, bấm xả điện 3 lần -> Bẻ 2 ngàm tháo RAM -> Dùng CỤC TẨY TRẮNG (gôm học sinh) chà mạnh cho sáng bóng cả 2 mặt chân đồng vàng -> Quét sạch khe RAM -> Cắm lại nghe tiếng TÁCH. Tháo pin CMOS ra 1 phút rồi lắp lại.",
      "Ca 3 (Chữ trắng No Bootable Device): Rút điện, cắm chặt lại 2 dây chữ L ở đít ổ SSD. Bật máy bấm Delete/F2 vào BIOS -> Thẻ Boot đưa ổ SSD lên dòng số 1 -> Bấm F10 lưu lại.",
      "Ca 4 (Sai ngày giờ / Báo Press F1): Thay viên pin đồng xu CR2032 mới (mặt dấu + ngửa lên trên), vào BIOS chỉnh đúng ngày giờ rồi F10 lưu.",
      "Ca 5 (Chạy 5-10 phút nóng tự tắt): Kiểm tra quạt CPU có quay không, dây đã cắm vào chân CPU_FAN chưa, tra lại keo tản nhiệt mới.",
    ],
    pokaYoke:
      "NGUYÊN TẮC BẮT BỆNH: Khám từ ngoài vào trong, từ dễ đến khó. Mỗi lần chỉ sửa hoặc thay MỘT thứ rồi thử máy để biết chính xác thủ phạm.",
    analogy:
      "Như thợ khóa tìm chìa: Chân RAM bị bụi mờ giống như chìa khóa bị gỉ sét, lấy cục gôm đánh bóng chân là chìa mở ổ khóa máy tính lên hình ngay.",
  },
  {
    id: "step-4",
    stepNumber: 4,
    shortName: "4. Bảo dưỡng & Nâng cấp",
    title: "Vệ Sinh Thổi Bụi, Tra Keo 'Hạt Đậu Xanh' & Lắp Nâng Cấp RAM/SSD",
    role: "KTV 1 & KTV 2 (Thao tác & Kiểm soát)",
    timeEstimate: "35 phút",
    checkpoint: {
      code: "ĐIỂM DỪNG 2",
      name: "Kiểm Soát Cơ Khí Trước Khi Cắm Điện",
      requirement: "Thầy kiểm tra 10 giây: (1) Hai ngàm RAM đã khóa sát khấc; (2) Dây quạt đã cắm CPU_FAN; (3) Không rơi ốc vít trên bo mạch.",
    },
    imageSrc: "/images/ol-01/vga-gt730.jpg",
    imageAlt: "Lắp ráp card rời GT 730 vào khe PCIe x16 và nâng cấp RAM/SSD",
    hotspotTarget: "pcie-x16",
    instructions: [
      "Quét và thổi bụi: Dùng cọ mềm và bóng thổi làm sạch hốc nguồn, quạt CPU, mặt Mainboard. BẮT BUỘC dùng tay giữ đứng cánh quạt khi thổi (không để quạt quay tít mù sinh điện ngược hỏng mạch).",
      "Lau keo cũ & tra keo mới: Lau sạch lớp keo khô cũ trên lưng CPU. Bóp đúng 01 GIỌT BẰNG HẠT ĐẬU XANH vào chính giữa lưng CPU. Lắp quạt và ấn/vặn chốt theo đường chéo đối xứng để mặt tản nhiệt ép phẳng đều. Cắm dây vào chân CPU_FAN.",
      "Lắp nâng cấp RAM 8GB DDR4: Mở 2 ngàm khóa, soi đúng rãnh khuyết lệch của DDR4, ấn thẳng đều 2 đầu thanh RAM đến khi nghe tiếng 'TÁCH' dứt khoát.",
      "Lắp Card màn hình rời GT 730: Cắm ngập chân PCIe x16, gài chốt khóa đuôi card, siết ốc nẹp case máy tính.",
      "Lắp SSD mới & 4 cú nhấp chuột 'đánh thức' ổ mới: Vào Windows chuột phải nút Start -> Disk Management -> Bấm OK (chuẩn GPT) -> Chuột phải ô vạch MÀU ĐEN (Unallocated) chọn New Simple Volume -> Bấm Next 4 lần rồi Finish là ổ đĩa mới hiện ngay trong This PC!",
    ],
    pokaYoke:
      "NGUYÊN TẮC ZERO-FORCE INSERTION: Thấy cộm tay hoặc nặng lực là dừng ngay! Tuyệt đối không dùng sức đè ép làm gãy chân socket CPU hoặc toác khe cắm bo mạch.",
    analogy:
      "Keo tản nhiệt như lớp kem lót: Bóp đúng 1 giọt hạt đậu xanh để truyền nhiệt êm ái; bóp nhiều quá tràn ra ngoài như đổ thừa canh làm ướt bàn.",
  },
  {
    id: "step-5",
    stepNumber: 5,
    shortName: "5. Cài đặt Windows 10",
    title: "Cài Mới Windows 10, Đầy Đủ Driver & Phần Mềm Hợp Lệ",
    role: "KTV 1 (Cài đặt hệ điều hành)",
    timeEstimate: "35 phút",
    imageSrc: "/images/ol-01/main-h510.jpg",
    imageAlt: "Giao diện cài đặt Windows 10 chuẩn UEFI và kiểm tra Device Manager sạch chấm than",
    instructions: [
      "Boot từ USB cài Windows: Cắm USB -> Bật máy bấm liên tục F11 (MSI) -> Chọn dòng 'UEFI: Tên USB' -> Bấm Enter.",
      "QUY TẮC NHÌN SỐ GB CHỌN Ổ C: Đến bảng chọn phân vùng, đối chiếu số GB đã ghi ở Bước 1. Dòng dung lượng nhỏ (60GB–120GB) là Ổ C để cài Win; dòng dung lượng lớn (200GB–500GB) là Ổ D chứa tài liệu của khách. Chỉ bấm Format vào dòng Ổ C -> Next. Tuyệt đối không đụng vào Ổ D!",
      "Thiết lập lần đầu: Đặt tên máy theo số bàn (VD: PC-BAN01), chỉnh múi giờ (UTC+07:00) Bangkok, Hanoi, Jakarta và kiểm tra ngày giờ đúng.",
      "QUY TẮC SẠCH BÓNG CHẤM THAN VÀNG (!): Chuột phải nút Start -> Device Manager. Còn tam giác vàng chấm than (!) là đang thiếu Driver -> Chạy bộ cài Driver (Chipset, VGA GT 730, Audio, LAN) đến khi Device Manager sạch bóng 100%.",
      "Cài phần mềm chuẩn: Cài UniKey (Unicode + Telex, khởi động cùng Win), 7-Zip, đọc PDF. Chép trả tài liệu của khách từ ổ D ra ngoài màn hình Desktop.",
      "Tạo phanh an toàn System Restore: Gõ 'Create a restore point' -> Chọn ổ C -> Configure bật bảo vệ -> Bấm Create đặt tên 'MAY_CHAY_TOT' (lần sau lỗi phần mềm chỉ mất 3 phút khôi phục lại).",
    ],
    pokaYoke:
      "QUY TẮC SỐNG CÒN KHI CÀI WIN: RÚT USB ngay sau lần máy tự khởi động lại đầu tiên (để máy không bị quay lại vòng lặp cài đặt ban đầu).",
    analogy:
      "Device Manager như cuốn sổ điểm danh quân số: Hễ còn bạn nào gắn cờ vàng chấm than là chưa vào lớp, phải gọi đủ Driver mới làm việc ngon lành.",
  },
  {
    id: "step-6",
    stepNumber: 6,
    shortName: "6. Thử ngoại vi & Máy in",
    title: "Kiểm Tra Ngoại Vi & 3 Bước Chữa Máy In 'Cắm Vào Không Chịu In'",
    role: "KTV 3 (Kiểm thử ngoại vi)",
    timeEstimate: "15 phút",
    imageSrc: "/images/ol-01/main-h510.jpg",
    imageAlt: "Kiểm tra cổng kết nối ngoại vi, cài đặt máy in và in trang Test Page",
    instructions: [
      "Kiểm tra ngoại vi: Mở Notepad gõ thử 1 câu tiếng Việt có dấu; bấm thử chuột trái, phải, con lăn; cắm dây mạng kiểm tra biểu tượng mạng có Internet.",
      "Cài đặt máy in qua cáp USB: Cắm cáp USB của máy in vào thùng máy, bật đèn nguồn máy in, cài đặt Driver tương ứng.",
      "3 bước chữa máy in không chịu in: (1) Kiểm tra đèn nguồn máy in, cáp USB, giấy trong khay; (2) Mở Control Panel -> Devices and Printers -> Chuột phải vào máy in chọn 'Set as default printer' để hiện DẤU TÍCH XANH; (3) Nhấp đúp chuột vào máy in -> menu Printer -> chọn 'Cancel All Documents' để xóa lệnh kẹt.",
      "In trang nghiệm thu: Chuột phải máy in -> Printer properties -> Bấm nút 'Print Test Page' để in ra tờ giấy kiểm tra đính kèm hồ sơ bàn giao.",
    ],
    pokaYoke:
      "ĐIỂM DỪNG BẮT BUỘC: Nhiều khi máy in không in được chỉ vì máy tính đang chọn nhầm sang máy in ảo PDF! Phải kiểm tra dấu tích xanh mặc định.",
    analogy:
      "Như đường thông hè thoáng: Hàng dài người xếp hàng chen lấn làm tắc cửa (kẹt lệnh in), bấm Cancel All Documents là dọn thông đường để tờ giấy chạy ra ngay.",
  },
  {
    id: "step-7",
    stepNumber: 7,
    shortName: "7. Bàn giao máy",
    title: "Nghiệm Thu 5 Tiêu Chí Chuẩn Nghề, Đóng Nắp Vỏ & Lập Biên Bản",
    role: "KTV 3 & Nhóm KTV",
    timeEstimate: "15 phút",
    checkpoint: {
      code: "ĐIỂM DỪNG 3",
      name: "Nghiệm Thu Bàn Giao Ca Máy",
      requirement: "Thầy kiểm tra 3 màn hình: (1) Device Manager sạch chấm than; (2) HWMonitor nhiệt độ CPU <75°C; (3) Dữ liệu khách nguyên vẹn.",
    },
    imageSrc: "/images/ol-01/main-h510.jpg",
    imageAlt: "Đo nhiệt độ CPU bằng HWMonitor và hoàn tất phiếu nghiệm thu bàn giao 5 điểm",
    instructions: [
      "Tự dò đúng 5 tiêu chí trước khi đóng nắp thùng máy:",
      "1. Trong thùng máy: Quạt CPU quay êm, dây nguồn đã dùng dây rút buộc gọn không chạm cánh quạt, không bỏ quên ốc vít hay dụng cụ trong máy.",
      "2. Nhiệt độ CPU (mở phần mềm HWMonitor): Nhiệt độ CPU khi máy nghỉ mát dưới 75°C (nếu lên 85-95°C là lắp quạt bị kênh chân hoặc thiếu keo).",
      "3. Nhận diện phần cứng: This PC và Device Manager nhận đủ 8GB RAM, đủ ổ C và D, sạch dấu chấm than vàng. CrystalDiskInfo báo Good.",
      "4. Dữ liệu khách: Mở thư mục tài liệu ngoài Desktop, còn nguyên vẹn 100% số file.",
      "5. Thu dọn & Bàn giao: Rút điện đóng nắp vỏ máy, vặn đủ ốc, lau sạch màn hình – bàn phím – chuột, dọn sạch rác và điền đủ phiếu bàn giao.",
    ],
    pokaYoke:
      "TIÊU CHÍ 5S TẠI BÀN: KTV chuyên nghiệp không chỉ sửa máy chạy được mà còn phải bàn giao máy sạch sẽ, gọn gàng, trả đủ dụng cụ vào khay.",
    analogy:
      "Như giao xe sau khi bảo dưỡng: Rửa xe sáng bóng, nổ máy êm ru, kiểm tra phanh an toàn và viết phiếu bảo hành trước khi trao chìa khóa cho khách.",
  },
];

/**
 * Danh sách 5 ca bệnh 60 giây cứu sống máy không lên
 */
interface DiagnosticCase {
  id: string;
  name: string;
  symptom: string;
  rootCause: string;
  quickFix: string[];
  tool: string;
}

const DIAGNOSTIC_CASES: DiagnosticCase[] = [
  {
    id: "case-1",
    name: "Ca 1: Máy Im Re (Không Điện)",
    symptom: "Bấm nút nguồn mà máy im lìm 100%: Quạt không quay, đèn không sáng.",
    rootCause: "Điện chưa vào được máy, công tắc nguồn tắt hoặc tuột dây nút bấm POWER SW.",
    quickFix: [
      "1. Kiểm tra dây điện đen sau đít máy đã cắm chặt; gạt công tắc nguồn sau lưng sang vạch 'I'.",
      "2. Mở nắp máy, nhìn góc dưới phải Mainboard (cụm F_PANEL): Cắm lại dây 'POWER SW' vào 2 chân kim sát cạnh chỗ trống mất kim.",
      "3. Mẹo thử nhanh: Rút dây POWER SW ra, lấy đầu tua vít chạm nhẹ cùng lúc 2 chân kim đó. Nếu quạt quay vù vù -> hỏng nút bấm vỏ case; nếu vẫn im re -> thay nguồn khác.",
    ],
    tool: "Tua vít 4 cạnh có từ tính",
  },
  {
    id: "case-2",
    name: "Ca 2: Quạt Quay, Màn Hình Đen (80% Máy Lỗi)",
    symptom: "Bật máy quạt trong thùng quay vù vù nhưng màn hình đen thui (báo No Signal), đèn bàn phím không sáng.",
    rootCause: "Chân mạ vàng của thanh RAM bị bụi bẩn, ẩm mốc hoặc lỏng chốt ngàm (Thủ phạm số 1 của phòng máy!).",
    quickFix: [
      "1. Kiểm tra dây màn hình đã cắm chặt vào cổng xuất hình của card rời GT 730 chưa.",
      "2. TUYỆT CHIÊU CỤC TẨY: Rút điện, bấm nút nguồn 3 lần xả điện -> Bẻ 2 ngàm tháo thanh RAM ra.",
      "3. Dùng CỤC TẨY TRẮNG (gôm học sinh) chà mạnh cho sáng bóng cả 2 mặt chân mạ vàng -> Quét sạch khe RAM.",
      "4. Ấn thẳng thanh RAM xuống khe đến khi nghe tiếng 'TÁCH' dứt khoát và 2 ngàm tự ôm chặt.",
      "5. Tháo viên pin đồng xu CMOS ra 1 phút rồi lắp lại -> Bật máy lên hình ngay!",
    ],
    tool: "Cục tẩy trắng (gôm học sinh) & Cọ mềm",
  },
  {
    id: "case-3",
    name: "Ca 3: Lỗi 'No Bootable Device'",
    symptom: "Bật máy lên logo rồi dừng lại ở màn hình đen có chữ trắng: 'No Bootable Device' hoặc 'Reboot and Select proper Boot device'.",
    rootCause: "Bo mạch chủ không nhìn thấy ổ cứng SSD/HDD chứa hệ điều hành Windows (lỏng dây hoặc sai thứ tự boot).",
    quickFix: [
      "1. Rút điện nguồn -> Nhìn vào đít ổ cứng SSD: Cắm chặt lại cả 2 sợi dây chữ L (dây nguồn dẹt và cáp SATA nhỏ). Có thể đổi cáp SATA sang cổng bên cạnh trên bo mạch.",
      "2. Bật máy, bấm phím Delete hoặc F2 liên tục để vào BIOS.",
      "3. Chuyển sang thẻ 'Boot' -> Chọn tên ổ cứng SSD của máy lên dòng số 1 (Boot Option #1).",
      "4. Bấm phím F10 chọn Yes (Enter) để lưu lại và khởi động vào Windows.",
    ],
    tool: "Cáp dữ liệu SATA có lẫy kim loại chống tuột",
  },
  {
    id: "case-4",
    name: "Ca 4: Sai Ngày Giờ & Báo 'Press F1'",
    symptom: "Bật máy hiện dòng chữ 'Press F1 to Continue', ngày giờ bị nhảy lùi về năm cũ (2009, 2015...), trình duyệt không vào được web.",
    rootCause: "Viên pin đồng xu nuôi đồng hồ CMOS (mã số CR2032) trên bo mạch chủ đã cạn sạch điện.",
    quickFix: [
      "1. Rút phích cắm điện nguồn AC.",
      "2. Lấy ngón tay bấm nhẹ vào lẫy kim loại cạnh viên pin tròn màu bạc trên bo mạch, viên pin tự bật lên.",
      "3. Lấy viên pin CR2032 mới (mặt có dấu '+' ngửa lên trên), đặt vào khay và ấn nhẹ xuống kêu 'tách'.",
      "4. Bật máy vào BIOS chỉnh lại đúng ngày giờ hôm nay rồi bấm phím F10 lưu lại.",
    ],
    tool: "Viên pin đồng xu CR2032 3V",
  },
  {
    id: "case-5",
    name: "Ca 5: Máy Nóng Rực, Chạy 10 Phút Tự Tắt",
    symptom: "Máy khởi động được nhưng chạy được 5-10 phút thì máy rất chậm, quạt gầm to, sờ vỏ máy nóng rực rồi tự động sập nguồn tắt phụt.",
    rootCause: "CPU bị quá nhiệt (>90°C) do quạt không quay, tuột dây quạt, bung chốt quạt hoặc lớp keo tản nhiệt đã khô trắng như vôi.",
    quickFix: [
      "1. Mở nắp máy quan sát xem quạt CPU có quay êm không; dây quạt đã cắm vào chân 'CPU_FAN' chưa.",
      "2. Rút điện, tháo quạt CPU ra -> Lấy khăn giấy khô lau thật sạch lớp keo khô cũ trên lưng CPU và đáy quạt.",
      "3. Bóp đúng 01 GIỌT KEO MỚI CỠ HẠT ĐẬU XANH vào chính giữa lưng CPU.",
      "4. Đặt quạt và ấn/vặn chặt 4 chốt theo đường chéo đối xứng để mặt tản nhiệt ép đều phẳng.",
    ],
    tool: "Tuýp keo tản nhiệt xám & Khăn giấy khô",
  },
];

/**
 * 5 Điểm Hotspot trên Bo Mạch MSI H510
 */
interface HotspotInfo {
  id: string;
  stepId: string;
  title: string;
  badge: string;
  top: string;
  left: string;
  color: string;
  description: string;
  pokaYoke: string;
}

const H510_HOTSPOTS: HotspotInfo[] = [
  {
    id: "socket-cpu",
    stepId: "step-1",
    title: "1. Socket LGA1200 (CPU Intel Gen 10/11)",
    badge: "1200 Chân Kim Đồng",
    top: "33%",
    left: "40%",
    color: "bg-blue-600",
    description: "Nơi lắp CPU Intel Core i3, i5 thế hệ 10 và 11. Ở 1 góc có hình tam giác vàng định hướng.",
    pokaYoke: "Tuyệt đối không lấy tay chạm vào chân kim trong socket; đặt CPU thẳng góc theo dấu tam giác vàng.",
  },
  {
    id: "ram-slots",
    stepId: "step-3",
    title: "2. Khe Cắm RAM DDR4 (Dual-Channel)",
    badge: "8GB DDR4 · Rãnh Khuyết Lệch",
    top: "33%",
    left: "70%",
    color: "bg-emerald-600",
    description: "2 khe cắm RAM chuẩn DDR4 Bus 2666/3200MHz. Khe khuyết nằm lệch một bên đặc thù của DDR4.",
    pokaYoke: "Zero-force insertion: Không ấn cố khi thấy cộm tay; ấn đều 2 đầu đến khi nghe tiếng TÁCH ôm chặt.",
  },
  {
    id: "pcie-x16",
    stepId: "step-4",
    title: "3. Khe PCIe 3.0/4.0 x16 (Card Rời GT 730)",
    badge: "Đồ Họa Rời GT 730 2GB",
    top: "60%",
    left: "38%",
    color: "bg-amber-500",
    description: "Khe cắm card màn hình đồ họa chuyên dụng với băng thông tối đa 16 làn. Lắp card rời NVIDIA GT 730.",
    pokaYoke: "Mở lẫy đuôi khe trước khi cắm; bắt buộc cắm dây màn hình vào cổng của card GT 730 để có hình.",
  },
  {
    id: "sata-m2",
    stepId: "step-2",
    title: "4. Cụm Cổng SATA III 6Gb/s & Khe M.2",
    badge: "Ổ Cứng SSD 128GB/256GB",
    top: "78%",
    left: "72%",
    color: "bg-indigo-600",
    description: "4 cổng SATA III hình chữ L và 1 khe M.2 NVMe PCIe Gen3 x4 cho ổ SSD tốc độ cao.",
    pokaYoke: "Cáp dữ liệu SATA và nguồn SATA đều có gờ chữ L chống cắm ngược, không dùng sức bẻ gãy chân nhựa.",
  },
  {
    id: "power-atx",
    stepId: "step-1",
    title: "5. Đầu Cấp Nguồn 24-Pin ATX & 8-Pin CPU",
    badge: "Điện Áp 12V / 5V / 3.3V",
    top: "40%",
    left: "87%",
    color: "bg-rose-600",
    description: "Cổng nguồn chính 24 chân nuôi bo mạch và đầu nguồn 8-pin 12V cấp điện riêng cho CPU.",
    pokaYoke: "Cả 2 đầu nối đều có lẫy nhựa gài an toàn; ấn chặt cho đến khi khớp khóa ngậm khít chống đánh tia lửa điện.",
  },
];

export default function CompleteHardwareTrainingPage() {
  // Tab điều hướng chính: 'workflow7' (Quy trình 7 bước) | 'diagnostics' (Bắt bệnh 60s) | 'components' (5 món 4 dây) | 'report' (Nghiệm thu)
  const [activeMainTab, setActiveMainTab] = React.useState<"workflow7" | "diagnostics" | "components" | "report">("workflow7");

  // Bước đang chọn trong quy trình 7 bước
  const [activeStepId, setActiveStepId] = React.useState<string>("step-1");

  // Checkbox tiến độ 7 bước
  const [checkedSteps, setCheckedSteps] = React.useState<Record<string, boolean>>({
    "step-1": false,
    "step-2": false,
    "step-3": false,
    "step-4": false,
    "step-5": false,
    "step-6": false,
    "step-7": false,
  });

  // Chế độ xem cột phải: 'interactive' (Sơ đồ bo mạch H510) | 'stepImage' (Ảnh linh kiện theo bước)
  const [rightViewMode, setRightViewMode] = React.useState<"interactive" | "stepImage">("interactive");

  // Điểm Hotspot đang chọn trên sơ đồ
  const [selectedHotspot, setSelectedHotspot] = React.useState<HotspotInfo>(H510_HOTSPOTS[1]);

  // Ca bệnh 60s đang chọn
  const [selectedCaseId, setSelectedCaseId] = React.useState<string>("case-2");

  // Modal phóng to ảnh máy chiếu
  const [zoomedImage, setZoomedImage] = React.useState<{ src: string; alt: string; title: string } | null>(null);

  // Form nghiệm thu
  const [machineNumber, setMachineNumber] = React.useState<string>("");
  const [tableNumber, setTableNumber] = React.useState<string>("01");
  const [ktvNames, setKtvNames] = React.useState<string>("");
  const [cpuTemp, setCpuTemp] = React.useState<string>("38");
  const [notes, setNotes] = React.useState<string>("");
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = React.useState<string>("");

  const storageKey = "HARDWARE_KTV_7STEPS_PROGRESS";

  // Nạp tiến độ từ localStorage
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCheckedSteps(JSON.parse(saved));
      }
    } catch {}
  }, []);

  // Xử lý bật/tắt Checkbox 1-chạm (chống xung đột event)
  const handleToggleStep = (stepId: string) => {
    setCheckedSteps((prev) => {
      const updated = {
        ...prev,
        [stepId]: !prev[stepId],
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Tính toán tiến độ
  const completedCount = Object.values(checkedSteps).filter(Boolean).length;
  const totalSteps = KTV_7_STEPS.length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);
  const isAllCompleted = completedCount === totalSteps;

  const activeStepIndex = KTV_7_STEPS.findIndex((s) => s.id === activeStepId);
  const activeStep = KTV_7_STEPS[activeStepIndex >= 0 ? activeStepIndex : 0];

  const activeCase = DIAGNOSTIC_CASES.find((c) => c.id === selectedCaseId) || DIAGNOSTIC_CASES[1];

  // Chuyển bước kế tiếp
  const handleNextStep = () => {
    if (activeStepIndex < totalSteps - 1) {
      const nextStep = KTV_7_STEPS[activeStepIndex + 1];
      setActiveStepId(nextStep.id);
      setRightViewMode("stepImage");
    }
  };

  // Quay lại bước trước
  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      const prevStep = KTV_7_STEPS[activeStepIndex - 1];
      setActiveStepId(prevStep.id);
      setRightViewMode("stepImage");
    }
  };

  // Xử lý nộp báo cáo
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAllCompleted) {
      alert("Học sinh cần hoàn thành và tick đủ 100% (7/7 bước) trước khi nộp báo cáo!");
      return;
    }

    if (!machineNumber.trim()) {
      alert("Vui lòng nhập Số máy thực hành phòng lab (ví dụ: Máy 08)!");
      return;
    }

    const payload = {
      courseCode: "OL-01_PHAN_CUNG",
      title: "Ôn Luyện Năng Lực Nghề: Kỹ Thuật Viên Phần Cứng PC",
      machineNumber: machineNumber.trim(),
      tableNumber: `Bàn Kỹ Thuật ${tableNumber}`,
      ktvMembers: ktvNames.trim() || `Nhóm KTV Bàn ${tableNumber}`,
      cpuTemperature: `${cpuTemp}°C`,
      progress: progressPercent,
      completedSteps: checkedSteps,
      technicalNotes: notes.trim(),
      checkpointsPassed: {
        checkpoint1: true,
        checkpoint2: true,
        checkpoint3: true,
      },
      submittedAt: new Date().toISOString(),
    };

    console.log("=== [SUPABASE API READY] DỮ LIỆU NỘP BÁO CÁO 7 BƯỚC ===", payload);

    try {
      localStorage.setItem(`HARDWARE_7STEPS_M${machineNumber}`, JSON.stringify(payload));
    } catch {}

    setIsSubmitted(true);
    setSubmitMessage(`Thành công! Biên bản nghiệm thu bàn giao máy ${machineNumber} (Bàn ${tableNumber}) đã được ghi nhận trên hệ thống.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* ==================================================================== */}
        {/* 1. THANH TIÊU ĐỀ & ĐỊNH HƯỚNG SƯ PHẠM NGHỀ                             */}
        {/* ==================================================================== */}
        <Card className="border-slate-200 bg-white shadow-xs">
          <CardHeader className="pb-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-mono text-xs font-black tracking-wider">
                    CHUẨN NGHỀ: OL-01
                  </span>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">
                    Cẩm Nang Kỹ Thuật Viên Máy Tính · Hệ Trung Cấp 9+3 · Đào Tạo Từ Con Số 0
                  </span>
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Quy Trình 7 Bước Thực Chiến: Từ Tiếp Nhận Đến Bàn Giao Máy
                </CardTitle>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Giảng viên hướng dẫn: <strong className="text-slate-800">CN. Phạm Tiến Đông</strong> · Cầm tay chỉ việc 100% tại Bàn Kỹ Thuật · Không bài tập về nhà
                </p>
              </div>

              {/* Tiến độ hoàn thành */}
              <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 min-w-[220px]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <CheckCircle2 className={`w-4 h-4 ${isAllCompleted ? "text-emerald-600" : "text-slate-400"}`} />
                  <span>Tiến độ 7 bước KTV:</span>
                </div>
                <div className="text-xl sm:text-3xl font-black font-mono text-slate-900">
                  {completedCount} / {totalSteps} bước ({progressPercent}%)
                </div>
              </div>
            </div>

            {/* Thanh Progress Bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mt-3 border border-slate-200">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isAllCompleted ? "bg-emerald-600" : "bg-blue-600"
                }`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </CardHeader>

          {/* 3 KHẨU QUYẾT SỐNG CÒN CỦA KTV */}
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="font-extrabold text-amber-900">RÚT – BẤM – KHAY (An toàn điện):</strong>
                  <p className="text-[11px] text-amber-800 mt-0.5">Rút phích điện đen sau máy, bấm nút nguồn 3 lần xả điện tụ, ốc tháo ra bỏ ngay vào khay.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="font-extrabold text-emerald-900">RÃNH KHUYẾT, KHÔNG ẤN CỐ:</strong>
                  <p className="text-[11px] text-emerald-800 mt-0.5">Linh kiện có rãnh chống ngược chiều; cộm tay là xoay lại, tuyệt đối không dùng sức đè.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="font-extrabold text-blue-900">DỮ LIỆU TRƯỚC, MÁY SAU:</strong>
                  <p className="text-[11px] text-blue-800 mt-0.5">Máy hỏng thì sửa được; mất dữ liệu khách là không đền được. Luôn sao lưu Desktop sang ổ D!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ==================================================================== */}
        {/* 2. THANH TAB CHUYỂN ĐỔI CHẾ ĐỘ ÔN LUYỆN (TAB CHÍNH)                  */}
        {/* ==================================================================== */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveMainTab("workflow7")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shrink-0 ${
              activeMainTab === "workflow7"
                ? "bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-2"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>📖 Quy Trình 7 Bước KTV</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab("diagnostics")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shrink-0 ${
              activeMainTab === "diagnostics"
                ? "bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-2"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>⚡ Bản Đồ Bắt Bệnh 60 Giây</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab("components")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shrink-0 ${
              activeMainTab === "components"
                ? "bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-2"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Cpu className="w-4 h-4 text-blue-600" />
            <span>🧩 5 Món Đồ &amp; 4 Sợi Dây</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab("report")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shrink-0 ${
              activeMainTab === "report"
                ? "bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-2"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            <span>📋 Phiếu Nghiệm Thu (3 Điểm Dừng)</span>
          </button>
        </div>

        {/* ==================================================================== */}
        {/* PHÂN HỆ 1: QUY TRÌNH 7 BƯỚC THỰC CHIẾN (IFIXIT SPLIT VIEW)            */}
        {/* ==================================================================== */}
        {activeMainTab === "workflow7" && (
          <div className="space-y-4">
            {/* Dàn nút chuyển nhanh 7 bước */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-slate-500 shrink-0 hidden sm:inline">
                Chuyển bước nhanh:
              </span>
              {KTV_7_STEPS.map((s, idx) => {
                const isCurrent = s.id === activeStepId;
                const isDone = Boolean(checkedSteps[s.id]);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setActiveStepId(s.id);
                      setRightViewMode("stepImage");
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      isCurrent
                        ? "bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-2"
                        : isDone
                        ? "bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[11px] font-black ${
                        isCurrent
                          ? "bg-white text-slate-900"
                          : isDone
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {isDone ? "✓" : idx + 1}
                    </span>
                    <span>{s.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Bố cục 2 cột iFixit */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* CỘT TRÁI (7/12): HƯỚNG DẪN TỪNG BƯỚC */}
              <div className="lg:col-span-7 space-y-4">
                <Accordion
                  type="single"
                  collapsible
                  value={activeStepId}
                  onValueChange={(val) => {
                    if (val) {
                      setActiveStepId(val);
                      setRightViewMode("stepImage");
                    }
                  }}
                  className="w-full space-y-3"
                >
                  {KTV_7_STEPS.map((step) => {
                    const isStepDone = !!checkedSteps[step.id];

                    return (
                      <AccordionItem
                        key={step.id}
                        value={step.id}
                        className={`border rounded-2xl bg-white shadow-2xs overflow-hidden transition-all ${
                          activeStepId === step.id
                            ? "border-slate-900 ring-1 ring-slate-900"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <AccordionTrigger className="px-4 sm:px-5 py-4 hover:no-underline text-left cursor-pointer">
                          <div className="flex items-start gap-3 w-full pr-2">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-sm shrink-0 transition-colors ${
                                isStepDone
                                  ? "bg-emerald-600 text-white"
                                  : activeStepId === step.id
                                  ? "bg-slate-900 text-white"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {isStepDone ? "✓" : step.stepNumber}
                            </div>

                            <div className="space-y-1 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                                  {step.role}
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  ⏱️ {step.timeEstimate}
                                </span>
                                {step.checkpoint && (
                                  <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[11px] font-black border border-rose-200">
                                    🛑 {step.checkpoint.code}
                                  </span>
                                )}
                              </div>
                              <div className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                                {step.title}
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="px-4 sm:px-5 pb-5 pt-1 space-y-4 text-slate-700 border-t border-slate-100">
                          {/* Điểm dừng an toàn Poka-Yoke (nếu có) */}
                          {step.checkpoint && (
                            <div className="p-3.5 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-950 space-y-1 shadow-2xs">
                              <div className="flex items-center gap-2 font-black text-xs text-rose-900 uppercase">
                                <ShieldAlert className="w-4 h-4 text-rose-600" />
                                <span>{step.checkpoint.code}: {step.checkpoint.name}</span>
                              </div>
                              <p className="text-xs sm:text-sm leading-relaxed pl-6 font-semibold">
                                {step.checkpoint.requirement}
                              </p>
                            </div>
                          )}

                          {/* Danh sách hành động chi tiết */}
                          <div className="space-y-2 pt-1">
                            <div className="text-xs font-black uppercase text-slate-500 tracking-wider">
                              Thao tác tay bắt buộc làm tại bàn:
                            </div>
                            <ul className="space-y-2 text-sm leading-relaxed">
                              {step.instructions.map((ins, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0"></span>
                                  <span>{ins}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Ví von đời thường */}
                          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 space-y-1">
                            <div className="flex items-center gap-1.5 text-xs font-black">
                              <Lightbulb className="w-4 h-4 text-amber-600" />
                              <span>Ví von đời thường dễ nhớ:</span>
                            </div>
                            <p className="text-xs sm:text-sm leading-relaxed pl-5">
                              {step.analogy}
                            </p>
                          </div>

                          {/* Cảnh báo Poka-Yoke */}
                          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 space-y-1">
                            <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                              <AlertTriangle className="w-4 h-4 text-slate-700" />
                              <span>LƯU Ý POKA-YOKE (CHỐNG LÀM SAI):</span>
                            </div>
                            <p className="text-xs sm:text-sm leading-relaxed pl-5 font-medium">
                              {step.pokaYoke}
                            </p>
                          </div>

                          {/* Ghi chú thị trường (nếu có) */}
                          {step.marketNote && (
                            <div className="p-3 rounded-xl bg-slate-900 text-slate-200 text-xs space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Mở rộng thị trường:</span>
                              </div>
                              <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed pl-5">
                                {step.marketNote}
                              </p>
                            </div>
                          )}

                          {/* NÚT CHECKBOX XÁC NHẬN AN TOÀN 1-CHẠM */}
                          <div className="pt-2">
                            <div
                              role="button"
                              tabIndex={0}
                              onClick={() => handleToggleStep(step.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  handleToggleStep(step.id);
                                }
                              }}
                              className={`w-full min-h-[48px] p-3.5 rounded-xl border-2 flex items-center justify-between gap-3 transition-all cursor-pointer select-none active:scale-[0.99] ${
                                isStepDone
                                  ? "bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs"
                                  : "bg-white border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                                    isStepDone
                                      ? "bg-emerald-600 border-emerald-600 text-white"
                                      : "border-slate-300 bg-white"
                                  }`}
                                >
                                  {isStepDone && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                                </div>
                                <span className="text-xs sm:text-sm font-bold text-left">
                                  Em đã hoàn thành và kiểm tra an toàn bước này
                                </span>
                              </div>

                              <span
                                className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md shrink-0 ${
                                  isStepDone
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {isStepDone ? "✓ ĐÃ NGHIỆM THU" : "CHƯA TICK"}
                              </span>
                            </div>
                          </div>

                          {/* Điều hướng tuần tự */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={step.stepNumber === 1}
                              onClick={handlePrevStep}
                              className="text-slate-600 hover:text-slate-900 cursor-pointer"
                            >
                              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                              <span>Bước {step.stepNumber - 1}</span>
                            </Button>

                            {step.stepNumber < totalSteps ? (
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={handleNextStep}
                                className="bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer"
                              >
                                <span>Sang Bước {step.stepNumber + 1}</span>
                                <ArrowRight className="w-3.5 h-3.5 ml-1" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => setActiveMainTab("report")}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer"
                              >
                                <span>Nộp Biên Bản Bàn Giao</span>
                                <ChevronRight className="w-3.5 h-3.5 ml-1" />
                              </Button>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>

              {/* CỘT PHẢI (5/12): MINH HỌA TRỰC QUAN & SƠ ĐỒ BO MẠCH H510 */}
              <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-slate-900" />
                    <h3 className="text-base font-black text-slate-900">
                      Minh Họa Trực Quan Phòng Lab
                    </h3>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setZoomedImage({
                        src: rightViewMode === "interactive" ? "/images/ol-01/main-h510.jpg" : activeStep.imageSrc,
                        alt: rightViewMode === "interactive" ? "Sơ đồ bo mạch H510" : activeStep.imageAlt,
                        title: rightViewMode === "interactive" ? "Sơ Đồ Bo Mạch MSI H510M-A PRO" : activeStep.title,
                      })
                    }
                    className="flex items-center gap-1.5 text-xs font-bold border-slate-300 h-8 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Phóng to máy chiếu</span>
                  </Button>
                </div>

                {/* Chuyển tab xem */}
                <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold w-full">
                  <button
                    type="button"
                    onClick={() => setRightViewMode("interactive")}
                    className={`flex-1 py-2 rounded-lg transition-all text-center cursor-pointer ${
                      rightViewMode === "interactive"
                        ? "bg-white text-slate-900 shadow-xs font-black"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    🗺️ Sơ Đồ Bo Mạch H510 (Hotspot)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRightViewMode("stepImage")}
                    className={`flex-1 py-2 rounded-lg transition-all text-center cursor-pointer ${
                      rightViewMode === "stepImage"
                        ? "bg-white text-slate-900 shadow-xs font-black"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    📷 Ảnh Bước {activeStep.stepNumber}
                  </button>
                </div>

                {/* Khung hiển thị Card */}
                <Card className="border-slate-200 bg-white overflow-hidden shadow-xs">
                  <CardContent className="p-3 sm:p-4 space-y-3">
                    {rightViewMode === "interactive" ? (
                      <div className="space-y-3">
                        <div className="relative w-full aspect-[1010/889] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-inner group">
                          <Image
                            src="/images/ol-01/main-h510.jpg"
                            alt="Sơ đồ tương tác bo mạch chủ MSI H510M-A PRO Socket LGA1200"
                            fill
                            className="object-contain p-2"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            priority
                          />

                          {/* 5 Hotspots */}
                          {H510_HOTSPOTS.map((spot) => {
                            const isSelected = selectedHotspot.id === spot.id;
                            return (
                              <div
                                key={spot.id}
                                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                                style={{ top: spot.top, left: spot.left }}
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedHotspot(spot);
                                    setActiveStepId(spot.stepId);
                                  }}
                                  onMouseEnter={() => setSelectedHotspot(spot)}
                                  className={`relative flex items-center justify-center w-8 h-8 rounded-full focus:outline-none cursor-pointer transition-transform ${
                                    isSelected ? "scale-125 ring-4 ring-slate-900/30" : "hover:scale-110"
                                  }`}
                                  title={`Chạm xem ${spot.title}`}
                                >
                                  <span className={`animate-ping absolute inline-flex h-7 w-7 rounded-full opacity-75 ${spot.color}`}></span>
                                  <span className={`relative inline-flex items-center justify-center rounded-full h-6 w-6 text-white text-[11px] font-black shadow-md border-2 border-white ${spot.color}`}>
                                    {spot.title.charAt(0)}
                                  </span>
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        {/* Hộp thông tin Hotspot ghim cố định */}
                        <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-2 border border-slate-700 shadow-md">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <div className="font-extrabold text-sm text-emerald-400">
                              {selectedHotspot.title}
                            </div>
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 font-bold">
                              {selectedHotspot.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {selectedHotspot.description}
                          </p>
                          <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-800/80 text-rose-200 text-[11px] leading-relaxed">
                            <strong>⚠️ Poka-Yoke:</strong> {selectedHotspot.pokaYoke}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">
                            Bước {activeStep.stepNumber}: {activeStep.title}
                          </span>
                          <span className="font-mono text-slate-500 text-[11px]">
                            Ảnh thật phòng máy
                          </span>
                        </div>

                        <div
                          onClick={() =>
                            setZoomedImage({
                              src: activeStep.imageSrc,
                              alt: activeStep.imageAlt,
                              title: activeStep.title,
                            })
                          }
                          className="relative w-full aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs cursor-pointer group"
                        >
                          <Image
                            src={activeStep.imageSrc}
                            alt={activeStep.imageAlt}
                            fill
                            className="object-contain p-2 group-hover:scale-102 transition-transform duration-300"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                          />
                        </div>

                        <p className="text-xs text-slate-500 italic text-center">
                          {activeStep.imageAlt}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* PHÂN HỆ 2: BẢN ĐỒ BẮT BỆNH 60 GIÂY (CHẨN ĐOÁN TRỰC QUAN)             */}
        {/* ==================================================================== */}
        {activeMainTab === "diagnostics" && (
          <div className="space-y-6">
            <Card className="border-slate-200 bg-white shadow-xs">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span>Bản Đồ Bắt Bệnh 60 Giây: Cứu Sống Máy Không Lên Hình</span>
                </CardTitle>
                <p className="text-xs text-slate-500">
                  85% máy tính phòng thực hành không hoạt động là do lỏng dây hoặc bẩn chân RAM. Chọn đúng triệu chứng mắt thấy để xem hướng dẫn:
                </p>
              </CardHeader>

              <CardContent className="pt-4 space-y-6">
                {/* 5 Phím chọn ca bệnh */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                  {DIAGNOSTIC_CASES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCaseId(c.id)}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                        selectedCaseId === c.id
                          ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900 ring-offset-2"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                      }`}
                    >
                      <div className="font-mono text-xs font-black mb-1 opacity-70">
                        {c.name.split(":")[0]}
                      </div>
                      <div className="font-extrabold text-xs sm:text-sm line-clamp-2">
                        {c.name.split(":")[1]}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Hộp chi tiết xử lý ca bệnh đang chọn */}
                <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-700 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="space-y-0.5">
                      <span className="text-amber-400 font-mono text-xs font-black tracking-wide">
                        CHẨN ĐOÁN KỸ THUẬT VIÊN
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-white">
                        {activeCase.name}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono font-bold border border-slate-700">
                      Dụng cụ: {activeCase.tool}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                      <div className="font-bold text-amber-400 uppercase tracking-wide text-xs">
                        Triệu chứng mắt thấy:
                      </div>
                      <p className="text-slate-300 leading-relaxed font-medium">
                        {activeCase.symptom}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                      <div className="font-bold text-rose-400 uppercase tracking-wide text-xs">
                        Nguyên nhân gốc (Thủ phạm):
                      </div>
                      <p className="text-slate-300 leading-relaxed font-medium">
                        {activeCase.rootCause}
                      </p>
                    </div>
                  </div>

                  {/* Các bước xử lý chi tiết */}
                  <div className="space-y-2 pt-2">
                    <div className="font-black text-xs uppercase tracking-wider text-emerald-400">
                      Các bước tay em làm để cứu sống máy trong 3 phút:
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                      {activeCase.quickFix.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 leading-relaxed bg-slate-800/40 p-2.5 rounded-xl border border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ==================================================================== */}
        {/* PHÂN HỆ 3: 5 MÓN ĐỒ & 4 SỢI DÂY (GIẢI MÃ THÙNG MÁY TRONG 5 PHÚT)     */}
        {/* ==================================================================== */}
        {activeMainTab === "components" && (
          <div className="space-y-6">
            <Card className="border-slate-200 bg-white shadow-xs">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  <span>Giải Mã Thùng Máy Trong 5 Phút: 5 Món Đồ Lớn &amp; 4 Sợi Dây</span>
                </CardTitle>
                <p className="text-xs text-slate-500">
                  Đừng sợ thùng máy nhiều dây! Máy tính giống như bộ xếp hình Lego: Chỉ có 5 món đồ lớn và 4 vị trí cắm dây sống còn.
                </p>
              </CardHeader>

              <CardContent className="pt-4 space-y-6">
                {/* 5 MÓN ĐỒ LỚN */}
                <div className="space-y-3">
                  <h4 className="font-black text-sm uppercase tracking-wide text-slate-700">
                    1. Năm (05) món đồ lớn nhìn bằng mắt thường:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      {
                        title: "1. Cục Nguồn (PSU)",
                        sub: "Trái tim bơm điện",
                        desc: "Hộp sắt vuông to ở góc thùng máy có chùm dây thò ra. Công tắc sau lưng: bật sang 'I' là có điện, 'O' là tắt điện.",
                        bad: "Công tắc ở 'O' hoặc đứt dây làm máy im re.",
                      },
                      {
                        title: "2. Bo Mạch Chủ (Mainboard)",
                        sub: "Nền nhà & đường đi",
                        desc: "Tấm bảng to nhất áp sát vách máy. Giữa bảng in chữ trắng to (H510, H410...). Có viên pin đồng xu CMOS CR2032 nuôi đồng hồ.",
                        bad: "Cháy tụ, hết pin CMOS làm sai ngày giờ.",
                      },
                      {
                        title: "3. CPU & Quạt Tản Nhiệt",
                        sub: "Bộ não tính toán",
                        desc: "Miếng kim loại vuông nhỏ dưới đáy quạt. Giữa lưng CPU và đáy quạt có lớp keo tản nhiệt xám. Quạt cắm chân CPU_FAN.",
                        bad: "Khô keo, kẹt quạt làm máy nóng tự tắt.",
                      },
                      {
                        title: "4. Thanh RAM (DDR4 8GB)",
                        sub: "Mặt bàn làm việc",
                        desc: "Thanh mạch dài bằng ngón tay cái, chân vàng mạ đồng, rãnh khuyết lệch một bên và 2 tai khóa ở 2 đầu khe cắm.",
                        bad: "Bẩn chân vàng làm màn hình đen (80% ca bệnh).",
                      },
                      {
                        title: "5. Ổ Cứng SSD 128/256GB",
                        sub: "Tủ cất hồ sơ",
                        desc: "Hộp mỏng nhẹ bằng bàn tay chứa Windows 10 và toàn bộ tài liệu của khách. Đít ổ có 2 khe cắm hình chữ L.",
                        bad: "Cấm làm rơi và cấm format nhầm ổ chứa dữ liệu.",
                      },
                      {
                        title: "Card Đồ Họa Rời GT 730",
                        sub: "Cửa sổ xuất hình",
                        desc: "Card màn hình rời NVIDIA GT 730 2GB cắm vào khe PCIe x16. BẮT BUỘC cắm dây màn hình vào card này mới lên hình.",
                        bad: "Cắm nhầm dây lên cổng Mainboard làm màn đen.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-extrabold text-sm text-slate-900">{item.title}</div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">{item.sub}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                        <div className="text-[11px] text-rose-700 font-semibold pt-1">
                          ⚠️ Hay lỗi: {item.bad}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4 SỢI DÂY SỐNG CÒN */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <h4 className="font-black text-sm uppercase tracking-wide text-slate-700">
                    2. Bốn (04) sợi dây duy nhất em cần biết cắm:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        name: "Dây 1: Cấp nguồn 24 chân (To nhất)",
                        pin: "24 lỗ",
                        plug: "Cắm vào ổ 24 lỗ ở mép phải bo mạch Mainboard.",
                        warn: "Quên cắm là máy không lên điện.",
                      },
                      {
                        name: "Dây 2: Cấp nguồn CPU 4/8 chân",
                        pin: "4 hoặc 8 lỗ vuông (Vàng-Đen)",
                        plug: "Cắm vào ổ góc trên cùng, sát cạnh quạt CPU.",
                        warn: "Quên cắm là quạt quay mà máy không lên hình!",
                      },
                      {
                        name: "Dây 3: Cặp dây chữ L ở đít Ổ cứng",
                        pin: "1 dây nguồn dẹt + 1 cáp SATA nhỏ",
                        plug: "Cắm khớp khe chữ L đít ổ; đầu cáp nhỏ nối xuống cổng SATA bo mạch.",
                        warn: "Quên cắm là báo lỗi No Bootable Device.",
                      },
                      {
                        name: "Dây 4: Dây nút bấm mở máy (POWER SW)",
                        pin: "Đầu nhựa nhỏ chữ POWER SW",
                        plug: "Cắm vào ĐÚNG 2 chân kim sát cạnh chỗ trống mất kim trên cụm F_PANEL.",
                        warn: "Cắm sai là bấm nút mở máy ngoài vỏ không phản ứng.",
                      },
                    ].map((wire, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs sm:text-sm text-slate-900">{wire.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">{wire.pin}</span>
                        </div>
                        <p className="text-xs text-slate-600">{wire.plug}</p>
                        <div className="text-[11px] text-amber-700 font-medium">⚠️ {wire.warn}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ==================================================================== */}
        {/* PHÂN HỆ 4: PHIẾU NGHIỆM THU BÀN GIAO & NỘP BÁO CÁO (3 ĐIỂM DỪNG)      */}
        {/* ==================================================================== */}
        {activeMainTab === "report" && (
          <div className="space-y-6">
            <Card className="border-slate-200 bg-white shadow-xs">
              <CardHeader className="pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-slate-900" />
                    <CardTitle className="text-lg sm:text-xl font-black text-slate-900">
                      Phiếu Công Tác Kỹ Thuật Viên Máy Tính (Quy Trình 7 Bước)
                    </CardTitle>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black font-mono ${
                      isAllCompleted
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-amber-100 text-amber-800 border border-amber-300"
                    }`}
                  >
                    {isAllCompleted ? "✓ ĐỦ ĐIỀU KIỆN NỘP" : `CÒN THIẾU ${totalSteps - completedCount} BƯỚC`}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Nhập mã số máy thực hành phòng lab (01 - 36), thông số đo nhiệt độ tải HWMonitor và thông tin nhóm KTV để hoàn thiện hồ sơ nghề.
                </p>
              </CardHeader>

              <CardContent className="pt-5">
                {/* 3 ĐIỂM DỪNG POKA-YOKE TỔNG HỢP */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 mb-6 text-xs">
                  <div className="font-extrabold text-slate-900 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-emerald-600" />
                    <span>3 ĐIỂM DỪNG AN TOÀN BẮT BUỘC ĐÃ ĐƯỢC THẦY NGHIỆM THU:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-700">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <strong className="text-rose-700">Điểm dừng 1:</strong> Đã sao lưu đủ số file ổ C sang D; đã rút điện và bấm xả điện 3 lần.
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <strong className="text-amber-700">Điểm dừng 2:</strong> 2 ngàm RAM đã khóa; dây quạt cắm CPU_FAN; không rơi ốc trên mạch.
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <strong className="text-emerald-700">Điểm dừng 3:</strong> Device Manager sạch chấm than; nhiệt độ CPU &lt;75°C; dữ liệu còn 100%.
                    </div>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-black text-emerald-950">
                      {submitMessage}
                    </h4>
                    <p className="text-xs text-emerald-800 max-w-md mx-auto">
                      Dữ liệu đã được nạp vào LocalStorage và sẵn sàng đồng bộ lên hệ thống cơ sở dữ liệu Supabase của giảng viên.
                    </p>
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsSubmitted(false)}
                        className="border-emerald-300 text-emerald-900 hover:bg-emerald-100 cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4 mr-1.5" />
                        Chỉnh sửa hoặc Nộp lại
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReport} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Số máy */}
                      <div className="space-y-1.5">
                        <Label htmlFor="machine-num" className="text-xs font-bold text-slate-800">
                          Số Máy Thực Hành <span className="text-rose-600">*</span>
                        </Label>
                        <Input
                          id="machine-num"
                          placeholder="Ví dụ: Máy 08 (từ 01 - 36)"
                          value={machineNumber}
                          onChange={(e) => setMachineNumber(e.target.value)}
                          required
                          className="border-slate-300 text-sm h-11"
                        />
                      </div>

                      {/* Bàn kỹ thuật */}
                      <div className="space-y-1.5">
                        <Label htmlFor="tbl-num" className="text-xs font-bold text-slate-800">
                          Bàn Kỹ Thuật (01 - 10)
                        </Label>
                        <select
                          id="tbl-num"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                        >
                          {Array.from({ length: 10 }, (_, i) => {
                            const num = String(i + 1).padStart(2, "0");
                            return (
                              <option key={num} value={num}>
                                Bàn Kỹ Thuật {num} (3 KTV)
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      {/* Nhiệt độ CPU */}
                      <div className="space-y-1.5">
                        <Label htmlFor="cpu-temp" className="text-xs font-bold text-slate-800">
                          Nhiệt Độ CPU Test Tải (°C)
                        </Label>
                        <Input
                          id="cpu-temp"
                          placeholder="Ví dụ: 38 (dưới 75°C là đạt)"
                          value={cpuTemp}
                          onChange={(e) => setCpuTemp(e.target.value)}
                          className="border-slate-300 text-sm h-11"
                        />
                      </div>
                    </div>

                    {/* Tên KTV */}
                    <div className="space-y-1.5">
                      <Label htmlFor="ktv-list" className="text-xs font-bold text-slate-800">
                        Họ Tên Nhóm KTV (KTV 1 - Cơ khí, KTV 2 - An toàn, KTV 3 - Báo cáo)
                      </Label>
                      <Input
                        id="ktv-list"
                        placeholder="Nguyễn Văn A (KTV 1), Trần Thị B (KTV 2), Lê Văn C (KTV 3)"
                        value={ktvNames}
                        onChange={(e) => setKtvNames(e.target.value)}
                        className="border-slate-300 text-sm h-11"
                      />
                    </div>

                    {/* Ghi chú */}
                    <div className="space-y-1.5">
                      <Label htmlFor="tech-notes" className="text-xs font-bold text-slate-800">
                        Ghi Chú Kết Quả Nghiệm Thu (KTV 3 Lập)
                      </Label>
                      <textarea
                        id="tech-notes"
                        rows={2}
                        placeholder="Ví dụ: Máy POST nhanh trong 4s, BIOS nhận đủ 8192MB DDR4 Bus 2666, Device Manager sạch chấm than, đã in Test Page máy in thành công."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    {/* Nút Submit */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-xs text-slate-500">
                        {isAllCompleted ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            ✓ Học sinh đã tick đủ 7/7 bước. Nút nộp báo cáo đã được mở khóa!
                          </span>
                        ) : (
                          <span className="text-amber-700 font-medium">
                            ⚠️ Cần tick xác nhận đủ 7 bước ở tab 'Quy Trình 7 Bước KTV' để mở khóa nút nộp bài.
                          </span>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={!isAllCompleted}
                        size="touch"
                        className={`min-h-[48px] px-8 text-base font-black shadow-md transition-all ${
                          isAllCompleted
                            ? "bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        <span>Nộp Báo Cáo Nghiệm Thu 7 Bước</span>
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* ==================================================================== */}
      {/* 4. MODAL PHÓNG TO ẢNH MÁY CHIẾU (PROJECTOR LIGHTBOX)                 */}
      {/* ==================================================================== */}
      {zoomedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-5xl w-full p-6 space-y-4 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-5 h-5 text-slate-900" />
                <h3 className="text-lg font-black text-slate-900">
                  {zoomedImage.title}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setZoomedImage(null)}
                className="rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="relative w-full h-[65vh] bg-white rounded-2xl overflow-hidden border border-slate-200">
              <Image
                src={zoomedImage.src}
                alt={zoomedImage.alt}
                fill
                className="object-contain p-2"
                sizes="90vw"
                priority
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-mono">
                Chuẩn trình chiếu độ phân giải cao cho phòng thực hành máy tính
              </span>
              <Button
                size="touch"
                onClick={() => setZoomedImage(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer"
              >
                Đóng Chế Độ Chiếu
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
