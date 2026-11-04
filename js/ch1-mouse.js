// ============================================================================
// MO-DUN 1: QUAN LY TRANG THAI & LUYEN CAM CHUOT 5 BAI (js/ch1-mouse.js - v5)
// ============================================================================

// Audio synthesizer
    let soundOn = true;
    let audioCtx = null;

    function playSound(type) {
      if (!soundOn) return;
      try {
        if (!audioCtx) {
          const AC = window.AudioContext || window.webkitAudioContext;
          if (AC) audioCtx = new AC();
        }
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        const t = audioCtx.currentTime;

        if (type === 'success') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, t);
          osc.frequency.setValueAtTime(659.25, t + 0.08);
          gain.gain.setValueAtTime(0.15, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
          osc.start(t);
          osc.stop(t + 0.2);
        } else if (type === 'level') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(523.25, t);
          osc.frequency.setValueAtTime(659.25, t + 0.08);
          osc.frequency.setValueAtTime(783.99, t + 0.16);
          osc.frequency.setValueAtTime(1046.5, t + 0.24);
          gain.gain.setValueAtTime(0.18, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
          osc.start(t);
          osc.stop(t + 0.4);
        } else if (type === 'warn') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(220, t);
          osc.frequency.setValueAtTime(180, t + 0.09);
          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
          osc.start(t);
          osc.stop(t + 0.22);
        }
      } catch (e) {}
    }

    // Security helper: Escape all user-supplied strings before rendering in innerHTML (Prevents XSS)
    function escapeHtml(str) {
      return String(str == null ? '' : str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    // Security helper: Sanitize CSV cell against formula injection (=, +, -, @, \t, \r) and double quotes
    function csvSafeCell(val) {
      let s = String(val == null ? '' : val).replace(/"/g, '""');
      if (/^[=+\-@\t\r]/.test(s)) {
        s = "'" + s;
      }
      return `"${s}"`;
    }

    // Dynamic Vietnamese date helper (Fixes hardcoded "03 tháng 11 năm 2026" date bug)
    function getVietnameseDateString() {
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, '0');
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yyyy = now.getFullYear();
      return `Đắk Lắk, ngày ${dd} tháng ${mm} năm ${yyyy}`;
    }

    // App state (With LocalStorage Session Persistence, Telemetry, Class PIN & Practice/Exam Mode)
    const SESSION_STATE_KEY = 'BMTC_93_ACTIVE_SESSION_V5';
    let currentClassName = 'Tin học ứng dụng 9+3 (K26A)';
    let currentStationName = 'Máy 01';
    let currentSessionName = 'Buổi 1 (Ch.1)';
    let currentClassPin = '';
    let isPracticeOnlyMode = false; // false = Chế độ Tính Điểm, true = Chế độ Luyện Tự Do
    let currentWizardStep = 0; // 0..4 corresponding to 5 steps
    let sessionStartTime = Date.now();

    const students = {
      1: {
        name: 'Em số 1 (Bên phải)',
        scores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        telexSteps: [0, 0, 0, 0, 0],
        chScores: { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
        mostMissed: 'Không có',
        telemetry: { clicks: 0, typos: 0 }
      },
      2: {
        name: 'Em số 2 (Bên trái)',
        scores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        telexSteps: [0, 0, 0, 0, 0],
        chScores: { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
        mostMissed: 'Không có',
        telemetry: { clicks: 0, typos: 0 }
      }
    };
    let activeStudent = 1;
    let currentTelexStep = 0;

    function isDefaultPlaceholderName(name) {
      const n = String(name || '').trim();
      return !n || n.startsWith('Em số 1') || n.startsWith('Em số 2') || n.includes('-- Học sinh mới');
    }

    function saveStudentSessionState() {
      try {
        const payload = {
          currentClassName,
          currentStationName,
          currentSessionName,
          currentClassPin,
          activeStudent,
          currentWizardStep,
          students
        };
        localStorage.setItem(SESSION_STATE_KEY, JSON.stringify(payload));
      } catch (e) {}
    }

    function restoreStudentSessionState() {
      try {
        const raw = localStorage.getItem(SESSION_STATE_KEY);
        if (!raw) return;
        const saved = JSON.parse(raw);
        if (saved.currentClassName) currentClassName = saved.currentClassName;
        if (saved.currentStationName) currentStationName = saved.currentStationName;
        if (saved.currentSessionName) currentSessionName = saved.currentSessionName;
        if (saved.currentClassPin != null) currentClassPin = saved.currentClassPin;
        if (saved.activeStudent === 1 || saved.activeStudent === 2) activeStudent = saved.activeStudent;
        if (saved.students && saved.students[1] && saved.students[2]) {
          [1, 2].forEach(id => {
            students[id].name = saved.students[id].name || students[id].name;
            if (saved.students[id].scores) Object.assign(students[id].scores, saved.students[id].scores);
            if (Array.isArray(saved.students[id].telexSteps)) students[id].telexSteps = saved.students[id].telexSteps;
            if (saved.students[id].chScores) Object.assign(students[id].chScores, saved.students[id].chScores);
            if (saved.students[id].mostMissed) students[id].mostMissed = saved.students[id].mostMissed;
            if (saved.students[id].telemetry) Object.assign(students[id].telemetry, saved.students[id].telemetry);
          });
        }
      } catch (e) {}
    }

    const TELEX_CHALLENGES = (window.COURSE_CONFIG && window.COURSE_CONFIG.telexChallenges) ? window.COURSE_CONFIG.telexChallenges : [
      {
        title: 'CÂU 1/5: GÕ TÊN TRƯỜNG (20 điểm)',
        target: 'Trường Cao đẳng Buôn Ma Thuột',
        hint: '💡 Gợi ý phím Telex: T-r-u-w-o-w-n-g-f  C-a-o  d-d-a-w-n-g-r  B-u-o-o-n  M-a  T-h-u-o-o-t-j'
      },
      {
        title: 'CÂU 2/5: GÕ TÊN KHOA & NGÀNH HỌC (20 điểm)',
        target: 'Khoa Công nghệ thông tin ngành Tin học ứng dụng',
        hint: '💡 Gợi ý phím Telex: K-h-o-a  C-o-o-n-g  n-g-h-e-e-j  t-h-o-o-n-g  t-i-n  n-g-a-n-h-f  T-i-n  h-o-c-j  u-w-n-g-s  d-u-n-g-j'
      },
      {
        title: 'CÂU 3/5: GÕ KỸ NĂNG NGHỀ TIN HỌC (20 điểm)',
        target: 'Thực hành lắp ráp máy tính và quản trị mạng',
        hint: '💡 Gợi ý phím Telex: T-h-u-w-c-j  h-a-n-h-f  l-a-w-p-s  r-a-p-s  m-a-y-s  t-i-n-h-s  v-a-f  q-u-a-n-r  t-r-i-j  m-a-n-g-j'
      },
      {
        title: 'CÂU 4/5: GÕ ĐỊA DANH TRUNG TÍNH TỈNH ĐẮK LẮK (20 điểm)',
        target: 'Em học tập tại tỉnh Đắk Lắk vùng Tây Nguyên',
        hint: '💡 Gợi ý phím Telex: E-m  h-o-c-j  t-a-a-p-j  t-a-i-j  t-i-n-h-r  D-d-a-w-s-k  L-a-w-s-k  v-u-n-g-f  T-a-a-y  N-g-u-y-e-e-n'
      },
      {
        title: 'CÂU 5/5: GÕ QUY TẮC LƯU BÀI PHÒNG MÁY (20 điểm)',
        target: 'Em luôn lưu bài tập vào thư mục ổ đĩa D an toàn',
        hint: '💡 Gợi ý phím Telex: E-m  l-u-o-o-n  l-u-w-u  b-a-i-f  t-a-a-p-j  v-a-o-f  t-h-u-w  m-u-c-j  o-o-r  d-d-i-a-x  D  a-n  t-o-a-n-f'
      }
    ];

    function getStudentTelexScore(id) {
      return students[id].telexSteps.reduce((a, b) => a + b, 0);
    }

    function getStudentWordScore(id) {
      const c = students[id].chScores;
      return Math.max(c[3] || 0, c[2] || 0);
    }

    function getStudentExcelScore(id) {
      const c = students[id].chScores;
      return Math.max(c[4] || 0, c[6] || 0, c[5] || 0);
    }

    function getStudentChAvg(id) {
      return Math.round((getStudentWordScore(id) + getStudentExcelScore(id)) / 2);
    }

    // Weighted Overall Grade on 10-point scale (Chuột 25% + Telex 30% + Word 25% + Excel/An toàn 20%)
    function getStudentOverall10(id) {
      const m = getStudentTotalScore(id);
      const t = getStudentTelexScore(id);
      const w = getStudentWordScore(id);
      const x = getStudentExcelScore(id);
      const weighted100 = (m * 0.25) + (t * 0.30) + (w * 0.25) + (x * 0.20);
      return (weighted100 / 10).toFixed(1);
    }
    let activeChapter = 1;
    let activeSubTab = 'mouse';
    let mouseLevel = 1;
    let mouseProgress = 0;
    let lastSingleClick = 0;

    const MOUSE_LEVELS = {
      1: {
        title: 'Bài 1: Tập Di Chuyển Chuột (Di chuột)',
        header: 'Bài 1: Trượt chuột đưa mũi tên chạm vào 10 vòng tròn xanh',
        instruction: 'Áp nhẹ lòng bàn tay phải lên lưng chuột. Trượt chuột trên bàn để đưa mũi tên chạm vào quả bóng xanh (không cần bấm nút).',
        highlight: 'body',
        caption: 'Trượt nhẹ cả con chuột trên mặt bàn phẳng',
        tip: 'Mẹo: Nếu hết mặt bàn mà chưa tới nơi, hãy nhấc nhẹ chuột đặt lại vào giữa tấm lót rồi trượt tiếp!'
      },
      2: {
        title: 'Bài 2: Tập Bấm Chuột Trái 1 Cái (Click trái)',
        header: 'Bài 2: Dùng NGÓN TRỎ bấm chuột TRÁI 1 cái vào nút xanh (10 lần)',
        instruction: 'Đưa mũi tên vào nút màu xanh ➔ Dùng NGÓN TRỎ bấm nhẹ 1 cái vào nút chuột BÊN TRÁI rồi thả ra ngay.',
        highlight: 'left',
        caption: 'Dùng NGÓN TRỎ bấm nút BÊN TRÁI 1 cái',
        tip: 'Cấm bấm bằng ngón giữa (chuột phải). Nếu bấm nhầm chuột phải, hệ thống sẽ nhắc ngay!'
      },
      3: {
        title: 'Bài 3: Tập Nháy Đúp Mở Cặp Vàng (Double Click)',
        header: 'Bài 3: Bấm nhanh 2 cái ("tách-tách") mở 5 chiếc cặp vàng',
        instruction: 'Đưa chuột vào cặp vàng ➔ Giữ yên chuột ➔ Dùng NGÓN TRỎ bấm nhanh 2 cái liên tiếp vào nút chuột TRÁI.',
        highlight: 'double',
        caption: 'NGÓN TRỎ bấm nhanh 2 cái liên tiếp ("tách-tách")',
        tip: 'Mẹo cho bạn tay cứng: Bấm chuột trái 1 cái chọn cặp vàng + Nhấn phím Enter trên bàn phím là mở ra ngay!'
      },
      4: {
        title: 'Bài 4: Bấm Chuột Phải Đổi Tên Rename',
        header: 'Bài 4: Dùng NGÓN GIỮA bấm chuột PHẢI ➔ Bấm chuột TRÁI chọn "Rename"',
        instruction: 'Bước 1: Ngón giữa bấm nút chuột PHẢI mở bảng. Bước 2: Ngón trỏ bấm chuột TRÁI vào dòng "Rename (Đổi tên)".',
        highlight: 'right',
        caption: 'Dùng NGÓN GIỮA bấm nút BÊN PHẢI 1 cái',
        tip: 'Quy tắc vàng: Chuột PHẢI mở bảng menu phụ, chuột TRÁI để bấm chọn lệnh!'
      },
      5: {
        title: 'Bài 5: Kéo Bài Vào Ổ Đĩa D:\\ & Cuộn Chuột',
        header: 'Bài 5: Bấm giữ chuột trái kéo 3 bài vào Ổ đĩa (D:) & Lăn con lăn chuột',
        instruction: 'Bấm giữ nút chuột trái kéo bài tập thả sang khung Ổ đĩa (D:). Cấm thả vào Ổ đĩa (C:) vì sẽ bị mất bài!',
        highlight: 'wheel',
        caption: 'Ấn giữ chuột trái để kéo thả & Lăn con lăn ở giữa',
        tip: 'Ổ C:\\ là của máy (tắt máy là mất) - Ổ D:\\ là của mình (cất bài an toàn)!'
      }
    };

    const CHAPTERS_INFO = (window.COURSE_CONFIG && window.COURSE_CONFIG.chaptersInfo) ? window.COURSE_CONFIG.chaptersInfo : {
      2: { title: 'CHƯƠNG 2: INTERNET & THƯ ĐIỆN TỬ (EMAIL)', icon: '🌐', desc: 'Học sinh sẽ học: Mở trình duyệt Chrome/Edge, tìm kiếm thông tin chuyên ngành, tải hình ảnh và đăng nhập gửi Email công việc.' },
      3: { title: 'CHƯƠNG 3: SOẠN THẢO VĂN BẢN WORD 2016', icon: '📄', desc: 'Học sinh sẽ học: Chọn khổ giấy A4, phông Times New Roman 14, căn lề, gõ Quốc hiệu - Tiêu ngữ và soạn hoàn chỉnh Đơn xin phép, Thông báo.' },
      4: { title: 'CHƯƠNG 4: BẢNG TÍNH ĐIỆN TỬ EXCEL 2016', icon: '📊', desc: 'Học sinh sẽ học: Nhập bảng dữ liệu, kẻ khung All Borders, gộp ô, tính + - * / và các hàm cơ bản SUM, AVERAGE, MAX, MIN, IF.' },
      5: { title: 'CHƯƠNG 5: THIẾT KẾ BÀI TRÌNH CHIẾU POWERPOINT', icon: '📽️', desc: 'Học sinh sẽ học: Tạo trang slide mới, gõ tiêu đề, chèn hình ảnh từ ổ D:\\, chọn màu nền Design và bấm F5 trình chiếu.' },
      6: { title: 'CHƯƠNG 6: AN TOÀN THÔNG TIN & KIỂM TRA CUỐI MÔN', icon: '🛡️', desc: 'Học sinh sẽ học: Đặt mật khẩu an toàn, quy tắc 3 Không chống lừa đảo, đăng xuất máy phòng thực hành và làm bài kiểm tra tổng hợp.' }
    };

    function getStudentTotalScore(id) {
      const sc = students[id].scores;
      return sc[1] + sc[2] + sc[3] + sc[4] + sc[5];
    }

    function setLiveTip(msg, isWarn = false) {
      const el = document.getElementById('lblLiveFeedback');
      if (!el) return;
      el.textContent = msg;
      const box = el.parentElement;
      if (isWarn) {
        box.className = 'bg-rose-50 border border-rose-300 rounded-xl p-2.5';
        el.className = 'text-xs text-rose-900 mt-0.5 font-bold leading-relaxed';
      } else {
        box.className = 'bg-amber-50 border border-amber-300 rounded-xl p-2.5';
        el.className = 'text-xs text-amber-950 mt-0.5 font-medium leading-relaxed';
      }
    }

    function updateMouseSvgHighlight(type) {
      const left = document.getElementById('svgLBtn');
      const right = document.getElementById('svgRBtn');
      const wheel = document.getElementById('svgWheelBtn');
      left.setAttribute('fill', '#334155');
      right.setAttribute('fill', '#334155');
      wheel.setAttribute('fill', '#94a3b8');

      if (type === 'left' || type === 'double') {
        left.setAttribute('fill', '#10b981');
      } else if (type === 'right') {
        right.setAttribute('fill', '#f59e0b');
      } else if (type === 'wheel') {
        left.setAttribute('fill', '#10b981');
        wheel.setAttribute('fill', '#38bdf8');
      } else {
        left.setAttribute('fill', '#0284c7');
        right.setAttribute('fill', '#0284c7');
      }
    }

    function refreshAllHeaders() {
      // Scores
      document.getElementById('lblTopScore1').textContent = getStudentTotalScore(1);
      document.getElementById('lblTopScore2').textContent = getStudentTotalScore(2);

      const b1 = document.getElementById('btnTopStudent1');
      const b2 = document.getElementById('btnTopStudent2');
      if (activeStudent === 1) {
        b1.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition bg-amber-400 text-sky-950 shadow';
        b2.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition text-sky-200 hover:bg-sky-800';
      } else {
        b2.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition bg-amber-400 text-sky-950 shadow';
        b1.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition text-sky-200 hover:bg-sky-800';
      }

      const curName = students[activeStudent].name;
      document.getElementById('lblActiveStudentName').textContent = curName;
      document.getElementById('lblBottomName').textContent = curName;
      document.getElementById('lblBottomTotal').textContent = getStudentTotalScore(activeStudent) + ' / 100đ';

      // Level badges
      const sc = students[activeStudent].scores;
      for (let i = 1; i <= 5; i++) {
        const badge = document.getElementById('badgeM' + i);
        if (badge) {
          badge.textContent = sc[i] + '/20đ';
          badge.className = sc[i] >= 20
            ? 'px-1.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold'
            : (sc[i] > 0 ? 'px-1.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold' : 'px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px]');
        }
      }

      // Active level tab
      document.querySelectorAll('.mlevel-tab').forEach(btn => {
        const lv = parseInt(btn.getAttribute('data-mlevel'), 10);
        if (lv === mouseLevel) {
          btn.className = 'mlevel-tab p-2.5 rounded-xl text-left border-2 border-sky-600 bg-sky-50 shadow-sm transition';
        } else {
          btn.className = 'mlevel-tab p-2.5 rounded-xl text-left border-2 border-slate-200 bg-white hover:border-sky-300 transition';
        }
      });

      const m = MOUSE_LEVELS[mouseLevel];
      document.getElementById('lblGuideTitle').textContent = m.title;
      document.getElementById('lblStageHeader').textContent = m.header;
      document.getElementById('lblGuideInstruction').textContent = m.instruction;
      document.getElementById('lblSvgCaption').textContent = m.caption;
      updateMouseSvgHighlight(m.highlight);
    }

    function addMouseScore(lv, pts) {
      const cur = students[activeStudent].scores[lv];
      students[activeStudent].scores[lv] = Math.min(20, cur + pts);
      refreshAllHeaders();
    }

    // =========================================================================
    // LEVEL IMPLEMENTATIONS (1 TO 5)
    // =========================================================================
    function loadMouseLevel(lv) {
      mouseLevel = lv;
      mouseProgress = 0;
      const m = MOUSE_LEVELS[lv];
      setLiveTip(m.tip, false);
      refreshAllHeaders();

      if (lv === 1) renderMLevel1();
      else if (lv === 2) renderMLevel2();
      else if (lv === 3) renderMLevel3();
      else if (lv === 4) renderMLevel4();
      else if (lv === 5) renderMLevel5();
    }

    function showLevelWinBanner(title, nextLv) {
      playSound('level');
      const stage = document.getElementById('mPlayground');
      stage.innerHTML = `
        <div class="bg-white rounded-2xl p-6 shadow-md border-2 border-emerald-500 max-w-sm w-full text-center pop-in">
          <div class="text-4xl mb-2">🎉</div>
          <h3 class="text-base font-extrabold text-emerald-800">${title}</h3>
          <p class="text-xs text-slate-600 mt-1">Em đã ghi trọn <strong>20/20 điểm</strong> ở bài này!</p>
          <div class="mt-4 flex justify-center gap-2">
            <button id="btnReplayM" class="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-xs font-bold text-slate-800">Làm lại</button>
            ${nextLv <= 5 ? `
              <button id="btnNextM" class="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-extrabold text-white shadow">Sang Bài ${nextLv} ➔</button>
            ` : `
              <button id="btnScoreboardM" class="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-extrabold text-sky-950 shadow">🏆 Xem Bảng Điểm 100đ</button>
            `}
          </div>
        </div>
      `;
      const rep = document.getElementById('btnReplayM');
      if (rep) rep.addEventListener('click', () => loadMouseLevel(mouseLevel));
      const nxt = document.getElementById('btnNextM');
      if (nxt) nxt.addEventListener('click', () => loadMouseLevel(nextLv));
      const scb = document.getElementById('btnScoreboardM');
      if (scb) scb.addEventListener('click', openScoreboard);
    }

    // Level 1: Hover ball
    function renderMLevel1() {
      const stage = document.getElementById('mPlayground');
      document.getElementById('lblStepProgress').textContent = `${mouseProgress} / 10`;
      stage.innerHTML = `
        <div id="mArena1" class="relative w-full h-72 sm:h-80 bg-gradient-to-br from-sky-50 to-emerald-50 rounded-xl border-2 border-dashed border-sky-300 overflow-hidden">
          <div class="absolute top-2.5 left-2.5 bg-white/90 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 shadow-sm">
            🎯 Đưa mũi tên chạm vào quả bóng xanh (Không cần bấm): <span id="lblM1Count" class="text-emerald-700 font-extrabold">${mouseProgress}/10</span>
          </div>
          <div id="mBall1" class="pulse-ring absolute w-16 h-16 rounded-full bg-emerald-500 text-white font-extrabold flex flex-col items-center justify-center shadow-lg cursor-pointer select-none transition-all duration-150" style="top: 40%; left: 42%;">
            <span class="text-lg">🖱️</span>
            <span class="text-[9px]">Chạm!</span>
          </div>
        </div>
      `;
      const arena = document.getElementById('mArena1');
      const ball = document.getElementById('mBall1');

      function jump() {
        const rect = arena.getBoundingClientRect();
        const maxX = Math.max(15, rect.width - 80);
        const maxY = Math.max(45, rect.height - 80);
        ball.style.left = Math.floor(15 + Math.random() * (maxX - 15)) + 'px';
        ball.style.top = Math.floor(45 + Math.random() * (maxY - 45)) + 'px';
      }

      ball.addEventListener('mouseenter', () => {
        mouseProgress++;
        playSound('success');
        addMouseScore(1, 2);
        document.getElementById('lblStepProgress').textContent = `${mouseProgress} / 10`;
        const c = document.getElementById('lblM1Count');
        if (c) c.textContent = `${mouseProgress}/10`;
        setLiveTip(`Khéo lắm! Em đã di chuột chạm trúng ${mouseProgress}/10 quả bóng.`, false);

        if (mouseProgress >= 10) {
          students[activeStudent].scores[1] = 20;
          refreshAllHeaders();
          showLevelWinBanner('Bài 1 Hoàn Thành: Di Chuột Mượt Mà!', 2);
        } else {
          jump();
        }
      });
    }

    // Level 2: Left Click Button
    function renderMLevel2() {
      const stage = document.getElementById('mPlayground');
      document.getElementById('lblStepProgress').textContent = `${mouseProgress} / 10`;
      stage.innerHTML = `
        <div id="mArena2" class="relative w-full h-72 sm:h-80 bg-gradient-to-br from-slate-50 to-sky-50 rounded-xl border-2 border-dashed border-sky-300 overflow-hidden">
          <div class="absolute top-2.5 left-2.5 bg-white/90 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 shadow-sm">
            👆 Dùng NGÓN TRỎ bấm chuột TRÁI 1 cái vào nút xanh: <span id="lblM2Count" class="text-sky-700 font-extrabold">${mouseProgress}/10</span>
          </div>
          <button id="mBtnClick2" type="button" class="pulse-ring absolute px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold shadow-lg flex flex-col items-center justify-center transition-all" style="top: 42%; left: 38%;">
            <span class="text-xs">BẤM CHUỘT TRÁI</span>
            <span class="text-[10px] text-sky-100">(Ngón trỏ 1 cái)</span>
          </button>
        </div>
      `;
      const arena = document.getElementById('mArena2');
      const btn = document.getElementById('mBtnClick2');

      arena.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        playSound('warn');
        setLiveTip('⚠️ Em vừa bấm nhầm nút CHUỘT PHẢI (ngón giữa)! Hãy dùng NGÓN TRỎ bấm nút bên TRÁI nhé.', true);
      });

      function jumpBtn() {
        const rect = arena.getBoundingClientRect();
        const maxX = Math.max(15, rect.width - 150);
        const maxY = Math.max(45, rect.height - 75);
        btn.style.left = Math.floor(15 + Math.random() * (maxX - 15)) + 'px';
        btn.style.top = Math.floor(45 + Math.random() * (maxY - 45)) + 'px';
      }

      btn.addEventListener('click', () => {
        mouseProgress++;
        playSound('success');
        addMouseScore(2, 2);
        document.getElementById('lblStepProgress').textContent = `${mouseProgress} / 10`;
        const c = document.getElementById('lblM2Count');
        if (c) c.textContent = `${mouseProgress}/10`;
        setLiveTip(`Chính xác! Ngón trỏ bấm chuột trái rất tốt (${mouseProgress}/10).`, false);

        if (mouseProgress >= 10) {
          students[activeStudent].scores[2] = 20;
          refreshAllHeaders();
          showLevelWinBanner('Bài 2 Hoàn Thành: Bấm Chuột Trái Rất Chuẩn!', 3);
        } else {
          jumpBtn();
        }
      });
    }

    // Level 3: Double click 5 folders
    function renderMLevel3() {
      const stage = document.getElementById('mPlayground');
      const fList = [
        { id: 'f1', name: 'This PC' },
        { id: 'f2', name: 'Ổ đĩa (D:)' },
        { id: 'f3', name: 'THUD_NGUYENVANA' },
        { id: 'f4', name: 'WORD' },
        { id: 'f5', name: 'EXCEL' }
      ];
      let opened = 0;
      document.getElementById('lblStepProgress').textContent = `0 / 5 cặp`;

      stage.innerHTML = `
        <div class="w-full h-full flex flex-col justify-between p-1">
          <div class="bg-sky-50 border border-sky-200 rounded-xl p-2.5 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-1">
            <span>📂 <strong>Nhiệm vụ:</strong> Bấm nhanh 2 cái (tách-tách) bằng ngón trỏ để mở <strong>5 biểu tượng</strong> bên dưới:</span>
            <span class="text-sky-800 font-bold">💡 Hoặc bấm chuột trái 1 cái rồi nhấn phím <strong>Enter</strong>!</span>
          </div>

          <div class="my-3 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            ${fList.map(item => `
              <div data-fid="${item.id}" tabindex="0" class="f-card cursor-pointer rounded-2xl border-2 border-slate-200 bg-white hover:border-sky-400 p-3 flex flex-col items-center justify-center text-center transition focus:outline-none focus:ring-2 focus:ring-sky-500">
                <div class="text-3xl mb-1 f-icon">📁</div>
                <div class="text-xs font-bold text-slate-800 break-all">${item.name}</div>
                <div class="text-[10px] text-slate-500 mt-0.5 f-st">Chưa mở</div>
              </div>
            `).join('')}
          </div>

          <div class="text-center text-[11px] text-slate-500">
            Giữ yên con chuột khi nháy đúp, chỉ cử động ngón trỏ bấm 2 nhịp nhanh.
          </div>
        </div>
      `;

      function openCard(card) {
        if (card.getAttribute('data-opened') === 'true') return;
        card.setAttribute('data-opened', 'true');
        card.className = 'f-card rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-3 flex flex-col items-center justify-center text-center transition pop-in';
        card.querySelector('.f-icon').textContent = '📂';
        const st = card.querySelector('.f-st');
        st.textContent = '✅ Đã mở!';
        st.className = 'text-[10px] font-bold text-emerald-700 mt-0.5';

        opened++;
        playSound('success');
        addMouseScore(3, 4);
        document.getElementById('lblStepProgress').textContent = `${opened} / 5 cặp`;
        setLiveTip(`Giỏi lắm! Đã mở thành công thư mục (${opened}/5).`, false);

        if (opened >= 5) {
          students[activeStudent].scores[3] = 20;
          refreshAllHeaders();
          setTimeout(() => showLevelWinBanner('Bài 3 Hoàn Thành: Nháy Đúp Mở Thư Mục!', 4), 300);
        }
      }

      document.querySelectorAll('.f-card').forEach(card => {
        card.addEventListener('click', () => {
          card.focus();
          const now = Date.now();
          const diff = now - lastSingleClick;
          lastSingleClick = now;
          if (card.getAttribute('data-opened') === 'true') return;

          if (diff > 300 && diff < 900) {
            playSound('warn');
            setLiveTip('⏱️ Em bấm 2 cái chậm quá nên cặp vàng chưa mở! Hãy bấm nhanh hơn, hoặc nhấn phím Enter ngay!', true);
          } else {
            setLiveTip('Đã chọn cặp vàng! Hãy bấm nhanh 2 cái liên tiếp ("tách-tách") hoặc nhấn phím Enter để mở.', false);
          }
        });

        card.addEventListener('dblclick', () => openCard(card));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') openCard(card);
        });
      });
    }

    // Level 4: Right click Rename
    function renderMLevel4() {
      const stage = document.getElementById('mPlayground');
      let count = 0;
      document.getElementById('lblStepProgress').textContent = `0 / 4 mục`;
      const list = [
        { id: 'r1', oldN: 'New folder (1)', newN: 'THUD_NGUYENVANA' },
        { id: 'r2', oldN: 'New folder (2)', newN: 'BUOI_1' },
        { id: 'r3', oldN: 'New folder (3)', newN: 'WORD' },
        { id: 'r4', oldN: 'New folder (4)', newN: 'EXCEL' }
      ];

      stage.innerHTML = `
        <div id="mArea4" class="relative w-full h-full flex flex-col justify-between p-1">
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-xs text-slate-800">
            👉 Đưa mũi tên vào từng cặp vàng ➔ <strong>NGÓN GIỮA bấm CHUỘT PHẢI</strong> ➔ <strong>NGÓN TRỎ bấm chuột TRÁI chọn "Rename"</strong>.
          </div>

          <div class="my-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            ${list.map(it => `
              <div data-target="${it.newN}" class="rc-item cursor-pointer rounded-2xl border-2 border-slate-300 bg-white hover:border-amber-500 p-3 flex flex-col items-center text-center transition">
                <div class="text-3xl mb-1">📁</div>
                <div class="text-xs font-bold text-rose-700 rc-lbl break-all">${it.oldN}</div>
                <div class="text-[10px] text-slate-500 mt-1 rc-sub">Bấm chuột PHẢI</div>
              </div>
            `).join('')}
          </div>

          <!-- Context Menu -->
          <div id="mContextMenu" class="hidden fixed bg-white border border-slate-300 rounded-xl shadow-2xl py-1 w-48 z-50 text-xs">
            <div class="px-3 py-1 text-slate-400 border-b border-slate-100">Open (Mở)</div>
            <button id="mCtxDelete" type="button" class="w-full text-left px-3 py-1.5 hover:bg-rose-50 text-rose-700 font-semibold">
              🗑️ Delete (Xóa nháp)
            </button>
            <button id="mCtxRename" type="button" class="w-full text-left px-3 py-1.5 bg-sky-50 hover:bg-sky-600 hover:text-white text-sky-950 font-extrabold flex items-center justify-between">
              <span>✏️ Rename (Đổi tên)</span>
              <span>👈 Bấm trái</span>
            </button>
          </div>

          <div class="text-center text-[11px] text-slate-500">
            Ngón giữa mở bảng, ngón trỏ chọn lệnh Rename.
          </div>
        </div>
      `;

      const menu = document.getElementById('mContextMenu');
      let targetCard = null;

      document.querySelectorAll('.rc-item').forEach(card => {
        card.addEventListener('click', () => {
          if (card.getAttribute('data-done') === 'true') return;
          playSound('warn');
          setLiveTip('⚠️ Đó là chuột TRÁI (ngón trỏ)! Hãy dùng NGÓN GIỮA bấm nút chuột BÊN PHẢI để mở menu nhé.', true);
        });

        card.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          if (card.getAttribute('data-done') === 'true') return;
          targetCard = card;
          playSound('success');
          menu.style.left = Math.min(e.clientX, window.innerWidth - 200) + 'px';
          menu.style.top = Math.min(e.clientY, window.innerHeight - 150) + 'px';
          menu.classList.remove('hidden');
          setLiveTip('Bảng menu đã hiện ra! Bây giờ dùng NGÓN TRỎ bấm chuột TRÁI vào dòng "Rename (Đổi tên)".', false);
        });
      });

      document.getElementById('mCtxRename').addEventListener('click', () => {
        menu.classList.add('hidden');
        if (!targetCard || targetCard.getAttribute('data-done') === 'true') return;

        const newName = targetCard.getAttribute('data-target');
        targetCard.setAttribute('data-done', 'true');
        targetCard.className = 'rc-item rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-3 flex flex-col items-center text-center transition pop-in';
        const lbl = targetCard.querySelector('.rc-lbl');
        lbl.textContent = newName;
        lbl.className = 'text-xs font-extrabold text-emerald-800 rc-lbl break-all';
        targetCard.querySelector('.rc-sub').textContent = '✅ Đã đổi tên!';

        count++;
        playSound('success');
        addMouseScore(4, 5);
        document.getElementById('lblStepProgress').textContent = `${count} / 4 mục`;
        setLiveTip(`Đổi tên thành công sang "${newName}" (${count}/4).`, false);

        if (count >= 4) {
          students[activeStudent].scores[4] = 20;
          refreshAllHeaders();
          setTimeout(() => showLevelWinBanner('Bài 4 Hoàn Thành: Chuột Phải Rename Xuất Sắc!', 5), 300);
        }
      });

      document.getElementById('mCtxDelete').addEventListener('click', () => {
        menu.classList.add('hidden');
        playSound('warn');
        setLiveTip('⚠️ Bấm nhầm Delete rồi! Hãy bấm chuột phải lại và chọn dòng "Rename" nhé.', true);
      });

      if (window._mCtxDocClickHandler) {
        document.removeEventListener('click', window._mCtxDocClickHandler);
      }
      window._mCtxDocClickHandler = (e) => {
        if (menu && !menu.contains(e.target)) menu.classList.add('hidden');
      };
      document.addEventListener('click', window._mCtxDocClickHandler);
    }

    // Level 5: Drag & Drop files + Scroll Wheel
    function renderMLevel5() {
      const stage = document.getElementById('mPlayground');
      let filesSaved = 0;
      let scrolled = false;
      document.getElementById('lblStepProgress').textContent = `0 / 4 việc`;

      stage.innerHTML = `
        <div class="w-full h-full flex flex-col justify-between gap-2.5 p-1">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-stretch">
            <!-- Files list -->
            <div class="md:col-span-5 bg-white border border-slate-200 rounded-xl p-2.5 flex flex-col justify-between">
              <div class="text-xs font-extrabold text-slate-800 mb-1.5">1️⃣ Ấn giữ chuột trái kéo 3 bài tập này:</div>
              <div class="space-y-1.5">
                <div draggable="true" data-fid="1" class="d-item cursor-grab px-2.5 py-1.5 rounded-lg bg-sky-50 border-2 border-sky-300 text-xs font-bold text-sky-950 flex items-center justify-between">
                  <span>📄 Don_Xin_Nghi_Hoc.docx</span>
                  <span class="text-[9px] bg-sky-200 px-1.5 py-0.5 rounded">Kéo đi ➔</span>
                </div>
                <div draggable="true" data-fid="2" class="d-item cursor-grab px-2.5 py-1.5 rounded-lg bg-sky-50 border-2 border-sky-300 text-xs font-bold text-sky-950 flex items-center justify-between">
                  <span>📊 Bang_Tinh_Luong.xlsx</span>
                  <span class="text-[9px] bg-sky-200 px-1.5 py-0.5 rounded">Kéo đi ➔</span>
                </div>
                <div draggable="true" data-fid="3" class="d-item cursor-grab px-2.5 py-1.5 rounded-lg bg-sky-50 border-2 border-sky-300 text-xs font-bold text-sky-950 flex items-center justify-between">
                  <span>📝 ThongTin_CaNhan.txt</span>
                  <span class="text-[9px] bg-sky-200 px-1.5 py-0.5 rounded">Kéo đi ➔</span>
                </div>
              </div>
              <div class="text-[10px] text-slate-500 mt-1">Bấm chọn bài rồi bấm vào khung Ổ D:\ cũng được!</div>
            </div>

            <!-- Drop zones -->
            <div class="md:col-span-7 grid grid-cols-2 gap-2">
              <div id="dropBoxC" class="rounded-xl border-2 border-dashed border-rose-300 bg-rose-50/70 p-2.5 flex flex-col items-center justify-center text-center">
                <div class="text-2xl">⚠️</div>
                <div class="text-xs font-extrabold text-rose-800">Ổ ĐĨA (C:)</div>
                <div class="text-[10px] text-rose-700">Cấm lưu! Tắt máy là mất sạch bài.</div>
              </div>

              <div id="dropBoxD" class="rounded-xl border-2 border-dashed border-emerald-500 bg-emerald-50/70 hover:bg-emerald-100/70 p-2.5 flex flex-col items-center justify-center text-center cursor-pointer transition">
                <div class="text-2xl">💿</div>
                <div class="text-xs font-extrabold text-emerald-900">Ổ ĐĨA (D:) - AN TOÀN</div>
                <div id="lblDropDCount" class="text-[10px] text-emerald-800 font-bold">Thả 3 bài vào đây (0/3)</div>
                <div id="droppedBadges" class="mt-1 flex flex-wrap gap-1 justify-center"></div>
              </div>
            </div>
          </div>

          <!-- Scroll Box -->
          <div class="bg-white border border-slate-200 rounded-xl p-2.5">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-extrabold text-slate-800">2️⃣ LĂN CON LĂN Ở GIỮA CHUỘT xuống dưới đọc nội quy và bấm Xác nhận:</span>
              <span id="lblScrollSt" class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">Chưa cuộn</span>
            </div>
            <div id="mScrollArea" class="h-20 overflow-y-auto bg-slate-50 border border-slate-300 rounded p-2 text-xs space-y-1 text-slate-700">
              <p><strong>Nội quy phòng thực hành Tin học 9+3:</strong></p>
              <p>• Luôn cất bài tập vào thư mục mang tên mình trong <strong>Ổ đĩa (D:)</strong>.</p>
              <p>• Không tự ý rút dây chuột, bàn phím hay ấn đè nút nguồn tắt máy.</p>
              <p>• Cuối giờ: Lưu bài, bấm <strong>Start ➔ Power ➔ Shut down</strong> rồi xếp gọn ghế.</p>
              <div class="pt-1 text-center">
                <button id="btnConfirmWheel" type="button" class="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow">
                  ✅ Tôi đã lăn chuột tới đáy! (Bấm vào đây)
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      let selectedItem = null;

      function checkAllLvl5() {
        const total = filesSaved + (scrolled ? 1 : 0);
        document.getElementById('lblStepProgress').textContent = `${total} / 4 việc`;
        if (filesSaved >= 3 && scrolled) {
          students[activeStudent].scores[5] = 20;
          refreshAllHeaders();
          setTimeout(() => showLevelWinBanner('Xuất sắc! Em Đã Đạt Điểm Tuyệt Đối Cả 5 Bài Chuột!', 6), 300);
        }
      }

      function saveFileToD(item) {
        if (!item || item.getAttribute('data-saved') === 'true') return;
        item.setAttribute('data-saved', 'true');
        item.classList.add('hidden');
        filesSaved++;
        playSound('success');
        addMouseScore(5, 5);
        document.getElementById('lblDropDCount').textContent = `Đã cất an toàn: ${filesSaved}/3 bài`;
        const bWrap = document.getElementById('droppedBadges');
        const span = document.createElement('span');
        span.className = 'px-1.5 py-0.2 rounded bg-emerald-600 text-white text-[9px] font-bold';
        span.textContent = '✓ Bài ' + filesSaved;
        bWrap.appendChild(span);
        setLiveTip(`Đã cất bài tập số ${filesSaved} vào Ổ đĩa (D:) an toàn!`, false);
        checkAllLvl5();
      }

      document.querySelectorAll('.d-item').forEach(item => {
        item.addEventListener('dragstart', (e) => {
          selectedItem = item;
          e.dataTransfer.setData('text/plain', item.getAttribute('data-fid'));
        });
        item.addEventListener('click', () => {
          selectedItem = item;
          document.querySelectorAll('.d-item').forEach(el => el.classList.remove('ring-2', 'ring-amber-500'));
          item.classList.add('ring-2', 'ring-amber-500');
          setLiveTip('Đã chọn bài! Bây giờ bấm vào khung "Ổ ĐĨA (D:)" màu xanh lá để cất bài.', false);
        });
      });

      const dropC = document.getElementById('dropBoxC');
      const dropD = document.getElementById('dropBoxD');

      dropC.addEventListener('dragover', (e) => e.preventDefault());
      dropC.addEventListener('drop', (e) => {
        e.preventDefault();
        playSound('warn');
        setLiveTip('❌ SAI RỒI! Lưu vào Ổ C:\\ hôm sau bị xóa sạch bài! Hãy kéo sang Ổ ĐĨA (D:) nhé!', true);
      });
      dropC.addEventListener('click', () => {
        playSound('warn');
        setLiveTip('❌ Cấm lưu vào Ổ đĩa (C:)! Hãy chọn Ổ ĐĨA (D:) bên phải.', true);
      });

      dropD.addEventListener('dragover', (e) => e.preventDefault());
      dropD.addEventListener('drop', (e) => {
        e.preventDefault();
        if (selectedItem) saveFileToD(selectedItem);
      });
      dropD.addEventListener('click', () => {
        if (selectedItem) saveFileToD(selectedItem);
      });

      document.getElementById('btnConfirmWheel').addEventListener('click', () => {
        if (scrolled) return;
        scrolled = true;
        playSound('success');
        addMouseScore(5, 5);
        const st = document.getElementById('lblScrollSt');
        st.textContent = '✅ Đã cuộn';
        st.className = 'text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white';
        const b = document.getElementById('btnConfirmWheel');
        b.textContent = '✅ Đã cuộn xong!';
        b.className = 'px-3 py-1 rounded-lg bg-slate-400 text-white font-bold text-xs cursor-default';
        setLiveTip('Tuyệt vời! Em đã biết dùng con lăn cuộn xem hết trang.', false);
        checkAllLvl5();
      });
    }

    // =========================================================================
    // SCOREBOARD MODAL & EDIT NAMES
    // =========================================================================
    function openScoreboard() {
      const wrap = document.getElementById('scoreboardCardsWrap');
      wrap.innerHTML = [1, 2].map(id => {
        const s = students[id];
        const totMouse = getStudentTotalScore(id);
        const totTelex = getStudentTelexScore(id);
        const grade10 = getStudentOverall10(id);
        return `
          <div class="rounded-xl border-2 ${totMouse >= 80 || totTelex >= 80 ? 'border-emerald-500 bg-emerald-50/40' : 'border-slate-200 bg-slate-50'} p-3.5">
            <div class="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <div class="text-xs font-extrabold text-sky-950">👤 ${escapeHtml(s.name)}</div>
                <div class="text-[10px] text-slate-500 font-semibold">${escapeHtml(currentClassName)} • ${escapeHtml(currentStationName)} • ${escapeHtml(currentSessionName)}</div>
              </div>
              <span class="px-2.5 py-1 rounded-xl text-xs font-black bg-emerald-600 text-white">
                ${grade10} / 10đ
              </span>
            </div>
            <ul class="mt-2.5 space-y-1 text-xs text-slate-700">
              <li class="flex justify-between font-bold text-sky-900"><span>🖱️ Điểm Cầm Chuột (Buổi 1):</span> <span>${totMouse}/100đ</span></li>
              <li class="flex justify-between pl-2 text-[11px] text-slate-600"><span>Di (${s.scores[1]}) • Trái (${s.scores[2]}) • Đúp (${s.scores[3]}) • Phải (${s.scores[4]}) • Kéo (${s.scores[5]})</span></li>
              <li class="flex justify-between font-bold text-teal-900 pt-1"><span>⌨️ Điểm Gõ Telex (Buổi 2):</span> <span>${totTelex}/100đ</span></li>
              <li class="flex justify-between font-bold text-purple-900 pt-1"><span>🌐 Thực hành Chương 2–6:</span> <span>${getStudentChAvg(id)}/100đ</span></li>
            </ul>
          </div>
        `;
      }).join('');
      const toast = document.getElementById('submitCloudToast');
      if (toast) toast.classList.add('hidden');
      const modal = document.getElementById('modalScoreboard');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeScoreboard() {
      const modal = document.getElementById('modalScoreboard');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
