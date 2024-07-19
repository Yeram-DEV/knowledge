'use client'

import { useMediaQuery } from '@/hooks'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Link } from '@nextui-org/link'
import { kstFormat } from '@/utils/date'

export const ReturnBookSection = ({ returnBooks }) => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8">
      <div className="w-full flex gap-2 items-center justify-start">
        <Icon icon="solar:bookmark-square-minimalistic-outline" width={32} height={32} />
        <span className="text-2xl font-black">읽은 책</span>
      </div>
      <div className="w-full relative">
        {returnBooks.length > 0 ? (
          <Swiper
            spaceBetween={10}
            loop={true}
            slidesPerView={isDesktop ? 5 : 2}
            autoplay={{
              delay: 2500
            }}
            modules={[Autoplay]}
          >
            {returnBooks.map((returns: any, index: any) => (
              <SwiperSlide key={`returns-${index}`}>
                <Card fullWidth isBlurred shadow="none">
                  <CardBody>
                    <Image src={returns.books.book_details.at(0).cover_image_url} alt={returns.books.book_details} />
                  </CardBody>
                  <CardFooter>
                    <Link
                      href={`/book/${returns.books.id}`}
                      className="flex flex-col items-start justify-center gap-2 p-1"
                    >
                      <span className="text-md font-bold line-clamp-1">{returns.books.book_name}</span>
                      <span className="text-tiny text-default-500">{returns.books.author}</span>
                      <span className="text-tiny text-default-500">
                        {kstFormat(new Date(returns.books.publication_date), 'yyyy-MM-dd')}
                      </span>
                    </Link>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-ful h-[100px] sm:h-[250px] flex flex-col items-center justify-center gap-8">
            <span>읽은 책이 없습니다</span>
          </div>
        )}
      </div>
    </div>
  )
}
