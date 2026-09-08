"use client"
import { useState } from "react";
import { useTheme } from "../../../components/ThemeProvider"
import Link from "next/link";
import {EmergencyModal} from "../../../components/CrisisReportForm"

/* ─── ICONS ─── */
const IconBlockchain = ({ darkMode = true }: { darkMode?: boolean }) => (
  <svg width="38" height="38" viewBox="0 0 48 48" fill="none" stroke={darkMode ? "#00E5FF" : "#2563EB"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="18" width="10" height="12" rx="2" />
    <rect x="19" y="6" width="10" height="12" rx="2" />
    <rect x="19" y="30" width="10" height="12" rx="2" />
    <rect x="32" y="18" width="10" height="12" rx="2" />
    <line x1="16" y1="24" x2="19" y2="24" />
    <line x1="29" y1="24" x2="32" y2="24" />
    <line x1="24" y1="18" x2="24" y2="18" />
    <line x1="24" y1="30" x2="24" y2="30" />
    <path d="M24 18V12" />
    <path d="M24 36v-6" />
    <circle cx="24" cy="24" r="2" fill={darkMode ? "rgba(0,229,255,0.4)" : "rgba(37,99,235,0.12)"} stroke={darkMode ? "#00E5FF" : "#2563EB"} strokeWidth="1" />
  </svg>
);

const IconTarget = ({ darkMode = true }: { darkMode?: boolean }) => (
  <svg width="38" height="38" viewBox="0 0 48 48" fill="none" stroke={darkMode ? "#00E5FF" : "#2563EB"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="18" />
    <circle cx="24" cy="24" r="11" />
    <circle cx="24" cy="24" r="4" fill={darkMode ? "rgba(0,229,255,0.25)" : "rgba(37,99,235,0.12)"} />
    <line x1="24" y1="6" x2="24" y2="13" />
    <line x1="24" y1="35" x2="24" y2="42" />
    <line x1="6" y1="24" x2="13" y2="24" />
    <line x1="35" y1="24" x2="42" y2="24" />
    <path d="M36 12l-4 4" strokeWidth="1.8" />
  </svg>
);

const IconShieldDoc = ({ darkMode = true }: { darkMode?: boolean }) => (
  <svg width="38" height="38" viewBox="0 0 48 48" fill="none" stroke={darkMode ? "#00E5FF" : "#2563EB"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 4L8 10v14c0 10 7 18.5 16 22 9-3.5 16-12 16-22V10L24 4z" />
    <path d="M17 25l4 4 10-10" strokeWidth="1.8" />
    <line x1="20" y1="18" x2="28" y2="18" />
    <line x1="20" y1="22" x2="26" y2="22" />
  </svg>
);

const IconBitcoin = ({ darkMode }: { darkMode: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={darkMode ? "#00E5FF" : "#2563EB"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9 8h4.5a2 2 0 010 4H9v4h5a2 2 0 000-4" />
    <line x1="12" y1="6" x2="12" y2="8" />
    <line x1="12" y1="18" x2="12" y2="20" />
  </svg>
);


const IconLink = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
);

const IconTelegram = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 4.5L2.5 12l7 2.5" />
    <path d="M9.5 14.5l2.5 5 3-8" />
    <path d="M9.5 14.5l8-8" />
  </svg>
);

const IconMail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconWarning = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconCheck = ({ darkMode = true }: { darkMode?: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={darkMode ? "#00E5FF" : "#2563EB"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─── DECORATIVE: flowing blockchain path ─── */
const BlockchainHeroArt = ({
  darkMode = true,
}: {
  darkMode?: boolean;
}) => (
  <svg
    width="100%"
    height="220"
    viewBox="0 0 900 220"
    preserveAspectRatio="xMidYMid meet"
    className="w-full"
    style={{ opacity: 0.22 }}
  >
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Horizontal chain path */}
    <path
      d="M0 110 Q100 60 180 110 Q260 160 340 110 Q420 60 500 110 Q580 160 660 110 Q740 60 820 110 Q860 135 900 110"
      stroke={
        darkMode
          ? "rgba(0,229,255,0.5)"
          : "rgba(37,99,235,0.38)"
      }
      strokeWidth="1"
      fill="none"
      filter="url(#glow)"
    />

    {/* Block nodes on path */}
    {[90, 260, 430, 600, 770].map((x, i) => (
      <g key={i}>
        <rect
          x={x - 18}
          y={88}
          width="36"
          height="44"
          rx="4"
          fill={
            darkMode
              ? "rgba(0,229,255,0.06)"
              : "rgba(37,99,235,0.045)"
          }
          stroke={
            darkMode
              ? "rgba(0,229,255,0.4)"
              : "rgba(37,99,235,0.32)"
          }
          strokeWidth="1"
        />

        <rect
          x={x - 10}
          y={97}
          width="20"
          height="3"
          rx="1"
          fill={
            darkMode
              ? "rgba(0,229,255,0.3)"
              : "rgba(37,99,235,0.25)"
          }
        />

        <rect
          x={x - 10}
          y={104}
          width="14"
          height="3"
          rx="1"
          fill={
            darkMode
              ? "rgba(0,229,255,0.2)"
              : "rgba(37,99,235,0.18)"
          }
        />

        <rect
          x={x - 10}
          y={111}
          width="17"
          height="3"
          rx="1"
          fill={
            darkMode
              ? "rgba(0,229,255,0.2)"
              : "rgba(37,99,235,0.18)"
          }
        />

        <rect
          x={x - 10}
          y={118}
          width="10"
          height="3"
          rx="1"
          fill={
            darkMode
              ? "rgba(0,229,255,0.15)"
              : "rgba(37,99,235,0.14)"
          }
        />

        <circle
          cx={x}
          cy={88}
          r="3"
          fill={darkMode ? "#00E5FF" : "#2563EB"}
          filter="url(#glow)"
        />
      </g>
    ))}

    {/* Secondary chain – lower opacity */}
    <path
      d="M0 170 Q80 140 160 170 Q240 200 320 165 Q400 130 480 170 Q560 210 640 170 Q720 130 800 165 Q860 182 900 165"
      stroke={
        darkMode
          ? "rgba(0,229,255,0.15)"
          : "rgba(37,99,235,0.14)"
      }
      strokeWidth="1"
      fill="none"
    />

    {/* Vertical connectors at random points */}
    {[170, 410, 650].map((x, i) => (
      <line
        key={i}
        x1={x}
        y1={80}
        x2={x}
        y2={50}
        stroke={
          darkMode
            ? "rgba(0,229,255,0.2)"
            : "rgba(37,99,235,0.18)"
        }
        strokeWidth="1"
        strokeDasharray="3 3"
      />
    ))}

    {[170, 410, 650].map((x, i) => (
      <circle
        key={i}
        cx={x}
        cy={46}
        r="3"
        fill={
          darkMode
            ? "rgba(0,229,255,0.35)"
            : "rgba(37,99,235,0.25)"
        }
        stroke={
          darkMode
            ? "rgba(0,229,255,0.5)"
            : "rgba(37,99,235,0.32)"
        }
        strokeWidth="1"
      />
    ))}
  </svg>
);



/* ─── APP ─── */
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
    const { darkMode } = useTheme()
    const [crisisOpen, setCrisisOpen] = useState(false);
  
  

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="min-h-full cyber-grid-bg" style={{ background: darkMode ? "#0A1128" : "#FFFFFF", color: darkMode ? "#E2E8F0" : "#111827" }}>



      {/* ─── SERVICE HERO ─── */}
      <section className="relative flex flex-col items-center text-center px-6 pt-20 pb-10 md:pt-28 md:pb-14 overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: darkMode ? "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(0,229,255,0.07) 0%, transparent 70%)" : "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(37,99,235,0.025) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold"
            style={{ background: darkMode ? "rgba(0,229,255,0.07)" : "#F8FAFC", border: darkMode ? "1px solid rgba(0,229,255,0.2)" : "1px solid #a4b2d8", color: darkMode ? "#00E5FF" : "#1D4ED8" }}
          >
            <IconBitcoin darkMode={darkMode} />
            دپارتمان ردیابی مالی و بلاک‌چین
          </div>

          {/* H1 */}
          <h1
            className="font-black leading-snug mb-5"
            style={{
              fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
              color: "#fff",
              textShadow: "0 0 50px rgba(0,229,255,0.15), 0 0 100px rgba(0,229,255,0.05)",
              lineHeight: 1.35,
            }}
          >
           <span className="text-black dark:text-[#fff]">ردیابی رمزارزهای سرقت‌شده</span> <br /> <span className="text-black dark:text-[#fff]">و </span>
             <span style={{ color: darkMode ? "#00E5FF" : "#1D4ED8" }}>کلاهبرداری‌های پانزی</span>
          </h1>

          {/* Sub-headline */}
          <p
            className="max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ color: "#94A3B8", fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", fontWeight: 400 }}
          >
            مجرمان سایبری فکر می‌کنند تراکنش‌های کریپتو غیرقابل رهگیری است. ما با استفاده از پیشرفته‌ترین ابزارهای آن‌چین (On-chain)، تتر و بیت‌کوینِ سرقتی شما را تا صرافی نهایی ردیابی می‌کنیم.
          </p>

          {/* Primary CTA */}
          <Link
              href="mailto:secure@parahoor.io"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold transition-all duration-300 mb-4"
              style={{
                background: darkMode ? "#EF4444" : "#2563EB",
                color: "#ffffff",
                border: darkMode
                  ? "1px solid rgba(239, 68, 68, 0.6)"
                  : "1px solid rgba(37,99,235,0.6)",
                boxShadow: darkMode
                  ? "0 0 15px rgba(239,68,68,0.35)"
                  : "0 0 15px rgba(37,99,235,0.18)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 0 22px rgba(239,68,68,0.55)"
                  : "0 0 22px rgba(37,99,235,0.28)"

                if (!darkMode) {
                  e.currentTarget.style.background = "#3B82F6"
                  e.currentTarget.style.borderColor = "#3B82F6"
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 0 15px rgba(239,68,68,0.35)"
                  : "0 0 15px rgba(37,99,235,0.18)"

                if (!darkMode) {
                  e.currentTarget.style.background = "#2563EB"
                  e.currentTarget.style.borderColor = "rgba(37,99,235,0.6)"
                }
              }}
            >
            <IconWarning />
 درخواست ردیابی فوری     
        </Link>


          {/* Trust micro-signals */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            {[
              "پاسخ اولیه در کمتر از ۲ ساعت",
              "رازداری کامل پرونده",
              "گزارش دادگاه‌پسند",
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <IconCheck darkMode={darkMode} />
                <span style={{ color: "#475569", fontSize: "0.78rem" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Blockchain art */}
<div className="relative z-10 w-full max-w-4xl mt-10 -mb-4">
  <BlockchainHeroArt darkMode={darkMode} />
</div> 
      </section>



      {/* ─── PAIN POINT BANNER ─── */}
      <section
        className="px-6 py-16 md:px-12"
        style={{ background: darkMode ? "#060B19" : "#F4F8FF", borderBottom: darkMode ? "1px solid rgba(0,229,255,0.07)" : "1px solid rgba(37,99,235,0.08)" }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Warning badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-xs font-semibold"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#EF4444" }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444", display: "inline-block", boxShadow: "0 0 6px #EF4444" }} />
            هشدار بحرانی
          </div>

          <h3
            className="font-bold mb-4"
            style={{ fontSize: "clamp(1.3rem, 2.8vw, 1.9rem)", color: darkMode ? "#fff" : "#111827", lineHeight: 1.4 }}
          >
            زمان به ضرر شماست...
          </h3>

          <p style={{ color: "#64748B", fontSize: "clamp(0.88rem, 1.6vw, 1rem)", lineHeight: 1.9 }}>
            در جرایم رمزارزی، سرعت عمل حیاتی است. هرچه سریع‌تر گزارش دهید، احتمال مسدودسازی دارایی در صرافی‌های متمرکز (CEX) بیشتر است. اکثر صرافی‌های بین‌المللی با گزارش فنی معتبر، دارایی‌های مشکوک را فریز می‌کنند — اما این فرآیند زمان‌بر است و ردپاها محو می‌شوند.
          </p>

        </div>
      </section>

      {/* ─── HOW WE TRACK ─── */}
      <section className="px-6 py-20 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <span
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem", color: darkMode ? "rgba(0,229,255,0.45)" : "#1D4ED8", letterSpacing: "0.18em", textTransform: "uppercase" }}
              className="block mb-3"
            >
              INVESTIGATION PIPELINE
            </span>
            <h2
              className="font-bold"
              style={{ fontSize: "clamp(1.3rem, 2.8vw, 2rem)", color: darkMode ? "#fff" : "#111827" }}
            >
              مراحل کشف و ردیابی پاراهور
            </h2>
            <div
              className="mt-4 mx-auto"
              style={{ height: 1, width: 80, background: darkMode ? "linear-gradient(90deg,transparent,rgba(0,229,255,0.5),transparent)" : "linear-gradient(90deg,transparent,rgba(37,99,235,0.28),transparent)" }}
            />
          </div>

          {/* 3 vertical cards */}
          <div className="flex flex-col gap-5">

            {/* Card 1 */}
            <div
              className="glass-card p-7 flex items-start gap-6 group transition-all duration-300 border border-cyan-500/30 hover:border-cyan-500 bg-cyan-900/10 hover:bg-cyan-800/15 rounded-2xl"
              style={{ textAlign: "right", background: darkMode ? undefined : "#FFFFFF", borderColor: darkMode ? undefined : "rgba(37,99,235,0.16)", boxShadow: darkMode ? undefined : "0 8px 28px rgba(37,99,235,0.06)" }}
              onMouseEnter={(e) => { if (!darkMode) { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 34px rgba(37,99,235,0.10)"; e.currentTarget.style.borderColor = "rgba(37,99,235,0.28)"; } }}
              onMouseLeave={(e) => { if (!darkMode) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,99,235,0.06)"; e.currentTarget.style.borderColor = "rgba(37,99,235,0.16)"; } }}
            >
              <div
                className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: darkMode ? "rgba(0,229,255,0.06)" : "#EFF6FF", border: darkMode ? "1px solid rgba(0,229,255,0.2)" : "1px solid rgba(37,99,235,0.16)" }}
              >
                <IconBlockchain darkMode={darkMode} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    style={{ fontFamily: "monospace", fontSize: "0.65rem", color: darkMode ? "rgba(0,229,255,0.4)" : "#1D4ED8", letterSpacing: "0.12em" }}
                  >
                    STEP 01
                  </span>
                  <div style={{ flex: 1, height: 1, background: darkMode ? "rgba(0,229,255,0.08)" : "rgba(37,99,235,0.12)" }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: darkMode ? "#fff" : "#111827", fontSize: "1.05rem" }}>
                  آنالیز گره‌ها و میکسرها
                </h3>
                <p style={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.8 }}>
                  تحلیل مسیر پول حتی در صورت استفاده مجرم از ابزارهای مخفی‌کننده هویت مانند Tornado Cash، میکسرهای بیت‌کوین، و پروتکل‌های CoinJoin. ردیابی آن‌چین (On-chain) در بلاک‌چین‌های اتریوم، ترون، و بیت‌کوین.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Chainalysis", "TRM Labs", "Crystal Blockchain"].map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-0.5 rounded text-xs"
                      style={{ background: darkMode ? "rgba(0,229,255,0.06)" : "#F1F5FF", border: darkMode ? "1px solid rgba(0,229,255,0.12)" : "1px solid rgba(37,99,235,0.14)", color: darkMode ? "#00e5ff80" : "#1E3A8A", fontFamily: "monospace", fontWeight: 700 }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Connector */}
            <div className="flex items-center justify-center -my-1" style={{ opacity: 1 }}>
              <div style={{ height: 24, width: 1, background: darkMode ? "linear-gradient(1270deg, rgba(0,229,255,0.1), rgb(0, 229, 255))" : "linear-gradient(180deg, rgba(37,99,235,0.16), rgba(37,99,235,0.58))", marginRight: "auto", marginLeft: "auto" }} />
            </div>

            {/* Card 2 */}
            <div
              className="glass-card p-7 flex items-start gap-6 group transition-all duration-300 border border-cyan-500/30 hover:border-cyan-500 bg-cyan-900/10 hover:bg-cyan-800/15 rounded-2xl"
              style={{ textAlign: "right", background: darkMode ? undefined : "#FFFFFF", borderColor: darkMode ? undefined : "rgba(37,99,235,0.16)", boxShadow: darkMode ? undefined : "0 8px 28px rgba(37,99,235,0.06)" }}
              onMouseEnter={(e) => { if (!darkMode) { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 34px rgba(37,99,235,0.10)"; e.currentTarget.style.borderColor = "rgba(37,99,235,0.28)"; } }}
              onMouseLeave={(e) => { if (!darkMode) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,99,235,0.06)"; e.currentTarget.style.borderColor = "rgba(37,99,235,0.16)"; } }}
            >
              <div
                className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: darkMode ? "rgba(0,229,255,0.06)" : "#EFF6FF", border: darkMode ? "1px solid rgba(0,229,255,0.2)" : "1px solid rgba(37,99,235,0.16)" }}
              >
                <IconTarget darkMode={darkMode} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span style={{ fontFamily: "monospace", fontSize: "0.65rem", color: darkMode ? "rgba(0,229,255,0.4)" : "#1D4ED8", letterSpacing: "0.12em" }}>
                    STEP 02
                  </span>
                  <div style={{ flex: 1, height: 1, background: darkMode ? "rgba(0,229,255,0.08)" : "rgba(37,99,235,0.12)" }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: darkMode ? "#fff" : "#111827", fontSize: "1.05rem" }}>
                  شناسایی نقطه خروج (Off-ramp)
                </h3>
                <p style={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.8 }}>
                  پیدا کردن صرافی یا کیفی که مجرم برای نقد کردن رمزارز استفاده کرده است. در بسیاری از موارد، صرافی‌های متمرکز (Binance، Bybit، OKX) نقطه خروج نهایی هستند و با گزارش فنی پاراهور می‌توان درخواست فریز حساب داد.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Binance", "Bybit", "OKX", "KuCoin", "Huobi"].map((ex) => (
                    <span
                      key={ex}
                      className="px-2.5 py-0.5 rounded text-xs"
                      style={{ background: darkMode ? "rgba(0,229,255,0.06)" : "#F1F5FF", border: darkMode ? "1px solid rgba(0,229,255,0.12)" : "1px solid rgba(37,99,235,0.14)", color: darkMode ? "rgba(0,229,255,0.5)" : "#1E3A8A", fontFamily: "monospace", fontWeight: 700 }}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Connector */}
            <div className="flex items-center justify-center -my-1" style={{ opacity: 1 }}>
              <div style={{ height: 24, width: 1, background: darkMode ? "linear-gradient(1270deg, rgba(0,229,255,0.1), rgb(0, 229, 255))" : "linear-gradient(180deg, rgba(37,99,235,0.16), rgba(37,99,235,0.58))", marginRight: "auto", marginLeft: "auto" }} />
            </div>

            {/* Card 3 */}
            <div
              className="glass-card p-7 flex items-start gap-6 group transition-all duration-300 border border-cyan-500/30 hover:border-cyan-500 bg-cyan-900/10 hover:bg-cyan-800/15 rounded-2xl"
              style={{ textAlign: "right", background: darkMode ? undefined : "#FFFFFF", borderColor: darkMode ? undefined : "rgba(37,99,235,0.16)", boxShadow: darkMode ? undefined : "0 8px 28px rgba(37,99,235,0.06)" }}
              onMouseEnter={(e) => { if (!darkMode) { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 34px rgba(37,99,235,0.10)"; e.currentTarget.style.borderColor = "rgba(37,99,235,0.28)"; } }}
              onMouseLeave={(e) => { if (!darkMode) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,99,235,0.06)"; e.currentTarget.style.borderColor = "rgba(37,99,235,0.16)"; } }}
            >
              <div
                className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: darkMode ? "rgba(0,229,255,0.06)" : "#EFF6FF", border: darkMode ? "1px solid rgba(0,229,255,0.2)" : "1px solid rgba(37,99,235,0.16)" }}
              >
                <IconShieldDoc darkMode={darkMode} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span style={{ fontFamily: "monospace", fontSize: "0.65rem", color: darkMode ? "rgba(0,229,255,0.4)" : "#1D4ED8", letterSpacing: "0.12em" }}>
                    STEP 03
                  </span>
                  <div style={{ flex: 1, height: 1, background: darkMode ? "rgba(0,229,255,0.08)" : "rgba(37,99,235,0.12)" }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: darkMode ? "#fff" : "#111827", fontSize: "1.05rem" }}>
                  گزارش فنی و مستندسازی
                </h3>
                <p style={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.8 }}>
                  ارائه ادله کاملاً فنی و دقیق برای پیگیری در مراجع قضایی بین‌المللی و داخلی. گزارش شامل نمودار جریان تراکنش، هش بلاک‌ها، تایم‌استمپ‌ها، و تمام زنجیره حضانت دیجیتال (Chain of Custody) می‌شود.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Chain of Custody", "INTERPOL Compatible", "Court Ready"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded text-xs"
                      style={{ background: darkMode ? "rgba(0,229,255,0.06)" : "#F1F5FF", border: darkMode ? "1px solid rgba(0,229,255,0.12)" : "1px solid rgba(37,99,235,0.14)", color: darkMode ? "rgba(0,229,255,0.5)" : "#1E3A8A", fontFamily: "monospace", fontWeight: 700 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    {/* ─── STATS BAND ─── */}
<div
  className="px-6 py-12 md:px-12"
  style={{
    background: darkMode ? "rgba(0,229,255,0.025)" : "#F4F8FF",
    borderTop: darkMode
      ? "1px solid rgba(0,229,255,0.07)"
      : "1px solid rgba(37,99,235,0.08)",
    borderBottom: darkMode
      ? "1px solid rgba(0,229,255,0.07)"
      : "1px solid rgba(37,99,235,0.08)",
  }}
>
  <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    {[
      {
        value: "+۳۰۰",
        label: "پرونده بسته‌شده",
      },
      {
        value: "۴.۵",
        unit: "M$",
        label: "دارایی ردیابی‌شده",
      },
      {
        value: "۱۴",
        label: "شبکه بلاک‌چین پشتیبانی",
      },
      {
        value: "۲",
        unit: "h",
        label: "میانگین پاسخ اولیه",
      },
    ].map(({ value, unit, label }) => (
      <div key={label}>
        <div
          className="font-black mb-1"
          style={{
            fontSize: "clamp(1.75rem, 3.8vw, 2.55rem)",
            color: darkMode ? "#00E5FF" : "#1D4ED8",

            // یک فونت ثابت و تمیز در هر دو مود
            fontFamily:
              "Inter, Vazirmatn, IRANSansX, Arial, sans-serif",

            fontWeight: 800,

            // فاصله حروف کمی فشرده ولی نه بیش از حد
            letterSpacing: "-0.025em",

            // اعداد مرتب و هم‌عرض
            fontVariantNumeric: "tabular-nums lining-nums",
            fontFeatureSettings: '"tnum" 1, "lnum" 1',

            lineHeight: 1.05,

            // جلوگیری از به‌هم‌ریختن ترکیب فارسی و لاتین
            direction: "ltr",
            unicodeBidi: "isolate",

            // ظاهر نرم‌تر
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          <span
            style={{
              display: "inline-block",
              verticalAlign: "baseline",
            }}
          >
            {value}
          </span>

         {unit && (
  <span
    style={{
      display: "inline-block",
      marginRight: "0.08em",
      marginLeft: "0.08em",
      fontSize: "1em",
      fontWeight: 700,
      letterSpacing: "-0.025em",
      opacity: 0.95,
      verticalAlign: "baseline",
    }}
  >
    {unit}
  </span>
)}
        </div>

        <div
          style={{
            color: darkMode ? "#94A3B8" : "#334155",
            fontSize: "0.78rem",
            fontWeight: 600,
            lineHeight: 1.7,
          }}
        >
          {label}
        </div>
      </div>
    ))}
  </div>
</div>

      {/* ─── BOTTOM CONVERSION AREA ─── */}
      <section className="px-6 py-20 md:px-12">
        <div className="max-w-2xl mx-auto">
          <div
            className="relative p-8 md:p-12 rounded-2xl text-center overflow-hidden"
            style={{
              background: darkMode ? "rgba(255,255,255,0.03)" : "#FFFFFF",
              border: darkMode ? "1px solid rgba(0,229,255,0.18)" : "1px solid rgba(37,99,235,0.16)",
              boxShadow: darkMode ? "0 0 60px rgba(0,229,255,0.06), 0 0 120px rgba(0,229,255,0.03), inset 0 0 60px rgba(0,229,255,0.02)" : "0 12px 40px rgba(37,99,235,0.07)",
            }}
          >
            {/* Corner accents */}
            <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, borderTop: "2px solid rgba(0,229,255,0.3)", borderRight: "2px solid rgba(0,229,255,0.3)", borderRadius: "0 16px 0 0" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: 60, height: 60, borderBottom: "2px solid rgba(0,229,255,0.3)", borderLeft: "2px solid rgba(0,229,255,0.3)", borderRadius: "0 0 0 16px" }} />

            <span
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem", color: darkMode ? "rgba(0,229,255,0.45)" : "#1D4ED8", letterSpacing: "0.2em", textTransform: "uppercase" }}
              className="block mb-4"
            >
              FREE INITIAL ASSESSMENT
            </span>

            <h2
              className="font-bold mb-4"
              style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.6rem)", color: darkMode ? "#fff" : "#111827", lineHeight: 1.5 }}
            >
              همین الان پرونده خود را<br />برای بررسی اولیه ارسال کنید.
            </h2>

            <p className="mb-8" style={{ color: "#606d7f", fontSize: "0.88rem", lineHeight: 1.8 }}>
              تیم فنی پاراهور پرونده شما را بدون هزینه ارزیابی اولیه می‌کند و امکان‌سنجی ردیابی را به شما اعلام می‌نماید.
            </p>

            <Link
             onClick={() => setCrisisOpen(true)}
              href="mailto:secure@parahoor.io"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold transition-all duration-300"
              style={{
                background: darkMode ? "#EF4444" : "#2563EB",
                color: "#ffffff",
                border: darkMode
                  ? "1px solid rgba(239, 68, 68, 0.6)"
                  : "1px solid rgba(37,99,235,0.6)",
                boxShadow: darkMode
                  ? "0 0 15px rgba(239,68,68,0.35)"
                  : "0 0 15px rgba(37,99,235,0.18)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 0 22px rgba(239,68,68,0.55)"
                  : "0 0 22px rgba(37,99,235,0.28)"

                if (!darkMode) {
                  e.currentTarget.style.background = "#3B82F6"
                  e.currentTarget.style.borderColor = "#3B82F6"
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 0 15px rgba(239,68,68,0.35)"
                  : "0 0 15px rgba(37,99,235,0.18)"

                if (!darkMode) {
                  e.currentTarget.style.background = "#2563EB"
                  e.currentTarget.style.borderColor = "rgba(37,99,235,0.6)"
                }
              }}
            >
              تکمیل فرم گزارش بحران
              <IconLink />
            </Link>

            {/* Modal */}
      {crisisOpen && (
        <EmergencyModal
          onClose={() => setCrisisOpen(false)}
        />
      )}


            <p className="mt-4 text-xs" style={{ color: "#606d7f" }}>
              بدون تعهد مالی • کاملاً محرمانه • پاسخ در کمتر از ۲ ساعت
            </p>
          </div>
        </div>
      </section>





























    </div>
  );
}




// animation

    //   {/* ─── SUPPORTED NETWORKS TICKER ─── */}
    //   <div
    //     className="overflow-hidden py-3"
    //     style={{
    //       background: "rgba(0,229,255,0.03)",
    //       borderTop: "1px solid rgba(0,229,255,0.08)",
    //       borderBottom: "1px solid rgba(0,229,255,0.08)",
    //     }}
    //   >
    //     <div
    //       className="flex items-center gap-8 whitespace-nowrap"
    //       style={{ animation: "ticker 22s linear infinite" }}
    //     >
    //       {["Bitcoin BTC", "Ethereum ETH", "USDT TRC20", "USDT ERC20", "Tron TRX", "BNB Chain", "Polygon MATIC", "Litecoin LTC",
    //         "Bitcoin BTC", "Ethereum ETH", "USDT TRC20", "USDT ERC20", "Tron TRX", "BNB Chain"].map((coin, i) => (
    //         <div key={i} className="flex items-center gap-2 flex-shrink-0">
    //           <span style={{ color: "rgba(0,229,255,0.25)", fontSize: "0.65rem" }}>◆</span>
    //           <span style={{ color: "#334155", fontSize: "0.72rem", fontFamily: "monospace", letterSpacing: "0.08em" }}>
    //             {coin}
    //           </span>
    //         </div>
    //       ))}
    //     </div>
    //     <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    //   </div>


     