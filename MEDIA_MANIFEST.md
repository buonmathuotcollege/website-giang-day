# MEDIA MANIFEST — QUẢN LÝ HÌNH ẢNH VÀ VIDEO

## Mục đích
Quản lý tập trung mọi tài sản hình ảnh/video dùng trong website để biết nguồn, giấy phép, kỹ năng sử dụng và trạng thái kiểm duyệt.

## Trạng thái
- approved — đã kiểm tra và được phép sử dụng.
- review — cần giáo viên kiểm tra.
- reference-only — chỉ dùng tham khảo/liên kết.
- generated — tài sản tự tạo.
- replaced — đã có tài sản thay thế.

## Mẫu bản ghi
| ID | File/URL | Loại | Kỹ năng | Nguồn/Tác giả | Giấy phép | Chỉnh sửa | Trạng thái | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| MEDIA-001 | ... | image/video | KN03 | ... | ... | ... | review | ... |

## Quy tắc đặt tên
Ưu tiên: knXX-step-YY-mo-ta.ext
Ví dụ: kn03-step-03-t568b-order.jpg

## Tài sản tự tạo
Ghi ID, ngày tạo, mục đích, kỹ năng sử dụng, người/AI tạo và nguồn tham khảo nếu có.

## Kiểm tra trước khi dùng
- [ ] Hình/video đúng kỹ thuật.
- [ ] Đúng bước.
- [ ] Đủ rõ.
- [ ] Quyền sử dụng đã xác định.
- [ ] Có nguồn/giấy phép khi cần.
- [ ] Không chứa thông tin nhạy cảm hoặc tài khoản thật.

## KN01 — Media hiện tại

| ID | File local | Loại | Nguồn | Quyền | Trạng thái |
|---|---|---|---|---|---|
| KN01-IMG-001 | `images/kn01-overview-pc-components.svg` | SVG minh họa | Tự tạo cho website | Nội dung tự tạo | generated |
| KN01-IMG-002 | `images/kn01-step-05-rj45-port-closeup.svg` | SVG minh họa | Tự tạo cho website | Nội dung tự tạo | generated |
| KN01-IMG-003 | `images/kn01-step-07-switch-router-ap-comparison.svg` | SVG minh họa | Tự tạo cho website | Nội dung tự tạo | generated |
| KN01-IMG-004 | `images/kn01-step-08-insert-rj45.svg` | SVG minh họa | Tự tạo cho website | Nội dung tự tạo | generated |
| KN01-IMG-005 | `images/kn01-step-09-remove-rj45.svg` | SVG minh họa | Tự tạo cho website | Nội dung tự tạo | generated |

### Ảnh tham khảo bên ngoài đã kiểm tra

Wikimedia Commons có các ảnh RJ45, switch và motherboard với giấy phép cho phép tái sử dụng ở các mức khác nhau; trước khi đưa ảnh nhị phân bên ngoài vào repo phải lưu đầy đủ tác giả, giấy phép, nguồn và ghi rõ chỉnh sửa nếu có. Ví dụ: RJ45 switch ports là CC BY-SA; ảnh RJ45 trên motherboard được tác giả phát hành public domain. Không lấy ảnh từ nguồn chỉ vì tìm thấy trên Google Images.

### Quyết định KN01

Giai đoạn đầu sử dụng **SVG tự tạo** để website không phụ thuộc máy chủ ảnh bên ngoài và không phát sinh rủi ro bản quyền. Khi có ảnh chụp thiết bị thật tại phòng thực hành, có thể thay từng SVG bằng ảnh thực tế của trường mà không thay đổi cấu trúc bài học.

| KN01-IMG-006 | external source reference | image | KN01 | Wikimedia Commons — Computer-motherboard.jpg | CC BY-SA 4.0 | chưa tải local | review | Nguồn đối chiếu; giáo viên duyệt trước khi đưa ảnh nhị phân vào repo |
| KN01-IMG-007 | external source reference | image | KN01 | Wikimedia Commons — Motherboard_in_the_System_Unit.jpg | CC BY 4.0 | chưa tải local | review | Nguồn đối chiếu |
| KN01-IMG-008 | external source reference | image | KN01 | Wikimedia Commons — Atx_computer_motherboard_with_cpu_and_fan.jpg | Public Domain | chưa tải local | review | Nguồn đối chiếu |
| KN01-IMG-009 | external source reference | image | KN01 | Wikimedia Commons — Ethernet Switch (Front View).jpg | CC BY-SA 4.0 | chưa tải local | review | Nguồn đối chiếu |
