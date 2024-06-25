'use client'

import { NextUIProvider } from '@nextui-org/system'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/nextjs'
import { koKR } from '@clerk/localizations'
import FCMProvider from '@/components/common/fcm-provider'

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
          <ClerkProvider
            localization={koKR}
            appearance={{
              elements: {
                footer: 'hidden'
              }
            }}
          >
            <FCMProvider>{children}</FCMProvider>
          </ClerkProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </QueryClientProvider>
  )
}
