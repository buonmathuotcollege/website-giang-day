// ============================================================================
// MO-DUN 5: DIEU HUONG LUONG 5 BUOC & KHOI TAO UNG DUNG (js/app.js - v5)
// ============================================================================

// =========================================================================
    // 5-STEP STUDENT WIZARD & CHAPTER SWITCHING
    // =========================================================================
    const STEP_COMPETENCY_LABELS = [
      '📌 Bước 1/5 (Điểm danh): Chọn lớp, số máy, buổi học và tên học sinh từ danh sách xổ xuống',
      '📌 Chuẩn Năng Lực Số (NLS 1.1 & 1.2): Vận hành thiết bị số, điều khiển chuột và quản lý thư mục ổ đĩa D:\\',
      '📌 Chuẩn Năng Lực Số (NLS 1.3 & 3.1): Tạo lập văn bản tiếng Việt chuẩn Unicode, kiểu gõ Telex chính xác',
      '📌 Chuẩn Năng Lực Số (NLS 2.1, 3.1 & 3.2): Thực hành Soạn thảo Word (.docx), Bảng tính Excel (.xlsx) & An toàn số',
      '📌 Bước 5/5 (Nộp kết quả): Đối chiếu điểm trọng số Thang 10 và gửi kết quả lên máy chủ lớp học'
    ];

    function updateWizardStepUI(stepIdx) {
      currentWizardStep = stepIdx;
      const ids = ['btnSimpleStep0', 'btnSimpleStep1', 'btnSimpleStep2', 'btnSimpleStep3', 'btnSimpleStep4'];
      ids.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (idx === stepIdx) {
          el.className = 'step5-pill rounded-2xl border-2 border-sky-600 bg-sky-50 text-sky-900 px-2 py-2 flex flex-col items-center justify-center text-center shadow-sm';
        } else if (idx < stepIdx) {
          el.className = 'step5-pill rounded-2xl border-2 border-emerald-300 bg-emerald-50/60 text-emerald-900 px-2 py-2 flex flex-col items-center justify-center text-center';
        } else {
          el.className = 'step5-pill rounded-2xl border-2 border-slate-200 bg-white hover:border-sky-400 text-slate-600 px-2 py-2 flex flex-col items-center justify-center text-center';
        }
      });

      const compBadge = document.getElementById('lblCompetencyBadge');
      if (compBadge && STEP_COMPETENCY_LABELS[stepIdx]) {
        compBadge.textContent = STEP_COMPETENCY_LABELS[stepIdx];
      }

      const wizInd = document.getElementById('lblWizStepIndicator');
      const stepNames = ['Thông tin điểm danh', 'Tập cầm chuột (5 bài)', 'Gõ tiếng Việt Telex', 'Thực hành Word & Excel', 'Kiểm tra & Nộp điểm'];
      if (wizInd) {
        wizInd.textContent = `Bước ${stepIdx + 1} / 5: ${stepNames[stepIdx] || ''}`;
      }

      const btnPrev = document.getElementById('btnWizPrev');
      const btnNext = document.getElementById('btnWizNext');
      if (btnPrev) btnPrev.style.visibility = stepIdx === 0 ? 'hidden' : 'visible';
      if (btnNext) {
        btnNext.innerHTML = stepIdx === 4 ? '<span>📤 Nộp điểm ngay</span>' : '<span>Tiếp tục ➔</span>';
      }
      saveStudentSessionState();
    }

    function goToWizardStep(stepIdx) {
      // Guard Step 0 -> Step 1: Require student 1 name
      if (currentWizardStep === 0 && stepIdx > 0) {
        const w1 = document.getElementById('welcomeInputName1').value.trim();
        const w2 = document.getElementById('welcomeInputName2').value.trim();
        const wCls = document.getElementById('welcomeSelectClass').value;
        const wStn = document.getElementById('welcomeInputStation').value;
        const wSes = document.getElementById('welcomeSelectSession').value;
        const wPin = document.getElementById('welcomeInputClassPin').value.trim().toUpperCase();

        if (wCls) currentClassName = wCls;
        if (wStn) currentStationName = wStn;
        if (wSes) currentSessionName = wSes;
        currentClassPin = wPin;

        if (w1) students[1].name = w1;
        if (w2) students[2].name = w2;

        if (isDefaultPlaceholderName(students[1].name)) {
          playSound('warn');
          const warnEl = document.getElementById('welcomeCheckinWarn');
          if (warnEl) {
            warnEl.textContent = '⚠️ Em hãy chọn tên mình trong danh sách lớp (hoặc gõ họ tên vào ô đầu tiên) rồi mới đi tiếp nhé!';
            warnEl.className = 'text-xs font-black text-rose-800 bg-rose-50 border-2 border-rose-300 rounded-xl px-3 py-2 pop-in';
          }
          document.getElementById('welcomeInputName1').focus();
          return;
        }
        refreshAllHeaders();
        saveLocalProgress();
      }

      updateWizardStepUI(stepIdx);
      const vStep5 = document.getElementById('viewStep5Submit');
      if (vStep5) vStep5.classList.add('hidden');

      if (stepIdx === 0) {
        switchChapter(0);
      } else if (stepIdx === 1) {
        activeSubTab = 'mouse';
        switchChapter(1);
      } else if (stepIdx === 2) {
        activeSubTab = 'telex';
        switchChapter(1);
      } else if (stepIdx === 3) {
        switchChapter(3);
      } else if (stepIdx === 4) {
        // Show dedicated Step 5 Submission View
        ['viewWelcome', 'viewMouseTrainer', 'viewTelexTrainer', 'viewStepGuide', 'viewFiles', 'viewOtherChapters', 'viewTeacherDashboard'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.classList.add('hidden');
        });
        if (vStep5) {
          vStep5.classList.remove('hidden');
          renderStep5Summary();
        }
      }
    }

    function switchChapter(chNum) {
      activeChapter = chNum;
      document.querySelectorAll('.ch-tab').forEach(btn => {
        const c = parseInt(btn.getAttribute('data-chapter'), 10);
        if (c === chNum) {
          btn.className = c === 99
            ? 'teacher-only-ctrl ch-tab px-3 py-2 rounded-xl bg-amber-400 text-sky-950 flex items-center gap-1.5 shadow-sm whitespace-nowrap font-black ml-auto'
            : 'ch-tab px-3 py-2 rounded-xl bg-white text-sky-950 flex items-center gap-1.5 shadow-sm whitespace-nowrap font-extrabold';
        } else {
          btn.className = c === 99
            ? 'teacher-only-ctrl ch-tab px-3 py-2 rounded-xl bg-amber-400/20 text-amber-300 hover:bg-amber-400 hover:text-sky-950 border border-amber-400/40 flex items-center gap-1.5 whitespace-nowrap font-extrabold ml-auto'
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
      const vStep5 = document.getElementById('viewStep5Submit');

      [vWelcome, vMouse, vTelex, vGuide, vFiles, vOther, vTeacher, vStep5].forEach(el => {
        if (el) el.classList.add('hidden');
      });

      if (chNum === 0) {
        subNav.classList.add('hidden');
        vWelcome.classList.remove('hidden');
        updateWizardStepUI(0);
      } else if (chNum === 1) {
        subNav.classList.remove('hidden');
        switchSubTab(activeSubTab);
        updateWizardStepUI(activeSubTab === 'telex' ? 2 : 1);
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
        updateWizardStepUI(3);
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

    function populateRosterDropdowns(className) {
      const rosters = (window.COURSE_CONFIG && window.COURSE_CONFIG.classRosters) ? window.COURSE_CONFIG.classRosters : {};
      const list = rosters[className] || [
        '01. Nguyễn Văn An', '02. Trần Văn Ba', '03. Lê Thị Bích Cúc', '04. Phạm Minh Dũng',
        '05. Hoàng Quốc Đạt', '06. H\'Hen Niê', '07. Y Đam San Êban', '-- Học sinh mới (Tự nhập tên ở ô dưới) --'
      ];
      const sel1 = document.getElementById('welcomeRosterSelect1');
      const sel2 = document.getElementById('welcomeRosterSelect2');
      if (sel1) {
        sel1.innerHTML = '<option value="">-- Chọn tên trong danh sách lớp (hoặc gõ ở dưới) --</option>' +
          list.map(n => `<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('');
      }
      if (sel2) {
        sel2.innerHTML = '<option value="">-- Chọn tên trong danh sách lớp (hoặc để trống nếu ngồi 1 mình) --</option>' +
          list.map(n => `<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('');
      }
    }

    // =========================================================================
    // APP INITIALIZATION
    // =========================================================================
    window.addEventListener('DOMContentLoaded', () => {
      // 1. Restore saved student session from localStorage (Never lose progress on F5!)
      restoreStudentSessionState();

      // 2. Populate Student Roster Dropdowns
      const clsSelectEl = document.getElementById('welcomeSelectClass');
      if (clsSelectEl) {
        clsSelectEl.value = currentClassName;
        populateRosterDropdowns(clsSelectEl.value);
        clsSelectEl.addEventListener('change', (e) => {
          currentClassName = e.target.value;
          populateRosterDropdowns(currentClassName);
          saveStudentSessionState();
        });
      }

      const ros1 = document.getElementById('welcomeRosterSelect1');
      const ros2 = document.getElementById('welcomeRosterSelect2');
      if (ros1) {
        ros1.addEventListener('change', (e) => {
          const val = e.target.value;
          const inp1 = document.getElementById('welcomeInputName1');
          if (val && !val.includes('-- Học sinh mới')) {
            inp1.value = val.replace(/^\d+\.\s*/, '');
            students[1].name = inp1.value;
            refreshAllHeaders();
            saveStudentSessionState();
          } else {
            inp1.value = '';
            inp1.focus();
          }
        });
      }
      if (ros2) {
        ros2.addEventListener('change', (e) => {
          const val = e.target.value;
          const inp2 = document.getElementById('welcomeInputName2');
          if (val && !val.includes('-- Học sinh mới')) {
            inp2.value = val.replace(/^\d+\.\s*/, '');
            students[2].name = inp2.value;
            refreshAllHeaders();
            saveStudentSessionState();
          } else {
            inp2.value = '';
            inp2.focus();
          }
        });
      }

      // Sync restored names into inputs if non-placeholder
      if (!isDefaultPlaceholderName(students[1].name)) {
        document.getElementById('welcomeInputName1').value = students[1].name;
      }
      if (!isDefaultPlaceholderName(students[2].name)) {
        document.getElementById('welcomeInputName2').value = students[2].name;
      }
      if (currentStationName) document.getElementById('welcomeInputStation').value = currentStationName;
      if (currentSessionName) document.getElementById('welcomeSelectSession').value = currentSessionName;
      if (currentClassPin) document.getElementById('welcomeInputClassPin').value = currentClassPin;
      refreshAllHeaders();

      // 3. Teacher Route Gate: Unlock teacher controls ONLY when accessing /gv, ?gv=1, or #/gv (or Double-Clicking the School Logo)
      function checkTeacherRouteUnlock() {
        const isTeacherUrl = location.pathname.endsWith('/gv') || location.search.includes('gv=1') || location.hash.includes('gv');
        if (isTeacherUrl) {
          document.body.classList.add('teacher-unlocked');
          document.body.classList.remove('simple-student-mode');
          switchChapter(99);
        }
      }
      window.addEventListener('hashchange', checkTeacherRouteUnlock);

      // Secret Teacher Unlock shortcut: Double-click the 🎓 logo in top-left header
      const schoolLogo = document.querySelector('header .w-11.h-11');
      if (schoolLogo) {
        schoolLogo.style.cursor = 'pointer';
        schoolLogo.title = 'Giảng viên: Nháy đúp vào logo trường (hoặc thêm #/gv vào địa chỉ web) để mở Bảng Điểm Giảng Viên';
        schoolLogo.addEventListener('dblclick', () => {
          document.body.classList.toggle('teacher-unlocked');
          if (document.body.classList.contains('teacher-unlocked')) {
            location.hash = '#/gv';
          } else {
            location.hash = '';
            goToWizardStep(0);
          }
        });
      }

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

      // Practice vs Exam Mode Toggle
      const btnPracExam = document.getElementById('btnTogglePracticeExam');
      if (btnPracExam) {
        btnPracExam.addEventListener('click', () => {
          isPracticeOnlyMode = !isPracticeOnlyMode;
          if (isPracticeOnlyMode) {
            btnPracExam.textContent = '🌱 Chế độ: LUYỆN TỰ DO';
            btnPracExam.className = 'px-2.5 py-1.5 rounded-xl bg-teal-500 text-white text-xs font-black transition shadow';
          } else {
            btnPracExam.textContent = '🎯 Chế độ: TÍNH ĐIỂM';
            btnPracExam.className = 'px-2.5 py-1.5 rounded-xl bg-amber-400 text-sky-950 text-xs font-black transition shadow';
          }
        });
      }

      // Dark Mode Toggle
      const btnDark = document.getElementById('btnToggleDarkTheme');
      if (btnDark) {
        btnDark.addEventListener('click', () => {
          document.body.classList.toggle('dark-theme');
          const isDark = document.body.classList.contains('dark-theme');
          btnDark.textContent = isDark ? '☀️ Giao diện: TỐI' : '🌙 Giao diện: SÁNG';
        });
      }

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

      // Chapter tabs & Step 4 Quick Chapter buttons
      document.querySelectorAll('.ch-tab').forEach(btn => {
        btn.addEventListener('click', () => {
          const ch = parseInt(btn.getAttribute('data-chapter'), 10);
          switchChapter(ch);
        });
      });
      document.querySelectorAll('.step4-ch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const ch = parseInt(btn.getAttribute('data-step4ch'), 10);
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

      // Telex 5-sentence game controls + Anti-Paste / Anti-Copy guard
      document.querySelectorAll('.tstep-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-tstep'), 10);
          renderTelexChallengeStep(idx);
        });
      });
      document.getElementById('btnCheckTelexSentence').addEventListener('click', checkTelexChallengeInput);
      const telexChallengeInp = document.getElementById('inputTelexChallenge');
      telexChallengeInp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkTelexChallengeInput();
      });
      telexChallengeInp.addEventListener('paste', (e) => {
        e.preventDefault();
        playSound('warn');
        const fb = document.getElementById('lblTelexChallengeFeedback');
        fb.textContent = '⚠️ Không được Sao chép - Dán (Copy/Paste)! Em hãy tự tay gõ từng phím Telex để rèn kỹ năng nhé.';
        fb.className = 'text-xs font-extrabold text-rose-700';
      });
      const telexTargetEl = document.getElementById('lblTelexTargetSentence');
      if (telexTargetEl) {
        telexTargetEl.addEventListener('copy', (e) => e.preventDefault());
        telexTargetEl.addEventListener('contextmenu', (e) => e.preventDefault());
      }
      document.getElementById('btnResetTelexGame').addEventListener('click', () => {
        students[activeStudent].telexSteps = [0, 0, 0, 0, 0];
        saveStudentSessionState();
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

      document.getElementById('btnBackToCh1').addEventListener('click', () => goToWizardStep(1));

      // Modals
      const mEdit = document.getElementById('modalEditNames');
      document.getElementById('btnTopEditNames').addEventListener('click', () => {
        document.getElementById('inputName1').value = isDefaultPlaceholderName(students[1].name) ? '' : students[1].name;
        document.getElementById('inputName2').value = isDefaultPlaceholderName(students[2].name) ? '' : students[2].name;
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
        if (v1) {
          students[1].name = v1;
          document.getElementById('welcomeInputName1').value = v1;
        }
        if (v2) {
          students[2].name = v2;
          document.getElementById('welcomeInputName2').value = v2;
        }
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
        goToWizardStep(4);
        submitScoresToCloud();
      });
      document.getElementById('btnStep5SendNow').addEventListener('click', submitScoresToCloud);
      document.getElementById('btnModalSubmitCloud').addEventListener('click', submitScoresToCloud);
      document.getElementById('btnCloseScoreboardX').addEventListener('click', closeScoreboard);
      document.getElementById('btnCloseScoreboardBottom').addEventListener('click', closeScoreboard);
      document.getElementById('btnResetAll').addEventListener('click', () => {
        students[1].scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        students[1].telexSteps = [0, 0, 0, 0, 0];
        students[1].chScores = { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
        students[2].scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        students[2].telexSteps = [0, 0, 0, 0, 0];
        students[2].chScores = { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
        saveStudentSessionState();
        closeScoreboard();
        loadMouseLevel(1);
      });

      // Teacher Dashboard Controls (Filtering uses cachedTeacherRecords without hammering server!)
      document.getElementById('btnRefreshCloudScores').addEventListener('click', fetchCloudScoresFromServer);
      document.getElementById('btnExportCsvScores').addEventListener('click', exportScoresToCsv);
      document.getElementById('filterScoreClass').addEventListener('change', renderTeacherTableFromCache);
      const sesFilterEl = document.getElementById('filterScoreSession');
      if (sesFilterEl) sesFilterEl.addEventListener('change', renderTeacherTableFromCache);
      const dateFilterEl = document.getElementById('filterScoreDate');
      if (dateFilterEl) dateFilterEl.addEventListener('input', renderTeacherTableFromCache);
      document.getElementById('filterScoreSearch').addEventListener('input', renderTeacherTableFromCache);

      // Worker guide only opens if Teacher Token is entered
      document.getElementById('btnToggleWorkerGuide').addEventListener('click', async () => {
        const tokVal = document.getElementById('inputTeacherToken').value.trim();
        if (!tokVal) {
          playSound('warn');
          const badge = document.getElementById('lblCloudSyncBadge');
          if (badge) {
            badge.textContent = '🔒 Hãy nhập Mã GV vào ô "🔑 Mã GV" trước khi mở cấu hình Worker!';
            badge.className = 'px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold';
          }
          document.getElementById('inputTeacherToken').focus();
          return;
        }
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

      // 2-Step Safe Delete Confirmation Banner
      const delBanner = document.getElementById('confirmDeleteBanner');
      document.getElementById('btnClearCloudScores').addEventListener('click', () => {
        const tokVal = document.getElementById('inputTeacherToken').value.trim();
        if (!tokVal) {
          playSound('warn');
          document.getElementById('inputTeacherToken').focus();
          return;
        }
        if (delBanner) delBanner.classList.remove('hidden');
      });
      document.getElementById('btnConfirmDeleteCancel').addEventListener('click', () => {
        if (delBanner) delBanner.classList.add('hidden');
      });
      document.getElementById('btnConfirmDeleteYes').addEventListener('click', async () => {
        if (delBanner) delBanner.classList.add('hidden');
        setLocalRecords([]);
        cachedTeacherRecords = [];
        try {
          await fetch(location.origin + '/api/scores', {
            method: 'DELETE',
            headers: getTeacherAuthHeaders()
          });
        } catch (e) {}
        fetchCloudScoresFromServer();
      });

      // Projector Mode Toggle
      const btnProj = document.getElementById('btnToggleProjector');
      if (btnProj) {
        btnProj.addEventListener('click', () => {
          document.body.classList.toggle('projector-mode');
          const isProj = document.body.classList.contains('projector-mode');
          btnProj.textContent = isProj ? '📽️ Chế độ Máy Chiếu: BẬT' : '📽️ Chế độ Máy Chiếu: TẮT';
          btnProj.className = isProj
            ? 'px-3 py-1 rounded-xl bg-amber-400 text-sky-950 text-xs font-black transition shadow'
            : 'px-3 py-1 rounded-xl bg-sky-950 hover:bg-slate-800 text-sky-200 text-xs font-extrabold transition';
        });
      }

      // 5-Step Wizard Navigation Buttons (Top 5 Cards + Bottom Prev/Next)
      ['btnSimpleStep0', 'btnSimpleStep1', 'btnSimpleStep2', 'btnSimpleStep3', 'btnSimpleStep4'].forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => goToWizardStep(idx));
      });

      document.getElementById('btnWizPrev').addEventListener('click', () => {
        if (currentWizardStep > 0) goToWizardStep(currentWizardStep - 1);
      });
      document.getElementById('btnWizNext').addEventListener('click', () => {
        if (currentWizardStep < 4) {
          goToWizardStep(currentWizardStep + 1);
        } else {
          submitScoresToCloud();
        }
      });

      // Welcome screen buttons & cards
      document.getElementById('btnHeroStartMouse').addEventListener('click', () => goToWizardStep(1));
      document.getElementById('btnHeroStartTelex').addEventListener('click', () => goToWizardStep(2));
      document.getElementById('btnWelcomeSaveAndStart').addEventListener('click', () => {
        playSound('level');
        goToWizardStep(1);
      });
      document.querySelectorAll('.welcome-ch-card').forEach(card => {
        card.addEventListener('click', () => {
          const targetCh = parseInt(card.getAttribute('data-goto-ch'), 10);
          switchChapter(targetCh);
        });
      });

      document.getElementById('btnToggleSimpleMode').addEventListener('click', () => {
        document.body.classList.toggle('simple-student-mode');
        const isSimple = document.body.classList.contains('simple-student-mode');
        const btn = document.getElementById('btnToggleSimpleMode');
        if (isSimple) {
          btn.textContent = '👨‍🏫 Menu Giáo Viên (Hiện đủ 6 Chương)';
          btn.className = 'px-3 py-1 rounded-xl bg-sky-950 hover:bg-slate-800 text-amber-300 text-xs font-extrabold transition';
        } else {
          btn.textContent = '✨ Thu Gọn Giao Diện (Chế độ Học Sinh 9+3)';
          btn.className = 'px-3 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-sky-950 text-xs font-black transition shadow';
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

      // Launch on Step 1 (or Teacher Route if #/gv or /gv)
      goToWizardStep(0);
      checkTeacherRouteUnlock();
    });
