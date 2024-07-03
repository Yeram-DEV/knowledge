'use client'

import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { Icon } from '@iconify/react'
import { useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export const SidebarFooter = () => {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut()
    router.refresh()
  }, [router, supabase.auth])

  return (
    <>
      <Button
        as={Link}
        href="/"
        size="lg"
        color="success"
        variant="light"
        className="justify-start"
        startContent={<Icon icon="solar:round-arrow-left-outline" width={24} height={24} />}
      >
        나가기
      </Button>
      <Button
        size="lg"
        color="danger"
        variant="light"
        className="justify-start"
        startContent={<Icon icon="solar:minus-circle-outline" width={24} height={24} />}
        onPress={handleLogout}
      >
        로그아웃
      </Button>
    </>
  )
}
