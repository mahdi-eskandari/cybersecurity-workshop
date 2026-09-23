"use client"

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../../components/ThemeProvider";

type PrivacyPageClientProps = {
  h1Title: string;
};
/* ─────────────────────────────────────────
   LIGHT MODE BRAND
   ───────────────────────────────────────── */
const BRAND = "#1E3A8A";


/* ─── SHARED ─── */
const PulseDot = ({ size = 7, color = "#00E5FF" }: { size?: number; color?: string }) => (
  <span
    className="privacy-pulse-dot"
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
  <svg className="privacy-brand-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconTelegram = () => (
  <svg className="privacy-brand-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 4.5L2.5 12l7 2.5" />
    <path d="M9.5 14.5l2.5 5 3-8" />
    <path d="M9.5 14.5l8-8" />
  </svg>
);

const IconShieldLock = () => (
  <svg className="privacy-brand-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <rect x="9" y="11" width="6" height="5" rx="1" />
    <path d="M10 11V9a2 2 0 014 0v2" />
  </svg>
);

const IconInfo = () => (
  <svg className="privacy-brand-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="2.5" />
  </svg>
);

const IconScale = () => (
  <svg className="privacy-brand-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="21" />
    <path d="M5 21h14" />
    <path d="M3 6l3 6c0 1.657-1.343 3-3 3s-3-1.343-3-3l3-6z" transform="translate(6,0)" />
    <path d="M3 6l3 6c0 1.657-1.343 3-3 3s-3-1.343-3-3l3-6z" transform="translate(12,0)" />
  </svg>
);

const IconNoShare = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeDasharray="4 3" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeDasharray="4 3" />
    <line x1="5" y1="5" x2="19" y2="19" stroke="#EF4444" strokeWidth="2" />
  </svg>
);

const IconServer = () => (
  <svg className="privacy-brand-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="3" />
    <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="3" />
  </svg>
);

const IconChevronLeft = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
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

const EmergencyModal = ({ onClose }: { onClose: () => void }) => {
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
        className="w-full max-w-md relative overflow-hidden privacy-modal"
        style={{
          background: "linear-gradient(160deg,rgba(10,17,42,0.99),rgba(6,11,28,0.99))",
          border: "1px solid rgba(0,229,255,0.2)",
          borderRadius: 18,
          boxShadow: "0 0 80px rgba(0,229,255,0.06),0 40px 100px rgba(0,0,0,0.7)"
        }}
      >
        <div
          className="privacy-modal-topbar"
          style={{
            height: 2,
            background: "linear-gradient(90deg,transparent,rgba(0,229,255,0.7),transparent)"
          }}
        />

        <div className="px-6 pt-5 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-base" style={{ color: "#fff" }}>
              فرم اورژانسی گزارش بحران
            </h3>

            <button
              className="privacy-modal-close"
              onClick={onClose}
              style={{ color: "#475569" }}
            >
              <IconClose />
            </button>
          </div>

          {sent ? (
            <div className="py-6 text-center">
              <div
                className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-full privacy-modal-success"
                style={{
                  background: "rgba(0,229,255,0.08)",
                  border: "1px solid rgba(0,229,255,0.2)"
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>

              <p className="font-bold text-sm mb-2" style={{ color: "#fff" }}>
                گزارش ثبت شد
              </p>

              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 rounded-lg text-sm privacy-modal-secondary"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#475569"
                }}
              >
                بستن
              </button>
            </div>
          ) : (
            <>
              <p
                className="mb-4 text-xs"
                style={{ color: "#475569", lineHeight: 1.75 }}
              >
                اطلاعات شما با بالاترین سطح رمزنگاری برای کارآگاهان ارشد پاراهور ارسال می‌شود.
              </p>

              <div className="space-y-3">
                <textarea
                  rows={3}
                  placeholder="شرح مختصر حادثه..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{
                    background: "#060B19",
                    border: "1px solid rgba(0,229,255,0.1)",
                    color: "#E2E8F0",
                    fontFamily: "var(--font-vazirmatn), sans-serif"
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.35)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.1)")}
                />

                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="شماره موبایل یا @ID تلگرام"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{
                    background: "#060B19",
                    border: "1px solid rgba(0,229,255,0.1)",
                    color: "#E2E8F0",
                    fontFamily: "var(--font-vazirmatn), sans-serif"
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.35)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.1)")}
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
      className="privacy-paragraph"
      style={{
        color: "#94A3B8",
        fontSize: "clamp(0.88rem,1.7vw,0.97rem)",
        lineHeight: 2,
        marginBottom: 18
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
      className="font-bold privacy-h2"
      style={{
        color: "#fff",
        fontSize: "clamp(1.05rem,2.2vw,1.3rem)",
        lineHeight: 1.4,
        marginBottom: 14,
        marginTop: 8
      }}
    >
      {children}
    </h2>
  );

  const H3 = ({ children }: { children: React.ReactNode }) => (
    <h3
      className="font-semibold privacy-h3"
      style={{
        color: "#E2E8F0",
        fontSize: "clamp(0.95rem,1.9vw,1.05rem)",
        lineHeight: 1.5,
        marginBottom: 10,
        marginTop: 24
      }}
    >
      {children}
    </h3>
  );

  const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span
      className="privacy-highlight"
      style={{
        color: "#E2E8F0",
        fontWeight: 600
      }}
    >
      {children}
    </span>
  );

  const CyanText = ({ children }: { children: React.ReactNode }) => (
    <span
      className="privacy-brand-text"
      style={{
        color: "#00E5FF",
        fontWeight: 600
      }}
    >
      {children}
    </span>
  );

  const Divider = () => (
    <div
      className="privacy-divider"
      style={{
        height: 1,
        background:
          "linear-gradient(90deg,rgba(0,229,255,0.15),rgba(0,229,255,0.04),transparent)",
        margin: "32px 0"
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
      cyan: {
        bg: "rgba(0,229,255,0.05)",
        border: "rgba(0,229,255,0.2)",
        bar: "#00E5FF"
      },

      amber: {
        bg: "rgba(245,158,11,0.05)",
        border: "rgba(245,158,11,0.2)",
        bar: "#F59E0B"
      },

      violet: {
        bg: "rgba(167,139,250,0.06)",
        border: "rgba(167,139,250,0.2)",
        bar: "#A78BFA"
      },

      green: {
        bg: "rgba(34,197,94,0.05)",
        border: "rgba(34,197,94,0.18)",
        bar: "#22C55E"
      }
    };

    const c = colors[color];

    return (
      <div
        className={`relative overflow-hidden rounded-xl mb-6 privacy-callout privacy-callout-${color}`}
        style={{
          background: c.bg,
          border: `1px solid ${c.border}`,
          padding: "18px 20px"
        }}
      >
        <div
          className="privacy-callout-bar"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: 3,
            background: c.bar,
            borderRadius: "0 6px 6px 0"
          }}
        />

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5 privacy-callout-icon">
            {icon}
          </div>

          <div
            className="privacy-callout-content"
            style={{
              color: "#94A3B8",
              fontSize: "0.85rem",
              lineHeight: 1.85
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
        className="min-h-full privacy-page"
        data-theme={isDark ? "dark" : "light"}
        style={{
          background: "#0A1128",
          color: "#E2E8F0",
          fontFamily: "var(--font-vazirmatn), sans-serif",
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.025) 1px,transparent 1px)",
          backgroundSize: "52px 52px"
        }}
      >
        {modalOpen && (
          <EmergencyModal
            onClose={() => setModalOpen(false)}
          />
        )}

        {/* ─── HEADER ─── */}

        <header className="relative px-6 pt-16 pb-14 md:px-12 md:pt-24 overflow-hidden privacy-header">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,229,255,0.05) 0%, transparent 70%)"
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <a
                href="#"
                className="privacy-breadcrumb"
                style={{
                  color: "#334155",
                  fontSize: "0.75rem"
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#00E5FF")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "#334155")
                }
              >
                خانه
              </a>

              <IconChevronLeft />

              <span
                className="privacy-breadcrumb-current"
                style={{
                  color: "#00E5FF",
                  fontSize: "0.75rem"
                }}
              >
                حریم خصوصی
              </span>
            </div>

<div className="flex items-start gap-4 mb-5">
  <div
    className="flex-shrink-0 translate-y-4 flex items-center justify-center w-12 h-12  rounded-xl privacy-header-icon"
    style={{
      background: "rgba(0,229,255,0.08)",
      border: "1px solid rgba(0,229,255,0.2)",
    }}
  >
    <IconShieldLock />
  </div>

  <div className="pl-80">
    <h1
      className="glow-text font-black leading-tight mb-0"
      style={{
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        color: darkMode ? "#e8f4f8" : "#0c1a43",
        lineHeight: "1.3",
        fontWeight: 900,
        textShadow: darkMode
          ? undefined
          : "0 0 18px rgba(30,58,138,0.10)",
      }}
    >
      {h1Title}
    </h1>
  </div>
</div>

            <p
              className="mb-5 max-w-2xl privacy-header-description"
              style={{
                color: "#64748B",
                fontSize: "clamp(0.9rem,1.8vw,1rem)",
                lineHeight: 1.85
              }}
            >
              حفاظت از هویت و داده‌های حساس شما، خط قرمز تیم عملیاتی پاراهور است.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg privacy-date-badge"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)"
                }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.68rem",
                    color: "#334155"
                  }}
                >
                  آخرین به‌روزرسانی:
                </span>

                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.68rem",
                    color: "#475569",
                    fontWeight: 600
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
                    fontFamily: "monospace",
                    fontSize: "0.68rem",
                    color: "#22C55E"
                  }}
                >
                  نسخه ۲.۱ — معتبر
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* ─── LAYOUT ─── */}

        <div className="px-6 pb-20 md:px-12">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-start">

            {/* ─── TOC ─── */}

            <aside className="lg:w-64 flex-shrink-0">
              <button
                className="lg:hidden w-full flex items-center justify-between px-4 py-3 rounded-xl mb-2 text-sm font-semibold privacy-toc-mobile"
                style={{
                  background: "rgba(0,229,255,0.07)",
                  border: "1px solid rgba(0,229,255,0.18)",
                  color: "#00E5FF"
                }}
                onClick={() => setTocOpen(!tocOpen)}
              >
                فهرست مطالب

                <svg
                  width="14"
                  height="14"
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
              </button>

              <div className={`lg:block ${tocOpen ? "block" : "hidden"}`}>
                <div
                  className="lg:sticky rounded-2xl overflow-hidden privacy-toc-card"
                  style={{
                    top: 88,
                    background: "rgba(6,11,28,0.9)",
                    border: "1px solid rgba(0,229,255,0.12)",
                    backdropFilter: "blur(14px)"
                  }}
                >
                  <div
                    className="px-5 py-4 flex items-center gap-2.5 privacy-toc-header"
                    style={{
                      borderBottom: "1px solid rgba(0,229,255,0.08)",
                      background: "rgba(0,229,255,0.04)"
                    }}
                  >
                    <svg
                      className="privacy-brand-icon"
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
                      className="privacy-toc-label"
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.62rem",
                        color: "rgba(0,229,255,0.5)",
                        letterSpacing: "0.14em"
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
                          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-right transition-all duration-200 mb-1 privacy-toc-item ${isActive ? "is-active" : ""}`}
                          style={{
                            background: isActive
                              ? "rgba(0,229,255,0.1)"
                              : "transparent",
                            border: isActive
                              ? "1px solid rgba(0,229,255,0.25)"
                              : "1px solid transparent",
                            color: isActive
                              ? "#00E5FF"
                              : "#475569",
                            fontFamily:
                              "var(--font-vazirmatn), sans-serif"
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              (e.currentTarget as HTMLElement).style.color =
                                "#94A3B8";

                              (e.currentTarget as HTMLElement).style.background =
                                "rgba(255,255,255,0.03)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              (e.currentTarget as HTMLElement).style.color =
                                "#475569";

                              (e.currentTarget as HTMLElement).style.background =
                                "transparent";
                            }
                          }}
                        >
                          <span
                            className="privacy-toc-number"
                            style={{
                              fontFamily: "monospace",
                              fontSize: "0.6rem",
                              color: isActive
                                ? "rgba(0,229,255,0.6)"
                                : "#1E293B",
                              flexShrink: 0,
                              width: 18
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
                              <PulseDot size={5} />
                            </span>
                          )}
                          
                        </button>
                      );
                    })}
                  </nav>

                  {/* Progress */}

                  <div
                    className="px-5 pb-4 pt-2 privacy-progress"
                    style={{
                      borderTop:
                        "1px solid rgba(0,229,255,0.06)"
                    }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="privacy-progress-label"
                        style={{
                          fontFamily: "monospace",
                          fontSize: "0.58rem",
                          color: "#1E293B"
                        }}
                      >
                        پیشرفت مطالعه
                      </span>

                      <span
                        className="privacy-progress-percent"
                        style={{
                          fontFamily: "monospace",
                          fontSize: "0.58rem",
                          color: "rgba(0,229,255,0.35)"
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
                      className="w-full rounded-full overflow-hidden privacy-progress-track"
                      style={{
                        height: 3,
                        background:
                          "rgba(255,255,255,0.05)"
                      }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-300 privacy-progress-fill"
                        style={{
                          width: `${((sections.findIndex(
                            (s) =>
                              s.id === activeSection
                          ) + 1) /
                            sections.length) *
                            100}%`,
                          background:
                            "linear-gradient(90deg,#00E5FF,rgba(0,229,255,0.4))"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* ─── CONTENT ─── */}

            <main className="flex-1 min-w-0">

              {/* SECTION 1 */}

              <section
                ref={setRef("s1")}
                id="s1"
                className="mb-2 privacy-section"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="privacy-section-accent"
                    style={{
                      width: 3,
                      height: 28,
                      background:
                        "linear-gradient(180deg,#00E5FF,rgba(0,229,255,0.1))",
                      borderRadius: 2
                    }}
                  />

                  <div>
                    <span
                      className="privacy-section-label"
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.6rem",
                        color: "rgba(0,229,255,0.4)",
                        letterSpacing: "0.15em",
                        display: "block",
                        marginBottom: 3
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
                  <strong style={{ color: "#E2E8F0" }}>
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
                  className="space-y-2 mb-5 privacy-list"
                  style={{
                    color: "#64748B",
                    fontSize: "0.88rem",
                    lineHeight: 1.9
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
                        className="privacy-brand-icon"
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
                  className="space-y-2 mb-5 privacy-list"
                  style={{
                    color: "#64748B",
                    fontSize: "0.88rem",
                    lineHeight: 1.9
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
              </section>

              <Divider />

              {/* SECTION 2 */}

              <section
                ref={setRef("s2")}
                id="s2"
                className="mb-2 privacy-section"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="privacy-section-accent"
                    style={{
                      width: 3,
                      height: 28,
                      background:
                        "linear-gradient(180deg,#A78BFA,rgba(167,139,250,0.1))",
                      borderRadius: 2
                    }}
                  />

                  <div>
                    <span
                      className="privacy-section-label"
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.6rem",
                        color: "rgba(167,139,250,0.5)",
                        letterSpacing: "0.15em",
                        display: "block",
                        marginBottom: 3
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
                  <strong style={{ color: "#E2E8F0" }}>
                    نکته مهم:{" "}
                  </strong>
                  پاراهور آژانس تحقیقات فنی است، نه دفتر وکالت. گزارش‌های ما ابزار شماست، نه جایگزین وکیل.
                </Callout>

                <Paragraph>
                  آژانس پاراهور با بهره‌گیری از مشاوره مستمر وکلای پایه یک دادگستری از جمله جناب آقای{" "}
                  <CyanText>
                    علیرضا طباطبایی
                  </CyanText>{" "}
                  فعالیت می‌کند تا اطمینان حاصل شود تمامی ادله دیجیتالِ استخراج‌شده، دارای بالاترین اعتبار و{" "}
                  <Highlight>
                    استنادپذیری در محاکم قضایی
                  </Highlight>{" "}
                  هستند.
                </Paragraph>

                <Paragraph>
                  با این وجود، پاراهور صرفاً یک{" "}
                  <Highlight>
                    «آژانس تحقیقات خصوصی و کشف ادله فنی»
                  </Highlight>{" "}
                  است. ما مستقیماً خدمات نمایندگی حقوقی، وکالت در دادگاه یا برگزاری کمپین‌های اقدام قضایی دسته‌جمعی را ارائه نمی‌دهیم.
                </Paragraph>

                <Paragraph>
                  پس از تکمیل گزارش فنی،{" "}
                  <Highlight>
                    پیگیری قضایی بر عهده شخص شاکی یا وکیل قانونی وی
                  </Highlight>{" "}
                  خواهد بود. پاراهور در این مرحله می‌تواند به عنوان کارشناس فنی در دادگاه حاضر شود یا توضیحات تکمیلی ارائه دهد.
                </Paragraph>

                <div
                  className="p-5 rounded-xl mt-2 mb-4 privacy-warning"
                  style={{
                    background:
                      "rgba(245,158,11,0.04)",
                    border:
                      "1px solid rgba(245,158,11,0.15)"
                  }}
                >
                  <div className="flex items-start gap-3">
                    <svg
                      className="privacy-warning-icon"
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
                      style={{
                        color: "#64748B",
                        fontSize: "0.83rem",
                        lineHeight: 1.85
                      }}
                    >
                      <strong
                        className="privacy-warning-title"
                        style={{ color: "#F59E0B" }}
                      >
                        سلب مسئولیت:{" "}
                      </strong>
                      اطلاعات ارائه‌شده در این وبسایت و گزارش‌های پاراهور جنبه مشاوره حقوقی ندارند. برای هرگونه اقدام قانونی الزاماً با وکیل دادگستری مجاز مشورت نمایید.
                    </p>
                  </div>
                </div>
              </section>

              <Divider />

              {/* SECTION 3 */}

              <section
                ref={setRef("s3")}
                id="s3"
                className="mb-2 privacy-section"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="privacy-section-accent"
                    style={{
                      width: 3,
                      height: 28,
                      background:
                        "linear-gradient(180deg,#22C55E,rgba(34,197,94,0.1))",
                      borderRadius: 2
                    }}
                  />

                  <div>
                    <span
                      className="privacy-section-label"
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.6rem",
                        color: "rgba(34,197,94,0.5)",
                        letterSpacing: "0.15em",
                        display: "block",
                        marginBottom: 3
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
                  <strong style={{ color: "#E2E8F0" }}>
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
                  className="rounded-xl overflow-hidden mt-4 mb-2 privacy-sharing-table"
                  style={{
                    border:
                      "1px solid rgba(0,229,255,0.1)"
                  }}
                >
                  <div
                    className="px-5 py-3 privacy-table-header"
                    style={{
                      background:
                        "rgba(0,229,255,0.04)",
                      borderBottom:
                        "1px solid rgba(0,229,255,0.08)"
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.62rem",
                        color: "rgba(0,229,255,0.4)",
                        letterSpacing: "0.12em"
                      }}
                    >
                      خلاصه سیاست اشتراک‌گذاری
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
                        className="flex items-center justify-between px-5 py-3 privacy-table-row"
                        style={{
                          borderBottom:
                            "1px solid rgba(255,255,255,0.04)"
                        }}
                      >
                        <span
                          className="privacy-table-entity"
                          style={{
                            color: "#475569",
                            fontSize: "0.82rem"
                          }}
                        >
                          {entity}
                        </span>

                        <span
                          style={{
                            color,
                            fontSize: "0.75rem",
                            fontWeight: 600
                          }}
                        >
                          {status}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </section>

              <Divider />

              {/* SECTION 4 */}

              <section
                ref={setRef("s4")}
                id="s4"
                className="mb-2 privacy-section"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="privacy-section-accent"
                    style={{
                      width: 3,
                      height: 28,
                      background:
                        "linear-gradient(180deg,#00E5FF,rgba(0,229,255,0.1))",
                      borderRadius: 2
                    }}
                  />

                  <div>
                    <span
                      className="privacy-section-label"
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.6rem",
                        color: "rgba(0,229,255,0.4)",
                        letterSpacing: "0.15em",
                        display: "block",
                        marginBottom: 3
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
                  <CyanText>
                    HTTPS/TLS 1.3
                  </CyanText>{" "}
                  برای تمامی ارتباطات استفاده می‌کند. تمامی فرم‌های ارتباطی از طریق کانال‌های رمزنگاری‌شده به سرورهای امن ارسال می‌شوند.
                </Paragraph>

                <Paragraph>
                  این وبسایت از{" "}
                  <Highlight>
                    کوکی‌های ضروری فنی
                  </Highlight>{" "}
                  برای عملکرد صحیح استفاده می‌کند. هیچ‌گونه کوکی ردیابی رفتار یا تبلیغاتی در این وبسایت فعال نیست. استفاده از سرویس‌های تحلیل آمار وبسایت تنها به صورت ناشناس و بدون ذخیره اطلاعات شخصی انجام می‌شود.
                </Paragraph>

                <Callout
                  color="cyan"
                  icon={<IconInfo />}
                >
                  در صورت مشاهده هرگونه رفتار مشکوک یا آسیب‌پذیری امنیتی در این وبسایت، لطفاً از طریق ایمیل{" "}
                  <span
                    className="privacy-brand-text"
                    style={{
                      color: "#00E5FF",
                      fontFamily: "monospace"
                    }}
                  >
                    security@parahoor.io
                  </span>{" "}
                  گزارش دهید.
                </Callout>
              </section>

              <Divider />

              {/* ─── CONTACT ─── */}

              <section
                className="relative overflow-hidden rounded-2xl p-8 privacy-contact-card"
                style={{
                  background: "rgba(6,11,28,0.8)",
                  border:
                    "1px solid rgba(0,229,255,0.18)",
                  boxShadow:
                    "0 0 50px rgba(0,229,255,0.05), inset 0 0 30px rgba(0,229,255,0.02)",
                  backdropFilter: "blur(10px)"
                }}
              >
                <div
                  className="privacy-contact-corner privacy-contact-corner-top"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 40,
                    height: 40,
                    borderTop:
                      "1.5px solid rgba(0,229,255,0.3)",
                    borderRight:
                      "1.5px solid rgba(0,229,255,0.3)",
                    borderRadius: "0 14px 0 0",
                    pointerEvents: "none"
                  }}
                />

                <div
                  className="privacy-contact-corner privacy-contact-corner-bottom"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: 40,
                    height: 40,
                    borderBottom:
                      "1.5px solid rgba(0,229,255,0.3)",
                    borderLeft:
                      "1.5px solid rgba(0,229,255,0.3)",
                    borderRadius: "0 0 0 14px",
                    pointerEvents: "none"
                  }}
                />

                <span
                  className="block mb-4 privacy-contact-label"
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.6rem",
                    color: "rgba(0,229,255,0.4)",
                    letterSpacing: "0.18em"
                  }}
                >
                  LEGAL DEPARTMENT // PRIVACY CONTACT
                </span>

                <h3
                  className="font-bold mb-3 privacy-contact-title"
                  style={{
                    color: "#fff",
                    fontSize:
                      "clamp(0.98rem,2.2vw,1.2rem)",
                    lineHeight: 1.45
                  }}
                >
                  سوال درباره امنیت داده‌های خود دارید؟
                </h3>

                <p
                  className="mb-6 privacy-contact-description"
                  style={{
                    color: "#475569",
                    fontSize: "0.85rem",
                    lineHeight: 1.85
                  }}
                >
                  در صورت داشتن هرگونه سوال در خصوص امنیت داده‌های خود، با دپارتمان حقوقی پاراهور در تماس باشید.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
<button
  className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all privacy-contact-button"
  style={{
    background: "transparent",
    border: "1px solid rgba(0,229,255,0.4)",
    color: "#00E5FF",
    boxShadow:
      "0 0 16px rgba(0,229,255,0.06), inset 0 0 16px rgba(0,229,255,0.03)",
    fontFamily: "var(--font-vazirmatn), sans-serif"
  }}
  onMouseEnter={(e) => {
    (e.currentTarget as HTMLElement).style.background =
      "rgba(0,229,255,0.09)";

    (e.currentTarget as HTMLElement).style.boxShadow =
      "0 0 28px rgba(0,229,255,0.18)";
  }}
  onMouseLeave={(e) => {
    (e.currentTarget as HTMLElement).style.background =
      "transparent";

    (e.currentTarget as HTMLElement).style.boxShadow =
      "0 0 16px rgba(0,229,255,0.06)";
  }}
>
  <svg
    className="privacy-brand-icon"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>

  تماس با دپارتمان حقوقی
</button>

                  <div
                    className="flex items-center gap-2.5 text-xs privacy-contact-email"
                    style={{ color: "#334155" }}
                  >
                    <svg
                      className="privacy-brand-icon"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(0,229,255,0.4)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>

                    <span>
                      legal@parahoor.io
                    </span>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      {/* ============================================================
          LIGHT MODE — COMPLETE OVERRIDE
          ============================================================ */}

      <style jsx global>{`

        /* ============================================================
           CORE
           ============================================================ */

        [data-theme="light"].privacy-page {
          --p-primary: #1E3A8A;
          --p-primary-dark: #172F70;
          --p-primary-deep: #12265A;

          --p-text: #1E3A8A;
          --p-text-strong: #12265A;
          --p-text-body: #334155;
          --p-text-muted: #475569;

          --p-border: rgba(30,58,138,.18);
          --p-border-strong: rgba(30,58,138,.30);

          --p-surface: #ffffff;
          --p-surface-soft: rgba(30,58,138,.035);
          --p-surface-hover: rgba(30,58,138,.065);

          background-color: #ffffff !important;
          color: var(--p-text) !important;

          background-image:
            linear-gradient(
              rgba(30,58,138,.028) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(30,58,138,.028) 1px,
              transparent 1px
            ) !important;

          background-size: 52px 52px !important;
        }


        /* ============================================================
           HEADER
           White Light Mode — NO cyan.
           ============================================================ */

        [data-theme="light"].privacy-page .privacy-header {
          background:
            linear-gradient(
              180deg,
              #ffffff 0%,
              #ffffff 75%,
              rgba(30,58,138,.025) 100%
            ) !important;
        }

        [data-theme="light"].privacy-page .privacy-header::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0;
          width: min(760px,90%);
          height: 1px;
          transform: translateX(-50%);
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(30,58,138,.25),
              transparent
            );
        }

        [data-theme="light"].privacy-page .privacy-main-title {
          color: var(--p-primary) !important;
          text-shadow:
            0 8px 30px rgba(30,58,138,.10) !important;
        }

        [data-theme="light"].privacy-page .privacy-header-description {
          color: #475569 !important;
        }

        [data-theme="light"].privacy-page .privacy-header-icon {
          background:
            rgba(30,58,138,.055) !important;

          border:
            1px solid rgba(30,58,138,.24) !important;

          box-shadow:
            0 8px 25px rgba(30,58,138,.08) !important;
        }


        /* ============================================================
           TEXT
           ============================================================ */

        [data-theme="light"].privacy-page .privacy-paragraph,
        [data-theme="light"].privacy-page .privacy-list,
        [data-theme="light"].privacy-page .privacy-list span {
          color: #334155 !important;
        }

        [data-theme="light"].privacy-page .privacy-h2,
        [data-theme="light"].privacy-page .privacy-h3 {
          color: var(--p-primary) !important;
        }

        [data-theme="light"].privacy-page .privacy-highlight {
          color: #172F70 !important;
        }

        [data-theme="light"].privacy-page .privacy-brand-text {
          color: var(--p-primary) !important;
        }

        [data-theme="light"].privacy-page strong,
        [data-theme="light"].privacy-page b {
          color: #172F70 !important;
        }


        /* ============================================================
           SECTION ACCENTS
           ============================================================ */

        [data-theme="light"].privacy-page .privacy-section-accent {
          background:
            linear-gradient(
              180deg,
              #1E3A8A,
              rgba(30,58,138,.25)
            ) !important;

          box-shadow:
            0 0 14px rgba(30,58,138,.18);
        }

        [data-theme="light"].privacy-page .privacy-section-label {
          color:
            rgba(30,58,138,.60) !important;
        }


        /* ============================================================
           DIVIDER
           ============================================================ */

        [data-theme="light"].privacy-page .privacy-divider {
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(30,58,138,.20),
              rgba(30,58,138,.08),
              transparent
            ) !important;
        }


        /* ============================================================
           CALLOUTS
           ALL CYAN/VIOLET CALLOUTS = BRAND BLUE
           ============================================================ */

        [data-theme="light"].privacy-page .privacy-callout {
          background:
            linear-gradient(
              135deg,
              rgba(30,58,138,.045),
              rgba(30,58,138,.018)
            ) !important;

          border:
            1px solid rgba(30,58,138,.25) !important;

          box-shadow:
            0 8px 26px rgba(30,58,138,.075) !important;

          transition:
            transform .22s ease,
            box-shadow .22s ease,
            border-color .22s ease !important;
        }

        [data-theme="light"].privacy-page .privacy-callout:hover {
          transform: translateY(-3px) !important;

          border-color:
            rgba(30,58,138,.42) !important;

          box-shadow:
            0 17px 38px rgba(30,58,138,.16) !important;
        }

        [data-theme="light"].privacy-page .privacy-callout-bar {
          background:
            #1E3A8A !important;

          box-shadow:
            0 0 12px rgba(30,58,138,.28);
        }

        [data-theme="light"].privacy-page .privacy-callout-content {
          color: #334155 !important;
        }

        [data-theme="light"].privacy-page .privacy-callout strong {
          color: #12265A !important;
        }

        [data-theme="light"].privacy-page .privacy-brand-icon {
          stroke: #1E3A8A !important;
        }


        /* ============================================================
           ICONS
           ============================================================ */

        [data-theme="light"].privacy-page .privacy-callout-icon svg {
          stroke: #1E3A8A !important;
        }

        [data-theme="light"].privacy-page .privacy-pulse-dot {
          background: #1E3A8A !important;

          box-shadow:
            0 0 0 4px rgba(30,58,138,.07),
            0 0 16px rgba(30,58,138,.30) !important;
        }


        /* ============================================================
           WARNING
           ORANGE -> RED
           ============================================================ */

        [data-theme="light"].privacy-page .privacy-warning {
          background:
            rgba(239,68,68,.045) !important;

          border:
            1px solid rgba(239,68,68,.27) !important;

          box-shadow:
            0 8px 24px rgba(239,68,68,.07) !important;
        }

        [data-theme="light"].privacy-page .privacy-warning p {
          color: #475569 !important;
        }

        [data-theme="light"].privacy-page .privacy-warning-title {
          color: #DC2626 !important;
        }

        [data-theme="light"].privacy-page .privacy-warning-icon {
          stroke: #DC2626 !important;
        }


        /* ============================================================
           TOC
           ============================================================ */

        [data-theme="light"].privacy-page .privacy-toc-card {
          background: #ffffff !important;

          border:
            1px solid rgba(30,58,138,.20) !important;

          box-shadow:
            0 12px 34px rgba(30,58,138,.10) !important;

          backdrop-filter: none !important;
        }

        [data-theme="light"].privacy-page .privacy-toc-header {
          background:
            rgba(30,58,138,.045) !important;

          border-bottom:
            1px solid rgba(30,58,138,.14) !important;
        }

        [data-theme="light"].privacy-page .privacy-toc-label {
          color:
            rgba(30,58,138,.62) !important;
        }

        [data-theme="light"].privacy-page .privacy-toc-item {
          color: #475569 !important;

          transition:
            transform .2s ease,
            background .2s ease,
            color .2s ease,
            box-shadow .2s ease !important;
        }

        [data-theme="light"].privacy-page .privacy-toc-item:not(.is-active):hover {
          background:
            rgba(30,58,138,.055) !important;

          color:
            #1E3A8A !important;

          transform:
            translateY(-2px) !important;

          box-shadow:
            0 8px 22px rgba(30,58,138,.12) !important;

          border-color:
            rgba(30,58,138,.18) !important;
        }

        [data-theme="light"].privacy-page .privacy-toc-item.is-active {
          background:
            linear-gradient(
              135deg,
              #1E3A8A,
              #172F70
            ) !important;

          color: #ffffff !important;

          border:
            1px solid #1E3A8A !important;

          box-shadow:
            0 10px 27px rgba(30,58,138,.25) !important;
        }

        [data-theme="light"].privacy-page .privacy-toc-item.is-active:hover {
          transform:
            translateY(-2px) !important;

          box-shadow:
            0 15px 34px rgba(30,58,138,.32) !important;
        }

        [data-theme="light"].privacy-page .privacy-toc-item.is-active span {
          color: #ffffff !important;
        }

        [data-theme="light"].privacy-page .privacy-toc-number {
          color:
            rgba(255,255,255,.68) !important;
        }

        [data-theme="light"].privacy-page .privacy-toc-mobile {
          background:
            #ffffff !important;

          color:
            #1E3A8A !important;

          border:
            1px solid rgba(30,58,138,.25) !important;

          box-shadow:
            0 8px 24px rgba(30,58,138,.09) !important;
        }

        [data-theme="light"].privacy-page .privacy-toc-mobile:hover {
          background:
            #1E3A8A !important;

          color:
            #ffffff !important;

          box-shadow:
            0 13px 30px rgba(30,58,138,.25) !important;
        }


        /* ============================================================
           READING PROGRESS
           ============================================================ */

        [data-theme="light"].privacy-page .privacy-progress {
          border-top:
            1px solid rgba(30,58,138,.12) !important;
        }

        [data-theme="light"].privacy-page .privacy-progress-label {
          color:
            #475569 !important;
        }

        [data-theme="light"].privacy-page .privacy-progress-percent {
          color:
            #1E3A8A !important;
          font-weight: 700 !important;
        }

        [data-theme="light"].privacy-page .privacy-progress-track {
          background:
            rgba(30,58,138,.10) !important;
        }

        [data-theme="light"].privacy-page .privacy-progress-fill {
          background:
            linear-gradient(
              90deg,
              #1E3A8A,
              #1E3A8A
            ) !important;

          box-shadow:
            0 0 9px rgba(30,58,138,.38) !important;
        }


        /* ============================================================
           TABLE
           ============================================================ */

        [data-theme="light"].privacy-page .privacy-sharing-table {
          background: #ffffff !important;

          border:
            1px solid rgba(30,58,138,.20) !important;

          box-shadow:
            0 12px 30px rgba(30,58,138,.08) !important;

          transition:
            box-shadow .22s ease,
            transform .22s ease !important;
        }

        [data-theme="light"].privacy-page .privacy-sharing-table:hover {
          transform:
            translateY(-2px) !important;

          box-shadow:
            0 18px 38px rgba(30,58,138,.14) !important;
        }

        [data-theme="light"].privacy-page .privacy-table-header {
          background:
            rgba(30,58,138,.055) !important;

          border-bottom:
            1px solid rgba(30,58,138,.14) !important;
        }

        [data-theme="light"].privacy-page .privacy-table-header span {
          color:
            #1E3A8A !important;
        }

        [data-theme="light"].privacy-page .privacy-table-row {
          border-bottom:
            1px solid rgba(30,58,138,.09) !important;

          transition:
            background .18s ease !important;
        }

        [data-theme="light"].privacy-page .privacy-table-row:hover {
          background:
            rgba(30,58,138,.035) !important;
        }

        [data-theme="light"].privacy-page .privacy-table-entity {
          color:
            #334155 !important;
        }


        /* ============================================================
           CONTACT CARD
           ============================================================ */

        [data-theme="light"].privacy-page .privacy-contact-card {
          background:
            #ffffff !important;

          border:
            1px solid rgba(30,58,138,.24) !important;

          box-shadow:
            0 15px 42px rgba(30,58,138,.11) !important;

          backdrop-filter: none !important;

          transition:
            transform .24s ease,
            box-shadow .24s ease,
            border-color .24s ease !important;
        }

        [data-theme="light"].privacy-page .privacy-contact-card:hover {
          transform:
            translateY(-5px) !important;

          border-color:
            rgba(30,58,138,.42) !important;

          box-shadow:
            0 24px 55px rgba(30,58,138,.20) !important;
        }

        [data-theme="light"].privacy-page .privacy-contact-corner {
          border-color:
            rgba(30,58,138,.34) !important;
        }

        [data-theme="light"].privacy-page .privacy-contact-label {
          color:
            rgba(30,58,138,.65) !important;
        }

        [data-theme="light"].privacy-page .privacy-contact-title {
          color:
            #1E3A8A !important;
        }

        [data-theme="light"].privacy-page .privacy-contact-description {
          color:
            #475569 !important;
        }

        [data-theme="light"].privacy-page .privacy-contact-email {
          color:
            #475569 !important;
        }

        [data-theme="light"].privacy-page .privacy-contact-button {
  background: #1E3A8A !important;
  color: #FFFFFF !important;
  border: 1px solid #1E3A8A !important;
  box-shadow: 0 8px 20px rgba(30, 58, 138, 0.20) !important;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease !important;
}

[data-theme="light"].privacy-page .privacy-contact-button:hover {
  background: #172F73 !important;
  color: #FFFFFF !important;
  border-color: #172F73 !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 14px 30px rgba(30, 58, 138, 0.34) !important;
}

[data-theme="light"].privacy-page .privacy-contact-button:active {
  background: #142A66 !important;
  color: #FFFFFF !important;
  transform: translateY(0) !important;
  box-shadow: 0 6px 14px rgba(30, 58, 138, 0.25) !important;
}


        /* ============================================================
           GENERAL HOVERS
           ============================================================ */

        [data-theme="light"].privacy-page button {
          transition:
            transform .2s ease,
            box-shadow .2s ease,
            background .2s ease,
            border-color .2s ease,
            color .2s ease !important;
        }

        [data-theme="light"].privacy-page button:hover {
          box-shadow:
            0 12px 28px rgba(30,58,138,.16);
        }


        /* ============================================================
           BREADCRUMB
           ============================================================ */

        [data-theme="light"].privacy-page .privacy-breadcrumb {
          color:
            #475569 !important;
        }

        [data-theme="light"].privacy-page .privacy-breadcrumb:hover {
          color:
            #1E3A8A !important;
        }

        [data-theme="light"].privacy-page .privacy-breadcrumb-current {
          color:
            #1E3A8A !important;
        }


        /* ============================================================
           DATE BADGE
           ============================================================ */

        [data-theme="light"].privacy-page .privacy-date-badge {
          background:
            rgba(30,58,138,.035) !important;

          border:
            1px solid rgba(30,58,138,.15) !important;

          box-shadow:
            0 5px 18px rgba(30,58,138,.05) !important;
        }

        [data-theme="light"].privacy-page .privacy-date-badge span {
          color:
            #475569 !important;
        }


        /* ============================================================
           MODAL
           ============================================================ */

        [data-theme="light"].privacy-page .privacy-modal {
          background:
            #ffffff !important;

          border:
            1px solid rgba(30,58,138,.25) !important;

          box-shadow:
            0 30px 90px rgba(30,58,138,.25) !important;
        }

        [data-theme="light"].privacy-page .privacy-modal-topbar {
          background:
            linear-gradient(
              90deg,
              transparent,
              #1E3A8A,
              transparent
            ) !important;
        }

        [data-theme="light"].privacy-page .privacy-modal h3 {
          color:
            #1E3A8A !important;
        }

        [data-theme="light"].privacy-page .privacy-modal p {
          color:
            #475569 !important;
        }

        [data-theme="light"].privacy-page .privacy-modal input,
        [data-theme="light"].privacy-page .privacy-modal textarea {
          background:
            #ffffff !important;

          color:
            #172F70 !important;

          border:
            1px solid rgba(30,58,138,.22) !important;

          box-shadow:
            inset 0 1px 2px rgba(30,58,138,.025) !important;
        }

        [data-theme="light"].privacy-page .privacy-modal input:focus,
        [data-theme="light"].privacy-page .privacy-modal textarea:focus {
          border-color:
            #1E3A8A !important;

          box-shadow:
            0 0 0 3px rgba(30,58,138,.10) !important;
        }

        [data-theme="light"].privacy-page .privacy-modal-success {
          background:
            rgba(30,58,138,.06) !important;

          border:
            1px solid rgba(30,58,138,.22) !important;
        }

        [data-theme="light"].privacy-page .privacy-modal-success svg {
          stroke:
            #1E3A8A !important;
        }

        [data-theme="light"].privacy-page .privacy-modal-close {
          color:
            #475569 !important;
        }

        [data-theme="light"].privacy-page .privacy-modal-close:hover {
          color:
            #1E3A8A !important;
        }

        [data-theme="light"].privacy-page .privacy-modal-secondary {
          color:
            #475569 !important;
          border-color:
            rgba(30,58,138,.16) !important;
        }

        [data-theme="light"].privacy-page .privacy-modal-secondary:hover {
          background:
            rgba(30,58,138,.06) !important;

          color:
            #1E3A8A !important;

          box-shadow:
            0 8px 20px rgba(30,58,138,.10) !important;
        }


        /* ============================================================
           REMOVE OLD PALE BLUE / CYAN EFFECTS
           ============================================================ */

        [data-theme="light"].privacy-page [style*="#00E5FF"],
        [data-theme="light"].privacy-page [style*="0,229,255"],
        [data-theme="light"].privacy-page [style*="0, 229, 255"],
        [data-theme="light"].privacy-page [style*="#A78BFA"],
        [data-theme="light"].privacy-page [style*="167,139,250"],
        [data-theme="light"].privacy-page [style*="167, 139, 250"] {
          color:
            #1E3A8A !important;

          border-color:
            rgba(30,58,138,.25) !important;
        }

        /* IMPORTANT:
           Don't let the generic rule above recolor semantic SVGs. */

        [data-theme="light"].privacy-page .privacy-warning-icon {
          stroke:
            #DC2626 !important;
        }

        [data-theme="light"].privacy-page svg[stroke="#EF4444"] {
          stroke:
            #DC2626 !important;
        }

        [data-theme="light"].privacy-page svg[stroke="#22C55E"] {
          stroke:
            #16A34A !important;
        }


        /* ============================================================
           ACCESSIBILITY / CONTRAST
           ============================================================ */

        [data-theme="light"].privacy-page input::placeholder,
        [data-theme="light"].privacy-page textarea::placeholder {
          color:
            #64748B !important;

          opacity: 1 !important;
        }

        [data-theme="light"].privacy-page ::selection {
          background:
            rgba(30,58,138,.18);

          color:
            #12265A;
        }

        [data-theme="light"].privacy-page .privacy-toc-item.is-active .privacy-pulse-dot {
  background: #FFFFFF !important;
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.12),
    0 0 10px rgba(255, 255, 255, 0.65) !important;
}

/* =========================================
   CONTACT BUTTON — LIGHT MODE
   ========================================= */

[data-theme="light"].privacy-page .privacy-contact-button {
  background: #1E3A8A !important;
  border: 1px solid #1E3A8A !important;
  color: #FFFFFF !important;

  box-shadow:
    0 8px 20px rgba(30, 58, 138, 0.18) !important;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease !important;
}

/* مهم: حتی وقتی موس روی Button می‌رود */
[data-theme="light"].privacy-page .privacy-contact-button:hover {
  background: #172F73 !important;
  border-color: #172F73 !important;
  color: #FFFFFF !important;



  box-shadow:
    0 14px 30px rgba(30, 58, 138, 0.32),
    0 4px 10px rgba(30, 58, 138, 0.16) !important;
}

/* متن و آیکون داخل Button */
[data-theme="light"].privacy-page .privacy-contact-button,
[data-theme="light"].privacy-page .privacy-contact-button span,
[data-theme="light"].privacy-page .privacy-contact-button svg {
  color: #FFFFFF !important;
}

/* آیکون ایمیل */
[data-theme="light"].privacy-page
  .privacy-contact-button
  .privacy-brand-icon {
  color: #FFFFFF !important;
  stroke: #FFFFFF !important;
}

/* وقتی کلیک می‌شود */
[data-theme="light"].privacy-page .privacy-contact-button:active {
  background: #142A66 !important;
  border-color: #142A66 !important;
  color: #FFFFFF !important;



  box-shadow:
    0 6px 14px rgba(30, 58, 138, 0.24) !important;
}

      `}</style>
    </>
  );
}


