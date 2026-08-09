# Zaser & Co Editorial Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild every existing Zaser & Co route as one immersive, factual, accessible editorial website without changing public URLs.

**Architecture:** Typed local content modules feed static App Router pages and reusable editorial route templates. Shared brand, motion, artefact, and form primitives create a consistent system, while each route family supplies its own narrative composition. GSAP is reserved for major scroll chapters; CSS and server-rendered content provide the baseline and reduced-motion experience.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS, GSAP, Framer Motion, Lenis, React Hook Form, Formspree, Node test runner, TypeScript compiler.

## Global Constraints

- Preserve every current route and canonical URL.
- Sell exactly two services: AI Audit & Implementation and Management & Operations Strategy.
- Use navy `#182040`, deep navy `#0F1428`, paper `#F3EEE5`, restrained rust `#782000`, and approved neutrals.
- Use Bebas Neue, Instrument Serif, Plus Jakarta Sans, and DM Mono.
- Remove all named clients, testimonials, unsupported statistics, ROI, placeholder WhatsApp details, and fabricated case studies.
- Keep StockPulse as an implementation example, never a third offer.
- All motion must preserve native scrolling and provide mobile and reduced-motion fallbacks.

---

### Task 1: Typed content and integrity contracts

**Files:**
- Create: `src/content/site.ts`, `services.ts`, `insights.ts`, `industries.ts`, `audits.ts`, `policies.ts`, `outputs.ts`
- Create: `src/lib/content-integrity.ts`
- Create: `tests/content-integrity.test.ts`
- Modify: `src/lib/constants.ts`

**Interfaces:**
- Produces typed `Service`, `Insight`, `IndustryPage`, `AuditPage`, `Policy`, and `EngagementOutput` collections.
- Produces `auditContentIntegrity()` returning string violations for banned proof claims, unsupported metrics, invalid contact details, and service-count errors.

- [ ] Write tests proving the content system exposes exactly two services and zero integrity violations.
- [ ] Run the tests and confirm they fail because the new modules do not exist.
- [ ] Implement the typed collections with factual copy from the approved source documents.
- [ ] Run the tests and remove every reported proof or contact violation.
- [ ] Run the production build and commit the content foundation.

### Task 2: Lead form contract

**Files:**
- Create: `src/lib/lead-form.ts`, `src/components/shared/LeadForm.tsx`
- Create: `tests/lead-form.test.ts`
- Modify: contact and audit route consumers.

**Interfaces:**
- `LeadFormValues`: `name`, `business`, `email`, `message`, `language`, `inquiryType`, `sourcePage`.
- `validateLeadForm(values)` returns field-level errors.
- `createLeadPayload(values)` trims values and preserves source attribution.

- [ ] Write failing tests for required fields, invalid email, trimmed payloads, and source attribution.
- [ ] Implement validation and payload creation until tests pass.
- [ ] Build the accessible shared form with labeled fields, focus states, `aria-live`, and success/error states.
- [ ] Integrate Formspree without a production submission during tests.

### Task 3: Global editorial system

**Files:**
- Modify: `src/app/globals.css`, `src/app/layout.tsx`, Tailwind configuration.
- Replace: global navigation, footer, global effects, transition wrapper.
- Create: editorial reveal, theme chapter, artefact surface, reading progress, and motion preference primitives.

- [ ] Establish the exact brand tokens, typography, spacing, focus, texture, and responsive rules.
- [ ] Replace Cormorant with Instrument Serif using optimized Next font loading.
- [ ] Build the thin theme-aware navigation, accessible menu, skip link, and full visual footer.
- [ ] Remove global cursor, particle, glow, chrome, and unrelated effect mounting.
- [ ] Verify server rendering, keyboard navigation, and reduced-motion CSS before route work.

### Task 4: Original visual suite

**Files:**
- Create project-bound optimized assets under `public/images/editorial/`.
- Create code-native artefacts under `src/components/artifacts/`.

- [ ] Generate and inspect a hero image, point-of-view image, two service images, closing image, and three insight images using the approved limited-ink prompt system.
- [ ] Copy final selected images into the project and optimize to WebP/AVIF without generated text.
- [ ] Build labeled readiness, priority, architecture, handover, cost, process, leakage, roadmap, and dashboard artefacts in HTML/SVG.
- [ ] Verify alt text, cropping, responsive sources, file sizes, and visual consistency.

### Task 5: Homepage and conversion flow

**Files:**
- Replace homepage composition and its home-specific components.

- [ ] Build the asymmetric editorial hero and point-of-view chapter.
- [ ] Build exactly two dominant service panels.
- [ ] Build the pinned dual-lane method sequence with mobile and reduced-motion alternatives.
- [ ] Build the artefact field, four operating principles, and horizontal engagement-output sequence.
- [ ] Rebuild insights and final conversion chapters using the shared lead form and global footer.

### Task 6: Service, editorial, and sector routes

**Files:**
- Replace service template, insight index/article templates, industry template, and both local SEO pages.

- [ ] Give each service a distinct artefact-led process scene and factual deliverables.
- [ ] Rebuild the insight index as an asymmetric publication and each article with progress, chapter navigation, pull statements, and labeled examples.
- [ ] Rebuild industry and local SEO pages around factual tensions, diagnostic maps, both services, and audit conversion.
- [ ] Preserve static params, metadata, canonical URLs, and related-link behavior.

### Task 7: Audit, About, Contact, Policies, StockPulse, and 404

**Files:**
- Replace the remaining route pages and relevant shared templates.

- [ ] Build distinct AI and business audit narratives with embedded source-tagged forms.
- [ ] Rebuild About and Contact with factual editorial chapters and the shared form.
- [ ] Publish all 15 policies with sticky index, progress, and long-form semantics.
- [ ] Reframe StockPulse as an operational-system example and retain its dashboard storytelling.
- [ ] Rebuild 404 and Open Graph output in the editorial system.

### Task 8: Verification and branch completion

**Files:**
- Create: `scripts/verify-content.mjs`, `scripts/verify-routes.mjs`
- Modify: `package.json` scripts.

- [ ] Run unit tests and the content-integrity audit.
- [ ] Run the production build and sitemap generation.
- [ ] Start the production server and crawl all 21 route outputs for successful responses, titles, canonical tags, and internal-link integrity.
- [ ] Inspect desktop, tablet, and mobile screenshots plus reduced-motion and keyboard behavior.
- [ ] Confirm banned names, placeholder phone details, unsupported proof, stale colors, and contradictory policy wording are absent.
- [ ] Run final accessibility, SEO, and performance checks, then use verification-before-completion and finishing-a-development-branch.

