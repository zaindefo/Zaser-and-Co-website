import test from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import { AUDITS } from '../src/content/audits'
import { INDUSTRIES } from '../src/content/industries'
import { INSIGHTS } from '../src/content/insights'
import {
  AIReadinessSheet,
  AIOpportunityExample,
  AuditAssessmentSheet,
  CostLeakageScan,
  CostStructureMap,
  DocumentFrame,
  EngagementMethodSheet,
  IndustryDiagnosticMap,
  ImplementationHandoverSheet,
  ImplementationWorkflowMap,
  InterventionPriorityRegister,
  MarginBridgeExample,
  NinetyDayRoadmap,
  OperatingConstraintMap,
  OpportunityPriorityMatrix,
  StockPulseEvidenceSheet,
  ValueStreamExample,
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

test('worked examples and StockPulse retain explicit illustrative disclosures', () => {
  const examples = [
    <MarginBridgeExample key="margin" example={INSIGHTS[0].example} />,
    <ValueStreamExample key="stream" example={INSIGHTS[1].example} />,
    <AIOpportunityExample key="ai" example={INSIGHTS[2].example} />,
  ].map((node) => renderToStaticMarkup(node)).join('')
  const stock = renderToStaticMarkup(<StockPulseEvidenceSheet tone="navy" />)

  assert.match(examples, /not a client result|not presented as client proof|does not claim a client outcome/)
  assert.match(examples, /Direct cost/)
  assert.match(examples, /Exception/)
  assert.match(examples, /Feasibility/)
  for (const label of ['SKU velocity', 'Reorder threshold', 'Dead-stock flag', 'Stock coverage', 'Supplier action']) {
    assert.match(stock, new RegExp(label))
  }
  assert.match(stock, /Example data/)
})

test('context documents render source content without inventing a completed result', () => {
  const industryHtml = renderToStaticMarkup(<IndustryDiagnosticMap industry={INDUSTRIES[0]} />)
  const auditHtml = renderToStaticMarkup(<AuditAssessmentSheet audit={AUDITS[1]} tone="navy" />)
  const localHtml = renderToStaticMarkup(<OperatingConstraintMap scope="dhaka" tone="navy" />)
  const methodHtml = renderToStaticMarkup(<EngagementMethodSheet />)

  assert.match(industryHtml, /Margin visibility/)
  assert.match(industryHtml, /Management &amp; Operations Strategy/)
  assert.match(auditHtml, /Governance/)
  assert.match(auditHtml, /Not scored before the conversation/)
  assert.match(localHtml, /Observed work/)
  assert.match(methodHtml, /Transfer ownership/)
  assert.doesNotMatch(auditHtml, /87%|ROI|client result/i)
})

test('operations documents name leakage, cost behavior, action priority, and ownership', () => {
  const html = [
    <CostLeakageScan key="leakage" />,
    <CostStructureMap key="cost" />,
    <InterventionPriorityRegister key="priority" />,
    <NinetyDayRoadmap key="roadmap" />,
  ].map((node) => renderToStaticMarkup(node)).join('')

  for (const artifactId of ['cost-leakage', 'cost-structure', 'intervention-priority', 'ninety-day-roadmap']) {
    assert.match(html, new RegExp(`data-artifact="${artifactId}"`))
  }
  for (const label of ['Margin leakage', 'Semi-variable', 'Decision owner', 'Day 61–90']) {
    assert.match(html, new RegExp(label))
  }
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
