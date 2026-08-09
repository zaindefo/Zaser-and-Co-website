'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { getHeroNavTheme } from '../../lib/hero-motion'

export function CinematicHero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(max-width: 900px)').matches) return

    const frame = root.querySelector<HTMLElement>('.cinematic-hero__frame')
    const stage = root.querySelector<HTMLElement>('.cinematic-hero__stage')
    const view = root.querySelector<HTMLElement>('.cinematic-hero__view')
    const restoreStaticThemes = () => {
      if (frame) delete frame.dataset.navTheme
      if (stage) stage.dataset.navTheme = 'light'
      if (view) view.dataset.navTheme = 'dark'
      window.dispatchEvent(new Event('zaser:nav-theme-change'))
    }

    let cancelled = false
    let cleanup = () => {}
    root.dataset.motion = 'ready'
    if (frame) frame.dataset.navTheme = 'light'
    if (stage) delete stage.dataset.navTheme
    if (view) delete view.dataset.navTheme

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, scrollModule]) => {
      if (cancelled) return
      const gsap = gsapModule.gsap
      const ScrollTrigger = scrollModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      const context = gsap.context(() => {
        const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } })
        entrance
          .from('.cinematic-hero__eyebrow', { y: 14, autoAlpha: 0, duration: .55 })
          .from('.cinematic-hero__line', { yPercent: 110, rotate: 1.5, duration: .9, stagger: .09 }, '-=.28')
          .from('.hero-artifact', { scale: .82, rotate: 4, autoAlpha: 0, duration: .8, stagger: .08 }, '-=.52')

        gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.15,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!frame) return
              const theme = getHeroNavTheme(self.progress)
              if (frame.dataset.navTheme === theme) return
              frame.dataset.navTheme = theme
              window.dispatchEvent(new Event('zaser:nav-theme-change'))
            },
          },
        })
          .to('.hero-artifact--brief', { xPercent: 78, yPercent: 62, rotate: 7, scale: 1.06, duration: 1 }, 0)
          .to('.hero-artifact--matrix', { xPercent: -88, yPercent: -42, rotate: -5, scale: 1.05, duration: 1 }, 0)
          .to('.hero-artifact--lens', { xPercent: -118, yPercent: 42, rotate: 4, duration: 1 }, 0)
          .to('.hero-artifact--route', { strokeDashoffset: 0, duration: .9 }, .05)
          .to('.cinematic-hero__support', { y: 22, autoAlpha: 0, duration: .18 }, .08)
          .to('.cinematic-hero__headline', { scale: .76, yPercent: -9, duration: .7 }, .65)
          .to('.cinematic-hero__line--one', { xPercent: -7, duration: .55 }, .72)
          .to('.cinematic-hero__line--three', { xPercent: 8, duration: .55 }, .72)
          .to('.hero-artifact', { scale: .72, autoAlpha: 0, duration: .34 }, .9)
          .to('.cinematic-hero__headline', { yPercent: -58, scale: .48, autoAlpha: .12, duration: .5 }, 1.05)
          .fromTo('.cinematic-hero__view', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: .75 }, 1.02)
          .from('.cinematic-hero__view-copy > *', { y: 38, autoAlpha: 0, stagger: .08, duration: .42 }, 1.34)
          .from('.cinematic-hero__view-rail span', { x: -24, autoAlpha: 0, stagger: .07, duration: .36 }, 1.42)
      }, root)

      cleanup = () => {
        context.revert()
        restoreStaticThemes()
      }
    }).catch(() => {
      delete root.dataset.motion
      restoreStaticThemes()
    })

    return () => {
      cancelled = true
      cleanup()
      delete root.dataset.motion
    }
  }, [])

  return (
    <section ref={rootRef} className="cinematic-hero" aria-labelledby="cinematic-hero-title">
      <div className="cinematic-hero__frame">
        <div className="cinematic-hero__grid" aria-hidden="true" />

        <div className="cinematic-hero__eyebrow">
          <span>Strategic &amp; management consultancy</span>
          <span>Dhaka / Bangladesh</span>
        </div>

        <div className="cinematic-hero__stage" data-nav-theme="light">
          <svg className="hero-artifact hero-artifact--route" role="img" aria-label="Strategic diagnostic map" viewBox="0 0 900 420">
            <path className="hero-route__ghost" d="M34 314C172 304 187 100 360 132S541 372 690 260 762 86 864 64" />
            <path className="hero-route__active" pathLength="1" d="M34 314C172 304 187 100 360 132S541 372 690 260 762 86 864 64" />
            <g className="hero-route__nodes">
              <circle cx="34" cy="314" r="7" /><circle cx="360" cy="132" r="7" /><circle cx="690" cy="260" r="7" /><circle cx="864" cy="64" r="7" />
            </g>
          </svg>

          <div className="cinematic-hero__headline-wrap">
            <h1 id="cinematic-hero-title" className="cinematic-hero__headline">
              <span className="cinematic-hero__line-mask"><span className="cinematic-hero__line cinematic-hero__line--one">Your business</span></span>
              <span className="cinematic-hero__line-mask"><span className="cinematic-hero__line cinematic-hero__line--two">deserves a</span></span>
              <span className="cinematic-hero__line-mask"><span className="cinematic-hero__line cinematic-hero__line--three">sharper strategy.</span></span>
            </h1>
          </div>

          <div className="hero-artifact hero-artifact--brief" role="img" aria-label="Strategy brief covering four diagnostic dimensions">
            <span className="hero-artifact__index">01 / Diagnostic brief</span>
            <strong>Read the whole<br />operation.</strong>
            <div className="hero-artifact__tags"><span>Strategy</span><span>Data</span><span>Operations</span><span>People</span></div>
          </div>

          <div className="hero-artifact hero-artifact--matrix" role="img" aria-label="Opportunity matrix">
            <span className="hero-artifact__index">02 / Opportunity matrix</span>
            <div className="hero-matrix">
              <i /><i /><i /><i /><i /><i /><i /><i /><i />
              <b className="hero-matrix__mark hero-matrix__mark--one" /><b className="hero-matrix__mark hero-matrix__mark--two" /><b className="hero-matrix__mark hero-matrix__mark--three" />
            </div>
            <span className="hero-artifact__axis">Impact →</span>
          </div>

          <div className="hero-artifact hero-artifact--lens" role="img" aria-label="Profitability lens">
            <span className="hero-artifact__index">03 / Profitability lens</span>
            <div><span>Revenue</span><span>Cost</span><span>Flow</span><span>Margin</span></div>
          </div>

          <div className="cinematic-hero__support">
            <p>Zaser &amp; Co builds financial clarity, operational intelligence, and practical AI systems around the business you actually run.</p>
            <div className="cinematic-hero__actions">
              <Link className="button button--rust" href="/contact"><span>Request your free session</span><span aria-hidden="true">↗</span></Link>
              <a className="text-link" href="#services">See how it works <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </div>

        <div className="cinematic-hero__view" data-nav-theme="dark">
          <div className="cinematic-hero__view-signal" aria-hidden="true"><span /><span /><span /></div>
          <div className="cinematic-hero__view-copy">
            <span className="eyebrow">[ The Zaser view ]</span>
            <h2 className="display display--xl">Growth should translate into <span className="authority">performance.</span></h2>
            <p>More revenue does not automatically create a stronger operation. More tools do not automatically create a smarter one. We find the gaps between strategy, systems, and execution.</p>
          </div>
          <div className="cinematic-hero__view-rail" aria-label="Zaser diagnostic focus">
            <span>Strategy</span><span>Systems</span><span>Execution</span><span>Ownership</span>
          </div>
        </div>
      </div>
    </section>
  )
}
