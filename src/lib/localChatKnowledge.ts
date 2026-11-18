/**
 * BỘ ENGINE TRI THỨC CỤC BỘ & PHÒNG THỦ GEOLOCATION CHO CHATBOT CNTT
 * Website: phamtiendong.name.vn - CN. Phạm Tiến Đông
 * 
 * Mục tiêu:
 * 1. Phản hồi tức thì (5ms) cho các câu hỏi thực hành nghề phổ biến nhất của học sinh 9+3.
 * 2. Triệt tiêu hoàn toàn lỗi 400 "User location is not supported" của Google Gemini khi
 *    Cloudflare Worker chạy tại các node quốc tế (Hong Kong, roaming, private DNS).
 * 3. Chuẩn hóa 100% phong cách sư phạm AGENTS.md (ngắn gọn, ví von đời thường, KTV chuẩn mực).
 */

function removeAccents(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase();
}

export function matchKnowledge(rawQuery: string, history: any[] = []): string | null {
  if (!rawQuery || typeof rawQuery !== 'string') return null;
  let q = rawQuery.trim().toLowerCase();
  let qNoAccent = removeAccents(q);

  // KẾ THỪA NGỮ CẢNH TỪ LỊCH SỬ HỘI THOẠI TRONG PHIÊN (SESSION MEMORY)
  if (Array.isArray(history) && history.length > 0) {
    const recentText = history.slice(-2).map((h: any) => String(h.text || h.content || '')).join(' ').toLowerCase();
    const recentNoAccent = removeAccents(recentText);
    
    // Nếu câu hỏi hiện tại ngắn hoặc có tính chất tiếp nối đại từ
    const isFollowUp = qNoAccent.includes('con') || qNoAccent.includes('o dau') || qNoAccent.includes('the nao') || qNoAccent.includes('phim gi') || qNoAccent.length < 25;
    if (isFollowUp) {
      if (recentNoAccent.includes('asus') && !qNoAccent.includes('msi') && !qNoAccent.includes('winnfox')) {
        qNoAccent += ' asus';
      } else if (recentNoAccent.includes('msi') && !qNoAccent.includes('asus') && !qNoAccent.includes('winnfox')) {
        qNoAccent += ' msi';
      } else if ((recentNoAccent.includes('winnfox') || recentNoAccent.includes('winfox')) && !qNoAccent.includes('asus')) {
        qNoAccent += ' winnfox';
      } else if (recentNoAccent.includes('ram') && !qNoAccent.includes('o cung')) {
        qNoAccent += ' ram';
      }
    }
  }

  // =========================================================================
  // 1. PHÍM BOOT USB & PHÍM VÀO BIOS CÁC DÒNG BO MẠCH & MÁY TÍNH
  // =========================================================================

  // SO SÁNH 3 DÒNG MAINBOARD
  if (qNoAccent.includes('so sanh main') || (qNoAccent.includes('asus') && qNoAccent.includes('msi') && qNoAccent.includes('winnfox'))) {
    return [
      'So sánh nhanh 3 bo mạch chủ Intel H510 phòng máy:',
      '• **ASUS H510M-K:** Phím boot **F8**, chất lượng linh kiện bền bỉ, BIOS tiếng Việt trực quan.',
      '• **MSI H510M-A PRO:** Phím boot **F11**, có 4 đèn **EZ Debug LED** báo lỗi thông minh (CPU-DRAM-VGA-BOOT).',
      '• **WINNFOX H510G:** Phím boot **F11**, bo mạch tối giản, bắt buộc cắm loa Buzzer bíp để chẩn đoán sự cố.',
      '\n![Bảng so sánh 3 dòng bo mạch chủ ASUS - MSI - WINNFOX H510](/images/ol-01/main-h510-compare.jpg)'
    ].join('\n');
  }

  // ASUS
  if ((qNoAccent.includes('boot') || qNoAccent.includes('usb') || qNoAccent.includes('bios') || qNoAccent.includes('main')) && qNoAccent.includes('asus')) {
    return [
      'Phím tắt Boot USB và BIOS của bo mạch chủ **ASUS** (chuẩn H510M-K):',
      '• **Phím Boot Menu (chọn USB Boot):** Bấm phím **F8** liên tục ngay khi vừa bật nguồn.',
      '• **Phím vào BIOS:** Bấm phím **Delete (Del)** hoặc **F2**.',
      '⚠️ *Lưu ý KTV phòng thực hành:* Tuyệt đối không bấm phím F11 (F11 là của MSI, bấm trên main ASUS sẽ không lên Boot Menu).',
      '\n![Bo mạch chủ ASUS Prime H510M-K phòng máy](/images/ol-01/main-asus-h510.jpg)'
    ].join('\n');
  }

  // MSI
  if ((qNoAccent.includes('boot') || qNoAccent.includes('usb') || qNoAccent.includes('bios') || qNoAccent.includes('main')) && qNoAccent.includes('msi')) {
    return [
      'Phím tắt Boot USB và BIOS của bo mạch chủ **MSI** (chuẩn H510M-A PRO):',
      '• **Phím Boot Menu (chọn USB Boot):** Bấm phím **F11** liên tục ngay khi vừa bật nguồn.',
      '• **Phím vào BIOS:** Bấm phím **Delete (Del)**.',
      '💡 *Mẹo KTV:* Khi máy không lên hình, nhìn ngay cụm 4 đèn **EZ Debug LED** ở góc trên bo mạch (CPU - DRAM - VGA - BOOT) để khoanh vùng bệnh ngay.',
      '\n![Bo mạch chủ MSI H510M-A PRO với 4 đèn EZ Debug](/images/ol-01/main-h510.jpg)'
    ].join('\n');
  }

  // WINNFOX
  if ((qNoAccent.includes('boot') || qNoAccent.includes('usb') || qNoAccent.includes('bios') || qNoAccent.includes('main')) && (qNoAccent.includes('winnfox') || qNoAccent.includes('winfox'))) {
    return [
      'Phím tắt Boot USB và BIOS của bo mạch chủ **WINNFOX** (chuẩn H510G):',
      '• **Phím Boot Menu (chọn USB Boot):** Bấm phím **F11** (hoặc **F7** ở một số bản AMI BIOS).',
      '• **Phím vào BIOS:** Bấm phím **Delete (Del)**.',
      '⚠️ *Lưu ý KTV:* Bo mạch Winnfox không có đèn debug, bắt buộc phải cắm **Loa Buzzer (Loa bíp)** vào chân J_SPEAKER để nghe mã tiếng bíp chẩn đoán lỗi.',
      '\n![Bo mạch chủ WINNFOX H510G phòng thực hành](/images/ol-01/main-winnfox-h510.jpg)'
    ].join('\n');
  }

  // GIGABYTE
  if ((qNoAccent.includes('boot') || qNoAccent.includes('usb') || qNoAccent.includes('bios')) && (qNoAccent.includes('gigabyte') || qNoAccent.includes('giga'))) {
    return [
      'Phím tắt Boot USB và BIOS của bo mạch chủ **GIGABYTE**:',
      '• **Phím Boot Menu (chọn USB Boot):** Bấm phím **F12** liên tục khi bật máy.',
      '• **Phím vào BIOS:** Bấm phím **Delete (Del)**.'
    ].join('\n');
  }

  // DELL
  if ((qNoAccent.includes('boot') || qNoAccent.includes('usb') || qNoAccent.includes('bios')) && qNoAccent.includes('dell')) {
    return [
      'Phím tắt máy bộ và laptop **DELL**:',
      '• **Phím Boot Menu:** Bấm phím **F12** liên tục khi bật máy.',
      '• **Phím vào BIOS:** Bấm phím **F2**.'
    ].join('\n');
  }

  // HP
  if ((qNoAccent.includes('boot') || qNoAccent.includes('usb') || qNoAccent.includes('bios')) && qNoAccent.includes('hp')) {
    return [
      'Phím tắt máy bộ và laptop **HP**:',
      '• **Phím Boot Menu:** Bấm phím **F9** liên tục khi vừa bật nguồn.',
      '• **Phím vào BIOS:** Bấm phím **F10** (hoặc bấm phím **Esc** trước để vào menu tổng).'
    ].join('\n');
  }

  // LENOVO
  if ((qNoAccent.includes('boot') || qNoAccent.includes('usb') || qNoAccent.includes('bios')) && qNoAccent.includes('lenovo')) {
    return [
      'Phím tắt máy tính **LENOVO**:',
      '• **Phím Boot Menu:** Bấm phím **F12** (hoặc **Fn + F12** trên laptop).',
      '• **Phím vào BIOS:** Bấm phím **F2** (hoặc nút **Novo Button** bên cạnh máy).'
    ].join('\n');
  }

  // TỔNG HỢP CÂU HỎI VỀ PHÍM BOOT CHUNG
  if ((qNoAccent.includes('phim boot') || qNoAccent.includes('boot usb') || qNoAccent.includes('chon boot') || qNoAccent.includes('menu boot')) && !qNoAccent.includes('cai win')) {
    return [
      'Bảng phím tắt Boot USB nhanh của các dòng máy phổ biến:',
      '• **ASUS:** Bấm **F8** (vào BIOS bấm Del/F2)',
      '• **MSI / WINNFOX:** Bấm **F11** (vào BIOS bấm Del)',
      '• **GIGABYTE / DELL / LENOVO:** Bấm **F12**',
      '• **HP:** Bấm **F9** (vào BIOS bấm F10)',
      '👉 *Cách bấm:* Bật nút nguồn và nhấp nhả phím liên tục ngay lập tức.'
    ].join('\n');
  }

  // TỔNG HỢP CÂU HỎI VÀO BIOS CHUNG
  if (qNoAccent.includes('phim vao bios') || qNoAccent.includes('cach vao bios') || qNoAccent.includes('phim bios')) {
    return [
      'Phím tắt vào cài đặt BIOS của máy tính:',
      '• **Máy bàn (PC ráp):** Bấm phím **Delete (Del)** liên tục ngay khi bật máy.',
      '• **Laptop & máy bộ (ASUS, Dell, Lenovo, Acer):** Bấm phím **F2**.',
      '• **HP:** Bấm phím **F10**.',
      '👉 *Lưu ý:* Bấm nhấp nhả phím ngay khi đèn bàn phím vừa sáng lên nhé!'
    ].join('\n');
  }

  // =========================================================================
  // 2. PHẦN CỨNG MÁY TÍNH & BẮT BỆNH PHÒNG THỰC HÀNH
  // =========================================================================

  // RAM KHÁC Ổ CỨNG / SSD
  if ((qNoAccent.includes('ram') && (qNoAccent.includes('o cung') || qNoAccent.includes('ssd') || qNoAccent.includes('khac nhau'))) || qNoAccent.includes('mat ban hoc')) {
    return [
      'Sự khác nhau cơ bản giữa RAM và Ổ cứng (SSD):',
      '• **RAM = Mặt bàn học làm việc:** Nơi bày sách vở ra thao tác tạm thời. Tắt máy rút điện là mặt bàn sạch trơn (mất hết dữ liệu).',
      '• **Ổ cứng (SSD) = Tủ cất sách:** Nơi lưu giữ hệ điều hành Windows và dữ liệu lâu dài. Tắt máy dữ liệu vẫn còn nguyên vẹn trong tủ.',
      '• **Quy tắc KTV:** Máy đơ giật khi mở nhiều tab ➔ Nâng cấp RAM. Máy khởi động Win chậm ➔ Nâng cấp lên ổ SSD.'
    ].join('\n');
  }

  // KEO TẢN NHIỆT
  if (qNoAccent.includes('keo tan nhiet') || qNoAccent.includes('hat dau xanh') || qNoAccent.includes('tra keo')) {
    return [
      'Quy chuẩn tra keo tản nhiệt CPU chuẩn Poka-Yoke:',
      '• **Định lượng chuẩn:** Chỉ bơm **1 chấm nhỏ bằng hạt đậu xanh** vào chính giữa mặt lưng CPU.',
      '• **Cách tản keo:** Đặt đế nhôm quạt tản nhiệt thẳng đứng xuống và siết ốc đều tay (lực nén cơ học sẽ tự ép keo dàn đều mặt tiếp xúc).',
      '🔴 **Tuyệt đối cấm:** Không lấy tay bôi quệt lem nhem, không bơm quá nhiều làm keo tràn ra viền socket chập chân vi mạch.',
      '\n![Kỹ thuật tra keo tản nhiệt hạt đậu xanh](/images/ol-01/step-4-tra-keo-hat-dau-xanh.jpg)'
    ].join('\n');
  }

  // CỤM CHÂN KIM F_PANEL (FRONT PANEL)
  if (qNoAccent.includes('fpanel') || qNoAccent.includes('front panel') || qNoAccent.includes('power sw') || qNoAccent.includes('reset sw') || qNoAccent.includes('jfp1')) {
    return [
      'Bản đồ 9 chân kim Front Panel (F_PANEL) chuẩn quốc tế:',
      '• **Điểm mốc:** Tìm vị trí chân số 9 bị khuyết (ở hàng dưới cùng bên phải).',
      '• **HÀNG TRÊN:** 2 chân bên phải (ngay sát cạnh chân khuyết) là **POWER SW** (nút bật nguồn). 2 chân bên trái là **POWER LED**.',
      '• **HÀNG DƯỚI:** 2 chân đối diện với POWER SW là **RESET SW** (nút khởi động lại). 2 chân bên trái là **HDD LED**.',
      '💡 **Khẩu quyết:** Nút POWER SW và RESET SW là công tắc đóng ngắt tiếp điểm, cắm chiều nào cũng chạy bình thường (không phân biệt âm dương)!',
      '\n![Sơ đồ chi tiết cụm 9 chân F_PANEL chuẩn quốc tế](/images/ol-01/guide-fpanel-diagram.jpg)'
    ].join('\n');
  }

  // THÁO PIN CMOS & CLEAR CMOS
  if (qNoAccent.includes('pin cmos') || qNoAccent.includes('clear cmos') || qNoAccent.includes('cr2032') || qNoAccent.includes('jbat1') || qNoAccent.includes('sai gio')) {
    return [
      'Kỹ thuật tháo pin CR2032 và Clear CMOS (xả BIOS gốc):',
      '• **Tháo pin:** Rút điện 220V, bấm nút nguồn 3 lần xả tụ, lấy đầu que nhựa ấn nhẹ lẫy vành để pin nảy 45 độ lên.',
      '• **Clear CMOS nhanh:** Dùng đầu tua vít chập 2 chân kim **JBAT1 / CLR_CMOS** trong 10 giây để xả sạch thiết lập BIOS cũ (sửa lỗi treo logo, quên pass BIOS).',
      '• **Lắp lại:** Mặt chữ in dấu **(+)** và tên **CR2032** luôn ngửa lên trên nhìn thấy.',
      '⚠️ Nếu máy bật lên liên tục bị sai ngày giờ hoặc bắt nhấn F1/F2 ➔ Thay ngay pin CMOS mới (chuẩn 3V).',
      '\n![Kỹ thuật tháo pin CMOS và vị trí chân cắm JBAT1](/images/ol-01/guide-clear-cmos-pin.jpg)'
    ].join('\n');
  }

  // MÁY TÍNH QUẠT QUAY KHÔNG LÊN HÌNH / MÀN HÌNH ĐEN
  if (qNoAccent.includes('quat quay') || qNoAccent.includes('khong len hinh') || qNoAccent.includes('man hinh den') || qNoAccent.includes('khong xuat hinh')) {
    return [
      'Các bước xử lý lỗi máy tính quạt quay nhưng không lên hình:',
      '1. **90% do chân RAM bám bụi:** Tháo thanh RAM, dùng gôm trắng học sinh chà sạch 2 mặt chân mạ vàng, quét sạch mạt gôm rồi cắm lại nghe 2 tiếng "tách".',
      '2. **Dây màn hình cắm nhầm:** Nếu máy có Card rời (GT 730), BẮT BUỘC cắm dây màn hình vào cổng của Card rời phía dưới (CPU đuôi F không có chip đồ họa tích hợp).',
      '3. **Quên cắm nguồn CPU:** Kiểm tra giắc 4-pin hoặc 8-pin màu vàng đen ở góc trên bo mạch đã cắm chặt chưa.',
      '4. **Xả BIOS:** Tháo pin CMOS ra 3 phút rồi cắm lại.'
    ].join('\n');
  }

  // MÁY TÍNH BỊ ĐƠ, GIẬT LAG
  if (qNoAccent.includes('bi do') || qNoAccent.includes('giat lag') || qNoAccent.includes('cham') || qNoAccent.includes('treo may')) {
    return [
      '3 nguyên nhân chính khiến máy tính chạy chậm, đơ lag:',
      '• **Nhiệt độ CPU quá cao (>85°C):** Keo tản nhiệt bị khô hoặc quạt đóng bụi, CPU tự hạ xung để chống cháy ➔ Vệ sinh và tra keo mới.',
      '• **Ổ C bị đầy hoặc bad sector:** Mở This PC xem ổ C có bị vạch đỏ không. Mở CrystalDiskInfo kiểm tra sức khỏe ổ cứng.',
      '• **Tràn bộ nhớ RAM:** Mở Task Manager (`Ctrl + Shift + Esc`) xem tab Memory có vượt 90% không ➔ Đóng bớt tab web hoặc nâng cấp RAM.'
    ].join('\n');
  }

  // DUAL CHANNEL RAM
  if (qNoAccent.includes('dual channel') || qNoAccent.includes('2 thanh ram') || qNoAccent.includes('hai thanh ram')) {
    return [
      'Kỹ thuật chạy RAM Kênh đôi (Dual-Channel):',
      '• **Nguyên lý:** Cắm 2 thanh RAM cùng dung lượng và tần số Bus (ví dụ 2 thanh 4GB hoặc 2 thanh 8GB DDR4).',
      '• **Hiệu quả:** Tăng gấp đôi băng thông truyền dữ liệu giữa RAM và CPU (như mở rộng đường 1 làn thành đường 2 làn xe chạy song song).',
      '• **Quy tắc cắm:** Với mainboard 4 khe, cắm so le vào khe 2 và 4 (tính từ chân CPU ra ngoài).'
    ].join('\n');
  }

  // HẬU TỐ CPU INTEL (K, F, KF, H, U)
  if (qNoAccent.includes('hau to cpu') || qNoAccent.includes('chip f') || qNoAccent.includes('chip k') || qNoAccent.includes('i5-10400f')) {
    return [
      'Ý nghĩa các hậu tố trong tên chip CPU Intel:',
      '• **Hậu tố F (i5-10400F):** **Không có chip đồ họa tích hợp**, bắt buộc phải cắm Card màn hình rời (GT 730) mới xuất hình được!',
      '• **Hậu tố K (i7-10700K):** Cho phép ép xung mở khóa nhân.',
      '• **Hậu tố KF:** Vừa ép xung được vừa không có GPU tích hợp.',
      '• **Hậu tố H / HX:** Chip hiệu năng cao chuyên dùng cho Laptop Gaming và Đồ họa.',
      '• **Hậu tố U:** Chip tiết kiệm điện dành cho Laptop văn phòng mỏng nhẹ.'
    ].join('\n');
  }

  // =========================================================================
  // 3. MẠNG MÁY TÍNH & BẤM CÁP MẠNG
  // =========================================================================

  // CÔNG THỨC TÍNH NHẨM SUBNETTING 30S CHO ĐỘI TUYỂN HSG
  if (qNoAccent.includes('subnet') || qNoAccent.includes('magic number') || qNoAccent.includes('chia mang con')) {
    return [
      'Bí quyết tính nhẩm Subnetting IPv4 trong 30 giây (Quy tắc Magic Number):',
      '• **Bước 1:** Xác định Octet thay đổi từ Prefix /n (ví dụ: /26 có Subnet Mask 255.255.255.192).',
      '• **Bước 2 (Magic Number):** Lấy `256 - Octet = 256 - 192 = 64`. Mỗi mạng con cách nhau đúng 64 IP.',
      '• **Bước 3:** Dải mạng: Mạng 1 [0..63], Mạng 2 [64..127]. IP mạng là số đầu, Broadcast là số cuối.',
      '• **Số Host dùng được:** Công thức $2^h - 2$ (ví dụ /26 mượn 2 bit, còn 6 bit host: $2^6 - 2 = 62$ máy).'
    ].join('\n');
  }

  // 4 BƯỚC DHCP DORA
  if (qNoAccent.includes('dora') || qNoAccent.includes('dhcp') || qNoAccent.includes('cap ip tu dong')) {
    return [
      'Quy trình cấp phát IP tự động DHCP 4 bước (D-O-R-A):',
      '1. **Discover (Khám phá):** Client phát gói tin quảng bá Broadcast tìm kiếm DHCP Server.',
      '2. **Offer (Đề xuất):** DHCP Server gửi lại gói tin đề xuất địa chỉ IP kèm cấu hình mạng.',
      '3. **Request (Yêu cầu):** Client chấp nhận và xin thuê chính thức địa chỉ IP đó.',
      '4. **Acknowledge (Xác nhận - ACK):** DHCP Server đóng dấu xác nhận cho thuê và cấp IP thành công.'
    ].join('\n');
  }

  // CÁP THẲNG VS CÁP CHÉO
  if (qNoAccent.includes('cap cheo') || qNoAccent.includes('cap thang') || qNoAccent.includes('crossover')) {
    return [
      'Phân biệt Cáp Thẳng (Straight-Through) và Cáp Chéo (Crossover):',
      '• **Cáp Thẳng (2 đầu T568B):** Nối 2 thiết bị KHÁC LOẠI (PC nối vào Switch, Switch nối vào Router).',
      '• **Cáp Chéo (1 đầu T568A, 1 đầu T568B):** Nối 2 thiết bị CÙNG LOẠI (PC nối PC, Switch nối Switch, Router nối Router).',
      '• **Chân truyền 100Mbps:** Chỉ dùng 4 chân kim 1, 2 (TX truyền) và 3, 6 (RX nhận).'
    ].join('\n');
  }

  // BẤM DÂY MẠNG CHUẨN B
  if (qNoAccent.includes('chuan b') || qNoAccent.includes('bam day mang') || qNoAccent.includes('568b') || qNoAccent.includes('mau mang')) {
    return [
      'Thứ tự 8 sợi màu bấm cáp mạng Chuẩn B (T568B) từ trái qua phải:',
      '1. **Trắng cam**  2. **Cam**',
      '3. **Trắng xanh lá**  4. **Xanh dương**',
      '5. **Trắng xanh dương**  6. **Xanh lá**',
      '7. **Trắng nâu**  8. **Nâu**',
      '💡 *Quy tắc KTV:* Để ngửa mặt chân đồng lên trên, mặt lẫy nhựa úp xuống dưới, cắt bằng đầu dây và đút lút đáy hạt mạng trước khi bóp kìm.'
    ].join('\n');
  }

  // ĐỊA CHỈ IP LÀ GÌ
  if (qNoAccent.includes('dia chi ip') || qNoAccent.includes('ip la gi') || qNoAccent.includes('so nha')) {
    return [
      'Bản chất của Địa chỉ IP:',
      '• **Địa chỉ IP = Số nhà trên mạng:** Giống như mỗi ngôi nhà cần có một số nhà duy nhất để người đưa thư chuyển phát đúng bưu phẩm, mỗi máy tính cần có một IP để gửi và nhận dữ liệu.',
      '• **Ví dụ:** `192.168.1.15` (3 cụm đầu là tên ngõ xóm/Network ID, số 15 cuối là số nhà riêng của máy tính/Host ID).',
      '• Không được để 2 máy tính trong cùng phòng có trùng địa chỉ IP (sẽ bị lỗi xung đột IP Conflict).'
    ].join('\n');
  }

  // MÔ HÌNH OSI 7 TẦNG
  if (qNoAccent.includes('osi') || qNoAccent.includes('7 tang')) {
    return [
      'Mô hình mạng OSI 7 tầng (từ tầng 7 xuống tầng 1):',
      '7. **Application** (Ứng dụng)  •  6. **Presentation** (Trình diễn)',
      '5. **Session** (Phiên)  •  4. **Transport** (Giao vận - TCP/UDP)',
      '3. **Network** (Mạng - Router/IP)  •  2. **Data Link** (Liên kết - Switch/MAC)',
      '1. **Physical** (Vật lý - Cáp mạng, Hub, Sóng Wifi)',
      '💡 *Khẩu quyết dễ nhớ:* **A**nh **Đ**i **Q**ua **N**hà **Ă**n **T**hịt **B**ò.'
    ].join('\n');
  }

  // LỆNH MẠNG HAY DÙNG
  if (qNoAccent.includes('lenh mang') || qNoAccent.includes('cmd mang') || qNoAccent.includes('ipconfig') || qNoAccent.includes('ping')) {
    return [
      '4 câu lệnh kiểm tra mạng CMD thông dụng nhất trên Windows 10:',
      '• `ipconfig /all`: Xem toàn bộ địa chỉ IP, Subnet Mask, Gateway và địa chỉ MAC máy.',
      '• `ping 8.8.8.8`: Kiểm tra máy tính có kết nối được Internet ra ngoài không.',
      '• `ping 192.168.1.1`: Kiểm tra đường dây từ máy tính đến Router có thông không.',
      '• `tracert <tên miền>`: Dò tìm đường đi qua các trạm mạng đến máy chủ.'
    ].join('\n');
  }

  // VỆ SINH CHÂN RAM, KHE CẮM, CARD ĐỒ HỌA
  if (qNoAccent.includes('ve sinh') || qNoAccent.includes('cha gom') || qNoAccent.includes('lau chan')) {
    return [
      'Quy chuẩn vệ sinh chân RAM và khe cắm linh kiện:',
      '• **Chân đồng mạ vàng (RAM, VGA):** Dùng cục gôm tẩy trắng học sinh chà nhẹ nhàng đều 2 mặt chân tiếp xúc đến khi sáng bóng, dùng chổi cọ quét sạch mạt gôm vụn.',
      '• **Khe cắm trên bo mạch (Slot RAM, PCIe):** Dùng bình xịt khí nén hoặc bóng bóp cao su thổi bay bụi bẩn trong rãnh. Tuyệt đối không dùng tua vít sắt cào làm cong gãy chân đồng.',
      '⚠️ *Quy tắc an toàn Poka-Yoke:* Luôn rút phích cắm 220V và bấm giữ nút nguồn 10 giây để tụ điện xả sạch trước khi thao tác.',
      '\n![Kỹ thuật chà sạch chân đồng RAM bằng gôm tẩy học sinh](/images/ol-01/step-3-cha-ram-cuc-tay.jpg)'
    ].join('\n');
  }

  // TẠO USB BOOT & CÀI ĐẶT WINDOWS 10
  if (qNoAccent.includes('rufus') || qNoAccent.includes('tao usb boot') || qNoAccent.includes('cai win 10') || qNoAccent.includes('cai windows')) {
    return [
      'Quy chuẩn tạo USB Boot và cài đặt Windows 10 thực chiến:',
      '• **Tạo USB Boot (Rufus):** Chọn phân vùng **GPT** và hệ thống đích **UEFI (non CSM)**, định dạng NTFS.',
      '• **Phím Boot USB:** ASUS bấm **F8**, MSI & Winnfox bấm **F11**, Gigabyte bấm **F12**.',
      '• **An toàn dữ liệu khách hàng (Zero Data Loss):** Chỉ chọn đúng phân vùng ổ C (ổ đang cài Win cũ) để Format. Tuyệt đối không chạm vào ổ D/E chứa dữ liệu.',
      '• **Driver:** Sau khi vào Windows 10, mở Device Manager (`devmgmt.msc`) kiểm tra không còn dấu chấm than vàng.',
      '\n![Phân vùng cài đặt hệ điều hành Windows 10](/images/ol-01/step-5-cai-win10-partition.jpg)'
    ].join('\n');
  }

  // QUY TRÌNH THÁO MÁY
  if (qNoAccent.includes('thao may') || qNoAccent.includes('quy trinh thao')) {
    return [
      'Quy trình 5 bước tháo máy tính an toàn chuẩn KTV:',
      '1. **Rút nguồn 220V & Xả tụ:** Bấm giữ nút nguồn 10 giây để bo mạch xả hết điện tích.',
      '2. **Tháo dây kết nối ngoại vi:** Dây nguồn, dây màn hình, cáp mạng, chuột phím.',
      '3. **Tháo Card đồ họa rời (VGA):** Mở ốc cố định đuôi case, gạt chốt lẫy PCIe trước khi rút thẳng đứng.',
      '4. **Tháo ổ cứng & RAM:** Rút cáp SATA, mở 2 lẫy ngàm RAM.',
      '5. **Tháo tản nhiệt CPU & bo mạch chủ:** Tháo 4 chốt tản nhiệt chéo đối xứng, mở 6 ốc bắt main.',
      '\n![Sơ đồ quy trình tháo máy chuẩn KTV](/images/ol-01/workflow-thao-may.jpg)'
    ].join('\n');
  }

  // QUY TRÌNH LẮP MÁY
  if (qNoAccent.includes('lap may') || qNoAccent.includes('rap may') || qNoAccent.includes('quy trinh lap')) {
    return [
      'Quy trình 6 bước lắp ráp máy tính chuẩn KTV:',
      '1. **Lắp ngoại vi lên mainboard trước:** Đặt main lên hộp carton, lắp CPU (căn 2 vết khuyết), khóa cần gạt, tra 1 hạt đậu xanh keo tản nhiệt và gắn quạt CPU_FAN.',
      '2. **Lắp RAM:** Căn đúng rãnh khuyết lệch DDR4, ấn đều 2 đầu nghe 2 tiếng "tách" đanh gọn.',
      '3. **Lắp chặn main (I/O Shield) & Đặt main vào thùng:** Siết đủ ốc đệm cách điện.',
      '4. **Lắp nguồn (PSU) & Cắm dây nguồn:** Cắm dây 24-pin bo mạch và 4/8-pin CPU.',
      '5. **Cắm cụm F_PANEL:** POWER SW, RESET SW, HDD LED, POWER LED.',
      '6. **Cắm Card đồ họa (VGA) & Ổ cứng SSD/HDD:** Khóa chốt PCIe, cắm cáp SATA.',
      '\n![Sơ đồ quy trình lắp máy chuẩn KTV](/images/ol-01/workflow-lap-may.jpg)'
    ].join('\n');
  }

  // THANH RAM DDR4
  if (qNoAccent.includes('ram ddr4') || qNoAccent.includes('ranh khuyet') || qNoAccent.includes('chan ram')) {
    return [
      'Đặc điểm nhận diện thanh RAM DDR4 phòng máy:',
      '• **Rãnh khuyết chân cắm:** Thiết kế lệch hẳn sang một bên (khác DDR3 ở giữa), giúp chống cắm ngược chiều.',
      '• **Chân mạ vàng cong nhẹ:** Các chân pin ở giữa hơi dài hơn 2 bên mép để giảm lực cắm.',
      '• **Tần số Bus phổ biến:** 2666 MHz hoặc 3200 MHz.',
      '\n![Thanh RAM DDR4 với rãnh khuyết lệch chống cắm ngược](/images/ol-01/ram-ddr4.jpg)'
    ].join('\n');
  }

  // CARD ĐỒ HỌA GT 730
  if (qNoAccent.includes('gt 730') || qNoAccent.includes('gt730') || qNoAccent.includes('card roi') || qNoAccent.includes('vga roi')) {
    return [
      'Card đồ họa rời NVIDIA GeForce GT 730 phòng máy:',
      '• **Chân cắm:** Chuẩn khe cắm PCIe x16 (có chốt lẫy khóa ở đuôi khe).',
      '• **Xuất hình:** Có cổng HDMI, DVI và VGA (D-Sub). Luôn cắm dây màn hình vào card này khi máy dùng CPU đuôi F!',
      '• **Nguồn:** Không cần nguồn phụ, lấy trực tiếp 75W từ khe PCIe.',
      '\n![Card đồ họa rời NVIDIA GeForce GT 730 2GB GDDR5](/images/ol-01/vga-gt730.jpg)'
    ].join('\n');
  }

  // =========================================================================
  // 4. QUẢN TRỊ WINDOWS 10, MẠNG LAN & CHIA SẺ DỮ LIỆU THỰC HÀNH
  // =========================================================================

  // BẬT CHIA SẺ FILE & THƯ MỤC QUA MẠNG LAN (WINDOWS 10)
  if ((qNoAccent.includes('chia se') || qNoAccent.includes('share')) && (qNoAccent.includes('file') || qNoAccent.includes('thu muc') || qNoAccent.includes('du lieu') || qNoAccent.includes('may tinh') || qNoAccent.includes('o dia') || qNoAccent.includes('folder'))) {
    return [
      'Quy trình 3 bước bật chia sẻ file/thư mục qua mạng LAN trên Windows 10:',
      '• **Bước 1 (Bật tính năng chia sẻ mạng):** Vào **Control Panel** ➔ **Network and Sharing Center** ➔ **Change advanced sharing settings** ➔ Tích chọn: **Turn on network discovery**, **Turn on file and printer sharing**; tại mục All Networks tích chọn **Turn off password protected sharing** ➔ Bấm **Save changes**.',
      '• **Bước 2 (Cấp quyền thư mục):** Nhấp chuột phải vào thư mục cần chia sẻ ➔ Chọn **Properties** ➔ Chuyển sang tab **Sharing** ➔ Bấm nút **Advanced Sharing** ➔ Tích chọn **Share this folder**.',
      '• **Bước 3 (Phân quyền truy cập):** Trong bảng Advanced Sharing bấm nút **Permissions** ➔ Chọn nhóm **Everyone** ➔ Tích vào ô **Full Control** (cho phép đọc và chép file) ➔ Bấm **OK**.',
      '👉 *Cách máy khác truy cập:* Trên máy tính kia bấm tổ hợp phím **Windows + R**, gõ `\\\\<Địa_chỉ_IP_máy_chia_sẻ>` (ví dụ: `\\\\192.168.1.15`) rồi nhấn Enter.'
    ].join('\n');
  }

  // CHIA SẺ MÁY IN TRONG MẠNG LAN (PRINTER SHARING)
  if ((qNoAccent.includes('chia se') || qNoAccent.includes('share') || qNoAccent.includes('ket noi')) && qNoAccent.includes('may in')) {
    return [
      'Cách chia sẻ máy in qua mạng LAN trên Windows 10:',
      '• **Bước 1 (Tại máy cắm máy in):** Vào **Control Panel** ➔ **Devices and Printers** ➔ Chuột phải vào máy in đang dùng ➔ Chọn **Printer properties**.',
      '• **Bước 2 (Bật chia sẻ):** Chuyển sang tab **Sharing** ➔ Tích chọn **Share this printer** và đặt tên chia sẻ ➔ Nhấn **Apply** ➔ **OK**.',
      '• **Bước 3 (Kết nối từ máy khác):** Bấm **Windows + R**, gõ `\\\\<Địa_chỉ_IP_máy_chủ>` (ví dụ `\\\\192.168.1.10`) ➔ Chuột phải vào máy in hiện ra và chọn **Connect**.'
    ].join('\n');
  }

  // CÀI ĐẶT ĐỊA CHỈ IP TĨNH (STATIC IP)
  if ((qNoAccent.includes('dat ip') || qNoAccent.includes('cai ip') || qNoAccent.includes('set ip') || qNoAccent.includes('doi ip') || qNoAccent.includes('ip tinh')) && (qNoAccent.includes('tinh') || qNoAccent.includes('ipv4') || qNoAccent.includes('mang') || qNoAccent.includes('ip'))) {
    return [
      'Các bước cài đặt địa chỉ IP tĩnh trên Windows 10:',
      '• **Bước 1:** Bấm **Windows + R**, gõ `ncpa.cpl` rồi nhấn Enter để mở Network Connections.',
      '• **Bước 2:** Nhấp chuột phải vào card mạng **Ethernet** (hoặc Wi-Fi) ➔ Chọn **Properties**.',
      '• **Bước 3:** Nhấp đúp chuột vào dòng **Internet Protocol Version 4 (TCP/IPv4)**.',
      '• **Bước 4:** Tích chọn **Use the following IP address** và thiết lập:',
      '  - **IP address:** ví dụ `192.168.1.15` (chọn số đuôi không trùng máy khác).',
      '  - **Subnet mask:** `255.255.255.0`.',
      '  - **Default gateway:** `192.168.1.1` (địa chỉ Router chính).',
      '  - **DNS Server:** `8.8.8.8` và `8.8.4.4` (DNS Google).'
    ].join('\n');
  }

  // TẮT TƯỜNG LỬA WINDOWS DEFENDER FIREWALL
  if ((qNoAccent.includes('tat tuong lua') || qNoAccent.includes('mo tuong lua') || qNoAccent.includes('firewall') || qNoAccent.includes('chan ping')) && (qNoAccent.includes('tat') || qNoAccent.includes('bat') || qNoAccent.includes('ping') || qNoAccent.includes('mang') || qNoAccent.includes('firewall'))) {
    return [
      'Cách tắt tường lửa Windows Defender Firewall để kiểm tra thông mạng:',
      '• **Bước 1:** Bấm tổ hợp phím **Windows + R**, gõ `firewall.cpl` rồi nhấn Enter.',
      '• **Bước 2:** Ở cột bên trái, bấm chọn **Turn Windows Defender Firewall on or off**.',
      '• **Bước 3:** Tích chọn cả 2 mục: **Turn off Windows Defender Firewall (not recommended)** tại Private network và Public network.',
      '• **Bước 4:** Bấm **OK** để lưu lại. Thử lệnh `ping <IP_máy_khác>` trong CMD sẽ thông ngay.'
    ].join('\n');
  }

  // ĐỔI TÊN MÁY TÍNH & WORKGROUP
  if (qNoAccent.includes('doi ten may') || qNoAccent.includes('rename pc') || qNoAccent.includes('workgroup') || qNoAccent.includes('nhom lam viec')) {
    return [
      'Cách đổi tên máy tính và gia nhập Workgroup trên Windows 10:',
      '• **Bước 1:** Bấm **Windows + R**, gõ `sysdm.cpl` rồi nhấn Enter (mở System Properties).',
      '• **Bước 2:** Tại tab **Computer Name**, bấm vào nút **Change...** ở phía dưới.',
      '• **Bước 3:** Nhập tên máy mới tại ô **Computer name** (viết liền không dấu, ví dụ: `MAY-01`, `KTV-BAN01`).',
      '• **Bước 4:** Tại ô **Workgroup**, đảm bảo các máy trong phòng dùng chung 1 tên (mặc định: `WORKGROUP`).',
      '• **Bước 5:** Bấm **OK** và bấm **Restart Now** khởi động lại máy tính để nhận diện.'
    ].join('\n');
  }

  // MÁY TÍNH KHÔNG THẤY NHAU TRONG MẠNG LAN
  if ((qNoAccent.includes('khong thay') || qNoAccent.includes('khong tim thay') || qNoAccent.includes('khong vao duoc')) && (qNoAccent.includes('mang lan') || qNoAccent.includes('may khac') || qNoAccent.includes('share') || qNoAccent.includes('chia se') || qNoAccent.includes('mang'))) {
    return [
      'Khắc phục lỗi không thấy máy tính khác trong mạng LAN trên Windows 10:',
      '• **1. Kiểm tra dải IP:** Đảm bảo 2 máy cùng cắm chung Switch và cùng lớp mạng (`192.168.1.x`). Dùng `ping <IP_máy_khác>` kiểm tra.',
      '• **2. Tắt tường lửa:** Tắt Windows Defender Firewall (`firewall.cpl`) trên cả máy phát và máy nhận.',
      '• **3. Bật dịch vụ dò tìm:** Bấm **Windows + R**, gõ `services.msc` ➔ Tìm dịch vụ **Function Discovery Resource Publication** ➔ Đổi Startup type thành **Automatic** và bấm **Start**.',
      '• **4. Mẹo vào trực tiếp:** Bấm **Windows + R**, gõ `\\\\<Địa_chỉ_IP_máy_đích>` (không cần đợi Windows quét trong mục Network).'
    ].join('\n');
  }

  // PHÍM TẮT WINDOWS 10 CHO KTV
  if (qNoAccent.includes('phim tat') || qNoAccent.includes('shortcut')) {
    return [
      'Các phím tắt Windows 10 quan trọng nhất cho KTV thực hành:',
      '• **Windows + R:** Mở hộp thoại Run (để gõ lệnh nhanh `cmd`, `ncpa.cpl`, `sysdm.cpl`, `diskmgmt.msc`).',
      '• **Windows + E:** Mở nhanh trình quản lý tệp tin File Explorer (This PC).',
      '• **Ctrl + Shift + Esc:** Mở trực tiếp trình quản lý tác vụ Task Manager.',
      '• **Windows + X:** Mở menu thao tác nhanh hệ thống (Device Manager, Disk Management, Command Prompt/PowerShell).',
      '• **Windows + Shift + S:** Chụp ảnh màn hình nhanh khoanh vùng.'
    ].join('\n');
  }

  // QUẢN LÝ PHÂN VÙNG Ổ ĐĨA (DISK MANAGEMENT)
  if (qNoAccent.includes('chia o') || qNoAccent.includes('diskmgmt') || qNoAccent.includes('gop o') || qNoAccent.includes('format o') || qNoAccent.includes('phan vung') || qNoAccent.includes('o c day')) {
    return [
      'Cách mở và quản lý phân vùng ổ đĩa trên Windows 10:',
      '• **Cách mở nhanh:** Bấm tổ hợp phím **Windows + X**, chọn **Disk Management** (hoặc bấm **Windows + R**, gõ `diskmgmt.msc`).',
      '• **Thu nhỏ để tạo ổ mới (Shrink):** Nhấp chuột phải vào ổ có dung lượng trống ➔ Chọn **Shrink Volume...** ➔ Nhập dung lượng cần cắt ➔ Bấm **Shrink**.',
      '• **Tạo phân vùng mới:** Nhấp chuột phải vào vùng đen *Unallocated* ➔ Chọn **New Simple Volume** ➔ Bấm Next và định dạng NTFS.',
      '⚠️ *Quy tắc an toàn Poka-Yoke:* Tuyệt đối không bấm Delete vào các phân vùng chứa dữ liệu quan trọng hoặc phân vùng EFI/Recovery của hệ thống.'
    ].join('\n');
  }

  // ĐIỀU KHIỂN TỪ XA BẰNG REMOTE DESKTOP (RDP / MSTSC)
  if (qNoAccent.includes('remote desktop') || qNoAccent.includes('rdp') || qNoAccent.includes('dieu khien tu xa') || qNoAccent.includes('mstsc')) {
    return [
      'Cách bật và kết nối Remote Desktop trên Windows 10 Pro:',
      '• **Bước 1 (Bật trên máy cần điều khiển):** Bấm **Windows + R**, gõ `sysdm.cpl` ➔ Chuyển sang tab **Remote** ➔ Tích chọn **Allow remote connections to this computer** ➔ Nhấn OK.',
      '• **Bước 2 (Đặt mật khẩu máy):** Tài khoản Windows bắt buộc phải cài đặt mật khẩu (Password) mới đăng nhập từ xa được.',
      '• **Bước 3 (Kết nối từ máy tính khác):** Bấm **Windows + R**, gõ `mstsc` ➔ Nhập địa chỉ IP của máy cần điều khiển ➔ Bấm **Connect** và nhập tài khoản/mật khẩu.'
    ].join('\n');
  }

  // MẠNG BỊ DẤU CHẤM THAN VÀNG (NO INTERNET / LIMITED)
  if (qNoAccent.includes('cham than vang') || qNoAccent.includes('no internet') || qNoAccent.includes('limited') || (qNoAccent.includes('mat mang') && !qNoAccent.includes('day'))) {
    return [
      'Các bước xử lý biểu tượng mạng bị dấu chấm than vàng:',
      '• **Bước 1 (Xung đột IP):** Mở CMD với quyền Admin gõ `ipconfig /release` rồi gõ `ipconfig /renew` để xin cấp lại IP từ DHCP.',
      '• **Bước 2 (Xóa cache DNS):** Gõ tiếp `ipconfig /flushdns`.',
      '• **Bước 3 (Đặt lại Winsock):** Gõ lệnh `netsh winsock reset` rồi khởi động lại máy tính.',
      '• **Bước 4 (Đổi DNS):** Chuyển DNS IPv4 sang Google DNS (`8.8.8.8` và `8.8.4.4`).'
    ].join('\n');
  }

  // XEM CẤU HÌNH MÁY TÍNH
  if (qNoAccent.includes('kiem tra cau hinh') || qNoAccent.includes('xem cau hinh') || qNoAccent.includes('dxdiag') || qNoAccent.includes('msinfo32')) {
    return [
      '3 cách xem nhanh cấu hình phần cứng máy tính Windows 10:',
      '• **Cách 1 (dxdiag):** Bấm **Windows + R**, gõ `dxdiag` rồi Enter ➔ Xem tên CPU, dung lượng RAM, tên Card đồ họa màn hình (Display).',
      '• **Cách 2 (Task Manager):** Bấm **Ctrl + Shift + Esc** ➔ Chọn tab **Performance** ➔ Xem xung nhịp CPU, tốc độ Bus RAM, ổ cứng SSD/HDD và GPU.',
      '• **Cách 3 (Lệnh CMD/PowerShell):** Mở CMD gõ lệnh `systeminfo` để xem toàn bộ thông số chi tiết hệ điều hành và BIOS.'
    ].join('\n');
  }

  // CÀI ĐẶT DRIVER MÁY TÍNH
  if (qNoAccent.includes('driver') || qNoAccent.includes('devmgmt') || qNoAccent.includes('cai driver')) {
    return [
      'Quy chuẩn kiểm tra và cài đặt Driver máy tính:',
      '• **Kiểm tra driver thiếu:** Bấm **Windows + X** ➔ Chọn **Device Manager** (hoặc bấm `Windows + R`, gõ `devmgmt.msc`).',
      '• **Dấu hiệu:** Mục nào có dấu chấm than vàng ⚠️ hoặc dấu hỏi màu vàng là đang thiếu driver.',
      '• **Thứ tự cài chuẩn:** 1. Chipset bo mạch chủ ➔ 2. Card đồ họa (VGA GT 730) ➔ 3. Âm thanh (Audio) ➔ 4. Mạng (LAN/Wifi).',
      '💡 *Mẹo KTV:* Có thể dùng công cụ Easy Driver hoặc 3DP Chip để tải đúng bản driver chuẩn cho máy.'
    ].join('\n');
  }

  // =========================================================================
  // 5. TIN HỌC VĂN PHÒNG & THỦ THUẬT CÔNG NGHỆ THÔNG TIN THỰC TẾ
  // =========================================================================

  // UNIKEY & LỖI GÕ TIẾNG VIỆT
  if (qNoAccent.includes('unikey') || qNoAccent.includes('khong go duoc tieng viet') || qNoAccent.includes('loi go tieng viet') || qNoAccent.includes('go dau')) {
    return [
      'Cách khắc phục lỗi không gõ được tiếng Việt bằng Unikey:',
      '• **1. Chạy quyền Admin:** Thoát hẳn Unikey ở khay Taskbar, chuột phải vào icon Unikey trên Desktop ➔ Chọn **Run as administrator**.',
      '• **2. Bảng mã & Kiểu gõ:** Đảm bảo chọn đúng **Bảng mã: Unicode** và **Kiểu gõ: Telex** (hoặc VNI tùy thói quen).',
      '• **3. Biểu tượng Taskbar:** Nhìn góc dưới bên phải màn hình xem biểu tượng là chữ **V** (màu đỏ) hay chữ **E** (màu xanh). Bấm **Ctrl + Shift** để chuyển sang chữ V.'
    ].join('\n');
  }

  // TIN HỌC VĂN PHÒNG - WORD (MỤC LỤC & CĂN LỀ)
  if ((qNoAccent.includes('muc luc') || qNoAccent.includes('can le') || qNoAccent.includes('dinh dang')) && (qNoAccent.includes('word') || qNoAccent.includes('van ban'))) {
    return [
      'Thao tác định dạng chuẩn trong Microsoft Word:',
      '• **Tạo mục lục tự động:** Bôi đen các tiêu đề ➔ Gán **Heading 1 / Heading 2** tại tab Home ➔ Đặt trỏ chuột ở trang đầu ➔ Tab **References** ➔ Chọn **Table of Contents** ➔ Chọn mẫu mục lục.',
      '• **Căn lề văn bản hành chính chuẩn (Nghị định 30):** Tab **Layout** ➔ **Margins** ➔ **Custom Margins**: Trên: 2cm, Dưới: 2cm, Trái: 3cm (để đóng gáy), Phải: 1.5cm.'
    ].join('\n');
  }

  // TIN HỌC VĂN PHÒNG - EXCEL (HÀM CƠ BẢN)
  if (qNoAccent.includes('excel') || qNoAccent.includes('vlookup') || qNoAccent.includes('ham if') || qNoAccent.includes('tinh tong')) {
    return [
      'Các hàm Excel thông dụng nhất cho dân CNTT & văn phòng:',
      '• `=SUM(A1:A10)`: Tính tổng dãy ô số liệu.',
      '• `=AVERAGE(A1:A10)`: Tính điểm trung bình cộng.',
      '• `=IF(điều_kiện, giá_trị_nếu_đúng, giá_trị_nếu_sai)`: Hàm điều kiện logic (ví dụ: `=IF(C2>=5, "Đậu", "Rớt")`).',
      '• `=VLOOKUP(giá_trị_tìm, bảng_dò, số_thứ_tự_cột_lấy, 0)`: Dò tìm dữ liệu chính xác theo cột dọc.'
    ].join('\n');
  }

  // MÀN HÌNH BỊ XOAY NGƯỢC 90/180 ĐỘ
  if (qNoAccent.includes('xoay man hinh') || qNoAccent.includes('man hinh bi nguoc') || qNoAccent.includes('man hinh quay')) {
    return [
      'Cách sửa lỗi màn hình máy tính bị xoay ngược 90° hoặc 180°:',
      '• **Cách 1 (Phím tắt nhanh):** Bấm tổ hợp phím **Ctrl + Alt + Mũi tên lên** (để quay về hướng thẳng đứng bình thường).',
      '• **Cách 2 (Cài đặt Windows):** Nhấp chuột phải ra màn hình Desktop ➔ Chọn **Display settings** ➔ Tại mục **Display orientation** ➔ Đổi lại thành **Landscape** ➔ Bấm **Keep changes**.'
    ].join('\n');
  }

  // MẤT TIẾNG / LOA MÁY TÍNH KHÔNG KÊU
  if (qNoAccent.includes('mat tieng') || qNoAccent.includes('khong co am thanh') || qNoAccent.includes('loa khong keu') || qNoAccent.includes('mat am thanh') || qNoAccent.includes('tai nghe')) {
    return [
      'Các bước xử lý khi máy tính bị mất âm thanh / loa không kêu:',
      '• **1. Kiểm tra cổng cắm:** Cắm đúng đầu giắc tròn 3.5mm vào **lỗ màu xanh lá cây (Line Out)** ở mặt sau thùng máy.',
      '• **2. Chọn đúng thiết bị xuất:** Nhấp chuột trái vào biểu tượng loa ở góc phải Taskbar ➔ Bấm vào tên thiết bị ở trên thanh âm lượng ➔ Chọn đúng **Speakers (Realtek Audio)**.',
      '• **3. Kiểm tra Driver âm thanh:** Bấm **Windows + X** ➔ **Device Manager** ➔ Xem mục *Sound, video and game controllers* có bị dấu chấm than vàng không.'
    ].join('\n');
  }

  // NÉN VÀ GIẢI NÉN FILE (ZIP / RAR)
  if (qNoAccent.includes('nen file') || qNoAccent.includes('giai nen') || qNoAccent.includes('winrar') || qNoAccent.includes('7zip') || qNoAccent.includes('file zip')) {
    return [
      'Cách nén và giải nén tệp tin bằng WinRAR / ZIP:',
      '• **Nén file/thư mục:** Nhấp chuột phải vào dữ liệu cần nén ➔ Chọn **Add to archive...** (hoặc *Send to* ➔ *Compressed (zipped) folder*) ➔ Đặt tên và bấm OK.',
      '• **Giải nén file:** Nhấp chuột phải vào file `.zip` hoặc `.rar` ➔ Chọn **Extract Here** (giải nén ngay tại đây) hoặc **Extract to [Tên_thư_mục]** để không bị lẫn file.'
    ].join('\n');
  }

  // TƯ VẤN CHỌN MUA LAPTOP CHO HỌC CNTT
  if (qNoAccent.includes('mua laptop') || qNoAccent.includes('chon may tinh') || qNoAccent.includes('tu van mua') || qNoAccent.includes('cau hinh hoc cntt')) {
    return [
      'Cấu hình Laptop tối ưu cho học sinh / sinh viên ngành CNTT:',
      '• **CPU:** Intel Core i5 (từ Gen 11 trở lên) hoặc AMD Ryzen 5 (từ Series 5000 trở lên).',
      '• **RAM:** Tối thiểu **16GB** (để chạy mượt các phần mềm lập trình, máy ảo VMware/VirtualBox, trình duyệt nhiều tab).',
      '• **Ổ cứng:** SSD NVMe tối thiểu **512GB** (khởi động máy và mở ứng dụng siêu tốc).',
      '• **Màn hình:** 14 inch hoặc 15.6 inch, độ phân giải Full HD (1920x1080), tấm nền IPS chống lóa.'
    ].join('\n');
  }

  // =========================================================================
  // 6. GUARDRAILS TỪ CHỐI LỊCH SỰ CÁC CHỦ ĐỀ NGOÀI PHẠM VI (PHI CÔNG NGHỆ)
  // =========================================================================
  const hasTechKeyword = /ram|cpu|main|mainboard|o cung|ssd|hdd|vga|card|boot|bios|usb|win|windows|linux|mang|ip|lan|wan|router|switch|fpanel|cmos|ve sinh|nguon|psu|fan|tiet bi|phan mem|cai dat|thao lap|chia se|share|file|thu muc|may in|tuong lua|firewall|driver|o dia|phan vung|phim tat|workgroup|remote|rdp|mang noi bo|dns|dhcp|subnet|cmd|powershell|cai win|word|excel|office|powerpoint|unikey|tieng viet|font|man hinh|am thanh|loa|tai nghe|chuot|ban phim|laptop|pc|bluetooth|wifi|hotspot|nen file|giai nen|zip|rar|virus|diet virus|lap trinh|code|python|html|css|javascript|web|cntt|tin hoc|cong nghe/i.test(qNoAccent);

  if (!hasTechKeyword) {
    const outOfScopePatterns = [
      /\b(toan|giai toan|hinh hoc|dai so)\b/,
      /\b(mon ly|vat ly|bai ly)\b/,
      /\b(mon hoa|hoa hoc|phuong trinh hoa)\b/,
      /\b(mon sinh|sinh hoc)\b/,
      /\b(mon van|ngu van|viet van|tap lam van)\b/,
      /\b(lam tho|bai tho|cau tho)\b/,
      /\b(yeu|to tinh|nguoi yeu|ban trai|ban gai|hen ho)\b/,
      /\b(lien quan mobile|free fire|pubg|choi game)\b/,
      /\b(showbiz|ca si|dien vien|nghe si)\b/,
      /\b(tu vi|boi toan|cung hoang dao|boi tinh duyen)\b/
    ];

    for (const pattern of outOfScopePatterns) {
      if (pattern.test(qNoAccent)) {
        return 'Mình là Trợ lý AI hỗ trợ chuyên ngành CNTT nên chỉ giải đáp các kiến thức về máy tính, tin học, phần mềm, phần cứng, mạng và thiết bị số thôi nè! Bạn có câu hỏi nào về máy tính hoặc công nghệ cứ hỏi mình giải thích ngay nhé!';
      }
    }
  }

  return null;
}

/**
 * BỘ PHÂN TÍCH NGỮ NGHĨA DỰ PHÒNG THÔNG MINH (SMART FALLBACK)
 * Tự động kích hoạt khi Google Gemini gặp sự cố mạng hoặc bị chặn Geolocation.
 */
export function getSmartFallback(rawQuery: string): string {
  if (!rawQuery) {
    return 'Chào bạn! Mình là Trợ lý AI Chuyên ngành CNTT & Tin học. Bạn đang gặp khó ở thao tác công nghệ hay bài học nào? Cứ hỏi mình nhé, mình giải thích ngắn gọn, dễ hiểu ngay!';
  }

  const qNoAccent = removeAccents(rawQuery);

  // 1. Chia sẻ file, dữ liệu, thư mục
  if (qNoAccent.includes('chia se') || qNoAccent.includes('share') || qNoAccent.includes('file') || qNoAccent.includes('thu muc')) {
    return [
      'Hướng dẫn nhanh bật chia sẻ file/thư mục qua mạng LAN (Windows 10):',
      '• **1. Bật chia sẻ mạng:** Vào **Control Panel** ➔ **Network and Sharing Center** ➔ **Change advanced sharing settings** ➔ Bật *Turn on network discovery*, *Turn on file and printer sharing*, tắt *password protected sharing*.',
      '• **2. Share thư mục:** Nhấp chuột phải vào thư mục ➔ **Properties** ➔ tab **Sharing** ➔ **Advanced Sharing** ➔ Tích *Share this folder*.',
      '• **3. Phân quyền:** Bấm nút **Permissions** ➔ Chọn **Everyone** và tích ô **Full Control** ➔ Bấm **OK**.',
      '👉 *Máy khác truy cập:* Bấm **Windows + R**, gõ `\\\\<Địa_chỉ_IP_máy_chủ>` (ví dụ `\\\\192.168.1.15`) rồi nhấn Enter.'
    ].join('\n');
  }

  // 2. Chia sẻ máy in
  if (qNoAccent.includes('may in') || qNoAccent.includes('printer')) {
    return [
      'Cách chia sẻ máy in qua mạng LAN trên Windows 10:',
      '• **Tại máy nối máy in:** Vào **Control Panel** ➔ **Devices and Printers** ➔ Chuột phải máy in ➔ **Printer properties** ➔ Tab **Sharing** ➔ Tích *Share this printer*.',
      '• **Tại máy kết nối:** Bấm **Windows + R**, gõ `\\\\<IP_máy_chủ>` ➔ Chuột phải vào máy in hiện ra và chọn **Connect**.'
    ].join('\n');
  }

  // 3. Tin học văn phòng (Word, Excel, Unikey)
  if (qNoAccent.includes('unikey') || qNoAccent.includes('tieng viet') || qNoAccent.includes('word') || qNoAccent.includes('excel')) {
    return [
      'Thủ thuật Tin học văn phòng & Gõ tiếng Việt:',
      '• **Unikey gõ tiếng Việt:** Thoát Unikey, chuột phải chọn **Run as administrator**, chọn bảng mã Unicode và kiểu gõ Telex.',
      '• **Word:** Căn lề chuẩn (Trên 2cm, Dưới 2cm, Trái 3cm, Phải 1.5cm). Đặt Heading 1/2 để tạo mục lục tự động.',
      '• **Excel:** Dùng `=SUM()` để cộng, `=IF()` để xét điều kiện, `=VLOOKUP()` để dò tìm số liệu.'
    ].join('\n');
  }

  // 4. Màn hình & Âm thanh (Loa / Tai nghe / Màn hình xoay)
  if (qNoAccent.includes('am thanh') || qNoAccent.includes('loa') || qNoAccent.includes('tai nghe') || qNoAccent.includes('xoay man hinh') || qNoAccent.includes('man hinh bi nguoc')) {
    return [
      'Khắc phục sự cố màn hình và âm thanh máy tính:',
      '• **Màn hình bị xoay ngược:** Bấm tổ hợp phím `Ctrl + Alt + Mũi tên lên` để xoay thẳng lại bình thường.',
      '• **Mất tiếng loa:** Cắm giắc tròn vào lỗ xanh lá phía sau máy, bấm vào biểu tượng loa góc Taskbar chọn đúng thiết bị Realtek Audio.'
    ].join('\n');
  }

  // 5. Tường lửa Firewall
  if (qNoAccent.includes('tuong lua') || qNoAccent.includes('firewall')) {
    return [
      'Cách tắt tường lửa Windows Defender Firewall:',
      '• **Bước 1:** Bấm **Windows + R**, gõ `firewall.cpl` rồi nhấn Enter.',
      '• **Bước 2:** Chọn **Turn Windows Defender Firewall on or off** ở menu bên trái.',
      '• **Bước 3:** Tích vào **Turn off Windows Defender Firewall** ở cả 2 mục Private và Public ➔ Bấm **OK**.'
    ].join('\n');
  }

  // 6. Phím tắt Boot Menu & BIOS
  if (qNoAccent.includes('boot') || qNoAccent.includes('bios') || qNoAccent.includes('usb')) {
    return [
      'Phím tắt Boot Menu và BIOS thông dụng:',
      '• **ASUS:** Bấm **F8** để chọn Boot USB (vào BIOS bấm Del/F2).',
      '• **MSI & WINNFOX:** Bấm **F11** để chọn Boot USB (vào BIOS bấm Del).',
      '• **Gigabyte / Dell / Lenovo:** Bấm **F12**.',
      '• **HP:** Bấm **F9** (vào BIOS bấm F10).'
    ].join('\n');
  }

  // 7. Bộ nhớ RAM & Vệ sinh
  if (qNoAccent.includes('ram') || qNoAccent.includes('ve sinh')) {
    return [
      'Kinh nghiệm thực hành với bộ nhớ RAM DDR4:',
      '• **Vệ sinh:** Dùng gôm trắng học sinh chà sạch chân đồng mạ vàng 2 mặt, quét sạch mạt gôm trước khi cắm.',
      '• **Lắp RAM:** Căn đúng rãnh khuyết lệch của DDR4, ấn đều 2 đầu nghe 2 tiếng "tách" đanh gọn.',
      '• **Bản chất:** RAM là mặt bàn làm việc tạm thời, tắt máy là dữ liệu trên RAM bị xóa sạch.'
    ].join('\n');
  }

  // 8. Mạng máy tính & Địa chỉ IP
  if (qNoAccent.includes('mang') || qNoAccent.includes('cap') || qNoAccent.includes('ip') || qNoAccent.includes('lan') || qNoAccent.includes('ping')) {
    return [
      'Kiến thức mạng máy tính căn bản:',
      '• **Thứ tự 8 màu chuẩn B:** Trắng cam - Cam - Trắng xanh lá - Xanh dương - Trắng xanh dương - Xanh lá - Trắng nâu - Nâu.',
      '• **Địa chỉ IP:** Giống như số nhà để các máy tính gửi và nhận dữ liệu trong mạng.',
      '• **Lệnh kiểm tra:** Dùng lệnh `ping 8.8.8.8` hoặc `ipconfig /all` trong CMD để kiểm tra thông mạng.'
    ].join('\n');
  }

  // 9. Cài đặt hệ điều hành Windows 10 & Ổ cứng
  if (qNoAccent.includes('cai win') || qNoAccent.includes('windows') || qNoAccent.includes('o cung') || qNoAccent.includes('ssd') || qNoAccent.includes('hdd') || qNoAccent.includes('driver')) {
    return [
      'Quy chuẩn cài đặt Windows 10 thực chiến:',
      '• **Chuẩn bị:** USB Boot tạo bằng Rufus chuẩn UEFI (định dạng ổ GPT).',
      '• **An toàn dữ liệu:** Chỉ format đúng phân vùng ổ C hệ điều hành, tuyệt đối không đụng vào ổ D/E chứa tài liệu khách hàng.',
      '• **Driver:** Sau khi cài xong mở Device Manager (`devmgmt.msc`) kiểm tra sạch dấu chấm than vàng.'
    ].join('\n');
  }

  // 10. Vi xử lý CPU, Keo tản nhiệt & Chẩn đoán nguồn
  if (qNoAccent.includes('cpu') || qNoAccent.includes('keo') || qNoAccent.includes('quat') || qNoAccent.includes('nguon') || qNoAccent.includes('khong len hinh')) {
    return [
      'Chẩn đoán phần cứng CPU và nguồn máy tính:',
      '• **Tra keo tản nhiệt:** Chỉ tra 1 chấm bằng hạt đậu xanh vào giữa lưng CPU, siết ốc quạt đều tay.',
      '• **Quạt quay không lên hình:** Tháo RAM chà sạch chân bằng gôm tẩy, kiểm tra dây cắm nguồn 4/8-pin CPU và dây cắm màn hình vào card rời GT 730.',
      '• **Nhiệt độ an toàn:** CPU khi hoạt động bình thường dưới 75°C, quá 85°C máy sẽ tự sập nguồn bảo vệ.'
    ].join('\n');
  }

  // 11. Tư vấn Laptop & Thiết bị
  if (qNoAccent.includes('laptop') || qNoAccent.includes('chon may') || qNoAccent.includes('mua may')) {
    return [
      'Tư vấn cấu hình máy tính & Laptop học tập CNTT:',
      '• **CPU:** Intel Core i5 (Gen 11 trở lên) hoặc AMD Ryzen 5 (Series 5000 trở lên).',
      '• **RAM:** Tối thiểu 16GB để mở nhiều ứng dụng không bị tràn bộ nhớ.',
      '• **Ổ cứng:** SSD NVMe tối thiểu 512GB siêu tốc.',
      '• **Màn hình:** 14-15.6 inch Full HD IPS chống chói.'
    ].join('\n');
  }

  // Phản hồi định hướng học tập thân thiện nếu câu hỏi chưa khớp các mục trên
  return [
    `Chào bạn! Mình là Trợ lý AI chuyên ngành CNTT & Tin học. Về câu hỏi của bạn: "${rawQuery.slice(0, 75)}"`,
    'Mình luôn sẵn sàng giải đáp tất cả câu hỏi về máy tính, phần mềm, phần cứng, mạng và tin học:',
    '• **Tin học & Phần mềm:** Word, Excel, Unikey, phím tắt Windows 10, gỡ lỗi phần mềm, nén file.',
    '• **Mạng & Hệ thống:** Bật chia sẻ file/máy in LAN, đặt IP tĩnh, tắt tường lửa, cấu hình Wifi/Router.',
    '• **Phần cứng & Thiết bị số:** Tháo lắp linh kiện, kiểm tra CPU/RAM/VGA/Ổ cứng, tư vấn cấu hình laptop.',
    '👉 Bạn có thể chia sẻ cụ thể hơn bạn đang dùng máy gì hoặc gặp lỗi gì để mình hướng dẫn từng bước ngay nhé!'
  ].join('\n');
}
