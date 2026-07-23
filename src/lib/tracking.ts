declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
    gtag: (...args: unknown[]) => void
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return

  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    })
  }

  if (window.gtag) {
    window.gtag('event', eventName, params)
  }
}

export const SEO_EVENTS = {
  FREE_BUSINESS_AUDIT_CLICK: 'free_business_audit_click',
  FREE_AI_AUDIT_CLICK: 'free_ai_audit_click',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  WHATSAPP_CLICK: 'whatsapp_click',
  EMAIL_CLICK: 'email_click',
  CONSULTATION_CLICK: 'consultation_click',
  LEAD_FORM_START: 'lead_form_start',
  LEAD_FORM_SUBMIT: 'lead_submit',
  BLOG_CTA_CLICK: 'blog_cta_click',
} as const
