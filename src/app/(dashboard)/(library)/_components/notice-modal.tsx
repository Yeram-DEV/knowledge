'use client'

import { Modal, ModalBody, ModalContent, ModalHeader, Spinner } from '@nextui-org/react'
import { useNoticeDetail } from '@/hooks/use-notice'

export const NoticeModal = ({ isOpen, onOpenChange, noticeId }) => {
  const { data: notice, isLoading } = useNoticeDetail(noticeId)

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      placement="top-center"
      scrollBehavior="inside"
      className="dark:bg-[#282b30]"
    >
      <ModalContent>
        {isLoading || !notice ? (
          <ModalBody className="w-full flex items-center justify-center">
            <Spinner size="lg" />
          </ModalBody>
        ) : (
          <>
            <ModalHeader className="sm:px-16 py-8">
              <span className="font-black text-3xl">{notice.title}</span>
            </ModalHeader>
            <ModalBody
              className="relative w-full !h-dvh !max-w-full prose dark:prose-invert px-4 sm:px-12 pt-4 pb-12"
              dangerouslySetInnerHTML={{ __html: notice.content }}
            ></ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
