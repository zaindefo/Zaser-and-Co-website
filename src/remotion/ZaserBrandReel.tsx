import React, { useEffect, useRef } from "react";
import {
  AbsoluteFill, useCurrentFrame, interpolate, spring,
  Sequence, Audio, delayRender, continueRender, Img, staticFile,
} from "remotion";
import { AUDIO_CUES } from "./audio-cues";

// ── Palette (LOCKED — no variations, no derived blues) ───────────────────────
const C = {
  bg:        "#07080D",
  black:     "#000000",
  white:     "#F0F1F4",
  dim:       "rgba(240,241,244,0.32)",
  faint:     "rgba(240,241,244,0.07)",
  signal:    "#5B8DEF",
  signalDim: "rgba(91,141,239,0.12)",
  loss:      "#C85A45",
  grid:      "rgba(240,241,244,0.05)",
  stroke:    "rgba(240,241,244,0.18)",
  counter:   "rgba(240,241,244,0.22)",
};

const DISPLAY = '"Bebas Neue", Impact, sans-serif';
const SERIF   = '"Instrument Serif", Georgia, serif';
const SANS    = '"Plus Jakarta Sans", system-ui, sans-serif';
const MONO    = '"DM Mono", ui-monospace, monospace';

// ── Font loading ──────────────────────────────────────────────────────────────
function useGoogleFonts() {
  const handle = useRef<number | null>(null);
  useEffect(() => {
    handle.current = delayRender("fonts");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap";
    const done = () => {
      if (handle.current !== null) { continueRender(handle.current); handle.current = null; }
    };
    link.onload = async () => {
      try {
        await document.fonts.load("900 40px 'Plus Jakarta Sans'");
        await document.fonts.load("40px 'Bebas Neue'");
        await document.fonts.load("italic 400 40px 'Instrument Serif'");
        await document.fonts.ready;
      } catch (_) {}
      done();
    };
    link.onerror = done;
    document.head.appendChild(link);
    const t = setTimeout(done, 5000);
    return () => clearTimeout(t);
  }, []);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const CL  = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const CLX = { extrapolateLeft: "clamp" as const, extrapolateRight: "extend" as const };

function sp(f: number, s: number, cfg = { damping: 14, stiffness: 180 }) {
  return spring({ fps: 30, frame: Math.max(0, f - s), config: cfg });
}
function fi(f: number, s: number, d = 8) { return interpolate(f, [s, s + d], [0, 1], CL); }
function fo(f: number, s: number, d = 8) { return interpolate(f, [s, s + d], [1, 0], CL); }

const FRAME_CENTER: React.CSSProperties = {
  position: "absolute", inset: 0,
  display: "flex", flexDirection: "column",
  alignItems: "center", justifyContent: "center",
  padding: "0 48px", textAlign: "center",
};

// ── Frame corners ─────────────────────────────────────────────────────────────
function FrameCorners() {
  const arm = 44;
  const corner = (fx: boolean, fy: boolean) => (
    <div key={`c${fx}${fy}`} style={{
      position: "absolute",
      top: fy ? undefined : 40, bottom: fy ? 40 : undefined,
      left: fx ? undefined : 40, right: fx ? 40 : undefined,
      width: arm, height: arm, opacity: 0.15,
      transform: `scale(${fx ? -1 : 1}, ${fy ? -1 : 1})`,
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: arm, height: 1.5, background: C.white }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: 1.5, height: arm, background: C.white }} />
    </div>
  );
  return <>{[false, true].flatMap(fx => [false, true].map(fy => corner(fx, fy)))}</>;
}

// ── Scene counter ─────────────────────────────────────────────────────────────
const SCENE_AT = [0, 75, 145, 205, 265, 340, 420, 480, 555];
function SceneCounter({ gf }: { gf: number }) {
  let n = 1;
  for (let i = SCENE_AT.length - 1; i >= 0; i--) {
    if (gf >= SCENE_AT[i]) { n = i + 1; break; }
  }
  return (
    <div style={{
      position: "absolute", top: 52, right: 52,
      fontFamily: MONO, fontSize: 14, color: C.counter, letterSpacing: "0.12em",
    }}>
      {String(n).padStart(2, "0")}/09
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// S1 — BEZIER PATH "ADVISORY"  (75 frames, global 0–74)
// Bebas Neue 170px, stroke traces L→R, CP squares visible, fill at FULL OPACITY
// ──────────────────────────────────────────────────────────────────────────────
const CP: { x: number; y: number }[] = [
  { x: 227, y: 882 }, { x: 182, y: 1040 }, { x: 272, y: 1040 },
  { x: 202, y: 994 }, { x: 252, y: 994 },
  { x: 287, y: 882 }, { x: 356, y: 900 }, { x: 370, y: 961 },
  { x: 356, y: 1022 }, { x: 287, y: 1040 },
  { x: 381, y: 882 }, { x: 461, y: 882 }, { x: 421, y: 1040 },
  { x: 477, y: 882 }, { x: 517, y: 882 }, { x: 477, y: 1040 }, { x: 517, y: 1040 },
  { x: 608, y: 892 }, { x: 535, y: 908 }, { x: 531, y: 958 },
  { x: 607, y: 963 }, { x: 531, y: 1012 }, { x: 608, y: 1030 },
  { x: 665, y: 882 }, { x: 710, y: 961 }, { x: 665, y: 1040 }, { x: 621, y: 961 },
  { x: 721, y: 882 }, { x: 797, y: 900 }, { x: 802, y: 944 },
  { x: 726, y: 959 }, { x: 762, y: 959 }, { x: 800, y: 1040 },
  { x: 817, y: 882 }, { x: 897, y: 882 }, { x: 857, y: 944 }, { x: 857, y: 1040 },
];

const HL: [number, number][] = [
  [0, 1], [0, 2], [3, 4],
  [5, 9], [6, 8],
  [10, 12], [11, 12],
  [13, 15], [14, 16],
  [17, 18], [19, 20], [21, 22],
  [23, 24], [24, 25], [25, 26],
  [27, 28], [28, 29], [29, 30],
  [31, 33], [32, 33],
];

function S1() {
  const f = useCurrentFrame();
  const inOp    = fi(f, 0, 3);
  const strokeP = interpolate(f, [3, 48], [0, 1], CL);
  const fillP   = interpolate(f, [44, 56], [0, 1], CL);
  const cpOp    = interpolate(f, [2, 9, 46, 56], [0, 0.86, 0.86, 0], CL);
  const lineP   = interpolate(f, [48, 58], [0, 1], CL);
  const exitOp  = fo(f, 67, 7);
  const exitSc  = interpolate(f, [67, 74], [1.0, 1.07], CL);

  return (
    <AbsoluteFill style={{
      background: C.bg,
      opacity: inOp * exitOp,
      transform: `scale(${exitSc})`,
      transformOrigin: "center center",
    }}>
      <svg viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <clipPath id="s1st">
            <rect x={-20} y={862} width={1120 * strokeP} height={200} />
          </clipPath>
          <clipPath id="s1fi">
            <rect x={-20} y={862} width={1120 * fillP} height={200} />
          </clipPath>
        </defs>

        {[0.2, 0.4, 0.6, 0.8].map(t => (
          <line key={t} x1={1080 * t} y1={0} x2={1080 * t} y2={1920} stroke={C.grid} strokeWidth="1" />
        ))}

        {HL.map(([a, b], i) => (
          <line key={i}
            x1={CP[a].x} y1={CP[a].y} x2={CP[b].x} y2={CP[b].y}
            stroke={C.white} strokeWidth={0.8} opacity={cpOp * 0.28}
          />
        ))}

        {CP.map((p, i) => (
          <rect key={i}
            x={p.x - 4} y={p.y - 4} width={8} height={8}
            fill="none" stroke={C.white} strokeWidth={1.5} opacity={cpOp}
          />
        ))}

        {/* Stroke phase — revealed L→R, fades as fill appears */}
        <text x="540" y="961" dominantBaseline="middle" textAnchor="middle"
          fontFamily={DISPLAY} fontSize="170" letterSpacing="4"
          fill="none" stroke={C.white} strokeWidth={2.5}
          clipPath="url(#s1st)" opacity={1 - fillP}
        >ADVISORY</text>

        {/* Fill phase — C.white at FULL OPACITY, no dimming */}
        <text x="540" y="961" dominantBaseline="middle" textAnchor="middle"
          fontFamily={DISPLAY} fontSize="170" letterSpacing="4"
          fill={C.white} stroke="none"
          clipPath="url(#s1fi)" opacity={1}
        >ADVISORY</text>

        <line x1={110} y1={1065} x2={110 + 860 * lineP} y2={1065}
          stroke={C.stroke} strokeWidth="1.5" />
      </svg>
    </AbsoluteFill>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// S2 — WORD CASCADE  (70 frames, global 75–144)
// Plus Jakarta Sans — GROW.(w300) → SCALE.(w700) → LEAD.(w900)
// Each word at 220px. Previous dims, LEAD stays at peak white.
// ──────────────────────────────────────────────────────────────────────────────
function S2() {
  const f = useCurrentFrame();
  const inOp   = fi(f, 0, 3);
  const exitOp = fo(f, 63, 6);

  const w1In = f >= 5;
  const w2In = f >= 18;
  const w3In = f >= 31;
  const allOut = f >= 50;

  // GROW: white → dim when SCALE → near-invisible when LEAD
  const w1Op = !w1In ? 0
    : allOut   ? fo(f, 50, 6) * 0.08
    : w3In     ? interpolate(f, [31, 38], [0.25, 0.08], CL)
    : w2In     ? interpolate(f, [18, 25], [1, 0.25], CL)
    : fi(f, 5, 6);

  // SCALE: white → dim when LEAD
  const w2Op = !w2In ? 0
    : allOut   ? fo(f, 50, 6) * 0.06
    : w3In     ? interpolate(f, [31, 38], [1, 0.25], CL)
    : fi(f, 18, 6);

  // LEAD: full white, peak — stays at 1.0
  const w3Op = !w3In ? 0
    : allOut   ? fo(f, 50, 6)
    : fi(f, 31, 6);

  const w1Sc = w2In ? interpolate(f, [18, 25], [1.0, 0.91], CL) : 1.0;
  const w2Sc = w3In ? interpolate(f, [31, 38], [1.0, 0.93], CL) : 1.0;
  const w3Sp = w3In ? sp(f, 31, { damping: 12, stiffness: 200 }) : 0;
  const w3Sc = w3In ? interpolate(w3Sp, [0, 1], [1.06, 1.0], CLX) : 1.06;

  const w1Y = w1In ? interpolate(fi(f, 5, 6), [0, 1], [30, 0], CL) : 30;
  const w2Y = w2In ? interpolate(fi(f, 18, 6), [0, 1], [30, 0], CL) : 30;
  const w3Y = w3In ? interpolate(fi(f, 31, 6), [0, 1], [30, 0], CL) : 30;

  // "THAT'S THE MANDATE." — DM Mono, fades in after LEAD settles
  const mandateOp = f < 47 ? 0
    : f < 63 ? fi(f, 47, 6)
    : fo(f, 63, 6);
  const mandateY = interpolate(fi(f, 47, 6), [0, 1], [12, 0], CL);

  return (
    <AbsoluteFill style={{
      opacity: inOp * exitOp,
      background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${C.bg} 30%, ${C.black} 100%)`,
    }}>
      <div style={FRAME_CENTER}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{
            fontFamily: SANS, fontWeight: 300, fontSize: 220, color: C.white,
            letterSpacing: "-0.02em", lineHeight: 0.9,
            opacity: w1Op,
            transform: `translateY(${w1Y}px) scale(${w1Sc})`,
          }}>GROW.</div>
          <div style={{
            fontFamily: SANS, fontWeight: 700, fontSize: 220, color: C.white,
            letterSpacing: "-0.02em", lineHeight: 0.9,
            opacity: w2Op,
            transform: `translateY(${w2Y}px) scale(${w2Sc})`,
          }}>SCALE.</div>
          <div style={{
            fontFamily: SANS, fontWeight: 900, fontSize: 220, color: C.white,
            letterSpacing: "-0.02em", lineHeight: 0.9,
            opacity: w3Op,
            transform: `translateY(${w3Y}px) scale(${w3Sc})`,
          }}>LEAD.</div>
        </div>

        <div style={{
          fontFamily: MONO, fontWeight: 400, fontSize: 28, color: C.counter,
          letterSpacing: "0.18em", marginTop: 36,
          opacity: mandateOp,
          transform: `translateY(${mandateY}px)`,
        }}>
          {"THAT'S THE MANDATE."}
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// S3 — SIGNAL BLUE WIPE  (60 frames, global 145–204)
// #5B8DEF floods left→right, black covers right→left
// "WE COME IN." Bebas Neue 190px, C.white
// ──────────────────────────────────────────────────────────────────────────────
function S3() {
  const f = useCurrentFrame();
  const inOp = fi(f, 0, 2);

  const blueW  = interpolate(f, [0, 9], [0, 100], CL);
  const blackW = interpolate(f, [15, 26], [0, 100], CL);

  const textOp = interpolate(f, [12, 20, 48, 56], [0, 1, 1, 0], CL);
  const labelY = interpolate(fi(f, 12, 7), [0, 1], [24, 0], CL);
  const mainY  = interpolate(fi(f, 16, 7), [0, 1], [30, 0], CL);

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: inOp }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0,
        width: `${blueW}%`, background: C.signal,
      }} />
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0,
        width: `${blackW}%`, background: C.bg,
      }} />

      <div style={{ ...FRAME_CENTER, gap: 12 }}>
        <div style={{
          fontFamily: SANS, fontWeight: 300, fontSize: 26,
          color: C.white, letterSpacing: "0.12em",
          opacity: textOp * 0.60,
          transform: `translateY(${labelY}px)`,
        }}>
          {"THAT'S WHERE"}
        </div>
        <div style={{
          fontFamily: DISPLAY, fontSize: 190,
          color: C.white, lineHeight: 0.88, letterSpacing: "0.01em",
          opacity: textOp,
          transform: `translateY(${mainY}px)`,
        }}>
          WE COME IN.
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// S4 — "MOST BUSINESSES STALL."  (60 frames, global 205–264)  NEW
// Chrome line draws at centre, text splits above/below, red glow pulse
// ──────────────────────────────────────────────────────────────────────────────
function S4() {
  const f = useCurrentFrame();
  const inOp   = fi(f, 0, 3);
  const exitOp = fo(f, 55, 4);

  const lineP   = interpolate(f, [5, 20], [0, 1], CL);
  const aboveOp = fi(f, 18, 6);
  const aboveY  = interpolate(aboveOp, [0, 1], [-30, 0], CL);
  const belowOp = fi(f, 22, 6);
  const belowY  = interpolate(belowOp, [0, 1], [30, 0], CL);

  const glowFactor = f >= 42 && f <= 50
    ? Math.sin((f - 42) / 8 * Math.PI) : 0;

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: inOp * exitOp }}>
      {/* Red glow pulse behind STALL. */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 400px 300px at 50% 55%, rgba(200,90,69,${glowFactor * 0.08}) 0%, transparent 100%)`,
      }} />

      {/* Chrome line at vertical centre */}
      <svg viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <line x1={540 - 540 * lineP} y1={960} x2={540 + 540 * lineP} y2={960}
          stroke={C.stroke} strokeWidth="1.5" />
      </svg>

      {/* "MOST BUSINESSES" — above centre line */}
      <div style={{
        position: "absolute", left: 0, right: 0,
        bottom: "50%", paddingBottom: 28,
        textAlign: "center",
        fontFamily: SERIF, fontSize: 64, color: C.dim,
        lineHeight: 1,
        opacity: aboveOp,
        transform: `translateY(${aboveY}px)`,
      }}>
        MOST BUSINESSES
      </div>

      {/* "STALL." — below centre line */}
      <div style={{
        position: "absolute", left: 0, right: 0,
        top: "50%", paddingTop: 16,
        textAlign: "center",
        fontFamily: DISPLAY, fontSize: 200, color: C.white,
        lineHeight: 0.88,
        opacity: belowOp,
        transform: `translateY(${belowY}px)`,
      }}>
        STALL.
      </div>
    </AbsoluteFill>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// S5 — IDENTITY "ZASER & CO"  (75 frames, global 265–339)
// Instrument Serif 140px per-letter spring, chrome line, DM Mono subtitle
// ──────────────────────────────────────────────────────────────────────────────
function S5() {
  const f = useCurrentFrame();
  const inOp   = fi(f, 0, 3);
  const exitOp = fo(f, 67, 7);

  const lineDrawV = interpolate(f, [0, 14], [0, 1], CL);

  const ZASER_LETTERS = ["Z", "A", "S", "E", "R"];
  const zaserLetters = ZASER_LETTERS.map((ch, i) => {
    const p = sp(f, 16 + i * 4, { damping: 14, stiffness: 160 });
    return {
      ch,
      op: Math.min(1, Math.max(0, p) * 2),
      y:  interpolate(Math.max(0, Math.min(1, p)), [0, 1], [-60, 0], CL),
    };
  });

  const andCoOp  = fi(f, 38, 8);
  const andCoY   = interpolate(andCoOp, [0, 1], [16, 0], CL);
  const lineDrawH = interpolate(f, [48, 58], [0, 1], CL);
  const subOp    = fi(f, 56, 8);
  const subY     = interpolate(subOp, [0, 1], [14, 0], CL);

  const colW = 1080 / 5;

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: inOp * exitOp }}>
      <svg viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {[1, 2, 3, 4].map(i => (
          <line key={i}
            x1={colW * i} y1={0} x2={colW * i} y2={1920}
            stroke={C.grid} strokeWidth="1.5"
            strokeDasharray={1920}
            strokeDashoffset={1920 * (1 - lineDrawV)}
          />
        ))}
      </svg>

      <div style={FRAME_CENTER}>
        {/* ZASER — per-letter spring */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
          {zaserLetters.map(({ ch, op, y }, i) => (
            <span key={i} style={{
              fontFamily: SERIF, fontSize: 140, fontWeight: 400,
              color: C.white, letterSpacing: "0.06em",
              display: "inline-block",
              opacity: op,
              transform: `translateY(${y}px)`,
              lineHeight: 0.9,
            }}>
              {ch}
            </span>
          ))}
        </div>

        {/* Chrome line — 400px, draws from centre */}
        <div style={{
          width: 400, height: 1.5, background: C.stroke,
          marginTop: 14, marginBottom: 6,
          transform: `scaleX(${lineDrawH})`,
          transformOrigin: "center",
        }} />

        {/* & CO */}
        <div style={{
          fontFamily: SERIF, fontStyle: "italic", fontSize: 72, fontWeight: 400,
          color: C.dim, letterSpacing: "0.08em", lineHeight: 0.9,
          opacity: andCoOp,
          transform: `translateY(${andCoY}px)`,
        }}>
          {"& CO"}
        </div>

        {/* Subtitle */}
        <div style={{
          fontFamily: MONO, fontSize: 13, color: C.signal,
          letterSpacing: "0.2em", marginTop: 20,
          opacity: subOp,
          transform: `translateY(${subY}px)`,
        }}>
          {"STRATEGIC & MANAGEMENT CONSULTANCY"}
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// S6 — FIVE PILLARS GRID  (80 frames, global 340–419)
// Full 1920px columns, Instrument Serif 52px, horizontal centre line
// ──────────────────────────────────────────────────────────────────────────────
const PILLARS = [
  { num: "01", lines: ["FINANCIAL", "CLARITY"] },
  { num: "02", lines: ["MARGIN &", "OPS"] },
  { num: "03", lines: ["AI AUDIT"] },
  { num: "04", lines: ["CONTENT", "GEN."] },
  { num: "05", lines: ["HR & AI", "TRAINING"] },
];

function S6() {
  const f = useCurrentFrame();
  const inOp   = fi(f, 0, 3);
  const exitOp = fo(f, 73, 6);

  const colW   = 1080 / 5;
  const hlineP = interpolate(f, [40, 50], [0, 1], CL);

  const partnerOp = fi(f, 48, 6);
  const partnerY  = interpolate(partnerOp, [0, 1], [16, 0], CL);

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: inOp * exitOp }}>
      <svg viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {[1, 2, 3, 4].map(i => {
          const drawP = interpolate(f, [i * 4, i * 4 + 14], [0, 1], CL);
          return (
            <line key={i}
              x1={colW * i} y1={0} x2={colW * i} y2={1920}
              stroke="rgba(240,241,244,0.08)" strokeWidth="1.5"
              strokeDasharray={1920}
              strokeDashoffset={1920 * (1 - drawP)}
            />
          );
        })}
        <line x1={0} y1={960} x2={1080 * hlineP} y2={960}
          stroke={C.stroke} strokeWidth="1.5" />
      </svg>

      {PILLARS.map((col, i) => {
        const entryP  = sp(f, i * 8 + 8, { damping: 16, stiffness: 140 });
        const entryOp = Math.min(1, Math.max(0, entryP) * 2);
        const entryY  = interpolate(Math.max(0, Math.min(1, entryP)), [0, 1], [60, 0], CL);
        return (
          <div key={i} style={{
            position: "absolute",
            left: colW * i, width: colW,
            top: 0, bottom: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "0 8px",
            opacity: entryOp,
            transform: `translateY(${entryY}px)`,
          }}>
            <div style={{
              fontFamily: MONO, fontSize: 18, color: C.signal,
              letterSpacing: "0.1em", marginBottom: 36,
            }}>
              {col.num}
            </div>
            {col.lines.map((line, li) => (
              <div key={li} style={{
                fontFamily: SERIF, fontSize: 52, fontWeight: 400,
                color: C.white, lineHeight: 1.2,
                textAlign: "center", letterSpacing: "0.01em",
              }}>
                {line}
              </div>
            ))}
          </div>
        );
      })}

      {/* YOUR STRATEGIC PARTNER. — below horizontal line, Signal Blue, full opacity */}
      <div style={{
        position: "absolute", top: 990, left: 0, right: 0,
        textAlign: "center",
        fontFamily: SERIF, fontStyle: "italic",
        fontSize: 28, color: C.signal, letterSpacing: "0.06em",
        opacity: partnerOp,
        transform: `translateY(${partnerY}px)`,
      }}>
        YOUR STRATEGIC PARTNER.
      </div>
    </AbsoluteFill>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// S7 — "ONE FIRM." BRIDGE  (60 frames, global 420–479)  NEW
// Three lines: clip-path reveals + fade-up, chrome line beneath
// ──────────────────────────────────────────────────────────────────────────────
function S7() {
  const f = useCurrentFrame();
  const inOp   = fi(f, 0, 3);
  const exitOp = fo(f, 55, 4);

  const clip1  = interpolate(f, [5, 16], [0, 100], CL);
  const line2Op = fi(f, 15, 6);
  const line2Y  = interpolate(line2Op, [0, 1], [20, 0], CL);
  const clip3  = interpolate(f, [25, 36], [0, 100], CL);
  const chromeP = interpolate(f, [40, 52], [0, 1], CL);

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: inOp * exitOp }}>
      <div style={FRAME_CENTER}>
        <div style={{
          fontFamily: DISPLAY, fontSize: 160, color: C.white,
          lineHeight: 0.88, letterSpacing: "0.01em",
          clipPath: `inset(0 ${100 - clip1}% 0 0)`,
        }}>
          ONE FIRM.
        </div>

        <div style={{
          fontFamily: SANS, fontWeight: 600, fontSize: 48, color: C.dim,
          letterSpacing: "0.06em", lineHeight: 1,
          marginTop: 28, marginBottom: 28,
          opacity: line2Op,
          transform: `translateY(${line2Y}px)`,
        }}>
          FIVE DISCIPLINES.
        </div>

        <div style={{
          fontFamily: DISPLAY, fontSize: 160, color: C.white,
          lineHeight: 0.88, letterSpacing: "0.01em",
          clipPath: `inset(0 ${100 - clip3}% 0 0)`,
        }}>
          ONE OBJECTIVE.
        </div>

        {/* Chrome line beneath */}
        <div style={{
          width: `${Math.min(984, 984 * chromeP)}px`,
          height: 1.5, background: C.stroke,
          marginTop: 36,
        }} />
      </div>
    </AbsoluteFill>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// S8 — "WE BUILD."  (75 frames, global 480–554)
// Phase A: "WE DON'T JUST ADVISE." → Phase C: "WE BUILD." C.signal 240px SLAM
// ──────────────────────────────────────────────────────────────────────────────
function S8() {
  const f = useCurrentFrame();
  const inOp = fi(f, 0, 3);

  // Phase A (f 0–38): setup + ADVISE.
  const setupOp = interpolate(f, [3, 10], [0, 1], CL) * interpolate(f, [30, 38], [1, 0], CL);
  const setupY  = interpolate(fi(f, 3, 7), [0, 1], [20, 0], CL);

  const adviseP  = sp(f, 11, { damping: 13, stiffness: 170 });
  const adviseOp = Math.min(1, Math.max(0, adviseP) * 1.8) * interpolate(f, [30, 38], [1, 0], CL);
  const adviseY  = interpolate(Math.max(0, Math.min(1, adviseP)), [0, 1], [40, 0], CL);

  // Phase C (f 40–70): WE BUILD. — Signal Blue at FULL OPACITY
  const buildSpP = sp(f, 40, { damping: 10, stiffness: 220 });
  const buildSc  = interpolate(buildSpP, [0, 1], [1.10, 1.0], CLX);
  const buildOp  = fi(f, 40, 4) * fo(f, 68, 5);

  return (
    <AbsoluteFill style={{ background: C.black, opacity: inOp }}>
      {/* Phase A — WE DON'T JUST ADVISE. */}
      {f < 42 && (
        <div style={FRAME_CENTER}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{
              fontFamily: SANS, fontWeight: 300, fontSize: 32,
              color: C.dim, letterSpacing: "0.1em",
              opacity: setupOp,
              transform: `translateY(${setupY}px)`,
            }}>
              {"WE DON'T JUST"}
            </div>
            <div style={{
              fontFamily: SERIF, fontSize: 100, fontWeight: 400,
              color: C.white, lineHeight: 0.9,
              opacity: adviseOp,
              transform: `translateY(${adviseY}px)`,
            }}>
              ADVISE.
            </div>
          </div>
        </div>
      )}

      {/* Phase C — WE BUILD. — the SLAM */}
      {f >= 38 && (
        <div style={FRAME_CENTER}>
          <div style={{
            fontFamily: DISPLAY, fontSize: 240,
            color: C.signal,
            lineHeight: 0.86, letterSpacing: "0.01em",
            opacity: buildOp,
            transform: `scale(${buildSc})`,
          }}>
            WE BUILD.
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// S9 — LOGO EMERGENCE  (45 frames, global 555–599)
// Radial glow → logo → wordmark → tagline → subtitle → URL
// ──────────────────────────────────────────────────────────────────────────────
function S9() {
  const f = useCurrentFrame();
  const inOp = fi(f, 0, 3);

  const glowP    = interpolate(f, [0, 14], [0, 1], CL);
  const logoSp   = sp(f, 10, { damping: 18, stiffness: 110 });
  const logoOp   = Math.min(1, Math.max(0, logoSp) * 1.8);
  const logoSc   = interpolate(Math.max(0, Math.min(1, logoSp)), [0, 1], [0.85, 1.0], CL);
  const wordOp   = fi(f, 18, 8);
  const wordY    = interpolate(wordOp, [0, 1], [14, 0], CL);
  const tagOp    = fi(f, 24, 6);
  const subOp    = fi(f, 28, 6);
  const urlOp    = fi(f, 32, 5);

  return (
    <AbsoluteFill style={{ background: C.black, opacity: inOp }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 240px 240px at center, rgba(91,141,239,${glowP * 0.14}) 0%, transparent 100%)`,
      }} />

      <div style={FRAME_CENTER}>
        <Img
          src={staticFile("logo.png")}
          style={{
            height: 80,
            opacity: logoOp,
            transform: `scale(${logoSc})`,
            filter: `brightness(${0.3 + logoOp * 0.7})`,
          }}
        />
        <div style={{
          fontFamily: SANS, fontWeight: 700, fontSize: 64,
          color: C.white, letterSpacing: "0.12em",
          marginTop: 28,
          opacity: wordOp,
          transform: `translateY(${wordY}px)`,
        }}>
          {"ZASER & CO"}
        </div>
        <div style={{
          fontFamily: SERIF, fontStyle: "italic", fontSize: 22,
          color: C.dim, marginTop: 12,
          opacity: tagOp,
        }}>
          Advisory that builds.
        </div>
        <div style={{
          fontFamily: MONO, fontSize: 12, color: C.counter,
          letterSpacing: "0.18em", marginTop: 16,
          opacity: subOp,
        }}>
          {"STRATEGIC & MANAGEMENT CONSULTANCY"}
        </div>
        <div style={{
          fontFamily: SANS, fontWeight: 500, fontSize: 18,
          color: C.signal, letterSpacing: "0.04em",
          marginTop: 10, opacity: urlOp,
        }}>
          zaserandco.com
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Root — 600 frames (20s), 9 scenes, pure black parent
// ──────────────────────────────────────────────────────────────────────────────
export function ZaserBrandReel() {
  useGoogleFonts();
  const gf = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: C.black }}>
      {AUDIO_CUES.map((cue, i) => (
        <Sequence key={i} from={cue.frame} durationInFrames={60} layout="none">
          <Audio src={staticFile(`sfx/${cue.sound}.wav`)} volume={cue.volume} />
        </Sequence>
      ))}

      <Sequence from={0}   durationInFrames={75}  layout="none"><S1 /></Sequence>
      <Sequence from={75}  durationInFrames={70}  layout="none"><S2 /></Sequence>
      <Sequence from={145} durationInFrames={60}  layout="none"><S3 /></Sequence>
      <Sequence from={205} durationInFrames={60}  layout="none"><S4 /></Sequence>
      <Sequence from={265} durationInFrames={75}  layout="none"><S5 /></Sequence>
      <Sequence from={340} durationInFrames={80}  layout="none"><S6 /></Sequence>
      <Sequence from={420} durationInFrames={60}  layout="none"><S7 /></Sequence>
      <Sequence from={480} durationInFrames={75}  layout="none"><S8 /></Sequence>
      <Sequence from={555} durationInFrames={45}  layout="none"><S9 /></Sequence>
      <FrameCorners />
      <SceneCounter gf={gf} />
    </AbsoluteFill>
  );
}
