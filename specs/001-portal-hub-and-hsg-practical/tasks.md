# Tasks: Cổng Portal Hub 5 Phân Khu & Hệ Thống Thi Thực Hành HSG

**Input**: Tài liệu thiết kế từ `specs/001-portal-hub-and-hsg-practical/`  
**Trạng thái**: Hoàn tất 100% (All Completed & Verified)

---

## Phase 1: Setup & Cơ Sở Hạ Tầng (Shared Infrastructure)
- [x] T001 Khởi tạo cấu trúc dự án và định tuyến Astro cho các chuyên đề kỹ thuật (`/courses/*`)
- [x] T002 Cấu hình Tailwind CSS theo ngôn ngữ thiết kế Minimalist Slate/Zinc (`shadcn/ui`)
- [x] T003 Thiết lập lưu trữ `localStorage` client-side chống mất dữ liệu khi mất mạng

## Phase 2: User Story 1 - Portal Hub 5 Phân Khu Trang Chủ (P1)
- [x] T004 Thiết kế Component `CourseQuickLookup.astro` hỗ trợ tìm kiếm nhanh bài giảng theo từ khóa
- [x] T005 Nâng cấp `src/pages/index.astro` thành Portal Hub với 5 phân khu đào tạo rõ ràng
- [x] T006 Tối ưu hóa hiển thị trên màn hình điện thoại (touch target ≥ 48px, không tràn viền)

## Phase 3: User Story 2 - Widget Bốc Thăm & Hộp Poka-Yoke (P1)
- [x] T007 Xây dựng thuật toán bốc thăm ngẫu nhiên pan bệnh phần cứng thực tế trong `PracticeLotteryWidget.astro`
- [x] T008 Thiết kế cơ chế ẩn gợi ý: chỉ hiện Tên đề & Triệu chứng lỗi ban đầu
- [x] T009 Thêm nút mở rộng "Xem gợi ý nguyên nhân & quy trình Poka-Yoke" cho KTV tự tư duy

## Phase 4: User Story 3 - Hệ Thống 4 Trạm Kỹ Thuật & 4 Đề Thi HSG (P2)
- [x] T010 Thiết kế 4 Trạm thực hành theo chu trình KTV trong `HsgHardwareNetworkMaster.astro`:
  - Trạm 1: Cơ khí thùng máy & Khối nguồn PSU
  - Trạm 2: Bo mạch chủ H510, CPU LGA1200, RAM DDR4 & SSD NVMe
  - Trạm 3: Mạng LAN nội bộ & Chuẩn hóa hệ điều hành Windows 10
  - Trạm 4: Kiểm thử chịu tải, Báo cáo kỹ thuật & Bàn giao KTV
- [x] T011 Tích hợp 4 Đề thi HSG thực chiến hoàn chỉnh kèm đồng hồ đếm ngược 180 phút
- [x] T012 Bổ sung bảng thông số mạng (IP tĩnh, Subnet Mask, Gateway, DNS 8.8.8.8) và ma trận phân quyền NTFS
- [x] T013 Tích hợp bảng kiểm định nghiệm thu 100 điểm tương tác (Checklist Rubric)

## Phase 5: Verification & Quality Gate
- [x] T014 Chạy `npm run build` xác nhận đạt 0 errors, 0 warnings
- [x] T015 Kiểm thử tương tác trực tiếp trên trình duyệt qua Antigravity Browser Subagent (Subagent `04e9d355-3367-4b5d-bad6-955d0b90d815`)
