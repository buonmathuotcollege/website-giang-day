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
} from "lucide-react";

/**
 * Kiểu dữ liệu cho bước thực hành lắp ráp & ôn luyện phần cứng
 */
interface HardwareStep {
  id: string;
  stepNumber: number;
  title: string;
  role: string;
  timeEstimate: string;
  componentName: string;
  imageSrc: string;
  imageAlt: string;
  linkedHotspotId?: string;
  instructions: string[];
  pokaYoke: string;
  analogy: string;
  marketKnowledge: {
    category: string;
    content: string;
  };
}

/**
 * Danh sách 5 điểm Hotspot trên Bo Mạch MSI H510
 */
interface HotspotInfo {
  id: string;
  stepId: string;
  stepNumber: number;
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
    stepNumber: 1,
    title: "1. Socket LGA1200 (Vị trí CPU)",
    badge: "Intel Gen 10 / Gen 11",
    top: "33%",
    left: "40%",
    color: "bg-blue-600",
    description:
      "Socket LGA1200 với 1200 chân tiếp xúc kim bằng đồng. Tương thích CPU Intel Core i3, i5, i7 thế hệ 10 (Comet Lake) và 11 (Rocket Lake).",
    pokaYoke:
      "Căn đúng 2 vết khuyết hình bán nguyệt trên mép CPU trùng với 2 gờ nổi của socket. Thao tác đặt thẳng đứng, tuyệt đối KHÔNG làm cong gãy chân kim!",
  },
  {
    id: "ram-slots",
    stepId: "step-2",
    stepNumber: 2,
    title: "2. Khe Cắm RAM DDR4 (2 Khe DIMM)",
    badge: "DDR4 8GB · Dual-Channel",
    top: "33%",
    left: "70%",
    color: "bg-emerald-600",
    description:
      "2 khe cắm RAM chuẩn DDR4 hỗ trợ dung lượng tối đa 64GB, tần số Bus 2666MHz / 2933MHz / 3200MHz. Hỗ trợ chạy Dual-Channel tăng gấp đôi băng thông dữ liệu.",
    pokaYoke:
      "Soi đúng vị trí khe khuyết lệch của chuẩn DDR4. Ấn đều hai đầu thanh RAM đến khi 2 ngàm khóa tự ôm chặt, nguyên tắc Zero-force không dùng sức bẻ ép.",
  },
  {
    id: "pcie-x16",
    stepId: "step-3",
    stepNumber: 3,
    title: "3. Khe PCIe 3.0/4.0 x16 (Card Rời GT 730)",
    badge: "Băng Thông Đồ Họa Cao Cấp",
    top: "60%",
    left: "38%",
    color: "bg-amber-500",
    description:
      "Khe cắm card màn hình đồ họa chuyên dụng với băng thông tối đa 16 làn. Đây là nơi lắp ráp card rời NVIDIA GeForce GT 730 2GB GDDR5 của phòng thực hành.",
    pokaYoke:
      "Mở lẫy khóa đuôi khe trước khi cắm. Cắm dây xuất hình màn hình vào card GT 730, KHÔNG cắm vào cổng mainboard vì CPU đuôi F sẽ không có hình!",
  },
  {
    id: "sata-m2",
    stepId: "step-4",
    stepNumber: 4,
    title: "4. Cụm Cổng SATA III 6Gb/s & Khe M.2",
    badge: "Ổ Cứng SSD 128GB/256GB",
    top: "78%",
    left: "72%",
    color: "bg-indigo-600",
    description:
      "Gồm 4 cổng SATA III tốc độ 6Gb/s hình chữ L cho SSD 2.5\" và 1 khe cắm M.2 PCIe Gen3 x4 cho ổ cứng SSD NVMe tốc độ cao.",
    pokaYoke:
      "Cổng SATA có gờ chữ L định hướng chống cắm ngược. Siết ốc giữ SSD M.2 vừa tay với ren đồng bo mạch.",
  },
  {
    id: "power-atx",
    stepId: "step-1",
    stepNumber: 1,
    title: "5. Đầu Cấp Nguồn 24-Pin ATX & 8-Pin CPU",
    badge: "Điện Áp 12V / 5V / 3.3V",
    top: "40%",
    left: "87%",
    color: "bg-rose-600",
    description:
      "Cổng nguồn chính 24 chân ATX nuôi toàn bộ bo mạch và đầu nguồn 8-pin 12V (phía góc trên bên trái) cấp dòng điện riêng cho CPU Intel.",
    pokaYoke:
      "Cả hai đầu nối đều có ngàm gài nhựa khóa an toàn. Phải ấn thật chặt đến khi ngàm khóa ngậm khít để tránh đánh tia lửa điện gây cháy chân jack.",
  },
];

/**
 * Dữ liệu bài ôn luyện năng lực nghề: Phần cứng Máy tính (OL-01)
 */
const HARDWARE_STEPS: HardwareStep[] = [
  {
    id: "step-1",
    stepNumber: 1,
    title: "Khảo sát Bo Mạch H510 & Quy Chuẩn An Toàn Chống Tĩnh Điện (ESD)",
    role: "KTV 2 (Kiểm soát an toàn & Poka-Yoke)",
    timeEstimate: "5 phút",
    componentName: "Bo mạch chủ MSI H510M-A PRO",
    imageSrc: "/images/ol-01/main-h510.jpg",
    imageAlt: "Toàn cảnh bo mạch chủ MSI H510M-A PRO Socket LGA1200",
    linkedHotspotId: "socket-cpu",
    instructions: [
      "Trước khi chạm vào bất kỳ linh kiện nào, KTV chạm hai lòng bàn tay vào khung vỏ kim loại của case máy tính tối thiểu 5 giây để xả tĩnh điện tích tụ trên cơ thể (ESD).",
      "Kiểm tra dây nguồn 220V: Bắt buộc đã rút phích cắm khỏi ổ điện ít nhất 30 giây để toàn bộ tụ lọc nguồn trên bo mạch xả hết điện áp rò.",
      "Đặt bo mạch chủ MSI H510 lên mặt bàn sạch phẳng có lót xốp chống tĩnh điện hoặc thảm cao su cách điện. Tuyệt đối không đặt trực tiếp lên mặt bàn kim loại.",
      "Kiểm tra tổng thể: Bo mạch H510 trang bị Socket LGA1200 (hỗ trợ CPU Intel Gen 10 Comet Lake & Gen 11 Rocket Lake), 2 khe cắm RAM DDR4, 1 khe PCIe x16 cho card màn hình rời, và cụm cổng SATA III.",
    ],
    pokaYoke:
      "QUY TẮC AN TOÀN BẮT BUỘC: Tháo toàn bộ nhẫn, đồng hồ, vòng tay kim loại trước khi thao tác. Giữ các ốc vít trong khay nam châm, không để rơi tự do trên bề mặt mạch in.",
    analogy:
      "Như việc chạm tay vào tường trước khi chạm vào nắm đấm cửa sắt vào mùa đông: Xả tia lửa điện vô hình trước khi tia lửa làm thủng các bóng bán dẫn siêu nhỏ trong chip.",
    marketKnowledge: {
      category: "Phân khúc Bo Mạch Chủ (Mainboard) trên thị trường",
      content:
        "• Dòng H (H510, H610): Phổ thông, phòng lab thực hành, văn phòng, giá thành tiết kiệm, đủ tính năng cơ bản.\n• Dòng B (B560, B660, B760): Tầm trung cho đồ họa, gaming, tản nhiệt VRM tốt hơn, nhiều khe M.2 và 4 khe RAM.\n• Dòng Z (Z590, Z690, Z790): Cao cấp, cho phép ép xung CPU (Overclock), linh kiện chuẩn quân đội.\n• Phía AMD: A520 (phổ thông), B550 (tầm trung), X570 (cao cấp).",
    },
  },
  {
    id: "step-2",
    stepNumber: 2,
    title: "Lắp Đặt & Khóa Ngàm Thanh RAM 8GB Chuẩn DDR4",
    role: "KTV 1 (Thao tác chính / Operator)",
    timeEstimate: "6 phút",
    componentName: "Thanh RAM 8GB DDR4 Bus 2666/3200MHz",
    imageSrc: "/images/ol-01/ram-ddr4.jpg",
    imageAlt: "Cận cảnh thanh RAM DDR4 chân mạ vàng và khe khuyết lệch",
    linkedHotspotId: "ram-slots",
    instructions: [
      "Mở hai ngàm khóa nhựa màu đen ở hai đầu khe cắm RAM DDR4 (khe DIMMA1 hoặc DIMMB1) trên bo mạch H510.",
      "Cầm thanh RAM 8GB DDR4 bằng hai mép cạnh bên, tuyệt đối không chạm ngón tay vào hàng chân tiếp xúc mạ vàng.",
      "Soi khe khuyết lệch đặc trưng của chuẩn DDR4 trên thanh RAM sao cho trùng khớp với gờ nổi nhựa bên trong khe cắm của bo mạch chủ.",
      "Đặt thanh RAM thẳng góc 90 độ vào khe. Dùng hai ngón tay cái ấn đều nhẹ nhàng đồng thời vào hai đầu trên cùng của thanh RAM cho đến khi nghe tiếng 'TÁCH' dứt khoát và hai ngàm khóa tự động bật vào khớp giữ chặt thanh RAM.",
    ],
    pokaYoke:
      "NGUYÊN TẮC ZERO-FORCE INSERTION: Nếu cảm thấy cộm tay hoặc nặng lực, DỪNG LẠI NGAY! Kiểm tra lại chiều khe khuyết. Tuyệt đối không dùng sức ép hoặc ấn mạnh vì sẽ làm gãy chân ram hoặc toác khe cắm bo mạch.",
    analogy:
      "Như cắm chìa khóa vào ổ khóa: Răng chìa phải đúng chiều mới lọt êm. Cố dùng sức bẻ sẽ gãy chìa khóa ngay trong ổ.",
    marketKnowledge: {
      category: "Phân biệt các đời RAM & Kỹ thuật Dual-Channel",
      content:
        "• DDR3: Đời cũ, khe khuyết nằm chính giữa, Bus phổ biến 1333/1600 MHz.\n• DDR4: Cấu hình phòng lab hiện tại, khe khuyết đặt hơi lệch một bên, Bus 2400/2666/3200 MHz, tiết kiệm điện 1.2V.\n• DDR5: Thế hệ mới nhất, khe khuyết gần giữa nhưng mỏng hơn, tích hợp chip quản lý nguồn PMIC trực tiếp trên thanh, Bus từ 4800 đến 6400+ MHz.\n• Dual-Channel: Lắp 2 thanh cùng dung lượng để mở rộng băng thông gấp đôi (từ đường 1 làn thành đường 2 làn xe).",
    },
  },
  {
    id: "step-3",
    stepNumber: 3,
    title: "Lắp Card Màn Hình Rời NVIDIA GeForce GT 730 2GB vào Khe PCIe x16",
    role: "KTV 1 (Thao tác chính / Operator)",
    timeEstimate: "7 phút",
    componentName: "VGA NVIDIA GeForce GT 730 2GB GDDR5",
    imageSrc: "/images/ol-01/vga-gt730.jpg",
    imageAlt: "Card đồ họa rời NVIDIA GeForce GT 730 2GB GDDR5 chân cắm PCIe",
    linkedHotspotId: "pcie-x16",
    instructions: [
      "Xác định khe cắm dài PCIe 3.0/4.0 x16 bọc gia cố trên bo mạch H510. Dùng ngón tay mở nhẹ lẫy khóa an toàn ở phần đuôi khe cắm sang trạng thái mở.",
      "Tháo nẹp chắn kim loại tương ứng ở mặt sau thùng case máy tính (nếu lắp vào case).",
      "Cầm card GT 730 bằng thanh kim loại và mép bo mạch, căn chân tiếp xúc mạ vàng PCIe thẳng hàng với khe x16.",
      "Ấn card màn hình xuống thẳng góc với lực vừa phải cho đến khi chân card ngập hoàn toàn và lẫy khóa an toàn ở đuôi tự động gài kêu 'TÁCH'.",
      "Bắt ốc cố định thanh chắn kim loại của card vào khung thùng máy để chống xệ cổng.",
    ],
    pokaYoke:
      "ĐIỂM DỪNG BẮT BUỘC: Khi kết nối dây cáp màn hình trong phòng máy, BẮT BUỘC cắm vào cổng xuất hình (VGA/HDMI/DVI) của card GT 730. Tuyệt đối KHÔNG cắm vào cổng VGA trên bo mạch chủ (vì CPU có hậu tố F không có nhân đồ họa tích hợp, cắm vào main sẽ không lên hình)!",
    analogy:
      "Như chiếc tàu hỏa vào ga: Thanh ray phải gài then khóa để tàu không trật bánh. Cắm nhầm dây màn hình vào cổng main giống như gọi nhầm số điện thoại, máy vẫn chạy nhưng không ai trả lời.",
    marketKnowledge: {
      category: "Quy tắc đọc tên CPU Intel & Ý nghĩa hậu tố K, F, H",
      content:
        "• Thế hệ CPU: Số hàng nghìn đầu tiên (Core i5-10400 là Gen 10 Comet Lake; i5-11400 là Gen 11 Rocket Lake; i5-12400 là Gen 12 Alder Lake).\n• Hậu tố F (i5-10400F, i3-10105F): Cắt bỏ nhân đồ họa tích hợp -> BẮT BUỘC phải cắm card rời GT 730 mới hiển thị hình ảnh.\n• Hậu tố K (i7-10700K): Mở khóa nhân cho phép ép xung.\n• Hậu tố KF: Vừa ép xung được, vừa không có GPU tích hợp.\n• Hậu tố H / HX (Laptop): Chip hiệu năng cao đồ họa/chơi game; Hậu tố U: Tiết kiệm điện văn phòng.",
    },
  },
  {
    id: "step-4",
    stepNumber: 4,
    title: "Kết Nối Cáp Dữ Liệu & Nguồn Cho Ổ Cứng SSD 2.5\" SATA III / M.2",
    role: "KTV 1 & KTV 2 (Thao tác & Kiểm soát)",
    timeEstimate: "6 phút",
    componentName: "Ổ cứng SSD 128GB/256GB & Cáp SATA 6Gb/s",
    imageSrc: "/images/ol-01/main-h510.jpg",
    imageAlt: "Cụm cổng SATA III và khe M.2 NVMe trên bo mạch chủ H510",
    linkedHotspotId: "sata-m2",
    instructions: [
      "Xác định cổng SATA 6Gb/s (SATA III) trên bo mạch H510. Quan sát hình dạng chân cắm hình chữ L đặc thù.",
      "Lấy sợi cáp dữ liệu SATA (có lẫy kim loại chống tuột), cắm một đầu vào cổng SATA_1 trên mainboard cho đến khi nghe tiếng 'TÁCH'.",
      "Cắm đầu còn lại của cáp SATA vào cổng dữ liệu trên ổ cứng SSD 128GB hoặc 256GB.",
      "Tìm cáp nguồn SATA dẹt 15-pin từ bộ nguồn (PSU) và cắm chặt vào chân nguồn của ổ cứng SSD.",
      "Lưu ý với SSD M.2 NVMe (nếu có): Cắm thanh M.2 vào khe theo góc nghiêng 30 độ, ấn nhẹ đuôi thanh xuống và siết ốc giữ M.2 cố định vào chân đồng bo mạch.",
    ],
    pokaYoke:
      "THIẾT KẾ POKA-YOKE CHỮ L: Cả chân cắm dữ liệu SATA 7-pin và chân nguồn SATA 15-pin đều có gờ định hướng hình chữ 'L'. Soi đúng chiều trước khi cắm, không bẻ vặn mạnh làm gãy chân tiếp xúc bằng nhựa trên ổ SSD.",
    analogy:
      "Như phích cắm 3 chấu đặc chủng: Chỉ có đúng một tư thế ăn khớp, soi chuẩn đưa vào nhẹ nhàng là khớp chặt chẽ.",
    marketKnowledge: {
      category: "So sánh các chuẩn lưu trữ: HDD vs SSD SATA vs M.2 NVMe",
      content:
        "• Ổ cơ HDD: Tốc độ đọc/ghi 100 - 150 MB/s, cơ học quay đĩa từ, rất sợ rung lắc khi vận hành.\n• SSD 2.5\" SATA III: Cấu hình phòng lab, tốc độ 500 - 550 MB/s, chip nhớ NAND Flash, chống sốc tốt, khởi động Win 10 trong 10-15 giây.\n• SSD M.2 NVMe PCIe: Chuẩn hiện đại cắm trực tiếp trên bo mạch, tốc độ siêu tốc từ 2.000 MB/s (PCIe 3.0) đến 7.000 MB/s (PCIe 4.0).",
    },
  },
  {
    id: "step-5",
    stepNumber: 5,
    title: "Kiểm Tra POST, Nghiệm Thu Trong BIOS & Khởi Động Windows 10",
    role: "KTV 3 (Ghi chép & Lập biên bản kỹ thuật)",
    timeEstimate: "6 phút",
    componentName: "Màn hình kiểm tra POST & Click BIOS 5",
    imageSrc: "/images/ol-01/main-h510.jpg",
    imageAlt: "Giao diện kiểm tra thông số hệ thống trong BIOS và Windows 10",
    linkedHotspotId: "socket-cpu",
    instructions: [
      "Kết nối bàn phím, chuột và dây cáp màn hình từ màn chiếu/màn hình bàn máy vào cổng của card rời GT 730.",
      "Cắm dây nguồn 220V vào bộ nguồn máy tính và bật công tắc I/O sang vị trí 'I'. Bấm nút Power trên case máy tính.",
      "Nhấn phím DELETE hoặc F2 liên tục ngay khi đèn bàn phím sáng để vào giao diện MSI Click BIOS 5.",
      "KTV 3 kiểm tra và ghi chép các thông số nghiệm thu:\n  + CPU: Nhận đúng tên vi xử lý Intel Core Gen 10/11, nhiệt độ CPU ổn định dưới 45°C.\n  + Memory: Nhận đủ dung lượng 8192 MB (8GB) DDR4, tốc độ Bus 2666MHz hoặc 3200MHz.\n  + Storage: Nhận diện ổ SSD chứa hệ điều hành Windows 10.\n  + Graphics: Nhận card đồ họa rời NVIDIA GeForce GT 730.",
      "Nhấn phím F10 chọn Save Changes & Reboot để khởi động vào Windows 10 Pro. Mở Device Manager để xác nhận toàn bộ driver phần cứng đã nhận diện đầy đủ không có dấu chấm than vàng.",
    ],
    pokaYoke:
      "XỬ LÝ LỖI KHÔNG LÊN HÌNH: Nếu quạt quay nhưng màn hình tối đen và bo mạch phát tiếng bíp dài: Ngắt nguồn, tháo thanh RAM DDR4 ra, dùng gôm/tẩy mềm vệ sinh nhẹ nhàng hai mặt chân mạ vàng rồi cắm lại thật chặt đúng ngàm.",
    analogy:
      "Như bước điểm danh quân số trước giờ xuất quân: Máy tính tự kiểm tra từng bộ phận (CPU, RAM, Ổ cứng, VGA). Thiếu bất kỳ thành viên nào, còi báo động (tiếng bíp) sẽ vang lên để nhắc nhở người kỹ thuật viên.",
    marketKnowledge: {
      category: "Quy trình POST (Power-On Self-Test) & Kiểm tra thông số trên Win 10",
      content:
        "• POST là bài kiểm tra tự động đầu tiên của BIOS khi cấp nguồn, xác nhận phần cứng sống/chết trước khi nạp Bootloader.\n• Trên Windows 10: Nhấn Ctrl + Shift + Esc mở Task Manager > Thẻ Performance > Xem chi tiết tốc độ CPU, Bus RAM, chuẩn phân vùng SSD (GPT/MBR) và mức tải của GPU GT 730.",
    },
  },
];

export default function HardwarePracticePage() {
  // Trạng thái bước đang chọn (step-1 đến step-5)
  const [activeStepId, setActiveStepId] = React.useState<string>("step-1");

  // Trạng thái Checkbox hoàn thành của 5 bước
  const [checkedSteps, setCheckedSteps] = React.useState<Record<string, boolean>>({
    "step-1": false,
    "step-2": false,
    "step-3": false,
    "step-4": false,
    "step-5": false,
  });

  // Chế độ xem bên phải: 'interactive' (sơ đồ điểm hotspot) hoặc 'stepImage' (ảnh theo bước)
  const [rightViewMode, setRightViewMode] = React.useState<"interactive" | "stepImage">("interactive");

  // Điểm Hotspot đang được chọn để ghim thông tin bên dưới sơ đồ
  const [selectedHotspot, setSelectedHotspot] = React.useState<HotspotInfo>(H510_HOTSPOTS[1]); // Mặc định RAM

  // Trạng thái phóng to ảnh toàn màn hình (Projector Lightbox)
  const [zoomedImage, setZoomedImage] = React.useState<{ src: string; alt: string; title: string } | null>(null);

  // Form nhập liệu nghiệm thu
  const [machineNumber, setMachineNumber] = React.useState<string>("");
  const [tableNumber, setTableNumber] = React.useState<string>("01");
  const [ktvNames, setKtvNames] = React.useState<string>("");
  const [notes, setNotes] = React.useState<string>("");
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = React.useState<string>("");

  const storageKey = "HARDWARE_OL01_PROGRESS";

  // Nạp tiến độ từ localStorage
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCheckedSteps(JSON.parse(saved));
      }
    } catch {}
  }, []);

  // Xử lý đảo trạng thái Checkbox tiến độ (Tuyệt đối không dùng label htmlFor để chống xung đột event)
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

  // Tính toán % tiến độ hoàn thành
  const completedCount = Object.values(checkedSteps).filter(Boolean).length;
  const totalSteps = HARDWARE_STEPS.length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);
  const isAllCompleted = completedCount === totalSteps;

  // Lấy dữ liệu của bước đang chọn
  const activeStepIndex = HARDWARE_STEPS.findIndex((s) => s.id === activeStepId);
  const activeStep = HARDWARE_STEPS[activeStepIndex >= 0 ? activeStepIndex : 0];

  // Khi click chọn Hotspot trên sơ đồ bo mạch
  const handleSelectHotspot = (spot: HotspotInfo) => {
    setSelectedHotspot(spot);
    // Tự động mở bước tương ứng
    setActiveStepId(spot.stepId);
  };

  // Chuyển sang bước kế tiếp
  const handleNextStep = () => {
    if (activeStepIndex < totalSteps - 1) {
      const nextStep = HARDWARE_STEPS[activeStepIndex + 1];
      setActiveStepId(nextStep.id);
      setRightViewMode("stepImage");
    }
  };

  // Quay lại bước trước
  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      const prevStep = HARDWARE_STEPS[activeStepIndex - 1];
      setActiveStepId(prevStep.id);
      setRightViewMode("stepImage");
    }
  };

  // Giả lập xử lý nộp bài báo cáo nghiệm thu phần cứng
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAllCompleted) {
      alert("Học sinh cần hoàn thành và tích đủ 100% (5/5 bước) trước khi nộp báo cáo!");
      return;
    }

    if (!machineNumber.trim()) {
      alert("Vui lòng nhập Số máy thực hành phòng lab (ví dụ: Máy 08)!");
      return;
    }

    const payload = {
      lessonCode: "OL-01",
      lessonTitle: "Ôn Luyện Năng Lực Nghề: Phần Cứng Máy Tính (Cấu hình H510)",
      machineNumber: machineNumber.trim(),
      tableNumber: `Bàn ${tableNumber}`,
      ktvMembers: ktvNames.trim() || "Nhóm KTV Bàn " + tableNumber,
      progress: progressPercent,
      completedSteps: checkedSteps,
      technicalNotes: notes.trim(),
      hardwareConfig: {
        os: "Windows 10 Pro 64-bit",
        mainboard: "MSI H510M-A PRO (Socket LGA1200)",
        ram: "8GB DDR4 Bus 2666/3200",
        vga: "NVIDIA GeForce GT 730 2GB GDDR5",
        storage: "SSD 128GB/256GB SATA III",
      },
      submittedAt: new Date().toISOString(),
    };

    console.log("=== [SUPABASE API READY] DỮ LIỆU NỘP BÁO CÁO PHẦN CỨNG OL-01 ===", payload);

    try {
      localStorage.setItem(`HARDWARE_SUBMISSION_OL01_M${machineNumber}`, JSON.stringify(payload));
    } catch {}

    setIsSubmitted(true);
    setSubmitMessage(`Thành công! Báo cáo nghiệm thu máy ${machineNumber} (Bàn ${tableNumber}) đã được ghi nhận trên hệ thống.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* ==================================================================== */}
        {/* 1. THANH TIÊU ĐỀ & TIẾN ĐỘ BÀI THỰC HÀNH                              */}
        {/* ==================================================================== */}
        <Card className="border-slate-200 bg-white shadow-xs">
          <CardHeader className="pb-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-mono text-xs font-black tracking-wider">
                    BÀI THI: OL-01
                  </span>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">
                    Phần Cứng Máy Tính · Chuẩn Cấu Hình Phòng Lab H510 · Hệ Trung Cấp 9+3
                  </span>
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Ôn Luyện Năng Lực Nghề: Lắp Ráp &amp; Nghiệm Thu Phần Cứng PC
                </CardTitle>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Giảng viên hướng dẫn: <strong className="text-slate-800">CN. Phạm Tiến Đông</strong> · Cầm tay chỉ việc 100% tại Bàn Kỹ Thuật
                </p>
              </div>

              {/* Thông số tiến độ hoàn thành */}
              <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 min-w-[220px]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <CheckCircle2 className={`w-4 h-4 ${isAllCompleted ? "text-emerald-600" : "text-slate-400"}`} />
                  <span>Tiến độ thực hành:</span>
                </div>
                <div className="text-xl sm:text-3xl font-black font-mono text-slate-900">
                  {completedCount} / {totalSteps} bước ({progressPercent}%)
                </div>
              </div>
            </div>

            {/* Thanh Progress Bar trực quan */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mt-3 border border-slate-200">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isAllCompleted ? "bg-emerald-600" : "bg-blue-600"
                }`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </CardHeader>

          {/* Ràng buộc cấu hình phòng máy thực tế & An toàn ESD */}
          <CardContent className="pt-0">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Cấu hình chuẩn hóa phòng lab:</strong> Windows 10 Pro 64-bit · Mainboard H510 · RAM 8GB DDR4 · VGA GT 730 2GB · SSD SATA III
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>An toàn Poka-Yoke: Chống tĩnh điện ESD · Zero-force cắm linh kiện</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ==================================================================== */}
        {/* THANH CHUYỂN BƯỚC NHANH 1-CHẠM (QUICK STEP NAVIGATOR PILLS)          */}
        {/* ==================================================================== */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-500 shrink-0 mr-1 hidden sm:inline">
            Chuyển bước nhanh:
          </span>
          {HARDWARE_STEPS.map((s, idx) => {
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
                <span className="truncate max-w-[140px] sm:max-w-none">
                  Bước {idx + 1}: {s.componentName.split(" ")[0]} {s.componentName.split(" ")[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ==================================================================== */}
        {/* 2. BỐ CỤC CHIA ĐÔI MÀN HÌNH (IFIXIT SPLIT VIEW)                      */}
        {/* CỘT TRÁI: HƯỚNG DẪN TỪNG BƯỚC (ACCORDION + CHECKBOX TÁC VỤ)          */}
        {/* CỘT PHẢI: SƠ ĐỒ MAINBOARD H510 TƯƠNG TÁC HOVER & CLICK + ẢNH THẬT    */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* CỘT BÊN TRÁI: 7 CỘT TRÊN MÀN HÌNH LỚN */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-slate-900" />
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Quy Trình 5 Bước Tiêu Chuẩn Tại Bàn Kỹ Thuật
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-500 font-mono">
                5S · Poka-Yoke
              </span>
            </div>

            {/* ACCORDION CÁC BƯỚC HƯỚNG DẪN */}
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
              {HARDWARE_STEPS.map((step) => {
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
                        {/* Huy hiệu số bước */}
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

                        {/* Tiêu đề & Vai trò KTV */}
                        <div className="space-y-1 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                              {step.role}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">
                              ⏱️ {step.timeEstimate}
                            </span>
                            {isStepDone && (
                              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                                Đã nghiệm thu an toàn
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
                      {/* Danh sách thao tác chi tiết */}
                      <div className="space-y-2 pt-2">
                        <div className="text-xs font-black uppercase text-slate-500 tracking-wider">
                          Các thao tác kỹ thuật bắt buộc:
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

                      {/* Hộp Ví von đời thường */}
                      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-black">
                          <Lightbulb className="w-4 h-4 text-amber-600" />
                          <span>Ví von đời thường dễ nhớ:</span>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed pl-5">
                          {step.analogy}
                        </p>
                      </div>

                      {/* Hộp Điểm dừng an toàn Poka-Yoke */}
                      <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200/80 text-rose-950 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-black">
                          <ShieldAlert className="w-4 h-4 text-rose-600" />
                          <span>ĐIỂM DỪNG AN TOÀN POKA-YOKE (KTV 2 SOÁT LỖI):</span>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed pl-5 font-medium">
                          {step.pokaYoke}
                        </p>
                      </div>

                      {/* Bản đồ mở rộng kiến thức thị trường */}
                      <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 space-y-1.5 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{step.marketKnowledge.category}</span>
                        </div>
                        <div className="text-slate-300 whitespace-pre-line leading-relaxed font-sans text-[11px] sm:text-xs">
                          {step.marketKnowledge.content}
                        </div>
                      </div>

                      {/* NÚT CHECKBOX XÁC NHẬN AN TOÀN 1-CHẠM (TUYỆT ĐỐI CHỐNG XUNG ĐỘT SỰ KIỆN) */}
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
                              Em đã hoàn thành và kiểm tra an toàn linh kiện này
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

                      {/* NÚT TIẾN BƯỚC / LÙI BƯỚC NHANH TRONG ACCORDION */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={step.stepNumber === 1}
                          onClick={handlePrevStep}
                          className="text-slate-600 hover:text-slate-900"
                        >
                          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                          <span>Bước {step.stepNumber - 1}</span>
                        </Button>

                        {step.stepNumber < totalSteps ? (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleNextStep}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold"
                          >
                            <span>Sang Bước {step.stepNumber + 1}</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        ) : (
                          <span className="text-emerald-700 font-bold">
                            ✓ Bước kiểm tra cuối cùng
                          </span>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* CỘT BÊN PHẢI: 5 CỘT TRÊN MÀN HÌNH LỚN (STICKY PREVIEW) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
            {/* Header chuyển đổi chế độ xem */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-slate-900" />
                <h3 className="text-base font-black text-slate-900">
                  Minh Họa Trực Quan Phòng Lab
                </h3>
              </div>

              {/* Nút Phóng To Toàn Màn Hình Máy Chiếu */}
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
                className="flex items-center gap-1.5 text-xs font-bold border-slate-300 h-8"
                title="Phóng to cho màn hình máy chiếu tại phòng lab"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Phóng to máy chiếu</span>
              </Button>
            </div>

            {/* TAB CHUYỂN CHẾ ĐỘ: SƠ ĐỒ ĐIỂM HOTSPOT VS ẢNH BƯỚC */}
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

            {/* KHUNG HIỂN THỊ CHÍNH (CARD) */}
            <Card className="border-slate-200 bg-white overflow-hidden shadow-xs">
              <CardContent className="p-3 sm:p-4 space-y-3">
                {rightViewMode === "interactive" ? (
                  /* ======================================================== */
                  /* MODULE NHẬN DIỆN LINH KIỆN: SƠ ĐỒ H510 INTERACTIVE       */
                  /* TÍCH HỢP 5 HOTSPOT CLICK HOẶC HOVER ĐỀU TƯƠNG TÁC        */
                  /* ======================================================== */
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span>Chạm hoặc rà chuột vào điểm nhấp nháy:</span>
                      </span>
                      <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        5 Điểm Hotspot
                      </span>
                    </div>

                    <div className="relative w-full aspect-[1010/889] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-inner group">
                      {/* ẢNH GỐC MAINBOARD H510 TỪ /public/images/ol-01/main-h510.jpg */}
                      <Image
                        src="/images/ol-01/main-h510.jpg"
                        alt="Sơ đồ tương tác bo mạch chủ MSI H510M-A PRO Socket LGA1200"
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priority
                      />

                      {/* 5 ĐIỂM HOTSPOT NHẤP NHÁY HỖ TRỢ CLICK LẪN HOVER */}
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
                              onClick={() => handleSelectHotspot(spot)}
                              onMouseEnter={() => setSelectedHotspot(spot)}
                              className={`relative flex items-center justify-center w-8 h-8 rounded-full focus:outline-none cursor-pointer transition-transform ${
                                isSelected ? "scale-125 ring-4 ring-slate-900/30" : "hover:scale-110"
                              }`}
                              title={`Chạm để xem ${spot.title}`}
                            >
                              {/* Vòng lan tỏa nhấp nháy (Tailwind animate-ping) */}
                              <span
                                className={`animate-ping absolute inline-flex h-7 w-7 rounded-full opacity-75 ${spot.color}`}
                              ></span>

                              {/* Chấm tròn chính hiển thị biểu tượng */}
                              <span
                                className={`relative inline-flex items-center justify-center rounded-full h-6 w-6 text-white text-[11px] font-black shadow-md border-2 border-white ${spot.color}`}
                              >
                                {spot.title.charAt(0)}
                              </span>
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* HỘP THÔNG TIN CHI TIẾT CỦA HOTSPOT ĐANG CHỌN (LUÔN HIỂN THỊ, CHẠM LÀ ĐỔI) */}
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

                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">
                          Tương ứng: Bước {selectedHotspot.stepNumber}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveStepId(selectedHotspot.stepId);
                            setRightViewMode("stepImage");
                          }}
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer"
                        >
                          <span>Mở bài học Bước {selectedHotspot.stepNumber}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Danh mục 5 phím bấm chọn nhanh hotspot */}
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] font-medium text-slate-600 pt-1">
                      {H510_HOTSPOTS.slice(0, 4).map((h) => (
                        <button
                          key={h.id}
                          type="button"
                          onClick={() => handleSelectHotspot(h)}
                          className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-left cursor-pointer transition-colors ${
                            selectedHotspot.id === h.id
                              ? "bg-slate-100 border-slate-400 text-slate-900 font-bold"
                              : "border-slate-200 hover:bg-slate-50 text-slate-600"
                          }`}
                        >
                          <span className={`w-2.5 h-2.5 rounded-full ${h.color} shrink-0`}></span>
                          <span className="truncate">{h.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* ======================================================== */
                  /* CHẾ ĐỘ XEM ẢNH THỰC TẾ THEO BƯỚC ĐANG CHỌN               */
                  /* ======================================================== */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">
                        Bước {activeStep.stepNumber}: {activeStep.componentName}
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

                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/90 text-white font-mono text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                          Click phóng to toàn màn hình máy chiếu
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 italic text-center">
                      {activeStep.imageAlt}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tóm tắt nhanh thông số nghiệm thu */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-blue-600" />
                <span>Tiêu chí đánh giá đạt chuẩn nghề (Pass / Fail):</span>
              </div>
              <div className="space-y-1 text-slate-600 text-[11px] leading-relaxed">
                <div>✓ Không dùng sức ép, ngàm RAM và chốt card đồ họa đóng tự nhiên.</div>
                <div>✓ Dây cáp màn hình kết nối đúng cổng xuất hình của card rời GT 730.</div>
                <div>✓ Máy tính POST qua màn hình logo trong vòng 5 giây, BIOS nhận đủ 8GB RAM.</div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 3. CỤM FORM NỘP BÁO CÁO NGHIỆM THU PHẦN CỨNG (SUBMISSION CLUSTER)   */}
        {/* NÚT CHỈ ENABLE KHI HỌC SINH ĐÃ TICK ĐỦ 100% CHECKBOX TIẾN ĐỘ         */}
        {/* ==================================================================== */}
        <Card className="border-slate-200 bg-white shadow-xs mt-8">
          <CardHeader className="pb-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-slate-900" />
                <CardTitle className="text-lg sm:text-xl font-black text-slate-900">
                  Nghiệm Thu &amp; Nộp Báo Cáo Thực Hành (Bàn Kỹ Thuật)
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
              Nhập mã số máy thực hành phòng lab (01 - 36) và thông số ghi chép từ KTV 3 để lưu trữ hồ sơ đánh giá.
            </p>
          </CardHeader>

          <CardContent className="pt-5">
            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-black text-emerald-950">
                  {submitMessage}
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Dữ liệu đã được nạp vào LocalStorage và sẵn sàng đồng bộ lên cơ sở dữ liệu Supabase của giảng viên.
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
                  {/* Trường 1: Số máy thực hành */}
                  <div className="space-y-1.5">
                    <Label htmlFor="machine-number" className="text-xs font-bold text-slate-800">
                      Số Máy Phòng Lab <span className="text-rose-600">*</span>
                    </Label>
                    <Input
                      id="machine-number"
                      placeholder="Ví dụ: Máy 08 (từ 01 - 36)"
                      value={machineNumber}
                      onChange={(e) => setMachineNumber(e.target.value)}
                      required
                      className="border-slate-300 focus-visible:ring-slate-900 text-sm h-11"
                    />
                  </div>

                  {/* Trường 2: Chọn bàn máy */}
                  <div className="space-y-1.5">
                    <Label htmlFor="table-number" className="text-xs font-bold text-slate-800">
                      Bàn Kỹ Thuật (01 - 10)
                    </Label>
                    <select
                      id="table-number"
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

                  {/* Trường 3: Tên các KTV */}
                  <div className="space-y-1.5">
                    <Label htmlFor="ktv-names" className="text-xs font-bold text-slate-800">
                      Họ Tên Nhóm KTV (KTV 1, KTV 2, KTV 3)
                    </Label>
                    <Input
                      id="ktv-names"
                      placeholder="Nguyễn Văn A, Trần Thị B, Lê Văn C"
                      value={ktvNames}
                      onChange={(e) => setKtvNames(e.target.value)}
                      className="border-slate-300 focus-visible:ring-slate-900 text-sm h-11"
                    />
                  </div>
                </div>

                {/* Ghi chú thông số kiểm tra */}
                <div className="space-y-1.5">
                  <Label htmlFor="technical-notes" className="text-xs font-bold text-slate-800">
                    Ghi Chú Kết Quả Kiểm Tra BIOS &amp; Windows 10 (KTV 3 Lập)
                  </Label>
                  <textarea
                    id="technical-notes"
                    rows={2}
                    placeholder="Ví dụ: Máy POST tốt trong 4s, BIOS nhận đủ 8192MB DDR4 Bus 2666, nhiệt độ CPU 38°C, Device Manager nhận card rời GT 730 không báo lỗi."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                {/* NÚT SUBMIT NỘP BÁO CÁO (CHỈ ACTIVE KHI 100% CHECKED) */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    {isAllCompleted ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        ✓ Học sinh đã tick đủ 5/5 bước. Nút nộp báo cáo đã được mở khóa!
                      </span>
                    ) : (
                      <span className="text-amber-700 font-medium">
                        ⚠️ Cần tick xác nhận đủ 5 bước ở bảng hướng dẫn phía trên để kích hoạt nút nộp bài.
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
                    <span>Nộp Báo Cáo Ôn Luyện OL-01</span>
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </main>

      {/* ==================================================================== */}
      {/* 4. MODAL PHÓNG TO ẢNH TOÀN MÀN HÌNH (PROJECTOR LIGHTBOX DIALOG)      */}
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
