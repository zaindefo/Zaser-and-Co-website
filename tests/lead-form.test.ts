import test from 'node:test'
import assert from 'node:assert/strict'
import { createLeadPayload, submitLead, validateLeadForm, type LeadFormValues } from '../src/lib/lead-form'

const validLead: LeadFormValues = {
  name: ' Kazi Rahman ',
  business: ' Zaser Retail ',
  email: ' kazi@example.com ',
  message: ' We need clearer margins. ',
  language: 'English',
  inquiryType: 'business-audit',
  sourcePage: '/free-business-audit',
}

test('rejects missing identity fields and malformed email addresses', () => {
  const errors = validateLeadForm({
    ...validLead,
    name: ' ',
    business: '',
    email: 'not-an-email',
  })

  assert.deepEqual(errors, {
    name: 'Enter your name.',
    business: 'Enter your business name.',
    email: 'Enter a valid email address.',
  })
})

test('trims submitted values and preserves inquiry attribution', () => {
  assert.deepEqual(createLeadPayload(validLead), {
    name: 'Kazi Rahman',
    business: 'Zaser Retail',
    email: 'kazi@example.com',
    message: 'We need clearer margins.',
    language: 'English',
    inquiryType: 'business-audit',
    sourcePage: '/free-business-audit',
  })
})

test('submits the standardized payload and accepts a successful response', async () => {
  let submittedBody = ''
  await submitLead('https://example.com/form', validLead, async (_input, init) => {
    submittedBody = String(init?.body)
    return { ok: true } as Response
  })

  assert.deepEqual(JSON.parse(submittedBody), createLeadPayload(validLead))
})

test('surfaces network and non-success responses without sending a production request', async () => {
  await assert.rejects(
    submitLead('https://example.com/form', validLead, async () => ({ ok: false }) as Response),
    /Submission failed/,
  )
  await assert.rejects(
    submitLead('https://example.com/form', validLead, async () => { throw new Error('Network unavailable') }),
    /Network unavailable/,
  )
})
