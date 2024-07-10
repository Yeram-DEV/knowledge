/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig
