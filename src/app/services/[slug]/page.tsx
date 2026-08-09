import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServicePageTemplate } from '../../../components/routes/ServicePageTemplate'
import { SERVICES, getService } from '../../../content/services'

export function generateStaticParams() { return SERVICES.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return { title: service.title, description: service.description, alternates: { canonical: `/services/${slug}` }, openGraph: { title: service.title, description: service.description, url: `/services/${slug}` } }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug)
  if (!service) notFound()
  return <ServicePageTemplate service={service} />
}
