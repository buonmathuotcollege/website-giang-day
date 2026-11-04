# Cổng Thực Hành Tin Học 9+3 – Trường Cao Đẳng Buôn Ma Thuột (CDMH02.1)

Hệ thống học tập và thực hành kỹ năng số trực quan dành cho học sinh Trung cấp hệ 9+3 (45 tiết: 15 LT + 30 TH), thiết kế theo kiến trúc **Mô-đun không cần bước Build (Zero-Build Modular Architecture)** và **Chạy được cả khi phòng máy mất mạng (Offline-First)**.

## 1. Cấu trúc thư mục (`website-giang-day/`)
```text
website-giang-day/
├── index.html                  # Khung giao diện chính (Siêu nhẹ ~38 KB, đã tách sạch CSS & JS)
├── css/
│   ├── tailwind.css            # CSS Tailwind đã biên dịch sẵn (Không cần tải cdn.tailwindcss.com)
│   └── style.css               # Hiệu ứng chuyển động, Chế độ Học sinh tối giản & Chế độ Máy chiếu
├── data/
│   └── course-data.js          # NƠI GIẢNG VIÊN SỬA NỘI DUNG (Danh sách lớp, Câu hỏi Telex, Mô tả 6 chương)
├── js/
│   ├── app.js                  # Bộ máy điều khiển chính, Mouse Trainer, Telex & Bảng điểm lớp học
│   └── chapters/
│       └── ch2-to-6.js         # Mô-đun thực hành Chương 2 (Gmail), Chương 3 (Word), Chương 4 (Excel), Chương 5-6
├── vendor/
│   ├── xlsx.full.min.js        # Bộ xuất bảng tính Excel có công thức chạy Offline (Không phụ thuộc CDN ngoài)
│   └── confetti.browser.min.js # Hiệu ứng pháo hoa khích lệ chạy Offline
├── cloudflare-worker.js        # Mã nguồn Cloudflare Worker có xác thực Bearer Token & lưu khóa KV độc lập
├── GEMINI.md                   # Quy tắc hướng dẫn AI phát triển web (Bản sao: AGENTS.md, CLAUDE.md)
├── AI_PROMPTS_LIBRARY.md       # Thư viện câu lệnh mẫu để Giảng viên điều khiển AI nâng cấp
├── .gitignore                  # Quy tắc bỏ qua file rác hệ thống
└── LICENSE                     # Bản quyền mã nguồn & học liệu
```

## 2. Hướng dẫn Triển khai (GitHub Pages / Cloudflare Worker + KV)
1. **Cách 1 (Khuyên dùng – Nhanh nhất): GitHub Pages / Cloudflare Pages kết hợp Worker API**
   - Đưa toàn bộ thư mục trong gói ZIP lên nhánh `main` của kho `buonmathuotcollege/website-giang-day`.
   - Bật **GitHub Pages** (hoặc **Cloudflare Pages**) để phân phối các file tĩnh (`index.html`, `css/`, `js/`, `vendor/`) với tốc độ cao.
2. **Cách 2: Chạy trọn gói qua Cloudflare Worker + Gắn KV Lưu Điểm Vĩnh Viễn**
   - Trong Cloudflare Dashboard ➔ **Workers & Pages** ➔ **KV** ➔ Tạo một Namespace tên là `BMTC_SCORES_KV`.
   - Vào Worker `website-giang-day` ➔ **Settings** ➔ **Bindings** ➔ Thêm KV Namespace Binding với tên biến là **`SCORES_KV`**.
   - Vào **Settings** ➔ **Variables and Secrets** ➔ Thêm biến môi trường **`TEACHER_SECRET`** (ví dụ đặt mật khẩu của thầy là `BMTC2026`).
   - Dán nội dung file `cloudflare-worker.js` vào mục **Edit code** và bấm **Deploy**.

## 3. Quy trình Kiểm thử Thủ công trước khi Commit (Manual QA Checklist)
- [ ] **Kiểm tra Chế độ Học sinh 9+3 & Chế độ Máy chiếu:** Bấm qua lại 4 nút `1️⃣ ➔ 2️⃣ ➔ 3️⃣ ➔ 4️⃣`, bấm thử nút `📽️ Chế độ Máy Chiếu` và `👨‍🏫 Menu Giáo Viên`.
- [ ] **Kiểm tra chống XSS & CSV Injection:** Nhập thử tên học sinh có ký tự `<script>alert(1)</script>` hoặc `=SUM(1,2)` ➔ Bấm nộp điểm ➔ Mở Bảng điểm Giảng viên kiểm tra tên hiển thị an toàn dưới dạng chữ thường và xuất file `.CSV` có dấu nháy bảo vệ `'=SUM(1,2)`.
- [ ] **Kiểm tra xác thực Mã Giảng viên:** Tại tab `📊 BẢNG ĐIỂM LỚP HỌC`, thử nhập sai ô `🔑 Mã GV` ➔ Hệ thống báo `🔒 Sai Mã GV` và chặn quyền xóa danh sách.
