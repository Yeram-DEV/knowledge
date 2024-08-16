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
      scrollBehavior="inside"
      classNames={{
        base: [
          'border-small',
          'dark:border-default-100',
          'supports-[backdrop-filter]:bg-background/30',
          'supports-[backdrop-filter]:backdrop-blur-md',
          'supports-[backdrop-filter]:backdrop-saturate-150'
        ]
      }}
    >
      <ModalContent>
        {isLoading || !notice ? (
          <ModalBody className="w-full flex items-center justify-center">
            <Spinner size="lg" />
          </ModalBody>
        ) : (
          <>
            <ModalHeader className="px-16 py-8">
              <span className="font-black text-3xl">{notice.title}</span>
            </ModalHeader>
            <ModalBody
              className="relative w-full !h-dvh !max-w-full prose dark:prose-invert px-2 sm:px-12 py-4"
              dangerouslySetInnerHTML={{ __html: notice.content }}
            ></ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
