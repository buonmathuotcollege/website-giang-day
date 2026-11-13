---
title: "Chương 1: Mô hình thiết kế mạng phân cấp 3 lớp"
chapter: 1
course: "thiet-ke-quan-tri-lan-wan"
description: "Mô hình chuẩn phân cấp Core - Distribution - Access của Cisco cho hệ thống mạng trường học và doanh nghiệp"
order: 1
---

## 1. Mô hình phân cấp 3 lớp kinh điển của Cisco

Khi thiết kế mạng LAN quy mô doanh nghiệp vừa và lớn, mô hình mạng phẳng (Flat Network) sẽ bộc lộ nhược điểm nghiêm trọng về nghẽn Broadcast và khó quản trị. Giải pháp chuẩn mực là áp dụng mô hình phân cấp 3 lớp:

```
    [ LỚP LÕI (Core Layer) ]
            │       │
    [ LỚP PHÂN PHỐI (Distribution Layer) ]
            │       │
    [ LỚP TRUY CẬP (Access Layer) ]
            │       │
      [ Các máy trạm PC, Máy in, Wi-Fi ]
```

### Chức năng chi tiết từng lớp:
1. **Lớp lõi (Core Layer)**: Đường trục chính xương sống của mạng, ưu tiên chuyển tiếp gói tin với tốc độ cực cao, độ trễ thấp nhất. Không lọc gói tin hay áp dụng chính sách phức tạp tại lớp này.
2. **Lớp phân phối (Distribution Layer)**: Đóng vai trò cầu nối, gom các kết nối từ lớp Access, thực hiện định tuyến liên VLAN (Inter-VLAN), lọc bảo mật Access-list (ACL) và kiểm soát lưu lượng.
3. **Lớp truy cập (Access Layer)**: Cung cấp cổng cắm trực tiếp cho các thiết bị đầu cuối của người dùng (PC, Laptop, IP Phone, Camera, AP Wi-Fi). Thực hiện gán VLAN, giới hạn tốc độ và bảo mật cổng Port-Security.
