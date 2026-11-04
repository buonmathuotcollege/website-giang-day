// ============================================================================
// FILE DỮ LIỆU BÀI GIẢNG & BÀI TẬP (data/course-data.js)
// Chuyên ngành trọng tâm: TRUNG CẤP TIN HỌC ỨNG DỤNG (HỆ 9+3)
// -> THẦY/CÔ CHỈ CẦN SỬA NỘI DUNG Ở FILE NÀY ĐỂ CẬP NHẬT WEB MÀ KHÔNG CẦN ĐỤNG VÀO CODE!
// ============================================================================

window.COURSE_CONFIG = {
  schoolName: "TRƯỜNG CAO ĐẲNG BUÔN MA THUỘT",
  departmentName: "Khoa CNTT",
  courseTitle: "CỔNG THỰC HÀNH TIN HỌC (CDMH02.1) • NGÀNH TIN HỌC ỨNG DỤNG 9+3",

  // 1. DANH SÁCH LỚP NGÀNH TIN HỌC ỨNG DỤNG 9+3 (Mặc định đầu tiên)
  classesList: [
    "Tin học ứng dụng 9+3 (K26A)",
    "Tin học ứng dụng 9+3 (K26B)",
    "Tin học ứng dụng 9+3 (K25)",
    "Điện công nghiệp 9+3",
    "Công nghệ Ô tô 9+3",
    "Cắt gọt kim loại / Hàn 9+3",
    "May thời trang 9+3",
    "Kỹ thuật chế biến món ăn 9+3",
    "Lớp Trung cấp khác"
  ],

  // 2. BỘ 5 CÂU THỬ THÁCH GÕ TIẾNG VIỆT TELEX (Gắn liền ngành Tin học ứng dụng 9+3)
  telexChallenges: [
    {
      title: "CÂU 1/5: GÕ TÊN TRƯỜNG (20 điểm)",
      target: "Trường Cao đẳng Buôn Ma Thuột",
      hint: "💡 Gợi ý phím Telex: T-r-u-w-o-w-n-g-f  C-a-o  d-d-a-w-n-g-r  B-u-o-o-n  M-a  T-h-u-o-o-t-j"
    },
    {
      title: "CÂU 2/5: GÕ TÊN KHOA & NGÀNH HỌC (20 điểm)",
      target: "Khoa Công nghệ thông tin ngành Tin học ứng dụng",
      hint: "💡 Gợi ý phím Telex: K-h-o-a  C-o-o-n-g  n-g-h-e-e-j  t-h-o-o-n-g  t-i-n  n-g-a-n-h-f  T-i-n  h-o-c-j  u-w-n-g-s  d-u-n-g-j"
    },
    {
      title: "CÂU 3/5: GÕ KỸ NĂNG NGHỀ TIN HỌC (20 điểm)",
      target: "Thực hành lắp ráp máy tính và quản trị mạng",
      hint: "💡 Gợi ý phím Telex: T-h-u-w-c-j  h-a-n-h-f  l-a-w-p-s  r-a-p-s  m-a-y-s  t-i-n-h-s  v-a-f  q-u-a-n-r  t-r-i-j  m-a-n-g-j"
    },
    {
      title: "CÂU 4/5: GÕ ĐỊA CHỈ QUÊ QUÁN ĐẮK LẮK (20 điểm)",
      target: "Quê quán tại tỉnh Đắk Lắk Tây Nguyên",
      hint: "💡 Gợi ý phím Telex: Q-u-e-e  q-u-a-n-s  t-a-i-j  t-i-n-h-r  D-d-a-w-s-k  L-a-w-s-k  T-a-a-y  N-g-u-y-e-e-n"
    },
    {
      title: "CÂU 5/5: GÕ QUY TẮC LƯU BÀI PHÒNG MÁY (20 điểm)",
      target: "Em luôn lưu bài tập vào thư mục ổ đĩa D an toàn",
      hint: "💡 Gợi ý phím Telex: E-m  l-u-o-o-n  l-u-w-u  b-a-i-f  t-a-a-p-j  v-a-o-f  t-h-u-w  m-u-c-j  o-o-r  d-d-i-a-x  D  a-n  t-o-a-n-f"
    }
  ],

  // 3. THÔNG TIN CÁC CHƯƠNG HỌC (Gắn với thực tiễn ngành Tin học ứng dụng)
  chaptersInfo: {
    2: {
      title: "CHƯƠNG 2: INTERNET & THƯ ĐIỆN TỬ (NGÀNH TIN HỌC ỨNG DỤNG)",
      icon: "🌐",
      desc: "Học sinh Tin học ứng dụng thực hành: Tra cứu thông số linh kiện máy tính (CPU, RAM, SSD, bộ phát Wi-Fi), tải hình ảnh thiết bị CNTT và gửi Email báo cáo kỹ thuật có đính kèm tệp."
    },
    3: {
      title: "CHƯƠNG 3: SOẠN THẢO VĂN BẢN WORD 2016",
      icon: "📄",
      desc: "Học sinh Tin học ứng dụng thực hành: Soạn Đơn xin phép, Thông báo bảo trì phòng máy tính, kẻ Bảng cấu hình linh kiện máy tính / Nội quy phòng thực hành Tin học và xuất file mở trên Word 2016 thật."
    },
    4: {
      title: "CHƯƠNG 4: BẢNG TÍNH ĐIỆN TỬ EXCEL 2016",
      icon: "📊",
      desc: "Học sinh Tin học ứng dụng thực hành: Lập Bảng báo giá linh kiện máy tính (RAM, SSD, Màn hình, Chuột, Phím), tính Thành tiền và 5 hàm SUM, AVERAGE, MAX, MIN, IF."
    },
    5: {
      title: "CHƯƠNG 5: THIẾT KẾ BÀI TRÌNH CHIẾU POWERPOINT",
      icon: "📽️",
      desc: "Học sinh Tin học ứng dụng thực hành: Thiết kế 3–4 trang chiếu giới thiệu ngành Tin học ứng dụng và cấu tạo bộ máy tính để bàn, bấm F5 trình chiếu."
    },
    6: {
      title: "CHƯƠNG 6: AN TOÀN THÔNG TIN & KIỂM TRA CUỐI MÔN",
      icon: "🛡️",
      desc: "Học sinh Tin học ứng dụng thực hành: Bảo mật mật khẩu quản trị, quy tắc 3 Không chống mã độc/lừa đảo mạng, đăng xuất máy phòng thực hành và kiểm tra tổng hợp."
    }
  }
};
