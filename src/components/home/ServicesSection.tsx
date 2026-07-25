'use client'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import Link from 'next/link'
import { TopoWaveField } from '@/components/shared/TopoWaveField'

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
    circleImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=800&fit=crop&q=80',
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
    circleImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=800&fit=crop&q=80',
  },
]

/* ── SVG illustration panels ── */

function AINetworkPanel() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="280" height="200" fill="#FFFFFF" />
      <text x="16" y="16" fill="#8A8E99" fontSize="9" fontFamily="'DM Mono', monospace" letterSpacing="0.15em">NEURAL MAPPING</text>
      <line x1="40" y1="120" x2="100" y2="60" stroke="#D0D4DE" strokeWidth="1" />
      <line x1="100" y1="60" x2="180" y2="80" stroke="#D0D4DE" strokeWidth="1" />
      <line x1="180" y1="80" x2="240" y2="50" stroke="#D0D4DE" strokeWidth="1" />
      <line x1="100" y1="60" x2="80" y2="140" stroke="#D0D4DE" strokeWidth="1" />
      <line x1="80" y1="140" x2="160" y2="150" stroke="#D0D4DE" strokeWidth="1" />
      <line x1="160" y1="150" x2="180" y2="80" stroke="#D0D4DE" strokeWidth="1" />
      <line x1="40" y1="120" x2="80" y2="140" stroke="#D0D4DE" strokeWidth="1" />
      <line x1="160" y1="150" x2="230" y2="160" stroke="#D0D4DE" strokeWidth="1" />
      <line x1="180" y1="80" x2="240" y2="130" stroke="#D0D4DE" strokeWidth="1" />
      <line x1="100" y1="60" x2="140" y2="30" stroke="#D0D4DE" strokeWidth="1" />
      <circle cx="40" cy="120" r="6" fill="#E8EAF0" stroke="#C0C4D0" strokeWidth="1" />
      <circle cx="100" cy="60" r="9" fill="#C05020" stroke="#D06030" strokeWidth="1.5" />
      <circle cx="100" cy="60" r="16" fill="none" stroke="#C05020" strokeWidth="0.5" opacity="0.3" />
      <circle cx="180" cy="80" r="7" fill="#E8EAF0" stroke="#C0C4D0" strokeWidth="1" />
      <circle cx="240" cy="50" r="5" fill="#E8EAF0" stroke="#C0C4D0" strokeWidth="1" />
      <circle cx="80" cy="140" r="7" fill="#E8EAF0" stroke="#C0C4D0" strokeWidth="1" />
      <circle cx="160" cy="150" r="6" fill="#C05020" stroke="#D06030" strokeWidth="1" />
      <circle cx="160" cy="150" r="12" fill="none" stroke="#C05020" strokeWidth="0.5" opacity="0.2" />
      <circle cx="230" cy="160" r="4" fill="#E8EAF0" stroke="#C0C4D0" strokeWidth="1" />
      <circle cx="240" cy="130" r="5" fill="#E8EAF0" stroke="#C0C4D0" strokeWidth="1" />
      <circle cx="140" cy="30" r="4" fill="#E8EAF0" stroke="#C0C4D0" strokeWidth="1" />
      <text x="100" y="46" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="middle">STRATEGY</text>
      <text x="180" y="96" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="middle">DATA</text>
      <text x="40" y="108" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="middle">PEOPLE</text>
      <text x="160" y="166" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="middle">TECH</text>
      <text x="240" y="144" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="middle">GOV</text>
    </svg>
  )
}

function AIDashboardPanel() {
  return (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="260" height="180" fill="#FFFFFF" />
      <text x="16" y="16" fill="#8A8E99" fontSize="9" fontFamily="'DM Mono', monospace" letterSpacing="0.15em">AI READINESS SCORE</text>
      <rect x="16" y="26" width="68" height="38" rx="4" fill="#F4F5F8" stroke="#E0E2EA" strokeWidth="0.5" />
      <rect x="92" y="26" width="68" height="38" rx="4" fill="#F4F5F8" stroke="#E0E2EA" strokeWidth="0.5" />
      <rect x="168" y="26" width="68" height="38" rx="4" fill="#F4F5F8" stroke="#E0E2EA" strokeWidth="0.5" />
      <rect x="24" y="34" width="32" height="3" rx="1.5" fill="#C0C4D0" />
      <rect x="24" y="44" width="48" height="8" rx="2" fill="#B0B4C0" opacity="0.4" />
      <rect x="100" y="34" width="28" height="3" rx="1.5" fill="#C0C4D0" />
      <rect x="100" y="44" width="44" height="8" rx="2" fill="#C05020" opacity="0.6" />
      <rect x="176" y="34" width="36" height="3" rx="1.5" fill="#C0C4D0" />
      <rect x="176" y="44" width="50" height="8" rx="2" fill="#B0B4C0" opacity="0.4" />
      <rect x="16" y="74" width="228" height="94" rx="4" fill="#F4F5F8" stroke="#E0E2EA" strokeWidth="0.5" />
      <line x1="24" y1="158" x2="236" y2="158" stroke="#E0E2EA" strokeWidth="0.5" />
      <rect x="32" y="130" width="14" height="28" rx="2" fill="#C0C4D0" />
      <rect x="54" y="118" width="14" height="40" rx="2" fill="#C0C4D0" />
      <rect x="76" y="126" width="14" height="32" rx="2" fill="#C0C4D0" />
      <rect x="98" y="108" width="14" height="50" rx="2" fill="#C05020" />
      <rect x="120" y="120" width="14" height="38" rx="2" fill="#C0C4D0" />
      <rect x="142" y="112" width="14" height="46" rx="2" fill="#C0C4D0" />
      <rect x="164" y="122" width="14" height="36" rx="2" fill="#C0C4D0" />
      <rect x="186" y="104" width="14" height="54" rx="2" fill="#C0C4D0" />
      <rect x="208" y="114" width="14" height="44" rx="2" fill="#C0C4D0" />
    </svg>
  )
}

function CostStructurePanel() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="280" height="200" fill="#FFFFFF" />
      <text x="16" y="16" fill="#8A8E99" fontSize="9" fontFamily="'DM Mono', monospace" letterSpacing="0.15em">COST STRUCTURE BREAKDOWN</text>
      {/* Bar 1: Vendor & Supply 38% */}
      <rect x="16" y="30" width="200" height="22" rx="4" fill="#C05020" />
      <text x="24" y="45" fill="#FFFFFF" fontSize="9" fontFamily="'DM Mono', monospace">Vendor &amp; Supply</text>
      <text x="208" y="45" fill="#FFFFFF" fontSize="9" fontFamily="'DM Mono', monospace" textAnchor="end">38%</text>
      {/* Bar 2: Labour & Team 24% */}
      <rect x="16" y="58" width="155" height="22" rx="4" fill="#3A3F50" />
      <text x="24" y="73" fill="#FFFFFF" fontSize="9" fontFamily="'DM Mono', monospace">Labour &amp; Team</text>
      <text x="163" y="73" fill="#FFFFFF" fontSize="9" fontFamily="'DM Mono', monospace" textAnchor="end">24%</text>
      {/* Bar 3: Op. Overhead 18% */}
      <rect x="16" y="86" width="120" height="22" rx="4" fill="#6B7080" />
      <text x="24" y="101" fill="#FFFFFF" fontSize="9" fontFamily="'DM Mono', monospace">Op. Overhead</text>
      <text x="128" y="101" fill="#FFFFFF" fontSize="9" fontFamily="'DM Mono', monospace" textAnchor="end">18%</text>
      {/* Bar 4: Marketing 12% */}
      <rect x="16" y="114" width="85" height="22" rx="4" fill="#9098A8" />
      <text x="24" y="129" fill="#FFFFFF" fontSize="9" fontFamily="'DM Mono', monospace">Marketing</text>
      <text x="93" y="129" fill="#FFFFFF" fontSize="9" fontFamily="'DM Mono', monospace" textAnchor="end">12%</text>
      {/* Bar 5: Misc. 8% */}
      <rect x="16" y="142" width="55" height="22" rx="4" fill="#C0C4D0" />
      <text x="24" y="157" fill="#555566" fontSize="9" fontFamily="'DM Mono', monospace">Misc.</text>
      <text x="63" y="157" fill="#555566" fontSize="9" fontFamily="'DM Mono', monospace" textAnchor="end">8%</text>
    </svg>
  )
}

function RoadmapPanel() {
  return (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="260" height="180" fill="#FFFFFF" />
      <text x="16" y="16" fill="#8A8E99" fontSize="9" fontFamily="'DM Mono', monospace" letterSpacing="0.15em">90-DAY ROADMAP</text>
      {/* Timeline rail */}
      <line x1="35" y1="90" x2="225" y2="90" stroke="#E0E2EA" strokeWidth="1.5" />
      <line x1="35" y1="90" x2="162" y2="90" stroke="#C05020" strokeWidth="2.5" opacity="0.6" />
      {/* Node 1: DIAGNOSTIC — WK 1-2 */}
      <circle cx="35" cy="90" r="9" fill="#C05020" stroke="#D06030" strokeWidth="1" />
      <circle cx="35" cy="90" r="3.5" fill="#FFFFFF" opacity="0.9" />
      <line x1="35" y1="73" x2="35" y2="81" stroke="#C05020" strokeWidth="1" opacity="0.4" />
      <text x="35" y="65" fill="#555566" fontSize="6.5" fontFamily="'DM Mono', monospace" textAnchor="middle">DIAGNOSTIC</text>
      <text x="35" y="112" fill="#8A8E99" fontSize="6" fontFamily="'DM Mono', monospace" textAnchor="middle">WK 1–2</text>
      {/* Node 2: COST MAP — WK 3-4 */}
      <circle cx="98" cy="90" r="9" fill="#C05020" stroke="#D06030" strokeWidth="1" />
      <circle cx="98" cy="90" r="3.5" fill="#FFFFFF" opacity="0.9" />
      <line x1="98" y1="73" x2="98" y2="81" stroke="#C05020" strokeWidth="1" opacity="0.4" />
      <text x="98" y="65" fill="#555566" fontSize="6.5" fontFamily="'DM Mono', monospace" textAnchor="middle">COST MAP</text>
      <text x="98" y="112" fill="#8A8E99" fontSize="6" fontFamily="'DM Mono', monospace" textAnchor="middle">WK 3–4</text>
      {/* Node 3: ROADMAP — WK 5-6 */}
      <circle cx="162" cy="90" r="9" fill="#C05020" stroke="#D06030" strokeWidth="1" />
      <circle cx="162" cy="90" r="3.5" fill="#FFFFFF" opacity="0.9" />
      <line x1="162" y1="73" x2="162" y2="81" stroke="#C05020" strokeWidth="1" opacity="0.4" />
      <text x="162" y="65" fill="#555566" fontSize="6.5" fontFamily="'DM Mono', monospace" textAnchor="middle">ROADMAP</text>
      <text x="162" y="112" fill="#8A8E99" fontSize="6" fontFamily="'DM Mono', monospace" textAnchor="middle">WK 5–6</text>
      {/* Node 4: HANDOVER — WK 7-8 */}
      <circle cx="225" cy="90" r="9" fill="#E8EAF0" stroke="#C0C4D0" strokeWidth="1" />
      <line x1="225" y1="73" x2="225" y2="81" stroke="#C0C4D0" strokeWidth="1" opacity="0.4" />
      <text x="225" y="65" fill="#B0B4C0" fontSize="6.5" fontFamily="'DM Mono', monospace" textAnchor="middle">HANDOVER</text>
      <text x="225" y="112" fill="#B0B4C0" fontSize="6" fontFamily="'DM Mono', monospace" textAnchor="middle">WK 7–8</text>
    </svg>
  )
}

function BrandMark() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
      <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="24" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <text x="40" y="35" fill="#FFFFFF" fontSize="28" fontWeight="700" fontFamily="'Bebas Neue', Impact, sans-serif" textAnchor="middle" dominantBaseline="central" letterSpacing="0.05em">Z</text>
      <text x="40" y="56" fill="#AAAAAA" fontSize="10" fontFamily="'DM Mono', monospace" textAnchor="middle" letterSpacing="0.2em">&amp; CO</text>
    </svg>
  )
}

/* ── Service Hero (cinematic full-viewport section) ── */

function ServiceHero({ service, index }: { service: typeof SERVICES[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const trig = { trigger: el, start: 'top 65%', once: true }
      gsap.from(el.querySelector('.sh-circle'), { scale: 0.8, opacity: 0, duration: 1.2, ease: 'power2.out', scrollTrigger: trig })
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
      background: '#0C0F16',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Living organism background — white flowing lines on dark */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <TopoWaveField theme="dark" lineCount={24} amplitude={18} mouseInteraction={false} opacity={0.8} lineWidthScale={3} />
      </div>

      {/* Ghost data viz */}
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

      {/* Warm glow */}
      <div style={{
        position: 'absolute', right: '-8%', top: '30%', width: '500px', height: '500px', zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(120,32,0,0.06) 0%, transparent 70%)',
      }} />

      {/* Precision swoosh at 75% vertical */}
      <div style={{
        position: 'absolute', top: '75%', left: 0, right: 0,
        height: '1px', zIndex: 5, pointerEvents: 'none',
        background: 'linear-gradient(90deg, transparent 0%, #3C3C3C 15%, #828282 40%, #AAAAAA 55%, #828282 70%, #3C3C3C 85%, transparent 100%)',
      }} />

      {/* Watermark — service name only, 160px, cropped at bottom-right */}
      <div className="sh-watermark" aria-hidden="true" style={{
        position: 'absolute', bottom: '-0.15em', right: '-0.02em', zIndex: 2,
        fontFamily: "var(--font-bebas, 'Bebas Neue', Impact, sans-serif)",
        fontSize: 'clamp(100px, 13vw, 160px)', fontWeight: 700, lineHeight: 0.85,
        color: '#161A28', textTransform: 'uppercase', userSelect: 'none', pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        {service.watermark}
      </div>

      {/* Central circle — engagement image with navy overlay */}
      <div className="sh-circle" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(55vw, 680px)', height: 'min(55vw, 680px)',
        borderRadius: '50%',
        background: '#0C0F16',
        zIndex: 3, overflow: 'hidden',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.circleImage}
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: 0.55,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,15,22,0.4)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.03) 0%, transparent 50%)' }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <circle cx="50%" cy="50%" r="35%" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" fill="none" />
          <circle cx="50%" cy="50%" r="22%" stroke="rgba(255,255,255,0.01)" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Brand mark (center) — 80x80, white Z, #AAAAAA & CO */}
      <div className="sh-brand" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)', zIndex: 6,
      }}>
        <BrandMark />
      </div>

      {/* Panel bottom-left — white bg for contrast */}
      <div className="sh-panel-bl" style={{
        position: 'absolute',
        bottom: '28%', left: '5%',
        width: 'clamp(180px, 22vw, 300px)',
        aspectRatio: '280 / 200',
        borderRadius: '12px',
        background: '#FFFFFF',
        border: '1px solid #E0E2EA',
        overflow: 'hidden', zIndex: 5,
        boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
      }}>
        <PanelBL />
      </div>

      {/* Panel top-right — white bg for contrast */}
      <div className="sh-panel-tr" style={{
        position: 'absolute',
        top: '10%', right: '5%',
        width: 'clamp(160px, 20vw, 280px)',
        aspectRatio: '260 / 180',
        borderRadius: '12px',
        background: '#FFFFFF',
        border: '1px solid #E0E2EA',
        overflow: 'hidden', zIndex: 5,
        boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
      }}>
        <PanelTR />
      </div>

      {/* Text: top-left (headline) — eyebrow 11px #828282, 0.25em tracking */}
      <div className="sh-text" style={{
        position: 'absolute',
        top: 'clamp(36px, 7vh, 80px)', left: 'clamp(28px, 5vw, 72px)',
        zIndex: 7,
      }}>
        <p style={{
          fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
          fontSize: '11px', color: '#828282',
          letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '10px',
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

      {/* Text: top-right (slogan) */}
      <div className="sh-text sh-text-tr" style={{
        position: 'absolute',
        top: 'clamp(36px, 7vh, 80px)', right: 'clamp(28px, 5vw, 72px)',
        textAlign: 'right', zIndex: 7,
      }}>
        <p style={{
          fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
          fontSize: '11px', color: '#828282',
          letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '10px',
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

      {/* Text: bottom-left (about) — ABOUT label in #782000, positioned below panel */}
      <div className="sh-text sh-text-bl" style={{
        position: 'absolute',
        bottom: 'clamp(36px, 5vh, 64px)', left: 'clamp(28px, 5vw, 72px)',
        maxWidth: '320px', zIndex: 7,
      }}>
        <p style={{
          fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
          fontSize: '11px', color: '#C46A3A',
          letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px',
          fontWeight: 500,
        }}>
          ABOUT
        </p>
        <p style={{
          fontFamily: 'var(--font-twk-lausanne, Inter, sans-serif)',
          fontSize: '15px', fontWeight: 500, color: '#E8E8E8', lineHeight: 1.7,
        }}>
          {service.about}
        </p>
      </div>

      {/* CTA button (bottom-right) — #182040 bg, 1.5px white border */}
      <div className="sh-text" style={{
        position: 'absolute',
        bottom: 'clamp(36px, 5vh, 64px)', right: 'clamp(28px, 5vw, 72px)',
        zIndex: 7,
      }}>
        <Link href={service.ctaHref} className="sh-cta" style={{
          display: 'inline-flex', alignItems: 'center',
          fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
          fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#FFFFFF', background: '#182040',
          border: '1.5px solid #FFFFFF', padding: '14px 28px',
          borderRadius: '4px', textDecoration: 'none',
          transition: 'background 0.25s, border-color 0.25s',
        }}>
          {service.ctaLabel} →
        </Link>
      </div>
    </div>
  )
}

/* ── Service details (deliverables + client pain points below hero) ── */

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
      background: '#0C0F16',
      padding: 'clamp(40px, 6vh, 72px) clamp(28px, 5vw, 72px)',
      borderTop: '1px solid rgba(255,255,255,0.03)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="sd-grid" style={{ display: 'grid', gap: '48px' }}>
          {/* Deliverables */}
          <div>
            <p className="sd-item" style={{
              fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
              fontSize: '11px', color: '#828282',
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
                    fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
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

          {/* Client pain points */}
          <div>
            <p className="sd-item" style={{
              fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
              fontSize: '11px', color: '#828282',
              letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '20px',
            }}>
              Client Pain Points
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
          .sh-cta {
            font-size: 11px !important;
            padding: 12px 20px !important;
          }
        }
      `}</style>
    </section>
  )
}
