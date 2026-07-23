# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```powershell
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build — run via PowerShell (path has spaces)
npm run start    # Serve production build
```

> **Windows note:** The project path `C:\Users\Kazi Technology\Downloads\Zaser & Co website` contains spaces and an `&`. Running `npm run build` in Bash will fail. Always use PowerShell: `cd "C:\Users\Kazi Technology\Downloads\Zaser & Co website"; npm run build`.

No test runner or linter is configured.

---

## Session History & Decisions

### What was built (phases 1–4, now complete)

1. **Full Next.js 16 App Router site** — 5 pages: Home, BreakPoint (`/breakpoint`), StockPulse (`/stockpulse`), About, Contact.
2. **GSAP animation system** — Lenis smooth scroll, ScrollTrigger pinned sections, scrub timelines, custom cursor, particle canvas, scroll progress bar, Easter eggs (Konami code).
3. **Cost breakdown pinned decomposition** (`BlindGrowth.tsx`) — GSAP scrub timeline decomposes ৳8,00,000 revenue into cost layers with a live progress bar and animated counter. Keep this intact.
4. **StaggerReveal + PageTransition** shared components wired into layout.

### Design system migration (current session — IN PROGRESS)

The original dark chrome/metallic identity was replaced with a **NewForm editorial broadsheet** aesthetic:

| What changed | Details |
|---|---|
| Background | Dark navy `#050507` → Linen `#fafffa` |
| Accent | Emerald `#00D181` → Voltage `#2bee4b` |
| Text | Silver spectrum → Obsidian Ink `#121613` / Sage `#516254` |
| Fonts | Clash Display / Cabinet Grotesk → TWK Lausanne + Editorial New + PP Mondwest |
| Removed | Film grain, grid background, metallic shimmer, particles, chrome glow shadows |
| Preserved | All GSAP/Framer Motion animations, Lenis, custom cursor, scroll progress, Easter eggs |

**Reference site:** newformcap.com — editorial broadsheet, spacious, typography-driven.

---

## Architecture

Next.js 16 App Router marketing site for Zaser & Co (Bangladeshi online business consultancy).

**Copy is centralized** in `src/lib/constants.ts` — all headlines, stats, stories, FAQs, testimonials, and nav links. Components pull from constants; **never hardcode copy in JSX**.

**Branded terms are IP** — never rename or rephrase: Zero Day, BreakPoint™, StockPulse™, Clarity Score™, Dead Shelf, Velocity Score, Burn Calendar™, Revenue Leak, Profit Pulse, Blind Growth.

### Key shared components

- `src/components/shared/ScrollReveal.tsx` — Framer Motion fade/slide wrapper (fires once on scroll-into-view)
- `src/components/shared/StaggerReveal.tsx` — children stagger in with 60ms delay between each
- `src/components/shared/PageTransition.tsx` — Framer Motion AnimatePresence page wrapper
- `src/components/shared/MagneticButton.tsx` — primary CTA, now styled as Voltage button (no GSAP magnetic; dual-layer green shadow)
- `src/components/shared/CountUp.tsx` — animates numbers from 0 to target on scroll
- `src/components/shared/DashboardMock.tsx` / `StockMock.tsx` — animated product previews
- `src/components/shared/WordReveal.tsx` — word-by-word reveal animation
- `src/components/shared/CustomCursor.tsx` — dot+ring cursor (desktop only)
- `src/lib/utils.ts` — `cn()` for class merging, `formatBDT()` for BDT lakh notation (৳1,77,778)

### Layout

`src/app/layout.tsx` renders `<Navbar />` and `<Footer />` around all pages.

---

## Design System (NewForm Editorial)

### Color tokens (defined in `tailwind.config.ts` + `src/app/globals.css`)

| Token | Hex | Role |
|---|---|---|
| `linen` | `#fafffa` | Page background (canvas) |
| `obsidian-ink` | `#121613` | Headlines, primary text |
| `voltage` | `#2bee4b` | CTAs, accent marks, Voltage button |
| `sage` | `#516254` | Body copy, muted text |
| `mist` | `#c8d2c8` | Hairline borders, dividers |
| `bark` | `#232924` | Footer dark surface |
| `moss-glow` | `#93b799` | Decorative accents |
| `pollen` | `#c4e4c9` | Light decorative accents |

**Functional colors** (CSS variables only, for data viz — NOT Tailwind classes):
- `var(--z-profit)` = `#1a8a3e`
- `var(--z-loss)` = `#c53030`
- `var(--z-caution)` = `#b7791f`
- `var(--z-accent)` = `#2bee4b`

### Typography

Four font families — **none are Google Fonts** (TWK Lausanne, Editorial New, PP Mondwest are premium fonts; they fall back to system fonts until self-hosted):

| Family | Weights | Role |
|---|---|---|
| TWK Lausanne | 200, 350, 400, 550 | Primary UI, nav, body, labels |
| Editorial New | 300 | Display headlines (140px, 240px) |
| PP Mondwest | 400 | Secondary display (165px, 295px) |
| Times | 400 | Captions, micro-copy |

**Typography CSS classes** (defined in `globals.css @layer base`):
- `.text-caption` — 11px TWK Lausanne 550
- `.text-body-sm` — 14px TWK Lausanne 200
- `.text-body-sm-2` — 14px TWK Lausanne 350
- `.text-body` — 16px Times 400
- `.text-subheading` — 18px TWK Lausanne 200
- `.text-heading-sm` — 60px PP Mondwest 400
- `.text-heading` — 72px TWK Lausanne 550
- `.text-heading-lg` — 96px TWK Lausanne 550
- `.text-display` — 140px Editorial New 300 (tight 0.9 leading)
- `.text-display-xl` — 240px Editorial New 300
- `.text-display-xxl` — 295px PP Mondwest 400

### Key design rules

- Line-height `0.9` on all display sizes — lines nearly touch (signature look)
- No box shadows except on Voltage CTA button (dual green tint: `rgba(16,94,29,0.45)` + `rgba(18,146,39,0.25)`)
- No bordered cards, filled panels, elevated surfaces — type hierarchy alone
- No grid background, film grain, or particle canvas
- All BDT amounts use `font-mono` (JetBrains Mono) and lakh format via `formatBDT()`
- Navbar: minimal, no glassmorphism — just linen background + mist bottom border
- Footer: inverted — `bg-bark` / `text-linen`

### Component classes (in `globals.css @layer components`)

- `.section-padding` — `px-6 md:px-12 lg:px-20 py-20 md:py-32 lg:py-40`
- `.page-container` — `max-w-page mx-auto` (1440px)
- `.card` — linen surface, mist border, 14px radius, hover darkens border
- `.btn-voltage` — Voltage fill, obsidian-ink text, 10px radius, dual green shadow
- `.btn-ghost` — unstyled link, underline on hover, turns voltage color
- `.accent-tick` — 1px tall voltage green line (48px wide)

---

## What Needs Fixing (Remaining Work)

### Priority 1 — Stale color classes (still breaking visual)

Several components still use old CSS variable names that no longer exist:

| File | Stale classes to replace |
|---|---|
| Various home sections | `text-z-chrome` → `text-sage`, `text-z-loss` → `style={{ color: 'var(--z-loss)' }}` |
| `CustomCursor.tsx` | Hardcoded hex colors may reference old dark palette |
| `DashboardMock.tsx` / `StockMock.tsx` | SVG strokes / bar fills may use old `z-accent`/`z-chrome` |
| `SectionDivider.tsx` | May still reference old color classes |
| `src/app/about/page.tsx` | Any `section-dark`, `bg-z-*`, `text-z-*` classes |
| `src/app/contact/page.tsx` | Input focus ring, border colors |
| `src/app/not-found.tsx` | Background, text colors |

### Priority 2 — Font loading

TWK Lausanne, Editorial New, and PP Mondwest are **premium fonts not on Google Fonts**. Currently falling back to system sans-serif. To render correctly:
1. Self-host font files in `public/fonts/`
2. Add `@font-face` declarations in `globals.css`
3. Remove the Google Fonts `@import` for Noto Serif Bengali (keep only — or move to `@font-face`)

Until fonts are loaded, the editorial typography scale will render in Inter/system-ui. The sizing and spacing will be correct but the voice won't match.

### Priority 3 — Image placeholders

All image tiles are currently `<div className="w-full aspect-square bg-obsidian-ink rounded-card" />` black boxes. Replace with:
- B&W or desaturated editorial photography
- Keep `rounded-card` (14px radius)
- No color photography — desaturated or duotone only (design rule)

### Priority 4 — Navbar brandmark

The wordmark reads "New Form" (split: obsidian "New" + voltage "Form") — this is a placeholder. The real brand is **Zaser & Co**. Once a dark-on-transparent logo asset is available:
- Replace the wordmark split in `Navbar.tsx` and `Footer.tsx`
- Or update the text to "Zaser" + " & Co" with the same color split

---

## Conventions

- `'use client'` required on any component using React hooks or Framer Motion
- Home page sections live in `src/components/home/` — each self-contained, assembled in `src/app/page.tsx`
- Product page components live in `src/components/product/`
- Contact form submits to Formspree (endpoint placeholder in `src/app/contact/page.tsx`)
- **Never use old color classes:** `bg-z-black`, `bg-z-surface`, `text-z-chrome`, `text-z-chrome-peak`, `metallic-text`, `grid-bg` — these are deleted
- Use functional color CSS vars (`var(--z-profit)` etc.) via inline `style={}` for data viz only

## Animation stack

- **Lenis** — smooth scroll (initialized in `src/lib/lenis.ts`, called from `GlobalEffects`)
- **GSAP 3 + ScrollTrigger** — pinned sections, scrub timelines. Initialized in `src/lib/gsap.ts`
- **Framer Motion** — page transitions, micro-interactions
- **Custom cursor** — dot + ring (desktop only, `@media (hover: hover)`)

### Animation rules

- Default easing: `[0.22, 1, 0.36, 1]` (confident deceleration)
- Max duration: 1.2s (except cost breakdown pinned sequence — that runs for 3000px scroll)
- GSAP ScrollTrigger: `scrub: 1`
- Respect `prefers-reduced-motion: reduce` — all animations off via CSS
- No particle canvas, no grain, no grid in the new design
