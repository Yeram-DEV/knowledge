import { ReactNode } from 'react'
import { TabHeader } from './_components'

export default function LibraryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TabHeader />
      {children}
    </>
  )
}
