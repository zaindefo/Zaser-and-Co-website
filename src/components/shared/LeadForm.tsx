'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SITE } from '../../content/site'
import {
  submitLead,
  validateLeadForm,
  type InquiryType,
  type LeadFormValues,
} from '../../lib/lead-form'

interface LeadFormProps {
  inquiryType: InquiryType
  sourcePage: string
  compact?: boolean
}

export function LeadForm({ inquiryType, sourcePage, compact = false }: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    defaultValues: {
      name: '',
      business: '',
      email: '',
      message: '',
      language: 'English',
      inquiryType,
      sourcePage,
    },
  })

  async function submit(values: LeadFormValues) {
    const validation = validateLeadForm(values)
    if (Object.keys(validation).length) {
      for (const [field, message] of Object.entries(validation)) {
        setError(field as keyof typeof validation, { message })
      }
      return
    }

    setStatus('sending')
    try {
      await submitLead(SITE.formEndpoint, values)
      reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="lead-form-success" role="status" aria-live="polite">
        <span className="eyebrow">Message received</span>
        <h3>We’ll respond by email.</h3>
        <p>Your message is with Zaser & Co. Expect a considered response within 24 business hours.</p>
      </div>
    )
  }

  return (
    <form className={`lead-form${compact ? ' lead-form--compact' : ''}`} onSubmit={handleSubmit(submit)} noValidate>
      <input type="hidden" {...register('inquiryType')} value={inquiryType} />
      <input type="hidden" {...register('sourcePage')} value={sourcePage} />

      <div className="lead-form-grid">
        <div className="field">
          <label htmlFor="lead-name">Your name</label>
          <input id="lead-name" autoComplete="name" {...register('name')} aria-invalid={Boolean(errors.name)} />
          {errors.name && <p className="field-error" role="alert">{errors.name.message}</p>}
        </div>
        <div className="field">
          <label htmlFor="lead-business">Business name</label>
          <input id="lead-business" autoComplete="organization" {...register('business')} aria-invalid={Boolean(errors.business)} />
          {errors.business && <p className="field-error" role="alert">{errors.business.message}</p>}
        </div>
      </div>

      <div className="lead-form-grid">
        <div className="field">
          <label htmlFor="lead-email">Email address</label>
          <input id="lead-email" type="email" autoComplete="email" {...register('email')} aria-invalid={Boolean(errors.email)} />
          {errors.email && <p className="field-error" role="alert">{errors.email.message}</p>}
        </div>
        <div className="field">
          <label htmlFor="lead-language">Preferred language</label>
          <select id="lead-language" {...register('language')}>
            <option>English</option>
            <option>Bangla</option>
            <option>English & Bangla</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="lead-message">Where does the business feel stuck?</label>
        <textarea id="lead-message" rows={compact ? 3 : 5} {...register('message')} />
      </div>

      <button className="button button--rust" type="submit" disabled={status === 'sending'}>
        <span>{status === 'sending' ? 'Sending' : 'Request your session'}</span>
        <span aria-hidden="true">↗</span>
      </button>

      <p className="form-note">Or write directly to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      <div className="form-status" aria-live="polite">
        {status === 'error' && 'The form could not be sent. Please email us directly and we will respond.'}
      </div>
    </form>
  )
}
