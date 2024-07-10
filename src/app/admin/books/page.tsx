import { createClient } from '@/utils/supabase/server'
import { getPaginationData } from '@/utils/pagination'
import { CommonPagination } from '@/components/pagination'
import { TableData, TableFilter } from '@/app/admin/books/_components'

type Props = {
  searchParams: {
    page?: string
    category?: string
    st?: string
  }
}

export default async function AdminBooksPage({ searchParams }: Props) {
  const supabase = createClient()
  const currentPage = parseInt(searchParams.page) || 1
  const { category, st } = searchParams

  let countQuery = supabase.from('books').select('id', { count: 'exact', head: true })

  if (category) countQuery = countQuery.eq('category_id', category)
  if (st) countQuery = countQuery.or(`book_name.ilike.%${st}%,author.ilike.%${st}%,publisher.ilike.%${st}%`)

  const { count: totalBooks } = await countQuery
  const { totalPages, start, end } = getPaginationData(totalBooks, currentPage, 100)

  let dataQuery = supabase
    .from('books')
    .select(
      `
      *,
      book_details (*),
      book_category (*)
    `
    )
    .order('id', { ascending: false })
    .range(start, end)

  if (category) dataQuery = dataQuery.eq('category_id', category)
  if (st) dataQuery = dataQuery.or(`book_name.ilike.%${st}%,author.ilike.%${st}%,publisher.ilike.%${st}%`)

  const { data: books } = await dataQuery

  return (
    <div className="w-full flex-1 flex-col p-4 overflow-auto">
      <header className="flex items-center gap-3 rounded-medium border-small border-divider p-4">
        <TableFilter />
      </header>
      <div className="flex w-full flex-col gap-4 rounded-medium border-small border-divider mt-4">
        <TableData books={books} total={totalBooks} />
      </div>
      <div className="flex justify-center mt-4">
        <CommonPagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  )
}
