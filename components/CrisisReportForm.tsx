"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "@/components/ThemeProvider";
import { useRouter } from "next/navigation";
import {OtpModal} from "../components/otpModal";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

/* ────────────────────────────────
   ICONS
──────────────────────────────── */

const IconClose = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconLock = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const IconSend = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const IconShieldCheck = ({ darkMode }: { darkMode: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={darkMode ? "#00E5FF" : "#2563EB"}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const IconCrypto = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9 8h4.5a1.5 1.5 0 010 3H9v3h5a1.5 1.5 0 010 3H9" />
    <line x1="12" y1="6" x2="12" y2="8" />
    <line x1="12" y1="18" x2="12" y2="20" />
  </svg>
);

const IconHack = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 17v4M16 17v4M12 21h.01" />
    <path d="M7 10l2 2-2 2" />
    <line x1="12" y1="12" x2="15" y2="12" />
  </svg>
);

const IconExtort = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" />
  </svg>
);

const IconRecaptcha = ({ darkMode }: { darkMode: boolean }) => {
  const primary = darkMode ? "0,229,255" : "37,99,235";

  return (
    <svg width="12" height="12" viewBox="0 0 64 64" fill="none">
      <path
        d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4z"
        fill={`rgba(${primary},0.08)`}
        stroke={`rgba(${primary},0.25)`}
        strokeWidth="2"
      />
      <path
        d="M20 32c0-6.627 5.373-12 12-12s12 5.373 12 12"
        stroke={`rgba(${primary},0.4)`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M44 32l-4-4M44 32l-4 4"
        stroke={`rgba(${primary},0.4)`}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

/* ────────────────────────────────
   INCIDENT CHIP
──────────────────────────────── */

type Chip = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const chips: Chip[] = [
  { id: "consulting", label: "مشاوره", icon: <IconShieldCheck darkMode={false} /> },
  { id: "crypto-blockchain-tracing", label: "ردیابی رمزارز", icon: <IconCrypto /> },
  { id: "hidden-identity", label: " کشف هویت", icon: <IconShieldCheck darkMode={false} /> },
  { id: "post-crisis-pentest", label: "تست نفوذ", icon: <IconHack /> },
  { id: "digital-forensics", label: "کالبدشکافی دیجیتال", icon: <IconHack /> },
  { id: "ransomware-negotiation", label: "مقابله با باج‌افزار", icon: <IconExtort /> },
  { id: "threat-intelligence", label: "هوش تهدیدات", icon: <IconHack /> },
];

/* ────────────────────────────────
   FORM
──────────────────────────────── */

type CrisisReportFormValues = {
  incidentType: string;
  description: string;
  contact: string;
};

const HelperText = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <p
      className="helperText"
      style={{
        color: "#EF4444",
        fontSize: "0.82rem",
        marginTop: 7,
        fontFamily: "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",
      }}
    >
      {message}
    </p>
  );
};

/* ────────────────────────────────
   LAST INCIDENT TYPE
──────────────────────────────── */

const LAST_INCIDENT_TYPE_COOKIE = "parahoor_last_incident_type";

const VALID_INCIDENT_TYPES = [
  "پایش دارک‌وب و هوش تهدیدات",
  "تست نفوذِ پسا-بحران",
  "مقابله و مذاکره با باج‌افزارها",
  "فارنزیک و کالبدشکافی دیجیتال",
  "ردیابی رمزارز و تحلیل بلاک‌چین",
  "هویت‌سنجی پنهان",
  "مشاوره",
] as const;

const isValidIncidentType = (value: string) =>
  VALID_INCIDENT_TYPES.includes(value as (typeof VALID_INCIDENT_TYPES)[number]);

const getLastIncidentType = () => {
  if (typeof document === "undefined") {
    return "";
  }

  try {
    const prefix = `${LAST_INCIDENT_TYPE_COOKIE}=`;

    const cookie = document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(prefix));

    if (!cookie) {
      return "";
    }

    const value = cookie.substring(prefix.length);

    const decodedValue = decodeURIComponent(value);

    if (!isValidIncidentType(decodedValue)) {
      return "";
    }

    return decodedValue;
  } catch {
    return "";
  }
};

const saveLastIncidentType = (incidentType: string) => {
  if (
    typeof document === "undefined" ||
    !isValidIncidentType(incidentType)
  ) {
    return;
  }

  try {
    document.cookie =
      `${LAST_INCIDENT_TYPE_COOKIE}=${encodeURIComponent(
        incidentType
      )}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    // خطای Cookie نباید مانع ارسال گزارش شود.
  }
};

/*
 * کوکی جداگانه و یک‌بارمصرف: فقط وقتی نقطه ورودی خاصی
 * (مثل باتن «رزرو زمان مشاوره») صراحتاً بخواد یک نوع حادثه
 * مشخص را فعال کند استفاده می‌شود. اگر این کوکی موجود نباشد،
 * رفتار قبلی (خواندن از LAST_INCIDENT_TYPE_COOKIE) بدون تغییر
 * ادامه پیدا می‌کند.
 */
const FORCE_INCIDENT_TYPE_COOKIE = "parahoor_force_incident_type";

const getForceIncidentType = () => {
  if (typeof document === "undefined") {
    return "";
  }

  try {
    const prefix = `${FORCE_INCIDENT_TYPE_COOKIE}=`;

    const cookie = document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(prefix));

    if (!cookie) {
      return "";
    }

    const value = cookie.substring(prefix.length);

    const decodedValue = decodeURIComponent(value);

    if (!isValidIncidentType(decodedValue)) {
      return "";
    }

    return decodedValue;
  } catch {
    return "";
  }
};

const clearForceIncidentType = () => {
  if (typeof document === "undefined") {
    return;
  }

  try {
    document.cookie = `${FORCE_INCIDENT_TYPE_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  } catch {
    // خطای Cookie نباید مانع باز شدن مدال شود.
  }
};

/* ────────────────────────────────
   MODAL
──────────────────────────────── */

export const EmergencyModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const { darkMode } = useTheme();
  const router = useRouter();

  const [submitError, setSubmitError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [focusDesc, setFocusDesc] = useState(false);
  const [focusContact, setFocusContact] = useState(false);
const [otpOpen, setOtpOpen] = useState(false);
const [otpPhone, setOtpPhone] = useState("");
const [otpWait, setOtpWait] = useState(60);
const [pendingData, setPendingData] = useState<CrisisReportFormValues | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CrisisReportFormValues>({
    mode: "onChange",
    defaultValues: {
      incidentType: "",
      description: "",
      contact: "",
    },
  });

  const selected = watch("incidentType");
  const desc = watch("description");
  const contact = watch("contact");

  const primary = darkMode ? "#00E5FF" : "#2563EB";
  

  /* ────────────────────────────────
     LOAD LAST INCIDENT TYPE
  ───────────────────────────────── */

  useEffect(() => {
    const forcedIncidentType = getForceIncidentType();

    if (forcedIncidentType) {
      setValue("incidentType", forcedIncidentType, {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });

      clearForceIncidentType();
      return;
    }

    const savedIncidentType = getLastIncidentType();

    if (!savedIncidentType) {
      return;
    }

    setValue("incidentType", savedIncidentType, {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
  }, [setValue]);


const toPhone = (v: string) => {
  const en = v
    .replace(/[۰-۹]/g, (c) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(c)))
    .replace(/[\s-]/g, "");
  const m = en.match(/^(?:\+98|0098|98|0)?(9\d{9})$/);
  return m ? "0" + m[1] : null;
};

const submitReport = async (data: CrisisReportFormValues) => {
  const response = await fetch("/api/crisis-reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message || "ارسال گزارش ناموفق بود");
  }

  saveLastIncidentType(data.incidentType);
  router.push("/report-submitted");
};

const onSubmit = async (data: CrisisReportFormValues) => {
  setSubmitError("");

  const phone = toPhone(data.contact);
  if (!phone) {
    setSubmitError("برای تایید هویت، شماره موبایل معتبر وارد کنید");
    return;
  }

    /* Cloudflare Turnstile */
  if (!turnstileToken) {
    setSubmitError("لطفاً تیک «من ربات نیستم» را کامل کنید");
    return;
  }

  try {
    // توکن همراه شماره به همین روت می‌رود و همان‌جا verify می‌شود
    const res = await fetch("/api/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, turnstileToken }),
    });
    const result = await res.json().catch(() => null);

    // هر توکن فقط یک‌بار قابل استفاده است
    setTurnstileToken("");
    turnstileRef.current?.reset();

    if (!res.ok) throw new Error(result?.message || "ارسال کد ناموفق بود");

    setOtpPhone(phone);
    setOtpWait(Number(result?.nextResendIn) || 60);
    setPendingData({ ...data, contact: phone });
    
    setOtpOpen(true);
  } catch (error) {
    setSubmitError(
      error instanceof Error ? error.message : "خطایی رخ داد. دوباره تلاش کنید."
    );
  }
};

  /* ────────────────────────────────
     FORM STATE
  ───────────────────────────────── */

  if (otpOpen && pendingData) {
    return (
      <OtpModal
        phone={otpPhone}
        initialSeconds={otpWait}
        onClose={onClose}
        onBack={() => setOtpOpen(false)}
        onVerified={() => submitReport(pendingData)}
      />
    );
  }
  return (

    
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: darkMode
          ? "rgba(4,8,20,0.88)"
          : "rgba(15,23,42,0.32)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      onClick={(e) =>
        e.target === e.currentTarget &&
        !isSubmitting &&
        onClose()
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
        <div
          className="relative w-full overflow-hidden"
          style={{
            background: darkMode
              ? "linear-gradient(160deg, rgba(10,17,42,0.99) 0%, rgba(6,11,28,0.99) 100%)"
              : "linear-gradient(160deg, #FFFFFF 0%, #F8FAFC 100%)",

            border: darkMode
              ? "1px solid rgba(0,229,255,0.18)"
              : "1px solid rgba(37,99,235,0.16)",

            borderRadius: 20,

            boxShadow: darkMode
              ? "0 0 80px rgba(0,229,255,0.07), 0 0 160px rgba(0,229,255,0.03), 0 40px 100px rgba(0,0,0,0.7)"
              : "0 20px 70px rgba(37,99,235,0.10), 0 30px 80px rgba(15,23,42,0.12)",

            maxHeight: "calc(100vh - 32px)",
            overflowY: "auto",
          }}
        >
          {/* Top cyan / blue accent line */}
          <div
            style={{
              height: 2,
              background: darkMode
                ? "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.6) 30%, rgba(0,229,255,0.9) 50%, rgba(0,229,255,0.6) 70%, transparent 100%)"
                : "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.45) 30%, rgba(37,99,235,0.8) 50%, rgba(37,99,235,0.45) 70%, transparent 100%)",
            }}
          />

          {/* Corner accents */}
          <div
            style={{
              position: "absolute",
              top: 2,
              right: 0,
              width: 56,
              height: 56,
              borderTop: darkMode
                ? "1px solid rgba(0,229,255,0.25)"
                : "1px solid rgba(37,99,235,0.18)",
              borderRight: darkMode
                ? "1px solid rgba(0,229,255,0.25)"
                : "1px solid rgba(37,99,235,0.18)",
              borderRadius: "0 20px 0 0",
              pointerEvents: "none",
            }}
          />



          {/* ── HEADER ── */}
          <div
            className="flex items-start justify-between px-6 pt-6 pb-5"
            style={{
              borderBottom: darkMode
                ? "1px solid rgba(0,229,255,0.15)"
                : "1px solid rgba(37, 100, 235, 0.32)",
            }}
          >
            <div className="flex-1 pl-4">
              {/* Status tag */}
              <div className="flex items-center gap-2 mb-2.5">
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#EF4444",
                    display: "inline-block",
                    boxShadow:
                      "0 0 6px rgba(239,68,68,0.9)",
                    animation: "pulse-cyan 1.5s infinite",
                  }}
                />

                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.6rem",
                    color: "rgba(239,68,68,0.7)",
                    letterSpacing: "0.18em",
                  }}
                >
                  CRISIS CHANNEL // ENCRYPTED
                </span>
              </div>

              {/* Title */}
              <h2
                className="font-black"
                style={{
                  color: darkMode ? "#fff" : "#111827",
                  fontSize: "1.15rem",
                  lineHeight: 1.3,
                }}
              >
                فرم اورژانسی گزارش بحران
              </h2>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl transition-all"
              style={{
                color: darkMode ? "#334155" : "#64748B",
                background: darkMode
                  ? "rgba(255,255,255,0.04)"
                  : "#F8FAFC",
                border: darkMode
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "1px solid rgba(37,99,235,0.10)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  darkMode ? "#94A3B8" : "#2563EB";

                (e.currentTarget as HTMLElement).style.borderColor =
                  darkMode
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(37,99,235,0.22)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  darkMode ? "#334155" : "#64748B";

                (e.currentTarget as HTMLElement).style.borderColor =
                  darkMode
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(37,99,235,0.10)";
              }}
              aria-label="بستن"
            >
              <IconClose />
            </button>
          </div>



          {/* ── FORM BODY ── */}
          <div className="px-6 py-5 space-y-6">
            {/* FIELD 1 – Incident Type Chips */}
            <div>
              <label
                className="block font-semibold mb-3"
                style={{
                  color: darkMode ? "#E2E8F0" : "#1E293B",
                  fontSize: "0.83rem",
                }}
              >
                <span
                  style={{
                    color: primary,
                    fontFamily: "monospace",
                    marginLeft: 6,
                  }}
                >
                  ۱.
                </span>
                نوع خدمت را مشخص کنید
              </label>

              <input
                type="hidden"
                {...register("incidentType", {
                  required: "نوع حادثه را انتخاب کنید",
                })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {chips.map(({ id, label, icon }) => {
                  const isActive = selected === label;

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() =>
                        setValue(
                          "incidentType",
                          isActive ? "" : label,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          }
                        )
                      }
className={`w-full min-h-[48px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-medium text-[11px] leading-5 text-center transition-all ${
  id === "consulting" ? "sm:col-span-2" : ""
}`}
                      style={{
                        background: isActive
                          ? darkMode
                            ? "rgba(0,229,255,0.1)"
                            : "rgba(37,99,235,0.08)"
                          : darkMode
                            ? "rgba(105, 194, 223, 0.05)"
                            : "#f3f5f8",

                        border: isActive
                          ? darkMode
                            ? "1px solid rgba(0,229,255,0.45)"
                            : "1px solid rgba(37,99,235,0.38)"
                          : darkMode
                            ? "1px solid rgba(72, 146, 159, 0.35)"
                            : "1px solid rgba(165, 170, 182, 0.43)",

                        color: isActive
                          ? primary
                          : darkMode
                            ? "#475569"
                            : "#475569",

                        boxShadow: isActive
                          ? darkMode
                            ? "0 0 20px rgba(0,229,255,0.08), inset 0 0 20px rgba(0,229,255,0.04)"
                            : "0 4px 16px rgba(37,99,235,0.08), inset 0 0 16px rgba(37,99,235,0.025)"
                          : "none",

                        transform: isActive
                          ? "translateY(-1px)"
                          : "none",

                        fontFamily:
                          "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",
                      }}
                    >


                      <span
                        style={{
                          minWidth: 0,
                          flex: 1,
                          textAlign: "center",
                          whiteSpace: "normal",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {label}
                      </span>

                      {isActive && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: primary,
                            display: "inline-block",
                            boxShadow: darkMode
                              ? "0 0 6px rgba(0,229,255,0.8)"
                              : "0 0 6px rgba(37,99,235,0.35)",
                            marginRight: 2,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <HelperText
                message={errors.incidentType?.message}
              />
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: darkMode
                  ? "linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.32), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(37, 100, 235, 0.38), transparent)",
              }}
            />

            {/* FIELD 2 – Description */}
            <div>
              <label
                className="flex items-center gap-1.5 font-semibold mb-2.5"
                style={{
                  color: darkMode ? "#E2E8F0" : "#1E293B",
                  fontSize: "0.83rem",
                }}
              >
                <span
                  style={{
                    color: primary,
                    fontFamily: "monospace",
                  }}
                >
                  ۲.
                </span>

                شرح مختصری از مشکل

                <span
                  style={{
                    color: darkMode ? "#65696e" : "#64748B",
                    fontWeight: 400,
                    fontSize: "0.82rem",
                  }}
                >
                  (اختیاری)
                </span>
              </label>

              <div className="relative">
                <textarea
                  rows={3}
                  {...register("description", {
                    maxLength: {
                      value: 2000,
                      message:
                        "شرح مشکل نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد",
                    },
                  })}
                  onFocus={() => setFocusDesc(true)}
                  onBlur={() => setFocusDesc(false)}
                  placeholder="مثال: کیف پول تراست‌ولت من هک شده و تترها به سرقت رفته..."
                  className="w-full px-4 pt-3.5 pb-3 rounded-xl text-[13px] outline-none resize-none transition-all"
                  style={{
                    background: darkMode
                      ? "#060B19"
                      : "#FFFFFF",

                    border: focusDesc
                      ? darkMode
                        ? "1px solid rgba(0,229,255,0.4)"
                        : "1px solid rgba(37,99,235,0.4)"
                      : darkMode
                        ? "1px solid rgba(0, 229, 255, 0.19)"
                        : "1px solid rgba(37, 100, 235, 0.27)",

                    color: darkMode ? "#b8bfc8" : "#1E293B",

                    fontFamily:
                      "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",

                    lineHeight: 1.8,

                    boxShadow: focusDesc
                      ? darkMode
                        ? "0 0 0 3px rgba(0,229,255,0.06), inset 0 0 20px rgba(0,229,255,0.02)"
                        : "0 0 0 3px rgba(37,99,235,0.06), inset 0 0 20px rgba(37,99,235,0.02)"
                      : "none",

                    caretColor: primary,
                  }}
                />

                {desc.length > 0 && (
                  <span
                    className="absolute"
                    style={{
                      bottom: 10,
                      left: 12,
                      fontSize: "0.65rem",
                      fontFamily: "monospace",
                      color: darkMode
                        ? "rgba(0,229,255,0.3)"
                        : "rgba(37,99,235,0.4)",
                    }}
                  >
                    {desc.length} کاراکتر
                  </span>
                )}
              </div>

              <HelperText
                message={errors.description?.message}
              />
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: darkMode
                  ? "linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.32), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(37, 100, 235, 0.38), transparent)",
              }}
            />

            {/* FIELD 3 – Contact Info */}
            <div>
              <label
                className="flex items-center gap-1.5 font-semibold mb-2.5"
                style={{
                  color: darkMode ? "#E2E8F0" : "#1E293B",
                  fontSize: "0.83rem",
                }}
              >
                <span
                  style={{
                    color: primary,
                    fontFamily: "monospace",
                  }}
                >
                  ۳.
                </span>

                شماره تماس

                <span
                  style={{
                    color: "rgba(239,68,68,0.6)",
                    fontWeight: 400,
                    fontSize: "0.72rem",
                  }}
                >
                  (جهت تماس فوری)
                </span>
              </label>

              <div className="relative">
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  dir="ltr"
                  {...register("contact", {
                    required: "شماره تماس الزامی است",
                    setValueAs: (v: string) =>
                      String(v ?? "")
                        .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
                        .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
                        .replace(/\s|-/g, "")
                        .trim(),
                    pattern: {
                      value: /^(\+98|0098|98|0)?9\d{9}$/,
                      message: "شماره موبایل معتبر نیست",
                    },
                  })}
                  onFocus={() => setFocusContact(true)}
                  onBlur={() => setFocusContact(false)}
                  placeholder="09123456789"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: darkMode
                      ? "#060B19"
                      : "#FFFFFF",

                    border: focusContact
                      ? darkMode
                        ? "1px solid rgba(0,229,255,0.4)"
                        : "1px solid rgba(37,99,235,0.4)"
                      : contact.trim()
                        ? darkMode
                          ? "1px solid rgba(0,229,255,0.2)"
                          : "1px solid rgba(37,99,235,0.20)"
                        : darkMode
                          ? "1px solid rgba(0, 229, 255, 0.19)"
                          : "1px solid rgba(37, 100, 235, 0.27)",

                    color: darkMode ? "#E2E8F0" : "#1E293B",

                    fontFamily:
                      "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",

                    boxShadow: focusContact
                      ? darkMode
                        ? "0 0 0 3px rgba(0,229,255,0.06), inset 0 0 20px rgba(0,229,255,0.02)"
                        : "0 0 0 3px rgba(37,99,235,0.06), inset 0 0 20px rgba(37,99,235,0.02)"
                      : "none",

                    caretColor: primary,
                  }}
                />

                {/* Validation icon: تیک برای شماره معتبر، ضربدر برای نامعتبر */}
                {contact.trim() && (() => {
                  const isValidPhone = /^(\+98|0098|98|0)?9\d{9}$/.test(
                    contact
                      .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
                      .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
                      .replace(/\s|-/g, "")
                  );
                  const iconColor = isValidPhone ? primary : "#EF4444";

                  return (
                    <div
                      className="absolute flex items-center justify-center"
                      style={{
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: isValidPhone
                          ? darkMode
                            ? "rgba(0,229,255,0.12)"
                            : "rgba(37,99,235,0.10)"
                          : "rgba(239,68,68,0.12)",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={iconColor}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {isValidPhone ? (
                          <polyline points="20 6 9 17 4 12" />
                        ) : (
                          <>
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </>
                        )}
                      </svg>
                    </div>
                  );
                })()}
              </div>

              <HelperText
                message={errors.contact?.message}
              />
            </div>


          </div>

          {/* ── FOOTER / SUBMIT ── */}
          <div
            className="px-6 pb-6 mt-1"
          >
            {/* Cloudflare Turnstile captcha */}
            <div className="mb-4" style={{ minHeight: 65 }}>
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                options={{
                  theme: darkMode ? "dark" : "light",
                  size: "flexible",
                  language: "fa",
                }}
                onSuccess={(token: string) => {
                  setTurnstileToken(token);
                  setSubmitError("");
                }}
                onExpire={() => setTurnstileToken("")}
                onError={() => setTurnstileToken("")}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold transition-all"
              style={{
                /* Red remains red in both themes because this is a
                   crisis/emergency action. */
                background: !isSubmitting
                  ? "#EF4444"
                  : "rgba(239,68,68,0.15)",

                color: !isSubmitting
                  ? "#fff"
                  : "rgba(239,68,68,0.35)",

                border: !isSubmitting
                  ? "1px solid rgba(239,68,68,0.55)"
                  : "1px solid rgba(239,68,68,0.12)",

                boxShadow: !isSubmitting
                  ? darkMode
                    ? "0 0 24px rgba(239,68,68,0.3), 0 0 60px rgba(239,68,68,0.1)"
                    : "0 8px 28px rgba(239,68,68,0.16)"
                  : "none",

                fontSize: "0.98rem",

                fontFamily:
                  "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",

                cursor: isSubmitting
                  ? "not-allowed"
                  : "pointer",

                transform: "none",
              }}
              onMouseEnter={(e) => {
                if (isSubmitting) return;

                (e.currentTarget as HTMLElement).style.boxShadow =
                  darkMode
                    ? "0 0 36px rgba(239,68,68,0.45), 0 0 80px rgba(239,68,68,0.15)"
                    : "0 10px 32px rgba(239,68,68,0.22)";

                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                if (isSubmitting) return;

                (e.currentTarget as HTMLElement).style.boxShadow =
                  darkMode
                    ? "0 0 24px rgba(239,68,68,0.3), 0 0 60px rgba(239,68,68,0.1)"
                    : "0 8px 28px rgba(239,68,68,0.16)";

                (e.currentTarget as HTMLElement).style.transform =
                  "none";
              }}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="animate-spin"
                    style={{
                      width: 17,
                      height: 17,
                      border: "2px solid rgba(255,255,255,0.35)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                    }}
                  />

                  در حال ارسال گزارش...
                </>
              ) : (
                <>
                  <IconSend />
                  ثبت امن گزارش و درخواست تماس
                </>
              )}
            </button>

            {submitError && (
              <p
                className="text-center mt-3"
                style={{
                  color: "#EF4444",
                  fontSize: "0.82rem",
                }}
              >
                {submitError}
              </p>
            )}

            
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmergencyModal;

