export type ServiceSlug = 'ai-audit-implementation' | 'management-operations'

export interface Service {
  slug: ServiceSlug
  number: string
  title: string
  shortTitle: string
  positioning: string
  statement: string
  description: string
  audience: string[]
  phases: Array<{ label: string; title: string; description: string }>
  deliverables: Array<{ title: string; description: string }>
  frameworks?: string[]
  cta: { label: string; href: string }
}

export interface Insight {
  slug: string
  number: string
  category: string
  title: string
  summary: string
  readTime: string
  image: string
  chapters: Array<{ title: string; paragraphs: string[]; points?: string[] }>
  example: { title: string; description: string; labels: string[] }
}

export interface IndustryPage {
  slug: string
  title: string
  metaDescription: string
  headline: string
  intro: string
  tensions: Array<{ title: string; description: string }>
  diagnostic: string[]
}

export interface AuditPage {
  slug: string
  inquiryType: 'business-audit' | 'ai-audit'
  title: string
  subtitle: string
  description: string
  dimensions: Array<{ title: string; description: string }>
  process: string[]
}

export interface Policy {
  id: string
  number: string
  title: string
  summary: string
  paragraphs: string[]
}

export interface EngagementOutput {
  service: ServiceSlug
  label: string
  title: string
  description: string
  artifact: 'scorecard' | 'matrix' | 'system' | 'diagnostic' | 'cost-map' | 'roadmap'
}
