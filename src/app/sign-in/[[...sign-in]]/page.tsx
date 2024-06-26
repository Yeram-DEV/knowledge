import { SignIn } from '@clerk/nextjs'
import { SubHeader } from '@/components/common'

export default function Page() {
  return (
    <div className="w-full h-[100dvh] flex flex-col items-center ">
      <SubHeader props={{ className: '!fixed backdrop-blur-sm bg-background/0 sm:hidden' }} />
      <div className="h-full flex items-center justify-center">
        <SignIn />
      </div>
    </div>
  )
}
