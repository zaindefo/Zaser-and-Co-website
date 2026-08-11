import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { MethodStory } from '../src/components/home/MethodStory'

test('method story renders an accessible single-canvas engagement rail', () => {
  const html = renderToStaticMarkup(<MethodStory />)
  const source = readFileSync('src/components/home/MethodStory.tsx', 'utf8')
  const railSource = readFileSync('src/components/home/engagement-rail/EngagementRail.tsx', 'utf8')

  assert.match(html, /AI Audit &amp; Implementation/)
  assert.match(html, /Management &amp; Operations Strategy/)
  assert.equal((html.match(/role="tab"/g) ?? []).length, 2)
  assert.equal((html.match(/class="engagement-mobile-card"/g) ?? []).length, 8)
  assert.equal((html.match(/<svg/g) ?? []).length, 1)
  assert.equal((html.match(/class="engagement-canvas"/g) ?? []).length, 1)
  assert.match(html, /aria-selected="true"/)
  assert.match(html, /aria-controls="engagement-stage-panel"/)
  assert.doesNotMatch(source + railSource, /consulting-artifacts|method-dossier|method-stage|ArtifactVisual/)
})
