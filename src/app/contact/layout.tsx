import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Free Clarity Score Session',
  description:
    '30-minute free session. No cost, no obligation. Learn your Ghost Profit, break-even, and Revenue Leaks.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
