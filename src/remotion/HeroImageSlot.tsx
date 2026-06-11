import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing } from 'remotion'

const FRAMES_PER_IMAGE = 40  // 1.33s hold at 30fps — unhurried, premium pacing
const CROSSFADE_FRAMES = 20  // 0.67s dissolve

// 5 images × 40 frames + 20 crossfade tail = 220 frames = 7.33s loop
export const HERO_SLOT_DURATION = 5 * FRAMES_PER_IMAGE + CROSSFADE_FRAMES

// Distinct thematic sets so all three inline slots show different imagery
const IMAGE_SETS = {
  // Slot 1: analytics / numbers — placed after "Your numbers,"
  numbers: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&h=400&fit=crop&q=80',
  ],
  // Slot 2: profit / commerce — placed before "decoded."
  profit: [
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop&q=80',
  ],
  // Slot 3: operations / people — placed after "Your profit,"
  operations: [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop&q=80',
  ],
}

function ImageFrame({ src }: { src: string }) {
  const frame = useCurrentFrame()
  const duration = FRAMES_PER_IMAGE + CROSSFADE_FRAMES

  // Pure opacity dissolve — no slide/translate, just a clean cinematic fade
  const opacity = interpolate(
    frame,
    [0, 10, FRAMES_PER_IMAGE, duration],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    }
  )

  // Subtle Ken Burns: 1.06 → 1.0 slow zoom-out for depth and life
  const scale = interpolate(frame, [0, duration], [1.06, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.linear,
  })

  return (
    <div style={{ position: 'absolute', inset: 0, opacity }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(1)',
          transform: `scale(${scale})`,
          transformOrigin: 'center',
        }}
      />
    </div>
  )
}

function HeroSlotBase({ images }: { images: string[] }) {
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {images.map((src, i) => (
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

// Named compositions passed directly as `component` to <Player> — no inputProps needed
export const HeroSlotNumbers = () => <HeroSlotBase images={IMAGE_SETS.numbers} />
export const HeroSlotProfit = () => <HeroSlotBase images={IMAGE_SETS.profit} />
export const HeroSlotOps = () => <HeroSlotBase images={IMAGE_SETS.operations} />
