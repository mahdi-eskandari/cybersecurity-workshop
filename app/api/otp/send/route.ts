import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  checkCaptchaPass,
  clearOtp,
  createOtp,
  normalizePhone,
  rateLimit,
  signCaptchaPass,
} from "@/lib/otp";
import { record, retryAfter, countIn, lastAt, MIN } from "@/lib/rateLimit";
import { claimToken } from "@/lib/tokenGuard";

const HOUR = 60 * 60 * 1000;

// ثانیه → متن خوانا: زیر ۶۰ ثانیه «ثانیه»، بالاتر «دقیقه» (رو به بالا گرد می‌شه)
const formatWait = (seconds: number) =>
  seconds < 60 ? `${seconds} ثانیه` : `${Math.ceil(seconds / 60)} دقیقه`;
// const FREE_RESENDS = 2;
const GAPS = [60, 120, 300]; // فاصله‌ی لازم بعد از ارسال ۱، ۲ و ۳ (ثانیه)
const FREE_WINDOW = 10 * MIN;
const FREE_RESENDS = 2;
const FAIL_WINDOW = 15 * MIN;
const MAX_SENDS = 4;            // اولین ارسال + ۳ ارسال مجدد
const SEND_WINDOW = 15 * MIN;
const RESEND_GAP_SEC = 60;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  // ۱) محدودیت IP
  if (!rateLimit(`ip:${ip}`, 15, HOUR)) {
    return NextResponse.json(
      { message: "تعداد درخواست‌ها زیاد است. بعداً تلاش کنید" },
      { status: 429 }
    );
  }

  // ۲) شماره
  const phone = normalizePhone(String(body?.phone ?? ""));
  if (!phone) {
    return NextResponse.json({ message: "شماره موبایل معتبر نیست" }, { status: 400 });
  }


    const sendKey = `send:${phone}`;
  const sentCount = countIn(sendKey, SEND_WINDOW);

  // سقف کل
  const sendWait = retryAfter(sendKey, MAX_SENDS, SEND_WINDOW);
  if (sendWait > 0) {
    return NextResponse.json(
      {
        message: `تعداد ارسال کد زیاد است. ${Math.ceil(sendWait / 60)} دقیقه دیگر دوباره تلاش کنید`,
        retryAfter: sendWait,
      },
      { status: 429 }
    );
  }

  // فاصله‌ی تدریجی بین دو ارسال
  if (sentCount > 0) {
    const gapSec = GAPS[Math.min(sentCount, GAPS.length) - 1];
    const gapWait = Math.ceil((lastAt(sendKey) + gapSec * 1000 - Date.now()) / 1000);
    if (gapWait > 0) {
      return NextResponse.json(
                { message: `لطفاً ${formatWait(gapWait)} دیگر دوباره تلاش کنید`, retryAfter: gapWait },
        { status: 429 }
      );
    }
  }

    // ۳) کپچا
  const token = body?.turnstileToken;
  const hasToken = typeof token === "string" && token.length > 0;

  if (hasToken) {
    let captchaOk = false;
    try {
      captchaOk = await verifyTurnstile(token, ip === "unknown" ? null : ip);
    } catch (err) {
      console.error("Turnstile error:", err);
      return NextResponse.json({ message: "خطای پیکربندی سرور" }, { status: 500 });
    }
    if (!captchaOk || !claimToken(token)) {
      return NextResponse.json(
        { message: "تایید کپچا ناموفق بود. دوباره تلاش کنید", captchaRequired: true },
        { status: 403 }
      );
    }
  } else {
    // بدون توکن فقط برای ۲ ارسال مجدد اول، و فقط اگر قبلاً برای همین شماره کپچا حل شده
    const passOk = checkCaptchaPass(req.cookies.get("otp_captcha")?.value, phone);
    const freeUsed = retryAfter(`free:${phone}`, FREE_RESENDS, FREE_WINDOW) > 0;
    const manyFails = retryAfter(`vfail:${phone}`, 2, FAIL_WINDOW) > 0;

    if (!passOk || freeUsed || manyFails) {
      return NextResponse.json(
        { message: "تایید امنیتی لازم است", captchaRequired: true },
        { status: 403 }
      );
    }
  }

  // ۴) سقف ساعتی برای هر شماره
  if (!rateLimit(`phone:${phone}`, 10, HOUR)) {
    return NextResponse.json(
      { message: "تعداد درخواست برای این شماره زیاد است. بعداً تلاش کنید" },
      { status: 429 }
    );
  }

  // ۴-ب) سقف روزانه برای هر شماره
  if (!rateLimit(`phone-day:${phone}`, 10, 24 * HOUR)) {
    return NextResponse.json(
      { message: "تعداد درخواست امروز برای این شماره تمام شده است. فردا تلاش کنید" },
      { status: 429 }
    );
  }


const ok = (nextResendIn: number) => {
  const res = NextResponse.json({ ok: true, nextResendIn });
  if (hasToken) {
    res.cookies.set("otp_captcha", signCaptchaPass(phone), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 10 * 60,
      secure: process.env.NODE_ENV === "production",
    });
  }
  return res;
};

  // ۵) ساخت کد
  const r = createOtp(phone);
if (r.error === "wait") {
  return NextResponse.json(
        { message: `لطفاً ${formatWait(r.seconds)} دیگر دوباره تلاش کنید`, retryAfter: r.seconds },
    { status: 429 }
  );
}

    if (!hasToken) record(`free:${phone}`, FREE_WINDOW);

    record(sendKey, SEND_WINDOW);

      const nowCount = countIn(sendKey, SEND_WINDOW);
  const nextResendIn =
    nowCount >= MAX_SENDS
      ? retryAfter(sendKey, MAX_SENDS, SEND_WINDOW)
      : GAPS[Math.min(nowCount, GAPS.length) - 1];


  if (process.env.NODE_ENV === "development") {
    console.log("OTP (dev):", phone, r.code);
  }

  // ۶) ارسال پیامک
  try {
    const res = await fetch("https://api.iranpayamak.com/ws/v1/sms/pattern", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Api-Key": process.env.FARAZ_API_KEY!,
      },
      body: JSON.stringify({
        code: process.env.FARAZ_PATTERN_CODE,
        attributes: { code: r.code },
        recipient: phone,
        line_number: process.env.FARAZ_LINE_NUMBER,
        number_format: "english",
      }),
      signal: AbortSignal.timeout(10000),
    });

    const text = await res.text().catch(() => "");

    if (!res.ok) {
      console.error("Faraz error:", res.status, text.slice(0, 300));
      clearOtp(phone);
      return NextResponse.json({ message: "ارسال پیامک ناموفق بود" }, { status: 502 });
    }

    return ok(nextResendIn);
  } catch (err) {
    console.error("Faraz request failed:", err);

    const e = err as { code?: string; cause?: { code?: string } };
    const errCode = e?.cause?.code ?? e?.code ?? "";
    const neverSent = ["ENOTFOUND", "ECONNREFUSED", "EAI_AGAIN", "UND_ERR_CONNECT_TIMEOUT"].includes(errCode);

    if (!neverSent) return ok(nextResendIn);;

    clearOtp(phone);
    return NextResponse.json(
      { message: "اتصال به سرویس پیامک برقرار نشد" },
      { status: 502 }
    );
  }
}