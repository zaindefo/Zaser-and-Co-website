import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Free Clarity Score Session',
  description:
    '30-minute free session. No cost, no obligation. See your real profit, break-even, and where money is leaking.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
