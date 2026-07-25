'use client'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import Link from 'next/link'

const SERVICES = [
  {
    number: '01',
    eyebrow: 'CORPORATE OVERVIEW',
    titleLines: ['AI AUDIT &', 'IMPLEMENTATION'],
    sloganLabel: 'OUR APPROACH',
    sloganLines: ['WE ASSESS. WE BUILD.', 'WE INTEGRATE.'],
    about:
      'We assess your business across five dimensions of AI readiness — Strategy, Data, Technology, People, and Governance — and build working AI systems that integrate into your actual operation. We do not recommend. We build.',
    watermark: 'AI AUDIT',
    deliverables: [
      'AI Readiness Audit Report',
      'Prioritised Implementation Roadmap',
      'One Working AI System',
      'Handover Documentation & Training',
    ],
    clientStatements: [
      'I need a strategy for AI in my business, not just another tool to try',
      'I want someone to audit my workflow and tell me exactly where AI fits',
      'I need the implementation done for me, not a recommendation to do it myself',
    ],
    href: '/services/ai-audit-implementation',
    ctaHref: '/free-ai-audit',
    ctaLabel: 'Book your free AI audit',
  },
  {
    number: '02',
    eyebrow: 'CORPORATE OVERVIEW',
    titleLines: ['MANAGEMENT &', 'OPERATIONS STRATEGY'],
    sloganLabel: 'OUR APPROACH',
    sloganLines: ['WE DIAGNOSE. WE FIX.', 'WE BUILD THE ROADMAP.'],
    about:
      'We diagnose your cost structure, identify where margin is being lost, and implement targeted restructuring across pricing, process, and resource allocation — so that growth translates into actual profit.',
    watermark: 'STRATEGY',
    deliverables: [
      'Operations Diagnostic Report',
      'Cost Structure Map',
      '90-Day Improvement Roadmap',
      'Executive Presentation Deck',
    ],
    clientStatements: [
      'My costs are rising but I don\'t have a strategy to control them',
      'I need someone to look at my operations objectively and tell me what to fix',
      'I want a structured plan for improving my margins, not generic advice',
    ],
    href: '/services/management-operations',
    ctaHref: '/free-business-audit',
    ctaLabel: 'Get your operations diagnostic',
  },
]

/* ── SVG illustration panels ── */

function AINetworkPanel() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="280" height="200" fill="#151D3A" />
      <line x1="40" y1="120" x2="100" y2="60" stroke="#2A3560" strokeWidth="1" />
      <line x1="100" y1="60" x2="180" y2="80" stroke="#2A3560" strokeWidth="1" />
      <line x1="180" y1="80" x2="240" y2="50" stroke="#2A3560" strokeWidth="1" />
      <line x1="100" y1="60" x2="80" y2="140" stroke="#2A3560" strokeWidth="1" />
      <line x1="80" y1="140" x2="160" y2="150" stroke="#2A3560" strokeWidth="1" />
      <line x1="160" y1="150" x2="180" y2="80" stroke="#2A3560" strokeWidth="1" />
      <line x1="40" y1="120" x2="80" y2="140" stroke="#2A3560" strokeWidth="1" />
      <line x1="160" y1="150" x2="230" y2="160" stroke="#2A3560" strokeWidth="1" />
      <line x1="180" y1="80" x2="240" y2="130" stroke="#2A3560" strokeWidth="1" />
      <line x1="100" y1="60" x2="140" y2="30" stroke="#2A3560" strokeWidth="1" />
      <circle cx="40" cy="120" r="6" fill="#1D2850" stroke="#3A4570" strokeWidth="1" />
      <circle cx="100" cy="60" r="9" fill="#782000" stroke="#994020" strokeWidth="1.5" />
      <circle cx="100" cy="60" r="16" fill="none" stroke="#782000" strokeWidth="0.5" opacity="0.3" />
      <circle cx="180" cy="80" r="7" fill="#1D2850" stroke="#3A4570" strokeWidth="1" />
      <circle cx="240" cy="50" r="5" fill="#1D2850" stroke="#3A4570" strokeWidth="1" />
      <circle cx="80" cy="140" r="7" fill="#1D2850" stroke="#3A4570" strokeWidth="1" />
      <circle cx="160" cy="150" r="6" fill="#782000" stroke="#994020" strokeWidth="1" />
      <circle cx="160" cy="150" r="12" fill="none" stroke="#782000" strokeWidth="0.5" opacity="0.2" />
      <circle cx="230" cy="160" r="4" fill="#1D2850" stroke="#3A4570" strokeWidth="1" />
      <circle cx="240" cy="130" r="5" fill="#1D2850" stroke="#3A4570" strokeWidth="1" />
      <circle cx="140" cy="30" r="4" fill="#1D2850" stroke="#3A4570" strokeWidth="1" />
      <text x="20" y="188" fill="#3A4570" fontSize="7" fontFamily="monospace" letterSpacing="0.15em">NEURAL MAPPING</text>
    </svg>
  )
}

function AIDashboardPanel() {
  return (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="260" height="180" fill="#151D3A" />
      <rect x="16" y="12" width="228" height="5" rx="2.5" fill="#1D2850" />
      <circle cx="24" cy="14.5" r="2" fill="#782000" opacity="0.6" />
      <circle cx="32" cy="14.5" r="2" fill="#3A4570" />
      <circle cx="40" cy="14.5" r="2" fill="#3A4570" />
      <rect x="16" y="26" width="68" height="38" rx="4" fill="#1A2348" stroke="#2A3560" strokeWidth="0.5" />
      <rect x="92" y="26" width="68" height="38" rx="4" fill="#1A2348" stroke="#2A3560" strokeWidth="0.5" />
      <rect x="168" y="26" width="68" height="38" rx="4" fill="#1A2348" stroke="#2A3560" strokeWidth="0.5" />
      <rect x="24" y="34" width="32" height="3" rx="1.5" fill="#3A4570" />
      <rect x="24" y="44" width="48" height="8" rx="2" fill="#AAAAAA" opacity="0.3" />
      <rect x="100" y="34" width="28" height="3" rx="1.5" fill="#3A4570" />
      <rect x="100" y="44" width="44" height="8" rx="2" fill="#782000" opacity="0.5" />
      <rect x="176" y="34" width="36" height="3" rx="1.5" fill="#3A4570" />
      <rect x="176" y="44" width="50" height="8" rx="2" fill="#AAAAAA" opacity="0.3" />
      <rect x="16" y="74" width="228" height="94" rx="4" fill="#1A2348" stroke="#2A3560" strokeWidth="0.5" />
      <line x1="24" y1="158" x2="236" y2="158" stroke="#2A3560" strokeWidth="0.5" />
      <rect x="32" y="130" width="14" height="28" rx="2" fill="#2A3560" />
      <rect x="54" y="118" width="14" height="40" rx="2" fill="#2A3560" />
      <rect x="76" y="126" width="14" height="32" rx="2" fill="#2A3560" />
      <rect x="98" y="108" width="14" height="50" rx="2" fill="#782000" opacity="0.7" />
      <rect x="120" y="120" width="14" height="38" rx="2" fill="#2A3560" />
      <rect x="142" y="112" width="14" height="46" rx="2" fill="#2A3560" />
      <rect x="164" y="122" width="14" height="36" rx="2" fill="#2A3560" />
      <rect x="186" y="104" width="14" height="54" rx="2" fill="#2A3560" />
      <rect x="208" y="114" width="14" height="44" rx="2" fill="#2A3560" />
      <text x="236" y="96" fill="#3A4570" fontSize="6" fontFamily="monospace" textAnchor="end">AI METRICS</text>
    </svg>
  )
}

function CostStructurePanel() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="280" height="200" fill="#151D3A" />
      <rect x="20" y="16" width="70" height="3" rx="1.5" fill="#3A4570" />
      <rect x="20" y="36" width="200" height="20" rx="4" fill="#782000" opacity="0.5" />
      <rect x="20" y="64" width="155" height="20" rx="4" fill="#1D2850" stroke="#2A3560" strokeWidth="0.5" />
      <rect x="20" y="92" width="120" height="20" rx="4" fill="#1D2850" stroke="#2A3560" strokeWidth="0.5" />
      <rect x="20" y="120" width="85" height="20" rx="4" fill="#1D2850" stroke="#2A3560" strokeWidth="0.5" />
      <rect x="20" y="148" width="55" height="20" rx="4" fill="#1D2850" stroke="#2A3560" strokeWidth="0.5" />
      <text x="228" y="50" fill="#AAAAAA" fontSize="8" fontFamily="monospace" opacity="0.5">38%</text>
      <text x="183" y="78" fill="#AAAAAA" fontSize="8" fontFamily="monospace" opacity="0.5">24%</text>
      <text x="148" y="106" fill="#AAAAAA" fontSize="8" fontFamily="monospace" opacity="0.5">18%</text>
      <text x="113" y="134" fill="#AAAAAA" fontSize="8" fontFamily="monospace" opacity="0.5">12%</text>
      <text x="83" y="162" fill="#AAAAAA" fontSize="8" fontFamily="monospace" opacity="0.5">8%</text>
      <text x="20" y="188" fill="#3A4570" fontSize="7" fontFamily="monospace" letterSpacing="0.15em">COST STRUCTURE</text>
    </svg>
  )
}

function RoadmapPanel() {
  return (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="260" height="180" fill="#151D3A" />
      <line x1="30" y1="95" x2="230" y2="95" stroke="#2A3560" strokeWidth="1.5" />
      <line x1="30" y1="95" x2="170" y2="95" stroke="#782000" strokeWidth="2.5" opacity="0.6" />
      <circle cx="30" cy="95" r="9" fill="#782000" stroke="#994020" strokeWidth="1" />
      <circle cx="30" cy="95" r="3.5" fill="#FFFFFF" opacity="0.7" />
      <circle cx="96" cy="95" r="9" fill="#782000" stroke="#994020" strokeWidth="1" />
      <circle cx="96" cy="95" r="3.5" fill="#FFFFFF" opacity="0.7" />
      <circle cx="163" cy="95" r="9" fill="#782000" stroke="#994020" strokeWidth="1" />
      <circle cx="163" cy="95" r="3.5" fill="#FFFFFF" opacity="0.7" />
      <circle cx="230" cy="95" r="9" fill="#1D2850" stroke="#3A4570" strokeWidth="1" />
      <line x1="30" y1="78" x2="30" y2="86" stroke="#782000" strokeWidth="1" opacity="0.4" />
      <line x1="96" y1="78" x2="96" y2="86" stroke="#782000" strokeWidth="1" opacity="0.4" />
      <line x1="163" y1="78" x2="163" y2="86" stroke="#782000" strokeWidth="1" opacity="0.4" />
      <line x1="230" y1="78" x2="230" y2="86" stroke="#3A4570" strokeWidth="1" opacity="0.4" />
      <text x="30" y="70" fill="#AAAAAA" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.6">DIAGNOSTIC</text>
      <text x="96" y="70" fill="#AAAAAA" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.6">COST MAP</text>
      <text x="163" y="70" fill="#AAAAAA" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.6">ROADMAP</text>
      <text x="230" y="70" fill="#3A4570" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.6">HANDOVER</text>
      <text x="63" y="122" fill="#3A4570" fontSize="6" fontFamily="monospace" textAnchor="middle">WEEK 1–2</text>
      <text x="130" y="122" fill="#3A4570" fontSize="6" fontFamily="monospace" textAnchor="middle">WEEK 3–6</text>
      <text x="196" y="122" fill="#3A4570" fontSize="6" fontFamily="monospace" textAnchor="middle">WEEK 7–12</text>
      <text x="20" y="165" fill="#3A4570" fontSize="7" fontFamily="monospace" letterSpacing="0.15em">90-DAY ROADMAP</text>
    </svg>
  )
}

function BrandMark() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
      <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <circle cx="40" cy="40" r="24" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <text x="40" y="37" fill="#FFFFFF" fontSize="22" fontWeight="700" fontFamily="'Bebas Neue', Impact, sans-serif" textAnchor="middle" dominantBaseline="central" letterSpacing="0.05em">Z</text>
      <text x="40" y="54" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace" textAnchor="middle" letterSpacing="0.18em">&amp; CO</text>
    </svg>
  )
}

/* ── Orbit dot positions ── */
const ORBIT_DOTS = [0, 45, 90, 135, 180, 225, 270, 315]

/* ── Service Hero (cinematic full-viewport section) ── */

function ServiceHero({ service, index }: { service: typeof SERVICES[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const trig = { trigger: el, start: 'top 65%', once: true }
      gsap.from(el.querySelector('.sh-circle'), { scale: 0.8, opacity: 0, duration: 1.2, ease: 'power2.out', scrollTrigger: trig })
      gsap.from(el.querySelectorAll('.sh-orbit'), { opacity: 0, rotation: -15, duration: 1.4, ease: 'power2.out', stagger: 0.2, scrollTrigger: trig })
      gsap.from(el.querySelector('.sh-panel-bl'), { x: -50, y: 30, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.3, scrollTrigger: trig })
      gsap.from(el.querySelector('.sh-panel-tr'), { x: 50, y: -30, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.4, scrollTrigger: trig })
      gsap.from(el.querySelector('.sh-brand'), { scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(2)', delay: 0.6, scrollTrigger: trig })
      el.querySelectorAll<HTMLElement>('.sh-text').forEach((block, i) => {
        gsap.from(block, { opacity: 0, y: 24, duration: 0.8, ease: 'power2.out', delay: 0.2 + i * 0.12, scrollTrigger: trig })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  const PanelBL = index === 0 ? AINetworkPanel : CostStructurePanel
  const PanelTR = index === 0 ? AIDashboardPanel : RoadmapPanel

  return (
    <div ref={ref} className="sh-section" style={{
      position: 'relative',
      minHeight: '100vh',
      background: '#0F1428',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Layer 1 — dot grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Layer 2 — ghost data viz */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        <rect x="58%" y="62%" width="2.5%" height="12%" rx="2" fill="rgba(255,255,255,0.015)" />
        <rect x="62%" y="57%" width="2.5%" height="17%" rx="2" fill="rgba(255,255,255,0.015)" />
        <rect x="66%" y="60%" width="2.5%" height="14%" rx="2" fill="rgba(255,255,255,0.015)" />
        <rect x="70%" y="54%" width="2.5%" height="20%" rx="2" fill="rgba(255,255,255,0.015)" />
        <rect x="74%" y="58%" width="2.5%" height="16%" rx="2" fill="rgba(255,255,255,0.015)" />
        <path d="M 8% 72% Q 16% 62%, 26% 67% T 44% 58%" stroke="rgba(255,255,255,0.02)" strokeWidth="1.5" fill="none" />
        <circle cx="82%" cy="28%" r="4.5%" stroke="rgba(255,255,255,0.012)" strokeWidth="2.5" fill="none" strokeDasharray="14 8" />
        <circle cx="15%" cy="25%" r="3%" stroke="rgba(255,255,255,0.01)" strokeWidth="1.5" fill="none" strokeDasharray="8 6" />
      </svg>

      {/* Layer 3 — warm glow */}
      <div style={{
        position: 'absolute', right: '-8%', top: '30%', width: '500px', height: '500px', zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(120,32,0,0.06) 0%, transparent 70%)',
      }} />

      {/* Layer 4 — watermark typography */}
      <div className="sh-watermark" aria-hidden="true" style={{
        position: 'absolute', bottom: '-0.15em', right: '-0.02em', zIndex: 2,
        fontFamily: "var(--font-bebas, 'Bebas Neue', Impact, sans-serif)",
        fontSize: 'clamp(100px, 14vw, 180px)', fontWeight: 700, lineHeight: 0.85,
        color: '#1D2348', textTransform: 'uppercase', userSelect: 'none', pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        {service.watermark}
      </div>

      {/* Layer 5 — central circle */}
      <div className="sh-circle" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(55vw, 680px)', height: 'min(55vw, 680px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 32%, #1E2855, #182040 75%)',
        zIndex: 3,
      }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.03) 0%, transparent 50%)',
        }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <circle cx="50%" cy="50%" r="35%" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" fill="none" />
          <circle cx="50%" cy="50%" r="22%" stroke="rgba(255,255,255,0.01)" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Layer 6 — orbit ring 1 */}
      <div className="sh-orbit" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(66vw, 820px)', height: 'min(66vw, 820px)',
        borderRadius: '50%',
        border: '1px dashed rgba(255,255,255,0.055)',
        zIndex: 4, pointerEvents: 'none',
      }}>
        {ORBIT_DOTS.map(deg => (
          <div key={deg} style={{
            position: 'absolute',
            top: `${50 - 50 * Math.cos(deg * Math.PI / 180)}%`,
            left: `${50 + 50 * Math.sin(deg * Math.PI / 180)}%`,
            width: deg % 90 === 0 ? '5px' : '3px',
            height: deg % 90 === 0 ? '5px' : '3px',
            borderRadius: '50%',
            background: deg === 45 || deg === 225 ? 'rgba(120,32,0,0.45)' : 'rgba(255,255,255,0.07)',
            transform: 'translate(-50%, -50%)',
          }} />
        ))}
      </div>

      {/* Layer 6b — orbit ring 2 */}
      <div className="sh-orbit" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(78vw, 960px)', height: 'min(78vw, 960px)',
        borderRadius: '50%',
        border: '1px dashed rgba(255,255,255,0.025)',
        zIndex: 4, pointerEvents: 'none',
      }} />

      {/* Layer 7 — brand mark (center) */}
      <div className="sh-brand" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)', zIndex: 6,
      }}>
        <BrandMark />
      </div>

      {/* Layer 8 — illustration panel bottom-left (7 o'clock) */}
      <div className="sh-panel-bl" style={{
        position: 'absolute',
        bottom: '16%', left: '7%',
        width: 'clamp(180px, 22vw, 300px)',
        aspectRatio: '280 / 200',
        borderRadius: '12px',
        background: '#151D3A',
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden', zIndex: 5,
        boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
      }}>
        <PanelBL />
      </div>

      {/* Layer 8b — illustration panel top-right (1 o'clock) */}
      <div className="sh-panel-tr" style={{
        position: 'absolute',
        top: '10%', right: '5%',
        width: 'clamp(160px, 20vw, 280px)',
        aspectRatio: '260 / 180',
        borderRadius: '12px',
        background: '#151D3A',
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden', zIndex: 5,
        boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
      }}>
        <PanelTR />
      </div>

      {/* Layer 9 — text: top-left (headline) */}
      <div className="sh-text" style={{
        position: 'absolute',
        top: 'clamp(36px, 7vh, 80px)', left: 'clamp(28px, 5vw, 72px)',
        zIndex: 7,
      }}>
        <p style={{
          fontFamily: 'var(--font-dm-mono, monospace)',
          fontSize: '10px', color: 'rgba(170,170,170,0.45)',
          letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '10px',
        }}>
          {service.eyebrow}
        </p>
        <h2 style={{
          fontFamily: "var(--font-bebas, 'Bebas Neue', Impact, sans-serif)",
          fontSize: 'clamp(30px, 4vw, 52px)', color: '#FFFFFF',
          lineHeight: 1, letterSpacing: '-0.01em', textTransform: 'uppercase',
        }}>
          {service.titleLines.map((line, i) => (
            <span key={i} style={{ display: 'block' }}>{line}</span>
          ))}
        </h2>
      </div>

      {/* Layer 9b — text: top-right (slogan) */}
      <div className="sh-text sh-text-tr" style={{
        position: 'absolute',
        top: 'clamp(36px, 7vh, 80px)', right: 'clamp(28px, 5vw, 72px)',
        textAlign: 'right', zIndex: 7,
      }}>
        <p style={{
          fontFamily: 'var(--font-dm-mono, monospace)',
          fontSize: '10px', color: 'rgba(170,170,170,0.45)',
          letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '10px',
        }}>
          {service.sloganLabel}
        </p>
        <p style={{
          fontFamily: "var(--font-bebas, 'Bebas Neue', Impact, sans-serif)",
          fontSize: 'clamp(15px, 1.8vw, 24px)', color: '#FFFFFF',
          lineHeight: 1.25, letterSpacing: '0.01em', textTransform: 'uppercase',
        }}>
          {service.sloganLines.map((line, i) => (
            <span key={i} style={{ display: 'block' }}>{line}</span>
          ))}
        </p>
      </div>

      {/* Layer 9c — text: bottom-left (about) */}
      <div className="sh-text sh-text-bl" style={{
        position: 'absolute',
        bottom: 'clamp(36px, 7vh, 80px)', left: 'clamp(28px, 5vw, 72px)',
        maxWidth: '340px', zIndex: 7,
      }}>
        <p style={{
          fontFamily: 'var(--font-dm-mono, monospace)',
          fontSize: '10px', color: 'rgba(170,170,170,0.45)',
          letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '10px',
        }}>
          ABOUT
        </p>
        <p style={{
          fontFamily: 'var(--font-twk-lausanne, Inter, sans-serif)',
          fontSize: '13px', fontWeight: 300, color: '#AAAAAA', lineHeight: 1.75,
        }}>
          {service.about}
        </p>
      </div>

      {/* Layer 9d — service number badge (bottom-right) */}
      <div className="sh-text" style={{
        position: 'absolute',
        bottom: 'clamp(36px, 7vh, 80px)', right: 'clamp(28px, 5vw, 72px)',
        textAlign: 'right', zIndex: 7,
      }}>
        <p style={{
          fontFamily: 'var(--font-dm-mono, monospace)',
          fontSize: '10px', color: 'rgba(170,170,170,0.45)',
          letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '6px',
        }}>
          SERVICE
        </p>
        <p style={{
          fontFamily: "var(--font-bebas, 'Bebas Neue', Impact, sans-serif)",
          fontSize: 'clamp(36px, 5vw, 72px)', color: 'rgba(255,255,255,0.08)',
          lineHeight: 0.9,
        }}>
          {service.number}
        </p>
      </div>
    </div>
  )
}

/* ── Service details (deliverables + client statements below hero) ── */

function ServiceDetails({ service }: { service: typeof SERVICES[number] }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>('.sd-item').forEach((item, i) => {
        gsap.from(item, {
          opacity: 0, y: 20, duration: 0.6, ease: 'power2.out',
          delay: i * 0.08,
          scrollTrigger: { trigger: item, start: 'top 85%', once: true },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} style={{
      background: '#0F1428',
      padding: 'clamp(40px, 6vh, 72px) clamp(28px, 5vw, 72px)',
      borderTop: '1px solid rgba(255,255,255,0.03)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="sd-grid" style={{ display: 'grid', gap: '48px' }}>
          {/* Deliverables */}
          <div>
            <p className="sd-item" style={{
              fontFamily: 'var(--font-dm-mono, monospace)',
              fontSize: '10px', color: 'rgba(170,170,170,0.4)',
              letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '20px',
            }}>
              What You Get
            </p>
            <div className="sd-del-grid" style={{ display: 'grid', gap: '10px' }}>
              {service.deliverables.map((del, i) => (
                <div key={i} className="sd-item" style={{
                  display: 'flex', gap: '14px', alignItems: 'center',
                  padding: '14px 20px',
                  background: 'rgba(29,35,72,0.25)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.035)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-dm-mono, monospace)',
                    fontSize: '10px', color: '#782000', flexShrink: 0,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-twk-lausanne, Inter, sans-serif)',
                    fontSize: '14px', fontWeight: 400, color: '#AAAAAA',
                  }}>
                    {del}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Client statements */}
          <div>
            <p className="sd-item" style={{
              fontFamily: 'var(--font-dm-mono, monospace)',
              fontSize: '10px', color: 'rgba(170,170,170,0.4)',
              letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '20px',
            }}>
              Client Statement
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {service.clientStatements.map((s, i) => (
                <div key={i} className="sd-item" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#782000', flexShrink: 0, marginTop: '2px', fontSize: '12px' }}>—</span>
                  <span style={{
                    fontFamily: 'var(--font-editorial-new, Georgia, serif)',
                    fontStyle: 'italic', fontSize: '14px', fontWeight: 300,
                    color: 'rgba(255,255,255,0.55)', lineHeight: 1.65,
                  }}>
                    &ldquo;{s}&rdquo;
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="sd-item" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href={service.ctaHref} style={{
              display: 'inline-flex', alignItems: 'center',
              fontFamily: 'var(--font-twk-lausanne, Inter, sans-serif)',
              fontWeight: 600, fontSize: '14px', color: '#FFFFFF',
              background: '#782000', padding: '14px 28px', borderRadius: '8px',
              textDecoration: 'none', transition: 'background 0.2s',
            }}>
              {service.ctaLabel} →
            </Link>
            <Link href={service.href} style={{
              display: 'inline-flex', alignItems: 'center',
              fontFamily: 'var(--font-twk-lausanne, Inter, sans-serif)',
              fontWeight: 500, fontSize: '14px', color: '#AAAAAA',
              padding: '14px 20px', textDecoration: 'none',
            }}>
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main export ── */

export function ServicesSection() {
  return (
    <section id="services">
      {SERVICES.map((svc, i) => (
        <div key={svc.number}>
          <ServiceHero service={svc} index={i} />
          <ServiceDetails service={svc} />
        </div>
      ))}

      <style>{`
        @media (min-width: 768px) {
          .sd-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .sd-grid > div:last-child {
            grid-column: 1 / -1 !important;
          }
          .sd-del-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 767px) {
          .sh-panel-bl, .sh-panel-tr {
            display: none !important;
          }
          .sh-text-tr {
            display: none !important;
          }
          .sh-text-bl {
            max-width: 90vw !important;
          }
          .sh-watermark {
            font-size: 60px !important;
            opacity: 0.4;
          }
          .sh-section {
            min-height: 85vh !important;
          }
        }
      `}</style>
    </section>
  )
}
