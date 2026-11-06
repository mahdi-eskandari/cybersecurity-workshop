import crypto from "crypto";

const SECRET = process.env.OTP_SECRET;
if (!SECRET) throw new Error("OTP_SECRET is not set");

const TTL = 5 * 60 * 1000;        // اعتبار کد: ۵ دقیقه
const RESEND_GAP = 60 * 1000;     // فاصله بین دو ارسال
const MAX_ATTEMPTS = 5;
const VERIFIED_TTL = 15 * 60 * 1000;
const CAPTCHA_PASS_TTL = 10 * 60 * 1000;

type Entry = { hash: string; exp: number; attempts: number; sentAt: number };
type Bucket = { n: number; reset: number };
const g = globalThis as unknown as {
  __otp?: Map<string, Entry>;
  __otpRl?: Map<string, Bucket>;
};
const store = (g.__otp ??= new Map<string, Entry>());
const buckets = (g.__otpRl ??= new Map<string, Bucket>());

const hmac = (s: string) =>
  crypto.createHmac("sha256", SECRET).update(s).digest("hex");

const safeEqual = (a: string, b: string) => {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && crypto.timingSafeEqual(A, B);
};

export const normalizePhone = (v: string): string | null => {
  const en = v
    .replace(/[۰-۹]/g, (c) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(c)))
    .replace(/[٠-٩]/g, (c) => String("٠١٢٣٤٥٦٧٨٩".indexOf(c)))
    .replace(/[\s-]/g, "");
  const m = en.match(/^(?:\+98|0098|98|0)?(9\d{9})$/);
  return m ? "0" + m[1] : null;
};

export const toIntl = (phone: string) => "+98" + phone.slice(1);

function sweep() {
  const now = Date.now();
  for (const [k, e] of store) if (now > e.exp) store.delete(k);
  for (const [k, b] of buckets) if (now > b.reset) buckets.delete(k);
}

export function createOtp(phone: string) {
  sweep();
  const old = store.get(phone);
  if (old && Date.now() - old.sentAt < RESEND_GAP) {
    return {
      error: "wait" as const,
      seconds: Math.ceil((RESEND_GAP - (Date.now() - old.sentAt)) / 1000),
    };
  }
  const code = String(crypto.randomInt(100000, 1000000));
  store.set(phone, {
    hash: hmac(phone + code),
    exp: Date.now() + TTL,
    attempts: 0,
    sentAt: Date.now(),
  });
  return { code };
}

export function clearOtp(phone: string) {
  store.delete(phone);
}

// export function checkOtp(phone: string, code: string) {
//   const e = store.get(phone);
//   if (!e) return false;
//   if (Date.now() > e.exp || e.attempts >= MAX_ATTEMPTS) {
//     store.delete(phone);
//     return false;
//   }
//   e.attempts++;
//   const ok = safeEqual(e.hash, hmac(phone + code));
//   if (ok) store.delete(phone);
//   return ok;
// }


export function checkOtp(phone: string, code: string) {
  const e = store.get(phone);
  if (!e) return false;
  if (Date.now() > e.exp || e.attempts >= MAX_ATTEMPTS) {
    store.delete(phone);
    return false;
  }
  e.attempts++;
  const ok = safeEqual(e.hash, hmac(phone + code));
  if (ok) store.delete(phone);
  return ok;
}

/* ── کوکی «شماره تایید شده» (بعد از OTP موفق) ── */
export function signVerified(phone: string) {
  const exp = Date.now() + VERIFIED_TTL;
  return `${exp}.${hmac(`v:${phone}.${exp}`)}`;
}

export function checkVerified(token: string | undefined, phone: string) {
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!exp || !sig || Date.now() > exp) return false;
  return safeEqual(sig, hmac(`v:${phone}.${exp}`));
}

/* ── کوکی «کپچا حل شده» برای ارسال مجدد کد به همان شماره ── */
export function signCaptchaPass(phone: string) {
  const exp = Date.now() + CAPTCHA_PASS_TTL;
  return `${exp}.${hmac(`c:${phone}.${exp}`)}`;
}

export function checkCaptchaPass(token: string | undefined, phone: string) {
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!exp || !sig || Date.now() > exp) return false;
  return safeEqual(sig, hmac(`c:${phone}.${exp}`));
}

/* محدودیت تعداد درخواست؛ true یعنی مجاز است */
export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now > b.reset) {
    if (buckets.size > 20_000) sweep();
    buckets.set(key, { n: 1, reset: now + windowMs });
    return true;
  }
  b.n++;
  return b.n <= max;
}