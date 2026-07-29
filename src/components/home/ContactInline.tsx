'use client'
import { useForm } from 'react-hook-form'
import { useState, useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { ParticleField } from '@/components/shared/ParticleField'
import { trackEvent, SEO_EVENTS } from '@/lib/tracking'

interface ContactForm {
  name: string
  business: string
  whatsapp: string
  message: string
  language: string
}

export function ContactInline() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelector('.contact-inner'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 75%', once: true },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true)
    setSubmitError(false)
    try {
      const res = await fetch('https://formspree.io/f/mwvgrzrk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitted(true)
        trackEvent(SEO_EVENTS.LEAD_FORM_SUBMIT, { form_location: 'homepage_inline' })
        trackEvent(SEO_EVENTS.CONTACT_FORM_SUBMIT, { form_location: 'homepage_inline' })
      } else setSubmitError(true)
    } catch {
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(15,18,53,0.04)',
    border: '1px solid rgba(15,18,53,0.12)',
    borderRadius: '10px',
    padding: '14px 16px',
    fontFamily: 'var(--font-twk-lausanne)',
    fontSize: '14px',
    fontWeight: 350,
    color: '#0F1235',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-dm-mono)',
    fontSize: '11px',
    color: '#6B3828',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '8px',
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        background: '#F6EFE4',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(60px, 10vh, 120px) clamp(24px, 6vw, 80px)',
      }}
    >
      <ParticleField className="z-0" lineCount={20} amplitude={16} opacity={0.5} />

      <div className="contact-inner" style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: '560px', margin: '0 auto',
        opacity: 0,
      }}>
        {submitted ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              border: '1.5px solid #1a8a3e',
              background: 'rgba(26,138,62,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <span style={{ fontSize: '24px', color: '#1a8a3e' }}>✓</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: '#0F1235',
              marginBottom: '12px',
            }}>
              WE&apos;LL BE IN TOUCH.
            </h2>
            <p style={{
              fontFamily: 'var(--font-twk-lausanne)',
              fontSize: '14px', fontWeight: 300,
              color: '#6B3828', lineHeight: 1.6,
            }}>
              Expect a WhatsApp message within 24 hours. Your numbers, decoded.
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 'clamp(32px, 5vh, 48px)' }}>
              <p style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '11px',
                color: '#6B3828',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Get started
              </p>
              <h2 style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(36px, 5vw, 60px)',
                color: '#0F1235',
                lineHeight: 0.95,
                marginBottom: '16px',
              }}>
                EVERY GREAT BUSINESS<br />HAS A STRATEGY BEHIND IT.
              </h2>
              <p style={{
                fontFamily: 'var(--font-editorial-new)',
                fontStyle: 'italic',
                fontSize: '17px',
                fontWeight: 300,
                color: '#6B3828',
                lineHeight: 1.5,
              }}>
                Book your Clarity Score. In 30 minutes, we&apos;ll assess your business across five dimensions and tell you exactly where the strategic gaps are. No commitment required — just clarity on where you stand and what comes next.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Your name</label>
                <input
                  {...register('name', { required: true })}
                  placeholder="Rina Akter"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#6B3828'}
                  onBlur={e => e.target.style.borderColor = 'rgba(15,18,53,0.12)'}
                />
                {errors.name && <p style={{ fontSize: '12px', color: '#c53030', marginTop: '6px' }}>Required.</p>}
              </div>

              <div>
                <label style={labelStyle}>Business name</label>
                <input
                  {...register('business', { required: true })}
                  placeholder="Glow by Rina"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#6B3828'}
                  onBlur={e => e.target.style.borderColor = 'rgba(15,18,53,0.12)'}
                />
                {errors.business && <p style={{ fontSize: '12px', color: '#c53030', marginTop: '6px' }}>Required.</p>}
              </div>

              <div>
                <label style={labelStyle}>WhatsApp number</label>
                <input
                  {...register('whatsapp', { required: true })}
                  placeholder="+880 1700 000000"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#6B3828'}
                  onBlur={e => e.target.style.borderColor = 'rgba(15,18,53,0.12)'}
                />
                {errors.whatsapp && <p style={{ fontSize: '12px', color: '#c53030', marginTop: '6px' }}>Required.</p>}
              </div>

              <div>
                <label style={labelStyle}>Tell us about your business</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="Monthly revenue, what you sell, your biggest headache right now..."
                  style={{ ...inputStyle, resize: 'none' as const }}
                  onFocus={e => e.target.style.borderColor = '#6B3828'}
                  onBlur={e => e.target.style.borderColor = 'rgba(15,18,53,0.12)'}
                />
              </div>

              <div>
                <label style={labelStyle}>Preferred language</label>
                <select {...register('language')} style={inputStyle}>
                  <option value="English">English</option>
                  <option value="Bangla">Bangla</option>
                  <option value="Both">Both (Banglish)</option>
                </select>
              </div>

              {submitError && (
                <p style={{ fontSize: '13px', color: '#c53030' }}>
                  Something went wrong. Try again or reach us directly via WhatsApp.
                </p>
              )}

              <div style={{ marginTop: '8px' }}>
                <MagneticButton size="lg" className="w-full justify-center">
                  {submitting ? 'Sending…' : 'Book your Clarity Score →'}
                </MagneticButton>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  )
}
