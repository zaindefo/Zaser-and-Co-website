'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/tracking'

interface TrackedLinkProps {
  href: string
  event: string
  params?: Record<string, unknown>
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  target?: string
  rel?: string
}

export function TrackedLink({ href, event, params, children, ...props }: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(event, { link_url: href, ...params })
  }

  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a href={href} onClick={handleClick} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
