// ============================================================================
// FILE DỮ LIỆU BÀI GIẢNG, DANH SÁCH LỚP & CHUẨN NĂNG LỰC SỐ (data/course-data.js)
// Ngành trọng tâm: TRUNG CẤP TIN HỌC ỨNG DỤNG (HỆ 9+3) - TRƯỜNG CĐ BUÔN MA THUỘT
// -> GIẢNG VIÊN CHỈ CẦN SỬA FILE NÀY ĐỂ CẬP NHẬT DANH SÁCH LỚP & CÂU HỎI!
// ============================================================================

window.COURSE_CONFIG = {
  schoolName: "TRƯỜNG CAO ĐẲNG BUÔN MA THUỘT",
  departmentName: "Khoa Công nghệ thông tin",
  courseTitle: "Cổng Thực Hành Tin Học 9+3 • Trường CĐ Buôn Ma Thuột",
  sendUrl: "/api/scores",

  // Trọng số tính điểm tổng kết Thang 10 (Chỉnh sửa tỷ lệ tại đây, tổng = 1.0)
  scoreWeights: {
    mouse: 0.25,     // 25% Cầm chuột (Chương 1 - Buổi 1)
    telex: 0.30,     // 30% Gõ tiếng Việt Telex (Chương 1 - Buổi 2)
    word: 0.25,      // 25% Soạn thảo Word & Internet (Chương 2 & 3)
    excelQuiz: 0.20  // 20% Bảng tính Excel & An toàn số (Chương 4, 5, 6)
  },

  // 1. DANH SÁCH LỚP & HỌC SINH CÓ SẴN (Chọn từ danh sách xổ xuống để không gõ sai chính tả/nộp hộ)
  classRosters: {
    "Tin học ứng dụng 9+3 (K26A)": [
      "01. Nguyễn Văn An", "02. Trần Văn Ba", "03. Lê Thị Bích Cúc", "04. Phạm Minh Dũng",
      "05. Hoàng Quốc Đạt", "06. H'Hen Niê", "07. Y Đam San Êban", "08. Vũ Thị Hương Giang",
      "09. Đặng Gia Huy", "10. Bùi Tuấn Kiệt", "11. Nguyễn Thị Khánh Linh", "12. Trần Hoàng Long",
      "13. Y Minh Mlô", "14. H'Mai Кbuôr", "15. Ngô Bảo Nam", "16. Phan Trọng Nghĩa",
      "17. Lê Hồng Phúc", "18. Trương Minh Quân", "19. Đỗ Thanh Sơn", "20. Nguyễn Anh Tuấn",
      "21. Võ Thị Thanh Thảo", "22. Huỳnh Công Thành", "23. Ksor Y Tuyên", "24. Phạm Quốc Việt",
      "25. Trần Thị Như Ý", "-- Học sinh mới (Tự nhập tên ở ô dưới) --"
    ],
    "Tin học ứng dụng 9+3 (K26B)": [
      "01. Nguyễn Hoàng Anh", "02. Trần Minh Bảo", "03. Lê Quốc Cường", "04. Phạm Thị Thùy Dương",
      "05. Y Duy Êban", "06. H'Lan Niê", "07. Hoàng Văn Hải", "08. Vũ Minh Hiếu",
      "09. Đặng Thị Thu Hoài", "10. Bùi Gia Hưng", "11. Nguyễn Tuấn Khang", "12. Trần Thị Ngọc Lan",
      "13. Y Lộc Ayun", "14. Ngô Minh Mẫn", "15. Phan Thị Tuyết Ngân", "16. Lê Hoàng Nguyên",
      "17. Trương Quang Nhật", "18. Đỗ Thị Kim Oanh", "19. Nguyễn Thành Phát", "20. Võ Minh Quang",
      "-- Học sinh mới (Tự nhập tên ở ô dưới) --"
    ],
    "Tin học ứng dụng 9+3 (K25)": [
      "01. Lê Minh An", "02. Nguyễn Quốc Bảo", "03. Trần Văn Chiến", "04. Phạm Hoàng Duy",
      "05. YKha Niê", "06. H'Nga Mlô", "07. Vũ Trọng Hiếu", "08. Hoàng Tuấn Kiệt",
      "09. Đặng Minh Khôi", "10. Bùi Thị Ngọc Mai", "-- Học sinh mới (Tự nhập tên ở ô dưới) --"
    ],
    "Điện công nghiệp 9+3": [
      "01. Nguyễn Văn Bình", "02. Trần Quốc Cường", "03. Lê Minh Đức", "04. Phạm Văn Hùng",
      "05. Y Tâm Кbuôr", "06. Hoàng Gia Khánh", "-- Học sinh mới (Tự nhập tên ở ô dưới) --"
    ],
    "Công nghệ Ô tô 9+3": [
      "01. Trần Quốc Anh", "02. Nguyễn Minh Chiến", "03. Lê Văn Đạt", "04. Phạm Tuấn Hưng",
      "05. Y Vương Êban", "06. Vũ Hoàng Nam", "-- Học sinh mới (Tự nhập tên ở ô dưới) --"
    ]
  },

  // 2. BẢNG ÁNH XẠ CHUẨN NĂNG LỰC SỐ (Làm minh chứng kiểm định & rà soát chương trình TT 55/2026)
  digitalCompetencyStandards: {
    step1: "NLS 1.1 & 1.2: Vận hành thiết bị số, điều khiển chuột và quản lý thư mục lưu trữ dữ liệu nghề nghiệp tại ổ đĩa D:\\",
    step2: "NLS 1.3 & 3.1: Tạo lập văn bản tiếng Việt chuẩn bảng mã Unicode, kiểu gõ Telex đúng quy tắc chính tả",
    step3: "NLS 2.1, 2.2 & 3.1: Tra cứu thông tin kỹ thuật, giao tiếp qua Thư điện tử (Email) và soạn thảo văn bản hành chính trên MS Word",
    step4: "NLS 3.2 & 4.1: Xử lý bảng tính điện tử MS Excel (SUM, AVERAGE, MAX, MIN, IF) và bảo vệ an toàn thông tin cá nhân trên không gian mạng"
  },

  // 3. BỘ 5 CÂU THỬ THÁCH GÕ TIẾNG VIỆT TELEX (CHUẨN UNICODE NFC, PHÂN BIỆT HOA/THƯỜNG, ĐỊA DANH ĐẮK LẮK TRUNG TÍNH)
  telexChallenges: [
    {
      id: "T1",
      title: "Câu 1/5: Gõ tên trường (20 điểm)",
      target: "Trường Cao đẳng Buôn Ma Thuột",
      hint: "💡 Gợi ý phím Telex: T-r-u-w-o-w-n-g-f  C-a-o  d-d-a-w-n-g-r  B-u-o-o-n  M-a  T-h-u-o-o-t-j"
    },
    {
      id: "T2",
      title: "Câu 2/5: Gõ tên khoa và ngành học (20 điểm)",
      target: "Khoa Công nghệ thông tin ngành Tin học ứng dụng",
      hint: "💡 Gợi ý phím Telex: K-h-o-a  C-o-o-n-g  n-g-h-e-e-j  t-h-o-o-n-g  t-i-n  n-g-a-n-h-f  T-i-n  h-o-c-j  u-w-n-g-s  d-u-n-g-j"
    },
    {
      id: "T3",
      title: "Câu 3/5: Gõ kỹ năng nghề Tin học (20 điểm)",
      target: "Thực hành lắp ráp máy tính và quản trị mạng",
      hint: "💡 Gợi ý phím Telex: T-h-u-w-c-j  h-a-n-h-f  l-a-w-p-s  r-a-p-s  m-a-y-s  t-i-n-h-s  v-a-f  q-u-a-n-r  t-r-i-j  m-a-n-g-j"
    },
    {
      id: "T4",
      title: "Câu 4/5: Gõ địa danh trung tính tỉnh Đắk Lắk (20 điểm)",
      target: "Em học tập tại tỉnh Đắk Lắk vùng Tây Nguyên",
      hint: "💡 Gợi ý phím Telex: E-m  h-o-c-j  t-a-a-p-j  t-a-i-j  t-i-n-h-r  D-d-a-w-s-k  L-a-w-s-k  v-u-n-g-f  T-a-a-y  N-g-u-y-e-e-n"
    },
    {
      id: "T5",
      title: "Câu 5/5: Gõ quy tắc lưu bài phòng máy (20 điểm)",
      target: "Em luôn lưu bài tập vào thư mục ổ đĩa D an toàn",
      hint: "💡 Gợi ý phím Telex: E-m  l-u-o-o-n  l-u-w-u  b-a-i-f  t-a-a-p-j  v-a-o-f  t-h-u-w  m-u-c-j  o-o-r  d-d-i-a-x  D  a-n  t-o-a-n-f"
    }
  ],

  // 4. BÀI TẬP TƯƠNG TÁC CHƯƠNG 2 (TÌM KIẾM INTERNET & GỬI EMAIL KỸ THUẬT)
  ch2Tasks: {
    searchQuestion: "Khi cần tải hình ảnh 'Sơ đồ bấm cáp mạng LAN RJ45 chuẩn B' trên Google Chrome để không bị dính virus quảng cáo, em làm cách nào đúng?",
    searchOptions: [
      { value: "wrong1", text: "Bấm vào nút màu xanh lá cây to nhấp nháy ghi chữ 'TẢI VỀ NGAY / DOWNLOAD'" },
      { value: "correct", text: "Chọn thẻ Hình ảnh ➔ Bấm chuột PHẢI vào ảnh rõ nét ➔ Chọn 'Lưu hình ảnh thành...' (Save image as...) lưu vào ổ D:\\" },
      { value: "wrong2", text: "Chụp màn hình bằng điện thoại rồi tắt máy" }
    ]
  },

  // 5. BÀI TẬP TƯƠNG TÁC CHƯƠNG 6 (TRẮC NGHIỆM PHÂN BIỆT LỪA ĐẢO / AN TOÀN SỐ - 4 TÌNH HUỐNG)
  ch6Scenarios: [
    {
      id: "S1",
      text: "Tình huống 1: Có tin nhắn SMS gửi vào điện thoại báo 'Tài khoản ngân hàng của bạn bị khóa, hãy bấm vào link http://nganhang-kiemtra.xyz và nhập mật khẩu + mã OTP để mở lại'.",
      correct: "scam",
      explain: "Lừa đảo! Ngân hàng không bao giờ gửi link lạ yêu cầu nhập mật khẩu và mã OTP."
    },
    {
      id: "S2",
      text: "Tình huống 2: Cuối buổi thực hành tại phòng máy của Khoa CNTT, em bấm vào ảnh đại diện Gmail ở góc trên bên phải và chọn 'Đăng xuất' (Sign out) trước khi tắt máy.",
      correct: "safe",
      explain: "An toàn! Luôn đăng xuất tài khoản cá nhân trên máy tính dùng chung."
    },
    {
      id: "S3",
      text: "Tình huống 3: Một trang web lạ hiện thông báo 'Chúc mừng bạn trúng thưởng 01 laptop gaming, nộp trước 200.000đ phí vận chuyển qua thẻ cào để nhận máy'.",
      correct: "scam",
      explain: "Lừa đảo! Mọi thông báo trúng thưởng đòi nộp phí trước đều là bẫy chiếm đoạt tiền."
    },
    {
      id: "S4",
      text: "Tình huống 4: Đặt mật khẩu email có từ 8 ký tự trở lên bao gồm chữ HOA, chữ thường, chữ số và ký tự đặc biệt (ví dụ: Thud@2026), không đặt là 123456.",
      correct: "safe",
      explain: "An toàn! Mật khẩu mạnh giúp bảo vệ tài khoản khỏi bị dò tự động."
    }
  ]
};
