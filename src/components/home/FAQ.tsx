'use client'
import { useState, useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { FAQ_ITEMS } from '@/lib/constants'
import { TopoWaveField } from '@/components/shared/TopoWaveField'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const stroke = section.querySelector<HTMLElement>('.section-stroke')
      const words = section.querySelectorAll<HTMLElement>('.faq-word')
      const items = section.querySelectorAll<HTMLElement>('.faq-item')

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      })

      if (stroke) tl.fromTo(stroke, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'none' })
      if (words.length) tl.from(words, { x: 80, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power4.out' }, '-=0.2')
      if (items.length) tl.from(items, { opacity: 0, y: 16, duration: 0.4, stagger: 0.06, ease: 'power2.out' }, '-=0.2')
    }, section)

    return () => ctx.revert()
  }, [])

  function toggle(i: number) {
    if (open === i) {
      const el = answerRefs.current[i]
      if (el) gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' })
      setOpen(null)
    } else {
      // Close previous
      if (open !== null) {
        const prev = answerRefs.current[open]
        if (prev) gsap.to(prev, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' })
      }
      setOpen(i)
      const el = answerRefs.current[i]
      if (el) {
        gsap.set(el, { height: 'auto', opacity: 1 })
        const h = el.offsetHeight
        gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.4, ease: 'power2.out' })
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--z-black)',
        position: 'relative',
        padding: 'clamp(60px, 10vh, 120px) clamp(24px, 6vw, 80px)',
      }}
    >
      <TopoWaveField className="z-0" theme="dark" lineCount={16} amplitude={15} mouseInteraction={false} opacity={0.5} />
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="section-stroke" style={{ width: '100%', marginBottom: '48px' }} />

        <h2 style={{ margin: '0 0 clamp(40px, 6vh, 64px)' }}>
          {['QUESTIONS', 'WE', 'GET'].map((word) => (
            <span
              key={word}
              className="faq-word"
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

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="faq-item"
              style={{ borderBottom: '1px solid var(--z-border)' }}
            >
              <button
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'clamp(16px, 2.5vh, 24px) 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontWeight: 500,
                  fontSize: 'var(--type-body)',
                  color: 'var(--z-chrome-peak)',
                  paddingRight: '16px',
                  lineHeight: 1.4,
                }}>
                  {item.q}
                </span>
                <span style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '18px',
                  color: open === i ? 'var(--z-accent)' : 'var(--z-chrome-dark)',
                  flexShrink: 0,
                  transition: 'transform 0.3s, color 0.3s',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                }}>
                  +
                </span>
              </button>

              <div
                ref={(el) => { answerRefs.current[i] = el }}
                style={{
                  overflow: 'hidden',
                  height: 0,
                  opacity: 0,
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontWeight: 300,
                  fontSize: 'var(--type-body-sm)',
                  color: 'var(--z-chrome-dark)',
                  lineHeight: 1.8,
                  paddingBottom: '20px',
                  maxWidth: '600px',
                }}>
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
