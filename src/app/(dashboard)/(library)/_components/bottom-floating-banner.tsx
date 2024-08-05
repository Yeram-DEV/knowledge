'use client'

import { Button } from '@nextui-org/button'
import { Icon } from '@iconify/react'
import { useMediaQuery } from '@/hooks'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@nextui-org/use-disclosure'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover'
import { Link } from '@nextui-org/link'
import { Yes24Icon } from '@/components/icons'
import { Input } from '@nextui-org/input'
import { isMacOs, isWindows } from 'react-device-detect'
import usePurchaseBook from '../_hooks/use-purchase-book'

export const BottomFloatingBanner = () => {
  const { isLoading, handlePurchaseRequest } = usePurchaseBook()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const [isMounted, setIsMounted] = useState(false)
  const [linkValue, setLinkValue] = useState('')
  const [titleValue, setTitleValue] = useState('')
  const [purposeValue, setPurposeValue] = useState('')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <div className="z-30 fixed inset-x-0 bottom-24 sm:bottom-0 w-full px-2 pb-2 flex justify-end sm:justify-center sm:px-4 sm:pb-4 lg:px-8">
        <Button
          size={isDesktop ? 'lg' : 'md'}
          className="flex items-center gap-x-3 rounded-large border-1 border-divider bg-gradient-to-r from-default-100 via-danger-100 to-secondary-100"
          onPress={onOpen}
        >
          <p className="text-small text-foreground">{isDesktop ? '새로운 도서 구매 신청하기' : '도서구매 신청'}</p>
          <Icon icon="solar:cart-large-2-outline" width={24} />
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">지식센터 도서 구매 신청</ModalHeader>
              <ModalBody>
                <div className="w-full flex flex-col items-start justify-start gap-4">
                  <Button
                    variant="flat"
                    color="success"
                    as={Link}
                    href={isWindows || isMacOs ? 'https://yes24.com' : 'https://m.yes24.com'}
                    isExternal
                    endContent={<Yes24Icon />}
                  >
                    책 찾아보기
                  </Button>
                  <div className="w-full flex items-center justify-start gap-2">
                    <Popover color="primary">
                      <PopoverTrigger>
                        <Button fullWidth variant="bordered">
                          구매 절차
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="w-full flex flex-col items-start justify-center gap-2 p-3">
                          <span className="font-bold">1. 신청한 도서를 기준으로 매주 수요일 일괄 구매 신청</span>
                          <span className="text-tiny">- 1주에 한 권만 구매 가능</span>
                          <span className="font-bold">2. 검수 담당자 책 검토 진행</span>
                          <span className="font-bold">3. 검수 완료 후 책 구매 진행</span>
                          <span className="font-bold">4. 구매 완료 후 요청자에게 전달</span>
                          <span className="text-tiny">- 전달한 날짜를 대여날로 지정</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Popover color="primary">
                      <PopoverTrigger>
                        <Button fullWidth variant="bordered">
                          승인 기준
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="w-full flex flex-col items-start justify-center gap-2 p-3">
                          <span className="font-bold">1. 소장도서 및 중복신청도서, 구입 중, 품절, 절판도서</span>
                          <span className="font-bold">
                            2. 도서관에 이미 유사한 내용의 자료가 다수 소장되어 있는 경우
                          </span>
                          <span className="font-bold">3. 신판이 출판된 구판도서, 미출간된 도서</span>
                          <span className="font-bold">4. 고가도서(30,000원 이상) 및 희귀도서</span>
                          <span className="font-bold">
                            5. 서지정보 불명 도서(서명, 저자명, 출판사명 등의 정보 부정확)
                          </span>
                          <span className="font-black mt-4">※ 특이사항</span>
                          <span>- 자기개발 서적의 경우 본인 업무와 관련된 서적은 구매 가능</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Popover color="primary">
                      <PopoverTrigger>
                        <Button fullWidth variant="bordered">
                          장르 기준
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="w-full flex flex-col items-start justify-center gap-2 p-3">
                          <span>가정</span>
                          <span>건강 취미</span>
                          <span>경제 경영</span>
                          <span>사회 정치</span>
                          <span>소설, 시, 희곡</span>
                          <span>에세이</span>
                          <span>여행</span>
                          <span>역사</span>
                          <span>예술</span>
                          <span>인문</span>
                          <span>자기계발</span>
                          <span>자연과학</span>
                          <span>종교</span>
                          <span>IT 모바일</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-2">
                  <Input label="구매링크" value={linkValue} onValueChange={setLinkValue} isRequired />
                  <Input label="도서명" value={titleValue} onValueChange={setTitleValue} isRequired />
                  <Input label="구매목적" value={purposeValue} onValueChange={setPurposeValue} isRequired />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  fullWidth
                  color="primary"
                  onPress={() => {
                    handlePurchaseRequest(linkValue, titleValue, purposeValue).then((success) => {
                      if (success) {
                        setLinkValue('')
                        setTitleValue('')
                        setPurposeValue('')
                        onClose()
                      }
                    })
                  }}
                  isLoading={isLoading}
                >
                  신청하기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
