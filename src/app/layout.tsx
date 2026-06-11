import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { GlobalEffects } from '@/components/layout/GlobalEffects'
import { TransitionWrapper } from '@/components/layout/TransitionWrapper'

export const metadata: Metadata = {
  title: {
    default: 'Zaser & Co — Advisory That Builds',
    template: '%s | Zaser & Co',
  },
  description:
    'Zaser & Co is a business consultancy that helps online businesses grow through financial clarity, AI implementation, and operational intelligence.',
  openGraph: {
    title: 'Zaser & Co — Advisory That Builds',
    description:
      'Financial clarity. AI implementation. Operational intelligence. The consultancy that doesn\'t just advise — we build.',
    type: 'website',
    locale: 'en_US',
    url: 'https://zaserandco.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaser & Co — Advisory That Builds',
    description:
      'Financial clarity. AI implementation. Operational intelligence. The consultancy that doesn\'t just advise — we build.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className="bg-linen text-obsidian-ink font-twk-lausanne antialiased relative">
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
