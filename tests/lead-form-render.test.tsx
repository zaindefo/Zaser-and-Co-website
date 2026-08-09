import test from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import { LeadForm } from '../src/components/shared/LeadForm'

test('renders accessible identity fields and source attribution', () => {
  const html = renderToStaticMarkup(
    <LeadForm inquiryType="ai-audit" sourcePage="/free-ai-audit" />,
  )

  assert.match(html, /<label[^>]*for="lead-name"/)
  assert.match(html, /<label[^>]*for="lead-business"/)
  assert.match(html, /<label[^>]*for="lead-email"/)
  assert.match(html, /name="inquiryType" value="ai-audit"/)
  assert.match(html, /name="sourcePage" value="\/free-ai-audit"/)
})
