'use client'
import { motion } from 'framer-motion'

type Direction = 'up' | 'fade' | 'left' | 'right' | 'scaleUp'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: Direction
  duration?: number
}

function getInitial(direction: Direction) {
  switch (direction) {
    case 'up': return { opacity: 0, y: 24 }
    case 'left': return { opacity: 0, x: -32 }
    case 'right': return { opacity: 0, x: 32 }
    case 'scaleUp': return { opacity: 0, scale: 0.92 }
    case 'fade': default: return { opacity: 0 }
  }
}

export function ScrollReveal({ children, delay = 0, className, direction = 'up', duration = 0.6 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={getInitial(direction)}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
