import { Card, CardFooter } from '@nextui-org/card'
import { Book } from '@/types/book'
import { Image } from '@nextui-org/image'
import { Link } from '@nextui-org/link'

async function getBookLists({ category }: { category: string }): Promise<Book[]> {
  const res = await fetch(`http://localhost:4100/books?category=${category}`, {
    cache: 'force-cache',
    next: { revalidate: 600 },
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
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-8 px-3">
      {bookLists.map((book, index) => (
        <Card
          key={`book${index}`}
          as={Link}
          href={`/book/${book.id}`}
          isFooterBlurred
          className="w-full h-[300px] sm:h-full"
        >
          <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full object-cover object-top"
            src={book.details.cover_image_url}
          />
          <CardFooter className="absolute bg-tra/30 bottom-0 border-t-1 border-zinc-100/50 justify-between">
            <div>
              <h4 className="text-black font-medium text-lg drop-shadow-2xl line-clamp-1 mb-2">{book.book_name}</h4>
              <p className="text-black text-sm line-clamp-1">{book.author}</p>
              <p className="text-black text-tiny line-clamp-1">{book.publisher}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
