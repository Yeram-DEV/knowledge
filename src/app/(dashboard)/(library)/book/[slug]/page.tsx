import { createClient } from '@/utils/supabase/server'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { BookContents, BookHeader, CoverBanner } from './_components'

export default async function BookPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  const { data: likes } = await supabase.from('likes').select('*').eq('user_id', user.id)

  const { data: book } = await supabase
    .from('books')
    .select(
      `
    *,
    book_details (*),
    book_category (*),
    rentals (*),
    waitlist (*),
    reviews (*)
  `
    )
    .eq('id', params.slug)
    .single()

  const userWithLikes = { ...user, likes }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center justify-center">
        <CoverBanner book={book} />
      </div>
      <Card className="p-4 sm:p-12 -mt-6" isBlurred>
        <CardHeader>
          <BookHeader book={book} user={userWithLikes} />
        </CardHeader>
        <CardBody>
          <BookContents book={book} user={userWithLikes} />
        </CardBody>
      </Card>
    </div>
  )
}
