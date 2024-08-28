import next_pwa from 'next-pwa'

const withPWA = next_pwa({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/app-build-manifest.json$/]
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qtbngsyoxkicvzetpupe.supabase.co'
      }
    ]
  }
}

export default withPWA(nextConfig)
