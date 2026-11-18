// ============================================================================
// DỮ LIỆU TRA CỨU SỰ CỐ PHẦN CỨNG & NGÂN HÀNG TRẮC NGHIỆM MẠNG
// Biên soạn: CN. Phạm Tiến Đông
// Cổng Học Tập & Giảng Dạy CNTT · Lớp 04THA3 (Cơ sở Ea H'leo)
// ĐẶC BIỆT: Thầy chỉ cần thêm/sửa/xóa nội dung trong file này.
// Toàn bộ giao diện (Bộ lọc, Thanh tìm kiếm, Trắc nghiệm) tự động cập nhật 100%!
// ============================================================================

// ============================================================================
// PHẦN 1: KIỂU DỮ LIỆU (TYPES & INTERFACES)
// ============================================================================

export type HardwareComponentCategory =
  | 'mainboard-h510'
  | 'ram-ddr4'
  | 'cpu-socket1200'
  | 'storage-ssd'
  | 'vga-gt730'
  | 'psu-power'
  | 'network-lan';

export interface HardwareTroubleItem {
  id: string; // Mã định danh duy nhất (vd: 'hw_ram_01')
  code: string; // Mã hiển thị (vd: 'HW-RAM-01')
  category: HardwareComponentCategory; // Phân nhóm linh kiện
  categoryLabel: string; // Tên hiển thị tiếng Việt
  title: string; // Tên sự cố ngắn gọn
  severity: 'critical' | 'high' | 'medium'; // Mức độ nghiêm trọng
  hardware: string; // Linh kiện cụ thể tại phòng lab
  symptom: string; // Triệu chứng lâm sàng (Mắt thấy - Tai nghe)
  rootCause: string; // Nguyên nhân cốt lõi
  pokaYokeSteps: string[]; // Các bước xử lý chuẩn KTV & Poka-Yoke
  safetyAlert?: string; // Lưu ý an toàn điện / chống tĩnh điện bắt buộc
  tools: string[]; // Dụng cụ cần dùng
}

export type NetworkQuizCategory =
  | 'cabling-physical'
  | 'osi-tcpip'
  | 'ip-subnetting'
  | 'device-switching'
  | 'windows-network';

export interface NetworkQuizQuestion {
  id: string; // Mã câu hỏi (vd: 'net_q01')
  category: NetworkQuizCategory; // Phân nhóm chuyên đề
  categoryLabel: string; // Nhãn chuyên đề
  difficulty: 'co-ban' | 'thuc-chien' | 'nang-cao'; // Độ khó
  question: string; // Nội dung câu hỏi tình huống thực tế
  options: string[]; // 4 lựa chọn [A, B, C, D]
  correctIndex: number; // Đáp án đúng (0=A, 1=B, 2=C, 3=D)
  explanation: string; // Lời giải thích trực quan, ví von đời thường cho 9+3
  technicianTip?: string; // Kinh nghiệm thực chiến của KTV tại phòng máy
}

// ============================================================================
// PHẦN 2: DANH MỤC PHÂN NHÓM PHỤC VỤ BỘ LỌC TỰ ĐỘNG (FILTER TABS)
// ============================================================================

export const HARDWARE_CATEGORIES: { id: string; label: string; icon: string }[] = [
  { id: 'all', label: 'Tất Cả Linh Kiện', icon: '🔍' },
  { id: 'ram-ddr4', label: 'RAM DDR4', icon: '⚡' },
  { id: 'mainboard-h510', label: 'Mainboard H510', icon: '🎛️' },
  { id: 'cpu-socket1200', label: 'CPU Socket LGA1200', icon: '🧠' },
  { id: 'storage-ssd', label: 'Ổ Cứng SSD/NVMe', icon: '💾' },
  { id: 'vga-gt730', label: 'Card Đồ Họa GT 730', icon: '🖥️' },
  { id: 'psu-power', label: 'Nguồn & Vỏ Case', icon: '🔌' },
  { id: 'network-lan', label: 'Cổng Mạng LAN RJ45', icon: '🌐' },
];

export const NETWORK_QUIZ_CATEGORIES: { id: string; label: string; icon: string }[] = [
  { id: 'all', label: 'Tất Cả Chuyên Đề', icon: '🌐' },
  { id: 'cabling-physical', label: 'Bấm Cáp & Tầng Vật Lý', icon: '🔌' },
  { id: 'ip-subnetting', label: 'Chia Mạng Con Subnetting', icon: '⚡' },
  { id: 'osi-tcpip', label: 'Mô Hình OSI & TCP/IP', icon: '📚' },
  { id: 'device-switching', label: 'Thiết Bị Switch & Router', icon: '🎛️' },
  { id: 'windows-network', label: 'Mạng Nội Bộ Windows 10', icon: '💻' },
];

// ============================================================================
// PHẦN 3: DANH SÁCH SỰ CỐ PHẦN CỨNG TRA CỨU NHANH (10+ CA BỆNH THỰC TẾ)
// ============================================================================

export const HARDWARE_TROUBLESHOOTING_LIST: HardwareTroubleItem[] = [
  {
    id: 'hw_ram_01',
    code: 'HW-RAM-01',
    category: 'ram-ddr4',
    categoryLabel: 'Bộ Nhớ Trong RAM DDR4',
    title: 'Quạt CPU quay bình thường, màn hình đen không lên hình, còi bíp liên tục',
    severity: 'critical',
    hardware: 'RAM DDR4 8GB Bus 2666MHz / Bo mạch chủ H510',
    symptom: 'Bật nguồn quạt CPU và quạt vỏ quay đều, màn hình báo "No Signal", còi buzzer phát tiếng bíp dài ngắt quãng liên tục hoặc đèn DRAM trên main sáng màu cam/đỏ.',
    rootCause: 'Chân mạ vàng của thanh RAM DDR4 bị oxy hóa bám bụi bẩn, hoặc ngàm khóa nhựa chưa sập hết khiến hàng trăm chân tiếp xúc bị kênh lệch.',
    pokaYokeSteps: [
      'Rút dây nguồn AC 220V, nhấn giữ nút nguồn case 10 giây để xả sạch điện tích trong các tụ lọc.',
      'Mở chốt ngàm nhựa 2 đầu khe cắm, rút thanh RAM ra theo phương thẳng đứng.',
      'Dùng cục tẩy chì trắng chà nhẹ nhàng đều cả 2 mặt chân mạ vàng của RAM cho đến khi sáng bóng.',
      'Dùng bóng thổi bụi xịt sạch rãnh khe cắm RAM trên mainboard (không dùng miệng thổi để tránh bắn nước bọt).',
      'Căn đúng rãnh khuyết lệch tâm của chuẩn DDR4, ấn đều hai đầu bằng 2 ngón tay cái cho đến khi nghe hai tiếng "TÁCH" đanh gọn.',
    ],
    safetyAlert: 'Tuyệt đối không cắm ngược chiều rãnh khuyết và không dùng lực ấn quá mạnh khi thấy kẹt.',
    tools: ['Cục tẩy chì trắng', 'Bóng thổi bụi cao su', 'Găng tay chống tĩnh điện'],
  },
  {
    id: 'hw_psu_01',
    code: 'HW-PSU-01',
    category: 'psu-power',
    categoryLabel: 'Bộ Nguồn PSU & Nút Bật Case',
    title: 'Bấm nút nguồn máy hoàn toàn im re, quạt không nhích dù có cắm điện',
    severity: 'critical',
    hardware: 'Nguồn công suất thực 450W / Dây cắm 24-pin Mainboard',
    symptom: 'Đã cắm phích điện 220V, bấm nút Power trên thùng máy không có bất kỳ phản hồi nào, đèn LED vỏ case không sáng, quạt nguồn và quạt CPU đứng im.',
    rootCause: 'Công tắc I/O sau nguồn đang ở vị trí O (Tắt), đứt ngầm dây nguồn AC, lỏng chân cắm nút Power SW trên panel F_PANEL, hoặc bộ nguồn kích hoạt chế độ bảo vệ ngắn mạch (chập tải 12V).',
    pokaYokeSteps: [
      'Kiểm tra công tắc I/O sau bộ nguồn, đảm bảo bật sang nấc [ I ]. Thử đổi dây nguồn AC khác cắm trực tiếp vào ổ điện tường.',
      'Rút giắc cắm Power SW trên bo mạch chủ, dùng đầu tua vít bake chạm nhẹ vào 2 chân Power SW xem máy có khởi động không (loại trừ đứt nút case).',
      'Thử kích nguồn bằng que tản nhiệt / ghim giấy: Rút giắc 24-pin khỏi main, chập dây màu Xanh lá (PS-ON) với dây Đen (GND). Nếu quạt nguồn quay thì nguồn sống, lỗi nằm ở mainboard.',
      'Rút giắc 4-pin/8-pin 12V cấp cho CPU rồi bật lại. Nếu máy quay quạt thì mạch VRM cấp nguồn CPU trên main bị chập IC Mosfet.',
    ],
    safetyAlert: 'Rút điện 220V trước khi thao tác đo đạc hoặc rút cắm linh kiện bên trong thùng máy.',
    tools: ['Tua vít bake', 'Đoạn dây đồng / Ghim giấy', 'Đồng hồ vạn năng VOM'],
  },
  {
    id: 'hw_cpu_01',
    code: 'HW-CPU-01',
    category: 'cpu-socket1200',
    categoryLabel: 'Vi Xử Lý CPU Socket LGA1200',
    title: 'Máy tính bật lên dùng được 3-5 phút là tự sập nguồn, quạt CPU gầm rú',
    severity: 'high',
    hardware: 'Intel Core thế hệ 10/11 Socket LGA1200 / Quạt tản nhiệt Intel Stock',
    symptom: 'Máy khởi động vào Windows bình thường nhưng quạt quay hết tốc lực phát tiếng ồn lớn. Dùng vài phút thì máy đột ngột tắt phụt, sờ tay vào khối nhôm tản nhiệt thấy rất nóng hoặc nguội ngắt.',
    rootCause: 'Quên bóc miếng nilon bảo vệ dưới đáy tản nhiệt (lỗi Poka-Yoke kinh điển), khô keo tản nhiệt hoặc 4 chốt gài nhựa tản nhiệt bị gãy/chưa sập ngàm làm tản nhiệt không ép sát vào nắp lưng CPU.',
    pokaYokeSteps: [
      'Chờ 10 phút cho CPU nguội bớt, xoay chốt ngàm tháo quạt tản nhiệt ra khỏi bo mạch chủ.',
      'Kiểm tra mặt tiếp xúc đồng/nhôm: Nếu còn lớp nilon dán bảo vệ có chữ "Warning: Remove Before Use", phải bóc bỏ ngay.',
      'Dùng giấy mềm lau sạch lớp keo tản nhiệt cũ trên bề mặt CPU và đế tản nhiệt.',
      'Bơm đúng 1 lượng keo tản nhiệt bằng hạt đậu xanh (khoảng 0.2ml) vào chính giữa nắp lưng CPU.',
      'Gài đều 4 chân tản nhiệt theo đường chéo đối xứng (chân 1 đối diện chân 3, chân 2 đối diện chân 4) cho đến khi nghe tiếng "CLICK" rõ ràng.',
    ],
    safetyAlert: 'Không bôi quá nhiều keo tản nhiệt làm tràn vào các tụ điện dán và chân socket xung quanh.',
    tools: ['Keo tản nhiệt gốm/bạc', 'Khăn lau cồn Isopropyl 70%', 'Tua vít dẹp mở chốt'],
  },
  {
    id: 'hw_storage_01',
    code: 'HW-storage-01',
    category: 'storage-ssd',
    categoryLabel: 'Ổ Cứng Lưu Trữ SSD SATA / NVMe',
    title: 'Gắn thêm ổ SSD 256GB mới nhưng vào This PC không xuất hiện ổ đĩa',
    severity: 'medium',
    hardware: 'SSD Kingston 256GB SATA III / M.2 PCIe NVMe',
    symptom: 'Vào BIOS máy vẫn nhận đúng tên và dung lượng ổ SSD, nhưng khi vào Windows 10 mở "This PC" (My Computer) thì hoàn toàn không thấy phân vùng ổ đĩa mới.',
    rootCause: 'Ổ cứng SSD mới xuất xưởng từ nhà máy chưa được khởi tạo bảng phân vùng (Initialize Disk) và chưa được định dạng gán ký tự ổ đĩa (New Simple Volume).',
    pokaYokeSteps: [
      'Bấm tổ hợp phím [Windows + X], chọn danh mục [Disk Management].',
      'Cửa sổ pop-up Initialize Disk xuất hiện: Chọn chuẩn bảng phân vùng [GPT] cho hệ thống UEFI hiện đại rồi bấm [OK].',
      'Kéo xuống tìm ổ đĩa có vạch đen ghi chữ "Unallocated" tương ứng dung lượng ~238GB.',
      'Nhấp chuột phải vào vùng Unallocated, chọn [New Simple Volume] ➔ Bấm [Next].',
      'Định dạng hệ thống tệp tin chuẩn [NTFS], đặt tên nhãn [DU_LIEU] và gán ký tự ổ đĩa (ví dụ: ổ D hoặc E). Bấm [Finish].',
    ],
    safetyAlert: 'Tuyệt đối không chọn nhầm ổ đĩa C đang chứa hệ điều hành hoặc ổ dữ liệu cũ của khách để tránh xóa mất dữ liệu.',
    tools: ['Công cụ Disk Management có sẵn trong Windows 10', 'Cáp tín hiệu SATA III (nếu là ổ 2.5")'],
  },
  {
    id: 'hw_vga_01',
    code: 'HW-VGA-01',
    category: 'vga-gt730',
    categoryLabel: 'Card Đồ Họa Rời NVIDIA GT 730',
    title: 'Màn hình xuất hiện sọc rác nhiều màu hoặc bị đơ lag khi mở ảnh/video',
    severity: 'high',
    hardware: 'NVIDIA GeForce GT 730 2GB GDDR5 / Khe PCIe x16',
    symptom: 'Màn hình hiển thị các đường sọc ngang dọc màu xanh lá cây hoặc tím hồng (hiện tượng rác hình / artifact), cửa sổ kéo rê bị bóng mờ, thỉnh thoảng nháy đen kèm thông báo "Display driver stopped responding".',
    rootCause: 'Chân tiếp xúc PCIe x16 của card bị oxy hóa, quạt tản nhiệt của card bị kẹt bụi làm chip GPU quá nhiệt, hoặc lỗi bộ nhớ đồ họa VRAM.',
    pokaYokeSteps: [
      'Rút dây nguồn máy, tháo ốc siết giữ thanh kim loại phía sau case.',
      'Dùng ngón tay gạt chốt khóa an toàn ở đuôi khe PCIe x16 trên mainboard sang một bên trước khi rút card ra (tránh giật gãy khe).',
      'Dùng cục tẩy chà sạch 2 mặt hàng chân tiếp xúc PCIe mạ vàng của card GT 730.',
      'Kiểm tra quạt nhỏ trên card: Dùng bóng thổi xịt sạch bụi, dùng tay quay thử xem cánh quạt có trơn tru không.',
      'Cắm thẳng card vào khe PCIe x16, ấn nhẹ nhàng cho chốt đuôi khe tự động bật lên khóa chặt, siết lại ốc case.',
    ],
    safetyAlert: 'Bắt buộc phải mở chốt gài đuôi khe PCIe x16 trước khi kéo card ra, giật mạnh sẽ làm bật tung cả khe nhựa trên mainboard.',
    tools: ['Tua vít bake', 'Cục tẩy chì trắng', 'Bóng thổi bụi'],
  },
  {
    id: 'hw_main_01',
    code: 'HW-MAIN-01',
    category: 'mainboard-h510',
    categoryLabel: 'Bo Mạch Chủ Intel H510',
    title: 'Mỗi lần ngắt điện bật lại máy tính là bị sai ngày giờ và báo F1 to Run Setup',
    severity: 'medium',
    hardware: 'Bo mạch chủ ASUS Prime H510M-K / MSI H510M-B / Pin CMOS CR2032',
    symptom: 'Mỗi buổi sáng khi cắm điện bật máy, màn hình dừng lại ở dòng chữ "CMOS Date/Time Not Set - Press F1 to Run Setup", sau khi vào Windows thì ngày giờ bị lùi về năm 2020 làm mất kết nối Internet.',
    rootCause: 'Pin cúc áo nuôi bộ nhớ CMOS (chuẩn CR2032 điện áp 3V) trên bo mạch chủ đã hết điện sau 2-3 năm sử dụng.',
    pokaYokeSteps: [
      'Rút điện nguồn AC của máy tính.',
      'Dùng đầu tua vít dẹp ấn nhẹ vào lẫy kim loại giữ pin CMOS trên mainboard để pin cũ tự động bật lên.',
      'Lấy một viên pin CMOS mới chuẩn CR2032 (đo thử bằng VOM đủ 3.0V - 3.3V).',
      'Đặt mặt có dấu cộng (+) quay lên trên, ấn nhẹ viên pin vào khay cho đến khi ngàm kim loại gài chặt.',
      'Bật máy lên, ấn [DEL] hoặc [F2] vào BIOS thiết lập lại Ngày - Tháng - Năm và Giờ hiện tại, nhấn [F10] để Save & Exit.',
    ],
    safetyAlert: 'Không lắp ngược cực pin (mặt có chữ và dấu + phải hướng lên trên).',
    tools: ['Pin CMOS CR2032 3V mới', 'Tua vít dẹp nhỏ', 'Đồng hồ VOM kiểm tra pin'],
  },
  {
    id: 'hw_net_01',
    code: 'HW-NET-01',
    category: 'network-lan',
    categoryLabel: 'Cổng Mạng LAN & Kết Nối Mạng',
    title: 'Cắm dây mạng đèn cổng LAN không sáng, Windows báo Network Cable Unplugged',
    severity: 'high',
    hardware: 'Cổng Realtek Gigabit LAN trên Mainboard / Dây mạng UTP Cat5e',
    symptom: 'Dây mạng cắm vào máy tính khác vẫn chạy tốt, nhưng cắm vào máy phòng lab thì cả 2 đèn xanh/cam ở cổng RJ45 phía sau thùng máy không hề sáng, biểu tượng mạng dưới taskbar hiện dấu gạch chéo đỏ.',
    rootCause: 'Bụi bẩn bám vào các chân kim loại trong cổng LAN trên main, hạt mạng RJ45 bấm bị thụt chân không tiếp xúc được với lá đồng trong cổng, hoặc chip LAN bị khóa (Disable) trong BIOS.',
    pokaYokeSteps: [
      'Soi đèn pin vào cổng RJ45 phía sau mainboard: Kiểm tra xem 8 lá đồng bên trong có bị cong queo hay dính tơ nhện không.',
      'Thử cắm một sợi dây cáp mạng nhảy (Patch cord) đúc sẵn chuẩn nhà máy vào cổng.',
      'Khởi động máy bấm phím [DEL] vào BIOS: Tìm mục [Advanced] ➔ [Onboard Devices Configuration] ➔ Đảm bảo mục [Realtek LAN Controller] đang để trạng thái [Enabled].',
      'Nếu vẫn không nhận: Dùng bình xịt RP7 xịt vào bàn chải đánh răng cũ chải nhẹ nhàng các lá đồng bên trong cổng LAN, để khô 5 phút rồi cắm lại.',
    ],
    safetyAlert: 'Không dùng tua vít sắt cọc cạch chọc bừa bãi làm gãy các lá đồng đàn hồi trong cổng RJ45.',
    tools: ['Đèn pin mini', 'Dây mạng patch cord chuẩn', 'Bàn chải lông mềm khô'],
  },
  {
    id: 'hw_main_02',
    code: 'HW-MAIN-02',
    category: 'mainboard-h510',
    categoryLabel: 'Cổng USB Ngoại Vi & Mặt Trước Case',
    title: 'Cắm USB chuột/phím phía sau main thì nhận, cắm cổng USB mặt trước case im re',
    severity: 'medium',
    hardware: 'Cụm cổng USB 2.0 / 3.0 mặt trước case / Header F_USB trên bo mạch H510',
    symptom: 'Khi học sinh cắm USB bài tập vào 2 cổng USB trên nóc case thì máy không có âm thanh kết nối, đèn USB không sáng, nhưng mang cắm vào các cổng USB phía sau mainboard thì nhận bình thường.',
    rootCause: 'Cáp nối từ cụm USB mặt trước case cắm bị lỏng hoặc cắm sai chân trên hàng cắm F_USB bo mạch chủ, hoặc đứt ngầm dây mạch bên trong case.',
    pokaYokeSteps: [
      'Mở nắp hông thùng máy, lần theo đường dây cáp đi từ mặt trước case xuống mép dưới của bo mạch chủ.',
      'Tìm vị trí chân cắm có in chữ [F_USB1] hoặc [USB_3.0]: Quan sát hàng chân cắm có 1 vị trí chân khuyết (Dummy pin) làm chốt Poka-Yoke chống cắm ngược.',
      'Căn đúng lỗ bị bịt kín trên đầu giắc cắm tương ứng với chân khuyết trên mainboard, ấn thẳng góc ngập hết chân.',
      'Cắm USB vào kiểm tra lại: Nếu vẫn không nhận thì tháo cụm bảng mạch USB mặt trước case kiểm tra xem có bị gãy chân tiếp xúc bằng nhựa màu đen/xanh bên trong không.',
    ],
    safetyAlert: 'Tuyệt đối không cố tình cắm ngược chiều giắc USB 9-pin, nếu cắm sai chân cấp nguồn 5V vào chân dữ liệu Data có thể làm cháy USB của khách ngay lập tức.',
    tools: ['Tua vít bake', 'Đèn pin', 'USB kiểm tra thử'],
  },
];

// ============================================================================
// PHẦN 4: NGÂN HÀNG 25+ CÂU TRẮC NGHIỆM MẠNG THỰC CHIẾN (CHIA 5 CHUYÊN ĐỀ)
// ============================================================================

export const NETWORK_QUIZ_QUESTIONS: NetworkQuizQuestion[] = [
  // --------------------------------------------------------------------------
  // NHÓM 1: BẤM CÁP MẠNG & TẦNG VẬT LÝ (7 CÂU)
  // --------------------------------------------------------------------------
  {
    id: 'net_q01',
    category: 'cabling-physical',
    categoryLabel: 'Bấm Cáp & Tầng Vật Lý',
    difficulty: 'co-ban',
    question: 'Theo tiêu chuẩn quốc tế TIA/EIA-568B, thứ tự màu dây mạng từ trái qua phải (khi úp mặt tiếp xúc chân đồng hạt mạng lên trên) là gì?',
    options: [
      'Trắng Cam - Cam - Trắng Xanh Lá - Xanh Dương - Trắng Xanh Dương - Xanh Lá - Trắng Nâu - Nâu',
      'Trắng Xanh Lá - Xanh Lá - Trắng Cam - Xanh Dương - Trắng Xanh Dương - Cam - Trắng Nâu - Nâu',
      'Cam - Trắng Cam - Xanh Lá - Trắng Xanh Lá - Xanh Dương - Trắng Xanh Dương - Nâu - Trắng Nâu',
      'Trắng Cam - Cam - Trắng Nâu - Nâu - Trắng Xanh Lá - Xanh Lá - Trắng Xanh Dương - Xanh Dương',
    ],
    correctIndex: 0,
    explanation: 'Chuẩn TIA-568B là chuẩn bấm cáp thông dụng nhất tại Việt Nam. Quy tắc nhớ nhanh: Bắt đầu bằng cặp Cam (Trắng Cam - Cam), xen kẽ cặp Xanh Lá kẹp Xanh Dương ở giữa (Trắng Xanh Lá - Xanh Dương - Trắng Xanh Dương - Xanh Lá), và kết thúc bằng cặp Nâu (Trắng Nâu - Nâu).',
    technicianTip: 'Nhớ câu thần chú: "Trắng Cam - Cam, Trắng Lá - Dương, Trắng Dương - Lá, Trắng Nâu - Nâu".',
  },
  {
    id: 'net_q02',
    category: 'cabling-physical',
    categoryLabel: 'Bấm Cáp & Tầng Vật Lý',
    difficulty: 'thuc-chien',
    question: 'Để đường truyền mạng đạt tốc độ kết nối Gigabit Ethernet (1000 Mbps / 1 Gbps), cáp xoắn đôi UTP bắt buộc phải đáp ứng điều kiện nào sau đây?',
    options: [
      'Chỉ cần thông mạch 4 sợi (Chân 1, 2, 3, 6)',
      'Bắt buộc phải thông mạch tuyệt đối đủ cả 8/8 sợi dây đồng',
      'Chỉ cần bấm cáp chéo (Crossover) giữa PC và Switch',
      'Chỉ cần dùng cáp Cat3 hoặc Cat4 đời cũ',
    ],
    correctIndex: 1,
    explanation: 'Chuẩn Fast Ethernet (100 Mbps) cũ chỉ dùng 2 cặp dây (4 sợi: 1, 2 để truyền TX và 3, 6 để nhận RX). Nhưng chuẩn Gigabit Ethernet (1000 Mbps) bắt buộc phải sử dụng toàn bộ 4 cặp dây (đủ 8/8 sợi) để truyền nhận dữ liệu song công đồng thời. Nếu đứt 1 trong các chân 4, 5, 7, 8 thì tốc độ sẽ tự tụt xuống 100 Mbps.',
    technicianTip: 'Khi thấy đèn cổng Switch sáng màu cam thay vì màu xanh lá, hãy dùng máy test kiểm tra 8 bóng LED ngay lập tức.',
  },
  {
    id: 'net_q03',
    category: 'cabling-physical',
    categoryLabel: 'Bấm Cáp & Tầng Vật Lý',
    difficulty: 'thuc-chien',
    question: 'Trong kỹ thuật bấm cáp mạng UTP, yêu cầu an toàn kỹ thuật về độ sâu ngậm lớp vỏ nhựa bảo vệ bên ngoài hạt mạng RJ45 là bao nhiêu?',
    options: [
      'Không cần ngậm vỏ, để lộ dây lõi màu ra ngoài càng dài càng dễ bấm',
      'Vỏ cáp phải chui sâu vào trong lòng hạt mạng tối thiểu 5mm (vượt qua ngàm kẹp giữ)',
      'Chỉ cần cạo sạch vỏ nhựa 2cm rồi ấn vào là được',
      'Cắt bỏ hoàn toàn lớp vỏ nhựa ngoài cách đầu hạt 3cm',
    ],
    correctIndex: 1,
    explanation: 'Lớp vỏ cáp ngoài có nhiệm vụ chịu lực kéo giật. KTV bắt buộc phải đẩy lớp vỏ nhựa ngập sâu vào trong hạt mạng ít nhất 5mm để khi bóp kìm, lẫy nhựa của hạt mạng sẽ kẹp chặt lấy thân vỏ cáp. Nếu để lộ dây con ra ngoài, chỉ cần học sinh đá chân vào dây sẽ làm đứt lìa chân kim loại.',
    technicianTip: 'Quy tắc ngón tay: Tuốt vỏ cáp khoảng 2cm, vuốt thẳng xếp màu rồi cắt bằng chừa lại đúng 1.2cm trước khi đút vào hạt.',
  },
  {
    id: 'net_q04',
    category: 'cabling-physical',
    categoryLabel: 'Bấm Cáp & Tầng Vật Lý',
    difficulty: 'co-ban',
    question: 'Khoảng cách truyền dẫn tín hiệu tối đa trên một đoạn cáp mạng đồng xoắn đôi UTP Cat5e/Cat6 mà không cần thiết bị lặp (Repeater/Switch) là bao nhiêu mét?',
    options: [
      '50 mét',
      '100 mét',
      '200 mét',
      '500 mét',
    ],
    correctIndex: 1,
    explanation: 'Theo tiêu chuẩn IEEE 802.3, giới hạn chiều dài vật lý tối đa của một đoạn cáp xoắn đôi không chống nhiễu (UTP) là 100 mét (90 mét cáp đi âm tường + 10 mét dây patch cord 2 đầu). Vượt quá cự ly này, suy hao tín hiệu sẽ làm rớt gói tin hoặc tụt tốc độ.',
    technicianTip: 'Nếu khoảng cách thực tế giữa 2 phòng máy là 150m, KTV phải đặt một Switch trung gian ở mốc 75m để khuếch đại tín hiệu.',
  },
  {
    id: 'net_q05',
    category: 'cabling-physical',
    categoryLabel: 'Bấm Cáp & Tầng Vật Lý',
    difficulty: 'thuc-chien',
    question: 'Sau khi bấm 2 đầu hạt mạng RJ45, KTV cắm vào hộp test mạng (Cable Tester). Đèn bên bộ phát chạy từ 1 đến 8, nhưng bên bộ thu đèn số 3 và số 6 không sáng. Hiện tượng này chứng tỏ điều gì?',
    options: [
      'Cáp mạng đã hoàn hảo đạt chuẩn 1 Gbps',
      'Chân 3 và chân 6 bị đứt ngầm hoặc chân đồng trong hạt chưa ngậm tới lõi dây',
      'Hộp test mạng bị hết pin',
      'Cáp đang được bấm theo chuẩn chéo đặc biệt',
    ],
    correctIndex: 1,
    explanation: 'Bóng LED trên hộp test tương ứng với thông mạch từng sợi kim loại. Khi đèn 3 và 6 tắt, nghĩa là cặp dây truyền tín hiệu RX đã bị hở mạch. Dây này cắm vào máy tính sẽ báo Network Cable Unplugged hoàn toàn không thể nhận mạng.',
    technicianTip: 'Dùng kìm cắt bỏ hạt mạng cũ, dùng dao tuốt nhẹ lại và bấm đầu mới, không tiếc hạt mạng lỗi.',
  },
  {
    id: 'net_q06',
    category: 'cabling-physical',
    categoryLabel: 'Bấm Cáp & Tầng Vật Lý',
    difficulty: 'co-ban',
    question: 'Để kết nối trực tiếp giữa 1 máy tính PC với 1 Switch phòng lab hiện đại có hỗ trợ tính năng Auto MDI/MDIX, KTV có thể sử dụng loại cáp nào?',
    options: [
      'Bắt buộc phải là cáp chéo (Crossover)',
      'Bắt buộc phải là cáp đồng trục (Coaxial)',
      'Có thể dùng cáp thẳng (Straight-through) hoặc cáp chéo đều được vì Switch tự đảo chân',
      'Bắt buộc phải dùng cáp quang đơn mốt (Single-mode)',
    ],
    correctIndex: 2,
    explanation: 'Ngày nay hầu như toàn bộ thiết bị mạng (Switch, Router, Card mạng PC) đều tích hợp công nghệ Auto MDI/MDIX. Chip mạng tự động phát hiện loại cáp và tự đảo mạch truyền nhận (TX/RX), do đó dùng cáp thẳng chuẩn B hay cáp chéo đều liên kết thông mạng bình thường.',
    technicianTip: 'Trong thi HSG và thực tế thi công, luôn chuẩn hóa 100% bằng cáp thẳng chuẩn TIA-568B ở cả 2 đầu.',
  },
  {
    id: 'net_q07',
    category: 'cabling-physical',
    categoryLabel: 'Bấm Cáp & Tầng Vật Lý',
    difficulty: 'nang-cao',
    question: 'Tại sao các sợi dây bên trong cáp mạng UTP lại được sản xuất xoắn đôi từng cặp vào nhau với bước xoắn khác nhau thay vì chạy thẳng song song?',
    options: [
      'Để dây nhìn đẹp mắt và dễ uốn cong hơn',
      'Để triệt tiêu hiện tượng nhiễu điện từ trường (EMI) và nhiễu xuyên âm (Crosstalk) giữa các cặp dây',
      'Để tăng khả năng chịu lực căng khi kéo dây ngoài trời',
      'Để giảm tiết diện của lõi đồng tiết kiệm chi phí',
    ],
    correctIndex: 1,
    explanation: 'Khi dòng điện truyền trong dây dẫn, nó sinh ra từ trường. Việc xoắn hai sợi dây ngược pha tín hiệu giúp từ trường tự triệt tiêu lẫn nhau, ngăn hiện tượng xuyên âm (Cross-talk). Các cặp dây có mật độ bước xoắn khác nhau để không gây nhiễu cho nhau.',
    technicianTip: 'Khi bấm hạt mạng, chỉ tháo xoắn đoạn dây ngắn tối đa 1.3cm, tháo xoắn quá dài sẽ làm suy giảm tốc độ mạng.',
  },

  // --------------------------------------------------------------------------
  // NHÓM 2: CHIA MẠNG CON IPV4 SUBNETTING & VLSM (6 CÂU)
  // --------------------------------------------------------------------------
  {
    id: 'net_q08',
    category: 'ip-subnetting',
    categoryLabel: 'Chia Mạng Con Subnetting',
    difficulty: 'co-ban',
    question: 'Một dải mạng IPv4 có tiền tố Subnet Mask là /26. Giá trị biểu diễn dạng thập phân (Dotted Decimal) của Subnet Mask này là gì?',
    options: [
      '255.255.255.0',
      '255.255.255.128',
      '255.255.255.192',
      '255.255.255.224',
    ],
    correctIndex: 2,
    explanation: '/26 có nghĩa là có 26 bit 1. Ba octet đầu là 8*3=24 bit 1 (255.255.255). Octet cuối có thêm 2 bit 1: 11000000 ở dạng nhị phân = 128 + 64 = 192. Do đó Subnet Mask là 255.255.255.192.',
    technicianTip: 'Nhớ bảng bước nhảy octet cuối: /25=128, /26=192, /27=224, /28=240, /29=248, /30=252.',
  },
  {
    id: 'net_q09',
    category: 'ip-subnetting',
    categoryLabel: 'Chia Mạng Con Subnetting',
    difficulty: 'thuc-chien',
    question: 'Phòng Kế toán cần chia một mạng con chứa tối đa 28 máy tính làm việc. Tiền tố CIDR tối ưu nhất (tiết kiệm địa chỉ IP nhất) mà KTV nên chọn là bao nhiêu?',
    options: [
      '/28 (Cung cấp tối đa 14 host)',
      '/27 (Cung cấp tối đa 30 host)',
      '/26 (Cung cấp tối đa 62 host)',
      '/24 (Cung cấp tối đa 254 host)',
    ],
    correctIndex: 1,
    explanation: 'Công thức tính số host khả dụng: N = 2^h - 2 (trừ 2 địa chỉ Network và Broadcast). Với h=5 bit host (32 - 5 = /27), ta có: 2^5 - 2 = 32 - 2 = 30 host. 30 host hoàn toàn đáp ứng đủ cho 28 máy tính mà không lãng phí địa chỉ IP như /26.',
    technicianTip: 'Nếu chọn /28 thì chỉ có 2^4 - 2 = 14 máy, bị thiếu 14 máy.',
  },
  {
    id: 'net_q10',
    category: 'ip-subnetting',
    categoryLabel: 'Chia Mạng Con Subnetting',
    difficulty: 'thuc-chien',
    question: 'Cho địa chỉ IP máy tính là 192.168.1.130/26. Địa chỉ Network ID (Địa chỉ mạng) và Broadcast IP của dải mạng này lần lượt là gì?',
    options: [
      'Network: 192.168.1.0 và Broadcast: 192.168.1.255',
      'Network: 192.168.1.128 và Broadcast: 192.168.1.191',
      'Network: 192.168.1.64 và Broadcast: 192.168.1.127',
      'Network: 192.168.1.128 và Broadcast: 192.168.1.255',
    ],
    correctIndex: 1,
    explanation: 'Với /26, bước nhảy (Block size) = 256 - 192 = 64. Các mạng con gồm: .0, .64, .128, .192. Số 130 nằm giữa 128 và 191. Do đó: Network ID = 192.168.1.128, Mạng kế tiếp = .192. Địa chỉ Broadcast là địa chỉ liền trước mạng kế tiếp = 192.168.1.191.',
    technicianTip: 'Dải IP cấp cho máy tính con (Host) sẽ chạy từ .129 đến .190.',
  },
  {
    id: 'net_q11',
    category: 'ip-subnetting',
    categoryLabel: 'Chia Mạng Con Subnetting',
    difficulty: 'co-ban',
    question: 'Trong các dải địa chỉ IPv4 sau, dải địa chỉ nào thuộc dải Private IP (Địa chỉ mạng riêng cục bộ không được định tuyến ra Internet công cộng)?',
    options: [
      '8.8.8.8 đến 8.8.4.4',
      '192.168.0.0 đến 192.168.255.255',
      '172.33.0.0 đến 172.40.255.255',
      '203.113.130.0 đến 203.113.130.255',
    ],
    correctIndex: 1,
    explanation: 'Theo chuẩn RFC 1918, 3 dải IP riêng (Private IP) dùng cho mạng nội bộ gồm: Lớp A: 10.0.0.0/8, Lớp B: 172.16.0.0/12 (172.16.0.0 - 172.31.255.255), Lớp C: 192.168.0.0/16 (192.168.0.0 - 192.168.255.255).',
    technicianTip: 'Địa chỉ 192.168.10.x của phòng lab máy tính là một mạng Private IP.',
  },
  {
    id: 'net_q12',
    category: 'ip-subnetting',
    categoryLabel: 'Chia Mạng Con Subnetting',
    difficulty: 'nang-cao',
    question: 'Để cấu hình đường truyền kết nối điểm - điểm (Point-to-Point) giữa 2 cổng của 2 Router với nhau mà không lãng phí địa chỉ IP, KTV nên dùng Subnet Mask nào?',
    options: [
      '/24 (255.255.255.0)',
      '/28 (255.255.255.240)',
      '/30 (255.255.255.252)',
      '/32 (255.255.255.255)',
    ],
    correctIndex: 2,
    explanation: '/30 có bước nhảy là 4 (256 - 252 = 4). Tổng số IP là 4: 1 Network IP, 1 Broadcast IP và vừa khít 2 địa chỉ Host khả dụng (2^2 - 2 = 2 host). Đây là chuẩn mực tối ưu kinh điển trong định tuyến nối 2 Router.',
    technicianTip: 'Ví dụ: Cấp mạng 10.0.0.0/30, Router 1 đặt 10.0.0.1, Router 2 đặt 10.0.0.2.',
  },
  {
    id: 'net_q13',
    category: 'ip-subnetting',
    categoryLabel: 'Chia Mạng Con Subnetting',
    difficulty: 'thuc-chien',
    question: 'Khi đặt IP tĩnh cho máy tính, tại sao KTV không bao giờ được gán địa chỉ IP kết thúc bằng .0 hoặc .255 trong một mạng con lớp C /24?',
    options: [
      'Vì số 0 và 255 là số chẵn số lẻ không đẹp phong thủy',
      'Vì địa chỉ .0 là địa chỉ nhận dạng mạng (Network ID) và .255 là địa chỉ phát quảng bá (Broadcast IP)',
      'Vì Windows 10 không cho phép gõ số có 3 chữ số',
      'Vì các số này chỉ dành riêng cho máy chủ Linux',
    ],
    correctIndex: 1,
    explanation: 'Trong kiến trúc IPv4, địa chỉ đầu tiên (toàn bit 0 ở phần host) đại diện cho chính mạng đó (Network ID). Địa chỉ cuối cùng (toàn bit 1 ở phần host) là địa chỉ Broadcast gửi thông điệp tới mọi máy trong mạng. Cả hai địa chỉ này bị cấm gán cho card mạng của thiết bị đầu cuối.',
    technicianTip: 'Nếu cố tình gõ IP 192.168.1.0 với mask 255.255.255.0, Windows sẽ hiện thông báo lỗi Invalid IP Address ngay lập tức.',
  },

  // --------------------------------------------------------------------------
  // NHÓM 3: MÔ HÌNH OSI 7 TẦNG & GIAO THỨC TCP/IP (4 CÂU)
  // --------------------------------------------------------------------------
  {
    id: 'net_q14',
    category: 'osi-tcpip',
    categoryLabel: 'Mô Hình OSI & TCP/IP',
    difficulty: 'co-ban',
    question: 'Trong mô hình tham chiếu OSI 7 tầng, thiết bị chuyển mạch mạng Switch thông thường hoạt động chủ yếu ở tầng nào?',
    options: [
      'Tầng 1 - Physical (Vật lý)',
      'Tầng 2 - Data Link (Liên kết dữ liệu)',
      'Tầng 3 - Network (Mạng)',
      'Tầng 4 - Transport (Giao vận)',
    ],
    correctIndex: 1,
    explanation: 'Switch Layer 2 hoạt động ở Tầng 2 (Data Link). Thiết bị này đọc địa chỉ MAC (Media Access Control) có trong khung dữ liệu (Frame) để chuyển tiếp gói tin chính xác đến cổng của máy tính nhận, giúp loại bỏ xung đột.',
    technicianTip: 'Hub hoạt động ở Tầng 1 (Physical), Switch hoạt động ở Tầng 2 (Data Link), Router hoạt động ở Tầng 3 (Network).',
  },
  {
    id: 'net_q15',
    category: 'osi-tcpip',
    categoryLabel: 'Mô Hình OSI & TCP/IP',
    difficulty: 'co-ban',
    question: 'Đơn vị dữ liệu giao thức (PDU) tại Tầng 3 (Network Layer) của mô hình OSI được gọi là gì?',
    options: [
      'Bit',
      'Frame (Khung)',
      'Packet (Gói tin)',
      'Segment (Đoạn)',
    ],
    correctIndex: 2,
    explanation: 'Quy tắc đóng gói PDU từ dưới lên: Tầng 1 = Bit, Tầng 2 = Frame, Tầng 3 = Packet (Gói tin), Tầng 4 = Segment (với TCP) hoặc Datagram (với UDP), Tầng 5, 6, 7 = Data.',
    technicianTip: 'Nhớ câu viết tắt: "B - F - P - S - D" (Bit - Frame - Packet - Segment - Data).',
  },
  {
    id: 'net_q16',
    category: 'osi-tcpip',
    categoryLabel: 'Mô Hình OSI & TCP/IP',
    difficulty: 'thuc-chien',
    question: 'Sự khác biệt căn bản nhất giữa giao thức TCP (Transmission Control Protocol) và UDP (User Datagram Protocol) tại Tầng Giao vận là gì?',
    options: [
      'TCP chạy nhanh hơn UDP nhưng dễ mất dữ liệu hơn',
      'TCP là giao thức hướng kết nối (bắt tay 3 bước), đảm bảo dữ liệu toàn vẹn; còn UDP không hướng kết nối, tốc độ cao nhưng chấp nhận mất gói',
      'UDP chỉ dùng cho máy in mạng, còn TCP chỉ dùng cho trình duyệt web',
      'Cả hai giao thức đều giống hệt nhau',
    ],
    correctIndex: 1,
    explanation: 'TCP thiết lập kết nối bằng quá trình bắt tay 3 bước (SYN, SYN-ACK, ACK), có kiểm tra lỗi và truyền lại gói tin mất (dùng cho Web HTTP, Email, Tải file). UDP bắn gói tin đi liên tục không cần chờ xác nhận (dùng cho Livestream, Cuộc gọi thoại VoIP, Game online).',
    technicianTip: 'Gói tin Ping (ICMP) hay DNS tra cứu số nhà ưu tiên dùng UDP để phản hồi cực nhanh.',
  },
  {
    id: 'net_q17',
    category: 'osi-tcpip',
    categoryLabel: 'Mô Hình OSI & TCP/IP',
    difficulty: 'nang-cao',
    question: 'Giao thức phân giải địa chỉ ARP (Address Resolution Protocol) có vai trò kỹ thuật gì trong mạng LAN nội bộ?',
    options: [
      'Chuyển đổi tên miền (google.com) thành địa chỉ IP',
      'Ánh xạ và tìm kiếm địa chỉ MAC vật lý tương ứng với một địa chỉ IP đã biết',
      'Tự động cấp phát địa chỉ IP cho máy tính mới khởi động',
      'Mã hóa dữ liệu bảo vệ đường truyền Wi-Fi',
    ],
    correctIndex: 1,
    explanation: 'Để gửi gói tin qua cáp mạng, máy tính cần biết địa chỉ MAC của máy nhận. Giao thức ARP sẽ gửi một gói tin Broadcast hỏi: "Ai giữ IP này thì báo địa chỉ MAC cho tôi". Máy nhận sẽ trả lời bằng địa chỉ MAC của nó để lưu vào bảng ARP Table.',
    technicianTip: 'Mở CMD trên Windows 10 gõ lệnh `arp -a` để xem bảng ánh xạ IP - MAC hiện có trên máy.',
  },

  // --------------------------------------------------------------------------
  // NHÓM 4: THIẾT BỊ MẠNG SWITCH, ROUTER & DỊCH VỤ MẠNG (4 CÂU)
  // --------------------------------------------------------------------------
  {
    id: 'net_q18',
    category: 'device-switching',
    categoryLabel: 'Thiết Bị Switch & Router',
    difficulty: 'thuc-chien',
    question: 'Khi cấu hình chia mạng ảo VLAN trên một Switch quản trị (Managed Switch), cổng kết nối giữa Switch với Router hoặc giữa 2 Switch với nhau phải cấu hình ở chế độ nào?',
    options: [
      'Chế độ Cổng Access (Access Port)',
      'Chế độ Cổng Trunk (Trunking Port gắn nhãn chuẩn 802.1Q)',
      'Chế độ Cổng Mirror (Port Mirroring)',
      'Chế độ Cổng Loopback',
    ],
    correctIndex: 1,
    explanation: 'Cổng Access chỉ thuộc về duy nhất một VLAN (dùng cắm PC). Cổng Trunk có nhiệm vụ truyền tải dữ liệu của nhiều VLAN khác nhau đi qua một sợi cáp vật lý duy nhất, bằng cách gắn thêm thẻ nhãn (Tag VLAN ID) theo chuẩn IEEE 802.1Q.',
    technicianTip: 'Nếu nối 2 Switch chia VLAN mà quên cấu hình Trunking thì các VLAN ở Switch 2 sẽ không thể liên lạc được về Router.',
  },
  {
    id: 'net_q19',
    category: 'device-switching',
    categoryLabel: 'Thiết Bị Switch & Router',
    difficulty: 'co-ban',
    question: 'Máy chủ dịch vụ DHCP (Dynamic Host Configuration Protocol) trong mạng doanh nghiệp có chức năng gì?',
    options: [
      'Chặn đứng các cuộc tấn công mạng từ hacker bên ngoài',
      'Tự động cấp phát địa chỉ IP, Subnet Mask, Default Gateway và DNS cho các máy con (Client)',
      'Tăng gấp đôi tốc độ đường truyền Internet cáp quang',
      'Chuyển đổi nguồn điện 220V thành điện 12V cho switch',
    ],
    correctIndex: 1,
    explanation: 'DHCP hoạt động theo quy trình DORA (Discover - Offer - Request - Acknowledge), giúp KTV không phải đi từng máy phòng lab gõ tay địa chỉ IP, tránh hoàn toàn việc bị trùng IP (IP Conflict).',
    technicianTip: 'Khi máy tính hiện IP bắt đầu bằng 169.254.x.x (APIPA) nghĩa là máy không thể kết nối tới máy chủ DHCP.',
  },
  {
    id: 'net_q20',
    category: 'device-switching',
    categoryLabel: 'Thiết Bị Switch & Router',
    difficulty: 'thuc-chien',
    question: 'Default Gateway (Cổng mặc định) được cấu hình trên card mạng máy tính có vai trò gì?',
    options: [
      'Là địa chỉ IP của máy in dùng chung trong văn phòng',
      'Là địa chỉ IP của cổng Router cục bộ, đóng vai trò lối thoát cho mọi gói tin muốn gửi ra ngoài mạng nội bộ',
      'Là địa chỉ máy chủ cập nhật Windows Update',
      'Là địa chỉ của cổng mạng Switch gần nhất',
    ],
    correctIndex: 1,
    explanation: 'Nếu địa chỉ IP là "số nhà" thì Default Gateway chính là "cửa ngõ ra đường lớn". Khi máy tính muốn gửi dữ liệu cho một IP nằm ngoài mạng con của nó (ví dụ gửi lên Google 8.8.8.8), nó bắt buộc phải đẩy gói tin tới địa chỉ Default Gateway để Router chuyển tiếp đi.',
    technicianTip: 'Nếu máy tính chỉ gõ được IP và Subnet Mask mà bỏ trống Gateway thì chỉ giao tiếp được trong phòng, không vào được Internet.',
  },
  {
    id: 'net_q21',
    category: 'device-switching',
    categoryLabel: 'Thiết Bị Switch & Router',
    difficulty: 'co-ban',
    question: 'Dịch vụ phân giải tên miền DNS (Domain Name System) thực hiện chức năng gì cho người dùng mạng?',
    options: [
      'Dò tìm mật khẩu Wi-Fi của các quán cà phê',
      'Dịch chuyển đổi từ tên miền người dùng dễ nhớ (phamtiendong.name.vn) sang địa chỉ IP máy chủ để kết nối',
      'Xóa sạch các file rác trong thùng rác Recycle Bin',
      'Tự động quét virus trên USB',
    ],
    correctIndex: 1,
    explanation: 'Con người dễ nhớ chữ (như google.com), nhưng máy tính và bộ định tuyến chỉ hiểu số IP. DNS đóng vai trò như cuốn danh bạ điện thoại toàn cầu, tra cứu tên người để lấy ra số điện thoại IP kết nối.',
    technicianTip: 'Hai địa chỉ DNS Public thông dụng và ổn định nhất là Google (8.8.8.8 / 8.8.4.4) và Cloudflare (1.1.1.1).',
  },

  // --------------------------------------------------------------------------
  // NHÓM 5: MẠNG NỘI BỘ WINDOWS 10 & QUẢN TRỊ TÀI NGUYÊN (4 CÂU)
  // --------------------------------------------------------------------------
  {
    id: 'net_q22',
    category: 'windows-network',
    categoryLabel: 'Mạng Nội Bộ Windows 10',
    difficulty: 'co-ban',
    question: 'Trên hệ điều hành Windows 10, lệnh Command Prompt (CMD) nào dùng để hiển thị đầy đủ thông tin địa chỉ IP, Subnet Mask, Default Gateway và địa chỉ MAC vật lý của card mạng?',
    options: [
      'ping 127.0.0.1',
      'ipconfig /all',
      'tracert 8.8.8.8',
      'netstat -an',
    ],
    correctIndex: 1,
    explanation: 'Lệnh `ipconfig` chỉ hiển thị IP và Subnet Mask cơ bản. Thêm tham số `/all` sẽ hiển thị trọn vẹn Physical Address (địa chỉ MAC 12 ký tự hex), trạng thái DHCP, DNS Server và thời gian thuê IP.',
    technicianTip: 'Mở cửa sổ Run (Win + R), gõ `cmd` rồi gõ `ipconfig /all` là phản xạ đầu tiên của KTV khi ngồi vào máy sửa mạng.',
  },
  {
    id: 'net_q23',
    category: 'windows-network',
    categoryLabel: 'Mạng Nội Bộ Windows 10',
    difficulty: 'thuc-chien',
    question: 'Để kiểm tra xem đường truyền vật lý và kết nối mạng giữa máy tính của mình tới máy in IP 192.168.10.200 có thông suốt hay không, KTV dùng câu lệnh nào?',
    options: [
      'ping 192.168.10.200 -t',
      'format C: /q',
      'cleanmgr /sageset',
      'msconfig /stop',
    ],
    correctIndex: 0,
    explanation: 'Lệnh `ping` gửi các gói tin ICMP Echo Request tới máy đích. Nếu nhận được phản hồi "Reply from 192.168.10.200: bytes=32 time<1ms TTL=64" thì kết nối đã thông suốt 100%. Tham số `-t` giúp lệnh ping liên tục không dừng.',
    technicianTip: 'Nếu báo "Request timed out" nghĩa là dây bị lỏng, sai IP hoặc máy đích đang bật tường lửa chặn ping.',
  },
  {
    id: 'net_q24',
    category: 'windows-network',
    categoryLabel: 'Mạng Nội Bộ Windows 10',
    difficulty: 'thuc-chien',
    question: 'Khi chia sẻ một thư mục tài liệu kế toán qua mạng LAN trong Windows 10, để mọi nhân viên phòng ban đều mở xem và in được nhưng KHÔNG ĐƯỢC XÓA SỬA file của nhau, KTV phân quyền như thế nào?',
    options: [
      'Cấp quyền Full Control cho nhóm Everyone',
      'Cấp quyền Read cho nhóm Everyone (Chính xác)',
      'Bật tính năng Turn off password protected sharing',
      'Gán quyền Administrator cho từng tài khoản khách',
    ],
    correctIndex: 1,
    explanation: 'Quyền Read (Chỉ đọc) cho phép máy trạm mở file xem và in ấn nhưng ngăn chặn hoàn toàn việc sửa đổi nội dung hoặc bấm Delete làm mất dữ liệu. Quyền Full Control cho phép xóa file, tuyệt đối cấm gán bừa bãi.',
    technicianTip: 'Luôn kiểm tra cả 2 tab: Tab Sharing (Quyền chia sẻ mạng) và Tab Security (Quyền phân quyền tập tin NTFS).',
  },
  {
    id: 'net_q25',
    category: 'windows-network',
    categoryLabel: 'Mạng Nội Bộ Windows 10',
    difficulty: 'nang-cao',
    question: 'Hai máy tính Windows 10 cắm chung 1 switch, đã đặt IP cùng dải mạng 192.168.1.x, nhưng lệnh `ping` giữa 2 máy vẫn báo "Request timed out". Nguyên nhân phổ biến nhất là gì?',
    options: [
      'Do màn hình máy tính có tần số quét khác nhau',
      'Do tính năng Tường lửa (Windows Defender Firewall) trên máy đích đang bật chế độ chặn gói tin ICMP phản hồi',
      'Do một máy dùng bàn phím cổng USB còn máy kia dùng bàn phím không dây',
      'Do dây nguồn cắm vào ổ điện khác nhau',
    ],
    correctIndex: 1,
    explanation: 'Mặc định trên Windows 10, tính năng bảo mật Windows Defender Firewall chặn toàn bộ các gói tin kiểm tra ICMP Echo Request (lệnh ping). Để thông ping, KTV vào Windows Firewall chọn mở quy tắc "File and Printer Sharing (Echo Request - ICMPv4-In)" hoặc tạm tắt Firewall để kiểm thử.',
    technicianTip: 'Tắt tạm Firewall trong Control Panel ➔ Kiểm tra ping thông ➔ Bật lại Firewall và mở riêng cổng dịch vụ cần dùng.',
  },
];
