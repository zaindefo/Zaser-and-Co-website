import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { MagneticButton } from '@/components/shared/MagneticButton'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind Zaser & Co — a consultancy that advises and builds, for online businesses that are growing.',
}

export default function AboutPage() {
  return (
    <main className="pt-24">
      <section className="section-padding bg-linen border-t border-mist relative">
        <div className="max-w-4xl mx-auto relative">
          <ScrollReveal>
            <h1 className="font-twk-lausanne text-4xl md:text-5xl text-obsidian-ink mb-6 tracking-tight">
              Built by someone who studies business<br />
              <span className="display-text">for a living — and builds it as a calling.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-6 text-obsidian-ink font-twk-lausanne text-lg leading-relaxed">
              <p>
                Zaser &amp; Co was founded by{' '}
                <span className="text-obsidian-ink font-medium">Syed Zain bin Noor</span> — a business,
                accounting, and economics specialist who saw a gap nobody was filling: the online businesses
                driving Bangladesh&apos;s digital economy had no access to affordable, intelligent, hands-on consulting.
              </p>
              <p>
                Large firms serve corporates. Freelance advisors give opinions. Nobody was combining rigorous
                financial analysis, AI-powered tooling, and hands-on implementation into a single practice
                designed for the businesses that need it most.
              </p>
              <p>
                That&apos;s what Zaser &amp; Co is. A consultancy that advises and builds. For businesses that are
                growing and need someone who can see what they can&apos;t.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="mt-12">
            <div className="card p-8" style={{ borderColor: 'var(--z-border)' }}>
              <h2 className="font-twk-lausanne text-2xl text-obsidian-ink mb-4">What makes us different</h2>
              <p className="text-obsidian-ink text-lg leading-relaxed font-twk-lausanne">
                Most consultancies advise — they produce a report, present a deck, and leave.
                Zaser &amp; Co advises AND builds. When we identify a margin problem, we install a system
                that tracks it in real-time. When we audit your AI readiness, we build the workflows.
                When we say your content isn&apos;t working, we generate the content that does.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="mt-12">
            <div className="card p-8">
              <h2 className="font-twk-lausanne text-2xl text-obsidian-ink mb-4">Five pillars</h2>
              <ul className="space-y-4 text-obsidian-ink font-twk-lausanne leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-voltage mt-1 flex-shrink-0">&#9670;</span>
                  <span>
                    <span className="text-obsidian-ink font-medium">Financial Clarity.</span> Real margins,
                    real break-even, real cash flow — through advisory and our proprietary tools BreakPoint&trade;
                    and StockPulse&trade;.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-voltage mt-1 flex-shrink-0">&#9670;</span>
                  <span>
                    <span className="text-obsidian-ink font-medium">Margin &amp; Operations Improvement.</span> Diagnosing
                    and fixing the operational problems that silently erode margin every day.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-voltage mt-1 flex-shrink-0">&#9670;</span>
                  <span>
                    <span className="text-obsidian-ink font-medium">AI Audit &amp; Implementation.</span> Structured
                    assessment followed by working AI systems deployed in your business within weeks.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-voltage mt-1 flex-shrink-0">&#9670;</span>
                  <span>
                    <span className="text-obsidian-ink font-medium">Content Generation.</span> AI-powered content
                    systems that produce consistent, on-brand, conversion-focused output at scale.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-voltage mt-1 flex-shrink-0">&#9670;</span>
                  <span>
                    <span className="text-obsidian-ink font-medium">HR &amp; AI Training.</span> Preparing teams
                    to work with AI and building the HR foundations that prevent growing pains.
                  </span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="mt-12">
            <div className="card p-8" style={{ borderColor: 'var(--z-border)' }}>
              <h2 className="font-twk-lausanne text-2xl text-obsidian-ink mb-4">The brand promise</h2>
              <p className="text-voltage text-xl leading-relaxed font-twk-lausanne italic text-center">
                &ldquo;We don&apos;t just tell you what&apos;s wrong.<br />
                We build what makes it right.&rdquo;
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5} className="mt-12 text-center">
            <MagneticButton href="/contact" size="lg">Request a diagnostic →</MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
