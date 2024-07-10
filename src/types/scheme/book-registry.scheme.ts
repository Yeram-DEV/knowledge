import { z } from 'zod'

export type BookRegistryScheme = z.infer<typeof bookRegistryScheme>
export const bookRegistryScheme = z.object({
  book_name: z.string().min(1, { message: '책 제목을 입력해주세요' }),
  author: z.string().min(1, { message: '저자를 입력해주세요' }),
  category: z.string().min(1, { message: '카테고리를 입력해주세요' }),
  publisher: z.string().min(1, { message: '출판사를 입력해주세요' }),
  publication_date: z.string().min(1, { message: '출판일을 입력해주세요' }),
  description: z.string().min(1, { message: '작품소개를 입력해주세요' }),
  table_of_contents: z.string().min(1, { message: '목차를 입력해주세요' })
})
