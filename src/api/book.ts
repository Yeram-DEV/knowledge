import { addDays } from 'date-fns'
import { createClient } from '@/utils/supabase/client'
import { getChoseong } from 'es-hangul'

const supabase = createClient()

export const postPurchaseBook = async (params: {
  purchase_link: string
  title: string
  purpose: string
  isbn: number
}) => {
  try {
    const { purchase_link, title, purpose, isbn } = params
    const {
      data: { user }
    } = await supabase.auth.getUser()

    const { error: fetchError } = await supabase
      .from('purchase_requests')
      .select('id')
      .eq('user_id', user.id)
      .gte('request_date', addDays(new Date(), -7).toISOString())

    if (fetchError) {
      return { success: false, message: '1주일 이내에 이미 신청한 기록이 있습니다.\n구매절차 내용을 확인해주세요' }
    }

    const { data, error: insertError } = await supabase.from('purchase_requests').insert([
      {
        purchase_link,
        title,
        purpose,
        user_id: user.id,
        isbn
      }
    ])

    if (insertError) {
      return { success: false, message: insertError.message }
    }

    return { success: true, data }
  } catch (error) {
    throw new Error(error.response.data)
  }
}

export async function searchBooks(searchQuery?: string) {
  try {
    const { data, error } = await supabase.from('books').select('*, book_details(*)').order('id', { ascending: false })

    if (error) {
      return { success: false, message: error.message }
    }

    const queryChoseong = getChoseong(searchQuery)
    const filteredData = data
      .filter((book) => {
        const bookChoseong = getChoseong(book.book_name)
        return bookChoseong.includes(queryChoseong)
      })
      .sort((a, b) => {
        const aChoseong = getChoseong(a.book_name)
        const bChoseong = getChoseong(b.book_name)
        const aExactMatch = a.book_name.includes(searchQuery)
        const bExactMatch = b.book_name.includes(searchQuery)
        if (aExactMatch && !bExactMatch) return -1
        if (!aExactMatch && bExactMatch) return 1
        return aChoseong.indexOf(queryChoseong) - bChoseong.indexOf(queryChoseong)
      })
      .slice(0, 5)
    return { success: true, result: filteredData }
  } catch (error) {
    throw new Error(error.response.data)
  }
}
