// ============================================================================
// MO-DUN 2: BO KIEM TRA GO TIENG VIET TELEX CHUAN UNICODE NFC (js/ch1-telex.js - v5)
// ============================================================================

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
      const rawVal = document.getElementById('inputTelexChallenge').value.trim().replace(/\s+/g, ' ');
      const val = rawVal.normalize('NFC');
      const target = item.target.trim().replace(/\s+/g, ' ').normalize('NFC');
      const fb = document.getElementById('lblTelexChallengeFeedback');

      if (!val) {
        playSound('warn');
        fb.textContent = '⚠️ Em hãy tự tay gõ câu mẫu vào ô trống rồi mới bấm Kiểm tra nhé!';
        fb.className = 'text-xs font-extrabold text-rose-600';
        return;
      }

      if (val === target) {
        playSound('level');
        if (!isPracticeOnlyMode) {
          students[activeStudent].telexSteps[currentTelexStep] = 20;
        }
        document.getElementById('lblTelexGameScore').textContent = getStudentTelexScore(activeStudent);
        refreshAllHeaders();
        saveStudentSessionState();
        saveLocalProgress();

        if (currentTelexStep < 4) {
          fb.textContent = `🎉 Chính xác 100% (Chuẩn cả dấu và chữ HOA)! Em được +20 điểm. Chuyển sang Câu ${currentTelexStep + 2}/5!`;
          fb.className = 'text-xs font-extrabold text-emerald-700';
          setTimeout(() => renderTelexChallengeStep(currentTelexStep + 1), 500);
        } else {
          fb.textContent = '🏆 XUẤT SẮC! Em đã hoàn thành đủ 5/5 câu tiếng Việt Telex (100/100 điểm)! Hãy bấm nút "Tiếp tục ➔" ở dưới để sang Bước 4 nhé!';
          fb.className = 'text-xs font-extrabold text-emerald-700';
          renderTelexChallengeStep(currentTelexStep);
        }
      } else {
        playSound('warn');
        students[activeStudent].telemetry.typos = (students[activeStudent].telemetry.typos || 0) + 1;
        const hasAccent = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(val);
        if (!hasAccent) {
          students[activeStudent].mostMissed = 'Quên bật chữ V Unikey (Gõ không dấu)';
          fb.textContent = '❌ Chữ em gõ chưa có dấu tiếng Việt! Hãy nhìn góc dưới bên phải màn hình, bật Unikey sang chữ V màu đỏ rồi gõ lại nhé.';
        } else if (val.toLowerCase() === target.toLowerCase()) {
          students[activeStudent].mostMissed = 'Quên viết HOA chữ cái đầu / tên riêng (Shift)';
          fb.textContent = `⚠️ Em đã gõ đúng hết dấu tiếng Việt nhưng chưa viết HOA đúng chữ đầu câu hoặc tên riêng ("${target}"). Hãy giữ phím Shift để gõ chữ HOA nhé!`;
        } else {
          students[activeStudent].mostMissed = `Sai dấu/chữ ở Câu ${currentTelexStep + 1} Telex`;
          fb.textContent = `❌ Chưa khớp hoàn toàn! Câu em gõ ("${val}") còn lệch chữ hoặc dấu so với câu mẫu ("${target}"). Hãy kiểm tra lại nhé!`;
        }
        fb.className = 'text-xs font-extrabold text-rose-700';
        saveStudentSessionState();
      }
    }

    // =========================================================================
    // INTERACTIVE SIMULATORS FOR CHAPTERS 2 TO 6 (100 POINTS EACH)
    // =========================================================================
