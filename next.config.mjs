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

export default nextConfig
