import fs from "node:fs";
import path from "node:path";

const filePath = path.resolve("mang-may-tinh/src/app/courses/phan-cung/ol-01/page.tsx");
let raw = fs.readFileSync(filePath, "utf8");
const isCrlf = raw.includes("\r\n");
console.log("Original file length:", raw.length, "Is CRLF:", isCrlf);

let content = raw.replace(/\r\n/g, "\n");

// 1. UPDATE KTV_7_STEPS DATA
const ktv7Data = [
  {
    id: "step-1",
    motto: "NHÌN VỎ – BẤM THỬ – GHI CẤU HÌNH",
    quickAction: "Khám vỏ ngoài xem có móp vỡ không, cắm nguồn bấm nút Power thử xem máy còn sống không, mở CPU-Z ghi lại cấu hình.",
    quickSign: "Quạt quay, đèn sáng, CrystalDiskInfo báo Good (Xanh).",
    quickDont: "Cấm vội tháo ốc tháo máy khi chưa cắm điện thử máy ban đầu!",
  },
  {
    id: "step-2",
    motto: "COPY DESKTOP SANG Ổ D",
    quickAction: "Copy toàn bộ file ngoài Desktop và Documents của khách sang ổ D trong thư mục SAO_LUU_KHACH.",
    quickSign: "Chuột phải thư mục ở ổ D xem số file và số GB khớp 100% với ổ gốc, mở thử 2 file.",
    quickDont: "Cấm Format ổ đĩa hay tháo ổ cứng khi chưa copy xong dữ liệu (mất dữ liệu là đền tiền!).",
  },
  {
    id: "step-3",
    motto: "MÀN ĐEN QUẠT QUAY = CHÀ GÔM CHÂN RAM",
    quickAction: "Rút điện bấm xả tụ 3 lần, tháo thanh RAM lấy cục gôm trắng học sinh chà sáng bóng chân vàng rồi cắm lại.",
    quickSign: "Cắm RAM nghe tiếng 'TÁCH' đanh gọn 2 đầu ngậm khít. Bật máy lên hình ngay.",
    quickDont: "Không dùng cồn ướt lau chân RAM; cấm để lại mạt vụn gôm rơi trong khe cắm.",
  },
  {
    id: "step-4",
    motto: "QUÉT SẠCH BỤI – 1 HẠT ĐẬU XANH KEO",
    quickAction: "Quét sạch bụi tản nhiệt, lau sạch keo cũ trên CPU rồi bơm đúng 1 giọt keo mới to bằng hạt đậu xanh ở chính giữa.",
    quickSign: "Lắp quạt ép chéo 4 góc khóa chặt, quạt đã cắm dây CPU_FAN, RAM nâng cấp khóa sát khấc.",
    quickDont: "Cấm bơm quá nhiều keo tràn xuống bo mạch; cấm quên bóc nilon đáy quạt tản nhiệt mới.",
  },
  {
    id: "step-5",
    motto: "BOOT USB – CHỈ FORMAT Ổ C",
    quickAction: "Cắm USB cài Win (MSI/Winnfox bấm F11, ASUS bấm F8), ở bảng chọn ổ đĩa: chỉ Format dòng ổ C dung lượng nhỏ để cài.",
    quickSign: "Cài xong vào thẳng Windows 10 desktop, Device Manager sạch bóng dấu chấm than vàng.",
    quickDont: "Tuyệt đối cấm bấm Format dòng Ổ D (chứa tài liệu khách đã cứu ở Bước 2).",
  },
  {
    id: "step-6",
    motto: "SẠCH CHẤM THAN VÀNG – IN 1 TRANG GIẤY",
    quickAction: "Cài đủ driver cho bo mạch và card GT 730, cắm dây máy in USB đặt làm mặc định (tích xanh) và in thử 1 trang.",
    quickSign: "Device Manager không còn cờ vàng chấm than (!); máy in chạy ra trang giấy in nét.",
    quickDont: "Không giao máy khi Device Manager còn dấu chấm than vàng (máy sẽ bị giật lag, mất tiếng hoặc mất mạng).",
  },
  {
    id: "step-7",
    motto: "DƯỚI 50 ĐỘ C – DÁN TEM BÀN GIAO",
    quickAction: "Mở HWMonitor kiểm tra nhiệt độ CPU khi nghỉ phải dưới 45-50°C, kiểm tra nhận đủ 8GB RAM, dán tem bàn giao.",
    quickSign: "Nhiệt độ CPU xanh mát êm ru, khoang case sạch sẽ gọn gàng, trả đủ ốc vít vào khay.",
    quickDont: "Không đóng nắp máy khi quạt CPU đang bị kênh nhiệt độ vượt quá 75°C lúc chạy không tải.",
  },
];

for (const s of ktv7Data) {
  const target = `    id: "${s.id}",\n    stepNumber:`;
  if (content.includes(target) && !content.includes(`motto: "${s.motto}"`)) {
    const replacement = `    id: "${s.id}",\n    motto: "${s.motto}",\n    quickAction: "${s.quickAction}",\n    quickSign: "${s.quickSign}",\n    quickDont: "${s.quickDont}",\n    stepNumber:`;
    content = content.replace(target, replacement);
    console.log(`Replaced KTV7 ${s.id}`);
  }
}

// 2. UPDATE MechanicalStep INTERFACE
const mechInterfaceOld = `interface MechanicalStep {\n  id: string;\n  stepNumber: number;`;
const mechInterfaceNew = `interface MechanicalStep {\n  id: string;\n  stepNumber: number;\n  motto: string;\n  quickAction: string;\n  quickSign: string;\n  quickDont: string;`;
if (content.includes(mechInterfaceOld) && !content.includes("motto: string;\n  quickAction: string;")) {
  content = content.replace(mechInterfaceOld, mechInterfaceNew);
  console.log("Updated MechanicalStep interface");
}

// 3. UPDATE DISASSEMBLY_STEPS
const disData = [
  {
    id: "dis-1",
    motto: "RÚT ĐIỆN – BẤM 3 LẦN – CHẠM VỎ SẮT",
    quickAction: "Rút phích 220V, bấm nút nguồn 3 lần xả điện tụ, chạm tay vào vỏ case kim loại triệt tiêu tĩnh điện.",
    quickSign: "Đèn nguồn trên bo mạch tắt hẳn, quạt ngừng quay hoàn toàn.",
    quickDont: "Cấm tháo linh kiện khi chưa rút điện hoặc chưa xả tụ (sốc điện làm cháy chip BIOS).",
  },
  {
    id: "dis-2",
    motto: "MỞ ỐC NẸP – GẠT LẪY PCIE – RÚT THẲNG",
    quickAction: "Tháo ốc nẹp sắt sau case, lấy ngón tay gạt mở lẫy đuôi khe PCIe rồi nhấc thẳng card rời GT 730 lên.",
    quickSign: "Lẫy khóa đuôi nhả ra hoàn toàn, card nhấc nhẹ tay góc 90 độ.",
    quickDont: "Cấm giật mạnh khi lẫy đuôi chưa mở (sẽ làm bẻ gãy lẫy hoặc toác chân khe cắm).",
  },
  {
    id: "dis-3",
    motto: "ĐÈ 2 ĐẦU NGÀM – CẦM MÉP NHẤC RAM",
    quickAction: "Ấn đều ngàm khóa ở hai đầu khe cắm xuống dưới, thanh RAM tự bật nảy lên, cầm 2 mép cạnh nhấc ra.",
    quickSign: "Thanh RAM nảy chéo nhẹ lên, nhấc ra nhẹ nhàng không cấn.",
    quickDont: "Tuyệt đối không chạm ngón tay vào hàng chân mạ vàng (mồ hôi tay làm rỉ sét tiếp xúc).",
  },
  {
    id: "dis-4",
    motto: "BÓP LẪY SẮT – RÚT DÂY SATA",
    quickAction: "Lấy ngón tay bóp nhẹ vào lẫy kim loại trên đầu cáp SATA rồi rút thẳng; rút cáp nguồn chữ L; tháo ốc ổ SSD.",
    quickSign: "Cáp SATA trượt ra nhẹ nhàng khi bóp chốt kim loại.",
    quickDont: "Cấm giật cáp khi chưa bóp lẫy kim loại (sẽ giật gãy chân nhựa trên mainboard).",
  },
  {
    id: "dis-5",
    motto: "CHỤP ẢNH MÀU DÂY – BÓP LẪY 24-PIN",
    quickAction: "Lấy điện thoại chụp lại cụm dây F_PANEL trước khi rút; bóp lẫy khóa to đầu 24-pin lắc nhẹ 2 bên nhấc lên.",
    quickSign: "Đầu nhựa giắc cắm nhả ngàm khóa và rút ra nguyên vẹn.",
    quickDont: "Cấm cầm vào dây điện để giật (sẽ làm đứt ngầm lõi đồng bên trong).",
  },
  {
    id: "dis-6",
    motto: "XOAY CHỐT NHẢ NGÀM – ĐẾM ĐỦ 6 ỐC MAIN",
    quickAction: "Xoay 4 chốt tản nhiệt Intel theo chiều mũi tên, lay nhẹ tách keo rồi nhấc quạt lên; tháo đủ 6 ốc đệm nhấc bo mạch.",
    quickSign: "Mặt quạt tách êm khỏi CPU; 6 ốc bo mạch đã tháo hết nằm gọn trong khay.",
    quickDont: "Cấm cạy bo mạch khi chưa tháo hết ốc chân đệm Standoff (sẽ làm nứt gãy bo mạch).",
  },
];

for (const s of disData) {
  const target = `    id: "${s.id}",\n    stepNumber:`;
  if (content.includes(target) && !content.includes(`motto: "${s.motto}"`)) {
    const replacement = `    id: "${s.id}",\n    motto: "${s.motto}",\n    quickAction: "${s.quickAction}",\n    quickSign: "${s.quickSign}",\n    quickDont: "${s.quickDont}",\n    stepNumber:`;
    content = content.replace(target, replacement);
    console.log(`Replaced Disassembly ${s.id}`);
  }
}

// 4. UPDATE ASSEMBLY_STEPS
const asmData = [
  {
    id: "asm-1",
    motto: "SO TAM GIÁC VÀNG – 1 HẠT ĐẬU XANH KEO",
    quickAction: "Đặt CPU đúng tam giác vàng góc dưới, gài khóa; bơm 1 hạt đậu xanh keo tản nhiệt; ốp quạt CPU và cắm dây CPU_FAN.",
    quickSign: "CPU nằm phẳng khít trong socket; 4 chốt quạt kêu 'cạch'; quạt đã cắm dây.",
    quickDont: "Cấm ấn mạnh CPU khi thấy cộm tay; cấm quên bóc nilon đáy quạt tản nhiệt mới.",
  },
  {
    id: "asm-2",
    motto: "SO RÃNH KHUYẾT – ẤN NGHE TIẾNG TÁCH",
    quickAction: "Mở lẫy khe RAM, so rãnh khuyết lệch trùng gờ nổi, dùng 2 ngón cái ấn đều 2 đầu xuống.",
    quickSign: "Nghe tiếng 'TÁCH' đanh gọn, hai lẫy khóa tự động bật vào nẹp chặt thanh RAM.",
    quickDont: "Cấm ấn cố khi cắm ngược rãnh khuyết (sẽ làm gãy thanh RAM và toác khe cắm).",
  },
  {
    id: "asm-3",
    motto: "ĐẾM ĐỦ TRỤ ĐỒNG – BẮT 6 ỐC CHỮ X",
    quickAction: "Đếm đủ các chân trụ đồng đệm (Standoff) cách điện đáy case, gá nắp sắt I/O Shield rồi siết 6 ốc theo đường chéo.",
    quickSign: "Bo mạch nằm phẳng đều trên các chân đệm, các cổng phía sau thò ra khít nắp sắt.",
    quickDont: "Cấm quên trụ đệm Standoff (lưng bo mạch chạm vỏ sắt case sẽ gây nổ chập điện ngay lập tức).",
  },
  {
    id: "asm-4",
    motto: "QUẠT NGUỒN HƯỚNG RA – DÂY CPU ĐÚNG CHỮ",
    quickAction: "Lắp nguồn vặn 4 ốc; cắm dây 24-pin ATX vào bo mạch; cắm dây 8-pin có chữ 'CPU' vào góc trên bo mạch.",
    quickSign: "Các lẫy khóa nhựa ngậm chặt vào gờ cắm, không bị lỏng lẻo.",
    quickDont: "Cấm cắm nhầm dây có chữ 'PCI-E' (của card màn hình) vào chân cắm CPU (sai điện thế làm nổ bo mạch).",
  },
  {
    id: "asm-5",
    motto: "POWER SW CẮM SÁT CHÂN KHUYẾT",
    quickAction: "Tìm cụm 9 chân F_PANEL góc dưới phải: cắm 2 chân POWER SW ở hàng trên ngay sát cạnh vị trí chân bị khuyết.",
    quickSign: "Cắm đúng vị trí, bấm nút Power trên case là máy khởi động bật nguồn ngay.",
    quickDont: "Cấm cắm lộn sang chân Reset SW (sẽ bấm nút nguồn không có tác dụng).",
  },
  {
    id: "asm-6",
    motto: "GÀI KHÓA PCIE – SIẾT CHẶT ỐC NẸP",
    quickAction: "Mở lẫy PCIe x16, ấn card GT 730 thẳng vào khe cho đến khi lẫy đuôi khóa lại; vặn chặt ốc nẹp sắt vào thùng case.",
    quickSign: "Lẫy khóa đuôi ôm chặt chân card, card cố định cứng cáp không rung lắc.",
    quickDont: "Cấm quên vặn ốc nẹp sau case (card bị xệ lỏng chân khi cắm dây màn hình).",
  },
  {
    id: "asm-7",
    motto: "CÁP ĐỦ DATA VÀ NGUỒN – DÂY CẮM CARD RỜI",
    quickAction: "Cắm đủ 2 dây cho ổ SSD (dây SATA dữ liệu + dây nguồn chữ L); cắm dây màn hình vào cổng của Card rời GT 730 phía dưới.",
    quickSign: "Bật máy lên hình bình thường, ổ SSD nhận diện tốt trong BIOS.",
    quickDont: "Cấm cắm dây màn hình lên cụm cổng trên bo mạch chủ (màn hình sẽ đen ngòm vì CPU i5-10400F không có GPU tích hợp).",
  },
];

for (const s of asmData) {
  const target = `    id: "${s.id}",\n    stepNumber:`;
  if (content.includes(target) && !content.includes(`motto: "${s.motto}"`)) {
    const replacement = `    id: "${s.id}",\n    motto: "${s.motto}",\n    quickAction: "${s.quickAction}",\n    quickSign: "${s.quickSign}",\n    quickDont: "${s.quickDont}",\n    stepNumber:`;
    content = content.replace(target, replacement);
    console.log(`Replaced Assembly ${s.id}`);
  }
}

// 5. UPDATE CoreSkill INTERFACE & CORE_SKILLS
const skillInterfaceOld = `interface CoreSkill {\n  id: "ram" | "vga" | "fpanel" | "cmos";\n  name: string;\n  subtitle: string;\n  badge: string;`;
const skillInterfaceNew = `interface CoreSkill {\n  id: "ram" | "vga" | "fpanel" | "cmos";\n  name: string;\n  subtitle: string;\n  badge: string;\n  motto: string;\n  quickAction: string;\n  quickSign: string;\n  quickDont: string;`;
if (content.includes(skillInterfaceOld) && !content.includes("motto: string;\n  quickAction: string;")) {
  content = content.replace(skillInterfaceOld, skillInterfaceNew);
  console.log("Updated CoreSkill interface");
}

const skillsData = [
  {
    id: "ram",
    motto: "GÔM TRẮNG SÁCH VỞ – THỔI SẠCH VỤN MẠT",
    quickAction: "Dùng gôm học sinh màu trắng chà sáng bóng hàng chân vàng 2 mặt, lấy chổi quét sạch vụn gôm trước khi cắm lại.",
    quickSign: "Chân mạ vàng sáng bóng như mới, cắm vào nghe tiếng 'TÁCH' 2 đầu.",
    quickDont: "Không dùng gôm đen hay giấy ráp; không dùng miệng thổi bụi (hơi thở ẩm làm rỉ chân đồng).",
  },
  {
    id: "vga",
    motto: "MỞ LẪY ĐUÔI – SIẾT ỐC NẸP – DÂY CẮM CARD RỜI",
    quickAction: "Gạt mở lẫy đuôi trước khi nhấc card, luôn vặn ốc nẹp case, cắm dây màn hình vào card rời phía dưới.",
    quickSign: "Card chắc chắn không xệ, màn hình hiển thị logo ngay khi bật.",
    quickDont: "Cấm cắm dây màn hình lên cụm cổng bo mạch chủ phía trên.",
  },
  {
    id: "fpanel",
    motto: "HÀNG TRÊN SÁT CHÂN KHUYẾT LÀ POWER SW",
    quickAction: "Tìm vị trí chân kim số 9 bị khuyết: 2 chân kim ở hàng trên ngay cạnh nó chính là công tắc bật nguồn POWER SW.",
    quickSign: "Bấm nút nguồn máy tính khởi động ngay từ lần đầu.",
    quickDont: "Nút Power & Reset không phân biệt âm dương (+/-); riêng đèn LED (HDD/Power LED) phải cắm đúng cực (+/-).",
  },
  {
    id: "cmos",
    motto: "GẠT LẪY BUNG PIN – MẶT CHỮ DẤU (+) NGỬA LÊN",
    quickAction: "Rút điện 220V, bấm nút nguồn 3 lần, gạt nhẹ lẫy kim loại cho viên pin CR2032 nảy chéo 45 độ lên, chờ 3 phút lắp lại.",
    quickSign: "Máy được xóa sạch thiết lập BIOS cũ, khắc phục lỗi treo logo hoặc quên mật khẩu BIOS.",
    quickDont: "Cấm lắp úp mặt dấu (+) xuống dưới; cấm tháo pin khi chưa rút phích cắm điện 220V.",
  },
];

for (const s of skillsData) {
  const target = `    id: "${s.id}",\n    name:`;
  if (content.includes(target) && !content.includes(`motto: "${s.motto}"`)) {
    const replacement = `    id: "${s.id}",\n    motto: "${s.motto}",\n    quickAction: "${s.quickAction}",\n    quickSign: "${s.quickSign}",\n    quickDont: "${s.quickDont}",\n    name:`;
    content = content.replace(target, replacement);
    console.log(`Replaced Skill ${s.id}`);
  }
}

// 6. RENDER THE 3-SECOND FORMULA IN 7 STEPS ACCORDION
const oldAccordionInstructions = `{/* Danh sách hành động chi tiết */}\n                          <div className="space-y-1.5 pt-1">`;
const newAccordionInstructions = `{/* HỘP CÔNG THỨC 3 GIÂY: AI CŨNG NHỚ ĐƯỢC */}
                          <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400 text-slate-900 space-y-2.5 shadow-xs">
                            <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-amber-200/80 pb-2">
                              <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm text-amber-950 uppercase tracking-tight">
                                <Zap className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
                                <span>Khẩu Quyết: {step.motto}</span>
                              </div>
                              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-mono text-[10px] font-black uppercase tracking-wider">
                                ⚡ 3 Giây Là Nhớ
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                              <div className="p-2.5 rounded-xl bg-white border border-emerald-300 text-slate-800 space-y-1 shadow-2xs">
                                <span className="font-black text-emerald-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                                  👉 1. Tay Làm Gì:
                                </span>
                                <p className="font-bold text-slate-900 leading-snug">{step.quickAction}</p>
                              </div>

                              <div className="p-2.5 rounded-xl bg-white border border-blue-300 text-slate-800 space-y-1 shadow-2xs">
                                <span className="font-black text-blue-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                                  👀 2. Mắt Nhìn Thấy:
                                </span>
                                <p className="font-bold text-slate-900 leading-snug">{step.quickSign}</p>
                              </div>

                              <div className="p-2.5 rounded-xl bg-white border border-rose-300 text-slate-800 space-y-1 shadow-2xs">
                                <span className="font-black text-rose-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                                  🚫 3. Tuyệt Đối Cấm:
                                </span>
                                <p className="font-bold text-rose-900 leading-snug">{step.quickDont}</p>
                              </div>
                            </div>
                          </div>

                          {/* Danh sách hành động chi tiết */}\n                          <div className="space-y-1.5 pt-1">`;

if (content.includes(oldAccordionInstructions)) {
  content = content.replace(oldAccordionInstructions, newAccordionInstructions);
  console.log("Inserted 3-sec formula in 7 steps accordion");
}

// 7. RENDER THE 3-SECOND FORMULA IN DISASSEMBLY
const oldDisThaoTac = `                      <CardContent className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">\n                        {/* Thao tác kỹ thuật */}`;
const newDisThaoTac = `                      <CardContent className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                        {/* HỘP CÔNG THỨC 3 GIÂY: AI CŨNG NHỚ ĐƯỢC */}
                        <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400 text-slate-900 space-y-2.5 shadow-xs">
                          <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-amber-200/80 pb-2">
                            <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm text-amber-950 uppercase tracking-tight">
                              <Zap className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
                              <span>Khẩu Quyết: {activeDisassemblyStep.motto}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-mono text-[10px] font-black uppercase tracking-wider">
                              ⚡ 3 Giây Là Nhớ
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-white border border-emerald-300 text-slate-800 space-y-1 shadow-2xs">
                              <span className="font-black text-emerald-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                                👉 1. Tay Làm Gì:
                              </span>
                              <p className="font-bold text-slate-900 leading-snug">{activeDisassemblyStep.quickAction}</p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white border border-blue-300 text-slate-800 space-y-1 shadow-2xs">
                              <span className="font-black text-blue-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                                👀 2. Mắt Nhìn Thấy:
                              </span>
                              <p className="font-bold text-slate-900 leading-snug">{activeDisassemblyStep.quickSign}</p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white border border-rose-300 text-slate-800 space-y-1 shadow-2xs">
                              <span className="font-black text-rose-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                                🚫 3. Tuyệt Đối Cấm:
                              </span>
                              <p className="font-bold text-rose-900 leading-snug">{activeDisassemblyStep.quickDont}</p>
                            </div>
                          </div>
                        </div>

                        {/* Thao tác kỹ thuật */}`;

if (content.includes(oldDisThaoTac)) {
  content = content.replace(oldDisThaoTac, newDisThaoTac);
  console.log("Inserted 3-sec formula in disassembly");
}

// 8. RENDER THE 3-SECOND FORMULA IN ASSEMBLY
const oldAsmThaoTac = `                      <CardContent className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">\n                        {/* Thao tác kỹ thuật */}`;
const newAsmThaoTac = `                      <CardContent className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                        {/* HỘP CÔNG THỨC 3 GIÂY: AI CŨNG NHỚ ĐƯỢC */}
                        <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-400 text-slate-900 space-y-2.5 shadow-xs">
                          <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-blue-200/80 pb-2">
                            <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm text-blue-950 uppercase tracking-tight">
                              <Zap className="w-4 h-4 text-blue-600 fill-blue-500 shrink-0" />
                              <span>Khẩu Quyết: {activeAssemblyStep.motto}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-mono text-[10px] font-black uppercase tracking-wider">
                              ⚡ 3 Giây Là Nhớ
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-white border border-emerald-300 text-slate-800 space-y-1 shadow-2xs">
                              <span className="font-black text-emerald-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                                👉 1. Tay Làm Gì:
                              </span>
                              <p className="font-bold text-slate-900 leading-snug">{activeAssemblyStep.quickAction}</p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white border border-blue-300 text-slate-800 space-y-1 shadow-2xs">
                              <span className="font-black text-blue-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                                👀 2. Mắt Nhìn Thấy:
                              </span>
                              <p className="font-bold text-slate-900 leading-snug">{activeAssemblyStep.quickSign}</p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white border border-rose-300 text-slate-800 space-y-1 shadow-2xs">
                              <span className="font-black text-rose-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                                🚫 3. Tuyệt Đối Cấm:
                              </span>
                              <p className="font-bold text-rose-900 leading-snug">{activeAssemblyStep.quickDont}</p>
                            </div>
                          </div>
                        </div>

                        {/* Thao tác kỹ thuật */}`;

// Let's check if oldAsmThaoTac is in content or if it was "Thao tác kỹ thuật chuẩn"
if (content.includes("Thao Tác Kỹ Thuật Chuẩn:")) {
  const targetAsm = `                      <CardContent className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">\n                        {/* Thao tác kỹ thuật */}\n                        <div>\n                          <strong className="text-slate-900 block font-bold mb-1.5 flex items-center gap-1.5">\n                            <Wrench className="w-4 h-4 text-slate-700" />\n                            <span>Thao Tác Kỹ Thuật Chuẩn:</span>`;
  const replaceAsm = `                      <CardContent className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                        {/* HỘP CÔNG THỨC 3 GIÂY: AI CŨNG NHỚ ĐƯỢC */}
                        <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-400 text-slate-900 space-y-2.5 shadow-xs">
                          <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-blue-200/80 pb-2">
                            <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm text-blue-950 uppercase tracking-tight">
                              <Zap className="w-4 h-4 text-blue-600 fill-blue-500 shrink-0" />
                              <span>Khẩu Quyết: {activeAssemblyStep.motto}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-mono text-[10px] font-black uppercase tracking-wider">
                              ⚡ 3 Giây Là Nhớ
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-white border border-emerald-300 text-slate-800 space-y-1 shadow-2xs">
                              <span className="font-black text-emerald-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                                👉 1. Tay Làm Gì:
                              </span>
                              <p className="font-bold text-slate-900 leading-snug">{activeAssemblyStep.quickAction}</p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white border border-blue-300 text-slate-800 space-y-1 shadow-2xs">
                              <span className="font-black text-blue-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                                👀 2. Mắt Nhìn Thấy:
                              </span>
                              <p className="font-bold text-slate-900 leading-snug">{activeAssemblyStep.quickSign}</p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white border border-rose-300 text-slate-800 space-y-1 shadow-2xs">
                              <span className="font-black text-rose-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                                🚫 3. Tuyệt Đối Cấm:
                              </span>
                              <p className="font-bold text-rose-900 leading-snug">{activeAssemblyStep.quickDont}</p>
                            </div>
                          </div>
                        </div>

                        {/* Thao tác kỹ thuật */}
                        <div>
                          <strong className="text-slate-900 block font-bold mb-1.5 flex items-center gap-1.5">
                            <Wrench className="w-4 h-4 text-slate-700" />
                            <span>Thao Tác Kỹ Thuật Chuẩn:</span>`;
  content = content.replace(targetAsm, replaceAsm);
  console.log("Inserted 3-sec formula in assembly");
}

// 9. RENDER THE 3-SECOND FORMULA IN CORE SKILLS
const oldSkillThaoTac = `                      <CardContent className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">\n                        {/* Dụng cụ cần thiết */}`;
const newSkillThaoTac = `                      <CardContent className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                        {/* HỘP CÔNG THỨC 3 GIÂY: AI CŨNG NHỚ ĐƯỢC */}
                        <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400 text-slate-900 space-y-2.5 shadow-xs">
                          <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-amber-200/80 pb-2">
                            <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm text-amber-950 uppercase tracking-tight">
                              <Zap className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
                              <span>Khẩu Quyết Cốt Lõi: {selectedSkill.motto}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-mono text-[10px] font-black uppercase tracking-wider">
                              ⚡ 3 Giây Là Nhớ
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-white border border-emerald-300 text-slate-800 space-y-1 shadow-2xs">
                              <span className="font-black text-emerald-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                                👉 1. Tay Làm Gì:
                              </span>
                              <p className="font-bold text-slate-900 leading-snug">{selectedSkill.quickAction}</p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white border border-blue-300 text-slate-800 space-y-1 shadow-2xs">
                              <span className="font-black text-blue-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                                👀 2. Mắt Nhìn Thấy:
                              </span>
                              <p className="font-bold text-slate-900 leading-snug">{selectedSkill.quickSign}</p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white border border-rose-300 text-slate-800 space-y-1 shadow-2xs">
                              <span className="font-black text-rose-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                                🚫 3. Tuyệt Đối Cấm:
                              </span>
                              <p className="font-bold text-rose-900 leading-snug">{selectedSkill.quickDont}</p>
                            </div>
                          </div>
                        </div>

                        {/* Dụng cụ cần thiết */}`;

if (content.includes(oldSkillThaoTac)) {
  content = content.replace(oldSkillThaoTac, newSkillThaoTac);
  console.log("Inserted 3-sec formula in core skills");
}

// 10. ADD TOP TIP BANNER BELOW 3 KHẨU QUYẾT SỐNG CÒN
const oldKhauQuyetEnd = `              </div>\n            </div>\n          </CardContent>\n        </Card>`;
const newKhauQuyetEnd = `              </div>\n            </div>

            {/* BANNER HƯỚNG DẪN HỌC NHANH CHO HỌC SINH MỚI */}
            <div className="mt-3 p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-blue-500/15 border-2 border-dashed border-amber-300 text-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-black text-base shrink-0 shadow-xs">
                  ⚡
                </span>
                <div className="text-xs">
                  <strong className="font-black text-slate-900 block text-xs sm:text-sm">
                    PHƯƠNG PHÁP HỌC NHANH DÀNH CHO MỌI NGƯỜI (CÔNG THỨC 3 GIÂY):
                  </strong>
                  <span className="text-slate-600 font-medium">
                    Đừng sợ lý thuyết dài! Ở mỗi bước, bạn chỉ cần nhớ đúng 3 việc: <strong className="text-emerald-700">👉 1. Tay làm gì</strong> ➔ <strong className="text-blue-700">👀 2. Mắt thấy gì</strong> ➔ <strong className="text-rose-700">🚫 3. Tuyệt đối cấm gì</strong>.
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-mono text-[11px] font-black shrink-0 tracking-wider">
                MẮT THẤY · TAY LÀM
              </span>
            </div>
          </CardContent>\n        </Card>`;

if (content.includes(oldKhauQuyetEnd)) {
  content = content.replace(oldKhauQuyetEnd, newKhauQuyetEnd);
  console.log("Added top tip banner");
}

// 11. ADD POCKET GUIDE IN 5 MÓN ĐỒ & 4 DÂY
const oldCompStart = `                {/* 5 MÓN ĐỒ LỚN */}\n                <div className="space-y-2.5 sm:space-y-3">`;
const newCompStart = `                {/* BẢNG BỎ TÚI ĐỜI THƯỜNG SIÊU DỄ HIỂU */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-slate-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="font-black text-xs sm:text-sm uppercase tracking-wide text-amber-950 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Bảng Bỏ Túi: 5 Món Đồ Máy Tính = Hình Ảnh Đời Thường</span>
                    </strong>
                    <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                      AI CŨNG HIỂU
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-white border border-amber-200 text-center space-y-0.5">
                      <span className="text-lg block">🫀</span>
                      <strong className="text-slate-900 block text-[11px]">Nguồn (PSU)</strong>
                      <span className="text-amber-800 text-[10px] font-medium">= Quả tim bơm điện</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-amber-200 text-center space-y-0.5">
                      <span className="text-lg block">🏛️</span>
                      <strong className="text-slate-900 block text-[11px]">Mainboard</strong>
                      <span className="text-amber-800 text-[10px] font-medium">= Nền nhà &amp; đường đi</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-amber-200 text-center space-y-0.5">
                      <span className="text-lg block">🧠</span>
                      <strong className="text-slate-900 block text-[11px]">CPU</strong>
                      <span className="text-amber-800 text-[10px] font-medium">= Bộ não tính toán</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-amber-200 text-center space-y-0.5">
                      <span className="text-lg block">📑</span>
                      <strong className="text-slate-900 block text-[11px]">RAM (8GB)</strong>
                      <span className="text-amber-800 text-[10px] font-medium">= Mặt bàn làm việc</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-amber-200 text-center space-y-0.5">
                      <span className="text-lg block">🗄️</span>
                      <strong className="text-slate-900 block text-[11px]">Ổ Cứng SSD</strong>
                      <span className="text-amber-800 text-[10px] font-medium">= Tủ cất hồ sơ</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-amber-200 text-center space-y-0.5">
                      <span className="text-lg block">👓</span>
                      <strong className="text-slate-900 block text-[11px]">Card GT 730</strong>
                      <span className="text-amber-800 text-[10px] font-medium">= Kính xuất hình ảnh</span>
                    </div>
                  </div>
                </div>

                {/* 5 MÓN ĐỒ LỚN */}\n                <div className="space-y-2.5 sm:space-y-3">`;

if (content.includes(oldCompStart)) {
  content = content.replace(oldCompStart, newCompStart);
  console.log("Added pocket guide in components");
}

if (isCrlf) {
  content = content.replace(/\n/g, "\r\n");
}

fs.writeFileSync(filePath, content, "utf8");
console.log("Saved updated page.tsx successfully!");
