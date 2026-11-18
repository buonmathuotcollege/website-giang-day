# 🏛️ QUY CHUẨN VẬN HÀNH DỰ ÁN CHO GEMINI & AI AGENTS (GEMINI.MD)
> **Chủ sở hữu:** CN. Phạm Tiến Đông (Giảng viên / Kỹ sư CNTT)  
> **Website cá nhân:** `https://phamtiendong.name.vn`  
> **Nguyên tắc vận hành:** Tuân thủ 100% `AGENTS.md` và Kim tự tháp Lauren Tan (Verification-First).

---

## 1. KIM TỰ THÁP KỸ THUẬT HARNESS AI (LAUREN TAN HIERARCHY)
1. **Codebase (Mã nguồn)**: Thiết kế API tốt, kiến trúc rõ ràng, dễ tái cấu trúc (tách biệt Menu UI và hàm `:API_*`).
2. **Phân tích tĩnh (Static Analysis)**: Linter tự động, cấm `wmic`, cấm dấu tiếng Việt trong `echo`, kiểm tra cặp ngoặc và nhãn `goto`/`call`.
3. **Xác minh (Verification)**: Kiểm thử thực nghiệm an toàn qua dry-run và kiểm tra CMD parser, CIM/PowerShell engine.
4. **Hướng dẫn & quy tắc (Prose)**: Quy định trong `AGENTS.md`, `GEMINI.md`, `.agents/rules/` và `.agents/skills/`.
5. **Con người kiểm duyệt (Human Review)**: Báo cáo minh bạch, đính kèm bằng chứng kiểm thử thực tế để con người phê duyệt.

---

## 2. QUY TRÌNH 3 BƯỚC BẮT BUỘC (3-STEP DISCIPLINE)
1. **UNDERSTAND**: Đọc kỹ toàn bộ mã nguồn hiện có trước khi sửa đổi. Tra cứu tài liệu lệnh Windows nếu chưa chắc chắn 100%.
2. **PLAN**: Lập kế hoạch ngắn gọn nêu rõ khối lệnh sẽ thêm/sửa, tác động hệ thống và cách kiểm chứng.
3. **BUILD & VERIFY**: Cấm báo cáo xong suông. Sau khi sửa file `.bat`, bắt buộc phải tự kiểm tra cú pháp và chạy thử an toàn qua Terminal bằng lệnh:
   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File ".agents\skills\test-batch-script\verify_batch.ps1" -TargetPath "TOOL_IT_HELPDESK_PRO_V3.5_CLEAN_LTS.bat"
   ```
   Chỉ khi kết quả đạt **100% PASS** mới được đính kèm log thực tế khi bàn giao cho Human Review.

---

## 3. TIÊU CHUẨN KỸ THUẬT CODEBASE BATCH / POWERSHELL
- **Header & Footer**: Khởi đầu với `setlocal DisableDelayedExpansion` rồi `EnableDelayedExpansion`, dọn dẹp đủ số tầng `endlocal` và `popd` tại điểm thoát `:SAFE_EXIT`.
- **Khai tử WMIC**: Cấm 100% lệnh `wmic`. Thay thế hoàn toàn bằng PowerShell `Get-CimInstance`.
- **Mã hóa ký tự**: 100% câu lệnh `echo` hiển thị phải là tiếng Việt không dấu chuẩn ASCII.
- **Cân bằng cú pháp**: Dấu ngoặc `()` trong các khối điều kiện / vòng lặp phải cân bằng tuyệt đối.
- **Định tuyến nhãn**: Toàn bộ lệnh `goto :LABEL` hoặc `call :LABEL` phải có nhãn đích tồn tại trong script.
- **Xử lý ngầm**: Các lệnh dọn dẹp nội bộ phải sử dụng `>nul 2>&1`.
- **Kiểm tra mã thoát**: Luôn kiểm tra `%errorLevel%` sau các thao tác thay đổi cấu hình mạng, tường lửa hoặc dịch vụ.
