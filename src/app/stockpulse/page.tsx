import type { Metadata } from 'next'
import Link from 'next/link'
import { ArtifactVisual } from '../../components/editorial/ArtifactVisual'
import { SectionLabel } from '../../components/editorial/SectionLabel'

export const metadata: Metadata = {
  title: 'StockPulse | Operational Intelligence Example',
  description: 'An illustrative inventory-intelligence system showing the kind of practical operational tooling a Zaser engagement can build.',
  alternates: { canonical: '/stockpulse' },
}

const signals = [['Velocity', 'Changing'], ['Reorder pressure', 'Review'], ['Idle stock', 'Investigate']]
const rows = [['Core line', 'Consistent', 'Balanced', 'Monitor'], ['Seasonal line', 'Slowing', 'High', 'Review'], ['New line', 'Emerging', 'Limited', 'Watch'], ['Long-tail line', 'Low', 'High', 'Investigate']]

export default function StockPulsePage() {
  return (
    <main>
      <header className="stock-hero" data-nav-theme="dark"><span className="eyebrow eyebrow--light">Operational system example</span><h1 className="display display--xl">Stock<span>Pulse</span></h1><p className="lede">A practical inventory-intelligence concept that turns stock movement into clearer reorder, cash, and attention decisions.</p><div className="example-notice">Illustrative interface. StockPulse is an example output, not a separate consulting service or a client result.</div></header>
      <section className="stock-dashboard section section--navy" data-nav-theme="dark"><div className="stock-dashboard__frame"><div className="stock-dashboard__top"><span>Inventory operating view</span><span>Example data</span></div><div className="stock-dashboard__signals">{signals.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="stock-dashboard__table"><div><span>Item group</span><span>Movement</span><span>Coverage</span><span>Signal</span></div>{rows.map((row) => <div key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}</div></div></section>
      <section className="stock-story section section--paper" data-nav-theme="light"><div><SectionLabel>What it demonstrates</SectionLabel><h2 className="display display--lg">A system should improve the <span className="authority">next decision.</span></h2><p className="lede">StockPulse demonstrates the output philosophy behind Zaser: diagnose the operating question, connect the right signals, and leave the team with something usable.</p><Link className="button button--rust" href="/services/management-operations"><span>Explore operations strategy</span><span aria-hidden="true">↗</span></Link></div><ArtifactVisual type="cost-map" label="Illustrative inventory velocity and cash exposure dashboard" /></section>
      <section className="stock-link section section--white" data-nav-theme="light"><SectionLabel>Where it belongs</SectionLabel><h2 className="display display--lg">A possible output.<br /><span className="authority">One of two engagements.</span></h2><p className="lede">The operational diagnosis determines whether inventory intelligence is the right system to build. The commercial engagement remains Management &amp; Operations Strategy or AI Audit &amp; Implementation.</p><div><Link href="/services/management-operations">Management &amp; Operations Strategy ↗</Link><Link href="/services/ai-audit-implementation">AI Audit &amp; Implementation ↗</Link></div></section>
    </main>
  )
}
