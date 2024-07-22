'use client'

import { usePathname } from 'next/navigation'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { Icon } from '@iconify/react'

export const Footer = () => {
  const path = usePathname()

  return (
    <div className="sm:hidden w-full fixed bottom-0 border-1 border-divider bg-default-50 rounded-t-2xl shadow-sm px-6 pt-4 pb-6 z-50">
      <div className="flex items-center justify-evenly overflow-hidden">
        <Button
          isIconOnly
          variant="light"
          aria-label="Use"
          className={`text-${path === '/knowledge' ? 'default-900' : 'default-500'} flex flex-col items-center justify-center`}
          size="lg"
          as={Link}
          href={'/knowledge'}
        >
          <Icon icon="solar:lightbulb-linear" width={28} height={28} />
          <span>지식</span>
        </Button>
        <Button
          isIconOnly
          variant="light"
          aria-label="User"
          className={`text-${path === '/nothing' ? 'default-900' : 'default-500'} flex flex-col items-center justify-center`}
          size="lg"
          as={Link}
          href="/community"
        >
          <Icon icon="solar:chat-dots-outline" width={28} height={28} />
          <span>커뮤</span>
        </Button>
        <Button
          isIconOnly
          variant="light"
          aria-label="Home"
          className={`text-${path === '/' ? 'default-900' : 'default-500'} flex flex-col items-center justify-center`}
          size="lg"
          as={Link}
          href={'/'}
        >
          <Icon icon="solar:library-outline" width={28} height={28} />
          <span>책장</span>
        </Button>
        <Button
          isIconOnly
          variant="light"
          aria-label="User"
          className={`text-${path === '/my' ? 'default-900' : 'default-500'} flex flex-col items-center justify-center`}
          size="lg"
          as={Link}
          href={'/my'}
        >
          <Icon icon="solar:backpack-outline" width={28} height={28} />
          <span>MY</span>
        </Button>
        <Button
          isIconOnly
          isExternal
          variant="light"
          aria-label="User"
          className={`text-${path === '/nothing' ? 'default-900' : 'default-500'} flex flex-col items-center justify-center`}
          size="lg"
          as={Link}
          href="https://cafe.naver.com/bluezjb3f?iframe_url=/ArticleList.nhn%3Fsearch.clubid=31169771%26search.menuid=41%26search.boardtype=L"
        >
          <Icon icon="solar:tea-cup-outline" width={28} height={28} />
          <span>카페</span>
        </Button>
      </div>
    </div>
  )
}
