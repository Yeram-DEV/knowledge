import { UserTable } from './_components'
import { createServerAuthClient } from '@/utils/supabase/admin'

export default async function UsersPage() {
  const supabase = createServerAuthClient()
  const {
    data: { users }
  } = await supabase.auth.admin.listUsers()

  return (
    <div className="relative w-full flex flex-col items-center p-8">
      <UserTable users={users} />
    </div>
  )
}
