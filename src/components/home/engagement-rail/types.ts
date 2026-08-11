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
