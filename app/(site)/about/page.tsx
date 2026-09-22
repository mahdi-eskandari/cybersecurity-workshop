// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useTheme } from "../../../components/ThemeProvider";
// import {EmergencyModal} from "../../.../../../components/CrisisReportForm"



// /* ─── SHARED ─── */
// const PulseDot = ({ size = 7, darkMode = true }: { size?: number; darkMode?: boolean }) => (
//   <span
//     style={{
//       display: "inline-block",
//       width: size,
//       height: size,
//       borderRadius: "50%",
//       background: darkMode ? "#00E5FF" : "#1E3A8A",
//       boxShadow: darkMode ? "0 0 8px rgba(0,229,255,0.9)" : "0 0 8px rgba(30,64,175,0.32)",
//       flexShrink: 0,
//     }}
//   />
// );

// /* ─── ICONS ─── */
// const IconClose = () => (
//   <svg
//     width="17"
//     height="17"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.2"
//     strokeLinecap="round"
//   >
//     <line x1="18" y1="6" x2="6" y2="18" />
//     <line x1="6" y1="6" x2="18" y2="18" />
//   </svg>
// );

// /* ─── DECORATIVE SVGs ─── */

// const HeroBg = ({ darkMode = true }: { darkMode?: boolean }) => (
//   <svg
//     className="absolute inset-0 w-full h-full pointer-events-none"
//     viewBox="0 0 1200 520"
//     preserveAspectRatio="xMidYMid slice"
//   >
//     <defs>
//       <radialGradient id="hbg" cx="50%" cy="50%" r="60%">
//         <stop offset="0%" stopColor={darkMode ? "rgba(0,229,255,0.07)" : "rgba(30,64,175,0.16)"} />
//         <stop offset="100%" stopColor="transparent" />
//       </radialGradient>
//     </defs>

//     <rect width="1200" height="520" fill="url(#hbg)" />

//     {[
//       [120, 80, 300, 200],
//       [300, 200, 500, 140],
//       [500, 140, 700, 240],
//       [700, 240, 900, 160],
//       [900, 160, 1080, 260],
//       [1080, 260, 1180, 140],
//       [300, 200, 200, 350],
//       [700, 240, 650, 400],
//       [900, 160, 950, 380],
//       [120, 80, 80, 280],
//       [500, 140, 480, 40],
//     ].map(([x1, y1, x2, y2], i) => (
//       <line
//         key={i}
//         x1={x1}
//         y1={y1}
//         x2={x2}
//         y2={y2}
//         stroke={darkMode ? "rgba(0,229,255,0.07)" : "rgba(30,64,175,0.16)"}
//         strokeWidth="1"
//       />
//     ))}

//     {[
//       [120, 80],
//       [300, 200],
//       [500, 140],
//       [700, 240],
//       [900, 160],
//       [1080, 260],
//       [1180, 140],
//       [200, 350],
//       [650, 400],
//       [950, 380],
//       [80, 280],
//       [480, 40],
//     ].map(([x, y], i) => (
//       <circle
//         key={i}
//         cx={x}
//         cy={y}
//         r={i % 3 === 0 ? 4 : 2.5}
//         fill={
//           i % 3 === 0
//             ? (darkMode ? "rgba(0,229,255,0.35)" : "rgba(37,99,235,0.42)")
//             : (darkMode ? "rgba(0,229,255,0.18)" : "rgba(30,58,138,0.52)")
//         }
//         stroke={
//           i % 3 === 0 ? (darkMode ? "rgba(0,229,255,0.5)" : "rgba(30,58,138,0.90)") : "none"
//         }
//         strokeWidth="1"
//       />
//     ))}
//   </svg>
// );

// const SynergyIllustration = ({ darkMode = true }: { darkMode?: boolean }) => (
//   <svg
//     width="100%"
//     height="100%"
//     viewBox="0 0 320 320"
//     style={{
//       maxWidth: 280,
//       margin: "0 auto",
//       display: "block",
//     }}
//   >
//     <defs>
//       <radialGradient id="sg1" cx="50%" cy="50%" r="50%">
//         <stop offset="0%" stopColor={darkMode ? "rgba(0,229,255,0.12)" : "rgba(30,58,138,0.42)"} />
//         <stop offset="100%" stopColor="transparent" />
//       </radialGradient>

//       <filter id="sglow">
//         <feGaussianBlur stdDeviation="4" result="blur" />
//         <feMerge>
//           <feMergeNode in="blur" />
//           <feMergeNode in="SourceGraphic" />
//         </feMerge>
//       </filter>
//     </defs>

//     <circle cx="160" cy="160" r="130" fill="url(#sg1)" />

//     <circle
//       cx="160"
//       cy="160"
//       r="128"
//       fill="none"
//       stroke={darkMode ? "rgba(0,229,255,0.08)" : "rgba(30,58,138,0.42)"}
//       strokeWidth="1"
//       strokeDasharray="6 6"
//     />

//     <circle
//       cx="160"
//       cy="160"
//       r="100"
//       fill="none"
//       stroke={darkMode ? "rgba(0,229,255,0.06)" : "rgba(30,58,138,0.34)"}
//       strokeWidth="1"
//     />

//     <path
//       d="M160 52L88 76v56c0 46 32 88 72 104 40-16 72-58 72-104V76L160 52z"
//       fill={darkMode ? "rgba(0,229,255,0.05)" : "rgba(30,58,138,0.24)"}
//       stroke={darkMode ? "rgba(0,229,255,0.35)" : "rgba(30,58,138,0.90)"}
//       strokeWidth="1.5"
//       filter="url(#sglow)"
//     />

//     <path
//       d="M160 64L96 86v48c0 40 28 76 64 92 36-16 64-52 64-92V86L160 64z"
//       fill={darkMode ? "rgba(0,229,255,0.04)" : "rgba(30,58,138,0.18)"}
//       stroke={darkMode ? "rgba(0,229,255,0.2)" : "rgba(29,78,216,0.52)"}
//       strokeWidth="1"
//     />

//     <polyline
//       points="138,148 152,162 186,130"
//       stroke={darkMode ? "#00E5FF" : "#1E3A8A"}
//       strokeWidth="2.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       fill="none"
//       opacity="0.7"
//     />

//     <line
//       x1="160"
//       y1="95"
//       x2="160"
//       y2="175"
//       stroke={darkMode ? "rgba(0,229,255,0.4)" : "rgba(37,99,235,0.5)"}
//       strokeWidth="1.5"
//     />

//     <line
//       x1="120"
//       y1="120"
//       x2="200"
//       y2="120"
//       stroke={darkMode ? "rgba(0,229,255,0.35)" : "rgba(30,58,138,0.90)"}
//       strokeWidth="1.5"
//     />

//     <path
//       d="M110 120 Q100 135 110 138 Q120 141 130 138 Q140 135 130 120Z"
//       fill={darkMode ? "rgba(0,229,255,0.08)" : "rgba(30,58,138,0.34)"}
//       stroke={darkMode ? "rgba(0,229,255,0.3)" : "rgba(29,78,216,0.62)"}
//       strokeWidth="1"
//     />

//     <line
//       x1="110"
//       y1="120"
//       x2="120"
//       y2="138"
//       stroke={darkMode ? "rgba(0,229,255,0.2)" : "rgba(29,78,216,0.52)"}
//       strokeWidth="1"
//     />

//     <line
//       x1="130"
//       y1="120"
//       x2="120"
//       y2="138"
//       stroke={darkMode ? "rgba(0,229,255,0.2)" : "rgba(29,78,216,0.52)"}
//       strokeWidth="1"
//     />

//     <path
//       d="M170 122 Q160 137 170 140 Q180 143 190 140 Q200 137 190 122Z"
//       fill={darkMode ? "rgba(0,229,255,0.06)" : "rgba(29,78,216,0.14)"}
//       stroke={darkMode ? "rgba(0,229,255,0.25)" : "rgba(37,99,235,0.4)"}
//       strokeWidth="1"
//     />

//     <line
//       x1="170"
//       y1="122"
//       x2="180"
//       y2="140"
//       stroke={darkMode ? "rgba(0,229,255,0.2)" : "rgba(29,78,216,0.52)"}
//       strokeWidth="1"
//     />

//     <line
//       x1="190"
//       y1="122"
//       x2="180"
//       y2="140"
//       stroke={darkMode ? "rgba(0,229,255,0.2)" : "rgba(29,78,216,0.52)"}
//       strokeWidth="1"
//     />

//     {[
//       [72, 100],
//       [248, 100],
//       [72, 220],
//       [248, 220],
//     ].map(([cx, cy], i) => (
//       <circle
//         key={i}
//         cx={cx}
//         cy={cy}
//         r="3"
//         fill={darkMode ? "rgba(0,229,255,0.2)" : "rgba(30,64,175,0.42)"}
//         stroke={darkMode ? "rgba(0,229,255,0.35)" : "rgba(30,58,138,0.90)"}
//         strokeWidth="1"
//       />
//     ))}

//     <line
//       x1="88"
//       y1="76"
//       x2="72"
//       y2="100"
//       stroke={darkMode ? "rgba(0,229,255,0.1)" : "rgba(30,64,175,0.28)"}
//       strokeWidth="1"
//       strokeDasharray="3 3"
//     />

//     <line
//       x1="232"
//       y1="76"
//       x2="248"
//       y2="100"
//       stroke={darkMode ? "rgba(0,229,255,0.1)" : "rgba(30,64,175,0.28)"}
//       strokeWidth="1"
//       strokeDasharray="3 3"
//     />
//   </svg>
// );

// /* ─── VALUE CARD ICONS ─── */

// const IconLockedEye = ({ darkMode = true }: { darkMode?: boolean }) => (
//   <svg
//     width="32"
//     height="32"
//     viewBox="0 0 48 48"
//     fill="none"
//     stroke={darkMode ? "#00E5FF" : "#1E3A8A"}
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <ellipse cx="24" cy="26" rx="16" ry="11" />
//     <circle cx="24" cy="26" r="5" />
//     <circle
//       cx="24"
//       cy="26"
//       r="2"
//       fill={darkMode ? "rgba(0,229,255,0.3)" : "rgba(30,58,138,0.42)"}
//     />
//     <rect x="16" y="10" width="16" height="12" rx="3" />
//     <path d="M20 10V8a4 4 0 018 0v2" />
//     <line x1="24" y1="13" x2="24" y2="16" />
//   </svg>
// );

// const IconLightning = ({ darkMode = true }: { darkMode?: boolean }) => (
//   <svg
//     width="32"
//     height="32"
//     viewBox="0 0 48 48"
//     fill="none"
//     stroke={darkMode ? "#00E5FF" : "#1E3A8A"}
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path
//       d="M28 4L10 26h14l-4 18 18-22H24L28 4z"
//       fill={darkMode ? "rgba(0,229,255,0.1)" : "rgba(30,58,138,0.16)"}
//     />
//   </svg>
// );

// const IconTerminal = ({ darkMode = true }: { darkMode?: boolean }) => (
//   <svg
//     width="32"
//     height="32"
//     viewBox="0 0 48 48"
//     fill="none"
//     stroke={darkMode ? "#00E5FF" : "#1E3A8A"}
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect
//       x="4"
//       y="8"
//       width="40"
//       height="32"
//       rx="4"
//       fill={darkMode ? "rgba(0,229,255,0.05)" : "rgba(30,58,138,0.18)"}
//     />
//     <polyline points="12 20 20 28 12 36" />
//     <line x1="24" y1="36" x2="36" y2="36" />
//   </svg>
// );

// const IconInfo = ({ darkMode = true }: { darkMode?: boolean }) => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={darkMode ? "#00E5FF" : "#1E3A8A"}
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <line
//       x1="12"
//       y1="8"
//       x2="12"
//       y2="8"
//       strokeWidth="2.5"
//     />
//     <line x1="12" y1="12" x2="12" y2="16" />
//   </svg>
// );

// const IconWarning = () => (
//   <svg
//     width="18"
//     height="18"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
//     <line x1="12" y1="9" x2="12" y2="13" />
//     <line x1="12" y1="17" x2="12.01" y2="17" />
//   </svg>
// );



// /* ─── APP ─── */

// export default function App() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [hoveredCard, setHoveredCard] = useState<number | null>(null);
//   const { darkMode } = useTheme();
//   const [crisisOpen, setCrisisOpen] = useState(false);
//     const [seo, setSeo] = useState({
//     h1Title: "ما تاریکی‌های دنیای دیجیتال را روشن می‌کنیم.",
//   });
  


// useEffect(() => {
//   fetch("/api/admin/seo")
//     .then((res) => res.json())
//     .then((data) => {
//       const homeSeo = data?.pages?.find(
//         (page: any) => page.pageKey === "about"
//       );

//       if (homeSeo?.h1Title) {
//         setSeo({
//           h1Title: homeSeo.h1Title,
//         });
//       }
//     })
//     .catch(() => {});
// }, []);


//   const values = [
//     {
//       icon: <IconLockedEye darkMode={darkMode} />,
//       badge: "CONFIDENTIALITY",
//       title: "رازداری مطلق",
//       desc: "هویت مراجعین و جزئیات پرونده‌ها در بالاترین سطح امنیتی و به صورت آفلاین نگهداری می‌شوند.",
//       detail:
//         "پروتکل آفلاین • رمزگذاری سرتاسری • بدون ذخیره ابری",
//     },
//     {
//       icon: <IconLightning darkMode={darkMode} />,
//       badge: "RAPID RESPONSE",
//       title: "واکنش سریع",
//       desc: "در جرایم سایبری زمان محدود است. تیم اورژانس ما در لحظه بحران وارد عمل می‌شود.",
//       detail:
//         "پاسخ اولیه < ۲ ساعت • ۷ روز هفته • ۲۴ ساعته",
//     },
//     {
//       icon: <IconTerminal darkMode={darkMode} />,
//       badge: "SCIENTIFIC PRECISION",
//       title: "دقت علمی",
//       desc: "گزارش‌های ما بر پایه تحلیل دقیق گره‌های بلاک‌چین و لاگ‌های سرور است، نه حدس و گمان.",
//       detail:
//         "آنالیز آن‌چین • لاگ‌آنالیز • زنجیره حضانت",
//     },
//   ];

//   const accent = darkMode ? "#00E5FF" : "#1E3A8A";
//   const textMain = darkMode ? "#E2E8F0" : "#0F172A";
//   const textMuted = darkMode ? "#475569" : "#475569";
//   const cardBg = darkMode
//     ? "rgba(255,255,255,0.028)"
//     : "#FFFFFF";

//   return (
//     <>
//  <div
//       dir="rtl"
//       className={`min-h-screen transition-colors duration-300 ${
//         darkMode
//           ? "bg-[#0A1128] text-[#E6F7FF]"
//           : "bg-white text-[#0F172A]"
//       }`}
//       style={{
//         fontFamily: "'Vazirmatn', sans-serif",
//         backgroundImage: darkMode
//           ? "linear-gradient(rgba(0,229,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.03) 1px,transparent 1px)"
//           : "linear-gradient(rgba(30,58,138,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(30,58,138,0.045) 1px,transparent 1px)",
//         backgroundSize: "52px 52px",
//       backgroundAttachment: "fixed"
//       }}
//     >
//      {crisisOpen && (
//         <EmergencyModal
//           onClose={() => setCrisisOpen(false)}
//         />
//       )}

//       {/* ─── HERO ─── */}

//       <motion.section
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         viewport={{ once: true, amount: 0.2 }}
//         className="relative overflow-hidden px-6 pt-24 pb-28 md:px-12 md:pt-32 md:pb-36 text-center"
//       >
//         <HeroBg darkMode={darkMode} />

//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: darkMode
//               ? "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(0,229,255,0.065) 0%, transparent 70%)"
//               : "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(227, 232, 242, 0.18) 0%, transparent 70%)",
//           }}
//         />

//         <div className="relative z-10 max-w-3xl mx-auto">
//           <div
//             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold"
//             style={{
//               background: darkMode
//                 ? "rgba(0,229,255,0.07)"
//                 : "rgba(30,58,138,0.12)",
//               border: darkMode
//                 ? "1px solid rgba(0,229,255,0.2)"
//                 : "1px solid rgba(30,58,138,0.42)",
//               color: accent,
//             }}
//           >
//             <PulseDot size={5} darkMode={darkMode} />

//             <span
//               style={{
//                 fontFamily: "monospace",
//                 letterSpacing: "0.15em",
//               }}
//             >
//               ABOUT PARAHOOR // SINCE ۱۴۰۲
//             </span>
//           </div>

//         <h1
//   className="glow-text font-black leading-tight mb-6"
//   style={{
//     fontSize: "clamp(2rem, 5vw, 3.5rem)",
//     color: darkMode ? "#e8f4f8" : "#0c1a43",
//     lineHeight: "1.3",
//     fontWeight: 900,
//     textShadow: darkMode
//       ? undefined
//       : "0 0 18px rgba(30,58,138,0.10)",
//   }}
// >
//   {seo.h1Title}
// </h1>

//           <p
//             className="mx-auto mb-8"
//             style={{
//               color: textMuted,
//               fontSize: "clamp(0.92rem,2vw,1.08rem)",
//               lineHeight: 1.9,
//               maxWidth: 580,
//             }}
//           >
//             پاراهور، نخستین آژانس تخصصی کارآگاهان سایبری است
//             که با هدف کشف حقیقت، ردیابی جریان‌های مالی پنهان
//             و تأمین ادله دیجیتال برای محاکم قضایی تأسیس شده
//             است.
//           </p>

//           <div className="flex flex-wrap justify-center gap-8 mt-10">
//             {[
//               { val: "+۳۰۰", label: "پرونده موفق" },
//               { val: "+۴.۵M$", label: "دارایی ردیابی‌شده" },
//               { val: "۱۴", label: "شبکه بلاک‌چین" },
//             ].map(({ val, label }) => (
//               <div key={label} className="text-center">
//                 <div
//                   className="font-black"
//                   style={{
//                     fontSize:
//                       "clamp(1.6rem,3.5vw,2.2rem)",
//                     color: accent,
//                     fontFamily: "inherit",
//                     lineHeight: 1.2,
//                     whiteSpace: "nowrap",
//                     fontVariantNumeric: "tabular-nums",
//                   }}
//                 >
//                   {val}
//                 </div>

//                 <div
//                   style={{
//                     color: darkMode ? "#334155" : "#64748B",
//                     fontSize: "0.75rem",
//                     marginTop: 3,
//                   }}
//                 >
//                   {label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div
//           className="absolute bottom-0 inset-x-0"
//           style={{
//             height: 1,
//             background: darkMode
//               ? "linear-gradient(90deg,transparent,rgba(0,229,255,0.2),transparent)"
//               : "linear-gradient(90deg,transparent,rgba(30,64,175,0.28),transparent)",
//           }}
//         />
//       </motion.section>

//       {/* ─── SYNERGY SECTION ─── */}

//       <motion.section
//         initial={{ opacity: 0, y: 60 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         viewport={{ once: true, amount: 0.2 }}
//         className="px-6 py-20 md:px-12 md:py-28"
//       >
//         <div className="max-w-5xl mx-auto">
//           <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-5">
//                 <div
//                   style={{
//                     width: 3,
//                     height: 22,
//                     background: darkMode
//                       ? "linear-gradient(180deg,#00E5FF,rgba(0,229,255,0.15))"
//                       : "linear-gradient(180deg,#2563EB,rgba(30,64,175,0.22))",
//                     borderRadius: 2,
//                   }}
//                 />

//                 <span
//                   style={{
//                     fontFamily: "monospace",
//                     fontSize: "0.62rem",
//                     color: darkMode
//                       ? "rgba(0,229,255,0.45)"
//                       : "rgba(30,64,175,0.78)",
//                     letterSpacing: "0.18em",
//                   }}
//                 >
//                   CYBER INTELLIGENCE + LEGAL EXPERTISE
//                 </span>
//               </div>

//               <h2
//                 className="font-black mb-6"
//                 style={{
//                   color: darkMode ? "#fff" : "#0F172A",
//                   fontSize: "clamp(1.4rem,3vw,2rem)",
//                   lineHeight: 1.4,
//                 }}
//               >
//                 تلفیق هوش سایبری
//                 <br />
//                 و بینش حقوقی
//               </h2>

//               <p
//                 style={{
//                   color: textMuted,
//                   fontSize: "clamp(0.9rem,1.8vw,1rem)",
//                   lineHeight: 1.95,
//                 }}
//               >
//                 پاراهور با بهره‌گیری از برترین متخصصان امنیت
//                 سایبری و در کنار مشاوره حقوقیِ وکلای برجسته
//                 دادگستری از جمله جناب آقای{" "}
//                 <span
//                   style={{
//                     color: darkMode ? "#E2E8F0" : "#1E293B",
//                     fontWeight: 600,
//                   }}
//                 >
//                   علیرضا طباطبایی
//                 </span>{" "}
//                 بنا شده است. هدف ما این است که گزارش‌های
//                 پیچیده فنی، به دقیق‌ترین و دادگاه‌پسندترین
//                 مستنداتِ قانونی تبدیل شوند.
//               </p>

//               <p
//                 className="mt-4"
//                 style={{
//                   color: textMuted,
//                   fontSize: "clamp(0.9rem,1.8vw,1rem)",
//                   lineHeight: 1.95,
//                 }}
//               >
//                 ما تمرکز خود را منحصراً بر{" "}
//                 <span
//                   style={{
//                     color: darkMode ? "#E2E8F0" : "#1E293B",
//                     fontWeight: 600,
//                   }}
//                 >
//                   خدمات فارنزیک و کارآگاهی خصوصی
//                 </span>{" "}
//                 قرار داده‌ایم تا بی‌نقص‌ترین بازوی فنی برای
//                 شما و وکلایتان باشیم.
//               </p>

//               <div className="flex flex-wrap gap-3 mt-8">
//                 {[
//                   {
//                     label: "تحلیل آن‌چین بلاک‌چین",
//                     col: "#1E3A8A",
//                   },
//                   {
//                     label: "گزارش‌های دادگاه‌پسند",
//                     col: "#1E3A8A",
//                   },
//                   {
//                     label: "کارآگاهی دیجیتال",
//                     col: "#1E3A8A",
//                   },
//                   {
//                     label: "مشاوره حقوقی فنی",
//                     col: "#7C3AED",
//                   },
//                 ].map(({ label, col }) => (
//                   <div
//                     key={label}
//                     className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all duration-300"
//                     style={{
//                       background: darkMode
//                         ? `${col}09`
//                         : `${col}08`,
//                       border: darkMode
//                         ? `1px solid ${col}20`
//                         : `1px solid ${col}25`,
//                       color:
//                         col === "#7C3AED"
//                           ? (darkMode ? "#7C3AED" : "#1E3A8A")
//                           : darkMode
//                             ? "#00E5FF"
//                             : "#1E3A8A",
//                     }}
//                     onMouseEnter={(e) => {
//                       if (!darkMode) {
//                         e.currentTarget.style.background = "#EFF6FF";
//                         e.currentTarget.style.borderColor = "rgba(29,78,216,0.42)";
//                         e.currentTarget.style.transform = "translateY(-2px)";
//                         e.currentTarget.style.boxShadow = "0 8px 22px rgba(30,58,138,0.12)";
//                       }
//                     }}
//                     onMouseLeave={(e) => {
//                       if (!darkMode) {
//                         e.currentTarget.style.background = "rgba(30,58,138,0.10)";
//                         e.currentTarget.style.borderColor = "rgba(30,58,138,0.34)";
//                         e.currentTarget.style.transform = "none";
//                         e.currentTarget.style.boxShadow = "none";
//                       }
//                     }}
//                   >
//                     <span
//                       style={{
//                         width: 5,
//                         height: 5,
//                         borderRadius: "50%",
//                         background: col,
//                         display: "inline-block",
//                         opacity: 0.7,
//                       }}
//                     />

//                     {label}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex-shrink-0 w-full md:w-72 flex items-center justify-center">
//               <div
//                 className="relative w-full"
//                 style={{ maxWidth: 280 }}
//               >
//                 <div
//                   className="absolute inset-0 pointer-events-none rounded-full"
//                   style={{
//                     background: darkMode
//                       ? "radial-gradient(circle, rgba(30,64,175,0.14) 0%, rgba(30,64,175,0.04) 48%, transparent 72%)"
//                       : "radial-gradient(circle, rgba(29,78,216,0.20) 0%, rgba(30,58,138,0.08) 42%, transparent 72%)",
//                     transform: "scale(1.3)",
//                   }}
//                 />

//                 <SynergyIllustration darkMode={darkMode} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.section>

//       {/* ─── CORE VALUES ─── */}

//       <motion.section
//         initial={{ opacity: 0, y: 60 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         viewport={{ once: true, amount: 0.2 }}
//         className="px-6 py-20 md:px-12"
//         style={{
//           background: darkMode
//             ? "rgba(6,11,25,0.6)"
//             : "rgba(255,255,255,0.75)",
//           borderTop: darkMode
//             ? "1px solid rgba(0,229,255,0.06)"
//             : "1px solid rgba(30,58,138,0.16)",
//           borderBottom: darkMode
//             ? "1px solid rgba(0,229,255,0.06)"
//             : "1px solid rgba(30,58,138,0.16)",
//         }}
//       >
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-14">
//             <span
//               style={{
//                 fontFamily: "monospace",
//                 fontSize: "0.62rem",
//                 color: darkMode
//                   ? "rgba(0,229,255,0.4)"
//                   : "rgba(30,58,138,0.90)",
//                 letterSpacing: "0.2em",
//               }}
//               className="block mb-3"
//             >
//               CORE PRINCIPLES // PARAHOOR
//             </span>

//             <h2
//               className="font-bold"
//               style={{
//                 color: darkMode ? "#fff" : "#0F172A",
//                 fontSize: "clamp(1.3rem,3vw,1.9rem)",
//               }}
//             >
//               ارزش‌های بنیادین پاراهور
//             </h2>

//             <div
//               style={{
//                 height: 1,
//                 width: 60,
//                 background: darkMode
//                   ? "linear-gradient(90deg,transparent,rgba(0,229,255,0.5),transparent)"
//                   : "linear-gradient(90deg,transparent,rgba(30,58,138,0.90),transparent)",
//                 margin: "16px auto 0",
//               }}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//             {values.map((v, i) => {
//               const isHov = hoveredCard === i;

//               return (
//                 <div
//                   key={i}
//                   className="relative overflow-hidden rounded-2xl flex flex-col transition-all duration-300"
//                   style={{
//                     background: isHov
//                       ? darkMode
//                         ? "rgba(0,229,255,0.06)"
//                         : "rgba(192, 200, 221, 0.12)"
//                       : cardBg,
//                     border: isHov
//                       ? darkMode
//                         ? "1px solid rgba(0,229,255,0.35)"
//                         : "1px solid rgba(29,78,216,0.52)"
//                       : darkMode
//                         ? "1px solid rgba(0,229,255,0.12)"
//                         : "1px solid rgba(29,78,216,0.20)",
//                     backdropFilter: "blur(10px)",
//                     transform: isHov
//                       ? "translateY(-4px)"
//                       : "none",
//                     boxShadow: isHov
//                       ? darkMode
//                         ? "0 16px 48px rgba(0,0,0,0.4), 0 0 30px rgba(0,229,255,0.07)"
//                         : "0 16px 40px rgba(30,58,138,0.34)"
//                       : darkMode
//                         ? "0 4px 20px rgba(0,0,0,0.2)"
//                         : "0 4px 20px rgba(15,23,42,0.06)",
//                   }}
//                   onMouseEnter={() => setHoveredCard(i)}
//                   onMouseLeave={() => setHoveredCard(null)}
//                 >
//                   <div
//                     style={{
//                       height: 1.5,
//                       background: darkMode
//                         ? "linear-gradient(90deg,transparent,rgba(0,229,255,0.6),transparent)"
//                         : "linear-gradient(90deg,transparent,rgba(30,64,175,0.82),transparent)",
//                       opacity: isHov ? 1 : 0.3,
//                       transition: "opacity 0.3s",
//                     }}
//                   />

//                   <div className="p-7 flex flex-col flex-1">
//                     <span
//                       style={{
//                         fontFamily: "monospace",
//                         fontSize: "0.58rem",
//                         color: darkMode
//                           ? "rgba(0,229,255,0.35)"
//                           : "rgba(30,58,138,0.90)",
//                         letterSpacing: "0.14em",
//                         marginBottom: 16,
//                         display: "block",
//                       }}
//                     >
//                       {v.badge}
//                     </span>

//                     <div
//                       className="flex items-center justify-center w-14 h-14 rounded-2xl mb-5 transition-all duration-300"
//                       style={{
//                         background: isHov
//                           ? darkMode
//                             ? "rgba(0,229,255,0.12)"
//                             : "rgba(37,99,235,0.1)"
//                           : darkMode
//                             ? "rgba(0,229,255,0.06)"
//                             : "rgba(30,58,138,0.10)",
//                         border: isHov
//                           ? darkMode
//                             ? "1px solid rgba(0,229,255,0.3)"
//                             : "1px solid rgba(30,64,175,0.42)"
//                           : darkMode
//                             ? "1px solid rgba(0,229,255,0.15)"
//                             : "1px solid rgba(30,58,138,0.34)",
//                       }}
//                     >
//                       {v.icon}
//                     </div>

//                     <h3
//                       className="font-bold mb-3 transition-colors duration-300"
//                       style={{
//                         color: isHov
//                           ? darkMode
//                             ? "#fff"
//                             : "#0F172A"
//                           : darkMode
//                             ? "#E2E8F0"
//                             : "#1E293B",
//                         fontSize: "1.05rem",
//                       }}
//                     >
//                       {v.title}
//                     </h3>

//                     <p
//                       style={{
//                         color: textMuted,
//                         fontSize: "0.85rem",
//                         lineHeight: 1.85,
//                         flexGrow: 1,
//                       }}
//                     >
//                       {v.desc}
//                     </p>

//                     <div
//                       style={{
//                         height: 1,
//                         background: isHov
//                           ? darkMode
//                             ? "rgba(0,229,255,0.12)"
//                             : "rgba(30,58,138,0.34)"
//                           : darkMode
//                             ? "rgba(255,255,255,0.04)"
//                             : "rgba(15,23,42,0.06)",
//                         margin: "18px 0 14px",
//                         transition: "background 0.3s",
//                       }}
//                     />

//                     <p
//                       style={{
//                         fontFamily: "monospace",
//                         fontSize: "0.65rem",
//                         color: darkMode
//                           ? "rgba(0,229,255,0.35)"
//                           : "rgba(30,58,138,0.90)",
//                         letterSpacing: "0.06em",
//                       }}
//                     >
//                       {v.detail}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </motion.section>

//       {/* ─── TIMELINE / MILESTONES ─── */}

//       <motion.section
//         initial={{ opacity: 0, y: 60 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         viewport={{ once: true, amount: 0.2 }}
//         className="px-6 py-20 md:px-12"
//       >
//         <div className="max-w-3xl mx-auto">
//           <div className="text-center mb-12">
//             <span
//               style={{
//                 fontFamily: "monospace",
//                 fontSize: "0.62rem",
//                 color: darkMode
//                   ? "rgba(0,229,255,0.4)"
//                   : "rgba(30,58,138,0.90)",
//                 letterSpacing: "0.2em",
//               }}
//               className="block mb-3"
//             >
//               OPERATIONAL HISTORY
//             </span>

//             <h2
//               className="font-bold"
//               style={{
//                 color: darkMode ? "#fff" : "#0F172A",
//                 fontSize: "clamp(1.2rem,2.8vw,1.7rem)",
//               }}
//             >
//               مسیر ما تاکنون
//             </h2>
//           </div>

//           <div className="relative">
//             {/* Vertical line */}
//             <div
//               className="absolute top-0 bottom-0 right-[9px] md:right-[calc(50%-0.5px)]"
//               style={{
//                 width: 1,
//                 background: darkMode
//                   ? "linear-gradient(180deg,rgba(0,229,255,0.4),rgba(0,229,255,0.05))"
//                   : "linear-gradient(180deg,rgba(29,78,216,0.62),rgba(30,58,138,0.10))",
//               }}
//             />

//             <div className="space-y-7 md:space-y-10">
//               {[
//                 {
//                   year: "۱۴۰۲",
//                   title: "تأسیس پاراهور",
//                   desc: "آغاز فعالیت با تیم هسته‌ای از متخصصان امنیت سایبری و مشاوران حقوقی.",
//                 },
//                 {
//                   year: "۱۴۰۳",
//                   title: "اولین پرونده بزرگ",
//                   desc: "موفقیت در ردیابی ۸۰۰,۰۰۰ تتر سرقت‌شده در شبکه ترون و ارائه گزارش قضایی.",
//                 },
//                 {
//                   year: "۱۴۰۴",
//                   title: "گسترش خدمات",
//                   desc: "افزوده شدن سرویس‌های OSINT، فارنزیک موبایل، و پایش دارک‌وب به حوزه‌های تخصصی.",
//                 },
//                 {
//                   year: "۱۴۰۵",
//                   title: "بیش از ۳۰۰ پرونده موفق",
//                   desc: "ردیابی بیش از ۴.۵ میلیون دلار دارایی دیجیتال و ارائه ادله به مراجع قضایی بین‌المللی.",
//                 },
//               ].map(({ year, title, desc }, i) => (
//                 <div
//                   key={year}
//                   className={`relative flex items-start gap-4 md:gap-8 ${
//                     i % 2 === 0
//                       ? "md:flex-row"
//                       : "md:flex-row-reverse"
//                   }`}
//                 >
//                   {/* Content */}
//                   <div className="flex-1 min-w-0">
//                     <div
//                       className="p-5 rounded-xl transition-all duration-300"
//                       style={{
//                         background: darkMode
//                           ? "rgba(255,255,255,0.025)"
//                           : "#FFFFFF",
//                         border: darkMode
//                           ? "1px solid rgba(0,229,255,0.1)"
//                           : "1px solid rgba(30,58,138,0.34)",
//                         boxShadow: darkMode
//                           ? "none"
//                           : "0 8px 24px rgba(15,23,42,0.04)",
//                       }}
//                     onMouseEnter={(e) => {
//                       if (!darkMode) {
//                         e.currentTarget.style.background = "#eff6ffe8";
//                         e.currentTarget.style.borderColor = "rgba(29,78,216,0.52)";
//                         e.currentTarget.style.transform = "translateY(-2px)";
//                         e.currentTarget.style.boxShadow = "0 8px 22px rgba(30,58,138,0.24)";
//                       }
//                     }}
//                     onMouseLeave={(e) => {
//                       if (!darkMode) {
//                         e.currentTarget.style.background = "#FFFFFF";
//                         e.currentTarget.style.borderColor = "rgba(30,58,138,0.34)";
//                         e.currentTarget.style.transform = "none";
//                         e.currentTarget.style.boxShadow = "none";
//                       }
//                     }}
//                     >
//                       <span
//                         style={{
//                           fontFamily: "monospace",
//                           fontSize: "0.62rem",
//                           color: darkMode
//                             ? "rgba(0,229,255,0.5)"
//                             : "rgba(30,64,175,0.78)",
//                           letterSpacing: "0.15em",
//                         }}
//                         className="block mb-2"
//                       >
//                         {year}
//                       </span>

//                       <h4
//                         className="font-bold mb-1.5"
//                         style={{
//                           color: darkMode
//                             ? "#fff"
//                             : "#0F172A",
//                           fontSize: "0.92rem",
//                         }}
//                       >
//                         {title}
//                       </h4>

//                       <p
//                         style={{
//                           color: textMuted,
//                           fontSize: "0.8rem",
//                           lineHeight: 1.75,
//                         }}
//                       >
//                         {desc}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Center dot */}
//                   <div
//                     className="relative z-10 flex-shrink-0 flex items-center justify-center w-5 md:w-8"
//                     style={{ paddingTop: 20 }}
//                   >
//                     <div
//                       style={{
//                         width: 10,
//                         height: 10,
//                         borderRadius: "50%",
//                         background: accent,
//                         boxShadow: darkMode
//                           ? "0 0 12px rgba(0,229,255,0.8)"
//                           : "0 0 12px rgba(29,78,216,0.52)",
//                         border: darkMode
//                           ? "2px solid rgba(0,229,255,0.4)"
//                           : "2px solid rgba(29,78,216,0.40)",
//                       }}
//                     />
//                   </div>

//                   {/* Spacer */}
//                   <div className="flex-1 hidden md:block" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </motion.section>

//       {/* ─── DISCLAIMER BANNER ─── */}

//       <div
//         className="px-6 py-5 md:px-12"
//         style={{
//           background: darkMode ? "#060B19" : "#FFFFFF",
//           borderTop: darkMode
//             ? "1px solid rgba(0,229,255,0.09)"
//             : "1px solid rgba(30,58,138,0.34)",
//           borderBottom: darkMode
//             ? "1px solid rgba(0,229,255,0.09)"
//             : "1px solid rgba(30,58,138,0.34)",
//         }}
//       >
//         <div className="max-w-5xl mx-auto flex items-start gap-4">
//           <div
//             className="flex-shrink-0 mt-0.5 p-2 rounded-lg"
//             style={{
//               background: darkMode
//                 ? "rgba(0,229,255,0.07)"
//                 : "rgba(30,58,138,0.18)",
//               border: darkMode
//                 ? "1px solid rgba(0,229,255,0.15)"
//                 : "1px solid rgba(30,64,175,0.22)",
//             }}
//           >
//             <IconInfo darkMode={darkMode} />
//           </div>

//           <p
//             style={{
//               color: textMuted,
//               fontSize: "0.83rem",
//               lineHeight: 1.85,
//             }}
//           >
//             <span
//               style={{
//                 color: darkMode ? "#64748B" : "#475569",
//                 fontWeight: 600,
//               }}
//             >
//               توجه:{" "}
//             </span>
//             پاراهور یک آژانس تحقیقات فنی است. ما مستقیماً
//             خدمات نمایندگی در دادگاه یا کمپین‌های حقوقی ارائه
//             نمی‌دهیم، بلکه حقیقت و شواهد را برای موفقیت در
//             دادگاه کشف می‌کنیم. تمام گزارش‌های ما برای
//             بهره‌برداری توسط وکیل یا مراجع قضایی آماده‌سازی
//             می‌شوند.
//           </p>
//         </div>
//       </div>

//       {/* ─── CONVERSION CTA ─── */}

//       <motion.section
//         initial={{ opacity: 0, y: 60 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         viewport={{ once: true, amount: 0.2 }}
//         className="px-6 py-20 md:px-12"
//       >
//         <div className="max-w-2xl mx-auto text-center">
//           <div
//             className="relative overflow-hidden rounded-2xl px-8 py-14"
//             style={{
//               background: darkMode
//                 ? "rgba(255,255,255,0.02)"
//                 : "#FFFFFF",
//               border: darkMode
//                 ? "1px solid rgba(0,229,255,0.16)"
//                 : "1px solid rgba(30,58,138,0.42)",
//               boxShadow: darkMode
//                 ? "0 0 60px rgba(0,229,255,0.06), 0 0 120px rgba(0,229,255,0.03), inset 0 0 40px rgba(0,229,255,0.02)"
//                 : "0 20px 60px rgba(30,58,138,0.16)",
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 right: 0,
//                 width: 48,
//                 height: 48,
//                 borderTop: darkMode
//                   ? "1.5px solid rgba(0,229,255,0.3)"
//                   : "1.5px solid rgba(30,64,175,0.42)",
//                 borderRight: darkMode
//                   ? "1.5px solid rgba(0,229,255,0.3)"
//                   : "1.5px solid rgba(30,64,175,0.42)",
//                 borderRadius: "0 16px 0 0",
//                 pointerEvents: "none",
//               }}
//             />

//             <div
//               style={{
//                 position: "absolute",
//                 bottom: 0,
//                 left: 0,
//                 width: 48,
//                 height: 48,
//                 borderBottom: darkMode
//                   ? "1.5px solid rgba(0,229,255,0.3)"
//                   : "1.5px solid rgba(30,64,175,0.42)",
//                 borderLeft: darkMode
//                   ? "1.5px solid rgba(0,229,255,0.3)"
//                   : "1.5px solid rgba(30,64,175,0.42)",
//                 borderRadius: "0 0 0 16px",
//                 pointerEvents: "none",
//               }}
//             />

//             <span
//               style={{
//                 fontFamily: "monospace",
//                 fontSize: "0.62rem",
//                 color: darkMode
//                   ? "rgba(0,229,255,0.4)"
//                   : "rgba(30,58,138,0.90)",
//                 letterSpacing: "0.2em",
//               }}
//               className="block mb-5"
//             >
//               FREE INITIAL ASSESSMENT
//             </span>

//             <h3
//               className="font-bold mb-3"
//               style={{
//                 color: darkMode ? "#fff" : "#0F172A",
//                 fontSize:
//                   "clamp(1.15rem,2.5vw,1.6rem)",
//                 lineHeight: 1.45,
//               }}
//             >
//               نیاز به بررسی پرونده خود دارید؟
//             </h3>

//             <p
//               className="mb-8 mx-auto"
//               style={{
//                 color: textMuted,
//                 fontSize: "0.88rem",
//                 lineHeight: 1.85,
//                 maxWidth: 420,
//               }}
//             >
//               تیم فنی پاراهور پرونده شما را بدون هزینه اولیه
//               ارزیابی می‌کند و امکان‌سنجی را اعلام می‌نماید.
//             </p>

//             <button
//                onClick={() => setCrisisOpen(true)}
//               className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl font-bold transition-all"
//               style={{
//                 background: "#EF4444",
//                 color: "#fff",
//                 border: "1px solid rgba(239,68,68,0.55)",
//                 boxShadow:
//                   "0 0 24px rgba(239,68,68,0.3)",
//                 fontSize: "1rem",
//                 fontFamily: "Vazirmatn,sans-serif",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.boxShadow =
//                   "0 0 40px rgba(239,68,68,0.5)";
//                 e.currentTarget.style.transform =
//                   "translateY(-1px)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.boxShadow =
//                   "0 0 24px rgba(239,68,68,0.3)";
//                 e.currentTarget.style.transform = "none";
//               }}
//             >
//               <IconWarning />
//               ثبت امن گزارش بحران
//             </button>

//             <p
//               className="mt-4 text-xs"
//               style={{
//                 color: darkMode ? "#1E293B" : "#94A3B8",
//               }}
//             >
//               بدون تعهد مالی • کاملاً محرمانه • پاسخ در کمتر
//               از ۲ ساعت
//             </p>
//           </div>
//         </div>
//       </motion.section>
//     </div>
//     </>
//   );
// }




import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import {
  getPageMetadata,
  getPageSeo,
  getAdjacentPageLinks,
  SITE_URL,
} from "@/lib/seo";
import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
} from "../../../lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("about");
}

function AboutPageJsonLd({
  title,
  description,
  canonical,
}: {
  title: string;
  description: string;
  canonical: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${canonical}#aboutpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: "fa-IR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: "پاراهور",
        },
      },
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: "صفحه اصلی", url: `${SITE_URL}/` },
        { name: "درباره ما", url: canonical },
      ]),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function AboutPage() {
  const seo = await getPageSeo("about");
  const { prevUrl, nextUrl } = await getAdjacentPageLinks("about");

  const canonical = new URL(
    seo.slug && seo.slug.trim() !== "" ? `/${seo.slug}` : "/",
    SITE_URL
  ).toString();

  return (
    <>
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}

      <AboutPageJsonLd
        title={seo.metaTitle}
        description={seo.metaDescription}
        canonical={canonical}
      />

      <AboutPageClient h1Title={seo.h1Title} />
    </>
  );
}
