'use client'
import { useForm } from 'react-hook-form'
import { useState, useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { trackEvent, SEO_EVENTS } from '@/lib/tracking'

interface ContactForm {
  name: string
  email: string
  whatsapp: string
  company: string
  service: string
  message: string
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#782000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#782000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#782000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="#782000" stroke="none" />
    </svg>
  )
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
      const swooshTop = el.querySelector<HTMLElement>('.contact-swoosh-top')
      if (swooshTop) {
        gsap.fromTo(swooshTop, { scaleX: 0 }, {
          scaleX: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      }

      const headLines = el.querySelectorAll<HTMLElement>('.contact-head-line')
      headLines.forEach((line, i) => {
        gsap.fromTo(line,
          { opacity: 0, y: '100%' },
          {
            opacity: 1, y: '0%', duration: 0.7,
            ease: 'power3.out',
            delay: 0.3 + i * 0.12,
            scrollTrigger: { trigger: el, start: 'top 75%', once: true },
          },
        )
      })

      const swooshLine = el.querySelector<HTMLElement>('.contact-swoosh')
      if (swooshLine) {
        gsap.fromTo(swooshLine, { scaleX: 0 }, {
          scaleX: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 70%', once: true },
          delay: 0.7,
        })
      }

      const desc = el.querySelector<HTMLElement>('.contact-desc')
      if (desc) {
        gsap.fromTo(desc,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 65%', once: true },
            delay: 1.0,
          },
        )
      }

      el.querySelectorAll<HTMLElement>('.contact-info-item').forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: -12 },
          {
            opacity: 1, x: 0, duration: 0.5,
            ease: 'power3.out',
            delay: 1.2 + i * 0.1,
            scrollTrigger: { trigger: el, start: 'top 60%', once: true },
          },
        )
      })

      const formCard = el.querySelector<HTMLElement>('.contact-form-card')
      if (formCard) {
        gsap.fromTo(formCard,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 65%', once: true },
            delay: 0.5,
          },
        )
      }
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

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        background: '#0F1428',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(100px, 14vh, 160px) clamp(24px, 6vw, 80px) clamp(80px, 12vh, 140px)',
      }}
    >
      {/* Full-width swoosh line at top */}
      <div className="contact-swoosh-top" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, #3C3C3C 20%, #828282 40%, #AAAAAA 50%, #828282 60%, #3C3C3C 80%, transparent)',
        transformOrigin: 'center',
      }} />

      {/* Watermark */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-20px', left: '-20px',
        fontFamily: "var(--font-bebas, 'Bebas Neue', Impact, sans-serif)",
        fontSize: 'clamp(120px, 18vw, 200px)',
        color: '#1D2348',
        lineHeight: 1, letterSpacing: '-0.04em',
        transform: 'rotate(-90deg)',
        transformOrigin: 'bottom left',
        userSelect: 'none', pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        CONTACT
      </div>

      {/* Dot grid overlay */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #1D2348 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      <div style={{
        maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1,
      }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              border: '1.5px solid #782000',
              background: 'rgba(120,32,0,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <span style={{ fontSize: '24px', color: '#782000' }}>✓</span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-bebas, 'Bebas Neue', Impact, sans-serif)",
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: '#FFFFFF',
              marginBottom: '12px',
            }}>
              WE&apos;LL BE IN TOUCH.
            </h2>
            <p style={{
              fontFamily: "var(--font-twk-lausanne, 'Plus Jakarta Sans', sans-serif)",
              fontSize: '14px', fontWeight: 300,
              color: '#AAAAAA', lineHeight: 1.6,
            }}>
              Expect a WhatsApp message within 24 hours. Your numbers, decoded.
            </p>
          </div>
        ) : (
          <div className="contact-grid" style={{
            display: 'grid',
            gridTemplateColumns: '45% 55%',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start',
          }}>
            {/* Left column */}
            <div>
              {/* Eyebrow */}
              <p style={{
                fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
                fontSize: '10px', color: '#782000',
                letterSpacing: '0.25em', textTransform: 'uppercase',
                marginBottom: '24px',
              }}>
                Get in touch
              </p>

              {/* Headline — two lines with different fonts */}
              <h2 style={{ margin: '0 0 24px' }}>
                <span className="contact-head-line" style={{
                  display: 'block', overflow: 'hidden',
                }}>
                  <span style={{
                    display: 'block',
                    fontFamily: "var(--font-bebas, 'Bebas Neue', Impact, sans-serif)",
                    fontSize: 'clamp(40px, 5vw, 56px)',
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                    lineHeight: 1.05,
                  }}>
                    LET&apos;S BUILD
                  </span>
                </span>
                <span className="contact-head-line" style={{
                  display: 'block', overflow: 'hidden',
                }}>
                  <span style={{
                    display: 'block',
                    fontFamily: "var(--font-editorial-new, 'Cormorant', Georgia, serif)",
                    fontSize: 'clamp(34px, 4.5vw, 48px)',
                    fontStyle: 'italic', fontWeight: 300,
                    color: '#FFFFFF',
                    lineHeight: 1.15,
                  }}>
                    your strategy.
                  </span>
                </span>
              </h2>

              {/* Precision swoosh */}
              <div className="contact-swoosh" style={{
                width: '80px', height: '1.5px',
                background: 'linear-gradient(90deg, #3C3C3C, #AAAAAA, #3C3C3C)',
                marginBottom: '24px',
                transformOrigin: 'left',
              }} />

              {/* Description */}
              <p className="contact-desc" style={{
                fontFamily: "var(--font-twk-lausanne, 'Plus Jakarta Sans', sans-serif)",
                fontSize: '15px', fontWeight: 350,
                color: '#AAAAAA',
                lineHeight: 1.7,
                maxWidth: '400px',
                marginBottom: '48px',
                opacity: 0,
              }}>
                Whether you need an AI readiness audit or an operations diagnostic, every engagement starts with a conversation. No pitch. No pressure. Just clarity.
              </p>

              {/* Contact details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="contact-info-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0 }}>
                  <EmailIcon />
                  <span style={{
                    fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
                    fontSize: '13px', color: '#FFFFFF',
                  }}>
                    hello@zaserandco.com
                  </span>
                </div>
                <div className="contact-info-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0 }}>
                  <LocationIcon />
                  <span style={{
                    fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
                    fontSize: '13px', color: '#AAAAAA',
                  }}>
                    Dhaka, Bangladesh
                  </span>
                </div>
                <div className="contact-info-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0 }}>
                  <InstagramIcon />
                  <span style={{
                    fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
                    fontSize: '13px', color: '#AAAAAA',
                  }}>
                    @zaserandco
                  </span>
                </div>
              </div>
            </div>

            {/* Right column — form card */}
            <div className="contact-form-card" style={{
              background: '#161D33',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: 'clamp(24px, 3.5vw, 40px)',
              borderRadius: 0,
              boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
              opacity: 0,
            }}>
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Name */}
                <div>
                  <label style={labelStyle}>Your name</label>
                  <input
                    {...register('name', { required: true })}
                    placeholder="Rina Akter"
                    style={fieldStyle}
                    onFocus={e => {
                      e.target.style.borderBottomColor = '#782000'
                      const lbl = e.target.previousElementSibling as HTMLElement
                      if (lbl) lbl.style.color = '#FFFFFF'
                    }}
                    onBlur={e => {
                      e.target.style.borderBottomColor = '#3C3C3C'
                      const lbl = e.target.previousElementSibling as HTMLElement
                      if (lbl) lbl.style.color = '#828282'
                    }}
                  />
                  {errors.name && <p style={errorStyle}>Required.</p>}
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>Email address</label>
                  <input
                    type="email"
                    {...register('email', { required: true })}
                    placeholder="rina@glowbyrina.com"
                    style={fieldStyle}
                    onFocus={e => {
                      e.target.style.borderBottomColor = '#782000'
                      const lbl = e.target.previousElementSibling as HTMLElement
                      if (lbl) lbl.style.color = '#FFFFFF'
                    }}
                    onBlur={e => {
                      e.target.style.borderBottomColor = '#3C3C3C'
                      const lbl = e.target.previousElementSibling as HTMLElement
                      if (lbl) lbl.style.color = '#828282'
                    }}
                  />
                  {errors.email && <p style={errorStyle}>Required.</p>}
                </div>

                {/* WhatsApp */}
                <div>
                  <label style={labelStyle}>WhatsApp number</label>
                  <input
                    {...register('whatsapp')}
                    placeholder="+880 1700 000000"
                    style={fieldStyle}
                    onFocus={e => {
                      e.target.style.borderBottomColor = '#782000'
                      const lbl = e.target.previousElementSibling as HTMLElement
                      if (lbl) lbl.style.color = '#FFFFFF'
                    }}
                    onBlur={e => {
                      e.target.style.borderBottomColor = '#3C3C3C'
                      const lbl = e.target.previousElementSibling as HTMLElement
                      if (lbl) lbl.style.color = '#828282'
                    }}
                  />
                </div>

                {/* Company */}
                <div>
                  <label style={labelStyle}>Company name</label>
                  <input
                    {...register('company')}
                    placeholder="Glow by Rina"
                    style={fieldStyle}
                    onFocus={e => {
                      e.target.style.borderBottomColor = '#782000'
                      const lbl = e.target.previousElementSibling as HTMLElement
                      if (lbl) lbl.style.color = '#FFFFFF'
                    }}
                    onBlur={e => {
                      e.target.style.borderBottomColor = '#3C3C3C'
                      const lbl = e.target.previousElementSibling as HTMLElement
                      if (lbl) lbl.style.color = '#828282'
                    }}
                  />
                </div>

                {/* Service select */}
                <div>
                  <label style={labelStyle}>What do you need help with?</label>
                  <select
                    {...register('service')}
                    style={{ ...fieldStyle, cursor: 'pointer', appearance: 'none' as const }}
                    onFocus={e => {
                      e.target.style.borderBottomColor = '#782000'
                      const lbl = e.target.previousElementSibling as HTMLElement
                      if (lbl) lbl.style.color = '#FFFFFF'
                    }}
                    onBlur={e => {
                      e.target.style.borderBottomColor = '#3C3C3C'
                      const lbl = e.target.previousElementSibling as HTMLElement
                      if (lbl) lbl.style.color = '#828282'
                    }}
                  >
                    <option value="AI Audit & Implementation">AI Audit &amp; Implementation</option>
                    <option value="Management & Operations Strategy">Management &amp; Operations Strategy</option>
                    <option value="Not sure yet">Not sure yet — I need guidance</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Tell us more</label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="Monthly revenue, what you sell, your biggest headache right now..."
                    style={{ ...fieldStyle, resize: 'none' as const }}
                    onFocus={e => {
                      e.target.style.borderBottomColor = '#782000'
                      const lbl = e.target.previousElementSibling as HTMLElement
                      if (lbl) lbl.style.color = '#FFFFFF'
                    }}
                    onBlur={e => {
                      e.target.style.borderBottomColor = '#3C3C3C'
                      const lbl = e.target.previousElementSibling as HTMLElement
                      if (lbl) lbl.style.color = '#828282'
                    }}
                  />
                </div>

                {submitError && (
                  <p style={{ fontSize: '13px', color: '#c53030' }}>
                    Something went wrong. Try again or reach us directly via WhatsApp.
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="contact-submit-btn"
                  style={{
                    position: 'relative',
                    fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
                    fontSize: '13px', color: '#FFFFFF',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    background: '#182040',
                    border: '1.5px solid #FFFFFF',
                    padding: '16px 36px',
                    marginTop: '4px',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    transition: 'border-color 0.4s',
                    zIndex: 1,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#782000'
                    const fill = e.currentTarget.querySelector<HTMLElement>('.btn-fill')
                    if (fill) fill.style.transform = 'scaleX(1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#FFFFFF'
                    const fill = e.currentTarget.querySelector<HTMLElement>('.btn-fill')
                    if (fill) fill.style.transform = 'scaleX(0)'
                  }}
                  onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
                  onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
                >
                  <span className="btn-fill" style={{
                    position: 'absolute', inset: 0,
                    background: '#782000',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: -1,
                  }} />
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    {submitting ? 'SENDING…' : 'SEND MESSAGE →'}
                  </span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-form-card {
            order: 1;
          }
        }
        .contact-submit-btn:active {
          transform: scale(0.97);
        }
      `}</style>
    </section>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
  fontSize: '10px',
  color: '#828282',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  marginBottom: '4px',
  transition: 'color 0.3s',
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #3C3C3C',
  padding: '12px 0',
  fontFamily: "var(--font-twk-lausanne, 'Plus Jakarta Sans', sans-serif)",
  fontSize: '15px',
  fontWeight: 400,
  color: '#FFFFFF',
  outline: 'none',
  transition: 'border-color 0.3s',
}

const errorStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#c53030',
  marginTop: '6px',
  fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
}
