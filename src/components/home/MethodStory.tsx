import {
  AIReadinessSheet,
  CostLeakageScan,
  CostStructureMap,
  ImplementationHandoverSheet,
  ImplementationWorkflowMap,
  InterventionPriorityRegister,
  NinetyDayRoadmap,
  OpportunityPriorityMatrix,
} from '../consulting-artifacts'

const dossiers = [
  {
    service: 'AI Audit & Implementation',
    reference: 'ENGAGEMENT 01',
    stages: [
      { label: 'Assess', title: 'Read the business before choosing the technology.', body: 'Strategy, Data, Technology, People, and Governance reveal where AI can create credible value.', Artefact: AIReadinessSheet },
      { label: 'Prioritise', title: 'Compare impact with feasibility.', body: 'Opportunity is ranked before budget is committed.', Artefact: OpportunityPriorityMatrix },
      { label: 'Build', title: 'Make one system work inside the operation.', body: 'The selected use case becomes a practical workflow connected to the way the team already works.', Artefact: ImplementationWorkflowMap },
      { label: 'Hand over', title: 'Leave ownership with the team.', body: 'Documentation, operating instructions, and training keep the implementation usable.', Artefact: ImplementationHandoverSheet },
    ],
  },
  {
    service: 'Management & Operations Strategy',
    reference: 'ENGAGEMENT 02',
    stages: [
      { label: 'Diagnose', title: 'See cost, flow, and margin as one system.', body: 'The diagnostic connects financial structure to the movement of work.', Artefact: CostLeakageScan },
      { label: 'Map', title: 'Make the hidden structure visible.', body: 'Cost behavior is mapped alongside process steps and ownership.', Artefact: CostStructureMap },
      { label: 'Prioritise', title: 'Separate consequential change from noise.', body: 'Pricing, waste, delay, and allocation opportunities are ranked for action.', Artefact: InterventionPriorityRegister },
      { label: 'Roadmap', title: 'Sequence the next 90 days.', body: 'Actions receive an owner, a measure, and a deadline.', Artefact: NinetyDayRoadmap },
    ],
  },
] as const

export function MethodStory() {
  return (
    <section className="method-dossiers" data-nav-theme="dark">
      <div className="method-dossiers__intro">
        <span className="eyebrow eyebrow--light">[ How we work ]</span>
        <h2 className="display display--lg">Two engagements with eight visible stages.</h2>
      </div>
      {dossiers.map((dossier) => (
        <article className="method-dossier" key={dossier.reference}>
          <header className="method-dossier__header"><span className="document-note">{dossier.reference}</span><h2>{dossier.service}</h2></header>
          <div className="method-dossier__stages">
            {dossier.stages.map((stage, index) => {
              const Artefact = stage.Artefact
              return (
                <section className="method-stage" key={stage.label}>
                  <div className="method-stage__copy">
                    <span className="document-note">{String(index + 1).padStart(2, '0')}</span>
                    <span className="method-stage__label">{stage.label}</span>
                    <h3>{stage.title}</h3><p>{stage.body}</p>
                  </div>
                  <Artefact tone="navy" />
                </section>
              )
            })}
          </div>
        </article>
      ))}
    </section>
  )
}
