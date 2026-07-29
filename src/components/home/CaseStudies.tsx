'use client'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { CASE_STUDY_SNAPSHOTS } from '@/lib/constants'

export function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>('.case-card').forEach((card, i) => {
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
              Engagement Snapshots
            </p>
            <h2 style={{
              fontFamily: 'var(--font-editorial-new)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 300,
              color: '#121613',
              lineHeight: 1.05,
              marginBottom: '20px',
            }}>
              What changed — and how fast.
            </h2>
            <p style={{
              fontFamily: 'var(--font-twk-lausanne)',
              fontSize: '17px',
              fontWeight: 350,
              color: '#516254',
              lineHeight: 1.65,
              maxWidth: '560px',
            }}>
              Real engagements with real businesses. Names anonymised, numbers real.
            </p>
          </div>

          {/* Case study cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {CASE_STUDY_SNAPSHOTS.map((cs) => (
              <div
                key={cs.client}
                className="case-card"
                style={{
                  background: '#FFFDF8',
                  border: '1px solid rgba(18,22,19,0.1)',
                  borderRadius: '14px',
                  padding: 'clamp(28px, 4vw, 44px) clamp(28px, 4vw, 48px)',
                  opacity: 0,
                }}
              >
                {/* Meta row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
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
                    {cs.industry}
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
                    {cs.service}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#93b799',
                    letterSpacing: '0.06em',
                  }}>
                    {cs.timeframe}
                  </span>
                </div>

                {/* Client + location */}
                <h3 style={{
                  fontFamily: 'var(--font-editorial-new)',
                  fontSize: 'clamp(22px, 3vw, 28px)',
                  fontWeight: 400,
                  color: '#121613',
                  lineHeight: 1.2,
                  marginBottom: '6px',
                }}>
                  {cs.client} — {cs.location}
                </h3>

                {/* Revenue context */}
                <p style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '12px',
                  color: '#93b799',
                  marginBottom: '16px',
                }}>
                  {cs.revenue}
                </p>

                {/* Finding */}
                <p style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontSize: '15px',
                  fontWeight: 350,
                  color: '#516254',
                  lineHeight: 1.7,
                  marginBottom: '20px',
                }}>
                  {cs.finding}
                </p>

                {/* Outcome */}
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '12px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(18,22,19,0.08)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: 'clamp(24px, 3vw, 32px)',
                    fontWeight: 700,
                    color: '#1a8a3e',
                    letterSpacing: '-0.02em',
                  }}>
                    {cs.outcome}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-twk-lausanne)',
                    fontSize: '13px',
                    fontWeight: 350,
                    color: '#516254',
                  }}>
                    {cs.outcomeLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
