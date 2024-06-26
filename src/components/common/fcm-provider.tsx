import { FC, ReactNode, useEffect } from 'react'
import { messaging } from '@/libs/firebase/config'

const FCMProvider: FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
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

    const onMessageListener = (message: any) => {
      console.log('New message received 접속중:', message)
      new Notification(message.title, {
        body: message.body,
        icon: '/img/yeram.png'
      })
    }

    messaging.onMessage(onMessageListener)
  }, [])

  return <>{children}</>
}

export default FCMProvider
