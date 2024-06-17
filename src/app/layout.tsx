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
  manifest: '/meta/manifest.json'
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
          <div className="flex flex-col h-[100vh] ">
            <Header />
            <main className="container mx-auto max-w-7xl  flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
