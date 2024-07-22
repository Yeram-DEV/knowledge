import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Notifications } from '@/types'
import useFcmToken from '@/hooks/use-fcm-token'

export const useNotification = (user) => {
  const [notifications, setNotifications] = useState<Notifications[]>([])
  const supabase = createClient()
  const { token } = useFcmToken()
  const fetchNotifications = useCallback(async () => {
    const { data: tokenData } = await supabase.from('token').select('*').eq('fcm_token', token).maybeSingle()

    if (tokenData?.id != null) {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_read', false)
        .eq('token_id', tokenData.id)
        .order('id', { ascending: false })

      if (!error) {
        setNotifications(data)
      }
    }
  }, [supabase, token, user.id])

  const markAsRead = async (id: number) => {
    const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', id)

    if (!error) {
      setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id))
    }
  }

  useEffect(() => {
    fetchNotifications().then(() => {})
  }, [fetchNotifications])

  return { notifications, markAsRead }
}
