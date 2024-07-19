import { createClient } from '@/utils/supabase/server'
import { EventSection, NewSection, PickSection, RankingSection } from './_components'

export default async function Page() {
  const supabase = createClient()
  const { data: events } = await supabase.from('events').select('*')
  const { data: bestBooks } = await supabase.from('popular_books').select('*').order('rank', { ascending: true })

  const { data: newBooks } = await supabase
    .from('new_books')
    .select('*')
    .order('publication_date', { ascending: false })
    .limit(30)

  const { data: pickBooks } = await supabase
    .from('books')
    .select(
      `
      *,
      book_details (*),
      book_category (*)
    `
    )
    .order('category_id', { ascending: false })
    .limit(6)

  return (
    <div className="relative container mx-auto max-w-7xl flex flex-col items-center justify-start gap-8 sm:gap-14 p-4">
      <EventSection events={events} />
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center">
          <span className="text-default-500">인기 도서를 찾고 있다면!</span>
          <span className="text-2xl font-bold">
            오성도서 종합 <strong className="text-sky-500">베스트</strong>
          </span>
        </div>
        <RankingSection books={bestBooks} />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center">
          <span className="text-default-500">따끈 따끈한 오픈작 체크체크!</span>
          <span className="text-2xl font-bold">오성이어 신작도서</span>
        </div>

        <NewSection newBooks={newBooks} />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <span className="text-2xl font-bold">오성&apos;s pick!</span>

        <PickSection pickBooks={pickBooks} />
      </div>
    </div>
  )
}
