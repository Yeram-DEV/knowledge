'use server'
import { signIn } from '@/auth'

export const signInWithGoogle = async () => {
  await signIn('google', { redirectTo: '/' })
}
export const signInWithNaver = async () => {
  await signIn('naver', { redirectTo: '/' })
}
export const signInWithKakao = async () => {
  await signIn('kakao', { redirectTo: '/' })
}
