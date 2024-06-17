import { IconSvgProps } from '@/types'

export const ArrowRightIcon = ({ fill = 'currentColor', size = 24, height, width, label, ...props }: IconSvgProps) => {
  const actualHeight = height || size
  const actualWidth = width || size

  return (
    <svg fill="none" height={actualHeight} width={actualWidth} aria-label={label} viewBox="0 0 24 24" {...props}>
      <path
        d="M14.4301 5.92999L20.5001 12L14.4301 18.07"
        stroke={fill}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 12H20.33"
        stroke={fill}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowLeftIcon = ({ fill = 'currentColor', size = 24, height, width, label, ...props }: IconSvgProps) => {
  const actualHeight = height || size
  const actualWidth = width || size

  return (
    <svg fill="none" height={actualHeight} width={actualWidth} aria-label={label} viewBox="0 0 24 24" {...props}>
      <path
        d="M9.57 5.92999L3.5 12L9.57 18.07"
        stroke={fill}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 12H3.67004"
        stroke={fill}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
