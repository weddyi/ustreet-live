import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'chi-red': '#FF1744',
        'chi-gold': '#D4AF37',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'rec-blink': 'rec-blink 1s ease-in-out infinite',
        'float-3d': 'float3d 6s ease-in-out infinite',
        'wave': 'wave 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
