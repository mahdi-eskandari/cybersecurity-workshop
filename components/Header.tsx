
// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useTheme } from "./ThemeProvider";
// import { usePathname } from "next/navigation";
// import {
//   AlertTriangle,
// } from "lucide-react";
// import Image from "next/image";

// const IconMoon = () => (
//   <svg
//     width="17"
//     height="17"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#64748b"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
//   </svg>
// );

// const IconSun = () => (
//   <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="12" cy="12" r="5" />
//     <line x1="12" y1="1" x2="12" y2="3" />
//     <line x1="12" y1="21" x2="12" y2="23" />
//     <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
//     <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
//     <line x1="1" y1="12" x2="3" y2="12" />
//     <line x1="21" y1="12" x2="23" y2="12" />
//     <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
//     <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
//   </svg>
// );

// const NAV_ITEMS = [
//   { pageKey: "home", label: "پاراهور", href: "/"  },
//   { pageKey: "services", label: "خدمات ما" },
//   { pageKey: "blogs", label: "وبلاگ" },
//   { pageKey: "about", label: "درباره ما" },
//   { pageKey: "contact", label: "تماس با ما" },
// ] as const;

// const DEFAULT_SLUGS: Record<string, string> = {
//   home: "",
//   services: "services",
//   blogs: "blogs",
//   about: "about",
//   contact: "contact",
//   privacy: "privacy",
// };

// function normalizePath(pathname: string) {
//   const path = pathname.split("?")[0].split("#")[0];

//   if (path === "/" || path === "") {
//     return "/";
//   }

//   return path.replace(/\/+$/, "");
// }

// export default function Header() {
//   const { darkMode, toggleDarkMode } = useTheme();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [slugs, setSlugs] = useState<Record<string, string> | null>(null);
//   const path = usePathname();
//   const [crisisOpen, setCrisisOpen] = useState(false);

//   // ---------------------------------------------------------
//   // گرفتن اسلاگ‌های فعلی صفحات از دیتابیس
//   // (فقط یه‌بار موقع mount شدن هدر)
//   // ---------------------------------------------------------

//   useEffect(() => {
//     let cancelled = false;

//     fetch("/api/admin/seo/pages", { cache: "no-store" })
//       .then((res) => res.json())
//       .then((data) => {
//         if (!cancelled && data?.success) {
//           setSlugs(data.pages || {});
//         }
//       })
//       .catch(() => {});

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const resolvedSlugs: Record<string, string> = {
//     ...DEFAULT_SLUGS,
//     ...(slugs || {}),
//   };

// const navItems = NAV_ITEMS.map((item) => ({
//   label: item.label,
//   href:
//     "href" in item
//       ? item.href
//       : `/${resolvedSlugs[item.pageKey] ?? DEFAULT_SLUGS[item.pageKey]}`,
// }));

//   const currentPath = normalizePath(path || "/");

//   return (
//     <div className="min-h-full cyber-grid-bg text-gray-600 dark:text-[#]">
//   <nav
//     className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-cyan-500/10 dark:bg-[#050a19cc]"
//     style={{
//       backgroundColor: darkMode ? "#050a19cc" : "#ffffffbd",
//       backdropFilter: "blur(16px)",
//       borderBottom: darkMode
//         ? "1px solid rgba(0, 229, 255, 0.1)"
//         : "1px solid rgba(96, 165, 250, 0.28)",
//     }}
//   >
//     <div className="max-w-6xl mx-auto flex items-center justify-between px-3 py-2.5 sm:px-6 md:px-12 md:py-4">
//         {/* سمت راست: همبرگر منو در موبایل + لوگو و برند */}
//         <div className="flex items-center gap-2 sm:gap-3 shrink-0">
//           <button
//             className="md:hidden p-1.5 -mr-1 text-slate-300 hover:text-cyan-400 transition-colors"
//             onClick={() => setMenuOpen(true)}
//             aria-label="باز کردن منو"
//           >
//             <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
//               <line x1="3" y1="6" x2="21" y2="6" />
//               <line x1="3" y1="12" x2="21" y2="12" />
//               <line x1="3" y1="18" x2="21" y2="18" />
//             </svg>
//           </button>

//           <div className="flex items-center gap-1.5 sm:gap-2">
//             <div
//               className="node-dot pulse-dot"
//               style={!darkMode ? { backgroundColor: "#60A5FA" } : undefined}
//             />

// {/* <Image
//   src={
//     darkMode
//       ? "/logo/parahoor-logo-v2-transparent-1024.png"
//       : "/logo/parahoor-logo-v2-light-1024.png"
//   }
//   alt="پراهور"
//   width={48}
//   height={48}
//   priority
//   className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-transform duration-200 hover:scale-105"
//   style={{
//     filter: darkMode
//       ? "drop-shadow(0 0 6px rgba(34, 211, 238, 0.25))"
//       : "none",
//   }}
// /> */}


// <Link href="/" aria-label="پراهور - صفحه اصلی" className="flex items-center gap-2 block shrink-0 cursor-pointer">
//   <Image
//     src={
//       darkMode
//         ? "/logo/parahoor-logo-v2-transparent-1024.png"
//         : "/logo/parahoor-logo-v2-light-1024.png"
//     }
//     alt="پراهور"
//     width={48}
//     height={48}
//     priority
//     className="block h-10 w-10 sm:h-12 sm:w-12 object-contain"
//     style={{
//       filter: darkMode
//         ? "drop-shadow(0 0 6px rgba(34, 211, 238, 0.25))"
//         : "none",
//       transition: "filter 0.2s ease",
//     }}
//   />

// {/* <img
//   src="/logo/parahoor-logo-v2-transparent-512.png"
//   srcset="/logo/parahoor-logo-v2-transparent-512.png 1x,
//   /logo/parahoor-logo-v2-transparent-1024.png 2x"
//   alt="پراهور"
//   width="48"
//   height="48"
//   class="site-logo"
//   decoding="async"
//   /> */}

//             <span
//               className="text-base sm:text-lg md:text-xl font-bold tracking-wide"
//               style={{
//                 letterSpacing: "0.05em",
//                 color: darkMode ? "#FFFFFF" : "#072959e1",
//               }}
//               >
//               پاراهور
//             </span>
//               </Link>
//           </div>


//         </div>

//         {/* لینک‌های دسکتاپ – وسط */}
//         <div className="hidden md:flex items-center gap-6 lg:gap-8">
//           {navItems.map((item) => {
//             const isActive =
//               currentPath === item.href ||
//               (item.href !== "/" && currentPath.startsWith(`${item.href}/`));

//             return (
//               <Link
//                 key={item.label}
//                 href={item.href}
//                 className={`group relative nav-link text-sm font-medium transition-all duration-300 ${
//                   darkMode
//                     ? isActive
//                       ? "text-white"
//                       : "text-slate-300 hover:text-cyan-300"
//                     : isActive
//                       ? "text-[#1565C0]"
//                       : "text-slate-400 hover:text-[#1565C0]"
//                 }`}
//               >
//                 {item.label}

//                 <span
//                   className={`absolute -bottom-2 right-0 h-[2px] rounded-full transition-all duration-500 ease-out ${
//                     darkMode
//                       ? isActive
//                         ? "w-full opacity-100 bg-[#00E5FF] shadow-[0_0_6px_#00E5FF,0_0_14px_rgba(0,229,255,0.55)]"
//                         : "w-0 opacity-0 bg-[#00E5FF] group-hover:left-0 group-hover:w-full group-hover:opacity-100 group-hover:shadow-[0_0_6px_#00E5FF,0_0_14px_rgba(0,229,255,0.55)]"
//                       : isActive
//                         ? "w-full opacity-100 bg-[#1565C0] shadow-[0_0_8px_rgba(18,38,107,0.55)]"
//                         : "w-0 opacity-0 bg-[#1565C0] group-hover:left-0 group-hover:w-full group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(18,38,107,0.45)]"
//                   }`}
//                 />

//                 {darkMode && isActive && (
//                   <span className="absolute -bottom-2 right-0 h-[2px] w-1/3 rounded-full bg-white opacity-80 blur-[1px] animate-pulse" />
//                 )}
//               </Link>
//             );
//           })}
//         </div>

//         {/* سمت چپ: تغییر تم و دکمه تماس */}
//         <div className="flex items-center gap-2 sm:gap-3 shrink-0">
//           <button
//             onClick={toggleDarkMode}
//             className="p-1.5 sm:p-2 rounded-lg transition-all"
//             style={{
//               color: darkMode ? "#94A3B8" : "#BFDBFE",
//               background: darkMode
//                 ? "rgba(255,255,255,0.04)"
//                 : "rgba(255,255,255,0.08)",
//               border: darkMode
//                 ? "1px solid rgba(255, 255, 255, 0.16)"
//                 : "1px solid rgba(75, 97, 121, 0.32)",
//             }}
//             aria-label="تغییر حالت نمایش"
//           >
//             {darkMode ? <IconSun /> : <IconMoon />}
//           </button>


// {/* SOS + mobile toggle */}
// <div className="flex items-center gap-3 flex-shrink-0 mr-auto md:mr-0">
//   <Link
//   href="/contact"
//     // onClick={() => setCrisisOpen(true)}
//     className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#C62828] text-white text-sm font-semibold rounded-lg hover:bg-[#B71C1C] transition-colors cursor-pointer"
//   >

//     تماس اورژانسی
//   </Link>
// </div>

          
//         </div>
//         </div>
//       </nav>


//       {/* پس‌زمینه تاریک هنگام باز شدن منو */}
//       {menuOpen && (
//         <div
//           className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity md:hidden"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}

//       {/* منوی کشویی از سمت راست */}
//       <div
//         className={`fixed top-0 right-0 h-full w-[270px] max-w-[80vw] z-[70] p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out md:hidden border-l border-cyan-500/20 ${
//           menuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//         style={{
//           background: "rgba(5, 10, 25, 0.98)",
//           backdropFilter: "blur(20px)",
//         }}
//       >
//         <div>
//           {/* هدر منوی کشویی */}
//           <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
//             <div className="flex items-center gap-2">
//               <div className="node-dot pulse-dot" />
//               <span className="font-bold text-white text-base">پاراهور</span>
//             </div>

//             <button
//               onClick={() => setMenuOpen(false)}
//               className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors"
//               aria-label="بستن منو"
//             >
//               <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </button>
//           </div>

//           {/* آیتم‌های ناوبری */}
//           <div className="flex flex-col gap-1.5">
//             {navItems.map((item) => (
//               <Link
//                 key={item.label}
//                 href={item.href}
//                 className="py-2.5 px-3 rounded-lg text-sm text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all text-right"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* فوتر داخلی منوی کشویی */}
//         <div className="pt-4 border-t border-white/5 text-center">
//           <span className="text-[10px] tracking-wider text-cyan-400/50 block font-mono">
//             // CYBER FORENSICS
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";

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

  // قفل اسکرول صفحه وقتی منو بازه + بستن منو اگه صفحه بزرگ شد (دسکتاپ)
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  // انیمیشن ظاهر شدن آیتم‌ها: یکی‌یکی از بالا به پایین
  const itemAnim = (i: number): React.CSSProperties => ({
    opacity: menuOpen ? 1 : 0,
    transform: menuOpen ? "translateY(0)" : "translateY(-14px)",
    transition: "opacity 0.4s ease, transform 0.4s ease",
    transitionDelay: menuOpen ? `${120 + i * 70}ms` : "0ms",
  });

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

{/* <Image
  src={
    darkMode
      ? "/logo/parahoor-logo-v2-transparent-1024.png"
      : "/logo/parahoor-logo-v2-light-1024.png"
  }
  alt="پراهور"
  width={48}
  height={48}
  priority
  className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-transform duration-200 hover:scale-105"
  style={{
    filter: darkMode
      ? "drop-shadow(0 0 6px rgba(34, 211, 238, 0.25))"
      : "none",
  }}
/> */}


<Link href="/" aria-label="پراهور - صفحه اصلی" className="flex items-center gap-2 block shrink-0 cursor-pointer">
  <Image
    src={
      darkMode
        ? "/logo/parahoor-logo-v2-transparent-1024.png"
        : "/logo/parahoor-logo-v2-light-1024.png"
    }
    alt="پراهور"
    width={48}
    height={48}
    priority
    className="block h-10 w-10 sm:h-12 sm:w-12 object-contain"
    style={{
      filter: darkMode
        ? "drop-shadow(0 0 6px rgba(34, 211, 238, 0.25))"
        : "none",
      transition: "filter 0.2s ease",
    }}
  />

{/* <img
  src="/logo/parahoor-logo-v2-transparent-512.png"
  srcset="/logo/parahoor-logo-v2-transparent-512.png 1x,
  /logo/parahoor-logo-v2-transparent-1024.png 2x"
  alt="پراهور"
  width="48"
  height="48"
  class="site-logo"
  decoding="async"
  /> */}

            <span
              className="text-base sm:text-lg md:text-xl font-bold tracking-wide"
              style={{
                letterSpacing: "0.05em",
                color: darkMode ? "#FFFFFF" : "#072959e1",
              }}
              >
              پاراهور
            </span>
              </Link>
          </div>


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
                      ? "text-[#1565C0]"
                      : "text-slate-400 hover:text-[#1565C0]"
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
                        ? "w-full opacity-100 bg-[#1565C0] shadow-[0_0_8px_rgba(18,38,107,0.55)]"
                        : "w-0 opacity-0 bg-[#1565C0] group-hover:left-0 group-hover:w-full group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(18,38,107,0.45)]"
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
    className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#9f1414] text-white text-sm font-semibold rounded-lg hover:bg-[#B71C1C] transition-colors cursor-pointer"
  >

    تماس اورژانسی
  </Link>
</div>

          
        </div>
        </div>
      </nav>


      {/* منوی تمام‌صفحه (فقط موبایل و تبلت) */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[70] md:hidden transition-[opacity,visibility] duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{
          background: darkMode
            ? "radial-gradient(120% 60% at 100% 0%, rgba(0,229,255,0.10) 0%, rgba(5,10,25,0) 60%), radial-gradient(100% 50% at 0% 100%, rgba(21,101,192,0.18) 0%, rgba(5,10,25,0) 60%), #050a19"
            : "radial-gradient(120% 60% at 100% 0%, rgba(96,165,250,0.22) 0%, rgba(255,255,255,0) 60%), radial-gradient(100% 50% at 0% 100%, rgba(21,101,192,0.10) 0%, rgba(255,255,255,0) 60%), #FFFFFF",
        }}
      >
        <div className="flex h-full w-full flex-col overflow-y-auto px-6 pb-6 pt-5 sm:px-10">
          {/* هدر منو: لوگو + نام برند + بستن */}
          <div
            className={`flex items-center justify-between pb-5 border-b ${
              darkMode ? "border-white/10" : "border-[#1565C0]/15"
            }`}
            style={itemAnim(0)}
          >
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              aria-label="پراهور - صفحه اصلی"
              className="flex items-center gap-3"
            >
              <Image
                src={
                  darkMode
                    ? "/logo/parahoor-logo-v2-transparent-1024.png"
                    : "/logo/parahoor-logo-v2-light-1024.png"
                }
                alt="پراهور"
                width={48}
                height={48}
                className="block h-11 w-11 object-contain"
                style={{
                  filter: darkMode
                    ? "drop-shadow(0 0 8px rgba(34, 211, 238, 0.3))"
                    : "none",
                }}
              />
              <span
                className="text-xl font-extrabold"
                style={{
                  letterSpacing: "0.04em",
                  color: darkMode ? "#FFFFFF" : "#072959",
                }}
              >
                پاراهور
              </span>
            </Link>

            <button
              onClick={() => setMenuOpen(false)}
              aria-label="بستن منو"
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                darkMode
                  ? "border-none bg-white/5 text-slate-300 hover:text-white"
                  : "border-[#1565C0]/20 bg-[#1565C0]/5 text-slate-600 hover:text-[#1565C0]"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* آیتم‌ها: تمام عرض */}
          <div className="mt-5 flex flex-col gap-2">
            {navItems.map((item, i) => {
              const isActive =
                currentPath === item.href ||
                (item.href !== "/" && currentPath.startsWith(`${item.href}/`));

              return (
                <div key={item.label} style={itemAnim(i + 1)}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-md font-semibold transition-all ${
                      darkMode
                        ? isActive
                          ? "border-cyan-400/40 bg-cyan-500/10 text-white shadow-[0_0_24px_rgba(0,229,255,0.12)]"
                          : "border-white/10 bg-white/[0.03] text-slate-200 hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-300"
                        : isActive
                          ? "border-[#1565C0]/30 bg-[#1565C0]/10 text-[#1565C0]"
                          : "border-[#1565C0]/10 bg-white/70 text-slate-700 hover:border-[#1565C0]/30 hover:bg-[#1565C0]/5 hover:text-[#1565C0]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={isActive ? "opacity-100" : "opacity-40"}
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* پایین منو: دکمه‌ی تماس اورژانسی (در موبایل جای دیگری نیست) */}
          <div className="mt-auto pt-6" style={itemAnim(navItems.length + 1)}>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-2xl bg-[#C62828] px-5 py-4 text-base font-bold text-white shadow-lg shadow-red-900/20 transition-colors hover:bg-[#B71C1C]"
            >
              تماس اورژانسی
            </Link>

            <span
              className={`mt-5 block text-center font-mono text-[10px] tracking-wider ${
                darkMode ? "text-cyan-400/50" : "text-[#1565C0]/50"
              }`}
            >
              // CYBER FORENSICS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}







