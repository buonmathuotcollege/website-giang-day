"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase/client";
import { CheckCircle2, AlertTriangle, Send, ShieldCheck, CheckSquare } from "lucide-react";

interface PracticeFormProps {
  labCode: string;
  labTitle: string;
  onSuccess?: () => void;
}

/**
 * Component Biểu mẫu Nghiệm thu & Chấm điểm Thực hành Mạng (PracticeForm)
 * Phục vụ báo cáo kết quả của Bàn Kỹ thuật (KTV 1, KTV 2, KTV 3)
 * Lưu trữ an toàn 2 lớp: Supabase Database + LocalStorage dự phòng
 */
export function PracticeForm({ labCode, labTitle, onSuccess }: PracticeFormProps) {
  // Trạng thái form
  const [benchId, setBenchId] = React.useState<number>(1);
  const [className, setClassName] = React.useState<string>("03THA9 (9+3)");
  const [operatorName, setOperatorName] = React.useState<string>("");
  const [safetyName, setSafetyName] = React.useState<string>("");
  const [recorderName, setRecorderName] = React.useState<string>("");

  // Thông số kỹ thuật thực hành
  const [cableStandard, setCableStandard] = React.useState<string>("T568B");
  const [cableTestResult, setCableTestResult] = React.useState<string>("8/8 sợi thông suốt");
  const [ipAssigned, setIpAssigned] = React.useState<string>("");
  const [subnetMask, setSubnetMask] = React.useState<string>("255.255.255.0");
  const [pokaYokePassed, setPokaYokePassed] = React.useState<boolean>(false);

  // Trạng thái gửi
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [statusMessage, setStatusMessage] = React.useState<{
    type: "success" | "error" | "warning";
    text: string;
  } | null>(null);

  // Tự động nạp thông tin bàn và nhóm học sinh đã đăng ký từ trước
  React.useEffect(() => {
    try {
      const savedCheckin = localStorage.getItem("MANG_BENCH_REGISTRATION");
      if (savedCheckin) {
        const parsed = JSON.parse(savedCheckin);
        if (parsed.benchNumber) setBenchId(parsed.benchNumber);
        if (parsed.className) setClassName(parsed.className);
        if (parsed.ktv1) setOperatorName(parsed.ktv1);
        if (parsed.ktv2) setSafetyName(parsed.ktv2);
        if (parsed.ktv3) setRecorderName(parsed.ktv3);
      }
    } catch {}
  }, []);

  // Xử lý gửi biểu mẫu nghiệm thu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // Kiểm tra ràng buộc nhập liệu
    if (!operatorName.trim() || !safetyName.trim() || !recorderName.trim()) {
      setStatusMessage({
        type: "error",
        text: "Vui lòng nhập đầy đủ họ tên của cả 3 Kỹ thuật viên (KTV 1, KTV 2, KTV 3) tại Bàn kỹ thuật.",
      });
      return;
    }

    if (!pokaYokePassed) {
      setStatusMessage({
        type: "warning",
        text: "KTV 2 phải kiểm tra thực tế và xác nhận hoàn thành 3 điểm dừng an toàn 5S Poka-Yoke.",
      });
      return;
    }

    setIsSubmitting(true);

    const submissionPayload = {
      class_name: className,
      session_name: `${labCode} - ${labTitle}`,
      bench_id: benchId,
      operator_name: operatorName.trim(),
      safety_name: safetyName.trim(),
      recorder_name: recorderName.trim(),
      cable_standard: cableStandard,
      cable_test_result: cableTestResult,
      ip_assigned: ipAssigned.trim() || null,
      subnet_mask: subnetMask.trim() || null,
      poka_yoke_passed: pokaYokePassed,
      teacher_approved: false,
      score: 10.0, // Điểm số cơ sở trước khi Giảng viên thẩm tra thực tế
    };

    try {
      // 1. Gửi lên Supabase
      const { error } = await supabase
        .from("lab_submissions")
        .insert([submissionPayload] as any);

      if (error) {
        throw error;
      }

      // 2. Lưu bản sao vào LocalStorage phòng ngừa sự cố mạng
      const localHistoryKey = `MANG_SUBMISSION_${labCode}_BENCH_${benchId}`;
      localStorage.setItem(localHistoryKey, JSON.stringify({
        ...submissionPayload,
        submittedAt: new Date().toISOString(),
      }));

      setStatusMessage({
        type: "success",
        text: `Nộp phiếu nghiệm thu thành công! Bàn ${benchId} đã gửi dữ liệu lên hệ thống của Giảng viên.`,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      // Cơ chế an toàn 2 lớp: Lưu vào danh sách nộp Offline
      try {
        const offlineKey = "MANG_OFFLINE_SUBMISSIONS";
        const existing = JSON.parse(localStorage.getItem(offlineKey) || "[]");
        existing.push({
          ...submissionPayload,
          offlineSavedAt: new Date().toISOString(),
        });
        localStorage.setItem(offlineKey, JSON.stringify(existing));

        setStatusMessage({
          type: "success",
          text: `Đã lưu dự phòng an toàn trên máy trạm Bàn ${benchId}! Dữ liệu sẽ tự động đồng bộ khi có mạng.`,
        });
      } catch {
        setStatusMessage({
          type: "error",
          text: `Lỗi kết nối máy chủ: ${err?.message || "Không thể gửi dữ liệu. Hãy báo Giảng viên!"}`,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-slate-200 bg-white shadow-xs">
      <CardHeader className="bg-slate-50 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-slate-500 uppercase">
              Phiếu Nghiệm Thu Thực Hành Mạng
            </span>
            <CardTitle className="text-xl font-black text-slate-900 mt-1">
              Báo Cáo Nghiệm Thu: {labCode}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600 font-medium">
              3 KTV cùng kiểm tra thông số và xác nhận trước khi mời Giảng viên chấm điểm
            </CardDescription>
          </div>
          <span className="hidden sm:inline-block px-3 py-1.5 bg-slate-900 text-white font-mono text-xs font-black rounded-lg">
            BÀN KỸ THUẬT #{benchId}
          </span>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-6">
          {/* Thông báo trạng thái */}
          {statusMessage && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 text-sm font-medium ${
                statusMessage.type === "success"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                  : statusMessage.type === "warning"
                  ? "bg-amber-50 border-amber-300 text-amber-900"
                  : "bg-red-50 border-red-300 text-red-900"
              }`}
            >
              {statusMessage.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">{statusMessage.text}</div>
            </div>
          )}

          {/* HÀNG 1: CHỌN BÀN & LỚP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="benchId" className="text-xs font-black uppercase text-slate-700">
                Bàn Kỹ Thuật (1 - 10)
              </Label>
              <select
                id="benchId"
                value={benchId}
                onChange={(e) => setBenchId(Number(e.target.value))}
                className="w-full h-12 rounded-xl border border-slate-300 bg-white px-3 font-mono font-bold text-slate-900 text-base focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    Bàn Kỹ Thuật #{num}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="className" className="text-xs font-black uppercase text-slate-700">
                Lớp Học Chuyên Ngành
              </Label>
              <Input
                id="className"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="VD: 03THA9 (9+3)"
                className="h-12 font-bold text-slate-900"
              />
            </div>
          </div>

          {/* HÀNG 2: DANH SÁCH 3 KTV CỦA BÀN */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
              Phân Công Nhiệm Vụ 3 KTV (Theo Chuẩn An Toàn & Kỹ Thuật)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label htmlFor="ktv1" className="text-xs font-bold text-slate-600">
                  KTV 1 (Thao tác chính / Operator)
                </Label>
                <Input
                  id="ktv1"
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  placeholder="Họ tên KTV 1..."
                  className="bg-white h-11 font-medium"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="ktv2" className="text-xs font-bold text-slate-600">
                  KTV 2 (Kiểm soát an toàn Poka-Yoke)
                </Label>
                <Input
                  id="ktv2"
                  value={safetyName}
                  onChange={(e) => setSafetyName(e.target.value)}
                  placeholder="Họ tên KTV 2..."
                  className="bg-white h-11 font-medium"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="ktv3" className="text-xs font-bold text-slate-600">
                  KTV 3 (Ghi chép & Báo cáo kỹ thuật)
                </Label>
                <Input
                  id="ktv3"
                  value={recorderName}
                  onChange={(e) => setRecorderName(e.target.value)}
                  placeholder="Họ tên KTV 3..."
                  className="bg-white h-11 font-medium"
                />
              </div>
            </div>
          </div>

          {/* HÀNG 3: KẾT QUẢ KIỂM THỬ KỸ THUẬT CỤ THỂ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {labCode === "LAB-01" ? (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="cableStandard" className="text-xs font-black uppercase text-slate-700">
                    Chuẩn Bấm Cáp Mạng
                  </Label>
                  <select
                    id="cableStandard"
                    value={cableStandard}
                    onChange={(e) => setCableStandard(e.target.value)}
                    className="w-full h-12 rounded-xl border border-slate-300 bg-white px-3 font-mono font-bold text-slate-900 text-base"
                  >
                    <option value="T568B">Chuẩn T568B (Cáp thẳng chuẩn quốc tế)</option>
                    <option value="T568A">Chuẩn T568A (Cáp thẳng chuẩn A)</option>
                    <option value="Crossover">Cáp chéo (Đầu A - Đầu B)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cableTestResult" className="text-xs font-black uppercase text-slate-700">
                    Kết Quả Hộp Test Cáp 8 Đèn LED
                  </Label>
                  <Input
                    id="cableTestResult"
                    value={cableTestResult}
                    onChange={(e) => setCableTestResult(e.target.value)}
                    placeholder="VD: 8/8 sợi thông sáng đều"
                    className="h-12 font-mono font-bold text-slate-900"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="ipAssigned" className="text-xs font-black uppercase text-slate-700">
                    Địa Chỉ IPv4 Đã Thiết Lập
                  </Label>
                  <Input
                    id="ipAssigned"
                    value={ipAssigned}
                    onChange={(e) => setIpAssigned(e.target.value)}
                    placeholder="VD: 192.168.1.10"
                    className="h-12 font-mono font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="subnetMask" className="text-xs font-black uppercase text-slate-700">
                    Subnet Mask / Prefix
                  </Label>
                  <Input
                    id="subnetMask"
                    value={subnetMask}
                    onChange={(e) => setSubnetMask(e.target.value)}
                    placeholder="VD: 255.255.255.0 (/24)"
                    className="h-12 font-mono font-bold text-slate-900"
                  />
                </div>
              </>
            )}
          </div>

          {/* CHECKBOX AN TOÀN 5S POKA-YOKE */}
          <div
            onClick={() => setPokaYokePassed(!pokaYokePassed)}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3.5 ${
              pokaYokePassed
                ? "bg-emerald-50/70 border-emerald-600 text-emerald-950"
                : "bg-white border-slate-200 hover:border-slate-300 text-slate-800"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-colors shrink-0 ${
                pokaYokePassed
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : "border-slate-400 bg-white"
              }`}
            >
              {pokaYokePassed && <CheckSquare className="w-5 h-5" />}
            </div>
            <div className="text-sm">
              <div className="font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>KTV 2 xác nhận đã hoàn thành kiểm soát an toàn & 5S</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Bàn làm việc gọn gàng, thu dọn phế liệu dây đồng, dụng cụ xếp ngay ngắn trong khay.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-slate-50 border-t border-slate-200 p-4">
          <Button
            type="submit"
            size="touch"
            disabled={isSubmitting}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-base shadow-xs"
          >
            {isSubmitting ? (
              <span>Đang gửi dữ liệu lên hệ thống...</span>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                <span>Nộp Báo Cáo Nghiệm Thu (Bàn #{benchId})</span>
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
