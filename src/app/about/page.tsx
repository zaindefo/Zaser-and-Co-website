import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { EngagementMethodSheet } from '../../components/consulting-artifacts'
import { SectionLabel } from '../../components/editorial/SectionLabel'

export const metadata: Metadata = {
  title: 'About',
  description: 'Zaser & Co is a Dhaka-based strategic and management consultancy built around diagnosis, implementation, and client ownership.',
  alternates: { canonical: '/about' },
}

const principles = [
  ['01', 'Fixed scope', 'The engagement is defined before work begins.'],
  ['02', 'Evidence first', 'Findings must be traceable to the business.'],
  ['03', 'Build where value exists', 'Technology follows the diagnosis.'],
  ['04', 'Leave the client stronger', 'Documentation and ownership stay usable by the team.'],
]

export default function AboutPage() {
  return (
    <main>
      <header className="about-hero" data-nav-theme="light">
        <SectionLabel>About Zaser &amp; Co</SectionLabel>
        <h1 className="display display--xl">Advisory that<br /><span className="authority">builds.</span></h1>
        <p className="lede">Growth creates complexity. Complexity hides waste. Technology without strategy can add more. Zaser finds what matters, builds the system, and leaves the client with a clearer operation.</p>
        <div className="about-hero__facts">
          <span>Established 2026</span><span>Dhaka, Bangladesh</span><span>Small &amp; medium businesses</span><span>Two productised engagements</span>
        </div>
      </header>
      <section className="about-media" data-nav-theme="light">
        <Image src="/images/editorial/complexity-path.webp" alt="A clear rust path moving through layered business systems" fill sizes="100vw" />
        <div><SectionLabel>The operating idea</SectionLabel><h2 className="display display--lg">Make information<br /><span className="authority">useful.</span></h2></div>
      </section>
      <section className="about-principles section section--navy" data-nav-theme="dark">
        <SectionLabel light>How we work</SectionLabel>
        <div>{principles.map(([number, title, description]) => <article key={number}><span>{number}</span><h2>{title}</h2><p>{description}</p></article>)}</div>
      </section>
      <section className="about-method section section--paper" data-nav-theme="light">
        <div><SectionLabel>Our role</SectionLabel><h2 className="display display--lg">Rigorous enough to challenge.<br /><span className="authority">Practical enough to use.</span></h2><p className="lede">Zaser serves operators who need a clear diagnosis and a tangible output their team can use.</p><Link className="button button--rust" href="/contact"><span>Start a conversation</span><span aria-hidden="true">↗</span></Link></div>
        <EngagementMethodSheet />
      </section>
    </main>
  )
}
