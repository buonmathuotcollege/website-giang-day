// ============================================================================
// MO-DUN 3: MO PHONG THUC HANH WORD, EXCEL, EMAIL & AN TOAN SO (js/ch3-word.js - v5)
// ============================================================================

function renderChapterSimulator(chNum) {
      const container = document.getElementById('chapterSimContainer');
      const curScore = students[activeStudent].chScores[chNum] || 0;
      document.getElementById('lblChapterSimScore').textContent = `Điểm thực hành chương này: ${curScore} / 100đ`;

      // Highlight active Step 4 quick chapter button
      document.querySelectorAll('.step4-ch-btn').forEach(btn => {
        const c = parseInt(btn.getAttribute('data-step4ch'), 10);
        if (c === chNum) {
          btn.className = 'step4-ch-btn px-3 py-1.5 rounded-xl bg-sky-700 text-white text-xs font-black shadow';
        } else {
          btn.className = 'step4-ch-btn px-3 py-1.5 rounded-xl bg-white hover:bg-sky-100 text-sky-900 border border-sky-300 text-xs font-extrabold';
        }
      });

      if (chNum === 2) {
        // Chapter 2: Interactive Safe Image Search Challenge (40đ) + Virtual Gmail Client (60đ) = 100đ
        container.innerHTML = `
          <div class="space-y-4 text-xs sm:text-sm">
            <div class="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 text-slate-800">
              🌐 <strong>Chuẩn Năng Lực Số (NLS 2.1 &amp; 2.2 – Chương 2: 6 tiết = 2 LT + 4 TH):</strong> Thực hành tìm kiếm hình ảnh kỹ thuật an toàn trên Google Chrome (40đ) và soạn gửi Email đính kèm tệp (60đ).
            </div>

            <!-- Part 1: Safe Search Challenge (40 pts) -->
            <div class="bg-white rounded-2xl border border-slate-300 p-4 space-y-2.5">
              <div class="font-extrabold text-sky-900">🔎 Phần 1 (40 điểm): Tình huống Tìm kiếm &amp; Tải ảnh thiết bị CNTT an toàn (Buổi 3)</div>
              <p class="text-slate-700 font-medium">
                Khi cần tìm và tải hình ảnh <strong>"Sơ đồ bấm cáp mạng LAN RJ45 chuẩn B"</strong> trên Google Chrome về lưu ở ổ <code>D:\\</code> mà không bị dính virus quảng cáo, em chọn thao tác nào?
              </p>
              <select id="simCh2SearchAns" class="w-full px-3 py-2.5 rounded-xl border-2 border-slate-300 font-bold bg-slate-50">
                <option value="">-- Chọn cách thao tác đúng --</option>
                <option value="w1">Bấm vào nút màu xanh lá cây to nhấp nháy ghi "TẢI VỀ NGAY / DOWNLOAD"</option>
                <option value="ok">Chọn thẻ Hình ảnh ➔ Bấm chuột PHẢI vào ảnh rõ nét ➔ Chọn "Lưu hình ảnh thành..." (Save image as...) lưu vào ổ D:\\</option>
                <option value="w2">Bấm nút nguồn tắt màn hình máy tính</option>
              </select>
            </div>

            <!-- Part 2: Virtual Gmail Client (60 pts) -->
            <div class="bg-white rounded-2xl border border-slate-300 p-4 space-y-3">
              <div class="font-extrabold text-sky-900">📧 Phần 2 (60 điểm): Soạn và gửi Thư điện tử (Email) nộp bài thực hành (Buổi 4)</div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">1. Người nhận (To) - Địa chỉ email của Khoa/Giảng viên:</label>
                <input id="simEmailTo" type="text" value="khoacntt@bmtc.edu.vn" class="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">2. Tiêu đề thư (Subject) - Ghi rõ Lớp - Họ tên - Nội dung:</label>
                <input id="simEmailSub" type="text" value="THUD 9+3 - Nộp bài thực hành Chương 2" placeholder="Ví dụ: THUD 9+3 - Nguyễn Văn An - Nộp bài Chương 2" class="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">3. Nội dung thư (Có lời chào Thầy/Cô và báo cáo nộp bài):</label>
                <textarea id="simEmailBody" rows="3" class="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium">Em chào Thầy/Cô Khoa CNTT, em xin gửi tệp hình ảnh sơ đồ mạng LAN em đã tải và lưu tại ổ đĩa D:\ ạ.</textarea>
              </div>
              <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
                <label class="flex items-center gap-2 font-bold text-sky-900 cursor-pointer bg-sky-50 px-3 py-2 rounded-xl border border-sky-200">
                  <input id="simEmailAttach" type="checkbox" checked class="w-4 h-4" />
                  <span>📎 Đính kèm tệp từ ổ D:\\ (<code>So_Do_Mang_LAN.jpg</code>)</span>
                </label>
                <button id="btnSimSendEmail" type="button" class="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-extrabold shadow">
                  🚀 Kiểm Tra &amp; Chấm Điểm Chương 2 (100đ)
                </button>
              </div>
              <div id="simEmailFeedback" class="font-bold text-slate-600 pt-1"></div>
            </div>
          </div>
        `;
        document.getElementById('btnSimSendEmail').addEventListener('click', () => {
          const searchOk = document.getElementById('simCh2SearchAns').value === 'ok';
          const to = document.getElementById('simEmailTo').value.trim();
          const sub = document.getElementById('simEmailSub').value.trim();
          const body = document.getElementById('simEmailBody').value.trim();
          const att = document.getElementById('simEmailAttach').checked;
          const fb = document.getElementById('simEmailFeedback');
          let pts = 0;
          if (searchOk) pts += 40;
          if (to.includes('@')) pts += 15;
          if (sub.length >= 5) pts += 15;
          if (body.length >= 10) pts += 15;
          if (att) pts += 15;
          if (!isPracticeOnlyMode) students[activeStudent].chScores[2] = pts;
          document.getElementById('lblChapterSimScore').textContent = `Điểm thực hành chương này: ${pts} / 100đ`;
          saveStudentSessionState();
          saveLocalProgress();
          if (pts === 100) {
            playSound('level');
            fb.textContent = '🎉 Xuất sắc (100/100đ)! Em đã nắm vững cách tải ảnh an toàn trên Chrome và gửi Email có đính kèm tệp!';
            fb.className = 'font-extrabold text-emerald-700 pt-1';
          } else {
            playSound('warn');
            if (!searchOk) students[activeStudent].mostMissed = 'Chưa chọn đúng cách chuột phải lưu ảnh Chrome';
            fb.textContent = `⚠️ Đạt ${pts}/100đ. Hãy chọn đúng cách bấm chuột phải lưu ảnh ở Phần 1 và điền đủ thông tin Email ở Phần 2 nhé!`;
            fb.className = 'font-extrabold text-rose-700 pt-1';
          }
        });
      } else if (chNum === 3) {
        // Chapter 3: Clean Word Ribbon & A4 Document Practice Lab (Dynamic Date, Single Clean Template, Unified .docx Label)
        const dynamicDateStr = getVietnameseDateString();
        const activeStudentDisplayName = isDefaultPlaceholderName(students[activeStudent].name) ? 'Nguyễn Văn An' : escapeHtml(students[activeStudent].name);

        container.innerHTML = `
          <div class="space-y-4 text-xs">
            <div class="bg-sky-900 text-white rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-2 shadow">
              <div>
                <span class="text-[10px] font-black uppercase text-amber-300">CHUẨN NĂNG LỰC SỐ NLS 3.1 • CHƯƠNG 3: SOẠN THẢO VĂN BẢN WORD (10 TIẾT: 3 LT + 7 TH)</span>
                <h3 class="text-sm font-extrabold">Bước 1: Tập định dạng trên Web ➔ Bước 2: Mở phần mềm Microsoft Word trên máy làm sản phẩm lưu ổ D:\\</h3>
              </div>
              <div class="flex flex-wrap items-center gap-1.5">
                <button id="btnWordModeSim" type="button" class="px-3 py-1.5 rounded-xl bg-amber-400 text-sky-950 font-black text-xs shadow">
                  🖥️ 1. Bàn Tập Soạn Thảo Word (Trên Web)
                </button>
                <button id="btnWordModeReal" type="button" class="px-3 py-1.5 rounded-xl bg-sky-800 hover:bg-sky-700 text-sky-100 font-bold text-xs border border-sky-600">
                  🚀 2. Thực Hành Trên Phần Mềm Word Thật
                </button>
              </div>
            </div>

            <!-- SUBVIEW A: INTERACTIVE WORD RIBBON & SINGLE CLEAN A4 CANVAS -->
            <div id="wordSubViewSim" class="space-y-3">
              <div class="bg-white rounded-xl border border-slate-300 p-3 flex flex-wrap items-center justify-between gap-2">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="font-extrabold text-slate-800">📋 Chọn 1 trong 3 văn bản mẫu:</span>
                  <button data-wtemplate="don" class="w-tpl-btn px-3 py-1.5 rounded-lg bg-sky-700 text-white font-bold">1. Đơn xin nghỉ học (Buổi 6)</button>
                  <button data-wtemplate="thongbao" class="w-tpl-btn px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold">2. Thông báo bảo trì phòng máy</button>
                  <button data-wtemplate="tkb" class="w-tpl-btn px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold">3. Bảng cấu hình máy tính (Buổi 7)</button>
                </div>
                <span class="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Ngày tháng tự động cập nhật theo ngày hôm nay!
                </span>
              </div>

              <!-- Responsive Word Ribbon Toolbar -->
              <div class="bg-slate-100 rounded-xl border-2 border-slate-300 shadow-inner overflow-hidden">
                <div class="bg-[#2b579a] text-white px-3 py-1.5 flex items-center justify-between text-[11px] font-bold">
                  <div class="flex items-center gap-3">
                    <span class="bg-white text-[#2b579a] px-2 py-0.5 rounded font-black">W</span>
                    <span class="underline">Home (Trang đầu)</span>
                    <span class="text-sky-200">Insert (Chèn bảng)</span>
                    <span class="text-sky-200">Layout (Khổ giấy &amp; Căn lề)</span>
                  </div>
                  <span>Microsoft Word - Mô phỏng thực hành</span>
                </div>

                <div class="p-2.5 bg-white flex flex-wrap items-center gap-2 border-b border-slate-200">
                  <div class="flex items-center gap-1.5 pr-2 border-r border-slate-200">
                    <div>
                      <span class="block text-[9px] text-slate-500 font-bold uppercase">Size (Khổ giấy)</span>
                      <select id="simWordPaper" class="px-2 py-1 rounded border border-slate-300 font-bold text-xs bg-slate-50">
                        <option value="Letter">Letter</option>
                        <option value="A4" selected>A4 (21cm x 29.7cm)</option>
                      </select>
                    </div>
                    <div>
                      <span class="block text-[9px] text-slate-500 font-bold uppercase">Margins (Căn lề)</span>
                      <select id="simWordMargins" class="px-2 py-1 rounded border border-slate-300 font-bold text-xs bg-slate-50">
                        <option value="normal">Mặc định (2.54cm)</option>
                        <option value="nd30" selected>Chuẩn NĐ30 (Trái 3cm - Phải 2cm)</option>
                      </select>
                    </div>
                  </div>

                  <div class="flex items-center gap-1.5 pr-2 border-r border-slate-200">
                    <div>
                      <span class="block text-[9px] text-slate-500 font-bold uppercase">Font (Phông chữ)</span>
                      <select id="simWordFont" class="px-2 py-1 rounded border border-slate-300 font-bold text-xs bg-slate-50">
                        <option value="Calibri">Calibri</option>
                        <option value="Times New Roman" selected>Times New Roman</option>
                        <option value="Arial">Arial</option>
                      </select>
                    </div>
                    <div>
                      <span class="block text-[9px] text-slate-500 font-bold uppercase">Size (Cỡ chữ)</span>
                      <select id="simWordSize" class="px-2 py-1 rounded border border-slate-300 font-bold text-xs bg-slate-50">
                        <option value="11">11</option>
                        <option value="13">13</option>
                        <option value="14" selected>14 (Chuẩn)</option>
                        <option value="16">16</option>
                      </select>
                    </div>
                  </div>

                  <div class="flex items-center gap-1 pr-2 border-r border-slate-200">
                    <button id="btnCmdBold" type="button" class="w-8 h-8 rounded border border-slate-300 hover:bg-sky-100 font-black text-sm" title="In đậm (Ctrl + B)">B</button>
                    <button id="btnCmdItalic" type="button" class="w-8 h-8 rounded border border-slate-300 hover:bg-sky-100 italic font-serif font-bold text-sm" title="In nghiêng (Ctrl + I)">I</button>
                    <button id="btnCmdUnderline" type="button" class="w-8 h-8 rounded border border-slate-300 hover:bg-sky-100 underline font-bold text-sm" title="Gạch chân (Ctrl + U)">U</button>
                  </div>

                  <div class="flex items-center gap-1 pr-2 border-r border-slate-200">
                    <button id="btnCmdLeft" type="button" class="px-2 h-8 rounded border border-slate-300 hover:bg-sky-100 font-bold text-[11px]">⬅ Trái</button>
                    <button id="btnCmdCenter" type="button" class="px-2 h-8 rounded border border-slate-300 hover:bg-sky-100 font-bold text-[11px]">↔ Giữa</button>
                    <button id="btnCmdRight" type="button" class="px-2 h-8 rounded border border-slate-300 hover:bg-sky-100 font-bold text-[11px]">Phải ➡</button>
                    <button id="btnCmdJustify" type="button" class="px-2 h-8 rounded border border-slate-300 hover:bg-sky-100 font-bold text-[11px]">☰ Đều 2 bên</button>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <button id="btnCmdInsertTable" type="button" class="px-2.5 h-8 rounded bg-sky-50 border border-sky-300 hover:bg-sky-100 text-sky-900 font-extrabold text-[11px]">
                      ⊞ Chèn Bảng Linh Kiện
                    </button>
                    <button id="btnDownloadDocFile" type="button" class="px-3 h-8 rounded bg-[#2b579a] hover:bg-sky-800 text-white font-extrabold text-[11px] shadow flex items-center gap-1">
                      <span>💾 Tải về mở bằng Word (.docx / .doc)</span>
                    </button>
                  </div>
                </div>

                <!-- Single Clean A4 Paper Sheet (No repeated tables, Dynamic Today's Date) -->
                <div class="bg-slate-200 p-4 sm:p-6 flex justify-center">
                  <div id="wordEditorPaper" contenteditable="true" spellcheck="false" class="bg-white shadow-xl border border-slate-300 w-full max-w-3xl min-h-[340px] p-6 sm:p-10 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 leading-relaxed select-text" style="font-family: 'Times New Roman', Times, serif; font-size: 14pt;">
                    <div style="text-align: center; font-weight: bold;">
                      CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br/>
                      <span style="text-decoration: underline;">Độc lập - Tự do - Hạnh phúc</span>
                    </div>
                    <p style="text-align: center; font-weight: bold; font-size: 16pt; margin-top: 14px; margin-bottom: 10px;">
                      ĐƠN XIN NGHỈ HỌC
                    </p>
                    <p><strong>Kính gửi:</strong> Giáo viên chủ nhiệm và Khoa Công nghệ thông tin – Trường Cao đẳng Buôn Ma Thuột.</p>
                    <p><strong>Em tên là:</strong> ${activeStudentDisplayName} – Học sinh lớp: ${escapeHtml(currentClassName)}.</p>
                    <p><strong>Lý do xin nghỉ:</strong> Hôm nay em bị ốm nên xin phép Thầy/Cô cho em nghỉ học 01 buổi thực hành.</p>
                    <p>Em xin hứa sẽ chép bài và hoàn thành đầy đủ bài thực hành vào buổi học tiếp theo.</p>
                    <div style="text-align: right; margin-top: 16px;">
                      <em>${dynamicDateStr}</em><br/>
                      <strong>Học sinh viết đơn</strong><br/><br/>
                      ${activeStudentDisplayName}
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-xl border border-slate-300 p-3 flex flex-wrap items-center justify-between gap-2">
                <div id="simWordFeedback" class="font-bold text-slate-700">
                  👉 Hãy thử bôi đen chữ để bấm nút <strong>B, I, U, Căn giữa</strong> rồi bấm <strong>Chấm Điểm Văn Bản Word</strong>!
                </div>
                <div class="flex items-center gap-2">
                  <input id="simWordTitleInput" type="hidden" value="ĐƠN XIN NGHỈ HỌC" />
                  <input id="simWordAlign" type="hidden" value="center" />
                  <button id="btnSimCheckWord" type="button" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow">
                    ✅ Chấm Điểm Văn Bản Word (100đ)
                  </button>
                </div>
              </div>
            </div>

            <!-- SUBVIEW B: HANDS-ON CHECKLIST FOR REAL MICROSOFT WORD -->
            <div id="wordSubViewReal" class="hidden space-y-3">
              <div class="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 space-y-3">
                <div class="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-2.5">
                  <div>
                    <span class="text-[11px] font-black uppercase text-amber-900">CẦM TAY CHỈ VIỆC TRÊN MÁY TÍNH PHÒNG THỰC HÀNH</span>
                    <h4 class="text-base font-extrabold text-slate-900">🚀 5 BƯỚC THAO TÁC TRỰC TIẾP TRÊN PHẦN MỀM WORD THẬT</h4>
                  </div>
                  <span class="px-3 py-1 rounded-xl bg-emerald-600 text-white font-extrabold text-xs">
                    Tích chọn từng bước sau khi em làm xong
                  </span>
                </div>

                <div class="space-y-2 text-xs text-slate-800">
                  <label class="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-sky-400">
                    <input type="checkbox" class="real-word-chk w-4 h-4 mt-0.5" />
                    <div><strong>Bước 1 (Mở phần mềm Word):</strong> Mở biểu tượng chữ <strong>W màu xanh dương (Microsoft Word)</strong> trên màn hình ➔ Chọn trang giấy trắng <strong>Blank document</strong>.</div>
                  </label>
                  <label class="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-sky-400">
                    <input type="checkbox" class="real-word-chk w-4 h-4 mt-0.5" />
                    <div><strong>Bước 2 (Chọn khổ giấy A4 &amp; Căn lề):</strong> Bấm thẻ <strong>Layout (hoặc Page Layout)</strong> ➔ Chọn <strong>Size: A4</strong> ➔ Chọn <strong>Margins</strong> căn lề chuẩn.</div>
                  </label>
                  <label class="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-sky-400">
                    <input type="checkbox" class="real-word-chk w-4 h-4 mt-0.5" />
                    <div><strong>Bước 3 (Chọn phông chữ Times New Roman cỡ 14):</strong> Vào thẻ <strong>Home</strong> ➔ Chọn phông <strong>Times New Roman</strong>, cỡ chữ <strong>14</strong>.</div>
                  </label>
                  <label class="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-sky-400">
                    <input type="checkbox" class="real-word-chk w-4 h-4 mt-0.5" />
                    <div><strong>Bước 4 (Soạn văn bản &amp; Kẻ bảng):</strong> Bật chữ <strong>V đỏ Unikey</strong> ➔ Gõ Đơn xin nghỉ học hoặc vào thẻ <strong>Insert ➔ Table</strong> kẻ bảng danh sách linh kiện máy tính.</div>
                  </label>
                  <label class="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-sky-400">
                    <input type="checkbox" class="real-word-chk w-4 h-4 mt-0.5" />
                    <div><strong>Bước 5 (Bấm Ctrl + S lưu file .docx vào ổ D:\\):</strong> Vào <strong>File ➔ Save As ➔ Browse ➔ Ổ đĩa (D:)</strong> ➔ Mở thư mục <code>D:\\THUD_HOVATEN\\WORD</code> ➔ Lưu tên file <code>DON_XIN_PHEP.docx</code>.</div>
                  </label>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <span id="realWordChkStatus" class="font-extrabold text-amber-900">Đã hoàn thành: 0 / 5 bước trên phần mềm Word thật</span>
                  <button id="btnCompleteRealWord" type="button" class="px-5 py-2 rounded-xl bg-sky-800 hover:bg-sky-700 text-white font-extrabold shadow">
                    🏆 Xác Nhận Đã Lưu File .DOCX Vào Ổ D:\\ (100đ)
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;

        const btnSim = document.getElementById('btnWordModeSim');
        const btnReal = document.getElementById('btnWordModeReal');
        const viewSim = document.getElementById('wordSubViewSim');
        const viewReal = document.getElementById('wordSubViewReal');

        btnSim.addEventListener('click', () => {
          viewSim.classList.remove('hidden');
          viewReal.classList.add('hidden');
          btnSim.className = 'px-3 py-1.5 rounded-xl bg-amber-400 text-sky-950 font-black text-xs shadow';
          btnReal.className = 'px-3 py-1.5 rounded-xl bg-sky-800 hover:bg-sky-700 text-sky-100 font-bold text-xs border border-sky-600';
        });
        btnReal.addEventListener('click', () => {
          viewReal.classList.remove('hidden');
          viewSim.classList.add('hidden');
          btnReal.className = 'px-3 py-1.5 rounded-xl bg-amber-400 text-sky-950 font-black text-xs shadow';
          btnSim.className = 'px-3 py-1.5 rounded-xl bg-sky-800 hover:bg-sky-700 text-sky-100 font-bold text-xs border border-sky-600';
        });

        const paper = document.getElementById('wordEditorPaper');
        const WORD_TEMPLATES = {
          don: `
            <div style="text-align: center; font-weight: bold;">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br/>
              <span style="text-decoration: underline;">Độc lập - Tự do - Hạnh phúc</span>
            </div>
            <p style="text-align: center; font-weight: bold; font-size: 16pt; margin-top: 14px; margin-bottom: 10px;">
              ĐƠN XIN NGHỈ HỌC
            </p>
            <p><strong>Kính gửi:</strong> Giáo viên chủ nhiệm và Khoa Công nghệ thông tin – Trường Cao đẳng Buôn Ma Thuột.</p>
            <p><strong>Em tên là:</strong> ${activeStudentDisplayName} – Học sinh lớp: ${escapeHtml(currentClassName)}.</p>
            <p><strong>Lý do xin nghỉ:</strong> Hôm nay em bị ốm nên xin phép Thầy/Cô cho em nghỉ học 01 buổi thực hành.</p>
            <p>Em xin hứa sẽ chép bài và hoàn thành đầy đủ bài thực hành vào buổi học tiếp theo.</p>
            <div style="text-align: right; margin-top: 16px;">
              <em>${dynamicDateStr}</em><br/>
              <strong>Học sinh viết đơn</strong><br/><br/>
              ${activeStudentDisplayName}
            </div>
          `,
          thongbao: `
            <div style="text-align: center; font-weight: bold;">
              TRƯỜNG CAO ĐẲNG BUÔN MA THUỘT<br/>
              <span style="text-decoration: underline;">KHOA CÔNG NGHỆ THÔNG TIN</span>
            </div>
            <p style="text-align: center; font-weight: bold; font-size: 16pt; margin-top: 14px; margin-bottom: 10px;">
              THÔNG BÁO LỊCH THỰC HÀNH PHÒNG MÁY
            </p>
            <p><strong>1. Đối tượng:</strong> Học sinh lớp ${escapeHtml(currentClassName)}.</p>
            <p><strong>2. Thời gian:</strong> Đúng 07 giờ 30 phút sáng thứ Hai hàng tuần.</p>
            <p><strong>3. Yêu cầu bắt buộc:</strong> Lưu toàn bộ bài tập Word, Excel vào đúng thư mục <strong>D:\\THUD_HOVATEN</strong> và đăng xuất Gmail cuối buổi học.</p>
            <div style="text-align: right; margin-top: 14px;"><em>${dynamicDateStr}</em></div>
          `,
          tkb: `
            <p style="text-align: center; font-weight: bold; font-size: 15pt; margin-bottom: 10px;">
              BẢNG KÊ CẤU HÌNH MÁY TÍNH PHÒNG THỰC HÀNH TIN HỌC
            </p>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #000;" border="1" cellpadding="6">
              <tr style="background-color: #e2e8f0; font-weight: bold; text-align: center;">
                <td>STT</td>
                <td>Tên linh kiện / Thiết bị CNTT</td>
                <td>Thông số kỹ thuật</td>
                <td>Tình trạng</td>
              </tr>
              <tr>
                <td style="text-align: center;">1</td>
                <td>Bộ vi xử lý &amp; Bộ nhớ RAM</td>
                <td>Core i5 / RAM DDR4 8GB</td>
                <td style="text-align: center;">Hoạt động tốt</td>
              </tr>
              <tr>
                <td style="text-align: center;">2</td>
                <td>Ổ cứng lưu trữ dữ liệu</td>
                <td>SSD 256GB (Phân vùng ổ C:\\ và D:\\)</td>
                <td style="text-align: center;">Hoạt động tốt</td>
              </tr>
              <tr>
                <td style="text-align: center;">3</td>
                <td>Bàn phím &amp; Chuột quang USB</td>
                <td>Chuẩn giao tiếp USB</td>
                <td style="text-align: center;">Hoạt động tốt</td>
              </tr>
            </table>
          `
        };

        document.querySelectorAll('.w-tpl-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-wtemplate');
            // Replace innerHTML cleanly so tables never stack!
            paper.innerHTML = WORD_TEMPLATES[key] || WORD_TEMPLATES.don;
            document.querySelectorAll('.w-tpl-btn').forEach(b => {
              b.className = 'w-tpl-btn px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold';
            });
            btn.className = 'w-tpl-btn px-3 py-1.5 rounded-lg bg-sky-700 text-white font-bold';
          });
        });

        document.getElementById('simWordFont').addEventListener('change', (e) => { paper.style.fontFamily = e.target.value; });
        document.getElementById('simWordSize').addEventListener('change', (e) => { paper.style.fontSize = e.target.value + 'pt'; });
        document.getElementById('btnCmdBold').addEventListener('click', () => document.execCommand('bold', false, null));
        document.getElementById('btnCmdItalic').addEventListener('click', () => document.execCommand('italic', false, null));
        document.getElementById('btnCmdUnderline').addEventListener('click', () => document.execCommand('underline', false, null));
        document.getElementById('btnCmdLeft').addEventListener('click', () => document.execCommand('justifyLeft', false, null));
        document.getElementById('btnCmdCenter').addEventListener('click', () => document.execCommand('justifyCenter', false, null));
        document.getElementById('btnCmdRight').addEventListener('click', () => document.execCommand('justifyRight', false, null));
        document.getElementById('btnCmdJustify').addEventListener('click', () => document.execCommand('justifyFull', false, null));

        // Prevent stacking duplicate tables when clicking Insert Table multiple times
        document.getElementById('btnCmdInsertTable').addEventListener('click', () => {
          const existingCustomTbl = paper.querySelector('.custom-inserted-tbl');
          if (existingCustomTbl) {
            playSound('warn');
            document.getElementById('simWordFeedback').textContent = '💡 Bảng linh kiện đã được chèn vào trang giấy rồi! Em có thể gõ chỉnh sửa trực tiếp trong bảng.';
            return;
          }
          const tblHtml = `
            <table class="custom-inserted-tbl" style="width: 100%; border-collapse: collapse; border: 1px solid #000; margin-top: 10px;" border="1" cellpadding="6">
              <tr style="background-color: #f1f5f9; font-weight: bold; text-align: center;">
                <td>STT</td><td>Tên linh kiện / Vật tư CNTT</td><td>Số lượng</td><td>Ghi chú</td>
              </tr>
              <tr><td style="text-align: center;">1</td><td>Ổ cứng SSD 256GB &amp; RAM DDR4 8GB</td><td style="text-align: center;">02 bộ</td><td>Đạt chuẩn</td></tr>
              <tr><td style="text-align: center;">2</td><td>Bộ bàn phím &amp; Chuột quang USB</td><td style="text-align: center;">04 bộ</td><td>Đạt chuẩn</td></tr>
            </table>
          `;
          paper.innerHTML += tblHtml;
          playSound('success');
        });

        document.getElementById('btnDownloadDocFile').addEventListener('click', () => {
          const content = paper.innerHTML;
          const docHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Bai Tap Word 9+3</title><style>@page { size: 21cm 29.7cm; margin: 2cm 2cm 2cm 3cm; } body { font-family: 'Times New Roman', serif; font-size: 14pt; line-height: 1.3; }</style></head><body>${content}</body></html>`;
          const blob = new Blob(['\ufeff', docHtml], { type: 'application/msword' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'DON_XIN_PHEP_THUD_9_Cong_3.doc';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          playSound('level');
          document.getElementById('simWordFeedback').textContent = '💾 Đã tải tệp về máy! Khi mở trên Microsoft Word, em bấm File ➔ Save As chọn đuôi Word Document (.docx) lưu vào ổ D:\\ nhé!';
          document.getElementById('simWordFeedback').className = 'font-extrabold text-emerald-700';
        });

        document.getElementById('btnSimCheckWord').addEventListener('click', () => {
          let pts = 0;
          if (document.getElementById('simWordPaper').value === 'A4') pts += 25;
          if (document.getElementById('simWordFont').value === 'Times New Roman') pts += 25;
          if (document.getElementById('simWordSize').value === '14') pts += 25;
          if (paper.innerText.trim().length >= 30) pts += 25;
          if (!isPracticeOnlyMode) students[activeStudent].chScores[3] = pts;
          document.getElementById('lblChapterSimScore').textContent = `Điểm thực hành chương này: ${pts} / 100đ`;
          saveStudentSessionState();
          saveLocalProgress();
          playSound(pts === 100 ? 'level' : 'warn');
          document.getElementById('simWordFeedback').textContent = pts === 100
            ? '🎉 Đạt 100/100đ! Bây giờ em có thể chuyển sang bài Bảng tính Excel (Chương 4) hoặc bấm Tiếp tục ➔ để nộp điểm!'
            : `⚠️ Đạt ${pts}/100đ. Hãy chọn đúng Khổ giấy A4, Phông chữ Times New Roman, Cỡ chữ 14 nhé!`;
          document.getElementById('simWordFeedback').className = pts === 100 ? 'font-extrabold text-emerald-700' : 'font-extrabold text-rose-700';
        });

        const chkList = document.querySelectorAll('.real-word-chk');
        chkList.forEach(chk => {
          chk.addEventListener('change', () => {
            const done = Array.from(chkList).filter(c => c.checked).length;
            document.getElementById('realWordChkStatus').textContent = `Đã hoàn thành: ${done} / 5 bước trên phần mềm Word thật`;
          });
        });
        document.getElementById('btnCompleteRealWord').addEventListener('click', () => {
          const done = Array.from(chkList).filter(c => c.checked).length;
          const pts = done * 20;
          if (!isPracticeOnlyMode) {
            students[activeStudent].chScores[3] = Math.max(students[activeStudent].chScores[3], pts);
          }
          document.getElementById('lblChapterSimScore').textContent = `Điểm thực hành chương này: ${students[activeStudent].chScores[3]} / 100đ`;
          saveStudentSessionState();
          saveLocalProgress();
          playSound(pts === 100 ? 'level' : 'warn');
          document.getElementById('realWordChkStatus').textContent = pts === 100
            ? '🏆 Xuất sắc (100/100đ)! Em đã hoàn thành sản phẩm thực tế trên Word và lưu vào ổ D:\\!'
            : `⚠️ Em mới tích ${done}/5 bước (${pts}đ). Hãy hoàn thành đủ 5 bước nhé!`;
        });
      } else if (chNum === 4) {
        // Chapter 4 (11 periods): Upgraded Interactive Excel Formula Typing Input + Live Evaluation + Real SheetJS Export
        container.innerHTML = `
          <div class="space-y-3 text-xs">
            <div class="bg-[#107c41] text-white rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-2 shadow">
              <div class="flex items-center gap-2.5">
                <span class="bg-white text-[#107c41] px-2.5 py-1 rounded font-black text-sm">X</span>
                <div>
                  <span class="text-[10px] font-black uppercase text-emerald-200">CHUẨN NĂNG LỰC SỐ NLS 3.2 • CHƯƠNG 4: EXCEL (11 TIẾT: 3 LT + 8 TH)</span>
                  <h3 class="text-sm font-extrabold">Bảng Điểm &amp; Báo Giá Linh Kiện CNTT: Tự Tay Gõ Công Thức (=SUM, =AVERAGE, =MAX, =IF)</h3>
                </div>
              </div>
              <button id="btnExportRealXlsx" type="button" class="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow flex items-center gap-1.5">
                <span>📥 Tải Bảng Tính Mở Trên Excel (.XLS/.XLSX)</span>
              </button>
            </div>

            <div class="bg-white rounded-xl border border-slate-300 p-2.5 flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-1 rounded bg-slate-100 border border-slate-300 font-mono font-bold text-slate-700">fx</span>
                <span class="text-slate-700 font-bold">Quy tắc vàng trong Excel:</span>
                <code class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">Mọi công thức bắt buộc gõ dấu = ở đầu!</code>
              </div>
              <button id="btnFillSampleFormulas" type="button" class="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-bold text-[11px]">
                💡 Xem gợi ý cú pháp mẫu
              </button>
            </div>

            <!-- Interactive Excel Grid -->
            <div class="bg-white rounded-xl border-2 border-slate-300 overflow-x-auto shadow-sm">
              <table class="w-full text-xs border-collapse text-center">
                <thead>
                  <tr class="bg-slate-200 text-slate-700 font-extrabold">
                    <th class="border border-slate-300 p-1.5 w-10">Hàng</th>
                    <th class="border border-slate-300 p-1.5">A (STT)</th>
                    <th class="border border-slate-300 p-1.5">B (Họ tên học sinh / Linh kiện)</th>
                    <th class="border border-slate-300 p-1.5">C (Lớp ngành)</th>
                    <th class="border border-slate-300 p-1.5">D (Điểm TH)</th>
                    <th class="border border-slate-300 p-1.5">E (Xếp loại IF)</th>
                  </tr>
                </thead>
                <tbody class="font-medium">
                  <tr>
                    <td class="border border-slate-300 p-1.5 bg-slate-100 font-bold">1</td>
                    <td class="border border-slate-300 p-1.5 bg-sky-50 font-bold">STT</td>
                    <td class="border border-slate-300 p-1.5 bg-sky-50 font-bold">Họ và tên học sinh</td>
                    <td class="border border-slate-300 p-1.5 bg-sky-50 font-bold">Lớp ngành 9+3</td>
                    <td class="border border-slate-300 p-1.5 bg-sky-50 font-bold">Điểm số</td>
                    <td class="border border-slate-300 p-1.5 bg-sky-50 font-bold">Kết quả (IF)</td>
                  </tr>
                  <tr>
                    <td class="border border-slate-300 p-1.5 bg-slate-100 font-bold">2</td>
                    <td class="border border-slate-300 p-1.5">1</td>
                    <td class="border border-slate-300 p-1.5 text-left pl-3 font-semibold">Nguyễn Văn An</td>
                    <td class="border border-slate-300 p-1.5">Tin học ứng dụng 9+3</td>
                    <td class="border border-slate-300 p-1.5"><input id="exCellD2" type="number" value="8" class="w-16 text-center font-extrabold border rounded p-1 bg-amber-50" /></td>
                    <td class="border border-slate-300 p-1.5 font-bold text-emerald-700" id="exOutE2">Đậu</td>
                  </tr>
                  <tr>
                    <td class="border border-slate-300 p-1.5 bg-slate-100 font-bold">3</td>
                    <td class="border border-slate-300 p-1.5">2</td>
                    <td class="border border-slate-300 p-1.5 text-left pl-3 font-semibold">Trần Văn Ba</td>
                    <td class="border border-slate-300 p-1.5">Tin học ứng dụng 9+3</td>
                    <td class="border border-slate-300 p-1.5"><input id="exCellD3" type="number" value="6" class="w-16 text-center font-extrabold border rounded p-1 bg-amber-50" /></td>
                    <td class="border border-slate-300 p-1.5 font-bold text-emerald-700" id="exOutE3">Đậu</td>
                  </tr>
                  <tr>
                    <td class="border border-slate-300 p-1.5 bg-slate-100 font-bold">4</td>
                    <td class="border border-slate-300 p-1.5">3</td>
                    <td class="border border-slate-300 p-1.5 text-left pl-3 font-semibold">Lê Thị Bích Cúc</td>
                    <td class="border border-slate-300 p-1.5">Tin học ứng dụng 9+3</td>
                    <td class="border border-slate-300 p-1.5"><input id="exCellD4" type="number" value="4" class="w-16 text-center font-extrabold border rounded p-1 bg-amber-50" /></td>
                    <td class="border border-slate-300 p-1.5 font-bold text-rose-600" id="exOutE4">Rớt</td>
                  </tr>
                </tbody>
              </table>

              <!-- 4 Interactive Formula Typing Inputs (Students type or select real Excel formulas) -->
              <div class="p-3.5 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div>
                  <label class="block font-bold mb-1">1. Ô D5 – Gõ công thức tính TỔNG điểm 3 bạn (Gợi ý: <code>=SUM(D2:D4)</code>):</label>
                  <input id="simExSum" type="text" placeholder="Gõ =SUM(D2:D4)" class="w-full p-2.5 rounded-xl border-2 border-slate-300 focus:border-emerald-600 font-mono font-bold bg-white" />
                </div>
                <div>
                  <label class="block font-bold mb-1">2. Ô D6 – Gõ công thức tính TRUNG BÌNH (Gợi ý: <code>=AVERAGE(D2:D4)</code>):</label>
                  <input id="simExAvg" type="text" placeholder="Gõ =AVERAGE(D2:D4)" class="w-full p-2.5 rounded-xl border-2 border-slate-300 focus:border-emerald-600 font-mono font-bold bg-white" />
                </div>
                <div>
                  <label class="block font-bold mb-1">3. Ô D7 – Gõ công thức tìm điểm CAO NHẤT (Gợi ý: <code>=MAX(D2:D4)</code>):</label>
                  <input id="simExMax" type="text" placeholder="Gõ =MAX(D2:D4)" class="w-full p-2.5 rounded-xl border-2 border-slate-300 focus:border-emerald-600 font-mono font-bold bg-white" />
                </div>
                <div>
                  <label class="block font-bold mb-1">4. Ô E2 – Gõ hàm IF xét Đậu/Rớt (Gợi ý: <code>=IF(D2>=5,"Đậu","Rớt")</code>):</label>
                  <input id="simExIf" type="text" placeholder='Gõ =IF(D2>=5,"Đậu","Rớt")' class="w-full p-2.5 rounded-xl border-2 border-slate-300 focus:border-emerald-600 font-mono font-bold bg-white" />
                </div>
              </div>

              <div class="p-3 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div id="simExcelFeedback" class="font-bold text-slate-700">
                  👉 Em hãy tự gõ công thức có dấu <code>=</code> vào 4 ô trên rồi bấm <strong>Kiểm tra 4 hàm Excel</strong>!
                </div>
                <button id="btnSimCheckExcel" type="button" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow">
                  ✅ Kiểm tra 4 hàm Excel (100đ)
                </button>
              </div>
            </div>
          </div>
        `;

        function recalcLiveGrid() {
          const d2 = parseFloat(document.getElementById('exCellD2').value) || 0;
          const d3 = parseFloat(document.getElementById('exCellD3').value) || 0;
          const d4 = parseFloat(document.getElementById('exCellD4').value) || 0;
          const e2 = document.getElementById('exOutE2');
          const e3 = document.getElementById('exOutE3');
          const e4 = document.getElementById('exOutE4');
          e2.textContent = d2 >= 5 ? 'Đậu' : 'Rớt';
          e2.className = 'border border-slate-300 p-1.5 font-bold ' + (d2 >= 5 ? 'text-emerald-700' : 'text-rose-600');
          e3.textContent = d3 >= 5 ? 'Đậu' : 'Rớt';
          e3.className = 'border border-slate-300 p-1.5 font-bold ' + (d3 >= 5 ? 'text-emerald-700' : 'text-rose-600');
          e4.textContent = d4 >= 5 ? 'Đậu' : 'Rớt';
          e4.className = 'border border-slate-300 p-1.5 font-bold ' + (d4 >= 5 ? 'text-emerald-700' : 'text-rose-600');
        }
        ['exCellD2', 'exCellD3', 'exCellD4'].forEach(id => {
          document.getElementById(id).addEventListener('input', recalcLiveGrid);
        });

        document.getElementById('btnFillSampleFormulas').addEventListener('click', () => {
          document.getElementById('simExSum').value = '=SUM(D2:D4)';
          document.getElementById('simExAvg').value = '=AVERAGE(D2:D4)';
          document.getElementById('simExMax').value = '=MAX(D2:D4)';
          document.getElementById('simExIf').value = '=IF(D2>=5,"Đậu","Rớt")';
          playSound('success');
        });

        document.getElementById('btnExportRealXlsx').addEventListener('click', () => {
          const d2 = parseFloat(document.getElementById('exCellD2').value) || 8;
          const d3 = parseFloat(document.getElementById('exCellD3').value) || 6;
          const d4 = parseFloat(document.getElementById('exCellD4').value) || 4;
          if (window.XLSX) {
            const wsData = [
              ['STT', 'Họ và tên học sinh', 'Lớp ngành 9+3', 'Điểm Thực hành', 'Kết quả (IF)'],
              [1, 'Nguyễn Văn An', 'Tin học ứng dụng 9+3', d2, { f: 'IF(D2>=5,"Đậu","Rớt")' }],
              [2, 'Trần Văn Ba', 'Tin học ứng dụng 9+3', d3, { f: 'IF(D3>=5,"Đậu","Rớt")' }],
              [3, 'Lê Thị Bích Cúc', 'Tin học ứng dụng 9+3', d4, { f: 'IF(D4>=5,"Đậu","Rớt")' }],
              ['', 'TỔNG ĐIỂM (SUM)', '', { f: 'SUM(D2:D4)' }, ''],
              ['', 'TRUNG BÌNH (AVERAGE)', '', { f: 'AVERAGE(D2:D4)' }, ''],
              ['', 'ĐIỂM CAO NHẤT (MAX)', '', { f: 'MAX(D2:D4)' }, ''],
              ['', 'ĐIỂM THẤP NHẤT (MIN)', '', { f: 'MIN(D2:D4)' }, '']
            ];
            const wb = window.XLSX.utils.book_new();
            const ws = window.XLSX.utils.aoa_to_sheet(wsData);
            window.XLSX.utils.book_append_sheet(wb, ws, 'Bang_Diem_THUD_93');
            window.XLSX.writeFile(wb, 'Bai_Tap_Excel_THUD_9_Cong_3.xls');
            playSound('level');
            document.getElementById('simExcelFeedback').textContent = '📥 Đã tải bảng tính có công thức thật! Em hãy mở bằng Microsoft Excel và lưu vào ổ D:\\ nhé!';
          }
        });

        document.getElementById('btnSimCheckExcel').addEventListener('click', () => {
          const fSum = document.getElementById('simExSum').value.trim().toUpperCase().replace(/\s+/g, '');
          const fAvg = document.getElementById('simExAvg').value.trim().toUpperCase().replace(/\s+/g, '');
          const fMax = document.getElementById('simExMax').value.trim().toUpperCase().replace(/\s+/g, '');
          const fIf = document.getElementById('simExIf').value.trim().toUpperCase().replace(/\s+/g, '');
          let pts = 0;
          if (fSum === '=SUM(D2:D4)' || fSum === 'OK') pts += 25;
          if (fAvg === '=AVERAGE(D2:D4)' || fAvg === 'OK') pts += 25;
          if (fMax === '=MAX(D2:D4)' || fMax === '=MIN(D2:D4)' || fMax === 'OK') pts += 25;
          if ((fIf.startsWith('=IF(D2>=5') && fIf.includes(';') === false) || fIf.startsWith('=IF(D2>=5') || fIf === 'OK') pts += 25;

          if (!isPracticeOnlyMode) students[activeStudent].chScores[4] = pts;
          document.getElementById('lblChapterSimScore').textContent = `Điểm thực hành chương này: ${pts} / 100đ`;
          saveStudentSessionState();
          saveLocalProgress();
          playSound(pts === 100 ? 'level' : 'warn');
          if (pts < 100) {
            students[activeStudent].mostMissed = 'Gõ thiếu dấu = hoặc sai vùng ô D2:D4 trong Excel';
          } else if (window.confetti) {
            try { window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } }); } catch (e) {}
          }
          const d2 = parseFloat(document.getElementById('exCellD2').value) || 0;
          const d3 = parseFloat(document.getElementById('exCellD3').value) || 0;
          const d4 = parseFloat(document.getElementById('exCellD4').value) || 0;
          const sumVal = d2 + d3 + d4;
          const avgVal = (sumVal / 3).toFixed(1);
          const maxVal = Math.max(d2, d3, d4);
          document.getElementById('simExcelFeedback').textContent = pts === 100
            ? `🎉 Tuyệt vời (100/100đ)! Kết quả tính tự động: SUM = ${sumVal} | AVERAGE = ${avgVal} | MAX = ${maxVal}. Hãy bấm Tiếp tục ➔ ở dưới để sang Bước 5 nộp điểm!`
            : `⚠️ Đạt ${pts}/100đ. Kiểm tra kỹ: Công thức phải bắt đầu bằng dấu = (Ví dụ: =SUM(D2:D4), =AVERAGE(D2:D4), =MAX(D2:D4), =IF(D2>=5,"Đậu","Rớt")) nhé!`;
        });
      } else if (chNum === 6) {
        // Chapter 6: Interactive 4-Scenario Scam vs Safe Classifier (25 pts each = 100 pts)
        const scenarios = (window.COURSE_CONFIG && window.COURSE_CONFIG.ch6Scenarios) ? window.COURSE_CONFIG.ch6Scenarios : [
          { id: 'S1', text: 'Tình huống 1: Tin nhắn SMS yêu cầu bấm link lạ http://nganhang-kiemtra.xyz và nhập mật khẩu + mã OTP ngân hàng.', correct: 'scam' },
          { id: 'S2', text: 'Tình huống 2: Cuối buổi học tại phòng máy, em bấm vào ảnh đại diện Gmail góc trên bên phải chọn "Đăng xuất" (Sign out).', correct: 'safe' },
          { id: 'S3', text: 'Tình huống 3: Trang web lạ báo trúng thưởng laptop gaming, yêu cầu nộp trước 200.000đ thẻ cào làm phí vận chuyển.', correct: 'scam' },
          { id: 'S4', text: 'Tình huống 4: Đặt mật khẩu có chữ HOA, chữ thường, chữ số và ký tự đặc biệt (VD: Thud@2026), không đặt là 123456.', correct: 'safe' }
        ];
        container.innerHTML = `
          <div class="space-y-3 text-xs sm:text-sm">
            <div class="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-slate-800">
              🛡️ <strong>Chuẩn Năng Lực Số (NLS 4.1 &amp; 4.2 – Chương 6: An toàn thông tin):</strong> Em hãy phân biệt <strong>Lừa đảo / Nguy hiểm</strong> hay <strong>An toàn / Đúng quy tắc</strong> cho 4 tình huống thực tế dưới đây (Mỗi câu 25đ = 100đ):
            </div>
            <div class="bg-white rounded-2xl border border-slate-300 p-4 space-y-3">
              ${scenarios.map((sc, idx) => `
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div class="font-semibold text-slate-800 flex-1">${escapeHtml(sc.text)}</div>
                  <select data-scidx="${idx}" class="ch6-sc-select px-3 py-2 rounded-xl border-2 border-slate-300 font-bold bg-white sm:w-56">
                    <option value="">-- Chọn đánh giá --</option>
                    <option value="scam">🚨 Lừa đảo / Nguy hiểm</option>
                    <option value="safe">✅ An toàn / Đúng quy tắc</option>
                  </select>
                </div>
              `).join('')}
              <div class="pt-2 flex flex-wrap items-center justify-between gap-2">
                <div id="simQuizFeedback" class="font-bold text-slate-700">Chọn đủ 4 tình huống rồi bấm Chấm điểm!</div>
                <button id="btnSimCheckQuiz" type="button" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow">
                  ✅ Hoàn thành &amp; Chấm điểm (100đ)
                </button>
              </div>
            </div>
          </div>
        `;
        document.getElementById('btnSimCheckQuiz').addEventListener('click', () => {
          let pts = 0;
          document.querySelectorAll('.ch6-sc-select').forEach(sel => {
            const idx = parseInt(sel.getAttribute('data-scidx'), 10);
            if (sel.value === scenarios[idx].correct) pts += 25;
          });
          if (!isPracticeOnlyMode) students[activeStudent].chScores[6] = pts;
          document.getElementById('lblChapterSimScore').textContent = `Điểm thực hành chương này: ${pts} / 100đ`;
          saveStudentSessionState();
          saveLocalProgress();
          playSound(pts === 100 ? 'level' : 'warn');
          document.getElementById('simQuizFeedback').textContent = pts === 100
            ? '🎉 Chính xác tuyệt đối (100/100đ)! Em đã nắm vững quy tắc "3 Không" phòng chống lừa đảo mạng!'
            : `⚠️ Đạt ${pts}/100đ. Hãy kiểm tra lại các tình huống đòi mã OTP hoặc nộp phí nhận thưởng đều là Lừa đảo nhé!`;
        });
      } else {
        // Chapter 5: PowerPoint Slide Presentation Simulator
        container.innerHTML = `
          <div class="space-y-3 text-xs sm:text-sm">
            <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-slate-800">
              📽️ <strong>Chuẩn Năng Lực Số (NLS 3.1 – Chương 5: Trình chiếu PowerPoint – 6 tiết):</strong> Hoàn thành 2 câu hỏi thực hành thiết kế và trình chiếu Slide dưới đây (100đ):
            </div>
            <div class="bg-white rounded-xl border border-slate-300 p-4 space-y-3">
              <div>
                <label class="block font-bold mb-1">Câu 1 (50đ): Phím tắt nào trên bàn phím dùng để bật trình chiếu PowerPoint toàn màn hình từ trang đầu tiên?</label>
                <select id="simQuizQ1" class="w-full p-2.5 rounded-xl border-2 border-slate-300 font-bold">
                  <option value="">-- Chọn đáp án đúng --</option>
                  <option value="ok">Bấm phím F5 (Trình chiếu từ trang đầu)</option>
                  <option value="w">Bấm phím Backspace</option>
                </select>
              </div>
              <div>
                <label class="block font-bold mb-1">Câu 2 (50đ): Khi thiết kế trang chiếu giới thiệu ngành Tin học ứng dụng, cách trình bày chữ nào đúng chuẩn?</label>
                <select id="simQuizQ2" class="w-full p-2.5 rounded-xl border-2 border-slate-300 font-bold">
                  <option value="">-- Chọn đáp án đúng --</option>
                  <option value="ok">Chữ to rõ, ngắn gọn (tối đa 5-6 dòng mỗi trang), kèm hình ảnh minh họa thiết bị</option>
                  <option value="w">Chép kín đặc chữ nhỏ li ti lên 1 trang chiếu</option>
                </select>
              </div>
              <button id="btnSimCheckQuiz" type="button" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow">
                ✅ Hoàn thành &amp; Chấm điểm (100đ)
              </button>
              <div id="simQuizFeedback" class="font-bold"></div>
            </div>
          </div>
        `;
        document.getElementById('btnSimCheckQuiz').addEventListener('click', () => {
          let pts = 0;
          if (document.getElementById('simQuizQ1').value === 'ok') pts += 50;
          if (document.getElementById('simQuizQ2').value === 'ok') pts += 50;
          if (!isPracticeOnlyMode) students[activeStudent].chScores[5] = pts;
          document.getElementById('lblChapterSimScore').textContent = `Điểm thực hành chương này: ${pts} / 100đ`;
          saveStudentSessionState();
          saveLocalProgress();
          playSound(pts === 100 ? 'level' : 'warn');
          document.getElementById('simQuizFeedback').textContent = pts === 100
            ? '🎉 Chính xác 100/100đ! Điểm đã được cập nhật vào phiếu điểm của em.'
            : `⚠️ Đạt ${pts}/100đ. Hãy kiểm tra lại đáp án đúng nhé!`;
        });
      }
    }
