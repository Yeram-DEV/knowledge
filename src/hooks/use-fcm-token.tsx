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

  console.log('알림 권한이 부여되지 않았습니다.')
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
    console.log('No user is logged in.')
    return
  }

  const device = getDeviceType()

  const { data: existingTokens, error: selectError } = await supabase
    .from('token')
    .select('id')
    .eq('user_id', user.id)
    .eq('fcm_token', fcmToken)
    .eq('device', device)

  if (selectError) {
    console.error('Error checking existing tokens:', selectError)
    return
  }

  if (existingTokens && existingTokens.length > 0) {
    console.log('Token already exists. Skipping insert.')
    return
  }

  const { error } = await supabase.from('token').insert([{ user_id: user.id, fcm_token: fcmToken, device: device }])

  if (error) {
    console.error('Error inserting FCM token:', error)
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
      console.info('%c푸시 알림 문제 - 권한 거부됨', 'color: green; background: #c7c7c7; padding: 8px; font-size: 20px')
      isLoading.current = false
      return
    }

    if (!token) {
      if (retryLoadToken.current >= 3) {
        alert('토큰을 로드할 수 없습니다. 브라우저를 새로고침하세요.')
        console.info(
          '%c푸시 알림 문제 - 3회 시도 후에도 토큰을 로드할 수 없음',
          'color: green; background: #c7c7c7; padding: 8px; font-size: 20px'
        )
        isLoading.current = false
        return
      }

      retryLoadToken.current += 1
      console.error('토큰을 가져오는 동안 오류가 발생했습니다. 다시 시도합니다...')
      isLoading.current = false
      await loadToken()
      return
    }

    setNotificationPermissionStatus(Notification.permission)
    setToken(token)
    isLoading.current = false

    // 토큰 저장
    await saveFcmToken(token)
  }, [])

  useEffect(() => {
    if ('Notification' in window) {
      loadToken().then((r) => console.debug(r))
    }
  }, [loadToken])

  useEffect(() => {
    const setupListener = async () => {
      if (!token) return

      console.log(`onMessage가 토큰 ${token}으로 등록되었습니다.`)
      const messaging = await initializeMessaging()
      if (!messaging) return

      return onMessage(messaging, (payload) => {
        if (Notification.permission !== 'granted') return

        console.log('포그라운드 푸시 알림 수신:', payload)
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
          } else {
            console.log('알림 페이로드에서 링크를 찾을 수 없습니다.')
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
