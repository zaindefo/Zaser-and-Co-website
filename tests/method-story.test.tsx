import test from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import { MethodStory } from '../src/components/home/MethodStory'

test('method story exposes both service lanes and the complete initial sequence', () => {
  const html = renderToStaticMarkup(<MethodStory />)
  assert.match(html, /aria-label="Select method lane"/)
  assert.match(html, /AI Audit &amp; Implementation/)
  assert.match(html, /Management &amp; Operations/)
  assert.match(html, />Assess</)
  assert.match(html, />Prioritise</)
  assert.match(html, />Build</)
  assert.match(html, />Hand over</)
})
