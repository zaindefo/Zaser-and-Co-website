'use client'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { PERSPECTIVES, MARKET_INTELLIGENCE } from '@/lib/constants'

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const stroke = section.querySelector<HTMLElement>('.section-stroke')
      const words = section.querySelectorAll<HTMLElement>('.tm-word')
      const cards = section.querySelectorAll<HTMLElement>('.tm-card')
      const stats = section.querySelectorAll<HTMLElement>('.tm-stat')

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      })

      if (stroke) tl.fromTo(stroke, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'none' })
      if (words.length) tl.from(words, { x: 80, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power4.out' }, '-=0.2')
      if (cards.length) tl.from(cards, { opacity: 0, y: 24, duration: 0.5, stagger: 0.12, ease: 'power2.out' }, '-=0.3')
      if (stats.length) tl.from(stats, { opacity: 0, y: 16, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, '-=0.2')
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="patterns"
      ref={sectionRef}
      className="surface-scanlines"
      style={{
        background: 'var(--z-surface, #141520)',
        position: 'relative',
        padding: 'clamp(60px, 10vh, 120px) clamp(24px, 6vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div className="section-stroke" style={{ width: '100%', marginBottom: '48px' }} />

        <p style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: 'var(--type-label)',
          color: 'var(--z-accent)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          Patterns
        </p>

        <h2 style={{ margin: '0 0 clamp(40px, 6vh, 72px)' }}>
          {['WHAT', 'THE', 'NUMBERS', 'SAY'].map((word) => (
            <span
              key={word}
              className="tm-word"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-bebas)',
                fontSize: 'var(--type-display-accent)',
                color: 'var(--z-chrome-peak)',
                lineHeight: 1.05,
                letterSpacing: '0.02em',
                marginRight: '0.3em',
              }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Editorial cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: 'clamp(48px, 8vh, 80px)',
        }}
          className="tm-cards-grid"
        >
          {PERSPECTIVES.map((item, i) => (
            <div
              key={i}
              className="tm-card"
              style={{
                border: '1px solid var(--z-border)',
                borderRadius: '14px',
                padding: 'clamp(20px, 3vh, 32px)',
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-twk-lausanne)',
                fontWeight: 600,
                fontSize: '18px',
                color: 'var(--z-chrome-peak)',
                lineHeight: 1.3,
                marginBottom: '12px',
              }}>
                {item.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-twk-lausanne)',
                fontWeight: 300,
                fontSize: '14px',
                color: 'var(--z-chrome-dark)',
                lineHeight: 1.7,
              }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Market intelligence */}
        <p style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: 'var(--type-label)',
          color: 'var(--z-chrome-dark)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: '28px',
        }}>
          Market Intelligence
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}
          className="tm-stats-grid"
        >
          {MARKET_INTELLIGENCE.map((m, i) => (
            <div
              key={i}
              className="tm-stat"
              style={{
                border: '1px solid var(--z-border)',
                borderRadius: '14px',
                padding: '24px',
                textAlign: 'center',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                color: 'var(--z-accent)',
                lineHeight: 1,
                marginBottom: '8px',
              }}>
                {m.figure}
              </p>
              <p style={{
                fontFamily: 'var(--font-twk-lausanne)',
                fontSize: '12px',
                color: 'var(--z-chrome)',
                lineHeight: 1.4,
                marginBottom: '6px',
              }}>
                {m.label}
              </p>
              <p style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '10px',
                color: 'var(--z-chrome-dark)',
              }}>
                {m.source}
              </p>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) {
            .tm-cards-grid { grid-template-columns: 1fr !important; }
            .tm-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
