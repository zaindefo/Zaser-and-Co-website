import type { Metadata } from 'next'
import { StockMock } from '@/components/shared/StockMock'
import { FeatureGrid } from '@/components/product/FeatureGrid'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { STOCKPULSE_MODULE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'StockPulse™ — Inventory Intelligence',
  description:
    "Never stock out. Never overstock. StockPulse monitors every SKU's velocity, fires reorder alerts, and kills Dead Shelf before it kills your cash flow.",
  alternates: { canonical: '/stockpulse' },
}

const VELOCITY_TIERS = [
  {
    label: 'High Velocity',
    range: '15+ units/day',
    colorClass: 'text-[var(--z-profit)] border-[#1a8a3e]/30',
    bgClass: 'bg-[var(--z-profit-dim)]',
    advice: "Reorder aggressively. Don't let your best seller run dry.",
  },
  {
    label: 'Medium Velocity',
    range: '5–14 units/day',
    colorClass: 'text-[var(--z-caution)] border-[#b7791f]/30',
    bgClass: 'bg-[var(--z-caution-dim)]',
    advice: 'Monitor closely. Seasonal spikes could clear stock fast.',
  },
  {
    label: 'Zero Velocity',
    range: '0 units/day (30+ days)',
    colorClass: 'text-[var(--z-loss)] border-[#c53030]/30',
    bgClass: 'bg-[var(--z-loss-dim)]',
    advice: 'Dead Shelf. Liquidate or bundle before it erodes your cash.',
  },
]

export default function StockPulsePage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="section-padding bg-linen border-t border-mist relative">
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <span className="text-voltage font-mono text-xs uppercase tracking-widest">
                {STOCKPULSE_MODULE.tag}
              </span>
              <h1 className="font-twk-lausanne text-4xl md:text-5xl text-obsidian-ink mt-2 mb-4 tracking-tight">
                {STOCKPULSE_MODULE.headline}
              </h1>
              <p className="text-obsidian-ink text-lg leading-relaxed mb-8 font-twk-lausanne">
                {STOCKPULSE_MODULE.description}
              </p>
              <MagneticButton href="/contact" size="lg">Request a diagnostic →</MagneticButton>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="hidden lg:block">
                <StockMock />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-linen">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-twk-lausanne text-3xl text-obsidian-ink mb-8 tracking-tight">
              Everything in StockPulse&trade;
            </h2>
          </ScrollReveal>
          <FeatureGrid features={STOCKPULSE_MODULE.features} />
        </div>
      </section>

      {/* Velocity Score explainer */}
      <section className="section-padding bg-linen border-t border-mist relative">
        <div className="max-w-4xl mx-auto relative">
          <ScrollReveal>
            <h2 className="font-twk-lausanne text-3xl text-obsidian-ink text-center mb-12 tracking-tight">
              Understanding Velocity Score
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {VELOCITY_TIERS.map((v) => (
              <ScrollReveal key={v.label}>
                <div className={`card p-6 h-full border-l-2 ${v.colorClass}`}>
                  <p className={`font-mono text-xs uppercase tracking-widest mb-2 ${v.colorClass.split(' ')[0]}`}>
                    {v.label}
                  </p>
                  <p className="font-mono text-xl text-obsidian-ink mb-3">{v.range}</p>
                  <p className="text-obsidian-ink text-sm leading-relaxed font-twk-lausanne">{v.advice}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-linen text-center">
        <ScrollReveal>
          <h2 className="font-twk-lausanne text-3xl text-obsidian-ink mb-4">Ready to see your Velocity Scores?</h2>
          <p className="text-obsidian-ink mb-8 max-w-xl mx-auto font-twk-lausanne">
            Request a free Clarity Score diagnostic. We&apos;ll show you StockPulse configured for your inventory.
          </p>
          <MagneticButton href="/contact" size="lg">Request a diagnostic →</MagneticButton>
        </ScrollReveal>
      </section>
    </main>
  )
}
