'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function Loader({ onComplete }: { onComplete: () => void }) {
  const loaderRef   = useRef<HTMLDivElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)
  const cursorRef   = useRef<HTMLDivElement>(null)
  const logoRef     = useRef<HTMLDivElement>(null)
  const taglineRef  = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const finish = () => {
      sessionStorage.setItem('zaserLoaded', 'true')
      onComplete()
    }

    if (prefersReducedMotion) {
      if (logoRef.current) gsap.set(logoRef.current, { opacity: 1, scale: 1 })
      logoRef.current?.querySelectorAll('.loader-char').forEach(el => {
        (el as HTMLElement).style.opacity = '1'
      })
      const t = setTimeout(() => {
        gsap.to(loaderRef.current, { yPercent: -100, duration: 0.3, onComplete: finish })
      }, 500)
      return () => clearTimeout(t)
    }

    const tl = gsap.timeline({ onComplete: finish })

    // Phase 1 — horizontal chrome line draws left → right
    tl.fromTo(lineRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.4, ease: 'none' },
      0.2
    )
    // Phase 2 — cursor appears at right end of line
    .fromTo(cursorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.01 }, 0.58)
    // Phase 3 — Z lettermark fades in + scales up
    .fromTo(logoRef.current,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
      0.7
    )
    // Cursor hides as logo appears
    .to(cursorRef.current, { opacity: 0, duration: 0.1 }, 0.7)
    // Phase 4 — "ASER & CO" types character by character
    .fromTo(logoRef.current!.querySelectorAll('.loader-char'),
      { opacity: 0 },
      { opacity: 1, stagger: 0.07, duration: 0.01, ease: 'none' },
      0.9
    )
    // Phase 5 — tagline fades in
    .fromTo(taglineRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power1.out' },
      1.42
    )
    // Phase 6 — progress bar fills left → right
    .fromTo(progressRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.4, ease: 'power1.inOut' },
      1.75
    )
    // Phase 7 — loader panel slides upward out of viewport
    .to(loaderRef.current,
      { yPercent: -100, duration: 0.6, ease: 'power3.inOut' },
      2.2
    )

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#050507',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Horizontal chrome line — full width at vertical centre */}
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          top: '50%', left: 0, right: 0, height: '0.5px',
          background: 'rgba(200,210,200,0.4)',
          transform: 'scaleX(0)',
          transformOrigin: 'left center',
        }}
      />

      {/* Cursor blink — right end of line */}
      <div
        ref={cursorRef}
        style={{
          position: 'absolute',
          top: 'calc(50% - 7px)', right: '0',
          width: '2px', height: '14px',
          background: 'rgba(200,210,200,0.75)',
          opacity: 0,
        }}
      />

      {/* Wordmark — Z visible on logoRef fade; chars typed via GSAP stagger */}
      <div
        ref={logoRef}
        style={{
          opacity: 0,
          position: 'relative', zIndex: 1,
          fontFamily: 'var(--font-twk-lausanne)',
          fontWeight: 800,
          fontSize: '28px',
          letterSpacing: '0.25em',
          color: '#fafffa',
          userSelect: 'none',
        }}
      >
        <span>Z</span>
        {'ASER & CO'.split('').map((char, i) => (
          <span key={i} className="loader-char" style={{ opacity: 0, display: 'inline-block' }}>
            {char}
          </span>
        ))}
      </div>

      {/* Tagline below wordmark */}
      <div
        ref={taglineRef}
        style={{
          position: 'absolute',
          top: 'calc(50% + 40px)',
          fontFamily: 'var(--font-editorial-new)',
          fontStyle: 'italic',
          fontSize: '14px',
          color: 'rgba(200,210,200,0.55)',
          letterSpacing: '0.05em',
          opacity: 0,
        }}
      >
        Strategic &amp; Management Consultancy
      </div>

      {/* Progress bar — bottom of screen, fills with voltage green */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
          background: 'rgba(200,210,200,0.08)',
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: '100%',
            background: 'var(--color-voltage)',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />
      </div>
    </div>
  )
}
