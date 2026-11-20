
"use client";

import { useState, useRef } from "react";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  User,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";

// ── types ──────────────────────────────────────────────────────────────────

interface LoginFormData {
  username: string;
  email: string;
  password: string;
  otp: string;
}

// ── OTP digit input ────────────────────────────────────────────────────────

function OTPInput({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const digits = Array.from({ length: 6 }, (_, i) => value[i] || "");

  function handleChange(i: number, val: string) {
    if (!/^\d?$/.test(val)) return;

    const next = [...digits];
    next[i] = val;

    onChange(next.join(""));

    if (val && i < 5) {
      refs.current[i + 1]?.focus();
    }
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();

    const pastedDigits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    const next = ["", "", "", "", "", ""];

    pastedDigits.forEach((d, i) => {
      next[i] = d;
    });

    onChange(next.join(""));

    const focusIndex = Math.min(pastedDigits.length, 5);
    refs.current[focusIndex]?.focus();
  }

  return (
    <div
      className="flex gap-1.5 sm:gap-2 justify-center"
      dir="ltr"
      onPaste={handlePaste}
    >
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={`w-9 h-11 sm:w-10 sm:h-12 text-center text-sm sm:text-base font-bold rounded-lg border-2 bg-white caret-transparent
            focus:outline-none transition-all duration-150
            ${
              error
                ? "border-red-300 text-slate-400"
                : digit
                  ? "border-[#0B1C3E] text-[#0B1C3E]"
                  : "border-slate-200 text-slate-400"
            }
            focus:border-[#0B1C3E] focus:ring-2 focus:ring-[#0B1C3E]/10`}
        />
      ))}
    </div>
  );
}

// ── main ───────────────────────────────────────────────────────────────────

export default function App() {
  const [showPwd, setShowPwd] = useState(false);
  const [resent, setResent] = useState(false);

  // مشخص می‌کند که مرحله ارسال کد با موفقیت انجام شده یا نه
  const [codeSent, setCodeSent] = useState(false);

  // پیام موفقیت کاملاً جدا از خطاها
  const [successMessage, setSuccessMessage] = useState("");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onBlur",
defaultValues: {
  username: "",
  email: "",
  password: "",
  otp: "",
},
  });

  // ── resend / send verification code ─────────────────────────────────────

  async function handleResend() {
    // قبل از ارسال، ایمیل و پسورد را اعتبارسنجی می‌کنیم
const valid = await trigger([
  "username",
  "email",
  "password",
]);
    if (!valid) {
      return;
    }

const { username, email, password } = getValues();
    // پیام‌های قبلی را پاک می‌کنیم
    clearErrors("root");
    clearErrors("otp");
    setSuccessMessage("");

    setResent(false);
    setStatus("loading");

    try {
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
body: JSON.stringify({
  username,
  email,
  password,
}),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("idle");

        setError("root", {
          type: "server",
          message:
            result.message ||
            result.error ||
            "ایمیل یا رمز عبور اشتباه است.",
        });

        return;
      }

      // فقط وقتی API واقعاً موفق شده، کد ارسال‌شده محسوب می‌شود
      setCodeSent(true);
      setStatus("idle");
      setResent(true);

      setSuccessMessage(
        result.message || "کد تأیید به ایمیل شما ارسال شد."
      );

      setTimeout(() => {
        setResent(false);
      }, 4000);
    } catch (error) {
      console.error("Send verification code error:", error);

      setStatus("idle");

      setError("root", {
        type: "server",
        message: "خطایی هنگام ارسال کد رخ داد. دوباره تلاش کنید.",
      });
    }
  }

  // ── submit ────────────────────────────────────────────────────────────────

  async function onSubmit(data: LoginFormData) {
    try {
      // هر بار که درخواست جدید شروع می‌شود،
      // پیام موفقیت و خطای قبلی پاک می‌شوند.
      clearErrors("root");
      clearErrors("otp");
      setSuccessMessage("");

      setStatus("loading");

      // ────────────────────────────────────────────────────────────────────
      // مرحله اول:
      // ایمیل + پسورد → ارسال OTP
      // ────────────────────────────────────────────────────────────────────

      if (!codeSent) {
        const response = await fetch("/api/admin/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
  username: data.username,
  email: data.email,
  password: data.password,
}),
        });

        const result = await response.json();

        if (!response.ok) {
          setStatus("idle");

          setError("root", {
            type: "server",
            message:
              result.message ||
              result.error ||
              "ایمیل یا رمز عبور اشتباه است.",
          });

          return;
        }

        // فقط بعد از موفقیت واقعی API
        setCodeSent(true);
        setStatus("idle");

        // موفقیت دیگر داخل errors ذخیره نمی‌شود
        setSuccessMessage(
          result.message || "کد تأیید به ایمیل شما ارسال شد."
        );

        return;
      }

      // ────────────────────────────────────────────────────────────────────
      // مرحله دوم:
      // ایمیل + OTP → بررسی OTP و ورود
      // ────────────────────────────────────────────────────────────────────

      if (!data.otp || data.otp.length !== 6) {
        setStatus("idle");

        setError("otp", {
          type: "manual",
          message: "کد امنیتی باید ۶ رقمی باشد.",
        });

        return;
      }

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
body: JSON.stringify({
  username: data.username,
  email: data.email,
  code: data.otp,
}),
      });

      const result = await response.json();

      // اگر کد اشتباه باشد، اینجا متوقف می‌شویم
      if (!response.ok) {
        setStatus("idle");

        setError("otp", {
          type: "server",
          message:
            result.error ||
            result.message ||
            "کد تأیید نادرست است.",
        });

        return;
      }

      // فقط در صورت پاسخ موفق واقعی از /api/admin/login
      setStatus("success");

      // انتقال به پنل فقط بعد از ورود موفق
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1400);
    } catch (error) {
      console.error("Login error:", error);

      setStatus("idle");

      setError("root", {
        type: "server",
        message: "خطایی هنگام ورود رخ داد. دوباره تلاش کنید.",
      });
    }
  }

  // ── success screen ───────────────────────────────────────────────────────

  if (status === "success") {
    return (
      <Screen>
        <LoginCard>
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>

            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
              دسترسی تأیید شد
            </p>

            <h2 className="text-xl font-bold text-[#0B1C3E] mb-2">
              خوش آمدید
            </h2>

            <p className="text-[13px] text-slate-500">
              در حال انتقال به داشبورد مدیریت...
            </p>

            <div className="mt-5 flex justify-center">
              <div className="w-5 h-5 border-2 border-[#0B1C3E]/20 border-t-[#0B1C3E] rounded-full animate-spin" />
            </div>
          </div>
        </LoginCard>
      </Screen>
    );
  }

  return (
    <Screen>
      <LoginCard>

        {/* ── Card header ─────────────────────────────────────────────── */}

        <div className="text-center mb-8">

          {/* Logo mark */}

          <div className="flex justify-center mb-5">
            <div className="relative">

              <div className="w-14 h-14 bg-[#0B1C3E] rounded-2xl flex items-center justify-center shadow-md shadow-[#0B1C3E]/20">
                <Shield className="w-7 h-7 text-white" />
              </div>

              {/* Security ring */}

              <div className="absolute -inset-1.5 rounded-3xl border border-[#0B1C3E]/12 pointer-events-none" />

            </div>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1.5">
            پاراهور
          </p>

          <h1 className="text-xl font-bold text-[#0B1C3E] mb-1">
            پورتال مدیریت
          </h1>

          <p className="text-[13px] text-slate-400 font-medium">
            دسترسی امن · Secure Access
          </p>
        </div>

        {/* ── Success message ─────────────────────────────────────────── */}

        {successMessage && (
          <div className="flex items-center gap-2.5 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl mb-5">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />

            <p className="text-[12px] text-emerald-700 font-medium">
              {successMessage}
            </p>
          </div>
        )}

        {/* ── Error / server message ─────────────────────────────────── */}

        {errors.root && (
          <div className="flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl mb-5">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />

            <p className="text-[12px] text-red-700 font-medium">
              {errors.root.message}
            </p>
          </div>
        )}

        {/* ── Form ─────────────────────────────────────────────────────── */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >



{/* Username */}

<div>
  <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
    نام کاربری
  </label>

  <div className="relative">
    <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

    <input
      type="text"
      autoComplete="username"
      placeholder="منوچهر"
      dir="rtl"
      {...register("username", {
        required: "نام کاربری الزامی است",
      })}
      className={`w-full pr-10 pl-4 py-3 bg-slate-50 border rounded-xl text-[13px] text-slate-800 placeholder-slate-400
        focus:outline-none focus:bg-white focus:ring-2 transition-all text-right
        ${
          errors.username
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-slate-200 focus:border-[#0B1C3E] focus:ring-[#0B1C3E]/10"
        }`}
    />
  </div>

  {errors.username && (
    <p className="text-[11px] text-red-500 mt-1">
      {errors.username.message}
    </p>
  )}
</div>




          {/* Email */}

          <div>
            <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
              ایمیل
            </label>

            <div className="relative">

              <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

              <input
                type="email"
                autoComplete="email"
                placeholder="admin@parahoor.ir"
                dir="ltr"
                {...register("email", {
                  required: "ایمیل الزامی است",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "فرمت ایمیل معتبر نیست",
                  },
                })}
                className={`w-full pr-10 pl-4 py-3 bg-slate-50 border rounded-xl text-[13px] text-slate-800 placeholder-slate-400
                  focus:outline-none focus:bg-white focus:ring-2 transition-all text-right
                  ${
                    errors.email
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-slate-200 focus:border-[#0B1C3E] focus:ring-[#0B1C3E]/10"
                  }`}
              />

            </div>

            {errors.email && (
              <p className="text-[11px] text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}

          <div>
            <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
              رمز عبور
            </label>

            <div className="relative">

              <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

              <input
                type={showPwd ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••••••"
                dir="ltr"
                {...register("password", {
                  required: "رمز عبور الزامی است",
                  minLength: {
                    value: 6,
                    message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
                  },
                })}
                className={`w-full pr-10 pl-10 py-3 bg-slate-50 border rounded-xl text-[13px] text-slate-800 placeholder-slate-400
                  focus:outline-none focus:bg-white focus:ring-2 transition-all
                  ${
                    errors.password
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-slate-200 focus:border-[#0B1C3E] focus:ring-[#0B1C3E]/10"
                  }`}
              />

              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPwd ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>

            </div>

            {errors.password && (
              <p className="text-[11px] text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* 2FA OTP */}

          <div className="pt-1">

            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-3 sm:px-5 pt-4 pb-5">

              {/* OTP header */}

              <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-2.5">

                  <div className="w-7 h-7 rounded-lg bg-[#EBF3FF] flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1565C0]" />
                  </div>

                  <div>
                    <p className="text-[12px] font-bold text-[#0B1C3E]">
                      کد امنیتی دو مرحله‌ای
                    </p>

                    <p className="text-[10px] text-slate-400">
                      2FA / OTP Security Code
                    </p>
                  </div>

                </div>

                {resent ? (
                  <span className="text-[11px] font-semibold text-emerald-600">
                    کد ارسال شد ✓
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={status === "loading"}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-[#0B1C3E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className="w-3 h-3" />
                    {codeSent ? "ارسال مجدد" : "ارسال کد"}
                  </button>
                )}

              </div>

              {/* Digit boxes */}

              <Controller
                name="otp"
                control={control}
                rules={{
                  validate: (value) => {
                    // قبل از ارسال کد، OTP اجباری نیست
                    if (!codeSent && !value) {
                      return true;
                    }

                    if (codeSent && !value) {
                      return "کد امنیتی الزامی است";
                    }

                    return (
                      value.length === 6 ||
                      "کد امنیتی باید ۶ رقمی باشد"
                    );
                  },
                }}
                render={({ field }) => (
                  <OTPInput
                    value={field.value}
                    onChange={(value) => {
                      clearErrors("root");
                      setSuccessMessage("");
                      field.onChange(value);
                    }}
                    error={!!errors.otp}
                  />
                )}
              />

              {/* OTP error / help */}

              {errors.otp ? (
                <p className="text-center text-[10px] text-red-500 mt-3">
                  {errors.otp.message}
                </p>
              ) : (
                <p className="text-center text-[10px] text-slate-400 mt-3">
                  {codeSent
                    ? "کد ۶ رقمی ارسال‌شده به ایمیل خود را وارد کنید"
                    : "ابتدا ایمیل و رمز عبور را وارد کرده و کد امنیتی را دریافت کنید"}
                </p>
              )}

            </div>
          </div>

          {/* Submit */}

          <div className="pt-1">

            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-[14px] transition-all duration-200
                ${
                  status !== "loading"
                    ? "bg-[#0B1C3E] text-white hover:bg-[#1565C0] shadow-md shadow-[#0B1C3E]/20 active:scale-[0.98]"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
            >

              {status === "loading" ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                  {codeSent
                    ? "در حال بررسی..."
                    : "در حال ارسال کد..."}
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />

                  {codeSent
                    ? "ورود امن"
                    : "دریافت کد امنیتی"}
                </>
              )}

            </button>

          </div>

        </form>

        {/* ── Session security note ─────────────────────────────────────── */}

        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-5">

          {[
            { icon: Lock, text: "TLS 1.3" },
            { icon: ShieldCheck, text: "2FA اجباری" },
            { icon: Shield, text: "جلسه رمزنگاری‌شده" },
          ].map(({ icon: Icon, text }, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 text-[10px] text-slate-400"
            >
              <Icon className="w-3 h-3" />
              {text}
            </div>
          ))}

        </div>

      </LoginCard>
    </Screen>
  );
}

// ── layout shells ──────────────────────────────────────────────────────────

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div
      dir="rtl"
            className="min-h-screen bg-slate-100 flex flex-col items-center justify-center relative px-4 selection:bg-[rgba(21,101,192,0.22)] selection:text-[#0D47A1]"
      style={{ fontFamily: "var(--font-vazirmatn), sans-serif" }}
    >
      {/* Subtle dot watermark */}

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="adm-dots"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="1.5"
              cy="1.5"
              r="1"
              fill="#0B1C3E"
            />
          </pattern>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#adm-dots)"
        />
      </svg>

      {children}
    </div>
  );
}

function LoginCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-sm">

      {/* Outer glow ring */}

      <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-white/80 to-slate-200/40 pointer-events-none" />

      <div className="relative bg-white border border-slate-200/80 rounded-3xl shadow-[0_20px_60px_-12px_rgba(11,28,62,0.15)] overflow-hidden">

        {/* Top accent stripe */}

        <div className="h-[3px] bg-gradient-to-l from-[#1565C0] via-[#0B1C3E] to-[#1565C0]" />

        <div className="px-7 pt-7 pb-7">
          {children}
        </div>

      </div>
    </div>
  );
}
