import Link from 'next/link'
import { INSIGHTS } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights — Strategic Thinking for Growing Businesses',
  description:
    'Research, frameworks, and analysis from Zaser & Co. Financial strategy, operational performance, and AI implementation insights for SMEs.',
}

export default function InsightsIndex() {
  return (
    <main style={{ background: '#F6EFE4', minHeight: '100vh' }}>
      <div style={{
        maxWidth: '860px', margin: '0 auto',
        padding: 'clamp(120px, 16vh, 200px) clamp(24px, 6vw, 80px) clamp(60px, 10vh, 120px)',
      }}>
        <p style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '11px',
          color: 'var(--z-chrome-dark, #5A5B66)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '20px',
        }}>
          Insights
        </p>
        <h1 style={{
          fontFamily: 'var(--font-editorial-new)',
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 300,
          color: '#0F1235',
          lineHeight: 1.1,
          marginBottom: '16px',
        }}>
          Strategic thinking<br />for growing businesses.
        </h1>
        <p style={{
          fontFamily: 'var(--font-twk-lausanne)',
          fontSize: '16px',
          fontWeight: 300,
          color: 'var(--z-chrome-dark, #5A5B66)',
          lineHeight: 1.6,
          maxWidth: '540px',
          marginBottom: 'clamp(48px, 7vh, 80px)',
        }}>
          Research, frameworks, and analysis from Zaser &amp; Co — written to help you make better decisions.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {INSIGHTS.map((insight) => (
            <Link
              key={insight.id}
              href={`/insights/${insight.id}`}
              style={{
                display: 'block',
                background: 'rgba(15,18,53,0.025)',
                border: '1px solid rgba(15,18,53,0.08)',
                borderRadius: '12px',
                padding: 'clamp(24px, 3.5vw, 40px) clamp(24px, 4vw, 48px)',
                textDecoration: 'none',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#1a8a3e',
                  background: 'rgba(26,138,62,0.08)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                }}>
                  {insight.category}
                </span>
                <span style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '11px',
                  color: 'var(--z-chrome-dark, #5A5B66)',
                  letterSpacing: '0.08em',
                }}>
                  {insight.readTime}
                </span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-editorial-new)',
                fontSize: 'clamp(22px, 2.5vw, 28px)',
                fontWeight: 400,
                color: '#0F1235',
                lineHeight: 1.25,
                marginBottom: '12px',
                whiteSpace: 'pre-line',
              }}>
                {insight.headline}
              </h2>
              <p style={{
                fontFamily: 'var(--font-twk-lausanne)',
                fontSize: '15px',
                fontWeight: 300,
                color: 'var(--z-chrome-dark, #5A5B66)',
                lineHeight: 1.6,
                marginBottom: '16px',
              }}>
                {insight.execSummary}
              </p>
              <span style={{
                fontFamily: 'var(--font-twk-lausanne)',
                fontSize: '14px',
                fontWeight: 500,
                color: '#1a8a3e',
              }}>
                Read article →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
