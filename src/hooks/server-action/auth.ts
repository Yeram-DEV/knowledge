'use server'
import { signIn } from '@/auth'

export const signInWithGoogle = async () => {
  await signIn('google')
}
export const signInWithNaver = async () => {
  await signIn('naver')
}
export const signInWithKakao = async () => {
  await signIn('kakao')
}
