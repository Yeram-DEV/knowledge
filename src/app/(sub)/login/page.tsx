import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { SubHeader } from '@/components/common'
import { signInWithGoogle, signInWithKakao, signInWithNaver } from '@/hooks/server-action/auth'
import { GoogleIcon, KakaoIcon, NaverIcon } from '@/components/common/icons'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="w-full h-[100dvh] flex flex-col">
      <SubHeader props={{ className: '!fixed backdrop-blur-sm bg-background/0 sm:hidden' }} />
      <div className="w-full h-full flex flex-col items-center justify-center bg-cartoon-pattern bg-no-repeat bg-cover bg-top">
        <Card
          className="w-full md:w-[528px] p-[16px] md:px-[48px] md:py-[64px] bg-transparent md:bg-content1"
          shadow="none"
        >
          <CardHeader className="w-full flex flex-col items-center justify-center gap-2">
            <Image
              src="https://static.yeram.co.kr/knowledge/book/assets/yeram.png"
              alt="Logo"
              width={130}
              height={120}
              priority
            />
            <span>지식센터</span>
            <div className="whitespace-pre-line word-break font-bold text-center text-2xl my-5">오성인을 지혜롭게</div>
          </CardHeader>
          <CardBody className="w-full flex flex-col items-center justify-center gap-4">
            <form className="w-full" action={signInWithGoogle}>
              <Button fullWidth size="lg" type="submit" startContent={<GoogleIcon />}>
                구글
              </Button>
            </form>
            <form className="w-full" action={signInWithNaver}>
              <Button fullWidth size="lg" color="success" type="submit" startContent={<NaverIcon />}>
                네이버
              </Button>
            </form>
            <form className="w-full" action={signInWithKakao}>
              <Button fullWidth size="lg" color="warning" type="submit" startContent={<KakaoIcon />}>
                카카오
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
