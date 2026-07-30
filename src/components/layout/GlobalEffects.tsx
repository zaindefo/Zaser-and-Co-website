'use client'
import { useEffect } from 'react'
import { useSmoothScroll } from '@/lib/lenis'
import { CustomCursor } from '@/components/shared/CustomCursor'
import { ScrollProgress } from '@/components/shared/ScrollProgress'
import { EasterEggs } from '@/components/shared/EasterEggs'
import { gsap, ScrollTrigger } from '@/lib/gsap'

function useSectionAnimations() {
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const sections = document.querySelectorAll<HTMLElement>('main > section')

      sections.forEach((section) => {
        if (section.hasAttribute('data-no-clip')) return

        gsap.fromTo(section,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              once: true,
            },
          },
        )
      })

      const parallaxEls = document.querySelectorAll<HTMLElement>('[data-parallax]')
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '60')
        gsap.fromTo(el,
          { y: -speed },
          {
            y: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section') || el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      document.querySelectorAll<HTMLElement>('.accent-tick').forEach((tick) => {
        gsap.fromTo(tick,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: tick, start: 'top 90%', once: true },
          },
        )
      })
    })

    return () => {
      mm.revert()
    }
  }, [])
}

export function GlobalEffects() {
  useSmoothScroll()
  useSectionAnimations()

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <EasterEggs />
    </>
  )
}
