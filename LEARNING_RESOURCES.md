# Hồ sơ nguồn học liệu — 12 kỹ năng và DA01

**Rà soát:** 2026-10-12  
**Đối tượng:** Học sinh Trung cấp 9+3.  
**Cách dùng:** Trang học tiếng Việt là nội dung biên soạn riêng của website. Các liên kết dưới đây là tài liệu tham khảo để đối chiếu, không thay thế hướng dẫn thao tác và quy trình của phòng thực hành.

## Quy tắc bản quyền

- Chỉ liên kết tới nội dung bên ngoài nếu giấy phép không cho phép sao chép rõ ràng.
- Không tải lại, nhúng lại hoặc trích dài văn bản/hình/video của Microsoft, Cisco, Fluke Networks hay CommScope.
- Tài liệu *Introduction to Networks* của Umar Khokhar và Binh Tran (2024) được ghi giấy phép **CC BY 4.0** tại trang GALILEO. Có thể chia sẻ/chỉnh sửa nếu tuân thủ giấy phép và ghi công; website hiện chỉ liên kết, chưa sao chép nội dung.
- Nội dung wiki OpenWrt mặc định theo **CC BY-SA 4.0** trừ khi trang/tệp ghi giấy phép khác. Nếu sau này chuyển thể nội dung, cần ghi công, nêu thay đổi và cấp phép tương thích theo điều kiện CC BY-SA.
- Tên hãng/sản phẩm chỉ để nhận diện nguồn. Không hàm ý họ tài trợ hoặc phê duyệt website.
- Bố cục, câu chữ tiếng Việt, bài tập và hình SVG trong website do dự án tự biên soạn/tạo; ảnh thực tế do giáo viên cung cấp cần được duyệt riêng trong `MEDIA_MANIFEST.md`.

## Bản đồ nguồn theo kỹ năng

| Mã | Tài liệu / đơn vị | Phần dùng để đối chiếu | Giấy phép / cách sử dụng |
|---|---|---|---|
| KN01 | [Introduction to Networks](https://oer.galileo.usg.edu/compsci-textbooks/17/) — Umar Khokhar, Binh Tran, 2024 | Thành phần mạng, thiết bị, mô hình mạng | **CC BY 4.0**; trang hiện chỉ liên kết. |
| KN02 | [Wire Map Testing: It’s Not All About Color](https://www.flukenetworks.com/blog/cabling-chronicles/wire-map-testing-it-s-not-all-about-color) — Fluke Networks | Ý nghĩa kiểm tra wiremap; phân biệt kiểm tra thông mạch với chứng nhận hiệu năng | Bản quyền nhà xuất bản; liên kết tham khảo, không sao chép. |
| KN03 | [Instruction Sheet 860344274](https://www.commscope.com/globalassets/digizuite/52882-860344274-12-13-19-pdf.pdf) — CommScope | Đối chiếu sơ đồ đấu module cụ thể | Tài liệu của nhà sản xuất; chỉ dùng cho model tương ứng và liên kết, không sao chép. |
| KN04 | [MicroMapper Wiremap Tester](https://www.flukenetworks.com/datacom-cabling/copper-testing/MicroMapper) — Fluke Networks | Chức năng tester và giới hạn bài test wiremap | Bản quyền nhà sản xuất; liên kết tham khảo. |
| KN05 | [ipconfig](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig) và [TCP/IP addressing and subnetting](https://learn.microsoft.com/en-us/troubleshoot/windows-client/networking/tcpip-addressing-and-subnetting) — Microsoft Learn | Xem cấu hình địa chỉ và các thành phần IPv4 trên Windows | Tài liệu Microsoft; liên kết tham khảo, không sao chép hình/nội dung. |
| KN06 | [Introduction to Networks](https://oer.galileo.usg.edu/compsci-textbooks/17/) — Umar Khokhar, Binh Tran, 2024 | CIDR, subnet mask, network/broadcast và dải host | **CC BY 4.0**; trang hiện chỉ liên kết. |
| KN07 | [Exploring Networking with Cisco Packet Tracer](https://www.netacad.com/courses/exploring-networking-cisco-packet-tracer?courseLang=en-US) — Cisco Networking Academy | Thực hành mô phỏng topology và văn phòng chi nhánh | Quyền nội dung khóa học theo điều khoản Cisco; liên kết tham khảo, không sao chép. |
| KN08 | [Local accounts](https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/local-accounts) — Microsoft Learn | Tài khoản cục bộ và quản lý quyền | Tài liệu Microsoft; liên kết tham khảo. |
| KN09 | [Set up your small business network](https://learn.microsoft.com/en-us/troubleshoot/windows-client/networking/set-up-your-small-business-network) — Microsoft Learn | Phát hiện mạng, chia sẻ tệp và máy in | Tài liệu Microsoft; liên kết tham khảo. Các bước giao diện có thể thay đổi theo Windows. |
| KN10 | [Wi-Fi configuration](https://openwrt.org/docs/guide-user/network/wifi/start) — OpenWrt Wiki | Cấu hình Wi-Fi/AP; đối chiếu khái niệm, không áp đặt giao diện hãng khác | Wiki mặc định **CC BY-SA 4.0**; chỉ liên kết trong bản hiện tại. |
| KN11 | [A Guide to Securing Networks for Wi-Fi](https://www.cisa.gov/sites/default/files/publications/A_Guide_to_Securing_Networks_for_Wi-Fi.pdf) — CISA; [Guest Wi-Fi basics](https://openwrt.org/docs/guide-user/network/wifi/guestwifi/guest-wlan) — OpenWrt | Nguyên tắc bảo mật và cô lập mạng khách | CISA: bản quyền/điều khoản cơ quan; liên kết. OpenWrt Wiki: **CC BY-SA 4.0**; chỉ liên kết. |
| KN12 | [Exploring Networking with Cisco Packet Tracer](https://www.netacad.com/courses/exploring-networking-cisco-packet-tracer?courseLang=en-US) — Cisco Networking Academy | Mô phỏng tích hợp thiết bị, địa chỉ và kiểm tra kết nối | Quyền nội dung khóa học theo điều khoản Cisco; liên kết, không sao chép. |
| DA01 | [Introduction to Networks](https://oer.galileo.usg.edu/compsci-textbooks/17/) và [Exploring Networking with Cisco Packet Tracer](https://www.netacad.com/courses/exploring-networking-cisco-packet-tracer?courseLang=en-US) | Kiến thức nền CC BY 4.0; mô phỏng văn phòng là tài liệu Cisco chỉ tham khảo | Chỉ liên kết; nếu tái sử dụng tài liệu mở, tuân thủ giấy phép riêng. |

## Tình trạng kiểm duyệt

- Liên kết được rà soát ngày 2026-10-12; website bên ngoài có thể đổi đường dẫn hoặc yêu cầu đăng nhập.
- Trình tự, thông số subnet minh họa và tiêu chí DA01 cần giáo viên đối chiếu với thiết bị, sơ đồ địa chỉ và quy định của phòng thực hành trước khi chấm điểm.
- Không sử dụng tài liệu của một hãng để khẳng định mọi router, AP, module hoặc phiên bản Windows có giao diện giống nhau.
