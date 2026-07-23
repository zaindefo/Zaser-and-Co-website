'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    setVisible(true)

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' })

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    // Use event delegation so dynamically added elements are covered
    const isInteractive = (el: Element | null): boolean => {
      if (!el) return false
      const tag = el.tagName
      if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return true
      if (el.getAttribute('role') === 'button') return true
      if (el.closest('a, button, [role="button"], input, select, textarea')) return true
      return false
    }

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) setHovering(true)
    }
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) setHovering(false)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          width: hovering ? 4 : 8,
          height: hovering ? 4 : 8,
          borderRadius: '50%',
          backgroundColor: '#0F1235',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: hovering ? 64 : 40,
          height: hovering ? 64 : 40,
          borderRadius: '50%',
          border: '1px solid rgba(196,134,106,0.4)',
          backgroundColor: hovering ? 'rgba(196,134,106,0.1)' : 'transparent',
          transition: 'width 0.3s, height 0.3s, background-color 0.3s',
        }}
      />
      <style jsx global>{`
        @media (hover: hover) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  )
}
