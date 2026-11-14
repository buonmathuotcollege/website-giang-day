# 🏛️ QUY CHUẨN THIẾT KẾ & TRIỂN KHAI CHO CÁC ĐẠI LÝ AI (AGENTS.MD)
> **Dành cho mọi AI Agent (Antigravity, Cursor, Windsurf, Gemini, Claude, Copilot...):**  
> Khi thực hiện bất kỳ tác vụ nào trên dự án này, AI **BẮT BUỘC PHẢI ĐỌC VÀ TUÂN THỦ 100%** bộ quy chuẩn phong cách, tinh thần thiết kế và các ranh giới dưới đây.

---

## 1. THÔNG TIN DỰ ÁN & CHÂN DUNG NGƯỜI DÙNG
* **Chủ sở hữu & Giảng viên phụ trách:** CN. Phạm Tiến Đông
* **Đơn vị công tác:** Khoa Công nghệ Thông tin - Trường Cao đẳng Buôn Ma Thuột
* **Domain sản xuất:** `https://phamtiendong.name.vn` (Astro 5 + Cloudflare Pages SSR Edge)
* **Đối tượng học sinh trọng tâm:** Học sinh hệ **Trung cấp 9+3 (15 - 18 tuổi)**
  - Vừa tốt nghiệp THCS đi học nghề, khả năng tiếp thu lý thuyết ở mức trung bình.
  - Rất ngại đọc những bức tường chữ dài, trừu tượng.
  - Học tốt nhất qua **thực hành trực quan, "mắt thấy - tay làm", ví von đời thường**.
  - Phần lớn các em truy cập và làm bài bằng **điện thoại di động (Smartphone)**.

---

## 2. TRIẾT LÝ SƯ PHẠM & TINH THẦN THIẾT KẾ CỐT LÕI

### A. Tinh Thần Đời Thường & Trực Quan Hóa (No Academic Jargon)
Mọi giải thích kỹ thuật phải quy về các hình ảnh đời thường quen thuộc mà học sinh 15-18 tuổi đều biết:
* **RAM:** Giống cái *"Mặt bàn học"* (bày sách vở ra làm việc, mặt bàn càng rộng mở được càng nhiều việc cùng lúc, dọn bàn/tắt máy là hết).
* **Ổ cứng (SSD/HDD):** Giống cái *"Tủ sách / Cặp tài liệu"* (cất giữ lâu dài, tắt máy không mất).
* **Địa chỉ IP:** Giống *"Số nhà, tên đường"* để bưu tá chuyển phát thư đúng nơi.
* **Băng thông mạng (Bandwidth):** Giống *"Độ rộng ống nước"* (ống càng to nước chảy càng nhanh).
* **CPU:** Giống *"Bộ não của người thợ tính toán"*.
* **Tra keo tản nhiệt:** Luôn nhấn mạnh liều lượng chuẩn bằng *"Hạt đậu xanh / Hạt gạo"*.

### B. Triết Lý Kỹ Thuật Nhật Bản (5S & Poka-Yoke Chống Lỗi)
* **Poka-Yoke (Chống cắm ngược / Chống thao tác nhầm):** Mọi khe cắm, nút bấm, biểu mẫu phải có gờ định vị hoặc thông báo ngăn chặn học sinh làm sai trước khi xảy ra hậu quả.
* **3 Luật sống còn & 3 Điểm dừng an toàn:** Đưa vào quy trình thực hành như phản xạ tự nhiên của người thợ lành nghề.
* **Tác phong sư phạm:** Luôn xưng *"thầy"*, gọi *"em"*, động viên, ân cần và kiên nhẫn.

---

## 3. NHỮNG ĐIỀU BẮT BUỘC PHẢI TẬP TRUNG (DOs)

1. **Mobile-First & 1-Chạm:**
   - Mọi nút bấm, thẻ lựa chọn phải có chiều cao tối thiểu 44px, độ tương phản cao, dễ bấm bằng ngón tay cái trên màn hình cảm ứng.
   - Ưu tiên thẻ hành động nhanh (Quick Action Cards), tự động gợi ý danh sách học sinh (Datalist Autocomplete).
2. **An Toàn Dữ Liệu Hai Lớp (Dual-Layer Persistence - Zero Data Loss):**
   - Dữ liệu lớp học và học sinh phải được lưu song song ở `localStorage` của máy Thầy và đồng bộ lên Cloudflare.
   - **Quy tắc vàng:** ID lớp học luôn mang tính đơn định (`cls_03tha9`, `cls_03tha8`), không bao giờ dùng ID ngẫu nhiên có đuôi thời gian.
   - **Tuyệt đối không bao giờ** để mảng rỗng `[]` từ máy chủ ghi đè làm mất danh sách học sinh Thầy đã nạp trên máy tính.
3. **Bảo Mật Nghiêm Ngặt Khu Vực Giảng Viên:**
   - Mọi trang `/admin/*` và API chỉnh sửa (`POST/DELETE`) phải kiểm tra `checkAdminAuth`.
   - Mật mã giáo viên (`TEACHER_SECRET`) phải được bảo mật, nhập sai phải từ chối ngay (HTTP 401).
   - Có tùy chọn tự hủy phiên đăng nhập khi đóng tab trên máy tính công cộng.
4. **Hiệu Năng Cực Hạn (Edge & CDN Speed):**
   - Các trang nội dung bài giảng, thi sát hạch phải được khai báo `export const prerender = true;` để Cloudflare CDN phục vụ với độ trễ 0ms.
   - Chatbot AI sử dụng dòng mô hình siêu nhẹ, tốc độ cao (`gemini-3.5-flash-lite`).
5. **Tiêu Chuẩn Code:**
   - Kiểm tra `npm run build` trước khi hoàn tất: Đảm bảo **0 lỗi (0 errors)** và **0 cảnh báo (0 warnings)**.

---

## 4. NHỮNG ĐIỀU TUYỆT ĐỐI KHÔNG ĐƯỢC TRIỂN KHAI (DON'Ts)

1. ❌ **KHÔNG** viết những đoạn văn lý thuyết hàn lâm, dài dằng dặc, mang nặng tính học thuật đại học khiến học sinh 9+3 bị ngợp và nản chí.
2. ❌ **KHÔNG** hiển thị các cửa sổ popup kỹ thuật rối rắm (như yêu cầu vào Cloudflare dashboard binding, hướng dẫn D1 thủ công) gây cảm giác thiếu chuyên nghiệp.
3. ❌ **KHÔNG** để lộ mật khẩu, khóa bí mật hoặc token ra mã HTML/JS phía máy khách (F12).
4. ❌ **KHÔNG** cho phép Trợ Giảng AI trả lời các chủ đề ngoài ngành (tình cảm yêu đương, thơ văn, giải trí, chơi game, giải bài tập Toán/Lý/Hóa ngoài ngành CNTT). Khi gặp các câu hỏi này, AI phải từ chối khéo léo và hướng học sinh quay lại bài học.
5. ❌ **KHÔNG** tự ý sửa đổi hoặc xóa bỏ các cấu trúc dữ liệu đã được Thầy chuẩn hóa (`03THA8`, `03THA9`, chuẩn đánh giá Thông tư 55).
