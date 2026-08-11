# Engagement Rail Trigger-Gated Reveal Design

## Goal

Keep the approved Engagement Rail animation unchanged, but prevent its interface from appearing while the preceding homepage section is still visible. The rail should reveal only when its existing desktop ScrollTrigger reaches the pin start.

## Scope

- Desktop and tablet widths above 900px only.
- Preserve the existing eight stages, SVG geometry, stage timing, pin distance, service tabs, typography, and responsive layouts.
- Do not modify the cinematic hero or homepage services section.
- Mobile and reduced-motion layouts remain fully visible and static as they are now.

## Behavior

Before the desktop pin starts, the Engagement Rail keeps its navy background but masks its interface content. The preceding section can therefore finish scrolling out without the next animation appearing early.

When ScrollTrigger enters at `start: 'top top'`, it marks the rail as engaged. The complete existing composition becomes visible and the current single-timeline animation proceeds without timing changes.

When scrolling upward past the trigger start, the engaged state is removed so the rail content is hidden again during its pre-pin approach. Leaving the rail at the bottom does not hide the final stage; the normal section transition remains intact.

## Progressive Enhancement

The hidden pre-pin state applies only when the desktop motion controller has initialized successfully. Server-rendered content, JavaScript failure, mobile mode, and reduced-motion mode remain visible. This prevents an animation dependency from making content inaccessible.

## Implementation Boundary

- The desktop controller owns a rail-scoped `data-engaged` state.
- ScrollTrigger sets the state on `onEnter` and `onEnterBack`, removes it on `onLeaveBack`, and preserves it on `onLeave`.
- Rail CSS uses the existing `data-motion` state together with `data-engaged` to mask only the pin contents before engagement.
- Cleanup removes both motion and engaged attributes so breakpoint changes and route navigation cannot retain a stale hidden state.
- The reveal is restrained and non-directional; it must not alter SVG geometry, scrub progress, pin calculations, or stage transitions.

## Verification

- Confirm the Engagement Rail interface is hidden while the preceding section remains visible on desktop.
- Confirm it appears at the pin boundary and all eight stages still resolve in order.
- Confirm scrolling above the boundary hides it again.
- Confirm the final Roadmap stage remains visible when leaving the pin downward.
- Confirm desktop-to-mobile breakpoint changes leave no hidden content or duplicate pin spacer.
- Confirm mobile and reduced-motion presentations remain visible without GSAP.
- Run the complete test suite and production build.
