'use client'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { FOUNDER } from '@/lib/constants'

export function Founder() {
  return (
    <section className="section-padding page-container bg-linen border-t border-mist relative">
      <div className="relative z-10 max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="text-obsidian-ink text-xs font-mono tracking-widest uppercase text-center mb-6">
            The founder
          </p>
          <h2 className="font-twk-lausanne text-3xl md:text-4xl text-obsidian-ink text-center mb-12 tracking-tight leading-snug">
            {FOUNDER.headline[0]}<br />
            <span className="display-text">{FOUNDER.headline[1]}</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-6">
          {FOUNDER.body.map((para, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <p className="text-obsidian-ink font-twk-lausanne text-lg leading-relaxed">
                {para}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 card p-8 text-center" style={{ borderColor: 'var(--z-chrome-dim)' }}>
            <p className="text-voltage font-twk-lausanne text-lg italic leading-relaxed">
              &ldquo;Advisory that builds.&rdquo;
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
