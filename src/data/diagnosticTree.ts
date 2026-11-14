// ============================================================================
// CÂY CHẨN ĐOÁN SỰ CỐ PHẦN CỨNG MÁY TÍNH BẮT BỆNH TRONG 60 GIÂY
// Dành cho Kỹ thuật viên & Học sinh Trung cấp 9+3 thực hành
// Biên soạn: CN. Phạm Tiến Đông
// ============================================================================

export interface DiagnosticSolution {
  rootCause: string;
  action: string;
  tools: string[];
  safetyWarning?: string;
  pokaYoke: string;
}

export interface DiagnosticOption {
  label: string;
  icon?: string;
  nextNodeId?: string;
  isSolution?: boolean;
  solution?: DiagnosticSolution;
}

export interface DiagnosticStep {
  id: string;
  caseCode: string;
  caseName: string;
  question: string;
  instruction: string;
  visualHint?: string;
  options: DiagnosticOption[];
}

export interface DiagnosticScenario {
  id: string;
  code: string;
  title: string;
  shortDesc: string;
  icon: string;
  startStepId: string;
  estimatedTime: string;
}

export const DIAGNOSTIC_SCENARIOS: DiagnosticScenario[] = [
  {
    id: 'case_im_re',
    code: 'CA-01',
    title: 'Bấm nút nguồn máy IM RE',
    shortDesc: 'Quạt không quay, đèn không sáng, không tiếng bíp, hoàn toàn mất nguồn.',
    icon: '🔌',
    startStepId: 'step_power_01',
    estimatedTime: '60 giây',
  },
  {
    id: 'case_man_den',
    code: 'CA-02',
    title: 'Quạt quay nhưng MÀN HÌNH ĐEN',
    shortDesc: 'Quạt CPU và quạt vỏ quay vù vù, đèn sáng nhưng màn hình báo No Signal.',
    icon: '🖥️',
    startStepId: 'step_screen_01',
    estimatedTime: '90 giây',
  },
  {
    id: 'case_no_boot',
    code: 'CA-03',
    title: 'Lỗi "No Bootable Device"',
    shortDesc: 'Lên logo nhà sản xuất rồi dừng lại ở màn hình đen kèm dòng chữ báo mất ổ đĩa.',
    icon: '💾',
    startStepId: 'step_boot_01',
    estimatedTime: '60 giây',
  },
  {
    id: 'case_qua_nhiet',
    code: 'CA-04',
    title: 'Chạy 5–10 phút TỰ TẮT NGUỒN',
    shortDesc: 'Máy chạy được một lúc thì quạt gầm rú, máy đơ rồi tự ngắt nguồn đột ngột.',
    icon: '🔥',
    startStepId: 'step_thermal_01',
    estimatedTime: '60 giây',
  },
  {
    id: 'case_may_in',
    code: 'CA-05',
    title: 'Máy in văn phòng KHÔNG IN ĐƯỢC',
    shortDesc: 'Bấm in tài liệu Word/Excel nhưng máy in im lặng, báo lỗi Spooler hoặc kẹt lệnh in.',
    icon: '🖨️',
    startStepId: 'step_print_01',
    estimatedTime: '45 giây',
  },
];

export const DIAGNOSTIC_STEPS: Record<string, DiagnosticStep> = {
  // ==========================================================================
  // CA 1: BẤM NÚT NGUỒN MÁY IM RE
  // ==========================================================================
  'step_power_01': {
    id: 'step_power_01',
    caseCode: 'CA-01',
    caseName: 'Bấm nút nguồn máy IM RE',
    question: '1. Kiểm tra công tắc I/O phía sau bộ nguồn PSU và ổ cắm điện 220V:',
    instruction: 'Quan sát phía sau thùng máy: Công tắc I/O trên bộ nguồn PSU đang ở vị trí nào? Phích cắm điện vào ổ tường có chắc chắn không?',
    visualHint: 'Vị trí công tắc I/O: Ký hiệu [ - ] là Bật (ON), Ký hiệu [ O ] là Tắt (OFF).',
    options: [
      {
        label: 'Công tắc đang ở [ O ] (Tắt) hoặc phích cắm bị lỏng',
        icon: '⚠️',
        isSolution: true,
        solution: {
          rootCause: 'Công tắc nguồn I/O phía sau PSU đang ở chế độ ngắt mạch (O) hoặc phích cắm điện bị lỏng.',
          action: 'Gạt công tắc I/O sang vị trí [ - ] (Bật), cắm chặt lại dây nguồn 3 chấu vào ổ cắm điện 220V chắc chắn.',
          tools: ['Dây nguồn 3 chấu đạt chuẩn', 'Ổ cắm điện có đèn báo'],
          safetyWarning: 'Kiểm tra ổ cắm không bị rò rỉ điện hoặc tia lửa điện.',
          pokaYoke: 'Luôn kiểm tra công tắc cơ I/O trước khi mở nắp thùng máy!',
        },
      },
      {
        label: 'Công tắc đã bật [ - ] và phích cắm 220V rất chắc chắn',
        icon: '✓',
        nextNodeId: 'step_power_02',
      },
    ],
  },
  'step_power_02': {
    id: 'step_power_02',
    caseCode: 'CA-01',
    caseName: 'Bấm nút nguồn máy IM RE',
    question: '2. Mở nắp thùng máy và kiểm tra dây POWER SW tại cụm F_PANEL:',
    instruction: 'Dùng tua-vít mở nắp bên hông thùng máy. Quan sát cụm chân cắm Front Panel (góc dưới bên phải bo mạch chủ). Cặp dây POWER SW có bị tuột không? Hãy dùng đầu nhíp kim loại chạm nối tắt (kích thử) 2 cọc chân POWER SW.',
    visualHint: 'Cụm F_PANEL: 2 cọc PWR_BTN / POWER SW nằm cạnh nhau, thường có màu đỏ/trắng hoặc ký hiệu nhỏ trên bo mạch.',
    options: [
      {
        label: 'Dùng nhíp kích 2 cọc thì quạt quay, máy bật nguồn ngay!',
        icon: '⚡',
        isSolution: true,
        solution: {
          rootCause: 'Nút bấm Power trên vỏ thùng máy (case) bị kẹt, gãy lò xo tiếp điểm, hoặc tuột dây cắm POWER SW khỏi bo mạch.',
          action: 'Cắm lại chặt dây POWER SW vào đúng 2 cọc chân trên main. Nếu nút vỏ hỏng: Chuyển dây RESET SW cắm vào cọc POWER SW để dùng tạm nút Reset làm nút bật nguồn!',
          tools: ['Nhíp kỹ thuật hoặc tua-vít dẹp', 'Đèn pin soi chân main'],
          pokaYoke: 'Mẹo kỹ thuật viên: Hoán đổi nút Reset làm nút Power khi vỏ thùng máy bị hỏng công tắc.',
        },
      },
      {
        label: 'Kích thử bằng nhíp máy VẪN IM RE, quạt không nhúc nhích',
        icon: '✗',
        nextNodeId: 'step_power_03',
      },
    ],
  },
  'step_power_03': {
    id: 'step_power_03',
    caseCode: 'CA-01',
    caseName: 'Bấm nút nguồn máy IM RE',
    question: '3. Kiểm tra kích nguồn PSU độc lập (Thử nghiệm 24-Pin):',
    instruction: 'Rút đầu cắm 24 chân ra khỏi bo mạch chủ. Dùng một chiếc kẹp giấy kim loại uốn cong, cắm nối tắt giữa DÂY XANH LÁ (dây kích nguồn PS_ON) với bất kỳ DÂY ĐEN nào (dây Mass GND). Cắm điện vào PSU.',
    visualHint: 'Dây xanh lá duy nhất ở vị trí chân số 16 trên đầu cắm 24-pin ATX.',
    options: [
      {
        label: 'Quạt nguồn PSU KHÔNG QUAY hoặc chỉ giật nhẹ một cái rồi tắt',
        icon: '☠️',
        isSolution: true,
        solution: {
          rootCause: 'Bộ nguồn PSU đã bị chết tụ, đứt cầu chì bảo vệ, hoặc hỏng mạch tạo dao động điện áp 5VSB.',
          action: 'Thay thế bộ nguồn PSU mới đạt chuẩn công suất thực (tối thiểu 450W - 500W của các hãng uy tín Antec, Corsair, FSP).',
          tools: ['Bộ nguồn PSU dự phòng kiểm tra', 'Đồng hồ vạn năng VOM'],
          safetyWarning: 'TUYỆT ĐỐI KHÔNG tự ý cạy mở bên trong bộ nguồn PSU vì tụ điện tích trữ điện áp 400V cực kỳ nguy hiểm!',
          pokaYoke: 'Thay nguồn PSU thử nghiệm trước khi kết luận bo mạch chủ bị cháy.',
        },
      },
      {
        label: 'Quạt nguồn PSU quay êm ái, nguồn vẫn sống tốt',
        icon: '⚠️',
        isSolution: true,
        solution: {
          rootCause: 'Bo mạch chủ (Mainboard) bị chập đường nguồn 12V CPU, chết tụ lọc nguồn hoặc hỏng IC Super I/O điều khiển.',
          action: 'Rút dây nguồn 4-pin/8-pin CPU ra rồi thử kích lại. Nếu máy quay quạt: Bo mạch bị chập dàn Mosfet CPU. Chuyển bo mạch chủ về phòng bảo hành chuyên sâu hoặc thay thế Mainboard mới.',
          tools: ['Đồng hồ vạn năng đo thông mạch', 'Bo mạch chủ tương thích'],
          pokaYoke: 'Rút tải từng linh kiện (VGA, RAM, CPU) để cô lập chính xác linh kiện gây chập nguồn.',
        },
      },
    ],
  },

  // ==========================================================================
  // CA 2: QUẠT QUAY VÙ VÙ NHƯNG MÀN HÌNH ĐEN
  // ==========================================================================
  'step_screen_01': {
    id: 'step_screen_01',
    caseCode: 'CA-02',
    caseName: 'Quạt quay nhưng MÀN HÌNH ĐEN',
    question: '1. Kiểm tra đèn bàn phím (Num Lock / Caps Lock):',
    instruction: 'Cắm bàn phím USB vào máy. Bấm liên tục phím Num Lock hoặc Caps Lock. Quan sát đèn LED nhỏ ở góc trên bàn phím có bật/tắt theo nhịp bấm không?',
    visualHint: 'Đèn Num Lock sáng tắt = Máy tính đã nạp BIOS và khởi động thành công (POST Pass)!',
    options: [
      {
        label: 'Đèn Num Lock BẬT/TẮT ĐƯỢC theo nhịp bấm (Máy đã chạy)',
        icon: '💡',
        nextNodeId: 'step_screen_vga',
      },
      {
        label: 'Đèn Num Lock IM RE, bấm không sáng (Máy chưa POST xong)',
        icon: '✗',
        nextNodeId: 'step_screen_ram',
      },
    ],
  },
  'step_screen_vga': {
    id: 'step_screen_vga',
    caseCode: 'CA-02',
    caseName: 'Quạt quay nhưng MÀN HÌNH ĐEN',
    question: '2. Kiểm tra vị trí cắm cáp màn hình (Mainboard vs Card rời VGA):',
    instruction: 'Máy đã khởi động được nhưng không có hình. Quan sát phía sau thùng máy: Máy có Card màn hình rời không? Cáp màn hình HDMI/VGA đang cắm vào cổng nào?',
    visualHint: 'Cổng trên bo mạch chủ (ở cụm trên) vs Cổng Card đồ họa rời (nằm ngang ở cụm dưới).',
    options: [
      {
        label: 'Cáp màn hình đang cắm nhầm vào cổng trên Bo mạch chủ (Mainboard)',
        icon: '⚠️',
        isSolution: true,
        solution: {
          rootCause: 'Cắm nhầm cổng xuất hình! Khi máy có gắn Card đồ họa rời (VGA), bo mạch chủ sẽ tự động vô hiệu hóa cổng xuất hình onboard trên main.',
          action: 'Rút cáp màn hình từ cổng Mainboard ở trên, cắm xuống đúng cổng HDMI/DisplayPort/VGA của Card đồ họa rời ở cụm dưới.',
          tools: ['Cáp HDMI / DisplayPort / VGA'],
          pokaYoke: 'Quy tắc vàng KTV: Có Card rời thì BẮT BUỘC cắm màn hình vào Card rời!',
        },
      },
      {
        label: 'Đã cắm đúng cổng Card rời hoặc máy chỉ dùng card onboard',
        icon: '✓',
        isSolution: true,
        solution: {
          rootCause: 'Cáp tín hiệu màn hình bị gãy lõi ngầm, sai nguồn đầu vào (Input Source trên màn hình đang chọn DisplayPort thay vì HDMI), hoặc màn hình hỏng.',
          action: 'Bấm nút Menu trên màn hình kiểm tra Source (chọn đúng HDMI 1 hoặc HDMI 2). Thử thay sợi cáp HDMI mới hoặc cắm thử màn hình khác.',
          tools: ['Cáp tín hiệu mới', 'Màn hình thử nghiệm'],
          pokaYoke: 'Kiểm tra nút bấm chọn nguồn tín hiệu Input trên màn hình trước khi kết luận card VGA hỏng.',
        },
      },
    ],
  },
  'step_screen_ram': {
    id: 'step_screen_ram',
    caseCode: 'CA-02',
    caseName: 'Quạt quay nhưng MÀN HÌNH ĐEN',
    question: '2. Vệ sinh chân mạ vàng của thanh RAM bằng Cục Tẩy:',
    instruction: 'Áp dụng Luật 1: Rút điện, bấm nút nguồn 3 lần xả tụ. Bật 2 lẫy khóa tai nhựa, rút thanh RAM ra. Quan sát hai mặt chân mạ vàng có bị bám bụi xỉn màu không? Lấy CỤC TẨY TRẮNG HỌC SINH chà sạch cả 2 mặt chân đồng, dùng cọ quét sạch khe cắm.',
    visualHint: 'Cục tẩy học sinh đánh bay lớp đồng oxit bám ở chân RAM cực kỳ hiệu quả mà không làm xước mạch.',
    options: [
      {
        label: 'Cắm chặt lại thanh RAM nghe 2 tiếng "tách", bật máy LÊN HÌNH NGAY!',
        icon: '🎉',
        isSolution: true,
        solution: {
          rootCause: 'Chân tiếp xúc mạ vàng của RAM bị oxy hóa bởi độ ẩm không khí hoặc khe cắm RAM bị bám bụi bẩn, làm mất tín hiệu bus truyền dữ liệu.',
          action: 'Đã dùng cục tẩy chà sạch 2 mặt chân mạ vàng của RAM, thổi sạch bụi khe cắm và cắm lại sập khóa 2 tai nhựa chắc chắn.',
          tools: ['Cục tẩy học sinh màu trắng', 'Chổi cọ quét sơn mềm', 'Bóng xịt bụi'],
          pokaYoke: '70% ca máy màn hình đen được chữa khỏi bằng đúng 1 cục tẩy học sinh 3.000 VNĐ!',
        },
      },
      {
        label: 'Đã vệ sinh sạch RAM cắm lại nhưng máy VẪN MÀN HÌNH ĐEN',
        icon: '✗',
        nextNodeId: 'step_screen_dual_ram',
      },
    ],
  },
  'step_screen_dual_ram': {
    id: 'step_screen_dual_ram',
    caseCode: 'CA-02',
    caseName: 'Quạt quay nhưng MÀN HÌNH ĐEN',
    question: '3. Cô lập linh kiện: Thử từng thanh RAM và từng khe cắm:',
    instruction: 'Nếu máy cắm 2 thanh RAM, hãy rút bớt 1 thanh ra. Chỉ cắm duy nhất 1 thanh vào khe cắm số 2 (Slot 2). Nếu vẫn không lên, đổi sang thanh RAM còn lại.',
    options: [
      {
        label: 'Cắm thanh số 1 thì lên hình, cắm thanh số 2 thì màn hình đen',
        icon: '⚠️',
        isSolution: true,
        solution: {
          rootCause: 'Thanh RAM số 2 đã bị chết chip nhớ hoặc lỗi mạch điều khiển.',
          action: 'Loại bỏ thanh RAM hỏng. Tư vấn khách hàng thay thế thanh RAM mới cùng chuẩn DDR và cùng bus (VD: DDR4 3200MHz 8GB).',
          tools: ['Thanh RAM dự phòng cùng chuẩn'],
          pokaYoke: 'Luôn test từng thanh RAM độc lập trước khi kết luận khe cắm trên bo mạch chủ bị hỏng.',
        },
      },
      {
        label: 'Cả 2 thanh RAM thử trên máy khác đều tốt -> Vấn đề do Socket CPU hoặc BIOS',
        icon: '🔬',
        isSolution: true,
        solution: {
          rootCause: 'Chân Socket CPU bị cong vênh / bám bụi; hoặc phiên bản BIOS trên bo mạch chủ quá cũ chưa hỗ trợ mã CPU hiện tại.',
          action: 'Tháo pin CMOS ra 5 phút để Clear CMOS về mặc định. Tháo CPU kiểm tra chân socket bo mạch chủ bằng kính lúp xem có chân nào bị quẹo không. Cập nhật BIOS mới nhất.',
          tools: ['Kính lúp', 'Đèn pin', 'Nhíp uốn chân socket'],
          safetyWarning: 'TUYỆT ĐỐI KHÔNG chạm ngón tay vào khu vực chân Socket Intel LGA vì chân kim loại siêu mỏng rất dễ gãy!',
          pokaYoke: 'Clear CMOS là tuyệt chiêu khôi phục xung nhịp và cấu hình RAM mặc định khi máy bị treo boot.',
        },
      },
    ],
  },

  // ==========================================================================
  // CA 3: LỖI "NO BOOTABLE DEVICE"
  // ==========================================================================
  'step_boot_01': {
    id: 'step_boot_01',
    caseCode: 'CA-03',
    caseName: 'Lỗi "No Bootable Device"',
    question: '1. Kiểm tra kết nối cáp vật lý của ổ cứng SSD / HDD:',
    instruction: 'Rút điện. Mở nắp thùng máy kiểm tra: Ổ cứng có cắm đủ 2 sợi dây không? (1 sợi dây nguồn dẹp từ PSU + 1 sợi cáp dữ liệu SATA nối vào Mainboard). Thử cắm lại chặt cả 2 đầu cáp.',
    visualHint: 'Ổ cứng SATA bắt buộc phải có 2 dây: Dây nguồn (đầu rộng hơn) và Dây cáp dữ liệu (đầu hẹp hơn).',
    options: [
      {
        label: 'Phát hiện lỏng cáp SATA hoặc tuột dây nguồn, cắm lại thì vào được Win',
        icon: '🎉',
        isSolution: true,
        solution: {
          rootCause: 'Cáp tín hiệu SATA hoặc dây nguồn ổ đĩa bị lỏng chân do rung lắc trong quá trình di chuyển thùng máy.',
          action: 'Cắm chặt lại cả 2 đầu cáp SATA. Nếu cáp lỏng lẫy kim loại, thay ngay sợi cáp SATA có khóa kim loại mới.',
          tools: ['Cáp SATA có lẫy khóa kim loại'],
          pokaYoke: 'Ưu tiên dùng cáp SATA có chốt khóa sắt để tránh bị tuột khi quạt quay rung lắc.',
        },
      },
      {
        label: 'Cáp cắm rất chặt chẽ nhưng máy VẪN BÁO LỖI NO BOOTABLE',
        icon: '✗',
        nextNodeId: 'step_boot_02',
      },
    ],
  },
  'step_boot_02': {
    id: 'step_boot_02',
    caseCode: 'CA-03',
    caseName: 'Lỗi "No Bootable Device"',
    question: '2. Khởi động vào BIOS (bấm phím Del / F2) xem ổ cứng:',
    instruction: 'Bật máy và nhấn liên tục phím Del hoặc F2. Vào mục Storage / System Status: Bo mạch chủ có nhận diện được Tên và Dung lượng của ổ cứng không (VD: Kingston SSD 240GB, WD 1TB)?',
    options: [
      {
        label: 'Trong BIOS ghi "None" / "Not Detected" (Không thấy ổ cứng đâu)',
        icon: '☠️',
        isSolution: true,
        solution: {
          rootCause: 'Ổ cứng SSD/HDD bị chết bo mạch điều khiển (controller), chết chip nhớ, hoặc cổng SATA trên mainboard bị hỏng.',
          action: 'Thử chuyển cáp SATA sang cổng SATA khác trên bo mạch. Dùng box ổ cứng cắm ngoài kiểm tra trên máy khác. Nếu ổ cứng chết hẳn: Thay ổ cứng SSD mới và tư vấn khách cứu dữ liệu chuyên sâu.',
          tools: ['Box chuyển đổi USB sang SATA', 'Ổ cứng SSD mới'],
          pokaYoke: 'Nhắc khách hàng nguyên tắc sao lưu 3-2-1 để không bao giờ mất dữ liệu khi ổ cứng chết đột tử.',
        },
      },
      {
        label: 'Trong BIOS VẪN THẤY tên và dung lượng ổ cứng đầy đủ',
        icon: '✓',
        nextNodeId: 'step_boot_03',
      },
    ],
  },
  'step_boot_03': {
    id: 'step_boot_03',
    caseCode: 'CA-03',
    caseName: 'Lỗi "No Bootable Device"',
    question: '3. Kiểm tra chế độ khởi động (Boot Mode: UEFI vs CSM Legacy):',
    instruction: 'Ổ cứng vẫn sống tốt nhưng không boot được Windows. Vào tab Boot trong BIOS: Chế độ Boot Mode đang là UEFI hay Legacy/CSM? Thứ tự Boot Option #1 đang trỏ vào đâu?',
    options: [
      {
        label: 'Máy đang để sai chế độ Boot (Legacy thay vì UEFI hoặc ngược lại)',
        icon: '⚠️',
        isSolution: true,
        solution: {
          rootCause: 'Sai chế độ Boot Mode! Ổ cứng cài Windows chuẩn GPT nhưng BIOS bị chuyển nhầm sang Legacy CSM (thường do hết pin CMOS làm BIOS reset về mặc định).',
          action: 'Chuyển Boot Mode từ Legacy sang UEFI (hoặc bật CSM nếu Win cũ MBR). Đặt Boot Option #1 là "Windows Boot Manager". Nhấn F10 để lưu cấu hình.',
          tools: ['Kiến thức thiết lập BIOS/UEFI'],
          pokaYoke: 'Mẹo KTV: Nếu thấy ổ cứng GPT thì BẮT BUỘC chọn UEFI và Windows Boot Manager làm ưu tiên số 1!',
        },
      },
      {
        label: 'Chế độ Boot đúng nhưng phân vùng Boot EFI bị lỗi / hỏng hệ điều hành',
        icon: '🔧',
        isSolution: true,
        solution: {
          rootCause: 'Phân vùng khởi động EFI của Windows bị nhiễm virus, lỗi file BCD (Boot Configuration Data), hoặc Windows bị lỗi do tắt máy đột ngột.',
          action: 'Cắm USB cứu hộ WinPE -> Mở phần mềm Macrium Reflect hoặc gõ lệnh bcdboot C:\\Windows /s S: /f UEFI để nạp lại phân vùng boot, hoặc cài lại Windows vào đúng ổ C.',
          tools: ['USB cứu hộ WinPE (Anhdv / DLC Boot)', 'Phần mềm sửa lỗi Boot'],
          safetyWarning: 'TUYỆT ĐỐI ÁP DỤNG LUẬT 2: Cứu dữ liệu Desktop/Documents trước khi format hoặc cài lại Win!',
          pokaYoke: 'Sửa phân vùng Boot trong 2 phút bằng USB WinPE thay vì vội vàng cài lại toàn bộ máy.',
        },
      },
    ],
  },

  // ==========================================================================
  // CA 4: CHẠY 5–10 PHÚT TỰ TẮT NGUỒN
  // ==========================================================================
  'step_thermal_01': {
    id: 'step_thermal_01',
    caseCode: 'CA-04',
    caseName: 'Chạy 5–10 phút TỰ TẮT NGUỒN',
    question: '1. Khởi động vào BIOS kiểm tra nhiệt độ CPU (Hardware Monitor):',
    instruction: 'Bật máy bấm Del vào BIOS -> Tìm mục Hardware Monitor (hoặc PC Health Status). Đọc con số CPU Temperature sau 2 phút mở máy:',
    options: [
      {
        label: 'Nhiệt độ CPU tăng vọt lên > 85°C - 95°C (Quá nóng)',
        icon: '🔥',
        nextNodeId: 'step_thermal_fan',
      },
      {
        label: 'Nhiệt độ CPU bình thường (< 45°C - 55°C)',
        icon: '❄️',
        isSolution: true,
        solution: {
          rootCause: 'Nguyên nhân không phải do quá nhiệt CPU! Máy tắt do bộ nguồn PSU bị sụt áp đường 12V khi ăn tải, hoặc bo mạch chủ bị phù nứt tụ lọc.',
          action: 'Kiểm tra đường điện áp 12V, 5V, 3.3V trong BIOS xem có bị sụt giảm quá 5% không. Thử thay thế bộ nguồn PSU khác để kiểm tra tải.',
          tools: ['Bộ nguồn PSU dự phòng', 'Đồng hồ VOM'],
          pokaYoke: 'Nhiệt độ CPU mát mẻ mà máy tự tắt -> 90% thủ phạm là bộ nguồn PSU sụt áp!',
        },
      },
    ],
  },
  'step_thermal_fan': {
    id: 'step_thermal_fan',
    caseCode: 'CA-04',
    caseName: 'Chạy 5–10 phút TỰ TẮT NGUỒN',
    question: '2. Kiểm tra quạt tản nhiệt và lớp keo tản nhiệt CPU:',
    instruction: 'Mở nắp thùng máy quan sát: Quạt CPU có quay không? Cáp quạt có cắm đúng cọc CPU_FAN không? Tháo quạt kiểm tra lớp keo tản nhiệt cũ:',
    options: [
      {
        label: 'Keo cũ khô cứng nứt nẻ như đất sét, quạt bám két bụi dày đặc',
        icon: '⚠️',
        isSolution: true,
        solution: {
          rootCause: 'Quá nhiệt vi xử lý (Thermal Shutdown)! Keo tản nhiệt đã hết hạn dẫn nhiệt sau nhiều năm sử dụng, quạt bị két bụi cản gió khiến CPU chạm ngưỡng 100°C tự ngắt để chống cháy chip.',
          action: 'Quy trình Bước 4 chuẩn KTV: (1) Dùng giấy mềm lau sạch keo cũ; (2) Vệ sinh quạt gió (giữ cánh quạt khi xịt); (3) Tra 1 giọt keo mới bằng HẠT ĐẬU XANH; (4) Khóa chốt tản nhiệt đối xứng 4 góc nghe cọc cọc chắc chắn; (5) Cắm chặt dây CPU_FAN.',
          tools: ['Tuýp keo tản nhiệt MX-4 xịn', 'Khăn giấy mềm / cồn lau', 'Bóng xịt bụi'],
          safetyWarning: 'BƠM ĐÚNG 1 GIỌT HẠT ĐẬU XANH vào chính giữa! Tra quá nhiều keo sẽ tràn ra chân socket gây chập mạch.',
          pokaYoke: 'Nghiệm thu sau khi tra keo: Nhiệt độ chế độ nghỉ phải < 45°C và khi chạy video phải < 75°C!',
        },
      },
      {
        label: 'Chốt gài tản nhiệt Intel bị gãy chân nhựa, tản nhiệt bị hở',
        icon: '✗',
        isSolution: true,
        solution: {
          rootCause: 'Chốt nhựa tản nhiệt zin Intel bị lão hóa gãy lẫy ngầm, đế nhôm không tiếp xúc ép chặt vào bề mặt CPU.',
          action: 'Thay bộ gông tản nhiệt bắt ốc vít bằng thép có backplate phía sau, hoặc thay tản nhiệt tháp khí mới (Cr-1000 / T400i) để tản nhiệt mát mẻ vĩnh viễn.',
          tools: ['Bộ tản nhiệt tháp khí mới kèm backplate'],
          pokaYoke: 'Tản nhiệt không ép chặt vào CPU thì dù tra keo xịn máy vẫn nóng 100°C trong 10 giây!',
        },
      },
    ],
  },

  // ==========================================================================
  // CA 5: MÁY IN VĂN PHÒNG KHÔNG IN ĐƯỢC
  // ==========================================================================
  'step_print_01': {
    id: 'step_print_01',
    caseCode: 'CA-05',
    caseName: 'Máy in văn phòng KHÔNG IN ĐƯỢC',
    question: '1. Kiểm tra 3 điểm vật lý cơ bản của máy in:',
    instruction: 'Kiểm tra: (1) Đèn nguồn máy in có sáng xanh không? (2) Khay giấy có giấy sạch và không bị kẹt không? (3) Cáp USB nối máy in có cắm chắc chắn vào cổng USB sau lưng máy tính không?',
    options: [
      {
        label: 'Đèn nguồn tắt ngấm hoặc cáp USB bị lỏng / tuột',
        icon: '🔌',
        isSolution: true,
        solution: {
          rootCause: 'Mất kết nối vật lý cơ bản giữa máy in và máy tính.',
          action: 'Cắm chặt dây nguồn máy in và bật công tắc. Cắm cáp USB máy in vào cổng USB phía sau thùng máy (cổng sau nối trực tiếp bo mạch chủ, tín hiệu ổn định hơn cổng trước).',
          tools: ['Cáp USB máy in chuẩn B', 'Giấy in A4'],
          pokaYoke: 'Luôn cắm máy in vào cổng USB sau lưng máy tính để tránh sụt áp tín hiệu.',
        },
      },
      {
        label: 'Đèn máy in xanh tốt, cáp cắm rất chắc chắn nhưng VẪN KHÔNG IN',
        icon: '✓',
        nextNodeId: 'step_print_02',
      },
    ],
  },
  'step_print_02': {
    id: 'step_print_02',
    caseCode: 'CA-05',
    caseName: 'Máy in văn phòng KHÔNG IN ĐƯỢC',
    question: '2. Kiểm tra hàng đợi in (Print Queue) và dịch vụ Print Spooler:',
    instruction: 'Vào Windows Settings -> Printers & Scanners -> Nhấp vào máy in -> Chọn "Open queue". Có thấy nhiều lệnh in cũ bị đơ báo chữ "Error - Printing" không?',
    options: [
      {
        label: 'Có lệnh in cũ bị kẹt xếp hàng dài khiến các lệnh in sau bị nghẽn',
        icon: '⚠️',
        isSolution: true,
        solution: {
          rootCause: 'Kẹt hàng đợi in (Print Spooler Hang)! 90% sự cố máy in văn phòng là do một lệnh in trước đó bị lỗi file/hết giấy, hệ điều hành giữ lệnh lại và chặn đứng mọi lệnh in sau đó.',
          action: 'Quy trình xử lý 3 cú click: (1) Trong hàng đợi in: Bấm menu "Printer" -> chọn "Cancel All Documents" để xóa sạch lệnh kẹt; (2) Nhấn Win + R gõ "services.msc" -> Tìm dịch vụ "Print Spooler" -> Nhấp chuột phải chọn "Restart"; (3) Bấm "Print a test page" để kiểm tra kết quả!',
          tools: ['Trình quản lý Windows Services (services.msc)'],
          pokaYoke: 'Xóa hàng đợi và Restart dịch vụ Print Spooler là tuyệt chiêu giải cứu máy in văn phòng trong 30 giây!',
        },
      },
      {
        label: 'Hàng đợi trống không nhưng máy in vẫn không phản hồi',
        icon: '✗',
        isSolution: true,
        solution: {
          rootCause: 'Chưa đặt máy in làm mặc định (Default Printer), hoặc Driver máy in bị lỗi sau khi Windows cập nhật.',
          action: 'Trong Printers & Scanners: Bấm "Set as default" (có dấu tích xanh). Nếu vẫn không in: Tải driver chính thức từ trang chủ (Canon LBP 2900 / HP) và cài đặt lại.',
          tools: ['Bộ cài Driver máy in chính thức'],
          pokaYoke: 'Đảm bảo máy in có dấu tích xanh "Set as default" để phần mềm tự chọn đúng máy in khi nhấn Ctrl + P.',
        },
      },
    ],
  },
};
