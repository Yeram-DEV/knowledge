import Image from 'next/image'
import { Book } from '@/types/book'

interface Props {
  book: Book
}

export const CoverBanner = async ({ book }: Props) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center py-20">
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
