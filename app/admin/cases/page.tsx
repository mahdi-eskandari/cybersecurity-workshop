"use client"
import { useState } from "react";

/* ─── ICONS ─── */
const IconArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const IconChevronDown = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconCopy = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);
const IconCheck = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconSave = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
  </svg>
);
const IconForward = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 10 20 15 15 20" /><path d="M4 4v7a4 4 0 004 4h12" />
  </svg>
);
const IconSms = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
const IconLock = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);
const IconPlus = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconAdmin = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IconBot = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="15" x2="8" y2="17" /><line x1="16" y1="15" x2="16" y2="17" />
  </svg>
);
const IconMenu = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const IconDashboard = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);
const IconCases = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const IconSettings = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);
const IconLogout = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);



/* ─── STATUS OPTIONS ─── */
type StatusKey = "new" | "reviewing" | "consulting" | "resolved" | "closed";
const statusOptions: { key: StatusKey; label: string; color: string; bg: string; border: string }[] = [
  { key: "new",       label: "اورژانسی / جدید",       color: "#EF4444", bg: "rgba(239,68,68,0.1)",    border: "rgba(239,68,68,0.3)" },
  { key: "reviewing", label: "در حال بررسی اولیه",    color: "#F59E0B", bg: "rgba(245,158,11,0.1)",   border: "rgba(245,158,11,0.3)" },
  { key: "consulting",label: "ارجاع به مشاوره",        color: "#00E5FF", bg: "rgba(0,229,255,0.08)",   border: "rgba(0,229,255,0.3)" },
  { key: "resolved",  label: "مختومه (موفق)",          color: "#10B981", bg: "rgba(16,185,129,0.1)",   border: "rgba(16,185,129,0.3)" },
  { key: "closed",    label: "بسته شده",               color: "#64748B", bg: "rgba(100,116,139,0.1)",  border: "rgba(100,116,139,0.25)" },
];

/* ─── NOTES DATA ─── */
interface Note { time: string; author: string; type: "admin" | "system"; text: string }
const initialNotes: Note[] = [
  { time: "امروز ۱۵:۰۰", author: "ادمین", type: "admin",  text: "با مالباخته تماس گرفته شد، منتظر ارسال هش (TxID) تراکنش هستیم." },
  { time: "امروز ۱۴:۳۵", author: "سیستم", type: "system", text: "پرونده جدید ثبت شد." },
];

/* ─── FIELD ROW ─── */
const FieldRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    <span style={{ color: "#475569", fontSize: "0.72rem", fontFamily: "monospace", letterSpacing: "0.08em" }}>{label}</span>
    <div>{children}</div>
  </div>
);

/* ─── SECTION DIVIDER ─── */
const SectionDivider = ({ label }: { label: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 16px" }}>
    <span style={{ color: "#334155", fontSize: "0.65rem", fontFamily: "monospace", letterSpacing: "0.14em", whiteSpace: "nowrap" }}>{label}</span>
    <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(0,229,255,0.12), transparent)" }} />
  </div>
);

/* ─── MAIN ─── */
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [status, setStatus] = useState<StatusKey>("reviewing");
  const [statusOpen, setStatusOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [saved, setSaved] = useState(false);
  const [noteFocus, setNoteFocus] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [referred, setReferred] = useState(false);

  const currentStatus = statusOptions.find((s) => s.key === status)!;

  const handleCopy = () => {
    navigator.clipboard.writeText("09123334567");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    const now = new Date();
    const timeStr = `امروز ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setNotes([{ time: timeStr, author: "ادمین", type: "admin", text: noteText.trim() }, ...notes]);
    setNoteText("");
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div style={{ background: "#050814", minHeight: "100vh", fontFamily: "var(--font-vazirmatn), sans-serif", color: "#E2E8F0", display: "flex" }}>

     

      {/* ─── MAIN ─── */}
      <div style={{ flex: 1, marginRight: sidebarOpen ? 220 : 60, minWidth: 0, display: "flex", flexDirection: "column", transition: "margin-right 0.22s ease" }}>


        {/* ─── CONTENT (two-column) ─── */}
        <main style={{ flex: 1, padding: "24px 22px", display: "flex", gap: 18, alignItems: "flex-start" }}
          onClick={() => statusOpen && setStatusOpen(false)}>

          {/* ══ RIGHT COLUMN 65% ══ */}
          <div style={{ flex: "0 0 65%", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Case info card */}
            <div style={{
              background: "#0A1128", border: "1px solid rgba(0,229,255,0.1)",
              borderRadius: 16, overflow: "hidden",
              boxShadow: "0 0 40px rgba(0,229,255,0.04)",
            }}>
              {/* Card top bar */}
              <div style={{ height: 2, background: "linear-gradient(90deg,rgba(0,229,255,0.5),rgba(0,229,255,0.1),transparent)" }} />
              <div style={{ padding: "18px 22px", borderBottom: "1px solid rgba(0,229,255,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00E5FF", display: "inline-block", boxShadow: "0 0 7px rgba(0,229,255,0.8)" }} />
                  <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>اطلاعات گزارش و قربانی</h3>
                  <span style={{ marginRight: "auto", fontFamily: "monospace", fontSize: "0.6rem", color: "#1E293B", letterSpacing: "0.1em" }}>CASE // #PRH-902</span>
                </div>
              </div>

              <div style={{ padding: "22px 22px 24px", display: "flex", flexDirection: "column", gap: 22 }}>

                {/* Section A: Contact */}
                <div>
                  <SectionDivider label="A — اطلاعات تماس" />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <FieldRow label="شماره تماس / آیدی تلگرام:">
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontFamily: "monospace", fontSize: "0.88rem", color: "#E2E8F0", letterSpacing: "0.05em" }}>0912***4567</span>
                        <button onClick={handleCopy}
                          style={{
                            display: "flex", alignItems: "center", gap: 4,
                            padding: "3px 8px", borderRadius: 6, cursor: "pointer", fontSize: "0.65rem",
                            background: copied ? "rgba(16,185,129,0.1)" : "rgba(0,229,255,0.06)",
                            border: copied ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(0,229,255,0.18)",
                            color: copied ? "#10B981" : "rgba(0,229,255,0.7)",
                            transition: "all 0.2s", fontFamily: "var(--font-vazirmatn), sans-serif",
                          }}>
                          {copied ? <IconCheck /> : <IconCopy />}
                          {copied ? "کپی شد" : "کپی"}
                        </button>
                      </div>
                    </FieldRow>
                    <FieldRow label="تاریخ و زمان ثبت:">
                      <span style={{ fontFamily: "monospace", fontSize: "0.84rem", color: "#94A3B8" }}>۱۲ شهریور ۱۴۰۵ — ۱۴:۳۰</span>
                    </FieldRow>
                  </div>
                </div>

                {/* Section B: Incident */}
                <div>
                  <SectionDivider label="B — جزئیات حادثه" />
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <FieldRow label="نوع حادثه انتخابی:">
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "5px 14px", borderRadius: 8, fontSize: "0.82rem", fontWeight: 600,
                        background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.22)", color: "#00E5FF",
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" /><path d="M9 8h4.5a1.5 1.5 0 010 3H9v3h5a1.5 1.5 0 010 3H9" />
                          <line x1="12" y1="6" x2="12" y2="8" /><line x1="12" y1="18" x2="12" y2="20" />
                        </svg>
                        سرقت کریپتو
                      </span>
                    </FieldRow>

                    <FieldRow label="شرح مشکل (نوشته شده توسط کاربر):">
                      <div style={{
                        background: "#060B19", border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 10, padding: "14px 16px",
                        color: "#94A3B8", fontSize: "0.86rem", lineHeight: 1.85,
                        borderRight: "3px solid rgba(0,229,255,0.18)",
                      }}>
                        <p>کیف پول تراست‌ولت من هک شده و حدود <span style={{ color: "#E2E8F0", fontWeight: 600 }}>۵۰۰۰ تتر</span> به آدرس ناشناس منتقل شده است. هیچ کدی به کسی ندادم.</p>
                      </div>
                    </FieldRow>
                  </div>
                </div>

                {/* Section C: Technical metadata */}
                <div>
                  <SectionDivider label="C — متادیتای فنی (پر شده توسط کارآگاه)" />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    {[
                      { label: "آدرس ولت مبدأ:", value: "TXxxxx...7f3a", mono: true, color: "#E2E8F0" },
                      { label: "شبکه بلاکچین:", value: "TRON (TRC-20)", mono: true, color: "#94A3B8" },
                      { label: "هش تراکنش (TxID):", value: "— در انتظار ارسال —", mono: false, color: "#475569" },
                      { label: "صرافی احتمالی مقصد:", value: "— در حال تحلیل —", mono: false, color: "#475569" },
                    ].map(({ label, value, mono, color }) => (
                      <FieldRow key={label} label={label}>
                        <span style={{ fontFamily: mono ? "monospace" : "var(--font-vazirmatn), sans-serif", fontSize: "0.82rem", color }}>{value}</span>
                      </FieldRow>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══ LEFT COLUMN 35% ══ */}
          <div style={{ flex: "0 0 calc(35% - 18px)", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Card 1: Quick Actions */}
            <div style={{ background: "#0A1128", border: "1px solid rgba(0,229,255,0.1)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ height: 2, background: "linear-gradient(90deg,rgba(245,158,11,0.5),rgba(245,158,11,0.1),transparent)" }} />
              <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>عملیات سریع</h3>
              </div>
              <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
                <button
                  onClick={() => setReferred(true)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                    padding: "10px", borderRadius: 9, cursor: "pointer", fontSize: "0.8rem", fontWeight: 600,
                    background: referred ? "rgba(16,185,129,0.1)" : "transparent",
                    border: referred ? "1px solid rgba(16,185,129,0.35)" : "1px solid rgba(0,229,255,0.25)",
                    color: referred ? "#10B981" : "#00E5FF",
                    fontFamily: "var(--font-vazirmatn), sans-serif", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { if (!referred) (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,229,255,0.06)"; }}
                  onMouseLeave={(e) => { if (!referred) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
                  {referred ? <IconCheck /> : <IconForward />}
                  {referred ? "ارجاع انجام شد" : "ارجاع به دپارتمان مشاوره"}
                </button>
                <button
                  onClick={() => setSmsSent(true)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                    padding: "10px", borderRadius: 9, cursor: "pointer", fontSize: "0.8rem", fontWeight: 600,
                    background: smsSent ? "rgba(16,185,129,0.1)" : "transparent",
                    border: smsSent ? "1px solid rgba(16,185,129,0.35)" : "1px solid rgba(0,229,255,0.25)",
                    color: smsSent ? "#10B981" : "#00E5FF",
                    fontFamily: "var(--font-vazirmatn), sans-serif", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { if (!smsSent) (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,229,255,0.06)"; }}
                  onMouseLeave={(e) => { if (!smsSent) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
                  {smsSent ? <IconCheck /> : <IconSms />}
                  {smsSent ? "پیامک ارسال شد" : "ارسال پیامک تایید دریافت"}
                </button>

                {/* Danger zone */}
                <div style={{ marginTop: 4, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                  <button style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                    padding: "9px", borderRadius: 9, cursor: "pointer", fontSize: "0.78rem", fontWeight: 600,
                    background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)",
                    color: "rgba(239,68,68,0.6)", fontFamily: "var(--font-vazirmatn), sans-serif",
                  }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#EF4444"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.35)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(239,68,68,0.6)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.18)"; }}>
                    بستن / رد پرونده
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Internal Notes */}
            <div style={{ background: "#0A1128", border: "1px solid rgba(0,229,255,0.1)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ height: 2, background: "linear-gradient(90deg,rgba(239,68,68,0.4),rgba(239,68,68,0.1),transparent)" }} />
              <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>یادداشت‌های محرمانه تیم</h3>
                  <div style={{ marginRight: "auto", display: "flex", alignItems: "center", gap: 4, padding: "2px 7px", borderRadius: 6, background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)" }}>
                    <span style={{ color: "rgba(239,68,68,0.6)" }}><IconLock /></span>
                    <span style={{ color: "rgba(239,68,68,0.5)", fontSize: "0.58rem", fontFamily: "monospace", letterSpacing: "0.1em" }}>INTERNAL ONLY</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Input */}
                <div style={{ position: "relative" }}>
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    onFocus={() => setNoteFocus(true)}
                    onBlur={() => setNoteFocus(false)}
                    placeholder="یادداشت خود را برای سایر کارآگاهان یا تیم حقوقی بنویسید..."
                    rows={3}
                    style={{
                      width: "100%", background: "#060B19", color: "#E2E8F0",
                      border: noteFocus ? "1px solid rgba(0,229,255,0.35)" : "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 10, padding: "10px 12px", fontSize: "0.8rem",
                      fontFamily:"var(--font-vazirmatn), sans-serif", lineHeight: 1.75, resize: "none",
                      outline: "none", caretColor: "#00E5FF",
                      boxShadow: noteFocus ? "0 0 0 3px rgba(0,229,255,0.05)" : "none",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                      boxSizing: "border-box",
                    }} />
                </div>
                <button
                  onClick={handleAddNote}
                  disabled={!noteText.trim()}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    padding: "9px", borderRadius: 9, cursor: noteText.trim() ? "pointer" : "not-allowed",
                    background: noteText.trim() ? "rgba(0,229,255,0.1)" : "rgba(255,255,255,0.02)",
                    border: noteText.trim() ? "1px solid rgba(0,229,255,0.3)" : "1px solid rgba(255,255,255,0.05)",
                    color: noteText.trim() ? "#00E5FF" : "#1E293B",
                    fontSize: "0.8rem", fontWeight: 600, fontFamily: "var(--font-vazirmatn), sans-serif",
                    transition: "all 0.15s",
                  }}>
                  <IconPlus />
                  ثبت یادداشت
                </button>

                {/* Timeline */}
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {notes.map((note, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, paddingBottom: i < notes.length - 1 ? 14 : 0, position: "relative" }}>
                      {/* Vertical line */}
                      {i < notes.length - 1 && (
                        <div style={{ position: "absolute", right: 14, top: 24, bottom: 0, width: 1, background: "rgba(0,229,255,0.08)" }} />
                      )}
                      {/* Avatar */}
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                        background: note.type === "admin" ? "rgba(0,229,255,0.1)" : "rgba(255,255,255,0.04)",
                        border: note.type === "admin" ? "1px solid rgba(0,229,255,0.25)" : "1px solid rgba(255,255,255,0.07)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: note.type === "admin" ? "#00E5FF" : "#334155",
                      }}>
                        {note.type === "admin" ? <IconAdmin /> : <IconBot />}
                      </div>
                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <span style={{ color: note.type === "admin" ? "#00E5FF" : "#475569", fontSize: "0.72rem", fontWeight: 600 }}>{note.author}</span>
                          <span style={{ color: "#1E293B", fontSize: "0.62rem", fontFamily: "monospace" }}>{note.time}</span>
                        </div>
                        <p style={{ color: "#64748B", fontSize: "0.78rem", lineHeight: 1.7, margin: 0 }}>{note.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes urg-pulse { 0%,100%{opacity:1;box-shadow:0 0 6px rgba(239,68,68,0.9)} 50%{opacity:0.5;box-shadow:0 0 2px rgba(239,68,68,0.3)} }
      `}</style>
    </div>
  );
}
