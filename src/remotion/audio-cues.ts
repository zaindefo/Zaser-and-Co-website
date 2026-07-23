// Frame-accurate audio cues for ZaserBrandReel v11 (600 frames, 30fps, 9 scenes)
// Philosophy: vast silence → precision hits → silence.

export type SoundId = "click_a" | "click_b" | "click_c" | "impact_a" | "impact_b" | "signal_tone";

export interface AudioCue {
  frame: number;
  sound: SoundId;
  volume: number;
}

export const AUDIO_CUES: AudioCue[] = [

  // ── S1 (0–74): BEZIER "ADVISORY" ────────────────────────────────────────────
  // Total silence. The visual carries the scene alone.

  // ── S2 (75–144): WORD CASCADE "GROW / SCALE / LEAD" ─────────────────────────
  { frame: 80,  sound: "click_b", volume: 0.55 },  // "GROW." lands
  { frame: 93,  sound: "click_b", volume: 0.62 },  // "SCALE." lands
  { frame: 106, sound: "click_b", volume: 0.72 },  // "LEAD." lands — loudest of three
  { frame: 122, sound: "click_c", volume: 0.35 },  // "THAT'S THE MANDATE."

  // ── S3 (145–204): SIGNAL BLUE WIPE ───────────────────────────────────────────
  { frame: 147, sound: "impact_b", volume: 0.85 }, // Blue panel cuts in
  { frame: 163, sound: "impact_a", volume: 0.95 }, // "WE COME IN." slams

  // ── S4 (205–264): "MOST BUSINESSES STALL." ──────────────────────────────────
  { frame: 210, sound: "click_a", volume: 0.50 },  // Chrome line starts drawing
  { frame: 223, sound: "click_b", volume: 0.55 },  // "MOST BUSINESSES" lands
  { frame: 229, sound: "impact_a", volume: 0.80 }, // "STALL." hits
  { frame: 247, sound: "click_c", volume: 0.25 },  // Red glow pulse

  // ── S5 (265–339): IDENTITY "ZASER & CO" ─────────────────────────────────────
  // Faint vertical lines materialising
  { frame: 267, sound: "click_c", volume: 0.25 },
  { frame: 271, sound: "click_c", volume: 0.25 },
  { frame: 275, sound: "click_c", volume: 0.25 },
  { frame: 279, sound: "click_c", volume: 0.25 },
  // Each letter of "ZASER" locking into place
  { frame: 281, sound: "click_a", volume: 0.60 },  // Z
  { frame: 285, sound: "click_a", volume: 0.62 },  // A
  { frame: 289, sound: "click_a", volume: 0.64 },  // S
  { frame: 293, sound: "click_a", volume: 0.66 },  // E
  { frame: 297, sound: "click_a", volume: 0.70 },  // R
  // Supporting elements
  { frame: 303, sound: "click_c", volume: 0.35 },  // "& CO" appears
  { frame: 313, sound: "click_b", volume: 0.45 },  // Chrome line draws
  { frame: 323, sound: "click_c", volume: 0.28 },  // Subtitle fades in

  // ── S6 (340–419): FIVE PILLARS GRID ──────────────────────────────────────────
  // Column lines drawing
  { frame: 344, sound: "click_a", volume: 0.50 },
  { frame: 348, sound: "click_a", volume: 0.50 },
  { frame: 352, sound: "click_a", volume: 0.52 },
  { frame: 356, sound: "click_a", volume: 0.52 },
  // Service pillars entering (staggered)
  { frame: 365, sound: "click_b", volume: 0.65 },  // FINANCIAL CLARITY
  { frame: 373, sound: "click_b", volume: 0.68 },  // MARGIN & OPS
  { frame: 381, sound: "click_b", volume: 0.70 },  // AI AUDIT
  { frame: 389, sound: "click_b", volume: 0.72 },  // CONTENT GEN.
  { frame: 397, sound: "click_b", volume: 0.75 },  // HR & AI TRAINING
  // Horizontal line + partner text
  { frame: 400, sound: "click_a", volume: 0.55 },
  { frame: 405, sound: "click_b", volume: 0.60 },
  { frame: 410, sound: "click_c", volume: 0.32 },  // "YOUR STRATEGIC PARTNER."

  // ── S7 (420–479): "ONE FIRM." BRIDGE ─────────────────────────────────────────
  { frame: 425, sound: "click_b", volume: 0.65 },  // "ONE FIRM." clip reveals
  { frame: 440, sound: "click_c", volume: 0.45 },  // "FIVE DISCIPLINES."
  { frame: 455, sound: "click_b", volume: 0.70 },  // "ONE OBJECTIVE."
  { frame: 468, sound: "click_a", volume: 0.55 },  // Chrome line

  // ── S8 (480–554): "WE BUILD." ────────────────────────────────────────────────
  { frame: 483, sound: "click_c", volume: 0.30 },  // "WE DON'T JUST" setup
  { frame: 491, sound: "click_b", volume: 0.70 },  // "ADVISE." lands
  // THE BUILD. SLAM — the loudest moment in the entire reel
  { frame: 520, sound: "impact_a", volume: 1.00 }, // Body thud
  { frame: 522, sound: "impact_b", volume: 0.85 }, // High-freq crack

  // ── S9 (555–599): LOGO EMERGENCE ────────────────────────────────────────────
  // Pre-logo silence: frames 555–562
  { frame: 568, sound: "click_b", volume: 0.55 },  // Logo materialises
  { frame: 576, sound: "click_a", volume: 0.65 },  // "ZASER & CO" wordmark
  { frame: 582, sound: "click_c", volume: 0.30 },  // Tagline
  { frame: 595, sound: "signal_tone", volume: 0.70 }, // Resolution — final note

];

// Enforce silence zones at compile time (runtime check in dev)
const SILENCE_ZONES = [
  { start: 0,   end: 74  },  // S1: bezier drawing — total silence
  { start: 555, end: 562 },  // Pre-logo tension
];

if (process.env.NODE_ENV !== "production") {
  for (const cue of AUDIO_CUES) {
    for (const zone of SILENCE_ZONES) {
      if (cue.frame >= zone.start && cue.frame <= zone.end) {
        throw new Error(`Audio cue "${cue.sound}" at frame ${cue.frame} violates silence zone [${zone.start}–${zone.end}].`);
      }
    }
  }
}
