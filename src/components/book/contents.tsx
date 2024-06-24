'use client'

import { Book } from '@/types/book'
import { Tab, Tabs } from '@nextui-org/tabs'
import { useState } from 'react'

export const BookContents = ({ book }: { book: Book }) => {
  const [selected, setSelected] = useState<string>('introduce')

  const handleSelectionChange = (key: string) => {
    setSelected(key)
  }

  return (
    <Tabs
      fullWidth
      size="lg"
      color="primary"
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={handleSelectionChange}
    >
      <Tab key="introduce" title="작품소개">
        <p className="whitespace-pre-line break-words py-9">{book.details.description}</p>
      </Tab>
      <Tab key="table" title="목차">
        <p className="whitespace-pre-line break-words py-9">{book.details.table_of_contents}</p>
      </Tab>
    </Tabs>
  )
}
