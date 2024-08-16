import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createRent, createReturn, createWaitlist, deleteWaitlist, getLikedBooks, updateLikeBook } from '@/api'
import { Rental, WaitList } from '@/types'
import { toast } from 'sonner'
import { createClient } from '@/utils/supabase/client'

export const useLikeActions = (bookId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => updateLikeBook(bookId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['book-like', bookId] })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }
  })
}

export const useLikeQuery = (bookId: number) => {
  return useQuery({ queryKey: ['book-like', bookId], queryFn: () => getLikedBooks(bookId) })
}

export const useBookStatusQuery = (book: any) => {
  return useQuery({
    queryKey: ['book-status', book.id, book.rentals.length],
    queryFn: async () => {
      const supabase = createClient()
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (book.waitlist.some((entry: WaitList) => entry.user_id === user.id)) {
        return 'waiting'
      }
      if (book.rentals.length === 0) {
        return 'none'
      }
      if (book.rentals.some((rental: Rental) => rental.user_id === user.id)) {
        return 'mine'
      }
      return 'others'
    }
  })
}

export const useRentMutation = (book: any) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => createRent(book.id),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['book-detail', book.id] })
      if (response) {
        toast.success('대여 하였습니다')
        return
      }
      toast.error(response.message)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }
  })
}

export const useReturnMutation = (book: any) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => createReturn(book),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['book-detail', book.id] })
      if (response) {
        toast.success('반납 하였습니다')
        return
      }
      toast.error(response.message)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }
  })
}

export const useWaitlistMutation = (book: any) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => createWaitlist(book.id),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['book-detail', book.id] })
      if (response) {
        toast.success('대기 목록에 추가되었습니다.')
        return
      }
      toast.error(response.message)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }
  })
}

export const useDelWaitlistMutation = (book: any) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => deleteWaitlist(book.id),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['book-detail', book.id] })
      if (response) {
        toast.success('대기 목록에서 취소되었습니다.')
        return
      }
      toast.error(response.message)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }
  })
}
