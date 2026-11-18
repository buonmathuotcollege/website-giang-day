import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

/**
 * Khởi tạo Supabase Client phía Trình duyệt (Client Component)
 * Sử dụng NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY
 * Tích hợp cơ chế fallback an toàn: Nếu chưa điền biến môi trường, hệ thống vẫn hoạt động ở chế độ ngoại tuyến (Offline/Mock)
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder-project")
);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
