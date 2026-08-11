import test from 'node:test'
import assert from 'node:assert/strict'
import { ENGAGEMENT_SERVICES, ENGAGEMENT_STAGES } from '../src/components/home/engagement-rail/stages'

test('engagement rail exposes the two approved services and eight stages in order', () => {
  assert.deepEqual(ENGAGEMENT_SERVICES.map(({ id, title, startIndex }) => ({ id, title, startIndex })), [
    { id: 'ai', title: 'AI Audit & Implementation', startIndex: 0 },
    { id: 'operations', title: 'Management & Operations Strategy', startIndex: 4 },
  ])

  assert.deepEqual(ENGAGEMENT_STAGES.map(({ id }) => id), [
    'ai-assess',
    'ai-prioritise',
    'ai-build',
    'ai-hand-over',
    'operations-diagnose',
    'operations-map',
    'operations-prioritise',
    'operations-roadmap',
  ])
  assert.equal(ENGAGEMENT_STAGES.filter(({ service }) => service === 'ai').length, 4)
  assert.equal(ENGAGEMENT_STAGES.filter(({ service }) => service === 'operations').length, 4)
})

test('each stage contains final copy and a matching visual state id', () => {
  for (const [index, stage] of ENGAGEMENT_STAGES.entries()) {
    assert.equal(stage.number, String(index + 1).padStart(2, '0'))
    assert.equal(stage.visualState, stage.id)
    assert.ok(stage.title.length > 2)
    assert.ok(stage.strategicLine.endsWith('.'))
    assert.ok(stage.body.endsWith('.'))
  }
})
