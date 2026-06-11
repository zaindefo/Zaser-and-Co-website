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

export default function ContactPage() {
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
      if (res.ok) {
        setSubmitted(true)
      } else {
        setSubmitError(true)
      }
    } catch {
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full bg-linen border border-mist rounded-btn px-4 py-3 text-obsidian-ink font-twk-lausanne text-sm placeholder:text-sage focus:outline-none focus:border-obsidian-ink transition-colors'

  return (
    <main className="pt-24">
      <section className="section-padding bg-linen border-t border-mist relative">
        <div className="max-w-2xl mx-auto relative">
          <ScrollReveal>
            <h1 className="font-twk-lausanne text-4xl md:text-5xl text-obsidian-ink mb-4 tracking-tight">
              Request your free<br />
              <span className="display-text">diagnostic.</span>
            </h1>
            <p className="text-obsidian-ink text-lg mb-10 leading-relaxed font-twk-lausanne">
              30 minutes. No cost. No obligation. You&apos;ll know your Clarity Score,
              your biggest blind spots, and where the highest-impact opportunities are.
            </p>
          </ScrollReveal>

          {submitted ? (
            <ScrollReveal>
              <div className="card p-10 text-center">
                <p className="text-4xl mb-4">&#10003;</p>
                <h2 className="font-twk-lausanne text-2xl text-obsidian-ink mb-3">We&apos;ll be in touch.</h2>
                <p className="text-obsidian-ink font-twk-lausanne">
                  Expect a WhatsApp message within 24 hours. Your numbers, decoded.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal delay={0.1}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-obsidian-ink text-sm mb-2 font-twk-lausanne">Your name</label>
                  <input
                    {...register('name', { required: true })}
                    placeholder="Rina Akter"
                    className={inputClass}
                  />
                  {errors.name && <p className="text-[var(--z-loss)] text-xs mt-1">This field is required.</p>}
                </div>

                <div>
                  <label className="block text-obsidian-ink text-sm mb-2 font-twk-lausanne">Business name</label>
                  <input
                    {...register('business', { required: true })}
                    placeholder="Glow by Rina"
                    className={inputClass}
                  />
                  {errors.business && <p className="text-[var(--z-loss)] text-xs mt-1">This field is required.</p>}
                </div>

                <div>
                  <label className="block text-obsidian-ink text-sm mb-2 font-twk-lausanne">WhatsApp number</label>
                  <input
                    {...register('whatsapp', { required: true })}
                    placeholder="+880 1700 000000"
                    className={inputClass}
                  />
                  {errors.whatsapp && <p className="text-[var(--z-loss)] text-xs mt-1">This field is required.</p>}
                </div>

                <div>
                  <label className="block text-obsidian-ink text-sm mb-2 font-twk-lausanne">Tell us about your business</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Monthly revenue, what you sell, your biggest headache right now..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div>
                  <label className="block text-obsidian-ink text-sm mb-2 font-twk-lausanne">Preferred language</label>
                  <select {...register('language')} className={inputClass}>
                    <option value="English">English</option>
                    <option value="Bangla">Bangla</option>
                    <option value="Both">Both (Banglish)</option>
                  </select>
                </div>

                {submitError && (
                  <div className="p-4 rounded-btn bg-[var(--z-loss-dim)] border border-[#c53030]/30">
                    <p className="text-[var(--z-loss)] text-sm font-twk-lausanne">
                      Something went wrong. Please try again or reach us directly via WhatsApp.
                    </p>
                  </div>
                )}

                <MagneticButton size="lg" className="w-full justify-center">
                  {submitting ? 'Sending...' : 'Request my diagnostic →'}
                </MagneticButton>
              </form>

              <div className="mt-8 text-center text-sage text-sm font-twk-lausanne">
                {/* TODO: Replace 880XXXXXXXXXX with real WhatsApp number */}
                Or reach us directly:{' '}
                <a href="https://wa.me/880XXXXXXXXXX" className="text-voltage hover:underline">
                  WhatsApp
                </a>{' '}
                &middot;{' '}
                <a href="mailto:hello@zaserandco.com" className="text-voltage hover:underline">
                  hello@zaserandco.com
                </a>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </main>
  )
}
