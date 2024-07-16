'use client'

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/dropdown'
import { Link } from '@nextui-org/link'
import { Avatar } from '@nextui-org/avatar'
import { User } from '@supabase/auth-js'
import { createClient } from '@/utils/supabase/client'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export const HeaderDropdownMenu = ({ user }: { user: User }) => {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut()
    router.refresh()
  }, [router, supabase.auth])

  return (
    <Dropdown
      classNames={{
        base: 'before:bg-default-200', // change arrow background
        content:
          'py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black'
      }}
    >
      <DropdownTrigger>
        <Avatar as="button" size="sm" className="transition-transform" src={user.user_metadata.avatar_url} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownSection showDivider>
          <DropdownItem key="profile">
            <p>{user.email}</p>
            <p>{user.user_metadata.name}</p>
          </DropdownItem>
          <DropdownItem key="alarm" onPress={async () => await Notification.requestPermission()}>
            알림
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider>
          <DropdownItem key="help_and_feedback">도움 & 피드백</DropdownItem>
          {user.user_metadata.role === 'ADMIN' ? (
            <DropdownItem key="admin" as={Link} href={'/admin/books'} className="text-foreground">
              관리자 페이지
            </DropdownItem>
          ) : null}
          <DropdownItem key="account" as={Link} href={'/account'} className="text-foreground">
            계정
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem key="logout" color="danger" onPress={handleLogout}>
            로그아웃
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}