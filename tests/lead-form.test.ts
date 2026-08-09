import test from 'node:test'
import assert from 'node:assert/strict'
import { createLeadPayload, validateLeadForm, type LeadFormValues } from '../src/lib/lead-form'

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
