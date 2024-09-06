'use client'

import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { NextUIProvider } from '@nextui-org/system'
import { useRouter } from 'next/navigation'
import { Toaster } from 'sonner'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export interface ProvidersProps {
  children: ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
          <Toaster position="top-center" richColors closeButton />
          {children}
        </NextThemesProvider>
      </NextUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
