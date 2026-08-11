import type { MutableRefObject, RefObject } from 'react'
import { ENGAGEMENT_STAGES } from './stages'

interface MobileStageRailProps {
  activeIndex: number
  cardRefs: MutableRefObject<Array<HTMLElement | null>>
  railRef: RefObject<HTMLDivElement>
}

export function MobileStageRail({ activeIndex, cardRefs, railRef }: MobileStageRailProps) {
  return (
    <div ref={railRef} className="engagement-mobile-rail" aria-label="Eight engagement stages">
      {ENGAGEMENT_STAGES.map((stage, index) => (
        <article
          ref={(node) => { cardRefs.current[index] = node }}
          className="engagement-mobile-card"
          data-stage-index={index}
          data-active={index === activeIndex ? 'true' : 'false'}
          key={stage.id}
          tabIndex={0}
        >
          <span className="engagement-rail__counter">{stage.number} / 08</span>
          <h3>{stage.title}</h3>
          <p className="engagement-rail__strategic">{stage.strategicLine}</p>
          <p>{stage.body}</p>
          <span className="engagement-rail__output">{stage.outputLabel}</span>
        </article>
      ))}
    </div>
  )
}
