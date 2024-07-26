import { createClient } from '@/utils/supabase/server'
import { MyContents } from './_components'

export default async function MyPage() {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  const { data: readBooks } = await supabase
    .from('rentals')
    .select('*, books(*,book_details(*))')
    .eq('user_id', user.id)
  const { data: returnBooks } = await supabase
    .from('returns')
    .select('*, books(*,book_details(*))')
    .eq('user_id', user.id)
  const { data: likeBooks } = await supabase.from('likes').select('*, books(*,book_details(*))').eq('user_id', user.id)

  return (
    <div className="relative container mx-auto max-w-7xl flex flex-col items-center justify-start gap-8 p-4 sm:p-12">
      <MyContents readBooks={readBooks} returnBooks={returnBooks} likeBooks={likeBooks} />
    </div>
  )
}
