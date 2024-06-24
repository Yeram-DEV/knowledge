'use client'

import { Button } from '@nextui-org/button'
import { DocumentTextIcon, HeartFilledIcon } from '@/components/common/icons'
import { Book } from '@/types/book'
import { useState } from 'react'
import { safeLocalStorage } from '@/libs/storage'

export const BookFooter = ({ book }: { book: Book }) => {
  const [isWished, setIsWished] = useState<boolean>(() => {
    const wishedBooks = JSON.parse(safeLocalStorage.get('wishedBooks') || '[]')
    return wishedBooks.includes(book.id)
  })

  const handleWishClick = () => {
    const wishedBooks = new Set(JSON.parse(safeLocalStorage.get('wishedBooks') || '[]'))
    if (isWished) {
      wishedBooks.delete(book.id)
    } else {
      wishedBooks.add(book.id)
    }
    safeLocalStorage.set('wishedBooks', JSON.stringify(Array.from(wishedBooks)))
    setIsWished(!isWished)
  }

  return (
    <div className="w-full sm:w-1/2 fixed bottom-0 border-1 border-divider bg-[#18171c] rounded-t-2xl shadow-sm px-6 py-4 dark">
      <div className="flex items-center justify-between gap-4">
        <Button
          isIconOnly
          variant="light"
          aria-label="위시"
          className="flex flex-col items-center justify-center"
          size="lg"
          color={isWished ? 'danger' : 'default'}
          onPress={handleWishClick}
        >
          <HeartFilledIcon />
          <span>위시</span>
        </Button>
        <Button
          isIconOnly
          variant="light"
          aria-label="위시"
          className="flex flex-col items-center justify-center"
          size="lg"
        >
          <DocumentTextIcon />
          <span>리뷰</span>
        </Button>
        <Button
          fullWidth
          size="lg"
          color="primary"
          onPress={() => {
            console.log(book.id)
          }}
        >
          대여
        </Button>
      </div>
    </div>
  )
}
