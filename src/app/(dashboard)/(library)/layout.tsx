import { ReactNode } from 'react'
import { BottomFloatingBanner, TabHeader } from './_components'

export default function LibraryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TabHeader />
      {children}
      <BottomFloatingBanner />
    </>
  )
}
