'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
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

/** Decorative wiring-diagram marks. Atmosphere only — nothing here is data. */
function BlueprintSchematic() {
  const line = { stroke: '#3C3C3C', strokeWidth: 1, fill: 'none' } as const

  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      {/* Element 4 — diagonal construction line */}
      <path className="bp-draw" d="M 4% 6% L 42% 62%" {...line} strokeDasharray="4 4" opacity="0.5" />

      {/* Element 1 — connection path with endpoints */}
      <path className="bp-draw" d="M 10% 22% L 68% 22%" {...line} strokeDasharray="8 4" />
      <path className="bp-draw" d="M 10% 22% l 7 -3.5 l 0 7 z" fill="#3C3C3C" stroke="none" />
      <circle className="bp-draw" cx="32%" cy="22%" r="4" {...line} />
      <circle className="bp-draw" cx="52%" cy="22%" r="4" {...line} />
      <text x="10%" y="17%" fill="#3C3C3C" fontSize="8" fontFamily="'DM Mono', monospace">#1</text>
      <text x="69%" y="17%" fill="#3C3C3C" fontSize="8" fontFamily="'DM Mono', monospace">X1</text>

      {/* Element 2 — component arc */}
      <path className="bp-draw" d="M 44% 22% a 26 26 0 0 1 52 0" {...line} />
      <text x="46%" y="30%" fill="#3C3C3C" fontSize="8" fontFamily="'DM Mono', monospace">18A</text>

      {/* Element 3 — second, shorter connection path */}
      <path className="bp-draw" d="M 10% 46% L 44% 46%" {...line} strokeDasharray="8 4" />
      <path className="bp-draw" d="M 10% 46% l 7 -3.5 l 0 7 z" fill="#3C3C3C" stroke="none" />
      <text x="10%" y="41%" fill="#3C3C3C" fontSize="8" fontFamily="'DM Mono', monospace">#2</text>

      {/* Element 5 — wire specification labels */}
      <text x="78%" y="34%" fill="#3C3C3C" fontSize="8" fontFamily="'DM Mono', monospace">AWG12</text>
      <text x="78%" y="39%" fill="#3C3C3C" fontSize="8" fontFamily="'DM Mono', monospace">BLACK</text>
      <text x="6%" y="86%" fill="#3C3C3C" fontSize="8" fontFamily="'DM Mono', monospace">L /+</text>
      <text x="6%" y="94%" fill="#3C3C3C" fontSize="8" fontFamily="'DM Mono', monospace">N /−</text>
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
