'use client'

import { Button } from '@nextui-org/button'
import { FlashIcon, Home2Icon, SettingIcon, UserIcon } from '@/components/common/icons'
import { usePathname } from 'next/navigation'
import { Link } from '@nextui-org/link'

export const Footer = () => {
  const path = usePathname()

  return (
    <div className="sm:hidden w-full fixed bottom-0 border-1 border-divider bg-[#18171c] rounded-t-2xl shadow-sm px-6 pt-4 pb-8 dark">
      <div className="flex items-center justify-evenly overflow-hidden">
        <Button
          isIconOnly
          variant="light"
          aria-label="Home"
          className={`text-${path === '/' ? 'default-700' : 'default-500'} flex flex-col items-center justify-center`}
          size="lg"
          as={Link}
          href={'/'}
        >
          <Home2Icon />
          <span>책장</span>
        </Button>

        <Button
          isIconOnly
          variant="light"
          aria-label="Use"
          className={`text-${path === '/use' ? 'default-700' : 'default-500'} flex flex-col items-center justify-center`}
          size="lg"
          as={Link}
          href={'/use'}
        >
          <FlashIcon />
          <span>이용</span>
        </Button>
        <Button
          isIconOnly
          variant="light"
          aria-label="User"
          className={`text-${path === '/my' ? 'default-700' : 'default-500'} flex flex-col items-center justify-center`}
          size="lg"
          as={Link}
          href={'/my'}
        >
          <UserIcon />
          <span>MY</span>
        </Button>
        <Button
          isIconOnly
          variant="light"
          aria-label="Setting"
          className={`text-${path === '/setting' ? 'default-700' : 'default-500'} flex flex-col items-center justify-center`}
          size="lg"
          as={Link}
          href={'/setting'}
        >
          <SettingIcon />
          <span>설정</span>
        </Button>
      </div>
    </div>
  )
}
