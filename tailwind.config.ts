import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#182040',
        deep: '#0F1428',
        rust: '#782000',
        paper: '#F3EEE5',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        authority: ['var(--font-instrument)', 'Georgia', 'serif'],
        body: ['var(--font-jakarta)', 'Arial', 'sans-serif'],
        data: ['var(--font-dm-mono)', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
