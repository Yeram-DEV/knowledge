'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Card, CardBody } from '@nextui-org/card'

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
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        initialSlide={1}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Card>
              <CardBody
                className="h-[300px]"
                style={{ backgroundImage: `url(${src})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
              ></CardBody>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
