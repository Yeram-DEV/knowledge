import '@/app/globals.css'
import { Metadata, Viewport } from 'next'

import { Providers } from './providers'
import { clsx } from 'clsx'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    default: '지식센터',
    template: `%s | 지식센터`
  },
  icons: {
    icon: '/meta/favicon-32x32.png',
    shortcut: '/meta/favicon-32x32.png',
    apple: '/meta/apple-icon.png'
  },
  manifest: '/meta/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://kc.osung.io',
    siteName: '지식센터',
    description:
      '지식 센터에 오신 것을 환영합니다! 지식과 정보를 교환하며 서로의 경험을 나눌 수 있습니다. 지식 센터와 함께 새로운 지식을 탐구하고 커뮤니티와 소통해 보세요',
    images: [
      {
        url: 'https://kc.osung.io/meta/og.png',
        width: 1200,
        height: 630,
        alt: 'knowledge'
      }
    ]
  },
  robots: {
    index: false
  },
  verification: {
    google: 'idp5gF5yQu7LbQ6zmw8A26sGtyhvUHoKhX8-2IFo8QQ'
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eff4ef' },
    { media: '(prefers-color-scheme: dark)', color: '#282b30' }
  ]
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="ko">
      <head>
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_SSE}/common/fonts/tps/toss_product_han_sans.css`} />
      </head>
      <body className={clsx('bg-background font-sans antialiased')}>
        <Providers themeProps={{ attribute: 'class', enableSystem: true }}>{children}</Providers>
      </body>
    </html>
  )
}
