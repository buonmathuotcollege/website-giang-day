# Implementation Plan: Cổng Portal Hub 5 Phân Khu & Hệ Thống Thi Thực Hành HSG

**Branch**: `001-portal-hub-and-hsg-practical` | **Date**: 2026-11-18 | **Spec**: [spec.md](file:///d:/website-giang-day/specs/001-portal-hub-and-hsg-practical/spec.md)  
**Input**: Đặc tả tính năng từ `specs/001-portal-hub-and-hsg-practical/spec.md`

## Summary
Xây dựng kiến trúc giao diện đa phân khu tại trang chủ (`src/pages/index.astro`) kết hợp widget bốc thăm chẩn đoán ẩn gợi ý (`src/components/PracticeLotteryWidget.astro`) và bộ giao diện thực hành HSG chuyên sâu 4 trạm (`src/components/HsgHardwareNetworkMaster.astro`).

## Technical Context
- **Ngôn ngữ & Nền tảng**: Astro 5.x + React / Preact + TypeScript + Tailwind CSS 3.x.
- **Triển khai**: Cloudflare Pages / Workers SSR với lưu trữ D1 và `localStorage` phía client.
- **Phong cách giao diện**: Minimalist Slate/Zinc (`shadcn/ui`), không gradient lòe loẹt, touch target ≥ 48px.
- **Tiêu chuẩn kiểm thử**:
  - `npm run build` đạt 0 lỗi, 0 cảnh báo.
  - Kiểm thử trực quan trên môi trường di động qua Antigravity Browser Subagent.

## Constitution Check
- ✅ **Bản quyền tác giả**: CN. Phạm Tiến Đông. Tuyệt đối không xuất hiện tên trường cụ thể.
- ✅ **Thấu cảm sư phạm**: Giao diện mobile-first, thẻ trượt 1-chạm, giải thích đời thường.
- ✅ **Chuẩn mực thuật ngữ**: KTV 1, KTV 2, KTV 3, Poka-Yoke. Không dùng từ lóng.
- ✅ **Cấu hình phần cứng**: Socket LGA1200, Main H510, RAM DDR4 8GB, VGA GT 730 2GB, SSD NVMe/SATA, 100% Windows 10.
- ✅ **An toàn dữ liệu**: Lưu trạng thái vào `localStorage`.

## Project Structure
```text
src/
├── components/
│   ├── CourseQuickLookup.astro         # Thanh tìm kiếm nhanh từ khóa bài học
│   ├── PracticeLotteryWidget.astro      # Widget bốc thăm đề & chẩn đoán Poka-Yoke
│   └── HsgHardwareNetworkMaster.astro   # Module 4 Trạm thực hành & 4 Đề thi HSG
├── pages/
│   ├── index.astro                     # Trang chủ Portal Hub 5 phân khu
│   └── courses/
│       ├── ol-01-phan-cung.astro       # Chuyên đề 01: Phần cứng PC căn bản
│       └── hsg-phan-cung-mang.astro    # Chuyên đề 02: Thi HSG Phần cứng - Mạng
specs/
└── 001-portal-hub-and-hsg-practical/
    ├── spec.md
    ├── plan.md
    └── tasks.md
```
