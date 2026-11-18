"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Định nghĩa 8 màu chuẩn T568B
const T568B_WIRES = [
  { pin: 1, name: "Trắng Cam", bg: "bg-orange-100 text-orange-950 border-orange-400", border: "#fb923c" },
  { pin: 2, name: "Cam", bg: "bg-orange-500 text-white border-orange-600", border: "#ea580c" },
  { pin: 3, name: "Trắng Xanh Lá", bg: "bg-emerald-100 text-emerald-950 border-emerald-400", border: "#4ade80" },
  { pin: 4, name: "Xanh Dương", bg: "bg-blue-600 text-white border-blue-700", border: "#2563eb" },
  { pin: 5, name: "Trắng Xanh Dương", bg: "bg-blue-100 text-blue-950 border-blue-400", border: "#60a5fa" },
  { pin: 6, name: "Xanh Lá", bg: "bg-emerald-600 text-white border-emerald-700", border: "#16a34a" },
  { pin: 7, name: "Trắng Nâu", bg: "bg-amber-100 text-amber-950 border-amber-400", border: "#d97706" },
  { pin: 8, name: "Nâu", bg: "bg-amber-800 text-white border-amber-900", border: "#92400e" },
];

// Định nghĩa 8 màu chuẩn T568A (Đảo cặp Cam và Xanh lá: Pin 1-2 đổi với Pin 3-6)
const T568A_WIRES = [
  { pin: 1, name: "Trắng Xanh Lá", bg: "bg-emerald-100 text-emerald-950 border-emerald-400", border: "#4ade80" },
  { pin: 2, name: "Xanh Lá", bg: "bg-emerald-600 text-white border-emerald-700", border: "#16a34a" },
  { pin: 3, name: "Trắng Cam", bg: "bg-orange-100 text-orange-950 border-orange-400", border: "#fb923c" },
  { pin: 4, name: "Xanh Dương", bg: "bg-blue-600 text-white border-blue-700", border: "#2563eb" },
  { pin: 5, name: "Trắng Xanh Dương", bg: "bg-blue-100 text-blue-950 border-blue-400", border: "#60a5fa" },
  { pin: 6, name: "Cam", bg: "bg-orange-500 text-white border-orange-600", border: "#ea580c" },
  { pin: 7, name: "Trắng Nâu", bg: "bg-amber-100 text-amber-950 border-amber-400", border: "#d97706" },
  { pin: 8, name: "Nâu", bg: "bg-amber-800 text-white border-amber-900", border: "#92400e" },
];

/**
 * Bộ mô phỏng Bấm cáp mạng RJ45 & Hộp test 8 đèn LED Poka-Yoke
 * Giúp học sinh ghi nhớ thứ tự 8 sợi màu trước khi bấm kìm thực tế
 */
export function Rj45Simulator() {
  const [standard, setStandard] = React.useState<"T568B" | "T568A">("T568B");
  const [activeLed, setActiveLed] = React.useState<number | null>(null);
  const [isTesting, setIsTesting] = React.useState(false);
  const [testResult, setTestResult] = React.useState<string | null>(null);

  const wires = standard === "T568B" ? T568B_WIRES : T568A_WIRES;

  // Mô phỏng kiểm tra thông mạch tuần tự từ chân 1 đến 8 (Poka-Yoke)
  const runCableTest = () => {
    if (isTesting) return;
    setIsTesting(true);
    setTestResult(null);
    let current = 1;

    const interval = setInterval(() => {
      setActiveLed(current);
      current++;

      if (current > 8) {
        clearInterval(interval);
        setTimeout(() => {
          setActiveLed(null);
          setIsTesting(false);
          setTestResult("✅ HOÀN HẢO: 8/8 sợi cáp thông suốt, không chập, không đảo chéo!");
        }, 500);
      }
    }, 280);
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <span>🔌</span>
              <span>Mô Phỏng Thứ Tự 8 Lõi Cáp Mạng UTP & Hộp Test LED</span>
            </CardTitle>
            <CardDescription>
              Luyện ghi nhớ chuẩn màu T568A/T568B và kiểm tra an toàn Poka-Yoke trước khi cắm vào Switch
            </CardDescription>
          </div>
          {/* Nút chuyển đổi chuẩn màu */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setStandard("T568B")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                standard === "T568B" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Chuẩn T568B (Phổ thông)
            </button>
            <button
              onClick={() => setStandard("T568A")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                standard === "T568A" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Chuẩn T568A
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Hiển thị đầu cắm hạt mạng RJ45 trực quan */}
        <div className="rounded-2xl bg-slate-900 p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs font-mono">
            <span className="text-slate-400">ĐẦU BẤM RJ45 (HƯỚNG LẪY NHỰA ÚP XUỐNG DƯỚI)</span>
            <span className="text-emerald-400 font-bold">{standard} (Thẳng góc từ trái qua phải)</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
            {wires.map((w) => (
              <div
                key={w.pin}
                className="flex flex-col items-center bg-slate-800/80 rounded-xl p-2.5 border border-slate-700 transition-all hover:border-slate-500"
              >
                <span className="text-xs font-mono text-slate-400 mb-1.5">Pin {w.pin}</span>
                {/* Lõi dây màu */}
                <div
                  className={`w-6 h-14 sm:h-20 rounded-md border-2 shadow-inner flex items-center justify-center font-bold text-xs ${w.bg}`}
                >
                  <span className="text-[10px] font-mono">{w.pin}</span>
                </div>
                <span className="text-[11px] font-semibold text-center mt-2 text-slate-200 leading-tight">
                  {w.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hộp Test cáp mạng 8 đèn LED Poka-Yoke */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
              <span>💡</span>
              <span>Hộp Kiểm Tra Cáp Mạng (Cable Tester 8 Đèn)</span>
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-600">
              Quy tắc KTV 2: Tuyệt đối không cắm cáp vào cổng Switch mạng khi chưa kiểm tra sáng đủ 8 đèn!
            </p>
          </div>

          {/* Dàn đèn LED 1-8 */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              const isOn = activeLed === num;
              return (
                <div key={num} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                      isOn
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50 scale-110"
                        : "bg-slate-200 text-slate-500 border border-slate-300"
                    }`}
                  >
                    {num}
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">{num}</span>
                </div>
              );
            })}
          </div>

          <Button
            onClick={runCableTest}
            disabled={isTesting}
            size="touch"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800"
          >
            {isTesting ? "Đang dò tín hiệu 1-8..." : "Bấm Test Cáp (KTV 2)"}
          </Button>
        </div>

        {testResult && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold animate-in fade-in">
            {testResult}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
