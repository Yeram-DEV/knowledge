'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { onMessage, Unsubscribe } from 'firebase/messaging'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { fetchToken, initializeMessaging } from '@/utils/firebase'
import { isAndroid, isIOS, isMacOs, isWindows } from 'react-device-detect'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

async function getNotificationPermissionAndToken() {
  if (!('Notification' in window)) {
    console.info('이 브라우저는 데스크탑 알림을 지원하지 않습니다.')
    return null
  }

  if (Notification.permission === 'granted') {
    return await fetchToken()
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      return await fetchToken()
    }
  }

  return null
}

const getDeviceType = () => {
  if (isAndroid) return 'android'
  if (isIOS) return 'ios'
  if (isMacOs) return 'mac'
  if (isWindows) return 'windows'
  return 'web'
}

const saveFcmToken = async (fcmToken: string) => {
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return
  }

  const device = getDeviceType()
  const { data: existingTokens } = await supabase.from('token').select('id').eq('user_id', user.id).eq('device', device)
  if (existingTokens && existingTokens.length > 0) {
    await supabase.from('token').update({ fcm_token: fcmToken }).eq('id', existingTokens[0].id)
  } else {
    await supabase.from('token').insert([{ user_id: user.id, fcm_token: fcmToken, device }])
  }
}

const useFcmToken = () => {
  const router = useRouter()
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<NotificationPermission | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const retryLoadToken = useRef(0)
  const isLoading = useRef(false)

  const loadToken = useCallback(async () => {
    if (isLoading.current) return

    isLoading.current = true
    const token = await getNotificationPermissionAndToken()

    if (Notification.permission === 'denied') {
      setNotificationPermissionStatus('denied')
      isLoading.current = false
      return
    }

    if (!token) {
      if (retryLoadToken.current >= 3) {
        isLoading.current = false
        return
      }

      retryLoadToken.current += 1
      isLoading.current = false
      await loadToken()
      return
    }

    setNotificationPermissionStatus(Notification.permission)
    setToken(token)
    isLoading.current = false

    await saveFcmToken(token)
  }, [])

  useEffect(() => {
    if ('Notification' in window) {
      loadToken().then(() => {})
    }
  }, [loadToken])

  useEffect(() => {
    const setupListener = async () => {
      if (!token) return

      const messaging = await initializeMessaging()
      if (!messaging) return

      return onMessage(messaging, (payload) => {
        if (Notification.permission !== 'granted') return

        const link = payload.fcmOptions?.link || payload.data?.link

        if (link) {
          toast.info(`${payload.notification?.title}: ${payload.notification?.body}`, {
            duration: Infinity,
            action: {
              label: 'Visit',
              onClick: () => {
                const link = payload.fcmOptions?.link || payload.data?.link
                if (link) {
                  router.push(link)
                }
              }
            }
          })
        } else {
          toast.info(`${payload.notification?.title}: ${payload.notification?.body}`)
        }

        const n = new Notification(payload.notification?.title || '새 메시지', {
          body: payload.notification?.body || '이것은 새 메시지입니다',
          data: link ? { url: link } : undefined
        })

        n.onclick = (event) => {
          event.preventDefault()
          const link = (event.target as any)?.data?.url
          if (link) {
            router.push(link)
          }
        }
      })
    }

    let unsubscribe: Unsubscribe | null = null

    setupListener().then((unsub) => {
      if (unsub) {
        unsubscribe = unsub
      }
    })

    return () => unsubscribe?.()
  }, [token, router])

  return { token, notificationPermissionStatus }
}

export default useFcmToken
