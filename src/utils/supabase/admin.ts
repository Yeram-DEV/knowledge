import { createClient } from '@supabase/supabase-js'

export function createServerAuthClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SERVICE_ROLE, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

export function createAuthClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SERVICE_ROLE, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
