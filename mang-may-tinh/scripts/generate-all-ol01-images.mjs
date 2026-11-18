import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const targetDir = path.resolve("public/images/ol-01");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const W = 1200;
const H = 750;

async function buildAll() {
  console.log("Starting full generation of ol-01 real hardware & UI images...");

  // =========================================================================
  // 1. STEP 1: step-1-kham-may.jpg (Khám ngoại quan & Cổng xuất hình sau case)
  // =========================================================================
  {
    const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
        <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" flood-opacity="0.3"/>
        </filter>
      </defs>

      <rect width="${W}" height="${H}" fill="url(#bg1)"/>

      <!-- Title Bar -->
      <rect x="50" y="30" width="1100" height="75" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
      <text x="80" y="65" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">BƯỚC 1: KHÁM MÁY NGOẠI QUAN &amp; ĐỌC CẤU HÌNH BAN ĐẦU (PHÒNG LAB H510)</text>
      <text x="80" y="88" fill="#94a3b8" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Phân biệt cổng xuất hình Card rời GT 730 vs Cổng bo mạch chủ H510 - Tránh lỗi màn hình đen No Signal</text>

      <!-- LEFT: Case PC Rear Diagram -->
      <g transform="translate(80, 130)" filter="url(#cardShadow)">
        <rect width="480" height="570" rx="16" fill="#0b0f19" stroke="#475569" stroke-width="2"/>
        <text x="240" y="35" fill="#f8fafc" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">MẶT SAU THÙNG MÁY PC PHÒNG LAB</text>

        <!-- Power Supply Section (Top) -->
        <rect x="30" y="55" width="420" height="110" rx="8" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
        <text x="45" y="80" fill="#f1f5f9" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">BỘ NGUỒN ATX (PSU)</text>
        <!-- Power socket & switch -->
        <rect x="50" y="95" width="90" height="50" rx="4" fill="#0f172a" stroke="#94a3b8"/>
        <text x="95" y="125" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" text-anchor="middle">CẮM DÂY AC</text>
        
        <rect x="160" y="95" width="70" height="50" rx="4" fill="#22c55e" stroke="#16a34a" stroke-width="2"/>
        <text x="195" y="120" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">BẬT 'I'</text>
        <text x="195" y="136" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">Có điện</text>

        <rect x="250" y="95" width="185" height="50" rx="4" fill="#334155"/>
        <text x="342" y="125" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" text-anchor="middle">Lưới tản nhiệt nguồn</text>

        <!-- Motherboard Rear I/O (Middle) -->
        <rect x="30" y="180" width="420" height="170" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="6,4"/>
        <text x="45" y="205" fill="#f87171" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">CỤM CỔNG BO MẠCH CHỦ (MAINBOARD H510)</text>
        <text x="45" y="222" fill="#ef4444" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">❌ CẤM CẮM DÂY MÀN HÌNH VÀO KHU VỰC NÀY</text>
        
        <!-- Motherboard display ports (Disabled) -->
        <rect x="50" y="235" width="90" height="35" rx="4" fill="#450a0a" stroke="#ef4444" stroke-width="1.5"/>
        <text x="95" y="257" fill="#fca5a5" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">VGA Onboard</text>
        <line x1="50" y1="235" x2="140" y2="270" stroke="#ef4444" stroke-width="3"/>

        <rect x="155" y="235" width="90" height="35" rx="4" fill="#450a0a" stroke="#ef4444" stroke-width="1.5"/>
        <text x="200" y="257" fill="#fca5a5" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">HDMI Onboard</text>
        <line x1="155" y1="235" x2="245" y2="270" stroke="#ef4444" stroke-width="3"/>

        <rect x="260" y="235" width="175" height="100" rx="4" fill="#0f172a"/>
        <text x="347" y="260" fill="#94a3b8" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" text-anchor="middle">USB 3.2 / LAN GbE / Audio</text>
        <text x="347" y="280" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" text-anchor="middle">(Cắm phím, chuột, mạng tại đây)</text>

        <!-- Discrete GPU GT 730 Slot (Bottom) -->
        <rect x="30" y="370" width="420" height="175" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="3"/>
        <text x="45" y="398" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="900">KHE CARD MÀN HÌNH RỜI NVIDIA GT 730 2GB</text>
        <text x="45" y="416" fill="#a7f3d0" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">✓ BẮT BUỘC CẮM DÂY MÀN HÌNH (HDMI / VGA) VÀO ĐÂY</text>

        <!-- GT 730 Output ports -->
        <rect x="50" y="430" width="115" height="42" rx="4" fill="#047857" stroke="#34d399" stroke-width="2"/>
        <text x="107" y="456" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Cổng HDMI Card</text>
        
        <rect x="180" y="430" width="115" height="42" rx="4" fill="#047857" stroke="#34d399" stroke-width="2"/>
        <text x="237" y="456" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Cổng VGA (Xanh)</text>

        <rect x="310" y="430" width="125" height="42" rx="4" fill="#047857" stroke="#34d399" stroke-width="2"/>
        <text x="372" y="456" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Cổng DVI Card</text>

        <text x="240" y="505" fill="#fde047" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">👉 Cắm sai cổng Onboard = Màn hình báo "No Signal" (Đen thui)!</text>
      </g>

      <!-- RIGHT: Checklist KTV Tiếp nhận máy -->
      <g transform="translate(600, 130)" filter="url(#cardShadow)">
        <rect width="520" height="570" rx="16" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        
        <text x="30" y="40" fill="#f8fafc" font-family="Segoe UI, Tahoma, sans-serif" font-size="16" font-weight="bold">4 BƯỚC KHÁM MÁY TẠI BÀN (KTV 3 GHI CHÉP):</text>

        <g transform="translate(30, 65)">
          <rect width="460" height="105" rx="10" fill="#0f172a" stroke="#334155"/>
          <text x="20" y="30" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold">1. Khám ngoại quan vỏ thùng máy</text>
          <text x="20" y="55" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Kiểm tra móp méo, vỡ góc, thiếu ốc nắp hông case máy tính.</text>
          <text x="20" y="75" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Dây nguồn, dây màn hình có bị đứt gãy hoặc lỏng chấu cắm không.</text>
          <text x="20" y="95" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">⚠️ Ghi nhận tình trạng trầy xước vào sổ trước khi nhận máy.</text>
        </g>

        <g transform="translate(30, 185)">
          <rect width="460" height="105" rx="10" fill="#0f172a" stroke="#334155"/>
          <text x="20" y="30" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold">2. Bấm nút nguồn thử máy ban đầu</text>
          <text x="20" y="55" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Trường hợp A: Vào thẳng Windows 10 bình thường.</text>
          <text x="20" y="75" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Trường hợp B: Máy im re (không quay quạt, không sáng đèn).</text>
          <text x="20" y="95" fill="#ef4444" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">Trường hợp C: Quạt quay vù vù nhưng màn hình đen (Chiếm 80% máy lỗi).</text>
        </g>

        <g transform="translate(30, 305)">
          <rect width="460" height="105" rx="10" fill="#0f172a" stroke="#334155"/>
          <text x="20" y="30" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold">3. Đọc thông số phần cứng thực tế</text>
          <text x="20" y="55" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Bo mạch chủ: MSI H510M-A PRO (Socket LGA1200).</text>
          <text x="20" y="75" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">CPU Intel Gen 10/11 · RAM 8GB DDR4 (Bus 2666/3200MHz).</text>
          <text x="20" y="95" fill="#10b981" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">Ổ cứng SSD 128GB/256GB SATA III · Card đồ họa NVIDIA GT 730 2GB.</text>
        </g>

        <g transform="translate(30, 425)">
          <rect width="460" height="120" rx="10" fill="#3b0764" stroke="#a855f7" stroke-width="1.5"/>
          <text x="20" y="28" fill="#f0abfc" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="900">🛡️ NGUYÊN TẮC POKA-YOKE SỐ 1: BẤM XẢ ĐIỆN</text>
          <text x="20" y="52" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Trước khi mở nắp case tháo lắp bất kỳ linh kiện nào:</text>
          <text x="20" y="72" fill="#fde047" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">1. RÚT PHÍCH CẮM NGUỒN AC RA KHỎI Ổ ĐIỆN.</text>
          <text x="20" y="92" fill="#fde047" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">2. BẤM NÚT NGUỒN 3 LẦN LIÊN TỤC để tụ điện trên bo mạch xả hết sạch!</text>
          <text x="20" y="110" fill="#e9d5ff" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">3. Chạm tay vào vỏ sắt thùng máy để triệt tiêu điện tĩnh trên người.</text>
        </g>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(targetDir, "step-1-kham-may.jpg"));
    console.log("Created step-1-kham-may.jpg");
  }

  // =========================================================================
  // 3. STEP 3: step-3-cha-ram-cuc-tay.jpg (Chà gôm tẩy trắng chân RAM DDR4)
  // =========================================================================
  {
    const ramPath = path.join(targetDir, "ram-ddr4.jpg");
    let ramBase64 = "";
    if (fs.existsSync(ramPath)) {
      const ramBuf = await sharp(ramPath).resize(600, 360, { fit: "contain", background: "#0b0f19" }).jpeg({ quality: 80 }).toBuffer();
      ramBase64 = `data:image/jpeg;base64,${ramBuf.toString("base64")}`;
    }

    const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#090d16"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
      </defs>

      <rect width="${W}" height="${H}" fill="url(#bg3)"/>

      <!-- Header -->
      <rect x="50" y="25" width="1100" height="75" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
      <text x="80" y="58" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">BƯỚC 3: BẮT BỆNH 60 GIÂY &amp; TUYỆT CHIÊU CỤC TẨY TRẮNG CHÂN RAM DDR4</text>
      <text x="80" y="82" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">80% máy tính phòng thực hành quạt quay nhưng màn hình đen là do chân mạ vàng của RAM bị oxy hóa bụi bẩn!</text>

      <!-- Real RAM Image Box -->
      <g transform="translate(60, 120)">
        <rect width="620" height="380" rx="16" fill="#0b0f19" stroke="#475569" stroke-width="2"/>
        ${ramBase64 ? `<image href="${ramBase64}" x="10" y="10" width="600" height="360"/>` : `<rect x="10" y="10" width="600" height="360" fill="#1e293b"/>`}
        
        <!-- Annotations overlay on RAM -->
        <!-- Eraser action graphic -->
        <g transform="translate(180, 240)">
          <rect width="130" height="60" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
          <text x="65" y="28" fill="#1e293b" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="900" text-anchor="middle">CỤC GÔM TRẮNG</text>
          <text x="65" y="46" fill="#0284c7" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Chà sạch 2 mặt chân</text>
          <line x1="65" y1="60" x2="65" y2="90" stroke="#facc15" stroke-width="3" marker-end="url(#arrow)"/>
        </g>

        <!-- Notch Callout -->
        <g transform="translate(340, 280)">
          <polygon points="20,0 0,35 40,35" fill="#f97316"/>
          <rect x="-70" y="35" width="180" height="40" rx="6" fill="#7c2d12" stroke="#ea580c" stroke-width="1.5"/>
          <text x="20" y="52" fill="#fed7aa" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold" text-anchor="middle">RÃNH KHUYẾT LỆCH DDR4</text>
          <text x="20" y="67" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="9" text-anchor="middle">(Không cắm vừa DDR3 / DDR5)</text>
        </g>
      </g>

      <!-- Right Steps Box -->
      <g transform="translate(710, 120)">
        <rect width="440" height="380" rx="16" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="25" y="35" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="bold">QUY TRÌNH 4 BƯỚC CỨU RAM LỖI:</text>

        <g transform="translate(20, 55)">
          <rect width="400" height="65" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="25" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">1. Tháo RAM an toàn</text>
          <text x="15" y="45" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Rút điện, bấm xả điện 3 lần. Dùng 2 ngón cái mở 2 ngàm khóa.</text>
        </g>

        <g transform="translate(20, 130)">
          <rect width="400" height="65" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="25" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">2. Chà sạch bằng cục tẩy trắng học sinh</text>
          <text x="15" y="45" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Đặt thanh RAM lên mặt phẳng. Chà gôm đều tay trên hàng chân đồng.</text>
        </g>

        <g transform="translate(20, 205)">
          <rect width="400" height="65" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="25" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">3. Vệ sinh khe cắm trên bo mạch</text>
          <text x="15" y="45" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Dùng cọ mềm quét sạch bụi mạt gôm trong khe cắm Mainboard.</text>
        </g>

        <g transform="translate(20, 280)">
          <rect width="400" height="75" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="25" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">4. Cắm lại nghe tiếng 'TÁCH' dứt khoát</text>
          <text x="15" y="45" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Soi đúng rãnh khuyết lệch, ấn thẳng đều 2 đầu thanh RAM.</text>
          <text x="15" y="62" fill="#a7f3d0" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">Hai ngàm tự động ôm chặt khóa sát khấc.</text>
        </g>
      </g>

      <!-- Bottom Poka-Yoke Banner -->
      <g transform="translate(60, 520)">
        <rect width="1090" height="195" rx="12" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
        <text x="25" y="32" fill="#fbbf24" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">🛡️ NGUYÊN TẮC ZERO-FORCE INSERTION &amp; PHÂN BIỆT ĐỜI RAM THỊ TRƯỜNG:</text>
        
        <g transform="translate(25, 48)">
          <rect width="330" height="125" rx="8" fill="#1e293b"/>
          <text x="15" y="25" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">DDR3 (Thế hệ cũ):</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Khe khuyết nằm gần chính giữa.</text>
          <text x="15" y="68" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Bus: 1333MHz / 1600MHz.</text>
          <text x="15" y="88" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Dùng trên Main H61, H81 cũ.</text>
          <text x="15" y="108" fill="#ef4444" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">❌ KHÔNG LẮP VÀO MAIN H510 ĐƯỢC</text>
        </g>

        <g transform="translate(375, 48)">
          <rect width="330" height="125" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="25" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="900">DDR4 (CẤU HÌNH PHÒNG MÁY):</text>
          <text x="15" y="48" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Rãnh khuyết nằm lệch một bên rõ rệt.</text>
          <text x="15" y="68" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Bus: 2666MHz / 3200MHz (Chuẩn lab).</text>
          <text x="15" y="88" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Dung lượng: 8GB (Thanh đơn hoặc 2x4GB).</text>
          <text x="15" y="108" fill="#a7f3d0" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">✓ Tương thích chuẩn 100% Main H510</text>
        </g>

        <g transform="translate(725, 48)">
          <rect width="340" height="125" rx="8" fill="#1e293b"/>
          <text x="15" y="25" fill="#c084fc" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">DDR5 (Thế hệ mới nhất):</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Tích hợp chip quản lý nguồn PMIC trên thanh.</text>
          <text x="15" y="68" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Tốc độ cực nhanh: 4800 / 5600 / 6000+ MHz.</text>
          <text x="15" y="88" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">• Dùng trên Main H610/B760 đời mới.</text>
          <text x="15" y="108" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Kỹ thuật Dual-Channel: Băng thông gấp đôi!</text>
        </g>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(targetDir, "step-3-cha-ram-cuc-tay.jpg"));
    console.log("Created step-3-cha-ram-cuc-tay.jpg");
  }

  // =========================================================================
  // 4. STEP 4: step-4-tra-keo-hat-dau-xanh.jpg (Tra keo tản nhiệt & Vặn ốc đối xứng)
  // =========================================================================
  {
    const keoPath = path.join(targetDir, "keo-tan-nhiet.jpg");
    let keoBase64 = "";
    if (fs.existsSync(keoPath)) {
      const keoBuf = await sharp(keoPath).resize(560, 360, { fit: "cover" }).jpeg({ quality: 80 }).toBuffer();
      keoBase64 = `data:image/jpeg;base64,${keoBuf.toString("base64")}`;
    }

    const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
      </defs>

      <rect width="${W}" height="${H}" fill="url(#bg4)"/>

      <!-- Title Bar -->
      <rect x="50" y="25" width="1100" height="75" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
      <text x="80" y="58" fill="#f43f5e" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">BƯỚC 4 - ĐIỂM DỪNG 2: TRA KEO 'HẠT ĐẬU XANH' &amp; VẶN CHỐT QUẠT CPU ĐỐI XỨNG</text>
      <text x="80" y="82" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Kiểm soát an toàn trước khi cắm điện: (1) Hai ngàm RAM khóa sát; (2) Dây quạt cắm CPU_FAN; (3) Không rơi ốc vít trên mạch.</text>

      <!-- Real Photo Left -->
      <g transform="translate(60, 120)">
        <rect width="580" height="380" rx="16" fill="#0b0f19" stroke="#475569" stroke-width="2"/>
        ${keoBase64 ? `<image href="${keoBase64}" x="10" y="10" width="560" height="360"/>` : `<rect x="10" y="10" width="560" height="360" fill="#1e293b"/>`}

        <!-- Overlay Pea Badge -->
        <g transform="translate(180, 240)">
          <rect width="220" height="50" rx="8" fill="#047857" stroke="#34d399" stroke-width="2"/>
          <circle cx="28" cy="25" r="10" fill="#84cc16"/>
          <text x="50" y="24" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="900">ĐÚNG 1 GIỌT KEO</text>
          <text x="50" y="40" fill="#a7f3d0" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">BẰNG CỠ HẠT ĐẬU XANH Ở TÂM</text>
        </g>
      </g>

      <!-- Right Screwing Pattern Diagram -->
      <g transform="translate(670, 120)">
        <rect width="480" height="380" rx="16" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="30" y="35" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="bold">SƠ ĐỒ VẶN 4 CHỐT QUẠT CPU ĐƯỜNG CHÉO:</text>

        <!-- CPU Square Representation -->
        <g transform="translate(140, 70)">
          <rect width="200" height="200" rx="12" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
          <text x="100" y="105" fill="#94a3b8" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">CPU INTEL</text>
          <text x="100" y="125" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" text-anchor="middle">Socket LGA1200</text>

          <!-- 4 Screws Cross Pattern -->
          <!-- Chốt 1 (Top Left) -->
          <circle cx="20" cy="20" r="18" fill="#2563eb" stroke="#ffffff" stroke-width="2"/>
          <text x="20" y="26" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">1</text>

          <!-- Chốt 2 (Bottom Right) - Diagonal 1 -->
          <circle cx="180" cy="180" r="18" fill="#2563eb" stroke="#ffffff" stroke-width="2"/>
          <text x="180" y="186" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">2</text>
          <line x1="35" y1="35" x2="165" y2="165" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4,4"/>

          <!-- Chốt 3 (Top Right) -->
          <circle cx="180" cy="20" r="18" fill="#16a34a" stroke="#ffffff" stroke-width="2"/>
          <text x="180" y="26" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">3</text>

          <!-- Chốt 4 (Bottom Left) - Diagonal 2 -->
          <circle cx="20" cy="180" r="18" fill="#16a34a" stroke="#ffffff" stroke-width="2"/>
          <text x="20" y="186" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">4</text>
          <line x1="165" y1="35" x2="35" y2="165" stroke="#22c55e" stroke-width="2" stroke-dasharray="4,4"/>
        </g>

        <!-- Instructions below diagram -->
        <g transform="translate(30, 295)">
          <rect width="420" height="65" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="24" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">Quy tắc siết ốc đối xứng đường chéo:</text>
          <text x="15" y="44" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Vặn nhẹ chốt 1 ➔ chốt 2 (chéo góc), rồi vặn chốt 3 ➔ chốt 4.</text>
          <text x="15" y="58" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Mặt tiếp xúc phẳng đều 100%, không bị kênh làm nóng CPU!</text>
        </g>
      </g>

      <!-- Bottom Poka-Yoke Checklist (Điểm Dừng 2) -->
      <g transform="translate(60, 520)">
        <rect width="1090" height="195" rx="12" fill="#0f172a" stroke="#e11d48" stroke-width="2"/>
        <text x="25" y="32" fill="#fb7185" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">🛡️ 3 TIÊU CHÍ NGHIỆM THU ĐIỂM DỪNG 2 (THẦY KIỂM TRA 10 GIÂY TRƯỚC KHI CẮM ĐIỆN):</text>

        <g transform="translate(25, 48)">
          <rect width="330" height="125" rx="8" fill="#1e293b"/>
          <text x="15" y="25" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">Tiêu chí 1: Khóa ngàm RAM</text>
          <text x="15" y="50" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Hai tai khóa ở 2 đầu khe cắm RAM</text>
          <text x="15" y="70" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">phải ôm sát khấc vào rãnh thanh RAM.</text>
          <text x="15" y="90" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Nếu còn hở là chưa vào hết chân!</text>
          <text x="15" y="110" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">✓ Đã kiểm tra ngàm khóa khít</text>
        </g>

        <g transform="translate(375, 48)">
          <rect width="330" height="125" rx="8" fill="#1e293b"/>
          <text x="15" y="25" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">Tiêu chí 2: Cắm dây CPU_FAN</text>
          <text x="15" y="50" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Dây quạt tản nhiệt CPU bắt buộc</text>
          <text x="15" y="70" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">phải cắm vào chân kim có chữ CPU_FAN.</text>
          <text x="15" y="90" fill="#ef4444" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">Quên cắm = CPU nóng 100°C tự tắt!</text>
          <text x="15" y="110" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">✓ Đã cắm đúng chân CPU_FAN</text>
        </g>

        <g transform="translate(725, 48)">
          <rect width="340" height="125" rx="8" fill="#1e293b"/>
          <text x="15" y="25" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">Tiêu chí 3: Chống rơi ốc vít</text>
          <text x="15" y="50" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Nghiêng nhẹ thùng máy quan sát kỹ:</text>
          <text x="15" y="70" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">TUYỆT ĐỐI không để rơi bất kỳ ốc vít</text>
          <text x="15" y="90" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">kim loại nào nằm trên bề mặt bo mạch.</text>
          <text x="15" y="110" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">✓ 100% sạch ốc vít kim loại</text>
        </g>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(targetDir, "step-4-tra-keo-hat-dau-xanh.jpg"));
    console.log("Created step-4-tra-keo-hat-dau-xanh.jpg");
  }

  // =========================================================================
  // 5. STEP 5: step-5-cai-win10-partition.jpg (Windows 10 Partition & Device Manager)
  // =========================================================================
  {
    const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="winSetupBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4c1d95"/>
          <stop offset="100%" stop-color="#1e1b4b"/>
        </linearGradient>
        <filter id="winShadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" flood-opacity="0.4"/>
        </filter>
      </defs>

      <rect width="${W}" height="${H}" fill="url(#winSetupBg)"/>

      <!-- Windows Setup Window -->
      <g transform="translate(60, 40)" filter="url(#winShadow)">
        <rect width="660" height="520" rx="3" fill="#f0f0f0" stroke="#7c3aed" stroke-width="2"/>
        
        <!-- Setup Title -->
        <rect width="660" height="35" rx="3" fill="#ffffff"/>
        <text x="20" y="23" fill="#222222" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="600">Windows Setup (Windows 10 Pro 64-bit)</text>

        <g transform="translate(30, 55)">
          <text x="0" y="20" fill="#000000" font-family="Segoe UI, Tahoma, sans-serif" font-size="18" font-weight="300">Where do you want to install Windows?</text>
          
          <!-- Partition Table Box -->
          <rect x="0" y="40" width="600" height="230" fill="#ffffff" stroke="#c0c0c0"/>
          
          <!-- Header row -->
          <rect x="0" y="40" width="600" height="28" fill="#f5f5f5" stroke="#e0e0e0"/>
          <text x="15" y="59" fill="#444444" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">Name</text>
          <text x="320" y="59" fill="#444444" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">Total size</text>
          <text x="430" y="59" fill="#444444" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">Free space</text>
          <text x="520" y="59" fill="#444444" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">Type</text>

          <!-- Partition 1 -->
          <text x="15" y="90" fill="#666666" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Drive 0 Partition 1: Recovery</text>
          <text x="320" y="90" fill="#666666" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">529.0 MB</text>
          <text x="430" y="90" fill="#666666" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">0.0 MB</text>
          <text x="520" y="90" fill="#666666" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Recovery</text>

          <!-- Partition 2 -->
          <text x="15" y="115" fill="#666666" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Drive 0 Partition 2: System (EFI)</text>
          <text x="320" y="115" fill="#666666" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">100.0 MB</text>
          <text x="430" y="115" fill="#666666" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">75.0 MB</text>
          <text x="520" y="115" fill="#666666" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">System</text>

          <!-- Partition 3: SELECTED C DRIVE (HIGHLIGHT BLUE) -->
          <rect x="0" y="130" width="600" height="34" fill="#0078d7"/>
          <text x="15" y="152" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">Drive 0 Partition 3: [C: HE DIEU HANH]</text>
          <text x="320" y="152" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">120.0 GB</text>
          <text x="430" y="152" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">120.0 GB</text>
          <text x="520" y="152" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Primary</text>

          <!-- Partition 4: D DRIVE (CRITICAL WARNING) -->
          <rect x="0" y="165" width="600" height="34" fill="#fff1f2"/>
          <text x="15" y="187" fill="#be123c" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">Drive 0 Partition 4: [D: DU LIEU KHACH]</text>
          <text x="320" y="187" fill="#be123c" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">355.0 GB</text>
          <text x="430" y="187" fill="#be123c" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">210.5 GB</text>
          <text x="520" y="187" fill="#be123c" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Primary</text>

          <!-- Action buttons inside setup -->
          <g transform="translate(0, 290)">
            <rect x="0" y="0" width="80" height="26" rx="2" fill="#e1e1e1" stroke="#adadad"/>
            <text x="40" y="17" fill="#444444" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" text-anchor="middle">Refresh</text>

            <rect x="90" y="0" width="80" height="26" rx="2" fill="#e1e1e1" stroke="#adadad"/>
            <text x="130" y="17" fill="#444444" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" text-anchor="middle">Delete</text>

            <!-- Format button (active on C:) -->
            <rect x="180" y="0" width="85" height="26" rx="2" fill="#2563eb" stroke="#1d4ed8"/>
            <text x="222" y="17" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Format (C:)</text>

            <rect x="275" y="0" width="80" height="26" rx="2" fill="#e1e1e1" stroke="#adadad"/>
            <text x="315" y="17" fill="#444444" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" text-anchor="middle">New</text>

            <!-- Next button -->
            <rect x="515" y="0" width="85" height="30" rx="2" fill="#0078d7"/>
            <text x="557" y="20" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Next &gt;</text>
          </g>

          <!-- Partition Rule Inset -->
          <rect x="0" y="340" width="600" height="95" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5"/>
          <text x="15" y="25" fill="#b91c1c" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="900">QUY TẮC NHÌN SỐ GB CHỌN ĐÚNG Ổ C (CHỐNG MẤT DỮ LIỆU):</text>
          <text x="15" y="47" fill="#7f1d1d" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">1. Nhìn số GB đã ghi ở Bước 1: Ổ C dung lượng nhỏ (120GB) để cài Windows ➔ Bấm Format.</text>
          <text x="15" y="67" fill="#7f1d1d" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">2. Ổ D dung lượng lớn (355GB) chứa dữ liệu của khách ➔ TUYỆT ĐỐI KHÔNG BẤM FORMAT / DELETE!</text>
          <text x="15" y="87" fill="#15803d" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">3. RÚT USB CÀI ĐẶT NGAY KHI MÁY TỰ ĐỘNG KHỞI ĐỘNG LẠI LẦN ĐẦU TIÊN!</text>
        </g>
      </g>

      <!-- Right: Device Manager Window -->
      <g transform="translate(750, 40)" filter="url(#winShadow)">
        <rect width="390" height="520" rx="3" fill="#ffffff" stroke="#c0c0c0"/>
        
        <!-- Title bar -->
        <rect width="390" height="32" rx="3" fill="#ffffff" stroke="#e0e0e0"/>
        <text x="15" y="21" fill="#222222" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">Device Manager (Đủ 100% Driver)</text>

        <!-- Menu bar -->
        <rect y="32" width="390" height="24" fill="#f5f6f7" stroke="#e5e5e5"/>
        <text x="15" y="48" fill="#444444" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">File  Action  View  Help</text>

        <!-- Device tree -->
        <g transform="translate(20, 75)">
          <text x="0" y="20" fill="#222222" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">💻 PC-BAN01 (Máy thực hành)</text>
          <text x="15" y="45" fill="#222222" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">🔊 Audio inputs and outputs</text>
          <text x="35" y="65" fill="#16a34a" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">✓ Speakers (Realtek High Definition)</text>

          <text x="15" y="95" fill="#222222" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">🖥️ Display adapters</text>
          <rect x="30" y="102" width="320" height="24" rx="3" fill="#ecfdf5"/>
          <text x="35" y="118" fill="#047857" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">✓ NVIDIA GeForce GT 730 (ĐÃ NHẬN)</text>

          <text x="15" y="145" fill="#222222" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">💾 Disk drives</text>
          <text x="35" y="165" fill="#16a34a" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">✓ KINGSTON SA400S37240G (SSD)</text>

          <text x="15" y="195" fill="#222222" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">🌐 Network adapters</text>
          <text x="35" y="215" fill="#16a34a" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">✓ Realtek PCIe GbE Family Controller</text>

          <text x="15" y="245" fill="#222222" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">⚙️ Processors</text>
          <text x="35" y="265" fill="#16a34a" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">✓ 11th Gen Intel Core i5-11400 (12 CPUs)</text>

          <!-- 100% Clean Badge -->
          <rect x="0" y="300" width="350" height="120" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
          <text x="175" y="330" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="900" text-anchor="middle">SẠCH BÓNG DẤU CHẤM THAN VÀNG (!)</text>
          <text x="175" y="355" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" text-anchor="middle">100% linh kiện phần cứng đã cài đủ Driver</text>
          <text x="175" y="375" fill="#a7f3d0" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" text-anchor="middle">Chipset · VGA GT 730 · Audio · LAN</text>
          <text x="175" y="400" fill="#fef08a" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">✓ ĐẠT CHUẨN ĐIỂM DỪNG 3</text>
        </g>
      </g>

      <!-- Bottom Step 5 Footer -->
      <g transform="translate(60, 585)">
        <rect width="1080" height="135" rx="10" fill="#0f172a" stroke="#8b5cf6" stroke-width="2"/>
        <text x="25" y="30" fill="#c4b5fd" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="900">BƯỚC 5: CÀI ĐẶT WINDOWS 10, PHẦN MỀM THIẾT YẾU &amp; TẠO PHANH AN TOÀN SYSTEM RESTORE</text>
        <text x="25" y="55" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">1. Đặt tên máy theo số bàn (VD: PC-BAN01), chỉnh múi giờ (UTC+07:00) Bangkok, Hanoi, Jakarta.</text>
        <text x="25" y="75" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">2. Cài đặt phần mềm chuẩn mực: UniKey (bật Khởi động cùng Windows, bảng mã Unicode, kiểu gõ Telex), 7-Zip, đọc PDF.</text>
        <text x="25" y="95" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">3. Chép trả toàn bộ thư mục tài liệu của khách từ ổ D ra ngoài màn hình Desktop.</text>
        <text x="25" y="115" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">4. Tạo điểm khôi phục System Restore đặt tên 'MAY_CHAY_TOT' (lần sau lỗi Windows chỉ mất 3 phút để cứu sống lại máy).</text>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(targetDir, "step-5-cai-win10-partition.jpg"));
    console.log("Created step-5-cai-win10-partition.jpg");
  }

  // =========================================================================
  // 6. STEP 6: step-6-may-in-test-page.jpg (Devices and Printers Windows 10)
  // =========================================================================
  {
    const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg6" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#0369a1"/>
        </linearGradient>
        <filter id="pShadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" flood-opacity="0.35"/>
        </filter>
      </defs>

      <rect width="${W}" height="${H}" fill="url(#bg6)"/>

      <!-- Devices and Printers Window -->
      <g transform="translate(60, 45)" filter="url(#pShadow)">
        <rect width="1080" height="520" rx="3" fill="#ffffff" stroke="#c0c0c0"/>

        <!-- Title bar -->
        <rect width="1080" height="32" rx="3" fill="#ffffff"/>
        <text x="20" y="21" fill="#222222" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="600">Devices and Printers (Control Panel\Hardware and Sound\Devices and Printers)</text>

        <!-- Address Bar -->
        <rect y="32" width="1080" height="30" fill="#f5f6f7" stroke="#e5e5e5"/>
        <text x="20" y="52" fill="#555555" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Control Panel &gt; Hardware and Sound &gt; Devices and Printers</text>

        <!-- Ribbon action bar -->
        <rect y="62" width="1080" height="35" fill="#ffffff" stroke="#e5e5e5"/>
        <text x="20" y="84" fill="#0067b8" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">+ Add a device</text>
        <text x="120" y="84" fill="#0067b8" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">🖨️ Add a printer</text>
        <text x="230" y="84" fill="#666666" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">See what's printing</text>
        <text x="350" y="84" fill="#666666" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Print server properties</text>

        <!-- Devices Section -->
        <text x="25" y="125" fill="#333333" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">Printers (Máy in)</text>

        <!-- PRINTER 1: DEFAULT PRINTER (GREEN CHECKMARK) -->
        <g transform="translate(40, 145)">
          <rect width="200" height="150" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
          <!-- Printer icon -->
          <rect x="65" y="25" width="70" height="50" rx="4" fill="#475569"/>
          <rect x="75" y="15" width="50" height="15" rx="2" fill="#ffffff" stroke="#94a3b8"/>
          <rect x="75" y="65" width="50" height="25" rx="2" fill="#ffffff" stroke="#94a3b8"/>
          
          <!-- Green checkmark badge -->
          <circle cx="155" cy="40" r="16" fill="#16a34a" stroke="#ffffff" stroke-width="2"/>
          <text x="155" y="46" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="16" font-weight="900" text-anchor="middle">✓</text>

          <text x="100" y="110" fill="#0f172a" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="900" text-anchor="middle">Canon LBP2900</text>
          <text x="100" y="128" fill="#16a34a" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Default printer</text>
          <text x="100" y="142" fill="#64748b" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" text-anchor="middle">0 document(s) in queue</text>
        </g>

        <!-- PRINTER 2: Microsoft Print to PDF -->
        <g transform="translate(260, 145)">
          <rect width="180" height="150" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="60" y="25" width="60" height="45" rx="4" fill="#64748b"/>
          <text x="90" y="110" fill="#334155" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" text-anchor="middle">Microsoft Print to PDF</text>
          <text x="90" y="128" fill="#94a3b8" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" text-anchor="middle">Ready</text>
        </g>

        <!-- PRINTER 3: OneNote -->
        <g transform="translate(460, 145)">
          <rect width="180" height="150" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="60" y="25" width="60" height="45" rx="4" fill="#64748b"/>
          <text x="90" y="110" fill="#334155" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" text-anchor="middle">OneNote for Windows 10</text>
          <text x="90" y="128" fill="#94a3b8" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" text-anchor="middle">Ready</text>
        </g>

        <!-- Right: Print Test Page & Queue Dialog Insets -->
        <!-- Queue Dialog (Cleaned) -->
        <g transform="translate(680, 120)">
          <rect width="360" height="160" rx="4" fill="#ffffff" stroke="#0078d7" stroke-width="1.5"/>
          <rect width="360" height="26" fill="#f3f3f3"/>
          <text x="12" y="18" fill="#222222" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">Canon LBP2900 - 0 document(s) in queue</text>
          
          <rect y="26" width="360" height="22" fill="#f8fafc" stroke="#e2e8f0"/>
          <text x="15" y="41" fill="#0067b8" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">Printer  Document  View  Help</text>

          <g transform="translate(15, 60)">
            <text x="0" y="20" fill="#047857" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">✓ ĐÃ HỦY LỆNH IN KẸT (CANCEL ALL DOCUMENTS):</text>
            <text x="0" y="40" fill="#475569" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Hàng đợi trống hoàn toàn, không còn văn bản bị tắc.</text>
            <text x="0" y="60" fill="#475569" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Đèn Ready trên máy in sáng màu xanh ổn định.</text>
          </g>
        </g>

        <!-- Test Page Successful Dialog -->
        <g transform="translate(680, 305)">
          <rect width="360" height="185" rx="4" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
          <rect width="360" height="26" fill="#dcfce7"/>
          <text x="12" y="18" fill="#14532d" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">Windows Printer Test Page (In thử trang nghiệm thu)</text>

          <g transform="translate(20, 45)">
            <circle cx="20" cy="20" r="16" fill="#22c55e"/>
            <text x="20" y="26" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="16" font-weight="bold" text-anchor="middle">✓</text>

            <text x="50" y="18" fill="#0f172a" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">A test page has been sent to your printer.</text>
            <text x="50" y="38" fill="#334155" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Trang in thử đã được gửi thành công đến máy in.</text>
            
            <text x="0" y="75" fill="#15803d" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">Giấy in ra rõ chữ, không mờ mực, không kẹt giấy.</text>
            <text x="0" y="95" fill="#64748b" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">KTV bấm Close và kẹp tờ giấy này vào hồ sơ bàn giao.</text>

            <rect x="250" y="95" width="70" height="26" rx="2" fill="#e2e8f0" stroke="#94a3b8"/>
            <text x="285" y="112" fill="#1e293b" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" text-anchor="middle">Close</text>
          </g>
        </g>
      </g>

      <!-- Bottom Guide Step 6 -->
      <g transform="translate(60, 585)">
        <rect width="1080" height="135" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
        <text x="25" y="30" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="900">BƯỚC 6: 3 BƯỚC XỬ LÝ NHANH MÁY IN 'CẮM VÀO KHÔNG CHỊU IN' (KTV 3 KIỂM THỬ)</text>
        <text x="25" y="55" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">1. Kiểm tra vật lý: Cáp USB đã cắm chặt thùng máy, đèn nguồn máy in sáng xanh, khay có sẵn giấy trắng.</text>
        <text x="25" y="75" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">2. Kiểm tra Dấu Tích Xanh: Chuột phải máy in chọn 'Set as default printer' (nhiều máy in không ra do Win đang chọn nhầm máy in ảo PDF).</text>
        <text x="25" y="95" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">3. Xóa kẹt lệnh in: Nhấp đúp vào máy in ➔ menu Printer ➔ chọn 'Cancel All Documents'.</text>
        <text x="25" y="115" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">4. Chuột phải Printer properties ➔ Bấm 'Print Test Page' để in trang nghiệm thu đính kèm biên bản!</text>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(targetDir, "step-6-may-in-test-page.jpg"));
    console.log("Created step-6-may-in-test-page.jpg");
  }

  // =========================================================================
  // 7. STEP 7: step-7-hwmonitor-nhiet-do.jpg (HWMonitor & Nghiệm thu 5 tiêu chí)
  // =========================================================================
  {
    const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg7" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#064e3b"/>
          <stop offset="100%" stop-color="#022c22"/>
        </linearGradient>
        <filter id="hwShadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" flood-opacity="0.4"/>
        </filter>
      </defs>

      <rect width="${W}" height="${H}" fill="url(#bg7)"/>

      <!-- Title Bar -->
      <rect x="50" y="25" width="1100" height="75" rx="12" fill="#022c22" stroke="#059669" stroke-width="2"/>
      <text x="80" y="58" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">BƯỚC 7 - ĐIỂM DỪNG 3: ĐO TẢI NHIỆT ĐỘ HWMONITOR &amp; NGHIỆM THU BÀN GIAO 5 TIÊU CHÍ</text>
      <text x="80" y="82" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Thầy kiểm tra 3 màn hình: (1) Device Manager sạch chấm than; (2) HWMonitor nhiệt độ CPU &lt; 75°C; (3) Dữ liệu khách nguyên vẹn.</text>

      <!-- Left: HWMonitor Window -->
      <g transform="translate(60, 120)" filter="url(#hwShadow)">
        <rect width="520" height="420" rx="3" fill="#ffffff" stroke="#64748b"/>
        
        <!-- HWMonitor Title bar -->
        <rect width="520" height="30" rx="3" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="15" y="20" fill="#1e293b" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">CPUID HWMonitor (Đo nhiệt độ CPU &amp; Quạt)</text>

        <!-- Column headers -->
        <rect y="30" width="520" height="25" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="20" y="46" fill="#475569" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">Sensor</text>
        <text x="280" y="46" fill="#475569" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">Value</text>
        <text x="360" y="46" fill="#475569" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">Min</text>
        <text x="440" y="46" fill="#475569" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">Max</text>

        <!-- Sensor items -->
        <g transform="translate(20, 75)">
          <text x="0" y="20" fill="#0f172a" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">📁 MSI H510M-A PRO (Bo mạch chủ)</text>
          <text x="15" y="40" fill="#334155" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">System Temperature</text>
          <text x="260" y="40" fill="#16a34a" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">34 °C</text>
          <text x="340" y="40" fill="#475569" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">32 °C</text>
          <text x="420" y="40" fill="#475569" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">42 °C</text>

          <text x="15" y="65" fill="#334155" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">CPU Fan Speed</text>
          <text x="260" y="65" fill="#2563eb" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">1420 RPM</text>
          <text x="340" y="65" fill="#475569" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">1200 RPM</text>
          <text x="420" y="65" fill="#475569" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">1850 RPM</text>

          <line x1="0" y1="80" x2="480" y2="80" stroke="#e2e8f0"/>

          <!-- CPU SECTION (HIGHLIGHT TEMPERATURE) -->
          <text x="0" y="105" fill="#0f172a" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">📁 Intel Core i5-11400 @ 2.60GHz (LGA1200)</text>
          
          <rect x="0" y="115" width="480" height="32" rx="4" fill="#ecfdf5"/>
          <text x="15" y="136" fill="#065f46" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">Package (Nhiệt độ CPU)</text>
          <text x="260" y="136" fill="#047857" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">38 °C</text>
          <text x="340" y="136" fill="#475569" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">35 °C</text>
          <text x="420" y="136" fill="#b45309" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">52 °C</text>

          <text x="15" y="165" fill="#334155" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Core #0 Temperature</text>
          <text x="260" y="165" fill="#16a34a" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">37 °C</text>
          <text x="15" y="185" fill="#334155" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Core #1 Temperature</text>
          <text x="260" y="185" fill="#16a34a" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">38 °C</text>

          <line x1="0" y1="205" x2="480" y2="205" stroke="#e2e8f0"/>

          <!-- GPU Section -->
          <text x="0" y="230" fill="#0f172a" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">📁 NVIDIA GeForce GT 730 (2048 MB GDDR5)</text>
          <text x="15" y="250" fill="#334155" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">GPU Temperature</text>
          <text x="260" y="250" fill="#16a34a" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">41 °C</text>
          <text x="340" y="250" fill="#475569" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">39 °C</text>
          <text x="420" y="250" fill="#475569" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">55 °C</text>

          <!-- Safe Temp Callout -->
          <rect x="0" y="275" width="480" height="55" rx="6" fill="#d1fae5" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="298" fill="#065f46" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">✓ NHIỆT ĐỘ MÁT MẺ (38°C): ĐẠT CHUẨN AN TOÀN &lt; 75°C</text>
          <text x="15" y="316" fill="#047857" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Keo tản nhiệt hạt đậu xanh tiếp xúc hoàn hảo, quạt quay êm ái.</text>
        </g>
      </g>

      <!-- Right: 5 Tiêu chí bàn giao KTV -->
      <g transform="translate(610, 120)" filter="url(#hwShadow)">
        <rect width="530" height="420" rx="16" fill="#022c22" stroke="#059669" stroke-width="2"/>
        <text x="25" y="35" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">5 TIÊU CHÍ BÀN GIAO CHUẨN NGHỀ KỸ THUẬT VIÊN:</text>

        <g transform="translate(20, 55)">
          <rect width="490" height="60" rx="8" fill="#064e3b" stroke="#047857"/>
          <text x="15" y="24" fill="#a7f3d0" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">1. Cơ khí &amp; Dây gọn bên trong thùng máy:</text>
          <text x="15" y="44" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Quạt quay êm, dây buộc gọn không chạm cánh quạt, không rơi ốc vít.</text>
        </g>

        <g transform="translate(20, 125)">
          <rect width="490" height="60" rx="8" fill="#064e3b" stroke="#047857"/>
          <text x="15" y="24" fill="#a7f3d0" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">2. Nhiệt độ CPU đạt chuẩn:</text>
          <text x="15" y="44" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Đo HWMonitor nhiệt độ nghỉ dưới 75°C (nếu &gt;85°C phải tháo bôi lại keo).</text>
        </g>

        <g transform="translate(20, 195)">
          <rect width="490" height="60" rx="8" fill="#064e3b" stroke="#047857"/>
          <text x="15" y="24" fill="#a7f3d0" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">3. Nhận đủ phần cứng &amp; Sạch bóng Driver:</text>
          <text x="15" y="44" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Nhận đủ 8GB RAM, đủ ổ C &amp; D, Device Manager sạch chấm than vàng (!).</text>
        </g>

        <g transform="translate(20, 265)">
          <rect width="490" height="60" rx="8" fill="#064e3b" stroke="#047857"/>
          <text x="15" y="24" fill="#a7f3d0" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">4. Dữ liệu khách hàng nguyên vẹn 100%:</text>
          <text x="15" y="44" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Tài liệu Desktop, Documents còn đủ 100% số file, mở thử 2 file chạy tốt.</text>
        </g>

        <g transform="translate(20, 335)">
          <rect width="490" height="65" rx="8" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
          <text x="15" y="24" fill="#fde047" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="900">5. Văn hóa 5S: Đóng vỏ, lau sạch &amp; Trả đủ đồ nghề</text>
          <text x="15" y="44" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Vặn đủ ốc vỏ case, lau sạch màn hình - bàn phím, cất tua vít vào khay.</text>
        </g>
      </g>

      <!-- Bottom Step 7 Banner -->
      <g transform="translate(60, 560)">
        <rect width="1080" height="160" rx="10" fill="#022c22" stroke="#10b981" stroke-width="2"/>
        <text x="25" y="32" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">🏆 TỰ HÀO KỸ THUẬT VIÊN CNTT CHUẨN NGHỀ (CN. PHẠM TIẾN ĐÔNG):</text>
        <text x="25" y="60" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Người KTV giỏi không chỉ biết lắp máy cho chạy, mà còn biết bảo vệ tài sản của khách hàng, an toàn điện tuyệt đối,</text>
        <text x="25" y="82" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">thao tác khéo léo không dùng sức ấn bừa, và giữ gìn bàn làm việc luôn sạch sẽ, gọn gàng, chuyên nghiệp.</text>
        <text x="25" y="112" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="bold">👉 Học sinh hoàn thành tick đủ 7 bước và nộp phiếu công tác để nhận điểm rèn luyện!</text>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(targetDir, "step-7-hwmonitor-nhiet-do.jpg"));
    console.log("Created step-7-hwmonitor-nhiet-do.jpg");
  }

  // =========================================================================
  // 8. 5 DIAGNOSTIC CASES (Bản đồ bắt bệnh 60 giây)
  // =========================================================================
  // Case 1: diag-case-1-fpanel-power.jpg (Kích nguồn F_PANEL bằng tua vít)
  {
    const fpanelPath = path.join(targetDir, "fpanel-header.jpg");
    let fpanelBase64 = "";
    if (fs.existsSync(fpanelPath)) {
      const buf = await sharp(fpanelPath).resize(560, 360, { fit: "cover" }).jpeg({ quality: 80 }).toBuffer();
      fpanelBase64 = `data:image/jpeg;base64,${buf.toString("base64")}`;
    }

    const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgC1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#bgC1)"/>
      <rect x="50" y="25" width="1100" height="75" rx="12" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
      <text x="80" y="58" fill="#fbbf24" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">CA 1: MÁY IM RE (KHÔNG ĐIỆN) - CỤM CHÂN KIM F_PANEL &amp; NÚT POWER SW</text>
      <text x="80" y="82" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Triệu chứng: Bấm nút nguồn máy im lìm 100%. Cách thử nhanh bằng đầu tua vít trong 10 giây!</text>

      <g transform="translate(60, 120)">
        <rect width="580" height="380" rx="16" fill="#0b0f19" stroke="#475569" stroke-width="2"/>
        ${fpanelBase64 ? `<image href="${fpanelBase64}" x="10" y="10" width="560" height="360"/>` : `<rect x="10" y="10" width="560" height="360" fill="#1e293b"/>`}
        
        <!-- Callout on 2 pins of POWER SW -->
        <g transform="translate(180, 240)">
          <rect width="220" height="50" rx="8" fill="#b45309" stroke="#f59e0b" stroke-width="2"/>
          <text x="110" y="24" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="900" text-anchor="middle">2 CHÂN KIM POWER SW</text>
          <text x="110" y="40" fill="#fef08a" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Sát cạnh chỗ trống mất 1 kim</text>
        </g>
      </g>

      <g transform="translate(670, 120)">
        <rect width="480" height="380" rx="16" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="30" y="35" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="bold">3 BƯỚC CỨU MÁY IM RE:</text>

        <g transform="translate(25, 55)">
          <rect width="430" height="85" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="25" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">Bước 1: Kiểm tra nguồn điện bên ngoài</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Cắm chặt dây điện đen 3 chấu sau đít máy.</text>
          <text x="15" y="68" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Gạt công tắc nguồn sau lưng sang vạch 'I' (có điện).</text>
        </g>

        <g transform="translate(25, 155)">
          <rect width="430" height="95" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="25" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">Bước 2: Cắm lại dây POWER SW trên F_PANEL</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Góc dưới cùng bên phải bo mạch H510 có cụm chân F_PANEL.</text>
          <text x="15" y="68" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Hàng trên có 4 chân (chân thứ 5 bị khuyết). Cắm dây</text>
          <text x="15" y="85" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">POWER SW vào đúng 2 chân kim sát cạnh chỗ khuyết kim đó.</text>
        </g>

        <g transform="translate(25, 265)">
          <rect width="430" height="95" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="25" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="900">Bước 3: Mẹo kích nguồn bằng đầu tua vít</text>
          <text x="15" y="48" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Rút dây POWER SW ra, chạm nhẹ đầu tua vít cùng lúc 2 chân kim.</text>
          <text x="15" y="68" fill="#fde047" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">• Nếu quạt quay ngay ➔ Hỏng nút bấm ngoài vỏ case!</text>
          <text x="15" y="85" fill="#fca5a5" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">• Nếu vẫn im re ➔ Bộ nguồn ATX đã chết, thay nguồn khác.</text>
        </g>
      </g>

      <g transform="translate(60, 520)">
        <rect width="1090" height="195" rx="12" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
        <text x="25" y="32" fill="#fbbf24" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">💡 MẸO ĐỜI THƯỜNG DỄ NHỚ VỀ NÚT POWER SW:</text>
        <text x="25" y="60" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Nút POWER SW giống như chuông cửa nhà: Bạn bấm chuông là chạm 2 dây điện lại với nhau trong 1 giây để chuông reo.</text>
        <text x="25" y="82" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Đầu tua vít cũng có kim loại dẫn điện: Khi quẹt ngang 2 chân kim là giả lập cú bấm chuông, máy tính sẽ bật nguồn ngay lập tức!</text>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(targetDir, "diag-case-1-fpanel-power.jpg"));
    console.log("Created diag-case-1-fpanel-power.jpg");
  }

  // Case 2: diag-case-2-ram-vga.jpg (Dùng step-3-cha-ram-cuc-tay.jpg)
  if (fs.existsSync(path.join(targetDir, "step-3-cha-ram-cuc-tay.jpg"))) {
    fs.copyFileSync(path.join(targetDir, "step-3-cha-ram-cuc-tay.jpg"), path.join(targetDir, "diag-case-2-ram-vga.jpg"));
    console.log("Created diag-case-2-ram-vga.jpg");
  }

  // Case 3: diag-case-3-sata-boot.jpg (Cáp SATA & Đít ổ SSD)
  {
    const sataPath = path.join(targetDir, "sata-cable.jpg");
    let sataBase64 = "";
    if (fs.existsSync(sataPath)) {
      const buf = await sharp(sataPath).resize(560, 360, { fit: "contain", background: "#0b0f19" }).jpeg({ quality: 80 }).toBuffer();
      sataBase64 = `data:image/jpeg;base64,${buf.toString("base64")}`;
    }

    const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgC3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#bgC3)"/>
      <rect x="50" y="25" width="1100" height="75" rx="12" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
      <text x="80" y="58" fill="#60a5fa" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">CA 3: LỖI 'NO BOOTABLE DEVICE' (CÁP DỮ LIỆU SATA &amp; THỨ TỰ KHỞI ĐỘNG BIOS)</text>
      <text x="80" y="82" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Triệu chứng: Màn hình đen hiện chữ trắng 'No Bootable Device'. 90% do tuột cáp SATA hoặc lỏng dây nguồn ổ cứng SSD!</text>

      <g transform="translate(60, 120)">
        <rect width="580" height="380" rx="16" fill="#0b0f19" stroke="#475569" stroke-width="2"/>
        ${sataBase64 ? `<image href="${sataBase64}" x="10" y="10" width="560" height="360"/>` : `<rect x="10" y="10" width="560" height="360" fill="#1e293b"/>`}
        
        <g transform="translate(180, 240)">
          <rect width="220" height="50" rx="8" fill="#1d4ed8" stroke="#60a5fa" stroke-width="2"/>
          <text x="110" y="24" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="900" text-anchor="middle">CÁP SATA CÓ LẪY KIM LOẠI</text>
          <text x="110" y="40" fill="#bfdbfe" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Gờ chữ L chống cắm ngược</text>
        </g>
      </g>

      <g transform="translate(670, 120)">
        <rect width="480" height="380" rx="16" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="30" y="35" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="bold">CÁCH XỬ LÝ LỖI NO BOOTABLE TRONG 3 PHÚT:</text>

        <g transform="translate(25, 55)">
          <rect width="430" height="85" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="25" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">1. Kiểm tra 2 sợi dây chữ L ở đít ổ SSD</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Rút điện, cắm chặt lại cáp nguồn SATA dẹt và cáp SATA dữ liệu.</text>
          <text x="15" y="68" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Đổi cổng cắm SATA sang cổng số 1 bên cạnh trên bo mạch H510.</text>
        </g>

        <g transform="translate(25, 155)">
          <rect width="430" height="95" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="25" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">2. Chỉnh lại thứ tự Boot trong BIOS</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Bật máy, bấm phím Delete hoặc F2 liên tục để vào BIOS.</text>
          <text x="15" y="68" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Vào thẻ 'Boot' ➔ Đưa dòng tên ổ cứng SSD lên dòng số 1 (Boot Option #1).</text>
          <text x="15" y="85" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">Bấm F10 chọn Yes (Enter) để lưu lại.</text>
        </g>

        <g transform="translate(25, 265)">
          <rect width="430" height="95" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="25" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="900">3. Trường hợp ổ cứng bị lỗi phân vùng</text>
          <text x="15" y="48" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Cắm USB WinPE vào ➔ bấm F11 chọn USB.</text>
          <text x="15" y="68" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Mở phần mềm Macrium Reflect hoặc Bootice nạp lại phân vùng khởi động EFI.</text>
        </g>
      </g>

      <g transform="translate(60, 520)">
        <rect width="1090" height="195" rx="12" fill="#0f172a" stroke="#3b82f6" stroke-width="2"/>
        <text x="25" y="32" fill="#60a5fa" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">💡 VÍ VON ĐỜI THƯỜNG:</text>
        <text x="25" y="60" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Lỗi No Bootable Device giống như bạn mở tủ cất sách nhưng ổ khóa bị kẹt hoặc ai đó rút mất chìa khóa (tuột dây).</text>
        <text x="25" y="82" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Cắm lại cáp SATA có lẫy kim loại kêu 'tách' là chìa khóa được cắm chặt vào tủ, máy tính đọc được Windows ngay!</text>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(targetDir, "diag-case-3-sata-boot.jpg"));
    console.log("Created diag-case-3-sata-boot.jpg");
  }

  // Case 4: diag-case-4-pin-cmos.jpg (Pin CMOS CR2032)
  {
    const cmosPath = path.join(targetDir, "pin-cmos.jpg");
    let cmosBase64 = "";
    if (fs.existsSync(cmosPath)) {
      const buf = await sharp(cmosPath).resize(560, 360, { fit: "cover" }).jpeg({ quality: 80 }).toBuffer();
      cmosBase64 = `data:image/jpeg;base64,${buf.toString("base64")}`;
    }

    const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgC4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#bgC4)"/>
      <rect x="50" y="25" width="1100" height="75" rx="12" fill="#1e293b" stroke="#eab308" stroke-width="2"/>
      <text x="80" y="58" fill="#fde047" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">CA 4: SAI NGÀY GIỜ &amp; BÁO 'PRESS F1' - THAY VIÊN PIN ĐỒNG XU CR2032 3V</text>
      <text x="80" y="82" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Triệu chứng: Mở máy hiện dòng chữ 'Press F1 to Continue', ngày giờ bị lùi về năm cũ (2015...), trình duyệt báo lỗi bảo mật chứng chỉ SSL!</text>

      <g transform="translate(60, 120)">
        <rect width="580" height="380" rx="16" fill="#0b0f19" stroke="#475569" stroke-width="2"/>
        ${cmosBase64 ? `<image href="${cmosBase64}" x="10" y="10" width="560" height="360"/>` : `<rect x="10" y="10" width="560" height="360" fill="#1e293b"/>`}
        
        <g transform="translate(180, 240)">
          <rect width="220" height="50" rx="8" fill="#a16207" stroke="#facc15" stroke-width="2"/>
          <text x="110" y="24" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="900" text-anchor="middle">PIN ĐỒNG XU CR2032 3V</text>
          <text x="110" y="40" fill="#fef08a" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Mặt có dấu (+) ngửa lên trên</text>
        </g>
      </g>

      <g transform="translate(670, 120)">
        <rect width="480" height="380" rx="16" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="30" y="35" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="bold">THAO TÁC THAY PIN TRONG 1 PHÚT:</text>

        <g transform="translate(25, 55)">
          <rect width="430" height="85" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="25" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">1. Rút điện &amp; Tháo viên pin cũ</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Rút phích cắm AC. Nhìn vào giữa bo mạch H510.</text>
          <text x="15" y="68" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Lấy móng tay bấm nhẹ vào lẫy kim loại cạnh khay, viên pin tự bật lên.</text>
        </g>

        <g transform="translate(25, 155)">
          <rect width="430" height="85" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="25" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">2. Lắp viên pin mới (Mặt + ngửa lên)</text>
          <text x="15" y="48" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Lấy viên pin mã CR2032 mới (điện thế 3V).</text>
          <text x="15" y="68" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold">Đặt mặt có chữ và dấu (+) ngửa lên, ấn nhẹ nghe tiếng 'tách'.</text>
        </g>

        <g transform="translate(25, 255)">
          <rect width="430" height="95" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
          <text x="15" y="25" fill="#34d399" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="900">3. Chỉnh lại ngày giờ trong BIOS</text>
          <text x="15" y="48" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Bật máy vào BIOS (Delete/F2), chỉnh đúng ngày giờ hiện tại.</text>
          <text x="15" y="68" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Bấm phím F10 chọn Yes để lưu. Từ nay máy tính không còn báo F1 nữa!</text>
        </g>
      </g>

      <g transform="translate(60, 520)">
        <rect width="1090" height="195" rx="12" fill="#0f172a" stroke="#eab308" stroke-width="2"/>
        <text x="25" y="32" fill="#fde047" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">💡 BẠN CÓ BIẾT?</text>
        <text x="25" y="60" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Viên pin CR2032 nhỏ như đồng xu nhưng có tuổi thọ nuôi đồng hồ máy tính từ 3 đến 5 năm liên tục.</text>
        <text x="25" y="82" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Khi pin hết, đồng hồ máy tính dừng lại làm trình duyệt Chrome, Edge chặn không cho vào web vì nghi ngờ trang web giả mạo!</text>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(targetDir, "diag-case-4-pin-cmos.jpg"));
    console.log("Created diag-case-4-pin-cmos.jpg");
  }

  // Case 5: diag-case-5-cpu-overheat.jpg (Dùng step-4-tra-keo-hat-dau-xanh.jpg)
  if (fs.existsSync(path.join(targetDir, "step-4-tra-keo-hat-dau-xanh.jpg"))) {
    fs.copyFileSync(path.join(targetDir, "step-4-tra-keo-hat-dau-xanh.jpg"), path.join(targetDir, "diag-case-5-cpu-overheat.jpg"));
    console.log("Created diag-case-5-cpu-overheat.jpg");
  }

  // =========================================================================
  // 9. WIRE 8-PIN CPU: wire-8pin-cpu.jpg
  // =========================================================================
  {
    const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgW8" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#bgW8)"/>
      <rect x="50" y="25" width="1100" height="75" rx="12" fill="#1e293b" stroke="#eab308" stroke-width="2"/>
      <text x="80" y="58" fill="#fde047" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">DÂY 2: CÁP CẤP NGUỒN PHỤ CPU 4-PIN / 8-PIN ATX 12V (VÀNG - ĐEN)</text>
      <text x="80" y="82" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Cắm vào ổ 8-pin ở góc trên cùng bên trái bo mạch H510. Quên cắm dây này là quạt quay nhưng máy KHÔNG LÊN HÌNH!</text>

      <!-- Visual connector graphic -->
      <g transform="translate(150, 140)">
        <rect width="400" height="340" rx="16" fill="#0b0f19" stroke="#64748b" stroke-width="2"/>
        <text x="200" y="45" fill="#f8fafc" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">ĐẦU NỐI 8 CHÂN (EPS12V / ATX12V)</text>

        <!-- 8 pins grid -->
        <g transform="translate(100, 80)">
          <!-- Top 4 pins (Black wires - Ground) -->
          <rect x="0" y="0" width="40" height="40" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
          <rect x="50" y="0" width="40" height="40" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
          <rect x="100" y="0" width="40" height="40" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
          <rect x="150" y="0" width="40" height="40" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
          
          <!-- Bottom 4 pins (Yellow wires - +12V) -->
          <rect x="0" y="50" width="40" height="40" rx="4" fill="#eab308" stroke="#ffffff" stroke-width="2"/>
          <rect x="50" y="50" width="40" height="40" rx="4" fill="#eab308" stroke="#ffffff" stroke-width="2"/>
          <rect x="100" y="50" width="40" height="40" rx="4" fill="#eab308" stroke="#ffffff" stroke-width="2"/>
          <rect x="150" y="50" width="40" height="40" rx="4" fill="#eab308" stroke="#ffffff" stroke-width="2"/>
        </g>

        <!-- Latch Graphic -->
        <rect x="180" y="190" width="40" height="25" rx="4" fill="#94a3b8"/>
        <text x="200" y="235" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">LẪY NHỰA KHÓA CHỐNG TUỘT</text>
        <text x="200" y="255" fill="#94a3b8" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" text-anchor="middle">Ấn ngập sâu đến khi nghe tiếng 'tách'</text>
      </g>

      <!-- Right Description -->
      <g transform="translate(600, 140)">
        <rect width="450" height="340" rx="16" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="30" y="40" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="bold">LƯU Ý KỸ THUẬT QUAN TRỌNG:</text>

        <g transform="translate(25, 65)">
          <rect width="400" height="75" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="24" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">1. Dây màu Vàng và Đen</text>
          <text x="15" y="46" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Dây Vàng mang điện áp +12V nuôi riêng cho CPU.</text>
          <text x="15" y="64" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Dây Đen là dây nối đất (Ground).</text>
        </g>

        <g transform="translate(25, 150)">
          <rect width="400" height="85" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="15" y="24" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">2. Tách làm đôi (4+4 pin)</text>
          <text x="15" y="46" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Nhiều bộ nguồn làm đầu cắm tách rời thành 2 cụm 4-pin.</text>
          <text x="15" y="64" fill="#cbd5e1" font-family="Segoe UI, Tahoma, sans-serif" font-size="11">Với bo mạch H510 có cổng 8-pin: Ghép cả 2 cụm 4-pin cắm vào.</text>
        </g>

        <g transform="translate(25, 245)">
          <rect width="400" height="75" rx="8" fill="#7f1d1d" stroke="#ef4444" stroke-width="1.5"/>
          <text x="15" y="24" fill="#fca5a5" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">❌ CẢNH BÁO TRÁNH CẮM LỘN DÂY VGA 8-PIN:</text>
          <text x="15" y="46" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="10">Dây nguồn CPU (in chữ CPU) khác với dây nguồn VGA (in chữ PCI-E).</text>
          <text x="15" y="62" fill="#fef08a" font-family="Segoe UI, Tahoma, sans-serif" font-size="10" font-weight="bold">Tuyệt đối không lấy dây PCI-E cắm vào chân CPU!</text>
        </g>
      </g>

      <g transform="translate(60, 510)">
        <rect width="1090" height="195" rx="12" fill="#0f172a" stroke="#eab308" stroke-width="2"/>
        <text x="25" y="32" fill="#fde047" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="900">💡 QUY TẮC CẮM DÂY POKA-YOKE:</text>
        <text x="25" y="60" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Mỗi chân cắm đều có hình dáng vát góc hoặc hình vuông khác nhau (chân Poka-Yoke).</text>
        <text x="25" y="82" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Nếu cắm đúng chiều thì trượt vào rất êm ái. Thấy cộm tay là đang cắm ngược hoặc nhầm dây, dừng lại kiểm tra ngay!</text>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(targetDir, "wire-8pin-cpu.jpg"));
    console.log("Created wire-8pin-cpu.jpg");
  }

  console.log("All ol-01 images successfully created!");
}

buildAll().catch(console.error);
