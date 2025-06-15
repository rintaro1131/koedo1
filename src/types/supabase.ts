// Generated via Supabase types (simplified placeholder)
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          sku: string | null
          title: string
          description: string | null
          condition: string
          buy_price: number | null
          sell_price: number | null
          status: string
          bought_at: string | null
          sold_at: string | null
          listed_at: string | null
          image_urls: string[]
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {}
        Update: {}
      }
    }
    Enums: {}
  }
}
