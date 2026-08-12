# Short-Height Overlap Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep Engagement Rail copy, SVG, and progress labels inside separate grid rows on desktop viewports up to `800px` tall.

**Architecture:** Add one desktop short-height media query to the existing Engagement Rail stylesheet. The query compacts spacing and typography, gives the body row explicit shrinkable children, and sizes the SVG to that row. Motion code and content remain untouched.

**Tech Stack:** Next.js 16, React 18, TypeScript, CSS Grid, GSAP 3 ScrollTrigger, Node test runner, production browser geometry checks.

## Global Constraints

- Apply compact mode only at widths of at least `901px`, heights of at most `800px`, and `prefers-reduced-motion: no-preference`.
- Preserve all eight states, the single SVG canvas, the `72px` pin offset, initial Assess hold, `240%` pin distance, service tabs, and Roadmap release.
- Preserve all headings, strategic statements, explanations, diagram labels, and progress labels.
- Do not add internal scrolling, extra pin distance, JavaScript breakpoints, or hidden copy.
- Keep tall desktop, mobile, reduced-motion, server-rendered, and JavaScript-failure layouts unchanged.
- Use measured browser geometry for the CSS red/green regression because the repository has no DOM layout test harness. The user approved this verification method in the design specification.

---

### Task 1: Reproduce and Record the Layout Failure

**Files:**
- Read: `src/app/globals.css:247-281`
- Read: `src/components/home/engagement-rail/EngagementRail.tsx`
- No file changes.

**Interfaces:**
- Consumes: the current production build and Engagement Rail selectors.
- Produces: baseline measurements for `.engagement-rail__copy`, `.engagement-rail__visual`, `.engagement-rail__progress`, and `.engagement-rail__pin`.

- [ ] **Step 1: Create an isolated worktree and verify the baseline**

Create `.worktrees/short-height-overlap` on branch `fix/short-height-overlap`, install dependencies inside that worktree, and run:

```powershell
npm test
node ./node_modules/next/dist/bin/next build
```

Expected: the existing suite passes and all 21 routes build before the CSS change.

- [ ] **Step 2: Start the production server**

```powershell
node ./node_modules/next/dist/bin/next start -p 3100
```

Use a retained background process and verify that port `3100` belongs to that Node process before browser testing.

- [ ] **Step 3: Measure the failing Roadmap state**

At desktop viewports near `1828 × 570` and `1280 × 720`, scroll the local homepage to the completed Roadmap state. Read these rectangles:

```js
const copy = document.querySelector('.engagement-rail__copy').getBoundingClientRect()
const visual = document.querySelector('.engagement-rail__visual').getBoundingClientRect()
const progress = document.querySelector('.engagement-rail__progress').getBoundingClientRect()
const pin = document.querySelector('.engagement-rail__pin').getBoundingClientRect()

return {
  copyOverlap: copy.bottom - progress.top,
  visualOverlap: visual.bottom - progress.top,
  progressOverflow: progress.bottom - pin.bottom,
}
```

Expected red state: `copyOverlap` and `visualOverlap` are greater than `0` at both heights. Record the values before editing CSS.

---

### Task 2: Add the Compact Short-Height Composition

**Files:**
- Modify: `src/app/globals.css:247-281`

**Interfaces:**
- Consumes: the existing initialized desktop selector `.engagement-rail[data-motion]`.
- Produces: a height-scoped compact layout with no changes to React or GSAP behavior.

- [ ] **Step 1: Add the compact media query after the existing desktop motion query**

Add this rule after the current `@media (min-width: 901px) and (prefers-reduced-motion: no-preference)` block:

```css
@media (min-width: 901px) and (max-height: 800px) and (prefers-reduced-motion: no-preference) {
  .engagement-rail[data-motion] .engagement-rail__pin {
    gap: clamp(8px, 1.75vh, 14px);
    padding: clamp(16px, 3.5vh, 28px) var(--page-gutter) clamp(12px, 2.5vh, 20px);
  }

  .engagement-rail[data-motion] .engagement-rail__heading h2 {
    max-width: 620px;
    font-size: clamp(42px, 9vh, 64px);
  }

  .engagement-rail[data-motion] .engagement-rail__tabs button {
    min-height: 36px;
    padding: 7px 14px;
  }

  .engagement-rail[data-motion] .engagement-rail__body {
    min-height: 0;
    gap: clamp(24px, 3vw, 48px);
    align-items: stretch;
  }

  .engagement-rail[data-motion] .engagement-rail__copy,
  .engagement-rail[data-motion] .engagement-rail__visual {
    min-height: 0;
  }

  .engagement-rail[data-motion] .engagement-rail__copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .engagement-rail[data-motion] .engagement-rail__counter,
  .engagement-rail[data-motion] .engagement-rail__output {
    font-size: 9px;
  }

  .engagement-rail[data-motion] .engagement-rail__copy h3 {
    margin: 8px 0;
    font-size: clamp(60px, 15vh, 96px);
  }

  .engagement-rail[data-motion] .engagement-rail__strategic {
    margin-bottom: 8px;
    font-size: clamp(22px, 5.2vh, 32px);
  }

  .engagement-rail[data-motion] .engagement-rail__body-copy {
    margin: 0;
    font-size: clamp(12px, 2.3vh, 14px);
    line-height: 1.35;
  }

  .engagement-rail[data-motion] .engagement-rail__visual {
    height: 100%;
    overflow: hidden;
  }

  .engagement-rail[data-motion] .engagement-canvas {
    height: 100%;
    max-height: 100%;
  }

  .engagement-rail[data-motion] .engagement-rail__progress span {
    padding-top: 6px;
    font-size: 9px;
    line-height: 1.2;
  }
}
```

- [ ] **Step 2: Check the stylesheet patch**

Run:

```powershell
git diff --check
git diff -- src/app/globals.css
```

Expected: one scoped media query, no edits to global tokens, motion code, mobile rules, or reduced-motion rules, and no whitespace errors.

---

### Task 3: Verify the Layout and Application

**Files:**
- Test: browser geometry against the local production build.
- No additional production file changes expected.

**Interfaces:**
- Consumes: the compact CSS from Task 2.
- Produces: measured proof that all Engagement Rail rows remain separate at the failing viewport heights.

- [ ] **Step 1: Rebuild and reload the production preview**

```powershell
node ./node_modules/next/dist/bin/next build
```

Restart the production server on port `3100`, reload the browser tab, and confirm the new CSS asset loads.

- [ ] **Step 2: Run the short-height green checks**

At Roadmap and Assess, measure the same rectangles at `1828 × 570`, `1280 × 720`, and `1440 × 800`.

Pass conditions:

```text
copy.bottom <= progress.top + 1
visual.bottom <= progress.top + 1
progress.bottom <= pin.bottom + 1
abs(pin.top - 72) <= 1
abs(pin.bottom - window.innerHeight) <= 1
```

Confirm all copy remains visible and the SVG preserves its labels and aspect ratio.

- [ ] **Step 3: Check the unaffected modes**

- At a desktop height above `800px`, confirm the compact media query does not match and the existing computed padding and typography remain active.
- At `390 × 844`, confirm eight mobile cards, zero pin spacers, and zero page-level horizontal overflow.
- In reduced-motion mode, confirm the static sequence remains visible.
- Resize desktop to mobile and back. Confirm exactly one pin spacer returns and browser logs contain no warnings or errors.

- [ ] **Step 4: Check the eight-stage animation contract**

Use the existing computed stage destinations. Confirm this order:

```text
Assess
Prioritise
Build
Hand Over
Diagnose
Map
Prioritise
Roadmap
```

Reverse above the trigger and confirm Assess returns before the rail hides. Leave downward and confirm Roadmap remains visible until release.

- [ ] **Step 5: Run complete automated verification**

```powershell
npm test
node ./node_modules/next/dist/bin/next build
node ./node_modules/next-sitemap/bin/next-sitemap.mjs
git diff --check
git status --short
```

Expected: all tests pass, all 21 routes build, sitemap generation succeeds, no whitespace errors appear, and only the planned CSS file remains modified. Restore timestamp-only sitemap diffs before committing.

- [ ] **Step 6: Commit the fix**

```powershell
git add src/app/globals.css
git commit -m "fix: prevent short-height rail overlap"
```

---

### Task 4: Integrate and Publish

**Files:**
- No production file changes expected.

**Interfaces:**
- Consumes: the verified CSS commit from Task 3.
- Produces: matching GitHub `master` and Vercel production deployments.

- [ ] **Step 1: Finish the feature branch**

Use `superpowers:verification-before-completion` and `superpowers:finishing-a-development-branch`. Fast-forward the clean feature branch into `master`, run `npm test` and the production build on the merged tree, remove only the owned `.worktrees/short-height-overlap` worktree, and delete only `fix/short-height-overlap`.

- [ ] **Step 2: Push and confirm repository parity**

```powershell
git push origin master
git rev-parse HEAD
git ls-remote origin refs/heads/master
```

Expected: local and remote hashes match.

- [ ] **Step 3: Confirm Vercel production**

Wait for the Vercel status attached to the pushed commit to report `success`. Request the production homepage, confirm HTTP `200`, and verify its CSS asset contains both `max-height:800px` and the compact Engagement Rail selectors.

- [ ] **Step 4: Verify the live screenshot state**

Open the production homepage near the reported short desktop dimensions, move to Roadmap, and rerun the geometry pass conditions from Task 3. Report the live URL and commit only after the production measurements pass.
