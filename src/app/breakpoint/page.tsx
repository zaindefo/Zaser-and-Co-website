import type { Metadata } from 'next'
import { DashboardMock } from '@/components/shared/DashboardMock'
import { FeatureGrid } from '@/components/product/FeatureGrid'
import { ScenarioSlider } from '@/components/product/ScenarioSlider'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { BREAKPOINT_MODULE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'BreakPoint™ — Real-Time Break-Even Intelligence',
  description:
    'Know your Zero Day. BreakPoint tracks daily revenue against break-even with AI insights, WhatsApp alerts, and scenario modeling for online businesses.',
}

export default function BreakpointPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="section-padding bg-linen border-t border-mist relative">
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <span className="text-voltage font-mono text-xs uppercase tracking-widest">
                {BREAKPOINT_MODULE.tag}
              </span>
              <h1 className="font-twk-lausanne text-4xl md:text-5xl text-obsidian-ink mt-2 mb-4 tracking-tight">
                {BREAKPOINT_MODULE.headline}
              </h1>
              <p className="text-obsidian-ink text-lg leading-relaxed mb-8 font-twk-lausanne">
                {BREAKPOINT_MODULE.description}
              </p>
              <MagneticButton href="/contact" size="lg">Request a diagnostic →</MagneticButton>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="hidden lg:block">
                <DashboardMock />
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
              Everything in BreakPoint&trade;
            </h2>
          </ScrollReveal>
          <FeatureGrid features={BREAKPOINT_MODULE.features} />
        </div>
      </section>

      {/* Interactive demo */}
      <section className="section-padding bg-linen border-t border-mist relative">
        <div className="max-w-7xl mx-auto relative">
          <ScrollReveal>
            <h2 className="font-twk-lausanne text-3xl text-obsidian-ink text-center mb-12 tracking-tight">
              Try it yourself.
            </h2>
          </ScrollReveal>
          <ScenarioSlider />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-linen text-center">
        <ScrollReveal>
          <h2 className="font-twk-lausanne text-3xl text-obsidian-ink mb-4">Ready to know your Zero Day?</h2>
          <p className="text-obsidian-ink mb-8 max-w-xl mx-auto font-twk-lausanne">
            Request a free Clarity Score diagnostic. We&apos;ll show you BreakPoint configured for your business.
          </p>
          <MagneticButton href="/contact" size="lg">Request a diagnostic →</MagneticButton>
        </ScrollReveal>
      </section>
    </main>
  )
}
