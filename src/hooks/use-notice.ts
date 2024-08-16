import { useQuery } from '@tanstack/react-query'
import { getNotice } from '@/api'

export const useNoticeDetail = (noticeId: number) => {
  return useQuery({
    queryKey: ['notice', noticeId],
    queryFn: () => getNotice(noticeId)
  })
}
