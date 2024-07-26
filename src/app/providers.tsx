'use client'

import { NextUIProvider } from '@nextui-org/system'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { ReactNode, useEffect } from 'react'
import { Toaster } from 'sonner'

export interface ProvidersProps {
  children: ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()

  useEffect(() => {
    registerServiceWorker()
  }, [])

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <Toaster position="top-center" richColors closeButton />
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}

const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker 등록 성공:', registration)
        })
        .catch((error) => {
          console.log('Service Worker 등록 실패:', error)
        })
    })
  }
}
