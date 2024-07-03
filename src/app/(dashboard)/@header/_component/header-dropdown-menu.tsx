'use client'

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/dropdown'
import { Button } from '@nextui-org/button'
import { UserIcon } from '@/components/icons'
import { Link } from '@nextui-org/link'
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
        <Button isIconOnly size="sm" variant="light">
          <UserIcon />
        </Button>
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
          <DropdownItem key="my" as={Link} href={'/my'} className="text-foreground">
            MY
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
