import { createClient } from '@/utils/supabase/server'
import { Book } from '@/types'
import { getPaginationData } from '@/utils/pagination'
import { CommonPagination } from '@/components/pagination'
import { kstFormat } from '@/utils/date'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { TableData, TableFilter } from '@/app/admin/books/_components'

type Props = {
  searchParams: {
    page: string
  }
}

export default async function AdminBooksPage({ searchParams }: Props) {
  const supabase = createClient()
  const currentPage = parseInt(searchParams.page) || 1

  const { count: totalBooks } = await supabase.from('books').select('*', { count: 'exact', head: true })

  const { totalPages, start, end } = getPaginationData(totalBooks, currentPage, 100)

  // Fetch books with their details and category
  const { data: books } = await supabase
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

  return (
    <div className="w-full flex-1 flex-col p-4 overflow-auto">
      <header className="flex items-center gap-3 rounded-medium border-small border-divider p-4">
        <TableFilter />
      </header>
      <div className="flex w-full flex-col gap-4 rounded-medium border-small border-divider mt-4">
        <TableData books={books} />
      </div>
      <div className="flex justify-center mt-4">
        <CommonPagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  )
}
