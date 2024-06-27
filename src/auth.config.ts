import type { NextAuthConfig } from 'next-auth'
import Google from '@auth/core/providers/google'
import Naver from '@auth/core/providers/naver'
import Kakao from '@auth/core/providers/kakao'

export const authConfig = {
  trustHost: true,
  providers: [Google, Naver, Kakao]
} satisfies NextAuthConfig
