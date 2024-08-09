import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export const useNotification = (token: string) => {
  const [notifications, setNotifications] = useState([])

  const fetchTokenId = useCallback(async () => {
    const { data: tokenData, error: tokenError } = await supabase
      .from('token')
      .select('id')
      .eq('fcm_token', token)
      .maybeSingle()

    if (tokenError) {
      return null
    }

    return tokenData?.id || null
  }, [token])

  const fetchNotifications = useCallback(async (token_id: number | null) => {
    if (!token_id) return

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('is_read', false)
      .eq('token_id', token_id)
      .order('id', { ascending: false })

    if (!error) {
      setNotifications(data)
    } else {
      console.error('Error fetching notifications:', error)
    }
  }, [])

  useEffect(() => {
    const initialize = async () => {
      const token_id = await fetchTokenId()
      await fetchNotifications(token_id)

      if (token_id) {
        const channel = supabase
          .channel('public:notifications')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'notifications',
              filter: `token_id=eq.${token_id}`
            },
            (payload) => {
              if (payload.eventType === 'INSERT') {
                setNotifications((prev) => [payload.new, ...prev])
              } else if (payload.eventType === 'UPDATE') {
                setNotifications((prev) =>
                  prev.map((notification) => (notification.id === payload.new.id ? payload.new : notification))
                )
              } else if (payload.eventType === 'DELETE') {
                setNotifications((prev) => prev.filter((notification) => notification.id !== payload.old.id))
              }
            }
          )
          .subscribe()

        return () => {
          supabase.removeChannel(channel)
        }
      }
    }

    initialize().then()
  }, [fetchNotifications, fetchTokenId])

  const markAsRead = async (id: number) => {
    const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', id)

    if (!error) {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    } else {
      console.error('Error marking notification as read:', error)
    }
  }

  return { notifications, markAsRead }
}
