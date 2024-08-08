import { useState, useMemo, useCallback } from 'react'
import { getChoseong } from 'es-hangul'
import debounce from 'lodash/debounce'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export const useBookSearch = () => {
  const [books, setBooks] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [initialFetch, setInitialFetch] = useState(false)

  const fetchBooks = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from('books').select('*, book_details(*)').order('id', { ascending: false })
    if (error) {
      console.error(error)
    } else {
      setBooks(data)
    }
    setLoading(false)
  }, [])

  const filterBooks = useCallback(
    (searchQuery: string) => {
      const queryChoseong = getChoseong(searchQuery)
      const filteredData = books
        .filter((book) => {
          const bookChoseong = getChoseong(book.book_name)
          return bookChoseong.includes(queryChoseong)
        })
        .sort((a, b) => {
          const aChoseong = getChoseong(a.book_name)
          const bChoseong = getChoseong(b.book_name)
          const aExactMatch = a.book_name.includes(searchQuery)
          const bExactMatch = b.book_name.includes(searchQuery)
          if (aExactMatch && !bExactMatch) return -1
          if (!aExactMatch && bExactMatch) return 1
          return aChoseong.indexOf(queryChoseong) - bChoseong.indexOf(queryChoseong)
        })
        .slice(0, 5)
      setResults(filteredData)
    },
    [books]
  )

  const debouncedFilter = useMemo(() => {
    return debounce((searchQuery) => {
      if (searchQuery) {
        if (!initialFetch) {
          fetchBooks().then(() => {
            setInitialFetch(true)
            filterBooks(searchQuery)
          })
        } else {
          filterBooks(searchQuery)
        }
      } else {
        setResults([])
      }
    }, 300)
  }, [fetchBooks, filterBooks, initialFetch])

  return {
    searchBooks: debouncedFilter,
    results,
    loading
  }
}
