'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Card, CardBody } from '@nextui-org/card'

export function NewBookBanner() {
  const images = [
    'https://static.yeram.co.kr/knowledge/book/cover/123.jpg',
    'https://static.yeram.co.kr/knowledge/book/cover/511.jpg',
    'https://static.yeram.co.kr/knowledge/book/cover/152.jpg',
    'https://static.yeram.co.kr/knowledge/book/cover/8.jpg',
    'https://static.yeram.co.kr/knowledge/book/cover/123.jpg',
    'https://static.yeram.co.kr/knowledge/book/cover/511.jpg',
    'https://static.yeram.co.kr/knowledge/book/cover/152.jpg',
    'https://static.yeram.co.kr/knowledge/book/cover/8.jpg'
  ]

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <Swiper
        grabCursor
        slidesPerView="auto"
        spaceBetween={20}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        initialSlide={1}
        modules={[Autoplay]}
        className="mySwiper w-full"
        breakpoints={{
          320: {
            slidesPerView: 2
          },
          480: {
            slidesPerView: 2
          },
          640: {
            slidesPerView: 3
          },
          768: {
            slidesPerView: 4
          }
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Card isPressable fullWidth>
              <CardBody
                className="h-[300px] sm:h-[500px]"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              ></CardBody>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
