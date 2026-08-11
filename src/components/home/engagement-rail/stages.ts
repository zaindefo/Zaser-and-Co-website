import type { EngagementStage, ServiceDefinition } from './types'

export const ENGAGEMENT_SERVICES = [
  {
    id: 'ai',
    eyebrow: 'Engagement 01',
    title: 'AI Audit & Implementation',
    startIndex: 0,
    stages: ['Assess', 'Prioritise', 'Build', 'Hand Over'],
  },
  {
    id: 'operations',
    eyebrow: 'Engagement 02',
    title: 'Management & Operations Strategy',
    startIndex: 4,
    stages: ['Diagnose', 'Map', 'Prioritise', 'Roadmap'],
  },
] as const satisfies readonly ServiceDefinition[]

export const ENGAGEMENT_STAGES = [
  {
    id: 'ai-assess', number: '01', service: 'ai', serviceStage: 0, title: 'Assess',
    strategicLine: 'Read the business before choosing the technology.',
    body: 'Strategy, Data, Technology, People, and Governance reveal where AI can create credible value.',
    outputLabel: 'Readiness scan', visualState: 'ai-assess',
  },
  {
    id: 'ai-prioritise', number: '02', service: 'ai', serviceStage: 1, title: 'Prioritise',
    strategicLine: 'Not every automation deserves to be built.',
    body: 'Opportunities are ranked by business impact, feasibility, cost, and operational fit.',
    outputLabel: 'Selected use case', visualState: 'ai-prioritise',
  },
  {
    id: 'ai-build', number: '03', service: 'ai', serviceStage: 2, title: 'Build',
    strategicLine: 'Make one system work inside the operation.',
    body: 'The highest-value use case becomes a practical workflow connected to how the team already works.',
    outputLabel: 'System built', visualState: 'ai-build',
  },
  {
    id: 'ai-hand-over', number: '04', service: 'ai', serviceStage: 3, title: 'Hand Over',
    strategicLine: 'Leave ownership with the team.',
    body: 'Documentation, operating instructions, and training make the implemented system usable after delivery.',
    outputLabel: 'Ready', visualState: 'ai-hand-over',
  },
  {
    id: 'operations-diagnose', number: '05', service: 'operations', serviceStage: 0, title: 'Diagnose',
    strategicLine: 'See cost, flow, and margin as one system.',
    body: 'We identify where money, time, and capacity are leaking before changing the structure.',
    outputLabel: 'Leakage detected', visualState: 'operations-diagnose',
  },
  {
    id: 'operations-map', number: '06', service: 'operations', serviceStage: 1, title: 'Map',
    strategicLine: 'Make the hidden structure visible.',
    body: 'Cost behaviour is mapped alongside process steps, ownership, and operational friction.',
    outputLabel: 'Bottleneck found', visualState: 'operations-map',
  },
  {
    id: 'operations-prioritise', number: '07', service: 'operations', serviceStage: 2, title: 'Prioritise',
    strategicLine: 'Separate consequential change from noise.',
    body: 'The highest-impact fixes are ranked before the roadmap is built.',
    outputLabel: 'Priority set', visualState: 'operations-prioritise',
  },
  {
    id: 'operations-roadmap', number: '08', service: 'operations', serviceStage: 3, title: 'Roadmap',
    strategicLine: 'Sequence the next 90 days.',
    body: 'Actions receive an owner, a measure, and a deadline.',
    outputLabel: 'Roadmap set', visualState: 'operations-roadmap',
  },
] as const satisfies readonly EngagementStage[]
