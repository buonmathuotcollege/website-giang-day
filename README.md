# Cổng Thực Hành Tin Học 9+3 – Trường Cao Đẳng Buôn Ma Thuột (CDMH02.1)

> **Mô tả kho lưu trữ (GitHub About Description):**  
> `Cổng thực hành kỹ năng số và Tin học ứng dụng (CDMH02.1) dành cho học sinh Trung cấp hệ 9+3 – Khoa CNTT Trường Cao đẳng Buôn Ma Thuột. Tích hợp luồng học 5 bước, chấm gõ Telex NFC, mô phỏng Word/Excel và bảng điểm Cloudflare.`  
> **Chủ đề gợi ý (GitHub Topics):** `education` `vietnam` `vocational-training` `digital-literacy` `telex` `cloudflare-workers` `zero-build`

---

## 1. Kiến trúc Mô-đun v5 (`website-giang-day/`)
```text
website-giang-day/
├── index.html                        # Giao diện Luồng 5 Bước cho Học sinh & Cổng /gv cho Giảng viên (~42 KB)
├── css/
│   ├── tailwind.css                  # CSS Tailwind đã biên dịch sẵn (Chạy mượt cho phòng máy 50 em)
│   └── style.css                     # Hiệu ứng, Chế độ Sáng/Tối (Dark Mode) & Chế độ Máy Chiếu
├── data/
│   └── course-data.js                # Danh sách lớp xổ xuống (Roster), Chuẩn Năng Lực Số (NLS) & Câu hỏi
├── js/
│   ├── ch1-mouse.js                  # Mô-đun 1: Quản lý trạng thái (Lưu tự động LocalStorage) & 5 bài Cầm chuột
│   ├── ch1-telex.js                  # Mô-đun 2: Chấm gõ Telex chuẩn Unicode NFC, phân biệt HOA/thường, chặn Paste
│   ├── ch3-word.js                   # Mô-đun 3: Thực hành Word (.docx), Excel công thức sống (.xls) & An toàn số
│   ├── scores.js                     # Mô-đun 4: Nộp điểm trung thực (cảnh báo cam khi lỗi) & Bảng điểm Giảng viên
│   └── app.js                        # Mô-đun 5: Điều hướng 5 bước cố định & Cổng ẩn Giảng viên (#/gv hoặc /gv)
├── vendor/
│   ├── xlsx.full.min.js              # Bộ xuất bảng tính Excel có công thức chạy 100% Offline
│   └── confetti.browser.min.js       # Hiệu ứng pháo hoa khích lệ chạy 100% Offline
├── tests/
│   └── test_scoring_and_telex.mjs    # Bộ kiểm thử tự động (Telex NFC, Điểm trọng số, Chống XSS & CSV Injection)
├── .github/workflows/
│   └── ci-tests.yml                  # GitHub Actions tự động kiểm tra chất lượng mỗi khi git push
├── cloudflare-worker.js              # Worker API (/api/scores): Gom điểm theo Bucket Lớp-Ngày, TTL 180 ngày
├── GEMINI.md / CLAUDE.md / AGENTS.md # Quy tắc hướng dẫn AI phát triển web
└── LICENSE                           # Bản quyền MIT & Học liệu mở
```

---

## 2. Hướng dẫn Triển khai & Bảo mật Bảng điểm trên Cloudflare
1. **Khuyên dùng:** Kết nối kho GitHub với **Cloudflare Pages** (hoặc **GitHub Pages**) để phân phối tệp tĩnh tốc độ cao; dùng **Cloudflare Worker** cho đường dẫn `/api/scores`.
2. **Cấu hình Biến môi trường Bí mật (Bắt buộc trước buổi dạy):**
   - Vào Cloudflare Worker ➔ **Settings** ➔ **Variables and Secrets** ➔ Đặt biến **`TEACHER_SECRET`** (hoặc **`ADMIN_TOKEN`**, Worker hỗ trợ cả hai tên biến này).
   - **Không có mật khẩu mặc định trong mã nguồn:** Nếu chưa đặt biến này trên Cloudflare, lệnh xem/xóa điểm sẽ trả về lỗi `HTTP 503 Service Unavailable`.
3. **Cách Giảng viên mở Bảng điểm Lớp học (Đã ẩn hoàn toàn khỏi giao diện học sinh):**
   - **Cách 1:** Truy cập địa chỉ `https://phamtiendong.name.vn/#/gv` (hoặc `https://phamtiendong.name.vn/gv`).
   - **Cách 2:** Nháy đúp chuột trái vào biểu tượng mũ cử nhân `🎓` ở góc trên cùng bên trái màn hình.
   - Nhập mã bí mật vào ô **`🔑 Mã GV`** rồi bấm **`🔄 Làm mới dữ liệu`**.
