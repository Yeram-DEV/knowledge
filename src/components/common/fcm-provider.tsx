import { FC, ReactNode, useEffect } from 'react'
import { getToken, onMessage } from '@firebase/messaging'
import { messaging } from '@/libs/firebase/config'

const FCMProvider: FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    const initializeFCM = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
          console.log('Service Worker registered with scope:', registration.scope)
          await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: registration
          })
        } catch (error) {
          console.error('Error during FCM initialization:', error)
        }
      }
    }

    const requestPermission = async () => {
      const status = await Notification.requestPermission()
      if (status === 'granted') {
        console.log('Notification permission granted')
        const token = await messaging.getToken({
          vapidKey: process.env.NEXT_PUBLIC_VAPIDKEY
        })
        console.log('Your token:', token)
      } else {
        console.log('Notification permission denied')
      }
    }

    requestPermission().then((r) => console.log(r))
    initializeFCM().then((r) => console.log(r))

    onMessage(messaging, ({ notification }) => {
      if (Notification.permission === 'granted' && notification?.title && notification?.body) {
        new Notification(notification.title, {
          body: notification.body,
          icon: '/img/yeram.png'
        })
      }
    })
  }, [])

  return <>{children}</>
}

export default FCMProvider
