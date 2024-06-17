import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  fill?: string
  filled?: boolean
  size?: string | number
  height?: string | number
  width?: string | number
  label?: string
  [key: string]: any
}
