'use client'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { RadarChart } from '@/components/shared/RadarChart'

export function ClarityScore() {
  return (
    <section className="section-padding page-container bg-linen border-t border-mist relative">
      <div className="max-w-7xl mx-auto relative">
        <ScrollReveal>
          <p className="text-obsidian-ink text-xs font-mono tracking-widest uppercase text-center mb-4">
            Clarity Score&trade;
          </p>
          <h2 className="font-twk-lausanne text-3xl md:text-5xl text-obsidian-ink text-center mb-4 tracking-tight">
            Start with the truth about your business.
          </h2>
          <p className="text-obsidian-ink text-base md:text-lg text-center max-w-2xl mx-auto mb-12 leading-relaxed font-twk-lausanne">
            Every Zaser &amp; Co engagement begins with a Clarity Score — a structured
            diagnostic across five dimensions of business health. It takes 30
            minutes. It costs nothing. And it tells you more about your business
            than most founders learn in a year of operating.
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-12">
          <ScrollReveal delay={0.2}>
            <RadarChart />
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="card p-8 text-center max-w-xs">
              <p className="text-obsidian-ink text-sm mb-2">Typical starting score</p>
              <p className="font-mono text-7xl font-medium text-sage mb-2">20–35</p>
              <p className="text-sage text-xs">That&apos;s not a failure — it&apos;s a starting point</p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="card p-8 max-w-3xl mx-auto" style={{ borderColor: 'var(--z-border)' }}>
            <p className="text-sage text-[10px] font-mono tracking-widest uppercase mb-4 text-center">
              The five dimensions
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-center">
              {[
                { label: 'Financial visibility', desc: 'Do you know your real margins, break-even, and cash position?' },
                { label: 'Operational efficiency', desc: 'Are your processes documented, consistent, and scalable?' },
                { label: 'AI readiness', desc: 'Can your business adopt AI tools effectively right now?' },
                { label: 'Growth trajectory', desc: 'Is your revenue growing faster than your costs?' },
                { label: 'Team capability', desc: 'Can your team operate independently with the right systems?' },
              ].map((dim) => (
                <div key={dim.label}>
                  <p className="font-mono text-voltage text-xs mb-2">{dim.label}</p>
                  <p className="text-sage text-[11px] leading-relaxed">{dim.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="text-center mt-10">
          <MagneticButton href="/contact" size="lg">
            Get your Clarity Score — free, no obligation →
          </MagneticButton>
        </ScrollReveal>
      </div>
    </section>
  )
}
