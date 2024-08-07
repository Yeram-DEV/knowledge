import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

export function createClient(isAuth = false) {
  const cookieStore = cookies()
  const service_key = isAuth ? process.env.NEXT_PUBLIC_SERVICE_ROLE! : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const options: any = {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
      }
    }
  }

  if (process.env.NODE_ENV === 'production') {
    options.cookieOptions = {
      domain: '.osung.io'
    }
  }

  return createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, service_key, options)
}
