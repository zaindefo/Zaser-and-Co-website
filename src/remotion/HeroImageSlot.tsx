import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing } from 'remotion'

const IMAGES = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&q=80',
]

const FRAMES_PER_IMAGE = 24
const CROSSFADE_FRAMES = 12

function ImageFrame({ src }: { src: string }) {
  const frame = useCurrentFrame()

  const opacity = interpolate(
    frame,
    [0, 8, FRAMES_PER_IMAGE, FRAMES_PER_IMAGE + CROSSFADE_FRAMES],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  )

  const translateX = interpolate(
    frame,
    [0, 8],
    [40, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  )

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(1)',
        }}
      />
    </div>
  )
}

export function HeroImageSlot() {
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {IMAGES.map((src, i) => (
        <Sequence
          key={src}
          from={i * FRAMES_PER_IMAGE}
          durationInFrames={FRAMES_PER_IMAGE + CROSSFADE_FRAMES}
          layout="none"
        >
          <ImageFrame src={src} />
        </Sequence>
      ))}
    </AbsoluteFill>
  )
}

// (IMAGES.length - 1) * 24 + 24 + 12 = 132 frames at 30fps = 4.4s loop
export const HERO_SLOT_DURATION = (IMAGES.length - 1) * FRAMES_PER_IMAGE + FRAMES_PER_IMAGE + CROSSFADE_FRAMES
