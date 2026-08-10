import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { IndustryPageTemplate } from '../../../components/routes/IndustryPageTemplate'
import { INDUSTRIES, getIndustry } from '../../../content/industries'

export function generateStaticParams() { return INDUSTRIES.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) return {}
  return {
    title: industry.title,
    description: industry.metaDescription,
    alternates: { canonical: `/industries/${slug}` },
    openGraph: {
      title: industry.title,
      description: industry.metaDescription,
      url: `/industries/${slug}`,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${industry.title} | Zaser & Co` }],
    },
  }
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const industry = getIndustry((await params).slug)
  if (!industry) notFound()
  return <IndustryPageTemplate industry={industry} />
}
