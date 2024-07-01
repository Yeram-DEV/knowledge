'use client'

import { FlashIcon, Home2Icon } from '@/components/common/icons'
import { usePathname } from 'next/navigation'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'

export const Footer = () => {
  const path = usePathname()

  return (
    <div className="sm:hidden w-full fixed bottom-0 border-1 border-divider bg-[#18171c] rounded-t-2xl shadow-sm px-6 py-4 dark z-50">
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
          className={`text-${path === '/edu' ? 'default-700' : 'default-500'} flex flex-col items-center justify-center`}
          size="lg"
          as={Link}
          href={'/edu'}
        >
          <FlashIcon />
          <span>교육</span>
        </Button>
        <Button
          isIconOnly
          variant="light"
          aria-label="User"
          className={`text-${path === '/nothing' ? 'default-700' : 'default-500'} flex flex-col items-center justify-center`}
          size="lg"
          as={Link}
          href={'/my'}
        >
          <span>미정</span>
        </Button>
        <Button
          isIconOnly
          variant="light"
          aria-label="Setting"
          className={`text-${path === '/nothing' ? 'default-700' : 'default-500'} flex flex-col items-center justify-center`}
          size="lg"
          as={Link}
          href={'/setting'}
        >
          <span>미정</span>
        </Button>
      </div>
    </div>
  )
}
