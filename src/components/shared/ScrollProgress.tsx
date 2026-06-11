'use client'
import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = ref.current
    if (!bar) return
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      bar.style.transform = `scaleX(${Math.min(pct, 1)})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] bg-voltage origin-left"
      style={{ transform: 'scaleX(0)' }}
    />
  )
}
