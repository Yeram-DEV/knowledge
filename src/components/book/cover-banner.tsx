'use client'

import { useEffect, useRef, useState } from 'react'
import ColorThief from 'colorthief'
import { Book } from '@/types/book'
import Image from 'next/image'

export const CoverBanner = ({ book }: { book: Book }) => {
  const [palette, setPalette] = useState<number[][] | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const imgElement = imgRef.current
    if (imgElement) {
      const handleLoad = () => {
        const colorThief = new ColorThief()
        try {
          const result = colorThief.getPalette(imgElement, 5) // Get a palette of 5 colors
          setPalette(result)
        } catch (error) {
          console.error('Error extracting color palette:', error)
        }
      }

      imgElement.addEventListener('load', handleLoad)

      // If the image is already cached and loaded
      if (imgElement.complete && imgElement.naturalHeight !== 0) {
        handleLoad()
      }

      return () => {
        imgElement.removeEventListener('load', handleLoad)
      }
    }
  }, [book.details.cover_image_url])

  return (
    <div
      className="relative w-full h-full flex items-center justify-center py-20 bg-background/1"
      style={{
        backgroundColor: palette ? `rgba(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]}, 0.5)` : 'transparent'
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"
        style={{
          backgroundColor: palette ? `rgba(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]}, 0.5)` : 'transparent'
        }}
      ></div>
      <Image
        src={book.details.cover_image_url}
        width={300}
        height={400}
        className="z-20 object-contain object-bottom"
        ref={imgRef}
        crossOrigin="anonymous"
        alt="Book Cover"
      />
    </div>
  )
}
