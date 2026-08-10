import type { EngagementOutput } from './types'

export const ENGAGEMENT_OUTPUTS: EngagementOutput[] = [
  { service: 'ai-audit-implementation', label: 'AI / Assess', title: 'AI Readiness Audit', description: 'A five-dimensional view of the business’s readiness, gaps, and useful opportunities.', artifact: 'ai-readiness' },
  { service: 'ai-audit-implementation', label: 'AI / Prioritise', title: 'Implementation Roadmap', description: 'A clear sequence based on impact, feasibility, and cost.', artifact: 'opportunity-priority' },
  { service: 'ai-audit-implementation', label: 'AI / Build', title: 'Working AI System', description: 'One practical system integrated into the operation identified during the audit.', artifact: 'implementation-workflow' },
  { service: 'management-operations', label: 'Operations / Diagnose', title: 'Operations Diagnostic', description: 'A connected view of cost, process, waste, and margin performance.', artifact: 'cost-leakage' },
  { service: 'management-operations', label: 'Operations / Map', title: 'Cost Structure Map', description: 'A visual model of fixed, variable, and semi-variable cost behavior.', artifact: 'cost-structure' },
  { service: 'management-operations', label: 'Operations / Roadmap', title: '90-Day Improvement Roadmap', description: 'A sequenced operating plan with owners, measures, and deadlines.', artifact: 'ninety-day-roadmap' },
]
