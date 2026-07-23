import { notFound } from 'next/navigation'
import { INDUSTRY_PAGES } from '@/lib/constants'
import { IndustryPageTemplate } from '@/components/seo/IndustryPageTemplate'
import type { Metadata } from 'next'

function getIndustry(slug: string) {
  return INDUSTRY_PAGES.find((i) => i.slug === slug) ?? null
}

export async function generateStaticParams() {
  return INDUSTRY_PAGES.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) return {}

  return {
    title: industry.seoTitle,
    description: industry.metaDescription,
    alternates: { canonical: `/industries/${slug}` },
    openGraph: {
      title: `${industry.seoTitle} | Zaser & Co`,
      description: industry.metaDescription,
      type: 'website',
      url: `https://zaserandco.com/industries/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${industry.seoTitle} | Zaser & Co`,
      description: industry.metaDescription,
    },
  }
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) notFound()

  return <IndustryPageTemplate data={industry} />
}
