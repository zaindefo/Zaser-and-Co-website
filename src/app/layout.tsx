import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { GlobalEffects } from '@/components/layout/GlobalEffects'
import { TransitionWrapper } from '@/components/layout/TransitionWrapper'
import { ClientLoader } from '@/components/ClientLoader'
import { GoogleTagManager, GoogleTagManagerNoscript, GoogleAnalytics, RouteChangeTracker } from '@/components/GoogleTagManager'

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
    'business consultant Bangladesh',
    'business consultant Dhaka',
    'financial clarity',
    'AI implementation',
    'operational improvement',
    'Zaser and Co',
    'break-even analysis',
    'margin improvement',
    'business strategy Bangladesh',
    'SME consulting Bangladesh',
    'free business audit Bangladesh',
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  openGraph: {
    title: 'Zaser & Co — Strategic & Management Consultancy',
    description:
      'Strategic and management consultancy for growing businesses. Financial clarity, operational strategy, AI implementation, and management frameworks.',
    type: 'website',
    locale: 'en_US',
    url: 'https://zaserandco.com',
    siteName: 'Zaser & Co',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Zaser & Co — Strategic & Management Consultancy for Growing Businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaser & Co — Strategic & Management Consultancy',
    description:
      'Strategic and management consultancy for growing businesses. Financial clarity, operational strategy, AI implementation, and management frameworks.',
    images: ['/opengraph-image'],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Zaser & Co',
  url: 'https://zaserandco.com',
  description:
    'Strategic and management consultancy for small and medium businesses in Bangladesh. Financial clarity, operational intelligence, AI implementation, and management frameworks.',
  foundingDate: '2025',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dhaka',
    addressRegion: 'Dhaka Division',
    addressCountry: 'BD',
  },
  areaServed: [
    { '@type': 'Country', name: 'Bangladesh' },
    { '@type': 'City', name: 'Dhaka' },
  ],
  serviceType: [
    'Business Consulting',
    'Financial Consulting',
    'Management Consulting',
    'AI Implementation',
    'Operational Improvement',
  ],
  priceRange: 'Free initial consultation',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@zaserandco.com',
    contactType: 'customer service',
    availableLanguage: ['English', 'Bengali'],
    url: 'https://zaserandco.com/contact',
  },
  sameAs: ['https://linkedin.com/company/zaserandco'],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Zaser & Co',
  url: 'https://zaserandco.com',
  description: 'Strategic and management consultancy for growing businesses in Bangladesh.',
  publisher: {
    '@type': 'ProfessionalService',
    name: 'Zaser & Co',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Fonts first, and as a direct <link> rather than a CSS @import, so the
            request starts immediately instead of waiting on globals.css.
            Syne and Noto Serif Bengali were dropped — zero usages in the app. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300&family=Cormorant:ital,wght@0,300;0,400;1,300;1,400&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap"
        />
        <GoogleTagManager />
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-linen text-obsidian-ink font-twk-lausanne antialiased relative">
        <GoogleTagManagerNoscript />
        <RouteChangeTracker />
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
