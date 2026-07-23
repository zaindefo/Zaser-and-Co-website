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
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
            delay: i * 0.1,
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
        padding: 'clamp(60px, 10vh, 120px) clamp(24px, 6vw, 80px)',
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          {/* Section header */}
          <div style={{ marginBottom: 'clamp(48px, 7vh, 80px)' }}>
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
            <h2 style={{
              fontFamily: 'var(--font-editorial-new)',
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              fontWeight: 300,
              color: '#0F1235',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}>
              Strategic thinking<br />for growing businesses.
            </h2>
            <p style={{
              fontFamily: 'var(--font-twk-lausanne)',
              fontSize: '16px',
              fontWeight: 300,
              color: 'var(--z-chrome-dark, #5A5B66)',
              lineHeight: 1.6,
              maxWidth: '540px',
            }}>
              Research, frameworks, and analysis from Zaser &amp; Co — written to help you make better decisions.
            </p>
          </div>

          {/* Article cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
            {INSIGHTS.map((insight) => (
              <Link
                key={insight.id}
                href={`/insights/${insight.id}`}
                className="insight-card"
                style={{
                  display: 'block',
                  background: 'rgba(15,18,53,0.025)',
                  border: '1px solid rgba(15,18,53,0.08)',
                  borderRadius: '12px',
                  padding: 'clamp(24px, 3.5vw, 40px) clamp(24px, 4vw, 48px)',
                  textDecoration: 'none',
                  opacity: 0,
                  transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(15,18,53,0.2)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(15,18,53,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(15,18,53,0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Meta: category + reading time */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}>
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

                {/* Headline */}
                <h3 style={{
                  fontFamily: 'var(--font-editorial-new)',
                  fontSize: 'clamp(22px, 2.5vw, 28px)',
                  fontWeight: 400,
                  color: '#0F1235',
                  lineHeight: 1.25,
                  marginBottom: '12px',
                  whiteSpace: 'pre-line',
                }}>
                  {insight.headline}
                </h3>

                {/* Excerpt */}
                <p style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontSize: '15px',
                  fontWeight: 300,
                  color: 'var(--z-chrome-dark, #5A5B66)',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                  overflow: 'hidden',
                }}>
                  {insight.execSummary}
                </p>

                {/* Read link */}
                <span style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#1a8a3e',
                  letterSpacing: '0.02em',
                }}>
                  Read article →
                </span>
              </Link>
            ))}
          </div>

          {/* View all link */}
          <div style={{ textAlign: 'center' }}>
            <Link
              href="/insights"
              style={{
                fontFamily: 'var(--font-twk-lausanne)',
                fontSize: '14px',
                fontWeight: 500,
                color: '#1a8a3e',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              View all insights →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
