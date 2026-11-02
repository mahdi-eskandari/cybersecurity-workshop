"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../../../components/ThemeProvider";
import { motion } from "framer-motion";
import EmergencyModal from "@/components/CrisisReportForm";
import { renderHighlightedTitle } from "@/lib/highlightTitle";


/* ─── ICONS ─── */

const sanitizeSvg = (svg: string) => {
  return svg
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/javascript\s*:/gi, "");
};

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

const IconHeadset = ({
  color = "#00E5FF",
}: {
  color?: string;
}) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 28v-4C8 16.268 15.268 9 24 9s16 7.268 16 15v4" />
    <rect x="4" y="26" width="8" height="12" rx="3" />
    <rect x="36" y="26" width="8" height="12" rx="3" />
    <path d="M44 36c0 4-3.582 7-8 7H28" />
    <circle cx="26" cy="43" r="2" />
  </svg>
);

const IconCrypto = ({
  color = "#00E5FF",
}: {
  color?: string;
}) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="20" />
    <path d="M18 16h10a4 4 0 010 8H18v8h11a4 4 0 000-8" />
    <line x1="24" y1="12" x2="24" y2="16" />
    <line x1="24" y1="36" x2="24" y2="40" />
  </svg>
);

const IconForensics = ({
  color = "#00E5FF",
}: {
  color?: string;
}) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 27V40a2 2 0 002 2h32a2 2 0 002-2V27" />
    <path d="M24 4L6 14l18 10 18-10L24 4z" />
    <line x1="14" y1="19" x2="14" y2="29" />
    <line x1="34" y1="19" x2="34" y2="29" />
    <circle cx="24" cy="28" r="5" />
    <line x1="24" y1="33" x2="24" y2="40" />
  </svg>
);

const IconOsint = ({
  color = "#00E5FF",
}: {
  color?: string;
}) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="20" />
    <line x1="4" y1="24" x2="44" y2="24" />
    <path d="M24 4c-5 6-8 12-8 20s3 14 8 20" />
    <path d="M24 4c5 6 8 12 8 20s-3 14-8 20" />
    <circle
      cx="24"
      cy="24"
      r="4"
      fill={
        color === "#00E5FF"
          ? "rgba(0,229,255,0.25)"
          : "rgba(30,58,138,0.18)"
      }
    />
  </svg>
);

const IconMalware = ({
  color = "#00E5FF",
}: {
  color?: string;
}) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="6" width="40" height="28" rx="3" />
    <line x1="16" y1="42" x2="32" y2="42" />
    <line x1="24" y1="34" x2="24" y2="42" />
    <path d="M14 22l5-6 5 6 5-6 5 6" strokeWidth="2" />
    <line x1="13" y1="28" x2="35" y2="28" />
  </svg>
);

const IconDarkWeb = ({
  color = "#00E5FF",
}: {
  color?: string;
}) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="20" />
    <path d="M4 24h40" />
    <path d="M12 10c2 4 4 9 4 14s-2 10-4 14" />
    <path d="M36 10c-2 4-4 9-4 14s2 10 4 14" />
    <path d="M7 16h34M7 32h34" />
    <line
      x1="24"
      y1="4"
      x2="24"
      y2="44"
      strokeDasharray="3 3"
    />
  </svg>
);

const IconNetwork = ({
  color = "#00E5FF",
}: {
  color?: string;
}) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="4" />
    <circle cx="8" cy="12" r="4" />
    <circle cx="40" cy="12" r="4" />
    <circle cx="8" cy="36" r="4" />
    <circle cx="40" cy="36" r="4" />
    <line x1="12" y1="24" x2="20" y2="24" />
    <line x1="11" y1="14" x2="21" y2="21" />
    <line x1="37" y1="14" x2="27" y2="21" />
    <line x1="11" y1="34" x2="21" y2="27" />
    <line x1="37" y1="34" x2="27" y2="27" />
    <line x1="28" y1="24" x2="36" y2="24" />
  </svg>
);

const IconArrow = () => (
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

const IconTelegram = ({
  color = "#00E5FF",
}: {
  color?: string;
}) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.5 4.5L2.5 12l7 2.5" />
    <path d="M9.5 14.5l2.5 5 3-8" />
    <path d="M9.5 14.5l8-8" />
  </svg>
);

const IconMail = ({
  color = "#00E5FF",
}: {
  color?: string;
}) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);



/* ─── DATA ─── */

type ServiceStatus = "active" | "draft" | "hidden";

type ServiceLevel =
  | "intermediate"
  | "specialized"
  | "advanced"
  | "complex";

interface Service {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  icon: string;
  tags: string[];
  level: ServiceLevel;
  categoryLabel: string;
  status: ServiceStatus;
  body: string;
  urgencyTitle: string;
  urgencyDesc: string;
  metaTitle: string;
  metaDescription: string;
}







/* ─── APP ─── */

export type ServicesPageInitialData = {
  services: Service[];
  seo: { h1Title: string; title?: string; description?: string };
  initialPage: number; // ← اضافه شود
};

export default function ServicesPageClient({ initialData }: { initialData: ServicesPageInitialData }) {
  const { darkMode } = useTheme();
const services = initialData.services;
  const loading = false;
const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [crisisOpen, setCrisisOpen] = useState(false);

  const blue = darkMode ? "#00E5FF" : "#1565C0";
  const blueBright = darkMode ? "#00E5FF" : "#1565C0";
  const sanitizeSvg = (svg: string) => {
  const clean = /* منطق فعلی sanitize خودت */ svg;
  return clean
    .replace(/fill="(?!none)[^"]*"/gi, 'fill="currentColor"')
    .replace(/stroke="(?!none)[^"]*"/gi, 'stroke="currentColor"');
};
    const seo = initialData.seo;

    const pathname = usePathname();
  const activeServices = services.filter((s) => s.status === "active");
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(activeServices.length / pageSize));
  const currentPage = Math.min(Math.max(1, initialData.initialPage), totalPages);
  const paginatedServices = activeServices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const buildPageHref = (page: number) =>
    page <= 1 ? pathname : `${pathname}?page=${page}`;


  return (

   

  <div
  dir="rtl"
  className="min-h-full transition-colors duration-300 pt-[var(--header-h,60px)] min-[840px]:pt-[var(--header-h,80px)]"
  style={{
    color: darkMode ? "#E2E8F0" : "#0F172A",
    fontFamily: "var(--font-vazirmatn), sans-serif",
    backgroundColor: darkMode ? "#0A1128" : "#FFFFFF",
  }}
>
  {/* ─── BREADCRUMB ─── */}
  <section style={{ background: darkMode ? "#070D1E" : "#F1F5FB" }}>
    <nav
      aria-label="مسیر راهنما"
      className="mx-auto w-full max-w-5xl px-4 py-2.5 sm:px-6 min-[840px]:px-12 min-[840px]:py-3"
    >
      <ol className="flex min-w-0 items-center justify-center gap-1.5 text-[11px] sm:gap-2 sm:text-xs">
        <li className="flex shrink-0 items-center">
          <Link
            href="/"
            className={`flex items-center gap-1.5 leading-none transition-colors ${
              darkMode
                ? "text-[#90a4c1] hover:text-[#00E5FF]"
                : "text-[#475569] hover:text-[#1565C0]"
            }`}
          >
            <IconHome />
            خانه
          </Link>
        </li>

        <li
          aria-hidden="true"
          className={`flex shrink-0 items-center ${
            darkMode ? "text-[#334155]" : "text-[#94A3B8]"
          }`}
        >
          <IconChevronLeft />
        </li>

        <li className="min-w-0">
          <span
            aria-current="page"
            className="inline-flex max-w-full items-center gap-2 rounded-md px-2 py-1 sm:px-2.5"
            style={{
              color: darkMode ? "#00E5FF" : "#1565C0",
              background: darkMode ? "rgba(0,229,255,0.055)" : "rgba(21,101,192,0.08)",
              border: darkMode
                ? "1px solid rgba(0,229,255,0.1)"
                : "1px solid rgba(21,101,192,0.2)",
            }}
          >
            <span
              className="inline-block h-1 w-1 shrink-0 rounded-full"
              style={{ background: darkMode ? "#00E5FF" : "#1565C0" }}
            />
            <span className="truncate">خدمات ما</span>
          </span>
        </li>
      </ol>
    </nav>
  </section>



      {/* ── HERO ── */}

      {/* <section className="relative px-6 pt-20 pb-16 md:px-12 md:pt-28 md:pb-20 text-center overflow-hidden"> */}
        <motion.div
        className="relative px-6 pt-20 pb-16 md:px-12 md:pt-20 md:pb-20 text-center overflow-hidden"
    initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true, amount: 0.2 }}
>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: darkMode
              ? "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(0,229,255,0.065) 0%, transparent 70%)"
              : "",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">

             <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs"

                        style={{
              background: darkMode
                ? "rgba(0,229,255,0.07)"
                : "#EBF3FF",
              border: darkMode
                ? "1px solid rgba(0,229,255,0.2)"
                : "1px solid #156cef57",
              
            }}
          >

            <span 
            className="data-label-t"
            style={{
              color: darkMode ? "#00E5FF" : "#1565C0",
            }}
            >PARAHOOR // SERVICES ARCHIVE</span>

                        <span className="node-dot pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", display: "inline-block",
                    background: darkMode
                ? "#00E5FF"
                : "#1565C0",

             }}
            
            />
          </div>



<h1
  className="glow-text font-black leading-tight mb-6"
  style={{
    fontSize: "56px",
    color: darkMode ? "#ffffff" : "#0c1a43",
    lineHeight: "1.28",
    fontWeight: 500,
    textShadow: darkMode
      ? undefined
      : "0 0 18px rgba(30,58,138,0.10)",
    textWrap: "balance",
  } as React.CSSProperties}
>
{renderHighlightedTitle(seo.h1Title, {
  firstLineWords: 4,
  maxWordsPerLine: 4,
  lineBreakClassName: "",
  style: { color: darkMode ? "#00E5FF" : "#1565C0" },
})}
</h1>

          <p
            className="mx-auto mb-8"
            style={{
              color: darkMode ? "#9aa0aa" : "#475569",
              fontSize: "16px",
              lineHeight: 1.75,
              maxWidth: 580,
              fontWeight: "500"
            }}
          >
            از ردیابی پیچیده‌ترین جریان‌های مالی تا مشاوره‌های دقیق فنی برای
            پرونده‌های سایبری شما.
          </p>

          {/* Scan rule */}

          <div
            style={{
              height: 1,
              width: 80,
              background: darkMode
                ? "linear-gradient(90deg,transparent,rgba(0,229,255,0.45),transparent)"
                : "linear-gradient(90deg,transparent,rgb(21, 101, 192),transparent)",
              margin: "28px auto 0",
            }}
          />
        </div>
      </motion.div>








      {/* ── CONSULTING BANNER ── */}

      {/* <section className="px-6 pb-6 md:px-12"> */}
         <motion.div
        className="px-6 pb-6 md:px-12"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true, amount: 0.2 }}
>
        <div className="max-w-5xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl px-8 py-8 md:px-10 md:py-10 transition-all duration-300"
            style={{
              background: darkMode
                ? "rgba(0,229,255,0.04)"
                : "#F8FAFC",
              border: darkMode
                ? "1px solid rgba(0,229,255,0.22)"
                : "1px solid rgba(35, 113, 202, 0.79)",
              boxShadow: darkMode
                ? "0 0 60px rgba(0,229,255,0.07), 0 0 120px rgba(0,229,255,0.03), inset 0 0 40px rgba(0,229,255,0.025)"
                : "0 18px 50px rgba(15,23,42,0.07), 0 0 40px rgba(30,58,138,0.04), inset 0 0 30px rgba(30,58,138,0.025)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Corner brackets */}

            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 52,
                height: 52,
                borderTop: darkMode
                  ? "1.5px solid rgba(0,229,255,0.4)"
                  : "1.5px solid #1D4ED8",
                borderRight: darkMode
                  ? "1.5px solid rgba(0,229,255,0.4)"
                  : "1.5px solid #1D4ED8",
                borderRadius: "0 16px 0 0",
              }}
            />


            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 52,
                height: 52,
                borderBottom: darkMode
                  ? "1.5px solid rgba(0,229,255,0.4)"
                  : "1.5px solid #1D4ED8",
                borderLeft: darkMode
                  ? "1.5px solid rgba(0,229,255,0.4)"
                  : "1.5px solid #1D4ED8",
                borderRadius: "0 0 0 16px",
              }}
            />

            {/* Ambient glow orb */}

            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: darkMode
                  ? "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(30,58,138,0.07) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Icon */}

              <div
                className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl"
                style={{
                  background: darkMode
                    ? "rgba(0,229,255,0.08)"
                    : "rgba(30,58,138,0.07)",
                  border: darkMode
                    ? "1px solid rgba(0,229,255,0.25)"
                    : "1px solid rgba(30,58,138,0.18)",
                }}
              >
                <IconHeadset color={blueBright} />
              </div>

              {/* Text */}

              <div className="flex-1">
                <span
            className="data-label block mb-2"
              style={{
              color: darkMode ? "rgba(0, 229, 255, 0.5)" : "#1D4ED8",
            }}
                >
                  TECHNICAL CONSULTATION // AVAILABLE
                </span>

                <h2
                  className="font-bold mb-2"
                  style={{
                    color: darkMode ? "#fff" : "#0F172A",
                    fontSize: "24px",
                    lineHeight: 1.4,
                    fontWeight: "500"
                  }}
                >
                  نیاز به مشاوره فنی و امکان‌سنجی دارید؟
                </h2>

                <p
                  style={{
                    color: darkMode ? "#8f959e" : "#334155",
                    fontSize: "14px",
                    lineHeight: 2,
                    maxWidth: 560,
                    fontWeight: "500"
                  }}
                >
                  پیش از هر اقدام حقوقی یا فنی، می‌توانید با کارآگاهان ما جلسه
                  مشاوره تخصصی (آنلاین یا حضوری) داشته باشید تا ابعاد موضوع
                  بررسی شود.
                </p>
              </div>

              {/* CTA */}

              <div className="flex-shrink-0">
                <button
                     onClick={() => {
                       try {
                        document.cookie = `parahoor_force_incident_type=consulting; path=/; max-age=120; SameSite=Lax`;
                       } catch {
                         // خطای Cookie نباید مانع باز شدن مدال شود.
                       }
                       setCrisisOpen(true);
                     }}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    background: "transparent",
                    border: darkMode
                      ? "1px solid rgba(0,229,255,0.45)"
                      : "1px solid #1565C0",
                    color: blueBright,
                    boxShadow: darkMode
                      ? "0 0 16px rgba(0,229,255,0.07), inset 0 0 16px rgba(0,229,255,0.03)"
                      : "0 8px 22px rgba(30,58,138,0.06), inset 0 0 16px rgba(30,58,138,0.025)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      darkMode
                        ? "rgba(0,229,255,0.1)"
                        : "#1D4ED8";

                    (e.currentTarget as HTMLElement).style.color =
                      darkMode ? "#00E5FF" : "#FFFFFF";

                    (e.currentTarget as HTMLElement).style.boxShadow =
                      darkMode
                        ? "0 0 28px rgba(0,229,255,0.15), inset 0 0 20px rgba(0,229,255,0.06)"
                        : "0 12px 30px rgba(30,58,138,0.20)";


                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";

                    (e.currentTarget as HTMLElement).style.color =
                      blueBright;

                    (e.currentTarget as HTMLElement).style.boxShadow =
                      darkMode
                        ? "0 0 16px rgba(0,229,255,0.07), inset 0 0 16px rgba(0,229,255,0.03)"
                        : "0 8px 22px rgba(30,58,138,0.06), inset 0 0 16px rgba(30,58,138,0.025)";

                    (e.currentTarget as HTMLElement).style.transform =
                      "none";
                  }}
                >
                  رزرو زمان مشاوره

                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                    />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
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

      </motion.div>










      {/* ── SERVICES GRID ── */}

      {/* <section
        className="px-6 py-16 md:px-12"
        id="services"
      > */}
         <motion.div
        className="px-6 py-16 md:px-12"
        id="services"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true, amount: 0.2 }}
>
        <div className="max-w-5xl mx-auto">
          {/* Section header */}

          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div
                style={{
                  width: 3,
                  height: 22,
                  background: darkMode
                    ? "linear-gradient(180deg,#00E5FF,rgba(0,229,255,0.2))"
                    : "linear-gradient(180deg,#1565C0,rgba(35, 89, 238, 0.25))",
                  borderRadius: 2,
                }}
              />

              <span
            className="data-label"
              style={{
              color: darkMode ? "rgba(0, 229, 255, 0.5)" : "#1D4ED8",
            }}
              >
                FORENSICS & INVESTIGATION
              </span>
            </div>

            <h2
              className="font-bold"
              style={{
                color: darkMode ? "#fff" : "#0F172A",
                fontSize: "32px",
                fontWeight: "500",
                lineHeight: "1.5"
              }}
            >
              عملیات فارنزیک و کارآگاهی
            </h2>

            <p
              className="mt-2 text-sm"
              style={{
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "2",
                color: darkMode ? "#8f959e" : "#334155",
                maxWidth: 480,
              }}
            >
              هر سرویس به‌صورت مستقل یا ترکیبی با توجه به موضوع شما اجرا می‌شود.
            </p>
          </div>

          {/* Grid */}

                    <div
            key={`services-page-${currentPage}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {paginatedServices.map((s) => {
              const isHovered = hoveredCard === s.id;

              return (
                <Link
                href={`/services/${s.slug}`}
                 key={s.id}
                  className="relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer"
                  style={{
                    background: darkMode
                      ? isHovered
                        ? "rgba(0,229,255,0.055)"
                        : "rgba(255,255,255,0.028)"
                      : isHovered
                        ? "#d0d0d035"
                        : "#ebebeb4b",

                    border: darkMode
                      ? isHovered
                        ? "1px solid rgba(0,229,255,0.35)"
                        : "1px solid rgba(0,229,255,0.12)"
                      : isHovered
                        ? "1px solid rgba(29,78,216,0.52)"
                        : "1px solid #1565c044",

                    backdropFilter: "blur(10px)",

                    transform: isHovered
                      ? "translateY(-4px)"
                      : "none",

                    boxShadow: darkMode
                      ? isHovered
                        ? "0 12px 40px rgba(0,0,0,0.4), 0 0 30px rgba(0,229,255,0.06)"
                        : "0 4px 20px rgba(0,0,0,0.2)"
                      : isHovered
                        ? "0 16px 40px rgba(30,58,138,0.34)"
                        : "0 4px 20px rgba(15,23,42,0.06)",
                  }}
                  
                  onMouseEnter={() => setHoveredCard(s.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >

                  {/* Top accent line on hover */}

                  <div
                    style={{
                      height: 2,
                      background: darkMode
                        ? "linear-gradient(90deg,transparent,rgba(0,229,255,0.7),transparent)"
                        : "linear-gradient(90deg,transparent,rgb(21, 101, 192),transparent)",
                      opacity: isHovered ? 1 : 0,
                      transition: "opacity 0.3s",
                    }}
                  />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Badge + complexity */}

                    

                    {/* Icon */}

                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-2xl mb-4 transition-all duration-300"
                      style={{
                        background: darkMode
                          ? isHovered
                            ? "rgba(0,229,255,0.1)"
                            : "rgba(0,229,255,0.06)"
                          : isHovered
                            ? "rgba(97, 136, 198, 0.24)"
                            : "rgba(30,58,138,0.06)",

                        border: darkMode
                          ? isHovered
                            ? "1px solid rgba(0,229,255,0.3)"
                            : "1px solid rgba(0,229,255,0.15)"
                          : isHovered
                            ? "1px solid #1565C0"
                            : "1px solid #a9c7e8",

                        boxShadow: !darkMode && isHovered
                          ? "0 8px 22px rgba(30,58,138,0.10)"
                          : "none",
                      }}
                    >



{s.icon ? (
  <span
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    color: blueBright,
  }}
  dangerouslySetInnerHTML={{ __html: sanitizeSvg(s.icon) }}
/>
) : (
  <IconNetwork color={blueBright} />
)}

                    </div>



                    {/* Title */}
<h3
  className="font-bold mb-2"
  style={{
    color: darkMode
      ? isHovered
        ? "#fff"
        : "#E2E8F0"
      : isHovered
        ? "#000000"
        : "#000000",
    fontSize:"18px",
    lineHeight: 1.5,
    transition: "color 0.3s",
  }}
>
  {s.title}
</h3>

{/* Description */}
<p
className="leading-relaxed line-clamp-2 break-words"
  style={{
    color: darkMode ? "#7f858d" : "#334155",
    fontSize:"14px",
    lineHeight:2,
    flexGrow: 1,
    letterSpacing:"-0.01em",
    fontWeight: "500"
  }}
>
  {s.shortDesc}
</p>

                    {/* Tags */}

                    <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
                      {s.tags.map((tag) => (
                        <span
  key={tag}
  style={{
    fontFamily: '"JetBrains Mono Variable"',
    fontSize:"0.73rem",
    color: darkMode
      ? "rgba(0,229,255,0.4)"
      : "#1565C0",
    background: darkMode
      ? "rgba(0,229,255,0.04)"
      : "rgba(30,58,138,0.045)",
    border: darkMode
      ? "1px solid rgba(0,229,255,0.1)"
      : "1px solid #b5d0ed",
    padding: "3px 8px",
    borderRadius: 4,
    fontWeight: "550",
    letterSpacing: "0.05em", 
  }}
>
  {tag}
</span>
                      ))}
                    </div>

                    {/* Divider */}

                    <div
                      style={{
                        height: 1,
                        background: darkMode
                          ? isHovered
                            ? "rgba(0,229,255,0.15)"
                            : "rgba(255,255,255,0.04)"
                          : isHovered
                            ? "rgba(30,58,138,0.18)"
                            : "rgba(15,23,42,0.07)",
                        transition: "background 0.3s",
                        marginBottom: 14,
                      }}
                    />

                    {/* CTA Link */}

                    <span
                      className="flex items-center justify-between group"
                      style={{
                        color: darkMode
                          ? isHovered
                            ? "#00E5FF"
                            : "#7f858d"
                          : isHovered
                            ? "#1565C0"
                            : "#000000",
                        transition: "color 0.25s",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                      }}
                    >
                      اطلاعات بیشتر و درخواست

                      <span
                        style={{
                          transform: isHovered
                            ? "translateX(-3px)"
                            : "none",
                          transition: "transform 0.2s",
                        }}
                      >
                        <IconArrow />
                      </span>
                    </span>
                  </div>

                </Link>
                
              );
            })}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              buildHref={buildPageHref}
              darkMode={darkMode}
            />
          )}
        </div>
      </motion.div>
    </div>

  );
}

/* ─────────────────────────────────────────────
   PAGINATION
───────────────────────────────────────────── */

const IconHome = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
    <path d="M9 20v-6h6v6" />
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

function IconChevronRight() {
  return (
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
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

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

function Pagination({
  currentPage,
  totalPages,
  buildHref,
  darkMode,
}: {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
  darkMode: boolean;
}) {
  const pages = getPaginationRange(currentPage, totalPages).reverse();
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const baseClass =
    "w-10 h-10 rounded-lg border flex items-center justify-center transition-all";

  const idleClass = darkMode
    ? `${baseClass} border-[#263B4E] text-[#8FA5B8] hover:border-[#496276] hover:text-[#E6F7FF]`
    : `${baseClass} border-[rgba(29,78,216,0.20)] text-[#475569] hover:border-[rgba(29,78,216,0.52)] hover:text-[#1E3A8A]`;

  const disabledClass = `${idleClass} disabled:opacity-30 opacity-30 cursor-not-allowed`;

  const activeClass = darkMode
    ? `${baseClass} bg-[#00B8D4] text-[#031018] border-cyan-400 shadow-[0_0_16px_rgba(0,229,255,0.45)]`
    : `${baseClass} bg-[#1565C0] text-white border-[#1565C0] shadow-[0_4px_15px_rgba(30,58,138,0.20)]`;

  return (
    <nav
      dir="ltr"
      aria-label="صفحه‌بندی خدمات"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {isLast ? (
        <span className={disabledClass} aria-disabled="true">
          <IconChevronLeft />
        </span>
      ) : (
        <Link href={buildHref(nextPage)} scroll={false} className={idleClass} aria-label="صفحه بعد">
          <IconChevronLeft />
        </Link>
      )}

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className={`flex h-10 w-10 shrink-0 items-center justify-center text-sm font-medium ${
              darkMode ? "text-[#8FA5B8]" : "text-[#475569]"
            }`}
          >
            …
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(page)}
            scroll={false}
            aria-current={page === currentPage ? "page" : undefined}
            className={`${page === currentPage ? activeClass : idleClass} text-sm font-medium`}
          >
            {page}
          </Link>
        )
      )}

      {isFirst ? (
        <span className={disabledClass} aria-disabled="true">
          <IconChevronRight />
        </span>
      ) : (
        <Link href={buildHref(prevPage)} scroll={false} className={idleClass} aria-label="صفحه قبل">
          <IconChevronRight />
        </Link>
      )}
    </nav>
  );
}