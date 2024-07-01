import { useState } from 'react'
import { safeLocalStorage } from '@/libs/storage'
import { Book } from '@/types/book'
import { Button } from '@nextui-org/button'
import { HeartFilledIcon } from '@/components/common/icons'

export const BookFooterWish = ({ book }: { book: Book }) => {
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
  )
}
