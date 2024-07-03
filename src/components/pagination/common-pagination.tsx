'use client'

import { Pagination } from '@nextui-org/pagination'
import { useUpdateQueryString } from '@/utils/queries'

export const CommonPagination = ({ totalPages, currentPage }: { totalPages: number; currentPage: number }) => {
  const { updateQueryString } = useUpdateQueryString()

  return (
    <Pagination
      total={totalPages}
      initialPage={currentPage}
      onChange={(page) => {
        updateQueryString('page', page.toString())
      }}
    />
  )
}
