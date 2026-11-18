# 🏛️ QUY CHUẨN THIẾT KẾ & TRIỂN KHAI CHO CÁC ĐẠI LÝ AI (AGENTS.MD)
> **Dành cho mọi AI Agent (Antigravity, Cursor, Windsurf, Gemini, Claude, Copilot...):**  
> Khi thực hiện bất kỳ tác vụ nào trên dự án này, AI **BẮT BUỘC PHẢI ĐỌC VÀ TUÂN THỦ 100%** bộ quy chuẩn phong cách, tinh thần thiết kế và các ranh giới dưới đây.

---

## 1. BẢN CHẤT DỰ ÁN & ĐỊNH VỊ THƯƠNG HIỆU
* **Chủ sở hữu:** CN. Phạm Tiến Đông (Giảng viên / Kỹ sư CNTT)
* **Bản chất website:** Đây là **WEBSITE CÁ NHÂN** (`https://phamtiendong.name.vn`), phục vụ công tác giảng dạy, huấn luyện kỹ năng nghề và chia sẻ kiến thức chuyên ngành CNTT.
* ❌ **TUYỆT ĐỐI KHÔNG ĐƯỢC ĐƯA TÊN TRƯỜNG CỦA TÁC GIẢ VÀO:** Không đề cập tên trường cụ thể (như "Trường Cao đẳng Buôn Ma Thuột", "CĐ Buôn Ma Thuột", "BMTC") trên bất kỳ giao diện, tài liệu, tiêu đề hay mã nguồn nào. Sử dụng định danh trung tính: *"Cổng Học Tập & Giảng Dạy CNTT"* hoặc *"Website Giảng Dạy CNTT - CN. Phạm Tiến Đông"*.
* **Đối tượng học sinh trọng tâm:** Học sinh hệ **Trung cấp 9+3 (15 - 18 tuổi)**
  - Học sinh học nghề, khả năng tiếp thu lý thuyết ở mức trung bình.
  - Rất ngại đọc những bức tường chữ dài, trừu tượng.
  - Học tốt nhất qua **thực hành trực quan, "mắt thấy - tay làm", ví von đời thường**.
  - Phần lớn các em truy cập và làm bài bằng **điện thoại di động (Smartphone)**.

---

## 2. CHUẨN MỰC TỪ NGỮ CHUYÊN NGHIỆP (NO WORKSHOP SLANG)
* ❌ **TUYỆT ĐỐI KHÔNG DÙNG TIẾNG LÓNG BÌNH DÂN:**
  - Không dùng các từ như: *"bí kíp thợ"*, *"người thợ 20 năm nghề"*, *"thợ chính"*, *"thợ phụ"*, *"kíp thợ"*, *"xưởng huấn luyện thợ"*. Những từ này nghe dân dã, thiếu tính chuyên nghiệp sư phạm.
* ✅ **THAY BẰNG THUẬT NGỮ KỸ THUẬT TIÊU CHUẨN (KTV):**
  - **Nhóm KTV / Bàn Kỹ Thuật:** Thay cho "Kíp thợ".
  - **KTV 1 (Thao tác chính / Operator):** Chịu trách nhiệm tháo lắp cơ khí, cắm linh kiện, phân vùng cài hệ điều hành.
  - **KTV 2 (Kiểm soát an toàn & Poka-Yoke):** Kiểm tra 3 điểm dừng an toàn, bóc nilon, tra keo tản nhiệt, chống cắm ngược.
  - **KTV 3 (Ghi chép & Báo cáo kỹ thuật):** Ghi chép thông số cấu hình, nhiệt độ test tải, lập phiếu nghiệm thu bàn giao.
  - **Quy trình tiêu chuẩn / Kinh nghiệm thực chiến:** Thay cho "Bí kíp 20 năm".

---

## 3. VAI TRÒ & PHONG CÁCH CỦA TRỢ LÝ AI (CHATBOT GUARDRAILS)
* ❌ **BOT TUYỆT ĐỐI KHÔNG ĐÓNG VAI HOẶC XƯNG LÀ "THẦY ĐỒNG":**
  - Bot là **Trợ Lý AI Học Tập CNTT (AI Teaching Assistant)**, một công cụ công nghệ độc lập hỗ trợ sinh viên học tập.
  - Xưng hô chuẩn mực: Tự xưng là *"mình"* hoặc *"Trợ lý AI"*, gọi người học là *"bạn"*.
  - Giữ thái độ hỗ trợ khách quan, kiên nhẫn, khuyến khích học tập.
* **Nguyên tắc giải thích:**
  - Ngắn gọn từ 2 đến 4 gạch đầu dòng (dưới 80 từ).
  - Dùng hình ảnh đời thường dễ hiểu: RAM = *mặt bàn học*, Ổ cứng = *tủ cất sách*, Địa chỉ IP = *số nhà*, Keo tản nhiệt = *hạt đậu xanh*.
* **Ranh giới nội dung (Strict Scope):**
  - Chỉ trả lời về CNTT, phần cứng, mạng, Windows/Linux, tin học ứng dụng.
  - Từ chối lịch sự các chủ đề ngoài ngành (tình cảm, giải trí, làm thơ, giải bài tập Toán/Lý/Hóa ngoài ngành).

---

## 4. QUY CHUẨN GIAO DIỆN TỐI GIẢN (SHADCN/UI & PROGRESSIVE DISCLOSURE)
1. **Phong Cách Tối Giản Cực Hạn (Minimalist Slate/Zinc Palette - shadcn/ui):**
   - Không dùng gradient màu mè cầu vồng gây nhức mắt trên điện thoại.
   - Bảng màu: Nền xám nhạt (`bg-slate-50`), thẻ trắng (`bg-white border-slate-200`), chữ đậm (`text-slate-900`), màu nhấn xanh navy / đen sâu.
2. **Phân Tầng Nhiệm Vụ (Progressive Disclosure - dub.co / cal.com):**
   - **Giao diện Học sinh (Student View):** Mặc định cực kỳ đơn giản (Chọn Bàn ➔ Tick 3 điểm an toàn ➔ Luyện trắc nghiệm).
   - **Bảng Điều Khiển Của Thầy (Teacher Cockpit):** Gom gọn gàng trong nút **[ 🔐 Bảng Của Thầy ]** (Modal/Drawer), không phơi bày làm rối mắt học sinh.
3. **Thẻ Trượt 1-Chạm (Card Wizard / Duolingo style):**
   - 1 Màn hình = 1 Nhiệm vụ duy nhất.
   - Nút bấm to xúc giác (chiều cao tối thiểu 48px), chống bấm nhầm trên màn hình cảm ứng.

---

## 5. BẢO MẬT & KỸ THUẬT HỆ THỐNG
* **An Toàn Dữ Liệu Hai Lớp (Dual-Layer Persistence - Zero Data Loss):** Lưu đồng thời `localStorage` và Cloudflare D1.
* **Bảo mật:** Mật mã `TEACHER_SECRET` bảo vệ các API quản trị và trang `/admin/*`. Tuyệt đối không để lộ khóa bí mật ra HTML/JS client.
* **Tiêu chuẩn Code:** Kiểm tra `npm run build` trước khi hoàn tất: Đảm bảo **0 lỗi (0 errors)** và **0 cảnh báo (0 warnings)**.

---

## 6. MÔI TRƯỜNG THỰC HÀNH PHÒNG MÁY (WINDOWS 10 MANDATE)
* **Hệ điều hành thực hành bắt buộc:** Chuẩn hóa **100% trên Windows 10** (phiên bản Windows 10 Pro / Enterprise được cài đặt tại các phòng máy thực hành).
* **Quy chuẩn Giao diện & Thao tác:**
  - Mọi hướng dẫn từng bước (Step-by-step), phím tắt, cửa sổ thiết lập, ảnh chụp màn hình thực tế và sơ đồ trực quan **BẮT BUỘC theo chuẩn Windows 10**:
    - **Cửa sổ Settings Windows 10:** Giao diện phẳng, danh mục `Network & Internet` với menu điều hướng bên trái và thanh tìm kiếm chính giữa.
    - **Control Panel & Network and Sharing Center:** Giữ nguyên giao diện cổ điển của Windows 10.
    - **File Explorer Windows 10:** Thanh công cụ Ribbon cổ điển (File, Home, Share, View).
    - **Command Prompt (CMD):** Giao diện console đen truyền thống của Windows 10 (`cmd.exe`).
  - ❌ **TUYỆT ĐỐI KHÔNG DÙNG GIAO DIỆN WINDOWS 11:** Không dùng ảnh chụp hoặc mô tả giao diện Windows 11 (Taskbar căn giữa, menu Settings bo tròn kiểu Win 11, menu chuột phải rút gọn) để tránh gây nhầm lẫn, bỡ ngỡ cho học sinh khi thao tác trên máy phòng lab.

---

## 7. CẤU HÌNH PHÒNG MÁY THỰC TẾ & BẢN ĐỒ LINH KIỆN THỊ TRƯỜNG (HARDWARE MANDATE)
* **Cấu hình phần cứng phòng máy thực tế (Bối cảnh tìm kiếm ảnh & sinh code):**
  - **Hệ điều hành:** Windows 10 Pro / Enterprise 64-bit.
  - **Bo mạch chủ (Mainboard):** Chipset Intel H510 (ASUS Prime H510, MSI H510M, Winnfox H510).
  - **Bộ nhớ trong (RAM):** 8GB DDR4 (Bus 2666MHz / 3200MHz, dạng thanh đơn hoặc 2x4GB).
  - **Ổ cứng lưu trữ:** SSD 128GB hoặc 256GB (chuẩn 2.5" SATA III hoặc M.2 NVMe PCIe).
  - **Card đồ họa rời (VGA):** NVIDIA GeForce GT 730 2GB GDDR5.
* **Quy chuẩn tìm kiếm hình ảnh & văn phong hướng dẫn:**
  - 🎯 **Bám sát cấu hình thực tế:** Ưu tiên 100% hình ảnh thực tế của linh kiện đúng phân khúc trên (Socket LGA1200, Main H510, RAM DDR4 tản thường/chân khuyết lệch, VGA GT 730 quạt đơn/tản nhôm). Tuyệt đối không dùng linh kiện cổ lỗ sĩ (G31, 945, DDR2, LGA775) hoặc linh kiện quá cao cấp (RTX 4090, Main Z790) làm học sinh hoang mang, xa rời thực tế.
  - 🛡️ **An toàn Poka-Yoke & Chống tĩnh điện (ESD):** Luôn nhắc nhở chạm tay vào vỏ kim loại case trước khi thao tác, rút dây nguồn trước 30 giây để tụ xả hết điện, cắm linh kiện "đúng chiều - đúng ngàm", **TUYỆT ĐỐI KHÔNG DÙNG SỨC ÉP/ẤN MẠNH** khi thấy kẹt.
* **Bản đồ mở rộng kiến thức thị trường cho học sinh 9+3:**
  - **Dòng Mainboard theo phân khúc:**
    - Dòng H (H510, H610): Phổ thông, văn phòng, phòng lab thực hành, giá rẻ, tính năng cơ bản.
    - Dòng B (B560, B660, B760): Tầm trung, gaming, đồ họa, tản nhiệt VRM tốt, hỗ trợ mở rộng nhiều khe M.2 và RAM.
    - Dòng Z (Z590, Z690, Z790): Cao cấp, cho phép ép xung (Overclock), nhiều cổng kết nối, linh kiện chuẩn quân đội.
    - Dòng A/X của AMD: A520 (phổ thông), B550 (tầm trung), X570 (cao cấp).
  - **Quy tắc đọc tên CPU & Hậu tố:**
    - Thế hệ CPU: Số hàng nghìn đầu tiên (Core i5-**10**400 là Gen 10, i5-**11**400 là Gen 11, i5-**12**400 là Gen 12).
    - Hậu tố K: Cho phép ép xung mở khóa nhân (Unlocked).
    - Hậu tố F: Không tích hợp đồ họa (bắt buộc phải cắm VGA rời mới lên hình).
    - Hậu tố KF: Vừa ép xung được vừa không có GPU tích hợp.
    - Hậu tố H / HX / U (Laptop): H/HX là chip hiệu năng cao cho laptop gaming/đồ họa; U là chip tiết kiệm điện cho văn phòng mỏng nhẹ.
    - Không có hậu tố: Chip tiêu chuẩn cho máy bàn có sẵn GPU Intel UHD Graphics.
  - **Các đời RAM & Tần số Bus:**
    - DDR3: Khe cắm cũ, khuyết chính giữa, Bus 1333/1600 MHz.
    - DDR4: Khe cắm hiện đại, khuyết hơi lệch, Bus 2400/2666/3200 MHz (cấu hình phòng máy thực tế).
    - DDR5: Thế hệ mới nhất, khuyết gần chính giữa, tích hợp chip quản lý nguồn PMIC, Bus 4800/5600/6000+ MHz.
    - Kỹ thuật Dual-Channel: Cắm 2 thanh cùng dung lượng/bus để tăng gấp đôi băng thông truyền dữ liệu (mặt bàn 2 làn xe).
