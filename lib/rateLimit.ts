type Bucket = { t: number[]; w: number };
const g = globalThis as unknown as { __rl?: Map<string, Bucket>; __rlSweep?: number };
const buckets = (g.__rl ??= new Map<string, Bucket>());

export const MIN = 60 * 1000;
export const HOUR = 60 * MIN;
export const DAY = 24 * HOUR;

function sweep(now: number) {
  if (now - (g.__rlSweep ?? 0) < MIN) return;
  g.__rlSweep = now;
  for (const [k, b] of buckets) {
    b.t = b.t.filter((x) => now - x < b.w);
    if (!b.t.length) buckets.delete(k);
  }
}

/** ثانیه‌های باقی‌مانده تا آزاد شدن؛ ۰ یعنی مجاز است. چیزی ثبت نمی‌کند. */
export function retryAfter(key: string, limit: number, windowMs: number): number {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b) return 0;
  const t = b.t.filter((x) => now - x < windowMs);
  if (t.length < limit) return 0;
  return Math.ceil((t[0] + windowMs - now) / 1000);
}

/** یک رویداد ثبت می‌کند. */
export function record(key: string, windowMs: number) {
  const now = Date.now();
  sweep(now);
  const b = buckets.get(key) ?? { t: [], w: windowMs };
  b.w = Math.max(b.w, windowMs);
  b.t.push(now);
  buckets.set(key, b);
}

export { getIp } from "./ip";


/** تعداد رویدادهای ثبت‌شده در پنجره */
export function countIn(key: string, windowMs: number): number {
  const b = buckets.get(key);
  if (!b) return 0;
  const now = Date.now();
  return b.t.filter((x) => now - x < windowMs).length;
}

/** زمان آخرین رویداد (میلی‌ثانیه)؛ ۰ یعنی هیچ */
export function lastAt(key: string): number {
  const b = buckets.get(key);
  return b?.t.length ? b.t[b.t.length - 1] : 0;
}