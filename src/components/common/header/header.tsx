'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'
import {
  BellIcon,
  FlashIcon,
  HeartFilledIcon,
  Home2Icon,
  SearchIcon,
  SettingIcon,
  UserIcon
} from '@/components/common/icons'
import Image from 'next/image'
import logo from '@public/img/yeram.png'
import { usePathname } from 'next/navigation'
import { ThemeSwitch } from '@/components/common/theme-switch'

export const Header = ({ props }: { props?: any }) => {
  const path = usePathname()

  return (
    <Navbar {...props}>
      <NavbarBrand>
        <Link color="foreground" href="/public" className="flex gap-2">
          <Image src={logo} width={24} height={24} alt="logo img" />
          지식센터
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            href="/public"
            className={`text-${path === '/' ? 'default-700' : 'default-500'} flex items-center justify-center gap-2`}
          >
            <Home2Icon />
            책장
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href={'/use'}
            className={`text-${path === '/use' ? 'default-700' : 'default-500'} flex items-center justify-center gap-2`}
          >
            <FlashIcon />
            이용
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href={'/my'}
            className={`text-${path === '/my' ? 'default-700' : 'default-500'} flex items-center justify-center gap-2`}
          >
            <UserIcon />
            MY
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href={'/setting'}
            className={`text-${path === '/setting' ? 'default-700' : 'default-500'} flex items-center justify-center gap-2`}
          >
            <SettingIcon />
            설정
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button isIconOnly variant="light">
            <SearchIcon />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly variant="light">
            <BellIcon />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
