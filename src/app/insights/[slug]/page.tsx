import { notFound } from 'next/navigation'
import Link from 'next/link'
import { INSIGHTS } from '@/lib/constants'
import type { Metadata } from 'next'

function getArticle(slug: string) {
  return INSIGHTS.find(a => a.id === slug) ?? null
}

function getRelated(slug: string) {
  return INSIGHTS.filter(a => a.id !== slug).slice(0, 2)
}

export async function generateStaticParams() {
  return INSIGHTS.map(a => ({ slug: a.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}

  const title = article.headline.replace('\n', ' ')
  const description = article.execSummary.slice(0, 155)

  return {
    title,
    description,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://zaserandco.com/insights/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function InsightArticle({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const related = getRelated(slug)
  const publishDate = '2026-06-22'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline.replace('\n', ' '),
    description: article.execSummary,
    author: {
      '@type': 'Organization',
      name: 'Zaser & Co',
      url: 'https://zaserandco.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zaser & Co',
    },
    datePublished: publishDate,
    dateModified: publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://zaserandco.com/insights/${slug}`,
    },
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article header */}
      <header style={{
        background: '#0C0D12',
        padding: 'clamp(120px, 16vh, 200px) clamp(24px, 6vw, 80px) clamp(48px, 8vh, 80px)',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Meta */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            marginBottom: '24px',
          }}>
            <span style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#2bee4b',
              background: 'rgba(43,238,75,0.1)',
              padding: '4px 10px',
              borderRadius: '4px',
            }}>
              {article.category}
            </span>
            <span style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '11px',
              color: 'rgba(200,202,208,0.5)',
              letterSpacing: '0.08em',
            }}>
              {article.readTime}
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 300,
            color: '#E2E4E9',
            lineHeight: 1.15,
            marginBottom: '20px',
            whiteSpace: 'pre-line',
          }}>
            {article.headline}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'var(--font-editorial-new)',
            fontStyle: 'italic',
            fontSize: '18px',
            fontWeight: 300,
            color: 'rgba(200,202,208,0.6)',
            lineHeight: 1.5,
            marginBottom: '28px',
          }}>
            {article.execSummary}
          </p>

          {/* Author line */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            marginBottom: '32px',
          }}>
            <span style={{
              fontFamily: 'var(--font-twk-lausanne)',
              fontSize: '13px',
              fontWeight: 500,
              color: 'rgba(200,202,208,0.7)',
            }}>
              Zaser &amp; Co
            </span>
            <span style={{
              width: '3px', height: '3px', borderRadius: '50%',
              background: 'rgba(200,202,208,0.3)',
            }} />
            <span style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '11px',
              color: 'rgba(200,202,208,0.4)',
              letterSpacing: '0.05em',
            }}>
              {publishDate}
            </span>
          </div>

          {/* Stroke */}
          <div style={{
            width: '120px', height: '1px', margin: '0 auto',
            background: 'linear-gradient(90deg, transparent, rgba(200,202,208,0.3), transparent)',
          }} />
        </div>
      </header>

      {/* Article body */}
      <article style={{
        maxWidth: '720px', margin: '0 auto',
        padding: '64px clamp(24px, 6vw, 48px) 80px',
        background: '#F6EFE4',
      }}>
        {/* Table of contents */}
        <nav style={{
          marginBottom: '48px',
          paddingBottom: '32px',
          borderBottom: '1px solid rgba(15,18,53,0.08)',
        }}>
          <p style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '10px',
            color: 'rgba(15,18,53,0.38)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}>
            In this article
          </p>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {article.toc.map((item, i) => (
              <li key={i} style={{
                display: 'flex', alignItems: 'baseline', gap: '10px',
                fontFamily: 'var(--font-twk-lausanne)',
                fontSize: '14px',
                fontWeight: 350,
                color: '#6B3828',
                lineHeight: 1.4,
              }}>
                <span style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '10px',
                  color: 'rgba(107,56,40,0.45)',
                  flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </nav>

        {/* Section: The Problem */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(24px, 3vw, 32px)',
            fontWeight: 400,
            color: '#0F1235',
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            {article.toc[0]}
          </h2>
          <p style={{
            fontFamily: 'var(--font-twk-lausanne)',
            fontSize: '17px',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(15,18,53,0.7)',
            marginBottom: '20px',
          }}>
            {article.painPoint}
          </p>
        </section>

        {/* Section: What We've Seen (blockquote style) */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(24px, 3vw, 32px)',
            fontWeight: 400,
            color: '#0F1235',
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            {article.toc[1]}
          </h2>
          <blockquote style={{
            borderLeft: '2px solid #1a8a3e',
            paddingLeft: '24px',
            margin: '24px 0',
            fontFamily: 'var(--font-editorial-new)',
            fontStyle: 'italic',
            fontSize: '20px',
            color: '#0F1235',
            lineHeight: 1.5,
          }}>
            {article.emotionalBridge.slice(0, 200)}…
          </blockquote>
          <p style={{
            fontFamily: 'var(--font-twk-lausanne)',
            fontSize: '17px',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(15,18,53,0.7)',
            marginBottom: '20px',
          }}>
            {article.emotionalBridge}
          </p>
        </section>

        {/* Section: How we address it */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(24px, 3vw, 32px)',
            fontWeight: 400,
            color: '#0F1235',
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            {article.toc[2]}
          </h2>
          <p style={{
            fontFamily: 'var(--font-twk-lausanne)',
            fontSize: '17px',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(15,18,53,0.7)',
            marginBottom: '20px',
          }}>
            {article.solution.intro}
          </p>
          <ol style={{ paddingLeft: '24px', marginBottom: '20px' }}>
            {article.solution.steps.map((step, i) => (
              <li key={i} style={{
                fontFamily: 'var(--font-twk-lausanne)',
                fontSize: '17px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: 'rgba(15,18,53,0.7)',
                marginBottom: '8px',
              }}>
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* Case study — stat callout */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: 'var(--font-editorial-new)',
            fontSize: 'clamp(24px, 3vw, 32px)',
            fontWeight: 400,
            color: '#0F1235',
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            {article.toc[3]}
          </h2>

          <div style={{
            background: 'rgba(15,18,53,0.03)',
            borderRadius: '8px',
            padding: '32px',
            margin: '24px 0',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '36px',
              fontWeight: 500,
              color: '#0F1235',
              marginBottom: '8px',
            }}>
              {article.caseStudy.stat}
            </p>
            <p style={{
              fontFamily: 'var(--font-twk-lausanne)',
              fontSize: '14px',
              fontWeight: 300,
              color: 'rgba(15,18,53,0.5)',
            }}>
              {article.caseStudy.statLabel}
            </p>
          </div>

          <p style={{
            fontFamily: 'var(--font-twk-lausanne)',
            fontSize: '13px',
            fontWeight: 500,
            color: 'rgba(15,18,53,0.4)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}>
            {article.caseStudy.label} — {article.caseStudy.title}
          </p>
          <p style={{
            fontFamily: 'var(--font-twk-lausanne)',
            fontSize: '17px',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(15,18,53,0.7)',
          }}>
            {article.caseStudy.text}
          </p>
        </section>

        {/* Conclusion CTA */}
        <section style={{
          marginTop: '48px',
          paddingTop: '32px',
          borderTop: '1px solid rgba(15,18,53,0.08)',
        }}>
          <p style={{
            fontFamily: 'var(--font-twk-lausanne)',
            fontSize: '17px',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(15,18,53,0.7)',
            marginBottom: '24px',
          }}>
            If you want to apply this framework to your business, book a free session with Zaser &amp; Co. We&apos;ll assess your specific situation across five strategic dimensions — no cost, no commitment. Just clarity on where you stand and what comes next.
          </p>
          <Link
            href="/#contact"
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
              padding: '12px 24px',
              borderRadius: '8px',
              transition: 'opacity 0.2s',
            }}
          >
            Book your free session →
          </Link>
        </section>
      </article>

      {/* Related insights */}
      {related.length > 0 && (
        <section style={{
          background: '#F6EFE4',
          padding: '0 clamp(24px, 6vw, 80px) clamp(60px, 10vh, 120px)',
        }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{
              borderTop: '1px solid rgba(15,18,53,0.08)',
              paddingTop: '48px',
            }}>
              <p style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '11px',
                color: 'var(--z-chrome-dark, #5A5B66)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}>
                Related insights
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/insights/${r.id}`}
                    style={{
                      display: 'block',
                      background: 'rgba(15,18,53,0.025)',
                      border: '1px solid rgba(15,18,53,0.08)',
                      borderRadius: '12px',
                      padding: '24px',
                      textDecoration: 'none',
                      transition: 'border-color 0.3s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <span style={{
                        fontFamily: 'var(--font-dm-mono)',
                        fontSize: '10px',
                        fontWeight: 500,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#1a8a3e',
                        background: 'rgba(26,138,62,0.08)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                      }}>
                        {r.category}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-dm-mono)',
                        fontSize: '10px',
                        color: 'var(--z-chrome-dark, #5A5B66)',
                      }}>
                        {r.readTime}
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-editorial-new)',
                      fontSize: '18px',
                      fontWeight: 400,
                      color: '#0F1235',
                      lineHeight: 1.3,
                      marginBottom: '8px',
                      whiteSpace: 'pre-line',
                    }}>
                      {r.headline}
                    </h3>
                    <span style={{
                      fontFamily: 'var(--font-twk-lausanne)',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#1a8a3e',
                    }}>
                      Read →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
