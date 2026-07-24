'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const BASE_BE = 682000

export function ScenarioSlider() {
  const [revenue, setRevenue] = useState(800000)
  const progress = Math.min((revenue / BASE_BE) * 100, 100)
  const profit = Math.max(revenue - BASE_BE, 0)
  const loss = Math.max(BASE_BE - revenue, 0)
  const isProfitable = revenue >= BASE_BE

  return (
    <div className="card p-8 max-w-2xl mx-auto">
      <h3 className="font-heading text-xl text-obsidian-ink mb-2">Interactive Revenue Simulator</h3>
      <p className="text-obsidian-ink text-sm mb-6 font-body">Drag to simulate revenue. See your Profit Pulse change.</p>

      <div className="mb-6">
        <div className="flex justify-between text-xs text-sage font-mono mb-2">
          <span>৳2,00,000</span>
          <span>৳15,00,000</span>
        </div>
        <input
          type="range"
          min={200000}
          max={1500000}
          step={10000}
          value={revenue}
          onChange={(e) => setRevenue(Number(e.target.value))}
          className="w-full cursor-pointer accent-voltage"
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-obsidian-ink text-xs mb-1">Monthly revenue</p>
          <p className="font-mono text-2xl font-medium text-obsidian-ink">৳{revenue.toLocaleString('en-IN')}</p>
        </div>
        <div>
          <p className="text-obsidian-ink text-xs mb-1">Break-even</p>
          <p className="font-mono text-2xl font-medium text-sage">৳{BASE_BE.toLocaleString('en-IN')}</p>
        </div>
      </div>

      <div className="h-3 bg-mist/40 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: isProfitable ? 'var(--z-profit)' : 'var(--z-loss)' }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className={`p-4 rounded-lg border ${
        isProfitable
          ? 'bg-[var(--z-profit-dim)] border-[#6B9C7D]/30'
          : 'bg-[var(--z-loss-dim)] border-[#C07256]/30'
      }`}>
        {isProfitable ? (
          <p className="font-mono text-sm" style={{ color: 'var(--z-profit)' }}>
            Profitable! Real profit: ৳{profit.toLocaleString('en-IN')} / month
          </p>
        ) : (
          <p className="font-mono text-sm" style={{ color: 'var(--z-loss)' }}>
            ৳{loss.toLocaleString('en-IN')} short of break-even. Still in loss territory.
          </p>
        )}
      </div>
    </div>
  )
}
