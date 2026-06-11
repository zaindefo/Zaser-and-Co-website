import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // NewForm Editorial Palette
        linen: '#fafffa',
        'obsidian-ink': '#121613',
        'pure-black': '#000000',
        bark: '#232924',
        sage: '#516254',
        mist: '#c8d2c8',
        voltage: '#2bee4b',
        'moss-glow': '#93b799',
        pollen: '#c4e4c9',
      },
      fontFamily: {
        'twk-lausanne': ['TWK Lausanne', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        'editorial-new': ['Editorial New', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        'pp-mondwest': ['PP Mondwest', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        times: ['Times', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        // Caption: 11px, weight 550, line-height 1.4
        caption: ['11px', { lineHeight: '1.4', fontWeight: '550', letterSpacing: '0.11px' }],
        // Body Small: 14px, weight 200, line-height 1.4
        'body-sm': ['14px', { lineHeight: '1.4', fontWeight: '200', letterSpacing: '-0.28px' }],
        // Body Small 2: 14px, weight 350, line-height 1.1
        'body-sm-2': ['14px', { lineHeight: '1.1', fontWeight: '350' }],
        // Body: 16px, weight 400, line-height 1.2
        body: ['16px', { lineHeight: '1.2', fontWeight: '400', letterSpacing: '-0.32px' }],
        // Body 2: 16px, weight 550, line-height 1.4
        'body-2': ['16px', { lineHeight: '1.4', fontWeight: '550' }],
        // Body 3: 16px, weight 200, line-height 1.4
        'body-3': ['16px', { lineHeight: '1.4', fontWeight: '200' }],
        // Subheading: 18px, weight 200, line-height 1.0
        lg: ['18px', { lineHeight: '1.0', fontWeight: '200', letterSpacing: '-0.36px' }],
        // Subheading 2: 18px, weight 550, line-height 1.0
        'lg-2': ['18px', { lineHeight: '1.0', fontWeight: '550' }],
        // Subheading 3: 18px, weight 400, line-height 1.0
        'lg-3': ['18px', { lineHeight: '1.0', fontWeight: '400' }],
        // Heading Small: 60px, weight 400 (PP Mondwest)
        '5xl': ['60px', { lineHeight: '0.9', fontWeight: '400', letterSpacing: '-1.2px' }],
        // Heading Small 2: 60px, weight 300 (Editorial New)
        '5xl-2': ['60px', { lineHeight: '0.9', fontWeight: '300', letterSpacing: '-1.2px' }],
        // Heading: 72px, weight 550
        '5xl-3': ['72px', { lineHeight: '1.1', fontWeight: '550' }],
        // Heading 2: 72px, weight 550, line-height 1.1
        '5xl-4': ['72px', { lineHeight: '1.1', fontWeight: '550' }],
        // Heading Large: 96px, weight 550
        '5xl-5': ['96px', { lineHeight: '1.0', fontWeight: '550', letterSpacing: '-1.92px' }],
        // Heading Large 2: 96px, weight 550
        '5xl-6': ['96px', { lineHeight: '1.0', fontWeight: '550' }],
        // Display: 140px, weight 300 (Editorial New)
        '5xl-7': ['140px', { lineHeight: '0.9', fontWeight: '300', letterSpacing: '-1.4px' }],
        // Display 2: 155px, weight 550
        '5xl-8': ['155px', { lineHeight: '1.0', fontWeight: '550' }],
        // Display 3: 165px, weight 400 (PP Mondwest)
        '5xl-9': ['165px', { lineHeight: '0.9', fontWeight: '400', letterSpacing: '-1.32px' }],
        // Display Large: 240px, weight 300 (Editorial New)
        '5xl-10': ['240px', { lineHeight: '0.9', fontWeight: '300', letterSpacing: '-4.8px' }],
        // Display XL: 295px, weight 400 (PP Mondwest)
        '5xl-11': ['295px', { lineHeight: '0.9', fontWeight: '400', letterSpacing: '-4.7px' }],
      },
      spacing: {
        4: '4px',
        8: '8px',
        10: '10px',
        15: '15px',
        20: '20px',
        25: '25px',
        30: '30px',
        32: '32px',
        35: '35px',
        40: '40px',
        45: '45px',
        50: '50px',
        55: '55px',
        60: '60px',
        120: '120px',
        190: '190px',
      },
      borderRadius: {
        sm: '5px',
        btn: '10px',
        card: '14px',
      },
      fontWeight: {
        200: '200',
        350: '350',
        400: '400',
        550: '550',
      },
      boxShadow: {
        'voltage-lg': 'rgba(16, 94, 29, 0.45) 1px 8px 20px 0px',
        'voltage-lg-2': 'rgba(18, 146, 39, 0.25) 1px 8px 20px 0px',
      },
      maxWidth: {
        page: '1440px',
      },
    },
  },
  plugins: [],
}

export default config
