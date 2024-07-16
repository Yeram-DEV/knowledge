import { Database } from '@/types/supabase'

export type BookDetails = {
  book_id: number
  created_at: string
  updated_at: string
  description: string
  cover_image_url: string
  table_of_contents: string
}

export type BookCategory = {
  id: number
  description: string
}

export type Book = Database['public']['Tables']['books']['Row']
export type Event = Database['public']['Tables']['events']['Row']
