import test from 'node:test'
import assert from 'node:assert/strict'
import { createEngagementLifecycle } from '../src/components/home/engagement-rail/engagement-lifecycle'

test('rail engagement follows the desktop trigger boundary without hiding the downward exit', () => {
  const root = { dataset: {} } as unknown as HTMLElement
  const lifecycle = createEngagementLifecycle(root)

  lifecycle.onEnter()
  assert.equal(root.dataset.engaged, 'true')

  // The trigger deliberately has no onLeave handler, so Roadmap stays engaged.
  assert.equal(root.dataset.engaged, 'true')

  lifecycle.onEnterBack()
  assert.equal(root.dataset.engaged, 'true')

  lifecycle.onLeaveBack()
  assert.equal(root.dataset.engaged, undefined)

  lifecycle.onEnter()
  lifecycle.cleanup()
  assert.equal(root.dataset.engaged, undefined)
})
