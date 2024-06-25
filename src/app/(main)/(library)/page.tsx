import { EventBanner } from '@/components/home/banner'
import { FindBookBanner } from '@/components/home/find-book-banner'
import { NewBookBanner } from '@/components/home/new-book'
import { RankingBookBanner } from '@/components/home/ranking-book'

export default function HomePage() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center gap-4 p-2">
      <div className="w-full flex flex-col items-center md:px-8">
        <EventBanner />
      </div>
      <section className="w-full flex flex-col items-center justify-start gap-12">
        <section className="w-full flex flex-col items-start justify-center gap-4">
          <h4 className="text-2xl font-bold">이런 작품을 찾으세요?</h4>
          <FindBookBanner />
        </section>
        <section className="w-full flex flex-col items-start justify-center gap-4">
          <h4 className="text-2xl font-bold">많이 알고 있는 작품</h4>
          <RankingBookBanner />
        </section>
        <section className="w-full flex flex-col items-start justify-center gap-4">
          <h4 className="text-2xl font-bold">신간도서</h4>
          <NewBookBanner />
        </section>
      </section>
    </div>
  )
}
