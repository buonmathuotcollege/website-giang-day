"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface SubnetResult {
  ip: string;
  cidr: number;
  netmask: string;
  networkAddress: string;
  firstHost: string;
  lastHost: string;
  broadcastAddress: string;
  totalHosts: number;
  analogy: string;
}

/**
 * Công cụ phân tích và chia mạng con (IPv4 Subnet Calculator)
 * Trực quan hóa toán học mạng (Bit nhị phân) thành các khái niệm đời thường cho học sinh 9+3
 */
export function SubnetCalculator() {
  const [ipInput, setIpInput] = React.useState("192.168.1.0");
  const [cidrInput, setCidrInput] = React.useState(26);
  const [result, setResult] = React.useState<SubnetResult | null>(null);

  // Tính toán thông số Subnet
  const calculateSubnet = () => {
    try {
      const parts = ipInput.trim().split(".").map(Number);
      if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
        alert("Vui lòng nhập địa chỉ IP hợp lệ (ví dụ: 192.168.1.0)");
        return;
      }

      const cidr = Number(cidrInput);
      if (isNaN(cidr) || cidr < 8 || cidr > 30) {
        alert("Tiền tố CIDR phải nằm trong khoảng từ /8 đến /30");
        return;
      }

      const ipNum = ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
      const maskNum = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
      const netNum = (ipNum & maskNum) >>> 0;
      const bcastNum = (netNum | ~maskNum) >>> 0;

      const toDotted = (n: number) =>
        `${(n >>> 24) & 255}.${(n >>> 16) & 255}.${(n >>> 8) & 255}.${n & 255}`;

      const netmask = toDotted(maskNum);
      const networkAddress = toDotted(netNum);
      const broadcastAddress = toDotted(bcastNum);
      const firstHost = toDotted(netNum + 1);
      const lastHost = toDotted(bcastNum - 1);
      const totalHosts = Math.max(0, Math.pow(2, 32 - cidr) - 2);

      let analogy = "";
      if (cidr === 24) {
        analogy = "Mạng /24 giống như 1 tòa nhà có 254 phòng học kết nối chung 1 đường truyền mạng LAN.";
      } else if (cidr >= 25 && cidr <= 27) {
        analogy = `Mạng /${cidr} đã được KTV chia nhỏ thành nhiều phòng ban. Mạng con này chứa tối đa ${totalHosts} máy tính độc lập.`;
      } else if (cidr === 30) {
        analogy = "Mạng /30 chỉ có đúng 2 địa chỉ khả dụng: Chuyên dùng để nối 2 đầu dây cáp giữa Router và Router.";
      } else {
        analogy = `Quy mô mạng cấp phát được ${totalHosts} thiết bị kết nối.`;
      }

      setResult({
        ip: ipInput,
        cidr,
        netmask,
        networkAddress,
        firstHost,
        lastHost,
        broadcastAddress,
        totalHosts,
        analogy,
      });
    } catch {
      alert("Đã xảy ra lỗi khi tính toán subnet!");
    }
  };

  React.useEffect(() => {
    calculateSubnet();
  }, []);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <span>🧮</span>
          <span>Công Cụ Phân Tích Mạng Con (IPv4 Subnet Calculator)</span>
        </CardTitle>
        <CardDescription>
          Quy hoạch dải IP cho các phòng máy và chia nhỏ mạng LAN nội bộ
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Form nhập IP và CIDR */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Địa chỉ IPv4 mẫu (*)
            </label>
            <Input
              type="text"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              placeholder="Ví dụ: 192.168.1.0"
              className="font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tiền tố CIDR (Mask)
            </label>
            <select
              value={cidrInput}
              onChange={(e) => setCidrInput(Number(e.target.value))}
              className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 font-mono text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="24">/24 — 255.255.255.0 (254 Hosts)</option>
              <option value="25">/25 — 255.255.255.128 (126 Hosts)</option>
              <option value="26">/26 — 255.255.255.192 (62 Hosts)</option>
              <option value="27">/27 — 255.255.255.224 (30 Hosts)</option>
              <option value="28">/28 — 255.255.255.240 (14 Hosts)</option>
              <option value="30">/30 — 255.255.255.252 (2 Hosts P2P)</option>
            </select>
          </div>
        </div>

        <Button onClick={calculateSubnet} size="touch" className="w-full bg-slate-900 hover:bg-slate-800">
          Phân Tích Địa Chỉ Mạng (KTV 3)
        </Button>

        {/* Kết quả phân tích trực quan */}
        {result && (
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-950 text-xs sm:text-sm font-medium flex items-start gap-2.5">
              <span className="text-base">💡</span>
              <p>
                <strong>Ví von đời thường:</strong> {result.analogy}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm font-mono">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <span className="text-[11px] text-slate-500 font-sans font-bold">Địa chỉ Mạng (Network ID)</span>
                <p className="text-base font-bold text-slate-900">{result.networkAddress}</p>
                <span className="text-[10px] text-slate-500 font-sans block">Địa chỉ định danh toàn mạng (không cấp cho máy)</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <span className="text-[11px] text-slate-500 font-sans font-bold">Mặt nạ mạng (Subnet Mask)</span>
                <p className="text-base font-bold text-slate-900">{result.netmask}</p>
                <span className="text-[10px] text-slate-500 font-sans block">Ranh giới phân tách phần Mạng và phần Máy</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <span className="text-[11px] text-slate-500 font-sans font-bold">Địa chỉ Quảng bá (Broadcast)</span>
                <p className="text-base font-bold text-slate-900">{result.broadcastAddress}</p>
                <span className="text-[10px] text-slate-500 font-sans block">Gửi tín hiệu đến tất cả các máy trong mạng</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <span className="text-[11px] text-slate-500 font-sans font-bold">IP Khả Dụng Đầu Tiên</span>
                <p className="text-base font-bold text-emerald-700">{result.firstHost}</p>
                <span className="text-[10px] text-slate-500 font-sans block">Thường đặt làm Default Gateway cho Router</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <span className="text-[11px] text-slate-500 font-sans font-bold">IP Khả Dụng Cuối Cùng</span>
                <p className="text-base font-bold text-emerald-700">{result.lastHost}</p>
                <span className="text-[10px] text-slate-500 font-sans block">Cấp phát cho máy trạm tính toán cuối cùng</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <span className="text-[11px] text-slate-500 font-sans font-bold">Tổng Số Máy Khả Dụng</span>
                <p className="text-base font-bold text-blue-700">{result.totalHosts} Máy tính (Hosts)</p>
                <span className="text-[10px] text-slate-500 font-sans block">Công thức: 2^(32 - {result.cidr}) - 2</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
