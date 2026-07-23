'use client'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { FOUNDER } from '@/lib/constants'

export function Founder() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const stroke = section.querySelector<HTMLElement>('.section-stroke')
      const words = section.querySelectorAll<HTMLElement>('.fd-word')
      const paras = section.querySelectorAll<HTMLElement>('.fd-para')
      const quote = section.querySelector<HTMLElement>('.fd-quote')

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      })

      if (stroke) tl.fromTo(stroke, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'none' })
      if (words.length) tl.from(words, { x: 80, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power4.out' }, '-=0.2')
      if (paras.length) tl.from(paras, { opacity: 0, y: 20, duration: 0.5, stagger: 0.15, ease: 'power2.out' }, '-=0.2')
      if (quote) tl.from(quote, { opacity: 0, y: 16, duration: 0.4, ease: 'power2.out' }, '-=0.1')
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-paper-topo"
      style={{ position: 'relative', padding: 'clamp(60px, 10vh, 120px) clamp(24px, 6vw, 80px)' }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="section-stroke" style={{ width: '100%', marginBottom: '48px' }} />

        <p style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: 'var(--type-label)',
          color: 'var(--color-voltage)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          The consultancy
        </p>

        <h2 style={{ margin: '0 0 12px' }}>
          {['THE', 'CONSULTANCY'].map((word) => (
            <span
              key={word}
              className="fd-word"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-bebas)',
                fontSize: 'var(--type-display-accent)',
                color: 'var(--color-obsidian-ink)',
                lineHeight: 1.05,
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
          marginBottom: 'clamp(32px, 5vh, 56px)',
        }}>
          {FOUNDER.headline[0]} <em>{FOUNDER.headline[1]}</em>
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
          {FOUNDER.body.map((para, i) => (
            <p
              key={i}
              className="fd-para"
              style={{
                fontFamily: 'var(--font-twk-lausanne)',
                fontWeight: 300,
                fontSize: 'var(--type-body-lg)',
                color: 'var(--color-obsidian-ink)',
                lineHeight: 1.8,
              }}
            >
              {para}
            </p>
          ))}
        </div>

        <div
          className="fd-quote"
          style={{
            borderLeft: '2px solid var(--color-voltage)',
            paddingLeft: '24px',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-editorial-new)',
            fontStyle: 'italic',
            fontSize: '20px',
            color: 'var(--color-voltage)',
            lineHeight: 1.5,
          }}>
            &ldquo;We are a strategic partner. We advise, we build, and we stay.&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
