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
