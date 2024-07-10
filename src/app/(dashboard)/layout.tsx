import { ReactNode } from 'react'

export default function DashboardLayout({ children, header }: { children: ReactNode; header: ReactNode }) {
  return (
    <main className="container mx-auto max-w-7xl flex-grow pb-28 flex flex-col">
      {header}
      <section className="w-full flex flex-col items-center justify-between">{children}</section>
    </main>
  )
}