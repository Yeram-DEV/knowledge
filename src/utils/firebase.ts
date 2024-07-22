import { getApp, getApps, initializeApp } from 'firebase/app'
import { getMessaging, getToken, isSupported } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyC92YRoS6ddPq3EMYZFj3VL0cSX66z6ZeU',
  authDomain: 'knowlege-center.firebaseapp.com',
  projectId: 'knowlege-center',
  storageBucket: 'knowlege-center.appspot.com',
  messagingSenderId: '10051724726',
  appId: '1:10051724726:web:d66a2785d29ddb44240d17'
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

const initializeMessaging = async () => {
  const supported = await isSupported()
  return supported ? getMessaging(app) : null
}

export const fetchToken = async () => {
  try {
    const messaging = await initializeMessaging()
    if (messaging) {
      return await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY
      })
    }
    return null
  } catch (err) {
    console.error('토큰을 가져오는 동안 오류가 발생했습니다:', err)
    return null
  }
}

export { app, initializeMessaging }
