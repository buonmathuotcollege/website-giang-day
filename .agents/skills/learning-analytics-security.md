---
name: learning-analytics-security
category: education-security
source: huytran1120/vie-agentic-skills (learning-analytics + role-based-access-control)
target: Cổng Thực Hành Tin Học 9+3 (CDMH02.1) - Trường CĐ Buôn Ma Thuột
---

# SKILL 3: QUY CHUẨN THỐNG KÊ BẢNG ĐIỂM LỚP HỌC & BẢO MẬT DỮ LIỆU (LEARNING ANALYTICS & SECURITY)

## 1. Chỉ số Thống kê Năng lực Thực hành cho Giảng viên (Actionable Learning Analytics)
Bảng điểm Giảng viên (`📊 BẢNG ĐIỂM LỚP HỌC`) phải giúp Giảng viên nhìn lướt qua trong 5 giây biết ngay học sinh nào đang yếu kỹ năng gì để xuống tận bàn hỗ trợ:
- **4 Thẻ KPI đầu bảng:** Tổng số học sinh đã nộp | Số em Đạt chuẩn (`≥ 5.0đ`) | Điểm Cầm Chuột trung bình | Điểm Gõ Telex trung bình.
- **Bộ lọc đa chiều:** Lọc theo **Lớp nghề 9+3**, lọc theo **Buổi học (`Buổi 1` ➔ `Buổi 14`)**, lọc theo **Ngày nộp** và tìm kiếm theo **Tên học sinh / Số máy**.
- **Quy đổi điểm chuẩn Thang 10:** Tự động tổng hợp điểm từ các mô-đun (`mouseScore`, `telexScore`, `chAvgScore`) sang thang điểm 10 (`grade10`) và phân loại trực quan: **`ĐẠT`** (`≥ 5.0`) hoặc **`Cần luyện thêm`** (`< 5.0`).

## 2. Năm Quy tắc Bảo mật & Chống mất điểm bắt buộc (Hard Security Rules)
1. **Chống XSS (`escapeHtml`):** 100% dữ liệu do học sinh nhập (`studentName`, `className`, `station`, `sessionName`, `timestamp`, `status`) phải bọc qua `escapeHtml()` trước khi đưa vào `innerHTML`.
2. **Chống CSV Formula Injection (`csvSafeCell`):** Mọi ô xuất ra file `.csv` phải đi qua `csvSafeCell()` (nhân đôi dấu `"` và thêm dấu `'` nếu bắt đầu bằng `=`, `+`, `-`, `@`) kèm mã BOM UTF-8 (`\uFEFF`) để mở trực tiếp bằng Microsoft Excel 2016 tiếng Việt không lỗi phông.
3. **Khóa bản ghi độc lập (`score:<recordId>`):** Mỗi học sinh lưu thành 1 khóa KV riêng biệt theo công thức `Ngày|Lớp|Buổi|Số máy|Họ tên` để 25–50 máy nộp bài cùng lúc không bao giờ ghi đè lên nhau.
4. **Phân quyền Học sinh vs Giảng viên (`Bearer TEACHER_SECRET`):** Học sinh chỉ có quyền `POST /api/scores`; mọi thao tác xem toàn lớp (`GET /api/scores`) hoặc xóa bảng điểm (`DELETE /api/scores`) bắt buộc phải gửi kèm Header `Authorization: Bearer <TEACHER_SECRET>`.
5. **Offline-First (`vendor/` & `css/tailwind.css`):** Không phụ thuộc vào CDN biên dịch lúc chạy để phòng máy mất Internet vẫn dạy và chấm điểm bình thường tại máy.
