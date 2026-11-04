# Cổng Thực Hành Tin Học 9+3 (Full-Stack Siêu Gọn + Tự Động Hóa Backend & CSDL)

## 1. Điểm đột phá của gói Full-Stack này
Thầy **không cần bấm `Edit code` trên Cloudflare** và **không cần gõ lệnh SQL tạo bảng bằng tay** nữa!
- **`wrangler.toml` + `cloudflare-worker.js` + `functions/api/scores.js`:** Khi thầy đẩy (`git push`) thư mục này lên GitHub, Cloudflare sẽ tự động kích hoạt cả **Giao diện Web tĩnh** lẫn **Backend API (`/api/scores`)**,これにより mở khóa mục **Variables and Secrets** và **Bindings** trên Cloudflare!
- **Tự động tạo bảng SQL (Auto-Migration):** Ngay khi học sinh đầu tiên bấm nộp điểm, Backend sẽ tự động chạy lệnh `CREATE TABLE IF NOT EXISTS submissions` trong CSDL D1 mà thầy không cần gõ lệnh SQL thủ công.

## 2. Cấu trúc chỉ gồm các tệp cốt lõi cực dễ quản lý
```text
website-giang-day/
├── index.html                  # Giao diện 5 bước tối giản (Giống 100% ảnh mẫu)
├── data/
│   └── course-data.js          # FILE DUY NHẤT THẦY CẦN SỬA KHI ĐỔI LỚP / ĐỔI CÂU HỎI
├── functions/
│   └── api/
│       └── scores.js           # Backend API tự động cho Cloudflare Pages
├── cloudflare-worker.js        # Backend API tự động cho Cloudflare Workers
├── wrangler.toml               # Cấu hình bật song song Backend + Web tĩnh trên Cloudflare
└── schema.sql                  # File cấu trúc SQL dự phòng
```
