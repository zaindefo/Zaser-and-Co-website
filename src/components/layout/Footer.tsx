import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-obsidian-ink text-linen">
      <div className="page-container section-padding">
        <div className="grid md:grid-cols-4 gap-60 mb-60">
          {/* Brand */}
          <div>
            <div className="flex gap-1 items-baseline mb-20">
              <span className="text-heading text-linen">Zaser</span>
              <span className="text-heading text-voltage">&amp; Co</span>
            </div>
            <p className="text-body-sm text-mist">Advisory that builds.</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-caption text-voltage font-550 uppercase tracking-widest mb-15">Services</h4>
            <nav className="space-y-8 text-body-sm">
              <Link href="/#services" className="block text-linen hover:text-voltage transition-colors">
                Financial Clarity
              </Link>
              <Link href="/#services" className="block text-linen hover:text-voltage transition-colors">
                Margin Improvement
              </Link>
              <Link href="/#services" className="block text-linen hover:text-voltage transition-colors">
                AI Audit
              </Link>
            </nav>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-caption text-voltage font-550 uppercase tracking-widest mb-15">Tools</h4>
            <nav className="space-y-8 text-body-sm">
              <Link href="/breakpoint" className="block text-linen hover:text-voltage transition-colors">
                BreakPoint™
              </Link>
              <Link href="/stockpulse" className="block text-linen hover:text-voltage transition-colors">
                StockPulse™
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-caption text-voltage font-550 uppercase tracking-widest mb-15">Connect</h4>
            <nav className="space-y-8 text-body-sm">
              <a href="https://linkedin.com/company/zaserandco" target="_blank" rel="noopener noreferrer" className="block text-linen hover:text-voltage transition-colors">
                LinkedIn
              </a>
              <a href="mailto:hello@zaserandco.com" className="block text-linen hover:text-voltage transition-colors">
                Email
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-mist pt-40">
          <p className="text-body-sm text-mist">© 2026 Zaser & Co. Dhaka, Bangladesh.</p>
        </div>
      </div>
    </footer>
  )
}
