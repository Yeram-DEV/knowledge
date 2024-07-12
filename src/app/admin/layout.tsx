import { ReactNode } from 'react'
import { SidebarNav } from './_components'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <div className="flex items-center dark h-screen justify-center">
        <div className="flex h-dvh w-full">
          <SidebarNav />
          {children}
        </div>
      </div>
    </div>
  )
}
