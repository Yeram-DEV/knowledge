import { UserTable } from './_components'
import { createClient } from '@/utils/supabase/server'

export default async function UsersPage() {
  const supabase = createClient(true)
  const {
    data: { users }
  } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000
  })

  return (
    <div className="relative w-full flex flex-col items-center p-8">
      <UserTable users={users} />
    </div>
  )
}
