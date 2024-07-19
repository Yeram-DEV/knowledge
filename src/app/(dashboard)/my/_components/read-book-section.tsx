'use client'

import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { kstFormat } from '@/utils/date'
import { Link } from '@nextui-org/link'
import { useMediaQuery } from '@/hooks'
import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'

export const ReadBookSection = ({ readBooks }) => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8">
      <div className="w-full flex gap-2 items-center justify-start">
        <Icon icon="solar:notebook-minimalistic-outline" width={32} height={32} />
        <span className="text-2xl font-black">읽고 있는 책</span>
      </div>
      <div className="w-full relative">
        {readBooks.length > 0 ? (
          <Swiper
            spaceBetween={10}
            loop={true}
            slidesPerView={isDesktop ? 5 : 2}
            autoplay={{
              delay: 2500
            }}
            modules={[Autoplay]}
          >
            {readBooks.map((rental: any, index: any) => (
              <SwiperSlide key={`read-${index}`}>
                <Card fullWidth isBlurred shadow="none">
                  <CardBody>
                    <Image src={rental.books.book_details.at(0).cover_image_url} alt={rental.books.book_details} />
                  </CardBody>
                  <CardFooter>
                    <Link
                      href={`/book/${rental.books.id}`}
                      className="flex flex-col items-start justify-center gap-2 p-1"
                    >
                      <span className="text-md font-bold line-clamp-1">{rental.books.book_name}</span>
                      <span className="text-tiny text-default-500">{rental.books.author}</span>
                      <span className="text-tiny text-default-500">
                        {kstFormat(new Date(rental.books.publication_date), 'yyyy-MM-dd')}
                      </span>
                    </Link>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-ful h-[100px] sm:h-[250px] flex flex-col items-center justify-center gap-2">
            <span>읽고 있는 책이 없습니다</span>
            <Button as={Link} href="/" color="primary" size="lg">
              책보러 가기
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
