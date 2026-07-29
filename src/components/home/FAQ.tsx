'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { gsap } from '@/lib/gsap'
import { FAQ_ITEMS } from '@/lib/constants'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const swoosh = section.querySelector<HTMLElement>('.faq-swoosh')
      if (swoosh) {
        gsap.fromTo(swoosh, { scaleX: 0 }, {
          scaleX: 1, duration: 0.8,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: { trigger: section, start: 'top 85%', once: true },
        })
      }

      const eyebrow = section.querySelector<HTMLElement>('.faq-eyebrow')
      if (eyebrow) {
        gsap.fromTo(eyebrow,
          { opacity: 0, y: 12 },
          {
            opacity: 1, y: 0, duration: 0.5,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: { trigger: section, start: 'top 80%', once: true },
            delay: 0.2,
          },
        )
      }

      const headLines = section.querySelectorAll<HTMLElement>('.faq-head-line')
      headLines.forEach((line, i) => {
        gsap.fromTo(line,
          { opacity: 0, y: '100%' },
          {
            opacity: 1, y: '0%', duration: 0.7,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            delay: 0.3 + i * 0.12,
            scrollTrigger: { trigger: section, start: 'top 78%', once: true },
          },
        )
      })

      const items = section.querySelectorAll<HTMLElement>('.faq-item')
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 16 },
          {
            opacity: 1, y: 0, duration: 0.4,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            delay: 0.6 + i * 0.06,
            scrollTrigger: { trigger: section, start: 'top 70%', once: true },
          },
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const toggle = useCallback((i: number) => {
    if (open === i) {
      const el = answerRefs.current[i]
      if (el) {
        const answer = el.querySelector<HTMLElement>('.faq-answer-text')
        if (answer) gsap.to(answer, { opacity: 0, y: -8, duration: 0.25, ease: 'power2.in' })
        gsap.to(el, { height: 0, duration: 0.35, ease: 'cubic-bezier(0.16, 1, 0.3, 1)', delay: 0.05 })
      }
      setOpen(null)
    } else {
      if (open !== null) {
        const prev = answerRefs.current[open]
        if (prev) {
          const prevAnswer = prev.querySelector<HTMLElement>('.faq-answer-text')
          if (prevAnswer) gsap.to(prevAnswer, { opacity: 0, y: -8, duration: 0.2, ease: 'power2.in' })
          gsap.to(prev, { height: 0, duration: 0.3, ease: 'cubic-bezier(0.16, 1, 0.3, 1)', delay: 0.05 })
        }
      }
      setOpen(i)
      const el = answerRefs.current[i]
      if (el) {
        gsap.set(el, { height: 'auto' })
        const h = el.offsetHeight
        gsap.fromTo(el,
          { height: 0 },
          { height: h, duration: 0.4, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' },
        )
        const answer = el.querySelector<HTMLElement>('.faq-answer-text')
        if (answer) {
          gsap.fromTo(answer,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'cubic-bezier(0.16, 1, 0.3, 1)', delay: 0.1 },
          )
        }
      }
    }
  }, [open])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#0F1428',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 80px)',
      }}
    >
      {/* Top swoosh */}
      <div className="faq-swoosh" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, #3C3C3C 20%, #828282 40%, #AAAAAA 50%, #828282 60%, #3C3C3C 80%, transparent)',
        transformOrigin: 'left',
      }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <p className="faq-eyebrow" style={{
          fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
          fontSize: '10px', color: '#828282',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          marginBottom: '16px', opacity: 0,
        }}>
          Common Questions
        </p>

        {/* Heading — staggered line reveal */}
        <h2 style={{ margin: '0 0 clamp(48px, 7vh, 72px)' }}>
          {['FREQUENTLY', 'ASKED', 'QUESTIONS'].map((word) => (
            <span key={word} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
              <span
                className="faq-head-line"
                style={{
                  display: 'inline-block',
                  fontFamily: "var(--font-bebas, 'Bebas Neue', Impact, sans-serif)",
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  color: '#FFFFFF',
                  lineHeight: 1.05,
                  letterSpacing: '0.02em',
                  opacity: 0,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>

        {/* FAQ items */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="faq-item"
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'border-color 0.2s',
                opacity: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.25)'
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderBottomColor = open === i ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
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
                  position: 'relative',
                }}
              >
                {/* Active left border indicator */}
                <span style={{
                  position: 'absolute', left: '-1px', top: '20%', bottom: '20%',
                  width: '2px', background: '#782000',
                  transform: open === i ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin: 'top',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }} />

                <span style={{
                  fontFamily: "var(--font-twk-lausanne, 'Plus Jakarta Sans', sans-serif)",
                  fontWeight: 500,
                  fontSize: '16px',
                  color: '#FFFFFF',
                  paddingRight: '16px',
                  paddingLeft: '12px',
                  lineHeight: 1.4,
                }}>
                  {item.q}
                </span>
                <span style={{
                  fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
                  fontSize: '18px',
                  color: open === i ? '#782000' : '#782000',
                  flexShrink: 0,
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  width: '24px', height: '24px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  +
                </span>
              </button>

              <div
                ref={(el) => { answerRefs.current[i] = el }}
                style={{ overflow: 'hidden', height: 0 }}
              >
                <p className="faq-answer-text" style={{
                  fontFamily: "var(--font-twk-lausanne, 'Plus Jakarta Sans', sans-serif)",
                  fontWeight: 350,
                  fontSize: '14px',
                  color: '#AAAAAA',
                  lineHeight: 1.7,
                  padding: '0 12px 20px',
                  maxWidth: '600px',
                  opacity: 0,
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
