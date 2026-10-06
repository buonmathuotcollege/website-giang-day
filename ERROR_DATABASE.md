# ERROR DATABASE — NGÂN HÀNG LỖI THỰC TẾ

## Mục đích
Xây dựng ngân hàng lỗi để học sinh học cách:
NHẬN BIẾT → KIỂM TRA → XÁC ĐỊNH NGUYÊN NHÂN → SỬA → KIỂM TRA LẠI.

Biết xử lý lỗi là một phần của năng lực nghề.

## Mẫu lỗi
### ERR-XXX — Tên lỗi
- Kỹ năng: KNXX
- Mức độ: Cơ bản / Trung bình / Nâng cao
- Dấu hiệu: Học sinh nhìn thấy gì?
- Nguyên nhân có thể: Liệt kê ngắn.
- Kiểm tra: Làm gì trước?
- Cách sửa: Các bước cụ thể.
- Kiểm tra lại: Dấu hiệu đạt.
- Ảnh lỗi: MEDIA-ID nếu có.
- Bài liên quan: Link kỹ năng/bài thực hành.

## Ví dụ khung
### ERR-KN02-001 — Sai thứ tự dây RJ45
- Kỹ năng: KN02
- Dấu hiệu: Tester báo sai thứ tự.
- Nguyên nhân có thể: Xếp sai màu hoặc dây bị đảo.
- Kiểm tra: Đối chiếu 8 sợi với hình chuẩn.
- Cách sửa: Cắt bỏ đầu sai và bấm lại theo chuẩn đang sử dụng.
- Kiểm tra lại: Tester cho kết quả đúng.
- Ảnh lỗi: TBD.

## Quy tắc chuyển mã
Các mã lỗi cũ gắn với cấu trúc 8 KN phải được chuyển sang mã kỹ năng hiện hành. Không tạo lỗi mới theo mapping cũ.

## Quy tắc
- Ưu tiên lỗi học sinh thật sự dễ gặp.
- Không chỉ ghi "sai cấu hình"; phải chỉ rõ dấu hiệu và cách kiểm tra.
- Một lỗi có thể liên quan nhiều kỹ năng.
- Khi có lỗi mới từ thực hành thực tế, bổ sung vào database.
- Không khẳng định nguyên nhân duy nhất nếu có nhiều khả năng.

## Nhóm lỗi
1. Phần cứng.
2. Cáp và đầu nối.
3. IP/subnet.
4. Windows/User/Permission.
5. Wi-Fi.
6. Sơ đồ/cấu hình.
7. Kiểm tra kết nối.
8. An toàn thao tác.
