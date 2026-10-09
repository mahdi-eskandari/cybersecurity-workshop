"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import {Phone} from "lucide-react";
import {
  Shield,
  Mail,
  MapPin,
} from "lucide-react"
import Image from "next/image";
import { useState, type CSSProperties, type ReactNode } from "react";


/* =========================================================
   SOCIAL BUTTON
========================================================= */

const SocialBtn = ({
  icon,
  href = "#",
  title,
  accent,
}: {
  icon: ReactNode;
  href?: string;
  title: string;
  accent?: string; // اختیاری، فقط hex شش‌رقمی
}) => {
  const { darkMode } = useTheme();

  // دارک: فیروزه‌ای نئونی | لایت: آبی روشن
  const color = accent ?? (darkMode ? "#00E5FF" : "#0EA5E9");

  return (
    <Link
      href={href}
      title={title}
      aria-label={title}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      style={
        {
          "--accent": color,
          "--accent-bg": `${color}1A`,
          "--accent-border": `${color}66`,
          "--accent-glow": darkMode ? `${color}40` : `${color}59`,
        } as CSSProperties
      }
      className={`flex items-center justify-center w-[38px] h-[38px] rounded-[10px] transition-all duration-[180ms] hover:bg-[var(--accent-bg)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] hover:shadow-[0_0_14px_var(--accent-glow)] ${
        darkMode
          ? "bg-white/[0.04] border border-white/[0.08] text-[#64748B]"
          : "bg-white/[0.02] border border-white/[0.06] text-[#64748B]"
      }`}
    >
      {icon}
    </Link>
  );
};

const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.88-6.39L6.5 22H3.4l7.24-8.28L2.8 2h6.4l4.4 5.82L18.9 2Zm-1.1 17.73h1.73L8.27 4.14H6.41L17.8 19.73Z" />
  </svg>
);


const IconTelegram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="m21.7 3.4-3.2 16.9c-.24 1.2-.88 1.5-1.78.94l-4.9-3.61-2.36 2.27c-.26.26-.48.48-.98.48l.35-4.99 9.08-8.2c.4-.35-.09-.55-.62-.2L6.06 13.85l-4.82-1.51c-1.05-.33-1.07-1.05.22-1.55L20.3 3.02c.86-.32 1.61.2 1.4.38Z" />
  </svg>
);

const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
  </svg>
);


const F_SERVICES = [
  {
    title: "کشف هویت پشت نقاب",
    href: "/services",
  },
  {
    title: "ردیابی رمز ارز",
    href: "/services",
  },
  {
    title: "پاکسازی سیستم آلوده",
    href: "/services",
  },
  {
    title: "مستند سازی ادله دیجیتال",
    href: "/services",
  },
];

const COMPANY_LINKS = [
  {
    title: "درباره ما",
    href: "/about",
  },
  {
    title: "تماس با ما",
    href: "/contact",
  },
   {
    title: "حریم خصوصی",
    href: "/privacy",
  },
];

const BLOG_LINKS = [
  {
    title: "اخبار",
    href: "/blogs",
  },
  {
    title: "آموزش",
    href: "/blogs",
  },
  {
    title: "گزارش رادار",
    href: "/blogs",
  },
];

const PulseDot = ({
  size = 7,
  color = "#00E5FF",
}: {
  size?: number;
  color?: string;
}) => (
  <span
    style={{
      display: "inline-block",
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      boxShadow: `0 0 8px ${color}cc`,
      flexShrink: 0,
    }}
  />
);

export default function Footer() {
  const { darkMode } = useTheme();
    const [crisisOpen, setCrisisOpen] = useState(false);

  const footerMenus = [
    {
      title: "خدمات",
      links: F_SERVICES,
    },
    {
      title: "شرکت",
      links: COMPANY_LINKS,
    },
    {
      title: "وبلاگ",
      links: BLOG_LINKS,
    },
  ];

  return (
    <div
      className="min-h-full"
      style={{
        backgroundColor: darkMode ? "#0A1128" : "#FFFFFF",
        color: darkMode ? "#E2E8F0" : "#111827",
      }}
    >
      <footer
        className="px-6 py-12 md:px-12"
        style={{
          backgroundColor: darkMode ? "#050a19cc" : "#071A3A",
          borderTop: darkMode
            ? "1px solid rgba(0,229,255,0.1)"
            : "1px solid rgba(59,130,246,0.45)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 mb-12">
            <div className="md:col-span-2 space-y-4">

                <div className="mb-5">

                <Link href="/" aria-label="پراهور - صفحه اصلی" className="flex items-center gap-2 block shrink-0 cursor-pointer">
                <Image
                  src={ "/logo/parahoor-logo-v2-transparent-1024.png"}
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
                <span
                  className="font-black text-lg"
                  style={{
                    color: darkMode
                    ? "rgba(255,255,255,0.7)"
                    : "#FFFFFF",
                  }}
                  >
                  پاراهور
                </span>
                  </Link>
              </div>

              <p
                className="text-[0.78rem] leading-[1.9]"
                style={{
                  color: darkMode ? "#818fa0" : "#E2E8F0",
                }}
              >
                پاراهور یک آژانس تحقیقاتِ فنی است و مستقیماً خدمات وکالتی ارائه
                نمی‌دهد. تمام گزارش‌ها صرفاً جنبه فنی داشته و برای استفاده وکلا
                آماده می‌شوند.
              </p>
                            <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-sm text-[#818fa0]">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span dir="ltr" 
                    style={{
                  color: darkMode ? "#818fa0" : "#CBD5E1",
                }}
                  >
                    021-44097162
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#818fa0]"
                  style={{
                  color: darkMode ? "#818fa0" : "#CBD5E1",
                }}
                >
                  <Mail className="w-4 h-4 flex-shrink-0"
                  />
                  <span>info@parahoor.com</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#818fa0]"
                style={{
                  color: darkMode ? "#818fa0" : "#CBD5E1",
                }}
                >
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>آیت الله کاشانی، بلوار اباذر، نبش خیابان شالی، پلاک9، طبقه چهارم، واحد6</span>
                </div>
                <div>
<div className="flex items-center gap-2">
  <SocialBtn
    title="اینستاگرام"
    href="https://instagram.com/parahoor"
    icon={<IconInstagram />}
  />
  <SocialBtn
    title="تلگرام"
    href="https://t.me/Parahoor_com"
    icon={<IconTelegram />}
  />
  <SocialBtn
    title="ایکس"
    href="https://x.com/parahoor"
    icon={<IconX />}
  />
</div>
                </div>
              </div>
            </div>

            {/* ۳ ستون منو */}
            {footerMenus.map(({ title, links }, index) => (
              <div key={title} className="md:col-span-1">
                <h4
                  className="text-[14px] font-semibold mb-5"
                  style={{
                    color: darkMode
                      ? "rgba(255,255,255,0.7)"
                      : "#FFFFFF",
                  }}
                >
                  {title}
                </h4>

                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="text-[13px] transition-colors"
                        style={{
                          color: darkMode ? "#818fa0" : "#CBD5E1",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = darkMode
                            ? "#00E5FF"
                            : "#0EA5E9";

                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = darkMode
                            ? "#818fa0"
                            : "#CBD5E1";


                        }}
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                {index === footerMenus.length - 1 && (
                 <div className="ml-60 mt-8 bg-[#C62828]/20 border border-[#C62828]/35 rounded-xl p-4 w-[250px]">
                    <p className="text-xs font-semibold text-red-300 mb-1.5">
                      اورژانس سایبری
                    </p>
                    <p className="text-xs text-white/50 mb-3">
                      در صورت حادثه فوری، ۲۴/۷ در دسترسیم
                    </p>
                    <Link
                      href="/contact"
                      className="flex w-[65%] items-center gap-2 px-3.5 py-2 bg-[#C62828] text-white text-xs font-semibold rounded-lg hover:bg-[#B71C1C] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      تماس اضطراری
                    </Link>
                  </div>
                )}
              </div>
            ))}
             {/* <div>
              <div className="bg-[#C62828]/20 border border-[#C62828]/35 rounded-xl p-4 w-[300px]">
                <p className="text-xs font-semibold text-red-300 mb-1.5">
                  اورژانس سایبری
                </p>
                <p className="text-xs text-white/50 mb-3">
                  در صورت حادثه فوری، ۲۴/۷ در دسترسیم
                </p>
                <button
                    onClick={() => setCrisisOpen(true)}
                  className="flex items-center gap-2 px-3.5 py-2 bg-[#C62828] text-white text-xs font-semibold rounded-lg hover:bg-[#B71C1C] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  تماس اضطراری
                </button>
              </div>
            </div> */}
          </div>

          {/* کپی‌رایت پایین */}
          <div
            className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right"
            style={{
              borderColor: darkMode
                ? "rgba(255,255,255,0.1)"
                : "rgba(255,255,255,0.18)",
            }}
          >
            <p
              className="text-[11px]"
              style={{
                color: darkMode ? "#818fa0" : "#CBD5E1",
              }}
            >
              © ۱۴۰۵ پاراهور — تمامی حقوق محفوظ است
            </p>

            <p
              className="text-[11px]"
              style={{
                color: darkMode ? "#818fa0" : "#CBD5E1",
              }}
            >
             پژوهشگران ارشد جرائم رایانه‎ای – وکلای پایه یک دادگستری
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


// "use client";

// import { Shield, Phone, Mail, MapPin } from "lucide-react";
// import React from "react";
// import { useTheme } from "./ThemeProvider";

// const F_SERVICES = [
//   "کشف هویت پشت نقاب",
//   "ردیابی رمز ارز",
//   "پاکسازی سیستم آلوده",
//   "مستند سازی ادله دیجیتال",
// ];

// const contactUs = ["درباره ما", "تماس با ما", "حریم خصوصی"];
// const blug = ["اخبار", "آموزش", "گزارش رادار"];

// const PulseDot = ({
//   size = 7,
//   color = "#00E5FF",
// }: {
//   size?: number;
//   color?: string;
// }) => (
//   <span
//     style={{
//       display: "inline-block",
//       width: size,
//       height: size,
//       borderRadius: "50%",
//       background: color,
//       boxShadow: `0 0 8px ${color}cc`,
//       flexShrink: 0,
//     }}
//   />
// );

// export default function Footer() {
//   const { darkMode } = useTheme();

//   return (
//     <div
//       className="min-h-full"
//       style={{
//         backgroundColor: darkMode ? "#0A1128" : "#FFFFFF",
//         color: darkMode ? "#E2E8F0" : "#4B2E2B",
//       }}
//     >
//       <footer
//         className="px-6 py-12 md:px-12"
//         style={{
//           backgroundColor: darkMode ? "#050a19cc" : "#3b2623",
//           borderTop: darkMode
//             ? "1px solid rgba(0,229,255,0.1)"
//             : "1px solid rgba(110,26,55,0.3)",
//         }}
//       >
//         <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 mb-12">
//             <div className="md:col-span-2 space-y-4">
//               <div className="flex items-center gap-2.5 mb-3">
//                 <PulseDot
//                   color={darkMode ? "#00E5FF" : "#C78B8B"}
//                 />

//                 <span
//                   className="font-black text-lg"
//                   style={{
//                     color: darkMode
//                       ? "rgba(255,255,255,0.7)"
//                       : "#F5EDE8",
//                   }}
//                 >
//                   پاراهور
//                 </span>
//               </div>

//               <p
//                 className="text-[0.78rem] leading-[1.9]"
//                 style={{
//                   color: darkMode ? "#334155" : "#D8BDB3",
//                 }}
//               >
//                 پاراهور یک آژانس تحقیقاتِ فنی است و مستقیماً خدمات وکالتی ارائه
//                 نمی‌دهد. تمام گزارش‌ها صرفاً جنبه فنی داشته و برای استفاده وکلا
//                 آماده می‌شوند.
//               </p>
//             </div>

//             {/* ۳ ستون منو */}
//             {[
//               { title: "خدمات", links: F_SERVICES },
//               { title: "شرکت", links: contactUs },
//               { title: "قانونی", links: blug },
//             ].map(({ title, links }) => (
//               <div key={title} className="md:col-span-1">
//                 <h4
//                   className="text-[14px] font-semibold mb-5"
//                   style={{
//                     color: darkMode
//                       ? "rgba(255,255,255,0.7)"
//                       : "#F5EDE8",
//                   }}
//                 >
//                   {title}
//                 </h4>

//                 <ul className="space-y-3">
//                   {links.map((l) => (
//                     <li key={l}>
//                       <a
//                         href="#"
//                         className="text-[13px] transition-colors block"
//                         style={{
//                           color: darkMode ? "#334155" : "#D8BDB3",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.color = darkMode
//                             ? "#00E5FF"
//                             : "#C78B8B";
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.color = darkMode
//                             ? "#334155"
//                             : "#D8BDB3";
//                         }}
//                       >
//                         {l}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>

//           {/* کپی‌رایت پایین */}
//           <div
//             className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right"
//             style={{
//               borderColor: darkMode
//                 ? "rgba(255,255,255,0.1)"
//                 : "rgba(216,189,179,0.2)",
//             }}
//           >
//             <p
//               className="text-[11px]"
//               style={{
//                 color: darkMode ? "#334155" : "#d0aea3",
//               }}
//             >
//               © ۱۴۰۳ پاراهور — تمامی حقوق محفوظ است
//             </p>

//             <p
//               className="text-[11px]"
//               style={{
//                 color: darkMode ? "#334155" : "#d0aea3",
//               }}
//             >
//               کارشناس رسمی دادگستری · عضو انجمن حقوق دیجیتال ایران
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }