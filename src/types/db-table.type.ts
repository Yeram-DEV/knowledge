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
export type Like = Database['public']['Tables']['likes']['Row']
export type Rental = Database['public']['Tables']['rentals']['Row']
export type WaitList = Database['public']['Tables']['waitlist']['Row']
export type Notifications = Database['public']['Tables']['notifications']['Row']
