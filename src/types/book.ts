export interface BookDetails {
  cover_image_url: string
  description: string
  table_of_contents: string
}

export interface BookCategory {
  id: string
  description: string
}

export interface Book {
  id: number
  book_name: string
  author: string
  publisher: string
  publication_date: string
  created_at: string
  updated_at: string
  category: BookCategory
  details: BookDetails
}
