import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      editor_sessions: {
        Row: {
          id: string;
          content: string;
          language: string;
          created_at: string;
          updated_at: string;
          title?: string;
        };
        Insert: {
          id?: string;
          content: string;
          language?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
        };
        Update: {
          id?: string;
          content?: string;
          language?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
        };
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
  };
};