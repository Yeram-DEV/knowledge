import { ReactNode } from 'react'

import { SubHeader } from '@/components/home/sub-header'

export default function LibraryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SubHeader />
      {children}
    </>
  )
}
