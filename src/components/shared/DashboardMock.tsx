'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const BREAK_EVEN = 682000
const TARGET_PROGRESS = 73

export function DashboardMock() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })
  const [progress, setProgress] = useState(0)
  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const startTime = Date.now()
    const duration = 2200
    let animId: number
    const tick = () => {
      const elapsed = Date.now() - startTime
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const currentProgress = Math.round(eased * TARGET_PROGRESS)
      setProgress(currentProgress)
      setRevenue(Math.round((currentProgress / 100) * BREAK_EVEN))
      if (p < 1) animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [isInView])

  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      <motion.div
        className="card p-6 shadow-2xl"
        style={{ transform: 'rotate(1deg)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sage text-xs font-body mb-0.5">BreakPoint</p>
            <p className="text-obsidian-ink font-heading text-lg">June 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-[var(--z-profit)]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[var(--z-profit)] text-xs font-mono">LIVE</span>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div className="relative w-32 h-32 flex-shrink-0">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="54" fill="none" stroke="var(--z-border)" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="54" fill="none"
                stroke="var(--z-accent)" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 0.05s linear' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-2xl font-medium text-obsidian-ink">{progress}%</span>
              <span className="text-sage text-xs">to profit</span>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <p className="text-sage text-xs mb-0.5">Revenue this month</p>
              <p className="font-mono text-voltage text-lg font-medium">
                ৳{revenue.toLocaleString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-sage text-xs mb-0.5">Break-even target</p>
              <p className="font-mono text-sage text-sm">৳{BREAK_EVEN.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--z-profit-dim)] border border-[#6B9C7D]/20 mb-4">
          <motion.div
            className="w-3 h-3 rounded-full bg-[var(--z-profit)] flex-shrink-0"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <div>
            <p className="text-[var(--z-profit)] text-xs font-mono font-medium">PROFIT PULSE</p>
            <p className="text-obsidian-ink text-xs mt-0.5">On track &middot; Zero Day target: 17th</p>
          </div>
        </div>

        <div className="flex items-end gap-1 h-12">
          {[45, 62, 58, 71, 68, 73, 70].map((v, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm"
              style={{ backgroundColor: i === 6 ? 'var(--z-accent)' : 'var(--z-border)' }}
              initial={{ height: 0 }}
              animate={isInView ? { height: `${v}%` } : { height: 0 }}
              transition={{ delay: i * 0.06 + 0.5, duration: 0.3 }}
            />
          ))}
        </div>
        <p className="text-sage text-xs font-mono mt-1">7-day revenue trend</p>
      </motion.div>

      <motion.div
        className="absolute -right-3 top-1/3 bg-linen border border-obsidian-ink/20 rounded-xl p-3 shadow-2xl w-52 z-10"
        initial={{ x: 60, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ delay: 2.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-sage text-xs mb-1">WhatsApp &middot; Just now</p>
        <p className="text-obsidian-ink text-xs font-medium leading-snug">
          Zero Day crossed. Everything from here is profit.
        </p>
      </motion.div>
    </div>
  )
}
