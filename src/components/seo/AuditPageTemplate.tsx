import Link from 'next/link'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { AUDIT_PAGES } from '@/lib/constants'

type AuditPage = (typeof AUDIT_PAGES)[keyof typeof AUDIT_PAGES]

export function AuditPageTemplate({ data }: { data: AuditPage }) {
  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: data.h1,
    description: data.description,
    price: '0',
    priceCurrency: 'BDT',
    availability: 'https://schema.org/InStock',
    offeredBy: {
      '@type': 'ProfessionalService',
      name: 'Zaser & Co',
      url: 'https://zaserandco.com',
    },
    url: `https://zaserandco.com/${data.slug}`,
  }

  return (
    <main style={{ background: '#F6EFE4', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />

      {/* Hero */}
      <header style={{
        padding: 'clamp(120px, 16vh, 200px) clamp(24px, 6vw, 80px) clamp(48px, 8vh, 80px)',
        maxWidth: '920px',
        margin: '0 auto',
      }}>
        <Breadcrumbs items={[{ label: data.h1 }]} />

        <p style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#1a8a3e',
          marginBottom: '16px',
        }}>
          Free — No Cost, No Commitment
        </p>

        <h1 style={{
          fontFamily: 'var(--font-editorial-new)',
          fontSize: 'clamp(36px, 5.5vw, 56px)',
          fontWeight: 300,
          color: '#0F1235',
          lineHeight: 1.05,
          marginBottom: '20px',
        }}>
          {data.h1}
        </h1>

        <p style={{
          fontFamily: 'var(--font-twk-lausanne)',
          fontSize: '20px',
          fontWeight: 350,
          color: '#6B3828',
          lineHeight: 1.5,
          maxWidth: '640px',
          marginBottom: '32px',
        }}>
          {data.subtitle}
        </p>
      </header>

      <div style={{ maxWidth: '920px', margin: '0 auto', padding: '0 clamp(24px, 6vw, 80px)' }}>
        {/* Description */}
        <section style={{ marginBottom: '64px' }}>
          <p style={{
            fontFamily: 'var(--font-twk-lausanne)',
            fontSize: '17px',
            fontWeight: 350,
            color: '#6B3828',
            lineHeight: 1.7,
            marginBottom: '32px',
          }}>
            {data.description}
          </p>
        </section>

        {/* What We Assess */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 300,
            color: '#0F1235',
            lineHeight: 1.15,
            marginBottom: '24px',
          }}>
            What we assess
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {data.dimensions.map((dim, i) => (
              <div key={i} style={{
                padding: '24px',
                background: '#FFFDF8',
                border: '1px solid rgba(18,22,19,0.08)',
                borderRadius: '14px',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '10px' }}>
                  <span style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '11px',
                    color: 'rgba(107,56,40,0.4)',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-twk-lausanne)',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#0F1235',
                  }}>
                    {dim.title}
                  </h3>
                </div>
                <p style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontSize: '14px',
                  fontWeight: 350,
                  color: '#6B3828',
                  lineHeight: 1.6,
                }}>
                  {dim.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 300,
            color: '#0F1235',
            lineHeight: 1.15,
            marginBottom: '24px',
          }}>
            How it works
          </h2>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.process.map((step, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '16px',
                fontFamily: 'var(--font-twk-lausanne)',
                fontSize: '16px',
                fontWeight: 350,
                color: '#6B3828',
                lineHeight: 1.6,
                padding: '16px 20px',
                background: '#FFFDF8',
                border: '1px solid rgba(18,22,19,0.06)',
                borderRadius: '10px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#1a8a3e',
                  flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* Contact Form CTA */}
        <section style={{
          padding: '48px 32px',
          background: '#0F1235',
          borderRadius: '14px',
          textAlign: 'center',
          marginBottom: '80px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 300,
            color: '#F6EFE4',
            lineHeight: 1.15,
            marginBottom: '16px',
          }}>
            {data.ctaText}
          </h2>
          <p style={{
            fontFamily: 'var(--font-twk-lausanne)',
            fontSize: '16px',
            fontWeight: 350,
            color: 'rgba(246,239,228,0.7)',
            lineHeight: 1.6,
            maxWidth: '480px',
            margin: '0 auto 24px',
          }}>
            30 minutes. No cost. No commitment. Just clarity on where your business stands and what to fix first.
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-twk-lausanne)',
              fontSize: '14px',
              fontWeight: 600,
              color: '#0F1235',
              background: '#F6EFE4',
              textDecoration: 'none',
              padding: '14px 28px',
              borderRadius: '8px',
            }}
          >
            Book Your Free Session →
          </Link>
        </section>
      </div>
    </main>
  )
}
