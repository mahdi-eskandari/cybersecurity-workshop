


"use client"

import React, { useEffect, type ReactNode } from "react"
import { useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { useTheme } from "../../../components/ThemeProvider"
import { motion } from "framer-motion"
import { EmergencyModal } from "../../../components/CrisisReportForm"
import { createPortal } from "react-dom"
import { renderHighlightedTitle } from "@/lib/highlightTitle";





/* ─────────────────────────────────────────────────────────────
   HERO IMAGE FALLBACK
───────────────────────────────────────────────────────────── */

const ArticleThumb = ({
  accent = "#00E5FF",
  seed = 0,
}: {
  accent?: string;
  seed?: number;
}) => {
  const { darkMode } = useTheme();
  const offsets = [0, 60, 120, 30, 90, 150];
  const ox = offsets[seed % offsets.length];

  return (
    <svg width="100%" height="100%" viewBox="0 0 340 180" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`article-gradient-${seed}`} cx="40%" cy="50%" r="55%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.14" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="340" height="180" fill={darkMode ? "#060B19" : "#F1F5FB"} />
      <rect width="340" height="180" fill={`url(#article-gradient-${seed})`} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={`horizontal-${i}`} x1="0" y1={i * 36} x2="340" y2={i * 36}
          stroke={darkMode ? "rgba(0,229,255,0.04)" : "rgba(30,58,138,0.05)"} strokeWidth="1" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <line key={`vertical-${i}`} x1={i * 42} y1="0" x2={i * 42} y2="180"
          stroke={darkMode ? "rgba(0,229,255,0.04)" : "rgba(30,58,138,0.05)"} strokeWidth="1" />
      ))}
      <path
        d={`M${40 + ox} 90 L${100 + ox} 60 L${160 + ox} 90 L${220 + ox} 50 L${280 + ox} 80`}
        stroke={accent} strokeWidth="1.5" fill="none" opacity="0.4"
      />
      {[[100 + ox, 60], [160 + ox, 90], [220 + ox, 50]].map(([x, y], index) => (
        <g key={index}>
          <circle cx={x} cy={y} r="12" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <circle cx={x} cy={y} r="4" fill={accent} fillOpacity="0.6" />
        </g>
      ))}
      <rect x="16" y="154" width="60" height="3" rx="1.5" fill={accent} fillOpacity="0.15" />
      <rect x="82" y="154" width="40" height="3" rx="1.5" fill={darkMode ? "rgba(255,255,255,0.07)" : "rgba(30,58,138,0.08)"} />
    </svg>
  );
};


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

const IconUser = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#475569] "
  >
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5" />
  </svg>
);



const HeroImageFallback = ({
  darkMode,
}: {
  darkMode: boolean;
}) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 1000 380"
    preserveAspectRatio="xMidYMid slice"
    style={{ display: "block" }}
  >
    <defs>
      <radialGradient id="hg1" cx="25%" cy="50%" r="55%">
        <stop
          offset="0%"
          stopColor={
            darkMode
              ? "rgba(0,229,255,0.1)"
              : "rgba(30,58,138,0.08)"
          }
        />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>

      <radialGradient id="hg2" cx="75%" cy="40%" r="45%">
        <stop
          offset="0%"
          stopColor={
            darkMode
              ? "rgba(239,68,68,0.07)"
              : "rgba(30,58,138,0.04)"
          }
        />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>

      <filter id="hblur">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>

    <rect
      width="1000"
      height="380"
      fill={darkMode ? "#050C1E" : "#F8FAFC"}
    />

    <rect width="1000" height="380" fill="url(#hg1)" />
    <rect width="1000" height="380" fill="url(#hg2)" />

    {Array.from({ length: 14 }).map((_, i) => (
      <line
        key={`h${i}`}
        x1="0"
        y1={i * 28}
        x2="1000"
        y2={i * 28}
        stroke={
          darkMode
            ? "rgba(0,229,255,0.035)"
            : "rgba(30,58,138,0.045)"
        }
        strokeWidth="1"
      />
    ))}

    {Array.from({ length: 34 }).map((_, i) => (
      <line
        key={`v${i}`}
        x1={i * 30}
        y1="0"
        x2={i * 30}
        y2="380"
        stroke={
          darkMode
            ? "rgba(0,229,255,0.035)"
            : "rgba(30,58,138,0.045)"
        }
        strokeWidth="1"
      />
    ))}

    <path
      d="M80 190 L200 140 L340 190 L480 120 L600 170 L740 110 L880 160 L960 140"
      stroke={
        darkMode
          ? "rgba(0,229,255,0.4)"
          : "rgba(30,58,138,0.3)"
      }
      strokeWidth="1.5"
      fill="none"
      filter="url(#hblur)"
    />

    <path
      d="M80 190 L200 140 L340 190 L480 120 L600 170 L740 110 L880 160 L960 140"
      stroke={
        darkMode
          ? "rgba(0,229,255,0.2)"
          : "rgba(30,58,138,0.18)"
      }
      strokeWidth="1"
      fill="none"
    />

    {[
      { x: 200, y: 140 },
      { x: 340, y: 190 },
      { x: 480, y: 120 },
      { x: 600, y: 170 },
      { x: 740, y: 110 },
      { x: 880, y: 160 },
    ].map((p, i) => (
      <g key={i}>
        <rect
          x={p.x - 20}
          y={p.y - 22}
          width="40"
          height="44"
          rx="4"
          fill={
            darkMode
              ? "rgba(0,229,255,0.05)"
              : "rgba(30,58,138,0.04)"
          }
          stroke={
            darkMode
              ? "rgba(0,229,255,0.3)"
              : "rgba(30,58,138,0.22)"
          }
          strokeWidth="1"
        />

        <rect
          x={p.x - 12}
          y={p.y - 14}
          width="24"
          height="3"
          rx="1"
          fill={
            darkMode
              ? "rgba(0,229,255,0.3)"
              : "rgba(30,58,138,0.25)"
          }
        />

        <rect
          x={p.x - 12}
          y={p.y - 7}
          width="17"
          height="2.5"
          rx="1"
          fill={
            darkMode
              ? "rgba(0,229,255,0.18)"
              : "rgba(30,58,138,0.16)"
          }
        />

        <rect
          x={p.x - 12}
          y={p.y - 1}
          width="20"
          height="2.5"
          rx="1"
          fill={
            darkMode
              ? "rgba(0,229,255,0.15)"
              : "rgba(30,58,138,0.13)"
          }
        />

        <circle
          cx={p.x}
          cy={p.y - 22}
          r="3.5"
          fill={darkMode ? "#00E5FF" : "#1E3A8A"}
          opacity="0.7"
        />
      </g>
    ))}

    <circle
      cx="480"
      cy="120"
      r="22"
      fill="transparent"
      stroke={
        darkMode
          ? "rgba(239,68,68,0.2)"
          : "rgba(30,58,138,0.15)"
      }
      strokeWidth="1"
    />

    <circle
      cx="480"
      cy="120"
      r="14"
      fill="transparent"
      stroke={
        darkMode
          ? "rgba(239,68,68,0.3)"
          : "rgba(30,58,138,0.2)"
      }
      strokeWidth="1"
    />

    <circle
      cx="480"
      cy="120"
      r="5"
      fill={
        darkMode
          ? "rgba(239,68,68,0.5)"
          : "rgba(30,58,138,0.35)"
      }
      stroke={
        darkMode
          ? "rgba(239,68,68,0.8)"
          : "rgba(30,58,138,0.55)"
      }
      strokeWidth="1.5"
    />

    <text
      x="20"
      y="368"
      fontSize="8"
      fill={
        darkMode
          ? "rgba(0,229,255,0.25)"
          : "rgba(30,58,138,0.25)"
      }
      fontFamily="monospace"
    >
      PARAHOOR FORENSICS // CASE ANALYSIS
    </text>
  </svg>
);


type Post = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  status: "draft" | "published" | string;

  createdAt: string;
  updatedAt?: string;

  featuredImage?: string;
  featuredImageAlt?: string;

  tag?: string;
  tagColor?: string;
  categoryId: string;
  author?: string;

  date?: string;
  readingTime?: string;
  excerpt?: string;
};

type Media = {
  id: string;
  name: string;
  url: string;
  alt?: string;
  mimeType: string;
  size?: number;
  createdAt?: string;
  updatedAt?: string;
};



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


const IconDot = ({
  size = 7,
  glow = true,
  color = "#00E5FF",
  glowColor = "rgba(0,229,255,0.9)",
}: {
  size?: number;
  glow?: boolean;
  color?: string;
  glowColor?: string;
}) => (
  <span
    style={{
      display: "inline-block",
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      boxShadow: glow ? `0 0 8px ${glowColor}` : "none",
      flexShrink: 0,
    }}
  />
);

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



const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </svg>
);

const IconChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const IconCopy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="m5 12 4 4L19 6" />
  </svg>
);

const IconSave = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
    <path d="M17 21v-8H7v8M7 3v5h8" />
  </svg>
);

const IconForward = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="m13 5 7 7-7 7" />
    <path d="M20 12H4" />
  </svg>
);

const IconSms = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 8.8 8.8 0 0 1-4-.95L3 21l1.95-4.8A8.38 8.38 0 1 1 21 11.5Z" />
    <path d="M8 12h.01M12 12h.01M16 12h.01" />
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const IconAdmin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M20 21a8 8 0 0 0-16 0" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconBot = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <rect x="4" y="7" width="16" height="12" rx="3" />
    <path d="M12 3v4M8 12h.01M16 12h.01M8 16h8" />
  </svg>
);

const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const IconDashboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IconCases = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M4 7h16v13H4z" />
    <path d="M8 7V5h8v2M8 12h8M8 16h5" />
  </svg>
);

const IconSettings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
    <path d="m19.4 15 .1.1a2 2 0 0 1-2.8 2.8l-.1-.1a2 2 0 0 0-3.4 1.4V19a2 2 0 0 1-4 0v-.2a2 2 0 0 0-3.4-1.4l-.1.1A2 2 0 1 1 3 14.7l.1-.1A2 2 0 0 0 1.7 11H1.5a2 2 0 0 1 0-4h.2a2 2 0 0 0 1.4-3.4L3 3.5A2 2 0 1 1 5.8.7l.1.1A2 2 0 0 0 9.3.2V0a2 2 0 0 1 4 0v.2a2 2 0 0 0 3.4 1.4l.1-.1A2 2 0 1 1 19.6 4l-.1.1A2 2 0 0 0 20.9 7h.2a2 2 0 0 1 0 4h-.2a2 2 0 0 0-1.5 4Z" />
  </svg>
);

const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M10 17l5-5-5-5M15 12H3" />
    <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
  </svg>
);



const successfulCases = [
  {
    number: "۰۱",
    category: "کشف هویت",
    title: "شناسایی عامل فروش اطلاعات بانکی  ",
    result: "جلوگیری از نشت و دستگیری متهم",
    description:
     "با بهره‌گیری از تکنیک‌های پیشرفته اوسینت، هویت ناشناس فروشنده دیتای بانکی در دارک‌وب کشف و جهت پیگرد قضایی مستندسازی شد.",
    tags: ["کشف هویت", "نشت اطلاعات", "اطلاعات منبع‌باز"],
    icon: <IconOsint />,
  },
  {
    number: "۰۲",
    category: "ردیابی رمزارز",
    title: "انهدام شبکه کلاهبرداری رمزارز در تلگرام",
    result: "رهگیری وجوه و استرداد سرمایه",
    description:
     "ردیابی جریان مالی شبکه بزرگ معرفی توکن‌های جعلی تا نقطه خروج نهایی پول، که منجر به بازگشت قانونی سرمایه مالباختگان شد.",
    tags: [
      "​توکن جعلی", "​کلاهبرداری مالی", "رهگیری رمزارز"],
    icon: <IconCrypto />,
  },
  {
    number: "۰۳",
    category: "فارنزیک دیجیتال",
    title: "کالبدشکافی حمله به یک شرکت بانکی",
    result: "کشف مسیر نفوذ تا امن سازی زیرساخت",
    description:
      "فارنزیک و مهندسی معکوس حمله سایبری، شناسایی کارمند آلوده به عنوان نقطه ورود هکر و ترمیم قطعی ساختار امنیتی شرکت پرداخت. ",
    tags: ["آسیب پذیری", "هوش تهدیدات", "فانزیک دیجیتال"],
    icon: <IconForensics />,
  },
];



const navItems = [
  { label: "داشبورد", icon: IconDashboard },
  { label: "پرونده‌ها", icon: IconCases, active: true },
  { label: "تنظیمات", icon: IconSettings },
];


interface Note {
  id: number;
  author: string;
  role: string;
  text: string;
  time: string;
}

const initialNotes: Note[] = [
  {
    id: 1,
    author: "سامان رضایی",
    role: "تحلیلگر ارشد",
    text: "الگوی پرداخت‌های مرحله‌ای با نمونه‌های قبلی هم‌خوانی دارد. پیشنهاد می‌شود مسیر انتقال وجه کامل بررسی شود.",
    time: "امروز، ۱۰:۳۲",
  },
  {
    id: 2,
    author: "سیستم هوشمند",
    role: "AI",
    text: "۳ تراکنش مشکوک شناسایی شد. مجموع مبلغ آن‌ها ۱۸۵,۰۰۰,۰۰۰ تومان است.",
    time: "امروز، ۰۹:۵۸",
  },
];

function FieldRow({
  label,
  value,
  copyable,
}: {
  label: string;
  value: ReactNode;
  copyable?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!copyable) return;
    try {
      await navigator.clipboard.writeText(copyable);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard can be unavailable in some embedded browsers.
    }
  };


  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-white/[0.06] last:border-0">
      <div className="text-xs text-slate-500 sm:w-36 shrink-0">{label}</div>
      <div className="flex-1 min-w-0 flex items-center gap-2 text-sm text-slate-200 break-words">{value}</div>
      {copyable && (
        <button
          type="button"
          onClick={copy}
          className="self-start sm:self-auto p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition"
          aria-label="کپی"
        >
          {copied ? <IconCheck /> : <IconCopy />}
        </button>
      )}
    </div>
  );
}

function SectionDivider({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <h2 className="text-sm sm:text-base font-bold text-white">{title}</h2>
      {action}
    </div>
  );
}





const formatPersianDate = (date: string) => {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};


/* ─────────────────────────────────────────────────────────────
   FIELD REPORTS (کارت‌های آخرین گزارش‌های میدانی)
───────────────────────────────────────────────────────────── */

const CATEGORY_FALLBACK = "بدون دسته‌بندی";

const BLOG_CATEGORIES = [
  { id: "forensic-reports", label: "گزارش‌های جرم‌شناسی" },
  { id: "legal-news", label: "اخبار حقوقی" },
  { id: "solved-cases", label: "پرونده‌های حل‌شده" },
  { id: "security-alerts", label: "هشدارهای امنیتی" },
  { id: "security-education", label: "آموزش امنیت و تهدیدات سایبری" },
];

function getCategoryBadgeClass(category: string, darkMode: boolean): string {
  const badges: Record<string, string> = {
    "تهدیدات سایبری": darkMode ? "text-[#FF6B7A] bg-[#32151D] ring-[#5A242E]" : "text-red-700 bg-red-50 ring-red-100",
    "اخبار حقوقی": darkMode ? "text-[#9EAFFF] bg-[#171B3A] ring-[#303665]" : "text-indigo-700 bg-indigo-50 ring-indigo-100",
    "گزارش‌های جرم‌شناسی": darkMode ? "text-[#54B8FF] bg-[#09263D] ring-[#164B70]" : "text-[#1565C0] bg-[#EBF3FF] ring-blue-100",
    "پرونده‌های حل‌شده": darkMode ? "text-[#7BE495] bg-[#102A1C] ring-[#245B36]" : "text-emerald-700 bg-emerald-50 ring-emerald-100",
    "هشدارهای امنیتی": darkMode ? "text-[#F8C85A] bg-[#302612] ring-[#5A461C]" : "text-amber-700 bg-amber-50 ring-amber-100",
    "آموزش امنیت و تهدیدات سایبری": darkMode ? "text-[#7DD3FC] bg-[#0B2940] ring-[#1F5C7A]" : "text-sky-700 bg-sky-50 ring-sky-100",
  };
  return badges[category] || (darkMode ? "text-[#54B8FF] bg-[#09263D] ring-[#164B70]" : "text-[#1565C0] bg-[#EBF3FF] ring-blue-100");
}

function stripHtml(value?: string) {
  if (!value) return "";

  return value
    .replace(/<br\s*\/?>(\s*)/gi, " ")
    .replace(/<\/(p|div|li|h[1-6])>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function getPostExcerpt(content?: string, maxLength = 170) {
  const text = stripHtml(content);
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trimEnd()}…`;
}

function getInitials(author?: string) {
  const value = (author || "").trim();
  if (!value) return "پ";

  return value
    .split(/\s+/)
    .map((word) => word[0] || "")
    .join("")
    .slice(0, 2);
}

// اگر featuredImage آیدی رسانه باشد از لیست media آدرسش را پیدا می‌کند، وگرنه خودش را برمی‌گرداند
function resolveImage(featuredImage: string | undefined, mediaItems: any[]) {
  if (!featuredImage) return { src: "", alt: "" };

  const list = Array.isArray(mediaItems) ? mediaItems : [];
  const found = list.find(
    (item) =>
      item?.id === featuredImage ||
      item?.url === featuredImage ||
      `/api/media/${item?.id}` === featuredImage
  );

  return {
    src: found?.url || featuredImage,
    alt: (found?.alt || "").trim(),
  };
}

const REPORT_CARD_DARK =
  "bg-cyan-800/10 border-cyan-500/30 hover:border-cyan-800 hover:bg-cyan-900/15 hover:shadow-[0_8px_40px_rgba(0,229,255,0.2)] bg-cyan-900/10 hover:bg-cyan-800/15 bg-cyan-800/10" ;

const REPORT_CARD_LIGHT =
  "bg-white border-[rgba(29,78,216,0.20)] shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:border-[#1565C0] hover:bg-[rgba(237,242,255,0.52)] hover:shadow-[0_10px_9px_rgba(30,58,138,0.22)]";


export type HomePageInitialData = {
  posts: Post[];
  media: any[];
  seo: {
    h1Title: string;
  };
};

export default function HomePageClient({
  initialData,
}: {
  initialData: HomePageInitialData;
}) {
  const { darkMode } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [crisisOpen, setCrisisOpen] = useState(false)
      // const blueBright = darkMode ? "#00E5FF" : "#1D4ED8";

      useEffect(() => {
  const params = new URLSearchParams(window.location.search)
  if (params.get("report") === "1") {
    setCrisisOpen(true)
  }
}, [])

const closeCrisis = () => {
  setCrisisOpen(false)

  // پارامتر رو از URL پاک کن که با رفرش دوباره باز نشه
  const url = new URL(window.location.href)
  if (url.searchParams.has("report")) {
    url.searchParams.delete("report")
    window.history.replaceState(null, "", url.pathname + url.search + url.hash)
  }
}

      



  // SEO-critical data is supplied by the server in the initial HTML.
  const seo = initialData.seo;
  const posts = initialData.posts;
  const media = initialData.media;
  const loading = false;

  const latestBlogPosts = [...posts]
.filter((post) => post.status === "published")
  .sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  )
  .slice(0, 3);








  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const iconColor = darkMode ? "#00E5FF" : "#1565C0"
  const accent = darkMode ? "#00E5FF" : "#1565C0" 





  const SkeletonCard = () => (
  <article
    className="flex h-full min-w-0 flex-col rounded-2xl overflow-hidden animate-pulse"
    style={{
      border: darkMode
        ? "1px solid rgba(0,229,255,0.15)"
        : "1px solid rgba(29,78,216,0.20)",
      background: darkMode ? "rgba(8,145,178,0.06)" : "#FFFFFF",
    }}
  >
    {/* تصویر */}
    <div
      className="aspect-video w-full"
      style={{
        background: darkMode ? "#111827" : "#E5E7EB",
      }}
    />

    {/* محتوای کارت */}
    <div className="flex flex-col flex-1 p-4 sm:p-5 lg:p-6">
      {/* دسته‌بندی */}
      <div
        className="h-5 rounded-full mb-4"
        style={{
          width: 90,
          background: darkMode ? "#1E293B" : "#E2E8F0",
        }}
      />

      {/* عنوان */}
      <div
        className="h-4 rounded mb-3"
        style={{
          width: "80%",
          background: darkMode ? "#1E293B" : "#E2E8F0",
        }}
      />

      <div
        className="h-4 rounded mb-5"
        style={{
          width: "55%",
          background: darkMode ? "#1E293B" : "#E2E8F0",
        }}
      />

      {/* توضیحات */}
      <div
        className="h-3 rounded mb-2"
        style={{
          width: "100%",
          background: darkMode ? "#1E293B" : "#E2E8F0",
        }}
      />

      <div
        className="h-3 rounded mb-2"
        style={{
          width: "90%",
          background: darkMode ? "#1E293B" : "#E2E8F0",
        }}
      />

      <div
        className="h-3 rounded mb-5"
        style={{
          width: "65%",
          background: darkMode ? "#1E293B" : "#E2E8F0",
        }}
      />

      {/* فوتر */}
      <div
        className="mt-auto pt-4 border-t flex items-center justify-between gap-3"
        style={{
          borderColor: darkMode ? "#1E334A" : "#E2E8F0",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full"
            style={{ background: darkMode ? "#1E293B" : "#E2E8F0" }}
          />
          <div
            className="h-3 rounded"
            style={{
              width: 80,
              background: darkMode ? "#1E293B" : "#E2E8F0",
            }}
          />
        </div>

        <div
          className="h-3 rounded"
          style={{
            width: 60,
            background: darkMode ? "#1E293B" : "#E2E8F0",
          }}
        />
      </div>
    </div>
  </article>
);







  
  return (
      <>
       <div
            dir="rtl"
      className={`min-h-screen transition-colors duration-300 pt-[75px] cyber-grid-bg ${
        darkMode
          ? "bg-[#0A1128] text-[#E6F7FF]"
          : "bg-white text-[#0F172A]"
      }`}
      style={{
        fontFamily: "var(--font-vazirmatn), sans-serif",
      }}
    >





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
              : "",
          }}
        />


        <div className="relative z-10 w-[90%] max-w-4xl mx-auto">


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
            >PARAHOOR // SYSTEM ONLINE</span>

                        <span className="node-dot pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", display: "inline-block",
                    background: darkMode
                ? "#00E5FF"
                : "#1565C0",

             }}
            
            />
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
{renderHighlightedTitle(seo.h1Title, {
  firstLineWords: 5,
  maxWordsPerLine: 4,
  lineBreakClassName: "",
  style: { color: darkMode ? "#00E5FF" : "#1565C0" },
})}
</h1>

          <p
            className="mx-auto mb-8"
            style={{
              color: darkMode ? "#9aa0aa" : "#475569",
              fontSize: "18px",
              lineHeight: 1.6,
              maxWidth: 580,
              fontWeight: "500"
            }}
          >
            پاراهور؛ آژانس خصوصی تحقیقات سایبری و فارنزیک. ما شواهد را کشف،
            جریان‌های مالی را ردیابی و هویت‌های پنهان را آشکار می‌کنیم.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-[80%] mx-auto">
            <button
              onClick={() => setCrisisOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold transition-all duration-300"
              style={{
                background: "#EF4444",
                color: "#ffffff",
                border: "1px solid rgba(239,68,68,0.6)",
                boxShadow: "0 0 15px rgba(239,68,68,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 22px rgba(239,68,68,0.55)"



              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 15px rgba(239,68,68,0.35)"


              }}
            >
             درخواست کمک فوری
            </button>

<Link
  href="/services"
  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 px-[60px]"
  style={{
    background: darkMode
      ? "rgba(0,229,255,0.07)"
      : "rgba(21,101,192,0.07)",
    color: darkMode ? "#00E5FF" : "#1565C0",
    border: darkMode
      ? "1px solid rgba(0,229,255,0.25)"
      : "1px solid rgba(21, 101, 192, 0.39)",
    boxShadow: darkMode
      ? "0 0 15px rgba(6,182,212,0.35)"
      : "0 0 15px rgba(21,101,192,0.35)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = darkMode
      ? "0 0 22px rgba(6,182,212,0.55)"
      : "0 0 22px rgba(21,101,192,0.55)"
    e.currentTarget.style.borderColor = darkMode
      ? "rgba(0,229,255,0.4)"
      : "rgba(21, 101, 192, 0.64)"
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = darkMode
      ? "0 0 15px rgba(6,182,212,0.35)"
      : "0 0 15px rgba(21,101,192,0.35)"
    e.currentTarget.style.borderColor = darkMode
      ? "rgba(0,229,255,0.25)"
      : "rgba(21,101,192,0.25)"
  }}
>
  خدمات ما
</Link>
          </div>

          
        </div>

{crisisOpen &&
  createPortal(
    <EmergencyModal onClose={closeCrisis} />,
    document.body
  )}
      </motion.div>

      <motion.div
        className="px-6 py-20 md:px-12"
        id="process"

        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">

                
<span 
className="data-label block mb-3"
style={{
  ...(!darkMode && { color: "#1D4ED8" }),
}}
>INVESTIGATION PIPELINE</span>
            <h2
              className="font-bold"
              style={{
                fontSize: "40px",
                color: darkMode ? "#ffffff" : "#0F172A",
                fontWeight: "500",
                lineHeight: 1.5
              }}
            >
              مسیر بررسی پرونده شما
            </h2>

            <div className="scan-line w-24 mx-auto mt-4" />

<div
  className={`w-24 mx-auto mt-4 ${
    darkMode
      ? "bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
      : "bg-gradient-to-r from-transparent via-[#1565C0] to-transparent"
  }`}
  style={{
    height: "1px",
    minHeight: "1px",
    maxHeight: "1px",
    flexShrink: 0,
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
                  className={`glass-card w-full max-w-[310px] md:max-w-none md:flex-1 h-[310px] max-w-[300px] flex flex-col  justify-center items-center p-6 md:p-8 text-center group transition-all duration-300 rounded-2xl ${
                    darkMode
                      ? "border border-cyan-500/30 hover:border-cyan-600 bg-[rgba(255,255,255,0.028)] hover:bg-cyan-900/15 "
                      : ""
                  }`}
                 style={
        darkMode 
        ? { backdropFilter: "blur(10px)" } 
        : {
            border: "1px solid rgba(121, 154, 245, 0.82)",
            background: "#ebebeb4b",
            boxShadow: "0 4px 20px rgba(15,23,42,0.06)",
            transition: "border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease, background 300ms ease",
            backdropFilter: "blur(10px)",
        }
}
                  onMouseEnter={(e) => {
                    if (!darkMode) {
                      e.currentTarget.style.borderColor =
                        "#2270ca"
                      e.currentTarget.style.background =
                        "#d0d0d035"
                      e.currentTarget.style.boxShadow =
                        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"

                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!darkMode) {
                      e.currentTarget.style.borderColor =
                        "rgba(91, 133, 248, 0.58)"
                      e.currentTarget.style.background = "#ebebeb4b"
                      e.currentTarget.style.boxShadow =
                        "0 4px 15px rgba(15,23,42,0.06)"

                    }
                  }}
                >
                 
                  <div className="mb-4 flex justify-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: darkMode
                          ? "rgba(0,229,255,0.08)"
                          : "rgba(11, 68, 225, 0.04)",
                        border: darkMode
                          ? "1px solid rgba(0,229,255,0.25)"
                          : "1px solid #1565c0ad",
                        boxShadow: darkMode
                          ? undefined
                          : "0 4px 18px rgba(30,58,138,0.06)",
                      }}


                    >
                      {step.icon}
                    </div>
                  </div>

                  <span
                    className="step-number block mb-2"
                    style={
                      
                      darkMode
                        ? {color: "#13a0af"}
                        : { color: "#1565C0" }
                    }
                  >
                    {step.step}
                  </span>

                  <h3
                    className={`font-bold text-base mb-2 transition-colors duration-300 ${
                      darkMode
                        ? ""
                        : "text-[#111827] group-hover:text-[#1565C0]"
                    }`}
                    style={{
                      color: darkMode ? "#ffffff" : "black",
                      fontSize: "18px",
                      fontWeight: "500",
                      lineHeight: 1.77
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      color: darkMode
                        ? "#8e939a"
                        : "#334155",
                      fontSize:"14px",
                      lineHeight: 1.7,
                      fontWeight: "500"
                    }}
                  >
                    {step.text}
                  </p>
                </div>

                {index < 2 && (
                  <>
                    <div
                      className="hidden md:block w-10 flex-shrink-0"
                      style={{
                        height: 1,
                        background: darkMode
                          ? index === 0
                            ? "linear-gradient(1270deg, rgba(0,229,255,0.1), #00e5ff)"
                            : "linear-gradient(270deg, rgba(0,229,255,0.1), rgb(0,229,255))"
                          : index === 0
                            ? "linear-gradient(1270deg, rgba(30,58,138,0.08), rgb(29,78,216))"
                            : "linear-gradient(270deg, rgba(30,58,138,0.08), rgb(29,78,216))",
                      }}
                    />

                    <div
                      className="md:hidden h-6 w-px mx-auto"
                      style={{
                        background: darkMode
                          ? "linear-gradient(180deg, rgba(0,229,255,0.1), rgb(0,229,255))"
                          : "linear-gradient(180deg, rgba(30,58,138,0.08), rgb(29,78,216))",
                      }}
                    />
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="px-6 py-20 md:px-12"
        id="services"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">

<span 
className="data-label block mb-3"
style={{
  ...(!darkMode && { color: "rgb(21, 101, 192)" }),
}}
>SPECIALIZATION DOMAINS</span>
            
            <h2
              className="font-bold"
              style={{
                fontSize: "40px",
                color: darkMode ? "#ffffff" : "#0F172A",
                  fontWeight: "500",
                lineHeight: 1.5
              }}
            >
              حوزه‌های تخصصی پاراهور
            </h2>

                        <div className="scan-line w-24 mx-auto mt-4" />

<div
  className={`w-24 mx-auto mt-4 ${
    darkMode
      ? "bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
      : "bg-gradient-to-r from-transparent via-[#1565C0] to-transparent"
  }`}
  style={{
    height: "1px",
    minHeight: "1px",
    maxHeight: "1px",
    flexShrink: 0,
  }}
/>
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
                    ? "border border-cyan-500/30 hover:border-cyan-600 bg-[rgba(255,255,255,0.028)] hover:bg-cyan-900/15"
                    : ""
                }`}
                style={
                  darkMode
                    ? {backdropFilter: "blur(10px)"}
                    : {
                        border:
                          "1px solid #76a7de",
                        background: "#ebebeb4b",
                        boxShadow:
                          "0 4px 20px rgba(15,23,42,0.06)",
                        transition:
                          "border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease, background 300ms ease",
                          backdropFilter: "blur(10px)"
                      }
                }
                
                onMouseEnter={(e) => {
                  if (!darkMode) {
                    e.currentTarget.style.borderColor =
                      "#1565C0"
                    e.currentTarget.style.background =
                      "#d0d0d035"
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"

                  }
                }}
                onMouseLeave={(e) => {
                  if (!darkMode) {
                    e.currentTarget.style.borderColor =
                      "#76a7de"
                    e.currentTarget.style.background =
                      "#ebebeb4b"
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(15,23,42,0.06)"

                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: darkMode
                        ? "rgba(0,229,255,0.06)"
                        : "rgba(30,58,138,0.04)",
                      border: darkMode
                        ? "1px solid rgba(0,229,255,0.2)"
                        : "1px solid rgba(30,58,138,0.18)",
                    }}
                  >
                    {service.icon}
                  </div>

                  <div>
                    <span
                      className="data-label block mb-1.5"
                      style={
                        darkMode
                          ? undefined
                          : { color: "#1565C0" }
                      }
                    >
                      {service.label}
                    </span>

                    <h3
                      className={`font-bold mb-2 transition-colors duration-300 ${
                        darkMode
                          ? ""
                          : "text-[#111827] group-hover:text-[#1565C0]"
                      }`}
                      style={{
                        color: darkMode ? "#ffffff" : "black",
                        fontSize: "18px",
                        fontWeight: "500",
                        lineHeight: 1.5
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      style={{
                        color: darkMode
                          ? "#8e939a"
                          : "#334155",
                        fontSize:"14px" ,
                        lineHeight: 1.75,
                        fontWeight: "500"
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
                      : "linear-gradient(90deg, rgba(15,23,42,0.14), transparent)",
                  }}
                />

                <div className="mt-3 flex items-center gap-2">
                  <span
                    className="node-dot"
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: darkMode
                        ? "#00E5FF"
                        : "#1565C0",
                      display: "inline-block",
                    }}
                  />

                  <span
                    style={{
                      color: darkMode
                        ? "rgba(0,229,255,0.6)"
                        : "#1565C0",
                      fontSize: "0.82rem",
                      fontFamily: "monospace",
                      fontWeight: "550"
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









{/* ─── SUCCESSFUL CASES ─── */}
    <motion.div
       
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
      >
<section
  className={`relative px-6 py-20 md:px-12 overflow-hidden`}
  id="cases"
>
  {/* Background glow */}
  <div
    className={`absolute inset-0 pointer-events-none`}
  />

  <div className="relative max-w-5xl mx-auto">
    {/* Header */}
    <div className="flex flex-col items-center text-center gap-6 mb-12">
      <div>
        <span 
        className="data-label block mb-3"
        style={{
  ...(!darkMode && { color: "#1565C0" }),
}}
        >Successful Projects</span>

        <h2
          className={` font-bold ${
            darkMode ? "text-white" : "text-[#0F172A]"
          }`}
          style={{
            fontSize: "40px",
                 fontWeight: "500",
                lineHeight: 1.5
          }}
        >
          نمونه‌کارهای موفق
        </h2>

<div
  className={`w-24 mx-auto mt-4 ${
    darkMode
      ? "bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
      : "bg-gradient-to-r from-transparent via-[#1565C0] to-transparent"
  }`}
  style={{
    height: "1px",
    minHeight: "1px",
    maxHeight: "1px",
    flexShrink: 0,
  }}
/>
      </div>

     
    </div>

    {/* Case cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {successfulCases.map((item) => (
        <article
          key={item.number}
          className={`group relative flex flex-col overflow-hidden rounded-2xl px-6 pt-6
            transition-all duration-300 ease-out
            ${
              darkMode
                ? "border border-cyan-500/30 bg-[rgba(255,255,255,0.028)] hover:border-cyan-600 hover:bg-cyan-900/15"
                : "border border-[#76A7DE] bg-[#EBEBEB4B] shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:border-[#1565C0] hover:bg-[#D0D0D035] hover:shadow-md"
            }`}
        >
          {/* Card header */}
          <div className="relative flex items-center justify-between gap-4 mb-6">
            <div
className={`w-12 h-12 flex items-center justify-center rounded-xl ${
  darkMode
    ? "bg-cyan-400/[0.07] border border-cyan-400/20"
    : "bg-[#1565C0]/[0.06] border border-[#1565C0]/15 text-[#1565C0]"
}`}

            >
              {darkMode
  ? item.icon
  : React.cloneElement(item.icon, { color: "#1565C0" })}
            </div>

          
          </div>

          {/* Category */}
          <span
            className={`text-[0.75rem] font-semibold ${
              darkMode ? "text-cyan-400/60" : "text-[#1565C0]"
            }`}
          >
            {item.category}
          </span>

          {/* Title */}
          <h3
            className={`font-bold mt-2 mb-4 text-base leading-[1.65] transition-colors duration-300 ${
              darkMode
                ? "text-white"
                : "text-[#0F172A] "
            }`}
            style={{ 
              fontSize: "18px",
              fontWeight: "500",
              lineHeight: "1.5"
            }}
          >
            {item.title}
          </h3>

          {/* Result */}
          <div
            className={`px-4 py-3 rounded-xl mb-4 ${
              darkMode
                ? "bg-cyan-400/[0.05] border-r-2 border-cyan-400/55"
                : "bg-[#1565C0]/[0.045] border-r-2 border-[#1565C0]/60"
            }`}
          >
            <span
              className={`block mb-1 text-[0.75rem] ${
                darkMode ? "text-[#9aa0aa]" : "text-slate-500"
              }`}
            >
              نتیجه پرونده
            </span>

            <strong
              className={`text-[14px] leading-[1.7] ${
                darkMode ? "text-cyan-400" : "text-[#1565C0]"
              }`}
              style={{
                fontWeight: "500"
              }}
            >
              {item.result}
            </strong>
          </div>

          {/* Description */}
          <p
            className={`mb-6 text-[14px] leading-[1.79] ${
              darkMode ? "text-[#9aa0aa]" : "text-[#334155]"
            }`}
            style={{
              fontWeight: "500"
            }}
          >
            {item.description}
          </p>

          {/* Tags */}
          {/* <div
            className={`mt-auto pt-4 flex flex-wrap gap-2 border-t ${
              darkMode ? "border-cyan-400/[0.07]" : "border-[#1565C0]/10"
            }`}
          >
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-1 rounded-md text-[0.72rem] ${
                  darkMode
                    ? "bg-white/[0.025] text-slate-500"
                    : "bg-[#1565C0]/[0.045] text-slate-600"
                }`}
              >
                {tag}
              </span>
            ))}
          </div> */}
        </article>
      ))}
    </div>
  </div>
</section>
</motion.div>









      {/* ─── آخرین گزارش‌های میدانی ─────────────────────────────────────── */}
      <motion.div
        className="py-20 px-6 md:px-12"
       
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">

                
        <span 
        className="data-label block mb-3"
        style={{
  ...(!darkMode && { color: "#1565C0" }),
}}
        >LATEST POSTS</span>
            <h2
              className="font-black"
              style={{
                color: darkMode ? "#fff" : "#0F172A",
                fontSize: "40px",
                  fontWeight: "500",
                lineHeight: 1.5
              }}
            >
             آخرین مطالب

            </h2>
            <div className="scan-line w-24 mx-auto mt-4" />

<div
  className={`w-24 mx-auto mt-4 ${
    darkMode
      ? "bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
      : "bg-gradient-to-r from-transparent via-[#1565C0] to-transparent"
  }`}
  style={{
    height: "1px",
    minHeight: "1px",
    maxHeight: "1px",
    flexShrink: 0,
  }}
/>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : latestBlogPosts.map((post, i) => {
                  const categoryLabel =
                    BLOG_CATEGORIES.find(
                      (item) => item.id === (post.categoryId || "").trim()
                    )?.label || CATEGORY_FALLBACK

                  const image = resolveImage(post.featuredImage, media)
                  const summary =
                    post.excerpt || getPostExcerpt(post.content, 170)
                  const readTime = `${post.readingTime || 0} دقیقه`
                  const dateText = post.createdAt
                    ? formatPersianDate(post.createdAt)
                    : ""

                  return (

                    <Link key={post._id || i} href={`/blogs/${post.slug}`} className="block h-full">
                     <article
                       className={`group flex h-full flex-col rounded-2xl overflow-hidden transition-all duration-200 ${
                         darkMode
                           ? "border border-cyan-500/30 hover:border-cyan-600 bg-[rgba(255,255,255,0.028)] hover:bg-cyan-900/15"
                           : "bg-white border border-[#0B1C3E]/10 hover:border-[#1565C0]/25 hover:shadow-md"
                       }`}

                      //  #ebebeb4b #d0d0d035
                style={
                  darkMode
                    ? {backdropFilter: "blur(10px)"}
                    : {
                        border:
                          "1px solid #76a7de",
                        background: "#ebebeb4b",
                        boxShadow:
                          "0 4px 20px rgba(15,23,42,0.06)",
                        transition:
                          "border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease, background 300ms ease",
                          backdropFilter: "blur(10px)"
                      }
                }


                onMouseEnter={(e) => {
                  if (!darkMode) {
                    e.currentTarget.style.borderColor =
                      "#1565C0"
                    e.currentTarget.style.background =
                      "#d0d0d035"
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"

                  }
                }}
                onMouseLeave={(e) => {
                  if (!darkMode) {
                    e.currentTarget.style.borderColor =
                      "#76a7de"
                    e.currentTarget.style.background =
                      "#ebebeb4b"
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(15,23,42,0.06)"

                  }
                }}
                     >
                      {/* Thumbnail */}
                      <div
                        className={`relative aspect-video overflow-hidden flex-shrink-0 ${
                          darkMode ? "bg-[#0D1B29]" : "bg-[#F1F5F9]"
                        }`}
                      >
                        {image.src ? (
                          <img
                            src={image.src}
                            alt={
                              post.featuredImageAlt?.trim() ||
                              image.alt ||
                              post.title
                            }
                            className="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                         ) : (
                           <div
                             className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                             style={{
                               borderBottom: darkMode ? "none" : "1px solid #43628123",
                             }}
                           >
                             <ArticleThumb accent={accent} seed={i} />
                           </div>
                         )}

                        {/* سایه‌ی پایین عکس تا از بدنه‌ی کارت جدا بشه */}
                        <div
                          aria-hidden="true"
                          className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t to-transparent ${
                            darkMode ? "from-[#050C1E]/70" : "from-[#0F172A]/15"
                          }`}
                        />

                        {/* دسته‌بندی روی گوشه‌ی عکس */}
                        <span
                          className={`absolute top-3 right-3 z-10 max-w-[calc(100%-1.5rem)] truncate text-[11px] font-bold px-2.5 py-1 rounded-full ring-1 ring-inset shadow-sm backdrop-blur-sm ${getCategoryBadgeClass(
                            categoryLabel,
                            darkMode
                          )}`}
                        >
                          {categoryLabel}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5 lg:p-6">
                        {/* Title */}
                        <h3
                          className={` font-bold leading-snug mb-3 break-words line-clamp-2 ${
                            darkMode
                              ? "text-[#E6F7FF] group-hover:text-[#00E5FF] transition-colors duration-300"
                              : "text-[#111827] group-hover:text-[#1565C0] transition-colors duration-300"
                          }`}
                          style={{
                            fontSize: "18px",
                            fontWeight: "500",
                            lineHeight: 1.5
                          }}
                        >
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p
                          className={`text-[14px] leading-relaxed line-clamp-2 break-words mb-5 flex-1 min-h-[2.85rem] ${
                            darkMode ? "text-[#9aa0aa]" : "text-[#334155]"
                          }`}
                          style={{
                            fontWeight: "500",
                            lineHeight: 1.77
                          }}
                        >
                          {summary}
                        </p>

                        {/* Footer */}
                        <div
                          className={`mt-auto pt-4 border-t flex flex-wrap items-center justify-between gap-x-3 gap-y-3 ${
                            darkMode ? "border-[#1E334A]" : "border-[#E2E8F0]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border ${
                                darkMode ? "border-transparent" : "border-[#1565C0]/25"
                              }`}
                            >
                              <div className="w-full h-full rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                <IconUser />
                              </div>
                            </span>
                      
                         <div className="min-w-0">
                      <span 
                        className={`inline-flex items-center gap-1.5 text-[13px] font-semibold truncate pb-1 transition-all duration-300 ${
                          darkMode ? "text-[#9DB0C0] hover:text-white/80" : "text-[#475569]"
                        }`}
                      >
                        {post.author}
                        {/* تیم تخصصی پاراهور */}
                      </span>

                              <div
                                className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] ${
                                  darkMode ? "text-[#71869A]" : "text-[#64748B]"
                                }`}
                              >
                                {dateText && <span className="text-xs">{dateText}</span>}
                                {dateText && <span>·</span>}
                                <span className="text-xs">{readTime}</span>
                              </div>
                            </div>
                          </div>

                          <span
                        
            className={`flex items-center gap-1 text-xs font-semibold whitespace-nowrap group-hover:gap-1.5 transition-all flex-shrink-0 ${
              darkMode ? "text-[#00E5FF]" : "text-[#1565C0]"
            }`}
                          >
                            بررسی گزارش
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
                              <path d="m15 18-6-6 6-6" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </article>
                    </Link>
                  )
                })}
          </div>
        </div>
      </motion.div>










    </div>
    </>
  )
}