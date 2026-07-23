import Link from 'next/link'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { SERVICE_PAGES } from '@/lib/constants'

type ServicePage = (typeof SERVICE_PAGES)[number]

export function ServicePageTemplate({ data }: { data: ServicePage }) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.title,
    description: data.heroSubtitle,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Zaser & Co',
      url: 'https://zaserandco.com',
    },
    areaServed: { '@type': 'Country', name: 'Bangladesh' },
    url: `https://zaserandco.com/services/${data.slug}`,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <main style={{ background: '#F6EFE4', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <header style={{
        padding: 'clamp(120px, 16vh, 200px) clamp(24px, 6vw, 80px) clamp(48px, 8vh, 80px)',
        maxWidth: '920px',
        margin: '0 auto',
      }}>
        <Breadcrumbs items={[
          { label: 'Services', href: '/#services' },
          { label: data.title },
        ]} />

        <h1 style={{
          fontFamily: 'var(--font-editorial-new)',
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 300,
          color: '#0F1235',
          lineHeight: 1.1,
          marginBottom: '24px',
        }}>
          {data.h1}
        </h1>

        <p style={{
          fontFamily: 'var(--font-twk-lausanne)',
          fontSize: '17px',
          fontWeight: 350,
          color: '#6B3828',
          lineHeight: 1.7,
          maxWidth: '680px',
          marginBottom: '32px',
        }}>
          {data.heroSubtitle}
        </p>

        <Link
          href={data.ctaHref}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-twk-lausanne)',
            fontSize: '14px',
            fontWeight: 600,
            color: '#F6EFE4',
            background: '#0F1235',
            textDecoration: 'none',
            padding: '14px 28px',
            borderRadius: '8px',
          }}
        >
          {data.ctaText} →
        </Link>
      </header>

      <div style={{ maxWidth: '920px', margin: '0 auto', padding: '0 clamp(24px, 6vw, 80px)' }}>
        {/* Problem Section */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 300,
            color: '#0F1235',
            lineHeight: 1.15,
            marginBottom: '24px',
          }}>
            {data.problem.headline}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.problem.points.map((point, i) => (
              <li key={i} style={{
                fontFamily: 'var(--font-twk-lausanne)',
                fontSize: '16px',
                fontWeight: 350,
                color: '#6B3828',
                lineHeight: 1.6,
                paddingLeft: '20px',
                borderLeft: '2px solid #C4866A',
              }}>
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* Approach Section */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 300,
            color: '#0F1235',
            lineHeight: 1.15,
            marginBottom: '32px',
          }}>
            {data.approach.headline}
          </h2>
          <div style={{ display: 'grid', gap: '24px' }}>
            {data.approach.steps.map((step, i) => (
              <div key={i} style={{
                padding: '24px',
                background: '#FFFDF8',
                border: '1px solid rgba(18,22,19,0.08)',
                borderRadius: '14px',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                  <span style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '11px',
                    color: 'rgba(107,56,40,0.4)',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-twk-lausanne)',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#0F1235',
                  }}>
                    {step.title}
                  </h3>
                </div>
                <p style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontSize: '15px',
                  fontWeight: 350,
                  color: '#6B3828',
                  lineHeight: 1.65,
                  paddingLeft: '38px',
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables Section */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 300,
            color: '#0F1235',
            lineHeight: 1.15,
            marginBottom: '24px',
          }}>
            {data.deliverables.headline}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {data.deliverables.items.map((item, i) => (
              <li key={i} style={{
                fontFamily: 'var(--font-twk-lausanne)',
                fontSize: '15px',
                fontWeight: 350,
                color: '#6B3828',
                lineHeight: 1.5,
                padding: '14px 16px',
                background: '#FFFDF8',
                border: '1px solid rgba(18,22,19,0.06)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'baseline',
                gap: '10px',
              }}>
                <span style={{ color: '#1a8a3e', fontSize: '14px', flexShrink: 0 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Who This Is For */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 300,
            color: '#0F1235',
            lineHeight: 1.15,
            marginBottom: '16px',
          }}>
            Who this is for
          </h2>
          <p style={{
            fontFamily: 'var(--font-twk-lausanne)',
            fontSize: '17px',
            fontWeight: 350,
            color: '#6B3828',
            lineHeight: 1.7,
          }}>
            {data.audience}
          </p>
        </section>

        {/* Related Services */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 300,
            color: '#0F1235',
            lineHeight: 1.15,
            marginBottom: '24px',
          }}>
            Related services
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {data.relatedServices.map((slug) => {
              const related = SERVICE_PAGES.find((s) => s.slug === slug)
              if (!related) return null
              return (
                <Link
                  key={slug}
                  href={`/services/${slug}`}
                  style={{
                    display: 'block',
                    padding: '20px',
                    background: '#FFFDF8',
                    border: '1px solid rgba(18,22,19,0.08)',
                    borderRadius: '14px',
                    textDecoration: 'none',
                    transition: 'border-color 0.25s',
                  }}
                >
                  <h3 style={{
                    fontFamily: 'var(--font-twk-lausanne)',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#0F1235',
                    marginBottom: '6px',
                  }}>
                    {related.title}
                  </h3>
                  <span style={{
                    fontFamily: 'var(--font-twk-lausanne)',
                    fontSize: '13px',
                    fontWeight: 550,
                    color: '#1a8a3e',
                  }}>
                    Learn more →
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 300,
            color: '#0F1235',
            lineHeight: 1.15,
            marginBottom: '24px',
          }}>
            Frequently asked questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.faq.map((item, i) => (
              <div key={i} style={{
                padding: '24px',
                background: '#FFFDF8',
                border: '1px solid rgba(18,22,19,0.06)',
                borderRadius: '14px',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#0F1235',
                  marginBottom: '10px',
                }}>
                  {item.q}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontSize: '15px',
                  fontWeight: 350,
                  color: '#6B3828',
                  lineHeight: 1.65,
                }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
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
            Ready to get started?
          </h2>
          <p style={{
            fontFamily: 'var(--font-twk-lausanne)',
            fontSize: '16px',
            fontWeight: 350,
            color: 'rgba(246,239,228,0.7)',
            lineHeight: 1.6,
            marginBottom: '24px',
            maxWidth: '480px',
            margin: '0 auto 24px',
          }}>
            Every engagement starts with a free strategic assessment. No cost, no commitment — just clarity on where you stand.
          </p>
          <Link
            href={data.ctaHref}
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
            {data.ctaText} →
          </Link>
        </section>
      </div>
    </main>
  )
}
