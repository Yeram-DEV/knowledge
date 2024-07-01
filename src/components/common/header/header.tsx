import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'
import { BellIcon } from '@/components/common/icons'
import Image from 'next/image'
import logo from '@public/img/yeram.png'
import { auth } from '@/auth'
import { HeaderProfile } from '@/components/common/header/header-profile'
import { HeaderLink } from '@/components/common/header/header-link'

export const Header = async ({ props }: { props?: any }) => {
  const session = await auth()

  return (
    <Navbar {...props}>
      <NavbarBrand>
        <Link color="foreground" href="/" className="flex gap-2">
          <Image src={logo} width={24} height={24} alt="logo img" />
          지식센터
        </Link>
      </NavbarBrand>
      <HeaderLink />
      <NavbarContent as="div" justify="end">
        <NavbarItem>
          <Button isIconOnly variant="light" onPress={async () => await Notification.requestPermission()}>
            <BellIcon />
          </Button>
        </NavbarItem>
        {session?.user ? (
          <HeaderProfile session={session} />
        ) : (
          <Button as={Link} href={'/login'}>
            로그인
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  )
}
