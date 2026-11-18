'use client';

import React, { useState, useEffect } from 'react';
import {
  HSG_QUESTION_BANK,
  SUBNET_CHEAT_SHEET,
  SUBNET_PRACTICE_PROBLEMS,
  HSG_PROJECT_TEAMS,
  HSG_PROJECT_STAGES,
  HSG_RUBRIC_CRITERIA,
} from '@/data/hsgCurriculum';

export default function HsgPhanCungMangPage() {
  const [activeTab, setActiveTab] = useState<'subnetting' | 'mcq' | 'stages'>('subnetting');

  // =========================================================================
  // MODULE 1: SUBNETTING REFLEX 30S
  // =========================================================================
  const [problemIndex, setProblemIndex] = useState(0);
  const currentProblem = SUBNET_PRACTICE_PROBLEMS[problemIndex] || SUBNET_PRACTICE_PROBLEMS[0];

  const [inputMask, setInputMask] = useState('');
  const [inputNetwork, setInputNetwork] = useState('');
  const [inputFirstHost, setInputFirstHost] = useState('');
  const [inputLastHost, setInputLastHost] = useState('');
  const [inputBroadcast, setInputBroadcast] = useState('');

  const [timerSeconds, setTimerSeconds] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [isSubnetChecked, setIsSubnetChecked] = useState(false);
  const [subnetScore, setSubnetScore] = useState(0);
  const [totalSolved, setTotalSolved] = useState(0);
  const [results, setResults] = useState<{
    mask: boolean;
    net: boolean;
    first: boolean;
    last: boolean;
    bc: boolean;
  }>({ mask: false, net: false, first: false, last: false, bc: false });

  // 30s Countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && !isSubnetChecked) {
      handleCheckSubnet();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerSeconds, isSubnetChecked]);

  const resetSubnetProblem = (idx: number) => {
    setProblemIndex(idx);
    setInputMask('');
    setInputNetwork('');
    setInputFirstHost('');
    setInputLastHost('');
    setInputBroadcast('');
    setIsSubnetChecked(false);
    setResults({ mask: false, net: false, first: false, last: false, bc: false });
    setTimerSeconds(30);
    setTimerActive(true);
  };

  const handleCheckSubnet = () => {
    setTimerActive(false);
    setIsSubnetChecked(true);

    const clean = (s: string) => (s || '').trim();
    const isMaskOk = clean(inputMask) === currentProblem.correctMask;
    const isNetOk = clean(inputNetwork) === currentProblem.correctNetwork;
    const isFirstOk = clean(inputFirstHost) === currentProblem.correctFirstHost;
    const isLastOk = clean(inputLastHost) === currentProblem.correctLastHost;
    const isBcOk = clean(inputBroadcast) === currentProblem.correctBroadcast;

    setResults({
      mask: isMaskOk,
      net: isNetOk,
      first: isFirstOk,
      last: isLastOk,
      bc: isBcOk,
    });

    let earned = 0;
    if (isMaskOk) earned += 10;
    if (isNetOk) earned += 10;
    if (isFirstOk) earned += 10;
    if (isLastOk) earned += 10;
    if (isBcOk) earned += 10;

    setSubnetScore((prev) => prev + earned);
    setTotalSolved((prev) => prev + 1);
  };

  const handleNextProblem = () => {
    const nextIdx = (problemIndex + 1) % SUBNET_PRACTICE_PROBLEMS.length;
    resetSubnetProblem(nextIdx);
  };

  const handleRandomProblem = () => {
    const randIdx = Math.floor(Math.random() * SUBNET_PRACTICE_PROBLEMS.length);
    resetSubnetProblem(randIdx);
  };

  // =========================================================================
  // MODULE 2: 54 MCQS
  // =========================================================================
  const [mcqFilter, setMcqFilter] = useState<'all' | 'kien-truc-phan-cung' | 'osi-tcpip' | 'routing-switching-security'>('all');
  const [mcqAnswers, setMcqAnswers] = useState<{ [qId: string]: number }>({});

  const filteredQuestions = HSG_QUESTION_BANK.filter((q) => {
    if (mcqFilter === 'all') return true;
    return q.group === mcqFilter;
  });

  const answeredCount = Object.keys(mcqAnswers).length;
  const correctCount = Object.entries(mcqAnswers).filter(([qId, ans]) => {
    const q = HSG_QUESTION_BANK.find((item) => item.id === qId);
    return q && q.correctIndex === ans;
  }).length;
  const accuracyPercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  // =========================================================================
  // MODULE 3: 5 STAGES & RUBRIC 100 POINTS
  // =========================================================================
  const [selectedTeamId, setSelectedTeamId] = useState('team_04tha3_1');
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [checklist, setChecklist] = useState<{ [id: string]: boolean }>({});

  // Members
  const [memberLead, setMemberLead] = useState('Nguyễn Văn An (Kỹ sư trưởng)');
  const [memberCable, setMemberCable] = useState('Trần Thị Bình (Kỹ sư cáp & cơ khí)');
  const [memberSys, setMemberSys] = useState('Lê Hoàng Cường (Kỹ sư Windows & dịch vụ)');
  const [memberNet, setMemberNet] = useState('Phạm Minh Đức (Kỹ sư mạng & bảo mật)');

  // Overall Project Timer
  const [projectTotalMinutes, setProjectTotalMinutes] = useState(180);
  const [projectSeconds, setProjectSeconds] = useState(180 * 60);
  const [projectRunning, setProjectRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (projectRunning && projectSeconds > 0) {
      interval = setInterval(() => {
        setProjectSeconds((prev) => prev - 1);
      }, 1000);
    } else if (projectSeconds === 0 && projectRunning) {
      setProjectRunning(false);
      alert('Hết giờ làm bài thi tổng hợp! Mời Đội thi dừng tay để Ban Giám khảo chấm điểm Rubric.');
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [projectRunning, projectSeconds]);

  const formatProjectTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const pad = (n: number) => (n < 10 ? '0' + n : n);
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  // Rubric Scores
  const [rubricScores, setRubricScores] = useState<{ [critId: string]: number }>({
    rubric_c1: 23,
    rubric_c2: 18,
    rubric_c3: 22,
    rubric_c4: 14,
    rubric_c5: 14,
  });
  const [judgeRemarks, setJudgeRemarks] = useState(
    'Đội thi công nhanh nhẹn, đường cáp đẹp thẩm mỹ, mạng nội bộ ping thông suốt 100%, bảo vệ đề tài tự tin.'
  );

  const activeTeam = HSG_PROJECT_TEAMS.find((t) => t.id === selectedTeamId) || HSG_PROJECT_TEAMS[0];
  const totalRubricPoints = Object.values(rubricScores).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
  const rubricScale10 = Math.round((totalRubricPoints / 10) * 10) / 10;

  const getRank = (score: number) => {
    if (score >= 80) return { text: 'GIẢI XUẤT SẮC · ĐẠT CHUẨN HSG', badgeClass: 'bg-emerald-600 text-white' };
    if (score >= 50) return { text: 'MỨC CẦN CỐ GẮNG', badgeClass: 'bg-amber-600 text-white' };
    return { text: 'MỨC CHƯA ĐẠT CHUẨN', badgeClass: 'bg-rose-600 text-white' };
  };

  const rankInfo = getRank(totalRubricPoints);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      
      {/* Navigation & Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="font-extrabold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors">
              Cổng CNTT
            </a>
            <span className="text-slate-300">/</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 truncate">
              Chuyên đề 02: HSG Phần Cứng & Mạng
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
              Đội Tuyển HSG
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Banner Card */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm print:hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-slate-100">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold rounded-full">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                CHUYÊN ĐỀ 02: HSG-02_PHAN_CUNG_MANG
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Thi Học Sinh Giỏi Phần Cứng & Mạng Máy Tính
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                Chương trình bồi dưỡng Đội tuyển Học sinh Giỏi cấp trường: Huấn luyện phản xạ Subnetting trong 30 giây, 
                ngân hàng 54 câu hỏi vận dụng cao và Sa bàn mô phỏng dự án thi công trọn gói 180 - 240 phút.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[90px]">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Đội Tuyển</div>
                <div className="text-sm font-black text-slate-800">Ea H'leo</div>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[90px]">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Trắc Nghiệm</div>
                <div className="text-sm font-black text-blue-600">54 Câu HSG</div>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[90px]">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Sa Bàn Dự Án</div>
                <div className="text-sm font-black text-emerald-600">5 Chặng 100đ</div>
              </div>
            </div>
          </div>

          {/* 3 Tabs */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('subnetting')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[48px] cursor-pointer ${
                activeTab === 'subnetting' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>⚡</span>
              <span>Module 1: Phản Xạ Subnetting 30s</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('mcq')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[48px] cursor-pointer ${
                activeTab === 'mcq' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>📚</span>
              <span>Module 2: 54 Câu Phân Loại Cao</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('stages')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[48px] cursor-pointer ${
                activeTab === 'stages' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>🛠️</span>
              <span>Module 3: Sa Bàn 5 Chặng & Rubric 100đ</span>
            </button>
          </div>
        </section>

        {/* =================================================================== */}
        {/* TAB 1: SUBNETTING REFLEX 30s                                        */}
        {/* =================================================================== */}
        {activeTab === 'subnetting' && (
          <section className="space-y-6 print:hidden">
            {/* Header Timer */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                      Đồng Hồ Tốc Độ 30 Giây
                    </span>
                    <span className="text-xs text-slate-500">Mục tiêu: Đạt tốc độ tính nhẩm chuẩn KTV</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">Luyện Phản Xạ Chia Mạng IPv4 (Magic Number)</h2>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-mono text-xl sm:text-2xl font-black shadow-inner ${
                      timerSeconds <= 5 ? 'bg-rose-500 text-white animate-pulse border-rose-600' : 'bg-slate-900 text-white border-slate-800'
                    }`}
                  >
                    <span>{timerSeconds < 10 ? '0' + timerSeconds : timerSeconds}</span>
                    <span className="text-xs font-sans font-bold uppercase tracking-wider">Giây</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setTimerSeconds(30);
                      setTimerActive(true);
                      setIsSubnetChecked(false);
                    }}
                    className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors min-h-[44px]"
                  >
                    🔄 Reset 30s
                  </button>
                </div>
              </div>

              {/* Bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                    timerSeconds <= 5 ? 'bg-rose-500' : timerSeconds <= 15 ? 'bg-amber-500' : 'bg-blue-600'
                  }`}
                  style={{ width: `${(timerSeconds / 30) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column Inputs */}
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {currentProblem.teamTarget}
                      </span>
                      <span className="text-xs text-slate-500">Quy hoạch mạng phòng ban</span>
                    </div>
                    <div className="text-base sm:text-lg font-extrabold text-slate-900">{currentProblem.department}</div>
                    <div className="text-xs text-slate-600">
                      Yêu cầu số lượng máy: <strong className="text-slate-900 font-bold">{currentProblem.requiredHosts} thiết bị</strong>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border-2 border-slate-900 text-center shrink-0 shadow-sm">
                    <div className="text-[10px] uppercase font-bold text-slate-500">Địa Chỉ IP / Prefix Đề Bài</div>
                    <div className="text-xl sm:text-2xl font-black font-mono text-blue-700 mt-0.5">{currentProblem.ipInput}</div>
                  </div>
                </div>

                {/* Sơ đồ Topo logic mạng phòng ban (Minh họa trực quan) */}
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm">
                  <div className="relative group">
                    <img src="/images/hsg-02/topology-packet-tracer-vlsm.svg" alt="Sơ đồ Topo nguyên lý mạng logic trên Cisco Packet Tracer" className="w-full h-auto max-h-56 object-cover" loading="lazy" />
                    <div className="absolute bottom-0 inset-x-0 bg-slate-950/85 px-3 py-2 flex items-center justify-between text-[11px] text-white">
                      <span>📷 Sơ đồ Topo nguyên lý logic Cisco Packet Tracer &amp; Quy hoạch dải IP VLSM</span>
                      <a href="/images/hsg-02/topology-packet-tracer-vlsm.svg" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-bold inline-flex items-center gap-1">
                        <span>Xem ảnh to ↗</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 5 Fast Inputs */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">5 Thông Số Cần Xác Định:</h3>
                    <span className="text-[11px] text-slate-500">Mỗi ô đúng = 10 điểm</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 1. Mask */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>1. Subnet Mask (Dạng 255.255.255.xxx)</span>
                        {isSubnetChecked && (
                          <span className={`text-xs font-black ${results.mask ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {results.mask ? '✓ ĐÚNG' : '✗ SAI'}
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        value={inputMask}
                        onChange={(e) => setInputMask(e.target.value)}
                        placeholder="VD: 255.255.255.192"
                        disabled={isSubnetChecked}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-mono border focus:ring-2 focus:ring-slate-900 focus:outline-none transition-colors ${
                          isSubnetChecked
                            ? results.mask
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                              : 'border-rose-500 bg-rose-50 text-rose-900'
                            : 'border-slate-300 bg-white'
                        }`}
                      />
                      {isSubnetChecked && !results.mask && (
                        <div className="text-[11px] text-rose-600 font-mono">
                          Đáp án đúng: <span className="font-bold">{currentProblem.correctMask}</span>
                        </div>
                      )}
                    </div>

                    {/* 2. NetID */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>2. Network ID (Địa chỉ mạng)</span>
                        {isSubnetChecked && (
                          <span className={`text-xs font-black ${results.net ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {results.net ? '✓ ĐÚNG' : '✗ SAI'}
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        value={inputNetwork}
                        onChange={(e) => setInputNetwork(e.target.value)}
                        placeholder="VD: 192.168.10.0"
                        disabled={isSubnetChecked}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-mono border focus:ring-2 focus:ring-slate-900 focus:outline-none transition-colors ${
                          isSubnetChecked
                            ? results.net
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                              : 'border-rose-500 bg-rose-50 text-rose-900'
                            : 'border-slate-300 bg-white'
                        }`}
                      />
                      {isSubnetChecked && !results.net && (
                        <div className="text-[11px] text-rose-600 font-mono">
                          Đáp án đúng: <span className="font-bold">{currentProblem.correctNetwork}</span>
                        </div>
                      )}
                    </div>

                    {/* 3. First Host */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>3. First Host IP (Máy đầu tiên)</span>
                        {isSubnetChecked && (
                          <span className={`text-xs font-black ${results.first ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {results.first ? '✓ ĐÚNG' : '✗ SAI'}
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        value={inputFirstHost}
                        onChange={(e) => setInputFirstHost(e.target.value)}
                        placeholder="VD: 192.168.10.1"
                        disabled={isSubnetChecked}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-mono border focus:ring-2 focus:ring-slate-900 focus:outline-none transition-colors ${
                          isSubnetChecked
                            ? results.first
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                              : 'border-rose-500 bg-rose-50 text-rose-900'
                            : 'border-slate-300 bg-white'
                        }`}
                      />
                      {isSubnetChecked && !results.first && (
                        <div className="text-[11px] text-rose-600 font-mono">
                          Đáp án đúng: <span className="font-bold">{currentProblem.correctFirstHost}</span>
                        </div>
                      )}
                    </div>

                    {/* 4. Last Host */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>4. Last Host IP (Máy cuối cùng)</span>
                        {isSubnetChecked && (
                          <span className={`text-xs font-black ${results.last ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {results.last ? '✓ ĐÚNG' : '✗ SAI'}
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        value={inputLastHost}
                        onChange={(e) => setInputLastHost(e.target.value)}
                        placeholder="VD: 192.168.10.62"
                        disabled={isSubnetChecked}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-mono border focus:ring-2 focus:ring-slate-900 focus:outline-none transition-colors ${
                          isSubnetChecked
                            ? results.last
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                              : 'border-rose-500 bg-rose-50 text-rose-900'
                            : 'border-slate-300 bg-white'
                        }`}
                      />
                      {isSubnetChecked && !results.last && (
                        <div className="text-[11px] text-rose-600 font-mono">
                          Đáp án đúng: <span className="font-bold">{currentProblem.correctLastHost}</span>
                        </div>
                      )}
                    </div>

                    {/* 5. Broadcast */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>5. Broadcast IP (Địa chỉ quảng bá mạng con)</span>
                        {isSubnetChecked && (
                          <span className={`text-xs font-black ${results.bc ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {results.bc ? '✓ ĐÚNG' : '✗ SAI'}
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        value={inputBroadcast}
                        onChange={(e) => setInputBroadcast(e.target.value)}
                        placeholder="VD: 192.168.10.63"
                        disabled={isSubnetChecked}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-mono border focus:ring-2 focus:ring-slate-900 focus:outline-none transition-colors ${
                          isSubnetChecked
                            ? results.bc
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                              : 'border-rose-500 bg-rose-50 text-rose-900'
                            : 'border-slate-300 bg-white'
                        }`}
                      />
                      {isSubnetChecked && !results.bc && (
                        <div className="text-[11px] text-rose-600 font-mono">
                          Đáp án đúng: <span className="font-bold">{currentProblem.correctBroadcast}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {!isSubnetChecked ? (
                    <button
                      type="button"
                      onClick={handleCheckSubnet}
                      className="flex-1 min-h-[48px] px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>✅ Kiểm Tra & Xem Bí Quyết</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextProblem}
                      className="flex-1 min-h-[48px] px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Tiếp Tục Bài Kế Tiếp ➔</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleRandomProblem}
                    className="min-h-[48px] px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    🎲 Đổi Bài Ngẫu Nhiên
                  </button>
                </div>

                {/* Magic Number Formula Box */}
                {isSubnetChecked && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                      <span>💡</span>
                      <span>BÍ QUYẾT TÍNH NHẨM THẦN TỐC (MAGIC NUMBER):</span>
                    </div>
                    <p className="text-xs leading-relaxed text-amber-900">{currentProblem.explanationFormula}</p>
                    <div className="pt-2 border-t border-amber-200/60 text-[11px] text-amber-800 font-mono">
                      Công thức cốt lõi: <strong>Magic Number = 256 - OctetMask</strong> = {currentProblem.magicNumber}.
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Score & Cheat Sheet */}
              <div className="lg:col-span-4 space-y-5">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Thành Tích Luyện Phản Xạ</h3>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Tổng Điểm Tích Lũy</div>
                      <div className="text-2xl font-black text-slate-900 font-mono">{subnetScore}</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Số Bài Đã Làm</div>
                      <div className="text-2xl font-black text-blue-600 font-mono">{totalSolved}</div>
                    </div>
                  </div>
                </div>

                {/* Cheat Sheet Table */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <span>📖</span>
                      <span>Bảng Bước Nhảy /24 ➔ /30</span>
                    </h3>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">Magic Number</span>
                  </div>

                  <div className="overflow-x-auto text-xs">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 text-[11px] text-left">
                          <th className="py-1.5 font-bold">Prefix</th>
                          <th className="py-1.5 font-bold">Octet Mask</th>
                          <th className="py-1.5 font-bold text-center">Bước Nhảy</th>
                          <th className="py-1.5 font-bold text-right">Host</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                        {SUBNET_CHEAT_SHEET.map((item) => (
                          <tr key={item.cidr} className="hover:bg-slate-50">
                            <td className="py-1.5 font-bold text-blue-700">{item.cidr}</td>
                            <td className="py-1.5 text-slate-700">{item.subnetMask.split('.').pop()}</td>
                            <td className="py-1.5 text-center font-bold text-amber-700">{item.magicNumber}</td>
                            <td className="py-1.5 text-right text-slate-900">{item.usableHosts}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Question List */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">6 Tình Huống Đề Mẫu:</h3>
                  <div className="space-y-2">
                    {SUBNET_PRACTICE_PROBLEMS.map((prob, idx) => (
                      <button
                        key={prob.id}
                        type="button"
                        onClick={() => resetSubnetProblem(idx)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                          problemIndex === idx ? 'border-slate-900 bg-slate-50 font-bold' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <span className="text-slate-400 font-mono mr-1">#{idx + 1}</span>
                          <span>{prob.department}</span>
                        </div>
                        <span className="font-mono text-[11px] bg-slate-200/70 px-1.5 py-0.5 rounded text-slate-800 shrink-0">
                          {prob.cidr}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* TAB 2: 54 HIGH-DIFFICULTY MCQS                                      */}
        {/* =================================================================== */}
        {activeTab === 'mcq' && (
          <section className="space-y-6 print:hidden">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Ngân Hàng 54 Câu Hỏi Phân Loại Cao (Đội Tuyển HSG)</h2>
                  <p className="text-xs text-slate-500">Kiểm tra tư duy giải thích bản chất kỹ thuật, sơ đồ khối và giao thức mạng chuẩn quốc tế</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700">
                    Đã làm: <strong className="text-slate-900">{answeredCount}/{filteredQuestions.length}</strong>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                    Đúng: <strong>{correctCount}</strong> ({accuracyPercent}%)
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Xóa kết quả trắc nghiệm để làm lại?')) setMcqAnswers({});
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors"
                  >
                    🔄 Reset
                  </button>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setMcqFilter('all')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
                    mcqFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Tất cả (54 câu)
                </button>
                <button
                  type="button"
                  onClick={() => setMcqFilter('kien-truc-phan-cung')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
                    mcqFilter === 'kien-truc-phan-cung' ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Bo mạch & Vi xử lý (18)
                </button>
                <button
                  type="button"
                  onClick={() => setMcqFilter('osi-tcpip')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
                    mcqFilter === 'osi-tcpip' ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  OSI 7 Tầng & TCP/IP (18)
                </button>
                <button
                  type="button"
                  onClick={() => setMcqFilter('routing-switching-security')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
                    mcqFilter === 'routing-switching-security' ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Định Tuyến & Bảo Mật (18)
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.map((q, index) => {
                const userChoice = mcqAnswers[q.id];
                const isAnswered = userChoice !== undefined;
                return (
                  <div key={q.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-900 text-white font-mono">
                          Câu {index + 1}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-100 text-slate-600">
                          {q.subtopic}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800">
                        {q.level === 'VanDungCao' ? 'Vận Dụng Cao' : q.level === 'VanDung' ? 'Vận Dụng' : 'Thông Hiểu'}
                      </span>
                    </div>

                    <div className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">{q.question}</div>

                    <div className="grid grid-cols-1 gap-2.5 pt-1">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle = 'border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-800';
                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-sm';
                          } else if (userChoice === optIdx) {
                            btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                          } else {
                            btnStyle = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            disabled={isAnswered}
                            onClick={() => setMcqAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 min-h-[48px] cursor-pointer ${btnStyle}`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 font-mono ${
                                isAnswered && optIdx === q.correctIndex ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-relaxed">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div
                        className={`p-4 rounded-xl border space-y-1.5 ${
                          userChoice === q.correctIndex
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold text-xs">
                          {userChoice === q.correctIndex ? '✅ GIẢI THÍCH KỸ THUẬT CHUẨN XÁC:' : '⚠️ BẢN CHẤT KỸ THUẬT CHUYÊN SÂU:'}
                        </div>
                        <p className="text-xs leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* TAB 3: 5 STAGES & RUBRIC 100 POINTS                                 */}
        {/* =================================================================== */}
        {activeTab === 'stages' && (
          <section className="space-y-6">
            {/* Control Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-5 print:hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-4 border-b border-slate-100">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chọn Đội Tuyển Đại Diện Cơ Sở:</label>
                  <div className="flex flex-wrap items-center gap-2">
                    {HSG_PROJECT_TEAMS.map((team) => (
                      <button
                        key={team.id}
                        type="button"
                        onClick={() => setSelectedTeamId(team.id)}
                        className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] cursor-pointer ${
                          selectedTeamId === team.id ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {team.code} ({team.branch.replace('Cơ sở ', '')})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center gap-3 shadow-inner">
                    <div>
                      <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Thời Gian Toàn Dự Án</div>
                      <div className="text-xl sm:text-2xl font-mono font-black">{formatProjectTime(projectSeconds)}</div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => setProjectRunning(!projectRunning)}
                        className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold transition-colors"
                      >
                        {projectRunning ? '⏸ Tạm dừng' : '▶ Bắt đầu'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const newM = projectTotalMinutes === 180 ? 240 : 180;
                          setProjectTotalMinutes(newM);
                          setProjectSeconds(newM * 60);
                          setProjectRunning(false);
                        }}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono transition-colors"
                      >
                        {projectTotalMinutes}m (Đổi)
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="min-h-[48px] px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>🖨️</span>
                    <span>Xuất Biên Bản A4</span>
                  </button>
                </div>
              </div>

              {/* Roster Input */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block mb-1">1. Kỹ sư trưởng (Project Lead):</span>
                  <input
                    type="text"
                    value={memberLead}
                    onChange={(e) => setMemberLead(e.target.value)}
                    className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block mb-1">2. Kỹ sư Cáp & Hạ tầng:</span>
                  <input
                    type="text"
                    value={memberCable}
                    onChange={(e) => setMemberCable(e.target.value)}
                    className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block mb-1">3. Kỹ sư Windows & Dịch vụ:</span>
                  <input
                    type="text"
                    value={memberSys}
                    onChange={(e) => setMemberSys(e.target.value)}
                    className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block mb-1">4. Kỹ sư Mạng & Bảo mật:</span>
                  <input
                    type="text"
                    value={memberNet}
                    onChange={(e) => setMemberNet(e.target.value)}
                    className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Stepper 5 Stages */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-6 print:hidden">
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Quy Trình Thi Công 5 Chặng Liên Hoàn:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {HSG_PROJECT_STAGES.map((st, idx) => (
                    <button
                      key={st.step}
                      type="button"
                      onClick={() => setCurrentStageIdx(idx)}
                      className={`p-2.5 rounded-xl border text-left transition-all min-h-[52px] cursor-pointer flex flex-col justify-between ${
                        currentStageIdx === idx
                          ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-extrabold">{st.name}</span>
                        <span className="text-[10px] opacity-80">{st.timeLimit}</span>
                      </div>
                      <div className="text-[11px] font-medium truncate mt-1">{st.title.split('&')[0]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Stage Details */}
              {(() => {
                const currentStage = HSG_PROJECT_STAGES[currentStageIdx];
                return (
                  <div className="space-y-5">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
                            Vai trò: {currentStage.role}
                          </span>
                          <span className="text-xs text-slate-500">Thời lượng chuẩn: {currentStage.timeLimit}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">{currentStage.title}</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{currentStage.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs text-slate-500 uppercase">Trọng số</span>
                        <div className="text-xl font-black text-emerald-600">{currentStage.maxScore} Điểm</div>
                      </div>
                    </div>

                    {/* Ảnh Minh Họa Kỹ Thuật Trực Quan Theo Từng Chặng */}
                    {currentStage.step === 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
                        <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm flex flex-col justify-between">
                          <img src="/images/hsg-02/cable-tia-568ab-standard.svg" alt="Sơ đồ màu chuẩn TIA/EIA-568A và 568B" className="w-full h-auto max-h-56 object-contain p-2" loading="lazy" />
                          <div className="p-2.5 bg-slate-950 text-white text-[11px] flex justify-between items-center border-t border-slate-800">
                            <span>📷 Sơ đồ chuẩn màu 8 sợi TIA/EIA-568A vs 568B Gigabit</span>
                            <a href="/images/hsg-02/cable-tia-568ab-standard.svg" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-bold">Xem to ↗</a>
                          </div>
                        </div>
                        <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm flex flex-col justify-between">
                          <img src="/images/hsg-02/cable-tester-gigabit.svg" alt="Máy test mạng thông mạch 8/8 sợi tuyệt đối" className="w-full h-auto max-h-56 object-contain p-2" loading="lazy" />
                          <div className="p-2.5 bg-slate-950 text-white text-[11px] flex justify-between items-center border-t border-slate-800">
                            <span>📷 Máy test cáp mạng thông 8/8 sợi &amp; Cổng Switch 1Gbps</span>
                            <a href="/images/hsg-02/cable-tester-gigabit.svg" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-bold">Xem to ↗</a>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStage.step === 2 && (
                      <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm my-2">
                        <img src="/images/hsg-02/topology-packet-tracer-vlsm.svg" alt="Sơ đồ nguyên lý logic trên Cisco Packet Tracer" className="w-full h-auto max-h-64 object-contain p-2" loading="lazy" />
                        <div className="p-2.5 bg-slate-950 text-white text-[11px] flex justify-between items-center border-t border-slate-800">
                          <span>📷 Sơ đồ mạng Cisco Packet Tracer: Router Core, Switch 24-Port &amp; 4 VLAN phòng ban</span>
                          <a href="/images/hsg-02/topology-packet-tracer-vlsm.svg" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-bold">Xem to ↗</a>
                        </div>
                      </div>
                    )}

                    {currentStage.step === 3 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
                        <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm flex flex-col justify-between">
                          <img src="/images/hsg-02/win10-static-ip-config.svg" alt="Cửa sổ thiết lập IP tĩnh IPv4 trên Windows 10" className="w-full h-auto max-h-56 object-contain p-2" loading="lazy" />
                          <div className="p-2.5 bg-slate-950 text-white text-[11px] flex justify-between items-center border-t border-slate-800">
                            <span>📷 Cửa sổ thiết lập IP tĩnh IPv4 trên Windows 10</span>
                            <a href="/images/hsg-02/win10-static-ip-config.svg" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-bold">Xem to ↗</a>
                          </div>
                        </div>
                        <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm flex flex-col justify-between">
                          <img src="/images/hsg-02/ntfs-security-matrix.svg" alt="Ma trận phân quyền NTFS Security &amp; Share Permissions" className="w-full h-auto max-h-56 object-contain p-2" loading="lazy" />
                          <div className="p-2.5 bg-slate-950 text-white text-[11px] flex justify-between items-center border-t border-slate-800">
                            <span>📷 Ma trận phân quyền nâng cao NTFS Security &amp; Share Permissions</span>
                            <a href="/images/hsg-02/ntfs-security-matrix.svg" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-bold">Xem to ↗</a>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStage.step === 4 && (
                      <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm my-2 p-4 text-white space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-sky-400">📷 Cấu Hình Wi-Fi Router Doanh Nghiệp &amp; Bảo Mật AP</span>
                          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">WPA2/WPA3 AES</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                            <div className="font-bold text-amber-400">SSID 1: MẠNG NỘI BỘ (DOANH NGHIEP)</div>
                            <div className="text-slate-400 text-[11px]">• Chuẩn: WPA2/WPA3 Personal (AES)</div>
                            <div className="text-slate-400 text-[11px]">• Cấp phát dải DHCP nội bộ riêng</div>
                            <div className="text-slate-400 text-[11px]">• Cho phép thấy máy chủ &amp; máy in LAN</div>
                          </div>
                          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                            <div className="font-bold text-rose-400">SSID 2: MẠNG KHÁCH (GUEST WI-FI)</div>
                            <div className="text-slate-400 text-[11px]">• Kích hoạt: <strong>AP Isolation (Guest Network Isolation)</strong></div>
                            <div className="text-slate-400 text-[11px]">• Ngăn chặn 100% điện thoại khách quét trộm IP LAN</div>
                            <div className="text-slate-400 text-[11px]">• Giới hạn băng thông (Bandwidth Limit)</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStage.step === 5 && (
                      <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm my-2">
                        <img src="/images/hsg-02/system-full-acceptance-ping.svg" alt="Nghiệm thu toàn diện hệ thống: Ping thông 100% và in ấn LAN" className="w-full h-auto max-h-64 object-contain p-2" loading="lazy" />
                        <div className="p-2.5 bg-slate-950 text-white text-[11px] flex justify-between items-center border-t border-slate-800">
                          <span>📷 Nghiệm thu toàn diện: Command Prompt CMD Ping thông suốt 0% packet loss &amp; In test page</span>
                          <a href="/images/hsg-02/system-full-acceptance-ping.svg" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-bold">Xem to ↗</a>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Tiêu Chuẩn Kỹ Thuật Bắt Buộc Nghiệm Thu:</h4>
                      <div className="space-y-2.5">
                        {currentStage.checklists.map((item) => {
                          const isChecked = !!checklist[item.id];
                          return (
                            <div
                              key={item.id}
                              onClick={() => setChecklist((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                              className={`p-3.5 rounded-xl border transition-colors flex items-start gap-3 cursor-pointer select-none ${
                                isChecked ? 'bg-emerald-50/70 border-emerald-300' : 'bg-white border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {}}
                                className="mt-1 w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer"
                              />
                              <div className="flex-1 text-xs sm:text-sm">
                                <span className={`leading-relaxed ${isChecked ? 'text-emerald-950 font-medium' : 'text-slate-800'}`}>
                                  {item.label}
                                </span>
                                {item.critical && (
                                  <span className="inline-block ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                                    Bắt buộc
                                  </span>
                                )}
                              </div>
                              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0">
                                +{item.points}đ
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Rubric 100 Points Cockpit */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-6 print:hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-900 text-white">
                    <span>⚖️</span>
                    <span>HỘI ĐỒNG BAN GIÁM KHẢO</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mt-1">Bảng Chấm Điểm Rubric Dự Án (Thang Điểm 100)</h3>
                  <p className="text-xs text-slate-500">Quy đổi thang điểm 10: Điểm số &ge; 8.0 đạt chuẩn Đội tuyển HSG</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4 text-center shrink-0">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500">Tổng Điểm / 100</div>
                    <div className="text-2xl font-black text-slate-900 font-mono">{totalRubricPoints}</div>
                  </div>
                  <div className="h-8 w-px bg-slate-200"></div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500">Hệ Điểm 10</div>
                    <div className="text-2xl font-black text-blue-600 font-mono">{rubricScale10}</div>
                  </div>
                  <div className="h-8 w-px bg-slate-200"></div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500">Xếp Loại</div>
                    <div className={`px-2.5 py-1 rounded text-xs font-bold mt-0.5 ${rankInfo.badgeClass}`}>
                      {rankInfo.text}
                    </div>
                  </div>
                </div>
              </div>

              {/* 5 Criteria */}
              <div className="space-y-5">
                {HSG_RUBRIC_CRITERIA.map((crit) => (
                  <div key={crit.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-slate-400 font-mono mr-1">{crit.code}</span>
                        <span className="text-sm font-extrabold text-slate-900">{crit.name}</span>
                        <span className="text-xs text-slate-500 block sm:inline sm:ml-2">{crit.description}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold text-slate-500">Điểm:</span>
                        <input
                          type="number"
                          step={0.5}
                          min={0}
                          max={crit.maxPoints}
                          value={rubricScores[crit.id] || 0}
                          onChange={(e) =>
                            setRubricScores((prev) => ({
                              ...prev,
                              [crit.id]: Math.min(crit.maxPoints, Math.max(0, parseFloat(e.target.value) || 0)),
                            }))
                          }
                          className="w-20 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-sm font-black font-mono text-center focus:ring-1 focus:ring-slate-900 focus:outline-none"
                        />
                        <span className="text-xs font-bold text-slate-500">/ {crit.maxPoints}đ</span>
                      </div>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={crit.maxPoints}
                      step={0.5}
                      value={rubricScores[crit.id] || 0}
                      onChange={(e) =>
                        setRubricScores((prev) => ({
                          ...prev,
                          [crit.id]: parseFloat(e.target.value) || 0,
                        }))
                      }
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-200/60">
                      {crit.levels.map((lvl) => (
                        <div key={lvl.range} className="p-2 rounded bg-white border border-slate-100 text-slate-600">
                          <div className="flex items-center justify-between font-bold text-slate-800 mb-0.5">
                            <span>{lvl.label}</span>
                            <span className="font-mono text-[10px]">{lvl.range}đ</span>
                          </div>
                          <p className="text-[10px] leading-tight text-slate-500">{lvl.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Remarks */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Nhận Xét Của Ban Giám Khảo:</label>
                <textarea
                  value={judgeRemarks}
                  onChange={(e) => setJudgeRemarks(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-1 focus:ring-slate-900 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  * Đã hoàn thiện đánh giá theo chuẩn 5 tiêu chí Thông tư và Quy chế thi HSG.
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="min-h-[48px] px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>🖨️ Xuất & In Biên Bản Chấm Thi (A4)</span>
                </button>
              </div>
            </div>

            {/* Print Layout */}
            <div id="printable-hsg-record" className="hidden print:block bg-white text-black p-8 font-sans leading-normal">
              <div className="border-b-2 border-black pb-4 mb-6 text-center space-y-1">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-700">CỔNG HỌC TẬP & GIẢNG DẠY CNTT</div>
                <div className="text-xl font-black uppercase tracking-tight">HỘI ĐỒNG THI HỌC SINH GIỎI PHẦN CỨNG & MẠNG</div>
                <div className="text-sm font-semibold italic">BIÊN BẢN NGHIỆM THU DỰ ÁN THI CÔNG HẠ TẦNG VÀ ĐÁNH GIÁ KỸ NĂNG NGHỀ</div>
                <div className="text-xs font-mono pt-1 text-gray-600">
                  Mã Biên Bản: BB-HSG-2026-{activeTeam.code} · Thời gian thi: {projectTotalMinutes} Phút
                </div>
              </div>

              <div className="mb-5 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <div>Đội Tuyển Thi Đấu: <strong>{activeTeam.code} ({activeTeam.branch})</strong></div>
                  <div>Ngày Khảo Thí: <strong>{new Date().toLocaleDateString('vi-VN')}</strong></div>
                </div>
                <div className="border border-black p-3 rounded text-xs space-y-1 bg-gray-50/50">
                  <div className="font-bold uppercase text-[11px] mb-1">Thành viên Đội Tuyển Kỹ Sư:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>1. Kỹ sư trưởng: <strong>{memberLead}</strong></div>
                    <div>2. Kỹ sư thi công cáp: <strong>{memberCable}</strong></div>
                    <div>3. Kỹ sư Windows & Dịch vụ: <strong>{memberSys}</strong></div>
                    <div>4. Kỹ sư Mạng & Bảo mật: <strong>{memberNet}</strong></div>
                  </div>
                </div>
              </div>

              <table className="w-full border-collapse border border-black text-xs mb-5">
                <thead>
                  <tr className="bg-gray-100 text-center font-bold">
                    <th className="border border-black p-2 w-12">STT</th>
                    <th className="border border-black p-2 text-left">Tiêu Chí Đánh Giá Chuẩn HSG</th>
                    <th className="border border-black p-2 w-20">Trọng Số</th>
                    <th className="border border-black p-2 w-24">Điểm Tối Đa</th>
                    <th className="border border-black p-2 w-24">Điểm Đạt</th>
                  </tr>
                </thead>
                <tbody>
                  {HSG_RUBRIC_CRITERIA.map((crit, idx) => (
                    <tr key={crit.id}>
                      <td className="border border-black p-2 text-center font-mono">{idx + 1}</td>
                      <td className="border border-black p-2">
                        <strong>{crit.name}</strong>
                        <div className="text-[10px] text-gray-600">{crit.description}</div>
                      </td>
                      <td className="border border-black p-2 text-center">{crit.weightPercent}%</td>
                      <td className="border border-black p-2 text-center font-mono">{crit.maxPoints.toFixed(1)}</td>
                      <td className="border border-black p-2 text-center font-bold font-mono text-sm">
                        {rubricScores[crit.id] || 0}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold">
                    <td className="border border-black p-2 text-center" colSpan={2}>TỔNG ĐIỂM DỰ ÁN TOÀN DIỆN</td>
                    <td className="border border-black p-2 text-center">100%</td>
                    <td className="border border-black p-2 text-center font-mono">100.0</td>
                    <td className="border border-black p-2 text-center font-black font-mono text-base">{totalRubricPoints}</td>
                  </tr>
                </tbody>
              </table>

              <div className="border border-black p-3.5 mb-6 text-xs flex justify-between items-center">
                <div>Điểm quy đổi hệ 10: <strong className="text-base font-mono">{rubricScale10} / 10.0</strong></div>
                <div>Kết Luận Đánh Giá: <strong className="text-base uppercase">{rankInfo.text}</strong></div>
              </div>

              <div className="border border-black p-3 mb-8 text-xs min-h-[70px]">
                <div className="font-bold mb-1">Nhận xét chi tiết của Ban Giám Khảo:</div>
                <div className="italic text-gray-800">{judgeRemarks || 'Không có ghi chú thêm.'}</div>
              </div>

              <div className="grid grid-cols-2 text-center text-xs pt-4">
                <div className="space-y-16">
                  <div className="font-bold uppercase">ĐẠI DIỆN ĐỘI THI CÔNG</div>
                  <div className="italic text-gray-500">(Ký và ghi rõ họ tên)</div>
                </div>
                <div className="space-y-16">
                  <div className="font-bold uppercase">TRƯỞNG BAN GIÁM KHẢO</div>
                  <div className="font-bold text-sm">CN. Phạm Tiến Đông</div>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
