import test from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  AIReadinessSheet,
  DocumentFrame,
  ImplementationHandoverSheet,
  ImplementationWorkflowMap,
  OpportunityPriorityMatrix,
} from '../src/components/consulting-artifacts'

test('document frame exposes a named and described consulting artefact', () => {
  const html = renderToStaticMarkup(
    <DocumentFrame
      artifactId="test-sheet"
      title="Test evidence sheet"
      reference="ZCO / TEST / 01"
      status="Evidence template"
      description="A test description for assistive technology."
    >
      <p>Selectable evidence</p>
    </DocumentFrame>,
  )

  assert.match(html, /role="figure"/)
  assert.match(html, /data-artifact="test-sheet"/)
  assert.match(html, /aria-labelledby=/)
  assert.match(html, /aria-describedby=/)
  assert.match(html, />Selectable evidence</)
})

test('AI documents name readiness, selection, workflow, and handover evidence', () => {
  const html = [
    <AIReadinessSheet key="readiness" />,
    <OpportunityPriorityMatrix key="priority" />,
    <ImplementationWorkflowMap key="workflow" />,
    <ImplementationHandoverSheet key="handover" />,
  ].map((node) => renderToStaticMarkup(node)).join('')

  for (const artifactId of ['ai-readiness', 'opportunity-priority', 'implementation-workflow', 'implementation-handover']) {
    assert.match(html, new RegExp(`data-artifact="${artifactId}"`))
  }
  for (const label of ['Strategy', 'Selected first use case', 'Current workflow', 'Operating guide']) {
    assert.match(html, new RegExp(label))
  }
})
