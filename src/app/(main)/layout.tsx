import { ReactNode } from 'react'
import { Footer, Header } from '@/components/common'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="container mx-auto max-w-7xl flex-grow pb-28">{children}</main>
      <Footer />
    </div>
  )
}
