import test from 'node:test'
import assert from 'node:assert/strict'
import { createRef } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { EngagementCanvas } from '../src/components/home/engagement-rail/EngagementCanvas'
import { ENGAGEMENT_STAGES } from '../src/components/home/engagement-rail/stages'

test('engagement canvas renders one stable SVG primitive inventory', () => {
  const html = renderToStaticMarkup(<EngagementCanvas activeStage={ENGAGEMENT_STAGES[0]} svgRef={createRef<SVGSVGElement>()} />)
  assert.equal((html.match(/<svg/g) ?? []).length, 1)
  assert.match(html, /class="engagement-canvas"/)
  assert.equal((html.match(/data-object=/g) ?? []).length, 5)
  assert.equal((html.match(/data-axis=/g) ?? []).length, 2)
  assert.equal((html.match(/data-route=/g) ?? []).length, 2)
  assert.equal((html.match(/data-marker=/g) ?? []).length, 5)
  assert.equal((html.match(/data-label=/g) ?? []).length, 5)
  assert.equal((html.match(/data-status=/g) ?? []).length, 1)
  assert.match(html, /AI Assess operating diagram/)
  assert.match(html, /five-dimension readiness scan/i)
})
