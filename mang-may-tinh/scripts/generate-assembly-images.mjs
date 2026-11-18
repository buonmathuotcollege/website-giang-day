import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const targetDir = path.resolve("public/images/ol-01");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const W = 1200;
const H = 750;

async function buildAssemblyImages() {
  console.log("Generating dedicated Disassembly, Assembly & Detailed Skills images...");

  // Load existing image base64 if needed
  const getBase64 = async (filename, width, height, fit = "contain") => {
    const fullPath = path.join(targetDir, filename);
    if (!fs.existsSync(fullPath)) return "";
    const buf = await sharp(fullPath)
      .resize(width, height, { fit, background: "#0b0f19" })
      .jpeg({ quality: 80 })
      .toBuffer();
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  };

  const ramB64 = await getBase64("ram-ddr4.jpg", 520, 320, "cover");
  const vgaB64 = await getBase64("vga-gt730.jpg", 520, 320, "cover");
  const fpanelB64 = await getBase64("fpanel-header.jpg", 520, 320, "cover");
  const cmosB64 = await getBase64("pin-cmos.jpg", 520, 320, "cover");
  const mainB64 = await getBase64("main-h510.jpg", 520, 320, "contain");

  // =========================================================================
  // 1. guide-clean-ram-slot.jpg: Vệ sinh chân và khe RAM DDR4
  // =========================================================================
  {
    const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgR" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#090d16"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
        <filter id="sh" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" flood-opacity="0.35"/>
        </filter>
      </defs>

      <rect width="${W}" height="${H}" fill="url(#bgR)"/>

      <!-- Header Title -->
      <rect x="50" y="25" width="1100" height="75" rx="12" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
      <text x="80" y="58" fill="#60a5fa" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">KỸ NĂNG 1: QUY TRÌNH VỆ SINH CHÂN VÀ KHE CẮM RAM DDR4 (PHÒNG LAB H510)</text>
      <text x="80" y="82" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Chi tiết thao tác chà gôm học sinh, quét sạch mạt bụi trong khe cắm và cảnh báo sai sót làm gãy ngàm</text>

      <!-- LEFT: Real Photo with annotations -->
      <g transform="translate(60, 120)" filter="url(#sh)">
        <rect width="550" height="380" rx="16" fill="#0b0f19" stroke="#475569" stroke-width="2"/>
        ${ramB64 ? `<image href="${ramB64}" x="15" y="15" width="520" height="320"/>` : `<rect x="15" y="15" width="520" height="320" fill="#1e293b"/>`}

        <!-- Annotation Badges -->
        <g transform="translate(40, 260)">
          <rect width="210" height="48" rx="8" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="105" y="22" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">CHÀ GÔM TRẮNG 2 MẶT</text>
          <text x="105" y="38" fill="#bae6fd" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">Đánh bay lớp xỉn màu oxy hóa</text>
        </g>

        <g transform="translate(290, 260)">
          <rect width="220" height="48" rx="8" fill="#b45309" stroke="#facc15" stroke-width="1.5"/>
          <text x="110" y="22" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">RÃNH KHUYẾT LỆCH DDR4</text>
          <text x="110" y="38" fill="#fef08a" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">Soi đúng chiều rãnh - Không ấn cố</text>
        </g>
      </g>

      <!-- RIGHT: Step-by-Step Instructions -->
      <g transform="translate(640, 120)" filter="url(#sh)">
        <rect width="500" height="380" rx="16" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="30" y="35" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold">4 BƯỚC VỆ SINH CHUẨN KỸ THUẬT VIÊN:</text>

        <g transform="translate(25, 55)">
          <rect width="450" height="65" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="24" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">Bước 1: Rút điện, mở 2 ngàm khóa 2 đầu</text>
          <text x="15" y="44" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Dùng 2 ngón tay cái bẻ 2 ngàm khóa góc 45°. Nhấc thẳng thanh RAM ra.</text>
        </g>

        <g transform="translate(25, 130)">
          <rect width="450" height="65" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="24" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">Bước 2: Chà gôm học sinh trên chân đồng</text>
          <text x="15" y="44" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Đặt thanh RAM trên mặt phẳng khô. Chà gôm đều tay trên hàng chân đồng vàng.</text>
        </g>

        <g transform="translate(25, 205)">
          <rect width="450" height="65" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="24" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">Bước 3: Dọn sạch mạt gôm trong khe cắm</text>
          <text x="15" y="44" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">BẮT BUỘC dùng cọ mềm hoặc bóng thổi quét sạch mạt gôm rơi trong khe RAM.</text>
        </g>

        <g transform="translate(25, 280)">
          <rect width="450" height="75" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="24" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="900">Bước 4: Cắm lại nghe tiếng 'TÁCH' dứt khoát</text>
          <text x="15" y="44" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Soi đúng rãnh khuyết, ấn thẳng đều 2 đầu thanh RAM bằng 2 ngón tay cái.</text>
          <text x="15" y="60" fill="#a7f3d0" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">Hai ngàm khóa sẽ tự động ôm chặt vào mép thanh RAM.</text>
        </g>
      </g>

      <!-- Bottom: Common Pitfalls & Mistakes Warning -->
      <g transform="translate(60, 520)">
        <rect width="1080" height="195" rx="12" fill="#450a0a" stroke="#ef4444" stroke-width="2"/>
        <text x="25" y="32" fill="#fca5a5" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="900">⚠️ NHỮNG SAI SÓT DỄ MẮC PHẢI KHI VỆ SINH &amp; CẮM RAM (POKA-YOKE):</text>

        <g transform="translate(25, 48)">
          <rect width="330" height="125" rx="8" fill="#1e1b4b" stroke="#6366f1"/>
          <text x="15" y="25" fill="#f87171" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">❌ Sai lầm 1: Ấn cố khi lệch rãnh</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• DDR4 rãnh lệch một bên (không giữa).</text>
          <text x="15" y="66" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Cắm ngược chiều mà đè mạnh làm toác</text>
          <text x="15" y="84" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">  gờ nhựa khe RAM, cong chân kim đồng!</text>
          <text x="15" y="105" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">👉 Thấy cộm tay là dừng ngay, đổi chiều.</text>
        </g>

        <g transform="translate(375, 48)">
          <rect width="330" height="125" rx="8" fill="#1e1b4b" stroke="#6366f1"/>
          <text x="15" y="25" fill="#f87171" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">❌ Sai lầm 2: Để mạt gôm kẹt trong khe</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Chà gôm xong không quét sạch mạt tẩy.</text>
          <text x="15" y="66" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Mạt cao su kẹt giữa chân mạ vàng và chấu tiếp xúc</text>
          <text x="15" y="84" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">  làm máy kêu bíp liên tục hoặc màn đen!</text>
          <text x="15" y="105" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">👉 Luôn dùng cọ quét sạch khe trước khi cắm.</text>
        </g>

        <g transform="translate(725, 48)">
          <rect width="330" height="125" rx="8" fill="#1e1b4b" stroke="#6366f1"/>
          <text x="15" y="25" fill="#f87171" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">❌ Sai lầm 3: Cắm chập chờn 1 đầu</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Ấn 1 đầu vào khớp nhưng đầu kia bị vênh.</text>
          <text x="15" y="66" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Ngàm khóa chưa ôm sát khấc giữ thanh RAM.</text>
          <text x="15" y="84" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Bật máy quạt quay nhưng không nhận đủ RAM.</text>
          <text x="15" y="105" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">👉 Dùng 2 ngón cái ấn đều 2 đầu kêu TÁCH.</text>
        </g>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(targetDir, "guide-clean-ram-slot.jpg"));
    console.log("Created guide-clean-ram-slot.jpg");
  }

  // =========================================================================
  // 2. guide-clean-vga-pcie.jpg: Vệ sinh chân & khe Card đồ họa rời GT 730
  // =========================================================================
  {
    const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgV" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
      </defs>

      <rect width="${W}" height="${H}" fill="url(#bgV)"/>

      <!-- Header Title -->
      <rect x="50" y="25" width="1100" height="75" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
      <text x="80" y="58" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">KỸ NĂNG 2: THÁO LẮP &amp; VỆ SINH KHE PCIE X16 CARD RỜI NVIDIA GT 730</text>
      <text x="80" y="82" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Mở lẫy khóa đuôi khe PCIe trước khi rút, chà sạch chân mạ đồng và bắt buộc siết ốc nẹp case chống xệ card</text>

      <!-- LEFT: Photo Card GT 730 -->
      <g transform="translate(60, 120)">
        <rect width="550" height="380" rx="16" fill="#0b0f19" stroke="#475569" stroke-width="2"/>
        ${vgaB64 ? `<image href="${vgaB64}" x="15" y="15" width="520" height="320"/>` : `<rect x="15" y="15" width="520" height="320" fill="#1e293b"/>`}

        <!-- Overlay badging -->
        <g transform="translate(40, 260)">
          <rect width="220" height="48" rx="8" fill="#047857" stroke="#34d399" stroke-width="1.5"/>
          <text x="110" y="22" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">LẪY KHÓA ĐUÔI PCIE X16</text>
          <text x="110" y="38" fill="#a7f3d0" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">Gạt mở lẫy trước khi nhấc card</text>
        </g>

        <g transform="translate(290, 260)">
          <rect width="220" height="48" rx="8" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="110" y="22" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">ỐC NẸP SẮT VỎ THÙNG MÁY</text>
          <text x="110" y="38" fill="#bae6fd" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">Bắt chặt chống xệ &amp; tiếp mass an toàn</text>
        </g>
      </g>

      <!-- RIGHT: 4 Steps for Discrete GPU -->
      <g transform="translate(640, 120)">
        <rect width="500" height="380" rx="16" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="30" y="35" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold">QUY TRÌNH THAO TÁC CARD ĐỒ HỌA RỜI:</text>

        <g transform="translate(25, 55)">
          <rect width="450" height="65" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="24" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">1. Tháo ốc nẹp case &amp; Nhả lẫy khóa đuôi khe PCIe</text>
          <text x="15" y="44" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Vặn ốc giữ thanh nẹp sắt. Lấy ngón tay đè nhẹ lẫy đuôi khe PCIe x16.</text>
        </g>

        <g transform="translate(25, 130)">
          <rect width="450" height="65" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="24" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">2. Nhấc thẳng card &amp; Vệ sinh chân mạ đồng</text>
          <text x="15" y="44" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Rút thẳng card ra ngoài. Dùng gôm học sinh lau sạch hàng chân PCIe mạ vàng.</text>
        </g>

        <g transform="translate(25, 205)">
          <rect width="450" height="65" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="24" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">3. Thổi sạch bụi khe cắm PCIe x16 bo mạch</text>
          <text x="15" y="44" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Dùng cọ quét và bóng thổi làm sạch khe cắm trên bo mạch H510.</text>
        </g>

        <g transform="translate(25, 280)">
          <rect width="450" height="75" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="24" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="900">4. Cắm ngập chân, khóa lẫy &amp; Siết chặt ốc nẹp</text>
          <text x="15" y="44" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Ấn card ngập sâu vào khe PCIe, lẫy đuôi tự nhảy gài khóa.</text>
          <text x="15" y="60" fill="#a7f3d0" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">BẮT BUỘC siết chặt ốc nẹp case chống rung lắc khi cắm cáp.</text>
        </g>
      </g>

      <!-- Bottom Warnings -->
      <g transform="translate(60, 520)">
        <rect width="1080" height="195" rx="12" fill="#450a0a" stroke="#ef4444" stroke-width="2"/>
        <text x="25" y="32" fill="#fca5a5" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="900">⚠️ NHỮNG SAI SÓT CHẾT NGƯỜI KHI THAO TÁC CARD ĐỒ HỌA RỜI:</text>

        <g transform="translate(25, 48)">
          <rect width="330" height="125" rx="8" fill="#1e1b4b" stroke="#6366f1"/>
          <text x="15" y="25" fill="#f87171" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">❌ Quên mở lẫy đuôi PCIe mà giật mạnh</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Đuôi khe PCIe x16 có mấu nhựa khóa chặt.</text>
          <text x="15" y="66" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Dùng sức giật ngược sẽ nhổ bung cả cụm</text>
          <text x="15" y="84" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">  khe cắm ra khỏi bo mạch ➔ Hỏng Mainboard!</text>
          <text x="15" y="105" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">👉 Luôn đè mở lẫy trước khi nhấc card.</text>
        </g>

        <g transform="translate(375, 48)">
          <rect width="330" height="125" rx="8" fill="#1e1b4b" stroke="#6366f1"/>
          <text x="15" y="25" fill="#f87171" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">❌ Quên siết ốc nẹp thùng máy</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Trọng lượng của card VGA sẽ kéo xệ khe cắm.</text>
          <text x="15" y="66" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Khi người dùng cắm cáp HDMI/VGA nặng</text>
          <text x="15" y="84" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">  làm lỏng chân tiếp xúc gây chập chờn hình ảnh.</text>
          <text x="15" y="105" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">👉 Bắt buộc siết ốc nẹp case 100%.</text>
        </g>

        <g transform="translate(725, 48)">
          <rect width="330" height="125" rx="8" fill="#1e1b4b" stroke="#6366f1"/>
          <text x="15" y="25" fill="#f87171" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">❌ Cắm nhầm dây màn hình lên Main</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Khi đã lắp Card rời GT 730, cổng HDMI/VGA</text>
          <text x="15" y="66" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">  trên bo mạch H510 tự động bị vô hiệu hóa!</text>
          <text x="15" y="84" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Cắm nhầm lên trên = Màn hình đen thui No Signal!</text>
          <text x="15" y="105" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">👉 Luôn cắm vào cổng card rời phía dưới.</text>
        </g>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(targetDir, "guide-clean-vga-pcie.jpg"));
    console.log("Created guide-clean-vga-pcie.jpg");
  }

  // =========================================================================
  // 3. guide-fpanel-diagram.jpg: Sơ đồ cắm chân F_PANEL chuẩn xác
  // =========================================================================
  {
    const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgFP" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#022c22"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>

      <rect width="${W}" height="${H}" fill="url(#bgFP)"/>

      <!-- Title Header -->
      <rect x="50" y="25" width="1100" height="75" rx="12" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
      <text x="80" y="58" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">KỸ NĂNG 3: BẢN ĐỒ CẮM CHÂN KIM CỤM F_PANEL (FRONT PANEL BO MẠCH H510)</text>
      <text x="80" y="82" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Mẹo nhận diện: 2 chân POWER SW nằm sát cạnh vị trí mất kim! Mặt có chữ in trên giắc cắm luôn quay ra ngoài.</text>

      <!-- LEFT: Matrix Pin Diagram -->
      <g transform="translate(60, 120)">
        <rect width="580" height="380" rx="16" fill="#0b0f19" stroke="#059669" stroke-width="2"/>
        <text x="290" y="35" fill="#f8fafc" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">SƠ ĐỒ 9 CHÂN KIM CỤM F_PANEL THỰC TẾ:</text>

        <!-- TOP ROW (Pins 1..5) -->
        <g transform="translate(50, 70)">
          <text x="-15" y="45" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">HÀNG TRÊN:</text>
          
          <!-- Pin 1: Power LED + -->
          <circle cx="90" cy="40" r="16" fill="#0284c7" stroke="#ffffff" stroke-width="2"/>
          <text x="90" y="45" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">+LED</text>
          <text x="90" y="70" fill="#93c5fd" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">Chân 1 (+)</text>

          <!-- Pin 2: Power LED - -->
          <circle cx="180" cy="40" r="16" fill="#0284c7" stroke="#ffffff" stroke-width="2"/>
          <text x="180" y="45" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">-LED</text>
          <text x="180" y="70" fill="#93c5fd" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">Chân 2 (-)</text>

          <!-- Pin 3: POWER SW -->
          <circle cx="270" cy="40" r="18" fill="#eab308" stroke="#ffffff" stroke-width="3"/>
          <text x="270" y="46" fill="#000000" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="900" text-anchor="middle">PWR</text>
          <text x="270" y="70" fill="#fef08a" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" font-weight="bold" text-anchor="middle">Chân 3</text>

          <!-- Pin 4: POWER SW -->
          <circle cx="360" cy="40" r="18" fill="#eab308" stroke="#ffffff" stroke-width="3"/>
          <text x="360" y="46" fill="#000000" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="900" text-anchor="middle">PWR</text>
          <text x="360" y="70" fill="#fef08a" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" font-weight="bold" text-anchor="middle">Chân 4</text>

          <!-- Pin 5: NO PIN (KHUYẾT) -->
          <circle cx="450" cy="40" r="16" fill="#334155" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4"/>
          <text x="450" y="45" fill="#f87171" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold" text-anchor="middle">TRỐNG</text>
          <text x="450" y="70" fill="#fca5a5" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">Mất 1 kim</text>

          <!-- Connecting line for POWER SW -->
          <path d="M 270 15 L 360 15" stroke="#facc15" stroke-width="3"/>
          <rect x="260" y="0" width="110" height="20" rx="4" fill="#a16207"/>
          <text x="315" y="14" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold" text-anchor="middle">POWER SW (NÚT NGUỒN)</text>
        </g>

        <!-- BOTTOM ROW (Pins 1..5) -->
        <g transform="translate(50, 190)">
          <text x="-15" y="45" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">HÀNG DƯỚI:</text>

          <!-- Pin 1: HDD LED + -->
          <circle cx="90" cy="40" r="16" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>
          <text x="90" y="45" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold" text-anchor="middle">+HDD</text>
          <text x="90" y="70" fill="#fca5a5" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">Chân 1 (+)</text>

          <!-- Pin 2: HDD LED - -->
          <circle cx="180" cy="40" r="16" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>
          <text x="180" y="45" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold" text-anchor="middle">-HDD</text>
          <text x="180" y="70" fill="#fca5a5" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">Chân 2 (-)</text>

          <!-- Pin 3: RESET SW -->
          <circle cx="270" cy="40" r="16" fill="#16a34a" stroke="#ffffff" stroke-width="2"/>
          <text x="270" y="45" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold" text-anchor="middle">RST</text>
          <text x="270" y="70" fill="#86efac" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">Chân 3</text>

          <!-- Pin 4: RESET SW -->
          <circle cx="360" cy="40" r="16" fill="#16a34a" stroke="#ffffff" stroke-width="2"/>
          <text x="360" y="45" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold" text-anchor="middle">RST</text>
          <text x="360" y="70" fill="#86efac" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">Chân 4</text>

          <!-- Pin 5: NC -->
          <circle cx="450" cy="40" r="14" fill="#1e293b" stroke="#64748b"/>
          <text x="450" y="45" fill="#94a3b8" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">NC</text>
          <text x="450" y="70" fill="#94a3b8" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">Bỏ trống</text>

          <!-- Connecting line for RESET SW -->
          <path d="M 270 15 L 360 15" stroke="#22c55e" stroke-width="2"/>
          <rect x="260" y="0" width="110" height="20" rx="4" fill="#15803d"/>
          <text x="315" y="14" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold" text-anchor="middle">RESET SW (KHỞI ĐỘNG)</text>
        </g>

        <!-- Callout Banner inside diagram -->
        <g transform="translate(30, 310)">
          <rect width="520" height="50" rx="8" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
          <text x="260" y="24" fill="#fde047" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="900" text-anchor="middle">MẸO THẦY DẠY: NHÌN VỊ TRÍ CHÂN MẤT KIM</text>
          <text x="260" y="40" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" text-anchor="middle">Hễ thấy chân nào bị khuyết ở hàng trên, thì 2 chân kim cạnh nó chính là POWER SW!</text>
        </g>
      </g>

      <!-- RIGHT: Rules of F_Panel -->
      <g transform="translate(670, 120)">
        <rect width="470" height="380" rx="16" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="25" y="35" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold">3 NGUYÊN TẮC CẮM DÂY BẤT DI BẤT DỊCH:</text>

        <g transform="translate(20, 55)">
          <rect width="430" height="75" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="24" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">1. Hai nút bấm (POWER SW &amp; RESET SW):</text>
          <text x="15" y="45" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Hoạt động theo cơ chế chạm mạch đóng/mở công tắc.</text>
          <text x="15" y="62" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">• TUYỆT ĐỐI KHÔNG PHÂN BIỆT CHIỀU ÂM DƯƠNG (Cắm chiều nào cũng chạy!)</text>
        </g>

        <g transform="translate(20, 140)">
          <rect width="430" height="85" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="24" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">2. Hai đèn tín hiệu (POWER LED &amp; HDD LED):</text>
          <text x="15" y="45" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Đèn LED là đi-ốt phát quang có cực: Dây màu là Cực Dương (+),</text>
          <text x="15" y="62" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">  dây trắng hoặc đen là Cực Âm (-).</text>
          <text x="15" y="78" fill="#fca5a5" font-family="Segoe UI, Tahoma, sans-serif" font-size="9">• Nếu cắm ngược chiều thì đèn không sáng (nhưng không bị cháy).</text>
        </g>

        <g transform="translate(20, 235)">
          <rect width="430" height="75" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="24" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="900">3. Quy tắc mặt chữ in quay ra ngoài:</text>
          <text x="15" y="45" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Trên mỗi đầu nhựa đều có in chữ trắng (POWER SW, HDD LED...).</text>
          <text x="15" y="62" fill="#fef08a" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">Cầm các đầu dây sao cho mặt chữ luôn quay ra phía ngoài thùng máy!</text>
        </g>
      </g>

      <!-- Bottom Poka-Yoke Warning -->
      <g transform="translate(60, 520)">
        <rect width="1080" height="195" rx="12" fill="#450a0a" stroke="#ef4444" stroke-width="2"/>
        <text x="25" y="32" fill="#fca5a5" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="900">⚠️ SAI SÓT PHỔ BIẾN KHI CẮM CỤM F_PANEL:</text>
        
        <g transform="translate(25, 48)">
          <rect width="330" height="125" rx="8" fill="#1e1b4b" stroke="#6366f1"/>
          <text x="15" y="25" fill="#f87171" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">❌ Cắm nhầm chân POWER SW</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Cắm nhầm dây POWER SW sang cụm chân LED.</text>
          <text x="15" y="66" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Hậu quả: Bấm nút ngoài vỏ case máy im re 100%.</text>
          <text x="15" y="84" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Học sinh tưởng máy cháy nguồn hỏng mạch!</text>
          <text x="15" y="105" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">👉 Kiểm tra lại 2 chân sát chỗ mất kim.</text>
        </g>

        <g transform="translate(375, 48)">
          <rect width="330" height="125" rx="8" fill="#1e1b4b" stroke="#6366f1"/>
          <text x="15" y="25" fill="#f87171" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">❌ Bẻ cong chân kim F_PANEL</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Chân kim F_PANEL rất nhỏ và mảnh mai.</text>
          <text x="15" y="66" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Cắm nghiêng hoặc dùng sức ấn chéo làm</text>
          <text x="15" y="84" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">  gãy chân kim bo mạch chủ!</text>
          <text x="15" y="105" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">👉 Luôn cắm thẳng góc 90 độ nhẹ nhàng.</text>
        </g>

        <g transform="translate(725, 48)">
          <rect width="330" height="125" rx="8" fill="#1e1b4b" stroke="#6366f1"/>
          <text x="15" y="25" fill="#f87171" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">❌ Mẹo kích nguồn bằng đầu tua vít</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Nghi ngờ nút bấm vỏ case bị hỏng:</text>
          <text x="15" y="66" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Rút dây POWER SW ra, lấy đầu tua vít quẹt</text>
          <text x="15" y="84" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">  nhẹ cùng lúc 2 chân kim số 3 và 4.</text>
          <text x="15" y="105" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">👉 Nếu quạt quay ngay ➔ Hỏng nút bấm case.</text>
        </g>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(targetDir, "guide-fpanel-diagram.jpg"));
    console.log("Created guide-fpanel-diagram.jpg");
  }

  // =========================================================================
  // 4. guide-clear-cmos-pin.jpg: Tháo pin CMOS để Clear CMOS / Xả BIOS
  // =========================================================================
  {
    const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgCM" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#451a03"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>

      <rect width="${W}" height="${H}" fill="url(#bgCM)"/>

      <!-- Header Title -->
      <rect x="50" y="25" width="1100" height="75" rx="12" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
      <text x="80" y="58" fill="#fde047" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">KỸ NĂNG 4: THÁO PIN CMOS ĐỂ CLEAR CMOS &amp; KHÔI PHỤC CÀI ĐẶT BIOS GỐC</text>
      <text x="80" y="82" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Cứu máy tính khi bị kẹt mật khẩu BIOS, sai xung nhịp RAM, hoặc quạt quay nhưng không xuất hình</text>

      <!-- LEFT: Photo Pin CMOS -->
      <g transform="translate(60, 120)">
        <rect width="550" height="380" rx="16" fill="#0b0f19" stroke="#475569" stroke-width="2"/>
        ${cmosB64 ? `<image href="${cmosB64}" x="15" y="15" width="520" height="320"/>` : `<rect x="15" y="15" width="520" height="320" fill="#1e293b"/>`}

        <!-- Overlay badging -->
        <g transform="translate(40, 260)">
          <rect width="210" height="48" rx="8" fill="#b45309" stroke="#facc15" stroke-width="1.5"/>
          <text x="105" y="22" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">LẪY KIM LOẠI NHẢ PIN</text>
          <text x="105" y="38" fill="#fef08a" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">Bấm nhẹ là pin tự nảy lên</text>
        </g>

        <g transform="translate(290, 260)">
          <rect width="220" height="48" rx="8" fill="#065f46" stroke="#34d399" stroke-width="1.5"/>
          <text x="110" y="22" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">PIN CR2032 (3V)</text>
          <text x="110" y="38" fill="#a7f3d0" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">Mặt có dấu (+) ngửa lên trên</text>
        </g>
      </g>

      <!-- RIGHT: 3 Steps to Clear CMOS -->
      <g transform="translate(640, 120)">
        <rect width="500" height="380" rx="16" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="30" y="35" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold">QUY TRÌNH CLEAR CMOS CHUẨN XÁC:</text>

        <g transform="translate(25, 55)">
          <rect width="450" height="65" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="24" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">Bước 1: RÚT ĐIỆN NGUỒN AC &amp; XẢ ĐIỆN TỤ</text>
          <text x="15" y="44" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Rút phích cắm điện, bấm nút nguồn vỏ máy 3 lần để xả sạch điện tích.</text>
        </g>

        <g transform="translate(25, 130)">
          <rect width="450" height="75" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="24" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">Bước 2: Gạt lẫy nhả pin &amp; Đợi 1-2 phút</text>
          <text x="15" y="44" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Bấm nhẹ vào lẫy kim loại cạnh khay pin, viên pin bật lên.</text>
          <text x="15" y="60" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Để pin bên ngoài 1 đến 2 phút để chip nhớ CMOS xóa sạch cài đặt cũ.</text>
        </g>

        <g transform="translate(25, 215)">
          <rect width="450" height="65" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="24" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">Bước 3: Lắp lại pin (Mặt + ngửa lên trên)</text>
          <text x="15" y="44" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Đặt viên pin nghiêng vào ngàm giữ, ấn nhẹ kêu 'tách' là khóa khít.</text>
        </g>

        <g transform="translate(25, 290)">
          <rect width="450" height="65" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="24" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="900">Bước 4: Bật máy vào BIOS chỉnh ngày giờ</text>
          <text x="15" y="44" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Bấm Delete/F2 vào BIOS, chỉnh đúng ngày giờ và bấm F10 lưu lại.</text>
        </g>
      </g>

      <!-- Bottom Poka-Yoke Warning -->
      <g transform="translate(60, 520)">
        <rect width="1080" height="195" rx="12" fill="#450a0a" stroke="#ef4444" stroke-width="2"/>
        <text x="25" y="32" fill="#fca5a5" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="900">⚠️ NHỮNG SAI SÓT DỄ MẮC KHI THÁO PIN CLEAR CMOS:</text>

        <g transform="translate(25, 48)">
          <rect width="330" height="125" rx="8" fill="#1e1b4b" stroke="#6366f1"/>
          <text x="15" y="25" fill="#f87171" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">❌ Tháo pin khi chưa rút điện nguồn AC</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Nguồn máy tính luôn cấp dòng điện chờ 5VSB.</text>
          <text x="15" y="66" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Nếu chưa rút phích cắm thì CMOS vẫn được nuôi điện</text>
          <text x="15" y="84" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">  nên thao tác Clear CMOS hoàn toàn vô tác dụng!</text>
          <text x="15" y="105" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">👉 Bắt buộc rút phích AC &amp; bấm xả điện.</text>
        </g>

        <g transform="translate(375, 48)">
          <rect width="330" height="125" rx="8" fill="#1e1b4b" stroke="#6366f1"/>
          <text x="15" y="25" fill="#f87171" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">❌ Lắp ngược chiều viên pin</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Mặt có chữ và dấu (+) là Cực Dương.</text>
          <text x="15" y="66" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Lắp úp mặt (+) xuống dưới làm mất tiếp xúc.</text>
          <text x="15" y="84" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Máy tính tiếp tục báo 'Press F1' và sai ngày giờ!</text>
          <text x="15" y="105" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">👉 Mặt có chữ (+) luôn ngửa lên trên.</text>
        </g>

        <g transform="translate(725, 48)">
          <rect width="330" height="125" rx="8" fill="#1e1b4b" stroke="#6366f1"/>
          <text x="15" y="25" fill="#f87171" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">❌ Dùng tua vít nạy gãy khay pin</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Khay pin làm bằng nhựa mỏng giòn.</text>
          <text x="15" y="66" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Lấy tua vít nạy thô bạo sẽ làm gãy ngàm nhựa</text>
          <text x="15" y="84" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">  khiến pin bị bung, không giữ được điện.</text>
          <text x="15" y="105" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">👉 Chỉ cần gạt nhẹ lẫy sắt cạnh hông.</text>
        </g>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(targetDir, "guide-clear-cmos-pin.jpg"));
    console.log("Created guide-clear-cmos-pin.jpg");
  }

  // =========================================================================
  // 5. workflow-thao-may.jpg: Sơ đồ 6 bước tháo máy chuẩn KTV
  // =========================================================================
  {
    const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgDis" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1e1b4b"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>

      <rect width="${W}" height="${H}" fill="url(#bgDis)"/>

      <!-- Header -->
      <rect x="50" y="25" width="1100" height="75" rx="12" fill="#312e81" stroke="#6366f1" stroke-width="2"/>
      <text x="80" y="58" fill="#a5b4fc" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">QUY TRÌNH 6 BƯỚC THÁO MÁY TÍNH PHÒNG LAB CHUẨN AN TOÀN ĐIỆN &amp; CƠ KHÍ</text>
      <text x="80" y="82" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Thứ tự tháo chuẩn KTV: Nguồn AC ➔ Card VGA rời ➔ RAM DDR4 ➔ Quạt CPU ➔ Ổ cứng SSD/Dây cáp ➔ Bo mạch chủ</text>

      <!-- 6 Grid Steps -->
      <g transform="translate(60, 120)">
        <div xmlns="http://www.w3.org/1999/xhtml"></div>
        
        <!-- Step 1 -->
        <g transform="translate(0, 0)">
          <rect width="345" height="175" rx="12" fill="#1e293b" stroke="#e11d48" stroke-width="2"/>
          <rect x="15" y="15" width="35" height="25" rx="4" fill="#e11d48"/>
          <text x="32" y="32" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">B1</text>
          <text x="60" y="32" fill="#fda4af" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold">Rút Điện &amp; Xả Điện Tụ</text>
          <text x="15" y="65" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Rút phích cắm nguồn AC sau lưng máy.</text>
          <text x="15" y="85" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Bấm nút nguồn ngoài vỏ 3 lần để xả điện.</text>
          <text x="15" y="105" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Chạm tay vào vỏ sắt case chống tĩnh điện.</text>
          <text x="15" y="125" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Tháo 2 ốc nắp hông, nhấc nắp case cất gọn.</text>
          <text x="15" y="150" fill="#f43f5e" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">⚠️ CẤM THÁO KHI CHƯA RÚT ĐIỆN VÀ XẢ TỤ!</text>
        </g>

        <!-- Step 2 -->
        <g transform="translate(365, 0)">
          <rect width="345" height="175" rx="12" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
          <rect x="15" y="15" width="35" height="25" rx="4" fill="#f59e0b"/>
          <text x="32" y="32" fill="#000000" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">B2</text>
          <text x="60" y="32" fill="#fde047" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold">Tháo Card Rời GT 730</text>
          <text x="15" y="65" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Vặn ốc giữ thanh nẹp sắt vào thành case.</text>
          <text x="15" y="85" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Dùng ngón tay ấn nhẹ lẫy khóa đuôi PCIe.</text>
          <text x="15" y="105" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Nhấc thẳng card VGA rời ra ngoài.</text>
          <text x="15" y="125" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Đặt lên khay lót mềm chống trầy xước.</text>
          <text x="15" y="150" fill="#fde047" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">⚠️ Chưa mở lẫy mà giật là toác khe PCIe!</text>
        </g>

        <!-- Step 3 -->
        <g transform="translate(730, 0)">
          <rect width="350" height="175" rx="12" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
          <rect x="15" y="15" width="35" height="25" rx="4" fill="#3b82f6"/>
          <text x="32" y="32" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">B3</text>
          <text x="60" y="32" fill="#93c5fd" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold">Tháo Thanh RAM DDR4</text>
          <text x="15" y="65" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Dùng 2 ngón tay cái ấn mở 2 ngàm khóa.</text>
          <text x="15" y="85" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Thanh RAM tự bật nhẹ lên khỏi khe cắm.</text>
          <text x="15" y="105" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Cầm vào mép trên của thanh RAM để nhấc ra.</text>
          <text x="15" y="125" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Cất vào khay đựng linh kiện tĩnh điện.</text>
          <text x="15" y="150" fill="#93c5fd" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">⚠️ Không chạm tay vào hàng chân mạ vàng.</text>
        </g>

        <!-- Step 4 -->
        <g transform="translate(0, 195)">
          <rect width="345" height="175" rx="12" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
          <rect x="15" y="15" width="35" height="25" rx="4" fill="#a855f7"/>
          <text x="32" y="32" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">B4</text>
          <text x="60" y="32" fill="#d8b4fe" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold">Tháo Quạt CPU &amp; Dây Quạt</text>
          <text x="15" y="65" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Rút giắc cắm 4 chân ra khỏi cổng CPU_FAN.</text>
          <text x="15" y="85" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Vặn xoay 4 chốt quạt Intel theo chiều mũi tên.</text>
          <text x="15" y="105" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Rút 4 chân chốt lên và nhấc cụm quạt ra.</text>
          <text x="15" y="125" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Dùng giấy khô lau sạch lớp keo cũ trên CPU.</text>
          <text x="15" y="150" fill="#d8b4fe" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">⚠️ Giữ CPU nằm yên trong Socket LGA1200.</text>
        </g>

        <!-- Step 5 -->
        <g transform="translate(365, 195)">
          <rect width="345" height="175" rx="12" fill="#1e293b" stroke="#06b6d4" stroke-width="2"/>
          <rect x="15" y="15" width="35" height="25" rx="4" fill="#06b6d4"/>
          <text x="32" y="32" fill="#000000" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">B5</text>
          <text x="60" y="32" fill="#67e8f9" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold">Rút Dây Nguồn &amp; Tháo SSD</text>
          <text x="15" y="65" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Rút cáp dữ liệu SATA (bóp chốt kim loại).</text>
          <text x="15" y="85" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Rút dây nguồn SATA dẹt ở đít ổ SSD.</text>
          <text x="15" y="105" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Rút cáp nguồn 24-pin bo mạch &amp; 8-pin CPU.</text>
          <text x="15" y="125" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Tháo ốc khay giữ ổ cứng SSD, cất ổ an toàn.</text>
          <text x="15" y="150" fill="#67e8f9" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">⚠️ Bóp lẫy khóa khi rút cáp, không giật dây.</text>
        </g>

        <!-- Step 6 -->
        <g transform="translate(730, 195)">
          <rect width="350" height="175" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
          <rect x="15" y="15" width="35" height="25" rx="4" fill="#10b981"/>
          <text x="32" y="32" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">B6</text>
          <text x="60" y="32" fill="#6ee7b7" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold">Tháo F_PANEL &amp; Mainboard</text>
          <text x="15" y="65" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Rút nhẹ các giắc F_PANEL, USB trước, Audio.</text>
          <text x="15" y="85" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Vặn 6 ốc giữ bo mạch chủ H510 vào ốc đệm.</text>
          <text x="15" y="105" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Nhấc nhẹ bo mạch theo góc chéo ra ngoài.</text>
          <text x="15" y="125" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Đặt bo mạch lên tấm xốp/hộp giấy cách điện.</text>
          <text x="15" y="150" fill="#6ee7b7" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">⚠️ Để toàn bộ ốc vít vào khay chia ô.</text>
        </g>
      </g>

      <!-- Bottom Poka-Yoke Banner -->
      <g transform="translate(60, 520)">
        <rect width="1080" height="195" rx="12" fill="#0f172a" stroke="#6366f1" stroke-width="2"/>
        <text x="25" y="32" fill="#818cf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="900">🛡️ NGUYÊN TẮC VÀNG KHI THÁO MÁY TÍNH CỦA NGƯỜI KỸ THUẬT VIÊN:</text>
        <text x="25" y="58" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">1. Dùng khay chia ô để đựng ốc: Ốc nắp vỏ riêng, ốc bo mạch riêng, ốc SSD riêng. Không để ốc vít rơi vãi trên bàn làm việc.</text>
        <text x="25" y="78" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">2. Nguyên tắc Zero-Force: Mọi giắc cắm trên máy tính đều có lẫy khóa (Latch). Khi rút phải bóp ngàm khóa; tuyệt đối không dùng sức giật đứt dây.</text>
        <text x="25" y="98" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">3. Không tháo CPU ra khỏi Socket LGA1200 nếu không có nhu cầu thay thế (1200 chân kim mạ vàng cực kỳ nhạy cảm, chạm tay vào là cong chân).</text>
        <text x="25" y="120" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">4. Vệ sinh sạch sẽ từng linh kiện bằng cọ mềm và bóng thổi trước khi bắt đầu quy trình lắp lại.</text>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(targetDir, "workflow-thao-may.jpg"));
    console.log("Created workflow-thao-may.jpg");
  }

  // =========================================================================
  // 6. workflow-lap-may.jpg: Sơ đồ 7 bước lắp máy chuẩn Poka-Yoke
  // =========================================================================
  {
    const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgAsm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#022c22"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>

      <rect width="${W}" height="${H}" fill="url(#bgAsm)"/>

      <!-- Header -->
      <rect x="50" y="25" width="1100" height="75" rx="12" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
      <text x="80" y="58" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">QUY TRÌNH 7 BƯỚC LẮP MÁY TÍNH PHÒNG LAB CHUẨN POKA-YOKE (THỨ TỰ NGƯỢC LẠI)</text>
      <text x="80" y="82" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Thứ tự lắp chuẩn KTV: Mainboard &amp; Chặn I/O ➔ CPU &amp; Quạt keo hạt đậu xanh ➔ RAM DDR4 ➔ Ổ cứng SSD ➔ Dây nguồn ATX ➔ F_PANEL ➔ Card GT 730</text>

      <!-- 7 Steps Overview Cards -->
      <g transform="translate(60, 120)">
        <!-- Step 1 -->
        <g transform="translate(0, 0)">
          <rect width="250" height="175" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="25" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">B1. Bắt Mainboard &amp; I/O</text>
          <text x="15" y="50" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Gài miếng chặn I/O vào vỏ case.</text>
          <text x="15" y="68" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Kiểm tra đủ 6 ốc đệm đồng (standoff).</text>
          <text x="15" y="86" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Đặt Main H510 khít các cổng I/O.</text>
          <text x="15" y="104" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Siết vừa tay 6 ốc cố định bo mạch.</text>
          <text x="15" y="128" fill="#ef4444" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" font-weight="bold">⚠️ Không bắt main trực tiếp lên sắt case!</text>
        </g>

        <!-- Step 2 -->
        <g transform="translate(270, 0)">
          <rect width="260" height="175" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="25" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">B2. Lắp CPU, Keo &amp; Quạt</text>
          <text x="15" y="50" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Soi tam giác vàng góc CPU LGA1200.</text>
          <text x="15" y="68" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Tra 01 giọt keo cỡ HẠT ĐẬU XANH ở tâm.</text>
          <text x="15" y="86" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Vặn 4 chốt quạt chéo (1 ➔ 2 ➔ 3 ➔ 4).</text>
          <text x="15" y="104" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Cắm dây quạt vào chân CPU_FAN.</text>
          <text x="15" y="128" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" font-weight="bold">⚠️ Quên cắm CPU_FAN = Máy nóng tự tắt!</text>
        </g>

        <!-- Step 3 -->
        <g transform="translate(550, 0)">
          <rect width="255" height="175" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="25" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">B3. Lắp Thanh RAM DDR4</text>
          <text x="15" y="50" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Mở 2 ngàm khóa khe cắm RAM.</text>
          <text x="15" y="68" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Soi đúng rãnh khuyết lệch DDR4.</text>
          <text x="15" y="86" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Ấn đều 2 đầu thanh RAM bằng 2 ngón cái.</text>
          <text x="15" y="104" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Nghe tiếng 'TÁCH' dứt khoát là xong.</text>
          <text x="15" y="128" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" font-weight="bold">✓ Hai ngàm tự ôm sát khấc thanh RAM.</text>
        </g>

        <!-- Step 4 -->
        <g transform="translate(825, 0)">
          <rect width="255" height="175" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="25" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">B4. Lắp Ổ Cứng SSD 2.5"</text>
          <text x="15" y="50" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Bắt 4 ốc cố định SSD vào khay case.</text>
          <text x="15" y="68" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Cắm cáp nguồn SATA dẹt chữ L.</text>
          <text x="15" y="86" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Cắm cáp SATA dữ liệu có lẫy kim loại.</text>
          <text x="15" y="104" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Đầu kia cắm cổng SATA 1 trên Main H510.</text>
          <text x="15" y="128" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" font-weight="bold">⚠️ Không đè uốn cong gãy chân chữ L.</text>
        </g>

        <!-- Step 5 -->
        <g transform="translate(0, 195)">
          <rect width="345" height="175" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="25" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">B5. Cắm Cáp Nguồn 24-Pin &amp; 8-Pin CPU</text>
          <text x="15" y="50" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Cắm cáp 24 chân to nhất vào mép phải Main.</text>
          <text x="15" y="68" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Cắm cáp nguồn 8-pin (4+4) vàng đen cho CPU.</text>
          <text x="15" y="86" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Ấn ngập sâu cho đến khi lẫy khóa ngậm khít.</text>
          <text x="15" y="104" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Dùng dây rút buộc bó dây gọn gàng, tránh cọ quạt.</text>
          <text x="15" y="128" fill="#f43f5e" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" font-weight="bold">⚠️ Quên cắm nguồn 8-pin CPU = Quạt quay không lên hình!</text>
        </g>

        <!-- Step 6 -->
        <g transform="translate(365, 195)">
          <rect width="345" height="175" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="25" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">B6. Cắm Cụm Chân Kim F_PANEL</text>
          <text x="15" y="50" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Cắm POWER SW vào 2 chân sát chỗ mất kim.</text>
          <text x="15" y="68" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Cắm RESET SW vào 2 chân hàng dưới.</text>
          <text x="15" y="86" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Cắm POWER LED &amp; HDD LED đúng chiều (+ / -).</text>
          <text x="15" y="104" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Mặt chữ in trên giắc luôn quay ra ngoài case.</text>
          <text x="15" y="128" fill="#fde047" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" font-weight="bold">⚠️ Cắm sai POWER SW = Bấm nút case không phản hồi.</text>
        </g>

        <!-- Step 7 -->
        <g transform="translate(730, 195)">
          <rect width="350" height="175" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="25" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">B7. Lắp Card Rời GT 730 &amp; Hoàn Tất</text>
          <text x="15" y="50" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Cắm card GT 730 ngập chân khe PCIe x16.</text>
          <text x="15" y="68" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Lẫy đuôi tự động nhảy gài khóa chắc chắn.</text>
          <text x="15" y="86" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• BẮT BUỘC siết ốc nẹp case ở đuôi card.</text>
          <text x="15" y="104" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Kiểm tra tổng thể 10 giây (Điểm dừng 2) trước khi cắm điện!</text>
          <text x="15" y="128" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" font-weight="bold">✓ Sẵn sàng bấm nút nguồn chạy thử máy.</text>
        </g>
      </g>

      <!-- Bottom Poka-Yoke Banner -->
      <g transform="translate(60, 520)">
        <rect width="1080" height="195" rx="12" fill="#022c22" stroke="#10b981" stroke-width="2"/>
        <text x="25" y="32" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="900">🛡️ 3 ĐIỀU KIỆN SỐNG CÒN TRƯỚC KHI CẮM ĐIỆN THỬ MÁY (ĐIỂM DỪNG 2):</text>
        <text x="25" y="58" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">1. Hai ngàm khóa thanh RAM đã đóng sát khấc 100%, không bị hở một bên.</text>
        <text x="25" y="78" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">2. Dây quạt tản nhiệt CPU đã cắm chặt vào chân kim CPU_FAN (quạt quay làm mát ngay khi vừa bật nguồn).</text>
        <text x="25" y="98" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">3. Nghiêng nhẹ thùng máy kiểm tra: TUYỆT ĐỐI không để rơi rớt bất kỳ ốc vít kim loại nào trên bề mặt bo mạch.</text>
        <text x="25" y="120" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">👉 Thầy kiểm tra nghiệm thu 10 giây xong mới được phép cắm dây nguồn AC và bật máy!</text>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(targetDir, "workflow-lap-may.jpg"));
    console.log("Created workflow-lap-may.jpg");
  }

  console.log("All disassembly & assembly images created successfully!");
}

buildAssemblyImages().catch(console.error);
