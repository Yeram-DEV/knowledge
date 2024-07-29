import { createClient } from '@/utils/supabase/server'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { Button } from '@nextui-org/button'
import { ThemeSwitch } from '@/components/button'
import { HeaderDropdownMenu } from './header-dropdown-menu'
import { HeaderNotification } from './header-notification'

export const Header = async () => {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  return (
    <Navbar>
      <NavbarBrand>
        <Link color="foreground" href="/" className="flex gap-2">
          <Image src={`${process.env.NEXT_PUBLIC_SSE}/common/assets/osung.png`} width={24} height={24} alt="logo img" />
          <span className="hidden sm:block">지식센터</span>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center" className="hidden sm:flex">
        <NavbarItem>
          <Link color="foreground" className="gap-2" size="lg" href="/">
            <Icon icon="solar:library-outline" />
            책장
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" className="gap-2" size="lg" href={'/my'}>
            <Icon icon="solar:backpack-outline" />
            MY
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" className="gap-2" size="lg" href={'/'}>
            <Icon icon="solar:lightbulb-linear" />
            <del>공사중</del>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" className="gap-2" size="lg" href={'/'}>
            <Icon icon="solar:chat-dots-outline" />
            <del>공사중</del>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" className="gap-2" size="lg" isExternal href="https://cafe.naver.com/bluezjb3f">
            <Icon icon="solar:tea-cup-outline" />
            카페
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        {user ? <HeaderNotification user={user} /> : null}
        <ThemeSwitch />
        {user ? (
          <HeaderDropdownMenu user={user} />
        ) : (
          <Button as={Link} href={'/login'}>
            로그인
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  )
}
