import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const code = searchParams.get('code')

  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient()
    console.log(next)
    console.log(supabase)
    // const {
    //   error,
    //   data: { user }
    // } = await supabase.auth.exchangeCodeForSession(code)

    // if (!error) {
    //   if (!user.user_metadata.role || !user.user_metadata.position || !user.user_metadata.team) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_ORIGIN}/signup`)
    // }
    // return NextResponse.redirect(`${origin}${next}`)
    // } else {
    //   console.log(error.message)
    // }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_ORIGIN}/auth/auth-error`)
}
