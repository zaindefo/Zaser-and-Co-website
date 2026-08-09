import test from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import { CinematicHero } from '../src/components/home/CinematicHero'
import { getHeroNavTheme } from '../src/lib/hero-motion'

test('cinematic hero keeps the full positioning story available without motion', () => {
  const html = renderToStaticMarkup(<CinematicHero />)

  assert.match(html, /Strategic &amp; management consultancy/)
  assert.match(html, /Your business/)
  assert.match(html, /deserves a/)
  assert.match(html, /sharper strategy\./)
  assert.match(html, /href="\/contact"/)
  assert.match(html, /Request your free session/)
  assert.match(html, /href="#services"/)
  assert.match(html, /The Zaser view/)
  assert.match(html, /Growth should translate into/)
  assert.match(html, /performance\./)
})

test('cinematic hero exposes factual diagnostic artefacts as labelled graphics', () => {
  const html = renderToStaticMarkup(<CinematicHero />)

  assert.match(html, /role="img" aria-label="Strategic diagnostic map"/)
  assert.match(html, /Profitability lens/)
  assert.match(html, /Opportunity matrix/)
  assert.doesNotMatch(html, /\d+%/)
})

test('hero navigation changes contrast when the navy view takes over', () => {
  assert.equal(getHeroNavTheme(.61), 'light')
  assert.equal(getHeroNavTheme(.62), 'dark')
  assert.equal(getHeroNavTheme(1), 'dark')
})

test('static hero chapters declare independent navigation contrast', () => {
  const html = renderToStaticMarkup(<CinematicHero />)

  assert.match(html, /class="cinematic-hero__stage" data-nav-theme="light"/)
  assert.match(html, /class="cinematic-hero__view" data-nav-theme="dark"/)
})
