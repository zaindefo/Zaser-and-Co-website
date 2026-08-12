# Engagement Rail Navigation-Aware Start Design

## Goal

Keep the approved single-SVG Engagement Rail animation intact, but prevent its stages from advancing while the section is still moving upward into its final visible position. The first `Assess` state must remain static until the complete rail frame is seated between the fixed navigation and the bottom of the viewport.

## Scope

- Desktop and tablet widths above 900px with reduced motion disabled.
- Preserve the eight named states, single SVG canvas, geometry, morphs, copy, service tabs, stage order, and total scrolling experience.
- Do not modify the cinematic hero, Services section, mobile horizontal rail, or reduced-motion presentation.
- Retain the existing pre-entry visibility gate and the final `Roadmap` state on downward exit.

## Corrected Frame Geometry

The desktop navigation is fixed and 72px high. The Engagement Rail pin must therefore use the navigation's lower edge as its top boundary instead of positioning a full-viewport frame behind the navigation.

- ScrollTrigger pins the rail at `top 72px`.
- The pinned frame height is `calc(100svh - 72px)`.
- The frame's minimum height follows the same calculation so its bottom aligns with the visible viewport bottom.
- The existing internal top padding is reduced by the same navigation offset only as needed to preserve the current composition inside the shorter visible frame.

This produces one fully visible navy canvas from the bottom of the navigation to the bottom of the browser window.

## Motion Start and Initial Hold

Reaching the pin boundary reveals the rail in state `01 AI Assess`, but does not immediately advance the consulting system. A short, explicit lead-in segment at the start of the pinned scroll range holds the initial state while the section settles.

- Scroll progress before the hold boundary always resolves to stage index `0`.
- SVG morphing begins only after the hold boundary.
- The remaining motion progress is normalized across the existing eight-state timeline, so stages `02` through `08` retain their order and transformation design.
- Service-tab jump destinations account for the lead-in hold and continue to land on completed stage states.
- The total pin distance remains `240%`; the hold is allocated within that range instead of making the page longer.

The hold fraction will be represented by one shared motion-math constant so stage selection, timeline progress, and tab destinations cannot drift apart.

## Lifecycle Behavior

- Before pin entry, the existing `data-motion` and `data-engaged` gate keeps rail content hidden.
- On entry, the rail becomes visible at `Assess` and remains static through the lead-in hold.
- Scrolling upward through the hold returns to `Assess`; scrolling above the pin boundary hides the rail again.
- Leaving downward preserves `Roadmap` until the pin releases.
- Cleanup removes lifecycle attributes and the GSAP pin spacer during breakpoint or route changes.

## Responsive and Progressive Enhancement

Mobile at 900px and below remains an unpinned, snap-aligned eight-card sequence. Reduced-motion mode remains fully visible and static. If JavaScript or GSAP fails, server-rendered content remains accessible because navigation-aware height and visibility rules are scoped to initialized desktop motion.

## Verification

- At a desktop viewport, confirm the rail does not advance while rising into view.
- Confirm the fully seated frame begins immediately below the 72px navigation and ends exactly at the viewport bottom.
- Confirm `Assess` remains unchanged during the initial hold and `Prioritise` appears only after additional pinned scrolling.
- Confirm all eight stages and both tab destinations resolve correctly.
- Confirm reverse scrolling restores `Assess`, then hides the content only after leaving the pin upward.
- Confirm `Roadmap` remains visible on downward release.
- Confirm mobile, reduced motion, breakpoint resizing, keyboard tabs, and JavaScript-failure visibility are unchanged.
- Run the complete test suite, production build, and browser diagnostics before publishing.
