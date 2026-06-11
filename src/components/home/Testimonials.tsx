'use client'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { StaggerReveal } from '@/components/shared/StaggerReveal'
import { PERSPECTIVES, MARKET_INTELLIGENCE } from '@/lib/constants'

export function Testimonials() {
  return (
    <section id="perspectives" className="section-padding page-container bg-linen border-t border-mist relative">
      <div className="max-w-7xl mx-auto relative">
        <ScrollReveal>
          <p className="text-obsidian-ink text-xs font-mono tracking-widest uppercase text-center mb-4">
            Perspectives
          </p>
          <h2 className="font-twk-lausanne text-3xl md:text-5xl text-obsidian-ink text-center mb-16 tracking-tight">
            What the numbers actually say.
          </h2>
        </ScrollReveal>

        {/* Editorial cards */}
        <StaggerReveal className="grid md:grid-cols-3 gap-6 mb-20">
          {PERSPECTIVES.map((item, i) => (
            <div key={i} className="card p-8 h-full flex flex-col">
              <h3 className="font-twk-lausanne text-xl text-obsidian-ink mb-4 leading-snug">
                {item.title}
              </h3>
              <p className="text-obsidian-ink font-twk-lausanne text-sm leading-relaxed flex-1">
                {item.body}
              </p>
            </div>
          ))}
        </StaggerReveal>

        {/* Market intelligence */}
        <ScrollReveal>
          <p className="text-obsidian-ink text-xs font-mono tracking-widest uppercase text-center mb-8">
            Market Intelligence
          </p>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {MARKET_INTELLIGENCE.map((m, i) => (
            <div key={i} className="card p-6 text-center">
              <p className="font-mono text-2xl md:text-3xl font-medium text-voltage mb-2">
                {m.figure}
              </p>
              <p className="text-obsidian-ink text-xs leading-relaxed mb-2">{m.label}</p>
              <p className="text-sage text-[10px] font-mono">{m.source}</p>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
