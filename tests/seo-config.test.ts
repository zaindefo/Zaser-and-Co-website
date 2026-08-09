import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('production builds remain indexable outside Vercel while previews stay protected', () => {
  const config = readFileSync('next.config.js', 'utf8')
  assert.match(config, /process\.env\.NODE_ENV === 'production'/)
  assert.match(config, /process\.env\.VERCEL_ENV/)
})
