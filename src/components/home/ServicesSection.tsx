'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const SERVICES = [
  {
    number: '01',
    title: 'Financial Clarity',
    tagline: 'Your strategic partner in financial intelligence.',
    description:
      "Strategy without financial visibility is guesswork. We give you the real numbers — margins, break-even, cash flow — through hands-on advisory and two proprietary systems, BreakPoint™ and StockPulse™. So every growth decision you make is backed by data, not instinct.",
    bullets: [
      "I make decisions based on revenue, not profit — because I don't know my profit",
      'I need a financial strategy, not just a spreadsheet',
      'I want someone who understands my numbers and tells me what they mean',
    ],
  },
  {
    number: '02',
    title: 'Margin & Operations',
    tagline: 'Your strategic partner in operational performance.',
    description:
      "Operational inefficiency is a strategy problem, not an admin problem. We diagnose your cost structure, identify where margin is being lost, and implement targeted restructuring — pricing, process, and resource allocation — so your growth translates into actual profit.",
    bullets: [
      "My costs are rising but I don't have a strategy to control them",
      'I need someone to look at my operations objectively and tell me what to restructure',
      'I want a structured plan for improving my margins, not generic advice',
    ],
  },
  {
    number: '03',
    title: 'AI Audit & Implementation',
    tagline: 'Your strategic partner in AI transformation.',
    description:
      "AI adoption without strategy is wasted budget. We assess your business across five dimensions of AI readiness, identify the highest-impact opportunities, and build working systems — customer automation, financial reporting, competitor intelligence — that integrate into your actual operation.",
    bullets: [
      'I need a strategy for AI in my business, not just another system to try',
      'I want someone to audit my workflow and tell me exactly where AI fits',
      'I need the implementation done for me, not a recommendation to do it myself',
    ],
  },
  {
    number: '04',
    title: 'Content Generation',
    tagline: 'Your strategic partner in content marketing.',
    description:
      "Content without strategy is noise. We build content systems aligned to your brand positioning, audience segments, and conversion goals — producing product copy, social content, ad campaigns, and customer communications with the consistency of a full marketing department.",
    bullets: [
      'I need a content strategy, not just someone to write posts',
      'I want content that is aligned with my business goals, not random topics',
      'I need a system that produces consistently, not a one-time batch',
    ],
  },
  {
    number: '05',
    title: 'HR & AI Training',
    tagline: 'Your strategic partner in people and capability.',
    description:
      "Your team is the execution layer of every strategy. We build the management infrastructure — SOPs, onboarding, performance frameworks, AI training — that turns a group of individuals into a scalable, self-sufficient operation. So your business runs on systems, not on you.",
    bullets: [
      'I need management structure, not just HR documents',
      'I want my team trained strategically on the systems we use',
      'I need someone to partner with me in building an organisation, not just fill roles',
    ],
  },
]

const NODE_ANGLES = [-90, -18, 54, 126, 198]
const SHORT_LABELS = ['Financial\nClarity', 'Margin &\nOps', 'AI\nImpl.', 'Content', 'HR &\nTraining']

function ServicePanel({ svc, isActive }: { svc: typeof SERVICES[0]; isActive: boolean }) {
  return (
    <div
      className="svc-panel"
      style={{
        gridArea: '1 / 1',
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateY(0)' : 'translateY(18px)',
        pointerEvents: isActive ? 'auto' : 'none',
        zIndex: isActive ? 1 : 0,
        transition: 'opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'opacity, transform',
      }}
    >
      <p style={{
        fontFamily: 'var(--font-dm-mono)',
        fontSize: '14px',
        color: 'var(--z-signal, #5B8DEF)',
        marginBottom: '12px',
      }}>
        {svc.number}
      </p>

      <h2 style={{
        fontFamily: 'var(--font-editorial-new)',
        fontSize: 'clamp(36px, 4vw, 56px)',
        fontWeight: 400,
        color: 'var(--z-chrome-peak, #E8E9ED)',
        lineHeight: 1.1,
        marginBottom: '12px',
      }}>
        {svc.title}
      </h2>

      <p style={{
        fontFamily: 'var(--font-editorial-new)',
        fontStyle: 'italic',
        fontSize: '17px',
        color: 'var(--z-chrome, #C8CAD0)',
        marginBottom: '24px',
      }}>
        {svc.tagline}
      </p>

      <div style={{
        width: '80px', height: '1px', marginBottom: '24px',
        background: 'var(--z-stroke, linear-gradient(90deg, rgba(200,202,208,0.1), rgba(200,202,208,0.4), rgba(200,202,208,0.1)))',
      }} />

      <p style={{
        fontFamily: 'var(--font-twk-lausanne)',
        fontSize: '16px',
        fontWeight: 300,
        color: 'var(--z-chrome-bright, rgba(200,202,208,0.85))',
        lineHeight: 1.7,
        maxWidth: '480px',
        marginBottom: '28px',
      }}>
        {svc.description}
      </p>

      <div style={{
        display: 'flex', flexDirection: 'column', gap: '12px',
        marginBottom: '32px',
      }}>
        {svc.bullets.map((bullet, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '14px',
              color: 'var(--z-signal, #5B8DEF)',
              flexShrink: 0,
              marginTop: '1px',
            }}>
              —
            </span>
            <span style={{
              fontFamily: 'var(--font-twk-lausanne)',
              fontSize: '15px',
              fontWeight: 300,
              color: 'var(--z-chrome, #C8CAD0)',
              lineHeight: 1.6,
            }}>
              {bullet}
            </span>
          </div>
        ))}
      </div>

      <a
        href="/#contact"
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-twk-lausanne)',
          fontWeight: 600,
          fontSize: '15px',
          letterSpacing: '0.01em',
          color: '#FFFFFF',
          background: 'var(--z-signal, #5B8DEF)',
          padding: '14px 28px',
          borderRadius: '8px',
          textDecoration: 'none',
          border: 'none',
          boxShadow: '0 2px 12px var(--z-signal-dim, rgba(91,141,239,0.10))',
          transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.background = 'var(--z-signal-bright, #7BA4F7)'
          el.style.transform = 'translateY(-1px)'
          el.style.boxShadow = '0 4px 20px var(--z-signal-medium, rgba(91,141,239,0.18))'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.background = 'var(--z-signal, #5B8DEF)'
          el.style.transform = 'translateY(0)'
          el.style.boxShadow = '0 2px 12px var(--z-signal-dim, rgba(91,141,239,0.10))'
        }}
      >
        Book your free session →
      </a>
    </div>
  )
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const discRef = useRef<HTMLDivElement>(null)
  const labelsRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  const changeService = useCallback((index: number) => {
    if (index === activeRef.current) return
    activeRef.current = index
    setActive(index)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const disc = discRef.current
    const labelsWrap = labelsRef.current
    if (!section || !disc || !labelsWrap) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const rotateDisc = gsap.quickTo(disc, 'rotation', { duration: 0.8, ease: 'power3.out' })
      const rotateLabels = gsap.quickTo(labelsWrap, 'rotation', { duration: 0.6, ease: 'power3.out' })

      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      })
      entranceTl.from(disc, {
        opacity: 0, scale: 0.85, duration: 0.6, ease: 'back.out(1.4)',
        immediateRender: false,
      })

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${window.innerHeight * 4}`,
        pin: true,
        onUpdate: (self) => {
          const rotation = -(self.progress * 288)
          rotateDisc(rotation)
          rotateLabels(-rotation)

          const idx = Math.min(4, Math.floor(self.progress * 5))
          if (idx !== activeRef.current) {
            changeService(idx)
          }
        },
      })

      return () => {
        st.kill()
        entranceTl.kill()
      }
    })

    return () => mm.revert()
  }, [changeService])

  const handleDotClick = (i: number) => {
    if (i === activeRef.current) return
    const disc = discRef.current
    const labelsWrap = labelsRef.current
    if (disc) {
      const rotation = -(i * 72)
      gsap.to(disc, { rotation, duration: 0.8, ease: 'power3.out', overwrite: 'auto' })
      if (labelsWrap) {
        gsap.to(labelsWrap, { rotation: -rotation, duration: 0.6, ease: 'power3.out', overwrite: 'auto' })
      }
    }
    changeService(i)
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{ background: 'var(--z-black, #0C0D12)', minHeight: '100vh', position: 'relative' }}
    >
      <div
        style={{
          maxWidth: '1400px', margin: '0 auto', width: '100%',
          padding: 'clamp(60px, 10vh, 120px) clamp(24px, 6vw, 80px)',
          display: 'flex', alignItems: 'center', gap: 'clamp(32px, 4vw, 64px)',
          minHeight: '100vh',
        }}
        className="svc-layout"
      >
        {/* ── Left: Content Panel ── */}
        <div className="svc-content-panel" style={{ flex: 1, maxWidth: '540px', minWidth: 0 }}>
          <p style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '11px',
            color: 'var(--z-chrome-dark, rgba(200,202,208,0.45))',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            Services
          </p>

          {/* Stacked crossfade panels — CSS transitions, not GSAP */}
          <div className="svc-panels-grid">
            {SERVICES.map((svc, i) => (
              <ServicePanel key={i} svc={svc} isActive={i === active} />
            ))}
          </div>

          {/* Progress dots */}
          <div className="svc-dots" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '32px' }}>
            {SERVICES.map((_, i) => (
              <button
                key={i}
                aria-label={`Service ${i + 1}`}
                onClick={() => handleDotClick(i)}
                style={{
                  width: '8px', height: '8px',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  background: i === active ? 'var(--z-signal, #5B8DEF)' : 'var(--z-chrome-dark, rgba(200,202,208,0.45))',
                  boxShadow: i === active ? '0 0 10px var(--z-signal-dim, rgba(91,141,239,0.10))' : 'none',
                  transition: 'background 0.3s, box-shadow 0.3s',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Right: Rotating Disc (desktop only) ── */}
        <div className="svc-disc-wrap" style={{
          flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',
          overflow: 'visible',
        }}>
          <div
            ref={discRef}
            style={{
              width: 'clamp(340px, 36vw, 520px)',
              height: 'clamp(340px, 36vw, 520px)',
              borderRadius: '50%',
              border: '1px solid var(--z-border-hover, rgba(200,202,208,0.18))',
              position: 'relative',
              overflow: 'visible',
              willChange: 'transform',
            }}
          >
            {/* Centre dot */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: '8px', height: '8px',
              borderRadius: '50%',
              background: 'var(--z-chrome-bright, rgba(200,202,208,0.85))',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }} />

            {/* Spokes + Nodes (rotate with disc) */}
            {NODE_ANGLES.map((angle, i) => {
              const isActive = i === active
              const rad = (angle * Math.PI) / 180
              const r = 50
              const nx = 50 + r * Math.cos(rad)
              const ny = 50 + r * Math.sin(rad)

              return (
                <div key={i}>
                  <svg
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      pointerEvents: 'none',
                    }}
                    viewBox="0 0 100 100"
                  >
                    <line
                      x1="50" y1="50"
                      x2={nx} y2={ny}
                      stroke={isActive ? 'var(--z-signal, #5B8DEF)' : 'var(--z-border, rgba(200,202,208,0.08))'}
                      strokeWidth="0.2"
                      style={{ transition: 'stroke 0.4s' }}
                    />
                  </svg>

                  <div style={{
                    position: 'absolute',
                    left: `${nx}%`, top: `${ny}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3,
                  }}>
                    <div style={{
                      width: '12px', height: '12px',
                      borderRadius: '50%',
                      border: isActive ? 'none' : '1px solid var(--z-chrome-dark, rgba(200,202,208,0.45))',
                      background: isActive ? 'var(--z-signal, #5B8DEF)' : 'transparent',
                      boxShadow: isActive ? '0 0 16px var(--z-signal-dim, rgba(91,141,239,0.10))' : 'none',
                      transition: 'background 0.4s, border 0.4s, box-shadow 0.4s',
                    }} />
                  </div>
                </div>
              )
            })}

            {/* Labels container — counter-rotated as a single group */}
            <div
              ref={labelsRef}
              style={{
                position: 'absolute', inset: 0,
                pointerEvents: 'none',
                willChange: 'transform',
              }}
            >
              {NODE_ANGLES.map((angle, i) => {
                const isActive = i === active
                const rad = (angle * Math.PI) / 180
                const r = 50
                const nx = 50 + r * Math.cos(rad)
                const ny = 50 + r * Math.sin(rad)

                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `${nx}%`, top: `${ny}%`,
                      zIndex: 3,
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '18px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '9px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: isActive ? 'var(--z-chrome-peak, #E8E9ED)' : 'var(--z-chrome-dark, rgba(200,202,208,0.45))',
                      textAlign: 'center',
                      whiteSpace: 'pre-line',
                      lineHeight: 1.3,
                      width: '80px',
                      transition: 'color 0.4s',
                    }}>
                      {SHORT_LABELS[i]}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile accordion (below 768px) ── */}
      <div className="svc-mobile-accordion" style={{ display: 'none' }}>
        <div style={{ padding: '0 clamp(24px, 6vw, 80px) clamp(60px, 10vh, 120px)' }}>
          <p style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '11px',
            color: 'var(--z-chrome-dark, rgba(200,202,208,0.45))',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}>
            Services
          </p>
          {SERVICES.map((s, i) => {
            const isOpen = i === active
            return (
              <div key={i} style={{
                borderBottom: '1px solid var(--z-border, rgba(200,202,208,0.08))',
                borderLeft: isOpen ? '2px solid var(--z-signal, #5B8DEF)' : '2px solid transparent',
                transition: 'border-color 0.3s',
              }}>
                <button
                  onClick={() => setActive(isOpen ? -1 as never : i)}
                  style={{
                    width: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '20px 16px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '13px',
                      color: isOpen ? 'var(--z-signal, #5B8DEF)' : 'var(--z-chrome-dark, rgba(200,202,208,0.45))',
                      transition: 'color 0.3s',
                    }}>
                      {s.number}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-twk-lausanne)',
                      fontWeight: 500,
                      fontSize: '16px',
                      color: 'var(--z-chrome-peak, #E8E9ED)',
                    }}>
                      {s.title}
                    </span>
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '18px',
                    color: isOpen ? 'var(--z-signal, #5B8DEF)' : 'var(--z-chrome-dark, rgba(200,202,208,0.45))',
                    transition: 'transform 0.3s, color 0.3s',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>
                    +
                  </span>
                </button>
                <div style={{
                  maxHeight: isOpen ? '600px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease',
                }}>
                  <div style={{ padding: '0 16px 24px' }}>
                    <p style={{
                      fontFamily: 'var(--font-editorial-new)',
                      fontStyle: 'italic',
                      fontSize: '15px',
                      color: 'var(--z-chrome, #C8CAD0)',
                      marginBottom: '16px',
                    }}>
                      {s.tagline}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-twk-lausanne)',
                      fontSize: '14px',
                      fontWeight: 300,
                      color: 'var(--z-chrome-bright, rgba(200,202,208,0.85))',
                      lineHeight: 1.7,
                      marginBottom: '16px',
                    }}>
                      {s.description}
                    </p>
                    {s.bullets.map((bullet, bi) => (
                      <div key={bi} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                        <span style={{ color: 'var(--z-signal, #5B8DEF)', flexShrink: 0 }}>—</span>
                        <span style={{
                          fontFamily: 'var(--font-twk-lausanne)',
                          fontSize: '14px',
                          fontWeight: 300,
                          color: 'var(--z-chrome, #C8CAD0)',
                          lineHeight: 1.6,
                        }}>
                          {bullet}
                        </span>
                      </div>
                    ))}
                    <a
                      href="/#contact"
                      style={{
                        display: 'inline-block',
                        fontFamily: 'var(--font-twk-lausanne)',
                        fontWeight: 600,
                        fontSize: '14px',
                        color: '#FFFFFF',
                        background: 'var(--z-signal, #5B8DEF)',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        marginTop: '16px',
                      }}
                    >
                      Book your free session →
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .svc-panels-grid {
          display: grid;
          position: relative;
        }
        @media (max-width: 767px) {
          .svc-layout { display: none !important; }
          .svc-mobile-accordion { display: block !important; }
        }
        @media (min-width: 768px) {
          .svc-disc-wrap { display: flex !important; }
          .svc-mobile-accordion { display: none !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .svc-content-panel { max-width: 380px !important; }
        }
      `}</style>
    </section>
  )
}
