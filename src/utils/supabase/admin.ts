import { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'

export function createAuthClient() {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SERVICE_ROLE!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
