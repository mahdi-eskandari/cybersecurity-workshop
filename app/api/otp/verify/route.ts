import { NextRequest, NextResponse } from "next/server";
import { checkOtp, normalizePhone, signVerified } from "@/lib/otp";
import { verifyTurnstile } from "@/lib/turnstile";
import { claimToken } from "@/lib/tokenGuard";
import { record, retryAfter, MIN, HOUR } from "@/lib/rateLimit"; // مسیر را با اسم واقعی فایلت عوض کن

const FAIL_WINDOW = 15 * MIN;
const CAPTCHA_AFTER = 2; // بعد از ۲ اشتباه، کپچا لازم است
const LOCK_AFTER = 6;    // بعد از ۶ اشتباه، قفل
const IP_FAIL_LIMIT = 20;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const phone = normalizePhone(String(body?.phone ?? ""));
  const code = String(body?.code ?? "");

  if (!phone || !/^\d{6}$/.test(code)) {
    return NextResponse.json(
      { message: "کد وارد شده نادرست یا منقضی شده است" },
      { status: 400 }
    );
  }

  // قفل IP
  if (retryAfter(`vfail-ip:${ip}`, IP_FAIL_LIMIT, HOUR) > 0) {
    return NextResponse.json(
      { message: "تلاش‌های ناموفق زیاد است. بعداً دوباره امتحان کنید" },
      { status: 429 }
    );
  }

  // قفل شماره
  const lockWait = retryAfter(`vfail:${phone}`, LOCK_AFTER, FAIL_WINDOW);
  if (lockWait > 0) {
    return NextResponse.json(
      { message: `تلاش‌های ناموفق زیاد است. ${Math.ceil(lockWait / 60)} دقیقه دیگر دوباره امتحان کنید` },
      { status: 429 }
    );
  }

  // بعد از ۲ اشتباه، کپچا الزامی است
  if (retryAfter(`vfail:${phone}`, CAPTCHA_AFTER, FAIL_WINDOW) > 0) {
    const token = body?.turnstileToken;
    let ok = false;
    try {
      ok = await verifyTurnstile(token, ip === "unknown" ? null : ip);
    } catch (err) {
      console.error("Turnstile error:", err);
      return NextResponse.json({ message: "خطای پیکربندی سرور" }, { status: 500 });
    }
    if (!ok || !claimToken(String(token))) {
      return NextResponse.json(
        { message: "تایید امنیتی لازم است", captchaRequired: true },
        { status: 403 }
      );
    }
  }

  if (!checkOtp(phone, code)) {
    record(`vfail:${phone}`, FAIL_WINDOW);
    record(`vfail-ip:${ip}`, HOUR);
    return NextResponse.json(
      { message: "کد وارد شده نادرست یا منقضی شده است" },
      { status: 400 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("otp_verified", signVerified(phone), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}