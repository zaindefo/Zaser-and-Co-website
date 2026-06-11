'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type DividerType = 'line' | 'pulse' | 'counter' | 'grid'

function DataLine() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <div ref={ref} className="relative h-8 flex items-center justify-center">
      <motion.div
        className="absolute left-0 h-px bg-mist"
        initial={{ width: 0 }}
        animate={isInView ? { width: '100%' } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

function PulseLine() {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <div className="flex justify-center">
      <svg ref={ref} width="300" height="40" viewBox="0 0 300 40" fill="none">
        <motion.path
          d="M0 20 L100 20 L120 5 L140 35 L160 10 L180 20 L300 20"
          stroke="var(--z-accent)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </div>
  )
}

function CounterWatermark({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="relative h-24 flex items-center justify-center overflow-hidden">
      <motion.span
        className="font-mono text-[120px] font-medium text-obsidian-ink/[0.04] leading-none select-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {value}
      </motion.span>
    </div>
  )
}

function PrecisionLine() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="flex justify-center py-8">
      <motion.div
        className="precision-line w-24"
        initial={{ width: 0 }}
        animate={isInView ? { width: 96 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

export function SectionDivider({ type, value }: { type: DividerType; value?: string }) {
  switch (type) {
    case 'line': return <DataLine />
    case 'pulse': return <PulseLine />
    case 'counter': return <CounterWatermark value={value || ''} />
    case 'grid': return <PrecisionLine />
    default: return null
  }
}
