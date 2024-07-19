'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { kstFormat } from '@/utils/date'
import { Autoplay } from 'swiper/modules'
import { useMediaQuery } from '@/hooks'
import { useEffect, useState } from 'react'
import { Link } from '@nextui-org/link'

export const NewSection = ({ newBooks }) => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null
  return (
    <div className="w-full max-w-[1018px] relative pl-5">
      <Swiper
        spaceBetween={10}
        loop={true}
        slidesPerView={isDesktop ? 5 : 2}
        autoplay={{
          delay: 2500
        }}
        modules={[Autoplay]}
      >
        {newBooks.map((book: any, index: number) => (
          <SwiperSlide key={index}>
            <Card fullWidth isBlurred shadow="none">
              <CardBody>
                <Image src={book.cover_image_url} alt={book.book_name} />
              </CardBody>
              <CardFooter>
                <Link href={`/book/${book.book_id}`} className="flex flex-col items-start justify-center gap-2 p-1">
                  <span className="text-foreground text-md font-bold line-clamp-1">{book.book_name}</span>
                  <span className="text-tiny text-default-500">{book.author}</span>
                  <span className="text-tiny text-default-500">
                    {kstFormat(new Date(book.publication_date), 'yyyy-MM-dd')}
                  </span>
                </Link>
              </CardFooter>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
