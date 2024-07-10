'use client'

import { Pagination } from '@nextui-org/pagination'
import { useUpdateRouterQuery } from '@/utils/queries'

export const CommonPagination = ({ totalPages, currentPage }: { totalPages: number; currentPage: number }) => {
  const updateRouterQuery = useUpdateRouterQuery()
  return (
    <Pagination
      total={totalPages}
      page={currentPage}
      onChange={(page) => {
        updateRouterQuery({ page: page.toString() })
      }}
    />
  )
}
