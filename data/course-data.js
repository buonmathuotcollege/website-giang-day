// ============================================================================
// FILE CẤU HÌNH NỘI DUNG BÀI HỌC (data/course-data.js)
// -> THẦY CHỈ CẦN SỬA FILE NÀY ĐỂ ĐỔI DANH SÁCH LỚP, CÂU HỎI TELEX HOẶC BÀI WORD!
// ============================================================================

window.COURSE_DATA = {
  // 1. Tiêu đề nhỏ trên cùng
  portalTitle: "🎓 Cổng Thực Hành Tin Học 9+3 • Trường CĐ Buôn Ma Thuột",

  // 2. Đường dẫn gửi điểm về Backend Cloudflare Worker
  sendUrl: "/api/scores",

  // 3. Danh sách lớp (Hiện trong ô chọn "Lớp của em")
  classes: [
    "Tin học ứng dụng 9+3",
    "Tin học ứng dụng 9+3 (K26A)",
    "Tin học ứng dụng 9+3 (K26B)",
    "Tin học ứng dụng 9+3 (K25)",
    "Điện công nghiệp 9+3",
    "Công nghệ Ô tô 9+3",
    "May thời trang 9+3",
    "Kỹ thuật chế biến món ăn 9+3"
  ],

  // 4. Danh sách buổi học (Hiện trong ô chọn "Buổi học")
  sessions: [
    "Buổi 1", "Buổi 2", "Buổi 3", "Buổi 4", "Buổi 5", "Buổi 6", "Buổi 7",
    "Buổi 8", "Buổi 9", "Buổi 10", "Buổi 11", "Buổi 12", "Buổi 13", "Buổi 14"
  ],

  // 5. Bài tập Bước 2: Luyện Cầm Chuột (5 bài từ dễ đến khó, mỗi bài 20 điểm = 100 điểm)
  mouseTasks: [
    { id: 1, name: "Bài 1: Di chuột chạm mục tiêu", goal: 5, points: 20, desc: "Trượt nhẹ con chuột trên bàn để đưa mũi tên chạm vào 5 hình tròn màu xanh." },
    { id: 2, name: "Bài 2: Bấm chuột trái (1 cái)", goal: 5, points: 20, desc: "Dùng ngón trỏ bấm nhẹ 1 cái vào nút chuột bên TRÁI lên các ô màu xanh." },
    { id: 3, name: "Bài 3: Nháy đúp chuột trái (2 cái nhanh)", goal: 4, points: 20, desc: "Dùng ngón trỏ bấm nhanh 2 cái liên tiếp vào biểu tượng chiếc cặp màu vàng để mở thư mục." },
    { id: 4, name: "Bài 4: Bấm chuột phải đổi tên (Rename)", goal: 4, points: 20, desc: "Dùng ngón giữa bấm nút chuột bên PHẢI vào thư mục ➔ Bấm chuột trái chọn dòng Rename." },
    { id: 5, name: "Bài 5: Kéo thả tệp vào ổ đĩa D:\\", goal: 3, points: 20, desc: "Ấn giữ nút chuột trái vào tệp bài tập, kéo sang khung Ổ đĩa D:\\ rồi thả tay ra." }
  ],

  // 6. Bài tập Bước 3: Luyện Gõ Tiếng Việt Telex (5 câu, mỗi câu 20 điểm = 100 điểm)
  telexSentences: [
    {
      target: "Trường Cao đẳng Buôn Ma Thuột",
      hint: "Gợi ý gõ: T-r-u-w-o-w-n-g-f  C-a-o  d-d-a-w-n-g-r  B-u-o-o-n  M-a  T-h-u-o-o-t-j"
    },
    {
      target: "Ngành Tin học ứng dụng thực hành",
      hint: "Gợi ý gõ: N-g-a-n-h-f  T-i-n  h-o-c-j  u-w-n-g-s  d-u-n-g-j  t-h-u-w-c-j  h-a-n-h-f"
    },
    {
      target: "Lắp ráp máy tính và quản trị mạng",
      hint: "Gợi ý gõ: L-a-w-p-s  r-a-p-s  m-a-y-s  t-i-n-h-s  v-a-f  q-u-a-n-r  t-r-i-j  m-a-n-g-j"
    },
    {
      target: "Em học tập tại tỉnh Đắk Lắk Tây Nguyên",
      hint: "Gợi ý gõ: E-m  h-o-c-j  t-a-a-p-j  t-a-i-j  t-i-n-h-r  D-d-a-w-s-k  L-a-w-s-k  T-a-a-y  N-g-u-y-e-e-n"
    },
    {
      target: "Em luôn lưu bài tập vào ổ đĩa D an toàn",
      hint: "Gợi ý gõ: E-m  l-u-o-o-n  l-u-w-u  b-a-i-f  t-a-a-p-j  v-a-o-f  o-o-r  d-d-i-a-x  D  a-n  t-o-a-n-f"
    }
  ],

  // 7. Bài tập Bước 4: Thực hành Word & Excel (Có thể thêm bài mới bất kỳ lúc nào)
  wordChecklist: [
    "Bước 1: Mở phần mềm Microsoft Word trên màn hình nền ➔ Chọn trang giấy trắng (Blank document).",
    "Bước 2: Vào thẻ Layout ➔ Chọn khổ giấy Size: A4 và căn lề Margins chuẩn.",
    "Bước 3: Vào thẻ Home ➔ Chọn phông chữ Times New Roman, cỡ chữ 14.",
    "Bước 4: Bật chữ V màu đỏ của Unikey ➔ Gõ Đơn xin nghỉ học (hoặc kẻ bảng danh sách thiết bị).",
    "Bước 5: Bấm Ctrl + S ➔ Chọn Ổ đĩa (D:) ➔ Lưu tệp .docx vào đúng thư mục tên mình."
  ]
};
