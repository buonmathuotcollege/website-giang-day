-- ============================================================================
-- HỆ THỐNG CƠ SỞ DỮ LIỆU CLOUDFLARE D1 (SQLITE TRÊN EDGE)
-- MÔN HỌC: TIN HỌC (CDMH02.1) - TRƯỜNG CAO ĐẲNG BUÔN MA THUỘT
-- ============================================================================

-- 1. BẢNG DANH MỤC LỚP HỌC (Classes)
CREATE TABLE IF NOT EXISTS classes (
  id TEXT PRIMARY KEY,
  class_code TEXT UNIQUE NOT NULL,
  class_name TEXT NOT NULL,
  major TEXT NOT NULL DEFAULT 'Tin học ứng dụng',
  academic_year TEXT NOT NULL DEFAULT '2026-2027',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. BẢNG DANH SÁCH HỌC SINH (Students Roster)
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  class_code TEXT NOT NULL,
  student_number INTEGER NOT NULL,
  full_name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (class_code) REFERENCES classes(class_code)
);

-- 3. BẢNG BUỔI HỌC & MÃ PIN LỚP (Sessions & PIN Control)
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  session_code TEXT NOT NULL,           -- Ví dụ: BUOI_01, BUOI_02...
  session_title TEXT NOT NULL,          -- Ví dụ: Buổi 1 (Ch.1 - Cầm chuột)
  chapter_num INTEGER NOT NULL,         -- 1..6
  class_pin TEXT NOT NULL DEFAULT '',   -- Mã PIN 4-6 ký tự GV viết trên bảng
  is_open_submission INTEGER DEFAULT 1, -- 1: Đang mở nhận bài, 0: Khóa nộp
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. BẢNG KẾT QUẢ THỰC HÀNH CỦA HỌC SINH (Submissions & Scores)
CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,                  -- Khóa chính duy nhất (Server tự sinh)
  date_only TEXT NOT NULL,              -- YYYY-MM-DD
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  class_name TEXT NOT NULL,
  session_name TEXT NOT NULL,
  class_pin TEXT DEFAULT '',
  station TEXT NOT NULL,                -- Số máy: Máy 01, Máy 02...
  student_name TEXT NOT NULL,
  ip_address TEXT DEFAULT '',
  mouse_score INTEGER NOT NULL DEFAULT 0,
  telex_score INTEGER NOT NULL DEFAULT 0,
  word_score INTEGER NOT NULL DEFAULT 0,
  excel_score INTEGER NOT NULL DEFAULT 0,
  ch_avg_score INTEGER NOT NULL DEFAULT 0,
  grade10 REAL NOT NULL DEFAULT 0.0,    -- Server tự tính theo trọng số chuẩn
  status TEXT NOT NULL DEFAULT 'Cần luyện thêm', -- 'ĐẠT' (>=5.0) hoặc 'Cần luyện thêm'
  most_missed TEXT DEFAULT 'Không có',
  clicks INTEGER DEFAULT 0,
  typos INTEGER DEFAULT 0,
  duration_sec INTEGER DEFAULT 0,
  UNIQUE(date_only, class_name, session_name, station, student_name) -- Chống trùng lặp tự động ở tầng CSDL
);

-- 5. BẢNG NHẬT KÝ BẢO MẬT GIẢNG VIÊN (Audit Logs)
CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  actor TEXT NOT NULL DEFAULT 'Giảng viên',
  details TEXT DEFAULT '',
  ip_address TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- CHÈN DỮ LIỆU BAN ĐẦU (SEED DATA: LỚP HỌC & DANH SÁCH 50 HỌC SINH TIN HỌC ỨNG DỤNG)
-- ============================================================================
INSERT OR IGNORE INTO classes (id, class_code, class_name, major) VALUES
  ('cls_thud_k26a', 'THUD_K26A', 'Tin học ứng dụng 9+3 (K26A)', 'Tin học ứng dụng'),
  ('cls_thud_k26b', 'THUD_K26B', 'Tin học ứng dụng 9+3 (K26B)', 'Tin học ứng dụng'),
  ('cls_thud_k25',  'THUD_K25',  'Tin học ứng dụng 9+3 (K25)',  'Tin học ứng dụng'),
  ('cls_dien_93',   'DIEN_93',   'Điện công nghiệp 9+3',        'Điện công nghiệp'),
  ('cls_oto_93',    'OTO_93',    'Công nghệ Ô tô 9+3',          'Công nghệ Ô tô');

-- Chèn danh sách học sinh mẫu lớp Tin học ứng dụng K26A
INSERT OR IGNORE INTO students (id, class_code, student_number, full_name) VALUES
  ('st_01', 'THUD_K26A', 1, 'Nguyễn Văn An'),
  ('st_02', 'THUD_K26A', 2, 'Trần Văn Ba'),
  ('st_03', 'THUD_K26A', 3, 'Lê Thị Bích Cúc'),
  ('st_04', 'THUD_K26A', 4, 'Phạm Minh Dũng'),
  ('st_05', 'THUD_K26A', 5, 'Hoàng Quốc Đạt'),
  ('st_06', 'THUD_K26A', 6, 'H''Hen Niê'),
  ('st_07', 'THUD_K26A', 7, 'Y Đam San Êban'),
  ('st_08', 'THUD_K26A', 8, 'Vũ Thị Hương Giang'),
  ('st_09', 'THUD_K26A', 9, 'Đặng Gia Huy'),
  ('st_10', 'THUD_K26A', 10, 'Bùi Tuấn Kiệt'),
  ('st_11', 'THUD_K26A', 11, 'Nguyễn Thị Khánh Linh'),
  ('st_12', 'THUD_K26A', 12, 'Trần Hoàng Long'),
  ('st_13', 'THUD_K26A', 13, 'Y Minh Mlô'),
  ('st_14', 'THUD_K26A', 14, 'H''Mai Кbuôr'),
  ('st_15', 'THUD_K26A', 15, 'Ngô Bảo Nam'),
  ('st_16', 'THUD_K26A', 16, 'Phan Trọng Nghĩa'),
  ('st_17', 'THUD_K26A', 17, 'Lê Hồng Phúc'),
  ('st_18', 'THUD_K26A', 18, 'Trương Minh Quân'),
  ('st_19', 'THUD_K26A', 19, 'Đỗ Thanh Sơn'),
  ('st_20', 'THUD_K26A', 20, 'Nguyễn Anh Tuấn'),
  ('st_21', 'THUD_K26A', 21, 'Võ Thị Thanh Thảo'),
  ('st_22', 'THUD_K26A', 22, 'Huỳnh Công Thành'),
  ('st_23', 'THUD_K26A', 23, 'Ksor Y Tuyên'),
  ('st_24', 'THUD_K26A', 24, 'Phạm Quốc Việt'),
  ('st_25', 'THUD_K26A', 25, 'Trần Thị Như Ý');

-- Chèn 14 buổi học tương ứng 45 tiết trong đề cương
INSERT OR IGNORE INTO sessions (id, session_code, session_title, chapter_num, class_pin) VALUES
  ('ses_01', 'BUOI_01', 'Buổi 1 (Ch.1 - Cầm chuột)', 1, 'TH01'),
  ('ses_02', 'BUOI_02', 'Buổi 2 (Ch.1 - Gõ Telex)', 1, 'TH02'),
  ('ses_03', 'BUOI_03', 'Buổi 3 (Ch.2 - Tìm kiếm Chrome)', 2, 'TH03'),
  ('ses_04', 'BUOI_04', 'Buổi 4 (Ch.2 - Gửi Gmail)', 2, 'TH04'),
  ('ses_05', 'BUOI_05', 'Buổi 5 (Ch.3 - Word cơ bản)', 3, 'TH05'),
  ('ses_06', 'BUOI_06', 'Buổi 6 (Ch.3 - Đơn xin phép)', 3, 'TH06'),
  ('ses_07', 'BUOI_07', 'Buổi 7 (Ch.3 - Kẻ bảng Word)', 3, 'TH07'),
  ('ses_08', 'BUOI_08', 'Buổi 8 (Ch.4 - Excel cơ bản)', 4, 'TH08'),
  ('ses_09', 'BUOI_09', 'Buổi 9 (Ch.4 - Hàm SUM, AVG)', 4, 'TH09'),
  ('ses_10', 'BUOI_10', 'Buổi 10 (Ch.4 - Hàm IF)', 4, 'TH10'),
  ('ses_11', 'BUOI_11', 'Buổi 11 (Ch.5 - Thiết kế Slide)', 5, 'TH11'),
  ('ses_12', 'BUOI_12', 'Buổi 12 (Ch.5 - Trình chiếu F5)', 5, 'TH12'),
  ('ses_13', 'BUOI_13', 'Buổi 13 (Ch.6 - An toàn số 3 Không)', 6, 'TH13'),
  ('ses_14', 'BUOI_14', 'Buổi 14 (Kiểm tra cuối môn)', 6, 'TH14');
