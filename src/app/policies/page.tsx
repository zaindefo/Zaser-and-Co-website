import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export const metadata: Metadata = {
  title: 'Firm Policies — Zaser & Co',
  description:
    'Zaser & Co firm policies covering scope, confidentiality, intellectual property, ethics, communication, deliverables, payment, and more.',
  alternates: { canonical: '/policies' },
}

const POLICIES = [
  {
    number: '01',
    title: 'Scope of Work',
    body: 'Every engagement is governed by a clearly defined scope of work. Services, deliverables, timelines, and assumptions are documented in the signed engagement letter before any work begins. Any work outside the agreed scope requires a separate written agreement.',
  },
  {
    number: '02',
    title: 'Confidentiality',
    body: 'All client information — financial records, operational data, strategic plans, and communications — is treated as strictly confidential. Zaser & Co does not disclose client information to third parties without prior written consent, except as required by law.',
  },
  {
    number: '03',
    title: 'Intellectual Property',
    body: 'Any tools, frameworks, templates, or methodologies created by Zaser & Co remain the intellectual property of Zaser & Co. Clients receive a non-exclusive, non-transferable licence to use deliverables produced under their engagement. Custom AI models or automations built for a client may be retained by the client, subject to the terms of the engagement letter.',
  },
  {
    number: '04',
    title: 'Ethics & Professional Conduct',
    body: 'Zaser & Co operates with honesty, transparency, and professional integrity. We do not guarantee specific financial outcomes. We do not misrepresent our qualifications or the expected impact of our services. We disclose any limitations to the advice we provide.',
  },
  {
    number: '05',
    title: 'Conflict of Interest',
    body: 'Zaser & Co will disclose any potential conflicts of interest before or during an engagement. Where a conflict cannot be managed through disclosure, the firm will either decline the engagement or propose appropriate safeguards.',
  },
  {
    number: '06',
    title: 'Communication Standards',
    body: 'All official communication is conducted through email, scheduled video calls, or the firm\'s designated messaging platforms. Zaser & Co responds to client communications within two business days. Urgent matters should be flagged in the subject line.',
  },
  {
    number: '07',
    title: 'Deliverable Standards',
    body: 'All deliverables follow the firm\'s internal quality standards. Documents are professionally formatted, clearly structured, and delivered in the agreed format (PDF, PPTX, or other). Working files and supporting data are provided where applicable.',
  },
  {
    number: '08',
    title: 'Payment Terms',
    body: 'Payment terms are specified in the engagement letter. Standard terms require a 50% advance before work begins and the remaining 50% upon delivery. Invoices are issued digitally. Late payments beyond 14 days may result in suspension of services.',
  },
  {
    number: '09',
    title: 'Termination & Cancellation',
    body: 'Either party may terminate the engagement with 14 days\' written notice. If the client terminates early, any completed work will be invoiced proportionally. Fees already paid for completed milestones are non-refundable.',
  },
  {
    number: '10',
    title: 'Revisions & Amendments',
    body: 'Each engagement includes one round of revisions to final deliverables. Additional rounds of revision are available at an agreed fee. Changes to the scope of work require a formal amendment to the engagement letter.',
  },
  {
    number: '11',
    title: 'Case Studies & Testimonials',
    body: 'Zaser & Co may request permission to reference an engagement in its portfolio, case studies, or marketing materials. Client names and specific data will not be used without written consent. Anonymised references may be used unless the client explicitly opts out.',
  },
  {
    number: '12',
    title: 'Training & Knowledge Transfer',
    body: 'Where an engagement includes a training or handover component, Zaser & Co will provide documented materials for ongoing use. These materials are licensed for internal use only and may not be redistributed.',
  },
  {
    number: '13',
    title: 'Quality Assurance',
    body: 'Zaser & Co follows structured quality assurance processes for every engagement. All deliverables undergo internal review before submission. Client feedback is documented and incorporated within the agreed revision cycle.',
  },
  {
    number: '14',
    title: 'Anti-Bribery & Corruption',
    body: 'Zaser & Co has zero tolerance for bribery and corruption. The firm does not offer, accept, or solicit bribes, facilitation payments, or improper inducements in any form. All team members and subcontractors are bound by this policy.',
  },
  {
    number: '15',
    title: 'Governing Law',
    body: 'All engagements are governed by the laws of Bangladesh. Any disputes arising from an engagement will be resolved through negotiation first, followed by arbitration in Dhaka if necessary.',
  },
]

export default function PoliciesPage() {
  return (
    <main className="pt-24 bg-linen min-h-screen">
      <section className="section-padding">
        <div className="page-container">
          <ScrollReveal>
            <p
              style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '11px',
                color: '#6B3828',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Governance
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(40px, 5vw, 64px)',
                color: '#0F1235',
                lineHeight: 0.95,
                marginBottom: '16px',
              }}
            >
              FIRM POLICIES
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-editorial-new)',
                fontStyle: 'italic',
                fontSize: '18px',
                fontWeight: 300,
                color: '#6B3828',
                maxWidth: '640px',
                lineHeight: 1.5,
                marginBottom: '48px',
              }}
            >
              Zaser &amp; Co maintains 15 firm-wide policies that govern every engagement. These policies ensure
              consistency, protect client interests, and reflect our commitment to ethical, professional practice.
            </p>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {POLICIES.map((policy, i) => (
              <ScrollReveal key={policy.number} delay={i * 0.05}>
                <div
                  style={{
                    padding: 'clamp(24px, 3vw, 40px)',
                    background: '#FFFDF8',
                    border: '1px solid rgba(18,22,19,0.08)',
                    borderRadius: '14px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-dm-mono)',
                        fontSize: '12px',
                        color: '#782000',
                        fontWeight: 500,
                        flexShrink: 0,
                        marginTop: '4px',
                      }}
                    >
                      {policy.number}
                    </span>
                    <div>
                      <h2
                        style={{
                          fontFamily: 'var(--font-editorial-new)',
                          fontSize: 'clamp(20px, 2.5vw, 28px)',
                          fontWeight: 300,
                          color: '#0F1235',
                          lineHeight: 1.2,
                          marginBottom: '10px',
                        }}
                      >
                        {policy.title}
                      </h2>
                      <p
                        style={{
                          fontFamily: 'var(--font-twk-lausanne)',
                          fontSize: '15px',
                          fontWeight: 350,
                          color: '#6B3828',
                          lineHeight: 1.7,
                        }}
                      >
                        {policy.body}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div style={{ textAlign: 'center', marginTop: '64px', padding: '48px 0' }}>
              <p
                style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontSize: '15px',
                  fontWeight: 350,
                  color: '#6B3828',
                  lineHeight: 1.7,
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                These policies apply to all engagements. For questions or clarifications,
                please <a href="/contact" style={{ color: '#782000', textDecoration: 'underline' }}>contact us</a>.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
