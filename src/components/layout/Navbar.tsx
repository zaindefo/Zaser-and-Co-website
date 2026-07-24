'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Services', href: '/#services', hasDropdown: true },
  { label: 'StockPulse', href: '/stockpulse' },
  { label: 'Insights', href: '/insights' },
  { label: 'Policies', href: '/policies' },
]

const SERVICES_DROPDOWN = [
  { label: 'AI Audit & Implementation', href: '/services/ai-audit-implementation', desc: 'We assess, build, and integrate AI systems.' },
  { label: 'Management & Operations', href: '/services/management-operations', desc: 'Cost structure diagnosis and margin recovery.' },
]

const PRODUCT_LINKS: Record<string, { dot: string; desc: string }> = {
  '/stockpulse': { dot: '#6CA0DC', desc: 'Inventory intelligence that finds frozen cash.' },
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const servicesTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  const handleServicesEnter = () => {
    if (servicesTimeout.current) clearTimeout(servicesTimeout.current)
    setServicesOpen(true)
  }

  const handleServicesLeave = () => {
    servicesTimeout.current = setTimeout(() => setServicesOpen(false), 150)
  }

  return (
    <header
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(20px, 4vw, 48px)',
        background: scrolled ? 'rgba(5,5,7,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,202,208,0.06)' : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      <div style={{
        maxWidth: '1440px', width: '100%', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" className="nav-logo" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-twk-lausanne)',
              fontWeight: 700,
              fontSize: '22px',
              letterSpacing: '0.05em',
              color: scrolled ? '#F6EFE4' : '#0F1235',
              textTransform: 'uppercase',
              transition: 'color 0.4s ease',
            }}>
              Zaser
            </span>
            <span style={{
              fontFamily: 'var(--font-twk-lausanne)',
              fontWeight: 700,
              fontSize: '22px',
              letterSpacing: '0.05em',
              color: '#8C3A1A',
              textTransform: 'uppercase',
              transition: 'color 0.4s ease',
            }}>
              {' '}& Co
            </span>
          </div>
          <span style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '9px',
            fontWeight: 500,
            color: scrolled ? 'rgba(246,239,228,0.5)' : 'rgba(107,56,40,0.5)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            opacity: scrolled ? 1 : 0,
            maxHeight: scrolled ? '14px' : '0',
            overflow: 'hidden',
            transition: 'opacity 0.4s ease, max-height 0.4s ease, color 0.4s ease',
            marginTop: '2px',
          }}>
            Strategic &amp; Management Consultancy
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '32px' }}>
          {NAV_LINKS.map((link) => {
            const product = PRODUCT_LINKS[link.href]
            const isInsights = link.label === 'Insights'
            const active = isActive(link.href)
            const isServices = link.hasDropdown

            return (
              <div
                key={link.href}
                style={{ position: 'relative' }}
                onMouseEnter={() => {
                  if (product) setHoveredProduct(link.href)
                  if (isServices) handleServicesEnter()
                }}
                onMouseLeave={() => {
                  setHoveredProduct(null)
                  if (isServices) handleServicesLeave()
                }}
              >
                <Link
                  href={link.href}
                  style={{
                    fontFamily: isInsights ? 'var(--font-editorial-new)' : 'var(--font-twk-lausanne)',
                    fontStyle: isInsights ? 'italic' : 'normal',
                    fontWeight: 500,
                    fontSize: isInsights ? '15px' : '14px',
                    letterSpacing: '0.03em',
                    color: active
                      ? (scrolled ? '#F6EFE4' : '#0F1235')
                      : (scrolled ? 'rgba(246,239,228,0.65)' : '#6B3828'),
                    textDecoration: 'none',
                    padding: '6px 0',
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'color 0.25s',
                  }}
                  className="nav-link"
                >
                  <span>{link.label}</span>
                  {product && (
                    <span style={{
                      width: '4px', height: '4px',
                      borderRadius: '50%',
                      background: product.dot,
                      display: 'inline-block',
                      marginBottom: '2px',
                      animation: 'pulse-dot 2s ease-in-out infinite',
                    }} />
                  )}
                  {isServices && (
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ marginLeft: '2px', opacity: 0.5 }}>
                      <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  )}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        height: '1px',
                        background: 'linear-gradient(90deg, rgba(200,202,208,0.1), rgba(200,202,208,0.4), rgba(200,202,208,0.1))',
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>

                {/* Services dropdown */}
                <AnimatePresence>
                  {isServices && servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 12px)',
                        left: '-16px',
                        width: '320px',
                        background: scrolled ? '#131419' : '#FFFDF8',
                        border: scrolled ? '1px solid rgba(200,202,208,0.18)' : '1px solid rgba(18,22,19,0.12)',
                        borderRadius: '12px',
                        padding: '8px',
                        zIndex: 200,
                        boxShadow: scrolled ? '0 24px 48px rgba(0,0,0,0.4)' : '0 16px 40px rgba(0,0,0,0.08)',
                      }}
                    >
                      {SERVICES_DROPDOWN.map((svc) => (
                        <Link
                          key={svc.href}
                          href={svc.href}
                          style={{
                            display: 'block',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            transition: 'background 0.15s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = scrolled ? 'rgba(246,239,228,0.06)' : 'rgba(15,18,53,0.04)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          <p style={{
                            fontFamily: 'var(--font-twk-lausanne)',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: scrolled ? '#F6EFE4' : '#0F1235',
                            marginBottom: '2px',
                          }}>
                            {svc.label}
                          </p>
                          <p style={{
                            fontFamily: 'var(--font-twk-lausanne)',
                            fontSize: '11px',
                            fontWeight: 350,
                            color: scrolled ? 'rgba(246,239,228,0.5)' : '#6B3828',
                            lineHeight: 1.4,
                          }}>
                            {svc.desc}
                          </p>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Product hover card */}
                <AnimatePresence>
                  {product && hoveredProduct === link.href && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 12px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '220px',
                        background: '#131419',
                        border: '1px solid rgba(200,202,208,0.18)',
                        borderRadius: '10px',
                        padding: '16px 18px',
                        zIndex: 200,
                        boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
                      }}
                    >
                      <p style={{
                        fontFamily: 'var(--font-dm-mono)',
                        fontSize: '10px',
                        color: 'rgba(200,202,208,0.45)',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        marginBottom: '8px',
                      }}>
                        Product
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-bebas)',
                        fontSize: '22px',
                        color: '#E2E4E9',
                        lineHeight: 1,
                        marginBottom: '8px',
                      }}>
                        {link.label.toUpperCase()}™
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-twk-lausanne)',
                        fontSize: '12px',
                        fontWeight: 300,
                        color: 'rgba(200,202,208,0.45)',
                        lineHeight: 1.5,
                        marginBottom: '10px',
                      }}>
                        {product.desc}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-twk-lausanne)',
                        fontSize: '11px',
                        fontWeight: 500,
                        color: 'rgba(200,202,208,0.6)',
                        letterSpacing: '0.04em',
                      }}>
                        Explore →
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/free-business-audit"
          className="hidden md:block"
          style={{
            fontFamily: 'var(--font-twk-lausanne)',
            fontWeight: 600,
            fontSize: '13px',
            letterSpacing: '0.04em',
            padding: '9px 20px',
            borderRadius: '6px',
            border: scrolled ? '1px solid rgba(246,239,228,0.25)' : '1px solid rgba(15,18,53,0.2)',
            background: 'transparent',
            color: scrolled ? '#F6EFE4' : '#0F1235',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'all 0.25s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = scrolled ? 'rgba(246,239,228,0.08)' : 'rgba(15,18,53,0.06)'
            e.currentTarget.style.borderColor = scrolled ? 'rgba(246,239,228,0.4)' : 'rgba(15,18,53,0.35)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = scrolled ? 'rgba(246,239,228,0.25)' : 'rgba(15,18,53,0.2)'
          }}
        >
          Free business audit
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            width: '24px', padding: 0,
            display: 'flex', flexDirection: 'column', gap: '5px',
          }}
        >
          <span style={{
            height: '1px', width: '100%',
            background: scrolled ? '#F6EFE4' : '#0F1235',
            transition: 'all 0.3s',
            transform: open ? 'rotate(45deg) translateY(4.5px)' : 'none',
          }} />
          <span style={{
            height: '1px', width: '100%',
            background: scrolled ? '#F6EFE4' : '#0F1235',
            transition: 'all 0.3s',
            opacity: open ? 0 : 1,
          }} />
          <span style={{
            height: '1px', width: '100%',
            background: scrolled ? '#F6EFE4' : '#0F1235',
            transition: 'all 0.3s',
            transform: open ? 'rotate(-45deg) translateY(-4.5px)' : 'none',
          }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{
              position: 'absolute',
              top: '72px', left: 0, right: 0,
              background: 'rgba(5,5,7,0.95)',
              backdropFilter: 'blur(24px)',
              overflow: 'hidden',
              borderBottom: '1px solid rgba(200,202,208,0.06)',
            }}
          >
            <nav style={{ padding: '20px clamp(20px, 4vw, 48px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{
                      fontFamily: 'var(--font-twk-lausanne)',
                      fontWeight: 500,
                      fontSize: '16px',
                      color: '#F6EFE4',
                      textDecoration: 'none',
                      display: 'block',
                      padding: '4px 0',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile services sub-links */}
              <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {SERVICES_DROPDOWN.map((svc) => (
                  <Link
                    key={svc.href}
                    href={svc.href}
                    onClick={() => setOpen(false)}
                    style={{
                      fontFamily: 'var(--font-twk-lausanne)',
                      fontWeight: 400,
                      fontSize: '13px',
                      color: 'rgba(246,239,228,0.6)',
                      textDecoration: 'none',
                      display: 'block',
                    }}
                  >
                    {svc.label}
                  </Link>
                ))}
              </div>

              <Link
                href="/free-business-audit"
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: 'var(--font-twk-lausanne)',
                  fontWeight: 600,
                  fontSize: '13px',
                  letterSpacing: '0.04em',
                  padding: '12px 20px',
                  borderRadius: '6px',
                  border: '1px solid rgba(246,239,228,0.25)',
                  background: 'transparent',
                  color: '#F6EFE4',
                  textDecoration: 'none',
                  textAlign: 'center',
                  marginTop: '8px',
                }}
              >
                Free business audit
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </header>
  )
}
