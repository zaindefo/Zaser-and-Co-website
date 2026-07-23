'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&'

export function TextScramble({
  children,
  className,
  style,
  duration = 900,
}: {
  children: string
  className?: string
  style?: React.CSSProperties
  duration?: number
}) {
  const [display, setDisplay] = useState(children)
  const ref = useRef<HTMLSpanElement>(null)
  const hasRun = useRef(false)

  const scramble = useCallback(() => {
    if (hasRun.current) return
    hasRun.current = true

    const target = children
    const len = target.length
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const resolvedCount = Math.floor(progress * len * 1.15)

      const output = target
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < resolvedCount || progress >= 1) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setDisplay(output)
      if (progress < 1) requestAnimationFrame(tick)
      else setDisplay(target)
    }

    setDisplay(
      target
        .split('')
        .map((c) => (c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join(''),
    )
    requestAnimationFrame(tick)
  }, [children, duration])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scramble()
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [scramble])

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  )
}
