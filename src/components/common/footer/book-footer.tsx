'use client'

import { Button } from '@nextui-org/button'
import { DocumentTextIcon } from '@/components/common/icons'
import { Book } from '@/types/book'
import { useCreateRental } from '@/hooks/mutation/book'
import { Session } from 'next-auth'
import { BookFooterWish } from '@/components/common/footer/book-footer-wish'
import { useState } from 'react'
import { toast } from 'sonner'

export const BookFooter = ({ book, session }: { book: Book; session: Session }) => {
  const currentUserRental = book.rentals.find((rental) => rental.user.id === session.user.id)
  const isRentedByCurrentUser = Boolean(currentUserRental)
  const isRentedByOther = book.rentals.some((rental) => rental.user.id !== session.user.id && !rental.returned)

  const [rentedByCurrentUser, setRentedByCurrentUser] = useState(isRentedByCurrentUser)
  const [rentedByOther, setRentedByOther] = useState(isRentedByOther)

  const { mutate: createRental } = useCreateRental()

  const handleRentalClick = () => {
    if (!rentedByCurrentUser) {
      createRental(
        {
          userId: session.user.id,
          bookId: book.id
        },
        {
          onSuccess: (data) => {
            if (data.waitlist_id) {
              toast.success(`${data.position} 순위 대기자입니다`)
              return
            }
            setRentedByCurrentUser(true)
            setRentedByOther(false)
            toast.success('대여하였습니다')
          },
          onError: (error: any) => {
            toast.error(error ? error.message : '대여에 실패했습니다')
          }
        }
      )
    } else {
      console.log(rentedByCurrentUser ? '반납' : '기다리기')
    }
  }

  return (
    <div className="w-full sm:w-1/2 fixed bottom-0 border-1 border-divider bg-[#18171c] rounded-t-2xl shadow-sm px-6 py-4 dark z-50">
      <div className="flex items-center justify-between gap-4">
        <BookFooterWish book={book} />
        <Button
          isIconOnly
          variant="light"
          aria-label="리뷰"
          className="flex flex-col items-center justify-center"
          size="lg"
        >
          <DocumentTextIcon />
          <span>리뷰</span>
        </Button>
        <Button
          fullWidth
          size="lg"
          color={rentedByCurrentUser ? 'warning' : rentedByOther ? 'default' : 'primary'}
          onPress={handleRentalClick}
        >
          {rentedByCurrentUser ? '반납' : rentedByOther ? '기다리기' : '대여'}
        </Button>
      </div>
    </div>
  )
}
