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
  ZoomIn,
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
    imageSrc: "/images/ol-01/step-1-kham-may.jpg",
    imageAlt: "Khám ngoại quan case PC phòng lab, cắm nguồn AC và phân biệt cổng xuất hình GT 730",
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
    imageSrc: "/images/ol-01/step-2-cuu-du-lieu-win10.jpg",
    imageAlt: "Windows 10 File Explorer copy Desktop sang ổ D: SAO_LUU_KHACH, đếm số file Properties",
    hotspotTarget: "sata-m2",
    instructions: [
      "Xác định 3 vị trí sống còn: Toàn bộ file Word, Excel, ảnh quan trọng của khách nằm ở Desktop, Documents và Downloads (đều thuộc Ổ ĐĨA C).",
      "Nếu máy còn vào được Windows: Bấm chuột phải vào thư mục tài liệu ngoài Desktop -> chọn Properties ghi lại số Files và số MB. Mở ổ D tạo thư mục SAO_LUU_KHACH rồi COPY (tuyệt đối không Cut) toàn bộ dữ liệu sang.",
      "Nếu máy hỏng Windows: Cắm USB Cứu hộ WinPE -> Bật máy bấm liên tục phím Boot Menu (MSI & Winnfox: F11 | ASUS: F8) chọn dòng 'UEFI: Tên USB' -> Vào WinPE mở ổ C:Users Desktop copy hết sang ổ D.",
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
    imageSrc: "/images/ol-01/step-3-cha-ram-cuc-tay.jpg",
    imageAlt: "Cận cảnh dùng cục tẩy trắng gôm học sinh chà sạch chân mạ vàng thanh RAM DDR4",
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
    imageSrc: "/images/ol-01/step-4-tra-keo-hat-dau-xanh.jpg",
    imageAlt: "Tra đúng 01 giọt keo tản nhiệt hạt đậu xanh vào giữa CPU và vặn 4 chốt đối xứng đường chéo",
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
    imageSrc: "/images/ol-01/step-5-cai-win10-partition.jpg",
    imageAlt: "Giao diện phân vùng Windows 10 Setup quy tắc nhìn số GB chọn ổ C và Device Manager sạch chấm than",
    instructions: [
      "Boot từ USB cài Windows: Cắm USB -> Bật máy bấm liên tục phím Boot Menu (MSI & Winnfox: F11 | ASUS: F8) -> Chọn dòng 'UEFI: Tên USB' -> Bấm Enter.",
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
    imageSrc: "/images/ol-01/step-6-may-in-test-page.jpg",
    imageAlt: "Windows 10 Devices and Printers máy in mặc định dấu tích xanh và in trang Print Test Page",
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
    imageSrc: "/images/ol-01/step-7-hwmonitor-nhiet-do.jpg",
    imageAlt: "Đo nhiệt độ CPU bằng HWMonitor mát 38°C và hoàn tất biên bản nghiệm thu bàn giao 5 tiêu chí",
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
 * 5 Ca bệnh 60s
 */
interface DiagnosticCase {
  id: string;
  name: string;
  symptom: string;
  rootCause: string;
  quickFix: string[];
  tool: string;
  imageSrc: string;
  imageAlt: string;
}

const DIAGNOSTIC_CASES: DiagnosticCase[] = [
  {
    id: "case-1",
    name: "Ca 1: Máy Im Re (Không Điện)",
    symptom: "Bấm nút nguồn mà máy im lìm 100%: Quạt không quay, đèn không sáng.",
    rootCause: "Điện chưa vào được máy, công tắc nguồn tắt hoặc tuột dây nút bấm POWER SW.",
    imageSrc: "/images/ol-01/diag-case-1-fpanel-power.jpg",
    imageAlt: "Kích nguồn bằng đầu tua vít vào 2 chân kim POWER SW trên cụm F_PANEL bo mạch H510",
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
    imageSrc: "/images/ol-01/diag-case-2-ram-vga.jpg",
    imageAlt: "Tuyệt chiêu chà tẩy trắng chân mạ vàng thanh RAM DDR4 cứu 80% máy lỗi",
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
    imageSrc: "/images/ol-01/diag-case-3-sata-boot.jpg",
    imageAlt: "Cáp dữ liệu SATA lẫy kim loại và cáp nguồn dẹt chữ L cắm vào đít ổ SSD",
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
    imageSrc: "/images/ol-01/diag-case-4-pin-cmos.jpg",
    imageAlt: "Viên pin đồng xu nuôi đồng hồ CMOS CR2032 3V trên bo mạch chủ H510",
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
    imageSrc: "/images/ol-01/diag-case-5-cpu-overheat.jpg",
    imageAlt: "Tra keo tản nhiệt hạt đậu xanh và gắn chặt 4 chốt quạt CPU_FAN đối xứng chéo",
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
 * 3 Dòng Bo Mạch Chủ H510 Thực Tế Phòng Máy (MSI · ASUS · WINNFOX) & Bản Đồ So Sánh
 */
interface MotherboardModel {
  id: "msi" | "asus" | "winnfox" | "compare";
  name: string;
  brand: string;
  badge: string;
  color: string;
  imageSrc: string;
  imageAlt: string;
  bootKey: string;
  biosKey: string;
  debugMethod: string;
  ramLatchType: string;
  fpanelLabel: string;
  ktvTip: string;
  specs: {
    socket: string;
    ram: string;
    pcie: string;
    storage: string;
    videoOut: string;
  };
}

const LAB_MOTHERBOARDS: MotherboardModel[] = [
  {
    id: "msi",
    name: "MSI H510M-A PRO",
    brand: "MSI (Micro-Star International)",
    badge: "Phòng Lab · Chuẩn Phổ Biến #1",
    color: "rose",
    imageSrc: "/images/ol-01/main-h510.jpg",
    imageAlt: "Bo mạch chủ MSI H510M-A PRO Socket LGA1200",
    bootKey: "F11",
    biosKey: "Delete (Del)",
    debugMethod: "EZ Debug LED (4 đèn CPU - DRAM - VGA - BOOT góc trên phải)",
    ramLatchType: "1-Side Latch (1 ngàm trên gạt, ngàm dưới cố định)",
    fpanelLabel: "Cụm JFP1 (Chuẩn 9 chân kim quốc tế)",
    ktvTip: "Khi máy không lên hình, nhìn ngay cụm 4 đèn EZ Debug LED: đèn dừng ở linh kiện nào thì xử lý ngay chỗ đó (dừng ở DRAM = vệ sinh chân RAM).",
    specs: {
      socket: "LGA1200 (Intel Core Gen 10 & 11)",
      ram: "2 khe DDR4 tối đa 64GB, Bus 2666/2933/3200MHz",
      pcie: "1 khe PCIe 4.0/3.0 x16 bọc thép Steel Armor + 1 khe PCIe 3.0 x1",
      storage: "1 khe M.2 NVMe PCIe 3.0 x4 + 4 cổng SATA III 6Gb/s",
      videoOut: "HDMI 2.0b & VGA D-Sub",
    },
  },
  {
    id: "asus",
    name: "ASUS PRIME H510M-K",
    brand: "ASUS (ASUSTeK Computer)",
    badge: "Phòng Lab · Siêu Bền 5X Protection",
    color: "blue",
    imageSrc: "/images/ol-01/main-asus-h510.jpg",
    imageAlt: "Bo mạch chủ ASUS PRIME H510M-K Socket LGA1200",
    bootKey: "F8 (Đặc trưng ASUS - Tuyệt đối không bấm F11)",
    biosKey: "Delete (Del) hoặc F2",
    debugMethod: "Q-LED Core (Nháy nhịp đèn Power) / Chân cắm Loa Buzzer SPEAKER",
    ramLatchType: "Q-DIMM (Ngàm gạt 1 đầu chống kẹt đuôi card đồ họa)",
    fpanelLabel: "Cụm PANEL (10-1 chân kim có in rõ sơ đồ)",
    ktvTip: "Khi boot USB cứu hộ WinPE hoặc cài Win, BẮT BUỘC bấm phím F8. Học sinh quen tay bấm F11 của MSI sẽ không hiện Boot Menu trên main ASUS!",
    specs: {
      socket: "LGA1200 (Intel Core Gen 10 & 11)",
      ram: "2 khe DDR4 tối đa 64GB, công nghệ OptiMem",
      pcie: "1 khe PCIe 4.0/3.0 x16 SafeSlot Core chịu lực + 1 khe PCIe 3.0 x1",
      storage: "1 khe M.2 PCIe 3.0 x4 32Gbps + 4 cổng SATA III 6Gb/s",
      videoOut: "HDMI 1.4b & D-Sub (VGA)",
    },
  },
  {
    id: "winnfox",
    name: "WINNFOX H510G / PRO D4",
    brand: "Winnfox (Efang Intelligent Technology)",
    badge: "Phòng Lab · Tối Ưu Chi Phí Nghề",
    color: "emerald",
    imageSrc: "/images/ol-01/main-winnfox-h510.jpg",
    imageAlt: "Bo mạch chủ Winnfox H510G Socket LGA1200 giá rẻ phổ thông",
    bootKey: "F11 (hoặc F7 ở một số bản AMI BIOS)",
    biosKey: "Delete (Del)",
    debugMethod: "BẮT BUỘC cắm Loa Buzzer vào chân J_SPEAKER để nghe mã tiếng bíp",
    ramLatchType: "2 ngàm gạt truyền thống ở 2 đầu khe RAM",
    fpanelLabel: "Cụm F_PANEL (9 chân kim in chữ rõ nét)",
    ktvTip: "Mainboard Winnfox không trang bị dàn đèn EZ Debug, nên KTV bắt buộc phải cắm Loa Buzzer (Loa bíp) vào chân Speaker để bắt bệnh qua tiếng bíp.",
    specs: {
      socket: "LGA1200 (Intel Core Gen 10 & 11)",
      ram: "2 khe DDR4 tối đa 64GB, Bus 2400/2666/3200MHz",
      pcie: "1 khe PCIe 3.0 x16 + 1 khe PCIe x1",
      storage: "1 khe M.2 NVMe/SATA + 4 cổng SATA III 6Gb/s",
      videoOut: "HDMI & VGA D-Sub",
    },
  },
  {
    id: "compare",
    name: "Bản Đồ So Sánh 3 Main (MSI · ASUS · WINNFOX)",
    brand: "Bảng Đối Chiếu 3 Dòng Bo Mạch H510 Thực Tế Phòng Máy",
    badge: "Infographic Độc Quyền KTV",
    color: "amber",
    imageSrc: "/images/ol-01/main-h510-compare.jpg",
    imageAlt: "Bảng so sánh 3 dòng Mainboard H510 MSI vs ASUS vs Winnfox phòng lab",
    bootKey: "MSI: F11 | ASUS: F8 | Winnfox: F11/F7",
    biosKey: "Tất cả đều vào BIOS bằng phím Delete (Del)",
    debugMethod: "MSI: 4 Đèn EZ Debug | ASUS: Q-LED & Buzzer | Winnfox: Loa Buzzer bíp",
    ramLatchType: "MSI & ASUS: 1 lẫy trên | Winnfox: 2 lẫy hai đầu",
    fpanelLabel: "MSI: JFP1 | ASUS: PANEL | Winnfox: F_PANEL",
    ktvTip: "Ghi nhớ bảng đối chiếu này giúp học viên KTV làm chủ mọi bàn kỹ thuật trong phòng máy thực hành mà không bị lúng túng khi đổi máy!",
    specs: {
      socket: "Đều sử dụng Socket LGA1200 cho CPU Intel Gen 10 & 11",
      ram: "Đều hỗ trợ 2 khe RAM DDR4 Bus 2666 / 3200MHz",
      pcie: "Đều có 1 khe PCIe x16 cho card màn hình rời GT 730",
      storage: "Đều có khe M.2 SSD tốc độ cao và 4 cổng SATA III",
      videoOut: "Đều hỗ trợ xuất hình qua cổng HDMI và VGA",
    },
  },
];

/**
 * 5 Điểm Hotspot trên Bo Mạch H510 (Có thể áp dụng cho các dòng Mainboard Socket LGA1200)
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

/**
 * Kiểu dữ liệu cho bước Tháo & Lắp máy cơ khí KTV
 */
interface MechanicalStep {
  id: string;
  stepNumber: number;
  title: string;
  shortName: string;
  tool: string;
  action: string;
  commonMistakes: string[];
  pokaYoke: string;
  imageSrc: string;
  imageAlt: string;
}

/**
 * 6 BƯỚC THÁO MÁY CHUẨN AN TOÀN ĐIỆN & CƠ KHÍ
 */
const DISASSEMBLY_STEPS: MechanicalStep[] = [
  {
    id: "dis-1",
    stepNumber: 1,
    title: "Ngắt Nguồn Điện 220V & Xả Tụ An Toàn",
    shortName: "Rút Điện & Xả Tụ",
    tool: "Tay trần, dây tiếp địa hoặc chạm tay vào vỏ kim loại case máy",
    action: "Rút hoàn toàn phích cắm điện nguồn 220V khỏi ổ điện. Nhấn và giữ nút Power trên case trong 10 giây (hoặc bấm liên tục 3-5 lần) để các tụ điện trên bo mạch xả hết dòng điện dư thừa. Chạm tay vào vỏ kim loại case để triệt tiêu tĩnh điện cơ thể (chống sốc tĩnh điện ESD).",
    commonMistakes: [
      "Quên rút phích cắm mà chỉ tắt công tắc ổ cắm, nguồn vẫn còn dòng chờ 5VSB.",
      "Rút điện xong vội vàng tháo linh kiện ngay khi tụ nguồn còn tích điện, gây sốc điện nổ chip BIOS hoặc IC điều khiển.",
      "Cơ thể tích tĩnh điện trong mùa hanh khô chạm thẳng vào vi mạch mạ vàng của RAM hoặc Mainboard.",
    ],
    pokaYoke: "Khẩu quyết sống còn: 'Rút phích điện -> Bấm nút nguồn 3 lần -> Chạm tay vỏ kim loại case'.",
    imageSrc: "/images/ol-01/workflow-thao-may.jpg",
    imageAlt: "Sơ đồ 6 bước tháo máy an toàn - Bước 1: Rút nguồn và xả tụ điện",
  },
  {
    id: "dis-2",
    stepNumber: 2,
    title: "Mở Nắp Case & Tháo Card Đồ Họa Rời (VGA GT 730)",
    shortName: "Tháo Card Rời GT 730",
    tool: "Tua vít bake từ tính PH2, khay đựng ốc phân loại",
    action: "Mở nắp hông case máy tính. Dùng tua vít bake tháo ốc nẹp kim loại cố định đuôi card đồ họa vào khung sau thùng máy. Dùng ngón tay trỏ ấn nhẹ lẫy nhựa khóa khe PCIe x16 trên mainboard để ngàm nhả ra, rồi nhấc thẳng đứng card rời theo góc 90 độ ra ngoài, đặt lên khay xốp đệm.",
    commonMistakes: [
      "Quên không gạt lẫy khóa đuôi khe PCIe x16 mà dùng sức giật mạnh lên, làm gãy lẫy hoặc bong rách chân đồng khe cắm.",
      "Rơi ốc nẹp kim loại lọt vào khe hẹp của bộ nguồn PSU hoặc kẹt dưới đáy mainboard gây chập điện.",
      "Cầm ngón tay nắm chặt vào hàng chân đồng PCIe mạ vàng khiến mồ hôi tay làm oxy hóa tiếp xúc.",
    ],
    pokaYoke: "Luôn kiểm tra lẫy khóa PCIe đã mở hết cỡ trước khi nhấc card; cầm card ở phần khung nẹp sắt và tản nhiệt.",
    imageSrc: "/images/ol-01/guide-clean-vga-pcie.jpg",
    imageAlt: "Kỹ thuật tháo card đồ họa rời GT 730 mở lẫy PCIe x16 và tháo ốc nẹp",
  },
  {
    id: "dis-3",
    stepNumber: 3,
    title: "Mở Ngàm Khóa & Tháo Thanh RAM DDR4",
    shortName: "Tháo Thanh RAM DDR4",
    tool: "Tay trần sạch và khô ráo, khay đựng linh kiện",
    action: "Dùng ngón tay ấn đều hai ngàm khóa nhựa ở hai đầu khe RAM (hoặc ngàm đơn phía trên với main H510) xuống dưới. Thanh RAM sẽ tự động bật nảy nhẹ lên khỏi khe. Dùng hai ngón tay cầm vào hai cạnh mép trên của thanh RAM và nhấc thẳng đứng ra ngoài.",
    commonMistakes: [
      "Chưa mở ngàm nhựa đã dùng ngón tay kéo lệch một đầu thanh RAM, làm mẻ chân RAM và gãy rãnh ngàm định vị.",
      "Ngón tay chạm tì vào các chip nhớ dán hoặc chân đồng mạ vàng làm bám dính mồ hôi và dầu mỡ.",
      "Rút RAM ra khi máy vừa tắt được vài giây, linh kiện còn đang rất nóng có thể gây phỏng tay.",
    ],
    pokaYoke: "Chỉ cầm vào hai góc trên của bảng mạch PCB thanh RAM, đặt ngay ngắn vào khay linh kiện chống tĩnh điện.",
    imageSrc: "/images/ol-01/guide-clean-ram-slot.jpg",
    imageAlt: "Kỹ thuật mở ngàm và tháo thanh RAM DDR4 khỏi bo mạch H510",
  },
  {
    id: "dis-4",
    stepNumber: 4,
    title: "Tháo Ổ Cứng SSD SATA/NVMe & Cáp Tín Hiệu",
    shortName: "Tháo Ổ Cứng SSD",
    tool: "Tua vít bake từ tính PH1 / PH2, khay ốc nhỏ",
    action: "Với SSD 2.5\" SATA: Dùng ngón tay bóp nhẹ vào lẫy kim loại trên đầu cáp SATA Data rồi rút thẳng ra; sau đó rút cáp nguồn SATA mỏng hình chữ L; vặn ốc cố định khung ổ đĩa. Với SSD M.2 NVMe: Vặn ốc khóa đuôi M.2, nhấc ổ chếch lên 30 độ rồi rút nhẹ theo chiều xiên.",
    commonMistakes: [
      "Giật mạnh cáp SATA khi chưa bóp lẫy khóa kim loại, làm toác gãy vỏ nhựa chân cắm SATA trên bo mạch hoặc ổ cứng.",
      "Làm rơi hoặc làm toét đầu ốc vít siêu nhỏ của khe M.2 NVMe.",
      "Kéo vặn xoắn dây cáp tín hiệu gây đứt ngầm lõi đồng truyền dữ liệu bên trong.",
    ],
    pokaYoke: "Luôn bóp chốt lẫy kim loại trước khi rút cáp SATA; ốc M.2 rất nhỏ phải bỏ riêng vào ngăn nam châm khay ốc.",
    imageSrc: "/images/ol-01/workflow-thao-may.jpg",
    imageAlt: "Tháo cáp tín hiệu SATA dữ liệu có lẫy kim loại và cáp nguồn ổ cứng",
  },
  {
    id: "dis-5",
    stepNumber: 5,
    title: "Tháo Cụm Cáp F_PANEL, Dây Fan & Nguồn 24-Pin ATX / 8-Pin CPU",
    shortName: "Tháo Dây Cáp Nối",
    tool: "Điện thoại chụp ảnh lưu sơ đồ màu dây, tay trần",
    action: "Dùng điện thoại chụp rõ ảnh vị trí cắm của cụm dây F_PANEL (POWER SW, RESET, LED) để đối chiếu khi lắp lại. Nhẹ nhàng rút từng giắc cắm F_PANEL, USB và Audio. Rút giắc cấp nguồn 8-pin CPU ở góc trên. Bóp lẫy khóa nhựa to của đầu cấp nguồn 24-pin ATX, lắc nhẹ hai bên thân giắc và rút dứt khoát lên trên.",
    commonMistakes: [
      "Cầm vào sợi dây điện giật mạnh thay vì cầm vào chuôi nhựa giắc cắm, dẫn đến đứt ngầm hoặc tuột chân đồng ra khỏi vỏ nhựa.",
      "Tháo cụm F_PANEL mà không chụp ảnh lưu lại, lúc lắp lại cắm mò dẫn đến bấm nút nguồn máy không phản hồi.",
      "Không bóp lẫy khóa nhựa 24-pin mà cố giật làm nứt bo mạch chủ tại vị trí cổng nguồn.",
    ],
    pokaYoke: "Quy tắc cầm chuôi nhựa có lẫy, không bao giờ giật dây điện; chụp ảnh lại cụm 9-pin trước khi tháo rời.",
    imageSrc: "/images/ol-01/guide-fpanel-diagram.jpg",
    imageAlt: "Sơ đồ và kỹ thuật tháo cắm cụm dây F_PANEL và đầu cấp nguồn 24-pin bo mạch",
  },
  {
    id: "dis-6",
    stepNumber: 6,
    title: "Tháo Cụm Tản Nhiệt CPU & Nhấc Bo Mạch Chủ (Mainboard H510)",
    shortName: "Tháo Tản CPU & Mainboard",
    tool: "Tua vít bake từ tính PH2, khăn giấy mềm, cồn vệ sinh 90 độ",
    action: "Rút giắc dây quạt CPU FAN. Xoay 4 chốt khóa tản nhiệt Intel theo chiều mũi tên để nhả ngàm (hoặc tháo 4 ốc tản nhôm theo đường chéo), lay nhẹ cụm tản nhiệt theo vòng tròn để lớp keo khô tách ra rồi nhấc thẳng đứng lên. Vặn đủ 6 ốc cố định bo mạch chủ vào khung case, nhấc nghiêng bo mạch ra khỏi miếng che cổng I/O Shield.",
    commonMistakes: [
      "Xoay chốt tản nhiệt Intel ngược hướng làm gãy chân lẫy nhựa trắng của quạt tản nhiệt zin.",
      "Keo tản nhiệt bị khô cứng như xi măng, giật cục tản thẳng lên làm bật bung cả CPU dính theo tản (đặc biệt nguy hiểm).",
      "Quên chưa tháo đủ 6 ốc đệm standoff trên bo mạch mà cố cạy mainboard lên gây gãy nứt mạch in PCB.",
    ],
    pokaYoke: "Nếu keo tản nhiệt dính chặt, lay nhẹ qua lại theo hình tròn để tách keo trước khi nhấc; đếm đủ 6 ốc tháo ra trước khi nhấc main.",
    imageSrc: "/images/ol-01/workflow-thao-may.jpg",
    imageAlt: "Quy trình nhấc cụm tản nhiệt CPU và tháo 6 ốc cố định bo mạch chủ H510",
  },
];

/**
 * 7 BƯỚC LẮP MÁY CHUẨN POKA-YOKE (THỨ TỰ CHUẨN TỪ LINH KIỆN VÀO CASE)
 */
const ASSEMBLY_STEPS: MechanicalStep[] = [
  {
    id: "asm-1",
    stepNumber: 1,
    title: "Lắp CPU LGA1200, Tra Keo Tản Nhiệt & Bắt Quạt CPU",
    shortName: "Lắp CPU & Tản Nhiệt",
    tool: "Keo tản nhiệt xilanh xịn (gốc gốm/kim loại), tua vít bake, găng tay",
    action: "Mở cần khóa socket LGA1200 trên Mainboard H510. Cầm CPU ở hai cạnh mép, so đúng 2 rãnh khuyết định vị và hình tam giác vàng ở góc dưới bên trái, đặt nhẹ nhàng rơi tự nhiên vào socket (tuyệt đối không ấn mạnh). Gài nẹp và hạ cần khóa. Bơm 1 lượng keo tản nhiệt bằng hạt đậu xanh (đường kính ~4mm) ngay chính giữa lưng CPU. Đặt tản nhiệt cân đối và ấn chéo 4 góc nghe tiếng cạch khóa ngàm. Cắm dây quạt vào chân cắm CPU_FAN.",
    commonMistakes: [
      "Đặt ngược chiều CPU hoặc làm trượt tay làm cong gập chân kim socket LGA1200 (lỗi hỏng bo mạch không thể sửa chữa).",
      "Quên bóc lớp nilon bảo vệ trong suốt ở đáy tản nhiệt mới trước khi ốp vào CPU, máy bật lên 100°C quá nhiệt sập nguồn.",
      "Bôi quá nhiều keo tản nhiệt làm tràn be bét xuống chân socket và vi mạch xung quanh bo mạch gây chập cháy.",
      "Quên cắm dây quạt CPU_FAN khiến quạt không quay, máy báo cảnh báo 'CPU Fan Error' khi khởi động.",
    ],
    pokaYoke: "Khẩu quyết: 'Tam giác vàng so tam giác socket -> 1 hạt đậu xanh keo tản nhiệt -> Bóc nilon đáy quạt -> Cắm CPU_FAN'.",
    imageSrc: "/images/ol-01/workflow-lap-may.jpg",
    imageAlt: "Lắp CPU LGA1200 đúng ngàm khuyết và bơm keo tản nhiệt hạt đậu xanh",
  },
  {
    id: "asm-2",
    stepNumber: 2,
    title: "Lắp Thanh RAM 8GB DDR4 Đúng Rãnh Khuyết Lệch",
    shortName: "Lắp RAM DDR4",
    tool: "Gôm trắng vệ sinh chân vàng, chổi quét mạt",
    action: "Mở lẫy khóa khe cắm RAM trên mainboard H510. Quan sát rãnh khuyết chống cắm ngược trên thanh RAM DDR4 (rãnh lệch về một phía so với tâm) trùng khớp với gờ nổi trong lòng khe cắm. Đặt thanh RAM vuông góc 90 độ vào khe, dùng 2 ngón tay cái ấn đều với lực vừa phải xuống hai đầu thanh RAM cho đến khi nghe tiếng 'TÁCH' đanh gọn và lẫy khóa tự động ngậm khít.",
    commonMistakes: [
      "Cắm ngược đầu rãnh khuyết nhưng cố tình dùng sức tì đè mạnh làm toác khe RAM và mẻ thanh nhớ.",
      "Ấn không đều lực khiến một đầu đã vào nhưng đầu kia bị kênh ra ngoài, bật máy quạt quay tít nhưng màn hình đen ngòm và phát tiếng bíp dài liên tục.",
      "Dùng tay bẩn chạm vào chân mạ vàng trước khi cắm làm bụi bẩn và dầu nhờn cản trở tiếp xúc.",
    ],
    pokaYoke: "Khẩu quyết: 'So rãnh khuyết trước -> Ấn đều 2 đầu -> Nghe tiếng TÁCH đanh gọn -> Khóa lẫy tự ngậm khít'.",
    imageSrc: "/images/ol-01/guide-clean-ram-slot.jpg",
    imageAlt: "Lắp thanh RAM DDR4 đúng khớp rãnh khuyết lệch và khóa lẫy ngậm khít",
  },
  {
    id: "asm-3",
    stepNumber: 3,
    title: "Gá Chặn I/O Shield, Đặt Mainboard Vào Case & Siết Ốc Standoff",
    shortName: "Lắp Mainboard Vào Case",
    tool: "Tua vít bake từ tính, 6 ốc ren mịn bo mạch, chân đệm trụ đồng standoff",
    action: "Ấn miếng che cổng kết nối (I/O Shield) từ bên trong khung case ra phía sau cho đến khi khớp chặt 4 góc. Kiểm tra đếm đủ các chân trụ đồng đệm (Standoff) trên thành case trùng khớp với các lỗ bắt ốc của bo mạch chủ H510. Đặt bo mạch nghiêng nhẹ đưa các cổng kết nối khớp vào I/O Shield rồi hạ phẳng xuống các chân đệm. Vặn đủ 6 ốc ren mịn theo đường chéo chữ X, vặn vừa tay không siết quá chặt.",
    commonMistakes: [
      "Quên lắp ốc chân đệm Standoff, gắn trực tiếp lưng bo mạch lên thành kim loại của case dẫn đến chập mạch nổ nguồn ngay lần bật đầu tiên.",
      "Quên lắp miếng I/O Shield trước khi siết ốc mainboard, phải tháo toàn bộ ốc ra làm lại từ đầu.",
      "Lưỡi kim loại tiếp địa của I/O Shield bị chọc thụt vào trong lòng cổng mạng LAN hoặc cổng HDMI làm nghẽn không cắm được dây.",
      "Dùng nhầm ốc ren thô của nguồn/vỏ case để siết vào chân đệm ren mịn làm toét rách ren ốc.",
    ],
    pokaYoke: "Quy tắc 2 bước kiểm tra: 1. Đếm đủ số trụ đồng Standoff. 2. Soi đèn kiểm tra lưỡi thép I/O Shield không chọc vào trong lòng các cổng kết nối.",
    imageSrc: "/images/ol-01/workflow-lap-may.jpg",
    imageAlt: "Gá miếng chặn I/O Shield và siết ốc đệm standoff cố định bo mạch chủ H510",
  },
  {
    id: "asm-4",
    stepNumber: 4,
    title: "Lắp Bộ Nguồn PSU & Đi Dây Cấp Điện (24-Pin ATX & 8-Pin CPU)",
    shortName: "Lắp Nguồn & Đi Dây Điện",
    tool: "Tua vít bake PH2, 4 ốc ren thô bộ nguồn, dây rút nhựa",
    action: "Đặt bộ nguồn vào khoang dưới case, quạt hút gió của nguồn hướng xuống đáy case (nếu case có lưới lọc bụi đáy) hoặc hướng vào trong khoang. Vặn chặt 4 ốc ren thô phía sau. Luồn dây 8-pin CPU (hoặc 4+4 pin) qua khe hẹp phía trên góc trái và cắm chắc chắn vào cổng nguồn CPU trên bo mạch. Luồn dây 24-pin ATX qua khe hông, cắm kịch vào cổng nguồn chính của mainboard cho đến khi lẫy khóa nhựa ngậm chặt.",
    commonMistakes: [
      "Lắp ngược chiều quạt nguồn khiến nguồn bị kín gió, chạy một lúc quá nhiệt tự ngắt nguồn bảo vệ.",
      "Cắm nhầm đầu cấp nguồn card rời PCIe 8-pin (chia 6+2) vào khe cấp nguồn CPU 8-pin (chia 4+4) làm nổ IC nguồn và dàn VRM do sai sơ đồ cực điện 12V!",
      "Cắm đầu 24-pin chưa hết nấc, lẫy khóa chưa ngậm dẫn đến chập chờn tiếp xúc hoặc đánh tia lửa điện làm sun đầu nhựa.",
    ],
    pokaYoke: "Tuyệt đối phân biệt: Đầu cắm CPU luôn ghi chữ 'CPU' (chia 4+4). Đầu cấp card đồ họa luôn ghi chữ 'PCI-E' (chia 6+2). Lẫy khóa phải ngậm kẹp chặt.",
    imageSrc: "/images/ol-01/workflow-lap-may.jpg",
    imageAlt: "Lắp bộ nguồn PSU đúng chiều thông gió và cắm lẫy khóa cáp 24-pin ATX",
  },
  {
    id: "asm-5",
    stepNumber: 5,
    title: "Cắm Cụm Chân Điều Khiển F_PANEL, Dây USB & Cáp Âm Thanh Audio",
    shortName: "Cắm Cụm Dây F_PANEL",
    tool: "Đèn pin soi sáng, sơ đồ chân kim chuẩn 9-pin",
    action: "Xác định cụm chân cắm F_PANEL ở góc dưới bên phải bo mạch chủ H510. Quan sát vị trí khuyết chân kim (chân số 9 trống). Cắm 2 chân POWER SW vào hàng trên sát vị trí chân khuyết. Cắm 2 chân POWER LED vào bên cạnh. Cắm 2 chân RESET SW vào hàng dưới đối diện POWER SW. Cắm 2 chân HDD LED vào bên cạnh Reset. Sau đó cắm dây USB 2.0 (khuyết chân góc), USB 3.0 (gờ định vị to) và HD Audio (khuyết chân giữa) vào đúng vị trí in chữ trên mainboard.",
    commonMistakes: [
      "Cắm nhầm vị trí POWER SW sang RESET SW khiến nút bấm nguồn trên thùng máy không có tác dụng.",
      "Cắm ngược cực âm dương (+ / -) của đèn LED làm đèn HDD LED hoặc đèn Power LED không sáng khi máy hoạt động.",
      "Cắm lệch hoặc dùng lực ấn mạnh chân USB 3.0 màu xanh làm cong gập gãy các chân kim siêu nhỏ bên trong.",
    ],
    pokaYoke: "Khẩu quyết F_PANEL bất hủ: 'Chân POWER SW nằm ở hàng trên ngay sát cạnh chân trống bị khuyết; nút nguồn & reset không phân cực âm dương'.",
    imageSrc: "/images/ol-01/guide-fpanel-diagram.jpg",
    imageAlt: "Bản đồ cắm chân kim F_PANEL hàng trên POWER SW và hàng dưới RESET SW",
  },
  {
    id: "asm-6",
    stepNumber: 6,
    title: "Lắp Card Đồ Họa Rời (VGA GT 730) & Siết Ốc Nẹp Chống Xệ",
    shortName: "Lắp Card Đồ Họa Rời GT 730",
    tool: "Tua vít bake từ tính, ốc nẹp kim loại nắp sau case",
    action: "Gạt mở lẫy khóa đuôi khe cắm PCIe x16 trên bo mạch H510. Căn chỉnh phần nẹp kim loại của card đồ họa khớp với khe mở ở mặt sau case máy tính. Đặt chân cắm mạ vàng của card thẳng hàng với khe PCIe x16 rồi dùng lực đều ấn xuống cho đến khi lẫy đuôi khe cắm tự động nhảy tiếng 'TÁCH' giữ chặt đuôi card. Dùng tua vít siết chặt ốc nẹp giữ card vào thành thùng máy.",
    commonMistakes: [
      "Quên không siết ốc nẹp kim loại sau case khiến card bị xệ và rung lắc lỏng chân cắm khi học sinh cắm cáp màn hình phía sau.",
      "Chưa mở lẫy khóa PCIe mà đã ấn card vào làm gãy cong lẫy nhựa bảo vệ bo mạch.",
      "Sau khi lắp card rời xong, lúc thử máy lại cắm nhầm dây màn hình vào cổng VGA trên bo mạch chủ (khiến màn hình tối om do CPU i5-10400F không có GPU tích hợp).",
    ],
    pokaYoke: "Quy tắc 2 điểm khóa: 1. Khóa lẫy nhựa đuôi PCIe tự ngậm. 2. Bắt buộc siết ốc nẹp kim loại cố định vào khung case.",
    imageSrc: "/images/ol-01/guide-clean-vga-pcie.jpg",
    imageAlt: "Lắp card đồ họa rời GT 730 khóa lẫy ngậm và siết ốc nẹp khung sau",
  },
  {
    id: "asm-7",
    stepNumber: 7,
    title: "Lắp Ổ Cứng SSD, Nối Cáp SATA Dữ Liệu/Nguồn & Nghiệm Thu Khởi Động",
    shortName: "Lắp Ổ Cứng & Test Khởi Động",
    tool: "Tua vít bake, cáp SATA Data có lẫy kim loại, dây nguồn máy tính",
    action: "Bắt ốc cố định ổ cứng SSD 2.5\" vào khay case (hoặc lắp SSD M.2 NVMe vào khe M.2 siết ốc đuôi). Cắm cáp SATA Data một đầu vào cổng SATA_1 trên mainboard H510, đầu kia cắm vào ổ cứng SSD (nghe tiếng tách nhẹ của lẫy kim loại). Cắm đầu cáp nguồn SATA mỏng hình chữ L từ bộ nguồn vào ổ cứng. Kiểm tra lại toàn bộ khoang máy không để rơi rớt ốc vít kim loại. Cắm dây nguồn 220V, cắm dây màn hình vào Card rời GT 730 và bấm nút Power kiểm tra máy lên hình xuất BIOS bình thường.",
    commonMistakes: [
      "Quên cắm cáp nguồn SATA cho ổ cứng (chỉ cắm cáp SATA Data), máy bật lên báo lỗi 'Reboot and Select proper Boot device'.",
      "Cắm cáp màn hình lộn lên cổng VGA của bo mạch chủ thay vì cắm vào cổng của Card màn hình rời GT 730.",
      "Để sót ốc vít hoặc đầu dây kim loại rơi tự do chạm vào lưng bo mạch chủ gây chập nổ bo mạch khi cắm điện kiểm tra.",
    ],
    pokaYoke: "Khẩu quyết nghiệm thu: 'Dây màn hình cắm Card rời GT 730 phía dưới -> Cáp SATA đủ Data và Nguồn -> Khoang case sạch ốc rơi'.",
    imageSrc: "/images/ol-01/workflow-lap-may.jpg",
    imageAlt: "Cắm cáp SATA dữ liệu và nguồn cho ổ cứng SSD và nghiệm thu khởi động máy",
  },
];

/**
 * 4 KỸ NĂNG CƠ KHÍ CỐT LÕI & BẪY LỖI SỐNG CÒN CỦA KỸ THUẬT VIÊN
 */
interface CoreSkill {
  id: "ram" | "vga" | "fpanel" | "cmos";
  name: string;
  subtitle: string;
  badge: string;
  imageSrc: string;
  imageAlt: string;
  tools: string[];
  steps: string[];
  mistakes: string[];
  pokaYoke: string;
}

const CORE_SKILLS: CoreSkill[] = [
  {
    id: "ram",
    name: "Vệ Sinh Chân & Khe Cắm RAM DDR4",
    subtitle: "Khắc phục 90% lỗi quạt quay tít không lên hình, máy kêu bíp dài liên tục",
    badge: "Kỹ Năng Cốt Lõi #1",
    imageSrc: "/images/ol-01/guide-clean-ram-slot.jpg",
    imageAlt: "Sơ đồ kỹ thuật vệ sinh chân mạ vàng RAM DDR4 bằng gôm tẩy trắng và cọ mềm khe cắm",
    tools: [
      "Cục gôm (tẩy) bút chì mềm màu trắng sạch (không dùng gôm đen hoặc gôm cát)",
      "Chổi cọ sơn mềm hoặc cọ quét bụi tĩnh điện",
      "Khăn vải sợi microfiber sạch và khô",
      "Bình xịt khí nén hoặc bóng thổi bụi cao su",
    ],
    steps: [
      "Đặt thanh RAM nằm nghiêng 45 độ trên mặt phẳng sạch có lót khăn mềm.",
      "Dùng mặt gôm trắng chà nhẹ nhàng theo một chiều dọc theo hàng chân tiếp xúc mạ vàng ở cả 2 mặt thanh RAM cho đến khi chân đồng sáng bóng, lớp oxy hóa ố mờ biến mất hoàn toàn.",
      "Dùng chổi cọ mềm quét sạch toàn bộ mạt vụn gôm bám trên chân RAM và thân linh kiện dán SMD (tuyệt đối không dùng miệng thổi vì hơi thở ẩm làm oxy hóa chân vàng).",
      "Dùng cọ mềm và bóng thổi bụi luồn sâu vào lòng khe cắm RAM trên mainboard H510 để thổi bay bụi bặm, sợi vải bám lâu ngày.",
      "Căn đúng rãnh khuyết lệch chống cắm ngược, ấn đều hai đầu thanh RAM nghe tiếng 'TÁCH' đanh gọn là hoàn thành.",
    ],
    mistakes: [
      "Dùng cồn ướt hoặc giẻ lau ẩm lau chân RAM rồi cắm ngay vào máy khi chưa khô hẳn gây chập chân tiếp xúc.",
      "Dùng gôm tẩy có hạt mài cứng hoặc chà xát quá mạnh làm tróc cả lớp mạ vàng bảo vệ chân mạch đồng.",
      "Để lại mạt vụn cao su của gôm bám vào khe chân cắm, khi cắm RAM vào mạt gôm chèn vào giữa làm mất tiếp xúc, máy hoàn toàn không nhận RAM.",
    ],
    pokaYoke: "Chỉ dùng gôm tẩy trắng chuyên dụng; quét sạch 100% mạt vụn gôm trước khi cắm; cắm nghe tiếng 'TÁCH' và lẫy tự đóng ngậm khít.",
  },
  {
    id: "vga",
    name: "Tháo Lắp & Vệ Sinh Card Đồ Họa Rời (GT 730)",
    subtitle: "Quy trình nhả lẫy an toàn, vệ sinh chân PCIe và bắt ốc nẹp chống xệ",
    badge: "Kỹ Năng Cốt Lõi #2",
    imageSrc: "/images/ol-01/guide-clean-vga-pcie.jpg",
    imageAlt: "Hướng dẫn tháo lắp vệ sinh card rời GT 730 mở lẫy PCIe x16 và bắt ốc nẹp case",
    tools: [
      "Tua vít bake từ tính cán dài PH2",
      "Gôm tẩy trắng làm sạch chân mạ vàng PCIe x16",
      "Chổi cọ mềm làm sạch cánh quạt và khe nhôm tản nhiệt",
      "Khay đựng ốc nẹp kim loại sau thùng máy",
    ],
    steps: [
      "Tháo ốc nẹp cố định khung kim loại của Card rời vào thành sau case máy tính, để ốc vào khay đựng riêng.",
      "Dùng ngón tay trỏ hoặc cán que nhựa gạt nhẹ lẫy khóa đuôi của khe cắm PCIe x16 trên bo mạch H510 cho lẫy nhả ra hoàn toàn.",
      "Hai tay cầm vào khung nẹp sắt và phần tản nhiệt, nhấc thẳng đứng card đồ họa ra ngoài theo góc 90 độ.",
      "Dùng chổi cọ quét sạch bụi bặm bám trên các nan nhôm tản nhiệt và cánh quạt làm mát của card GT 730.",
      "Dùng gôm trắng làm sạch nhẹ nhàng hàng chân tiếp xúc mạ vàng PCIe x16 cả 2 mặt, quét sạch mạt gôm.",
      "Lắp lại: Mở lẫy đuôi khe PCIe -> Căn thẳng chân cắm -> Ấn đều tay nghe tiếng 'TÁCH' khóa lẫy -> Bắt buộc vặn chặt ốc nẹp giữ card vào thùng case.",
    ],
    mistakes: [
      "Chưa mở lẫy khóa đuôi khe PCIe x16 đã dùng sức kéo mạnh card lên, làm bẻ gãy lẫy nhựa hoặc giật bung cả chân tiếp xúc khe cắm trên bo mạch chủ.",
      "Quên bắt ốc nẹp kim loại sau case khiến card bị rung xệ, cắm dây cáp màn hình vào làm lỏng chân dẫn đến mất tín hiệu hiển thị.",
      "CẮM NHẦM DÂY MÀN HÌNH: Cắm dây VGA/HDMI lên cổng trên bo mạch chủ thay vì cắm vào cổng của Card rời GT 730 (học sinh phòng máy thực hành mắc lỗi này nhiều nhất!).",
    ],
    pokaYoke: "Khẩu quyết sống còn: 'Card rời có nẹp ốc giữ phía dưới -> Dây màn hình BẮT BUỘC cắm vào nẹp Card rời phía dưới, KHÔNG cắm lên cụm cổng Mainboard!'.",
  },
  {
    id: "fpanel",
    name: "Kỹ Thuật Cắm Cụm Chân Kim F_PANEL (Front Panel)",
    subtitle: "Bản đồ chân kim 9-pin chuẩn quốc tế: Bấm nguồn lên đèn ngay từ lần đầu",
    badge: "Kỹ Năng Cốt Lõi #3",
    imageSrc: "/images/ol-01/guide-fpanel-diagram.jpg",
    imageAlt: "Bản đồ 9 chân kim Front Panel Mainboard H510 hàng trên POWER SW và hàng dưới RESET SW",
    tools: [
      "Đèn pin hoặc đèn flash điện thoại để soi rõ ký hiệu in trên bo mạch H510",
      "Nhíp kẹp nhựa nếu không gian case hẹp",
      "Bản đồ ghi nhớ vị trí 9 chân kim chuẩn",
    ],
    steps: [
      "Tìm cụm 9 chân kim F_PANEL (thường in chữ JFP1, PANEL hoặc F_PANEL) ở góc dưới cùng bên phải bo mạch chủ H510.",
      "Xác định điểm mốc chuẩn: Cụm này gồm 2 hàng chân kim, trong đó hàng dưới cùng bên phải có một vị trí CHÂN KHUYẾT (chân số 9 trống không có kim).",
      "HÀNG TRÊN (gồm 4 chân kim): 2 chân bên phải (ngay sát cạnh vị trí chân khuyết bên dưới) chính là chân cắm giắc POWER SW (công tắc bật nguồn). 2 chân bên trái là cắm POWER LED (+ và -).",
      "HÀNG DƯỚI (gồm 5 chân kim, chân ngoài cùng bên phải bỏ trống): 2 chân cắm RESET SW (nút khởi động lại) nằm ngay bên cạnh chân khuyết (đối diện với POWER SW). 2 chân bên trái là cắm HDD LED (+ và -).",
      "Lưu ý nguyên tắc phân cực: POWER SW và RESET SW là công tắc đóng ngắt tiếp điểm, cắm chiều nào cũng hoạt động bình thường. Riêng đèn LED (HDD LED, POWER LED) có cực âm (-) và dương (+), dây có màu nổi hoặc in dấu (+) là cực dương.",
    ],
    mistakes: [
      "Cắm lộn dây POWER SW sang vị trí chân RESET SW khiến học sinh bấm nút nguồn máy không có phản hồi gì.",
      "Cắm nhầm dây nguồn sang chân đèn LED làm chập tiếp điểm tín hiệu điều khiển.",
      "Cắm ngược cực âm dương của HDD LED khiến máy vẫn chạy tốt nhưng đèn báo ổ cứng đỏ/xanh mặt trước không bao giờ chớp sáng.",
    ],
    pokaYoke: "Khẩu quyết vàng F_PANEL: 'Hàng trên sát cạnh chân khuyết là POWER SW. Hàng dưới đối diện là RESET SW. Hai nút bấm này không phân biệt chiều âm dương!'.",
  },
  {
    id: "cmos",
    name: "Kỹ Thuật Tháo Pin CMOS & Clear CMOS (Xả BIOS Về Mặc Định)",
    subtitle: "Cứu hộ máy tính lỗi thiết lập BIOS, treo logo hoặc quên mật khẩu BIOS",
    badge: "Kỹ Năng Cốt Lõi #4",
    imageSrc: "/images/ol-01/guide-clear-cmos-pin.jpg",
    imageAlt: "Hướng dẫn tháo pin cúc áo CR2032 3V Clear CMOS xả BIOS gốc trên main H510",
    tools: [
      "Tua vít dẹp nhỏ (2mm) hoặc que nạy nhựa chuyên dụng",
      "Đồng hồ vạn năng VOM đo điện áp pin (nếu kiểm tra tình trạng pin hết điện)",
      "Pin cúc áo Lithium CR2032 điện áp chuẩn 3.0V - 3.3V",
    ],
    steps: [
      "Rút hoàn toàn phích cắm điện 220V khỏi bộ nguồn, bấm nút Power trên thùng máy 3 lần để xả sạch điện tích tụ trong hệ thống.",
      "Quan sát ổ đựng pin CMOS tròn trên bo mạch H510. Ở một góc vành giữ kim loại có một lẫy đàn hồi nhỏ tì vào cạnh viên pin.",
      "Dùng đầu que nhựa hoặc tua vít dẹp ấn nhẹ lẫy kim loại gạt sang phía ngoài. Lò xo bên dưới đáy ổ sẽ tự động đẩy bật viên pin nảy chéo góc 45 độ lên.",
      "Dùng ngón tay nhấc viên pin CR2032 ra ngoài. Để máy nghỉ từ 3 đến 5 phút để chip CMOS xả hết dữ liệu lưu trong bộ nhớ tạm thời.",
      "MẸO NHANH CHO KTV: Dùng đầu tua vít kim loại chập nối 2 chân kim JBAT1 / CLR_CMOS trên bo mạch chủ trong 5-10 giây để xả sạch BIOS ngay lập tức mà không cần chờ đợi lâu.",
      "Lắp lại pin: Đặt viên pin chếch vào ngàm cố định, mặt chữ có dấu (+) và in chữ 'CR2032 3V' NGỬA LÊN TRÊN, ấn nhẹ cạnh đối diện xuống cho đến khi nghe tiếng tách ngậm chốt.",
    ],
    mistakes: [
      "Không rút dây nguồn 220V trước khi tháo pin, nguồn phụ 5VSB vẫn duy trì nuôi chip nên BIOS không bao giờ được xả về mặc định.",
      "Dùng vật nhọn bằng sắt chọc cày xước mặt bo mạch xung quanh socket pin làm đứt các đường vi mạch in tí hon.",
      "Lắp ngược mặt pin (úp mặt dương dấu + xuống dưới) làm hỏng lẫy tiếp điểm và không cấp được điện cho chip lưu thời gian thực RTC.",
      "Pin CMOS bị tụt áp dưới 2.5V nhưng không phát hiện, dẫn đến mỗi lần rút điện bật máy lại bị sai ngày giờ và bắt nhấn F1 để tiếp tục.",
    ],
    pokaYoke: "Mặt có dấu (+) và chữ 'CR2032' luôn ngửa lên trên nhìn thấy; nếu máy khởi động cứ nhảy về năm 2002 hoặc sai giờ thì thay ngay pin mới!",
  },
];


export default function CompleteHardwareTrainingPage() {
  // Tab điều hướng chính
  const [activeMainTab, setActiveMainTab] = React.useState<
    "workflow7" | "assembly" | "diagnostics" | "components" | "report"
  >("workflow7");

  // Tab con trong phân hệ Tháo & Lắp máy KTV
  const [assemblySubTab, setAssemblySubTab] = React.useState<"disassembly" | "assembly" | "skills">("disassembly");

  // Bước đang chọn trong Tháo máy (6 bước)
  const [activeDisassemblyStepId, setActiveDisassemblyStepId] = React.useState<string>("dis-1");

  // Bước đang chọn trong Lắp máy (7 bước)
  const [activeAssemblyStepId, setActiveAssemblyStepId] = React.useState<string>("asm-1");

  // Kỹ năng cốt lõi đang chọn (RAM, VGA, F_PANEL, CMOS)
  const [selectedSkillId, setSelectedSkillId] = React.useState<"ram" | "vga" | "fpanel" | "cmos">("ram");

  // Checkbox tiến độ Tháo máy
  const [checkedDisassembly, setCheckedDisassembly] = React.useState<Record<string, boolean>>({
    "dis-1": false,
    "dis-2": false,
    "dis-3": false,
    "dis-4": false,
    "dis-5": false,
    "dis-6": false,
  });

  // Checkbox tiến độ Lắp máy
  const [checkedAssembly, setCheckedAssembly] = React.useState<Record<string, boolean>>({
    "asm-1": false,
    "asm-2": false,
    "asm-3": false,
    "asm-4": false,
    "asm-5": false,
    "asm-6": false,
    "asm-7": false,
  });

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

  // Chế độ xem cột phải trên desktop
  const [rightViewMode, setRightViewMode] = React.useState<"interactive" | "stepImage">("interactive");

  // Dòng Bo Mạch Chủ đang chọn hiển thị (MSI, ASUS, Winnfox, So Sánh)
  const [selectedBoardId, setSelectedBoardId] = React.useState<"msi" | "asus" | "winnfox" | "compare">("msi");
  const currentBoard = LAB_MOTHERBOARDS.find((b) => b.id === selectedBoardId) || LAB_MOTHERBOARDS[0];

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

  // Xử lý bật/tắt Checkbox 1-chạm
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
  const isActiveStepDone = Boolean(checkedSteps[activeStep.id]);

  const activeCase = DIAGNOSTIC_CASES.find((c) => c.id === selectedCaseId) || DIAGNOSTIC_CASES[1];

  const handleToggleDisassembly = (id: string) => {
    setCheckedDisassembly((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleAssembly = (id: string) => {
    setCheckedAssembly((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeDisassemblyStep =
    DISASSEMBLY_STEPS.find((s) => s.id === activeDisassemblyStepId) || DISASSEMBLY_STEPS[0];
  const activeAssemblyStep =
    ASSEMBLY_STEPS.find((s) => s.id === activeAssemblyStepId) || ASSEMBLY_STEPS[0];
  const selectedSkill =
    CORE_SKILLS.find((s) => s.id === selectedSkillId) || CORE_SKILLS[0];

  // Chuyển bước kế tiếp
  const handleNextStep = () => {
    if (activeStepIndex < totalSteps - 1) {
      const nextStep = KTV_7_STEPS[activeStepIndex + 1];
      setActiveStepId(nextStep.id);
      setRightViewMode("stepImage");
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  // Quay lại bước trước
  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      const prevStep = KTV_7_STEPS[activeStepIndex - 1];
      setActiveStepId(prevStep.id);
      setRightViewMode("stepImage");
      window.scrollTo({ top: 120, behavior: "smooth" });
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans overflow-x-hidden">
      <Header />

      {/* Main container: padding-bottom dự phòng cho thanh điều hướng đáy di động */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6 pb-28 sm:pb-8">
        {/* ==================================================================== */}
        {/* 1. THANH TIÊU ĐỀ & ĐỊNH HƯỚNG SƯ PHẠM NGHỀ                             */}
        {/* ==================================================================== */}
        <Card className="border-slate-200 bg-white shadow-xs">
          <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-mono text-[11px] sm:text-xs font-black tracking-wider">
                    CHUẨN NGHỀ: OL-01
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-600 uppercase tracking-tight">
                    Cẩm Nang KTV Máy Tính · Hệ 9+3 · Từ Con Số 0
                  </span>
                </div>
                <CardTitle className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  Quy Trình 7 Bước Thực Chiến: Tiếp Nhận Đến Bàn Giao
                </CardTitle>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Giảng viên: <strong className="text-slate-800">CN. Phạm Tiến Đông</strong> · Cầm tay chỉ việc 100% tại Bàn Kỹ Thuật
                </p>
              </div>

              {/* Tiến độ hoàn thành */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2.5 sm:pt-0 border-slate-100 min-w-[200px]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <CheckCircle2 className={`w-4 h-4 ${isAllCompleted ? "text-emerald-600" : "text-slate-400"}`} />
                  <span>Tiến độ thực hành:</span>
                </div>
                <div className="text-lg sm:text-3xl font-black font-mono text-slate-900">
                  {completedCount} / {totalSteps} bước ({progressPercent}%)
                </div>
              </div>
            </div>

            {/* Thanh Progress Bar */}
            <div className="w-full h-2.5 sm:h-3 bg-slate-100 rounded-full overflow-hidden mt-2.5 sm:mt-3 border border-slate-200">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isAllCompleted ? "bg-emerald-600" : "bg-blue-600"
                }`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </CardHeader>

          {/* 3 KHẨU QUYẾT SỐNG CÒN CỦA KTV */}
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 text-xs">
              <div className="p-2.5 sm:p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="font-extrabold text-amber-900">RÚT – BẤM – KHAY (An toàn):</strong>
                  <p className="text-[11px] text-amber-800 mt-0.5">Rút phích điện đen, bấm nút nguồn 3 lần xả tụ, ốc tháo bỏ ngay vào khay.</p>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="font-extrabold text-emerald-900">RÃNH KHUYẾT, KHÔNG ẤN CỐ:</strong>
                  <p className="text-[11px] text-emerald-800 mt-0.5">Linh kiện có rãnh chống ngược; cộm tay là xoay lại, cấm dùng sức đè.</p>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="font-extrabold text-blue-900">DỮ LIỆU TRƯỚC, MÁY SAU:</strong>
                  <p className="text-[11px] text-blue-800 mt-0.5">Mất dữ liệu là đền tiền. Luôn sao lưu Desktop &amp; Documents sang ổ D!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ==================================================================== */}
        {/* 2. THANH TAB ĐIỀU HƯỚNG CHÍNH (VUỐT NGANG SIÊU MƯỢT TRÊN MOBILE)     */}
        {/* ==================================================================== */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-3 px-3 sm:mx-0 sm:px-0">
          <button
            type="button"
            onClick={() => setActiveMainTab("workflow7")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shrink-0 min-h-[44px] ${
              activeMainTab === "workflow7"
                ? "bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-2"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>📖 Quy Trình 7 Bước</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab("assembly")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shrink-0 min-h-[44px] ${
              activeMainTab === "assembly"
                ? "bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-2"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Wrench className="w-4 h-4 text-emerald-500" />
            <span>🔧 Tháo &amp; Lắp Máy KTV</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab("diagnostics")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shrink-0 min-h-[44px] ${
              activeMainTab === "diagnostics"
                ? "bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-2"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>⚡ Bắt Bệnh 60s</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab("components")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shrink-0 min-h-[44px] ${
              activeMainTab === "components"
                ? "bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-2"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Cpu className="w-4 h-4 text-blue-600" />
            <span>🧩 5 Món &amp; 4 Dây</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab("report")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shrink-0 min-h-[44px] ${
              activeMainTab === "report"
                ? "bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-2"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            <span>📋 Phiếu Nghiệm Thu</span>
          </button>
        </div>

        {/* ==================================================================== */}
        {/* PHÂN HỆ 1: QUY TRÌNH 7 BƯỚC THỰC CHIẾN (TỐI ƯU CẢ MOBILE & DESKTOP) */}
        {/* ==================================================================== */}
        {activeMainTab === "workflow7" && (
          <div className="space-y-4">
            {/* Dàn nút chuyển nhanh 7 bước vuốt ngang */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 -mx-3 px-3 sm:mx-0 sm:px-0">
              <span className="text-xs font-bold text-slate-500 shrink-0 hidden md:inline">
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
                    className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer min-h-[40px] sm:min-h-[44px] ${
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

            {/* Bố cục 2 cột: Trên Desktop 2 cột bên nhau; Trên Mobile tích hợp ảnh trực quan ngay trong bước */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* CỘT TRÁI (7/12 CỘT): HƯỚNG DẪN TỪNG BƯỚC */}
              <div className="lg:col-span-7 space-y-3 sm:space-y-4">
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
                        <AccordionTrigger className="px-3.5 sm:px-5 py-3.5 sm:py-4 hover:no-underline text-left cursor-pointer min-h-[56px]">
                          <div className="flex items-start gap-2.5 sm:gap-3 w-full pr-2">
                            <div
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-mono font-black text-xs sm:text-sm shrink-0 transition-colors mt-0.5 ${
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
                              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-bold">
                                  {step.role}
                                </span>
                                <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
                                  ⏱️ {step.timeEstimate}
                                </span>
                                {step.checkpoint && (
                                  <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[10px] sm:text-[11px] font-black border border-rose-200">
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

                        <AccordionContent className="px-3.5 sm:px-5 pb-4 sm:pb-5 pt-1 space-y-3 sm:space-y-4 text-slate-700 border-t border-slate-100">
                          {/* =================================================== */}
                          {/* ĐẶC BIỆT CHO MOBILE: THẺ ẢNH THỰC TẾ NGAY TRONG BƯỚC */}
                          {/* Giúp học sinh trên điện thoại không phải cuộn xuống đáy */}
                          {/* =================================================== */}
                          <div className="block lg:hidden rounded-2xl overflow-hidden border border-slate-200 bg-white p-2.5 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-800 flex items-center gap-1">
                                <span>📷 Ảnh linh kiện bước {step.stepNumber}</span>
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setZoomedImage({
                                    src: step.imageSrc,
                                    alt: step.imageAlt,
                                    title: `Bước ${step.stepNumber}: ${step.title}`,
                                  })
                                }
                                className="h-7 px-2.5 text-[11px] font-bold text-slate-700 border-slate-300"
                              >
                                <ZoomIn className="w-3 h-3 mr-1 text-emerald-600" />
                                Phóng to
                              </Button>
                            </div>

                            <div
                              onClick={() =>
                                setZoomedImage({
                                  src: step.imageSrc,
                                  alt: step.imageAlt,
                                  title: `Bước ${step.stepNumber}: ${step.title}`,
                                })
                              }
                              className="relative w-full aspect-[16/10] bg-white rounded-xl overflow-hidden border border-slate-100 cursor-pointer"
                            >
                              <Image
                                src={step.imageSrc}
                                alt={step.imageAlt}
                                fill
                                className="object-contain p-1"
                                sizes="(max-width: 640px) 100vw, 50vw"
                              />
                            </div>
                          </div>

                          {/* Điểm dừng an toàn Poka-Yoke (nếu có) */}
                          {step.checkpoint && (
                            <div className="p-3 sm:p-3.5 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-950 space-y-1 shadow-2xs">
                              <div className="flex items-center gap-1.5 font-black text-xs text-rose-900 uppercase">
                                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                                <span>{step.checkpoint.code}: {step.checkpoint.name}</span>
                              </div>
                              <p className="text-xs sm:text-sm leading-relaxed pl-5 font-semibold">
                                {step.checkpoint.requirement}
                              </p>
                            </div>
                          )}

                          {/* Danh sách hành động chi tiết */}
                          <div className="space-y-1.5 pt-1">
                            <div className="text-xs font-black uppercase text-slate-500 tracking-wider">
                              Thao tác tay bắt buộc làm tại bàn:
                            </div>
                            <ul className="space-y-2 text-xs sm:text-sm leading-relaxed">
                              {step.instructions.map((ins, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0"></span>
                                  <span>{ins}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Ví von đời thường */}
                          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 space-y-1">
                            <div className="flex items-center gap-1.5 text-xs font-black">
                              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                              <span>Ví von đời thường dễ nhớ:</span>
                            </div>
                            <p className="text-xs sm:text-sm leading-relaxed pl-5">
                              {step.analogy}
                            </p>
                          </div>

                          {/* Cảnh báo Poka-Yoke */}
                          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 space-y-1">
                            <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                              <AlertTriangle className="w-4 h-4 text-slate-700 shrink-0" />
                              <span>LƯU Ý POKA-YOKE (CHỐNG LÀM SAI):</span>
                            </div>
                            <p className="text-xs sm:text-sm leading-relaxed pl-5 font-medium">
                              {step.pokaYoke}
                            </p>
                          </div>

                          {/* NÚT CHECKBOX XÁC NHẬN AN TOÀN 1-CHẠM (CHIỀU CAO TỐI THIỂU 48PX CHO NGÓN CÁI) */}
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
                              className={`w-full min-h-[48px] p-3 sm:p-3.5 rounded-xl border-2 flex items-center justify-between gap-2.5 transition-all cursor-pointer select-none active:scale-[0.99] ${
                                isStepDone
                                  ? "bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs"
                                  : "bg-white border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
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
                                className={`text-[10px] sm:text-[11px] font-mono font-bold px-2 py-0.5 rounded-md shrink-0 ${
                                  isStepDone
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {isStepDone ? "✓ ĐÃ XONG" : "CHƯA TICK"}
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
                              className="text-slate-600 hover:text-slate-900 cursor-pointer min-h-[40px]"
                            >
                              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                              <span>Bước {step.stepNumber - 1}</span>
                            </Button>

                            {step.stepNumber < totalSteps ? (
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={handleNextStep}
                                className="bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer min-h-[40px]"
                              >
                                <span>Sang Bước {step.stepNumber + 1}</span>
                                <ArrowRight className="w-3.5 h-3.5 ml-1" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => setActiveMainTab("report")}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer min-h-[40px]"
                              >
                                <span>Nộp Báo Cáo</span>
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

              {/* CỘT PHẢI (5/12 CỘT): CHỈ HIỂN THỊ TRÊN MÀN HÌNH DESKTOP (STICKY) */}
              <div className="hidden lg:block lg:col-span-5 space-y-4 lg:sticky lg:top-20">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200">
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
                        src: rightViewMode === "interactive" ? currentBoard.imageSrc : activeStep.imageSrc,
                        alt: rightViewMode === "interactive" ? currentBoard.imageAlt : activeStep.imageAlt,
                        title: rightViewMode === "interactive" ? currentBoard.name : activeStep.title,
                      })
                    }
                    className="flex items-center gap-1.5 text-xs font-bold border-slate-300 h-8 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Phóng to</span>
                  </Button>
                </div>

                {/* Chuyển tab xem trên desktop */}
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
                    🗺️ Sơ Đồ Bo Mạch H510
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
                  <CardContent className="p-4 space-y-3">
                    {rightViewMode === "interactive" ? (
                      <div className="space-y-3">
                        {/* Thanh chọn 3 thương hiệu Mainboard phòng lab + So sánh */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-extrabold text-slate-700">Dòng Main Phòng Lab:</span>
                            <span className="font-mono text-slate-500 font-bold">{currentBoard.badge}</span>
                          </div>
                          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
                            {LAB_MOTHERBOARDS.map((board) => {
                              const isSelected = selectedBoardId === board.id;
                              return (
                                <button
                                  key={board.id}
                                  type="button"
                                  onClick={() => setSelectedBoardId(board.id)}
                                  className={`py-1.5 px-1 rounded-lg font-bold text-center transition-all cursor-pointer text-[11px] truncate ${
                                    isSelected
                                      ? "bg-slate-900 text-white shadow-xs font-black"
                                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                                  }`}
                                  title={board.name}
                                >
                                  {board.id === "compare" ? "📊 So Sánh" : board.name.split(" ")[0]}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Khung hiển thị ảnh Bo Mạch */}
                        <div className="relative w-full aspect-[1010/889] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-inner group">
                          <Image
                            src={currentBoard.imageSrc}
                            alt={currentBoard.imageAlt}
                            fill
                            className="object-contain p-2"
                            sizes="40vw"
                            priority
                          />

                          {/* 5 Hotspots (hiển thị khi chọn MSI) */}
                          {selectedBoardId === "msi" &&
                            H510_HOTSPOTS.map((spot) => {
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

                        {/* Thông số kỹ thuật & Kinh nghiệm thực chiến của Mainboard đang chọn */}
                        <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-2 border border-slate-700 shadow-md">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <div className="font-extrabold text-sm text-emerald-400">
                              {currentBoard.name}
                            </div>
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-amber-300 font-bold">
                              Boot: {currentBoard.bootKey}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                            <div>
                              <strong className="text-slate-400 block">🔑 Phím Vào BIOS:</strong>
                              <span className="font-mono text-cyan-300 font-bold">{currentBoard.biosKey}</span>
                            </div>
                            <div>
                              <strong className="text-slate-400 block">🚀 Phím Boot Menu:</strong>
                              <span className="font-mono text-amber-300 font-bold">{currentBoard.bootKey}</span>
                            </div>
                            <div className="col-span-2">
                              <strong className="text-slate-400 block">💡 Cơ Chế Báo Lỗi:</strong>
                              <span>{currentBoard.debugMethod}</span>
                            </div>
                            <div className="col-span-2">
                              <strong className="text-slate-400 block">🕹️ Kiểu Lẫy Khe RAM:</strong>
                              <span>{currentBoard.ramLatchType}</span>
                            </div>
                          </div>

                          <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-amber-200 text-[11px] leading-relaxed">
                            <strong>⚠️ Kinh nghiệm KTV:</strong> {currentBoard.ktvTip}
                          </div>
                        </div>

                        {/* Hộp thông tin Hotspot (nếu chọn MSI) */}
                        {selectedBoardId === "msi" && (
                          <div className="p-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-900 space-y-1.5 text-xs">
                            <div className="flex items-center justify-between font-bold text-slate-900">
                              <span>Hotspot {selectedHotspot.title}</span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                                {selectedHotspot.badge}
                              </span>
                            </div>
                            <p className="text-slate-700 text-[11px] leading-relaxed">
                              {selectedHotspot.description}
                            </p>
                            <p className="text-rose-700 text-[11px] font-semibold">
                              ⚠️ Poka-Yoke: {selectedHotspot.pokaYoke}
                            </p>
                          </div>
                        )}
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
                            sizes="40vw"
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
        {/* PHÂN HỆ MỚI: QUY TRÌNH THÁO & LẮP MÁY KTV + 4 KỸ NĂNG CỐT LÕI         */}
        {/* ==================================================================== */}
        {activeMainTab === "assembly" && (
          <div className="space-y-4 sm:space-y-6">
            {/* Thanh chọn 3 phân nhánh Tháo - Lắp - 4 Kỹ năng */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-3 px-3 sm:mx-0 sm:px-0">
              <button
                type="button"
                onClick={() => setAssemblySubTab("disassembly")}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 min-h-[44px] ${
                  assemblySubTab === "disassembly"
                    ? "bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-2"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span>🔩 1. Tháo Máy An Toàn (6 Bước)</span>
              </button>

              <button
                type="button"
                onClick={() => setAssemblySubTab("assembly")}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 min-h-[44px] ${
                  assemblySubTab === "assembly"
                    ? "bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-2"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span>🛠️ 2. Lắp Máy Poka-Yoke (7 Bước)</span>
              </button>

              <button
                type="button"
                onClick={() => setAssemblySubTab("skills")}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 min-h-[44px] ${
                  assemblySubTab === "skills"
                    ? "bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-2"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>🎯 3. 4 Kỹ Năng Cơ Khí &amp; Bẫy Lỗi</span>
              </button>
            </div>

            {/* ------------------------------------------------------------------ */}
            {/* SUBTAB 1: QUY TRÌNH THÁO MÁY (6 BƯỚC AN TOÀN ĐIỆN & CƠ KHÍ)         */}
            {/* ------------------------------------------------------------------ */}
            {assemblySubTab === "disassembly" && (
              <div className="space-y-4">
                {/* Dàn nút chuyển nhanh 6 bước tháo */}
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 -mx-3 px-3 sm:mx-0 sm:px-0">
                  <span className="text-xs font-bold text-slate-500 shrink-0 hidden md:inline">
                    Các bước tháo:
                  </span>
                  {DISASSEMBLY_STEPS.map((step) => {
                    const isCurrent = step.id === activeDisassemblyStepId;
                    const isDone = Boolean(checkedDisassembly[step.id]);
                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => setActiveDisassemblyStepId(step.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer min-h-[40px] sm:min-h-[44px] ${
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
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {isDone ? "✓" : step.stepNumber}
                        </span>
                        <span>{step.shortName}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Bố cục 2 cột: Cột trái (Chi tiết bước & Bẫy lỗi) - Cột phải (Hình minh họa phóng to) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                  {/* CỘT TRÁI: 7 CỘT */}
                  <div className="lg:col-span-7 space-y-4">
                    <Card className="border-slate-200 bg-white shadow-xs">
                      <CardHeader className="p-4 sm:p-5 border-b border-slate-100">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-mono text-xs font-bold">
                            BƯỚC THÁO {activeDisassemblyStep.stepNumber} / {DISASSEMBLY_STEPS.length}
                          </span>
                          <span className="text-xs font-medium text-slate-500">
                            Dụng cụ: <strong className="text-slate-800">{activeDisassemblyStep.tool}</strong>
                          </span>
                        </div>
                        <CardTitle className="text-lg sm:text-xl font-black text-slate-900 mt-2">
                          {activeDisassemblyStep.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                        {/* Thao tác kỹ thuật */}
                        <div>
                          <strong className="text-slate-900 block font-bold mb-1.5 flex items-center gap-1.5">
                            <Wrench className="w-4 h-4 text-slate-700" />
                            <span>Thao Tác Thực Hiện:</span>
                          </strong>
                          <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                            {activeDisassemblyStep.action}
                          </p>
                        </div>

                        {/* Sai sót thường gặp */}
                        <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-950 space-y-2">
                          <strong className="font-extrabold flex items-center gap-1.5 text-amber-900">
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                            <span>Ghi Chú Sai Sót Dễ Mắc Phải:</span>
                          </strong>
                          <ul className="space-y-1 pl-4 list-disc text-xs text-amber-900/90 leading-relaxed">
                            {activeDisassemblyStep.commonMistakes.map((m, idx) => (
                              <li key={idx}>{m}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Chuẩn Poka-Yoke */}
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
                          <ShieldAlert className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <div className="text-xs leading-relaxed">
                            <strong className="font-extrabold text-emerald-900">An toàn Poka-Yoke: </strong>
                            <span>{activeDisassemblyStep.pokaYoke}</span>
                          </div>
                        </div>

                        {/* Checkbox hoàn thành */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-bold text-slate-800 select-none">
                            <input
                              type="checkbox"
                              checked={Boolean(checkedDisassembly[activeDisassemblyStep.id])}
                              onChange={() => handleToggleDisassembly(activeDisassemblyStep.id)}
                              className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                            />
                            <span>Em đã kiểm tra an toàn và hoàn thành bước này</span>
                          </label>

                          <span className="text-xs font-mono text-slate-400">
                            {Boolean(checkedDisassembly[activeDisassemblyStep.id]) ? "ĐÃ XÁC NHẬN ✓" : "CHƯA XÁC NHẬN"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 3 Nguyên tắc tháo máy */}
                    <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-1.5 text-xs">
                      <strong className="text-amber-400 font-extrabold flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        <span>3 Khẩu Quyết Tháo Máy Sống Còn:</span>
                      </strong>
                      <p className="text-slate-300 leading-relaxed">
                        1. <strong>Rút nguồn bấm 3 lần</strong> xả sạch tụ trước khi chạm vào linh kiện.
                        <br />
                        2. <strong>Ốc nào khay nấy</strong> - tuyệt đối không để rơi ốc vào trong case máy.
                        <br />
                        3. <strong>Mở lẫy trước khi rút</strong> - cộm tay là dừng ngay, không dùng sức giật!
                      </p>
                    </div>
                  </div>

                  {/* CỘT PHẢI: 5 CỘT (HÌNH MINH HỌA) */}
                  <div className="lg:col-span-5 space-y-3">
                    <Card className="border-slate-200 bg-white shadow-xs overflow-hidden sticky top-20">
                      <CardHeader className="p-3.5 border-b border-slate-100 flex flex-row items-center justify-between pb-3">
                        <CardTitle className="text-xs sm:text-sm font-bold text-slate-800">
                          Minh Họa Bước {activeDisassemblyStep.stepNumber}
                        </CardTitle>
                        <span className="text-[11px] font-mono text-slate-500">Chạm để phóng to 🔍</span>
                      </CardHeader>
                      <CardContent className="p-3.5 space-y-2">
                        <div
                          onClick={() =>
                            setZoomedImage({
                              src: activeDisassemblyStep.imageSrc,
                              alt: activeDisassemblyStep.imageAlt,
                              title: `Bước ${activeDisassemblyStep.stepNumber}: ${activeDisassemblyStep.title}`,
                            })
                          }
                          className="relative w-full aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 cursor-pointer group shadow-inner"
                        >
                          <Image
                            src={activeDisassemblyStep.imageSrc}
                            alt={activeDisassemblyStep.imageAlt}
                            fill
                            className="object-contain p-2 group-hover:scale-102 transition-transform duration-300"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                          />
                          <div className="absolute bottom-2 right-2 bg-slate-900/80 text-white p-1.5 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity">
                            <ZoomIn className="w-4 h-4" />
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 italic text-center leading-tight">
                          {activeDisassemblyStep.imageAlt}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* SUBTAB 2: QUY TRÌNH LẮP MÁY (7 BƯỚC POKA-YOKE TỪ LINH KIỆN VÀO CASE)*/}
            {/* ------------------------------------------------------------------ */}
            {assemblySubTab === "assembly" && (
              <div className="space-y-4">
                {/* Dàn nút chuyển nhanh 7 bước lắp */}
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 -mx-3 px-3 sm:mx-0 sm:px-0">
                  <span className="text-xs font-bold text-slate-500 shrink-0 hidden md:inline">
                    Các bước lắp:
                  </span>
                  {ASSEMBLY_STEPS.map((step) => {
                    const isCurrent = step.id === activeAssemblyStepId;
                    const isDone = Boolean(checkedAssembly[step.id]);
                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => setActiveAssemblyStepId(step.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer min-h-[40px] sm:min-h-[44px] ${
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
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {isDone ? "✓" : step.stepNumber}
                        </span>
                        <span>{step.shortName}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Bố cục 2 cột */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                  {/* CỘT TRÁI: 7 CỘT */}
                  <div className="lg:col-span-7 space-y-4">
                    <Card className="border-slate-200 bg-white shadow-xs">
                      <CardHeader className="p-4 sm:p-5 border-b border-slate-100">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono text-xs font-bold">
                            BƯỚC LẮP {activeAssemblyStep.stepNumber} / {ASSEMBLY_STEPS.length}
                          </span>
                          <span className="text-xs font-medium text-slate-500">
                            Dụng cụ: <strong className="text-slate-800">{activeAssemblyStep.tool}</strong>
                          </span>
                        </div>
                        <CardTitle className="text-lg sm:text-xl font-black text-slate-900 mt-2">
                          {activeAssemblyStep.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                        {/* Thao tác kỹ thuật */}
                        <div>
                          <strong className="text-slate-900 block font-bold mb-1.5 flex items-center gap-1.5">
                            <Wrench className="w-4 h-4 text-slate-700" />
                            <span>Thao Tác Kỹ Thuật Chuẩn:</span>
                          </strong>
                          <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                            {activeAssemblyStep.action}
                          </p>
                        </div>

                        {/* Sai sót thường gặp */}
                        <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-950 space-y-2">
                          <strong className="font-extrabold flex items-center gap-1.5 text-amber-900">
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                            <span>Ghi Chú Sai Sót Dễ Mắc Phải:</span>
                          </strong>
                          <ul className="space-y-1 pl-4 list-disc text-xs text-amber-900/90 leading-relaxed">
                            {activeAssemblyStep.commonMistakes.map((m, idx) => (
                              <li key={idx}>{m}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Chuẩn Poka-Yoke */}
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
                          <ShieldAlert className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <div className="text-xs leading-relaxed">
                            <strong className="font-extrabold text-emerald-900">An toàn Poka-Yoke: </strong>
                            <span>{activeAssemblyStep.pokaYoke}</span>
                          </div>
                        </div>

                        {/* Checkbox hoàn thành */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-bold text-slate-800 select-none">
                            <input
                              type="checkbox"
                              checked={Boolean(checkedAssembly[activeAssemblyStep.id])}
                              onChange={() => handleToggleAssembly(activeAssemblyStep.id)}
                              className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                            />
                            <span>Em đã kiểm tra an toàn và hoàn thành bước này</span>
                          </label>

                          <span className="text-xs font-mono text-slate-400">
                            {Boolean(checkedAssembly[activeAssemblyStep.id]) ? "ĐÃ XÁC NHẬN ✓" : "CHƯA XÁC NHẬN"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 3 Khẩu quyết lắp máy */}
                    <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-1.5 text-xs">
                      <strong className="text-amber-400 font-extrabold flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        <span>3 Khẩu Quyết Lắp Máy Sống Còn:</span>
                      </strong>
                      <p className="text-slate-300 leading-relaxed">
                        1. <strong>Đếm đủ trụ đệm Standoff</strong> - quên trụ đệm là chập nổ bo mạch.
                        <br />
                        2. <strong>So đúng rãnh khuyết lệch</strong> - tuyệt đối không dùng sức ấn cố đè linh kiện.
                        <br />
                        3. <strong>Dây màn hình cắm vào Card rời</strong> - không cắm lên cổng bo mạch chủ!
                      </p>
                    </div>
                  </div>

                  {/* CỘT PHẢI: 5 CỘT (HÌNH MINH HỌA) */}
                  <div className="lg:col-span-5 space-y-3">
                    <Card className="border-slate-200 bg-white shadow-xs overflow-hidden sticky top-20">
                      <CardHeader className="p-3.5 border-b border-slate-100 flex flex-row items-center justify-between pb-3">
                        <CardTitle className="text-xs sm:text-sm font-bold text-slate-800">
                          Minh Họa Bước {activeAssemblyStep.stepNumber}
                        </CardTitle>
                        <span className="text-[11px] font-mono text-slate-500">Chạm để phóng to 🔍</span>
                      </CardHeader>
                      <CardContent className="p-3.5 space-y-2">
                        <div
                          onClick={() =>
                            setZoomedImage({
                              src: activeAssemblyStep.imageSrc,
                              alt: activeAssemblyStep.imageAlt,
                              title: `Bước ${activeAssemblyStep.stepNumber}: ${activeAssemblyStep.title}`,
                            })
                          }
                          className="relative w-full aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 cursor-pointer group shadow-inner"
                        >
                          <Image
                            src={activeAssemblyStep.imageSrc}
                            alt={activeAssemblyStep.imageAlt}
                            fill
                            className="object-contain p-2 group-hover:scale-102 transition-transform duration-300"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                          />
                          <div className="absolute bottom-2 right-2 bg-slate-900/80 text-white p-1.5 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity">
                            <ZoomIn className="w-4 h-4" />
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 italic text-center leading-tight">
                          {activeAssemblyStep.imageAlt}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* SUBTAB 3: 4 KỸ NĂNG CƠ KHÍ CỐT LÕI (RAM, VGA, F_PANEL, CMOS)        */}
            {/* ------------------------------------------------------------------ */}
            {assemblySubTab === "skills" && (
              <div className="space-y-4">
                {/* 4 Nút chọn kỹ năng */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                  {CORE_SKILLS.map((skill) => {
                    const isSelected = skill.id === selectedSkillId;
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => setSelectedSkillId(skill.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[64px] ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900 ring-offset-2"
                            : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`text-[10px] font-black uppercase font-mono tracking-wider ${
                            isSelected ? "text-amber-400" : "text-slate-400"
                          }`}
                        >
                          {skill.badge}
                        </span>
                        <strong className="text-xs sm:text-sm font-extrabold line-clamp-1 mt-1">
                          {skill.name}
                        </strong>
                      </button>
                    );
                  })}
                </div>

                {/* Khung nội dung chi tiết của Kỹ năng được chọn */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                  {/* CỘT TRÁI: 7 CỘT */}
                  <div className="lg:col-span-7 space-y-4">
                    <Card className="border-slate-200 bg-white shadow-xs">
                      <CardHeader className="p-4 sm:p-5 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-mono text-xs font-black">
                            {selectedSkill.badge}
                          </span>
                        </div>
                        <CardTitle className="text-lg sm:text-xl font-black text-slate-900 mt-2">
                          {selectedSkill.name}
                        </CardTitle>
                        <p className="text-xs text-slate-500 font-medium mt-1">
                          {selectedSkill.subtitle}
                        </p>
                      </CardHeader>

                      <CardContent className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                        {/* Dụng cụ cần thiết */}
                        <div>
                          <strong className="text-slate-900 block font-bold mb-1.5 flex items-center gap-1.5">
                            <Wrench className="w-4 h-4 text-slate-700" />
                            <span>Dụng Cụ Cần Chuẩn Bị:</span>
                          </strong>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                            {selectedSkill.tools.map((t, idx) => (
                              <li key={idx} className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Quy trình thao tác từng bước */}
                        <div>
                          <strong className="text-slate-900 block font-bold mb-1.5 flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-blue-600" />
                            <span>Quy Trình Thao Tác Kỹ Thuật (Step-by-Step):</span>
                          </strong>
                          <ol className="space-y-2 text-xs sm:text-sm text-slate-700 list-decimal pl-4 bg-slate-50/60 p-3 rounded-xl border border-slate-200 leading-relaxed">
                            {selectedSkill.steps.map((st, idx) => (
                              <li key={idx} className="pl-1">
                                {st}
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Bẫy lỗi và sai sót nguy hiểm */}
                        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-950 space-y-2">
                          <strong className="font-extrabold flex items-center gap-1.5 text-rose-900">
                            <AlertTriangle className="w-4 h-4 text-rose-600" />
                            <span>Bẫy Lỗi &amp; Sai Sót Nguy Hiểm Dễ Mắc Phải:</span>
                          </strong>
                          <ul className="space-y-1.5 pl-4 list-disc text-xs text-rose-900/90 leading-relaxed">
                            {selectedSkill.mistakes.map((mis, idx) => (
                              <li key={idx}>{mis}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Mẹo KTV & Poka-Yoke */}
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
                          <ShieldAlert className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <div className="text-xs leading-relaxed">
                            <strong className="font-extrabold text-emerald-900">Mẹo KTV Thực Chiến &amp; Poka-Yoke: </strong>
                            <span>{selectedSkill.pokaYoke}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* CỘT PHẢI: 5 CỘT (HÌNH MINH HỌA PHÓNG TO) */}
                  <div className="lg:col-span-5 space-y-3">
                    <Card className="border-slate-200 bg-white shadow-xs overflow-hidden sticky top-20">
                      <CardHeader className="p-3.5 border-b border-slate-100 flex flex-row items-center justify-between pb-3">
                        <CardTitle className="text-xs sm:text-sm font-bold text-slate-800">
                          Sơ Đồ Thực Hành Trực Quan
                        </CardTitle>
                        <span className="text-[11px] font-mono text-slate-500">Chạm để phóng to 🔍</span>
                      </CardHeader>
                      <CardContent className="p-3.5 space-y-2">
                        <div
                          onClick={() =>
                            setZoomedImage({
                              src: selectedSkill.imageSrc,
                              alt: selectedSkill.imageAlt,
                              title: selectedSkill.name,
                            })
                          }
                          className="relative w-full aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 cursor-pointer group shadow-inner"
                        >
                          <Image
                            src={selectedSkill.imageSrc}
                            alt={selectedSkill.imageAlt}
                            fill
                            className="object-contain p-2 group-hover:scale-102 transition-transform duration-300"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                          />
                          <div className="absolute bottom-2 right-2 bg-slate-900/80 text-white p-1.5 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity">
                            <ZoomIn className="w-4 h-4" />
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 italic text-center leading-tight">
                          {selectedSkill.imageAlt}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================================== */}
        {/* PHÂN HỆ 2: BẢN ĐỒ BẮT BỆNH 60 GIÂY (CHẨN ĐOÁN TRỰC QUAN)             */}
        {/* ==================================================================== */}
        {activeMainTab === "diagnostics" && (
          <div className="space-y-4 sm:space-y-6">
            <Card className="border-slate-200 bg-white shadow-xs">
              <CardHeader className="p-4 sm:p-6 pb-3 border-b border-slate-100">
                <CardTitle className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span>Bản Đồ Bắt Bệnh 60 Giây: Cứu Sống Máy Không Lên Hình</span>
                </CardTitle>
                <p className="text-xs text-slate-500">
                  85% máy tính phòng thực hành không hoạt động là do lỏng dây hoặc bẩn chân RAM. Chọn đúng triệu chứng mắt thấy để xem hướng dẫn:
                </p>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 pt-4 space-y-4 sm:space-y-6">
                {/* 5 Phím chọn ca bệnh (Vuốt ngang mượt mà trên di động) */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
                  {DIAGNOSTIC_CASES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCaseId(c.id)}
                      className={`p-2.5 sm:p-3 rounded-2xl border text-left cursor-pointer transition-all min-h-[56px] sm:min-h-[64px] ${
                        selectedCaseId === c.id
                          ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900 ring-offset-2"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                      }`}
                    >
                      <div className="font-mono text-[10px] sm:text-xs font-black mb-0.5 sm:mb-1 opacity-75">
                        {c.name.split(":")[0]}
                      </div>
                      <div className="font-extrabold text-[11px] sm:text-xs line-clamp-2 leading-snug">
                        {c.name.split(":")[1]}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Hộp chi tiết xử lý ca bệnh đang chọn */}
                <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-900 text-white border border-slate-700 shadow-xl space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="space-y-0.5">
                      <span className="text-amber-400 font-mono text-[10px] sm:text-xs font-black tracking-wide">
                        CHẨN ĐOÁN KỸ THUẬT VIÊN
                      </span>
                      <h3 className="text-base sm:text-xl font-black text-white">
                        {activeCase.name}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[11px] sm:text-xs font-mono font-bold border border-slate-700 w-fit">
                      Dụng cụ: {activeCase.tool}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                      <div className="font-bold text-amber-400 uppercase tracking-wide text-[11px] sm:text-xs">
                        Triệu chứng mắt thấy:
                      </div>
                      <p className="text-slate-300 leading-relaxed font-medium">
                        {activeCase.symptom}
                      </p>
                    </div>

                    <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                      <div className="font-bold text-rose-400 uppercase tracking-wide text-[11px] sm:text-xs">
                        Nguyên nhân gốc (Thủ phạm):
                      </div>
                      <p className="text-slate-300 leading-relaxed font-medium">
                        {activeCase.rootCause}
                      </p>
                    </div>
                  </div>

                  {/* Các bước xử lý chi tiết */}
                  <div className="space-y-2 pt-1 sm:pt-2">
                    <div className="font-black text-[11px] sm:text-xs uppercase tracking-wider text-emerald-400">
                      Các bước tay em làm để cứu sống máy trong 3 phút:
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                      {activeCase.quickFix.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed bg-slate-800/40 p-2 sm:p-2.5 rounded-xl border border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ảnh thực tế của ca chẩn đoán */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-300">
                        Minh Họa Thao Tác Chữa Bệnh Phòng Lab:
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setZoomedImage({
                            src: activeCase.imageSrc,
                            alt: activeCase.imageAlt,
                            title: activeCase.name,
                          })
                        }
                        className="h-7 px-2.5 text-[11px] font-bold text-slate-200 border-slate-700 bg-slate-800 hover:bg-slate-700 cursor-pointer"
                      >
                        <ZoomIn className="w-3 h-3 mr-1 text-emerald-400" />
                        Phóng to máy chiếu
                      </Button>
                    </div>
                    <div
                      onClick={() =>
                        setZoomedImage({
                          src: activeCase.imageSrc,
                          alt: activeCase.imageAlt,
                          title: activeCase.name,
                        })
                      }
                      className="relative w-full aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden border border-slate-700 cursor-pointer group"
                    >
                      <Image
                        src={activeCase.imageSrc}
                        alt={activeCase.imageAlt}
                        fill
                        className="object-contain p-2 group-hover:scale-102 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, 60vw"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 italic text-center">
                      {activeCase.imageAlt}
                    </p>
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
          <div className="space-y-4 sm:space-y-6">
            <Card className="border-slate-200 bg-white shadow-xs">
              <CardHeader className="p-4 sm:p-6 pb-3 border-b border-slate-100">
                <CardTitle className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  <span>Giải Mã Thùng Máy Trong 5 Phút: 5 Món Đồ Lớn &amp; 4 Sợi Dây</span>
                </CardTitle>
                <p className="text-xs text-slate-500">
                  Đừng sợ thùng máy nhiều dây! Máy tính giống như bộ xếp hình Lego: Chỉ có 5 món đồ lớn và 4 vị trí cắm dây sống còn.
                </p>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 pt-4 space-y-5 sm:space-y-6">
                {/* 5 MÓN ĐỒ LỚN */}
                <div className="space-y-2.5 sm:space-y-3">
                  <h4 className="font-black text-xs sm:text-sm uppercase tracking-wide text-slate-700">
                    1. Năm (05) món đồ lớn nhìn bằng mắt thường:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                    {[
                      {
                        title: "1. Cục Nguồn (PSU)",
                        sub: "Trái tim bơm điện",
                        desc: "Hộp sắt vuông to ở góc thùng máy có chùm dây thò ra. Công tắc sau lưng: bật sang 'I' là có điện, 'O' là tắt điện.",
                        bad: "Công tắc ở 'O' hoặc đứt dây làm máy im re.",
                        imageSrc: "/images/ol-01/comp-psu.jpg",
                        imageAlt: "Bộ nguồn máy tính ATX PSU với công tắc I/O và chùm dây cáp",
                      },
                      {
                        title: "2. Bo Mạch Chủ (Mainboard H510)",
                        sub: "Nền nhà & đường đi",
                        desc: "Tấm bảng to nhất áp sát vách máy (MSI, ASUS, Winnfox). Có socket CPU LGA1200, 2 khe RAM DDR4 và viên pin đồng xu CMOS CR2032 nuôi đồng hồ.",
                        bad: "Cháy tụ, hết pin CMOS làm sai ngày giờ.",
                        imageSrc: "/images/ol-01/main-h510-compare.jpg",
                        imageAlt: "3 Dòng bo mạch chủ MSI, ASUS, Winnfox H510 chuẩn phòng thực hành",
                      },
                      {
                        title: "3. CPU & Quạt Tản Nhiệt",
                        sub: "Bộ não tính toán",
                        desc: "Miếng kim loại vuông nhỏ dưới đáy quạt. Giữa lưng CPU và đáy quạt có lớp keo tản nhiệt xám. Dây quạt cắm chân CPU_FAN.",
                        bad: "Khô keo, kẹt quạt làm máy nóng tự tắt.",
                        imageSrc: "/images/ol-01/comp-cpu-fan.jpg",
                        imageAlt: "CPU Intel và cụm quạt tản nhiệt nhôm stock heatsink fan",
                      },
                      {
                        title: "4. Thanh RAM (DDR4 8GB)",
                        sub: "Mặt bàn làm việc",
                        desc: "Thanh mạch dài bằng ngón tay cái, chân vàng mạ đồng, rãnh khuyết lệch một bên và 2 tai khóa ở 2 đầu khe cắm.",
                        bad: "Bẩn chân vàng làm màn hình đen (80% ca bệnh).",
                        imageSrc: "/images/ol-01/ram-ddr4.jpg",
                        imageAlt: "Thanh RAM DDR4 8GB Bus 2666/3200MHz với rãnh khuyết lệch",
                      },
                      {
                        title: "5. Ổ Cứng SSD 128/256GB",
                        sub: "Tủ cất hồ sơ",
                        desc: "Hộp mỏng nhẹ bằng bàn tay chứa Windows 10 và toàn bộ tài liệu của khách. Đít ổ có 2 khe cắm hình chữ L.",
                        bad: "Cấm làm rơi và cấm format nhầm ổ chứa dữ liệu.",
                        imageSrc: "/images/ol-01/comp-ssd-sata.jpg",
                        imageAlt: "Ổ cứng SSD 2.5 inch SATA III và cổng kết nối chữ L",
                      },
                      {
                        title: "Card Đồ Họa Rời GT 730",
                        sub: "Cửa sổ xuất hình",
                        desc: "Card màn hình rời NVIDIA GT 730 2GB cắm vào khe PCIe x16. BẮT BUỘC cắm dây màn hình vào card này mới lên hình.",
                        bad: "Cắm nhầm dây lên cổng Mainboard làm màn đen.",
                        imageSrc: "/images/ol-01/vga-gt730.jpg",
                        imageAlt: "Card màn hình rời NVIDIA GeForce GT 730 2GB GDDR5",
                      },
                    ].map((item, i) => (
                      <div key={i} className="p-3.5 sm:p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="font-extrabold text-xs sm:text-sm text-slate-900">{item.title}</div>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">{item.sub}</span>
                          </div>
                          
                          {/* Real component image preview */}
                          <div
                            onClick={() =>
                              setZoomedImage({
                                src: item.imageSrc,
                                alt: item.imageAlt,
                                title: item.title,
                              })
                            }
                            className="relative w-full aspect-[16/10] bg-white rounded-xl overflow-hidden border border-slate-200 cursor-pointer group"
                          >
                            <Image
                              src={item.imageSrc}
                              alt={item.imageAlt}
                              fill
                              className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-200"
                              sizes="(max-width: 640px) 100vw, 30vw"
                            />
                            <div className="absolute top-1.5 right-1.5 bg-slate-900/70 text-white rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ZoomIn className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                        <div className="text-[11px] text-rose-700 font-semibold pt-1 border-t border-slate-200">
                          ⚠️ Hay lỗi: {item.bad}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4 SỢI DÂY SỐNG CÒN */}
                <div className="space-y-2.5 sm:space-y-3 pt-2 border-t border-slate-100">
                  <h4 className="font-black text-xs sm:text-sm uppercase tracking-wide text-slate-700">
                    2. Bốn (04) sợi dây duy nhất em cần biết cắm:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {[
                      {
                        name: "Dây 1: Cấp nguồn 24 chân (To nhất)",
                        pin: "24 lỗ",
                        plug: "Cắm vào ổ 24 lỗ ở mép phải bo mạch Mainboard.",
                        warn: "Quên cắm là máy không lên điện.",
                        imageSrc: "/images/ol-01/wire-24pin-atx.jpg",
                        imageAlt: "Đầu cáp nguồn chính 24-pin ATX có lẫy khóa an toàn",
                      },
                      {
                        name: "Dây 2: Cấp nguồn CPU 4/8 chân",
                        pin: "4 hoặc 8 lỗ vuông (Vàng-Đen)",
                        plug: "Cắm vào ổ góc trên cùng, sát cạnh quạt CPU.",
                        warn: "Quên cắm là quạt quay mà máy không lên hình!",
                        imageSrc: "/images/ol-01/wire-8pin-cpu.jpg",
                        imageAlt: "Cáp nguồn phụ CPU 4/8-pin ATX12V vàng đen",
                      },
                      {
                        name: "Dây 3: Cặp dây chữ L ở đít Ổ cứng",
                        pin: "1 dây nguồn dẹt + 1 cáp SATA nhỏ",
                        plug: "Cắm khớp khe chữ L đít ổ; đầu cáp nhỏ nối xuống cổng SATA bo mạch.",
                        warn: "Quên cắm là báo lỗi No Bootable Device.",
                        imageSrc: "/images/ol-01/wire-sata.jpg",
                        imageAlt: "Cáp dữ liệu SATA lẫy kim loại và cáp nguồn SATA dẹt",
                      },
                      {
                        name: "Dây 4: Dây nút bấm mở máy (POWER SW)",
                        pin: "Đầu nhựa nhỏ chữ POWER SW",
                        plug: "Cắm vào ĐÚNG 2 chân kim sát cạnh chỗ trống mất kim trên cụm F_PANEL.",
                        warn: "Cắm sai là bấm nút mở máy ngoài vỏ không phản ứng.",
                        imageSrc: "/images/ol-01/wire-fpanel-power-sw.jpg",
                        imageAlt: "Cụm chân kim F_PANEL và dây cắm POWER SW",
                      },
                    ].map((wire, idx) => (
                      <div key={idx} className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-xs sm:text-sm text-slate-900">{wire.name}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">{wire.pin}</span>
                          </div>

                          {/* Wire image preview */}
                          <div
                            onClick={() =>
                              setZoomedImage({
                                src: wire.imageSrc,
                                alt: wire.imageAlt,
                                title: wire.name,
                              })
                            }
                            className="relative w-full aspect-[16/9] bg-slate-50 rounded-xl overflow-hidden border border-slate-100 cursor-pointer group"
                          >
                            <Image
                              src={wire.imageSrc}
                              alt={wire.imageAlt}
                              fill
                              className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-200"
                              sizes="(max-width: 640px) 100vw, 50vw"
                            />
                            <div className="absolute top-1.5 right-1.5 bg-slate-900/70 text-white rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ZoomIn className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          <p className="text-xs text-slate-600">{wire.plug}</p>
                        </div>
                        <div className="text-[11px] text-amber-700 font-medium pt-1 border-t border-slate-100">⚠️ {wire.warn}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. CHUYÊN ĐỀ 3 DÒNG MAINBOARD PHÒNG THỰC HÀNH (MSI · ASUS · WINNFOX) */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-black text-xs sm:text-sm uppercase tracking-wide text-slate-900 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center font-mono text-[11px] font-black">2</span>
                      <span>Chuyên Đề: 3 Dòng Bo Mạch H510 Phòng Thực Hành (MSI · ASUS · WINNFOX)</span>
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500 font-bold">Chuẩn Socket LGA1200 · DDR4</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Phòng máy thực hành được trang bị 3 thương hiệu bo mạch chủ chipset Intel H510: <strong>MSI</strong>, <strong>ASUS</strong> và <strong>Winnfox</strong>. Học viên cần phân biệt rõ phím tắt Boot Menu/BIOS, cơ chế báo lỗi và kiểu lẫy khe RAM để thao tác chính xác tại mọi bàn kỹ thuật:
                  </p>

                  {/* 3 Cards chọn thương hiệu */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {LAB_MOTHERBOARDS.filter((b) => b.id !== "compare").map((b) => (
                      <div
                        key={b.id}
                        className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-slate-400 transition-all flex flex-col justify-between space-y-3 shadow-xs"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-slate-900">{b.name}</span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                              {b.badge.split(" · ")[1] || "Phổ thông"}
                            </span>
                          </div>

                          <div
                            onClick={() =>
                              setZoomedImage({
                                src: b.imageSrc,
                                alt: b.imageAlt,
                                title: b.name,
                              })
                            }
                            className="relative w-full aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 cursor-pointer group shadow-inner"
                          >
                            <Image
                              src={b.imageSrc}
                              alt={b.imageAlt}
                              fill
                              className="object-contain p-2 group-hover:scale-105 transition-transform duration-200"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute top-2 right-2 bg-slate-900/80 text-white rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ZoomIn className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          <div className="space-y-1.5 text-xs">
                            <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                              <span className="text-slate-500 font-bold">🚀 Boot Menu:</span>
                              <span className="font-mono font-black text-rose-600">{b.bootKey}</span>
                            </div>
                            <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                              <span className="text-slate-500 font-bold">🔑 Vào BIOS:</span>
                              <span className="font-mono font-bold text-slate-800">{b.biosKey}</span>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700 leading-snug">
                              <strong className="text-slate-900 block font-bold mb-0.5">💡 Báo Lỗi:</strong>
                              <span>{b.debugMethod}</span>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700 leading-snug">
                              <strong className="text-slate-900 block font-bold mb-0.5">🕹️ Lẫy RAM &amp; F_PANEL:</strong>
                              <span>{b.ramLatchType} · {b.fpanelLabel}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 leading-snug">
                          <strong>⚠️ Mẹo KTV:</strong> {b.ktvTip}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Banner Infographic So Sánh Tổng Hợp */}
                  <div
                    onClick={() =>
                      setZoomedImage({
                        src: "/images/ol-01/main-h510-compare.jpg",
                        alt: "Bản đồ đối chiếu so sánh 3 dòng bo mạch chủ MSI vs ASUS vs Winnfox H510",
                        title: "Bản Đồ Đối Chiếu 3 Dòng Bo Mạch H510 Phòng Thực Hành (MSI · ASUS · WINNFOX)",
                      })
                    }
                    className="p-3 sm:p-4 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-3 cursor-pointer group hover:bg-slate-800 transition-colors shadow-md border border-slate-700"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-mono text-[10px] font-black uppercase">
                          INFOGRAPHIC KTV ĐỘC QUYỀN
                        </span>
                        <span className="text-xs text-amber-300 font-bold">Chạm để phóng to máy chiếu 🔍</span>
                      </div>
                      <div className="text-sm sm:text-base font-black text-white">
                        Bảng Đối Chiếu So Sánh 3 Dòng Bo Mạch H510 (MSI · ASUS · WINNFOX)
                      </div>
                      <p className="text-xs text-slate-400">
                        Đối chiếu chi tiết phím tắt Boot/BIOS, 4 đèn EZ Debug LED vs Loa Buzzer, kiểu lẫy khóa RAM và chân kim F_PANEL.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 bg-white/10 px-3 py-2 rounded-xl text-xs font-bold text-white group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      <ZoomIn className="w-4 h-4" />
                      <span>Xem Sơ Đồ So Sánh</span>
                    </div>
                  </div>
                </div>

                {/* 3. BẢN ĐỒ MỞ RỘNG KIẾN THỨC THỊ TRƯỜNG CHO HỌC SINH 9+3 */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-black text-xs sm:text-sm uppercase tracking-wide text-slate-900 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center font-mono text-[11px] font-black">3</span>
                      <span>Bản Đồ Mở Rộng Kiến Thức Thị Trường Cho Học Sinh 9+3</span>
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500 font-bold">H · B · Z | CPU K, F, H | DDR3, DDR4, DDR5</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ngoài cấu hình phòng máy thực hành (H510 + i5 Gen 10/11 + RAM DDR4 + GT 730), khi đi làm thực tế ngoài thị trường, kỹ thuật viên sẽ gặp rất nhiều cấu hình phân khúc khác nhau tùy vào túi tiền và nhu cầu của khách hàng:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Phân khúc Mainboard */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-blue-600" />
                        <span>Phân Khúc Bo Mạch Chủ (Mainboard)</span>
                      </div>
                      <div className="space-y-1.5 text-slate-700 leading-relaxed">
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          <strong className="text-slate-900">Dòng H (H510, H610):</strong> Phổ thông, văn phòng, phòng lab thực hành, giá rẻ, tính năng cơ bản.
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          <strong className="text-slate-900">Dòng B (B560, B660, B760):</strong> Tầm trung, gaming, đồ họa, tản nhiệt VRM tốt, hỗ trợ nhiều khe M.2 và 4 khe RAM.
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          <strong className="text-slate-900">Dòng Z (Z590, Z690, Z790):</strong> Cao cấp, cho phép ép xung (Overclock), nhiều cổng kết nối, linh kiện chuẩn quân đội.
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-slate-200 text-[11px]">
                          <strong className="text-slate-900">Phân khúc AMD:</strong> A520 (phổ thông), B550 (tầm trung), X570 (cao cấp).
                        </div>
                      </div>
                    </div>

                    {/* Quy tắc đọc CPU */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span>Quy Tắc Đọc Tên CPU &amp; Hậu Tố</span>
                      </div>
                      <div className="space-y-1.5 text-slate-700 leading-relaxed">
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          <strong className="text-slate-900">Thế hệ CPU (Gen):</strong> Số hàng nghìn đầu tiên (Core i5-<strong>10</strong>400 là Gen 10, i5-<strong>11</strong>400 là Gen 11, i5-<strong>12</strong>400 là Gen 12).
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          <strong className="text-rose-600">Hậu tố F (i5-10400F):</strong> KHÔNG tích hợp đồ họa. Bắt buộc phải cắm Card màn hình rời GT 730 mới lên hình!
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          <strong className="text-slate-900">Hậu tố K / KF:</strong> Cho phép ép xung mở khóa nhân (Unlocked). KF vừa ép xung vừa không có GPU.
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-slate-200 text-[11px]">
                          <strong className="text-slate-900">H / HX / U (Laptop):</strong> H/HX là chip hiệu năng cao cho laptop gaming/đồ họa; U là chip tiết kiệm điện cho văn phòng.
                        </div>
                      </div>
                    </div>

                    {/* Đời RAM & Bus */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-emerald-600" />
                        <span>Các Đời RAM, Tần Số Bus &amp; Dual-Channel</span>
                      </div>
                      <div className="space-y-1.5 text-slate-700 leading-relaxed">
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          <strong className="text-slate-900">DDR3:</strong> Khe cắm cũ, khuyết chính giữa, Bus 1333 / 1600 MHz.
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          <strong className="text-emerald-700">DDR4 (Chuẩn phòng lab):</strong> Rãnh khuyết lệch một bên, Bus 2400 / 2666 / 3200 MHz.
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          <strong className="text-slate-900">DDR5 (Thế hệ mới):</strong> Rãnh khuyết gần giữa, tích hợp chip quản lý nguồn PMIC, Bus 4800 / 5600 / 6000+ MHz.
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-slate-200 text-[11px]">
                          <strong className="text-slate-900">Dual-Channel:</strong> Cắm 2 thanh cùng dung lượng và bus để tăng gấp đôi băng thông truyền dữ liệu (mặt bàn 2 làn xe).
                        </div>
                      </div>
                    </div>
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
          <div className="space-y-4 sm:space-y-6">
            <Card className="border-slate-200 bg-white shadow-xs">
              <CardHeader className="p-4 sm:p-6 pb-3 border-b border-slate-100">
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
                    {isAllCompleted ? "✓ ĐỦ ĐIỀU KIỆN" : `CÒN THIẾU ${totalSteps - completedCount} BƯỚC`}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Nhập mã số máy thực hành phòng lab (01 - 36), thông số đo nhiệt độ tải HWMonitor và thông tin nhóm KTV để hoàn thiện hồ sơ nghề.
                </p>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 pt-4 sm:pt-5">
                {/* 3 ĐIỂM DỪNG POKA-YOKE TỔNG HỢP */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 mb-5 sm:mb-6 text-xs">
                  <div className="font-extrabold text-slate-900 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" />
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
                  <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-emerald-950">
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
                        className="border-emerald-300 text-emerald-900 hover:bg-emerald-100 cursor-pointer min-h-[44px]"
                      >
                        <RotateCcw className="w-4 h-4 mr-1.5" />
                        Chỉnh sửa hoặc Nộp lại
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReport} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      {/* Số máy: text-base chống iOS Safari auto-zoom */}
                      <div className="space-y-1.5">
                        <Label htmlFor="machine-num" className="text-xs font-bold text-slate-800">
                          Số Máy Thực Hành <span className="text-rose-600">*</span>
                        </Label>
                        <Input
                          id="machine-num"
                          inputMode="text"
                          placeholder="Ví dụ: Máy 08 (từ 01 - 36)"
                          value={machineNumber}
                          onChange={(e) => setMachineNumber(e.target.value)}
                          required
                          className="border-slate-300 text-base sm:text-sm h-12 sm:h-11"
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
                          className="w-full h-12 sm:h-11 px-3 rounded-xl border border-slate-300 bg-white text-base sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
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
                          inputMode="numeric"
                          placeholder="Ví dụ: 38 (dưới 75°C là đạt)"
                          value={cpuTemp}
                          onChange={(e) => setCpuTemp(e.target.value)}
                          className="border-slate-300 text-base sm:text-sm h-12 sm:h-11"
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
                        className="border-slate-300 text-base sm:text-sm h-12 sm:h-11"
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
                        className="w-full p-3 rounded-xl border border-slate-300 bg-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    {/* Nút Submit */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-xs text-slate-500">
                        {isAllCompleted ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            ✓ Đã tick đủ 7/7 bước. Nút nộp báo cáo đã sẵn sàng!
                          </span>
                        ) : (
                          <span className="text-amber-700 font-medium">
                            ⚠️ Cần tick xác nhận đủ 7 bước ở tab 'Quy Trình 7 Bước' để mở khóa nút nộp bài.
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
      {/* 3. THANH ĐIỀU HƯỚNG DƯỚI ĐÁY RIÊNG CHO DI ĐỘNG (MOBILE ACTION BAR)   */}
      {/* Giúp học sinh thao tác bằng 1 ngón tay cái mà không phải cuộn tìm nút */}
      {/* ==================================================================== */}
      {activeMainTab === "workflow7" && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 sm:hidden shadow-2xl flex items-center justify-between gap-2">
          {/* Nút lùi */}
          <Button
            variant="outline"
            size="sm"
            disabled={activeStepIndex === 0}
            onClick={handlePrevStep}
            className="h-11 px-3 text-xs font-bold border-slate-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>

          {/* Nút ở giữa: Tick xong bước hiện tại 1-chạm */}
          <button
            type="button"
            onClick={() => handleToggleStep(activeStep.id)}
            className={`flex-1 h-11 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-black transition-all cursor-pointer select-none active:scale-[0.98] ${
              isActiveStepDone
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                : "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200"
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isActiveStepDone ? "text-white" : "text-slate-400"}`} />
            <span>
              {isActiveStepDone ? `Bước ${activeStep.stepNumber}: Đã Xong ✓` : `Tick Xong Bước ${activeStep.stepNumber}`}
            </span>
          </button>

          {/* Nút tiến */}
          {activeStepIndex < totalSteps - 1 ? (
            <Button
              size="sm"
              onClick={handleNextStep}
              className="h-11 px-3 text-xs font-bold bg-slate-900 text-white"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => setActiveMainTab("report")}
              className="h-11 px-3 text-xs font-bold bg-emerald-600 text-white"
            >
              <span>Nộp</span>
            </Button>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. MODAL PHÓNG TO ẢNH MÁY CHIẾU (PROJECTOR LIGHTBOX)                 */}
      {/* ==================================================================== */}
      {zoomedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 max-w-5xl w-full p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 sm:pb-3">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
                <h3 className="text-sm sm:text-lg font-black text-slate-900 truncate">
                  {zoomedImage.title}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setZoomedImage(null)}
                className="rounded-full hover:bg-slate-100 cursor-pointer h-8 w-8 sm:h-10 sm:w-10"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>

            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200">
              <Image
                src={zoomedImage.src}
                alt={zoomedImage.alt}
                fill
                className="object-contain p-2"
                sizes="95vw"
                priority
              />
            </div>

            <div className="flex items-center justify-between pt-1 sm:pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-mono text-[11px] sm:text-xs truncate mr-2">
                Ảnh độ nét cao cấu hình H510 phòng lab
              </span>
              <Button
                size="touch"
                onClick={() => setZoomedImage(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer h-10 sm:h-12 min-h-[40px] sm:min-h-[48px] px-4"
              >
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
