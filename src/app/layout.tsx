import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'

import { Providers } from './providers'
import { clsx } from 'clsx'
import { ReactNode } from 'react'
import { Footer, Header } from '@/components/common'

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
    url: 'https://knowledge.yeram.co.kr',
    siteName: '지식센터',
    description:
      '지식 센터에 오신 것을 환영합니다! 지식과 정보를 교환하며 서로의 경험을 나눌 수 있습니다. 지식 센터와 함께 새로운 지식을 탐구하고 커뮤니티와 소통해 보세요',
    images: [
      {
        url: 'https://knowledge.yeram.co.kr/meta/og.png',
        width: 1200,
        height: 630,
        alt: 'knowledge'
      }
    ]
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="ko">
      <head>
        <link rel="stylesheet" href="https://static.yeram.co.kr/etc/tps/toss_product_han_sans.css" />
      </head>
      <body className={clsx('bg-background font-sans antialiased')}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="flex flex-col">
            <Header />
            <main className="container mx-auto max-w-7xl flex-grow pb-20">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
