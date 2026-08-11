import type { RefObject } from 'react'
import type { EngagementStage } from './types'
import { VISUAL_STATES } from './visual-states'

interface EngagementCanvasProps {
  activeStage: EngagementStage
  svgRef: RefObject<SVGSVGElement>
}

export function EngagementCanvas({ activeStage, svgRef }: EngagementCanvasProps) {
  const initial = VISUAL_STATES['ai-assess']
  const titleId = 'engagement-canvas-title'
  const descriptionId = 'engagement-canvas-description'

  return (
    <svg
      ref={svgRef}
      className="engagement-canvas"
      viewBox="0 0 960 640"
      role="img"
      aria-labelledby={`${titleId} ${descriptionId}`}
      data-state={initial.id}
      data-accent={initial.accentId}
    >
      <title id={titleId}>{`${activeStage.number} ${activeStage.service === 'ai' ? 'AI' : 'Operations'} ${activeStage.title} operating diagram`}</title>
      <desc id={descriptionId}>
        {activeStage.id === 'ai-assess' ? 'A five-dimension readiness scan.' : activeStage.outputLabel}
      </desc>
      <rect className="engagement-canvas__frame" x="1" y="1" width="958" height="638" rx="4" />
      <g className="engagement-canvas__axes" aria-hidden="true">
        {initial.axes.map((target, index) => <path key={index} data-axis={index} {...target} />)}
      </g>
      <g className="engagement-canvas__routes" aria-hidden="true">
        {initial.routes.map((target, index) => <path key={index} data-route={index} pathLength="1" {...target} />)}
      </g>
      <g className="engagement-canvas__objects" aria-hidden="true">
        {initial.objects.map((target, index) => <rect key={index} data-object={index} {...target} />)}
      </g>
      <g className="engagement-canvas__markers" aria-hidden="true">
        {initial.markers.map((target, index) => <circle key={index} data-marker={index} {...target} />)}
      </g>
      <g className="engagement-canvas__labels" aria-hidden="true">
        {initial.labels.map((target, index) => (
          <text key={index} data-label={index} x={target.x} y={target.y} opacity={target.opacity} textAnchor={target.anchor ?? 'start'}>
            {target.text}
          </text>
        ))}
        <text data-status x={initial.status.x} y={initial.status.y} opacity={initial.status.opacity} textAnchor={initial.status.anchor ?? 'start'}>
          {initial.status.text}
        </text>
      </g>
    </svg>
  )
}
