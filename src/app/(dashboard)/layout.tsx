import { ReactNode } from 'react'
import { Footer, Header } from './_components'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative container mx-auto max-w-7xl flex-grow pb-28 flex flex-col">
      <Header />
      <section className="w-full flex flex-col items-center">{children}</section>
      <Footer />
    </main>
  )
}
