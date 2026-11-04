// ============================================================================
// MO-DUN 4: NOP DIEM CLOUD, BANG DIEM GIANG VIEN & XUAT CSV AN TOAN (js/scores.js - v5)
// ============================================================================

// =========================================================================
    // CLOUD + LOCAL STORAGE SCORE SUBMISSION & TEACHER DASHBOARD (HARDENED V5)
    // =========================================================================
    const LOCAL_RECORDS_KEY = 'BMTC_93_CLASS_SCORES_V1';
    let cachedTeacherRecords = [];
    let currentFilteredTeacherRecords = [];

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

    // Only build records for students who have actually entered a real name (No ghost "Em số 1 (Bên phải)" records!)
    function buildCurrentPairRecords() {
      const now = new Date();
      const dateKey = now.toISOString().slice(0, 10);
      const nowStr = now.toLocaleString('vi-VN', { hour12: false });
      const durationSec = Math.max(1, Math.round((Date.now() - sessionStartTime) / 1000));
      const validRecords = [];

      [1, 2].forEach(id => {
        const s = students[id];
        if (isDefaultPlaceholderName(s.name)) return; // Skip default placeholder names!
        const mScore = getStudentTotalScore(id);
        const tScore = getStudentTelexScore(id);
        const wScore = getStudentWordScore(id);
        const xScore = getStudentExcelScore(id);
        const chAvg = getStudentChAvg(id);
        const grade10 = parseFloat(getStudentOverall10(id));
        const safeClass = String(currentClassName || '').trim();
        const safeStation = String(currentStationName || '').trim();
        const safeSession = String(currentSessionName || '').trim();
        const safeName = String(s.name || '').trim();
        const recordId = `${dateKey}|${safeClass}|${safeSession}|${safeStation}|${safeName}`;

        validRecords.push({
          recordId: recordId,
          dateOnly: dateKey,
          timestamp: nowStr,
          sessionName: safeSession,
          classPin: currentClassPin,
          station: safeStation,
          studentName: safeName,
          className: safeClass,
          mouseScore: mScore,
          telexScore: tScore,
          wordScore: wScore,
          excelScore: xScore,
          chAvgScore: chAvg,
          grade10: grade10,
          status: grade10 >= 5.0 ? 'ĐẠT' : 'Cần luyện thêm',
          mostMissed: s.mostMissed || 'Không có',
          telemetry: {
            clicks: s.telemetry ? s.telemetry.clicks : 0,
            typos: s.telemetry ? s.telemetry.typos : 0,
            durationSec: durationSec
          }
        });
      });
      return validRecords;
    }

    function saveLocalProgress() {
      saveStudentSessionState();
      const pair = buildCurrentPairRecords();
      if (!pair.length) return; // Never pollute local records if student hasn't entered their real name
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

    // No hardcoded default password in client JS!
    function getTeacherAuthHeaders() {
      const tokInput = document.getElementById('inputTeacherToken');
      const token = tokInput ? tokInput.value.trim() : '';
      return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      };
    }

    function renderStep5Summary() {
      const wrap = document.getElementById('step5CardsContainer');
      if (!wrap) return;
      wrap.innerHTML = [1, 2].map(id => {
        const s = students[id];
        const isPlaceholder = isDefaultPlaceholderName(s.name);
        const totMouse = getStudentTotalScore(id);
        const totTelex = getStudentTelexScore(id);
        const totWord = getStudentWordScore(id);
        const totExcel = getStudentExcelScore(id);
        const grade10 = getStudentOverall10(id);
        return `
          <div class="rounded-2xl border-2 ${!isPlaceholder ? 'border-sky-500 bg-sky-50/40' : 'border-slate-200 bg-slate-50 opacity-75'} p-4 space-y-2">
            <div class="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <div class="text-sm font-black text-sky-950">👤 ${escapeHtml(s.name)}</div>
                <div class="text-[11px] text-slate-600 font-bold">${escapeHtml(currentClassName)} • ${escapeHtml(currentStationName)} • ${escapeHtml(currentSessionName)}</div>
              </div>
              <span class="px-3 py-1 rounded-xl text-sm font-black bg-emerald-600 text-white">
                ${grade10} / 10đ
              </span>
            </div>
            <ul class="space-y-1 text-xs text-slate-700 font-medium">
              <li class="flex justify-between"><span>🖱️ Bước 2 - Cầm chuột (25%):</span> <strong>${totMouse} / 100đ</strong></li>
              <li class="flex justify-between"><span>⌨️ Bước 3 - Gõ Telex (30%):</span> <strong>${totTelex} / 100đ</strong></li>
              <li class="flex justify-between"><span>📄 Bước 4A - Word &amp; Email (25%):</span> <strong>${totWord} / 100đ</strong></li>
              <li class="flex justify-between"><span>📊 Bước 4B - Excel &amp; An toàn (20%):</span> <strong>${totExcel} / 100đ</strong></li>
            </ul>
            ${isPlaceholder ? '<div class="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">⚠️ Chưa chọn họ tên ở Bước 1 (Bỏ qua khi nộp nếu ngồi 1 mình).</div>' : ''}
          </div>
        `;
      }).join('');
    }

    // Honest Orange Warning Banner when server submission fails (Never mislead students!)
    async function submitScoresToCloud() {
      const pair = buildCurrentPairRecords();
      const toast = document.getElementById('submitCloudToast');
      const step5Box = document.getElementById('step5SubmitStatusBox');

      if (!pair.length) {
        playSound('warn');
        const msg = '⚠️ CHƯA NHẬP HỌ TÊN: Em hãy quay lại Bước 1 (Thông tin) để chọn hoặc gõ họ tên thật của mình trước khi nộp điểm nhé!';
        if (toast) {
          toast.textContent = msg;
          toast.className = 'mt-3 p-3 rounded-xl bg-amber-500 text-slate-950 text-xs font-black text-center block pop-in';
        }
        if (step5Box) {
          step5Box.textContent = msg;
          step5Box.className = 'p-4 rounded-2xl bg-amber-100 border-2 border-amber-400 text-amber-950 text-sm font-extrabold text-center block pop-in';
        }
        return;
      }

      saveLocalProgress();
      const waitMsg = '⏳ Đang gửi điểm lên máy chủ lớp học...';
      if (toast) {
        toast.textContent = waitMsg;
        toast.className = 'mt-3 p-3 rounded-xl bg-sky-900 text-white text-xs font-bold text-center block';
      }
      if (step5Box) {
        step5Box.textContent = waitMsg;
        step5Box.className = 'p-4 rounded-2xl bg-sky-900 text-white text-sm font-bold text-center block';
      }

      let syncedCloud = false;
      let errDetail = '';
      try {
        const sendEndpoint = (window.COURSE_CONFIG && window.COURSE_CONFIG.sendUrl) ? window.COURSE_CONFIG.sendUrl : '/api/scores';
        const res = await fetch(location.origin + sendEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ records: pair })
        });
        if (res.ok) {
          syncedCloud = true;
        } else {
          errDetail = ` (Mã lỗi HTTP ${res.status})`;
        }
      } catch (e) {
        errDetail = ' (Không kết nối được máy chủ)';
      }

      if (syncedCloud) {
        playSound('level');
        const okMsg = '✅ ĐÃ NỘP ĐIỂM THÀNH CÔNG LÊN MÁY CHỦ LỚP HỌC! Thầy/Cô đã nhận được kết quả của em.';
        if (toast) {
          toast.textContent = okMsg;
          toast.className = 'mt-3 p-3 rounded-xl bg-emerald-700 text-white text-xs font-extrabold text-center block pop-in';
        }
        if (step5Box) {
          step5Box.textContent = okMsg;
          step5Box.className = 'p-4 rounded-2xl bg-emerald-600 text-white text-sm font-black text-center block pop-in shadow';
        }
      } else {
        playSound('warn');
        const warnMsg = `⚠️ CHƯA GỬI ĐƯỢC LÊN MÁY CHỦ${errDetail}: Điểm đã lưu tạm trên máy này, em hãy giơ tay báo Thầy/Cô kiểm tra trực tiếp nhé!`;
        if (toast) {
          toast.textContent = warnMsg;
          toast.className = 'mt-3 p-3 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold text-center block pop-in';
        }
        if (step5Box) {
          step5Box.textContent = warnMsg;
          step5Box.className = 'p-4 rounded-2xl bg-amber-400 border-2 border-amber-600 text-slate-950 text-sm font-black text-center block pop-in shadow';
        }
      }
    }

    // Separate NETWORK FETCH from LOCAL FILTERING (Typing in search/date inputs NEVER triggers network requests!)
    async function fetchCloudScoresFromServer() {
      let records = getLocalRecords();
      const badge = document.getElementById('lblCloudSyncBadge');
      const tokInput = document.getElementById('inputTeacherToken');
      const tokenVal = tokInput ? tokInput.value.trim() : '';

      if (!tokenVal) {
        if (badge) {
          badge.textContent = '🔒 Hãy nhập Mã GV rồi bấm "Làm mới dữ liệu" để tải điểm cả phòng máy';
          badge.className = 'px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold';
        }
        cachedTeacherRecords = records;
        renderTeacherTableFromCache();
        return;
      }

      try {
        const res = await fetch(location.origin + '/api/scores', {
          headers: getTeacherAuthHeaders()
        });
        if (res.status === 503) {
          if (badge) {
            badge.textContent = '⚠️ Máy chủ chưa đặt biến TEACHER_SECRET / ADMIN_TOKEN (HTTP 503)';
            badge.className = 'px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold';
          }
        } else if (res.status === 401) {
          if (badge) {
            badge.textContent = '🔒 Sai Mã GV (Không có quyền đọc dữ liệu máy chủ - HTTP 401)';
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

      cachedTeacherRecords = records;
      renderTeacherTableFromCache();
    }

    function renderTeacherTableFromCache() {
      const records = cachedTeacherRecords.length ? cachedTeacherRecords : getLocalRecords();
      const clsFilter = document.getElementById('filterScoreClass').value;
      const sesEl = document.getElementById('filterScoreSession');
      const sesFilter = sesEl ? sesEl.value : 'ALL';
      const dateEl = document.getElementById('filterScoreDate');
      const dateFilter = dateEl ? dateEl.value.trim().toLowerCase() : '';
      const qFilter = document.getElementById('filterScoreSearch').value.trim().toLowerCase();

      const filtered = records.filter(r => {
        if (isDefaultPlaceholderName(r.studentName)) return false;
        if (clsFilter !== 'ALL' && r.className !== clsFilter) return false;
        if (sesFilter !== 'ALL' && (r.sessionName || 'Buổi 1 (Ch.1)') !== sesFilter) return false;
        if (dateFilter && !String(r.timestamp || '').toLowerCase().includes(dateFilter) && !String(r.dateOnly || '').toLowerCase().includes(dateFilter)) return false;
        if (qFilter && !(String(r.studentName || '').toLowerCase().includes(qFilter) || String(r.station || '').toLowerCase().includes(qFilter))) return false;
        return true;
      });

      currentFilteredTeacherRecords = filtered;

      document.getElementById('kpiTotalStudents').textContent = filtered.length;
      const passCount = filtered.filter(r => Number(r.grade10) >= 5.0).length;
      document.getElementById('kpiPassCount').textContent = passCount;
      const avgM = filtered.length ? Math.round(filtered.reduce((a, b) => a + (Number(b.mouseScore) || 0), 0) / filtered.length) : 0;
      const avgT = filtered.length ? Math.round(filtered.reduce((a, b) => a + (Number(b.telexScore) || 0), 0) / filtered.length) : 0;
      document.getElementById('kpiAvgMouse').textContent = avgM + 'đ';
      document.getElementById('kpiAvgTelex').textContent = avgT + 'đ';

      // Update Score Distribution Bar Chart
      const total = filtered.length || 1;
      const cGioi = filtered.filter(r => Number(r.grade10) >= 8.0).length;
      const cKha = filtered.filter(r => Number(r.grade10) >= 6.5 && Number(r.grade10) < 8.0).length;
      const cDat = filtered.filter(r => Number(r.grade10) >= 5.0 && Number(r.grade10) < 6.5).length;
      const cYeu = filtered.filter(r => Number(r.grade10) < 5.0).length;

      const distSum = document.getElementById('lblDistSummary');
      if (distSum) {
        distSum.textContent = `Giỏi (≥8đ): ${cGioi} | Khá (6.5–7.9đ): ${cKha} | Đạt (5–6.4đ): ${cDat} | Cần luyện (<5đ): ${cYeu}`;
      }
      const bG = document.getElementById('barDistGioi');
      const bK = document.getElementById('barDistKha');
      const bD = document.getElementById('barDistDat');
      const bY = document.getElementById('barDistYeu');
      if (bG && bK && bD && bY) {
        bG.style.width = `${Math.round((cGioi / total) * 100)}%`;
        bK.style.width = `${Math.round((cKha / total) * 100)}%`;
        bD.style.width = `${Math.round((cDat / total) * 100)}%`;
        bY.style.width = `${Math.max(0, 100 - Math.round((cGioi / total) * 100) - Math.round((cKha / total) * 100) - Math.round((cDat / total) * 100))}%`;
      }

      const tbody = document.getElementById('teacherScoreTableBody');
      if (!filtered.length) {
        tbody.innerHTML = `<tr><td colspan="11" class="p-6 text-center text-slate-500">Chưa có học sinh nào trong danh sách lọc hiện tại.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, i) => {
        const g10 = Number(r.grade10) || 0;
        const mSc = Number(r.mouseScore) || 0;
        const tSc = Number(r.telexScore) || 0;
        const cSc = Number(r.chAvgScore) || 0;
        const missedNote = r.mostMissed || (tSc < 60 ? 'Cần rèn thêm gõ dấu Telex' : (mSc < 60 ? 'Cần rèn thêm thao tác chuột' : 'Tốt'));
        return `
          <tr class="hover:bg-sky-50/60">
            <td class="p-2.5 font-bold text-slate-600">${i + 1}</td>
            <td class="p-2.5 text-slate-500 text-[11px]">${escapeHtml(r.timestamp || '')}<br/><span class="text-[10px] font-bold text-sky-700">${escapeHtml(r.sessionName || 'Buổi 1')} ${r.classPin ? '(' + escapeHtml(r.classPin) + ')' : ''}</span></td>
            <td class="p-2.5 font-bold text-sky-900">${escapeHtml(r.station || 'Máy 01')}</td>
            <td class="p-2.5 font-extrabold text-slate-900">${escapeHtml(r.studentName)}</td>
            <td class="p-2.5 text-slate-700">${escapeHtml(r.className)}</td>
            <td class="p-2.5 text-center font-bold text-sky-800">${mSc}/100</td>
            <td class="p-2.5 text-center font-bold text-teal-800">${tSc}/100</td>
            <td class="p-2.5 text-center font-bold text-purple-800">${cSc}/100</td>
            <td class="p-2.5 text-center font-black text-sm ${g10 >= 5 ? 'text-emerald-700' : 'text-rose-600'}">${g10}</td>
            <td class="p-2.5 text-xs text-slate-600">${escapeHtml(missedNote)}</td>
            <td class="p-2.5 text-center">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${g10 >= 5 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}">
                ${escapeHtml(r.status)}
              </span>
            </td>
          </tr>
        `;
      }).join('');
    }

    function loadAndRenderTeacherDashboard() {
      fetchCloudScoresFromServer();
    }

    // Export ONLY the currently filtered records (with session/class in filename)
    function exportScoresToCsv() {
      const records = currentFilteredTeacherRecords.length ? currentFilteredTeacherRecords : getLocalRecords().filter(r => !isDefaultPlaceholderName(r.studentName));
      const headers = ['STT', 'Thoi gian', 'Buoi hoc', 'Ma buoi', 'So may', 'Ho va ten', 'Lop nganh', 'Diem Chuot (25%)', 'Diem Telex (30%)', 'Diem Word/Excel (45%)', 'Diem Tong ket (10)', 'Ky nang can luu y', 'Xep loai'];
      const rows = records.map((r, i) => [
        i + 1,
        csvSafeCell(r.timestamp || ''),
        csvSafeCell(r.sessionName || 'Buổi 1'),
        csvSafeCell(r.classPin || ''),
        csvSafeCell(r.station || ''),
        csvSafeCell(r.studentName || ''),
        csvSafeCell(r.className || ''),
        Number(r.mouseScore) || 0,
        Number(r.telexScore) || 0,
        Number(r.chAvgScore) || 0,
        Number(r.grade10) || 0,
        csvSafeCell(r.mostMissed || 'Tốt'),
        csvSafeCell(r.status || '')
      ].join(','));
      const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const clsSlug = (document.getElementById('filterScoreClass').value || 'Lop93').replace(/\s+/g, '_');
      a.download = `Bang_Diem_${clsSlug}_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
