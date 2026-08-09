export const SITE = {
  name: 'Zaser & Co',
  tagline: 'Advisory That Builds.',
  description:
    'Strategic and management consultancy for small and medium businesses. We create financial clarity, operational intelligence, and practical AI systems.',
  email: 'hello@zaserandco.com',
  location: 'Dhaka, Bangladesh',
  founded: '2026',
  formEndpoint: 'https://formspree.io/f/mwvgrzrk',
} as const

export const PRIMARY_NAV = [
  { label: 'Services', href: '/#services' },
  { label: 'Insights', href: '/insights' },
  { label: 'Policies', href: '/policies' },
] as const

export const FULL_NAV = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Free AI audit', href: '/free-ai-audit' },
  { label: 'Free business audit', href: '/free-business-audit' },
  { label: 'StockPulse', href: '/stockpulse' },
] as const
