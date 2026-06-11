'use client'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { METHODOLOGY_PILLARS } from '@/lib/constants'

export function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const line = lineRef.current
    if (!section || !line) return

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>('.hw-step')
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
        },
      })

      steps.forEach((step, i) => {
        const progress = (i + 1) / steps.length
        tl.to(line, { scaleX: progress, duration: 1 }, i === 0 ? 0 : undefined)
        tl.fromTo(
          step,
          { opacity: 0.3, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          '<'
        )
        tl.fromTo(
          step.querySelector('.step-icon'),
          { borderColor: '#c8d2c8', color: '#516254' },
          { borderColor: '#2bee4b', color: '#2bee4b', duration: 0.3 },
          '<'
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="methodology" ref={sectionRef} className="section-padding page-container bg-linen border-t border-mist">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-obsidian-ink text-xs font-mono tracking-widest uppercase text-center mb-4">
            How we think
          </p>
          <h2 className="font-twk-lausanne text-3xl md:text-5xl text-obsidian-ink text-center mb-4 tracking-tight">
            Every business is different.<br />
            <span className="display-text">Our process is the same.</span>
          </h2>
        </ScrollReveal>

        <div className="relative mt-16">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-mist/40 z-0" />
          <div
            ref={lineRef}
            className="hidden md:block absolute top-8 left-0 right-0 h-px z-[1] origin-left precision-line"
            style={{ transform: 'scaleX(0)' }}
          />

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {METHODOLOGY_PILLARS.map((step) => (
              <div key={step.number} className="hw-step" style={{ opacity: 0.3 }}>
                <div className="card p-6 h-full">
                  <div className="step-icon w-12 h-12 rounded-full border border-mist flex items-center justify-center mb-4 bg-linen transition-colors">
                    <span className="font-mono font-medium text-sm text-sage transition-colors">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-twk-lausanne text-xl text-obsidian-ink mb-3">{step.title}</h3>
                  <p className="text-obsidian-ink font-twk-lausanne text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
