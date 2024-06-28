import { FC, ReactNode, useEffect } from 'react'
import { getToken, onMessage } from 'firebase/messaging'
import { useSession } from 'next-auth/react'
import { messaging } from '@/libs/firebase/config'

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

      if ('serviceWorker' in navigator && session?.user) {
        try {
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
          console.log('Service Worker registered with scope:', registration.scope)

          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
            serviceWorkerRegistration: registration
          })

          if (token) {
            await fetch('http://localhost:4000/api/notification', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ token, userId: session.user.id, deviceType: 'web' })
            })
          }
        } catch (error) {
          console.error('Error during FCM initialization:', error)
        }
      }
    }

    requestPermissionAndInitializeFCM()

    onMessage(messaging, ({ notification }) => {
      if (Notification.permission === 'granted' && notification?.title && notification?.body) {
        new Notification(notification.title, {
          body: notification.body,
          icon: '/img/yeram.png'
        })
      }
    })
  }, [session])

  return <>{children}</>
}

export default FCMProvider
