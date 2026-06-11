'use client'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SERVICE_PILLARS, SERVICE_PILLAR_IMAGES } from '@/lib/constants'

type Pillar = typeof SERVICE_PILLARS[0]

function ServiceSection({ pillar }: { pillar: Pillar }) {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    if (!section || !bg) return

    const ctx = gsap.context(() => {
      gsap.to(bg, {
        y: '-20%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const imageUrl = SERVICE_PILLAR_IMAGES[pillar.id]

  return (
    <section
      ref={sectionRef}
      id={`service-${pillar.id}`}
      className="min-h-screen bg-bark text-linen relative overflow-hidden flex items-center"
    >
      {/* Parallax bg — scaled up to give room for the -20% translateY travel */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{ transform: 'scale(1.3)', transformOrigin: 'center', willChange: 'transform' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(1)', opacity: 0.18 }}
        />
      </div>

      {/* Dark scrim */}
      <div className="absolute inset-0 bg-bark/80" />

      {/* Content */}
      <div className="relative z-10 w-full page-container section-padding grid lg:grid-cols-2 gap-60 items-center">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-voltage font-mono text-xs uppercase tracking-widest mb-15">
              {pillar.number}
            </p>
            <h2 className="font-twk-lausanne text-3xl md:text-5xl text-linen mb-20 tracking-tight">
              {pillar.title}
            </h2>
            <p className="text-body-sm-2 mb-30 leading-relaxed" style={{ color: 'rgba(200,210,200,0.8)' }}>
              {pillar.tagline}
            </p>
            <p className="text-body-sm mb-40 leading-relaxed" style={{ color: 'rgba(200,210,200,0.55)' }}>
              {pillar.description}
            </p>
            <div className="space-y-10">
              {pillar.problems.map((problem) => (
                <div key={problem} className="flex items-start gap-10">
                  <span className="text-voltage mt-1 flex-shrink-0">◆</span>
                  <span className="text-body-sm" style={{ color: 'rgba(200,210,200,0.6)' }}>
                    {problem}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Ghosted number watermark — desktop only */}
        <div className="hidden lg:flex items-center justify-center" aria-hidden="true">
          <span
            className="font-mono font-medium leading-none select-none pointer-events-none"
            style={{
              fontSize: 'clamp(120px, 15vw, 220px)',
              color: 'rgba(250,255,250,0.04)',
            }}
          >
            {pillar.number}
          </span>
        </div>
      </div>
    </section>
  )
}

export function Services() {
  return (
    <div id="services">
      {SERVICE_PILLARS.map((pillar) => (
        <ServiceSection key={pillar.id} pillar={pillar} />
      ))}
    </div>
  )
}
