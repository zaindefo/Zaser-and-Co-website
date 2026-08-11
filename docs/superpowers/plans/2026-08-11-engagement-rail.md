# Engagement Rail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage's static two-dossier method section with one pinned, eight-stage Engagement Rail built around a single evolving SVG canvas.

**Architecture:** Typed stage content and typed SVG target states drive one stable set of SVG primitives. A client-side rail controller synchronizes scroll position, service tabs, stage copy, progress labels, mobile snap cards, and the canvas. GSAP and ScrollTrigger run only at widths of 901px and above when reduced motion is disabled.

**Tech Stack:** Next.js 16 App Router, React 18, TypeScript, SVG, GSAP 3 with ScrollTrigger, CSS scroll snap, Node test runner, React server rendering tests.

## Global Constraints

- Keep exactly two services: AI Audit & Implementation and Management & Operations Strategy.
- Keep the stage order: AI Assess, AI Prioritise, AI Build, AI Hand Over, Operations Diagnose, Operations Map, Operations Prioritise, Operations Roadmap.
- Render one `.engagement-canvas` SVG in the section.
- Reuse five object slots, two axis paths, two route paths, five marker slots, five label slots, and one status label.
- Use one rust emphasis per stage.
- Use GSAP only at widths of 901px and above when `prefers-reduced-motion` does not request reduction.
- Use one continuous, snap-aligned eight-card rail at widths of 900px and below.
- Make the two service tabs interactive. AI jumps to stage 1 and Operations jumps to stage 5.
- Preserve the approved `CinematicHero` and homepage services section without code or CSS changes.
- Remove the old dossier, method-stage, and consulting-sheet presentation from How We Work.
- Do not add dashboard mockups, fake browser chrome, WebGL, glow effects, bounce, elastic easing, or scroll hijacking.

Reference specification: `docs/superpowers/specs/2026-08-11-engagement-rail-design.md`

---

## File Structure

Create these focused files:

- `src/components/home/engagement-rail/types.ts`: shared stage and SVG target types.
- `src/components/home/engagement-rail/stages.ts`: approved service and stage copy.
- `src/components/home/engagement-rail/visual-states.ts`: the eight exact SVG target states.
- `src/components/home/engagement-rail/visual-state-dom.ts`: DOM attribute application shared by mobile, reduced motion, and GSAP setup.
- `src/components/home/engagement-rail/EngagementCanvas.tsx`: the one stable SVG canvas.
- `src/components/home/engagement-rail/MobileStageRail.tsx`: the eight-card mobile scroll-snap rail.
- `src/components/home/engagement-rail/useEngagementRailMotion.ts`: desktop GSAP and ScrollTrigger controller.
- `src/components/home/engagement-rail/motion-math.ts`: pure progress and destination calculations.
- `src/components/home/engagement-rail/EngagementRail.tsx`: state owner and interaction composition.
- `src/components/home/engagement-rail/index.ts`: public exports.

Modify these files:

- `src/components/home/MethodStory.tsx`: replace the old implementation with a small Engagement Rail wrapper.
- `src/app/layout.tsx`: load Bebas Neue as a rail-scoped font variable without changing existing display typography.
- `src/app/globals.css`: replace old method dossier styles with Engagement Rail styles.
- `tests/method-story.test.tsx`: replace static dossier assertions with rail integration assertions.
- `tsconfig.test.json`: compile the new engagement-rail directory during tests.

Create these tests:

- `tests/engagement-rail-data.test.ts`: content, order, and visual-state integrity.
- `tests/engagement-canvas.test.tsx`: one SVG and stable primitive inventory.
- `tests/engagement-rail-motion.test.ts`: pure progress and service destination math.

---

### Task 1: Typed Engagement Content

**Files:**
- Create: `src/components/home/engagement-rail/types.ts`
- Create: `src/components/home/engagement-rail/stages.ts`
- Create: `tests/engagement-rail-data.test.ts`
- Modify: `tsconfig.test.json`

**Interfaces:**
- Produces: `EngagementService`, `EngagementStageId`, `VisualStateId`, `EngagementStage`, `ServiceDefinition`, `ENGAGEMENT_STAGES`, and `ENGAGEMENT_SERVICES`.
- Consumes: no feature-specific interfaces.

- [ ] **Step 1: Add the new folder to test compilation**

Add this entry after `src/components/home/MethodStory.tsx` in `tsconfig.test.json`:

```json
"src/components/home/engagement-rail/**/*.ts",
"src/components/home/engagement-rail/**/*.tsx",
```

- [ ] **Step 2: Write the failing data test**

Create `tests/engagement-rail-data.test.ts`:

```ts
import test from 'node:test'
import assert from 'node:assert/strict'
import { ENGAGEMENT_SERVICES, ENGAGEMENT_STAGES } from '../src/components/home/engagement-rail/stages'

test('engagement rail exposes the two approved services and eight stages in order', () => {
  assert.deepEqual(ENGAGEMENT_SERVICES.map(({ id, title, startIndex }) => ({ id, title, startIndex })), [
    { id: 'ai', title: 'AI Audit & Implementation', startIndex: 0 },
    { id: 'operations', title: 'Management & Operations Strategy', startIndex: 4 },
  ])

  assert.deepEqual(ENGAGEMENT_STAGES.map(({ id }) => id), [
    'ai-assess',
    'ai-prioritise',
    'ai-build',
    'ai-hand-over',
    'operations-diagnose',
    'operations-map',
    'operations-prioritise',
    'operations-roadmap',
  ])
  assert.equal(ENGAGEMENT_STAGES.filter(({ service }) => service === 'ai').length, 4)
  assert.equal(ENGAGEMENT_STAGES.filter(({ service }) => service === 'operations').length, 4)
})

test('each stage contains final copy and a matching visual state id', () => {
  for (const [index, stage] of ENGAGEMENT_STAGES.entries()) {
    assert.equal(stage.number, String(index + 1).padStart(2, '0'))
    assert.equal(stage.visualState, stage.id)
    assert.ok(stage.title.length > 2)
    assert.ok(stage.strategicLine.endsWith('.'))
    assert.ok(stage.body.endsWith('.'))
  }
})
```

- [ ] **Step 3: Run the test and confirm the missing-module failure**

Run:

```powershell
npm test
```

Expected: FAIL because `engagement-rail/stages` does not exist.

- [ ] **Step 4: Add the exact shared types**

Create `src/components/home/engagement-rail/types.ts`:

```ts
export type EngagementService = 'ai' | 'operations'

export type EngagementStageId =
  | 'ai-assess'
  | 'ai-prioritise'
  | 'ai-build'
  | 'ai-hand-over'
  | 'operations-diagnose'
  | 'operations-map'
  | 'operations-prioritise'
  | 'operations-roadmap'

export type VisualStateId = EngagementStageId

export interface EngagementStage {
  id: EngagementStageId
  number: string
  service: EngagementService
  serviceStage: 0 | 1 | 2 | 3
  title: string
  strategicLine: string
  body: string
  outputLabel: string
  visualState: VisualStateId
}

export interface ServiceDefinition {
  id: EngagementService
  eyebrow: string
  title: string
  startIndex: 0 | 4
  stages: readonly [string, string, string, string]
}
```

- [ ] **Step 5: Add the approved stage data**

Create `src/components/home/engagement-rail/stages.ts` with these exports:

```ts
import type { EngagementStage, ServiceDefinition } from './types'

export const ENGAGEMENT_SERVICES = [
  {
    id: 'ai',
    eyebrow: 'Engagement 01',
    title: 'AI Audit & Implementation',
    startIndex: 0,
    stages: ['Assess', 'Prioritise', 'Build', 'Hand Over'],
  },
  {
    id: 'operations',
    eyebrow: 'Engagement 02',
    title: 'Management & Operations Strategy',
    startIndex: 4,
    stages: ['Diagnose', 'Map', 'Prioritise', 'Roadmap'],
  },
] as const satisfies readonly ServiceDefinition[]

export const ENGAGEMENT_STAGES = [
  {
    id: 'ai-assess', number: '01', service: 'ai', serviceStage: 0, title: 'Assess',
    strategicLine: 'Read the business before choosing the technology.',
    body: 'Strategy, Data, Technology, People, and Governance reveal where AI can create credible value.',
    outputLabel: 'Readiness scan', visualState: 'ai-assess',
  },
  {
    id: 'ai-prioritise', number: '02', service: 'ai', serviceStage: 1, title: 'Prioritise',
    strategicLine: 'Not every automation deserves to be built.',
    body: 'Opportunities are ranked by business impact, feasibility, cost, and operational fit.',
    outputLabel: 'Selected use case', visualState: 'ai-prioritise',
  },
  {
    id: 'ai-build', number: '03', service: 'ai', serviceStage: 2, title: 'Build',
    strategicLine: 'Make one system work inside the operation.',
    body: 'The highest-value use case becomes a practical workflow connected to how the team already works.',
    outputLabel: 'System built', visualState: 'ai-build',
  },
  {
    id: 'ai-hand-over', number: '04', service: 'ai', serviceStage: 3, title: 'Hand Over',
    strategicLine: 'Leave ownership with the team.',
    body: 'Documentation, operating instructions, and training make the implemented system usable after delivery.',
    outputLabel: 'Ready', visualState: 'ai-hand-over',
  },
  {
    id: 'operations-diagnose', number: '05', service: 'operations', serviceStage: 0, title: 'Diagnose',
    strategicLine: 'See cost, flow, and margin as one system.',
    body: 'We identify where money, time, and capacity are leaking before changing the structure.',
    outputLabel: 'Leakage detected', visualState: 'operations-diagnose',
  },
  {
    id: 'operations-map', number: '06', service: 'operations', serviceStage: 1, title: 'Map',
    strategicLine: 'Make the hidden structure visible.',
    body: 'Cost behaviour is mapped alongside process steps, ownership, and operational friction.',
    outputLabel: 'Bottleneck found', visualState: 'operations-map',
  },
  {
    id: 'operations-prioritise', number: '07', service: 'operations', serviceStage: 2, title: 'Prioritise',
    strategicLine: 'Separate consequential change from noise.',
    body: 'The highest-impact fixes are ranked before the roadmap is built.',
    outputLabel: 'Priority set', visualState: 'operations-prioritise',
  },
  {
    id: 'operations-roadmap', number: '08', service: 'operations', serviceStage: 3, title: 'Roadmap',
    strategicLine: 'Sequence the next 90 days.',
    body: 'Actions receive an owner, a measure, and a deadline.',
    outputLabel: 'Roadmap set', visualState: 'operations-roadmap',
  },
] as const satisfies readonly EngagementStage[]
```

- [ ] **Step 6: Run the tests**

Run `npm test`.

Expected: the two new data tests pass and the existing suite remains green.

- [ ] **Step 7: Commit the typed content**

```powershell
git add -- tsconfig.test.json tests/engagement-rail-data.test.ts src/components/home/engagement-rail/types.ts src/components/home/engagement-rail/stages.ts
git commit -m "feat: add engagement rail stage data"
```

---

### Task 2: SVG Visual State Geometry

**Files:**
- Modify: `src/components/home/engagement-rail/types.ts`
- Create: `src/components/home/engagement-rail/visual-states.ts`
- Create: `src/components/home/engagement-rail/visual-state-dom.ts`
- Modify: `tests/engagement-rail-data.test.ts`

**Interfaces:**
- Consumes: `VisualStateId` from Task 1.
- Produces: `RectTarget`, `PathTarget`, `MarkerTarget`, `LabelTarget`, `EngagementVisualState`, `VISUAL_STATES`, and `applyVisualState(root, state)`.

- [ ] **Step 1: Extend the failing test with primitive integrity assertions**

Append to `tests/engagement-rail-data.test.ts`:

```ts
import { VISUAL_STATES } from '../src/components/home/engagement-rail/visual-states'

test('every visual state targets the same stable primitive inventory', () => {
  assert.deepEqual(Object.keys(VISUAL_STATES), ENGAGEMENT_STAGES.map(({ id }) => id))
  for (const stage of ENGAGEMENT_STAGES) {
    const state = VISUAL_STATES[stage.visualState]
    assert.equal(state.objects.length, 5)
    assert.equal(state.axes.length, 2)
    assert.equal(state.routes.length, 2)
    assert.equal(state.markers.length, 5)
    assert.equal(state.labels.length, 5)
    assert.match(state.accentId, /^(object-[0-4]|axis-[0-1]|route-[0-1]|marker-[0-4]|status)$/)
  }
})
```

- [ ] **Step 2: Run the test and confirm the missing visual-state failure**

Run `npm test`.

Expected: FAIL because `visual-states.ts` does not exist.

- [ ] **Step 3: Add the visual target types**

Append to `types.ts`:

```ts
export interface RectTarget {
  x: number; y: number; width: number; height: number; rx: number
  opacity: number
}

export interface PathTarget { d: string; opacity: number }
export interface MarkerTarget { cx: number; cy: number; r: number; opacity: number }
export interface LabelTarget {
  x: number; y: number; text: string; opacity: number
  anchor?: 'start' | 'middle' | 'end'
}

export interface EngagementVisualState {
  id: VisualStateId
  objects: readonly [RectTarget, RectTarget, RectTarget, RectTarget, RectTarget]
  axes: readonly [PathTarget, PathTarget]
  routes: readonly [PathTarget, PathTarget]
  markers: readonly [MarkerTarget, MarkerTarget, MarkerTarget, MarkerTarget, MarkerTarget]
  labels: readonly [LabelTarget, LabelTarget, LabelTarget, LabelTarget, LabelTarget]
  status: LabelTarget
  accentId: `object-${0 | 1 | 2 | 3 | 4}` | `axis-${0 | 1}` | `route-${0 | 1}` | `marker-${0 | 1 | 2 | 3 | 4}` | 'status'
}
```

- [ ] **Step 4: Implement the eight exact state recipes**

Create `visual-states.ts`. Use helper functions to return fixed five-item tuples. Use these coordinates inside the `960 × 640` viewBox:

Use these exact hidden targets whenever a recipe marks a slot as hidden:

```ts
const hiddenRect = { x: 480, y: 320, width: 0, height: 0, rx: 0, opacity: 0 }
const hiddenMarker = { cx: 480, cy: 320, r: 0, opacity: 0 }
const hiddenLabel = { x: 480, y: 320, text: '', opacity: 0 }
const hiddenPath = { d: 'M120 320 C320 320 640 320 840 320', opacity: 0 }
```

| State | Object geometry | Marker geometry | Labels and accent |
| --- | --- | --- | --- |
| AI Assess | Five rows at `x=120`, `y=120,210,300,390,480`, `width=650`, `height=2`, `rx=1` | `(360,120)`, `(520,210)`, `(640,300)`, `(470,390)`, `(710,480)`, all `r=7` | Strategy, Data, Technology, People, Governance; accent `marker-4` |
| AI Prioritise | All objects hidden at center | `(280,390)`, `(430,275)`, `(610,195)`, `(655,360)`, `(350,205)`, all `r=10` | High impact, Feasible, Selected use case; accent `marker-2` |
| AI Build | Four blocks at `x=70,285,500,715`, `y=270`, `width=170`, `height=90`, `rx=4`; fifth hidden | Markers hidden | Input, Decision, AI Support, Output; accent `route-0`; status `SYSTEM BUILT` |
| AI Hand Over | Four rows at `x=130`, `y=120,220,320,420`, `width=650`, `height=62`, `rx=2`; fifth hidden | `(742,151)`, `(742,251)`, `(742,351)`, `(742,451)`, `r=10`; fifth hidden | Documentation, Owner assigned, Training complete, Operating instructions; accent `status`; status `READY` |
| Operations Diagnose | Four rows at `x=130`, `y=130,230,330,430`, `width=650`, `height=50`, `rx=2`; fifth hidden | `(620,255)`, `(710,455)`, `r=9`; other markers hidden | Direct cost, Overhead, Process cost, Margin; accent `marker-1`; status `LEAKAGE DETECTED` |
| Operations Map | Nodes at `(90,260,140,72)`, `(260,130,160,72)`, `(440,260,160,72)`, `(640,130,140,72)`, `(720,390,150,72)`, all `rx=36` | Markers hidden | Sales, Purchasing, Fulfilment, Finance, Reporting; accent `object-2` |
| Operations Prioritise | Rows at `x=130`, `y=170,290,410`, `width=690`, `height=76`, `rx=2`; last two hidden | Markers hidden | Issue, Impact, Effort, Margin leakage, Approval delay; accent `object-0`; status `PRIORITY SET` |
| Operations Roadmap | Lanes at `x=120,380,640`, `y=180`, `width=200`, `height=260`, `rx=2`; last two hidden | `(220,355)`, `(480,300)`, `(740,245)`, `r=8`; last two hidden | Month 1, Month 2, Month 3, Stabilise cost, Assign owners; accent `route-0`; status `ROADMAP SET` |

Use these exact label targets:

| State | Label targets |
| --- | --- |
| AI Assess | `(120,102) Strategy`, `(120,192) Data`, `(120,282) Technology`, `(120,372) People`, `(120,462) Governance`, all start anchored |
| AI Prioritise | `(180,535) Impact`, `(130,88) Feasibility`, `(630,170) Selected use case`; last two labels hidden |
| AI Build | `(155,250) Input`, `(370,250) Decision`, `(585,250) AI Support`, `(800,250) Output`, all middle anchored; fifth hidden |
| AI Hand Over | `(160,158) Documentation`, `(160,258) Owner assigned`, `(160,358) Training complete`, `(160,458) Operating instructions`; fifth hidden |
| Operations Diagnose | `(160,162) Direct cost`, `(160,262) Overhead`, `(160,362) Process cost`, `(160,462) Margin`; fifth hidden |
| Operations Map | `(160,304) Sales`, `(340,174) Purchasing`, `(520,304) Fulfilment`, `(710,174) Finance`, `(795,434) Reporting`, all middle anchored |
| Operations Prioritise | `(160,155) Issue`, `(585,155) Impact`, `(730,155) Effort`, `(160,215) Margin leakage`, `(160,335) Approval delay` |
| Operations Roadmap | `(220,155) Month 1`, `(480,155) Month 2`, `(740,155) Month 3`, `(220,400) Stabilise cost`, `(480,345) Assign owners`, all middle anchored |

Place non-empty status labels at `(820,560)` with `anchor='end'`. Use `hiddenLabel` for empty status labels.

Use these path rules:

```ts
// AI Prioritise axes
axes: [
  { d: 'M160 500 C360 500 640 500 820 500', opacity: 1 },
  { d: 'M160 500 C160 360 160 200 160 100', opacity: 1 },
]

// AI Build route
routes: [
  { d: 'M155 315 C280 315 680 315 800 315', opacity: 1 },
  hiddenPath,
]

// Operations Map routes
routes: [
  { d: 'M160 296 C300 296 420 190 520 296', opacity: 1 },
  { d: 'M520 296 C650 296 700 426 795 426', opacity: 1 },
]

// Operations Roadmap route
routes: [
  { d: 'M220 355 C360 355 600 245 740 245', opacity: 1 },
  hiddenPath,
]
```

Every path string must retain one `M` and one `C` command so GSAP can interpolate numeric tokens. All states that do not list an axis or route use `hiddenPath` for that slot.

- [ ] **Step 5: Implement immediate DOM state application**

Create `visual-state-dom.ts`:

```ts
import type { EngagementVisualState } from './types'

const setAttrs = (element: Element | null, attrs: Record<string, string | number>) => {
  if (!element) return
  for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, String(value))
}

export function applyVisualState(root: SVGSVGElement, state: EngagementVisualState) {
  state.objects.forEach((target, index) => setAttrs(root.querySelector(`[data-object="${index}"]`), target))
  state.axes.forEach((target, index) => setAttrs(root.querySelector(`[data-axis="${index}"]`), target))
  state.routes.forEach((target, index) => setAttrs(root.querySelector(`[data-route="${index}"]`), target))
  state.markers.forEach((target, index) => setAttrs(root.querySelector(`[data-marker="${index}"]`), target))
  state.labels.forEach((target, index) => {
    const label = root.querySelector(`[data-label="${index}"]`)
    setAttrs(label, { x: target.x, y: target.y, opacity: target.opacity, 'text-anchor': target.anchor ?? 'start' })
    if (label) label.textContent = target.text
  })
  const status = root.querySelector('[data-status]')
  setAttrs(status, { x: state.status.x, y: state.status.y, opacity: state.status.opacity, 'text-anchor': state.status.anchor ?? 'start' })
  if (status) status.textContent = state.status.text
  root.dataset.accent = state.accentId
  root.dataset.state = state.id
}
```

- [ ] **Step 6: Run the tests**

Run `npm test`.

Expected: all visual-state integrity assertions pass.

- [ ] **Step 7: Commit the visual state engine**

```powershell
git add -- tests/engagement-rail-data.test.ts src/components/home/engagement-rail/types.ts src/components/home/engagement-rail/visual-states.ts src/components/home/engagement-rail/visual-state-dom.ts
git commit -m "feat: add engagement rail visual states"
```

---

### Task 3: Stable Single SVG Canvas

**Files:**
- Create: `src/components/home/engagement-rail/EngagementCanvas.tsx`
- Create: `tests/engagement-canvas.test.tsx`

**Interfaces:**
- Consumes: `EngagementStage`, `EngagementVisualState`, and `VISUAL_STATES`.
- Produces: `EngagementCanvas({ activeStage, svgRef })`.

- [ ] **Step 1: Write the failing canvas test**

Create `tests/engagement-canvas.test.tsx`:

```tsx
import test from 'node:test'
import assert from 'node:assert/strict'
import { createRef } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { EngagementCanvas } from '../src/components/home/engagement-rail/EngagementCanvas'
import { ENGAGEMENT_STAGES } from '../src/components/home/engagement-rail/stages'

test('engagement canvas renders one stable SVG primitive inventory', () => {
  const html = renderToStaticMarkup(<EngagementCanvas activeStage={ENGAGEMENT_STAGES[0]} svgRef={createRef<SVGSVGElement>()} />)
  assert.equal((html.match(/<svg/g) ?? []).length, 1)
  assert.match(html, /class="engagement-canvas"/)
  assert.equal((html.match(/data-object=/g) ?? []).length, 5)
  assert.equal((html.match(/data-axis=/g) ?? []).length, 2)
  assert.equal((html.match(/data-route=/g) ?? []).length, 2)
  assert.equal((html.match(/data-marker=/g) ?? []).length, 5)
  assert.equal((html.match(/data-label=/g) ?? []).length, 5)
  assert.equal((html.match(/data-status=/g) ?? []).length, 1)
  assert.match(html, /AI Assess operating diagram/)
  assert.match(html, /five-dimension readiness scan/i)
})
```

- [ ] **Step 2: Run the test and confirm the missing-component failure**

Run `npm test`.

Expected: FAIL because `EngagementCanvas` does not exist.

- [ ] **Step 3: Implement the single canvas**

Create `EngagementCanvas.tsx`. Render exactly one `<svg>` and map the initial state's arrays into stable primitives:

```tsx
import type { RefObject } from 'react'
import type { EngagementStage } from './types'
import { VISUAL_STATES } from './visual-states'

interface EngagementCanvasProps {
  activeStage: EngagementStage
  svgRef: RefObject<SVGSVGElement>
}

export function EngagementCanvas({ activeStage, svgRef }: EngagementCanvasProps) {
  const initial = VISUAL_STATES['ai-assess']
  const titleId = 'engagement-canvas-title'
  const descriptionId = 'engagement-canvas-description'

  return (
    <svg
      ref={svgRef}
      className="engagement-canvas"
      viewBox="0 0 960 640"
      role="img"
      aria-labelledby={`${titleId} ${descriptionId}`}
      data-state={initial.id}
      data-accent={initial.accentId}
    >
      <title id={titleId}>{activeStage.number} {activeStage.service === 'ai' ? 'AI' : 'Operations'} {activeStage.title} operating diagram</title>
      <desc id={descriptionId}>{activeStage.id === 'ai-assess' ? 'A five-dimension readiness scan.' : activeStage.outputLabel}</desc>
      <rect className="engagement-canvas__frame" x="1" y="1" width="958" height="638" rx="4" />
      <g className="engagement-canvas__axes" aria-hidden="true">
        {initial.axes.map((target, index) => <path key={index} data-axis={index} {...target} />)}
      </g>
      <g className="engagement-canvas__routes" aria-hidden="true">
        {initial.routes.map((target, index) => <path key={index} data-route={index} pathLength="1" {...target} />)}
      </g>
      <g className="engagement-canvas__objects" aria-hidden="true">
        {initial.objects.map((target, index) => <rect key={index} data-object={index} {...target} />)}
      </g>
      <g className="engagement-canvas__markers" aria-hidden="true">
        {initial.markers.map((target, index) => <circle key={index} data-marker={index} {...target} />)}
      </g>
      <g className="engagement-canvas__labels" aria-hidden="true">
        {initial.labels.map((target, index) => <text key={index} data-label={index} x={target.x} y={target.y} opacity={target.opacity} textAnchor={target.anchor ?? 'start'}>{target.text}</text>)}
        <text data-status x={initial.status.x} y={initial.status.y} opacity={initial.status.opacity} textAnchor={initial.status.anchor ?? 'start'}>{initial.status.text}</text>
      </g>
    </svg>
  )
}
```

Do not add nested SVG elements, foreign objects, cards, or dashboard groups.

- [ ] **Step 4: Run the tests**

Run `npm test`.

Expected: the canvas inventory test passes.

- [ ] **Step 5: Commit the canvas**

```powershell
git add -- tests/engagement-canvas.test.tsx src/components/home/engagement-rail/EngagementCanvas.tsx
git commit -m "feat: add single engagement SVG canvas"
```

---

### Task 4: Accessible Engagement Rail Structure

**Files:**
- Create: `src/components/home/engagement-rail/MobileStageRail.tsx`
- Create: `src/components/home/engagement-rail/EngagementRail.tsx`
- Create: `src/components/home/engagement-rail/index.ts`
- Modify: `src/components/home/MethodStory.tsx`
- Modify: `tests/method-story.test.tsx`

**Interfaces:**
- Consumes: stage data and `EngagementCanvas` from Tasks 1 and 3.
- Produces: `EngagementRail`, `MobileStageRail`, and the existing public `MethodStory` export.

- [ ] **Step 1: Replace the old method test with failing rail assertions**

Replace `tests/method-story.test.tsx` with:

```tsx
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { MethodStory } from '../src/components/home/MethodStory'

test('method story renders an accessible single-canvas engagement rail', () => {
  const html = renderToStaticMarkup(<MethodStory />)
  const source = readFileSync('src/components/home/MethodStory.tsx', 'utf8')
  const railSource = readFileSync('src/components/home/engagement-rail/EngagementRail.tsx', 'utf8')

  assert.match(html, /AI Audit &amp; Implementation/)
  assert.match(html, /Management &amp; Operations Strategy/)
  assert.equal((html.match(/role="tab"/g) ?? []).length, 2)
  assert.equal((html.match(/class="engagement-mobile-card"/g) ?? []).length, 8)
  assert.equal((html.match(/<svg/g) ?? []).length, 1)
  assert.equal((html.match(/class="engagement-canvas"/g) ?? []).length, 1)
  assert.match(html, /aria-selected="true"/)
  assert.match(html, /aria-controls="engagement-stage-panel"/)
  assert.doesNotMatch(source + railSource, /consulting-artifacts|method-dossier|method-stage|ArtifactVisual/)
})
```

- [ ] **Step 2: Run the test and confirm it fails against the dossier implementation**

Run `npm test`.

Expected: FAIL because the current method story renders dossier classes, no tabs, and multiple artefact SVGs.

- [ ] **Step 3: Add the static mobile card rail**

Create `MobileStageRail.tsx`:

```tsx
import type { MutableRefObject } from 'react'
import { ENGAGEMENT_STAGES } from './stages'

interface MobileStageRailProps {
  activeIndex: number
  cardRefs: MutableRefObject<Array<HTMLElement | null>>
}

export function MobileStageRail({ activeIndex, cardRefs }: MobileStageRailProps) {
  return (
    <div className="engagement-mobile-rail" aria-label="Eight engagement stages">
      {ENGAGEMENT_STAGES.map((stage, index) => (
        <article
          ref={(node) => { cardRefs.current[index] = node }}
          className="engagement-mobile-card"
          data-stage-index={index}
          data-active={index === activeIndex ? 'true' : 'false'}
          key={stage.id}
          tabIndex={0}
        >
          <span className="engagement-rail__counter">{stage.number} / 08</span>
          <h3>{stage.title}</h3>
          <p className="engagement-rail__strategic">{stage.strategicLine}</p>
          <p>{stage.body}</p>
          <span className="engagement-rail__output">{stage.outputLabel}</span>
        </article>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Add the rail composition with interactive tabs**

Create `EngagementRail.tsx` as a client component. It must:

```tsx
'use client'

import { useRef, useState } from 'react'
import { EngagementCanvas } from './EngagementCanvas'
import { ENGAGEMENT_SERVICES, ENGAGEMENT_STAGES } from './stages'
import { MobileStageRail } from './MobileStageRail'

export function EngagementRail() {
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const mobileRailRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLElement | null>>([])
  const activeStage = ENGAGEMENT_STAGES[activeIndex]
  const activeService = ENGAGEMENT_SERVICES.find(({ id }) => id === activeStage.service) ?? ENGAGEMENT_SERVICES[0]

  const jumpToStage = (index: number) => {
    setActiveIndex(index)
    cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  return (
    <section ref={rootRef} className="engagement-rail" data-nav-theme="dark" aria-labelledby="engagement-rail-title">
      <div ref={pinRef} className="engagement-rail__pin">
        <div className="engagement-rail__heading">
          <span className="eyebrow eyebrow--light">[ How we work ]</span>
          <h2 id="engagement-rail-title">One operating system becoming clear.</h2>
        </div>
        <div className="engagement-rail__tabs" role="tablist" aria-label="Consulting engagements">
          {ENGAGEMENT_SERVICES.map((service) => (
            <button
              type="button"
              role="tab"
              aria-selected={service.id === activeStage.service}
              aria-controls="engagement-stage-panel"
              tabIndex={service.id === activeStage.service ? 0 : -1}
              onClick={() => jumpToStage(service.startIndex)}
              key={service.id}
            >{service.title}</button>
          ))}
        </div>
        <div className="engagement-rail__body">
          <div id="engagement-stage-panel" className="engagement-rail__copy" role="tabpanel">
            <span className="engagement-rail__counter">{String(activeStage.serviceStage + 1).padStart(2, '0')} / 04</span>
            <h3>{activeStage.title}</h3>
            <p className="engagement-rail__strategic">{activeStage.strategicLine}</p>
            <p className="engagement-rail__body-copy">{activeStage.body}</p>
          </div>
          <div className="engagement-rail__visual"><EngagementCanvas activeStage={activeStage} svgRef={svgRef} /></div>
        </div>
        <div className="engagement-rail__progress" aria-label={`${activeService.title} progress`}>
          {activeService.stages.map((label, index) => <span data-active={index === activeStage.serviceStage ? 'true' : 'false'} key={label}><b>{String(index + 1).padStart(2, '0')}</b>{label}</span>)}
        </div>
        <div ref={mobileRailRef}><MobileStageRail activeIndex={activeIndex} cardRefs={cardRefs} /></div>
        <ol className="engagement-rail__accessible-stages">
          {ENGAGEMENT_STAGES.map((stage) => <li key={stage.id}><strong>{stage.number} {stage.title}</strong><span>{stage.strategicLine} {stage.body}</span></li>)}
        </ol>
      </div>
    </section>
  )
}
```

Keyboard arrow behavior for tabs arrives in Task 6 with the shared jump controller.

- [ ] **Step 5: Replace the old public wrapper**

Create `index.ts`:

```ts
export { EngagementRail } from './EngagementRail'
```

Replace `MethodStory.tsx` with:

```tsx
import { EngagementRail } from './engagement-rail'

export function MethodStory() {
  return <EngagementRail />
}
```

- [ ] **Step 6: Run the tests**

Run `npm test`.

Expected: the method story passes its single-SVG, two-tab, eight-card, and legacy-removal assertions.

- [ ] **Step 7: Commit the accessible structure**

```powershell
git add -- tests/method-story.test.tsx src/components/home/MethodStory.tsx src/components/home/engagement-rail/MobileStageRail.tsx src/components/home/engagement-rail/EngagementRail.tsx src/components/home/engagement-rail/index.ts
git commit -m "feat: build engagement rail structure"
```

---

### Task 5: Desktop Scroll Mathematics and GSAP Controller

**Files:**
- Create: `src/components/home/engagement-rail/motion-math.ts`
- Create: `src/components/home/engagement-rail/useEngagementRailMotion.ts`
- Create: `tests/engagement-rail-motion.test.ts`
- Modify: `src/components/home/engagement-rail/EngagementRail.tsx`

**Interfaces:**
- Consumes: `VISUAL_STATES`, `ENGAGEMENT_STAGES`, root, pin, and canvas refs.
- Produces: `getStageIndex(progress)`, `getStageDestination(index, start, end)`, and `useEngagementRailMotion(options)` returning `jumpToDesktopStage(index)`.

- [ ] **Step 1: Write failing motion math tests**

Create `tests/engagement-rail-motion.test.ts`:

```ts
import test from 'node:test'
import assert from 'node:assert/strict'
import { getStageDestination, getStageIndex } from '../src/components/home/engagement-rail/motion-math'

test('scroll progress maps into eight clamped zones', () => {
  assert.equal(getStageIndex(-1), 0)
  assert.equal(getStageIndex(0), 0)
  assert.equal(getStageIndex(0.124), 0)
  assert.equal(getStageIndex(0.125), 1)
  assert.equal(getStageIndex(0.5), 4)
  assert.equal(getStageIndex(0.999), 7)
  assert.equal(getStageIndex(2), 7)
})

test('service tab destinations target stages one and five inside the pin range', () => {
  assert.equal(getStageDestination(0, 1000, 3400), 1002)
  assert.equal(getStageDestination(4, 1000, 3400), 2200)
})
```

- [ ] **Step 2: Run the tests and confirm the missing-module failure**

Run `npm test`.

Expected: FAIL because `motion-math.ts` does not exist.

- [ ] **Step 3: Implement the pure calculations**

Create `motion-math.ts`:

```ts
const STAGE_COUNT = 8

export function getStageIndex(progress: number) {
  const clamped = Math.min(0.999999, Math.max(0, progress))
  return Math.floor(clamped * STAGE_COUNT)
}

export function getStageDestination(index: number, start: number, end: number) {
  const clampedIndex = Math.min(7, Math.max(0, index))
  const offset = clampedIndex === 0 ? 2 : 0
  return Math.round(start + (end - start) * (clampedIndex / STAGE_COUNT) + offset)
}
```

- [ ] **Step 4: Implement the GSAP timeline controller**

Create `useEngagementRailMotion.ts` with this contract:

```ts
interface EngagementRailMotionOptions {
  enabled: boolean
  rootRef: RefObject<HTMLElement>
  pinRef: RefObject<HTMLDivElement>
  svgRef: RefObject<SVGSVGElement>
  onStageChange: (index: number) => void
}

interface EngagementRailMotionResult {
  jumpToDesktopStage: (index: number) => boolean
}
```

Inside one `useEffect` that depends on `enabled`:

1. Return before importing GSAP if `enabled` is false.
2. Set `root.dataset.motion = 'loading'`.
3. Dynamically import `gsap` and `gsap/ScrollTrigger`.
4. Register ScrollTrigger.
5. Set the initial SVG state with `applyVisualState(svg, VISUAL_STATES['ai-assess'])`.
6. Build one timeline with this trigger:

```ts
scrollTrigger: {
  trigger: root,
  start: 'top top',
  end: '+=240%',
  scrub: 0.8,
  pin,
  anticipatePin: 1,
  invalidateOnRefresh: true,
  onUpdate: (self) => {
    const next = getStageIndex(self.progress)
    if (next !== currentIndex) {
      currentIndex = next
      onStageChange(next)
    }
  },
}
```

7. Give the timeline a total duration of 8. Add the first-state entrance between `0` and `0.72`. Add each subsequent target state at integer positions `1` through `7`, with duration `0.72`. Leave the remaining `0.28` of each zone as a hold.
8. For each state, tween every object, axis, route, and marker with `attr`. Tween labels with position and opacity, then set text at the start of the target segment. Set `svg.dataset.accent` and `svg.dataset.state` at the midpoint of the segment.
9. Use `ease: 'power3.out'` for geometry and `ease: 'none'` for path length.
10. Store the ScrollTrigger instance so `jumpToDesktopStage` can call:

```ts
window.scrollTo({
  top: getStageDestination(index, trigger.start, trigger.end),
  behavior: 'smooth',
})
```

11. On failure, delete `root.dataset.motion` and apply the active state without animation.
12. On cleanup, mark the import as cancelled, revert the GSAP context, kill the trigger, and delete `root.dataset.motion`.

Do not create one timeline per stage. Do not query or modify elements outside `root`.

- [ ] **Step 5: Wire the hook into EngagementRail**

Add a responsive mode state before calling the motion hook:

```ts
type RailMode = 'desktop' | 'mobile' | 'reduced'
const [railMode, setRailMode] = useState<RailMode>('reduced')

useEffect(() => {
  const mobile = window.matchMedia('(max-width: 900px)')
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  const syncMode = () => setRailMode(reduced.matches ? 'reduced' : mobile.matches ? 'mobile' : 'desktop')
  syncMode()
  mobile.addEventListener('change', syncMode)
  reduced.addEventListener('change', syncMode)
  return () => {
    mobile.removeEventListener('change', syncMode)
    reduced.removeEventListener('change', syncMode)
  }
}, [])
```

Call the hook after refs and state are created:

```ts
const { jumpToDesktopStage } = useEngagementRailMotion({
  enabled: railMode === 'desktop',
  rootRef,
  pinRef,
  svgRef,
  onStageChange: setActiveIndex,
})
```

Replace the temporary `jumpToStage` body with a controller that tries desktop first and falls back to the mobile card:

```ts
const jumpToStage = (index: number) => {
  if (railMode === 'desktop' && jumpToDesktopStage(index)) return
  setActiveIndex(index)
  cardRefs.current[index]?.scrollIntoView({ behavior: railMode === 'reduced' ? 'auto' : 'smooth', block: 'nearest', inline: 'start' })
}
```

- [ ] **Step 6: Run the tests**

Run `npm test`.

Expected: motion math tests pass and the full suite stays green.

- [ ] **Step 7: Commit desktop motion**

```powershell
git add -- tests/engagement-rail-motion.test.ts src/components/home/engagement-rail/motion-math.ts src/components/home/engagement-rail/useEngagementRailMotion.ts src/components/home/engagement-rail/EngagementRail.tsx
git commit -m "feat: animate engagement rail scroll states"
```

---

### Task 6: Mobile Snap Synchronization and Keyboard Tabs

**Files:**
- Modify: `src/components/home/engagement-rail/EngagementRail.tsx`
- Modify: `src/components/home/engagement-rail/MobileStageRail.tsx`
- Modify: `tests/method-story.test.tsx`

**Interfaces:**
- Consumes: the active index, card refs, SVG ref, `applyVisualState`, and `VISUAL_STATES`.
- Produces: mobile centered-card synchronization and ArrowLeft/ArrowRight service-tab behavior.

- [ ] **Step 1: Extend the failing integration test**

Add these source assertions to `tests/method-story.test.tsx`:

```ts
const mobileSource = readFileSync('src/components/home/engagement-rail/MobileStageRail.tsx', 'utf8')
assert.match(railSource, /IntersectionObserver/)
assert.match(railSource, /applyVisualState/)
assert.match(railSource, /ArrowLeft/)
assert.match(railSource, /ArrowRight/)
assert.match(railSource, /addEventListener\('change'/)
assert.match(mobileSource, /data-stage-index/)
```

- [ ] **Step 2: Run the test and confirm the missing mobile synchronization failure**

Run `npm test`.

Expected: FAIL because `EngagementRail` has no observer or arrow-key handler.

- [ ] **Step 3: Add the mobile intersection observer**

Change `MobileStageRailProps` to accept the scroll element ref:

```ts
interface MobileStageRailProps {
  activeIndex: number
  cardRefs: MutableRefObject<Array<HTMLElement | null>>
  railRef: RefObject<HTMLDivElement>
}
```

Apply `railRef` to the `.engagement-mobile-rail` element. Replace the wrapper used in Task 4 with:

```tsx
<MobileStageRail activeIndex={activeIndex} cardRefs={cardRefs} railRef={mobileRailRef} />
```

In `EngagementRail`, add an effect that runs when `railMode` changes to `mobile`:

```ts
useEffect(() => {
  if (railMode !== 'mobile') return
  const rail = mobileRailRef.current
  const svg = svgRef.current
  if (!rail || !svg) return

  const observer = new IntersectionObserver((entries) => {
    const centered = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
    const index = Number((centered?.target as HTMLElement | undefined)?.dataset.stageIndex)
    if (!Number.isInteger(index)) return
    setActiveIndex(index)
    applyVisualState(svg, VISUAL_STATES[ENGAGEMENT_STAGES[index].visualState])
  }, { root: rail, threshold: [0.55, 0.7, 0.85] })

  cardRefs.current.forEach((card) => { if (card) observer.observe(card) })
  applyVisualState(svg, VISUAL_STATES[ENGAGEMENT_STAGES[activeIndex].visualState])
  return () => observer.disconnect()
}, [railMode])
```

- [ ] **Step 4: Add keyboard navigation to the service tabs**

Add:

```ts
const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, serviceIndex: number) => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
  event.preventDefault()
  const next = event.key === 'ArrowRight' ? Math.min(1, serviceIndex + 1) : Math.max(0, serviceIndex - 1)
  jumpToStage(ENGAGEMENT_SERVICES[next].startIndex)
  tabRefs.current[next]?.focus()
}
```

Create `tabRefs` for the two service buttons, attach each ref, and call `handleTabKeyDown` from `onKeyDown`.

- [ ] **Step 5: Apply immediate states in reduced-motion mode**

Add an effect that watches `activeIndex` and `railMode`. If the mode is `mobile` or `reduced`, call:

```ts
applyVisualState(svgRef.current, VISUAL_STATES[ENGAGEMENT_STAGES[activeIndex].visualState])
```

Guard `svgRef.current` before the call. Do not import GSAP in this effect. This mode dependency also makes breakpoint changes rebuild the desktop controller or mobile observer without retaining stale listeners.

- [ ] **Step 6: Run the tests**

Run `npm test`.

Expected: all integration assertions pass.

- [ ] **Step 7: Commit mobile and keyboard behavior**

```powershell
git add -- tests/method-story.test.tsx src/components/home/engagement-rail/EngagementRail.tsx src/components/home/engagement-rail/MobileStageRail.tsx
git commit -m "feat: synchronize mobile engagement stages"
```

---

### Task 7: Engagement Rail Styling and Legacy Removal

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css:247-258`
- Modify: `src/app/globals.css:498-504`
- Modify: `src/app/globals.css:568-575`
- Modify: `src/app/globals.css:616-621`
- Modify: `tests/method-story.test.tsx`

**Interfaces:**
- Consumes: the class names from Tasks 3, 4, and 6.
- Produces: scoped Bebas Neue typography, desktop pin composition, SVG presentation, mobile snap rail, focus states, and reduced-motion static layout.

- [ ] **Step 1: Add failing CSS contract assertions**

Append to `tests/method-story.test.tsx`:

```ts
const css = readFileSync('src/app/globals.css', 'utf8')
const layout = readFileSync('src/app/layout.tsx', 'utf8')
assert.match(css, /\.engagement-rail\s*\{/)
assert.match(css, /\.engagement-canvas\s*\{/)
assert.match(css, /scroll-snap-type:\s*x mandatory/)
assert.match(css, /@media \(max-width:\s*900px\)/)
assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/)
assert.match(layout, /Bebas_Neue/)
assert.match(layout, /--font-bebas/)
assert.doesNotMatch(css, /\.method-dossier|\.method-stage/)
```

- [ ] **Step 2: Run the test and confirm legacy CSS remains**

Run `npm test`.

Expected: FAIL because Engagement Rail CSS is missing and dossier styles remain.

- [ ] **Step 3: Load a rail-scoped Bebas Neue variable**

In `src/app/layout.tsx`, add `Bebas_Neue` to the `next/font/google` import and create:

```ts
const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas', display: 'swap' })
```

Add `bebas.variable` to the `<html>` class list. Do not replace `anton.variable` or change `--font-display`, because the hero and other approved sections must retain their current typography.

- [ ] **Step 4: Replace the desktop method styles**

Delete `.method-dossiers`, `.method-dossier`, and `.method-stage` rules. Add these core rules at the same location:

```css
.engagement-rail { position: relative; color: var(--z-paper); background: var(--z-deep); }
.engagement-rail__pin { min-height: 100svh; display: grid; grid-template-rows: auto auto minmax(0,1fr) auto; gap: 22px; padding: 112px var(--page-gutter) 28px; overflow: hidden; }
.engagement-rail__heading { display: flex; align-items: end; justify-content: space-between; gap: 28px; }
.engagement-rail__heading h2 { max-width: 700px; margin: 0; font-family: var(--font-bebas); font-size: clamp(54px,6vw,96px); font-weight: 400; line-height: .86; text-transform: uppercase; }
.engagement-rail__tabs { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); border-block: 1px solid var(--z-line-light); }
.engagement-rail__tabs button { min-height: 52px; padding: 12px 18px; border: 0; border-right: 1px solid var(--z-line-light); color: var(--z-grey-mid); background: transparent; font-family: var(--font-mono); font-size: 11px; letter-spacing: .08em; text-align: left; text-transform: uppercase; }
.engagement-rail__tabs button:last-child { border-right: 0; }
.engagement-rail__tabs button[aria-selected="true"] { color: var(--z-paper); box-shadow: inset 0 -2px 0 var(--z-rust-lift); }
.engagement-rail__tabs button:focus-visible { outline: 2px solid var(--z-paper); outline-offset: -4px; }
.engagement-rail__body { min-height: 0; display: grid; grid-template-columns: minmax(300px,40%) minmax(0,60%); gap: clamp(34px,5vw,78px); align-items: center; }
.engagement-rail__copy { align-self: center; }
.engagement-rail__counter, .engagement-rail__output { font-family: var(--font-mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; }
.engagement-rail__copy h3 { margin: 20px 0 18px; font-family: var(--font-bebas); font-size: clamp(78px,10vw,162px); font-weight: 400; line-height: .78; text-transform: uppercase; }
.engagement-rail__strategic { max-width: 540px; margin: 0 0 18px; font-family: var(--font-authority); font-size: clamp(28px,3vw,48px); font-style: italic; line-height: 1.02; }
.engagement-rail__body-copy { max-width: 520px; color: rgba(243,238,229,.66); }
.engagement-rail__visual { min-width: 0; align-self: stretch; display: grid; place-items: center; }
.engagement-canvas { width: 100%; max-height: 64svh; color: var(--z-paper); }
.engagement-canvas__frame { fill: rgba(24,32,64,.22); stroke: rgba(243,238,229,.18); }
.engagement-canvas [data-object] { fill: rgba(243,238,229,.025); stroke: rgba(243,238,229,.66); stroke-width: 2; vector-effect: non-scaling-stroke; }
.engagement-canvas [data-axis], .engagement-canvas [data-route] { fill: none; stroke: rgba(243,238,229,.5); stroke-width: 2; stroke-dasharray: 1; stroke-dashoffset: 0; vector-effect: non-scaling-stroke; }
.engagement-canvas [data-marker] { fill: var(--z-paper); }
.engagement-canvas [data-label], .engagement-canvas [data-status] { fill: var(--z-paper); font-family: var(--font-mono); font-size: 15px; letter-spacing: .08em; text-transform: uppercase; }
.engagement-canvas[data-accent="marker-0"] [data-marker="0"], .engagement-canvas[data-accent="marker-1"] [data-marker="1"], .engagement-canvas[data-accent="marker-2"] [data-marker="2"], .engagement-canvas[data-accent="marker-3"] [data-marker="3"], .engagement-canvas[data-accent="marker-4"] [data-marker="4"] { fill: var(--z-rust-lift); }
.engagement-canvas[data-accent="object-0"] [data-object="0"], .engagement-canvas[data-accent="object-1"] [data-object="1"], .engagement-canvas[data-accent="object-2"] [data-object="2"], .engagement-canvas[data-accent="object-3"] [data-object="3"], .engagement-canvas[data-accent="object-4"] [data-object="4"] { stroke: var(--z-rust-lift); }
.engagement-canvas[data-accent="route-0"] [data-route="0"], .engagement-canvas[data-accent="route-1"] [data-route="1"] { stroke: var(--z-rust-lift); }
.engagement-canvas[data-accent="status"] [data-status] { fill: var(--z-rust-lift); }
.engagement-rail__progress { display: grid; grid-template-columns: repeat(4,1fr); border-top: 1px solid var(--z-line-light); }
.engagement-rail__progress span { display: flex; gap: 10px; padding-top: 13px; color: var(--z-grey-mid); font-family: var(--font-mono); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; }
.engagement-rail__progress span[data-active="true"] { color: var(--z-paper); }
.engagement-rail__progress span[data-active="true"] b { color: var(--z-rust-lift); }
.engagement-mobile-rail { display: none; }
.engagement-rail__accessible-stages { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
```

Add accent selectors for `axis-0` and `axis-1` even though the approved eight states do not select them. This keeps the declared union complete.

- [ ] **Step 5: Add the 900px mobile layout**

Inside `@media (max-width: 900px)` add:

```css
.engagement-rail__pin { min-height: auto; display: block; padding: 100px var(--page-gutter) 82px; overflow: hidden; }
.engagement-rail__heading { display: block; }
.engagement-rail__heading h2 { margin-top: 24px; }
.engagement-rail__tabs { margin-top: 36px; }
.engagement-rail__body { display: block; }
.engagement-rail__copy, .engagement-rail__progress { display: none; }
.engagement-rail__visual { min-height: 380px; margin-block: 28px 20px; }
.engagement-canvas { max-height: none; }
.engagement-mobile-rail { display: flex; gap: 14px; width: 100%; overflow-x: auto; overscroll-behavior-inline: contain; scroll-snap-type: x mandatory; scrollbar-width: none; }
.engagement-mobile-rail::-webkit-scrollbar { display: none; }
.engagement-mobile-card { flex: 0 0 min(82vw,520px); min-height: 360px; padding: 28px; border: 1px solid var(--z-line-light); scroll-snap-align: start; scroll-snap-stop: always; }
.engagement-mobile-card h3 { margin: 42px 0 16px; font-family: var(--font-bebas); font-size: clamp(58px,17vw,88px); font-weight: 400; line-height: .82; text-transform: uppercase; }
.engagement-mobile-card > p:last-of-type { color: rgba(243,238,229,.66); }
.engagement-mobile-card[data-active="true"] { border-color: rgba(243,238,229,.55); }
```

- [ ] **Step 6: Add the reduced-motion static layout**

Inside `@media (prefers-reduced-motion: reduce)` add:

```css
.engagement-rail__pin { min-height: auto; padding-block: 112px; overflow: visible; }
.engagement-rail__body { display: block; }
.engagement-rail__copy, .engagement-rail__progress { display: none; }
.engagement-rail__visual { min-height: min(620px,70vh); margin-block: 34px; }
.engagement-mobile-rail { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 1px; overflow: visible; scroll-snap-type: none; background: var(--z-line-light); }
.engagement-mobile-card { min-height: 340px; border: 0; background: var(--z-deep); }
```

Inside the existing 640px media query, set the reduced-motion grid to one column and keep each card within the viewport.

- [ ] **Step 7: Run the tests**

Run `npm test`.

Expected: all CSS contract assertions pass and no legacy method selector remains.

- [ ] **Step 8: Commit the visual system**

```powershell
git add -- tests/method-story.test.tsx src/app/layout.tsx src/app/globals.css
git commit -m "feat: style the engagement rail"
```

---

### Task 8: Production Integration and Visual Verification

**Files:**
- Modify only if verification finds a scoped defect: Engagement Rail files from Tasks 1 through 7.
- Do not modify: `src/components/home/CinematicHero.tsx` or homepage service markup.

**Interfaces:**
- Consumes: the complete Engagement Rail.
- Produces: a verified production build and a clean implementation branch.

- [ ] **Step 1: Run static requirement searches**

Run:

```powershell
rg -n "consulting-artifacts|method-dossier|method-stage|ArtifactVisual|stock-dashboard|dashboard" src/components/home/MethodStory.tsx src/components/home/engagement-rail tests/method-story.test.tsx
```

Expected: no matches except negative assertion strings inside tests.

Run:

```powershell
$heroDiff=git diff 8460849 -- src/components/home/CinematicHero.tsx
if($heroDiff){$heroDiff;exit 1}
```

Expected: no hero diff.

- [ ] **Step 2: Run the complete automated suite**

Run:

```powershell
npm test
```

Expected: all tests pass with zero failures.

- [ ] **Step 3: Run the production build and sitemap generation**

The repository path contains `&`, so bypass the Windows npm shim for Next commands:

```powershell
node ./node_modules/next/dist/bin/next build
if($LASTEXITCODE -ne 0){exit $LASTEXITCODE}
node ./node_modules/next-sitemap/dist/esm/cli.js
```

Expected: Next compiles, type checks, and generates all static pages. Sitemap generation exits 0.

- [ ] **Step 4: Start the local production server**

```powershell
node ./node_modules/next/dist/bin/next start -p 3100
```

Run it as a yielded long-running process so verification commands can execute separately.

- [ ] **Step 5: Verify desktop at 1440 × 900**

Open `http://127.0.0.1:3100/` with the in-app browser and set the viewport to 1440 × 900.

Confirm:

- One `.engagement-canvas`
- Eight semantic stages
- Two interactive tabs
- One ScrollTrigger owned by the section
- Pin starts when the rail reaches the viewport top
- Active stage changes through all eight zones
- AI tab lands on stage 1
- Operations tab lands on stage 5
- Bottom rail resets from AI labels to Operations labels
- Shared nodes and paths transform without complete-scene crossfades
- `document.documentElement.scrollWidth <= innerWidth`

- [ ] **Step 6: Verify tablet at 1024 × 768**

Confirm the two-column layout remains readable, the canvas does not clip labels, the tabs remain keyboard accessible, and GSAP remains active.

- [ ] **Step 7: Verify mobile at 390 × 844 and 320 × 800**

Confirm:

- No ScrollTrigger pin
- One shared SVG
- One continuous eight-card horizontal rail
- CSS scroll snapping selects each card
- Service tabs jump to cards 1 and 5
- Active canvas state follows the centered card
- Horizontal overflow stays inside `.engagement-mobile-rail`
- Page-level scroll width does not exceed the viewport

- [ ] **Step 8: Verify reduced-motion behavior**

Use a browser or local test surface that can emulate `prefers-reduced-motion: reduce`.

Confirm:

- No pin
- No GSAP import or animation marker on the rail
- Eight static cards are visible in order
- Tab activation applies states without animated scrolling
- The single SVG remains labeled for the selected stage

- [ ] **Step 9: Check console and cleanup behavior**

Read browser warnings and errors after:

- Loading the page
- Crossing the 4 to 5 service boundary
- Clicking each service tab
- Resizing across 900px twice
- Navigating away and back

Expected: no errors, no duplicate pins, no stale spacer, and no duplicate stage updates.

- [ ] **Step 10: Stop the verification server and run final Git checks**

Resolve the exact port 3100 listener, verify that its process is `node`, and stop that PID. Then run:

```powershell
git diff --check
git status --short
git log --oneline -10
```

Expected: no whitespace errors. Only the user's pre-existing unrelated untracked files may remain.

- [ ] **Step 11: Commit any scoped verification fix**

If Tasks 5 through 9 required a scoped fix, stage only the affected Engagement Rail files and commit:

```powershell
git commit -m "fix: harden engagement rail behavior"
```

If verification required no edits, do not create an empty commit.

---

## Completion Criteria

- The homepage renders one Engagement Rail SVG and no method dossier artefacts.
- Scroll and tab interactions expose all eight approved states in order.
- Mobile presents one continuous snap rail and one shared SVG.
- Reduced motion presents all stage content without pinning or GSAP motion.
- The approved hero and service section remain unchanged.
- Tests, production build, sitemap generation, browser QA, console checks, and overflow checks pass.
