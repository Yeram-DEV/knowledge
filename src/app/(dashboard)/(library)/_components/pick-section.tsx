'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { useRouter } from 'next/navigation'
import { EffectCoverflow } from 'swiper/modules'
import { useMediaQuery } from '@/hooks'
import { useEffect, useState } from 'react'

export const PickSection = ({ pickBooks }) => {
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
        effect={'coverflow'}
        grabCursor={true}
        slidesPerView={isDesktop ? 3 : 1}
        loop={true}
        spaceBetween={50}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }}
        autoplay={{
          delay: 3500
        }}
        modules={[EffectCoverflow, Autoplay]}
      >
        {pickBooks.map((book: any, index: number) => (
          <SwiperSlide key={index}>
            <Card fullWidth isBlurred isPressable shadow="none" onPress={() => router.push(`/book/${book.id}`)}>
              <CardBody>
                <Image src={book.book_details.at(0).cover_image_url} alt={book.book_name} />
              </CardBody>
              <CardFooter className="flex flex-col items-start justify-center gap-2 p-1">
                <span className="text-md font-bold line-clamp-1">{book.book_name}</span>
                <span className="text-tiny text-default-500">{book.author}</span>
              </CardFooter>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
