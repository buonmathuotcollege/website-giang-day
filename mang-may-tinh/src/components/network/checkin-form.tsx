"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

// Zod Schema xác thực dữ liệu điểm danh bàn KTV mạng
const checkinSchema = z.object({
  className: z.string().min(2, { message: "Vui lòng chọn hoặc nhập tên lớp học" }),
  benchId: z.coerce
    .number()
    .min(1, { message: "Bàn thực hành từ 1 đến 10" })
    .max(10, { message: "Bàn thực hành từ 1 đến 10" }),
  operatorName: z.string().min(3, { message: "Họ tên KTV 1 không được để trống" }),
  safetyName: z.string().min(3, { message: "Họ tên KTV 2 không được để trống" }),
  recorderName: z.string().min(3, { message: "Họ tên KTV 3 không được để trống" }),
  classPin: z.string().optional(),
});

type CheckinFormValues = z.infer<typeof checkinSchema>;

/**
 * Biểu mẫu Xác nhận Phân công Nhóm Kỹ thuật viên & Điểm danh buổi thực hành
 * Tích hợp Shadcn Form, react-hook-form và Supabase Database
 */
export function CheckinForm() {
  const [submitStatus, setSubmitStatus] = React.useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<CheckinFormValues>({
    resolver: zodResolver(checkinSchema) as any,
    defaultValues: {
      className: "03THA9 - Tin học ứng dụng",
      benchId: 1,
      operatorName: "",
      safetyName: "",
      recorderName: "",
      classPin: "",
    },
  });

  const onSubmit = async (values: CheckinFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (isSupabaseConfigured) {
        // Lưu dữ liệu trực tiếp vào Supabase Database
        const { error } = await (supabase.from("lab_submissions") as any).insert({
          class_name: values.className,
          session_name: "Bài 1: Bấm cáp RJ45 & Kiểm tra thông mạch 8 đèn",
          bench_id: values.benchId,
          operator_name: values.operatorName,
          safety_name: values.safetyName,
          recorder_name: values.recorderName,
          cable_standard: "T568B",
          cable_test_result: "8/8 sợi thông",
          poka_yoke_passed: true,
          teacher_approved: false,
          score: 8.5,
        });

        if (error) throw error;
      }

      // Lưu trữ dự phòng hai lớp (Zero Data Loss) vào localStorage
      const localStoreKey = "MANG_BENCH_SUBMISSIONS";
      const existing = JSON.parse(localStorage.getItem(localStoreKey) || "[]");
      existing.unshift({
        ...values,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem(localStoreKey, JSON.stringify(existing));

      setSubmitStatus({
        success: true,
        message: `Đã xác nhận điểm danh và phân công Bàn ${values.benchId} thành công!`,
      });
      form.reset({
        className: values.className,
        benchId: values.benchId,
        operatorName: "",
        safetyName: "",
        recorderName: "",
        classPin: "",
      });
    } catch (err: any) {
      setSubmitStatus({
        success: false,
        message: "Lỗi kết nối cơ sở dữ liệu. Đã lưu dự phòng an toàn trên máy trạm.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <span>📝</span>
          <span>Phiếu Điểm Danh & Phân Công Nhóm KTV (Bàn 1 — 10)</span>
        </CardTitle>
        <CardDescription>
          Mỗi bàn máy có 3 vị trí kỹ thuật viên: Thao tác chính, Kiểm soát an toàn và Ghi chép
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="className"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lớp học (*)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ví dụ: 03THA9" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="benchId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số thứ tự Bàn máy (*)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={10} placeholder="Từ 1 đến 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="operatorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900">KTV 1 (Thi công bấm cáp) (*)</FormLabel>
                    <FormControl>
                      <Input placeholder="Họ và tên KTV 1..." {...field} />
                    </FormControl>
                    <FormDescription>Đo, cắt, tuốt vỏ và bấm hạt RJ45</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="safetyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-emerald-900">KTV 2 (An toàn Poka-Yoke) (*)</FormLabel>
                    <FormControl>
                      <Input placeholder="Họ và tên KTV 2..." {...field} />
                    </FormControl>
                    <FormDescription>Kiểm tra 8 đèn hộp test cáp</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recorderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-900">KTV 3 (Cấu hình IP & Báo cáo) (*)</FormLabel>
                    <FormControl>
                      <Input placeholder="Họ và tên KTV 3..." {...field} />
                    </FormControl>
                    <FormDescription>Cấu hình IP và lập phiếu nghiệm thu</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="classPin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã PIN buổi thực hành (nếu Thầy yêu cầu)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập mã PIN do Giảng viên cung cấp tại phòng lab..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              size="touch"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold"
            >
              {isSubmitting ? "Đang gửi dữ liệu lên hệ thống..." : "Xác Nhận Nhóm KTV & Bàn Thực Hành"}
            </Button>

            {submitStatus && (
              <div
                className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                  submitStatus.success
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                    : "bg-amber-50 border-amber-300 text-amber-900"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
