import type { Insight } from '../../content/types'
import { DocumentFrame } from './DocumentFrame'
import type { ArtifactBaseProps } from './types'

const marginSteps = [
  ['Revenue', 'Starting value'],
  ['Direct cost', 'Deduction'],
  ['Operating cost', 'Deduction'],
  ['Contribution', 'Decision value'],
] as const

const valueStreamSteps = [
  ['Request', 'Owner named'],
  ['Review', 'Wait time recorded'],
  ['Exception', 'Rework flagged'],
  ['Delivery', 'Outcome recorded'],
] as const

const aiOpportunities = [
  ['Reporting workflow', 'Medium impact', 'High feasibility', 'Review first'],
  ['Exception triage', 'High impact', 'High feasibility', 'Selected example'],
  ['Demand forecast', 'High impact', 'Low feasibility', 'Sequence later'],
] as const

const stockRows = [
  ['Core line', '12 / week', '18 units', 'No', '4.2 weeks', 'Hold order'],
  ['Seasonal line', '5 / week', '24 units', 'No', '8.6 weeks', 'Reduce next order'],
  ['New line', '3 / week', '10 units', 'No', '3.1 weeks', 'Review after two cycles'],
  ['Long-tail line', '<1 / week', '6 units', 'Yes', '16+ weeks', 'Pause and discuss return'],
] as const

type InsightExampleProps = ArtifactBaseProps & { example: Insight['example'] }

export function MarginBridgeExample({ example, tone = 'paper', className = '' }: InsightExampleProps) {
  return (
    <DocumentFrame artifactId="margin-bridge-example" title={example.title} reference="ZCO / EXAMPLE / MARGIN" status="Worked example" description={example.description} tone={tone} className={className}>
      <div className="margin-bridge">{marginSteps.map(([label, role]) => <div className="margin-bridge__step" key={label}><strong>{label}</strong><span>{role}</span></div>)}</div>
      <div className="example-labels">{example.labels.map((label) => <span key={label}>{label}</span>)}</div>
    </DocumentFrame>
  )
}

export function ValueStreamExample({ example, tone = 'paper', className = '' }: InsightExampleProps) {
  return (
    <DocumentFrame artifactId="value-stream-example" title={example.title} reference="ZCO / EXAMPLE / FLOW" status="Worked example" description={example.description} tone={tone} className={className}>
      <ol className="document-flow">{valueStreamSteps.map(([label, evidence], index) => <li className={`document-flow__step${label === 'Exception' ? ' is-selected' : ''}`} key={label}><span className="document-note">{String(index + 1).padStart(2, '0')}</span><strong>{label}</strong><p>{evidence}</p></li>)}</ol>
      <div className="example-labels">{example.labels.map((label) => <span key={label}>{label}</span>)}</div>
    </DocumentFrame>
  )
}

export function AIOpportunityExample({ example, tone = 'paper', className = '' }: InsightExampleProps) {
  return (
    <DocumentFrame artifactId="ai-opportunity-example" title={example.title} reference="ZCO / EXAMPLE / AI" status="Worked example" description={example.description} tone={tone} className={className}>
      <div className="document-table document-table--opportunities">{aiOpportunities.map(([name, impact, feasibility, sequence]) => <div className={`document-row${sequence === 'Selected example' ? ' is-selected' : ''}`} key={name}><strong>{name}</strong><span>{impact}</span><span>{feasibility}</span><span>{sequence}</span></div>)}</div>
      <div className="example-labels">{example.labels.map((label) => <span key={label}>{label}</span>)}</div>
    </DocumentFrame>
  )
}

export function StockPulseEvidenceSheet({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  const headers = ['Item group', 'SKU velocity', 'Reorder threshold', 'Dead-stock flag', 'Stock coverage', 'Supplier action'] as const
  return (
    <DocumentFrame artifactId="stockpulse-evidence" title="StockPulse operating evidence sheet" reference="ZCO / SYSTEM / STOCKPULSE" status="Example data" description="Illustrative inventory evidence, not a separate service or client result. The sheet connects stock signals to the next supplier action." tone={tone} className={className}>
      <div className="stock-evidence-table">
        <div className="stock-evidence-table__row stock-evidence-table__head">{headers.map((header) => <span key={header}>{header}</span>)}</div>
        {stockRows.map((row) => <div className="stock-evidence-table__row" key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}
      </div>
    </DocumentFrame>
  )
}
