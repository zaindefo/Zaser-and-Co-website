'use client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { MagneticButton } from '@/components/shared/MagneticButton'

interface ContactForm {
  name: string
  business: string
  whatsapp: string
  message: string
  language: string
}

const inputClass =
  'w-full bg-obsidian-ink/60 border border-mist/20 rounded-btn px-4 py-3 text-linen font-twk-lausanne text-sm placeholder:text-mist/40 focus:outline-none focus:border-voltage transition-colors'

export function ContactInline() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true)
    setSubmitError(false)
    try {
      const res = await fetch('https://formspree.io/f/xojznlpv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setSubmitted(true)
      else setSubmitError(true)
    } catch {
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="min-h-screen bg-bark relative overflow-hidden section-padding flex items-center"
    >
      {/* Ghosted "Start." watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-pp-mondwest)',
            fontSize: 'clamp(140px, 25vw, 380px)',
            color: 'rgba(250,255,250,0.03)',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          Start.
        </span>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {submitted ? (
          <ScrollReveal>
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full border flex items-center justify-center mx-auto mb-20"
                style={{ borderColor: 'var(--z-profit)', backgroundColor: 'rgba(26,138,62,0.15)' }}
              >
                <span className="text-2xl" style={{ color: 'var(--z-profit)' }}>✓</span>
              </div>
              <h2 className="font-twk-lausanne text-2xl text-linen mb-10">
                We'll be in touch.
              </h2>
              <p className="font-twk-lausanne text-sm" style={{ color: 'rgba(200,210,200,0.6)' }}>
                Expect a WhatsApp message within 24 hours. Your numbers, decoded.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <>
            <ScrollReveal>
              <p className="text-voltage font-mono text-xs uppercase tracking-widest mb-15">
                Get started
              </p>
              <h2 className="font-twk-lausanne text-3xl md:text-5xl text-linen mb-10 tracking-tight">
                Request your free diagnostic.
              </h2>
              <p className="font-twk-lausanne text-sm mb-40" style={{ color: 'rgba(200,210,200,0.55)' }}>
                30 minutes. No cost. No obligation.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-20">
                <div>
                  <label
                    className="block font-twk-lausanne text-sm mb-8"
                    style={{ color: 'rgba(200,210,200,0.7)' }}
                  >
                    Your name
                  </label>
                  <input
                    {...register('name', { required: true })}
                    placeholder="Rina Akter"
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className="text-sm mt-8" style={{ color: 'var(--z-loss)' }}>Required.</p>
                  )}
                </div>

                <div>
                  <label
                    className="block font-twk-lausanne text-sm mb-8"
                    style={{ color: 'rgba(200,210,200,0.7)' }}
                  >
                    Business name
                  </label>
                  <input
                    {...register('business', { required: true })}
                    placeholder="Glow by Rina"
                    className={inputClass}
                  />
                  {errors.business && (
                    <p className="text-sm mt-8" style={{ color: 'var(--z-loss)' }}>Required.</p>
                  )}
                </div>

                <div>
                  <label
                    className="block font-twk-lausanne text-sm mb-8"
                    style={{ color: 'rgba(200,210,200,0.7)' }}
                  >
                    WhatsApp number
                  </label>
                  <input
                    {...register('whatsapp', { required: true })}
                    placeholder="+880 1700 000000"
                    className={inputClass}
                  />
                  {errors.whatsapp && (
                    <p className="text-sm mt-8" style={{ color: 'var(--z-loss)' }}>Required.</p>
                  )}
                </div>

                <div>
                  <label
                    className="block font-twk-lausanne text-sm mb-8"
                    style={{ color: 'rgba(200,210,200,0.7)' }}
                  >
                    Tell us about your business
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Monthly revenue, what you sell, your biggest headache right now..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div>
                  <label
                    className="block font-twk-lausanne text-sm mb-8"
                    style={{ color: 'rgba(200,210,200,0.7)' }}
                  >
                    Preferred language
                  </label>
                  <select {...register('language')} className={inputClass}>
                    <option value="English">English</option>
                    <option value="Bangla">Bangla</option>
                    <option value="Both">Both (Banglish)</option>
                  </select>
                </div>

                {submitError && (
                  <p className="text-sm" style={{ color: 'var(--z-loss)' }}>
                    Something went wrong. Try again or reach us directly via WhatsApp.
                  </p>
                )}

                <MagneticButton size="lg" className="w-full justify-center">
                  {submitting ? 'Sending…' : 'Request my diagnostic →'}
                </MagneticButton>
              </form>
            </ScrollReveal>
          </>
        )}
      </div>
    </section>
  )
}
