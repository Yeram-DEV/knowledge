import { FC, ReactNode, useEffect } from 'react'
import { getToken, onMessage } from 'firebase/messaging'
import { useSession } from 'next-auth/react'
import { messaging } from '@/libs/firebase/config'
import { toast } from 'sonner'

const getDeviceType = (): string => {
  const ua = navigator.userAgent
  if (/Mobile|Android|iP(hone|od)/i.test(ua)) {
    return 'mobile'
  }
  if (/iPad|Tablet/i.test(ua)) {
    return 'tablet'
  }
  return 'desktop'
}

const FCMProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session } = useSession()

  useEffect(() => {
    const requestPermissionAndInitializeFCM = async () => {
      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission()
        if (permission !== 'granted') {
          console.log('Notification permission denied')
          return
        }
      }

      if (session?.user) {
        try {
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
          console.log('Service Worker registered with scope:', registration.scope)

          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
            serviceWorkerRegistration: registration
          })

          const deviceType = getDeviceType()

          if (token) {
            await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/notification`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ token, userId: session.user.id, deviceType })
            })
          }
        } catch (error) {
          console.error('Error during FCM initialization:', error)
        }
      }
    }

    requestPermissionAndInitializeFCM().then((r) => console.log(r))

    onMessage(messaging, ({ data }) => {
      if (Notification.permission === 'granted' && data?.title && data?.body) {
        toast.message(data.body)
      }
    })
  }, [session])

  return <>{children}</>
}

export default FCMProvider
