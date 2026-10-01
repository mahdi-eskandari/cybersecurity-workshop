// "use client";

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useTheme } from "@/components/ThemeProvider";
// import Link from "next/link";

// /* ────────────────────────────────
//    ICONS
// ──────────────────────────────── */

// const IconClose = () => (
//   <svg
//     width="18"
//     height="18"
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

// const IconLock = () => (
//   <svg
//     width="13"
//     height="13"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//     <path d="M7 11V7a5 5 0 0110 0v4" />
//   </svg>
// );

// const IconSend = () => (
//   <svg
//     width="17"
//     height="17"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <line x1="22" y1="2" x2="11" y2="13" />
//     <polygon points="22 2 15 22 11 13 2 9 22 2" />
//   </svg>
// );

// const IconShieldCheck = ({ darkMode }: { darkMode: boolean }) => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={darkMode ? "#00E5FF" : "#2563EB"}
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//     <polyline points="9 12 11 14 15 10" />
//   </svg>
// );

// const IconCrypto = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <path d="M9 8h4.5a1.5 1.5 0 010 3H9v3h5a1.5 1.5 0 010 3H9" />
//     <line x1="12" y1="6" x2="12" y2="8" />
//     <line x1="12" y1="18" x2="12" y2="20" />
//   </svg>
// );

// const IconHack = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="2" y="3" width="20" height="14" rx="2" />
//     <path d="M8 17v4M16 17v4M12 21h.01" />
//     <path d="M7 10l2 2-2 2" />
//     <line x1="12" y1="12" x2="15" y2="12" />
//   </svg>
// );

// const IconExtort = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
//     <line x1="12" y1="9" x2="12" y2="13" />
//     <circle cx="12" cy="17" r="0.5" fill="currentColor" />
//   </svg>
// );

// const IconRecaptcha = ({ darkMode }: { darkMode: boolean }) => {
//   const primary = darkMode ? "0,229,255" : "37,99,235";

//   return (
//     <svg width="12" height="12" viewBox="0 0 64 64" fill="none">
//       <path
//         d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4z"
//         fill={`rgba(${primary},0.08)`}
//         stroke={`rgba(${primary},0.25)`}
//         strokeWidth="2"
//       />
//       <path
//         d="M20 32c0-6.627 5.373-12 12-12s12 5.373 12 12"
//         stroke={`rgba(${primary},0.4)`}
//         strokeWidth="2.5"
//         strokeLinecap="round"
//       />
//       <path
//         d="M44 32l-4-4M44 32l-4 4"
//         stroke={`rgba(${primary},0.4)`}
//         strokeWidth="2"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// };

// /* ────────────────────────────────
//    SUCCESS PAGE — ICONS
// ──────────────────────────────── */

// const IconTimelineCheck = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.4"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polyline points="20 6 9 17 4 12" />
//   </svg>
// );

// const IconTimelineClock = () => (
//   <svg
//     width="15"
//     height="15"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <polyline points="12 6 12 12 16 14" />
//   </svg>
// );

// const IconTimelineArrow = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <line x1="5" y1="12" x2="19" y2="12" />
//     <polyline points="12 5 19 12 12 19" />
//   </svg>
// );

// const IconTimelineWarn = () => (
//   <svg
//     width="15"
//     height="15"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
//     <line x1="12" y1="9" x2="12" y2="13" />
//     <circle cx="12" cy="17" r="0.8" fill="currentColor" />
//   </svg>
// );

// const IconTimelineHome = () => (
//   <svg
//     width="15"
//     height="15"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
//     <polyline points="9 22 9 12 15 12 15 22" />
//   </svg>
// );

// const IconTimelineBook = () => (
//   <svg
//     width="15"
//     height="15"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
//     <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
//   </svg>
// );

// const IconTimelineShield = () => (
//   <svg
//     width="52"
//     height="52"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.4"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//     <polyline points="9 12 11 14 15 10" strokeWidth="1.8" />
//   </svg>
// );

// /* ────────────────────────────────
//    SUCCESS PAGE — ANIMATED SHIELD
// ──────────────────────────────── */

// const SuccessShield = ({ primary }: { primary: string }) => {
//   const [ringScale, setRingScale] = useState(1);
//   const [checkVisible, setCheckVisible] = useState(false);
//   const [particles, setParticles] = useState<
//     { x: number; y: number; size: number; delay: number }[]
//   >([]);

//   useEffect(() => {
//     const t1 = setTimeout(() => setCheckVisible(true), 400);
//     const t2 = setInterval(
//       () => setRingScale((s) => (s === 1 ? 1.06 : 1)),
//       2400
//     );

//     const generated = Array.from({ length: 14 }, (_, i) => {
//       const angle = (i / 14) * 360;
//       const dist = 70 + Math.random() * 40;
//       return {
//         x: Math.cos((angle * Math.PI) / 180) * dist,
//         y: Math.sin((angle * Math.PI) / 180) * dist,
//         size: 2 + Math.random() * 3,
//         delay: Math.random() * 0.4,
//       };
//     });
//     setParticles(generated);

//     return () => {
//       clearTimeout(t1);
//       clearInterval(t2);
//     };
//   }, []);

//   return (
//     <div
//       className="relative flex items-center justify-center"
//       style={{ width: 140, height: 140 }}
//     >
//       {[1, 0.55, 0.28].map((op, i) => (
//         <div
//           key={i}
//           className="absolute rounded-full"
//           style={{
//             width: 140,
//             height: 140,
//             border: `1px solid ${primary}${Math.round(op * 0.18 * 255)
//               .toString(16)
//               .padStart(2, "0")}`,
//             borderRadius: "50%",
//             transform: `scale(${1 + i * 0.28})`,
//             animation: `pulse-ring-success ${2 + i * 0.7}s ease-in-out infinite`,
//             animationDelay: `${i * 0.3}s`,
//           }}
//         />
//       ))}

//       <div
//         className="relative flex items-center justify-center rounded-full"
//         style={{
//           width: 100,
//           height: 100,
//           background: `radial-gradient(circle at 35% 30%, ${primary}24, ${primary}0d)`,
//           border: `1.5px solid ${primary}61`,
//           boxShadow: `0 0 40px ${primary}33, 0 0 80px ${primary}14, inset 0 0 30px ${primary}0f`,
//           transform: `scale(${ringScale})`,
//           transition: "transform 0.6s ease",
//           backdropFilter: "blur(10px)",
//         }}
//       >
//         <span
//           style={{
//             color: primary,
//             opacity: checkVisible ? 1 : 0,
//             transform: checkVisible ? "scale(1)" : "scale(0.7)",
//             transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <IconTimelineShield />
//         </span>
//       </div>

//       <svg
//         className="absolute inset-0 w-full h-full"
//         style={{ animation: "spin-slow-success 18s linear infinite" }}
//       >
//         <circle
//           cx="70"
//           cy="70"
//           r="64"
//           fill="none"
//           stroke={`${primary}1f`}
//           strokeWidth="1"
//           strokeDasharray="6 10"
//         />
//       </svg>

//       <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
//         {particles.map((p, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full"
//             style={
//               {
//                 width: p.size,
//                 height: p.size,
//                 background:
//                   i % 3 === 0 ? "rgba(16,185,129,0.7)" : `${primary}99`,
//                 "--tx": `${p.x}px`,
//                 "--ty": `${p.y}px`,
//                 animation: `particle-fade-success 2.4s ease-out ${p.delay}s both`,
//               } as React.CSSProperties
//             }
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// /* ────────────────────────────────
//    INCIDENT CHIP
// ──────────────────────────────── */

// type Chip = {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
// };

// const chips: Chip[] = [
//   { id: "darkweb-threat-intelligence", label: "پایش دارک‌وب و هوش تهدیدات", icon: <IconHack /> },
//   { id: "post-crisis-pentest", label: "تست نفوذِ پسا-بحران", icon: <IconHack /> },
//   { id: "ransomware-negotiation", label: "مقابله و مذاکره با باج‌افزارها", icon: <IconExtort /> },
//   { id: "digital-forensics", label: "فارنزیک و کالبدشکافی دیجیتال", icon: <IconHack /> },
//   { id: "crypto-blockchain-tracing", label: "ردیابی رمزارز و تحلیل بلاک‌چین", icon: <IconCrypto /> },
//   { id: "hidden-identity", label: "هویت‌سنجی پنهان", icon: <IconShieldCheck darkMode={false} /> },
//   { id: "consulting", label: "مشاوره", icon: <IconShieldCheck darkMode={false} /> },
// ];

// /* ────────────────────────────────
//    FORM
// ──────────────────────────────── */

// type CrisisReportFormValues = {
//   incidentType: string;
//   description: string;
//   contact: string;
// };

// const HelperText = ({ message }: { message?: string }) => {
//   if (!message) return null;

//   return (
//     <p
//       className="helperText"
//       style={{
//         color: "#EF4444",
//         fontSize: "0.82rem",
//         marginTop: 7,
//         fontFamily: "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",
//       }}
//     >
//       {message}
//     </p>
//   );
// };

// /* ────────────────────────────────
//    LAST INCIDENT TYPE
// ──────────────────────────────── */

// const LAST_INCIDENT_TYPE_COOKIE = "parahoor_last_incident_type";

// const VALID_INCIDENT_TYPES = [
//   "پایش دارک‌وب و هوش تهدیدات",
//   "تست نفوذِ پسا-بحران",
//   "مقابله و مذاکره با باج‌افزارها",
//   "فارنزیک و کالبدشکافی دیجیتال",
//   "ردیابی رمزارز و تحلیل بلاک‌چین",
//   "هویت‌سنجی پنهان",
//   "مشاوره",
// ] as const;

// const isValidIncidentType = (value: string) =>
//   VALID_INCIDENT_TYPES.includes(value as (typeof VALID_INCIDENT_TYPES)[number]);

// const getLastIncidentType = () => {
//   if (typeof document === "undefined") {
//     return "";
//   }

//   try {
//     const prefix = `${LAST_INCIDENT_TYPE_COOKIE}=`;

//     const cookie = document.cookie
//       .split(";")
//       .map((item) => item.trim())
//       .find((item) => item.startsWith(prefix));

//     if (!cookie) {
//       return "";
//     }

//     const value = cookie.substring(prefix.length);

//     const decodedValue = decodeURIComponent(value);

//     if (!isValidIncidentType(decodedValue)) {
//       return "";
//     }

//     return decodedValue;
//   } catch {
//     return "";
//   }
// };

// const saveLastIncidentType = (incidentType: string) => {
//   if (
//     typeof document === "undefined" ||
//     !isValidIncidentType(incidentType)
//   ) {
//     return;
//   }

//   try {
//     document.cookie =
//       `${LAST_INCIDENT_TYPE_COOKIE}=${encodeURIComponent(
//         incidentType
//       )}; path=/; max-age=31536000; SameSite=Lax`;
//   } catch {
//     // خطای Cookie نباید مانع ارسال گزارش شود.
//   }
// };

// /*
//  * کوکی جداگانه و یک‌بارمصرف: فقط وقتی نقطه ورودی خاصی
//  * (مثل باتن «رزرو زمان مشاوره») صراحتاً بخواد یک نوع حادثه
//  * مشخص را فعال کند استفاده می‌شود. اگر این کوکی موجود نباشد،
//  * رفتار قبلی (خواندن از LAST_INCIDENT_TYPE_COOKIE) بدون تغییر
//  * ادامه پیدا می‌کند.
//  */
// const FORCE_INCIDENT_TYPE_COOKIE = "parahoor_force_incident_type";

// const getForceIncidentType = () => {
//   if (typeof document === "undefined") {
//     return "";
//   }

//   try {
//     const prefix = `${FORCE_INCIDENT_TYPE_COOKIE}=`;

//     const cookie = document.cookie
//       .split(";")
//       .map((item) => item.trim())
//       .find((item) => item.startsWith(prefix));

//     if (!cookie) {
//       return "";
//     }

//     const value = cookie.substring(prefix.length);

//     const decodedValue = decodeURIComponent(value);

//     if (!isValidIncidentType(decodedValue)) {
//       return "";
//     }

//     return decodedValue;
//   } catch {
//     return "";
//   }
// };

// const clearForceIncidentType = () => {
//   if (typeof document === "undefined") {
//     return;
//   }

//   try {
//     document.cookie = `${FORCE_INCIDENT_TYPE_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
//   } catch {
//     // خطای Cookie نباید مانع باز شدن مدال شود.
//   }
// };

// /* ────────────────────────────────
//    MODAL
// ──────────────────────────────── */

// export const EmergencyModal = ({
//   onClose,
// }: {
//   onClose: () => void;
// }) => {
//   const { darkMode } = useTheme();

//   const [submitted, setSubmitted] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   const [trackingCode, setTrackingCode] = useState("");
//   const [focusDesc, setFocusDesc] = useState(false);
//   const [focusContact, setFocusContact] = useState(false);
//   const [copied, setCopied] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<CrisisReportFormValues>({
//     mode: "onChange",
//     defaultValues: {
//       incidentType: "",
//       description: "",
//       contact: "",
//     },
//   });

//   const selected = watch("incidentType");
//   const desc = watch("description");
//   const contact = watch("contact");

//   const primary = darkMode ? "#00E5FF" : "#2563EB";

//   /* ────────────────────────────────
//      LOAD LAST INCIDENT TYPE
//   ───────────────────────────────── */

//   useEffect(() => {
//     const forcedIncidentType = getForceIncidentType();

//     if (forcedIncidentType) {
//       setValue("incidentType", forcedIncidentType, {
//         shouldValidate: false,
//         shouldDirty: false,
//         shouldTouch: false,
//       });

//       clearForceIncidentType();
//       return;
//     }

//     const savedIncidentType = getLastIncidentType();

//     if (!savedIncidentType) {
//       return;
//     }

//     setValue("incidentType", savedIncidentType, {
//       shouldValidate: false,
//       shouldDirty: false,
//       shouldTouch: false,
//     });
//   }, [setValue]);

//   const onSubmit = async (data: CrisisReportFormValues) => {
//     setSubmitError("");

//     try {
//       const response = await fetch("/api/crisis-reports", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json().catch(() => null);

//       if (!response.ok) {
//         throw new Error(
//           result?.message || "ارسال گزارش ناموفق بود"
//         );
//       }

//       /*
//        * فقط بعد از ثبت موفق گزارش،
//        * نوع حادثه انتخاب‌شده ذخیره می‌شود.
//        */
//       saveLastIncidentType(data.incidentType);

//       setTrackingCode(result?.trackingCode || "");
//       setSubmitted(true);
//     } catch (error) {
//       setSubmitError(
//         error instanceof Error
//           ? error.message
//           : "خطایی هنگام ثبت گزارش رخ داد. لطفاً دوباره تلاش کنید."
//       );
//     }
//   };

//   /* ────────────────────────────────
//      SUCCESS STATE — تمام‌صفحه
//      (نه مدال، نه دراور — کل ویوپورت رو می‌گیره)
//   ───────────────────────────────── */

//   if (submitted) {
//     const timelineSteps = [
//       { icon: <IconTimelineCheck />, label: "دریافت گزارش", done: true },
//       { icon: <IconLock />, label: "رمزگذاری پرونده", done: true },
//       {
//         icon: <IconTimelineClock />,
//         label: "بررسی اولیه کارآگاهان",
//         done: false,
//         active: true,
//       },
//       { icon: <IconTimelineArrow />, label: "تماس امن", done: false },
//     ];

//     return (
//       <div
//         className="fixed inset-0 z-50 overflow-y-auto"
//         style={{
//           background: darkMode ? "#0A1128" : "#F8FAFC",
//           color: darkMode ? "#E2E8F0" : "#1E293B",
//           fontFamily: "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",
//         }}
//       >
//         <style>{`
//           @keyframes pulse-ring-success {
//             0%, 100% { opacity: 1; }
//             50% { opacity: 0.5; }
//           }
//           @keyframes spin-slow-success {
//             from { transform: rotate(0deg); }
//             to { transform: rotate(360deg); }
//           }
//           @keyframes particle-fade-success {
//             0% { opacity: 0; transform: translate(0,0) scale(0); }
//             20% { opacity: 1; transform: translate(var(--tx,0),var(--ty,0)) scale(1); }
//             100% { opacity: 0; transform: translate(var(--tx,0),var(--ty,0)) scale(0.4); }
//           }
//           @keyframes slide-up-success {
//             from { opacity: 0; transform: translateY(22px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//           @keyframes fade-in-success {
//             from { opacity: 0; }
//             to { opacity: 1; }
//           }
//         `}</style>

//         {/* بک‌گراند گرید + گلو */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: darkMode
//                 ? "linear-gradient(rgba(0,229,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.025) 1px,transparent 1px)"
//                 : "linear-gradient(rgba(37,99,235,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.035) 1px,transparent 1px)",
//               backgroundSize: "56px 56px",
//             }}
//           />
//           <div
//             className="absolute inset-0"
//             style={{
//               background: darkMode
//                 ? "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(0,229,255,0.06) 0%, transparent 60%)"
//                 : "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(37,99,235,0.05) 0%, transparent 60%)",
//             }}
//           />
//         </div>



//         {/* محتوای اصلی */}
//         <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-12 md:py-16 mt-5">
//           <div
//             className="relative mb-8"
//             style={{ animation: "fade-in-success 0.6s ease both" }}
//           >
//             <SuccessShield primary={primary} />
//           </div>

//           <div
//             className="mb-5"
//             style={{ animation: "fade-in-success 0.5s ease 0.2s both" }}
//           >
//             <span
//               className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs"
//               style={{
//                 background: "rgba(16,185,129,0.1)",
//                 border: "1px solid rgba(16,185,129,0.28)",
//                 color: "#10B981",
//               }}
//             >
//               <span
//                 style={{
//                   width: 5,
//                   height: 5,
//                   borderRadius: "50%",
//                   background: "#10B981",
//                   boxShadow: "0 0 6px rgba(16,185,129,0.9)",
//                   display: "inline-block",
//                 }}
//               />
//               <span
//                 style={{
//                   fontFamily: "monospace",
//                   fontSize: "0.6rem",
//                   letterSpacing: "0.18em",
//                 }}
//               >
//                 REPORT SECURED // STATUS: RECEIVED
//               </span>
//             </span>
//           </div>

//           <h1
//             className="text-center font-black mb-4"
//             style={{
//               fontSize: "clamp(1.5rem,3.5vw,2.4rem)",
//               color: darkMode ? "#fff" : "#111827",
//               lineHeight: 1.45,
//               maxWidth: 640,
//               animation:
//                 "slide-up-success 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both",
//             }}
//           >
//            پرونده شما در محیطی کاملاً امن ثبت شد.

//           </h1>

//           <p
//             className="text-center mb-8"
//             style={{
//               color: darkMode ? "#94A3B8" : "#475569",
//               fontSize: "clamp(0.92rem,1.8vw,1.06rem)",
//               lineHeight: 2,
//               maxWidth: 580,
//               animation:
//                 "slide-up-success 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both",
//             }}
//           >
//             کارآگاهان ارشد پاراهور گزارش شما را دریافت کردند و اطلاعات
//             اولیه تحت بالاترین سطح رمزنگاری ذخیره شد. تا ساعاتی دیگر برای
//             هماهنگی و امکان‌سنجی از طریق مسیر امن با شما تماس خواهند
//             گرفت.
//           </p>

//           {/* کد پیگیری */}
//           <div
//             className="mb-10"
//             style={{ animation: "fade-in-success 0.5s ease 0.35s both" }}
//           >
//             <div
//               className="flex items-center gap-3 px-5 py-3 rounded-xl flex-wrap justify-center"
//               style={{
//                 background: darkMode ? "rgba(6,11,28,0.85)" : "#FFFFFF",
//                 border: darkMode
//                   ? "1px solid rgba(0,229,255,0.14)"
//                   : "1px solid rgba(37,99,235,0.14)",
//                 backdropFilter: "blur(12px)",
//                 boxShadow: darkMode
//                   ? "none"
//                   : "0 8px 24px rgba(37,99,235,0.06)",
//               }}
//             >
//               <span
//                 style={{
//                   color: darkMode ? "#334155" : "#64748B",
//                   fontFamily: "monospace",
//                   fontSize: "0.7rem",
//                   letterSpacing: "0.1em",
//                 }}
//               >
//                 کد پیگیری گزارش:
//               </span>

//               <span
//                 style={{
//                   color: primary,
//                   fontFamily: "monospace",
//                   fontWeight: 600,
//                   fontSize: "0.85rem",
//                   letterSpacing: "0.12em",
//                   direction: "ltr",
//                   unicodeBidi: "isolate",
//                 }}
//               >
//                 {trackingCode || "PENDING"}
//               </span>

//               <button
//                 type="button"
//                 onClick={async () => {
//                   if (!trackingCode) return;
//                   try {
//                     await navigator.clipboard.writeText(trackingCode);
//                     setCopied(true);
//                     setTimeout(() => setCopied(false), 2000);
//                   } catch {
//                     setCopied(false);
//                   }
//                 }}
//                 disabled={!trackingCode}
//                 className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all"
//                 style={{
//                   background: copied
//                     ? "rgba(16,185,129,0.12)"
//                     : darkMode
//                       ? "rgba(0,229,255,0.06)"
//                       : "rgba(37,99,235,0.06)",
//                   border: copied
//                     ? "1px solid rgba(16,185,129,0.3)"
//                     : darkMode
//                       ? "1px solid rgba(0,229,255,0.15)"
//                       : "1px solid rgba(37,99,235,0.15)",
//                   color: copied ? "#10B981" : primary,
//                   fontFamily: "monospace",
//                   cursor: trackingCode ? "pointer" : "default",
//                 }}
//               >
//                 {copied ? "✓ کپی شد" : "کپی"}
//               </button>
//             </div>
//           </div>

//           {/* تایم‌لاین روند */}
//           <div
//             className="w-full max-w-2xl mb-10"
//             style={{ animation: "fade-in-success 0.5s ease 0.4s both" }}
//           >
//             <div className="flex items-start justify-center gap-0">
//               {timelineSteps.map((step, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center"
//                   style={{ flex: i < timelineSteps.length - 1 ? "1" : "0" }}
//                 >
//                   <div className="flex flex-col items-center gap-2">
//                     <div
//                       className="flex items-center justify-center w-9 h-9 rounded-full transition-all"
//                       style={{
//                         background: step.done
//                           ? "rgba(16,185,129,0.12)"
//                           : step.active
//                             ? darkMode
//                               ? "rgba(0,229,255,0.1)"
//                               : "rgba(37,99,235,0.1)"
//                             : darkMode
//                               ? "rgba(255,255,255,0.03)"
//                               : "#F1F5F9",
//                         border: step.done
//                           ? "1.5px solid rgba(16,185,129,0.45)"
//                           : step.active
//                             ? `1.5px solid ${primary}73`
//                             : darkMode
//                               ? "1px solid rgba(255,255,255,0.07)"
//                               : "1px solid rgba(37,99,235,0.10)",
//                         color: step.done
//                           ? "#10B981"
//                           : step.active
//                             ? primary
//                             : "#94A3B8",
//                         boxShadow: step.active
//                           ? `0 0 14px ${primary}26`
//                           : "none",
//                       }}
//                     >
//                       {step.icon}
//                     </div>
//                     <span
//                       style={{
//                         fontSize: "0.62rem",
//                         color: step.done
//                           ? "#10B981"
//                           : step.active
//                             ? primary
//                             : "#94A3B8",
//                         fontFamily: "monospace",
//                         letterSpacing: "0.05em",
//                         textAlign: "center",
//                         width: 70,
//                       }}
//                     >
//                       {step.label}
//                     </span>
//                   </div>
//                   {i < timelineSteps.length - 1 && (
//                     <div
//                       style={{
//                         flex: 1,
//                         height: 1,
//                         margin: "0 4px",
//                         marginBottom: 22,
//                         background:
//                           i < 2
//                             ? "linear-gradient(90deg,rgba(16,185,129,0.4),rgba(0,229,255,0.2))"
//                             : darkMode
//                               ? "rgba(255,255,255,0.05)"
//                               : "rgba(37,99,235,0.08)",
//                       }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* اقدامات ضروری */}
//           <div
//             className="w-full max-w-2xl mb-10"
//             style={{
//               animation:
//                 "slide-up-success 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s both",
//             }}
//           >
//             <div
//               className="rounded-2xl overflow-hidden"
//               style={{
//                 background: darkMode ? "rgba(6,11,28,0.88)" : "#FFFFFF",
//                 border: darkMode
//                   ? "1px solid rgba(0,229,255,0.13)"
//                   : "1px solid rgba(37,99,235,0.12)",
//                 boxShadow: darkMode
//                   ? "0 24px 64px rgba(0,0,0,0.4)"
//                   : "0 20px 50px rgba(37,99,235,0.07)",
//               }}
//             >
//               <div
//                 style={{
//                   height: 2,
//                   background:
//                     "linear-gradient(90deg, rgba(16,185,129,0.6), rgba(0,229,255,0.4), transparent)",
//                 }}
//               />

//               <div className="px-7 py-6 md:px-8 md:py-7">
//                 <div className="flex items-center gap-3 mb-5">
//                   <div
//                     className="flex items-center justify-center w-8 h-8 rounded-lg"
//                     style={{
//                       background: "rgba(239,68,68,0.08)",
//                       border: "1px solid rgba(239,68,68,0.22)",
//                       color: "#EF4444",
//                     }}
//                   >
//                     <IconTimelineWarn />
//                   </div>
//                   <h3
//                     className="font-bold text-base"
//                     style={{ color: darkMode ? "#fff" : "#111827" }}
//                   >
//                     اقدامات ضروری تا زمان تماس ما:
//                   </h3>
//                 </div>

//                 <div className="space-y-4">
//                   {[
//                     {
//                       text: "خود را با فرد مشکوک یا کلاهبردار قطع نکنید",
//                       icon: "🚫",
//                       note: "ارتباط را در حد معمول حفظ کرده و از هرگونه اقدام یا واکنش غیرعادی پرهیز کنید.",
//                     },
//                     {
//                       text: "تمامی ادله و مستندات دیجیتال را حفظ و از حذف یا تغییر آن‌ها خودداری کنید.",
//                       icon: "💾",
//                       note: "این مستندات مهم‌ترین شواهد پرونده شما هستند.",
//                     },
//                     {
//                       text: " از تکمیل مجدد فرم گزارش حادثه یا برقراری تماس‌های مکرر با بخش ویژه بحران خودداری کنید. ",
//                       icon: "🔒",
//                       note: "چرا که این امر ممکن است روند بررسی و پیگیری پرونده را مختل کند.",
//                     },
//                   ].map(({ text, icon, note }, i) => (
//                     <div
//                       key={i}
//                       className="flex items-start items-center gap-4 p-4 rounded-xl"
//                       style={{
//                         background: darkMode
//                           ? "rgba(255,255,255,0.02)"
//                           : "#F8FAFC",
//                         border: darkMode
//                           ? "1px solid rgba(255,255,255,0.04)"
//                           : "1px solid rgba(37,99,235,0.06)",
//                       }}
//                     >
//                       <div>
//                       <span
//                         style={{
//                           fontSize: "1.1rem",
//                           lineHeight: 1,
//                           flexShrink: 0,
//                           marginTop: 1,
//                         }}
//                       >
//                         {icon}
//                       </span>
//                       </div>
//                       <div>
//                         <p
//                           style={{
//                             color: darkMode ? "#E2E8F0" : "#1E293B",
//                             fontSize: "0.9rem",
//                             lineHeight: 1.7,
//                             marginBottom: 3,
//                           }}
//                         >
//                           {text}
//                         </p>
//                         <p
//                           style={{
//                             color: darkMode ? "#64748B" : "#94A3B8",
//                             fontSize: "0.74rem",
//                             lineHeight: 1.6,
//                           }}
//                         >
//                           {note}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div
//                   className="flex items-center gap-2.5 mt-5 pt-5"
//                   style={{
//                     borderTop: darkMode
//                       ? "1px solid rgba(0,229,255,0.07)"
//                       : "1px solid rgba(37,99,235,0.08)",
//                   }}
//                 >
//                   <div
//                     className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
//                     style={{
//                       background: darkMode
//                         ? "rgba(0,229,255,0.07)"
//                         : "rgba(37,99,235,0.07)",
//                       border: darkMode
//                         ? "1px solid rgba(0,229,255,0.18)"
//                         : "1px solid rgba(37,99,235,0.16)",
//                       color: primary,
//                     }}
//                   >
//                     <IconTimelineClock />
//                   </div>
//                   <p
//                     style={{
//                       color: darkMode ? "#64748B" : "#64748B",
//                       fontSize: "0.78rem",
//                       lineHeight: 1.6,
//                     }}
//                   >
//                     زمان پاسخ‌دهی معمول:{" "}
//                     <span style={{ color: primary, fontWeight: 600 }}>
//                       کمتر از ۲ ساعت در ساعات کاری
//                     </span>{" "}
//                     — برای بحران‌های فعال، پاسخ شبانه‌روزی در نظر گرفته
//                     می‌شود.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* نوار اطمینان امنیتی */}
//           <div
//             className="w-full max-w-2xl mb-10"
//             style={{ animation: "fade-in-success 0.5s ease 0.5s both" }}
//           >
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//               {[
//                 {
//                   icon: <IconLock />,
//                   label: "رمزنگاری انتها-به-انتها",
//                   sub: "پروتکل AES-256",
//                 },
//                 {
//                   icon: <IconShieldCheck darkMode={darkMode} />,
//                   label: "عدم افشای اطلاعات",
//                   sub: "محرمانه‌بودن مطلق",
//                 },
//                 {
//                   icon: <IconTimelineCheck />,
//                   label: "ذخیره‌سازی آفلاین",
//                   sub: "سرورهای ایزوله",
//                 },
//               ].map(({ icon, label, sub }, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-3 px-4 py-3 rounded-xl"
//                   style={{
//                     background: darkMode ? "rgba(6,11,28,0.7)" : "#FFFFFF",
//                     border: darkMode
//                       ? "1px solid rgba(0,229,255,0.08)"
//                       : "1px solid rgba(37,99,235,0.09)",
//                   }}
//                 >
//                   <span
//                     style={{
//                       color: darkMode
//                         ? "rgba(0,229,255,0.5)"
//                         : "rgba(37,99,235,0.55)",
//                       flexShrink: 0,
//                       display: "flex",
//                     }}
//                   >
//                     {icon}
//                   </span>
//                   <div>
//                     <p
//                       style={{
//                         color: darkMode ? "#E2E8F0" : "#1E293B",
//                         fontSize: "0.78rem",
//                         fontWeight: 600,
//                       }}
//                     >
//                       {label}
//                     </p>
//                     <p
//                       style={{
//                         color: darkMode ? "#475569" : "#94A3B8",
//                         fontSize: "0.66rem",
//                         fontFamily: "monospace",
//                       }}
//                     >
//                       {sub}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* دکمه‌های اقدام */}
//           <div
//             className="flex flex-col sm:flex-row items-center gap-4 mb-4"
//             style={{ animation: "fade-in-success 0.5s ease 0.6s both" }}
//           >
//             <button
//               type="button"
//               onClick={onClose}
//               className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300"
//               style={{
//                 background: primary,
//                 color: darkMode ? "#0A1128" : "#fff",
//                 boxShadow: `0 0 24px ${primary}4d`,
//                 fontSize: "0.95rem",
//                 transform: "none",
//               }}
//               onMouseEnter={(e) => {
//                 (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${primary}80, 0 0 90px ${primary}40`;
//                 (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
//               }}
//               onMouseLeave={(e) => {
//                 (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${primary}4d`;
//                 (e.currentTarget as HTMLElement).style.transform = "none";
//               }}
//             >
//               <IconTimelineHome />
//               بازگشت به پایگاه اصلی
//             </button>

//             <Link
//               href="/blogs?category=solved-cases&page=1"
//               className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300"
//               style={{
//                 background: "transparent",
//                 color: primary,
//                 border: `1px solid ${primary}61`,
//                 boxShadow: "none",
//                 fontSize: "0.95rem",
//                 transform: "none",
//               }}
//               onMouseEnter={(e) => {
//                 (e.currentTarget as HTMLElement).style.background = `${primary}1f`;
//                 (e.currentTarget as HTMLElement).style.borderColor = primary;
//                 (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${primary}4d, inset 0 0 24px ${primary}1a`;
//                 (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
//               }}
//               onMouseLeave={(e) => {
//                 (e.currentTarget as HTMLElement).style.background = "transparent";
//                 (e.currentTarget as HTMLElement).style.borderColor = `${primary}61`;
//                 (e.currentTarget as HTMLElement).style.boxShadow = "none";
//                 (e.currentTarget as HTMLElement).style.transform = "none";
//               }}
//             >
//               <IconTimelineBook />
//               مطالعه پرونده‌های حل‌شده
//             </Link>
//           </div>

//           <div
//             className="mt-6 px-5 py-2.5 rounded-xl"
//             style={{
//               animation: "fade-in-success 0.5s ease 0.7s both",
//               background: darkMode ? "rgba(6,11,28,0.7)" : "#FFFFFF",
//               border: darkMode
//                 ? "1px solid rgba(0,229,255,0.07)"
//                 : "1px solid rgba(37,99,235,0.08)",
//               fontFamily: "monospace",
//               fontSize: "0.65rem",
//               color: darkMode ? "#334155" : "#94A3B8",
//             }}
//           >
//             <span style={{ color: "rgba(16,185,129,0.6)" }}>✓</span>{" "}
//             <span
//               style={{
//                 color: darkMode
//                   ? "rgba(0,229,255,0.4)"
//                   : "rgba(37,99,235,0.5)",
//               }}
//             >
//               parahoor.io
//             </span>{" "}
//             report submitted —{" "}
//             <span style={{ color: "rgba(16,185,129,0.5)" }}>encrypted</span>{" "}
//             // ref:{" "}
//             <span
//               style={{
//                 color: darkMode
//                   ? "rgba(0,229,255,0.35)"
//                   : "rgba(37,99,235,0.4)",
//               }}
//             >
//               {trackingCode || "PENDING"}
//             </span>{" "}
//             // agents:{" "}
//             <span
//               style={{
//                 color: darkMode
//                   ? "rgba(0,229,255,0.35)"
//                   : "rgba(37,99,235,0.4)",
//               }}
//             >
//               standby
//             </span>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   /* ────────────────────────────────
//      FORM STATE
//   ───────────────────────────────── */

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       style={{
//         background: darkMode
//           ? "rgba(4,8,20,0.88)"
//           : "rgba(15,23,42,0.32)",
//         backdropFilter: "blur(20px)",
//         WebkitBackdropFilter: "blur(20px)",
//       }}
//       onClick={(e) =>
//         e.target === e.currentTarget &&
//         !isSubmitting &&
//         onClose()
//       }
//     >
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div
//           className="relative w-full max-w-lg overflow-hidden"
//           style={{
//             background: darkMode
//               ? "linear-gradient(160deg, rgba(10,17,42,0.99) 0%, rgba(6,11,28,0.99) 100%)"
//               : "linear-gradient(160deg, #FFFFFF 0%, #F8FAFC 100%)",

//             border: darkMode
//               ? "1px solid rgba(0,229,255,0.18)"
//               : "1px solid rgba(37,99,235,0.16)",

//             borderRadius: 20,

//             boxShadow: darkMode
//               ? "0 0 80px rgba(0,229,255,0.07), 0 0 160px rgba(0,229,255,0.03), 0 40px 100px rgba(0,0,0,0.7)"
//               : "0 20px 70px rgba(37,99,235,0.10), 0 30px 80px rgba(15,23,42,0.12)",

//             maxHeight: "calc(100vh - 32px)",
//             overflowY: "auto",
//           }}
//         >
//           {/* Top cyan / blue accent line */}
//           <div
//             style={{
//               height: 2,
//               background: darkMode
//                 ? "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.6) 30%, rgba(0,229,255,0.9) 50%, rgba(0,229,255,0.6) 70%, transparent 100%)"
//                 : "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.45) 30%, rgba(37,99,235,0.8) 50%, rgba(37,99,235,0.45) 70%, transparent 100%)",
//             }}
//           />

//           {/* Corner accents */}
//           <div
//             style={{
//               position: "absolute",
//               top: 2,
//               right: 0,
//               width: 56,
//               height: 56,
//               borderTop: darkMode
//                 ? "1px solid rgba(0,229,255,0.25)"
//                 : "1px solid rgba(37,99,235,0.18)",
//               borderRight: darkMode
//                 ? "1px solid rgba(0,229,255,0.25)"
//                 : "1px solid rgba(37,99,235,0.18)",
//               borderRadius: "0 20px 0 0",
//               pointerEvents: "none",
//             }}
//           />

//           <div
//             style={{
//               position: "absolute",
//               bottom: 0,
//               left: 0,
//               width: 56,
//               height: 56,
//               borderBottom: darkMode
//                 ? "1px solid rgba(0,229,255,0.15)"
//                 : "1px solid rgba(37,99,235,0.12)",
//               borderLeft: darkMode
//                 ? "1px solid rgba(0,229,255,0.15)"
//                 : "1px solid rgba(37,99,235,0.12)",
//               borderRadius: "0 0 0 20px",
//               pointerEvents: "none",
//             }}
//           />

//           {/* ── HEADER ── */}
//           <div
//             className="flex items-start justify-between px-6 pt-6 pb-5"
//             style={{
//               borderBottom: darkMode
//                 ? "1px solid rgba(255,255,255,0.04)"
//                 : "1px solid rgba(37,99,235,0.07)",
//             }}
//           >
//             <div className="flex-1 pl-4">
//               {/* Status tag */}
//               <div className="flex items-center gap-2 mb-2.5">
//                 <span
//                   style={{
//                     width: 6,
//                     height: 6,
//                     borderRadius: "50%",
//                     background: "#EF4444",
//                     display: "inline-block",
//                     boxShadow:
//                       "0 0 6px rgba(239,68,68,0.9)",
//                     animation: "pulse-cyan 1.5s infinite",
//                   }}
//                 />

//                 <span
//                   style={{
//                     fontFamily: "monospace",
//                     fontSize: "0.6rem",
//                     color: "rgba(239,68,68,0.7)",
//                     letterSpacing: "0.18em",
//                   }}
//                 >
//                   CRISIS CHANNEL // ENCRYPTED
//                 </span>
//               </div>

//               {/* Title */}
//               <h2
//                 className="font-black"
//                 style={{
//                   color: darkMode ? "#fff" : "#111827",
//                   fontSize: "1.15rem",
//                   lineHeight: 1.3,
//                 }}
//               >
//                 فرم اورژانسی گزارش بحران
//               </h2>
//             </div>

//             {/* Close button */}
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl transition-all"
//               style={{
//                 color: darkMode ? "#334155" : "#64748B",
//                 background: darkMode
//                   ? "rgba(255,255,255,0.04)"
//                   : "#F8FAFC",
//                 border: darkMode
//                   ? "1px solid rgba(255,255,255,0.06)"
//                   : "1px solid rgba(37,99,235,0.10)",
//               }}
//               onMouseEnter={(e) => {
//                 (e.currentTarget as HTMLElement).style.color =
//                   darkMode ? "#94A3B8" : "#2563EB";

//                 (e.currentTarget as HTMLElement).style.borderColor =
//                   darkMode
//                     ? "rgba(255,255,255,0.12)"
//                     : "rgba(37,99,235,0.22)";
//               }}
//               onMouseLeave={(e) => {
//                 (e.currentTarget as HTMLElement).style.color =
//                   darkMode ? "#334155" : "#64748B";

//                 (e.currentTarget as HTMLElement).style.borderColor =
//                   darkMode
//                     ? "rgba(255,255,255,0.06)"
//                     : "rgba(37,99,235,0.10)";
//               }}
//               aria-label="بستن"
//             >
//               <IconClose />
//             </button>
//           </div>

//           {/* ── TRUST MICROCOPY ── */}
//           <div
//             className="mx-6 mt-4 mb-1 px-4 py-3 rounded-xl flex items-start gap-3"
//             style={{
//               background: darkMode
//                 ? "rgba(0,229,255,0.04)"
//                 : "rgba(37,99,235,0.045)",
//               border: darkMode
//                 ? "1px solid rgba(0,229,255,0.1)"
//                 : "1px solid rgba(37,99,235,0.10)",
//             }}
//           >
//             <div className="flex-shrink-0 mt-0.5">
//               <IconShieldCheck darkMode={darkMode} />
//             </div>

//             <p
//               style={{
//                 color: darkMode ? "#475569" : "#475569",
//                 fontSize: "0.78rem",
//                 lineHeight: 1.75,
//               }}
//             >
//               اطلاعات شما با بالاترین سطح رمزنگاری مستقیماً برای
//               کارآگاهان ارشد پاراهور ارسال می‌شود.
//             </p>
//           </div>

//           {/* ── FORM BODY ── */}
//           <div className="px-6 py-5 space-y-6">
//             {/* FIELD 1 – Incident Type Chips */}
//             <div>
//               <label
//                 className="block font-semibold mb-3"
//                 style={{
//                   color: darkMode ? "#E2E8F0" : "#1E293B",
//                   fontSize: "0.83rem",
//                 }}
//               >
//                 <span
//                   style={{
//                     color: primary,
//                     fontFamily: "monospace",
//                     marginLeft: 6,
//                   }}
//                 >
//                   ۱.
//                 </span>
//                 نوع حادثه را مشخص کنید:
//               </label>

//               <input
//                 type="hidden"
//                 {...register("incidentType", {
//                   required: "نوع حادثه را انتخاب کنید",
//                 })}
//               />

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {chips.map(({ id, label, icon }) => {
//                   const isActive = selected === label;

//                   return (
//                     <button
//                       key={id}
//                       type="button"
//                       onClick={() =>
//                         setValue(
//                           "incidentType",
//                           isActive ? "" : label,
//                           {
//                             shouldValidate: true,
//                             shouldDirty: true,
//                             shouldTouch: true,
//                           }
//                         )
//                       }
//                       className="w-full min-h-[52px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-medium text-[11px] leading-5 text-center transition-all"
//                       style={{
//                         background: isActive
//                           ? darkMode
//                             ? "rgba(0,229,255,0.1)"
//                             : "rgba(37,99,235,0.08)"
//                           : darkMode
//                             ? "rgba(255,255,255,0.03)"
//                             : "#F8FAFC",

//                         border: isActive
//                           ? darkMode
//                             ? "1px solid rgba(0,229,255,0.45)"
//                             : "1px solid rgba(37,99,235,0.38)"
//                           : darkMode
//                             ? "1px solid rgba(255,255,255,0.07)"
//                             : "1px solid rgba(37,99,235,0.10)",

//                         color: isActive
//                           ? primary
//                           : darkMode
//                             ? "#475569"
//                             : "#475569",

//                         boxShadow: isActive
//                           ? darkMode
//                             ? "0 0 20px rgba(0,229,255,0.08), inset 0 0 20px rgba(0,229,255,0.04)"
//                             : "0 4px 16px rgba(37,99,235,0.08), inset 0 0 16px rgba(37,99,235,0.025)"
//                           : "none",

//                         transform: isActive
//                           ? "translateY(-1px)"
//                           : "none",

//                         fontFamily:
//                           "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",
//                       }}
//                     >


//                       <span
//                         style={{
//                           minWidth: 0,
//                           flex: 1,
//                           textAlign: "center",
//                           whiteSpace: "normal",
//                           overflowWrap: "anywhere",
//                         }}
//                       >
//                         {label}
//                       </span>

//                       {isActive && (
//                         <span
//                           style={{
//                             width: 6,
//                             height: 6,
//                             borderRadius: "50%",
//                             background: primary,
//                             display: "inline-block",
//                             boxShadow: darkMode
//                               ? "0 0 6px rgba(0,229,255,0.8)"
//                               : "0 0 6px rgba(37,99,235,0.35)",
//                             marginRight: 2,
//                           }}
//                         />
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>

//               <HelperText
//                 message={errors.incidentType?.message}
//               />
//             </div>

//             {/* Divider */}
//             <div
//               style={{
//                 height: 1,
//                 background: darkMode
//                   ? "linear-gradient(90deg, transparent, rgba(0,229,255,0.08), transparent)"
//                   : "linear-gradient(90deg, transparent, rgba(37,99,235,0.08), transparent)",
//               }}
//             />

//             {/* FIELD 2 – Description */}
//             <div>
//               <label
//                 className="flex items-center gap-1.5 font-semibold mb-2.5"
//                 style={{
//                   color: darkMode ? "#E2E8F0" : "#1E293B",
//                   fontSize: "0.83rem",
//                 }}
//               >
//                 <span
//                   style={{
//                     color: primary,
//                     fontFamily: "monospace",
//                   }}
//                 >
//                   ۲.
//                 </span>

//                 شرح مختصری از مشکل

//                 <span
//                   style={{
//                     color: darkMode ? "#65696e" : "#64748B",
//                     fontWeight: 400,
//                     fontSize: "0.82rem",
//                   }}
//                 >
//                   (اختیاری)
//                 </span>
//               </label>

//               <div className="relative">
//                 <textarea
//                   rows={3}
//                   {...register("description", {
//                     maxLength: {
//                       value: 2000,
//                       message:
//                         "شرح مشکل نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد",
//                     },
//                   })}
//                   onFocus={() => setFocusDesc(true)}
//                   onBlur={() => setFocusDesc(false)}
//                   placeholder="مثال: کیف پول تراست‌ولت من هک شده و تترها به سرقت رفته..."
//                   className="w-full px-4 pt-3.5 pb-3 rounded-xl text-[13px] outline-none resize-none transition-all"
//                   style={{
//                     background: darkMode
//                       ? "#060B19"
//                       : "#FFFFFF",

//                     border: focusDesc
//                       ? darkMode
//                         ? "1px solid rgba(0,229,255,0.4)"
//                         : "1px solid rgba(37,99,235,0.4)"
//                       : darkMode
//                         ? "1px solid rgba(255,255,255,0.06)"
//                         : "1px solid rgba(37,99,235,0.14)",

//                     color: darkMode ? "#b8bfc8" : "#1E293B",

//                     fontFamily:
//                       "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",

//                     lineHeight: 1.8,

//                     boxShadow: focusDesc
//                       ? darkMode
//                         ? "0 0 0 3px rgba(0,229,255,0.06), inset 0 0 20px rgba(0,229,255,0.02)"
//                         : "0 0 0 3px rgba(37,99,235,0.06), inset 0 0 20px rgba(37,99,235,0.02)"
//                       : "none",

//                     caretColor: primary,
//                   }}
//                 />

//                 {desc.length > 0 && (
//                   <span
//                     className="absolute"
//                     style={{
//                       bottom: 10,
//                       left: 12,
//                       fontSize: "0.65rem",
//                       fontFamily: "monospace",
//                       color: darkMode
//                         ? "rgba(0,229,255,0.3)"
//                         : "rgba(37,99,235,0.4)",
//                     }}
//                   >
//                     {desc.length} کاراکتر
//                   </span>
//                 )}
//               </div>

//               <HelperText
//                 message={errors.description?.message}
//               />
//             </div>

//             {/* Divider */}
//             <div
//               style={{
//                 height: 1,
//                 background: darkMode
//                   ? "linear-gradient(90deg, transparent, rgba(0,229,255,0.08), transparent)"
//                   : "linear-gradient(90deg, transparent, rgba(37,99,235,0.08), transparent)",
//               }}
//             />

//             {/* FIELD 3 – Contact Info */}
//             <div>
//               <label
//                 className="flex items-center gap-1.5 font-semibold mb-2.5"
//                 style={{
//                   color: darkMode ? "#E2E8F0" : "#1E293B",
//                   fontSize: "0.83rem",
//                 }}
//               >
//                 <span
//                   style={{
//                     color: primary,
//                     fontFamily: "monospace",
//                   }}
//                 >
//                   ۳.
//                 </span>

//                 شماره تماس یا آیدی تلگرام

//                 <span
//                   style={{
//                     color: "rgba(239,68,68,0.6)",
//                     fontWeight: 400,
//                     fontSize: "0.72rem",
//                   }}
//                 >
//                   (جهت تماس فوری)
//                 </span>
//               </label>

//               <div className="relative">
//                 <input
//                   type="text"
//                   {...register("contact", {
//                     required:
//                       "شماره تماس یا آیدی تلگرام الزامی است",
//                     maxLength: {
//                       value: 100,
//                       message:
//                         "اطلاعات تماس بیش از حد طولانی است",
//                     },
//                   })}
//                   onFocus={() => setFocusContact(true)}
//                   onBlur={() => setFocusContact(false)}
//                   placeholder="شماره موبایل یا @ID"
//                   className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
//                   style={{
//                     background: darkMode
//                       ? "#060B19"
//                       : "#FFFFFF",

//                     border: focusContact
//                       ? darkMode
//                         ? "1px solid rgba(0,229,255,0.4)"
//                         : "1px solid rgba(37,99,235,0.4)"
//                       : contact.trim()
//                         ? darkMode
//                           ? "1px solid rgba(0,229,255,0.2)"
//                           : "1px solid rgba(37,99,235,0.20)"
//                         : darkMode
//                           ? "1px solid rgba(255,255,255,0.06)"
//                           : "1px solid rgba(37,99,235,0.14)",

//                     color: darkMode ? "#E2E8F0" : "#1E293B",

//                     fontFamily:
//                       "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",

//                     boxShadow: focusContact
//                       ? darkMode
//                         ? "0 0 0 3px rgba(0,229,255,0.06), inset 0 0 20px rgba(0,229,255,0.02)"
//                         : "0 0 0 3px rgba(37,99,235,0.06), inset 0 0 20px rgba(37,99,235,0.02)"
//                       : "none",

//                     caretColor: primary,
//                   }}
//                 />

//                 {/* Validation icon */}
//                 {contact.trim() && (
//                   <div
//                     className="absolute flex items-center justify-center"
//                     style={{
//                       left: 12,
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       width: 20,
//                       height: 20,
//                       borderRadius: "50%",
//                       background: darkMode
//                         ? "rgba(0,229,255,0.12)"
//                         : "rgba(37,99,235,0.10)",
//                     }}
//                   >
//                     <svg
//                       width="10"
//                       height="10"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke={primary}
//                       strokeWidth="3"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <polyline points="20 6 9 17 4 12" />
//                     </svg>
//                   </div>
//                 )}
//               </div>

//               <HelperText
//                 message={errors.contact?.message}
//               />

//               <p
//                 style={{
//                   color: darkMode ? "#65696e" : "#64748B",
//                   fontSize: "0.72rem",
//                   marginTop: 7,
//                   lineHeight: 1.6,
//                 }}
//               >
//                 اطلاعات تماس شما هرگز با اشخاص ثالث به اشتراک
//                 گذاشته نمی‌شود.
//               </p>
//             </div>

//             {/* ── SECURITY NOTICE ── */}
//             <div className="flex items-center justify-between pt-1">
//               {/* reCAPTCHA badge */}
//               <div className="flex items-center gap-1.5">
//                 <IconRecaptcha darkMode={darkMode} />

//                 <span
//                   style={{
//                     color: darkMode ? "#3a4454" : "#64748B",
//                     fontSize: "0.70rem",
//                     lineHeight: 1.5,
//                   }}
//                 >
//                   محافظت شده توسط کپچای نامرئی
//                   <br />
//                   <span
//                     style={{
//                       color: darkMode ? "#3a4454" : "#64748B",
//                     }}
//                   >
//                     (Invisible reCAPTCHA)
//                   </span>
//                 </span>
//               </div>

//               {/* End-to-end indicator */}
//               <div className="flex items-center gap-1.5">
//                 <IconLock />

//                 <span
//                   style={{
//                     color: darkMode ? "#3a4454" : "#64748B",
//                     fontSize: "0.70rem",
//                   }}
//                 >
//                   رمزگذاری سرتاسری
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* ── FOOTER / SUBMIT ── */}
//           <div
//             className="px-6 pb-6 pt-2"
//             style={{
//               borderTop: darkMode
//                 ? "1px solid rgba(255,255,255,0.04)"
//                 : "1px solid rgba(37,99,235,0.08)",
//             }}
//           >
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold transition-all"
//               style={{
//                 /* Red remains red in both themes because this is a
//                    crisis/emergency action. */
//                 background: !isSubmitting
//                   ? "#EF4444"
//                   : "rgba(239,68,68,0.15)",

//                 color: !isSubmitting
//                   ? "#fff"
//                   : "rgba(239,68,68,0.35)",

//                 border: !isSubmitting
//                   ? "1px solid rgba(239,68,68,0.55)"
//                   : "1px solid rgba(239,68,68,0.12)",

//                 boxShadow: !isSubmitting
//                   ? darkMode
//                     ? "0 0 24px rgba(239,68,68,0.3), 0 0 60px rgba(239,68,68,0.1)"
//                     : "0 8px 28px rgba(239,68,68,0.16)"
//                   : "none",

//                 fontSize: "0.98rem",

//                 fontFamily:
//                   "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",

//                 cursor: isSubmitting
//                   ? "not-allowed"
//                   : "pointer",

//                 transform: "none",
//               }}
//               onMouseEnter={(e) => {
//                 if (isSubmitting) return;

//                 (e.currentTarget as HTMLElement).style.boxShadow =
//                   darkMode
//                     ? "0 0 36px rgba(239,68,68,0.45), 0 0 80px rgba(239,68,68,0.15)"
//                     : "0 10px 32px rgba(239,68,68,0.22)";

//                 (e.currentTarget as HTMLElement).style.transform =
//                   "translateY(-1px)";
//               }}
//               onMouseLeave={(e) => {
//                 if (isSubmitting) return;

//                 (e.currentTarget as HTMLElement).style.boxShadow =
//                   darkMode
//                     ? "0 0 24px rgba(239,68,68,0.3), 0 0 60px rgba(239,68,68,0.1)"
//                     : "0 8px 28px rgba(239,68,68,0.16)";

//                 (e.currentTarget as HTMLElement).style.transform =
//                   "none";
//               }}
//             >
//               {isSubmitting ? (
//                 <>
//                   <span
//                     className="animate-spin"
//                     style={{
//                       width: 17,
//                       height: 17,
//                       border: "2px solid rgba(255,255,255,0.35)",
//                       borderTopColor: "#fff",
//                       borderRadius: "50%",
//                     }}
//                   />

//                   در حال ارسال گزارش...
//                 </>
//               ) : (
//                 <>
//                   <IconSend />
//                   ثبت امن گزارش و درخواست تماس
//                 </>
//               )}
//             </button>

//             {submitError && (
//               <p
//                 className="text-center mt-3"
//                 style={{
//                   color: "#EF4444",
//                   fontSize: "0.82rem",
//                 }}
//               >
//                 {submitError}
//               </p>
//             )}

//             {!submitError && (
//               <p
//                 className="text-center mt-3"
//                 style={{
//                   color: darkMode ? "#3a4454" : "#64748B",
//                   fontSize: "0.82rem",
//                 }}
//               >
//                 نوع حادثه و اطلاعات تماس الزامی است
//               </p>
//             )}
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EmergencyModal;









"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "@/components/ThemeProvider";
import { useRouter } from "next/navigation";
import {OtpModal} from "../components/otpModal";

/* ────────────────────────────────
   ICONS
──────────────────────────────── */

const IconClose = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconLock = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const IconSend = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const IconShieldCheck = ({ darkMode }: { darkMode: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={darkMode ? "#00E5FF" : "#2563EB"}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const IconCrypto = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9 8h4.5a1.5 1.5 0 010 3H9v3h5a1.5 1.5 0 010 3H9" />
    <line x1="12" y1="6" x2="12" y2="8" />
    <line x1="12" y1="18" x2="12" y2="20" />
  </svg>
);

const IconHack = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 17v4M16 17v4M12 21h.01" />
    <path d="M7 10l2 2-2 2" />
    <line x1="12" y1="12" x2="15" y2="12" />
  </svg>
);

const IconExtort = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" />
  </svg>
);

const IconRecaptcha = ({ darkMode }: { darkMode: boolean }) => {
  const primary = darkMode ? "0,229,255" : "37,99,235";

  return (
    <svg width="12" height="12" viewBox="0 0 64 64" fill="none">
      <path
        d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4z"
        fill={`rgba(${primary},0.08)`}
        stroke={`rgba(${primary},0.25)`}
        strokeWidth="2"
      />
      <path
        d="M20 32c0-6.627 5.373-12 12-12s12 5.373 12 12"
        stroke={`rgba(${primary},0.4)`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M44 32l-4-4M44 32l-4 4"
        stroke={`rgba(${primary},0.4)`}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

/* ────────────────────────────────
   INCIDENT CHIP
──────────────────────────────── */

type Chip = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const chips: Chip[] = [
  { id: "consulting", label: "مشاوره", icon: <IconShieldCheck darkMode={false} /> },
  { id: "crypto-blockchain-tracing", label: "ردیابی رمزارز", icon: <IconCrypto /> },
  { id: "hidden-identity", label: " کشف هویت", icon: <IconShieldCheck darkMode={false} /> },
  { id: "post-crisis-pentest", label: "تست نفوذ", icon: <IconHack /> },
  { id: "digital-forensics", label: "کالبدشکافی دیجیتال", icon: <IconHack /> },
  { id: "ransomware-negotiation", label: "مقابله با باج‌افزار", icon: <IconExtort /> },
  { id: "threat-intelligence", label: "هوش تهدیدات", icon: <IconHack /> },
];

/* ────────────────────────────────
   FORM
──────────────────────────────── */

type CrisisReportFormValues = {
  incidentType: string;
  description: string;
  contact: string;
};

const HelperText = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <p
      className="helperText"
      style={{
        color: "#EF4444",
        fontSize: "0.82rem",
        marginTop: 7,
        fontFamily: "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",
      }}
    >
      {message}
    </p>
  );
};

/* ────────────────────────────────
   LAST INCIDENT TYPE
──────────────────────────────── */

const LAST_INCIDENT_TYPE_COOKIE = "parahoor_last_incident_type";

const VALID_INCIDENT_TYPES = [
  "پایش دارک‌وب و هوش تهدیدات",
  "تست نفوذِ پسا-بحران",
  "مقابله و مذاکره با باج‌افزارها",
  "فارنزیک و کالبدشکافی دیجیتال",
  "ردیابی رمزارز و تحلیل بلاک‌چین",
  "هویت‌سنجی پنهان",
  "مشاوره",
] as const;

const isValidIncidentType = (value: string) =>
  VALID_INCIDENT_TYPES.includes(value as (typeof VALID_INCIDENT_TYPES)[number]);

const getLastIncidentType = () => {
  if (typeof document === "undefined") {
    return "";
  }

  try {
    const prefix = `${LAST_INCIDENT_TYPE_COOKIE}=`;

    const cookie = document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(prefix));

    if (!cookie) {
      return "";
    }

    const value = cookie.substring(prefix.length);

    const decodedValue = decodeURIComponent(value);

    if (!isValidIncidentType(decodedValue)) {
      return "";
    }

    return decodedValue;
  } catch {
    return "";
  }
};

const saveLastIncidentType = (incidentType: string) => {
  if (
    typeof document === "undefined" ||
    !isValidIncidentType(incidentType)
  ) {
    return;
  }

  try {
    document.cookie =
      `${LAST_INCIDENT_TYPE_COOKIE}=${encodeURIComponent(
        incidentType
      )}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    // خطای Cookie نباید مانع ارسال گزارش شود.
  }
};

/*
 * کوکی جداگانه و یک‌بارمصرف: فقط وقتی نقطه ورودی خاصی
 * (مثل باتن «رزرو زمان مشاوره») صراحتاً بخواد یک نوع حادثه
 * مشخص را فعال کند استفاده می‌شود. اگر این کوکی موجود نباشد،
 * رفتار قبلی (خواندن از LAST_INCIDENT_TYPE_COOKIE) بدون تغییر
 * ادامه پیدا می‌کند.
 */
const FORCE_INCIDENT_TYPE_COOKIE = "parahoor_force_incident_type";

const getForceIncidentType = () => {
  if (typeof document === "undefined") {
    return "";
  }

  try {
    const prefix = `${FORCE_INCIDENT_TYPE_COOKIE}=`;

    const cookie = document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(prefix));

    if (!cookie) {
      return "";
    }

    const value = cookie.substring(prefix.length);

    const decodedValue = decodeURIComponent(value);

    if (!isValidIncidentType(decodedValue)) {
      return "";
    }

    return decodedValue;
  } catch {
    return "";
  }
};

const clearForceIncidentType = () => {
  if (typeof document === "undefined") {
    return;
  }

  try {
    document.cookie = `${FORCE_INCIDENT_TYPE_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  } catch {
    // خطای Cookie نباید مانع باز شدن مدال شود.
  }
};

/* ────────────────────────────────
   MODAL
──────────────────────────────── */

export const EmergencyModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const { darkMode } = useTheme();
  const router = useRouter();

  const [submitError, setSubmitError] = useState("");
  const [focusDesc, setFocusDesc] = useState(false);
  const [focusContact, setFocusContact] = useState(false);
const [otpOpen, setOtpOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CrisisReportFormValues>({
    mode: "onChange",
    defaultValues: {
      incidentType: "",
      description: "",
      contact: "",
    },
  });

  const selected = watch("incidentType");
  const desc = watch("description");
  const contact = watch("contact");

  const primary = darkMode ? "#00E5FF" : "#2563EB";

  /* ────────────────────────────────
     LOAD LAST INCIDENT TYPE
  ───────────────────────────────── */

  useEffect(() => {
    const forcedIncidentType = getForceIncidentType();

    if (forcedIncidentType) {
      setValue("incidentType", forcedIncidentType, {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });

      clearForceIncidentType();
      return;
    }

    const savedIncidentType = getLastIncidentType();

    if (!savedIncidentType) {
      return;
    }

    setValue("incidentType", savedIncidentType, {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
  }, [setValue]);


const PREVIEW_OTP: boolean = true;

const onSubmit = async (data: CrisisReportFormValues) => {
  if (PREVIEW_OTP) {
    setOtpOpen(true);
    return;
  }

  setSubmitError("");

    try {
      const response = await fetch("/api/crisis-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "ارسال گزارش ناموفق بود"
        );
      }

      /*
       * فقط بعد از ثبت موفق گزارش،
       * نوع حادثه انتخاب‌شده ذخیره می‌شود.
       */
      saveLastIncidentType(data.incidentType);

      router.push("/report-submitted");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "خطایی هنگام ثبت گزارش رخ داد. لطفاً دوباره تلاش کنید."
      );
    }
  };

  /* ────────────────────────────────
     FORM STATE
  ───────────────────────────────── */

  {if (otpOpen) {
    return (
      <OtpModal
        preview
        phone="09121234567"
        onClose={onClose}
        onBack={() => setOtpOpen(false)}
        onVerified={async () => {}}
      />
    );
  }}
  return (

    
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: darkMode
          ? "rgba(4,8,20,0.88)"
          : "rgba(15,23,42,0.32)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      onClick={(e) =>
        e.target === e.currentTarget &&
        !isSubmitting &&
        onClose()
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
        <div
          className="relative w-full overflow-hidden"
          style={{
            background: darkMode
              ? "linear-gradient(160deg, rgba(10,17,42,0.99) 0%, rgba(6,11,28,0.99) 100%)"
              : "linear-gradient(160deg, #FFFFFF 0%, #F8FAFC 100%)",

            border: darkMode
              ? "1px solid rgba(0,229,255,0.18)"
              : "1px solid rgba(37,99,235,0.16)",

            borderRadius: 20,

            boxShadow: darkMode
              ? "0 0 80px rgba(0,229,255,0.07), 0 0 160px rgba(0,229,255,0.03), 0 40px 100px rgba(0,0,0,0.7)"
              : "0 20px 70px rgba(37,99,235,0.10), 0 30px 80px rgba(15,23,42,0.12)",

            maxHeight: "calc(100vh - 32px)",
            overflowY: "auto",
          }}
        >
          {/* Top cyan / blue accent line */}
          <div
            style={{
              height: 2,
              background: darkMode
                ? "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.6) 30%, rgba(0,229,255,0.9) 50%, rgba(0,229,255,0.6) 70%, transparent 100%)"
                : "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.45) 30%, rgba(37,99,235,0.8) 50%, rgba(37,99,235,0.45) 70%, transparent 100%)",
            }}
          />

          {/* Corner accents */}
          <div
            style={{
              position: "absolute",
              top: 2,
              right: 0,
              width: 56,
              height: 56,
              borderTop: darkMode
                ? "1px solid rgba(0,229,255,0.25)"
                : "1px solid rgba(37,99,235,0.18)",
              borderRight: darkMode
                ? "1px solid rgba(0,229,255,0.25)"
                : "1px solid rgba(37,99,235,0.18)",
              borderRadius: "0 20px 0 0",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 56,
              height: 56,
              borderBottom: darkMode
                ? "1px solid rgba(0,229,255,0.15)"
                : "1px solid rgba(37,99,235,0.12)",
              borderLeft: darkMode
                ? "1px solid rgba(0,229,255,0.15)"
                : "1px solid rgba(37,99,235,0.12)",
              borderRadius: "0 0 0 20px",
              pointerEvents: "none",
            }}
          />

          {/* ── HEADER ── */}
          <div
            className="flex items-start justify-between px-6 pt-6 pb-5"
            style={{
              borderBottom: darkMode
                ? "1px solid rgba(255,255,255,0.04)"
                : "1px solid rgba(37,99,235,0.07)",
            }}
          >
            <div className="flex-1 pl-4">
              {/* Status tag */}
              <div className="flex items-center gap-2 mb-2.5">
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#EF4444",
                    display: "inline-block",
                    boxShadow:
                      "0 0 6px rgba(239,68,68,0.9)",
                    animation: "pulse-cyan 1.5s infinite",
                  }}
                />

                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.6rem",
                    color: "rgba(239,68,68,0.7)",
                    letterSpacing: "0.18em",
                  }}
                >
                  CRISIS CHANNEL // ENCRYPTED
                </span>
              </div>

              {/* Title */}
              <h2
                className="font-black"
                style={{
                  color: darkMode ? "#fff" : "#111827",
                  fontSize: "1.15rem",
                  lineHeight: 1.3,
                }}
              >
                فرم اورژانسی گزارش بحران
              </h2>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl transition-all"
              style={{
                color: darkMode ? "#334155" : "#64748B",
                background: darkMode
                  ? "rgba(255,255,255,0.04)"
                  : "#F8FAFC",
                border: darkMode
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "1px solid rgba(37,99,235,0.10)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  darkMode ? "#94A3B8" : "#2563EB";

                (e.currentTarget as HTMLElement).style.borderColor =
                  darkMode
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(37,99,235,0.22)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  darkMode ? "#334155" : "#64748B";

                (e.currentTarget as HTMLElement).style.borderColor =
                  darkMode
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(37,99,235,0.10)";
              }}
              aria-label="بستن"
            >
              <IconClose />
            </button>
          </div>



          {/* ── FORM BODY ── */}
          <div className="px-6 py-5 space-y-6">
            {/* FIELD 1 – Incident Type Chips */}
            <div>
              <label
                className="block font-semibold mb-3"
                style={{
                  color: darkMode ? "#E2E8F0" : "#1E293B",
                  fontSize: "0.83rem",
                }}
              >
                <span
                  style={{
                    color: primary,
                    fontFamily: "monospace",
                    marginLeft: 6,
                  }}
                >
                  ۱.
                </span>
                نوع خدمت را مشخص کنید
              </label>

              <input
                type="hidden"
                {...register("incidentType", {
                  required: "نوع حادثه را انتخاب کنید",
                })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {chips.map(({ id, label, icon }) => {
                  const isActive = selected === label;

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() =>
                        setValue(
                          "incidentType",
                          isActive ? "" : label,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          }
                        )
                      }
className={`w-full min-h-[52px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-medium text-[11px] leading-5 text-center transition-all ${
  id === "consulting" ? "sm:col-span-2" : ""
}`}
                      style={{
                        background: isActive
                          ? darkMode
                            ? "rgba(0,229,255,0.1)"
                            : "rgba(37,99,235,0.08)"
                          : darkMode
                            ? "rgba(255,255,255,0.03)"
                            : "#F8FAFC",

                        border: isActive
                          ? darkMode
                            ? "1px solid rgba(0,229,255,0.45)"
                            : "1px solid rgba(37,99,235,0.38)"
                          : darkMode
                            ? "1px solid rgba(255,255,255,0.07)"
                            : "1px solid rgba(37,99,235,0.10)",

                        color: isActive
                          ? primary
                          : darkMode
                            ? "#475569"
                            : "#475569",

                        boxShadow: isActive
                          ? darkMode
                            ? "0 0 20px rgba(0,229,255,0.08), inset 0 0 20px rgba(0,229,255,0.04)"
                            : "0 4px 16px rgba(37,99,235,0.08), inset 0 0 16px rgba(37,99,235,0.025)"
                          : "none",

                        transform: isActive
                          ? "translateY(-1px)"
                          : "none",

                        fontFamily:
                          "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",
                      }}
                    >


                      <span
                        style={{
                          minWidth: 0,
                          flex: 1,
                          textAlign: "center",
                          whiteSpace: "normal",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {label}
                      </span>

                      {isActive && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: primary,
                            display: "inline-block",
                            boxShadow: darkMode
                              ? "0 0 6px rgba(0,229,255,0.8)"
                              : "0 0 6px rgba(37,99,235,0.35)",
                            marginRight: 2,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <HelperText
                message={errors.incidentType?.message}
              />
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: darkMode
                  ? "linear-gradient(90deg, transparent, rgba(0,229,255,0.08), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(37,99,235,0.08), transparent)",
              }}
            />

            {/* FIELD 2 – Description */}
            <div>
              <label
                className="flex items-center gap-1.5 font-semibold mb-2.5"
                style={{
                  color: darkMode ? "#E2E8F0" : "#1E293B",
                  fontSize: "0.83rem",
                }}
              >
                <span
                  style={{
                    color: primary,
                    fontFamily: "monospace",
                  }}
                >
                  ۲.
                </span>

                شرح مختصری از مشکل

                <span
                  style={{
                    color: darkMode ? "#65696e" : "#64748B",
                    fontWeight: 400,
                    fontSize: "0.82rem",
                  }}
                >
                  (اختیاری)
                </span>
              </label>

              <div className="relative">
                <textarea
                  rows={3}
                  {...register("description", {
                    maxLength: {
                      value: 2000,
                      message:
                        "شرح مشکل نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد",
                    },
                  })}
                  onFocus={() => setFocusDesc(true)}
                  onBlur={() => setFocusDesc(false)}
                  placeholder="مثال: کیف پول تراست‌ولت من هک شده و تترها به سرقت رفته..."
                  className="w-full px-4 pt-3.5 pb-3 rounded-xl text-[13px] outline-none resize-none transition-all"
                  style={{
                    background: darkMode
                      ? "#060B19"
                      : "#FFFFFF",

                    border: focusDesc
                      ? darkMode
                        ? "1px solid rgba(0,229,255,0.4)"
                        : "1px solid rgba(37,99,235,0.4)"
                      : darkMode
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "1px solid rgba(37,99,235,0.14)",

                    color: darkMode ? "#b8bfc8" : "#1E293B",

                    fontFamily:
                      "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",

                    lineHeight: 1.8,

                    boxShadow: focusDesc
                      ? darkMode
                        ? "0 0 0 3px rgba(0,229,255,0.06), inset 0 0 20px rgba(0,229,255,0.02)"
                        : "0 0 0 3px rgba(37,99,235,0.06), inset 0 0 20px rgba(37,99,235,0.02)"
                      : "none",

                    caretColor: primary,
                  }}
                />

                {desc.length > 0 && (
                  <span
                    className="absolute"
                    style={{
                      bottom: 10,
                      left: 12,
                      fontSize: "0.65rem",
                      fontFamily: "monospace",
                      color: darkMode
                        ? "rgba(0,229,255,0.3)"
                        : "rgba(37,99,235,0.4)",
                    }}
                  >
                    {desc.length} کاراکتر
                  </span>
                )}
              </div>

              <HelperText
                message={errors.description?.message}
              />
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: darkMode
                  ? "linear-gradient(90deg, transparent, rgba(0,229,255,0.08), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(37,99,235,0.08), transparent)",
              }}
            />

            {/* FIELD 3 – Contact Info */}
            <div>
              <label
                className="flex items-center gap-1.5 font-semibold mb-2.5"
                style={{
                  color: darkMode ? "#E2E8F0" : "#1E293B",
                  fontSize: "0.83rem",
                }}
              >
                <span
                  style={{
                    color: primary,
                    fontFamily: "monospace",
                  }}
                >
                  ۳.
                </span>

                شماره تماس یا آیدی تلگرام

                <span
                  style={{
                    color: "rgba(239,68,68,0.6)",
                    fontWeight: 400,
                    fontSize: "0.72rem",
                  }}
                >
                  (جهت تماس فوری)
                </span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  {...register("contact", {
                    required:
                      "شماره تماس یا آیدی تلگرام الزامی است",
                    maxLength: {
                      value: 100,
                      message:
                        "اطلاعات تماس بیش از حد طولانی است",
                    },
                  })}
                  onFocus={() => setFocusContact(true)}
                  onBlur={() => setFocusContact(false)}
                  placeholder="شماره موبایل یا @ID"
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: darkMode
                      ? "#060B19"
                      : "#FFFFFF",

                    border: focusContact
                      ? darkMode
                        ? "1px solid rgba(0,229,255,0.4)"
                        : "1px solid rgba(37,99,235,0.4)"
                      : contact.trim()
                        ? darkMode
                          ? "1px solid rgba(0,229,255,0.2)"
                          : "1px solid rgba(37,99,235,0.20)"
                        : darkMode
                          ? "1px solid rgba(255,255,255,0.06)"
                          : "1px solid rgba(37,99,235,0.14)",

                    color: darkMode ? "#E2E8F0" : "#1E293B",

                    fontFamily:
                      "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",

                    boxShadow: focusContact
                      ? darkMode
                        ? "0 0 0 3px rgba(0,229,255,0.06), inset 0 0 20px rgba(0,229,255,0.02)"
                        : "0 0 0 3px rgba(37,99,235,0.06), inset 0 0 20px rgba(37,99,235,0.02)"
                      : "none",

                    caretColor: primary,
                  }}
                />

                {/* Validation icon */}
                {contact.trim() && (
                  <div
                    className="absolute flex items-center justify-center"
                    style={{
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: darkMode
                        ? "rgba(0,229,255,0.12)"
                        : "rgba(37,99,235,0.10)",
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={primary}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>

              <HelperText
                message={errors.contact?.message}
              />

             
            </div>


          </div>

          {/* ── FOOTER / SUBMIT ── */}
          <div
            className="px-6 pb-6 mt-1"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold transition-all"
              style={{
                /* Red remains red in both themes because this is a
                   crisis/emergency action. */
                background: !isSubmitting
                  ? "#EF4444"
                  : "rgba(239,68,68,0.15)",

                color: !isSubmitting
                  ? "#fff"
                  : "rgba(239,68,68,0.35)",

                border: !isSubmitting
                  ? "1px solid rgba(239,68,68,0.55)"
                  : "1px solid rgba(239,68,68,0.12)",

                boxShadow: !isSubmitting
                  ? darkMode
                    ? "0 0 24px rgba(239,68,68,0.3), 0 0 60px rgba(239,68,68,0.1)"
                    : "0 8px 28px rgba(239,68,68,0.16)"
                  : "none",

                fontSize: "0.98rem",

                fontFamily:
                  "var(--font-vazirmatn), IRANSansX, Tahoma, Arial, sans-serif",

                cursor: isSubmitting
                  ? "not-allowed"
                  : "pointer",

                transform: "none",
              }}
              onMouseEnter={(e) => {
                if (isSubmitting) return;

                (e.currentTarget as HTMLElement).style.boxShadow =
                  darkMode
                    ? "0 0 36px rgba(239,68,68,0.45), 0 0 80px rgba(239,68,68,0.15)"
                    : "0 10px 32px rgba(239,68,68,0.22)";

                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                if (isSubmitting) return;

                (e.currentTarget as HTMLElement).style.boxShadow =
                  darkMode
                    ? "0 0 24px rgba(239,68,68,0.3), 0 0 60px rgba(239,68,68,0.1)"
                    : "0 8px 28px rgba(239,68,68,0.16)";

                (e.currentTarget as HTMLElement).style.transform =
                  "none";
              }}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="animate-spin"
                    style={{
                      width: 17,
                      height: 17,
                      border: "2px solid rgba(255,255,255,0.35)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                    }}
                  />

                  در حال ارسال گزارش...
                </>
              ) : (
                <>
                  <IconSend />
                  ثبت امن گزارش و درخواست تماس
                </>
              )}
            </button>

            {submitError && (
              <p
                className="text-center mt-3"
                style={{
                  color: "#EF4444",
                  fontSize: "0.82rem",
                }}
              >
                {submitError}
              </p>
            )}

            
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmergencyModal;

