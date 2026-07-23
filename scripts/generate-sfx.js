// scripts/generate-sfx.js — Node.js WAV synthesis, zero dependencies
// Run: node scripts/generate-sfx.js

const fs   = require('fs');
const path = require('path');

const SR = 48000; // sample rate

// ── WAV writer ────────────────────────────────────────────────────────────────
function writeWav(filename, samples) {
  const numCh = 2, bps = 16;
  const dataSize = samples.length * numCh * (bps / 8);
  const buf = Buffer.alloc(44 + dataSize);
  let o = 0;
  buf.write('RIFF', o); o += 4;
  buf.writeUInt32LE(36 + dataSize, o); o += 4;
  buf.write('WAVE', o); o += 4;
  buf.write('fmt ', o); o += 4;
  buf.writeUInt32LE(16, o); o += 4;
  buf.writeUInt16LE(1, o); o += 2;  // PCM
  buf.writeUInt16LE(numCh, o); o += 2;
  buf.writeUInt32LE(SR, o); o += 4;
  buf.writeUInt32LE(SR * numCh * bps / 8, o); o += 4;
  buf.writeUInt16LE(numCh * bps / 8, o); o += 2;
  buf.writeUInt16LE(bps, o); o += 2;
  buf.write('data', o); o += 4;
  buf.writeUInt32LE(dataSize, o); o += 4;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.round(Math.max(-1, Math.min(1, samples[i])) * 32767);
    buf.writeInt16LE(s, o); o += 2; // L
    buf.writeInt16LE(s, o); o += 2; // R (same — mono content, stereo file)
  }
  fs.writeFileSync(filename, buf);
  console.log('  wrote', path.basename(filename), `(${samples.length} samples, ${(samples.length / SR * 1000).toFixed(1)}ms)`);
}

// ── Primitives ────────────────────────────────────────────────────────────────
function noise(ms, attackMs, decayMs, gain) {
  const n = Math.ceil(ms * SR / 1000);
  const atk = Math.ceil(attackMs * SR / 1000);
  const decR = decayMs * SR / 1000;
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const env = i < atk
      ? i / atk
      : Math.exp(-(i - atk) / decR);
    s[i] = (Math.random() * 2 - 1) * env * gain;
  }
  return s;
}

function biquadBP(s, freq, Q) {
  const w0 = 2 * Math.PI * freq / SR;
  const alpha = Math.sin(w0) / (2 * Q);
  const b0 = alpha, b1 = 0, b2 = -alpha;
  const a0 = 1 + alpha, a1 = -2 * Math.cos(w0), a2 = 1 - alpha;
  const out = new Float32Array(s.length);
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < s.length; i++) {
    const x0 = s[i];
    const y0 = (b0 * x0 + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x0; y2 = y1; y1 = y0;
    out[i] = y0;
  }
  return out;
}

// Run two bandpass passes for steeper roll-off
function bp(s, freq, Q) {
  return biquadBP(biquadBP(s, freq, Q), freq, Q);
}

function highpass(s, freq) {
  const RC = 1 / (2 * Math.PI * freq);
  const dt = 1 / SR, alpha = RC / (RC + dt);
  const out = new Float32Array(s.length);
  out[0] = s[0];
  for (let i = 1; i < s.length; i++) {
    out[i] = alpha * (out[i - 1] + s[i] - s[i - 1]);
  }
  return out;
}

function lowpass(s, freq) {
  const RC = 1 / (2 * Math.PI * freq);
  const dt = 1 / SR, alpha = dt / (RC + dt);
  const out = new Float32Array(s.length);
  out[0] = s[0];
  for (let i = 1; i < s.length; i++) {
    out[i] = out[i - 1] + alpha * (s[i] - out[i - 1]);
  }
  return out;
}

function sine(ms, freq, attackMs, decayMs, gain) {
  const n = Math.ceil(ms * SR / 1000);
  const atk = Math.ceil(attackMs * SR / 1000);
  const decR = decayMs * SR / 1000;
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const env = i < atk ? i / atk : Math.exp(-(i - atk) / decR);
    s[i] = Math.sin(2 * Math.PI * freq * (i / SR)) * env * gain;
  }
  return s;
}

// Normalize to target peak
function norm(s, peak = 0.95) {
  const max = s.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
  if (max === 0) return s;
  const scale = peak / max;
  return s.map(v => v * scale);
}

// ── Generate sounds ───────────────────────────────────────────────────────────
const OUT = path.join(__dirname, '..', 'public', 'sfx');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
console.log('\nGenerating SFX →', OUT, '\n');

// click_a: ultra-sharp bright transient (letters locking in)
writeWav(path.join(OUT, 'click_a.wav'),
  norm(bp(noise(18, 0.4, 17, 1.0), 5500, 2.2), 0.75));

// click_b: slightly fuller transient (strokes completing, words landing)
writeWav(path.join(OUT, 'click_b.wav'),
  norm(bp(noise(25, 0.8, 24, 1.0), 3800, 1.6), 0.70));

// click_c: soft, far away (supporting elements)
writeWav(path.join(OUT, 'click_c.wav'),
  norm(bp(noise(15, 0.8, 14, 1.0), 4200, 2.6), 0.45));

// impact_a: full body thud (BUILD. slam, WE COME IN.)
const impA_body = bp(noise(45, 0.8, 44, 1.0), 1200, 0.7);
const impA_crack = bp(noise(20, 0.2, 20, 0.6), 5000, 2.0);
const impA = new Float32Array(Math.max(impA_body.length, impA_crack.length));
for (let i = 0; i < impA.length; i++) {
  impA[i] = (impA_body[i] || 0) * 0.7 + (impA_crack[i] || 0) * 0.4;
}
writeWav(path.join(OUT, 'impact_a.wav'), norm(impA, 0.90));

// impact_b: blade-sharp scene cut
writeWav(path.join(OUT, 'impact_b.wav'),
  norm(bp(highpass(noise(12, 0.15, 12, 1.0), 4000), 6500, 3.2), 0.80));

// signal_tone: clean 880Hz sine — one clean note, resolution
writeWav(path.join(OUT, 'signal_tone.wav'),
  norm(lowpass(sine(25, 880, 2.5, 22, 1.0), 2000), 0.55));

console.log('\nDone — 6 files written.\n');
