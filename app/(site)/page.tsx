"use client"

import React, { useEffect } from "react"
import { useState } from "react"
import Link from "next/link"
import { useTheme } from "../../components/ThemeProvider"
import { motion } from "framer-motion";

const blogPosts = [
  {
    tag: "بلاکچین",
    tagColor: "#00E5FF",
    date: "۱۴ شهریور ۱۴۰۳",
    readTime: "۸ دقیقه",
    title: "ردیابی ۲.۴ میلیون دلار تتر پس از هک کیف پول؛ تحلیل زنجیره تراکنش",
    excerpt:
      "در این گزارش فنی، روش‌های تجزیه‌وتحلیل گراف تراکنش روی شبکه TRC-20 را برای شناسایی آدرس‌های میانی و صرافی‌های off-ramp مرور می‌کنیم.",
    img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&h=360&fit=crop&auto=format",
    alt: "blockchain abstract dark cubes",
  },
  {
    tag: "فارنزیک شبکه",
    tagColor: "#A78BFA",
    date: "۲ مرداد ۱۴۰۳",
    readTime: "۱۲ دقیقه",
    title: "چگونه یک گروه باج‌افزاری با ابزار OSINT شناسایی و تحویل مراجع قضایی شد",
    excerpt:
      "مستندسازی کامل پرونده‌ای که از تحلیل متادیتای ایمیل آغاز شد و به شناسایی هویت واقعی عامل اصلی در سه کشور مختلف ختم گردید.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=360&fit=crop&auto=format",
    alt: "teal LED panel cybersecurity",
  },
  {
    tag: "مهندسی اجتماعی",
    tagColor: "#F97316",
    date: "۱۸ تیر ۱۴۰۳",
    readTime: "۶ دقیقه",
    title: "آناتومی یک حمله فیشینگ هدفمند علیه مدیران ارشد؛ تحلیل تکنیک‌های فریب",
    excerpt:
      "بررسی تکنیک‌های spear-phishing پیشرفته که در پنج پرونده اخیر پاراهور مشاهده شده، همراه با نشانگرهای شناسایی و روش‌های مقابله.",
    img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&h=360&fit=crop&auto=format",
    alt: "red padlock on keyboard",
  },
]

const IconShield = ({ color = "#00E5FF" }: { color?: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

const IconSearch = ({ color = "#00E5FF" }: { color?: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <circle cx="11" cy="11" r="3" />
    <line x1="11" y1="3" x2="11" y2="5" />
    <line x1="11" y1="17" x2="11" y2="19" />
  </svg>
)

const IconDocument = ({ color = "#00E5FF" }: { color?: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
    <circle
      cx="18"
      cy="20"
      r="3"
      fill={color === "#00E5FF" ? "#0A1128" : "#FFFFFF"}
      stroke={color}
    />
    <path d="M18 19v1l.5.5" strokeWidth="1" />
  </svg>
)

const IconCrypto = ({ color = "#00E5FF" }: { color?: string }) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.5 9h4a1.5 1.5 0 010 3h-4v3h4.5a1.5 1.5 0 010 3H9.5" />
    <line x1="12" y1="6" x2="12" y2="9" />
    <line x1="12" y1="18" x2="12" y2="21" />
  </svg>
)

const IconForensics = ({ color = "#00E5FF" }: { color?: string }) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 13.5V20a2 2 0 002 2h16a2 2 0 002-2v-6.5" />
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M7 9.5v5" />
    <path d="M17 9.5v5" />
    <circle cx="12" cy="14" r="2.5" />
    <line x1="12" y1="16.5" x2="12" y2="20" />
  </svg>
)

const IconOsint = ({ color = "#00E5FF" }: { color?: string }) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    <circle
      cx="12"
      cy="12"
      r="2"
      fill={color}
      opacity="0.4"
    />
  </svg>
)

const IconMalware = ({ color = "#00E5FF" }: { color?: string }) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <path d="M8 10l2-2 2 2 2-2 2 2" strokeWidth="1.8" />
    <path d="M7 13h10" />
  </svg>
)

const IconMail = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#00E5FF"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const IconTelegram = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#00E5FF"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.5 4.5L2.5 12l7 2.5" />
    <path d="M9.5 14.5l2.5 5 3-8" />
    <path d="M9.5 14.5l8-8" />
  </svg>
)

const NetworkDecor = ({
  darkMode = true,
}: {
  darkMode?: boolean;
}) => {
  const blue = darkMode ? "#00E5FF" : "#1D4ED8";

  return (
    <svg
      width="320"
      height="280"
      viewBox="0 0 320 280"
      className="hero-float"
      style={{ opacity: 0.35 }}
    >
      <defs>
        <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            stopColor={blue}
            stopOpacity="1"
          />
          <stop
            offset="100%"
            stopColor={blue}
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      {/* Main connections */}
      <line
        x1="160"
        y1="140"
        x2="60"
        y2="60"
        stroke={
          darkMode
            ? "rgba(0,229,255,0.3)"
            : "rgba(29,78,216,0.48)"
        }
        strokeWidth="1"
      />

      <line
        x1="160"
        y1="140"
        x2="260"
        y2="60"
        stroke={
          darkMode
            ? "rgba(0,229,255,0.2)"
            : "rgba(29,78,216,0.38)"
        }
        strokeWidth="1"
      />

      <line
        x1="160"
        y1="140"
        x2="40"
        y2="200"
        stroke={
          darkMode
            ? "rgba(0,229,255,0.25)"
            : "rgba(29,78,216,0.42)"
        }
        strokeWidth="1"
      />

      <line
        x1="160"
        y1="140"
        x2="280"
        y2="200"
        stroke={
          darkMode
            ? "rgba(0,229,255,0.2)"
            : "rgba(29,78,216,0.38)"
        }
        strokeWidth="1"
      />

      <line
        x1="160"
        y1="140"
        x2="160"
        y2="20"
        stroke={
          darkMode
            ? "rgba(0,229,255,0.35)"
            : "rgba(29,78,216,0.55)"
        }
        strokeWidth="1"
      />

      {/* Secondary connections */}
      <line
        x1="60"
        y1="60"
        x2="160"
        y2="20"
        stroke={
          darkMode
            ? "rgba(0,229,255,0.15)"
            : "rgba(29,78,216,0.28)"
        }
        strokeWidth="1"
      />

      <line
        x1="260"
        y1="60"
        x2="160"
        y2="20"
        stroke={
          darkMode
            ? "rgba(0,229,255,0.15)"
            : "rgba(29,78,216,0.28)"
        }
        strokeWidth="1"
      />

      <line
        x1="40"
        y1="200"
        x2="100"
        y2="250"
        stroke={
          darkMode
            ? "rgba(0,229,255,0.12)"
            : "rgba(29,78,216,0.24)"
        }
        strokeWidth="1"
      />

      <line
        x1="280"
        y1="200"
        x2="220"
        y2="250"
        stroke={
          darkMode
            ? "rgba(0,229,255,0.12)"
            : "rgba(29,78,216,0.24)"
        }
        strokeWidth="1"
      />

      {/* Center node */}
      <circle
        cx="160"
        cy="140"
        r="8"
        fill={
          darkMode
            ? "rgba(0,229,255,0.2)"
            : "rgba(29,78,216,0.16)"
        }
        stroke={blue}
        strokeWidth="1.5"
      />

      <circle
        cx="160"
        cy="140"
        r="3"
        fill={blue}
      />

      {/* Top-left node */}
      <circle
        cx="60"
        cy="60"
        r="5"
        fill={
          darkMode
            ? "rgba(0,229,255,0.15)"
            : "rgba(29,78,216,0.13)"
        }
        stroke={blue}
        strokeWidth="1"
      />

      <circle
        cx="60"
        cy="60"
        r="2"
        fill={blue}
      />

      {/* Top-right node */}
      <circle
        cx="260"
        cy="60"
        r="5"
        fill={
          darkMode
            ? "rgba(0,229,255,0.15)"
            : "rgba(29,78,216,0.13)"
        }
        stroke={blue}
        strokeWidth="1"
      />

      <circle
        cx="260"
        cy="60"
        r="2"
        fill={blue}
      />

      {/* Bottom-left node */}
      <circle
        cx="40"
        cy="200"
        r="4"
        fill={
          darkMode
            ? "rgba(0,229,255,0.1)"
            : "rgba(29,78,216,0.10)"
        }
        stroke={blue}
        strokeWidth="1"
      />

      <circle
        cx="40"
        cy="200"
        r="1.5"
        fill={blue}
      />

      {/* Bottom-right node */}
      <circle
        cx="280"
        cy="200"
        r="4"
        fill={
          darkMode
            ? "rgba(0,229,255,0.1)"
            : "rgba(29,78,216,0.10)"
        }
        stroke={blue}
        strokeWidth="1"
      />

      <circle
        cx="280"
        cy="200"
        r="1.5"
        fill={blue}
      />

      {/* Top node */}
      <circle
        cx="160"
        cy="20"
        r="5"
        fill={
          darkMode
            ? "rgba(0,229,255,0.15)"
            : "rgba(29,78,216,0.13)"
        }
        stroke={blue}
        strokeWidth="1"
      />

      <circle
        cx="160"
        cy="20"
        r="2"
        fill={blue}
      />

      {/* Bottom small nodes */}
      <circle
        cx="100"
        cy="250"
        r="3"
        fill={
          darkMode
            ? "rgba(0,229,255,0.1)"
            : "rgba(29,78,216,0.09)"
        }
        stroke={blue}
        strokeWidth="1"
      />

      <circle
        cx="220"
        cy="250"
        r="3"
        fill={
          darkMode
            ? "rgba(0,229,255,0.1)"
            : "rgba(29,78,216,0.09)"
        }
        stroke={blue}
        strokeWidth="1"
      />
    </svg>
  );
};












export default function page() {
  const { darkMode } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const iconColor = darkMode ? "#00E5FF" : "#2563EB"

  return (
    <div
      className="min-h-screen pt-20 cyber-grid-bg"
      style={{
        background: darkMode ? "#0A1128" : "#FFFFFF",
        color: darkMode ? "#E2E8F0" : "#111827",
      }}
    >


      {menuOpen && (
        <div
          className="md:hidden flex flex-col gap-4 px-6 py-4"
          style={{
            background: darkMode ? "rgba(10,17,40,0.97)" : "#FFFFFF",
            borderBottom: darkMode
              ? "1px solid rgba(0,229,255,0.1)"
              : "1px solid rgba(59,130,246,0.22)",
          }}
        >
          {["خدمات ما", "وبلاگ", "درباره ما", "تماس با ما"].map((item) => (
            <Link
              key={item}
              href={
                item === "خدمات ما"
                  ? "/services"
                  : item === "وبلاگ"
                    ? "/blog"
                    : item === "درباره ما"
                      ? "/about"
                      : "/contact"
              }
              className="nav-link text-base"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}

      {/* <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-0 md:pt-32 md:pb-16"> */}
      <motion.div
      className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-0 md:pt-32 md:pb-16"
    initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true, amount: 0.2 }}
>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: darkMode
              ? "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 70%)"
              : "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.045) 0%, rgba(59,130,246,0.03) 38%, transparent 70%)",
          }}
        />

        <div
          className="absolute opacity-30 pointer-events-none hidden lg:block"
          style={{ top: "5%", left: "5%" }}
        >
          <NetworkDecor darkMode={darkMode} />
        </div>

        <div
          className="absolute opacity-20 pointer-events-none hidden lg:block"
          style={{
            top: "10%",
            right: "5%",
            transform: "scaleX(-1)",
          }}
        >
          <NetworkDecor darkMode={darkMode} />
        </div>

        <div className="relative z-10 w-[90%] max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs"
            style={{
              background: darkMode
                ? "rgba(0,229,255,0.07)"
                : "rgba(59,130,246,0.08)",
              border: darkMode
                ? "1px solid rgba(0,229,255,0.2)"
                : "1px solid rgba(37,99,235,0.22)",
              color: darkMode ? "#00E5FF" : "#2563EB",
            }}
          >
            <span
              className="node-dot pulse-dot"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: darkMode ? "#00E5FF" : "#2563EB",
                display: "inline-block",
                boxShadow: darkMode
                  ? undefined
                  : "0 0 7px rgba(37,99,235,0.22)",
              }}
            />
            <span className="data-label">
              سیستم آنلاین // PARAHOOR ACTIVE
            </span>
          </div>

          <h1
            className="glow-text font-black leading-tight mb-6"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: darkMode ? "#ffffff" : "#111827",
              lineHeight: "1.3",
              fontWeight: 900,
              textShadow: darkMode
                ? undefined
                : "0 0 18px rgba(37,99,235,0.10)",
            }}
          >
            هیچ مجرمی در دنیای دیجیتال
            <br />
            <span
              style={{
                color: darkMode ? "#00E5FF" : "#2563EB",
                textShadow: darkMode
                  ? undefined
                  : "0 0 18px rgba(37,99,235,0.12)",
              }}
            >
              بی‌ردپا
            </span>{" "}
            نیست.
          </h1>

          <p
            className="max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{
              color: darkMode ? "#94A3B8" : "#111827",
              fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
              fontWeight: 400,
            }}
          >
            پاراهور؛ آژانس خصوصی تحقیقات سایبری و فارنزیک. ما شواهد را کشف،
            جریان‌های مالی را ردیابی و هویت‌های پنهان را آشکار می‌کنیم.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-[80%] mx-auto">
            <Link
              href="mailto:secure@parahoor.io"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold transition-all duration-300"
              style={{
                background: darkMode ? "#EF4444" : "#2563EB",
                color: "#ffffff",
                border: darkMode
                  ? "1px solid rgba(239, 68, 68, 0.6)"
                  : "1px solid rgba(37,99,235,0.6)",
                boxShadow: darkMode
                  ? "0 0 15px rgba(239,68,68,0.35)"
                  : "0 0 15px rgba(37,99,235,0.18)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 0 22px rgba(239,68,68,0.55)"
                  : "0 0 22px rgba(37,99,235,0.28)"

                if (!darkMode) {
                  e.currentTarget.style.background = "#3B82F6"
                  e.currentTarget.style.borderColor = "#3B82F6"
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 0 15px rgba(239,68,68,0.35)"
                  : "0 0 15px rgba(37,99,235,0.18)"

                if (!darkMode) {
                  e.currentTarget.style.background = "#2563EB"
                  e.currentTarget.style.borderColor = "rgba(37,99,235,0.6)"
                }
              }}
            >
              گزارش فوری حادثه
            </Link>

            <Link
              href="/consultation"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 px-[60px]"
              style={{
                background: darkMode
                  ? "rgba(0,229,255,0.07)"
                  : "rgba(255,255,255,0.95)",
                color: darkMode ? "#00E5FF" : "#2563EB",
                border: darkMode
                  ? "1px solid rgba(0,229,255,0.25)"
                  : "1px solid rgba(59,130,246,0.28)",
                boxShadow: darkMode
                  ? "0 0 15px rgba(6,182,212,0.35)"
                  : "0 0 15px rgba(37,99,235,0.10)",
              }}
              onMouseEnter={(e) => {
                if (!darkMode) {
                  e.currentTarget.style.borderColor = "#2563EB"
                  e.currentTarget.style.background = "rgba(37,99,235,0.06)"
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(37,99,235,0.10)"
                } else {
                  e.currentTarget.style.boxShadow =
                    "0 0 22px rgba(6,182,212,0.55)"
                  e.currentTarget.style.borderColor =
                    "rgba(0,229,255,0.4)"
                }
              }}
              onMouseLeave={(e) => {
                if (!darkMode) {
                  e.currentTarget.style.borderColor =
                    "rgba(59,130,246,0.28)"
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.95)"
                  e.currentTarget.style.boxShadow =
                    "0 0 15px rgba(37,99,235,0.10)"
                } else {
                  e.currentTarget.style.boxShadow =
                    "0 0 15px rgba(6,182,212,0.35)"
                  e.currentTarget.style.borderColor =
                    "rgba(0,229,255,0.25)"
                }
              }}
            >
             خدمات ما
            </Link>
          </div>

          <div className="scan-line mt-16 w-48 mx-auto opacity-60" />
        </div>
      </motion.div>















      {/* <section
        className="px-6 py-20 md:px-12"
        id="process"
        style={
          !darkMode
            ? {
                background: "linear-gradient(180deg, rgba(239,246,255,0.78), rgba(248,250,252,0.52))",
                borderTop: "1px solid rgba(37,99,235,0.12)",
                borderBottom: "1px solid rgba(37,99,235,0.12)",
              }
            : undefined
        }
      > */}

        <motion.div
      className="px-6 py-20 md:px-12"
        id="process"
        style={
          !darkMode
            ? {
                background: "linear-gradient(180deg, rgba(239,246,255,0.78), rgba(248,250,252,0.52))",
                borderTop: "1px solid rgba(37,99,235,0.12)",
                borderBottom: "1px solid rgba(37,99,235,0.12)",
              }
            : undefined
        }
 initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7 }}
viewport={{ once: true, amount: 0.2 }}
>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="data-label block mb-3">
              INVESTIGATION PIPELINE
            </span>

            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                color: darkMode ? "#ffffff" : "#111827",
              }}
            >
              مسیر بررسی پرونده شما
            </h2>

            <div className="scan-line w-24 mx-auto mt-4" />

            <div
              className="hidden md:block w-20 mt-4 flex-shrink-0 mx-auto"
              style={{
                height: "1px",
                background: darkMode
                  ? "linear-gradient(to right, rgba(0,229,255,0.1), rgba(0,229,255,1), rgba(31, 74, 79, 0.1))"
                  : "linear-gradient(to right, rgba(59,130,246,0.08), rgba(37,99,235,1), rgba(59,130,246,0.08))",
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-0">
            {[
              {
                icon: <IconDocument color={iconColor} />,
                step: "STEP 01",
                title: "ثبت اطلاعات اولیه",
                text: "دریافت شرح حادثه، اسناد اولیه، و راه‌اندازی کانال ارتباطی امن",
              },
              {
                icon: <IconSearch color={iconColor} />,
                step: "STEP 02",
                title: "فارنزیک و امکان‌سنجی",
                text: "تحلیل فنی، استخراج داده، و ارزیابی ادله دیجیتال با ابزارهای پیشرفته",
              },
              {
                icon: <IconShield color={iconColor} />,
                step: "STEP 03",
                title: "ارائه ادله دادگاه‌پسند",
                text: "تهیه گزارش رسمی، مستندسازی زنجیره حضانت، و آمادگی برای مراجع قضایی",
              },
            ].map((step, index) => (
              <React.Fragment key={index}>
                <div
                  className={`glass-card w-full max-w-[310px] md:max-w-none md:flex-1 h-[340px] flex flex-col justify-center items-center p-6 md:p-8 text-center group transition-all duration-300 rounded-2xl ${
                    darkMode
                      ? "border border-cyan-500/30 hover:border-cyan-500 bg-cyan-900/10 hover:bg-cyan-800/15"
                      : ""
                  }`}
                  style={
                    darkMode
                      ? undefined
                      : {
                          border: "1px solid rgba(59,130,246,0.22)",
                          background: "#FFFFFF",
                          transition:
                            "border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!darkMode) {
                      e.currentTarget.style.borderColor = "#2563EB"
                      e.currentTarget.style.boxShadow =
                        "0 16px 40px rgba(75,46,43,0.10)"
                      e.currentTarget.style.transform = "translateY(-3px)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!darkMode) {
                      e.currentTarget.style.borderColor =
                        "rgba(59,130,246,0.22)"
                      e.currentTarget.style.boxShadow = "none"
                      e.currentTarget.style.transform = "none"
                    }
                  }}
                >
                  <div className="mb-4 flex justify-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: darkMode
                          ? "rgba(0,229,255,0.08)"
                          : "#FFFFFF",
                        border: darkMode
                          ? "1px solid rgba(0,229,255,0.25)"
                          : "1px solid rgba(59,130,246,0.18)",
                        boxShadow: darkMode
                          ? undefined
                          : "0 4px 18px rgba(75,46,43,0.06)",
                      }}
                    >
                      {step.icon}
                    </div>
                  </div>

                  <span
                    className="step-number block mb-2"
                    style={darkMode ? undefined : { color: "#2563EB" }}
                  >
                    {step.step}
                  </span>

                  <h3
                    className="font-bold text-base mb-2"
                    style={{ color: darkMode ? "#ffffff" : "#111827" }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      color: darkMode ? "#64748B" : "#111827",
                      fontSize: "0.82rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {step.text}
                  </p>
                </div>

                {index < 2 && (
                  <>
                    <div
                      className="hidden md:block w-12 flex-shrink-0"
                      style={{
                        height: 1,
                        background: darkMode
                          ? index === 0
                            ? "linear-gradient(1270deg, rgba(0,229,255,0.1), rgb(0, 229, 255))"
                            : "linear-gradient(270deg, rgba(0,229,255,0.1), rgb(0, 229, 255))"
                          : index === 0
                            ? "linear-gradient(1270deg, rgba(59,130,246,0.08), rgb(37,99,235))"
                            : "linear-gradient(270deg, rgba(59,130,246,0.08), rgb(37,99,235))",
                      }}
                    />

                    <div
                      className="md:hidden h-6 w-px mx-auto"
                      style={{
                        background: darkMode
                          ? "linear-gradient(180deg, rgba(0,229,255,0.1), rgb(0, 229, 255))"
                          : "linear-gradient(180deg, rgba(59,130,246,0.08), rgb(37,99,235))",
                      }}
                    />
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>









      {/* <section className="px-6 py-20 md:px-12" id="services"> */}
   <motion.div
     className="px-6 py-20 md:px-12" id="services"
 initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7 }}
viewport={{ once: true, amount: 0.2 }}
>


        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="data-label block mb-3">
              SPECIALIZATION DOMAINS
            </span>

            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                color: darkMode ? "#ffffff" : "#111827",
              }}
            >
              حوزه‌های تخصصی پاراهور
            </h2>

            <div className="scan-line w-24 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                icon: <IconCrypto color={iconColor} />,
                label: "CRYPTO TRACE",
                title: "ردیابی رمزارز و تراکنش‌ها",
                text: "تحلیل زنجیره بلاک، ردیابی کیف پول‌ها، کشف مسیرهای پولشویی و شناسایی تراکنش‌های مشکوک در شبکه‌های رمزارز",
                meta: "Bitcoin / Ethereum / Tron / USDT",
              },
              {
                icon: <IconForensics color={iconColor} />,
                label: "DIGITAL FORENSICS",
                title: "فارنزیک و کشف ادله دیجیتال",
                text: "بازیابی داده‌های حذف‌شده، تحلیل لاگ‌ها، فارنزیک موبایل و کامپیوتر، و استخراج ادله معتبر برای دادگاه",
                meta: "iOS / Android / Windows / Linux",
              },
              {
                icon: <IconOsint color={iconColor} />,
                label: "OSINT / IDENTITY",
                title: "اوسینت (OSINT) و کشف هویت",
                text: "کشف هویت واقعی افراد ناشناس، تحلیل رد پای دیجیتال، جمع‌آوری اطلاعات منابع باز و شبکه‌های اجتماعی",
                meta: "Social / Dark Web / Registry",
              },
              {
                icon: <IconMalware color={iconColor} />,
                label: "MALWARE ANALYSIS",
                title: "بررسی سیستم‌های آلوده",
                text: "شناسایی بدافزارها، تحلیل نقاط ورود هکرها، بررسی میزان خسارت و مستندسازی حملات سایبری",
                meta: "APT / Ransomware / Spyware",
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`glass-card p-7 group cursor-default rounded-2xl transition-all duration-300 ${
                  darkMode
                    ? "border border-cyan-500/30 hover:border-cyan-500 bg-cyan-900/10 hover:bg-cyan-800/15"
                    : ""
                }`}
                style={
                  darkMode
                    ? undefined
                    : {
                        border: "1px solid rgba(59,130,246,0.22)",
                        background: "#FFFFFF",
                        transition:
                          "border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease, background 300ms ease",
                      }
                }
                onMouseEnter={(e) => {
                  if (!darkMode) {
                    e.currentTarget.style.borderColor = "#2563EB"
                    e.currentTarget.style.background = "#FFFFFF"
                    e.currentTarget.style.boxShadow =
                      "0 16px 40px rgba(75,46,43,0.10)"
                    e.currentTarget.style.transform = "translateY(-3px)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!darkMode) {
                    e.currentTarget.style.borderColor =
                      "rgba(59,130,246,0.22)"
                    e.currentTarget.style.background = "#FFFFFF"
                    e.currentTarget.style.boxShadow = "none"
                    e.currentTarget.style.transform = "none"
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: darkMode
                        ? "rgba(0,229,255,0.06)"
                        : "#FFFFFF",
                      border: darkMode
                        ? "1px solid rgba(0,229,255,0.2)"
                        : "1px solid rgba(59,130,246,0.18)",
                    }}
                  >
                    {service.icon}
                  </div>

                  <div>
                    <span
                      className="data-label block mb-1.5"
                      style={darkMode ? undefined : { color: "#2563EB" }}
                    >
                      {service.label}
                    </span>

                    <h3
                      className="font-bold mb-2"
                      style={{
                        color: darkMode ? "#ffffff" : "#111827",
                        fontSize: "1rem",
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      style={{
                        color: darkMode ? "#64748B" : "#111827",
                        fontSize: "0.82rem",
                        lineHeight: 1.75,
                      }}
                    >
                      {service.text}
                    </p>
                  </div>
                </div>

                <div
                  className="mt-5 h-px"
                  style={{
                    background: darkMode
                      ? "linear-gradient(90deg, rgba(0,229,255,0.3), transparent)"
                      : "linear-gradient(90deg, rgba(37,99,235,0.28), rgba(59,130,246,0.18), transparent)",
                  }}
                />

                <div className="mt-3 flex items-center gap-2">
                  <span
                    className="node-dot"
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: darkMode ? "#00E5FF" : "#2563EB",
                      display: "inline-block",
                    }}
                  />

                  <span
                    style={{
                      color: darkMode
                        ? "rgba(0,229,255,0.6)"
                        : "#475569",
                      fontSize: "0.72rem",
                      fontFamily: "monospace",
                    }}
                  >
                    {service.meta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
  </motion.div>






      

      {/* <section className="py-20 px-6 md:px-12" 
       style={
          !darkMode
            ? {
                background: "linear-gradient(180deg, rgba(240, 244, 250, 0.78), rgba(248,250,252,0.52))",
                borderTop: "1px solid rgba(37,99,235,0.12)",
                borderBottom: "1px solid rgba(37,99,235,0.12)",
              }
            : undefined
        }
      > */}
<motion.div
    className="py-20 px-6 md:px-12" 
       style={
          !darkMode
            ? {
                background: "linear-gradient(180deg, rgba(240, 244, 250, 0.78), rgba(248,250,252,0.52))",
                borderTop: "1px solid rgba(37,99,235,0.12)",
                borderBottom: "1px solid rgba(37,99,235,0.12)",
              }
            : undefined
        }
 initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7 }}
viewport={{ once: true, amount: 0.2 }}
>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-2 justify-center">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: darkMode ? "#00E5FF" : "#2563EB",
                  display: "inline-block",
                  boxShadow: darkMode
                    ? "0 0 7px rgba(0,229,255,0.9)"
                    : "0 0 7px rgba(37,99,235,0.22)",
                }}
              />

              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.62rem",
                  color: darkMode
                    ? "rgba(0,229,255,0.5)"
                    : "#475569",
                  letterSpacing: "0.18em",
                }}
              >
                FORENSIC RADAR
              </span>
            </div>

            <h2
              className="text-2xl md:text-3xl font-black"
              style={{
                color: darkMode ? "#fff" : "#111827",
              }}
            >
              آخرین گزارش‌های{" "}
              <span style={{ color: darkMode ? "#00E5FF" : "#2563EB" }}>
                میدانی
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <Link
                key={i}
                href="/blog"
                className={`group flex flex-col rounded-2xl overflow-hidden transition-all ${
                  darkMode ? "bg-cyan-900/10" : ""
                }`}
                style={{
                  border: darkMode
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "1px solid rgba(59,130,246,0.22)",
                  textDecoration: "none",
                  background: darkMode ? undefined : "#FFFFFF",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = darkMode
                    ? "rgba(0,229,255,0.22)"
                    : "#2563EB"

                  e.currentTarget.style.transform = "translateY(-3px)"

                  e.currentTarget.style.boxShadow = darkMode
                    ? "0 16px 48px rgba(0,0,0,0.5)"
                    : "0 16px 48px rgba(75,46,43,0.10)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = darkMode
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(59,130,246,0.22)"

                  e.currentTarget.style.transform = "none"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{
                    height: 180,
                    background: darkMode ? "#0A1128" : "#FFFFFF",
                  }}
                >
                  <img
                    src={post.img}
                    alt={post.alt}
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{ filter: "brightness(0.75) saturate(0.8)" }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLImageElement).style.transform =
                        "scale(1.04)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLImageElement).style.transform =
                        "scale(1)")
                    }
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background: darkMode
                        ? "linear-gradient(to bottom, transparent 40%, rgba(6,11,28,0.85) 100%)"
                        : "linear-gradient(to bottom, transparent 40%, rgba(37,99,235,0.55) 100%)",
                    }}
                  />

                  <span
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-semibold"
                    style={{
                      background: darkMode
                        ? "rgba(6,11,28,0.82)"
                        : "rgba(255,255,255,0.92)",
                      border: `1px solid ${
                        darkMode
                          ? `${post.tagColor}44`
                          : "rgba(37,99,235,0.22)"
                      }`,
                      color: darkMode ? post.tagColor : "#2563EB",
                      backdropFilter: "blur(6px)",
                      fontFamily: "Vazirmatn, sans-serif",
                    }}
                  >
                    {post.tag}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      style={{
                        color: darkMode ? "#64748b" : "#111827",
                        fontSize: "0.68rem",
                        fontFamily: "monospace",
                      }}
                    >
                      {post.date}
                    </span>

                    <span
                      style={{
                        width: 2,
                        height: 2,
                        borderRadius: "50%",
                        background: darkMode ? "#334155" : "#475569",
                        display: "inline-block",
                      }}
                    />

                    <span
                      style={{
                        color: darkMode ? "#64748b" : "#111827",
                        fontSize: "0.68rem",
                        fontFamily: "monospace",
                      }}
                    >
                      {post.readTime} مطالعه
                    </span>
                  </div>

                  <h3
                    className="font-bold mb-3 leading-relaxed"
                    style={{
                      color: darkMode ? "#fff" : "#111827",
                      fontSize: "0.95rem",
                      lineHeight: 1.65,
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    className="flex-1 mb-5"
                    style={{
                      color: darkMode ? "#94a3b8" : "#111827",
                      fontSize: "0.78rem",
                      lineHeight: 1.8,
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <div
                    className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
                    style={{
                      color: darkMode ? "#00E5FF" : "#2563EB",
                    }}
                  >
                    مطالعه گزارش

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
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>


        </div>
      </motion.div>
    </div>
  )
}


// "use client"

// import React, { useEffect } from "react"
// import { useState } from "react"
// import { useTheme } from "../../components/ThemeProvider"

// const blogPosts = [
//   {
//     tag: "بلاکچین",
//     tagColor: "#00E5FF",
//     date: "۱۴ شهریور ۱۴۰۳",
//     readTime: "۸ دقیقه",
//     title: "ردیابی ۲.۴ میلیون دلار تتر پس از هک کیف پول؛ تحلیل زنجیره تراکنش",
//     excerpt:
//       "در این گزارش فنی، روش‌های تجزیه‌وتحلیل گراف تراکنش روی شبکه TRC-20 را برای شناسایی آدرس‌های میانی و صرافی‌های off-ramp مرور می‌کنیم.",
//     img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&h=360&fit=crop&auto=format",
//     alt: "blockchain abstract dark cubes",
//   },
//   {
//     tag: "فارنزیک شبکه",
//     tagColor: "#A78BFA",
//     date: "۲ مرداد ۱۴۰۳",
//     readTime: "۱۲ دقیقه",
//     title: "چگونه یک گروه باج‌افزاری با ابزار OSINT شناسایی و تحویل مراجع قضایی شد",
//     excerpt:
//       "مستندسازی کامل پرونده‌ای که از تحلیل متادیتای ایمیل آغاز شد و به شناسایی هویت واقعی عامل اصلی در سه کشور مختلف ختم گردید.",
//     img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=360&fit=crop&auto=format",
//     alt: "teal LED panel cybersecurity",
//   },
//   {
//     tag: "مهندسی اجتماعی",
//     tagColor: "#F97316",
//     date: "۱۸ تیر ۱۴۰۳",
//     readTime: "۶ دقیقه",
//     title: "آناتومی یک حمله فیشینگ هدفمند علیه مدیران ارشد؛ تحلیل تکنیک‌های فریب",
//     excerpt:
//       "بررسی تکنیک‌های spear-phishing پیشرفته که در پنج پرونده اخیر پاراهور مشاهده شده، همراه با نشانگرهای شناسایی و روش‌های مقابله.",
//     img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&h=360&fit=crop&auto=format",
//     alt: "red padlock on keyboard",
//   },
// ]

// const IconShield = ({ color = "#00E5FF" }: { color?: string }) => (
//   <svg
//     width="32"
//     height="32"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={color}
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//     <path d="M9 12l2 2 4-4" />
//   </svg>
// )

// const IconSearch = ({ color = "#00E5FF" }: { color?: string }) => (
//   <svg
//     width="32"
//     height="32"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={color}
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="11" cy="11" r="8" />
//     <line x1="21" y1="21" x2="16.65" y2="16.65" />
//     <circle cx="11" cy="11" r="3" />
//     <line x1="11" y1="3" x2="11" y2="5" />
//     <line x1="11" y1="17" x2="11" y2="19" />
//   </svg>
// )

// const IconDocument = ({ color = "#00E5FF" }: { color?: string }) => (
//   <svg
//     width="32"
//     height="32"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={color}
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
//     <polyline points="14 2 14 8 20 8" />
//     <line x1="16" y1="13" x2="8" y2="13" />
//     <line x1="16" y1="17" x2="8" y2="17" />
//     <line x1="10" y1="9" x2="8" y2="9" />
//     <circle
//       cx="18"
//       cy="20"
//       r="3"
//       fill={color === "#00E5FF" ? "#0A1128" : "#FFFFFF"}
//       stroke={color}
//     />
//     <path d="M18 19v1l.5.5" strokeWidth="1" />
//   </svg>
// )

// const IconCrypto = ({ color = "#00E5FF" }: { color?: string }) => (
//   <svg
//     width="36"
//     height="36"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={color}
//     strokeWidth="1.4"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <path d="M9.5 9h4a1.5 1.5 0 010 3h-4v3h4.5a1.5 1.5 0 010 3H9.5" />
//     <line x1="12" y1="6" x2="12" y2="9" />
//     <line x1="12" y1="18" x2="12" y2="21" />
//   </svg>
// )

// const IconForensics = ({ color = "#00E5FF" }: { color?: string }) => (
//   <svg
//     width="36"
//     height="36"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={color}
//     strokeWidth="1.4"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M2 13.5V20a2 2 0 002 2h16a2 2 0 002-2v-6.5" />
//     <path d="M12 2L2 7l10 5 10-5-10-5z" />
//     <path d="M7 9.5v5" />
//     <path d="M17 9.5v5" />
//     <circle cx="12" cy="14" r="2.5" />
//     <line x1="12" y1="16.5" x2="12" y2="20" />
//   </svg>
// )

// const IconOsint = ({ color = "#00E5FF" }: { color?: string }) => (
//   <svg
//     width="36"
//     height="36"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={color}
//     strokeWidth="1.4"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <line x1="2" y1="12" x2="22" y2="12" />
//     <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
//     <circle
//       cx="12"
//       cy="12"
//       r="2"
//       fill={color}
//       opacity="0.4"
//     />
//   </svg>
// )

// const IconMalware = ({ color = "#00E5FF" }: { color?: string }) => (
//   <svg
//     width="36"
//     height="36"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={color}
//     strokeWidth="1.4"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="2" y="3" width="20" height="14" rx="2" />
//     <line x1="8" y1="21" x2="16" y2="21" />
//     <line x1="12" y1="17" x2="12" y2="21" />
//     <path d="M8 10l2-2 2 2 2-2 2 2" strokeWidth="1.8" />
//     <path d="M7 13h10" />
//   </svg>
// )

// const IconMail = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#00E5FF"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
//     <polyline points="22,6 12,13 2,6" />
//   </svg>
// )

// const IconTelegram = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#00E5FF"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M21.5 4.5L2.5 12l7 2.5" />
//     <path d="M9.5 14.5l2.5 5 3-8" />
//     <path d="M9.5 14.5l8-8" />
//   </svg>
// )

// const NetworkDecor = () => (
//   <svg
//     width="320"
//     height="280"
//     viewBox="0 0 320 280"
//     className="hero-float"
//     style={{ opacity: 0.35 }}
//   >
//     <defs>
//       <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
//         <stop offset="0%" stopColor="#00E5FF" stopOpacity="1" />
//         <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
//       </radialGradient>
//     </defs>

//     <line
//       x1="160"
//       y1="140"
//       x2="60"
//       y2="60"
//       stroke="rgba(0,229,255,0.3)"
//       strokeWidth="1"
//     />
//     <line
//       x1="160"
//       y1="140"
//       x2="260"
//       y2="60"
//       stroke="rgba(0,229,255,0.2)"
//       strokeWidth="1"
//     />
//     <line
//       x1="160"
//       y1="140"
//       x2="40"
//       y2="200"
//       stroke="rgba(0,229,255,0.25)"
//       strokeWidth="1"
//     />
//     <line
//       x1="160"
//       y1="140"
//       x2="280"
//       y2="200"
//       stroke="rgba(0,229,255,0.2)"
//       strokeWidth="1"
//     />
//     <line
//       x1="160"
//       y1="140"
//       x2="160"
//       y2="20"
//       stroke="rgba(0,229,255,0.35)"
//       strokeWidth="1"
//     />
//     <line
//       x1="60"
//       y1="60"
//       x2="160"
//       y2="20"
//       stroke="rgba(0,229,255,0.15)"
//       strokeWidth="1"
//     />
//     <line
//       x1="260"
//       y1="60"
//       x2="160"
//       y2="20"
//       stroke="rgba(0,229,255,0.15)"
//       strokeWidth="1"
//     />
//     <line
//       x1="40"
//       y1="200"
//       x2="100"
//       y2="250"
//       stroke="rgba(0,229,255,0.12)"
//       strokeWidth="1"
//     />
//     <line
//       x1="280"
//       y1="200"
//       x2="220"
//       y2="250"
//       stroke="rgba(0,229,255,0.12)"
//       strokeWidth="1"
//     />

//     <circle
//       cx="160"
//       cy="140"
//       r="8"
//       fill="rgba(0,229,255,0.2)"
//       stroke="#00E5FF"
//       strokeWidth="1.5"
//     />
//     <circle cx="160" cy="140" r="3" fill="#00E5FF" />

//     <circle
//       cx="60"
//       cy="60"
//       r="5"
//       fill="rgba(0,229,255,0.15)"
//       stroke="#00E5FF"
//       strokeWidth="1"
//     />
//     <circle cx="60" cy="60" r="2" fill="#00E5FF" />

//     <circle
//       cx="260"
//       cy="60"
//       r="5"
//       fill="rgba(0,229,255,0.15)"
//       stroke="#00E5FF"
//       strokeWidth="1"
//     />
//     <circle cx="260" cy="60" r="2" fill="#00E5FF" />

//     <circle
//       cx="40"
//       cy="200"
//       r="4"
//       fill="rgba(0,229,255,0.1)"
//       stroke="#00E5FF"
//       strokeWidth="1"
//     />
//     <circle cx="40" cy="200" r="1.5" fill="#00E5FF" />

//     <circle
//       cx="280"
//       cy="200"
//       r="4"
//       fill="rgba(0,229,255,0.1)"
//       stroke="#00E5FF"
//       strokeWidth="1"
//     />
//     <circle cx="280" cy="200" r="1.5" fill="#00E5FF" />

//     <circle
//       cx="160"
//       cy="20"
//       r="5"
//       fill="rgba(0,229,255,0.15)"
//       stroke="#00E5FF"
//       strokeWidth="1"
//     />
//     <circle cx="160" cy="20" r="2" fill="#00E5FF" />

//     <circle
//       cx="100"
//       cy="250"
//       r="3"
//       fill="rgba(0,229,255,0.1)"
//       stroke="#00E5FF"
//       strokeWidth="1"
//     />
//     <circle
//       cx="220"
//       cy="250"
//       r="3"
//       fill="rgba(0,229,255,0.1)"
//       stroke="#00E5FF"
//       strokeWidth="1"
//     />
//   </svg>
// )

// export default function page() {
//   const { darkMode } = useTheme()
//   const [menuOpen, setMenuOpen] = useState(false)

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark")
//     } else {
//       document.documentElement.classList.remove("dark")
//     }
//   }, [darkMode])

//   const iconColor = darkMode ? "#00E5FF" : "#6E1A37"

//   return (
//     <div
//       className="min-h-screen pt-20 cyber-grid-bg"
//       style={{
//         background: darkMode ? "#0A1128" : "#FFFFFF",
//         color: darkMode ? "#E2E8F0" : "#4B2E2B",
//       }}
//     >
//       {menuOpen && (
//         <div
//           className="md:hidden flex flex-col gap-4 px-6 py-4"
//           style={{
//             background: darkMode ? "rgba(10,17,40,0.97)" : "#FFFFFF",
//             borderBottom: darkMode
//               ? "1px solid rgba(0,229,255,0.1)"
//               : "1px solid rgba(169,139,118,0.35)",
//           }}
//         >
//           {["خدمات ما", "وبلاگ", "درباره ما", "تماس با ما"].map((item) => (
//             <a
//               key={item}
//               href="#"
//               className="nav-link text-base"
//               onClick={() => setMenuOpen(false)}
//             >
//               {item}
//             </a>
//           ))}
//         </div>
//       )}

//       <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-0 md:pt-32 md:pb-16">
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: darkMode
//               ? "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 70%)"
//               : "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(110,26,55,0.045) 0%, rgba(169,139,118,0.03) 38%, transparent 70%)",
//           }}
//         />

//         <div
//           className="absolute opacity-30 pointer-events-none hidden lg:block"
//           style={{ top: "5%", left: "5%" }}
//         >
//           <NetworkDecor />
//         </div>

//         <div
//           className="absolute opacity-20 pointer-events-none hidden lg:block"
//           style={{
//             top: "10%",
//             right: "5%",
//             transform: "scaleX(-1)",
//           }}
//         >
//           <NetworkDecor />
//         </div>

//         <div className="relative z-10 w-[90%] max-w-4xl mx-auto">
//           <div
//             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs"
//             style={{
//               background: darkMode
//                 ? "rgba(0,229,255,0.07)"
//                 : "rgba(169,139,118,0.10)",
//               border: darkMode
//                 ? "1px solid rgba(0,229,255,0.2)"
//                 : "1px solid rgba(110,26,55,0.25)",
//               color: darkMode ? "#00E5FF" : "#6E1A37",
//             }}
//           >
//             <span
//               className="node-dot pulse-dot"
//               style={{
//                 width: 6,
//                 height: 6,
//                 borderRadius: "50%",
//                 background: darkMode ? "#00E5FF" : "#6E1A37",
//                 display: "inline-block",
//                 boxShadow: darkMode
//                   ? undefined
//                   : "0 0 7px rgba(110,26,55,0.3)",
//               }}
//             />
//             <span className="data-label">
//               سیستم آنلاین // PARAHOOR ACTIVE
//             </span>
//           </div>

//           <h1
//             className="glow-text font-black leading-tight mb-6"
//             style={{
//               fontSize: "clamp(2rem, 5vw, 3.5rem)",
//               color: darkMode ? "#ffffff" : "#4B2E2B",
//               lineHeight: "1.3",
//               fontWeight: 900,
//               textShadow: darkMode
//                 ? undefined
//                 : "0 0 18px rgba(110,26,55,0.10)",
//             }}
//           >
//             هیچ مجرمی در دنیای دیجیتال
//             <br />
//             <span
//               style={{
//                 color: darkMode ? "#00E5FF" : "#6E1A37",
//                 textShadow: darkMode
//                   ? undefined
//                   : "0 0 18px rgba(110,26,55,0.12)",
//               }}
//             >
//               بی‌ردپا
//             </span>{" "}
//             نیست.
//           </h1>

//           <p
//             className="max-w-2xl mx-auto mb-10 leading-relaxed"
//             style={{
//               color: darkMode ? "#94A3B8" : "#4B2E2B",
//               fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
//               fontWeight: 400,
//             }}
//           >
//             پاراهور؛ آژانس خصوصی تحقیقات سایبری و فارنزیک. ما شواهد را کشف،
//             جریان‌های مالی را ردیابی و هویت‌های پنهان را آشکار می‌کنیم.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center w-[80%] mx-auto">
//             <a
//               href="mailto:secure@parahoor.io"
//               className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold transition-all duration-300"
//               style={{
//                 background: darkMode ? "#EF4444" : "#6E1A37",
//                 color: "#ffffff",
//                 border: darkMode
//                   ? "1px solid rgba(239, 68, 68, 0.6)"
//                   : "1px solid rgba(110,26,55,0.6)",
//                 boxShadow: darkMode
//                   ? "0 0 15px rgba(239,68,68,0.35)"
//                   : "0 0 15px rgba(110,26,55,0.22)",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.boxShadow = darkMode
//                   ? "0 0 22px rgba(239,68,68,0.55)"
//                   : "0 0 22px rgba(110,26,55,0.32)"

//                 if (!darkMode) {
//                   e.currentTarget.style.background = "#4B2E2B"
//                   e.currentTarget.style.borderColor = "#4B2E2B"
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.boxShadow = darkMode
//                   ? "0 0 15px rgba(239,68,68,0.35)"
//                   : "0 0 15px rgba(110,26,55,0.22)"

//                 if (!darkMode) {
//                   e.currentTarget.style.background = "#6E1A37"
//                   e.currentTarget.style.borderColor = "rgba(110,26,55,0.6)"
//                 }
//               }}
//             >
//               گزارش فوری حادثه
//             </a>

//             <a
//               href="#"
//               className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-300"
//               style={{
//                 background: darkMode
//                   ? "rgba(0,229,255,0.07)"
//                   : "rgba(255,255,255,0.95)",
//                 color: darkMode ? "#00E5FF" : "#6E1A37",
//                 border: darkMode
//                   ? "1px solid rgba(0,229,255,0.25)"
//                   : "1px solid rgba(169,139,118,0.45)",
//                 boxShadow: darkMode
//                   ? "0 0 15px rgba(6,182,212,0.35)"
//                   : "0 0 15px rgba(110,26,55,0.10)",
//               }}
//               onMouseEnter={(e) => {
//                 if (!darkMode) {
//                   e.currentTarget.style.borderColor = "#6E1A37"
//                   e.currentTarget.style.background = "rgba(110,26,55,0.05)"
//                   e.currentTarget.style.boxShadow =
//                     "0 8px 25px rgba(110,26,55,0.10)"
//                 } else {
//                   e.currentTarget.style.boxShadow =
//                     "0 0 22px rgba(6,182,212,0.55)"
//                   e.currentTarget.style.borderColor =
//                     "rgba(0,229,255,0.4)"
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (!darkMode) {
//                   e.currentTarget.style.borderColor =
//                     "rgba(169,139,118,0.45)"
//                   e.currentTarget.style.background =
//                     "rgba(255,255,255,0.95)"
//                   e.currentTarget.style.boxShadow =
//                     "0 0 15px rgba(110,26,55,0.10)"
//                 } else {
//                   e.currentTarget.style.boxShadow =
//                     "0 0 15px rgba(6,182,212,0.35)"
//                   e.currentTarget.style.borderColor =
//                     "rgba(0,229,255,0.25)"
//                 }
//               }}
//             >
//               مشاوره رایگان اولیه
//             </a>
//           </div>

//           <div className="scan-line mt-16 w-48 mx-auto opacity-60" />
//         </div>
//       </section>

//       <section className="px-6 py-20 md:px-12" id="process">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-16">
//             <span className="data-label block mb-3">
//               INVESTIGATION PIPELINE
//             </span>

//             <h2
//               className="font-bold"
//               style={{
//                 fontSize: "clamp(1.4rem, 3vw, 2rem)",
//                 color: darkMode ? "#ffffff" : "#4B2E2B",
//               }}
//             >
//               مسیر بررسی پرونده شما
//             </h2>

//             <div className="scan-line w-24 mx-auto mt-4" />

//             <div
//               className="hidden md:block w-20 mt-4 flex-shrink-0 mx-auto"
//               style={{
//                 height: "1px",
//                 background: darkMode
//                   ? "linear-gradient(to right, rgba(0,229,255,0.1), rgba(0,229,255,1), rgba(31, 74, 79, 0.1))"
//                   : "linear-gradient(to right, rgba(169,139,118,0.1), rgba(110,26,55,1), rgba(169,139,118,0.1))",
//               }}
//             />
//           </div>

//           <div className="flex flex-col md:flex-row items-center gap-0">
//             {[
//               {
//                 icon: <IconDocument color={iconColor} />,
//                 step: "STEP 01",
//                 title: "ثبت اطلاعات اولیه",
//                 text: "دریافت شرح حادثه، اسناد اولیه، و راه‌اندازی کانال ارتباطی امن",
//               },
//               {
//                 icon: <IconSearch color={iconColor} />,
//                 step: "STEP 02",
//                 title: "فارنزیک و امکان‌سنجی",
//                 text: "تحلیل فنی، استخراج داده، و ارزیابی ادله دیجیتال با ابزارهای پیشرفته",
//               },
//               {
//                 icon: <IconShield color={iconColor} />,
//                 step: "STEP 03",
//                 title: "ارائه ادله دادگاه‌پسند",
//                 text: "تهیه گزارش رسمی، مستندسازی زنجیره حضانت، و آمادگی برای مراجع قضایی",
//               },
//             ].map((step, index) => (
//               <React.Fragment key={index}>
//                 <div
//                   className={`glass-card w-full max-w-[310px] md:max-w-none md:flex-1 h-[340px] flex flex-col justify-center items-center p-6 md:p-8 text-center group transition-all duration-300 rounded-2xl ${
//                     darkMode
//                       ? "border border-cyan-500/30 hover:border-cyan-500 bg-cyan-900/10 hover:bg-cyan-800/15"
//                       : ""
//                   }`}
//                   style={
//                     darkMode
//                       ? undefined
//                       : {
//                           border: "1px solid rgba(169,139,118,0.35)",
//                           background: "#FFFFFF",
//                           transition:
//                             "border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease",
//                         }
//                   }
//                   onMouseEnter={(e) => {
//                     if (!darkMode) {
//                       e.currentTarget.style.borderColor = "#6E1A37"
//                       e.currentTarget.style.boxShadow =
//                         "0 16px 40px rgba(75,46,43,0.10)"
//                       e.currentTarget.style.transform = "translateY(-3px)"
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!darkMode) {
//                       e.currentTarget.style.borderColor =
//                         "rgba(169,139,118,0.35)"
//                       e.currentTarget.style.boxShadow = "none"
//                       e.currentTarget.style.transform = "none"
//                     }
//                   }}
//                 >
//                   <div className="mb-4 flex justify-center">
//                     <div
//                       className="w-16 h-16 rounded-full flex items-center justify-center"
//                       style={{
//                         background: darkMode
//                           ? "rgba(0,229,255,0.08)"
//                           : "#FFFFFF",
//                         border: darkMode
//                           ? "1px solid rgba(0,229,255,0.25)"
//                           : "1px solid rgba(169,139,118,0.4)",
//                         boxShadow: darkMode
//                           ? undefined
//                           : "0 4px 18px rgba(75,46,43,0.06)",
//                       }}
//                     >
//                       {step.icon}
//                     </div>
//                   </div>

//                   <span
//                     className="step-number block mb-2"
//                     style={darkMode ? undefined : { color: "#6E1A37" }}
//                   >
//                     {step.step}
//                   </span>

//                   <h3
//                     className="font-bold text-base mb-2"
//                     style={{ color: darkMode ? "#ffffff" : "#4B2E2B" }}
//                   >
//                     {step.title}
//                   </h3>

//                   <p
//                     style={{
//                       color: darkMode ? "#64748B" : "#4B2E2B",
//                       fontSize: "0.82rem",
//                       lineHeight: 1.7,
//                     }}
//                   >
//                     {step.text}
//                   </p>
//                 </div>

//                 {index < 2 && (
//                   <>
//                     <div
//                       className="hidden md:block w-12 flex-shrink-0"
//                       style={{
//                         height: 1,
//                         background: darkMode
//                           ? index === 0
//                             ? "linear-gradient(1270deg, rgba(0,229,255,0.1), rgb(0, 229, 255))"
//                             : "linear-gradient(270deg, rgba(0,229,255,0.1), rgb(0, 229, 255))"
//                           : index === 0
//                             ? "linear-gradient(1270deg, rgba(169,139,118,0.1), rgb(110,26,55))"
//                             : "linear-gradient(270deg, rgba(169,139,118,0.1), rgb(110,26,55))",
//                       }}
//                     />

//                     <div
//                       className="md:hidden h-6 w-px mx-auto"
//                       style={{
//                         background: darkMode
//                           ? "linear-gradient(180deg, rgba(0,229,255,0.1), rgb(0, 229, 255))"
//                           : "linear-gradient(180deg, rgba(169,139,118,0.1), rgb(110,26,55))",
//                       }}
//                     />
//                   </>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="px-6 py-20 md:px-12" id="services">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-16">
//             <span className="data-label block mb-3">
//               SPECIALIZATION DOMAINS
//             </span>

//             <h2
//               className="font-bold"
//               style={{
//                 fontSize: "clamp(1.4rem, 3vw, 2rem)",
//                 color: darkMode ? "#ffffff" : "#4B2E2B",
//               }}
//             >
//               حوزه‌های تخصصی پاراهور
//             </h2>

//             <div className="scan-line w-24 mx-auto mt-4" />
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//             {[
//               {
//                 icon: <IconCrypto color={iconColor} />,
//                 label: "CRYPTO TRACE",
//                 title: "ردیابی رمزارز و تراکنش‌ها",
//                 text: "تحلیل زنجیره بلاک، ردیابی کیف پول‌ها، کشف مسیرهای پولشویی و شناسایی تراکنش‌های مشکوک در شبکه‌های رمزارز",
//                 meta: "Bitcoin / Ethereum / Tron / USDT",
//               },
//               {
//                 icon: <IconForensics color={iconColor} />,
//                 label: "DIGITAL FORENSICS",
//                 title: "فارنزیک و کشف ادله دیجیتال",
//                 text: "بازیابی داده‌های حذف‌شده، تحلیل لاگ‌ها، فارنزیک موبایل و کامپیوتر، و استخراج ادله معتبر برای دادگاه",
//                 meta: "iOS / Android / Windows / Linux",
//               },
//               {
//                 icon: <IconOsint color={iconColor} />,
//                 label: "OSINT / IDENTITY",
//                 title: "اوسینت (OSINT) و کشف هویت",
//                 text: "کشف هویت واقعی افراد ناشناس، تحلیل رد پای دیجیتال، جمع‌آوری اطلاعات منابع باز و شبکه‌های اجتماعی",
//                 meta: "Social / Dark Web / Registry",
//               },
//               {
//                 icon: <IconMalware color={iconColor} />,
//                 label: "MALWARE ANALYSIS",
//                 title: "بررسی سیستم‌های آلوده",
//                 text: "شناسایی بدافزارها، تحلیل نقاط ورود هکرها، بررسی میزان خسارت و مستندسازی حملات سایبری",
//                 meta: "APT / Ransomware / Spyware",
//               },
//             ].map((service, index) => (
//               <div
//                 key={index}
//                 className={`glass-card p-7 group cursor-default rounded-2xl transition-all duration-300 ${
//                   darkMode
//                     ? "border border-cyan-500/30 hover:border-cyan-500 bg-cyan-900/10 hover:bg-cyan-800/15"
//                     : ""
//                 }`}
//                 style={
//                   darkMode
//                     ? undefined
//                     : {
//                         border: "1px solid rgba(169,139,118,0.35)",
//                         background: "#FFFFFF",
//                         transition:
//                           "border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease, background 300ms ease",
//                       }
//                 }
//                 onMouseEnter={(e) => {
//                   if (!darkMode) {
//                     e.currentTarget.style.borderColor = "#6E1A37"
//                     e.currentTarget.style.background = "#FFFFFF"
//                     e.currentTarget.style.boxShadow =
//                       "0 16px 40px rgba(75,46,43,0.10)"
//                     e.currentTarget.style.transform = "translateY(-3px)"
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!darkMode) {
//                     e.currentTarget.style.borderColor =
//                       "rgba(169,139,118,0.35)"
//                     e.currentTarget.style.background = "#FFFFFF"
//                     e.currentTarget.style.boxShadow = "none"
//                     e.currentTarget.style.transform = "none"
//                   }
//                 }}
//               >
//                 <div className="flex items-start gap-4">
//                   <div
//                     className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
//                     style={{
//                       background: darkMode
//                         ? "rgba(0,229,255,0.06)"
//                         : "#FFFFFF",
//                       border: darkMode
//                         ? "1px solid rgba(0,229,255,0.2)"
//                         : "1px solid rgba(169,139,118,0.4)",
//                     }}
//                   >
//                     {service.icon}
//                   </div>

//                   <div>
//                     <span
//                       className="data-label block mb-1.5"
//                       style={darkMode ? undefined : { color: "#6E1A37" }}
//                     >
//                       {service.label}
//                     </span>

//                     <h3
//                       className="font-bold mb-2"
//                       style={{
//                         color: darkMode ? "#ffffff" : "#4B2E2B",
//                         fontSize: "1rem",
//                       }}
//                     >
//                       {service.title}
//                     </h3>

//                     <p
//                       style={{
//                         color: darkMode ? "#64748B" : "#4B2E2B",
//                         fontSize: "0.82rem",
//                         lineHeight: 1.75,
//                       }}
//                     >
//                       {service.text}
//                     </p>
//                   </div>
//                 </div>

//                 <div
//                   className="mt-5 h-px"
//                   style={{
//                     background: darkMode
//                       ? "linear-gradient(90deg, rgba(0,229,255,0.3), transparent)"
//                       : "linear-gradient(90deg, rgba(110,26,55,0.28), rgba(169,139,118,0.25), transparent)",
//                   }}
//                 />

//                 <div className="mt-3 flex items-center gap-2">
//                   <span
//                     className="node-dot"
//                     style={{
//                       width: 5,
//                       height: 5,
//                       borderRadius: "50%",
//                       background: darkMode ? "#00E5FF" : "#6E1A37",
//                       display: "inline-block",
//                     }}
//                   />

//                   <span
//                     style={{
//                       color: darkMode
//                         ? "rgba(0,229,255,0.6)"
//                         : "#A98B76",
//                       fontSize: "0.72rem",
//                       fontFamily: "monospace",
//                     }}
//                   >
//                     {service.meta}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-20 px-6 md:px-12">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 mb-2 justify-center">
//               <span
//                 style={{
//                   width: 6,
//                   height: 6,
//                   borderRadius: "50%",
//                   background: darkMode ? "#00E5FF" : "#6E1A37",
//                   display: "inline-block",
//                   boxShadow: darkMode
//                     ? "0 0 7px rgba(0,229,255,0.9)"
//                     : "0 0 7px rgba(110,26,55,0.25)",
//                 }}
//               />

//               <span
//                 style={{
//                   fontFamily: "monospace",
//                   fontSize: "0.62rem",
//                   color: darkMode
//                     ? "rgba(0,229,255,0.5)"
//                     : "#A98B76",
//                   letterSpacing: "0.18em",
//                 }}
//               >
//                 FORENSIC RADAR
//               </span>
//             </div>

//             <h2
//               className="text-2xl md:text-3xl font-black"
//               style={{
//                 color: darkMode ? "#fff" : "#4B2E2B",
//               }}
//             >
//               آخرین گزارش‌های{" "}
//               <span style={{ color: darkMode ? "#00E5FF" : "#6E1A37" }}>
//                 میدانی
//               </span>
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {blogPosts.map((post, i) => (
//               <a
//                 key={i}
//                 href="#"
//                 className={`group flex flex-col rounded-2xl overflow-hidden transition-all ${
//                   darkMode ? "bg-cyan-900/10" : ""
//                 }`}
//                 style={{
//                   border: darkMode
//                     ? "1px solid rgba(255,255,255,0.06)"
//                     : "1px solid rgba(169,139,118,0.3)",
//                   textDecoration: "none",
//                   background: darkMode ? undefined : "#FFFFFF",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.borderColor = darkMode
//                     ? "rgba(0,229,255,0.22)"
//                     : "#6E1A37"

//                   e.currentTarget.style.transform = "translateY(-3px)"

//                   e.currentTarget.style.boxShadow = darkMode
//                     ? "0 16px 48px rgba(0,0,0,0.5)"
//                     : "0 16px 48px rgba(75,46,43,0.10)"
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.borderColor = darkMode
//                     ? "rgba(255,255,255,0.06)"
//                     : "rgba(169,139,118,0.3)"

//                   e.currentTarget.style.transform = "none"
//                   e.currentTarget.style.boxShadow = "none"
//                 }}
//               >
//                 <div
//                   className="relative overflow-hidden"
//                   style={{
//                     height: 180,
//                     background: darkMode ? "#0A1128" : "#FFFFFF",
//                   }}
//                 >
//                   <img
//                     src={post.img}
//                     alt={post.alt}
//                     className="w-full h-full object-cover transition-transform duration-500"
//                     style={{ filter: "brightness(0.75) saturate(0.8)" }}
//                     onMouseEnter={(e) =>
//                       ((e.target as HTMLImageElement).style.transform =
//                         "scale(1.04)")
//                     }
//                     onMouseLeave={(e) =>
//                       ((e.target as HTMLImageElement).style.transform =
//                         "scale(1)")
//                     }
//                   />

//                   <div
//                     className="absolute inset-0"
//                     style={{
//                       background: darkMode
//                         ? "linear-gradient(to bottom, transparent 40%, rgba(6,11,28,0.85) 100%)"
//                         : "linear-gradient(to bottom, transparent 40%, rgba(110,26,55,0.55) 100%)",
//                     }}
//                   />

//                   <span
//                     className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-semibold"
//                     style={{
//                       background: darkMode
//                         ? "rgba(6,11,28,0.82)"
//                         : "rgba(255,255,255,0.92)",
//                       border: `1px solid ${
//                         darkMode
//                           ? `${post.tagColor}44`
//                           : "rgba(110,26,55,0.35)"
//                       }`,
//                       color: darkMode ? post.tagColor : "#6E1A37",
//                       backdropFilter: "blur(6px)",
//                       fontFamily: "Vazirmatn, sans-serif",
//                     }}
//                   >
//                     {post.tag}
//                   </span>
//                 </div>

//                 <div className="flex flex-col flex-1 p-5">
//                   <div className="flex items-center gap-3 mb-3">
//                     <span
//                       style={{
//                         color: darkMode ? "#64748b" : "#A98B76",
//                         fontSize: "0.68rem",
//                         fontFamily: "monospace",
//                       }}
//                     >
//                       {post.date}
//                     </span>

//                     <span
//                       style={{
//                         width: 2,
//                         height: 2,
//                         borderRadius: "50%",
//                         background: darkMode ? "#334155" : "#A98B76",
//                         display: "inline-block",
//                       }}
//                     />

//                     <span
//                       style={{
//                         color: darkMode ? "#64748b" : "#A98B76",
//                         fontSize: "0.68rem",
//                         fontFamily: "monospace",
//                       }}
//                     >
//                       {post.readTime} مطالعه
//                     </span>
//                   </div>

//                   <h3
//                     className="font-bold mb-3 leading-relaxed"
//                     style={{
//                       color: darkMode ? "#fff" : "#4B2E2B",
//                       fontSize: "0.95rem",
//                       lineHeight: 1.65,
//                     }}
//                   >
//                     {post.title}
//                   </h3>

//                   <p
//                     className="flex-1 mb-5"
//                     style={{
//                       color: darkMode ? "#94a3b8" : "#4B2E2B",
//                       fontSize: "0.78rem",
//                       lineHeight: 1.8,
//                     }}
//                   >
//                     {post.excerpt}
//                   </p>

//                   <div
//                     className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
//                     style={{
//                       color: darkMode ? "#00E5FF" : "#6E1A37",
//                     }}
//                   >
//                     مطالعه گزارش

//                     <svg
//                       width="12"
//                       height="12"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <line x1="5" y1="12" x2="19" y2="12" />
//                       <polyline points="12 5 19 12 12 19" />
//                     </svg>
//                   </div>
//                 </div>
//               </a>
//             ))}
//           </div>

//           <div className="text-center mt-10">
//             <a
//               href="#"
//               className="inline-flex items-center gap-2 px-16 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300"
//               style={{
//                 border: darkMode
//                   ? "1px solid rgba(0,229,255,0.3)"
//                   : "1px solid rgba(169,139,118,0.45)",
//                 background: darkMode
//                   ? "rgba(0,229,255,0.07)"
//                   : "#FFFFFF",
//                 color: darkMode ? "#E2E8F0" : "#4B2E2B",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.borderColor = darkMode
//                   ? "#155e75"
//                   : "#6E1A37"

//                 e.currentTarget.style.background = darkMode
//                   ? "rgba(8,47,73,0.3)"
//                   : "rgba(110,26,55,0.05)"

//                 e.currentTarget.style.boxShadow = darkMode
//                   ? "none"
//                   : "0 8px 25px rgba(110,26,55,0.10)"
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.borderColor = darkMode
//                   ? "rgba(0,229,255,0.3)"
//                   : "rgba(169,139,118,0.45)"

//                 e.currentTarget.style.background = darkMode
//                   ? "rgba(0,229,255,0.07)"
//                   : "#FFFFFF"

//                 e.currentTarget.style.boxShadow = "none"
//               }}
//             >
//               <span>مشاهده همه گزارش‌ها</span>

//               <svg
//                 width="13"
//                 height="13"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2.2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="19" y1="12" x2="5" y2="12" />
//                 <polyline points="12 19 5 12 12 5" />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }