export type EngagementService = 'ai' | 'operations'

export type EngagementStageId =
  | 'ai-assess'
  | 'ai-prioritise'
  | 'ai-build'
  | 'ai-hand-over'
  | 'operations-diagnose'
  | 'operations-map'
  | 'operations-prioritise'
  | 'operations-roadmap'

export type VisualStateId = EngagementStageId

export interface EngagementStage {
  id: EngagementStageId
  number: string
  service: EngagementService
  serviceStage: 0 | 1 | 2 | 3
  title: string
  strategicLine: string
  body: string
  outputLabel: string
  visualState: VisualStateId
}

export interface ServiceDefinition {
  id: EngagementService
  eyebrow: string
  title: string
  startIndex: 0 | 4
  stages: readonly [string, string, string, string]
}

export interface RectTarget {
  x: number
  y: number
  width: number
  height: number
  rx: number
  opacity: number
}

export interface PathTarget {
  d: string
  opacity: number
}

export interface MarkerTarget {
  cx: number
  cy: number
  r: number
  opacity: number
}

export interface LabelTarget {
  x: number
  y: number
  text: string
  opacity: number
  anchor?: 'start' | 'middle' | 'end'
}

export interface EngagementVisualState {
  id: VisualStateId
  objects: readonly [RectTarget, RectTarget, RectTarget, RectTarget, RectTarget]
  axes: readonly [PathTarget, PathTarget]
  routes: readonly [PathTarget, PathTarget]
  markers: readonly [MarkerTarget, MarkerTarget, MarkerTarget, MarkerTarget, MarkerTarget]
  labels: readonly [LabelTarget, LabelTarget, LabelTarget, LabelTarget, LabelTarget]
  status: LabelTarget
  accentId:
    | `object-${0 | 1 | 2 | 3 | 4}`
    | `axis-${0 | 1}`
    | `route-${0 | 1}`
    | `marker-${0 | 1 | 2 | 3 | 4}`
    | 'status'
}
