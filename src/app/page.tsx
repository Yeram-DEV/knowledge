import { EventBanner } from '@/components/home/banner'

export default function HomePage() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center  min-h-[756px] gap-12 md:px-8">
        <EventBanner />
      </div>
      <section className="w-full flex flex-col items-center justify-center gap-4 pt-16 px-6"></section>
    </div>
  )
}
