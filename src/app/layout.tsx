import type { Metadata } from 'next'
import { Bebas_Neue, DM_Mono, Instrument_Serif, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { EditorialNav } from '../components/editorial/EditorialNav'
import { EditorialFooter } from '../components/editorial/EditorialFooter'
import { ReadingProgress } from '../components/editorial/ReadingProgress'
import { GoogleAnalytics, GoogleTagManager, GoogleTagManagerNoscript, RouteChangeTracker } from '../components/GoogleTagManager'
import { SITE } from '../content/site'

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas', display: 'swap' })
const instrument = Instrument_Serif({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'], variable: '--font-instrument', display: 'swap' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' })
const dmMono = DM_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-dm-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://zaserandco.com'),
  title: { default: 'Zaser & Co | Advisory That Builds', template: '%s | Zaser & Co' },
  description: SITE.description,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://zaserandco.com' },
  openGraph: {
    title: 'Zaser & Co | Advisory That Builds',
    description: SITE.description,
    type: 'website',
    locale: 'en_US',
    url: 'https://zaserandco.com',
    siteName: SITE.name,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Zaser & Co | Advisory That Builds' }],
  },
  twitter: { card: 'summary_large_image', title: 'Zaser & Co | Advisory That Builds', description: SITE.description, images: ['/opengraph-image'] },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.name,
  url: 'https://zaserandco.com',
  description: SITE.description,
  foundingDate: SITE.founded,
  address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
  areaServed: { '@type': 'Country', name: 'Bangladesh' },
  serviceType: ['AI Audit and Implementation', 'Management and Operations Strategy Consulting'],
  contactPoint: { '@type': 'ContactPoint', email: SITE.email, contactType: 'customer service', availableLanguage: ['English', 'Bengali'] },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${instrument.variable} ${jakarta.variable} ${dmMono.variable}`}>
      <head>
        <GoogleTagManager />
        <GoogleAnalytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </head>
      <body>
        <GoogleTagManagerNoscript />
        <RouteChangeTracker />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <ReadingProgress />
        <EditorialNav />
        <div id="main-content" className="site-main">{children}</div>
        <EditorialFooter />
      </body>
    </html>
  )
}
