import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - meta (any files under meta directory)
     * - sw.js (service worker script)
     * - workbox- (any workbox scripts)
     * - and any image files (svg, png, jpg, jpeg, gif, webp)
     */
    '/((?!_next/static|_next/image|favicon.ico|meta|sw.js|workbox-.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}
