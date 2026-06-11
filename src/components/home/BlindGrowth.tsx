'use client'
import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from '@/lib/gsap'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { StaggerReveal } from '@/components/shared/StaggerReveal'
import { PROBLEM_SECTION, PROBLEM_STATS, GHOST_PROFIT_LAYERS } from '@/lib/constants'
import { formatBDT } from '@/lib/utils'

export function BlindGrowth() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinnedRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])
  const resultRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pinnedRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedRef.current,
          start: 'top top',
          end: '+=3000',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      const counter = { value: 800000 }

      tl.set(barRef.current, { width: '100%' })
      if (numberRef.current) {
        numberRef.current.textContent = formatBDT(800000)
        numberRef.current.style.color = 'var(--z-profit)'
      }

      GHOST_PROFIT_LAYERS.forEach((layer, i) => {
        const pct = (layer.running / 800000) * 100
        const labelEl = labelRefs.current[i]

        tl.to(barRef.current, {
          width: `${pct}%`,
          duration: 1,
          ease: 'power2.inOut',
          backgroundColor:
            pct < 20 ? 'var(--z-loss)' : pct < 50 ? 'var(--z-caution)' : 'var(--z-accent)',
        })

        tl.to(
          counter,
          {
            value: layer.running,
            duration: 0.3,
            snap: { value: 1 },
            onUpdate: () => {
              if (!numberRef.current) return
              numberRef.current.textContent = formatBDT(Math.round(counter.value))
              numberRef.current.style.color =
                counter.value <= 100000
                  ? 'var(--z-loss)'
                  : counter.value <= 300000
                    ? 'var(--z-caution)'
                    : 'var(--z-profit)'
            },
          },
          '<'
        )

        if (labelEl) {
          tl.fromTo(
            labelEl,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.4 },
            '-=0.6'
          )
          if (i < GHOST_PROFIT_LAYERS.length - 1) {
            tl.to(labelEl, { opacity: 0.3, duration: 0.2 }, '+=0.1')
          }
        }
      })

      if (resultRef.current) {
        tl.fromTo(
          resultRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '+=0.2'
        )
      }
    }, pinnedRef)

    return () => ctx.revert()
  }, [])

  const headlineInView = useInView(headlineRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Headline + Insight Cards */}
      <div className="section-padding page-container bg-linen border-t border-mist">
        <div className="max-w-7xl mx-auto">
          <div ref={headlineRef}>
            <ScrollReveal>
              <p className="text-sage text-xs font-mono tracking-widest uppercase text-center mb-6">
                The Problem
              </p>
              <h2 className="font-twk-lausanne text-3xl md:text-5xl text-obsidian-ink text-center mb-2 tracking-tight">
                {PROBLEM_SECTION.headline[0]}
              </h2>
            </ScrollReveal>
            <motion.h2
              className="font-twk-lausanne text-3xl md:text-5xl text-center mb-16 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={headlineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span style={{ color: 'var(--z-loss)' }}>{PROBLEM_SECTION.headline[1]}</span>
            </motion.h2>
          </div>

          {/* Insight cards */}
          <StaggerReveal className="grid md:grid-cols-3 gap-6 mb-12">
            {PROBLEM_STATS.map((stat, i) => (
              <div key={i} className="p-20 h-full flex flex-col border-b border-mist pb-20">
                <h3 className="font-twk-lausanne text-heading-sm text-obsidian-ink mb-15 leading-snug">
                  {stat.title}
                </h3>
                <p className="text-sage font-twk-lausanne text-body-sm leading-relaxed flex-1">
                  {stat.body}
                </p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </div>

      {/* Pinned Ghost Profit decomposition */}
      <div
        ref={pinnedRef}
        className="relative min-h-screen flex items-center justify-center bg-linen"
      >
        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
          <div className="text-center mb-12">
            <p className="text-sage font-mono text-xs uppercase tracking-widest mb-3">
              Monthly Revenue
            </p>
            <span
              ref={numberRef}
              className="font-mono text-5xl md:text-7xl font-medium"
              style={{ color: 'var(--z-profit)' }}
            >
              ৳8,00,000
            </span>
          </div>

          <div className="relative h-3 bg-mist rounded-full overflow-hidden mb-8">
            <div
              ref={barRef}
              className="h-full rounded-full transition-colors"
              style={{ width: '100%', backgroundColor: 'var(--z-accent)' }}
            />
          </div>

          <div className="space-y-3 max-w-md mx-auto">
            {GHOST_PROFIT_LAYERS.map((layer, i) => (
              <div
                key={layer.label}
                ref={(el) => {
                  labelRefs.current[i] = el
                }}
                className="flex justify-between items-center opacity-0"
              >
                <span className="text-sage text-sm">&minus; {layer.label}</span>
                <span className="font-mono text-sm" style={{ color: 'var(--z-loss)' }}>
                  ৳{layer.amount.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div ref={resultRef} className="text-center mt-12 opacity-0">
            <p className="text-obsidian-ink font-twk-lausanne text-lg mb-2">This is your real profit.</p>
            <p className="text-sage text-sm">
              The ৳7,53,000 you thought you had? That was{' '}
              <span className="font-medium" style={{ color: 'var(--z-caution)' }}>Ghost Profit.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Body copy (after unpin) */}
      <div className="section-padding page-container bg-linen border-t border-mist">
        <div className="max-w-3xl mx-auto space-y-4">
          {PROBLEM_SECTION.body.map((para, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <p className="text-sage font-twk-lausanne text-body-sm-2 leading-relaxed">{para}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
