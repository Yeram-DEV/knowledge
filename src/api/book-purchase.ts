import { addDays } from 'date-fns'
import { createClient } from '@/utils/supabase/client'

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
