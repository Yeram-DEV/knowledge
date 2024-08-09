import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export const postReview = async (params: { book_id: number; review_text: string }) => {
  try {
    const { book_id, review_text } = params
    const {
      data: { user }
    } = await supabase.auth.getUser()

    const { data, error } = await supabase.from('reviews').insert([
      {
        user_id: user.id,
        book_id: book_id,
        rating: 5,
        review_text: review_text
      }
    ])

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, data }
  } catch (error) {
    throw new Error(error.response.data)
  }
}

export const getReview = async (bookId: number) => {
  try {
    const { data } = await supabase
      .from('reviews')
      .select('*, profiles(*)')
      .eq('book_id', bookId)
      .order('id', { ascending: false })

    return data
  } catch (error) {
    throw new Error(error.response.data)
  }
}
