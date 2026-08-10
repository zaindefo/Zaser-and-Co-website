import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { MethodStory } from '../src/components/home/MethodStory'

test('method story renders two static dossiers and all eight stages', () => {
  const html = renderToStaticMarkup(<MethodStory />)
  const source = readFileSync('src/components/home/MethodStory.tsx', 'utf8')

  assert.match(html, /AI Audit &amp; Implementation/)
  assert.match(html, /Management &amp; Operations Strategy/)
  for (const label of ['Assess', 'Build', 'Hand over', 'Diagnose', 'Map', 'Roadmap']) {
    assert.match(html, new RegExp(`>${label}<`))
  }
  assert.equal((html.match(/<section class="method-stage">/g) ?? []).length, 8)
  assert.doesNotMatch(html, /button|aria-live|aria-pressed/)
  assert.doesNotMatch(source, /use client|useEffect|useState|addEventListener/)
})
