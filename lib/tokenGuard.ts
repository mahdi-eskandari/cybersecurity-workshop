import crypto from "crypto";

const TTL = 10 * 60 * 1000;

const g = globalThis as unknown as { __usedTurnstile?: Map<string, number> };
const used = (g.__usedTurnstile ??= new Map<string, number>());

/** true = توکن تازه است و ثبت شد؛ false = قبلاً استفاده شده */
export function claimToken(token: string): boolean {
  const now = Date.now();
  for (const [k, exp] of used) if (now > exp) used.delete(k);

  const h = crypto.createHash("sha256").update(token).digest("hex");
  if (used.has(h)) return false;

  used.set(h, now + TTL);
  return true;
}