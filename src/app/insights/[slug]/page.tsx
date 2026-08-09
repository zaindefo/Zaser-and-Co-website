import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { InsightArticleTemplate } from '../../../components/routes/InsightArticleTemplate'
import { INSIGHTS, getInsight } from '../../../content/insights'

export function generateStaticParams() { return INSIGHTS.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const insight = getInsight(slug)
  if (!insight) return {}
  return { title: insight.title, description: insight.summary, alternates: { canonical: `/insights/${slug}` }, openGraph: { title: insight.title, description: insight.summary, type: 'article', url: `/insights/${slug}`, images: [insight.image] } }
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const insight = getInsight((await params).slug)
  if (!insight) notFound()
  return <InsightArticleTemplate insight={insight} />
}
