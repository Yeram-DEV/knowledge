'use client'

import { Button } from '@nextui-org/button'
import { BellIcon } from '@/components/common/icons'

export const NotificationMenu = () => {
  return (
    <Button
      isIconOnly
      variant="light"
      onPress={async () =>
        await Notification.requestPermission()
          .then((permission) => {
            console.log(`Permission: ${permission}`)
          })
          .catch((error) => {
            console.error(`Error: ${error}`)
          })
      }
    >
      <BellIcon />
    </Button>
  )
}
