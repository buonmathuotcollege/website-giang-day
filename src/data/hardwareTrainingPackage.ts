/**
 * GÓI DỮ LIỆU ĐÀO TẠO KỸ THUẬT VIÊN PHẦN CỨNG MÁY TÍNH (CHUẨN OL-01)
 * Cổng Giảng Dạy & Thực Hành CNTT - CN. Phạm Tiến Đông
 * Áp dụng phương pháp đơn giản hóa "Mắt thấy - Tay làm" (Công thức 3 Giây Là Nhớ)
 */

export interface KtvStep {
  id: string;
  stepNumber: number;
  shortName: string;
  title: string;
  role: string;
  timeEstimate: string;
  motto: string;
  quickAction: string;
  quickSign: string;
  quickDont: string;
  checkpoint?: {
    code: string;
    name: string;
    requirement: string;
  };
  instructions: string[];
  pokaYoke: string;
  analogy: string;
  imageSrc: string;
  imageAlt: string;
  hotspotTarget?: string;
}

export const KTV_7_STEPS: KtvStep[] = [
  {
    id: "step-1",
    stepNumber: 1,
    shortName: "1. Nhận máy",
    title: "Tiếp Nhận Máy, Khám Bên Ngoài & Đọc Cấu Hình Ban Đầu",
    role: "KTV 3 (Ghi chép & Thông số)",
    timeEstimate: "15 phút",
    motto: "NHÌN VỎ – BẤM THỬ – GHI CẤU HÌNH",
    quickAction: "Khám vỏ ngoài xem có móp vỡ không, cắm nguồn bấm nút Power thử xem máy còn sống không, mở CPU-Z ghi lại cấu hình CPU/RAM/SSD.",
    quickSign: "Quạt quay, đèn case sáng, CrystalDiskInfo báo Good (Xanh).",
    quickDont: "Cấm vội vàng tháo ốc tháo máy khi chưa cắm điện thử máy ban đầu!",
    imageSrc: "/images/ol-01/step-1-kham-may.webp",
    imageAlt: "Khám ngoại quan case PC phòng lab, cắm nguồn AC và phân biệt cổng xuất hình GT 730",
    hotspotTarget: "socket-cpu",
    instructions: [
      "Khám vỏ ngoài: Quan sát móp méo, vỡ nhựa, thiếu ốc nắp hông hay đứt dây nguồn/cáp màn hình.",
      "Bấm nút nguồn thử máy: Xem máy rơi vào trường hợp nào (A: Vào Win bình thường; B: Im re; C: Quạt quay màn đen; D: Lỗi ổ cứng No Bootable).",
      "Đọc cấu hình máy: Mở phần mềm CPU-Z xem tên chip CPU, model Mainboard, đời RAM (DDR4), dung lượng RAM (8GB). Mở CrystalDiskInfo xem sức khỏe ổ cứng (Good = Xanh).",
      "Kiểm tra linh kiện lắp thêm: Đối chiếu chuẩn DDR trên thanh RAM rời với Mainboard H510 (phải cùng chuẩn DDR4 mới lắp vừa, DDR3 bị lệch khe khuyết).",
    ],
    pokaYoke: "QUY TẮC BẮT BUỘC: Luôn kiểm tra tình trạng máy ban đầu trước khi tháo lắp để tránh nhận máy đã cháy hỏng từ trước.",
    analogy: "Như bác sĩ khám tổng quát lúc mới nhận bệnh nhân: Bắt mạch, đo huyết áp xem người bệnh còn tỉnh hay hôn mê trước khi kê đơn.",
  },
  {
    id: "step-2",
    stepNumber: 2,
    shortName: "2. Cứu dữ liệu",
    title: "Cứu & Sao Lưu Dữ Liệu Khách Hàng (Desktop & Documents)",
    role: "KTV 2 (Kiểm soát an toàn Poka-Yoke)",
    timeEstimate: "15 phút",
    motto: "COPY DESKTOP SANG Ổ D",
    quickAction: "Copy toàn bộ thư mục ngoài Desktop và Documents của khách sang ổ D trong thư mục SAO_LUU_KHACH.",
    quickSign: "Chuột phải thư mục ổ D xem số file và dung lượng khớp 100% với ổ gốc, mở thử 2 file bất kỳ.",
    quickDont: "Cấm tuyệt đối Format ổ đĩa hay tháo ổ cứng khi chưa copy xong dữ liệu (mất dữ liệu là đền tiền!).",
    checkpoint: {
      code: "ĐIỂM DỪNG 1",
      name: "Xác Nhận Dữ Liệu Khách & An Toàn Điện",
      requirement: "Thầy kiểm tra: Dữ liệu đã copy đủ 100% sang ổ D; dây nguồn AC đã rút và đã bấm xả điện 3 lần.",
    },
    imageSrc: "/images/ol-01/step-2-cuu-du-lieu-win10.webp",
    imageAlt: "Windows 10 File Explorer copy Desktop sang ổ D: SAO_LUU_KHACH, đếm số file Properties",
    hotspotTarget: "sata-m2",
    instructions: [
      "Xác định 3 vị trí sống còn: Toàn bộ file Word, Excel, ảnh quan trọng của khách nằm ở Desktop, Documents và Downloads (đều thuộc Ổ ĐĨA C).",
      "Nếu máy còn vào được Windows: Bấm chuột phải vào thư mục tài liệu ngoài Desktop -> chọn Properties ghi lại số Files và số MB. Mở ổ D tạo thư mục SAO_LUU_KHACH rồi COPY (tuyệt đối không Cut) toàn bộ dữ liệu sang.",
      "Nếu máy hỏng Windows: Cắm USB Cứu hộ WinPE -> Bật máy bấm liên tục phím Boot Menu (MSI & Winnfox: F11 | ASUS: F8) chọn dòng 'UEFI: Tên USB' -> Vào WinPE mở ổ C:Users Desktop copy hết sang ổ D.",
      "Đối chiếu Properties thư mục ở ổ D đảm bảo khớp 100% số file gốc và mở thử 2 file bất kỳ.",
    ],
    pokaYoke: "LUẬT DỮ LIỆU TRƯỚC, MÁY SAU: Sửa máy giỏi mấy mà làm mất file của khách là phải đền tiền! Chưa sao lưu xong thì TUYỆT ĐỐI không được format hay tháo ổ cứng.",
    analogy: "Như chuyển hết đồ đạc quý giá ra khỏi nhà trước khi đập tường sửa nhà: Phải cất đồ đạc vào két an toàn mới được bắt đầu cưa đục.",
  },
  {
    id: "step-3",
    stepNumber: 3,
    shortName: "3. Bắt bệnh 60s",
    title: "Chẩn Đoán ('Bắt Bệnh 60 Giây') & Cứu Sống Máy Không Hoạt Động",
    role: "KTV 1 (Thao tác kỹ thuật chính)",
    timeEstimate: "20 phút",
    motto: "MÀN ĐEN QUẠT QUAY = CHÀ GÔM CHÂN RAM",
    quickAction: "Rút điện bấm xả tụ 3 lần, tháo thanh RAM lấy cục gôm trắng học sinh chà sáng bóng chân vàng rồi cắm lại.",
    quickSign: "Cắm RAM nghe tiếng 'TÁCH' đanh gọn 2 đầu ngậm khít. Bật máy lên hình ngay.",
    quickDont: "Không dùng cồn ướt lau chân RAM; cấm để lại mạt vụn gôm rơi trong khe cắm.",
    imageSrc: "/images/ol-01/step-3-cha-ram-cuc-tay.webp",
    imageAlt: "Cận cảnh dùng cục tẩy trắng gôm học sinh chà sạch chân mạ vàng thanh RAM DDR4",
    hotspotTarget: "ram-slots",
    instructions: [
      "Ca 1 (Máy im re): Cắm chặt dây nguồn, gạt công tắc sau nguồn sang 'I'. Cắm lại dây POWER SW vào 2 chân kim sát cạnh chỗ mất kim trên cụm F_PANEL. Thử quẹt nhẹ tua vít vào 2 chân kim để kiểm tra nút bấm.",
      "Ca 2 (Quạt quay nhưng màn hình đen - Chiếm 80% máy lỗi): Rút điện, bấm xả điện 3 lần -> Bẻ 2 ngàm tháo RAM -> Dùng CỤC TẨY TRẮNG (gôm học sinh) chà mạnh cho sáng bóng cả 2 mặt chân đồng vàng -> Quét sạch khe RAM -> Cắm lại nghe tiếng TÁCH. Tháo pin CMOS ra 1 phút rồi lắp lại.",
      "Ca 3 (Chữ trắng No Bootable Device): Rút điện, cắm chặt lại 2 dây chữ L ở đít ổ SSD. Bật máy bấm Delete/F2 vào BIOS -> Thẻ Boot đưa ổ SSD lên dòng số 1 -> Bấm F10 lưu lại.",
      "Ca 4 (Sai ngày giờ / Báo Press F1): Thay viên pin đồng xu CR2032 mới (mặt dấu + ngửa lên trên), vào BIOS chỉnh đúng ngày giờ rồi F10 lưu.",
      "Ca 5 (Chạy 5-10 phút nóng tự tắt): Kiểm tra quạt CPU có quay không, dây đã cắm vào chân CPU_FAN chưa, tra lại keo tản nhiệt mới.",
    ],
    pokaYoke: "NGUYÊN TẮC BẮT BỆNH: Khám từ ngoài vào trong, từ dễ đến khó. Mỗi lần chỉ sửa hoặc thay MỘT thứ rồi thử máy để biết chính xác thủ phạm.",
    analogy: "Như thợ khóa tìm chìa: Chân RAM bị bụi mờ giống như chìa khóa bị gỉ sét, lấy cục gôm đánh bóng chân là chìa mở ổ khóa máy tính lên hình ngay.",
  },
  {
    id: "step-4",
    stepNumber: 4,
    shortName: "4. Bảo dưỡng & Nâng cấp",
    title: "Vệ Sinh Thổi Bụi, Tra Keo 'Hạt Đậu Xanh' & Lắp Nâng Cấp RAM/SSD",
    role: "KTV 1 & KTV 2 (Thao tác & Kiểm soát)",
    timeEstimate: "35 phút",
    motto: "QUÉT SẠCH BỤI – 1 HẠT ĐẬU XANH KEO",
    quickAction: "Quét sạch bụi tản nhiệt, lau sạch keo cũ trên CPU rồi bơm đúng 1 giọt keo mới to bằng hạt đậu xanh ở chính giữa.",
    quickSign: "Lắp quạt ép chéo 4 góc khóa chặt, quạt đã cắm dây CPU_FAN, RAM nâng cấp khóa sát khấc.",
    quickDont: "Cấm bơm quá nhiều keo tràn xuống bo mạch; cấm quên bóc nilon đáy quạt tản nhiệt mới.",
    checkpoint: {
      code: "ĐIỂM DỪNG 2",
      name: "Kiểm Soát Cơ Khí Trước Khi Cắm Điện",
      requirement: "Thầy kiểm tra 10 giây: (1) Hai ngàm RAM đã khóa sát khấc; (2) Dây quạt đã cắm CPU_FAN; (3) Không rơi ốc vít trên bo mạch.",
    },
    imageSrc: "/images/ol-01/step-4-tra-keo-hat-dau-xanh.webp",
    imageAlt: "Tra đúng 01 giọt keo tản nhiệt hạt đậu xanh vào giữa CPU và vặn 4 chốt đối xứng đường chéo",
    hotspotTarget: "pcie-x16",
    instructions: [
      "Quét và thổi bụi: Dùng cọ mềm và bóng thổi làm sạch hốc nguồn, quạt CPU, mặt Mainboard. BẮT BUỘC dùng tay giữ đứng cánh quạt khi thổi (không để quạt quay tít mù sinh điện ngược hỏng mạch).",
      "Lau keo cũ & tra keo mới: Lau sạch lớp keo khô cũ trên lưng CPU. Bóp đúng 01 GIỌT BẰNG HẠT ĐẬU XANH vào chính giữa lưng CPU. Lắp quạt và ấn/vặn chốt theo đường chéo đối xứng để mặt tản nhiệt ép phẳng đều. Cắm dây vào chân CPU_FAN.",
      "Lắp nâng cấp RAM 8GB DDR4: Mở 2 ngàm khóa, soi đúng rãnh khuyết lệch của DDR4, ấn thẳng đều 2 đầu thanh RAM đến khi nghe tiếng 'TÁCH' dứt khoát.",
      "Lắp Card màn hình rời GT 730: Cắm ngập chân PCIe x16, gài chốt khóa đuôi card, siết ốc nẹp case máy tính.",
      "Lắp SSD mới & 4 cú nhấp chuột 'đánh thức' ổ mới: Vào Windows chuột phải nút Start -> Disk Management -> Bấm OK (chuẩn GPT) -> Chuột phải ô vạch MÀU ĐEN (Unallocated) chọn New Simple Volume -> Bấm Next 4 lần rồi Finish là ổ đĩa mới hiện ngay trong This PC!",
    ],
    pokaYoke: "NGUYÊN TẮC ZERO-FORCE INSERTION: Thấy cộm tay hoặc nặng lực là dừng ngay! Tuyệt đối không dùng sức đè ép làm gãy chân socket CPU hoặc toác khe cắm bo mạch.",
    analogy: "Keo tản nhiệt như lớp kem lót: Bóp đúng 1 giọt hạt đậu xanh để truyền nhiệt êm ái; bóp nhiều quá tràn ra ngoài như đổ thừa canh làm ướt bàn.",
  },
  {
    id: "step-5",
    stepNumber: 5,
    shortName: "5. Cài đặt Windows 10",
    title: "Cài Mới Windows 10, Đầy Đủ Driver & Phần Mềm Hợp Lệ",
    role: "KTV 1 (Cài đặt hệ điều hành)",
    timeEstimate: "35 phút",
    motto: "BOOT USB – CHỈ FORMAT Ổ C",
    quickAction: "Cắm USB cài Win (MSI/Winnfox bấm F11, ASUS bấm F8), ở bảng chọn ổ đĩa: chỉ Format dòng ổ C dung lượng nhỏ để cài.",
    quickSign: "Cài xong vào thẳng Windows 10 desktop, Device Manager sạch bóng dấu chấm than vàng.",
    quickDont: "Tuyệt đối cấm bấm Format dòng Ổ D (chứa tài liệu khách đã cứu ở Bước 2).",
    imageSrc: "/images/ol-01/step-5-cai-win10-partition.webp",
    imageAlt: "Giao diện phân vùng Windows 10 Setup quy tắc nhìn số GB chọn ổ C và Device Manager sạch chấm than",
    instructions: [
      "Boot từ USB cài Windows: Cắm USB -> Bật máy bấm liên tục phím Boot Menu (MSI & Winnfox: F11 | ASUS: F8) -> Chọn dòng 'UEFI: Tên USB' -> Bấm Enter.",
      "QUY TẮC NHÌN SỐ GB CHỌN Ổ C: Đến bảng chọn phân vùng, đối chiếu số GB đã ghi ở Bước 1. Dòng dung lượng nhỏ (60GB–120GB) là Ổ C để cài Win; dòng dung lượng lớn (200GB–500GB) là Ổ D chứa tài liệu của khách. Chỉ bấm Format vào dòng Ổ C -> Next. Tuyệt đối không đụng vào Ổ D!",
      "Thiết lập lần đầu: Đặt tên máy theo số bàn (VD: PC-BAN01), chỉnh múi giờ (UTC+07:00) Bangkok, Hanoi, Jakarta và kiểm tra ngày giờ đúng.",
      "QUY TẮC SẠCH BÓNG CHẤM THAN VÀNG (!): Chuột phải nút Start -> Device Manager. Còn tam giác vàng chấm than (!) là đang thiếu Driver -> Chạy bộ cài Driver (Chipset, VGA GT 730, Audio, LAN) đến khi Device Manager sạch bóng 100%.",
      "Cài phần mềm chuẩn: Cài UniKey (Unicode + Telex, khởi động cùng Win), 7-Zip, đọc PDF. Chép trả tài liệu của khách từ ổ D ra ngoài màn hình Desktop.",
      "Tạo phanh an toàn System Restore: Gõ 'Create a restore point' -> Chọn ổ C -> Configure bật bảo vệ -> Bấm Create đặt tên 'MAY_CHAY_TOT' (lần sau lỗi phần mềm chỉ mất 3 phút khôi phục lại).",
    ],
    pokaYoke: "QUY TẮC SỐNG CÒN KHI CÀI WIN: RÚT USB ngay sau lần máy tự khởi động lại đầu tiên (để máy không bị quay lại vòng lặp cài đặt ban đầu).",
    analogy: "Device Manager như cuốn sổ điểm danh quân số: Hễ còn bạn nào gắn cờ vàng chấm than là chưa vào lớp, phải gọi đủ Driver mới làm việc ngon lành.",
  },
  {
    id: "step-6",
    stepNumber: 6,
    shortName: "6. Thử ngoại vi & Máy in",
    title: "Kiểm Tra Ngoại Vi & 3 Bước Chữa Máy In 'Cắm Vào Không Chịu In'",
    role: "KTV 3 (Kiểm thử ngoại vi)",
    timeEstimate: "15 phút",
    motto: "SẠCH CHẤM THAN VÀNG – IN 1 TRANG GIẤY",
    quickAction: "Cài đủ driver cho bo mạch và card GT 730, cắm dây máy in USB đặt làm mặc định (tích xanh) và in thử 1 trang.",
    quickSign: "Device Manager không còn cờ vàng chấm than (!); máy in chạy ra trang giấy in nét.",
    quickDont: "Không giao máy khi Device Manager còn dấu chấm than vàng (máy sẽ bị giật lag, mất tiếng hoặc mất mạng).",
    imageSrc: "/images/ol-01/step-6-may-in-test-page.webp",
    imageAlt: "Windows 10 Devices and Printers máy in mặc định dấu tích xanh và in trang Print Test Page",
    instructions: [
      "Kiểm tra ngoại vi: Mở Notepad gõ thử 1 câu tiếng Việt có dấu; bấm thử chuột trái, phải, con lăn; cắm dây mạng kiểm tra biểu tượng mạng có Internet.",
      "Cài đặt máy in qua cáp USB: Cắm cáp USB của máy in vào thùng máy, bật đèn nguồn máy in, cài đặt Driver tương ứng.",
      "3 bước chữa máy in không chịu in: (1) Kiểm tra đèn nguồn máy in, cáp USB, giấy trong khay; (2) Mở Control Panel -> Devices and Printers -> Chuột phải vào máy in chọn 'Set as default printer' để hiện DẤU TÍCH XANH; (3) Nhấp đúp chuột vào máy in -> menu Printer -> chọn 'Cancel All Documents' để xóa lệnh kẹt.",
      "In trang nghiệm thu: Chuột phải máy in -> Printer properties -> Bấm nút 'Print Test Page' để in ra tờ giấy kiểm tra đính kèm hồ sơ bàn giao.",
    ],
    pokaYoke: "ĐIỂM DỪNG BẮT BUỘC: Nhiều khi máy in không in được chỉ vì máy tính đang chọn nhầm sang máy in ảo PDF! Phải kiểm tra dấu tích xanh mặc định.",
    analogy: "Như đường thông hè thoáng: Hàng dài người xếp hàng chen lấn làm tắc cửa (kẹt lệnh in), bấm Cancel All Documents là dọn thông đường để tờ giấy chạy ra ngay.",
  },
  {
    id: "step-7",
    stepNumber: 7,
    shortName: "7. Bàn giao máy",
    title: "Nghiệm Thu 5 Tiêu Chí Chuẩn Nghề, Đóng Nắp Vỏ & Lập Biên Bản",
    role: "KTV 3 & Nhóm KTV",
    timeEstimate: "15 phút",
    motto: "DƯỚI 50 ĐỘ C – DÁN TEM BÀN GIAO",
    quickAction: "Mở HWMonitor kiểm tra nhiệt độ CPU khi nghỉ phải dưới 45-50°C, kiểm tra nhận đủ 8GB RAM, dán tem bàn giao.",
    quickSign: "Nhiệt độ CPU xanh mát êm ru, khoang case sạch sẽ gọn gàng, trả đủ ốc vít vào khay.",
    quickDont: "Không đóng nắp máy khi quạt CPU đang bị kênh nhiệt độ vượt quá 75°C lúc chạy không tải.",
    checkpoint: {
      code: "ĐIỂM DỪNG 3",
      name: "Nghiệm Thu Bàn Giao Ca Máy",
      requirement: "Thầy kiểm tra 3 màn hình: (1) Device Manager sạch chấm than; (2) HWMonitor nhiệt độ CPU <75°C; (3) Dữ liệu khách nguyên vẹn.",
    },
    imageSrc: "/images/ol-01/step-7-hwmonitor-nhiet-do.webp",
    imageAlt: "Đo nhiệt độ CPU bằng HWMonitor mát 38°C và hoàn tất biên bản nghiệm thu bàn giao 5 tiêu chí",
    instructions: [
      "Tự dò đúng 5 tiêu chí trước khi đóng nắp thùng máy:",
      "1. Trong thùng máy: Quạt CPU quay êm, dây nguồn đã dùng dây rút buộc gọn không chạm cánh quạt, không bỏ quên ốc vít hay dụng cụ trong máy.",
      "2. Nhiệt độ CPU (mở phần mềm HWMonitor): Nhiệt độ CPU khi máy nghỉ mát dưới 75°C (nếu lên 85-95°C là lắp quạt bị kênh chân hoặc thiếu keo).",
      "3. Nhận diện phần cứng: This PC và Device Manager nhận đủ 8GB RAM, đủ ổ C và D, sạch dấu chấm than vàng. CrystalDiskInfo báo Good.",
      "4. Dữ liệu khách: Mở thư mục tài liệu ngoài Desktop, còn nguyên vẹn 100% số file.",
      "5. Thu dọn & Bàn giao: Rút điện đóng nắp vỏ máy, vặn đủ ốc, lau sạch màn hình – bàn phím – chuột, dọn sạch rác và điền đủ phiếu bàn giao.",
    ],
    pokaYoke: "TIÊU CHÍ 5S TẠI BÀN: KTV chuyên nghiệp không chỉ sửa máy chạy được mà còn phải bàn giao máy sạch sẽ, gọn gàng, trả đủ dụng cụ vào khay.",
    analogy: "Như giao xe sau khi bảo dưỡng: Rửa xe sáng bóng, nổ máy êm ru, kiểm tra phanh an toàn và viết phiếu bảo hành trước khi trao chìa khóa cho khách.",
  },
];

export interface MechanicalStep {
  id: string;
  stepNumber: number;
  title: string;
  shortName: string;
  motto: string;
  quickAction: string;
  quickSign: string;
  quickDont: string;
  tool: string;
  action: string;
  commonMistakes: string[];
  pokaYoke: string;
  imageSrc: string;
  imageAlt: string;
}

export const DISASSEMBLY_STEPS: MechanicalStep[] = [
  {
    id: "dis-1",
    stepNumber: 1,
    title: "Ngắt Nguồn Điện 220V & Xả Tụ An Toàn",
    shortName: "Rút Điện & Xả Tụ",
    motto: "RÚT ĐIỆN – BẤM 3 LẦN – CHẠM VỎ SẮT",
    quickAction: "Rút phích 220V, bấm nút nguồn 3 lần xả điện tụ, chạm tay vào vỏ case kim loại triệt tiêu tĩnh điện.",
    quickSign: "Đèn nguồn trên bo mạch tắt hẳn, quạt ngừng quay hoàn toàn.",
    quickDont: "Cấm tháo linh kiện khi chưa rút điện hoặc chưa xả tụ (sốc điện làm cháy chip BIOS).",
    tool: "Tay trần, dây tiếp địa hoặc chạm tay vào vỏ kim loại case máy",
    action: "Rút hoàn toàn phích cắm điện nguồn 220V khỏi ổ điện. Nhấn và giữ nút Power trên case trong 10 giây (hoặc bấm liên tục 3-5 lần) để các tụ điện trên bo mạch xả hết dòng điện dư thừa. Chạm tay vào vỏ kim loại case để triệt tiêu tĩnh điện cơ thể (chống sốc tĩnh điện ESD).",
    commonMistakes: [
      "Quên rút phích cắm mà chỉ tắt công tắc ổ cắm, nguồn vẫn còn dòng chờ 5VSB.",
      "Rút điện xong vội vàng tháo linh kiện ngay khi tụ nguồn còn tích điện, gây sốc điện nổ chip BIOS hoặc IC điều khiển.",
      "Cơ thể tích tĩnh điện trong mùa hanh khô chạm thẳng vào vi mạch mạ vàng của RAM hoặc Mainboard.",
    ],
    pokaYoke: "Khẩu quyết sống còn: 'Rút phích điện -> Bấm nút nguồn 3 lần -> Chạm tay vỏ kim loại case'.",
    imageSrc: "/images/ol-01/workflow-thao-may.webp",
    imageAlt: "Sơ đồ 6 bước tháo máy an toàn - Bước 1: Rút nguồn và xả tụ điện",
  },
  {
    id: "dis-2",
    stepNumber: 2,
    title: "Mở Nắp Case & Tháo Card Đồ Họa Rời (VGA GT 730)",
    shortName: "Tháo Card Rời GT 730",
    motto: "MỞ ỐC NẸP – GẠT LẪY PCIE – RÚT THẲNG",
    quickAction: "Tháo ốc nẹp sắt sau case, lấy ngón tay gạt mở lẫy đuôi khe PCIe rồi nhấc thẳng card rời GT 730 lên.",
    quickSign: "Lẫy khóa đuôi nhả ra hoàn toàn, card nhấc nhẹ tay góc 90 độ.",
    quickDont: "Cấm giật mạnh khi lẫy đuôi chưa mở (sẽ làm bẻ gãy lẫy hoặc toác chân khe cắm).",
    tool: "Tua vít bake từ tính PH2, khay đựng ốc phân loại",
    action: "Mở nắp hông case máy tính. Dùng tua vít bake tháo ốc nẹp kim loại cố định đuôi card đồ họa vào khung sau thùng máy. Dùng ngón tay trỏ ấn nhẹ lẫy nhựa khóa khe PCIe x16 trên mainboard để ngàm nhả ra, rồi nhấc thẳng đứng card rời theo góc 90 độ ra ngoài, đặt lên khay xốp đệm.",
    commonMistakes: [
      "Quên không gạt lẫy khóa đuôi khe PCIe x16 mà dùng sức giật mạnh lên, làm gãy lẫy hoặc bong rách chân đồng khe cắm.",
      "Rơi ốc nẹp kim loại lọt vào khe hẹp của bộ nguồn PSU hoặc kẹt dưới đáy mainboard gây chập điện.",
      "Cầm ngón tay nắm chặt vào hàng chân đồng PCIe mạ vàng khiến mồ hôi tay làm oxy hóa tiếp xúc.",
    ],
    pokaYoke: "Luôn kiểm tra lẫy khóa PCIe đã mở hết cỡ trước khi nhấc card; cầm card ở phần khung nẹp sắt và tản nhiệt.",
    imageSrc: "/images/ol-01/guide-clean-vga-pcie.webp",
    imageAlt: "Kỹ thuật tháo card đồ họa rời GT 730 mở lẫy PCIe x16 và tháo ốc nẹp",
  },
  {
    id: "dis-3",
    stepNumber: 3,
    title: "Mở Ngàm Khóa & Tháo Thanh RAM DDR4",
    shortName: "Tháo Thanh RAM DDR4",
    motto: "ĐÈ 2 ĐẦU NGÀM – CẦM MÉP NHẤC RAM",
    quickAction: "Ấn đều ngàm khóa ở hai đầu khe cắm xuống dưới, thanh RAM tự bật nảy lên, cầm 2 mép cạnh nhấc ra.",
    quickSign: "Thanh RAM nảy chéo nhẹ lên, nhấc ra nhẹ nhàng không cấn.",
    quickDont: "Tuyệt đối không chạm ngón tay vào hàng chân mạ vàng (mồ hôi tay làm rỉ sét tiếp xúc).",
    tool: "Tay trần sạch và khô ráo, khay đựng linh kiện",
    action: "Dùng ngón tay ấn đều hai ngàm khóa nhựa ở hai đầu khe RAM (hoặc ngàm đơn phía trên với main H510) xuống dưới. Thanh RAM sẽ tự động bật nảy nhẹ lên khỏi khe. Dùng hai ngón tay cầm vào hai cạnh mép trên của thanh RAM và nhấc thẳng đứng ra ngoài.",
    commonMistakes: [
      "Chưa mở ngàm nhựa đã dùng ngón tay kéo lệch một đầu thanh RAM, làm mẻ chân RAM và gãy rãnh ngàm định vị.",
      "Ngón tay chạm tì vào các chip nhớ dán hoặc chân đồng mạ vàng làm bám dính mồ hôi và dầu mỡ.",
      "Rút RAM ra khi máy vừa tắt được vài giây, linh kiện còn đang rất nóng có thể gây phỏng tay.",
    ],
    pokaYoke: "Chỉ cầm vào hai góc trên của bảng mạch PCB thanh RAM, đặt ngay ngắn vào khay linh kiện chống tĩnh điện.",
    imageSrc: "/images/ol-01/guide-clean-ram-slot.webp",
    imageAlt: "Kỹ thuật mở ngàm và tháo thanh RAM DDR4 khỏi bo mạch H510",
  },
  {
    id: "dis-4",
    stepNumber: 4,
    title: "Tháo Ổ Cứng SSD SATA/NVMe & Cáp Tín Hiệu",
    shortName: "Tháo Ổ Cứng SSD",
    motto: "BÓP LẪY SẮT – RÚT DÂY SATA",
    quickAction: "Lấy ngón tay bóp nhẹ vào lẫy kim loại trên đầu cáp SATA rồi rút thẳng; rút cáp nguồn chữ L; tháo ốc ổ SSD.",
    quickSign: "Cáp SATA trượt ra nhẹ nhàng khi bóp chốt kim loại.",
    quickDont: "Cấm giật cáp khi chưa bóp lẫy kim loại (sẽ giật gãy chân nhựa trên mainboard).",
    tool: "Tua vít bake từ tính PH1 / PH2, khay ốc nhỏ",
    action: "Với SSD 2.5\" SATA: Dùng ngón tay bóp nhẹ vào lẫy kim loại trên đầu cáp SATA Data rồi rút thẳng ra; sau đó rút cáp nguồn SATA mỏng hình chữ L; vặn ốc cố định khung ổ đĩa. Với SSD M.2 NVMe: Vặn ốc khóa đuôi M.2, nhấc ổ chếch lên 30 độ rồi rút nhẹ theo chiều xiên.",
    commonMistakes: [
      "Giật mạnh cáp SATA khi chưa bóp lẫy khóa kim loại, làm toác gãy vỏ nhựa chân cắm SATA trên bo mạch hoặc ổ cứng.",
      "Làm rơi hoặc làm toét đầu ốc vít siêu nhỏ của khe M.2 NVMe.",
      "Kéo vặn xoắn dây cáp tín hiệu gây đứt ngầm lõi đồng truyền dữ liệu bên trong.",
    ],
    pokaYoke: "Luôn bóp chốt lẫy kim loại trước khi rút cáp SATA; ốc M.2 rất nhỏ phải bỏ riêng vào ngăn nam châm khay ốc.",
    imageSrc: "/images/ol-01/workflow-thao-may.webp",
    imageAlt: "Tháo cáp tín hiệu SATA dữ liệu có lẫy kim loại và cáp nguồn ổ cứng",
  },
  {
    id: "dis-5",
    stepNumber: 5,
    title: "Tháo Cụm Cáp F_PANEL, Dây Fan & Nguồn 24-Pin ATX / 8-Pin CPU",
    shortName: "Tháo Dây Cáp Nối",
    motto: "CHỤP ẢNH MÀU DÂY – BÓP LẪY 24-PIN",
    quickAction: "Lấy điện thoại chụp lại cụm dây F_PANEL trước khi rút; bóp lẫy khóa to đầu 24-pin lắc nhẹ 2 bên nhấc lên.",
    quickSign: "Đầu nhựa giắc cắm nhả ngàm khóa và rút ra nguyên vẹn.",
    quickDont: "Cấm cầm vào dây điện để giật (sẽ làm đứt ngầm lõi đồng bên trong).",
    tool: "Điện thoại chụp ảnh lưu sơ đồ màu dây, tay trần",
    action: "Dùng điện thoại chụp rõ ảnh vị trí cắm của cụm dây F_PANEL (POWER SW, RESET, LED) để đối chiếu khi lắp lại. Nhẹ nhàng rút từng giắc cắm F_PANEL, USB và Audio. Rút giắc cấp nguồn 8-pin CPU ở góc trên. Bóp lẫy khóa nhựa to của đầu cấp nguồn 24-pin ATX, lắc nhẹ hai bên thân giắc và rút dứt khoát lên trên.",
    commonMistakes: [
      "Cầm vào sợi dây điện giật mạnh thay vì cầm vào chuôi nhựa giắc cắm, dẫn đến đứt ngầm hoặc tuột chân đồng ra khỏi vỏ nhựa.",
      "Tháo cụm F_PANEL mà không chụp ảnh lưu lại, lúc lắp lại cắm mò dẫn đến bấm nút nguồn máy không phản hồi.",
      "Không bóp lẫy khóa nhựa 24-pin mà cố giật làm nứt bo mạch chủ tại vị trí cổng nguồn.",
    ],
    pokaYoke: "Quy tắc cầm chuôi nhựa có lẫy, không bao giờ giật dây điện; chụp ảnh lại cụm 9-pin trước khi tháo rời.",
    imageSrc: "/images/ol-01/guide-fpanel-diagram.webp",
    imageAlt: "Sơ đồ và kỹ thuật tháo cắm cụm dây F_PANEL và đầu cấp nguồn 24-pin bo mạch",
  },
  {
    id: "dis-6",
    stepNumber: 6,
    title: "Tháo Cụm Tản Nhiệt CPU & Nhấc Bo Mạch Chủ (Mainboard H510)",
    shortName: "Tháo Tản CPU & Mainboard",
    motto: "XOAY CHỐT NHẢ NGÀM – ĐẾM ĐỦ 6 ỐC MAIN",
    quickAction: "Xoay 4 chốt tản nhiệt Intel theo chiều mũi tên, lay nhẹ tách keo rồi nhấc quạt lên; tháo đủ 6 ốc đệm nhấc bo mạch.",
    quickSign: "Mặt quạt tách êm khỏi CPU; 6 ốc bo mạch đã tháo hết nằm gọn trong khay.",
    quickDont: "Cấm cạy bo mạch khi chưa tháo hết ốc chân đệm Standoff (sẽ làm nứt gãy bo mạch).",
    tool: "Tua vít bake từ tính PH2, khăn giấy mềm, cồn vệ sinh 90 độ",
    action: "Rút giắc dây quạt CPU FAN. Xoay 4 chốt khóa tản nhiệt Intel theo chiều mũi tên để nhả ngàm (hoặc tháo 4 ốc tản nhôm theo đường chéo), lay nhẹ cụm tản nhiệt theo vòng tròn để lớp keo khô tách ra rồi nhấc thẳng đứng lên. Vặn đủ 6 ốc cố định bo mạch chủ vào khung case, nhấc nghiêng bo mạch ra khỏi miếng che cổng I/O Shield.",
    commonMistakes: [
      "Xoay chốt tản nhiệt Intel ngược hướng làm gãy chân lẫy nhựa trắng của quạt tản nhiệt zin.",
      "Keo tản nhiệt bị khô cứng như xi măng, giật cục tản thẳng lên làm bật bung cả CPU dính theo tản (đặc biệt nguy hiểm).",
      "Quên chưa tháo đủ 6 ốc đệm standoff trên bo mạch mà cố cạy mainboard lên gây gãy nứt mạch in PCB.",
    ],
    pokaYoke: "Nếu keo tản nhiệt dính chặt, lay nhẹ qua lại theo hình tròn để tách keo trước khi nhấc; đếm đủ 6 ốc tháo ra trước khi nhấc main.",
    imageSrc: "/images/ol-01/workflow-thao-may.webp",
    imageAlt: "Quy trình nhấc cụm tản nhiệt CPU và tháo 6 ốc cố định bo mạch chủ H510",
  },
];

export const ASSEMBLY_STEPS: MechanicalStep[] = [
  {
    id: "asm-1",
    stepNumber: 1,
    title: "Lắp CPU LGA1200, Tra Keo Tản Nhiệt & Bắt Quạt CPU",
    shortName: "Lắp CPU & Tản Nhiệt",
    motto: "SO TAM GIÁC VÀNG – 1 HẠT ĐẬU XANH KEO",
    quickAction: "Đặt CPU đúng tam giác vàng góc dưới, gài khóa; bơm 1 hạt đậu xanh keo tản nhiệt; ốp quạt CPU và cắm dây CPU_FAN.",
    quickSign: "CPU nằm phẳng khít trong socket; 4 chốt quạt kêu 'cạch'; quạt đã cắm dây.",
    quickDont: "Cấm ấn mạnh CPU khi thấy cộm tay; cấm quên bóc nilon đáy quạt tản nhiệt mới.",
    tool: "Keo tản nhiệt xilanh xịn (gốc gốm/kim loại), tua vít bake, găng tay",
    action: "Mở cần khóa socket LGA1200 trên Mainboard H510. Cầm CPU ở hai cạnh mép, so đúng 2 rãnh khuyết định vị và hình tam giác vàng ở góc dưới bên trái, đặt nhẹ nhàng rơi tự nhiên vào socket (tuyệt đối không ấn mạnh). Gài nẹp và hạ cần khóa. Bơm 1 lượng keo tản nhiệt bằng hạt đậu xanh (đường kính ~4mm) ngay chính giữa lưng CPU. Đặt tản nhiệt cân đối và ấn chéo 4 góc nghe tiếng cạch khóa ngàm. Cắm dây quạt vào chân cắm CPU_FAN.",
    commonMistakes: [
      "Đặt ngược chiều CPU hoặc làm trượt tay làm cong gập chân kim socket LGA1200 (lỗi hỏng bo mạch không thể sửa chữa).",
      "Quên bóc lớp nilon bảo vệ trong suốt ở đáy tản nhiệt mới trước khi ốp vào CPU, máy bật lên 100°C quá nhiệt sập nguồn.",
      "Bôi quá nhiều keo tản nhiệt làm tràn be bét xuống chân socket và vi mạch xung quanh bo mạch gây chập cháy.",
      "Quên cắm dây quạt CPU_FAN khiến quạt không quay, máy báo cảnh báo 'CPU Fan Error' khi khởi động.",
    ],
    pokaYoke: "Khẩu quyết: 'Tam giác vàng so tam giác socket -> 1 hạt đậu xanh keo tản nhiệt -> Bóc nilon đáy quạt -> Cắm CPU_FAN'.",
    imageSrc: "/images/ol-01/workflow-lap-may.webp",
    imageAlt: "Lắp CPU LGA1200 đúng ngàm khuyết và bơm keo tản nhiệt hạt đậu xanh",
  },
  {
    id: "asm-2",
    stepNumber: 2,
    title: "Lắp Thanh RAM 8GB DDR4 Đúng Rãnh Khuyết Lệch",
    shortName: "Lắp RAM DDR4",
    motto: "SO RÃNH KHUYẾT – ẤN NGHE TIẾNG TÁCH",
    quickAction: "Mở lẫy khe RAM, so rãnh khuyết lệch trùng gờ nổi, dùng 2 ngón cái ấn đều 2 đầu xuống.",
    quickSign: "Nghe tiếng 'TÁCH' đanh gọn, hai lẫy khóa tự động bật vào nẹp chặt thanh RAM.",
    quickDont: "Cấm ấn cố khi cắm ngược rãnh khuyết (sẽ làm gãy thanh RAM và toác khe cắm).",
    tool: "Gôm trắng vệ sinh chân vàng, chổi quét mạt",
    action: "Mở lẫy khóa khe cắm RAM trên mainboard H510. Quan sát rãnh khuyết chống cắm ngược trên thanh RAM DDR4 (rãnh lệch về một phía so với tâm) trùng khớp với gờ nổi trong lòng khe cắm. Đặt thanh RAM vuông góc 90 độ vào khe, dùng 2 ngón tay cái ấn đều với lực vừa phải xuống hai đầu thanh RAM cho đến khi nghe tiếng 'TÁCH' đanh gọn và lẫy khóa tự động ngậm khít.",
    commonMistakes: [
      "Cắm ngược đầu rãnh khuyết nhưng cố tình dùng sức tì đè mạnh làm toác khe RAM và mẻ thanh nhớ.",
      "Ấn không đều lực khiến một đầu đã vào nhưng đầu kia bị kênh ra ngoài, bật máy quạt quay tít nhưng màn hình đen ngòm và phát tiếng bíp dài liên tục.",
      "Dùng tay bẩn chạm vào chân mạ vàng trước khi cắm làm bụi bẩn và dầu nhờn cản trở tiếp xúc.",
    ],
    pokaYoke: "Khẩu quyết: 'So rãnh khuyết trước -> Ấn đều 2 đầu -> Nghe tiếng TÁCH đanh gọn -> Khóa lẫy tự ngậm khít'.",
    imageSrc: "/images/ol-01/guide-clean-ram-slot.webp",
    imageAlt: "Lắp thanh RAM DDR4 đúng khớp rãnh khuyết lệch và khóa lẫy ngậm khít",
  },
  {
    id: "asm-3",
    stepNumber: 3,
    title: "Gá Chặn I/O Shield, Đặt Mainboard Vào Case & Siết Ốc Standoff",
    shortName: "Lắp Mainboard Vào Case",
    motto: "ĐẾM ĐỦ TRỤ ĐỒNG – BẮT 6 ỐC CHỮ X",
    quickAction: "Đếm đủ các chân trụ đồng đệm (Standoff) cách điện đáy case, gá nắp sắt I/O Shield rồi siết 6 ốc theo đường chéo.",
    quickSign: "Bo mạch nằm phẳng đều trên các chân đệm, các cổng phía sau thò ra khít nắp sắt.",
    quickDont: "Cấm quên trụ đệm Standoff (lưng bo mạch chạm vỏ sắt case sẽ gây nổ chập điện ngay lập tức).",
    tool: "Tua vít bake từ tính, 6 ốc ren mịn bo mạch, chân đệm trụ đồng standoff",
    action: "Ấn miếng che cổng kết nối (I/O Shield) từ bên trong khung case ra phía sau cho đến khi khớp chặt 4 góc. Kiểm tra đếm đủ các chân trụ đồng đệm (Standoff) trên thành case trùng khớp với các lỗ bắt ốc của bo mạch chủ H510. Đặt bo mạch nghiêng nhẹ đưa các cổng kết nối khớp vào I/O Shield rồi hạ phẳng xuống các chân đệm. Vặn đủ 6 ốc ren mịn theo đường chéo chữ X, vặn vừa tay không siết quá chặt.",
    commonMistakes: [
      "Quên lắp ốc chân đệm Standoff, gắn trực tiếp lưng bo mạch lên thành kim loại của case dẫn đến chập mạch nổ nguồn ngay lần bật đầu tiên.",
      "Quên lắp miếng I/O Shield trước khi siết ốc mainboard, phải tháo toàn bộ ốc ra làm lại từ đầu.",
      "Lưỡi kim loại tiếp địa của I/O Shield bị chọc thụt vào trong lòng cổng mạng LAN hoặc cổng HDMI làm nghẽn không cắm được dây.",
      "Dùng nhầm ốc ren thô của nguồn/vỏ case để siết vào chân đệm ren mịn làm toét rách ren ốc.",
    ],
    pokaYoke: "Quy tắc 2 bước kiểm tra: 1. Đếm đủ số trụ đồng Standoff. 2. Soi đèn kiểm tra lưỡi thép I/O Shield không chọc vào trong lòng các cổng kết nối.",
    imageSrc: "/images/ol-01/workflow-lap-may.webp",
    imageAlt: "Gá miếng chặn I/O Shield và siết ốc đệm standoff cố định bo mạch chủ H510",
  },
  {
    id: "asm-4",
    stepNumber: 4,
    title: "Lắp Bộ Nguồn PSU & Đi Dây Cấp Điện (24-Pin ATX & 8-Pin CPU)",
    shortName: "Lắp Nguồn & Đi Dây Điện",
    motto: "QUẠT NGUỒN HƯỚNG RA – DÂY CPU ĐÚNG CHỮ",
    quickAction: "Lắp nguồn vặn 4 ốc; cắm dây 24-pin ATX vào bo mạch; cắm dây 8-pin có chữ 'CPU' vào góc trên bo mạch.",
    quickSign: "Các lẫy khóa nhựa ngậm chặt vào gờ cắm, không bị lỏng lẻo.",
    quickDont: "Cấm cắm nhầm dây có chữ 'PCI-E' (của card màn hình) vào chân cắm CPU (sai điện thế làm nổ bo mạch).",
    tool: "Tua vít bake PH2, 4 ốc ren thô bộ nguồn, dây rút nhựa",
    action: "Đặt bộ nguồn vào khoang dưới case, quạt hút gió của nguồn hướng xuống đáy case (nếu case có lưới lọc bụi đáy) hoặc hướng vào trong khoang. Vặn chặt 4 ốc ren thô phía sau. Luồn dây 8-pin CPU (hoặc 4+4 pin) qua khe hẹp phía trên góc trái và cắm chắc chắn vào cổng nguồn CPU trên bo mạch. Luồn dây 24-pin ATX qua khe hông, cắm kịch vào cổng nguồn chính của mainboard cho đến khi lẫy khóa nhựa ngậm chặt.",
    commonMistakes: [
      "Lắp ngược chiều quạt nguồn khiến nguồn bị kín gió, chạy một lúc quá nhiệt tự ngắt nguồn bảo vệ.",
      "Cắm nhầm đầu cấp nguồn card rời PCIe 8-pin (chia 6+2) vào khe cấp nguồn CPU 8-pin (chia 4+4) làm nổ IC nguồn và dàn VRM do sai sơ đồ cực điện 12V!",
      "Cắm đầu 24-pin chưa hết nấc, lẫy khóa chưa ngậm dẫn đến chập chờn tiếp xúc hoặc đánh tia lửa điện làm sun đầu nhựa.",
    ],
    pokaYoke: "Tuyệt đối phân biệt: Đầu cắm CPU luôn ghi chữ 'CPU' (chia 4+4). Đầu cấp card đồ họa luôn ghi chữ 'PCI-E' (chia 6+2). Lẫy khóa phải ngậm kẹp chặt.",
    imageSrc: "/images/ol-01/workflow-lap-may.webp",
    imageAlt: "Lắp bộ nguồn PSU đúng chiều thông gió và cắm lẫy khóa cáp 24-pin ATX",
  },
  {
    id: "asm-5",
    stepNumber: 5,
    title: "Cắm Cụm Chân Điều Khiển F_PANEL, Dây USB & Cáp Âm Thanh Audio",
    shortName: "Cắm Cụm Dây F_PANEL",
    motto: "POWER SW CẮM SÁT CHÂN KHUYẾT",
    quickAction: "Tìm cụm 9 chân F_PANEL góc dưới phải: cắm 2 chân POWER SW ở hàng trên ngay sát cạnh vị trí chân bị khuyết.",
    quickSign: "Cắm đúng vị trí, bấm nút Power trên case là máy khởi động bật nguồn ngay.",
    quickDont: "Cấm cắm lộn sang chân Reset SW (sẽ bấm nút nguồn không có tác dụng).",
    tool: "Đèn pin soi sáng, sơ đồ chân kim chuẩn 9-pin",
    action: "Xác định cụm chân cắm F_PANEL ở góc dưới bên phải bo mạch chủ H510. Quan sát vị trí khuyết chân kim (chân số 9 trống). Cắm 2 chân POWER SW vào hàng trên sát vị trí chân khuyết. Cắm 2 chân POWER LED vào bên cạnh. Cắm 2 chân RESET SW vào hàng dưới đối diện POWER SW. Cắm 2 chân HDD LED vào bên cạnh Reset. Sau đó cắm dây USB 2.0 (khuyết chân góc), USB 3.0 (gờ định vị to) và HD Audio (khuyết chân giữa) vào đúng vị trí in chữ trên mainboard.",
    commonMistakes: [
      "Cắm nhầm vị trí POWER SW sang RESET SW khiến nút bấm nguồn trên thùng máy không có tác dụng.",
      "Cắm ngược cực âm dương (+ / -) của đèn LED làm đèn HDD LED hoặc đèn Power LED không sáng khi máy hoạt động.",
      "Cắm lệch hoặc dùng lực ấn mạnh chân USB 3.0 màu xanh làm cong gập gãy các chân kim siêu nhỏ bên trong.",
    ],
    pokaYoke: "Khẩu quyết F_PANEL bất hủ: 'Chân POWER SW nằm ở hàng trên ngay sát cạnh chân trống bị khuyết; nút nguồn & reset không phân cực âm dương'.",
    imageSrc: "/images/ol-01/guide-fpanel-diagram.webp",
    imageAlt: "Bản đồ cắm chân kim F_PANEL hàng trên POWER SW và hàng dưới RESET SW",
  },
  {
    id: "asm-6",
    stepNumber: 6,
    title: "Lắp Card Đồ Họa Rời (VGA GT 730) & Siết Ốc Nẹp Chống Xệ",
    shortName: "Lắp Card Đồ Họa Rời GT 730",
    motto: "GÀI KHÓA PCIE – SIẾT CHẶT ỐC NẸP",
    quickAction: "Mở lẫy PCIe x16, ấn card GT 730 thẳng vào khe cho đến khi lẫy đuôi khóa lại; vặn chặt ốc nẹp sắt vào thùng case.",
    quickSign: "Lẫy khóa đuôi ôm chặt chân card, card cố định cứng cáp không rung lắc.",
    quickDont: "Cấm quên vặn ốc nẹp sau case (card bị xệ lỏng chân khi cắm dây màn hình).",
    tool: "Tua vít bake từ tính, ốc nẹp kim loại nắp sau case",
    action: "Gạt mở lẫy khóa đuôi khe cắm PCIe x16 trên bo mạch H510. Căn chỉnh phần nẹp kim loại của card đồ họa khớp với khe mở ở mặt sau case máy tính. Đặt chân cắm mạ vàng của card thẳng hàng với khe PCIe x16 rồi dùng lực đều ấn xuống cho đến khi lẫy đuôi khe cắm tự động nhảy tiếng 'TÁCH' giữ chặt đuôi card. Dùng tua vít siết chặt ốc nẹp giữ card vào thành thùng máy.",
    commonMistakes: [
      "Quên không siết ốc nẹp kim loại sau case khiến card bị xệ và rung lắc lỏng chân cắm khi học sinh cắm cáp màn hình phía sau.",
      "Chưa mở lẫy khóa PCIe mà đã ấn card vào làm gãy cong lẫy nhựa bảo vệ bo mạch.",
      "Sau khi lắp card rời xong, lúc thử máy lại cắm nhầm dây màn hình vào cổng VGA trên bo mạch chủ (khiến màn hình tối om do CPU i5-10400F không có GPU tích hợp).",
    ],
    pokaYoke: "Quy tắc 2 điểm khóa: 1. Khóa lẫy nhựa đuôi PCIe tự ngậm. 2. Bắt buộc siết ốc nẹp kim loại cố định vào khung case.",
    imageSrc: "/images/ol-01/guide-clean-vga-pcie.webp",
    imageAlt: "Lắp card đồ họa rời GT 730 khóa lẫy ngậm và siết ốc nẹp khung sau",
  },
  {
    id: "asm-7",
    stepNumber: 7,
    title: "Lắp Ổ Cứng SSD, Nối Cáp SATA Dữ Liệu/Nguồn & Nghiệm Thu Khởi Động",
    shortName: "Lắp Ổ Cứng & Test Khởi Động",
    motto: "CÁP ĐỦ DATA VÀ NGUỒN – DÂY CẮM CARD RỜI",
    quickAction: "Cắm đủ 2 dây cho ổ SSD (dây SATA dữ liệu + dây nguồn chữ L); cắm dây màn hình vào cổng của Card rời GT 730 phía dưới.",
    quickSign: "Bật máy lên hình bình thường, ổ SSD nhận diện tốt trong BIOS.",
    quickDont: "Cấm cắm dây màn hình lên cụm cổng trên bo mạch chủ (màn hình sẽ đen ngòm vì CPU i5-10400F không có GPU tích hợp).",
    tool: "Tua vít bake, cáp SATA Data có lẫy kim loại, dây nguồn máy tính",
    action: "Bắt ốc cố định ổ cứng SSD 2.5\" vào khay case (hoặc lắp SSD M.2 NVMe vào khe M.2 siết ốc đuôi). Cắm cáp SATA Data một đầu vào cổng SATA_1 trên mainboard H510, đầu kia cắm vào ổ cứng SSD (nghe tiếng tách nhẹ của lẫy kim loại). Cắm đầu cáp nguồn SATA mỏng hình chữ L từ bộ nguồn vào ổ cứng. Kiểm tra lại toàn bộ khoang máy không để rơi rớt ốc vít kim loại. Cắm dây nguồn 220V, cắm dây màn hình vào Card rời GT 730 và bấm nút Power kiểm tra máy lên hình xuất BIOS bình thường.",
    commonMistakes: [
      "Quên cắm cáp nguồn SATA cho ổ cứng (chỉ cắm cáp SATA Data), máy bật lên báo lỗi 'Reboot and Select proper Boot device'.",
      "Cắm cáp màn hình lộn lên cổng VGA của bo mạch chủ thay vì cắm vào cổng của Card màn hình rời GT 730.",
      "Để sót ốc vít hoặc đầu dây kim loại rơi tự do chạm vào lưng bo mạch chủ gây chập nổ bo mạch khi cắm điện kiểm tra.",
    ],
    pokaYoke: "Khẩu quyết nghiệm thu: 'Dây màn hình cắm Card rời GT 730 phía dưới -> Cáp SATA đủ Data và Nguồn -> Khoang case sạch ốc rơi'.",
    imageSrc: "/images/ol-01/workflow-lap-may.webp",
    imageAlt: "Cắm cáp SATA dữ liệu và nguồn cho ổ cứng SSD và nghiệm thu khởi động máy",
  },
];

export interface CoreSkill {
  id: "ram" | "vga" | "fpanel" | "cmos";
  name: string;
  subtitle: string;
  badge: string;
  motto: string;
  quickAction: string;
  quickSign: string;
  quickDont: string;
  imageSrc: string;
  imageAlt: string;
  tools: string[];
  steps: string[];
  mistakes: string[];
  pokaYoke: string;
}

export const CORE_SKILLS: CoreSkill[] = [
  {
    id: "ram",
    name: "Vệ Sinh Chân & Khe Cắm RAM DDR4",
    subtitle: "Khắc phục 90% lỗi quạt quay tít không lên hình, máy kêu bíp dài liên tục",
    badge: "Kỹ Năng Cốt Lõi #1",
    motto: "GÔM TRẮNG SÁCH VỞ – THỔI SẠCH VỤN MẠT",
    quickAction: "Dùng gôm học sinh màu trắng chà sáng bóng hàng chân vàng 2 mặt, lấy chổi quét sạch vụn gôm trước khi cắm lại.",
    quickSign: "Chân mạ vàng sáng bóng như mới, cắm vào nghe tiếng 'TÁCH' 2 đầu.",
    quickDont: "Không dùng gôm đen hay giấy ráp; không dùng miệng thổi bụi (hơi thở ẩm làm rỉ chân đồng).",
    imageSrc: "/images/ol-01/guide-clean-ram-slot.webp",
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
    motto: "MỞ LẪY ĐUÔI – SIẾT ỐC NẸP – DÂY CẮM CARD RỜI",
    quickAction: "Gạt mở lẫy đuôi trước khi nhấc card, luôn vặn ốc nẹp case, cắm dây màn hình vào card rời phía dưới.",
    quickSign: "Card chắc chắn không xệ, màn hình hiển thị logo ngay khi bật.",
    quickDont: "Cấm cắm dây màn hình lên cụm cổng bo mạch chủ phía trên.",
    imageSrc: "/images/ol-01/guide-clean-vga-pcie.webp",
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
    motto: "HÀNG TRÊN SÁT CHÂN KHUYẾT LÀ POWER SW",
    quickAction: "Tìm vị trí chân kim số 9 bị khuyết: 2 chân kim ở hàng trên ngay cạnh nó chính là công tắc bật nguồn POWER SW.",
    quickSign: "Bấm nút nguồn máy tính khởi động ngay từ lần đầu.",
    quickDont: "Nút Power & Reset không phân biệt âm dương (+/-); riêng đèn LED (HDD/Power LED) phải cắm đúng cực (+/-).",
    imageSrc: "/images/ol-01/guide-fpanel-diagram.webp",
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
    motto: "GẠT LẪY BUNG PIN – MẶT CHỮ DẤU (+) NGỬA LÊN",
    quickAction: "Rút điện 220V, bấm nút nguồn 3 lần, gạt nhẹ lẫy kim loại cho viên pin CR2032 nảy chéo 45 độ lên, chờ 3 phút lắp lại.",
    quickSign: "Máy được xóa sạch thiết lập BIOS cũ, khắc phục lỗi treo logo hoặc quên mật khẩu BIOS.",
    quickDont: "Cấm lắp úp mặt dấu (+) xuống dưới; cấm tháo pin khi chưa rút phích cắm điện 220V.",
    imageSrc: "/images/ol-01/guide-clear-cmos-pin.webp",
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

export interface MotherboardModel {
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
}

export const LAB_MOTHERBOARDS: MotherboardModel[] = [
  {
    id: "msi",
    name: "MSI H510M-A PRO",
    brand: "MSI (Micro-Star International)",
    badge: "Phòng Lab · Chuẩn Phổ Biến #1",
    color: "rose",
    imageSrc: "/images/ol-01/main-h510.webp",
    imageAlt: "Bo mạch chủ MSI H510M-A PRO Socket LGA1200",
    bootKey: "F11",
    biosKey: "Delete (Del)",
    debugMethod: "EZ Debug LED (4 đèn CPU - DRAM - VGA - BOOT góc trên phải)",
    ramLatchType: "1-Side Latch (1 ngàm trên gạt, ngàm dưới cố định)",
    fpanelLabel: "Cụm JFP1 (Chuẩn 9 chân kim quốc tế)",
    ktvTip: "Khi máy không lên hình, nhìn ngay cụm 4 đèn EZ Debug LED: đèn dừng ở linh kiện nào thì xử lý ngay chỗ đó (dừng ở DRAM = vệ sinh chân RAM).",
  },
  {
    id: "asus",
    name: "ASUS PRIME H510M-K",
    brand: "ASUS (ASUSTeK Computer)",
    badge: "Phòng Lab · Siêu Bền 5X Protection",
    color: "blue",
    imageSrc: "/images/ol-01/main-asus-h510.webp",
    imageAlt: "Bo mạch chủ ASUS PRIME H510M-K Socket LGA1200",
    bootKey: "F8 (Đặc trưng ASUS - Tuyệt đối không bấm F11)",
    biosKey: "Delete (Del) hoặc F2",
    debugMethod: "Q-LED Core (Nháy nhịp đèn Power) / Chân cắm Loa Buzzer SPEAKER",
    ramLatchType: "Q-DIMM (Ngàm gạt 1 đầu chống kẹt đuôi card đồ họa)",
    fpanelLabel: "Cụm PANEL (10-1 chân kim có in rõ sơ đồ)",
    ktvTip: "Khi boot USB cứu hộ WinPE hoặc cài Win, BẮT BUỘC bấm phím F8. Học sinh quen tay bấm F11 của MSI sẽ không hiện Boot Menu trên main ASUS!",
  },
  {
    id: "winnfox",
    name: "WINNFOX H510G / PRO D4",
    brand: "Winnfox (Efang Intelligent Technology)",
    badge: "Phòng Lab · Tối Ưu Chi Phí Nghề",
    color: "emerald",
    imageSrc: "/images/ol-01/main-winnfox-h510.webp",
    imageAlt: "Bo mạch chủ Winnfox H510G Socket LGA1200 giá rẻ phổ thông",
    bootKey: "F11 (hoặc F7 ở một số bản AMI BIOS)",
    biosKey: "Delete (Del)",
    debugMethod: "BẮT BUỘC cắm Loa Buzzer vào chân J_SPEAKER để nghe mã tiếng bíp",
    ramLatchType: "2 ngàm gạt truyền thống ở 2 đầu khe RAM",
    fpanelLabel: "Cụm F_PANEL (9 chân kim in chữ rõ nét)",
    ktvTip: "Mainboard Winnfox không trang bị dàn đèn EZ Debug, nên KTV bắt buộc phải cắm Loa Buzzer (Loa bíp) vào chân Speaker để bắt bệnh qua tiếng bíp.",
  },
  {
    id: "compare",
    name: "Bản Đồ So Sánh 3 Main (MSI · ASUS · WINNFOX)",
    brand: "Bảng Đối Chiếu 3 Dòng Bo Mạch H510 Thực Tế Phòng Máy",
    badge: "Infographic Độc Quyền KTV",
    color: "amber",
    imageSrc: "/images/ol-01/main-h510-compare.webp",
    imageAlt: "Bảng so sánh 3 dòng Mainboard H510 MSI vs ASUS vs Winnfox phòng lab",
    bootKey: "MSI: F11 | ASUS: F8 | Winnfox: F11/F7",
    biosKey: "Tất cả đều vào BIOS bằng phím Delete (Del)",
    debugMethod: "MSI: 4 Đèn EZ Debug | ASUS: Q-LED & Buzzer | Winnfox: Loa Buzzer bíp",
    ramLatchType: "MSI & ASUS: 1 lẫy trên | Winnfox: 2 lẫy hai đầu",
    fpanelLabel: "MSI: JFP1 | ASUS: PANEL | Winnfox: F_PANEL",
    ktvTip: "Ghi nhớ bảng đối chiếu này giúp học viên KTV làm chủ mọi bàn kỹ thuật trong phòng máy thực hành mà không bị lúng túng khi đổi máy!",
  },
];

export interface HotspotInfo {
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

export const H510_HOTSPOTS: HotspotInfo[] = [
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
