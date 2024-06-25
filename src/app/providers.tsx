'use client'

import { NextUIProvider } from '@nextui-org/system'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { ReactNode, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/nextjs'
import { koKR } from '@clerk/localizations'
import { getToken, onMessage } from '@firebase/messaging'
import { messaging } from '@/libs/firebase/config'

export interface ProvidersProps {
  children: ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
          console.log('Registration successful, scope is:', registration.scope)
          return registration
        } catch (err) {
          console.log('Service worker registration failed, error:', err)
        }
      }
      return null
    }

    const requestPermission = async (registration) => {
      if (registration) {
        try {
          await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: registration
          })
        } catch (error) {
          console.error('Error getting FCM token:', error)
        }
      }
    }

    const initFCM = async () => {
      const registration = await registerServiceWorker()
      await requestPermission(registration)
    }

    initFCM()

    onMessage(messaging, (payload) => {
      const { title, body } = payload.notification || {}
      if (Notification.permission === 'granted' && title && body) {
        new Notification(title, {
          body,
          icon: '/img/yeram.png'
        })
      }
    })
  }, [])

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
            {children}
          </ClerkProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </QueryClientProvider>
  )
}
