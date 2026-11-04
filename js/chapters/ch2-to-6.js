// ============================================================================
// MO-DUN MO PHONG THUC HANH CHUONG 2 DEN CHUONG 6 (js/chapters/ch2-to-6.js)
// Chuyen nganh trong tam: Trung cap Tin hoc ung dung (He 9+3)
// ============================================================================

// =========================================================================
    // INTERACTIVE SIMULATORS FOR CHAPTERS 2 TO 6 (100 POINTS EACH)
    // =========================================================================
    function renderChapterSimulator(chNum) {
      const container = document.getElementById('chapterSimContainer');
      const curScore = students[activeStudent].chScores[chNum] || 0;
      document.getElementById('lblChapterSimScore').textContent = `Điểm thực hành chương này: ${curScore} / 100đ`;

      if (chNum === 2) {
        // Chapter 2: Virtual Gmail & Search Simulator
        container.innerHTML = `
          <div class="space-y-4">
            <div class="bg-sky-50 border border-sky-200 rounded-xl p-3 text-xs text-slate-800">
              📧 <strong>Bài thực hành mô phỏng Chương 2 (Không cần tài khoản Gmail thật):</strong> Em hãy điền đầy đủ 4 ô dưới đây để gửi 01 bức thư điện tử nộp bài tập cho Giảng viên Khoa CNTT:
            </div>
            <div class="bg-white rounded-xl border border-slate-300 p-4 space-y-3 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">1. Người nhận (To) - Gõ địa chỉ email của thầy/khoa (ví dụ: <code>khoacntt@bmtc.edu.vn</code>):</label>
                <input id="simEmailTo" type="text" value="khoacntt@bmtc.edu.vn" class="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">2. Tiêu đề thư (Subject) - Ghi rõ Họ tên và Lớp nghề:</label>
                <input id="simEmailSub" type="text" placeholder="Ví dụ: Nộp bài thực hành Tin học - Nguyễn Văn An" class="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">3. Nội dung thư (Có lời chào thầy/cô và báo cáo nộp bài):</label>
                <textarea id="simEmailBody" rows="3" placeholder="Em chào thầy, em là Nguyễn Văn An lớp Điện 9+3. Em xin gửi file bài tập thực hành ạ." class="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"></textarea>
              </div>
              <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
                <label class="flex items-center gap-2 font-bold text-sky-900 cursor-pointer bg-sky-50 px-3 py-2 rounded-lg border border-sky-200">
                  <input id="simEmailAttach" type="checkbox" class="w-4 h-4" />
                  <span>📎 Đính kèm tệp từ ổ D:\\ (<code>BaiTap_Chuong2.docx</code>)</span>
                </label>
                <button id="btnSimSendEmail" type="button" class="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-extrabold shadow">
                  🚀 Gửi Thư Điện Tử & Chấm Điểm (100đ)
                </button>
              </div>
              <div id="simEmailFeedback" class="font-bold text-slate-600 pt-1"></div>
            </div>
          </div>
        `;
        document.getElementById('btnSimSendEmail').addEventListener('click', () => {
          const to = document.getElementById('simEmailTo').value.trim();
          const sub = document.getElementById('simEmailSub').value.trim();
          const body = document.getElementById('simEmailBody').value.trim();
          const att = document.getElementById('simEmailAttach').checked;
          const fb = document.getElementById('simEmailFeedback');
          let pts = 0;
          if (to.includes('@')) pts += 25;
          if (sub.length >= 5) pts += 25;
          if (body.length >= 10) pts += 25;
          if (att) pts += 25;
          students[activeStudent].chScores[2] = pts;
          document.getElementById('lblChapterSimScore').textContent = `Điểm thực hành chương này: ${pts} / 100đ`;
          saveLocalProgress();
          if (pts === 100) {
            playSound('level');
            fb.textContent = '🎉 Xuất sắc (100/100đ)! Em đã soạn và gửi Email đúng chuẩn hành chính có đính kèm tệp!';
            fb.className = 'font-extrabold text-emerald-700 pt-1';
          } else {
            playSound('warn');
            fb.textContent = `⚠️ Đạt ${pts}/100đ. Nhớ điền đủ: Email có dấu @, Tiêu đề thư, Nội dung lời chào và tích chọn Đính kèm tệp nhé!`;
            fb.className = 'font-extrabold text-rose-700 pt-1';
          }
        });
      } else if (chNum === 3) {
        // Chapter 3: Full Word 2016 Ribbon & A4 Document Practice Lab + Real Word 2016 Bridge
        container.innerHTML = `
          <div class="space-y-4 text-xs">
            <!-- Mode Switcher: 1. Tập trên Trình mô phỏng Word Web -> 2. Thực hành trên phần mềm Word 2016 thật tại máy -->
            <div class="bg-sky-900 text-white rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-2 shadow">
              <div>
                <span class="text-[10px] font-black uppercase text-amber-300">QUY TRÌNH THỰC HỌC – THỰC HÀNH (CHƯƠNG 3: WORD 2016)</span>
                <h3 class="text-sm font-extrabold">Bước 1: Tập thao tác nút bấm trên Web ➔ Bước 2: Mở Word 2016 thật trên máy làm ra sản phẩm lưu ổ D:\\</h3>
              </div>
              <div class="flex flex-wrap items-center gap-1.5">
                <button id="btnWordModeSim" type="button" class="px-3 py-1.5 rounded-xl bg-amber-400 text-sky-950 font-black text-xs shadow">
                  🖥️ 1. Bàn Tập Soạn Thảo Word (Trên Web)
                </button>
                <button id="btnWordModeReal" type="button" class="px-3 py-1.5 rounded-xl bg-sky-800 hover:bg-sky-700 text-sky-100 font-bold text-xs border border-sky-600">
                  🚀 2. Thực Hành Trên Phần Mềm Word 2016 Thật
                </button>
              </div>
            </div>

            <!-- SUBVIEW A: INTERACTIVE WORD 2016 RIBBON & A4 CANVAS -->
            <div id="wordSubViewSim" class="space-y-3">
              <!-- Practical Scenario Selector (3 Real-world products) -->
              <div class="bg-white rounded-xl border border-slate-300 p-3 flex flex-wrap items-center justify-between gap-2">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="font-extrabold text-slate-800">📋 Chọn sản phẩm thực tế cần soạn:</span>
                  <button data-wtemplate="don" class="w-tpl-btn px-3 py-1.5 rounded-lg bg-sky-700 text-white font-bold">1. Đơn xin nghỉ học (Buổi 6)</button>
                  <button data-wtemplate="thongbao" class="w-tpl-btn px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold">2. Thông báo lịch thực hành xưởng</button>
                  <button data-wtemplate="tkb" class="w-tpl-btn px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold">3. Bảng Thời khóa biểu / Danh sách tổ (Buổi 7)</button>
                </div>
                <span class="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Bấm chọn văn bản mẫu rồi dùng thanh công cụ Word bên dưới để chỉnh!
                </span>
              </div>

              <!-- Simulated Word 2016 Ribbon Toolbar (Exact Button Names) -->
              <div class="bg-slate-100 rounded-xl border-2 border-slate-300 shadow-inner overflow-hidden">
                <!-- Blue Word 2016 Top Title & Tabs -->
                <div class="bg-[#2b579a] text-white px-3 py-1.5 flex items-center justify-between text-[11px] font-bold">
                  <div class="flex items-center gap-3">
                    <span class="bg-white text-[#2b579a] px-2 py-0.5 rounded font-black">W</span>
                    <span class="underline">Home (Trang đầu)</span>
                    <span class="text-sky-200">Insert (Chèn bảng)</span>
                    <span class="text-sky-200">Layout (Khổ giấy & Căn lề)</span>
                  </div>
                  <span>Microsoft Word 2016 - Mô phỏng thực hành</span>
                </div>

                <!-- Ribbon Controls Row -->
                <div class="p-2.5 bg-white flex flex-wrap items-center gap-2 border-b border-slate-200">
                  <!-- Page Setup Group -->
                  <div class="flex items-center gap-1.5 pr-2 border-r border-slate-200">
                    <div>
                      <span class="block text-[9px] text-slate-500 font-bold uppercase">Size (Khổ giấy)</span>
                      <select id="simWordPaper" class="px-2 py-1 rounded border border-slate-300 font-bold text-xs bg-slate-50">
                        <option value="Letter">Letter (Mặc định sai)</option>
                        <option value="A4" selected>A4 (21cm x 29.7cm)</option>
                      </select>
                    </div>
                    <div>
                      <span class="block text-[9px] text-slate-500 font-bold uppercase">Margins (Căn lề chuẩn)</span>
                      <select id="simWordMargins" class="px-2 py-1 rounded border border-slate-300 font-bold text-xs bg-slate-50">
                        <option value="normal">Mặc định (2.54cm)</option>
                        <option value="nd30" selected>Chuẩn NĐ30 (Trái 3cm - Phải 2cm)</option>
                      </select>
                    </div>
                  </div>

                  <!-- Font Group -->
                  <div class="flex items-center gap-1.5 pr-2 border-r border-slate-200">
                    <div>
                      <span class="block text-[9px] text-slate-500 font-bold uppercase">Font (Phông chữ)</span>
                      <select id="simWordFont" class="px-2 py-1 rounded border border-slate-300 font-bold text-xs bg-slate-50">
                        <option value="Calibri">Calibri (Mặc định)</option>
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

                  <!-- Style Buttons B / I / U -->
                  <div class="flex items-center gap-1 pr-2 border-r border-slate-200">
                    <button id="btnCmdBold" type="button" class="w-8 h-8 rounded border border-slate-300 hover:bg-sky-100 font-black text-sm" title="In đậm (Ctrl + B)">B</button>
                    <button id="btnCmdItalic" type="button" class="w-8 h-8 rounded border border-slate-300 hover:bg-sky-100 italic font-serif font-bold text-sm" title="In nghiêng (Ctrl + I)">I</button>
                    <button id="btnCmdUnderline" type="button" class="w-8 h-8 rounded border border-slate-300 hover:bg-sky-100 underline font-bold text-sm" title="Gạch chân (Ctrl + U)">U</button>
                  </div>

                  <!-- Paragraph Alignment Buttons -->
                  <div class="flex items-center gap-1 pr-2 border-r border-slate-200">
                    <button id="btnCmdLeft" type="button" class="px-2 h-8 rounded border border-slate-300 hover:bg-sky-100 font-bold text-[11px]" title="Căn trái (Ctrl + L)">⬅ Trái</button>
                    <button id="btnCmdCenter" type="button" class="px-2 h-8 rounded border border-slate-300 hover:bg-sky-100 font-bold text-[11px]" title="Căn giữa (Ctrl + E)">↔ Giữa</button>
                    <button id="btnCmdRight" type="button" class="px-2 h-8 rounded border border-slate-300 hover:bg-sky-100 font-bold text-[11px]" title="Căn phải (Ctrl + R)">Phải ➡</button>
                    <button id="btnCmdJustify" type="button" class="px-2 h-8 rounded border border-slate-300 hover:bg-sky-100 font-bold text-[11px]" title="Căn đều 2 bên (Ctrl + J)">☰ Đều 2 bên</button>
                  </div>

                  <!-- Insert Table & Export to Real Word -->
                  <div class="flex items-center gap-1.5">
                    <button id="btnCmdInsertTable" type="button" class="px-2.5 h-8 rounded bg-sky-50 border border-sky-300 hover:bg-sky-100 text-sky-900 font-extrabold text-[11px]">
                      ⊞ Chèn Bảng 3x4
                    </button>
                    <button id="btnDownloadDocFile" type="button" class="px-3 h-8 rounded bg-[#2b579a] hover:bg-sky-800 text-white font-extrabold text-[11px] shadow flex items-center gap-1">
                      <span>💾 Lưu về ổ D:\\ mở bằng Word 2016 (.doc)</span>
                    </button>
                  </div>
                </div>

                <!-- Simulated A4 Paper Sheet -->
                <div class="bg-slate-200 p-4 sm:p-6 flex justify-center">
                  <div id="wordEditorPaper" contenteditable="true" spellcheck="false" class="bg-white shadow-xl border border-slate-300 w-full max-w-3xl min-h-[360px] p-6 sm:p-10 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 leading-relaxed select-text" style="font-family: 'Times New Roman', Times, serif; font-size: 14pt;">
                    <div style="text-align: center; font-weight: bold;">
                      CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br/>
                      <span style="text-decoration: underline;">Độc lập - Tự do - Hạnh phúc</span>
                    </div>
                    <p style="text-align: center; font-weight: bold; font-size: 16pt; margin-top: 14px; margin-bottom: 10px;">
                      ĐƠN XIN NGHỈ HỌC
                    </p>
                    <p><strong>Kính gửi:</strong> Giáo viên chủ nhiệm và Khoa Công nghệ thông tin – Trường Cao đẳng Buôn Ma Thuột.</p>
                    <p><strong>Em tên là:</strong> Nguyễn Văn An – Học sinh lớp: Trung cấp Tin học ứng dụng 9+3.</p>
                    <p><strong>Lý do xin nghỉ:</strong> Hôm nay em bị sốt cao nên xin phép Thầy/Cô cho em nghỉ học 01 buổi thực hành.</p>
                    <p>Em xin hứa sẽ chép bài và hoàn thành đầy đủ bài thực hành vào buổi học tiếp theo.</p>
                    <div style="text-align: right; margin-top: 16px;">
                      <em>Đắk Lắk, ngày 03 tháng 11 năm 2026</em><br/>
                      <strong>Học sinh viết đơn</strong><br/><br/>
                      Nguyễn Văn An
                    </div>
                  </div>
                </div>
              </div>

              <!-- Grading & Action Bar -->
              <div class="bg-white rounded-xl border border-slate-300 p-3 flex flex-wrap items-center justify-between gap-2">
                <div id="simWordFeedback" class="font-bold text-slate-700">
                  👉 Hãy bôi đen chữ trên trang giấy để thử nút <strong>B, I, U, Căn giữa</strong>, sửa Họ tên thật của em rồi bấm <strong>Chấm Điểm</strong>!
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

            <!-- SUBVIEW B: HANDS-ON CHECKLIST FOR REAL MICROSOFT WORD 2016 ON LAB PC -->
            <div id="wordSubViewReal" class="hidden space-y-3">
              <div class="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 space-y-3">
                <div class="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-2.5">
                  <div>
                    <span class="text-[11px] font-black uppercase text-amber-900">CẦM TAY CHỈ VIỆC TRÊN MÁY TÍNH PHÒNG THỰC HÀNH</span>
                    <h4 class="text-base font-extrabold text-slate-900">🚀 5 BƯỚC THAO TÁC TRỰC TIẾP TRÊN PHẦN MỀM WORD 2016 THẬT</h4>
                  </div>
                  <span class="px-3 py-1 rounded-xl bg-emerald-600 text-white font-extrabold text-xs">
                    Tích chọn từng bước sau khi em làm xong trên Word 2016
                  </span>
                </div>

                <div class="space-y-2 text-xs text-slate-800">
                  <label class="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-sky-400">
                    <input type="checkbox" class="real-word-chk w-4 h-4 mt-0.5" />
                    <div>
                      <strong>Bước 1 (Mở Word 2016 thật trên máy):</strong> Nhìn ra màn hình nền (Desktop) hoặc bấm nút <strong>Start</strong> góc dưới bên trái ➔ Mở biểu tượng chữ <strong>W màu xanh dương (Word 2016)</strong> ➔ Bấm vào trang giấy trắng <strong>Blank document</strong>.
                    </div>
                  </label>
                  <label class="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-sky-400">
                    <input type="checkbox" class="real-word-chk w-4 h-4 mt-0.5" />
                    <div>
                      <strong>Bước 2 (Chọn khổ giấy A4 & Căn lề):</strong> Bấm thẻ <strong>Layout</strong> (trên thanh menu ngang) ➔ Bấm nút <strong>Size</strong> chọn <strong>A4</strong> ➔ Bấm nút <strong>Margins</strong> chọn căn lề chuẩn.
                    </div>
                  </label>
                  <label class="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-sky-400">
                    <input type="checkbox" class="real-word-chk w-4 h-4 mt-0.5" />
                    <div>
                      <strong>Bước 3 (Chọn phông chữ Times New Roman cỡ 14):</strong> Quay lại thẻ <strong>Home</strong> (góc trên bên trái) ➔ Đổi ô phông chữ thành <strong>Times New Roman</strong>, ô cỡ chữ bên cạnh chọn số <strong>14</strong>.
                    </div>
                  </label>
                  <label class="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-sky-400">
                    <input type="checkbox" class="real-word-chk w-4 h-4 mt-0.5" />
                    <div>
                      <strong>Bước 4 (Gõ Đơn xin nghỉ học / Kẻ bảng Thời khóa biểu):</strong> Kiểm tra chữ <strong>V màu đỏ</strong> của Unikey ➔ Gõ nội dung văn bản (Dùng nút <strong>B</strong> in đậm, nút <strong>Căn giữa Ctrl+E</strong> cho dòng Quốc hiệu và Tiêu đề).
                    </div>
                  </label>
                  <label class="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-sky-400">
                    <input type="checkbox" class="real-word-chk w-4 h-4 mt-0.5" />
                    <div>
                      <strong>Bước 5 (Bấm Ctrl + S lưu vào ổ đĩa D:\\):</strong> Bấm <strong>File ➔ Save As ➔ Browse ➔ Ổ đĩa (D:)</strong> ➔ Mở thư mục tên mình (<code>D:\\TENNGHE_HOVATEN\\WORD</code>) ➔ Đặt tên file <code>DON_XIN_PHEP_HOVATEN.docx</code> rồi bấm <strong>Save</strong>.
                    </div>
                  </label>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <span id="realWordChkStatus" class="font-extrabold text-amber-900">Đã hoàn thành: 0 / 5 bước trên phần mềm Word 2016 thật</span>
                  <button id="btnCompleteRealWord" type="button" class="px-5 py-2 rounded-xl bg-sky-800 hover:bg-sky-700 text-white font-extrabold shadow">
                    🏆 Xác Nhận Đã Lưu File .DOCX Vào Ổ D:\\ (100đ)
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;

        // Mode switcher handlers
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

        // Template loader for 3 practical documents
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
            <p><strong>Em tên là:</strong> Nguyễn Văn An – Học sinh lớp: Trung cấp Tin học ứng dụng 9+3.</p>
            <p><strong>Lý do xin nghỉ:</strong> Hôm nay em bị sốt cao nên xin phép Thầy/Cô cho em nghỉ học 01 buổi thực hành.</p>
            <p>Em xin hứa sẽ chép bài và hoàn thành đầy đủ bài thực hành vào buổi học tiếp theo.</p>
            <div style="text-align: right; margin-top: 16px;">
              <em>Đắk Lắk, ngày 03 tháng 11 năm 2026</em><br/>
              <strong>Học sinh viết đơn</strong><br/><br/>
              Nguyễn Văn An
            </div>
          `,
          thongbao: `
            <div style="text-align: center; font-weight: bold;">
              TRƯỜNG CAO ĐẲNG BUÔN MA THUỘT<br/>
              <span style="text-decoration: underline;">XƯỞNG THỰC HÀNH NGHỀ 9+3</span>
            </div>
            <p style="text-align: center; font-weight: bold; font-size: 16pt; margin-top: 14px; margin-bottom: 10px;">
              THÔNG BÁO LỊCH THỰC HÀNH TẠI XƯỞNG
            </p>
            <p><strong>1. Đối tượng:</strong> Toàn thể học sinh lớp Trung cấp hệ 9+3 (50 học sinh).</p>
            <p><strong>2. Thời gian:</strong> Đúng 07 giờ 30 phút sáng thứ Hai hàng tuần.</p>
            <p><strong>3. Yêu cầu bắt buộc:</strong> Mặc đồng phục bảo hộ lao động, mang giày kín mũi và lưu toàn bộ bài tập vào ổ đĩa <strong>D:\\</strong> trên máy phòng thực hành.</p>
          `,
          tkb: `
            <p style="text-align: center; font-weight: bold; font-size: 15pt; margin-bottom: 10px;">
              BẢNG PHÂN CÔNG CA THỰC HÀNH TỔ 1 (LỚP 9+3)
            </p>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #000;" border="1" cellpadding="6">
              <tr style="background-color: #e2e8f0; font-weight: bold; text-align: center;">
                <td>STT</td>
                <td>Họ và tên học sinh</td>
                <td>Lớp nghề 9+3</td>
                <td>Vị trí máy thực hành</td>
              </tr>
              <tr>
                <td style="text-align: center;">1</td>
                <td>Nguyễn Văn An</td>
                <td>Tin học ứng dụng 9+3</td>
                <td style="text-align: center;">Máy 01 (Ca 1)</td>
              </tr>
              <tr>
                <td style="text-align: center;">2</td>
                <td>Trần Văn Ba</td>
                <td>Tin học ứng dụng 9+3</td>
                <td style="text-align: center;">Máy 01 (Ca 2)</td>
              </tr>
              <tr>
                <td style="text-align: center;">3</td>
                <td>Lê Thị Cúc</td>
                <td>Tin học ứng dụng 9+3</td>
                <td style="text-align: center;">Máy 02 (Ca 1)</td>
              </tr>
            </table>
          `
        };

        document.querySelectorAll('.w-tpl-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-wtemplate');
            paper.innerHTML = WORD_TEMPLATES[key] || WORD_TEMPLATES.don;
            document.querySelectorAll('.w-tpl-btn').forEach(b => {
              b.className = 'w-tpl-btn px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold';
            });
            btn.className = 'w-tpl-btn px-3 py-1.5 rounded-lg bg-sky-700 text-white font-bold';
          });
        });

        // Formatting buttons wiring
        document.getElementById('simWordFont').addEventListener('change', (e) => {
          paper.style.fontFamily = e.target.value;
        });
        document.getElementById('simWordSize').addEventListener('change', (e) => {
          paper.style.fontSize = e.target.value + 'pt';
        });
        document.getElementById('btnCmdBold').addEventListener('click', () => document.execCommand('bold', false, null));
        document.getElementById('btnCmdItalic').addEventListener('click', () => document.execCommand('italic', false, null));
        document.getElementById('btnCmdUnderline').addEventListener('click', () => document.execCommand('underline', false, null));
        document.getElementById('btnCmdLeft').addEventListener('click', () => document.execCommand('justifyLeft', false, null));
        document.getElementById('btnCmdCenter').addEventListener('click', () => document.execCommand('justifyCenter', false, null));
        document.getElementById('btnCmdRight').addEventListener('click', () => document.execCommand('justifyRight', false, null));
        document.getElementById('btnCmdJustify').addEventListener('click', () => document.execCommand('justifyFull', false, null));

        document.getElementById('btnCmdInsertTable').addEventListener('click', () => {
          const tblHtml = `
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #000; margin-top: 10px;" border="1" cellpadding="6">
              <tr style="background-color: #f1f5f9; font-weight: bold; text-align: center;">
                <td>STT</td><td>Tên dụng cụ / Vật tư</td><td>Số lượng</td><td>Ghi chú</td>
              </tr>
              <tr><td style="text-align: center;">1</td><td>Ổ cứng SSD 256GB &amp; RAM DDR4 8GB</td><td style="text-align: center;">02 cái</td><td>Đạt chuẩn</td></tr>
              <tr><td style="text-align: center;">2</td><td>Bộ bàn phím &amp; Chuột quang USB</td><td style="text-align: center;">04 cái</td><td>Đạt chuẩn</td></tr>
            </table>
          `;
          paper.innerHTML += tblHtml;
          playSound('success');
        });

        // Export to real Word (.doc) file for opening in Microsoft Word 2016
        document.getElementById('btnDownloadDocFile').addEventListener('click', () => {
          const content = paper.innerHTML;
          const docHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Bai Tap Word 9+3</title><style>@page { size: 21cm 29.7cm; margin: 2cm 2cm 2cm 3cm; } body { font-family: 'Times New Roman', serif; font-size: 14pt; line-height: 1.3; }</style></head><body>${content}</body></html>`;
          const blob = new Blob(['\ufeff', docHtml], { type: 'application/msword' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Bai_Thuc_Hanh_Word_9_Cong_3.doc';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          playSound('level');
          document.getElementById('simWordFeedback').textContent = '💾 Đã tải file về máy! Em hãy mở file này bằng phần mềm Microsoft Word 2016 trên máy tính và lưu vào ổ D:\\ nhé!';
          document.getElementById('simWordFeedback').className = 'font-extrabold text-emerald-700';
        });

        // Check & Grade Sim Word
        document.getElementById('btnSimCheckWord').addEventListener('click', () => {
          let pts = 0;
          if (document.getElementById('simWordPaper').value === 'A4') pts += 25;
          if (document.getElementById('simWordFont').value === 'Times New Roman') pts += 25;
          if (document.getElementById('simWordSize').value === '14') pts += 25;
          if (paper.innerText.trim().length >= 30) pts += 25;
          students[activeStudent].chScores[3] = pts;
          document.getElementById('lblChapterSimScore').textContent = `Điểm thực hành chương này: ${pts} / 100đ`;
          saveLocalProgress();
          playSound(pts === 100 ? 'level' : 'warn');
          document.getElementById('simWordFeedback').textContent = pts === 100
            ? '🎉 Đạt 100/100đ! Bây giờ em hãy bấm nút "💾 Lưu về ổ D:\\ mở bằng Word 2016" để thực hành trên phần mềm Word thật nhé!'
            : `⚠️ Đạt ${pts}/100đ. Hãy chọn đúng Khổ giấy A4, Phông chữ Times New Roman, Cỡ chữ 14 nhé!`;
          document.getElementById('simWordFeedback').className = pts === 100 ? 'font-extrabold text-emerald-700' : 'font-extrabold text-rose-700';
        });

        // Real Word 2016 5-step checklist grading
        const chkList = document.querySelectorAll('.real-word-chk');
        chkList.forEach(chk => {
          chk.addEventListener('change', () => {
            const done = Array.from(chkList).filter(c => c.checked).length;
            document.getElementById('realWordChkStatus').textContent = `Đã hoàn thành: ${done} / 5 bước trên phần mềm Word 2016 thật`;
          });
        });
        document.getElementById('btnCompleteRealWord').addEventListener('click', () => {
          const done = Array.from(chkList).filter(c => c.checked).length;
          const pts = done * 20;
          students[activeStudent].chScores[3] = Math.max(students[activeStudent].chScores[3], pts);
          document.getElementById('lblChapterSimScore').textContent = `Điểm thực hành chương này: ${students[activeStudent].chScores[3]} / 100đ`;
          saveLocalProgress();
          playSound(pts === 100 ? 'level' : 'warn');
          document.getElementById('realWordChkStatus').textContent = pts === 100
            ? '🏆 Xuất sắc (100/100đ)! Em đã hoàn thành sản phẩm thực tế trên Word 2016 và lưu vào ổ D:\\!'
            : `⚠️ Em mới tích ${done}/5 bước (${pts}đ). Hãy hoàn thành đủ 5 bước trên Word 2016 nhé!`;
        });
      } else if (chNum === 4) {
        // Chapter 4: Full Excel 2016 Interactive Grid + Formula Bar + Real SheetJS (.xlsx) Export
        container.innerHTML = `
          <div class="space-y-3 text-xs">
            <div class="bg-[#107c41] text-white rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-2 shadow">
              <div class="flex items-center gap-2.5">
                <span class="bg-white text-[#107c41] px-2.5 py-1 rounded font-black text-sm">X</span>
                <div>
                  <span class="text-[10px] font-black uppercase text-emerald-200">MICROSOFT EXCEL 2016 + SHEETJS OPEN SOURCE</span>
                  <h3 class="text-sm font-extrabold">Bảng Tính Thực Hành Nghề 9+3: Gõ Công Thức Trực Tiếp & Xuất File .XLSX Thật</h3>
                </div>
              </div>
              <button id="btnExportRealXlsx" type="button" class="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow flex items-center gap-1.5">
                <span>📥 Tải File Excel Thật (.XLSX) Mở Trên Máy</span>
              </button>
            </div>

            <!-- Formula Bar -->
            <div class="bg-white rounded-xl border border-slate-300 p-2.5 flex items-center gap-2">
              <span class="px-2.5 py-1 rounded bg-slate-100 border border-slate-300 font-mono font-bold text-slate-700">fx</span>
              <span class="text-slate-600 font-bold">Quy tắc bắt buộc khi gõ hàm Excel:</span>
              <code class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">Luôn bắt đầu bằng dấu = (Ví dụ: =SUM(D2:D4), =AVERAGE(D2:D4), =MAX(D2:D4), =MIN(D2:D4))</code>
            </div>

            <!-- Interactive Excel Grid -->
            <div class="bg-white rounded-xl border-2 border-slate-300 overflow-x-auto shadow-sm">
              <table class="w-full text-xs border-collapse text-center">
                <thead>
                  <tr class="bg-slate-200 text-slate-700 font-extrabold">
                    <th class="border border-slate-300 p-1.5 w-10">Hàng</th>
                    <th class="border border-slate-300 p-1.5">A (STT)</th>
                    <th class="border border-slate-300 p-1.5">B (Họ tên học sinh / Vật tư)</th>
                    <th class="border border-slate-300 p-1.5">C (Lớp nghề)</th>
                    <th class="border border-slate-300 p-1.5">D (Điểm Thực hành)</th>
                    <th class="border border-slate-300 p-1.5">E (Kết quả Đậu/Rớt)</th>
                  </tr>
                </thead>
                <tbody class="font-medium">
                  <tr>
                    <td class="border border-slate-300 p-1.5 bg-slate-100 font-bold">1</td>
                    <td class="border border-slate-300 p-1.5 bg-sky-50 font-bold">STT</td>
                    <td class="border border-slate-300 p-1.5 bg-sky-50 font-bold">Họ và tên học sinh</td>
                    <td class="border border-slate-300 p-1.5 bg-sky-50 font-bold">Nghề đào tạo</td>
                    <td class="border border-slate-300 p-1.5 bg-sky-50 font-bold">Điểm số</td>
                    <td class="border border-slate-300 p-1.5 bg-sky-50 font-bold">Xếp loại (IF)</td>
                  </tr>
                  <tr>
                    <td class="border border-slate-300 p-1.5 bg-slate-100 font-bold">2</td>
                    <td class="border border-slate-300 p-1.5">1</td>
                    <td class="border border-slate-300 p-1.5 text-left pl-3 font-semibold">Nguyễn Văn An</td>
                    <td class="border border-slate-300 p-1.5">Điện công nghiệp 9+3</td>
                    <td class="border border-slate-300 p-1.5"><input id="exCellD2" type="number" value="8" class="w-16 text-center font-extrabold border rounded p-1 bg-amber-50" /></td>
                    <td class="border border-slate-300 p-1.5 font-bold text-emerald-700" id="exOutE2">Đậu</td>
                  </tr>
                  <tr>
                    <td class="border border-slate-300 p-1.5 bg-slate-100 font-bold">3</td>
                    <td class="border border-slate-300 p-1.5">2</td>
                    <td class="border border-slate-300 p-1.5 text-left pl-3 font-semibold">Trần Văn Ba</td>
                    <td class="border border-slate-300 p-1.5">Công nghệ Ô tô 9+3</td>
                    <td class="border border-slate-300 p-1.5"><input id="exCellD3" type="number" value="6" class="w-16 text-center font-extrabold border rounded p-1 bg-amber-50" /></td>
                    <td class="border border-slate-300 p-1.5 font-bold text-emerald-700" id="exOutE3">Đậu</td>
                  </tr>
                  <tr>
                    <td class="border border-slate-300 p-1.5 bg-slate-100 font-bold">4</td>
                    <td class="border border-slate-300 p-1.5">3</td>
                    <td class="border border-slate-300 p-1.5 text-left pl-3 font-semibold">Lê Thị Cúc</td>
                    <td class="border border-slate-300 p-1.5">May thời trang 9+3</td>
                    <td class="border border-slate-300 p-1.5"><input id="exCellD4" type="number" value="4" class="w-16 text-center font-extrabold border rounded p-1 bg-amber-50" /></td>
                    <td class="border border-slate-300 p-1.5 font-bold text-rose-600" id="exOutE4">Rớt</td>
                  </tr>
                </tbody>
              </table>

              <!-- 4 Formula Tasks (Select or Type Formula) -->
              <div class="p-3 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div>
                  <label class="block font-bold mb-1">1. Ô D5 – Tính TỔNG điểm 3 bạn (Hàm SUM):</label>
                  <select id="simExSum" class="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white">
                    <option value="">-- Chọn hoặc kiểm tra công thức --</option>
                    <option value="ok">=SUM(D2:D4) ➔ Kết quả: 18</option>
                    <option value="w1">SUM(D2:D4) (Sai vì thiếu dấu =)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold mb-1">2. Ô D6 – Tính ĐIỂM TRUNG BÌNH (Hàm AVERAGE):</label>
                  <select id="simExAvg" class="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white">
                    <option value="">-- Chọn hoặc kiểm tra công thức --</option>
                    <option value="ok">=AVERAGE(D2:D4) ➔ Kết quả: 6.0</option>
                    <option value="w1">=MAX(D2:D4)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold mb-1">3. Ô D7 – Tìm điểm CAO NHẤT & THẤP NHẤT (MAX / MIN):</label>
                  <select id="simExMax" class="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white">
                    <option value="">-- Chọn hoặc kiểm tra công thức --</option>
                    <option value="ok">=MAX(D2:D4) và =MIN(D2:D4)</option>
                    <option value="w1">=SUM(D2:D4)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold mb-1">4. Ô E2 – Hàm IF xét Đậu/Rớt (Điểm D2 >= 5 là Đậu):</label>
                  <select id="simExIf" class="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white">
                    <option value="">-- Chọn hoặc kiểm tra công thức --</option>
                    <option value="ok">=IF(D2>=5, "Đậu", "Rớt")</option>
                    <option value="w1">=IF(D2<5, "Đậu", "Rớt")</option>
                  </select>
                </div>
              </div>

              <div class="p-3 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div id="simExcelFeedback" class="font-bold text-slate-700">
                  Em có thể đổi thử điểm số ở cột D và chọn đủ 4 công thức rồi bấm <strong>Kiểm tra 4 hàm Excel</strong>!
                </div>
                <button id="btnSimCheckExcel" type="button" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow">
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

        // Real .XLSX Export using SheetJS open-source library
        document.getElementById('btnExportRealXlsx').addEventListener('click', () => {
          const d2 = parseFloat(document.getElementById('exCellD2').value) || 8;
          const d3 = parseFloat(document.getElementById('exCellD3').value) || 6;
          const d4 = parseFloat(document.getElementById('exCellD4').value) || 4;
          if (window.XLSX) {
            const wsData = [
              ['STT', 'Họ và tên học sinh', 'Lớp nghề 9+3', 'Điểm Thực hành', 'Kết quả (IF)'],
              [1, 'Nguyễn Văn An', 'Điện công nghiệp 9+3', d2, { f: 'IF(D2>=5,"Đậu","Rớt")' }],
              [2, 'Trần Văn Ba', 'Công nghệ Ô tô 9+3', d3, { f: 'IF(D3>=5,"Đậu","Rớt")' }],
              [3, 'Lê Thị Cúc', 'May thời trang 9+3', d4, { f: 'IF(D4>=5,"Đậu","Rớt")' }],
              ['', 'TỔNG ĐIỂM (SUM)', '', { f: 'SUM(D2:D4)' }, ''],
              ['', 'TRUNG BÌNH (AVERAGE)', '', { f: 'AVERAGE(D2:D4)' }, ''],
              ['', 'ĐIỂM CAO NHẤT (MAX)', '', { f: 'MAX(D2:D4)' }, ''],
              ['', 'ĐIỂM THẤP NHẤT (MIN)', '', { f: 'MIN(D2:D4)' }, '']
            ];
            const wb = window.XLSX.utils.book_new();
            const ws = window.XLSX.utils.aoa_to_sheet(wsData);
            window.XLSX.utils.book_append_sheet(wb, ws, 'Bang_Diem_9_Cong_3');
            window.XLSX.writeFile(wb, 'Bai_Tap_Excel_9_Cong_3.xlsx');
            playSound('level');
            document.getElementById('simExcelFeedback').textContent = '📥 Đã xuất file Bai_Tap_Excel_9_Cong_3.xlsx có chứa sẵn công thức thật! Em hãy mở bằng Excel 2016 và lưu vào ổ D:\\ nhé!';
          }
        });

        document.getElementById('btnSimCheckExcel').addEventListener('click', () => {
          let pts = 0;
          if (document.getElementById('simExSum').value === 'ok') pts += 25;
          if (document.getElementById('simExAvg').value === 'ok') pts += 25;
          if (document.getElementById('simExMax').value === 'ok') pts += 25;
          if (document.getElementById('simExIf').value === 'ok') pts += 25;
          students[activeStudent].chScores[4] = pts;
          document.getElementById('lblChapterSimScore').textContent = `Điểm thực hành chương này: ${pts} / 100đ`;
          saveLocalProgress();
          playSound(pts === 100 ? 'level' : 'warn');
          if (pts === 100 && window.confetti) {
            try { window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } }); } catch (e) {}
          }
          document.getElementById('simExcelFeedback').textContent = pts === 100
            ? '🎉 Tuyệt vời (100/100đ)! Em đã nắm vững cả 5 hàm SUM, AVERAGE, MAX, MIN và IF! Bấm nút Tải File .XLSX ở góc trên để mở trên Excel 2016 thật nhé!'
            : `⚠️ Đạt ${pts}/100đ. Nhớ mọi công thức Excel đều bắt đầu bằng dấu = nhé!`;
        });
      } else {
        // Chapter 5 (PowerPoint) & Chapter 6 (Cyber Security 3-No Quiz)
        container.innerHTML = `
          <div class="space-y-3 text-xs">
            <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-slate-800">
              🛡️ <strong>Bài tập tình huống thực hành Chương ${chNum} (100 điểm):</strong> Em hãy trả lời đúng 2 câu hỏi cốt lõi dưới đây:
            </div>
            <div class="bg-white rounded-xl border border-slate-300 p-4 space-y-3">
              <div>
                <label class="block font-bold mb-1">Câu 1 (50đ): ${chNum === 5 ? 'Phím tắt nào trên bàn phím dùng để bật trình chiếu PowerPoint toàn màn hình?' : 'Khi có tin nhắn lạ báo trúng thưởng và yêu cầu nhập mật khẩu/mã OTP ngân hàng, em làm gì?'}</label>
                <select id="simQuizQ1" class="w-full p-2 rounded border font-bold">
                  <option value="">-- Chọn đáp án đúng --</option>
                  <option value="ok">${chNum === 5 ? 'Bấm phím F5 (Trình chiếu từ trang đầu)' : 'Tuyệt đối KHÔNG bấm link lạ, KHÔNG cung cấp mật khẩu hay mã OTP'}</option>
                  <option value="w">${chNum === 5 ? 'Bấm phím Backspace' : 'Làm theo hướng dẫn trong tin nhắn lạ'}</option>
                </select>
              </div>
              <div>
                <label class="block font-bold mb-1">Câu 2 (50đ): ${chNum === 5 ? 'Khi thiết kế trang chiếu giới thiệu nghề học, cách trình bày chữ nào đúng?' : 'Trước khi rời khỏi máy tính ở phòng thực hành dùng chung, em phải làm gì với tài khoản Gmail/Zalo?'}</label>
                <select id="simQuizQ2" class="w-full p-2 rounded border font-bold">
                  <option value="">-- Chọn đáp án đúng --</option>
                  <option value="ok">${chNum === 5 ? 'Chữ to rõ, ngắn gọn (tối đa 5-6 dòng), kèm hình ảnh minh họa' : 'Bấm Đăng xuất (Sign out) tài khoản và tắt máy bằng lệnh Shut down'}</option>
                  <option value="w">${chNum === 5 ? 'Chép kín đặc chữ nhỏ li ti lên 1 trang chiếu' : 'Cứ để nguyên tài khoản đang mở rồi đi về'}</option>
                </select>
              </div>
              <button id="btnSimCheckQuiz" type="button" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow">
                ✅ Hoàn thành & Chấm điểm (100đ)
              </button>
              <div id="simQuizFeedback" class="font-bold"></div>
            </div>
          </div>
        `;
        document.getElementById('btnSimCheckQuiz').addEventListener('click', () => {
          let pts = 0;
          if (document.getElementById('simQuizQ1').value === 'ok') pts += 50;
          if (document.getElementById('simQuizQ2').value === 'ok') pts += 50;
          students[activeStudent].chScores[chNum] = pts;
          document.getElementById('lblChapterSimScore').textContent = `Điểm thực hành chương này: ${pts} / 100đ`;
          saveLocalProgress();
          playSound(pts === 100 ? 'level' : 'warn');
          document.getElementById('simQuizFeedback').textContent = pts === 100
            ? '🎉 Chính xác 100/100đ! Điểm đã được cập nhật vào phiếu điểm của em.'
            : `⚠️ Đạt ${pts}/100đ. Hãy kiểm tra lại đáp án đúng nhé!`;
        });
      }
    }
