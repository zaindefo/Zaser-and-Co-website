import Link from 'next/link'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { LOCAL_PAGES, SERVICE_PAGES } from '@/lib/constants'
import type { Metadata } from 'next'

const data = LOCAL_PAGES[1]

export const metadata: Metadata = {
  title: data.seoTitle,
  description: data.metaDescription,
  alternates: { canonical: '/business-consultant-dhaka' },
  openGraph: {
    title: `${data.seoTitle} | Zaser & Co`,
    description: data.metaDescription,
    type: 'website',
    url: 'https://zaserandco.com/business-consultant-dhaka',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.seoTitle} | Zaser & Co`,
    description: data.metaDescription,
  },
}

export default function BusinessConsultantDhaka() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Zaser & Co',
    description: data.metaDescription,
    url: 'https://zaserandco.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressRegion: 'Dhaka Division',
      addressCountry: 'BD',
    },
    areaServed: {
      '@type': 'City',
      name: 'Dhaka',
      containedInPlace: { '@type': 'Country', name: 'Bangladesh' },
    },
    priceRange: 'Free initial consultation',
    serviceType: 'Business Consulting',
  }

  return (
    <main style={{ background: '#F6EFE4', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <header style={{
        padding: 'clamp(120px, 16vh, 200px) clamp(24px, 6vw, 80px) clamp(48px, 8vh, 80px)',
        maxWidth: '920px',
        margin: '0 auto',
      }}>
        <Breadcrumbs items={[{ label: 'Business Consultant Dhaka' }]} />

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
          href="/free-business-audit"
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
          Get a Free Business Audit →
        </Link>
      </header>

      <div style={{ maxWidth: '920px', margin: '0 auto', padding: '0 clamp(24px, 6vw, 80px)' }}>
        {/* Content Sections */}
        {data.sections.map((section, i) => (
          <section key={i} style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontFamily: 'var(--font-editorial-new)',
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontWeight: 300,
              color: '#0F1235',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}>
              {section.title}
            </h2>
            <p style={{
              fontFamily: 'var(--font-twk-lausanne)',
              fontSize: '17px',
              fontWeight: 350,
              color: '#6B3828',
              lineHeight: 1.7,
            }}>
              {section.content}
            </p>
          </section>
        ))}

        {/* Services */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 300,
            color: '#0F1235',
            lineHeight: 1.15,
            marginBottom: '24px',
          }}>
            Services available in Dhaka
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {SERVICE_PAGES.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                style={{
                  display: 'block',
                  padding: '20px',
                  background: '#FFFDF8',
                  border: '1px solid rgba(18,22,19,0.08)',
                  borderRadius: '14px',
                  textDecoration: 'none',
                }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#0F1235',
                  marginBottom: '6px',
                }}>
                  {svc.title}
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
            Meet your Dhaka-based business consultant
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
            Start with a free strategic assessment. 30 minutes, five dimensions, no cost, no commitment.
          </p>
          <Link
            href="/free-business-audit"
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
