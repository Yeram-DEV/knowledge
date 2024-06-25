'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'
import { BellIcon, FlashIcon, Home2Icon, SettingIcon, UserIcon } from '@/components/common/icons'
import Image from 'next/image'
import logo from '@public/img/yeram.png'
import { usePathname } from 'next/navigation'
import { ThemeSwitch } from '@/components/common/theme-switch'
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import { Avatar } from '@nextui-org/avatar'

export const Header = ({ props }: { props?: any }) => {
  const path = usePathname()

  const { isSignedIn, user } = useUser()

  return (
    <Navbar {...props}>
      <NavbarBrand>
        <Link color="foreground" href="/" className="flex gap-2">
          <Image src={logo} width={24} height={24} alt="logo img" />
          지식센터
        </Link>
      </NavbarBrand>
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
            <BellIcon />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          {isSignedIn ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar isBordered as="button" name={user.fullName} size="sm" src={user.imageUrl} />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">{user.fullName}</p>
                  <p className="font-semibold">{user.emailAddresses.join(', ')}</p>
                </DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem key="settings">설정</DropdownItem>
                <DropdownItem key="logout" color="danger">
                  <SignOutButton>로그아웃</SignOutButton>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <SignInButton>
              <Button variant="flat">로그인</Button>
            </SignInButton>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
