import type { AuditPage } from './types'

export const AUDITS: AuditPage[] = [
  {
    slug: 'free-business-audit',
    inquiryType: 'business-audit',
    title: 'Free Business Audit',
    subtitle: 'A focused first look at where the operation is losing clarity.',
    description: 'A no-cost conversation that helps identify whether the most urgent issue sits in financial visibility, process, pricing, resource allocation, or AI readiness.',
    dimensions: [
      { title: 'Financial visibility', description: 'How clearly can the business see margin, cost behavior, and break-even pressure?' },
      { title: 'Operational flow', description: 'Where do handoffs, delays, and repeat work create avoidable friction?' },
      { title: 'Decision quality', description: 'Which management decisions depend on incomplete or delayed information?' },
      { title: 'Technology fit', description: 'Which workflows deserve automation and which need diagnosis first?' },
      { title: 'Team ownership', description: 'Can improvements survive after an external engagement ends?' },
    ],
    process: ['Share the operating tension.', 'Map the most relevant dimensions.', 'Identify the first useful line of inquiry.', 'Decide whether a Zaser engagement fits.'],
  },
  {
    slug: 'free-ai-audit',
    inquiryType: 'ai-audit',
    title: 'Free AI Audit',
    subtitle: 'Start with the workflow, not the tool.',
    description: 'A no-cost conversation about where AI may create operational value and whether the business is ready to implement it responsibly.',
    dimensions: [
      { title: 'Strategy', description: 'Is there a clear business outcome for AI to support?' },
      { title: 'Data', description: 'Is the required information structured, accessible, and reliable?' },
      { title: 'Technology', description: 'Can the current stack support a useful integration?' },
      { title: 'People', description: 'Can the team adopt and operate an augmented workflow?' },
      { title: 'Governance', description: 'Are risk, privacy, ownership, and accountability understood?' },
    ],
    process: ['Describe the workflow.', 'Assess the five readiness dimensions.', 'Identify the most credible opportunity.', 'Decide whether an implementation engagement fits.'],
  },
]

export const getAudit = (slug: string) => AUDITS.find((audit) => audit.slug === slug)
