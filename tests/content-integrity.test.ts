import test from 'node:test'
import assert from 'node:assert/strict'
import { SERVICES } from '../src/content/services'
import { auditContentIntegrity } from '../src/lib/content-integrity'

test('publishes exactly the two approved consulting engagements', () => {
  assert.deepEqual(
    SERVICES.map((service) => service.slug),
    ['ai-audit-implementation', 'management-operations'],
  )
})

test('publishes no unapproved proof claims or placeholder contact details', () => {
  assert.deepEqual(auditContentIntegrity(), [])
})
