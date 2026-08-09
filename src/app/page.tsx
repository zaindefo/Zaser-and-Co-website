import Image from 'next/image'
import Link from 'next/link'
import { ArtifactVisual } from '../components/editorial/ArtifactVisual'
import { Reveal } from '../components/editorial/Reveal'
import { SectionLabel } from '../components/editorial/SectionLabel'
import { MethodStory } from '../components/home/MethodStory'
import { LeadForm } from '../components/shared/LeadForm'
import { ENGAGEMENT_OUTPUTS } from '../content/outputs'
import { INSIGHTS } from '../content/insights'
import { SERVICES } from '../content/services'

const artifactLabels = [
  ['scorecard', 'AI readiness scorecard'],
  ['matrix', 'Opportunity priority matrix'],
  ['cost-map', 'Cost structure map'],
  ['process', 'Value-stream process map'],
  ['roadmap', '90-day improvement roadmap'],
] as const

export default function HomePage() {
  return (
    <main>
      <section className="home-hero" data-nav-theme="light">
        <div className="home-hero__copy">
          <span className="eyebrow">Strategic &amp; management consultancy</span>
          <h1 className="display display--hero">
            <span className="home-hero__rust">Your business</span>
            <span>deserves</span>
            <span className="home-hero__rust">a sharper</span>
            <span>strategy.</span>
          </h1>
          <p>Zaser &amp; Co helps small and medium businesses create financial clarity, operational intelligence, and practical AI systems around the business they actually run.</p>
          <div className="home-hero__actions">
            <Link className="button button--rust" href="/contact"><span>Request your free session</span><span aria-hidden="true">↗</span></Link>
            <a className="text-link" href="#services">See how it works <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="home-hero__media">
          <Image src="/images/editorial/hero-strategist.webp" alt="A strategist reviewing financial charts and a workflow map at a desk" fill priority sizes="(max-width: 800px) 100vw, 58vw" />
          <span className="media-callout media-callout--one">Financial intelligence</span>
          <span className="media-callout media-callout--two">Operational clarity</span>
          <span className="media-callout media-callout--three">AI-powered systems</span>
        </div>
      </section>

      <section className="view-chapter" data-nav-theme="light">
        <Image src="/images/editorial/complexity-path.webp" alt="An editorial map showing a clear rust path moving through layered operational complexity" fill sizes="100vw" />
        <div className="view-chapter__shade" />
        <div className="view-chapter__copy">
          <SectionLabel>The Zaser view</SectionLabel>
          <h2 className="display display--xl">Growth should translate into <span className="authority">performance.</span></h2>
          <p>More revenue does not automatically create a stronger operation. More tools do not automatically create a smarter one. We find the gaps between strategy, systems, and execution.</p>
        </div>
      </section>

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
        <div className="artifact-field">
          {artifactLabels.map(([type, label], index) => (
            <div key={type} className={`artifact-field__item artifact-field__item--${index + 1}`}>
              <span>{String(index + 1).padStart(2, '0')} / {label}</span>
              <ArtifactVisual type={type} label={label} />
            </div>
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
        <div className="output-rail">
          {ENGAGEMENT_OUTPUTS.map((output, index) => (
            <article className="output-card" key={output.title}>
              <ArtifactVisual type={output.artifact} label={output.title} />
              <span className="eyebrow">{String(index + 1).padStart(2, '0')} / {output.label}</span>
              <h3>{output.title}</h3>
              <p>{output.description}</p>
            </article>
          ))}
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
