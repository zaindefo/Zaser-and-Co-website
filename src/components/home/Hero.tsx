'use client'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { HERO } from '@/lib/constants'
import { HeroImageSlot, HERO_SLOT_DURATION } from '@/remotion/HeroImageSlot'

// SSR-safe: Remotion Player uses browser APIs (canvas, rAF) — defer to client only
const Player = dynamic(() => import('@remotion/player').then((m) => m.Player), { ssr: false })

// Each slot: cw/ch = internal Remotion canvas px, rw/rh = rendered px
// initialFrame staggers the 3 players so they don't all transition simultaneously
const SLOTS = [
  { cw: 180, ch: 110, rw: 180, rh: 110, initialFrame: 0 },
  { cw: 240, ch: 130, rw: 240, rh: 130, initialFrame: 44 },
  { cw: 170, ch: 105, rw: 170, rh: 105, initialFrame: 88 },
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
        component={HeroImageSlot}
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
    <section className="pt-40 md:pt-60 pb-60 md:pb-120 bg-linen relative">
      <div className="page-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Display headline — B&W image slots sit inline between text lines */}
          <h1
            className="mb-40 text-obsidian-ink"
            style={{
              fontFamily: 'var(--font-editorial-new)',
              fontWeight: 300,
              fontSize: 'clamp(64px, 10vw, 180px)',
              lineHeight: 0.95,
            }}
          >
            <div className="flex items-center gap-[0.15em] flex-wrap">
              <span>{l1}</span>
              <ImageSlot slot={SLOTS[0]} />
            </div>
            <div className="flex items-center gap-[0.15em] flex-wrap">
              <ImageSlot slot={SLOTS[1]} />
              <span>{l2}</span>
            </div>
            <div className="flex items-center gap-[0.15em] flex-wrap">
              <span>{l3}</span>
              <ImageSlot slot={SLOTS[2]} />
            </div>
            <div>
              <span>{l4}</span>
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-body-sm-2 text-sage mb-40 max-w-md leading-relaxed"
          >
            {HERO.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-20"
          >
            <MagneticButton href="/contact" size="lg">
              {HERO.primaryCTA} →
            </MagneticButton>
            <button className="btn-ghost text-body-sm-2">
              {HERO.secondaryCTA} →
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '48px' }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="accent-tick mt-60"
          />
        </motion.div>
      </div>
    </section>
  )
}
