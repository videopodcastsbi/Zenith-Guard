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
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: string
          subscription_tier: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          role?: string
          subscription_tier?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          role?: string
          subscription_tier?: string
          created_at?: string
          updated_at?: string
        }
      }
      games: {
        Row: {
          id: string
          owner_id: string
          name: string
          place_id: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          place_id: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          place_id?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      api_keys: {
        Row: {
          id: string
          game_id: string
          key_hash: string
          name: string
          last_used_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          game_id: string
          key_hash: string
          name: string
          last_used_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          game_id?: string
          key_hash?: string
          name?: string
          last_used_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
