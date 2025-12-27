export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          total_xp: number
          level: number
          current_streak: number
          longest_streak: number
          last_activity_date: string | null
          lessons_completed: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_xp?: number
          level?: number
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string | null
          lessons_completed?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_xp?: number
          level?: number
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string | null
          lessons_completed?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      lesson_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          status: string
          current_step_index: number
          steps_completed: string[]
          started_at: string | null
          completed_at: string | null
          xp_earned: number
          attempts: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          status?: string
          current_step_index?: number
          steps_completed?: string[]
          started_at?: string | null
          completed_at?: string | null
          xp_earned?: number
          attempts?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          status?: string
          current_step_index?: number
          steps_completed?: string[]
          started_at?: string | null
          completed_at?: string | null
          xp_earned?: number
          attempts?: number
          created_at?: string
          updated_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          sound_enabled: boolean
          theme: string
          daily_goal_xp: number
          email_notifications: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          sound_enabled?: boolean
          theme?: string
          daily_goal_xp?: number
          email_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          sound_enabled?: boolean
          theme?: string
          daily_goal_xp?: number
          email_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      practice_stats: {
        Row: {
          id: string
          user_id: string
          topic: string
          total_attempts: number
          total_completed: number
          average_time_seconds: number
          last_practiced: string | null
          mastery_level: string
          easy_attempts: number
          easy_completed: number
          medium_attempts: number
          medium_completed: number
          hard_attempts: number
          hard_completed: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          topic: string
          total_attempts?: number
          total_completed?: number
          average_time_seconds?: number
          last_practiced?: string | null
          mastery_level?: string
          easy_attempts?: number
          easy_completed?: number
          medium_attempts?: number
          medium_completed?: number
          hard_attempts?: number
          hard_completed?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          topic?: string
          total_attempts?: number
          total_completed?: number
          average_time_seconds?: number
          last_practiced?: string | null
          mastery_level?: string
          easy_attempts?: number
          easy_completed?: number
          medium_attempts?: number
          medium_completed?: number
          hard_attempts?: number
          hard_completed?: number
          created_at?: string
          updated_at?: string
        }
      }
      focused_practice_sessions: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          lesson_title: string
          session_data: Json
          current_step_index: number
          completed_steps: string[]
          status: string
          started_at: string
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          lesson_title: string
          session_data: Json
          current_step_index?: number
          completed_steps?: string[]
          status?: string
          started_at?: string
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          lesson_title?: string
          session_data?: Json
          current_step_index?: number
          completed_steps?: string[]
          status?: string
          started_at?: string
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      studio_projects: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          language: string
          modules: Json
          current_module_id: string | null
          current_step_id: string | null
          files: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          language: string
          modules?: Json
          current_module_id?: string | null
          current_step_id?: string | null
          files?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          language?: string
          modules?: Json
          current_module_id?: string | null
          current_step_id?: string | null
          files?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
