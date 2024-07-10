import React from 'react'
import { IconSvgProps } from '@/types'

export const Home2Icon = ({ fill = 'currentColor', size = 24, height, width, label, ...props }: IconSvgProps) => {
  const actualHeight = height || size
  const actualWidth = width || size

  return (
    <svg fill="none" height={actualHeight} width={actualWidth} aria-label={label} viewBox="0 0 24 24" {...props}>
      <path
        d="M20.04 6.82L14.28 2.79C12.71 1.69 10.3 1.75 8.79001 2.92L3.78001 6.83C2.78001 7.61 1.99001 9.21 1.99001 10.47V17.37C1.99001 19.92 4.06001 22 6.61001 22H17.39C19.94 22 22.01 19.93 22.01 17.38V10.6C22.01 9.25 21.14 7.59 20.04 6.82ZM12.75 18C12.75 18.41 12.41 18.75 12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18Z"
        fill={fill}
      />
    </svg>
  )
}

export const FlashIcon = ({ fill = 'currentColor', size = 24, height, width, label, ...props }: IconSvgProps) => {
  const actualHeight = height || size
  const actualWidth = width || size

  return (
    <svg fill="none" height={actualHeight} width={actualWidth} aria-label={label} viewBox="0 0 24 24" {...props}>
      <path
        d="M17.91 10.72H14.82V3.52C14.82 1.84 13.91 1.5 12.8 2.76L12 3.67L5.23 11.37C4.3 12.42 4.69 13.28 6.09 13.28H9.18V20.48C9.18 22.16 10.09 22.5 11.2 21.24L12 20.33L18.77 12.63C19.7 11.58 19.31 10.72 17.91 10.72Z"
        fill={fill}
      />
    </svg>
  )
}

export const UserIcon = ({ fill = 'currentColor', size = 24, height, width, label, ...props }: IconSvgProps) => {
  const actualHeight = height || size
  const actualWidth = width || size

  return (
    <svg viewBox="0 0 24 24" height={actualHeight} width={actualWidth} aria-label={label} {...props}>
      <g fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5}>
        <path
          fill={fill}
          data-name="Stroke 1"
          d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
        />
        <path fill={fill} data-name="Stroke 3" d="M11.837 11.174a4.372 4.372 0 10-.031 0z" />
      </g>
    </svg>
  )
}

export const SettingIcon = ({ fill = 'currentColor', size = 24, height, width, label, ...props }: IconSvgProps) => {
  const actualHeight = height || size
  const actualWidth = width || size

  return (
    <svg viewBox="0 0 24 24" height={actualHeight} width={actualWidth} aria-label={label} {...props}>
      <path
        fill={fill}
        d="M10.825 22q-.675 0-1.162-.45t-.588-1.1L8.85 18.8q-.325-.125-.612-.3t-.563-.375l-1.55.65q-.625.275-1.25.05t-.975-.8l-1.175-2.05q-.35-.575-.2-1.225t.675-1.075l1.325-1Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337l-1.325-1Q2.675 9.9 2.525 9.25t.2-1.225L3.9 5.975q.35-.575.975-.8t1.25.05l1.55.65q.275-.2.575-.375t.6-.3l.225-1.65q.1-.65.588-1.1T10.825 2h2.35q.675 0 1.163.45t.587 1.1l.225 1.65q.325.125.613.3t.562.375l1.55-.65q.625-.275 1.25-.05t.975.8l1.175 2.05q.35.575.2 1.225t-.675 1.075l-1.325 1q.025.175.025.338v.674q0 .163-.05.338l1.325 1q.525.425.675 1.075t-.2 1.225l-1.2 2.05q-.35.575-.975.8t-1.25-.05l-1.5-.65q-.275.2-.575.375t-.6.3l-.225 1.65q-.1.65-.587 1.1t-1.163.45zm1.225-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"
      />
    </svg>
  )
}

export const BellIcon = ({ fill = 'currentColor', size = 24, height, width, label, ...props }: IconSvgProps) => {
  const actualHeight = height || size
  const actualWidth = width || size

  return (
    <svg
      aria-hidden="true"
      role="img"
      viewBox="0 0 24 24"
      height={actualHeight}
      width={actualWidth}
      aria-label={label}
      {...props}
    >
      <g fill="none" stroke={fill} strokeWidth="1.5px">
        <path
          d="M18.75 9.71v-.705C18.75 5.136 15.726 2 12 2S5.25 5.136 5.25 9.005v.705a4.4 4.4 0 0 1-.692 2.375L3.45 13.81c-1.011 1.575-.239 3.716 1.52 4.214a25.775 25.775 0 0 0 14.06 0c1.759-.498 2.531-2.639 1.52-4.213l-1.108-1.725a4.4 4.4 0 0 1-.693-2.375Z"
          stroke="#A1A1AA"
          fill="none"
          strokeWidth="1.5px"
        ></path>
        <path
          strokeLinecap="round"
          d="M7.5 19c.655 1.748 2.422 3 4.5 3s3.845-1.252 4.5-3"
          stroke="#A1A1AA"
          fill="none"
          strokeWidth="1.5px"
        ></path>
      </g>
    </svg>
  )
}

export const HeartFilledIcon = ({ fill = 'currentColor', size = 24, width, height, ...props }: IconSvgProps) => (
  <svg
    aria-hidden="true"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
)

export const SearchIcon = ({ size = 24, height, width, label, ...props }: IconSvgProps) => {
  const actualHeight = height || size
  const actualWidth = width || size

  return (
    <svg fill="none" viewBox="0 0 24 24" height={actualHeight} width={actualWidth} aria-label={label} {...props}>
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="#A1A1AA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M22 22L20 20" stroke="#A1A1AA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

export const FilterIcon = ({ fill = 'currentColor', size = 24, height, width, label, ...props }: IconSvgProps) => {
  const actualHeight = height || size
  const actualWidth = width || size

  return (
    <svg fill="none" height={actualHeight} width={actualWidth} aria-label={label} viewBox="0 0 24 24" {...props}>
      <path
        d="M20.6 4.1V6.3C20.6 7.1 20.1 8.1 19.6 8.6L15.3 12.4C14.7 12.9 14.3 13.9 14.3 14.7V19C14.3 19.6 13.9 20.4 13.4 20.7L12 21.6C10.7 22.4 8.9 21.5 8.9 19.9V14.6C8.9 13.9 8.5 13 8.1 12.5L7.63 12.01C7.32 11.68 7.26 11.18 7.51 10.79L12.63 2.57C12.81 2.28 13.13 2.1 13.48 2.1H18.6C19.7 2.1 20.6 3 20.6 4.1Z"
        fill={fill}
      />
      <path
        d="M10.35 3.63L6.8 9.32C6.46 9.87 5.68 9.95 5.23 9.48L4.3 8.5C3.8 8 3.4 7.1 3.4 6.5V4.2C3.4 3 4.3 2.1 5.4 2.1H9.5C10.28 2.1 10.76 2.96 10.35 3.63Z"
        fill={fill}
      />
    </svg>
  )
}

export const KakaoIcon = ({ size = 24, height, width, ...props }: IconSvgProps) => {
  const actualHeight = height || size
  const actualWidth = width || size

  return (
    <svg
      height={actualHeight}
      width={actualWidth}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-75 -90 350 350"
      {...props}
    >
      <polygon className="kakao logo" fill="#3c1e1e" points="45 140 40 185 90 150 45 140" />
      <ellipse className="kakao logo" fill="#3c1e1e" cx="100" cy="80" rx="100" ry="80" />
    </svg>
  )
}

export const NaverIcon = ({ size = 24, height, width, ...props }: IconSvgProps) => {
  const actualHeight = height || size
  const actualWidth = width || size

  return (
    <svg height={actualHeight} width={actualWidth} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props}>
      <polygon
        fill="white"
        points="115.9,145.8 83.7,98.4 83.7,145.8 50,145.8 50,54.3 84.2,54.3 116.4,101.6 116.4,54.3    150,54.3 150,145.8 115.9,145.8"
      />
    </svg>
  )
}

export const GoogleIcon = ({ size = 24, height, width, ...props }: IconSvgProps) => {
  const actualHeight = height || size
  const actualWidth = width || size

  return (
    <svg height={actualHeight} width={actualWidth} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" {...props}>
      <path
        className="logo"
        fill="#4285f4"
        d="M26.64,18.2a10.34,10.34,0,0,0-.16-1.84H18v3.48h4.84A4.14,4.14,0,0,1,21,22.56v2.26H24a8.78,8.78,0,0,0,2.68-6.62Z"
      />
      <path
        className="bottom logo"
        fill="#34a853"
        d="M18,27a8.59,8.59,0,0,0,6-2.18L21,22.56A5.43,5.43,0,0,1,13,19.71H10V22a9,9,0,0,0,8,5Z"
      />
      <path className="left logo" fill="#fbbc05" d="M13,19.71a5.32,5.32,0,0,1,0-3.42V14H10A9,9,0,0,0,10,22l3-2.33Z" />
      <path
        className="top logo"
        fill="#ea4335"
        d="M18,12.58a4.86,4.86,0,0,1,3.44,1.35L24,11.34A8.65,8.65,0,0,0,18,9a9,9,0,0,0-8,5l3,2.33a5.36,5.36,0,0,1,5-3.71Z"
      />
    </svg>
  )
}