"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import EmergencyModal from "@/components/CrisisReportForm";

/* ─── ICONS ─── */
const IconClose = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconMail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconTelegram = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 4.5L2.5 12l7 2.5" /><path d="M9.5 14.5l2.5 5 3-8" /><path d="M9.5 14.5l8-8" />
  </svg>
);
const IconHome = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconWarning = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const IconCrypto = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M9 8h4.5a1.5 1.5 0 010 3H9v3h5a1.5 1.5 0 010 3H9" />
    <line x1="12" y1="6" x2="12" y2="8" /><line x1="12" y1="18" x2="12" y2="20" />
  </svg>
);
const IconHack = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 17v4M16 17v4" /><path d="M7 10l2 2-2 2" /><line x1="12" y1="12" x2="15" y2="12" />
  </svg>
);
const IconExtort = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><circle cx="12" cy="17" r="0.5" fill="currentColor" />
  </svg>
);

/* ─── DISCONNECTED RADAR GRAPHIC ─── */
const RadarGraphic = ({ darkMode }: { darkMode: boolean }) => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => (n + 1) % 360), 40);
    return () => clearInterval(t);
  }, []);

  const sweepAngle = (tick * Math.PI) / 180;
  const sweepX = 160 + 130 * Math.cos(sweepAngle - Math.PI / 2);
  const sweepY = 160 + 130 * Math.sin(sweepAngle - Math.PI / 2);

  const accent = darkMode ? "0,229,255" : "30,58,138";

  return (
    <svg
      width="320" height="320" viewBox="0 0 320 320"
      style={{ filter: `drop-shadow(0 0 30px rgba(${accent},0.15))` }}
    >
      <defs>
        <radialGradient id="rg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`rgba(${accent},0.12)`} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="sweepGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`rgba(${accent},0.25)`} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <clipPath id="radarClip">
          <circle cx="160" cy="160" r="138" />
        </clipPath>
      </defs>

      {/* Outer glow fill */}
      <circle cx="160" cy="160" r="150" fill="url(#rg1)" />

      {/* Rings */}
      {[44, 88, 132].map((r) => (
        <circle key={r} cx="160" cy="160" r={r}
          fill="none" stroke={`rgba(${accent},${darkMode ? 0.12 : 0.22})`} strokeWidth="1"
          strokeDasharray={r < 88 ? "none" : "6 6"} />
      ))}

      {/* Outer ring — broken/disconnected */}
      <circle cx="160" cy="160" r="138"
        fill="none" stroke={`rgba(${accent},${darkMode ? 0.22 : 0.32})`} strokeWidth="1.5"
        strokeDasharray="20 8 60 8 20 180" />

      {/* Cross hairs */}
      <line x1="160" y1="22" x2="160" y2="298" stroke={`rgba(${accent},${darkMode ? 0.08 : 0.14})`} strokeWidth="1" />
      <line x1="22" y1="160" x2="298" y2="160" stroke={`rgba(${accent},${darkMode ? 0.08 : 0.14})`} strokeWidth="1" />

      {/* Sweep sector */}
      <g clipPath="url(#radarClip)">
        <path
          d={`M 160 160 L ${sweepX} ${sweepY} A 130 130 0 0 0 160 30 Z`}
          fill="url(#sweepGrad)"
          opacity="0.5"
          style={{ transform: `rotate(${tick}deg)`, transformOrigin: "160px 160px" }}
        />
      </g>

      {/* Sweep line */}
      <line
        x1="160" y1="160"
        x2={sweepX} y2={sweepY}
        stroke={`rgba(${accent},0.6)`} strokeWidth="1.5"
      />

      {/* Center dot */}
      <circle cx="160" cy="160" r="5" fill={darkMode ? "#00E5FF" : "#1E3A8A"} opacity="0.9" />
      <circle cx="160" cy="160" r="10" fill="none" stroke={`rgba(${accent},0.3)`} strokeWidth="1" />

      {/* Ghost / faded blip nodes — "lost" targets */}
      {[
        { cx: 210, cy: 100, r: 4, op: 0.35 },
        { cx: 90, cy: 190, r: 3, op: 0.2 },
        { cx: 240, cy: 200, r: 3.5, op: 0.25 },
      ].map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r={n.r + 6}
            fill="none" stroke={`rgba(${accent},0.15)`} strokeWidth="1" />
          <circle cx={n.cx} cy={n.cy} r={n.r}
            fill={`rgba(${accent},${n.op})`}
            stroke={`rgba(${accent},${n.op + 0.1})`} strokeWidth="1" />
        </g>
      ))}

      {/* Broken link marks — X cross at two ghost positions */}
      {[[90, 190], [240, 200]].map(([x, y], i) => (
        <g key={i} stroke={`rgba(239,68,68,${darkMode ? 0.45 : 0.55})`} strokeWidth="1.2" strokeLinecap="round">
          <line x1={x - 5} y1={y - 5} x2={x + 5} y2={y + 5} />
          <line x1={x + 5} y1={y - 5} x2={x - 5} y2={y + 5} />
        </g>
      ))}

      {/* 404 text stamped inside radar */}
      <text x="160" y="170" textAnchor="middle" dominantBaseline="middle"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="38" fontWeight="800" letterSpacing="-2"
        fill={`rgba(${accent},${darkMode ? 0.18 : 0.22})`}>
        404
      </text>
    </svg>
  );
};

/* ─── BACKGROUND GRID with broken nodes ─── */
const BrokenGridBg = ({ darkMode }: { darkMode: boolean }) => {
  const accent = darkMode ? "0,229,255" : "30,58,138";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid */}
      <div className="absolute inset-0" style={{
        backgroundSize: "52px 52px",
      }} />
      {/* Radial vignette */}
      <div className="absolute inset-0" style={{
        background: darkMode
          ? "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(10,17,40,0.8) 100%)"
          : "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(226,232,240,0.55) 100%)",
      }} />
      {/* Floating disconnected node lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: darkMode ? 0.18 : 0.3 }}>
        {/* Top-left cluster */}
        <line x1="60" y1="80" x2="160" y2="140" stroke={`rgb(${accent})`} strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="60" cy="80" r="3" fill={`rgba(${accent},0.4)`} />
        <circle cx="160" cy="140" r="2.5" fill={`rgba(${accent},0.3)`} />
        {/* Top-right */}
        <line x1="80%" y1="60" x2="70%" y2="140" stroke={`rgb(${accent})`} strokeWidth="1" strokeDasharray="3 10" />
        <circle r="3" fill={`rgba(${accent},0.35)`}><animate attributeName="cx" values="80%;80%" /><animate attributeName="cy" values="60;60" /></circle>
        {/* Bottom-left */}
        <line x1="40" y1="80%" x2="120" y2="72%" stroke={`rgb(${accent})`} strokeWidth="1" strokeDasharray="5 7" />
        {/* Bottom-right */}
        <line x1="88%" y1="78%" x2="78%" y2="88%" stroke={`rgb(${accent})`} strokeWidth="1" strokeDasharray="4 6" />
        {/* Red break marks */}
        <g stroke={`rgba(239,68,68,${darkMode ? 0.3 : 0.4})`} strokeWidth="1.5" strokeLinecap="round">
          <line x1="108" y1="137" x2="116" y2="145" /><line x1="116" y1="137" x2="108" y2="145" />
        </g>
      </svg>
    </div>
  );
};

/* ─── EMERGENCY MODAL ─── */
type Chip = { id: string; label: string; icon: React.ReactNode };
const chips: Chip[] = [
  { id: "crypto", label: "سرقت کریپتو", icon: <IconCrypto /> },
  { id: "hack", label: "هک و نفوذ", icon: <IconHack /> },
  { id: "extort", label: "مزاحمت و اخاذی", icon: <IconExtort /> },
];


/* ─── APP ─── */
export default function App() {
  const { darkMode } = useTheme();
  const [glitchTick, setGlitchTick] = useState(0);
    const [crisisOpen, setCrisisOpen] = useState(false);

  /* Subtle glitch counter for 404 number */
  useEffect(() => {
    const t = setInterval(() => setGlitchTick((n) => n + 1), 3200);
    return () => clearInterval(t);
  }, []);

  const isGlitch = glitchTick % 5 === 0;

  const accent = darkMode ? "0,229,255" : "30,58,138";
  const accentHex = darkMode ? "#00E5FF" : "#1E3A8A";
  const accentBright = darkMode ? "#00E5FF" : "#1D4ED8";

  return (
    <div className="min-h-screen flex flex-col"
      style={{
        background: darkMode ? "#0A1128" : "#FFFFFF",
        color: darkMode ? "#E2E8F0" : "#0F172A",
        fontFamily: "var(--font-vazirmatn), sans-serif",
        position: "relative",
      }}>

      {/* Background */}
      <BrokenGridBg darkMode={darkMode} />



      {/* ─── MAIN 404 CONTENT ─── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 text-center mt-6">

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-10 text-xs"
          style={{
            background: darkMode ? "rgba(239,68,68,0.08)" : "rgba(239,68,68,0.06)",
            border: darkMode ? "1px solid rgba(239,68,68,0.22)" : "1px solid rgba(239,68,68,0.28)",
            color: darkMode ? "rgba(239,68,68,0.8)" : "#B91C1C",
          }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#EF4444", display: "inline-block", boxShadow: "0 0 6px rgba(239,68,68,0.9)" }} />
          <span style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.18em" }}>
            ERROR 404 // NODE UNREACHABLE
          </span>
        </div>

        {/* Radar graphic */}
        <div className="mb-8 relative">
          {/* Ambient glow behind radar */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ borderRadius: "50%", background: `radial-gradient(circle, rgba(${accent},0.08) 0%, transparent 70%)`, transform: "scale(1.5)" }} />
          <RadarGraphic darkMode={darkMode} />
        </div>

        {/* Giant 404 */}
        <div className="relative mb-6 select-none" style={{ lineHeight: 1 }}>
          <span
            className="font-black"
            style={{
              fontSize: "clamp(5rem,18vw,10rem)",
              color: "transparent",
              WebkitTextStroke: isGlitch ? "1.5px rgba(239,68,68,0.6)" : `1.5px rgba(${accent},${darkMode ? 0.35 : 0.4})`,
              textShadow: isGlitch
                ? `0 0 40px rgba(239,68,68,0.2), 3px 0 0 rgba(${accent},0.15)`
                : darkMode
                  ? "0 0 60px rgba(0,229,255,0.25), 0 0 120px rgba(0,229,255,0.1)"
                  : "0 0 40px rgba(30,58,138,0.12)",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "-0.04em",
              transition: "all 0.08s ease",
              display: "block",
            }}
          >
            404
          </span>
          {/* Glitch duplicate — brief offset flash */}
          {isGlitch && (
            <span
              className="font-black absolute inset-0 pointer-events-none"
              style={{
                fontSize: "clamp(5rem,18vw,10rem)",
                color: "transparent",
                WebkitTextStroke: `1px rgba(${accent},0.2)`,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "-0.04em",
                transform: "translate(-3px, 1px)",
                opacity: 0.5,
              }}
            >
              404
            </span>
          )}
        </div>

        {/* H1 */}
        <h1 className="font-black mb-5"
          style={{
            fontSize: "clamp(1.3rem,3.5vw,2.2rem)",
            color: darkMode ? "#fff" : "#0F172A",
            lineHeight: 1.4,
            maxWidth: 600,
            textShadow: darkMode ? "0 0 40px rgba(0,229,255,0.1)" : "none",
          }}>
          مسیر مسدود است؛ اما{" "}
          <span style={{ color: accentHex }}>ردپاها پاک نمی‌شوند.</span>
        </h1>

        {/* Subtext */}
        <p className="mb-10 mx-auto"
          style={{ color: darkMode ? "#64748B" : "#475569", fontSize: "clamp(0.88rem,1.8vw,1.02rem)", lineHeight: 1.9, maxWidth: 500 }}>
          صفحه‌ای که در رادار جستجوی شماست یافت نشد. ممکن است لینک تغییر کرده باشد یا این بخش از سرورهای امنیتی پاراهور خارج شده باشد.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Home */}
          <Link href="/"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm transition-all"
            style={{
              background: "transparent",
              color: accentBright,
              border: darkMode ? "1px solid rgba(0,229,255,0.4)" : "1px solid rgba(30,58,138,0.4)",
              boxShadow: darkMode
                ? "0 0 16px rgba(0,229,255,0.07), inset 0 0 16px rgba(0,229,255,0.03)"
                : "0 4px 16px rgba(30,58,138,0.06)",
                 fontFamily: "var(--font-vazirmatn), sans-serif",
              fontSize: "0.95rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = darkMode ? "rgba(0,229,255,0.09)" : "rgba(30,58,138,0.07)";
              (e.currentTarget as HTMLElement).style.boxShadow = darkMode ? "0 0 28px rgba(0,229,255,0.18)" : "0 8px 22px rgba(30,58,138,0.14)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.boxShadow = darkMode ? "0 0 16px rgba(0,229,255,0.07)" : "0 4px 16px rgba(30,58,138,0.06)";
              (e.currentTarget as HTMLElement).style.transform = "none";
            }}>
            <IconHome />
            بازگشت به پایگاه اصلی
          </Link>

          {/* Emergency */}
          <button
          onClick={() => setCrisisOpen(true)}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm transition-all"
            style={{
              background: "#EF4444",
              color: "#fff",
              border: "1px solid rgba(239,68,68,0.55)",
              boxShadow: darkMode
                ? "0 0 20px rgba(239,68,68,0.28), 0 0 50px rgba(239,68,68,0.1)"
                : "0 8px 28px rgba(239,68,68,0.20)",
                            fontFamily: "var(--font-vazirmatn), sans-serif",
              fontSize: "0.95rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = darkMode
                ? "0 0 36px rgba(239,68,68,0.5), 0 0 80px rgba(239,68,68,0.18)"
                : "0 10px 32px rgba(239,68,68,0.28)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = darkMode
                ? "0 0 20px rgba(239,68,68,0.28), 0 0 50px rgba(239,68,68,0.1)"
                : "0 8px 28px rgba(239,68,68,0.20)";
              (e.currentTarget as HTMLElement).style.transform = "none";
            }}>
            <IconWarning />
            گزارش اورژانسی حادثه
          </button>
        </div>

        {/* Quick nav hints */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10">
          {[
            { label: "خدمات ما", href: "/services" },
            { label: "پایگاه دانش", href: "/blogs" },
            { label: "تماس با ما", href: "/contact" },
          ].map(({ label, href }) => (
            <Link key={href} href={href}
              className="flex items-center gap-1.5 text-xs transition-colors"
              style={{ color: darkMode ? "#747e8c" : "#64748B", fontFamily: "monospace" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = accentBright)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = darkMode ? "#747e8c" : "#64748B")}>
              <span style={{ opacity: 0.4 }}>//</span>
              {label}
            </Link>
          ))}
        </div>

        {/* Terminal-style status line */}
        <div className="mt-12 px-5 py-3 rounded-xl"
          style={{
            background: darkMode ? "rgba(6,11,28,0.8)" : "#F8FAFC",
            border: darkMode ? "1px solid rgba(0,229,255,0.08)" : "1px solid rgba(30,58,138,0.10)",
            fontFamily: "monospace",
            fontSize: "0.68rem",
            color: darkMode ? "#1E293B" : "#94A3B8",
          }}>
          <span style={{ color: darkMode ? "rgba(0,229,255,0.3)" : "rgba(30,58,138,0.45)" }}>$</span>{" "}
          <span style={{ color: darkMode ? "rgba(239,68,68,0.4)" : "rgba(185,28,28,0.55)" }}>ERROR</span>{" "}
          parahoor.io/[path] — 404 Not Found{" "}
          <span style={{ color: darkMode ? "rgba(0,229,255,0.25)" : "rgba(30,58,138,0.35)" }}>// trace: null // node: disconnected</span>
        </div>
      </main>

      {crisisOpen && <EmergencyModal onClose={() => setCrisisOpen(false)} />}

  
    </div>
  );
}
