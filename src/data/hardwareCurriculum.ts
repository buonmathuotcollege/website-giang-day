// ============================================================================
// CHƯƠNG TRÌNH & NỘI DUNG HUẤN LUYỆN KỸ THUẬT VIÊN THỰC CHIẾN
// MÔN: ÔN LUYỆN NĂNG LỰC NGHỀ - PHẦN CỨNG MÁY TÍNH (MÃ: OL-01_PHAN_CUNG)
// Theo chuẩn Phụ lục II, Thông tư 55/2026/TT-BGDĐT
// Biên soạn: CN. Phạm Tiến Đông
// ============================================================================

export interface RuleItem {
  id: string;
  name: string;
  tagline: string;
  detail: string;
  danger: string;
}

export interface StopPoint {
  step: number;
  name: string;
  rule: string;
  condition: string;
  signoff: string;
}

export interface ClassicCase {
  id: string;
  code: string;
  name: string;
  symptom: string;
  cause: string;
  action: string;
  tool: string;
}

export interface ExamCase {
  id: string;
  code: string;
  title: string;
  customerProblem: string;
  dataTarget: string;
  hardwareTask: string;
  softwareTask: string;
  verificationTask: string;
  initialState: {
    powerStatus: string;
    screenStatus: string;
    ramDetected: string;
    diskConfig: string;
    fanStatus: string;
    tempStatus: string;
  };
  rootCause: string;
  correctAction: string;
  rubricMax: {
    safety: number;
    diagnosis: number;
    operation: number;
    verification: number;
    handover: number;
  };
}

export const HARDWARE_METADATA = {
  courseCode: 'OL-01_PHAN_CUNG',
  courseName: 'Ôn luyện Năng lực Nghề: Phần cứng Máy tính',
  teacher: 'CN. Phạm Tiến Đông',
  institution: 'Cổng Giảng Dạy & Thực Hành CNTT',
  standard: 'Phụ lục II, Thông tư số 55/2026/TT-BGDĐT ngày 30/6/2026 của Bộ trưởng Bộ GD&ĐT',
  slogan: 'Kỹ năng Kỹ thuật viên chuẩn hóa: Thực chiến từ số 0 — Quy trình A-Z',
  philosophy: 'Đọc tới đâu, tay làm được ngay tới đó. Không học vẹt lý thuyết suông — Thùng máy tính như bộ Lego 5 món lớn và 4 sợi dây nguồn.',
};

export const THREE_SURVIVAL_RULES: RuleItem[] = [
  {
    id: 'rule_1',
    name: 'LUẬT 1: RÚT — BẤM — KHAY',
    tagline: 'An toàn điện tuyệt đối & Chống rơi mất ốc',
    detail: 'Trước khi thò tay hoặc tua-vít vào thùng máy: (1) RÚT phích điện, gạt công tắc nguồn PSU sang O; (2) BẤM nút nguồn vỏ máy 3 lần để xả sạch điện tích tụ trong tụ điện; (3) Bỏ ngay mọi con ốc vừa tháo vào KHAY phân loại (không để lăn lóc trên bàn hay rơi vào mainboard).',
    danger: 'Vi phạm: Chập cháy tụ, sốc tĩnh điện chết linh kiện, hoặc bị 0 ĐIỂM tiêu chí An toàn khi sát hạch!',
  },
  {
    id: 'rule_2',
    name: 'LUẬT 2: GIỮ NỒI CƠM CỦA KHÁCH',
    tagline: 'Cứu dữ liệu trước khi đụng vào máy hay format',
    detail: 'Tài liệu trong máy là nồi cơm của khách hàng. Chưa sao lưu đầy đủ Desktop, Documents, Downloads và các ổ chứa dữ liệu thì TUYỆT ĐỐI KHÔNG format, không cài lại Windows, không tháo gỡ bừa bãi. Phải kiểm tra đối chiếu số file và dung lượng MB khớp 100% trước và sau khi sao lưu.',
    danger: 'Vi phạm: Làm mất dữ liệu khách hàng là lỗi nghiêm trọng nhất của kỹ thuật viên, bị ĐÌNH CHỈ ca thi ngay lập tức!',
  },
  {
    id: 'rule_3',
    name: 'LUẬT 3: KHÔNG BAO GIỜ ÉP KHI CẮM',
    tagline: 'Mọi thứ là Lego có rãnh khuyết chống ngược',
    detail: 'Mọi chân cắm máy tính (RAM, nguồn 24 chân, CPU, cáp SATA, cổng USB) đều được chế tạo có rãnh khuyết và khuôn lỗ chống ngược chiều. Cắm đúng chiều thì ấn nhẹ tay là kêu "tách" sập khóa; nếu thấy cấn hoặc nặng tay tức là cắm ngược — lập tức dừng lại, xoay chiều khác.',
    danger: 'Vi phạm: Ép mạnh làm cong gãy chân socket CPU, gãy khe RAM hoặc chập nguồn!',
  },
];

export const THREE_SAFETY_CHECKPOINTS: StopPoint[] = [
  {
    step: 2,
    name: 'ĐIỂM DỪNG AN TOÀN 1: BẢO TOÀN DỮ LIỆU',
    rule: 'Trước khi mổ máy phần cứng hoặc phân vùng format ổ đĩa',
    condition: 'Đã đếm số file, dung lượng MB trên Desktop, Documents; đã sao lưu sang ổ D hoặc USB WinPE; đối chiếu khớp 100% và mở thử 2 file kiểm tra.',
    signoff: 'Giáo viên hướng dẫn / Trưởng xưởng ký xác nhận mới được làm bước tiếp theo.',
  },
  {
    step: 4,
    name: 'ĐIỂM DỪNG AN TOÀN 2: KIỂM TRA TRƯỚC KHI CẮM ĐIỆN',
    rule: 'Trước khi cắm dây nguồn và bật điện thử máy',
    condition: 'RAM đã sập khóa 2 tai nhựa; quạt CPU_FAN đã cắm đúng chân trên bo mạch; không có ốc vít hay vật kim loại rơi bên trong thùng máy; 4 sợi dây nguồn cắm chắc chắn.',
    signoff: 'Thầy kiểm tra thùng máy bằng mắt trong 10 giây và ký xác nhận cho phép cắm điện.',
  },
  {
    step: 7,
    name: 'ĐIỂM DỪNG AN TOÀN 3: NGHIỆM THU 5 ĐIỂM TRƯỚC BÀN GIAO',
    rule: 'Trước khi giao trả máy cho khách / Nộp bài thi',
    condition: 'Nghiệm thu đủ 5 điểm vàng: (1) Quạt quay êm ái; (2) HWMonitor CPU < 75°C khi tải; (3) Dữ liệu khách nguyên vẹn 100%; (4) Device Manager sạch bóng chấm than vàng; (5) Bàn kỹ thuật dọn sạch sẽ, phiếu A-Z ký đủ chữ ký.',
    signoff: 'Biên bản bàn giao dịch vụ A-Z được cả Kỹ thuật viên và Giáo viên nghiệm thu phê duyệt.',
  },
];

export const FIVE_CLASSIC_CASES: ClassicCase[] = [
  {
    id: 'case_1',
    code: 'CA-01',
    name: 'Bấm nút nguồn máy IM RE (quạt không quay, đèn không sáng)',
    symptom: 'Cắm điện bấm nút Power ngoài vỏ thùng nhưng máy hoàn toàn không phản ứng, quạt PSU không nhúc nhích.',
    cause: 'Công tắc I/O sau nguồn PSU chưa bật sang I, dây nguồn lỏng, tuột dây POWER SW ở cụm F_PANEL, hoặc nguồn PSU hỏng tụ.',
    action: '1. Kiểm tra công tắc I/O và ổ cắm điện. 2. Mở nắp kiểm tra dây POWER SW cắm đúng cọc trên main. 3. Kích thử nguồn bằng nhíp (chập 2 cọc Power SW hoặc cọng dây kích xanh lá + đen trên nguồn 24 chân).',
    tool: 'Tua-vít 4 cạnh, nhíp kỹ thuật, đồng hồ đo / nguồn phụ thử.',
  },
  {
    id: 'case_2',
    code: 'CA-02',
    name: 'Quạt quay VÙ VÙ nhưng MÀN HÌNH ĐEN (No Signal)',
    symptom: 'Bấm nguồn quạt CPU và quạt thùng quay mạnh, đèn sáng nhưng màn hình đen thui, báo No Signal hoặc đèn bàn phím (Num Lock) không sáng.',
    cause: 'Chân mạ vàng của RAM bị oxy hóa bám bụi bẩn, lỏng khe cắm RAM; hoặc cắm nhầm cáp màn hình vào cổng Mainboard thay vì cổng Card đồ họa rời (VGA).',
    action: '1. Rút điện xả tụ. 2. Kiểm tra dây màn hình cắm đúng cổng card rời. 3. Tháo thanh RAM, lấy CỤC GÔM TẨY chà sạch hai mặt chân vàng mạ vàng, thổi sạch bụi khe cắm, ấn chặt lại nghe 2 tiếng "tách" sập tai nhựa.',
    tool: 'Cục gôm tẩy học sinh màu trắng, chổi quét cọ mềm, bình xịt bụi.',
  },
  {
    id: 'case_3',
    code: 'CA-03',
    name: 'Lên logo rồi báo chữ trắng "No Bootable Device" / "Reboot and Select..."',
    symptom: 'Máy lên logo nhà sản xuất nhưng không vào được Windows, dừng lại ở màn hình đen kèm dòng chữ báo không tìm thấy ổ đĩa khởi động.',
    cause: 'Lỏng cáp tín hiệu SATA hoặc dây nguồn SATA ổ cứng; sai thứ tự Boot Order trong BIOS; hoặc chế độ Boot Mode sai (Legacy CSM thay vì UEFI).',
    action: '1. Rút điện, cắm chặt lại cả 2 đầu cáp SATA và dây nguồn ổ cứng. 2. Bấm Del/F2 vào BIOS xem BIOS có nhận tên ổ cứng không. 3. Đặt Boot Option #1 là Windows Boot Manager hoặc chuyển UEFI Mode. 4. Dùng USB WinPE kiểm tra sức khỏe CrystalDiskInfo.',
    tool: 'Cáp SATA mới dự phòng, USB cứu hộ WinPE, phần mềm CrystalDiskInfo.',
  },
  {
    id: 'case_4',
    code: 'CA-04',
    name: 'Báo lỗi "Press F1 to Run Setup" và SAI NGÀY GIỜ liên tục',
    symptom: 'Mỗi lần bật máy hoặc rút điện ra là máy bắt bấm F1/F2 mới vào được Win, đồng hồ Windows nhảy về năm 2009 hoặc 2015, mất kết nối mạng SSL.',
    cause: 'Viên pin CMOS CR2032 trên mainboard đã cạn kiệt điện tích (< 2.8V / định mức 3V), khiến chip CMOS không nhớ được cấu hình ngày giờ.',
    action: '1. Lấy tua-vít dẹp nhẹ gạt chốt lấy viên pin CMOS cũ ra. 2. Lắp viên pin CMOS CR2032 mới (mặt chữ + hướng lên trên). 3. Vào BIOS chỉnh lại ngày giờ hiện tại, ấn F10 để Save & Exit.',
    tool: 'Pin cúc áo CR2032 3V mới, tua-vít dẹp nhỏ.',
  },
  {
    id: 'case_5',
    code: 'CA-05',
    name: 'Máy chạy 5–10 phút RẤT NÓNG, quạt gầm rú rồi TỰ TẮT nguồn',
    symptom: 'Vào Windows chạy được vài phút là máy đơ cứng, quạt tản nhiệt kêu to dữ dội rồi máy tự ngắt nguồn đột ngột để tự bảo vệ.',
    cause: 'Lớp keo tản nhiệt giữa CPU và đế nhôm bị khô cứng nứt nẻ; quạt CPU bám két búi bụi; bung chốt gài tản nhiệt hoặc quên cắm dây quạt vào cọc CPU_FAN.',
    action: '1. Tháo quạt tản nhiệt, lau sạch lớp keo khô cũ bằng giấy khô/cồn. 2. Vệ sinh quạt gió (giữ cánh quạt khi xịt). 3. Bơm 1 giọt keo tản nhiệt bằng hạt đậu xanh vào giữa lưng CPU. 4. Khóa tản nhiệt ấn chéo 4 góc đối xứng, cắm chặt dây CPU_FAN.',
    tool: 'Tuýp keo tản nhiệt (MX-4 hoặc tương đương), khăn giấy mềm lau keo, bóng thổi bụi.',
  },
];

export const LEGO_PARTS = [
  { name: 'Bộ nguồn (PSU)', metaphor: 'Trái tim bơm điện', note: 'Có công tắc I/O phía sau. Cấp nguồn 24 chân cho Main, 4/8 chân cho CPU, dây dẹp cho SATA.' },
  { name: 'Bo mạch chủ (Mainboard)', metaphor: 'Nền nhà / Khung xương', note: 'Nơi kết nối mọi linh kiện. Chứa Socket CPU, khe RAM, cổng SATA, cụm chân F_PANEL.' },
  { name: 'Bộ vi xử lý (CPU)', metaphor: 'Bộ não / Giám đốc chỉ đạo', note: 'Nằm dưới quạt tản nhiệt. Rất nhạy cảm với chân socket (không chạm ngón tay vào).' },
  { name: 'Bộ nhớ RAM', metaphor: 'Mặt bàn làm việc tạm thời', note: 'Có rãnh khuyết lệch tâm. Phải ấn đều 2 đầu đến khi nghe tiếng "tách" sập 2 tai nhựa.' },
  { name: 'Ổ lưu trữ SSD / HDD', metaphor: 'Tủ hồ sơ lưu trữ lâu dài', note: 'Chứa hệ điều hành và dữ liệu khách. Cần đủ 2 dây: 1 dây nguồn + 1 cáp SATA dữ liệu.' },
];

export const FOUR_WIRES = [
  { wire: 'Dây nguồn 24 chân (Main ATX)', to: 'Cắm vào khe 24 chân dài nhất trên bo mạch chủ, có lẫy nhựa khóa an toàn.' },
  { wire: 'Dây nguồn CPU 4 hoặc 8 chân', to: 'Cắm ở góc trên gần Socket CPU để nuôi nguồn riêng cho vi xử lý.' },
  { wire: 'Dây nguồn SATA & Cáp tín hiệu SATA', to: 'Dây dẹp chữ L cắm vào ổ cứng SSD/HDD và đầu kia cáp SATA cắm vào cổng SATA trên Main.' },
  { wire: 'Cụm dây Front Panel (POWER SW, RESET SW)', to: 'Dây nút bật nguồn vỏ máy, cắm vào cụm cọc F_PANEL (thường ở góc dưới bên phải main).' },
];

export const SEVEN_STEPS_WORKFLOW = [
  {
    step: 1,
    slug: 'chuong-1',
    name: 'BƯỚC 1: TIẾP NHẬN MÁY & ĐỌC CẤU HÌNH TRONG 3 PHÚT',
    time: '15 - 20 phút',
    summary: 'Khám vỏ máy, cắm thử nhận diện 4 kịch bản khởi động A/B/C/D, đọc cấu hình máy và ghi phiếu nhận máy.',
    actions: [
      'Quan sát vỏ ngoài: trầy xước, móp méo, thiếu ốc, gãy cổng kết nối -> Ghi ngay vào phiếu để tránh đền máy.',
      'Cắm điện bật thử máy: phân loại ngay 4 trạng thái (A: Vào Win bình thường; B: Im re; C: Quạt quay màn đen; D: Lỗi chữ trắng / Dump xanh).',
      'Đọc nhanh cấu hình trong 3 phút (CPU-Z hoặc Task Manager / BIOS): CPU model, Tổng dung lượng RAM, Loại ổ cứng SSD/HDD.',
      'Ghi chép chính xác dung lượng Ổ C và Ổ D (ví dụ: C: 120GB, D: 380GB) — Đây là con số sống còn để không format nhầm ở Bước 5!',
      'Kiểm tra linh kiện khách mang thêm (nếu có): RAM có đúng chuẩn DDR3/DDR4, SSD có đúng chuẩn SATA/NVMe không.',
    ],
    proTip: 'Đọc cấu hình càng nhanh thì khách càng nể tay nghề. Luôn ghi lại số GB ổ C và ổ D vào phiếu trước mắt khách hàng.',
  },
  {
    step: 2,
    slug: 'chuong-2',
    name: 'BƯỚC 2: CỨU DỮ LIỆU — LUẬT "GIỮ NỒI CƠM CỦA KHÁCH"',
    time: '10 - 25 phút',
    summary: 'Sao lưu toàn bộ Desktop, Documents, Downloads sang ổ D hoặc USB cứu hộ WinPE. Điểm dừng an toàn số 1.',
    actions: [
      'Xác định các thư mục nhạy cảm nhất của khách: Desktop, Documents, Downloads, Hình ảnh (Pictures).',
      'Nếu máy còn vào được Windows: Chọn lệnh COPY (tuyệt đối không dùng CUT), dán sang thư mục BACKUP_NGAY_THANG trên ổ D.',
      'Nếu máy lỗi Windows không vào được: Cắm USB cứu hộ WinPE (Anhdv / DLC Boot), khởi động vào WinPE mini để cứu dữ liệu.',
      'Đối chiếu kiểm tra chéo: Click chuột phải thư mục gốc -> Properties -> Đếm số file và số MB. Thư mục đã sao lưu phải KHỚP 100%!',
      'Mở thử ngẫu nhiên 2 tệp tài liệu Word/Excel để đảm bảo file không bị hỏng.',
    ],
    checkpoint: 'ĐIỂM DỪNG AN TOÀN 1: Thầy giáo / Trưởng xưởng kiểm tra thư mục backup đã khớp 100% thì mới ký duyệt cho mổ máy hoặc format!',
    proTip: 'Dùng lệnh COPY, không bao giờ dùng CUT. Nếu cúp điện hoặc treo máy giữa chừng khi CUT, file gốc sẽ biến mất vĩnh viễn!',
  },
  {
    step: 3,
    slug: 'chuong-3',
    name: 'BƯỚC 3: BẮT BỆNH 60 GIÂY & CỨU MÁY LÊN HÌNH',
    time: '15 - 30 phút',
    summary: 'Áp dụng 5 ca bệnh kinh điển chiếm 85% thực tế xưởng. Dùng cục tẩy chà RAM, xử lý cáp màn hình, dây SATA, pin CMOS.',
    actions: [
      'Áp dụng Luật 1: Rút điện, bấm nút nguồn 3 lần xả tụ, chuẩn bị khay đựng ốc.',
      'Khoanh vùng chính xác: Nếu quạt quay màn hình đen (No Signal) -> Rút RAM dùng cục tẩy trắng học sinh chà sạch 2 mặt chân mạ vàng.',
      'Dùng cọ quét sạch bụi khe RAM. Cắm lại thanh RAM thẳng góc, ấn mạnh đều 2 đầu đến khi nghe 2 tiếng "tách" sập khóa tai nhựa.',
      'Kiểm tra cổng cắm màn hình: Nếu máy có Card màn hình rời (VGA), phải cắm dây vào cổng của Card rời ở dưới, KHÔNG cắm vào cổng trên Mainboard.',
      'Nếu máy báo "No Bootable Device" -> Kiểm tra cắm chặt lại cáp SATA dữ liệu và dây nguồn SATA ổ cứng; kiểm tra thứ tự Boot trong BIOS.',
      'Nếu sai ngày giờ hoặc báo F1 -> Thay viên pin CMOS CR2032 3V mới, chỉnh lại ngày giờ và bấm F10 lưu lại.',
    ],
    proTip: 'Cục gôm tẩy học sinh là "công cụ bỏ túi" của kỹ thuật viên phần cứng! 70% máy tính màn hình đen chỉ cần chà sạch lớp oxit bám ở chân RAM là máy sống lại ngay.',
  },
  {
    step: 4,
    slug: 'chuong-4',
    name: 'BƯỚC 4: VỆ SINH THỔI BỤI, TRA KEO HẠT ĐẬU XANH & LẮP NÂNG CẤP',
    time: '30 - 45 phút',
    summary: 'Thổi bụi giữ cánh quạt, tra đúng 1 giọt keo tản nhiệt, 4 cú nhấp chuột Disk Management kích hoạt SSD mới. Điểm dừng an toàn 2.',
    actions: [
      'Vệ sinh bụi bẩn: Khi dùng bóng thổi hoặc bình khí xịt quạt nguồn và quạt CPU, PHẢI DÙNG NGÓN TAY GIỮ ĐỨNG CÁNH QUẠT. (Quạt quay quá tốc độ sẽ phát điện ngược gây cháy IC trên mainboard hoặc vỡ bạc đạn).',
      'Tra keo tản nhiệt: Dùng giấy mềm lau sạch keo cũ bị khô. Bơm đúng 1 giọt keo bằng "HẠT ĐẬU XANH" vào chính giữa lưng CPU. Đặt tản nhiệt lên và ấn chốt theo đường chéo đối xứng (1-3, 2-4).',
      'Cắm ngay dây quạt vào đúng chân có chữ CPU_FAN trên bo mạch.',
      'Lắp linh kiện nâng cấp (RAM / SSD): Lắp thêm RAM sập khóa; lắp thêm ổ SSD SATA cắm đủ 1 dây nguồn + 1 cáp SATA dữ liệu.',
      'Kích hoạt SSD mới trong Windows: Nhấp chuột phải nút Start -> Chọn "Disk Management" -> Khởi tạo đĩa Initialize GPT -> Nhấp chuột phải vùng Unallocated chọn "New Simple Volume" -> Next -> Format NTFS -> Ổ đĩa mới hiện ra trong This PC!',
    ],
    checkpoint: 'ĐIỂM DỪNG AN TOÀN 2: Thầy kiểm tra RAM đã khóa 2 tai, CPU_FAN đã cắm, thùng máy không còn ốc rơi vãi -> Ký duyệt cho phép cắm điện thử máy!',
    proTip: 'Nhiều bạn lắp SSD mới xong mở My Computer không thấy ổ đâu tưởng SSD hỏng! Ổ đĩa mới xuất xưởng chưa phân vùng nên bắt buộc phải vào Disk Management để tạo ổ.',
  },
  {
    step: 5,
    slug: 'chuong-5',
    name: 'BƯỚC 5: CÀI WINDOWS ĐÚNG Ổ C & SẠCH BÓNG CHẤM THAN DRIVER',
    time: '45 - 60 phút',
    summary: 'Nhìn số GB phân vùng để không format nhầm ổ D; cài Windows chuẩn UEFI GPT; Device Manager sạch 100% chấm than vàng.',
    actions: [
      'Khởi động từ USB cài Win chuẩn UEFI (ấn phím Boot Menu: F12 / F11 / F8 tuỳ dòng máy).',
      'CHỌN ĐÚNG PHÂN VÙNG Ổ C: Nhìn vào cột "Total Size" đối chiếu đúng số GB đã ghi nhận ở Bước 1 (ví dụ: ổ C 120GB, ổ D 380GB). Chỉ Format phân vùng ổ C 120GB, tuyệt đối không chạm vào ổ D!',
      'Sau lần tự khởi động lại đầu tiên của bộ cài Windows: RÚT NGAY USB RA để máy boot vào ổ cứng tiếp tục thiết lập.',
      'Thiết lập múi giờ chuẩn: Chọn múi giờ `(UTC+07:00) Bangkok, Hanoi, Jakarta` để không bị lỗi duyệt web HTTPS.',
      'Kiểm tra Driver: Nhấp chuột phải nút Start -> Device Manager -> Kiểm tra toàn bộ danh sách, phải SẠCH BÓNG 100% DẤU CHẤM THAN VÀNG (!).',
      'Cài đặt các tiện ích thiết yếu: Bộ gõ tiếng Việt UniKey (bật Khởi động cùng Windows), phần mềm giải nén 7-Zip, trình duyệt Chrome.',
      'Tạo điểm khôi phục hệ thống (System Restore Point): Đặt tên là `MAY_CHAY_TOT` để phòng hờ sự cố sau này.',
    ],
    proTip: 'Quy tắc vàng khi chọn ổ cài Win: "Nhìn số GB, không nhìn tên ký tự!". Lúc cài đặt, ký tự ổ C/D có thể bị tráo đổi, nhưng dung lượng GB của phân vùng thì không bao giờ nói dối.',
  },
  {
    step: 6,
    slug: 'chuong-6',
    name: 'BƯỚC 6: MẸO SỬA MÁY IN 3 CÚ CLICK & KIỂM TRA TOÀN DIỆN NGOẠI VI',
    time: '15 - 25 phút',
    summary: 'Kiểm tra cáp/giấy, dấu tích xanh Set as default printer, xóa kẹt lệnh in Print Spooler, in bản Test Page thành công.',
    actions: [
      'Kiểm tra vật lý máy in: Cáp USB cắm chắc chắn, khay nạp giấy còn giấy ngay ngắn, hộp mực không bị kẹt lẫy.',
      'Mở Devices and Printers: Tìm máy in cần dùng (ví dụ: Canon LBP 2900 / HP LaserJet), click chuột phải chọn "Set as default printer" (Phải có dấu tích tròn màu xanh lá cây).',
      'Mẹo xử lý kẹt lệnh in trong 3 cú click: Nhấp đúp vào máy in -> Chọn menu "Printer" -> Bấm "Cancel All Documents". Hoặc vào Services tìm dịch vụ "Print Spooler" bấm Restart.',
      'In trang kiểm tra chất lượng (Print Test Page): Nhấp chuột phải máy in -> Printer properties -> Bấm nút "Print Test Page" ở tab General. Máy in kéo giấy in ra bản in sắc nét.',
      'Kiểm tra thiết bị ngoại vi: Gõ thử toàn bộ bàn phím, kiểm tra chuột trái/phải/con lăn, cắm tai nghe kiểm tra âm thanh, cắm dây mạng LAN kiểm tra Internet.',
    ],
    proTip: 'Khách văn phòng hay kêu máy in "chết đơ" thực chất 90% là do bị kẹt một lệnh in tài liệu lỗi từ hôm qua. Chỉ cần Clear Spooler là in ầm ầm!',
  },
  {
    step: 7,
    slug: 'chuong-7',
    name: 'BƯỚC 7: NGHIỆM THU 5 ĐIỂM CUỐI CÙNG & BÀN GIAO MÁY',
    time: '15 - 20 phút',
    summary: 'Nghiệm thu 5 điểm vàng: Quạt êm, HWMonitor CPU < 75°C, dữ liệu đủ 100%, dọn bàn sạch bóng, ký biên bản nghiệm thu.',
    actions: [
      'Điểm 1 - Thùng máy & Quạt: Nắp thùng máy đóng khít vặn đủ ốc, quạt gió quay êm ái không kêu rè rè cọ dây điện.',
      'Điểm 2 - Nhiệt độ CPU: Bật phần mềm HWMonitor / Core Temp, cho CPU chạy thử 5 phút, nhiệt độ ổn định DƯỚI 75°C (nếu vọt lên > 85°C là tra keo lỗi).',
      'Điểm 3 - Dữ liệu khách hàng: Kiểm tra lại các file tài liệu đã chép trả ra Desktop và Documents đầy đủ 100%, mở thử đọc bình thường.',
      'Điểm 4 - Trạng thái hệ thống: Device Manager sạch bóng chấm than, UniKey gõ tiếng Việt có dấu chuẩn, mạng Internet thông suốt.',
      'Điểm 5 - Tác phong nghề nghiệp: Dọn sạch bàn kỹ thuật, tua-vít và dụng cụ xếp vào hộp, không để rơi ốc vít hay rác trên bàn.',
      'Lập và ký Phiếu dịch vụ kỹ thuật A-Z: Kỹ thuật viên ký tên, Giáo viên / Khách hàng kiểm tra nghiệm thu và ký xác nhận.',
    ],
    checkpoint: 'ĐIỂM DỪNG AN TOÀN 3: Đủ 5 điểm nghiệm thu mới được phép bàn giao máy cho khách hoặc nộp bài thi kết thúc môn.',
    proTip: 'Khách hàng đánh giá trình độ của kỹ thuật viên qua 2 thứ: Máy chạy mát êm và Bàn làm việc sạch sẽ, ngăn nắp. Hãy làm việc với tác phong của một kỹ thuật viên chuyên nghiệp!',
  },
  {
    step: 8,
    slug: 'chuong-8',
    name: 'BỘ HỒ SƠ ĐÁNH GIÁ TAY NGHỀ & 3 ĐỀ THI THỰC HÀNH TỔNG HỢP',
    time: '180 phút (Bài thi chính thức)',
    summary: 'Cấu trúc bài thi thực hành 180 phút, Rubric 10 điểm Thông tư 55, Phiếu 10 gạch đầu dòng tự kiểm tra tại bàn xưởng.',
    actions: [
      'Nắm vững cấu trúc bài thi 180 phút: Gồm 3 yêu cầu tích hợp (Sửa 1 lỗi phần cứng + Cứu dữ liệu & Nâng cấp + Cài đặt Driver/Máy in & Nghiệm thu).',
      'Đề mẫu 1: Xử lý máy quạt quay màn hình đen (chân RAM) + Sao lưu Desktop sang D: + Lắp thêm RAM 8GB + Cài UniKey và kiểm tra Device Manager.',
      'Đề mẫu 2: Xử lý máy báo No Bootable Device + Quạt CPU bám bụi két quá nhiệt + Cứu Documents + Vệ sinh tra keo tản nhiệt + Kiểm tra HWMonitor.',
      'Đề mẫu 3: Nâng cấp ổ cứng SSD 240GB mới + Kích hoạt Disk Management + Cứu dữ liệu sang SSD + Sửa lỗi kẹt lệnh in máy in Canon 2900 + In Test Page.',
      'Áp dụng thang điểm 10 Thông tư 55: An toàn (2.0đ) + Chẩn đoán (2.5đ) + Thao tác (3.0đ) + Kiểm tra (1.5đ) + Bàn giao (1.0đ). Đạt từ 5.0đ trở lên.',
    ],
    proTip: 'Vào phòng thi: Bình tĩnh đọc kỹ đề, làm tuần tự từ Bước 1 đến Bước 7, bí chỗ nào ghi chú lại báo thầy, điền phiếu ngay sau mỗi bước.',
  },
];

export const PRACTICAL_EXAM_TICKETS: ExamCase[] = [
  {
    id: 'ticket_pc01',
    code: 'ĐỀ THI 01',
    title: 'Ca bệnh Màn hình đen (RAM tiếp xúc kém) & Nâng cấp RAM + Cứu tài liệu Kế toán',
    customerProblem: 'Khách hàng mang máy bàn đến xưởng phản ánh: Sáng nay bấm nút nguồn thì quạt trong máy vẫn quay vù vù nhưng màn hình đen thui (báo No Signal). Trong máy có thư mục "BAO_CAO_TAI_CHINH_2026" ngoài Desktop cực kỳ quan trọng cần cứu gấp. Khách có mang kèm theo 1 thanh RAM 8GB DDR4 mua thêm nhờ kỹ thuật viên lắp nâng cấp.',
    dataTarget: 'Desktop\\BAO_CAO_TAI_CHINH_2026 (12 tệp Excel, 145 MB) -> Sao lưu sang Ổ D:\\BACKUP_KHACH_HANG',
    hardwareTask: 'Xử lý lỗi màn hình đen cho máy lên hình; sau đó lắp thêm 1 thanh RAM 8GB DDR4 (nghe 2 tiếng "tách" sập tai khóa).',
    softwareTask: 'Kiểm tra Device Manager sạch bóng chấm than vàng; cài đặt UniKey tiếng Việt; tạo điểm khôi phục hệ thống MAY_CHAY_TOT.',
    verificationTask: 'Nhiệt độ CPU ổn định < 75°C, BIOS/Windows nhận đủ tổng 16GB RAM (8GB gốc + 8GB mới), đối chiếu file sao lưu khớp 100%.',
    initialState: {
      powerStatus: 'Đèn nguồn sáng, quạt CPU quay',
      screenStatus: 'Màn hình đen thui, thông báo "No Signal"',
      ramDetected: 'Chân RAM bị bụi bẩn oxy hóa bám chân vàng',
      diskConfig: 'C: 120 GB (Hệ thống) | D: 380 GB (Dữ liệu)',
      fanStatus: 'Quạt quay mạnh bình thường',
      tempStatus: 'Chưa đo được do máy chưa lên hình',
    },
    rootCause: 'Chân mạ vàng của thanh RAM bị oxy hóa tiếp xúc kém, hoặc khe cắm RAM bị bám bụi khiến bo mạch không nhận diện được bộ nhớ RAM để xuất hình ảnh.',
    correctAction: 'Rút điện, bấm xả tụ 3 lần. Tháo thanh RAM, dùng cục gôm tẩy học sinh chà sạch 2 mặt chân tiếp xúc mạ vàng. Dùng cọ quét sạch khe RAM. Cắm lại thanh RAM kêu 2 tiếng tách. Cắm thêm thanh RAM 8GB mới vào khe số 2. Bật máy lên hình!',
    rubricMax: {
      safety: 2.0,
      diagnosis: 2.5,
      operation: 3.0,
      verification: 1.5,
      handover: 1.0,
    },
  },
  {
    id: 'ticket_pc02',
    code: 'ĐỀ THI 02',
    title: 'Ca bệnh "No Bootable Device" & Xử lý Quạt CPU bám két bụi quá nhiệt tự tắt nguồn',
    customerProblem: 'Khách hàng mang máy đến than phiền: Bật máy lên hiện logo rồi báo lỗi chữ trắng "No Bootable Device, strike F1 to retry boot". Ngoài ra dạo gần đây quạt máy tính gầm rú rất to, vào Win được 10 phút là tự động sập nguồn đen ngòm. Khách cần cứu gấp thư mục "HO_SO_DU_AN" trong Documents.',
    dataTarget: 'Documents\\HO_SO_DU_AN (35 tệp Word và PDF, 320 MB) -> Dùng USB WinPE sao lưu sang Ổ D:',
    hardwareTask: 'Cắm chặt lại 2 đầu cáp SATA và dây nguồn SATA ổ cứng; tháo quạt tản nhiệt lau keo cũ, tra keo hạt đậu xanh mới, cắm CPU_FAN.',
    softwareTask: 'Vào BIOS cấu hình đúng thứ tự Boot Option #1 (Windows Boot Manager); dùng CrystalDiskInfo kiểm tra sức khỏe ổ cứng (Good).',
    verificationTask: 'Máy khởi động thẳng vào Windows ổn định; đo HWMonitor nhiệt độ CPU khi tải chỉ ở mức 52°C (< 75°C); dữ liệu khớp 100%.',
    initialState: {
      powerStatus: 'Máy bật lên được',
      screenStatus: 'Báo lỗi chữ trắng: No Bootable Device',
      ramDetected: 'Nhận đủ 8GB RAM',
      diskConfig: 'Cáp tín hiệu SATA ổ cứng bị lỏng tuột; keo tản nhiệt khô giòn',
      fanStatus: 'Quạt bám két búi bụi dày đặc, kêu to',
      tempStatus: 'Nhiệt độ CPU vọt lên 92°C gây ngắt nguồn',
    },
    rootCause: 'Cáp tín hiệu SATA ổ cứng bị tuột lỏng khiến máy không nhận ổ đĩa khởi động; đồng thời keo tản nhiệt CPU bị khô nứt làm CPU quá nhiệt tự ngắt nguồn.',
    correctAction: 'Rút điện xả tụ. Cắm chặt lại 2 đầu cáp SATA dữ liệu và dây nguồn ổ cứng. Tháo tản nhiệt CPU, lau sạch keo khô cũ, bơm 1 giọt keo mới bằng hạt đậu xanh, ấn chốt chéo, cắm dây CPU_FAN. Bật máy vào BIOS kiểm tra nhận ổ cứng và chỉnh Boot Option.',
    rubricMax: {
      safety: 2.0,
      diagnosis: 2.5,
      operation: 3.0,
      verification: 1.5,
      handover: 1.0,
    },
  },
  {
    id: 'ticket_pc03',
    code: 'ĐỀ THI 03',
    title: 'Ca bệnh Nâng cấp Ổ cứng SSD SATA 240GB & Xử lý Máy in Văn phòng bị kẹt lệnh in',
    customerProblem: 'Văn phòng mang máy tính kèm 1 ổ SSD SATA 240GB mới nguyên hộp nhờ lắp thêm làm ổ phụ để chứa dữ liệu. Ngoài ra, máy in Canon LBP 2900 của phòng mấy hôm nay bị đơ không in được, tài liệu bấm in cứ nằm im re không thấy máy in chạy. Cần sao lưu toàn bộ dữ liệu làm việc sang ổ SSD mới này.',
    dataTarget: 'Desktop + Documents (Tổng 48 tệp, 580 MB) -> Sao lưu sang ổ đĩa SSD mới được kích hoạt.',
    hardwareTask: 'Lắp ổ SSD 240GB mới vào khay 2.5 inch, cắm đủ 1 dây nguồn SATA và 1 cáp SATA dữ liệu nối vào bo mạch chủ.',
    softwareTask: 'Mở Disk Management khởi tạo đĩa Initialize Disk GPT -> Tạo phân vùng New Simple Volume NTFS -> Ổ hiện trong This PC. Xử lý kẹt lệnh in trong Print Spooler -> Set as default printer.',
    verificationTask: 'Ổ đĩa mới xuất hiện trong This PC với tên DATA_SSD; in bản Test Page thành công từ máy in Canon 2900; lập phiếu giao nhận.',
    initialState: {
      powerStatus: 'Máy hoạt động bình thường',
      screenStatus: 'Vào Windows bình thường',
      ramDetected: 'RAM 8GB',
      diskConfig: 'Đang có sẵn 1 ổ SSD 120GB (C: 120GB), ổ SSD 240GB mới chưa lắp',
      fanStatus: 'Quạt quay êm ái',
      tempStatus: 'Nhiệt độ CPU 48°C (Tốt)',
    },
    rootCause: 'Ổ SSD mới mua chưa được khởi tạo phân vùng trong Disk Management nên không thể hiển thị trong My Computer; Máy in bị treo tiến trình Print Spooler do tài liệu in cũ bị nghẽn mạng.',
    correctAction: 'Rút điện xả tụ. Bắt ốc SSD vào khay, cắm đủ dây nguồn và cáp dữ liệu SATA. Bật máy vào Win, chuột phải nút Start mở Disk Management, bấm Khởi tạo GPT, tạo New Simple Volume format NTFS. Mở Devices and Printers, hủy toàn bộ lệnh in kẹt Cancel All Documents, đặt Canon 2900 làm mặc định (tích xanh), bấm Print Test Page in thử.',
    rubricMax: {
      safety: 2.0,
      diagnosis: 2.5,
      operation: 3.0,
      verification: 1.5,
      handover: 1.0,
    },
  },
];

export const OFFICIAL_RUBRIC_CRITERIA = [
  {
    num: 1,
    name: 'Quy trình và An toàn kỹ thuật',
    maxScore: 2.0,
    items: [
      { text: 'Rút điện, gạt công tắc O, bấm nút nguồn xả tụ 3 lần, đeo vòng ESD / chạm kim loại xả tĩnh điện', score: 0.75 },
      { text: 'Ốc vít để ngay vào khay phân loại, không làm rơi ốc vào bo mạch, không làm trầy xước vỏ máy', score: 0.5 },
      { text: 'Tuân thủ đúng trình tự 7 bước tiếp nhận, bảo vệ dữ liệu khách hàng trước khi sửa chữa / format', score: 0.75 },
    ],
    dangerNote: 'Vi phạm: Tháo cắm linh kiện khi chưa rút điện hoặc làm mất dữ liệu khách -> Điểm An toàn bị 0 ĐIỂM và ĐÁNH TRƯỢT ca thi!',
  },
  {
    num: 2,
    name: 'Chẩn đoán nguyên nhân sự cố',
    maxScore: 2.5,
    items: [
      { text: 'Khoanh vùng đúng nhóm bộ phận hư hỏng (RAM/Nguồn/SATA/Quạt/Pin CMOS), không tháo mò tràn lan', score: 0.75 },
      { text: 'Sử dụng đúng công cụ chẩn đoán thực tế (BIOS/UEFI, CPU-Z, HWMonitor, CrystalDiskInfo)', score: 0.75 },
      { text: 'Xác định và ghi nhận chính xác 1 câu nguyên nhân gốc rễ trên Phiếu dịch vụ kỹ thuật', score: 1.0 },
    ],
  },
  {
    num: 3,
    name: 'Thao tác xử lý kỹ thuật',
    maxScore: 3.0,
    items: [
      { text: 'Tháo lắp, vệ sinh quạt giữ cánh, tra 1 giọt keo hạt đậu xanh, lắp RAM kêu "tách" sập khóa, cắm 4 sợi dây chuẩn', score: 1.5 },
      { text: 'Sao lưu dữ liệu mẫu khớp 100% về số file và dung lượng MB sang phân vùng ổ D hoặc USB an toàn', score: 0.75 },
      { text: 'Kích hoạt ổ SSD mới trong Disk Management / Cài đúng Driver Device Manager sạch chấm than / Cài máy in', score: 0.75 },
    ],
  },
  {
    num: 4,
    name: 'Kiểm tra và Xác nhận vận hành',
    maxScore: 1.5,
    items: [
      { text: 'Máy khởi động lên BIOS/UEFI nhận diện chuẩn xác và vào Windows hoạt động trơn tru', score: 0.5 },
      { text: 'Nhận đủ RAM và ổ cứng mới, nhiệt độ HWMonitor CPU < 75°C khi tải, dữ liệu nguyên vẹn 100%', score: 1.0 },
    ],
  },
  {
    num: 5,
    name: 'Bàn giao và Hồ sơ kỹ thuật',
    maxScore: 1.0,
    items: [
      { text: 'Đóng nắp thùng máy vặn đủ ốc, thu dọn dụng cụ và lau chùi bàn kỹ thuật sạch bóng', score: 0.25 },
      { text: 'Điền đầy đủ, trung thực, rõ ràng thông số vào Phiếu Dịch vụ Kỹ thuật A-Z và ký tên đúng quy định', score: 0.75 },
    ],
  },
];
