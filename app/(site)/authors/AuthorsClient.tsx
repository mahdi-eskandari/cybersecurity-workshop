



"use client";

import { type ReactNode, type MouseEvent, useEffect, useState } from "react";
import { useTheme } from "../../../components/ThemeProvider";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  type Post,
  normalizeAuthor,
  authors,
  POSTS_PER_PAGE,
} from "./authorsData";
import { EmergencyModal } from "../../../components/CrisisReportForm"
import { renderHighlightedTitle } from "@/lib/highlightTitle";


export type { Post };

/* =========================================================
   ICONS
========================================================= */

const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM21 13.85c0-3.75-2-5.5-4.65-5.5-2.14 0-3.1 1.18-3.64 2.01V8.5H9.2V21h3.51v-6.18c0-1.63.31-3.2 2.32-3.2 1.98 0 2.01 1.85 2.01 3.31V21H21v-7.15Z" />
  </svg>
);

const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.88-6.39L6.5 22H3.4l7.24-8.28L2.8 2h6.4l4.4 5.82L18.9 2Zm-1.1 17.73h1.73L8.27 4.14H6.41L17.8 19.73Z" />
  </svg>
);

const IconMail = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const IconTelegram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="m21.7 3.4-3.2 16.9c-.24 1.2-.88 1.5-1.78.94l-4.9-3.61-2.36 2.27c-.26.26-.48.48-.98.48l.35-4.99 9.08-8.2c.4-.35-.09-.55-.62-.2L6.06 13.85l-4.82-1.51c-1.05-.33-1.07-1.05.22-1.55L20.3 3.02c.86-.32 1.61.2 1.4.38Z" />
  </svg>
);

const IconShield = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
  >
    <path d="M12 3 20 6v5c0 5.1-3.4 8.9-8 10-4.6-1.1-8-4.9-8-10V6l8-3Z" />
    <path d="m9 12 2 2 4-4" />
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
  >
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
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
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

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

const IconCert = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <circle cx="12" cy="8" r="5" />
    <path d="m8.5 12.5-1 8 3.5-2 3.5 2-1-8" />
  </svg>
);

const IconNews = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
  >
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M7 8h10M7 12h10M7 16h6" />
  </svg>
);

const ChevronRight = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronLeft = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/* =========================================================
   HELPERS
========================================================= */


const formatDate = (date?: string) => {
  if (!date) {
    return "";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsed);
};

const cleanContent = (content: string) => {
  return content
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
};


const getInitials = (name?: string) => {
  if (!name) return "پ";

  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0] || "")
    .join("")
    .slice(0, 2);
};


function getPaginationRange(currentPage: number, totalPages: number): (number | "...")[] {
  const pages = new Set<number>([1]);

  // صفحه فعلی و یکی قبل و بعدش
  for (let p = currentPage - 1; p <= currentPage + 1; p++) {
    if (p >= 1 && p <= totalPages) pages.add(p);
  }

  // سه صفحه آخر
  for (let p = Math.max(1, totalPages - 2); p <= totalPages; p++) {
    pages.add(p);
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const range: (number | "...")[] = [];

  sorted.forEach((p, i) => {
    if (i > 0) {
      const gap = p - sorted[i - 1];
      if (gap === 2) range.push(p - 1); // فقط یک صفحه جا افتاده: خودش رو نشون بده
      else if (gap > 2) range.push("...");
    }
    range.push(p);
  });

  return range;
}

/* =========================================================
   SECTION HOVER (borders/backgrounds are inline styles, so we
   flip them directly on the element to reliably beat inline
   specificity — same technique already used for the tag chips)
========================================================= */

type SectionHoverStyle = {
  border: string;
  background?: string;
  boxShadow?: string;
  color?: string;
};

const makeSectionHover = (
  base: SectionHoverStyle,
  hover: SectionHoverStyle
) => ({
  onMouseEnter: (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = hover.border;
    if (hover.background !== undefined) {
      e.currentTarget.style.background = hover.background;
    }
    if (hover.color !== undefined) {
      e.currentTarget.style.color = hover.color;
    }
    e.currentTarget.style.boxShadow = hover.boxShadow || "none";
  },
  onMouseLeave: (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = base.border;
    if (base.background !== undefined) {
      e.currentTarget.style.background = base.background;
    }
    if (base.color !== undefined) {
      e.currentTarget.style.color = base.color;
    }
    e.currentTarget.style.boxShadow = base.boxShadow || "none";
  },
});

/* =========================================================
   CATEGORY BADGE
========================================================= */

const BLOG_CATEGORIES = [
  { id: "forensic-reports", label: "گزارش‌های جرم‌شناسی" },
  { id: "legal-news", label: "اخبار حقوقی" },
  { id: "solved-cases", label: "پرونده‌های حل‌شده" },
  { id: "security-alerts", label: "هشدارهای امنیتی" },
  { id: "security-education", label: "آموزش امنیت و تهدیدات سایبری" },
];

const CATEGORY_FALLBACK = "بدون دسته‌بندی";

function getCategoryBadgeClass(category: string, darkMode: boolean): string {
  const badges: Record<string, string> = {
    "هشدارهای امنیتی": darkMode
      ? "text-[#F8C85A] bg-[#302612] ring-[#5A461C]"
      : "text-amber-700 bg-amber-50 ring-amber-100",
    "اخبار حقوقی": darkMode
      ? "text-[#9EAFFF] bg-[#171B3A] ring-[#303665]"
      : "text-indigo-700 bg-indigo-50 ring-indigo-100",
    "گزارش‌های جرم‌شناسی": darkMode
      ? "text-[#54B8FF] bg-[#09263D] ring-[#164B70]"
      : "text-[#1565C0] bg-[#EBF3FF] ring-blue-100",
    "پرونده‌های حل‌شده": darkMode
      ? "text-[#7BE495] bg-[#102A1C] ring-[#245B36]"
      : "text-emerald-700 bg-emerald-50 ring-emerald-100",
    "آموزش امنیت و تهدیدات سایبری": darkMode
      ? "text-[#7DD3FC] bg-[#0B2940] ring-[#1F5C7A]"
      : "text-sky-700 bg-sky-50 ring-sky-100",
  };

  return (
    badges[category] ||
    (darkMode
      ? "text-[#54B8FF] bg-[#09263D] ring-[#164B70]"
      : "text-[#1565C0] bg-[#EBF3FF] ring-blue-100")
  );
}

/* =========================================================
   ARTICLE THUMB
========================================================= */

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
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 340 180"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient
          id={`article-gradient-${seed}`}
          cx="40%"
          cy="50%"
          r="55%"
        >
          <stop offset="0%" stopColor={accent} stopOpacity="0.14" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      <rect width="340" height="180" fill={darkMode ? "#060B19" : "#F1F5FB"} />

      <rect width="340" height="180" fill={`url(#article-gradient-${seed})`} />

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line
          key={`horizontal-${i}`}
          x1="0"
          y1={i * 36}
          x2="340"
          y2={i * 36}
          stroke={
            darkMode ? "rgba(0,229,255,0.04)" : "rgba(30,58,138,0.05)"
          }
          strokeWidth="1"
        />
      ))}

      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <line
          key={`vertical-${i}`}
          x1={i * 42}
          y1="0"
          x2={i * 42}
          y2="180"
          stroke={
            darkMode ? "rgba(0,229,255,0.04)" : "rgba(30,58,138,0.05)"
          }
          strokeWidth="1"
        />
      ))}

      <path
        d={`M${40 + ox} 90 L${100 + ox} 60 L${160 + ox} 90 L${
          220 + ox
        } 50 L${280 + ox} 80`}
        stroke={accent}
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />

      {[
        [100 + ox, 60],
        [160 + ox, 90],
        [220 + ox, 50],
      ].map(([x, y], index) => (
        <g key={index}>
          <circle
            cx={x}
            cy={y}
            r="12"
            fill={accent}
            fillOpacity="0.06"
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.3"
          />

          <circle cx={x} cy={y} r="4" fill={accent} fillOpacity="0.6" />
        </g>
      ))}

      <rect
        x="16"
        y="154"
        width="60"
        height="3"
        rx="1.5"
        fill={accent}
        fillOpacity="0.15"
      />

      <rect
        x="82"
        y="154"
        width="40"
        height="3"
        rx="1.5"
        fill={
          darkMode ? "rgba(255,255,255,0.07)" : "rgba(30,58,138,0.08)"
        }
      />
    </svg>
  );
};

/* =========================================================
   SKILL BAR
========================================================= */

const SkillBar = ({
  label,
  pct,
  color = "#00E5FF",
}: {
  label: string;
  pct: number;
  color?: string;
}) => {
  const { darkMode } = useTheme();

  return (
    <div className="mb-[13px]">
      <div className="flex justify-between mb-[6px]">
        <span
          className={`text-[0.76rem] ${
            darkMode ? "text-[#94A3B8]" : "text-[#475569]"
          }`}
        >
          {label}
        </span>

        <span className="text-[0.68rem] font-mono" style={{ color }}>
          {pct}٪
        </span>
      </div>

      <div
        className={`h-1 rounded-full overflow-hidden ${
          darkMode ? "bg-white/5" : "bg-[rgba(30,58,138,0.08)]"
        }`}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}44, ${color})`,
            boxShadow: `0 0 6px ${color}66`,
          }}
        />
      </div>
    </div>
  );
};



/* =========================================================
   ARTICLE CARD
========================================================= */

const REPORT_CARD_DARK =
  "border-cyan-900/30 hover:border-cyan-800 bg-cyan-900/10 hover:bg-cyan-800/20 hover:shadow-[0_8px_30px_rgba(0,229,255,0.2)]";
const REPORT_CARD_LIGHT =
  "bg-white border-[rgba(21, 70, 203, 0.2)] hover:border-[rgba(29,78,216,0.52)] hover:bg-[rgba(237,242,255,0.52)] hover:shadow-[0_16px_40px_rgba(30,58,138,0.34)]";

const ArticleCard = ({
  post,
  accent = "#00E5FF",
  seed = 0,
}: {
  post: Post;
  accent?: string;
  seed?: number;
}) => {
  const { darkMode } = useTheme();

  const categoryLabel =
    BLOG_CATEGORIES.find(
      (item) => item.id === (post.categoryId || "").trim()
    )?.label || CATEGORY_FALLBACK;

  const summary = post.content
  const dateText = formatDate(post.updatedAt || post.createdAt);
  const readTime =
    post.readingTime && post.readingTime > 0
      ? `${post.readingTime} دقیقه`
      : "مطالعه";

  return (
<article
    className={`group flex h-full flex-col rounded-2xl overflow-hidden transition-all duration-200 ${
    darkMode
      ? "bg-[rgba(255,255,255,0.028)] border border-cyan-500/30 hover:border-cyan-800 hover:bg-cyan-900/15 hover:shadow-[0_8px_40px_rgba(0,229,255,0.2)]"
      : "bg-white border border-[#0B1C3E]/10 shadow-sm hover:shadow-md hover:border-[#1565C0]/20"
  }`}
  style={{
    backdropFilter: "blur(10px)",
  }}
>
      {/* Thumbnail */}
      <div
        className={`relative aspect-video overflow-hidden flex-shrink-0 ${
          darkMode ? "bg-[#0D1B29]" : "bg-[#F1F5F9]"
        }`}
      >
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            className="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
            <ArticleThumb accent={accent} seed={seed} />
          </div>
        )}

        {/* سایه‌ی پایین عکس تا از بدنه‌ی کارت جدا بشه */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t to-transparent ${
            darkMode ? "from-[#050C1E]/70" : "from-[#1E3A8A]/20"
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
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5 pt-10">
        <h3
          className={`text-base font-bold leading-snug mb-3 break-words transition-colors line-clamp-2 min-h-[2.85rem] ${
            darkMode ? "text-[#E6F7FF]" : "group-hover:text-[#1565C0]"
          }`}
        >
          {post.title}
        </h3>

<p
  className={`text-[13px] leading-relaxed line-clamp-2 break-words mb-5 flex-1 min-h-[2.85rem] ${
    darkMode ? "text-[#9DB0C0]" : "text-[#475569]"
  }`}
>
  { summary }
</p>

        {/* Footer */}
        <div
          className={`mt-auto pt-4 border-t flex flex-wrap items-center justify-between gap-x-3 gap-y-3 ${
            darkMode ? "border-[#1E334A]" : "border-[#E2E8F0]"
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
           

            <div className="min-w-0">


              <div
                className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] ${
                  darkMode ? "text-[#71869A]" : "text-[#64748B]"
                }`}
              >
                {dateText && <span className="text-[11px]">{dateText}</span>}
                {dateText && <span>-</span>}
                <span className="text-[11px]">{readTime}</span>
              </div>
            </div>
          </div>

          <Link
          href={`/blogs/${post.slug}`}
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
          </Link>
        </div>
      </div>
    </article>
  );
};

/* =========================================================
   AUTHORS
========================================================= */



/* =========================================================
   BACKGROUND
========================================================= */

const Background = () => {
  const { darkMode } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: darkMode
            ? "linear-gradient(rgba(0,229,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.025) 1px,transparent 1px)"
            : "linear-gradient(rgba(30,58,138,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(30,58,138,0.035) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: darkMode
            ? "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,229,255,0.05) 0%, transparent 60%)"
            : "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(29,78,216,0.05) 0%, transparent 60%)",
        }}
      />
    </div>
  );
};




const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   PAGE
========================================================= */

export default function AuthorsClient({
  posts,
  authorSlug,
  showAllPosts,
  currentPage,
  postsError = "",
  seoH1,
  slugMap,
  basePath: basePathProp,
}: {
  posts: Post[];
  authorSlug: string;
  showAllPosts: boolean;
  currentPage: number;
  postsError?: string;
  seoH1?: string;
  slugMap?: Record<string, string>;
  basePath?: string;
}) {
  const { darkMode } = useTheme();
    const blueBright = darkMode ? "#00E5FF" : "#1D4ED8";


  const [activeId, setActiveId] = useState(authorSlug);
    const [crisisOpen, setCrisisOpen] = useState(false)
  
  

const activeAuthorIndex = Math.max(
  0,
  authors.findIndex((item) => item.id === activeId)
);
const author = authors[activeAuthorIndex];

  const accent = darkMode ? author.accent : author.accentLight;

  const authorPosts = posts
    .filter((post) => post.status === "published")
    .filter((post) => normalizeAuthor(post.author) === normalizeAuthor(author.authorKey))
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return dateB - dateA;
    });

  const postsPerPage = POSTS_PER_PAGE;
  const totalPages = Math.max(1, Math.ceil(authorPosts.length / postsPerPage));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  const basePath = `/authors/${slugMap?.[author.id] || author.id}`;
    const allPostsPath = `${basePath}?view=all&page=1`;

    const handleSelectAuthor = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    window.history.pushState(null, "", `/authors/${slugMap?.[id] || id}`);
  };

  useEffect(() => {
    const onPopState = () => {
      const m = window.location.pathname.match(/^\/authors\/([^/?#]+)/);
      const found = m
        ? authors.find(
            (a) => (slugMap?.[a.id] || a.id) === decodeURIComponent(m[1])
          )
        : undefined;

      setActiveId(found ? found.id : authorSlug);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [authorSlug, slugMap]);

    // Sync canonical with the current author/page without a full page reload.
  // Pagination uses client-side navigation with ?view=all&page=N,
  // so the server-generated canonical may otherwise remain stale.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const canonicalPath = showAllPosts
      ? `${basePath}?view=all&page=${safePage}`
      : basePath;

    const canonicalUrl = `${window.location.origin}${canonicalPath}`;

    let link = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );

    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }

    if (link.href !== canonicalUrl) {
      link.href = canonicalUrl;
    }
  }, [basePath, safePage, showAllPosts]);

  const displayedPosts = showAllPosts
    ? authorPosts.slice((safePage - 1) * postsPerPage, safePage * postsPerPage)
    : authorPosts.slice(0, 3);

  const dynamicStats = author.stats.map((stat) =>
    stat.label === "مقالات منتشرشده"
      ? { ...stat, val: authorPosts.length.toLocaleString("fa-IR") }
      : stat
  );



/* =========================================================
   SOCIAL BUTTON
========================================================= */

const SocialBtn = ({
  icon,
  href = "#",
  title,
}: {
  icon: ReactNode;
  href?: string;
  title: string;
}) => {
  const { darkMode } = useTheme();
// color: accent
  return (
<Link
  href={href}
  title={title}
  style={{
    "--accent": accent,
  } as React.CSSProperties}
  className={`flex items-center justify-center w-[38px] h-[38px] rounded-[10px] transition-all duration-[180ms] ${
    darkMode
      ? "bg-white/[0.04] border border-white/[0.08] text-[#475569] hover:bg-[rgba(0,229,255,0.1)] hover:border-[rgba(0,229,255,0.4)] hover:text-[#00E5FF] hover:shadow-[0_0_14px_rgba(0,229,255,0.18)]"
      : "bg-[rgba(30,58,138,0.03)] border border-[rgba(30,58,138,0.12)] text-[#64748B] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_8px_var(--accent)]"
  }`}
>
      {icon}
    </Link>
  );
};


  return (
    
    <div
       dir="rtl"
      className={`min-h-screen transition-colors duration-300 pt-[130px] ${
        darkMode
          ? "bg-[#0A1128] text-[#E6F7FF]"
          : "bg-white text-[#0F172A]"
      }`}
      style={{
        fontFamily: "var(--font-vazirmatn), sans-serif",
      }}
    >

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative z-[1] pt-[58px] pb-20 px-6 max-[720px]:px-[14px] pt-[110px]">
        <div className="max-w-[1180px] mx-auto">
          {/* ===================================================
              TITLE
          =================================================== */}

                                 <motion.div
        className="text-center mb-[30px]"
    initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true, amount: 0.2 }}
>

              
           {/* <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs"
            style={{
              background: "rgba(0,229,255,0.07)",
              border: "1px solid rgba(0,229,255,0.2)",
              color: "#00E5FF",
            }}
          >
            <span className="node-dot pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#00E5FF", display: "inline-block" }} />
            <span className="data-label">PARAHOOR / EXPERTS</span>
          </div> */}

           <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs color: accent/10"

                        style={{
              border: darkMode
                ? "1px solid rgba(0,229,255,0.2)"
                : "none",
              backgroundColor: `${accent}20`,

              
            }}
          >

            <span 
            className="data-label"
            style={{
              // color: darkMode ? "#00E5FF" : "#1565C0",
              color: accent
            }}
            >Parahoor // Our Leadership Team</span>

                        <span className="node-dot pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", display: "inline-block",
                   backgroundColor: accent,

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
    textWrap: "balance",
  } as React.CSSProperties}
>
{renderHighlightedTitle(seoH1, {
  firstLineWords: 5,
  maxWordsPerLine: 7,
  lineBreakClassName: "",
  style: { color: darkMode ? "#00E5FF" : "#1565C0" },
})}
</h1>

            <p
              className="text-[0.8rem] mt-[10px]"
              style={{ color: darkMode ? "#475569" : "#64748B" }}
            >
              تیم متخصص پاراهور در تحقیقات سایبری، فارنزیک دیجیتال و پیگیری
              حقوقی
            </p>
          </motion.div>

          {/* ===================================================
              AUTHORS SELECTOR
          =================================================== */}

          
<motion.div
  className="flex justify-center mb-[38px]"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true, amount: 0.25 }}
>
  <div
    className="inline-flex gap-2 p-[5px] rounded-[14px]"
    style={{
      background: darkMode ? "rgba(5,8,20,0.7)" : "rgba(30,58,138,0.04)",
      border: `1px solid ${
        darkMode ? "rgba(255,255,255,0.06)" : "rgba(30,58,138,0.08)"
      }`,
    }}
  >
    {authors.map((item) => {
      const active = author.id === item.id;
      const itemAccent = darkMode ? item.accent : item.accentLight;

      return (
        <button
          key={item.id}
          type="button"
          onClick={() => handleSelectAuthor(item.id)}
          className="px-5 py-[7px] rounded-[10px] text-[0.82rem] font-semibold cursor-pointer transition-all duration-[180ms]"
          style={{
            background: active ? `${itemAccent}18` : "transparent",
            border: active
              ? `1px solid ${itemAccent}44`
              : "1px solid transparent",
            color: active
              ? itemAccent
              : darkMode
                ? "#475569"
                : "#64748B",
          }}
        >
          {item.name}
        </button>
      );
    })}
  </div>
</motion.div>

          {/* ===================================================
              PROFILE CARD
          =================================================== */}


                        <motion.div
        className="max-w-[900px] mx-auto mb-[34px] px-6 py-[22px] rounded-[20px] transition-all duration-300"
            style={{
              background: darkMode
                ? "linear-gradient(145deg, rgba(255,255,255,0.035), rgba(255,255,255,0.018))"
                : "linear-gradient(145deg, #FFFFFF, #FBFCFE)",
              border: `1px solid ${accent}32`,
              boxShadow: darkMode
                ? "0 20px 70px rgba(0,0,0,0.22)"
                : "0 20px 50px rgba(30,58,138,0.08)",
            }}

    initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true, amount: 0.3 }}
>
            <div className="flex items-center gap-5 max-[720px]:flex-wrap">
              <div
                className="w-[92px] h-[92px] flex-shrink-0 rounded-full p-[3px]"
                style={{
                  background: `linear-gradient(135deg, ${accent}, transparent)`,
                }}
              >
                <img
                  src={author.photo}
                  alt={author.name}
                  className="w-full h-full object-cover rounded-full block"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div
               className="data-label mb-1"
               style={{
                  letterSpacing: "0.1em",
                  fontSize: "0.63rem",
                  color: accent
               }}
                >
                  VERIFIED RESEARCHER
                </div>

                <h2 className="m-0 text-[1.35rem] font-extrabold">
                  {author.name}
                </h2>

                <div
                  className="text-[0.8rem] mt-[5px]"
                  style={{ color: darkMode ? "#CBD5E1" : "#334155" }}
                >
                  {author.title}
                </div>

                <div
                  className="text-[0.72rem] mt-1"
                  style={{ color: darkMode ? "#64748B" : "#64748B" }}
                >
                  {author.subtitle}
                </div>
              </div>

              <div className="flex gap-[7px] flex-shrink-0">
                <SocialBtn icon={<IconLinkedIn />} title="LinkedIn" />
                <SocialBtn icon={<IconX />} title="X" />
                <SocialBtn icon={<IconTelegram />} title="Telegram" />
                <SocialBtn icon={<IconMail />} title="Email" />
              </div>
            </div>

            <div
              className="h-px my-5"
              style={{
                background: darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(30,58,138,0.08)",
              }}
            />

          <div className="flex items-center gap-[9px] mb-[15px]">
              <span style={{ color: accent }}>
                <IconShield />
              </span>

              <span className="text-[0.82rem] font-extrabold">بیوگرافی</span>
            </div>

            <p
              className="text-[0.79rem] leading-[2.05] m-0"
              style={{ color: darkMode ? "#64748B" : "#475569" }}
            >
              {author.bio.join(" ")}
            </p>
          </motion.div>


          

          {/* ===================================================
              ACTIVITY + CREDENTIALS
          =================================================== */}

            <motion.div
        className="max-w-[1180px] mx-auto mb-[34px] grid grid-cols-2 max-[900px]:grid-cols-1 gap-5 items-stretch"
    initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true, amount: 0.2 }}
>
            {/* ACTIVITY */}
            <div
              className="p-[23px] rounded-[17px] min-h-[390px] transition-all duration-300"
              style={{
                background: darkMode
                  ? "linear-gradient(145deg, rgba(255,255,255,0.035), rgba(255,255,255,0.018))"
                  : "linear-gradient(145deg, #FFFFFF, #FBFCFE)",
                border: `1px solid ${accent}42`
              }}

            >
              <div
  className=" mb-1"
  style={{
    letterSpacing: "0.1em",
    fontSize: "0.63rem",
color: accent
  }}
>
  ACTIVITY STATS
</div>

              <h3 className="m-0 text-base font-extrabold">فعالیت پژوهشی</h3>

              <div className="grid grid-cols-3 gap-[9px] mt-5 mb-[27px]">
                {dynamicStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="px-[9px] py-[15px] text-center rounded-[11px] transition-all duration-200"
                    style={{
                      background: darkMode
                        ? "rgba(255,255,255,0.025)"
                        : "rgba(30,58,138,0.02)",
                      border: darkMode
                        ? "1px solid rgba(36, 182, 198, 0.12)"
                        : "1px solid rgba(30, 70, 138, 0.19)",
                    }}
                    
                  >
                    <div
                      className="text-[1.05rem] font-extrabold mb-[7px]"
                      style={{ color: accent }}
                    >
                      {stat.val}
                    </div>

                    <div className="text-[0.64rem] leading-[1.5] text-[#64748B]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="h-px mb-[22px]"
                style={{
                  background: darkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(30,58,138,0.08)",
                }}
              />

              <div
                className="data-label mb-5 mt-5"
                style={{
                  fontSize: "0.62rem",
                  color: accent
                 }}
              >
                RESEARCH FOCUS
              </div>

              {author.focus.map((item) => (
                <SkillBar
                  key={item.label}
                  label={item.label}
                  pct={item.pct}
                  color={accent}
                />
              ))}
            </div>

            {/* CREDENTIALS */}
            <div
              className=" p-[23px] rounded-[17px] min-h-[390px] transition-all duration-300"
              style={{
                background: darkMode
                  ? "linear-gradient(145deg, rgba(255,255,255,0.035), rgba(255,255,255,0.018))"
                  : "linear-gradient(145deg, #FFFFFF, #FBFCFE)",
                border: darkMode
                  ? "1px solid rgba(195, 84, 220, 0.22)"
                  : "1px solid rgba(139, 29, 164, 0.24)",
              }}
            >



              <div
              className="data-label mb-1"
               style={{
                  letterSpacing: "0.1em",
                  fontSize: "0.63rem",
                  color: darkMode ? "#A78BFA" : "#7C3AED"
               }}
              >
                CREDENTIALS
              </div>

              <h3 className="m-0 text-base font-extrabold">
                گواهینامه‌ها و تحصیلات
              </h3>

              <div className="grid grid-cols-2 max-[720px]:grid-cols-1 gap-[9px] mt-5">
                {author.certs.map((cert) => (
                  <div
                    key={cert}
                    className="min-h-[62px] px-[11px] py-[10px] flex items-center gap-2 rounded-[10px] transition-all duration-200"
                    style={{
                      background: darkMode
                        ? "rgba(167,139,250,0.035)"
                        : "rgba(124,58,237,0.03)",
                      border: darkMode
                        ? "1px solid rgba(167,139,250,0.1)"
                        : "1px solid rgba(139, 29, 164, 0.19)",
                    }}

                  >
                    <span
                      className="w-[27px] h-[27px] flex-shrink-0 rounded-[7px] flex items-center justify-center"
                      style={{
                        background: darkMode
                          ? "rgba(167,139,250,0.08)"
                          : "rgba(124,58,237,0.08)",
                        color: darkMode ? "#A78BFA" : "#7C3AED",
                      }}
                    >
                      <IconCert />
                    </span>

                    <span
                      className="text-[0.66rem] leading-[1.6]"
                      style={{ color: darkMode ? "#94A3B8" : "#475569" }}
                    >
                      {cert}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="h-px mt-[22px] mb-[18px]"
                style={{
                  background: darkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(30,58,138,0.08)",
                }}
              />

              <div
                className="data-label mb-2"
                style={{ 
                  color: darkMode ? "#A78BFA" : "#7C3AED",
                  fontSize: "0.62rem"
                 }}
              >
                SKILL TAGS
              </div>

              <div className="grid grid-cols-3 gap-[7px]">
                {author.tags.map((tag) => (
                  <span
                    key={tag}
                    title={tag}
                    className="min-w-0 flex items-center justify-center min-h-[30px] px-[7px] py-[5px] rounded-lg text-[0.6rem] leading-[1.3] text-center whitespace-nowrap overflow-hidden text-ellipsis cursor-default transition-all duration-[220ms]"
                    style={{
                      color: "#64748B",
                      background: darkMode
                        ? "rgba(167,139,250,0.035)"
                        : "rgba(124,58,237,0.03)",
                      border: darkMode
                        ? "1px solid rgba(255, 255, 255, 0.06)"
                        : "1px solid rgba(139, 29, 164, 0.17)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ===================================================
              ARTICLES
          =================================================== */}

            <motion.div
        className="max-w-[1180px] mx-auto"
    initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true, amount: 0.3 }}
>
            <div className="flex items-end justify-between mb-[17px] gap-[15px] flex-wrap">
              <div>
                <div
                  className="data-label mb-1"
                  style={{
                    color: accent
                  }}
                >
                  AUTHOR ARTICLES
                </div>

                <h2 className="m-0 text-[1.05rem] font-extrabold">
                  مقالات و گزارش‌های {author.name}
                </h2>
              </div>

              <div className="flex items-center gap-[7px] flex-wrap">
                {(() => {
                  const toggleInactiveBorder = darkMode
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(30,58,138,0.1)";
                  const toggleInactiveBackground = darkMode
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(30,58,138,0.02)";

                  return (
                    <>
                      <Link
                        href={basePath}
                        scroll={false}
                        className="flex items-center gap-[6px] h-[34px] px-[11px] rounded-lg font-inherit text-[0.67rem] cursor-pointer transition-all duration-200"
                        style={{
                          border: !showAllPosts
                            ? `1px solid ${accent}44`
                            : `1px solid ${toggleInactiveBorder}`,
                          background: !showAllPosts
                            ? `${accent}0B`
                            : toggleInactiveBackground,
                          color: !showAllPosts
                            ? accent
                            : darkMode
                              ? "#64748B"
                              : "#64748B",
                        }}
                      >
                        <IconNews />
                       جدیدترین ها
                      </Link>

                      <Link
                        href={allPostsPath}
                        scroll={false}
                        className="flex items-center gap-[6px] h-[34px] px-[11px] rounded-lg font-inherit text-[0.67rem] cursor-pointer transition-all duration-200"
                        style={{
                          border: showAllPosts
                            ? `1px solid ${accent}44`
                            : `1px solid ${toggleInactiveBorder}`,
                          background: showAllPosts
                            ? `${accent}0B`
                            : toggleInactiveBackground,
                          color: showAllPosts
                            ? accent
                            : darkMode
                              ? "#64748B"
                              : "#64748B",
                        }}
                      >
                        مشاهده همه مقالات
                      </Link>
                    </>
                  );
                })()}

                <span
                  className="text-[0.65rem] font-mono mr-[3px]"
                  style={{ color: darkMode ? "#64748B" : "#94A3B8" }}
                >
                  {authorPosts.length} ARTICLES
                </span>
              </div>
            </div>

            {postsError && (
              <div
                className="min-h-[160px] rounded-2xl flex items-center justify-center text-[0.78rem] text-center p-5"
                style={{
                  background: darkMode
                    ? "linear-gradient(145deg, rgba(255,255,255,0.035), rgba(255,255,255,0.018))"
                    : "linear-gradient(145deg, #FFFFFF, #FBFCFE)",
                  border: "1px solid rgba(245,158,11,0.12)",
                  color: darkMode ? "#64748B" : "#64748B",
                }}
              >
                {postsError}
              </div>
            )}

            {!postsError && authorPosts.length === 0 && (
              <div
                className="min-h-[160px] rounded-2xl flex flex-col items-center justify-center text-[0.78rem] text-center p-5"
                style={{
                  background: darkMode ? "#111C3D" : "#FFFFFF",
                  border: darkMode
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "1px solid rgba(30,58,138,0.1)",
                  color: darkMode ? "#475569" : "#94A3B8",
                }}
              >
                <IconNews />
                <div className="mt-[10px]">
                  هنوز مقاله منتشرشده‌ای برای {author.name} ثبت نشده است.
                </div>
              </div>
            )}

{!postsError && displayedPosts.length > 0 && (
  <motion.div
    key={`author-page-${safePage}-${showAllPosts}`}
    variants={contentVariants}
    initial="hidden"
    animate="show"
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
  >
    {displayedPosts.map((post, index) => (
      <motion.div
        key={post._id || post.slug || `${post.title}-${index}`}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: index * 0.06,
          ease: "easeOut",
        }}
        className="min-w-0"
      >
        <ArticleCard
          post={post}
          accent={accent}
          seed={index}
        />
      </motion.div>
    ))}
  </motion.div>
)}

            {showAllPosts && !postsError && authorPosts.length > postsPerPage && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-10 sm:mt-12 pb-12">
                <Link
                  href={`${basePath}?view=all&page=${Math.max(safePage - 1, 1)}`}
                  scroll={false}
                  aria-disabled={safePage === 1}
                  aria-label="صفحه قبل"
                  className="w-10 h-10 rounded-lg border flex items-center justify-center transition-all"
                  style={{
                    borderColor: darkMode
                      ? "#263B4E"
                      : "rgba(29,78,216,0.20)",
                    color: darkMode ? "#8FA5B8" : "#475569",
                    opacity: safePage === 1 ? 0.3 : 1,
                    pointerEvents: safePage === 1 ? "none" : "auto",
                  }}
                  {...makeSectionHover(
                    { border: darkMode ? "#263B4E" : "rgba(29,78,216,0.20)", color: darkMode ? "#8FA5B8" : "#475569" },
                    { border: accent, color: accent }
                  )}
                >
                  <ChevronLeft size={18} />
                </Link>

                  {getPaginationRange(safePage, totalPages).map((pageNumber, index) => {
                  if (pageNumber === "...") {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className="flex h-10 w-10 shrink-0 items-center justify-center text-sm font-medium"
                        style={{ color: darkMode ? "#8FA5B8" : "#475569" }}
                      >
                        …
                      </span>
                    );
                  }

                  const activePage = safePage === pageNumber;
                  const inactiveBorder = darkMode ? "#263B4E" : "rgba(29,78,216,0.20)";
                  const inactiveColor = darkMode ? "#8FA5B8" : "#475569";

                  return (
                    <Link
                      key={pageNumber}
                      href={`${basePath}?view=all&page=${pageNumber}`}
                      scroll={false}
                      className="w-10 h-10 rounded-lg border flex items-center justify-center text-sm font-medium transition-all"
                      style={{
                        borderColor: activePage ? "transparent" : inactiveBorder,
                        background: activePage
                          ? darkMode
                            ? "#00B8D4"
                            : "#1565C0"
                          : "transparent",
                        color: activePage
                          ? darkMode
                            ? "#031018"
                            : "#FFFFFF"
                          : inactiveColor,
                        boxShadow: activePage
                          ? darkMode
                            ? "0 4px 15px rgba(0,229,255,0.15)"
                            : "0 4px 15px rgba(30,58,138,0.20)"
                          : "none",
                      }}
                      {...(!activePage
                        ? makeSectionHover(
                            { border: inactiveBorder, color: inactiveColor, background: "transparent" },
                            { border: "rgba(29,78,216,0.52)", color: `#1E3A8A` }
                          )
                        : {})}
                    >
                      {pageNumber}
                    </Link>
                  );
                })}

                <Link
                  href={`${basePath}?view=all&page=${Math.min(safePage + 1, totalPages)}`}
                  scroll={false}
                  aria-disabled={safePage === totalPages}
                  aria-label="صفحه بعد"
                  className="w-10 h-10 rounded-lg border flex items-center justify-center transition-all"
                  style={{
                    borderColor: darkMode
                      ? "#263B4E"
                      : "rgba(29,78,216,0.20)",
                    color: darkMode ? "#8FA5B8" : "#475569",
                    opacity: safePage === totalPages ? 0.3 : 1,
                    pointerEvents: safePage === totalPages ? "none" : "auto",
                  }}
                  {...makeSectionHover(
                    { border: darkMode ? "#263B4E" : "rgba(29,78,216,0.20)", color: darkMode ? "#8FA5B8" : "#475569" },
                    { border: accent, color: accent }
                  )}
                >
                  
                  <ChevronRight size={18} />
                </Link>
              </div>
            )}
          </motion.div>
        </div>

      </main>
         {crisisOpen && (
                  <EmergencyModal
                    onClose={() => setCrisisOpen(false)}
                  />
                )}

    </div>
  );
}

