# QUY CHUẨN VẬN HÀNH AI AGENT (CHUẨN LAUREN TAN - VERIFICATION FIRST)

Tài liệu này xác định kiến trúc khai thác AI (AI Harness Engineering) và nguyên tắc vận hành bắt buộc dành cho mọi tác nhân AI (Antigravity, Gemini, Claude, Cursor, Copilot, Codex, Aider) khi làm việc trong dự án này.

---

## 1. KIM TỰ THÁP KỸ THUẬT HARNESS AI (LAUREN TAN HIERARCHY)

Dự án vận hành theo mô hình phân tầng hình nón ngược (Inverted Pyramid) chuẩn Lauren Tan:

```
+-------------------------------------------------------------------------+
|                       Codebase (Mã nguồn)                               |
|        (Thiết kế API tốt, kiến trúc rõ ràng, dễ tái cấu trúc)           |
+-------------------------------------------------------------------------+
|                  Phân tích tĩnh (Static Analysis)                       |
|           (Linter, kiểm tra kiểu dữ liệu, biên dịch, v.v.)               |
+-------------------------------------------------------------------------+
|                        Xác minh (Verification)                          |
|                 (Xác minh hình thức, kiểm thử thực nghiệm)              |
+-------------------------------------------------------------------------+
|                   Hướng dẫn & quy tắc (Prose)                           |
|             (Quy định, kỹ năng, file AGENTS.md, v.v.)                   |
+-------------------------------------------------------------------------+
|                   Con người kiểm duyệt (Human Review)                   |
|                             (Human Review)                              |
+-------------------------------------------------------------------------+
```

### Chi tiết 5 tầng vận hành:

| Tầng | Tên tầng | Vai trò & Trách nhiệm trong dự án |
| :--- | :--- | :--- |
| **1** | **Codebase (Mã nguồn)** | Mã nguồn Batch/PowerShell phải có cấu trúc module, phân tách rành mạch giữa UI (Menu) và Core APIs (`:API_*`). Quản lý phạm vi biến nghiêm ngặt với `setlocal` / `endlocal`. Dễ đọc, dễ tái cấu trúc. |
| **2** | **Phân tích tĩnh (Static Analysis)** | Tự động hóa kiểm tra cú pháp: cấm lệnh `wmic`, cấm tiếng Việt có dấu trong `echo`, kiểm tra cân bằng dấu ngoặc `()`, kiểm tra tính toàn vẹn của nhãn `goto`/`call`, kiểm tra cặp `setlocal`/`endlocal`. |
| **3** | **Xác minh (Verification)** | Kiểm thử thực nghiệm tự động trong môi trường an toàn (Dry-run): kiểm tra CMD parser, kiểm tra các truy vấn hệ thống chỉ đọc (`netsh`, `sc query`, `Get-CimInstance`). Cấm chạy lệnh phá hủy môi trường khi test. |
| **4** | **Hướng dẫn & quy tắc (Prose)** | Các file quy chuẩn văn bản (`AGENTS.md`, `GEMINI.md`, `.agents/rules/`, `.agents/skills/`) định hướng hành vi của AI, ràng buộc bảo mật và chỉ dẫn AI gọi công cụ kiểm tra tự động. |
| **5** | **Con người kiểm duyệt (Human Review)** | Tầng quyết định cuối cùng. Con người chỉ xem xét logic nghiệp vụ cấp cao dựa trên báo cáo có đính kèm **Log thực tế từ Tầng 2 & 3**. Tuyệt đối cấm AI bàn giao suông không có bằng chứng kiểm thử. |

---

## 2. QUY TRÌNH 3 BƯỚC BẮT BUỘC KHI THAO TÁC (3-STEP DISCIPLINE)

Mọi thao tác chỉnh sửa hoặc mở rộng dự án phải tuân thủ nghiêm ngặt 3 bước:

### Bước 1: UNDERSTAND (Thấu hiểu sâu sắc)
- Đọc kỹ toàn bộ mã nguồn liên quan trước khi sửa đổi.
- Kiểm tra tài liệu lệnh Windows (CMD, PowerShell, CIM, Registry, Netsh) nếu chưa chắc chắn 100%.
- Không giả định hành vi của hệ điều hành.

### Bước 2: PLAN (Lập kế hoạch chặt chẽ)
- Xác định rõ khối lệnh cần thêm/sửa, phạm vi tác động và các nhãn điều khiển (`goto`/`call`).
- Dự báo rủi ro hệ thống (đặc biệt là quyền UAC, xung đột biến môi trường, tương thích Windows 10/11).
- Xác định phương án kiểm chứng tự động trước khi bắt tay vào viết mã.

### Bước 3: BUILD & VERIFY (Xây dựng & Xác minh thực tế)
- Sau khi viết mã, **bắt buộc chạy script kiểm tra tự động**:
  ```powershell
  powershell -NoProfile -ExecutionPolicy Bypass -File ".agents\skills\test-batch-script\verify_batch.ps1" -TargetPath "TOOL_IT_HELPDESK_PRO_V3.5_CLEAN_LTS.bat"
  ```
- Toàn bộ 5 bài kiểm tra Static Analysis và 3 bài kiểm tra Verification phải đạt kết quả **100% PASS**.
- Đính kèm toàn bộ log thực tế từ Terminal vào nội dung bàn giao cho người dùng (Human Review).

---

## 3. BẢNG TIÊU CHUẨN KỸ THUẬT CODEBASE (WINDOWS BATCH / POWERSHELL)

1. **Header & Footer**: Luôn bọc bằng `setlocal DisableDelayedExpansion` rồi kích hoạt `EnableDelayedExpansion`, giải phóng đủ số tầng `endlocal` và `popd` tại điểm thoát an toàn `:SAFE_EXIT`.
2. **Khai tử WMIC**: Cấm 100% việc sử dụng lệnh `wmic`. Thay bằng `powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-CimInstance ..."`.
3. **Mã hóa ký tự**: 100% câu lệnh `echo` hiển thị trên màn hình phải là tiếng Việt không dấu chuẩn ASCII để không gây vỡ font trong cửa sổ CMD của Windows.
4. **Cân bằng cú pháp**: Dấu ngoặc `(` và `)` trong các khối `if (...) else (...)` hoặc `for (...) do (...)` phải cân bằng tuyệt đối.
5. **Định tuyến nhãn**: Mọi lệnh `goto :LABEL` hoặc `call :LABEL` phải có nhãn đích tồn tại trong script.
6. **Xử lý ngầm**: Các lệnh dọn dẹp hoặc truy vấn nội bộ phải dùng `>nul 2>&1` để tối ưu hiệu năng.
7. **Kiểm tra mã thoát**: Luôn kiểm tra `%errorLevel%` sau các thao tác thay đổi cấu hình mạng, tường lửa hoặc dịch vụ Windows.
