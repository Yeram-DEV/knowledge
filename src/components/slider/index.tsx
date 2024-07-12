import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { Button } from '@nextui-org/button'
import { Icon } from '@iconify/react'

interface SliderContextProps {
  current: number
  nextSlide: () => void
  prevSlide: () => void
  totalItems: number
}

const SliderContext = createContext<SliderContextProps | undefined>(undefined)

const useSlider = () => {
  const context = useContext(SliderContext)
  if (!context) {
    throw new Error('useSlider must be used within a SliderProvider')
  }
  return context
}

interface SliderProviderProps {
  children: ReactNode
  autoplay?: boolean
  interval?: number
  totalItems: number
}

const SliderProvider: React.FC<SliderProviderProps> = ({ children, autoplay = true, interval = 3000, totalItems }) => {
  const [current, setCurrent] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrent((current + 1) % totalItems)
  }, [current, totalItems])

  const prevSlide = useCallback(() => {
    setCurrent((current - 1 + totalItems) % totalItems)
  }, [current, totalItems])

  useEffect(() => {
    if (autoplay) {
      const autoPlayInterval = setInterval(nextSlide, interval)
      return () => clearInterval(autoPlayInterval)
    }
  }, [current, autoplay, interval, totalItems, nextSlide])

  return (
    <SliderContext.Provider value={{ current, nextSlide, prevSlide, totalItems }}>{children}</SliderContext.Provider>
  )
}

interface SliderProps {
  children: ReactNode
  autoplay?: boolean
  interval?: number
  totalItems: number
}

const Slider: React.FC<SliderProps> = ({ children, autoplay, interval, totalItems }) => {
  return (
    <SliderProvider autoplay={autoplay} interval={interval} totalItems={totalItems}>
      <div className="relative max-w-[1116px] h-[343px] sm:h-[400px] w-full">
        <div className="w-full h-full flex overflow-hidden">{children}</div>
        <SliderControls />
      </div>
    </SliderProvider>
  )
}

interface SliderItemProps {
  index: number
  children: ReactNode
}

const SliderItem: React.FC<SliderItemProps> = ({ index, children }) => {
  const { current, totalItems } = useSlider()

  const getStyle = (index: number) => {
    if (index === current) {
      return { flexGrow: 1, flexBasis: '0px' }
    } else if (index === (current + 1) % totalItems || index === (current + 2) % totalItems) {
      return { flexGrow: 0, flexBasis: '46px' }
    } else {
      return { flexGrow: 0, flexBasis: '0px' }
    }
  }

  return (
    <div className="w-0 h-[400px] transition-all duration-500" style={getStyle(index)}>
      {children}
    </div>
  )
}

const SliderControls: React.FC = () => {
  const { nextSlide, prevSlide } = useSlider()

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 mx-1">
      <Button
        isIconOnly
        variant="light"
        className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2"
        onClick={prevSlide}
      >
        <Icon icon="solar:round-alt-arrow-left-bold" width={40} height={40} />
      </Button>
      <Button
        isIconOnly
        variant="light"
        className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
        onClick={nextSlide}
      >
        <Icon icon="solar:round-alt-arrow-right-bold" width={40} height={40} />
      </Button>
    </div>
  )
}

export { Slider, SliderItem }
