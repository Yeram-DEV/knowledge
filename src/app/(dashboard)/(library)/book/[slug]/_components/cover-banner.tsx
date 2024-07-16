'use client'

import { useColor } from 'color-thief-react'
import { Image } from '@nextui-org/image'
import { Skeleton } from '@nextui-org/skeleton'

export const CoverBanner = ({ book }) => {
  const {
    data: dominantColor,
    loading,
    error
  } = useColor(book.book_details.at(0).cover_image_url, 'hex', { crossOrigin: 'anonymous', quality: 10 })

  if (loading || error)
    return (
      <div className="relative w-full h-full flex items-center justify-center py-20">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        <Skeleton className="w-[300px] h-[460px] rounded-2xl" />
      </div>
    )

  return (
    <div
      className="relative w-full h-full flex items-center justify-center py-20 rounded-2xl"
      style={{ backgroundColor: dominantColor }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      <Image
        src={book.book_details.at(0).cover_image_url}
        width={300}
        height={400}
        className="z-20 object-contain object-bottom"
        crossOrigin="anonymous"
        alt="Book Cover"
      />
    </div>
  )
}
