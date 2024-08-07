import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'
import useFcmToken from '@/hooks/use-fcm-token'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const useNotification = (user) => {
  const [notifications, setNotifications] = useState([])
  const { token } = useFcmToken()

  const fetchNotifications = useCallback(async () => {
    const { data: tokenData } = await supabase.from('token').select('*').eq('fcm_token', token).maybeSingle()

    if (tokenData?.id) {
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
  }, [token, user.id])

  useEffect(() => {
    fetchNotifications().then()

    const channel = supabase
      .channel('public:notifications')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setNotifications((prev) => [payload.new, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setNotifications((prev) =>
            prev.map((notification) => (notification.id === payload.new.id ? payload.new : notification))
          )
        } else if (payload.eventType === 'DELETE') {
          setNotifications((prev) => prev.filter((notification) => notification.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel).then()
    }
  }, [fetchNotifications])

  const markAsRead = async (id) => {
    const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', id)

    if (!error) {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    }
  }

  return { notifications, markAsRead }
}
