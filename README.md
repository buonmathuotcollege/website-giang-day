# 🎓 Cổng Giảng Dạy & Đánh Giá Năng Lực CNTT
**Tác giả:** CN. Phạm Tiến Đông (Giảng viên / Kỹ sư CNTT)  
**Domain chính:** `https://phamtiendong.name.vn`  
**Hạ tầng:** Astro 5 SSR + Tailwind CSS + Cloudflare Pages / Workers + Cloudflare D1 (SQLite Edge)

---

## 🌟 1. Cấu Trúc Hệ Thống & Tên Miền Phụ (Subdomains)

Website được xây dựng theo kiến trúc Astro 5 SSR hiện đại, phân tách rõ ràng giữa giao diện, nội dung bài giảng và cơ sở dữ liệu. Toàn bộ 6 môn học và cổng đánh giá năng lực đều được tích hợp qua hệ thống:

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
| **Cổng thực hành 10 bàn máy** | `/practice` | Huấn luyện Kỹ thuật viên & 10 Bàn máy xoay vòng |
| **Trang quản trị Giảng viên** | `/admin` | Quản lý điểm, lớp học, hồ sơ học sinh |

---

## 🛠️ 2. Hướng Dẫn Cấu Hình Cloudflare

### Bước 1: Cấu hình DNS Subdomains trên Cloudflare Dashboard
Vào **Cloudflare Dashboard** > Chọn tên miền `phamtiendong.name.vn` > **DNS** > **Records** > Thêm các bản ghi **CNAME** (Bật đám mây cam 🟧 Proxied):
- `CNAME` | `nanglucso` | trỏ về `<tên-pages-project>.pages.dev`
- `CNAME` | `kientruc`  | trỏ về `<tên-pages-project>.pages.dev`
- `CNAME` | `phancung`  | trỏ về `<tên-pages-project>.pages.dev`
- `CNAME` | `mang`      | trỏ về `<tên-pages-project>.pages.dev`
- `CNAME` | `lanwan`    | trỏ về `<tên-pages-project>.pages.dev`
- `CNAME` | `winlinux`  | trỏ về `<tên-pages-project>.pages.dev`
- `CNAME` | `danhgia`   | trỏ về `<tên-pages-project>.pages.dev`

Đồng thời vào **Pages** > Project `website-giang-day` > **Custom domains** > bấm **Set up a custom domain** và thêm các subdomain tương ứng vào dự án.

### Bước 2: Tạo Cơ sở dữ liệu D1
1. Vào **Cloudflare Dashboard** > **Workers & Pages** > **D1 SQL Database** > Bấm **Create database**.
2. Đặt tên: `giang-day-db`.
3. Bấm vào database vừa tạo > Thẻ **Console** > Copy toàn bộ nội dung file `db/schema.sql` dán vào và bấm **Execute** để khởi tạo cấu trúc bảng.
4. Vào lại **Pages** > Project của bạn > **Settings** > **Functions / Bindings** > mục **D1 database bindings**:
   - Variable name: `DB`
   - D1 database: chọn `giang-day-db`

### Bước 3: Đặt Mật khẩu Giảng viên (TEACHER_SECRET)
Tại **Pages** > **Settings** > **Environment variables**:
- Biến (Secret): `TEACHER_SECRET` = `Mật khẩu bảo mật cá nhân` (khuyến nghị trên 12 ký tự gồm chữ, số và ký tự đặc biệt).

---

## 💻 3. Phát Triển & Thêm Nội Dung Bài Giảng

- **Thêm bài giảng mới:** Tạo thêm file `.md` trong thư mục `src/content/<tên-môn>/` hoặc cập nhật danh sách chương trong `src/pages/courses/[courseSlug]/index.astro`.
- **Ngân hàng câu hỏi trắc nghiệm & vấn đáp:** Quản lý trong `src/data/questionBank.ts` và cơ sở dữ liệu Cloudflare D1.
