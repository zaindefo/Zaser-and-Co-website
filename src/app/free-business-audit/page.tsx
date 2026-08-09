import type { Metadata } from 'next'
import { AuditPageTemplate } from '../../components/routes/AuditPageTemplate'
import { getAudit } from '../../content/audits'

export const metadata: Metadata = { title: 'Free Business Audit', description: 'A focused first look at where the business is losing operational or financial clarity.', alternates: { canonical: '/free-business-audit' } }

export default function FreeBusinessAuditPage() { return <AuditPageTemplate audit={getAudit('free-business-audit')!} /> }
