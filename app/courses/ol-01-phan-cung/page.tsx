'use client';

import React, { useState, useEffect } from 'react';

// ============================================================================
// CHUYÊN ĐỀ 01: ĐÁNH GIÁ NĂNG LỰC PHẦN CỨNG MÁY TÍNH (MÃ: OL-01_PHAN_CUNG)
// Theo chuẩn Phụ lục II, Thông tư 55/2026/TT-BGDĐT
// Biên soạn: CN. Phạm Tiến Đông
// ============================================================================

export default function SpecializedHardwarePage() {
  const [activeTab, setActiveTab] = useState<'tab-1' | 'tab-2' | 'tab-3' | 'tab-4'>('tab-1');
  const [quizViewMode, setQuizViewMode] = useState<'mcq' | 'oral'>('mcq');
  const [selectedBoard, setSelectedBoard] = useState<'msi' | 'asus' | 'winnfox'>('msi');
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Safety checkboxes for Tab 1
  const [safetyChecked, setSafetyChecked] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
  });

  // Tab 2: MCQ State
  const [mcqFilter, setMcqFilter] = useState<string>('all');
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [openOralCard, setOpenOralCard] = useState<string | null>(null);

  // Tab 3: Candidate & Rubric State
  const [candidateClass, setCandidateClass] = useState('04THA3');
  const [candidateStation, setCandidateStation] = useState('Máy 01');
  const [candidateName, setCandidateName] = useState('');
  const [rubricScores, setRubricScores] = useState({
    safety: 2.0,
    diagnosis: 2.5,
    operation: 3.0,
    verification: 1.5,
    handover: 1.0,
  });
  const [rubricSafetyDisqualified, setRubricSafetyDisqualified] = useState(false);

  // Exam Ticket State
  const examTickets = [
    {
      id: 'ticket_01',
      code: 'ĐỀ SÁT HẠCH 01',
      title: 'Ca bệnh Màn hình đen (RAM tiếp xúc kém) & Nâng cấp RAM 8GB DDR4 + Cứu tài liệu Kế toán',
      problem: 'Bật máy quạt quay vù vù nhưng màn hình đen thui No Signal. Cứu gấp thư mục Desktop\\BAO_CAO_TAI_CHINH_2026 sang ổ D.',
      hardware: 'Vệ sinh chân RAM bằng gôm tẩy học sinh; cắm thêm thanh RAM 8GB DDR4 vào khe 2 nghe 2 tiếng TÁCH.',
      software: 'Cài UniKey, kiểm tra Device Manager sạch chấm than vàng, đo nhiệt độ HWMonitor CPU < 75°C.',
    },
    {
      id: 'ticket_02',
      code: 'ĐỀ SÁT HẠCH 02',
      title: 'Ca bệnh "No Bootable Device" (Lỏng cáp SATA) & Quạt CPU quá nhiệt 92°C tự tắt nguồn',
      problem: 'Báo lỗi chữ trắng No Bootable Device; máy chạy 10 phút tự sập nguồn. Cứu thư mục Documents\\HO_SO_DU_AN.',
      hardware: 'Cắm chặt cáp SATA ổ SSD; tháo tản nhiệt CPU lau sạch keo cũ, tra keo hạt đậu xanh mới, cắm CPU_FAN.',
      software: 'Vào BIOS chỉnh Boot Option #1 Windows Boot Manager; kiểm tra sức khỏe CrystalDiskInfo Good.',
    },
    {
      id: 'ticket_03',
      code: 'ĐỀ SÁT HẠCH 03',
      title: 'Nâng cấp Ổ cứng SSD SATA 240GB mới & Xử lý kẹt lệnh in Print Spooler máy in văn phòng',
      problem: 'Lắp ổ SSD SATA mới nhưng vào My Computer không thấy; máy in Canon LBP 2900 bị đơ lệnh in.',
      hardware: 'Lắp SSD vào khay 2.5 inch, cắm đủ cáp SATA dữ liệu và nguồn chữ L.',
      software: 'Vào Disk Management khởi tạo GPT và New Simple Volume; Restart service Print Spooler và in Test Page.',
    }
  ];

  const [currentTicket, setCurrentTicket] = useState(examTickets[0]);

  // Timer
  const [timerSeconds, setTimerSeconds] = useState(14400); // 4 hours
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const drawRandomTicket = () => {
    const rand = Math.floor(Math.random() * examTickets.length);
    setCurrentTicket(examTickets[rand]);
  };

  const totalRubricScore = rubricSafetyDisqualified
    ? 0
    : Number((rubricScores.safety + rubricScores.diagnosis + rubricScores.operation + rubricScores.verification + rubricScores.handover).toFixed(1));

  const isPassed = totalRubricScore >= 5.0 && !rubricSafetyDisqualified;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Navigation */}
        <header className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 text-white">
                  CHUYÊN ĐỀ 01
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  MÃ: OL-01_PHAN_CUNG
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Chuẩn Thông tư 55/2026/TT-BGDĐT
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Đánh Giá Năng Lực Phần Cứng Máy Tính
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">
                Mô hình quy trình nghiệp vụ thực tế (Helpdesk Workflow 5 Bước). Cấu hình phòng lab: 
                <strong> Mainboard Intel H510 · Core i5-10400 · 8GB DDR4 · SSD SATA · VGA GT 730 · Windows 10 Pro</strong>.
              </p>
              <div className="text-xs text-slate-500 pt-1">
                Giảng viên hướng dẫn: <strong className="text-slate-800">CN. Phạm Tiến Đông</strong> · Cổng Học Tập & Giảng Dạy CNTT
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <div>
                <div className="text-xs text-slate-500">Tiến độ quy trình an toàn</div>
                <div className="text-xl font-black text-slate-900">
                  {Object.values(safetyChecked).filter(Boolean).length} / 5 Bước
                </div>
              </div>
            </div>
          </div>

          {/* Shadcn Tabs Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                onClick={() => setActiveTab('tab-1')}
                className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold min-h-[48px] transition-all ${
                  activeTab === 'tab-1' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🛠️ TAB 1: Bàn Kỹ Thuật 5 Bước & H510
              </button>
              <button
                onClick={() => setActiveTab('tab-2')}
                className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold min-h-[48px] transition-all ${
                  activeTab === 'tab-2' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📚 TAB 2: Trắc Nghiệm & Vấn Đáp
              </button>
              <button
                onClick={() => setActiveTab('tab-3')}
                className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold min-h-[48px] transition-all ${
                  activeTab === 'tab-3' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎲 TAB 3: Bốc Thăm & Rubric Sát Hạch
              </button>
              <button
                onClick={() => setActiveTab('tab-4')}
                className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold min-h-[48px] transition-all ${
                  activeTab === 'tab-4' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🖨️ TAB 4: In Phiếu Nghiệm Thu A4
              </button>
            </div>
          </div>
        </header>

        {/* TAB 1: BÀN KỸ THUẬT & H510 */}
        {activeTab === 'tab-1' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cột trái (50%): Accordion 5 bước nghiệp vụ */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                📋 Sổ Tay Nghiệp Vụ 5 Bước (Chuẩn TT55)
              </h2>

              <div className="space-y-3">
                {/* Bước 1 */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-sm bg-slate-50 hover:bg-slate-100 min-h-[48px]"
                  >
                    <span>Bước 1: Tiếp Nhận & An Toàn Tĩnh Điện (ESD)</span>
                    <span>{openAccordion === 1 ? '▲' : '▼'}</span>
                  </button>
                  {openAccordion === 1 && (
                    <div className="p-4 space-y-3 text-xs text-slate-600 bg-white border-t border-slate-200">
                      <p><strong>• Luật Rút - Bấm - Khay:</strong> (1) Rút phích AC, gạt I/O sang O; (2) Bấm nút Power 3 lần xả tụ; (3) Toàn bộ ốc bỏ vào khay.</p>
                      <p><strong>• Xả tĩnh điện:</strong> Chạm tay vào vỏ kim loại case trước khi chạm vào bo mạch H510.</p>
                      <p><strong>• Khám ngoại quan:</strong> Soi đèn kiểm tra tụ phồng, đứt mạch, gãy chân pin.</p>
                      <label className="flex items-center gap-2 font-bold text-slate-900 pt-2 border-t">
                        <input
                          type="checkbox"
                          checked={safetyChecked.step1}
                          onChange={(e) => setSafetyChecked({ ...safetyChecked, step1: e.target.checked })}
                          className="w-4 h-4 rounded text-emerald-600"
                        />
                        <span>Đã hoàn thành an toàn Bước 1</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Bước 2 */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-sm bg-slate-50 hover:bg-slate-100 min-h-[48px]"
                  >
                    <span>Bước 2: Chẩn Đoán & Cứu Dữ Liệu (Backup WinPE)</span>
                    <span>{openAccordion === 2 ? '▲' : '▼'}</span>
                  </button>
                  {openAccordion === 2 && (
                    <div className="p-4 space-y-3 text-xs text-slate-600 bg-white border-t border-slate-200">
                      <p><strong>• Beep Code & EZ Debug LED:</strong> 1 bíp dài 2 bíp ngắn (RAM/VGA); 4 đèn EZ Debug góc phải mainboard MSI H510.</p>
                      <p><strong>• Cắm USB WinPE:</strong> Boot F8 (ASUS) hoặc F11 (MSI/Winnfox) → Copy Desktop, Documents, Zalo PC sang Ổ D.</p>
                      <p><strong>• Đối chiếu Properties:</strong> Khớp 100% số file và MB trước khi format.</p>
                      <label className="flex items-center gap-2 font-bold text-slate-900 pt-2 border-t">
                        <input
                          type="checkbox"
                          checked={safetyChecked.step2}
                          onChange={(e) => setSafetyChecked({ ...safetyChecked, step2: e.target.checked })}
                          className="w-4 h-4 rounded text-emerald-600"
                        />
                        <span>Đã hoàn thành an toàn Bước 2</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Bước 3 */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-sm bg-slate-50 hover:bg-slate-100 min-h-[48px]"
                  >
                    <span>Bước 3: Thao Tác Tháo Lắp & Nâng Cấp (Poka-Yoke)</span>
                    <span>{openAccordion === 3 ? '▲' : '▼'}</span>
                  </button>
                  {openAccordion === 3 && (
                    <div className="p-4 space-y-3 text-xs text-slate-600 bg-white border-t border-slate-200">
                      <p><strong>• RAM DDR4:</strong> Mở 2 lẫy, so rãnh khuyết lệch, ấn đều 2 đầu nghe 2 tiếng TÁCH sập khóa.</p>
                      <p><strong>• Card VGA GT 730:</strong> Gạt mở lẫy PCIe x16 trước khi rút, siết chặt ốc nẹp kim loại.</p>
                      <p><strong>• Tra keo tản nhiệt:</strong> Đúng 1 giọt hạt đậu xanh vào giữa CPU, ấn chốt đối xứng, cắm CPU_FAN.</p>
                      <p><strong>• Nguồn & F_PANEL:</strong> 24-pin ATX, 8-pin CPU, dây SATA chữ L, POWER SW cắm sát chân khuyết hàng trên.</p>
                      <label className="flex items-center gap-2 font-bold text-slate-900 pt-2 border-t">
                        <input
                          type="checkbox"
                          checked={safetyChecked.step3}
                          onChange={(e) => setSafetyChecked({ ...safetyChecked, step3: e.target.checked })}
                          className="w-4 h-4 rounded text-emerald-600"
                        />
                        <span>Đã hoàn thành an toàn Bước 3</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Bước 4 */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 4 ? null : 4)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-sm bg-slate-50 hover:bg-slate-100 min-h-[48px]"
                  >
                    <span>Bước 4: Cài Đặt Windows 10, Driver & Phần Mềm</span>
                    <span>{openAccordion === 4 ? '▲' : '▼'}</span>
                  </button>
                  {openAccordion === 4 && (
                    <div className="p-4 space-y-3 text-xs text-slate-600 bg-white border-t border-slate-200">
                      <p><strong>• Boot USB:</strong> ASUS F8, MSI F11. Chọn boot chuẩn UEFI USB.</p>
                      <p><strong>• Phân vùng chuẩn GPT:</strong> Nhìn đúng số GB ổ C cũ để format; TUYỆT ĐỐI KHÔNG xóa nhầm ổ D dữ liệu.</p>
                      <p><strong>• Driver & Phần mềm:</strong> Device Manager sạch chấm than vàng, cài UniKey, 7-Zip, Office.</p>
                      <label className="flex items-center gap-2 font-bold text-slate-900 pt-2 border-t">
                        <input
                          type="checkbox"
                          checked={safetyChecked.step4}
                          onChange={(e) => setSafetyChecked({ ...safetyChecked, step4: e.target.checked })}
                          className="w-4 h-4 rounded text-emerald-600"
                        />
                        <span>Đã hoàn thành an toàn Bước 4</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Bước 5 */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 5 ? null : 5)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-sm bg-slate-50 hover:bg-slate-100 min-h-[48px]"
                  >
                    <span>Bước 5: Kiểm Tra Nhiệt Độ, Máy In & Bàn Giao</span>
                    <span>{openAccordion === 5 ? '▲' : '▼'}</span>
                  </button>
                  {openAccordion === 5 && (
                    <div className="p-4 space-y-3 text-xs text-slate-600 bg-white border-t border-slate-200">
                      <p><strong>• Khôi phục dữ liệu:</strong> Chép trả dữ liệu từ D:\\BACKUP về Desktop/Documents, mở thử 2 tệp.</p>
                      <p><strong>• Kiểm tra nhiệt độ:</strong> HWMonitor nhiệt độ CPU &lt; 75°C khi tải.</p>
                      <p><strong>• Test máy in & 5S:</strong> In bản Test Page thành công, dọn sạch bàn máy, lập biên bản A4.</p>
                      <label className="flex items-center gap-2 font-bold text-slate-900 pt-2 border-t">
                        <input
                          type="checkbox"
                          checked={safetyChecked.step5}
                          onChange={(e) => setSafetyChecked({ ...safetyChecked, step5: e.target.checked })}
                          className="w-4 h-4 rounded text-emerald-600"
                        />
                        <span>Đã hoàn thành an toàn Bước 5</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Cột phải (50%): Sơ đồ H510 tương tác */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">🔍 Sơ Đồ Bo Mạch Chủ Intel H510</h2>
                <div className="inline-flex rounded-xl p-1 bg-slate-100 border text-xs font-bold">
                  <button
                    onClick={() => setSelectedBoard('msi')}
                    className={`px-2.5 py-1 rounded-lg ${selectedBoard === 'msi' ? 'bg-white shadow' : 'text-slate-600'}`}
                  >
                    MSI
                  </button>
                  <button
                    onClick={() => setSelectedBoard('asus')}
                    className={`px-2.5 py-1 rounded-lg ${selectedBoard === 'asus' ? 'bg-white shadow' : 'text-slate-600'}`}
                  >
                    ASUS
                  </button>
                  <button
                    onClick={() => setSelectedBoard('winnfox')}
                    className={`px-2.5 py-1 rounded-lg ${selectedBoard === 'winnfox' ? 'bg-white shadow' : 'text-slate-600'}`}
                  >
                    WINNFOX
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-950">
                <img
                  src="/images/ol-01/main-h510.jpg"
                  alt="Bo mạch chủ Intel H510"
                  className="w-full h-full object-cover"
                />

                {/* Pulsing Hotspots */}
                <div
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2"
                  style={{ top: '33%', left: '40%' }}
                  onClick={() => setActiveHotspot('socket')}
                >
                  <span className="absolute h-8 w-8 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
                  <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold border-2 border-white shadow">
                    1
                  </span>
                </div>

                <div
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2"
                  style={{ top: '33%', left: '70%' }}
                  onClick={() => setActiveHotspot('ram')}
                >
                  <span className="absolute h-8 w-8 rounded-full bg-emerald-500 opacity-75 animate-ping"></span>
                  <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold border-2 border-white shadow">
                    2
                  </span>
                </div>

                <div
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2"
                  style={{ top: '60%', left: '38%' }}
                  onClick={() => setActiveHotspot('pcie')}
                >
                  <span className="absolute h-8 w-8 rounded-full bg-amber-500 opacity-75 animate-ping"></span>
                  <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-amber-600 text-white text-xs font-bold border-2 border-white shadow">
                    3
                  </span>
                </div>

                <div
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2"
                  style={{ top: '78%', left: '72%' }}
                  onClick={() => setActiveHotspot('sata')}
                >
                  <span className="absolute h-8 w-8 rounded-full bg-indigo-500 opacity-75 animate-ping"></span>
                  <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold border-2 border-white shadow">
                    4
                  </span>
                </div>

                <div
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2"
                  style={{ top: '40%', left: '87%' }}
                  onClick={() => setActiveHotspot('atx')}
                >
                  <span className="absolute h-8 w-8 rounded-full bg-rose-500 opacity-75 animate-ping"></span>
                  <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-rose-600 text-white text-xs font-bold border-2 border-white shadow">
                    5
                  </span>
                </div>

                {/* Popover on active hotspot */}
                {activeHotspot && (
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur border border-slate-200 rounded-xl p-3 text-xs shadow-lg">
                    <div className="flex justify-between items-start">
                      <div className="font-bold text-slate-900">
                        {activeHotspot === 'socket' && '1. Socket LGA1200 (CPU Intel Core Gen 10/11)'}
                        {activeHotspot === 'ram' && '2. Khe RAM DDR4 Dual-Channel (Rãnh Khuyết Lệch)'}
                        {activeHotspot === 'pcie' && '3. Khe PCIe 3.0 x16 (Card Rời NVIDIA GT 730 2GB)'}
                        {activeHotspot === 'sata' && '4. Cụm Cổng SATA III 6Gb/s & Khe M.2 (SSD 256GB)'}
                        {activeHotspot === 'atx' && '5. Cổng Nguồn 24-Pin ATX & 8-Pin CPU (12V)'}
                      </div>
                      <button onClick={() => setActiveHotspot(null)} className="text-slate-400 font-bold">✕</button>
                    </div>
                    <div className="text-slate-600 mt-1">
                      {activeHotspot === 'socket' && 'Không chạm tay vào chân kim socket; đặt CPU khớp góc tam giác vàng.'}
                      {activeHotspot === 'ram' && 'Zero-force: Thấy cộm tay dừng ngay; ấn đều 2 đầu nghe 2 tiếng TÁCH.'}
                      {activeHotspot === 'pcie' && 'Gạt mở lẫy khóa đuôi khe trước khi cắm; siết chặt ốc nẹp sắt.'}
                      {activeHotspot === 'sata' && 'Đầu cáp dữ liệu và nguồn SATA đều có ngàm chữ L chống cắm ngược.'}
                      {activeHotspot === 'atx' && 'Cả 2 đầu nối đều có lẫy nhựa an toàn; ấn kịch nấc chống đánh tia lửa điện.'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TRẮC NGHIỆM & VẤN ĐÁP */}
        {activeTab === 'tab-2' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b">
              <h2 className="text-lg font-bold text-slate-900">
                📚 Ngân Hàng Ôn Luyện Thực Chiến
              </h2>
              <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setQuizViewMode('mcq')}
                  className={`px-4 py-2 rounded-lg ${quizViewMode === 'mcq' ? 'bg-white shadow' : 'text-slate-600'}`}
                >
                  Trắc Nghiệm Tình Huống
                </button>
                <button
                  onClick={() => setQuizViewMode('oral')}
                  className={`px-4 py-2 rounded-lg ${quizViewMode === 'oral' ? 'bg-white shadow' : 'text-slate-600'}`}
                >
                  20 Câu Vấn Đáp Tại Bàn
                </button>
              </div>
            </div>

            {quizViewMode === 'mcq' ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border rounded-2xl text-xs flex flex-wrap gap-2">
                  <button onClick={() => setMcqFilter('all')} className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold">Tất Cả</button>
                  <button onClick={() => setMcqFilter('power_ram')} className="px-3 py-1.5 rounded-lg bg-white border font-bold">Nguồn & RAM</button>
                  <button onClick={() => setMcqFilter('bios_uefi')} className="px-3 py-1.5 rounded-lg bg-white border font-bold">BIOS / UEFI</button>
                  <button onClick={() => setMcqFilter('disk_os')} className="px-3 py-1.5 rounded-lg bg-white border font-bold">Phân Vùng Ổ Cứng</button>
                  <button onClick={() => setMcqFilter('safety_esd')} className="px-3 py-1.5 rounded-lg bg-white border font-bold">An Toàn ESD</button>
                </div>
                <div className="p-6 border rounded-2xl space-y-3">
                  <div className="text-xs font-mono text-slate-400">CÂU TÌNH HUỐNG THỰC TẾ</div>
                  <h3 className="font-bold text-sm text-slate-900">
                    Khi bật nguồn máy tính, quạt CPU và quạt nguồn quay vù vù nhưng màn hình đen No Signal, thao tác kỹ thuật đầu tiên cần làm là gì?
                  </h3>
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    <button className="p-3 border rounded-xl text-left text-xs bg-slate-50 hover:bg-slate-100">
                      A. Tháo tung bộ nguồn PSU ra sửa mạch
                    </button>
                    <button className="p-3 border rounded-xl text-left text-xs bg-emerald-50 border-emerald-300 font-bold text-emerald-950">
                      B. Rút điện xả tụ, tháo thanh RAM lấy cục gôm tẩy học sinh chà sạch chân mạ vàng rồi cắm lại nghe 2 tiếng TÁCH (Đúng)
                    </button>
                    <button className="p-3 border rounded-xl text-left text-xs bg-slate-50 hover:bg-slate-100">
                      C. Dùng tua-vít cạy nắp bảo vệ lưng CPU
                    </button>
                    <button className="p-3 border rounded-xl text-left text-xs bg-slate-50 hover:bg-slate-100">
                      D. Format toàn bộ ổ cứng máy tính
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                    <strong>✓ Giải thích chuẩn:</strong> Chân RAM tiếp xúc kém do oxy hóa chiếm hơn 70% nguyên nhân quạt quay màn đen. Dùng gôm tẩy chà sạch là biện pháp phục hồi an toàn nhất.
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 border rounded-2xl">
                  <div className="font-bold text-sm text-slate-900">
                    1. Tại sao khi dùng máy xịt bụi quạt CPU, em bắt buộc phải dùng ngón tay giữ đứng cánh quạt?
                  </div>
                  <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                    <strong>Gợi ý trả lời:</strong> Tránh quạt quay vượt tốc độ vỡ bạc đạn và đặc biệt mô tơ quạt sẽ phát sinh dòng điện cảm ứng ngược gây cháy IC điều khiển bo mạch chủ.
                  </div>
                </div>
                <div className="p-4 border rounded-2xl">
                  <div className="font-bold text-sm text-slate-900">
                    2. Khi ở màn hình chọn phân vùng cài Windows, tại sao không được tin vào ký tự C/D mà bắt buộc nhìn số GB?
                  </div>
                  <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                    <strong>Gợi ý trả lời:</strong> Trong môi trường bộ cài Windows Setup, ký tự C, D bị đảo lộn theo thứ tự vật lý. Chỉ có số GB dung lượng là cố định và không thay đổi.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: BỐC THĂM & RUBRIC SÁT HẠCH */}
        {activeTab === 'tab-3' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-900">🎲 Bốc Thăm Tình Huống Sát Hạch</h3>
              <button
                onClick={drawRandomTicket}
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 text-white font-bold text-sm min-h-[48px]"
              >
                🎲 Bốc Thăm Tình Huống Mới (15 - 180 Phút)
              </button>

              <div className="p-4 rounded-2xl bg-slate-50 border space-y-2 text-xs">
                <div className="font-mono font-bold text-blue-700">{currentTicket.code}</div>
                <div className="font-bold text-sm text-slate-900">{currentTicket.title}</div>
                <p><strong>Ca bệnh:</strong> {currentTicket.problem}</p>
                <p><strong>Phần cứng:</strong> {currentTicket.hardware}</p>
                <p><strong>Phần mềm:</strong> {currentTicket.software}</p>
              </div>

              <div className="space-y-3 pt-3 border-t">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Chọn Lớp:</label>
                  <select
                    value={candidateClass}
                    onChange={(e) => setCandidateClass(e.target.value)}
                    className="w-full p-2.5 border rounded-xl text-xs font-bold min-h-[48px]"
                  >
                    <option value="04THA3">Lớp 04THA3 (Cơ sở Ea H'leo)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Số Máy:</label>
                  <input
                    type="text"
                    value={candidateStation}
                    onChange={(e) => setCandidateStation(e.target.value)}
                    className="w-full p-2.5 border rounded-xl text-xs font-bold min-h-[48px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Họ Tên Thí Sinh:</label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="Nhập họ và tên..."
                    className="w-full p-2.5 border rounded-xl text-xs font-bold min-h-[48px]"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <h3 className="font-bold text-base text-slate-900">📝 Bảng Chấm Rubric (Thông tư 55)</h3>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xl font-black">{totalRubricScore.toFixed(1)} / 10.0</span>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg text-white ${isPassed ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                    {isPassed ? 'ĐẠT' : 'CHƯA ĐẠT'}
                  </span>
                </div>
              </div>

              {/* Red Disqualification Warning */}
              <div className="p-4 rounded-xl border border-rose-300 bg-rose-50 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rubricSafetyDisqualified}
                    onChange={(e) => setRubricSafetyDisqualified(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-600 mt-0.5"
                  />
                  <div>
                    <strong className="text-rose-950 uppercase">🚨 VI PHẠM QUY TẮC AN TOÀN ĐIỆN / DỮ LIỆU NGHIÊM TRỌNG</strong>
                    <p className="text-rose-800">Thò tay tháo lắp khi chưa rút điện hoặc làm mất dữ liệu khách (Đình chỉ thi ngay lập tức).</p>
                  </div>
                </label>
              </div>

              {/* Rubric Criteria */}
              <div className="space-y-3 text-xs">
                <div className="p-3 border rounded-xl bg-slate-50 flex justify-between items-center">
                  <span>1. Quy trình và an toàn kỹ thuật (Max 2.0 đ)</span>
                  <input
                    type="number"
                    min="0"
                    max="2.0"
                    step="0.5"
                    value={rubricScores.safety}
                    disabled={rubricSafetyDisqualified}
                    onChange={(e) => setRubricScores({ ...rubricScores, safety: parseFloat(e.target.value) || 0 })}
                    className="w-20 p-1.5 border rounded text-center font-bold"
                  />
                </div>
                <div className="p-3 border rounded-xl bg-slate-50 flex justify-between items-center">
                  <span>2. Chẩn đoán nguyên nhân sự cố (Max 2.5 đ)</span>
                  <input
                    type="number"
                    min="0"
                    max="2.5"
                    step="0.5"
                    value={rubricScores.diagnosis}
                    onChange={(e) => setRubricScores({ ...rubricScores, diagnosis: parseFloat(e.target.value) || 0 })}
                    className="w-20 p-1.5 border rounded text-center font-bold"
                  />
                </div>
                <div className="p-3 border rounded-xl bg-slate-50 flex justify-between items-center">
                  <span>3. Thao tác xử lý phần cứng & phần mềm (Max 3.0 đ)</span>
                  <input
                    type="number"
                    min="0"
                    max="3.0"
                    step="0.5"
                    value={rubricScores.operation}
                    onChange={(e) => setRubricScores({ ...rubricScores, operation: parseFloat(e.target.value) || 0 })}
                    className="w-20 p-1.5 border rounded text-center font-bold"
                  />
                </div>
                <div className="p-3 border rounded-xl bg-slate-50 flex justify-between items-center">
                  <span>4. Kiểm tra và xác nhận vận hành (Max 1.5 đ)</span>
                  <input
                    type="number"
                    min="0"
                    max="1.5"
                    step="0.5"
                    value={rubricScores.verification}
                    onChange={(e) => setRubricScores({ ...rubricScores, verification: parseFloat(e.target.value) || 0 })}
                    className="w-20 p-1.5 border rounded text-center font-bold"
                  />
                </div>
                <div className="p-3 border rounded-xl bg-slate-50 flex justify-between items-center">
                  <span>5. Bàn giao và hồ sơ kỹ thuật (Max 1.0 đ)</span>
                  <input
                    type="number"
                    min="0"
                    max="1.0"
                    step="0.5"
                    value={rubricScores.handover}
                    onChange={(e) => setRubricScores({ ...rubricScores, handover: parseFloat(e.target.value) || 0 })}
                    className="w-20 p-1.5 border rounded text-center font-bold"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end">
                <button
                  onClick={() => setActiveTab('tab-4')}
                  className="px-5 py-3 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 min-h-[48px]"
                >
                  Chuyển Sang In Phiếu Nghiệm Thu A4 ➔
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: IN PHIẾU NGHIỆM THU A4 */}
        {activeTab === 'tab-4' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">🖨️ Phiếu Tiếp Nhận & Nghiệm Thu A4</h2>
                <p className="text-xs text-slate-500">Chuẩn in @media print tự động ẩn thanh menu</p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs min-h-[48px]"
              >
                In Phiếu Nghiệm Thu (Khổ A4)
              </button>
            </div>

            {/* Printable A4 Sheet */}
            <div id="printable-certificate" className="bg-white border rounded-2xl p-8 max-w-4xl mx-auto space-y-6 text-slate-900 text-xs">
              <div className="flex justify-between border-b pb-4">
                <div>
                  <div className="font-bold uppercase text-slate-700">CỔNG HỌC TẬP & THỰC HÀNH KỸ THUẬT CNTT</div>
                  <div className="text-slate-500">Bộ Môn Kỹ Thuật Phần Cứng & Mạng Máy Tính</div>
                </div>
                <div className="text-right font-mono font-bold">
                  <div>MÃ: PKTV-2026-{candidateStation.replace('Máy ', 'M')}</div>
                  <div className="text-slate-400 font-normal">Năm 2026</div>
                </div>
              </div>

              <div className="text-center space-y-1">
                <h1 className="text-xl font-black uppercase">PHIẾU TIẾP NHẬN, XỬ LÝ VÀ NGHIỆM THU KỸ THUẬT</h1>
                <p className="italic text-slate-500">(Ban hành theo Phụ lục II, Thông tư 55/2026/TT-BGDĐT)</p>
              </div>

              <div className="grid grid-cols-3 gap-3 border p-3 rounded-xl bg-slate-50">
                <div>Kỹ thuật viên: <strong>{candidateName || '(Chưa nhập)'}</strong></div>
                <div>Lớp: <strong>{candidateClass}</strong></div>
                <div>Bàn kỹ thuật: <strong>{candidateStation}</strong></div>
              </div>

              <div className="border p-3 rounded-xl space-y-1">
                <div><strong>Đề sát hạch:</strong> {currentTicket.code} - {currentTicket.title}</div>
                <div><strong>Sự cố tiếp nhận:</strong> {currentTicket.problem}</div>
                <div><strong>Cấu hình phòng lab:</strong> Main H510 · Core i5-10400 · RAM 8GB DDR4 · SSD SATA · VGA GT 730 · Win 10 Pro</div>
              </div>

              <div className="border p-3 rounded-xl space-y-1 bg-slate-50/50">
                <div className="font-bold text-slate-700">KIỂM SOÁT AN TOÀN & BẢO TOÀN DỮ LIỆU:</div>
                <div>✓ [X] Đã rút phích AC và bấm xả điện 3 lần trước khi mở máy.</div>
                <div>✓ [X] Đã sao lưu 100% dữ liệu Desktop, Documents sang Ổ D.</div>
                <div>✓ [X] Cài Win 10 UEFI/GPT chỉ format ổ C.</div>
                <div>✓ [X] Khôi phục trả dữ liệu nguyên vẹn về Desktop và mở file kiểm tra.</div>
              </div>

              <table className="w-full border-collapse border text-left">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border p-2">Tiêu chí đánh giá Rubric</th>
                    <th className="border p-2 w-24 text-center">Tối đa</th>
                    <th className="border p-2 w-28 text-center">Đạt được</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">1. Quy trình và an toàn kỹ thuật (ESD, xả tụ, 5S)</td>
                    <td className="border p-2 text-center">2.0 đ</td>
                    <td className="border p-2 text-center font-bold">{rubricScores.safety.toFixed(1)}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">2. Chẩn đoán nguyên nhân sự cố (Beep code, khoanh vùng)</td>
                    <td className="border p-2 text-center">2.5 đ</td>
                    <td className="border p-2 text-center font-bold">{rubricScores.diagnosis.toFixed(1)}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">3. Thao tác xử lý kỹ thuật (RAM, VGA GT 730, keo tản nhiệt, Win 10)</td>
                    <td className="border p-2 text-center">3.0 đ</td>
                    <td className="border p-2 text-center font-bold">{rubricScores.operation.toFixed(1)}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">4. Kiểm tra và xác nhận vận hành (HWMonitor &lt; 75°C, in Test Page)</td>
                    <td className="border p-2 text-center">1.5 đ</td>
                    <td className="border p-2 text-center font-bold">{rubricScores.verification.toFixed(1)}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">5. Bàn giao và hồ sơ kỹ thuật (Dữ liệu trả đủ, dọn sạch 5S)</td>
                    <td className="border p-2 text-center">1.0 đ</td>
                    <td className="border p-2 text-center font-bold">{rubricScores.handover.toFixed(1)}</td>
                  </tr>
                  <tr className="bg-slate-100 font-bold">
                    <td className="border p-2">TỔNG ĐIỂM & KẾT LUẬN</td>
                    <td className="border p-2 text-center">10.0 đ</td>
                    <td className="border p-2 text-center font-black text-sm">{totalRubricScore.toFixed(1)} đ</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-between font-bold pt-2">
                <span>Xếp loại:</span>
                <span className={isPassed ? 'text-emerald-700' : 'text-rose-700'}>
                  {isPassed ? 'ĐẠT (NĂNG LỰC NGHỀ KTV ĐẠT CHUẨN)' : 'CHƯA ĐẠT (CẦN RÈN LUYỆN LẠI)'}
                </span>
              </div>

              <div className="grid grid-cols-2 pt-8 text-center">
                <div className="space-y-12">
                  <div className="font-bold">KỸ THUẬT VIÊN TẬP SỰ</div>
                  <div>{candidateName || '...........................................'}</div>
                </div>
                <div className="space-y-12">
                  <div className="font-bold">GIÁO VIÊN HƯỚNG DẪN & NGHIỆM THU</div>
                  <div className="font-bold">CN. PHẠM TIẾN ĐỒNG</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
