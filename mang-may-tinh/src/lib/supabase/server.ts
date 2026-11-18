import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

/**
 * Khởi tạo Supabase Client phía Máy chủ (Server Components & Route Handlers)
 * Ưu tiên sử dụng SUPABASE_SERVICE_ROLE_KEY để thực hiện các thao tác quản trị (bypass RLS khi Giảng viên duyệt điểm)
 * Nếu không có Service Role, fallback về Anon Key với quyền người dùng thông thường
 */
export function createServerClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "placeholder-key";

  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
}
