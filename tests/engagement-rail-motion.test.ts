import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ENGAGEMENT_LEAD_IN_PROGRESS,
  getEngagementProgress,
  getEngagementMotionState,
  getStageDestination,
  getStageIndex,
} from '../src/components/home/engagement-rail/motion-math'

test('desktop engagement motion holds Assess before normalized stage progress begins', () => {
  assert.equal(getEngagementProgress(0), 0)
  assert.equal(getEngagementProgress(ENGAGEMENT_LEAD_IN_PROGRESS), 0)
  assert.equal(getStageIndex(ENGAGEMENT_LEAD_IN_PROGRESS), 0)
  assert.equal(getEngagementProgress(1), 1)
})

test('controller motion state keeps the SVG timeline and stage copy synchronized', () => {
  assert.deepEqual(getEngagementMotionState(0.08), { progress: 0, stageIndex: 0 })
  assert.deepEqual(getEngagementMotionState(0.195), { progress: 0.125, stageIndex: 1 })
  assert.deepEqual(getEngagementMotionState(2), { progress: 1, stageIndex: 7 })
})

test('scroll progress maps into eight clamped zones', () => {
  assert.equal(getStageIndex(-1), 0)
  assert.equal(getStageIndex(0), 0)
  assert.equal(getStageIndex(0.194), 0)
  assert.equal(getStageIndex(0.195), 1)
  assert.equal(getStageIndex(0.54), 4)
  assert.equal(getStageIndex(0.999), 7)
  assert.equal(getStageIndex(2), 7)
})

test('service tab destinations reserve the lead-in and target completed stages', () => {
  assert.equal(getStageDestination(0, 1000, 3400), 1391)
  assert.equal(getStageDestination(4, 1000, 3400), 2495)
})
