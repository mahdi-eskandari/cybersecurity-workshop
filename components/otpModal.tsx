"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { toLatinDigits } from "../lib/phone";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;
const FONT = "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif";

/* ────────────────────────────────
   ICONS
──────────────────────────────── */

const IconShield = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconRefresh = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
  </svg>
);

const IconLockSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

/* ────────────────────────────────
   OTP MODAL
──────────────────────────────── */

type OtpModalProps = {
  /** شماره استاندارد 09xxxxxxxxx که کد برایش ارسال شده */
  phone: string;
  /** بعد از تأیید موفق کد صدا زده می‌شود (اینجا گزارش ثبت می‌شود). اگر خطا بدهد، پیامش نمایش داده می‌شود */
  onVerified: () => Promise<void>;
  onClose: () => void;
  /** برگشت به فرم برای اصلاح شماره */
  onBack?: () => void;
  /** حالت پیش‌نمایش: هیچ درخواستی به سرور نمی‌رود (فقط برای دیدن ظاهر) */
  preview?: boolean;
  /** ثانیه‌های انتظار تا ارسال مجدد، از سرور */
  initialSeconds?: number;
};

export const OtpModal = ({ phone, onVerified, onClose, onBack, preview = false, initialSeconds = RESEND_SECONDS }: OtpModalProps) => {
  const { darkMode } = useTheme();

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [focusIndex, setFocusIndex] = useState<number | null>(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [resending, setResending] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
    const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);
    const errorRetries = useRef(0);
    const [resendCount, setResendCount] = useState(0);
const [wrongCount, setWrongCount] = useState(0);
const [serverCaptcha, setServerCaptcha] = useState(false);
const [verifiedOk, setVerifiedOk] = useState(false);
const needCaptcha = resendCount >= 2 || wrongCount >= 2 || serverCaptcha;

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const primary = darkMode ? "#00E5FF" : "#2563EB";
  const maskedPhone = `${phone.slice(0, 4)}•••${phone.slice(-4)}`;

  /* تایمر ارسال مجدد */
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  /* Esc = بستن */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, onClose]);

  const fillFrom = (start: number, raw: string) => {
    const v = toLatinDigits(raw).replace(/\D/g, "").slice(0, OTP_LENGTH - start);
    if (!v) return;

    setDigits((prev) => {
      const next = [...prev];
      [...v].forEach((c, k) => {
        next[start + k] = c;
      });
      return next;
    });

    setError("");
    inputs.current[Math.min(start + v.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleChange = (i: number, raw: string) => {
    let v = toLatinDigits(raw).replace(/\D/g, "");

    if (!v) {
      setDigits((prev) => prev.map((d, k) => (k === i ? "" : d)));
      return;
    }

    // کاربر روی خانه‌ی پُر تایپ کرده → فقط رقم جدید
    if (v.length === 2 && digits[i]) v = v[1];

    fillFrom(i, v);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      e.preventDefault();
      setDigits((prev) => prev.map((d, k) => (k === i - 1 ? "" : d)));
      inputs.current[i - 1]?.focus();
    } else if (e.key === "ArrowLeft" && i > 0) {
      inputs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < OTP_LENGTH - 1) {
      inputs.current[i + 1]?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePaste = (i: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    fillFrom(i, e.clipboardData.getData("text"));
  };

  const handleSubmit = async () => {
    if (busy) return;

    if (verifiedOk) {
  setBusy(true);
  setError("");
  try {
    await onVerified();
  } catch (e) {
    setError(e instanceof Error ? e.message : "خطایی رخ داد. دوباره تلاش کنید.");
    setBusy(false);
  }
  return;
}

    const code = digits.join("");

    if (code.length < OTP_LENGTH) {
      setError("کد ۶ رقمی را کامل وارد کنید");
      return;
    }

    if (needCaptcha && !turnstileToken) {
  setError("ابتدا تایید امنیتی را کامل کنید");
  return;
}

    setBusy(true);
    setError("");

    if (preview) {
      await new Promise((r) => setTimeout(r, 800));
      setBusy(false);
      setError("حالت پیش‌نمایش: کد بررسی نشد");
      return;
    }

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  phone,
  code,
  ...(needCaptcha ? { turnstileToken } : {}),
}),
      });

      if (needCaptcha) {
  setTurnstileToken("");
  turnstileRef.current?.reset();
}

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        if (result?.captchaRequired) setServerCaptcha(true);
        setDigits(Array(OTP_LENGTH).fill(""));
        inputs.current[0]?.focus();
        setWrongCount((n) => n + 1);
      if (needCaptcha) {
        setTurnstileToken("");
        turnstileRef.current?.reset();
      }
        setError(result?.message || "کد واردشده صحیح نیست");
        setBusy(false);
        return;
      }

      // کد درست بود → ثبت گزارش (والد بعد از موفقیت redirect می‌کند)
      setVerifiedOk(true);
      await onVerified();
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطایی رخ داد. دوباره تلاش کنید.");
      setBusy(false);
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0 || resending || busy) return;

if (needCaptcha && !turnstileToken) {
  setError("ابتدا تایید امنیتی را کامل کنید");
  return;
}

    setResending(true);
    setError("");

    if (preview) {
      setDigits(Array(OTP_LENGTH).fill(""));
      setSecondsLeft(RESEND_SECONDS);
      setResending(false);
      return;
    }

    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  phone,
  ...(needCaptcha ? { turnstileToken } : {}),
}),
      });

      const result = await res.json().catch(() => null);

if (!res.ok) {
  if (result?.captchaRequired) setServerCaptcha(true);
  if (result?.retryAfter) setSecondsLeft(Number(result.retryAfter));
  throw new Error(result?.message || "ارسال مجدد کد ناموفق بود");
}

      setDigits(Array(OTP_LENGTH).fill(""));
      setSecondsLeft(Number(result?.nextResendIn) || RESEND_SECONDS);
      setResendCount((n) => n + 1);
      inputs.current[0]?.focus();
    } catch (e) {
      setError(e instanceof Error ? e.message : "ارسال مجدد کد ناموفق بود");
    } finally {
  if (needCaptcha) {
    setTurnstileToken("");
    turnstileRef.current?.reset();
  }
  setResending(false);
}
  };

const canResend = secondsLeft <= 0 && !resending && !busy && (!needCaptcha || !!turnstileToken);

const fmt = (s: number) =>
  s >= 60 ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : String(s);

  const divider = darkMode ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(37,99,235,0.08)";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: darkMode ? "rgba(4,8,20,0.88)" : "rgba(15,23,42,0.32)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      onClick={(e) => e.target === e.currentTarget && !busy && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="تأیید شماره موبایل با کد پیامکی"
        dir="rtl"
        className="relative overflow-hidden"
        style={{
          width: "100%",
          maxWidth: 520,
          fontFamily: FONT,
          background: darkMode
            ? "linear-gradient(160deg, rgba(10,17,42,0.99) 0%, rgba(6,11,28,0.99) 100%)"
            : "linear-gradient(160deg, #FFFFFF 0%, #F8FAFC 100%)",
          border: darkMode
            ? "1px solid rgba(0,229,255,0.18)"
            : "1px solid rgba(37,99,235,0.16)",
          borderRadius: 20,
          boxShadow: darkMode
            ? "0 0 80px rgba(0,229,255,0.07), 0 40px 100px rgba(0,0,0,0.7)"
            : "0 20px 70px rgba(37,99,235,0.10), 0 30px 80px rgba(15,23,42,0.12)",
        }}
      >
        {/* خط رنگی بالا */}
        <div
          style={{
            height: 2,
            background: darkMode
              ? "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.6) 30%, rgba(0,229,255,0.9) 50%, rgba(0,229,255,0.6) 70%, transparent 100%)"
              : "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.45) 30%, rgba(37,99,235,0.8) 50%, rgba(37,99,235,0.45) 70%, transparent 100%)",
          }}
        />

        {/* ── هدر: مشخص می‌کند این مرحله تأیید کد پیامکی است ── */}
        <div
          className="flex items-start justify-between px-6 pt-5 pb-4"
          style={{ borderBottom: divider }}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: primary,
                  display: "inline-block",
                  boxShadow: `0 0 6px ${primary}`,
                  animation: "pulse-cyan 1.5s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  color: darkMode ? "rgba(0,229,255,0.7)" : "rgba(37,99,235,0.8)",
                  letterSpacing: "0.18em",
                  fontWeight: "550"
                }}
              >
                OTP VERIFICATION // SMS
              </span>
            </div>

            <h2
              className="font-black"
              style={{
                color: darkMode ? "#fff" : "#111827",
                fontSize: "1.05rem",
                lineHeight: 1.4,
              }}
            >
              تأیید شماره موبایل
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            aria-label="بستن"
            className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl transition-all"
            style={{
              color: darkMode ? "#475569" : "#64748B",
              background: darkMode ? "rgba(255,255,255,0.04)" : "#F8FAFC",
              border: darkMode
                ? "1px solid rgba(255,255,255,0.06)"
                : "1px solid rgba(37,99,235,0.10)",
            }}
          >
            <IconClose />
          </button>
        </div>

        {/* ── بدنه ── */}
       <div className="px-4 sm:px-6 pt-5 pb-6">
          {/* کارت داخلی مثل تصویر */}
<div className="px-3 sm:px-5 pt-4 pb-4"
            style={{
              background: darkMode ? "rgba(255,255,255,0.02)" : "#F8FAFC",
              border: darkMode
                ? "1px solid rgba(255,255,255,0.06)"
                : "1px solid #E2E8F0",
              borderRadius: 16,
            }}
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 11,
                    background: darkMode ? "rgba(0,229,255,0.08)" : "#E8F0FE",
                    border: darkMode ? "1px solid rgba(0,229,255,0.2)" : "none",
                  }}
                >
                  <IconShield color={primary} />
                </div>

                <div>
                  <p
                    className="font-bold"
                    style={{
                      color: darkMode ? "#fff" : "#0F1B3D",
                      fontSize: "0.85rem",
                      lineHeight: 1.4,
                    }}
                  >
                    کد امنیتی دو مرحله‌ای
                  </p>
                  <p
                    style={{
                      color: "#94A3B8",
                      fontSize: "0.73rem",
                      direction: "ltr",
                      textAlign: "right",
                    }}
                  >
                    2FA / OTP Security Code
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend}
                className="flex items-center gap-1.5 transition-all"
                style={{
                  color: canResend ? primary : "#94A3B8",
                  fontSize: "0.72rem",
                  fontFamily: FONT,
                  cursor: canResend ? "pointer" : "default",
                }}
              >
                <span className={resending ? "animate-spin" : ""} style={{ display: "flex" }}>
                  <IconRefresh />
                </span>
                {secondsLeft > 0 ? (
                  <span>
                    ارسال مجدد (
                    <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmt(secondsLeft)}</span>)
                  </span>
                ) : needCaptcha && !turnstileToken ? (
                  <span>ابتدا تایید امنیتی را کامل کنید</span>
                ) : (
                  <span>ارسال کد</span>
                )}
              </button>
            </div>

            {/* خانه‌های کد */}
            <div className="flex justify-center gap-1.5 sm:gap-2 w-full" dir="ltr">
              {digits.map((d, i) => {
                const focused = focusIndex === i;

                return (
                  <input
                    key={i}
                    ref={(el) => {
                      inputs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    aria-label={`رقم ${i + 1} از ${OTP_LENGTH}`}
                    value={d}
                    disabled={busy}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={(e) => handlePaste(i, e)}
                    onFocus={(e) => {
                      setFocusIndex(i);
                      e.target.select();
                    }}
                    onBlur={() => setFocusIndex(null)}
                    className="text-center font-bold outline-none transition-all"
                    style={{
width: "100%",
maxWidth: 46,
minWidth: 0,
aspectRatio: "46 / 50",
flex: "1 1 0",
borderRadius: 12,
fontSize: "1.1rem",
padding: 0,
                      fontFamily: FONT,
                      color: darkMode ? "#E2E8F0" : "#0F1B3D",
                      caretColor: primary,
                      background: darkMode ? "#060B19" : "#FFFFFF",
                      border: error
                        ? "1.5px solid rgba(239,68,68,0.55)"
                        : focused
                          ? `1.5px solid ${primary}`
                          : d
                            ? darkMode
                              ? "1.5px solid rgba(0,229,255,0.3)"
                              : "1.5px solid rgba(37,99,235,0.35)"
                            : darkMode
                              ? "1.5px solid rgba(255,255,255,0.08)"
                              : "1.5px solid #E2E8F0",
                      boxShadow: focused
                        ? darkMode
                          ? "0 0 0 3px rgba(0,229,255,0.08)"
                          : "0 0 0 3px rgba(37,99,235,0.08)"
                        : "none",
                    }}
                  />
                );
              })}
            </div>

            {/* راهنما / خطا */}
            <p
              className="text-center mt-3"
              style={{
                color: error ? "#EF4444" : "#94A3B8",
                fontSize: "0.72rem",
                lineHeight: 1.8,
                minHeight: 20,
              }}
              aria-live="polite"
            >
              {error || (
                <>
                  کد ۶ رقمی ارسال‌شده به{" "}
                  <span style={{ direction: "ltr", unicodeBidi: "isolate", display: "inline-block" }}>
                    {maskedPhone}
                  </span>{" "}
                  را وارد کنید
                </>
              )}
            </p>
          </div>


              {needCaptcha && (
                <div style={{ width: "100%", marginTop: 12, minHeight: 65 }}>
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    options={{
                      theme: darkMode ? "dark" : "light",
                      size: "flexible",
                      language: "fa",
                    }}
                    onSuccess={(t: string) => {
                      errorRetries.current = 0;
                      setTurnstileToken(t);
                      setError("");
                    }}
                    onExpire={() => setTurnstileToken("")}
                    onError={() => {
                      setTurnstileToken("");
                      if (errorRetries.current < 2) {
                        errorRetries.current += 1;
                        setTimeout(() => turnstileRef.current?.reset(), 1500);
                      }
                    }}
                  />
                </div>
              )}

          {/* دکمه */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={busy}
            className="w-full flex items-center justify-center gap-2 font-bold transition-all "
            style={{
              marginTop: 16,
              height: 46,
              borderRadius: 14,
              fontSize: "0.88rem",
              fontFamily: FONT,
              background: busy
                ? darkMode
                  ? "rgba(0,229,255,0.25)"
                  : "#0D47A1"
                : darkMode
                  ? "#00E5FF"
                  : "#1565C0",
              color: darkMode ? "#0A1128" : "#FFFFFF",
              boxShadow: darkMode
                ? "0 0 20px rgba(0,229,255,0.2)"
                : "0 8px 20px rgba(15,31,66,0.2)",
              cursor: busy ? "not-allowed" : "pointer",
            }}
          >
            {busy ? (
              <>
                <span
                  className="animate-spin"
                  style={{
                    width: 15,
                    height: 15,
                    border: "2px solid rgba(255,255,255,0.35)",
                    borderTopColor: darkMode ? "#0A1128" : "#fff",
                    borderRadius: "50%",
                  }}
                />
                در حال بررسی...
              </>
            ) : (
              <>
                <IconLockSmall />
                تأیید کد و ثبت گزارش
              </>
            )}
          </button>

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              disabled={busy}
              className="w-full mt-3 transition-all"
              style={{
                color: "#94A3B8",
                fontSize: "0.74rem",
                fontFamily: FONT,
              }}
            >
              شماره اشتباه است؟ ویرایش
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
