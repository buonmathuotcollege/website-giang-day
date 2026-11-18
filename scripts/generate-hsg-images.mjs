import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('public/images/hsg-02');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. cable-tia-568ab-standard.svg
const cableStdSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 650" width="1000" height="650">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1000" height="650" fill="url(#bgGrad)"/>
  
  <!-- Header -->
  <rect x="30" y="25" width="940" height="65" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
  <text x="50" y="55" fill="#38bdf8" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold" letter-spacing="1">QUY CHUẨN THI CÔNG HẠ TẦNG MẠNG TIA/EIA-568-C.2</text>
  <text x="50" y="75" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="18" font-weight="900">SƠ ĐỒ MÀU BẤM CÁP MẠNG CHUẨN TIA/EIA-568A VÀ TIA/EIA-568B</text>
  <rect x="780" y="42" width="170" height="32" rx="8" fill="#0284c7"/>
  <text x="865" y="63" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">CHUẨN GIGABIT 1Gbps</text>

  <!-- Chuẩn B (Phổ biến phòng lab & văn phòng) -->
  <g transform="translate(30, 110)" filter="url(#shadow)">
    <rect width="455" height="420" rx="16" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <rect x="20" y="18" width="415" height="42" rx="8" fill="#1d4ed8"/>
    <text x="35" y="44" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="bold">CHUẨN TIA/EIA-568B (ƯU TIÊN PHÒNG LAB)</text>

    <!-- 8 Wires Table -->
    <g transform="translate(25, 75)">
      <!-- Wire 1: Cam Trắng -->
      <rect y="0" width="405" height="34" rx="6" fill="#0f172a" stroke="#334155"/>
      <circle cx="20" cy="17" r="7" fill="#ffffff" stroke="#f97316" stroke-width="4"/>
      <text x="38" y="22" fill="#cbd5e1" font-family="monospace" font-size="13" font-weight="bold">Pin 1: Cam Trắng (TX+)</text>
      <rect x="300" y="7" width="90" height="20" rx="4" fill="#ea580c"/>
      <text x="345" y="21" fill="#fff" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Dữ liệu 1</text>

      <!-- Wire 2: Cam -->
      <rect y="40" width="405" height="34" rx="6" fill="#0f172a" stroke="#334155"/>
      <circle cx="20" cy="57" r="9" fill="#ea580c"/>
      <text x="38" y="62" fill="#cbd5e1" font-family="monospace" font-size="13" font-weight="bold">Pin 2: Cam (TX-)</text>
      <rect x="300" y="47" width="90" height="20" rx="4" fill="#ea580c"/>
      <text x="345" y="61" fill="#fff" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Dữ liệu 1</text>

      <!-- Wire 3: Xanh Lá Trắng -->
      <rect y="80" width="405" height="34" rx="6" fill="#0f172a" stroke="#334155"/>
      <circle cx="20" cy="97" r="7" fill="#ffffff" stroke="#22c55e" stroke-width="4"/>
      <text x="38" y="102" fill="#cbd5e1" font-family="monospace" font-size="13" font-weight="bold">Pin 3: Xanh Lá Trắng (RX+)</text>
      <rect x="300" y="87" width="90" height="20" rx="4" fill="#16a34a"/>
      <text x="345" y="101" fill="#fff" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Dữ liệu 2</text>

      <!-- Wire 4: Xanh Dương -->
      <rect y="120" width="405" height="34" rx="6" fill="#0f172a" stroke="#334155"/>
      <circle cx="20" cy="137" r="9" fill="#0284c7"/>
      <text x="38" y="142" fill="#cbd5e1" font-family="monospace" font-size="13" font-weight="bold">Pin 4: Xanh Dương</text>
      <rect x="300" y="127" width="90" height="20" rx="4" fill="#0284c7"/>
      <text x="345" y="141" fill="#fff" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Gigabit 3</text>

      <!-- Wire 5: Xanh Dương Trắng -->
      <rect y="160" width="405" height="34" rx="6" fill="#0f172a" stroke="#334155"/>
      <circle cx="20" cy="177" r="7" fill="#ffffff" stroke="#0284c7" stroke-width="4"/>
      <text x="38" y="182" fill="#cbd5e1" font-family="monospace" font-size="13" font-weight="bold">Pin 5: Xanh Dương Trắng</text>
      <rect x="300" y="167" width="90" height="20" rx="4" fill="#0284c7"/>
      <text x="345" y="181" fill="#fff" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Gigabit 3</text>

      <!-- Wire 6: Xanh Lá -->
      <rect y="200" width="405" height="34" rx="6" fill="#0f172a" stroke="#334155"/>
      <circle cx="20" cy="217" r="9" fill="#16a34a"/>
      <text x="38" y="222" fill="#cbd5e1" font-family="monospace" font-size="13" font-weight="bold">Pin 6: Xanh Lá (RX-)</text>
      <rect x="300" y="207" width="90" height="20" rx="4" fill="#16a34a"/>
      <text x="345" y="221" fill="#fff" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Dữ liệu 2</text>

      <!-- Wire 7: Nâu Trắng -->
      <rect y="240" width="405" height="34" rx="6" fill="#0f172a" stroke="#334155"/>
      <circle cx="20" cy="257" r="7" fill="#ffffff" stroke="#854d0e" stroke-width="4"/>
      <text x="38" y="262" fill="#cbd5e1" font-family="monospace" font-size="13" font-weight="bold">Pin 7: Nâu Trắng</text>
      <rect x="300" y="247" width="90" height="20" rx="4" fill="#854d0e"/>
      <text x="345" y="261" fill="#fff" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Gigabit 4</text>

      <!-- Wire 8: Nâu -->
      <rect y="280" width="405" height="34" rx="6" fill="#0f172a" stroke="#334155"/>
      <circle cx="20" cy="297" r="9" fill="#713f12"/>
      <text x="38" y="302" fill="#cbd5e1" font-family="monospace" font-size="13" font-weight="bold">Pin 8: Nâu</text>
      <rect x="300" y="287" width="90" height="20" rx="4" fill="#713f12"/>
      <text x="345" y="301" fill="#fff" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Gigabit 4</text>
    </g>
  </g>

  <!-- Chuẩn A -->
  <g transform="translate(515, 110)" filter="url(#shadow)">
    <rect width="455" height="420" rx="16" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <rect x="20" y="18" width="415" height="42" rx="8" fill="#047857"/>
    <text x="35" y="44" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="14" font-weight="bold">CHUẨN TIA/EIA-568A (ĐẢO CẶP CAM ↔ XANH LÁ)</text>

    <!-- 8 Wires Table -->
    <g transform="translate(25, 75)">
      <!-- Wire 1: Xanh Lá Trắng -->
      <rect y="0" width="405" height="34" rx="6" fill="#0f172a" stroke="#334155"/>
      <circle cx="20" cy="17" r="7" fill="#ffffff" stroke="#22c55e" stroke-width="4"/>
      <text x="38" y="22" fill="#cbd5e1" font-family="monospace" font-size="13" font-weight="bold">Pin 1: Xanh Lá Trắng</text>

      <!-- Wire 2: Xanh Lá -->
      <rect y="40" width="405" height="34" rx="6" fill="#0f172a" stroke="#334155"/>
      <circle cx="20" cy="57" r="9" fill="#16a34a"/>
      <text x="38" y="62" fill="#cbd5e1" font-family="monospace" font-size="13" font-weight="bold">Pin 2: Xanh Lá</text>

      <!-- Wire 3: Cam Trắng -->
      <rect y="80" width="405" height="34" rx="6" fill="#0f172a" stroke="#334155"/>
      <circle cx="20" cy="97" r="7" fill="#ffffff" stroke="#f97316" stroke-width="4"/>
      <text x="38" y="102" fill="#cbd5e1" font-family="monospace" font-size="13" font-weight="bold">Pin 3: Cam Trắng</text>

      <!-- Wire 4: Xanh Dương -->
      <rect y="120" width="405" height="34" rx="6" fill="#0f172a" stroke="#334155"/>
      <circle cx="20" cy="137" r="9" fill="#0284c7"/>
      <text x="38" y="142" fill="#cbd5e1" font-family="monospace" font-size="13" font-weight="bold">Pin 4: Xanh Dương</text>

      <!-- Wire 5: Xanh Dương Trắng -->
      <rect y="160" width="405" height="34" rx="6" fill="#0f172a" stroke="#334155"/>
      <circle cx="20" cy="177" r="7" fill="#ffffff" stroke="#0284c7" stroke-width="4"/>
      <text x="38" y="182" fill="#cbd5e1" font-family="monospace" font-size="13" font-weight="bold">Pin 5: Xanh Dương Trắng</text>

      <!-- Wire 6: Cam -->
      <rect y="200" width="405" height="34" rx="6" fill="#0f172a" stroke="#334155"/>
      <circle cx="20" cy="217" r="9" fill="#ea580c"/>
      <text x="38" y="222" fill="#cbd5e1" font-family="monospace" font-size="13" font-weight="bold">Pin 6: Cam</text>

      <!-- Wire 7: Nâu Trắng -->
      <rect y="240" width="405" height="34" rx="6" fill="#0f172a" stroke="#334155"/>
      <circle cx="20" cy="257" r="7" fill="#ffffff" stroke="#854d0e" stroke-width="4"/>
      <text x="38" y="262" fill="#cbd5e1" font-family="monospace" font-size="13" font-weight="bold">Pin 7: Nâu Trắng</text>

      <!-- Wire 8: Nâu -->
      <rect y="280" width="405" height="34" rx="6" fill="#0f172a" stroke="#334155"/>
      <circle cx="20" cy="297" r="9" fill="#713f12"/>
      <text x="38" y="302" fill="#cbd5e1" font-family="monospace" font-size="13" font-weight="bold">Pin 8: Nâu</text>
    </g>
  </g>

  <!-- Poka-Yoke Footer Tip -->
  <rect x="30" y="550" width="940" height="75" rx="12" fill="#0f172a" stroke="#eab308" stroke-width="2"/>
  <text x="50" y="580" fill="#facc15" font-family="Segoe UI, Tahoma, sans-serif" font-size="13" font-weight="900">🛡️ LƯU Ý POKA-YOKE THI CÔNG CÁP GIGABIT:</text>
  <text x="50" y="605" fill="#e2e8f0" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">
    • Cáp thẳng (Straight-through): Bấm 2 đầu cùng chuẩn B (hoặc cùng chuẩn A) ➔ Kết nối PC vào Switch.
    • Cáp chéo (Crossover): 1 đầu chuẩn A + 1 đầu chuẩn B ➔ Kết nối Switch sang Switch hoặc PC sang PC.
    • Đạt chuẩn Gigabit (1000 Mbps) bắt buộc thông mạch cả 8/8 sợi (nếu chỉ thông 4 sợi 1,2,3,6 tốc độ chỉ đạt tối đa 100 Mbps).
  </text>
</svg>
`;

// 2. cable-tester-gigabit.svg
const cableTesterSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 650" width="1000" height="650">
  <rect width="1000" height="650" fill="#0f172a"/>
  
  <rect x="40" y="30" width="920" height="70" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
  <text x="65" y="60" fill="#10b981" font-family="Segoe UI, Tahoma, sans-serif" font-size="12" font-weight="bold">TIÊU CHUẨN ĐO THÔNG MẠCH & TỐC ĐỘ</text>
  <text x="65" y="82" fill="#ffffff" font-family="Segoe UI, Tahoma, sans-serif" font-size="18" font-weight="900">MÁY TEST MẠNG RJ45 THÔNG MẠCH 8/8 SỢI & ĐO LIÊN KẾT GIGABIT 1000 Mbps</text>
  
  <!-- Máy Master -->
  <g transform="translate(100, 130)">
    <rect width="240" height="380" rx="20" fill="#1e293b" stroke="#475569" stroke-width="3"/>
    <rect x="25" y="25" width="190" height="40" rx="8" fill="#0f172a"/>
    <text x="120" y="50" fill="#38bdf8" font-family="Segoe UI, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">MASTER TESTER</text>
    
    <!-- RJ45 Port on Top -->
    <rect x="70" y="-15" width="100" height="25" rx="6" fill="#334155" stroke="#94a3b8"/>
    
    <!-- 8 LED Lights -->
    <g transform="translate(45, 90)">
      ${[1,2,3,4,5,6,7,8].map((i) => `
        <g transform="translate(0, ${(i-1)*32})">
          <circle cx="15" cy="12" r="8" fill="#22c55e"/>
          <circle cx="15" cy="12" r="3" fill="#ffffff"/>
          <text x="40" y="17" fill="#ffffff" font-family="monospace" font-size="13" font-weight="bold">PIN ${i} : THÔNG MẠCH</text>
        </g>
      `).join('')}
    </g>
    
    <!-- Power & Status -->
    <rect x="35" y="325" width="170" height="32" rx="8" fill="#10b981"/>
    <text x="120" y="346" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">✓ ĐẠT 8/8 SỢI THÔNG SUỐT</text>
  </g>

  <!-- Cáp mạng nối giữa 2 máy -->
  <path d="M 340 260 C 450 260, 450 260, 560 260" stroke="#3b82f6" stroke-width="12" fill="none" stroke-linecap="round"/>
  <rect x="400" y="235" width="100" height="50" rx="10" fill="#1d4ed8"/>
  <text x="450" y="265" fill="#ffffff" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">UTP CAT6</text>

  <!-- Máy Remote -->
  <g transform="translate(560, 130)">
    <rect width="240" height="380" rx="20" fill="#1e293b" stroke="#475569" stroke-width="3"/>
    <rect x="25" y="25" width="190" height="40" rx="8" fill="#0f172a"/>
    <text x="120" y="50" fill="#38bdf8" font-family="Segoe UI, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">REMOTE TERMINATOR</text>
    
    <!-- 8 LED Lights Remote -->
    <g transform="translate(45, 90)">
      ${[1,2,3,4,5,6,7,8].map((i) => `
        <g transform="translate(0, ${(i-1)*32})">
          <circle cx="15" cy="12" r="8" fill="#22c55e"/>
          <circle cx="15" cy="12" r="3" fill="#ffffff"/>
          <text x="40" y="17" fill="#ffffff" font-family="monospace" font-size="13" font-weight="bold">PIN ${i} : ĐÈN NHẢY ĐỀU</text>
        </g>
      `).join('')}
    </g>
    
    <rect x="35" y="325" width="170" height="32" rx="8" fill="#10b981"/>
    <text x="120" y="346" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">✓ KHÔNG ĐỨT NGẦM</text>
  </g>

  <!-- Card kết nối Switch Gigabit -->
  <g transform="translate(830, 160)">
    <rect width="130" height="320" rx="14" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
    <text x="65" y="35" fill="#38bdf8" font-family="Segoe UI, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">CỔNG SWITCH</text>
    <rect x="25" y="55" width="80" height="50" rx="8" fill="#1e293b" stroke="#64748b"/>
    <circle cx="65" cy="130" r="14" fill="#10b981"/>
    <text x="65" y="165" fill="#10b981" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">1000 Mbps</text>
    <text x="65" y="185" fill="#cbd5e1" font-family="sans-serif" font-size="10" text-anchor="middle">Gigabit Link</text>
    <rect x="15" y="220" width="100" height="75" rx="8" fill="#1e293b"/>
    <text x="65" y="245" fill="#94a3b8" font-family="sans-serif" font-size="9" text-anchor="middle">Đèn LED cam xanh</text>
    <text x="65" y="265" fill="#22c55e" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Sáng ổn định</text>
  </g>

  <!-- Footer -->
  <rect x="40" y="540" width="920" height="80" rx="12" fill="#1e293b" stroke="#334155"/>
  <text x="65" y="570" fill="#facc15" font-family="sans-serif" font-size="12" font-weight="bold">⚠️ QUY CHUẨN CHẤM THI CỦA GIÁM KHẢO:</text>
  <text x="65" y="595" fill="#cbd5e1" font-family="sans-serif" font-size="11">
    1. Máy test sáng tuần tự từ 1 đến 8 (không lộn xộn, không tắt đèn nào) ➔ Đạt trọn vẹn 8.0 điểm mạch cáp.
    2. Cắm vào Switch phòng máy nhận tốc độ 1.0 Gbps (1000M Full Duplex) ➔ Đạt trọn vẹn 6.0 điểm tốc độ.
  </text>
</svg>
`;

// 3. topology-packet-tracer-vlsm.svg
const topologySvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 650" width="1000" height="650">
  <rect width="1000" height="650" fill="#0f172a"/>
  
  <!-- Header -->
  <rect x="30" y="20" width="940" height="60" rx="12" fill="#1e293b" stroke="#334155"/>
  <text x="50" y="45" fill="#38bdf8" font-family="Segoe UI, sans-serif" font-size="11" font-weight="bold">SƠ ĐỒ NGUYÊN LÝ LOGIC (CISCO PACKET TRACER) & QUY HOẠCH IP VLSM</text>
  <text x="50" y="65" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="16" font-weight="900">MÔ HÌNH MẠNG DOANH NGHIỆP TRỌN GÓI CHO 4 PHÒNG BAN CHUYÊN BIỆT</text>
  
  <!-- Router Core -->
  <g transform="translate(420, 105)">
    <circle cx="80" cy="45" r="40" fill="#1d4ed8" stroke="#60a5fa" stroke-width="2.5"/>
    <text x="80" y="43" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">ROUTER CORE</text>
    <text x="80" y="58" fill="#93c5fd" font-family="monospace" font-size="10" text-anchor="middle">192.168.1.1/24</text>
  </g>

  <!-- Distribution Switch -->
  <g transform="translate(400, 220)">
    <rect width="200" height="45" rx="8" fill="#0f766e" stroke="#2dd4bf" stroke-width="2"/>
    <text x="100" y="28" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">SWITCH GIGABIT 24-PORT</text>
  </g>

  <!-- Lines Router -> Switch -->
  <line x1="500" y1="185" x2="500" y2="220" stroke="#38bdf8" stroke-width="3"/>
  <rect x="505" y="195" width="80" height="18" rx="4" fill="#0284c7"/>
  <text x="545" y="208" fill="#fff" font-family="sans-serif" font-size="9" text-anchor="middle">Trunk 802.1Q</text>

  <!-- 4 Department VLANs Grid -->
  <!-- VLAN 10: Ban Giám Đốc -->
  <g transform="translate(40, 310)">
    <rect width="210" height="200" rx="14" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
    <rect x="15" y="12" width="180" height="30" rx="6" fill="#b45309"/>
    <text x="105" y="32" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">VLAN 10: BAN GIÁM ĐỐC</text>
    
    <g transform="translate(15, 52)" font-family="monospace" font-size="10" fill="#e2e8f0">
      <text y="15">• Dải IP: 192.168.10.0/27</text>
      <text y="35">• Mask: 255.255.255.224</text>
      <text y="55">• Gateway: 192.168.10.1</text>
      <text y="75">• Host: .2 đến .30 (29 PC)</text>
      <text y="95">• Broadcast: .31</text>
    </g>
    <rect x="25" y="155" width="160" height="30" rx="6" fill="#0f172a" stroke="#475569"/>
    <text x="105" y="174" fill="#38bdf8" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Ưu tiên băng thông QoS</text>
  </g>

  <!-- VLAN 20: Kế Toán -->
  <g transform="translate(280, 310)">
    <rect width="210" height="200" rx="14" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <rect x="15" y="12" width="180" height="30" rx="6" fill="#047857"/>
    <text x="105" y="32" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">VLAN 20: PHÒNG KẾ TOÁN</text>
    
    <g transform="translate(15, 52)" font-family="monospace" font-size="10" fill="#e2e8f0">
      <text y="15">• Dải IP: 192.168.10.32/26</text>
      <text y="35">• Mask: 255.255.255.192</text>
      <text y="55">• Gateway: 192.168.10.33</text>
      <text y="75">• Host: .34 đến .94 (61 PC)</text>
      <text y="95">• Broadcast: .95</text>
    </g>
    <rect x="25" y="155" width="160" height="30" rx="6" fill="#0f172a" stroke="#475569"/>
    <text x="105" y="174" fill="#34d399" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Bảo mật tài chính nghiêm ngặt</text>
  </g>

  <!-- VLAN 30: Kỹ Thuật -->
  <g transform="translate(520, 310)">
    <rect width="210" height="200" rx="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <rect x="15" y="12" width="180" height="30" rx="6" fill="#1d4ed8"/>
    <text x="105" y="32" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">VLAN 30: PHÒNG KỸ THUẬT</text>
    
    <g transform="translate(15, 52)" font-family="monospace" font-size="10" fill="#e2e8f0">
      <text y="15">• Dải IP: 192.168.10.96/26</text>
      <text y="35">• Mask: 255.255.255.192</text>
      <text y="55">• Gateway: 192.168.10.97</text>
      <text y="75">• Host: .98 đến .158 (61 PC)</text>
      <text y="95">• Broadcast: .159</text>
    </g>
    <rect x="25" y="155" width="160" height="30" rx="6" fill="#0f172a" stroke="#475569"/>
    <text x="105" y="174" fill="#60a5fa" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Cổng Gigabit 1Gbps</text>
  </g>

  <!-- VLAN 40: Máy Chủ Server -->
  <g transform="translate(760, 310)">
    <rect width="200" height="200" rx="14" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
    <rect x="15" y="12" width="170" height="30" rx="6" fill="#6d28d9"/>
    <text x="100" y="32" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">VLAN 40: SERVER & IN LAN</text>
    
    <g transform="translate(15, 52)" font-family="monospace" font-size="10" fill="#e2e8f0">
      <text y="15">• Dải IP: 192.168.10.160/28</text>
      <text y="35">• Mask: 255.255.255.240</text>
      <text y="55">• Gateway: 192.168.10.161</text>
      <text y="75">• Host: .162 đến .174 (13 Máy)</text>
      <text y="95">• Broadcast: .175</text>
    </g>
    <rect x="20" y="155" width="160" height="30" rx="6" fill="#0f172a" stroke="#475569"/>
    <text x="100" y="174" fill="#c084fc" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">IP Tĩnh Server & Máy In</text>
  </g>

  <!-- Links from Switch to VLANs -->
  <path d="M 430 265 L 145 310" stroke="#f59e0b" stroke-width="2"/>
  <path d="M 470 265 L 385 310" stroke="#10b981" stroke-width="2"/>
  <path d="M 530 265 L 625 310" stroke="#3b82f6" stroke-width="2"/>
  <path d="M 570 265 L 860 310" stroke="#8b5cf6" stroke-width="2"/>

  <!-- Footer Tip -->
  <rect x="30" y="535" width="940" height="85" rx="12" fill="#1e293b" stroke="#334155"/>
  <text x="50" y="565" fill="#facc15" font-family="sans-serif" font-size="12" font-weight="bold">💡 BÍ QUYẾT QUY HOẠCH IP VLSM KHÔNG BAO GIỜ TRÙNG LẶP:</text>
  <text x="50" y="590" fill="#cbd5e1" font-family="sans-serif" font-size="11">
    Sắp xếp các phòng ban theo nhu cầu số máy giảm dần: Kế toán (60 máy /26) ➔ Kỹ thuật (60 máy /26) ➔ Giám đốc (30 máy /27) ➔ Server (14 máy /28).
    Cách này giúp lấp đầy các khối mạng con liên tiếp mà không sinh ra các khoảng trống lãng phí địa chỉ IP.
  </text>
</svg>
`;

// 4. win10-static-ip-config.svg
const win10IpSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 650" width="1000" height="650">
  <rect width="1000" height="650" fill="#0f172a"/>
  
  <!-- Windows 10 Classical Dialog Frame -->
  <g transform="translate(180, 40)">
    <!-- Window Shadow & Background -->
    <rect width="640" height="570" rx="4" fill="#f0f0f0" stroke="#0078d7" stroke-width="2"/>
    
    <!-- Titlebar -->
    <rect width="640" height="32" fill="#ffffff"/>
    <text x="15" y="21" fill="#000000" font-family="Segoe UI, Tahoma, sans-serif" font-size="12">Internet Protocol Version 4 (TCP/IPv4) Properties</text>
    <rect x="595" y="0" width="45" height="32" fill="#e81123"/>
    <text x="617" y="21" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">✕</text>
    
    <!-- Tab General -->
    <rect x="15" y="45" width="610" height="465" rx="3" fill="#ffffff" stroke="#d9d9d9"/>
    <text x="35" y="75" fill="#000000" font-family="Segoe UI, sans-serif" font-size="11">You can get IP settings assigned automatically if your network supports it.</text>
    <text x="35" y="92" fill="#000000" font-family="Segoe UI, sans-serif" font-size="11">Otherwise, you need to ask your network administrator for the appropriate IP settings.</text>

    <!-- Radio: Use the following IP address -->
    <g transform="translate(35, 115)">
      <circle cx="10" cy="10" r="7" fill="none" stroke="#767676" stroke-width="1.5"/>
      <text x="25" y="14" fill="#000000" font-family="Segoe UI, sans-serif" font-size="12">Obtain an IP address automatically</text>
      
      <circle cx="10" cy="40" r="7" fill="#0078d7" stroke="#0078d7" stroke-width="1.5"/>
      <circle cx="10" cy="40" r="3" fill="#ffffff"/>
      <text x="25" y="44" fill="#000000" font-family="Segoe UI, sans-serif" font-size="12" font-weight="bold">Use the following IP address:</text>
    </g>

    <!-- Inputs Group: IP, Subnet Mask, Gateway -->
    <g transform="translate(55, 175)" font-family="Segoe UI, sans-serif" font-size="12">
      <!-- IP Address -->
      <text x="0" y="20">IP address:</text>
      <rect x="160" y="3" width="280" height="26" fill="#ffffff" stroke="#0078d7" stroke-width="2"/>
      <text x="175" y="21" font-family="monospace" font-size="13" font-weight="bold" fill="#003366">192 . 168 .  10 .  45</text>
      <rect x="450" y="6" width="120" height="20" rx="3" fill="#dbeafe"/>
      <text x="510" y="20" fill="#1e40af" font-size="10" font-weight="bold" text-anchor="middle">IP Máy Trạm</text>

      <!-- Subnet Mask -->
      <text x="0" y="55">Subnet mask:</text>
      <rect x="160" y="38" width="280" height="26" fill="#ffffff" stroke="#0078d7" stroke-width="2"/>
      <text x="175" y="56" font-family="monospace" font-size="13" font-weight="bold" fill="#003366">255 . 255 . 255 . 192</text>
      <rect x="450" y="41" width="120" height="20" rx="3" fill="#fef3c7"/>
      <text x="510" y="55" fill="#92400e" font-size="10" font-weight="bold" text-anchor="middle">Prefix /26</text>

      <!-- Default Gateway -->
      <text x="0" y="90">Default gateway:</text>
      <rect x="160" y="73" width="280" height="26" fill="#ffffff" stroke="#0078d7" stroke-width="2"/>
      <text x="175" y="91" font-family="monospace" font-size="13" font-weight="bold" fill="#003366">192 . 168 .  10 .  33</text>
      <rect x="450" y="76" width="120" height="20" rx="3" fill="#dcfce7"/>
      <text x="510" y="90" fill="#166534" font-size="10" font-weight="bold" text-anchor="middle">Cổng Router</text>
    </g>

    <!-- DNS Radio & Inputs -->
    <g transform="translate(35, 300)">
      <circle cx="10" cy="15" r="7" fill="#0078d7" stroke="#0078d7" stroke-width="1.5"/>
      <circle cx="10" cy="15" r="3" fill="#ffffff"/>
      <text x="25" y="19" fill="#000000" font-family="Segoe UI, sans-serif" font-size="12" font-weight="bold">Use the following DNS server addresses:</text>
    </g>

    <g transform="translate(55, 340)" font-family="Segoe UI, sans-serif" font-size="12">
      <!-- Preferred DNS -->
      <text x="0" y="20">Preferred DNS server:</text>
      <rect x="160" y="3" width="280" height="26" fill="#ffffff" stroke="#767676"/>
      <text x="175" y="21" font-family="monospace" font-size="13" font-weight="bold" fill="#000000">  8 .   8 .   8 .   8</text>
      <text x="455" y="20" fill="#64748b" font-size="11">Google DNS</text>

      <!-- Alternate DNS -->
      <text x="0" y="55">Alternate DNS server:</text>
      <rect x="160" y="38" width="280" height="26" fill="#ffffff" stroke="#767676"/>
      <text x="175" y="56" font-family="monospace" font-size="13" font-weight="bold" fill="#000000">  1 .   1 .   1 .   1</text>
      <text x="455" y="55" fill="#64748b" font-size="11">Cloudflare DNS</text>
    </g>

    <!-- Buttons OK Cancel -->
    <rect x="420" y="525" width="90" height="30" rx="3" fill="#e1e1e1" stroke="#adadad"/>
    <text x="465" y="545" fill="#000" font-family="Segoe UI" font-size="12" text-anchor="middle">OK</text>
    <rect x="525" y="525" width="90" height="30" rx="3" fill="#e1e1e1" stroke="#adadad"/>
    <text x="570" y="545" fill="#000" font-family="Segoe UI" font-size="12" text-anchor="middle">Cancel</text>
  </g>
</svg>
`;

// 5. ntfs-security-matrix.svg
const ntfsMatrixSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 650" width="1000" height="650">
  <rect width="1000" height="650" fill="#0f172a"/>
  
  <rect x="30" y="20" width="940" height="60" rx="12" fill="#1e293b" stroke="#334155"/>
  <text x="50" y="45" fill="#38bdf8" font-family="Segoe UI, sans-serif" font-size="11" font-weight="bold">QUẢN TRỊ FILE SERVER WINDOWS 10 / WINDOWS SERVER</text>
  <text x="50" y="65" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="16" font-weight="900">MA TRẬN PHÂN QUYỀN NÂNG CAO SHARE PERMISSIONS VÀ NTFS SECURITY</text>

  <!-- Left: Dialog Permissions -->
  <g transform="translate(50, 105)">
    <rect width="450" height="500" rx="8" fill="#f0f0f0" stroke="#0078d7" stroke-width="2"/>
    <rect width="450" height="30" fill="#ffffff"/>
    <text x="15" y="20" fill="#000" font-family="Segoe UI" font-size="12">Advanced Security Settings for DU_LIEU_NOI_BO</text>
    
    <!-- User List -->
    <rect x="20" y="50" width="410" height="150" fill="#fff" stroke="#d9d9d9"/>
    <g transform="translate(30, 75)" font-family="Segoe UI" font-size="12">
      <text y="0" font-weight="bold" fill="#1e40af">👤 BanGiamDoc (Full Control - Toàn quyền)</text>
      <text y="28" font-weight="bold" fill="#065f46">👤 KeToan_Group (Modify - Sửa &amp; Ghi)</text>
      <text y="56" font-weight="bold" fill="#854d0e">👤 NhanVien_Chung (Read &amp; Execute - Chỉ đọc)</text>
      <text y="84" font-weight="bold" fill="#991b1b">🚫 Everyone (DENY - Chặn vãng lai)</text>
    </g>

    <!-- Permission Checkboxes -->
    <g transform="translate(20, 220)">
      <rect width="410" height="230" fill="#fff" stroke="#d9d9d9"/>
      <g transform="translate(20, 25)" font-family="Segoe UI" font-size="12">
        <text y="0" font-weight="bold">Permissions for Selected User:</text>
        <g transform="translate(0, 25)">
          <rect y="0" width="16" height="16" fill="#0078d7"/>
          <text x="8" y="13" fill="#fff" font-size="11" text-anchor="middle">✓</text>
          <text x="25" y="13">Full control (Toàn quyền quản trị)</text>

          <rect y="30" width="16" height="16" fill="#0078d7"/>
          <text x="8" y="43" fill="#fff" font-size="11" text-anchor="middle">✓</text>
          <text x="25" y="43">Modify (Sửa đổi &amp; Xóa)</text>

          <rect y="60" width="16" height="16" fill="#0078d7"/>
          <text x="8" y="73" fill="#fff" font-size="11" text-anchor="middle">✓</text>
          <text x="25" y="73">Read &amp; execute (Đọc &amp; Chạy file)</text>

          <rect y="90" width="16" height="16" fill="#0078d7"/>
          <text x="8" y="103" fill="#fff" font-size="11" text-anchor="middle">✓</text>
          <text x="25" y="103">List folder contents (Xem danh sách)</text>

          <rect y="120" width="16" height="16" fill="#0078d7"/>
          <text x="8" y="133" fill="#fff" font-size="11" text-anchor="middle">✓</text>
          <text x="25" y="133">Write (Ghi file mới)</text>
        </g>
      </g>
    </g>
  </g>

  <!-- Right: Rule Comparison -->
  <g transform="translate(530, 105)">
    <!-- Card Share vs NTFS -->
    <rect width="430" height="235" rx="14" fill="#1e293b" stroke="#334155"/>
    <text x="25" y="35" fill="#38bdf8" font-family="Segoe UI" font-size="13" font-weight="bold">QUY TẮC HIỆP LỰC GIỮA SHARE VÀ NTFS:</text>
    <g transform="translate(25, 60)" font-family="Segoe UI" font-size="12" fill="#e2e8f0">
      <text y="0">Khi truy cập qua mạng LAN (\\IP_SERVER\\ShareFolder):</text>
      <text y="25" font-weight="bold" fill="#facc15">Quyền Thực Tế = Quyền Nghiêm Ngặt Nhất (Most Restrictive)</text>
      <text y="55">• Share: Full Control + NTFS: Read Only ➔ <tspan fill="#f87171" font-weight="bold">CHỈ ĐƯỢC ĐỌC</tspan></text>
      <text y="80">• Share: Read Only + NTFS: Full Control ➔ <tspan fill="#f87171" font-weight="bold">CHỈ ĐƯỢC ĐỌC</tspan></text>
      <text y="105">• Share: Full Control + NTFS: Modify ➔ <tspan fill="#4ade80" font-weight="bold">ĐƯỢC GHI &amp; SỬA</tspan></text>
      <text y="140" fill="#94a3b8" font-size="11">Khuyến cáo KTV: Cấp Share = Change/Full Control cho Authenticated Users,</text>
      <text y="155" fill="#94a3b8" font-size="11">quản lý chặt chẽ chi tiết từng phòng ban tại Tab Security (NTFS).</text>
    </g>

    <!-- Card Truy Cập Máy Trạm -->
    <rect y="255" width="430" height="245" rx="14" fill="#1e293b" stroke="#334155"/>
    <text x="25" y="285" fill="#4ade80" font-family="Segoe UI" font-size="13" font-weight="bold">CÚ PHÁP TRUY CẬP TỪ MÁY TRẠM (CLIENT):</text>
    <g transform="translate(25, 310)">
      <rect width="380" height="40" rx="8" fill="#0f172a" stroke="#0078d7"/>
      <text x="20" y="25" fill="#38bdf8" font-family="monospace" font-size="13" font-weight="bold">Windows + R ➔ \\192.168.10.160</text>
      <g transform="translate(0, 65)" font-family="Segoe UI" font-size="12" fill="#cbd5e1">
        <text y="0">1. Đăng nhập với User đã được cấp quyền.</text>
        <text y="25">2. Thử tạo 1 file .txt mới để test quyền Write.</text>
        <text y="50">3. Thử đổi tên hoặc xóa file để test quyền Modify.</text>
        <text y="80" fill="#facc15" font-weight="bold">✓ 0% lỗi Access Denied khi cấu hình đúng cả 2 tab!</text>
      </g>
    </g>
  </g>
</svg>
`;

// 6. system-full-acceptance-ping.svg
const systemAcceptanceSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 650" width="1000" height="650">
  <rect width="1000" height="650" fill="#0f172a"/>
  
  <rect x="30" y="20" width="940" height="60" rx="12" fill="#1e293b" stroke="#334155"/>
  <text x="50" y="45" fill="#38bdf8" font-family="Segoe UI, sans-serif" font-size="11" font-weight="bold">CHẶNG 5: NGHIỆM THU TOÀN DIỆN DỰ ÁN HẠ TẦNG</text>
  <text x="50" y="65" fill="#ffffff" font-family="Segoe UI, sans-serif" font-size="16" font-weight="900">KIỂM THỬ THÔNG MẠNG 100% 0% PACKET LOSS &amp; IN TEST PAGE THÀNH CÔNG</text>

  <!-- Left: Command Prompt CMD Window -->
  <g transform="translate(40, 105)">
    <rect width="520" height="490" rx="6" fill="#0c0c0c" stroke="#334155" stroke-width="2"/>
    <!-- CMD Titlebar -->
    <rect width="520" height="30" fill="#1f1f1f"/>
    <text x="15" y="20" fill="#cccccc" font-family="Consolas, monospace" font-size="12">Command Prompt - ping 192.168.10.1 -t</text>
    
    <!-- Console Output -->
    <g transform="translate(15, 55)" font-family="Consolas, monospace" font-size="12" fill="#cccccc">
      <text y="0">Microsoft Windows [Version 10.0.19045.3803]</text>
      <text y="18">(c) Microsoft Corporation. All rights reserved.</text>
      
      <text y="50" fill="#ffffff">C:\Users\KySuTruong> ping 192.168.10.1 -t</text>
      
      <text y="80">Pinging 192.168.10.1 with 32 bytes of data:</text>
      <text y="105" fill="#4ade80">Reply from 192.168.10.1: bytes=32 time&lt;1ms TTL=64</text>
      <text y="125" fill="#4ade80">Reply from 192.168.10.1: bytes=32 time&lt;1ms TTL=64</text>
      <text y="145" fill="#4ade80">Reply from 192.168.10.1: bytes=32 time&lt;1ms TTL=64</text>
      <text y="165" fill="#4ade80">Reply from 192.168.10.1: bytes=32 time&lt;1ms TTL=64</text>
      <text y="185" fill="#4ade80">Reply from 192.168.10.1: bytes=32 time&lt;1ms TTL=64</text>
      <text y="205" fill="#4ade80">Reply from 192.168.10.1: bytes=32 time&lt;1ms TTL=64</text>
      
      <text y="240" fill="#ffffff">Ping statistics for 192.168.10.1:</text>
      <text y="260">    Packets: Sent = 350, Received = 350, Lost = 0 (0% loss),</text>
      <text y="280">Approximate round trip times in milli-seconds:</text>
      <text y="300">    Minimum = 0ms, Maximum = 1ms, Average = 0ms</text>
      
      <!-- Test Page Printer LAN Status -->
      <text y="340" fill="#38bdf8">C:\Users\KySuTruong> net view \\192.168.10.160</text>
      <text y="365">Shared resources at \\192.168.10.160</text>
      <text y="385">Share name   Type   Used as  Comment</text>
      <text y="405">-------------------------------------------------</text>
      <text y="425" fill="#facc15">HP_LaserJet  Print           May in mang LAN phong ban</text>
      <text y="445" fill="#34d399">DU_LIEU_NB   Disk            Thu muc chia se noi bo</text>
    </g>
  </g>

  <!-- Right: Acceptance Report Checklist -->
  <g transform="translate(585, 105)">
    <rect width="380" height="490" rx="14" fill="#1e293b" stroke="#334155"/>
    <text x="25" y="35" fill="#4ade80" font-family="Segoe UI" font-size="13" font-weight="bold">KẾT QUẢ NGHIỆM THU ĐẠT CHUẨN:</text>
    
    <g transform="translate(25, 60)" font-family="Segoe UI" font-size="12">
      <!-- Item 1 -->
      <g transform="translate(0, 0)">
        <rect width="330" height="65" rx="8" fill="#0f172a" stroke="#22c55e"/>
        <text x="15" y="25" fill="#4ade80" font-weight="bold">✓ 1. Thông Mạng Tuyệt Đối 100%</text>
        <text x="15" y="45" fill="#cbd5e1" font-size="11">Rớt gói: 0% loss · Độ trễ &lt; 1ms (Switch Gigabit)</text>
      </g>

      <!-- Item 2 -->
      <g transform="translate(0, 80)">
        <rect width="330" height="65" rx="8" fill="#0f172a" stroke="#22c55e"/>
        <text x="15" y="25" fill="#4ade80" font-weight="bold">✓ 2. In Test Page Thành Công</text>
        <text x="15" y="45" fill="#cbd5e1" font-size="11">Lệnh in từ máy trạm in ngay không kẹt Spooler</text>
      </g>

      <!-- Item 3 -->
      <g transform="translate(0, 160)">
        <rect width="330" height="65" rx="8" fill="#0f172a" stroke="#22c55e"/>
        <text x="15" y="25" fill="#4ade80" font-weight="bold">✓ 3. Bảo Mật Wi-Fi &amp; AP Isolation</text>
        <text x="15" y="45" fill="#cbd5e1" font-size="11">Điện thoại khách không quét được IP máy trạm</text>
      </g>

      <!-- Item 4 -->
      <g transform="translate(0, 240)">
        <rect width="330" height="65" rx="8" fill="#0f172a" stroke="#22c55e"/>
        <text x="15" y="25" fill="#4ade80" font-weight="bold">✓ 4. Thuyết Trình Phản Biện 05 Phút</text>
        <text x="15" y="45" fill="#cbd5e1" font-size="11">Kỹ sư trưởng giải thích mạch lạc sơ đồ Topo</text>
      </g>

      <!-- Stamp -->
      <g transform="translate(45, 330)">
        <rect width="240" height="70" rx="8" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
        <text x="120" y="30" fill="#34d399" font-size="13" font-weight="900" text-anchor="middle">ĐỦ ĐIỀU KIỆN NGHIỆM THU</text>
        <text x="120" y="52" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">XẾP HẠNG: GIẢI XUẤT SẮC</text>
      </g>
    </g>
  </g>
</svg>
`;

function cleanSvg(str) {
  return str.replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;').trim();
}

// Write all SVGs with clean XML ampersands
fs.writeFileSync(path.join(outDir, 'cable-tia-568ab-standard.svg'), cleanSvg(cableStdSvg));
fs.writeFileSync(path.join(outDir, 'cable-tester-gigabit.svg'), cleanSvg(cableTesterSvg));
fs.writeFileSync(path.join(outDir, 'topology-packet-tracer-vlsm.svg'), cleanSvg(topologySvg));
fs.writeFileSync(path.join(outDir, 'win10-static-ip-config.svg'), cleanSvg(win10IpSvg));
fs.writeFileSync(path.join(outDir, 'ntfs-security-matrix.svg'), cleanSvg(ntfsMatrixSvg));
fs.writeFileSync(path.join(outDir, 'system-full-acceptance-ping.svg'), cleanSvg(systemAcceptanceSvg));

console.log('Successfully generated 6 technical illustration graphics in:', outDir);
