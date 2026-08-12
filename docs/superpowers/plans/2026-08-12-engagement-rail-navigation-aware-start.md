# Engagement Rail Navigation-Aware Start Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Seat the desktop Engagement Rail below the fixed 72px navigation and hold `Assess` until the fully visible pinned frame has settled before any stage morph begins.

**Architecture:** Extend the focused motion-math module with one navigation offset and one lead-in hold constant, plus pure functions that normalize raw ScrollTrigger progress and generate synchronized stage destinations. The GSAP controller will pin at the navigation boundary and drive both the stage copy and the existing SVG timeline from normalized progress, while desktop-only CSS sizes the initialized pin frame to the visible area beneath the navigation.

**Tech Stack:** Next.js 16, React 18, TypeScript, GSAP 3 ScrollTrigger, CSS, Node test runner.

## Global Constraints

- Desktop and tablet behavior applies only above 900px with reduced motion disabled.
- Preserve the eight named states, one SVG canvas, current geometry, copy, tabs, morph sequence, stage order, and `240%` total pin distance.
- Do not modify the cinematic hero, Services section, mobile horizontal rail, or reduced-motion presentation.
- The fixed navigation offset is exactly `72px`.
- Preserve the existing pre-entry visibility gate, reverse-scroll reset, and final `Roadmap` state during downward release.
- Server-rendered content and JavaScript or GSAP failure states must remain visible.

---

### Task 1: Navigation-Aware Progress Model

**Files:**
- Modify: `src/components/home/engagement-rail/motion-math.ts`
- Modify: `tests/engagement-rail-motion-math.test.ts`

**Interfaces:**
- Produces: `ENGAGEMENT_NAV_OFFSET_PX = 72`.
- Produces: `ENGAGEMENT_LEAD_IN_PROGRESS = 0.08`.
- Produces: `getEngagementProgress(rawProgress: number): number`, returning `0` through the lead-in and a clamped `0..1` value afterward.
- Updates: `getStageIndex(rawProgress: number): number` to consume raw trigger progress through `getEngagementProgress`.
- Updates: `getStageDestination(index: number, start: number, end: number): number` to include the same lead-in fraction.

- [ ] **Step 1: Read the good-test rules before editing tests**

Read `C:/Users/Kazi Technology/.codex/plugins/cache/openai-curated-remote/superpowers/6.2.0/skills/test-driven-development/writing-good-tests.md` completely. Before editing, state the production behavior that will make each assertion fail: removing the lead-in constant or normalization must make the hold and destination assertions fail.

- [ ] **Step 2: Add failing progress and destination assertions**

Extend `tests/engagement-rail-motion-math.test.ts`:

```ts
import {
  ENGAGEMENT_LEAD_IN_PROGRESS,
  ENGAGEMENT_NAV_OFFSET_PX,
  getEngagementProgress,
  getStageDestination,
  getStageIndex,
} from '../src/components/home/engagement-rail/motion-math'

test('desktop engagement motion reserves a navigation-aware lead-in for Assess', () => {
  assert.equal(ENGAGEMENT_NAV_OFFSET_PX, 72)
  assert.equal(getEngagementProgress(0), 0)
  assert.equal(getEngagementProgress(ENGAGEMENT_LEAD_IN_PROGRESS), 0)
  assert.equal(getStageIndex(ENGAGEMENT_LEAD_IN_PROGRESS), 0)
  assert.equal(getEngagementProgress(1), 1)
})

test('stage destinations include the same lead-in used by scroll progress', () => {
  const start = 1000
  const end = 3400
  const firstCompleted = getStageDestination(0, start, end)
  const operationsStart = getStageDestination(4, start, end)

  assert.ok(firstCompleted > start + (end - start) * ENGAGEMENT_LEAD_IN_PROGRESS)
  assert.ok(operationsStart > start + (end - start) * 0.5)
  assert.ok(operationsStart < end)
})
```

- [ ] **Step 3: Run the suite and verify the expected red failure**

Run `npm test`.

Expected: TypeScript fails because `ENGAGEMENT_LEAD_IN_PROGRESS`, `ENGAGEMENT_NAV_OFFSET_PX`, and `getEngagementProgress` are not exported. This is the required red state.

- [ ] **Step 4: Implement the shared normalization model**

Replace the progress calculations in `motion-math.ts` with:

```ts
const STAGE_COUNT = 8

export const ENGAGEMENT_NAV_OFFSET_PX = 72
export const ENGAGEMENT_LEAD_IN_PROGRESS = 0.08

export function getEngagementProgress(rawProgress: number) {
  const clamped = Math.min(1, Math.max(0, rawProgress))
  if (clamped <= ENGAGEMENT_LEAD_IN_PROGRESS) return 0
  return (clamped - ENGAGEMENT_LEAD_IN_PROGRESS) / (1 - ENGAGEMENT_LEAD_IN_PROGRESS)
}

export function getStageIndex(rawProgress: number) {
  const progress = Math.min(0.999999, getEngagementProgress(rawProgress))
  return Math.floor(progress * STAGE_COUNT)
}

export function getStageDestination(index: number, start: number, end: number) {
  const clampedIndex = Math.min(7, Math.max(0, index))
  const completedStatePosition = clampedIndex + 0.72
  const normalizedPosition = completedStatePosition / STAGE_COUNT
  const triggerProgress = ENGAGEMENT_LEAD_IN_PROGRESS
    + normalizedPosition * (1 - ENGAGEMENT_LEAD_IN_PROGRESS)
  return Math.round(start + (end - start) * triggerProgress)
}
```

- [ ] **Step 5: Run the suite and confirm green**

Run `npm test`.

Expected: all tests pass, including the new lead-in assertions and all existing clamping and tab-destination assertions.

- [ ] **Step 6: Commit the progress model**

```powershell
git add src/components/home/engagement-rail/motion-math.ts tests/engagement-rail-motion-math.test.ts
git commit -m "fix: reserve engagement rail lead-in"
```

---

### Task 2: Seated Pin Frame and Delayed SVG Motion

**Files:**
- Modify: `src/components/home/engagement-rail/useEngagementRailMotion.ts`
- Modify: `src/app/globals.css`
- Test: `tests/engagement-rail-motion-math.test.ts`

**Interfaces:**
- Consumes: `ENGAGEMENT_NAV_OFFSET_PX` and `getEngagementProgress(rawProgress)` from Task 1.
- Preserves: `createEngagementLifecycle(root)` and the existing eight-state timeline.
- Produces: a ScrollTrigger pinned at `top 72px` whose raw progress is normalized before it drives timeline progress or stage copy.

- [ ] **Step 1: Add a source-level regression assertion for the trigger contract**

Extend `tests/engagement-rail-motion-math.test.ts` with a focused source assertion using the same file-reading pattern already used elsewhere in the suite:

```ts
test('desktop rail pins below navigation and drives SVG motion from normalized progress', () => {
  const controller = readFileSync(
    resolve(process.cwd(), 'src/components/home/engagement-rail/useEngagementRailMotion.ts'),
    'utf8',
  )

  assert.match(controller, /start:\s*`top \$\{ENGAGEMENT_NAV_OFFSET_PX\}px`/)
  assert.match(controller, /timeline\.progress\(getEngagementProgress\(self\.progress\)\)/)
})
```

Add `readFileSync` and `resolve` imports if this test file does not already have them.

- [ ] **Step 2: Run the suite and verify the source-contract failure**

Run `npm test`.

Expected: the new test fails because the controller still uses `start: 'top top'` and an automatically scrubbed timeline.

- [ ] **Step 3: Separate ScrollTrigger progress from the SVG timeline**

In `useEngagementRailMotion.ts`:

```ts
import {
  ENGAGEMENT_NAV_OFFSET_PX,
  getEngagementProgress,
  getStageDestination,
  getStageIndex,
} from './motion-math'
```

Create the existing SVG timeline paused, then create one ScrollTrigger that owns the pin and updates the timeline:

```ts
const timeline = gsap.timeline({ paused: true })

const trigger = ScrollTrigger.create({
  trigger: root,
  start: `top ${ENGAGEMENT_NAV_OFFSET_PX}px`,
  end: '+=240%',
  pin,
  pinSpacing: true,
  anticipatePin: 1,
  invalidateOnRefresh: true,
  onEnter: engagement.onEnter,
  onEnterBack: engagement.onEnterBack,
  onLeaveBack: engagement.onLeaveBack,
  onUpdate: (self) => {
    const next = getStageIndex(self.progress)
    timeline.progress(getEngagementProgress(self.progress))
    if (next === currentIndex) return
    currentIndex = next
    onStageChange(next)
  },
})
```

Keep the existing timeline construction for marker/label entry, stages 02–08, and the final hold. Remove only the nested `scrollTrigger` property and `scrub: 0.8`; direct normalized progress replaces automatic scrub so the hold affects both copy and SVG geometry. Assign `triggerRef.current = trigger` after construction. Cleanup continues killing the trigger and reverting the GSAP context.

- [ ] **Step 4: Size only initialized desktop motion beneath the navigation**

In the existing desktop motion media query in `globals.css`, add:

```css
.engagement-rail[data-motion] .engagement-rail__pin {
  height: calc(100svh - 72px);
  min-height: calc(100svh - 72px);
  padding-top: 40px;
}
```

Keep the rule inside `@media (min-width: 901px) and (prefers-reduced-motion: no-preference)`. The `data-motion` requirement ensures mobile, reduced motion, SSR, and a GSAP import failure keep their existing layout.

- [ ] **Step 5: Run automated verification**

Run:

```powershell
npm test
node ./node_modules/next/dist/bin/next build
node ./node_modules/next-sitemap/bin/next-sitemap.mjs
git diff --check
```

Expected: all tests pass, the Next.js production build generates all 21 routes, the sitemap command succeeds, and no whitespace errors appear. Restore timestamp-only sitemap diffs before committing if route content did not change.

- [ ] **Step 6: Verify the corrected boundary in a production browser session**

Run the production server and inspect at a desktop page viewport near `1900 × 900`:

- While Services is visible, the Engagement Rail interface is hidden.
- On pin entry, the rail top is exactly `72px` and the rail bottom equals `window.innerHeight` within one device pixel.
- `data-state="ai-assess"` and the `Assess` heading remain unchanged from trigger progress `0` through `0.08`.
- `Prioritise` appears only after progress exceeds `0.08` and additional scrolling advances normalized progress.
- All eight named stages resolve at their shared computed destinations.
- Reverse scrolling returns to `Assess`, then removes `data-engaged` only above the pin start.
- Downward release preserves `Roadmap`.
- At `390 × 844`, there is no pin spacer, no horizontal page overflow, and the mobile cards remain visible.
- Resizing desktop → mobile → desktop leaves exactly one pin spacer and no browser errors.

- [ ] **Step 7: Commit the seated-frame implementation**

```powershell
git add src/components/home/engagement-rail/useEngagementRailMotion.ts src/app/globals.css tests/engagement-rail-motion-math.test.ts
git commit -m "fix: seat engagement motion below navigation"
```

---

### Task 3: Integrate and Publish

**Files:**
- No production file changes expected.

**Interfaces:**
- Consumes: the complete verified Task 1 and Task 2 commits.
- Produces: a verified `master` commit on GitHub and the connected Vercel production deployment.

- [ ] **Step 1: Run final verification on the branch**

Run:

```powershell
npm test
node ./node_modules/next/dist/bin/next build
git diff --check
git status --short
```

Expected: 0 test failures, a successful production build, no whitespace errors, and only the user's pre-existing unrelated untracked files outside this plan.

- [ ] **Step 2: Finish the branch using the approved integration path**

Use `superpowers:finishing-a-development-branch`. Because the user approved publishing through the existing project workflow, fast-forward the feature branch into `master`, verify the merged result again, remove only the owned `.worktrees/` worktree, and delete only the completed feature branch.

- [ ] **Step 3: Push and confirm GitHub parity**

```powershell
git push origin master
git rev-parse HEAD
git ls-remote origin refs/heads/master
```

Expected: local and remote commit hashes match exactly.

- [ ] **Step 4: Confirm the production deployment**

Read the GitHub deployment status for the pushed commit and wait for the Vercel context to report `success`. Then request the production URL through a working DNS route and confirm HTTP 200 plus the new navigation-aware CSS/controller assets. Do not report deployment success from Git push alone.
