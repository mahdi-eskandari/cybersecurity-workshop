
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "@/components/ThemeProvider";

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
  {
    id: "crypto",
    label: "سرقت کریپتو",
    icon: <IconCrypto />,
  },
  {
    id: "hack",
    label: "هک و نفوذ",
    icon: <IconHack />,
  },
  {
    id: "extort",
    label: "مزاحمت و اخاذی",
    icon: <IconExtort />,
  },
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
        fontFamily: "Vazirmatn, IRANSansX, Tahoma, Arial, sans-serif",
      }}
    >
      {message}
    </p>
  );
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

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [focusDesc, setFocusDesc] = useState(false);
  const [focusContact, setFocusContact] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const onSubmit = async (data: CrisisReportFormValues) => {
    setSubmitError("");

    try {
      const response = await fetch("/api/crisis-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "ارسال گزارش ناموفق بود"
        );
      }

      setTrackingCode(result?.trackingCode || "");
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "خطایی هنگام ثبت گزارش رخ داد. لطفاً دوباره تلاش کنید."
      );
    }
  };

  /* ────────────────────────────────
     SUCCESS STATE
  ───────────────────────────────── */

  if (submitted) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: darkMode
            ? "rgba(4,8,20,0.88)"
            : "rgba(15,23,42,0.32)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        <div
          className="relative w-full max-w-md text-center py-14 px-10 rounded-2xl overflow-hidden"
          style={{
            background: darkMode
              ? "linear-gradient(145deg, rgba(10,17,40,0.99) 0%, rgba(6,11,25,0.99) 100%)"
              : "linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)",

            border: darkMode
              ? "1px solid rgba(0,229,255,0.2)"
              : "1px solid rgba(37,99,235,0.16)",

            boxShadow: darkMode
              ? "0 0 80px rgba(0,229,255,0.08), 0 30px 80px rgba(0,0,0,0.6)"
              : "0 20px 60px rgba(37,99,235,0.10), 0 30px 70px rgba(15,23,42,0.12)",
          }}
        >
          {/* Corner accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 48,
              height: 48,
              borderTop: darkMode
                ? "1.5px solid rgba(0,229,255,0.35)"
                : "1.5px solid rgba(37,99,235,0.25)",
              borderRight: darkMode
                ? "1.5px solid rgba(0,229,255,0.35)"
                : "1.5px solid rgba(37,99,235,0.25)",
              borderRadius: "0 16px 0 0",
            }}
          />

          {/* Success icon */}
          <div
            className="mx-auto mb-6 flex items-center justify-center"
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: darkMode
                ? "rgba(0,229,255,0.08)"
                : "rgba(37,99,235,0.07)",
              border: darkMode
                ? "1px solid rgba(0,229,255,0.25)"
                : "1px solid rgba(37,99,235,0.20)",
              boxShadow: darkMode
                ? "0 0 30px rgba(0,229,255,0.12)"
                : "0 0 30px rgba(37,99,235,0.08)",
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke={primary}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>

          <span
            style={{
              fontFamily: "monospace",
              fontSize: "0.6rem",
              color: darkMode
                ? "rgba(0,229,255,0.4)"
                : "rgba(37,99,235,0.5)",
              letterSpacing: "0.2em",
            }}
            className="block mb-3"
          >
            REPORT RECEIVED
          </span>

          <h3
            className="font-bold mb-3"
            style={{
              color: darkMode ? "#fff" : "#111827",
              fontSize: "1.25rem",
            }}
          >
            گزارش شما ثبت شد
          </h3>

          <p
            style={{
              color: "#64748B",
              fontSize: "0.88rem",
              lineHeight: 1.85,
            }}
          >
            کارآگاهان ارشد پاراهور گزارش شما را دریافت کردند و در اسرع
            وقت با شما تماس خواهند گرفت.
          </p>

          {/* Tracking Code */}
          <div
            className="mt-6 px-5 py-5 rounded-xl"
            style={{
              background: darkMode
                ? "linear-gradient(135deg, rgba(0,229,255,0.055) 0%, rgba(0,229,255,0.018) 100%)"
                : "linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(37,99,235,0.025) 100%)",

              border: darkMode
                ? "1px solid rgba(0,229,255,0.16)"
                : "1px solid rgba(37,99,235,0.14)",

              boxShadow: darkMode
                ? "inset 0 1px 0 rgba(255,255,255,0.025)"
                : "inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <span
              className="block mb-3"
              style={{
                color: darkMode ? "#64748B" : "#475569",
                fontSize: "0.78rem",
                fontWeight: 500,
              }}
            >
              کد پیگیری گزارش
            </span>

            <button
              type="button"
              onClick={async () => {
                if (!trackingCode) return;

                try {
                  await navigator.clipboard.writeText(
                    trackingCode
                  );

                  setCopied(true);

                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                } catch {
                  setCopied(false);
                }
              }}
              className="group mx-auto flex items-center justify-center gap-2.5 transition-all duration-200"
              style={{
                color: primary,
                fontFamily: "monospace",
                fontSize: "1.12rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                direction: "ltr",
                unicodeBidi: "isolate",
                cursor: trackingCode ? "pointer" : "default",

                background: darkMode
                  ? "rgba(0,229,255,0.035)"
                  : "rgba(37,99,235,0.035)",

                border: darkMode
                  ? "1px solid rgba(0,229,255,0.1)"
                  : "1px solid rgba(37,99,235,0.10)",

                padding: "8px 13px",
                borderRadius: "9px",

                boxShadow: darkMode
                  ? "0 0 18px rgba(0,229,255,0.025)"
                  : "0 0 18px rgba(37,99,235,0.025)",
              }}
              title="کپی کد پیگیری"
              onMouseEnter={(e) => {
                if (!trackingCode) return;

                e.currentTarget.style.background =
                  darkMode
                    ? "rgba(0,229,255,0.08)"
                    : "rgba(37,99,235,0.08)";

                e.currentTarget.style.borderColor =
                  darkMode
                    ? "rgba(0,229,255,0.25)"
                    : "rgba(37,99,235,0.24)";

                e.currentTarget.style.boxShadow =
                  darkMode
                    ? "0 0 20px rgba(0,229,255,0.08)"
                    : "0 0 20px rgba(37,99,235,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  darkMode
                    ? "rgba(0,229,255,0.035)"
                    : "rgba(37,99,235,0.035)";

                e.currentTarget.style.borderColor =
                  darkMode
                    ? "rgba(0,229,255,0.1)"
                    : "rgba(37,99,235,0.10)";

                e.currentTarget.style.boxShadow =
                  darkMode
                    ? "0 0 18px rgba(0,229,255,0.025)"
                    : "0 0 18px rgba(37,99,235,0.025)";
              }}
            >
              <span>{trackingCode || "PENDING"}</span>

              {copied ? (
                <span
                  className="flex items-center justify-center"
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 6,
                    background: darkMode
                      ? "rgba(0,229,255,0.1)"
                      : "rgba(37,99,235,0.1)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={primary}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
              ) : (
                <span
                  className="flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 6,
                    background: darkMode
                      ? "rgba(0,229,255,0.07)"
                      : "rgba(37,99,235,0.07)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={primary}
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="8"
                      y="8"
                      width="12"
                      height="12"
                      rx="2"
                    />
                    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                    <path d="M12 12h4" />
                    <path d="M12 15h4" />
                  </svg>
                </span>
              )}
            </button>

            <p
              className="mt-3"
              style={{
                color: copied
                  ? primary
                  : darkMode
                    ? "#475569"
                    : "#64748B",
                fontSize: "0.74rem",
                lineHeight: 1.9,
                marginBottom: 0,
                transition: "color 0.2s ease",
              }}
            >
              {copied
                ? "کد پیگیری با موفقیت کپی شد."
                : "این کد را ذخیره کنید؛ برای پیگیری وضعیت گزارش خود به آن نیاز خواهید داشت."}
            </p>
          </div>

          {/* Response time */}
          <div
            className="mt-4 px-4 py-3 rounded-xl text-xs"
            style={{
              background: darkMode
                ? "rgba(0,229,255,0.04)"
                : "rgba(37,99,235,0.04)",
              border: darkMode
                ? "1px solid rgba(0,229,255,0.1)"
                : "1px solid rgba(37,99,235,0.10)",
              color: darkMode ? "#475569" : "#64748B",
            }}
          >
            میانگین زمان پاسخ: کمتر از ۲ ساعت
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-7 px-8 py-2.5 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: darkMode
                ? "rgba(255,255,255,0.04)"
                : "#F8FAFC",

              border: darkMode
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(37,99,235,0.12)",

              color: darkMode ? "#475569" : "#475569",
            }}
          >
            بستن
          </button>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────
     FORM STATE
  ───────────────────────────────── */

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="relative w-full max-w-lg overflow-hidden"
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

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 56,
              height: 56,
              borderBottom: darkMode
                ? "1px solid rgba(0,229,255,0.15)"
                : "1px solid rgba(37,99,235,0.12)",
              borderLeft: darkMode
                ? "1px solid rgba(0,229,255,0.15)"
                : "1px solid rgba(37,99,235,0.12)",
              borderRadius: "0 0 0 20px",
              pointerEvents: "none",
            }}
          />

          {/* ── HEADER ── */}
          <div
            className="flex items-start justify-between px-6 pt-6 pb-5"
            style={{
              borderBottom: darkMode
                ? "1px solid rgba(255,255,255,0.04)"
                : "1px solid rgba(37,99,235,0.07)",
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

          {/* ── TRUST MICROCOPY ── */}
          <div
            className="mx-6 mt-4 mb-1 px-4 py-3 rounded-xl flex items-start gap-3"
            style={{
              background: darkMode
                ? "rgba(0,229,255,0.04)"
                : "rgba(37,99,235,0.045)",
              border: darkMode
                ? "1px solid rgba(0,229,255,0.1)"
                : "1px solid rgba(37,99,235,0.10)",
            }}
          >
            <div className="flex-shrink-0 mt-0.5">
              <IconShieldCheck darkMode={darkMode} />
            </div>

            <p
              style={{
                color: darkMode ? "#475569" : "#475569",
                fontSize: "0.78rem",
                lineHeight: 1.75,
              }}
            >
              اطلاعات شما با بالاترین سطح رمزنگاری مستقیماً برای
              کارآگاهان ارشد پاراهور ارسال می‌شود.
            </p>
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
                نوع حادثه را مشخص کنید:
              </label>

              <input
                type="hidden"
                {...register("incidentType", {
                  required: "نوع حادثه را انتخاب کنید",
                })}
              />

              <div className="flex flex-col sm:flex-row gap-3">
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
                      className="flex-1 flex items-center justify-center gap-2 px-2 py-3 rounded-xl font-medium text-[11px] transition-all"
                      style={{
                        background: isActive
                          ? darkMode
                            ? "rgba(0,229,255,0.1)"
                            : "rgba(37,99,235,0.08)"
                          : darkMode
                            ? "rgba(255,255,255,0.03)"
                            : "#F8FAFC",

                        border: isActive
                          ? darkMode
                            ? "1px solid rgba(0,229,255,0.45)"
                            : "1px solid rgba(37,99,235,0.38)"
                          : darkMode
                            ? "1px solid rgba(255,255,255,0.07)"
                            : "1px solid rgba(37,99,235,0.10)",

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
                          "Vazirmatn, IRANSansX, Tahoma, Arial, sans-serif",
                      }}
                    >
                      <span
                        style={{
                          opacity: isActive ? 1 : 0.5,
                        }}
                      >
                        {icon}
                      </span>

                      {label}

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
                  ? "linear-gradient(90deg, transparent, rgba(0,229,255,0.08), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(37,99,235,0.08), transparent)",
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
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "1px solid rgba(37,99,235,0.14)",

                    color: darkMode ? "#b8bfc8" : "#1E293B",

                    fontFamily:
                      "Vazirmatn, IRANSansX, Tahoma, Arial, sans-serif",

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
                  ? "linear-gradient(90deg, transparent, rgba(0,229,255,0.08), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(37,99,235,0.08), transparent)",
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

                شماره تماس یا آیدی تلگرام

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
                  type="text"
                  {...register("contact", {
                    required:
                      "شماره تماس یا آیدی تلگرام الزامی است",
                    maxLength: {
                      value: 100,
                      message:
                        "اطلاعات تماس بیش از حد طولانی است",
                    },
                  })}
                  onFocus={() => setFocusContact(true)}
                  onBlur={() => setFocusContact(false)}
                  placeholder="شماره موبایل یا @ID"
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
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
                          ? "1px solid rgba(255,255,255,0.06)"
                          : "1px solid rgba(37,99,235,0.14)",

                    color: darkMode ? "#E2E8F0" : "#1E293B",

                    fontFamily:
                      "Vazirmatn, IRANSansX, Tahoma, Arial, sans-serif",

                    boxShadow: focusContact
                      ? darkMode
                        ? "0 0 0 3px rgba(0,229,255,0.06), inset 0 0 20px rgba(0,229,255,0.02)"
                        : "0 0 0 3px rgba(37,99,235,0.06), inset 0 0 20px rgba(37,99,235,0.02)"
                      : "none",

                    caretColor: primary,
                  }}
                />

                {/* Validation icon */}
                {contact.trim() && (
                  <div
                    className="absolute flex items-center justify-center"
                    style={{
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: darkMode
                        ? "rgba(0,229,255,0.12)"
                        : "rgba(37,99,235,0.10)",
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={primary}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>

              <HelperText
                message={errors.contact?.message}
              />

              <p
                style={{
                  color: darkMode ? "#65696e" : "#64748B",
                  fontSize: "0.72rem",
                  marginTop: 7,
                  lineHeight: 1.6,
                }}
              >
                اطلاعات تماس شما هرگز با اشخاص ثالث به اشتراک
                گذاشته نمی‌شود.
              </p>
            </div>

            {/* ── SECURITY NOTICE ── */}
            <div className="flex items-center justify-between pt-1">

              {/* reCAPTCHA badge */}
              <div className="flex items-center gap-1.5">
                <IconRecaptcha darkMode={darkMode} />

                <span
                  style={{
                    color: darkMode ? "#3a4454" : "#64748B",
                    fontSize: "0.70rem",
                    lineHeight: 1.5,
                  }}
                >
                  محافظت شده توسط کپچای نامرئی
                  <br />
                  <span
                    style={{
                      color: darkMode ? "#3a4454" : "#64748B",
                    }}
                  >
                    (Invisible reCAPTCHA)
                  </span>
                </span>
              </div>

              {/* End-to-end indicator */}
              <div className="flex items-center gap-1.5">
                <IconLock />

                <span
                  style={{
                    color: darkMode ? "#3a4454" : "#64748B",
                    fontSize: "0.70rem",
                  }}
                >
                  رمزگذاری سرتاسری
                </span>
              </div>
            </div>
          </div>

          {/* ── FOOTER / SUBMIT ── */}
          <div
            className="px-6 pb-6 pt-2"
            style={{
              borderTop: darkMode
                ? "1px solid rgba(255,255,255,0.04)"
                : "1px solid rgba(37,99,235,0.08)",
            }}
          >
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
                  "Vazirmatn, IRANSansX, Tahoma, Arial, sans-serif",

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

            {!submitError && (
              <p
                className="text-center mt-3"
                style={{
                  color: darkMode ? "#3a4454" : "#64748B",
                  fontSize: "0.82rem",
                }}
              >
                نوع حادثه و اطلاعات تماس الزامی است
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmergencyModal;

