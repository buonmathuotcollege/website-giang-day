// ============================================================================
// NGÂN HÀNG ĐỀ THI & CÂU HỎI THỰC CHIẾN NĂNG LỰC NGHỀ PHẦN CỨNG (OL-01)
// Biên soạn: CN. Phạm Tiến Đồng - Trường Cao đẳng Buôn Ma Thuột
// Theo chuẩn Thông tư 55/2026/TT-BGDĐT
// ============================================================================

export interface OralQuestion {
  id: string;
  category: string;
  question: string;
  teacherIntent: string; // Ý đồ của Thầy khi hỏi câu này
  standardAnswer: string; // Câu trả lời chuẩn của thợ lành nghề
  criticalKeywords: string[]; // Các từ khóa bắt buộc phải có
}

export interface PracticalScenario {
  id: string;
  category: 'lap-rap' | 'cai-win' | 'bat-benh' | 'ngoai-vi';
  title: string;
  situation: string; // Tình huống thực tế xảy ra tại xưởng/văn phòng
  trap: string; // Cái bẫy mà thợ non tay hay mắc phải
  correctHandling: string; // Cách xử lý chuẩn xác
  toolNeeded: string; // Dụng cụ / phần mềm cần dùng
}

export interface PracticalMCQ {
  id: string;
  category: 'an-toan' | 'lap-rap' | 'bat-benh' | 'cai-win' | 'ngoai-vi';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// ----------------------------------------------------------------------------
// 1. NGÂN HÀNG CÂU HỎI VẤN ĐÁP TẠI BÀN MÁY (20 CÂU HỎI KINH ĐIỂN CỦA THẦY ĐỒNG)
// ----------------------------------------------------------------------------
export const ORAL_QUESTIONS: OralQuestion[] = [
  {
    id: 'oral_01',
    category: 'An toàn kỹ thuật',
    question: 'Tại sao khi dùng bóng thổi hoặc máy xịt bụi quạt CPU, em bắt buộc phải dùng ngón tay giữ đứng cánh quạt?',
    teacherIntent: 'Kiểm tra xem học sinh có hiểu bản chất vật lý của mô tơ quạt và bảo vệ bo mạch chủ hay không.',
    standardAnswer: 'Vì 2 lý do: (1) Tránh quạt quay vượt tốc độ thiết kế làm mòn hoặc vỡ bạc đạn; (2) Quan trọng nhất là mô tơ quạt khi bị ép quay ngoài sẽ biến thành một máy phát điện mini, phát dòng điện ngược (hiện tượng cảm ứng điện từ) theo dây CPU_FAN truyền ngược vào bo mạch chủ, có thể làm chết IC điều khiển quạt hoặc cháy linh kiện bán dẫn trên mainboard.',
    criticalKeywords: ['máy phát điện', 'dòng điện ngược', 'chết IC', 'hỏng bạc đạn'],
  },
  {
    id: 'oral_02',
    category: 'Thao tác lắp ráp',
    question: 'Tại sao khi cắm thanh RAM, em phải ấn đều hai đầu cho đến khi nghe hai tiếng "TÁCH" sập tai nhựa?',
    teacherIntent: 'Kiểm tra cảm giác tay và kỹ năng thao tác cơ học của học sinh.',
    standardAnswer: 'Hai tiếng "tách" là tín hiệu hai ngàm khóa nhựa ở hai đầu khe cắm tự động sập vào khớp với hai rãnh khuyết ở mép thanh RAM. Điều này đảm bảo toàn bộ hàng trăm chân mạ vàng của RAM đã cắm sâu ngập và tiếp xúc đồng đều trong khe, không bị kênh lệch hay lỏng lẻo gây chập chờn màn hình đen.',
    criticalKeywords: ['hai ngàm khóa', 'sập khớp rãnh khuyết', 'tiếp xúc đồng đều', 'không bị kênh'],
  },
  {
    id: 'oral_03',
    category: 'Cài đặt hệ điều hành',
    question: 'Khi ở màn hình chọn phân vùng cài Windows, tại sao em không được tin vào ký tự ổ đĩa (C, D) mà bắt buộc phải nhìn vào số GB dung lượng?',
    teacherIntent: 'Đo lường sự cẩn trọng, bảo vệ dữ liệu khách hàng theo Luật Giữ nồi cơm.',
    standardAnswer: 'Vì trong môi trường nạp bộ cài Windows (Windows Setup / WinPE), hệ thống gán ký tự ổ đĩa theo thứ tự nhận diện phân vùng vật lý, không hề giống với ký tự C, D mà khách hàng nhìn thấy trong Windows trước đó. Ổ dữ liệu D của khách hoàn toàn có thể bị gán tạm thành C:. Chỉ có số dung lượng GB (ví dụ: ổ C 120GB, ổ D 380GB) là bất di bất dịch, không bao giờ thay đổi.',
    criticalKeywords: ['ký tự C D bị tráo', 'môi trường WinPE', 'số GB dung lượng cố định', 'không format nhầm'],
  },
  {
    id: 'oral_04',
    category: 'Chẩn đoán sự cố',
    question: 'Tại sao cục gôm tẩy học sinh màu trắng lại được coi là "thần dược" cứu máy tính bị quạt quay nhưng màn hình đen?',
    teacherIntent: 'Hiểu bản chất hóa lý của sự oxy hóa bề mặt kim loại tiếp xúc.',
    standardAnswer: 'Trong môi trường nhiệt đới nóng ẩm và bụi bặm, các chân tiếp xúc mạ vàng (gold fingers) của thanh RAM sau một thời gian sẽ bị một lớp màng oxit và bụi ẩm phủ lên, tạo điện trở cách điện khiến RAM không truyền được tín hiệu dữ liệu lên bo mạch. Cục gôm tẩy có độ nhám ma sát vừa đủ để đánh bay lớp oxit và bụi bẩn mà hoàn toàn không làm xước hay bong tróc lớp mạ vàng dẫn điện như giấy ráp hay dao cạo.',
    criticalKeywords: ['lớp oxit', 'chân mạ vàng', 'cục tẩy có độ nhám vừa đủ', 'không làm xước lớp vàng'],
  },
  {
    id: 'oral_05',
    category: 'Chẩn đoán sự cố',
    question: 'Nếu máy tính cứ mỗi lần rút dây nguồn ra cắm lại là bị sai ngày giờ về năm 2009/2015 và bắt bấm F1, nguyên nhân do đâu và em xử lý thế nào?',
    teacherIntent: 'Nhận biết chức năng của viên pin CMOS và chip lưu cấu hình BIOS.',
    standardAnswer: 'Nguyên nhân do viên pin CMOS CR2032 (3V) trên bo mạch chủ đã cạn kiệt điện tích (điện áp tụt dưới 2.8V), khiến chip nhớ CMOS không còn nguồn nuôi để duy trì thời gian thực và các thiết lập BIOS khi mất nguồn chính. Cách xử lý: Dùng tua-vít dẹp gạt nhẹ chốt lấy pin cũ ra, thay viên pin CR2032 3V mới (mặt chữ + hướng lên trên), bật máy vào BIOS chỉnh lại ngày giờ hiện tại, ấn F10 để lưu lại cấu hình.',
    criticalKeywords: ['pin CMOS CR2032', 'cạn điện', 'dưới 2.8V', 'F10 lưu BIOS'],
  },
  {
    id: 'oral_06',
    category: 'Lắp ráp nâng cấp',
    question: 'Tại sao sau khi cắm ổ SSD SATA mới vào máy, bật máy vào Win mở My Computer (This PC) lại không thấy ổ đĩa đâu?',
    teacherIntent: 'Nắm vững quy trình quản lý ổ đĩa Disk Management trong Windows.',
    standardAnswer: 'Vì ổ SSD mới xuất xưởng từ nhà máy là ổ đĩa nguyên bản (RAW / Unallocated), chưa được khởi tạo bảng phân vùng (MBR/GPT) và chưa được định dạng hệ thống tập tin (File System NTFS). Windows Explorer chỉ hiển thị những phân vùng đã được format có gán ký tự. Người thợ phải mở Disk Management (diskmgmt.msc), khởi tạo GPT và tạo phân vùng New Simple Volume format NTFS thì ổ mới xuất hiện.',
    criticalKeywords: ['ổ mới xuất xưởng', 'chưa phân vùng', 'Disk Management', 'Initialize GPT', 'New Simple Volume'],
  },
  {
    id: 'oral_07',
    category: 'Bảo trì & Tản nhiệt',
    question: 'Tại sao khi tra keo tản nhiệt cho CPU, em chỉ được tra một giọt nhỏ bằng "hạt đậu xanh" ở chính giữa chứ không được trét đầy lưng CPU?',
    teacherIntent: 'Hiểu nguyên lý truyền dẫn nhiệt cơ bản.',
    standardAnswer: 'Keo tản nhiệt có chức năng lấp đầy các khoảng trống siêu vi (bọt khí) giữa mặt kim loại của CPU và đế tản nhiệt, vì không khí dẫn nhiệt rất kém. Bản thân keo tản nhiệt dẫn nhiệt kém hơn kim loại đồng/nhôm rất nhiều. Nếu tra quá nhiều, keo bị ép tràn ra ngoài bo mạch vào chân socket gây chập cháy, hoặc tạo thành một lớp đệm dày giữ nhiệt lại, làm CPU nóng hơn bình thường.',
    criticalKeywords: ['hạt đậu xanh', 'lấp khoảng trống siêu vi', 'tràn ra chân socket', 'lớp đệm dày giữ nhiệt'],
  },
  {
    id: 'oral_08',
    category: 'Nghiệm thu bàn giao',
    question: 'Em hãy nêu 5 điểm bắt buộc phải nghiệm thu trước khi giao trả máy cho khách hoặc nộp bài thi?',
    teacherIntent: 'Rèn luyện tác phong công nghiệp và trách nhiệm người thợ.',
    standardAnswer: 'Nghiệm thu 5 điểm vàng: (1) Nắp thùng máy đóng khít vặn đủ ốc, quạt quay êm ái; (2) Đo HWMonitor nhiệt độ CPU ổn định dưới 75°C khi tải; (3) Dữ liệu khách hàng đã chép trả lại Desktop/Documents đầy đủ 100%, mở đọc bình thường; (4) Device Manager sạch bóng 100% dấu chấm than vàng, gõ được tiếng Việt UniKey; (5) Bàn kỹ thuật lau dọn sạch sẽ, thu cất dụng cụ và ký đủ phiếu dịch vụ A-Z.',
    criticalKeywords: ['quạt êm', 'nhiệt độ CPU < 75°C', 'dữ liệu đủ 100%', 'sạch chấm than', 'bàn thợ sạch sẽ'],
  },
  {
    id: 'oral_09',
    category: 'Ngoại vi & Máy in',
    question: 'Làm thế nào để phân biệt máy in văn phòng bị kẹt lệnh in phần mềm hay bị hỏng cơ học phần cứng?',
    teacherIntent: 'Kỹ năng cô lập sự cố máy in văn phòng nhanh trong 60 giây.',
    standardAnswer: 'Nhìn vào đèn báo và hàng đợi in: Nếu máy in báo đèn cam/đỏ nhấp nháy hoặc phát ra tiếng kêu cạch cạch liên tục -> Lỗi phần cứng (hết giấy, kẹt giấy, kẹt cụm sấy, lẫy hộp mực). Nếu đèn máy in vẫn sáng xanh đứng yên nhưng bấm lệnh in không chạy -> 95% là kẹt lệnh in phần mềm trong Print Spooler (vào Devices and Printers nhấp đúp máy in xem có tài liệu đang bị kẹt chữ Error/Deleting hay không).',
    criticalKeywords: ['đèn xanh đứng yên', 'kẹt lệnh Print Spooler', 'Cancel All Documents', 'đèn cam nhấp nháy lỗi cơ'],
  },
  {
    id: 'oral_10',
    category: 'Lắp ráp phần cứng',
    question: 'Khi lắp ráp bo mạch chủ vào thùng máy, nếu quên vặn các ốc chân đồng đệm (standoff) thì hậu quả gì sẽ xảy ra?',
    teacherIntent: 'Hiểu nguy cơ chập mass bo mạch chủ khi tiếp xúc vỏ kim loại.',
    standardAnswer: 'Các ốc chân đồng (standoff) có nhiệm vụ nâng bo mạch chủ cách ly khỏi bề mặt kim loại của thùng máy. Nếu không lắp chân đồng mà vặn thẳng mainboard vào thùng, hàng trăm mối hàn chì ở mặt sau bo mạch chủ sẽ chạm trực tiếp vào thành kim loại gây đoản mạch (chập mass toàn bộ). Khi cắm điện bật máy, nguồn PSU sẽ tự ngắt ngay lập tức hoặc làm nổ linh kiện, chết bo mạch vĩnh viễn.',
    criticalKeywords: ['ốc chân đồng standoff', 'cách ly vỏ máy', 'chập mass', 'đoản mạch', 'chết bo mạch'],
  },
  {
    id: 'oral_11',
    category: 'Cứu dữ liệu',
    question: 'Tại sao trong quy trình cứu dữ liệu khách hàng, người thợ tuyệt đối không được dùng lệnh CUT mà bắt buộc phải dùng lệnh COPY?',
    teacherIntent: 'Khắc sâu nguyên tắc an toàn dữ liệu số 1 của người làm nghề.',
    standardAnswer: 'Vì khi dùng lệnh CUT, hệ điều hành sẽ đánh dấu xóa tệp ở nguồn ngay khi ghi vào đích. Nếu đang trong quá trình chuyển file mà xảy ra sự cố đột ngột như cúp điện, sập nguồn, tuột cáp USB hoặc treo máy, tệp gốc đã bị cắt sẽ bị biến mất vĩnh viễn không thể khôi phục. Khi dùng lệnh COPY, tệp gốc luôn được giữ nguyên vẹn 100% cho đến khi ta kiểm tra đối chiếu bên đích thành công.',
    criticalKeywords: ['lệnh CUT', 'cúp điện treo máy', 'mất file gốc', 'lệnh COPY bảo toàn dữ liệu'],
  },
  {
    id: 'oral_12',
    category: 'Lắp ráp & Nguồn',
    question: 'Dây nguồn CPU 4 hoặc 8 chân có thể cắm nhầm vào khe cắm nguồn phụ của Card đồ họa PCI-Express 6/8 chân được không? Tại sao?',
    teacherIntent: 'Hiểu sơ đồ rãnh khuyết của các đầu cắm nguồn ATX.',
    standardAnswer: 'Không thể cắm nhầm được nếu không dùng bạo lực! Dù cùng có dạng 8 chân, nhưng nhà sản xuất đã làm các rãnh khuyết hình vuông và hình vát góc hoàn toàn khác nhau. Dây CPU 8 chân (thường tách đôi 4+4) có sơ đồ chân dương (+12V) và chân mass (GND) đảo ngược so với dây PCIe 8 chân (tách 6+2). Nếu dùng bạo lực ép cắm vào sẽ gây nổ nguồn và cháy mạch cấp nguồn ngay lập tức.',
    criticalKeywords: ['rãnh khuyết khác nhau', 'CPU 4+4', 'PCIe 6+2', 'đảo chân cực tính', 'không dùng bạo lực'],
  },
  {
    id: 'oral_13',
    category: 'Cài đặt Windows',
    question: 'Tại sao khi cài đặt Windows 10/11, ta nên tạo tài khoản người dùng Local Account với tên không có dấu tiếng Việt (ví dụ: Admin, User thay vì Nguyễn Văn A)?',
    teacherIntent: 'Hiểu cấu trúc đường dẫn thư mục User Profile trong Windows.',
    standardAnswer: 'Nếu đặt tên User bằng tiếng Việt có dấu, Windows sẽ tạo thư mục người dùng dạng `C:\\Users\\Nguyễn Văn A`. Rất nhiều phần mềm kỹ thuật, bộ công cụ lập trình, máy chủ ảo và trò chơi không hỗ trợ bảng mã Unicode trong đường dẫn tệp tin, dẫn đến lỗi không mở được phần mềm, crash ứng dụng hoặc không lưu được dữ liệu cấu hình.',
    criticalKeywords: ['đường dẫn User Profile', 'tiếng Việt có dấu', 'lỗi Unicode', 'crash phần mềm'],
  },
  {
    id: 'oral_14',
    category: 'Chẩn đoán sự cố',
    question: 'Cụm dây Front Panel trên mainboard gồm những dây nào, và dây nào bắt buộc phải cắm đúng cực tính âm dương (+/-)?',
    teacherIntent: 'Nắm vững kỹ thuật đấu dây công tắc và đèn LED mặt trước thùng máy.',
    standardAnswer: 'Cụm F_PANEL gồm 4 cặp dây: POWER SW (nút nguồn), RESET SW (nút khởi động lại), HDD LED (đèn ổ cứng) và POWER LED (đèn nguồn). Trong đó: POWER SW và RESET SW là công tắc tiếp điểm tức thời (momentary switch), cắm chiều nào cũng hoạt động bình thường, không phân biệt cực tính. Còn các dây LED (HDD LED, POWER LED) là đi-ốt phát quang, bắt buộc phải cắm đúng cực dương (+) vào chân dương và cực âm (-) vào chân âm thì đèn mới sáng.',
    criticalKeywords: ['POWER SW không phân biệt cực', 'HDD LED bắt buộc đúng cực tính', 'đi-ốt phát quang'],
  },
  {
    id: 'oral_15',
    category: 'Cài đặt Windows',
    question: 'Múi giờ chuẩn của Việt Nam trên hệ điều hành Windows là gì? Nếu để sai múi giờ thì máy tính sẽ bị lỗi gì khi lướt web?',
    teacherIntent: 'Kỹ năng thiết lập hệ thống và nhận diện lỗi chứng chỉ số SSL.',
    standardAnswer: 'Múi giờ chuẩn của Việt Nam là `(UTC+07:00) Bangkok, Hanoi, Jakarta`. Nếu để sai múi giờ hoặc sai ngày giờ hệ thống, trình duyệt web (Chrome, Edge) sẽ báo lỗi chứng chỉ bảo mật SSL/TLS ("Your connection is not private" / "Đồng hồ của bạn bị chậm"), chặn toàn bộ các trang web sử dụng giao thức HTTPS như Google, YouTube, Facebook hoặc cổng thông tin của trường.',
    criticalKeywords: ['UTC+07:00 Bangkok Hanoi Jakarta', 'lỗi SSL TLS', 'chặn web HTTPS'],
  },
  {
    id: 'oral_16',
    category: 'Lắp ráp & Nâng cấp',
    question: 'Làm thế nào để biết thanh RAM đang cầm trên tay là chuẩn DDR3, DDR4 hay DDR5 nếu tem thông số bị mờ?',
    teacherIntent: 'Nhận diện linh kiện bằng mắt thường qua vị trí rãnh khuyết vật lý.',
    standardAnswer: 'Dựa vào vị trí rãnh khuyết (notch) ở hàng chân mạ vàng: (1) DDR3: Rãnh khuyết nằm lệch hẳn về một phía (gần một đầu thanh RAM); (2) DDR4: Rãnh khuyết nằm gần chính giữa hơn và mép chân tiếp xúc hơi cong vồng lên ở giữa thay vì phẳng lì; (3) DDR5: Rãnh khuyết nằm gần sát tâm điểm giữa thanh và có chip quản lý nguồn (PMIC) gắn trực tiếp trên thanh RAM.',
    criticalKeywords: ['vị trí rãnh khuyết notch', 'DDR3 lệch nhiều', 'DDR4 cong vồng', 'DDR5 gần tâm'],
  },
  {
    id: 'oral_17',
    category: 'Bắt bệnh sự cố',
    question: 'Khi cắm máy tính vào màn hình, có những trường hợp nào cắm cáp màn hình (HDMI/VGA) đúng dây mà màn hình vẫn không lên hình?',
    teacherIntent: 'Bẫy kinh điển: Cắm nhầm cổng xuất hình trên Mainboard khi máy có Card đồ họa rời.',
    standardAnswer: 'Trường hợp hay gặp nhất là máy tính có lắp Card màn hình rời (VGA), nhưng học sinh lại cắm nhầm dây cáp màn hình vào cổng xuất hình tích hợp trên bo mạch chủ (Mainboard). Khi có card rời, bo mạch chủ sẽ tự động vô hiệu hóa cổng xuất hình onboard, dẫn đến màn hình báo No Signal. Cách xử lý: Rút dây và cắm xuống đúng cổng của Card màn hình rời ở bên dưới.',
    criticalKeywords: ['cắm nhầm cổng mainboard', 'có card đồ họa rời', 'onboard bị vô hiệu hóa', 'cắm xuống card rời'],
  },
  {
    id: 'oral_18',
    category: 'Cài đặt hệ điều hành',
    question: 'Tại sao sau khi bộ cài Windows sao chép xong tệp và máy tính tự khởi động lại lần đầu tiên, em phải rút ngay USB cài Win ra?',
    teacherIntent: 'Tránh vòng lặp khởi động lại bộ cài Windows (Installation Loop).',
    standardAnswer: 'Vì nếu thứ tự khởi động (Boot Priority) trong BIOS đang đặt USB ở vị trí số 1, khi máy khởi động lại nó sẽ tiếp tục nạp lại bộ cài trên USB từ đầu, dẫn đến vòng lặp cài đặt vô tận. Khi rút USB ra, máy tính sẽ tự động nạp phân vùng khởi động của ổ cứng (Windows Boot Manager) để tiếp tục hoàn thiện quá trình thiết lập cấu hình.',
    criticalKeywords: ['vòng lặp cài đặt', 'Boot Priority', 'nạp lại USB từ đầu', 'boot vào ổ cứng'],
  },
  {
    id: 'oral_19',
    category: 'Ngoại vi & Máy in',
    question: 'Dấu tích tròn màu xanh lá cây trên biểu tượng máy in trong mục Devices and Printers có ý nghĩa gì?',
    teacherIntent: 'Hiểu khái niệm Default Printer (Máy in mặc định).',
    standardAnswer: 'Dấu tích xanh có nghĩa máy in đó đang được thiết lập là "Máy in mặc định" (Default Printer). Mọi ứng dụng văn phòng (Word, Excel, trình duyệt, PDF) khi người dùng bấm phím tắt Ctrl+P sẽ tự động gửi lệnh in trực tiếp đến máy in này mà không cần người dùng phải bấm chọn lại trong danh sách.',
    criticalKeywords: ['Set as default printer', 'máy in mặc định', 'Ctrl+P tự động in'],
  },
  {
    id: 'oral_20',
    category: 'An toàn nghề nghiệp',
    question: 'Em hãy đọc to và giải thích ý nghĩa của 3 Luật Sống Còn của nghề kỹ thuật viên máy tính?',
    teacherIntent: 'Khắc cốt ghi tâm đạo đức và kỷ luật nghề nghiệp.',
    standardAnswer: '3 Luật sống còn: (1) LUẬT 1: RÚT — BẤM — KHAY: Rút phích điện, bấm nút nguồn 3 lần xả điện tích tụ trong tụ, tháo ốc bỏ ngay vào khay để không làm chập cháy và rơi mất ốc. (2) LUẬT 2: GIỮ NỒI CƠM CỦA KHÁCH: Dữ liệu của khách là quan trọng nhất, chưa sao lưu và đối chiếu khớp 100% thì tuyệt đối không mở máy sửa chữa hay format. (3) LUẬT 3: KHÔNG BAO GIỜ ÉP KHI CẮM: Máy tính như bộ Lego có rãnh khuyết, cắm đúng thì ấn nhẹ là vào, thấy cấn tay là xoay lại, không dùng bạo lực.',
    criticalKeywords: ['Rút - Bấm - Khay', 'Giữ nồi cơm', 'Không ép khi cắm', 'rãnh khuyết Lego'],
  },
];

// ----------------------------------------------------------------------------
// 2. NGÂN HÀNG TÌNH HUỐNG THỰC HÀNH LẮP RÁP MÁY TÍNH THIẾT THỰC (6 TÌNH HUỐNG)
// ----------------------------------------------------------------------------
export const ASSEMBLY_SCENARIOS: PracticalScenario[] = [
  {
    id: 'asm_scen_01',
    category: 'lap-rap',
    title: 'Bẫy ốc chân đồng cách điện (Standoff) làm chập mass thùng máy',
    situation: 'Học sinh lắp xong bộ máy tính để bàn mới, cắm nguồn bật thử thì quạt nguồn chỉ nhích nhẹ 1 vòng rồi tắt lịm, sau đó bấm nút nguồn không còn phản ứng gì.',
    trap: 'Thợ non tay thường bắt vít trực tiếp bo mạch chủ vào tấm tôn của vỏ case mà quên gắn các ốc đệm chân đồng cách điện (standoff), hoặc để sót một ốc standoff thừa ở vị trí không có lỗ bắt ốc trên mainboard.',
    correctHandling: 'Rút điện xả tụ ngay lập tức! Tháo bo mạch chủ ra khỏi thùng máy, kiểm tra mặt sau tấm tôn case. Chỉ gắn các ốc standoff bằng đồng đúng vị trí các lỗ bắt ốc có vòng đệm chì trên mainboard. Lắp lại bo mạch chủ và siết ốc vừa tay.',
    toolNeeded: 'Tua-vít 4 cạnh có từ tính, kìm mũi nhọn hoặc đầu vặn lục giác để siết ốc standoff.',
  },
  {
    id: 'asm_scen_02',
    category: 'lap-rap',
    title: 'Quên cắm dây nguồn phụ CPU 4/8 chân nuôi nguồn vi xử lý',
    situation: 'Lắp ráp xong thùng máy, cắm nguồn bật máy thấy đèn thùng máy sáng, quạt CPU và quạt nguồn quay vù vù nhưng màn hình đen thui, không nghe tiếng Bíp POST khởi động.',
    trap: 'Học sinh chỉ nhớ cắm sợi dây nguồn 24 chân dài nhất cho bo mạch chủ, mà quên mất sợi dây nguồn 4 chân hoặc 8 chân nằm ở góc khuất phía trên gần socket CPU.',
    correctHandling: 'Rút phích điện xả tụ. Tìm chùm dây từ bộ nguồn có ghi chữ "CPU" (hoặc bó 4+4 chân). Soi đúng chiều rãnh khuyết và cắm chặt vào khe cấp nguồn CPU ở góc trên bo mạch chủ đến khi nghe tiếng tách.',
    toolNeeded: 'Đèn pin soi góc khuất, dây rút để bó gọn dây.',
  },
  {
    id: 'asm_scen_03',
    category: 'lap-rap',
    title: 'Bẫy cắm nhầm cực tính cụm Front Panel (Nút nguồn & Đèn LED)',
    situation: 'Sau khi lắp ráp hoàn thiện, cắm điện bật nguồn không được, hoặc bấm nút Power máy không chạy nhưng bấm nút Reset thì máy lại bật; đèn ổ cứng sáng liên tục không nhấp nháy.',
    trap: 'Cụm cọc F_PANEL có 9 chân nhỏ xíu nằm sát góc dưới mainboard, học sinh cắm mò không nhìn sơ đồ in trên bo mạch, cắm lộn giữa POWER SW và RESET SW, hoặc cắm ngược chân âm dương của HDD LED.',
    correctHandling: 'Lấy đèn pin soi chữ in lụa trên mainboard (hoặc xem bảng tra cứu): Chân 6-8 thường là POWER SW, chân 5-7 là RESET SW (cắm không phân biệt chiều). Chân 1-3 là HDD LED, chân 2-4 là POWER LED (phải cắm dây có màu/dấu cộng vào cọc dương +). Dùng đầu tua-vít dẹp chập thử 2 cọc Power SW để thử kích nguồn trực tiếp.',
    toolNeeded: 'Đèn pin nhỏ, tua-vít dẹp nhỏ kích nguồn.',
  },
  {
    id: 'asm_scen_04',
    category: 'lap-rap',
    title: 'Quên tháo miếng nilon trong suốt dưới đế tản nhiệt CPU',
    situation: 'Máy tính mới lắp chạy vào Windows được đúng 2 phút là quạt gầm rú dữ dội rồi máy tự ngắt nguồn đột ngột. Bật lại vào BIOS thấy nhiệt độ CPU báo đỏ rực ở mức 95°C - 100°C.',
    trap: 'Quạt tản nhiệt CPU mới mua nguyên hộp ở mặt đế đồng tiếp xúc luôn có dán một miếng nilon bảo vệ trong suốt có dòng chữ nhỏ "WARNING: PLEASE PEEL OFF BEFORE USE". Học sinh ẩu tra keo đè lên miếng nilon rồi gắn luôn tản nhiệt.',
    correctHandling: 'Rút điện, tháo tản nhiệt CPU ra. Bóc bỏ hoàn toàn miếng dán nilon dưới đế tản nhiệt. Dùng khăn giấy lau sạch toàn bộ lớp keo cũ đã dính nilon. Bơm lại 1 giọt keo tản nhiệt hạt đậu xanh mới vào giữa lưng CPU và gắn lại tản nhiệt.',
    toolNeeded: 'Khăn giấy lau keo, keo tản nhiệt hạt đậu xanh mới.',
  },
  {
    id: 'asm_scen_05',
    category: 'lap-rap',
    title: 'Cắm RAM bị kênh 1 đầu (Chỉ sập 1 tai khóa nhựa)',
    situation: 'Lắp thêm 1 thanh RAM nâng cấp cho máy, khi bật máy quạt quay nhưng màn hình không lên, hoặc máy nhận thiếu dung lượng RAM (chỉ nhận thanh cũ, không nhận thanh mới).',
    trap: 'Học sinh chỉ dùng một ngón tay ấn mạnh vào một bên đầu thanh RAM, khiến tai khóa bên đó sập lại còn đầu kia vẫn bị kênh nhô lên khỏi khe cắm vài milimet.',
    correctHandling: 'Rút điện xả tụ. Mở cả 2 tai khóa nhựa của khe RAM. Đặt thanh RAM cân bằng vào rãnh, đặt 2 ngón tay cái vào 2 đầu mép trên thanh RAM và ấn mạnh đồng thời cùng một lúc với lực đều nhau cho đến khi nghe thấy tiếng "TÁCH" ở cả 2 đầu.',
    toolNeeded: 'Cục gôm tẩy vệ sinh chân RAM trước khi cắm.',
  },
  {
    id: 'asm_scen_06',
    category: 'lap-rap',
    title: 'Cắm cáp SATA dữ liệu vào cổng SATA tốc độ chậm hoặc cổng điều khiển phụ',
    situation: 'Lắp ổ SSD SATA mới cho máy nhưng khi đo tốc độ bằng CrystalDiskMark thì tốc độ đọc chỉ đạt khoảng 250 MB/s (trong khi thông số chuẩn của SSD SATA 3 là 550 MB/s).',
    trap: 'Trên bo mạch chủ đời cũ thường có cả cổng SATA 2 (3 Gbps - màu đen) và cổng SATA 3 (6 Gbps - màu xanh/xám). Học sinh cắm ngẫu nhiên vào cổng SATA 2 làm nghẽn băng thông tốc độ của ổ SSD.',
    correctHandling: 'Rút điện, kiểm tra ký hiệu in cạnh các cổng SATA trên bo mạch chủ. Rút cáp dữ liệu SATA của ổ SSD chuyển sang cắm vào cổng có ký hiệu `SATA 6Gb/s` hoặc `SATA3_0` (cổng số 0 do chipset cầu nam quản lý trực tiếp) để đạt hiệu năng tối đa.',
    toolNeeded: 'Cáp tín hiệu SATA 3 chuẩn 6Gb/s có lẫy kim loại chống tuột.',
  },
];

// ----------------------------------------------------------------------------
// 3. NGÂN HÀNG TÌNH HUỐNG THỰC HÀNH CÀI WINDOWS THIẾT THỰC (6 TÌNH HUỐNG)
// ----------------------------------------------------------------------------
export const WINDOWS_INSTALL_SCENARIOS: PracticalScenario[] = [
  {
    id: 'win_scen_01',
    category: 'cai-win',
    title: 'Bẫy format nhầm ổ D dữ liệu khách hàng do ký tự ổ đĩa bị tráo đổi',
    situation: 'Khách mang máy đến cài lại Windows yêu cầu giữ lại toàn bộ dữ liệu ở ổ D. Vào bộ cài Windows hiển thị: Partition 1: Drive C (380 GB) và Partition 2: Drive D (120 GB).',
    trap: 'Thợ non tay thấy ghi chữ Drive C liền bấm Format ngay mà không nhìn số GB, dẫn đến xóa sạch toàn bộ 380GB tài liệu dự án của khách hàng!',
    correctHandling: 'Áp dụng quy tắc vàng: "Nhìn số GB, không nhìn ký tự!". Đối chiếu với phiếu ghi ban đầu: Ổ C là 120GB, Ổ D là 380GB. Vậy phân vùng 120GB mới chính là ổ chứa hệ điều hành cũ cần cài lại. Chỉ format phân vùng 120GB, tuyệt đối không chạm vào phân vùng 380GB.',
    toolNeeded: 'Phiếu tiếp nhận máy đã ghi rõ số GB ở Bước 1.',
  },
  {
    id: 'win_scen_02',
    category: 'cai-win',
    title: 'Xung đột chuẩn khởi động: UEFI (GPT) vs Legacy (MBR)',
    situation: 'Khi chọn phân vùng cài Windows, trình cài đặt báo lỗi viền vàng: "Windows cannot be installed to this disk. The selected disk is of the GPT partition style".',
    trap: 'Máy tính của khách đang dùng ổ cứng định dạng chuẩn mới GPT (UEFI), nhưng học sinh lại tạo USB Boot hoặc chọn chế độ khởi động từ menu Boot ở chuẩn cũ Legacy/CSM.',
    correctHandling: 'Khởi động lại máy tính, bấm phím Boot Menu (F12/F11/F8), trong danh sách các thiết bị khởi động, chọn dòng có chữ tiền tố `UEFI: [Tên USB]` thay vì dòng USB thông thường. Bộ cài sẽ khởi động ở chế độ UEFI chuẩn và cài đặt trơn tru lên ổ đĩa GPT.',
    toolNeeded: 'USB cài Win chuẩn UEFI tích hợp đa năng.',
  },
  {
    id: 'win_scen_03',
    category: 'cai-win',
    title: 'Máy tính không nhận diện ổ SSD khi cài Windows do tính năng Intel VMD',
    situation: 'Cài đặt Windows 10/11 cho các dòng máy laptop/PC đời mới (Intel Core Gen 11, 12, 13, 14), khi đến bước chọn ổ đĩa thì màn hình trống trơn kèm thông báo "We couldn\'t find any drives".',
    trap: 'Học sinh hoảng hốt tưởng ổ cứng SSD bị cháy hoặc chết phần cứng nên vội vàng tháo máy kiểm tra.',
    correctHandling: 'Đây là tính năng Intel VMD (Volume Management Device / Intel RST) trên chip Intel thế hệ mới cần driver điều khiển. Có 2 cách xử lý: (1) Vào BIOS tìm mục VMD Setup Menu và chuyển sang `Disabled` -> F10 lưu lại; hoặc (2) Tải driver Intel RST giải nén vào USB, tại màn hình chọn ổ bấm `Load driver` trỏ vào thư mục driver là ổ SSD sẽ hiện ra ngay lập tức.',
    toolNeeded: 'USB cứu hộ có tích hợp driver Intel RST VMD.',
  },
  {
    id: 'win_scen_04',
    category: 'cai-win',
    title: 'Vòng lặp khởi động cài đặt (Installation Loop) do quên rút USB',
    situation: 'Bộ cài Windows chạy sao chép file từ 0% đến 100%, máy tính đếm ngược 10 giây tự khởi động lại. Khi máy bật lên, màn hình lại quay về màn hình đầu tiên "Install Now / Chọn ngôn ngữ" như lúc mới cắm USB.',
    trap: 'Học sinh tưởng máy bị lỗi cài đặt nên lại bấm Install Now cài đi cài lại 3-4 lần thành một vòng lặp vô tận.',
    correctHandling: 'Nắm vững quy tắc: "RÚT USB NGAY SAU LẦN RESTART ĐẦU TIÊN!". Khi màn hình máy tính vừa tắt phụt để khởi động lại, rút ngay USB ra khỏi máy. Máy tính sẽ tự động boot vào phân vùng Windows Boot Manager trên ổ cứng để tiếp tục giai đoạn cài đặt phần mềm và driver.',
    toolNeeded: 'Thao tác tay dứt khoát rút USB khi màn hình tắt.',
  },
  {
    id: 'win_scen_05',
    category: 'cai-win',
    title: 'Đặt tên tài khoản User bằng tiếng Việt có dấu làm crash phần mềm',
    situation: 'Cài Win xong đến bước đặt tên tài khoản người dùng (Who\'s going to use this PC?), học sinh gõ họ tên khách "Trần Quốc Bảo". Sau này khi cài phần mềm văn phòng, AutoCAD, Photoshop thì phần mềm báo lỗi không chạy được.',
    trap: 'Thư mục User Profile bị tạo thành `C:\\Users\\Trần Quốc Bảo`. Nhiều phần mềm chỉ hiểu bảng mã ANSI/ASCII, gặp ký tự tiếng Việt có dấu trong đường dẫn sẽ bị ngắt luồng thực thi.',
    correctHandling: 'Luôn đặt tên User là tiếng Việt KHÔNG DẤU hoặc tên chung (ví dụ: `Admin`, `User`, `BaoTran`, `VanPhong`). Nếu cần hiển thị tên đẹp trên màn hình khóa, sau khi vào Windows mới vào Settings đổi display name.',
    toolNeeded: 'Bàn phím, tài khoản Local Account.',
  },
  {
    id: 'win_scen_06',
    category: 'cai-win',
    title: 'Lỗi thiếu Driver Card Mạng (Network Controller) sau khi cài Win trắng',
    situation: 'Cài xong Windows vào màn hình Desktop nhưng biểu tượng mạng ở góc dưới báo quả cầu trái đất có gạch chéo đỏ, cắm dây mạng LAN hoặc bật Wifi đều không nhận diện được Internet.',
    trap: 'Học sinh không chuẩn bị sẵn bộ driver mạng offline, không có mạng để lên web tải driver nên bị tắc nghẽn toàn bộ quá trình hoàn thiện máy.',
    correctHandling: 'Người thợ chuyên nghiệp luôn có sẵn 1 thư mục chứa gói Driver mạng vạn năng (như WanDriver, EasyDriverPack hoặc 3DP Net) trong USB cứu hộ. Cắm USB vào máy, chạy 3DP Net để nạp driver mạng chỉ trong 30 giây. Khi có mạng Internet, Windows Update sẽ tự động tải các driver còn lại.',
    toolNeeded: 'USB tích hợp phần mềm 3DP Net / EasyDrv offline.',
  },
];

// ----------------------------------------------------------------------------
// 4. NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM THỰC CHIẾN (50 CÂU HỎI THEO 5 CHỦ ĐỀ NGHỀ)
// ----------------------------------------------------------------------------
export const MCQ_PRACTICAL_BANK: PracticalMCQ[] = [
  // CHỦ ĐỀ 1: AN TOÀN ĐIỆN & DỤNG CỤ THỢ (10 CÂU)
  {
    id: 'mcq_01',
    category: 'an-toan',
    question: 'Theo Luật 1 "RÚT — BẤM — KHAY", sau khi rút dây nguồn và gạt công tắc PSU sang O, kỹ thuật viên phải bấm nút Power ngoài vỏ thùng bao nhiêu lần để xả sạch điện tích trong tụ?',
    options: ['Bấm 1 lần thật nhanh', 'Bấm giữ nguyên 30 giây', 'Bấm nhấp nhả 3 lần dứt khoát', 'Không cần bấm vì rút điện là hết điện ngay'],
    correctIndex: 2,
    explanation: 'Bấm nút nguồn 3 lần để xả sạch lượng điện tích còn lưu giữ lại trong các tụ lọc nguồn của bộ nguồn và bo mạch chủ, tránh phóng tia lửa điện khi thò tay hoặc tua-vít vào linh kiện.',
  },
  {
    id: 'mcq_02',
    category: 'an-toan',
    question: 'Khi tháo mở các linh kiện máy tính, tại sao người thợ bắt buộc phải bỏ ngay các ốc vít vào KHAY phân loại?',
    options: ['Để tránh thất lạc làm thiếu ốc khi bàn giao và chống ốc kim loại rơi vào kẹt mạch bo mạch gây nổ khi bật máy', 'Để tính tiền ốc vít cho khách', 'Để khay ốc trang trí cho bàn làm việc đẹp hơn', 'Chỉ cần thiết khi tháo máy laptop, máy bàn không cần'],
    correctIndex: 0,
    explanation: 'Ốc kim loại nếu rơi rớt trên bề mặt bo mạch chủ hoặc lọt vào khe cắm nguồn, khi cắm điện sẽ gây chập đoản mạch trực tiếp làm nổ linh kiện bán dẫn.',
  },
  {
    id: 'mcq_03',
    category: 'an-toan',
    question: 'Để xả tĩnh điện tích tụ trên cơ thể trước khi chạm vào các linh kiện nhạy cảm (như CPU, RAM), thao tác nào sau đây đơn giản và hiệu quả nhất tại phòng thực hành?',
    options: ['Rửa tay bằng nước đá lạnh', 'Chạm hai lòng bàn tay vào phần khung kim loại không sơn của thùng máy tính', 'Chà xát hai bàn tay vào áo len', 'Thổi hơi nóng vào các đầu ngón tay'],
    correctIndex: 1,
    explanation: 'Khung kim loại của thùng máy tính có tác dụng nối mass xả hết điện áp tĩnh tích tụ trên cơ thể người xuống đất, tránh sốc tĩnh điện (ESD) làm chết chip vi mạch.',
  },
  {
    id: 'mcq_04',
    category: 'an-toan',
    question: 'Dụng cụ nào sau đây KHÔNG THỂ THIẾU trong túi đồ nghề của một thợ kỹ thuật viên máy tính thực thụ?',
    options: ['Mỏ hàn thiếc công suất lớn 100W', 'Tua-vít 4 cạnh có từ tính, khay đựng ốc, cục gôm tẩy trắng học sinh và USB cứu hộ', 'Búa cao su và kìm cắt sắt', 'Dao rọc giấy sắc nhọn'],
    correctIndex: 1,
    explanation: 'Tua-vít từ tính giúp giữ ốc không rơi, khay đựng ốc chống chập mạch, gôm tẩy trắng chà chân RAM và USB cứu hộ WinPE là bộ tứ bất ly thân của người thợ.',
  },
  {
    id: 'mcq_05',
    category: 'an-toan',
    question: 'Khi phát hiện một linh kiện cắm vào bo mạch chủ thấy rất nặng tay hoặc bị cấn rãnh, kỹ thuật viên phải làm gì theo Luật 3?',
    options: ['Dùng cán tua-vít gõ nhẹ để linh kiện lọt vào khớp', 'Ấn thật mạnh hết sức lực để vượt qua chốt gài', 'Lập tức dừng lại, rút ra kiểm tra chiều rãnh khuyết chống ngược và xoay lại đúng chiều', 'Bẻ bớt chân nhựa để cắm vừa'],
    correctIndex: 2,
    explanation: 'Nguyên lý Lego: Mọi linh kiện PC đều có rãnh khuyết chống cắm ngược. Nếu cấn tay tức là đang cắm ngược chiều, dùng bạo lực sẽ làm gãy chân socket hoặc nứt bo mạch.',
  },
  {
    id: 'mcq_06',
    category: 'an-toan',
    question: 'Trong các trường hợp sau, trường hợp nào bị ĐÌNH CHỈ CA THI và nhận 0 ĐIỂM tiêu chí An toàn theo chuẩn Thông tư 55?',
    options: ['Tháo lắp RAM khi phích cắm nguồn vẫn đang cắm vào ổ điện và công tắc PSU đang bật', 'Điền thiếu số điện thoại của khách hàng trên phiếu bàn giao', 'Quên chỉnh múi giờ về UTC+07:00', 'In bản Test Page hơi bị mờ mực'],
    correctIndex: 0,
    explanation: 'Thao tác trên linh kiện phần cứng khi máy vẫn đang có điện là vi phạm an toàn điện đặc biệt nghiêm trọng, gây nguy hiểm tính mạng và chập cháy thiết bị.',
  },
  {
    id: 'mcq_07',
    category: 'an-toan',
    question: 'Khi sử dụng bình xịt khí nén hoặc máy thổi bụi để vệ sinh quạt tản nhiệt, hành vi nào sau đây là vi phạm quy chuẩn an toàn kỹ thuật?',
    options: ['Giữ cố định cánh quạt khi xịt khí', 'Để quạt quay tự do tít mù với tốc độ cao dưới luồng khí thổi mạnh', 'Đeo khẩu trang chống bụi', 'Thổi bụi từ trong ra ngoài thùng máy'],
    correctIndex: 1,
    explanation: 'Để quạt quay tự do với tốc độ cao sẽ làm vỡ bạc đạn và phát sinh dòng điện cảm ứng ngược gây cháy IC điều khiển trên mainboard.',
  },
  {
    id: 'mcq_08',
    category: 'an-toan',
    question: 'Thời điểm nào sau đây là "Điểm dừng an toàn số 1" bắt buộc giáo viên phải kiểm tra và ký xác nhận?',
    options: ['Sau khi đã đóng nắp thùng máy bàn giao', 'Sau khi đã cứu xong dữ liệu của khách và đối chiếu khớp 100%, trước khi mở máy hoặc format', 'Sau khi đã cài xong phần mềm UniKey', 'Trước khi vào phòng thi'],
    correctIndex: 1,
    explanation: 'Điểm dừng 1 là bảo toàn dữ liệu khách hàng. Chưa bảo toàn xong dữ liệu thì tuyệt đối không được phép thao tác phần cứng hay format ổ đĩa.',
  },
  {
    id: 'mcq_09',
    category: 'an-toan',
    question: 'Thời điểm nào sau đây là "Điểm dừng an toàn số 2" bắt buộc giáo viên phải kiểm tra trước khi cắm điện?',
    options: ['Khi đang vệ sinh quạt', 'Trước khi cắm điện thử máy: kiểm tra RAM đã khóa 2 tai, CPU_FAN đã cắm, thùng máy không còn ốc vít rơi vãi', 'Sau khi đã in bản Test Page', 'Khi bật máy vào BIOS'],
    correctIndex: 1,
    explanation: 'Điểm dừng 2 đảm bảo toàn bộ linh kiện đã vào khớp, dây tản nhiệt đã cắm và không có vật kim loại rơi bên trong gây chập điện khi đóng điện.',
  },
  {
    id: 'mcq_10',
    category: 'an-toan',
    question: 'Nghiệm thu 5 điểm vàng trước khi giao máy cho khách (Điểm dừng an toàn số 3) KHÔNG bao gồm tiêu chí nào sau đây?',
    options: ['Quạt quay êm ái, nắp thùng máy đóng khít vặn đủ ốc', 'Nhiệt độ CPU đo bằng phần mềm HWMonitor dưới 75°C khi tải', 'Dữ liệu khách hàng đã chép trả lại đầy đủ 100% và bàn kỹ thuật dọn sạch bóng', 'Máy tính phải cài đặt đầy đủ tất cả các game đồ họa nặng nhất'],
    correctIndex: 3,
    explanation: 'Tiêu chuẩn nghiệm thu của người thợ tập trung vào độ ổn định phần cứng, nhiệt độ, an toàn dữ liệu và tác phong vệ sinh ngăn nắp, không cài đặt phần mềm ngoài yêu cầu.',
  },

  // CHỦ ĐỀ 2: LẮP RÁP & NHẬN DIỆN LINH KIỆN LEGO (10 CÂU)
  {
    id: 'mcq_11',
    category: 'lap-rap',
    question: 'Trong mô hình ví von máy tính như một văn phòng làm việc, bộ phận nào được ví như "Trái tim bơm điện" cho toàn bộ hệ thống?',
    options: ['Bộ vi xử lý CPU', 'Thanh bộ nhớ RAM', 'Bộ nguồn PSU (Power Supply Unit)', 'Ổ cứng SSD'],
    correctIndex: 2,
    explanation: 'Bộ nguồn PSU chuyển đổi dòng điện xoay chiều 220V thành các điện áp một chiều (+3.3V, +5V, +12V) bơm nuôi toàn bộ linh kiện máy tính.',
  },
  {
    id: 'mcq_12',
    category: 'lap-rap',
    question: 'Bo mạch chủ (Mainboard) kết nối nguồn điện chính từ bộ nguồn PSU thông qua đầu cắm có bao nhiêu chân (pins)?',
    options: ['4 chân', '8 chân', '24 chân (chuẩn ATX)', '12 chân'],
    correctIndex: 2,
    explanation: 'Đầu nối nguồn chính nuôi bo mạch chủ chuẩn ATX hiện đại là đầu cắm 24 chân (hoặc cụm tách 20+4 chân) có lẫy khóa nhựa an toàn.',
  },
  {
    id: 'mcq_13',
    category: 'lap-rap',
    question: 'Để cấp nguồn riêng cho bộ vi xử lý (CPU) hoạt động, bo mạch chủ cần cắm thêm đầu nguồn phụ nào từ bộ nguồn PSU?',
    options: ['Đầu nguồn SATA dẹp', 'Đầu nguồn CPU 4 chân hoặc 8 chân ở góc trên bo mạch', 'Đầu nguồn Molex 4 chân to', 'Cáp tín hiệu VGA'],
    correctIndex: 1,
    explanation: 'Đầu nguồn CPU 4 hoặc 8 chân (+12V) cung cấp dòng điện lớn riêng biệt cho mạch VRM nuôi trực tiếp vi xử lý CPU.',
  },
  {
    id: 'mcq_14',
    category: 'lap-rap',
    question: 'Một ổ cứng thể rắn SSD chuẩn SATA 2.5 inch gắn vào máy tính để bàn bắt buộc phải kết nối đủ mấy sợi dây?',
    options: ['Chỉ cần 1 sợi cáp dữ liệu SATA', 'Chỉ cần 1 sợi dây nguồn từ PSU', 'Đủ 2 sợi dây: 1 sợi dây nguồn SATA dẹp từ PSU và 1 sợi cáp tín hiệu SATA nối vào Mainboard', 'Cần 3 sợi dây'],
    correctIndex: 2,
    explanation: 'Ổ SSD/HDD SATA cần 1 dây cấp nguồn điện và 1 dây cáp tín hiệu SATA màu đỏ/đen nối sang cổng SATA trên bo mạch chủ.',
  },
  {
    id: 'mcq_15',
    category: 'lap-rap',
    question: 'Trên thanh RAM, đặc điểm cấu tạo nào giúp người thợ không bao giờ sợ cắm ngược chiều vào khe cắm?',
    options: ['Chân cắm RAM có nam châm hút', 'Thanh RAM có một "rãnh khuyết" lệch tâm chia hàng chân tiếp xúc thành 2 phần không bằng nhau', 'Thanh RAM phát ra tiếng kêu bíp khi cắm ngược', 'Màu sắc thanh RAM khác với khe cắm'],
    correctIndex: 1,
    explanation: 'Rãnh khuyết (notch) lệch tâm đảm bảo thanh RAM chỉ có thể lọt vào khe cắm khi đặt đúng chiều, cắm ngược sẽ bị đội lên không vào được.',
  },
  {
    id: 'mcq_16',
    category: 'lap-rap',
    question: 'Khi lắp đặt bộ tản nhiệt dạng 4 chốt gài cho CPU Intel (chân socket 115x, 1200, 1700), quy tắc ấn chốt nào sau đây là chuẩn kỹ thuật?',
    options: ['Ấn lần lượt vòng tròn 4 góc theo chiều kim đồng hồ', 'Ấn 2 chốt bên trái trước rồi 2 chốt bên phải sau', 'Ấn chốt theo đường chéo đối xứng (chốt 1 rồi chốt 3, sau đó chốt 2 rồi chốt 4)', 'Ấn cùng lúc cả 4 chốt'],
    correctIndex: 2,
    explanation: 'Ấn chốt theo đường chéo đối xứng giúp lực ép tản nhiệt đè đều lên mặt lưng CPU, keo tản nhiệt dàn đều và không làm cong vênh bo mạch.',
  },
  {
    id: 'mcq_17',
    category: 'lap-rap',
    question: 'Dây quạt tản nhiệt của CPU bắt buộc phải cắm vào chân cắm nào sau đây trên bo mạch chủ?',
    options: ['CHA_FAN (Chassis Fan)', 'SYS_FAN (System Fan)', 'CPU_FAN', 'PWR_FAN'],
    correctIndex: 2,
    explanation: 'Cắm đúng chân CPU_FAN để BIOS kiểm soát tốc độ quạt theo nhiệt độ thực của CPU và không báo lỗi "CPU Fan Error" khi khởi động.',
  },
  {
    id: 'mcq_18',
    category: 'lap-rap',
    question: 'Khi gắn bo mạch chủ vào thùng máy, tác dụng chính của các ốc đệm chân đồng (standoff) là gì?',
    options: ['Để nâng bo mạch chủ cách ly với thành kim loại của vỏ thùng máy nhằm chống chập mạch (chập mass)', 'Để tản nhiệt cho bo mạch chủ', 'Để trang trí bo mạch cho đẹp mắt', 'Để bắt vít nhanh hơn'],
    correctIndex: 0,
    explanation: 'Các chân đồng standoff tạo khoảng cách cách điện an toàn, ngăn không cho các mối hàn ở mặt sau bo mạch chạm vào vỏ case kim loại gây đoản mạch.',
  },
  {
    id: 'mcq_19',
    category: 'lap-rap',
    question: 'Sau khi lắp ráp hoàn thiện một bộ máy tính, thao tác nào sau đây giúp dây dẫn trong thùng máy không bị quấn vào cánh quạt tản nhiệt?',
    options: ['Bôi keo dán sắt vào các sợi dây', 'Dùng dây thít nhựa (dây rút) gom gọn các bó dây và buộc cố định vào khung thùng máy', 'Cắt bớt những sợi dây nguồn thừa không dùng đến', 'Nhét toàn bộ dây lên trên bề mặt tản nhiệt CPU'],
    correctIndex: 1,
    explanation: 'Dùng dây rút nhựa buộc gọn gàng dây nguồn vào rãnh khung case vừa tăng thẩm mỹ, lưu thông luồng gió tản nhiệt, vừa chống chạm cánh quạt.',
  },
  {
    id: 'mcq_20',
    category: 'lap-rap',
    question: 'Trong cụm dây điều khiển mặt trước (Front Panel), hai sợi dây nào sau đây là công tắc tiếp điểm tức thời, KHÔNG phân biệt cực tính âm dương (+/-)?',
    options: ['HDD LED và POWER LED', 'POWER SW và RESET SW', 'SPEAKER và POWER LED', 'USB 3.0 và HD AUDIO'],
    correctIndex: 1,
    explanation: 'POWER SW và RESET SW là 2 công tắc đóng ngắt tiếp điểm cơ học, khi ấn nút 2 chân chỉ chập lại vào nhau trong tích tắc nên cắm chiều nào cũng chạy.',
  },

  // CHỦ ĐỀ 3: BẮT BỆNH 60 GIÂY & SỬA MÁY KHÔNG LÊN (10 CÂU)
  {
    id: 'mcq_21',
    category: 'bat-benh',
    question: 'Bấm nút Power ngoài thùng máy nhưng máy hoàn toàn IM RE, quạt nguồn không nhúc nhích, đèn không sáng. Bước kiểm tra đầu tiên nhanh nhất là gì?',
    options: ['Tháo ngay bo mạch chủ đi sửa chip cầu nam', 'Kiểm tra công tắc I/O sau đuôi cục nguồn PSU xem đã bật sang vạch chữ "I" chưa và kiểm tra lại dây cắm ổ điện', 'Cài lại hệ điều hành Windows', 'Thay mới thanh RAM'],
    correctIndex: 1,
    explanation: 'Kiểm tra từ nguồn điện bên ngoài trước: ổ cắm, dây nguồn và công tắc I/O sau nguồn PSU (rất nhiều trường hợp do vô tình gạt sang O mà tưởng máy hỏng).',
  },
  {
    id: 'mcq_22',
    category: 'bat-benh',
    question: 'Khi bật máy tính, quạt CPU quay vù vù, đèn nguồn sáng nhưng màn hình đen thui (báo No Signal) và đèn phím Num Lock không sáng. Đâu là thủ phạm phổ biến nhất chiếm 70% thực tế?',
    options: ['Ổ đĩa cứng SSD bị đầy bộ nhớ', 'Chân mạ vàng của thanh RAM bị bụi bẩn, oxy hóa tiếp xúc kém với khe cắm RAM', 'Bàn phím bị kẹt phím Enter', 'Màn hình máy tính bị cháy bóng đèn nền'],
    correctIndex: 1,
    explanation: 'RAM bẩn chân tiếp xúc là nguyên nhân kinh điển nhất gây lỗi máy chạy quạt quay nhưng không qua được bài kiểm tra POST xuất hình ảnh.',
  },
  {
    id: 'mcq_23',
    category: 'bat-benh',
    question: 'Để xử lý dứt điểm tình trạng thanh RAM bị oxy hóa chân tiếp xúc gây màn hình đen, kỹ thuật viên dùng dụng cụ nào sau đây?',
    options: ['Dùng giấy nhám (giấy ráp) đánh mạnh vào chân RAM', 'Dùng cục gôm tẩy học sinh màu trắng chà sạch nhẹ nhàng hai mặt chân vàng mạ vàng rồi quét sạch bụi', 'Dùng dầu nhớt xe máy bôi lên chân RAM', 'Dùng bật lửa hơ nóng chân RAM'],
    correctIndex: 1,
    explanation: 'Gôm tẩy học sinh màu trắng tẩy sạch lớp màng oxit mà không làm trầy xước hoặc bay mất lớp vàng mạ dẫn điện của thanh RAM.',
  },
  {
    id: 'mcq_24',
    category: 'bat-benh',
    question: 'Máy tính bật lên hiện logo nhà sản xuất bo mạch chủ rồi dừng lại ở màn hình đen kèm dòng thông báo "Reboot and Select proper Boot device or Insert Boot Media". Lỗi này do đâu?',
    options: ['Hỏng chip âm thanh', 'Máy tính không tìm thấy ổ đĩa hoặc phân vùng chứa hệ điều hành để khởi động (do lỏng cáp SATA hoặc sai Boot Order)', 'Hỏng quạt tản nhiệt CPU', 'Thanh RAM bị cháy'],
    correctIndex: 1,
    explanation: 'Lỗi này báo hiệu BIOS không tìm thấy ổ đĩa khởi động. Thường do tuột cáp SATA dữ liệu/nguồn ổ cứng, sai thứ tự Boot trong BIOS hoặc ổ cứng bị hỏng.',
  },
  {
    id: 'mcq_25',
    category: 'bat-benh',
    question: 'Mỗi lần ngắt nguồn điện cắm lại là máy tính bắt bấm phím F1 để tiếp tục và đồng hồ Windows nhảy về năm 2009. Linh kiện nào trên mainboard cần được thay thế?',
    options: ['Thanh RAM', 'Ổ đĩa SSD', 'Viên pin cúc áo CMOS mã hiệu CR2032 (3V)', 'Quạt tản nhiệt'],
    correctIndex: 2,
    explanation: 'Viên pin CMOS CR2032 cấp nguồn nuôi chip thời gian thực RTC. Khi hết pin (< 2.8V), ngày giờ và cấu hình BIOS bị xóa trắng về mặc định xuất xưởng.',
  },
  {
    id: 'mcq_26',
    category: 'bat-benh',
    question: 'Máy tính bật lên vào Windows chạy được khoảng 5 đến 10 phút thì máy chạy rất chậm, đơ lag, quạt kêu to rú rít rồi tự tắt nguồn ngắt điện đột ngột. Nguyên nhân gốc là gì?',
    options: ['Hết dung lượng ổ đĩa C', 'Bộ vi xử lý CPU bị quá nhiệt (thường trên 95°C - 100°C) do quạt CPU kẹt bụi, keo tản nhiệt bị khô giòn hoặc bung chốt tản nhiệt', 'Chuột máy tính bị hỏng mắt đọc quang', 'Bản quyền Windows bị hết hạn'],
    correctIndex: 1,
    explanation: 'CPU có cơ chế tự ngắt nguồn bảo vệ (Thermal Throttling / Shutdown) khi nhiệt độ vượt ngưỡng an toàn do hệ thống tản nhiệt mất tác dụng.',
  },
  {
    id: 'mcq_27',
    category: 'bat-benh',
    question: 'Để kiểm tra bộ nguồn PSU còn hoạt động hay đã chết khi tháo rời ra ngoài, người thợ dùng nhíp kim loại chập 2 chân nào trên đầu cắm 24 chân?',
    options: ['Chân dây màu đỏ (+5V) và chân dây màu đen (GND)', 'Chân dây màu xanh lá cây (PS_ON) và bất kỳ chân dây màu đen nào (GND/COM)', 'Chân dây màu vàng (+12V) và chân dây màu cam (+3.3V)', 'Chân dây màu tím và chân dây màu xám'],
    correctIndex: 1,
    explanation: 'Chập chân PS_ON (dây xanh lá) với Mass (dây đen) sẽ kích hoạt mạch điều khiển của bộ nguồn PSU đóng điện, quạt nguồn sẽ tự động quay.',
  },
  {
    id: 'mcq_28',
    category: 'bat-benh',
    question: 'Sau khi lắp xong máy tính, bấm nút nguồn thấy quạt quay nhưng nghe tiếng bíp dài liên tục (hoặc 1 bíp dài 2 bíp ngắn tùy bo mạch). Tiếng bíp này thường cảnh báo sự cố ở đâu?',
    options: ['Chưa cắm bàn phím chuột', 'Lỗi nhận diện bộ nhớ RAM hoặc lỗi Card màn hình VGA', 'Ổ cứng chưa cài Windows', 'Máy in bị kẹt giấy'],
    correctIndex: 1,
    explanation: 'Mã âm thanh POST Beep code: Tiếng bíp dài ngắt quãng liên tục là mã báo lỗi không tìm thấy RAM hoặc RAM tiếp xúc không tốt.',
  },
  {
    id: 'mcq_29',
    category: 'bat-benh',
    question: 'Khi máy tính có lắp Card màn hình rời (VGA), nếu cắm dây cáp màn hình (HDMI/VGA) vào cổng xuất hình trên bo mạch chủ (Mainboard) thì hiện tượng gì sẽ xảy ra?',
    options: ['Máy tính chạy nhanh gấp đôi', 'Màn hình sẽ báo No Signal (không lên hình) vì cổng onboard đã tự động bị vô hiệu hóa khi có card rời', 'Màn hình bị đổi màu tím', 'Bo mạch chủ sẽ bị nổ'],
    correctIndex: 1,
    explanation: 'Khi cắm Card VGA rời, BIOS tự động ngắt tín hiệu cổng onboard trên bo mạch. Bắt buộc phải cắm cáp màn hình vào cổng của Card màn hình rời.',
  },
  {
    id: 'mcq_30',
    category: 'bat-benh',
    question: 'Phần mềm miễn phí nào sau đây được kỹ thuật viên chuyên dùng để kiểm tra sức khỏe của ổ cứng SSD/HDD (báo Good/Caution/Bad và số giờ hoạt động)?',
    options: ['CrystalDiskInfo', 'CCleaner', 'UniKey', 'Photoshop'],
    correctIndex: 0,
    explanation: 'CrystalDiskInfo đọc các thông số S.M.A.R.T của ổ đĩa, kiểm tra số giờ chạy, nhiệt độ và cảnh báo tình trạng sức khỏe ổ đĩa chính xác nhất.',
  },

  // CHỦ ĐỀ 4: CỨU DỮ LIỆU & CÀI WINDOWS CHUẨN UEFI (10 CÂU)
  {
    id: 'mcq_31',
    category: 'cai-win',
    question: 'Khi nhận máy tính của khách để xử lý cài lại Windows, những thư mục nào sau đây bắt buộc người thợ phải kiểm tra và sao lưu sang phân vùng an toàn?',
    options: ['Thư mục Windows và Program Files', 'Desktop, Documents, Downloads và thư mục hình ảnh/video của khách hàng', 'Thư mục Temp của hệ thống', 'Thùng rác Recycle Bin'],
    correctIndex: 1,
    explanation: 'Người dùng văn phòng có thói quen lưu toàn bộ tài liệu làm việc ngoài màn hình Desktop và trong Documents/Downloads nằm trên phân vùng ổ C.',
  },
  {
    id: 'mcq_32',
    category: 'cai-win',
    question: 'Khi máy tính bị lỗi màn hình xanh hoặc lỗi hệ điều hành không vào được màn hình chính Windows, kỹ thuật viên dùng công cụ gì để cứu dữ liệu khách?',
    options: ['Format ổ đĩa trước rồi cứu sau', 'Khởi động máy tính từ USB cứu hộ tích hợp môi trường Windows mini (WinPE)', 'Gỡ ổ cứng đem ngâm nước lau sạch', 'Bấm phím F8 liên tục'],
    correctIndex: 1,
    explanation: 'USB WinPE (như Anhdv Boot, DLC Boot) chạy trực tiếp trên RAM, cho phép truy cập toàn bộ cây thư mục của ổ cứng để copy dữ liệu an toàn ra ngoài.',
  },
  {
    id: 'mcq_33',
    category: 'cai-win',
    question: 'Để đối chiếu dữ liệu đã sao lưu từ Desktop sang ổ D đã khớp 100% hay chưa, người thợ thực hiện thao tác nào?',
    options: ['Nhìn lướt qua bằng mắt', 'Nhấp chuột phải vào thư mục gốc chọn Properties, đối chiếu số lượng Files/Folders và tổng dung lượng MB/GB với thư mục đích', 'Chỉ cần mở thử 1 bài hát', 'Đổi tên thư mục thành BACKUP_XONG'],
    correctIndex: 1,
    explanation: 'Kiểm tra đối chiếu thông số Properties (Size on disk và số lượng file) đảm bảo toàn bộ tệp tin con và thư mục lồng nhau đã được sao chép toàn vẹn.',
  },
  {
    id: 'mcq_34',
    category: 'cai-win',
    question: 'Chuẩn khởi động hiện đại phổ biến hiện nay đi kèm với chuẩn định dạng ổ cứng GPT được gọi là gì?',
    options: ['Chuẩn Legacy CSM', 'Chuẩn UEFI', 'Chuẩn MBR', 'Chuẩn MS-DOS'],
    correctIndex: 1,
    explanation: 'Chuẩn UEFI kết hợp với định dạng phân vùng GPT là chuẩn khởi động hiện đại, hỗ trợ ổ đĩa dung lượng lớn trên 2TB và tốc độ khởi động nhanh an toàn.',
  },
  {
    id: 'mcq_35',
    category: 'cai-win',
    question: 'Khi vừa gắn thêm 1 ổ đĩa SSD mới vào máy, tại sao phải mở công cụ Disk Management (diskmgmt.msc)?',
    options: ['Để xóa sạch hệ điều hành cũ', 'Để khởi tạo đĩa (Initialize Disk GPT) và tạo phân vùng mới (New Simple Volume NTFS) có gán ký tự ổ đĩa', 'Để kiểm tra nhiệt độ của CPU', 'Để cập nhật driver card mạng'],
    correctIndex: 1,
    explanation: 'Ổ đĩa mới xuất xưởng chưa có cấu trúc phân vùng nên Windows Explorer không nhận, phải vào Disk Management để khởi tạo và định dạng hệ thống tệp.',
  },
  {
    id: 'mcq_36',
    category: 'cai-win',
    question: 'Sau khi cài đặt xong hệ điều hành Windows, người thợ mở công cụ nào để kiểm tra xem máy tính đã cài đặt đầy đủ tất cả Driver phần cứng hay chưa?',
    options: ['Task Manager', 'Device Manager', 'Disk Cleanup', 'Control Panel Programs'],
    correctIndex: 1,
    explanation: 'Device Manager hiển thị toàn bộ cây phần cứng. Nếu thiếu driver, linh kiện sẽ bị gắn dấu chấm than vàng (!) hoặc hiển thị Unknown Device.',
  },
  {
    id: 'mcq_37',
    category: 'cai-win',
    question: 'Trong Device Manager, dấu chấm than màu vàng (!) xuất hiện ở mục nào đó có ý nghĩa gì đối với người thợ?',
    options: ['Linh kiện đó đã bị cháy nổ vật lý', 'Linh kiện đó đang thiếu Driver điều khiển hoặc Driver cài đặt bị lỗi, cần cập nhật đúng driver', 'Linh kiện đó đang chạy ở chế độ tiết kiệm điện', 'Máy tính đã sẵn sàng giao cho khách'],
    correctIndex: 1,
    explanation: 'Dấu chấm than vàng là cảnh báo hệ điều hành chưa có Driver tương thích để giao tiếp với linh kiện phần cứng đó.',
  },
  {
    id: 'mcq_38',
    category: 'cai-win',
    question: 'Phần mềm gõ tiếng Việt chuẩn và phổ biến nhất trên Windows là UniKey. Cấu hình chuẩn thường dùng nhất ở Việt Nam là gì?',
    options: ['Bảng mã TCVN3, Kiểu gõ VNI', 'Bảng mã Unicode, Kiểu gõ Telex, bật tùy chọn "Khởi động cùng Windows"', 'Bảng mã VNI Windows, Kiểu gõ Telex', 'Bảng mã VIQR, Kiểu gõ Auto'],
    correctIndex: 1,
    explanation: 'Bảng mã Unicode quốc tế kết hợp kiểu gõ Telex là chuẩn gõ tiếng Việt phổ biến nhất, bật chạy cùng Windows để tự động có tiếng Việt khi bật máy.',
  },
  {
    id: 'mcq_39',
    category: 'cai-win',
    question: 'Tại sao sau khi cài đặt hoàn thiện mọi driver và phần mềm, người thợ nên tạo một điểm khôi phục hệ thống (System Restore Point) đặt tên là `MAY_CHAY_TOT`?',
    options: ['Để làm tăng dung lượng trống của ổ C', 'Để sau này nếu máy bị nhiễm virus hoặc xung đột phần mềm, có thể quay trở lại trạng thái hoàn hảo này chỉ trong 5 phút mà không cần cài lại Win', 'Để nộp bài thi cho giáo viên', 'Để khóa không cho khách cài thêm ứng dụng'],
    correctIndex: 1,
    explanation: 'System Restore Point chụp lại trạng thái registry và hệ thống đang hoạt động ổn định nhất, là phao cứu sinh khi người dùng cài phần mềm lỗi.',
  },
  {
    id: 'mcq_40',
    category: 'cai-win',
    question: 'Khi cài đặt Windows 10/11 cho laptop đời mới dùng chip Intel Gen 11/12/13/14, tại màn hình chọn ổ đĩa không nhìn thấy ổ cứng nào, nguyên nhân do đâu?',
    options: ['Ổ SSD bị lỏng cáp', 'Chưa tắt tính năng Intel VMD trong BIOS hoặc bộ cài thiếu Driver Intel Rapid Storage Technology (RST)', 'Hết pin CMOS', 'USB cài Win bị virus ăn'],
    correctIndex: 1,
    explanation: 'Công nghệ Intel VMD quản lý ổ lưu trữ NVMe trực tiếp từ CPU cần có driver Intel RST đi kèm thì bộ cài Windows mới nhận diện được phân vùng.',
  },

  // CHỦ ĐỀ 5: MÁY IN VĂN PHÒNG, NGOẠI VI & NGHIỆM THU 5 ĐIỂM (10 CÂU)
  {
    id: 'mcq_41',
    category: 'ngoai-vi',
    question: 'Máy in văn phòng (Canon LBP 2900 / HP LaserJet) đèn báo nguồn vẫn xanh nhưng bấm in tài liệu từ Word không thấy máy kéo giấy. Thao tác xử lý nhanh nhất là gì?',
    options: ['Đập mạnh vào thân máy in', 'Mở Devices and Printers, nhấp đúp vào máy in chọn Cancel All Documents để xóa lệnh in bị kẹt trong hàng đợi Print Spooler', 'Thay hộp mực mới ngay lập tức', 'Cài lại hệ điều hành Windows'],
    correctIndex: 1,
    explanation: '90% sự cố máy in văn phòng là do kẹt một lệnh in lỗi từ trước trong hàng đợi Print Spooler, chỉ cần xóa sạch hàng đợi in là máy in sẽ hoạt động lại.',
  },
  {
    id: 'mcq_42',
    category: 'ngoai-vi',
    question: 'Để khởi động lại tiến trình quản lý in ấn của Windows bằng lệnh dòng lệnh (Command Prompt / CMD), người thợ dùng cặp lệnh nào?',
    options: ['ipconfig /release và ipconfig /renew', 'net stop spooler và net start spooler', 'ping 127.0.0.1 và shutdown /r', 'taskkill /f /im explorer.exe'],
    correctIndex: 1,
    explanation: 'Dịch vụ Print Spooler quản lý toàn bộ lệnh in của Windows. Lệnh `net stop spooler` và `net start spooler` dừng và khởi động lại dịch vụ này tức thì.',
  },
  {
    id: 'mcq_43',
    category: 'ngoai-vi',
    question: 'Sau khi kết nối và cài đặt driver máy in cho văn phòng, thao tác nào để khi người dùng bấm Ctrl+P tài liệu sẽ tự động chọn máy in này?',
    options: ['Rút hết dây mạng máy tính', 'Nhấp chuột phải vào máy in trong Devices and Printers và chọn "Set as default printer"', 'Tắt nguồn máy in', 'Đặt tên máy in thành VIP_PRINTER'],
    correctIndex: 1,
    explanation: 'Set as default printer gán dấu tích xanh cho máy in, biến máy in đó thành đích đến mặc định cho mọi ứng dụng khi người dùng bấm in.',
  },
  {
    id: 'mcq_44',
    category: 'ngoai-vi',
    question: 'Để kiểm tra chất lượng bản in của máy in sau khi bảo trì hoặc cài đặt mà không cần mở phần mềm Word hay Excel, người thợ thực hiện thao tác nào?',
    options: ['In thử ảnh màn hình Desktop', 'Vào Printer properties của máy in, tại tab General bấm nút "Print Test Page"', 'Mở Notepad gõ 1 chữ rồi in', 'Khởi động lại máy in 3 lần'],
    correctIndex: 1,
    explanation: 'Nút Print Test Page in trang kiểm tra tiêu chuẩn của Windows có logo và thông số kỹ thuật driver, xác nhận máy in và driver đã thông suốt 100%.',
  },
  {
    id: 'mcq_45',
    category: 'ngoai-vi',
    question: 'Bản in ra từ máy in laser bị một vệt đen sọc dài chạy dọc từ trên xuống dưới trang giấy. Bộ phận nào trong hộp mực (Cartridge) nhiều khả năng bị mòn/hỏng nhất?',
    options: ['Khay nạp giấy', 'Trống in quang học (Drum) hoặc gạt mực bị xước mòn', 'Cáp nguồn máy in', 'Bo mạch nguồn máy in'],
    correctIndex: 1,
    explanation: 'Vệt đen sọc dọc trang giấy là dấu hiệu kinh điển của việc thanh Drum bị trầy xước lớp quang dẫn hoặc lưỡi gạt mực lớn bị mẻ.',
  },
  {
    id: 'mcq_46',
    category: 'ngoai-vi',
    question: 'Trước khi bàn giao máy tính cho khách, phần mềm HWMonitor hoặc Core Temp cho thấy nhiệt độ CPU khi chạy tải ở mức nào là ĐẠT CHUẨN người thợ lành nghề?',
    options: ['Trên 95°C', 'Dưới 75°C (lý tưởng trong khoảng 45°C - 65°C)', 'Chính xác 0°C', 'Nhiệt độ càng nóng máy chạy càng nhanh'],
    correctIndex: 1,
    explanation: 'CPU hoạt động ổn định và mát mẻ dưới 75°C khi tải, chứng tỏ keo tản nhiệt đã tra đúng lượng hạt đậu xanh và quạt tản nhiệt quay tốt.',
  },
  {
    id: 'mcq_47',
    category: 'ngoai-vi',
    question: 'Kiểm tra thiết bị ngoại vi trước khi nghiệm thu bao gồm các thao tác nào sau đây?',
    options: ['Chỉ cần mở nguồn máy tính lên là xong', 'Kiểm tra gõ đủ các phím bàn phím, nhấp thử chuột trái/phải/con lăn, cắm tai nghe kiểm tra âm thanh và cắm cáp mạng LAN kiểm tra Internet', 'Tháo chuột ra vệ sinh', 'Đo kích thước màn hình'],
    correctIndex: 1,
    explanation: 'Kiểm tra toàn diện bàn phím, chuột, âm thanh và kết nối mạng đảm bảo khách hàng mang máy về cắm vào là sử dụng được ngay.',
  },
  {
    id: 'mcq_48',
    category: 'ngoai-vi',
    question: 'Hành động nào sau đây thể hiện rõ nhất tác phong công nghiệp chuyên nghiệp của một người thợ kỹ thuật viên tại bàn máy?',
    options: ['Để ốc vít và tua-vít vương vãi trên bàn để thể hiện mình đang bận rộn', 'Lau chùi thùng máy sạch bụi, xếp gọn dụng cụ đồ nghề vào hộp, dọn sạch rác và bàn làm việc trước khi mời thầy/khách đến nghiệm thu', 'Bật nhạc thật to trong xưởng thực hành', 'Vừa làm vừa ăn uống tại bàn kỹ thuật'],
    correctIndex: 1,
    explanation: 'Tác phong 5S: Sàng lọc, Sắp xếp, Sạch sẽ, Săn sóc, Sẵn sàng. Khách hàng và giáo viên đánh giá trình độ người thợ qua sự ngăn nắp và sạch sẽ.',
  },
  {
    id: 'mcq_49',
    category: 'ngoai-vi',
    question: 'Trên Phiếu Dịch Vụ Kỹ Thuật A-Z, thông tin nào sau đây BẮT BUỘC phải có đầy đủ chữ ký xác nhận của hai bên?',
    options: ['Chữ ký của Kỹ thuật viên thực hiện và Chữ ký nghiệm thu của Giáo viên / Khách hàng', 'Chữ ký của Hiệu trưởng nhà trường', 'Chữ ký của bảo vệ cơ quan', 'Chữ ký của nhà sản xuất linh kiện'],
    correctIndex: 0,
    explanation: 'Biên bản bàn giao có giá trị pháp lý và chuyên môn khi có chữ ký xác nhận của người trực tiếp sửa chữa và người kiểm tra nghiệm thu.',
  },
  {
    id: 'mcq_50',
    category: 'ngoai-vi',
    question: 'Theo thang điểm 10 chuẩn Thông tư 55, điều kiện nào sau đây quyết định bài thi thực hành của học sinh được xếp loại ĐẠT?',
    options: ['Tổng điểm từ 5.0 điểm trở lên và KHÔNG có tiêu chí nào bị 0 điểm, không vi phạm Điểm dừng an toàn', 'Chỉ cần đạt 4.0 điểm', 'Chỉ cần làm xong trước giờ quy định', 'Không cần làm phần mềm, chỉ cần lắp ráp'],
    correctIndex: 0,
    explanation: 'Tiêu chuẩn đạt tay nghề: Điểm tổng >= 5.0, mọi tiêu chí đều đạt điểm và tuân thủ tuyệt đối quy định an toàn nghề nghiệp.',
  },
];

// ----------------------------------------------------------------------------
// 5. NGÂN HÀNG 6 CA THI THỰC HÀNH TỔNG HỢP (JOB TICKETS) ĐỂ BỐC THĂM ĐỘC LẬP
// ----------------------------------------------------------------------------
export const FULL_EXAM_TICKETS = [
  {
    ticketId: 'TICKET_PC_01',
    code: 'ĐỀ THI 01',
    title: 'Màn hình đen (RAM oxy hóa) & Nâng cấp RAM 8GB + Cứu tài liệu Kế toán',
    studentRole: 'Kỹ thuật viên Trực dịch vụ Xưởng 1',
    customerName: 'Chị Mai (Phòng Kế toán)',
    machineInfo: 'PC Bàn Intel Core i5-10400 · RAM 8GB DDR4 · Ổ C: 120GB, Ổ D: 380GB',
    problemReport: 'Bật máy quạt quay vù vù nhưng màn hình đen thui (No Signal). Cần cứu gấp thư mục BAO_CAO_TAI_CHINH ngoài Desktop sang ổ D. Lắp thêm 1 thanh RAM 8GB DDR4 khách mang theo.',
    hardwareIssue: 'ram_oxide',
    hardwareRemedy: 'Tháo RAM dùng gôm tẩy trắng chà sạch 2 mặt chân mạ vàng, cắm lại nghe 2 tiếng tách sập khóa. Lắp thêm thanh RAM 8GB thứ hai vào khe số 2.',
    targetDriveC_GB: 120,
    targetDriveD_GB: 380,
    dataFolder: 'Desktop\\BAO_CAO_TAI_CHINH (12 files, 145 MB)',
    expectedRAM_GB: 16,
    printerTask: false,
    maxScore: 10.0,
  },
  {
    ticketId: 'TICKET_PC_02',
    code: 'ĐỀ THI 02',
    title: 'Lỗi No Bootable Device & Quá nhiệt CPU 92°C tự ngắt + Cứu tài liệu Dự án',
    studentRole: 'Kỹ thuật viên Trực dịch vụ Xưởng 2',
    customerName: 'Anh Hùng (Ban Quản lý Dự án)',
    machineInfo: 'PC Bàn Intel Core i3-10100 · RAM 8GB DDR4 · Ổ C: 128GB, Ổ D: 500GB',
    problemReport: 'Bật máy hiện logo rồi báo chữ trắng "No Bootable Device". Quạt kêu to gầm rú, máy chạy được 5 phút là tự sập nguồn. Cần cứu thư mục HO_SO_DU_AN trong Documents bằng USB WinPE.',
    hardwareIssue: 'sata_loose_and_thermal',
    hardwareRemedy: 'Cắm chặt lại 2 đầu cáp SATA và dây nguồn ổ cứng. Tháo tản nhiệt, lau keo khô cũ, tra keo hạt đậu xanh mới, cắm dây CPU_FAN. Chỉnh Boot Option #1 trong BIOS.',
    targetDriveC_GB: 128,
    targetDriveD_GB: 500,
    dataFolder: 'Documents\\HO_SO_DU_AN (35 files, 320 MB)',
    expectedRAM_GB: 8,
    printerTask: false,
    maxScore: 10.0,
  },
  {
    ticketId: 'TICKET_PC_03',
    code: 'ĐỀ THI 03',
    title: 'Nâng cấp SSD 240GB mới (chưa khởi tạo) + Xử lý máy in Canon 2900 kẹt lệnh in',
    studentRole: 'Kỹ thuật viên Bảo trì Văn phòng',
    customerName: 'Văn phòng Khoa CNTT',
    machineInfo: 'PC Văn phòng Core i5 · RAM 8GB · Đang có sẵn ổ C: 120GB',
    problemReport: 'Văn phòng đưa 1 ổ SSD SATA 240GB mới nguyên hộp nhờ lắp làm ổ phụ lưu trữ. Máy in Canon LBP 2900 bị đơ không in được. Cần sao lưu dữ liệu sang ổ SSD mới này và in Test Page.',
    hardwareIssue: 'unallocated_ssd_and_spooler',
    hardwareRemedy: 'Lắp SSD vào khay cắm đủ dây nguồn và cáp SATA. Vào Disk Management khởi tạo GPT, tạo New Simple Volume format NTFS. Mở Devices and Printers, Cancel All Documents xóa kẹt lệnh in, Set as default printer, in Test Page.',
    targetDriveC_GB: 120,
    targetDriveD_GB: 240,
    dataFolder: 'Desktop + Documents (48 files, 580 MB)',
    expectedRAM_GB: 8,
    printerTask: true,
    maxScore: 10.0,
  },
  {
    ticketId: 'TICKET_PC_04',
    code: 'ĐỀ THI 04',
    title: 'Hết Pin CMOS sai ngày giờ báo F1 + Cài lại Windows 10 chuẩn UEFI GPT',
    studentRole: 'Kỹ thuật viên Trực quầy dịch vụ',
    customerName: 'Cô Lan (Phòng Đào tạo)',
    machineInfo: 'PC Văn phòng Core i3 · RAM 8GB · Ổ C: 120GB, Ổ D: 380GB',
    problemReport: 'Mỗi lần mở máy đều bắt bấm F1 mới vào được, đồng hồ nhảy về năm 2015 không vào được web HTTPS. Windows bị nhiễm mã độc chạy rất chậm. Cần thay pin CMOS, sao lưu dữ liệu và cài lại Win 10 UEFI.',
    hardwareIssue: 'cmos_battery_dead',
    hardwareRemedy: 'Thay pin CMOS CR2032 3V mới, vào BIOS chỉnh đúng ngày giờ và F10 lưu lại. Cứu dữ liệu Desktop sang D:, cài Win 10 UEFI vào đúng ổ C 120GB, giữ nguyên ổ D, cài UniKey.',
    targetDriveC_GB: 120,
    targetDriveD_GB: 380,
    dataFolder: 'Desktop\\GIAO_TRINH (22 files, 210 MB)',
    expectedRAM_GB: 8,
    printerTask: false,
    maxScore: 10.0,
  },
  {
    ticketId: 'TICKET_PC_05',
    code: 'ĐỀ THI 05',
    title: 'Cắm nhầm cổng Card VGA rời báo No Signal + Vệ sinh bảo dưỡng toàn diện',
    studentRole: 'Kỹ thuật viên Xử lý sự cố tại chỗ',
    customerName: 'Anh Tuấn (Trung tâm Thông tin Thư viện)',
    machineInfo: 'PC Đồ họa Core i5 · VGA rời GTX 1650 · RAM 16GB · Ổ C: 240GB, Ổ D: 1TB',
    problemReport: 'Khách tự tháo máy vệ sinh xong cắm dây màn hình bật máy không lên hình (No Signal). Máy bám nhiều bụi két. Cần chẩn đoán nguyên nhân, cắm đúng cổng card rời, vệ sinh tra keo tản nhiệt và kiểm tra Device Manager sạch chấm than.',
    hardwareIssue: 'vga_port_misconnected',
    hardwareRemedy: 'Rút điện xả tụ. Phát hiện cắm nhầm cáp HDMI vào cổng onboard trên mainboard. Chuyển cắm xuống cổng HDMI của Card đồ họa rời. Tháo quạt vệ sinh giữ cánh quạt, tra keo hạt đậu xanh, kiểm tra Device Manager nhận đủ Driver Display Adapters.',
    targetDriveC_GB: 240,
    targetDriveD_GB: 1000,
    dataFolder: 'Documents\\THU_VIEN_SO (60 files, 1.2 GB)',
    expectedRAM_GB: 16,
    printerTask: false,
    maxScore: 10.0,
  },
  {
    ticketId: 'TICKET_PC_06',
    code: 'ĐỀ THI 06',
    title: 'Lắp ráp hoàn chỉnh bộ máy PC từ linh kiện rời & Cài đặt hệ điều hành ban đầu',
    studentRole: 'Kỹ thuật viên Lắp ráp & Cài đặt',
    customerName: 'Phòng Máy thực hành số 3',
    machineInfo: 'Linh kiện rời: Case, Nguồn 450W, Main H410, Core i3-10100, RAM 8GB DDR4, SSD 240GB',
    problemReport: 'Phòng máy tiếp nhận các linh kiện rời từ nhà cung cấp. Yêu cầu kỹ thuật viên lắp ráp thành thùng máy hoàn chỉnh theo nguyên tắc Lego, cắm đủ 4 sợi dây nguồn, lắp chân đồng standoff cách điện, cài Windows và lập phiếu bàn giao.',
    hardwareIssue: 'assembly_from_scratch',
    hardwareRemedy: 'Bắt ốc chân đồng standoff cách điện, lắp CPU không chạm chân socket, tra keo hạt đậu xanh, cắm CPU_FAN, cắm RAM nghe 2 tiếng tách, cắm đủ 4 sợi dây nguồn (24 chân, CPU 4/8 chân, SATA, F_PANEL). Cài Win UEFI, Device Manager sạch 100% chấm than.',
    targetDriveC_GB: 120,
    targetDriveD_GB: 120,
    dataFolder: 'Máy mới trống - Không cần cứu dữ liệu',
    expectedRAM_GB: 8,
    printerTask: false,
    maxScore: 10.0,
  },
];

// ----------------------------------------------------------------------------
// 6. THUẬT TOÁN SINH ĐỀ THI NGẪU NHIÊN CÁ NHÂN HÓA (CHỐNG TRÙNG LẶP CA THI)
// ----------------------------------------------------------------------------
export function generatePersonalizedExam(studentSeed: string) {
  // Tạo seed số từ chuỗi tên học sinh hoặc thời gian
  let hash = 0;
  for (let i = 0; i < studentSeed.length; i++) {
    hash = (hash << 5) - hash + studentSeed.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  // 1. Bốc ngẫu nhiên 1 Ca máy chính (Job Ticket)
  const ticketIndex = absHash % FULL_EXAM_TICKETS.length;
  const ticket = FULL_EXAM_TICKETS[ticketIndex];

  // 2. Bốc ngẫu nhiên 10 câu trắc nghiệm thực chiến (Mỗi nhóm chủ đề chọn 2 câu để bao phủ toàn diện)
  const categories: Array<'an-toan' | 'lap-rap' | 'bat-benh' | 'cai-win' | 'ngoai-vi'> = [
    'an-toan',
    'lap-rap',
    'bat-benh',
    'cai-win',
    'ngoai-vi',
  ];

  const selectedMCQs: PracticalMCQ[] = [];
  categories.forEach((cat, cIdx) => {
    const catQuestions = MCQ_PRACTICAL_BANK.filter((q) => q.category === cat);
    // Chọn 2 câu ngẫu nhiên từ nhóm này
    const offset = (absHash + cIdx * 7) % catQuestions.length;
    const q1 = catQuestions[offset];
    const q2 = catQuestions[(offset + 1) % catQuestions.length];
    if (q1) selectedMCQs.push(q1);
    if (q2 && q2.id !== q1.id) selectedMCQs.push(q2);
  });

  // 3. Bốc ngẫu nhiên 2 câu hỏi vấn đáp tại bàn
  const oralOffset = (absHash * 3) % ORAL_QUESTIONS.length;
  const oral1 = ORAL_QUESTIONS[oralOffset];
  const oral2 = ORAL_QUESTIONS[(oralOffset + 5) % ORAL_QUESTIONS.length];

  // 4. Bốc ngẫu nhiên 1 tình huống lắp ráp và 1 tình huống cài Win
  const asmScenario = ASSEMBLY_SCENARIOS[absHash % ASSEMBLY_SCENARIOS.length];
  const winScenario = WINDOWS_INSTALL_SCENARIOS[(absHash * 2) % WINDOWS_INSTALL_SCENARIOS.length];

  return {
    studentSeed,
    ticket,
    mcqs: selectedMCQs,
    oralQuestions: [oral1, oral2],
    assemblyScenario: asmScenario,
    windowsScenario: winScenario,
  };
}
