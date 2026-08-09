import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('sitemap priorities describe only retained public routes', () => {
  const config = readFileSync('next-sitemap.config.js', 'utf8')

  assert.match(config, /services\/management-operations/)
  assert.match(config, /services\/ai-audit-implementation/)
  assert.doesNotMatch(config, /services\/financial-clarity/)
  assert.doesNotMatch(config, /services\/content-generation/)
  assert.doesNotMatch(config, /breakpoint/)
})
