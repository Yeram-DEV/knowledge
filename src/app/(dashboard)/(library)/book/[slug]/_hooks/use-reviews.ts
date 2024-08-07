import { useState, useCallback, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'

export const useReviews = (bookId, user) => {
  const [reviews, setReviews] = useState([])
  const [reviewText, setReviewText] = useState('')
  const supabase = createClient()

  const fetchReviews = useCallback(async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*, profiles(*)')
      .eq('book_id', bookId)
      .order('id', { ascending: false })

    if (error) {
      toast.error('리뷰 정보를 불러오는데 실패했습니다.')
    } else {
      setReviews(data)
    }
  }, [bookId, supabase])

  useEffect(() => {
    fetchReviews().then()
  }, [fetchReviews])

  const handleReviewChange = (value: string) => {
    setReviewText(value)
  }

  const handleReviewSubmit = async () => {
    if (reviewText.trim() === '') {
      toast.error('리뷰 내용을 입력해주세요.')
      return
    }

    const { error } = await supabase.from('reviews').insert([
      {
        user_id: user.id,
        book_id: bookId,
        rating: 5,
        review_text: reviewText
      }
    ])

    if (error) {
      toast.error('리뷰 작성에 실패했습니다.')
    } else {
      toast.success('리뷰가 성공적으로 작성되었습니다.')
      setReviewText('')
      await fetchReviews()
    }
  }

  return {
    reviews,
    reviewText,
    fetchReviews,
    handleReviewChange,
    handleReviewSubmit
  }
}
