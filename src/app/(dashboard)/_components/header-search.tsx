'use client'

import { useState } from 'react'
import { Button } from '@nextui-org/button'
import { Icon } from '@iconify/react'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal'
import { Input } from '@nextui-org/input'
import { useDisclosure } from '@nextui-org/use-disclosure'
import { useBookSearch } from '../_hooks'
import { Spinner } from '@nextui-org/spinner'
import Image from 'next/image'
import { Card, CardBody } from '@nextui-org/card'
import { useRouter } from 'next/navigation'

export const HeaderSearch = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { searchBooks, results, loading } = useBookSearch()
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleValueChange = (value: string) => {
    setQuery(value)
    searchBooks(value)
  }

  return (
    <>
      <Button isIconOnly variant="light" onClick={onOpen}>
        <Icon icon="solar:minimalistic-magnifer-outline" width={24} height={24} />
      </Button>
      <Modal
        hideCloseButton
        classNames={{
          base: [
            'border-small',
            'dark:border-default-100',
            'supports-[backdrop-filter]:bg-background/30',
            'supports-[backdrop-filter]:backdrop-blur-md',
            'supports-[backdrop-filter]:backdrop-saturate-150'
          ]
        }}
        size="2xl"
        placement="top-center"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>
            <Input
              fullWidth
              size="lg"
              variant="underlined"
              placeholder="도서 검색"
              startContent={<Icon icon="solar:minimalistic-magnifer-outline" width={24} height={24} />}
              value={query}
              onValueChange={handleValueChange}
            />
          </ModalHeader>
          <ModalBody className="px-4 mt-2 pb-4 overflow-y-auto sm:max-h-[50vh]">
            {loading ? (
              <div className="w-full h-32 flex items-center justify-center">
                <Spinner size="lg" />
              </div>
            ) : results.length > 0 ? (
              results.map((book) => (
                <Card
                  fullWidth
                  key={`${book.id}-search-book`}
                  isBlurred
                  isHoverable
                  isPressable
                  shadow="sm"
                  onPress={() => {
                    router.push(`/book/${book.id}`)
                    onClose()
                  }}
                  className="flex min-h-36"
                >
                  <CardBody className="relative w-full flex flex-row items-center justify-start gap-8">
                    <Image src={book.book_details.at(0).cover_image_url} alt={book.book_name} width={80} height={140} />
                    <div className="max-w-[80%] flex flex-col gpa-0 justify-center">
                      <span className="line-clamp-1 sm:text-2xl font-bold">{book.book_name}</span>
                      <p className="truncate text-default-500 group-data-[active=true]:text-primary-foreground select-none">
                        {book.author}
                      </p>
                      <p className="truncate text-default-500 group-data-[active=true]:text-primary-foreground select-none">
                        {book.publisher}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))
            ) : (
              <div className="w-full h-32 flex items-center justify-center">
                <span className="text-default-500">조회된 결과가 없습니다.</span>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
