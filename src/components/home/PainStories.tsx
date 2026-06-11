'use client'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { MARKET_PATTERNS } from '@/lib/constants'

export function PainStories() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.story-card')
      if (cards.length === 0) return

      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          snap: 1 / (cards.length - 1),
          anticipatePin: 1,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-bark text-linen">
      <div className="min-h-screen flex flex-col justify-center px-6 md:px-12">
        <ScrollReveal className="mb-12">
          <p className="text-mist/60 text-xs font-mono tracking-widest uppercase text-center mb-4">
            What we see every day
          </p>
          <h2 className="font-twk-lausanne text-3xl md:text-5xl text-linen text-center tracking-tight">
            The patterns we see every day.
          </h2>
          <p className="text-mist/70 text-base text-center max-w-2xl mx-auto mt-4 leading-relaxed">
            These aren&apos;t case studies — they&apos;re realities. We&apos;ve studied how online
            businesses operate, where they bleed, and what separates the ones that
            scale from the ones that stall.
          </p>
        </ScrollReveal>

        <div ref={trackRef} className="flex gap-8" style={{ width: `${MARKET_PATTERNS.length * 100}vw` }}>
          {MARKET_PATTERNS.map((story, idx) => (
            <div key={story.id} className="story-card flex-shrink-0 w-screen max-w-[100vw] px-6 md:px-12 lg:px-24">
              <div className="max-w-5xl mx-auto">
                <motion.p
                  className="text-mist/60 font-mono text-sm mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-voltage font-medium">{String(idx + 1).padStart(2, '0')}</span>
                  {' / '}
                  {story.category}
                </motion.p>

                <h3 className="font-twk-lausanne text-2xl md:text-3xl text-linen mb-8">{story.headline}</h3>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="card p-6">
                    <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--z-loss)' }}>
                      The Scenario
                    </p>
                    <p className="text-sage text-sm leading-relaxed whitespace-pre-line">
                      {story.pattern}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="card p-6 border-l-2" style={{ borderLeftColor: 'var(--z-caution)' }}>
                      <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--z-caution)' }}>
                        The Reality
                      </p>
                      <p className="text-obsidian-ink text-sm leading-relaxed whitespace-pre-line">
                        {story.insight}
                      </p>
                    </div>

                    <div className="card p-6 border-l-2" style={{ borderLeftColor: 'var(--z-profit)' }}>
                      <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--z-profit)' }}>
                        What Changes This
                      </p>
                      <p className="text-sage text-sm leading-relaxed">
                        {story.approach}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {MARKET_PATTERNS.map((s) => (
            <div key={s.id} className="w-2 h-2 rounded-full bg-linen/20" />
          ))}
        </div>
      </div>
    </section>
  )
}
