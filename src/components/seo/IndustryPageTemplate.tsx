import Link from 'next/link'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { SERVICE_PAGES, INDUSTRY_PAGES } from '@/lib/constants'

type IndustryPage = (typeof INDUSTRY_PAGES)[number]

export function IndustryPageTemplate({ data }: { data: IndustryPage }) {
  return (
    <main style={{ background: '#F6EFE4', minHeight: '100vh' }}>
      {/* Hero */}
      <header style={{
        padding: 'clamp(120px, 16vh, 200px) clamp(24px, 6vw, 80px) clamp(48px, 8vh, 80px)',
        maxWidth: '920px',
        margin: '0 auto',
      }}>
        <Breadcrumbs items={[
          { label: 'Industries', href: '/#services' },
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
        {/* Stats */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {data.stats.map((stat, i) => (
              <div key={i} style={{
                padding: '24px',
                background: '#FFFDF8',
                border: '1px solid rgba(18,22,19,0.08)',
                borderRadius: '14px',
                textAlign: 'center',
              }}>
                <p style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '28px',
                  fontWeight: 500,
                  color: '#0F1235',
                  marginBottom: '6px',
                }}>
                  {stat.figure}
                </p>
                <p style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontSize: '13px',
                  fontWeight: 350,
                  color: '#6B3828',
                  lineHeight: 1.4,
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 300,
            color: '#0F1235',
            lineHeight: 1.15,
            marginBottom: '24px',
          }}>
            Challenges we solve for {data.title.toLowerCase()}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.challenges.map((challenge, i) => (
              <div key={i} style={{
                padding: '24px',
                background: '#FFFDF8',
                border: '1px solid rgba(18,22,19,0.08)',
                borderRadius: '14px',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#0F1235',
                  marginBottom: '8px',
                }}>
                  {challenge.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontSize: '15px',
                  fontWeight: 350,
                  color: '#6B3828',
                  lineHeight: 1.65,
                }}>
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Relevant Services */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 300,
            color: '#0F1235',
            lineHeight: 1.15,
            marginBottom: '24px',
          }}>
            How we help {data.title.toLowerCase()}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {data.services.map((slug) => {
              const svc = SERVICE_PAGES.find((s) => s.slug === slug)
              if (!svc) return null
              return (
                <Link
                  key={slug}
                  href={`/services/${slug}`}
                  style={{
                    display: 'block',
                    padding: '24px',
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
                    marginBottom: '8px',
                  }}>
                    {svc.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-twk-lausanne)',
                    fontSize: '14px',
                    fontWeight: 350,
                    color: '#6B3828',
                    lineHeight: 1.55,
                    marginBottom: '10px',
                  }}>
                    {svc.heroSubtitle.slice(0, 120)}…
                  </p>
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
            Ready to grow your {data.title.toLowerCase().replace(' businesses', ' business')}?
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
            Book a free business audit — 30 minutes, five dimensions, no cost, no commitment.
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
            Get a Free Business Audit →
          </Link>
        </section>
      </div>
    </main>
  )
}
