# Sitewide Consulting Artefact Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every generic dashboard graphic after the approved homepage service section with static, named consulting documents while preserving the hero, service panels, routes, factual copy, and current brand system.

**Architecture:** A shared `DocumentFrame` supplies accessible document structure, tone, reference metadata, and status. Four focused artifact-family modules export sixteen purpose-built React components; route templates choose those components by purpose instead of passing generic chart variants. Existing Node server-render tests cover semantic output and mapping, while CSS supplies the static dossier layout and responsive behavior.

**Tech Stack:** Next.js 16 App Router, React 18, TypeScript 5, semantic HTML/SVG, existing global CSS, Node test runner, React server rendering.

## Global Constraints

- Keep `src/components/home/CinematicHero.tsx` unchanged.
- Keep the homepage `#services` section unchanged.
- Preserve the current typography and the existing navy, deep navy, rust, grey, white, and paper tokens.
- Keep the two commercial services `ai-audit-implementation` and `management-operations`.
- Keep StockPulse labeled as illustrative example data, never a third service or client result.
- Do not add BreakPoint, market statistics, fabricated scores, client claims, fake software controls, neon, glass panels, or new commercial services.
- “How We Work” must render both service lanes and all eight stages in the initial HTML with no client state, tabs, sticky scene, scroll listener, active state, `aria-live`, or animation.
- All artifact labels must be real selectable text; SVG may draw rules or connectors but must not contain the only copy of a label.
- Every artifact must have an accessible name and description and remain usable at 320px without horizontal page scrolling.
- Preserve routes, current factual copy, forms, metadata, sitemap behavior, and fictional-example disclosures.
- Do not add a new animation or chart dependency.

## File Structure

- Create `src/components/consulting-artifacts/types.ts`: shared tones and base prop types.
- Create `src/components/consulting-artifacts/DocumentFrame.tsx`: accessible paper/document shell only.
- Create `src/components/consulting-artifacts/ai-artifacts.tsx`: readiness, priority, workflow, and handover components.
- Create `src/components/consulting-artifacts/operations-artifacts.tsx`: leakage, cost structure, intervention, and roadmap components.
- Create `src/components/consulting-artifacts/context-artifacts.tsx`: industry, audit, local constraint, and About method components.
- Create `src/components/consulting-artifacts/example-artifacts.tsx`: three insight worked examples and StockPulse evidence sheet.
- Create `src/components/consulting-artifacts/index.ts`: public exports only.
- Modify `src/components/home/MethodStory.tsx`: static two-dossier sequence.
- Modify `src/components/routes/*.tsx`: explicit route-to-document mapping.
- Modify `src/app/page.tsx`, `src/app/about/page.tsx`, both local SEO pages, and `src/app/stockpulse/page.tsx`: replace remaining generic graphics.
- Modify `src/content/types.ts` and `src/content/outputs.ts`: replace generic chart variants with named output IDs.
- Modify `src/app/globals.css`: remove generic dashboard styles and add dossier/document styles.
- Modify existing tests and create `tests/consulting-artifacts.test.tsx`: server-render, mapping, static-method, and source-integrity coverage.
- Delete `src/components/editorial/ArtifactVisual.tsx` after the last import is removed.

---

### Task 1: Accessible document foundation

**Files:**
- Create: `src/components/consulting-artifacts/types.ts`
- Create: `src/components/consulting-artifacts/DocumentFrame.tsx`
- Create: `src/components/consulting-artifacts/index.ts`
- Create: `tests/consulting-artifacts.test.tsx`
- Modify: `tsconfig.test.json`

**Interfaces:**
- Produces: `DocumentTone = 'paper' | 'white' | 'navy'`.
- Produces: `ArtifactBaseProps = { tone?: DocumentTone; className?: string }`.
- Produces: `DocumentFrameProps = ArtifactBaseProps & { artifactId: string; title: string; reference: string; status: string; description: string; children: ReactNode }`.
- Produces: `<DocumentFrame>` with `role="figure"`, `aria-labelledby`, `aria-describedby`, and `data-artifact`.

- [ ] **Step 1: Write the failing foundation test**

Create `tests/consulting-artifacts.test.tsx`:

```tsx
import test from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import { DocumentFrame } from '../src/components/consulting-artifacts'

test('document frame exposes a named and described consulting artefact', () => {
  const html = renderToStaticMarkup(
    <DocumentFrame
      artifactId="test-sheet"
      title="Test evidence sheet"
      reference="ZCO / TEST / 01"
      status="Evidence template"
      description="A test description for assistive technology."
    >
      <p>Selectable evidence</p>
    </DocumentFrame>,
  )

  assert.match(html, /role="figure"/)
  assert.match(html, /data-artifact="test-sheet"/)
  assert.match(html, /aria-labelledby=/)
  assert.match(html, /aria-describedby=/)
  assert.match(html, />Selectable evidence</)
})
```

Add `src/components/consulting-artifacts/**/*.tsx` to `tsconfig.test.json` after the editorial component include.

- [ ] **Step 2: Run the focused test and verify the missing module failure**

Run:

```powershell
npm test -- --test-name-pattern="document frame"
```

Expected: TypeScript fails because `../src/components/consulting-artifacts` does not exist.

- [ ] **Step 3: Implement the shared types and frame**

Create `types.ts`:

```ts
export type DocumentTone = 'paper' | 'white' | 'navy'

export interface ArtifactBaseProps {
  tone?: DocumentTone
  className?: string
}
```

Create `DocumentFrame.tsx`:

```tsx
import { useId, type ReactNode } from 'react'
import type { ArtifactBaseProps } from './types'

export interface DocumentFrameProps extends ArtifactBaseProps {
  artifactId: string
  title: string
  reference: string
  status: string
  description: string
  children: ReactNode
}

export function DocumentFrame({
  artifactId,
  title,
  reference,
  status,
  description,
  tone = 'paper',
  className = '',
  children,
}: DocumentFrameProps) {
  const id = useId()
  const titleId = `${id}-title`
  const descriptionId = `${id}-description`

  return (
    <figure
      className={`document-frame document-frame--${tone} ${className}`.trim()}
      data-artifact={artifactId}
      role="figure"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <figcaption className="document-frame__header">
        <span className="document-frame__reference">{reference}</span>
        <h3 id={titleId}>{title}</h3>
        <span className="document-frame__status">{status}</span>
      </figcaption>
      <p id={descriptionId} className="document-frame__description">{description}</p>
      <div className="document-frame__body">{children}</div>
    </figure>
  )
}
```

Create `index.ts`:

```ts
export { DocumentFrame, type DocumentFrameProps } from './DocumentFrame'
export type { ArtifactBaseProps, DocumentTone } from './types'
```

- [ ] **Step 4: Run the focused test and type-check**

Run:

```powershell
npm test -- --test-name-pattern="document frame"
```

Expected: the document frame test passes.

- [ ] **Step 5: Commit the foundation**

```powershell
git add -- tsconfig.test.json tests/consulting-artifacts.test.tsx src/components/consulting-artifacts
git commit -m "feat: add consulting document foundation"
```

---

### Task 2: AI engagement documents

**Files:**
- Create: `src/components/consulting-artifacts/ai-artifacts.tsx`
- Modify: `src/components/consulting-artifacts/index.ts`
- Modify: `tests/consulting-artifacts.test.tsx`

**Interfaces:**
- Consumes: `DocumentFrame` and `ArtifactBaseProps` from Task 1.
- Produces: `AIReadinessSheet`, `OpportunityPriorityMatrix`, `ImplementationWorkflowMap`, and `ImplementationHandoverSheet`, each accepting `ArtifactBaseProps`.

- [ ] **Step 1: Add failing server-render tests for all four AI documents**

Append:

```tsx
import {
  AIReadinessSheet,
  OpportunityPriorityMatrix,
  ImplementationWorkflowMap,
  ImplementationHandoverSheet,
} from '../src/components/consulting-artifacts'

test('AI documents name readiness, selection, workflow, and handover evidence', () => {
  const html = [
    <AIReadinessSheet key="readiness" />,
    <OpportunityPriorityMatrix key="priority" />,
    <ImplementationWorkflowMap key="workflow" />,
    <ImplementationHandoverSheet key="handover" />,
  ].map((node) => renderToStaticMarkup(node)).join('')

  for (const artifactId of ['ai-readiness', 'opportunity-priority', 'implementation-workflow', 'implementation-handover']) {
    assert.match(html, new RegExp(`data-artifact="${artifactId}"`))
  }
  for (const label of ['Strategy', 'Selected first use case', 'Current workflow', 'Operating guide']) {
    assert.match(html, new RegExp(label))
  }
})
```

- [ ] **Step 2: Run the test and verify missing exports**

Run:

```powershell
npm test -- --test-name-pattern="AI documents"
```

Expected: TypeScript reports that the four exports do not exist.

- [ ] **Step 3: Implement the AI artifact family with named, non-claim evidence**

Create `ai-artifacts.tsx`. Use these exact data sets and status disclosures:

```tsx
import { DocumentFrame } from './DocumentFrame'
import type { ArtifactBaseProps } from './types'

const readinessRows = [
  ['Strategy', 'Business outcome and decision owner', 'Assess'],
  ['Data', 'Source, access, quality, and retention', 'Assess'],
  ['Technology', 'Integration boundary and reliability', 'Assess'],
  ['People', 'Workflow owner and adoption conditions', 'Assess'],
  ['Governance', 'Risk, privacy, review, and accountability', 'Assess'],
] as const

const opportunities = [
  ['Weekly reporting', 'Medium impact', 'High feasibility'],
  ['Order exceptions', 'High impact', 'High feasibility'],
  ['Customer FAQ', 'Medium impact', 'Medium feasibility'],
  ['Forecasting', 'High impact', 'Low feasibility'],
] as const

const workflow = [
  ['01', 'Current workflow', 'Capture the repeated request'],
  ['02', 'Decision boundary', 'Name what requires human review'],
  ['03', 'Working system', 'Connect source, action, and record'],
  ['04', 'Operating check', 'Review exceptions and reliability'],
] as const

const handover = [
  ['Operating guide', 'Required', 'Workflow owner'],
  ['Exception rules', 'Required', 'Process owner'],
  ['Owner training', 'Scheduled', 'Engagement lead'],
  ['Support boundary', 'Documented', 'Technical owner'],
] as const
```

Render each component inside `DocumentFrame` with these exact frame values:

| Component | `artifactId` | Reference | Status | Body structure |
|---|---|---|---|---|
| `AIReadinessSheet` | `ai-readiness` | `ZCO / AI / 01` | `Assessment template` | five `.document-rows` containing dimension, evidence, and “Assess”; footer legend `Ready / Constraint / Evidence missing` |
| `OpportunityPriorityMatrix` | `opportunity-priority` | `ZCO / AI / 02` | `Worked example` | axis labels `Business impact` and `Implementation feasibility`; four named opportunities; add `.is-selected` to `Order exceptions`; include `Selected first use case: Order exceptions` |
| `ImplementationWorkflowMap` | `implementation-workflow` | `ZCO / AI / 03` | `Engagement method` | ordered four-step workflow using the `workflow` data and visible arrow separators |
| `ImplementationHandoverSheet` | `implementation-handover` | `ZCO / AI / 04` | `Handover checklist` | four rows with document, status, and owner columns using `handover` |

Use `tone={tone}`, `className={className}`, and descriptions that state what the document communicates. The matrix description must include “Illustrative use cases, not client results.”

Implement the four exports with this JSX:

```tsx
export function AIReadinessSheet({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return <DocumentFrame artifactId="ai-readiness" title="AI readiness sheet" reference="ZCO / AI / 01" status="Assessment template" description="Five evidence areas used to identify readiness and constraints before implementation." tone={tone} className={className}>
    <div className="document-rows">
      {readinessRows.map(([dimension, evidence, status]) => <div className="document-row" key={dimension}><strong>{dimension}</strong><span>{evidence}</span><span className="document-note">{status}</span></div>)}
    </div>
    <p className="document-legend">Interpretation bands: Ready / Constraint / Evidence missing</p>
  </DocumentFrame>
}

export function OpportunityPriorityMatrix({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return <DocumentFrame artifactId="opportunity-priority" title="Opportunity priority matrix" reference="ZCO / AI / 02" status="Worked example" description="Illustrative use cases, not client results. The matrix compares business impact with implementation feasibility." tone={tone} className={className}>
    <div className="opportunity-matrix">
      <span className="document-axis">Business impact</span>
      <div className="document-rows">{opportunities.map(([name, impact, feasibility]) => <div className={`document-row${name === 'Order exceptions' ? ' is-selected' : ''}`} key={name}><strong>{name}</strong><span>{impact}</span><span>{feasibility}</span></div>)}</div>
      <span className="document-axis">Implementation feasibility</span>
    </div>
    <p className="document-selection">Selected first use case: <strong>Order exceptions</strong></p>
  </DocumentFrame>
}

export function ImplementationWorkflowMap({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return <DocumentFrame artifactId="implementation-workflow" title="Implementation workflow map" reference="ZCO / AI / 03" status="Engagement method" description="The document connects the current workflow, human decision boundary, working system, and operating check." tone={tone} className={className}>
    <ol className="document-flow">{workflow.map(([number, title, detail]) => <li className="document-flow__step" key={number}><span className="document-note">{number}</span><strong>{title}</strong><p>{detail}</p></li>)}</ol>
  </DocumentFrame>
}

export function ImplementationHandoverSheet({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return <DocumentFrame artifactId="implementation-handover" title="Implementation handover sheet" reference="ZCO / AI / 04" status="Handover checklist" description="Required documents, transfer status, and operating owner for a working implementation." tone={tone} className={className}>
    <div className="document-rows">{handover.map(([item, status, owner]) => <div className="document-row" key={item}><strong>{item}</strong><span>{status}</span><span className="document-owner">{owner}</span></div>)}</div>
  </DocumentFrame>
}
```

- [ ] **Step 4: Export and verify the AI family**

Append to `index.ts`:

```ts
export {
  AIReadinessSheet,
  OpportunityPriorityMatrix,
  ImplementationWorkflowMap,
  ImplementationHandoverSheet,
} from './ai-artifacts'
```

Run:

```powershell
npm test -- --test-name-pattern="AI documents"
```

Expected: the AI document test passes and output contains all four `data-artifact` values.

- [ ] **Step 5: Commit the AI artifacts**

```powershell
git add -- tests/consulting-artifacts.test.tsx src/components/consulting-artifacts
git commit -m "feat: add AI engagement documents"
```

---

### Task 3: Operations engagement documents

**Files:**
- Create: `src/components/consulting-artifacts/operations-artifacts.tsx`
- Modify: `src/components/consulting-artifacts/index.ts`
- Modify: `tests/consulting-artifacts.test.tsx`

**Interfaces:**
- Consumes: `DocumentFrame` and `ArtifactBaseProps`.
- Produces: `CostLeakageScan`, `CostStructureMap`, `InterventionPriorityRegister`, and `NinetyDayRoadmap`, each accepting `ArtifactBaseProps`.

- [ ] **Step 1: Add the failing operations render test**

```tsx
import {
  CostLeakageScan,
  CostStructureMap,
  InterventionPriorityRegister,
  NinetyDayRoadmap,
} from '../src/components/consulting-artifacts'

test('operations documents name leakage, cost behavior, action priority, and ownership', () => {
  const html = [
    <CostLeakageScan key="leakage" />,
    <CostStructureMap key="cost" />,
    <InterventionPriorityRegister key="priority" />,
    <NinetyDayRoadmap key="roadmap" />,
  ].map((node) => renderToStaticMarkup(node)).join('')

  for (const artifactId of ['cost-leakage', 'cost-structure', 'intervention-priority', 'ninety-day-roadmap']) {
    assert.match(html, new RegExp(`data-artifact="${artifactId}"`))
  }
  for (const label of ['Margin leakage', 'Semi-variable', 'Decision owner', 'Day 61–90']) {
    assert.match(html, new RegExp(label))
  }
})
```

- [ ] **Step 2: Run the focused test and confirm missing exports**

Run `npm test -- --test-name-pattern="operations documents"`.

Expected: TypeScript reports the four missing exports.

- [ ] **Step 3: Implement the operations artifact family**

Create `operations-artifacts.tsx` with these typed constants:

```tsx
const leakageRows = [
  ['Cost leakage', 'Which commitment no longer matches demand?', 'Source evidence'],
  ['Time leakage', 'Where does work wait or repeat?', 'Observed flow'],
  ['Process leakage', 'Which handoff lacks a clear owner?', 'Process trace'],
  ['Margin leakage', 'Where does activity fail to create contribution?', 'Cost model'],
] as const

const costRows = [
  ['Fixed', 'Committed base', 'Review capacity and necessity'],
  ['Variable', 'Moves with volume', 'Connect to unit economics'],
  ['Semi-variable', 'Changes in steps', 'Identify threshold behavior'],
] as const

const interventions = [
  ['01', 'Exception ownership', 'High', 'Operations owner', 'Cycle time'],
  ['02', 'Pricing review', 'High', 'Commercial owner', 'Contribution'],
  ['03', 'Supplier cycle', 'Medium', 'Purchasing owner', 'Stock cover'],
] as const

const roadmapRows = [
  ['Day 01–30', 'Stabilise evidence and controls', 'Engagement lead', 'Baseline agreed'],
  ['Day 31–60', 'Implement priority process changes', 'Operations owner', 'Flow reviewed'],
  ['Day 61–90', 'Embed ownership and measures', 'Executive owner', 'Review rhythm active'],
] as const
```

Use these frame definitions:

| Component | `artifactId` | Reference | Status | Required body |
|---|---|---|---|---|
| `CostLeakageScan` | `cost-leakage` | `ZCO / OPS / 01` | `Diagnostic template` | four rows from `leakageRows`; columns `Lens`, `Question`, `Evidence` |
| `CostStructureMap` | `cost-structure` | `ZCO / OPS / 02` | `Mapping template` | three behavior rows from `costRows` plus rule `Revenue → direct cost → contribution → operating base` |
| `InterventionPriorityRegister` | `intervention-priority` | `ZCO / OPS / 03` | `Worked example` | ranked rows; visible columns `Rank`, `Intervention`, `Priority`, `Decision owner`, `Measure`; description says illustrative, not a client result |
| `NinetyDayRoadmap` | `ninety-day-roadmap` | `ZCO / OPS / 04` | `Example plan` | three time bands with action, owner, and measure |

All components accept `{ tone = 'paper', className = '' }: ArtifactBaseProps` and pass both properties to `DocumentFrame`.

Implement the exports with this JSX:

```tsx
export function CostLeakageScan({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return <DocumentFrame artifactId="cost-leakage" title="Cost and leakage scan" reference="ZCO / OPS / 01" status="Diagnostic template" description="Four diagnostic lenses connect operating questions to the source evidence required to answer them." tone={tone} className={className}>
    <div className="document-table document-table--leakage"><div className="document-table__head"><span>Lens</span><span>Question</span><span>Evidence</span></div>{leakageRows.map(([lens, question, evidence]) => <div className="document-row" key={lens}><strong>{lens}</strong><span>{question}</span><span>{evidence}</span></div>)}</div>
  </DocumentFrame>
}

export function CostStructureMap({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return <DocumentFrame artifactId="cost-structure" title="Cost structure map" reference="ZCO / OPS / 02" status="Mapping template" description="A document for separating cost behavior and connecting it to contribution and operating capacity." tone={tone} className={className}>
    <div className="document-cost-flow"><span>Revenue</span><span>Direct cost</span><span>Contribution</span><span>Operating base</span></div>
    <div className="document-rows">{costRows.map(([behavior, meaning, decision]) => <div className="document-row" key={behavior}><strong>{behavior}</strong><span>{meaning}</span><span>{decision}</span></div>)}</div>
  </DocumentFrame>
}

export function InterventionPriorityRegister({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return <DocumentFrame artifactId="intervention-priority" title="Intervention priority register" reference="ZCO / OPS / 03" status="Worked example" description="Illustrative interventions show how priority, decision owner, and measure stay connected. This is not a client result." tone={tone} className={className}>
    <div className="document-table document-table--priority"><div className="document-table__head"><span>Rank</span><span>Intervention</span><span>Priority</span><span>Decision owner</span><span>Measure</span></div>{interventions.map(([rank, intervention, priority, owner, measure]) => <div className={`document-table__row${rank === '01' ? ' is-selected' : ''}`} key={rank}><span>{rank}</span><strong>{intervention}</strong><span>{priority}</span><span>{owner}</span><span>{measure}</span></div>)}</div>
  </DocumentFrame>
}

export function NinetyDayRoadmap({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return <DocumentFrame artifactId="ninety-day-roadmap" title="90-day improvement roadmap" reference="ZCO / OPS / 04" status="Example plan" description="An example sequence connecting each action period to an owner and review measure." tone={tone} className={className}>
    <div className="roadmap-bands">{roadmapRows.map(([period, action, owner, measure]) => <section className="roadmap-band" key={period}><span className="document-note">{period}</span><strong>{action}</strong><span className="document-owner">Owner: {owner}</span><span className="document-measure">Measure: {measure}</span></section>)}</div>
  </DocumentFrame>
}
```

- [ ] **Step 4: Export and run the operations test**

Append the four exports to `index.ts`, then run:

```powershell
npm test -- --test-name-pattern="operations documents"
```

Expected: PASS.

- [ ] **Step 5: Commit the operations artifacts**

```powershell
git add -- tests/consulting-artifacts.test.tsx src/components/consulting-artifacts
git commit -m "feat: add operations engagement documents"
```

---

### Task 4: Context-specific diagnostic documents

**Files:**
- Create: `src/components/consulting-artifacts/context-artifacts.tsx`
- Modify: `src/components/consulting-artifacts/index.ts`
- Modify: `tests/consulting-artifacts.test.tsx`

**Interfaces:**
- Produces: `IndustryDiagnosticMap({ industry, tone?, className? }: ArtifactBaseProps & { industry: IndustryPage })`.
- Produces: `AuditAssessmentSheet({ audit, tone?, className? }: ArtifactBaseProps & { audit: AuditPage })`.
- Produces: `OperatingConstraintMap({ scope, tone?, className? }: ArtifactBaseProps & { scope: 'dhaka' | 'bangladesh' })`.
- Produces: `EngagementMethodSheet(props: ArtifactBaseProps)`.

- [ ] **Step 1: Add failing tests for dynamic industry, audit, local, and About documents**

```tsx
import { INDUSTRIES } from '../src/content/industries'
import { AUDITS } from '../src/content/audits'
import {
  IndustryDiagnosticMap,
  AuditAssessmentSheet,
  OperatingConstraintMap,
  EngagementMethodSheet,
} from '../src/components/consulting-artifacts'

test('context documents render source content without inventing a completed result', () => {
  const industryHtml = renderToStaticMarkup(<IndustryDiagnosticMap industry={INDUSTRIES[0]} />)
  const auditHtml = renderToStaticMarkup(<AuditAssessmentSheet audit={AUDITS[1]} tone="navy" />)
  const localHtml = renderToStaticMarkup(<OperatingConstraintMap scope="dhaka" tone="navy" />)
  const methodHtml = renderToStaticMarkup(<EngagementMethodSheet />)

  assert.match(industryHtml, /Margin visibility/)
  assert.match(industryHtml, /Management &amp; Operations Strategy/)
  assert.match(auditHtml, /Governance/)
  assert.match(auditHtml, /Not scored before the conversation/)
  assert.match(localHtml, /Observed work/)
  assert.match(methodHtml, /Transfer ownership/)
  assert.doesNotMatch(auditHtml, /87%|ROI|client result/i)
})
```

- [ ] **Step 2: Run the test and verify the missing module exports**

Run `npm test -- --test-name-pattern="context documents"`.

Expected: TypeScript reports the four missing exports.

- [ ] **Step 3: Implement the context family with explicit mappings**

Create `context-artifacts.tsx` using real content props. The industry map must zip `industry.tensions` to `industry.diagnostic` and use this explicit engagement/output rotation:

```tsx
const industryRoutes = [
  ['Management & Operations Strategy', 'Operations diagnostic'],
  ['Management & Operations Strategy', 'Cost structure map'],
  ['AI Audit & Implementation', 'Opportunity priority matrix'],
] as const
```

Each industry row renders `Tension`, `Operating area`, `Relevant engagement`, and `Tangible output`; `Operating area` uses the diagnostic entry at the same index.

The audit sheet maps every `audit.dimensions` item to a row with the dimension title, its existing description, an issue marker reading `Discuss`, and `Not scored before the conversation`. Add a quiet interpretation legend under the rows with the three bands `Evidence present`, `Constraint`, and `Evidence missing`, followed by the note `Bands organise the conversation; they do not report a completed visitor score.` Set reference to `ZCO / AUDIT / AI` or `ZCO / AUDIT / BUSINESS` from `audit.inquiryType` and status to `Unscored assessment template`.

Use this exact local constraint data:

```tsx
const localSources = {
  dhaka: [
    ['Available numbers', 'Financial and operating records'],
    ['Observed work', 'Handoffs, delays, and repeated decisions'],
    ['Existing tools', 'Systems already used by the team'],
    ['Decision bottleneck', 'The choice that remains difficult'],
  ],
  bangladesh: [
    ['Available numbers', 'Cost, pricing, and margin evidence'],
    ['Observed work', 'Process and ownership evidence'],
    ['Existing tools', 'Technology and information evidence'],
    ['Operating constraint', 'Priority to diagnose before prescribing'],
  ],
} as const
```

Render a final row under both scopes: `Evidence → constraint → priority → engagement → owner`. Use status `Diagnostic method`, never a completed local-business score.

Use this exact About method data:

```tsx
const engagementMethod = [
  ['01', 'Diagnose', 'Trace the evidence and name the operating tension'],
  ['02', 'Prioritise', 'Separate consequential action from noise'],
  ['03', 'Build or roadmap', 'Create the system or sequenced operating plan'],
  ['04', 'Transfer ownership', 'Leave documents, measures, and owners with the team'],
] as const
```

Frame IDs are `industry-diagnostic`, `audit-assessment`, `operating-constraint`, and `engagement-method`.

Use these component bodies:

```tsx
import type { AuditPage, IndustryPage } from '../../content/types'
import { DocumentFrame } from './DocumentFrame'
import type { ArtifactBaseProps } from './types'

export function IndustryDiagnosticMap({ industry, tone = 'paper', className = '' }: ArtifactBaseProps & { industry: IndustryPage }) {
  return <DocumentFrame artifactId="industry-diagnostic" title={`${industry.title} diagnostic map`} reference={`ZCO / INDUSTRY / ${industry.slug.toUpperCase()}`} status="Sector diagnostic" description="Existing sector tensions connected to the operating area, relevant engagement, and tangible output." tone={tone} className={className}>
    <div className="industry-map">{industry.tensions.map((tension, index) => { const [engagement, output] = industryRoutes[index]; return <section className="industry-map__row" key={tension.title}><div><span className="document-note">Tension</span><strong>{tension.title}</strong><p>{tension.description}</p></div><div><span className="document-note">Operating area</span><p>{industry.diagnostic[index]}</p></div><div><span className="document-note">Relevant engagement</span><p>{engagement}</p></div><div><span className="document-note">Tangible output</span><p>{output}</p></div></section> })}</div>
  </DocumentFrame>
}

export function AuditAssessmentSheet({ audit, tone = 'paper', className = '' }: ArtifactBaseProps & { audit: AuditPage }) {
  const reference = audit.inquiryType === 'ai-audit' ? 'ZCO / AUDIT / AI' : 'ZCO / AUDIT / BUSINESS'
  return <DocumentFrame artifactId="audit-assessment" title={`${audit.title} assessment sheet`} reference={reference} status="Unscored assessment template" description="The assessment organises evidence and interpretation without inventing a visitor score." tone={tone} className={className}>
    <div className="document-rows">{audit.dimensions.map((dimension) => <div className="document-row" key={dimension.title}><div><strong>{dimension.title}</strong><p>{dimension.description}</p></div><span>Evidence to discuss</span><span className="document-note">Discuss</span></div>)}</div>
    <div className="assessment-bands"><span>Evidence present</span><span>Constraint</span><span>Evidence missing</span></div>
    <p className="document-interpretation">Not scored before the conversation. Bands organise the conversation; they do not report a completed visitor score.</p>
  </DocumentFrame>
}

export function OperatingConstraintMap({ scope, tone = 'paper', className = '' }: ArtifactBaseProps & { scope: keyof typeof localSources }) {
  return <DocumentFrame artifactId="operating-constraint" title="Operating constraint map" reference={`ZCO / LOCAL / ${scope.toUpperCase()}`} status="Diagnostic method" description="The map connects available evidence to the constraint, priority, engagement, and operating owner." tone={tone} className={className}>
    <div className="document-rows">{localSources[scope].map(([source, evidence]) => <div className="document-row" key={source}><strong>{source}</strong><span>{evidence}</span><span className="document-note">Review source</span></div>)}</div>
    <div className="document-constraint-flow"><span>Evidence</span><span>Constraint</span><span>Priority</span><span>Engagement</span><span>Owner</span></div>
  </DocumentFrame>
}

export function EngagementMethodSheet({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  return <DocumentFrame artifactId="engagement-method" title="Engagement method sheet" reference="ZCO / METHOD / 01" status="Working method" description="Four stages connect diagnosis and priority to a built output or roadmap that the client team owns." tone={tone} className={className}>
    <ol className="document-flow">{engagementMethod.map(([number, title, detail]) => <li className="document-flow__step" key={number}><span className="document-note">{number}</span><strong>{title}</strong><p>{detail}</p></li>)}</ol>
  </DocumentFrame>
}
```

- [ ] **Step 4: Export the context family and verify**

Append the four exports to `index.ts`. Run `npm test -- --test-name-pattern="context documents"`.

Expected: PASS with no fabricated score pattern.

- [ ] **Step 5: Commit the context documents**

```powershell
git add -- tests/consulting-artifacts.test.tsx src/components/consulting-artifacts
git commit -m "feat: add contextual diagnostic documents"
```

---

### Task 5: Worked examples and StockPulse evidence

**Files:**
- Create: `src/components/consulting-artifacts/example-artifacts.tsx`
- Modify: `src/components/consulting-artifacts/index.ts`
- Modify: `tests/consulting-artifacts.test.tsx`

**Interfaces:**
- Produces: `MarginBridgeExample({ example, tone?, className? }: ArtifactBaseProps & { example: Insight['example'] })`.
- Produces: `ValueStreamExample({ example, tone?, className? }: ArtifactBaseProps & { example: Insight['example'] })`.
- Produces: `AIOpportunityExample({ example, tone?, className? }: ArtifactBaseProps & { example: Insight['example'] })`.
- Produces: `StockPulseEvidenceSheet(props: ArtifactBaseProps)`.

- [ ] **Step 1: Add failing disclosure and field tests**

```tsx
import { INSIGHTS } from '../src/content/insights'
import {
  MarginBridgeExample,
  ValueStreamExample,
  AIOpportunityExample,
  StockPulseEvidenceSheet,
} from '../src/components/consulting-artifacts'

test('worked examples and StockPulse retain explicit illustrative disclosures', () => {
  const examples = [
    <MarginBridgeExample key="margin" example={INSIGHTS[0].example} />,
    <ValueStreamExample key="stream" example={INSIGHTS[1].example} />,
    <AIOpportunityExample key="ai" example={INSIGHTS[2].example} />,
  ].map((node) => renderToStaticMarkup(node)).join('')
  const stock = renderToStaticMarkup(<StockPulseEvidenceSheet tone="navy" />)

  assert.match(examples, /not a client result|not presented as client proof|does not claim a client outcome/)
  assert.match(examples, /Direct cost/)
  assert.match(examples, /Exception/)
  assert.match(examples, /Feasibility/)
  for (const label of ['SKU velocity', 'Reorder threshold', 'Dead-stock flag', 'Stock coverage', 'Supplier action']) {
    assert.match(stock, new RegExp(label))
  }
  assert.match(stock, /Example data/)
})
```

- [ ] **Step 2: Run the focused test and verify missing exports**

Run `npm test -- --test-name-pattern="worked examples"`.

Expected: TypeScript reports missing exports.

- [ ] **Step 3: Implement the example family**

Create `example-artifacts.tsx`. Each insight component must render `example.title`, `example.description`, and every `example.labels` item as text.

Use these visible example structures:

```tsx
const marginSteps = [
  ['Revenue', 'Starting value'],
  ['Direct cost', 'Deduction'],
  ['Operating cost', 'Deduction'],
  ['Contribution', 'Decision value'],
] as const

const valueStreamSteps = [
  ['Request', 'Owner named'],
  ['Review', 'Wait time recorded'],
  ['Exception', 'Rework flagged'],
  ['Delivery', 'Outcome recorded'],
] as const

const aiOpportunities = [
  ['Reporting workflow', 'Medium impact', 'High feasibility', 'Review first'],
  ['Exception triage', 'High impact', 'High feasibility', 'Selected example'],
  ['Demand forecast', 'High impact', 'Low feasibility', 'Sequence later'],
] as const

const stockRows = [
  ['Core line', '12 / week', '18 units', 'No', '4.2 weeks', 'Hold order'],
  ['Seasonal line', '5 / week', '24 units', 'No', '8.6 weeks', 'Reduce next order'],
  ['New line', '3 / week', '10 units', 'No', '3.1 weeks', 'Review after two cycles'],
  ['Long-tail line', '<1 / week', '6 units', 'Yes', '16+ weeks', 'Pause and discuss return'],
] as const
```

The StockPulse table headers must be `Item group`, `SKU velocity`, `Reorder threshold`, `Dead-stock flag`, `Stock coverage`, and `Supplier action`. Its frame uses `artifactId="stockpulse-evidence"`, reference `ZCO / SYSTEM / STOCKPULSE`, status `Example data`, and a description stating it is illustrative, not a separate service or client result.

The three insight frame IDs are `margin-bridge-example`, `value-stream-example`, and `ai-opportunity-example`; each uses status `Worked example`.

Implement the four exports with this JSX:

```tsx
import type { Insight } from '../../content/types'
import { DocumentFrame } from './DocumentFrame'
import type { ArtifactBaseProps } from './types'

type InsightExampleProps = ArtifactBaseProps & { example: Insight['example'] }

export function MarginBridgeExample({ example, tone = 'paper', className = '' }: InsightExampleProps) {
  return <DocumentFrame artifactId="margin-bridge-example" title={example.title} reference="ZCO / EXAMPLE / MARGIN" status="Worked example" description={example.description} tone={tone} className={className}>
    <div className="margin-bridge">{marginSteps.map(([label, role]) => <div className="margin-bridge__step" key={label}><strong>{label}</strong><span>{role}</span></div>)}</div>
    <div className="example-labels">{example.labels.map((label) => <span key={label}>{label}</span>)}</div>
  </DocumentFrame>
}

export function ValueStreamExample({ example, tone = 'paper', className = '' }: InsightExampleProps) {
  return <DocumentFrame artifactId="value-stream-example" title={example.title} reference="ZCO / EXAMPLE / FLOW" status="Worked example" description={example.description} tone={tone} className={className}>
    <ol className="document-flow">{valueStreamSteps.map(([label, evidence], index) => <li className={`document-flow__step${label === 'Exception' ? ' is-selected' : ''}`} key={label}><span className="document-note">{String(index + 1).padStart(2, '0')}</span><strong>{label}</strong><p>{evidence}</p></li>)}</ol>
    <div className="example-labels">{example.labels.map((label) => <span key={label}>{label}</span>)}</div>
  </DocumentFrame>
}

export function AIOpportunityExample({ example, tone = 'paper', className = '' }: InsightExampleProps) {
  return <DocumentFrame artifactId="ai-opportunity-example" title={example.title} reference="ZCO / EXAMPLE / AI" status="Worked example" description={example.description} tone={tone} className={className}>
    <div className="document-table document-table--opportunities">{aiOpportunities.map(([name, impact, feasibility, sequence]) => <div className={`document-row${sequence === 'Selected example' ? ' is-selected' : ''}`} key={name}><strong>{name}</strong><span>{impact}</span><span>{feasibility}</span><span>{sequence}</span></div>)}</div>
    <div className="example-labels">{example.labels.map((label) => <span key={label}>{label}</span>)}</div>
  </DocumentFrame>
}

export function StockPulseEvidenceSheet({ tone = 'paper', className = '' }: ArtifactBaseProps) {
  const headers = ['Item group', 'SKU velocity', 'Reorder threshold', 'Dead-stock flag', 'Stock coverage', 'Supplier action'] as const
  return <DocumentFrame artifactId="stockpulse-evidence" title="StockPulse operating evidence sheet" reference="ZCO / SYSTEM / STOCKPULSE" status="Example data" description="Illustrative inventory evidence, not a separate service or client result. The sheet connects stock signals to the next supplier action." tone={tone} className={className}>
    <div className="stock-evidence-table"><div className="stock-evidence-table__row stock-evidence-table__head">{headers.map((header) => <span key={header}>{header}</span>)}</div>{stockRows.map((row) => <div className="stock-evidence-table__row" key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}</div>
  </DocumentFrame>
}
```

- [ ] **Step 4: Export and run the example test**

Append the four exports to `index.ts`. Run `npm test -- --test-name-pattern="worked examples"`.

Expected: PASS.

- [ ] **Step 5: Commit the example artifacts**

```powershell
git add -- tests/consulting-artifacts.test.tsx src/components/consulting-artifacts
git commit -m "feat: add worked example evidence sheets"
```

---

### Task 6: Static homepage method and named output documents

**Files:**
- Modify: `src/components/home/MethodStory.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/content/types.ts`
- Modify: `src/content/outputs.ts`
- Modify: `tests/method-story.test.tsx`
- Modify: `tests/editorial-components.test.tsx`

**Interfaces:**
- Consumes: all AI and operations artifact components.
- Produces: static `MethodStory()` server component with two dossiers and eight `.method-stage` articles.
- Produces: `EngagementOutput.artifact` as named document IDs rather than generic chart types.

- [ ] **Step 1: Strengthen the method test so the current client implementation fails**

Replace the existing method test with:

```tsx
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { MethodStory } from '../src/components/home/MethodStory'

test('method story renders two static dossiers and all eight stages', () => {
  const html = renderToStaticMarkup(<MethodStory />)
  const source = readFileSync('src/components/home/MethodStory.tsx', 'utf8')

  assert.match(html, /AI Audit &amp; Implementation/)
  assert.match(html, /Management &amp; Operations Strategy/)
  for (const label of ['Assess', 'Build', 'Hand over', 'Diagnose', 'Map', 'Roadmap']) {
    assert.match(html, new RegExp(`>${label}<`))
  }
  assert.equal((html.match(/class="method-stage/g) ?? []).length, 8)
  assert.doesNotMatch(html, /button|aria-live|aria-pressed/)
  assert.doesNotMatch(source, /use client|useEffect|useState|addEventListener|position:\s*sticky/)
})
```

Remove the old `ArtifactVisual` assertion and import from `tests/editorial-components.test.tsx`; the dedicated artifact suite now owns that responsibility.

- [ ] **Step 2: Run the method test and verify it fails on the old tabs/state**

Run `npm test -- --test-name-pattern="method story"`.

Expected: FAIL because only the active lane is rendered and button/state code remains.

- [ ] **Step 3: Replace `MethodStory` with static dossier data and explicit components**

Remove `'use client'`, every React hook import, `LANES`, buttons, active rail, and sticky wrapper. Define:

```tsx
const dossiers = [
  {
    service: 'AI Audit & Implementation',
    reference: 'ENGAGEMENT 01',
    stages: [
      { label: 'Assess', title: 'Read the business before choosing the technology.', body: 'Strategy, Data, Technology, People, and Governance reveal where AI can create credible value.', Artefact: AIReadinessSheet },
      { label: 'Prioritise', title: 'Compare impact with feasibility.', body: 'Opportunity is ranked before budget is committed.', Artefact: OpportunityPriorityMatrix },
      { label: 'Build', title: 'Make one system work inside the operation.', body: 'The selected use case becomes a practical workflow connected to the way the team already works.', Artefact: ImplementationWorkflowMap },
      { label: 'Hand over', title: 'Leave ownership with the team.', body: 'Documentation, operating instructions, and training keep the implementation usable.', Artefact: ImplementationHandoverSheet },
    ],
  },
  {
    service: 'Management & Operations Strategy',
    reference: 'ENGAGEMENT 02',
    stages: [
      { label: 'Diagnose', title: 'See cost, flow, and margin as one system.', body: 'The diagnostic connects financial structure to the movement of work.', Artefact: CostLeakageScan },
      { label: 'Map', title: 'Make the hidden structure visible.', body: 'Cost behavior is mapped alongside process steps and ownership.', Artefact: CostStructureMap },
      { label: 'Prioritise', title: 'Separate consequential change from noise.', body: 'Pricing, waste, delay, and allocation opportunities are ranked for action.', Artefact: InterventionPriorityRegister },
      { label: 'Roadmap', title: 'Sequence the next 90 days.', body: 'Actions receive an owner, a measure, and a deadline.', Artefact: NinetyDayRoadmap },
    ],
  },
] as const
```

Render the section with this static tree. Do not add an event handler or animation wrapper.

```tsx
export function MethodStory() {
  return <section className="method-dossiers" data-nav-theme="dark">
    <div className="method-dossiers__intro">
      <span className="eyebrow eyebrow--light">[ How we work ]</span>
      <h2 className="display display--lg">Two engagements with eight visible stages.</h2>
    </div>
    {dossiers.map((dossier) => <article className="method-dossier" key={dossier.reference}>
      <header className="method-dossier__header"><span className="document-note">{dossier.reference}</span><h2>{dossier.service}</h2></header>
      <div className="method-dossier__stages">{dossier.stages.map((stage, index) => {
        const Artefact = stage.Artefact
        return <section className="method-stage" key={stage.label}>
          <div className="method-stage__copy"><span className="document-note">{String(index + 1).padStart(2, '0')} / {stage.label}</span><h3>{stage.title}</h3><p>{stage.body}</p></div>
          <Artefact tone="navy" />
        </section>
      })}</div>
    </article>)}
  </section>
}
```

- [ ] **Step 4: Replace homepage proof/output generic IDs with named documents**

Change `EngagementOutput.artifact` in `types.ts` to:

```ts
artifact:
  | 'ai-readiness'
  | 'opportunity-priority'
  | 'implementation-workflow'
  | 'cost-leakage'
  | 'cost-structure'
  | 'ninety-day-roadmap'
```

Update `outputs.ts` so the six records use those six values in the same order. Preserve every existing title and description.

In `page.tsx`, do not alter imports or markup above the closing tag of `#services`. Replace `artifactLabels` with this concrete array so the one component that needs article data receives it as a prop:

```tsx
const proofDocuments = [
  { label: 'AI readiness scorecard', document: <AIReadinessSheet /> },
  { label: 'Opportunity priority matrix', document: <OpportunityPriorityMatrix /> },
  { label: 'Cost structure map', document: <CostStructureMap /> },
  { label: 'Value-stream process map', document: <ValueStreamExample example={INSIGHTS[1].example} /> },
  { label: '90-day improvement roadmap', document: <NinetyDayRoadmap /> },
] as const
```

Render each `document` inside `.proof-document` with its existing numbered label.

Import `ComponentType` from React, `EngagementOutput` from `content/types`, and `ArtifactBaseProps` from the artifact index. Create this mapping:

```tsx
const outputDocuments: Record<EngagementOutput['artifact'], ComponentType<ArtifactBaseProps>> = {
  'ai-readiness': AIReadinessSheet,
  'opportunity-priority': OpportunityPriorityMatrix,
  'implementation-workflow': ImplementationWorkflowMap,
  'cost-leakage': CostLeakageScan,
  'cost-structure': CostStructureMap,
  'ninety-day-roadmap': NinetyDayRoadmap,
}
```

Inside the output map, assign `const OutputDocument = outputDocuments[output.artifact]` and render `<OutputDocument />` in a `.output-dossier-list` article with the existing eyebrow, title, and description. Remove horizontal scrolling and generic card language from the JSX.

- [ ] **Step 5: Run homepage and content tests**

Run:

```powershell
npm test -- --test-name-pattern="method story|publishes exactly|global navigation|footer"
```

Expected: PASS. Confirm the compiled homepage contains both service names and eight method stages.

- [ ] **Step 6: Commit the static homepage integration**

```powershell
git add -- src/components/home/MethodStory.tsx src/app/page.tsx src/content/types.ts src/content/outputs.ts tests/method-story.test.tsx tests/editorial-components.test.tsx
git commit -m "feat: replace homepage dashboards with dossiers"
```

---

### Task 7: Route-template artifact mappings

**Files:**
- Modify: `src/components/routes/ServicePageTemplate.tsx`
- Modify: `src/components/routes/IndustryPageTemplate.tsx`
- Modify: `src/components/routes/AuditPageTemplate.tsx`
- Modify: `src/components/routes/InsightArticleTemplate.tsx`
- Modify: `tests/route-templates.test.tsx`

**Interfaces:**
- Consumes: the artifact exports and existing `Service`, `IndustryPage`, `AuditPage`, and `Insight` content.
- Produces: explicit service and insight component mappings; dynamic industry/audit documents.

- [ ] **Step 1: Add route-to-artifact assertions that fail on `ArtifactVisual`**

Extend `tests/route-templates.test.tsx`:

```tsx
test('route templates select purpose-built documents by content purpose', () => {
  const ai = renderToStaticMarkup(<ServicePageTemplate service={SERVICES[0]} />)
  const operations = renderToStaticMarkup(<ServicePageTemplate service={SERVICES[1]} />)
  const industry = renderToStaticMarkup(<IndustryPageTemplate industry={INDUSTRIES[0]} />)
  const audit = renderToStaticMarkup(<AuditPageTemplate audit={AUDITS[0]} />)
  const insight = renderToStaticMarkup(<InsightArticleTemplate insight={INSIGHTS[2]} />)

  for (const id of ['ai-readiness', 'opportunity-priority', 'implementation-workflow', 'implementation-handover']) {
    assert.match(ai, new RegExp(`data-artifact="${id}"`))
  }
  for (const id of ['cost-leakage', 'cost-structure', 'intervention-priority', 'ninety-day-roadmap']) {
    assert.match(operations, new RegExp(`data-artifact="${id}"`))
  }
  assert.match(industry, /data-artifact="industry-diagnostic"/)
  assert.match(audit, /data-artifact="audit-assessment"/)
  assert.match(insight, /data-artifact="ai-opportunity-example"/)
})
```

- [ ] **Step 2: Run the focused mapping test and confirm failure**

Run `npm test -- --test-name-pattern="purpose-built documents"`.

Expected: FAIL because routes still render `.artifact--<generic-type>`.

- [ ] **Step 3: Implement explicit mappings in the four templates**

In `ServicePageTemplate.tsx`, replace `phaseTypes` and `operationsTypes` with:

```tsx
import type { ComponentType } from 'react'
import type { ArtifactBaseProps } from '../consulting-artifacts'

const serviceArtefacts = {
  'ai-audit-implementation': [AIReadinessSheet, OpportunityPriorityMatrix, ImplementationWorkflowMap, ImplementationHandoverSheet],
  'management-operations': [CostLeakageScan, CostStructureMap, InterventionPriorityRegister, NinetyDayRoadmap],
} satisfies Record<Service['slug'], ReadonlyArray<ComponentType<ArtifactBaseProps>>>
```

Use `const Artefact = serviceArtefacts[service.slug][index]` inside the phase map and render `<Artefact tone="navy" />`. Keep the phase copy, deliverables, CTA, and route hero unchanged.

In `IndustryPageTemplate.tsx`, replace the generic visual with `<IndustryDiagnosticMap industry={industry} />`.

In `AuditPageTemplate.tsx`, replace the conditional generic type with `<AuditAssessmentSheet audit={audit} tone="navy" />`.

In `InsightArticleTemplate.tsx`, add:

```tsx
const insightExamples = {
  'revenue-trap': MarginBridgeExample,
  'silent-bleed': ValueStreamExample,
  'time-trap': AIOpportunityExample,
} as const
```

Select and guard the component with this code so an unmapped article throws a named error:

```tsx
const Example = insightExamples[insight.slug as keyof typeof insightExamples]
if (!Example) {
  throw new Error(`No worked-example document is mapped for insight: ${insight.slug}`)
}
```

Then render `<Example example={insight.example} />`.

- [ ] **Step 4: Run all route-template tests**

Run `npm test -- --test-name-pattern="service routes|industry routes|audit routes|insight routes|purpose-built documents"`.

Expected: all five route-template tests pass.

- [ ] **Step 5: Commit route-template integration**

```powershell
git add -- src/components/routes tests/route-templates.test.tsx
git commit -m "feat: map route templates to consulting documents"
```

---

### Task 8: About, local SEO, and StockPulse integration

**Files:**
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/business-consultant-dhaka/page.tsx`
- Modify: `src/app/business-consultancy-bangladesh/page.tsx`
- Modify: `src/app/stockpulse/page.tsx`
- Create: `tests/standalone-routes.test.tsx`
- Modify: `tsconfig.test.json`

**Interfaces:**
- Consumes: `EngagementMethodSheet`, `OperatingConstraintMap`, and `StockPulseEvidenceSheet`.
- Produces: standalone routes with no generic dashboard markup.

- [ ] **Step 1: Add failing standalone route tests**

Add `src/app/about/page.tsx`, both local SEO page files, and `src/app/stockpulse/page.tsx` to `tsconfig.test.json`. Create:

```tsx
import test from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import AboutPage from '../src/app/about/page'
import DhakaConsultantPage from '../src/app/business-consultant-dhaka/page'
import BangladeshConsultancyPage from '../src/app/business-consultancy-bangladesh/page'
import StockPulsePage from '../src/app/stockpulse/page'

test('standalone routes render their named consulting documents', () => {
  assert.match(renderToStaticMarkup(<AboutPage />), /data-artifact="engagement-method"/)
  assert.match(renderToStaticMarkup(<DhakaConsultantPage />), /data-artifact="operating-constraint"/)
  assert.match(renderToStaticMarkup(<BangladeshConsultancyPage />), /data-artifact="operating-constraint"/)
  const stock = renderToStaticMarkup(<StockPulsePage />)
  assert.equal((stock.match(/data-artifact="stockpulse-evidence"/g) ?? []).length, 1)
  assert.match(stock, /illustrative system|Illustrative system|Example data/)
  assert.doesNotMatch(stock, /stock-dashboard|Inventory operating view/)
})
```

- [ ] **Step 2: Run the standalone test and verify failure**

Run `npm test -- --test-name-pattern="standalone routes"`.

Expected: FAIL because the old generic artifacts and StockPulse dashboard remain.

- [ ] **Step 3: Replace each standalone visual without changing route copy**

- About: replace `<ArtifactVisual type="process" ... />` with `<EngagementMethodSheet />`.
- Dhaka: replace the generic process visual with `<OperatingConstraintMap scope="dhaka" tone="navy" />`.
- Bangladesh: replace the generic diagnostic visual with `<OperatingConstraintMap scope="bangladesh" tone="navy" />`.
- StockPulse: remove `signals`, `rows`, the entire `.stock-dashboard__frame`, and the secondary `ArtifactVisual`. Rename the section to `.stock-evidence` and render one `<StockPulseEvidenceSheet tone="navy" />`. Keep the existing hero disclosure, explanation, two engagement links, metadata, and CTAs.

- [ ] **Step 4: Run the standalone and content-integrity tests**

Run:

```powershell
npm test -- --test-name-pattern="standalone routes|publishes no unapproved|publishes exactly"
```

Expected: PASS.

- [ ] **Step 5: Commit the standalone route integration**

```powershell
git add -- tsconfig.test.json tests/standalone-routes.test.tsx src/app/about/page.tsx src/app/business-consultant-dhaka/page.tsx src/app/business-consultancy-bangladesh/page.tsx src/app/stockpulse/page.tsx
git commit -m "feat: replace standalone route dashboards"
```

---

### Task 9: Dossier styling and generic component removal

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tests/consulting-artifacts.test.tsx`
- Delete: `src/components/editorial/ArtifactVisual.tsx`

**Interfaces:**
- Consumes: the class names emitted by Tasks 1–8.
- Produces: responsive static document styles; no old generic component or dashboard selector.

- [ ] **Step 1: Add a failing source-integrity test**

Append:

```tsx
import { existsSync, readFileSync } from 'node:fs'

test('generic dashboard implementation and selectors are retired', () => {
  const css = readFileSync('src/app/globals.css', 'utf8')
  assert.equal(existsSync('src/components/editorial/ArtifactVisual.tsx'), false)
  assert.doesNotMatch(css, /\.artifact(?:\s|\{|--|__)/)
  assert.doesNotMatch(css, /\.stock-dashboard/)
  assert.doesNotMatch(css, /\.lane-switch|\.method-story__sticky|\.method-story__rail/)
  assert.match(css, /\.document-frame/)
  assert.match(css, /\.method-dossier/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)
})
```

- [ ] **Step 2: Run the source-integrity test and verify old selectors fail it**

Run `npm test -- --test-name-pattern="generic dashboard implementation"`.

Expected: FAIL because `ArtifactVisual.tsx` and old CSS selectors exist.

- [ ] **Step 3: Replace the generic CSS block with the document system**

Delete the old `.artifact`, `.artifact__*`, and `.artifact--dark` rules. Add:

```css
.document-frame {
  --document-ink: var(--z-navy);
  --document-rule: rgba(24,32,64,.2);
  width: 100%; margin: 0; padding: clamp(18px, 2.5vw, 32px);
  color: var(--document-ink); background: var(--z-paper);
  border: 1px solid var(--document-rule); box-shadow: 0 18px 42px rgba(15,20,40,.09);
}
.document-frame--white { background: #fff; }
.document-frame--navy { --document-ink: var(--z-paper); --document-rule: rgba(243,238,229,.2); background: #141a35; box-shadow: none; }
.document-frame__header { display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: start; gap: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--document-rule); }
.document-frame__header h3 { margin: 0; font-family: var(--font-display); font-size: clamp(26px, 3vw, 44px); font-weight: 400; line-height: .92; text-transform: uppercase; }
.document-frame__reference, .document-frame__status { font-family: var(--font-data); font-size: 8px; letter-spacing: .1em; text-transform: uppercase; }
.document-frame__status { padding: 5px 7px; border: 1px solid var(--document-rule); color: var(--z-rust-lift); }
.document-frame__description { max-width: 68ch; margin: 14px 0 24px; color: var(--z-grey-dark); font-size: 12px; }
.document-frame--navy .document-frame__description { color: rgba(243,238,229,.62); }
.document-rows { border-top: 1px solid var(--document-rule); }
.document-row { display: grid; grid-template-columns: minmax(110px,.75fr) minmax(180px,1.5fr) minmax(90px,.6fr); gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--document-rule); }
.document-row > :first-child { font-weight: 700; }
.document-note, .document-axis, .document-owner, .document-measure { font-family: var(--font-data); font-size: 9px; letter-spacing: .04em; text-transform: uppercase; }
.document-flow { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); border-block: 1px solid var(--document-rule); }
.document-flow__step { min-width: 0; padding: 18px; border-right: 1px solid var(--document-rule); }
.document-flow__step:last-child { border-right: 0; }
.is-selected { outline: 2px solid var(--z-rust); outline-offset: -2px; }
```

Add artifact-family modifiers for the matrix axes, roadmap bands, cost-flow rule, evidence table, and selected row. Use CSS Grid and borders only; do not add app chrome, generic progress bars, or animated data states.

- [ ] **Step 4: Replace the old section layouts with static dossier layouts**

Delete `.method-story`, `.method-story__*`, `.lane-switch`, `.artifact-field__item--*`, `.output-rail`, `.output-card`, and `.stock-dashboard*` rules. Add:

```css
.method-dossiers { padding: var(--section-space) var(--page-gutter); color: var(--z-paper); background: var(--z-deep); }
.method-dossiers__intro { max-width: 920px; margin-bottom: clamp(50px,8vw,110px); }
.method-dossier + .method-dossier { margin-top: clamp(90px,12vw,180px); }
.method-dossier__header { display: grid; grid-template-columns: auto 1fr; gap: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--z-line-light); }
.method-dossier__stages { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 1px; background: var(--z-line-light); }
.method-stage { min-width: 0; padding: clamp(24px,4vw,58px); background: var(--z-deep); }
.method-stage__copy { min-height: 260px; }
.method-stage__copy h3 { font-family: var(--font-authority); font-size: clamp(30px,4vw,56px); font-weight: 400; line-height: 1; }
.proof-documents, .output-dossier-list { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: clamp(18px,3vw,36px); margin-top: clamp(50px,8vw,110px); }
.proof-document, .output-dossier { min-width: 0; }
.stock-evidence { padding-top: 0; }
```

At `max-width: 900px`, stack `.method-dossier__stages`, `.proof-documents`, `.output-dossier-list`, `.document-flow`, and wide `.document-row` grids into one chronological column. At `max-width: 560px`, make the frame header one column, reduce frame padding, and use horizontal scrolling only inside `.stock-evidence-table` with `-webkit-overflow-scrolling: touch`; the page itself must remain overflow-free.

Inside the existing `@media (prefers-reduced-motion: reduce)` block, include `.document-frame, .method-stage { animation: none !important; transition: none !important; transform: none !important; }`. Do not add any motion declaration to `.method-dossiers` or descendants outside that fallback.

- [ ] **Step 5: Delete the old component and verify all tests**

Delete `src/components/editorial/ArtifactVisual.tsx`. Run:

```powershell
npm test
```

Expected: the entire Node test suite passes, including source-integrity checks.

- [ ] **Step 6: Commit the design-system replacement**

```powershell
git add -- src/app/globals.css tests/consulting-artifacts.test.tsx
git add -u -- src/components/editorial/ArtifactVisual.tsx
git commit -m "feat: style static consulting dossiers"
```

---

### Task 10: Repository audit, production build, and route crawl

**Files:**
- Modify only if a verification command exposes a defect in the files already touched.

**Interfaces:**
- Consumes: the completed artifact system and public routes.
- Produces: a passing test/build/crawl record and a clean scoped diff.

- [ ] **Step 1: Search for retired implementations and banned presentation language**

Run:

```powershell
rg -n "ArtifactVisual|stock-dashboard|lane-switch|method-story__sticky|artifact--(scorecard|matrix|system|diagnostic|cost-map|roadmap|process)|fake app|dashboard frame" src tests
rg -n "Glow by Rina|FreshKart|StyleHive|8801700000000|zasernco@gmail.com|BreakPoint" src
```

Expected: both commands return no matches. `dashboard` may remain only in historical documentation; no public source component may render it.

- [ ] **Step 2: Verify the protected homepage regions**

Run:

```powershell
git diff f7e7116 -- src/components/home/CinematicHero.tsx
git diff --word-diff=porcelain f7e7116 -- src/app/page.tsx
```

Expected: the first command has no output. In the second diff, changes begin after the closing tag of the homepage `#services` section; the `CinematicHero` call and the full services section are unchanged.

- [ ] **Step 3: Run the complete automated suite and production build**

Run:

```powershell
npm test
npm run build
```

Expected: all tests pass; Next.js production compilation succeeds; `next-sitemap` completes and writes sitemap/robots output.

- [ ] **Step 4: Crawl every retained public route against the production server**

Use a hidden process and always stop it:

```powershell
$server = Start-Process -FilePath "npm.cmd" -ArgumentList @('run','start','--','-p','3100') -WorkingDirectory (Get-Location) -WindowStyle Hidden -PassThru
try {
  $ready = $false
  for ($attempt = 0; $attempt -lt 30; $attempt++) {
    try { Invoke-WebRequest 'http://127.0.0.1:3100/' -UseBasicParsing -TimeoutSec 2 | Out-Null; $ready = $true; break } catch { Start-Sleep -Milliseconds 500 }
  }
  if (-not $ready) { throw 'Production server did not become ready.' }
  $routes = @(
    '/', '/services/ai-audit-implementation', '/services/management-operations',
    '/insights', '/insights/revenue-trap', '/insights/silent-bleed', '/insights/time-trap',
    '/industries/ecommerce', '/industries/education-businesses', '/industries/service-businesses', '/industries/retail-businesses',
    '/free-business-audit', '/free-ai-audit', '/business-consultancy-bangladesh', '/business-consultant-dhaka',
    '/about', '/contact', '/policies', '/stockpulse'
  )
  foreach ($route in $routes) {
    $response = Invoke-WebRequest "http://127.0.0.1:3100$route" -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -ne 200) { throw "$route returned $($response.StatusCode)" }
  }
  $missing = Invoke-WebRequest 'http://127.0.0.1:3100/this-route-does-not-exist' -UseBasicParsing -SkipHttpErrorCheck
  if ($missing.StatusCode -ne 404) { throw "404 route returned $($missing.StatusCode)" }
} finally {
  if ($server -and -not $server.HasExited) { Stop-Process -Id $server.Id }
}
```

Expected: every retained route returns 200 and the missing route returns 404.

- [ ] **Step 5: Perform visual and accessibility checks in the local browser**

Inspect `/`, both service pages, one audit, one industry, one insight, both local pages, `/about`, and `/stockpulse` at 1440×900, 768×1024, 390×844, and 320×800. Verify:

- both method dossiers and all eight documents are visible in reading order;
- no tabs, pinning, active-stage state, or motion appears in “How We Work”;
- document names, owners, evidence fields, statuses, and disclosures are readable;
- rust marks only selected/risk/action details rather than dominating the frame;
- no page-level horizontal overflow or clipped labels appears;
- keyboard focus remains visible and heading order is unchanged;
- browser accessibility tree exposes each `figure` name and description;
- reduced-motion mode removes transitions without hiding content;
- StockPulse shows one operating evidence sheet and retains both service links.

- [ ] **Step 6: Review the final scoped diff and commit any verified corrections**

Run:

```powershell
git diff --check
git status --short
git diff --stat f7e7116..HEAD
```

Expected: no whitespace errors; only the intended artifact, route, test, content-type, and CSS files are changed. Existing unrelated untracked `.vscode/` and historical planning/spec files remain uncommitted.

If Step 4 or Step 5 required a correction, stage only the relevant tracked files and commit:

```powershell
git add -- src tests tsconfig.test.json
git commit -m "fix: complete consulting artefact verification"
```

If no correction was required, do not create an empty commit.
