import { z } from 'zod'

export const bookPurchaseScheme = z.object({
  title: z.string().min(1, { message: '책 제목을 입력해주세요' }),
  purchase_link: z.string().min(1, { message: '구매링크를 입력해주세요' }),
  purpose: z.string().min(1, { message: '구매목적을 입력해주세요' }),
  isbn: z
    .string()
    .min(1, { message: 'isbn코드를 입력해주세요' })
    .transform((val) => Number(val))
})
export type BookPurchaseSchemeType = z.infer<typeof bookPurchaseScheme>

export const reviewScheme = z.object({
  review_text: z.string().min(1, { message: '내용을 입력해주세요' })
})
export type ReviewSchemeType = z.infer<typeof reviewScheme>
