import { ReactNode } from 'react'

export default async function AdminLayout({ sidebar, children }: { sidebar: ReactNode; children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <div className="flex items-center dark h-screen justify-center">
        <div className="flex h-dvh w-full">
          {sidebar}
          {children}
        </div>
      </div>
    </div>
  )
}
