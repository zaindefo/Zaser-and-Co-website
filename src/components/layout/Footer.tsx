'use client'
import { usePathname } from 'next/navigation'
import { ContactFooterPanel } from '@/components/home/ContactFooterPanel'

/**
 * The three-layer contact panel is the site footer.
 *
 * On the homepage it is rendered by the page itself as the final stacking
 * layer (paired with the FAQ), so this returns null there to avoid a duplicate.
 */
export function Footer() {
  const pathname = usePathname()
  if (pathname === '/') return null

  return <ContactFooterPanel />
}
