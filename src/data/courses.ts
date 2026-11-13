export interface Chapter {
  slug: string;
  title: string;
  description: string;
}

export interface Course {
  slug: string;
  name: string;
  icon: string;
  desc: string;
  subdomain: string;
  chapters: Chapter[];
}

export const COURSES: Course[] = [
  {
    slug: 'nang-luc-so',
    name: 'Năng lực số',
    icon: '💻',
    desc: 'Kỹ năng sử dụng công nghệ số trong học tập, an toàn thông tin và giải quyết công việc',
    subdomain: 'nanglucso',
    chapters: [
      { slug: 'chuong-1', title: 'Chương 1: Tổng quan về Năng lực số', description: 'Khái niệm, các khung năng lực số chuẩn và vai trò trong kỷ nguyên số' },
      { slug: 'chuong-2', title: 'Chương 2: Sử dụng máy tính & Hệ điều hành', description: 'Quản lý tệp tin, phím tắt và tối ưu môi trường làm việc' },
      { slug: 'chuong-3', title: 'Chương 3: Khai thác Internet & Thư điện tử an toàn', description: 'Tìm kiếm nâng cao, gửi nhận email và cộng tác trực tuyến' },
      { slug: 'chuong-4', title: 'Chương 4: An toàn thông tin cá nhân & Đạo đức số', description: 'Mật khẩu mạnh, 2FA, nhận diện lừa đảo mạng và bản quyền' },
      { slug: 'chuong-5', title: 'Chương 5: Bảng tính & Xử lý dữ liệu', description: 'Lập bảng tính, định dạng và các hàm tính toán cơ bản' },
      { slug: 'chuong-6', title: 'Chương 6: Ứng dụng AI trong học tập', description: 'Sử dụng công cụ AI hỗ trợ tìm kiếm tài liệu và tối ưu học tập' },
    ],
  },
  {
    slug: 'kien-truc-may-tinh',
    name: 'Kiến trúc máy tính và Hệ điều hành',
    icon: '🖥️',
    desc: 'Cấu trúc hệ thống phần cứng, bộ vi xử lý và nguyên lý vận hành của hệ điều hành',
    subdomain: 'kientruc',
    chapters: [
      { slug: 'chuong-1', title: 'Chương 1: Lịch sử & Phân loại máy tính', description: 'Các thế hệ máy tính và kiến trúc Von Neumann kinh điển' },
      { slug: 'chuong-2', title: 'Chương 2: Hệ thống số & Mã hóa dữ liệu', description: 'Hệ nhị phân, thập lục phân, mã ASCII và Unicode' },
      { slug: 'chuong-3', title: 'Chương 3: Bộ vi xử lý (CPU) & Chu kỳ lệnh', description: 'Kiến trúc ALU, CU, thanh ghi và chu kỳ Fetch-Decode-Execute' },
      { slug: 'chuong-4', title: 'Chương 4: Hệ thống phân cấp bộ nhớ', description: 'RAM, ROM, Cache L1/L2/L3 và bộ nhớ ảo' },
      { slug: 'chuong-5', title: 'Chương 5: Hệ thống Bus & Giao tiếp I/O', description: 'Bus dữ liệu, địa chỉ, điều khiển và thiết bị ngoại vi' },
      { slug: 'chuong-6', title: 'Chương 6: Tổng quan Hệ điều hành', description: 'Chức năng, kiến trúc nhân Kernel và phân loại HĐH' },
      { slug: 'chuong-7', title: 'Chương 7: Quản lý Tiến trình & Đa nhiệm', description: 'Tiến trình, luồng, thuật toán lập lịch CPU và đồng bộ' },
      { slug: 'chuong-8', title: 'Chương 8: Quản lý Bộ nhớ & Hệ thống tệp', description: 'Phân trang, phân đoạn, cấu trúc NTFS, ext4, FAT32' },
    ],
  },
  {
    slug: 'phan-cung-may-tinh',
    name: 'Phần cứng máy tính',
    icon: '🔧',
    desc: 'Linh kiện phần cứng, chẩn đoán, lắp ráp, bảo trì và sửa chữa máy tính để bàn, laptop',
    subdomain: 'phancung',
    chapters: [
      { slug: 'chuong-1', title: 'Chương 1: Tổng quan linh kiện phần cứng PC', description: 'Nhận biết 6 khối linh kiện chính và nguyên tắc an toàn tĩnh điện ESD' },
      { slug: 'chuong-2', title: 'Chương 2: Bo mạch chủ (Mainboard) & Socket', description: 'Chipset, socket CPU, các khe mở rộng PCIe, giao tiếp nguồn' },
      { slug: 'chuong-3', title: 'Chương 3: Bộ vi xử lý CPU & Tản nhiệt', description: 'Thông số xung nhịp, số nhân/luồng, keo tản nhiệt và quạt tản' },
      { slug: 'chuong-4', title: 'Chương 4: Bộ nhớ RAM & Thiết bị lưu trữ', description: 'Chuẩn DDR4/DDR5, ổ cứng HDD cơ khí và ổ SSD M.2 NVMe' },
      { slug: 'chuong-5', title: 'Chương 5: Card đồ họa (VGA) & Bộ nguồn (PSU)', description: 'Công suất thực, chuẩn 80 Plus và card màn hình rời' },
      { slug: 'chuong-6', title: 'Chương 6: Quy trình lắp ráp máy tính hoàn chỉnh', description: 'Lắp ráp từng bước, đi dây gọn gàng và kiểm tra mã POST' },
      { slug: 'chuong-7', title: 'Chương 7: Chẩn đoán & Xử lý sự cố phần cứng', description: 'Mã Beep BIOS, sự cố không lên hình, sập nguồn, treo máy' },
    ],
  },
  {
    slug: 'mang-can-ban',
    name: 'Mạng căn bản',
    icon: '🌐',
    desc: 'Nền tảng mạng máy tính, mô hình OSI/TCP-IP, địa chỉ IPv4/IPv6 và chia mạng con',
    subdomain: 'mang',
    chapters: [
      { slug: 'chuong-1', title: 'Chương 1: Tổng quan về Mạng máy tính', description: 'Khái niệm, mạng LAN/MAN/WAN và các cấu trúc Topology' },
      { slug: 'chuong-2', title: 'Chương 2: Mô hình tham chiếu OSI & TCP/IP', description: '7 tầng OSI, 4 tầng TCP/IP và quá trình đóng gói dữ liệu' },
      { slug: 'chuong-3', title: 'Chương 3: Cáp mạng & Kỹ thuật bấm cáp', description: 'Cáp xoắn đôi UTP/STP, chuẩn T568A/B và cáp quang' },
      { slug: 'chuong-4', title: 'Chương 4: Địa chỉ IPv4 & Chia mạng con Subnetting', description: 'Các lớp địa chỉ IP A/B/C, Subnet Mask và kỹ thuật chia FLSM' },
      { slug: 'chuong-5', title: 'Chương 5: Thiết bị mạng & Giao thức cơ bản', description: 'Hub, Switch, Router và các giao thức ARP, ICMP (Ping)' },
      { slug: 'chuong-6', title: 'Chương 6: Các dịch vụ mạng nền tảng', description: 'Cấu hình và nguyên lý hoạt động của DHCP, DNS' },
    ],
  },
  {
    slug: 'thiet-ke-quan-tri-lan-wan',
    name: 'Thiết kế và Quản trị mạng LAN/WAN',
    icon: '🏗️',
    desc: 'Mô hình phân cấp 3 tầng Cisco, Switch VLAN, Trunking, VTP, STP, Router on a stick, NAT và VPN',
    subdomain: 'lanwan',
    chapters: [
      { slug: 'chuong-1', title: 'Chương 1: Mô hình thiết kế mạng phân cấp 3 lớp', description: 'Thiết kế lớp Core, Distribution, Access chuẩn Cisco' },
      { slug: 'chuong-2', title: 'Chương 2: Cấu hình Switch, VLAN & Trunking', description: 'Tạo VLAN, gán port Access, chuẩn đóng gói 802.1Q' },
      { slug: 'chuong-3', title: 'Chương 3: Định tuyến liên VLAN (Inter-VLAN)', description: 'Mô hình Router-on-a-Stick và Switch Layer 3' },
      { slug: 'chuong-4', title: 'Chương 4: Chống lặp vòng Spanning Tree (STP)', description: 'Nguyên lý Spanning Tree Protocol, bầu chọn Root Bridge' },
      { slug: 'chuong-5', title: 'Chương 5: Cấu hình Định tuyến Tĩnh & Động OSPF', description: 'Static Route, Default Route và định tuyến động OSPF đơn vùng' },
      { slug: 'chuong-6', title: 'Chương 6: Danh sách kiểm soát truy cập (ACL)', description: 'Standard ACL và Extended ACL kiểm soát bảo mật lưu lượng' },
      { slug: 'chuong-7', title: 'Chương 7: Biên dịch địa chỉ mạng (NAT / PAT)', description: 'Static NAT, Dynamic NAT và Port Address Translation' },
      { slug: 'chuong-8', title: 'Chương 8: Kỹ thuật kết nối WAN & Đường hầm VPN', description: 'Đường truyền diện rộng leased-line và VPN Site-to-Site' },
    ],
  },
  {
    slug: 'quan-tri-windows-linux',
    name: 'Quản trị Windows Server/Linux và Ảo hóa',
    icon: '🖧',
    desc: 'Quản trị dịch vụ mạng AD DS, DNS, DHCP trên Windows Server, máy chủ Linux và nền tảng ảo hóa',
    subdomain: 'winlinux',
    chapters: [
      { slug: 'chuong-1', title: 'Chương 1: Tổng quan Hệ điều hành Server', description: 'So sánh Client OS và Server OS, cài đặt Windows Server' },
      { slug: 'chuong-2', title: 'Chương 2: Dịch vụ thư mục Active Directory (AD DS)', description: 'Nâng cấp Domain Controller, tạo Domain Forest' },
      { slug: 'chuong-3', title: 'Chương 3: Quản trị User, Nhóm và Đơn vị OU', description: 'Phân quyền, quản lý tài khoản người dùng và máy tính' },
      { slug: 'chuong-4', title: 'Chương 4: Chính sách nhóm Group Policy (GPO)', description: 'Thiết lập chính sách bảo mật, khóa USB, đặt hình nền tập trung' },
      { slug: 'chuong-5', title: 'Chương 5: Quản trị Dịch vụ mạng DHCP & DNS Server', description: 'Phạm vi cấp phát Scope, Reservation và phân giải tên miền' },
      { slug: 'chuong-6', title: 'Chương 6: Quản trị hệ điều hành Linux CLI', description: 'Lệnh quản lý tập tin, thư mục, tiến trình và người dùng trên Ubuntu' },
      { slug: 'chuong-7', title: 'Chương 7: Triển khai Dịch vụ mạng trên Linux', description: 'Cài đặt SSH, Web Server Nginx/Apache và phân quyền tập tin' },
      { slug: 'chuong-8', title: 'Chương 8: Tường lửa & Bảo mật hệ thống Linux', description: 'Cấu hình UFW / Iptables và giám sát bảo mật hệ thống' },
      { slug: 'chuong-9', title: 'Chương 9: Công nghệ Ảo hóa VMware / Hyper-V', description: 'Khái niệm Hypervisor Type 1, Type 2 và quản lý máy ảo VM' },
      { slug: 'chuong-10', title: 'Chương 10: Sao lưu & Phục hồi thảm họa', description: 'Chiến lược sao lưu 3-2-1, tạo bản chụp Snapshot và Disaster Recovery' },
    ],
  },
];
