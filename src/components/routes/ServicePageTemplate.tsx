import Image from 'next/image'
import Link from 'next/link'
import type { ComponentType } from 'react'
import type { Service } from '../../content/types'
import {
  AIReadinessSheet,
  CostLeakageScan,
  CostStructureMap,
  ImplementationHandoverSheet,
  ImplementationWorkflowMap,
  InterventionPriorityRegister,
  NinetyDayRoadmap,
  OpportunityPriorityMatrix,
  type ArtifactBaseProps,
} from '../consulting-artifacts'
import { SectionLabel } from '../editorial/SectionLabel'

const serviceArtefacts = {
  'ai-audit-implementation': [AIReadinessSheet, OpportunityPriorityMatrix, ImplementationWorkflowMap, ImplementationHandoverSheet],
  'management-operations': [CostLeakageScan, CostStructureMap, InterventionPriorityRegister, NinetyDayRoadmap],
} satisfies Record<Service['slug'], ReadonlyArray<ComponentType<ArtifactBaseProps>>>

export function ServicePageTemplate({ service }: { service: Service }) {
  const isAI = service.slug === 'ai-audit-implementation'

  return (
    <main>
      <header className="route-hero route-hero--service" data-nav-theme="light">
        <div className="route-hero__copy">
          <span className="eyebrow">Service {service.number}</span>
          <h1 className="display display--xl">{service.title}</h1>
          <p className="route-hero__statement">{service.statement}</p>
          <p>{service.description}</p>
          <Link className="button button--rust" href={service.cta.href}><span>{service.cta.label}</span><span aria-hidden="true">↗</span></Link>
        </div>
        <div className="route-hero__image">
          <Image src={isAI ? '/images/editorial/ai-workflow.webp' : '/images/editorial/operations-map.webp'} alt={isAI ? 'A hand organizing a readiness audit and AI opportunity sequence' : 'A hand mapping cost, process, and operational priorities'} fill priority sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </header>

      <section className="service-tension section section--paper" data-nav-theme="light">
        <div>
          <SectionLabel>Who this is for</SectionLabel>
          <h2 className="display display--lg">A defined engagement for a <span className="authority">specific tension.</span></h2>
        </div>
        <div className="tension-list">
          {service.audience.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}
        </div>
      </section>

      <section className="service-process section--navy" data-nav-theme="dark">
        <div className="service-process__intro">
          <SectionLabel light>Engagement sequence</SectionLabel>
          <h2 className="display display--lg">We don’t stop at the <span className="authority">recommendation.</span></h2>
        </div>
        <div className="service-process__steps">
          {service.phases.map((phase, index) => {
            const Artefact = serviceArtefacts[service.slug][index]
            return (
              <article className="service-process__step" key={phase.label}>
                <div className="service-process__copy">
                  <span>{String(index + 1).padStart(2, '0')} / {phase.label}</span>
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
                </div>
                <Artefact tone="navy" />
              </article>
            )
          })}
        </div>
      </section>

      <section className="deliverables section section--white" data-nav-theme="light">
        <SectionLabel>What you leave with</SectionLabel>
        <h2 className="display display--lg">Concrete outputs.<br /><span className="authority">Clear ownership.</span></h2>
        <div className="deliverable-list">
          {service.deliverables.map((item, index) => (
            <article key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p></article>
          ))}
        </div>
        {service.frameworks && <div className="framework-strip"><span>Frameworks may include</span>{service.frameworks.map((item) => <strong key={item}>{item}</strong>)}</div>}
      </section>

      <section className="route-cta section section--paper" data-nav-theme="light">
        <SectionLabel>Start with a clearer view</SectionLabel>
        <h2 className="display display--lg">Is this the right <span className="authority">engagement?</span></h2>
        <p className="lede">Begin with a focused, no-cost conversation about the operating problem and the first useful line of inquiry.</p>
        <Link className="button button--rust" href={service.cta.href}><span>{service.cta.label}</span><span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  )
}
