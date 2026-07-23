'use client'
import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { INSIGHTS } from '@/lib/constants'

export function Insights() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>('.insight-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
            delay: i * 0.12,
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          },
        )
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="insights"
      style={{ background: '#F6EFE4', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{
        position: 'relative', zIndex: 1,
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 80px)',
      }}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>

          {/* Section header */}
          <div style={{ marginBottom: 'clamp(48px, 7vh, 80px)' }}>
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
            <h2 style={{
              fontFamily: 'var(--font-editorial-new)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 300,
              color: '#121613',
              lineHeight: 1.05,
              marginBottom: '20px',
            }}>
              The problems no one<br />talks about — until it&apos;s expensive.
            </h2>
            <p style={{
              fontFamily: 'var(--font-twk-lausanne)',
              fontSize: '17px',
              fontWeight: 350,
              color: '#516254',
              lineHeight: 1.65,
              maxWidth: '560px',
            }}>
              Real patterns we see in growing businesses every week.
              Written to help you spot them before they cost you.
            </p>
          </div>

          {/* Article cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '56px' }}>
            {INSIGHTS.map((insight) => (
              <Link
                key={insight.id}
                href={`/insights/${insight.id}`}
                className="insight-card"
                style={{
                  display: 'block',
                  background: '#FFFDF8',
                  border: '1px solid rgba(18,22,19,0.1)',
                  borderRadius: '14px',
                  padding: 'clamp(28px, 4vw, 44px) clamp(28px, 4vw, 48px)',
                  textDecoration: 'none',
                  opacity: 0,
                  transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(43,238,75,0.35)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(18,22,19,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(18,22,19,0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Meta row: tag + category + reading time */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '18px',
                  flexWrap: 'wrap',
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
                <h3 style={{
                  fontFamily: 'var(--font-editorial-new)',
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  fontWeight: 400,
                  color: '#121613',
                  lineHeight: 1.2,
                  marginBottom: '14px',
                  whiteSpace: 'pre-line',
                }}>
                  {insight.headline}
                </h3>

                {/* Excerpt */}
                <p style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontSize: '15px',
                  fontWeight: 350,
                  color: '#516254',
                  lineHeight: 1.7,
                  marginBottom: '20px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                  overflow: 'hidden',
                }}>
                  {insight.execSummary}
                </p>

                {/* Read link */}
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

          {/* View all link */}
          <div style={{ textAlign: 'center' }}>
            <Link
              href="/insights"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-twk-lausanne)',
                fontSize: '15px',
                fontWeight: 550,
                color: '#121613',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                padding: '12px 28px',
                border: '1px solid rgba(18,22,19,0.15)',
                borderRadius: '8px',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#121613'
                e.currentTarget.style.color = '#FFFDF8'
                e.currentTarget.style.borderColor = '#121613'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#121613'
                e.currentTarget.style.borderColor = 'rgba(18,22,19,0.15)'
              }}
            >
              View all insights →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
