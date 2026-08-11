# Engagement Rail Design Specification

Date: 2026-08-11

Status: Approved for implementation

## Objective

Replace the homepage "Two engagements with eight visible stages" section with the Engagement Rail, a pinned scroll narrative that explains Zaser & Co's two consulting engagements through one evolving visual canvas.

The section must help a visitor understand the service, the stage sequence, the change at each stage, and the output the client receives. The visual language must feel diagnostic, editorial, calm, and precise.

This rebuild affects the homepage How We Work section only. The approved cinematic hero and homepage service section remain unchanged.

## Service Scope

The Engagement Rail presents two services:

1. AI Audit & Implementation
2. Management & Operations Strategy

The rail contains eight stages in this order:

1. AI Assess
2. AI Prioritise
3. AI Build
4. AI Hand Over
5. Operations Diagnose
6. Operations Map
7. Operations Prioritise
8. Operations Roadmap

StockPulse remains outside the rail because it represents a system example rather than a consulting service.

## Experience Structure

### Desktop and tablet

At widths of 901px and above, the section uses a pinned, full-height composition on a deep navy background. ScrollTrigger pins the composition for about 240 percent of the viewport height and divides the travel into eight equal stage zones.

The pinned container uses two columns:

- Left column: 40 percent of the available width
- Right column: 60 percent of the available width

The layout reserves top space for the site navigation and keeps a slim stage rail at the bottom.

The left column contains:

- `[ HOW WE WORK ]`
- Two interactive service tabs
- Active stage counter
- Stage title
- Instrument Serif strategic line
- Short Plus Jakarta Sans explanation

The right column contains one `engagement-canvas` SVG. The canvas persists through all eight stages.

The bottom rail shows four steps for the active service. It displays the following labels:

- AI: Assess, Prioritise, Build, Hand Over
- Operations: Diagnose, Map, Prioritise, Roadmap

The active step uses white structure and a rust marker. Inactive steps use the approved muted grey. Text and shape changes reinforce the active state so color does not carry the meaning alone.

### Interactive service tabs

The tabs use native buttons with `aria-selected`, visible focus, and descriptive labels. Activating the AI tab scrolls to stage 1. Activating the Operations tab scrolls to stage 5. Scroll progress keeps the selected tab synchronized with the current stage.

Tab activation calculates the destination from the ScrollTrigger start and end values. The handler uses the page's native scroll position and does not add a second navigation system.

### Mobile

Screens at 900px and below do not use ScrollTrigger or pinning.

Mobile retains the same single SVG canvas above a horizontal, snap-aligned sequence of eight stage cards. The cards form one continuous rail in the approved stage order. Swiping or keyboard scrolling selects the nearest card and applies that card's SVG target values through React state without GSAP.

The service tabs jump to card 1 or card 5. The cards expose the stage counter, title, strategic line, and body copy. Decorative micro-labels may be hidden when space is limited.

The mobile layout must work at 390px and 320px without page-level horizontal overflow. Horizontal movement stays inside the stage rail.

### Reduced motion

Reduced-motion mode disables pinning, scrub animation, line drawing, and large transforms. The page presents the same continuous eight-card content and the same single SVG. Stage selection applies the SVG state without animation.

All content remains visible and usable if GSAP does not load.

## Single SVG Continuity Engine

### Canvas rules

The canvas uses one SVG element with a `0 0 960 640` viewBox. The SVG renders a stable collection of shared primitives:

- Five primary object slots
- Two route paths
- Two axis paths
- Four workflow blocks
- Five reusable marker slots
- Five reusable text labels
- One rust emphasis marker

The component does not mount separate SVG scenes or document sheets. It changes the attributes of these primitives between stage states.

Each stage defines target values for:

- Position
- Size
- Path geometry
- Opacity
- Stroke color
- Fill color
- Label text
- Label alignment
- Visibility

The stage transition function receives the current and target values and animates the shared elements to the target state. The canvas never crossfades a complete scene.

### Visual limits

Each stage may show up to five readable labels, five major objects, and one rust highlight. The canvas uses 1px or 2px linework, generous negative space, and a thin muted frame.

White marks active structure. Grey marks context. Rust marks the selected opportunity, risk, bottleneck, or action. The design excludes shadows, browser chrome, cards, gauges, dashboard controls, glow treatments, and fake application furniture.

The root layout loads Bebas Neue through `next/font` as `--font-bebas`. Engagement Rail section titles and stage names use that scoped variable. Existing display typography elsewhere on the site remains unchanged.

## Stage Content and Visual States

### 01 AI Assess

Title: Assess

Strategic line: Read the business before choosing the technology.

Body: Strategy, Data, Technology, People, and Governance reveal where AI can create credible value.

The SVG shows five horizontal diagnostic rows labeled Strategy, Data, Technology, People, and Governance. Each row receives one score marker. One rust opportunity node marks the highest-value area.

Rows draw in sequence. Labels enter with a restrained opacity change. Markers slide into position. The rust node appears after the row structure settles.

### 02 AI Prioritise

Title: Prioritise

Strategic line: Not every automation deserves to be built.

Body: Opportunities are ranked by business impact, feasibility, cost, and operational fit.

The five rows collapse into two matrix axes. Their score markers become five opportunity dots. Low-value dots dim. One selected rust dot grows by a small amount and receives the label `SELECTED USE CASE`.

### 03 AI Build

Title: Build

Strategic line: Make one system work inside the operation.

Body: The highest-value use case becomes a practical workflow connected to how the team already works.

The selected matrix dot expands into the Input block. Decision, AI Support, and Output unfold from left to right. One rust route joins the blocks. The final block receives the label `SYSTEM BUILT` after the route reaches it.

### 04 AI Hand Over

Title: Hand Over

Strategic line: Leave ownership with the team.

Body: Documentation, operating instructions, and training make the implemented system usable after delivery.

The four workflow blocks align into checklist rows. The route settles into a completion spine. Rows show Documentation, Owner assigned, Training complete, and Operating instructions. Check marks appear in sequence. A low-opacity `READY` status closes the engagement.

### 05 Operations Diagnose

Title: Diagnose

Strategic line: See cost, flow, and margin as one system.

Body: We identify where money, time, and capacity are leaking before changing the structure.

The AI completion spine settles into four cost rows. Two leakage markers appear, followed by one rust risk indicator and the label `LEAKAGE DETECTED`. The leakage marks pulse once and then remain still.

### 06 Operations Map

Title: Map

Strategic line: Make the hidden structure visible.

Body: Cost behaviour is mapped alongside process steps, ownership, and operational friction.

The cost rows reorganize into five nodes labeled Sales, Purchasing, Fulfilment, Finance, and Reporting. One route connects the nodes. A rust outline identifies the bottleneck.

### 07 Operations Prioritise

Title: Prioritise

Strategic line: Separate consequential change from noise.

Body: The highest-impact fixes are ranked before the roadmap is built.

The operating nodes compress into three intervention rows. The rows use the headings Issue, Impact, and Effort. Secondary rows reduce in opacity while the first row moves forward by a small distance.

### 08 Operations Roadmap

Title: Roadmap

Strategic line: Sequence the next 90 days.

Body: Actions receive an owner, a measure, and a deadline.

The ranked rows stretch into Month 1, Month 2, and Month 3 lanes. Each lane receives one action and one milestone point. A single route connects the milestones. The final label reads `ROADMAP SET`.

## Continuity Map

The transition design preserves shared geometry across the story:

| Transition | Transformation |
| --- | --- |
| Assess to Prioritise | Diagnostic rows collapse into axes. Score markers move into opportunity positions. |
| Prioritise to Build | The selected dot expands into Input. Other blocks unfold from the selected route. |
| Build to Hand Over | Workflow blocks align into checklist rows. The route becomes a completion spine. |
| AI to Operations | The completion spine settles into cost rows. |
| Diagnose to Map | Cost rows reorganize into operating nodes. |
| Map to Prioritise | Operating nodes compress into ranked rows. |
| Prioritise to Roadmap | Ranked rows stretch into monthly lanes and milestone points. |

## Motion System

The desktop and tablet controller loads GSAP and ScrollTrigger through dynamic imports. It registers one ScrollTrigger instance for the rail.

Configuration:

- Start: `top top`
- End: `+=240%`
- Scrub: `0.8`
- Pin: rail container
- Anticipate pin: `1`

Stage transitions use opacity, position, scale, path geometry, line length, and stroke dash offset. Transition durations stay between 0.6s and 0.9s. Line drawing uses 0.8s to 1.2s. Label stagger stays between 0.08s and 0.14s. Easing uses `power3.out` or `expo.out`.

The motion system excludes bounce, elastic easing, glow, rapid switching, and large perspective effects.

## Component Boundaries

### `engagement-rail-data.ts`

Exports typed stage copy, service metadata, progress labels, and SVG target values. This file contains no React code or animation code.

### `EngagementRail.tsx`

Renders the section structure and owns the active stage. It connects service tabs, stage copy, progress labels, mobile selection, and canvas state.

### `EngagementCanvas.tsx`

Renders the single SVG and exposes references to its stable primitives. It accepts an active state for initial and non-GSAP rendering.

### `useEngagementRailMotion.ts`

Loads GSAP, creates the ScrollTrigger, maps progress to stage indices, transforms SVG primitives, handles tab-to-scroll navigation, refreshes measurements, and reverts its GSAP context during cleanup.

### `MobileStageRail.tsx`

Renders the eight scroll-snap cards. An intersection observer identifies the centered card and sends its stage index to `EngagementRail`.

## State Flow

Scroll progress, service-tab activation, or mobile card selection produces a stage index from 0 through 7. `EngagementRail` uses that index to update:

- Active service tab
- Counter
- Title and copy
- Four-step progress rail
- SVG target state

Desktop and tablet send target values through GSAP. Mobile and reduced-motion modes apply the target state without GSAP.

## Accessibility

- Native buttons support the service tabs.
- `aria-selected` identifies the active service.
- Visible focus treatment uses white and rust without reducing contrast.
- Text and structural marks identify active stages in addition to color.
- A visually hidden ordered list exposes all eight stages to assistive technology on desktop. The visible mobile cards provide the ordered content at 900px and below.
- The SVG uses a descriptive title and description tied to the active stage.
- Decorative SVG elements stay hidden from assistive technology.
- Reduced-motion mode removes pinned and scrubbed movement.
- Mobile cards support touch, keyboard scrolling, and scroll snapping.

## Resilience and Cleanup

The first stage renders before client-side code runs. Dynamic imports keep the section readable if GSAP fails. The animation hook reverts its GSAP context, removes ScrollTrigger listeners, and cancels pending state updates when the component unmounts.

Breakpoint changes rebuild the motion controller from current dimensions. Each rail owns one ScrollTrigger instance, which prevents stale pins and duplicate progress updates.

## Verification

Automated checks must confirm:

- Two approved services
- Eight stages in the approved order
- One SVG canvas
- Accessible interactive service tabs
- One continuous mobile card rail
- No consulting artefact sheet imports
- No dashboard, dossier, fake browser, or legacy method classes
- Reduced-motion fallback markup and media-query behavior
- Unchanged cinematic hero component

Browser verification must cover:

- Desktop at 1440px
- Tablet at 1024px
- Mobile at 390px and 320px
- Desktop pin start and release
- All eight scroll zones
- Tab jumps to stages 1 and 5
- Mobile snap selection and service jumps
- No page-level horizontal overflow
- No clipped SVG labels
- No duplicate ScrollTriggers
- No browser console errors

The final verification includes the full test suite, a production Next.js build, and a homepage visual review with standard and reduced-motion preferences.

## Exclusions

This work does not modify the cinematic hero, homepage services, route templates, consulting artefacts used elsewhere, navigation, footer, or form system. It does not add WebGL, scroll hijacking, dashboard mockups, document-sheet collections, or electric switching effects.
