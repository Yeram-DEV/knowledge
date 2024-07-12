import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'
import { Divider } from '@nextui-org/divider'
import { Icon } from '@iconify/react'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { kstFormat } from '@/utils/date'

export default async function BooksAdminDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: book } = await supabase
    .from('books')
    .select(
      `
      *,
      book_details (*),
      book_category (*)
    `
    )
    .eq('id', params.id)
    .maybeSingle()

  const { data: previousBook } = await supabase
    .from('books')
    .select('id')
    .lt('id', params.id)
    .order('id', { ascending: false })
    .limit(1)
    .maybeSingle()

  const { data: nextBook } = await supabase
    .from('books')
    .select('id')
    .gt('id', params.id)
    .order('id', { ascending: true })
    .limit(1)
    .maybeSingle()

  return (
    <div className="relative w-full h-full overflow-auto">
      <div className="container h-full mx-auto max-w-7xl flex flex-col items-center justify-start gap-8 sm:gap-32 p-4">
        <div className="w-full h-full flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-8">
          <Image
            src={book.book_details.at(0).cover_image_url}
            alt="cover_image"
            width={300}
            height={200}
            className="rounded-2xl"
          />
          <div className="w-full h-full flex flex-col items-start justify-evenly gap-2">
            <div className="w-full flex items-center justify-center sm:justify-start gap-4">
              <Button
                variant="bordered"
                as={Link}
                href={'/admin/books'}
                startContent={<Icon icon="solar:clipboard-list-outline" />}
              >
                목록
              </Button>
              {previousBook && (
                <Button
                  variant="bordered"
                  as={Link}
                  href={`/admin/books/${previousBook.id}`}
                  startContent={<Icon icon="solar:arrow-left-outline" />}
                >
                  이전책
                </Button>
              )}
              {nextBook && (
                <Button
                  variant="bordered"
                  as={Link}
                  href={`/admin/books/${nextBook.id}`}
                  endContent={<Icon icon="solar:arrow-right-outline" />}
                >
                  다음책
                </Button>
              )}
            </div>

            <div className="h-full flex flex-col items-start justify-center gap-2">
              <div className="w-full flex flex-col items-start justify-center gap-1 ">
                <span className="text-tiny text-default-500">{book.book_category.description}</span>
                <span className="text-3xl font-bold">{book.book_name}</span>
              </div>
              <div className="w-full flex flex-col items-start justify-center">
                <span className="text-sm font-bold">{book.author} 저</span>
                <span className="text-sm font-bold">{book.publisher} 출판</span>
                <span className="text-sm text-default-500 mt-2">
                  {kstFormat(new Date(book.publication_date), 'yyyy-MM-dd')}
                </span>
              </div>
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <Button fullWidth size="lg" color="danger" variant="flat">
                삭제
              </Button>
              <Button fullWidth size="lg" color="primary" variant="flat">
                수정
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-8">
          <div className="w-full flex flex-col items-start justify-start gap-2">
            <span className="text-2xl font-bold">작품소개</span>
            <Divider orientation="horizontal" />
            <p className="whitespace-pre-line break-words py-9">{book.book_details.at(0).description}</p>
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-2">
            <span className="text-2xl font-bold">작품소개</span>
            <Divider orientation="horizontal" />
            <p className="whitespace-pre-line break-words py-9">{book.book_details.at(0).table_of_contents}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
