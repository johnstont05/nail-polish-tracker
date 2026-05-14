// blobUtils.js
// Deterministic blob shape generation based on a seed index.
// Import these wherever you need to draw blob SVG paths.

/** Seeded pseudo-random number generator (LCG) */
export function seededRand(seed) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 4294967296;
  };
}

/**
 * Generate a wobbly organic SVG path string.
 * @param {number} seed  - integer seed (use polish index × 137 + 42)
 * @param {number} cx    - centre x
 * @param {number} cy    - centre y
 * @param {number} r     - base radius
 */
export function blobPath(seed, cx, cy, r) {
  const rand = seededRand(seed);
  const pts = 8;
  const points = [];

  for (let i = 0; i < pts; i++) {
    const angle = (i / pts) * Math.PI * 2;
    const jitter = 0.55 + rand() * 0.5;
    points.push([
      cx + Math.cos(angle) * r * jitter,
      cy + Math.sin(angle) * r * jitter,
    ]);
  }

  let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < pts; i++) {
    const next = points[(i + 1) % pts];
    const curr = points[i];
    const cpx = (curr[0] + next[0]) / 2 + (rand() - 0.5) * r * 0.4;
    const cpy = (curr[1] + next[1]) / 2 + (rand() - 0.5) * r * 0.4;
    d += ` Q ${cpx.toFixed(1)} ${cpy.toFixed(1)} ${next[0].toFixed(1)} ${next[1].toFixed(1)}`;
  }
  return d + ' Z';
}

/**
 * Generate SVG child elements for shimmer/glitter finish overlays.
 * Returns an HTML string ready to use inside {@html ...}.
 * @param {object} polish  - polish object with .finish
 * @param {number} seed
 * @param {number} cx
 * @param {number} cy
 * @param {number} r
 */
export function makeExtras(polish, seed, cx, cy, r) {
  const rand = seededRand(seed + 99);
  let e = '';

  if (polish.finish === 'glitter') {
    for (let i = 0; i < 6; i++) {
      const sx = (cx + (rand() - 0.5) * r * 1.2).toFixed(1);
      const sy = (cy + (rand() - 0.5) * r * 1.2).toFixed(1);
      const sr = (1.5 + rand()).toFixed(1);
      const op = (0.4 + rand() * 0.4).toFixed(2);
      e += `<circle cx="${sx}" cy="${sy}" r="${sr}" fill="white" opacity="${op}"/>`;
    }
  } else {
    // shimmer highlight streak
    const lx = cx - r * 0.3 + (rand() - 0.5) * r * 0.3;
    const ly = cy - r * 0.4;
    const lx2 = lx + r * 0.25;
    const ly2 = ly + r * 0.35;
    e += `<path d="M ${lx.toFixed(1)} ${ly.toFixed(1)} Q ${(lx + r * 0.1).toFixed(1)} ${(ly + r * 0.15).toFixed(1)} ${lx2.toFixed(1)} ${ly2.toFixed(1)}" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.2" fill="none"/>`;
  }
  return e;
}

/**
 * Derive all blob rendering data for a polish at a given index.
 * @param {object} polish
 * @param {number} index  - position in the master polishes array
 */
export function blobData(polish, index) {
  const seed = index * 137 + 42;
  const cx = 50, cy = 50, r = 38;
  return {
    path: blobPath(seed, cx, cy, r),
    extras: makeExtras(polish, seed, cx, cy, r),
    tilt: ((seed % 7) - 3) * 2,   // degrees, for CSS custom property
    seed,
  };
}