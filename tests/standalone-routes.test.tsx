import test from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import AboutPage from '../src/app/about/page'
import DhakaConsultantPage from '../src/app/business-consultant-dhaka/page'
import BangladeshConsultancyPage from '../src/app/business-consultancy-bangladesh/page'
import StockPulsePage from '../src/app/stockpulse/page'

test('standalone routes render their named consulting documents', () => {
  assert.match(renderToStaticMarkup(<AboutPage />), /data-artifact="engagement-method"/)
  assert.match(renderToStaticMarkup(<DhakaConsultantPage />), /data-artifact="operating-constraint"/)
  assert.match(renderToStaticMarkup(<BangladeshConsultancyPage />), /data-artifact="operating-constraint"/)
  const stock = renderToStaticMarkup(<StockPulsePage />)
  assert.equal((stock.match(/data-artifact="stockpulse-evidence"/g) ?? []).length, 1)
  assert.match(stock, /illustrative system|Illustrative system|Example data/)
  assert.doesNotMatch(stock, /stock-dashboard|Inventory operating view/)
})
