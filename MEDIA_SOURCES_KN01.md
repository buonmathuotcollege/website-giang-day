# MEDIA_SOURCES_KN01 — Nguồn ảnh thực tế cho KN01

> Mục đích: giáo viên có thể mở **trang nguồn**, kiểm tra giấy phép và tải ảnh gốc để thay thế ảnh minh họa trong website. Ưu tiên ảnh có giấy phép rõ ràng. Không tải lại ảnh chỉ vì thấy ảnh xuất hiện trên Google Images.

## Nguyên tắc sử dụng

- Ưu tiên tải từ **trang File** của Wikimedia Commons để giữ thông tin tác giả và giấy phép.
- Với CC BY/CC BY-SA: giữ thông tin tác giả, giấy phép và ghi rõ nếu đã cắt/chỉnh sửa.
- Với Public Domain/CC0: có thể sử dụng rộng rãi hơn, nhưng vẫn nên lưu thông tin nguồn trong `MEDIA_MANIFEST.md`.
- Khi đưa ảnh vào website, đổi tên theo quy ước: `kn01-step-XX-mo-ta.ext`.
- Nếu ảnh thực tế không khớp thiết bị đang dạy, ưu tiên ảnh do giáo viên tự chụp hoặc ảnh có nguồn phù hợp hơn.

## Danh sách ảnh đề xuất

| ID | Vị trí dùng | Nội dung | Giấy phép | Trang nguồn | Tên file gợi ý |
|---|---|---|---|---|---|
| KN01-M01 | Bước 3 – CPU/RAM | Bộ xử lý CPU | CC BY-SA 4.0 | [Mở trang nguồn](https://commons.wikimedia.org/wiki/File:Cpu-processor.jpg) | `images/kn01-cpu.jpg` |
| KN01-M02 | Bước 3 – CPU/RAM | Thanh RAM DDR4 | CC BY-SA 4.0 | [Mở trang nguồn](https://commons.wikimedia.org/wiki/File:RAM_Module_(SDRAM-DDR4).jpg) | `images/kn01-ram.jpg` |
| KN01-M03 | Bước 7 – Access Point | Thiết bị Access Point | CC0 | [Mở trang nguồn](https://commons.wikimedia.org/wiki/File:Wireless_access_point.jpg) | `images/kn01-access-point.jpg` |
| KN01-M04 | Bước 7 – Access Point | Access Point gắn tường | Public domain | [Mở trang nguồn](https://commons.wikimedia.org/wiki/File:Access-point-wireless.jpg) | `images/kn01-ap-wall.jpg` |
| KN01-M05 | Bước 7 – Router | Wireless router | CC BY-SA 3.0 | [Mở trang nguồn](https://commons.wikimedia.org/wiki/File:Router_1.jpg) | `images/kn01-router.jpg` |
| KN01-M06 | Bước 7 – Access Point | Wireless access point UniFi | CC BY-SA 4.0 | [Mở trang nguồn](https://commons.wikimedia.org/wiki/File:Access_Point_UniFi.jpg) | `images/kn01-ap-unifi.jpg` |

## Còn thiếu ảnh nên bổ sung

- Mainboard toàn cảnh và ảnh cận các khe RAM/CPU.
- SSD 2.5 inch, SSD M.2 và HDD.
- PSU/nguồn máy tính.
- Switch Ethernet mặt trước và mặt sau.
- Cổng RJ45 trên mainboard/NIC và đầu RJ45 cắm thực tế.
- Ảnh LED Link/Activity ở cổng mạng.

Các ảnh còn thiếu nên được bổ sung sau khi kiểm tra **giấy phép + độ rõ + mức phù hợp với thiết bị thực tế của phòng học**.

## Quy trình giáo viên tải ảnh

1. Mở **Trang nguồn**.
2. Kiểm tra mục **Licensing**.
3. Chọn kích thước đủ lớn cho website.
4. Tải ảnh gốc.
5. Đổi tên theo quy ước của dự án.
6. Ghi nguồn vào `MEDIA_MANIFEST.md`.
7. Nếu cắt/chỉnh sửa ảnh, ghi rõ trong manifest.
8. Kiểm tra lại ảnh trên trang KN01 trước khi công bố.
