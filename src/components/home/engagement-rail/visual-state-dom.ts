import type { EngagementVisualState } from './types'

const setAttrs = (element: Element | null, attrs: object) => {
  if (!element) return
  for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, String(value))
}

export function applyVisualState(root: SVGSVGElement, state: EngagementVisualState) {
  state.objects.forEach((target, index) => setAttrs(root.querySelector(`[data-object="${index}"]`), target))
  state.axes.forEach((target, index) => setAttrs(root.querySelector(`[data-axis="${index}"]`), target))
  state.routes.forEach((target, index) => setAttrs(root.querySelector(`[data-route="${index}"]`), target))
  state.markers.forEach((target, index) => setAttrs(root.querySelector(`[data-marker="${index}"]`), target))
  state.labels.forEach((target, index) => {
    const element = root.querySelector(`[data-label="${index}"]`)
    setAttrs(element, { x: target.x, y: target.y, opacity: target.opacity, 'text-anchor': target.anchor ?? 'start' })
    if (element) element.textContent = target.text
  })
  const statusElement = root.querySelector('[data-status]')
  setAttrs(statusElement, { x: state.status.x, y: state.status.y, opacity: state.status.opacity, 'text-anchor': state.status.anchor ?? 'start' })
  if (statusElement) statusElement.textContent = state.status.text
  root.dataset.accent = state.accentId
  root.dataset.state = state.id
}
