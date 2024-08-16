import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import debounce from 'lodash/debounce'
import { searchBooks } from '@/api'

export const useBookSearch = (query: string) => {
  const debouncedSearch = useMemo(() => {
    return debounce((query, onSuccess) => {
      searchBooks(query).then(onSuccess)
    }, 500)
  }, [])

  return useQuery({
    queryKey: ['searchBooks', query],
    queryFn: () =>
      new Promise((resolve) => {
        if (query) {
          debouncedSearch(query, resolve)
        }
      }),
    enabled: !!query,
    staleTime: 500
  })
}
