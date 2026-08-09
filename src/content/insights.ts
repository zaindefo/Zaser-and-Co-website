import type { Insight } from './types'

export const INSIGHTS: Insight[] = [
  {
    slug: 'revenue-trap', number: '01', category: 'Financial Strategy', readTime: '6 min', image: '/images/editorial/insight-margin.webp',
    title: 'Revenue is visible. What the business keeps is harder to see.',
    summary: 'A practical way to separate activity from performance by tracing contribution margin through the complete cost structure.',
    chapters: [
      { title: 'The number that attracts attention', paragraphs: ['Revenue is easy to celebrate because it is immediate and visible. It does not explain what remains after product cost, fulfilment, returns, platform fees, promotion, staffing, and overhead.', 'The management task is to connect sales to the complete operating system that makes each sale possible.'] },
      { title: 'Build the cost picture', paragraphs: ['Start with direct costs, then map variable operating costs, semi-variable commitments, and the fixed base. The aim is not accounting theatre. It is a decision model that makes pricing and volume choices easier to defend.'], points: ['Define contribution by product or service line.', 'Separate recurring costs from volume-sensitive costs.', 'Show where assumptions replace source data.'] },
      { title: 'Use the picture', paragraphs: ['A useful margin model changes a decision: which offer to promote, where to renegotiate, what volume can support, and when growth creates pressure rather than strength.'] },
    ],
    example: { title: 'Worked example: a margin bridge', description: 'A fictional operating model showing how a sale moves through direct cost, fulfilment, acquisition, and overhead. It demonstrates the method only and is not a client result.', labels: ['Revenue', 'Direct cost', 'Operating cost', 'Contribution'] },
  },
  {
    slug: 'silent-bleed', number: '02', category: 'Operations', readTime: '5 min', image: '/images/editorial/insight-operations.webp',
    title: 'Growth can hide the process that quietly consumes it.',
    summary: 'How to find small operational leaks by reading cost, flow, ownership, and delay as one connected system.',
    chapters: [
      { title: 'Why leakage stays invisible', paragraphs: ['Operational loss rarely announces itself as one dramatic failure. It appears as repeated exceptions, unclear ownership, unnecessary movement, rework, delayed information, and commitments that no longer match the business.'] },
      { title: 'Trace the flow', paragraphs: ['Follow one real unit of work from demand to delivery. Record who touches it, what information changes hands, where it waits, and which steps create value for the customer.'], points: ['Use source evidence rather than memory.', 'Separate symptoms from constraints.', 'Connect each intervention to an owner and measure.'] },
      { title: 'Sequence change', paragraphs: ['A 90-day roadmap should distinguish immediate controls, process redesign, and structural decisions. Trying to change everything simultaneously makes learning difficult and accountability vague.'] },
    ],
    example: { title: 'Worked example: a value-stream fragment', description: 'A fictional workflow used to demonstrate delay, rework, and ownership mapping. It is not presented as client proof.', labels: ['Request', 'Review', 'Exception', 'Delivery'] },
  },
  {
    slug: 'time-trap', number: '03', category: 'AI Implementation', readTime: '7 min', image: '/images/editorial/insight-ai.webp',
    title: 'The first AI question is not which tool to buy.',
    summary: 'A five-dimensional readiness lens for choosing an AI opportunity that the business can implement and own.',
    chapters: [
      { title: 'Start with the workflow', paragraphs: ['Tools encourage businesses to begin with capability. Implementation should begin with the operating problem: a repeated decision, a delayed handoff, a reporting burden, or a communication pattern that consumes attention.'] },
      { title: 'Test readiness', paragraphs: ['A credible opportunity must survive five questions about Strategy, Data, Technology, People, and Governance. Weakness in one dimension may change the sequence even when the underlying idea is useful.'], points: ['Define the desired business outcome.', 'Inspect the information the system would depend on.', 'Name the human owner and operating boundary.'] },
      { title: 'Build one useful system', paragraphs: ['Prioritising one implementation creates a working feedback loop. The team can test value, reliability, adoption, and governance before expanding the system.'] },
    ],
    example: { title: 'Worked example: an opportunity matrix', description: 'A fictional comparison of operational use cases by impact and feasibility. It demonstrates prioritisation and does not claim a client outcome.', labels: ['Impact', 'Feasibility', 'Cost', 'Sequence'] },
  },
]

export const getInsight = (slug: string) => INSIGHTS.find((insight) => insight.slug === slug)
