export function createEngagementLifecycle(root: HTMLElement) {
  const engage = () => { root.dataset.engaged = 'true' }
  const disengage = () => { delete root.dataset.engaged }

  return {
    onEnter: engage,
    onEnterBack: engage,
    onLeaveBack: disengage,
    cleanup: disengage,
  }
}
