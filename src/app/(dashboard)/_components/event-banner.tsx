'use client'

import { Slider, SliderItem } from '@/components/slider'

const banners = [
  {
    img: 'url(//active.ridibooks.com/ridibooks_banner/1720003567191_MjQwNzAz.jpg)',
    title: '조예은x강민영x설재인 작가와의 만남에 초대해요',
    subtitle: '우주라이크소설x턴 시리즈 출간 기념 북토크'
  },
  {
    img: 'url(//active.ridibooks.com/ridibooks_banner/1719967756847_w6vCucKF.jpg)',
    title: '조예은 초대해요',
    subtitle: '우주라이크소설x 출간 기념 북토크'
  },
  {
    img: 'url(//active.ridibooks.com/ridibooks_banner/1720595342181_w6vCucKF.png)',
    title: '작가와의 만남에 초대해요',
    subtitle: '우주라이크소설x턴 시리즈 출간 기념 북토크'
  },
  {
    img: 'url(//active.ridibooks.com/ridibooks_banner/1719759198831_MjQwMjI3.jpg)',
    title: '작가와의 만남에 초대해요',
    subtitle: '우주라이크소설x턴 시리즈 출간 기념 북토크'
  },
  {
    img: 'url(//active.ridibooks.com/ridibooks_banner/1719390635119_MjQwNjI2.jpg)',
    title: '작가와의 만남에 초대해요',
    subtitle: '우주라이크소설x턴 시리즈 출간 기념 북토크'
  },
  {
    img: 'url(//active.ridibooks.com/ridibooks_banner/1719817831564_MjQwNzAx.jpg)',
    title: '작가와의 만남에 초대해요',
    subtitle: '우주라이크소설x턴 시리즈 출간 기념 북토크'
  },
  {
    img: 'url(//active.ridibooks.com/ridibooks_banner/1719390635119_MjQwNjI2.jpg)',
    title: '작가와의 만남에 초대해요',
    subtitle: '우주라이크소설x턴 시리즈 출간 기념 북토크'
  },
  {
    img: 'url(//active.ridibooks.com/ridibooks_banner/1719303985034_MjQwNjI1.jpeg)',
    title: '작가와의 만남에 초대해요',
    subtitle: '우주라이크소설x턴 시리즈 출간 기념 북토크'
  }
]

export const EventBanner = () => {
  return (
    <Slider autoplay={true} interval={5000} totalItems={banners.length}>
      {banners.map((banner, index) => (
        <SliderItem key={index} index={index}>
          <div className="relative rounded-md overflow-hidden h-full mx-1">
            <div
              className="absolute left-1/2 transform -translate-x-1/2 bg-gray-200 bg-cover bg-center w-[1018px] h-[400px]"
              style={{ backgroundImage: banner.img }}
            >
              <div
                className="absolute left-0 right-0 bottom-0 w-full bg-cover bg-center h-[200px]"
                style={{
                  backgroundSize: '100% calc(100% + 2px)'
                }}
              ></div>
              <div className="relative flex items-start justify-end flex-col h-full w-screen p-[40px] pt-0 pr-[46px]">
                <span className="max-w-[calc(35%+40px)] text-white text-[32px] font-bold line-clamp-2 whitespace-pre-line">
                  {banner.title}
                </span>
                <span className="text-sm text-default-500">{banner.subtitle}</span>
              </div>
            </div>
          </div>
        </SliderItem>
      ))}
    </Slider>
  )
}
