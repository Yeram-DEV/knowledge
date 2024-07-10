'use client'

import { Accordion, AccordionItem } from '@nextui-org/accordion'
import { kstFormat } from '@/utils/date'
import { Book } from '@/types'

export const BookAccordion = ({ book }: { book: Book }) => {
  return (
    <>
      <Accordion fullWidth defaultExpandedKeys="2" variant="splitted" className="px-0">
        <AccordionItem key="2" aria-label="event detail" title="도서 정보">
          <div className="w-full flex items-start justify-center">
            <div className="w-full flex flex-col items-start justify-center gap-3">
              <span>저자</span>
              <span>출판사</span>
              <span>출판일</span>
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-3">
              <span>{book.author}</span>
              <span>{book.publisher}</span>
              <span>{kstFormat(new Date(book.publication_date), 'yyyy-MM-dd')}</span>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </>
  )
}
