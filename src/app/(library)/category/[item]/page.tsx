import { Card, CardFooter } from '@nextui-org/card'
import { Link } from '@nextui-org/link'
import Image from 'next/image'
import { Book } from '@/types/book'

async function getBookLists({ category }: { category: string }): Promise<Book[]> {
  const res = await fetch(`http://localhost:4100/books?category=${category}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
    }
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res.json()
}

export default async function CategoryItemPage({ params }: { params: { item: string } }) {
  const bookLists = await getBookLists({ category: params.item })
  return (
    <div className="w-full flex flex-wrap items-center justify-self-stretch pt-8">
      {bookLists.map((book, index) => (
        <div key={`event-card-${index}`} className="w-[50%] sm:w-auto flex items-center justify-center p-1">
          <Card
            className="box-border "
            radius="lg"
            isFooterBlurred
            isPressable
            isHoverable
            as={Link}
            href={`/book/${book.id}`}
          >
            <Image
              src={book.details.cover_image_url ?? 'https://static.yeram.co.kr/playground/event/emptyposter.png'}
              alt={`book-thumbnail-${index}`}
              width={0}
              height={0}
              sizes="100%"
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
            <CardFooter className="flex-col items-start bg-black/30 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] ml-1 gap-1">
              <div className="w-full flex items-center justify-between">
                <span className="font-bold text-lg text-white/80 line-clamp-1">{book.book_name}</span>
              </div>
              <span className="text-sm text-white/80">{book.author}</span>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  )
}
