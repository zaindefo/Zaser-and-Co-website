'use client'
import Link from 'next/link'
import { TopoWaveField } from '@/components/shared/TopoWaveField'

export function Footer() {
  return (
    <footer className="bg-obsidian-ink text-linen relative overflow-hidden">
      <TopoWaveField className="z-0" theme="dark" lineCount={12} amplitude={10} mouseInteraction={false} opacity={0.3} />
      <div className="page-container section-padding relative z-10">
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-60 mb-60">
          {/* Brand */}
          <div>
            <div className="flex gap-1 items-baseline mb-20">
              <span className="text-heading text-linen">Zaser</span>
              <span className="text-heading text-moss-glow">&amp; Co</span>
            </div>
            <p style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '10px',
              fontWeight: 500,
              color: 'var(--color-mist, #c8d2c8)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              Strategic &amp; Management Consultancy
            </p>
            <p className="text-body-sm text-mist">Strategy that delivers. For businesses that are ready to grow.</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-caption text-moss-glow font-550 uppercase tracking-widest mb-15">Services</h4>
            <nav className="space-y-8 text-body-sm">
              <Link href="/#services" className="block text-linen hover:text-moss-glow transition-colors">
                Financial Clarity
              </Link>
              <Link href="/#services" className="block text-linen hover:text-moss-glow transition-colors">
                Margin Improvement
              </Link>
              <Link href="/#services" className="block text-linen hover:text-moss-glow transition-colors">
                AI Audit
              </Link>
            </nav>
          </div>

          {/* Insights */}
          <div>
            <h4 className="text-caption text-moss-glow font-550 uppercase tracking-widest mb-15">Insights</h4>
            <nav className="space-y-8 text-body-sm">
              <Link href="/insights/revenue-trap" className="block text-linen hover:text-moss-glow transition-colors">
                The Profit Blind Spot
              </Link>
              <Link href="/insights/silent-bleed" className="block text-linen hover:text-moss-glow transition-colors">
                The Margin Slow Bleed
              </Link>
              <Link href="/insights/time-trap" className="block text-linen hover:text-moss-glow transition-colors">
                The AI Time Trap
              </Link>
            </nav>
          </div>

          {/* Systems */}
          <div>
            <h4 className="text-caption text-moss-glow font-550 uppercase tracking-widest mb-15">Systems</h4>
            <nav className="space-y-8 text-body-sm">
              <Link href="/breakpoint" className="block text-linen hover:text-moss-glow transition-colors">
                BreakPoint™
              </Link>
              <Link href="/stockpulse" className="block text-linen hover:text-moss-glow transition-colors">
                StockPulse™
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-caption text-moss-glow font-550 uppercase tracking-widest mb-15">Connect</h4>
            <nav className="space-y-8 text-body-sm">
              <a href="https://linkedin.com/company/zaserandco" target="_blank" rel="noopener noreferrer" className="block text-linen hover:text-moss-glow transition-colors">
                LinkedIn
              </a>
              <a href="mailto:hello@zaserandco.com" className="block text-linen hover:text-moss-glow transition-colors">
                Email
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-mist/20 pt-40">
          <p className="text-body-sm text-mist">© 2026 Zaser & Co. Dhaka, Bangladesh.</p>
        </div>
      </div>
    </footer>
  )
}
