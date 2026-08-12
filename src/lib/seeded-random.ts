/**
 * Deterministic pseudo-random helpers for demo data.
 *
 * Every number the dashboards show is derived from a string seed, so the server
 * and the client compute identical values and hydration stays clean. Nothing in
 * here may call Math.random() or read the clock.
 */

/** FNV-1a — stable 32-bit hash of a string, identical across processes. */
export function seedFromString(input: string): number {
  let hash = 0x811c9dc5;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return hash >>> 0;
}

/** mulberry32 — small, fast PRNG returning values in [0, 1). */
export function makeRng(seed: number): () => number {
  let state = seed >>> 0;

  return function next() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Convenience: seed a generator straight from a string. */
export function rngFromString(input: string): () => number {
  return makeRng(seedFromString(input));
}

/** Integer in [min, max] inclusive. */
export function rngInt(rng: () => number, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

export function rngPick<T>(rng: () => number, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)]!;
}

/** Fisher-Yates on a copy — leaves the source array untouched. */
export function rngShuffle<T>(rng: () => number, items: readonly T[]): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(rng() * (index + 1));
    [result[index], result[swap]] = [result[swap]!, result[index]!];
  }

  return result;
}

/** A wandering series — used for trend lines. */
export function rngSeries(
  rng: () => number,
  options: {
    length: number;
    start: number;
    drift: number;
    jitter: number;
    min?: number;
  },
): number[] {
  const { length, start, drift, jitter, min = 0 } = options;
  const values: number[] = [];
  let current = start;

  for (let index = 0; index < length; index += 1) {
    current += drift + (rng() - 0.5) * jitter * 2;
    values.push(Math.max(min, Math.round(current)));
  }

  return values;
}

/** Split a total into `count` positive parts that sum back to the total. */
export function rngSplit(
  rng: () => number,
  total: number,
  count: number,
): number[] {
  if (count <= 0) return [];

  const weights = Array.from({ length: count }, () => 0.4 + rng());
  const sum = weights.reduce((acc, weight) => acc + weight, 0);
  const parts = weights.map((weight) =>
    Math.max(1, Math.round((weight / sum) * total)),
  );

  // Push the rounding drift onto the largest bucket so the total is exact.
  const drift = total - parts.reduce((acc, part) => acc + part, 0);
  const largest = parts.indexOf(Math.max(...parts));
  parts[largest] = Math.max(1, parts[largest]! + drift);

  return parts;
}
