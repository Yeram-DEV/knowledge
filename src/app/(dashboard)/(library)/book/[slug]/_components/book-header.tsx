'use client'

import { Button } from '@nextui-org/button'
import { Icon } from '@iconify/react'
import { kstFormat } from '@/utils/date'
import useBookActions from '../../../../../../hooks/use-book-actions'

export const BookHeader = ({ book, user }) => {
  const {
    isSelected,
    isLoading,
    rentalStatus,
    updateLikeStatus,
    handleRent,
    handleWait,
    handleCancelWait,
    handleReturn
  } = useBookActions(book, user)

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
        <Button
          size="lg"
          isIconOnly
          variant="light"
          color={isSelected ? 'danger' : 'default'}
          onPress={updateLikeStatus}
        >
          <Icon icon={isSelected ? 'solar:heart-bold' : 'solar:heart-outline'} width={32} height={32} />
        </Button>
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
          isDisabled={isLoading}
          isLoading={rentalStatus === 'none' && isLoading}
        >
          {rentalStatus === 'none'
            ? '대여'
            : rentalStatus === 'mine'
              ? '반납'
              : rentalStatus === 'waiting'
                ? '빠지기'
                : '기다리기'}
        </Button>
      </div>
    </div>
  )
}
