'use client'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import Link from 'next/link'

const SERVICES = [
  {
    number: '01',
    title: 'AI Audit & Implementation',
    tagline: 'We assess. We build. We integrate.',
    description:
      'We assess your business across five dimensions of AI readiness — Strategy, Data, Technology, People, and Governance — and build working AI systems that integrate into your actual operation. We do not recommend. We build.',
    deliverables: [
      'AI Readiness Audit Report',
      'Prioritised Implementation Roadmap',
      'One Working AI System',
      'Handover Documentation & Training',
    ],
    bullets: [
      'I need a strategy for AI in my business, not just another tool to try',
      'I want someone to audit my workflow and tell me exactly where AI fits',
      'I need the implementation done for me, not a recommendation to do it myself',
    ],
    href: '/services/ai-audit-implementation',
    ctaHref: '/free-ai-audit',
    ctaLabel: 'Book your free AI audit →',
  },
  {
    number: '02',
    title: 'Management & Operations Strategy',
    tagline: 'We diagnose. We fix. We build the roadmap.',
    description:
      'We diagnose your cost structure, identify where margin is being lost, and implement targeted restructuring across pricing, process, and resource allocation — so that growth translates into actual profit.',
    deliverables: [
      'Operations Diagnostic Report',
      'Cost Structure Map',
      '90-Day Improvement Roadmap',
      'Executive Presentation Deck',
    ],
    bullets: [
      'My costs are rising but I don\'t have a strategy to control them',
      'I need someone to look at my operations objectively and tell me what to fix',
      'I want a structured plan for improving my margins, not generic advice',
    ],
    href: '/services/management-operations',
    ctaHref: '/free-business-audit',
    ctaLabel: 'Get your operations diagnostic →',
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>('.svc-card').forEach((card) => {
        gsap.from(card, {
          opacity: 0, y: 40, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 80%', once: true },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        background: '#F6EFE4',
        padding: 'clamp(80px, 12vh, 160px) clamp(24px, 6vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: 'clamp(48px, 8vh, 80px)' }}>
          <p style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '11px',
            color: '#6B3828',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            Core Services
          </p>
          <h2 style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(40px, 5vw, 64px)',
            color: '#0F1235',
            lineHeight: 0.95,
            marginBottom: '16px',
          }}>
            TWO SERVICES.<br />FIXED SCOPE. FIXED DELIVERABLES.
          </h2>
          <p style={{
            fontFamily: 'var(--font-editorial-new)',
            fontStyle: 'italic',
            fontSize: '18px',
            fontWeight: 300,
            color: '#6B3828',
            maxWidth: '640px',
            lineHeight: 1.5,
          }}>
            Zaser & Co delivers two productized consulting services. Each is a fixed-scope, fixed-deliverable engagement with a defined timeline.
          </p>
        </div>

        {/* Service cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vh, 64px)' }}>
          {SERVICES.map((svc) => (
            <div
              key={svc.number}
              className="svc-card"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '32px',
                padding: 'clamp(32px, 4vw, 48px)',
                background: '#FFFDF8',
                border: '1px solid rgba(18,22,19,0.08)',
                borderRadius: '14px',
              }}
            >
              <div className="svc-card-inner" style={{ display: 'grid', gap: '32px' }}>
                {/* Header row */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '12px' }}>
                    <span style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '13px',
                      color: '#782000',
                      fontWeight: 500,
                    }}>
                      {svc.number}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '10px',
                      color: 'rgba(107,56,40,0.5)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}>
                      Productized Consulting
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-editorial-new)',
                    fontSize: 'clamp(28px, 3.5vw, 40px)',
                    fontWeight: 300,
                    color: '#0F1235',
                    lineHeight: 1.1,
                    marginBottom: '8px',
                  }}>
                    {svc.title}
                  </h3>

                  <p style={{
                    fontFamily: 'var(--font-twk-lausanne)',
                    fontSize: '16px',
                    fontWeight: 550,
                    color: '#782000',
                    letterSpacing: '0.02em',
                  }}>
                    {svc.tagline}
                  </p>
                </div>

                {/* Two-column content */}
                <div className="svc-columns" style={{ display: 'grid', gap: '32px' }}>
                  {/* Left: description + client statements */}
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-twk-lausanne)',
                      fontSize: '15px',
                      fontWeight: 350,
                      color: '#6B3828',
                      lineHeight: 1.7,
                      marginBottom: '24px',
                    }}>
                      {svc.description}
                    </p>

                    <p style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '10px',
                      color: 'rgba(107,56,40,0.5)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                    }}>
                      Client Statement
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {svc.bullets.map((bullet, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <span style={{
                            color: '#782000',
                            flexShrink: 0,
                            marginTop: '2px',
                            fontSize: '12px',
                          }}>—</span>
                          <span style={{
                            fontFamily: 'var(--font-editorial-new)',
                            fontStyle: 'italic',
                            fontSize: '14px',
                            fontWeight: 300,
                            color: '#0F1235',
                            lineHeight: 1.6,
                          }}>
                            &ldquo;{bullet}&rdquo;
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: deliverables + CTA */}
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '10px',
                      color: 'rgba(107,56,40,0.5)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                    }}>
                      What You Get
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                      {svc.deliverables.map((del, i) => (
                        <div key={i} style={{
                          display: 'flex', gap: '12px', alignItems: 'flex-start',
                          padding: '12px 16px',
                          background: 'rgba(15,18,53,0.02)',
                          borderRadius: '8px',
                          border: '1px solid rgba(18,22,19,0.04)',
                        }}>
                          <span style={{
                            fontFamily: 'var(--font-dm-mono)',
                            fontSize: '10px',
                            color: '#782000',
                            flexShrink: 0,
                            marginTop: '3px',
                          }}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span style={{
                            fontFamily: 'var(--font-twk-lausanne)',
                            fontSize: '14px',
                            fontWeight: 400,
                            color: '#0F1235',
                            lineHeight: 1.5,
                          }}>
                            {del}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <Link
                        href={svc.ctaHref}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          fontFamily: 'var(--font-twk-lausanne)',
                          fontWeight: 600,
                          fontSize: '14px',
                          color: '#FFFDF8',
                          background: '#0F1235',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          transition: 'background 0.2s',
                        }}
                      >
                        {svc.ctaLabel}
                      </Link>
                      <Link
                        href={svc.href}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          fontFamily: 'var(--font-twk-lausanne)',
                          fontWeight: 500,
                          fontSize: '14px',
                          color: '#6B3828',
                          padding: '12px 16px',
                          textDecoration: 'none',
                          transition: 'color 0.2s',
                        }}
                      >
                        Learn more →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .svc-columns {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
