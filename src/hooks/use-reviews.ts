import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getReview, postReview } from '@/api'
import { toast } from 'sonner'

export const usePostReview = (bookId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postReview,
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: ['book-review', bookId]
        })
        toast.success('리뷰가 성공적으로 작성되었습니다.')
      } else {
        toast.error(response.message)
      }
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }
  })
}

export const useReviewQuery = (bookId: number) => {
  return useQuery({ queryKey: ['book-review', bookId], queryFn: () => getReview(bookId) })
}
