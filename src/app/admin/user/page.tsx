import { UserTable } from './_components'
import { createAuthClient } from '@/utils/supabase/admin'

export default async function UsersPage() {
  const supabase = createAuthClient()
  const {
    data: { users },
    error
  } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000
  })

  console.log(error)
  console.log(users)

  return (
    <div className="relative w-full flex flex-col items-center p-8">
      <UserTable users={users} />
    </div>
  )
}
