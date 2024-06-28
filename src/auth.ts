import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { db } from './prisma'

import authConfig from '@/auth.config'

export const { handlers, auth, signIn } = NextAuth({
  session: { strategy: 'jwt' },
  trustHost: true,
  pages: {
    signIn: '/login'
  },
  ...authConfig,
  adapter: PrismaAdapter(db),
  callbacks: {
    async session({ session, token }) {
      if (token.user) {
        session.user['role'] = token.user['role']
        session.user['image'] = token.user['image']
        session.user['id'] = token.user['id']
      }
      return session
    },
    async jwt({ token, user }) {
      if (token) {
        user = await db.user.findUnique({ where: { id: token.sub } })
        token.user = user
      }

      return token
    }
  }
})
