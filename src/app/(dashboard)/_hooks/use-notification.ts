import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client.ts'
import { Notifications } from '@/types'

export const useNotification = (user) => {
  const [notifications, setNotifications] = useState<Notifications[]>([])
  const supabase = createClient()

  const fetchNotifications = useCallback(async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_read', false)
      .order('id', { ascending: false })

    if (error) {
      console.log(error)
    } else {
      setNotifications(data)
    }
  }, [supabase, user.id])

  const markAsRead = async (id: number) => {
    const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', id)

    if (error) {
      console.log(error)
    } else {
      setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id))
    }
  }

  useEffect(() => {
    fetchNotifications().then((r) => console.debug(r))
  }, [fetchNotifications])

  return { notifications, markAsRead }
}
