import { createClient } from '@/utils/supabase/server'
import { EventBanner } from '@/app/(dashboard)/_components'

export default async function Page() {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  console.log(user)

  return (
    <div className="container mx-auto max-w-7xl flex flex-col items-center justify-start gap-8 sm:gap-32 p-4">
      <EventBanner />
    </div>
  )
}
