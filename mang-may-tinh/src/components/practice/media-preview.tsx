"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Maximize2, X, ZoomIn } from "lucide-react";
import type { LabStep } from "@/types/practice";

interface MediaPreviewProps {
  currentStep: LabStep;
}

/**
 * Cột bên phải: Sơ đồ kỹ thuật trực quan chuẩn iFixit
 * Hỗ trợ chế độ phóng to toàn màn hình (Projector Mode) khi trình chiếu tại phòng máy
 */
export function MediaPreview({ currentStep }: MediaPreviewProps) {
  const [isZoomed, setIsZoomed] = React.useState(false);

  // Render sơ đồ mô phỏng theo từng bước kỹ thuật
  const renderDiagramContent = () => {
    switch (currentStep.diagramType) {
      case "share_private_network":
        return (
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white border border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2 text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  WINDOWS SETTINGS &gt; NETWORK PROFILE
                </span>
                <span className="text-emerald-400 font-bold">Step 1 / 5</span>
              </div>

              {/* Public option */}
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start gap-3 opacity-60">
                <div className="w-4 h-4 rounded-full border border-slate-400 mt-1 shrink-0"></div>
                <div className="space-y-0.5 text-xs">
                  <div className="font-bold text-slate-300">Public (Mạng công cộng - Đang chặn)</div>
                  <div className="text-[11px] text-slate-400">
                    Máy tính bị ẩn, tường lửa tự động khóa toàn bộ chia sẻ file và máy in.
                  </div>
                </div>
              </div>

              {/* Private option (Selected) */}
              <div className="p-3.5 rounded-xl bg-slate-800 border-2 border-emerald-500 flex items-start gap-3 shadow-lg shadow-emerald-950/50">
                <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center mt-1 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-emerald-400 flex items-center gap-2">
                    <span>Private (Mạng riêng tư - Bắt buộc chọn)</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-900/80 text-emerald-200 text-[10px] font-mono">
                      ✓ ĐÃ CHỌN
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 leading-relaxed">
                    Cho phép các máy tính trong phòng thực hành nhìn thấy nhau và truyền tệp qua giao thức SMB (Cổng 445).
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-center">
              ✓ Cả máy phát và máy nhận đều phải chuyển sang Private Network!
            </div>
          </div>
        );

      case "share_advanced_settings":
        return (
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white border border-slate-700 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
                <span>CONTROL PANEL &gt; ADVANCED SHARING</span>
                <span className="text-emerald-400 font-bold">Step 2 / 5</span>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                    <span>Turn on network discovery</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">BẬT</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                    <span>Turn on file and printer sharing</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">BẬT</span>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-200 font-bold">
                    <span className="w-4 h-4 rounded bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-black">✓</span>
                    <span>Turn off password protected sharing</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-black">TẮT MẬT KHẨU</span>
                </div>
              </div>
            </div>

            <div className="text-xs font-mono font-bold text-amber-900 bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-center">
              💡 Tắt mật khẩu giúp học sinh trong bàn kỹ thuật truy cập thẳng không cần User/Pass!
            </div>
          </div>
        );

      case "share_permissions":
        return (
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white border border-slate-700 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
                <span>TAB SHARING &gt; PERMISSIONS</span>
                <span className="text-emerald-400 font-bold">Step 3 / 5</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300">
                <span className="text-slate-400">Group or user: </span>
                <strong className="text-white font-bold">Everyone</strong>
              </div>

              <div className="space-y-1.5 pt-1">
                {[
                  { name: "Full Control (Toàn quyền đọc/ghi/xóa)", allow: true },
                  { name: "Change (Chỉnh sửa và thêm file mới)", allow: true },
                  { name: "Read (Xem và sao chép dữ liệu)", allow: true },
                ].map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-800/80 border border-slate-700">
                    <span className="text-slate-300 text-[11px]">{p.name}</span>
                    <span className="w-5 h-5 rounded bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs font-mono font-bold text-blue-900 bg-blue-50 border border-blue-200 p-2.5 rounded-xl text-center">
              🚪 Cấp quyền tầng mạng: Cho phép mở rào đón dữ liệu từ toàn bộ mạng LAN!
            </div>
          </div>
        );

      case "share_security_tab":
        return (
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white border border-slate-700 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-red-400 font-bold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                  TAB SECURITY (NTFS) - POKA-YOKE
                </span>
                <span className="text-emerald-400 font-bold">Step 4 / 5</span>
              </div>

              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/60 text-red-200 text-[11px] leading-relaxed">
                <strong>BẮT BUỘC:</strong> Nhấn nút <strong>Edit...</strong> ➔ Nhấn <strong>Add...</strong> ➔ Gõ <strong>Everyone</strong> ➔ Tích <strong>Full Control</strong>!
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>Permissions for Everyone:</span>
                  <span className="text-emerald-400 font-bold">ALLOW</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400">
                  <div>✓ Full control</div>
                  <div>✓ Modify</div>
                  <div>✓ Read &amp; execute</div>
                  <div>✓ Write (Ghi file)</div>
                </div>
              </div>
            </div>

            <div className="text-xs font-mono font-bold text-red-900 bg-red-50 border border-red-200 p-2.5 rounded-xl text-center">
              ⚠️ 99% trường hợp bị lỗi &quot;Access Denied&quot; là do quên cấp quyền tại Tab Security này!
            </div>
          </div>
        );

      case "share_run_ip":
        return (
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white border border-slate-700 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
                <span>WINDOWS + R &gt; RUN DIALOG</span>
                <span className="text-emerald-400 font-bold">Step 5 / 5</span>
              </div>

              {/* Mô phỏng hộp thoại Run */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-700 space-y-2">
                <span className="text-[11px] text-slate-400">Nhập đường dẫn IP máy chủ chia sẻ:</span>
                <div className="p-2.5 rounded-lg bg-slate-800 border-2 border-emerald-500 text-white font-mono text-sm font-bold flex items-center justify-between">
                  <span className="text-emerald-400">\\192.168.1.50</span>
                  <span className="text-[10px] bg-emerald-600 px-2 py-0.5 rounded text-white font-sans">
                    Nhấn Enter
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-2">
                <span className="text-base">📁</span>
                <span className="font-bold text-white">D:\TAI_LIEU_THUC_HANH</span>
                <span className="text-emerald-400 ml-auto font-bold">✓ ĐÃ KẾT NỐI</span>
              </div>
            </div>

            <div className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-center">
              🎉 Thư mục đã mở thành công! Bạn có thể kéo thả copy file trực tiếp qua mạng LAN.
            </div>
          </div>
        );
      case "strip_cable":
        return (
          <div className="space-y-4 text-center">
            <div className="relative w-full h-44 sm:h-56 bg-slate-900 rounded-2xl flex items-center justify-center p-4 border border-slate-700">
              {/* Mô phỏng dây cáp xoắn đôi */}
              <div className="flex items-center">
                {/* Vỏ bọc màu xanh dương */}
                <div className="w-32 sm:w-44 h-9 bg-blue-600 rounded-l-md flex items-center justify-center text-white font-mono text-xs font-bold shadow-inner">
                  Vỏ cáp Cat5e/Cat6
                </div>
                {/* Phần vỏ tuốt 3cm để lộ 4 cặp dây xoắn */}
                <div className="w-24 sm:w-36 h-8 bg-slate-800 border-y-2 border-dashed border-amber-400 flex items-center justify-around px-1.5">
                  <div className="w-2 h-7 bg-orange-400 rounded-sm"></div>
                  <div className="w-2 h-7 bg-emerald-400 rounded-sm"></div>
                  <div className="w-2 h-7 bg-blue-400 rounded-sm"></div>
                  <div className="w-2 h-7 bg-amber-600 rounded-sm"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-slate-700 bg-amber-50 border border-amber-200 p-2.5 rounded-xl">
              <span>📏 Tiêu chuẩn:</span>
              <span>Độ dài tuốt vỏ bảo vệ đúng <strong>2.5 cm — 3.0 cm</strong></span>
            </div>
          </div>
        );

      case "arrange_wires":
        return (
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white border border-slate-700">
              <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2 mb-3 text-slate-400">
                <span>8 LÕI MÀU CHUẨN T568B</span>
                <span className="text-emerald-400 font-bold">Từ trái qua phải</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {[
                  { pin: 1, name: "Trắng Cam", bg: "bg-orange-100 text-orange-950 border-orange-400" },
                  { pin: 2, name: "Cam", bg: "bg-orange-500 text-white border-orange-600" },
                  { pin: 3, name: "Trắng Xanh Lá", bg: "bg-emerald-100 text-emerald-950 border-emerald-400" },
                  { pin: 4, name: "Xanh Dương", bg: "bg-blue-600 text-white border-blue-700" },
                  { pin: 5, name: "Trắng Xanh Dương", bg: "bg-blue-100 text-blue-950 border-blue-400" },
                  { pin: 6, name: "Xanh Lá", bg: "bg-emerald-600 text-white border-emerald-700" },
                  { pin: 7, name: "Trắng Nâu", bg: "bg-amber-100 text-amber-950 border-amber-400" },
                  { pin: 8, name: "Nâu", bg: "bg-amber-800 text-white border-amber-900" },
                ].map((w) => (
                  <div key={w.pin} className="flex flex-col items-center bg-slate-800 p-2 rounded-xl border border-slate-700">
                    <span className="text-[10px] font-mono text-slate-400 mb-1">Pin {w.pin}</span>
                    <div className={`w-5 h-16 rounded border flex items-center justify-center font-bold text-xs ${w.bg}`}>
                      {w.pin}
                    </div>
                    <span className="text-[10px] text-center mt-1.5 text-slate-200 leading-tight">
                      {w.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-center text-slate-600 font-medium">
              💡 <strong>Thần chú nhớ màu:</strong> Cam xen kẽ Lá — Dương kẹp giữa — Nâu về cuối.
            </p>
          </div>
        );

      case "trim_wires":
        return (
          <div className="space-y-4 text-center">
            <div className="w-full h-44 sm:h-56 bg-slate-900 rounded-2xl flex flex-col items-center justify-center p-4 border border-slate-700 relative overflow-hidden">
              {/* Lưỡi kéo kìm cắt bằng 8 lõi */}
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="w-3 h-20 bg-amber-400 rounded-t-xs border border-amber-500"></div>
                ))}
              </div>
              <div className="w-48 h-1 bg-red-500 relative">
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-mono font-bold">
                  ĐƯỜNG CẮT BẰNG 90°
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-slate-700 bg-blue-50 border border-blue-200 p-2.5 rounded-xl">
              <span>✂️ Chiều dài chuẩn:</span>
              <span>Chừa lại đúng <strong>1.2 cm — 1.5 cm</strong> để đút kịch hạt RJ45</span>
            </div>
          </div>
        );

      case "crimp_rj45":
        return (
          <div className="space-y-4 text-center">
            <div className="w-full h-44 sm:h-56 bg-slate-900 rounded-2xl flex flex-col items-center justify-center p-4 border border-slate-700">
              <div className="w-32 h-24 bg-slate-800 border-2 border-emerald-400 rounded-xl flex flex-col items-center justify-between p-2 shadow-lg">
                <div className="w-full flex justify-between px-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
                    <div key={p} className="w-1.5 h-4 bg-amber-300 rounded-xs"></div>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">CHẠM KỊCH ĐẦU VÀNG</span>
                <div className="w-20 h-4 bg-blue-600 rounded text-[9px] text-white font-mono flex items-center justify-center">
                  VỎ CÁP VÀO SÂU
                </div>
              </div>
            </div>
            <div className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
              ✓ Kiểm tra 2 điểm chạm: 8 chân đồng chạm đỉnh & vỏ cáp chui qua ngàm khóa
            </div>
          </div>
        );

      case "cable_tester":
        return (
          <div className="space-y-4 text-center">
            <div className="w-full h-44 sm:h-56 bg-slate-900 rounded-2xl flex items-center justify-center gap-6 p-4 border border-slate-700">
              {/* Máy phát Master */}
              <div className="w-24 h-36 bg-slate-800 rounded-xl border border-slate-600 p-2 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-slate-300 font-bold">MASTER</span>
                <div className="grid grid-cols-2 gap-1.5 px-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <div key={n} className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400"></div>
                  ))}
                </div>
                <span className="text-[9px] text-emerald-400 font-mono">8 ĐÈN SÁNG</span>
              </div>
              {/* Máy thu Remote */}
              <div className="w-24 h-36 bg-slate-800 rounded-xl border border-slate-600 p-2 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-slate-300 font-bold">REMOTE</span>
                <div className="grid grid-cols-2 gap-1.5 px-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <div key={n} className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400"></div>
                  ))}
                </div>
                <span className="text-[9px] text-emerald-400 font-mono">8 ĐÈN SÁNG</span>
              </div>
            </div>
            <div className="text-xs font-mono font-bold text-slate-900 bg-slate-100 border border-slate-200 p-2.5 rounded-xl">
              Đèn nhảy tuần tự từ 1 ➔ 8 cùng nhịp ở cả hai bên máy
            </div>
          </div>
        );

      case "switch_plug":
        return (
          <div className="space-y-4 text-center">
            <div className="w-full h-44 sm:h-56 bg-slate-900 rounded-2xl flex flex-col items-center justify-center p-4 border border-slate-700">
              <div className="w-56 h-14 bg-slate-800 rounded-lg border border-slate-600 flex items-center justify-around px-3">
                <div className="w-7 h-5 bg-slate-950 border border-slate-700 rounded-xs flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                </div>
                <div className="text-left text-xs font-mono text-slate-300">
                  <span className="block font-bold text-white">PORT 01: UP</span>
                  <span className="text-[10px] text-emerald-400">Link 1000 Mbps Full-Duplex</span>
                </div>
              </div>
            </div>
            <div className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
              Đèn Link/Act màu xanh lá nhấp nháy ➔ Hoàn tất thông mạng 100%!
            </div>
          </div>
        );

      case "ip_config":
        return (
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white border border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2 text-slate-400">
                <span>INTERNET PROTOCOL VERSION 4 (TCP/IPv4)</span>
                <span className="text-emerald-400 font-bold">Static IP</span>
              </div>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                  <span className="text-slate-400">IP address:</span>
                  <span className="text-emerald-400 font-bold text-sm">192.168.1.10</span>
                </div>
                <div className="flex items-center justify-between bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                  <span className="text-slate-400">Subnet mask:</span>
                  <span className="text-amber-400 font-bold">255.255.255.0</span>
                </div>
                <div className="flex items-center justify-between bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                  <span className="text-slate-400">Default gateway:</span>
                  <span className="text-blue-400 font-bold">192.168.1.1</span>
                </div>
                <div className="flex items-center justify-between bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                  <span className="text-slate-400">Preferred DNS:</span>
                  <span className="text-purple-400 font-bold">8.8.8.8</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-700">
              <div className="p-2 rounded-xl bg-blue-50 border border-blue-200">
                🏡 <strong>IP:</strong> Số nhà riêng biệt của máy tính trong mạng.
              </div>
              <div className="p-2 rounded-xl bg-purple-50 border border-purple-200">
                🚪 <strong>Gateway:</strong> Cổng làng để đi ra mạng ngoài (Internet).
              </div>
            </div>
          </div>
        );

      case "subnetting":
        return (
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white border border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2 text-slate-400">
                <span>CHIA MẠNG CON: 192.168.1.0/24 ➔ /26</span>
                <span className="text-amber-400 font-bold">4 Subnet (64 IP/mạng)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-800 border border-emerald-500/50">
                  <div className="font-bold text-emerald-400 mb-1">Mạng 1: Phòng Lab 1</div>
                  <div className="text-slate-300">Net ID: 192.168.1.0</div>
                  <div className="text-slate-400">Dải Host: .1 ➔ .62</div>
                  <div className="text-slate-500 text-[10px]">Broadcast: 192.168.1.63</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800 border border-blue-500/50">
                  <div className="font-bold text-blue-400 mb-1">Mạng 2: Phòng Lab 2</div>
                  <div className="text-slate-300">Net ID: 192.168.1.64</div>
                  <div className="text-slate-400">Dải Host: .65 ➔ .126</div>
                  <div className="text-slate-500 text-[10px]">Broadcast: 192.168.1.127</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800 border border-purple-500/50">
                  <div className="font-bold text-purple-400 mb-1">Mạng 3: Giảng Viên</div>
                  <div className="text-slate-300">Net ID: 192.168.1.128</div>
                  <div className="text-slate-400">Dải Host: .129 ➔ .190</div>
                  <div className="text-slate-500 text-[10px]">Broadcast: 192.168.1.191</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800 border border-amber-500/50">
                  <div className="font-bold text-amber-400 mb-1">Mạng 4: Máy Chủ Lab</div>
                  <div className="text-slate-300">Net ID: 192.168.1.192</div>
                  <div className="text-slate-400">Dải Host: .193 ➔ .254</div>
                  <div className="text-slate-500 text-[10px]">Broadcast: 192.168.1.255</div>
                </div>
              </div>
            </div>
            <div className="text-xs text-center font-mono font-bold text-slate-800 bg-amber-50 border border-amber-200 p-2.5 rounded-xl">
              Subnet Mask mới: <strong>255.255.255.192 (/26)</strong> (Mượn 2 bit mạng)
            </div>
          </div>
        );

      case "switch_vlan":
        return (
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white border border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2 text-slate-400">
                <span>SWITCH CISCO/TP-LINK 24-PORT GIGABIT</span>
                <span className="text-emerald-400 font-bold">VLAN ISOLATION</span>
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 py-2">
                {[...Array(24)].map((_, i) => {
                  const portNum = i + 1;
                  const isVlan10 = portNum <= 12;
                  const isVlan20 = portNum > 12 && portNum <= 20;
                  const isTrunk = portNum > 20;
                  return (
                    <div
                      key={portNum}
                      className={`flex flex-col items-center justify-center p-1 rounded border text-[9px] font-mono ${
                        isVlan10
                          ? "bg-blue-950/80 border-blue-500 text-blue-300"
                          : isVlan20
                          ? "bg-purple-950/80 border-purple-500 text-purple-300"
                          : "bg-emerald-950/80 border-emerald-500 text-emerald-300"
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-current mb-0.5 animate-pulse"></div>
                      <span>{portNum}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-300 pt-1 border-t border-slate-800">
                <span className="text-blue-400 font-bold">Port 1-12: VLAN 10 (Sinh Viên)</span>
                <span className="text-purple-400 font-bold">Port 13-20: VLAN 20 (Giáo Viên)</span>
                <span className="text-emerald-400 font-bold">Port 21-24: Trunk Uplink</span>
              </div>
            </div>
            <div className="text-xs text-center font-mono font-bold text-slate-800 bg-slate-100 border border-slate-200 p-2.5 rounded-xl">
              Phân tách miền phát sóng Broadcast: Hai phòng không nhìn thấy nhau, bảo mật tuyệt đối!
            </div>
          </div>
        );

      case "router_dhcp":
        return (
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white border border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2 text-slate-400">
                <span>ROUTER GATEWAY - DHCP POOL</span>
                <span className="text-emerald-400 font-bold">CẤP PHÁT TỰ ĐỘNG</span>
              </div>
              <div className="space-y-2 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 flex justify-between">
                  <span className="text-slate-400">Gateway IP:</span>
                  <span className="text-white font-bold">192.168.1.1</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 flex justify-between">
                  <span className="text-slate-400">Dải IP cấp phát (Pool):</span>
                  <span className="text-emerald-400 font-bold">192.168.1.100 ➔ 192.168.1.200</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 flex justify-between">
                  <span className="text-slate-400">Thời gian thuê (Lease time):</span>
                  <span className="text-amber-400 font-bold">86400 giây (24 giờ)</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-center font-mono font-bold text-blue-900 bg-blue-50 border border-blue-200 p-2.5 rounded-xl">
              Quy trình 4 bước DORA: Discover ➔ Offer ➔ Request ➔ Acknowledge
            </div>
          </div>
        );

      case "troubleshoot_cmd":
        return (
          <div className="space-y-4">
            <div className="bg-slate-950 rounded-2xl p-4 sm:p-5 text-emerald-400 font-mono text-xs border border-slate-800 shadow-inner">
              <div className="flex items-center gap-1.5 pb-2 border-b border-slate-800 text-slate-500 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] ml-2 text-slate-400">Command Prompt - C:\Windows\System32\cmd.exe</span>
              </div>
              <p className="text-slate-300">C:\Users\Student&gt; <span className="text-white font-bold">ping 192.168.1.1 -n 4</span></p>
              <div className="py-2 space-y-1 text-slate-300">
                <p>Pinging 192.168.1.1 with 32 bytes of data:</p>
                <p>Reply from 192.168.1.1: bytes=32 <span className="text-emerald-400 font-bold">time&lt;1ms</span> TTL=64</p>
                <p>Reply from 192.168.1.1: bytes=32 <span className="text-emerald-400 font-bold">time&lt;1ms</span> TTL=64</p>
                <p>Reply from 192.168.1.1: bytes=32 <span className="text-emerald-400 font-bold">time&lt;1ms</span> TTL=64</p>
                <p>Reply from 192.168.1.1: bytes=32 <span className="text-emerald-400 font-bold">time&lt;1ms</span> TTL=64</p>
              </div>
              <p className="text-slate-400 text-[10px] border-t border-slate-800 pt-1.5">
                Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)
              </p>
            </div>
            <div className="text-xs text-center font-mono font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
              ✓ Độ trễ &lt;1ms không mất gói ➔ Tuyến cáp và Card mạng hoạt động hoàn hảo!
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Card className="border-slate-200 shadow-sm sticky top-20">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <span>🔍</span>
              <span>Sơ Đồ Kỹ Thuật Bước {currentStep.stepNumber}</span>
            </CardTitle>
            <span className="text-xs text-slate-500 font-medium">
              Đối chiếu mẫu trực quan trước khi thực hiện
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsZoomed(true)}
            className="flex items-center gap-1.5 text-xs font-bold border-slate-300"
            title="Phóng to sơ đồ cho màn hình máy chiếu phòng lab"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Phóng to</span>
          </Button>
        </CardHeader>

        <CardContent className="pt-2">
          {renderDiagramContent()}
        </CardContent>
      </Card>

      {/* MODAL PHÓNG TO SƠ ĐỒ TOÀN MÀN HÌNH (PROJECTOR LIGHTBOX) */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ZoomIn className="w-5 h-5 text-slate-900" />
                <h3 className="text-lg font-black text-slate-900">
                  Sơ Đồ Bước {currentStep.stepNumber}: {currentStep.title}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsZoomed(false)}
                className="rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="py-4">
              {renderDiagramContent()}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <Button size="touch" onClick={() => setIsZoomed(false)} className="bg-slate-900 hover:bg-slate-800 text-white font-bold">
                Đóng Chế Độ Chiếu
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
