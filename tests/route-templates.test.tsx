import test from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import { SERVICES } from '../src/content/services'
import { INDUSTRIES } from '../src/content/industries'
import { AUDITS } from '../src/content/audits'
import { INSIGHTS } from '../src/content/insights'
import { ServicePageTemplate } from '../src/components/routes/ServicePageTemplate'
import { IndustryPageTemplate } from '../src/components/routes/IndustryPageTemplate'
import { AuditPageTemplate } from '../src/components/routes/AuditPageTemplate'
import { InsightArticleTemplate } from '../src/components/routes/InsightArticleTemplate'

test('service routes expose the engagement process and all tangible deliverables', () => {
  const html = renderToStaticMarkup(<ServicePageTemplate service={SERVICES[0]} />)
  assert.match(html, /AI Audit &amp; Implementation/)
  assert.match(html, /Readiness across five dimensions/)
  assert.match(html, /Handover Documentation &amp; Training/)
})

test('industry routes connect sector tensions to the two approved services', () => {
  const html = renderToStaticMarkup(<IndustryPageTemplate industry={INDUSTRIES[0]} />)
  assert.match(html, /Turn order volume/)
  assert.match(html, /AI Audit &amp; Implementation/)
  assert.match(html, /Management &amp; Operations Strategy/)
})

test('audit routes embed the correctly attributed lead form', () => {
  const html = renderToStaticMarkup(<AuditPageTemplate audit={AUDITS[1]} />)
  assert.match(html, /name="inquiryType" value="ai-audit"/)
  assert.match(html, /name="sourcePage" value="\/free-ai-audit"/)
})

test('insight routes label fictional material as a worked example', () => {
  const html = renderToStaticMarkup(<InsightArticleTemplate insight={INSIGHTS[0]} />)
  assert.match(html, /Worked example/)
  assert.match(html, /not a client result/)
})

test('route templates select purpose-built documents by content purpose', () => {
  const ai = renderToStaticMarkup(<ServicePageTemplate service={SERVICES[0]} />)
  const operations = renderToStaticMarkup(<ServicePageTemplate service={SERVICES[1]} />)
  const industry = renderToStaticMarkup(<IndustryPageTemplate industry={INDUSTRIES[0]} />)
  const audit = renderToStaticMarkup(<AuditPageTemplate audit={AUDITS[0]} />)
  const insight = renderToStaticMarkup(<InsightArticleTemplate insight={INSIGHTS[2]} />)

  for (const id of ['ai-readiness', 'opportunity-priority', 'implementation-workflow', 'implementation-handover']) {
    assert.match(ai, new RegExp(`data-artifact="${id}"`))
  }
  for (const id of ['cost-leakage', 'cost-structure', 'intervention-priority', 'ninety-day-roadmap']) {
    assert.match(operations, new RegExp(`data-artifact="${id}"`))
  }
  assert.match(industry, /data-artifact="industry-diagnostic"/)
  assert.match(audit, /data-artifact="audit-assessment"/)
  assert.match(insight, /data-artifact="ai-opportunity-example"/)
})
