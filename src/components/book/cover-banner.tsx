import Image from 'next/image'
import { Book } from '@/types/book'
import { getComplementaryColor, getDominantColor } from '@/libs/style'

interface Props {
  book: Book
}

export const CoverBanner = async ({ book }: Props) => {
  const dominantColor = await getDominantColor(book.details.cover_image_url)
  const complementaryColor = getComplementaryColor(dominantColor)
  const gradient = `linear-gradient(to top, rgba(${dominantColor.r},${dominantColor.g},${dominantColor.b},0.8), rgba(${complementaryColor.r},${complementaryColor.g},${complementaryColor.b},0.8))`
  return (
    <div className="relative w-full h-full flex items-center justify-center py-20" style={{ background: gradient }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      <Image
        src={book.details.cover_image_url}
        width={300}
        height={400}
        className="z-20 object-contain object-bottom"
        crossOrigin="anonymous"
        alt="Book Cover"
      />
    </div>
  )
}
