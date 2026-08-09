type ArtifactType = 'scorecard' | 'matrix' | 'system' | 'diagnostic' | 'cost-map' | 'roadmap' | 'process'

interface ArtifactVisualProps {
  type: ArtifactType
  label: string
  dark?: boolean
}

const rows = [18, 42, 66, 82]

export function ArtifactVisual({ type, label, dark = false }: ArtifactVisualProps) {
  return (
    <div className={`artifact artifact--${type}${dark ? ' artifact--dark' : ''}`} role="img" aria-label={label}>
      <svg viewBox="0 0 640 420" aria-hidden="true" focusable="false">
        <rect className="artifact__paper" x="8" y="8" width="624" height="404" rx="4" />
        <path className="artifact__rule" d="M40 54H600" />
        <circle className="artifact__accent" cx="52" cy="34" r="6" />
        <path className="artifact__ink" d="M72 34H220" />
        {type === 'scorecard' && rows.map((y, index) => (
          <g key={y} transform={`translate(0 ${y * 3})`}>
            <path className="artifact__ink" d="M44 28H188" />
            <rect className="artifact__soft" x="240" y="16" width="320" height="24" />
            <rect className="artifact__accent" x="240" y="16" width={70 + index * 52} height="24" />
          </g>
        ))}
        {type === 'matrix' && (
          <g>
            <path className="artifact__rule" d="M86 340V90M86 340H574" />
            <path className="artifact__soft-line" d="M86 215H574M330 90V340" />
            {[[170, 148], [420, 132], [252, 270], [474, 258], [355, 184]].map(([x, y], index) => <circle key={x} className={index === 1 ? 'artifact__accent' : 'artifact__ink-fill'} cx={x} cy={y} r={index === 1 ? 18 : 11} />)}
          </g>
        )}
        {type === 'system' && (
          <g>
            {[92, 260, 428].map((x, index) => <rect key={x} className={index === 1 ? 'artifact__accent-soft' : 'artifact__soft'} x={x} y="150" width="120" height="80" rx="4" />)}
            <path className="artifact__ink" d="M212 190H260M380 190H428" />
            <path className="artifact__ink" d="M250 182L260 190L250 198M418 182L428 190L418 198" />
            <path className="artifact__soft-line" d="M152 150V112H488V150M320 230V282H488" />
          </g>
        )}
        {type === 'diagnostic' && (
          <g>
            <circle className="artifact__soft" cx="320" cy="220" r="118" />
            <circle className="artifact__paper" cx="320" cy="220" r="56" />
            {[0, 72, 144, 216, 288].map((angle, index) => {
              const x = 320 + Math.cos((angle * Math.PI) / 180) * 118
              const y = 220 + Math.sin((angle * Math.PI) / 180) * 118
              return <circle key={angle} className={index === 0 ? 'artifact__accent' : 'artifact__ink-fill'} cx={x} cy={y} r="14" />
            })}
          </g>
        )}
        {type === 'cost-map' && (
          <g>
            {[110, 175, 240, 305].map((y, index) => (
              <g key={y}>
                <path className="artifact__ink" d={`M64 ${y}H176`} />
                <rect className="artifact__soft" x="220" y={y - 14} width="330" height="28" />
                <rect className={index === 2 ? 'artifact__accent' : 'artifact__ink-fill'} x="220" y={y - 14} width={80 + index * 58} height="28" />
              </g>
            ))}
          </g>
        )}
        {type === 'roadmap' && (
          <g>
            <path className="artifact__rule" d="M64 218H576" />
            {[100, 220, 340, 460, 560].map((x, index) => (
              <g key={x}>
                <circle className={index === 0 || index === 4 ? 'artifact__accent' : 'artifact__ink-fill'} cx={x} cy="218" r="11" />
                <rect className="artifact__soft" x={x - 46} y={index % 2 ? 248 : 126} width="92" height="54" />
              </g>
            ))}
          </g>
        )}
        {type === 'process' && (
          <g>
            {[84, 220, 356, 492].map((x, index) => (
              <g key={x}>
                <rect className={index === 1 ? 'artifact__accent-soft' : 'artifact__soft'} x={x} y="156" width="92" height="92" rx="46" />
                {index < 3 && <path className="artifact__ink" d={`M${x + 92} 202H${x + 136}`} />}
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  )
}
