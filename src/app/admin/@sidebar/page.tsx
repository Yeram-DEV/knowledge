import { SidebarFooter, SidebarItems, UserAvatar } from './_components'
import { createClient } from '@/utils/supabase/server'

export default async function AdminSideBarPage() {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  return (
    <div className="relative flex h-dvh w-72 max-w-[288px] min-w-[288px] flex-1 flex-col !border-r-small border-divider p-6">
      <UserAvatar user={user} />
      <SidebarItems />
      <SidebarFooter />
    </div>
  )
}
