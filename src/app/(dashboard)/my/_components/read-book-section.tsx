import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'

export const ReadBookSection = ({ readBooks }) => {
  return (
    <>
      {readBooks.length > 0 ? (
        <div className="w-full grid grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-14 sm:gap-y-24 pt-8 px-3">
          {readBooks.map((rental, index) => (
            <div key={rental.books.id} className="w-full flex flex-col items-center justify-start gap-4">
              <Card
                key={`book${index}`}
                as={Link}
                href={`/book/${rental.books.id}`}
                isFooterBlurred
                className="w-full h-[200px] sm:h-full"
              >
                <Image
                  removeWrapper
                  alt="Card example background"
                  className="z-0 w-full h-full object-cover object-top"
                  src={rental.books.book_details.at(0).cover_image_url}
                />
              </Card>
              <div className="w-full flex flex-col items-start justify-center">
                <span className="text-lg font-bold whitespace-pre-line word-break">{rental.books.book_name}</span>
                <span className="text-tiny text-default-500">{rental.books.author}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-ful h-[100px] sm:h-[250px] flex flex-col items-center justify-center gap-2">
          <span>읽고 있는 책이 없습니다</span>
          <Button as={Link} href="/" color="primary" size="lg">
            책보러 가기
          </Button>
        </div>
      )}
    </>
  )
}
