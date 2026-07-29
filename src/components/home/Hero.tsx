'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { TopoWaveField } from '@/components/shared/TopoWaveField'
import { HERO } from '@/lib/constants'

// Each slot draws from a completely separate thematic image set
const IMAGE_SETS = {
  numbers: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=560&fit=crop&q=85',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=560&fit=crop&q=85',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=560&fit=crop&q=85',
    'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&h=560&fit=crop&q=85',
    'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=900&h=560&fit=crop&q=85',
  ],
  profit: [
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=900&h=560&fit=crop&q=85',
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=900&h=560&fit=crop&q=85',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&h=560&fit=crop&q=85',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=560&fit=crop&q=85',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=560&fit=crop&q=85',
  ],
  operations: [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=560&fit=crop&q=85',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&h=560&fit=crop&q=85',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&h=560&fit=crop&q=85',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&h=560&fit=crop&q=85',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&h=560&fit=crop&q=85',
  ],
}

const CYCLE_MS = 3400  // hold time per image
const FADE_MS  = 800   // crossfade duration

// Stagger offsets — slots never transition at the same moment
const OFFSETS_MS = [0, 1350, 2650]

function ImageCycler({
  images,
  offsetMs,
  widthEm,
  heightEm,
}: {
  images: string[]
  offsetMs: number
  widthEm: number
  heightEm: number
}) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    const t = setTimeout(() => {
      interval = setInterval(() => {
        setIdx(i => (i + 1) % images.length)
      }, CYCLE_MS)
    }, offsetMs)
    return () => {
      clearTimeout(t)
      clearInterval(interval)
    }
  }, [images.length, offsetMs])

  return (
    <span
      style={{
        display: 'inline-block',
        flexShrink: 0,
        width: `${widthEm}em`,
        height: `${heightEm}em`,
        borderRadius: 10,
        overflow: 'hidden',
        verticalAlign: 'middle',
        position: 'relative',
      }}
    >
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(1)',
            opacity: i === idx ? 1 : 0,
            transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        />
      ))}
    </span>
  )
}

const QUICK_NAV = [
  { number: '01', label: 'Services',     href: '/#services' },
  { number: '02', label: 'StockPulse™',  href: '/stockpulse' },
  { number: '03', label: 'Insights',     href: '/insights' },
  { number: '04', label: 'Policies',     href: '/policies' },
]

const STATS = [
  { value: '<1 in 5',  lines: ['online businesses', 'know their real margin'] },
  { value: '30–40%',   lines: ['working hours', 'are automatable with AI'] },
  { value: '৳15–25%',  lines: ['of inventory capital', 'is frozen in dead stock'] },
]

export function Hero() {
  const [l1, l2, l3, l4] = HERO.headline

  return (
    <section data-no-clip className="min-h-screen bg-linen relative flex flex-col">
      {/* Topographic wave field — living terrain background */}
      <TopoWaveField className="z-0" />

      {/* Main content */}
      <div className="page-container px-6 md:px-12 lg:px-20 pt-40 md:pt-60 pb-40 flex-1 flex flex-col justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Section label */}
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

          <h1 style={{ marginBottom: '3rem' }} aria-label={`${l1} ${l2} ${l3} ${l4}`}>
            {/* Row 1 — setup: warm brown sage, smaller */}
            <div
              className="flex items-center flex-wrap"
              style={{
                gap: '0.18em', marginBottom: '0.04em',
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(36px, 5.5vw, 72px)',
                letterSpacing: '-0.02em', lineHeight: 0.88,
                color: '#6B3828',
              }}
            >
              <span>{l1}</span>
              <ImageCycler images={IMAGE_SETS.numbers} offsetMs={OFFSETS_MS[0]} widthEm={2.2} heightEm={0.8} />
            </div>

            {/* Row 2 — payoff: deep navy, larger */}
            <div
              className="flex items-center flex-wrap"
              style={{
                gap: '0.18em', marginBottom: '0.04em',
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(52px, 8vw, 100px)',
                letterSpacing: '-0.025em', lineHeight: 0.88,
                color: '#0F1235',
              }}
            >
              <ImageCycler images={IMAGE_SETS.profit} offsetMs={OFFSETS_MS[1]} widthEm={1.0} heightEm={0.78} />
              <span>{l2}</span>
            </div>

            {/* Row 3 — setup: warm brown sage, smaller */}
            <div
              className="flex items-center flex-wrap"
              style={{
                gap: '0.18em', marginBottom: '0.04em',
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(36px, 5.5vw, 72px)',
                letterSpacing: '-0.02em', lineHeight: 0.88,
                color: '#6B3828',
              }}
            >
              <span>{l3}</span>
              <ImageCycler images={IMAGE_SETS.operations} offsetMs={OFFSETS_MS[2]} widthEm={2.2} heightEm={0.8} />
            </div>

            {/* Row 4 — payoff: dark indigo */}
            <div
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(52px, 8vw, 100px)',
                letterSpacing: '-0.025em', lineHeight: 0.88,
                color: '#1D2464',
              }}
            >
              <span>{l4}</span>
            </div>
          </h1>

          {/* Two-column: subheadline + CTAs | key stats */}
          <div className="grid md:grid-cols-2 gap-40 items-start mb-60">
            <div>
              <p className="text-body-sm-2 text-sage mb-40 leading-relaxed">
                {HERO.subheadline}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-20"
              >
                <MagneticButton href="/contact" size="lg">
                  {HERO.primaryCTA} →
                </MagneticButton>
                <button className="btn-ghost text-body-sm-2">
                  {HERO.secondaryCTA} →
                </button>
              </motion.div>
            </div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="grid grid-cols-3 gap-20 md:border-l md:border-mist md:pl-40"
            >
              {STATS.map((stat) => (
                <div key={stat.value}>
                  <p
                    className="font-mono font-medium text-obsidian-ink mb-8 tracking-tight"
                    style={{ fontSize: 'clamp(14px, 1.8vw, 21px)' }}
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

          <div className="accent-tick" />
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
              {/* Voltage underline slides in from left on hover */}
              <span className="absolute bottom-0 left-0 h-px bg-voltage transition-all duration-300 ease-out w-0 group-hover:w-full" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
