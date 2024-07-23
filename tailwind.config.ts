import { nextui } from '@nextui-org/theme'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/_components/**/*.{js,ts,jsx,tsx,mdx}',
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
          'radial-gradient( 100% 150% at 50% -35%, rgba(14, 16, 21, 0) 0%, rgb(14, 16, 21, 0.25) 100% ), linear-gradient( 180deg, rgba(14, 16, 21, 0) -35%, rgba(14, 16, 21, 0.175) 100% ), linear-gradient( 180deg, rgba(14, 16, 21, 0.175) -35%, rgba(14, 16, 21, 0) 100% ), url(https://dpvkdgobfcbufqijvfia.supabase.co/storage/v1/object/sign/knowledge/assets/login_bg.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJrbm93bGVkZ2UvYXNzZXRzL2xvZ2luX2JnLnBuZyIsImlhdCI6MTcyMDU3MjMwNywiZXhwIjoyMDM1OTMyMzA3fQ.J9uXufdtEX57MjVuBV3QWEb8l23VmYSdMW8aExQwQFI)'
      }
    }
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography'), nextui()]
}
export default config
