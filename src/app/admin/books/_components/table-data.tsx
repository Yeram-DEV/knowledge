'use client'

import { Book } from '@/types'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { kstFormat } from '@/utils/date'
import { useRouter } from 'next/navigation'

export const TableData = ({ books }: { books: Book[] }) => {
  const router = useRouter()
  const handleRowClick = (key: number) => {
    router.push(`/admin/book/${key}`)
  }

  return (
    <Table selectionMode="single" onRowAction={handleRowClick} aria-label="도서 목록">
      <TableHeader>
        <TableColumn>번호</TableColumn>
        <TableColumn>카테고리</TableColumn>
        <TableColumn>책</TableColumn>
        <TableColumn>저자</TableColumn>
        <TableColumn>출판사</TableColumn>
        <TableColumn>출판일</TableColumn>
      </TableHeader>
      <TableBody>
        {books.map((book: Book) => (
          <TableRow key={book.id} className="cursor-pointer">
            <TableCell>{book.id}</TableCell>
            <TableCell>{book.book_category.description}</TableCell>
            <TableCell>{book.book_name}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.publisher}</TableCell>
            <TableCell>{kstFormat(new Date(book.publication_date), 'yyyy-MM-dd')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
