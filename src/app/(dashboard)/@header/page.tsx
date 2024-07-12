import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@nextui-org/button'
import { HeaderDropdownMenu } from './_component'
import { Icon } from '@iconify/react'

export default async function HeaderPage() {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  return (
    <Navbar>
      <NavbarBrand>
        <Link color="foreground" href="/" className="flex gap-2">
          <Image src={`${process.env.NEXT_PUBLIC_SSE}/common/assets/yeram.png`} width={24} height={24} alt="logo img" />
          <span className="hidden sm:block">지식센터</span>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Link color="foreground" className="gap-2" size="lg" href="/">
            <Icon icon="solar:library-outline" width={28} height={28} className="hidden sm:block" />
            책장
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" className="gap-2" size="lg" href={'/knowledge'}>
            <Icon icon="solar:lightbulb-linear" width={28} height={28} className="hidden sm:block" />
            지식
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" className="gap-2" size="lg" href={'/my'}>
            <Icon icon="solar:backpack-outline" width={28} height={28} className="hidden sm:block" />
            MY
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
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
