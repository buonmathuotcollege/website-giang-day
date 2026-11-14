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
