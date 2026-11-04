// ============================================================================
// FILE DỮ LIỆU BÀI GIẢNG & BÀI TẬP (data/course-data.js)
// -> THẦY/CÔ CHỈ CẦN SỬA NỘI DUNG Ở FILE NÀY ĐỂ CẬP NHẬT WEB MÀ KHÔNG CẦN ĐỤNG VÀO CODE!
// ============================================================================

window.COURSE_CONFIG = {
  schoolName: "TRƯỜNG CAO ĐẲNG BUÔN MA THUỘT",
  departmentName: "Khoa CNTT",
  courseTitle: "CỔNG THỰC HÀNH TIN HỌC (CDMH02.1) • HỆ 9+3",

  // 1. DANH SÁCH LỚP NGHỀ 9+3 (Có thể thêm lớp mới vào đây)
  classesList: [
    "Điện công nghiệp 9+3",
    "Công nghệ Ô tô 9+3",
    "Tin học ứng dụng 9+3",
    "Cắt gọt kim loại / Hàn 9+3",
    "May thời trang 9+3",
    "Kỹ thuật chế biến món ăn 9+3",
    "Thú y / Bảo vệ thực vật 9+3",
    "Lớp Trung cấp khác"
  ],

  // 2. BỘ 5 CÂU THỬ THÁCH GÕ TIẾNG VIỆT TELEX (CHƯƠNG 1 - BUỔI 2)
  telexChallenges: [
    {
      title: "CÂU 1/5: GÕ TÊN TRƯỜNG (20 điểm)",
      target: "Trường Cao đẳng Buôn Ma Thuột",
      hint: "💡 Gợi ý phím Telex: T-r-u-w-o-w-n-g-f  C-a-o  d-d-a-w-n-g-r  B-u-o-o-n  M-a  T-h-u-o-o-t-j"
    },
    {
      title: "CÂU 2/5: GÕ TÊN KHOA & HỆ ĐÀO TẠO (20 điểm)",
      target: "Khoa Công nghệ thông tin hệ trung cấp",
      hint: "💡 Gợi ý phím Telex: K-h-o-a  C-o-o-n-g  n-g-h-e-e-j  t-h-o-o-n-g  t-i-n  h-e-e-j  t-r-u-n-g  c-a-a-p-s"
    },
    {
      title: "CÂU 3/5: GÕ TÊN NGHỀ HỌC (20 điểm)",
      target: "Học nghề Điện công nghiệp và Sửa chữa ô tô",
      hint: "💡 Gợi ý phím Telex: H-o-c-j  n-g-h-e-e-f  D-d-i-e-e-n-j  c-o-o-n-g  n-g-h-i-e-e-p-j  v-a-f  S-u-w-a-r  c-h-u-w-a-x  o-o  t-o-o"
    },
    {
      title: "CÂU 4/5: GÕ ĐỊA CHỈ QUÊ QUÁN ĐẮK LẮK (20 điểm)",
      target: "Quê quán tại tỉnh Đắk Lắk Tây Nguyên",
      hint: "💡 Gợi ý phím Telex: Q-u-e-e  q-u-a-n-s  t-a-i-j  t-i-n-h-r  D-d-a-w-s-k  L-a-w-s-k  T-a-a-y  N-g-u-y-e-e-n"
    },
    {
      title: "CÂU 5/5: GÕ QUY TẮC LƯU BÀI PHÒNG MÁY (20 điểm)",
      target: "Em luôn lưu bài tập vào ổ đĩa D an toàn",
      hint: "💡 Gợi ý phím Telex: E-m  l-u-o-o-n  l-u-w-u  b-a-i-f  t-a-a-p-j  v-a-o-f  o-o-r  d-d-i-a-x  D  a-n  t-o-a-n-f"
    }
  ],

  // 3. THÔNG TIN CÁC CHƯƠNG HỌC (CHƯƠNG 2 ĐẾN CHƯƠNG 6)
  chaptersInfo: {
    2: {
      title: "CHƯƠNG 2: INTERNET & THƯ ĐIỆN TỬ (EMAIL)",
      icon: "🌐",
      desc: "Học sinh thực hành: Mở trình duyệt Chrome/Edge, tìm kiếm thông tin chuyên ngành, tải hình ảnh và đăng nhập gửi Email công việc."
    },
    3: {
      title: "CHƯƠNG 3: SOẠN THẢO VĂN BẢN WORD 2016",
      icon: "📄",
      desc: "Học sinh thực hành: Chọn khổ giấy A4, phông Times New Roman 14, căn lề, gõ Quốc hiệu - Tiêu ngữ, soạn Đơn xin phép, Thông báo và xuất file mở trên Word 2016 thật."
    },
    4: {
      title: "CHƯƠNG 4: BẢNG TÍNH ĐIỆN TỬ EXCEL 2016",
      icon: "📊",
      desc: "Học sinh thực hành: Nhập bảng dữ liệu, kẻ khung All Borders, gộp ô, tính + - * / và 5 hàm cơ bản SUM, AVERAGE, MAX, MIN, IF."
    },
    5: {
      title: "CHƯƠNG 5: THIẾT KẾ BÀI TRÌNH CHIẾU POWERPOINT",
      icon: "📽️",
      desc: "Học sinh thực hành: Tạo trang slide mới, gõ tiêu đề, chèn hình ảnh từ ổ D:\\, chọn màu nền Design và bấm F5 trình chiếu."
    },
    6: {
      title: "CHƯƠNG 6: AN TOÀN THÔNG TIN & KIỂM TRA CUỐI MÔN",
      icon: "🛡️",
      desc: "Học sinh thực hành: Đặt mật khẩu an toàn, quy tắc 3 Không chống lừa đảo, đăng xuất máy phòng thực hành và làm bài kiểm tra tổng hợp."
    }
  }
};