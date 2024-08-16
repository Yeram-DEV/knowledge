import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export async function getNotice(noticeId: number) {
  try {
    const { data } = await supabase.from('notice').select('*').eq('id', noticeId).single()
    return data
  } catch (error) {
    throw new Error(error.response.data)
  }
}
