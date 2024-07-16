import { createClient } from '@/utils/supabase/server'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { BookContents, BookHeader, CoverBanner } from './_components'

export default async function BookPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { data: book } = await supabase
    .from('books')
    .select(
      `
      *,
      book_details (*),
      book_category (*)
    `
    )
    .eq('id', params.slug)
    .single()
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center justify-center">
        <CoverBanner book={book} />
      </div>
      <Card className="p-4 sm:p-12 -mt-6" isBlurred>
        <CardHeader>
          <BookHeader book={book} />
        </CardHeader>
        <CardBody>
          <BookContents book={book} />
        </CardBody>
      </Card>
    </div>
  )
}
