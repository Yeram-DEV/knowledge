'use client'

import { Tab, Tabs } from '@nextui-org/tabs'
import { useState } from 'react'
import { ReadBookSection } from './read-book-section.tsx'
import { ReturnBookSection } from './return-book-section.tsx'
import { LikeBookSection } from './like-book-section.tsx'
import { Icon } from '@iconify/react'

export const MyContents = ({ readBooks, returnBooks, likeBooks }) => {
  const [selected, setSelected] = useState<string>('read_books')

  const handleSelectionChange = (key: string) => {
    setSelected(key)
  }

  return (
    <Tabs
      fullWidth
      size="lg"
      variant="bordered"
      color="primary"
      aria-label="my contents"
      selectedKey={selected}
      onSelectionChange={handleSelectionChange}
    >
      <Tab
        className="w-full"
        key="read_books"
        title={
          <div className="flex items-center space-x-2">
            <Icon icon="solar:notebook-minimalistic-outline" />
            <span>읽는 책</span>
          </div>
        }
      >
        <ReadBookSection readBooks={readBooks} />
      </Tab>
      <Tab
        className="w-full"
        key="return_books"
        title={
          <div className="flex items-center space-x-2">
            <Icon icon="solar:bookmark-square-minimalistic-outline" />
            <span>읽었던 책</span>
          </div>
        }
      >
        <ReturnBookSection returnBooks={returnBooks} />
      </Tab>
      <Tab
        className="w-full"
        key="like_books"
        title={
          <div className="flex items-center space-x-2">
            <Icon icon="solar:heart-outline" />
            <span>찜한 책</span>
          </div>
        }
      >
        <LikeBookSection likeBooks={likeBooks} />
      </Tab>
      <Tab
        className="w-full"
        key="reiew"
        title={
          <div className="flex items-center space-x-2">
            <Icon icon="solar:notes-outline" />
            <span>리뷰</span>
          </div>
        }
      ></Tab>
    </Tabs>
  )
}
