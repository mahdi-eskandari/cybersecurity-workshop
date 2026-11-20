"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

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

const IconShieldCheck = ({ darkMode }: { darkMode: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={darkMode ? "#00E5FF" : "#1565C0"}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

/* ────────────────────────────────
   SUCCESS PAGE — ICONS
──────────────────────────────── */

const IconTimelineCheck = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconTimelineClock = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconTimelineArrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconTimelineWarn = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <circle cx="12" cy="17" r="0.8" fill="currentColor" />
  </svg>
);

const IconTimelineHome = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconTimelineBook = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </svg>
);

const IconTimelineShield = () => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" strokeWidth="1.8" />
  </svg>
);

/* ────────────────────────────────
   SUCCESS PAGE — ANIMATED SHIELD
──────────────────────────────── */

const SuccessShield = ({
  primary,
  darkMode,
}: {
  primary: string;
  darkMode: boolean;
}) => {
  const [ringScale, setRingScale] = useState(1);
  const [checkVisible, setCheckVisible] = useState(false);
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; delay: number }[]
  >([]);

  useEffect(() => {
    const t1 = setTimeout(() => setCheckVisible(true), 400);
    const t2 = setInterval(
      () => setRingScale((s) => (s === 1 ? 1.06 : 1)),
      2400
    );

    const generated = Array.from({ length: 14 }, (_, i) => {
      const angle = (i / 14) * 360;
      const dist = 70 + Math.random() * 40;
      return {
        x: Math.cos((angle * Math.PI) / 180) * dist,
        y: Math.sin((angle * Math.PI) / 180) * dist,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 0.4,
      };
    });
    setParticles(generated);

    return () => {
      clearTimeout(t1);
      clearInterval(t2);
    };
  }, []);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 140, height: 140 }}
    >
      {[1, 0.55, 0.28].map((op, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 140,
            height: 140,
            border: `1px solid ${primary}${Math.round(op * (darkMode ? 0.18 : 0.4) * 255)
              .toString(16)
              .padStart(2, "0")}`,
            borderRadius: "50%",
            transform: `scale(${1 + i * 0.28})`,
            animation: `pulse-ring-success ${2 + i * 0.7}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      <div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 100,
          height: 100,
          background: darkMode
            ? `radial-gradient(circle at 35% 30%, ${primary}24, ${primary}0d)`
            : `radial-gradient(circle at 35% 30%, ${primary}40, ${primary}1a)`,
          border: `1.5px solid ${primary}${darkMode ? "61" : "99"}`,
          boxShadow: darkMode
            ? `0 0 40px ${primary}33, 0 0 80px ${primary}14, inset 0 0 30px ${primary}0f`
            : `0 0 40px ${primary}59, 0 0 80px ${primary}26, inset 0 0 30px ${primary}1f`,
          transform: `scale(${ringScale})`,
          transition: "transform 0.6s ease",
          backdropFilter: "blur(10px)",
        }}
      >
        <span
          style={{
            color: primary,
            opacity: checkVisible ? 1 : 0,
            transform: checkVisible ? "scale(1)" : "scale(0.7)",
            transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconTimelineShield />
        </span>
      </div>

      <svg
        className="absolute inset-0 w-full h-full"
        style={{ animation: "spin-slow-success 18s linear infinite" }}
      >
        <circle
          cx="70"
          cy="70"
          r="64"
          fill="none"
          stroke={`${primary}${darkMode ? "1f" : "4d"}`}
          strokeWidth="1"
          strokeDasharray="6 10"
        />
      </svg>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={
              {
                width: p.size,
                height: p.size,
                background:
                  i % 3 === 0
                    ? "rgba(16,185,129,0.7)"
                    : `${primary}${darkMode ? "99" : "cc"}`,
                "--tx": `${p.x}px`,
                "--ty": `${p.y}px`,
                animation: `particle-fade-success 2.4s ease-out ${p.delay}s both`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
};

export default function SuccessClient({
  trackingCode,
}: {
  trackingCode: string;
}) {
  const { darkMode } = useTheme();
  const primary = darkMode ? "#00E5FF" : "#1565C0";

  const [copied, setCopied] = useState(false);

  const timelineSteps = [
    { icon: <IconTimelineCheck />, label: "دریافت گزارش", done: true },
    { icon: <IconLock />, label: "رمزگذاری پرونده", done: true },
    {
      icon: <IconTimelineClock />,
      label: "بررسی اولیه کارآگاهان",
      done: false,
      active: true,
    },
    { icon: <IconTimelineArrow />, label: "تماس امن", done: false },
  ];

  return (
    <div
className="relative min-h-screen overflow-x-hidden pt-10"
      style={{
        background: darkMode ? "#0A1128" : "#F8FAFC",
        color: darkMode ? "#E2E8F0" : "#1E293B",
        fontFamily: "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",
      }}
    >
      <style>{`
        @keyframes pulse-ring-success {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin-slow-success {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes particle-fade-success {
          0% { opacity: 0; transform: translate(0,0) scale(0); }
          20% { opacity: 1; transform: translate(var(--tx,0),var(--ty,0)) scale(1); }
          100% { opacity: 0; transform: translate(var(--tx,0),var(--ty,0)) scale(0.4); }
        }
        @keyframes slide-up-success {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-success {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* بک‌گراند گرید + گلو */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"

        />
        <div
          className="absolute inset-0"
          style={{
            background: darkMode
              ? "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(0,229,255,0.06) 0%, transparent 60%)"
              : "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(21,101,192,0.04) 0%, transparent 60%)",
          }}
        />
      </div>



      {/* محتوای اصلی */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-12 md:py-16 mt-5">
        <div
          className="relative mb-8"
          style={{ animation: "fade-in-success 0.6s ease both" }}
        >
          <SuccessShield primary={primary} darkMode={darkMode} />
        </div>

        
              
            <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs"

                        style={{
              background: darkMode
                ? "rgba(0,229,255,0.07)"
                : "#EBF3FF",
              border: darkMode
                ? "1px solid rgba(0,229,255,0.2)"
                : "1px solid #156cef57",
              
            }}
          >

            <span 
            className="data-label"
            style={{
              color: darkMode ? "#00E5FF" : "#1565C0",
            }}
            >REPORT SECURED // STATUS: RECEIVED</span>

                        <span className="node-dot pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", display: "inline-block",
                    background: darkMode
                ? "#00E5FF"
                : "#1565C0",

             }}
            
            />
          </div>

        <h1
          className="text-center font-black mb-4"
          style={{
            fontSize: "clamp(1.5rem,3.5vw,2.4rem)",
            color: darkMode ? "#fff" : "#111827",
            lineHeight: 1.45,
            maxWidth: 640,
            animation:
              "slide-up-success 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both",
          }}
        >
         پرونده شما در محیطی کاملاً امن ثبت شد.

        </h1>

        <p
            className="text-center mb-8"
            style={{
              color: darkMode ? "#9aa0aa" : "#475569",
              fontSize: "clamp(0.92rem,2vw,1.0rem)",
              lineHeight: 1.9,
              maxWidth: 580,
            }}

          
        >
          کارآگاهان ارشد پاراهور گزارش شما را دریافت کردند و اطلاعات
          اولیه تحت بالاترین سطح رمزنگاری ذخیره شد. تا ساعاتی دیگر برای
          هماهنگی و امکان‌سنجی از طریق مسیر امن با شما تماس خواهند
          گرفت.
        </p>

        {/* کد پیگیری */}
        <div
          className="mb-10"
          style={{ animation: "fade-in-success 0.5s ease 0.35s both" }}
        >
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-xl flex-wrap justify-center"
            style={{
              background: darkMode ? "rgba(6,11,28,0.85)" : "#FFFFFF",
              border: darkMode
                ? "1px solid rgba(0,229,255,0.14)"
                : "1px solid rgba(21,101,192,0.18)",
              backdropFilter: "blur(12px)",
              boxShadow: darkMode
                ? "none"
                : "0 10px 30px rgba(15,23,42,0.08)",
            }}
          >
            <span
              style={{
              color: darkMode ? "#9aa0aa" : "#475569",
                fontFamily: "monospace",
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                fontWeight: "550"
              }}
            >
             شناسه پرونده:
            </span>

            <span
              style={{
                color: primary,
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.19em",
                direction: "ltr",
                unicodeBidi: "isolate",
              }}
              className="data-label"
            >
              {trackingCode || "PENDING"}
            </span>

            <button
              type="button"
              onClick={async () => {
                if (!trackingCode) return;
                try {
                  await navigator.clipboard.writeText(trackingCode);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                } catch {
                  try {
                    const ta = document.createElement("textarea");
                    ta.value = trackingCode;
                    ta.setAttribute("readonly", "");
                    ta.style.position = "fixed";
                    ta.style.opacity = "0";
                    document.body.appendChild(ta);
                    ta.select();
                    const ok = document.execCommand("copy");
                    document.body.removeChild(ta);
                    setCopied(ok);
                    if (ok) setTimeout(() => setCopied(false), 2000);
                  } catch {
                    setCopied(false);
                  }
                }
              }}
              disabled={!trackingCode}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all"
              style={{
                background: copied
                  ? "rgba(16,185,129,0.12)"
                  : darkMode
                    ? "rgba(0,229,255,0.06)"
                    : "rgba(21,101,192,0.07)",
                border: copied
                  ? "1px solid rgba(16,185,129,0.3)"
                  : darkMode
                    ? "1px solid rgba(0,229,255,0.15)"
                    : "1px solid rgba(21,101,192,0.20)",
                color: copied ? (darkMode ? "#10B981" : "#047857") : primary,
                fontFamily: "monospace",
                cursor: trackingCode ? "pointer" : "default",
              }}
            >
              {copied ? "✓ کپی شد" : "کپی"}
            </button>
          </div>
        </div>

        {/* تایم‌لاین روند */}
        <div
          className="w-full max-w-2xl mb-10"
          style={{ animation: "fade-in-success 0.5s ease 0.4s both" }}
        >
          <div className="flex items-start justify-center gap-0">
            {timelineSteps.map((step, i) => (
              <div
                key={i}
                className="flex items-center "
                style={{ flex: i < timelineSteps.length - 1 ? "1" : "0" }}
              >
                <div className="flex flex-col items-center gap-2 ">
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-full transition-all "
                    style={{
                      background: step.done
                        ? "rgba(16,185,129,0.12)"
                        : step.active
                          ? darkMode
                            ? "rgba(0,229,255,0.1)"
                            : "rgba(21,101,192,0.12)"
                          : darkMode
                            ? "rgba(255,255,255,0.03)"
                            : "#F1F5F9",
                      border: step.done
                        ? "1.5px solid rgba(16,185,129,0.45)"
                        : step.active
                          ? `1.5px solid ${primary}73`
                          : darkMode
                            ? "1px solid rgba(255,255,255,0.07)"
                            : "1px solid rgba(21,101,192,0.12)",
                      color: step.done
                        ? (darkMode ? "#10B981" : "#047857")
                        : step.active
                          ? primary
                          : (darkMode ? "#94A3B8" : "#64748B"),
                      boxShadow: step.active
                        ? `0 0 14px ${primary}26`
                        : "none",
                    }}
                  >
                    {step.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: step.done
                        ? (darkMode ? "#10B981" : "#047857")
                        : step.active
                          ? primary
                          : (darkMode ? "#94A3B8" : "#64748B"),
                      fontFamily: "monospace",
                      letterSpacing: "0.05em",
                      textAlign: "center",
                      width: 90,
                      fontWeight: "550"
                    }}
                  >
                    {step.label}
                  </span>
                </div>
                {i < timelineSteps.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      margin: "0 4px",
                      marginBottom: 22,
                      background:
                        i < 2
                          ? (darkMode
                            ? "linear-gradient(90deg,rgba(16,185,129,0.4),rgba(0,229,255,0.2))"
                            : "linear-gradient(90deg,rgba(4,120,87,0.55),rgba(21,101,192,0.30))")
                          : darkMode
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(21,101,192,0.10)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* اقدامات ضروری */}
        <div
          className="w-full max-w-2xl mb-10"
          style={{
            animation:
              "slide-up-success 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s both",
          }}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: darkMode ? "rgba(6,11,28,0.88)" : "#FFFFFF",
              border: darkMode
                ? "1px solid rgba(0,229,255,0.13)"
                : "1px solid rgba(21,101,192,0.16)",
              boxShadow: darkMode
                ? "0 24px 64px rgba(0,0,0,0.4)"
                : "0 20px 50px rgba(15,23,42,0.10)",
            }}
          >
            <div
              style={{
                height: 2,
                background:
                  darkMode
                    ? "linear-gradient(90deg, rgba(16,185,129,0.6), rgba(0,229,255,0.4), transparent)"
                    : "linear-gradient(90deg, rgba(4,120,87,0.75), rgba(21,101,192,0.45), transparent)",
              }}
            />

            <div className="px-7 py-6 md:px-8 md:py-7">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-lg"
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.22)",
                    color: "#EF4444",
                  }}
                >
                  <IconTimelineWarn />
                </div>
                <h3
                  className="font-bold text-base"
                  style={{ color: darkMode ? "#fff" : "#111827" }}
                >
                  اقدامات ضروری تا زمان تماس ما:
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    text: "ارتباط خود را با فرد مشکوک یا کلاهبردار قطع نکنید",
                    icon: "🚫",
                    note: "ارتباط را در حد معمول حفظ کرده و از هرگونه اقدام یا واکنش غیرعادی پرهیز کنید.",
                  },
                  {
                    text: "تمامی ادله و مستندات دیجیتال را حفظ و از حذف یا تغییر آن‌ها خودداری کنید.",
                    icon: "💾",
                    note: "این مستندات مهم‌ترین شواهد پرونده شما هستند.",
                  },
                  {
                    text: " از تکمیل مجدد فرم گزارش حادثه یا برقراری تماس‌های مکرر با بخش ویژه بحران خودداری کنید. ",
                    icon: "🔒",
                    note: "چرا که این امر ممکن است روند بررسی و پیگیری پرونده را مختل کند.",
                  },
                ].map(({ text, icon, note }, i) => (
                  <div
                    key={i}
                    className="flex items-start items-center gap-4 p-4 rounded-xl"
                    style={{
                      background: darkMode
                        ? "rgba(255,255,255,0.02)"
                        : "#F8FAFC",
                      border: darkMode
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "1px solid rgba(21,101,192,0.07)",
                    }}
                  >
                    <div>
                    <span
                      style={{
                        fontSize: "1.1rem",
                        lineHeight: 1,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {icon}
                    </span>
                    </div>
                    <div>
                      <p
                        style={{
                          color: darkMode ? "#E2E8F0" : "#1E293B",
                          fontSize: "0.9rem",
                          lineHeight: 1.7,
                          marginBottom: 3,
                        }}
                      >
                        {text}
                      </p>
                      <p
                        style={{
              color: darkMode ? "#9aa0aa" : "#475569",
                          fontSize: "0.75rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="flex items-center gap-2.5 mt-5 pt-5"
                style={{
                  borderTop: darkMode
                    ? "1px solid rgba(0,229,255,0.07)"
                    : "1px solid rgba(21,101,192,0.10)",
                }}
              >
                <div
                  className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
                  style={{
                    background: darkMode
                      ? "rgba(0,229,255,0.07)"
                      : "rgba(21,101,192,0.08)",
                    border: darkMode
                      ? "1px solid rgba(0,229,255,0.18)"
                      : "1px solid rgba(21,101,192,0.20)",
                    color: primary,
                  }}
                >
                  <IconTimelineClock />
                </div>
                <p
                  style={{
              color: darkMode ? "#9aa0aa" : "#475569",
                    fontSize: "0.78rem",
                    lineHeight: 1.6,
                  }}
                >
                  زمان پاسخ‌دهی معمول:{" "}
                  <span style={{ color: primary, fontWeight: 600 }}>
                    کمتر از ۲ ساعت در ساعات کاری
                  </span>{" "}
                  — برای بحران‌های فعال، پاسخ شبانه‌روزی در نظر گرفته
                  می‌شود.
                </p>
              </div>
            </div>
          </div>
        </div>



        {/* دکمه‌های اقدام */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 mb-4"
          style={{ animation: "fade-in-success 0.5s ease 0.6s both" }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300"
            style={{
              background: primary,
              color: darkMode ? "#0A1128" : "#fff",
              boxShadow: darkMode ? `0 0 24px ${primary}4d` : "0 10px 24px rgba(15,23,42,0.22)",
            fontSize: "0.95rem",
              transform: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = darkMode ? `0 0 40px ${primary}80, 0 0 90px ${primary}40` : "0 14px 30px rgba(15,23,42,0.30)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = darkMode ? `0 0 24px ${primary}4d` : "0 10px 24px rgba(15,23,42,0.22)";
              (e.currentTarget as HTMLElement).style.transform = "none";
            }}
          >
            <IconTimelineHome />
            بازگشت به پایگاه اصلی
          </Link>


        </div>


      </main>
    </div>
  );
}
