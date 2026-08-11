'use client'

import { useEffect, useRef, useState } from 'react'
import { EngagementCanvas } from './EngagementCanvas'
import { ENGAGEMENT_SERVICES, ENGAGEMENT_STAGES } from './stages'
import { MobileStageRail } from './MobileStageRail'
import { useEngagementRailMotion } from './useEngagementRailMotion'

type RailMode = 'desktop' | 'mobile' | 'reduced'

export function EngagementRail() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [railMode, setRailMode] = useState<RailMode>('reduced')
  const rootRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const mobileRailRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLElement | null>>([])
  const activeStage = ENGAGEMENT_STAGES[activeIndex]
  const activeService = ENGAGEMENT_SERVICES.find(({ id }) => id === activeStage.service) ?? ENGAGEMENT_SERVICES[0]

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 900px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMode = () => setRailMode(reduced.matches ? 'reduced' : mobile.matches ? 'mobile' : 'desktop')
    syncMode()
    mobile.addEventListener('change', syncMode)
    reduced.addEventListener('change', syncMode)
    return () => {
      mobile.removeEventListener('change', syncMode)
      reduced.removeEventListener('change', syncMode)
    }
  }, [])

  const { jumpToDesktopStage } = useEngagementRailMotion({
    enabled: railMode === 'desktop',
    rootRef,
    pinRef,
    svgRef,
    onStageChange: setActiveIndex,
  })

  const jumpToStage = (index: number) => {
    if (railMode === 'desktop' && jumpToDesktopStage(index)) return
    setActiveIndex(index)
    cardRefs.current[index]?.scrollIntoView({ behavior: railMode === 'reduced' ? 'auto' : 'smooth', block: 'nearest', inline: 'start' })
  }

  return (
    <section ref={rootRef} className="engagement-rail" data-nav-theme="dark" aria-labelledby="engagement-rail-title">
      <div ref={pinRef} className="engagement-rail__pin">
        <div className="engagement-rail__heading">
          <span className="eyebrow eyebrow--light">[ How we work ]</span>
          <h2 id="engagement-rail-title">One operating system becoming clear.</h2>
        </div>
        <div className="engagement-rail__tabs" role="tablist" aria-label="Consulting engagements">
          {ENGAGEMENT_SERVICES.map((service) => (
            <button
              type="button"
              role="tab"
              aria-selected={service.id === activeStage.service}
              aria-controls="engagement-stage-panel"
              tabIndex={service.id === activeStage.service ? 0 : -1}
              onClick={() => jumpToStage(service.startIndex)}
              key={service.id}
            >
              {service.title}
            </button>
          ))}
        </div>
        <div className="engagement-rail__body">
          <div id="engagement-stage-panel" className="engagement-rail__copy" role="tabpanel">
            <span className="engagement-rail__counter">{String(activeStage.serviceStage + 1).padStart(2, '0')} / 04</span>
            <h3>{activeStage.title}</h3>
            <p className="engagement-rail__strategic">{activeStage.strategicLine}</p>
            <p className="engagement-rail__body-copy">{activeStage.body}</p>
          </div>
          <div className="engagement-rail__visual">
            <EngagementCanvas activeStage={activeStage} svgRef={svgRef} />
          </div>
        </div>
        <div className="engagement-rail__progress" aria-label={`${activeService.title} progress`}>
          {activeService.stages.map((stageLabel, index) => (
            <span data-active={index === activeStage.serviceStage ? 'true' : 'false'} key={stageLabel}>
              <b>{String(index + 1).padStart(2, '0')}</b>{stageLabel}
            </span>
          ))}
        </div>
        <div ref={mobileRailRef}>
          <MobileStageRail activeIndex={activeIndex} cardRefs={cardRefs} />
        </div>
        <ol className="engagement-rail__accessible-stages">
          {ENGAGEMENT_STAGES.map((stage) => (
            <li key={stage.id}>
              <strong>{stage.number} {stage.title}</strong>
              <span>{stage.strategicLine} {stage.body}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
