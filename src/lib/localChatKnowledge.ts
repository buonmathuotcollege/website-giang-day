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

export function matchKnowledge(rawQuery: string): string | null {
  if (!rawQuery || typeof rawQuery !== 'string') return null;
  const q = rawQuery.trim().toLowerCase();
  const qNoAccent = removeAccents(q);

  // =========================================================================
  // 1. PHÍM BOOT USB & PHÍM VÀO BIOS CÁC DÒNG BO MẠCH & MÁY TÍNH
  // =========================================================================

  // ASUS
  if ((qNoAccent.includes('boot') || qNoAccent.includes('usb') || qNoAccent.includes('bios')) && qNoAccent.includes('asus')) {
    return [
      'Phím tắt Boot USB và BIOS của bo mạch chủ **ASUS**:',
      '• **Phím Boot Menu (chọn USB Boot):** Bấm phím **F8** liên tục ngay khi vừa bật nguồn.',
      '• **Phím vào BIOS:** Bấm phím **Delete (Del)** hoặc **F2**.',
      '⚠️ *Lưu ý KTV phòng thực hành:* Tuyệt đối không bấm phím F11 (F11 là của MSI, bấm trên main ASUS sẽ không lên Boot Menu).'
    ].join('\n');
  }

  // MSI
  if ((qNoAccent.includes('boot') || qNoAccent.includes('usb') || qNoAccent.includes('bios')) && qNoAccent.includes('msi')) {
    return [
      'Phím tắt Boot USB và BIOS của bo mạch chủ **MSI** (chuẩn H510M-A PRO):',
      '• **Phím Boot Menu (chọn USB Boot):** Bấm phím **F11** liên tục ngay khi vừa bật nguồn.',
      '• **Phím vào BIOS:** Bấm phím **Delete (Del)**.',
      '💡 *Mẹo KTV:* Khi máy không lên hình, nhìn ngay cụm 4 đèn **EZ Debug LED** ở góc trên bo mạch (CPU - DRAM - VGA - BOOT) để khoanh vùng bệnh ngay.'
    ].join('\n');
  }

  // WINNFOX
  if ((qNoAccent.includes('boot') || qNoAccent.includes('usb') || qNoAccent.includes('bios')) && (qNoAccent.includes('winnfox') || qNoAccent.includes('winfox'))) {
    return [
      'Phím tắt Boot USB và BIOS của bo mạch chủ **WINNFOX** (chuẩn H510G):',
      '• **Phím Boot Menu (chọn USB Boot):** Bấm phím **F11** (hoặc **F7** ở một số bản AMI BIOS).',
      '• **Phím vào BIOS:** Bấm phím **Delete (Del)**.',
      '⚠️ *Lưu ý KTV:* Bo mạch Winnfox không có đèn debug, bắt buộc phải cắm **Loa Buzzer (Loa bíp)** vào chân J_SPEAKER để nghe mã tiếng bíp chẩn đoán lỗi.'
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
      '🔴 **Tuyệt đối cấm:** Không lấy tay bôi quệt lem nhem, không bơm quá nhiều làm keo tràn ra viền socket chập chân vi mạch.'
    ].join('\n');
  }

  // CỤM CHÂN KIM F_PANEL (FRONT PANEL)
  if (qNoAccent.includes('fpanel') || qNoAccent.includes('front panel') || qNoAccent.includes('power sw') || qNoAccent.includes('reset sw') || qNoAccent.includes('jfp1')) {
    return [
      'Bản đồ 9 chân kim Front Panel (F_PANEL) chuẩn quốc tế:',
      '• **Điểm mốc:** Tìm vị trí chân số 9 bị khuyết (ở hàng dưới cùng bên phải).',
      '• **HÀNG TRÊN:** 2 chân bên phải (ngay sát cạnh chân khuyết) là **POWER SW** (nút bật nguồn). 2 chân bên trái là **POWER LED**.',
      '• **HÀNG DƯỚI:** 2 chân đối diện với POWER SW là **RESET SW** (nút khởi động lại). 2 chân bên trái là **HDD LED**.',
      '💡 **Khẩu quyết:** Nút POWER SW và RESET SW là công tắc đóng ngắt tiếp điểm, cắm chiều nào cũng chạy bình thường (không phân biệt âm dương)!'
    ].join('\n');
  }

  // THÁO PIN CMOS & CLEAR CMOS
  if (qNoAccent.includes('pin cmos') || qNoAccent.includes('clear cmos') || qNoAccent.includes('cr2032') || qNoAccent.includes('jbat1') || qNoAccent.includes('sai gio')) {
    return [
      'Kỹ thuật tháo pin CR2032 và Clear CMOS (xả BIOS gốc):',
      '• **Tháo pin:** Rút điện 220V, bấm nút nguồn 3 lần xả tụ, lấy đầu que nhựa ấn nhẹ lẫy vành để pin nảy 45 độ lên.',
      '• **Clear CMOS nhanh:** Dùng đầu tua vít chập 2 chân kim **JBAT1 / CLR_CMOS** trong 10 giây để xả sạch thiết lập BIOS cũ (sửa lỗi treo logo, quên pass BIOS).',
      '• **Lắp lại:** Mặt chữ in dấu **(+)** và tên **CR2032** luôn ngửa lên trên nhìn thấy.',
      '⚠️ Nếu máy bật lên liên tục bị sai ngày giờ hoặc bắt nhấn F1/F2 ➔ Thay ngay pin CMOS mới (chuẩn 3V).'
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

  // =========================================================================
  // 4. GUARDRAILS TỪ CHỐI LỊCH SỰ CÁC CHỦ ĐỀ NGOÀI PHẠM VI
  // =========================================================================
  const outOfScopeKeywords = [
    'toan', 'ly', 'hoa', 'sinh', 'van', 'tho', 'bai tho', 'viet van', 'giai toan',
    'yeu', 'to tinh', 'ban gai', 'ban trai', 'nguoi yeu', 'game', 'lien quan', 'free fire',
    'showbiz', 'ca si', 'dien vien', 'tu vi', 'boi toan', 'cung hoang dao'
  ];

  for (const kw of outOfScopeKeywords) {
    if (qNoAccent.includes(kw)) {
      return 'Mình là Trợ lý AI hỗ trợ học tập chuyên ngành CNTT nên chỉ giải đáp các kiến thức về máy tính, phần cứng, mạng và thực hành thôi nè! Bạn tập trung vào bài học nghề nhé, có chỗ nào chưa hiểu về máy tính cứ hỏi mình giải thích ngay!';
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
    return 'Chào bạn! Mình là Trợ lý AI Học tập CNTT. Bạn đang gặp khó ở bài học hay thao tác thực hành nào? Cứ hỏi mình nhé, mình giải thích ngắn gọn, dễ hiểu ngay!';
  }

  const qNoAccent = removeAccents(rawQuery);

  // Nhận diện theo từ khóa trọng tâm
  if (qNoAccent.includes('boot') || qNoAccent.includes('bios')) {
    return [
      'Phím tắt Boot Menu và BIOS thông dụng:',
      '• **ASUS:** Bấm **F8** để chọn Boot USB (vào BIOS bấm Del/F2).',
      '• **MSI & WINNFOX:** Bấm **F11** để chọn Boot USB (vào BIOS bấm Del).',
      '• **Gigabyte / Dell / Lenovo:** Bấm **F12**.',
      '• **HP:** Bấm **F9** (vào BIOS bấm F10).'
    ].join('\n');
  }

  if (qNoAccent.includes('ram')) {
    return [
      'Kinh nghiệm thực hành với bộ nhớ RAM DDR4:',
      '• **Vệ sinh:** Dùng gôm trắng học sinh chà sạch chân đồng mạ vàng 2 mặt, quét sạch mạt gôm trước khi cắm.',
      '• **Lắp RAM:** Căn đúng rãnh khuyết lệch của DDR4, ấn đều 2 đầu nghe 2 tiếng "tách" đanh gọn.',
      '• **Bản chất:** RAM là mặt bàn làm việc tạm thời, tắt máy là dữ liệu trên RAM bị xóa sạch.'
    ].join('\n');
  }

  if (qNoAccent.includes('mang') || qNoAccent.includes('cap') || qNoAccent.includes('ip')) {
    return [
      'Kiến thức mạng máy tính căn bản:',
      '• **Thứ tự 8 màu chuẩn B:** Trắng cam - Cam - Trắng xanh lá - Xanh dương - Trắng xanh dương - Xanh lá - Trắng nâu - Nâu.',
      '• **Địa chỉ IP:** Giống như số nhà để các máy tính gửi và nhận dữ liệu trong mạng.',
      '• **Lệnh kiểm tra:** Dùng lệnh `ping 8.8.8.8` trong CMD để kiểm tra thông mạng Internet.'
    ].join('\n');
  }

  if (qNoAccent.includes('cai win') || qNoAccent.includes('windows')) {
    return [
      'Quy chuẩn cài đặt Windows 10 thực chiến:',
      '• **Chuẩn bị:** USB Boot tạo bằng Rufus chuẩn UEFI (định dạng ổ GPT).',
      '• **An toàn dữ liệu:** Chỉ format đúng phân vùng ổ C hệ điều hành, tuyệt đối không đụng vào ổ D/E chứa tài liệu khách hàng.',
      '• **Driver:** Sau khi cài xong mở Device Manager (`devmgmt.msc`) kiểm tra sạch dấu chấm than vàng.'
    ].join('\n');
  }

  return 'Chào bạn! Mình là Trợ lý AI Học tập CNTT. Bạn có thể hỏi cụ thể hơn về bài học (ví dụ: cách bấm mạng chuẩn B, phím boot cài Win, hay cách khắc phục máy tính quạt quay không lên hình) để mình giải thích ngắn gọn, dễ hiểu ngay nhé!';
}
