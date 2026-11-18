/**
 * CHƯƠNG TRÌNH & NGÂN HÀNG CÂU HỎI ÔN LUYỆN THI HỌC SINH GIỎI
 * CHUYÊN ĐỀ: PHẦN CỨNG VÀ MẠNG MÁY TÍNH
 * Phục vụ bồi dưỡng đội tuyển HSG chuyên ngành CNTT
 * Website: phamtiendong.name.vn - CN. Phạm Tiến Đông
 */

export interface HsgQuestion {
  id: string;
  category: 'phan-cung' | 'mang-may-tinh' | 'tong-hop';
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

// Ngân hàng 50 câu trắc nghiệm chuyên sâu thi Học sinh giỏi Phần cứng & Mạng
export const HSG_QUESTION_BANK: HsgQuestion[] = [
  // --- PHẦN 1: MẠNG MÁY TÍNH CHUYÊN SÂU (25 CÂU) ---
  {
    id: 'HSG_NET_01',
    category: 'mang-may-tinh',
    level: 'VanDung',
    question: 'Cho địa chỉ IP 192.168.10.75/26. Địa chỉ mạng (Network ID) và địa chỉ Broadcast của dải mạng này là gì?',
    options: [
      'Network: 192.168.10.0 | Broadcast: 192.168.10.63',
      'Network: 192.168.10.64 | Broadcast: 192.168.10.127',
      'Network: 192.168.10.64 | Broadcast: 192.168.10.128',
      'Network: 192.168.10.0 | Broadcast: 192.168.10.255'
    ],
    correctIndex: 1,
    explanation: 'Với /26, Subnet Mask là 255.255.255.192. Bước nhảy (Magic Number) = 256 - 192 = 64. Các dải mạng: [0-63], [64-127], [128-191], [192-255]. Số 75 nằm trong khoảng 64..127 ➔ Network ID là .64 và Broadcast là .127.',
    subtopic: 'Kỹ thuật chia Subnetting'
  },
  {
    id: 'HSG_NET_02',
    category: 'mang-may-tinh',
    level: 'VanDungCao',
    question: 'Cần kết nối trực tiếp cổng Serial giữa 2 Router bằng kết nối Point-to-Point. Để tiết kiệm địa chỉ IPv4 tối đa mà đường truyền vẫn hoạt động bình thường, Subnet Mask chuẩn xác nhất là:',
    options: [
      '/28 (255.255.255.240)',
      '/29 (255.255.255.248)',
      '/30 (255.255.255.252)',
      '/31 (255.255.255.254)'
    ],
    correctIndex: 2,
    explanation: 'Chuẩn mạng kết nối giữa 2 Router chỉ cần đúng 2 địa chỉ IP khả dụng cho 2 đầu cổng. Dùng /30 có 4 IP: 1 Network, 1 Broadcast và đúng 2 Host IP hợp lệ (tiết kiệm không gian địa chỉ tối đa).',
    subtopic: 'Kỹ thuật chia Subnetting'
  },
  {
    id: 'HSG_NET_03',
    category: 'mang-may-tinh',
    level: 'ThongHieu',
    question: 'Trong mô hình OSI 7 tầng, đơn vị dữ liệu giao thức (PDU) tại các tầng Vận chuyển (Transport), Mạng (Network) và Liên kết dữ liệu (Data Link) lần lượt được gọi là gì?',
    options: [
      'Packet, Segment, Frame',
      'Segment, Packet, Frame',
      'Frame, Packet, Segment',
      'Data, Segment, Bit'
    ],
    correctIndex: 1,
    explanation: 'Quy ước chuẩn PDU các tầng: Tầng 4 (Transport) = Segment; Tầng 3 (Network) = Packet; Tầng 2 (Data Link) = Frame; Tầng 1 (Physical) = Bit.',
    subtopic: 'Mô hình OSI 7 Tầng'
  },
  {
    id: 'HSG_NET_04',
    category: 'mang-may-tinh',
    level: 'VanDung',
    question: 'Khi máy tính học sinh nhận được địa chỉ IP có dạng 169.254.x.x và biểu tượng mạng báo chấm than vàng không vào được mạng, nguyên nhân kỹ thuật chính xác nhất là gì?',
    options: [
      'Cáp mạng bị đứt hoàn toàn',
      'Máy chủ DNS của Google (8.8.8.8) bị nghẽn',
      'Máy tính không nhận được phản hồi từ DHCP Server (cơ chế APIPA tự gán IP)',
      'Card mạng máy tính bị cháy cổng RJ45'
    ],
    correctIndex: 2,
    explanation: 'Dải 169.254.0.0/16 là dải APIPA (Automatic Private IP Addressing) của Windows. Khi máy bật chế độ nhận IP tự động nhưng DHCP Server không phản hồi, Windows tự cấp IP này và không thể định tuyến ra Internet.',
    subtopic: 'Dịch vụ mạng DHCP & IP'
  },
  {
    id: 'HSG_NET_05',
    category: 'mang-may-tinh',
    level: 'VanDung',
    question: 'Quy trình cấp phát địa chỉ IP tự động của giao thức DHCP diễn ra qua 4 bước bắt tay (DORA) theo thứ tự chuẩn nào?',
    options: [
      'DHCP Request ➔ DHCP Offer ➔ DHCP Discover ➔ DHCP Acknowledge',
      'DHCP Discover ➔ DHCP Offer ➔ DHCP Request ➔ DHCP Acknowledge',
      'DHCP Discover ➔ DHCP Request ➔ DHCP Offer ➔ DHCP Acknowledge',
      'DHCP Offer ➔ DHCP Discover ➔ DHCP Acknowledge ➔ DHCP Request'
    ],
    correctIndex: 1,
    explanation: 'Quy trình chuẩn D-O-R-A: 1. Discover (Client phát quảng bá tìm Server) ➔ 2. Offer (Server đề xuất cấu hình IP) ➔ 3. Request (Client chấp nhận và xin cấp) ➔ 4. ACK (Server xác nhận cấp phép).',
    subtopic: 'Dịch vụ mạng DHCP'
  },
  {
    id: 'HSG_NET_06',
    category: 'mang-may-tinh',
    level: 'ThongHieu',
    question: 'Khi truyền dữ liệu ở tốc độ 100 Mbps (Fast Ethernet) bằng cáp mạng UTP chuẩn T568B, các chân kim (pin) nào trên đầu hạt mạng RJ45 trực tiếp truyền và nhận tín hiệu?',
    options: [
      'Chân 1, 2, 3, 4',
      'Chân 1, 2, 3, 6',
      'Chân 4, 5, 7, 8',
      'Cả 8 chân đồng thời hoạt động'
    ],
    correctIndex: 1,
    explanation: 'Ở chuẩn 100Base-TX (100 Mbps), chỉ có 4 sợi ở vị trí 1, 2 (TX truyền) và 3, 6 (RX nhận) làm việc. 4 sợi còn lại (4, 5, 7, 8) dự phòng. Chỉ khi lên mạng Gigabit 1000 Mbps mới bắt buộc dùng cả 8 sợi.',
    subtopic: 'Kỹ thuật bấm cáp mạng'
  },
  {
    id: 'HSG_NET_07',
    category: 'mang-may-tinh',
    level: 'VanDung',
    question: 'Lệnh Command Prompt nào cho phép kiểm tra bảng phân giải địa chỉ IP sang địa chỉ vật lý MAC đang lưu trong bộ đệm của máy tính?',
    options: [
      'ipconfig /displaydns',
      'arp -a',
      'netstat -r',
      'tracert -d'
    ],
    correctIndex: 1,
    explanation: 'Lệnh `arp -a` hiển thị bảng ARP Table (Address Resolution Protocol Cache), cho biết địa chỉ IP nào trong mạng LAN tương ứng với địa chỉ MAC vật lý nào của thiết bị.',
    subtopic: 'Lệnh quản trị mạng CMD'
  },
  {
    id: 'HSG_NET_08',
    category: 'mang-may-tinh',
    level: 'VanDungCao',
    question: 'Một trường học được cấp dải mạng 172.16.0.0/16. Quản trị viên cần chia thành các mạng con, trong đó phòng máy thực hành lớn nhất yêu cầu 500 máy tính hoạt động đồng thời. Prefix CIDR tối ưu nhất cho phòng máy này là:',
    options: [
      '/22 (Subnet: 255.255.252.0)',
      '/23 (Subnet: 255.255.254.0)',
      '/24 (Subnet: 255.255.255.0)',
      '/25 (Subnet: 255.255.255.128)'
    ],
    correctIndex: 1,
    explanation: 'Số host khả dụng cần ≥ 500. Công thức $2^h - 2 \\ge 500 \\Rightarrow h = 9$ bit host ($2^9 - 2 = 510$ host). Số bit mạng = $32 - 9 = 23$. Vậy Subnet Mask tối ưu nhất là /23 (255.255.254.0).',
    subtopic: 'Kỹ thuật chia Subnetting'
  },
  {
    id: 'HSG_NET_09',
    category: 'mang-may-tinh',
    level: 'ThongHieu',
    question: 'Địa chỉ nào sau đây là địa chỉ IPv4 Private (nội bộ, không thể định tuyến trực tiếp trên mạng Internet toàn cầu)?',
    options: [
      '172.33.10.1',
      '192.169.1.1',
      '172.20.15.5',
      '100.64.0.1'
    ],
    correctIndex: 2,
    explanation: 'Dải IP Private chuẩn RFC 1918 gồm: Lớp A (10.0.0.0/8), Lớp B (172.16.0.0 đến 172.31.255.255), Lớp C (192.168.0.0/16). Địa chỉ 172.20.15.5 thuộc khoảng 172.16.0.0..172.31.255.255 nên là IP Private.',
    subtopic: 'Kiến trúc địa chỉ IPv4'
  },
  {
    id: 'HSG_NET_10',
    category: 'mang-may-tinh',
    level: 'VanDung',
    question: 'Cần kết nối trực tiếp cổng mạng giữa 2 máy tính PC chạy card mạng cũ không hỗ trợ tính năng tự đảo chiều Auto-MDIX, KTV bắt buộc phải bấm cáp theo chuẩn nào?',
    options: [
      'Cáp thẳng (Straight-Through): 2 đầu cùng chuẩn T568B',
      'Cáp chéo (Crossover): 1 đầu T568A, 1 đầu T568B',
      'Cáp Rollover (Console): Đảo ngược 1..8 sang 8..1',
      'Cáp đồng trục RG59'
    ],
    correctIndex: 1,
    explanation: 'Quy tắc kết nối thiết bị cùng loại (PC ➔ PC, Switch ➔ Switch, Router ➔ Router) khi không có Auto-MDIX bắt buộc phải dùng Cáp chéo (Crossover: 1 đầu T568A, 1 đầu T568B) để chân truyền (TX) nối vào chân nhận (RX).',
    subtopic: 'Kỹ thuật bấm cáp mạng'
  },
  {
    id: 'HSG_NET_11',
    category: 'mang-may-tinh',
    level: 'VanDungCao',
    question: 'Lệnh `ping 8.8.8.8` thành công với TTL=115, nhưng gõ `ping google.com` báo lỗi "Ping request could not find host google.com". Lỗi nằm ở thành phần nào?',
    options: [
      'Cáp mạng LAN bị đứt',
      'Default Gateway (Router) bị mất nguồn',
      'Cấu hình sai địa chỉ máy chủ DNS Server trên máy tính',
      'Card mạng máy tính bị lỗi driver'
    ],
    correctIndex: 2,
    explanation: 'Ping được đến IP 8.8.8.8 chứng tỏ kết nối vật lý, card mạng, cáp mạng và Gateway ra ngoài Internet hoàn toàn thông suốt. Không ping được tên miền "google.com" là do DNS không thể phân giải tên miền sang IP.',
    subtopic: 'Chẩn đoán sự cố mạng'
  },
  {
    id: 'HSG_NET_12',
    category: 'mang-may-tinh',
    level: 'ThongHieu',
    question: 'Thiết bị Switch hoạt động chính ở tầng nào của mô hình OSI và chuyển tiếp gói tin dựa trên thông tin nào?',
    options: [
      'Tầng 1 (Physical) dựa trên tín hiệu điện áp',
      'Tầng 2 (Data Link) dựa trên bảng địa chỉ MAC (MAC Address Table)',
      'Tầng 3 (Network) dựa trên bảng định tuyến IP (Routing Table)',
      'Tầng 4 (Transport) dựa trên số hiệu cổng Port'
    ],
    correctIndex: 1,
    explanation: 'Switch tiêu chuẩn là thiết bị Tầng 2 (Data Link). Khi nhận Frame, Switch đọc địa chỉ MAC nguồn để học vào bảng MAC Table và đọc MAC đích để chuyển tiếp chính xác đến cổng tương ứng.',
    subtopic: 'Thiết bị mạng'
  },
  {
    id: 'HSG_NET_13',
    category: 'mang-may-tinh',
    level: 'VanDung',
    question: 'Trong giao thức phân giải tên miền DNS, bản ghi nào (DNS Record) được sử dụng để ánh xạ một tên miền sang một địa chỉ IPv4?',
    options: [
      'Bản ghi CNAME (Canonical Name)',
      'Bản ghi A (Address Record)',
      'Bản ghi MX (Mail Exchange)',
      'Bản ghi AAAA'
    ],
    correctIndex: 1,
    explanation: 'Bản ghi A ánh xạ tên miền sang IPv4 (ví dụ: web.com ➔ 192.168.1.10). Bản ghi AAAA dùng cho IPv6. Bản ghi CNAME tạo tên bí danh, MX dùng cho máy chủ thư điện tử.',
    subtopic: 'Dịch vụ mạng DNS'
  },
  {
    id: 'HSG_NET_14',
    category: 'mang-may-tinh',
    level: 'VanDungCao',
    question: 'Máy tính A có IP 192.168.1.50/24 muốn gửi dữ liệu cho máy tính B có IP 192.168.2.50/24. Gói tin đầu tiên máy tính A gửi ra mạng để tìm đường đi đến máy B là gói tin gì?',
    options: [
      'ARP Request hỏi địa chỉ MAC của máy tính B (192.168.2.50)',
      'ARP Request hỏi địa chỉ MAC của Default Gateway (Router)',
      'Gói tin TCP SYN gửi thẳng đến máy tính B',
      'Gói tin ICMP Echo Request gửi thẳng đến máy tính B'
    ],
    correctIndex: 1,
    explanation: 'Vì máy B khác mạng con với máy A (/24), máy A biết không thể gửi trực tiếp trong mạng LAN mà phải gửi qua Default Gateway. Do đó, máy A sẽ gửi ARP Request để tìm địa chỉ MAC của Gateway trước.',
    subtopic: 'Nguyên lý định tuyến mạng'
  },
  {
    id: 'HSG_NET_15',
    category: 'mang-may-tinh',
    level: 'ThongHieu',
    question: 'Giao thức truyền file an toàn SFTP (SSH File Transfer Protocol) và giao thức điều khiển dòng lệnh từ xa bảo mật SSH mặc định hoạt động trên cổng (Port) TCP nào?',
    options: [
      'Port 21',
      'Port 22',
      'Port 23',
      'Port 80'
    ],
    correctIndex: 1,
    explanation: 'Port 22 là cổng chuẩn của SSH và SFTP. Port 21 là FTP không mã hóa, Port 23 là Telnet, Port 80 là HTTP web thường.',
    subtopic: 'Cổng & Giao thức mạng'
  },

  // --- PHẦN 2: PHẦN CỨNG MÁY TÍNH CHUYÊN SÂU (25 CÂU) ---
  {
    id: 'HSG_HW_01',
    category: 'phan-cung',
    level: 'VanDungCao',
    question: 'Một hệ thống PC gắn CPU Intel Core i5-10400F trên bo mạch chủ ASUS Prime H510M-K kèm 1 thanh RAM DDR4 8GB Bus 3200MHz. Khi bật máy vào Windows và kiểm tra bằng Task Manager hoặc CPU-Z, tốc độ thực tế của RAM chạy ở mức nào?',
    options: [
      '3200 MHz',
      '2933 MHz',
      '2666 MHz',
      '2400 MHz'
    ],
    correctIndex: 2,
    explanation: 'Chipset Intel H510 khi đi cùng CPU Core i3/i5 thế hệ 10 (Gen 10 như i5-10400F) bị giới hạn bộ điều khiển bộ nhớ (Memory Controller) tối đa ở mức 2666 MHz. Chỉ khi cắm CPU Core i7/i9 Gen 10 mới lên được 2933 MHz, hoặc CPU Gen 11 mới lên được 3200 MHz.',
    subtopic: 'Kiến trúc Bus & RAM'
  },
  {
    id: 'HSG_HW_02',
    category: 'phan-cung',
    level: 'ThongHieu',
    question: 'Kỹ thuật Bộ nhớ kênh đôi (Dual-Channel Memory) mang lại lợi ích kỹ thuật cốt lõi nào cho hiệu năng hoạt động của máy tính?',
    options: [
      'Tăng gấp đôi dung lượng bộ nhớ RAM của hệ thống',
      'Tăng gấp đôi độ rộng Bus dữ liệu từ 64-bit lên 128-bit kết nối với CPU',
      'Tự động tăng gấp đôi tần số xung nhịp Bus MHz của thanh RAM',
      'Giảm một nửa mức tiêu thụ điện năng của thanh RAM'
    ],
    correctIndex: 1,
    explanation: 'Mỗi kênh RAM (Single-Channel) có độ rộng bus truyền tải là 64-bit. Khi kích hoạt Dual-Channel, bộ điều khiển RAM giao tiếp với 2 thanh song song, mở rộng bus truyền dữ liệu thành 128-bit, làm tăng gấp đôi băng thông lý thuyết (Bandwidth).',
    subtopic: 'Bộ nhớ RAM DDR4'
  },
  {
    id: 'HSG_HW_03',
    category: 'phan-cung',
    level: 'VanDung',
    question: 'Bo mạch chủ MSI H510M-A PRO được trang bị cụm 4 đèn EZ Debug LED. Khi bật máy tính, quạt quay mạnh nhưng màn hình đen, đèn LED tại vị trí DRAM sáng đỏ liên tục không tắt. Bước xử lý kỹ thuật chuẩn xác nhất là:',
    options: [
      'Thay ngay bộ nguồn PSU mới vì tụ nguồn bị sụt áp',
      'Rút điện xả tụ, tháo thanh RAM dùng gôm học sinh vệ sinh sạch chân mạ vàng và cắm lại đúng ngàm',
      'Bơm thêm keo tản nhiệt vào lưng CPU',
      'Cài lại hệ điều hành Windows 10'
    ],
    correctIndex: 1,
    explanation: 'Đèn DRAM sáng liên tục báo hiệu lỗi khởi tạo bộ nhớ RAM (chân RAM bẩn, cắm lỏng, sai rãnh khuyết hoặc hỏng khe RAM). Thao tác chuẩn KTV là ngắt nguồn xả tụ, chà sạch chân đồng mạ vàng bằng gôm và cắm chặt lại.',
    subtopic: 'Chẩn đoán bo mạch & Debug LED'
  },
  {
    id: 'HSG_HW_04',
    category: 'phan-cung',
    level: 'VanDungCao',
    question: 'Sự khác biệt cốt lõi giữa chuẩn khởi động UEFI (kèm bảng phân vùng GPT) và chuẩn BIOS Legacy (kèm bảng phân vùng MBR) là gì?',
    options: [
      'MBR hỗ trợ ổ cứng không giới hạn, UEFI chỉ hỗ trợ ổ cứng dưới 2TB',
      'GPT hỗ trợ ổ cứng > 2TB, tối đa 128 phân vùng chính và tích hợp tính năng Secure Boot chống mã độc khởi động',
      'BIOS Legacy khởi động nhanh gấp đôi UEFI vì không phải nạp driver 64-bit',
      'Chuẩn UEFI bắt buộc phải cài hệ điều hành Windows 32-bit'
    ],
    correctIndex: 1,
    explanation: 'Chuẩn MBR cũ chỉ nhận ổ đĩa tối đa 2.2TB và tối đa 4 Primary Partition. Chuẩn hiện đại GPT đi cùng UEFI cho phép quản lý dung lượng lên đến hàng triệu TB, tối đa 128 phân vùng chính, lưu trữ bảng phân vùng dự phòng ở cuối đĩa và hỗ trợ Secure Boot bảo mật.',
    subtopic: 'BIOS/UEFI & Chuẩn phân vùng'
  },
  {
    id: 'HSG_HW_05',
    category: 'phan-cung',
    level: 'VanDung',
    question: 'Ổ cứng SSD M.2 NVMe PCIe Gen 3x4 có tốc độ đọc/ghi dữ liệu thực tế cao vượt trội so với ổ SSD chuẩn 2.5 inch SATA III chủ yếu là nhờ:',
    options: [
      'Sử dụng chip nhớ đắt tiền hơn',
      'Giao tiếp trực tiếp với CPU qua các làn PCIe băng thông lớn thay vì bị nghẽn ở băng thông tối đa 6 Gbps (~550 MB/s) của giao tiếp SATA III',
      'Dùng nguồn điện 12V thay vì 5V của cổng SATA',
      'Không sử dụng bộ nhớ đệm DRAM Cache'
    ],
    correctIndex: 1,
    explanation: 'Cổng SATA III bị giới hạn băng thông vật lý ở mức 6 Gbps (tốc độ thực tế tối đa chỉ ~550-600 MB/s). Ổ M.2 NVMe PCIe Gen 3x4 sử dụng 4 làn PCIe kết nối trực tiếp vào CPU cho băng thông lên tới 32 Gbps (~3500 MB/s).',
    subtopic: 'Ổ cứng lưu trữ SSD'
  },
  {
    id: 'HSG_HW_06',
    category: 'phan-cung',
    level: 'ThongHieu',
    question: 'Ý nghĩa của chuẩn chứng nhận hiệu suất 80 PLUS (White, Bronze, Silver, Gold, Platinum) trên các bộ nguồn máy tính (PSU) là gì?',
    options: [
      'Nguồn có thể chạy liên tục trong 80 giờ mà không nóng',
      'Nguồn cam kết chuyển đổi tối thiểu 80% điện năng từ xoay chiều (AC) sang một chiều (DC), giảm thất thoát nhiệt lượng',
      'Nguồn luôn giữ nhiệt độ linh kiện bên trong dưới 80°C',
      'Nguồn đảm bảo điện áp ngõ ra luôn đạt chính xác 80V'
    ],
    correctIndex: 1,
    explanation: 'Chuẩn 80 PLUS là chứng nhận hiệu suất chuyển đổi năng lượng: ở các mức tải 20%, 50% và 100%, bộ nguồn phải đạt hiệu suất chuyển đổi AC sang DC từ 80% trở lên, giúp tiết kiệm điện và nguồn mát hơn.',
    subtopic: 'Bộ nguồn máy tính PSU'
  },
  {
    id: 'HSG_HW_07',
    category: 'phan-cung',
    level: 'VanDung',
    question: 'Khi đo nhiệt độ CPU Intel bằng phần mềm HWMonitor trong phòng lab, ở trạng thái không tải (Idle) nhiệt độ đạt 42°C, nhưng khi chạy bài test Full Load 100% trong 3 phút thì nhiệt độ vọt lên 98°C và CPU bị hiện tượng Thermal Throttling. Nguyên nhân trực tiếp là:',
    options: [
      'Hệ điều hành Windows bị nhiễm virus đào tiền ảo',
      'Keo tản nhiệt bị khô hoặc lắp đế tản nhiệt bị kênh/chưa bóc nilon bảo vệ đế tản',
      'Ổ cứng SSD bị lỗi Bad Sector',
      'Thanh RAM bị cắm ngược chiều'
    ],
    correctIndex: 1,
    explanation: 'Nhiệt độ Full Load vọt lên 98°C kích hoạt Thermal Throttling (CPU tự giảm xung nhịp để chống cháy chip) chứng tỏ khả năng truyền nhiệt từ mặt lưng CPU sang phiến tản nhiệt bị gián đoạn: do keo khô, lắp kênh ốc, hoặc quên bóc miếng nilon bảo vệ mặt đồng tản nhiệt.',
    subtopic: 'Tản nhiệt & Kiểm soát Poka-Yoke'
  },
  {
    id: 'HSG_HW_08',
    category: 'phan-cung',
    level: 'ThongHieu',
    question: 'Trên bo mạch chủ WINNFOX H510G không tích hợp đèn Debug LED. Khi bật nguồn máy tính, loa chẩn đoán Buzzer phát ra 1 tiếng bíp dài kèm 2 tiếng bíp ngắn liên tục. Theo chuẩn mã âm thanh AMI BIOS, mã lỗi này báo hiệu:',
    options: [
      'Máy khởi động bình thường thành công',
      'Lỗi bộ nhớ trong (RAM)',
      'Lỗi bộ điều khiển đồ họa / Card màn hình (VGA)',
      'Lỗi bàn phím không nhận'
    ],
    correctIndex: 2,
    explanation: 'Theo chuẩn AMI BIOS phổ biến: 1 bíp ngắn = Hệ thống POST thành công; 1 bíp dài 2 hoặc 3 bíp ngắn = Lỗi Card màn hình (VGA không nhận hoặc lỗi hiển thị); Bíp dài liên tục = Lỗi RAM.',
    subtopic: 'Mã âm thanh Buzzer BIOS'
  },
  {
    id: 'HSG_HW_09',
    category: 'phan-cung',
    level: 'VanDungCao',
    question: 'Thuật ngữ "VRM (Voltage Regulator Module)" trên bo mạch chủ đảm nhận vai trò trọng yếu nào?',
    options: [
      'Điều khiển các cổng xuất hình HDMI và DisplayPort',
      'Chuyển đổi điện áp 12V từ bộ nguồn thành mức điện áp siêu nhỏ chính xác (~1.1V - 1.35V) để cung cấp cho CPU hoạt động ổn định',
      'Quản lý kết nối mạng LAN Gigabit',
      'Lưu trữ các thiết lập cấu hình của chip BIOS'
    ],
    correctIndex: 1,
    explanation: 'VRM là mạch điều áp gồm các cuộn cảm (Choke), tụ điện và MOSFET. Nó nhận dòng 12V từ giắc 8-pin CPU của nguồn và hạ áp cực kỳ ổn định xuống mức 1V-1.35V cấp nguồn nuôi các nhân xử lý CPU.',
    subtopic: 'Kiến trúc Bo mạch chủ'
  },
  {
    id: 'HSG_HW_10',
    category: 'phan-cung',
    level: 'VanDung',
    question: 'Khi lắp ráp máy tính mới, vì sao KTV bắt buộc phải lắp các ốc đệm đồng (Standoff) vào thùng máy trước khi đặt bo mạch chủ lên và siết ốc?',
    options: [
      'Để nâng cao bo mạch giúp nhìn đèn LED đẹp hơn',
      'Để tạo khoảng cách cách điện, ngăn không cho các mối hàn sắc nhọn mặt dưới bo mạch tiếp xúc trực tiếp vào vỏ kim loại case gây chập cháy nguồn',
      'Để quạt hút gió thổi vào mặt sau bo mạch',
      'Để giúp cắm dây cáp màn hình vừa khít hơn'
    ],
    correctIndex: 1,
    explanation: 'Ốc chân đệm (Standoff) có nhiệm vụ cách điện tuyệt đối giữa mặt lưng bo mạch (nơi có hàng nghìn chân hàn thiếc dẫn điện) với khung kim loại dẫn điện của thùng case máy tính, triệt tiêu nguy cơ chập mạch làm nổ linh kiện.',
    subtopic: 'Quy trình cơ khí an toàn'
  },
];
