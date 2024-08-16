'use client'

import { Button } from '@nextui-org/button'
import { kstFormat } from '@/utils/date'
import { BookLike } from './book-like'
import {
  useBookStatusQuery,
  useDelWaitlistMutation,
  useRentMutation,
  useReturnMutation,
  useWaitlistMutation
} from '@/hooks'

export const BookHeader = ({ book }) => {
  const { data: rentalStatus, isLoading: isStatusLoading } = useBookStatusQuery(book)
  const rentMutation = useRentMutation(book)
  const returnMutation = useReturnMutation(book)
  const waitlistMutation = useWaitlistMutation(book)
  const delWaitlistMutation = useDelWaitlistMutation(book)

  const handleRent = () => {
    rentMutation.mutate()
  }

  const handleReturn = () => {
    returnMutation.mutate()
  }

  const handleWait = () => {
    waitlistMutation.mutate()
  }

  const handleCancelWait = () => {
    delWaitlistMutation.mutate()
  }

  return (
    <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
      <div className="w-full flex flex-col gap-2 items-start justify-center">
        <h4 className="text-4xl font-bold">{book.book_name}</h4>
        <div className="flex items-start justify-center text-gray-500 gap-2">
          <span>{book.author}</span>•<span>{book.publisher}</span>•
          <span>{kstFormat(new Date(book.publication_date), 'yyyy-MM-dd')}</span>
        </div>
      </div>
      <div className="w-full flex items-center justify-end gap-1">
        <BookLike book={book} />
        {!isStatusLoading && (
          <Button
            size="lg"
            className="w-full sm:w-auto"
            color={rentalStatus === 'none' ? 'warning' : rentalStatus === 'mine' ? 'success' : 'primary'}
            variant={rentalStatus === 'waiting' ? 'flat' : 'solid'}
            onPress={
              rentalStatus === 'none'
                ? handleRent
                : rentalStatus === 'mine'
                  ? handleReturn
                  : rentalStatus === 'waiting'
                    ? handleCancelWait
                    : handleWait
            }
            isDisabled={isStatusLoading}
            isLoading={rentalStatus === 'none' && isStatusLoading}
          >
            {rentalStatus === 'none'
              ? '대여'
              : rentalStatus === 'mine'
                ? '반납'
                : rentalStatus === 'waiting'
                  ? '빠지기'
                  : '기다리기'}
          </Button>
        )}
      </div>
    </div>
  )
}
