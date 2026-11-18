import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const targetDirs = [
  path.resolve("public/images/ol-01"),
  path.resolve("mang-may-tinh/public/images/ol-01")
];

const W = 1200;
const H = 750;

async function buildCompareImage() {
  console.log("Generating 3-brand comparison infographic: MSI vs ASUS vs Winnfox...");

  const getBase64 = async (filename, width, height) => {
    const fullPath = path.join(targetDirs[0], filename);
    if (!fs.existsSync(fullPath)) return "";
    const buf = await sharp(fullPath)
      .resize(width, height, { fit: "contain", background: "#0f172a" })
      .jpeg({ quality: 80 })
      .toBuffer();
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  };

  const msiB64 = await getBase64("main-h510.jpg", 340, 220);
  const asusB64 = await getBase64("main-asus-h510.jpg", 340, 220);
  const winnfoxB64 = await getBase64("main-winnfox-h510.jpg", 340, 220);

  const svg = `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0a0f1d"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="6" stdDeviation="10" flood-opacity="0.4"/>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="${W}" height="${H}" fill="url(#bg)"/>

    <!-- Grid lines -->
    <path d="M0,80 L1200,80" stroke="#334155" stroke-width="1" stroke-dasharray="6 4"/>
    <path d="M400,90 L400,720" stroke="#334155" stroke-width="1" stroke-dasharray="4 4"/>
    <path d="M800,90 L800,720" stroke="#334155" stroke-width="1" stroke-dasharray="4 4"/>

    <!-- Header -->
    <rect x="30" y="20" width="160" height="34" rx="8" fill="#e11d48"/>
    <text x="110" y="42" font-family="Arial, sans-serif" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">PHÒNG THỰC HÀNH</text>

    <text x="210" y="45" font-family="Arial, sans-serif" font-size="22" font-weight="900" fill="#f8fafc">BẢN ĐỒ SO SÁNH 3 DÒNG MAINBOARD H510 PHÒNG LAB</text>
    <text x="210" y="66" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8">Bản quyền giảng dạy KTV · Phím tắt BIOS/Boot Menu · Chuẩn lẫy RAM &amp; Cụm F_PANEL</text>

    <!-- COLUMN 1: MSI H510M-A PRO -->
    <g transform="translate(30, 95)" filter="url(#shadow)">
      <rect width="360" height="625" rx="16" fill="#0f172a" stroke="#e11d48" stroke-width="2"/>
      
      <!-- Header Badge -->
      <rect x="15" y="15" width="330" height="42" rx="10" fill="#881337"/>
      <text x="180" y="42" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle">1. MSI H510M-A PRO</text>

      <!-- Image Box -->
      <rect x="15" y="68" width="330" height="200" rx="10" fill="#020617" stroke="#334155"/>
      ${msiB64 ? `<image href="${msiB64}" x="20" y="73" width="320" height="190" preserveAspectRatio="xMidYMid meet"/>` : ''}

      <!-- Spec Cards -->
      <rect x="15" y="280" width="330" height="75" rx="10" fill="#1e293b"/>
      <text x="28" y="302" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#f43f5e">🔑 PHÍM TẮT BOOT &amp; BIOS:</text>
      <text x="28" y="324" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff">• BIOS Setup: <tspan fill="#38bdf8">Phím Del</tspan></text>
      <text x="28" y="344" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff">• Boot Menu: <tspan fill="#fbbf24">Phím F11</tspan></text>

      <rect x="15" y="365" width="330" height="85" rx="10" fill="#1e293b"/>
      <text x="28" y="387" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#f43f5e">💡 BÁO LỖI: EZ DEBUG LED</text>
      <text x="28" y="408" font-family="Arial, sans-serif" font-size="12" fill="#cbd5e1">Có 4 đèn LED chẩn đoán (CPU, DRAM,</text>
      <text x="28" y="426" font-family="Arial, sans-serif" font-size="12" fill="#cbd5e1">VGA, BOOT). Đèn dừng ở đâu = lỗi ở đó!</text>
      <text x="28" y="444" font-family="Arial, sans-serif" font-size="11" fill="#10b981">➔ Cực kỳ dễ sửa cho học viên mới.</text>

      <rect x="15" y="460" width="330" height="75" rx="10" fill="#1e293b"/>
      <text x="28" y="482" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#f43f5e">🕹️ LẪY RAM &amp; F_PANEL:</text>
      <text x="28" y="502" font-family="Arial, sans-serif" font-size="12" fill="#cbd5e1">• Khe RAM: 1 lẫy trên gạt (1-Side Latch)</text>
      <text x="28" y="522" font-family="Arial, sans-serif" font-size="12" fill="#cbd5e1">• Cụm F_PANEL: Ký hiệu <tspan fill="#38bdf8" font-weight="bold">JFP1</tspan> (9 pin)</text>

      <rect x="15" y="545" width="330" height="65" rx="10" fill="#881337" opacity="0.3"/>
      <rect x="15" y="545" width="330" height="65" rx="10" fill="none" stroke="#f43f5e"/>
      <text x="28" y="567" font-family="Arial, sans-serif" font-size="11" font-weight="900" fill="#fca5a5">⚠️ LƯU Ý KTV PHÒNG LAB:</text>
      <text x="28" y="586" font-family="Arial, sans-serif" font-size="11" fill="#fecdd3">Dòng bo mạch ổn định cao, chân M.2</text>
      <text x="28" y="602" font-family="Arial, sans-serif" font-size="11" fill="#fecdd3">hỗ trợ PCIe 3.0 x4 tốc độ cao.</text>
    </g>

    <!-- COLUMN 2: ASUS PRIME H510M-K -->
    <g transform="translate(420, 95)" filter="url(#shadow)">
      <rect width="360" height="625" rx="16" fill="#0f172a" stroke="#2563eb" stroke-width="2"/>
      
      <!-- Header Badge -->
      <rect x="15" y="15" width="330" height="42" rx="10" fill="#1e3a8a"/>
      <text x="180" y="42" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle">2. ASUS PRIME H510M-K</text>

      <!-- Image Box -->
      <rect x="15" y="68" width="330" height="200" rx="10" fill="#020617" stroke="#334155"/>
      ${asusB64 ? `<image href="${asusB64}" x="20" y="73" width="320" height="190" preserveAspectRatio="xMidYMid meet"/>` : ''}

      <!-- Spec Cards -->
      <rect x="15" y="280" width="330" height="75" rx="10" fill="#1e293b"/>
      <text x="28" y="302" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#60a5fa">🔑 PHÍM TẮT BOOT &amp; BIOS:</text>
      <text x="28" y="324" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff">• BIOS Setup: <tspan fill="#38bdf8">Phím Del hoặc F2</tspan></text>
      <text x="28" y="344" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff">• Boot Menu: <tspan fill="#fbbf24">Phím F8 (Đặc trưng ASUS)</tspan></text>

      <rect x="15" y="365" width="330" height="85" rx="10" fill="#1e293b"/>
      <text x="28" y="387" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#60a5fa">💡 BÁO LỖI: Q-LED CORE / BUZZER</text>
      <text x="28" y="408" font-family="Arial, sans-serif" font-size="12" fill="#cbd5e1">Báo trạng thái qua nhịp nháy đèn Power LED</text>
      <text x="28" y="426" font-family="Arial, sans-serif" font-size="12" fill="#cbd5e1">hoặc cắm Loa Buzzer nghe tiếng bíp.</text>
      <text x="28" y="444" font-family="Arial, sans-serif" font-size="11" fill="#38bdf8">➔ Bền bỉ với công nghệ 5X Protection III.</text>

      <rect x="15" y="460" width="330" height="75" rx="10" fill="#1e293b"/>
      <text x="28" y="482" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#60a5fa">🕹️ LẪY RAM &amp; F_PANEL:</text>
      <text x="28" y="502" font-family="Arial, sans-serif" font-size="12" fill="#cbd5e1">• Khe RAM: Công nghệ <tspan fill="#38bdf8" font-weight="bold">Q-DIMM</tspan> (1 lẫy)</text>
      <text x="28" y="522" font-family="Arial, sans-serif" font-size="12" fill="#cbd5e1">• Cụm F_PANEL: In nhãn <tspan fill="#38bdf8" font-weight="bold">PANEL</tspan> (10-1 pin)</text>

      <rect x="15" y="545" width="330" height="65" rx="10" fill="#1e3a8a" opacity="0.3"/>
      <rect x="15" y="545" width="330" height="65" rx="10" fill="none" stroke="#60a5fa"/>
      <text x="28" y="567" font-family="Arial, sans-serif" font-size="11" font-weight="900" fill="#93c5fd">⚠️ LƯU Ý KTV PHÒNG LAB:</text>
      <text x="28" y="586" font-family="Arial, sans-serif" font-size="11" fill="#bfdbfe">Khi boot USB cài Windows, luôn bấm <tspan font-weight="bold">F8</tspan></text>
      <text x="28" y="602" font-family="Arial, sans-serif" font-size="11" fill="#bfdbfe">(tránh nhầm với F11 của MSI).</text>
    </g>

    <!-- COLUMN 3: WINNFOX H510G -->
    <g transform="translate(810, 95)" filter="url(#shadow)">
      <rect width="360" height="625" rx="16" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
      
      <!-- Header Badge -->
      <rect x="15" y="15" width="330" height="42" rx="10" fill="#064e3b"/>
      <text x="180" y="42" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle">3. WINNFOX H510G / PRO</text>

      <!-- Image Box -->
      <rect x="15" y="68" width="330" height="200" rx="10" fill="#020617" stroke="#334155"/>
      ${winnfoxB64 ? `<image href="${winnfoxB64}" x="20" y="73" width="320" height="190" preserveAspectRatio="xMidYMid meet"/>` : ''}

      <!-- Spec Cards -->
      <rect x="15" y="280" width="330" height="75" rx="10" fill="#1e293b"/>
      <text x="28" y="302" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#34d399">🔑 PHÍM TẮT BOOT &amp; BIOS:</text>
      <text x="28" y="324" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff">• BIOS Setup: <tspan fill="#38bdf8">Phím Del</tspan></text>
      <text x="28" y="344" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff">• Boot Menu: <tspan fill="#fbbf24">Phím F11 hoặc F7 (AMI BIOS)</tspan></text>

      <rect x="15" y="365" width="330" height="85" rx="10" fill="#1e293b"/>
      <text x="28" y="387" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#34d399">💡 BÁO LỖI: LOA BUZZER BẮT BUỘC</text>
      <text x="28" y="408" font-family="Arial, sans-serif" font-size="12" fill="#cbd5e1">Không có dàn đèn LED báo lỗi phụ.</text>
      <text x="28" y="426" font-family="Arial, sans-serif" font-size="12" fill="#cbd5e1">Bắt buộc KTV phải cắm Loa Buzzer vào</text>
      <text x="28" y="444" font-family="Arial, sans-serif" font-size="11" fill="#fbbf24">chân SPEAKER để nghe mã bíp chẩn đoán.</text>

      <rect x="15" y="460" width="330" height="75" rx="10" fill="#1e293b"/>
      <text x="28" y="482" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#34d399">🕹️ LẪY RAM &amp; F_PANEL:</text>
      <text x="28" y="502" font-family="Arial, sans-serif" font-size="12" fill="#cbd5e1">• Khe RAM: Thường có 2 ngàm gạt 2 đầu</text>
      <text x="28" y="522" font-family="Arial, sans-serif" font-size="12" fill="#cbd5e1">• Cụm F_PANEL: 9 pin in chữ <tspan fill="#34d399" font-weight="bold">F_PANEL</tspan></text>

      <rect x="15" y="545" width="330" height="65" rx="10" fill="#064e3b" opacity="0.3"/>
      <rect x="15" y="545" width="330" height="65" rx="10" fill="none" stroke="#34d399"/>
      <text x="28" y="567" font-family="Arial, sans-serif" font-size="11" font-weight="900" fill="#6ee7b7">⚠️ LƯU Ý KTV PHÒNG LAB:</text>
      <text x="28" y="586" font-family="Arial, sans-serif" font-size="11" fill="#a7f3d0">Phổ biến trong phòng lab dạy nghề nhờ</text>
      <text x="28" y="602" font-family="Arial, sans-serif" font-size="11" fill="#a7f3d0">giá rẻ. Kích thước gọn, cẩn thận chân ốc.</text>
    </g>
  </svg>
  `;

  for (const dir of targetDirs) {
    const outPath = path.join(dir, "main-h510-compare.jpg");
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90 })
      .toFile(outPath);
    console.log("Saved compare image to:", outPath);
  }
}

buildCompareImage().catch(console.error);
