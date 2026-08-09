import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SectionLabel } from '../../components/editorial/SectionLabel'
import { INSIGHTS } from '../../content/insights'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Ideas and operating frameworks for leaders building clearer businesses.',
  alternates: { canonical: '/insights' },
}

export default function InsightsPage() {
  return (
    <main>
      <header className="insights-hero" data-nav-theme="light">
        <SectionLabel>Insights</SectionLabel>
        <h1 className="display display--xl">Ideas for operators,<br /><span className="authority">not spectators.</span></h1>
        <p className="lede">Practical thinking about margin, operations, and AI implementation, written to improve the next decision.</p>
      </header>
      <section className="insights-index section section--white" data-nav-theme="light">
        {INSIGHTS.map((insight, index) => (
          <Link className={`insights-index__item${index === 0 ? ' insights-index__item--featured' : ''}`} href={`/insights/${insight.slug}`} key={insight.slug}>
            <div className="insights-index__image"><Image src={insight.image} alt="" fill priority={index === 0} sizes={index === 0 ? '(max-width: 900px) 100vw, 62vw' : '(max-width: 900px) 100vw, 38vw'} /></div>
            <div className="insights-index__meta"><span>{insight.number}</span><span>{insight.category}</span><span>{insight.readTime}</span></div>
            <h2>{insight.title}</h2><p>{insight.summary}</p><strong>Read the insight ↗</strong>
          </Link>
        ))}
      </section>
    </main>
  )
}
