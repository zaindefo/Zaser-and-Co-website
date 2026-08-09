import Image from 'next/image'
import Link from 'next/link'
import type { Insight } from '../../content/types'
import { ArtifactVisual } from '../editorial/ArtifactVisual'

export function InsightArticleTemplate({ insight }: { insight: Insight }) {
  return (
    <main>
      <article>
        <header className="article-hero" data-nav-theme="light"><div className="article-hero__meta"><span>{insight.category}</span><span>{insight.readTime}</span></div><h1>{insight.title}</h1><p>{insight.summary}</p><div className="article-hero__image"><Image src={insight.image} alt="" fill priority sizes="100vw" /></div></header>
        <div className="article-layout section section--white" data-nav-theme="light">
          <aside><span>In this article</span>{insight.chapters.map((chapter, index) => <a key={chapter.title} href={`#chapter-${index + 1}`}>{String(index + 1).padStart(2, '0')} {chapter.title}</a>)}</aside>
          <div className="article-body">{insight.chapters.map((chapter, index) => <section id={`chapter-${index + 1}`} key={chapter.title}><span className="eyebrow">Chapter {String(index + 1).padStart(2, '0')}</span><h2>{chapter.title}</h2>{chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{chapter.points && <ul>{chapter.points.map((point) => <li key={point}>{point}</li>)}</ul>}</section>)}</div>
        </div>
        <section className="worked-example section section--paper" data-nav-theme="light"><div><span className="eyebrow">Method demonstration</span><h2>{insight.example.title}</h2><p>{insight.example.description}</p><div className="example-labels">{insight.example.labels.map((label) => <span key={label}>{label}</span>)}</div></div><ArtifactVisual type={insight.slug === 'revenue-trap' ? 'cost-map' : insight.slug === 'silent-bleed' ? 'process' : 'matrix'} label={insight.example.title} /></section>
        <section className="article-next section section--navy" data-nav-theme="dark"><span className="eyebrow eyebrow--light">Continue the conversation</span><h2 className="display display--lg">Insight matters when it changes a <span className="authority">decision.</span></h2><Link className="button button--paper" href="/contact"><span>Talk to Zaser</span><span aria-hidden="true">↗</span></Link></section>
      </article>
    </main>
  )
}
