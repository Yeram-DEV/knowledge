import { useMutation } from '@tanstack/react-query'
import { postPurchaseBook } from '@/api'
import { toast } from 'sonner'

export const usePurchaseBook = () => {
  return useMutation({
    mutationFn: postPurchaseBook,
    onSuccess: (response) => {
      if (response.success) {
        toast.success('구매신청이 되었습니다. 빠른 시간 내에 연락드리겠습니다.')
      } else {
        toast.error(response.message)
      }
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }
  })
}
