import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('production builds remain indexable outside Vercel while previews stay protected', () => {
  const config = readFileSync('next.config.js', 'utf8')
  assert.match(config, /process\.env\.NODE_ENV === 'production'/)
  assert.match(config, /process\.env\.VERCEL_ENV/)
})

test('dynamic service and industry metadata retain the branded social image', () => {
  const dynamicPages = [
    'src/app/services/[slug]/page.tsx',
    'src/app/industries/[slug]/page.tsx',
  ]

  for (const page of dynamicPages) {
    const source = readFileSync(page, 'utf8')
    assert.match(source, /images:\s*\[\{\s*url:\s*'\/opengraph-image'/, `${page} should publish the branded Open Graph image`)
  }
})
