'use client'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { STOCKPULSE_MODULE } from '@/lib/constants'

function ModuleCard({ module, href, flip = false }: { module: any; href: string; flip?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const ctx = gsap.context(() => {
      const stroke = card.querySelector<HTMLElement>('.section-stroke')
      const words = card.querySelectorAll<HTMLElement>('.mc-word')
      const desc = card.querySelector<HTMLElement>('.mc-desc')
      const bullets = card.querySelectorAll<HTMLElement>('.mc-bullet')
      const quote = card.querySelector<HTMLElement>('.mc-quote')
      const cta = card.querySelector<HTMLElement>('.mc-cta')

      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: 'top 70%', once: true },
      })

      if (stroke) {
        tl.fromTo(stroke, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'none' })
      }
      if (words.length) {
        tl.from(words, { x: 80, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power4.out' }, '-=0.2')
      }
      if (desc) {
        tl.from(desc, { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      }
      bullets.forEach((bullet, i) => {
        tl.fromTo(bullet,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power3.inOut' },
          `-=${0.35 - i * 0.05}`,
        )
        const diamond = bullet.querySelector<HTMLElement>('.bullet-diamond')
        if (diamond) {
          tl.fromTo(diamond, { scale: 0 }, { scale: 1, duration: 0.2, ease: 'back.out(2)' }, '<')
        }
      })
      if (quote) {
        tl.from(quote, { opacity: 0, y: 16, duration: 0.4, ease: 'power2.out' }, '-=0.1')
      }
      if (cta) {
        tl.from(cta, { opacity: 0, y: 12, duration: 0.3, ease: 'power2.out' }, '-=0.1')
      }
    }, card)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={cardRef}
      style={{
        display: 'grid',
        gridTemplateColumns: flip ? '1fr 1fr' : '1fr 1fr',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'center',
        padding: 'clamp(48px, 8vh, 100px) 0',
        direction: flip ? 'rtl' : 'ltr',
      }}
      className="module-card-grid"
    >
      <div style={{ direction: 'ltr' }}>
        {/* Tag */}
        <span style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: 'var(--type-label)',
          color: 'var(--z-accent)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          {module.tag}
        </span>

        {/* Chrome stroke */}
        <div className="section-stroke" style={{ width: '100%', margin: '20px 0 28px' }} />

        {/* Display heading — Bebas word slam */}
        <h3 style={{ margin: '0 0 24px' }}>
          {module.headline.split(' ').map((word: string, i: number) => (
            <span
              key={i}
              className="mc-word"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-bebas)',
                fontSize: 'var(--type-display-accent)',
                color: '#fafffa',
                lineHeight: 1.05,
                letterSpacing: '0.02em',
                marginRight: '0.25em',
              }}
            >
              {word}
            </span>
          ))}
        </h3>

        {/* Description */}
        <p className="mc-desc" style={{
          fontFamily: 'var(--font-twk-lausanne)',
          fontWeight: 300,
          fontSize: 'var(--type-body)',
          color: 'var(--z-chrome-dark)',
          lineHeight: 1.8,
          maxWidth: '540px',
          marginBottom: '28px',
        }}>
          {module.description}
        </p>

        {/* Bullets with clip-path reveal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
          {module.features.map((f: any, i: number) => (
            <div
              key={i}
              className="mc-bullet"
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                clipPath: 'inset(0 100% 0 0)',
              }}
            >
              <span
                className="bullet-diamond"
                style={{
                  color: 'var(--z-accent)', marginTop: '4px', flexShrink: 0,
                  fontSize: '8px', display: 'inline-block', transform: 'scale(0)',
                }}
              >◆</span>
              <span style={{
                fontFamily: 'var(--font-twk-lausanne)',
                fontWeight: 350, fontSize: '14px',
                color: 'var(--z-chrome)', lineHeight: 1.6,
              }}>
                {f.text}
              </span>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <blockquote className="mc-quote" style={{
          borderLeft: '2px solid var(--z-accent)',
          paddingLeft: '20px',
          marginBottom: '32px',
          marginLeft: 0,
        }}>
          <p style={{
            fontFamily: 'var(--font-editorial-new)',
            fontStyle: 'italic',
            fontSize: '15px',
            color: 'var(--z-chrome-dark)',
            lineHeight: 1.6,
          }}>
            {module.quote}
          </p>
        </blockquote>

        {/* CTA */}
        <div className="mc-cta">
          <MagneticButton href={href} size="lg">
            Learn more →
          </MagneticButton>
        </div>
      </div>

      {/* Right — ghosted product name watermark */}
      <div
        className="hidden lg:flex"
        style={{
          direction: 'ltr',
          alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', userSelect: 'none',
        }}
        aria-hidden="true"
      >
        <span style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(80px, 14vw, 200px)',
          color: 'rgba(200,202,208,0.04)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          writingMode: 'vertical-lr',
          textOrientation: 'mixed',
        }}>
          {module.tag}
        </span>
      </div>
    </div>
  )
}

export function ModuleCards() {
  return (
    <section
      className="surface-scanlines"
      style={{
        background: 'var(--z-black)',
        position: 'relative',
        padding: '0 clamp(24px, 6vw, 80px)',
      }}
    >
      <style>{`
        @media (max-width: 1023px) {
          .module-card-grid { grid-template-columns: 1fr !important; direction: ltr !important; }
        }
      `}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <ModuleCard module={STOCKPULSE_MODULE} href="/stockpulse" />
      </div>
    </section>
  )
}
