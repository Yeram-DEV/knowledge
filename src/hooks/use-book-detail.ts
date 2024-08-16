import { useQuery } from '@tanstack/react-query'
import { getBook } from '@/api'

export const useBookDetail = (bookId: number) => {
  return useQuery({ queryKey: ['book-detail', bookId], queryFn: () => getBook(bookId) })
}
