import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Thư mục lưu ảnh cục bộ
const targetDir = path.resolve(__dirname, "../public/images/chia-se-file");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Danh sách các ảnh kỹ thuật minh họa cho 5 bước chia sẻ file Windows 10
const images = [
  {
    name: "01-private-network.svg",
    title: "Chuyển Mạng Sang Private Network",
    step: "Bước 1",
    detail: "Windows Settings > Network & Internet > Chọn Private",
    accent: "#3b82f6",
    contentSvg: `
      <rect x="50" y="70" width="500" height="240" rx="16" fill="#1e293b" stroke="#475569" stroke-width="2"/>
      <text x="75" y="105" fill="#94a3b8" font-family="monospace" font-size="14" font-weight="bold">NETWORK PROFILE TYPE</text>
      
      <!-- Public Option -->
      <rect x="75" y="125" width="450" height="70" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
      <circle cx="105" cy="160" r="8" fill="none" stroke="#64748b" stroke-width="2"/>
      <text x="130" y="155" fill="#cbd5e1" font-family="sans-serif" font-size="14" font-weight="bold">Public (Chặn chia sẻ file & máy in)</text>
      <text x="130" y="175" fill="#64748b" font-family="sans-serif" font-size="11">Dành cho quán cafe, sân bay để bảo mật máy tính</text>
      
      <!-- Private Option (Selected) -->
      <rect x="75" y="210" width="450" height="75" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="2.5"/>
      <circle cx="105" cy="245" r="9" fill="#10b981"/>
      <circle cx="105" cy="245" r="4" fill="#ffffff"/>
      <text x="130" y="240" fill="#10b981" font-family="sans-serif" font-size="15" font-weight="bold">Private (Cho phép chia sẻ mạng LAN)</text>
      <text x="130" y="262" fill="#94a3b8" font-family="sans-serif" font-size="12">✓ Máy tính có thể nhìn thấy và truyền dữ liệu cho nhau</text>
    `
  },
  {
    name: "02-advanced-sharing.svg",
    title: "Cấu Hình Advanced Sharing Settings",
    step: "Bước 2",
    detail: "Bật Network Discovery & Tắt Password Protected",
    accent: "#10b981",
    contentSvg: `
      <rect x="50" y="60" width="500" height="260" rx="16" fill="#1e293b" stroke="#475569" stroke-width="2"/>
      <text x="75" y="95" fill="#94a3b8" font-family="monospace" font-size="13" font-weight="bold">ADVANCED SHARING SETTINGS</text>
      
      <g transform="translate(75, 115)">
        <rect width="450" height="40" rx="8" fill="#0f172a"/>
        <circle cx="20" cy="20" r="7" fill="#10b981"/>
        <text x="40" y="24" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="bold">Turn on network discovery</text>
      </g>
      
      <g transform="translate(75, 165)">
        <rect width="450" height="40" rx="8" fill="#0f172a"/>
        <circle cx="20" cy="20" r="7" fill="#10b981"/>
        <text x="40" y="24" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="bold">Turn on file and printer sharing</text>
      </g>
      
      <g transform="translate(75, 215)">
        <rect width="450" height="50" rx="8" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
        <circle cx="20" cy="25" r="7" fill="#f59e0b"/>
        <text x="40" y="22" fill="#f59e0b" font-family="sans-serif" font-size="13" font-weight="bold">Turn off password protected sharing</text>
        <text x="40" y="38" fill="#94a3b8" font-family="sans-serif" font-size="11">Cho phép vào thư mục nhanh, không đòi hỏi mật khẩu</text>
      </g>
    `
  },
  {
    name: "03-folder-permissions.svg",
    title: "Phân Quyền Tab Sharing (Everyone)",
    step: "Bước 3A",
    detail: "Properties > Sharing > Advanced Sharing > Permissions",
    accent: "#8b5cf6",
    contentSvg: `
      <rect x="50" y="60" width="500" height="260" rx="16" fill="#1e293b" stroke="#475569" stroke-width="2"/>
      <text x="75" y="95" fill="#94a3b8" font-family="monospace" font-size="13" font-weight="bold">PERMISSIONS FOR EVERYONE</text>
      
      <rect x="75" y="115" width="450" height="40" rx="8" fill="#0f172a" stroke="#64748b"/>
      <text x="95" y="140" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold">Group or user: Everyone</text>
      
      <g transform="translate(75, 170)">
        <text x="0" y="18" fill="#cbd5e1" font-family="sans-serif" font-size="13">Full Control (Toàn quyền)</text>
        <rect x="360" y="2" width="22" height="22" rx="4" fill="#10b981"/>
        <text x="365" y="18" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold">✓</text>
        
        <text x="0" y="48" fill="#cbd5e1" font-family="sans-serif" font-size="13">Change (Sửa, thêm, xóa file)</text>
        <rect x="360" y="32" width="22" height="22" rx="4" fill="#10b981"/>
        <text x="365" y="48" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold">✓</text>
        
        <text x="0" y="78" fill="#cbd5e1" font-family="sans-serif" font-size="13">Read (Chỉ đọc và copy file)</text>
        <rect x="360" y="62" width="22" height="22" rx="4" fill="#10b981"/>
        <text x="365" y="78" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold">✓</text>
      </g>
    `
  },
  {
    name: "04-security-tab.svg",
    title: "Cấp Quyền Tab Security NTFS (Poka-Yoke)",
    step: "Bước 3B",
    detail: "Properties > Security > Edit > Add Everyone > Full Control",
    accent: "#ec4899",
    contentSvg: `
      <rect x="50" y="60" width="500" height="260" rx="16" fill="#1e293b" stroke="#475569" stroke-width="2"/>
      <text x="75" y="95" fill="#f43f5e" font-family="monospace" font-size="13" font-weight="bold">SECURITY TAB (CHỐNG LỖI ACCESS DENIED)</text>
      
      <rect x="75" y="115" width="450" height="50" rx="8" fill="#0f172a" stroke="#f43f5e" stroke-width="1.5"/>
      <text x="95" y="137" fill="#f43f5e" font-family="sans-serif" font-size="13" font-weight="bold">1. Nhấn Add... ➔ Gõ chữ Everyone ➔ Check Names</text>
      <text x="95" y="153" fill="#94a3b8" font-family="sans-serif" font-size="11">Xác nhận đối tượng Everyone vào danh sách bảo mật</text>
      
      <rect x="75" y="180" width="450" height="120" rx="8" fill="#0f172a"/>
      <g transform="translate(95, 195)">
        <text x="0" y="20" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="bold">2. Tích chọn Full Control (Allow)</text>
        <text x="0" y="45" fill="#cbd5e1" font-family="sans-serif" font-size="12">• Modify: Có</text>
        <text x="0" y="65" fill="#cbd5e1" font-family="sans-serif" font-size="12">• Read & execute: Có</text>
        <text x="0" y="85" fill="#cbd5e1" font-family="sans-serif" font-size="12">• Write: Có</text>
        <rect x="340" y="5" width="22" height="22" rx="4" fill="#10b981"/>
        <text x="345" y="21" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold">✓</text>
      </g>
    `
  },
  {
    name: "05-run-ip-access.svg",
    title: "Truy Cập Qua Hộp Thoại Run \\\\IP",
    step: "Bước 4",
    detail: "Windows + R > Gõ \\\\192.168.1.50 > Nhấn Enter",
    accent: "#0ea5e9",
    contentSvg: `
      <rect x="50" y="70" width="500" height="240" rx="16" fill="#1e293b" stroke="#475569" stroke-width="2"/>
      <text x="75" y="105" fill="#38bdf8" font-family="monospace" font-size="13" font-weight="bold">HỘP THOẠI RUN (WINDOWS + R)</text>
      
      <!-- Run dialog simulation -->
      <rect x="75" y="125" width="450" height="90" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
      <text x="95" y="152" fill="#94a3b8" font-family="sans-serif" font-size="12">Type the name of a program, folder, document or Internet resource:</text>
      
      <rect x="95" y="165" width="350" height="36" rx="6" fill="#1e293b" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="110" y="189" fill="#ffffff" font-family="monospace" font-size="16" font-weight="bold">\\\\192.168.1.50</text>
      
      <rect x="455" y="165" width="55" height="36" rx="6" fill="#0ea5e9"/>
      <text x="470" y="188" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="bold">OK</text>
      
      <text x="75" y="250" fill="#10b981" font-family="sans-serif" font-size="13" font-weight="bold">➔ Mở tức thì toàn bộ thư mục được chia sẻ trong mạng LAN!</text>
    `
  }
];

// Hàm tạo ảnh SVG chất lượng cao
function generateSvg(item) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="100%" height="100%">
  <!-- Nền tối sang trọng chuẩn máy chiếu phòng Lab -->
  <rect width="600" height="360" rx="20" fill="#0f172a"/>
  
  <!-- Header thanh công cụ -->
  <rect width="600" height="48" rx="20" fill="#1e293b"/>
  <rect y="32" width="600" height="16" fill="#1e293b"/>
  
  <!-- 3 Chấm điều khiển macOS/Linux -->
  <circle cx="28" cy="24" r="6" fill="#ef4444"/>
  <circle cx="48" cy="24" r="6" fill="#f59e0b"/>
  <circle cx="68" cy="24" r="6" fill="#10b981"/>
  
  <!-- Tiêu đề sơ đồ -->
  <text x="100" y="29" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="bold">${item.step}: ${item.title}</text>
  <rect x="460" y="12" width="120" height="24" rx="6" fill="${item.accent}" fill-opacity="0.2"/>
  <text x="475" y="28" fill="${item.accent}" font-family="monospace" font-size="11" font-weight="bold">KTV LAB GUIDE</text>
  
  <!-- Nội dung chi tiết từng bước -->
  ${item.contentSvg}
  
  <!-- Chú thích footer -->
  <text x="50" y="340" fill="#64748b" font-family="sans-serif" font-size="11">${item.detail}</text>
</svg>`;
}

console.log("Đang tạo và lưu các hình ảnh minh họa kỹ thuật vào: " + targetDir);

for (const img of images) {
  const filePath = path.join(targetDir, img.name);
  const svgContent = generateSvg(img);
  fs.writeFileSync(filePath, svgContent, "utf8");
  console.log(`✓ Đã lưu thành công: ${img.name}`);
}

console.log("\nHoàn tất 100% việc tạo các hình ảnh minh họa cho bài chia sẻ file mạng LAN!");
