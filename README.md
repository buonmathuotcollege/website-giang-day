# 🎓 Cổng Giảng Dạy & Đánh Giá Năng Lực CNTT
**Đơn vị:** Khoa Công nghệ Thông tin - Trường Cao đẳng Buôn Ma Thuột  
**Domain chính:** `https://phamtiendong.name.vn`  
**Hạ tầng:** Astro 5 + Tailwind CSS + Cloudflare Pages (Free) + Cloudflare D1 (SQLite Edge)

---

## 🌟 1. Cấu Trúc Hệ Thống & Tên Miền Phụ (Subdomains)

Website được xây dựng theo kiến trúc hiện đại, phân tách rõ ràng giữa giao diện, nội dung bài giảng và cơ sở dữ liệu. Toàn bộ 6 môn học và cổng đánh giá năng lực đều được tích hợp qua hệ thống định tuyến tự động:

| Môn học / Chức năng | Đường dẫn nội bộ | Tên miền phụ (Subdomain) |
|:---|:---|:---|
| **Cổng thông tin chung (Trang chủ)** | `/` | `phamtiendong.name.vn` |
| **Năng lực số** | `/courses/nang-luc-so` | `nanglucso.phamtiendong.name.vn` |
| **Kiến trúc máy tính & HĐH** | `/courses/kien-truc-may-tinh` | `kientruc.phamtiendong.name.vn` |
| **Phần cứng máy tính** | `/courses/phan-cung-may-tinh` | `phancung.phamtiendong.name.vn` |
| **Mạng căn bản** | `/courses/mang-can-ban` | `mang.phamtiendong.name.vn` |
| **Thiết kế & Quản trị LAN/WAN** | `/courses/thiet-ke-quan-tri-lan-wan` | `lanwan.phamtiendong.name.vn` |
| **Quản trị Windows Server/Linux & Ảo hóa** | `/courses/quan-tri-windows-linux` | `winlinux.phamtiendong.name.vn` |
| **Đánh giá năng lực chuyên môn** | `/assessment` | `danhgia.phamtiendong.name.vn` |
| **Cổng thực hành tại lớp** | `/practice` | Thực hành & nộp bài theo ca/máy |
| **Trang quản trị Giảng viên** | `/admin` | Quản lý điểm, lớp học, xuất Excel |

---

## 🛠️ 2. Hướng Dẫn Cấu Hình Cloudflare (Hoàn Toàn Miễn Phí)

### Bước 1: Cấu hình DNS Subdomains trên Cloudflare Dashboard
Vào **Cloudflare Dashboard** > Chọn tên miền `phamtiendong.name.vn` > **DNS** > **Records** > Thêm các bản ghi **CNAME** (Bật đám mây cam 🟧 Proxied):
- `CNAME` | `nanglucso` | trỏ về `<tên-pages-project>.pages.dev`
- `CNAME` | `kientruc`  | trỏ về `<tên-pages-project>.pages.dev`
- `CNAME` | `phancung`  | trỏ về `<tên-pages-project>.pages.dev`
- `CNAME` | `mang`      | trỏ về `<tên-pages-project>.pages.dev`
- `CNAME` | `lanwan`    | trỏ về `<tên-pages-project>.pages.dev`
- `CNAME` | `winlinux`  | trỏ về `<tên-pages-project>.pages.dev`
- `CNAME` | `danhgia`   | trỏ về `<tên-pages-project>.pages.dev`

Đồng thời vào **Pages** > Project `website-giang-day` > **Custom domains** > bấm **Set up a custom domain** và thêm các subdomain tương ứng vào dự án. Middleware (`functions/_middleware.js`) sẽ tự động điều hướng đúng môn học.

### Bước 2: Tạo Cơ sở dữ liệu D1
1. Vào **Cloudflare Dashboard** > **Workers & Pages** > **D1 SQL Database** > Bấm **Create database**.
2. Đặt tên: `giang-day-db`.
3. Bấm vào database vừa tạo > Thẻ **Console** > Copy toàn bộ nội dung file `db/schema.sql` dán vào và bấm **Execute** để tạo bảng và dữ liệu mẫu.
4. Vào lại **Pages** > Project của thầy > **Settings** > **Functions** > mục **D1 database bindings**:
   - Variable name: `DB`
   - D1 database: chọn `giang-day-db`

### Bước 3: Đặt Mật khẩu Giảng viên (TEACHER_SECRET)
Tại **Pages** > **Settings** > **Environment variables**:
- Biến: `TEACHER_SECRET` = `Mật khẩu thầy chọn` (mặc định: `BMTC2026`).

---

## 💻 3. Phát Triển & Nâng Cấp Sau Này

- **Thêm bài giảng mới:** Chỉ cần tạo thêm file `.md` trong thư mục `src/content/<tên-môn>/` hoặc cập nhật danh sách chương trong `src/pages/courses/[courseSlug]/index.astro`.
- **Thêm câu hỏi trắc nghiệm:** Bổ sung vào `functions/api/assessments.js` hoặc thêm trực tiếp vào bảng `assessment_questions` trong Cloudflare D1.
