"use client";

import * as React from "react";
import { StepByStepGuide } from "@/components/practice/step-by-step-guide";
import { MediaPreview } from "@/components/practice/media-preview";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, ShieldCheck, CheckSquare } from "lucide-react";
import type { LabLesson } from "@/types/practice";

interface LabSplitViewProps {
  lesson: LabLesson;
}

/**
 * Khung điều phối bài thực hành chia đôi màn hình (iFixit Split-Screen Layout)
 * Bên trái: Hướng dẫn từng bước & Checkbox hoàn thành
 * Bên phải: Sơ đồ kỹ thuật tương tác (Sticky)
 */
export function LabSplitView({ lesson }: LabSplitViewProps) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<Record<number, boolean>>({});
  const [isSavedLocally, setIsSavedLocally] = React.useState(false);

  const storageKey = `MANG_LAB_PROGRESS_${lesson.code}`;

  // Nạp tiến độ đã lưu từ localStorage
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCompletedSteps(JSON.parse(saved));
      }
    } catch {}
  }, [storageKey]);

  // Đảo trạng thái hoàn thành của một bước
  const handleToggleComplete = (stepId: number) => {
    const updated = {
      ...completedSteps,
      [stepId]: !completedSteps[stepId],
    };
    setCompletedSteps(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
      setIsSavedLocally(true);
      setTimeout(() => setIsSavedLocally(false), 2000);
    } catch {}
  };

  const totalSteps = lesson.steps.length;
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  const activeStep = lesson.steps[currentStepIndex];

  return (
    <div className="space-y-6">
      {/* ==================================================================== */}
      {/* 1. THANH TIÊU ĐỀ & TIẾN ĐỘ BÀI THỰC HÀNH                              */}
      {/* ==================================================================== */}
      <Card className="border-slate-200 bg-white shadow-xs">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-mono text-xs font-bold">
                  {lesson.code}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {lesson.moduleName} · {lesson.level}
                </span>
              </div>
              <CardTitle className="text-xl sm:text-2xl font-black text-slate-900">
                {lesson.title}
              </CardTitle>
            </div>

            {/* Thông số tiến độ */}
            <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
              <span className="text-xs font-bold text-slate-500">Tiến độ bài lab:</span>
              <span className="text-lg sm:text-2xl font-black text-slate-900 font-mono">
                {completedCount} / {totalSteps} bước ({progressPercent}%)
              </span>
            </div>
          </div>

          {/* Thanh Progress Bar */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </CardHeader>

        {/* 3 Điểm dừng an toàn 5S */}
        <CardContent className="pt-0">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>An toàn Poka-Yoke:</strong> {lesson.safetyBrief}</span>
            </div>
            {isSavedLocally && (
              <span className="text-emerald-700 font-bold text-xs shrink-0 animate-in fade-in">
                ✓ Đã lưu tự động
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ==================================================================== */}
      {/* 2. CHIA ĐÔI MÀN HÌNH CHUẨN IFIXIT (SPLIT-SCREEN VIEW)                 */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CỘT BÊN TRÁI (7/12 cột): HƯỚNG DẪN TỪNG BƯỚC */}
        <div className="lg:col-span-7 space-y-4">
          <StepByStepGuide
            step={activeStep}
            isCompleted={Boolean(completedSteps[activeStep.id])}
            onToggleComplete={handleToggleComplete}
          />
        </div>

        {/* CỘT BÊN PHẢI (5/12 cột): SƠ ĐỒ KỸ THUẬT TƯƠNG TÁC (STICKY) */}
        <div className="lg:col-span-5">
          <MediaPreview currentStep={activeStep} />
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. THANH ĐIỀU HƯỚNG CHUYỂN BƯỚC & NÚT CHẠM LỚN (>= 48PX)              */}
      {/* ==================================================================== */}
      <Card className="border-slate-200 bg-white shadow-xs p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Nút lùi bước */}
          <Button
            variant="outline"
            size="touch"
            disabled={currentStepIndex === 0}
            onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
            className="w-full sm:w-auto font-bold border-slate-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Bước Trước</span>
          </Button>

          {/* Dàn chấm số bước */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1">
            {lesson.steps.map((st, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isDone = Boolean(completedSteps[st.id]);
              return (
                <button
                  key={st.id}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`w-9 h-9 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                    isCurrent
                      ? "bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-2"
                      : isDone
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  title={`Bước ${st.stepNumber}: ${st.title}`}
                >
                  {isDone ? "✓" : st.stepNumber}
                </button>
              );
            })}
          </div>

          {/* Nút tiến bước */}
          {currentStepIndex < totalSteps - 1 ? (
            <Button
              size="touch"
              onClick={() => setCurrentStepIndex((prev) => Math.min(totalSteps - 1, prev + 1))}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold"
            >
              <span>Bước Tiếp Theo</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              size="touch"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              onClick={() => {
                if (completedCount === totalSteps) {
                  alert("Chúc mừng nhóm KTV đã hoàn thành 100% các bước bài thực hành mạng!");
                } else {
                  alert(`Nhóm KTV đã hoàn thành ${completedCount}/${totalSteps} bước. Hãy kiểm tra các bước còn lại trước khi nghiệm thu!`);
                }
              }}
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              <span>Nghiệm Thu Bài Lab</span>
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
