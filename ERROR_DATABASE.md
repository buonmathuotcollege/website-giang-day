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


## KN03 — Lỗi khởi tạo
### ERR-KN03-001 — Đấu sai sơ đồ màu
- Kỹ năng: KN03
- Mức độ: Cơ bản
- Dấu hiệu: Kết quả kiểm tra đường dây không đúng yêu cầu.
- Nguyên nhân có thể: Nhầm T568A/T568B hoặc đọc sai nhãn module.
- Kiểm tra: Đối chiếu từng lõi với sơ đồ in trên module.
- Cách sửa: Đấu lại lõi sai theo đúng sơ đồ được giao.
- Kiểm tra lại: Thực hiện lại phép kiểm tra đường truyền.
- Ảnh lỗi: TBD.

### ERR-KN03-002 — Lõi chưa được cố định trong khe IDC
- Kỹ năng: KN03
- Mức độ: Cơ bản
- Dấu hiệu: Tiếp xúc chập chờn hoặc không có kết nối.
- Nguyên nhân có thể: Lõi đặt lệch hoặc punch-down chưa đúng.
- Kiểm tra: Quan sát khe IDC và kiểm tra lại điểm tiếp xúc.
- Cách sửa: Đặt lại lõi và dùng đúng dụng cụ punch-down.
- Kiểm tra lại: Kiểm tra lại toàn bộ đường truyền.
- Ảnh lỗi: TBD.


## KN04 — Lỗi thực hành
### ERR-KN04-001 — Một chân không có kết quả
- Kỹ năng: KN04
- Mức độ: Cơ bản
- Dấu hiệu: Một chân không có kết quả phù hợp.
- Kiểm tra: Kiểm tra đầu nối và lõi tương ứng.
- Cách sửa: Làm lại điểm đấu/đầu nối bị lỗi.
- Kiểm tra lại: Test lại toàn bộ đường dây.

### ERR-KN04-002 — Sai thứ tự đường dây
- Kỹ năng: KN04
- Mức độ: Cơ bản
- Dấu hiệu: Kết quả không trùng sơ đồ chuẩn.
- Kiểm tra: Đối chiếu từng chân với sơ đồ.
- Cách sửa: Đấu lại theo chuẩn bài.
- Kiểm tra lại: Test lại.
