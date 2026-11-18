"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import type { LabStep } from "@/types/practice";

interface StepByStepGuideProps {
  step: LabStep;
  isCompleted: boolean;
  onToggleComplete: (stepId: number) => void;
}

/**
 * Cột bên trái: Hướng dẫn từng bước thao tác thực hành (Chuẩn iFixit)
 * Font chữ lớn, tương phản cao, hỗ trợ máy chiếu phòng máy và học sinh 9+3
 */
export function StepByStepGuide({
  step,
  isCompleted,
  onToggleComplete,
}: StepByStepGuideProps) {
  return (
    <Card
      className={`border-2 transition-all ${
        isCompleted
          ? "border-emerald-300 bg-emerald-50/20"
          : "border-slate-200 bg-white"
      }`}
    >
      <CardHeader className="pb-3">
        {/* Hàng thông tin đầu mục: Số bước, vai trò KTV và thời gian */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 text-white font-mono text-sm font-black shadow-xs">
              {step.stepNumber}
            </span>
            <span className="text-xs font-mono font-bold text-slate-500 uppercase">
              Bước {step.stepNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Huy hiệu vai trò KTV */}
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                step.role.includes("KTV 1")
                  ? "bg-blue-100 text-blue-900 border-blue-300"
                  : step.role.includes("KTV 2")
                  ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                  : "bg-purple-100 text-purple-900 border-purple-300"
              }`}
            >
              {step.role}
            </span>
            <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
              ⏱️ {step.timeEstimate}
            </span>
          </div>
        </div>

        {/* Tiêu đề bước: Font chữ to, đậm nét chiếu rõ trên máy chiếu */}
        <CardTitle className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
          {step.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Danh sách hành động ngắn gọn (dưới 15 từ mỗi ý) */}
        <ul className="space-y-2.5 text-sm sm:text-base text-slate-800 font-medium">
          {step.instructions.map((ins, idx) => (
            <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
              <span className="w-2 h-2 rounded-full bg-slate-900 mt-2 shrink-0"></span>
              <span>{ins}</span>
            </li>
          ))}
        </ul>

        {/* Ví von đời thường */}
        {step.analogy && (
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-start gap-2 font-medium">
            <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <p>
              <strong>Ví von dễ hiểu:</strong> {step.analogy}
            </p>
          </div>
        )}

        {/* Cảnh báo an toàn Poka-Yoke bắt buộc kiểm tra */}
        <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-950 text-xs sm:text-sm space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-900 uppercase tracking-wide text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>Điểm Dừng An Toàn Poka-Yoke:</span>
          </div>
          <p className="font-semibold leading-relaxed pl-5 text-amber-900">
            {step.pokaYoke}
          </p>
        </div>

        {/* Checkbox xác nhận hoàn thành bước (Kích thước lớn chạm tốt trên mobile) */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onToggleComplete(step.id)}
            className={`w-full min-h-[48px] p-3 rounded-xl border-2 flex items-center justify-center gap-3 transition-all cursor-pointer font-bold text-sm select-none active:scale-[0.99] ${
              isCompleted
                ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                : "bg-white border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
            }`}
          >
            <CheckCircle2
              className={`w-5 h-5 transition-transform ${
                isCompleted ? "scale-110 text-white" : "text-slate-400"
              }`}
            />
            <span>
              {isCompleted
                ? "✓ ĐÃ HOÀN THÀNH BƯỚC NÀY (KTV XÁC NHẬN)"
                : "Tích chọn khi đã làm xong bước này"}
            </span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
