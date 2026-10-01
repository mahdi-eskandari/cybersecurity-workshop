
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
} from "lucide-react";

const IconMoon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#64748b"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const IconSun = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const NAV_ITEMS = [
  { pageKey: "home", label: "پاراهور", href: "/"  },
  { pageKey: "services", label: "خدمات ما" },
  { pageKey: "blogs", label: "وبلاگ" },
  { pageKey: "about", label: "درباره ما" },
  { pageKey: "contact", label: "تماس با ما" },
] as const;

const DEFAULT_SLUGS: Record<string, string> = {
  home: "",
  services: "services",
  blogs: "blogs",
  about: "about",
  contact: "contact",
  privacy: "privacy",
};

function normalizePath(pathname: string) {
  const path = pathname.split("?")[0].split("#")[0];

  if (path === "/" || path === "") {
    return "/";
  }

  return path.replace(/\/+$/, "");
}

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [slugs, setSlugs] = useState<Record<string, string> | null>(null);
  const path = usePathname();
  const [crisisOpen, setCrisisOpen] = useState(false);

  // ---------------------------------------------------------
  // گرفتن اسلاگ‌های فعلی صفحات از دیتابیس
  // (فقط یه‌بار موقع mount شدن هدر)
  // ---------------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    fetch("/api/admin/seo/pages", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.success) {
          setSlugs(data.pages || {});
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const resolvedSlugs: Record<string, string> = {
    ...DEFAULT_SLUGS,
    ...(slugs || {}),
  };

const navItems = NAV_ITEMS.map((item) => ({
  label: item.label,
  href:
    "href" in item
      ? item.href
      : `/${resolvedSlugs[item.pageKey] ?? DEFAULT_SLUGS[item.pageKey]}`,
}));

  const currentPath = normalizePath(path || "/");

  return (
    <div className="min-h-full cyber-grid-bg text-gray-600 dark:text-[#]">
  <nav
    className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-cyan-500/10 dark:bg-[#050a19cc]"
    style={{
      backgroundColor: darkMode ? "#050a19cc" : "#ffffffbd",
      backdropFilter: "blur(16px)",
      borderBottom: darkMode
        ? "1px solid rgba(0, 229, 255, 0.1)"
        : "1px solid rgba(96, 165, 250, 0.28)",
    }}
  >
    <div className="max-w-6xl mx-auto flex items-center justify-between px-3 py-2.5 sm:px-6 md:px-12 md:py-4">
        {/* سمت راست: همبرگر منو در موبایل + لوگو و برند */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            className="md:hidden p-1.5 -mr-1 text-slate-300 hover:text-cyan-400 transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="باز کردن منو"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="node-dot pulse-dot"
              style={!darkMode ? { backgroundColor: "#60A5FA" } : undefined}
            />

            <span
              className="text-base sm:text-lg md:text-xl font-bold tracking-wide"
              style={{
                letterSpacing: "0.05em",
                color: darkMode ? "#FFFFFF" : "#072959e1",
              }}
            >
              پاراهور
            </span>
          </div>

          <span
            className="data-label hidden lg:block"
            style={{
              color: darkMode ? "#00e5ff66" : "#12266be1",
            }}
          >
            // CYBER FORENSICS
          </span>
        </div>

        {/* لینک‌های دسکتاپ – وسط */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isActive =
              currentPath === item.href ||
              (item.href !== "/" && currentPath.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative nav-link text-sm font-medium transition-all duration-300 ${
                  darkMode
                    ? isActive
                      ? "text-white"
                      : "text-slate-300 hover:text-cyan-300"
                    : isActive
                      ? "text-[#12266b]"
                      : "text-slate-400 hover:text-cyan-900"
                }`}
              >
                {item.label}

                <span
                  className={`absolute -bottom-2 right-0 h-[2px] rounded-full transition-all duration-500 ease-out ${
                    darkMode
                      ? isActive
                        ? "w-full opacity-100 bg-[#00E5FF] shadow-[0_0_6px_#00E5FF,0_0_14px_rgba(0,229,255,0.55)]"
                        : "w-0 opacity-0 bg-[#00E5FF] group-hover:left-0 group-hover:w-full group-hover:opacity-100 group-hover:shadow-[0_0_6px_#00E5FF,0_0_14px_rgba(0,229,255,0.55)]"
                      : isActive
                        ? "w-full opacity-100 bg-[#12266b] shadow-[0_0_8px_rgba(18,38,107,0.55)]"
                        : "w-0 opacity-0 bg-[#12266b] group-hover:left-0 group-hover:w-full group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(18,38,107,0.45)]"
                  }`}
                />

                {darkMode && isActive && (
                  <span className="absolute -bottom-2 right-0 h-[2px] w-1/3 rounded-full bg-white opacity-80 blur-[1px] animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>

        {/* سمت چپ: تغییر تم و دکمه تماس */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={toggleDarkMode}
            className="p-1.5 sm:p-2 rounded-lg transition-all"
            style={{
              color: darkMode ? "#94A3B8" : "#BFDBFE",
              background: darkMode
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0.08)",
              border: darkMode
                ? "1px solid rgba(255, 255, 255, 0.16)"
                : "1px solid rgba(75, 97, 121, 0.32)",
            }}
            aria-label="تغییر حالت نمایش"
          >
            {darkMode ? <IconSun /> : <IconMoon />}
          </button>


{/* SOS + mobile toggle */}
<div className="flex items-center gap-3 flex-shrink-0 mr-auto md:mr-0">
  <Link
  href="/contact"
    // onClick={() => setCrisisOpen(true)}
    className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#C62828] text-white text-sm font-semibold rounded-lg hover:bg-[#B71C1C] transition-colors cursor-pointer"
  >

    تماس اورژانسی
  </Link>
</div>

          
        </div>
        </div>
      </nav>


      {/* پس‌زمینه تاریک هنگام باز شدن منو */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* منوی کشویی از سمت راست */}
      <div
        className={`fixed top-0 right-0 h-full w-[270px] max-w-[80vw] z-[70] p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out md:hidden border-l border-cyan-500/20 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "rgba(5, 10, 25, 0.98)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div>
          {/* هدر منوی کشویی */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2">
              <div className="node-dot pulse-dot" />
              <span className="font-bold text-white text-base">پاراهور</span>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors"
              aria-label="بستن منو"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* آیتم‌های ناوبری */}
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-2.5 px-3 rounded-lg text-sm text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all text-right"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* فوتر داخلی منوی کشویی */}
        <div className="pt-4 border-t border-white/5 text-center">
          <span className="text-[10px] tracking-wider text-cyan-400/50 block font-mono">
            // CYBER FORENSICS
          </span>
        </div>
      </div>
    </div>
  );
}






