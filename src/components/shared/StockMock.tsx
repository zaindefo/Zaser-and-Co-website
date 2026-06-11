'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const MOCK_SKUS = [
  { name: 'Polo Classic Navy', velocity: 23, stock: 4, status: 'critical' as const },
  { name: 'Oxford White', velocity: 12, stock: 18, status: 'good' as const },
  { name: 'Chino Khaki', velocity: 8, stock: 45, status: 'good' as const },
  { name: 'Linen Beige', velocity: 1, stock: 67, status: 'slow' as const },
  { name: 'Denim Blue', velocity: 0, stock: 89, status: 'dead' as const },
]

const STATUS_STYLES = {
  critical: { text: 'text-[var(--z-loss)]', label: 'Critical' },
  good:     { text: 'text-[var(--z-profit)]', label: 'Healthy' },
  slow:     { text: 'text-[var(--z-caution)]', label: 'Slowing' },
  dead:     { text: 'text-sage', label: 'Dead Shelf' },
}

export function StockMock() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="relative w-full max-w-md mx-auto">
      <motion.div
        className="card p-6 shadow-2xl"
        style={{ transform: 'rotate(-1deg)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sage text-xs font-body mb-0.5">StockPulse</p>
            <p className="text-obsidian-ink font-heading text-lg">Velocity Dashboard</p>
          </div>
          <span className="text-[var(--z-profit)] text-xs font-mono bg-[var(--z-profit-dim)] border border-[#6B9C7D]/20 px-2 py-1 rounded">
            LIVE
          </span>
        </div>

        <div className="space-y-1 mb-4">
          <div className="flex text-sage text-xs font-mono pb-2 border-b border-mist">
            <span className="flex-1">SKU</span>
            <span className="w-20 text-right">Vel/day</span>
            <span className="w-16 text-right">Stock</span>
          </div>
          {MOCK_SKUS.map((sku, i) => {
            const style = STATUS_STYLES[sku.status]
            return (
              <motion.div
                key={sku.name}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                className="flex items-center py-1.5 border-b border-[var(--z-border)] last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-obsidian-ink text-xs truncate">{sku.name}</p>
                  <p className={`text-xs ${style.text}`}>{style.label}</p>
                </div>
                <span className={`w-20 text-right font-mono text-xs ${style.text}`}>
                  {sku.velocity}/day
                </span>
                <span className="w-16 text-right font-mono text-xs text-sage">
                  {sku.stock}u
                </span>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="p-3 rounded-lg bg-[var(--z-loss-dim)] border border-[#C07256]/20"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
        >
          <p className="text-[var(--z-loss)] text-xs font-mono font-medium mb-1">REORDER ALERT</p>
          <p className="text-obsidian-ink text-xs leading-snug">
            Polo Classic Navy: 4 days of stock left at current velocity.
          </p>
          <p className="text-sage text-xs mt-1">Reorder 500 units &middot; Supplier message ready &rarr;</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
