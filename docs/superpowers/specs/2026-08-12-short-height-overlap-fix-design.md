# Short-Height Overlap Fix Design

## Goal

Keep every Engagement Rail element inside its assigned grid row on short desktop screens. The Roadmap copy, SVG, and progress rail must remain separate while the existing tall-screen composition stays unchanged.

## Audit Findings

The audit covered the homepage and all retained public route templates at the reported short desktop shape and a medium desktop shape.

- At approximately `1828 × 570`, the pinned rail has about `498px` of visible height. Roadmap copy extends about `184px` into the progress rail, and the SVG extends about `226px` into it.
- At `1280 × 720`, copy still extends about `42px` into the progress rail, and the SVG extends about `96px` into it.
- The fixed `72px` navigation offset works as specified. The overlap comes from content sized for a taller body row inside `calc(100svh - 72px)`.
- The remaining route templates showed no horizontal page overflow or comparable clipped-content collision.
- The cinematic hero contains overlapping DOM layers by design. GSAP clip paths and opacity prevent visitors from seeing those layers at the same time, so the audit does not treat them as layout defects.

## Responsive Boundary

Apply a compact desktop composition when all three conditions match:

- viewport width is at least `901px`;
- viewport height is at most `800px`;
- the visitor has not requested reduced motion.

Keep the current composition above `800px` tall. Mobile and reduced-motion layouts continue using their existing sequential presentations.

## Compact Composition

The compact mode keeps the existing four-row grid: heading, service tabs, body, and progress rail.

- Reduce pin padding and row gaps so the body row receives more height.
- Scale the chapter heading and active stage title with viewport height instead of viewport width.
- Reduce margins around the stage title and strategic statement.
- Keep the explanatory body copy visible at a smaller readable size and line height.
- Set the body, copy, and visual grid items to `min-height: 0` so their intrinsic sizes cannot enlarge the body row.
- Size the SVG canvas to the body row with `height: 100%`, `max-height: 100%`, and its existing `viewBox` proportions.
- Keep the progress rail in normal grid flow at the bottom of the pin. Reduce only its vertical padding and type size.

The compact mode changes scale and spacing. It does not remove content or alter the visual hierarchy.

## Motion and Content Constraints

- Preserve all eight states and the single SVG continuity engine.
- Preserve the `72px` pin offset, initial Assess hold, `240%` pin distance, timeline normalization, service-tab destinations, and Roadmap exit behavior.
- Preserve every heading, strategic statement, explanation, diagram label, and progress label.
- Do not add internal scrolling, scroll hijacking, extra pin distance, new JavaScript breakpoints, or hidden copy.
- Keep the current tall desktop, mobile, reduced-motion, and JavaScript-failure layouts unchanged.

## Verification

Use browser geometry as the layout regression check because the repository has no DOM layout test harness.

- Reproduce the current collision before the CSS change at a viewport near `1828 × 570`.
- After the change, verify that copy and SVG bottoms stay above the progress rail at Assess and Roadmap.
- Verify the progress rail stays inside the pin and the pin remains aligned from `72px` to the viewport bottom.
- Repeat at `1280 × 720`, `1440 × 800`, and a desktop viewport taller than `800px`.
- Confirm the tall viewport keeps its current computed typography and spacing.
- Confirm all eight stages, reverse scrolling, Roadmap release, service tabs, and browser logs remain correct.
- Confirm mobile has eight cards, no pin spacer, and no horizontal page overflow.
- Run the complete test suite, production build, sitemap generation, and whitespace check.

## Publishing

Merge the verified change into `master`, push it to GitHub, wait for the connected Vercel production deployment, and confirm the live CSS asset contains the compact height rules.
