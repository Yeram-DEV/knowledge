'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { kstFormat } from '@/utils/date'
import { useRouter } from 'next/navigation'
import { Autoplay } from 'swiper/modules'
import { useMediaQuery } from '@/hooks'
import { useEffect, useState } from 'react'

export const NewSection = ({ newBooks }) => {
  const router = useRouter()
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
            <Card fullWidth isBlurred isPressable shadow="none" onPress={() => router.push(`/book/${book.id}`)}>
              <CardBody>
                <Image src={book.book_details.at(0).cover_image_url} alt={book.book_name} />
              </CardBody>
              <CardFooter className="flex flex-col items-start justify-center gap-2 p-1">
                <span className="text-md font-bold line-clamp-1">{book.book_name}</span>
                <span className="text-tiny text-default-500">{book.author}</span>
                <span className="text-tiny text-default-500">
                  {kstFormat(new Date(book.publication_date), 'yyyy-MM-dd')}
                </span>
              </CardFooter>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
