'use client'
import { motion } from 'framer-motion'

interface HeadlineRevealProps {
  lines: string[]
  className?: string
  lineClassName?: string
  staggerDelay?: number
  duration?: number
  as?: 'h1' | 'h2' | 'h3' | 'p'
  style?: React.CSSProperties
  lineStyle?: React.CSSProperties
}

const containerVariants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: { staggerChildren: staggerDelay },
  }),
}

const lineVariants = {
  hidden: { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
  visible: (duration: number) => ({
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function HeadlineReveal({
  lines,
  className,
  lineClassName,
  staggerDelay = 0.12,
  duration = 0.7,
  as: Tag = 'h2',
  style,
  lineStyle,
}: HeadlineRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={staggerDelay}
      variants={containerVariants}
      className={className}
      style={style}
    >
      {lines.map((line, i) => (
        <Tag key={i} style={{ margin: 0, ...lineStyle }}>
          <motion.span
            className={lineClassName}
            custom={duration}
            variants={lineVariants}
            style={{ display: 'block', willChange: 'transform, opacity' }}
          >
            {line}
          </motion.span>
        </Tag>
      ))}
    </motion.div>
  )
}
