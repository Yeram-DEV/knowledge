import { ReactNode } from 'react'

import { TabHeader } from '@/components/home/tab-header'

export default function LibraryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TabHeader />
      {children}
    </>
  )
}
