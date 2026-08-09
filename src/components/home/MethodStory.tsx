'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArtifactVisual } from '../editorial/ArtifactVisual'

const LANES = {
  ai: {
    label: 'AI Audit & Implementation',
    stages: [
      { label: 'Assess', title: 'Read the business before choosing the technology.', body: 'Strategy, Data, Technology, People, and Governance reveal where AI can create credible value.', type: 'scorecard' as const },
      { label: 'Prioritise', title: 'Compare impact with feasibility.', body: 'The best-looking idea is not automatically the right first implementation. Opportunity is ranked before budget is committed.', type: 'matrix' as const },
      { label: 'Build', title: 'Make one system work inside the operation.', body: 'The highest-value use case becomes a practical workflow connected to the way the team already works.', type: 'system' as const },
      { label: 'Hand over', title: 'Leave ownership with the team.', body: 'Documentation, operating instructions, and training make the implementation usable after the engagement ends.', type: 'roadmap' as const },
    ],
  },
  operations: {
    label: 'Management & Operations',
    stages: [
      { label: 'Diagnose', title: 'See cost, flow, and margin as one system.', body: 'The diagnostic connects financial structure to the actual movement of work through the operation.', type: 'diagnostic' as const },
      { label: 'Map', title: 'Make the hidden structure visible.', body: 'Fixed, variable, and semi-variable costs are mapped alongside process steps and ownership.', type: 'cost-map' as const },
      { label: 'Prioritise', title: 'Separate consequential change from noise.', body: 'Pricing, waste, delay, and allocation opportunities are ranked by their effect on operating performance.', type: 'matrix' as const },
      { label: 'Roadmap', title: 'Sequence the next 90 days.', body: 'Quick wins, medium-term fixes, and strategic changes receive an owner, a measure, and a deadline.', type: 'roadmap' as const },
    ],
  },
}

export function MethodStory() {
  const ref = useRef<HTMLElement>(null)
  const [lane, setLane] = useState<keyof typeof LANES>('ai')
  const [active, setActive] = useState(0)
  const stages = useMemo(() => LANES[lane].stages, [lane])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const update = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const travel = Math.max(ref.current.offsetHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(-rect.top / travel, 0), .999)
      setActive(Math.floor(progress * stages.length))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [stages.length])

  const stage = stages[active]

  return (
    <section ref={ref} className="method-story" data-nav-theme="dark">
      <div className="method-story__sticky">
        <div className="method-story__top">
          <span className="eyebrow eyebrow--light">[ How we work ]</span>
          <div className="lane-switch" aria-label="Select method lane">
            {(Object.keys(LANES) as Array<keyof typeof LANES>).map((key) => (
              <button key={key} type="button" aria-pressed={lane === key} onClick={() => { setLane(key); setActive(0) }}>
                {LANES[key].label}
              </button>
            ))}
          </div>
        </div>
        <div className="method-story__content">
          <div className="method-story__copy" aria-live="polite">
            <span className="method-story__count">{String(active + 1).padStart(2, '0')} / 04</span>
            <h2 className="display display--md">{stage.label}</h2>
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
          </div>
          <ArtifactVisual key={`${lane}-${active}`} type={stage.type} label={`${stage.label}: ${stage.title}`} dark />
        </div>
        <ol className="method-story__rail">
          {stages.map((item, index) => <li key={item.label} className={index === active ? 'is-active' : ''}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</li>)}
        </ol>
      </div>
    </section>
  )
}
