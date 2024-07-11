import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)

  const code = searchParams.get('code')

  console.log(origin)

  // const next = searchParams.get('next') ?? '/'

  if (code) {
    // const supabase = createClient()
    //
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
