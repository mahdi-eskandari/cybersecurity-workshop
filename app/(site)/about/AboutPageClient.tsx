"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../../components/ThemeProvider";
import {EmergencyModal} from "../../.../../../components/CrisisReportForm"
import Link from "next/link";



/* ─── SHARED ─── */

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


const PulseDot = ({ size = 7, darkMode = true }: { size?: number; darkMode?: boolean }) => (
  <span
    style={{
      display: "inline-block",
      width: size,
      height: size,
      borderRadius: "50%",
      background: darkMode ? "#00E5FF" : "#1565C0",
      boxShadow: darkMode ? "0 0 8px rgba(0,229,255,0.9)" : "0 0 8px rgba(30,64,175,0.32)",
      flexShrink: 0,
    }}
  />
);

/* ─── ICONS ─── */
const IconClose = () => (
  <svg
    width="17"
    height="17"
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

/* ─── DECORATIVE SVGs ─── */

const HeroBg = ({ darkMode = true }: { darkMode?: boolean }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 1200 520"
    preserveAspectRatio="xMidYMid slice"
    style={{ transform: "translateY(-16px)" }}
  >
    <defs>
      <radialGradient id="hbg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor={darkMode ? "rgba(0,229,255,0.07)" : "rgba(30,64,175,0.16)"} />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>

    <rect width="1200" height="520" fill="url(#hbg)" />

    {[
      [120, 80, 300, 200],
      [300, 200, 500, 140],
      [500, 140, 700, 240],
      [700, 240, 900, 160],
      [900, 160, 1080, 260],
      [1080, 260, 1180, 140],
      [300, 200, 200, 350],
      [700, 240, 650, 400],
      [900, 160, 950, 380],
      [120, 80, 80, 280],
      [500, 140, 480, 40],
    ].map(([x1, y1, x2, y2], i) => (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={darkMode ? "rgba(0,229,255,0.07)" : "rgba(30,64,175,0.16)"}
        strokeWidth="1"
      />
    ))}

    {[
      [120, 80],
      [300, 200],
      [500, 140],
      [700, 240],
      [900, 160],
      [1080, 260],
      [1180, 140],
      [200, 350],
      [650, 400],
      [950, 380],
      [80, 280],
      [480, 40],
    ].map(([x, y], i) => (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={i % 3 === 0 ? 4 : 2.5}
        fill={
          i % 3 === 0
            ? (darkMode ? "rgba(0,229,255,0.35)" : "rgba(37,99,235,0.42)")
            : (darkMode ? "rgba(0,229,255,0.18)" : "rgba(30,58,138,0.52)")
        }
        stroke={
          i % 3 === 0 ? (darkMode ? "rgba(0,229,255,0.5)" : "rgba(30,58,138,0.90)") : "none"
        }
        strokeWidth="1"
      />
    ))}
  </svg>
);

const CyberLegalSynergyArt = ({ darkMode = true }: { darkMode?: boolean }) => {
  const c = (dark: string, light: string) => (darkMode ? dark : light);
  const strong = c("rgba(0,229,255,0.95)", "rgba(37,99,235,0.95)");
  const mid = c("rgba(0,229,255,0.65)", "rgba(37,99,235,0.65)");
  const soft = c("rgba(0,229,255,0.35)", "rgba(37,99,235,0.35)");
  const fillStrong = c("rgba(0,229,255,0.3)", "rgba(37,99,235,0.26)");
  const fillSoft = c("rgba(0,229,255,0.12)", "rgba(37,99,235,0.1)");
  const solid = c("#00E5FF", "#1565C0");

  const traces = [
    { d: "M52 100 H76 L92 116", begin: "0s" },
    { d: "M268 100 H244 L228 116", begin: "0.8s" },
    { d: "M52 220 H76 L104 198", begin: "1.6s" },
    { d: "M268 220 H244 L216 198", begin: "2.4s" },
  ];

  const orbitNodes = [
    { x: 160, y: 20 },
    { x: 281, y: 230 },
    { x: 39, y: 230 },
  ];

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 320 320"
      style={{ maxWidth: 280, margin: "0 auto", display: "block" }}
    >
      <defs>
        <radialGradient id="lawGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c("rgba(0,229,255,0.22)", "rgba(37,99,235,0.3)")} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="lawGlow">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <circle cx="160" cy="160" r="140" fill="url(#lawGrad)" />

      {/* Inner static ring */}
      <circle cx="160" cy="160" r="112" fill="none" stroke={soft} strokeWidth="1.5" />

      {/* Rotating dashed ring + orbiting nodes */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 160 160"
          to="360 160 160"
          dur="26s"
          repeatCount="indefinite"
        />
        <circle
          cx="160"
          cy="160"
          r="140"
          fill="none"
          stroke={mid}
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        {orbitNodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="9" fill={fillStrong} stroke={strong} strokeWidth="2" filter="url(#lawGlow)" />
            <circle cx={n.x} cy={n.y} r="3" fill={solid}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </g>

      {/* Pulse wave from shield */}
      <circle cx="160" cy="150" r="70" fill="none" stroke={solid} strokeWidth="1.5">
        <animate attributeName="r" values="70;125" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Circuit traces (cyber side) */}
      {traces.map((t, i) => (
        <g key={i}>
          <path d={t.d} fill="none" stroke={mid} strokeWidth="1.8" strokeDasharray="5 5">
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.6s" repeatCount="indefinite" />
          </path>
          <circle cx={t.d.match(/M(\d+) (\d+)/)![1]} cy={t.d.match(/M(\d+) (\d+)/)![2]} r="4.5" fill={fillStrong} stroke={strong} strokeWidth="1.8" />
          <circle r="3.5" fill={solid} filter="url(#lawGlow)">
            <animateMotion dur="2.8s" begin={t.begin} repeatCount="indefinite" path={t.d} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="2.8s" begin={t.begin} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Shield */}
      <path
        d="M160 52L88 76v56c0 46 32 88 72 104 40-16 72-58 72-104V76L160 52z"
        fill={fillSoft}
        stroke={strong}
        strokeWidth="2.5"
        filter="url(#lawGlow)"
      />
      <path
        d="M160 64L96 86v48c0 40 28 76 64 92 36-16 64-52 64-92V86L160 64z"
        fill="none"
        stroke={mid}
        strokeWidth="1.5"
      />

      {/* Scales of justice */}
      <line x1="160" y1="112" x2="160" y2="186" stroke={strong} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="140" y1="186" x2="180" y2="186" stroke={strong} strokeWidth="2.5" strokeLinecap="round" />
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-5 160 112; 5 160 112; -5 160 112"
          keyTimes="0;0.5;1"
          calcMode="spline"
          keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
          dur="6s"
          repeatCount="indefinite"
        />
        <line x1="118" y1="112" x2="202" y2="112" stroke={strong} strokeWidth="2.5" strokeLinecap="round" />
        {/* left pan */}
        <line x1="118" y1="112" x2="104" y2="146" stroke={mid} strokeWidth="1.5" />
        <line x1="118" y1="112" x2="132" y2="146" stroke={mid} strokeWidth="1.5" />
        <path d="M102 146 H134 Q118 166 102 146Z" fill={fillStrong} stroke={strong} strokeWidth="2" />
        {/* right pan */}
        <line x1="202" y1="112" x2="188" y2="146" stroke={mid} strokeWidth="1.5" />
        <line x1="202" y1="112" x2="216" y2="146" stroke={mid} strokeWidth="1.5" />
        <path d="M186 146 H218 Q202 166 186 146Z" fill={fillStrong} stroke={strong} strokeWidth="2" />
      </g>
      <circle cx="160" cy="112" r="5" fill={solid} filter="url(#lawGlow)" />

      {/* Approval check (draws itself) */}
      <polyline
        points="147,204 156,213 174,196"
        fill="none"
        stroke={solid}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="40"
        filter="url(#lawGlow)"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="40;0;0;40"
          keyTimes="0;0.3;0.85;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </polyline>
    </svg>
  );
};

/* ─── VALUE CARD ICONS ─── */

const IconLockedEye = ({ darkMode = true }: { darkMode?: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 48 48"
    fill="none"
    stroke={darkMode ? "#00E5FF" : "#1565C0"}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="24" cy="26" rx="16" ry="11" />
    <circle cx="24" cy="26" r="5" />
    <circle
      cx="24"
      cy="26"
      r="2"
      fill={darkMode ? "rgba(0,229,255,0.3)" : "rgba(30,58,138,0.42)"}
    />
    <rect x="16" y="10" width="16" height="12" rx="3" />
    <path d="M20 10V8a4 4 0 018 0v2" />
    <line x1="24" y1="13" x2="24" y2="16" />
  </svg>
);

const IconLightning = ({ darkMode = true }: { darkMode?: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 48 48"
    fill="none"
    stroke={darkMode ? "#00E5FF" : "#1565C0"}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M28 4L10 26h14l-4 18 18-22H24L28 4z"
      fill={darkMode ? "rgba(0,229,255,0.1)" : "rgba(30,58,138,0.16)"}
    />
  </svg>
);

const IconTerminal = ({ darkMode = true }: { darkMode?: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 48 48"
    fill="none"
    stroke={darkMode ? "#00E5FF" : "#1565C0"}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect
      x="4"
      y="8"
      width="40"
      height="32"
      rx="4"
      fill={darkMode ? "rgba(0,229,255,0.05)" : "rgba(30,58,138,0.18)"}
    />
    <polyline points="12 20 20 28 12 36" />
    <line x1="24" y1="36" x2="36" y2="36" />
  </svg>
);

const IconInfo = ({ darkMode = true }: { darkMode?: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={darkMode ? "#00E5FF" : "#1565C0"}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line
      x1="12"
      y1="8"
      x2="12"
      y2="8"
      strokeWidth="2.5"
    />
    <line x1="12" y1="12" x2="12" y2="16" />
  </svg>
);

const IconWarning = () => (
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
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);



/* ─── APP ─── */

export default function AboutPageClient({ h1Title = "ما تاریکی‌های دنیای دیجیتال را روشن می‌کنیم." }: { h1Title?: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { darkMode } = useTheme();
  const [crisisOpen, setCrisisOpen] = useState(false);
    const values = [
    {
      icon: <IconLockedEye darkMode={darkMode} />,
      badge: "CONFIDENTIALITY",
      title: "رازداری مطلق",
      desc: "هویت مراجعین و جزئیات پرونده‌ها در بالاترین سطح امنیتی و به صورت آفلاین نگهداری می‌شوند.",
      detail:
        "پروتکل آفلاین • رمزگذاری سرتاسری • بدون ذخیره ابری",
    },
    {
      icon: <IconLightning darkMode={darkMode} />,
      badge: "RAPID RESPONSE",
      title: "واکنش سریع",
      desc: "در جرایم سایبری زمان محدود است. تیم اورژانس ما در لحظه بحران وارد عمل می‌شود.",
      detail:
        "پاسخ اولیه < ۲ ساعت • ۷ روز هفته • ۲۴ ساعته",
    },
    {
      icon: <IconTerminal darkMode={darkMode} />,
      badge: "SCIENTIFIC PRECISION",
      title: "دقت علمی",
      desc: "گزارش‌های ما بر پایه تحلیل دقیق گره‌های بلاک‌چین و لاگ‌های سرور است، نه حدس و گمان.",
      detail:
        "آنالیز آن‌چین • لاگ‌آنالیز • زنجیره حضانت",
    },
  ];

  const accent = darkMode ? "#00E5FF" : "#1565C0";
  const textMain = darkMode ? "#E2E8F0" : "#0F172A";
  const textMuted = darkMode ? "#636f81" : "#475569";
  const cardBg = darkMode
    ? "rgba(255,255,255,0.028)"
    : "#FFFFFF";

  return (
    <>
 <div
      dir="rtl"
      className={`min-h-screen transition-colors duration-300 pt-[70px] ${
        darkMode
          ? "bg-[#0A1128] text-[#E6F7FF]"
          : "bg-white text-[#0F172A]"
      }`}
      style={{
        fontFamily: "var(--font-vazirmatn), sans-serif",
      }}
    >

 {/* ─── BREADCRUMB ─── */}

    <section
  // className="pt-[30px]"
  style={{
    background: darkMode ? "#070D1E" : "#F1F5FB",
  }}
>
  <div className="px-6 md:px-12 mt-[10px]">
    <nav
      aria-label="مسیر راهنما"
      className="max-w-5xl mx-auto py-3"
    >
      
    <ol className="flex items-center gap-2 whitespace-nowrap overflow-x-auto text-xs">
      <li className="flex items-center">
        <Link
    href="/"
    className={`flex items-center gap-1.5 leading-none transition-colors ${
      darkMode
        ? "text-[#64748B] hover:text-[#00E5FF]"
        : "text-[#475569] hover:text-[#1565C0]"
    }`}
  >
    <IconHome />
خانه
        </Link>
      </li>

      <li className={`flex items-center ${darkMode ? "text-[#334155]" : "text-[#94A3B8]"}`}>
        <IconChevronLeft />
      </li>

      <li>
        <Link
          href="/blogs"
          className={`transition-colors ${
            darkMode
              ? "text-[#64748B] hover:text-[#00E5FF]"
              : "text-[#475569] hover:text-[#1565C0]"
          }`}
        >
وبلاگ
        </Link>
      </li>

      <li className={`flex items-center ${darkMode ? "text-[#334155]" : "text-[#94A3B8]"}`}>
        <IconChevronLeft />
      </li>

      <li>
        <span
          aria-current="page"
          className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md"
          style={{
            color: darkMode ? "#00E5FF" : "#1565C0",
            background: darkMode ? "rgba(0,229,255,0.055)" : "rgba(21,101,192,0.08)",
            border: darkMode
              ? "1px solid rgba(0,229,255,0.1)"
              : "1px solid rgba(21,101,192,0.2)",
          }}
        >
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: darkMode ? "#00E5FF" : "#1565C0",
              display: "inline-block",
            }}
          />
درباره ما
  </span>
      </li>
    </ol>
  </nav>
</div>
</section>



     {crisisOpen && (
        <EmergencyModal
          onClose={() => setCrisisOpen(false)}
        />
      )}

      {/* ─── HERO ─── */}

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative overflow-hidden px-6 pt-24 pb-28 md:px-12 md:pt-32 md:pb-36 text-center pt-20"
      >
        <HeroBg darkMode={darkMode} />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: darkMode
              ? "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(0,229,255,0.065) 0%, transparent 70%)"
              : "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(227, 232, 242, 0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">

          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs"

                        style={{
              background: darkMode
                ? "rgba(0,229,255,0.07)"
                : "#EBF3FF",
              border: darkMode
                ? "1px solid rgba(0,229,255,0.2)"
                : "1px solid rgba(108, 153, 202, 0.22)",
              
            }}
          >

            <span 
            className="data-label"
            style={{
              color: darkMode ? "#00E5FF" : "#1565C0",
            }}
            >PARAHOOR // SYSTEM ONLINE</span>

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
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    color: darkMode ? "#e8f4f8" : "#0c1a43",
    lineHeight: "1.3",
    fontWeight: 900,
    textShadow: darkMode
      ? undefined
      : "0 0 18px rgba(30,58,138,0.10)",
  }}
>
  {(() => {
    const highlight = "دنیای دیجیتال";
    const title = h1Title || "";
    const i = title.indexOf(highlight);
    if (i === -1) return title;
    return (
      <>
        {title.slice(0, i).trimEnd()}
        <br />
        <span style={{ color: darkMode ? "#00E5FF" : "#1565C0" }}>
          {highlight}
        </span>
        {title.slice(i + highlight.length)}
      </>
    );
  })()}
</h1>

          <p
            className="mx-auto mb-8"
            style={{
              color: textMuted,
              fontSize: "clamp(0.92rem,2vw,1.0rem)",
              lineHeight: 1.9,
              maxWidth: 580,
            }}
          >
پاراهور، نخبه‌ترین آژانس خصوصی تحقیقات سایبری و دیجیتال فارنزیک است. مأموریت ما کشف حقیقت در تاریک‌ترین لایه‌های شبکه است. با رهگیری پیچیده رمزارزهای سرقتی، خدمات اوسینت و کالبدشکافی سرورهای هک‌شده، ادله‌ای قطعی و دادگاه‌پسند خلق می‌کنیم.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { val: "+300", label: "پرونده موفق" },
              { val: "1401", label: "سال تاسیس" },
              { val: "90%", label: "نرخ موفقیت " },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div
                  className="font-black"
                  style={{
                    fontSize:
                      "clamp(1.6rem,3.5vw,2.2rem)",
                    color: accent,
                    fontFamily: "inherit",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {val}
                </div>

                <div
                  style={{
                    color: darkMode ? "#697483eb" : "#64748B",
                    fontSize: "0.75rem",
                    marginTop: 3,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-0 inset-x-0"
          style={{
            height: 1,
            background: darkMode
              ? "linear-gradient(90deg,transparent,rgba(0,229,255,0.2),transparent)"
              : "linear-gradient(90deg,transparent,rgba(30,64,175,0.28),transparent)",
          }}
        />
      </motion.section>

      {/* ─── SYNERGY SECTION ─── */}

      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        className="px-6 py-14 md:px-12 md:py-28"
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div
                  style={{
                    width: 3,
                    height: 22,
                    background: darkMode
                      ? "linear-gradient(180deg,#00E5FF,rgba(0,229,255,0.15))"
                      : "linear-gradient(180deg,#1565C0,rgba(30,64,175,0.22))",
                    borderRadius: 2,
                  }}
                />

                <span
            className="data-label"
              style={{
              color: darkMode ? "rgba(0, 229, 255, 0.5)" : "#1565C0",
            }}
                >
                  CYBER INTELLIGENCE + LEGAL EXPERTISE
                </span>
              </div>

              <h2
                className="font-black mb-6"
                style={{
                  color: darkMode ? "#fff" : "#0F172A",
                  fontSize: "clamp(1.4rem,3vw,2rem)",
                  lineHeight: 1.4,
                }}
              >
                تلفیق هوش سایبری
                <br />
                و بینش حقوقی
              </h2>






              <p
                style={{
                  color: textMuted,
                  fontSize: "clamp(0.9rem,1.8vw,1rem)",
                  lineHeight: 1.95,
                }}
              >
              آژانس تحقیقاتی پاراهور، حاصل پیوند قدرتمندِ دانشِ عمیقِ فنی و اقتدارِ قاطعِ حقوقی است. این مجموعه توسط
              {" "}
                <span
                  style={{
                    color: darkMode ? "#E2E8F0" : "#1E293B",
                    fontWeight: 600,
                  }}
                >
                  <a href="/authors/mohammadreza-yousefi"> محمدرضا یوسفی،</a>
                
                </span>{" "}
              پژوهشگر جرائم رایانه‌ای، با مأموریتِ نفوذ به تاریک‌ترین شبکه‌های کلاهبرداری، گراف‌کاوی بلاک‌چین و کالبدشکافی دیجیتال پایه‌گذاری شد.<br /> از آنجا که کشف سرنخِ سایبری بدون استنادپذیریِ قانونی در دادگاه بی‌ارزش است، همراهی جناب آقای &nbsp;&nbsp;&nbsp;&nbsp;
                             {" "}
                <span
                  style={{
                    color: darkMode ? "#E2E8F0" : "#1E293B",
                    fontWeight: 600,
                  }}
                >
                  <a href="/authors/alireza-tabatabaei-hashemi"> علیرضا طباطبایی،</a>
             
                </span>{" "}
                وکیل سایبری برجسته در این تیم، تضمین می‌کند که تمامی داده‌های استخراج‌شده، به ادله‌ای کاملاً محکمه‌پسند و غیرقابل‌انکار برای مراجع قضایی تبدیل شوند. <br />پاراهور، خط پایانِ گمنامیِ مجرمانِ دیجیتال است.
              </p>


              <p>
                
              </p>






             

              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  {
                    label: "کارگاه سایبری",
                    col: "#1565C0",
                  },
                  {
                    label: "وکیل سایبری",
                    col: "#1565C0",
                  },
                  {
                    label: "پزشکی قانونی دیجیتال",
                    col: "#1565C0",
                  }
                ].map(({ label, col }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all duration-300"
                    style={{
                      
                      background: darkMode
                        ? "#55858b1b"
                        : "#4a6e971a",
                      border: darkMode
                        ? "1px solid #40929d30"
                        : "1px solid #3281db4e",
                      color:
                          darkMode
                            ? "#00E5FF"
                            : "#1565C0",
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: darkMode ?
                        "#00E5FF" : "#1565C0",
                        display: "inline-block",
                        opacity: 0.7
                      }}
                    />

                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 w-full md:w-72 flex items-center justify-center">
              <div
                className="relative w-full"
                style={{ maxWidth: 280 }}
              >
                <div
                  className="absolute inset-0 pointer-events-none rounded-full"
                  style={{
                    background: darkMode
                      ? "radial-gradient(circle, rgba(30,64,175,0.14) 0%, rgba(30,64,175,0.04) 48%, transparent 72%)"
                      : "radial-gradient(circle, rgba(29,78,216,0.20) 0%, rgba(30,58,138,0.08) 42%, transparent 72%)",
                    transform: "scale(1.3)",
                  }}
                />

                <CyberLegalSynergyArt darkMode={darkMode} />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── CORE VALUES ─── */}

      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        className="px-6 py-20 md:px-12"
        style={{
          background: darkMode
            ? "rgba(6,11,25,0.6)"
            : "rgba(255,255,255,0.75)",
          borderTop: darkMode
            ? "1px solid rgba(0,229,255,0.06)"
            : "1px solid rgba(30,58,138,0.16)",
          borderBottom: darkMode
            ? "1px solid rgba(0,229,255,0.06)"
            : "1px solid rgba(30,58,138,0.16)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-2 justify-center">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: darkMode
                    ? "#00E5FF"
                    : "#1565C0",
                  display: "inline-block",
                  boxShadow: darkMode
                    ? "0 0 7px rgba(0,229,255,0.9)"
                    : "0 0 7px rgba(30,58,138,0.22)",
                }}
              />

              <span
            className="data-label"
              style={{
              color: darkMode ? "rgba(0, 229, 255, 0.5)" : "#1565C0",
            }}
              >
                CORE PRINCIPLES // PARAHOOR
              </span>
            </div>
            
              


            <h2
              className="font-bold"
              style={{
                color: darkMode ? "#fff" : "#0F172A",
                fontSize: "clamp(1.3rem,3vw,1.9rem)",
              }}
            >
              ارزش‌های بنیادین پاراهور
            </h2>

            <div
              style={{
                height: 2,
                width: 60,
                background: darkMode
                  ? "linear-gradient(90deg,transparent,rgba(0,229,255,0.5),transparent)"
                  : "linear-gradient(90deg,transparent,rgb(21, 101, 192),transparent)",
                margin: "16px auto 0",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v, i) => {
              const isHov = hoveredCard === i;

              return (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl flex flex-col transition-all duration-300"
                  style={{
                    background: isHov
                      ? darkMode
                        ? "rgba(0,229,255,0.06)"
                        : "rgba(226, 230, 239, 0.12)"
                      : cardBg,
                    border: isHov
                      ? darkMode
                        ? "1px solid rgba(0,229,255,0.35)"
                        : "1px solid #1d65b88d"
                      : darkMode
                        ? "1px solid rgba(0,229,255,0.12)"
                        : "1px solid #719fd35d",
                    backdropFilter: "blur(10px)",
                    transform: isHov
                      ? "translateY(-4px)"
                      : "none",
                    boxShadow: isHov
                      ? darkMode
                        ? "0 16px 48px rgba(0,0,0,0.4), 0 0 30px rgba(0,229,255,0.07)"
                        : "0 16px 40px rgba(44, 98, 159, 0.34)"
                      : darkMode
                        ? "0 4px 20px rgba(0,0,0,0.2)"
                        : "0 4px 20px rgba(15,23,42,0.06)",
                  }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    style={{
                      height: 1.5,
                      background: darkMode
                        ? "linear-gradient(90deg,transparent,rgba(0,229,255,0.6),transparent)"
                        : "linear-gradient(90deg,transparent,#1565C0,transparent)",
                      opacity: isHov ? 1 : 0.3,
                      transition: "opacity 0.3s",
                    }}
                  />

                  <div className="p-7 flex flex-col flex-1">
                    <span
                      style={{
                        // fontFamily: "monospace",
                        fontSize: "0.58rem",
                        color: darkMode
                          ? "rgba(0,229,255,0.35)"
                          : "#1565C0",
                        letterSpacing: "0.14em",
                        marginBottom: 16,
                        display: "block",
                      }}
                    >
                      {v.badge}
                    </span>

                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-2xl mb-5 transition-all duration-300"
                      style={{
                        background: isHov
                          ? darkMode
                            ? "rgba(0,229,255,0.12)"
                            : "rgba(37,99,235,0.1)"
                          : darkMode
                            ? "rgba(0,229,255,0.06)"
                            : "rgba(30,58,138,0.10)",
                        border: isHov
                          ? darkMode
                            ? "1px solid rgba(0,229,255,0.3)"
                            : "1px solid #1565C0"
                          : darkMode
                            ? "1px solid rgba(0,229,255,0.15)"
                            : "1px solid rgba(21, 101, 192, 0.25)",
                      }}
                    >
                      {v.icon}
                    </div>

                    <h3
                      className="font-bold mb-3 transition-colors duration-300"
                      style={{
                        color: isHov
                          ? darkMode
                            ? "#fff"
                            : "black"
                          : darkMode
                            ? "#E2E8F0"
                            : "black",
                        fontSize: "1.05rem",
                      }}
                    >
                      {v.title}
                    </h3>

                    <p
                      style={{
                        color: textMuted,
                        fontSize: "0.85rem",
                        lineHeight: 1.85,
                        flexGrow: 1,
                      }}
                    >
                      {v.desc}
                    </p>

                    <div
                      style={{
                        height: 1,
                        background: isHov
                          ? darkMode
                            ? "rgba(0,229,255,0.12)"
                            : "rgba(30,58,138,0.34)"
                          : darkMode
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(15,23,42,0.06)",
                        margin: "18px 0 14px",
                        transition: "background 0.3s",
                      }}
                    />

                    <p
                      style={{
                        // fontFamily: "monospace",
                        fontSize: "0.65rem",
                        color: darkMode
                          ? "rgba(0,229,255,0.35)"
                          : "#1565C0",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {v.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ─── TIMELINE / MILESTONES ─── */}

      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        className="px-6 py-20 md:px-12"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 mb-2 justify-center">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: darkMode
                    ? "#00E5FF"
                    : "#1565C0",
                  display: "inline-block",
                  boxShadow: darkMode
                    ? "0 0 7px rgba(0,229,255,0.9)"
                    : "0 0 7px rgba(30,58,138,0.22)",
                }}
              />

              <span
            className="data-label"
              style={{
              color: darkMode ? "rgba(0, 229, 255, 0.5)" : "#1565C0",
            }}
              >
                OPERATIONAL HISTORY
              </span>
            </div>
              


            <h2
              className="font-bold"
              style={{
                color: darkMode ? "#fff" : "#0F172A",
                fontSize: "clamp(1.2rem,2.8vw,1.7rem)",
              }}
            >
              مسیر ما تاکنون
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute top-0 bottom-0 right-[9px] md:right-[calc(50%-0.5px)]"
              style={{
                width: 1,
                background: darkMode
                  ? "linear-gradient(180deg,rgba(0,229,255,0.4),rgba(0,229,255,0.05))"
                  : "linear-gradient(180deg,rgba(29,78,216,0.62),rgba(30,58,138,0.10))",
              }}
            />

            <div className="space-y-7 md:space-y-10">
              {[
                {
                  year: "۱۴۰۲",
                  title: "تأسیس پاراهور",
                  desc: "آغاز فعالیت با تیم هسته‌ای از متخصصان امنیت سایبری و مشاوران حقوقی.",
                },
                {
                  year: "۱۴۰۳",
                  title: "اولین پرونده بزرگ",
                  desc: "موفقیت در ردیابی ۸۰۰,۰۰۰ تتر سرقت‌شده در شبکه ترون و ارائه گزارش قضایی.",
                },
                {
                  year: "۱۴۰۴",
                  title: "گسترش خدمات",
                  desc: "افزوده شدن سرویس‌های OSINT، فارنزیک موبایل، و پایش دارک‌وب به حوزه‌های تخصصی.",
                },
                {
                  year: "۱۴۰۵",
                  title: "بیش از ۳۰۰ پرونده موفق",
                  desc: "ردیابی بیش از ۴.۵ میلیون دلار دارایی دیجیتال و ارائه ادله به مراجع قضایی بین‌المللی.",
                },
              ].map(({ year, title, desc }, i) => (
                
                <div
                  key={year}
                  className={`relative flex items-start gap-4 md:gap-8 ${
                    i % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="p-5 rounded-xl transition-all duration-300"
                      style={{
                        background: darkMode
                          ? "rgba(255,255,255,0.025)"
                          : "#FFFFFF",
                          
                        border: darkMode
                          ? "1px solid rgba(0, 229, 255, 0.12)"
                          : "1px solid #1565c099",
                        boxShadow: darkMode
                          ? "none"
                          : "0 8px 24px rgba(15,23,42,0.04)",
                      }}
                    >
                      <span
                        style={{
                          // fontFamily: "monospace",
                          fontSize: "0.68rem",
                          color: darkMode
                            ? "rgba(0,229,255,0.5)"
                            : "#1565C0",
                          letterSpacing: "0.15em",
                        }}
                        className="block mb-2"
                      >
                        {year}
                      </span>

                      <h4
                        className="font-bold mb-1.5"
                        style={{
                          color: darkMode
                            ? "#fff"
                            : "black",
                          fontSize: "0.92rem",
                        }}
                      >
                        {title}
                      </h4>

                      <p
                        style={{
                          color: textMuted,
                          fontSize: "0.8rem",
                          lineHeight: 1.75,
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div
                    className="relative z-10 flex-shrink-0 flex items-center justify-center w-5 md:w-8"
                    style={{ paddingTop: 20 }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: accent,
                        boxShadow: darkMode
                          ? "0 0 12px rgba(0,229,255,0.8)"
                          : "0 0 12px rgba(21,101,192,0.45)",
                        border: darkMode
                          ? "2px solid rgba(0,229,255,0.4)"
                          : "2px solid rgba(21,101,192,0.4)",
                      }}
                    />
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── DISCLAIMER BANNER ─── */}

      <div
        className="px-6 py-5 md:px-12"
        style={{
          background: darkMode ? "#060B19" : "#FFFFFF",
          borderTop: darkMode
            ? "1px solid rgba(0,229,255,0.09)"
            : "1px solid rgba(30,58,138,0.34)",
          borderBottom: darkMode
            ? "1px solid rgba(0,229,255,0.09)"
            : "1px solid rgba(30,58,138,0.34)",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-start gap-4">
          <div
              className="flex-shrink-0 self-center p-2 rounded-lg"
            style={{
              background: darkMode
                ? "rgba(0,229,255,0.07)"
                : "rgba(30,58,138,0.18)",
              border: darkMode
                ? "1px solid rgba(0,229,255,0.15)"
                : "1px solid rgba(30,64,175,0.22)",
            }}
          >
            <IconInfo darkMode={darkMode} />
          </div>

          <p
            style={{
              color: textMuted,
              fontSize: "0.83rem",
              lineHeight: 1.85,
            }}
          >
            <span
              style={{
                color: darkMode ? "#64748B" : "#475569",
                fontWeight: 600,
              }}
            >
              توجه:{" "}
            </span>
           پاراهور منحصراً یک آژانس «کشف ادله فنی و دیجیتال» است و مستقیماً خدمات حقوقی را ارائه نمی‌دهد. تمامی گزارش‌های فارنزیکِ این مجموعه، جهت تضمین بالاترین سطح استنادپذیری در محاکم قضایی، تحت نظارت و مشاوره مستمر وکلای پایه یک دادگستری (از جمله جناب آقای علیرضا طباطبایی) تدوین و اعتبارسنجی می‌شوند.
          </p>
        </div>
      </div>

      {/* ─── CONVERSION CTA ─── */}

      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        className="px-6 py-20 md:px-12"
      >
        <div 
          className={`max-w-2xl mx-auto text-center rounded-3xl`}
  style={{
        boxShadow: darkMode
          ? "0 18px 60px rgba(0, 229, 255, 0), 0 0 70px rgba(0,229,255,0.05)"
          : "0 18px 50px rgba(48, 94, 175, 0.32)",

        transition:
          "border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease, background 300ms ease",
          
      }}
        >
          <div
            className="relative overflow-hidden rounded-2xl px-8 py-14"
            style={{
              background: darkMode ? "rgba(255,255,255,0.03)" : "#FFFFFF", 
              border: darkMode 
                ? "1px solid rgba(0,229,255,0.18)" 
                : "1px solid rgba(39, 83, 206, 0.72)", 
              boxShadow: darkMode 
                ? "0 0 60px rgba(0,229,255,0.06), 0 0 100px rgba(0,229,255,0.03), inset 0 0 60px rgba(0,229,255,0.02)" 
                : "0 4px 20px rgba(15,23,42,0.06)", 
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 48,
                height: 48,
                borderTop: darkMode
                  ? "1.5px solid rgba(0,229,255,0.3)"
                  : "2px solid #1565C0",
                borderRight: darkMode
                  ? "1.5px solid rgba(0,229,255,0.3)"
                  : "2px solid #1565C0",
                borderRadius: "0 16px 0 0",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 48,
                height: 48,
                borderBottom: darkMode
                  ? "1.5px solid rgba(0,229,255,0.3)"
                  : "2px solid #1565C0",
                borderLeft: darkMode
                  ? "1.5px solid rgba(0,229,255,0.3)"
                  : "2px solid #1565C0",
                borderRadius: "0 0 0 16px",
                pointerEvents: "none",
              }}
            />

            <span

              className="data-label block mb-5"
              style={{
              color: darkMode ? "rgba(0, 229, 255, 0.5)" : "#1565C0",
            }}
            >
              FREE INITIAL ASSESSMENT
            </span>

            <h3
              className="font-bold mb-3"
              style={{
                color: darkMode ? "#fff" : "#0F172A",
                fontSize:
                  "clamp(1.15rem,2.5vw,1.6rem)",
                lineHeight: 1.45,
              }}
            >
              نیاز به بررسی پرونده خود دارید؟
            </h3>

            <p
              className="mb-8 mx-auto"
              style={{
                color: textMuted,
                fontSize: "0.88rem",
                lineHeight: 1.85,
                maxWidth: 420,
              }}
            >
              تیم فنی پاراهور پرونده شما را بدون هزینه اولیه
              ارزیابی می‌کند و امکان‌سنجی را اعلام می‌نماید.
            </p>

            <button
               onClick={() => setCrisisOpen(true)}
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl font-bold transition-all"
              style={{
                background: "#EF4444",
                color: "#fff",
                border: "1px solid rgba(239,68,68,0.55)",
                boxShadow:
                  "0 0 24px rgba(239,68,68,0.3)",
                fontSize: "1rem",
                fontFamily: "var(--font-vazirmatn), sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(239,68,68,0.5)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 24px rgba(239,68,68,0.3)";
                 e.currentTarget.style.transform = "none";
              }}
            >
              <IconWarning />
              ثبت امن گزارش بحران
            </button>

            <p
              className="mt-4 text-xs"
              style={{
                color: darkMode ? "#768094b1" : "#94A3B8",
              }}
            >
              بدون تعهد مالی • کاملاً محرمانه • پاسخ در کمتر
              از ۲ ساعت
            </p>
          </div>
        </div>
      </motion.section>
    </div>
    </>
  );
}