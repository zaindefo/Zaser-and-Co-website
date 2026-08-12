# Engagement Rail Trigger Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reveal the desktop Engagement Rail only when its existing pin trigger starts, without changing the approved eight-stage animation.

**Architecture:** A small rail-scoped lifecycle helper owns the `data-engaged` attribute and is exercised directly in a unit test. The existing GSAP ScrollTrigger calls those handlers at enter, enter-back, and leave-back boundaries, while CSS masks the pin contents only when desktop motion is active but the rail is not engaged.

**Tech Stack:** Next.js 16, React 18, TypeScript, GSAP 3 ScrollTrigger, CSS, Node test runner.

## Global Constraints

- Preserve the existing eight stages, SVG geometry, stage timing, pin distance, service tabs, typography, and responsive layouts.
- Do not modify the cinematic hero or homepage services section.
- Apply the trigger gate only above 900px when reduced motion is disabled.
- Keep mobile, reduced-motion, server-rendered, and JavaScript-failure content visible.
- Preserve the final Roadmap stage when leaving the pin downward.

---

### Task 1: Trigger-Gated Desktop Reveal

**Files:**
- Create: `src/components/home/engagement-rail/engagement-lifecycle.ts`
- Create: `tests/engagement-rail-lifecycle.test.ts`
- Modify: `src/components/home/engagement-rail/useEngagementRailMotion.ts`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `createEngagementLifecycle(root: HTMLElement)` returning `onEnter()`, `onEnterBack()`, `onLeaveBack()`, and `cleanup()`.
- Consumes: the existing Engagement Rail root and existing ScrollTrigger configuration.

- [ ] **Step 1: Write the failing lifecycle test**

Create `tests/engagement-rail-lifecycle.test.ts`:

```ts
import test from 'node:test'
import assert from 'node:assert/strict'
import { createEngagementLifecycle } from '../src/components/home/engagement-rail/engagement-lifecycle'

test('rail engagement follows the desktop trigger boundary without hiding the downward exit', () => {
  const root = { dataset: {} } as unknown as HTMLElement
  const lifecycle = createEngagementLifecycle(root)

  lifecycle.onEnter()
  assert.equal(root.dataset.engaged, 'true')

  // ScrollTrigger deliberately has no onLeave handler, so the final stage stays engaged.
  assert.equal(root.dataset.engaged, 'true')

  lifecycle.onEnterBack()
  assert.equal(root.dataset.engaged, 'true')

  lifecycle.onLeaveBack()
  assert.equal(root.dataset.engaged, undefined)

  lifecycle.onEnter()
  lifecycle.cleanup()
  assert.equal(root.dataset.engaged, undefined)
})
```

- [ ] **Step 2: Run the suite and confirm the missing-module failure**

Run `npm test`.

Expected: TypeScript fails because `engagement-lifecycle.ts` does not exist.

- [ ] **Step 3: Implement the lifecycle helper**

Create `src/components/home/engagement-rail/engagement-lifecycle.ts`:

```ts
export function createEngagementLifecycle(root: HTMLElement) {
  const engage = () => { root.dataset.engaged = 'true' }
  const disengage = () => { delete root.dataset.engaged }

  return {
    onEnter: engage,
    onEnterBack: engage,
    onLeaveBack: disengage,
    cleanup: disengage,
  }
}
```

- [ ] **Step 4: Run the suite and confirm the lifecycle test passes**

Run `npm test`.

Expected: all tests pass.

- [ ] **Step 5: Connect lifecycle handlers to the existing ScrollTrigger**

In `useEngagementRailMotion.ts`, create the lifecycle after resolving `root`, call its handlers from the existing trigger, and call `cleanup()` on import failure and effect cleanup:

```ts
const engagement = createEngagementLifecycle(root)

scrollTrigger: {
  // Existing trigger, start, end, scrub, pin, and onUpdate remain unchanged.
  onEnter: engagement.onEnter,
  onEnterBack: engagement.onEnterBack,
  onLeaveBack: engagement.onLeaveBack,
}
```

Do not add `onLeave`; this preserves the final Roadmap view during the downward exit.

- [ ] **Step 6: Add the progressive-enhancement CSS gate**

Add immediately after `.engagement-rail__pin` in `globals.css`:

```css
@media (min-width: 901px) and (prefers-reduced-motion: no-preference) {
  .engagement-rail[data-motion]:not([data-engaged="true"]) .engagement-rail__pin {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .engagement-rail[data-motion][data-engaged="true"] .engagement-rail__pin {
    opacity: 1;
    visibility: visible;
    transition: opacity .18s ease-out;
  }
}
```

The selector requires `data-motion`, so server rendering and GSAP import failure remain visible. The media query excludes mobile and reduced motion.

- [ ] **Step 7: Run automated verification**

Run:

```powershell
npm test
node ./node_modules/next/dist/bin/next build
git diff --check
```

Expected: all tests pass, all static routes build, and no whitespace errors are reported.

- [ ] **Step 8: Verify the desktop trigger boundary in the browser**

At a wide, short desktop viewport matching the report (`1920 × 1080` browser window, approximately `1900 × 900` page viewport), confirm:

- The navy rail background can enter while the interface remains hidden.
- The interface reveals when the rail reaches the viewport top and pins.
- All eight states still resolve in order.
- Scrolling upward above the start hides the interface again.
- Scrolling downward past Roadmap keeps Roadmap visible until the section releases.
- Mobile at `390 × 844` remains visible and unpinned.
- Resizing above and below 900px does not retain `data-engaged` or duplicate a pin spacer.
- The console has no warnings or errors.

- [ ] **Step 9: Commit and publish**

Stage only the lifecycle, controller, CSS, test, and plan files. Commit:

```powershell
git commit -m "fix: gate engagement rail at pin start"
git push origin master
```

Confirm `git rev-parse HEAD` matches `git ls-remote origin refs/heads/master`.
