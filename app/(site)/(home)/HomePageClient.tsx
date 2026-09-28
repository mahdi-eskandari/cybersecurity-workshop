


"use client"

import React, { useEffect, type ReactNode } from "react"
import { useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { useTheme } from "../../../components/ThemeProvider"
import { motion } from "framer-motion"
import { EmergencyModal } from "../../../components/CrisisReportForm"



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

const NetworkDecor = ({
  darkMode = true,
}: {
  darkMode?: boolean
}) => {
  const blue = darkMode ? "#00E5FF" : "#1D4ED8"

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
  )
}

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

function CaseReviewPanel({ onClose }: { onClose: () => void }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [saved, setSaved] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [referred, setReferred] = useState(false);

  const handleAddNote = () => {
    const clean = noteText.trim();
    if (!clean) return;

    setNotes((prev) => [
      {
        id: Date.now(),
        author: "شما",
        role: "کارشناس پرونده",
        text: clean,
        time: "همین حالا",
      },
      ...prev,
    ]);
    setNoteText("");
  };

  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div dir="rtl" className="fixed inset-0 z-[9999] min-h-screen overflow-y-auto overflow-x-hidden bg-[#070b14] text-slate-200" role="dialog" aria-modal="true">
      <style jsx global>{`
        @keyframes urg-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,.18); }
          50% { box-shadow: 0 0 0 7px rgba(239,68,68,0); }
        }
        .urg-pulse { animation: urg-pulse 2s infinite; }
      `}</style>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="بستن منو"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed z-50 top-0 right-0 h-screen w-[250px] sm:w-[270px] lg:w-[220px]",
          "bg-[#0b1120] border-l border-white/[0.07] flex flex-col transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="h-16 px-5 flex items-center justify-between border-b border-white/[0.07]">
          <div>
            <div className="font-black text-white text-base">پاراهور</div>
            <div className="text-[10px] text-slate-500 mt-0.5">مرکز مدیریت پرونده‌ها</div>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/[0.06]"
            aria-label="بستن"
          >
            ×
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setSidebarOpen(false)}
                className={[
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition",
                  item.active
                    ? "bg-cyan-400/10 text-cyan-300 border border-cyan-400/10"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.05]",
                ].join(" ")}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto p-3 border-t border-white/[0.07]">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03]">
            <div className="w-9 h-9 rounded-full bg-cyan-400/10 text-cyan-300 flex items-center justify-center">
              <IconAdmin />
            </div>
            <div className="min-w-0">
              <div className="text-sm text-white font-semibold truncate">کارشناس پرونده</div>
              <div className="text-[11px] text-slate-500">سطح دسترسی: تحلیلگر</div>
            </div>
          </div>
          <button
            type="button"
            className="mt-2 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-red-300 hover:bg-red-500/5 transition"
          >
            <IconLogout />
            خروج
          </button>
        </div>
      </aside>

      {/* Main shell */}
      <div className="lg:mr-[220px] min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 h-auto min-h-16 bg-[#070b14]/90 backdrop-blur-xl border-b border-white/[0.07]">
          <div className="px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-slate-300"
              aria-label="باز کردن منو"
            >
              <IconMenu />
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>پرونده‌ها</span>
                <span>/</span>
                <span className="text-slate-300">PRH-902</span>
              </div>
              <div className="mt-1 text-sm sm:text-base font-bold text-white truncate">
                بررسی پرونده PRH-902
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.08] bg-white/[0.04] text-xs sm:text-sm text-slate-200 hover:bg-white/[0.07] transition"
              >
                {saved ? <IconCheck /> : <IconSave />}
                <span>{saved ? "ذخیره شد" : "ذخیره"}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-xs sm:text-sm hover:bg-cyan-400/15 transition"
              >
                <IconArrowRight />
                بازگشت
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-[1500px] mx-auto">
          {/* Top status row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-white">پرونده PRH-902</span>
                <span className="text-[11px] px-2 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300">
                  نیازمند بررسی فوری
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-500">
                آخرین بروزرسانی: امروز، ۱۰:۳۸
              </p>
            </div>

            <p className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-red-500/15 text-red-300 border-red-500/30 text-sm font-bold whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-current" />
                فوری
              </p>
            </div>

          {/* Responsive content */}
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,.9fr)] gap-5 lg:gap-6">
            <div className="space-y-5 min-w-0">
              {/* Case information */}
              <section className="rounded-2xl border border-white/[0.07] bg-[#0b1120] overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <SectionDivider title="اطلاعات پرونده" />
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                    <IconLock /> اطلاعات محرمانه
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <FieldRow label="شناسه پرونده" value={<span className="font-mono text-cyan-300">PRH-902</span>} copyable="PRH-902" />
                  <FieldRow label="عنوان" value="گزارش تراکنش مشکوک و کلاهبرداری اینترنتی" />
                  <FieldRow label="دسته‌بندی" value="کلاهبرداری مالی / انتقال وجه" />
                  <FieldRow label="اولویت" value={<span className="text-red-300 font-semibold">فوری</span>} />
                  <FieldRow label="تاریخ ثبت" value="۱۴۰۵/۰۶/۱۹ - ۰۹:۲۱" />
                  <FieldRow label="مسئول پرونده" value="سامان رضایی" />
                </div>
              </section>

              {/* Quick actions */}
              <section className="rounded-2xl border border-white/[0.07] bg-[#0b1120] p-4 sm:p-5">
                <SectionDivider title="اقدامات سریع" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSmsSent(true)}
                    className="min-h-20 p-4 rounded-xl border border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.05] text-right transition"
                  >
                    <div className="flex items-center gap-2 text-cyan-300 text-sm font-bold">
                      <IconSms /> {smsSent ? "پیام ارسال شد" : "ارسال پیامک"}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-2">اطلاع‌رسانی به گزارش‌دهنده</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReferred(true)}
                    className="min-h-20 p-4 rounded-xl border border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.05] text-right transition"
                  >
                    <div className="flex items-center gap-2 text-violet-300 text-sm font-bold">
                      <IconForward /> {referred ? "ارجاع شد" : "ارجاع پرونده"}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-2">ارسال به کارشناس دیگر</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="min-h-20 p-4 rounded-xl border border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.05] text-right transition sm:col-span-2 lg:col-span-1"
                  >
                    <div className="flex items-center gap-2 text-amber-300 text-sm font-bold">
                      <IconSave /> چاپ / خروجی
                    </div>
                    <div className="text-[11px] text-slate-500 mt-2">تهیه نسخه قابل ارائه</div>
                  </button>
                </div>
              </section>

              {/* Notes */}
              <section className="rounded-2xl border border-white/[0.07] bg-[#0b1120] p-4 sm:p-5">
                <SectionDivider
                  title="یادداشت‌های داخلی"
                  action={<span className="text-[11px] text-slate-500">{notes.length} یادداشت</span>}
                />

                <div className="space-y-3">
                  {notes.map((note) => (
                    <div key={note.id} className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-bold text-white">{note.author}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-500">{note.role}</span>
                          </div>
                          <p className="mt-2 text-xs sm:text-sm leading-7 text-slate-300">{note.text}</p>
                        </div>
                        <span className="shrink-0 text-[10px] text-slate-600">{note.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#080d18] p-3">
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="یادداشت داخلی جدید..."
                    rows={4}
                    className="w-full resize-none bg-transparent outline-none text-sm leading-7 text-slate-200 placeholder:text-slate-600"
                  />
                  <div className="mt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-600">این یادداشت برای کاربران عمومی نمایش داده نمی‌شود.</span>
                    <button
                      type="button"
                      onClick={handleAddNote}
                      className="inline-flex justify-center items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-xs font-black hover:bg-cyan-300 transition"
                    >
                      <IconPlus /> افزودن یادداشت
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* Side column */}
            <div className="space-y-5 min-w-0">
              <section className="rounded-2xl border border-red-500/15 bg-[#0b1120] p-4 sm:p-5">
                <SectionDivider title="خلاصه هوشمند پرونده" />
                <div className="rounded-xl bg-red-500/[0.06] border border-red-500/10 p-4">
                  <div className="flex items-center gap-2 text-red-300 text-sm font-bold">
                    <IconBot /> تحلیل هوش مصنوعی
                  </div>
                  <p className="mt-3 text-xs sm:text-sm leading-7 text-slate-300">
                    شواهد فعلی با الگوی چند پرونده مشابه هم‌خوانی دارد. چند تراکنش با فاصله زمانی کوتاه
                    و مبالغ غیرمعمول شناسایی شده است و بررسی زنجیره انتقال وجه پیشنهاد می‌شود.
                  </p>
                </div>
              </section>

              <section className="rounded-2xl border border-white/[0.07] bg-[#0b1120] p-4 sm:p-5">
                <SectionDivider title="تراکنش‌های مشکوک" action={<span className="text-red-300 text-xs font-bold">۳ مورد</span>} />
                <div className="space-y-2">
                  {[
                    ["۱۸۵,۰۰۰,۰۰۰ تومان", "امروز، ۰۹:۴۴", "مشکوک"],
                    ["۷۵,۰۰۰,۰۰۰ تومان", "امروز، ۰۹:۲۷", "مشکوک"],
                    ["۱۱۰,۰۰۰,۰۰۰ تومان", "دیروز، ۱۸:۰۵", "نیازمند بررسی"],
                  ].map(([amount, time, label]) => (
                    <div key={`${amount}-${time}`} className="p-3 rounded-xl bg-white/[0.025] border border-white/[0.06]">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-bold text-white">{amount}</span>
                        <span className="text-[10px] text-red-300">{label}</span>
                      </div>
                      <div className="mt-1 text-[10px] text-slate-600">{time}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-white/[0.07] bg-[#0b1120] p-4 sm:p-5">
                <SectionDivider title="مسیر پرونده" />
                <div className="relative pr-5">
                  <div className="absolute right-[7px] top-2 bottom-2 w-px bg-white/[0.08]" />
                  {[
                    ["ثبت گزارش", "امروز، ۰۹:۲۱", true],
                    ["تأیید اولیه", "امروز، ۰۹:۴۶", true],
                    ["ارجاع به تحلیلگر", "امروز، ۱۰:۰۲", true],
                    ["بررسی تکمیلی", "در حال انجام", false],
                  ].map(([title, time, done], index) => (
                    <div key={index} className="relative flex items-start gap-3 pb-5 last:pb-0">
                      <span
                        className={`relative z-10 mt-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                          done ? "bg-cyan-400 border-cyan-400" : "bg-[#0b1120] border-amber-400"
                        }`}
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{title}</div>
                        <div className="mt-1 text-[10px] text-slate-600">{time}</div>
                      </div>
                      {index < 3 && <span className="absolute right-[2px] top-5 text-[10px] text-cyan-400">✓</span>}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* Persistent return control: desktop bottom-left, mobile full-width-ish bottom-left */}
      <button
        type="button"
        onClick={onClose}
        className="fixed left-3 right-3 sm:left-6 sm:right-auto bottom-3 sm:bottom-6 z-[60] inline-flex justify-center items-center gap-2 px-4 py-3 rounded-2xl bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm shadow-[0_12px_35px_rgba(0,0,0,.35)] hover:bg-cyan-300 hover:-translate-y-0.5 transition"
      >
        <IconArrowRight />
        بازگشت به صفحه گزارش
      </button>
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
  "bg-cyan-800/10 border-cyan-500/30 hover:border-cyan-800 hover:bg-cyan-900/15 hover:shadow-[0_8px_40px_rgba(0,229,255,0.2)]";

const REPORT_CARD_LIGHT =
  "bg-white border-[rgba(29,78,216,0.20)] shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:border-[rgba(29,78,216,0.52)] hover:bg-[rgba(237,242,255,0.52)] hover:shadow-[0_16px_40px_rgba(30,58,138,0.22)] hover:-translate-y-1";


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

  const iconColor = darkMode ? "#00E5FF" : "#1D4ED8"
  const accent = darkMode ? "#00E5FF" : "#1D4ED8" 





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
      className={`min-h-screen transition-colors duration-300 pt-20 cyber-grid-bg ${
        darkMode
          ? "bg-[#0A1128] text-[#E6F7FF]"
          : "bg-white text-[#0F172A]"
      }`}
      style={{
        fontFamily: "var(--font-vazirmatn), sans-serif",
        backgroundImage: darkMode
          ? "linear-gradient(rgba(0,229,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.03) 1px,transparent 1px)"
          : "linear-gradient(rgba(30,58,138,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(30,58,138,0.045) 1px,transparent 1px)",
        backgroundSize: "52px 52px",
      backgroundAttachment: "fixed"
      }}
    >
      {menuOpen && (
        <div
          className="md:hidden flex flex-col gap-4 px-6 py-4"
          style={{
            background: darkMode ? "rgba(10,17,40,0.97)" : "#FFFFFF",
            borderBottom: darkMode
              ? "1px solid rgba(0,229,255,0.1)"
              : "1px solid rgba(30,58,138,0.22)",
          }}
        >
          {["خدمات ما", "وبلاگ", "درباره ما", "تماس با ما"].map(
            (item) => (
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
            )
          )}
        </div>
      )}

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
              : "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(84, 128, 215, 0.16) 0%, transparent 70%)",
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
                : "rgba(30,58,138,0.07)",
              border: darkMode
                ? "1px solid rgba(0,229,255,0.2)"
                : "1px solid rgba(30,58,138,0.20)",
              
            }}
          >

            <span 
            className="data-label"
            style={{
              color: darkMode ? "#00E5FF" : "#102254ce",
            }}
            >PARAHOOR // SYSTEM ONLINE</span>

                        <span className="node-dot pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", display: "inline-block",
                    background: darkMode
                ? "#00E5FF"
                : "rgba(13, 34, 93, 0.78)",

             }}
            
            />
          </div>

        <h1
  className="glow-text font-black leading-tight mb-6"
  style={{
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    color: darkMode ? "#ffffff" : "#0c1a43",
    lineHeight: "1.3",
    fontWeight: 900,
    textShadow: darkMode
      ? undefined
      : "0 0 18px rgba(30,58,138,0.10)",
  }}
>
  {seo.h1Title.split(" ").map((word, index) => (
    <span key={index}>
      {index === 5 && <br />}

      <span>
        {word}
      </span>{" "}
    </span>
  ))}
</h1>

          <p
            className="max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{
              color: darkMode ? "#94A3B8" : "#475569",
              fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
              fontWeight: 400,
            }}
          >
            پاراهور؛ آژانس خصوصی تحقیقات سایبری و فارنزیک. ما شواهد را کشف،
            جریان‌های مالی را ردیابی و هویت‌های پنهان را آشکار می‌کنیم.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-[80%] mx-auto">
            <Link
              onClick={() => setCrisisOpen(true)}
              href="mailto:secure@parahoor.io"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold transition-all duration-300"
              style={{
                background: darkMode ? "#EF4444" : "#1E3A8A",
                color: "#ffffff",
                border: darkMode
                  ? "1px solid rgba(239,68,68,0.6)"
                  : "1px solid rgba(30,58,138,0.6)",
                boxShadow: darkMode
                  ? "0 0 15px rgba(239,68,68,0.35)"
                  : "0 8px 22px rgba(30,58,138,0.22)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 0 22px rgba(239,68,68,0.55)"
                  : "0 12px 30px rgba(29,78,216,0.32)"

                if (!darkMode) {
                  e.currentTarget.style.background = "#153178"
                  e.currentTarget.style.borderColor = "#153178"
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 0 15px rgba(239,68,68,0.35)"
                  : "0 8px 22px rgba(30,58,138,0.22)"

                if (!darkMode) {
                  e.currentTarget.style.background = "#1E3A8A"
                  e.currentTarget.style.borderColor =
                    "rgba(30,58,138,0.6)"
                }
              }}
            >
              گزارش فوری حادثه
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 px-[60px]"
              style={{
                background: darkMode
                  ? "rgba(0,229,255,0.07)"
                  : "transparent",
                color: darkMode ? "#00E5FF" : "#1D4ED8",
                border: darkMode
                  ? "1px solid rgba(0,229,255,0.25)"
                  : "1px solid rgba(30,58,138,0.45)",
                boxShadow: darkMode
                  ? "0 0 15px rgba(6,182,212,0.35)"
                  : "0 8px 22px rgba(30,58,138,0.06)",
              }}
              onMouseEnter={(e) => {
                if (!darkMode) {
                  e.currentTarget.style.borderColor = "#142a65"
                  e.currentTarget.style.background = "#142a65"
                  e.currentTarget.style.color = "#FFFFFF"
                  e.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(30,58,138,0.20)"
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
                    "rgba(30,58,138,0.45)"
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "#1D4ED8"
                  e.currentTarget.style.boxShadow =
                    "0 8px 22px rgba(30,58,138,0.06)"
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

        {crisisOpen && (
          <EmergencyModal
            onClose={() => setCrisisOpen(false)}
          />
        )}
      </motion.div>

      <motion.div
        className="px-6 py-20 md:px-12"
        id="process"
        style={
          !darkMode
            ? {
                background:
                  "linear-gradient(180deg, rgba(248,250,252,0.92), rgba(248,250,252,0.5))",
                borderTop:
                  "1px solid rgba(15,23,42,0.07)",
                borderBottom:
                  "1px solid rgba(15,23,42,0.07)",
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

                
<span className="data-label block mb-3">INVESTIGATION PIPELINE</span>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                color: darkMode ? "#ffffff" : "#0F172A",
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
                  ? "linear-gradient(to right, rgba(0,229,255,0.1), rgba(0,229,255,1), rgba(31,74,79,0.1))"
                  : "linear-gradient(to right, rgba(30,58,138,0.08), rgba(30,58,138,1), rgba(30,58,138,0.08))",
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
                      ? "border border-cyan-500/30 hover:border-cyan-500 bg-cyan-900/10 hover:bg-cyan-800/15"
                      : ""
                  }`}
                  style={
                    darkMode
                      ? undefined
                      : {
                          border:
                            "1px solid rgba(29,78,216,0.20)",
                          background: "#FFFFFF",
                          boxShadow:
                            "0 4px 20px rgba(15,23,42,0.06)",
                          transition:
                            "border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease, background 300ms ease",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!darkMode) {
                      e.currentTarget.style.borderColor =
                        "rgba(29,78,216,0.52)"
                      e.currentTarget.style.background =
                        "rgba(237,242,255,0.52)"
                      e.currentTarget.style.boxShadow =
                        "0 16px 40px rgba(30,58,138,0.20)"
                      e.currentTarget.style.transform =
                        "translateY(-4px)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!darkMode) {
                      e.currentTarget.style.borderColor =
                        "rgba(29,78,216,0.20)"
                      e.currentTarget.style.background = "#FFFFFF"
                      e.currentTarget.style.boxShadow =
                        "0 4px 20px rgba(15,23,42,0.06)"
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
                          : "rgba(30,58,138,0.04)",
                        border: darkMode
                          ? "1px solid rgba(0,229,255,0.25)"
                          : "1px solid rgba(30,58,138,0.18)",
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
                        : { color: "rgba(30,58,138,0.72)" }
                    }
                  >
                    {step.step}
                  </span>

                  <h3
                    className={`font-bold text-base mb-2 transition-colors duration-300 ${
                      darkMode
                        ? ""
                        : "text-[#111827] group-hover:text-[#1E3A8A]"
                    }`}
                    style={{
                      color: darkMode ? "#ffffff" : undefined,
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      color: darkMode
                        ? "#64748B"
                        : "#334155",
                      fontSize: darkMode ? "0.82rem" : "0.86rem",
                      lineHeight: darkMode ? 1.7 : 1.9,
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

<span className="data-label block mb-3">SPECIALIZATION DOMAINS</span>
            
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                color: darkMode ? "#ffffff" : "#0F172A",
              }}
            >
              حوزه‌های تخصصی پاراهور
            </h2>

                        <div className="scan-line w-24 mx-auto mt-4" />

            <div
              className="hidden md:block w-20 mt-4 flex-shrink-0 mx-auto"
              style={{
                height: "1px",
                background: darkMode
                  ? "linear-gradient(to right, rgba(0,229,255,0.1), rgba(0,229,255,1), rgba(31,74,79,0.1))"
                  : "linear-gradient(to right, rgba(30,58,138,0.08), rgba(30,58,138,1), rgba(30,58,138,0.08))",
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
                    ? "border border-cyan-500/30 hover:border-cyan-500 bg-cyan-900/10 hover:bg-cyan-800/15"
                    : ""
                }`}
                style={
                  darkMode
                    ? undefined
                    : {
                        border:
                          "1px solid rgba(29,78,216,0.20)",
                        background: "#FFFFFF",
                        boxShadow:
                          "0 4px 20px rgba(15,23,42,0.06)",
                        transition:
                          "border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease, background 300ms ease",
                      }
                }
                onMouseEnter={(e) => {
                  if (!darkMode) {
                    e.currentTarget.style.borderColor =
                      "rgba(29,78,216,0.52)"
                    e.currentTarget.style.background =
                      "rgba(237,242,255,0.52)"
                    e.currentTarget.style.boxShadow =
                      "0 16px 40px rgba(30,58,138,0.20)"
                    e.currentTarget.style.transform =
                      "translateY(-4px)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!darkMode) {
                    e.currentTarget.style.borderColor =
                      "rgba(29,78,216,0.20)"
                    e.currentTarget.style.background =
                      "#FFFFFF"
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(15,23,42,0.06)"
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
                          : { color: "rgba(30,58,138,0.72)" }
                      }
                    >
                      {service.label}
                    </span>

                    <h3
                      className={`font-bold mb-2 transition-colors duration-300 ${
                        darkMode
                          ? ""
                          : "text-[#111827] group-hover:text-[#1E3A8A]"
                      }`}
                      style={{
                        color: darkMode ? "#ffffff" : undefined,
                        fontSize: "1rem",
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      style={{
                        color: darkMode
                          ? "#64748B"
                          : "#334155",
                        fontSize: darkMode ? "0.82rem" : "0.86rem",
                        lineHeight: darkMode ? 1.75 : 1.9,
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
                        : "#1D4ED8",
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

      {/* ─── آخرین گزارش‌های میدانی ─────────────────────────────────────── */}
      <motion.div
        className="py-20 px-6 md:px-12"
        style={{
          backgroundColor: darkMode ? "#0A1128" : "#FFFFFF",
          backgroundImage: darkMode
            ? "radial-gradient(ellipse 65% 60% at 50% 30%, rgba(0,229,255,0.05) 0%, transparent 70%), linear-gradient(rgba(35, 174, 190, 0.03) 1px,transparent 1px), linear-gradient(90deg,rgba(0,229,255,0.03) 1px,transparent 1px)"
            : "radial-gradient(ellipse 65% 60% at 50% 30%, rgba(84, 128, 215, 0.1) 0%, transparent 70%), linear-gradient(rgba(30, 59, 138, 0.02) 1px,transparent 1px), linear-gradient(90deg,rgba(30, 59, 138, 0.02) 1px,transparent 1px)",
          backgroundSize: "100% 100%, 52px 52px, 52px 52px",
          ...(darkMode
            ? {}
            : {
                borderTop: "1px solid rgba(15,23,42,0.07)",
                borderBottom: "1px solid rgba(15,23,42,0.07)",
                boxShadow: "0 10px 35px rgba(30,58,138,0.05)",
              }),
        }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">

                
<span className="data-label block mb-3">FORENSIC RADAR</span>
            <h2
              className="text-2xl md:text-3xl font-black"
              style={{
                color: darkMode ? "#fff" : "#0F172A",
              }}
            >
              آخرین گزارش‌های میدانی

            </h2>
            <div className="scan-line w-24 mx-auto mt-4" />

            <div
              className="hidden md:block w-20 mt-4 flex-shrink-0 mx-auto"
              style={{
                height: "1px",
                background: darkMode
                  ? "linear-gradient(to right, rgba(0,229,255,0.1), rgba(0,229,255,1), rgba(31,74,79,0.1))"
                  : "linear-gradient(to right, rgba(30,58,138,0.08), rgba(30,58,138,1), rgba(30,58,138,0.08))",
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
                    <article
                      key={post._id || i}
                      className={`group flex h-full min-w-0 flex-col border rounded-2xl overflow-hidden transition-all duration-200 ${
                        darkMode ? REPORT_CARD_DARK : REPORT_CARD_LIGHT
                      }`}
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
                          className={`text-base font-bold leading-snug mb-3 break-words line-clamp-2 ${
                            darkMode
                              ? "text-[#E6F7FF]"
                              : "text-[#111827] group-hover:text-[#1E3A8A] transition-colors duration-300"
                          }`}
                        >
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p
                          className={`text-sm leading-relaxed line-clamp-3 break-words mb-5 flex-1 ${
                            darkMode ? "text-[#9DB0C0]" : "text-[#334155]"
                          }`}
                        >
                          {summary.length > 70?
                          summary.slice(0,70).trim() + "..." :
                          summary
                        }
                        </p>

                        {/* Footer */}
                        <div
                          className={`mt-auto pt-4 border-t flex flex-wrap items-center justify-between gap-x-3 gap-y-3 ${
                            darkMode ? "border-[#1E334A]" : "border-[#E2E8F0]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Link 
                            href={post.author === "محمدرضا یوسفی" ? "/authors/mohammadreza-yousefi" : "/authors/alireza-tabatabaei-hashemi"} 
                            >
                      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                        <IconUser />
                      </div>
                            </Link>
                      
                         <div className="min-w-0">
                      <Link 
                        href={post.author === "محمدرضا یوسفی" ? "/authors/mohammadreza-yousefi" : "/authors/alireza-tabatabaei-hashemi"} 
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold truncate pb-1 transition-all duration-300 ${
                          darkMode ? "text-[#9DB0C0] hover:text-white/80" : "text-[#475569]"
                        }`}
                      >
                        {post.author}
                        {/* تیم تخصصی پاراهور */}
                      </Link>

                              <div
                                className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] ${
                                  darkMode ? "text-[#71869A]" : "text-[#64748B]"
                                }`}
                              >
                                {dateText && <span>{dateText}</span>}
                                {dateText && <span>·</span>}
                                <span>{readTime}</span>
                              </div>
                            </div>
                          </div>

                          <Link
href={`/blogs/${post.slug}`}
                            className={`flex items-center gap-1 text-xs font-semibold whitespace-nowrap hover:gap-1.5 transition-all flex-shrink-0 ${
                              darkMode ? "text-[#00E5FF]" : "text-[#1E3A8A]"
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
                          </Link>
                        </div>
                      </div>
                    </article>
                  )
                })}
          </div>
        </div>
      </motion.div>
    </div>
    </>
  )
}
