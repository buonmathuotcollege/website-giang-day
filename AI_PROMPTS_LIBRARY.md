# BỘ CÂU LỆNH (PROMPT) MẪU ĐỂ THẦY/CÔ ĐIỀU KHIỂN AI NÂNG CẤP WEB
*(Dùng cho Gemini CLI, GitHub Copilot, Cursor hoặc dán trực tiếp vào khung chat Gemini)*

Nhờ có file `GEMINI.md` đặt sẵn trong kho GitHub `buonmathuotcollege/website-giang-day`, từ nay mỗi khi muốn nâng cấp trang web `phamtiendong.name.vn`, thầy chỉ cần copy 1 trong các câu lệnh ngắn dưới đây:

---

### Mẫu 1: Thêm đề bài hoặc đổi câu hỏi cho lớp mới (Sửa `data/course-data.js`)
> **Prompt:**  
> "Đọc quy tắc trong `GEMINI.md` và cập nhật file `data/course-data.js`: Thêm lớp `[Tên lớp mới]` vào danh sách lớp, đồng thời đổi 5 câu thử thách gõ tiếng Việt Telex ở Chương 1 sang chủ đề `[Tên chủ đề/ngành nghề]`, giữ nguyên gợi ý phím gõ Telex từng chữ."

---

### Mẫu 2: Nâng cấp Chương 5 (Mô phỏng Thiết kế Slide PowerPoint 2016 trên Web)
> **Prompt:**  
> "Dựa trên kiến trúc trong `GEMINI.md`, hãy nâng cấp mục `chNum === 5` trong `js/app.js` thành **Bàn Tập Thiết Kế PowerPoint 2016**:  
> 1. Có khung chọn 3 mẫu màu nền (`Design Themes`), ô gõ Tiêu đề trang chiếu và 3 gạch đầu dòng giới thiệu nghề học.  
> 2. Có nút chọn chèn hình ảnh minh họa nghề (Điện, Ô tô, Hàn, May) và nút bấm **`📽️ Trình chiếu toàn màn hình (F5)`** để học sinh xem thử.  
> 3. Có bảng Checklist 5 bước mở phần mềm PowerPoint 2016 thật trên máy tính và chấm điểm 100đ đồng bộ vào Bảng điểm lớp học."

---

### Mẫu 3: Nâng cấp Chương 6 (Trò chơi Tình huống An toàn thông tin & Đề thi thử cuối môn)
> **Prompt:**  
> "Dựa trên `GEMINI.md`, hãy nâng cấp mục `chNum === 6` trong `js/app.js` thành 2 phần:  
> 1. **Trò chơi Bắt Lỗi Lừa Đảo Mạng (3 Không):** Hiển thị 5 tin nhắn/email thực tế (tin nhắn trúng thưởng xe máy, giả danh ngân hàng hỏi mã OTP, mượn tiền qua Zalo, quên đăng xuất máy phòng thực hành) để học sinh bấm chọn *An toàn* hoặc *Lừa đảo*.  
> 2. **Đề Kiểm Tra Cuối Môn 20 Câu Trắc Nghiệm + Thực hành tổng hợp:** Tự động chấm điểm thang 10 và gửi kết quả về `/api/scores` cho giảng viên."

---

### Mẫu 4: Thêm tính năng Biểu đồ thống kê điểm cho Giảng viên
> **Prompt:**  
> "Nhúng thư viện `Chart.js` qua CDN vào `index.html` và thêm một biểu đồ cột trong tab `📊 BẢNG ĐIỂM LỚP HỌC (THỐNG KÊ GV)` để thống kê tỷ lệ học sinh Đạt / Cần luyện thêm theo từng lớp nghề 9+3."
