/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.yeram.co.kr'
      }
    ]
  }
}

export default nextConfig
