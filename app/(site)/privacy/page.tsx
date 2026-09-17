"use client"
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useTheme } from "../../../components/ThemeProvider";

/* ─── SHARED ─── */
const PulseDot = ({ size = 7, color = "#00E5FF" }: { size?: number; color?: string }) => (
  <span style={{ display: "inline-block", width: size, height: size, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}cc`, flexShrink: 0 }} />
);

/* ─── ICONS ─── */
const IconClose = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconTelegram = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 4.5L2.5 12l7 2.5" /><path d="M9.5 14.5l2.5 5 3-8" /><path d="M9.5 14.5l8-8" />
  </svg>
);
const IconShieldLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <rect x="9" y="11" width="6" height="5" rx="1" />
    <path d="M10 11V9a2 2 0 014 0v2" />
  </svg>
);
const IconInfo = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="2.5" />
  </svg>
);
const IconScale = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="21" /><path d="M5 21h14" /><path d="M3 6l3 6c0 1.657-1.343 3-3 3s-3-1.343-3-3l3-6z" transform="translate(6,0)" />
    <path d="M3 6l3 6c0 1.657-1.343 3-3 3s-3-1.343-3-3l3-6z" transform="translate(12,0)" />
  </svg>
);
const IconNoShare = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeDasharray="4 3" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeDasharray="4 3" />
    <line x1="5" y1="5" x2="19" y2="19" stroke="#EF4444" strokeWidth="2" />
  </svg>
);
const IconServer = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="3" /><line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="3" />
  </svg>
);
const IconChevronLeft = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

/* ─── SECTION DATA ─── */
const sections = [
  { id: "s1", num: "۱", label: "جمع‌آوری داده‌ها", icon: <IconShieldLock /> },
  { id: "s2", num: "۲", label: "مرزبندی حقوقی", icon: <IconScale /> },
  { id: "s3", num: "۳", label: "عدم اشتراک‌گذاری", icon: <IconNoShare /> },
  { id: "s4", num: "۴", label: "امنیت سایبری سایت", icon: <IconServer /> },
];

/* ─── EMERGENCY MODAL ─── */
const EmergencyModal = ({ onClose }: { onClose: () => void }) => {
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(4,8,20,0.92)", backdropFilter: "blur(20px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-md relative overflow-hidden"
        style={{ background: "linear-gradient(160deg,rgba(10,17,42,0.99),rgba(6,11,28,0.99))", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 18, boxShadow: "0 0 80px rgba(0,229,255,0.06),0 40px 100px rgba(0,0,0,0.7)" }}>
        <div style={{ height: 2, background: "linear-gradient(90deg,transparent,rgba(0,229,255,0.7),transparent)" }} />
        <div className="px-6 pt-5 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-base" style={{ color: "#fff" }}>فرم اورژانسی گزارش بحران</h3>
            <button onClick={onClose} style={{ color: "#475569" }}><IconClose /></button>
          </div>
          {sent ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-full" style={{ background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
              </div>
              <p className="font-bold text-sm mb-2" style={{ color: "#fff" }}>گزارش ثبت شد</p>
              <button onClick={onClose} className="mt-4 px-6 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#475569" }}>بستن</button>
            </div>
          ) : (
            <>
              <p className="mb-4 text-xs" style={{ color: "#475569", lineHeight: 1.75 }}>اطلاعات شما با بالاترین سطح رمزنگاری برای کارآگاهان ارشد پاراهور ارسال می‌شود.</p>
              <div className="space-y-3">
                <textarea rows={3} placeholder="شرح مختصر حادثه..." className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ background: "#060B19", border: "1px solid rgba(0,229,255,0.1)", color: "#E2E8F0", fontFamily: "Vazirmatn,sans-serif" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.35)")} onBlur={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.1)")} />
                <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="شماره موبایل یا @ID تلگرام"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "#060B19", border: "1px solid rgba(0,229,255,0.1)", color: "#E2E8F0", fontFamily: "Vazirmatn,sans-serif" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.35)")} onBlur={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.1)")} />
              </div>
              <button onClick={() => contact.trim() && setSent(true)} className="w-full mt-4 py-3.5 rounded-xl font-bold text-sm"
                style={{ background: "#EF4444", color: "#fff", border: "1px solid rgba(239,68,68,0.5)", boxShadow: "0 0 20px rgba(239,68,68,0.25)", fontFamily: "Vazirmatn,sans-serif" }}>
                ثبت امن گزارش و درخواست تماس
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── APP ─── */
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("s1");
  const [tocOpen, setTocOpen] = useState(false);
  const { darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Existing dark mode remains unchanged. Light-mode styling is fully scoped.
  const isDark = !mounted || darkMode;

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  /* Scroll spy */
  useEffect(() => {
    const handler = () => {
      let current = "s1";
      sections.forEach(({ id }) => {
        const el = sectionRefs.current[id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) current = id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setTocOpen(false);
  };

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  /* Legal text helpers */
  const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p style={{ color: "#94A3B8", fontSize: "clamp(0.88rem,1.7vw,0.97rem)", lineHeight: 2, marginBottom: 18 }}>{children}</p>
  );
  const H2 = ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h2 id={id} className="font-bold"
      style={{ color: "#fff", fontSize: "clamp(1.05rem,2.2vw,1.3rem)", lineHeight: 1.4, marginBottom: 14, marginTop: 8 }}>
      {children}
    </h2>
  );
  const H3 = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-semibold" style={{ color: "#E2E8F0", fontSize: "clamp(0.95rem,1.9vw,1.05rem)", lineHeight: 1.5, marginBottom: 10, marginTop: 24 }}>
      {children}
    </h3>
  );
  const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span style={{ color: "#E2E8F0", fontWeight: 600 }}>{children}</span>
  );
  const CyanText = ({ children }: { children: React.ReactNode }) => (
    <span style={{ color: "#00E5FF", fontWeight: 600 }}>{children}</span>
  );
  const Divider = () => (
    <div style={{ height: 1, background: "linear-gradient(90deg,rgba(0,229,255,0.15),rgba(0,229,255,0.04),transparent)", margin: "32px 0" }} />
  );

  /* Callout box */
  const Callout = ({ color = "cyan", icon, children }: { color?: "cyan" | "amber" | "violet" | "green"; icon: React.ReactNode; children: React.ReactNode }) => {
    const colors = {
      cyan: { bg: "rgba(0,229,255,0.05)", border: "rgba(0,229,255,0.2)", bar: "#00E5FF" },
      amber: { bg: "rgba(245,158,11,0.05)", border: "rgba(245,158,11,0.2)", bar: "#F59E0B" },
      violet: { bg: "rgba(167,139,250,0.06)", border: "rgba(167,139,250,0.2)", bar: "#A78BFA" },
      green: { bg: "rgba(34,197,94,0.05)", border: "rgba(34,197,94,0.18)", bar: "#22C55E" },
    };
    const c = colors[color];
    return (
      <div className="relative overflow-hidden rounded-xl mb-6"
        style={{ background: c.bg, border: `1px solid ${c.border}`, padding: "18px 20px 18px 20px" }}>
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 3, background: c.bar, borderRadius: "0 6px 6px 0" }} />
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">{icon}</div>
          <div style={{ color: "#94A3B8", fontSize: "0.85rem", lineHeight: 1.85 }}>{children}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>سیاست حفظ حریم خصوصی و رازداری | پاراهور</title>
        <meta name="description" content="سیاست حفظ حریم خصوصی، رازداری و امنیت داده‌های کاربران پاراهور." />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content={isDark ? "#0A1128" : "#1E3A8A"} />
        <meta property="og:title" content="سیاست حفظ حریم خصوصی و رازداری | پاراهور" />
        <meta property="og:description" content="سیاست حفظ حریم خصوصی، رازداری و امنیت داده‌های کاربران پاراهور." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fa_IR" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="سیاست حفظ حریم خصوصی و رازداری | پاراهور" />
        <meta name="twitter:description" content="سیاست حفظ حریم خصوصی، رازداری و امنیت داده‌های کاربران پاراهور." />
      </Head>

    <div className="min-h-full privacy-page" data-theme={isDark ? "dark" : "light"}
      style={{
        background: "#0A1128", color: "#E2E8F0", fontFamily: "Vazirmatn, sans-serif",
        backgroundImage: "linear-gradient(rgba(0,229,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.025) 1px,transparent 1px)",
        backgroundSize: "52px 52px",
      }}>
      {modalOpen && <EmergencyModal onClose={() => setModalOpen(false)} />}

    

      {/* ─── PAGE HEADER ─── */}
      <header className="relative px-6 pt-16 pb-14 md:px-12 md:pt-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,229,255,0.05) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <a href="#" style={{ color: "#334155", fontSize: "0.75rem" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#00E5FF")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#334155")}>خانه</a>
            <IconChevronLeft />
            <span style={{ color: "#00E5FF", fontSize: "0.75rem" }}>حریم خصوصی</span>
          </div>

          <div className="flex items-start gap-4 mb-5">
            <div className="flex-shrink-0 mt-1 flex items-center justify-center w-12 h-12 rounded-xl"
              style={{ background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)" }}>
              <IconShieldLock />
            </div>
            <div>
              <h1 className="font-black leading-snug"
                style={{ fontSize: "clamp(1.5rem,4vw,2.4rem)", color: "#fff", textShadow: "0 0 50px rgba(0,229,255,0.1)", lineHeight: 1.35 }}>
                سیاست حفظ حریم خصوصی<br />و رازداری مطلق
              </h1>
            </div>
          </div>

          <p className="mb-5 max-w-2xl" style={{ color: "#64748B", fontSize: "clamp(0.9rem,1.8vw,1rem)", lineHeight: 1.85 }}>
            حفاظت از هویت و داده‌های حساس شما، خط قرمز تیم عملیاتی پاراهور است.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#334155" }}>آخرین به‌روزرسانی:</span>
              <span style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#475569", fontWeight: 600 }}>شهریور ۱۴۰۵</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
              <span style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#22C55E" }}>نسخه ۲.۱ — معتبر</span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── TWO-COLUMN LAYOUT ─── */}
      <div className="px-6 pb-20 md:px-12">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-start">

          {/* ── RIGHT: TABLE OF CONTENTS (sticky) ── */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* Mobile TOC toggle */}
            <button className="lg:hidden w-full flex items-center justify-between px-4 py-3 rounded-xl mb-2 text-sm font-semibold"
              style={{ background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.18)", color: "#00E5FF" }}
              onClick={() => setTocOpen(!tocOpen)}>
              فهرست مطالب
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: tocOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div className={`lg:block ${tocOpen ? "block" : "hidden"}`}>
              <div className="lg:sticky rounded-2xl overflow-hidden"
                style={{ top: 88, background: "rgba(6,11,28,0.9)", border: "1px solid rgba(0,229,255,0.12)", backdropFilter: "blur(14px)" }}>
                {/* TOC header */}
                <div className="px-5 py-4 flex items-center gap-2.5"
                  style={{ borderBottom: "1px solid rgba(0,229,255,0.08)", background: "rgba(0,229,255,0.04)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="15" y2="18" />
                  </svg>
                  <span style={{ fontFamily: "monospace", fontSize: "0.62rem", color: "rgba(0,229,255,0.5)", letterSpacing: "0.14em" }}>TABLE OF CONTENTS</span>
                </div>

                <nav className="p-3">
                  {sections.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                      <button key={sec.id} onClick={() => scrollTo(sec.id)}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-right transition-all duration-200 mb-1"
                        style={{
                          background: isActive ? "rgba(0,229,255,0.1)" : "transparent",
                          border: isActive ? "1px solid rgba(0,229,255,0.25)" : "1px solid transparent",
                          color: isActive ? "#00E5FF" : "#475569",
                          fontFamily: "Vazirmatn,sans-serif",
                        }}
                        onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.color = "#94A3B8"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; } }}
                        onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.color = "#475569"; (e.currentTarget as HTMLElement).style.background = "transparent"; } }}>
                        <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: isActive ? "rgba(0,229,255,0.6)" : "#1E293B", flexShrink: 0, width: 18 }}>{sec.num}.</span>
                        <span style={{ lineHeight: 1.4, textAlign: "right" }}>{sec.label}</span>
                        {isActive && <span style={{ marginRight: "auto", flexShrink: 0 }}><PulseDot size={5} /></span>}
                      </button>
                    );
                  })}
                </nav>

                {/* Reading progress */}
                <div className="px-5 pb-4 pt-2" style={{ borderTop: "1px solid rgba(0,229,255,0.06)" }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span style={{ fontFamily: "monospace", fontSize: "0.58rem", color: "#1E293B" }}>پیشرفت مطالعه</span>
                    <span style={{ fontFamily: "monospace", fontSize: "0.58rem", color: "rgba(0,229,255,0.35)" }}>
                      {Math.round(((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full rounded-full overflow-hidden" style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%`,
                        background: "linear-gradient(90deg, #00E5FF, rgba(0,229,255,0.4))",
                      }} />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ── LEFT: CONTENT ── */}
          <main className="flex-1 min-w-0">

            {/* ── SECTION 1 ── */}
            <section ref={setRef("s1")} id="s1" className="mb-2">
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: 3, height: 28, background: "linear-gradient(180deg,#00E5FF,rgba(0,229,255,0.1))", borderRadius: 2 }} />
                <div>
                  <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(0,229,255,0.4)", letterSpacing: "0.15em", display: "block", marginBottom: 3 }}>SECTION 01</span>
                  <H2>جمع‌آوری و نگهداری داده‌ها</H2>
                </div>
              </div>

              <Callout color="cyan" icon={<IconShieldLock />}>
                <strong style={{ color: "#E2E8F0" }}>خلاصه اجرایی: </strong>
                تمامی داده‌های ارسال‌شده رمزنگاری سرتاسری می‌شوند و پس از اتمام تحقیقات از سرورهای آنلاین پاک می‌گردند.
              </Callout>

              <Paragraph>
                تمامی لاگ‌ها، آدرس‌های ولت و مستنداتی که از طریق فرم گزارش بحران ارسال می‌شوند، تحت <Highlight>رمزنگاری پیشرفته (End-to-End)</Highlight> قرار می‌گیرند. هیچ داده‌ای به صورت متن ساده روی سرورهای پاراهور ذخیره نمی‌شود.
              </Paragraph>

              <Paragraph>
                داده‌های حساسِ پرونده‌های فارنزیک پس از اتمام تحقیقات، به صورت کامل از سرورهای آنلاین پاک شده و تنها در <Highlight>آرشیو آفلاین امن</Highlight> نگهداری می‌شوند. دسترسی به این آرشیو محدود به کارآگاهان ارشد مرتبط با پرونده است.
              </Paragraph>

              <H3>داده‌هایی که جمع‌آوری می‌شوند:</H3>
              <ul className="space-y-2 mb-5" style={{ color: "#64748B", fontSize: "0.88rem", lineHeight: 1.9 }}>
                {[
                  "اطلاعات تماس داوطلبانه (شماره یا آیدی تلگرام)",
                  "مستندات فنی مرتبط با پرونده (لاگ، هش تراکنش، آدرس کیف پول)",
                  "شرح حادثه ارائه‌شده توسط مراجعه‌کننده",
                  "داده‌های فنی لازم برای تحلیل بلاک‌چین",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 4 }}><polyline points="20 6 9 17 4 12" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <H3>داده‌هایی که جمع‌آوری نمی‌شوند:</H3>
              <ul className="space-y-2 mb-5" style={{ color: "#64748B", fontSize: "0.88rem", lineHeight: 1.9 }}>
                {[
                  "کوکی‌های تبلیغاتی یا ردیابی رفتار کاربر",
                  "اطلاعات مالی یا بانکی مراجعین",
                  "داده‌های بیومتریک یا شناسایی هویت دیجیتال",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 4 }}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <Divider />

            {/* ── SECTION 2 ── */}
            <section ref={setRef("s2")} id="s2" className="mb-2">
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: 3, height: 28, background: "linear-gradient(180deg,#A78BFA,rgba(167,139,250,0.1))", borderRadius: 2 }} />
                <div>
                  <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(167,139,250,0.5)", letterSpacing: "0.15em", display: "block", marginBottom: 3 }}>SECTION 02</span>
                  <H2>مرزبندی خدمات و سلب مسئولیت حقوقی</H2>
                </div>
              </div>

              <Callout color="violet" icon={<IconScale />}>
                <strong style={{ color: "#E2E8F0" }}>نکته مهم: </strong>
                پاراهور آژانس تحقیقات فنی است، نه دفتر وکالت. گزارش‌های ما ابزار شماست، نه جایگزین وکیل.
              </Callout>

              <Paragraph>
                آژانس پاراهور با بهره‌گیری از مشاوره مستمر وکلای پایه یک دادگستری از جمله جناب آقای{" "}
                <CyanText>علیرضا طباطبایی</CyanText>{" "}
                فعالیت می‌کند تا اطمینان حاصل شود تمامی ادله دیجیتالِ استخراج‌شده، دارای بالاترین اعتبار و <Highlight>استنادپذیری در محاکم قضایی</Highlight> هستند.
              </Paragraph>

              <Paragraph>
                با این وجود، پاراهور صرفاً یک <Highlight>«آژانس تحقیقات خصوصی و کشف ادله فنی»</Highlight> است. ما مستقیماً خدمات نمایندگی حقوقی، وکالت در دادگاه یا برگزاری کمپین‌های اقدام قضایی دسته‌جمعی را ارائه نمی‌دهیم.
              </Paragraph>

              <Paragraph>
                پس از تکمیل گزارش فنی، <Highlight>پیگیری قضایی بر عهده شخص شاکی یا وکیل قانونی وی</Highlight> خواهد بود. پاراهور در این مرحله می‌تواند به عنوان کارشناس فنی در دادگاه حاضر شود یا توضیحات تکمیلی ارائه دهد.
              </Paragraph>

              <div className="p-5 rounded-xl mt-2 mb-4"
                style={{ background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.15)" }}>
                <div className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <p style={{ color: "#64748B", fontSize: "0.83rem", lineHeight: 1.85 }}>
                    <strong style={{ color: "#F59E0B" }}>سلب مسئولیت: </strong>
                    اطلاعات ارائه‌شده در این وبسایت و گزارش‌های پاراهور جنبه مشاوره حقوقی ندارند. برای هرگونه اقدام قانونی الزاماً با وکیل دادگستری مجاز مشورت نمایید.
                  </p>
                </div>
              </div>
            </section>

            <Divider />

            {/* ── SECTION 3 ── */}
            <section ref={setRef("s3")} id="s3" className="mb-2">
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: 3, height: 28, background: "linear-gradient(180deg,#22C55E,rgba(34,197,94,0.1))", borderRadius: 2 }} />
                <div>
                  <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(34,197,94,0.5)", letterSpacing: "0.15em", display: "block", marginBottom: 3 }}>SECTION 03</span>
                  <H2>عدم اشتراک‌گذاری اطلاعات با اشخاص ثالث</H2>
                </div>
              </div>

              <Callout color="green" icon={<IconNoShare />}>
                <strong style={{ color: "#E2E8F0" }}>تعهد پاراهور: </strong>
                اطلاعات شما هرگز فروخته، اجاره داده یا با اشخاص ثالث به اشتراک گذاشته نمی‌شود.
              </Callout>

              <Paragraph>
                اطلاعات مراجعین به هیچ <Highlight>نهاد ثالث، شرکت تبلیغاتی یا سازمان تجاری</Highlight> فروخته یا واگذار نمی‌شود. پاراهور هیچ‌گونه شراکت تجاری‌ای که مستلزم اشتراک‌گذاری داده کاربران باشد ندارد.
              </Paragraph>

              <Paragraph>
                ارائه اطلاعات به مراجع ذی‌صلاح قانونی تنها با <Highlight>حکم رسمی قضایی</Highlight> امکان‌پذیر است. در صورت دریافت چنین حکمی، مراجعه‌کننده مربوطه در صورت امکان قانونی از این موضوع مطلع خواهد شد.
              </Paragraph>

              {/* Table */}
              <div className="rounded-xl overflow-hidden mt-4 mb-2"
                style={{ border: "1px solid rgba(0,229,255,0.1)" }}>
                <div className="px-5 py-3" style={{ background: "rgba(0,229,255,0.04)", borderBottom: "1px solid rgba(0,229,255,0.08)" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.62rem", color: "rgba(0,229,255,0.4)", letterSpacing: "0.12em" }}>
                    خلاصه سیاست اشتراک‌گذاری
                  </span>
                </div>
                {[
                  { entity: "شرکت‌های تبلیغاتی", status: "هرگز", color: "#EF4444" },
                  { entity: "سرویس‌های تحلیل وب", status: "هرگز", color: "#EF4444" },
                  { entity: "شرکای تجاری", status: "هرگز", color: "#EF4444" },
                  { entity: "مراجع قضایی (با حکم)", status: "در صورت الزام قانونی", color: "#F59E0B" },
                  { entity: "وکیل منتخب مراجعه‌کننده", status: "با اجازه صریح", color: "#22C55E" },
                ].map(({ entity, status, color }) => (
                  <div key={entity} className="flex items-center justify-between px-5 py-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ color: "#475569", fontSize: "0.82rem" }}>{entity}</span>
                    <span style={{ color, fontSize: "0.75rem", fontWeight: 600 }}>{status}</span>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ── SECTION 4 ── */}
            <section ref={setRef("s4")} id="s4" className="mb-2">
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: 3, height: 28, background: "linear-gradient(180deg,#00E5FF,rgba(0,229,255,0.1))", borderRadius: 2 }} />
                <div>
                  <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(0,229,255,0.4)", letterSpacing: "0.15em", display: "block", marginBottom: 3 }}>SECTION 04</span>
                  <H2>امنیت سایبری وبسایت</H2>
                </div>
              </div>

              <Paragraph>
                وبسایت پاراهور از پروتکل <CyanText>HTTPS/TLS 1.3</CyanText> برای تمامی ارتباطات استفاده می‌کند. تمامی فرم‌های ارتباطی از طریق کانال‌های رمزنگاری‌شده به سرورهای امن ارسال می‌شوند.
              </Paragraph>

              <Paragraph>
                این وبسایت از <Highlight>کوکی‌های ضروری فنی</Highlight> برای عملکرد صحیح استفاده می‌کند. هیچ‌گونه کوکی ردیابی رفتار یا تبلیغاتی در این وبسایت فعال نیست. استفاده از سرویس‌های تحلیل آمار وبسایت تنها به صورت ناشناس و بدون ذخیره اطلاعات شخصی انجام می‌شود.
              </Paragraph>

              <Callout color="cyan" icon={<IconInfo />}>
                در صورت مشاهده هرگونه رفتار مشکوک یا آسیب‌پذیری امنیتی در این وبسایت، لطفاً از طریق ایمیل{" "}
                <span style={{ color: "#00E5FF", fontFamily: "monospace" }}>security@parahoor.io</span>{" "}
                گزارش دهید.
              </Callout>
            </section>

            <Divider />

            {/* ── CONTACT FOR PRIVACY ── */}
            <section className="relative overflow-hidden rounded-2xl p-8"
              style={{
                background: "rgba(6,11,28,0.8)",
                border: "1px solid rgba(0,229,255,0.18)",
                boxShadow: "0 0 50px rgba(0,229,255,0.05), inset 0 0 30px rgba(0,229,255,0.02)",
                backdropFilter: "blur(10px)",
              }}>
              {/* Corner accents */}
              <div style={{ position: "absolute", top: 0, right: 0, width: 40, height: 40, borderTop: "1.5px solid rgba(0,229,255,0.3)", borderRight: "1.5px solid rgba(0,229,255,0.3)", borderRadius: "0 14px 0 0", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, width: 40, height: 40, borderBottom: "1.5px solid rgba(0,229,255,0.3)", borderLeft: "1.5px solid rgba(0,229,255,0.3)", borderRadius: "0 0 0 14px", pointerEvents: "none" }} />

              <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(0,229,255,0.4)", letterSpacing: "0.18em" }} className="block mb-4">
                LEGAL DEPARTMENT // PRIVACY CONTACT
              </span>

              <h3 className="font-bold mb-3" style={{ color: "#fff", fontSize: "clamp(0.98rem,2.2vw,1.2rem)", lineHeight: 1.45 }}>
                سوال درباره امنیت داده‌های خود دارید؟
              </h3>
              <p className="mb-6" style={{ color: "#475569", fontSize: "0.85rem", lineHeight: 1.85 }}>
                در صورت داشتن هرگونه سوال در خصوص امنیت داده‌های خود، با دپارتمان حقوقی پاراهور در تماس باشید.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                  style={{ background: "transparent", border: "1px solid rgba(0,229,255,0.4)", color: "#00E5FF", boxShadow: "0 0 16px rgba(0,229,255,0.06), inset 0 0 16px rgba(0,229,255,0.03)", fontFamily: "Vazirmatn,sans-serif" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,229,255,0.09)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(0,229,255,0.18)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(0,229,255,0.06)"; }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                  تماس با دپارتمان حقوقی
                </button>

                <div className="flex items-center gap-2.5 text-xs" style={{ color: "#334155" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(0,229,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>legal@parahoor.io</span>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>

      <style jsx global>{`
        /* LIGHT MODE ONLY — dark mode styles above are not modified. */
        [data-theme="light"].privacy-page {
          background-color: #FFFFFF !important;
          color: #172033 !important;
          background-image:
            linear-gradient(rgba(30,58,138,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,58,138,0.035) 1px, transparent 1px) !important;
        }

        [data-theme="light"].privacy-page header > div:first-child {
          background: radial-gradient(ellipse 60% 50% at 50% 30%, rgba(30,58,138,0.07) 0%, transparent 70%) !important;
        }

        /* Main page title + all headings use the supplied deep blue. */
        [data-theme="light"].privacy-page h1,
        [data-theme="light"].privacy-page h2,
        [data-theme="light"].privacy-page h3 {
          color: #1E3A8A !important;
          text-shadow: 0 2px 12px rgba(30,58,138,0.10) !important;
        }

        /* Darker body copy for comfortable reading. */
        [data-theme="light"].privacy-page p,
        [data-theme="light"].privacy-page li {
          color: #334155 !important;
        }

        [data-theme="light"].privacy-page strong,
        [data-theme="light"].privacy-page b {
          color: #172554 !important;
          font-weight: 800;
        }

        [data-theme="light"].privacy-page a {
          color: #334155 !important;
          transition: color 180ms ease, text-shadow 180ms ease;
        }

        [data-theme="light"].privacy-page a:hover {
          color: #1E3A8A !important;
          text-shadow: 0 3px 12px rgba(30,58,138,0.18);
        }

        /* TABLE OF CONTENTS — always deep blue in light mode. */
        [data-theme="light"].privacy-page .table-of-contents,
        [data-theme="light"].privacy-page [id*="table-of-contents"],
        [data-theme="light"].privacy-page [class*="table-of-contents"],
        [data-theme="light"].privacy-page [class*="toc"] {
          color: #1E3A8A !important;
        }

        [data-theme="light"].privacy-page .table-of-contents *,
        [data-theme="light"].privacy-page [id*="table-of-contents"] *,
        [data-theme="light"].privacy-page [class*="table-of-contents"] *,
        [data-theme="light"].privacy-page [class*="toc"] * {
          color: #1E3A8A !important;
        }

        /* Replace cyan / sky-blue accents with the supplied deep blue. */
        [data-theme="light"].privacy-page [style*="#00E5FF"],
        [data-theme="light"].privacy-page [style*="#00e5ff"],
        [data-theme="light"].privacy-page [style*="rgba(0,229,255"] {
          color: #1E3A8A !important;
          stroke: #1E3A8A !important;
          border-color: rgba(30,58,138,0.24) !important;
        }

        [data-theme="light"].privacy-page [style*="linear-gradient(180deg,#00E5FF"],
        [data-theme="light"].privacy-page [style*="linear-gradient(90deg, #00E5FF"] {
          background: #1E3A8A !important;
        }

        [data-theme="light"].privacy-page [style*="rgba(0,229,255,0.025)"] {
          background-image: none !important;
        }

        /* Any Tailwind cyan / sky text becomes the dark brand blue. */
        [data-theme="light"].privacy-page [class*="text-cyan-"],
        [data-theme="light"].privacy-page [class*="text-sky-"],
        [data-theme="light"].privacy-page [class*="text-blue-300"],
        [data-theme="light"].privacy-page [class*="text-blue-400"],
        [data-theme="light"].privacy-page [class*="text-violet-"] {
          color: #1E3A8A !important;
        }

        /* Light cards: white surface + deep-blue glow. */
        [data-theme="light"].privacy-page .rounded-2xl[style*="rgba(6,11,28"],
        [data-theme="light"].privacy-page .rounded-xl[style*="rgba(6,11,28"] {
          background: #FFFFFF !important;
          border-color: rgba(30,58,138,0.18) !important;
          box-shadow:
            0 14px 40px rgba(30,58,138,0.10),
            0 3px 12px rgba(30,58,138,0.06) !important;
          backdrop-filter: none !important;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease !important;
        }

        [data-theme="light"].privacy-page .rounded-2xl[style*="rgba(6,11,28"]:hover,
        [data-theme="light"].privacy-page .rounded-xl[style*="rgba(6,11,28"]:hover {
          transform: translateY(-2px);
          border-color: rgba(30,58,138,0.34) !important;
          box-shadow:
            0 22px 50px rgba(30,58,138,0.16),
            0 6px 18px rgba(30,58,138,0.10) !important;
        }

        /* White translucent dark-mode surfaces become clean light surfaces. */
        [data-theme="light"].privacy-page [style*="rgba(255,255,255,0.03)"],
        [data-theme="light"].privacy-page [style*="rgba(255,255,255,0.04)"],
        [data-theme="light"].privacy-page [style*="rgba(255,255,255,0.05)"],
        [data-theme="light"].privacy-page [style*="rgba(255,255,255,0.07)"] {
          background: #FFFFFF !important;
          border-color: rgba(30,58,138,0.12) !important;
        }

        /* Text colors that were too pale in light mode. */
        [data-theme="light"].privacy-page [style*="#94A3B8"] { color: #475569 !important; }
        [data-theme="light"].privacy-page [style*="#64748B"] { color: #334155 !important; }
        [data-theme="light"].privacy-page [style*="#475569"] { color: #334155 !important; }
        [data-theme="light"].privacy-page [style*="#334155"] { color: #334155 !important; }
        [data-theme="light"].privacy-page [style*="#E2E8F0"] { color: #172033 !important; }
        [data-theme="light"].privacy-page [style*="#1E293B"] { color: #334155 !important; }

        /* Violet becomes the same deep brand blue. */
        [data-theme="light"].privacy-page [style*="#A78BFA"] {
          color: #1E3A8A !important;
          stroke: #1E3A8A !important;
        }

        [data-theme="light"].privacy-page [style*="rgba(167,139,250"] {
          background: rgba(30,58,138,0.045) !important;
          border-color: rgba(30,58,138,0.16) !important;
        }

        /* Keep semantic warning/success/error colors readable. */
        [data-theme="light"].privacy-page [style*="#22C55E"] { color: #15803D !important; stroke: #15803D !important; }
        [data-theme="light"].privacy-page [style*="#F59E0B"] { color: #B45309 !important; stroke: #B45309 !important; }
        [data-theme="light"].privacy-page [style*="#EF4444"] { color: #DC2626 !important; stroke: #DC2626 !important; }

        /* Security / FAQ CTA: white with a premium deep-blue shadow. */
        [data-theme="light"].privacy-page section[style*="rgba(6,11,28,0.8)"]:last-of-type,
        [data-theme="light"].privacy-page [class*="security"] {
          background: #FFFFFF !important;
          border-color: rgba(30,58,138,0.22) !important;
          box-shadow:
            0 18px 48px rgba(30,58,138,0.14),
            0 5px 18px rgba(30,58,138,0.08) !important;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease !important;
        }

        [data-theme="light"].privacy-page section[style*="rgba(6,11,28,0.8)"]:last-of-type:hover,
        [data-theme="light"].privacy-page [class*="security"]:hover {
          transform: translateY(-3px);
          border-color: rgba(30,58,138,0.38) !important;
          box-shadow:
            0 24px 58px rgba(30,58,138,0.20),
            0 8px 22px rgba(30,58,138,0.11) !important;
        }

        [data-theme="light"].privacy-page input,
        [data-theme="light"].privacy-page textarea {
          background: #FFFFFF !important;
          color: #172033 !important;
          border-color: rgba(30,58,138,0.20) !important;
        }

        [data-theme="light"].privacy-page input::placeholder,
        [data-theme="light"].privacy-page textarea::placeholder {
          color: #64748B !important;
        }

        /* Deep-blue hover treatment for buttons and interactive elements. */
        [data-theme="light"].privacy-page button,
        [data-theme="light"].privacy-page [role="button"] {
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, color 180ms ease !important;
        }

        [data-theme="light"].privacy-page button:hover,
        [data-theme="light"].privacy-page [role="button"]:hover {
          border-color: rgba(30,58,138,0.36) !important;
          box-shadow: 0 10px 24px rgba(30,58,138,0.14) !important;
          transform: translateY(-1px);
        }

        [data-theme="light"].privacy-page svg {
          transition: filter 180ms ease, transform 180ms ease, color 180ms ease, stroke 180ms ease !important;
        }

        [data-theme="light"].privacy-page button:hover svg,
        [data-theme="light"].privacy-page a:hover svg,
        [data-theme="light"].privacy-page [role="button"]:hover svg {
          color: #1E3A8A !important;
          stroke: #1E3A8A !important;
          filter: drop-shadow(0 3px 8px rgba(30,58,138,0.24));
          transform: translateY(-1px);
        }

        [data-theme="light"].privacy-page a:focus-visible,
        [data-theme="light"].privacy-page button:focus-visible {
          outline: 2px solid #1E3A8A;
          outline-offset: 3px;
          box-shadow: 0 0 0 4px rgba(30,58,138,0.12);
        }

        [data-theme="light"].privacy-page section + div[style*="linear-gradient"] {
          background: linear-gradient(90deg,rgba(30,58,138,0.20),rgba(30,58,138,0.06),transparent) !important;
        }
      `}</style>
    </>
  );
}
