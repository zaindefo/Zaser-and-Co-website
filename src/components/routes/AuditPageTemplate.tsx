import type { AuditPage } from '../../content/types'
import { AuditAssessmentSheet } from '../consulting-artifacts'
import { SectionLabel } from '../editorial/SectionLabel'
import { LeadForm } from '../shared/LeadForm'

export function AuditPageTemplate({ audit }: { audit: AuditPage }) {
  return (
    <main>
      <header className="audit-hero" data-nav-theme="light"><span className="eyebrow">No cost. No commitment.</span><h1 className="display display--xl">{audit.title}</h1><p className="lede">{audit.subtitle}</p><p>{audit.description}</p></header>
      <section className="audit-dimensions section section--navy" data-nav-theme="dark">
        <SectionLabel light>What we examine</SectionLabel><h2 className="display display--lg">A structured first <span className="authority">view.</span></h2>
        <div className="audit-dimensions__layout"><div className="audit-dimensions__list">{audit.dimensions.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div><AuditAssessmentSheet audit={audit} tone="navy" /></div>
      </section>
      <section className="audit-process section section--white" data-nav-theme="light"><SectionLabel>How it begins</SectionLabel><div>{audit.process.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, '0')}</span><h2>{item}</h2></article>)}</div></section>
      <section className="audit-form section section--paper" data-nav-theme="light"><div><SectionLabel>Request your session</SectionLabel><h2 className="display display--lg">Tell us where the business <span className="authority">feels stuck.</span></h2><p className="lede">The form routes your request to the correct diagnostic. We respond by email.</p></div><div className="audit-form__card"><LeadForm inquiryType={audit.inquiryType} sourcePage={`/${audit.slug}`} /></div></section>
    </main>
  )
}
