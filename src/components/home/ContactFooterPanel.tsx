'use client'
import Link from 'next/link'
import { LivingOrganism } from '@/components/shared/LivingOrganism'
import { CONTACT_PANEL } from '@/lib/constants'

/**
 * Final stacking layer: footer navigation on top, blueprint + contact card below.
 * Replaces the global <Footer /> on the homepage only.
 */
export function ContactFooterPanel() {
  const { wordmark, tagline, navLinks, utilityLinks, cardLabel, email, location, badge } = CONTACT_PANEL

  return (
    <section style={{ background: 'var(--void-black)', position: 'relative', overflow: 'hidden' }}>
      {/* ── Footer navigation ── */}
      <div style={{
        padding: 'clamp(56px, 9vh, 104px) clamp(28px, 5vw, 72px) clamp(40px, 6vh, 72px)',
        maxWidth: '1440px', margin: '0 auto',
      }}>
        <div className="cf-nav-grid" style={{ display: 'grid', gap: '48px', alignItems: 'start' }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-bebas)', fontSize: 'clamp(34px, 4.5vw, 48px)',
              color: 'var(--chrome-white)', letterSpacing: '0.02em', lineHeight: 1,
            }}>
              {wordmark}
            </p>
            <p style={{
              fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--chrome-mid)',
              letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '10px', marginBottom: '36px',
            }}>
              {tagline}
            </p>

            <nav style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0 14px' }}>
              {navLinks.map((link, i) => (
                <span key={link.href} style={{ display: 'inline-flex', alignItems: 'baseline', gap: '14px' }}>
                  {i > 0 && (
                    <span aria-hidden="true" style={{
                      fontFamily: 'var(--font-twk-lausanne)', fontWeight: 200,
                      fontSize: 'clamp(22px, 3.2vw, 36px)', color: 'var(--chrome-dark)',
                    }}>
                      /
                    </span>
                  )}
                  <Link href={link.href} className="cf-nav-link" style={{
                    fontFamily: 'var(--font-twk-lausanne)', fontWeight: 200,
                    fontSize: 'clamp(22px, 3.2vw, 36px)', color: 'var(--chrome-white)',
                    textDecoration: 'none', lineHeight: 1.35,
                  }}>
                    {link.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>

          <nav className="cf-utility" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {utilityLinks.map((link) => {
              const external = link.href.startsWith('http')
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="cf-util-link"
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  style={{
                    fontFamily: 'var(--font-twk-lausanne)', fontSize: '14px',
                    color: 'var(--chrome-mid)', textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* ── Blueprint + contact card ── */}
      <div style={{ padding: '0 clamp(28px, 5vw, 72px) clamp(48px, 7vh, 88px)', maxWidth: '1440px', margin: '0 auto' }}>
        <div className="cf-card-grid" style={{ position: 'relative', display: 'grid', alignItems: 'center' }}>
          {/* Blueprint panel */}
          <div className="cf-blueprint" style={{
            position: 'relative', overflow: 'hidden',
            background: 'var(--void-surface)',
            border: '1px solid var(--void-border)',
            borderRadius: '14px',
            minHeight: 'clamp(280px, 42vh, 420px)',
            backgroundImage:
              'repeating-linear-gradient(0deg, var(--void-border) 0 1px, transparent 1px 48px),' +
              'repeating-linear-gradient(90deg, var(--void-border) 0 1px, transparent 1px 48px)',
          }}>
            <LivingOrganism opacity={0.18} spread={0.7} nodeCount={16} />
            <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <path d="M 8% 78% L 34% 78% L 34% 30% L 64% 30%" fill="none"
                stroke="var(--butter-yellow)" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="5 6" />
              <path d="M 12% 18% L 12% 54% L 52% 54%" fill="none"
                stroke="var(--butter-yellow)" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="5 6" />
              <circle cx="34%" cy="30%" r="3.5" fill="var(--butter-yellow)" fillOpacity="0.5" />
              <circle cx="12%" cy="54%" r="3.5" fill="var(--butter-yellow)" fillOpacity="0.25" />
            </svg>
          </div>

          {/* Butter contact card — floats slightly against the blueprint on scroll */}
          <div className="cf-card" data-parallax="18" style={{
            background: 'var(--butter-light)',
            borderRadius: '14px',
            padding: 'clamp(28px, 3.5vw, 44px)',
          }}>
            <p style={{
              fontFamily: 'var(--font-twk-lausanne)', fontSize: '14px',
              color: 'var(--chrome-dark)', marginBottom: '20px',
            }}>
              {cardLabel}
            </p>

            <a href={`mailto:${email}`} style={{
              display: 'block', fontFamily: 'var(--font-twk-lausanne)', fontWeight: 700,
              fontSize: 'clamp(18px, 2vw, 22px)', color: 'var(--void-black)',
              textDecoration: 'none', marginBottom: '6px', wordBreak: 'break-word',
            }}>
              {email}
            </a>
            <p style={{
              fontFamily: 'var(--font-twk-lausanne)', fontWeight: 700,
              fontSize: 'clamp(18px, 2vw, 22px)', color: 'var(--void-black)',
              marginBottom: 'clamp(28px, 4vh, 44px)',
            }}>
              {location}
            </p>

            <div style={{ borderTop: '1px solid rgba(10,12,20,0.15)', paddingTop: '20px' }}>
              <p style={{
                fontFamily: 'var(--font-twk-lausanne)', fontSize: '14px',
                color: 'var(--void-black)', marginBottom: '8px',
              }}>
                {badge}
              </p>
              <p style={{
                fontFamily: 'var(--font-bebas)', fontSize: 'clamp(26px, 3vw, 36px)',
                color: 'var(--void-black)', letterSpacing: '0.02em', lineHeight: 1,
              }}>
                {wordmark}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cf-nav-link:hover { color: var(--butter-yellow) !important; }
        .cf-util-link:hover { color: var(--chrome-white) !important; }

        @media (min-width: 768px) {
          .cf-nav-grid { grid-template-columns: 1fr auto; }
          .cf-utility { text-align: right; align-items: flex-end; }
          .cf-card-grid { grid-template-columns: 1fr; }
          .cf-blueprint { grid-column: 1; grid-row: 1; width: 100%; }
          .cf-card {
            grid-column: 1; grid-row: 1;
            justify-self: end; align-self: center;
            width: min(380px, 42%);
            margin-right: clamp(16px, 4vw, 56px);
          }
        }
        @media (max-width: 767px) {
          .cf-card-grid { gap: 20px; }
          .cf-card { width: 100%; }
        }
      `}</style>
    </section>
  )
}
