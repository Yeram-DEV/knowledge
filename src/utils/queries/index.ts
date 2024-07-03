'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useUpdateQueryString = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const updateQueryString = (name: string, value: string) => {
    const newQueryString = createQueryString(name, value)
    router.push(`${pathname}?${newQueryString}`, { scroll: true })
  }

  return { updateQueryString }
}
