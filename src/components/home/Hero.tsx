'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TopoWaveField } from '@/components/shared/TopoWaveField'
import { HERO } from '@/lib/constants'

const STATS = [
  { value: '<1 in 5',  lines: ['online businesses', 'know their real margin'] },
  { value: '30–40%',   lines: ['working hours', 'are automatable with AI'] },
  { value: '৳15–25%',  lines: ['of inventory capital', 'is frozen in dead stock'] },
]

/* Editorial callouts over the artwork. Desktop only — hidden below 768px. */
const CALLOUTS = ['Financial intelligence', 'Operational clarity', 'AI-powered systems']

export function Hero() {
  const [l1, l2, l3, l4] = HERO.headline

  return (
    <section data-no-clip className="zhero">
      {/* Faint contour field — sits under everything */}
      <TopoWaveField className="zhero-topo" opacity={0.12} />

      {/* Text block first in the DOM so mobile stacks text above the image */}
      <div className="zhero-inner">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {HERO.badge && <p className="zhero-eyebrow">{HERO.badge}</p>}

          <h1 className="zhero-headline">
            <span className="zhero-line zhero-line--rust">{l1}</span>
            <span className="zhero-line zhero-line--navy">{l2}</span>
            <span className="zhero-line zhero-line--rust">{l3}</span>
            <span className="zhero-line zhero-line--navy">{l4}</span>
          </h1>

          <p className="zhero-body">{HERO.subheadline}</p>

          <div className="zhero-ctas">
            <Link href="/contact" className="zhero-cta">
              {HERO.primaryCTA} →
            </Link>
            <Link href="/#services" className="zhero-cta-ghost">
              {HERO.secondaryCTA} →
            </Link>
          </div>

          <div className="zhero-stats">
            {STATS.map((stat) => (
              <div className="zhero-stat" key={stat.value}>
                <p className="zhero-stat-value">{stat.value}</p>
                {stat.lines.map((line) => (
                  <span className="zhero-stat-line" key={line}>{line}</span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Full-bleed artwork panel — absolute on desktop, in flow on mobile */}
      <div className="zhero-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-consultancy.webp"
          alt="A consultant at a desk reviewing performance charts and financial reports, with analysis frameworks pinned to the wall and a city skyline beyond the window."
          width={1691}
          height={930}
          fetchPriority="high"
          decoding="async"
        />
        <ul className="zhero-callouts" aria-hidden="true">
          {CALLOUTS.map((label) => (
            <li key={label}><span className="zhero-dot" />{label}</li>
          ))}
        </ul>
      </div>

      <style>{`
        .zhero {
          position: relative;
          background: var(--zaser-paper);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .zhero-topo { z-index: 0; }

        .zhero-inner {
          position: relative;
          z-index: 3;
          padding: 132px 24px 72px;
        }

        /* ── Type ── */
        .zhero-eyebrow {
          font-family: var(--font-dm-mono);
          font-size: 11px;
          font-weight: 500;
          color: var(--zaser-grey);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 26px;
        }
        .zhero-headline { margin: 0 0 32px; }
        .zhero-line {
          display: block;
          font-family: var(--font-bebas);
          line-height: 0.86;
          letter-spacing: -0.015em;
          font-size: clamp(52px, 12vw, 76px);
        }
        .zhero-line--rust { color: var(--zaser-rust); }
        .zhero-line--navy { color: var(--zaser-navy); }

        .zhero-body {
          font-family: var(--font-twk-lausanne);
          font-weight: 350;
          font-size: 16px;
          line-height: 1.75;
          color: var(--zaser-dark-grey);
          max-width: 44ch;
          margin-bottom: 36px;
        }

        /* ── CTAs ── */
        .zhero-ctas {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 14px 28px;
          margin-bottom: 56px;
        }
        .zhero-cta {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-twk-lausanne);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--zaser-white);
          background: var(--zaser-deep-navy);
          padding: 19px 34px;
          border-radius: 6px;
          text-decoration: none;
          box-shadow: 0 6px 18px rgba(15, 20, 40, 0.16);
          transition: background 220ms ease, box-shadow 220ms ease;
        }
        .zhero-cta:hover {
          background: var(--zaser-navy);
          box-shadow: 0 8px 22px rgba(15, 20, 40, 0.22);
        }
        .zhero-cta-ghost {
          font-family: var(--font-twk-lausanne);
          font-size: 14px;
          font-weight: 500;
          color: var(--zaser-navy);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: color 200ms ease, border-color 200ms ease;
        }
        .zhero-cta-ghost:hover {
          color: var(--zaser-rust);
          border-bottom-color: var(--zaser-rust);
        }

        /* ── Stats ── */
        .zhero-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px 20px; }
        .zhero-stat { padding-left: 18px; border-left: 1px solid rgba(24, 32, 64, 0.16); }
        .zhero-stat-value {
          font-family: var(--font-dm-mono);
          font-weight: 500;
          font-size: clamp(17px, 1.5vw, 21px);
          color: var(--zaser-navy);
          letter-spacing: -0.01em;
          margin-bottom: 10px;
        }
        .zhero-stat-line {
          display: block;
          font-family: var(--font-twk-lausanne);
          font-size: 13.5px;
          font-weight: 350;
          line-height: 1.5;
          color: var(--zaser-dark-grey);
        }

        /* ── Artwork ── */
        .zhero-media { position: relative; width: 100%; aspect-ratio: 16 / 11; }
        .zhero-media img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center right;
          display: block;
        }
        .zhero-callouts { display: none; }

        /* ── Tablet ── */
        @media (min-width: 768px) {
          .zhero { min-height: 100vh; display: block; }
          .zhero-inner {
            width: 52%;
            padding: clamp(120px, 15vh, 168px) 32px 80px clamp(32px, 5vw, 70px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 100vh;
          }
          .zhero-line { font-size: clamp(46px, 6.4vw, 72px); }
          .zhero-stats { grid-template-columns: repeat(3, 1fr); gap: 18px; }

          /* Full-bleed panel: top of section to bottom, hard against the right edge */
          .zhero-media {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 52%;
            aspect-ratio: auto;
            z-index: 1;
          }
          /* Soft cream blend so the artwork merges into the text field */
          .zhero-media::before {
            content: "";
            position: absolute;
            inset: 0 auto 0 0;
            width: 28%;
            background: linear-gradient(
              to right,
              var(--zaser-paper) 0%,
              rgba(243, 238, 229, 0.72) 42%,
              transparent 100%
            );
            z-index: 2;
            pointer-events: none;
          }
        }

        /* ── Desktop ── */
        @media (min-width: 1024px) {
          .zhero-inner { width: 47%; padding-left: 70px; padding-right: 40px; }
          .zhero-media { width: 54%; }
          .zhero-line { font-size: clamp(58px, 5.4vw, 92px); }

          .zhero-callouts {
            display: flex;
            position: absolute;
            left: 32%;
            right: 40px;
            bottom: 44px;
            z-index: 3;
            justify-content: flex-end;
            gap: 26px;
            margin: 0;
            padding: 0;
            list-style: none;
          }
          .zhero-callouts li {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-family: var(--font-editorial-new);
            font-style: italic;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.92);
            white-space: nowrap;
          }
          .zhero-dot {
            width: 4px; height: 4px; border-radius: 50%;
            background: rgba(255, 255, 255, 0.75);
            box-shadow: -18px 0 0 -1.5px rgba(255, 255, 255, 0.35);
          }
          /* Low scrim so the callouts stay legible over light parts of the artwork */
          .zhero-media::after {
            content: "";
            position: absolute;
            inset: auto 0 0 0;
            height: 190px;
            background: linear-gradient(to top, rgba(15, 20, 40, 0.55), transparent);
            z-index: 2;
            pointer-events: none;
          }
        }
      `}</style>
    </section>
  )
}
