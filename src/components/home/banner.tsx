'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Card, CardBody, CardFooter } from '@nextui-org/card'

export function EventBanner() {
  const images = [
    'https://static.yeram.co.kr/knowledge/event/banner/28p1qxvm.png',
    'https://static.yeram.co.kr/knowledge/event/banner/bqv57hao.png',
    'https://static.yeram.co.kr/knowledge/event/banner/dvzgb5bd.png',
    'https://static.yeram.co.kr/knowledge/event/banner/h66w9x69.png'
  ]

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        spaceBetween={10}
        loop
        autoplay={{
          delay: 5500
        }}
        initialSlide={1}
        modules={[Autoplay]}
        className="mySwiper w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Card>
              <CardBody
                className="h-[200px] sm:h-[350px]"
                style={{ backgroundImage: `url(${src})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
              ></CardBody>
              <CardFooter className="absolute bg-tra/30 bottom-0 flex flex-col items-start justify-center gap-2">
                <h3 className="text-3xl font-bold">Event {index + 1}</h3>
                <div className="flex flex-col items-start justify-center">
                  <h4 className="text-lg">Event Title {index}</h4>
                  <h4 className="text-lg">Event description {index + 1}</h4>
                </div>
              </CardFooter>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
