/**
 * Định nghĩa kiểu dữ liệu cơ sở dữ liệu Supabase (PostgreSQL)
 * Chuyên ngành: Mạng máy tính (Hệ Trung cấp 9+3)
 * Giảng viên phụ trách: CN. Phạm Tiến Đông
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      classes: {
        Row: {
          id: string;
          class_code: string;
          class_name: string;
          academic_year: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          class_code: string;
          class_name: string;
          academic_year?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          class_code?: string;
          class_name?: string;
          academic_year?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      students: {
        Row: {
          id: string;
          class_id: string;
          student_number: number;
          student_code: string;
          full_name: string;
          date_of_birth: string | null;
          gender: string | null;
          phone: string | null;
          status: string;
          original_class: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          class_id: string;
          student_number: number;
          student_code: string;
          full_name: string;
          date_of_birth?: string | null;
          gender?: string | null;
          phone?: string | null;
          status?: string;
          original_class?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          class_id?: string;
          student_number?: number;
          student_code?: string;
          full_name?: string;
          date_of_birth?: string | null;
          gender?: string | null;
          phone?: string | null;
          status?: string;
          original_class?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "students_class_id_fkey";
            columns: ["class_id"];
            isOneToOne: false;
            referencedRelation: "classes";
            referencedColumns: ["id"];
          }
        ];
      };
      network_labs: {
        Row: {
          id: string;
          lab_code: string;
          title: string;
          category: string;
          description: string;
          objective: string;
          safety_rules: string[];
          checklist_json: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          lab_code: string;
          title: string;
          category?: string;
          description?: string;
          objective?: string;
          safety_rules?: string[];
          checklist_json?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          lab_code?: string;
          title?: string;
          category?: string;
          description?: string;
          objective?: string;
          safety_rules?: string[];
          checklist_json?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
      lab_submissions: {
        Row: {
          id: string;
          class_name: string;
          session_name: string;
          bench_id: number;
          operator_name: string;
          safety_name: string;
          recorder_name: string;
          score: number;
          cable_standard: string | null;
          cable_test_result: string | null;
          ip_assigned: string | null;
          subnet_mask: string | null;
          poka_yoke_passed: boolean;
          teacher_approved: boolean;
          submitted_at: string;
        };
        Insert: {
          id?: string;
          class_name: string;
          session_name: string;
          bench_id: number;
          operator_name: string;
          safety_name: string;
          recorder_name: string;
          score?: number;
          cable_standard?: string | null;
          cable_test_result?: string | null;
          ip_assigned?: string | null;
          subnet_mask?: string | null;
          poka_yoke_passed?: boolean;
          teacher_approved?: boolean;
          submitted_at?: string;
        };
        Update: {
          id?: string;
          class_name?: string;
          session_name?: string;
          bench_id?: number;
          operator_name?: string;
          safety_name?: string;
          recorder_name?: string;
          score?: number;
          cable_standard?: string | null;
          cable_test_result?: string | null;
          ip_assigned?: string | null;
          subnet_mask?: string | null;
          poka_yoke_passed?: boolean;
          teacher_approved?: boolean;
          submitted_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
