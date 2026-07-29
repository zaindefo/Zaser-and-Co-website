'use client'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { RadarChart } from '@/components/shared/RadarChart'

const DIMENSIONS = [
  { label: 'Financial visibility', desc: 'Do you know your real margins, break-even, and cash position?' },
  { label: 'Operational efficiency', desc: 'Are your processes documented, consistent, and scalable?' },
  { label: 'AI readiness', desc: 'Can your business adopt AI tools effectively right now?' },
  { label: 'Growth trajectory', desc: 'Is your revenue growing faster than your costs?' },
  { label: 'Team capability', desc: 'Can your team operate independently with the right systems?' },
]

export function ClarityScore() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const stroke = section.querySelector<HTMLElement>('.section-stroke')
      const words = section.querySelectorAll<HTMLElement>('.cs-word')
      const dims = section.querySelectorAll<HTMLElement>('.cs-dim')
      const scoreBox = section.querySelector<HTMLElement>('.cs-score')

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      })

      if (stroke) {
        tl.fromTo(stroke, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'none' })
      }
      if (words.length) {
        tl.from(words, { x: 80, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power4.out' }, '-=0.2')
      }
      if (scoreBox) {
        tl.from(scoreBox, { opacity: 0, scale: 0.9, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.2')
      }
      if (dims.length) {
        tl.from(dims, { opacity: 0, y: 16, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, '-=0.2')
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-paper-topo"
      style={{ position: 'relative', padding: 'clamp(60px, 10vh, 120px) clamp(24px, 6vw, 80px)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-stroke" style={{ width: '100%', marginBottom: '48px' }} />

        {/* Tag */}
        <p style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: 'var(--type-label)',
          color: 'var(--color-voltage)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          Clarity Score™
        </p>

        {/* Display heading */}
        <h2 style={{ margin: '0 0 16px' }}>
          {['KNOW', 'WHERE', 'YOU', 'STAND'].map((word) => (
            <span
              key={word}
              className="cs-word"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-bebas)',
                fontSize: 'var(--type-display-section)',
                color: 'var(--color-obsidian-ink)',
                lineHeight: 1,
                letterSpacing: '0.02em',
                marginRight: '0.3em',
              }}
            >
              {word}
            </span>
          ))}
        </h2>

        <p style={{
          fontFamily: 'var(--font-editorial-new)',
          fontStyle: 'italic',
          fontSize: 'var(--type-body-lg)',
          color: 'var(--color-sage)',
          lineHeight: 1.6,
          maxWidth: '600px',
          marginBottom: 'clamp(40px, 6vh, 72px)',
        }}>
          Every project starts with a Clarity Score — a complimentary 30-minute assessment of your business across five dimensions. You walk away knowing your real numbers, your biggest gaps, and where the highest-impact improvements are. Whether you work with us after that or not, the clarity is yours to keep.
        </p>

        {/* Two-column: radar + score */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(32px, 4vw, 64px)',
          alignItems: 'center',
          marginBottom: 'clamp(40px, 6vh, 72px)',
        }}
          className="cs-grid"
        >
          <RadarChart />

          <div className="cs-score" style={{
            border: '1px solid var(--color-mist)',
            borderRadius: '14px',
            padding: 'clamp(24px, 3vh, 40px)',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'var(--font-twk-lausanne)',
              fontSize: '14px',
              color: 'var(--color-sage)',
              marginBottom: '8px',
            }}>
              Typical starting score
            </p>
            <p style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(64px, 10vw, 120px)',
              color: 'var(--color-obsidian-ink)',
              lineHeight: 1,
              marginBottom: '8px',
            }}>
              20–35
            </p>
            <p style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '12px',
              color: 'var(--color-sage)',
              letterSpacing: '0.05em',
            }}>
              That&apos;s not a failure — it&apos;s a starting point
            </p>
          </div>
        </div>

        {/* Five dimensions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '24px',
          borderTop: '1px solid var(--color-mist)',
          paddingTop: '32px',
          marginBottom: '40px',
        }}
          className="cs-dims-grid"
        >
          {DIMENSIONS.map((dim) => (
            <div key={dim.label} className="cs-dim">
              <p style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '11px',
                color: 'var(--color-voltage)',
                letterSpacing: '0.05em',
                marginBottom: '8px',
                textTransform: 'uppercase',
              }}>
                {dim.label}
              </p>
              <p style={{
                fontFamily: 'var(--font-twk-lausanne)',
                fontSize: '13px',
                color: 'var(--color-sage)',
                lineHeight: 1.5,
              }}>
                {dim.desc}
              </p>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 1023px) {
            .cs-grid { grid-template-columns: 1fr !important; }
            .cs-dims-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .cs-dims-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        <div style={{ textAlign: 'center' }}>
          <MagneticButton href="/contact" size="lg">
            Book your Clarity Score →
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
