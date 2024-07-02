'use client'

import { Button } from '@nextui-org/button'
import { DocumentTextIcon } from '@/components/common/icons'
import { Book } from '@/types/book'
import { useCreateRental } from '@/hooks/mutation/book'
import { Session } from 'next-auth'
import { BookFooterWish } from '@/components/common/footer/book-footer-wish'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const BookFooter = ({ book, session }: { book: Book; session: Session }) => {
  console.log(book)
  const currentRental = book.rental
  const isRentedByCurrentUser = currentRental?.user.id === session.user.id
  const isRentedByOther = currentRental && !isRentedByCurrentUser

  const [rentedByCurrentUser, setRentedByCurrentUser] = useState(isRentedByCurrentUser)
  const [currentRentalId, setCurrentRentalId] = useState(currentRental?.rental_id ?? null)

  const { mutate: createRental } = useCreateRental()
  const router = useRouter()

  const handleRentalClick = () => {
    if (!rentedByCurrentUser) {
      createRental(
        { userId: session.user.id, bookId: book.id },
        {
          onSuccess: (data) => {
            if (data.waitlist_id) {
              toast.success(`${data.position} 순위 대기자입니다`)
              return
            }
            setRentedByCurrentUser(true)
            setCurrentRentalId(data.rental_id)
            toast.success('대여하였습니다')
          },
          onError: (error) => toast.error(error?.message || '대여에 실패했습니다')
        }
      )
    } else {
      router.push(`/returns/${currentRentalId}`)
    }
  }

  return (
    <div className="w-full sm:w-1/2 fixed bottom-0 border-1 border-divider bg-[#18171c] rounded-t-2xl shadow-sm px-6 py-4 dark z-50">
      <div className="flex items-center justify-between gap-4">
        <BookFooterWish book={book} />
        <Button isIconOnly variant="light" aria-label="리뷰" size="lg">
          <DocumentTextIcon />
          <span>리뷰</span>
        </Button>
        <Button
          fullWidth
          size="lg"
          color={rentedByCurrentUser ? 'warning' : isRentedByOther ? 'default' : 'primary'}
          onPress={handleRentalClick}
        >
          {rentedByCurrentUser ? '반납' : isRentedByOther ? '기다리기' : '대여'}
        </Button>
      </div>
    </div>
  )
}
