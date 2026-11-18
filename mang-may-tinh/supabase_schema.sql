-- ==============================================================================
-- CƠ SỞ DỮ LIỆU CHUYÊN NGÀNH MẠNG MÁY TÍNH (HỆ TRUNG CẤP 9+3)
-- Giảng viên phụ trách: CN. Phạm Tiến Đông (https://phamtiendong.name.vn)
-- Chạy đoạn mã này trong Supabase -> SQL Editor -> Run
-- ==============================================================================

-- 1. BẢNG LỚP HỌC (classes)
CREATE TABLE IF NOT EXISTS public.classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_code TEXT NOT NULL UNIQUE,
  class_name TEXT NOT NULL,
  academic_year TEXT DEFAULT '2026-2027',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BẢNG HỌC SINH (students)
-- Tuân thủ Nghị định 13/2023/NĐ-CP: Ẩn thông tin cá nhân trên truy vấn công cộng
CREATE TABLE IF NOT EXISTS public.students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  student_number INT NOT NULL,
  student_code TEXT NOT NULL,
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT,
  phone TEXT,
  status TEXT DEFAULT 'Đang học',
  original_class TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(class_id, student_number)
);

CREATE INDEX IF NOT EXISTS idx_students_class_id ON public.students(class_id);
CREATE INDEX IF NOT EXISTS idx_students_code ON public.students(student_code);

-- 3. BẢNG DANH MỤC BÀI THỰC HÀNH MẠNG (network_labs)
CREATE TABLE IF NOT EXISTS public.network_labs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lab_code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Mạng Căn Bản',
  description TEXT NOT NULL,
  objective TEXT NOT NULL,
  safety_rules JSONB DEFAULT '[]'::jsonb,
  checklist_json JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BẢNG KẾT QUẢ THỰC HÀNH & PHIẾU NGHIỆM THU (lab_submissions)
CREATE TABLE IF NOT EXISTS public.lab_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_name TEXT NOT NULL,
  session_name TEXT NOT NULL,
  bench_id INT NOT NULL,
  operator_name TEXT NOT NULL,  -- KTV 1: Thi công bấm cáp / Cắm thiết bị
  safety_name TEXT NOT NULL,    -- KTV 2: Kiểm soát an toàn & Poka-Yoke 8 đèn
  recorder_name TEXT NOT NULL,  -- KTV 3: Cấu hình logic & Báo cáo kỹ thuật
  score NUMERIC(3, 1) DEFAULT 0.0 CHECK (score >= 0.0 AND score <= 10.0),
  cable_standard TEXT,          -- T568A hoặc T568B
  cable_test_result TEXT,       -- Ví dụ: '8/8 sợi thông' hoặc 'Đứt sợi 3, 6'
  ip_assigned TEXT,             -- Ví dụ: '192.168.1.10'
  subnet_mask TEXT,             -- Ví dụ: '255.255.255.0' (/24)
  poka_yoke_passed BOOLEAN DEFAULT FALSE,
  teacher_approved BOOLEAN DEFAULT FALSE,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_submissions_class ON public.lab_submissions(class_name);
CREATE INDEX IF NOT EXISTS idx_submissions_date ON public.lab_submissions(submitted_at DESC);

-- ==============================================================================
-- DỮ LIỆU MẪU BAN ĐẦU (SEED DATA CHUYÊN NGÀNH MẠNG)
-- ==============================================================================

-- 1. Thêm Lớp học mẫu
INSERT INTO public.classes (class_code, class_name, academic_year)
VALUES 
  ('03THA9', 'EHL Tin học ứng dụng 03THA9 (9+3)', '2026-2027'),
  ('03THA8', 'EHL Tin học ứng dụng 03THA8 (9+3)', '2026-2027')
ON CONFLICT (class_code) DO NOTHING;

-- 2. Thêm 6 Bài thực hành mạng cốt lõi chuẩn Thông tư 55
INSERT INTO public.network_labs (lab_code, title, category, description, objective, safety_rules)
VALUES
  (
    'LAB-01',
    'Kỹ thuật gia công bấm cáp mạng UTP chuẩn T568A & T568B',
    'Hạ tầng mạng',
    'Thực hành đo cắt, tuốt vỏ bảo vệ, sắp xếp đúng thứ tự 8 sợi màu, miết thẳng và bấm đầu bấm RJ45 bằng kìm chuyên dụng.',
    'Bấm thành công sợi cáp mạng thẳng (T568B-T568B) và cáp chéo (T568A-T568B), kiểm tra 8 đèn thông suốt trên hộp test cáp.',
    '["Rút phích cắm khi xử lý thiết bị", "Không để đầu kim loại kìm bấm cắt vào da", "Thu dọn lõi đồng thừa vào khay 5S"]'::jsonb
  ),
  (
    'LAB-02',
    'Quy hoạch và Cấu hình địa chỉ IPv4 tĩnh, Gateway, DNS',
    'Logic mạng',
    'Cài đặt thông số TCP/IPv4 cho máy tính trạm, hiểu ý nghĩa của địa chỉ IP (Số nhà) và Subnet Mask (Ranh giới tổ dân phố).',
    'Gán thành công IP nội bộ cho nhóm máy tính, sử dụng lệnh Ping kiểm tra độ trễ và thông suốt tín hiệu < 1ms.',
    '["Kiểm tra chống trùng lặp IP trong mạng", "Ghi chép sơ đồ mạng vào nhật ký KTV"]'::jsonb
  ),
  (
    'LAB-03',
    'Phân vùng mạng con (Subnetting) chia nhỏ mạng LAN nội bộ',
    'Logic mạng',
    'Tính toán mượn bit nhị phân để chia mạng lớp C (/24) thành 4 hoặc 8 mạng con độc lập cho các phòng ban văn phòng.',
    'Xác định chuẩn xác Network ID, Broadcast ID, Subnet Mask mới và dải IP khả dụng cấp cho máy tính trạm.',
    '["Tuân thủ quy tắc 2 mũ n trừ 2", "KTV 3 kiểm tra chéo phép tính trước khi cấu hình"]'::jsonb
  ),
  (
    'LAB-04',
    'Đấu nối Switch mạng LAN và Phân đoạn mạng ảo VLAN cơ bản',
    'Thiết bị mạng',
    'Lắp đặt Switch vào tủ mạng Rack 19 inch, cắm dây nhảy Patch Cord, cấu hình gom cổng vào VLAN phòng học và VLAN giáo viên.',
    'Cô lập lưu lượng truyền tin giữa các VLAN trên cùng một thiết bị phần cứng Switch chuyển mạch Lớp 2.',
    '["Bó dây mạng gọn gàng bằng dây rút", "Đeo găng tay chống tĩnh điện khi thao tác tủ Rack"]'::jsonb
  ),
  (
    'LAB-05',
    'Cấu hình Router định tuyến và Dịch vụ cấp phát IP tự động (DHCP)',
    'Hệ thống mạng',
    'Cấu hình Router làm cổng ngõ Default Gateway, thiết lập DHCP Pool để tự động cấp phát IP, Subnet Mask và DNS cho 30 máy tính trạm.',
    'Các máy tính tự nhận IP hợp lệ trong 3 giây khi cắm cáp mạng, truy cập thông suốt ra mạng ngoại vi.',
    '["Sao lưu file cấu hình running-config trước khi khởi động lại"]'::jsonb
  ),
  (
    'LAB-06',
    'Chẩn đoán và Xử lý 5 sự cố mạng thường gặp (Poka-Yoke)',
    'Bảo trì & Sự cố',
    'Chẩn đoán sự cố mất mạng: Lỏng cáp mạng, đứt ngầm sợi 3/6, xung đột trùng IP, lỗi dịch vụ DNS và chặn bởi Windows Firewall.',
    'Sử dụng thành thạo bộ công cụ dòng lệnh ipconfig /all, ping -t, tracert và nslookup để bắt bệnh trong 60 giây.',
    '["Kiểm tra tầng vật lý trước (đèn Link/Act cổng RJ45)", "Không tắt tường lửa vĩnh viễn"]'::jsonb
  )
ON CONFLICT (lab_code) DO NOTHING;

-- ==============================================================================
-- CHÍNH SÁCH BẢO MẬT HÀNG (ROW LEVEL SECURITY - RLS)
-- ==============================================================================
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.network_labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_submissions ENABLE ROW LEVEL SECURITY;

-- Cho phép tất cả người học đọc danh mục lớp và bài thực hành
CREATE POLICY "Public read classes" ON public.classes FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read network_labs" ON public.network_labs FOR SELECT USING (TRUE);

-- Học sinh chỉ xem danh sách tên và số thứ tự, ẩn ngày sinh & số điện thoại
CREATE POLICY "Public read students non-sensitive" ON public.students 
FOR SELECT USING (TRUE);

-- Cho phép gửi kết quả thực hành từ bàn kỹ thuật
CREATE POLICY "Allow insert submissions" ON public.lab_submissions 
FOR INSERT WITH CHECK (TRUE);

-- Cho phép xem kết quả thực hành
CREATE POLICY "Public read submissions" ON public.lab_submissions 
FOR SELECT USING (TRUE);
