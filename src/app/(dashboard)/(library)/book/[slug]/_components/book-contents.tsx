'use client'

import { Tab, Tabs } from '@nextui-org/tabs'
import { useState } from 'react'

export const BookContents = ({ book }) => {
  const [selected, setSelected] = useState<string>('introduce')

  const handleSelectionChange = (key: string) => {
    setSelected(key)
  }

  return (
    <Tabs
      fullWidth
      size="lg"
      color="primary"
      aria-label="book contents"
      selectedKey={selected}
      onSelectionChange={handleSelectionChange}
    >
      <Tab key="introduce" title="책소개">
        <div className="w-full flex flex-col items-center justify-center gap-8 mt-6">
          <div className="w-full flex flex-col gap-2">
            <span className="text-3xl font-bold">책소개</span>
            <p className="whitespace-pre-line break-words text-sm">{book.book_details.at(0).description}</p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="text-3xl font-bold">목차</span>
            <p className="whitespace-pre-line break-words text-sm">{book.book_details.at(0).table_of_contents}</p>
          </div>
        </div>
      </Tab>
      <Tab key="review" title="리뷰">
        <></>
      </Tab>
    </Tabs>
  )
}
