import Image from 'next/image'
import Link from 'next/link'
import type { ComponentType } from 'react'
import {
  AIReadinessSheet,
  CostLeakageScan,
  CostStructureMap,
  ImplementationWorkflowMap,
  NinetyDayRoadmap,
  OpportunityPriorityMatrix,
  ValueStreamExample,
  type ArtifactBaseProps,
} from '../components/consulting-artifacts'
import { Reveal } from '../components/editorial/Reveal'
import { SectionLabel } from '../components/editorial/SectionLabel'
import { CinematicHero } from '../components/home/CinematicHero'
import { MethodStory } from '../components/home/MethodStory'
import { LeadForm } from '../components/shared/LeadForm'
import { ENGAGEMENT_OUTPUTS } from '../content/outputs'
import { INSIGHTS } from '../content/insights'
import { SERVICES } from '../content/services'
import type { EngagementOutput } from '../content/types'

const proofDocuments = [
  { label: 'AI readiness scorecard', document: <AIReadinessSheet /> },
  { label: 'Opportunity priority matrix', document: <OpportunityPriorityMatrix /> },
  { label: 'Cost structure map', document: <CostStructureMap /> },
  { label: 'Value-stream process map', document: <ValueStreamExample example={INSIGHTS[1].example} /> },
  { label: '90-day improvement roadmap', document: <NinetyDayRoadmap /> },
] as const

const outputDocuments: Record<EngagementOutput['artifact'], ComponentType<ArtifactBaseProps>> = {
  'ai-readiness': AIReadinessSheet,
  'opportunity-priority': OpportunityPriorityMatrix,
  'implementation-workflow': ImplementationWorkflowMap,
  'cost-leakage': CostLeakageScan,
  'cost-structure': CostStructureMap,
  'ninety-day-roadmap': NinetyDayRoadmap,
}

export default function HomePage() {
  return (
    <main>
      <CinematicHero />

      <section id="services" className="services-chapter section section--paper" data-nav-theme="light">
        <Reveal className="services-chapter__intro">
          <SectionLabel>Our services</SectionLabel>
          <h2 className="display display--lg">Two engagements.<br /><span className="authority">Built to produce something real.</span></h2>
        </Reveal>
        <div className="service-panels">
          {SERVICES.map((service, index) => (
            <Link key={service.slug} className={`service-panel service-panel--${index + 1}`} href={`/services/${service.slug}`}>
              <Image src={index === 0 ? '/images/editorial/ai-workflow.webp' : '/images/editorial/operations-map.webp'} alt={index === 0 ? 'A hand structuring an AI readiness workflow and opportunity matrix' : 'A hand mapping operational cost, process, and improvement priorities'} fill sizes="(max-width: 800px) 100vw, 50vw" />
              <div className="service-panel__veil" />
              <span className="service-panel__number">{service.number}</span>
              <div className="service-panel__copy">
                <span>{service.title}</span>
                <h3>{service.statement}</h3>
                <p>{service.description}</p>
              </div>
              <span className="service-panel__arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <MethodStory />

      <section className="proof-chapter section section--white" data-nav-theme="light">
        <div className="proof-chapter__heading">
          <SectionLabel>What the work produces</SectionLabel>
          <h2 className="display display--lg">Clarity you can use<br /><span className="authority">Monday morning.</span></h2>
        </div>
        <div className="proof-documents">
          {proofDocuments.map((item, index) => (
            <article key={item.label} className="proof-document">
              <span>{String(index + 1).padStart(2, '0')} / {item.label}</span>
              {item.document}
            </article>
          ))}
        </div>
        <div className="principles">
          {[
            ['01', 'Fixed scope', 'Know what is being built before work begins.'],
            ['02', 'Evidence first', 'Findings must be traceable to the operation.'],
            ['03', 'Build where value exists', 'Technology follows the diagnosis.'],
            ['04', 'Leave the client stronger', 'Systems, documentation, and ownership remain usable by the team.'],
          ].map(([number, title, description]) => (
            <div className="principle" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></div>
          ))}
        </div>
      </section>

      <section className="outputs-chapter section section--paper" data-nav-theme="light">
        <SectionLabel>Inside an engagement</SectionLabel>
        <h2 className="display display--lg">See what <span className="authority">advisory that builds</span> actually means.</h2>
        <div className="output-dossier-list">
          {ENGAGEMENT_OUTPUTS.map((output, index) => {
            const OutputDocument = outputDocuments[output.artifact]
            return (
              <article className="output-dossier" key={output.title}>
                <OutputDocument />
                <span className="eyebrow">{String(index + 1).padStart(2, '0')} / {output.label}</span>
                <h3>{output.title}</h3>
                <p>{output.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="home-insights section section--white" data-nav-theme="light">
        <div className="home-insights__heading">
          <SectionLabel>Insights</SectionLabel>
          <h2 className="display display--lg">Ideas for operators,<br /><span className="authority">not spectators.</span></h2>
          <Link className="text-link" href="/insights">View all insights ↗</Link>
        </div>
        <div className="home-insights__grid">
          {INSIGHTS.map((insight, index) => (
            <Link className={index === 0 ? 'insight-teaser insight-teaser--featured' : 'insight-teaser'} href={`/insights/${insight.slug}`} key={insight.slug}>
              <div className="insight-teaser__image"><Image src={insight.image} alt="" fill sizes={index === 0 ? '(max-width: 800px) 100vw, 66vw' : '(max-width: 800px) 100vw, 34vw'} /></div>
              <div className="insight-teaser__meta"><span>{insight.category}</span><span>{insight.readTime}</span></div>
              <h3>{insight.title}</h3>
              <span className="insight-teaser__arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-contact section section--paper" data-nav-theme="light">
        <div className="home-contact__copy">
          <SectionLabel>Start a conversation</SectionLabel>
          <h2 className="display display--lg">Where does the business <span className="authority">feel stuck?</span></h2>
          <p className="lede">Every engagement begins with a focused conversation about the problem and whether Zaser is the right fit.</p>
        </div>
        <div className="home-contact__form"><LeadForm inquiryType="general" sourcePage="/" /></div>
      </section>
    </main>
  )
}
