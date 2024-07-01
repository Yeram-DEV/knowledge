import { Book } from '@/types/book'
import { CoverBanner } from '@/components/book/cover-banner'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { BookContents } from '@/components/book/contents'
import { BookFooter, Header, SubHeader } from '@/components/common'
import { kstFormat } from '@/libs/date'

async function getBook({ id }: { id: number }): Promise<Book> {
  const res = await fetch(`http://localhost:4100/books/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
    }
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res.json()
}

export default async function BookPage({ params }: { params: { id: number } }) {
  const book = await getBook({ id: params.id })
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Header props={{ className: 'hidden sm:flex' }} />
      <SubHeader props={{ className: '!fixed backdrop-blur-sm bg-background/0 sm:hidden' }} />
      <main className="container mx-auto max-w-7xl flex-grow pb-20">
        <div className="w-full flex flex-col">
          <div className="w-full flex items-center justify-center">
            <CoverBanner book={book} />
          </div>
          <Card className="p-4 sm:p-12 -mt-6" isBlurred>
            <CardHeader className="flex flex-col gap-2 items-start justify-center">
              <h4 className="text-4xl font-bold">{book.book_name}</h4>
              <div className="flex items-start justify-center text-gray-500 gap-2">
                <span>{book.author}</span>|<span>{book.publisher}</span>|
                <span>{kstFormat(new Date(book.publication_date), 'yyyy-MM-dd')}</span>
              </div>
            </CardHeader>
            <CardBody>
              <BookContents book={book} />
            </CardBody>
          </Card>
        </div>
      </main>
      <BookFooter book={book} />
    </div>
  )
}
