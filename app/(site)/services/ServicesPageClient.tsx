"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "../../../components/ThemeProvider";
import { motion } from "framer-motion";
import EmergencyModal from "@/components/CrisisReportForm";


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
};

export default function ServicesPageClient({ initialData }: { initialData: ServicesPageInitialData }) {
  const { darkMode } = useTheme();
const services = initialData.services;
  const loading = false;
const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [crisisOpen, setCrisisOpen] = useState(false);

  const blue = darkMode ? "#00E5FF" : "#1E3A8A";
  const blueBright = darkMode ? "#00E5FF" : "#1D4ED8";
    const seo = initialData.seo;


  return (

   

   <div
    className="min-h-full transition-colors duration-300"
    style={{
      color: darkMode ? "#E2E8F0" : "#0F172A",
      fontFamily: "var(--font-vazirmatn), sans-serif",
      backgroundColor: darkMode ? "#0A1128" : "#FFFFFF",
      backgroundImage: darkMode
        ? "linear-gradient(rgba(0,229,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.03) 1px,transparent 1px)"
        : "linear-gradient(rgba(30,58,138,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(30,58,138,0.035) 1px,transparent 1px)",
      backgroundSize: "52px 52px",
      backgroundAttachment: "fixed",
    }}
  >
      {/* ── HERO ── */}

      {/* <section className="relative px-6 pt-20 pb-16 md:px-12 md:pt-28 md:pb-20 text-center overflow-hidden"> */}
        <motion.div
        className="relative px-6 pt-20 pb-16 md:px-12 md:pt-28 md:pb-20 text-center overflow-hidden"
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
              : "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(84, 128, 215, 0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold"
            style={{
              background: darkMode
                ? "rgba(0,229,255,0.07)"
                : "rgba(30,58,138,0.07)",
              border: darkMode
                ? "1px solid rgba(0,229,255,0.18)"
                : "1px solid rgba(30,58,138,0.20)",
              color: blueBright,
            }}
          >
            <IconDot
              size={5}
              color={blueBright}
              glow={true}
              glowColor={
                darkMode
                  ? "rgba(0,229,255,0.9)"
                  : "rgba(30,58,138,0.45)"
              }
            />

            <span
              style={{
                fontFamily: "monospace",
                letterSpacing: "0.15em",
              }}
            >
              PARAHOOR // SERVICE ARCHIVE
            </span>
          </div>

<h1
  className="glow-text font-black leading-tight mb-6"
  style={{
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    color: darkMode ? "#e8f4f8" : "#0c1a43",
    lineHeight: "1.3",
    fontWeight: 900,
    textShadow: darkMode
      ? undefined
      : "0 0 18px rgba(30,58,138,0.10)",
  }}
>
  {seo.h1Title}
</h1>

          <p
            style={{
              color: darkMode ? "#64748B" : "#475569",
              fontSize: "clamp(0.88rem, 1.8vw, 1.05rem)",
              lineHeight: 1.85,
              maxWidth: 560,
              margin: "0 auto",
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
                : "linear-gradient(90deg,transparent,rgba(30,58,138,0.55),transparent)",
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
                : "1px solid rgba(30,58,138,0.16)",
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
                  : "1.5px solid rgba(30,58,138,0.45)",
                borderRight: darkMode
                  ? "1.5px solid rgba(0,229,255,0.4)"
                  : "1.5px solid rgba(30,58,138,0.45)",
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
                  : "1.5px solid rgba(30,58,138,0.45)",
                borderLeft: darkMode
                  ? "1.5px solid rgba(0,229,255,0.4)"
                  : "1.5px solid rgba(30,58,138,0.45)",
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
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.62rem",
                    color: darkMode
                      ? "rgba(0,229,255,0.45)"
                      : "#1e3a8ab3",
                    letterSpacing: "0.18em",
                  }}
                  className="block mb-2"
                >
                  TECHNICAL CONSULTATION // AVAILABLE
                </span>

                <h2
                  className="font-bold mb-2"
                  style={{
                    color: darkMode ? "#fff" : "#0F172A",
                    fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
                    lineHeight: 1.4,
                  }}
                >
                  نیاز به مشاوره فنی و امکان‌سنجی دارید؟
                </h2>

                <p
                  style={{
                    color: darkMode ? "#64748B" : "#475569",
                    fontSize: "0.87rem",
                    lineHeight: 1.8,
                    maxWidth: 560,
                  }}
                >
                  پیش از هر اقدام حقوقی یا فنی، می‌توانید با کارآگاهان ما جلسه
                  مشاوره تخصصی (آنلاین یا حضوری) داشته باشید تا ابعاد پرونده
                  بررسی شود.
                </p>
              </div>

              {/* CTA */}

              <div className="flex-shrink-0">
                <button
                     onClick={() => {
                       try {
                         document.cookie = `parahoor_force_incident_type=${encodeURIComponent(
                           "مشاوره"
                         )}; path=/; max-age=120; SameSite=Lax`;
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
                      : "1px solid rgba(30,58,138,0.45)",
                    color: blueBright,
                    boxShadow: darkMode
                      ? "0 0 16px rgba(0,229,255,0.07), inset 0 0 16px rgba(0,229,255,0.03)"
                      : "0 8px 22px rgba(30,58,138,0.06), inset 0 0 16px rgba(30,58,138,0.025)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      darkMode
                        ? "rgba(0,229,255,0.1)"
                        : "#142a65";

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
                    : "linear-gradient(180deg,#1E3A8A,rgba(30,58,138,0.25))",
                  borderRadius: 2,
                }}
              />

              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.62rem",
                  color: darkMode
                    ? "rgba(0,229,255,0.4)"
                    : "rgba(30,58,138,0.68)",
                  letterSpacing: "0.2em",
                }}
              >
                FORENSICS & INVESTIGATION
              </span>
            </div>

            <h2
              className="font-bold"
              style={{
                color: darkMode ? "#fff" : "#0F172A",
                fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
              }}
            >
              عملیات فارنزیک و کارآگاهی
            </h2>

            <p
              className="mt-2 text-sm"
              style={{
                color: darkMode ? "#334155" : "#334155",
                maxWidth: 480,
              }}
            >
              هر سرویس به‌صورت مستقل یا ترکیبی با توجه به پرونده شما اجرا می‌شود.
            </p>
          </div>

          {/* Grid */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => {
               if (s.status !== "active") return null;
              const isHovered = hoveredCard === s.id;

              return (
                
                <div
                  key={s.id}
                  className="relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 cursor-default"
                  style={{
                    background: darkMode
                      ? isHovered
                        ? "rgba(0,229,255,0.055)"
                        : "rgba(255,255,255,0.028)"
                      : isHovered
                        ? "rgba(192, 200, 221, 0.12)"
                        : "#FFFFFF",

                    border: darkMode
                      ? isHovered
                        ? "1px solid rgba(0,229,255,0.35)"
                        : "1px solid rgba(0,229,255,0.12)"
                      : isHovered
                        ? "1px solid rgba(29,78,216,0.52)"
                        : "1px solid rgba(29,78,216,0.20)",

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
                      height: 1.5,
                      background: darkMode
                        ? "linear-gradient(90deg,transparent,rgba(0,229,255,0.7),transparent)"
                        : "linear-gradient(90deg,transparent,rgba(30,64,175,0.82),transparent)",
                      opacity: isHovered ? 1 : 0,
                      transition: "opacity 0.3s",
                    }}
                  />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Badge + complexity */}

                    <div className="flex items-center justify-between mb-4">
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: "0.58rem",
                          color: darkMode
                            ? "rgba(0,229,255,0.4)"
                            : "rgba(30,58,138,0.7)",
                          letterSpacing: "0.14em",
                          background: darkMode
                            ? "rgba(0,229,255,0.06)"
                            : "rgba(30,58,138,0.06)",
                          border: darkMode
                            ? "1px solid rgba(0,229,255,0.1)"
                            : "1px solid rgba(30,58,138,0.12)",
                          padding: "2px 8px",
                          borderRadius: 4,
                        }}
                      >
                        {s.categoryLabel || "SERVICE"}
                      </span>

                      <span
                        style={{
                          fontSize: "0.65rem",
                        color: darkMode
                          ? {
                              intermediate: "#10B981",
                              specialized: "#00E5FF",
                              advanced: "#A78BFA",
                              complex: "#F59E0B",
                            }[s.level]
                          : "#1E3A8A",

                        background: darkMode
                          ? `${{
                              intermediate: "#10B981",
                              specialized: "#00E5FF",
                              advanced: "#A78BFA",
                              complex: "#F59E0B",
                            }[s.level]}15`
                          : "rgba(30,58,138,0.08)",

                        border: darkMode
                          ? `1px solid ${{
                              intermediate: "#10B981",
                              specialized: "#00E5FF",
                              advanced: "#A78BFA",
                              complex: "#F59E0B",
                            }[s.level]}30`
                          : "1px solid rgba(30,58,138,0.20)",
                          padding: "1px 7px",
                          borderRadius: 4,
                        }}
                      >
                        {{
  intermediate: "متوسط",
  specialized: "تخصصی",
  advanced: "پیشرفته",
  complex: "پیچیده",
}[s.level]}
                      </span>
                    </div>

                    {/* Icon */}

                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-2xl mb-4 transition-all duration-300"
                      style={{
                        background: darkMode
                          ? isHovered
                            ? "rgba(0,229,255,0.1)"
                            : "rgba(0,229,255,0.06)"
                          : isHovered
                            ? "rgba(30,58,138,0.10)"
                            : "rgba(30,58,138,0.06)",

                        border: darkMode
                          ? isHovered
                            ? "1px solid rgba(0,229,255,0.3)"
                            : "1px solid rgba(0,229,255,0.15)"
                          : isHovered
                            ? "1px solid rgba(30,58,138,0.3)"
                            : "1px solid rgba(30,58,138,0.15)",

                        boxShadow: !darkMode && isHovered
                          ? "0 8px 22px rgba(30,58,138,0.10)"
                          : "none",
                      }}
                    >
                      {/* {(() => {
                        switch (s.id) {
                          case "crypto":
                            return <IconCrypto color={blueBright} />;
                          case "forensics":
                            return <IconForensics color={blueBright} />;
                          case "osint":
                            return <IconOsint color={blueBright} />;
                          case "malware":
                            return <IconMalware color={blueBright} />;
                          case "darkweb":
                            return <IconDarkWeb color={blueBright} />;
                          case "network":
                            return <IconNetwork color={blueBright} />;
                          default:
                            return s.icon;
                        }
                      })()} */}


{s.icon ? (
  <span
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 30,
      height: 30,
    }}
    dangerouslySetInnerHTML={{
      __html: sanitizeSvg(s.icon),
    }}
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
        ? "#1E3A8A"
        : "#111827",
    fontSize: darkMode ? "0.95rem" : "1rem",
    lineHeight: 1.5,
    transition: "color 0.3s",
  }}
>
  {s.title}
</h3>

{/* Description */}
<p
  style={{
    color: darkMode ? "#475569" : "#334155",
    fontSize: darkMode ? "0.8rem" : "0.86rem",
    lineHeight: darkMode ? 1.8 : 1.95,
    flexGrow: 1,
    letterSpacing: darkMode ? "normal" : "-0.01em",
  }}
>
  {s.shortDesc.length > 80 ? s.shortDesc.slice(0,80) + "..." : s.shortDesc}
</p>

                    {/* Tags */}

                    <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
                      {s.tags.map((tag) => (
                        <span
  key={tag}
  style={{
    fontFamily: "monospace",
    fontSize: darkMode ? "0.62rem" : "0.68rem",
    color: darkMode
      ? "rgba(0,229,255,0.4)"
      : "rgba(30,58,138,0.72)",
    background: darkMode
      ? "rgba(0,229,255,0.04)"
      : "rgba(30,58,138,0.045)",
    border: darkMode
      ? "1px solid rgba(0,229,255,0.1)"
      : "1px solid rgba(30,58,138,0.12)",
    padding: "3px 8px",
    borderRadius: 4,
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

                    <Link
                      href={`/services/${s.slug}`}
                      className="flex items-center justify-between group"
                      style={{
                        color: darkMode
                          ? isHovered
                            ? "#00E5FF"
                            : "#334155"
                          : isHovered
                            ? "#1D4ED8"
                            : "#475569",
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
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>

  );
}