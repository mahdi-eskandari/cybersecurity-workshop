"use client"

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../../components/ThemeProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import { renderHighlightedTitle } from "@/lib/highlightTitle";



type PrivacyPageClientProps = {
  h1Title: string;
};
/* ─────────────────────────────────────────
   LIGHT MODE BRAND
   ───────────────────────────────────────── */
const BRAND = "#1565C0";

/* Light-mode stroke overrides for icons that are defined outside the page
   component (they apply only when an ancestor has data-theme="light") */
const BRAND_STROKE = "[[data-theme=light]_&]:!stroke-[#1565C0]";
const GREEN_STROKE = "[[data-theme=light]_&]:!stroke-[#16A34A]";
const RED_STROKE = "[[data-theme=light]_&]:!stroke-[#F59E0B]";


/* ─── SHARED ─── */
const PulseDot = ({
  size = 7,
  color = "#00E5FF",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) => (
  <span
    className={`privacy-pulse-dot ${className}`}
    style={{
      display: "inline-block",
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      boxShadow: `0 0 8px ${color}cc`,
      flexShrink: 0
    }}
  />
);

/* ─── ICONS ─── */

const IconClose = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconMail = () => (
  <svg className={`privacy-brand-icon ${BRAND_STROKE}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconTelegram = () => (
  <svg className={`privacy-brand-icon ${BRAND_STROKE}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 4.5L2.5 12l7 2.5" />
    <path d="M9.5 14.5l2.5 5 3-8" />
    <path d="M9.5 14.5l8-8" />
  </svg>
);

const IconShieldLock = () => (
  <svg className={`privacy-brand-icon ${BRAND_STROKE}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <rect x="9" y="11" width="6" height="5" rx="1" />
    <path d="M10 11V9a2 2 0 014 0v2" />
  </svg>
);

const IconInfo = () => (
  <svg className={`privacy-brand-icon ${BRAND_STROKE}`} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="2.5" />
  </svg>
);

const VIOLET_STROKE = "[[data-theme=light]_&]:!stroke-[#7C3AED]";
const IconScale = () => (
  <svg className={`privacy-brand-icon ${VIOLET_STROKE}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="21" />
    <path d="M5 21h14" />
    <path d="M3 6l3 6c0 1.657-1.343 3-3 3s-3-1.343-3-3l3-6z" transform="translate(6,0)" />
    <path d="M3 6l3 6c0 1.657-1.343 3-3 3s-3-1.343-3-3l3-6z" transform="translate(12,0)" />
  </svg>
);

const IconNoShare = () => (
  <svg className={GREEN_STROKE} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeDasharray="4 3" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeDasharray="4 3" />
    <line x1="5" y1="5" x2="19" y2="19" stroke="#EF4444" strokeWidth="2" />
  </svg>
);

const IconServer = () => (
  <svg className={`privacy-brand-icon ${BRAND_STROKE}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="3" />
    <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="3" />
  </svg>
);

const IconChevronLeft = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconHome = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
    <path d="M9 20v-6h6v6" />
  </svg>
);

/* ─── SECTION DATA ─── */

const sections = [
  { id: "s1", num: "۱", label: "جمع‌آوری داده‌ها", icon: <IconShieldLock /> },
  { id: "s2", num: "۲", label: "مرزبندی حقوقی", icon: <IconScale /> },
  { id: "s3", num: "۳", label: "عدم اشتراک‌گذاری", icon: <IconNoShare /> },
  { id: "s4", num: "۴", label: "امنیت سایبری سایت", icon: <IconServer /> },
];

/* ─── EMERGENCY MODAL ─── */

const EmergencyModal = ({
  onClose,
  isDark,
}: {
  onClose: () => void;
  isDark: boolean;
}) => {
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 privacy-modal-backdrop"
      style={{
        background: "rgba(4,8,20,0.92)",
        backdropFilter: "blur(20px)"
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`w-full max-w-md relative overflow-hidden privacy-modal ${
          isDark
            ? ""
            : "bg-white border border-[rgba(21,101,192,0.25)] shadow-[0_30px_90px_rgba(21,101,192,0.25)]"
        }`}
        style={
          isDark
            ? {
                background: "linear-gradient(160deg,rgba(10,17,42,0.99),rgba(6,11,28,0.99))",
                border: "1px solid rgba(0,229,255,0.2)",
                borderRadius: 18,
                boxShadow: "0 0 80px rgba(0,229,255,0.06),0 40px 100px rgba(0,0,0,0.7)"
              }
            : { borderRadius: 18 }
        }
      >
        <div
          className={`privacy-modal-topbar ${
            isDark
              ? ""
              : "bg-[linear-gradient(90deg,transparent,#1565C0,transparent)]"
          }`}
          style={
            isDark
              ? {
                  height: 2,
                  background: "linear-gradient(90deg,transparent,rgba(0,229,255,0.7),transparent)"
                }
              : { height: 2 }
          }
        />

        <div className="px-6 pt-5 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`font-black text-base ${isDark ? "" : "text-[#1565C0]"}`}
              style={isDark ? { color: "#fff" } : undefined}
            >
              فرم اورژانسی گزارش بحران
            </h3>

            <button
              className={`privacy-modal-close ${isDark ? "" : "text-[#475569]"}`}
              onClick={onClose}
              style={isDark ? { color: "#475569" } : undefined}
            >
              <IconClose />
            </button>
          </div>

          {sent ? (
            <div className="py-6 text-center">
              <div
                className={`mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-full privacy-modal-success ${
                  isDark
                    ? ""
                    : "bg-[rgba(21,101,192,0.06)] border border-[rgba(21,101,192,0.25)]"
                }`}
                style={
                  isDark
                    ? {
                        background: "rgba(0,229,255,0.08)",
                        border: "1px solid rgba(0,229,255,0.2)"
                      }
                    : undefined
                }
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#00E5FF" : "#1565C0"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>

              <p
                className={`font-bold text-sm mb-2 ${isDark ? "" : "text-[#475569]"}`}
                style={isDark ? { color: "#fff" } : undefined}
              >
                گزارش ثبت شد
              </p>

              <button
                onClick={onClose}
                className={`mt-4 px-6 py-2 rounded-lg text-sm privacy-modal-secondary ${
                  isDark
                    ? ""
                    : "text-[#475569] border border-[rgba(21,101,192,0.16)]"
                }`}
                style={
                  isDark
                    ? {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#475569"
                      }
                    : undefined
                }
              >
                بستن
              </button>
            </div>
          ) : (
            <>
              <p
                className={`mb-4 text-xs ${isDark ? "" : "text-[#475569]"}`}
                style={{
                  lineHeight: 1.75,
                  ...(isDark ? { color: "#475569" } : {})
                }}
              >
                اطلاعات شما با بالاترین سطح رمزنگاری برای کارآگاهان ارشد پاراهور ارسال می‌شود.
              </p>

              <div className="space-y-3">
                <textarea
                  rows={3}
                  placeholder="شرح مختصر حادثه..."
                  className={`w-full px-4 py-3 rounded-xl text-sm outline-none resize-none ${
                    isDark
                      ? ""
                      : "bg-white text-[#1565C0] border border-[rgba(21,101,192,0.25)] shadow-[inset_0_1px_2px_rgba(21,101,192,0.025)] placeholder:text-[#64748B] placeholder:opacity-100 focus:border-[#1565C0] focus:shadow-[0_0_0_3px_rgba(21,101,192,0.10)]"
                  }`}
                  style={{
                    fontFamily: "var(--font-vazirmatn), sans-serif",
                    ...(isDark
                      ? {
                          background: "#060B19",
                          border: "1px solid rgba(0,229,255,0.1)",
                          color: "#E2E8F0"
                        }
                      : {})
                  }}
                  onFocus={
                    isDark
                      ? (e) => (e.target.style.borderColor = "rgba(0,229,255,0.35)")
                      : undefined
                  }
                  onBlur={
                    isDark
                      ? (e) => (e.target.style.borderColor = "rgba(0,229,255,0.1)")
                      : undefined
                  }
                />

                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="شماره موبایل یا @ID تلگرام"
                  className={`w-full px-4 py-3 rounded-xl text-sm outline-none ${
                    isDark
                      ? ""
                      : "bg-white text-[#1565C0] border border-[rgba(21,101,192,0.25)] shadow-[inset_0_1px_2px_rgba(21,101,192,0.025)] placeholder:text-[#64748B] placeholder:opacity-100 focus:border-[#1565C0] focus:shadow-[0_0_0_3px_rgba(21,101,192,0.10)]"
                  }`}
                  style={{
                    fontFamily: "var(--font-vazirmatn), sans-serif",
                    ...(isDark
                      ? {
                          background: "#060B19",
                          border: "1px solid rgba(0,229,255,0.1)",
                          color: "#E2E8F0"
                        }
                      : {})
                  }}
                  onFocus={
                    isDark
                      ? (e) => (e.target.style.borderColor = "rgba(0,229,255,0.35)")
                      : undefined
                  }
                  onBlur={
                    isDark
                      ? (e) => (e.target.style.borderColor = "rgba(0,229,255,0.1)")
                      : undefined
                  }
                />
              </div>

              <button
                onClick={() => contact.trim() && setSent(true)}
                className="w-full mt-4 py-3.5 rounded-xl font-bold text-sm"
                style={{
                  background: "#EF4444",
                  color: "#fff",
                  border: "1px solid rgba(239,68,68,0.5)",
                  boxShadow: "0 0 20px rgba(239,68,68,0.25)",
                  fontFamily: "var(--font-vazirmatn), sans-serif"
                }}
              >
                ثبت امن گزارش و درخواست تماس
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── APP ─── */

export default function PrivacyPageClient({
  h1Title,
}: PrivacyPageClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("s1");
  const [tocOpen, setTocOpen] = useState(false);

  const { darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || darkMode;

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  /* repeated light-mode class strings */
  const accentLight =
    "bg-[linear-gradient(180deg,#1565C0,rgba(21,101,192,0.25))] shadow-[0_0_14px_rgba(21,101,192,0.18)]";
const calloutStrongLight = "text-black";






  useEffect(() => {
    const handler = () => {
      let current = "s1";

      sections.forEach(({ id }) => {
        const el = sectionRefs.current[id];

        if (el) {
          const rect = el.getBoundingClientRect();

          if (rect.top <= 160) {
            current = id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handler, { passive: true });

    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];

    if (el) {
      const y =
        el.getBoundingClientRect().top +
        window.scrollY -
        100;

      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }

    setTocOpen(false);
  };

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  /* ─── LEGAL HELPERS ─── */

  const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p
      className={`privacy-paragraph ${isDark ? "" : "text-[#334155]"}`}
      style={{
        fontSize: "16px",
        lineHeight: 2,
        marginBottom: 18,
        fontWeight: "400",
        
        ...(isDark ? { color: "#94A3B8" } : {})
      }}
    >
      {children}
    </p>
  );

  const H2 = ({
    children,
    id
  }: {
    children: React.ReactNode;
    id?: string;
  }) => (
    <h2
      id={id}
      className={` privacy-h2 ${isDark ? "" : "text-black"}`}
      style={{
        fontSize: "40px",
        lineHeight: 1.4,
        fontWeight: "500",
        marginBottom: 14,
        marginTop: 8,
        ...(isDark ? { color: "#fff" } : {})
      }}
    >
      {children}
    </h2>
  );

  const H3 = ({ children }: { children: React.ReactNode }) => (
    <h3
      className={`font-semibold privacy-h3 ${isDark ? "" : "text-black"}`}
      style={{
        fontSize: "24px",
        lineHeight: 1.5,
        marginBottom: 10,
        marginTop: 24,
        ...(isDark ? { color: "#E2E8F0" } : {})
      }}
    >
      {children}
    </h3>
  );

  const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span
      className={`privacy-highlight ${isDark ? "" : "text-black"}`}
      style={{
        fontWeight: 600,
        ...(isDark ? { color: "#E2E8F0" } : {})
      }}
    >
      {children}
    </span>
  );

  const CyanText = ({ children }: { children: React.ReactNode }) => (
    <span
      className={`privacy-brand-text ${isDark ? "" : "text-black"}`}
      style={{
        fontWeight: 600,
        ...(isDark ? { color: "#00E5FF" } : {})
      }}
    >
      {children}
    </span>
  );

  const Divider = () => (
    <div
      className={`privacy-divider ${
        isDark
          ? ""
          : "bg-[linear-gradient(90deg,transparent,rgba(21,101,192,0.20),rgba(21,101,192,0.08),transparent)]"
      }`}
      style={{
        height: 1,
        margin: "32px 0",
        ...(isDark
          ? {
              background:
                "linear-gradient(90deg,rgba(0,229,255,0.15),rgba(0,229,255,0.04),transparent)"
            }
          : {})
      }}
    />
  );

  /* ─── CALLOUT ─── */

  const Callout = ({
    color = "cyan",
    icon,
    children
  }: {
    color?: "cyan" | "amber" | "violet" | "green";
    icon: React.ReactNode;
    children: React.ReactNode;
  }) => {
   const colors = {
  cyan:   { bg: "rgba(0,229,255,0.05)",  border: "rgba(0,229,255,0.2)",  bar: "#00E5FF" },
  amber:  { bg: "rgba(245,158,11,0.05)", border: "rgba(245,158,11,0.2)", bar: "#F59E0B" },
  violet: { bg: "rgba(167,139,250,0.06)", border: "rgba(167,139,250,0.2)", bar: "#A78BFA" },
  green:  { bg: "rgba(34,197,94,0.05)",  border: "rgba(34,197,94,0.18)", bar: "#22C55E" }
};

const lightColors = {
  cyan: {
    box: "border-[rgba(21,101,192,0.25)] bg-[linear-gradient(135deg,rgba(21,101,192,0.045),rgba(21,101,192,0.018))] shadow-[0_8px_26px_rgba(21,101,192,0.075)]",
    bar: "bg-[#1565C0] shadow-[0_0_12px_rgba(21,101,192,0.28)]",
    icon: "text-[#1565C0]"
  },
  violet: {
    box: "border-[rgba(124,58,237,0.28)] bg-[linear-gradient(135deg,rgba(124,58,237,0.06),rgba(124,58,237,0.02))] shadow-[0_8px_26px_rgba(124,58,237,0.08)]",
    bar: "bg-[#7C3AED] shadow-[0_0_12px_rgba(124,58,237,0.28)]",
    icon: "text-[#7C3AED]"
  },
  green: {
    box: "border-[rgba(22,163,74,0.28)] bg-[linear-gradient(135deg,rgba(22,163,74,0.06),rgba(22,163,74,0.02))] shadow-[0_8px_26px_rgba(22,163,74,0.08)]",
    bar: "bg-[#16A34A] shadow-[0_0_12px_rgba(22,163,74,0.28)]",
    icon: "text-[#16A34A]"
  },
  amber: {
    box: "border-[rgba(217,119,6,0.28)] bg-[linear-gradient(135deg,rgba(217,119,6,0.06),rgba(217,119,6,0.02))] shadow-[0_8px_26px_rgba(217,119,6,0.08)]",
    bar: "bg-[#D97706] shadow-[0_0_12px_rgba(217,119,6,0.28)]",
    icon: "text-[#D97706]"
  }
};

    const c = colors[color];

    return (
      <div
        className={`relative overflow-hidden rounded-xl mb-6 privacy-callout privacy-callout-${color} ${
          isDark ? "" : "border " + lightColors[color].box
        }`}
        style={
          
          isDark
            ? {
                background: c.bg,
                border: `1px solid ${c.border}`,
                padding: "18px 20px",
              }
            : { padding: "18px 20px" }
            
        }
      >
        <div
          className={`privacy-callout-bar ${isDark ? "" : lightColors[color].bar}`}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: 3,
            borderRadius: "0 6px 6px 0",
            ...(isDark ? { background: c.bar } : {})
          }}
        />

        <div className="flex items-start gap-3">
<div
  className={`flex-shrink-0 mt-0.5 privacy-callout-icon ${
    isDark ? "" : lightColors[color].icon
  }`}
  style={isDark ? { color: c.bar } : undefined}
>
  {icon}
</div>

          <div
            className={`privacy-callout-content ${isDark ? "" : "text-[#334155]"}`}
            style={{
              fontSize: "15px",
              lineHeight: 1.85,
              ...(isDark ? { color: "#94A3B8" } : {})
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>

     <div
  dir="rtl"
  className={`min-h-full privacy-page pt-[var(--header-h,60px)] min-[840px]:pt-[var(--header-h,80px)] ${
    isDark
      ? ""
      : "bg-white text-[#1565C0] selection:bg-[rgba(21,101,192,0.18)] selection:text-[#0D47A1]"
  }`}
  data-theme={isDark ? "dark" : "light"}
  style={{
    fontFamily: "var(--font-vazirmatn), sans-serif",
    ...(isDark
      ? {
          background: "#0A1128",
          color: "#E2E8F0",
        }
      : {}),
  }}
>
  {/* ─── BREADCRUMB ─── */}
  <section style={{ background: isDark ? "#070D1E" : "#F1F5FB" }}>
    <nav
      aria-label="مسیر راهنما"
      className="mx-auto w-full max-w-5xl px-4 py-2.5 sm:px-6 min-[840px]:px-12 min-[840px]:py-3"
    >
      <ol className="flex min-w-0 items-center justify-center gap-1.5 text-[11px] sm:gap-2 sm:text-xs">
        <li className="flex shrink-0 items-center">
          <Link
            href="/"
            className={`flex items-center gap-1.5 leading-none transition-colors ${
              isDark
                ? "text-[#90a4c1] hover:text-[#00E5FF]"
                : "text-[#475569] hover:text-[#1565C0]"
            }`}
          >
            <IconHome />
            خانه
          </Link>
        </li>

        <li
          aria-hidden="true"
          className={`flex shrink-0 items-center ${
            isDark ? "text-[#334155]" : "text-[#94A3B8]"
          }`}
        >
          <IconChevronLeft />
        </li>

        <li className="min-w-0">
          <span
            aria-current="page"
            className="inline-flex max-w-full items-center gap-2 rounded-md px-2 py-1 sm:px-2.5"
            style={{
              color: isDark ? "#00E5FF" : "#1565C0",
              background: isDark ? "rgba(0,229,255,0.055)" : "rgba(21,101,192,0.08)",
              border: isDark
                ? "1px solid rgba(0,229,255,0.1)"
                : "1px solid rgba(21,101,192,0.2)",
            }}
          >
            <span
              className="inline-block h-1 w-1 shrink-0 rounded-full"
              style={{ background: isDark ? "#00E5FF" : "#1565C0" }}
            />
            <span className="truncate">حریم خصوصی</span>
          </span>
        </li>
      </ol>
    </nav>
  </section>



        {modalOpen && (
          <EmergencyModal
            isDark={isDark}
            onClose={() => setModalOpen(false)}
          />
        )}

        {/* ─── HEADER ─── */}
 <motion.div
 className="pt-5"
    initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true, amount: 0.2 }}
>
        <header
          className={`relative px-6 pt-16 pb-14 md:px-12 md:pt-24 overflow-hidden privacy-header ${
            isDark
              ? ""
              : "bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_75%,rgba(21,101,192,0.025)_100%)] after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-[min(760px,90%)] after:h-px after:-translate-x-1/2 after:bg-[linear-gradient(90deg,transparent,rgba(21,101,192,0.25),transparent)]"
          }`}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
                 background: darkMode
              ? "radial-gradient(ellipse 60% 70% at 60% 40%, rgba(0, 229, 255, 0.07) 0%, transparent 70%)"
              : "",
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto">
          

<div className="flex items-start gap-4 mb-5">
  <div
    className={`flex-shrink-0 translate-y-4 flex items-center justify-center w-12 h-12  rounded-xl privacy-header-icon ${
      isDark
        ? ""
        : "bg-[rgba(21,101,192,0.055)] border border-[rgba(21,101,192,0.25)] shadow-[0_8px_25px_rgba(21,101,192,0.08)]"
    }`}
    style={
      isDark
        ? {
            background: "rgba(0,229,255,0.08)",
            border: "1px solid rgba(0,229,255,0.2)",
          }
        : undefined
    }
  >
    <IconShieldLock />
  </div>

<h1
  className="glow-text font-black leading-tight mb-6"
  style={{
    fontSize: "56px",
    color: darkMode ? "#ffffff" : "#0c1a43",
    lineHeight: "1.3",
    fontWeight: 500,
    textShadow: darkMode
      ? undefined
      : "0 0 18px rgba(30,58,138,0.10)",
    textWrap: "balance",
  } as React.CSSProperties}
>
{renderHighlightedTitle(h1Title, {
  firstLineWords: 4,
  maxWordsPerLine: 7,
  lineBreakClassName: "",
  style: { color: darkMode ? "#00E5FF" : "#1565C0" },
})}
</h1>
</div>

            <p
              className={`mb-8 max-w-2xl privacy-header-description`}
            style={{
              color: darkMode ? "#9aa0aa" : "#526075",
              fontSize: "18px",
              lineHeight: 1.7,
              maxWidth: 580,
              fontWeight: "500"
            }}
            >
              حفاظت از هویت و داده‌های حساس شما، خط قرمز تیم عملیاتی پاراهور است.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg privacy-date-badge ${
                  isDark
                    ? ""
                    : "bg-[rgba(21,101,192,0.035)] border border-[rgba(21,101,192,0.15)] shadow-[0_5px_18px_rgba(21,101,192,0.05)]"
                }`}
                style={
                  isDark
                    ? {
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)"
                      }
                    : undefined
                }
              >
                <span
                  className={isDark ? "" : "text-[#475569]"}
                  style={{
                    fontFamily: "'JetBrains Mono'",
                    fontSize: "0.82rem",
                    ...(isDark ? { color: "#86909f" } : {}),
                    fontWeight: "550"
                  }}
                >
                  آخرین به‌روزرسانی:
                </span>

                <span
                  className={isDark ? "" : "text-[#475569]"}
                  style={{
                    fontFamily: "'JetBrains Mono'",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    ...(isDark ? { color: "#86909f" } : {}),
                    
                  }}
                >
                  شهریور ۱۴۰۵
                </span>
              </div>

              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{
                  background: "rgba(34,197,94,0.06)",
                  border: "1px solid rgba(34,197,94,0.15)"
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#22C55E",
                    display: "inline-block"
                  }}
                />

                <span
                  style={{
                    fontFamily: "'JetBrains Mono'",
                    fontSize: "0.82rem",
                    color: "#22C55E",
                    fontWeight: "550"
                  }}
                >
                  نسخه ۲.۱ — معتبر
                </span>
              </div>
            </div>
          </div>
        </header>
        </motion.div>

        {/* ─── LAYOUT ─── */}


        <div className="px-6 pb-20 md:px-12">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-start">

            {/* ─── TOC ─── */}

 <motion.div
 className="lg:w-64 flex-shrink-0"
    initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true, amount: 0.2 }}
>
                <button
  className={`lg:hidden w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg mb-1 text-[13px] font-semibold privacy-toc-mobile mt-2 ${
    isDark
      ? ""
      : "bg-white text-[#1565C0] border border-[rgba(21,101,192,0.25)] shadow-[0_3px_10px_rgba(21,101,192,0.08)] transition-colors duration-200 active:bg-[rgba(21,101,192,0.06)]"
  }`}
  style={
    isDark
      ? {
          background: "rgba(0,229,255,0.07)",
          border: "1px solid rgba(0,229,255,0.18)",
          color: "#00E5FF"
        }
      : undefined
  }
  onClick={() => setTocOpen(!tocOpen)}
  aria-expanded={tocOpen}
>
  <span className="flex items-center gap-2">
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="15" y2="18" />
    </svg>
    فهرست مطالب
  </span>

  <span className="flex items-center gap-2">
    <span
      className="text-[11px] opacity-70 truncate max-w-[140px]"
    >
      {sections.find((s) => s.id === activeSection)?.label}
    </span>

    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: tocOpen ? "rotate(180deg)" : "none",
        transition: "transform 0.2s"
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
</button>

              <div className={`lg:block ${tocOpen ? "block" : "hidden"} mt-2`}>
                <div
                  className={`lg:sticky rounded-2xl overflow-hidden privacy-toc-card ${
                    isDark
                      ? ""
                      : "bg-white border border-[rgba(21,101,192,0.25)] shadow-[0_12px_34px_rgba(21,101,192,0.10)]"
                  }`}
                  style={{
                    top: 88,
                    ...(isDark
                      ? {
                          background: "rgba(6,11,28,0.9)",
                          border: "1px solid rgba(0,229,255,0.12)",
                          backdropFilter: "blur(14px)"
                        }
                      : {})
                  }}
                >
                  <div
                    className={`px-5 py-4 flex items-center gap-2.5 privacy-toc-header ${
                      isDark
                        ? ""
                        : "bg-[rgba(21,101,192,0.045)] border-b border-[rgba(21,101,192,0.25)]"
                    }`}
                    style={
                      isDark
                        ? {
                            borderBottom: "1px solid rgba(0,229,255,0.08)",
                            background: "rgba(0,229,255,0.04)"
                          }
                        : undefined
                    }
                  >
                    <svg
                      className={`privacy-brand-icon ${BRAND_STROKE}`}
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00E5FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="15" y2="18" />
                    </svg>

                    <span
            className="data-label"
              style={{
              color: darkMode ? "rgba(0, 229, 255, 0.5)" : "#1565C0CE",
            }}
                    >
                      TABLE OF CONTENTS
                    </span>
                  </div>

                  <nav className="p-3">
                    {sections.map((sec) => {
                      const isActive =
                        activeSection === sec.id;

                      return (
                        <button
                          key={sec.id}
                          onClick={() => scrollTo(sec.id)}
                          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-right transition-all duration-200 mb-1 privacy-toc-item ${isActive ? "is-active" : ""} ${
                            isDark
                              ? ""
                              : isActive
                              ? "border border-[#1565C0] bg-[linear-gradient(135deg,#1565C0,#0D47A1)] text-white shadow-[0_10px_27px_rgba(21,101,192,0.25)] hover:-translate-y-0.5 hover:shadow-[0_15px_34px_rgba(21,101,192,0.32)]"
                              : "border border-transparent text-[#475569] hover:-translate-y-0.5 hover:border-[rgba(21,101,192,0.18)] hover:bg-[rgba(21,101,192,0.055)] hover:text-[#1565C0] hover:shadow-[0_8px_22px_rgba(21,101,192,0.12)]"
                          }`}
                          style={{
                            fontFamily:
                              "var(--font-vazirmatn), sans-serif",
                            ...(isDark
                              ? {
                                  background: isActive
                                    ? "rgba(0,229,255,0.1)"
                                    : "transparent",
                                  border: isActive
                                    ? "1px solid rgba(0,229,255,0.25)"
                                    : "1px solid transparent",
                                  color: isActive
                                    ? "#00E5FF"
                                    : "#475569"
                                }
                              : {})
                          }}
                          onMouseEnter={
                            isDark
                              ? (e) => {
                                  if (!isActive) {
                                    (e.currentTarget as HTMLElement).style.color =
                                      "#94A3B8";

                                    (e.currentTarget as HTMLElement).style.background =
                                      "rgba(255,255,255,0.03)";
                                  }
                                }
                              : undefined
                          }
                          onMouseLeave={
                            isDark
                              ? (e) => {
                                  if (!isActive) {
                                    (e.currentTarget as HTMLElement).style.color =
                                      "#475569";

                                    (e.currentTarget as HTMLElement).style.background =
                                      "transparent";
                                  }
                                }
                              : undefined
                          }
                        >
                          <span
                            className={`privacy-toc-number ${
                              isDark
                                ? ""
                                : isActive
                                ? "text-white"
                                : "text-[rgba(255,255,255,0.68)]"
                            }`}
                            style={{
                              fontFamily: "monospace",
                              fontSize: "0.6rem",
                              flexShrink: 0,
                              width: 18,
                              ...(isDark
                                ? {
                                    color: isActive
                                      ? "rgba(0,229,255,0.6)"
                                      : "#1E293B"
                                  }
                                : {})
                            }}
                          >
                            {sec.num}.
                          </span>

                          <span
                            style={{
                              lineHeight: 1.4,
                              textAlign: "right"
                            }}
                          >
                            {sec.label}
                          </span>

                          {isActive && (
                            <span
                              style={{
                                marginRight: "auto",
                                flexShrink: 0
                              }}
                            >
                              <PulseDot
                                size={5}
                                className={
                                  isDark
                                    ? ""
                                    : "!bg-white !shadow-[0_0_0_2px_rgba(255,255,255,0.12),0_0_10px_rgba(255,255,255,0.65)]"
                                }
                              />
                            </span>
                          )}
                          
                        </button>
                      );
                    })}
                  </nav>

                  {/* Progress */}

                  <div
                    className={`px-5 pb-4 pt-2 privacy-progress ${
                      isDark ? "" : "border-t border-[rgba(21,101,192,0.12)]"
                    }`}
                    style={
                      isDark
                        ? { borderTop: "1px solid rgba(0,229,255,0.06)" }
                        : undefined
                    }
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`privacy-progress-label ${isDark ? "" : "text-[#475569]"}`}
                        style={{
                          fontFamily: "monospace",
                          fontSize: "0.85rem",
                          ...(isDark ? { color: "#46556d" } : {}),
                          fontWeight: "550"
                        }}
                      >
                        پیشرفت مطالعه
                      </span>

                      <span
                        className={`privacy-progress-percent ${isDark ? "" : "text-[#1565C0] font-bold"}`}
                        style={{
                          fontFamily: "monospace",
                          fontSize: "0.72rem",
                          ...(isDark ? { color: "rgba(0,229,255,0.35)" } : {}),
                          fontWeight: "550"
                        }}
                      >
                        {Math.round(
                          ((sections.findIndex(
                            (s) =>
                              s.id === activeSection
                          ) + 1) /
                            sections.length) *
                            100
                        )}
                        %
                      </span>
                    </div>

                    <div
                      className={`w-full rounded-full overflow-hidden privacy-progress-track ${
                        isDark ? "" : "bg-[rgba(21,101,192,0.10)]"
                      }`}
                      style={{
                        height: 3,
                        ...(isDark
                          ? { background: "rgba(255,255,255,0.05)" }
                          : {})
                      }}
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-300 privacy-progress-fill ${
                          isDark
                            ? ""
                            : "bg-[#1565C0] shadow-[0_0_9px_rgba(21,101,192,0.38)]"
                        }`}
                        style={{
                          width: `${((sections.findIndex(
                            (s) =>
                              s.id === activeSection
                          ) + 1) /
                            sections.length) *
                            100}%`,
                          ...(isDark
                            ? {
                                background:
                                  "linear-gradient(90deg,#00E5FF,rgba(0,229,255,0.4))"
                              }
                            : {})
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
  </motion.div>

            {/* ─── CONTENT ─── */}

            <main className="flex-1 min-w-0">

              {/* SECTION 1 */}
             <motion.div
               ref={setRef("s1")}
                id="s1"
                className="mb-2 privacy-section"
                initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
               >

                <div className="flex items-center gap-3 mb-6 mt-4">
                  <div
                    className={`privacy-section-accent ${isDark ? "" : accentLight}`}
                    style={{
                      width: 3,
                      height: 28,
                      borderRadius: 2,
                      ...(isDark
                        ? {
                            background:
                              "linear-gradient(180deg,#00E5FF,rgba(0,229,255,0.1))"
                          }
                        : {})
                    }}
                  />

                  <div>
                    <span
            className="data-label"
              style={{
              color: darkMode ? "rgba(0, 229, 255, 0.5)" : "#1565C0CE",
            }}
                    >
                      SECTION 01
                    </span>

                    <H2>
                      جمع‌آوری و نگهداری داده‌ها
                    </H2>
                  </div>
                </div>

                <Callout
                  color="cyan"
                  icon={<IconShieldLock />}
                >
                  <strong
                    className={isDark ? "" : calloutStrongLight}
                    style={isDark ? { color: "#E2E8F0" } : {color: "black"}}
                  >
                    خلاصه اجرایی:{" "}
                  </strong>
                  تمامی داده‌های ارسال‌شده رمزنگاری سرتاسری می‌شوند و پس از اتمام تحقیقات از سرورهای آنلاین پاک می‌گردند.
                </Callout>

                <Paragraph>
                  تمامی لاگ‌ها، آدرس‌های ولت و مستنداتی که از طریق فرم گزارش بحران ارسال می‌شوند، تحت{" "}
                  <Highlight>
                    رمزنگاری پیشرفته (End-to-End)
                  </Highlight>{" "}
                  قرار می‌گیرند. هیچ داده‌ای به صورت متن ساده روی سرورهای پاراهور ذخیره نمی‌شود.
                </Paragraph>

                <Paragraph>
                  داده‌های حساسِ پرونده‌های فارنزیک پس از اتمام تحقیقات، به صورت کامل از سرورهای آنلاین پاک شده و تنها در{" "}
                  <Highlight>
                    آرشیو آفلاین امن
                  </Highlight>{" "}
                  نگهداری می‌شوند. دسترسی به این آرشیو محدود به کارآگاهان ارشد مرتبط با پرونده است.
                </Paragraph>

                <H3>داده‌هایی که جمع‌آوری می‌شوند:</H3>

                <ul
                  className={`space-y-2 mb-5 privacy-list ${isDark ? "" : "text-[#334155]"}`}
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.9,
                    ...(isDark ? { color: "#64748B" } : {})
                  }}
                >
                  {[
                    "اطلاعات تماس داوطلبانه (شماره یا آیدی تلگرام)",
                    "مستندات فنی مرتبط با پرونده (لاگ، هش تراکنش، آدرس کیف پول)",
                    "شرح حادثه ارائه‌شده توسط مراجعه‌کننده",
                    "داده‌های فنی لازم برای تحلیل بلاک‌چین"
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5"
                    >
                      <svg
                        className={`privacy-brand-icon ${BRAND_STROKE}`}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00E5FF"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          flexShrink: 0,
                          marginTop: 4
                        }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <H3>داده‌هایی که جمع‌آوری نمی‌شوند:</H3>

                <ul
                  className={`space-y-2 mb-5 privacy-list ${isDark ? "" : "text-[#334155]"}`}
                  style={{
                    fontSize: "0.88rem",
                    lineHeight: 1.9,
                    ...(isDark ? { color: "#64748B" } : {})
                  }}
                >
                  {[
                    "کوکی‌های تبلیغاتی یا ردیابی رفتار کاربر",
                    "اطلاعات مالی یا بانکی مراجعین",
                    "داده‌های بیومتریک یا شناسایی هویت دیجیتال"
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5"
                    >
                      <svg
                        className={RED_STROKE}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          flexShrink: 0,
                          marginTop: 4
                        }}
                      >
                        <line
                          x1="18"
                          y1="6"
                          x2="6"
                          y2="18"
                        />
                        <line
                          x1="6"
                          y1="6"
                          x2="18"
                          y2="18"
                        />
                      </svg>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
               </motion.div>

              <Divider />

              {/* SECTION 2 */}

                <motion.div
                ref={setRef("s2")}
                id="s2"
                className="mb-2 privacy-section"
                initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
               >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`privacy-section-accent ${isDark ? "" : accentLight}`}
                    style={{
                      width: 3,
                      height: 28,
                      borderRadius: 2,
                      ...(isDark
                        ? {
                            background:
                              "linear-gradient(180deg,#A78BFA,rgba(167,139,250,0.1))"
                          }
                        : {
                          background: "linear-gradient(180deg,rgba(140,106,241,0.87),rgba(167,139,250,0.1))"
                        })
                    }}
                  />

                  <div>
                    <span
              className="data-label"
              style={{
              color: darkMode ? "rgba(167,139,250,0.5)" : "rgba(140, 106, 241, 0.87)",
            }}
                    >
                      SECTION 02
                    </span>

                    <H2>
                      مرزبندی خدمات و سلب مسئولیت حقوقی
                    </H2>
                  </div>
                </div>

                <Callout
                  color="violet"
                  icon={<IconScale />}
                >
                  <strong
  className={isDark ? "" : calloutStrongLight}
  style={isDark ? { color: "#E2E8F0" } : undefined}
>
                    نکته مهم:{" "}
                  </strong>
                  پاراهور آژانس جرم شناسی دیجیتال است، نه دفتر وکالت. گزارش‌های ما ابزار شماست، نه جایگزین وکیل.
                </Callout>

                <Paragraph>
                 پاراهور صرفاً یک {" "}
                  <CyanText>
                  «آژانس جرم شناسی دیجیتال»
                  </CyanText>{" "}
 است. ما مستقیماً خدمات نمایندگی حقوقی، وکالت در دادگاه را ارائه نمی‌دهیم.
                                  </Paragraph>

 <Paragraph>

                 پس از تکمیل گزارش فنی، پیگیری قضایی بر عهده شاکی یا وکیل قانونی وی خواهد بود. در صورت تمایل، پاراهور امکان معرفی وکیل متخصص دعاوی سایبری را نیز فراهم می‌کند.
 </Paragraph>

                <div
                  className={`p-5 rounded-xl mt-2 mb-4 privacy-warning ${
                    isDark
                      ? ""
                      : "bg-[rgba(235,156,18,0.045)] border border-[rgba(235,156,18,0.54)] shadow-[0_8px_24px_rgba(235,156,18,0.07)]"
                  }`}
                  style={
                    isDark
                      ? {
                          background:
                            "rgba(245,158,11,0.04)",
                          border:
                            "1px solid rgba(245,158,11,0.15)"
                        }
                      : undefined
                  }
                >
                  <div className="flex items-start gap-3">
                    <svg
                      className={`privacy-warning-icon ${RED_STROKE}`}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        flexShrink: 0,
                        marginTop: 2
                      }}
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      <line
                        x1="12"
                        y1="9"
                        x2="12"
                        y2="13"
                      />
                      <line
                        x1="12"
                        y1="17"
                        x2="12.01"
                        y2="17"
                      />
                    </svg>

                    <p
                      className={isDark ? "" : "text-[#475569]"}
                      style={{
                        fontSize: "15px",
                        lineHeight: 1.85,
                        ...(isDark ? { color: "#64748B" } : {})
                      }}
                    >
                      <strong
                        className={`privacy-warning-title ${isDark ? "" : "text-[#F59E0B]"}`}
                        style={{color: "#F59E0B"}}
                      >
                        سلب مسئولیت:{" "}
                      </strong>
                      اطلاعات ارائه‌شده در این وبسایت و گزارش‌های پاراهور جنبه مشاوره حقوقی ندارند. برای هرگونه اقدام قانونی الزاماً با وکیل دادگستری مجاز مشورت نمایید.
                    </p>
                  </div>
                </div>
</motion.div>

              <Divider />

              {/* SECTION 3 */}


                 <motion.div
                ref={setRef("s3")}
                id="s3"
                className="mb-2 privacy-section"
                initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.32 }}
               >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`privacy-section-accent ${isDark ? "" : accentLight}`}
                    style={{
                      width: 3,
                      height: 28,
                      borderRadius: 2,
                      ...(isDark
                        ? {
                            background:
                              "linear-gradient(180deg,#22C55E,rgba(34,197,94,0.1))"
                          }
                        : {background: "linear-gradient(180deg,#22C55E,rgba(34,197,94,0.1))"})
                    }}
                  />

                  <div>
                    <span
                     className="data-label"
                     style={{
                     color: darkMode ? "rgba(34,197,94,0.5)" : "#22C55E",
                       }}
                    >
                      SECTION 03
                    </span>

                    <H2>
                      عدم اشتراک‌گذاری اطلاعات با اشخاص ثالث
                    </H2>
                  </div>
                </div>

                <Callout
                  color="green"
                  icon={<IconNoShare />}
                >
                  <strong
                    className={isDark ? "" : calloutStrongLight}
                    style={isDark ? { color: "#E2E8F0" } : {color: "black"}}
                  >
                    تعهد پاراهور:{" "}
                  </strong>
                  اطلاعات شما هرگز فروخته، اجاره داده یا با اشخاص ثالث به اشتراک گذاشته نمی‌شود.
                </Callout>

                <Paragraph>
                  اطلاعات مراجعین به هیچ{" "}
                  <Highlight>
                    نهاد ثالث، شرکت تبلیغاتی یا سازمان تجاری
                  </Highlight>{" "}
                  فروخته یا واگذار نمی‌شود. پاراهور هیچ‌گونه شراکت تجاری‌ای که مستلزم اشتراک‌گذاری داده کاربران باشد ندارد.
                </Paragraph>

                <Paragraph>
                  ارائه اطلاعات به مراجع ذی‌صلاح قانونی تنها با{" "}
                  <Highlight>
                    حکم رسمی قضایی
                  </Highlight>{" "}
                  امکان‌پذیر است. در صورت دریافت چنین حکمی، مراجعه‌کننده مربوطه در صورت امکان قانونی از این موضوع مطلع خواهد شد.
                </Paragraph>

                <div
                  className={`rounded-xl overflow-hidden mt-4 mb-2 privacy-sharing-table ${
                    isDark
                      ? ""
                      : "bg-white border border-[rgba(21,101,192,0.25)] shadow-[0_12px_30px_rgba(21,101,192,0.08)]"
                  }`}
                  style={
                    isDark
                      ? { border: "1px solid rgba(0,229,255,0.1)" }
                      : undefined
                  }
                >
                  <div
                    className={`px-5 py-3 privacy-table-header ${
                      isDark
                        ? ""
                        : "bg-[rgba(21,101,192,0.055)] border-b border-[rgba(21,101,192,0.25)]"
                    }`}
                    style={
                      isDark
                        ? {
                            background:
                              "rgba(0,229,255,0.04)",
                            borderBottom:
                              "1px solid rgba(0,229,255,0.08)"
                          }
                        : undefined
                    }
                  >
                    <span
                      className={isDark ? "" : "text-[#1565C0]"}
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.88rem",
                        letterSpacing: "0.1em",
                        ...(isDark ? { color: "rgba(0,229,255,0.4)" } : {}),
                        fontWeight: "550"
                      }}
                    >
                      خلاصه سیاست اشتراک‌ گذاری
                    </span>
                  </div>

                  {[
                    {
                      entity: "شرکت‌های تبلیغاتی",
                      status: "هرگز",
                      color: "#EF4444"
                    },
                    {
                      entity: "سرویس‌های تحلیل وب",
                      status: "هرگز",
                      color: "#EF4444"
                    },
                    {
                      entity: "شرکای تجاری",
                      status: "هرگز",
                      color: "#EF4444"
                    },
                    {
                      entity: "مراجع قضایی (با حکم)",
                      status: "در صورت الزام قانونی",
                      color: "#F59E0B"
                    },
                    {
                      entity: "وکیل منتخب مراجعه‌کننده",
                      status: "با اجازه صریح",
                      color: "#22C55E"
                    }
                  ].map(
                    ({ entity, status, color }) => (
                      <div
                        key={entity}
                        className={`flex items-center justify-between px-5 py-3 privacy-table-row ${
                          isDark
                            ? ""
                            : "border-b border-[rgba(21,101,192,0.09)]"
                        }`}
                        style={
                          isDark
                            ? {
                                borderBottom:
                                  "1px solid rgba(255,255,255,0.04)"
                              }
                            : undefined
                        }
                      >
                        <span
                          className={`privacy-table-entity ${isDark ? "" : "text-[#334155]"}`}
                          style={{
                            fontSize: "14px",
                            ...(isDark ? { color: "#838891" } : {})
                          }}
                        >
                          {entity}
                        </span>

                        <span
                          style={{
                            color,
                            fontSize: "14px",
                            fontWeight: 600
                          }}
                        >
                          {status}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </motion.div>

              <Divider />

              {/* SECTION 4 */}


                <motion.div
                ref={setRef("s4")}
                id="s4"
                className="mb-2 privacy-section"
                initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.32 }}
               >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`privacy-section-accent ${isDark ? "" : accentLight}`}
                    style={{
                      width: 3,
                      height: 28,
                      borderRadius: 2,
                      ...(isDark
                        ? {
                            background:
                              "linear-gradient(180deg,#00E5FF,rgba(0,229,255,0.1))"
                          }
                        : {})
                    }}
                  />

                  <div>
                    <span
            className="data-label"
              style={{
              color: darkMode ? "rgba(0, 229, 255, 0.5)" : "#1565C0CE",
            }}
                    >
                      SECTION 04
                    </span>

                    <H2>
                      امنیت سایبری وبسایت
                    </H2>
                  </div>
                </div>

                <Paragraph>
                  وبسایت پاراهور از پروتکل{" "}
                  <span
                 style={darkMode
                   ? { color: "#00E5FF" }
                   : { color: "#1873dc" }}
               >
                    HTTPS/TLS 1.3
                  </span>{" "}
                  برای تمامی ارتباطات استفاده می‌کند. تمامی فرم‌های ارتباطی از طریق کانال‌های رمزنگاری‌شده به سرورهای امن ارسال می‌شوند.
                </Paragraph>
{/* 00E5FF */}
                <Paragraph>
                  این وبسایت از{" "}
                  <Highlight>
                    کوکی‌های ضروری فنی
                  </Highlight>{" "}
                  برای عملکرد صحیح استفاده می‌کند. هیچ‌گونه کوکی ردیابی رفتار یا تبلیغاتی در این وبسایت فعال نیست. استفاده از سرویس‌های تحلیل آمار وبسایت تنها به صورت ناشناس و بدون ذخیره اطلاعات شخصی انجام می‌شود.
                </Paragraph>

              </motion.div>


             
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
