import type { Metadata } from 'next'
import { AuditPageTemplate } from '../../components/routes/AuditPageTemplate'
import { getAudit } from '../../content/audits'

export const metadata: Metadata = { title: 'Free AI Audit', description: 'A focused first look at AI readiness across Strategy, Data, Technology, People, and Governance.', alternates: { canonical: '/free-ai-audit' } }

export default function FreeAiAuditPage() { return <AuditPageTemplate audit={getAudit('free-ai-audit')!} /> }
