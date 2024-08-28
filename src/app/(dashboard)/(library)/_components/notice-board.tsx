'use client'

import { Link } from '@nextui-org/link'
import { getDateDistanceTextToNow } from '@/utils/date'
import { useDisclosure } from '@nextui-org/modal'
import { useState } from 'react'
import { NoticeModal } from './notice-modal'
import { useIsSSR } from '@react-aria/ssr'

export const NoticeBoard = ({ notices }) => {
  const isSSR = useIsSSR()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectedNoticeId, setSelectedNoticeId] = useState(null)

  const handleOpenModal = (id: number) => {
    if (id) {
      setSelectedNoticeId(id)
      onOpen()
    }
  }

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        {notices.length > 0 ? (
          <>
            {notices.map((notice) => (
              <Link
                color="foreground"
                key={`notice-${notice.id}`}
                className="bg-content1 w-full rounded-md flex items-center justify-between p-4 cursor-pointer shadow-md"
                onPress={() => handleOpenModal(notice.id)}
              >
                <span className="w-full text-xl font-bold">{notice.title}</span>
                <span className="w-40 text-sm text-gray-400">
                  {!isSSR && getDateDistanceTextToNow(notice.created_at)}
                </span>
              </Link>
            ))}
          </>
        ) : (
          <span>공지사항 없음</span>
        )}
      </div>
      {selectedNoticeId ? (
        <NoticeModal isOpen={isOpen} onOpenChange={onOpenChange} noticeId={selectedNoticeId} />
      ) : null}
    </>
  )
}
