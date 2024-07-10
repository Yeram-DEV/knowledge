import { Card, CardBody } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { BookAccordion } from './_components'
import { createClient } from '@/utils/supabase/server'

export default async function BooksDetailPage({ params }: { params: { id: string } }) {
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
    .eq('id', params.id)
    .maybeSingle()

  return (
    <div className="w-full flex-1 flex-col p-4 overflow-auto">
      <div className="w-full flex flex-col items-center justify-center gap-5 sm:gap-12">
        <Card fullWidth>
          <CardBody className="p-3 sm:p-10">
            <span className="sm:text-4xl font-extrabold">{book.book_name}</span>
          </CardBody>
        </Card>
        <div className="w-full flex flex-col sm:flex-row items-start justify-center gap-5">
          <div className="flex flex-col items-center justify-center gap-5">
            <Image src={book.book_details.at(0).cover_image_url} alt="event thumbnail" />
            <BookAccordion book={book} />
          </div>
          <div className="w-full sm:w-[1780px] flex items-center justify-center">
            <Card fullWidth>
              <CardBody className="w-full flex flex-col gap-8 whitespace-pre-line p-8 sm:p-12">
                <h4 className="text-3xl font-bold">작품소개</h4>
                <p className="text-lg font-medium bg-default-300 p-5 rounded-2xl">
                  {book.book_details.at(0).description}
                </p>
                <h4 className="text-3xl font-bold">목차</h4>
                <p className="text-lg font-medium bg-default-200 p-5 rounded-2xl">
                  {book.book_details.at(0).table_of_contents}
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
