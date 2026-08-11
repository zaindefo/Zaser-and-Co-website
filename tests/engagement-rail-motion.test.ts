import test from 'node:test'
import assert from 'node:assert/strict'
import { getStageDestination, getStageIndex } from '../src/components/home/engagement-rail/motion-math'

test('scroll progress maps into eight clamped zones', () => {
  assert.equal(getStageIndex(-1), 0)
  assert.equal(getStageIndex(0), 0)
  assert.equal(getStageIndex(0.124), 0)
  assert.equal(getStageIndex(0.125), 1)
  assert.equal(getStageIndex(0.5), 4)
  assert.equal(getStageIndex(0.999), 7)
  assert.equal(getStageIndex(2), 7)
})

test('service tab destinations target stages one and five inside the pin range', () => {
  assert.equal(getStageDestination(0, 1000, 3400), 1216)
  assert.equal(getStageDestination(4, 1000, 3400), 2416)
})
