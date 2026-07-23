'use client'
import { useRef, useEffect, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { METHODOLOGY_PILLARS } from '@/lib/constants'
import { TopoWaveField } from '@/components/shared/TopoWaveField'

export function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const stroke = section.querySelector<HTMLElement>('.section-stroke')
      const words = section.querySelectorAll<HTMLElement>('.hw-word')
      const numbers = section.querySelectorAll<HTMLElement>('.hw-num')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      })

      if (stroke) {
        tl.fromTo(stroke, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'none' })
      }
      if (words.length) {
        tl.from(words, { x: 80, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power4.out' }, '-=0.2')
      }
      if (numbers.length) {
        tl.from(numbers, { opacity: 0, y: 20, duration: 0.4, stagger: 0.1, ease: 'power2.out' }, '-=0.3')
      }
    }, section)

    return () => ctx.revert()
  }, [])

  function handleOpen(i: number) {
    if (active === i) return

    // Close current
    const prevContent = contentRefs.current[active]
    if (prevContent) {
      gsap.to(prevContent, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' })
    }

    // Open new
    setActive(i)
    const content = contentRefs.current[i]
    if (content) {
      gsap.set(content, { height: 'auto', opacity: 1 })
      const h = content.offsetHeight
      gsap.fromTo(content, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.4, ease: 'power2.out' })
    }
  }

  return (
    <section
      id="methodology"
      ref={sectionRef}
      className="bg-linen"
      style={{ position: 'relative', padding: 'clamp(60px, 10vh, 120px) clamp(24px, 6vw, 80px)' }}
    >
      <TopoWaveField className="z-0" lineCount={14} amplitude={12} opacity={0.5} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="section-stroke" style={{ width: '100%', marginBottom: '48px' }} />

        <div style={{ marginBottom: 'clamp(48px, 6vh, 80px)' }}>
          <p style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: 'var(--type-label)',
            color: 'var(--z-chrome)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            How we think
          </p>
          <h2 style={{ margin: 0 }}>
            {['OUR', 'PROCESS'].map((word) => (
              <span
                key={word}
                className="hw-word"
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
        </div>

        {/* Accordion numbers — Treatment 8 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {METHODOLOGY_PILLARS.map((step, i) => {
            const isActive = active === i
            return (
              <div
                key={step.number}
                className="hw-num"
                onClick={() => handleOpen(i)}
                style={{
                  borderBottom: '1px solid var(--color-mist)',
                  padding: 'clamp(20px, 3vh, 36px) 0',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 40px)' }}>
                  {/* Big number */}
                  <span style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: 'clamp(48px, 7vw, 100px)',
                    color: isActive ? 'var(--color-obsidian-ink)' : 'var(--color-mist)',
                    lineHeight: 1,
                    transition: 'color 0.3s',
                    minWidth: 'clamp(60px, 8vw, 120px)',
                  }}>
                    {step.number}
                  </span>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: 'var(--font-twk-lausanne)',
                    fontWeight: 600,
                    fontSize: 'clamp(18px, 2.5vw, 28px)',
                    color: isActive ? 'var(--color-obsidian-ink)' : 'var(--color-sage)',
                    lineHeight: 1.2,
                    transition: 'color 0.3s',
                    flex: 1,
                    margin: 0,
                  }}>
                    {step.title}
                  </h3>

                  {/* Expand indicator */}
                  <span style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '18px',
                    color: isActive ? 'var(--color-voltage)' : 'var(--color-mist)',
                    transition: 'transform 0.3s, color 0.3s',
                    transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>
                    +
                  </span>
                </div>

                {/* Expandable content */}
                <div
                  ref={(el) => { contentRefs.current[i] = el }}
                  style={{
                    overflow: 'hidden',
                    height: isActive ? 'auto' : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--font-twk-lausanne)',
                    fontWeight: 300,
                    fontSize: 'var(--type-body)',
                    color: 'var(--color-sage)',
                    lineHeight: 1.8,
                    maxWidth: '600px',
                    paddingTop: '16px',
                    paddingLeft: 'clamp(76px, 10vw, 160px)',
                  }}>
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
