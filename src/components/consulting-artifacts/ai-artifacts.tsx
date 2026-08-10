import { DocumentFrame } from './DocumentFrame'
import type { ArtifactBaseProps } from './types'

const readinessRows = [
  ['Strategy', 'Business outcome and decision owner', 'Assess'],
  ['Data', 'Source, access, quality, and retention', 'Assess'],
  ['Technology', 'Integration boundary and reliability', 'Assess'],
  ['People', 'Workflow owner and adoption conditions', 'Assess'],
  ['Governance', 'Risk, privacy, review, and accountability', 'Assess'],
] as const

const opportunities = [
  ['Weekly reporting', 'Medium impact', 'High feasibility'],
  ['Order exceptions', 'High impact', 'High feasibility'],
  ['Customer FAQ', 'Medium impact', 'Medium feasibility'],
  ['Forecasting', 'High impact', 'Low feasibility'],
] as const

const workflow = [
  ['01', 'Current workflow', 'Capture the repeated request'],
  ['02', 'Decision boundary', 'Name what requires human review'],
  ['03', 'Working system', 'Connect source, action, and record'],
  ['04', 'Operating check', 'Review exceptions and reliability'],
] as const

const handover = [
  ['Operating guide', 'Required', 'Workflow owner'],
  ['Exception rules', 'Required', 'Process owner'],
  ['Owner training', 'Scheduled', 'Engagement lead'],
  ['Support boundary', 'Documented', 'Technical owner'],
] as const

export function AIReadinessSheet({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return (
    <DocumentFrame artifactId="ai-readiness" title="AI readiness sheet" reference="ZCO / AI / 01" status="Assessment template" description="Five evidence areas used to identify readiness and constraints before implementation." tone={tone} className={className}>
      <div className="document-rows">
        {readinessRows.map(([dimension, evidence, status]) => (
          <div className="document-row" key={dimension}>
            <strong>{dimension}</strong><span>{evidence}</span><span className="document-note">{status}</span>
          </div>
        ))}
      </div>
      <p className="document-legend">Interpretation bands: Ready / Constraint / Evidence missing</p>
    </DocumentFrame>
  )
}

export function OpportunityPriorityMatrix({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return (
    <DocumentFrame artifactId="opportunity-priority" title="Opportunity priority matrix" reference="ZCO / AI / 02" status="Worked example" description="Illustrative use cases, not client results. The matrix compares business impact with implementation feasibility." tone={tone} className={className}>
      <div className="opportunity-matrix">
        <span className="document-axis">Business impact</span>
        <div className="document-rows">
          {opportunities.map(([name, impact, feasibility]) => (
            <div className={`document-row${name === 'Order exceptions' ? ' is-selected' : ''}`} key={name}>
              <strong>{name}</strong><span>{impact}</span><span>{feasibility}</span>
            </div>
          ))}
        </div>
        <span className="document-axis">Implementation feasibility</span>
      </div>
      <p className="document-selection">Selected first use case: <strong>Order exceptions</strong></p>
    </DocumentFrame>
  )
}

export function ImplementationWorkflowMap({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return (
    <DocumentFrame artifactId="implementation-workflow" title="Implementation workflow map" reference="ZCO / AI / 03" status="Engagement method" description="The document connects the current workflow, human decision boundary, working system, and operating check." tone={tone} className={className}>
      <ol className="document-flow">
        {workflow.map(([number, title, detail]) => (
          <li className="document-flow__step" key={number}><span className="document-note">{number}</span><strong>{title}</strong><p>{detail}</p></li>
        ))}
      </ol>
    </DocumentFrame>
  )
}

export function ImplementationHandoverSheet({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return (
    <DocumentFrame artifactId="implementation-handover" title="Implementation handover sheet" reference="ZCO / AI / 04" status="Handover checklist" description="Required documents, transfer status, and operating owner for a working implementation." tone={tone} className={className}>
      <div className="document-rows">
        {handover.map(([item, status, owner]) => (
          <div className="document-row" key={item}><strong>{item}</strong><span>{status}</span><span className="document-owner">{owner}</span></div>
        ))}
      </div>
    </DocumentFrame>
  )
}
