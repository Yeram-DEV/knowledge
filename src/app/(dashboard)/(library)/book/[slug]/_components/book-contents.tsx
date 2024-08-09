'use client'

import { Tab, Tabs } from '@nextui-org/tabs'
import { Textarea } from '@nextui-org/input'
import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { useState } from 'react'
import { usePostReview, useReviewQuery } from '@/hooks'
import { useForm } from 'react-hook-form'
import { reviewScheme, ReviewSchemeType } from '@/types/scheme'
import { zodResolver } from '@hookform/resolvers/zod'

export const BookContents = ({ book }) => {
  const [selected, setSelected] = useState<string>('introduce')
  const handleSelectionChange = (key: string) => {
    setSelected(key)
  }

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ReviewSchemeType>({
    resolver: zodResolver(reviewScheme)
  })

  const { data: reviews, isLoading } = useReviewQuery(book.id)

  const mutation = usePostReview(book.id)
  const onSubmit = (data: { review_text: string }) => {
    mutation.mutate(
      { book_id: book.id, review_text: data.review_text },
      {
        onSuccess: (response) => {
          if (response.success) {
            reset()
          }
        }
      }
    )
  }

  if (isLoading) return null

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
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-start justify-center gap-4">
            <span className="text-2xl font-bold">한 줄 리뷰를 작성해 보세요</span>
            <Textarea
              labelPlacement="outside"
              placeholder="리뷰를 입력하세요"
              {...register('review_text')}
              isInvalid={!!errors.review_text?.message}
              errorMessage={String(errors.review_text?.message ?? '')}
            />
            <Button type="submit" fullWidth size="lg" variant="ghost" color="success">
              리뷰 작성하기
            </Button>
          </form>
          <div className="w-full flex flex-col items-start justify-center gap-4">
            <span>총 {reviews.length}개</span>
            {!isLoading &&
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-full flex flex-col items-start justify-center gap-2 border-t-1 border-divider py-4"
                >
                  <div className="w-full flex flex-col items-start justify-center">
                    <div className="w-full flex items-center justify-start gap-2">
                      <Avatar
                        as="button"
                        size="sm"
                        className="transition-transform"
                        src={review.profiles.raw_user_meta_data['avatar_url']}
                      />
                      <div className="w-full flex flex-col items-start justify-center">
                        <span>{review.profiles.raw_user_meta_data['full_name']}</span>
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
