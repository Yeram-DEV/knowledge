'use client'

import { Tab, Tabs } from '@nextui-org/tabs'
import { Textarea } from '@nextui-org/input'
import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { useState } from 'react'
import { useReviews } from '../_hooks/use-reviews'

export const BookContents = ({ book, user }) => {
  const { reviews, reviewText, handleReviewChange, handleReviewSubmit } = useReviews(book.id, user)
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
        <div className="w-full flex flex-col items-center justify-center gap-12 py-12">
          <div className="w-full flex flex-col items-start justify-center gap-4">
            <span className="text-2xl font-bold">한 줄 리뷰를 작성해 보세요</span>
            <Textarea
              labelPlacement="outside"
              placeholder="리뷰를 입력하세요"
              value={reviewText}
              onValueChange={handleReviewChange}
            />
            <Button fullWidth size="lg" variant="ghost" color="success" onPress={handleReviewSubmit}>
              리뷰 작성하기
            </Button>
          </div>
          <div className="w-full flex flex-col items-start justify-center gap-4">
            <span>총 {reviews.length}개</span>
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-full flex flex-col items-start justify-center gap-2 border-t-1 border-divider py-4"
              >
                <div className="w-full flex flex-col items-start justify-center">
                  <div className="w-full flex items-center justify-start gap-2">
                    <Avatar as="button" size="sm" className="transition-transform" src={review.user_profile_img} />
                    <div className="w-full flex flex-col items-start justify-center">
                      <span>{review.user_name}</span>
                      <span className="text-tiny text-default-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="whitespace-pre-line break-words">{review.review_text}</p>
              </div>
            ))}
          </div>
        </div>
      </Tab>
    </Tabs>
  )
}
