// "use client";

// import React, { useState } from "react";
// import { useTheme } from "../components/ThemeProvider";

// const IconMoon = () => (
//   <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

// export default function Header() {
//   const { darkMode, toggleDarkMode } = useTheme();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="min-h-full cyber-grid-bg  text-gray-600 dark:text-[#] ">
//       <nav
//         className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 py-2.5 sm:px-6 md:px-12 md:py-4 backdrop-blur-md border-b border-cyan-500/10 bg-[#3B2623] dark:bg-[#050a19cc]"
//         style={{
//           // backgroundColor: "#050a19cc" : "#564141",
//           backdropFilter: "blur(16px)",
//           borderBottom: "1px solid rgba(0, 229, 255, 0.1)",
//         }}
//       >
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
//             <div className="node-dot pulse-dot" />
//             <span
//               className="text-base sm:text-lg md:text-xl font-bold tracking-wide text-slate-200 dark:text-white"
//               style={{  letterSpacing: "0.05em" }}
//             >
//               پاراهور
//             </span>
//           </div>

//           <span className="data-label hidden lg:block text-slate-200 dark:text-[#00e5ff66]" >
//             // CYBER FORENSICS
//           </span>
//         </div>

//         {/* لینک‌های دسکتاپ – وسط */}
//         <div className="hidden md:flex items-center gap-6 lg:gap-8">
//           {["خدمات ما", "وبلاگ", "درباره ما", "تماس با ما"].map((item) => (
//             <a key={item} href="#" className="nav-link text-sm font-medium text-slate-200">
//               {item}
//             </a>
//           ))}
//         </div>

//         {/* سمت چپ: تغییر تم و دکمه تماس */}
//         <div className="flex items-center gap-2 sm:gap-3 shrink-0">
//           <button
//             onClick={toggleDarkMode}
//             className="p-1.5 sm:p-2 rounded-lg transition-all"
//             style={{
//               color: "#94A3B8",
//               background: "rgba(255,255,255,0.04)",
//               border: "1px solid rgba(255,255,255,0.08)",
//             }}
//             aria-label="تغییر حالت نمایش"
//           >
//             {darkMode ? <IconSun /> : <IconMoon />}
//           </button>

//           <a
//             href="#contact"
//             className="red-glow px-2.5 text-[#512039] border border-[#712047] bg-[#e6eced] dark:bg-red-500 dark:text-white dark:border py-1.5 sm:px-3.5 sm:py-2 md:px-4 rounded-lg text-[11px] sm:text-xs md:text-sm font-semibold transition-all whitespace-nowrap"

//           >
//             تماس اورژانسی
//           </a>
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
//             {["خدمات ما", "وبلاگ", "درباره ما", "تماس با ما"].map((item) => (
//               <a
//                 key={item}
//                 href="#"
//                 className="py-2.5 px-3 rounded-lg text-sm text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all text-right"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {item}
//               </a>
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

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "../components/ThemeProvider";

const IconMoon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "خدمات ما", href: "/services" },
    { label: "وبلاگ", href: "/blog" },
    { label: "درباره ما", href: "/about" },
    { label: "تماس با ما", href: "/contact" },
  ];

  return (
    <div className="min-h-full cyber-grid-bg text-gray-600 dark:text-[#]">
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 py-2.5 sm:px-6 md:px-12 md:py-4 backdrop-blur-md border-b border-cyan-500/10 dark:bg-[#050a19cc]"
        style={{
          backgroundColor: darkMode ? "#050a19cc" : "#071A3A",
          backdropFilter: "blur(16px)",
          borderBottom: darkMode
            ? "1px solid rgba(0, 229, 255, 0.1)"
            : "1px solid rgba(96, 165, 250, 0.28)",
        }}
      >
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
                color: darkMode ? "#FFFFFF" : "#FFFFFF",
              }}
            >
              پاراهور
            </span>
          </div>

          <span
            className="data-label hidden lg:block"
            style={{
              color: darkMode ? "#00e5ff66" : "rgba(147,197,253,0.7)",
            }}
          >
            // CYBER FORENSICS
          </span>
        </div>

        {/* لینک‌های دسکتاپ – وسط */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-link text-sm font-medium transition-colors"
              style={{
                color: darkMode ? "#E2E8F0" : "#E2E8F0",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = darkMode
                  ? "#00E5FF"
                  : "#60A5FA";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = darkMode
                  ? "#E2E8F0"
                  : "#E2E8F0";
              }}
            >
              {item.label}
            </Link>
          ))}
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
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(147,197,253,0.2)",
            }}
            aria-label="تغییر حالت نمایش"
          >
            {darkMode ? <IconSun /> : <IconMoon />}
          </button>

          <Link
            href="/contact"
            className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 md:px-4 rounded-lg text-[11px] sm:text-xs md:text-sm font-semibold transition-all whitespace-nowrap"
            style={{
              color: "#FFFFFF",
              backgroundColor: darkMode ? "#EF4444" : "#0B3B82",
              border: darkMode
                ? "1px solid #EF4444"
                : "1px solid #1D4ED8",
              boxShadow: darkMode
                ? undefined
                : "0 4px 14px rgba(7,26,58,0.28)",
            }}
            onMouseEnter={(e) => {
              if (!darkMode) {
                e.currentTarget.style.backgroundColor = "#2563EB";
                e.currentTarget.style.borderColor = "#60A5FA";
              }
            }}
            onMouseLeave={(e) => {
              if (!darkMode) {
                e.currentTarget.style.backgroundColor = "#0B3B82";
                e.currentTarget.style.borderColor = "#1D4ED8";
              }
            }}
          >
            تماس اورژانسی
          </Link>
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
