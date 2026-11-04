// ============================================================================
// BO MAY DIEU KHIEN CHINH, MOUSE TRAINER, TELEX & BANG DIEM (js/app.js)
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

    // App state (Expanded with Telex Score, Chapter 2-6 Sim Scores, Class, Station & Session)
    let currentClassName = 'Điện công nghiệp 9+3';
    let currentStationName = 'Máy 01';
    let currentSessionName = 'Buổi 1 (Ch.1)';
    const students = {
      1: {
        name: 'Em số 1 (Bên phải)',
        scores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        telexSteps: [0, 0, 0, 0, 0],
        chScores: { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
      },
      2: {
        name: 'Em số 2 (Bên trái)',
        scores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        telexSteps: [0, 0, 0, 0, 0],
        chScores: { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
      }
    };
    let activeStudent = 1;
    let currentTelexStep = 0;

    const TELEX_CHALLENGES = (window.COURSE_CONFIG && window.COURSE_CONFIG.telexChallenges) ? window.COURSE_CONFIG.telexChallenges : [
      {
        title: 'CÂU 1/5: GÕ TÊN TRƯỜNG (20 điểm)',
        target: 'Trường Cao đẳng Buôn Ma Thuột',
        hint: '💡 Gợi ý phím Telex: T-r-u-w-o-w-n-g-f  C-a-o  d-d-a-w-n-g-r  B-u-o-o-n  M-a  T-h-u-o-o-t-j'
      },
      {
        title: 'CÂU 2/5: GÕ TÊN KHOA & HỆ ĐÀO TẠO (20 điểm)',
        target: 'Khoa Công nghệ thông tin hệ trung cấp',
        hint: '💡 Gợi ý phím Telex: K-h-o-a  C-o-o-n-g  n-g-h-e-e-j  t-h-o-o-n-g  t-i-n  h-e-e-j  t-r-u-n-g  c-a-a-p-s'
      },
      {
        title: 'CÂU 3/5: GÕ TÊN NGHỀ HỌC (20 điểm)',
        target: 'Học nghề Điện công nghiệp và Sửa chữa ô tô',
        hint: '💡 Gợi ý phím Telex: H-o-c-j  n-g-h-e-e-f  D-d-i-e-e-n-j  c-o-o-n-g  n-g-h-i-e-e-p-j  v-a-f  S-u-w-a-r  c-h-u-w-a-x  o-o  t-o-o'
      },
      {
        title: 'CÂU 4/5: GÕ ĐỊA CHỈ QUÊ QUÁN ĐẮK LẮK (20 điểm)',
        target: 'Quê quán tại tỉnh Đắk Lắk Tây Nguyên',
        hint: '💡 Gợi ý phím Telex: Q-u-e-e  q-u-a-n-s  t-a-i-j  t-i-n-h-r  D-d-a-w-s-k  L-a-w-s-k  T-a-a-y  N-g-u-y-e-e-n'
      },
      {
        title: 'CÂU 5/5: GÕ QUY TẮC LƯU BÀI PHÒNG MÁY (20 điểm)',
        target: 'Em luôn lưu bài tập vào ổ đĩa D an toàn',
        hint: '💡 Gợi ý phím Telex: E-m  l-u-o-o-n  l-u-w-u  b-a-i-f  t-a-a-p-j  v-a-o-f  o-o-r  d-d-i-a-x  D  a-n  t-o-a-n-f'
      }
    ];

    function getStudentTelexScore(id) {
      return students[id].telexSteps.reduce((a, b) => a + b, 0);
    }

    function getStudentChAvg(id) {
      const c = students[id].chScores;
      return Math.round((c[2] + c[3] + c[4] + c[5] + c[6]) / 5);
    }

    function getStudentOverall10(id) {
      const m = getStudentTotalScore(id);
      const t = getStudentTelexScore(id);
      const best = Math.max(m, t, Math.round((m + t) / 2));
      return (best / 10).toFixed(1);
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
        { id: 'f3', name: 'DIEN_NGUYENVANA' },
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
        { id: 'r1', oldN: 'New folder (1)', newN: 'DIEN_NGUYENVANA' },
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

      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target)) menu.classList.add('hidden');
      });
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

    // =========================================================================
    // TELEX INPUT ANALYZER
    // =========================================================================
    function analyzeTelexText(val) {
      const text = val.trim();
      const words = text ? text.split(/\s+/) : [];
      document.getElementById('telexWordCount').textContent = `${words.length} từ`;

      // Vietnamese tone mark pattern
      const vietnameseRegex = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/gi;
      const matches = text.match(vietnameseRegex) || [];
      document.getElementById('telexMarkCount').textContent = `${matches.length} chữ có dấu`;

      const st = document.getElementById('telexStatusText');
      if (!text) {
        st.textContent = 'Chưa nhập văn bản. Hãy gõ vài từ có dấu để máy phân tích!';
        st.className = 'font-bold text-slate-700';
        return;
      }

      // Detect unikey error patterns like "truowngf", "ddawsk"
      const telexRawError = /\b\w*(?:aa|aw|ee|oo|ow|uw|dd|[a-z][sfrxj])\b/i;
      if (telexRawError.test(text) && matches.length === 0) {
        st.textContent = '⚠️ CẢNH BÁO: Chữ đang bị rơi phím dấu (ví dụ: hocj, ddawsk)! Máy tính chưa bật chữ V màu đỏ của Unikey!';
        st.className = 'font-bold text-rose-700';
      } else if (matches.length > 0) {
        st.textContent = '✅ TỐT LẮM: Máy tính đã gõ được tiếng Việt có dấu chuẩn xác (Bộ gõ Unikey hoạt động tốt)!';
        st.className = 'font-bold text-emerald-800';
      } else {
        st.textContent = 'Đang gõ chữ không dấu. Em hãy thử gõ từ có dấu (như: học nghề, Buôn Ma Thuột).';
        st.className = 'font-bold text-slate-700';
      }
    }

    // =========================================================================
    // TELEX 5-SENTENCE CHALLENGE LOGIC (100 POINTS)
    // =========================================================================
    function renderTelexChallengeStep(stepIdx) {
      currentTelexStep = stepIdx;
      const item = TELEX_CHALLENGES[stepIdx];
      document.getElementById('lblTelexStepTitle').textContent = item.title;
      document.getElementById('lblTelexTargetSentence').textContent = item.target;
      document.getElementById('lblTelexKeyHint').textContent = item.hint;
      document.getElementById('lblTelexGameScore').textContent = getStudentTelexScore(activeStudent);

      const input = document.getElementById('inputTelexChallenge');
      input.value = '';
      input.focus();

      document.querySelectorAll('.tstep-btn').forEach(btn => {
        const idx = parseInt(btn.getAttribute('data-tstep'), 10);
        const done = students[activeStudent].telexSteps[idx] >= 20;
        if (idx === stepIdx) {
          btn.className = 'tstep-btn py-1.5 px-2 rounded-lg bg-amber-400 text-sky-950 font-black text-center truncate shadow';
          btn.textContent = (done ? '✓ ' : '') + `Câu ${idx + 1} (20đ)`;
        } else if (done) {
          btn.className = 'tstep-btn py-1.5 px-2 rounded-lg bg-emerald-600 text-white font-bold text-center truncate';
          btn.textContent = `✓ Câu ${idx + 1} (20đ)`;
        } else {
          btn.className = 'tstep-btn py-1.5 px-2 rounded-lg bg-sky-800 text-sky-200 font-bold text-center truncate hover:bg-sky-700';
          btn.textContent = `Câu ${idx + 1} (20đ)`;
        }
      });
    }

    function checkTelexChallengeInput() {
      const item = TELEX_CHALLENGES[currentTelexStep];
      const val = document.getElementById('inputTelexChallenge').value.trim().replace(/\s+/g, ' ');
      const target = item.target.trim().replace(/\s+/g, ' ');
      const fb = document.getElementById('lblTelexChallengeFeedback');

      if (!val) {
        playSound('warn');
        fb.textContent = '⚠️ Em hãy gõ câu mẫu vào ô trống rồi mới bấm Kiểm tra nhé!';
        fb.className = 'text-xs font-extrabold text-rose-600';
        return;
      }

      if (val.toLowerCase() === target.toLowerCase()) {
        playSound('level');
        students[activeStudent].telexSteps[currentTelexStep] = 20;
        document.getElementById('lblTelexGameScore').textContent = getStudentTelexScore(activeStudent);
        refreshAllHeaders();
        saveLocalProgress();

        if (currentTelexStep < 4) {
          fb.textContent = `🎉 Chính xác 100%! Em được +20 điểm. Chuyển sang Câu ${currentTelexStep + 2}/5!`;
          fb.className = 'text-xs font-extrabold text-emerald-700';
          setTimeout(() => renderTelexChallengeStep(currentTelexStep + 1), 600);
        } else {
          fb.textContent = '🏆 XUẤT SẮC! Em đã hoàn thành đủ 5/5 câu tiếng Việt Telex (100/100 điểm)! Hãy bấm "📤 Nộp Điểm Cho Thầy" ở góc trên nhé!';
          fb.className = 'text-xs font-extrabold text-emerald-700';
          renderTelexChallengeStep(currentTelexStep);
        }
      } else {
        playSound('warn');
        // Check if missing Vietnamese accents
        const hasAccent = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(val);
        if (!hasAccent) {
          fb.textContent = '❌ Chữ em gõ chưa có dấu tiếng Việt! Hãy nhìn góc dưới bên phải màn hình, bật Unikey sang chữ V màu đỏ rồi gõ lại nhé.';
        } else {
          fb.textContent = `❌ Gần đúng rồi! Câu em gõ ("${val}") còn lệch vài chữ hoặc dấu so với câu mẫu ("${target}"). Hãy sửa lại nhé!`;
        }
        fb.className = 'text-xs font-extrabold text-rose-700';
      }
    }


    // =========================================================================
    // CLOUD + LOCAL STORAGE SCORE SUBMISSION & TEACHER DASHBOARD
    // =========================================================================
    const LOCAL_RECORDS_KEY = 'BMTC_93_CLASS_SCORES_V1';

    function getLocalRecords() {
      try {
        const raw = localStorage.getItem(LOCAL_RECORDS_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }

    function setLocalRecords(list) {
      try {
        localStorage.setItem(LOCAL_RECORDS_KEY, JSON.stringify(list));
      } catch (e) {}
    }

    function buildCurrentPairRecords() {
      const now = new Date();
      const dateKey = now.toLocaleDateString('vi-VN');
      const nowStr = now.toLocaleString('vi-VN', { hour12: false });
      return [1, 2].map(id => {
        const s = students[id];
        const mScore = getStudentTotalScore(id);
        const tScore = getStudentTelexScore(id);
        const chAvg = getStudentChAvg(id);
        const grade10 = parseFloat(getStudentOverall10(id));
        const safeClass = String(currentClassName || '').trim();
        const safeStation = String(currentStationName || '').trim();
        const safeSession = String(currentSessionName || '').trim();
        const safeName = String(s.name || '').trim();
        // Composite key prevents overwriting across different classes, sessions, or dates
        const recordId = `${dateKey}|${safeClass}|${safeSession}|${safeStation}|${safeName}`;
        return {
          recordId: recordId,
          dateOnly: dateKey,
          timestamp: nowStr,
          sessionName: safeSession,
          station: safeStation,
          studentName: safeName,
          className: safeClass,
          mouseScore: mScore,
          telexScore: tScore,
          chAvgScore: chAvg,
          grade10: grade10,
          status: grade10 >= 5.0 ? 'ĐẠT' : 'Cần luyện thêm'
        };
      });
    }

    function saveLocalProgress() {
      const pair = buildCurrentPairRecords();
      let list = getLocalRecords();
      for (const item of pair) {
        const idx = list.findIndex(r =>
          (r.recordId && r.recordId === item.recordId) ||
          (!r.recordId && r.studentName === item.studentName && r.station === item.station && r.className === item.className)
        );
        if (idx >= 0) list[idx] = item;
        else list.unshift(item);
      }
      setLocalRecords(list.slice(0, 2000));
    }

    function getTeacherAuthHeaders() {
      const tokInput = document.getElementById('inputTeacherToken');
      const token = tokInput ? tokInput.value.trim() : 'BMTC2026';
      return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (token || 'BMTC2026')
      };
    }

    async function submitScoresToCloud() {
      saveLocalProgress();
      const pair = buildCurrentPairRecords();
      const toast = document.getElementById('submitCloudToast');
      if (toast) {
        toast.textContent = '⏳ Đang gửi điểm của 2 bạn lên Bảng điểm Lớp học...';
        toast.className = 'mt-3 p-3 rounded-xl bg-sky-900 text-white text-xs font-bold text-center block';
      }

      let syncedCloud = false;
      try {
        const res = await fetch(location.origin + '/api/scores', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ records: pair })
        });
        if (res.ok) syncedCloud = true;
      } catch (e) {}

      playSound('level');
      if (toast) {
        toast.textContent = syncedCloud
          ? '✅ ĐÃ NỘP ĐIỂM LÊN MÁY CHỦ LỚP HỌC THÀNH CÔNG! Thầy/Cô đã nhận được điểm của 2 bạn.'
          : '✅ ĐÃ LƯU ĐIỂM VÀO BẢNG THỐNG KÊ TRÊN MÁY! (Mở tab "📊 Bảng Điểm Lớp Học" để xem và xuất Excel).';
        toast.className = 'mt-3 p-3 rounded-xl bg-emerald-700 text-white text-xs font-extrabold text-center block pop-in';
      }
    }

    async function loadAndRenderTeacherDashboard() {
      saveLocalProgress();
      let records = getLocalRecords();
      const badge = document.getElementById('lblCloudSyncBadge');

      try {
        const res = await fetch(location.origin + '/api/scores', {
          headers: getTeacherAuthHeaders()
        });
        if (res.status === 401) {
          if (badge) {
            badge.textContent = '🔒 Sai Mã GV (Nhập đúng Mã GV để đồng bộ từ máy chủ)';
            badge.className = 'px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold';
          }
        } else if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.records)) {
            const merged = [...data.records];
            for (const loc of records) {
              const key = loc.recordId || `${loc.className}|${loc.station}|${loc.studentName}`;
              if (!merged.some(r => (r.recordId || `${r.className}|${r.station}|${r.studentName}`) === key)) {
                merged.push(loc);
              }
            }
            records = merged;
            setLocalRecords(records);
            if (badge) {
              badge.textContent = '● Đã xác thực & đồng bộ Cloud cả phòng máy';
              badge.className = 'px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold';
            }
          }
        }
      } catch (e) {
        if (badge) {
          badge.textContent = '● Chế độ lưu tại máy (Offline / LocalStorage)';
          badge.className = 'px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold';
        }
      }

      const clsFilter = document.getElementById('filterScoreClass').value;
      const sesEl = document.getElementById('filterScoreSession');
      const sesFilter = sesEl ? sesEl.value : 'ALL';
      const dateEl = document.getElementById('filterScoreDate');
      const dateFilter = dateEl ? dateEl.value.trim().toLowerCase() : '';
      const qFilter = document.getElementById('filterScoreSearch').value.trim().toLowerCase();

      const filtered = records.filter(r => {
        if (clsFilter !== 'ALL' && r.className !== clsFilter) return false;
        if (sesFilter !== 'ALL' && (r.sessionName || 'Buổi 1 (Ch.1)') !== sesFilter) return false;
        if (dateFilter && !String(r.timestamp || '').toLowerCase().includes(dateFilter)) return false;
        if (qFilter && !(String(r.studentName || '').toLowerCase().includes(qFilter) || String(r.station || '').toLowerCase().includes(qFilter))) return false;
        return true;
      });

      document.getElementById('kpiTotalStudents').textContent = filtered.length;
      const passCount = filtered.filter(r => r.grade10 >= 5.0).length;
      document.getElementById('kpiPassCount').textContent = passCount;
      const avgM = filtered.length ? Math.round(filtered.reduce((a, b) => a + (Number(b.mouseScore) || 0), 0) / filtered.length) : 0;
      const avgT = filtered.length ? Math.round(filtered.reduce((a, b) => a + (Number(b.telexScore) || 0), 0) / filtered.length) : 0;
      document.getElementById('kpiAvgMouse').textContent = avgM + 'đ';
      document.getElementById('kpiAvgTelex').textContent = avgT + 'đ';

      const tbody = document.getElementById('teacherScoreTableBody');
      if (!filtered.length) {
        tbody.innerHTML = `<tr><td colspan="10" class="p-6 text-center text-slate-500">Chưa có học sinh nào trong danh sách lọc.</td></tr>`;
        return;
      }

      // 100% XSS-safe rendering via escapeHtml()
      tbody.innerHTML = filtered.map((r, i) => {
        const g10 = Number(r.grade10) || 0;
        const mSc = Number(r.mouseScore) || 0;
        const tSc = Number(r.telexScore) || 0;
        const cSc = Number(r.chAvgScore) || 0;
        return `
          <tr class="hover:bg-sky-50/60">
            <td class="p-2.5 font-bold text-slate-600">${i + 1}</td>
            <td class="p-2.5 text-slate-500 text-[11px]">${escapeHtml(r.timestamp || '')}<br/><span class="text-[10px] font-bold text-sky-700">${escapeHtml(r.sessionName || 'Buổi 1 (Ch.1)')}</span></td>
            <td class="p-2.5 font-bold text-sky-900">${escapeHtml(r.station || 'Máy 01')}</td>
            <td class="p-2.5 font-extrabold text-slate-900">${escapeHtml(r.studentName)}</td>
            <td class="p-2.5 text-slate-700">${escapeHtml(r.className)}</td>
            <td class="p-2.5 text-center font-bold text-sky-800">${mSc}/100</td>
            <td class="p-2.5 text-center font-bold text-teal-800">${tSc}/100</td>
            <td class="p-2.5 text-center font-bold text-purple-800">${cSc}/100</td>
            <td class="p-2.5 text-center font-black text-sm ${g10 >= 5 ? 'text-emerald-700' : 'text-rose-600'}">${g10}</td>
            <td class="p-2.5 text-center">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${g10 >= 5 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}">
                ${escapeHtml(r.status)}
              </span>
            </td>
          </tr>
        `;
      }).join('');
    }

    function exportScoresToCsv() {
      const records = getLocalRecords();
      const headers = ['STT', 'Thoi gian', 'Buoi hoc', 'So may', 'Ho va ten', 'Lop nghe', 'Diem Chuot (100)', 'Diem Telex (100)', 'Diem Ch.2-6 (100)', 'Diem Tong ket (10)', 'Xep loai'];
      const rows = records.map((r, i) => [
        i + 1,
        csvSafeCell(r.timestamp || ''),
        csvSafeCell(r.sessionName || 'Buổi 1 (Ch.1)'),
        csvSafeCell(r.station || ''),
        csvSafeCell(r.studentName || ''),
        csvSafeCell(r.className || ''),
        Number(r.mouseScore) || 0,
        Number(r.telexScore) || 0,
        Number(r.chAvgScore) || 0,
        Number(r.grade10) || 0,
        csvSafeCell(r.status || '')
      ].join(','));
      const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Bang_Diem_Tin_Hoc_9_Cong_3.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    // =========================================================================
    // CHAPTER & SUB-TAB SWITCHING
    // =========================================================================
    function switchChapter(chNum) {
      activeChapter = chNum;
      document.querySelectorAll('.ch-tab').forEach(btn => {
        const c = parseInt(btn.getAttribute('data-chapter'), 10);
        if (c === chNum) {
          btn.className = c === 99
            ? 'ch-tab px-3 py-2 rounded-xl bg-amber-400 text-sky-950 flex items-center gap-1.5 shadow-sm whitespace-nowrap font-black ml-auto'
            : 'ch-tab px-3 py-2 rounded-xl bg-white text-sky-950 flex items-center gap-1.5 shadow-sm whitespace-nowrap font-extrabold';
        } else {
          btn.className = c === 99
            ? 'ch-tab px-3 py-2 rounded-xl bg-amber-400/20 text-amber-300 hover:bg-amber-400 hover:text-sky-950 border border-amber-400/40 flex items-center gap-1.5 whitespace-nowrap font-extrabold ml-auto'
            : 'ch-tab px-3 py-2 rounded-xl text-sky-200 hover:bg-sky-800/80 hover:text-white flex items-center gap-1.5 whitespace-nowrap';
        }
      });

      const subNav = document.getElementById('subNavBar');
      const vWelcome = document.getElementById('viewWelcome');
      const vMouse = document.getElementById('viewMouseTrainer');
      const vTelex = document.getElementById('viewTelexTrainer');
      const vGuide = document.getElementById('viewStepGuide');
      const vFiles = document.getElementById('viewFiles');
      const vOther = document.getElementById('viewOtherChapters');
      const vTeacher = document.getElementById('viewTeacherDashboard');

      vWelcome.classList.add('hidden');
      vMouse.classList.add('hidden');
      vTelex.classList.add('hidden');
      vGuide.classList.add('hidden');
      vFiles.classList.add('hidden');
      vOther.classList.add('hidden');
      vTeacher.classList.add('hidden');

      if (chNum === 0) {
        subNav.classList.add('hidden');
        vWelcome.classList.remove('hidden');
      } else if (chNum === 1) {
        subNav.classList.remove('hidden');
        switchSubTab(activeSubTab);
      } else if (chNum === 99) {
        subNav.classList.add('hidden');
        vTeacher.classList.remove('hidden');
        loadAndRenderTeacherDashboard();
      } else {
        subNav.classList.add('hidden');
        vOther.classList.remove('hidden');
        const info = CHAPTERS_INFO[chNum] || { title: `CHƯƠNG ${chNum}`, icon: '📚', desc: 'Nội dung thực hành mô phỏng.' };
        document.getElementById('lblOtherIcon').textContent = info.icon;
        document.getElementById('lblOtherTitle').textContent = info.title;
        document.getElementById('lblOtherDesc').textContent = info.desc;
        renderChapterSimulator(chNum);
      }
    }

    function switchSubTab(subKey) {
      activeSubTab = subKey;
      document.querySelectorAll('.sub-tab').forEach(btn => {
        const k = btn.getAttribute('data-sub');
        if (k === subKey) {
          btn.className = 'sub-tab px-3 py-1.5 rounded-lg bg-sky-600 text-white flex items-center gap-1.5 shadow-sm';
        } else {
          btn.className = 'sub-tab px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5';
        }
      });

      const vMouse = document.getElementById('viewMouseTrainer');
      const vTelex = document.getElementById('viewTelexTrainer');
      const vGuide = document.getElementById('viewStepGuide');
      const vFiles = document.getElementById('viewFiles');

      vMouse.classList.toggle('hidden', subKey !== 'mouse');
      vTelex.classList.toggle('hidden', subKey !== 'telex');
      vGuide.classList.toggle('hidden', subKey !== 'guide');
      vFiles.classList.toggle('hidden', subKey !== 'files');

      if (subKey === 'mouse') {
        loadMouseLevel(mouseLevel);
      } else if (subKey === 'telex') {
        renderTelexChallengeStep(currentTelexStep);
      }
    }

    // =========================================================================
    // APP INITIALIZATION
    // =========================================================================
    window.addEventListener('DOMContentLoaded', () => {
      // Top student switch
      document.getElementById('btnTopStudent1').addEventListener('click', () => {
        activeStudent = 1;
        refreshAllHeaders();
        if (activeChapter === 1 && activeSubTab === 'mouse') loadMouseLevel(mouseLevel);
        if (activeChapter === 1 && activeSubTab === 'telex') renderTelexChallengeStep(currentTelexStep);
      });
      document.getElementById('btnTopStudent2').addEventListener('click', () => {
        activeStudent = 2;
        refreshAllHeaders();
        if (activeChapter === 1 && activeSubTab === 'mouse') loadMouseLevel(mouseLevel);
        if (activeChapter === 1 && activeSubTab === 'telex') renderTelexChallengeStep(currentTelexStep);
      });

      // Sound toggle
      document.getElementById('btnTopSound').addEventListener('click', () => {
        soundOn = !soundOn;
        const b = document.getElementById('btnTopSound');
        if (soundOn) {
          b.textContent = '🔊 Âm thanh: BẬT';
          b.className = 'px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold transition flex items-center gap-1';
        } else {
          b.textContent = '🔇 Âm thanh: TẮT';
          b.className = 'px-2.5 py-1.5 rounded-xl bg-slate-600 hover:bg-slate-500 text-xs font-bold transition flex items-center gap-1';
        }
      });

      // Chapter tabs
      document.querySelectorAll('.ch-tab').forEach(btn => {
        btn.addEventListener('click', () => {
          const ch = parseInt(btn.getAttribute('data-chapter'), 10);
          switchChapter(ch);
        });
      });

      // Sub-tabs
      document.querySelectorAll('.sub-tab').forEach(btn => {
        btn.addEventListener('click', () => {
          const sub = btn.getAttribute('data-sub');
          switchSubTab(sub);
        });
      });

      // Mouse trainer controls
      document.querySelectorAll('.mlevel-tab').forEach(btn => {
        btn.addEventListener('click', () => {
          const lv = parseInt(btn.getAttribute('data-mlevel'), 10);
          loadMouseLevel(lv);
        });
      });
      document.getElementById('btnResetMLevel').addEventListener('click', () => loadMouseLevel(mouseLevel));
      document.getElementById('btnNextMLevel').addEventListener('click', () => {
        const next = mouseLevel < 5 ? mouseLevel + 1 : 1;
        loadMouseLevel(next);
      });

      // Telex 5-sentence game controls
      document.querySelectorAll('.tstep-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-tstep'), 10);
          renderTelexChallengeStep(idx);
        });
      });
      document.getElementById('btnCheckTelexSentence').addEventListener('click', checkTelexChallengeInput);
      document.getElementById('inputTelexChallenge').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkTelexChallengeInput();
      });
      document.getElementById('btnResetTelexGame').addEventListener('click', () => {
        students[activeStudent].telexSteps = [0, 0, 0, 0, 0];
        renderTelexChallengeStep(0);
      });

      // Free Telex playground inputs
      const telexArea = document.getElementById('telexInput');
      telexArea.addEventListener('input', (e) => analyzeTelexText(e.target.value));
      document.getElementById('btnClearTelexInput').addEventListener('click', () => {
        telexArea.value = '';
        analyzeTelexText('');
        telexArea.focus();
      });

      // Back to Ch1 button
      document.getElementById('btnBackToCh1').addEventListener('click', () => switchChapter(1));

      // Modals
      const mEdit = document.getElementById('modalEditNames');
      document.getElementById('btnTopEditNames').addEventListener('click', () => {
        document.getElementById('inputName1').value = students[1].name;
        document.getElementById('inputName2').value = students[2].name;
        document.getElementById('modalSelectClass').value = currentClassName;
        document.getElementById('modalInputStation').value = currentStationName;
        mEdit.classList.remove('hidden');
        mEdit.classList.add('flex');
      });
      document.getElementById('btnCancelNames').addEventListener('click', () => {
        mEdit.classList.add('hidden');
        mEdit.classList.remove('flex');
      });
      document.getElementById('btnSaveNames').addEventListener('click', () => {
        const v1 = document.getElementById('inputName1').value.trim();
        const v2 = document.getElementById('inputName2').value.trim();
        const cls = document.getElementById('modalSelectClass').value;
        const stn = document.getElementById('modalInputStation').value.trim();
        if (v1) students[1].name = v1;
        if (v2) students[2].name = v2;
        if (cls) currentClassName = cls;
        if (stn) currentStationName = stn;
        mEdit.classList.add('hidden');
        mEdit.classList.remove('flex');
        refreshAllHeaders();
        saveLocalProgress();
      });

      // Submit Cloud & Scoreboard buttons
      document.getElementById('btnTopScoreboard').addEventListener('click', openScoreboard);
      document.getElementById('btnTopSubmitCloud').addEventListener('click', () => {
        openScoreboard();
        submitScoresToCloud();
      });
      document.getElementById('btnModalSubmitCloud').addEventListener('click', submitScoresToCloud);
      document.getElementById('btnCloseScoreboardX').addEventListener('click', closeScoreboard);
      document.getElementById('btnCloseScoreboardBottom').addEventListener('click', closeScoreboard);
      document.getElementById('btnResetAll').addEventListener('click', () => {
        students[1].scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        students[1].telexSteps = [0, 0, 0, 0, 0];
        students[2].scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        students[2].telexSteps = [0, 0, 0, 0, 0];
        closeScoreboard();
        loadMouseLevel(1);
      });

      // Teacher Dashboard buttons
      document.getElementById('btnRefreshCloudScores').addEventListener('click', loadAndRenderTeacherDashboard);
      document.getElementById('btnExportCsvScores').addEventListener('click', exportScoresToCsv);
      document.getElementById('filterScoreClass').addEventListener('change', loadAndRenderTeacherDashboard);
      const sesFilterEl = document.getElementById('filterScoreSession');
      if (sesFilterEl) sesFilterEl.addEventListener('change', loadAndRenderTeacherDashboard);
      const dateFilterEl = document.getElementById('filterScoreDate');
      if (dateFilterEl) dateFilterEl.addEventListener('input', loadAndRenderTeacherDashboard);
      document.getElementById('filterScoreSearch').addEventListener('input', loadAndRenderTeacherDashboard);
      document.getElementById('btnToggleWorkerGuide').addEventListener('click', async () => {
        const box = document.getElementById('workerSetupBox');
        box.classList.toggle('hidden');
        if (!box.classList.contains('hidden')) {
          try {
            const res = await fetch(location.origin + '/cloudflare-worker.js');
            if (res.ok) {
              document.getElementById('preWorkerCode').textContent = await res.text();
            }
          } catch (e) {}
        }
      });
      document.getElementById('btnCopyWorkerScript').addEventListener('click', () => {
        const code = document.getElementById('preWorkerCode').textContent;
        const ta = document.createElement('textarea');
        ta.value = code;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        document.getElementById('btnCopyWorkerScript').textContent = '✅ Đã sao chép mã Worker!';
      });
      document.getElementById('btnClearCloudScores').addEventListener('click', async () => {
        setLocalRecords([]);
        try {
          await fetch(location.origin + '/api/scores', {
            method: 'DELETE',
            headers: getTeacherAuthHeaders()
          });
        } catch (e) {}
        loadAndRenderTeacherDashboard();
      });

      // Projector Mode Toggle
      const btnProj = document.getElementById('btnToggleProjector');
      if (btnProj) {
        btnProj.addEventListener('click', () => {
          document.body.classList.toggle('projector-mode');
          const isProj = document.body.classList.contains('projector-mode');
          btnProj.textContent = isProj ? '📽️ Chế độ Máy Chiếu: BẬT' : '📽️ Chế độ Máy Chiếu: TẮT';
          btnProj.className = isProj
            ? 'px-3 py-1.5 rounded-xl bg-amber-400 text-sky-950 text-xs font-black transition shadow'
            : 'px-3 py-1.5 rounded-xl bg-sky-950 hover:bg-slate-800 border border-sky-700 text-sky-200 text-xs font-extrabold transition';
        });
      }

      // Welcome screen buttons & cards
      document.getElementById('btnHeroStartMouse').addEventListener('click', () => {
        activeSubTab = 'mouse';
        switchChapter(1);
      });
      document.getElementById('btnHeroStartTelex').addEventListener('click', () => {
        activeSubTab = 'telex';
        switchChapter(1);
      });
      document.getElementById('btnWelcomeSaveAndStart').addEventListener('click', () => {
        const w1 = document.getElementById('welcomeInputName1').value.trim();
        const w2 = document.getElementById('welcomeInputName2').value.trim();
        const wCls = document.getElementById('welcomeSelectClass').value;
        const wStn = document.getElementById('welcomeInputStation').value.trim();
        const wSesEl = document.getElementById('welcomeSelectSession');
        if (wSesEl && wSesEl.value) currentSessionName = wSesEl.value;
        if (w1) students[1].name = w1;
        if (w2) students[2].name = w2;
        if (wCls) currentClassName = wCls;
        if (wStn) currentStationName = wStn;
        refreshAllHeaders();
        saveLocalProgress();
        playSound('level');
        activeSubTab = 'mouse';
        switchChapter(1);
      });
      document.querySelectorAll('.welcome-ch-card').forEach(card => {
        card.addEventListener('click', () => {
          const targetCh = parseInt(card.getAttribute('data-goto-ch'), 10);
          switchChapter(targetCh);
        });
      });

      // Simple 4-Step Bar & Teacher Full Menu Toggle
      function updateSimpleStepperHighlight(stepIdx) {
        const ids = ['btnSimpleStep0', 'btnSimpleStep1', 'btnSimpleStep2', 'btnSimpleStep3'];
        ids.forEach((id, idx) => {
          const el = document.getElementById(id);
          if (!el) return;
          if (idx === stepIdx) {
            el.className = 'px-3.5 py-2 rounded-xl bg-amber-400 text-sky-950 font-black text-xs sm:text-sm shadow flex items-center gap-1.5 transition';
          } else {
            el.className = 'px-3.5 py-2 rounded-xl bg-sky-800 hover:bg-sky-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition';
          }
        });
      }

      document.getElementById('btnSimpleStep0').addEventListener('click', () => {
        updateSimpleStepperHighlight(0);
        switchChapter(0);
      });
      document.getElementById('btnSimpleStep1').addEventListener('click', () => {
        updateSimpleStepperHighlight(1);
        activeSubTab = 'mouse';
        switchChapter(1);
      });
      document.getElementById('btnSimpleStep2').addEventListener('click', () => {
        updateSimpleStepperHighlight(2);
        activeSubTab = 'telex';
        switchChapter(1);
      });
      document.getElementById('btnSimpleStep3').addEventListener('click', () => {
        updateSimpleStepperHighlight(3);
        switchChapter(3);
      });

      document.getElementById('btnToggleSimpleMode').addEventListener('click', () => {
        document.body.classList.toggle('simple-student-mode');
        const isSimple = document.body.classList.contains('simple-student-mode');
        const btn = document.getElementById('btnToggleSimpleMode');
        if (isSimple) {
          btn.textContent = '👨‍🏫 Menu Giáo Viên (Hiện đủ 6 Chương)';
          btn.className = 'px-3 py-1.5 rounded-xl bg-sky-950 hover:bg-slate-800 border border-sky-700 text-amber-300 text-xs font-extrabold transition';
        } else {
          btn.textContent = '✨ Thu Gọn Giao Diện (Chế độ Học Sinh 9+3)';
          btn.className = 'px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-sky-950 text-xs font-black transition shadow';
        }
      });

      const btnToggleRoadmap = document.getElementById('btnToggleRoadmapGrid');
      if (btnToggleRoadmap) {
        btnToggleRoadmap.addEventListener('click', () => {
          const body = document.getElementById('welcomeRoadmapBody');
          body.classList.toggle('hidden');
          btnToggleRoadmap.textContent = body.classList.contains('hidden')
            ? '▼ Bấm để xem chi tiết 6 Chương'
            : '▲ Thu gọn danh sách 6 Chương';
        });
      }

      // Sync stepper highlight when Hero buttons are clicked
      document.getElementById('btnHeroStartMouse').addEventListener('click', () => updateSimpleStepperHighlight(1));
      document.getElementById('btnHeroStartTelex').addEventListener('click', () => updateSimpleStepperHighlight(2));
      document.getElementById('btnWelcomeSaveAndStart').addEventListener('click', () => updateSimpleStepperHighlight(1));

      // Launch default on Welcome Screen (Trang Chủ Chào Mừng)
      switchChapter(0);
    });
