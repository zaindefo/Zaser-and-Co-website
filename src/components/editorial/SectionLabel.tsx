export function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`eyebrow${light ? ' eyebrow--light' : ''}`}>[ {children} ]</span>
}
