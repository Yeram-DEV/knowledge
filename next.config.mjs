import next_pwa from 'next-pwa'

const withPWA = next_pwa({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development' // 개발 모드에서는 PWA 비활성화
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-mdx-remote'],
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dpvkdgobfcbufqijvfia.supabase.co'
      }
    ]
  }
}

export default withPWA(nextConfig)
