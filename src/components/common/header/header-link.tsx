'use client'

import { NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { FlashIcon, Home2Icon } from '@/components/common/icons'
import { usePathname } from 'next/navigation'

export const HeaderLink = () => {
  const path = usePathname()

  return (
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link
          href="/"
          className={`text-${path === '/' ? 'default-700' : 'default-500'} flex items-center justify-center gap-2`}
        >
          <Home2Icon />
          책장
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link
          href={'/edu'}
          className={`text-${path === '/edu' ? 'default-700' : 'default-500'} flex items-center justify-center gap-2`}
        >
          <FlashIcon />
          교육
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link
          href={'/nothing'}
          className={`text-${path === '/my' ? 'default-700' : 'default-500'} flex items-center justify-center gap-2`}
        >
          미정
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link
          href={'/nothing'}
          className={`text-${path === '/setting' ? 'default-700' : 'default-500'} flex items-center justify-center gap-2`}
        >
          미정
        </Link>
      </NavbarItem>
    </NavbarContent>
  )
}
