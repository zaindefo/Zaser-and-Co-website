import { DocumentFrame } from './DocumentFrame'
import type { ArtifactBaseProps } from './types'

const leakageRows = [
  ['Cost leakage', 'Which commitment no longer matches demand?', 'Source evidence'],
  ['Time leakage', 'Where does work wait or repeat?', 'Observed flow'],
  ['Process leakage', 'Which handoff lacks a clear owner?', 'Process trace'],
  ['Margin leakage', 'Where does activity fail to create contribution?', 'Cost model'],
] as const

const costRows = [
  ['Fixed', 'Committed base', 'Review capacity and necessity'],
  ['Variable', 'Moves with volume', 'Connect to unit economics'],
  ['Semi-variable', 'Changes in steps', 'Identify threshold behavior'],
] as const

const interventions = [
  ['01', 'Exception ownership', 'High', 'Operations owner', 'Cycle time'],
  ['02', 'Pricing review', 'High', 'Commercial owner', 'Contribution'],
  ['03', 'Supplier cycle', 'Medium', 'Purchasing owner', 'Stock cover'],
] as const

const roadmapRows = [
  ['Day 01–30', 'Stabilise evidence and controls', 'Engagement lead', 'Baseline agreed'],
  ['Day 31–60', 'Implement priority process changes', 'Operations owner', 'Flow reviewed'],
  ['Day 61–90', 'Embed ownership and measures', 'Executive owner', 'Review rhythm active'],
] as const

export function CostLeakageScan({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return (
    <DocumentFrame artifactId="cost-leakage" title="Cost and leakage scan" reference="ZCO / OPS / 01" status="Diagnostic template" description="Four diagnostic lenses connect operating questions to the source evidence required to answer them." tone={tone} className={className}>
      <div className="document-table document-table--leakage">
        <div className="document-table__head"><span>Lens</span><span>Question</span><span>Evidence</span></div>
        {leakageRows.map(([lens, question, evidence]) => <div className="document-row" key={lens}><strong>{lens}</strong><span>{question}</span><span>{evidence}</span></div>)}
      </div>
    </DocumentFrame>
  )
}

export function CostStructureMap({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return (
    <DocumentFrame artifactId="cost-structure" title="Cost structure map" reference="ZCO / OPS / 02" status="Mapping template" description="A document for separating cost behavior and connecting it to contribution and operating capacity." tone={tone} className={className}>
      <div className="document-cost-flow"><span>Revenue</span><span>Direct cost</span><span>Contribution</span><span>Operating base</span></div>
      <div className="document-rows">{costRows.map(([behavior, meaning, decision]) => <div className="document-row" key={behavior}><strong>{behavior}</strong><span>{meaning}</span><span>{decision}</span></div>)}</div>
    </DocumentFrame>
  )
}

export function InterventionPriorityRegister({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return (
    <DocumentFrame artifactId="intervention-priority" title="Intervention priority register" reference="ZCO / OPS / 03" status="Worked example" description="Illustrative interventions show how priority, decision owner, and measure stay connected. This is not a client result." tone={tone} className={className}>
      <div className="document-table document-table--priority">
        <div className="document-table__head"><span>Rank</span><span>Intervention</span><span>Priority</span><span>Decision owner</span><span>Measure</span></div>
        {interventions.map(([rank, intervention, priority, owner, measure]) => <div className={`document-table__row${rank === '01' ? ' is-selected' : ''}`} key={rank}><span>{rank}</span><strong>{intervention}</strong><span>{priority}</span><span>{owner}</span><span>{measure}</span></div>)}
      </div>
    </DocumentFrame>
  )
}

export function NinetyDayRoadmap({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return (
    <DocumentFrame artifactId="ninety-day-roadmap" title="90-day improvement roadmap" reference="ZCO / OPS / 04" status="Example plan" description="An example sequence connecting each action period to an owner and review measure." tone={tone} className={className}>
      <div className="roadmap-bands">{roadmapRows.map(([period, action, owner, measure]) => <section className="roadmap-band" key={period}><span className="document-note">{period}</span><strong>{action}</strong><span className="document-owner">Owner: {owner}</span><span className="document-measure">Measure: {measure}</span></section>)}</div>
    </DocumentFrame>
  )
}
