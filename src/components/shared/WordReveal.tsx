'use client'
import { motion } from 'framer-motion'

interface WordRevealProps {
  text: string
  baseDelay?: number
  className?: string
}

export function WordReveal({ text, baseDelay = 0, className }: WordRevealProps) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.5,
              delay: baseDelay + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}
