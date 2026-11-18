// ============================================================================
// CHƯƠNG TRÌNH & NGÂN HÀNG CÂU HỎI ÔN LUYỆN THI HỌC SINH GIỎI
// CHUYÊN ĐỀ 02: PHẦN CỨNG VÀ MẠNG MÁY TÍNH (MÃ: HSG-02_PHAN_CUNG_MANG)
// Bồi dưỡng đội tuyển HSG chuyên ngành CNTT · Cơ sở Ea H'leo (Lớp 04THA3)
// Chủ nhiệm: CN. Phạm Tiến Đông · Cổng Học Tập & Giảng Dạy CNTT
// ============================================================================

export interface HsgQuestion {
  id: string;
  group: 'kien-truc-phan-cung' | 'osi-tcpip' | 'routing-switching-security';
  level: 'ThongHieu' | 'VanDung' | 'VanDungCao';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  subtopic: string;
}

export interface SubnetFormulaItem {
  cidr: string;
  subnetMask: string;
  magicNumber: number;
  totalHosts: number;
  usableHosts: number;
  usageContext: string;
}

export interface HsgTeamInfo {
  id: string;
  code: string;
  branch: string;
  motto: string;
  color: string;
}

export interface HsgProjectStage {
  step: number;
  name: string;
  title: string;
  role: string;
  timeLimit: string;
  weight: number;
  maxScore: number;
  description: string;
  checklists: {
    id: string;
    label: string;
    critical?: boolean;
    points: number;
  }[];
  standards: string[];
}

export interface HsgRubricCriterion {
  id: string;
  code: string;
  name: string;
  weightPercent: number;
  maxPoints: number;
  description: string;
  levels: {
    range: string;
    label: string;
    description: string;
  }[];
}

// Bảng công thức tính nhẩm Subnetting siêu tốc cho đội tuyển HSG
export const SUBNET_CHEAT_SHEET: SubnetFormulaItem[] = [
  { cidr: '/24', subnetMask: '255.255.255.0', magicNumber: 256, totalHosts: 256, usableHosts: 254, usageContext: 'Mạng phòng máy chuẩn (1 phòng máy / 1 tầng)' },
  { cidr: '/25', subnetMask: '255.255.255.128', magicNumber: 128, totalHosts: 128, usableHosts: 126, usageContext: 'Chia đôi mạng /24 thành 2 phòng riêng biệt' },
  { cidr: '/26', subnetMask: '255.255.255.192', magicNumber: 64, totalHosts: 64, usableHosts: 62, usageContext: 'Chia 4 mạng con (mỗi phòng tối đa 62 máy)' },
  { cidr: '/27', subnetMask: '255.255.255.224', magicNumber: 32, totalHosts: 32, usableHosts: 30, usageContext: 'Phòng ban văn phòng nhỏ (tối đa 30 thiết bị)' },
  { cidr: '/28', subnetMask: '255.255.255.240', magicNumber: 16, totalHosts: 16, usableHosts: 14, usageContext: 'Dành cho cụm máy chủ / máy in nội bộ' },
  { cidr: '/29', subnetMask: '255.255.255.248', magicNumber: 8, totalHosts: 8, usableHosts: 6, usageContext: 'Cụm thiết bị hạ tầng mạng quản trị' },
  { cidr: '/30', subnetMask: '255.255.255.252', magicNumber: 4, totalHosts: 4, usableHosts: 2, usageContext: 'Đường truyền điểm - điểm (Point-to-Point) giữa 2 Router' },
];

// Danh sách các Đội tuyển HSG Cơ sở Ea H'leo (Lớp 04THA3)
export const HSG_PROJECT_TEAMS: HsgTeamInfo[] = [
  {
    id: 'team_04tha3_1',
    code: '04THA3 - Đội 1',
    branch: 'Cơ sở Ea H\'leo',
    motto: 'Kỹ luật cơ khí - Tốc độ bấm cáp Gigabit - Quy hoạch IP tối ưu',
    color: 'blue'
  },
  {
    id: 'team_04tha3_2',
    code: '04THA3 - Đội 2',
    branch: 'Cơ sở Ea H\'leo',
    motto: 'Quản trị hệ thống vững vàng - Dịch vụ mạng thông suốt',
    color: 'emerald'
  },
  {
    id: 'team_04tha3_3',
    code: '04THA3 - Đội 3',
    branch: 'Cơ sở Ea H\'leo',
    motto: 'Bảo mật đa tầng - Thuyết trình tự tin - Nghiệm thu hoàn hảo',
    color: 'purple'
  }
];

// Stepper 5 Chặng Thi Công Dự Án Thực Tế (Mô hình Nhà thầu công nghệ)
export const HSG_PROJECT_STAGES: HsgProjectStage[] = [
  {
    step: 1,
    name: 'Chặng 1',
    title: 'Tốc Độ Thi Công & Bấm Cáp Gigabit (TIA/EIA-568A/B)',
    role: 'Kỹ sư Thi công Hạ tầng Cáp',
    timeLimit: '30 phút',
    weight: 25,
    maxScore: 25,
    description: 'Thực hiện đo, cắt, tuốt vỏ và bấm 02 đoạn cáp mạng UTP Cat5e/Cat6: 01 cáp thẳng (Straight-through) và 01 cáp chéo (Crossover). Kiểm tra thông mạch 8/8 sợi và đo tốc độ kết nối đạt chuẩn Gigabit.',
    checklists: [
      { id: 'c1_color_std', label: 'Bấm đúng chuẩn màu TIA/EIA-568A hoặc TIA/EIA-568B (chuẩn B: Cam trắng, Cam, Xanh lá trắng, Xanh dương, Xanh dương trắng, Xanh lá, Nâu trắng, Nâu)', critical: true, points: 6 },
      { id: 'c1_tester_88', label: 'Máy test cáp mạng nhảy tuần tự thông mạch tuyệt đối 8/8 sợi (không đứt ngầm, không chéo chân)', critical: true, points: 8 },
      { id: 'c1_gigabit_link', label: 'Cắm kết nối giữa PC và Switch nhận đúng tốc độ liên kết Gigabit 1000 Mbps (đèn báo xanh cam sáng chuẩn)', points: 6 },
      { id: 'c1_craftsmanship', label: 'Tính thẩm mỹ cơ khí: Lớp vỏ bảo vệ ngậm sâu trong hạt mạng RJ45 > 5mm, bấm chụp bảo vệ chống gãy ngàm', points: 5 }
    ],
    standards: ['TIA/EIA-568-C.2', 'IEEE 802.3ab (1000BASE-T)', 'Kỹ thuật Poka-Yoke']
  },
  {
    step: 2,
    name: 'Chặng 2',
    title: 'Kiến Trúc Sư Sơ Đồ & Quy Hoạch IP VLSM',
    role: 'Kỹ sư Thiết kế & Quy hoạch Mạng',
    timeLimit: '45 phút',
    weight: 20,
    maxScore: 20,
    description: 'Dựa trên yêu cầu của doanh nghiệp (Ban Giám đốc, Kế toán, Nhân sự, Kỹ thuật), thiết kế sơ đồ Topo mạng và phân bổ dải địa chỉ IPv4 tối ưu bằng kỹ thuật chia mạng con theo độ dài thay đổi (VLSM).',
    checklists: [
      { id: 'c2_vlsm_calc', label: 'Tính toán chính xác Subnet Mask, Network ID, Host Range và Broadcast cho 4 phòng ban không bị trùng lặp', critical: true, points: 7 },
      { id: 'c2_draw_diagram', label: 'Vẽ hoàn thiện sơ đồ mạng vật lý (Physical Topology) thể hiện đầy đủ vị trí thiết bị và cổng kết nối', points: 5 },
      { id: 'c2_logic_sim', label: 'Thiết kế sơ đồ nguyên lý logic (Logical Topology) trên Cisco Packet Tracer / Draw.io có ghi chú IP đầy đủ', points: 5 },
      { id: 'c2_waste_min', label: 'Tiết kiệm không gian địa chỉ tối đa (số host dư thừa tối thiểu theo nguyên tắc VLSM)', points: 3 }
    ],
    standards: ['RFC 1878 (VLSM)', 'Cisco Network Design', 'Phân bổ dải IP Private RFC 1918']
  },
  {
    step: 3,
    name: 'Chặng 3',
    title: 'Quản Trị Viên Hệ Thống Windows & Dịch Vụ Mạng',
    role: 'Kỹ sư Quản trị Hệ điều hành & Dịch vụ',
    timeLimit: '45 phút',
    weight: 25,
    maxScore: 25,
    description: 'Cấu hình hệ điều hành Windows 10 trên máy trạm phòng lab, thiết lập cấu hình IP tĩnh/DHCP, tạo tài khoản người dùng, phân quyền bảo mật thư mục chia sẻ NTFS và kết nối chia sẻ máy in qua mạng LAN.',
    checklists: [
      { id: 'c3_win10_config', label: 'Cài đặt Windows 10 Pro 64-bit chuẩn UEFI/GPT, đặt tên máy (Computer Name) và Workgroup theo quy chuẩn dự án', points: 5 },
      { id: 'c3_ip_setup', label: 'Cấu hình địa chỉ IP tĩnh, Subnet Mask, Default Gateway và DNS Server (8.8.8.8 / 1.1.1.1) chính xác', critical: true, points: 6 },
      { id: 'c3_ntfs_perms', label: 'Tạo cây thư mục chia sẻ nội bộ: Phân quyền Share Permissions và NTFS Security (Kế toán chỉ xem, Giám đốc toàn quyền)', critical: true, points: 8 },
      { id: 'c3_printer_share', label: 'Cài đặt Driver máy in, chia sẻ máy in qua mạng LAN và kết nối in thử thành công từ máy trạm thứ hai', points: 6 }
    ],
    standards: ['Windows 10 Pro Enterprise', 'SMB 3.0 / File Sharing', 'NTFS Access Control List']
  },
  {
    step: 4,
    name: 'Chặng 4',
    title: 'Bảo Mật & Cấu Hình Wi-Fi Doanh Nghiệp',
    role: 'Kỹ sư An toàn & Mạng Không Dây',
    timeLimit: '30 phút',
    weight: 15,
    maxScore: 15,
    description: 'Thiết lập thiết bị Wi-Fi Router / Access Point văn phòng: Thay đổi tài khoản quản trị, thiết lập mạng không dây doanh nghiệp chuẩn WPA2/WPA3 AES, cấu hình dải DHCP riêng và kích hoạt tính năng cách ly mạng khách.',
    checklists: [
      { id: 'c4_admin_pass', label: 'Đổi mật khẩu quản trị mặc định (admin/admin) thành mật khẩu phức tạp chống dò quét', points: 3 },
      { id: 'c4_ssid_wpa', label: 'Thiết lập 02 mạng Wi-Fi riêng biệt: SSID Nội bộ (WPA2/WPA3 Enterprise/Personal) và SSID Khách (Guest)', critical: true, points: 5 },
      { id: 'c4_ap_isolate', label: 'Kích hoạt tính năng AP Isolation / Guest Network Isolation (ngăn máy khách quét trộm mạng nội bộ)', points: 4 },
      { id: 'c4_dhcp_pool', label: 'Quy hoạch dải cấp phát DHCP không dây riêng biệt, thời gian Lease Time hợp lý', points: 3 }
    ],
    standards: ['IEEE 802.11ax / 802.11ac', 'WPA2-PSK / WPA3-SAE', 'AP Isolation Best Practice']
  },
  {
    step: 5,
    name: 'Chặng 5',
    title: 'Nghiệm Thu Toàn Hệ Thống & Bảo Vệ Dự Án (05 Phút)',
    role: 'Toàn Đội Thi & Kỹ sư Trưởng',
    timeLimit: '30 phút',
    weight: 15,
    maxScore: 15,
    description: 'Đấu nối liên hoàn toàn bộ hệ thống: PC Máy trạm ↔ Switch ↔ Router ↔ Wi-Fi ↔ Máy in. Thực hiện lệnh Ping kiểm tra thông mạng 100%, in ấn từ xa và bảo vệ đề tài 05 phút trước Hội đồng Ban Giám khảo.',
    checklists: [
      { id: 'c5_topology_up', label: 'Toàn bộ đèn cổng Switch/Router sáng xanh, liên kết vật lý thông suốt 100%', points: 3 },
      { id: 'c5_ping_zero_loss', label: 'Lệnh ping giữa các phòng ban và ra Default Gateway đạt 0% packet loss, độ trễ < 2ms', critical: true, points: 5 },
      { id: 'c5_print_test', label: 'Gửi lệnh in qua mạng LAN từ máy trạm in ra bản Test Page sắc nét, không kẹt lệnh', points: 3 },
      { id: 'c5_defense_qa', label: 'Thuyết trình mạch lạc trong 05 phút và trả lời tự tin, chính xác các câu hỏi vấn đáp của Ban Giám khảo', points: 4 }
    ],
    standards: ['Quy chuẩn Nghiệm thu Hạ tầng CNTT', 'Tác phong Kỹ sư chuyên nghiệp', 'Thuyết trình dự án']
  }
];

// Bảng tiêu chí chấm điểm Rubric 100 Điểm dành cho Ban Giám khảo
export const HSG_RUBRIC_CRITERIA: HsgRubricCriterion[] = [
  {
    id: 'rubric_c1',
    code: 'TC1',
    name: 'Kỹ Thuật Hạ Tầng & Thi Công Cáp (25%)',
    weightPercent: 25,
    maxPoints: 25,
    description: 'Đánh giá kỹ năng bấm cáp mạng chuẩn A/B, kiểm tra máy test thông mạch 8/8 sợi, nhận tốc độ Gigabit 1Gbps và độ thẩm mỹ cơ khí.',
    levels: [
      { range: '20.0 - 25.0', label: 'Mức Đạt Xuất Sắc', description: 'Bấm cáp cực nhanh, thông mạch 8/8 sợi, nhận Gigabit 1Gbps ngay lần đầu, đầu cáp bọc nẹp khít đẹp.' },
      { range: '13.0 - 19.5', label: 'Mức Cần Cố Gắng', description: 'Thông mạch nhưng bấm lại lần 2, hoặc tốc độ chỉ nhận 100 Mbps do tuột 1 sợi dữ liệu.' },
      { range: '0.0 - 12.5', label: 'Mức Chưa Đạt', description: 'Đứt mạch, cắm Switch không sáng đèn hoặc bấm sai sơ đồ màu chuẩn.' }
    ]
  },
  {
    id: 'rubric_c2',
    code: 'TC2',
    name: 'Sơ Đồ Hệ Thống & Quy Hoạch IP VLSM (20%)',
    weightPercent: 20,
    maxPoints: 20,
    description: 'Khả năng tính toán phân bổ dải IP con tối ưu cho các phòng ban, vẽ sơ đồ Topo vật lý và logic chuẩn xác trên Packet Tracer.',
    levels: [
      { range: '16.0 - 20.0', label: 'Mức Đạt Xuất Sắc', description: 'Chia VLSM chuẩn xác 100%, không lãng phí IP, sơ đồ mạng thể hiện khoa học, đủ ký hiệu.' },
      { range: '10.0 - 15.5', label: 'Mức Cần Cố Gắng', description: 'Tính đúng Subnet Mask nhưng nhầm lẫn Broadcast hoặc sơ đồ thiếu cổng kết nối.' },
      { range: '0.0 - 9.5', label: 'Mức Chưa Đạt', description: 'Trùng lặp dải IP giữa các phòng ban, không vẽ được sơ đồ nguyên lý.' }
    ]
  },
  {
    id: 'rubric_c3',
    code: 'TC3',
    name: 'Quản Trị Mạng Nội Bộ & Dịch Vụ Hệ Thống (25%)',
    weightPercent: 25,
    maxPoints: 25,
    description: 'Cấu hình Windows 10, IP tĩnh, dịch vụ chia sẻ tài nguyên NTFS Security chuẩn ma trận phân quyền và chia sẻ máy in LAN.',
    levels: [
      { range: '20.0 - 25.0', label: 'Mức Đạt Xuất Sắc', description: 'Phân quyền NTFS chuẩn ma trận bảo mật, máy trạm truy cập mượt mà, in ấn qua mạng tức thì.' },
      { range: '13.0 - 19.5', label: 'Mức Cần Cố Gắng', description: 'Chia sẻ được nhưng phân quyền còn để Everyone Full Control, máy in in bị chậm.' },
      { range: '0.0 - 12.5', label: 'Mức Chưa Đạt', description: 'Không vào được máy chủ chia sẻ (lỗi Permission Denied), máy in không nhận qua mạng.' }
    ]
  },
  {
    id: 'rubric_c4',
    code: 'TC4',
    name: 'Cấu Hình Mạng Không Dây & Bảo Mật (15%)',
    weightPercent: 15,
    maxPoints: 15,
    description: 'Thiết lập Wi-Fi Router/AP, đổi pass quản trị, chuẩn bảo mật WPA2/WPA3 AES, cấu hình dải DHCP và cô lập mạng khách AP Isolation.',
    levels: [
      { range: '12.0 - 15.0', label: 'Mức Đạt Xuất Sắc', description: 'Đổi pass admin, tách 2 SSID Nội bộ/Khách, kích hoạt AP Isolation chặn quét IP nội bộ.' },
      { range: '8.0 - 11.5', label: 'Mức Cần Cố Gắng', description: 'Cấu hình được Wi-Fi nhưng chưa đổi pass admin hoặc chưa kích hoạt AP Isolation.' },
      { range: '0.0 - 7.5', label: 'Mức Chưa Đạt', description: 'Wi-Fi để mở không bảo mật hoặc cấp trùng dải IP với mạng có dây gây xung đột.' }
    ]
  },
  {
    id: 'rubric_c5',
    code: 'TC5',
    name: 'Đánh Giá Dự Án, Tốc Độ & Bảo Vệ Tổng Hợp (15%)',
    weightPercent: 15,
    maxPoints: 15,
    description: 'Kiểm tra thông mạng 100%, tốc độ hoàn thành dự án, tác phong công nghiệp 5S và khả năng thuyết trình bảo vệ 05 phút.',
    levels: [
      { range: '12.0 - 15.0', label: 'Mức Đạt Xuất Sắc', description: 'Ping thông 100%, hoàn thành trước thời hạn, bàn kỹ thuật sạch sẽ 5S, bảo vệ tự tin.' },
      { range: '8.0 - 11.5', label: 'Mức Cần Cố Gắng', description: 'Hệ thống thông mạng nhưng hoàn thành sát giờ, trả lời câu hỏi giám khảo còn ngập ngừng.' },
      { range: '0.0 - 7.5', label: 'Mức Chưa Đạt', description: 'Hệ thống chập chờn rớt gói ping, để dụng cụ bừa bãi hoặc không trả lời được câu hỏi chuyên môn.' }
    ]
  }
];

// Ngân hàng 54 câu trắc nghiệm chuyên sâu thi Học sinh giỏi Phần cứng & Mạng
// Chia đều làm 3 Nhóm kiến thức phân loại cao
export const HSG_QUESTION_BANK: HsgQuestion[] = [
  // ==========================================================================
  // NHÓM 1: PHÂN TÍCH KIẾN TRÚC BO MẠCH CHỦ & VI XỬ LÝ (18 CÂU)
  // ==========================================================================
  {
    id: 'HSG_ARCH_01',
    group: 'kien-truc-phan-cung',
    level: 'ThongHieu',
    question: 'Trên các bo mạch chủ hiện đại như Intel H510 / B560 / Z590, kiến trúc cầu kép (Northbridge & Southbridge) truyền thống đã được thay thế bằng mô hình nào?',
    options: [
      'Gộp cả hai cầu vào một vi mạch duy nhất gọi là Super I/O Controller',
      'Tích hợp toàn bộ bộ điều khiển bộ nhớ (IMC) và các làn PCIe đồ họa vào trong CPU; phần còn lại do chip PCH (Platform Controller Hub) quản lý qua kết nối DMI bus',
      'Loại bỏ hoàn toàn chipset trên bo mạch chủ, giao phó mọi điều khiển cho bộ nhớ RAM',
      'Tách thành 3 cầu vi mạch riêng biệt để tăng tốc độ phân luồng dữ liệu'
    ],
    correctIndex: 1,
    explanation: 'Từ thế hệ vi kiến trúc Intel Core, bộ điều khiển bộ nhớ (Memory Controller) và các làn PCIe đồ họa tốc độ cao đã được tích hợp thẳng vào die của CPU. Bo mạch chủ chỉ còn duy nhất chip PCH kết nối với CPU qua đường truyền DMI (Direct Media Interface) tốc độ cao.',
    subtopic: 'Kiến trúc Bo mạch chủ'
  },
  {
    id: 'HSG_ARCH_02',
    group: 'kien-truc-phan-cung',
    level: 'VanDung',
    question: 'Vi xử lý Intel Core i5-10400 (Socket LGA1200) cung cấp trực tiếp bao nhiêu làn PCIe thế hệ thứ 3 (PCIe 3.0 lanes) cho hệ thống?',
    options: [
      '8 làn (dành cho Card đồ họa)',
      '16 làn (thường gán trọn vẹn cho khe cắm Card đồ họa PCIe x16 số 1)',
      '24 làn (chia đều cho RAM và SSD)',
      '32 làn (chia làm 4 khe cắm)'
    ],
    correctIndex: 1,
    explanation: 'CPU Intel Gen 10 (Comet Lake) cung cấp trực tiếp 16 làn PCIe 3.0 dành riêng cho khe đồ họa chính PCIe x16. Các kết nối khác như ổ SSD M.2, SATA và cổng USB được cấp làn thông qua chipset PCH.',
    subtopic: 'Phân bổ làn PCIe'
  },
  {
    id: 'HSG_ARCH_03',
    group: 'kien-truc-phan-cung',
    level: 'VanDungCao',
    question: 'Tại sao bộ nhớ đệm L1 và L2 Cache của CPU được chế tạo trực tiếp bên trong từng nhân (Core) xử lý, trong khi L3 Cache lại được dùng chung (Shared) cho tất cả các nhân?',
    options: [
      'Để giảm chi phí sản xuất bóng bán dẫn',
      'L1/L2 cần độ trễ cực thấp (1-4 chu kỳ xung nhịp) để cấp lệnh ngay lập tức cho nhân đó; còn L3 dùng chung giúp các nhân trao đổi dữ liệu mượt mà mà không cần truy xuất xuống RAM có độ trễ cao',
      'Vì L1/L2 có dung lượng lớn hơn hàng trăm lần so với L3 Cache',
      'Do bộ nhớ L3 không có khả năng lưu trữ dữ liệu dạng nhị phân'
    ],
    correctIndex: 1,
    explanation: 'Bộ nhớ L1/L2 là SRAM siêu tốc độc quyền cho từng core để đạt xung nhịp tối đa và độ trễ cực thấp (~1ns). L3 Cache có dung lượng lớn hơn (12MB - 36MB), được thiết kế dùng chung nhằm tối ưu hóa sự chia sẻ dữ liệu giữa các luồng xử lý và giảm truy xuất xuống bộ nhớ DDR4.',
    subtopic: 'Hệ thống Cache CPU'
  },
  {
    id: 'HSG_ARCH_04',
    group: 'kien-truc-phan-cung',
    level: 'VanDung',
    question: 'Một bộ vi xử lý có thông số TDP (Thermal Design Power) là 65W. Khái niệm TDP biểu thị điều gì chính xác nhất?',
    options: [
      'Mức tiêu thụ điện năng tối thiểu khi máy tính ở trạng thái chờ (Idle)',
      'Lượng nhiệt năng tối đa mà hệ thống tản nhiệt (Heatsink + Fan) cần phải giải tỏa khi CPU hoạt động ở tải công việc danh định cơ bản',
      'Công suất điện ngõ ra tối đa của bộ nguồn máy tính PSU',
      'Nhiệt độ tối đa của chip vi xử lý trước khi bị cháy nổ'
    ],
    correctIndex: 1,
    explanation: 'TDP là chỉ số công suất tỏa nhiệt thiết kế (tính bằng Watts), là căn cứ kỹ thuật để kỹ sư lựa chọn quạt tản nhiệt phù hợp nhằm giữ CPU dưới ngưỡng nhiệt độ tới hạn (Tjunction).',
    subtopic: 'Nhiệt năng & Tản nhiệt'
  },
  {
    id: 'HSG_ARCH_05',
    group: 'kien-truc-phan-cung',
    level: 'ThongHieu',
    question: 'Mạch điều áp nguồn VRM (Voltage Regulator Module) trên bo mạch chủ phòng lab có chức năng then chốt nào?',
    options: [
      'Khuếch đại tín hiệu âm thanh ngõ ra Audio',
      'Hạ áp và nắn dòng điện 12V DC từ đầu cắm 8-pin CPU của bộ nguồn thành các mức điện áp siêu nhỏ cực kỳ chính xác (~0.8V - 1.35V) cấp trực tiếp cho nhân CPU',
      'Chuyển đổi tín hiệu hình ảnh HDMI sang VGA analog',
      'Quản lý quạt gió thùng máy quay theo nhiệt độ'
    ],
    correctIndex: 1,
    explanation: 'Mạch VRM gồm các cuộn cảm (Chokes), MOSFET và tụ lọc rắn, đóng vai trò biến đổi điện áp 12V thành mức điện áp siêu nhỏ với cường độ dòng điện hàng chục ampe cung cấp cho vi xử lý với độ gợn sóng cực thấp.',
    subtopic: 'Mạch nguồn VRM'
  },
  {
    id: 'HSG_ARCH_06',
    group: 'kien-truc-phan-cung',
    level: 'VanDung',
    question: 'Khi lắp đặt bộ nhớ RAM DDR4 trên bo mạch chủ có 4 khe cắm, tại sao kỹ thuật viên luôn ưu tiên cắm ở cặp khe A2 - B2 (khe số 2 và số 4 tính từ socket CPU ra ngoài)?',
    options: [
      'Để tránh quạt tản nhiệt CPU thổi hơi nóng vào thanh RAM',
      'Để tín hiệu truyền đi đến điểm cuối của mạch đường mạch (Daisy-Chain topology) không bị hiện tượng phản xạ sóng tín hiệu gây suy hao dữ liệu khi kích hoạt Dual-Channel',
      'Vì khe 1 và khe 3 là khe phụ chỉ chạy ở tốc độ 1333 MHz',
      'Do nhà sản xuất quy ước ngẫu nhiên không liên quan đến vật lý'
    ],
    correctIndex: 1,
    explanation: 'Hầu hết bo mạch chủ hiện đại áp dụng thiết kế mạch Daisy-Chain. Cắm ở vị trí cuối nhánh mạch (khe A2 và B2) giúp triệt tiêu hiện tượng dội ngược tín hiệu (Signal Reflection), giúp RAM chạy ổn định ở bus cao (XMP 3200MHz+).',
    subtopic: 'Kiến trúc Dual-Channel'
  },
  {
    id: 'HSG_ARCH_07',
    group: 'kien-truc-phan-cung',
    level: 'VanDungCao',
    question: 'Hiện tượng "Thermal Throttling" trên CPU xảy ra khi nào và cơ chế tự vệ của nó hoạt động ra sao?',
    options: [
      'Xảy ra khi điện áp sụt giảm; CPU lập tức tắt máy hoàn toàn',
      'Xảy ra khi nhiệt độ die chạm ngưỡng Tjunction Max (~100°C); CPU tự động hạ hệ số nhân (Multiplier) và điện áp Vcore để giảm công suất tỏa nhiệt, tránh phá hủy bán dẫn',
      'Xảy ra khi quạt quay quá nhanh; CPU tự động ép xung để bù lại nhiệt độ mát',
      'Xảy ra khi ổ cứng đầy dung lượng khiến bộ nhớ đệm CPU bị nghẽn'
    ],
    correctIndex: 1,
    explanation: 'Thermal Throttling là cơ chế an toàn Poka-Yoke phần cứng: Khi cảm biến nhiệt báo vượt ngưỡng an toàn (thường là 100°C do khô keo hoặc bung chốt tản nhiệt), CPU tự hạ xung nhịp để làm nguội cấp tốc.',
    subtopic: 'Bảo vệ vi xử lý'
  },
  {
    id: 'HSG_ARCH_08',
    group: 'kien-truc-phan-cung',
    level: 'ThongHieu',
    question: 'Sự khác biệt cốt lõi giữa Socket LGA (Land Grid Array - của Intel) và Socket PGA (Pin Grid Array - của AMD đời cũ) là gì?',
    options: [
      'LGA dùng cho laptop mỏng nhẹ, PGA dùng cho máy tính để bàn phòng lab',
      'LGA có các chân kim nhọn nằm trên bo mạch chủ (lưng CPU chỉ có các điểm tiếp xúc phẳng); còn PGA có các chân kim nằm trên chính lưng con chip CPU (lỗ cắm nằm trên bo mạch)',
      'LGA chỉ chạy điện 5V, PGA chạy điện 12V',
      'LGA không cần tản nhiệt, PGA bắt buộc phải dùng tản nhiệt nước'
    ],
    correctIndex: 1,
    explanation: 'Socket LGA1200 của Intel có 1200 chân kim đồng nhạy cảm nằm trên bo mạch chủ. Quy tắc an toàn bắt buộc: Tuyệt đối không chạm tay vào chân socket LGA vì rất dễ làm cong vênh chân tiếp xúc.',
    subtopic: 'Socket & Chân cắm'
  },
  {
    id: 'HSG_ARCH_09',
    group: 'kien-truc-phan-cung',
    level: 'VanDung',
    question: 'Ổ cứng SSD chuẩn M.2 NVMe PCIe Gen3 x4 cho tốc độ đọc tuần tự lý thuyết tối đa vào khoảng bao nhiêu?',
    options: [
      'Khoảng 550 MB/s (ngang bằng chuẩn SATA III)',
      'Khoảng 3500 MB/s (~3.5 GB/s)',
      'Khoảng 7000 MB/s (~7.0 GB/s)',
      'Khoảng 15000 MB/s'
    ],
    correctIndex: 1,
    explanation: 'Mỗi làn PCIe 3.0 có băng thông khoảng 985 MB/s. Với giao thức NVMe chạy trên 4 làn (x4), tốc độ lý thuyết tối đa đạt: 985 x 4 ≈ 3940 MB/s (thực tế các ổ cao cấp đạt khoảng 3500 MB/s, nhanh gấp 6 lần SSD SATA III).',
    subtopic: 'Giao thức Lưu trữ NVMe'
  },
  {
    id: 'HSG_ARCH_10',
    group: 'kien-truc-phan-cung',
    level: 'ThongHieu',
    question: 'Thuật ngữ "DMI (Direct Media Interface)" trong kiến trúc máy tính Intel dùng để chỉ:',
    options: [
      'Giao diện kết nối màn hình kỹ thuật số độ phân giải cao',
      'Liên kết điểm-điểm tốc độ cao nối trực tiếp giữa bộ vi xử lý (CPU) và Chipset bo mạch chủ (PCH)',
      'Giao thức truyền dữ liệu không dây giữa chuột và máy tính',
      'Phần mềm quản lý âm thanh đa kênh'
    ],
    correctIndex: 1,
    explanation: 'DMI là đường cao tốc dữ liệu nội bộ nối vi xử lý Intel với chipset PCH. Mọi dữ liệu từ cổng USB, âm thanh, mạng LAN, ổ SATA đều phải đi qua liên kết DMI này để nạp vào CPU.',
    subtopic: 'Kiến trúc Bus hệ thống'
  },
  {
    id: 'HSG_ARCH_11',
    group: 'kien-truc-phan-cung',
    level: 'VanDungCao',
    question: 'Khi đo kiểm điện áp ngõ ra của bộ nguồn máy tính PSU chuẩn ATX bằng đồng hồ vạn năng, điện áp dây MÀU VÀNG, MÀU ĐỎ và MÀU CAM lần lượt phải đạt mức danh định là:',
    options: [
      '+5V, +12V, +3.3V',
      '+12V, +5V, +3.3V',
      '-12V, +5V, +1.2V',
      '+3.3V, +12V, +5V'
    ],
    correctIndex: 1,
    explanation: 'Quy ước chuẩn màu dây nguồn ATX: Dây Vàng = +12V (nuôi CPU, quạt, mô tơ ổ đĩa); Dây Đỏ = +5V (nuôi vi mạch số, USB); Dây Cam = +3.3V (nuôi RAM, chip logic); Dây Đen = Mass (0V/Ground).',
    subtopic: 'Bộ nguồn PSU chuẩn ATX'
  },
  {
    id: 'HSG_ARCH_12',
    group: 'kien-truc-phan-cung',
    level: 'VanDung',
    question: 'Trên bo mạch chủ MSI H510M Pro, khi bật nguồn đèn EZ Debug LED dừng lại và sáng cố định ở đèn "VGA", điều này biểu thị sự cố kỹ thuật nào?',
    options: [
      'Vi xử lý CPU bị cháy chân tiếp xúc',
      'Bộ nhớ RAM bị bám bụi chân mạ vàng',
      'Không nhận diện được Card màn hình đồ họa (VGA bị lỏng chân PCIe hoặc CPU hậu tố F không có GPU tích hợp mà cắm dây lên cổng mainboard)',
      'Hệ điều hành Windows bị lỗi file khởi động bootmgr'
    ],
    correctIndex: 2,
    explanation: 'Đèn VGA trên cụm EZ Debug sáng đứng báo hiệu hệ thống POST không tìm thấy thiết bị xuất hình. Lỗi kinh điển của học sinh là dùng chip Core i5-10400F (không có iGPU) nhưng lại cắm dây màn hình lên cổng VGA/HDMI của Mainboard thay vì cổng Card đồ họa rời GT 730.',
    subtopic: 'Chẩn đoán EZ Debug LED'
  },
  {
    id: 'HSG_ARCH_13',
    group: 'kien-truc-phan-cung',
    level: 'ThongHieu',
    question: 'Công nghệ siêu phân luồng Intel Hyper-Threading (HT) mang lại lợi ích gì cho hiệu năng xử lý?',
    options: [
      'Gấp đôi xung nhịp vật lý của bộ vi xử lý ngay lập tức',
      'Nhân đôi số lượng nhân vật lý thực tế trên phiến silicon',
      'Cho phép 1 nhân vật lý xử lý đồng thời 2 luồng chỉ mục (Threads) bằng cách tận dụng các khối thực thi nhàn rỗi trong chu kỳ lệnh',
      'Tăng gấp đôi dung lượng bộ nhớ RAM của máy tính'
    ],
    correctIndex: 2,
    explanation: 'Hyper-Threading biến 1 nhân vật lý thành 2 nhân logic (như Core i5-10400 có 6 nhân / 12 luồng), giúp hệ điều hành Windows phân bổ khối lượng tính toán đa nhiệm hiệu quả hơn từ 20-30%.',
    subtopic: 'Công nghệ CPU'
  },
  {
    id: 'HSG_ARCH_14',
    group: 'kien-truc-phan-cung',
    level: 'VanDung',
    question: 'Tại sao việc clear CMOS (xóa cài đặt BIOS) bằng cách tháo pin CR2032 hoặc chập jumper CLRTC lại có thể cứu sống được máy tính bị treo sau khi ép xung sai?',
    options: [
      'Vì nó nạp lại toàn bộ hệ điều hành Windows mới nguyên bản',
      'Vì chip nhớ CMOS là bộ nhớ khả biến (Volatile), cần pin nuôi để giữ thiết lập; khi mất điện tích, nó tự động trả toàn bộ thông số xung nhịp và điện áp về mức mặc định ban đầu an toàn của nhà sản xuất (Default Safe)',
      'Vì nó làm sạch bụi bẩn trong các khe cắm linh kiện',
      'Vì nó kích hoạt nguồn dự phòng bí mật bên trong bo mạch'
    ],
    correctIndex: 1,
    explanation: 'CMOS RAM là bộ nhớ bán dẫn cần nguồn điện 3V từ pin CR2032 duy trì. Ngắt nguồn nuôi này trong 1-3 phút sẽ xóa sạch mọi thông số tinh chỉnh sai, đưa BIOS về cấu hình xuất xưởng an toàn.',
    subtopic: 'BIOS/UEFI & CMOS'
  },
  {
    id: 'HSG_ARCH_15',
    group: 'kien-truc-phan-cung',
    level: 'VanDungCao',
    question: 'Khi lắp ráp Card đồ họa NVIDIA GT 730 vào khe PCIe x16, học sinh quên không gài chốt khóa đuôi khe cắm và không bắt ốc nẹp khung sau case. Nguy cơ kỹ thuật nghiêm trọng nhất xảy ra là gì?',
    options: [
      'Quạt tản nhiệt của card sẽ quay ngược chiều',
      'Dưới sức nặng của card và lực cắm/rút dây cáp màn hình, card bị xệ và rung lắc làm kênh các chân tiếp xúc mạ vàng gây chập điện 12V làn PCIe làm cháy bo mạch hoặc chết chip GPU',
      'Máy tính tự động chuyển độ phân giải về 640x480',
      'Đèn LED bàn phím không sáng được'
    ],
    correctIndex: 1,
    explanation: 'Quy chuẩn cơ khí Poka-Yoke: Khe PCIe x16 có 2 điểm giữ an toàn: (1) Lẫy khóa đuôi ngậm chặt; (2) Ốc vít siết cố định nẹp sắt vào thùng máy. Không siết ốc sẽ khiến card bị xệ (GPU Sag) và đoản mạch khi học sinh cắm cáp HDMI/VGA.',
    subtopic: 'Quy trình cơ khí Poka-Yoke'
  },
  {
    id: 'HSG_ARCH_16',
    group: 'kien-truc-phan-cung',
    level: 'ThongHieu',
    question: 'Sự khác biệt căn bản giữa chế độ khởi động Legacy BIOS và UEFI là gì?',
    options: [
      'Legacy BIOS khởi động nhanh hơn UEFI trên ổ cứng dung lượng lớn',
      'Legacy sử dụng bảng phân vùng MBR (giới hạn tối đa 2TB và 4 phân vùng chính); còn UEFI khởi động với bảng phân vùng GPT (hỗ trợ ổ cứng dung lượng khổng lồ, không giới hạn phân vùng và hỗ trợ Secure Boot)',
      'Legacy chỉ chạy được trên hệ điều hành 64-bit, UEFI chỉ chạy 32-bit',
      'Legacy giao diện đồ họa chuột mượt mà, UEFI chỉ có chữ đen trắng'
    ],
    correctIndex: 1,
    explanation: 'UEFI kết hợp bảng phân vùng GPT là chuẩn mực bắt buộc của công nghệ hiện đại, cho phép khởi động cực nhanh qua Windows Boot Manager và hỗ trợ bảo mật tính toàn vẹn Secure Boot chống mã độc can thiệp vào giai đoạn nạp OS.',
    subtopic: 'Khởi động UEFI/GPT'
  },
  {
    id: 'HSG_ARCH_17',
    group: 'kien-truc-phan-cung',
    level: 'VanDung',
    question: 'Chuẩn chứng nhận nguồn "80 PLUS Gold" cam kết điều gì với người dùng?',
    options: [
      'Bộ nguồn có bảo hành vàng 80 tháng',
      'Ở các mức tải 20%, 50% và 100%, bộ nguồn đạt hiệu suất chuyển đổi từ điện xoay chiều AC sang một chiều DC tối thiểu từ 87% đến 90%',
      'Nguồn có thể chạy liên tục ở nhiệt độ 80 độ C mà không ngắt',
      'Nguồn luôn giữ điện áp ngõ ra đúng 80V'
    ],
    correctIndex: 1,
    explanation: 'Chứng nhận 80 PLUS (White, Bronze, Silver, Gold, Platinum, Titanium) đo lường hiệu suất chuyển đổi điện năng. Hiệu suất cao (Gold $\ge 90\%$) giúp giảm lượng điện hao phí biến thành nhiệt, giúp nguồn hoạt động mát mẻ và bền bỉ.',
    subtopic: 'Hiệu suất Nguồn 80 PLUS'
  },
  {
    id: 'HSG_ARCH_18',
    group: 'kien-truc-phan-cung',
    level: 'VanDungCao',
    question: 'Khẩu quyết "Một Hạt Đậu Xanh Keo Tản Nhiệt" được các chuyên gia phần cứng khuyến nghị vì nguyên lý vật lý nào?',
    options: [
      'Vì keo tản nhiệt đắt tiền nên phải tiết kiệm',
      'Vì keo tản nhiệt bản chất dẫn nhiệt kém hơn nhiều so với kim loại đồng/nhôm; nó chỉ có nhiệm vụ duy nhất là lấp đầy các khe hở bọt khí siêu vi giữa 2 bề mặt kim loại. Tra quá dày sẽ biến keo thành lớp đệm giữ nhiệt hoặc tràn xuống socket gây chập mạch',
      'Vì keo tản nhiệt có thể làm mòn lớp vỏ bảo vệ CPU',
      'Để tránh quạt tản nhiệt quay quá nhanh gây ồn'
    ],
    correctIndex: 1,
    explanation: 'Hệ số dẫn nhiệt của đồng là ~400 W/mK, nhôm ~200 W/mK, trong khi keo tản nhiệt chỉ đạt 5-12 W/mK. Keo chỉ đóng vai trò lấp khoảng trống vi mô không khí (không khí dẫn nhiệt cực tệ: 0.026 W/mK). Một giọt hạt đậu xanh ép phẳng sẽ tạo màng siêu mỏng lý tưởng nhất.',
    subtopic: 'Vật lý Tản nhiệt CPU'
  },

  // ==========================================================================
  // NHÓM 2: MÔ HÌNH OSI 7 TẦNG & TCP/IP (ENCAPSULATION & PROTOCOLS) (18 CÂU)
  // ==========================================================================
  {
    id: 'HSG_OSI_01',
    group: 'osi-tcpip',
    level: 'ThongHieu',
    question: 'Đơn vị dữ liệu giao thức (PDU - Protocol Data Unit) tại các tầng Vận chuyển (Transport), Mạng (Network) và Liên kết dữ liệu (Data Link) của mô hình OSI lần lượt được gọi là gì?',
    options: [
      'Packet, Segment, Frame',
      'Segment, Packet, Frame',
      'Frame, Packet, Segment',
      'Data, Datagram, Bit'
    ],
    correctIndex: 1,
    explanation: 'Quy ước PDU chuẩn quốc tế: Tầng 4 (Transport) = Segment; Tầng 3 (Network) = Packet; Tầng 2 (Data Link) = Frame; Tầng 1 (Physical) = Bits.',
    subtopic: 'Mô hình OSI & PDU'
  },
  {
    id: 'HSG_OSI_02',
    group: 'osi-tcpip',
    level: 'VanDung',
    question: 'Trong quá trình đóng gói dữ liệu (Encapsulation) từ máy gửi đi qua mạng, thứ tự thêm tiêu đề (Headers) và đuôi (Trailer) diễn ra như thế nào?',
    options: [
      'Dữ liệu ➔ Thêm IP Header ➔ Thêm TCP Header ➔ Thêm MAC Header và FCS',
      'Dữ liệu ➔ Thêm TCP/UDP Header (Tầng 4) ➔ Thêm IP Header (Tầng 3) ➔ Thêm MAC Header và FCS Trailer (Tầng 2) ➔ Chuyển thành chuỗi Bit (Tầng 1)',
      'Dữ liệu ➔ Thêm MAC Header ➔ Thêm IP Header ➔ Thêm Port Header',
      'Dữ liệu được nén lại và gửi trực tiếp thành sóng vô tuyến'
    ],
    correctIndex: 1,
    explanation: 'Quá trình Encapsulation đi từ trên xuống dưới: Data ứng dụng được gán TCP Header (chứa Port nguồn/đích) tạo thành Segment; gán IP Header (IP nguồn/đích) tạo thành Packet; gán MAC Header và FCS Trailer kiểm lỗi tạo thành Frame; sau đó mã hóa thành Bit đẩy ra cáp mạng.',
    subtopic: 'Quá trình Encapsulation'
  },
  {
    id: 'HSG_OSI_03',
    group: 'osi-tcpip',
    level: 'VanDungCao',
    question: 'Quá trình bắt tay 3 bước (Three-way Handshake) để thiết lập phiên truyền TCP tin cậy giữa Client và Server diễn ra theo trình tự cờ (Flags) nào?',
    options: [
      'Client gửi ACK ➔ Server gửi SYN ➔ Client gửi FIN',
      'Client gửi gói [SYN] ➔ Server phản hồi [SYN, ACK] ➔ Client xác nhận bằng [ACK]',
      'Client gửi [SYN, ACK] ➔ Server gửi [ACK] ➔ Bắt đầu truyền',
      'Server gửi [HELLO] ➔ Client gửi [OK] ➔ Server gửi [READY]'
    ],
    correctIndex: 1,
    explanation: 'Quy chuẩn TCP Handshake: (1) Client gửi gói tin có cờ SYN kèm số thứ tự khởi tạo Seq=x; (2) Server phản hồi cờ SYN+ACK với Seq=y và Ack=x+1; (3) Client gửi ACK với Ack=y+1 để hoàn tất thiết lập kết nối.',
    subtopic: 'Bắt tay 3 bước TCP'
  },
  {
    id: 'HSG_OSI_04',
    group: 'osi-tcpip',
    level: 'ThongHieu',
    question: 'Trường TTL (Time to Live) trong tiêu đề gói tin IPv4 Header có vai trò sống còn nào trên mạng Internet?',
    options: [
      'Đo lường thời gian gói tin di chuyển theo đơn vị mili giây',
      'Ngăn chặn gói tin bị lặp vòng vô tận (Routing Loop) trên mạng; mỗi khi gói tin đi qua 1 Router, giá trị TTL bị trừ đi 1 đơn vị, khi TTL = 0 gói tin sẽ bị hủy và gửi thông báo ICMP Time Exceeded',
      'Quy định thời gian sống của tài khoản người dùng',
      'Xác định tốc độ tối đa của đường truyền cáp quang'
    ],
    correctIndex: 1,
    explanation: 'TTL là bộ đếm số bước nhảy (Hop count). Nếu mạng bị lặp vòng định tuyến, TTL sẽ giảm dần về 0 và Router lập tức tiêu hủy gói tin, giải phóng băng thông cho mạng toàn cầu.',
    subtopic: 'IPv4 Header & TTL'
  },
  {
    id: 'HSG_OSI_05',
    group: 'osi-tcpip',
    level: 'VanDung',
    question: 'Giao thức phân giải địa chỉ ARP (Address Resolution Protocol) thực hiện chức năng then chốt nào trong mạng nội bộ LAN?',
    options: [
      'Chuyển đổi tên miền (ví dụ: google.com) thành địa chỉ IP',
      'Ánh xạ từ một địa chỉ IP đã biết sang địa chỉ vật lý MAC tương ứng của card mạng trong cùng mạng broadcast',
      'Tự động cấp phát địa chỉ IP cho máy trạm',
      'Kiểm tra tốc độ download và upload của đường truyền'
    ],
    correctIndex: 1,
    explanation: 'Tại tầng 2, Switch chỉ chuyển tiếp dữ liệu dựa trên địa chỉ MAC. Giao thức ARP gửi gói ARP Request (Broadcast FF:FF:FF:FF:FF:FF) để hỏi "Ai có IP x.x.x.x hãy cho tôi biết địa chỉ MAC", và nhận lại gói ARP Reply (Unicast).',
    subtopic: 'Giao thức ARP'
  },
  {
    id: 'HSG_OSI_06',
    group: 'osi-tcpip',
    level: 'ThongHieu',
    question: 'Kích thước khung dữ liệu chuẩn MTU (Maximum Transmission Unit) trên mạng Ethernet thông thường là bao nhiêu bytes?',
    options: [
      '64 bytes',
      '512 bytes',
      '1500 bytes',
      '9000 bytes (Jumbo Frame)'
    ],
    correctIndex: 2,
    explanation: 'Kích thước MTU mặc định trên mạng Ethernet là 1500 bytes (chưa tính 14 bytes Ethernet Header và 4 bytes FCS). Nếu gói IP vượt quá 1500 bytes mà cờ Don\'t Fragment (DF) được bật, gói sẽ bị hủy và báo lỗi phân mảnh.',
    subtopic: 'MTU & Phân mảnh gói tin'
  },
  {
    id: 'HSG_OSI_07',
    group: 'osi-tcpip',
    level: 'VanDungCao',
    question: 'Khi sử dụng công cụ Wireshark bắt gói tin, kỹ thuật viên nhận thấy một gói tin TCP có cờ RST (Reset) được bật. Ý nghĩa của cờ này là:',
    options: [
      'Yêu cầu khởi động lại máy tính từ xa',
      'Lập tức hủy bỏ và đóng kết nối TCP bất thường do cổng dịch vụ không mở, bị từ chối kết nối hoặc phát hiện bất thường bảo mật',
      'Thông báo hoàn tất truyền file thành công',
      'Tạm dừng truyền dữ liệu để chờ bộ nhớ đệm xả hết'
    ],
    correctIndex: 1,
    explanation: 'Cờ RST được gửi khi một host nhận được gói tin gửi đến một port mà không có ứng dụng nào đang lắng nghe (Listening), hoặc khi tường lửa phát hiện hành vi xâm nhập và chủ động ngắt phiên kết nối.',
    subtopic: 'Cờ điều khiển TCP'
  },
  {
    id: 'HSG_OSI_08',
    group: 'osi-tcpip',
    level: 'VanDung',
    question: 'Sự khác biệt cốt lõi trong cơ chế truyền tải giữa giao thức TCP (Transmission Control Protocol) và UDP (User Datagram Protocol) là gì?',
    options: [
      'TCP chỉ truyền ký tự văn bản, UDP chỉ truyền file video',
      'TCP hướng kết nối (Connection-oriented), đảm bảo tin cậy 100%, có đánh số thứ tự và kiểm soát nghẽn; UDP phi kết nối (Connectionless), không đảm bảo đến đích nhưng tốc độ cực nhanh, thích hợp cho âm thanh/video thời gian thực',
      'TCP chạy chậm hơn UDP 1000 lần nên đã bị khai tử',
      'UDP chỉ chạy được trên mạng cáp đồng, không chạy được trên Wi-Fi'
    ],
    correctIndex: 1,
    explanation: 'TCP đánh đổi độ trễ để lấy độ tin cậy tuyệt đối (Web, Mail, File transfer). UDP tối ưu độ trễ thấp cho ứng dụng thời gian thực như VoIP, Livestream, DNS, Game online.',
    subtopic: 'TCP vs UDP'
  },
  {
    id: 'HSG_OSI_09',
    group: 'osi-tcpip',
    level: 'ThongHieu',
    question: 'Khi người dùng gõ `ping 127.0.0.1` trong Command Prompt (CMD) của Windows 10 và nhận được phản hồi `Reply from 127.0.0.1`, điều này chứng minh được điều gì?',
    options: [
      'Dây mạng đã cắm thông tới Router nhà mạng',
      'Chồng giao thức TCP/IP và Card mạng logic nội bộ (Loopback Adapter) trên máy tính hoạt động hoàn toàn bình thường',
      'Máy tính đã kết nối thành công ra mạng Internet toàn cầu',
      'Máy in trong mạng LAN đã sẵn sàng in'
    ],
    correctIndex: 1,
    explanation: 'Dải 127.0.0.0/8 là dải Loopback nội bộ. Ping 127.0.0.1 là bài test bước đầu tiên của kỹ thuật viên để xác nhận driver ngăn xếp TCP/IP của hệ điều hành Windows không bị hỏng.',
    subtopic: 'Kiểm tra Loopback'
  },
  {
    id: 'HSG_OSI_10',
    group: 'osi-tcpip',
    level: 'VanDung',
    question: 'Khi một máy tính phòng lab không thể nhận được địa chỉ IP từ máy chủ DHCP, Windows 10 tự động gán địa chỉ IP thuộc dải nào theo cơ chế APIPA?',
    options: [
      '192.168.1.x',
      '10.0.0.x',
      '169.254.0.1 đến 169.254.255.254 (Subnet Mask 255.255.0.0)',
      '172.16.0.x'
    ],
    correctIndex: 2,
    explanation: 'Dải 169.254.0.0/16 được chuẩn IETF dành riêng cho APIPA (Automatic Private IP Addressing). Khi thấy IP này kèm dấu chấm than vàng, kỹ sư mạng biết ngay là dịch vụ DHCP Server bị chết hoặc tuột dây mạng.',
    subtopic: 'Cơ chế APIPA'
  },
  {
    id: 'HSG_OSI_11',
    group: 'osi-tcpip',
    level: 'ThongHieu',
    question: 'Các cổng dịch vụ (Port Numbers) mặc định của giao thức HTTP, HTTPS, DNS, DHCP Server và SSH lần lượt là:',
    options: [
      '80, 443, 53, 67, 22',
      '21, 23, 25, 80, 443',
      '8080, 8443, 53, 68, 3389',
      '80, 443, 8080, 21, 23'
    ],
    correctIndex: 0,
    explanation: 'Quy ước cổng Well-known ports chuẩn IANA: HTTP = 80; HTTPS = 443; DNS = 53 (UDP/TCP); DHCP Server = 67 (DHCP Client = 68); SSH = 22; RDP Remote Desktop = 3389.',
    subtopic: 'Well-known Ports'
  },
  {
    id: 'HSG_OSI_12',
    group: 'osi-tcpip',
    level: 'VanDungCao',
    question: 'Lệnh `tracert` (Trace Route) trên hệ điều hành Windows sử dụng giao thức và cơ chế nào để lần tìm từng nút mạng (hop) trên đường đi?',
    options: [
      'Sử dụng giao thức SNMP để đọc bảng định tuyến của tất cả các Router',
      'Gửi các gói tin ICMP Echo Request với giá trị TTL tăng dần (bắt đầu từ TTL=1, TTL=2, TTL=3...). Mỗi Router trên đường đi khi giảm TTL về 0 sẽ phản hồi gói ICMP Time Exceeded',
      'Gửi lệnh SSH đăng nhập vào từng Router trung gian',
      'Sử dụng giao thức FTP để tải log đường truyền'
    ],
    correctIndex: 1,
    explanation: 'Tracert khai thác đặc tính của trường TTL trong IP Header: Gói TTL=1 chết ở Router 1 báo về danh tính hop 1; gói TTL=2 chết ở Router 2 báo về hop 2... cho đến khi chạm tới đích.',
    subtopic: 'Cơ chế Tracert & ICMP'
  },
  {
    id: 'HSG_OSI_13',
    group: 'osi-tcpip',
    level: 'VanDung',
    question: 'Địa chỉ MAC (Media Access Control) có độ dài bao nhiêu bit và cấu trúc của nó được phân chia như thế nào?',
    options: [
      '32 bit, chia làm 4 octet số thập phân',
      '48 bit (6 bytes, biểu diễn bằng 12 ký tự Hex), gồm 24 bit đầu là định danh nhà sản xuất (OUI) và 24 bit sau do nhà sản xuất tự gán',
      '64 bit, chia làm 8 cụm Hex',
      '128 bit, giống như địa chỉ IPv6'
    ],
    correctIndex: 1,
    explanation: 'Địa chỉ MAC chuẩn IEEE 802 có độ dài 48 bit (ví dụ: `00:1A:2B:3C:4D:5E`). 24 bit đầu (OUI - Organizationally Unique Identifier) do tổ chức IEEE cấp cho các hãng như Intel, Realtek, Cisco.',
    subtopic: 'Cấu trúc Địa chỉ MAC'
  },
  {
    id: 'HSG_OSI_14',
    group: 'osi-tcpip',
    level: 'ThongHieu',
    question: 'Trong mô hình TCP/IP 4 tầng thu gọn, 3 tầng Ứng dụng (Application), Trình diễn (Presentation) và Phiên (Session) của mô hình OSI được gộp thành tầng nào?',
    options: [
      'Tầng Network Interface',
      'Tầng Internet',
      'Tầng Transport',
      'Tầng Application (Tầng Ứng dụng)'
    ],
    correctIndex: 3,
    explanation: 'Mô hình TCP/IP gộp cả 3 tầng trên cùng của OSI thành 1 tầng Ứng dụng duy nhất, nơi các ứng dụng tự chịu trách nhiệm định dạng dữ liệu (mã hóa SSL, nén ảnh JPEG/PNG) và quản lý phiên làm việc.',
    subtopic: 'Đối chiếu OSI vs TCP/IP'
  },
  {
    id: 'HSG_OSI_15',
    group: 'osi-tcpip',
    level: 'VanDung',
    question: 'Gói tin kiểm tra lỗi FCS (Frame Check Sequence) nằm ở đuôi của Ethernet Frame sử dụng thuật toán nào để phát hiện sai sót dữ liệu?',
    options: [
      'Mã hóa đối xứng AES-256',
      'Thuật toán băm MD5',
      'Thuật toán mã vòng CRC-32 (Cyclic Redundancy Check)',
      'Hàm băm SHA-1'
    ],
    correctIndex: 2,
    explanation: 'FCS 4 bytes ở cuối Frame sử dụng giải thuật CRC-32. Máy nhận tính toán lại đa thức CRC; nếu kết quả không khớp với FCS trong Frame, máy nhận xác định Frame bị nhiễu và lập tức hủy bỏ.',
    subtopic: 'Kiểm lỗi Frame CRC'
  },
  {
    id: 'HSG_OSI_16',
    group: 'osi-tcpip',
    level: 'VanDungCao',
    question: 'Khi máy tính A muốn gửi dữ liệu cho máy tính B có địa chỉ IP khác dải mạng (khác Subnet), máy tính A sẽ đóng gói địa chỉ MAC đích (Destination MAC) trong Ethernet Frame là địa chỉ của ai?',
    options: [
      'Địa chỉ MAC của máy tính B',
      'Địa chỉ MAC của Default Gateway (Cổng cổng ngõ Router trong mạng LAN của máy A)',
      'Địa chỉ MAC Broadcast toàn cầu (FF:FF:FF:FF:FF:FF)',
      'Địa chỉ MAC của máy chủ DNS 8.8.8.8'
    ],
    correctIndex: 1,
    explanation: 'Quy tắc định tuyến cốt lõi: Địa chỉ IP đích giữ nguyên là IP của máy B, nhưng địa chỉ MAC đích tại tầng 2 BẮT BUỘC phải là MAC của Default Gateway để Switch chuyển gói tin lên cho Router định tuyến ra ngoài.',
    subtopic: 'Nguyên lý Định tuyến Tầng 2/3'
  },
  {
    id: 'HSG_OSI_17',
    group: 'osi-tcpip',
    level: 'ThongHieu',
    question: 'Dịch vụ mạng DNS (Domain Name System) sử dụng giao thức truyền tải nào ở tầng Transport?',
    options: [
      'Chỉ sử dụng duy nhất giao thức TCP cổng 80',
      'Chủ yếu sử dụng UDP cổng 53 cho các truy vấn thông thường (Query/Response) để đạt tốc độ cao; sử dụng TCP cổng 53 khi truyền vùng dữ liệu lớn (Zone Transfer)',
      'Chỉ sử dụng duy nhất giao thức ICMP',
      'Sử dụng giao thức ARP tầng 2'
    ],
    correctIndex: 1,
    explanation: 'Hầu hết các truy vấn phân giải tên miền của máy trạm đều dùng UDP 53 để tiết kiệm băng thông và giảm độ trễ. Khi bản ghi vượt quá 512 bytes hoặc đồng bộ Zone giữa các DNS Server thì DNS chuyển sang TCP 53.',
    subtopic: 'Giao thức DNS'
  },
  {
    id: 'HSG_OSI_18',
    group: 'osi-tcpip',
    level: 'VanDung',
    question: 'Thuật ngữ "Broadcast Storm" (Cơn bão quảng bá) xảy ra khi nào trong hạ tầng mạng chuyển mạch Switch?',
    options: [
      'Khi trời mưa giông sét đánh vào đường truyền cáp',
      'Khi tồn tại các vòng lặp vật lý (Loop) giữa các Switch mà không được kích hoạt giao thức chống lặp Spanning Tree Protocol (STP), khiến các gói tin Broadcast bị nhân bản và quay vòng vô tận làm sập toàn mạng',
      'Khi có hơn 100 máy tính cùng tải file một lúc',
      'Khi máy chủ DNS bị mất kết nối mạng'
    ],
    correctIndex: 1,
    explanation: 'Switch tự động flood gói Broadcast ra tất cả các cổng. Nếu có vòng lặp vật lý giữa các Switch, gói Broadcast sẽ bị nhân bản theo cấp số nhân, chiếm sạch 100% băng thông và treo CPU của Switch trong vài giây.',
    subtopic: 'Broadcast Storm & STP'
  },

  // ==========================================================================
  // NHÓM 3: ĐỊNH TUYẾN, CHUYỂN MẠCH (VLAN/TRUNKING) & BẢO MẬT MẠNG (18 CÂU)
  // ==========================================================================
  {
    id: 'HSG_SEC_01',
    group: 'routing-switching-security',
    level: 'ThongHieu',
    question: 'Chuẩn đóng gói gắn thẻ mạng ảo VLAN trên đường truyền Trunk kết nối giữa các Switch theo tiêu chuẩn quốc tế của IEEE là chuẩn nào?',
    options: [
      'Cisco ISL (Inter-Switch Link)',
      'IEEE 802.1Q (Dot1Q)',
      'IEEE 802.3ab',
      'IEEE 802.11ax'
    ],
    correctIndex: 1,
    explanation: 'Chuẩn IEEE 802.1Q chèn thêm một trường Tag 4 bytes (chứa VLAN ID từ 1 đến 4094) vào giữa Source MAC và Type/Length của Ethernet Frame để phân biệt lưu lượng các mạng ảo.',
    subtopic: 'Chuẩn VLAN 802.1Q'
  },
  {
    id: 'HSG_SEC_02',
    group: 'routing-switching-security',
    level: 'VanDung',
    question: 'Trên một Switch quản trị, cổng Access (Access Port) và cổng Trunk (Trunk Port) khác nhau cơ bản như thế nào?',
    options: [
      'Cổng Access tốc độ 100 Mbps, cổng Trunk tốc độ 10 Gbps',
      'Cổng Access chỉ thuộc về duy nhất MỘT VLAN và truyền khung dữ liệu không gắn thẻ (Untagged) nối tới thiết bị đầu cuối như PC/máy in; còn cổng Trunk có khả năng vận chuyển lưu lượng của NHIỀU VLAN có gắn thẻ (Tagged) nối giữa Switch với Switch hoặc Switch với Router',
      'Cổng Access chỉ nối Wi-Fi, cổng Trunk chỉ nối cáp quang',
      'Cổng Access dùng cho sinh viên, cổng Trunk dành cho giáo viên'
    ],
    correctIndex: 1,
    explanation: 'Access port là cổng dành cho máy trạm (End-device không hiểu thẻ 802.1Q). Trunk port là cổng trung kế mang lưu lượng nhiều VLAN qua lại giữa hạ tầng mạng.',
    subtopic: 'Access vs Trunk Port'
  },
  {
    id: 'HSG_SEC_03',
    group: 'routing-switching-security',
    level: 'VanDungCao',
    question: 'Giao thức Spanning Tree Protocol (STP - IEEE 802.1D) giải quyết bài toán chống lặp vòng mạng bằng cơ chế nào?',
    options: [
      'Tự động tắt nguồn cổng Switch khi thấy có dây cắm',
      'Bầu chọn một Switch gốc (Root Bridge), sau đó tính toán đường đi ngắn nhất và chủ động đưa các cổng thừa (Redundant ports) vào trạng thái Chặn (Blocking / Discarding) để tạo ra một cấu trúc cây không vòng lặp',
      'Mã hóa toàn bộ gói tin để gói tin không quay đầu được',
      'Giới hạn mỗi Switch chỉ được cắm tối đa 4 sợi dây mạng'
    ],
    correctIndex: 1,
    explanation: 'STP trao đổi các gói BPDU để bầu Root Bridge (ưu tiên Bridge ID nhỏ nhất). Các đường dây phụ được đưa vào trạng thái Blocking; nếu đường dây chính bị đứt, cổng chặn sẽ tự động mở sau 30-50s để đảm bảo dự phòng cao.',
    subtopic: 'Nguyên lý Spanning Tree STP'
  },
  {
    id: 'HSG_SEC_04',
    group: 'routing-switching-security',
    level: 'ThongHieu',
    question: 'Tuyến đường mặc định (Default Route) được cấu hình trong bảng định tuyến của Router có địa chỉ mạng và Subnet Mask là:',
    options: [
      '192.168.1.0 255.255.255.0',
      '0.0.0.0 0.0.0.0 (ký hiệu 0.0.0.0/0)',
      '10.0.0.0 255.0.0.0',
      '255.255.255.255 255.255.255.255'
    ],
    correctIndex: 1,
    explanation: 'Default Route `0.0.0.0/0` là tuyến đường cứu cánh cuối cùng (Gateway of Last Resort). Mọi gói tin có IP đích không khớp với bất kỳ dòng nào cụ thể trong bảng định tuyến sẽ được đẩy theo tuyến này ra Internet.',
    subtopic: 'Định tuyến Default Route'
  },
  {
    id: 'HSG_SEC_05',
    group: 'routing-switching-security',
    level: 'VanDung',
    question: 'Tính năng bảo mật "Port Security" trên Switch doanh nghiệp có tác dụng chính là:',
    options: [
      'Khóa cổng vật lý bằng chìa khóa kim loại',
      'Giới hạn và ghi nhớ các địa chỉ MAC được phép kết nối vào một cổng cụ thể; nếu phát hiện địa chỉ MAC lạ kết nối vào, Switch sẽ lập tức kích hoạt hành động Shutdown cổng hoặc chặn gói tin',
      'Tăng gấp đôi tốc độ truyền dữ liệu của cổng',
      'Chặn không cho người dùng lướt web xem video'
    ],
    correctIndex: 1,
    explanation: 'Port Security ngăn chặn kẻ gian rút dây mạng của máy in/máy văn phòng cắm vào laptop cá nhân để nghe lén mạng. Switch có thể học MAC tĩnh (Sticky MAC) và Shutdown cổng ngay lập tức nếu vi phạm.',
    subtopic: 'Bảo mật Port Security'
  },
  {
    id: 'HSG_SEC_06',
    group: 'routing-switching-security',
    level: 'VanDungCao',
    question: 'Kỹ thuật NAT/PAT (Port Address Translation / Network Address Translation Overload) cho phép điều gì?',
    options: [
      'Chuyển đổi cáp mạng Cat5e thành cáp Cat6',
      'Cho phép hàng trăm máy tính trong mạng nội bộ sử dụng dải IP Private (như 192.168.x.x) cùng truy cập Internet đồng thời thông qua DUY NHẤT một địa chỉ IP Public bằng cách ánh xạ các cổng Source Port khác nhau',
      'Biến máy tính học sinh thành máy chủ Google',
      'Tự động tăng băng thông gói cước Internet của nhà mạng'
    ],
    correctIndex: 1,
    explanation: 'PAT giải quyết cuộc khủng hoảng cạn kiệt địa chỉ IPv4 toàn cầu: Cả công ty 500 người dùng chung 1 IP Public của Router nhà mạng; Router phân biệt luồng dữ liệu của từng máy dựa vào Port nguồn (Source Port từ 1024-65535).',
    subtopic: 'Kỹ thuật NAT/PAT'
  },
  {
    id: 'HSG_SEC_07',
    group: 'routing-switching-security',
    level: 'ThongHieu',
    question: 'Sự khác biệt căn bản giữa Standard ACL (Access Control List tiêu chuẩn) và Extended ACL (ACL mở rộng) trên thiết bị Cisco là gì?',
    options: [
      'Standard ACL lọc gói tin chỉ dựa trên ĐỊA CHỈ IP NGUỒN (dải số 1-99); còn Extended ACL lọc chi tiết dựa trên cả IP Nguồn, IP Đích, Giao thức (TCP/UDP/ICMP) và Số hiệu Cổng Port (dải số 100-199)',
      'Standard ACL chỉ chạy trên dây cáp, Extended chỉ chạy trên Wi-Fi',
      'Standard ACL miễn phí, Extended ACL phải mua bản quyền hàng năm',
      'Không có sự khác biệt nào'
    ],
    correctIndex: 0,
    explanation: 'Extended ACL cho phép thiết lập chính sách bảo mật chi tiết (ví dụ: cấm phòng Kế toán truy cập Web cổng 80 của máy chủ nhưng vẫn cho phép ping kiểm tra kết nối).',
    subtopic: 'Tường lửa Access Control List'
  },
  {
    id: 'HSG_SEC_08',
    group: 'routing-switching-security',
    level: 'VanDung',
    question: 'Trên thiết bị phát Wi-Fi Access Point của doanh nghiệp, tính năng "AP Isolation" (Client Isolation) có nhiệm vụ bảo mật nào?',
    options: [
      'Cách ly bộ phát sóng không cho kết nối với bộ phát khác',
      'Ngăn chặn các thiết bị không dây (Laptop, Điện thoại) kết nối vào cùng một mạng Wi-Fi nhìn thấy và tấn công lẫn nhau (chặn đứng nghe lén ARP Spoofing và lây lan virus nội bộ)',
      'Tắt sóng Wi-Fi vào ban đêm',
      'Giới hạn mỗi điện thoại chỉ được dùng Wi-Fi trong 1 giờ'
    ],
    correctIndex: 1,
    explanation: 'AP Isolation là tiêu chuẩn bắt buộc cho Wi-Fi Khách (Guest Network) tại quán cafe, văn phòng hoặc trường học: Khách chỉ có thể đi thẳng ra Internet, không thể quét cổng hay xâm nhập vào máy tính của người bên cạnh.',
    subtopic: 'Bảo mật Wi-Fi AP Isolation'
  },
  {
    id: 'HSG_SEC_09',
    group: 'routing-switching-security',
    level: 'ThongHieu',
    question: 'Chuẩn bảo mật mạng không dây WPA3 (Wi-Fi Protected Access 3) sử dụng giao thức bắt tay nào để chống lại các cuộc tấn công dò mật khẩu Offline (Dictionary Attack)?',
    options: [
      'Giao thức WEP 64-bit',
      'Giao thức SAE (Simultaneous Authentication of Equals) - Khóa trao đổi Dragonfly',
      'Giao thức mã hóa WPA-TKIP',
      'Giao thức Telnet'
    ],
    correctIndex: 1,
    explanation: 'WPA3 thay thế cơ chế bắt tay 4 bước 4-way handshake dễ bị bắt gói tin bẻ khóa của WPA2 bằng giao thức SAE (Simultaneous Authentication of Equals). Kẻ tấn công dù bắt được gói tin cũng không thể chạy từ điển giải mã offline.',
    subtopic: 'Bảo mật Wi-Fi WPA3'
  },
  {
    id: 'HSG_SEC_10',
    group: 'routing-switching-security',
    level: 'VanDungCao',
    question: 'Khi cấu hình định tuyến giữa các VLAN bằng mô hình "Router-on-a-Stick", kỹ thuật viên bắt buộc phải cấu hình thành phần nào trên cổng vật lý của Router?',
    options: [
      'Bấm thêm 4 sợi dây cáp mạng cắm vào 4 cổng Router',
      'Tạo các cổng con ảo (Sub-interfaces, ví dụ: `Gig0/0.10`, `Gig0/0.20`) và cấu hình đóng gói chuẩn `encapsulation dot1Q <vlan-id>` kèm địa chỉ IP làm Default Gateway cho từng VLAN',
      'Cài đặt phần mềm diệt virus trên Router',
      'Bật tính năng Bluetooth trên Router'
    ],
    correctIndex: 1,
    explanation: 'Mô hình Router-on-a-Stick chỉ dùng 1 sợi cáp trung kế nối giữa Switch Trunk và Router. Router dùng các Sub-interface logic để nhận diện thẻ 802.1Q của từng VLAN và định tuyến qua lại giữa các mạng ảo.',
    subtopic: 'Định tuyến Router-on-a-Stick'
  },
  {
    id: 'HSG_SEC_11',
    group: 'routing-switching-security',
    level: 'VanDung',
    question: 'Một cuộc tấn công "DHCP Starvation" diễn ra như thế nào và giải pháp phòng thủ hiệu quả nhất trên Switch là gì?',
    options: [
      'Kẻ tấn công cắt nguồn điện của máy chủ DHCP; giải pháp là dùng bộ lưu điện UPS',
      'Kẻ tấn công liên tục phát sinh hàng nghìn địa chỉ MAC giả mạo để xin cấp hết toàn bộ dải địa chỉ IP của DHCP Server; giải pháp là kích hoạt tính năng DHCP Snooping và Port Security trên Switch',
      'Kẻ tấn công gửi virus qua email làm nghẽn mạng',
      'Kẻ tấn công cài phần mềm crack trên máy trạm'
    ],
    correctIndex: 1,
    explanation: 'DHCP Snooping phân loại cổng tin cậy (Trusted) nối đến DHCP Server và cổng không tin cậy (Untrusted). Switch sẽ giới hạn tốc độ yêu cầu (Rate Limit) và so khớp địa chỉ MAC với bảng gán IP để triệt tiêu tấn công.',
    subtopic: 'Phòng thủ DHCP Snooping'
  },
  {
    id: 'HSG_SEC_12',
    group: 'routing-switching-security',
    level: 'ThongHieu',
    question: 'Giao thức định tuyến động OSPF (Open Shortest Path First) hoạt động dựa trên thuật toán nào và sử dụng thước đo (Metric) là gì?',
    options: [
      'Thuật toán Bellman-Ford dựa trên số bước nhảy Hop count',
      'Thuật toán Dijkstra (Shortest Path First - SPF) dựa trên Chi phí đường truyền (Cost tỷ lệ nghịch với băng thông Bandwidth)',
      'Thuật toán băm ngẫu nhiên dựa trên độ dài tên miền',
      'Thuật toán quay vòng tròn Round-robin'
    ],
    correctIndex: 1,
    explanation: 'OSPF là giao thức trạng thái liên kết (Link-State Protocol). Nó dùng thuật toán Dijkstra xây dựng bản đồ toàn cảnh mạng. Đường truyền cáp quang băng thông cao sẽ có Cost cực nhỏ và được ưu tiên hơn cáp đồng tốc độ thấp.',
    subtopic: 'Giao thức Định tuyến OSPF'
  },
  {
    id: 'HSG_SEC_13',
    group: 'routing-switching-security',
    level: 'VanDungCao',
    question: 'Khi phân quyền chia sẻ thư mục trên hệ điều hành Windows 10, nếu quyền Share Permissions là "Everyone: Read", nhưng quyền NTFS Security Permissions là "Users: Full Control", thì khi người dùng truy cập qua mạng LAN sẽ có quyền thực tế nào?',
    options: [
      'Quyền Full Control (toàn quyền xóa sửa file)',
      'Quyền Read (chỉ đọc, không thể chỉnh sửa hay xóa file) vì quy tắc kết hợp lấy mức quyền hạn hẹp nhất (Most Restrictive Permission)',
      'Bị cấm truy cập hoàn toàn',
      'Quyền Write nhưng không có quyền Read'
    ],
    correctIndex: 1,
    explanation: 'Quy tắc an ninh kinh điển của Microsoft Windows: Khi kết hợp Share Permission và NTFS Permission qua mạng, hệ điều hành luôn áp dụng quyền hạn ngặt nghèo nhất (Restrictive wins). Do đó Read + Full Control = Read.',
    subtopic: 'Phân quyền NTFS & Share'
  },
  {
    id: 'HSG_SEC_14',
    group: 'routing-switching-security',
    level: 'ThongHieu',
    question: 'Mạng riêng ảo VPN (Virtual Private Network) sử dụng giao thức đường hầm IPsec để đảm bảo các mục tiêu an toàn thông tin cốt lõi nào?',
    options: [
      'Tăng tốc độ mạng lên gấp đôi',
      'Tính bảo mật (Confidentiality qua mã hóa), Tính toàn vẹn (Integrity qua hàm băm) và Xác thực danh tính nguồn gốc dữ liệu (Authentication)',
      'Tự động sao lưu dữ liệu máy tính sang ổ cứng đám mây',
      'Chặn quảng cáo trên trình duyệt web'
    ],
    correctIndex: 1,
    explanation: 'IPsec bảo vệ luồng dữ liệu đi qua mạng Internet công cộng như một đường hầm riêng bằng cách kết hợp mã hóa (ESP), kiểm tra tính toàn vẹn (HMAC) và trao đổi khóa an toàn (IKE).',
    subtopic: 'Mạng riêng ảo VPN IPsec'
  },
  {
    id: 'HSG_SEC_15',
    group: 'routing-switching-security',
    level: 'VanDung',
    question: 'Tấn công "Man-in-the-Middle" (Người đứng giữa) bằng phương thức ARP Spoofing / ARP Poisoning được thực hiện như thế nào?',
    options: [
      'Kẻ tấn công đứng chen vào giữa hai người đang nói chuyện điện thoại',
      'Kẻ tấn công liên tục gửi các gói tin ARP Reply giả mạo vào mạng LAN, lừa máy nạn nhân rằng địa chỉ MAC của kẻ tấn công chính là địa chỉ MAC của Default Gateway, từ đó hút toàn bộ lưu lượng dữ liệu đi qua máy mình',
      'Kẻ tấn công cắt đứt dây cáp mạng nối vào máy tính',
      'Kẻ tấn công gửi virus làm hỏng card mạng'
    ],
    correctIndex: 1,
    explanation: 'Do giao thức ARP không có cơ chế xác thực nguồn, các máy tính dễ dàng chấp nhận gói ARP Reply giả mạo. Giải pháp: Kích hoạt tính năng DAI (Dynamic ARP Inspection) kết hợp DHCP Snooping trên Switch để ngăn chặn triệt để.',
    subtopic: 'Tấn công ARP Spoofing'
  },
  {
    id: 'HSG_SEC_16',
    group: 'routing-switching-security',
    level: 'VanDungCao',
    question: 'Khi chia sẻ một máy in Canon qua mạng LAN trên Windows 10, kỹ thuật viên cần cấu hình dịch vụ mạng và tường lửa Windows Defender Firewall như thế nào để các máy trạm khác kết nối thông suốt?',
    options: [
      'Tắt hoàn toàn card mạng máy tính',
      'Bật dịch vụ "Print Spooler", chia sẻ máy in trong Devices and Printers, và mở luật cho phép "File and Printer Sharing (SMB-In)" trên tường lửa Windows Firewall profile Private',
      'Xóa bỏ mật khẩu đăng nhập Windows của tất cả các máy trạm',
      'Cài đặt lại toàn bộ hệ điều hành Windows'
    ],
    correctIndex: 1,
    explanation: 'Để chia sẻ máy in qua giao thức SMB, Windows cần dịch vụ Print Spooler chạy và tường lửa phải mở các cổng TCP 139, 445 cho tính năng File and Printer Sharing trong phạm vi mạng nội bộ an toàn (Private Network).',
    subtopic: 'Chia sẻ Máy in qua Mạng'
  },
  {
    id: 'HSG_SEC_17',
    group: 'routing-switching-security',
    level: 'ThongHieu',
    question: 'Dải địa chỉ IPv4 nào sau đây thuộc về không gian địa chỉ riêng (Private IP Address) theo tiêu chuẩn RFC 1918 và KHÔNG được định tuyến trên mạng Internet công cộng?',
    options: [
      '8.8.8.8 đến 8.8.4.4',
      '10.0.0.0/8, 172.16.0.0/12, và 192.168.0.0/16',
      '1.1.1.1 đến 1.0.0.1',
      '203.113.131.0/24'
    ],
    correctIndex: 1,
    explanation: 'RFC 1918 quy định 3 dải địa chỉ Private dành cho mạng gia đình, doanh nghiệp và phòng lab: Lớp A (10.0.0.0/8), Lớp B (172.16.0.0/12 đến 172.31.255.255), Lớp C (192.168.0.0/16).',
    subtopic: 'Địa chỉ Private RFC 1918'
  },
  {
    id: 'HSG_SEC_18',
    group: 'routing-switching-security',
    level: 'VanDung',
    question: 'Để kiểm tra cổng dịch vụ mạng (ví dụ cổng Web 80 hoặc cổng chia sẻ 445) trên một máy chủ từ xa có đang mở hay bị tường lửa chặn, lệnh nào trong PowerShell của Windows 10 là nhanh và chính xác nhất?',
    options: [
      'Lệnh `ping <ip-address>`',
      'Lệnh `Test-NetConnection -ComputerName <ip-address> -Port <port-number>`',
      'Lệnh `ipconfig /all`',
      'Lệnh `hostname`'
    ],
    correctIndex: 1,
    explanation: '`Test-NetConnection` (hoặc viết tắt `tnc`) trong PowerShell thực hiện bắt tay TCP tới đúng cổng dịch vụ chỉ định. Nếu `TcpTestSucceeded: True` chứng tỏ cổng dịch vụ đang mở và tường lửa cho phép thông suốt.',
    subtopic: 'Lệnh Kiểm thử Mạng PowerShell'
  }
];

// Danh sách đề bài chia mạng thực tế cho Module 1 (Subnetting Reflex Trainer)
export interface SubnetProblem {
  id: string;
  department: string;
  teamTarget: string;
  ipInput: string;
  requiredHosts: number;
  cidr: string;
  correctMask: string;
  correctNetwork: string;
  correctFirstHost: string;
  correctLastHost: string;
  correctBroadcast: string;
  magicNumber: number;
  explanationFormula: string;
}

export const SUBNET_PRACTICE_PROBLEMS: SubnetProblem[] = [
  {
    id: 'sp_01',
    department: 'Phòng Kế Toán Doanh Nghiệp',
    teamTarget: '04THA3 - Đội 1 (Ea H\'leo)',
    ipInput: '192.168.10.75/26',
    requiredHosts: 60,
    cidr: '/26',
    correctMask: '255.255.255.192',
    correctNetwork: '192.168.10.64',
    correctFirstHost: '192.168.10.65',
    correctLastHost: '192.168.10.126',
    correctBroadcast: '192.168.10.127',
    magicNumber: 64,
    explanationFormula: 'Prefix /26 mượn 2 bit ở Octet 4 (11000000 = 192). Bước nhảy Magic Number = 256 - 192 = 64. Số 75 thuộc dải [64 đến 127]. Network ID: .64 | First Host: .65 | Last Host: .126 | Broadcast: .127.'
  },
  {
    id: 'sp_02',
    department: 'Ban Giám Đốc & Hội Đồng Quản Trị',
    teamTarget: '04THA3 - Đội 2 (Ea H\'leo)',
    ipInput: '172.16.20.45/27',
    requiredHosts: 28,
    cidr: '/27',
    correctMask: '255.255.255.224',
    correctNetwork: '172.16.20.32',
    correctFirstHost: '172.16.20.33',
    correctLastHost: '172.16.20.62',
    correctBroadcast: '172.16.20.63',
    magicNumber: 32,
    explanationFormula: 'Prefix /27 mượn 3 bit ở Octet 4 (11100000 = 224). Bước nhảy Magic Number = 256 - 224 = 32. Số 45 thuộc dải [32 đến 63]. Network ID: .32 | First Host: .33 | Last Host: .62 | Broadcast: .63.'
  },
  {
    id: 'sp_03',
    department: 'Cụm Máy Chủ Server & Máy In Nội Bộ',
    teamTarget: '04THA3 - Đội 3 (Ea H\'leo)',
    ipInput: '10.0.5.18/28',
    requiredHosts: 12,
    cidr: '/28',
    correctMask: '255.255.255.240',
    correctNetwork: '10.0.5.16',
    correctFirstHost: '10.0.5.17',
    correctLastHost: '10.0.5.30',
    correctBroadcast: '10.0.5.31',
    magicNumber: 16,
    explanationFormula: 'Prefix /28 mượn 4 bit ở Octet 4 (11110000 = 240). Bước nhảy Magic Number = 256 - 240 = 16. Số 18 thuộc dải [16 đến 31]. Network ID: .16 | First Host: .17 | Last Host: .30 | Broadcast: .31.'
  },
  {
    id: 'sp_04',
    department: 'Đường Truyền Điểm - Điểm Giữa 2 Router Core',
    teamTarget: '04THA3 - Toàn Đội Tuyển',
    ipInput: '192.168.100.5/30',
    requiredHosts: 2,
    cidr: '/30',
    correctMask: '255.255.255.252',
    correctNetwork: '192.168.100.4',
    correctFirstHost: '192.168.100.5',
    correctLastHost: '192.168.100.6',
    correctBroadcast: '192.168.100.7',
    magicNumber: 4,
    explanationFormula: 'Prefix /30 mượn 6 bit ở Octet 4 (11111100 = 252). Bước nhảy Magic Number = 256 - 252 = 4. Số 5 thuộc dải [4 đến 7]. Network ID: .4 | First Host: .5 | Last Host: .6 | Broadcast: .7 (đúng 2 host cho 2 đầu router).'
  },
  {
    id: 'sp_05',
    department: 'Phòng Kỹ Thuật & Đồ Họa Đa Phương Tiện',
    teamTarget: '04THA3 - Đội 1 (Ea H\'leo)',
    ipInput: '192.168.1.130/25',
    requiredHosts: 120,
    cidr: '/25',
    correctMask: '255.255.255.128',
    correctNetwork: '192.168.1.128',
    correctFirstHost: '192.168.1.129',
    correctLastHost: '192.168.1.254',
    correctBroadcast: '192.168.1.255',
    magicNumber: 128,
    explanationFormula: 'Prefix /25 mượn 1 bit ở Octet 4 (10000000 = 128). Bước nhảy Magic Number = 256 - 128 = 128. Số 130 thuộc dải [128 đến 255]. Network ID: .128 | First Host: .129 | Last Host: .254 | Broadcast: .255.'
  },
  {
    id: 'sp_06',
    department: 'Khu Vực Wi-Fi Khách Vãng Lai (Guest)',
    teamTarget: '04THA3 - Đội 2 (Ea H\'leo)',
    ipInput: '172.16.50.85/26',
    requiredHosts: 50,
    cidr: '/26',
    correctMask: '255.255.255.192',
    correctNetwork: '172.16.50.64',
    correctFirstHost: '172.16.50.65',
    correctLastHost: '172.16.50.126',
    correctBroadcast: '172.16.50.127',
    magicNumber: 64,
    explanationFormula: 'Prefix /26 mượn 2 bit ở Octet 4. Bước nhảy = 64. Số 85 thuộc dải [64-127]. Network ID: .64 | First Host: .65 | Last Host: .126 | Broadcast: .127.'
  }
];
