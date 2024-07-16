'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/client'
import { Icon } from '@iconify/react'

export default function LoginPage() {
  const supabase = createClient()

  async function handleSignInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  async function handleSignInWithKakao() {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  return (
    <div className="w-full h-[100dvh] flex flex-col">
      <div className="w-full h-full flex flex-col items-center justify-center bg-cartoon-pattern bg-no-repeat bg-cover bg-top">
        <Card
          className="w-full md:w-[528px] p-[16px] md:px-[48px] md:py-[64px] bg-transparent md:bg-content1"
          shadow="none"
        >
          <CardHeader className="w-full flex flex-col items-center justify-center gap-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_SSE}/common/assets/yeram.png`}
              alt="Logo"
              width={130}
              height={120}
              priority
            />
            <span>지식센터</span>
            <div className="whitespace-pre-line word-break font-bold text-center text-2xl my-5">오성인을 지혜롭게</div>
          </CardHeader>
          <CardBody className="w-full flex flex-col items-center justify-center gap-4">
            <Button
              fullWidth
              size="lg"
              type="submit"
              startContent={<Icon icon="flat-color-icons:google" />}
              className="h-[60px] text-xl font-bold"
              onPress={handleSignInWithGoogle}
            >
              구글로 로그인
            </Button>
            <Button
              fullWidth
              size="lg"
              color="warning"
              type="submit"
              startContent={<Icon icon="ri:kakao-talk-fill" />}
              className="h-[60px] text-xl font-bold"
              onPress={handleSignInWithKakao}
            >
              카카오 로그인
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
