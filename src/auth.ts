import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import { User } from '@/types/user'

export const {
  handlers,
  signIn,
  unstable_update: update
} = NextAuth({
  ...authConfig,
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as User
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    }
  }
})
