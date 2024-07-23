'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import { Autoplay } from 'swiper/modules'
import { Card, CardBody } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { Chip } from '@nextui-org/chip'
import { Icon } from '@iconify/react'
import { Event } from '@/types'
import 'swiper/css'
import { useColor } from 'color-thief-react'

export const EventSection = ({ events }: { events: Event[] }) => {
  const swiperRef = useRef<SwiperType | null>(null)
  const [currentSlide, setCurrentSlide] = useState(1)
  const router = useRouter()

  const handleSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper
    setCurrentSlide(swiper.realIndex + 1)
  }

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex + 1)
  }

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
    }
  }

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
    }
  }

  return (
    <div className="w-full max-w-[1018px] relative">
      <Swiper
        spaceBetween={50}
        loop={true}
        slidesPerView={1}
        autoplay={{
          delay: 5000
        }}
        modules={[Autoplay]}
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
      >
        {events.map((event) => (
          <SwiperSlide key={event.event_id}>
            <EventCard event={event} router={router} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-0 left-0 right-0 bottom-0 hidden sm:block">
        <Button
          isIconOnly
          variant="light"
          className="z-10 absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2"
          onClick={handlePrevClick}
        >
          <Icon icon="solar:round-alt-arrow-left-bold" width={40} height={40} />
        </Button>
        <Button
          isIconOnly
          variant="light"
          className="z-10 absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
          onClick={handleNextClick}
        >
          <Icon icon="solar:round-alt-arrow-right-bold" width={40} height={40} />
        </Button>
        <Chip variant="flat" className="z-10 absolute bottom-2 sm:bottom-12 right-1 sm:right-16">
          {currentSlide}/{events.length}
        </Chip>
      </div>
    </div>
  )
}

const EventCard = ({ event, router }) => {
  const { data: dominantColor } = useColor(event.thumbnail_url, 'hex', {
    crossOrigin: 'anonymous',
    quality: 10
  })

  return (
    <Card
      fullWidth
      isPressable
      onPress={() => router.push(`/event/${event.event_id}`)}
      className="relative h-[300px] sm:h-[400px]"
    >
      <CardBody
        className="flex flex-col items-start justify-end bg-cover bg-center p-10 relative"
        style={{ backgroundImage: `url(${event.thumbnail_url})` }}
      >
        {dominantColor && (
          <div
            className="absolute inset-0 z-0"
            style={{
              background: `linear-gradient(to top, ${dominantColor}B3 11%, transparent 45%)`
            }}
          ></div>
        )}
        <span className="text-3xl text-white font-black max-w-[calc(50%+40px)] line-clamp-2 whitespace-pre-line z-10">
          {event.event_name}
        </span>
        <span className="text-white max-w-[calc(50%+40px)] sm:max-w-[calc(30%+40px)] line-clamp-2 whitespace-pre-line z-10">
          {event.summary}
        </span>
      </CardBody>
    </Card>
  )
}
