import { notFound } from 'next/navigation'
import { SERVICE_PAGES } from '@/lib/constants'
import { ServicePageTemplate } from '@/components/seo/ServicePageTemplate'
import type { Metadata } from 'next'

function getService(slug: string) {
  return SERVICE_PAGES.find((s) => s.slug === slug) ?? null
}

export async function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}

  return {
    title: service.seoTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.seoTitle} | Zaser & Co`,
      description: service.metaDescription,
      type: 'website',
      url: `https://zaserandco.com/services/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.seoTitle} | Zaser & Co`,
      description: service.metaDescription,
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  return <ServicePageTemplate data={service} />
}
