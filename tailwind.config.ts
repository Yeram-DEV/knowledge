import { nextui } from '@nextui-org/theme'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Toss Product Sans']
      },
      backgroundImage: {
        'cartoon-pattern':
          'radial-gradient( 100% 150% at 50% -35%, rgba(14, 16, 21, 0) 0%, rgb(14, 16, 21, 0.25) 100% ), linear-gradient( 180deg, rgba(14, 16, 21, 0) -35%, rgba(14, 16, 21, 0.175) 100% ), linear-gradient( 180deg, rgba(14, 16, 21, 0.175) -35%, rgba(14, 16, 21, 0) 100% ), url(https://static.yeram.co.kr/knowledge/book/assets/9168475.jpg)'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: '#282B30'
          }
        }
      }
    })
  ]
}
export default config
