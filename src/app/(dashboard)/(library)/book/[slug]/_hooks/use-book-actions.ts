import { useState, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Like, Rental, WaitList } from '@/types'
import { format, addDays } from 'date-fns'
import { toast } from 'sonner'

/**
 * 책에 대한 좋아요, 대여, 대기 및 반납과 같은 동작을 처리하는 커스텀 훅.
 */
const useBookActions = (book: any, user: any) => {
  const supabase = createClient()
  const [isSelected, setIsSelected] = useState(user.likes.some((like: Like) => like.book_id === book.id))
  const [isLoading, setIsLoading] = useState(false)
  const [rentalStatus, setRentalStatus] = useState<'none' | 'mine' | 'others' | 'waiting'>(() => {
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
  })

  const insertNotification = useCallback(
    async (target_user: any, message: string) => {
      console.log(target_user)
      const { data: tokens, error: tokenError } = await supabase
        .from('token')
        .select('id, fcm_token')
        .eq('user_id', target_user.user_id)

      if (tokenError) {
        console.error('토큰 조회 중 오류가 발생했습니다:', tokenError)
        return
      }

      if (tokens && tokens.length > 0) {
        for (const token of tokens) {
          const notification = {
            user_id: target_user.user_id,
            token_id: token.id,
            body: message
          }

          const { error } = await supabase.from('notifications').insert([notification])

          if (error) {
            console.error('알림 삽입 중 오류가 발생했습니다:', error)
          }
        }
      } else {
        console.log('알림을 보낼 토큰이 없습니다.')
      }
    },
    [supabase]
  )

  /**
   * 좋아요 상태를 업데이트하는 함수.
   */
  const updateLikeStatus = useCallback(async () => {
    const action = isSelected ? 'delete' : 'insert'
    const { error } = await supabase
      .from('likes')
      [action](isSelected ? {} : { user_id: user.id, book_id: book.id })
      .eq('user_id', user.id)
      .eq('book_id', book.id)

    if (!error) setIsSelected(!isSelected)
  }, [isSelected, supabase, user.id, book.id])

  /**
   * 책을 대여하는 함수.
   */
  const handleRent = useCallback(async () => {
    setIsLoading(true)

    const { data: rentals, error: rentalError } = await supabase.from('rentals').select('*').eq('book_id', book.id)

    if (rentalError || rentals.length > 0) {
      setRentalStatus(rentals.some((rental: Rental) => rental.user_id === user.id) ? 'mine' : 'others')
      setIsLoading(false)
      toast.error('이미 대여중인 도서입니다')
      return
    }

    const rentalDate = format(new Date(), 'yyyy-MM-dd')
    const dueDate = format(addDays(new Date(), 14), 'yyyy-MM-dd') // 2-week rental period

    const { error } = await supabase
      .from('rentals')
      .insert([{ user_id: user.id, book_id: book.id, rental_date: rentalDate, due_date: dueDate, status: 'RENTED' }])

    if (!error) {
      setRentalStatus('mine')
      toast.success('대여 하였습니다')
    }
    setIsLoading(false)
  }, [supabase, book.id, user.id])

  /**
   * 대기 목록에 추가하는 함수.
   */
  const handleWait = useCallback(async () => {
    setIsLoading(true)

    const { data: existingWaitlist, error: existingError } = await supabase
      .from('waitlist')
      .select('*')
      .eq('book_id', book.id)
      .eq('user_id', user.id)

    if (existingError) {
      setIsLoading(false)
      toast.error('대기 목록 조회 중 오류가 발생했습니다.')
      return
    }

    if (existingWaitlist && existingWaitlist.length > 0) {
      setIsLoading(false)
      toast.info('이미 대기 목록에 있습니다.')
      return
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([{ user_id: user.id, book_id: book.id, status: 'waiting' }])

    if (!error) {
      setRentalStatus('waiting')
      toast.success('대기 목록에 추가되었습니다.')
    } else {
      toast.error('대기 목록 추가에 실패했습니다.')
    }

    setIsLoading(false)
  }, [supabase, user.id, book.id])

  /**
   * 대기 목록에서 취소하는 함수.
   */
  const handleCancelWait = useCallback(async () => {
    setIsLoading(true)

    const { error } = await supabase.from('waitlist').delete().eq('book_id', book.id).eq('user_id', user.id)

    if (!error) {
      const { data: rentals, error: rentalsError } = await supabase.from('rentals').select('*').eq('book_id', book.id)

      if (!rentalsError && rentals.length === 0) {
        setRentalStatus('none')
      } else {
        setRentalStatus('others')
      }

      toast.success('대기 목록에서 취소되었습니다.')
    } else {
      toast.error('대기 목록 취소에 실패했습니다.')
    }

    setIsLoading(false)
  }, [supabase, user.id, book.id])

  /**
   * 책을 반납하는 함수.
   */
  const handleReturn = useCallback(async () => {
    setIsLoading(true)

    const { data: rentals, error: rentalError } = await supabase
      .from('rentals')
      .select('*')
      .eq('book_id', book.id)
      .eq('user_id', user.id)

    if (rentalError || rentals.length === 0) {
      setIsLoading(false)
      toast.error('반납할 대여 기록이 없습니다.')
      return
    }

    const { error: deleteError } = await supabase.from('rentals').delete().eq('book_id', book.id).eq('user_id', user.id)

    if (deleteError) {
      setIsLoading(false)
      toast.error('반납 처리 중 오류가 발생했습니다.')
      return
    }

    const returnDate = format(new Date(), 'yyyy-MM-dd')
    const { error: returnLogError } = await supabase
      .from('returns')
      .insert([{ user_id: user.id, book_id: book.id, return_date: returnDate }])

    if (returnLogError) {
      setIsLoading(false)
      toast.error('반납 로그 저장 중 오류가 발생했습니다.')
      return
    }

    const { data: waitlist, error: waitlistError } = await supabase
      .from('waitlist')
      .select('*')
      .eq('book_id', book.id)
      .order('created_at', { ascending: true })
      .limit(1)

    if (waitlistError) {
      setIsLoading(false)
      toast.error('대기 목록 조회 중 오류가 발생했습니다.')
      return
    }

    if (waitlist && waitlist.length > 0) {
      const nextUser = waitlist[0]
      const rentalDate = format(new Date(), 'yyyy-MM-dd')
      const dueDate = format(addDays(new Date(), 14), 'yyyy-MM-dd') // 2-week rental period

      const { error: insertError } = await supabase
        .from('rentals')
        .insert([
          { user_id: nextUser.user_id, book_id: book.id, rental_date: rentalDate, due_date: dueDate, status: 'RENTED' }
        ])

      if (!insertError) {
        await supabase.from('waitlist').delete().eq('book_id', book.id).eq('user_id', nextUser.user_id)
        await insertNotification(nextUser, `대여 가능 알림: 대기 목록에서 ${book.book_name}이(가) 대여되었습니다.`)
      }
    }

    toast.success('반납 하였습니다')
    setRentalStatus('none')
    setIsLoading(false)
  }, [supabase, book.id, book.book_name, user.id, insertNotification])

  return {
    isSelected,
    isLoading,
    rentalStatus,
    updateLikeStatus,
    handleRent,
    handleWait,
    handleCancelWait,
    handleReturn
  }
}

export default useBookActions
