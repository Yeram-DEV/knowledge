'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { BookContents, BookHeader, CoverBanner } from './_components'
import { useBookDetail } from '@/hooks/use-book-detail'

export default function BookPage({ params }: { params: { slug: string } }) {
  const { data: book, isLoading: isBookLoading } = useBookDetail(Number(params.slug))

  if (isBookLoading) return null

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
