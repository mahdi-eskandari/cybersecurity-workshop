"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock, ChevronLeft } from "lucide-react";
import { useTheme } from "../../../../components/ThemeProvider";
import {EmergencyModal} from "../../.../../../../components/CrisisReportForm"
import CommentSection from "@/components/CommentSection";
import type { ApprovedComment } from "@/components/CommentSection";


/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  author: string;
  categoryId: string;
  tags: string[];
  status: "draft" | "published";
  postType: "normal" | "special";
  featuredImage: string | null;
  featuredImageAlt: string | null;
  content: string;
  wordCount: number;
  readingTime: number;
  metaTitle: string;
  metaDescription: string;
  createdAt?: string;
  updatedAt?: string;
};

type RawBlogPost = {
  _id?: string;
  id?: string;
  title?: string;
  slug?: string;
  author?: string;
  categoryId?: string;
  tags?: string[];
  status?: "draft" | "published";
  postType?: "normal" | "special";
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  content?: string;
  wordCount?: number;
  readingTime?: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
};

type MediaItem = {
  id: string;
  name: string;
  alt: string;
  url: string;
};







const TelegramIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.665 3.717 2.935 10.708c-1.21.503-1.203 1.201-.222 1.502l4.552 1.419 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.427Z"
      fill="currentColor"
    />
  </svg>
);

const IconHome = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
    <path d="M9 20v-6h6v6" />
  </svg>
);



/* ─── FEATURED IMAGE SVG (dark + light) ─── */
const HERO_DARK = {
  bg: "#050C1E",
  glow1: "rgba(0,229,255,0.1)",
  glow2: "rgba(239,68,68,0.07)",
  grid: "rgba(0,229,255,0.035)",
  chainBlur: "rgba(0,229,255,0.4)",
  chain: "rgba(0,229,255,0.2)",
  nodeFill: "rgba(0,229,255,0.05)",
  nodeStroke: "rgba(0,229,255,0.3)",
  bar1: "rgba(0,229,255,0.3)",
  bar2: "rgba(0,229,255,0.18)",
  bar3: "rgba(0,229,255,0.15)",
  bar4: "rgba(0,229,255,0.1)",
  dot: "#00E5FF",
  dotOpacity: 0.7,
  alertRing1: "rgba(239,68,68,0.2)",
  alertRing2: "rgba(239,68,68,0.3)",
  alertCoreFill: "rgba(239,68,68,0.5)",
  alertCoreStroke: "rgba(239,68,68,0.8)",
  tagFill: "rgba(0,229,255,0.07)",
  tagStroke: "rgba(0,229,255,0.2)",
  tagText: "rgba(0,229,255,0.5)",
  scatterFill: "rgba(0,229,255,0.15)",
  scatterStroke: "rgba(0,229,255,0.3)",
  dashed: "rgba(0,229,255,0.1)",
  scanLine: "rgba(0,229,255,0.08)",
  footerBar: "rgba(5,12,30,0.5)",
  footerText: "rgba(0,229,255,0.25)",
};

const HERO_LIGHT = {
  bg: "#F3F7FD",
  glow1: "rgba(29,78,216,0.10)",
  glow2: "rgba(239,68,68,0.06)",
  grid: "rgba(30,58,138,0.055)",
  chainBlur: "rgba(29,78,216,0.28)",
  chain: "rgba(30,58,138,0.38)",
  nodeFill: "#FFFFFF",
  nodeStroke: "rgba(30,58,138,0.32)",
  bar1: "rgba(30,58,138,0.40)",
  bar2: "rgba(30,58,138,0.26)",
  bar3: "rgba(30,58,138,0.20)",
  bar4: "rgba(30,58,138,0.14)",
  dot: "#1D4ED8",
  dotOpacity: 0.9,
  alertRing1: "rgba(239,68,68,0.22)",
  alertRing2: "rgba(239,68,68,0.35)",
  alertCoreFill: "rgba(239,68,68,0.6)",
  alertCoreStroke: "rgba(220,38,38,0.95)",
  tagFill: "#FFFFFF",
  tagStroke: "rgba(30,58,138,0.28)",
  tagText: "rgba(30,58,138,0.75)",
  scatterFill: "rgba(29,78,216,0.14)",
  scatterStroke: "rgba(30,58,138,0.38)",
  dashed: "rgba(30,58,138,0.22)",
  scanLine: "rgba(30,58,138,0.12)",
  footerBar: "rgba(255,255,255,0.75)",
  footerText: "rgba(30,58,138,0.5)",
};

const HeroImage = () => {
  const { darkMode } = useTheme();
  const c = darkMode ? HERO_DARK : HERO_LIGHT;
  const chainD =
    "M80 190 L200 140 L340 190 L480 120 L600 170 L740 110 L880 160 L960 140";

  return (
    <svg width="100%" height="100%" viewBox="0 0 1000 380" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <defs>
        <radialGradient id="hg1" cx="25%" cy="50%" r="55%">
          <stop offset="0%" stopColor={c.glow1} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="hg2" cx="75%" cy="40%" r="45%">
          <stop offset="0%" stopColor={c.glow2} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="hblur"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="hshadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1E3A8A" floodOpacity="0.14" />
        </filter>
      </defs>

      <rect width="1000" height="380" fill={c.bg} />
      <rect width="1000" height="380" fill="url(#hg1)" />
      <rect width="1000" height="380" fill="url(#hg2)" />

      {/* Grid */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 28} x2="1000" y2={i * 28} stroke={c.grid} strokeWidth="1" />
      ))}
      {Array.from({ length: 34 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="380" stroke={c.grid} strokeWidth="1" />
      ))}

      {/* Main chain path */}
      <path d={chainD} stroke={c.chainBlur} strokeWidth="1.5" fill="none" filter="url(#hblur)" />
      <path d={chainD} stroke={c.chain} strokeWidth="1" fill="none" />

      {/* Block nodes */}
      {[
        { x: 200, y: 140 }, { x: 340, y: 190 }, { x: 480, y: 120 },
        { x: 600, y: 170 }, { x: 740, y: 110 }, { x: 880, y: 160 },
      ].map((p, i) => (
        <g key={i} filter={darkMode ? undefined : "url(#hshadow)"}>
          <rect x={p.x - 20} y={p.y - 22} width="40" height="44" rx="4" fill={c.nodeFill} stroke={c.nodeStroke} strokeWidth="1" />
          <rect x={p.x - 12} y={p.y - 14} width="24" height="3" rx="1" fill={c.bar1} />
          <rect x={p.x - 12} y={p.y - 7} width="17" height="2.5" rx="1" fill={c.bar2} />
          <rect x={p.x - 12} y={p.y - 1} width="20" height="2.5" rx="1" fill={c.bar3} />
          <rect x={p.x - 12} y={p.y + 6} width="12" height="2" rx="1" fill={c.bar4} />
          <circle cx={p.x} cy={p.y - 22} r="3.5" fill={c.dot} opacity={c.dotOpacity} />
        </g>
      ))}

      {/* Alert node – the "caught" point */}
      <circle cx="480" cy="120" r="22" fill="transparent" stroke={c.alertRing1} strokeWidth="1" />
      <circle cx="480" cy="120" r="14" fill="transparent" stroke={c.alertRing2} strokeWidth="1" />
      <circle cx="480" cy="120" r="5" fill={c.alertCoreFill} stroke={c.alertCoreStroke} strokeWidth="1.5" />

      {/* USDT labels */}
      {[{ x: 200, y: 110 }, { x: 600, y: 140 }].map((p, i) => (
        <g key={i}>
          <rect x={p.x - 20} y={p.y - 10} width="40" height="14" rx="3" fill={c.tagFill} stroke={c.tagStroke} strokeWidth="1" />
          <text x={p.x} y={p.y} textAnchor="middle" fontSize="7" fill={c.tagText} fontFamily="monospace">USDT</text>
        </g>
      ))}

      {/* Scatter nodes */}
      {[[120, 60], [300, 300], [700, 280], [900, 60], [150, 310], [820, 300]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={c.scatterFill} stroke={c.scatterStroke} strokeWidth="1" />
      ))}

      {/* Dashed lines to scatter */}
      <line x1="200" y1="140" x2="120" y2="60" stroke={c.dashed} strokeWidth="1" strokeDasharray="4 4" />
      <line x1="740" y1="110" x2="900" y2="60" stroke={c.dashed} strokeWidth="1" strokeDasharray="4 4" />

      {/* Bottom scan line */}
      <line x1="0" y1="370" x2="1000" y2="370" stroke={c.scanLine} strokeWidth="1" />
      <rect x="0" y="355" width="1000" height="25" fill={c.footerBar} />
      <text x="20" y="368" fontSize="8" fill={c.footerText} fontFamily="monospace">
        PARAHOOR FORENSICS // CASE ANALYSIS // ON-CHAIN TRACE // REF-48291
      </text>
    </svg>
  );
};




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

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */

const CATEGORY_FALLBACK = "بدون دسته‌بندی";

const BLOG_CATEGORIES = [
  {
    id: "forensic-reports",
    label: "گزارش‌های جرم‌شناسی",
  },
  {
    id: "legal-news",
    label: "اخبار حقوقی",
  },
  {
    id: "solved-cases",
    label: "پرونده‌های حل‌شده",
  },
  {
    id: "security-alerts",
    label: "هشدارهای امنیتی",
  },
  {
    id: "security-education",
    label: "آموزش امنیت و تهدیدات سایبری",
  },
];

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */

function normalizePost(post: RawBlogPost): BlogPost | null {
  const id = post._id || post.id;

  if (!id) return null;

  return {
    _id: String(id),
    title: String(post.title || ""),
    slug: String(post.slug || ""),
    author: String(post.author || ""),
    categoryId: String(post.categoryId || ""),
    tags: Array.isArray(post.tags) ? post.tags.map(String) : [],
    status: post.status === "published" ? "published" : "draft",
    postType: post.postType === "special" ? "special" : "normal",
    featuredImage: post.featuredImage || null,
    featuredImageAlt: post.featuredImageAlt || null,
    content: String(post.content || ""),
    wordCount: Number(post.wordCount || 0),
    readingTime: Number(post.readingTime || 0),
    metaTitle: String(post.metaTitle || ""),
    metaDescription: String(post.metaDescription || ""),
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

function getCategoryLabel(categoryId?: string) {
  if (!categoryId) return CATEGORY_FALLBACK;

  return (
    BLOG_CATEGORIES.find(
      (category) => category.id === categoryId
    )?.label || CATEGORY_FALLBACK
  );
}

function findMedia(
  featuredImage: string | null | undefined,
  mediaItems: MediaItem[]
) {
  if (!featuredImage) return undefined;

  return mediaItems.find(
    (item) =>
      item.id === featuredImage ||
      item.url === featuredImage ||
      `/api/media/${item.id}` === featuredImage
  );
}

function getMediaUrl(
  featuredImage: string | null | undefined,
  mediaItems: MediaItem[]
) {
  const media = findMedia(featuredImage, mediaItems);

  if (media?.url) return media.url;

  if (featuredImage?.startsWith("/api/media/")) {
    return featuredImage;
  }

  if (featuredImage?.startsWith("http://")) {
    return featuredImage;
  }

  if (featuredImage?.startsWith("https://")) {
    return featuredImage;
  }

  return "";
}

function stripHtml(value?: string) {
  if (!value) return "";

  return value
    .replace(/<br\s*\/?>/gi, " ")
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

function getExcerpt(content?: string, maxLength = 180) {
  const text = stripHtml(content);

  if (!text) return "";

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}…`;
}

function formatPersianDate(value?: string) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function getInitials(author?: string) {
  if (!author?.trim()) return "";

  return author
    .trim()
    .split(/\s+/)
    .map((word) => word[0] || "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getCategoryBadgeStyle(
  category: string,
  darkMode: boolean
): React.CSSProperties {
  if (darkMode) {
    const styles: Record<string, React.CSSProperties> = {
      "گزارش‌های جرم‌شناسی": {
        background: "rgba(84,184,255,0.08)",
        border: "1px solid rgba(84,184,255,0.25)",
        color: "#54B8FF",
      },
      "اخبار حقوقی": {
        background: "rgba(158,175,255,0.08)",
        border: "1px solid rgba(158,175,255,0.24)",
        color: "#9EAFFF",
      },
      "پرونده‌های حل‌شده": {
        background: "rgba(34,197,94,0.08)",
        border: "1px solid rgba(34,197,94,0.24)",
        color: "#7BE495",
      },
      "هشدارهای امنیتی": {
        background: "rgba(248,200,90,0.08)",
        border: "1px solid rgba(248,200,90,0.24)",
        color: "#F8C85A",
      },
      "آموزش امنیت و تهدیدات سایبری": {
        background: "rgba(125,211,252,0.08)",
        border: "1px solid rgba(125,211,252,0.24)",
        color: "#7DD3FC",
      },
    };

    return (
      styles[category] || {
        background: "rgba(0,229,255,0.06)",
        border: "1px solid rgba(0,229,255,0.2)",
        color: "#00E5FF",
      }
    );
  }

  // ← این بخش قبلاً خالی از منطق رنگی بود، حالا برای هر دسته رنگ جدا داره
  const lightStyles: Record<string, React.CSSProperties> = {
    "گزارش‌های جرم‌شناسی": {
      background: "rgba(29,78,216,0.06)",
      border: "1px solid rgba(29,78,216,0.18)",
      color: "#1D4ED8",
    },
    "اخبار حقوقی": {
      background: "rgba(99,102,241,0.06)",
      border: "1px solid rgba(99,102,241,0.18)",
      color: "#4F46E5",
    },
    "پرونده‌های حل‌شده": {
      background: "rgba(16,185,129,0.08)",
      border: "1px solid rgba(16,185,129,0.20)",
      color: "#047857",
    },
    "هشدارهای امنیتی": {
      background: "rgba(245,158,11,0.08)",
      border: "1px solid rgba(245,158,11,0.20)",
      color: "#B45309",
    },
    "آموزش امنیت و تهدیدات سایبری": {
      background: "rgba(2,132,199,0.08)",
      border: "1px solid rgba(2,132,199,0.18)",
      color: "#0369A1",
    },
  };

  return (
    lightStyles[category] || {
      background: "rgba(30,58,138,0.06)",
      border: "1px solid rgba(30,58,138,0.20)",
      color: "#1E3A8A",
    }
  );
}

/* ─────────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────────── */

const IconWarning = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconTelegram = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.5 4.5L2.5 12l7 2.5" />
    <path d="M9.5 14.5l2.5 5 3-8" />
    <path d="M9.5 14.5l8-8" />
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

const IconClock = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
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

const IconCalendar = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconShare = () => (
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
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const IconLink = () => (
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
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
);

const IconArrowLeft = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   HERO IMAGE FALLBACK
───────────────────────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────────────────────
   ERROR
───────────────────────────────────────────────────────────── */

function ErrorScreen({
  onRetry,
  darkMode,
}: {
  onRetry: () => void;
  darkMode: boolean;
}) {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background: darkMode ? "#0A1128" : "#FFFFFF",
        color: darkMode ? "#E2E8F0" : "#0F172A",
        fontFamily: "var(--font-vazirmatn), sans-serif",
      }}
    >
      <div
        className="w-full max-w-md text-center p-8 rounded-2xl"
        style={{
          background: darkMode
            ? "linear-gradient(135deg, #07152F 0%, #0A214A 48%, #071A3A 100%)"
            : "#FFFFFF",
          border: darkMode
            ? "1px solid rgba(239,68,68,0.18)"
            : "1px solid rgba(30,58,138,0.16)",
          boxShadow: darkMode
            ? "none"
            : "0 14px 40px rgba(30,58,138,0.08)",
        }}
      >
        <div
          className="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: darkMode
              ? "rgba(239,68,68,0.08)"
              : "rgba(30,58,138,0.06)",
            color: darkMode ? "#EF4444" : "#1E3A8A",
          }}
        >
          <IconWarning />
        </div>

        <h2
          className="font-bold mb-2"
          style={{
            color: darkMode ? "#fff" : "#0F172A",
          }}
        >
          مقاله پیدا نشد
        </h2>

        <p
          className="text-sm mb-6"
          style={{
            color: darkMode ? "#475569" : "#64748B",
            lineHeight: 1.8,
          }}
        >
          این مقاله وجود ندارد یا هنوز منتشر نشده است.
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: darkMode
              ? "rgba(0,229,255,0.06)"
              : "rgba(30,58,138,0.06)",
            border: darkMode
              ? "1px solid rgba(0,229,255,0.18)"
              : "1px solid rgba(30,58,138,0.20)",
            color: darkMode ? "#00E5FF" : "#1E3A8A",
          }}
        >
          تلاش مجدد
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   APP
───────────────────────────────────────────────────────────── */

export default function App({
  initialPost,
  initialAllPosts,
  initialMediaItems,
  initialComments,
  initialError = false,
}: {
  initialPost: BlogPost | null;
  initialAllPosts: BlogPost[];
  initialMediaItems: MediaItem[];
  initialComments: ApprovedComment[];
  initialError?: boolean;
}) {
  const { darkMode } = useTheme();
  const accent = darkMode ? "#00E5FF" : "#1D4ED8";

  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [error, setError] = useState(initialError);

  const [post, setPost] = useState<BlogPost | null>(initialPost);
  const [allPosts, setAllPosts] = useState<BlogPost[]>(initialAllPosts);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMediaItems);
  const [crisisOpen, setCrisisOpen] = useState(false);

  const loadPost = async () => {
    try {
      setError(false);

      const [postsResponse, mediaResponse] = await Promise.all([
        fetch("/api/posts", {
          cache: "no-store",
        }),
        fetch("/api/media", {
          cache: "no-store",
        }),
      ]);

      const postsResult = await postsResponse.json();

      if (!postsResponse.ok) {
        throw new Error(
          postsResult?.message || "خطا در دریافت پست‌ها"
        );
      }

      const rawPosts: RawBlogPost[] = Array.isArray(postsResult)
        ? postsResult
        : Array.isArray(postsResult?.posts)
        ? postsResult.posts
        : [];

      const normalizedPosts = rawPosts
        .map(normalizePost)
        .filter(
          (item): item is BlogPost => item !== null
        );

      const publishedPosts = normalizedPosts.filter(
        (item) => item.status === "published"
      );

      setAllPosts(publishedPosts);

      const currentPath =
        typeof window !== "undefined"
          ? window.location.pathname
          : "";

      const currentSlug = currentPath.split("/").filter(Boolean).pop() || "";

      const currentPost = publishedPosts.find(
        (item) =>
          item.slug === currentSlug ||
          item._id === currentSlug
      );

      if (!currentPost) {
        setPost(null);
        setError(true);
      } else {
        setPost(currentPost);
      }

      if (mediaResponse.ok) {
        const mediaResult = await mediaResponse.json();

        const media: MediaItem[] = Array.isArray(mediaResult)
          ? mediaResult
          : Array.isArray(mediaResult?.media)
          ? mediaResult.media
          : Array.isArray(mediaResult?.items)
          ? mediaResult.items
          : [];

        setMediaItems(media);
      } else {
        setMediaItems([]);
      }
    } catch (err) {
      console.error("GET single blog error:", err);

      setPost(null);
      setAllPosts([]);
      setMediaItems([]);
      setError(true);
    }
  };

  const category = useMemo(() => {
    return getCategoryLabel(post?.categoryId);
  }, [post?.categoryId]);

  const featuredImageUrl = useMemo(() => {
    return getMediaUrl(
      post?.featuredImage,
      mediaItems
    );
  }, [post?.featuredImage, mediaItems]);

  const featuredImageAlt =
    post?.featuredImageAlt?.trim() ||
    post?.title ||
    category;

  const initials = useMemo(() => {
    return getInitials(post?.author);
  }, [post?.author]);

  const articleDate = useMemo(() => {
    return formatPersianDate(
      post?.createdAt || post?.updatedAt
    );
  }, [post?.createdAt, post?.updatedAt]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];

    return allPosts
      .filter((item) => item._id !== post._id)
      .filter((item) => {
        if (!post.categoryId) return true;

        return item.categoryId === post.categoryId;
      })
      .slice(0, 3);
  }, [allPosts, post]);

  const nextPost = useMemo(() => {
    if (!post) return null;

    const sameCategory = allPosts.filter(
      (item) =>
        item._id !== post._id &&
        item.categoryId === post.categoryId
    );

    return sameCategory[0] || null;
  }, [allPosts, post]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleTelegramShare = () => {
    const url = encodeURIComponent(
      window.location.href
    );

    const text = encodeURIComponent(
      post?.title || ""
    );

    window.open(
      `https://t.me/share/url?url=${url}&text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };


  if (error) {
    return (
      <ErrorScreen
        onRetry={loadPost}
        darkMode={darkMode}
      />
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div
      dir="rtl"
      className={`min-h-screen transition-colors duration-300 pt-[70px] ${
        darkMode
          ? "bg-[#0A1128] text-[#E6F7FF]"
          : "bg-white text-[#0F172A]"
      }`}
      style={{
        fontFamily: "var(--font-vazirmatn), sans-serif",

      }}
    >






{/* ─── BREADCRUMB ─── */}

    <section
  className="flex justify-center"
  style={{
    background: darkMode ? "#070D1E" : "#F1F5FB",
  }}
>
  <div className="px-6 md:px-12 mt-[10px]">
    <nav
      aria-label="مسیر راهنما"
      className="max-w-4xl mx-auto py-3"
    >
      
    <ol className="flex items-center gap-2 whitespace-nowrap overflow-x-auto text-xs">
      <li className="flex items-center">
        <Link
    href="/"
    className={`flex items-center gap-1.5 leading-none transition-colors ${
      darkMode
        ? "text-[#64748B] hover:text-[#00E5FF]"
        : "text-[#475569] hover:text-[#1565C0]"
    }`}
  >
          <IconHome />
          خانه
        </Link>
      </li>

      <li className={`flex items-center ${darkMode ? "text-[#334155]" : "text-[#94A3B8]"}`}>
        <IconChevronLeft />
      </li>

      <li>
        <Link
          href="/blogs"
          className={`transition-colors ${
            darkMode
              ? "text-[#64748B] hover:text-[#00E5FF]"
              : "text-[#475569] hover:text-[#1565C0]"
          }`}
        >
          وبلاگ
        </Link>
      </li>

      <li className={`flex items-center ${darkMode ? "text-[#334155]" : "text-[#94A3B8]"}`}>
        <IconChevronLeft />
      </li>

      <li>
        <span
          aria-current="page"
          className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md"
          style={{
            color: darkMode ? "#00E5FF" : "#1565C0",
            background: darkMode ? "rgba(0,229,255,0.055)" : "rgba(21,101,192,0.08)",
            border: darkMode
              ? "1px solid rgba(0,229,255,0.1)"
              : "1px solid rgba(21,101,192,0.2)",
          }}
        >
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: darkMode ? "#00E5FF" : "#1565C0",
              display: "inline-block",
            }}
          />
          {category}
        </span>
      </li>
    </ol>
  </nav>
</div>
</section>


      {/* ───────────────── ARTICLE HEADER ───────────────── */}

      <header className="px-6 pt-14 pb-10 md:px-12 md:pt-20">
        <div className="max-w-4xl mx-auto">


          {/* Category */}

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg mb-5 text-xs font-semibold"
            style={getCategoryBadgeStyle(
              category,
              darkMode
            )}
          >

            {category}
          </div>

          {/* H1 */}

          <h1
            className="font-black mb-6 leading-snug h-auto max-w-full whitespace-normal break-words overflow-visible"
            style={{
              fontSize:
                "clamp(1.55rem,4vw,2.4rem)",
              color: darkMode
                ? "#fff"
                : "black",
              lineHeight: 1.4,
              textShadow: darkMode
                ? "0 0 60px rgba(0,229,255,0.08)"
                : "none",
              overflowWrap: "anywhere",
              wordBreak: "normal",
            }}
          >
            {post.title}
          </h1>

          {/* Meta */}

          <div
            className="flex flex-wrap items-center gap-4 pb-7"
            style={{
              borderBottom: darkMode
                ? "1px solid rgba(0,229,255,0.08)"
                : "1px solid rgba(30,58,138,0.12)",
            }}
          >
            {articleDate && (
              <div
                className="flex items-center gap-1.5"
                style={{
                  color: darkMode
                    ? "#475569"
                    : "#64748B",
                  fontSize: "0.78rem",
                }}
              >
                <IconCalendar />
                <span>{articleDate}</span>
              </div>
            )}

            {post.author && (
              <Link
              href={post.author === "محمدرضا یوسفی" ? "/authors/mohammadreza-yousefi" : "/authors/alireza-tabatabaei-hashemi"}
              style={{
                  
                fontSize: "0.78rem",
              }}
                className={`flex items-center gap-1.5  ${darkMode
                  ? "text-gray-600 hover:text-gray-500"
                  : "text-[#475569]"
                }`}
              >

                       <IconUser />
                <div >
                  {post.author}
                </div>
              </Link>
            )}

            {post.readingTime > 0 && (
              <div
                className="flex items-center gap-1.5"
                style={{
                  color: darkMode
                    ? "#475569"
                    : "#64748B",
                  fontSize: "0.78rem",
                }}
              >
                <IconClock />
                <span>
                  {post.readingTime} دقیقه مطالعه
                </span>
              </div>
            )}

            <div
              className="flex items-center gap-1.5 mr-auto"
              style={{
                background:
                  post.postType === "special"
                    ? "rgba(239,68,68,0.05)"
                    : darkMode
                    ? "rgba(0,229,255,0.05)"
                    : "rgba(30,58,138,0.05)",
                border:
                  post.postType === "special"
                    ? "1px solid rgba(239,68,68,0.15)"
                    : darkMode
                    ? "1px solid rgba(0,229,255,0.12)"
                    : "1px solid rgba(30,58,138,0.14)",
                borderRadius: 8,
                padding: "3px 10px",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background:
                    post.postType === "special"
                      ? "#EF4444"
                      : "#22C55E",
                  display: "inline-block",
                }}
              />

              <span
                style={{
                  color:
                    post.postType === "special"
                      ? "#EF4444"
                      : "#22C55E",
                  fontSize: "0.68rem",
                  // fontFamily: "monospace",
                  letterSpacing: "0.1em",
                }}
              >
                {post.postType === "special"
                  ? "پرونده ویژه"
                  : "گزارش منتشرشده"}
              </span>
            </div>
          </div>
        </div>
      </header>

            {/* ─── FEATURED IMAGE ─── */}
      <div className="px-6 pb-12 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl"
            style={{ height: "clamp(200px,40vw,380px)", border: darkMode ? "1px solid rgba(0,229,255,0.12)" : "1px solid rgba(42, 108, 188, 0.33)" }}>
            <HeroImage />
            {/* Overlay vignette */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(10, 17, 40, 0.47) 100%)" }} />
          </div>
          {/* <p className="mt-2.5 text-xs text-center" style={{ color: "#1E293B", fontFamily: "monospace", letterSpacing: "0.1em" }}>
            نمودار ردیابی جریان تراکنش‌ها — پرونده MySol // REF-48291
          </p> */}
        </div>
      </div>
      {/* ───────────────── ARTICLE CONTENT ───────────────── */}

      <article className="px-6 pb-6 md:px-12">
        <div
          className="max-w-4xl mx-auto"
          style={{
            fontSize:
              "clamp(0.92rem,1.8vw,1.02rem)",
            lineHeight: 1.95,
            color: darkMode
              ? "#94A3B8"
              : "#475569",
          }}
        >
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{
              __html: post.content || "",
            }}
          />
        </div>
      </article>

      {/* ───────────────── TAGS ─────────────────

      {post.tags.length > 0 && (
        <div className="px-6 pb-8 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div
              className="flex flex-wrap items-center gap-2 pt-7"
              style={{
                borderTop: darkMode
                  ? "1px solid rgba(0,229,255,0.07)"
                  : "1px solid rgba(30,58,138,0.10)",
              }}
            >
              <span
                style={{
                  color: darkMode
                    ? "#334155"
                    : "#64748B",
                  fontSize: "0.75rem",
                  marginLeft: 4,
                }}
              >
                برچسب‌ها:
              </span>

              {post.tags.map((tag) => (
                <p
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-medium"
                  style={{
                    background: darkMode
                      ? "rgba(0,229,255,0.05)"
                      : "rgba(32, 113, 205, 0.08)",
                    border: darkMode
                      ? "1px solid rgba(0,229,255,0.15)"
                      : "1px solid rgba(26, 103, 212, 0.43)",
                    color: darkMode
                      ? "#00E5FF"
                      : "#1565C0",
                    fontFamily: "monospace",
                  }}
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
        </div>
      )} */}

      {/* ───────────────── CTA ───────────────── */}

<div className="px-6 py-10 md:px-12">
  <div
  className={`max-w-3xl mx-auto rounded-2xl`}
      style={{
        boxShadow: darkMode
          ? "0 18px 60px rgba(0, 229, 255, 0), 0 0 70px rgba(0,229,255,0.05)"
          : "0 18px 50px rgba(48, 94, 175, 0.32)",

        transition:
          "border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease, background 300ms ease",
      }}  
  >
    <div
      className="relative p-8 md:p-12 rounded-2xl text-center overflow-hidden" 
            style={{ 
              background: darkMode ? "rgba(255,255,255,0.03)" : "#ebebeb4b", 
              border: darkMode 
                ? "1px solid rgba(0,229,255,0.18)" 
                : "1px solid rgba(39, 83, 206, 0.72)", 
              boxShadow: darkMode 
                ? "0 0 60px rgba(0,229,255,0.06), 0 0 100px rgba(0,229,255,0.03), inset 0 0 60px rgba(0,229,255,0.02)" 
                : "0 4px 20px rgba(15,23,42,0.06)", 
            }} 

     
    >

      {/* Corner accents */} 
            <div 
              style={{ 
                position: "absolute", 
                top: 0, 
                right: 0, 
                width: 60, 
                height: 60, 
                borderTop: darkMode 
                  ? "2px solid rgba(0,229,255,0.3)" 
                  : "2px solid #1565C0", 
                borderRight: darkMode 
                  ? "2px solid rgba(0,229,255,0.3)" 
                  : "2px solid #1565C0", 
                borderRadius: "0 16px 0 0" 
              }} 
            /> 

            <div 
              style={{ 
                position: "absolute", 
                bottom: 0, 
                left: 0, 
                width: 60, 
                height: 60, 
                borderBottom: darkMode 
                  ? "2px solid rgba(0,229,255,0.3)" 
                  : "2px solid #1565C0", 
                borderLeft: darkMode 
                  ? "2px solid rgba(0,229,255,0.3)" 
                  : "2px solid #1565C0", 
                borderRadius: "0 0 0 16px" 
              }} 
            /> 



      {/* Subtle Dark Mode Glow */}
      {darkMode && (
        <div
          style={{
            position: "absolute",
            width: 260,
            height: 260,
            top: -160,
            right: -100,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,229,255,0.09) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}

      <div className="relative z-10">
     {/* Title */}

                   <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg mb-5 text-xs font-semibold"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.28)", color: "#EF4444" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#EF4444", display: "inline-block", boxShadow: "0 0 5px rgba(239,68,68,0.9)", animation: "pulse-cyan 1.5s infinite" }} />
                توجه فوری
              </div>
        <h3
          className="font-bold mb-3"
          style={{
            color: darkMode
              ? "#FFFFFF"
              : "black",

            fontSize:
              "clamp(1.05rem,2.5vw,1.4rem)",

            lineHeight: 1.45,
          }}
        >
          آیا قربانی کلاهبرداری مشابهی شده‌اید؟
          <br />
          زمان را از دست ندهید.
        </h3>

        {/* Description */}
        <p
          className="mb-7 mx-auto"
          style={{
            color: darkMode
              ? "#CBD5E1"
              : "#475569",

            fontSize: "0.87rem",
            lineHeight: 1.85,
            maxWidth: 440,
          }}
        >
          هر ساعت، ردپاها محو‌تر می‌شوند.
          درخواست بررسی اولیه کاملاً رایگان است.
        </p>

        {/* CTA Button */}
<button
  type="button"
  className="inline-flex items-center justify-center gap-2 px-14 py-3.5 rounded-xl font-bold transition-all duration-300" 
              style={{ 
                background:  "#EF4444" , 
                color: "#ffffff", 
                border: 
                   "1px solid rgba(239, 68, 68, 0.6)",
                boxShadow: 
                   "0 0 15px rgba(239,68,68,0.35)" 
              }} 
                                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                       "0 0 22px rgba(239,68,68,0.55)"
                    e.currentTarget.style.transform = "translateY(-1px)";
                  
                    
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                       "0 0 15px rgba(239,68,68,0.35)"
                    e.currentTarget.style.transform = "none";
                  

                  }} 
>
  <IconWarning />
  درخواست بررسی
</button>


                  
      </div>
    </div>
  </div>
</div>

      {crisisOpen && (
        <EmergencyModal
          onClose={() => setCrisisOpen(false)}
        />
      )}

           {/* ───────────────── TAGS + SHARE ───────────────── */}

      <div className="px-6 pb-14 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div
            className="flex flex-col gap-5 pt-7 md:flex-row md:items-center md:justify-between"
            style={{
              borderTop: darkMode
                ? "1px solid rgba(0,229,255,0.07)"
                : "1px solid rgba(30,58,138,0.10)",
            }}
          >
            {/* برچسب‌ها */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span
                  style={{
                    color: darkMode ? "#334155" : "#64748B",
                    fontSize: "0.75rem",
                    marginLeft: 4,
                  }}
                >
                  برچسب‌ها:
                </span>

                {post.tags.map((tag) => (
                  <p
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-medium"
                    style={{
                      background: darkMode
                        ? "rgba(0,229,255,0.05)"
                        : "rgba(32, 113, 205, 0.08)",
                      border: darkMode
                        ? "1px solid rgba(0,229,255,0.15)"
                        : "1px solid rgba(26, 103, 212, 0.43)",
                      color: darkMode ? "#00E5FF" : "#1565C0",
                      fontFamily: "monospace",
                    }}
                  >
                    {tag}
                  </p>
                ))}
              </div>
            )}

            {/* اشتراک‌گذاری */}
            <div className="flex items-center gap-3">
              <span
                style={{
                  color: darkMode ? "#334155" : "#64748B",
                  fontSize: "0.75rem",
                }}
              >
                اشتراک‌گذاری:
              </span>

              <button
                type="button"
                onClick={handleTelegramShare}
                title="تلگرام"
                className={`flex items-center justify-center w-[38px] h-[38px] rounded-[10px] transition-all duration-[180ms] ${
                  darkMode
                    ? "bg-white/[0.04] border border-white/[0.08] text-[#475569] hover:bg-[rgba(0,229,255,0.1)] hover:border-[rgba(0,229,255,0.4)] hover:text-[#00E5FF] hover:shadow-[0_0_14px_rgba(0,229,255,0.18)]"
                    : "bg-[rgba(30,58,138,0.03)] border border-[rgba(30,58,138,0.12)] text-[#64748B] hover:bg-[rgba(29,78,216,0.08)] hover:border-[rgba(29,78,216,0.35)] hover:text-[#1D4ED8] hover:shadow-[0_0_14px_rgba(29,78,216,0.12)]"
                }`}
              >
                <TelegramIcon size={16} />
              </button>

              <button
                type="button"
                onClick={handleCopy}
                title="کپی لینک"
                className={`flex items-center justify-center w-[38px] h-[38px] rounded-[10px] transition-all duration-[180ms] ${
                  darkMode
                    ? "bg-white/[0.04] border border-white/[0.08] text-[#475569] hover:bg-[rgba(0,229,255,0.1)] hover:border-[rgba(0,229,255,0.4)] hover:text-[#00E5FF] hover:shadow-[0_0_14px_rgba(0,229,255,0.18)]"
                    : "bg-[rgba(30,58,138,0.03)] border border-[rgba(30,58,138,0.12)] text-[#64748B] hover:bg-[rgba(29,78,216,0.08)] hover:border-[rgba(29,78,216,0.35)] hover:text-[#1D4ED8] hover:shadow-[0_0_14px_rgba(29,78,216,0.12)]"
                }`}
              >
                {copied ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={darkMode ? "#00E5FF" : "#1E3A8A"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <IconLink />
                )}
              </button>
            </div>
          </div>


          {/* ───────────── RELATED POSTS ───────────── */}

          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <div className="flex justify-between items-center gap-2 mb-5 px-1">
<div className="flex items-center gap-2">
  <span
    style={{
      display: "block",
      flexShrink: 0,
      width: 4,
      height: 18,
      borderRadius: 99,
      background: darkMode ? "#00E5FF" : "#1565C0",
    }}
  />

                <h3
                  className="font-bold text-sm"
                  style={{
                    color: darkMode
                      ? "#E2E8F0"
                      : "#0F172A",
                  }}
                >
                  گزارش‌های مرتبط
                </h3>
                </div>

                
              </div>










<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
  {relatedPosts.map((related) => {
    const relatedImage = getMediaUrl(related.featuredImage, mediaItems);
    const relatedCategory = getCategoryLabel(related.categoryId);
    const relatedExcerpt =
      related.content
        ?.replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim() || "";

    return (
      <Link href={`/blogs/${related.slug || related._id}`}>

      <article
        key={related._id}
className={`group flex flex-col rounded-2xl overflow-hidden transition-all duration-200 ${
                         darkMode
                           ? "border border-cyan-500/30 hover:border-cyan-600 bg-[rgba(255,255,255,0.028)] hover:bg-cyan-900/15"
                           : "bg-white border border-[#0B1C3E]/10 hover:border-[#1565C0]/25 hover:shadow-md"
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
        {/* Thumbnail */}
        <div
          className={`relative aspect-video overflow-hidden flex-shrink-0 ${
            darkMode ? "bg-[#0D1B29]" : "bg-[#F1F5F9]"
          }`}
        >
          {relatedImage ? (
            <img
              src={relatedImage}
              alt={related.featuredImageAlt?.trim() || related.title}
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
                <ArticleThumb accent={accent} seed={relatedPosts.indexOf(related)} />
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
  className="absolute top-3 right-3 z-10 max-w-[calc(100%-1.5rem)] truncate text-[11px] font-bold px-2.5 py-1 rounded-full"
  style={{
    color: darkMode ? "#4babeb" : "#295db1",
    background: darkMode
      ? "rgba(11, 25, 62, 0.89)"
      : "rgba(233, 243, 255, 0.95)",
    border: darkMode
      ? "1px solid rgba(0,229,255,0.35)"
      : "1px solid rgba(255,255,255,0.35)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
  }}
>
  {relatedCategory}
</span>
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5 lg:p-6">
          {/* Title */}
          <h3
            className={`text-base font-bold leading-snug mb-3 break-words line-clamp-2 ${
              darkMode
                ? "text-[#E6F7FF]"
                : "text-[#111827] group-hover:text-[#1565C0] transition-colors duration-300"
            }`}
          >
            {related.title}
          </h3>

          {/* Excerpt */}
          <p
            className={`text-[13px] leading-relaxed line-clamp-2 break-words mb-5 flex-1 ${
              darkMode ? "text-[#9DB0C0]" : "text-[#334155]"
            }`}
          >
            {relatedExcerpt}
          </p>

          {/* Footer */}
          <div
            className={`mt-auto pt-4 border-t flex flex-nowrap items-center justify-between gap-3 ${
              darkMode ? "border-[#1E334A]" : "border-[#E2E8F0]"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border ${
                  darkMode ? "border-transparent" : "border-[#1565C0]/25"
                }`}
              >
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <IconUser />
                </div>
              </span>

              <div className="min-w-0 flex-1">
                <div className="min-w-0">
                  <span
                    className={`block text-xs font-semibold truncate pb-1 transition-all duration-300 ${
                      darkMode ? "text-[#9DB0C0] hover:text-white/80" : "text-[#475569]"
                    }`}
                  >
                    {related.author}
                  </span>
                </div>

                <div
                  className={`flex flex-nowrap items-center gap-x-2 text-[10px] whitespace-nowrap ${
                    darkMode ? "text-[#71869A]" : "text-[#64748B]"
                  }`}
                >
                  <span className="text-[11px]">{formatPersianDate(related.createdAt || related.updatedAt)}</span>
                  {/* <span>·</span> */}
                  <span className="inline-flex items-center gap-1 text-[11px]">
                    <Clock className="w-2.5 h-2.5" />
                    {related.readingTime || 0} دقیقه
                  </span>
                </div>
              </div>
            </div>

            <span
              
            className={`flex items-center gap-1 text-xs font-semibold whitespace-nowrap group-hover:gap-1.5 transition-all flex-shrink-0 ${
              darkMode ? "text-[#00E5FF]" : "text-[#1565C0]"
            }`}
            >
              ادامه مطلب
              <ChevronLeft className="w-3 h-3" />
            </span>
          </div>
        </div>
      </article>
      </Link>
    );
  })}

  
</div>




            </div>
          )}

<CommentSection postId={post._id} darkMode={darkMode} initialComments={initialComments} />


        </div>
      </div>

      {/* ───────────────── CONTENT STYLES ───────────────── */}

      <style jsx global>{`
        .blog-content {
          direction: rtl;
        }

        .blog-content p {
          margin: 0 0 1.45rem;
          color: ${darkMode ? "#94a3b8" : "#475569"};
          line-height: 1.95;
        }

        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4 {
          color: ${darkMode ? "#ffffff" : "#1E3A8A"};
          font-weight: 700;
          line-height: 1.5;
          margin-top: 2.1rem;
          margin-bottom: 1rem;
        }

        .blog-content h1 {
          font-size: clamp(1.45rem, 3vw, 2rem);
        }

        .blog-content h2 {
          font-size: clamp(1.15rem, 2.4vw, 1.4rem);
        }

        .blog-content h3 {
          font-size: clamp(1rem, 2vw, 1.15rem);
        }

        .blog-content h4 {
          font-size: 1rem;
        }

        .blog-content strong {
          color: ${darkMode ? "#e2e8f0" : "#0F172A"};
          font-weight: 700;
        }

        .blog-content em {
          color: ${darkMode ? "#cbd5e1" : "#475569"};
        }

        .blog-content a {
          color: ${darkMode ? "#00e5ff" : "#1E3A8A"};
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .blog-content ul,
        .blog-content ol {
          margin: 1.25rem 0 1.5rem;
          padding-right: 1.5rem;
          color: ${darkMode ? "#94a3b8" : "#475569"};
        }

        .blog-content ul {
          list-style: disc;
        }

        .blog-content ol {
          list-style: decimal;
        }

        .blog-content li {
          margin-bottom: 0.55rem;
          line-height: 1.9;
        }

        .blog-content blockquote {
          margin: 2rem 0;
          padding: 1rem 1.25rem;
          border-right: 3px solid
            ${darkMode ? "#00e5ff" : "#1E3A8A"};
          background: ${darkMode
            ? "rgba(0,229,255,0.035)"
            : "rgba(30,58,138,0.045)"};
          color: ${darkMode ? "#cbd5e1" : "#475569"};
          border-radius: 0.5rem;
        }

        .blog-content pre {
          direction: ltr;
          text-align: left;
          overflow-x: auto;
          margin: 1.75rem 0;
          padding: 1.2rem 1.3rem;
          border-radius: 0.75rem;
          background: ${darkMode ? "#050c1e" : "#F8FAFC"};
          border: 1px solid
            ${darkMode
              ? "rgba(0,229,255,0.12)"
              : "rgba(30,58,138,0.14)"};
          color: ${darkMode ? "#cbd5e1" : "#334155"};
          font-family: monospace;
          font-size: 0.82rem;
          line-height: 1.75;
        }

        .blog-content code {
          font-family: monospace;
          color: ${darkMode ? "#7dd3fc" : "#1E3A8A"};
        }

        .blog-content :not(pre) > code {
          padding: 0.15rem 0.4rem;
          border-radius: 0.3rem;
          background: ${darkMode
            ? "rgba(0,229,255,0.06)"
            : "rgba(30,58,138,0.06)"};
        }

        .blog-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 2rem auto;
          border-radius: 0.9rem;
          border: 1px solid
            ${darkMode
              ? "rgba(0,229,255,0.1)"
              : "rgba(30,58,138,0.15)"};
        }

        .blog-content hr {
          border: 0;
          border-top: 1px solid
            ${darkMode
              ? "rgba(0,229,255,0.09)"
              : "rgba(30,58,138,0.10)"};
          margin: 2.5rem 0;
        }

        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          overflow: hidden;
          border: 1px solid
            ${darkMode
              ? "rgba(0,229,255,0.1)"
              : "rgba(30,58,138,0.14)"};
          border-radius: 0.75rem;
        }

        .blog-content th,
        .blog-content td {
          padding: 0.75rem;
          border-bottom: 1px solid
            ${darkMode
              ? "rgba(255,255,255,0.04)"
              : "#E2E8F0"};
          text-align: right;
        }

        .blog-content th {
          color: ${darkMode ? "#e2e8f0" : "#0F172A"};
          background: ${darkMode
            ? "rgba(0,229,255,0.04)"
            : "rgba(30,58,138,0.05)"};
        }

        .blog-content td {
          color: ${darkMode ? "#94a3b8" : "#475569"};
        }
      `}</style>
    </div>
  );
}