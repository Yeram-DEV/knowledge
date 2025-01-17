'use client'

import { Link } from '@nextui-org/link'
import { Image } from '@nextui-org/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from 'usehooks-ts'

export const RankingSection = ({ books }) => {
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const groupedBooks = books.reduce((resultArray: any, item: any, index: number) => {
    const chunkIndex = Math.floor(index / 3)
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }
    resultArray[chunkIndex].push({ ...item, rank: index + 1 })
    return resultArray
  }, [])

  return (
    <div className="w-full max-w-[1018px] relative">
      <Swiper spaceBetween={50} loop={true} slidesPerView={isDesktop ? 3 : 1}>
        {groupedBooks.map((group: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="relative rounded-md h-[560px] sm:h-[500px] mx-1">
              <ul className="w-full flex items-start justify-center">
                <li>
                  <ol>
                    {group.map((book: any) => (
                      <li key={book.book_id} className="mt-3">
                        <div className="relative flex h-full items-center justify-center">
                          <Link href={`/book/${book.book_id}`}>
                            <Image
                              src={book.cover_image_url}
                              alt={book.book_name}
                              width={120}
                              className="h-full rounded-lg"
                            />
                          </Link>
                          <div className="w-[80px] h-full flex items-center justify-center">
                            <span className="font-bold text-lg">{book.rank}</span>
                          </div>
                          <div className="w-[184px] h-full flex flex-col items-start justify-center">
                            <Link href={`/book/${book.book_id}`} className="text-foreground font-bold line-clamp-1">
                              {book.book_name}
                            </Link>
                            <span className="text-tiny text-default-500 line-clamp-1">{book.author}</span>
                            <span className="text-tiny text-default-500 line-clamp-1">{book.publisher}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </li>
              </ul>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
