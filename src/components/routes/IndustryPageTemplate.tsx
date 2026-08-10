import Link from 'next/link'
import type { IndustryPage } from '../../content/types'
import { IndustryDiagnosticMap } from '../consulting-artifacts'
import { SectionLabel } from '../editorial/SectionLabel'
import { SERVICES } from '../../content/services'

export function IndustryPageTemplate({ industry }: { industry: IndustryPage }) {
  return (
    <main>
      <header className="page-hero" data-nav-theme="light">
        <div className="page-hero__grid">
          <div className="page-hero__copy"><span className="eyebrow">Industry perspective</span><h1 className="display display--xl">{industry.title}</h1><p className="lede">{industry.headline}</p></div>
          <div className="page-hero__meta"><p>{industry.intro}</p><span>Two productised engagements</span><span>Fixed scope &amp; deliverables</span><span>Evidence-led diagnosis</span></div>
        </div>
      </header>
      <section className="industry-tensions section section--navy" data-nav-theme="dark">
        <SectionLabel light>Operating tensions</SectionLabel>
        <h2 className="display display--lg">See the system,<br /><span className="authority">not isolated symptoms.</span></h2>
        <div className="industry-tensions__grid">{industry.tensions.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
      </section>
      <section className="industry-diagnostic section section--paper" data-nav-theme="light">
        <div><SectionLabel>Diagnostic view</SectionLabel><h2 className="display display--lg">Make the operation <span className="authority">legible.</span></h2><ol>{industry.diagnostic.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ol></div>
        <IndustryDiagnosticMap industry={industry} />
      </section>
      <section className="industry-services section section--white" data-nav-theme="light">
        <SectionLabel>Relevant engagements</SectionLabel>
        <div className="industry-services__grid">{SERVICES.map((service) => <Link href={`/services/${service.slug}`} key={service.slug}><span>{service.number}</span><h2 className="display display--md">{service.title}</h2><p>{service.description}</p><strong>Explore the engagement ↗</strong></Link>)}</div>
      </section>
      <section className="route-cta section section--paper" data-nav-theme="light"><SectionLabel>Free business audit</SectionLabel><h2 className="display display--lg">Start with the <span className="authority">right question.</span></h2><p className="lede">Share where the operation feels unclear. We’ll identify the most useful first line of inquiry and whether Zaser fits.</p><Link className="button button--rust" href="/free-business-audit"><span>Request your audit</span><span aria-hidden="true">↗</span></Link></section>
    </main>
  )
}
