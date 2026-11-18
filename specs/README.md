# 📁 Kho Đặc Tả Tính Năng Dự Án (Specifications Repository)

Thư mục này lưu trữ toàn bộ các bản đặc tả tính năng, kế hoạch kiến trúc và danh mục công việc kỹ thuật theo tiêu chuẩn **GitHub Spec Kit** (`github/spec-kit`).

## Quy ước đặt tên thư mục
Mỗi tính năng được quản lý trong một thư mục riêng theo cấu trúc:
`specs/[###-ten-tinh-nang]/`
- `###`: Số thứ tự tăng dần gồm 3 chữ số (`001`, `002`, `003`...)
- `ten-tinh-nang`: Tên rút gọn dạng kebab-case mô tả hành động và danh từ

## Các tệp tài liệu trong mỗi thư mục đặc tả
1. **`spec.md`**: Bản đặc tả yêu cầu, kịch bản người dùng (User Stories P1, P2...), điều kiện nghiệm thu (Acceptance Criteria).
2. **`plan.md`**: Bản thiết kế kỹ thuật, mô hình dữ liệu, cấu trúc component, kiểm tra rà soát Hiến chương (Constitution Check).
3. **`tasks.md`**: Danh mục nhiệm vụ cụ thể tuần tự kèm hộp kiểm `[ ]` và `[x]`.

## Danh mục các bản đặc tả hiện có
- [001-portal-hub-and-hsg-practical](file:///d:/website-giang-day/specs/001-portal-hub-and-hsg-practical/spec.md): Cổng Portal Hub 5 Phân Khu & Hệ Thống Thi Thực Hành HSG Phần Cứng - Mạng *(Hoàn thành & Nghiệm thu 100%)*
