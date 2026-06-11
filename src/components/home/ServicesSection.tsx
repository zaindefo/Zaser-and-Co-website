'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { SERVICE_PILLARS } from '@/lib/constants'

const SERVICE_HEADINGS: Record<string, string[]> = {
  'financial-clarity':  ['Financial', 'Clarity'],
  'margin-operations':  ['Margin &', 'Operations'],
  'ai-audit':           ['AI Audit &', 'Impl.'],
  'content-generation': ['Content', 'Generation'],
  'hr-training':        ['HR & AI', 'Training'],
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const masterTl = gsap.timeline({ paused: true })

    SERVICE_PILLARS.forEach((_, i) => {
      if (i === 0) return

      const ts = i - 1
      const dur = 1.0

      const outEl = section.querySelector<HTMLElement>(`[data-si="${i - 1}"]`)
      const inEl  = section.querySelector<HTMLElement>(`[data-si="${i}"]`)
      const flash = section.querySelector<HTMLElement>('.svc-flash')
      if (!outEl || !inEl) return

      const outHeads  = outEl.querySelectorAll<HTMLElement>('.svc-head')
      const outBody   = outEl.querySelectorAll<HTMLElement>('.svc-body')
      const outNum    = outEl.querySelector<HTMLElement>('.svc-num')
      const outCnt    = outEl.querySelector<HTMLElement>('.svc-cnt')

      const inNum     = inEl.querySelector<HTMLElement>('.svc-num')
      const inHeads   = inEl.querySelectorAll<HTMLElement>('.svc-head')
      const inTagline = inEl.querySelector<HTMLElement>('.svc-tagline')
      const inDesc    = inEl.querySelector<HTMLElement>('.svc-desc')
      const inBullets = inEl.querySelectorAll<HTMLElement>('.svc-bullet')
      const inCnt     = inEl.querySelector<HTMLElement>('.svc-cnt')

      // Exit: number + counter — explicit FROM prevents lazy-capture reading the wrong GSAP cache state
      const exitTargets = [outNum, outCnt].filter(Boolean) as HTMLElement[]
      if (exitTargets.length) {
        masterTl.fromTo(exitTargets,
          { opacity: 1, yPercent: 0, immediateRender: false },
          { opacity: 0, yPercent: -50, duration: dur * 0.18 },
          ts
        )
      }
      // Exit: heading lines — immediateRender:false so we don't override the enter fromTo's initial yPercent:110
      masterTl.fromTo(outHeads,
        { yPercent: 0, immediateRender: false },
        { yPercent: -110, stagger: 0.04, duration: dur * 0.28 },
        ts + 0.04
      )
      // Exit: body text — explicit FROM:1, no immediate render
      masterTl.fromTo(outBody,
        { opacity: 1, y: 0, immediateRender: false },
        { opacity: 0, y: -18, duration: dur * 0.2 },
        ts + 0.08
      )

      // Chrome flash at midpoint
      if (flash) {
        masterTl.to(flash, { opacity: 1, duration: 0.001 }, ts + dur * 0.44)
        masterTl.to(flash, { opacity: 0, duration: 0.001 }, ts + dur * 0.56)
      }

      // Enter: number + counter
      if (inNum) {
        masterTl.fromTo(inNum,
          { opacity: 0, yPercent: 50 },
          { opacity: 1, yPercent: 0, duration: dur * 0.22 },
          ts + dur * 0.34
        )
      }
      if (inCnt) {
        masterTl.fromTo(inCnt,
          { opacity: 0 },
          { opacity: 1, duration: dur * 0.18 },
          ts + dur * 0.40
        )
      }
      // Enter: heading lines slide up from below clip
      masterTl.fromTo(inHeads,
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.045, duration: dur * 0.38, ease: 'power3.out' },
        ts + dur * 0.38
      )
      // Enter: tagline, desc, bullets
      if (inTagline) {
        masterTl.fromTo(inTagline,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: dur * 0.28 },
          ts + dur * 0.60
        )
      }
      if (inDesc) {
        masterTl.fromTo(inDesc,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: dur * 0.28 },
          ts + dur * 0.68
        )
      }
      masterTl.fromTo(inBullets,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, stagger: 0.06, duration: dur * 0.22 },
        ts + dur * 0.75
      )
    })

    // Progress fill over full 4-unit scroll
    const fill = section.querySelector<HTMLElement>('.svc-fill')
    if (fill) {
      masterTl.fromTo(fill, { scaleY: 0 }, { scaleY: 1, duration: 4, ease: 'none' }, 0)
    }

    const pin = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=500vh',
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    })

    const scrub = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=500vh',
      scrub: 1.5,
      animation: masterTl,
    })

    return () => {
      pin.kill()
      scrub.kill()
      masterTl.kill()
    }
  }, [])

  return (
    <div id="services">
      {/* ── MOBILE: stacked sections ── */}
      <div className="md:hidden" style={{ background: '#1a1d1a' }}>
        {SERVICE_PILLARS.map((service) => {
          const lines = SERVICE_HEADINGS[service.id] ?? [service.title]
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '64px 24px',
                borderBottom: '0.5px solid rgba(200,210,200,0.12)',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-twk-lausanne)', fontSize: '13px',
                fontWeight: 600, color: 'var(--color-voltage)',
                letterSpacing: '0.15em', marginBottom: '18px',
              }}>
                {service.number}
              </p>
              <h2 style={{
                fontFamily: 'var(--font-twk-lausanne)', fontWeight: 800,
                fontSize: 'clamp(36px, 8vw, 56px)', color: '#fafffa',
                lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '16px',
              }}>
                {lines.join(' ')}
              </h2>
              <p style={{
                fontFamily: 'var(--font-editorial-new)', fontStyle: 'italic',
                fontSize: '16px', color: 'rgba(200,210,200,0.8)',
                marginBottom: '20px', lineHeight: 1.5,
              }}>
                {service.tagline}
              </p>
              <p style={{
                fontFamily: 'var(--font-twk-lausanne)', fontWeight: 300,
                fontSize: '15px', color: 'rgba(200,210,200,0.55)',
                lineHeight: 1.75, marginBottom: '24px',
              }}>
                {service.description}
              </p>
              <div>
                {service.problems.map((p) => (
                  <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ color: 'var(--color-voltage)', marginTop: '3px', flexShrink: 0, fontSize: '10px' }}>◆</span>
                    <span style={{
                      fontFamily: 'var(--font-twk-lausanne)', fontWeight: 350,
                      fontSize: '14px', color: 'rgba(200,210,200,0.65)', lineHeight: 1.55,
                    }}>
                      {p}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ── DESKTOP: GSAP pinned scroll ── */}
      <div
        ref={sectionRef}
        className="hidden md:block"
        style={{ height: '100vh', overflow: 'hidden', background: '#1a1d1a', position: 'relative' }}
      >
        {/* Chrome flash overlay */}
        <div
          className="svc-flash"
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            background: 'rgba(200,210,200,0.04)',
            opacity: 0, pointerEvents: 'none',
          }}
        />

        {/* Vertical progress bar */}
        <div style={{
          position: 'absolute', left: 'calc(8vw + 54vw)', top: '14vh', bottom: '14vh',
          width: '1px', background: 'rgba(200,210,200,0.1)', zIndex: 5,
        }}>
          <div
            className="svc-fill"
            style={{
              width: '100%', height: '100%',
              background: 'var(--color-voltage)',
              transformOrigin: 'top center', transform: 'scaleY(0)',
              opacity: 0.5,
            }}
          />
          {[0, 0.25, 0.5, 0.75, 1].map((pos, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute', top: `${pos * 100}%`,
                left: '-4px', width: '9px', height: '9px',
                background: '#1a1d1a',
                border: '1px solid rgba(200,210,200,0.28)',
                transform: 'rotate(45deg) translateY(-50%)',
              }}
            />
          ))}
        </div>

        {/* Service panels — stacked absolutely */}
        {SERVICE_PILLARS.map((service, i) => {
          const lines = SERVICE_HEADINGS[service.id] ?? [service.title]
          const isFirst = i === 0

          return (
            <div
              key={service.id}
              data-si={i}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center',
                padding: '0 8vw',
                pointerEvents: 'none',
              }}
            >
              {/* Left — content */}
              <div style={{ width: '54vw', paddingRight: '6vw' }}>

                {/* Number + counter */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                  <div
                    className="svc-num"
                    style={{
                      fontFamily: 'var(--font-twk-lausanne)', fontWeight: 600,
                      fontSize: '13px', color: 'var(--color-voltage)',
                      letterSpacing: '0.15em',
                      opacity: isFirst ? 1 : 0,
                    }}
                  >
                    {service.number}
                  </div>
                  <div
                    className="svc-cnt"
                    style={{
                      fontFamily: 'var(--font-twk-lausanne)', fontWeight: 600,
                      fontSize: '12px', color: 'rgba(200,210,200,0.22)',
                      letterSpacing: '0.1em',
                      opacity: isFirst ? 1 : 0,
                    }}
                  >
                    {service.number} / 05
                  </div>
                </div>

                {/* Heading — each line clipped for translateY reveal */}
                <div style={{ marginBottom: '28px' }}>
                  {lines.map((line, li) => (
                    <div key={li} style={{ overflow: 'hidden', lineHeight: 1 }}>
                      <div
                        className="svc-head"
                        style={{
                          fontFamily: 'var(--font-twk-lausanne)', fontWeight: 800,
                          fontSize: 'clamp(44px, 5.2vw, 82px)',
                          color: '#fafffa', lineHeight: 1.0,
                          letterSpacing: '-0.03em',
                          transform: isFirst ? 'translateY(0%)' : 'translateY(110%)',
                          paddingBottom: '4px',
                        }}
                      >
                        {line}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tagline */}
                <p
                  className="svc-tagline svc-body"
                  style={{
                    fontFamily: 'var(--font-editorial-new)', fontStyle: 'italic',
                    fontSize: '19px', color: 'rgba(200,210,200,0.8)',
                    marginBottom: '20px', lineHeight: 1.45,
                    opacity: isFirst ? 1 : 0,
                  }}
                >
                  {service.tagline}
                </p>

                {/* Description */}
                <p
                  className="svc-desc svc-body"
                  style={{
                    fontFamily: 'var(--font-twk-lausanne)', fontWeight: 300,
                    fontSize: '15px', color: 'rgba(200,210,200,0.5)',
                    lineHeight: 1.8, maxWidth: '520px', marginBottom: '28px',
                    opacity: isFirst ? 1 : 0,
                  }}
                >
                  {service.description}
                </p>

                {/* Problem bullets */}
                <div>
                  {service.problems.map((bullet) => (
                    <div
                      key={bullet}
                      className="svc-bullet svc-body"
                      style={{
                        display: 'flex', alignItems: 'flex-start',
                        gap: '12px', marginBottom: '12px',
                        opacity: isFirst ? 1 : 0,
                      }}
                    >
                      <span style={{ color: 'var(--color-voltage)', marginTop: '4px', flexShrink: 0, fontSize: '9px' }}>◆</span>
                      <span style={{
                        fontFamily: 'var(--font-twk-lausanne)', fontWeight: 350,
                        fontSize: '13px', color: 'rgba(200,210,200,0.58)',
                        lineHeight: 1.6,
                      }}>
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — ghosted number watermark */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', right: 0, top: 0, bottom: 0,
                  width: '38vw',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', pointerEvents: 'none', userSelect: 'none',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-twk-lausanne)', fontWeight: 800,
                  fontSize: 'clamp(160px, 22vw, 340px)',
                  color: 'rgba(200,210,200,0.032)',
                  lineHeight: 1, letterSpacing: '-0.06em',
                }}>
                  {service.number}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
