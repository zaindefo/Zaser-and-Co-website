'use client'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { TopoWaveField } from '@/components/shared/TopoWaveField'
import { HERO } from '@/lib/constants'

const QUICK_NAV = [
  { number: '01', label: 'Services',     href: '/#services' },
  { number: '02', label: 'Insights',     href: '/insights' },
  { number: '03', label: 'Policies',     href: '/policies' },
]

const STATS = [
  { value: '<1 in 5',  lines: ['online businesses', 'know their real margin'] },
  { value: '30–40%',   lines: ['working hours', 'are automatable with AI'] },
  { value: '৳15–25%',  lines: ['of inventory capital', 'is frozen in dead stock'] },
]

/* Alternating scale: the setup lines sit quieter, the payoff lines carry weight. */
const SETUP_LINE = {
  fontFamily: 'var(--font-bebas)',
  fontSize: 'clamp(26px, 3.2vw, 44px)',
  letterSpacing: '-0.02em',
  lineHeight: 0.92,
  color: '#6B3828',
}

const PAYOFF_LINE = {
  fontFamily: 'var(--font-bebas)',
  fontSize: 'clamp(36px, 4.6vw, 62px)',
  letterSpacing: '-0.025em',
  lineHeight: 0.92,
}

export function Hero() {
  const [l1, l2, l3, l4] = HERO.headline

  return (
    <section data-no-clip className="min-h-screen bg-linen relative flex flex-col">
      {/* Topographic wave field — sits behind the text side; the media panel covers it */}
      <TopoWaveField className="z-0" />

      <div className="page-container px-6 md:px-12 lg:px-20 pt-40 md:pt-60 pb-40 flex-1 flex flex-col justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-grid">
            {/* ── Left: information block ── */}
            <div className="hero-content">
              {HERO.badge && (
                <p style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'var(--z-chrome-dark, #5A5B66)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: '24px',
                }}>
                  {HERO.badge}
                </p>
              )}

              <h1 style={{ marginBottom: '2.25rem' }}>
                <span style={{ ...SETUP_LINE, display: 'block' }}>{l1}</span>
                <span style={{ ...PAYOFF_LINE, display: 'block', color: '#0F1235' }}>{l2}</span>
                <span style={{ ...SETUP_LINE, display: 'block' }}>{l3}</span>
                <span style={{ ...PAYOFF_LINE, display: 'block', color: '#1D2464' }}>{l4}</span>
              </h1>

              <p className="text-body-sm-2 text-sage leading-relaxed" style={{ maxWidth: '46ch', marginBottom: '36px' }}>
                {HERO.subheadline}
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-20"
                style={{ marginBottom: '48px' }}
              >
                <MagneticButton href="/contact" size="lg">
                  {HERO.primaryCTA} →
                </MagneticButton>
                <button className="btn-ghost text-body-sm-2">
                  {HERO.secondaryCTA} →
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="hero-stats"
              >
                {STATS.map((stat) => (
                  <div key={stat.value}>
                    <p
                      className="font-mono font-medium text-obsidian-ink mb-8 tracking-tight"
                      style={{ fontSize: 'clamp(14px, 1.5vw, 20px)' }}
                    >
                      {stat.value}
                    </p>
                    <div>
                      {stat.lines.map((line) => (
                        <span key={line} className="block text-body-sm text-sage leading-snug">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: media panel ──
                No nested fade: the parent block already handles the entrance, and a
                second opacity:0 here would hide the hero visual until JS runs. */}
            <div className="hero-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-consultancy.webp"
                width={1691}
                height={930}
                /* LCP element — fetch it eagerly rather than letting it queue */
                fetchPriority="high"
                decoding="async"
                alt="A consultant at a desk reviewing performance charts and financial reports, with analysis frameworks pinned to the wall and a city skyline beyond the window."
              />
            </div>
          </div>

          <div className="accent-tick" style={{ marginTop: '48px' }} />
        </motion.div>
      </div>

      {/* Quick nav — pinned to section bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="page-container px-6 md:px-12 lg:px-20 pb-20 relative z-10"
      >
        <div className="border-t border-mist pt-20 flex flex-wrap items-center gap-x-40 gap-y-20">
          <span className="text-caption text-mist/60 uppercase tracking-widest hidden md:inline">
            Explore
          </span>
          {QUICK_NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative inline-flex items-center gap-10 pb-5 text-caption uppercase tracking-widest text-sage hover:text-obsidian-ink transition-colors duration-200"
            >
              <span className="font-mono text-voltage/70 group-hover:text-voltage transition-colors duration-200">
                {item.number}
              </span>
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 h-px bg-voltage transition-all duration-300 ease-out w-0 group-hover:w-full" />
            </a>
          ))}
        </div>
      </motion.div>

      <style>{`
        /* Mobile first — single column, text before media */
        .hero-grid { display: grid; grid-template-columns: 1fr; gap: 40px; }
        .hero-content { min-width: 0; }
        .hero-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

        .hero-media {
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-card);
          border: 1px solid rgba(15, 18, 53, 0.06);
          background: #EFE8DD;
          aspect-ratio: 16 / 10;
        }
        .hero-media img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          /* Bias right of centre so the desk and subject stay in frame when cropped */
          object-position: 60% center;
          display: block;
        }

        @media (max-width: 520px) {
          .hero-stats { grid-template-columns: 1fr; gap: 24px; }
        }

        /* Tablet — two columns, media slightly narrower */
        @media (min-width: 768px) {
          .hero-grid {
            grid-template-columns: 58fr 42fr;
            gap: clamp(24px, 2.6vw, 44px);
            align-items: stretch;
          }
          .hero-media {
            aspect-ratio: auto;
            min-height: clamp(420px, 50vh, 600px);
          }
          .hero-media img { object-position: 68% center; }
        }

        /* Desktop — media anchors the hero at 45% of its width */
        @media (min-width: 1024px) {
          .hero-grid {
            /* Gap is deliberately modest: it counts against the column split, and a
               wider one pushes the media panel below its 42% floor. */
            grid-template-columns: 55fr 45fr;
            gap: clamp(28px, 2.8vw, 56px);
          }
          .hero-media { min-height: clamp(480px, 58vh, 680px); }
          .hero-media img { object-position: 70% center; }
        }
      `}</style>
    </section>
  )
}
