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
