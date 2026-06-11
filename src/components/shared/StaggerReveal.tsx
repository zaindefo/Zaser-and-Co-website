'use client'
import React, { Children } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useState, useEffect, forwardRef } from 'react'

interface StaggerRevealProps {
  children: React.ReactNode
  stagger?: number
  mobileStagger?: number
  duration?: number
  className?: string
  as?: 'div' | 'ul'
}

const ease = [0.22, 1, 0.36, 1] as const

export function StaggerReveal({
  children,
  stagger = 0.06,
  mobileStagger = 0.12,
  duration = 0.3,
  className,
  as: Tag = 'div',
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement | HTMLUListElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const activeStagger = isMobile ? mobileStagger : stagger
  const items = Children.toArray(children)

  return (
    <Tag ref={ref as any} className={className}>
      {items.map((child, i) => (
        <motion.div
          key={i}
          data-stagger-index={i}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 12 }
          }
          transition={{
            duration: prefersReducedMotion ? 0 : duration,
            delay: prefersReducedMotion ? 0 : i * activeStagger,
            ease,
          }}
        >
          {child}
        </motion.div>
      ))}
    </Tag>
  )
}
