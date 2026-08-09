'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FULL_NAV, PRIMARY_NAV } from '../../content/site'

export function EditorialNav() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const update = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme]'))
      const active = sections.find((section) => {
        const rect = section.getBoundingClientRect()
        return rect.top <= 72 && rect.bottom > 72
      })
      setDark(active?.dataset.navTheme === 'dark')
    }

    const main = document.querySelector('.site-main')
    const observer = new MutationObserver(update)
    if (main) observer.observe(main, { childList: true, subtree: false })
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    window.addEventListener('zaser:nav-theme-change', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      window.removeEventListener('zaser:nav-theme-change', update)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`editorial-nav${dark && !open ? ' editorial-nav--dark' : ''}${open ? ' editorial-nav--open' : ''}`}>
      <nav aria-label="Primary navigation" className="editorial-nav__bar">
        <Link className="wordmark" href="/" onClick={() => setOpen(false)}>Zaser &amp; Co</Link>
        <div className="editorial-nav__links">
          {PRIMARY_NAV.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </div>
        <div className="editorial-nav__actions">
          <Link className="nav-audit" href="/free-business-audit">Free business audit</Link>
          <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <span /><span />
          </button>
        </div>
      </nav>
      <div className="editorial-menu" aria-hidden={!open}>
        <div className="editorial-menu__links">
          {[...PRIMARY_NAV, ...FULL_NAV].map((item, index) => (
            <Link key={`${item.href}-${index}`} href={item.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <span>{String(index + 1).padStart(2, '0')}</span>{item.label}
            </Link>
          ))}
        </div>
        <p>Dhaka, Bangladesh<br />Advisory That Builds.</p>
      </div>
    </header>
  )
}
