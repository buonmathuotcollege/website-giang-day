// ============================================================================
// PORTAL HUB DATA & QUERY HELPERS
// Cổng Thông Tin Giảng Dạy CNTT · CN. Phạm Tiến Đông
// Phục vụ đào tạo: Lớp 04THA3 (Cơ sở Ea H'leo)
// ============================================================================

export interface PortalEcosystemItem {
  id: string;
  title: string;
  url: string;
  subdomain?: string;
  isExternal: boolean;
  icon: string;
  tag: string;
  tagColor: 'blue' | 'emerald' | 'purple' | 'amber';
  description: string;
  highlight?: string;
  order: number;
}

export interface PortalScheduleItem {
  id: string;
  title: string;
  targetClass: string;
  labRoom: string;
  weekNumber: number;
  dateRange: string;
  status: 'active' | 'upcoming' | 'completed';
  focusSkills: string[];
  safetyNotice?: string;
}

export interface PortalAnnouncementItem {
  id: string;
  title: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  targetAudience: string;
  badge?: string;
  link?: string;
}

// Danh sách mặc định hệ sinh thái phân hệ & Subdomain
export const DEFAULT_ECOSYSTEM: PortalEcosystemItem[] = [
  {
    id: 'pc-subdomain',
    title: 'Chuyên Trang Phòng Máy Thực Tế',
    url: 'https://pc.phamtiendong.name.vn',
    subdomain: 'pc',
    isExternal: true,
    icon: '🖥️',
    tag: 'SUBDOMAIN MỚI',
    tagColor: 'emerald',
    description: 'Chuyên trang thực hành tháo lắp, đo đạc điện áp nguồn PSU, bảo trì keo tản nhiệt và bắt bệnh bo mạch chủ H510/RAM DDR4 tại bàn máy.',
    highlight: 'Trỏ trực tiếp sang trang con chuyên trách phần cứng',
    order: 1,
  },
  {
    id: 'mang-can-ban',
    title: 'Mạng Máy Tính Căn Bản & LAN/WAN',
    url: '/courses/mang-can-ban',
    subdomain: 'mang',
    isExternal: false,
    icon: '🌐',
    tag: 'MÔN CHUYÊN NGÀNH',
    tagColor: 'blue',
    description: 'Mô hình OSI 7 tầng, phân loại cáp mạng, cấu hình Switch Cisco Packet Tracer, chia mạng con CIDR/VLSM và kiểm tra kết nối ping/tracert.',
    highlight: 'Thực hành bấm cáp thẳng/chéo Gigabit 1000Mbps',
    order: 2,
  },
  {
    id: 'quan-tri-windows-linux',
    title: 'Quản Trị Windows & Máy Chủ Linux',
    url: '/courses/quan-tri-windows-linux',
    subdomain: 'quantri',
    isExternal: false,
    icon: '🐧',
    tag: 'HỆ ĐIỀU HÀNH & SERVER',
    tagColor: 'purple',
    description: 'Cài đặt Windows 10 Pro, cấu hình Local Group Policy, chia sẻ tài nguyên SMB, phân quyền NTFS và quản trị Ubuntu/CentOS lệnh CLI.',
    highlight: 'Chuẩn hóa 100% trên môi trường Windows 10',
    order: 3,
  },
  {
    id: 'nang-luc-so',
    title: 'Năng Lực Số & Kỹ Năng Ứng Dụng CNTT',
    url: '/courses/nang-luc-so',
    subdomain: 'nanglucso',
    isExternal: false,
    icon: '💡',
    tag: 'KỸ NĂNG NỀN TẢNG',
    tagColor: 'amber',
    description: 'Khai thác công cụ số an toàn, bảo vệ dữ liệu cá nhân, nhận diện lừa đảo trên mạng và ứng dụng AI hỗ trợ học tập hiệu quả.',
    highlight: 'Chuẩn năng lực số cho học sinh 9+3 thời đại 4.0',
    order: 4,
  },
];

// Danh sách lịch tuần phòng máy Lớp 04THA3 (Cơ sở Ea H'leo)
export const DEFAULT_SCHEDULES: PortalScheduleItem[] = [
  {
    id: 'tuan-02-thao-lap-h510',
    title: 'Tuần 02: Bấm Cáp Gigabit TIA-568B & Cài Đặt Windows 10 Chuẩn UEFI GPT',
    targetClass: '04THA3 - Cơ sở Ea H\'leo',
    labRoom: 'Phòng Máy Tính Thực Hành 01',
    weekNumber: 2,
    dateRange: '17/11/2026 - 22/11/2026',
    status: 'active',
    focusSkills: [
      'Bấm cáp mạng UTP Cat5e chuẩn TIA-568B: Vỏ cáp ngậm sâu trong hạt RJ45 > 5mm',
      'Test thông mạch 8/8 sợi bằng hộp test cáp, đo tốc độ Gigabit 1000 Mbps',
      'Tạo USB boot UEFI GPT, phân vùng ổ C 100GB cài Windows 10 Pro không mất dữ liệu ổ D',
    ],
    safetyNotice: 'Bắt buộc cắm USB WinPE vào copy thư mục Desktop, Documents, Zalo sang ổ D trước khi xóa phân vùng hệ thống!',
  },
  {
    id: 'tuan-01-tieu-chuan-an-toan',
    title: 'Tuần 01: Quy Chuẩn An Toàn Poka-Yoke & Chẩn Đoán Lỗi Nguồn/RAM',
    targetClass: '04THA3 - Cơ sở Ea H\'leo',
    labRoom: 'Phòng Máy Tính Thực Hành 01',
    weekNumber: 1,
    dateRange: '10/11/2026 - 15/11/2026',
    status: 'completed',
    focusSkills: [
      'Xả tĩnh điện (ESD): Chạm vỏ case kim loại trước khi cắm linh kiện',
      'Phân loại 4 trạng thái khởi động A/B/C/D của Mainboard H510',
      'Vệ sinh chân RAM DDR4 bằng cục tẩy, cắm đúng chiều rãnh khuyết',
    ],
    safetyNotice: 'Rút dây nguồn AC 220V ít nhất 30 giây để tụ xả sạch điện trước khi tháo lắp RAM/VGA!',
  },
];

// Thông báo phòng máy
export const DEFAULT_ANNOUNCEMENTS: PortalAnnouncementItem[] = [
  {
    id: 'tb-01',
    title: 'Bàn Giao 20 Bộ Máy Thực Hành Intel H510 / DDR4 8GB / GT 730',
    date: '18/11/2026',
    priority: 'high',
    targetAudience: 'Học sinh Lớp 04THA3 (Ea H\'leo)',
    badge: 'PHÒNG MÁY LAB',
    link: '/courses/ol-01-phan-cung',
  },
  {
    id: 'tb-02',
    title: 'Lịch Huấn Luyện Sa Bàn Thi Công 5 Chặng Cho 3 Đội Tuyển HSG 04THA3',
    date: '18/11/2026',
    priority: 'high',
    targetAudience: 'Đội Tuyển HSG 04THA3 (Ea H\'leo)',
    badge: 'ĐỘI TUYỂN HSG',
    link: '/courses/hsg-phan-cung-mang',
  },
];

// Danh sách Bàn Kỹ thuật thực hành tại phòng máy (Máy 01 - Máy 20)
export const LAB_STATIONS = Array.from({ length: 20 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    id: `station_${num}`,
    name: `Máy ${num}`,
    lab: 'Phòng Máy 01',
    ipAddress: `192.168.10.${10 + i}`,
    assignedGroup: `Bàn KTV ${Math.floor(i / 2) + 1}`,
    boardModel: i % 2 === 0 ? 'MSI H510M-B Pro' : 'ASUS Prime H510M-K',
    ramSpec: '8GB DDR4 Bus 2666MHz',
    vgaSpec: 'GT 730 2GB GDDR5',
  };
});

// Danh sách các tình huống sát hạch ngẫu nhiên phục vụ quay số / bốc thăm
export const QUICK_PRACTICE_TICKETS = [
  {
    code: 'TH-01',
    title: 'Máy bật quạt quay nhưng không lên hình, còi bíp liên tục không ngừng',
    mainboard: 'MSI H510M-B',
    symptom: 'Quạt CPU quay bình thường, màn hình đen, đèn báo DRAM sáng cam.',
    cause: 'Chân RAM DDR4 bị oxy hóa bám bụi hoặc lỏng ngàm gài.',
    remedy: 'Rút nguồn xả điện 30s ➔ Dùng cục tẩy chà sạch 2 mặt chân vàng RAM ➔ Thổi bụi khe cắm ➔ Gài đều 2 đầu ngàm.',
    targetUrl: '/courses/ol-01-phan-cung',
  },
  {
    code: 'TH-02',
    title: 'Khách mang máy đến yêu cầu cài lại Windows 10 do dính virus, máy chứa dữ liệu kế toán',
    mainboard: 'ASUS Prime H510M-K',
    symptom: 'Windows khởi động chậm, có nhiều pop-up lạ, dữ liệu khách nằm trên Desktop và thư mục Zalo.',
    cause: 'Hệ điều hành nhiễm mã độc.',
    remedy: 'Cắm USB WinPE ➔ Vào ổ C cũ copy thư mục Desktop/Documents/Zalo sang ổ D ➔ Chia đúng phân vùng ổ C cài mới Windows 10.',
    targetUrl: '/courses/ol-01-phan-cung',
  },
  {
    code: 'TH-03',
    title: 'Đấu nối cáp mạng LAN nhưng chỉ nhận tốc độ 100 Mbps thay vì Gigabit 1000 Mbps',
    mainboard: 'Gigabit LAN Switch',
    symptom: 'Đèn cổng LAN trên Switch sáng màu cam (100Mbps), copy file qua mạng nội bộ chỉ đạt 11 MB/s.',
    cause: 'Cáp mạng bị đứt ngầm hoặc bấm sai chuẩn 1 trong 4 sợi (chân 4, 5, 7, 8). Chuẩn Gigabit bắt buộc thông đủ 8/8 sợi.',
    remedy: 'Dùng kìm cắt bỏ 2 đầu hạt mạng cũ ➔ Vuốt thẳng 8 sợi theo chuẩn TIA-568B ➔ Bấm ngậm sâu vỏ cáp > 5mm ➔ Test thông mạch 8/8 sợi.',
    targetUrl: '/courses/hsg-phan-cung-mang',
  },
  {
    code: 'TH-04',
    title: 'Phân mạng IPv4 CIDR /27 cho Ban Giám Đốc (cần tối đa 28 máy tính)',
    mainboard: 'Hạ tầng Router Core',
    symptom: 'Mạng bị nghẽn do chung Broadcast Domain với toàn bộ khối văn phòng.',
    cause: 'Chưa phân tách VLAN và chia mạng con tối ưu.',
    remedy: 'Áp dụng công thức Subnetting 30s: Mượn 3 bit (/27), bước nhảy 32. Cấp dải host khả dụng từ .33 đến .62, Broadcast .63.',
    targetUrl: '/courses/hsg-phan-cung-mang',
  },
  {
    code: 'TH-05',
    title: 'Khách lắp thêm ổ SSD 256GB mới nhưng vào My Computer (This PC) không thấy ổ',
    mainboard: 'WINNFOX H510',
    symptom: 'BIOS nhận đủ tên SSD, nhưng trong Windows File Explorer không xuất hiện ổ đĩa.',
    cause: 'Ổ cứng mới xuất xưởng chưa được khởi tạo (Initialize) và chưa định dạng phân vùng (New Simple Volume).',
    remedy: 'Bấm chuột phải vào Start ➔ Chọn Disk Management ➔ Khởi tạo GPT ➔ Bấm chuột phải vào vùng Unallocated chọn New Simple Volume định dạng NTFS.',
    targetUrl: '/courses/ol-01-phan-cung',
  },
];
