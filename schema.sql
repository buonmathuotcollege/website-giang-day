-- ============================================================================
-- CƠ SỞ DỮ LIỆU CLOUDFLARE D1 CHO HỆ THỐNG GIẢNG DẠY CNTT
-- Trường Cao đẳng Buôn Ma Thuột
-- ============================================================================

-- 1. BẢNG MÔN HỌC (Courses)
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon TEXT DEFAULT '💻',
  subdomain TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. BẢNG CHƯƠNG BÀI HỌC (Chapters)
CREATE TABLE IF NOT EXISTS chapters (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL,
  chapter_num INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 1,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- 3. BẢNG BÀI GIẢNG CHI TIẾT (Lessons)
CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  chapter_id TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  content_markdown TEXT DEFAULT '',
  lesson_type TEXT DEFAULT 'theory',
  sort_order INTEGER DEFAULT 1,
  is_published INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chapter_id) REFERENCES chapters(id)
);

-- 4. BẢNG LỚP HỌC (Classes) - Hỗ trợ Lớp chính khóa & Lớp ghép liên lớp
CREATE TABLE IF NOT EXISTS classes (
  id TEXT PRIMARY KEY,
  course_id TEXT,
  class_code TEXT UNIQUE NOT NULL,
  class_name TEXT NOT NULL,
  academic_year TEXT DEFAULT '2026-2027',
  is_composite INTEGER DEFAULT 0,          -- 0: Lớp chính khóa, 1: Lớp ghép / Ca thi liên lớp
  source_classes TEXT DEFAULT '',          -- Danh sách mã lớp nguồn khi ghép: ["THUD_K26A", "QTM_K26"]
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- 5. BẢNG HỌC SINH / SINH VIÊN (Students) - Chuẩn Đại học & Cao đẳng
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  class_id TEXT NOT NULL,
  student_number INTEGER NOT NULL,          -- Số thứ tự trong sổ điểm (1, 2, 3...)
  student_code TEXT NOT NULL DEFAULT '',   -- Mã số học sinh / sinh viên (MSHS, e.g. 24TH0101, BMT26-001)
  full_name TEXT NOT NULL,                  -- Họ và tên đầy đủ
  date_of_birth TEXT DEFAULT '',            -- Ngày tháng năm sinh (DD/MM/YYYY)
  gender TEXT DEFAULT 'Nam',                -- Giới tính (Nam / Nữ)
  phone TEXT DEFAULT '',                    -- Số điện thoại học sinh / phụ huynh
  status TEXT DEFAULT 'Đang học',           -- Trạng thái: Đang học / Bảo lưu / Nghỉ học
  original_class TEXT DEFAULT '',           -- Lớp gốc / Lớp sinh hoạt (dành cho Lớp ghép liên lớp)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_students_class ON students(class_id);
CREATE INDEX IF NOT EXISTS idx_students_code ON students(student_code);

-- 6. BẢNG BUỔI HỌC & PIN (Sessions)
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  class_id TEXT,
  session_code TEXT NOT NULL,
  session_title TEXT NOT NULL,
  class_pin TEXT DEFAULT '',
  is_open INTEGER DEFAULT 1,
  session_date TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. BẢNG KẾT QUẢ THỰC HÀNH / NỘP ĐIỂM (Submissions)
CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  session_id TEXT,
  class_name TEXT NOT NULL,
  session_name TEXT NOT NULL,
  student_name TEXT NOT NULL,
  student_code TEXT DEFAULT '',
  original_class TEXT DEFAULT '',           -- Lớp gốc của học sinh nếu làm bài trong Lớp ghép / Ca thi ghép
  station TEXT DEFAULT '',
  date_only TEXT NOT NULL,
  score REAL DEFAULT 0.0,
  details_json TEXT DEFAULT '{}',
  status TEXT DEFAULT 'Đạt',
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 8. BẢNG ĐỢT ĐÁNH GIÁ NĂNG LỰC (Assessments)
CREATE TABLE IF NOT EXISTS assessments (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT DEFAULT '',
  duration_minutes INTEGER DEFAULT 45,
  total_questions INTEGER DEFAULT 30,
  pass_score REAL DEFAULT 5.0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 9. BẢNG CÂU HỎI TRẮC NGHIỆM ĐÁNH GIÁ (Assessment Questions)
CREATE TABLE IF NOT EXISTS assessment_questions (
  id TEXT PRIMARY KEY,
  assessment_id TEXT NOT NULL,
  question_text TEXT NOT NULL,
  options_json TEXT NOT NULL,
  correct_option INTEGER NOT NULL,
  explanation TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 1,
  FOREIGN KEY (assessment_id) REFERENCES assessments(id)
);

-- 10. BẢNG KẾT QUẢ ĐÁNH GIÁ NĂNG LỰC (Assessment Results)
CREATE TABLE IF NOT EXISTS assessment_results (
  id TEXT PRIMARY KEY,
  assessment_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  class_name TEXT NOT NULL,
  station TEXT DEFAULT '',
  score REAL NOT NULL,
  total INTEGER NOT NULL,
  percentage REAL NOT NULL,
  status TEXT NOT NULL,
  answers_json TEXT DEFAULT '{}',
  completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assessment_id) REFERENCES assessments(id)
);

-- 11. BẢNG NHẬT KÝ GIẢNG VIÊN (Audit Logs)
CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  actor TEXT DEFAULT 'Giảng viên',
  details TEXT DEFAULT '',
  ip TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- DỮ LIỆU MẪU BAN ĐẦU (SEED DATA)
-- ============================================================================

INSERT OR IGNORE INTO courses (id, slug, name, description, icon, subdomain, sort_order) VALUES
  ('crs_nls', 'nang-luc-so', 'Năng lực số', 'Trang bị kỹ năng số, an toàn thông tin và ứng dụng CNTT thời đại mới', '💻', 'nanglucso', 1),
  ('crs_ktmt', 'kien-truc-may-tinh', 'Kiến trúc máy tính và Hệ điều hành', 'Cấu tạo hệ thống máy tính, vi xử lý, quản lý bộ nhớ và hệ điều hành', '🖥️', 'kientruc', 2),
  ('crs_pcmt', 'phan-cung-may-tinh', 'Phần cứng máy tính', 'Linh kiện phần cứng, chẩn đoán, lắp ráp, bảo trì và sửa chữa PC/Laptop', '🔧', 'phancung', 3),
  ('crs_mcb', 'mang-can-ban', 'Mạng căn bản', 'Nền tảng mạng máy tính, mô hình OSI, TCP/IP, định tuyến và phân chia mạng con', '🌐', 'mang', 4),
  ('crs_lanwan', 'thiet-ke-quan-tri-lan-wan', 'Thiết kế và Quản trị mạng LAN/WAN', 'Thiết kế hệ thống mạng doanh nghiệp, Switch VLAN, Routing, NAT, VPN', '🏗️', 'lanwan', 5),
  ('crs_srvlin', 'quan-tri-windows-linux', 'Quản trị Windows Server/Linux và Ảo hóa', 'Dịch vụ mạng AD DS, DNS, DHCP trên Windows Server, cấu hình Linux và máy ảo', '🖧', 'winlinux', 6);

INSERT OR IGNORE INTO classes (id, class_code, class_name, academic_year) VALUES
  ('cls_thud_k26a', 'THUD_K26A', 'Tin học ứng dụng K26A', '2026-2027'),
  ('cls_thud_k26b', 'THUD_K26B', 'Tin học ứng dụng K26B', '2026-2027'),
  ('cls_qtm_k26',   'QTM_K26',   'Quản trị mạng K26',     '2026-2027');

INSERT OR IGNORE INTO assessments (id, slug, title, subject, description, duration_minutes, total_questions, pass_score) VALUES
  ('asm_pc', 'phan-cung', 'Đánh giá năng lực: Phần cứng máy tính', 'Phần cứng máy tính', 'Kiểm tra năng lực nhận biết linh kiện, chẩn đoán sự cố phần cứng PC/Laptop', 45, 30, 5.0),
  ('asm_net', 'mang', 'Đánh giá năng lực: Mạng máy tính', 'Mạng căn bản & LAN/WAN', 'Kiểm tra kiến thức mô hình mạng, địa chỉ IP, chia mạng con và thiết bị mạng', 45, 30, 5.0);
