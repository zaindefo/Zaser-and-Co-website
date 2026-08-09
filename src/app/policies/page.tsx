import type { Metadata } from 'next'
import { SectionLabel } from '../../components/editorial/SectionLabel'
import { POLICIES } from '../../content/policies'

export const metadata: Metadata = { title: 'Firm Policies', description: 'The official engagement, conduct, data, quality, payment, and professional standards of Zaser & Co.', alternates: { canonical: '/policies' } }

export default function PoliciesPage() {
  return <main><header className="policies-hero" data-nav-theme="light"><SectionLabel>Firm policies</SectionLabel><h1 className="display display--xl">Credibility is an <span className="authority">operating standard.</span></h1><p className="lede">These policies govern every client engagement, internal operation, and professional interaction at Zaser &amp; Co.</p><div><span>15 policies</span><span>Effective 2026</span><span>Governed by Bangladesh law</span></div></header><div className="policies-layout section section--white" data-nav-theme="light"><aside><span>Policy index</span>{POLICIES.map((policy) => <a key={policy.id} href={`#${policy.id}`}>{policy.number} {policy.title}</a>)}</aside><div className="policy-list">{POLICIES.map((policy) => <article id={policy.id} key={policy.id}><span>{policy.number}</span><div><h2>{policy.title}</h2><p className="policy-summary">{policy.summary}</p>{policy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>)}</div></div></main>
}
