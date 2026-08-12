import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { ENGAGEMENT_STAGES } from './stages'
import { VISUAL_STATES } from './visual-states'
import { applyVisualState } from './visual-state-dom'
import {
  ENGAGEMENT_NAV_OFFSET_PX,
  getEngagementMotionState,
  getStageDestination,
} from './motion-math'
import { createEngagementLifecycle } from './engagement-lifecycle'

interface EngagementRailMotionOptions {
  enabled: boolean
  rootRef: RefObject<HTMLElement>
  pinRef: RefObject<HTMLDivElement>
  svgRef: RefObject<SVGSVGElement>
  onStageChange: (index: number) => void
}

interface EngagementRailMotionResult {
  jumpToDesktopStage: (index: number) => boolean
}

interface TriggerRange {
  start: number
  end: number
  kill: () => void
}

export function useEngagementRailMotion({
  enabled,
  rootRef,
  pinRef,
  svgRef,
  onStageChange,
}: EngagementRailMotionOptions): EngagementRailMotionResult {
  const triggerRef = useRef<TriggerRange | null>(null)

  useEffect(() => {
    if (!enabled) return

    const root = rootRef.current
    const pin = pinRef.current
    const svg = svgRef.current
    if (!root || !pin || !svg) return

    let cancelled = false
    let currentIndex = 0
    const engagement = createEngagementLifecycle(root)
    let cleanup = engagement.cleanup
    root.dataset.motion = 'loading'

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, scrollModule]) => {
      if (cancelled) return
      const gsap = gsapModule.gsap
      const ScrollTrigger = scrollModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)
      applyVisualState(svg, VISUAL_STATES['ai-assess'])

      const context = gsap.context(() => {
        const timeline = gsap.timeline({ paused: true })

        const objects = Array.from(svg.querySelectorAll<SVGRectElement>('[data-object]'))
        const axes = Array.from(svg.querySelectorAll<SVGPathElement>('[data-axis]'))
        const routes = Array.from(svg.querySelectorAll<SVGPathElement>('[data-route]'))
        const markers = Array.from(svg.querySelectorAll<SVGCircleElement>('[data-marker]'))
        const labels = Array.from(svg.querySelectorAll<SVGTextElement>('[data-label]'))
        const status = svg.querySelector<SVGTextElement>('[data-status]')

        timeline.from([...markers, ...labels], {
          opacity: 0,
          duration: 0.72,
          ease: 'power3.out',
          stagger: 0.015,
        }, 0)

        ENGAGEMENT_STAGES.slice(1).forEach((stage, stageOffset) => {
          const position = stageOffset + 1
          const target = VISUAL_STATES[stage.visualState]

          target.objects.forEach((attrs, index) => {
            timeline.to(objects[index], { attr: { ...attrs }, duration: 0.72, ease: 'power3.out' }, position)
          })
          target.axes.forEach((attrs, index) => {
            timeline.to(axes[index], { attr: { ...attrs }, duration: 0.72, ease: 'power3.out' }, position)
          })
          target.routes.forEach((attrs, index) => {
            timeline.to(routes[index], { attr: { ...attrs }, duration: 0.72, ease: 'none' }, position)
          })
          target.markers.forEach((attrs, index) => {
            timeline.to(markers[index], { attr: { ...attrs }, duration: 0.72, ease: 'power3.out' }, position)
          })
          target.labels.forEach((labelTarget, index) => {
            timeline.set(labels[index], { textContent: labelTarget.text }, position)
            timeline.to(labels[index], {
              attr: {
                x: labelTarget.x,
                y: labelTarget.y,
                opacity: labelTarget.opacity,
                'text-anchor': labelTarget.anchor ?? 'start',
              },
              duration: 0.72,
              ease: 'power3.out',
            }, position)
          })
          if (status) {
            timeline.set(status, { textContent: target.status.text }, position)
            timeline.to(status, {
              attr: {
                x: target.status.x,
                y: target.status.y,
                opacity: target.status.opacity,
                'text-anchor': target.status.anchor ?? 'start',
              },
              duration: 0.72,
              ease: 'power3.out',
            }, position)
          }
          timeline.set(svg, {
            attr: { 'data-accent': target.accentId, 'data-state': target.id },
          }, position + 0.36)
        })

        timeline.to({}, { duration: 0.28 }, 7.72)
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
            const motion = getEngagementMotionState(self.progress)
            timeline.progress(motion.progress)
            if (motion.stageIndex === currentIndex) return
            currentIndex = motion.stageIndex
            onStageChange(motion.stageIndex)
          },
        })
        triggerRef.current = trigger
      }, root)

      root.dataset.motion = 'ready'
      cleanup = () => {
        triggerRef.current?.kill()
        triggerRef.current = null
        context.revert()
        engagement.cleanup()
      }
    }).catch(() => {
      engagement.cleanup()
      delete root.dataset.motion
      applyVisualState(svg, VISUAL_STATES[ENGAGEMENT_STAGES[currentIndex].visualState])
    })

    return () => {
      cancelled = true
      cleanup()
      delete root.dataset.motion
    }
  }, [enabled, onStageChange, pinRef, rootRef, svgRef])

  return {
    jumpToDesktopStage: (index: number) => {
      const trigger = triggerRef.current
      if (!trigger) return false
      window.scrollTo({
        top: getStageDestination(index, trigger.start, trigger.end),
        behavior: 'smooth',
      })
      return true
    },
  }
}
