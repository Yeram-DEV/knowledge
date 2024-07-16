import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Link } from '@nextui-org/link'
import { createClient } from '@/utils/supabase/server'

export default async function CategoryItemPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()

  const { data: books } = await supabase
    .from('books')
    .select(
      `
      *,
      book_details (*),
      book_category (*)
    `
    )
    .eq('category_id', params.slug)
    .order('id', { ascending: false })

  return (
    <div className="w-full grid grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-14 sm:gap-y-24 pt-8 px-3">
      {books.map((book, index) => (
        <div key={book.id} className="w-full flex flex-col items-center justify-start gap-4">
          <Card
            key={`book${index}`}
            as={Link}
            href={`/book/${book.id}`}
            isFooterBlurred
            className="w-full h-[200px] sm:h-full"
          >
            <Image
              removeWrapper
              alt="Card example background"
              className="z-0 w-full h-full object-cover object-top"
              src={book.book_details.at(0).cover_image_url}
            />
          </Card>
          <div className="w-full flex flex-col items-start justify-center">
            <span className="text-lg font-bold whitespace-pre-line word-break">{book.book_name}</span>
            <span className="text-tiny text-default-500">{book.author}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
