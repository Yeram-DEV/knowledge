import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@nextui-org/button'
import { HeaderDropdownMenu } from './_component'

export default async function HeaderPage() {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  return (
    <Navbar>
      <NavbarBrand>
        <Link color="foreground" href="/" className="flex gap-2">
          <Image src="https://static.yeram.co.kr/etc/yeram.png" width={24} height={24} alt="logo img" />
          지식센터
        </Link>
      </NavbarBrand>
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
