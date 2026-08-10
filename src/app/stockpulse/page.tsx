import type { Metadata } from 'next'
import Link from 'next/link'
import { StockPulseEvidenceSheet } from '../../components/consulting-artifacts'
import { SectionLabel } from '../../components/editorial/SectionLabel'

export const metadata: Metadata = {
  title: 'StockPulse | Operational Intelligence Example',
  description: 'An illustrative inventory-intelligence system showing the kind of practical operational tooling a Zaser engagement can build.',
  alternates: { canonical: '/stockpulse' },
}

export default function StockPulsePage() {
  return (
    <main>
      <header className="stock-hero" data-nav-theme="dark"><span className="eyebrow eyebrow--light">Operational system example</span><h1 className="display display--xl">Stock<span>Pulse</span></h1><p className="lede">A practical inventory-intelligence concept that turns stock movement into clearer reorder, cash, and attention decisions.</p><div className="example-notice">Illustrative interface. StockPulse is an example output, not a separate consulting service or a client result.</div></header>
      <section className="stock-evidence section section--navy" data-nav-theme="dark"><StockPulseEvidenceSheet tone="navy" /></section>
      <section className="stock-story section section--paper" data-nav-theme="light"><div><SectionLabel>What it demonstrates</SectionLabel><h2 className="display display--lg">A system should improve the <span className="authority">next decision.</span></h2><p className="lede">StockPulse demonstrates the output philosophy behind Zaser: diagnose the operating question, connect the right signals, and leave the team with something usable.</p><Link className="button button--rust" href="/services/management-operations"><span>Explore operations strategy</span><span aria-hidden="true">↗</span></Link></div></section>
      <section className="stock-link section section--white" data-nav-theme="light"><SectionLabel>Where it belongs</SectionLabel><h2 className="display display--lg">A possible output.<br /><span className="authority">One of two engagements.</span></h2><p className="lede">The operational diagnosis determines whether inventory intelligence is the right system to build. The commercial engagement remains Management &amp; Operations Strategy or AI Audit &amp; Implementation.</p><div><Link href="/services/management-operations">Management &amp; Operations Strategy ↗</Link><Link href="/services/ai-audit-implementation">AI Audit &amp; Implementation ↗</Link></div></section>
    </main>
  )
}
