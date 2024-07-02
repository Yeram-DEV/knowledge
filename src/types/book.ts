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
  rental?: Rental
}

export interface Rental {
  rental_id: number
  rental_date: string
  due_date: string
  returned: boolean
  created_at: string
  updated_at: string
  user: User
  book: Book
}

export interface User {
  id: string
  name: string
  email: string
  emailVerified: string
  image: string
  expires: string
  createdAt: string
  updatedAt: string
}
