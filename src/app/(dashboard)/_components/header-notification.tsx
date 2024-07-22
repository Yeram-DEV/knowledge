'use client'

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/dropdown'
import { Icon } from '@iconify/react'
import useFcmToken from '@/hooks/use-fcm-token'
import { Button } from '@nextui-org/button'
import { useNotification } from '../_hooks/use-notification'
import { Notifications } from '@/types'
import { kstFormat } from '@/utils/date'

export const HeaderNotification = ({ user }) => {
  const { notificationPermissionStatus } = useFcmToken()
  const { notifications, markAsRead } = useNotification(user)

  const handleNotificationClick = async (id: number) => {
    await markAsRead(id)
  }

  return (
    <>
      {notificationPermissionStatus === 'granted' ? (
        <Dropdown
          classNames={{
            base: 'before:bg-default-200', // change arrow background
            content:
              'py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black'
          }}
        >
          <DropdownTrigger>
            <Button isIconOnly variant="light">
              <Icon icon="solar:bell-outline" width={24} height={24} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" emptyContent={'알림이 없습니다'}>
            {notifications.map((notification: Notifications) => (
              <DropdownSection key={notification.id} showDivider>
                <DropdownItem
                  className="w-full flex flex-col items-start justify-center"
                  onPress={() => handleNotificationClick(notification.id)}
                >
                  <p className="max-w-[200px] whitespace-pre-line break-words text-sm">{notification.body}</p>
                  <span className="text-tiny text-default-500">
                    {kstFormat(new Date(notification.created_at), 'yyyy-MM-dd hh:m:SS')}
                  </span>
                </DropdownItem>
              </DropdownSection>
            ))}
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button
          isIconOnly
          variant="light"
          onPress={async () => {
            const permission = await Notification.requestPermission((res) => res)
            if (permission === 'granted') location.reload()
          }}
        >
          <Icon icon="solar:bell-off-outline" width={24} height={24} />
        </Button>
      )}
    </>
  )
}
