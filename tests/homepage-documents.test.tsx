import test from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import HomePage from '../src/app/page'
import { ENGAGEMENT_OUTPUTS } from '../src/content/outputs'

test('homepage proof and output chapters render named engagement documents', () => {
  const html = renderToStaticMarkup(<HomePage />)

  for (const artifactId of ['ai-readiness', 'opportunity-priority', 'cost-structure', 'value-stream-example', 'ninety-day-roadmap']) {
    assert.match(html, new RegExp(`data-artifact="${artifactId}"`))
  }
  assert.match(html, /class="proof-documents"/)
  assert.match(html, /class="output-dossier-list"/)
  assert.doesNotMatch(html, /class="artifact artifact--(?:scorecard|matrix|cost-map)/)
  assert.deepEqual(
    ENGAGEMENT_OUTPUTS.map((output) => output.artifact),
    ['ai-readiness', 'opportunity-priority', 'implementation-workflow', 'cost-leakage', 'cost-structure', 'ninety-day-roadmap'],
  )
})
