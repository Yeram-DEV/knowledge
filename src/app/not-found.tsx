'use client'

import Lottie from 'react-lottie-player'
import lottieJson from '@public/lottie/spot-error-alt.json'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'

export default function NotFound() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 bg-baron-pattern bg-no-repeat bg-cover bg-top">
      <Lottie loop animationData={lottieJson} play style={{ width: 350, height: 150 }} />
      <div className="w-full flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">요청한 페이지를 찾을 수 없어요.</span>
        <span className="text-[#F0E6D2]">올바른 주소인지 확인 후 다시 시도해 주세요.</span>
      </div>
      <Button href={'/'} as={Link} color="primary" size="lg">
        홈화면
      </Button>
    </div>
  )
}
