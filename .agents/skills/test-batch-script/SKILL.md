---
name: test-batch-script
description: Automated verification harness for Windows Batch scripts (Lauren Tan Hierarchy - Static Analysis & Verification).
metadata:
  author: Senior Windows System Engineer
  framework: Lauren Tan Harness Engineering Hierarchy (Verification First)
  version: 1.0.0
---

# Test Batch Script Skill (Lauren Tan Verification Harness)

Skill này cung cấp bộ công cụ phân tích tĩnh (Static Analysis) và kiểm thử thực nghiệm an toàn (Verification) cho các script Windows Batch (`.bat` / `.cmd`), đặc biệt là các công cụ IT Helpdesk quản trị hệ thống.

## Cách sử dụng

Chạy lệnh kiểm tra từ Terminal:
```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File ".agents\skills\test-batch-script\verify_batch.ps1" -TargetPath "<Đường_dẫn_file_bat>"
```

Ví dụ:
```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File ".agents\skills\test-batch-script\verify_batch.ps1" -TargetPath "TOOL_IT_HELPDESK_PRO_V3.5_CLEAN_LTS.bat"
```

## Các bài kiểm tra được thực hiện

### Tầng 2: Phân tích tĩnh (Static Analysis - 5 bài kiểm tra)
1. **Zero WMIC Policy**: Cấm hoàn toàn lệnh `wmic`, bắt buộc dùng `Get-CimInstance`.
2. **ASCII Only in Echo**: Cấm tiếng Việt có dấu trong `echo` để tránh vỡ font CMD.
3. **Parentheses Balance Check**: Kiểm tra cân bằng tuyệt đối cặp ngoặc `()`.
4. **Label Routing Integrity**: Mọi lệnh `goto :LABEL` hoặc `call :LABEL` phải có nhãn đích tồn tại trong script.
5. **Scope & Safe Exit**: Kiểm tra cặp `setlocal`/`endlocal` và nhãn thoát an toàn `:SAFE_EXIT`.

### Tầng 3: Xác minh thực nghiệm an toàn (Verification - 3 bài kiểm tra)
1. **CMD Parser Check**: Kiểm tra parser cú pháp của CMD không gây lỗi crash.
2. **CIM / PowerShell Engine Compatibility**: Xác minh môi trường PowerShell/CIM sẵn sàng cho Windows 10/11.
3. **Safety Guardrails**: Rà soát các lệnh phá hủy hệ thống không được bảo vệ.
