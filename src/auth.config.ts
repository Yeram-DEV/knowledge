import type { NextAuthConfig } from 'next-auth'
import Google from '@auth/core/providers/google'
import Naver from '@auth/core/providers/naver'
import Kakao from '@auth/core/providers/kakao'

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Google, Naver, Kakao],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnProtected = !nextUrl.pathname.startsWith('/login')

      if (isOnProtected) {
        return isLoggedIn
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl))
      }
      return true
    }
  }
} satisfies NextAuthConfig
