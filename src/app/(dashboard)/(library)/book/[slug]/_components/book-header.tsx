import { kstFormat } from '@/utils/date'
import { Button } from '@nextui-org/button'
import { Icon } from '@iconify/react'

export const BookHeader = ({ book }) => {
  return (
    <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-2">
      <div className="w-full flex flex-col gap-2 items-start justify-center">
        <h4 className="text-4xl font-bold">{book.book_name}</h4>
        <div className="flex items-start justify-center text-gray-500 gap-2">
          <span>{book.author}</span>•<span>{book.publisher}</span>•
          <span>{kstFormat(new Date(book.publication_date), 'yyyy-MM-dd')}</span>
        </div>
      </div>
      <div className="w-full flex items-center justify-end gap-1">
        <Button isIconOnly size="lg" variant="light">
          <Icon icon="solar:heart-outline" width={32} height={32} />
        </Button>
        <Button size="lg" color="warning">
          대여
        </Button>
      </div>
    </div>
  )
}
