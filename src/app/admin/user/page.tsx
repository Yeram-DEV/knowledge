import { UserTable } from './_components'
import { createAuthClient } from '@/utils/supabase/admin'

export default async function UsersPage() {
  const supabase = createAuthClient()
  const {
    data: { users }
  } = await supabase.auth.admin.listUsers()

  return (
    <div className="relative w-full flex flex-col items-center p-8">
      <UserTable users={users} supabase={supabase} />
    </div>
  )
}
