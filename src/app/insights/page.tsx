import Link from 'next/link'
import { INSIGHTS } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights — Strategic Thinking for Growing Businesses',
  description:
    'Research, frameworks, and analysis from Zaser & Co. Financial strategy, operational performance, and AI implementation insights for SMEs.',
  alternates: { canonical: '/insights' },
}

export default function InsightsIndex() {
  return (
    <main style={{ background: '#F6EFE4', minHeight: '100vh' }}>
      <div style={{
        maxWidth: '920px', margin: '0 auto',
        padding: 'clamp(120px, 16vh, 200px) clamp(24px, 6vw, 80px) clamp(60px, 10vh, 120px)',
      }}>
        <p style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '11px',
          fontWeight: 500,
          color: '#516254',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '20px',
        }}>
          Insights
        </p>
        <h1 style={{
          fontFamily: 'var(--font-editorial-new)',
          fontSize: 'clamp(36px, 5.5vw, 56px)',
          fontWeight: 300,
          color: '#121613',
          lineHeight: 1.05,
          marginBottom: '20px',
        }}>
          The problems no one<br />talks about — until it&apos;s expensive.
        </h1>
        <p style={{
          fontFamily: 'var(--font-twk-lausanne)',
          fontSize: '17px',
          fontWeight: 350,
          color: '#516254',
          lineHeight: 1.65,
          maxWidth: '560px',
          marginBottom: 'clamp(48px, 7vh, 80px)',
        }}>
          Real patterns we see in growing businesses every week.
          Written to help you spot them before they cost you.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {INSIGHTS.map((insight) => (
            <Link
              key={insight.id}
              href={`/insights/${insight.id}`}
              style={{
                display: 'block',
                background: '#FFFDF8',
                border: '1px solid rgba(18,22,19,0.1)',
                borderRadius: '14px',
                padding: 'clamp(28px, 4vw, 44px) clamp(28px, 4vw, 48px)',
                textDecoration: 'none',
                transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
              }}
            >
              {/* Meta row */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                marginBottom: '18px', flexWrap: 'wrap',
              }}>
                <span style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#FFFDF8',
                  background: '#121613',
                  padding: '5px 12px',
                  borderRadius: '4px',
                }}>
                  {insight.tag}
                </span>
                <span style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#1a8a3e',
                  background: 'rgba(26,138,62,0.08)',
                  padding: '5px 12px',
                  borderRadius: '4px',
                }}>
                  {insight.category}
                </span>
                <span style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: '#93b799',
                  letterSpacing: '0.06em',
                }}>
                  {insight.readTime}
                </span>
              </div>

              {/* Headline */}
              <h2 style={{
                fontFamily: 'var(--font-editorial-new)',
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 400,
                color: '#121613',
                lineHeight: 1.2,
                marginBottom: '14px',
                whiteSpace: 'pre-line',
              }}>
                {insight.headline}
              </h2>

              {/* Excerpt */}
              <p style={{
                fontFamily: 'var(--font-twk-lausanne)',
                fontSize: '15px',
                fontWeight: 350,
                color: '#516254',
                lineHeight: 1.7,
                marginBottom: '20px',
              }}>
                {insight.execSummary}
              </p>

              {/* CTA */}
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-twk-lausanne)',
                fontSize: '14px',
                fontWeight: 550,
                color: '#2bee4b',
                letterSpacing: '0.02em',
              }}>
                Read article
                <span style={{ fontSize: '18px', lineHeight: 1 }}>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
