// ============================================================================
// BỘ KIỂM THỬ TỰ ĐỘNG (tests/test_scoring_and_telex.mjs)
// Kiểm tra tự động 4 logic quan trọng nhất khi chỉnh sửa code:
// 1. Chuẩn hóa Unicode NFC & phân biệt chữ HOA/thường khi chấm gõ Telex
// 2. Công thức tính điểm tổng kết Thang 10 theo trọng số (25% - 30% - 25% - 20%)
// 3. Hàm escapeHtml() chống lỗ hổng XSS
// 4. Hàm csvSafeCell() chống lỗ hổng CSV Formula Injection (=, +, -, @)
// Chạy thử bằng lệnh: node tests/test_scoring_and_telex.mjs
// ============================================================================

import assert from 'node:assert/strict';

function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function csvSafeCell(val) {
  let s = String(val == null ? '' : val).replace(/"/g, '""');
  if (/^[=+\-@\t\r]/.test(s)) {
    s = "'" + s;
  }
  return `"${s}"`;
}

function computeWeightedGrade10(mouse, telex, word, excel) {
  const w100 = (mouse * 0.25) + (telex * 0.30) + (word * 0.25) + (excel * 0.20);
  return Number((w100 / 10).toFixed(1));
}

function checkTelexMatch(inputRaw, targetRaw) {
  const val = String(inputRaw || '').trim().replace(/\s+/g, ' ').normalize('NFC');
  const target = String(targetRaw || '').trim().replace(/\s+/g, ' ').normalize('NFC');
  return val === target;
}

// Test 1: Unicode NFC vs NFD normalization & Case sensitivity
const nfcTarget = "Trường Cao đẳng Buôn Ma Thuột";
const nfdInput = "Trường Cao đẳng Buôn Ma Thuột".normalize("NFD");
assert.equal(checkTelexMatch(nfdInput, nfcTarget), true, "NFD input must match NFC target after .normalize('NFC')");
assert.equal(checkTelexMatch("trường cao đẳng buôn ma thuột", nfcTarget), false, "Wrong lowercase must be rejected");

// Test 2: Weighted 10-point score calculation
assert.equal(computeWeightedGrade10(100, 100, 100, 100), 10.0, "All 100s -> 10.0");
assert.equal(computeWeightedGrade10(100, 0, 0, 0), 2.5, "Only Mouse 100 -> 2.5/10 (not 10/10!)");
assert.equal(computeWeightedGrade10(80, 80, 60, 50), 6.9, "Weighted average check");

// Test 3: XSS escaping
const xssPayload = '<script>alert("xss")</script>';
assert.equal(escapeHtml(xssPayload), '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;', "XSS payload must be escaped");

// Test 4: CSV Formula Injection guard
assert.equal(csvSafeCell('=SUM(A1:A5)'), `"'=SUM(A1:A5)"`, "Formula starting with = must be prefixed with single quote");
assert.equal(csvSafeCell('+cmd|" /C calc"!A0'), `"'+cmd|"" /C calc""!A0"`, "Formula starting with + and quotes must be sanitized");

console.log("✅ TẤT CẢ 4 BỘ KIỂM THỬ TỰ ĐỘNG (TELEX NFC, ĐIỂM TRỌNG SỐ, XSS, CSV INJECTION) ĐỀU ĐẠT 100%!");
