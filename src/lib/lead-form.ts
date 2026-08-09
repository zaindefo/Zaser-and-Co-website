export type InquiryType = 'general' | 'business-audit' | 'ai-audit' | 'service-ai' | 'service-operations'

export interface LeadFormValues {
  name: string
  business: string
  email: string
  message: string
  language: string
  inquiryType: InquiryType
  sourcePage: string
}

export type LeadFormErrors = Partial<Record<'name' | 'business' | 'email', string>>

export function validateLeadForm(values: LeadFormValues): LeadFormErrors {
  const errors: LeadFormErrors = {}
  if (!values.name.trim()) errors.name = 'Enter your name.'
  if (!values.business.trim()) errors.business = 'Enter your business name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  return errors
}

export function createLeadPayload(values: LeadFormValues): LeadFormValues {
  return {
    ...values,
    name: values.name.trim(),
    business: values.business.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  }
}

export type LeadFetch = (input: string, init?: RequestInit) => Promise<Pick<Response, 'ok'>>

export async function submitLead(
  endpoint: string,
  values: LeadFormValues,
  fetcher: LeadFetch = (input, init) => fetch(input, init),
) {
  const response = await fetcher(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(createLeadPayload(values)),
  })
  if (!response.ok) throw new Error('Submission failed')
}
