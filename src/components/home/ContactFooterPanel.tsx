'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { LivingOrganism } from '@/components/shared/LivingOrganism'
import { CONTACT_PANEL } from '@/lib/constants'

/**
 * Three-layer footer.
 *
 *   Layer 1 — dark navigation panel (back)
 *   Layer 2 — technical blueprint grid, right 60% (middle)
 *   Layer 3 — butter contact card overlapping the blueprint (front)
 *
 * All three are visible at once in the settled state; the reveal is scrubbed to
 * scroll so it reverses on the way back up. Below 768px the layers stop
 * overlapping and stack in document flow instead.
 */

/* The consulting engagement lifecycle, drawn as a process flow. */
const FLOW_STAGES = [
  { label: 'DISCOVERY', cx: 60 },
  { label: 'DIAGNOSTIC', cx: 160 },
  { label: 'ANALYSIS', cx: 260 },
  { label: 'ROADMAP', cx: 360 },
  { label: 'DELIVERY', cx: 460 },
]

/* Cost structure sample — the widest band is outlined rather than filled. */
const COST_BANDS = [
  { label: 'FIXED', pct: '48%', w: 120, outlined: true },
  { label: 'VARIABLE', pct: '32%', w: 80, outlined: false },
  { label: 'SEMI-VAR', pct: '20%', w: 50, outlined: false },
]

/* Abstract data points sitting on grid intersections. */
const NODES = [
  { cx: 160, cy: 80, lit: false },
  { cx: 320, cy: 160, lit: true },
  { cx: 240, cy: 370, lit: false },
  { cx: 480, cy: 400, lit: true },
  { cx: 400, cy: 500, lit: false },
]

const MONO = "'DM Mono', monospace"
const INK = '#3C3C3C'

/**
 * Methodology schematic — process flow, five-dimension assessment, cost
 * structure and margin erosion. Atmosphere, not data: it should read as a page
 * from an internal methodology document seen through dark glass.
 */
function BlueprintSchematic() {
  const line = { stroke: INK, strokeWidth: 1, fill: 'none' } as const

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 580 630"
      preserveAspectRatio="xMidYMid meet"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      {/* Element 6 — construction line */}
      <path className="bp-draw" d="M 24 44 L 300 330" stroke="#1A1C28" strokeWidth="0.5" fill="none" strokeDasharray="4 4" />

      {/* Element 5 — drawing reference labels */}
      <text className="bp-draw" x="24" y="28" fill={INK} fontSize="7" fontFamily={MONO}>REF: ZC-OPS-2026</text>
      <text className="bp-draw" x="556" y="606" fill={INK} fontSize="7" fontFamily={MONO} textAnchor="end">SCALE: 1:1 · ADVISORY</text>

      {/* Element 1 — engagement lifecycle flow */}
      {FLOW_STAGES.map((stage, i) => {
        const next = FLOW_STAGES[i + 1]
        return (
          <g className="bp-draw" key={stage.label}>
            <rect x={stage.cx - 6} y={104} width={12} height={12} {...line} />
            <text x={stage.cx} y={132} fill={INK} fontSize="7" fontFamily={MONO} textAnchor="middle">
              {stage.label}
            </text>
            {next && (
              <>
                <line x1={stage.cx + 6} y1={110} x2={next.cx - 13} y2={110} {...line} strokeDasharray="6 4" />
                <polygon points={`${next.cx - 13},107 ${next.cx - 13},113 ${next.cx - 6},110`} fill={INK} />
              </>
            )}
          </g>
        )
      })}

      {/* Element 4 — margin erosion between revenue and net margin */}
      <g className="bp-draw">
        <line x1={130} y1={200} x2={300} y2={200} {...line} />
        <text x={50} y={203} fill={INK} fontSize="7" fontFamily={MONO}>REVENUE</text>
        <text x={306} y={203} fill={INK} fontSize="7" fontFamily={MONO}>৳800K</text>

        <line x1={130} y1={280} x2={300} y2={280} {...line} />
        <text x={50} y={283} fill={INK} fontSize="7" fontFamily={MONO}>NET MARGIN</text>
        <text x={306} y={283} fill={INK} fontSize="7" fontFamily={MONO}>৳184K</text>

        <line x1={200} y1={204} x2={250} y2={276} {...line} strokeDasharray="4 3" />
        <text x={196} y={243} fill={INK} fontSize="6" fontFamily={MONO} textAnchor="end">LEAK</text>
        <text x={254} y={243} fill={INK} fontSize="6" fontFamily={MONO}>-12%</text>
      </g>

      {/* Element 2 — five-dimension readiness radar */}
      <g className="bp-draw">
        <polygon points="430,260 468,287.6 453.5,332.4 406.5,332.4 392,287.6" {...line} />
        <line x1={430} y1={300} x2={430} y2={260} {...line} strokeWidth="0.5" />
        <line x1={430} y1={300} x2={468} y2={287.6} {...line} strokeWidth="0.5" />
        <line x1={430} y1={300} x2={453.5} y2={332.4} {...line} strokeWidth="0.5" />
        <line x1={430} y1={300} x2={406.5} y2={332.4} {...line} strokeWidth="0.5" />
        <line x1={430} y1={300} x2={392} y2={287.6} {...line} strokeWidth="0.5" />
        {/* Sample profile — 72 / 45 / 68 / 54 / 38 */}
        <polygon
          points="430,271.2 447.1,294.4 446,322 417.3,317.5 415.5,295.3"
          fill="rgba(245, 213, 71, 0.08)"
          stroke={INK}
          strokeWidth="0.5"
        />
        <text x={430} y={252} fill={INK} fontSize="6" fontFamily={MONO} textAnchor="middle">STR</text>
        <text x={476} y={285} fill={INK} fontSize="6" fontFamily={MONO}>DAT</text>
        <text x={460} y={345} fill={INK} fontSize="6" fontFamily={MONO}>TEC</text>
        <text x={400} y={345} fill={INK} fontSize="6" fontFamily={MONO} textAnchor="end">PEO</text>
        <text x={384} y={285} fill={INK} fontSize="6" fontFamily={MONO} textAnchor="end">GOV</text>
      </g>

      {/* Element 3 — cost structure */}
      {COST_BANDS.map((band, i) => {
        const y = 430 + i * 16
        return (
          <g className="bp-draw" key={band.label}>
            <text x={50} y={y + 5} fill={INK} fontSize="6" fontFamily={MONO}>{band.label}</text>
            <rect
              x={110} y={y} width={band.w} height={6}
              fill={band.outlined ? 'none' : '#1A1C28'}
              stroke={band.outlined ? INK : 'none'}
              strokeWidth={band.outlined ? 1 : 0}
            />
            <text x={235} y={y + 5} fill={INK} fontSize="6" fontFamily={MONO}>{band.pct}</text>
          </g>
        )
      })}

      {/* Element 7 — data nodes on grid intersections */}
      {NODES.map((node) => (
        <circle
          className="bp-draw"
          key={`${node.cx}-${node.cy}`}
          cx={node.cx} cy={node.cy} r={4}
          stroke={INK} strokeWidth="1"
          fill={node.lit ? 'rgba(245, 213, 71, 0.1)' : 'none'}
        />
      ))}
    </svg>
  )
}

export function ContactFooterPanel() {
  const rootRef = useRef<HTMLElement>(null)
  const {
    wordmarkPrimary, wordmarkAccent, tagline, subTagline,
    navLinks, utilityLinks, cardLabel, contactLines,
    badgeTagline, est, copyright, seoLinks,
  } = CONTACT_PANEL

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const mm = gsap.matchMedia()

    // Desktop only — on mobile the layers stack and stay visible with no from-state.
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom bottom', scrub: 1 },
        })

        tl.fromTo('.cf-nav-link', { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.05, duration: 0.2 }, 0)
          .fromTo('.cf-util-link', { opacity: 0, x: 20 }, { opacity: 1, x: 0, stagger: 0.05, duration: 0.2 }, 0.1)
          .fromTo('.cf-blueprint', { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.3 }, 0.2)
          .fromTo('.bp-draw', { opacity: 0 }, { opacity: 1, stagger: 0.02, duration: 0.2 }, 0.3)
          .fromTo('.cf-card', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, 0.4)
          .fromTo('.cf-line', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.2 }, 0.5)
          .fromTo('.cf-badge', { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.25 }, 0.7)
      }, el)
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={rootRef} className="cf-root">
      <div className="cf-inner">
        {/* ── Layer 1 — navigation ── */}
        <div className="cf-top">
          <div>
            <p className="cf-wordmark">
              <span style={{ color: '#E8EDF5' }}>{wordmarkPrimary}</span>{' '}
              <span style={{ color: '#782000' }}>{wordmarkAccent}</span>
            </p>
            <p className="cf-tagline">{tagline}</p>

            <nav className="cf-nav">
              {navLinks.map((link, i) => (
                <span key={link.label} className="cf-nav-item">
                  {i > 0 && <span aria-hidden="true" className="cf-slash">/</span>}
                  <Link href={link.href} className="cf-nav-link">{link.label}</Link>
                </span>
              ))}
            </nav>

            <hr className="cf-rule" />
            <p className="cf-subtagline">{subTagline}</p>
          </div>

          <nav className="cf-utility">
            {utilityLinks.map((link) => {
              const external = link.href.startsWith('http')
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="cf-util-link"
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* ── Layers 2 + 3 — blueprint with the contact card on top ── */}
        <div className="cf-stage">
          <div className="cf-blueprint">
            {/* Drifting node network behind the schematic — keep this, it is the
                living background motion for the footer panel. */}
            <LivingOrganism opacity={0.18} spread={0.7} nodeCount={16} />
            <BlueprintSchematic />
          </div>

          <div className="cf-card-wrap">
            <div className="cf-card">
              <p className="cf-card-label cf-line">{cardLabel}</p>

              <div className="cf-contact-lines">
                {contactLines.map((line) => (
                  <p key={line.label} className="cf-line">
                    {line.href ? (
                      <a href={line.href} className="cf-contact">{line.label}</a>
                    ) : (
                      <span className="cf-contact">{line.label}</span>
                    )}
                  </p>
                ))}
              </div>

              <div className="cf-badge">
                <p className="cf-badge-tagline">{badgeTagline}</p>
                <p className="cf-badge-logo">
                  <span style={{ color: '#182040' }}>{wordmarkPrimary}</span>{' '}
                  <span style={{ color: '#782000' }}>{wordmarkAccent}</span>
                </p>
                <p className="cf-est">{est}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom rail ── */}
        <div className="cf-bottom">
          <p className="cf-copy">{copyright}</p>
          <nav className="cf-seo">
            {seoLinks.map((link) => (
              <Link key={link.label} href={link.href} className="cf-seo-link">{link.label}</Link>
            ))}
          </nav>
        </div>
      </div>

      <style>{`
        .cf-root {
          background: #0A0C14;
          position: relative;
          overflow: hidden;
          min-height: 90vh;
        }
        .cf-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 80px 80px 32px;
          display: flex;
          flex-direction: column;
        }

        /* Layer 1 */
        .cf-top { display: grid; grid-template-columns: 60% 40%; gap: 40px; }
        .cf-wordmark {
          font-family: var(--font-bebas);
          font-size: 20px;
          letter-spacing: 0.04em;
          line-height: 1;
        }
        .cf-tagline {
          font-family: var(--font-dm-mono);
          font-size: 9px;
          color: #828282;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin-top: 8px;
        }
        .cf-nav {
          margin-top: 40px;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0 12px;
          max-width: 620px;
        }
        .cf-nav-item { display: inline-flex; align-items: baseline; gap: 12px; }
        .cf-slash {
          font-family: var(--font-twk-lausanne);
          font-weight: 300;
          font-size: 36px;
          color: #3C3C3C;
          line-height: 1.4;
        }
        .cf-nav-link {
          font-family: var(--font-twk-lausanne);
          font-weight: 300;
          font-size: 36px;
          color: #E8EDF5;
          line-height: 1.4;
          text-decoration: none;
          transition: color 300ms ease;
        }
        .cf-nav-link:hover { color: #F5D547; }
        .cf-rule { margin-top: 32px; border: 0; border-top: 1px solid #1A1C28; }
        .cf-subtagline {
          font-family: var(--font-twk-lausanne);
          font-size: 14px;
          color: #3C3C3C;
          margin-top: 16px;
        }

        .cf-utility { display: flex; flex-direction: column; align-items: flex-end; text-align: right; }
        .cf-util-link {
          font-family: var(--font-twk-lausanne);
          font-size: 15px;
          font-weight: 400;
          color: #E8EDF5;
          line-height: 2.2;
          text-decoration: none;
          transition: color 200ms ease;
        }
        .cf-util-link:hover { color: #F5D547; }

        /* Layers 2 + 3 */
        .cf-stage { position: relative; margin-top: 64px; }
        .cf-blueprint {
          position: absolute;
          right: -80px;
          top: 0;
          width: 60%;
          height: 100%;
          background: #0E1018;
          background-image:
            repeating-linear-gradient(0deg, #1A1C28 0 1px, transparent 1px 80px),
            repeating-linear-gradient(90deg, #1A1C28 0 1px, transparent 1px 80px);
          z-index: 2;
        }
        .cf-card-wrap {
          position: relative;
          z-index: 3;
          display: flex;
          justify-content: flex-end;
          padding-top: 120px;
        }
        .cf-card {
          background: #FFF1B8;
          width: 46%;
          min-height: 350px;
          padding: 48px 48px 40px;
          box-shadow: 0 -8px 40px rgba(0,0,0,0.15);
          margin-right: -80px;
        }
        .cf-card-label {
          font-family: var(--font-twk-lausanne);
          font-size: 14px;
          color: #828282;
          margin-bottom: 24px;
        }
        .cf-contact-lines { display: flex; flex-direction: column; gap: 8px; }
        .cf-contact {
          font-family: var(--font-twk-lausanne);
          font-size: 22px;
          font-weight: 600;
          color: #0A0C14;
          text-decoration: none;
          transition: color 200ms ease;
        }
        a.cf-contact:hover { color: #782000; }

        .cf-badge { background: #F5D547; padding: 32px; margin-top: 48px; }
        .cf-badge-tagline {
          font-family: var(--font-twk-lausanne);
          font-size: 14px;
          font-weight: 500;
          color: #0A0C14;
          margin-bottom: 40px;
        }
        .cf-badge-logo {
          font-family: var(--font-bebas);
          font-size: 40px;
          line-height: 1;
          letter-spacing: 0.03em;
        }
        .cf-est {
          font-family: var(--font-dm-mono);
          font-size: 9px;
          color: #3C3C3C;
          letter-spacing: 0.2em;
          margin-top: 12px;
        }

        /* Bottom rail */
        .cf-bottom {
          position: relative;
          z-index: 4;
          margin-top: 48px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .cf-copy, .cf-seo-link {
          font-family: var(--font-dm-mono);
          font-size: 11px;
          color: #3C3C3C;
        }
        .cf-seo { display: flex; gap: 24px; flex-wrap: wrap; }
        .cf-seo-link { text-decoration: none; transition: color 200ms ease; }
        .cf-seo-link:hover { color: #828282; }

        /* Mobile — layers stop overlapping and stack in flow */
        @media (max-width: 767px) {
          .cf-root { min-height: 0; }
          .cf-inner { padding: 56px 24px 28px; }
          .cf-top { grid-template-columns: 1fr; gap: 32px; }
          .cf-nav { margin-top: 28px; gap: 0 8px; }
          .cf-nav-link, .cf-slash { font-size: 24px; }
          .cf-utility { align-items: flex-start; text-align: left; }
          .cf-util-link { line-height: 2; }

          .cf-stage { margin-top: 40px; display: flex; flex-direction: column; gap: 0; }
          .cf-blueprint { position: relative; right: auto; width: 100%; height: 300px; }
          .cf-card-wrap { padding-top: 0; }
          .cf-card { width: 100%; margin-right: 0; padding: 28px; min-height: 0; }
          .cf-contact { font-size: 18px; }
          .cf-badge { padding: 24px; margin-top: 32px; }
          .cf-badge-logo { font-size: 32px; }
          .cf-bottom { margin-top: 32px; }
        }
      `}</style>
    </section>
  )
}
