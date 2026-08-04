'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { TopoWaveField } from '@/components/shared/TopoWaveField'
import { HeroOrganism } from '@/components/shared/HeroOrganism'
import { HERO } from '@/lib/constants'

const STATS = [
  { value: '<1 in 5',  lines: ['online businesses', 'know their real margin'] },
  { value: '30–40%',   lines: ['working hours', 'are automatable with AI'] },
  { value: '৳15–25%',  lines: ['of inventory capital', 'is frozen in dead stock'] },
]

/* Editorial callouts laid over the illustration — atmosphere, not navigation. */
const CALLOUTS = [
  { label: 'Financial intelligence', top: '26%' },
  { label: 'Operational clarity',    top: '48%' },
  { label: 'AI-powered systems',     top: '70%' },
]

/* The headline alternates rust and navy line by line. */
const HEADLINE_TONES = ['var(--zaser-rust)', 'var(--zaser-navy)', 'var(--zaser-rust)', 'var(--zaser-navy)']

export function Hero() {
  return (
    <section data-no-clip className="hero-root">
      {/* Faint contour field — only ever visible on the paper side */}
      <TopoWaveField className="z-0" opacity={0.12} lineCount={10} amplitude={12} />

      {/* ── Left: brand message ── */}
      <div className="hero-inner">
        {/* Node network drifts behind the copy on the paper side, never over the
            illustration. Navy on cream, so it needs the light-ground colours. */}
        <HeroOrganism
          lineRGB="15, 18, 53"
          nodeRGB="15, 18, 53"
          color="#782000"
          opacity={0.32}
        />
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {HERO.badge && <p className="hero-eyebrow">{HERO.badge}</p>}

          <h1 className="hero-headline">
            {HERO.headline.map((line, i) => (
              <span key={line} style={{ display: 'block', color: HEADLINE_TONES[i] }}>
                {line}
              </span>
            ))}
          </h1>

          <p className="hero-body">{HERO.subheadline}</p>

          <div className="hero-cta-row">
            <Link href="/contact" className="hero-cta">
              {HERO.primaryCTA} <span aria-hidden="true">→</span>
            </Link>
            <Link href="/#services" className="hero-cta-secondary">
              {HERO.secondaryCTA} <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="hero-stats">
            {STATS.map((stat) => (
              <div className="hero-stat" key={stat.value}>
                <p className="hero-stat-value">{stat.value}</p>
                {stat.lines.map((line) => (
                  <span key={line} className="hero-stat-line">{line}</span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right: full-height illustration panel ── */}
      <div className="hero-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-consultancy.webp"
          width={1717}
          height={916}
          fetchPriority="high"
          decoding="async"
          alt="A consultant reviewing performance charts and financial reports at a desk, with workflow notes pinned above and a city skyline beyond the window."
        />
        {CALLOUTS.map((c) => (
          <span className="hero-callout" key={c.label} style={{ top: c.top }}>
            <span className="hero-callout-dot" />
            <span className="hero-callout-rule" />
            <em>{c.label}</em>
          </span>
        ))}
      </div>

      <style>{`
        /* ── Mobile first: text, then image ── */
        .hero-root {
          position: relative;
          background: var(--zaser-paper);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .hero-inner {
          position: relative;
          z-index: 10;
          padding: 128px 24px 48px;
        }
        /* Sits above the organism canvas, which is positioned at z-index 2 and
           would otherwise paint over this static content. */
        .hero-copy { max-width: 640px; position: relative; z-index: 3; }

        .hero-eyebrow {
          font-family: var(--font-dm-mono);
          font-size: 11px;
          font-weight: 500;
          color: var(--zaser-grey);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .hero-headline {
          font-family: var(--font-bebas);
          font-size: clamp(46px, 13vw, 72px);
          line-height: 0.88;
          letter-spacing: -0.02em;
          margin-bottom: 32px;
        }

        .hero-body {
          font-family: var(--font-twk-lausanne);
          font-size: 16px;
          font-weight: 400;
          line-height: 1.72;
          color: var(--zaser-dark-grey);
          max-width: 52ch;
          margin-bottom: 36px;
        }

        .hero-cta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 28px;
          margin-bottom: 48px;
        }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--zaser-deep-navy);
          color: var(--zaser-white);
          font-family: var(--font-twk-lausanne);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 18px 32px;
          border-radius: 8px;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(15, 20, 40, 0.16);
          transition: background 220ms ease, transform 220ms ease;
        }
        .hero-cta:hover { background: var(--zaser-navy); transform: translateY(-1px); }
        .hero-cta-secondary {
          font-family: var(--font-twk-lausanne);
          font-size: 14px;
          font-weight: 500;
          color: var(--zaser-rust);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 220ms ease;
        }
        .hero-cta-secondary:hover { border-bottom-color: var(--zaser-rust); }

        .hero-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px 28px; }
        .hero-stat { padding-left: 0; }
        .hero-stat-value {
          font-family: var(--font-dm-mono);
          font-size: clamp(17px, 2vw, 21px);
          font-weight: 500;
          color: var(--zaser-navy);
          letter-spacing: -0.01em;
          margin-bottom: 8px;
        }
        .hero-stat-line {
          display: block;
          font-family: var(--font-twk-lausanne);
          font-size: 13px;
          line-height: 1.45;
          color: var(--zaser-grey);
        }

        /* Hard-clipped panel: the illustration ends exactly where the container
           does. No mask, no gradient bleed — a cut, not a fade. */
        .hero-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          z-index: 1;
          overflow: hidden;
          border-top: 1px solid var(--zaser-dark-grey);
        }
        .hero-media img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center right;
          display: block;
        }
        /* No scrim: it existed only to lift the organism off the illustration,
           and the organism now lives on the paper side. Dropping it also
           restores the nav-link contrast the darkening had cost. */
        /* Callouts are desktop-only */
        .hero-callout { display: none; }

        @media (min-width: 480px) {
          .hero-stats { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── Tablet ── */
        @media (min-width: 768px) {
          .hero-root {
            flex-direction: row;
            align-items: center;
            min-height: 100vh;
          }
          .hero-inner {
            width: 54%;
            padding: 140px 32px 80px 40px;
          }
          .hero-headline { font-size: clamp(52px, 6.4vw, 76px); }

          .hero-media {
            position: absolute;
            top: 0; right: 0; bottom: 0;
            width: 46%;
            height: auto;
            aspect-ratio: auto;
            /* Vertical cut between copy and image replaces the top border */
            border-top: 0;
            border-left: 1px solid var(--zaser-dark-grey);
          }
        }

        /* ── Desktop ── */
        @media (min-width: 1024px) {
          .hero-inner {
            width: 45%;
            padding: 160px 40px 96px 70px;
          }
          .hero-headline { font-size: clamp(64px, 5.4vw, 92px); }
          .hero-body { font-size: 17px; }
          .hero-media { width: 55%; }

          /* Dividers only once the stats sit on one row */
          .hero-stat + .hero-stat {
            padding-left: 28px;
            border-left: 1px solid rgba(24, 32, 64, 0.14);
          }
          .hero-stats { gap: 0 28px; }

          .hero-callout {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            position: absolute;
            right: 40px;
            z-index: 3;
            font-family: var(--font-editorial-new);
            font-style: italic;
            font-size: 14px;
            /* Navy again: with the scrim gone the illustration reads light,
               and cream text would disappear into it. */
            color: rgba(24, 32, 64, 0.78);
            pointer-events: none;
          }
          .hero-callout-dot {
            width: 4px; height: 4px; border-radius: 50%;
            background: var(--zaser-rust);
            flex-shrink: 0;
          }
          .hero-callout-rule {
            width: 26px; height: 1px;
            background: rgba(24, 32, 64, 0.3);
            flex-shrink: 0;
          }
        }
      `}</style>
    </section>
  )
}
