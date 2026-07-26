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

function AIAssessmentPanel() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="280" height="200" fill="#FFFFFF" />
      {/* Header */}
      <text x="16" y="15" fill="#555566" fontSize="7" fontFamily="'DM Mono', monospace" letterSpacing="0.12em" fontWeight="600">AI READINESS ASSESSMENT</text>
      <text x="16" y="36" fill="#C05020" fontSize="20" fontFamily="'DM Mono', monospace" fontWeight="700">55</text>
      <text x="43" y="36" fill="#8A8E99" fontSize="7" fontFamily="'DM Mono', monospace">/100</text>
      <text x="16" y="46" fill="#B0B4C0" fontSize="5.5" fontFamily="'DM Mono', monospace">COMPOSITE INDEX</text>
      {/* Radar — pentagon grid, cx=148, cy=116, R=50 */}
      <polygon points="148,66 196,100 177,156 119,156 100,100" fill="none" stroke="#E0E2EA" strokeWidth="0.5" />
      <polygon points="148,83 180,106 167,143 129,143 116,106" fill="none" stroke="#E8EAF0" strokeWidth="0.4" />
      <polygon points="148,99 164,112 158,130 138,130 132,112" fill="none" stroke="#F0F1F4" strokeWidth="0.3" />
      <line x1="148" y1="116" x2="148" y2="66" stroke="#E8EAF0" strokeWidth="0.4" />
      <line x1="148" y1="116" x2="196" y2="100" stroke="#E8EAF0" strokeWidth="0.4" />
      <line x1="148" y1="116" x2="177" y2="156" stroke="#E8EAF0" strokeWidth="0.4" />
      <line x1="148" y1="116" x2="119" y2="156" stroke="#E8EAF0" strokeWidth="0.4" />
      <line x1="148" y1="116" x2="100" y2="100" stroke="#E8EAF0" strokeWidth="0.4" />
      {/* Data polygon — Strategy 72, Data 45, Tech 68, People 54, Gov 38 */}
      <polygon points="148,80 170,109 168,143 132,138 130,110" fill="rgba(192,80,32,0.1)" stroke="#C05020" strokeWidth="1.2" />
      <circle cx="148" cy="80" r="2.5" fill="#C05020" />
      <circle cx="170" cy="109" r="2.5" fill="#C05020" />
      <circle cx="168" cy="143" r="2.5" fill="#C05020" />
      <circle cx="132" cy="138" r="2.5" fill="#C05020" />
      <circle cx="130" cy="110" r="2.5" fill="#C05020" />
      <circle cx="148" cy="116" r="1.5" fill="#C05020" opacity="0.3" />
      {/* Dimension labels */}
      <text x="148" y="58" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="middle">STRATEGY</text>
      <text x="202" y="102" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace">DATA</text>
      <text x="182" y="162" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace">TECHNOLOGY</text>
      <text x="114" y="162" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="end">PEOPLE</text>
      <text x="94" y="102" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="end">GOVERNANCE</text>
      {/* Score values */}
      <text x="155" y="77" fill="#C05020" fontSize="6.5" fontFamily="'DM Mono', monospace" fontWeight="600">72</text>
      <text x="174" y="106" fill="#C05020" fontSize="6.5" fontFamily="'DM Mono', monospace" fontWeight="600">45</text>
      <text x="172" y="147" fill="#C05020" fontSize="6.5" fontFamily="'DM Mono', monospace" fontWeight="600">68</text>
      <text x="126" y="141" fill="#C05020" fontSize="6.5" fontFamily="'DM Mono', monospace" fontWeight="600" textAnchor="end">54</text>
      <text x="125" y="108" fill="#C05020" fontSize="6.5" fontFamily="'DM Mono', monospace" fontWeight="600" textAnchor="end">38</text>
      {/* Status */}
      <line x1="16" y1="182" x2="264" y2="182" stroke="#F0F1F4" strokeWidth="0.5" />
      <circle cx="22" cy="192" r="2" fill="#C05020" />
      <text x="28" y="194" fill="#8A8E99" fontSize="5.5" fontFamily="'DM Mono', monospace">PHASE 1 AUDIT RECOMMENDED</text>
    </svg>
  )
}

function ReadinessMetricsPanel() {
  return (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="260" height="180" fill="#FFFFFF" />
      {/* Header */}
      <text x="14" y="14" fill="#555566" fontSize="7" fontFamily="'DM Mono', monospace" letterSpacing="0.12em" fontWeight="600">PERFORMANCE METRICS</text>
      {/* KPI card 1 — Clarity Score */}
      <rect x="14" y="24" width="72" height="40" rx="4" fill="#F8F9FB" stroke="#E8EAF0" strokeWidth="0.5" />
      <text x="20" y="35" fill="#8A8E99" fontSize="5" fontFamily="'DM Mono', monospace">CLARITY SCORE™</text>
      <text x="20" y="54" fill="#C05020" fontSize="16" fontFamily="'DM Mono', monospace" fontWeight="700">72</text>
      <text x="42" y="54" fill="#B0B4C0" fontSize="6.5" fontFamily="'DM Mono', monospace">/100</text>
      {/* KPI card 2 — Velocity Score */}
      <rect x="94" y="24" width="72" height="40" rx="4" fill="#F8F9FB" stroke="#E8EAF0" strokeWidth="0.5" />
      <text x="100" y="35" fill="#8A8E99" fontSize="5" fontFamily="'DM Mono', monospace">VELOCITY SCORE</text>
      <text x="100" y="54" fill="#3A3F50" fontSize="16" fontFamily="'DM Mono', monospace" fontWeight="700">45</text>
      <text x="122" y="54" fill="#B0B4C0" fontSize="6.5" fontFamily="'DM Mono', monospace">/100</text>
      {/* KPI card 3 — Risk Level */}
      <rect x="174" y="24" width="72" height="40" rx="4" fill="#F8F9FB" stroke="#E8EAF0" strokeWidth="0.5" />
      <text x="180" y="35" fill="#8A8E99" fontSize="5" fontFamily="'DM Mono', monospace">RISK LEVEL</text>
      <rect x="180" y="42" width="38" height="14" rx="3" fill="rgba(192,80,32,0.12)" />
      <text x="199" y="52" fill="#C05020" fontSize="7.5" fontFamily="'DM Mono', monospace" fontWeight="600" textAnchor="middle">MEDIUM</text>
      {/* Divider */}
      <line x1="14" y1="72" x2="246" y2="72" stroke="#F0F1F4" strokeWidth="0.5" />
      {/* Dimension gauges — 5 horizontal bars */}
      <text x="14" y="87" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace">STRATEGY</text>
      <rect x="70" y="81" width="150" height="7" rx="2" fill="#F0F1F4" />
      <rect x="70" y="81" width="108" height="7" rx="2" fill="#C05020" opacity="0.7" />
      <text x="230" y="87" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="end">72%</text>

      <text x="14" y="102" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace">DATA</text>
      <rect x="70" y="96" width="150" height="7" rx="2" fill="#F0F1F4" />
      <rect x="70" y="96" width="68" height="7" rx="2" fill="#C05020" opacity="0.5" />
      <text x="230" y="102" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="end">45%</text>

      <text x="14" y="117" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace">TECHNOLOGY</text>
      <rect x="70" y="111" width="150" height="7" rx="2" fill="#F0F1F4" />
      <rect x="70" y="111" width="102" height="7" rx="2" fill="#C05020" opacity="0.65" />
      <text x="230" y="117" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="end">68%</text>

      <text x="14" y="132" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace">PEOPLE</text>
      <rect x="70" y="126" width="150" height="7" rx="2" fill="#F0F1F4" />
      <rect x="70" y="126" width="81" height="7" rx="2" fill="#C05020" opacity="0.55" />
      <text x="230" y="132" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="end">54%</text>

      <text x="14" y="147" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace">GOVERNANCE</text>
      <rect x="70" y="141" width="150" height="7" rx="2" fill="#F0F1F4" />
      <rect x="70" y="141" width="57" height="7" rx="2" fill="#C05020" opacity="0.4" />
      <text x="230" y="147" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="end">38%</text>
      {/* Status */}
      <line x1="14" y1="158" x2="246" y2="158" stroke="#F0F1F4" strokeWidth="0.5" />
      <circle cx="20" cy="170" r="2" fill="#C05020" />
      <text x="26" y="172" fill="#8A8E99" fontSize="5.5" fontFamily="'DM Mono', monospace">5 DIMENSIONS — IMPLEMENTATION READY</text>
    </svg>
  )
}

function CostAnalysisPanel() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="280" height="200" fill="#FFFFFF" />
      {/* Header */}
      <text x="16" y="15" fill="#555566" fontSize="7" fontFamily="'DM Mono', monospace" letterSpacing="0.12em" fontWeight="600">COST STRUCTURE ANALYSIS</text>
      {/* Summary metrics */}
      <rect x="16" y="25" width="80" height="30" rx="4" fill="#F8F9FB" stroke="#E8EAF0" strokeWidth="0.5" />
      <text x="22" y="35" fill="#8A8E99" fontSize="4.5" fontFamily="'DM Mono', monospace">MONTHLY REVENUE</text>
      <text x="22" y="48" fill="#3A3F50" fontSize="10" fontFamily="'DM Mono', monospace" fontWeight="700">৳8,00,000</text>

      <rect x="104" y="25" width="72" height="30" rx="4" fill="#F8F9FB" stroke="#E8EAF0" strokeWidth="0.5" />
      <text x="110" y="35" fill="#8A8E99" fontSize="4.5" fontFamily="'DM Mono', monospace">REVENUE LEAK</text>
      <text x="110" y="48" fill="#C05020" fontSize="10" fontFamily="'DM Mono', monospace" fontWeight="700">-12%</text>

      <rect x="184" y="25" width="80" height="30" rx="4" fill="#F8F9FB" stroke="#E8EAF0" strokeWidth="0.5" />
      <text x="190" y="35" fill="#8A8E99" fontSize="4.5" fontFamily="'DM Mono', monospace">NET MARGIN</text>
      <text x="190" y="48" fill="#1a8a3e" fontSize="10" fontFamily="'DM Mono', monospace" fontWeight="700">23%</text>
      {/* Divider */}
      <line x1="16" y1="62" x2="264" y2="62" stroke="#F0F1F4" strokeWidth="0.5" />
      {/* Cost breakdown bars */}
      <text x="16" y="78" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace">Vendor &amp; Supply</text>
      <rect x="90" y="72" width="150" height="8" rx="2" fill="#F0F1F4" />
      <rect x="90" y="72" width="57" height="8" rx="2" fill="#C05020" />
      <text x="248" y="79" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="end">38%</text>

      <text x="16" y="96" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace">Labour &amp; Team</text>
      <rect x="90" y="90" width="150" height="8" rx="2" fill="#F0F1F4" />
      <rect x="90" y="90" width="36" height="8" rx="2" fill="#3A3F50" />
      <text x="248" y="97" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="end">24%</text>

      <text x="16" y="114" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace">Op. Overhead</text>
      <rect x="90" y="108" width="150" height="8" rx="2" fill="#F0F1F4" />
      <rect x="90" y="108" width="27" height="8" rx="2" fill="#6B7080" />
      <text x="248" y="115" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="end">18%</text>

      <text x="16" y="132" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace">Marketing</text>
      <rect x="90" y="126" width="150" height="8" rx="2" fill="#F0F1F4" />
      <rect x="90" y="126" width="18" height="8" rx="2" fill="#9098A8" />
      <text x="248" y="133" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="end">12%</text>

      <text x="16" y="150" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace">Misc. Expenses</text>
      <rect x="90" y="144" width="150" height="8" rx="2" fill="#F0F1F4" />
      <rect x="90" y="144" width="12" height="8" rx="2" fill="#C0C4D0" />
      <text x="248" y="151" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" textAnchor="end">8%</text>
      {/* Leak indicator line */}
      <line x1="147" y1="68" x2="147" y2="156" stroke="#C05020" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
      <text x="149" y="162" fill="#C05020" fontSize="4.5" fontFamily="'DM Mono', monospace" opacity="0.6">LEAK ZONE</text>
      {/* Status */}
      <line x1="16" y1="180" x2="264" y2="180" stroke="#F0F1F4" strokeWidth="0.5" />
      <circle cx="22" cy="191" r="2" fill="#C05020" />
      <text x="28" y="193" fill="#8A8E99" fontSize="5.5" fontFamily="'DM Mono', monospace">OPTIMIZATION TARGET: ৳96,000/mo</text>
    </svg>
  )
}

function TimelinePanel() {
  return (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="260" height="180" fill="#FFFFFF" />
      {/* Header */}
      <text x="14" y="14" fill="#555566" fontSize="7" fontFamily="'DM Mono', monospace" letterSpacing="0.12em" fontWeight="600">90-DAY IMPROVEMENT ROADMAP</text>
      {/* Progress chip */}
      <rect x="200" y="18" width="46" height="12" rx="3" fill="rgba(192,80,32,0.1)" />
      <text x="223" y="27" fill="#C05020" fontSize="6.5" fontFamily="'DM Mono', monospace" fontWeight="600" textAnchor="middle">67%</text>
      <rect x="14" y="20" width="180" height="3" rx="1.5" fill="#F0F1F4" />
      <rect x="14" y="20" width="120" height="3" rx="1.5" fill="#C05020" opacity="0.6" />
      {/* Week grid lines */}
      <line x1="60" y1="36" x2="60" y2="144" stroke="#F0F1F4" strokeWidth="0.3" strokeDasharray="2 2" />
      <line x1="106" y1="36" x2="106" y2="144" stroke="#F0F1F4" strokeWidth="0.3" strokeDasharray="2 2" />
      <line x1="152" y1="36" x2="152" y2="144" stroke="#F0F1F4" strokeWidth="0.3" strokeDasharray="2 2" />
      <line x1="198" y1="36" x2="198" y2="144" stroke="#F0F1F4" strokeWidth="0.3" strokeDasharray="2 2" />
      <line x1="244" y1="36" x2="244" y2="144" stroke="#F0F1F4" strokeWidth="0.3" strokeDasharray="2 2" />
      {/* Week labels */}
      <text x="60" y="152" fill="#B0B4C0" fontSize="4.5" fontFamily="'DM Mono', monospace" textAnchor="middle">WK 2</text>
      <text x="106" y="152" fill="#B0B4C0" fontSize="4.5" fontFamily="'DM Mono', monospace" textAnchor="middle">WK 4</text>
      <text x="152" y="152" fill="#B0B4C0" fontSize="4.5" fontFamily="'DM Mono', monospace" textAnchor="middle">WK 6</text>
      <text x="198" y="152" fill="#B0B4C0" fontSize="4.5" fontFamily="'DM Mono', monospace" textAnchor="middle">WK 8</text>
      <text x="244" y="152" fill="#B0B4C0" fontSize="4.5" fontFamily="'DM Mono', monospace" textAnchor="middle">WK 12</text>
      {/* Phase 1: DIAGNOSTIC — Wk 1–2, complete */}
      <text x="14" y="48" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" fontWeight="600">DIAGNOSTIC</text>
      <text x="14" y="56" fill="#B0B4C0" fontSize="4.5" fontFamily="'DM Mono', monospace">{'Wk 1–2'}</text>
      <rect x="37" y="40" width="35" height="18" rx="3" fill="#C05020" />
      <text x="55" y="52" fill="#FFFFFF" fontSize="5" fontFamily="'DM Mono', monospace" textAnchor="middle" fontWeight="600">DONE</text>
      {/* Phase 2: COST MAP — Wk 3–4, complete */}
      <text x="14" y="78" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" fontWeight="600">COST MAP</text>
      <text x="14" y="86" fill="#B0B4C0" fontSize="4.5" fontFamily="'DM Mono', monospace">{'Wk 3–4'}</text>
      <rect x="72" y="70" width="35" height="18" rx="3" fill="#C05020" />
      <text x="90" y="82" fill="#FFFFFF" fontSize="5" fontFamily="'DM Mono', monospace" textAnchor="middle" fontWeight="600">DONE</text>
      {/* Phase 3: RESTRUCTURE — Wk 5–8, in progress */}
      <text x="14" y="108" fill="#555566" fontSize="5.5" fontFamily="'DM Mono', monospace" fontWeight="600">RESTRUCTURE</text>
      <text x="14" y="116" fill="#B0B4C0" fontSize="4.5" fontFamily="'DM Mono', monospace">{'Wk 5–8'}</text>
      <rect x="107" y="100" width="70" height="18" rx="3" fill="#F4F5F8" stroke="#E0E2EA" strokeWidth="0.5" />
      <rect x="107" y="100" width="30" height="18" rx="3" fill="rgba(192,80,32,0.25)" />
      <text x="142" y="112" fill="#8A8E99" fontSize="5" fontFamily="'DM Mono', monospace" textAnchor="middle">ACTIVE</text>
      {/* Phase 4: HANDOVER — Wk 9–12, upcoming */}
      <text x="14" y="138" fill="#B0B4C0" fontSize="5.5" fontFamily="'DM Mono', monospace" fontWeight="600">HANDOVER</text>
      <text x="14" y="146" fill="#C0C4D0" fontSize="4.5" fontFamily="'DM Mono', monospace">{'Wk 9–12'}</text>
      <rect x="177" y="130" width="67" height="18" rx="3" fill="#F8F9FB" stroke="#E8EAF0" strokeWidth="0.5" />
      <text x="211" y="142" fill="#B0B4C0" fontSize="5" fontFamily="'DM Mono', monospace" textAnchor="middle">UPCOMING</text>
      {/* Status */}
      <line x1="14" y1="160" x2="246" y2="160" stroke="#F0F1F4" strokeWidth="0.5" />
      <circle cx="20" cy="171" r="2" fill="#C05020" />
      <text x="26" y="173" fill="#8A8E99" fontSize="5.5" fontFamily="'DM Mono', monospace">ON TRACK — MILESTONE 3 IN PROGRESS</text>
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

  const PanelBL = index === 0 ? AIAssessmentPanel : CostAnalysisPanel
  const PanelTR = index === 0 ? ReadinessMetricsPanel : TimelinePanel

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

      {/* Panel bottom-left — white bg, z-index above text */}
      <div className="sh-panel-bl" style={{
        position: 'absolute',
        bottom: '28%', left: '5%',
        width: 'clamp(180px, 22vw, 300px)',
        aspectRatio: '280 / 200',
        borderRadius: '12px',
        background: '#FFFFFF',
        border: '1px solid #E0E2EA',
        overflow: 'hidden', zIndex: 10,
        boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
      }}>
        <PanelBL />
      </div>

      {/* Panel top-right — white bg, moved below slogan text, z-index above text */}
      <div className="sh-panel-tr" style={{
        position: 'absolute',
        top: '20%', right: '5%',
        width: 'clamp(160px, 20vw, 280px)',
        aspectRatio: '260 / 180',
        borderRadius: '12px',
        background: '#FFFFFF',
        border: '1px solid #E0E2EA',
        overflow: 'hidden', zIndex: 10,
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
