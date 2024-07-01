'use client'

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/dropdown'
import { Link } from '@nextui-org/link'
import { signOut } from 'next-auth/react'
import { UserIcon } from '@/components/common/icons'
import { Button } from '@nextui-org/button'

export const HeaderProfile = ({ session }) => {
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
            <p>{session.user.email}</p>
            <p>{session.user.name}</p>
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
          <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
            로그아웃
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
