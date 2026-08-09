'use client'

import { useEffect, useRef } from 'react'

export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      ref.current?.style.setProperty('--reading-progress', String(progress))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <div ref={ref} className="reading-progress" aria-hidden="true" />
}
