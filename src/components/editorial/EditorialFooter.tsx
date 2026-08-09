import Link from 'next/link'
import { FULL_NAV, PRIMARY_NAV, SITE } from '../../content/site'

export function EditorialFooter() {
  return (
    <footer className="editorial-footer" data-nav-theme="dark">
      <div className="editorial-footer__lead">
        <span className="eyebrow eyebrow--light">Start with a clearer view</span>
        <h2>Sharper decisions start<br /><em>with a clearer view.</em></h2>
        <p>Tell us where the business feels stuck. We’ll tell you whether a Zaser engagement fits.</p>
        <Link className="button button--paper" href="/contact"><span>Request your session</span><span aria-hidden="true">↗</span></Link>
      </div>
      <div className="editorial-footer__nav">
        <div>
          <span className="footer-label">Explore</span>
          {[...PRIMARY_NAV, ...FULL_NAV.slice(0, 2)].map((item, index) => <Link key={`${item.href}-${index}`} href={item.href}>{item.label}</Link>)}
        </div>
        <div>
          <span className="footer-label">Contact</span>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <span>{SITE.location}</span>
        </div>
        <div>
          <span className="footer-label">Services</span>
          <Link href="/services/ai-audit-implementation">AI Audit &amp; Implementation</Link>
          <Link href="/services/management-operations">Management &amp; Operations Strategy</Link>
        </div>
      </div>
      <div className="editorial-footer__word" aria-hidden="true">ZASER</div>
      <div className="editorial-footer__legal">
        <span>© {new Date().getFullYear()} Zaser &amp; Co</span>
        <span>Advisory That Builds.</span>
      </div>
    </footer>
  )
}
