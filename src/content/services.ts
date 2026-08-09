import type { Service } from './types'

export const SERVICES: Service[] = [
  {
    slug: 'ai-audit-implementation',
    number: '01',
    title: 'AI Audit & Implementation',
    shortTitle: 'AI Audit',
    positioning: 'Your strategic partner in AI transformation.',
    statement: 'Know where AI creates value. Then build it.',
    description:
      'We assess the business before choosing technology, prioritise opportunities by impact and feasibility, and build one working AI system inside the operation.',
    audience: [
      'You have tried AI tools without a coherent strategy.',
      'You cannot see which workflow is worth automating first.',
      'You need an implementation your team can own, not another recommendation.',
    ],
    phases: [
      { label: 'Assess', title: 'Readiness across five dimensions', description: 'Strategy, Data, Technology, People, and Governance are assessed independently to reveal the real starting point.' },
      { label: 'Prioritise', title: 'Rank the opportunities', description: 'Use cases are compared by business impact, technical feasibility, and cost before anything is built.' },
      { label: 'Build', title: 'Implement one working system', description: 'The highest-value opportunity becomes a practical system integrated into the client’s actual workflow.' },
      { label: 'Hand over', title: 'Transfer ownership', description: 'Documentation, operating instructions, and training leave the team able to maintain the system.' },
    ],
    deliverables: [
      { title: 'AI Readiness Audit Report', description: 'A scored assessment across Strategy, Data, Technology, People, and Governance.' },
      { title: 'Prioritised Implementation Roadmap', description: 'A phased list of use cases ranked by impact, feasibility, and cost.' },
      { title: 'One Working AI System', description: 'A practical system built and integrated around the highest-value opportunity.' },
      { title: 'Handover Documentation & Training', description: 'Technical documentation, operating instructions, and a team training session.' },
    ],
    cta: { label: 'Request a free AI audit', href: '/free-ai-audit' },
  },
  {
    slug: 'management-operations',
    number: '02',
    title: 'Management & Operations Strategy',
    shortTitle: 'Operations Strategy',
    positioning: 'Your strategic partner in operational performance.',
    statement: 'Find where margin disappears. Build a plan to recover it.',
    description:
      'We diagnose cost structure, process flow, waste, and margin performance, then build a focused 90-day improvement strategy across pricing, process, and resource allocation.',
    audience: [
      'Costs are rising without a structured control strategy.',
      'Revenue growth is not translating into profit.',
      'The operation needs an objective diagnosis and a sequenced plan.',
    ],
    phases: [
      { label: 'Diagnose', title: 'See the complete operation', description: 'Cost structure, process flow, waste points, and margin performance are examined as one connected system.' },
      { label: 'Map', title: 'Make cost and flow visible', description: 'Fixed, variable, and semi-variable costs are connected to products, services, and operational steps.' },
      { label: 'Prioritise', title: 'Separate signal from noise', description: 'The most consequential pricing, process, and allocation opportunities are ranked for action.' },
      { label: 'Roadmap', title: 'Sequence the next 90 days', description: 'Quick wins, medium-term fixes, and strategic changes receive owners, measures, and deadlines.' },
    ],
    deliverables: [
      { title: 'Operations Diagnostic Report', description: 'A structured analysis of cost, process, waste, and margin performance.' },
      { title: 'Cost Structure Map', description: 'A visual breakdown of cost behavior and contribution margin by line of business.' },
      { title: '90-Day Improvement Roadmap', description: 'Sequenced actions grouped into quick wins, medium-term fixes, and strategic changes.' },
      { title: 'Executive Client Presentation', description: 'A concise 10–12 slide presentation of findings, priorities, and next actions.' },
    ],
    frameworks: ['Lean', 'Kaizen', 'PDCA', 'DuPont analysis', 'Value Stream Mapping', 'Cost-Volume-Profit analysis'],
    cta: { label: 'Request a free business audit', href: '/free-business-audit' },
  },
]

export const getService = (slug: string) => SERVICES.find((service) => service.slug === slug)
