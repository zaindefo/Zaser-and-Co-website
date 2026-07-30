'use client'
import { Children, isValidElement, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface StackingPanelsProps {
  children: React.ReactNode
}

/**
 * Scroll-pinned stacking panels.
 *
 * Each child becomes a sticky "card". As you scroll, the next card slides up and
 * covers the current one, which recedes (scale 0.93 / radius 20px / opacity 0.6).
 * Everything is bound to scroll position via `scrub`, so scrolling back up
 * reverses the whole sequence — no extra code needed for the rewind.
 *
 * Panels taller than the viewport scroll their content through first and only
 * stick once their bottom edge reaches the viewport bottom, so nothing is cropped.
 */
export function StackingPanels({ children }: StackingPanelsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    ScrollTrigger.config({ limitCallbacks: true })

    const mm = gsap.matchMedia()

    // Desktop only — sticky stacking is unreliable on iOS Safari and reads poorly
    // on small screens, so mobile falls back to the plain document flow.
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('.stack-panel', wrapper)

      // Sticky offset + transform origin both depend on measured panel height,
      // so they are recomputed whenever the viewport changes.
      const layout = () => {
        const vh = window.innerHeight
        panels.forEach((panel) => {
          const inner = panel.querySelector<HTMLElement>('.stack-panel-inner')
          if (!inner) return
          const h = inner.offsetHeight

          panel.style.top = h > vh ? `${vh - h}px` : '0px'

          // Recede from the centre of whichever part of the panel is actually
          // on screen when it gets covered — the bottom viewport for tall panels.
          inner.style.transformOrigin = h > vh ? `50% ${h - vh / 2}px` : '50% 50%'
        })
        ScrollTrigger.refresh()
      }

      layout()
      window.addEventListener('resize', layout, { passive: true })

      panels.forEach((panel, i) => {
        const next = panels[i + 1]
        if (!next) return
        const inner = panel.querySelector<HTMLElement>('.stack-panel-inner')
        if (!inner) return

        gsap.fromTo(inner,
          { scale: 1, borderRadius: 0, opacity: 1 },
          {
            scale: 0.93,
            borderRadius: 20,
            opacity: 0.6,
            ease: 'none',
            scrollTrigger: {
              trigger: next,
              start: 'top bottom',
              end: 'top top',
              scrub: 1,
            },
          },
        )
      })

      return () => {
        window.removeEventListener('resize', layout)
        panels.forEach((panel) => {
          panel.style.top = ''
          const inner = panel.querySelector<HTMLElement>('.stack-panel-inner')
          if (inner) inner.style.transformOrigin = ''
        })
      }
    })

    return () => mm.revert()
  }, [])

  const items = Children.toArray(children).filter(isValidElement)

  return (
    <div ref={wrapperRef} className="stack-wrapper">
      {items.map((child, i) => (
        <div key={i} className="stack-panel" style={{ zIndex: i + 1 }}>
          <div className="stack-panel-inner">{child}</div>
        </div>
      ))}
    </div>
  )
}
