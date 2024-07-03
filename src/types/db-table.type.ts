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

export type Book = {
  id: number
  book_name: string
  author: string
  publisher: string
  publication_date: string
  created_at: string
  updated_at: string
  category_id: string
  book_details?: BookDetails
  book_category?: BookCategory
}
