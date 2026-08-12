const STAGE_COUNT = 8

export const ENGAGEMENT_NAV_OFFSET_PX = 72
export const ENGAGEMENT_LEAD_IN_PROGRESS = 0.08

export function getEngagementProgress(rawProgress: number) {
  const clamped = Math.min(1, Math.max(0, rawProgress))
  if (clamped <= ENGAGEMENT_LEAD_IN_PROGRESS) return 0
  return (clamped - ENGAGEMENT_LEAD_IN_PROGRESS) / (1 - ENGAGEMENT_LEAD_IN_PROGRESS)
}

export function getStageIndex(rawProgress: number) {
  const progress = Math.min(0.999999, getEngagementProgress(rawProgress))
  return Math.floor(progress * STAGE_COUNT)
}

export function getEngagementMotionState(rawProgress: number) {
  return {
    progress: getEngagementProgress(rawProgress),
    stageIndex: getStageIndex(rawProgress),
  }
}

export function getStageDestination(index: number, start: number, end: number) {
  const clampedIndex = Math.min(7, Math.max(0, index))
  const completedStatePosition = clampedIndex + 0.72
  const normalizedPosition = completedStatePosition / STAGE_COUNT
  const triggerProgress = ENGAGEMENT_LEAD_IN_PROGRESS
    + normalizedPosition * (1 - ENGAGEMENT_LEAD_IN_PROGRESS)
  return Math.round(start + (end - start) * triggerProgress)
}
