'use client'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { PROBLEM_SECTION, PROBLEM_STATS, COST_BREAKDOWN_LAYERS } from '@/lib/constants'

const CARDS = [
  {
    heading: "Where is your\nmoney going?",
    stat: { value: '<1 in 5', unit: '' },
    body: "You know your revenue. But do you know what you actually keep after every cost? Most business owners don't — and the gap between those two numbers is where profit quietly disappears.",
  },
  {
    heading: "How much of\nyour week is wasted?",
    stat: { value: '30–40%', unit: 'of your week' },
    body: "You're spending 2–3 days every week on repetitive work — replies, reports, data entry — that a simple automation could do in minutes. That's time you could be spending on growth.",
  },
  {
    heading: "Is your stock\nhelping or hurting?",
    stat: { value: '15–25%', unit: 'of stock capital' },
    body: "Right now, 15–25% of the money you've put into inventory is sitting in products that aren't selling. That's not stock — it's cash you can't use.",
  },
]

export function BlindGrowth() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const waterfallRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Headline entrance
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      })

      const stroke = section.querySelector<HTMLElement>('.prob-stroke')
      if (stroke) tl.fromTo(stroke, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'none' })

      const label = section.querySelector<HTMLElement>('.prob-label')
      if (label) tl.from(label, { opacity: 0, y: 12, duration: 0.4 }, '-=0.1')

      const hl1 = section.querySelector<HTMLElement>('.hl-1')
      if (hl1) tl.from(hl1, { y: 60, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2')

      const hl2 = section.querySelector<HTMLElement>('.hl-2')
      if (hl2) tl.from(hl2, { x: 80, opacity: 0, duration: 0.5, ease: 'power4.out' }, '-=0.4')

      const hl3 = section.querySelector<HTMLElement>('.hl-3')
      if (hl3) tl.from(hl3, { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.2')

      const hlLoss = section.querySelector<HTMLElement>('.hl-loss')
      if (hlLoss) {
        tl.from(hlLoss, { opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
        tl.to(hlLoss, { scale: 1.02, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' }, '-=0.1')
      }

      // Cards entrance
      const cards = section.querySelectorAll<HTMLElement>('.problem-card')
      if (cards.length) {
        gsap.from(cards, {
          y: 60, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.prob-cards-grid', start: 'top 80%', once: true },
        })
      }

      // Waterfall rows
      const wf = waterfallRef.current
      if (wf) {
        const rows = wf.querySelectorAll<HTMLElement>('.gp-row')
        rows.forEach((row, i) => {
          gsap.fromTo(row,
            { opacity: 0, x: 20, clipPath: 'inset(0 100% 0 0)' },
            {
              opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)',
              duration: 0.5, ease: 'power3.inOut',
              scrollTrigger: { trigger: row, start: 'top 85%', once: true },
              delay: i * 0.06,
            },
          )
        })
        const result = wf.querySelector<HTMLElement>('.gp-result')
        if (result) {
          gsap.from(result, {
            opacity: 0, y: 20, duration: 0.5,
            scrollTrigger: { trigger: result, start: 'top 85%', once: true },
          })
        }
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ background: 'var(--z-black, #0C0D12)', position: 'relative', overflow: 'hidden' }}>

      {/* ── HEADLINE + CARDS ── */}
      <div style={{ padding: 'clamp(100px, 14vh, 180px) clamp(24px, 6vw, 80px) clamp(60px, 8vh, 100px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Section label with stroke */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="prob-stroke" style={{
              width: '80px', height: '1px', margin: '0 auto 16px',
              background: 'linear-gradient(90deg, rgba(200,202,208,0.1), rgba(200,202,208,0.4), rgba(200,202,208,0.1))',
              transformOrigin: 'left center',
            }} />
            <p className="prob-label" style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              color: 'var(--z-chrome-dark, #5A5B66)',
              textTransform: 'uppercase',
            }}>
              The Problem
            </p>
          </div>

          {/* Multi-layer headline */}
          <div style={{ maxWidth: '900px', marginBottom: '80px' }}>
            <span className="hl-1" style={{
              display: 'block',
              fontFamily: 'var(--font-editorial-new)',
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 400,
              color: 'var(--z-chrome-peak, #E2E4E9)',
              lineHeight: 1.1,
              marginBottom: '4px',
            }}>
              {PROBLEM_SECTION.headline[0]}
            </span>

            <span className="hl-2" style={{
              display: 'block',
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(60px, 9vw, 130px)',
              fontWeight: 400,
              color: 'var(--z-chrome-peak, #E2E4E9)',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}>
              GETTING EASIER?
            </span>

            <span className="hl-3" style={{
              display: 'block',
              fontFamily: 'var(--font-editorial-new)',
              fontStyle: 'italic',
              fontSize: 'clamp(24px, 4vw, 44px)',
              fontWeight: 400,
              color: 'var(--z-chrome, #8B8D97)',
              lineHeight: 1.2,
            }}>
              The cash isn&apos;t following.{' '}
              <span className="hl-loss" style={{
                color: '#E06C6C',
                display: 'inline',
              }}>
                Let&apos;s find out why.
              </span>
            </span>
          </div>

          {/* Interactive cards */}
          <div
            className="prob-cards-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
          >
            {CARDS.map((card, i) => (
              <div
                key={i}
                className="problem-card"
                style={{
                  background: 'var(--z-surface, #0C0D12)',
                  border: '1px solid rgba(200,202,208,0.08)',
                  borderRadius: '12px',
                  padding: '40px 36px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(200,202,208,0.012) 31px, rgba(200,202,208,0.012) 32px)',
                  transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(200,202,208,0.18)'
                  el.style.boxShadow = '0 0 48px rgba(200,202,208,0.04)'
                  el.style.transform = 'translateY(-4px)'
                  const divider = el.querySelector<HTMLElement>('.pc-divider')
                  if (divider) divider.style.transform = 'scaleX(1)'
                  const body = el.querySelector<HTMLElement>('.pc-body')
                  if (body) { body.style.opacity = '1'; body.style.transform = 'translateY(0)' }
                  const prompt = el.querySelector<HTMLElement>('.pc-prompt')
                  if (prompt) prompt.style.opacity = '0'
                  const shimmer = el.querySelector<HTMLElement>('.card-shimmer')
                  if (shimmer) {
                    gsap.fromTo(shimmer, { x: '-110%', opacity: 1 }, { x: '110%', duration: 0.7, ease: 'power2.out' })
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(200,202,208,0.08)'
                  el.style.boxShadow = 'none'
                  el.style.transform = 'translateY(0)'
                  const divider = el.querySelector<HTMLElement>('.pc-divider')
                  if (divider) divider.style.transform = 'scaleX(0)'
                  const body = el.querySelector<HTMLElement>('.pc-body')
                  if (body) { body.style.opacity = '0'; body.style.transform = 'translateY(8px)' }
                  const prompt = el.querySelector<HTMLElement>('.pc-prompt')
                  if (prompt) prompt.style.opacity = '1'
                }}
              >
                {/* Shimmer overlay */}
                <div className="card-shimmer" style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(105deg, transparent 35%, rgba(200,202,208,0.06) 50%, transparent 65%)',
                  width: '60%', height: '100%',
                  pointerEvents: 'none',
                  transform: 'translateX(-110%)',
                }} />

                {/* Card number */}
                <p style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'var(--z-chrome-dark, #5A5B66)',
                  letterSpacing: '0.15em',
                  marginBottom: '20px',
                  position: 'relative', zIndex: 2,
                }}>
                  0{i + 1}
                </p>

                {/* Heading */}
                <h3 style={{
                  fontFamily: 'var(--font-editorial-new)',
                  fontSize: 'clamp(22px, 2.8vw, 32px)',
                  fontWeight: 400,
                  lineHeight: 1.15,
                  color: 'var(--z-chrome-peak, #E2E4E9)',
                  marginBottom: '24px',
                  whiteSpace: 'pre-line',
                  position: 'relative', zIndex: 2,
                }}>
                  {card.heading}
                </h3>

                {/* Stat */}
                <div style={{ position: 'relative', zIndex: 2, marginBottom: '4px' }}>
                  <span style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: 'clamp(36px, 4vw, 52px)',
                    fontWeight: 500,
                    color: 'var(--z-chrome-peak, #E2E4E9)',
                    lineHeight: 1,
                    display: 'block',
                  }}>
                    {card.stat.value}
                  </span>
                  {card.stat.unit && (
                    <span style={{
                      fontFamily: 'var(--font-twk-lausanne)',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'var(--z-chrome-dark, #5A5B66)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginTop: '4px',
                      display: 'block',
                    }}>
                      {card.stat.unit}
                    </span>
                  )}
                </div>

                {/* Chrome divider — hidden until hover */}
                <div className="pc-divider" style={{
                  width: '100%', height: '1px',
                  background: 'linear-gradient(90deg, rgba(200,202,208,0.1), rgba(200,202,208,0.4), rgba(200,202,208,0.1))',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left center',
                  margin: '24px 0',
                  transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }} />

                {/* Body text — hidden until hover */}
                <p className="pc-body" style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontSize: '15px',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: 'var(--z-chrome-dark, #5A5B66)',
                  opacity: 0,
                  transform: 'translateY(8px)',
                  transition: 'opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s',
                  position: 'relative', zIndex: 2,
                }}>
                  {card.body}
                </p>

                {/* Hover prompt */}
                <p className="pc-prompt" style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--z-chrome-dark, #5A5B66)',
                  letterSpacing: '0.06em',
                  marginTop: '16px',
                  transition: 'opacity 0.2s',
                  position: 'relative', zIndex: 2,
                }}>
                  Hover to read →
                </p>
              </div>
            ))}
          </div>

          <style>{`
            @media (max-width: 900px) {
              .prob-cards-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </div>

      {/* ── COST BREAKDOWN WATERFALL ── */}
      <div
        ref={waterfallRef}
        style={{ padding: '0 clamp(24px, 6vw, 80px) clamp(60px, 8vh, 100px)' }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Revenue header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            borderBottom: '1px solid rgba(200,202,208,0.12)',
            paddingBottom: '16px', marginBottom: '6px',
          }}>
            <span style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: 'var(--type-label)',
              color: 'var(--z-chrome-dark, #5A5B66)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              Monthly Revenue
            </span>
            <span style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(32px, 5vw, 48px)',
              color: 'var(--z-accent)',
              lineHeight: 1,
            }}>
              ৳8,00,000
            </span>
          </div>

          {/* Cost layers */}
          {COST_BREAKDOWN_LAYERS.map((layer) => (
            <div
              key={layer.label}
              className="gp-row"
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid rgba(200,202,208,0.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--z-chrome-dark, #5A5B66)' }}>−</span>
                <span style={{ fontFamily: 'var(--font-twk-lausanne)', fontWeight: 350, fontSize: '14px', color: 'var(--z-chrome, #8B8D97)' }}>
                  {layer.label}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '14px', color: '#E06C6C', letterSpacing: '0.02em' }}>
                ৳{layer.amount.toLocaleString('en-IN')}
              </span>
            </div>
          ))}

          {/* Result */}
          <div className="gp-result" style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            borderTop: '1px solid rgba(200,202,208,0.15)',
            marginTop: '8px', paddingTop: '20px',
          }}>
            <span style={{ fontFamily: 'var(--font-twk-lausanne)', fontWeight: 500, fontSize: '15px', color: 'var(--z-chrome-peak, #E2E4E9)' }}>
              Actual net profit
            </span>
            <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(28px, 4vw, 40px)', color: '#E06C6C', lineHeight: 1 }}>
              ৳47,000
            </span>
          </div>

          {/* Hidden cost gap callout */}
          <div style={{
            textAlign: 'center', marginTop: '48px', padding: '24px',
            border: '1px solid rgba(200,202,208,0.08)', borderRadius: '12px',
          }}>
            <p style={{ fontFamily: 'var(--font-twk-lausanne)', fontWeight: 300, fontSize: '14px', color: 'var(--z-chrome-dark, #5A5B66)', lineHeight: 1.6 }}>
              The ৳7,53,000 you thought you had?
            </p>
            <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--z-caution)', lineHeight: 1, marginTop: '8px', letterSpacing: '0.04em' }}>
              HIDDEN IN COSTS.
            </p>
          </div>
        </div>
      </div>

      {/* ── BODY COPY ── */}
      <div style={{ padding: 'clamp(40px, 6vh, 80px) clamp(24px, 6vw, 80px) clamp(60px, 8vh, 100px)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {PROBLEM_SECTION.body.map((para, i) => (
            <p key={i} style={{
              fontFamily: 'var(--font-twk-lausanne)', fontWeight: 300,
              fontSize: '15px', color: 'var(--z-chrome-dark, #5A5B66)', lineHeight: 1.8,
            }}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
