import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Free Clarity Score Session',
  description:
    'Book a free 30-minute diagnostic session with Zaser & Co. No cost, no obligation. We assess your business across five strategic dimensions and show you where the gaps are.',
  alternates: { canonical: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
