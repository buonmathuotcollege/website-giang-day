import type { NextConfig } from "next";
import path from "path";

/**
 * Cấu hình Next.js App Router tối ưu cho Cloudflare Pages & Turbopack
 * output: 'export' tạo ra thư mục tĩnh 'out/' triển khai siêu tốc trên Cloudflare Pages
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
