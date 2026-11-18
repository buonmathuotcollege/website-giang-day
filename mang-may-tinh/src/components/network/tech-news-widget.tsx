"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ExternalLink, RefreshCw } from "lucide-react";
import type { TechNewsArticle } from "@/app/api/tech-news/route";

/**
 * Component Hiển Thị 5 Bản Tin An Ninh Mạng Mới Nhất (TechNewsWidget)
 * Tự động gọi API /api/tech-news mỗi khi tải trang
 */
export function TechNewsWidget() {
  const [articles, setArticles] = React.useState<TechNewsArticle[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [provider, setProvider] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const fetchNews = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/tech-news");
      if (!res.ok) {
        throw new Error(`Mã lỗi HTTP: ${res.status}`);
      }
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        setArticles(json.data);
        setProvider(json.provider || "System");
      } else {
        throw new Error("Dữ liệu phản hồi không đúng định dạng.");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Không thể tải tin tức an ninh mạng.");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Card className="border-slate-200 bg-white shadow-xs">
      <CardHeader className="border-b border-slate-200 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-red-900 font-mono text-xs font-bold">
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              <span>LIVE SECURITY RADAR</span>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-black text-slate-900">
              Điểm Tin An Ninh Mạng Mới Nhất (Network Security Updates)
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-slate-600 font-medium">
              Tự động cập nhật 5 bản tin bảo mật, cảnh báo lỗ hổng và khuyến nghị phòng thủ hệ thống mạng
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            {provider && (
              <span className="hidden sm:inline-block text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                Nguồn: {provider}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={fetchNews}
              disabled={isLoading}
              className="text-xs font-bold border-slate-300"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Làm mới</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {/* Trạng thái đang tải */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-2xl border border-slate-200 p-4 space-y-3 animate-pulse bg-slate-50">
                <div className="w-full h-40 bg-slate-200 rounded-xl"></div>
                <div className="w-3/4 h-5 bg-slate-200 rounded"></div>
                <div className="w-full h-12 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Trạng thái lỗi */}
        {errorMessage && !isLoading && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm font-medium flex items-center justify-between">
            <span>{errorMessage}</span>
            <Button size="sm" variant="outline" onClick={fetchNews} className="text-xs font-bold border-amber-400">
              Thử lại
            </Button>
          </div>
        )}

        {/* Danh sách 5 bài viết tin tức */}
        {!isLoading && !errorMessage && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((item, idx) => (
              <article
                key={item.id || idx}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-slate-400 transition-all shadow-2xs hover:shadow-sm"
              >
                {/* Ảnh thumbnail bài viết */}
                <div className="relative w-full h-44 bg-slate-900 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-xs text-white font-mono text-[10px] font-bold">
                    {item.source}
                  </span>
                </div>

                {/* Nội dung bài viết */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono text-slate-500">
                      {new Date(item.publishedAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.snippet}
                    </p>
                  </div>

                  {/* Nút xem chi tiết */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-2 no-underline block"
                  >
                    <Button
                      variant="outline"
                      size="touch"
                      className="w-full justify-between font-bold text-xs border-slate-300 group-hover:border-slate-900"
                    >
                      <span>Xem Báo Cáo Gốc</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
