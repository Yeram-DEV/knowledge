import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Link } from '@nextui-org/link'

export const ReturnBookSection = ({ returnBooks }) => {
  return (
    <>
      {returnBooks.length > 0 ? (
        <div className="w-full grid grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-14 sm:gap-y-24 pt-8 px-3">
          {returnBooks.map((returns, index) => (
            <div key={returns.books.id} className="w-full flex flex-col items-center justify-start gap-4">
              <Card
                key={`book${index}`}
                as={Link}
                href={`/book/${returns.books.id}`}
                isFooterBlurred
                className="w-full h-[200px] sm:h-full"
              >
                <Image
                  removeWrapper
                  alt="Card example background"
                  className="z-0 w-full h-full object-cover object-top"
                  src={returns.books.book_details.at(0).cover_image_url}
                />
              </Card>
              <div className="w-full flex flex-col items-start justify-center">
                <span className="text-lg font-bold whitespace-pre-line word-break">{returns.books.book_name}</span>
                <span className="text-tiny text-default-500">{returns.books.author}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-ful h-[100px] sm:h-[250px] flex flex-col items-center justify-center gap-8">
          <span>읽은 책이 없습니다</span>
        </div>
      )}
    </>
  )
}
