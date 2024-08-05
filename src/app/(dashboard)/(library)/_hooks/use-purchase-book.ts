import { createClient } from '@/utils/supabase/client'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { addDays } from 'date-fns'

const usePurchaseBook = () => {
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)

  const handlePurchaseRequest = useCallback(
    async (linkValue, titleValue, purposeValue) => {
      if (!linkValue || !titleValue || !purposeValue) {
        toast.error('아래 형식에 필수 값을 입력해주세요')
        return false
      }

      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) {
        toast.error('사용자 인증에 실패했습니다. 다시 시도해주세요.')
        return false
      }

      setIsLoading(true)

      try {
        const oneWeekAgo = addDays(new Date(), -7).toISOString()

        const { data: existingRequests, error: fetchError } = await supabase
          .from('purchase_requests')
          .select('id')
          .eq('user_id', user.id)
          .gte('request_date', oneWeekAgo)

        if (fetchError) {
          toast.error('구매신청을 확인하는 과정에 오류가 발생하였습니다.')
          return false
        }

        if (existingRequests.length > 0) {
          toast.error('1주일 이내에 이미 신청한 기록이 있습니다.\n구매절차 내용을 확인해주세요')
          return false
        }

        const { error: insertError } = await supabase.from('purchase_requests').insert([
          {
            purchase_link: linkValue,
            title: titleValue,
            purpose: purposeValue,
            user_id: user.id
          }
        ])

        if (insertError) {
          toast.error('구매신청 과정에 오류가 발생하였습니다.')
          return false
        }

        toast.success('구매신청이 되었습니다. 빠른 시간 내에 연락드리겠습니다.')
        return true
      } catch (error) {
        toast.error(error.message)
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [supabase]
  )

  return {
    handlePurchaseRequest,
    isLoading
  }
}

export default usePurchaseBook
