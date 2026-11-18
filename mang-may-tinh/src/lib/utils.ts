import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Hàm tiện ích kết hợp class Tailwind CSS (clsx + tailwind-merge)
 * Giúp tối ưu hóa và chống xung đột class khi tùy biến giao diện Shadcn UI
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
