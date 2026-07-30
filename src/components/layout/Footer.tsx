'use client'
import Link from 'next/link'
import { TopoWaveField } from '@/components/shared/TopoWaveField'

export function Footer() {
  return (
    <footer className="bg-obsidian-ink text-linen relative overflow-hidden">
      <TopoWaveField className="z-0" theme="dark" lineCount={12} amplitude={10} mouseInteraction={false} opacity={0.3} />
      <div className="page-container section-padding relative z-10">
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-60 mb-60">
          {/* Brand */}
          <div className="lg:col-span-2">
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
              <Link href="/services/ai-audit-implementation" className="block text-linen hover:text-moss-glow transition-colors">
                AI Audit &amp; Implementation
              </Link>
              <Link href="/services/management-operations" className="block text-linen hover:text-moss-glow transition-colors">
                Management &amp; Operations
              </Link>
            </nav>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-caption text-moss-glow font-550 uppercase tracking-widest mb-15">Industries</h4>
            <nav className="space-y-8 text-body-sm">
              <Link href="/industries/ecommerce" className="block text-linen hover:text-moss-glow transition-colors">
                E-Commerce
              </Link>
              <Link href="/industries/education-businesses" className="block text-linen hover:text-moss-glow transition-colors">
                Education
              </Link>
              <Link href="/industries/service-businesses" className="block text-linen hover:text-moss-glow transition-colors">
                Service Businesses
              </Link>
              <Link href="/industries/retail-businesses" className="block text-linen hover:text-moss-glow transition-colors">
                Retail
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-caption text-moss-glow font-550 uppercase tracking-widest mb-15">Resources</h4>
            <nav className="space-y-8 text-body-sm">
              <Link href="/insights" className="block text-linen hover:text-moss-glow transition-colors">
                Insights
              </Link>
              <Link href="/free-business-audit" className="block text-linen hover:text-moss-glow transition-colors">
                Free Business Audit
              </Link>
              <Link href="/free-ai-audit" className="block text-linen hover:text-moss-glow transition-colors">
                Free AI Audit
              </Link>
              <Link href="/policies" className="block text-linen hover:text-moss-glow transition-colors">
                Policies
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-caption text-moss-glow font-550 uppercase tracking-widest mb-15">Connect</h4>
            <nav className="space-y-8 text-body-sm">
              <Link href="/contact" className="block text-linen hover:text-moss-glow transition-colors">
                Contact
              </Link>
              <Link href="/about" className="block text-linen hover:text-moss-glow transition-colors">
                About
              </Link>
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
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            <p className="text-body-sm text-mist">© 2026 Zaser & Co. Dhaka, Bangladesh.</p>
            <nav style={{ display: 'flex', gap: '24px' }}>
              <Link href="/business-consultancy-bangladesh" className="text-body-sm text-mist hover:text-moss-glow transition-colors" style={{ textDecoration: 'none' }}>
                Business Consultancy Bangladesh
              </Link>
              <Link href="/business-consultant-dhaka" className="text-body-sm text-mist hover:text-moss-glow transition-colors" style={{ textDecoration: 'none' }}>
                Business Consultant Dhaka
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
