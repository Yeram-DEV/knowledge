import { useMutation } from '@tanstack/react-query'
import { postPurchaseBook } from '@/api'

export const usePurchaseBook = () => {
  return useMutation({
    mutationFn: postPurchaseBook
  })
}
