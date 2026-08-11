const STAGE_COUNT = 8

export function getStageIndex(progress: number) {
  const clamped = Math.min(0.999999, Math.max(0, progress))
  return Math.floor(clamped * STAGE_COUNT)
}

export function getStageDestination(index: number, start: number, end: number) {
  const clampedIndex = Math.min(7, Math.max(0, index))
  const completedStatePosition = clampedIndex + 0.72
  return Math.round(start + (end - start) * (completedStatePosition / STAGE_COUNT))
}
