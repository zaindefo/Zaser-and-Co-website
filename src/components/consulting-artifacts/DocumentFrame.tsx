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
