'use client'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { HERO } from '@/lib/constants'
import {
  HeroSlotNumbers,
  HeroSlotProfit,
  HeroSlotOps,
  HERO_SLOT_DURATION,
} from '@/remotion/HeroImageSlot'

// SSR-safe: Remotion Player uses browser APIs — defer to client only
const Player = dynamic(() => import('@remotion/player').then((m) => m.Player), { ssr: false })

// Each slot uses a distinct Remotion composition with a different image set.
// initialFrame staggers the 3 players to thirds of the 220-frame cycle (0 / 73 / 147).
const SLOTS = [
  { component: HeroSlotNumbers, cw: 180, ch: 110, rw: 180, rh: 110, initialFrame: 0 },
  { component: HeroSlotProfit,  cw: 240, ch: 130, rw: 240, rh: 130, initialFrame: 73 },
  { component: HeroSlotOps,     cw: 170, ch: 105, rw: 170, rh: 105, initialFrame: 147 },
]

const QUICK_NAV = [
  { number: '01', label: 'Services',     href: '/#services' },
  { number: '02', label: 'BreakPoint™',  href: '/breakpoint' },
  { number: '03', label: 'StockPulse™',  href: '/stockpulse' },
  { number: '04', label: 'Perspectives', href: '/#perspectives' },
]

const STATS = [
  { value: '<1 in 5',  lines: ['online businesses', 'know their real margin'] },
  { value: '30–40%',   lines: ['working hours', 'are automatable with AI'] },
  { value: '৳15–25%',  lines: ['of inventory capital', 'is frozen in dead stock'] },
]

function ImageSlot({ slot }: { slot: typeof SLOTS[0] }) {
  return (
    <div
      style={{
        display: 'inline-block',
        flexShrink: 0,
        borderRadius: 10,
        overflow: 'hidden',
        verticalAlign: 'middle',
      }}
    >
      <Player
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={slot.component as React.ComponentType<any>}
        durationInFrames={HERO_SLOT_DURATION}
        fps={30}
        compositionWidth={slot.cw}
        compositionHeight={slot.ch}
        style={{ width: slot.rw, height: slot.rh, display: 'block' }}
        loop
        autoPlay
        controls={false}
        initialFrame={slot.initialFrame}
        acknowledgeRemotionLicense
      />
    </div>
  )
}

export function Hero() {
  const [l1, l2, l3, l4] = HERO.headline

  return (
    <section className="min-h-screen bg-linen relative flex flex-col">
      {/* Background monogram — barely-there depth element at ~1.6% opacity */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-pp-mondwest)',
            fontSize: 'clamp(300px, 50vw, 700px)',
            color: 'rgba(18,22,19,0.016)',
            position: 'absolute',
            top: '5%',
            right: '-8%',
            lineHeight: 1,
          }}
        >
          Z
        </span>
      </div>

      {/* Main content — flex-1 fills vertical space */}
      <div className="page-container px-6 md:px-12 lg:px-20 pt-40 md:pt-60 pb-40 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Editorial display headline with 3 inline Remotion image slots */}
          <h1
            className="text-obsidian-ink"
            style={{
              fontFamily: 'var(--font-editorial-new)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(52px, 9vw, 156px)',
              lineHeight: 0.95,
              marginBottom: '3rem',
            }}
          >
            <div className="flex items-center flex-wrap" style={{ gap: '0.12em' }}>
              <span>{l1}</span>
              <ImageSlot slot={SLOTS[0]} />
            </div>
            <div className="flex items-center flex-wrap" style={{ gap: '0.12em' }}>
              <ImageSlot slot={SLOTS[1]} />
              <span>{l2}</span>
            </div>
            <div className="flex items-center flex-wrap" style={{ gap: '0.12em' }}>
              <span>{l3}</span>
              <ImageSlot slot={SLOTS[2]} />
            </div>
            <div>
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

            {/* Key stats strip */}
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
                    style={{ fontSize: 'clamp(15px, 2vw, 22px)' }}
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
        className="page-container px-6 md:px-12 lg:px-20 pb-20"
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
