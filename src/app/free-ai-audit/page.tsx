import { AUDIT_PAGES } from '@/lib/constants'
import { AuditPageTemplate } from '@/components/seo/AuditPageTemplate'
import type { Metadata } from 'next'

const data = AUDIT_PAGES['ai-audit']

export const metadata: Metadata = {
  title: data.seoTitle,
  description: data.metaDescription,
  alternates: { canonical: '/free-ai-audit' },
  openGraph: {
    title: `${data.seoTitle} | Zaser & Co`,
    description: data.metaDescription,
    type: 'website',
    url: 'https://zaserandco.com/free-ai-audit',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.seoTitle} | Zaser & Co`,
    description: data.metaDescription,
  },
}

export default function FreeAiAudit() {
  return <AuditPageTemplate data={data} />
}
