<!--
SYNC IMPACT REPORT
==================
Version change: (initial) → 1.0.0
Bump rationale: Initial ratification of the project constitution for the personal teaching and IT vocational training portal (phamtiendong.name.vn) following GitHub Spec Kit standard.
Ratified by: CN. Phạm Tiến Đông (Giảng viên / Kỹ sư CNTT)

Principles defined:
  I.    Brand Ownership & Neutral Institutional Identity (STRICT & NON-NEGOTIABLE)
  II.   Pedagogical Empathy for Intermediate Vocational Students (Trung cấp 9+3, 15-18 tuổi)
  III.  Standard Technical Nomenclature (KTV 1, KTV 2, KTV 3 - NO Workshop Slang)
  IV.   AI Teaching Assistant Persona & Strict Scope Boundaries
  V.    Minimalist Slate/Zinc Interface Discipline (shadcn/ui & Progressive Disclosure)
  VI.   Lab Hardware Baseline & 100% Windows 10 Mandate (Strictly NO Windows 11)
  VII.  Dual-Layer Data Persistence & Zero Data Loss
  VIII. Zero-Defect Code Quality & Build Gate (0 errors, 0 warnings)

Templates reviewed for alignment:
  ✅ .specify/templates/spec-template.md - Aligned with student scenarios & KTV workflows
  ✅ .specify/templates/plan-template.md - Aligned with Astro/Preact/Tailwind & Windows 10 constraints
  ✅ .specify/templates/tasks-template.md - Aligned with atomic task execution and testing gates
  ✅ .specify/templates/checklist-template.md - Aligned with mobile testing & build validation
-->

# Hiến Chương Dự Án (Project Constitution)
**Website Giảng Dạy CNTT · CN. Phạm Tiến Đông**  
*Cổng Học Tập, Luyện Thi Kỹ Năng Nghề & Khảo Sát Năng Lực CNTT*  
**Hệ thống**: `https://phamtiendong.name.vn`

Hiến chương này là văn bản quản trị tối cao (Supreme Governance) của toàn bộ dự án `website-giang-day`. Mọi tác tử AI (Antigravity, GitHub Copilot, Claude Code, Cursor...), cộng tác viên kỹ thuật và quy trình sinh mã (Spec-Driven Development) **BẮT BUỘC PHẢI TUÂN THỦ 100%**, không có ngoại lệ.

---

## Các Nguyên Tắc Cốt Lõi (Core Principles)

### I. Bản Quyền Tác Giả & Định Danh Tổ Chức Trung Tính (Strict Brand Boundary)
- **Chủ sở hữu duy nhất**: CN. Phạm Tiến Đông (Kỹ sư CNTT / Giảng viên).
- **Tính chất**: Đây là website cá nhân phục vụ nghiên cứu sư phạm, lưu trữ giáo trình, bài giảng điện tử và bài tập thực hành.
- ❌ **TUYỆT ĐỐI CẤM ĐƯA TÊN TRƯỜNG CỤ THỂ VÀO BẤT KỲ ĐÂU**:
  - Không được đề cập tên trường cụ thể (như "Trường Cao đẳng Buôn Ma Thuột", "CĐ Buôn Ma Thuột", "BMTC",...) trên bất kỳ giao diện, tài liệu đặc tả (spec), mã nguồn, bình luận code hay commit git.
  - Sử dụng định danh chuẩn trung tính: *"Cổng Học Tập & Giảng Dạy CNTT - CN. Phạm Tiến Đông"* hoặc *"Website Giảng Dạy CNTT"*.

### II. Thấu Cảm Sư Phạm & Đối Tượng Học Sinh Trọng Tâm (Pedagogical Empathy)
- **Đối tượng người học**: Học sinh hệ Trung cấp 9+3 (độ tuổi 15 - 18 tuổi).
- **Đặc điểm tiếp thu**:
  - Khả năng đọc hiểu văn bản lý thuyết dài ở mức trung bình; rất ngại đọc "những bức tường chữ" trừu tượng.
  - Tiếp thu tốt nhất qua **thực hành trực quan, "mắt thấy - tay làm", ví von đời thường** (RAM = *mặt bàn làm việc*, Ổ cứng = *tủ cất sách*, Địa chỉ IP = *số nhà*, Keo tản nhiệt = *hạt đậu xanh*).
- **Môi trường thiết bị ưu tiên**: Đa số học sinh truy cập và làm bài bằng **điện thoại di động (Smartphone)**.
  - Giao diện phải chuẩn Mobile-First.
  - Mọi nút bấm tương tác phải có kích thước tối thiểu **48px**, chống bấm nhầm trên màn hình cảm ứng nhỏ.
  - Bảng biểu kỹ thuật trên mobile phải có thanh cuộn ngang mượt hoặc chuyển sang dạng thẻ (Card view), tuyệt đối không để vỡ khung (overflow).

### III. Chuẩn Mực Thuật Ngữ Kỹ Thuật (Professional KTV Standards - NO Workshop Slang)
- ❌ **TUYỆT ĐỐI KHÔNG DÙNG TIẾNG LÓNG BÌNH DÂN / THỢ THUYỀN DÂN DÃ**:
  - Nghiêm cấm các từ: *"bí kíp thợ"*, *"người thợ 20 năm nghề"*, *"thợ chính"*, *"thợ phụ"*, *"kíp thợ"*, *"xưởng thợ"*. Những từ này làm giảm tính mô phạm và chuẩn mực đào tạo nghề kỹ thuật.
- ✅ **CHUẨN HÓA BẰNG HỆ THỐNG VAI TRÒ KỸ THUẬT VIÊN (KTV)**:
  - **Nhóm KTV / Bàn Kỹ Thuật**: Thay cho "Kíp thợ".
  - **KTV 1 (Thao tác chính / Operator)**: Chịu trách nhiệm tháo lắp cơ khí, cắm linh kiện, phân vùng ổ đĩa, cài hệ điều hành, bấm dây mạng.
  - **KTV 2 (Kiểm soát an toàn & Poka-Yoke)**: Kiểm tra 3 điểm dừng an toàn, bóc nilon tản nhiệt, tra keo tản nhiệt đúng liều lượng, kiểm tra chống cắm ngược, rà soát tiếp đất chống tĩnh điện (ESD).
  - **KTV 3 (Ghi chép & Báo cáo kỹ thuật)**: Ghi chép thông số cấu hình, nhiệt độ test tải (FurMark, Prime95), lập biên bản nghiệm thu và phiếu bàn giao máy.
  - **Quy trình tiêu chuẩn / Kinh nghiệm thực chiến**: Thay cho "Bí kíp 20 năm".

### IV. Vai Trò & Ranh Giới Của Trợ Lý AI (AI Teaching Assistant Guardrails)
- ❌ **BOT TUYỆT ĐỐI KHÔNG ĐÓNG VAI HOẶC XƯNG LÀ "THẦY ĐỒNG"**:
  - AI là **Trợ Lý AI Học Tập CNTT (AI Teaching Assistant)**, một công cụ công nghệ hỗ trợ người học.
  - Xưng hô chuẩn mực: Tự xưng là *"mình"* hoặc *"Trợ lý AI"*, gọi người học là *"bạn"*.
  - Giữ thái độ hỗ trợ khách quan, kiên nhẫn, khuyến khích học tập.
- **Quy tắc giải thích**:
  - Ngắn gọn từ 2 đến 4 gạch đầu dòng (dưới 80 từ cho mỗi câu trả lời trực diện).
  - Luôn gắn liền với ví von đời thường hoặc quy tắc an toàn Poka-Yoke.
- **Ranh giới nội dung (Strict Scope Boundary)**:
  - Chỉ trả lời về CNTT: phần cứng PC, mạng máy tính, hệ điều hành Windows/Linux, bảo mật cơ bản, tin học văn phòng ứng dụng.
  - Từ chối lịch sự mọi chủ đề ngoài phạm vi (tình cảm, làm thơ, giải trí, giải bài tập Toán/Lý/Hóa ngoài ngành).

### V. Phong Cách Thiết Kế Tối Giản Cực Hạn (Minimalist Slate/Zinc & Progressive Disclosure)
- **Bảng màu tiêu chuẩn**: Kế thừa ngôn ngữ `shadcn/ui`.
  - Nền xám nhạt (`bg-slate-50`), thẻ trắng viền xám (`bg-white border-slate-200`), chữ xám đen tương phản cao (`text-slate-900`), màu nhấn xanh navy / đen sâu (`bg-slate-900 text-white`).
  - ❌ Tuyệt đối không dùng gradient màu mè cầu vồng gây nhức mắt trên màn hình điện thoại.
- **Phân tầng nhiệm vụ (Progressive Disclosure)**:
  - **Giao diện Học sinh (Student View)**: Mặc định cực kỳ tinh gọn (1 Màn hình = 1 Nhiệm vụ).
  - **Bảng Điều Khiển Của Thầy (Teacher Cockpit)**: Gom kín đáo trong modal/drawer bảo vệ bằng mật khẩu (`TEACHER_SECRET`), không phơi bày làm rối mắt học sinh.
- **Thẻ trượt 1-chạm (Card Wizard)**: Hỗ trợ học tập dạng micro-learning (tương tự phong cách Duolingo).

### VI. Chuẩn Mực Hệ Điều Hành & Cấu Hình Phòng Máy Thực Tế (Windows 10 & Hardware Mandate)
- **Hệ điều hành thực hành bắt buộc**: Chuẩn hóa **100% trên Windows 10** (phiên bản Windows 10 Pro / Enterprise 64-bit đang dùng tại phòng máy).
  - Mọi hướng dẫn từng bước (Step-by-step), phím tắt, cửa sổ cài đặt, ảnh chụp màn hình minh họa và sơ đồ trực quan **BẮT BUỘC theo giao diện Windows 10**:
    - Cửa sổ Settings Windows 10: Giao diện phẳng, Network & Internet với menu trái.
    - Control Panel & Network and Sharing Center: Giữ giao diện classic Windows 10.
    - File Explorer: Thanh Ribbon cổ điển (File, Home, Share, View).
    - Command Prompt (`cmd.exe`): Giao diện console đen truyền thống.
  - ❌ **TUYỆT ĐỐI KHÔNG DÙNG GIAO DIỆN WINDOWS 11**: Không dùng ảnh hay mô tả Taskbar căn giữa, Settings bo góc hay menu chuột phải rút gọn của Windows 11.
- **Cấu hình phần cứng phòng máy thực tế**:
  - Mainboard: Intel H510 (Socket LGA1200 - ASUS Prime H510M, MSI H510M, Winnfox H510).
  - CPU: Intel Core thế hệ 10 / 11 (Socket LGA1200).
  - RAM: 8GB DDR4 (Bus 2666MHz / 3200MHz).
  - Lưu trữ: SSD 128GB / 256GB (SATA III 2.5" hoặc M.2 NVMe PCIe).
  - Card đồ họa rời (VGA): NVIDIA GeForce GT 730 2GB GDDR5.
  - 🎯 Mọi bài tập phân tích, lắp ráp, chẩn đoán lỗi phải bám sát cấu hình này, không lấy linh kiện quá cổ (G31, 945, DDR2) hoặc quá xa vời thực tế (RTX 4090, Main Z790).

### VII. An Toàn Dữ Liệu Hai Lớp (Dual-Layer Persistence - Zero Data Loss)
- Mọi trạng thái làm bài, lịch sử bốc thăm đề thi, điểm thi trắc nghiệm, và nhật ký KTV phải được bảo lưu an toàn:
  1. **Lớp 1 (Local Layer)**: Lưu trữ tức thì vào `localStorage` của trình duyệt người học (không mất dữ liệu khi mất mạng hoặc reload trang).
  2. **Lớp 2 (Cloud Layer)**: Đồng bộ ngầm lên Cloudflare D1 / Workers API khi có kết nối mạng ổn định.

### VIII. Cổng Chất Lượng Bản Dựng Tuyệt Đối (Zero-Defect Build Quality Gate)
- Mã nguồn trang web kết hợp Astro, Next.js và Tailwind CSS.
- Trước khi nghiệm thu bất kỳ tính năng hoặc commit mã nguồn lên GitHub:
  - Lệnh `npm run build` phải thực thi thành công mỹ mãn.
  - Tiêu chuẩn bắt buộc: **0 LỖI (0 errors)** và **0 CẢNH BÁO (0 warnings)**.
  - Tuyệt đối không để xảy ra lỗi cú pháp JSX, TypeScript hay đường dẫn hỏng.

---

## Quy Trình Vận Hành Hướng Đặc Tả (Spec-Driven Lifecycle)

Mọi tính năng mới hoặc bài học bổ sung phải tuân thủ chu trình 6 bước của GitHub Spec Kit:

```
[ Hiến Chương (Constitution) ]
           │
           ▼
1. ĐẶC TẢ TÍNH NĂNG (/speckit-specify) ➔ Sinh ra specs/[###-ten-tinh-nang]/spec.md
           │
           ▼
2. LÀM RÕ YÊU CẦU (/speckit-clarify)  ➔ Giải tỏa các điểm mơ hồ, xác định ranh giới
           │
           ▼
3. THIẾT KẾ KỸ THUẬT (/speckit-plan)  ➔ Sinh ra plan.md, data-model.md, contracts/
           │
           ▼
4. PHÂN RÃ NHIỆM VỤ (/speckit-tasks) ➔ Sinh ra tasks.md (chia nhỏ theo User Story MVP)
           │
           ▼
5. TRIỂN KHAI MÃ (/speckit-implement) ➔ Viết mã Astro/React/TS đúng chuẩn Hiến Chương
           │
           ▼
6. HỘI TỤ & KIỂM ĐỊNH (/speckit-checklist & /speckit-converge) ➔ Test mobile + npm run build 0 lỗi
```

---

## Quản Trị & Thay Đổi Hiến Chương (Governance)
- Mọi đề xuất thay đổi Hiến chương phải qua rà soát Sync Impact Report.
- Chỉ chủ sở hữu dự án (CN. Phạm Tiến Đông) mới có quyền quyết định nâng cấp phiên bản Hiến chương (MAJOR/MINOR/PATCH).
