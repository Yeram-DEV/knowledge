import { EventBanner } from '@/components/home/banner'

export default function HomePage() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center gap-4 p-2">
      <div className="w-full flex flex-col items-center">
        <EventBanner />
      </div>
    </div>
  )
}
