import type {
  EngagementVisualState,
  LabelTarget,
  MarkerTarget,
  PathTarget,
  RectTarget,
  VisualStateId,
} from './types'

const hiddenRect: RectTarget = { x: 480, y: 320, width: 0, height: 0, rx: 0, opacity: 0 }
const hiddenMarker: MarkerTarget = { cx: 480, cy: 320, r: 0, opacity: 0 }
const hiddenLabel: LabelTarget = { x: 480, y: 320, text: '', opacity: 0 }
const hiddenPath: PathTarget = { d: 'M120 320 C320 320 640 320 840 320', opacity: 0 }

const rect = (x: number, y: number, width: number, height: number, rx: number): RectTarget => (
  { x, y, width, height, rx, opacity: 1 }
)
const marker = (cx: number, cy: number, r: number): MarkerTarget => ({ cx, cy, r, opacity: 1 })
const label = (
  x: number,
  y: number,
  text: string,
  anchor: LabelTarget['anchor'] = 'start',
): LabelTarget => ({ x, y, text, opacity: 1, anchor })
const status = (text: string): LabelTarget => text ? label(820, 560, text, 'end') : hiddenLabel
const paths = (first: PathTarget = hiddenPath, second: PathTarget = hiddenPath) => [first, second] as const
const hiddenRects = () => [hiddenRect, hiddenRect, hiddenRect, hiddenRect, hiddenRect] as const
const hiddenMarkers = () => [hiddenMarker, hiddenMarker, hiddenMarker, hiddenMarker, hiddenMarker] as const

const state = (value: EngagementVisualState) => value

export const VISUAL_STATES = {
  'ai-assess': state({
    id: 'ai-assess',
    objects: [
      rect(120, 120, 650, 2, 1), rect(120, 210, 650, 2, 1), rect(120, 300, 650, 2, 1),
      rect(120, 390, 650, 2, 1), rect(120, 480, 650, 2, 1),
    ],
    axes: paths(),
    routes: paths(),
    markers: [marker(360, 120, 7), marker(520, 210, 7), marker(640, 300, 7), marker(470, 390, 7), marker(710, 480, 7)],
    labels: [label(120, 102, 'Strategy'), label(120, 192, 'Data'), label(120, 282, 'Technology'), label(120, 372, 'People'), label(120, 462, 'Governance')],
    status: status(''),
    accentId: 'marker-4',
  }),
  'ai-prioritise': state({
    id: 'ai-prioritise',
    objects: hiddenRects(),
    axes: paths(
      { d: 'M160 500 C360 500 640 500 820 500', opacity: 1 },
      { d: 'M160 500 C160 360 160 200 160 100', opacity: 1 },
    ),
    routes: paths(),
    markers: [marker(280, 390, 10), marker(430, 275, 10), marker(610, 195, 10), marker(655, 360, 10), marker(350, 205, 10)],
    labels: [label(180, 535, 'Impact'), label(130, 88, 'Feasibility'), label(630, 170, 'Selected use case'), hiddenLabel, hiddenLabel],
    status: status(''),
    accentId: 'marker-2',
  }),
  'ai-build': state({
    id: 'ai-build',
    objects: [rect(70, 270, 170, 90, 4), rect(285, 270, 170, 90, 4), rect(500, 270, 170, 90, 4), rect(715, 270, 170, 90, 4), hiddenRect],
    axes: paths(),
    routes: paths({ d: 'M155 315 C280 315 680 315 800 315', opacity: 1 }),
    markers: hiddenMarkers(),
    labels: [label(155, 250, 'Input', 'middle'), label(370, 250, 'Decision', 'middle'), label(585, 250, 'AI Support', 'middle'), label(800, 250, 'Output', 'middle'), hiddenLabel],
    status: status('SYSTEM BUILT'),
    accentId: 'route-0',
  }),
  'ai-hand-over': state({
    id: 'ai-hand-over',
    objects: [rect(130, 120, 650, 62, 2), rect(130, 220, 650, 62, 2), rect(130, 320, 650, 62, 2), rect(130, 420, 650, 62, 2), hiddenRect],
    axes: paths(),
    routes: paths(),
    markers: [marker(742, 151, 10), marker(742, 251, 10), marker(742, 351, 10), marker(742, 451, 10), hiddenMarker],
    labels: [label(160, 158, 'Documentation'), label(160, 258, 'Owner assigned'), label(160, 358, 'Training complete'), label(160, 458, 'Operating instructions'), hiddenLabel],
    status: status('READY'),
    accentId: 'status',
  }),
  'operations-diagnose': state({
    id: 'operations-diagnose',
    objects: [rect(130, 130, 650, 50, 2), rect(130, 230, 650, 50, 2), rect(130, 330, 650, 50, 2), rect(130, 430, 650, 50, 2), hiddenRect],
    axes: paths(),
    routes: paths(),
    markers: [marker(620, 255, 9), marker(710, 455, 9), hiddenMarker, hiddenMarker, hiddenMarker],
    labels: [label(160, 162, 'Direct cost'), label(160, 262, 'Overhead'), label(160, 362, 'Process cost'), label(160, 462, 'Margin'), hiddenLabel],
    status: status('LEAKAGE DETECTED'),
    accentId: 'marker-1',
  }),
  'operations-map': state({
    id: 'operations-map',
    objects: [rect(90, 260, 140, 72, 36), rect(260, 130, 160, 72, 36), rect(440, 260, 160, 72, 36), rect(640, 130, 140, 72, 36), rect(720, 390, 150, 72, 36)],
    axes: paths(),
    routes: paths(
      { d: 'M160 296 C300 296 420 190 520 296', opacity: 1 },
      { d: 'M520 296 C650 296 700 426 795 426', opacity: 1 },
    ),
    markers: hiddenMarkers(),
    labels: [label(160, 304, 'Sales', 'middle'), label(340, 174, 'Purchasing', 'middle'), label(520, 304, 'Fulfilment', 'middle'), label(710, 174, 'Finance', 'middle'), label(795, 434, 'Reporting', 'middle')],
    status: status(''),
    accentId: 'object-2',
  }),
  'operations-prioritise': state({
    id: 'operations-prioritise',
    objects: [rect(130, 170, 690, 76, 2), rect(130, 290, 690, 76, 2), rect(130, 410, 690, 76, 2), hiddenRect, hiddenRect],
    axes: paths(),
    routes: paths(),
    markers: hiddenMarkers(),
    labels: [label(160, 155, 'Issue'), label(585, 155, 'Impact'), label(730, 155, 'Effort'), label(160, 215, 'Margin leakage'), label(160, 335, 'Approval delay')],
    status: status('PRIORITY SET'),
    accentId: 'object-0',
  }),
  'operations-roadmap': state({
    id: 'operations-roadmap',
    objects: [rect(120, 180, 200, 260, 2), rect(380, 180, 200, 260, 2), rect(640, 180, 200, 260, 2), hiddenRect, hiddenRect],
    axes: paths(),
    routes: paths({ d: 'M220 355 C360 355 600 245 740 245', opacity: 1 }),
    markers: [marker(220, 355, 8), marker(480, 300, 8), marker(740, 245, 8), hiddenMarker, hiddenMarker],
    labels: [label(220, 155, 'Month 1', 'middle'), label(480, 155, 'Month 2', 'middle'), label(740, 155, 'Month 3', 'middle'), label(220, 400, 'Stabilise cost', 'middle'), label(480, 345, 'Assign owners', 'middle')],
    status: status('ROADMAP SET'),
    accentId: 'route-0',
  }),
} as const satisfies Record<VisualStateId, EngagementVisualState>
