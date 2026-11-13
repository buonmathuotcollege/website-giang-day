// ============================================================================
// FILE QUẢN LÝ LỚP HỌC, DANH SÁCH HỌC SINH & BÀI TẬP (data/course-data.js)
// -> THẦY CHỈ CẦN SỬA FILE NÀY (HOẶC DÙNG MỤC "QUẢN LÝ LỚP & BÀI TẬP" TRÊN WEB)
// ============================================================================

window.COURSE_DATA = {
  portalTitle: "🎓 Cổng Thực Hành Tin Học 9+3 • Trường CĐ Buôn Ma Thuột",
  sendUrl: "/api/scores",

  // 1. QUẢN LÝ DANH SÁCH LỚP & HỌC SINH (HỖ TRỢ LỚP ĐƠN, GHÉP 2 LỚP, GHÉP 1/2 LỚP THEO CA)
  // Mẹo cho Thầy:
  // - Lớp học ghép 2 lớp: Ghi rõ mã lớp phía sau tên học sinh, VD: "01. Nguyễn Văn An (THUD)"
  // - Lớp tách 1/2 học ghép: Đặt tên lớp kèm "(Nửa lớp - Ca 1: STT 01-25)" để điểm danh chuẩn xác
  classRosters: {
    "Tin học ứng dụng 9+3 (K26A)": [
      "01. Nguyễn Văn An", "02. Trần Văn Ba", "03. Lê Thị Bích Cúc", "04. Phạm Minh Dũng",
      "05. Hoàng Quốc Đạt", "06. H'Hen Niê", "07. Y Đam San Êban", "08. Vũ Thị Hương Giang",
      "09. Đặng Gia Huy", "10. Bùi Tuấn Kiệt", "11. Nguyễn Thị Khánh Linh", "12. Trần Hoàng Long",
      "13. Y Minh Mlô", "14. H'Mai Кbuôr", "15. Ngô Bảo Nam", "16. Phan Trọng Nghĩa",
      "17. Lê Hồng Phúc", "18. Trương Minh Quân", "19. Đỗ Thanh Sơn", "20. Nguyễn Anh Tuấn"
    ],
    "Tin học ứng dụng 9+3 (K26B)": [
      "01. Nguyễn Hoàng Anh", "02. Trần Minh Bảo", "03. Lê Quốc Cường", "04. Phạm Thị Thùy Dương",
      "05. Y Duy Êban", "06. H'Lan Niê", "07. Hoàng Văn Hải", "08. Vũ Minh Hiếu",
      "09. Đặng Thị Thu Hoài", "10. Bùi Gia Hưng", "11. Nguyễn Tuấn Khang", "12. Trần Thị Ngọc Lan"
    ],
    "Lớp ghép: THUD K26A + Điện 9+3": [
      "01. Nguyễn Văn An (THUD K26A)", "02. Trần Văn Ba (THUD K26A)", "03. Lê Thị Bích Cúc (THUD K26A)",
      "04. Phạm Minh Dũng (THUD K26A)", "05. Hoàng Quốc Đạt (THUD K26A)",
      "06. Nguyễn Văn Bình (Điện 9+3)", "07. Trần Quốc Cường (Điện 9+3)", "08. Lê Minh Đức (Điện 9+3)",
      "09. Phạm Văn Hùng (Điện 9+3)", "10. Y Tâm Кbuôr (Điện 9+3)"
    ],
    "Lớp ghép 1/2: THUD K26B (Ca 1: STT 01-12) + Ô tô 9+3 (Nửa lớp)": [
      "01. Nguyễn Hoàng Anh (THUD - Ca 1)", "02. Trần Minh Bảo (THUD - Ca 1)", "03. Lê Quốc Cường (THUD - Ca 1)",
      "04. Phạm Thị Thùy Dương (THUD - Ca 1)", "05. Y Duy Êban (THUD - Ca 1)", "06. H'Lan Niê (THUD - Ca 1)",
      "07. Trần Quốc Anh (Ô tô - Nửa lớp)", "08. Nguyễn Minh Chiến (Ô tô - Nửa lớp)",
      "09. Lê Văn Đạt (Ô tô - Nửa lớp)", "10. Phạm Tuấn Hưng (Ô tô - Nửa lớp)"
    ],
    "Tin học ứng dụng 9+3 (Nửa lớp - Ca 2: STT 13-25)": [
      "13. Y Minh Mlô (Ca 2)", "14. H'Mai Кbuôr (Ca 2)", "15. Ngô Bảo Nam (Ca 2)",
      "16. Phan Trọng Nghĩa (Ca 2)", "17. Lê Hồng Phúc (Ca 2)", "18. Trương Minh Quân (Ca 2)",
      "19. Đỗ Thanh Sơn (Ca 2)", "20. Nguyễn Anh Tuấn (Ca 2)"
    ],
    "Điện công nghiệp 9+3": [
      "01. Nguyễn Văn Bình", "02. Trần Quốc Cường", "03. Lê Minh Đức", "04. Phạm Văn Hùng", "05. Y Tâm Кbuôr"
    ],
    "Công nghệ Ô tô 9+3": [
      "01. Trần Quốc Anh", "02. Nguyễn Minh Chiến", "03. Lê Văn Đạt", "04. Phạm Tuấn Hưng", "05. Y Vương Êban"
    ]
  },

  // 2. DANH SÁCH BUỔI HỌC
  sessions: [
    "Buổi 1", "Buổi 2", "Buổi 3", "Buổi 4", "Buổi 5", "Buổi 6", "Buổi 7",
    "Buổi 8", "Buổi 9", "Buổi 10", "Buổi 11", "Buổi 12", "Buổi 13", "Buổi 14"
  ],

  // 3. BÀI TẬP BƯỚC 3: LUYỆN GÕ TIẾNG VIỆT TELEX (5 CÂU)
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

  // 4. DANH SÁCH BÀI TẬP WORD Ở BƯỚC 4 (THẦY THÊM BÀI MỚI VÀO ĐÂY LÀ WEB TỰ TẠO NÚT CHỌN!)
  wordExercises: [
    {
      id: "word_don",
      buttonLabel: "Bài 1: Đơn xin nghỉ học",
      fileName: "DON_XIN_PHEP.docx",
      steps: [
        "Bước 1: Mở phần mềm Microsoft Word trên màn hình ➔ Chọn trang giấy trắng (Blank document).",
        "Bước 2: Vào thẻ Layout ➔ Chọn khổ giấy Size: A4 và căn lề Margins chuẩn (Trái 3cm, Phải 2cm).",
        "Bước 3: Vào thẻ Home ➔ Chọn phông chữ Times New Roman, cỡ chữ 14.",
        "Bước 4: Gõ Quốc hiệu, Tiêu ngữ, tên ĐƠN XIN NGHỈ HỌC (căn giữa, in đậm) và nội dung đơn.",
        "Bước 5: Bấm Ctrl + S ➔ Chọn Ổ đĩa (D:) ➔ Lưu tên tệp DON_XIN_PHEP.docx vào thư mục của em."
      ],
      sampleHtml: `
        <div class="text-center font-bold">
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br/>
          <span class="underline">Độc lập - Tự do - Hạnh phúc</span>
        </div>
        <div class="text-center font-bold text-base my-2">ĐƠN XIN NGHỈ HỌC</div>
        <p><strong>Kính gửi:</strong> Giáo viên chủ nhiệm và Khoa Công nghệ thông tin.</p>
        <p><strong>Em tên là:</strong> {{STUDENT_NAME}} – <strong>Lớp:</strong> {{CLASS_NAME}}.</p>
        <p><strong>Lý do:</strong> Hôm nay em bị ốm nên xin phép Thầy/Cô cho em nghỉ học 01 buổi thực hành.</p>
        <p>Em xin hứa sẽ chép bài và làm bù bài thực hành đầy đủ.</p>
        <div class="text-right mt-3">
          <em>{{TODAY_DATE}}</em><br/>
          <strong>Người viết đơn</strong><br/>
          {{STUDENT_NAME}}
        </div>
      `
    },
    {
      id: "word_thongbao",
      buttonLabel: "Bài 2: Thông báo bảo trì phòng máy",
      fileName: "THONG_BAO_PHONG_MAY.docx",
      steps: [
        "Bước 1: Mở Microsoft Word ➔ Chọn khổ giấy A4, phông chữ Times New Roman cỡ 14.",
        "Bước 2: Gõ tên trường và Khoa CNTT ở góc trên, gõ tiêu đề THÔNG BÁO (cỡ chữ 16, in đậm, căn giữa).",
        "Bước 3: Gõ 3 mục nội dung thông báo (Thời gian, Địa điểm phòng máy, Yêu cầu tắt máy và đăng xuất Gmail).",
        "Bước 4: Bôi đen các tiêu đề mục 1, 2, 3 và bấm nút B (Ctrl + B) để in đậm rõ ràng.",
        "Bước 5: Bấm Ctrl + S ➔ Lưu vào ổ đĩa D:\\ với tên tệp THONG_BAO_PHONG_MAY.docx."
      ],
      sampleHtml: `
        <div class="text-center font-bold">
          TRƯỜNG CAO ĐẲNG BUÔN MA THUỘT<br/>
          <span class="underline">KHOA CÔNG NGHỆ THÔNG TIN</span>
        </div>
        <div class="text-center font-bold text-base my-2">THÔNG BÁO LỊCH THỰC HÀNH &amp; BẢO TRÌ PHÒNG MÁY</div>
        <p><strong>1. Đối tượng áp dụng:</strong> Học sinh lớp {{CLASS_NAME}}.</p>
        <p><strong>2. Nội quy lưu bài:</strong> Toàn bộ bài tập thực hành phải lưu vào ổ đĩa <strong>D:\\</strong> (không lưu ở màn hình Desktop).</p>
        <p><strong>3. An toàn tài khoản:</strong> Cuối buổi học, các em bắt buộc đăng xuất tài khoản Gmail và tắt máy đúng quy định.</p>
        <div class="text-right mt-3">
          <em>{{TODAY_DATE}}</em><br/>
          <strong>Phụ trách phòng máy</strong>
        </div>
      `
    },
    {
      id: "word_bang",
      buttonLabel: "Bài 3: Kẻ bảng cấu hình máy tính",
      fileName: "BANG_LINH_KIEN_PC.docx",
      steps: [
        "Bước 1: Mở Microsoft Word ➔ Gõ tiêu đề BẢNG KÊ LINH KIỆN MÁY TÍNH (in đậm, căn giữa).",
        "Bước 2: Bấm thẻ Insert trên thanh công cụ ➔ Bấm nút Table ➔ Kéo chọn bảng 4 cột x 4 dòng.",
        "Bước 3: Gõ tiêu đề 4 cột: STT | Tên linh kiện | Thông số kỹ thuật | Tình trạng.",
        "Bước 4: Điền 3 dòng linh kiện (CPU Core i5, RAM DDR4 8GB, Ổ cứng SSD 256GB) và căn giữa cột STT.",
        "Bước 5: Bấm Ctrl + S ➔ Lưu vào ổ đĩa D:\\ với tên tệp BANG_LINH_KIEN_PC.docx."
      ],
      sampleHtml: `
        <div class="text-center font-bold text-base mb-2">BẢNG KÊ CẤU HÌNH MÁY TÍNH THỰC HÀNH</div>
        <p class="mb-2"><strong>Học sinh lập bảng:</strong> {{STUDENT_NAME}} – <strong>Lớp:</strong> {{CLASS_NAME}}</p>
        <table class="w-full border-collapse border border-slate-400 text-xs sm:text-sm">
          <thead>
            <tr class="bg-slate-200 font-bold text-center">
              <th class="border border-slate-400 p-1.5">STT</th>
              <th class="border border-slate-400 p-1.5">Tên linh kiện CNTT</th>
              <th class="border border-slate-400 p-1.5">Thông số kỹ thuật</th>
              <th class="border border-slate-400 p-1.5">Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="border border-slate-400 p-1.5 text-center">1</td><td class="border border-slate-400 p-1.5">Bộ vi xử lý (CPU)</td><td class="border border-slate-400 p-1.5">Intel Core i5</td><td class="border border-slate-400 p-1.5 text-center">Tốt</td></tr>
            <tr><td class="border border-slate-400 p-1.5 text-center">2</td><td class="border border-slate-400 p-1.5">Bộ nhớ trong (RAM)</td><td class="border border-slate-400 p-1.5">DDR4 8GB</td><td class="border border-slate-400 p-1.5 text-center">Tốt</td></tr>
            <tr><td class="border border-slate-400 p-1.5 text-center">3</td><td class="border border-slate-400 p-1.5">Ổ cứng lưu trữ</td><td class="border border-slate-400 p-1.5">SSD 256GB (Ổ C và D)</td><td class="border border-slate-400 p-1.5 text-center">Tốt</td></tr>
          </tbody>
        </table>
      `
    }
  ]
};
