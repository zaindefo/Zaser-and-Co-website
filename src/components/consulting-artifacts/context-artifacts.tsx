import type { AuditPage, IndustryPage } from '../../content/types'
import { DocumentFrame } from './DocumentFrame'
import type { ArtifactBaseProps } from './types'

const industryRoutes = [
  ['Management & Operations Strategy', 'Operations diagnostic'],
  ['Management & Operations Strategy', 'Cost structure map'],
  ['AI Audit & Implementation', 'Opportunity priority matrix'],
] as const

const localSources = {
  dhaka: [
    ['Available numbers', 'Financial and operating records'],
    ['Observed work', 'Handoffs, delays, and repeated decisions'],
    ['Existing tools', 'Systems already used by the team'],
    ['Decision bottleneck', 'The choice that remains difficult'],
  ],
  bangladesh: [
    ['Available numbers', 'Cost, pricing, and margin evidence'],
    ['Observed work', 'Process and ownership evidence'],
    ['Existing tools', 'Technology and information evidence'],
    ['Operating constraint', 'Priority to diagnose before prescribing'],
  ],
} as const

const engagementMethod = [
  ['01', 'Diagnose', 'Trace the evidence and name the operating tension'],
  ['02', 'Prioritise', 'Separate consequential action from noise'],
  ['03', 'Build or roadmap', 'Create the system or sequenced operating plan'],
  ['04', 'Transfer ownership', 'Leave documents, measures, and owners with the team'],
] as const

export function IndustryDiagnosticMap({ industry, tone = 'paper', className = '' }: ArtifactBaseProps & { industry: IndustryPage }) {
  return (
    <DocumentFrame artifactId="industry-diagnostic" title={`${industry.title} diagnostic map`} reference={`ZCO / INDUSTRY / ${industry.slug.toUpperCase()}`} status="Sector diagnostic" description="Existing sector tensions connected to the operating area, relevant engagement, and tangible output." tone={tone} className={className}>
      <div className="industry-map">
        {industry.tensions.map((tension, index) => {
          const [engagement, output] = industryRoutes[index]
          return (
            <section className="industry-map__row" key={tension.title}>
              <div><span className="document-note">Tension</span><strong>{tension.title}</strong><p>{tension.description}</p></div>
              <div><span className="document-note">Operating area</span><p>{industry.diagnostic[index]}</p></div>
              <div><span className="document-note">Relevant engagement</span><p>{engagement}</p></div>
              <div><span className="document-note">Tangible output</span><p>{output}</p></div>
            </section>
          )
        })}
      </div>
    </DocumentFrame>
  )
}

export function AuditAssessmentSheet({ audit, tone = 'paper', className = '' }: ArtifactBaseProps & { audit: AuditPage }) {
  const reference = audit.inquiryType === 'ai-audit' ? 'ZCO / AUDIT / AI' : 'ZCO / AUDIT / BUSINESS'
  return (
    <DocumentFrame artifactId="audit-assessment" title={`${audit.title} assessment sheet`} reference={reference} status="Unscored assessment template" description="The assessment organises evidence and interpretation without inventing a visitor score." tone={tone} className={className}>
      <div className="document-rows">
        {audit.dimensions.map((dimension) => (
          <div className="document-row" key={dimension.title}>
            <div><strong>{dimension.title}</strong><p>{dimension.description}</p></div><span>Evidence to discuss</span><span className="document-note">Discuss</span>
          </div>
        ))}
      </div>
      <div className="assessment-bands"><span>Evidence present</span><span>Constraint</span><span>Evidence missing</span></div>
      <p className="document-interpretation">Not scored before the conversation. Bands organise the conversation; they do not report a completed visitor score.</p>
    </DocumentFrame>
  )
}

export function OperatingConstraintMap({ scope, tone = 'paper', className = '' }: ArtifactBaseProps & { scope: keyof typeof localSources }) {
  return (
    <DocumentFrame artifactId="operating-constraint" title="Operating constraint map" reference={`ZCO / LOCAL / ${scope.toUpperCase()}`} status="Diagnostic method" description="The map connects available evidence to the constraint, priority, engagement, and operating owner." tone={tone} className={className}>
      <div className="document-rows">
        {localSources[scope].map(([source, evidence]) => <div className="document-row" key={source}><strong>{source}</strong><span>{evidence}</span><span className="document-note">Review source</span></div>)}
      </div>
      <div className="document-constraint-flow"><span>Evidence</span><span>Constraint</span><span>Priority</span><span>Engagement</span><span>Owner</span></div>
    </DocumentFrame>
  )
}

export function EngagementMethodSheet({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return (
    <DocumentFrame artifactId="engagement-method" title="Engagement method sheet" reference="ZCO / METHOD / 01" status="Working method" description="Four stages connect diagnosis and priority to a built output or roadmap that the client team owns." tone={tone} className={className}>
      <ol className="document-flow">
        {engagementMethod.map(([number, title, detail]) => <li className="document-flow__step" key={number}><span className="document-note">{number}</span><strong>{title}</strong><p>{detail}</p></li>)}
      </ol>
    </DocumentFrame>
  )
}
