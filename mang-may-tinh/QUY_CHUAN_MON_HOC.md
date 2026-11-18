# 📘 BỘ QUY CHUẨN KHUNG TRIỂN KHAI CÁC MÔN HỌC CNTT
### HỆ TRUNG CẤP 9+3 · TRIẾT LÝ "CẦM TAY CHỈ VIỆC - 100% THỰC HÀNH TẠI PHÒNG MÁY"
> **Tác giả / Giảng viên phụ trách:** CN. Phạm Tiến Đông  
> **Cổng Học Tập & Giảng Dạy CNTT:** `https://phamtiendong.name.vn`  
> **Phiên bản:** 2.0 (Chuẩn hóa Next.js App Router, Tailwind CSS, Shadcn UI, Supabase & Cloudflare Pages)

---

## 1. NGUYÊN TẮC CỐT LÕI & ĐỊNH VỊ THƯƠNG HIỆU

### 1.1. Đối Tượng Người Học
* **Học sinh hệ Trung cấp 9+3 (15 — 18 tuổi):** Tốt nghiệp THCS đi học nghề. Khả năng đọc hiểu văn bản lý thuyết dài ở mức trung bình, rất ngại đọc những "bức tường chữ" trừu tượng.
* **Phương pháp tiếp thu tối ưu:** Học qua **"Mắt thấy — Tay làm"**, hình ảnh trực quan sinh động, ví von đời thường dễ nhớ, cầm tay chỉ việc từng bước một.
* **Thói quen thiết bị:** Đa số học sinh tra cứu bài học và làm bài nghiệm thu bằng **điện thoại di động (Smartphone)** tại bàn thực hành phòng máy.

### 1.2. Triết Lý Đào Tạo
* **100% Thực hành tại phòng máy:** Không giao bài tập về nhà. Mọi kỹ năng nghề phải được rèn luyện, kiểm chứng và nghiệm thu ngay trong giờ học.
* **An toàn & Tác phong công nghiệp:** Đặt kỷ luật lao động 5S và an toàn thiết bị lên hàng đầu thông qua các điểm dừng kỹ thuật **Poka-Yoke**.

### 1.3. Ranh Giới Thương Hiệu (Strict Branding Policy)
* Đây là **WEBSITE CÁ NHÂN** của CN. Phạm Tiến Đông (`https://phamtiendong.name.vn`).
* ❌ **TUYỆT ĐỐI KHÔNG ĐƯA TÊN TRƯỜNG:** Không đề cập tên trường cụ thể trên bất kỳ giao diện, tài liệu hay mã nguồn nào.
* ✅ **Định danh chuẩn:** *"Cổng Học Tập & Giảng Dạy Chuyên Ngành CNTT - CN. Phạm Tiến Đông"*.

---

## 2. CHUẨN MỰC TỔ CHỨC PHÒNG LAB & NHÂN SỰ BÀN KỸ THUẬT

### 2.1. Phân Công Bàn Kỹ Thuật 3 KTV (Không Dùng Từ Lóng Xưởng Thợ)
* ❌ **Cấm dùng từ lóng dân dã:** *"thợ chính"*, *"thợ phụ"*, *"kíp thợ"*, *"bí kíp 20 năm"*, *"xưởng thợ"*.
* ✅ **Mô hình chuẩn hóa Bàn Kỹ Thuật (3 KTV):**
  * **KTV 1: Thao tác chính (Operator):** Tháo lắp cơ khí, cắm dây mạng, thiết lập thông số cấu hình.
  * **KTV 2: Kiểm soát an toàn (Poka-Yoke):** Kiểm tra 3 điểm dừng an toàn, bóc nilon tản nhiệt, test 8 đèn LED, chống cắm ngược, chống đoản mạch.
  * **KTV 3: Ghi chép & Báo cáo kỹ thuật (Recorder):** Tính toán thông số (IP, Subnet), đo đạc thực tế (Ping, Tracert), nhập và nộp Phiếu Nghiệm Thu PracticeForm.

---

## 3. MÔI TRƯỜNG THỰC HÀNH PHÒNG MÁY (WINDOWS 10 MANDATE)

> [!IMPORTANT]
> **RÀNG BUỘC BẮT BUỘC 100% TRÊN WINDOWS 10:**  
> Toàn bộ hệ thống phòng máy thực hành được cài đặt chuẩn hóa trên **Windows 10 Pro / Enterprise**.

* **Quy chuẩn Giao diện & Thao tác:**
  * **Cửa sổ Settings:** Giao diện phẳng Windows 10, danh mục `Network & Internet` với thanh điều hướng bên trái và thanh tìm kiếm chính giữa.
  * **Control Panel:** Giữ nguyên giao diện Classic của Windows 10 (Network and Sharing Center, Change advanced sharing settings).
  * **File Explorer:** Thanh công cụ Ribbon cổ điển (File, Home, Share, View).
  * **Command Prompt:** Cửa sổ dòng lệnh đen truyền thống (`cmd.exe`).
* ❌ **TUYỆT ĐỐI KHÔNG DÙNG GIAO DIỆN WINDOWS 11:** Không sử dụng ảnh chụp màn hình Taskbar căn giữa, menu Settings bo tròn kiểu Win 11 để tránh làm học sinh bỡ ngỡ, nhầm lẫn khi thao tác trên máy thực tế.

---

## 4. QUY CHUẨN GIAO DIỆN CHIA ĐÔI MÀN HÌNH (iFixit SPLIT-SCREEN)

Giao diện mỗi bài học thực hành được tổ chức nghiêm ngặt theo bố cục 2 cột:
* **Cột trái (7/12 cột) - `StepByStepGuide`:**
  * Huy hiệu bước, KTV phụ trách, thời gian ước tính.
  * 3 — 4 gạch đầu dòng ngắn gọn ($\le 15$ từ/ý).
  * Ví von đời thường dễ hiểu.
  * Hộp cảnh báo an toàn **Poka-Yoke** viền vàng/đỏ nổi bật.
  * Checkbox hoàn thành xúc giác to $\ge 48\text{px}$.
* **Cột phải (5/12 cột) - `MediaPreview`:**
  * Sticky cố định khi cuộn trang.
  * Nút chuyển đổi: `[ 📷 Ảnh Chụp Thật Win 10 ]` và `[ 📐 Sơ Đồ Kỹ Thuật ]`.
  * Nút **Phóng to (Projector Mode)** mở modal Lightbox sắc nét cho máy chiếu phòng lab.
* **Phía dưới - `PracticeForm`:**
  * Biểu mẫu nghiệm thu cho 3 KTV tại bàn, gửi trực tiếp lên Supabase và tự động backup `localStorage`.

---

## 5. KIẾN TRÚC CÔNG NGHỆ & TIÊU CHUẨN LẬP TRÌNH
* **Tech Stack:** Next.js (App Router), Tailwind CSS (v4), Shadcn UI, Supabase, Cloudflare Pages (`output: "export"`).
* **Ngôn ngữ:** $100\%$ Tiếng Việt cho giao diện, thông báo lỗi và chú thích code.
* **Clean Code:** Chia nhỏ thành các component độc lập (`StepByStepGuide`, `MediaPreview`, `LabSplitView`, `PracticeForm`, `TechNewsWidget`).
* **Tiêu chuẩn hoàn tất:** `npm run build` đạt **0 errors, 0 warnings**.
