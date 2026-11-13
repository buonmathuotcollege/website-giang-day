---
title: "Chương 1: Tổng quan Kiến trúc máy tính"
chapter: 1
course: "kien-truc-may-tinh"
description: "Mô hình Von Neumann kinh điển, chu kỳ tìm-nạp-thực-thi và cấu tạo 4 khối chức năng chính"
order: 1
---

## 1. Mô hình kiến trúc Von Neumann

Kiến trúc máy tính hiện đại hầu hết đều được xây dựng dựa trên nguyên lý máy tính lưu trữ chương trình của nhà toán học John von Neumann đề xuất năm 1945.

### 4 khối chức năng cơ bản:
1. **Khối xử lý trung tâm (CPU)**: Chứa Đơn vị số học & logic (ALU) và Đơn vị điều khiển (CU).
2. **Bộ nhớ chính (Main Memory - RAM)**: Lưu trữ đồng thời cả chương trình (lệnh) và dữ liệu cần xử lý.
3. **Hệ thống Vào / Ra (I/O System)**: Bàn phím, chuột, màn hình, ổ cứng lưu trữ.
4. **Hệ thống đường truyền liên kết (System Bus)**: Bus điều khiển, Bus địa chỉ và Bus dữ liệu.

## 2. Chu kỳ thực hiện lệnh của CPU (Instruction Cycle)

Mỗi lệnh của chương trình được CPU thực hiện qua 3 giai đoạn kế tiếp nhau:
1. **Tìm nạp lệnh (Fetch)**: Đọc lệnh từ ô nhớ RAM được trỏ bởi thanh ghi đếm chương trình (PC - Program Counter).
2. **Giải mã lệnh (Decode)**: Đơn vị điều khiển xác định mã tác vụ (Opcode) và các toán hạng (Operands).
3. **Thực thi lệnh (Execute)**: Đơn vị ALU tính toán hoặc ghi kết quả về thanh ghi/bộ nhớ.
