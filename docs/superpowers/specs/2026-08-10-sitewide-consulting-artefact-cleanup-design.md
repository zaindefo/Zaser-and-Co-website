# Zaser & Co Sitewide Consulting Artefact Cleanup

## Summary

Replace the site’s generic dashboard-style graphics with specific consulting documents. The approved homepage hero and the homepage two-service section remain unchanged. The cleanup begins with “How We Work” and covers each public route that uses `ArtifactVisual` or dashboard-like presentation.

The result should resemble an executive strategy file: named evidence, readable annotations, clear decisions, and restrained use of rust. The site must not present fake software interfaces, interchangeable charts, or unsupported proof.

## Locked decisions

- Keep the approved hero unchanged.
- Keep the homepage two-service section unchanged.
- Preserve the current typography and color system.
- Preserve the current routes, factual copy, forms, metadata, and two-service positioning.
- Remove animation from “How We Work.”
- Show both service lanes and all eight stages in the initial HTML.
- Replace dashboard-like graphics across the homepage, service pages, audit pages, industry pages, local SEO pages, About, insight articles, and StockPulse.
- Keep StockPulse as an illustrative Zaser-built system, not a third service or client result.
- Do not add BreakPoint, market statistics, fabricated scores, client claims, or new commercial services.

## Visual system

Use the current navy, deep navy, rust, grey, white, and paper tokens. Navy defines structure. Paper and white provide document surfaces. Grey carries secondary evidence. Rust marks one selected opportunity, risk, leakage point, intervention, or route.

Use document rules, reference numbers, evidence notes, score bands, issue markers, owners, measures, dates, and status stamps. Labels must name a business concept. Remove generic bars, circular diagnostic graphics, fake controls, app windows, glass panels, neon, and meaningless metrics.

Artefacts use semantic HTML and SVG. Text remains selectable and readable at each breakpoint. Generated raster text is prohibited.

## Component architecture

Retire `ArtifactVisual` and its generic `scorecard`, `matrix`, `system`, `diagnostic`, `cost-map`, `roadmap`, and `process` variants.

Create a shared `DocumentFrame` primitive for:

- document title and reference number;
- evidence or example status;
- paper, white, and navy treatments;
- accessible name and description;
- consistent rules, spacing, and print-like metadata.

Create dedicated artefact components with typed local data:

- `AIReadinessSheet`
- `OpportunityPriorityMatrix`
- `ImplementationWorkflowMap`
- `ImplementationHandoverSheet`
- `CostLeakageScan`
- `CostStructureMap`
- `InterventionPriorityRegister`
- `NinetyDayRoadmap`
- `IndustryDiagnosticMap`
- `AuditAssessmentSheet`
- `OperatingConstraintMap`
- `EngagementMethodSheet`
- `MarginBridgeExample`
- `ValueStreamExample`
- `AIOpportunityExample`
- `StockPulseEvidenceSheet`

Route templates select a component by explicit content purpose. They must not infer a visual from a generic chart type.

## Homepage

### Hero and services

Make no changes to the hero or the two-service split section.

### How We Work

Replace the pinned `MethodStory`, tabs, scroll listener, active-stage state, `aria-live` updates, dashboard switching, and bottom active-step navigator.

Build one static section with two stacked engagement dossiers:

1. AI Audit & Implementation
   - Assess: five-dimension readiness sheet.
   - Prioritise: impact × feasibility matrix with one selected use case.
   - Build: current workflow to working-system map.
   - Hand Over: documentation, training, ownership, and status sheet.
2. Management & Operations Strategy
   - Diagnose: cost, time, process, and margin-leakage scan.
   - Map: cost-structure and value-stream document.
   - Prioritise: ranked intervention register.
   - Roadmap: 90-day plan with owners, measures, and deadlines.

Desktop uses a two-column stage grid inside each dossier. Tablet and mobile use one chronological column. Thin rules show sequence. The section contains no animation, transition, sticky scene, hover-only information, or JavaScript state.

### Proof and outputs

Replace the rotated collage and repeated generic output cards with finished engagement documents. Each item shows its title, purpose, and named fields. Keep current factual output copy and the four working principles.

### Insights and contact

Keep the current editorial insight structure and contact form. Replace an insight graphic only when it resembles a generic dashboard. Do not change form behavior.

## Route mapping

### Service pages

Map the AI phases to readiness, priority, workflow, and handover documents. Map the operations phases to leakage, cost structure, intervention priority, and 90-day roadmap documents. Keep service copy, deliverables, CTAs, and route paths.

### Audit pages

Use `AuditAssessmentSheet` with the audit’s named dimensions. Show quiet score bands, issue markers, and interpretation notes. Do not invent a completed score for the visitor.

### Industry pages

Use `IndustryDiagnosticMap` populated from each industry’s existing tensions. Connect the tension, affected operating area, relevant engagement, and tangible output.

### Local SEO pages

Use `OperatingConstraintMap` to connect source evidence, constraint, priority, engagement, and ownership. Preserve current local positioning and CTAs.

### About

Use `EngagementMethodSheet` to show diagnosis, prioritisation, build or roadmap, and ownership. Preserve the current company and founder information.

### Insight articles

Use a distinct worked example for each article:

- revenue trap: `MarginBridgeExample`;
- silent bleed: `ValueStreamExample`;
- time trap: `AIOpportunityExample`.

Retain the existing fictional-example disclosures.

### StockPulse

Replace the dashboard frame and signal cards with `StockPulseEvidenceSheet`. Show SKU velocity rows, reorder thresholds, dead-stock flags, stock coverage, and supplier action notes. Keep the “example data” and illustrative-system disclosures. Use one operating sheet rather than fake app chrome.

## Motion and interaction

“How We Work” contains no motion.

Other route artefacts may use a short section entrance or hover emphasis. They must not morph data, switch dashboard states, hide required information, or depend on animation for meaning. Reduced-motion mode shows the same content with transitions removed.

## Accessibility and responsive behavior

- Give each artefact an accessible name and short description.
- Keep labels as real text.
- Maintain heading order and keyboard focus.
- Meet WCAG AA contrast for text and document rules.
- Prevent horizontal scrolling at 320px width.
- Remove secondary annotations on small screens only when the primary meaning remains intact.
- Stack document columns on mobile and keep chronological order.
- Preserve all information when JavaScript fails.

## Verification

- Add rendering tests for each dedicated artefact.
- Test explicit route-to-artefact mappings.
- Confirm both service lanes and all eight “How We Work” stages render at once.
- Confirm “How We Work” has no tabs, scroll listener, sticky scene, or animated active state.
- Run the content-integrity suite and preserve the two approved services.
- Search the repository for `ArtifactVisual`, `stock-dashboard`, generic dashboard copy, fake app chrome, and unsupported claims.
- Run the production Next.js build and sitemap generation.
- Crawl each public route.
- Inspect desktop, tablet, mobile, reduced-motion, keyboard, screen-reader naming, contrast, clipping, and horizontal overflow.

## Acceptance criteria

- The approved hero and homepage service section have no diff.
- No public route renders the old generic artefact component.
- Each consulting visual names the evidence, decision, risk, sequence, or owner it communicates.
- “How We Work” presents eight static stages without state changes or animation.
- StockPulse reads as an implementation example and operating evidence sheet.
- The build and tests pass without new accessibility or runtime errors.
