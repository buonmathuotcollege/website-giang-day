# Feature Specification: Cổng Portal Hub 5 Phân Khu & Hệ Thống Thi Thực Hành HSG Phần Cứng - Mạng

**Feature Branch**: `001-portal-hub-and-hsg-practical`  
**Created**: 2026-11-18  
**Status**: Completed & Verified  
**Chủ nhiệm đề án**: CN. Phạm Tiến Đông  
**Mục tiêu**: Nâng cấp toàn diện trang chủ portal học tập, bổ sung 4 trạm kỹ thuật thực hành và 4 đề thi HSG thực chiến theo mô hình KTV tiêu chuẩn.

---

## User Scenarios & Testing (Bắt buộc)

### User Story 1 - Khám Phá & Điều Hướng Nhanh Qua Portal Hub 5 Phân Khu (Priority: P1) 🎯 MVP

Học sinh hoặc giảng viên truy cập trang chủ `https://phamtiendong.name.vn` cần có một giao diện tinh gọn, phân định rõ ràng 5 phân khu đào tạo trọng tâm mà không bị ngợp chữ hoặc rối loạn thị giác trên điện thoại.

**Tại sao ưu tiên P1**: Là bộ mặt của cổng học tập, giúp người học định vị ngay phân khu phù hợp (Ôn tập trắc nghiệm, Thi học sinh giỏi, Thư viện học liệu, Bản đồ linh kiện phòng máy, hoặc Công cụ tra cứu nhanh).

**Kiểm thử độc lập**: Truy cập trang chủ trên mobile (viewport 375px), cuộn mượt qua 5 card phân khu, bấm nút truy cập trực tiếp đến phân khu tương ứng mà không bị lỗi giao diện hoặc tràn viền ngang.

**Kịch bản chấp nhận (Acceptance Scenarios)**:
1. **Given** người học truy cập trang chủ trên điện thoại, **When** cuộn xem danh mục, **Then** thấy đủ 5 phân khu rõ ràng, biểu tượng trực quan, nút bấm cao ≥ 48px.
2. **Given** người học muốn tìm nhanh bài giảng, **When** gõ từ khóa vào ô tìm kiếm nhanh, **Then** danh sách lọc tức thời theo chủ đề phần cứng, mạng hoặc hệ điều hành.

---

### User Story 2 - Luyện Tập & Chẩn Đoán Lỗi Bằng Trắc Nghiệm & Hộp Poka-Yoke (Priority: P1)

Học sinh cần bốc thăm ngẫu nhiên đề thi thực hành phần cứng, nhưng phải tự tư duy chẩn đoán hiện tượng trước; phần giải thích nguyên nhân và quy trình an toàn Poka-Yoke chỉ xuất hiện khi học sinh chủ động bấm mở rộng.

**Tại sao ưu tiên P1**: Rèn luyện tư duy khám máy thực chiến cho KTV 1 và KTV 2 trước khi can thiệp vào máy tính phòng lab.

**Kiểm thử độc lập**: Bấm nút "Bốc Thăm Đề Thi Ngẫu Nhiên" ➔ hiển thị Tên đề & Triệu chứng lỗi; bấm "Xem gợi ý nguyên nhân & quy trình Poka-Yoke" ➔ bung mở accordion hướng dẫn từng bước.

**Kịch bản chấp nhận**:
1. **Given** học sinh bấm nút bốc thăm đề ngẫu nhiên, **When** màn hình tải xong, **Then** chỉ hiển thị mã đề, linh kiện nghi vấn và triệu chứng quan sát được bằng mắt/tai (tiếng bíp BIOS, quạt quay rồi tắt, đèn LED báo lỗi).
2. **Given** học sinh muốn đối chiếu phương án sửa chữa, **When** bấm nút mở rộng Poka-Yoke, **Then** hiển thị quy trình 3 điểm dừng an toàn và thao tác KTV chuẩn.

---

### User Story 3 - Luyện Thi Thực Hành HSG Chuyên Đề 02 (4 Trạm Kỹ Thuật & 4 Đề Thi Hoàn Chỉnh) (Priority: P2)

Đội tuyển học sinh giỏi và sinh viên nghề CNTT cần một không gian thi thực hành mô phỏng 100% bối cảnh phòng lab Windows 10 và phần cứng H510/DDR4/GT730.

**Tại sao ưu tiên P2**: Nâng cao năng lực tay nghề chuyên sâu cho học sinh giỏi, phục vụ kỳ thi Kỹ năng nghề các cấp.

**Kiểm thử độc lập**: Truy cập `/courses/hsg-phan-cung-mang`, tương tác với 4 trạm kỹ thuật (Trạm 1: Cơ khí & Nguồn, Trạm 2: Mainboard-RAM-SSD, Trạm 3: Mạng LAN & Windows 10, Trạm 4: Bàn giao KTV), chọn 1 trong 4 đề thi có đồng hồ đếm ngược 180 phút, bảng phân bổ IP tĩnh và bảng kiểm tra nghiệm thu 100 điểm.

---

## Ranh Giới Kỹ Thuật & Không Gian Phạm Vi (Out of Scope)
- Không lưu điểm thi HSG vào server bên ngoài nếu không có kết nối internet (phải ưu tiên `localStorage` trước).
- Không mô phỏng giao diện Windows 11; toàn bộ hệ thống phải giữ nguyên chuẩn Windows 10 Pro.
- Không sử dụng các thuật ngữ lóng thợ thuyền (chỉ dùng KTV 1, KTV 2, KTV 3).
