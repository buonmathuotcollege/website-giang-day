"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export interface BenchMember {
  benchId: number;
  benchName: string;
  ktv1: string; // KTV 1: Thi công bấm cáp RJ45
  ktv2: string; // KTV 2: Kiểm soát an toàn & Test cáp 8 đèn
  ktv3: string; // KTV 3: Cấu hình IP & Báo cáo kỹ thuật
  status: "Đang thực hành" | "Đã thông 8/8" | "Chờ nghiệm thu";
  grade: number;
}

const INITIAL_BENCHES: BenchMember[] = [
  { benchId: 1, benchName: "Bàn 1 (Router Gateway)", ktv1: "Nguyễn Văn An", ktv2: "Trần Văn Bình", ktv3: "Lê Thị Cúc", status: "Đã thông 8/8", grade: 9.5 },
  { benchId: 2, benchName: "Bàn 2 (Switch Phòng Học)", ktv1: "Phạm Quốc Dũng", ktv2: "Hoàng Gia Huy", ktv3: "Đỗ Mai Linh", status: "Đã thông 8/8", grade: 9.0 },
  { benchId: 3, benchName: "Bàn 3 (DHCP Server)", ktv1: "Vũ Hải Nam", ktv2: "Đặng Thu Thảo", ktv3: "Bùi Tuấn Anh", status: "Đang thực hành", grade: 8.5 },
  { benchId: 4, benchName: "Bàn 4 (VLAN Giáo Viên)", ktv1: "Ngô Minh Khang", ktv2: "Lý Thanh Tâm", ktv3: "Đoàn Văn Phú", status: "Chờ nghiệm thu", grade: 8.0 },
  { benchId: 5, benchName: "Bàn 5 (VLAN Học Sinh)", ktv1: "Phan Đình Trọng", ktv2: "Lương Khánh Ly", ktv3: "Trịnh Quang Vinh", status: "Đang thực hành", grade: 8.5 },
  { benchId: 6, benchName: "Bàn 6 (Tủ Rack Trung Tâm)", ktv1: "Dương Tuấn Kiệt", ktv2: "Võ Ngọc Mai", ktv3: "Đinh Xuân Trường", status: "Đang thực hành", grade: 8.0 },
  { benchId: 7, benchName: "Bàn 7 (Trạm Access Point)", ktv1: "Cao Bá Đạt", ktv2: "Lê Diệu Hoa", ktv3: "Nguyễn Thế Bảo", status: "Chờ nghiệm thu", grade: 8.5 },
  { benchId: 8, benchName: "Bàn 8 (Phân đoạn Subnet A)", ktv1: "Trần Đình Khôi", ktv2: "Nguyễn Mỹ Duyên", ktv3: "Tô Văn Hùng", status: "Đang thực hành", grade: 8.0 },
  { benchId: 9, benchName: "Bàn 9 (Phân đoạn Subnet B)", ktv1: "Hồ Minh Nhật", ktv2: "Phạm Yến Nhi", ktv3: "Đỗ Thành Long", status: "Đang thực hành", grade: 8.0 },
  { benchId: 10, benchName: "Bàn 10 (Nghiệm Thu Mạng)", ktv1: "Lê Quang Sáng", ktv2: "Vũ Phương Thảo", ktv3: "Nguyễn Tiến Đạt", status: "Chờ nghiệm thu", grade: 9.0 },
];

/**
 * Bảng điều phối 10 Bàn Kỹ thuật viên Mạng máy tính
 * Hiển thị rõ trách nhiệm 3 KTV tại từng vị trí thực hành
 */
export function BenchesTable() {
  const [benches] = React.useState<BenchMember[]>(INITIAL_BENCHES);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <span>🖧</span>
              <span>Sơ Đồ Phân Bổ 10 Bàn Kỹ Thuật Viên Mạng Máy Tính</span>
            </CardTitle>
            <CardDescription>
              Mỗi bàn thực hành gồm 3 vị trí KTV phối hợp theo quy trình tiêu chuẩn Nhật Bản
            </CardDescription>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full">
            Sĩ số: 30 Học sinh (10 Bàn)
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16 text-center">Bàn</TableHead>
              <TableHead>Vị trí Bàn máy</TableHead>
              <TableHead>KTV 1 (Thi công bấm cáp)</TableHead>
              <TableHead>KTV 2 (An toàn Poka-Yoke)</TableHead>
              <TableHead>KTV 3 (Cấu hình IP & Ghi chép)</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead className="text-right">Điểm KTV</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {benches.map((b) => (
              <TableRow key={b.benchId}>
                <TableCell className="text-center font-bold font-mono">
                  #{b.benchId}
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  {b.benchName}
                </TableCell>
                <TableCell className="text-slate-800">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
                  {b.ktv1}
                </TableCell>
                <TableCell className="text-slate-800">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>
                  {b.ktv2}
                </TableCell>
                <TableCell className="text-slate-800">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-1.5"></span>
                  {b.ktv3}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      b.status === "Đã thông 8/8"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : b.status === "Chờ nghiệm thu"
                        ? "bg-amber-100 text-amber-800 border border-amber-300"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {b.status}
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono font-bold text-slate-900">
                  {b.grade.toFixed(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
