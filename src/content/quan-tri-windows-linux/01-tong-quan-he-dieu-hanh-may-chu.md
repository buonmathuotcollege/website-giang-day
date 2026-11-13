---
title: "Chương 1: Tổng quan Hệ điều hành Máy chủ & Cài đặt"
chapter: 1
course: "quan-tri-windows-linux"
description: "So sánh hệ điều hành máy khách (Client OS) và máy chủ (Server OS), các phiên bản Windows Server và bản phân phối Linux phổ biến"
order: 1
---

## 1. Sự khác biệt giữa Server OS và Desktop/Client OS

| Đặc điểm so sánh | Desktop OS (Win 10/11, Ubuntu Desktop) | Server OS (Windows Server 2022/2025, Rocky Linux) |
|:---|:---|:---|
| **Mục đích chính** | Phục vụ 1 người dùng trực tiếp trải nghiệm (văn phòng, đồ họa, chơi game) | Phục vụ đồng thời hàng trăm đến hàng nghìn người dùng truy cập dịch vụ qua mạng |
| **Giao diện** | Bắt buộc có giao diện đồ họa GUI trực quan | Thường khuyến khích chạy chế độ Server Core / CLI để tiết kiệm RAM và bảo mật |
| **Dịch vụ mạng** | Không có hoặc giới hạn kết nối chia sẻ (tối đa 20 kết nối SMB) | Cung cấp dịch vụ tập trung: Active Directory, DNS, DHCP, Web, File Server, ảo hóa |
| **Độ ổn định** | Cho phép khởi động lại thường xuyên khi update | Thiết kế hoạt động liên tục 24/7/365, độ chịu lỗi (Fault Tolerance) cao |

## 2. Các dịch vụ mạng nền tảng của Windows Server

1. **Active Directory Domain Services (AD DS)**: Cung cấp cơ chế xác thực tập trung một lần (Single Sign-On) cho toàn bộ tài khoản máy tính và người dùng trong doanh nghiệp.
2. **Domain Name System (DNS Server)**: Phân giải tên miền máy chủ thành địa chỉ IP mạng.
3. **Dynamic Host Configuration Protocol (DHCP Server)**: Tự động cấp IP cho máy trạm.
