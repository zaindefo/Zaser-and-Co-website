import test from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import { EditorialNav } from '../src/components/editorial/EditorialNav'
import { EditorialFooter } from '../src/components/editorial/EditorialFooter'

test('global navigation exposes the brand, primary links, and audit action', () => {
  const html = renderToStaticMarkup(<EditorialNav />)
  assert.match(html, /aria-label="Primary navigation"/)
  assert.match(html, />Zaser &amp; Co</)
  assert.match(html, /href="\/insights"/)
  assert.match(html, /href="\/free-business-audit"/)
})

test('the footer concludes with a contact action and full brand wordmark', () => {
  const html = renderToStaticMarkup(<EditorialFooter />)
  assert.match(html, /Sharper decisions start/)
  assert.match(html, /mailto:hello@zaserandco.com/)
  assert.match(html, />ZASER</)
})
