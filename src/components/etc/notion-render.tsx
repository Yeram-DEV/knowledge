'use client'

import { NotionRenderer } from 'react-notion-x'
import { Code } from 'react-notion-x/build/third-party/code'
import { Collection } from 'react-notion-x/build/third-party/collection'
import { Equation } from 'react-notion-x/build/third-party/equation'
import { Modal } from 'react-notion-x/build/third-party/modal'
import { Pdf } from 'react-notion-x/build/third-party/pdf'
import { useTheme } from 'next-themes'
import { useIsSSR } from '@react-aria/ssr'
import { Spinner } from '@nextui-org/spinner'

import 'react-notion-x/src/styles.css'

export const NotionRender = ({ recordMap }) => {
  const { theme } = useTheme()
  const isSSR = useIsSSR()

  return isSSR ? (
    <div className="w-full h-dvh flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  ) : (
    <NotionRenderer
      recordMap={recordMap}
      fullPage
      darkMode={theme === 'dark'}
      components={{
        Code,
        Collection,
        Equation,
        Modal,
        Pdf
      }}
      disableHeader
    />
  )
}
