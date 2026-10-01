"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import {Phone} from "lucide-react";
import {
  Shield,
  Mail,
  MapPin,
} from "lucide-react"


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

                <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <Link
                  href="/"
                  className="font-black text-lg"
                  style={{
                    color: darkMode
                      ? "rgba(255,255,255,0.7)"
                      : "#FFFFFF",
                  }}
                >
                  پاراهور
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
                  <span dir="ltr" className="text-[#818fa0]">
                    021-44097162
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#818fa0]">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>info@parahoor.com</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#818fa0]">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>آیت الله کاشانی، بلوار اباذر، نبش خیابان شالی، پلاک9، طبقه چهارم، واحد6</span>
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
                            : "#60A5FA";

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
                 <div className="ml-60 mt-8 bg-[#C62828]/20 border border-[#C62828]/35 rounded-xl p-4 w-[300px]">
                    <p className="text-xs font-semibold text-red-300 mb-1.5">
                      اورژانس سایبری
                    </p>
                    <p className="text-xs text-white/50 mb-3">
                      در صورت حادثه فوری، ۲۴/۷ در دسترسیم
                    </p>
                    <Link
                      href="/contact"
                      className="flex items-center gap-2 px-3.5 py-2 bg-[#C62828] text-white text-xs font-semibold rounded-lg hover:bg-[#B71C1C] transition-colors"
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