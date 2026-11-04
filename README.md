# Cổng Thực Hành Tin Học 9+3 (Giao diện Tối Giản 5 Bước + Backend D1 SQL)

## 1. Cấu trúc 4 Tệp Cốt Lõi (Siêu gọn, dễ nâng cấp)
```text
website-giang-day/
├── index.html             # Giao diện 5 bước tối giản (Giống 100% thiết kế chuẩn)
├── data/
│   └── course-data.js     # NƠI DUY NHẤT CẦN SỬA KHI ĐỔI DANH SÁCH LỚP HOẶC CÂU HỎI
├── cloudflare-worker.js   # Backend API kết nối Cơ sở dữ liệu Cloudflare D1
├── schema.sql             # Cấu trúc bảng SQL lưu điểm vĩnh viễn trên Cloudflare D1
└── wrangler.toml          # Cấu hình kết nối Cloudflare
```

## 2. Cách sửa nội dung bài học trong 10 giây
Thầy chỉ cần mở file **`data/course-data.js`**:
- Muốn thêm lớp mới: thêm dòng tên lớp vào mảng `classes: [...]`.
- Muốn đổi câu gõ tiếng Việt Telex: sửa chữ trong mảng `telexSentences: [...]`.

## 3. Cách mở Bảng điểm Giảng viên (Đã ẩn khỏi màn hình học sinh)
- Nháy đúp chuột vào dòng tiêu đề **`🎓 Cổng Thực Hành Tin Học 9+3`** ở trên cùng (hoặc vào địa chỉ `https://phamtiendong.name.vn/#/gv`).
