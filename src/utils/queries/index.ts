import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import qs from 'query-string'
import { useCallback } from 'react'

export function useRouterQuery() {
  const params = useSearchParams()
  return qs.parse(params?.toString() || '')
}

export function useUpdateRouterQuery() {
  const router = useRouter()
  const pathname = usePathname()
  const currentQuery = useRouterQuery()

  return useCallback(
    (updatedQueryParts: any) => {
      const updatedQuery = {
        ...currentQuery,
        ...updatedQueryParts
      }

      Object.keys(updatedQueryParts).forEach((key) => {
        if (updatedQueryParts[key] === currentQuery[key]) {
          delete updatedQuery[key]
        }
      })

      const url = qs.stringifyUrl(
        {
          url: pathname,
          query: updatedQuery
        },
        { skipNull: true }
      )

      router.push(url)
    },
    [router, pathname, currentQuery]
  )
}
