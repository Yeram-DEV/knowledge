import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Link } from '@nextui-org/link'

export const LikeBookSection = ({ likeBooks }) => {
  return (
    <>
      {likeBooks.length > 0 ? (
        <div className="w-full grid grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-14 sm:gap-y-24 pt-8 px-3">
          {likeBooks.map((like, index) => (
            <div key={like.books.id} className="w-full flex flex-col items-center justify-start gap-4">
              <Card
                key={`book${index}`}
                as={Link}
                href={`/book/${like.books.id}`}
                isFooterBlurred
                className="w-full h-[200px] sm:h-full"
              >
                <Image
                  removeWrapper
                  alt="Card example background"
                  className="z-0 w-full h-full object-cover object-top"
                  src={like.books.book_details.at(0).cover_image_url}
                />
              </Card>
              <div className="w-full flex flex-col items-start justify-center">
                <span className="text-lg font-bold whitespace-pre-line word-break">{like.books.book_name}</span>
                <span className="text-tiny text-default-500">{like.books.author}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-ful h-[100px] sm:h-[250px] flex flex-col items-center justify-center gap-2">
          <span>찜한 책이 없습니다</span>
        </div>
      )}
    </>
  )
}
