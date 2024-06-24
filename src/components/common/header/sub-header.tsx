'use client'

import { Navbar, NavbarBrand } from '@nextui-org/navbar'
import { ArrowLeftIcon } from '@/components/common/icons'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'

export const SubHeader = ({ props }: { props?: any }) => {
  const router = useRouter()
  return (
    <Navbar {...props}>
      <NavbarBrand>
        <Button isIconOnly variant="light" onPress={() => router.back()}>
          <ArrowLeftIcon />
        </Button>
      </NavbarBrand>
    </Navbar>
  )
}
