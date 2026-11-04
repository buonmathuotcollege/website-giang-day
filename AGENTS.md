# GEMINI.md — BỘ QUY TẮC HƯỚNG DẪN AI PHÁT TRIỂN WEB (AI CONSTITUTION)
*(Áp dụng chung cho Gemini CLI, Claude Code `CLAUDE.md`, GitHub Copilot & Cursor `AGENTS.md`)*

**Dự án:** Cổng Thực Hành Tin Học (CDMH02.1) – Hệ Trung Cấp 9+3 (45 tiết: 15 LT + 30 TH)  
**Đơn vị:** Khoa Công nghệ thông tin – Trường Cao đẳng Buôn Ma Thuột  
**Kho lưu trữ:** `https://github.com/buonmathuotcollege/website-giang-day`  

---

## 1. NGUYÊN TẮC SƯ PHẠM HỆ TRUNG CẤP 9+3 (BẮT BUỘC TUÂN THỦ)
1. **Đối tượng người học:** Học sinh Trung cấp 9+3 (50 em/lớp, 2 em/máy, học lực yếu/trung bình, chưa từng dùng máy tính, không biết tiếng Anh).
2. **Giao diện "Đơn giản tối đa" (Simple Student Mode) & "Chế độ Máy chiếu" (Projector Mode):** Mặc định chỉ hiển thị thanh 4 bước lớn cho học sinh; toàn bộ menu nâng cao nằm trong nút `👨‍🏫 Menu Giáo Viên`.
3. **Thực học – Thực hành – Làm ra sản phẩm:** Luôn kết hợp tập thao tác trên Web với việc xuất file thực tế (`.doc`, `.xls`/`.xlsx`) để mở trên phần mềm Microsoft Word / Excel 2016 thật và lưu vào ổ đĩa `D:\TENNGHE_HOVATEN`.

---

## 2. QUY TẮC BẢO MẬT & TOÀN VẸN DỮ LIỆU (HARD CONSTRAINTS CHO AI)
1. **Chống XSS tuyệt đối (`escapeHtml`):** Mọi chuỗi do người dùng nhập (`studentName`, `className`, `station`, `sessionName`, `timestamp`, `status`) trước khi chèn vào `innerHTML` **bắt buộc phải bọc qua hàm `escapeHtml()`** hoặc gán bằng `textContent`.
2. **Chống CSV Formula Injection (`csvSafeCell`):** Khi xuất file `.csv`, mọi ô dữ liệu chuỗi phải đi qua `csvSafeCell()` (tự động nhân đôi dấu `"` và thêm dấu `'` phía trước nếu chuỗi bắt đầu bằng `=`, `+`, `-`, `@`) và có BOM UTF-8 (`\uFEFF`) ở đầu file.
3. **Giữ nguyên cấu trúc JSON của bản ghi điểm (`/api/scores`):**
   Không được tự ý đổi tên các trường JSON mà `cloudflare-worker.js` đang sử dụng:
   `{ recordId, dateOnly, timestamp, sessionName, station, studentName, className, mouseScore, telexScore, chAvgScore, grade10, status }`.
4. **Xác thực Bearer Token cho Giảng viên:** Mọi lệnh `GET /api/scores` và `DELETE /api/scores` phải gửi kèm header `Authorization: Bearer <TEACHER_SECRET>`.
5. **Chạy được khi phòng máy mất mạng (Offline-First):** Không dùng script `cdn.tailwindcss.com` biên dịch lúc chạy. Sử dụng `css/tailwind.css` đã biên dịch sẵn và các thư viện trong thư mục `vendor/` (`vendor/xlsx.full.min.js`, `vendor/confetti.browser.min.js`). Không tự ý thêm thư viện ngoài danh sách cho phép nếu chưa có bản lưu trong `vendor/`.

---

## 3. BA BỘ SKILL CHUYÊN SÂU ĐÃ TÍCH HỢP TRONG `.agents/skills/` (TỪ `vie-agentic-skills`)
Khi AI nhận yêu cầu thiết kế giao diện, tạo bài tập mới hoặc nâng cấp bảng điểm, hãy đọc và áp dụng nghiêm ngặt 3 file quy chuẩn trong thư mục `.agents/skills/`:
1. **`.agents/skills/impeccable-ui-93.md`** (*Giao diện `.impeccable` & WCAG AAA cho phòng máy 50 em*): Quy tắc 1 hành động chính/màn hình, cỡ chữ lớn cho Chế độ Máy Chiếu, vùng bấm chuột `≥ 44px`, và mô tả vị trí nút bấm bằng mắt thường.
2. **`.agents/skills/education-quiz-pedagogy.md`** (*Thiết kế bài tập 4 nhịp & Học theo cặp 2 em/máy*): Tình huống bắt lỗi thực tế ➔ Mô phỏng phản hồi tức thì ➔ Xuất file `.doc`/`.xls` mở trên Office 2016 thật ➔ Câu hỏi kiểm tra nhanh cuối buổi.
3. **`.agents/skills/learning-analytics-security.md`** (*Phân tích năng lực học tập & Bảo mật Bảng điểm*): Bộ lọc đa chiều theo Lớp/Buổi/Ngày, quy đổi thang 10, chống XSS (`escapeHtml`), chống CSV Injection (`csvSafeCell`), lưu khóa KV độc lập (`score:<recordId>`) và xác thực `Bearer TEACHER_SECRET`.
