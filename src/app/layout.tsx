import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { GlobalEffects } from '@/components/layout/GlobalEffects'
import { TransitionWrapper } from '@/components/layout/TransitionWrapper'
import { ClientLoader } from '@/components/ClientLoader'

export const metadata: Metadata = {
  metadataBase: new URL('https://zaserandco.com'),
  title: {
    default: 'Zaser & Co — Strategic & Management Consultancy',
    template: '%s | Zaser & Co',
  },
  description:
    'Zaser & Co is a strategic and management consultancy for small and medium businesses in Bangladesh. Financial clarity, operational intelligence, AI implementation, and management frameworks.',
  keywords: [
    'strategic consultancy Bangladesh',
    'management consultancy Dhaka',
    'business consultancy SME',
    'financial clarity',
    'AI implementation',
    'operational improvement',
    'Zaser and Co',
    'break-even analysis',
    'margin improvement',
    'business strategy Bangladesh',
  ],
  authors: [{ name: 'Zaser & Co', url: 'https://zaserandco.com' }],
  creator: 'Zaser & Co',
  publisher: 'Zaser & Co',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://zaserandco.com',
  },
  openGraph: {
    title: 'Zaser & Co — Strategic & Management Consultancy',
    description:
      'Strategic and management consultancy for growing businesses. Financial clarity, operational strategy, AI implementation, and management frameworks.',
    type: 'website',
    locale: 'en_US',
    url: 'https://zaserandco.com',
    siteName: 'Zaser & Co',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaser & Co — Strategic & Management Consultancy',
    description:
      'Strategic and management consultancy for growing businesses. Financial clarity, operational strategy, AI implementation, and management frameworks.',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Zaser & Co',
  url: 'https://zaserandco.com',
  description:
    'Strategic and management consultancy for small and medium businesses in Bangladesh. Financial clarity, operational intelligence, and AI-powered systems.',
  foundingDate: '2025',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dhaka',
    addressCountry: 'BD',
  },
  sameAs: ['https://linkedin.com/company/zaserandco'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="bg-linen text-obsidian-ink font-twk-lausanne antialiased relative">
        <ClientLoader />
        <GlobalEffects />
        <Navbar />
        <div className="relative z-10">
          <TransitionWrapper>{children}</TransitionWrapper>
        </div>
        <Footer />
      </body>
    </html>
  )
}
