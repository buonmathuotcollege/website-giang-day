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

// ----------------------------------------------------------------------------
// GIAO DIỆN & DỮ LIỆU THỰC HÀNH TAY NGHỀ HSG (HANDS-ON PRACTICAL LAB)
// ----------------------------------------------------------------------------
export interface HsgPracticalStation {
  id: string;
  stationNumber: number;
  name: string;
  badge: string;
  role: string;
  timeLimit: string;
  points: number;
  objective: string;
  equipment: string[];
  steps: {
    stepNum: number;
    title: string;
    action: string;
    pokaYokeTip: string;
    command?: string;
  }[];
  verificationCriteria: string[];
  penaltyTraps: {
    trap: string;
    penalty: string;
    howToAvoid: string;
  }[];
}

export interface HsgPracticalExam {
  id: string;
  code: string;
  title: string;
  durationMinutes: number;
  targetCompany: string;
  scenarioDescription: string;
  topologySummary: string;
  ipTable: {
    device: string;
    interface: string;
    ipAddress: string;
    subnetMask: string;
    defaultGateway: string;
    note: string;
  }[];
  permissionMatrix?: {
    folder: string;
    group: string;
    sharePerm: string;
    ntfsPerm: string;
  }[];
  taskChecklist: {
    id: string;
    task: string;
    points: number;
    isCritical?: boolean;
  }[];
  troubleshootingTask?: {
    symptom: string;
    rootCause: string;
    solution: string;
    testCommand: string;
  };
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

// ============================================================================
// HỆ THỐNG 4 TRẠM THỰC HÀNH TAY NGHỀ THỰC CHIẾN (HANDS-ON PRACTICAL LAB)
// Trọng tâm cốt lõi của kỳ thi HSG Kỹ năng nghề CNTT
// ============================================================================
export const HSG_PRACTICAL_STATIONS: HsgPracticalStation[] = [
  {
    id: 'station_cabling',
    stationNumber: 1,
    name: 'Cơ Khí & Thi Công Cáp Mạng Gigabit',
    badge: 'HẠ TẦNG CÁP & CƠ KHÍ',
    role: 'Kỹ sư Thi công Cáp (KTV 1)',
    timeLimit: '20 phút',
    points: 25,
    objective: 'Bấm 02 đoạn cáp mạng UTP Cat5e/Cat6 (01 cáp thẳng, 01 cáp chéo), đảm bảo thông mạch 8/8 sợi và đạt tốc độ kết nối Gigabit 1000 Mbps khi cắm Switch.',
    equipment: [
      'Kìm bấm mạng RJ45 đa năng có cữ tước vỏ',
      'Máy test cáp mạng LCD/LED chuyên dụng',
      'Cáp mạng UTP Cat5e/Cat6 đồng nguyên chất',
      'Hạt mạng RJ45 chân đồng mạ vàng + đầu chụp boot cao su',
      'Dao cắt tuốt vỏ cáp mạng xoay tròn'
    ],
    steps: [
      {
        stepNum: 1,
        title: 'Tuốt vỏ & Sắp xếp chuẩn màu TIA/EIA-568B',
        action: 'Tuốt vỏ cáp khoảng 2.5 - 3cm. Tách 4 cặp xoắn, vuốt thẳng từng sợi theo đúng thứ tự chuẩn B: Cam trắng, Cam, Xanh lá trắng, Xanh dương, Xanh dương trắng, Xanh lá, Nâu trắng, Nâu.',
        pokaYokeTip: 'Cặp Xanh lá bị tách đôi để kẹp ôm lấy cặp Xanh dương ở chân 4-5. Chân 1, 2, 3, 6 là 4 sợi truyền tín hiệu sống còn.',
      },
      {
        stepNum: 2,
        title: 'Cắt gọt & Canh độ sâu ngậm vỏ',
        action: 'Xếp các sợi thật phẳng và sát nhau, dùng lưỡi dao kìm cắt bằng một góc vuông 90 độ, chừa lại độ dài lõi khoảng 1.2 - 1.4cm.',
        pokaYokeTip: 'Vỏ bọc nhựa cáp bắt buộc phải chui sâu qua ngàm giữ của hạt mạng ít nhất 5mm để chống giật đứt khi kéo căng.',
      },
      {
        stepNum: 3,
        title: 'Bấm dập chốt tiếp xúc & Kiểm tra bằng máy test',
        action: 'Đút thẳng các sợi vào rãnh hạt RJ45, ép kìm dứt khoát 1 lực đủ sâu. Đưa 2 đầu vào máy test cáp và bật nguồn kiểm tra.',
        pokaYokeTip: 'Đèn LED máy test phải nhảy tuần tự từ 1 đến 8 (Cáp thẳng: 1-1, 2-2... 8-8; Cáp chéo: 1-3, 2-6, 3-1, 6-2). Bất kỳ đèn nào không sáng là mất điểm.',
        command: 'Quan sát đèn LED máy test: 1 2 3 4 5 6 7 8 (Đạt chuẩn 8/8)'
      },
      {
        stepNum: 4,
        title: 'Cắm liên kết Switch & Xác thực Gigabit trên Windows 10',
        action: 'Cắm cáp nối từ Card mạng máy PC vào cổng Switch Gigabit phòng lab. Mở Task Manager hoặc Network Status trên Win 10 để đọc tốc độ Link Speed.',
        pokaYokeTip: 'Nếu Taskbar chỉ hiện "Speed: 100 Mbps", nghĩa là đã tuột hoặc đứt một trong các chân 4, 5, 7, 8. Phải cắt bấm lại ngay lập tức!',
        command: 'netsh interface show interface & Get-NetAdapter | Select Name, LinkSpeed'
      }
    ],
    verificationCriteria: [
      'Máy test cáp mạng sáng đủ 8/8 đèn LED tuần tự không nhảy loạn.',
      'Windows 10 hiển thị Link Speed: 1.0 Gbps (1000/1000 Mbps).',
      'Đầu hạt mạng ngậm sâu vỏ bọc > 5mm, bấm chụp boot cao su gọn gàng.',
      'Không để rơi mẩu dây vụn ra sàn phòng máy (tiêu chuẩn 5S).'
    ],
    penaltyTraps: [
      {
        trap: 'Tốc độ chỉ nhận 100 Mbps thay vì 1000 Mbps (Gigabit)',
        penalty: 'Trừ 8 điểm (Chỉ được điểm thông mạch cơ bản)',
        howToAvoid: 'Bấm dập kìm thật đều lực, kiểm tra chân số 4, 5, 7, 8 chạm kẹp chặt vào lõi đồng.'
      },
      {
        trap: 'Vỏ bọc tuột ngoài hạt mạng, hở lõi đồng bên ngoài',
        penalty: 'Trừ 5 điểm thẩm mỹ & cơ khí',
        howToAvoid: 'Cắt dây chừa lõi 1.3cm để vỏ bọc chui qua gờ chốt nhựa trong hạt RJ45.'
      },
      {
        trap: 'Đứt hoặc chạm chéo chân 1, 2 hoặc 3, 6',
        penalty: '0 điểm toàn bộ sợi cáp (Điểm liệt thông mạng)',
        howToAvoid: 'Soi kỹ mặt trên của hạt RJ45 trước khi bấm xem 8 đầu đồng đã chạm kịch mũi hạt chưa.'
      }
    ]
  },
  {
    id: 'station_windows_sys',
    stationNumber: 2,
    name: 'Quản Trị Windows 10 & Dịch Vụ Mạng LAN',
    badge: 'QUẢN TRỊ HỆ THỐNG',
    role: 'Kỹ sư Windows & Hệ thống (KTV 2)',
    timeLimit: '35 phút',
    points: 30,
    objective: 'Cấu hình hoàn chỉnh Windows 10: Đặt IP tĩnh, đổi Computer Name/Workgroup, quản lý tài khoản người dùng cục bộ, thiết lập ma trận bảo mật chia sẻ thư mục NTFS/Share và kết nối in ấn qua mạng LAN.',
    equipment: [
      'Máy trạm PC chạy Windows 10 Pro 64-bit chuẩn phòng lab',
      'Máy in mạng (Network Printer hoặc máy in chia sẻ qua USB)',
      'Tài liệu ma trận phân quyền phòng ban do Giám khảo cung cấp',
      'USB cài đặt Driver máy in chuyên dụng'
    ],
    steps: [
      {
        stepNum: 1,
        title: 'Định danh máy trạm & Thiết lập IP tĩnh (ncpa.cpl)',
        action: 'Nhấn Windows+R, gõ ncpa.cpl. Chọn card mạng Ethernet ➔ Properties ➔ Internet Protocol Version 4 (TCP/IPv4). Đặt IP tĩnh, Subnet Mask, Gateway và DNS theo đề thi.',
        pokaYokeTip: 'DNS 1 đặt về Default Gateway hoặc 8.8.8.8; DNS 2 đặt 1.1.1.1. Tắt IPv6 nếu đề bài yêu cầu tối ưu dải mạng.',
        command: 'ncpa.cpl && sysdm.cpl (Đặt Computer Name: PC-KTV-01, Workgroup: EAHLEO-LAB)'
      },
      {
        stepNum: 2,
        title: 'Tạo tài khoản người dùng cục bộ (lusrmgr.msc)',
        action: 'Nhấn Windows+R, gõ lusrmgr.msc. Vào mục Users ➔ Tạo các User tương ứng với phòng ban (Ví dụ: user_giamdoc, user_ketoan). Bỏ tick "User must change password", tick "Password never expires".',
        pokaYokeTip: 'Không dùng tài khoản Administrator mặc định để làm việc hàng ngày. Đặt mật khẩu phức tạp gồm chữ hoa, chữ thường và số.',
        command: 'net user user_ketoan P@ssw0rd2026 /add'
      },
      {
        stepNum: 3,
        title: 'Thiết lập thư mục dùng chung & Ma trận phân quyền NTFS',
        action: 'Tạo thư mục D:\\DU_LIEU_CONG_TY. Chuột phải ➔ Properties: Tab Sharing (Share Permissions) cấp Change/Read; Tab Security (NTFS Permissions) gán quyền chi tiết từng User.',
        pokaYokeTip: 'TUYỆT ĐỐI KHÔNG để Everyone Full Control. Nhóm Kế toán chỉ cấp Read/List; Giám đốc cấp Modify/Write. Xóa quyền thừa của nhóm Users.',
        command: 'icacls "D:\\DU_LIEU_CONG_TY" /grant:r user_giamdoc:(OI)(CI)M'
      },
      {
        stepNum: 4,
        title: 'Bật tính năng chia sẻ máy in & Kết nối từ máy trạm 2',
        action: 'Mở Control Panel ➔ Devices and Printers ➔ Chuột phải máy in chọn Printer properties ➔ Tab Sharing ➔ Tick "Share this printer". Từ máy trạm thứ hai, nhấn Windows+R gõ \\\\IP_May_Chu để kết nối in thử.',
        pokaYokeTip: 'Bắt buộc mở Network and Sharing Center ➔ Turn on file and printer sharing, Turn off password protected sharing nếu đề cho phép.',
        command: 'control printers && net start spooler'
      }
    ],
    verificationCriteria: [
      'Lệnh ipconfig /all hiển thị đúng IP, Subnet, Gateway, DNS và Computer Name.',
      'Từ máy thứ 2 truy cập \\\\IP_May_Chu đăng nhập đúng User và thấy thư mục chia sẻ.',
      'User Kế toán mở được file nhưng không xóa được; User Giám đốc sửa và tạo file mới thành công.',
      'In thử bản Windows Printer Test Page thành công từ máy trạm qua mạng LAN.'
    ],
    penaltyTraps: [
      {
        trap: 'Để quyền Everyone - Full Control ở tab Sharing và Security',
        penalty: 'Trừ 10 điểm (Vi phạm nghiêm trọng an toàn bảo mật)',
        howToAvoid: 'Luôn xóa Everyone, chỉ add cụ thể nhóm hoặc User có thẩm quyền.'
      },
      {
        trap: 'Tường lửa Windows Defender Firewall chặn chia sẻ file (SMB Port 445)',
        penalty: 'Trừ 6 điểm do máy trạm khác không truy cập được',
        howToAvoid: 'Bật rule "File and Printer Sharing (SMB-In)" trong Windows Firewall with Advanced Security.'
      },
      {
        trap: 'Quên khởi động dịch vụ Print Spooler khiến máy in bị đơ hàng đợi',
        penalty: 'Trừ 4 điểm',
        howToAvoid: 'Chạy lệnh net start spooler trong CMD quyền Admin trước khi test in.'
      }
    ]
  },
  {
    id: 'station_network_devices',
    stationNumber: 3,
    name: 'Cấu Hình Thiết Bị Mạng & Wi-Fi Doanh Nghiệp',
    badge: 'THIẾT BỊ MẠNG & ROUTER',
    role: 'Kỹ sư Mạng & Bảo mật (KTV 3)',
    timeLimit: '25 phút',
    points: 25,
    objective: 'Cấu hình hoàn chỉnh Router/Access Point: Đổi mật khẩu quản trị, thiết lập mạng LAN/WAN, cấu hình DHCP Server Pool có Reservation, phát 2 SSID (Nội bộ & Khách) có cô lập AP Isolation.',
    equipment: [
      'Thiết bị Wi-Fi Router băng tần kép (Gigabit WAN/LAN ports)',
      'Switch mạng 8/16 ports chuẩn Gigabit',
      'Laptop hoặc PC kết nối trực tiếp cổng LAN Router',
      'Phần mềm mô phỏng Cisco Packet Tracer (cho phần định tuyến VLAN)'
    ],
    steps: [
      {
        stepNum: 1,
        title: 'Truy cập Web GUI & Đổi mật khẩu quản trị Router',
        action: 'Mở trình duyệt, truy cập 192.168.1.1 (hoặc Default Gateway). Đăng nhập bằng tài khoản mặc định. Vào mục Quản trị hệ thống (Administration/System Tools) đổi mật khẩu admin mới.',
        pokaYokeTip: 'Không bao giờ để mật khẩu mặc định admin/admin. Sau khi đổi, đăng xuất và đăng nhập lại bằng mật khẩu mới để kiểm tra.',
      },
      {
        stepNum: 2,
        title: 'Quy hoạch dải IP LAN & Cấu hình DHCP Server Pool',
        action: 'Vào Network ➔ LAN. Đặt địa chỉ IP Router (ví dụ: 192.168.10.1, Subnet Mask: 255.255.255.192 /26). Bật DHCP Server, giới hạn dải cấp phát từ .10 đến .50, Lease Time 120 phút.',
        pokaYokeTip: 'Dành các IP từ .2 đến .9 cho máy in, máy chủ và thiết bị cố định (Static IP range).',
        command: 'DHCP Pool: 192.168.10.10 - 192.168.10.50 | Gateway: 192.168.10.1 | DNS: 8.8.8.8'
      },
      {
        stepNum: 3,
        title: 'Gán địa chỉ IP cố định theo MAC (DHCP Address Reservation)',
        action: 'Tìm mục DHCP Reservation / Static Lease. Nhập địa chỉ MAC của Máy in mạng và gán cố định cho nó địa chỉ 192.168.10.5.',
        pokaYokeTip: 'Nhờ có Reservation, máy in sẽ không bao giờ bị đổi IP khi tắt mở nguồn, tránh tình trạng rớt kết nối in ấn.',
        command: 'getmac /v (Xem địa chỉ MAC card mạng)'
      },
      {
        stepNum: 4,
        title: 'Cấu hình Wi-Fi Doanh Nghiệp & Cách ly mạng khách (AP Isolation)',
        action: 'Thiết lập SSID 1: "DOANH_NGHIEP_NOI_BO" chuẩn bảo mật WPA2-Personal (AES). Thiết lập SSID 2: "KHACH_HANG_GUEST" và BẬT tính năng AP Isolation (Guest Isolation).',
        pokaYokeTip: 'AP Isolation ngăn các thiết bị khách bắt sóng Wi-Fi quét dòm ngó dữ liệu hoặc gửi gói tin tấn công vào máy trạm kế toán nội bộ.',
      }
    ],
    verificationCriteria: [
      'Đăng nhập Router thành công bằng mật khẩu quản trị mới, chặn truy cập admin cũ.',
      'Máy trạm cắm cổng LAN nhận đúng dải IP do DHCP cấp (.10 đến .50).',
      'Máy in nhận đúng địa chỉ IP cố định 192.168.10.5 theo địa chỉ MAC.',
      'Thiết bị kết nối Wi-Fi Khách không ping được vào địa chỉ IP của Máy trạm nội bộ.'
    ],
    penaltyTraps: [
      {
        trap: 'Trùng dải IP mạng LAN của Router với dải IP modem cấp cổng WAN',
        penalty: 'Trừ 8 điểm (Gây xung đột IP toàn mạng, mất kết nối Internet)',
        howToAvoid: 'Nếu cổng WAN nhận 192.168.1.x thì mạng LAN Router phải đổi sang 192.168.10.x hoặc 172.16.x.x.'
      },
      {
        trap: 'Không bật tính năng AP Isolation trên mạng Wi-Fi Khách',
        penalty: 'Trừ 5 điểm an ninh mạng',
        howToAvoid: 'Kiểm tra kỹ dấu tick "Enable AP Isolation" hoặc "Allow guests to access my local network = Disabled".'
      },
      {
        trap: 'Quên nhấn nút "Save / Apply" sau khi đổi cấu hình DHCP',
        penalty: 'Trừ 3 điểm',
        howToAvoid: 'Reboot Router nhẹ nhàng sau khi Save và kiểm tra card mạng PC có renew được IP mới không.'
      }
    ]
  },
  {
    id: 'station_troubleshooting_audit',
    stationNumber: 4,
    name: 'Bắt Pan Bệnh Sự Cố Mạng & Nghiệm Thu Hệ Thống',
    badge: 'XỬ LÝ SỰ CỐ & NGHIỆM THU',
    role: 'Toàn Đội & Kỹ sư Trưởng (Lead KTV)',
    timeLimit: '20 phút',
    points: 20,
    objective: 'Sử dụng bộ công cụ dòng lệnh CMD (ping, tracert, ipconfig, arp, netstat) để chẩn đoán và khắc phục 01 pan bệnh thực tế do Giám khảo cài vào; bảo vệ sản phẩm trước Ban Giám khảo.',
    equipment: [
      'Toàn bộ hệ thống liên hoàn đã thi công: PC ↔ Switch ↔ Router ↔ Wi-Fi ↔ Máy in',
      'Bộ tài liệu sơ đồ mạng và biên bản nghiệm thu kỹ thuật',
      'Đồng hồ đếm ngược 05 phút vấn đáp của Ban Giám khảo'
    ],
    steps: [
      {
        stepNum: 1,
        title: 'Chẩn đoán phân tầng OSI bằng bộ lệnh CMD chuẩn',
        action: 'Mở cmd.exe trên Windows 10. Gõ ipconfig /all để kiểm tra tầng 3. Gõ ping 127.0.0.1 (kiểm tra card mạng nội tại) ➔ ping Default Gateway ➔ ping 8.8.8.8 ➔ ping google.com.',
        pokaYokeTip: 'Nếu ping 8.8.8.8 được nhưng ping google.com báo lỗi ➔ Hỏng dịch vụ DNS. Nếu ping Gateway không được ➔ Lỗi cáp hoặc sai Subnet Mask.',
        command: 'ping 127.0.0.1 && ping 192.168.10.1 && nslookup google.com'
      },
      {
        stepNum: 2,
        title: 'Định vị và giải quyết pan bệnh thực tế của Giám khảo',
        action: 'Xác định nhanh 1 trong các pan bệnh kinh điển: Cáp mạng bị đứt ngầm sợi 1-2-3-6; địa chỉ IP bị gán trùng (IP Conflict); cổng dịch vụ Print Spooler bị dừng; Windows Firewall chặn ICMP.',
        pokaYokeTip: 'Bình tĩnh kiểm tra đèn cổng Switch trước tiên (Tầng 1 Vật lý) ➔ Kiểm tra IP (Tầng 3) ➔ Kiểm tra Firewall & Dịch vụ (Tầng 7).',
        command: 'arp -a & netstat -ano | findstr 445'
      },
      {
        stepNum: 3,
        title: 'Đo kiểm thông mạng 100% không rớt gói (0% Packet Loss)',
        action: 'Thực hiện lệnh ping -n 20 từ máy trạm đến các điểm trọng yếu: Router, Máy trạm thứ 2, Máy in. Xác nhận 20/20 gói tin phản hồi thành công, độ trễ < 2ms.',
        pokaYokeTip: 'Chụp ảnh màn hình cửa sổ ping sạch gói tin làm bằng chứng nghiệm thu kỹ thuật.',
        command: 'ping -n 20 192.168.10.1 && ping -n 20 192.168.10.5'
      },
      {
        stepNum: 4,
        title: 'Bảo vệ đồ án & Trả lời vấn đáp 05 phút trước Ban Giám khảo',
        action: 'Kỹ sư trưởng thuyết minh ngắn gọn về: Sơ đồ Topo, giải pháp chia IP VLSM tiết kiệm, chính sách phân quyền thư mục kế toán bảo mật và giải thích cách khắc phục pan bệnh vừa qua.',
        pokaYokeTip: 'Tác phong tự tin, xưng hô chuẩn KTV, giải thích nguyên lý mạch lạc (RAM = mặt bàn học, Switch = bùng binh giao thông, IP = số nhà).',
      }
    ],
    verificationCriteria: [
      'Hệ thống mạng chạy ổn định, lệnh ping 20 gói đạt 0% Packet Loss.',
      'Bắt trúng pan bệnh và khắc phục trong thời gian dưới 10 phút.',
      'In thử thành công bản nghiệm thu qua mạng LAN.',
      'Trả lời chính xác và tự tin 2/2 câu hỏi vấn đáp chuyên môn của Ban Giám khảo.'
    ],
    penaltyTraps: [
      {
        trap: 'Không dùng lệnh CMD để chẩn đoán mà mò mẫm cắm rút bừa bãi',
        penalty: 'Trừ 5 điểm tác phong kỹ sư',
        howToAvoid: 'Luôn mở CMD gõ ipconfig và ping để khoanh vùng sự cố theo thứ tự phân tầng OSI.'
      },
      {
        trap: 'Lệnh ping chập chờn, rớt gói tin (> 5% Loss)',
        penalty: 'Trừ 6 điểm độ ổn định hệ thống',
        howToAvoid: 'Kiểm tra lại đầu cáp bấm lỏng chân hoặc cáp đi ngang qua nguồn điện 220V gây nhiễu điện từ.'
      },
      {
        trap: 'Nói ấp úng, không giải thích được ý nghĩa dải Subnet Mask /26 hay /27',
        penalty: 'Trừ 4 điểm phần vấn đáp',
        howToAvoid: 'Nắm chắc công thức Magic Number = 256 - Subnet Mask để trả lời nhanh trong 3 giây.'
      }
    ]
  }
];

// ============================================================================
// BỘ 4 ĐỀ THI THỰC HÀNH TỔNG HỢP SA BÀN HSG (PRACTICAL EXAM SCENARIOS)
// Mô phỏng chuẩn 100% đề thi tay nghề cấp trường & khu vực
// ============================================================================
export const HSG_PRACTICAL_EXAMS: HsgPracticalExam[] = [
  {
    id: 'exam_hsg_01',
    code: 'ĐỀ THI 01',
    title: 'Thi Công Mạng Văn Phòng Doanh Nghiệp Vận Tải (Cơ Sở Ea H\'leo)',
    durationMinutes: 90,
    targetCompany: 'Công ty TNHH Vận tải & Logistics Ea H\'leo',
    scenarioDescription: 'Doanh nghiệp vận tải có trụ sở 2 tầng gồm 3 bộ phận: Ban Giám Đốc (4 máy), Phòng Kế Toán & Điều Vận (25 máy), Khu Vực Chờ Của Tài Xế & Khách Hàng (Wi-Fi 30 máy). Yêu cầu thi công tuyến cáp Gigabit, chia mạng con dải 192.168.10.0/24 tiết kiệm IP, thiết lập máy chủ tệp tin nội bộ bảo mật cao và phát Wi-Fi khách cách ly hoàn toàn.',
    topologySummary: 'Internet ➔ Router Cân Bằng Tải ➔ Switch Gigabit Core ➔ PC Giám Đốc, PC Kế Toán, Máy In Mạng, Wi-Fi AP Khách.',
    ipTable: [
      { device: 'Router Core', interface: 'LAN Port 1', ipAddress: '192.168.10.1', subnetMask: '255.255.255.224 (/27)', defaultGateway: '-', note: 'Cổng Gateway cho Ban Giám Đốc' },
      { device: 'PC Giám Đốc', interface: 'Ethernet', ipAddress: '192.168.10.2', subnetMask: '255.255.255.224 (/27)', defaultGateway: '192.168.10.1', note: 'Toàn quyền truy cập mọi thư mục' },
      { device: 'PC Kế Toán 01', interface: 'Ethernet', ipAddress: '192.168.10.34', subnetMask: '255.255.255.224 (/27)', defaultGateway: '192.168.10.33', note: 'Chỉ đọc và sửa file kế toán' },
      { device: 'Máy In Mạng LAN', interface: 'Ethernet', ipAddress: '192.168.10.35', subnetMask: '255.255.255.224 (/27)', defaultGateway: '192.168.10.33', note: 'Gán DHCP Reservation theo MAC' },
      { device: 'Wi-Fi Khách Vãng Lai', interface: 'WLAN Guest', ipAddress: '192.168.10.65 - .94', subnetMask: '255.255.255.224 (/27)', defaultGateway: '192.168.10.65', note: 'Bật AP Isolation chặn quét mạng nội bộ' }
    ],
    permissionMatrix: [
      { folder: 'D:\\HOP_DONG_KINH_DOANH', group: 'GiamDoc', sharePerm: 'Full Control', ntfsPerm: 'Full Control (Toàn quyền)' },
      { folder: 'D:\\HOP_DONG_KINH_DOANH', group: 'KeToan', sharePerm: 'Change / Read', ntfsPerm: 'Read & Execute (Chỉ đọc hợp đồng)' },
      { folder: 'D:\\SO_QUY_TIEN_MAT', group: 'KeToan', sharePerm: 'Change / Read', ntfsPerm: 'Modify (Sửa và nhập phiếu thu chi)' },
      { folder: 'D:\\SO_QUY_TIEN_MAT', group: 'Users Khac', sharePerm: 'No Access', ntfsPerm: 'Deny All (Cấm tuyệt đối)' }
    ],
    taskChecklist: [
      { id: 't1_cable', task: 'Bấm 02 đoạn cáp mạng Cat6 chuẩn B, test 8/8 LED, cắm Switch nhận Gigabit 1000 Mbps.', points: 25, isCritical: true },
      { id: 't1_vlsm', task: 'Quy hoạch dải IP 3 phòng ban theo phương pháp VLSM không trùng dải, ghi chú vào bảng IP.', points: 15 },
      { id: 't1_win10', task: 'Cài đặt IP tĩnh Windows 10, Computer Name PC-EAHLEO-01, Workgroup LOGISTICS.', points: 15 },
      { id: 't1_ntfs', task: 'Tạo thư mục chia sẻ, phân quyền NTFS chuẩn ma trận bảo mật, cấm triệt để Everyone.', points: 20, isCritical: true },
      { id: 't1_wifi', task: 'Đổi mật khẩu admin Router, cấu hình 2 SSID, bật AP Isolation cho mạng Wi-Fi Khách.', points: 15 },
      { id: 't1_test', task: 'Đo kiểm lệnh ping 20 gói đạt 0% Packet Loss và in thử thành công bản Test Page qua mạng.', points: 10, isCritical: true }
    ],
    troubleshootingTask: {
      symptom: 'Máy trạm Kế Toán cắm cáp nhưng đèn cổng mạng trên Switch chỉ sáng màu Cam, Windows báo tốc độ Link Speed: 100 Mbps thay vì 1.0 Gbps.',
      rootCause: 'Sợi cáp mạng bị tuột hoặc ép chưa ngậm sâu ở chân số 4 và 5, khiến hệ thống tự động hạ chuẩn từ Gigabit xuống Fast Ethernet.',
      solution: 'Dùng kìm cắt bỏ hạt mạng cũ, tuốt vỏ cáp chừa lõi 1.3cm, vuốt thẳng 8 sợi chuẩn B và bấm dập đều lực để ngậm tiếp xúc 8/8 sợi đồng.',
      testCommand: 'powershell "Get-NetAdapter | Select Name, LinkSpeed, Status"'
    }
  },
  {
    id: 'exam_hsg_02',
    code: 'ĐỀ THI 02',
    title: 'Hạ Tầng Mạng Chi Nhánh Ngân Hàng & Phân Tách Mạng Bảo Mật',
    durationMinutes: 90,
    targetCompany: 'Phòng Giao Dịch Ngân Hàng TMCP Chi Nhánh Ea H\'leo',
    scenarioDescription: 'Thiết kế và triển khai mạng nội bộ cho Phòng Giao Dịch Ngân Hàng gồm: Quầy Giao Dịch Viên (12 máy), Phòng Giám Đốc (3 máy), Hệ Thống ATM & Máy Chủ Giao Dịch (4 thiết bị). Đòi hỏi tính bảo mật cực cao, các máy giao dịch viên không được phép truy cập vào vùng máy chủ lõi, đường truyền dự phòng và mã hóa dữ liệu đường truyền.',
    topologySummary: 'Router Gateway Firewall ➔ Switch Managed ➔ VLAN 10 (Giao Dịch Viên), VLAN 20 (Giám Đốc), VLAN 30 (Máy Chủ Core Banking).',
    ipTable: [
      { device: 'Router Gateway', interface: 'VLAN 10 Sub', ipAddress: '172.16.1.1', subnetMask: '255.255.255.240 (/28)', defaultGateway: '-', note: 'Gateway VLAN 10 Giao Dịch Viên' },
      { device: 'Router Gateway', interface: 'VLAN 20 Sub', ipAddress: '172.16.1.17', subnetMask: '255.255.255.240 (/28)', defaultGateway: '-', note: 'Gateway VLAN 20 Giám Đốc' },
      { device: 'PC Giao Dịch 01', interface: 'Ethernet', ipAddress: '172.16.1.2', subnetMask: '255.255.255.240 (/28)', defaultGateway: '172.16.1.1', note: 'Chỉ truy cập cổng thanh toán nội bộ' },
      { device: 'Máy In Hóa Đơn Kim', interface: 'Print Server', ipAddress: '172.16.1.3', subnetMask: '255.255.255.240 (/28)', defaultGateway: '172.16.1.1', note: 'Chia sẻ cho cả quầy giao dịch' }
    ],
    taskChecklist: [
      { id: 't2_cable', task: 'Bấm cáp mạng UTP Cat6 Gigabit chuẩn B, đo kiểm 8/8 sợi thông suốt, bọc nẹp thẩm mỹ.', points: 25, isCritical: true },
      { id: 't2_ip_plan', task: 'Thiết lập dải địa chỉ IP theo chuẩn RFC 1918 Class B (172.16.x.x) tối ưu Subnet /28.', points: 15 },
      { id: 't2_win_sec', task: 'Cấu hình Windows 10: Tắt chia sẻ không mật khẩu, kích hoạt tường lửa mở cổng port 445 cho SMB.', points: 20 },
      { id: 't2_ntfs_bank', task: 'Thiết lập cây thư mục CHUNG_TU_NGAN_HANG với quyền Modify cho Giám Đốc và Read-Only cho nhân viên.', points: 20, isCritical: true },
      { id: 't2_print_share', task: 'Cài đặt Driver và chia sẻ máy in qua địa chỉ IP tĩnh cố định, in thành công trang thử nghiệm.', points: 10 },
      { id: 't2_defense', task: 'Bảo vệ phương án an ninh mạng chống nghe lén gói tin trước Hội đồng Giám khảo.', points: 10 }
    ],
    troubleshootingTask: {
      symptom: 'Các máy giao dịch viên không ping được đến máy in hóa đơn mặc dù cả hai thiết bị đều sáng đèn liên kết cổng mạng.',
      rootCause: 'Máy in bị đặt sai Default Gateway (đặt sang dải IP của VLAN 20 thay vì VLAN 10), khiến gói tin phản hồi ICMP bị định tuyến lạc đường.',
      solution: 'Truy cập trang Web cấu hình card mạng máy in, chỉnh lại Default Gateway về đúng IP 172.16.1.1.',
      testCommand: 'tracert 172.16.1.3'
    }
  },
  {
    id: 'exam_hsg_03',
    code: 'ĐỀ THI 03',
    title: 'Phòng Máy Tính Thực Hành & Quản Trị Máy Chủ File Server Nội Bộ',
    durationMinutes: 90,
    targetCompany: 'Phòng Lab Kỹ Thuật Máy Tính & Mạng Nội Bộ (Trạm Thực Nghiệm)',
    scenarioDescription: 'Thiết lập hoàn thiện 01 cụm thực hành gồm Máy Chủ File Server (Windows 10 Pro) và các Máy Trạm KTV: Phân vùng ổ cứng SSD 256GB theo chuẩn UEFI/GPT (ổ C cài HĐH, ổ D chứa dữ liệu), cấu hình IP tĩnh, chia sẻ kho thư mục phần mềm kỹ thuật dung lượng lớn và chia sẻ máy in đa chức năng qua giao thức SMB.',
    topologySummary: 'Máy Chủ File Server ↔ Switch Gigabit 24 Port ↔ Bàn Kỹ Thuật KTV 1, KTV 2, KTV 3 + Máy In LAN.',
    ipTable: [
      { device: 'Máy Chủ File Server', interface: 'Ethernet 1', ipAddress: '192.168.1.10', subnetMask: '255.255.255.0 (/24)', defaultGateway: '192.168.1.1', note: 'Chứa kho phần mềm cài đặt ISO' },
      { device: 'Máy Trạm KTV 01', interface: 'Ethernet', ipAddress: '192.168.1.11', subnetMask: '255.255.255.0 (/24)', defaultGateway: '192.168.1.1', note: 'Bàn thao tác chính tháo lắp' },
      { device: 'Máy Trạm KTV 02', interface: 'Ethernet', ipAddress: '192.168.1.12', subnetMask: '255.255.255.0 (/24)', defaultGateway: '192.168.1.1', note: 'Bàn kiểm soát an toàn Poka-Yoke' },
      { device: 'Máy In Đa Năng LAN', interface: 'Ethernet', ipAddress: '192.168.1.50', subnetMask: '255.255.255.0 (/24)', defaultGateway: '192.168.1.1', note: 'In biên bản nghiệm thu KTV 3' }
    ],
    taskChecklist: [
      { id: 't3_cable', task: 'Bấm cáp mạng Cat5e/Cat6 chiều dài 2 mét, thông mạch 8/8 sợi, Link Speed 1.0 Gbps.', points: 25, isCritical: true },
      { id: 't3_storage', task: 'Khởi tạo ổ đĩa SSD chuẩn GPT, định dạng NTFS phân vùng DATA D: kích thước Allocation Unit 4KB.', points: 15 },
      { id: 't3_server_setup', task: 'Đặt IP tĩnh cho File Server, kích hoạt dịch vụ Computer Browser, SMBDirect và Network Discovery.', points: 20 },
      { id: 't3_share_matrix', task: 'Tạo thư mục KHO_PHAN_MEM, cấp quyền Modify cho tài khoản KTV, cấp quyền Read-Only cho tài khoản Guest.', points: 20, isCritical: true },
      { id: 't3_printer', task: 'Chia sẻ máy in, cấu hình Client kết nối in test và lưu file log in ấn.', points: 10 },
      { id: 't3_5s', task: 'Dọn dẹp bàn kỹ thuật phòng lab, sắp xếp dây gọn gàng đạt chuẩn 5S công nghiệp.', points: 10 }
    ],
    troubleshootingTask: {
      symptom: 'Từ máy KTV truy cập vào \\\\192.168.1.10 bị báo lỗi: "The network path was not found (Error code: 0x80070035)".',
      rootCause: 'Tính năng Network Discovery và File and Printer Sharing đang bị tắt ở chế độ mạng Public Network trên File Server.',
      solution: 'Mở Network and Sharing Center, chuyển chế độ mạng sang Private Network và bật On cho cả hai tính năng trên.',
      testCommand: 'net view \\\\192.168.1.10'
    }
  },
  {
    id: 'exam_hsg_04',
    code: 'ĐỀ THI 04',
    title: 'Khắc Phục Sự Cố Mạng Mất Kết Nối Diện Rộng & Phục Hồi Gigabit',
    durationMinutes: 90,
    targetCompany: 'Trụ Sở Cơ Quan Hành Chính & Dịch Vụ Công',
    scenarioDescription: 'Hệ thống mạng cơ quan bất ngờ bị ngắt quãng liên tục: Một số phòng ban không vào được mạng nội bộ, máy in chia sẻ bị offline và một đường cáp chính bị sụt tốc độ nghiêm trọng từ Gigabit xuống 100 Mbps. Đội thi đóng vai trò Đội Phản Ứng Nhanh (Incident Response Team) đến hiện trường khám lỗi, xử lý 3 pan bệnh ẩn và bàn giao hệ thống đạt 100% chỉ số kỹ thuật.',
    topologySummary: 'Router Core ➔ Switch Trung Tâm ➔ 3 Nhánh Mạng: Phòng Tiếp Dân, Phòng Lưu Trữ Hồ Sơ, Phòng Công Nghệ.',
    ipTable: [
      { device: 'Router Core', interface: 'LAN Port 1', ipAddress: '10.10.1.1', subnetMask: '255.255.255.192 (/26)', defaultGateway: '-', note: 'Dải mạng công cộng 62 host' },
      { device: 'PC Tiếp Dân 01', interface: 'Ethernet', ipAddress: '10.10.1.10', subnetMask: '255.255.255.192 (/26)', defaultGateway: '10.10.1.1', note: 'Bị lỗi trùng IP với máy khác' },
      { device: 'PC Lưu Trữ 01', interface: 'Ethernet', ipAddress: '10.10.1.15', subnetMask: '255.255.255.192 (/26)', defaultGateway: '10.10.1.1', note: 'Bị lỗi đứt cáp hạ tốc độ' },
      { device: 'Máy In Hồ Sơ Tự Động', interface: 'Ethernet', ipAddress: '10.10.1.20', subnetMask: '255.255.255.192 (/26)', defaultGateway: '10.10.1.1', note: 'Bị dừng dịch vụ Spooler' }
    ],
    taskChecklist: [
      { id: 't4_cable_diag', task: 'Dùng máy test phát hiện đầu cáp bị đứt sợi, cắt và bấm lại đầu cáp đạt chuẩn Gigabit 1000 Mbps.', points: 25, isCritical: true },
      { id: 't4_arp_conflict', task: 'Dùng lệnh arp -a và xem Windows System Event Log để bắt lỗi trùng địa chỉ IP (IP Address Conflict).', points: 20 },
      { id: 't4_spooler_fix', task: 'Xử lý lỗi hàng đợi in bị tắc nghẽn, xóa file rác trong System32\\spool\\PRINTERS và start lại Spooler.', points: 15 },
      { id: 't4_security_audit', task: 'Kiểm tra và siết lại quyền truy cập thư mục HỒ SƠ LƯU TRỮ, xóa bỏ các User lạ không rõ nguồn gốc.', points: 20, isCritical: true },
      { id: 't4_ping_cert', task: 'Chạy script đo kiểm ping -n 30 chứng minh 0% rớt gói tin và độ trễ trung bình < 1ms.', points: 10, isCritical: true },
      { id: 't4_report', task: 'Lập Biên Bản Sự Cố Kỹ Thuật (Incident Report) ghi rõ Nguyên nhân, Hậu quả và Biện pháp phòng ngừa Poka-Yoke.', points: 10 }
    ],
    troubleshootingTask: {
      symptom: 'Màn hình góc phải Windows xuất hiện tam giác vàng chấm than: "There is an IP address conflict with another system on the network".',
      rootCause: 'KTV trước đó đã gán tĩnh địa chỉ 10.10.1.10 cho máy in nhưng đồng thời DHCP Pool trên Router lại chưa trừ địa chỉ này ra, khiến PC Tiếp Dân nhận trùng IP.',
      solution: 'Vào Router thêm IP 10.10.1.10 vào dải DHCP Exclusion hoặc gán Reservation cố định cho máy in; trên PC gõ ipconfig /renew.',
      testCommand: 'arp -a & ipconfig /renew'
    }
  }
];

// ============================================================================
// HƯỚNG DẪN CÀI ĐẶT WINDOWS 10 CÁC DÒNG MAINBOARD PHỔ BIẾN CHO THI HSG
// ============================================================================

export interface HsgMainboardBootGuide {
  id: string;
  brand: string;
  series: string;
  marketSegment: string;
  bootKey: string;
  biosKey: string;
  saveExitKey: string;
  biosMode: string;
  badgeColor: string;
  uefiSettings: {
    setting: string;
    value: string;
    why: string;
  }[];
  bootSteps: {
    step: number;
    title: string;
    detail: string;
  }[];
  commonTraps: {
    trap: string;
    cause: string;
    fix: string;
  }[];
  vmdWarning?: string;
  imageSrc?: string;
}

export interface HsgWin10InstallStep {
  stepNum: number;
  title: string;
  badge: string;
  action: string;
  pokaYokeAlert: string;
  checklist: string[];
  imageSrc?: string;
}

export const HSG_MAINBOARD_BOOT_GUIDES: HsgMainboardBootGuide[] = [
  {
    id: 'main_asus',
    brand: 'ASUS',
    series: 'Dòng H510 / H610 / B560 / B760 (Prime & TUF Gaming)',
    marketSegment: 'Phổ thông phòng máy thực hành & Gaming tầm trung',
    bootKey: 'F8',
    biosKey: 'Delete (Del) hoặc F2',
    saveExitKey: 'F10',
    biosMode: 'EZ Mode (F7) & Advanced Mode',
    badgeColor: 'bg-blue-600',
    uefiSettings: [
      { setting: 'Chế độ hiển thị', value: 'Bấm phím F7 sang Advanced Mode', why: 'Mở khóa toàn bộ menu cài đặt chuyên sâu của ASUS UEFI BIOS.' },
      { setting: 'Fast Boot', value: 'Disabled', why: 'Ngăn bo mạch bỏ qua giai đoạn quét cổng USB, giúp nhận diện phím F8 kịp thời.' },
      { setting: 'CSM Support', value: 'Disabled', why: 'Chạy chế độ thuần UEFI GPT, tăng tốc độ khởi động và hỗ trợ chuẩn bảo mật.' },
      { setting: 'VMD Controller', value: 'Disabled (trên Intel Gen 11/12/13)', why: 'Bắt buộc tắt Intel VMD để bộ cài Windows 10 nhận diện ổ SSD NVMe không bị lỗi We couldnt find any drives.' },
      { setting: 'SATA Mode', value: 'AHCI', why: 'Chuẩn giao tiếp tối ưu tốc độ đọc ghi cho ổ SSD SATA III.' }
    ],
    bootSteps: [
      { step: 1, title: 'Cắm USB Boot', detail: 'Cắm USB Boot chuẩn UEFI GPT vào cổng USB 3.0 (màu xanh dương) ở mặt sau bo mạch chủ.' },
      { step: 2, title: 'Bật nguồn & Gọi Boot Menu', detail: 'Nhấp nhả phím F8 liên tục ngay khi đèn bàn phím vừa chớp sáng.' },
      { step: 3, title: 'Chọn dòng UEFI', detail: 'Chọn dòng có tiền tố [UEFI: Tên_USB (Partition 1)], tuyệt đối không chọn dòng Legacy không có chữ UEFI.' },
      { step: 4, title: 'Vào trình cài đặt', detail: 'Màn hình hiện logo Windows 10 với vòng tròn xoay, bắt đầu quá trình phân vùng và cài đặt.' }
    ],
    commonTraps: [
      { trap: 'Bấm nhầm phím F11', cause: 'Thói quen từ mainboard MSI hoặc Winnfox.', fix: 'Main ASUS bắt buộc phím F8. Nếu lỡ vào Windows cũ, khởi động lại và nhấp nhả phím F8.' },
      { trap: 'Không nhìn thấy ổ cứng SSD NVMe khi cài Win', cause: 'Tính năng Intel VMD Controller đang Bật (Enabled) ở bản BIOS xuất xưởng.', fix: 'Vào BIOS (Del/F2) ➔ Advanced ➔ VMD Setup Menu ➔ Đổi Enable VMD Controller thành Disabled ➔ Nhấn F10 lưu lại.' }
    ],
    vmdWarning: 'Trên các dòng bo mạch ASUS chạy chip Intel Gen 11 (H510, B560), nếu không tắt VMD Controller, bộ cài Windows 10 sẽ bắt nạp driver Intel RST Storage.',
    imageSrc: '/images/ol-01/main-asus-h510.jpg'
  },
  {
    id: 'main_msi',
    brand: 'MSI',
    series: 'Dòng H510 / H610 / B660 / B760 (PRO & MAG Mortar/Tomahawk)',
    marketSegment: 'Phòng máy chuẩn CBT & Máy thi tay nghề',
    bootKey: 'F11',
    biosKey: 'Delete (Del)',
    saveExitKey: 'F10',
    biosMode: 'Click BIOS 5 (EZ Mode / Advanced Mode phím F7)',
    badgeColor: 'bg-red-600',
    uefiSettings: [
      { setting: 'Giao diện BIOS', value: 'Bấm F7 để chuyển sang Advanced Mode', why: 'Truy cập vào cây thư mục Settings và Boot chuyên sâu.' },
      { setting: 'BIOS UEFI/CSM Mode', value: 'UEFI', why: 'Khởi động Windows 10 chuẩn GPT, bật Secure Boot và nạp bootmgr siêu tốc.' },
      { setting: 'SATA Mode', value: 'AHCI Mode', why: 'Chuẩn giao tiếp bắt buộc cho các ổ SSD SATA/M.2.' },
      { setting: 'Boot Option Priorities', value: 'Boot Option #1: UEFI USB Hard Disk', why: 'Ưu tiên nạp bootloader từ USB Boot của KTV trước ổ cứng.' }
    ],
    bootSteps: [
      { step: 1, title: 'Kiểm tra cụm EZ Debug LED', detail: 'Bật máy quan sát 4 đèn EZ Debug ở góc trên: CPU ➔ DRAM ➔ VGA ➔ BOOT. Nếu đèn BOOT sáng đứng là máy chưa nhận ổ khởi động.' },
      { step: 2, title: 'Gọi Boot Menu', detail: 'Nhấp nhả phím F11 liên tục ngay khi quạt CPU bắt đầu quay.' },
      { step: 3, title: 'Chọn thiết bị khởi động', detail: 'Dùng phím mũi tên chọn [UEFI: Tên_USB_Boot] và nhấn Enter.' },
      { step: 4, title: 'Nạp bộ cài Win 10', detail: 'Đèn LED trên USB nhấp nháy, màn hình Windows Setup 64-bit xuất hiện.' }
    ],
    commonTraps: [
      { trap: 'Máy không xuất hình khi bật nguồn', cause: 'Cắm nhầm dây HDMI/VGA lên cổng Mainboard thay vì cổng Card đồ họa rời GT 730 (do CPU đuôi F không có iGPU).', fix: 'Chuyển dây màn hình xuống đúng cổng của Card đồ họa NVIDIA GT 730 ở hàng dưới.' },
      { trap: 'Bấm F11 không ăn', cause: 'Bàn phím không dây hoặc cắm cổng USB mặt trước chập chờn.', fix: 'Cắm bàn phím USB có dây vào cổng USB 2.0 (màu đen) ở mặt sau bo mạch chủ.' }
    ],
    imageSrc: '/images/ol-01/main-h510.jpg'
  },
  {
    id: 'main_gigabyte',
    brand: 'GIGABYTE',
    series: 'Dòng H510 / H610 / B660 / B760 (Ultra Durable & AORUS)',
    marketSegment: 'Văn phòng doanh nghiệp & Bàn kỹ thuật thi đấu',
    bootKey: 'F12',
    biosKey: 'Delete (Del)',
    saveExitKey: 'F10',
    biosMode: 'Classic / Easy Mode (F2 chuyển Advanced Mode)',
    badgeColor: 'bg-amber-600',
    uefiSettings: [
      { setting: 'Chế độ cấu hình', value: 'Bấm phím F2 sang Advanced Mode', why: 'Hiển thị đầy đủ các thẻ Tweaker, Settings, System Info, Boot.' },
      { setting: 'Fast Boot', value: 'Disable', why: 'Giúp bo mạch khởi tạo đầy đủ các cổng giao tiếp ngoại vi lúc bật máy.' },
      { setting: 'CSM Support', value: 'Disable', why: 'Tắt tính năng tương thích cũ, bắt buộc toàn bộ thiết bị chạy chuẩn UEFI GPT.' },
      { setting: 'Storage Boot Option Control', value: 'UEFI Only', why: 'Ngăn chặn nạp nhầm phân vùng MBR Legacy.' },
      { setting: 'VMD Setup Menu', value: 'Enable VMD Controller: Disabled', why: 'Nhận diện trực tiếp SSD NVMe PCIe không cần nạp driver ngoài.' }
    ],
    bootSteps: [
      { step: 1, title: 'Cắm USB Boot', detail: 'Cắm USB vào cổng USB màu xanh phía sau case máy.' },
      { step: 2, title: 'Bật máy & Gọi Boot Menu', detail: 'Nhấp nhả phím F12 liên tục ngay khi bấm nút Power.' },
      { step: 3, title: 'Chọn phân vùng UEFI', detail: 'Bảng Boot Menu nền xám đen của GIGABYTE hiện ra ➔ Chọn dòng có chữ [UEFI: ...] và Enter.' },
      { step: 4, title: 'Tiến hành cài đặt', detail: 'Vào trình cài đặt Windows 10 Setup.' }
    ],
    commonTraps: [
      { trap: 'Bật CSM Support khiến không vào được USB Boot GPT', cause: 'CSM kích hoạt chế độ Legacy ưu tiên quét MBR.', fix: 'Vào BIOS tab Boot ➔ Chuyển CSM Support sang Disable ➔ Bấm F10 lưu lại.' }
    ]
  },
  {
    id: 'main_winnfox',
    brand: 'WINNFOX / HUANANZHI',
    series: 'Dòng H510G / H610G / H81 / B75 phòng máy giá rẻ',
    marketSegment: 'Phòng máy thực hành phổ thông & Văn phòng tối giản',
    bootKey: 'F11 (hoặc F7 ở bản AMI cũ)',
    biosKey: 'Delete (Del)',
    saveExitKey: 'F10',
    biosMode: 'AMI BIOS cổ điển (điều hướng phím mũi tên)',
    badgeColor: 'bg-purple-600',
    uefiSettings: [
      { setting: 'Giao diện BIOS', value: 'Giao diện bảng chữ màu xanh/xám AMI', why: 'Không hỗ trợ chuột, thao tác 100% bằng phím mũi tên và Enter.' },
      { setting: 'Boot Mode Select', value: 'UEFI', why: 'Đảm bảo nạp đúng phân vùng boot EFI FAT32.' },
      { setting: 'SATA Mode Selection', value: 'AHCI', why: 'Tối ưu tốc độ ổ SSD SATA.' },
      { setting: 'Quiet Boot', value: 'Disabled', why: 'Hiện thông số POST RAM/CPU trên màn hình để kiểm tra trực quan.' }
    ],
    bootSteps: [
      { step: 1, title: 'Cắm Loa Buzzer', detail: 'Bắt buộc cắm loa bíp vào chân J_SPEAKER trước khi bật nguồn để nghe mã âm thanh POST.' },
      { step: 2, title: 'Gọi Boot Menu', detail: 'Bật nút nguồn và nhấp nhả phím F11 (nếu không được thử phím F7).' },
      { step: 3, title: 'Chọn UEFI USB', detail: 'Chọn dòng ổ USB có chữ UEFI và nhấn Enter.' },
      { step: 4, title: 'Cài đặt Windows 10', detail: 'Tiến hành phân vùng ổ C và cài đặt.' }
    ],
    commonTraps: [
      { trap: 'Không có đèn Debug báo lỗi khi máy không lên hình', cause: 'Bo mạch thiết kế tối giản cắt giảm cụm đèn LED debug.', fix: 'Bắt buộc phải cắm Loa Buzzer bíp: 1 tiếng bíp ngắn là nhận diện phần cứng tốt; 3 bíp dài liên tục là lỗi RAM; 1 bíp dài 2 bíp ngắn là lỗi VGA.' }
    ],
    imageSrc: '/images/ol-01/main-winnfox-h510.jpg'
  },
  {
    id: 'main_asrock',
    brand: 'ASROCK',
    series: 'Dòng H510M-HDV / H610M / B660M Pro4 / Phantom Gaming',
    marketSegment: 'Máy tính kỹ thuật & Lắp ráp chuyên biệt',
    bootKey: 'F11',
    biosKey: 'Delete (Del) hoặc F2',
    saveExitKey: 'F10',
    biosMode: 'ASRock UEFI Easy Mode / Advanced Mode',
    badgeColor: 'bg-emerald-600',
    uefiSettings: [
      { setting: 'CSM Support', value: 'Disabled', why: 'Chạy thuần UEFI, mở khóa tính năng Secure Boot và Fast Boot.' },
      { setting: 'SATA Mode', value: 'AHCI', why: 'Tối ưu cho SSD.' },
      { setting: 'Primary Graphics Adapter', value: 'PCI Express', why: 'Ưu tiên xuất hình qua Card đồ họa rời GT 730.' }
    ],
    bootSteps: [
      { step: 1, title: 'Cắm USB Boot', detail: 'Cắm USB Boot vào cổng sau của bo mạch ASRock.' },
      { step: 2, title: 'Bật máy & Nhấn F11', detail: 'Nhấp nhả phím F11 liên tục.' },
      { step: 3, title: 'Chọn UEFI Boot Device', detail: 'Chọn dòng có tiền tố UEFI: [Tên USB].' },
      { step: 4, title: 'Cài đặt hệ điều hành', detail: 'Vào trình cài Windows 10.' }
    ],
    commonTraps: [
      { trap: 'Bật tính năng Ultra Fast Boot', cause: 'Làm bàn phím không kịp nhận lệnh F11/F2 lúc khởi động.', fix: 'Khởi động vào Windows cũ rồi giữ Shift + Restart để vào UEFI, hoặc tháo pin CMOS 3 phút để khôi phục mặc định.' }
    ]
  },
  {
    id: 'main_oem_dell_hp',
    brand: 'MÁY BỘ & LAPTOP (DELL · HP · LENOVO)',
    series: 'Dell OptiPlex/Vostro · HP ProDesk/EliteDesk · Lenovo ThinkCentre',
    marketSegment: 'Máy trạm văn phòng đồng bộ & Laptop học tập',
    bootKey: 'Dell: F12 · HP: F9 · Lenovo: F12 (hoặc nút Novo)',
    biosKey: 'Dell: F2 · HP: F10 · Lenovo: F2',
    saveExitKey: 'F10 (Dell/HP) / Fn+F10',
    biosMode: 'OEM UEFI Setup Utility',
    badgeColor: 'bg-slate-700',
    uefiSettings: [
      { setting: 'DELL: SATA Operation', value: 'Bắt buộc chuyển từ RAID On sang AHCI/NVMe', why: 'BẪY TỬ HUYỆT: Nếu để RAID On, bộ cài Windows 10 sẽ không thể tìm thấy ổ đĩa SSD NVMe (báo lỗi We couldnt find any drives).' },
      { setting: 'HP: Secure Boot Configuration', value: 'Legacy Support Disable & Secure Boot Disable', why: 'Cho phép boot nhanh vào USB cài Windows của KTV.' },
      { setting: 'LENOVO: Boot Priority', value: 'UEFI Only', why: 'Ngăn chặn nạp MBR Legacy.' }
    ],
    bootSteps: [
      { step: 1, title: 'Nhận diện phím Boot theo hãng', detail: 'Dell bấm F12, HP bấm F9, Lenovo bấm F12 ngay khi vừa bật nguồn.' },
      { step: 2, title: 'Chọn One-Time Boot Menu', detail: 'Chọn dòng [UEFI Boot: Tên USB] trong menu xuất hiện.' },
      { step: 3, title: 'Xử lý bẫy ổ cứng trên máy Dell', detail: 'Nếu không thấy ổ đĩa: Vào BIOS F2 ➔ Storage ➔ SATA Operation ➔ Đổi sang AHCI/NVMe.' },
      { step: 4, title: 'Cài đặt hoàn tất', detail: 'Tiến hành phân vùng ổ C và cài đặt.' }
    ],
    commonTraps: [
      { trap: 'Lỗi kinh điển trên máy Dell: Không thấy ổ cứng SSD khi chọn phân vùng', cause: 'Chế độ SATA Operation đang để mặc định RAID On của hãng Dell.', fix: 'Vào BIOS (F2) ➔ Storage ➔ SATA Operation ➔ Tích chọn AHCI/NVMe ➔ Bấm Apply và Restart lại.' }
    ]
  }
];

export const HSG_WIN10_PRACTICAL_WORKFLOW: HsgWin10InstallStep[] = [
  {
    stepNum: 1,
    title: 'Tạo USB Boot Chuẩn UEFI GPT Bằng Rufus',
    badge: 'CHUẨN BỊ BỘ CÀI',
    action: 'Dùng công cụ Rufus (bản mới nhất) nạp file ISO Windows 10 Pro 64-bit sạch vào USB tối thiểu 8GB.',
    pokaYokeAlert: 'BẮT BUỘC chọn Partition scheme: GPT và Target system: UEFI (non CSM). Tuyệt đối không chọn MBR / BIOS Legacy!',
    checklist: [
      'File ISO nguồn: Windows 10 Pro 64-bit nguyên gốc Microsoft (phiên bản 21H2 hoặc 22H2).',
      'Partition scheme: Chọn chuẩn GPT (hỗ trợ phân vùng khởi động EFI).',
      'Target system: UEFI (non CSM), File system: NTFS.',
      'Đặt tên nhãn Volume label dễ nhớ: WIN10_UEFI_KTV.'
    ],
    imageSrc: '/images/ol-01/step-5-cai-win10-partition.jpg'
  },
  {
    stepNum: 2,
    title: 'Chọn Phím Boot USB Đúng Bo Mạch Chủ',
    badge: 'KHỞI ĐỘNG POST',
    action: 'Cắm USB vào cổng USB 3.0 (màu xanh dương phía sau), bật nút nguồn và nhấp nhả phím Boot Menu tương ứng của bo mạch.',
    pokaYokeAlert: 'Nhớ khẩu quyết phím Boot: ASUS bấm F8, MSI & Winnfox bấm F11, GIGABYTE & Dell bấm F12, HP bấm F9!',
    checklist: [
      'Cắm USB vào cổng sau bo mạch chủ (trực tiếp từ Chipset, ổn định hơn cổng trước vỏ case).',
      'Nhấp nhả phím Boot liên tục ngay khi đèn bàn phím vừa chớp sáng.',
      'Tại menu chọn thiết bị: Luôn chọn dòng có tiền tố [UEFI: Tên_USB (Partition 1)].'
    ]
  },
  {
    stepNum: 3,
    title: 'Phân Vùng Ổ Cứng An Toàn (Zero Data Loss)',
    badge: 'BẢO MẬT DỮ LIỆU',
    action: 'Chọn Custom: Install Windows only (advanced). Nhìn dung lượng và tên phân vùng để xóa đúng ổ C cũ, bảo vệ nguyên vẹn ổ D/E dữ liệu.',
    pokaYokeAlert: 'QUY TẮC POKA-YOKE TỬ HUYỆT: Tuyệt đối không bấm Delete hoặc Format vào ổ D/E chứa tài liệu của khách hàng!',
    checklist: [
      'Nhận diện phân vùng: Ổ C là phân vùng Primary có dung lượng khoảng 60GB - 120GB.',
      'Xóa (Delete) phân vùng C: cũ và các phân vùng hệ thống nhỏ (Recovery, System EFI, MSR) thành vùng đen Unallocated Space.',
      'Bấm New ➔ Apply: Windows 10 tự động sinh 3 phân vùng chuẩn UEFI: Recovery (500MB), System EFI (100MB FAT32 chứa bootmgr), MSR (16MB).',
      'Chọn phân vùng Primary lớn nhất vừa tạo và bấm Next để nạp dữ liệu.'
    ],
    imageSrc: '/images/ol-01/step-5-cai-win10-partition.jpg'
  },
  {
    stepNum: 4,
    title: 'Thiết Lập OOBE & Tài Khoản Local Administrator',
    badge: 'CẤU HÌNH HỆ THỐNG',
    action: 'Hoàn tất các bước thiết lập trải nghiệm ban đầu (Out-of-Box Experience) sau khi máy tự khởi động lại.',
    pokaYokeAlert: 'Không kết nối Wifi hoặc rút dây mạng ở bước này để tránh bị bắt buộc đăng nhập tài khoản Microsoft cá nhân!',
    checklist: [
      'Chọn Region: Vietnam (hoặc United States), Bàn phím: US.',
      'Màn hình kết nối mạng: Chọn "I dont have internet" ➔ Chọn tiếp "Continue with limited setup".',
      'Đặt tên tài khoản Local Admin viết liền không dấu: ví dụ KTV-01 hoặc User.',
      'Đặt mật khẩu (hoặc để trống theo yêu cầu của đề thi). Tắt toàn bộ tùy chọn vị trí và chẩn đoán quảng cáo.'
    ]
  },
  {
    stepNum: 5,
    title: 'Cài Đặt Driver & Kiểm Tra Nghiệm Thu',
    badge: 'NGHIỆM THU HOÀN THIỆN',
    action: 'Cài đặt đầy đủ driver phần cứng, kiểm tra Device Manager sạch dấu chấm than vàng và kích hoạt bản quyền phòng lab.',
    pokaYokeAlert: 'Cài driver đúng thứ tự KTV chuẩn: 1. Chipset ➔ 2. Card đồ họa GT 730 ➔ 3. Âm thanh Audio ➔ 4. Mạng LAN/Wifi.',
    checklist: [
      'Bấm Windows + X ➔ Chọn Device Manager (devmgmt.msc), xác nhận 100% không còn dấu chấm than vàng ⚠️.',
      'Mở lệnh winver kiểm tra phiên bản Windows 10 Pro 64-bit.',
      'Mở Task Manager (Ctrl + Shift + Esc) kiểm tra nhận đủ dung lượng RAM (8GB DDR4) và CPU.',
      'Dùng CrystalDiskInfo hoặc lệnh CIM kiểm tra nhiệt độ và sức khỏe ổ cứng SSD Good 100%.'
    ],
    imageSrc: '/images/ol-01/step-7-hwmonitor-nhiet-do.jpg'
  }
];

