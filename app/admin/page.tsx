"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ─── ICONS ─── */

const IconSiren = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v2M4.93 4.93l1.41 1.41M2 12h2M19.07 4.93l-1.41 1.41M22 12h-2" />
    <path d="M6 16c0-3.31 2.69-6 6-6s6 2.69 6 6" />
    <rect x="4" y="16" width="16" height="4" rx="1" />
  </svg>
);

const IconShieldActive = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const IconCalendar = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconCheckCircle = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconEye = () => (
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
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconFilter = () => (
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
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const IconTrendUp = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconEdit = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg>);
const IconTrash = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 15H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>);

/* ─── TYPES ─── */

type StatusKey =
  | "emergency"
  | "reviewing"
  | "consulting"
  | "resolved"
  | "new"
  | "closed";

interface Report {
  _id: string;
  trackingCode: string;
  incidentType: string;
  description: string;
  contact: string;
  status: string;
  createdAt: string;
}

interface StatusConfig {
  label: string;
  color: string;
  bg: string;
  border: string;
}

/* ─── STATUS CONFIG ─── */

const statusConfig: Record<StatusKey, StatusConfig> = {
  emergency: {
    label: "جدید / اورژانسی",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(107, 41, 41, 0.28)",
  },

  reviewing: {
    label: "در حال بررسی",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.28)",
  },

  consulting: {
    label: "ارجاع به مشاوره",
    color: "#00E5FF",
    bg: "rgba(0,229,255,0.08)",
    border: "rgba(0,229,255,0.28)",
  },

  resolved: {
    label: "مختومه (موفق)",
    color: "#10B981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.28)",
  },

  closed: {
    label: "بسته شده",
    color: "#94A3B8",
    bg: "rgba(148,163,184,0.09)",
    border: "rgba(148,163,184,0.22)",
  },

  new: {
    label: "جدید / اورژانسی",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.28)",
  },
};

/* ─── INCIDENT TYPES ─── */

const incidentTypes: Record<
  string,
  {
    label: string;
    color: string;
  }
> = {
  crypto: {
    label: "سرقت کریپتو",
    color: "#00E5FF",
  },

  hack: {
    label: "هک و نفوذ",
    color: "#A78BFA",
  },

  extort: {
    label: "اخاذی / باج‌افزار",
    color: "#EF4444",
  },

  consult: {
    label: "درخواست مشاوره",
    color: "#F59E0B",
  },

  phish: {
    label: "فیشینگ",
    color: "#F97316",
  },

  identity: {
    label: "سرقت هویت",
    color: "#EC4899",
  },
};

/* ─── STATUS MAP ─── */

const statusMap: Record<string, StatusKey> = {
  pending: "new",
  reviewing: "reviewing",
  consulting: "consulting",
  resolved: "resolved",
  closed: "closed",
  emergency: "emergency",
  new: "new",
};

const getStatusKey = (value: string): StatusKey =>
  statusMap[value] || (value as StatusKey) || "new";

/* ─── DATE FORMATTER ─── */

const formatRelativeDate = (date: string) => {
  const created = new Date(date);

  if (Number.isNaN(created.getTime())) {
    return "-";
  }

  const now = new Date();

  const diffMs = now.getTime() - created.getTime();

  const diffMinutes = Math.floor(
    diffMs / (1000 * 60)
  );

  const diffHours = Math.floor(
    diffMs / (1000 * 60 * 60)
  );

  const diffDays = Math.floor(
    diffMs / (1000 * 60 * 60 * 24)
  );

  const time = created.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  if (diffMinutes < 1) {
    return "همین الان";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes.toLocaleString(
      "fa-IR"
    )} دقیقه پیش`;
  }

  if (diffHours < 24) {
    return `${diffHours.toLocaleString(
      "fa-IR"
    )} ساعت پیش`;
  }

  if (diffDays === 1) {
    return `دیروز، ${time}`;
  }

  if (diffDays < 7) {
    return `${diffDays.toLocaleString(
      "fa-IR"
    )} روز پیش`;
  }

  return created.toLocaleDateString("fa-IR");
};

/* ─── SPARKLINE ─── */

const Sparkline = ({
  color,
  points,
}: {
  color: string;
  points: number[];
}) => {
  const max = Math.max(...points);
  const min = Math.min(...points);

  const w = 64;
  const h = 28;

  const coords = points.map((p, i) => {
    const x =
      (i / (points.length - 1)) * w;

    const y =
      h -
      ((p - min) / (max - min || 1)) *
        (h - 4) -
      2;

    return `${x},${y}`;
  });

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
    >
      <polyline
        points={coords.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />

      <polyline
        points={`0,${h} ${coords.join(
          " "
        )} ${w},${h}`}
        fill={color}
        fillOpacity="0.08"
        stroke="none"
      />
    </svg>
  );
};



















/* ─── CASE REVIEW PAGE ─── */
const IconArrowRight = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const IconCopy = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IconCheck = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconSave = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const IconForward = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 10 20 15 15 20"/><path d="M4 4v7a4 4 0 004 4h12"/></svg>;
const IconSms = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
const IconLock = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
const IconPlus = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconAdmin = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconBot = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="15" x2="8" y2="17"/><line x1="16" y1="15" x2="16" y2="17"/></svg>;

interface CaseNote { id?: string; time: string; author: string; type: "admin" | "system"; text: string; createdAt?: string; updatedAt?: string }
const caseInitialNotes: CaseNote[] = [
  { time: "امروز ۱۵:۰۰", author: "ادمین", type: "admin", text: "با مالباخته تماس گرفته شد، منتظر ارسال هش (TxID) تراکنش هستیم." },
  { time: "امروز ۱۴:۳۵", author: "سیستم", type: "system", text: "پرونده جدید ثبت شد." },
];
const CaseField = ({label, children}:{label:string; children:React.ReactNode}) => <div style={{display:"flex",flexDirection:"column",gap:6,minWidth:0}}><span style={{color:"#475569",fontSize:"0.68rem",fontFamily:"monospace",letterSpacing:"0.05em"}}>{label}</span><div style={{minWidth:0}}>{children}</div></div>;
const CaseDivider = ({label}:{label:string}) => <div style={{display:"flex",alignItems:"center",gap:10,margin:"2px 0 16px"}}><span style={{color:"#334155",fontSize:"0.64rem",fontFamily:"monospace",letterSpacing:"0.12em",whiteSpace:"nowrap"}}>{label}</span><div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(0,229,255,.12),transparent)"}}/></div>;

function CaseReviewPage({report,onBack,onStatusChange,onDeleteReport}:{report:Report;onBack:()=>void;onStatusChange:(report:Report,nextStatus:string)=>Promise<boolean>;onDeleteReport:(report:Report)=>Promise<boolean>}) {
  const [mounted, setMounted] = useState(false);
  const [adminName, setAdminName] = useState("ادمین");
  const [copied,setCopied]=useState(false);
  const [noteText,setNoteText]=useState("");
  const [notes,setNotes]=useState<CaseNote[]>(caseInitialNotes);
  const [notesLoading,setNotesLoading]=useState(false);
  const [noteSaving,setNoteSaving]=useState(false);
  const [editingNoteId,setEditingNoteId]=useState<string|null>(null);
  const [editingNoteText,setEditingNoteText]=useState("");
  const [noteUpdating,setNoteUpdating]=useState(false);
  const [saved,setSaved]=useState(false);
  const [referred,setReferred]=useState(false);
  const [smsSent,setSmsSent]=useState(false);
  const [noteFocus,setNoteFocus]=useState(false);
  const [deleteConfirmOpen,setDeleteConfirmOpen]=useState(false);
  const [permanentDeleteConfirmOpen,setPermanentDeleteConfirmOpen]=useState(false);
  const [deletingReport,setDeletingReport]=useState(false);

  useEffect(() => {
    setMounted(true);

    const loadAdmin = async () => {
      try {
        const response = await fetch("/api/admin/me", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) return;

        const data = await response.json();
        const name =
          data?.user?.username ||
          data?.user?.name ||
          data?.username ||
          data?.name;

        if (typeof name === "string" && name.trim()) {
          setAdminName(name.trim());
        }
      } catch (error) {
        console.error("Load current admin error:", error);
      }
    };

    void loadAdmin();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadNotes = async () => {
      if (!report._id) return;
      setNotesLoading(true);
      try {
        const response = await fetch(`/api/admin/confidential-notes?reportId=${encodeURIComponent(report._id)}`, {
          method: "GET",
          cache: "no-store",
        });
        if (!response.ok) return;
        const data = await response.json();
        if (cancelled) return;
        const serverNotes = Array.isArray(data?.notes) ? data.notes : [];
        setNotes(serverNotes.map((note: any) => ({
          id: String(note._id ?? note.id ?? ""),
          time: note.createdAt || "",
          author: note.authorName || "ادمین",
          type: "admin" as const,
          text: String(note.text ?? ""),
          createdAt: note.createdAt,
          updatedAt: note.updatedAt,
        })));
      } catch (error) {
        console.error("Load confidential notes error:", error);
      } finally {
        if (!cancelled) setNotesLoading(false);
      }
    };

    void loadNotes();
    return () => { cancelled = true; };
  }, [report._id]);

  const serverStatus = statusMap[report.status] || "new";
  const [localStatus, setLocalStatus] = useState<StatusKey>(serverStatus);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const statusSelectRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setLocalStatus(serverStatus);
    setStatusMenuOpen(false);
  }, [serverStatus]);
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!statusSelectRef.current?.contains(event.target as Node)) {
        setStatusMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const currentStatus = localStatus;
  const status = statusConfig[currentStatus];
  const incident=incidentTypes[report.incidentType]||{label:report.incidentType,color:"#64748B"};
  const handleCopy=()=>{navigator.clipboard?.writeText(report.contact||"");setCopied(true);window.setTimeout(()=>setCopied(false),1800)};
  const handleAddNote = async () => {
    const text = noteText.trim();
    if (!text || !report._id || noteSaving) return;

    setNoteSaving(true);
    try {
      const response = await fetch("/api/admin/confidential-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId: report._id, text }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "ثبت یادداشت انجام نشد");
      }

      const note = data?.note;
      if (note) {
        setNotes((prev) => [
          {
            id: String(note._id ?? note.id ?? ""),
            time: note.createdAt || new Date().toISOString(),
            author: note.authorName || adminName,
            type: "admin",
            text: String(note.text ?? text),
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
          },
          ...prev,
        ]);
      }
      setNoteText("");
    } catch (error) {
      console.error("Create confidential note error:", error);
    } finally {
      setNoteSaving(false);
    }
  };

  const startEditNote = (note: CaseNote) => {
    if (!note.id) return;
    setEditingNoteId(note.id);
    setEditingNoteText(note.text);
  };

  const cancelEditNote = () => {
    setEditingNoteId(null);
    setEditingNoteText("");
  };

  const handleUpdateNote = async (note: CaseNote) => {
    const text = editingNoteText.trim();
    if (!note.id || !text || noteUpdating) return;

    setNoteUpdating(true);
    try {
      const response = await fetch("/api/admin/confidential-notes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: note.id, text }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "ویرایش یادداشت انجام نشد");
      }

      const updated = data?.note;
      setNotes((prev) =>
        prev.map((item) =>
          item.id === note.id
            ? {
                ...item,
                text: String(updated?.text ?? text),
                updatedAt: updated?.updatedAt,
              }
            : item
        )
      );
      cancelEditNote();
    } catch (error) {
      console.error("Update confidential note error:", error);
    } finally {
      setNoteUpdating(false);
    }
  };
  const handleSave=()=>{setSaved(true);window.setTimeout(()=>setSaved(false),2200)};
  return <div className="case-review-page" dir="rtl">
    <header className="case-review-header">
      <div className="case-review-header-side case-review-header-right"><button type="button" onClick={onBack} className="case-back-top"><IconArrowRight/>بازگشت به لیست پرونده‌ها</button></div>
      <div className="case-review-title"><h1>جزئیات پرونده <span>#{report.trackingCode}</span></h1><span className="case-emergency-badge"><i/>{status.label}</span></div>
      <div className="case-review-header-side case-review-header-left">
        <div className={`case-status-select-wrap ${statusMenuOpen ? "is-open" : ""}`} ref={statusSelectRef}>
          <label className="case-status-select-label">وضعیت پرونده</label>
          <button
            type="button"
            className="case-status-select-trigger"
            onClick={() => setStatusMenuOpen((open) => !open)}
            aria-haspopup="listbox"
            aria-expanded={statusMenuOpen}
            aria-label="انتخاب وضعیت پرونده"
            style={{
              color: status.color,
              borderColor: status.border,
              background: `linear-gradient(135deg, ${status.bg}, rgba(255,255,255,0.025))`,
              boxShadow: statusMenuOpen
                ? `0 0 0 3px ${status.color}10, 0 0 28px ${status.color}18`
                : `0 0 24px ${status.color}12`,
            }}
          >
            <span className="case-status-select-value">
              <i style={{ background: status.color, boxShadow: `0 0 9px ${status.color}99` }} />
              <span>{status.label}</span>
            </span>
            <span className={`case-status-select-chevron ${statusMenuOpen ? "up" : ""}`} aria-hidden="true"><span /></span>
          </button>
          {statusMenuOpen && (
            <div className="case-status-select-menu" role="listbox" aria-label="وضعیت‌های پرونده">
              {([
                ["new", "جدید / اورژانسی"],
                ["reviewing", "در حال بررسی"],
                ["consulting", "ارجاع به مشاوره"],
                ["resolved", "مختومه (موفق)"],
                ["closed", "بسته شده"],
              ] as Array<[StatusKey, string]>).map(([key, label]) => {
                const option = statusConfig[key];
                const selected = key === currentStatus || (key === "new" && currentStatus === "emergency");
                return (
                  <button
                    key={key}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={`case-status-option ${selected ? "selected" : ""}`}
                    onClick={() => {
                      setStatusMenuOpen(false);
                      const previousStatus = currentStatus;
                      // «جدید / اورژانسی» یک گزینه واحد در UI است؛ با انتخاب آن،
                      // وضعیت ذخیره‌شده به pending برمی‌گردد.
                      const nextStatus: StatusKey = key;
                      if (nextStatus === currentStatus) return;
                      setLocalStatus(nextStatus);
                      void onStatusChange(report, nextStatus).then((ok) => {
                        if (!ok) setLocalStatus(previousStatus);
                      });
                    }}
                  >
                    <span className="case-status-option-dot" style={{ background: option.color, boxShadow: `0 0 10px ${option.color}88` }} />
                    <span className="case-status-option-text">{label}</span>
                    {selected && <IconCheck />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <button type="button" onClick={handleSave} className={`case-save-button ${saved?"is-saved":""}`}>{saved?<IconCheck/>:<IconSave/>}{saved?"ذخیره شد":"ذخیره تغییرات"}</button>
      </div>
    </header>
    <main className="case-review-content">
      <section className="case-primary-column"><div className="case-panel case-main-panel"><div className="case-panel-accent"/><div className="case-panel-header"><div><span className="case-live-dot"/><h2>اطلاعات گزارش و قربانی</h2></div><span className="case-code">CASE // #{report.trackingCode}</span></div><div className="case-panel-body">
        <section><CaseDivider label="A — اطلاعات تماس"/><div className="case-grid-2"><CaseField label="شماره تماس / آیدی تلگرام:"><div className="case-contact-value"><span>{report.contact||"—"}</span><button type="button" onClick={handleCopy}>{copied?<IconCheck/>:<IconCopy/>}{copied?"کپی شد":"کپی"}</button></div></CaseField><CaseField label="تاریخ و زمان ثبت:"><span className="case-muted-value">{mounted ? formatRelativeDate(report.createdAt) : "—"}</span></CaseField></div></section>
        <section><CaseDivider label="B — جزئیات حادثه"/><div className="case-stack"><CaseField label="نوع حادثه انتخابی:"><span className="case-incident-badge" style={{color:incident.color,borderColor:`${incident.color}55`,background:`${incident.color}12`}}>{incident.label}</span></CaseField><CaseField label="شرح مشکل (نوشته شده توسط کاربر):"><div className="case-description"><p>{report.description||"شرحی برای این پرونده ثبت نشده است."}</p></div></CaseField></div></section>
        <section><CaseDivider label="C — متادیتای فنی (پر شده توسط کارآگاه)"/><div className="case-grid-2"><CaseField label="آدرس ولت مبدأ:"><span className="case-strong-mono">TXxxxx...7f3a</span></CaseField><CaseField label="شبکه بلاکچین:"><span className="case-muted-value">TRON (TRC-20)</span></CaseField><CaseField label="هش تراکنش (TxID):"><span className="case-dim-value">— در انتظار ارسال —</span></CaseField><CaseField label="صرافی احتمالی مقصد:"><span className="case-dim-value">— در حال تحلیل —</span></CaseField></div></section>
      </div></div></section>
      <aside className="case-side-column">
        <div className="case-panel"><div className="case-small-header"><h3>عملیات پرونده</h3></div><div className="case-actions-body"><button type="button" className="case-close-button" onClick={() => setDeleteConfirmOpen(true)}><IconCheck />بستن پرونده</button><button type="button" className="case-permanent-delete-button" onClick={() => setPermanentDeleteConfirmOpen(true)} disabled={deletingReport}><IconTrash />حذف پرونده</button></div></div>
        <div className="case-panel"><div className="case-small-header case-notes-header"><h3>یادداشت‌های محرمانه تیم</h3><span><IconLock/> INTERNAL ONLY</span></div><div className="case-notes-body"><textarea value={noteText} onChange={e=>setNoteText(e.target.value)} onFocus={()=>setNoteFocus(true)} onBlur={()=>setNoteFocus(false)} placeholder="یادداشت خود را برای سایر کارآگاهان یا تیم حقوقی بنویسید..." rows={3} style={{borderColor:noteFocus?"rgba(0,229,255,.35)":"rgba(255,255,255,.06)"}}/><button type="button" className="case-note-submit" disabled={!noteText.trim() || noteSaving} onClick={handleAddNote}>{noteSaving?<IconCheck/>:<IconPlus/>}{noteSaving?"در حال ثبت...":"ثبت یادداشت"}</button><div className="case-timeline">{notesLoading ? <div className="case-notes-loading">در حال دریافت یادداشت‌های محرمانه...</div> : notes.length === 0 ? <div className="case-notes-loading">هنوز یادداشت محرمانه‌ای ثبت نشده است.</div> : notes.map((note,i)=>{const displayTime = mounted && note.time ? formatRelativeDate(note.time) : "—"; const isEditing = editingNoteId === note.id; return <div key={note.id || `${note.time}-${i}`} className="case-note-row"><div className={`case-avatar ${note.type}`}>{note.type==="admin"?<IconAdmin/>:<IconBot/>}</div><div className="case-note-content"><div><b>{note.author}</b><span>{displayTime}</span>{note.updatedAt && note.updatedAt !== note.createdAt ? <span>ویرایش‌شده</span> : null}{note.id && note.type === "admin" && !isEditing ? (<button type="button" className="case-note-edit" onClick={() => startEditNote(note)} title="ویرایش یادداشت" aria-label="ویرایش یادداشت"><IconEdit /><span>ویرایش</span></button>) : null}</div>{isEditing ? <div className="case-note-edit-box"><textarea value={editingNoteText} onChange={e=>setEditingNoteText(e.target.value)} rows={3}/><div className="case-note-edit-actions"><button type="button" className="case-note-edit-cancel" onClick={cancelEditNote}>انصراف</button><button type="button" className="case-note-edit-save" disabled={!editingNoteText.trim() || noteUpdating} onClick={()=>void handleUpdateNote(note)}>{noteUpdating?"در حال ذخیره...":"ذخیره ویرایش"}</button></div></div> : <p>{note.text}</p>}</div></div>})}</div></div></div>
      </aside>
    </main>
    {deleteConfirmOpen && (
      <div className="case-delete-overlay" role="dialog" aria-modal="true" aria-labelledby="close-case-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setDeleteConfirmOpen(false); }}>
        <div className="case-delete-modal">
          <div className="case-delete-icon"><IconCheck /></div>
          <div className="case-delete-copy">
            <h3 id="close-case-title">بستن پرونده؟</h3>
            <p>آیا مطمئن هستید که می‌خواهید پرونده <strong>#{report.trackingCode}</strong> را ببندید؟ پرونده حذف نمی‌شود و وضعیت آن به «بسته شده» تغییر می‌کند.</p>
          </div>
          <div className="case-delete-actions">
            <button type="button" className="case-delete-cancel" onClick={() => setDeleteConfirmOpen(false)}>انصراف</button>
            <button type="button" className="case-delete-confirm" onClick={async () => { const closed = await onStatusChange(report, "closed"); if (closed) { setDeleteConfirmOpen(false); onBack(); } }}><IconCheck />بله، بستن پرونده</button>
          </div>
        </div>
      </div>
    )}
    {permanentDeleteConfirmOpen && (
      <div className="case-permanent-delete-overlay" role="dialog" aria-modal="true" aria-labelledby="permanent-delete-title" onMouseDown={(event) => { if (event.target === event.currentTarget && !deletingReport) setPermanentDeleteConfirmOpen(false); }}>
        <div className="case-permanent-delete-modal">
          <div className="case-permanent-delete-icon"><IconTrash /></div>
          <div className="case-permanent-delete-copy">
            <h3 id="permanent-delete-title">حذف دائمی پرونده؟</h3>
            <p>آیا مطمئن هستید که می‌خواهید پرونده <strong>#{report.trackingCode}</strong> را برای همیشه حذف کنید؟ این عملیات قابل بازگشت نیست و یادداشت‌های محرمانه مرتبط با این پرونده نیز حذف خواهند شد.</p>
          </div>
          <div className="case-permanent-delete-actions">
            <button type="button" className="case-delete-cancel" onClick={() => setPermanentDeleteConfirmOpen(false)} disabled={deletingReport}>انصراف</button>
            <button type="button" className="case-permanent-delete-confirm" disabled={deletingReport} onClick={async () => { setDeletingReport(true); const deleted = await onDeleteReport(report); if (deleted) { setPermanentDeleteConfirmOpen(false); } setDeletingReport(false); }}><IconTrash />{deletingReport ? "در حال حذف..." : "بله، حذف دائمی پرونده"}</button>
          </div>
        </div>
      </div>
    )}
    <div className="case-review-footer"><button type="button" onClick={onBack}><IconArrowRight/>بازگشت به پرونده‌ها</button></div>
  </div>;
}

/* ─── MAIN COMPONENT ─── */

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [hoveredRow, setHoveredRow] =
    useState<string | null>(null);

  const [filterStatus, setFilterStatus] =
    useState<string>("all");
  const [search, setSearch] = useState("");
  const [incidentFilter, setIncidentFilter] = useState<string>("all");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [reports, setReports] =
    useState<Report[]>([]);

const [selectedReport, setSelectedReport] =
  useState<Report | null>(null);

  const [view, setView] = useState<"dashboard" | "case">("dashboard");  /* ─── FETCH REPORTS ─── */

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          "/api/crisis-reports",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(
            "خطا در دریافت پرونده‌ها"
          );
        }

        const data = await res.json();

        console.log("API DATA:", data);

        setReports(
          Array.isArray(data.reports)
            ? data.reports
            : []
        );
      } catch (err) {
        console.error(
          "Fetch crisis reports error:",
          err
        );

        setError(
          "دریافت پرونده‌ها با خطا مواجه شد."
        );

        setReports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const statusApiMap: Record<string, string> = {
    new: "pending",
    emergency: "emergency",
    reviewing: "reviewing",
    consulting: "consulting",
    resolved: "resolved",
    closed: "closed",
  };

  const updateReportStatus = async (
    report: Report,
    nextStatus: string
  ): Promise<boolean> => {
    if (!statusApiMap[nextStatus]) return false;

    // «جدید / اورژانسی» در UI یک گزینه است. اول pending را می‌فرستیم؛
    // اگر API پروژه pending را نپذیرفت ولی new را پذیرفت، خودکار با new تلاش می‌کنیم.
    const apiStatuses = nextStatus === "new" ? ["pending", "new"] : [statusApiMap[nextStatus]];

    try {
      for (const apiStatus of apiStatuses) {
        try {
          const response = await fetch("/api/crisis-reports", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: report._id,
              status: apiStatus,
            }),
          });

          const data = await response.json().catch(() => ({}));
          if (!response.ok) continue;

          const updatedStatus = String(data?.report?.status || apiStatus);
          const normalizedStatus = getStatusKey(updatedStatus);

          setReports((prev) =>
            prev.map((item) =>
              item._id === report._id
                ? { ...item, status: updatedStatus }
                : item
            )
          );

          setSelectedReport((prev) =>
            prev && prev._id === report._id
              ? { ...prev, status: updatedStatus }
              : prev
          );

          // اگر backend «new» برگرداند یا pending، هر دو در UI «جدید / اورژانسی» هستند.
          void normalizedStatus;
          return true;
        } catch (requestError) {
          console.error("Status update attempt failed:", requestError);
        }
      }

      return false;
    } catch (error) {
      console.error("Update report status error:", error);
      return false;
    }
  };

  const deleteReport = async (report: Report): Promise<boolean> => {
    if (!report._id) return false;

    try {
      const response = await fetch("/api/crisis-reports", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: report._id }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        console.error("Delete crisis report failed:", data?.message || response.statusText);
        return false;
      }

      setReports((prev) => prev.filter((item) => item._id !== report._id));
      setSelectedReport((prev) => (prev?._id === report._id ? null : prev));
      setView("dashboard");
      return true;
    } catch (error) {
      console.error("Delete crisis report error:", error);
      return false;
    }
  };


  /* ─── FILTERED DATA ─── */

  const filteredData = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return reports.filter((report) => {
      const currentStatus = getStatusKey(report.status);
      const incidentLabel = incidentTypes[report.incidentType]?.label || report.incidentType || "";

      const matchesSearch =
        !searchValue ||
        report.trackingCode.toLowerCase().includes(searchValue) ||
        report.contact.toLowerCase().includes(searchValue) ||
        report.description.toLowerCase().includes(searchValue) ||
        incidentLabel.toLowerCase().includes(searchValue);

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "emergency"
          ? currentStatus === "new" || currentStatus === "emergency"
          : currentStatus === filterStatus);

      const matchesIncident =
        incidentFilter === "all" || report.incidentType === incidentFilter;

      return matchesSearch && matchesStatus && matchesIncident;
    });
  }, [reports, search, filterStatus, incidentFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  /* ─── STATS ─── */

  const stats = useMemo(() => {
    const unresolved = reports.filter((report) => {
      const status = getStatusKey(report.status);
      return status === "new" || status === "emergency";
    }).length;

    const inProgress = reports.filter(
      (report) => getStatusKey(report.status) === "reviewing"
    ).length;

    const consultations = reports.filter(
      (report) => getStatusKey(report.status) === "consulting"
    ).length;

    const resolved = reports.filter(
      (report) => getStatusKey(report.status) === "resolved"
    ).length;

    return {
      unresolved,
      inProgress,
      consultations,
      resolved,
    };
  }, [reports]);

  /* ─── CUSTOM SELECT ─── */
function CustomSelect({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: { value: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((prev) => !prev)} className={`flex h-10 w-full items-center justify-between rounded-[8px] border bg-[#0B1224] px-3 text-right text-[11px] font-bold outline-none transition-all ${open ? "border-cyan-400/35 shadow-[0_0_16px_rgba(0,229,255,0.04)]" : "border-white/[0.07] hover:border-cyan-400/15"}`}>
        <span className="truncate text-slate-300">{selectedOption.label}</span>
        <span className={`mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-white/[0.05] bg-white/[0.025] text-slate-500 transition-all duration-200 ${open ? "border-cyan-400/15 bg-cyan-400/[0.05] text-cyan-300" : ""}`}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
        </span>
      </button>
      {open && <>
        <button type="button" aria-label="بستن منو" onClick={() => setOpen(false)} className="fixed inset-0 z-40 cursor-default" />
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 max-h-[280px] w-full overflow-y-auto rounded-[9px] border border-white/[0.08] bg-[#0B1224] p-[6px] shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
          {options.map((option) => { const selected = option.value === value; return (
            <button key={option.value} type="button" onClick={() => { onChange(option.value); setOpen(false); }} className={`flex w-full items-center justify-between rounded-[7px] px-3 py-2.5 text-right text-[11px] font-bold transition-all ${selected ? "bg-cyan-400/[0.08] text-cyan-300" : "text-slate-300 hover:bg-white/[0.05] hover:text-white"}`}>
              <span className="truncate">{option.label}</span>{selected && <span className="mr-2 shrink-0 text-cyan-300"><IconCheck /></span>}
            </button>
          ); })}
        </div>
      </>}
    </div>
  );
}

/* ─── STAT CARDS ─── */

  const statCards = [
    {
      title: "درخواست‌های بررسی‌نشده",
      value: stats.unresolved.toLocaleString(
        "fa-IR"
      ),
      icon: <IconSiren />,
      iconBg: "rgba(239,68,68,0.12)",
      iconColor: "#EF4444",
      iconBorder:
        "rgba(239,68,68,0.25)",
      trend: `${stats.unresolved.toLocaleString(
        "fa-IR"
      )} مورد`,
      trendColor: "#EF4444",
      glow: "rgba(239,68,68,0.08)",
      points: [1, 2, 2, 3, 3, 4, stats.unresolved],
    },

    {
      title: "پرونده‌های در جریان",
      value: stats.inProgress.toLocaleString(
        "fa-IR"
      ),
      icon: <IconShieldActive />,
      iconBg:
        "rgba(0,229,255,0.1)",
      iconColor: "#00E5FF",
      iconBorder:
        "rgba(0,229,255,0.22)",
      trend: `${stats.inProgress.toLocaleString(
        "fa-IR"
      )} فعال`,
      trendColor: "#00E5FF",
      glow:
        "rgba(0,229,255,0.06)",
      points: [1, 2, 3, 3, 4, 4, stats.inProgress],
    },

    {
      title: "جلسات مشاوره رزرو شده",
      value:
        stats.consultations.toLocaleString(
          "fa-IR"
        ),
      icon: <IconCalendar />,
      iconBg:
        "rgba(245,158,11,0.1)",
      iconColor: "#F59E0B",
      iconBorder:
        "rgba(245,158,11,0.22)",
      trend: `${stats.consultations.toLocaleString(
        "fa-IR"
      )} درخواست`,
      trendColor: "#F59E0B",
      glow:
        "rgba(245,158,11,0.06)",
      points: [1, 1, 2, 2, 3, 3, stats.consultations],
    },

    {
      title: "پرونده‌های مختومه (موفق)",
      value: stats.resolved.toLocaleString(
        "fa-IR"
      ),
      icon: <IconCheckCircle />,
      iconBg:
        "rgba(16,185,129,0.1)",
      iconColor: "#10B981",
      iconBorder:
        "rgba(16,185,129,0.22)",
      trend: `${stats.resolved.toLocaleString(
        "fa-IR"
      )} مختومه`,
      trendColor: "#10B981",
      glow:
        "rgba(16,185,129,0.06)",
      points: [1, 2, 3, 4, 5, 6, stats.resolved],
    },
  ];











  return (












    
    <div
      style={{
        background: "#050814",
        minHeight: "100vh",
        width: "100%",
        fontFamily:
          "Vazirmatn, sans-serif",
        color: "#E2E8F0",
        boxSizing: "border-box",
      }}
    >
      {/* Admin pages should not be indexed */}
      <meta
        name="robots"
        content="noindex, nofollow, noarchive"
      />

      {view === "dashboard" ? (
        <>
      <main
        style={{
          width: "100%",
          minHeight: "100vh",
          padding: "28px 24px",
          boxSizing: "border-box",
        }}
      >
        {/* ─── PAGE TITLE ─── */}

        <div
          style={{
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background:
                  "#00E5FF",
                display:
                  "inline-block",
                boxShadow:
                  "0 0 7px rgba(0,229,255,0.9)",
              }}
            />

            <span
              style={{
                fontFamily:
                  "monospace",
                fontSize:
                  "0.6rem",
                color:
                  "rgba(0,229,255,0.5)",
                letterSpacing:
                  "0.18em",
              }}
            >
              SOC // LIVE
            </span>

            <span
              style={{
                width: 4,
                height: 4,
                borderRadius:
                  "50%",
                background:
                  "#10B981",
                display:
                  "inline-block",
                boxShadow:
                  "0 0 5px rgba(16,185,129,0.9)",
                animation:
                  "soc-pulse 1.8s ease-in-out infinite",
              }}
            />
          </div>

          <h1
            style={{
              color: "#fff",
              fontWeight: 900,
              fontSize:
                "1.35rem",
              margin: 0,
            }}
          >
            پیشخوان فرماندهی
          </h1>
        </div>

        {/* ─── STAT CARDS ─── */}

        <div
          className="soc-stat-grid"
          style={{
            display: "grid",
            gap: 16,
            marginBottom: 28,
          }}
        >
          {statCards.map(
            (card) => (
              <div
                key={
                  card.title
                }
                style={{
                  background:
                    "#0A1128",
                  border:
                    "1px solid rgba(255,255,255,0.05)",
                  borderRadius:
                    14,
                  padding:
                    "18px 18px 16px",
                  position:
                    "relative",
                  overflow:
                    "hidden",
                  boxShadow: `0 0 40px ${card.glow}`,
                  transition:
                    "border-color 0.2s, transform 0.2s",
                  cursor:
                    "default",
                }}
                onMouseEnter={(
                  e
                ) => {
                  (
                    e.currentTarget as HTMLElement
                  ).style.borderColor =
                    card.iconBorder;

                  (
                    e.currentTarget as HTMLElement
                  ).style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(
                  e
                ) => {
                  (
                    e.currentTarget as HTMLElement
                  ).style.borderColor =
                    "rgba(255,255,255,0.05)";

                  (
                    e.currentTarget as HTMLElement
                  ).style.transform =
                    "none";
                }}
              >
                <div
                  style={{
                    position:
                      "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${card.iconColor}66, transparent)`,
                  }}
                />

                <div
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "flex-start",
                    justifyContent:
                      "space-between",
                    marginBottom:
                      14,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        color:
                          "#475569",
                        fontSize:
                          "0.76rem",
                        lineHeight:
                          1.5,
                        marginBottom:
                          8,
                        marginTop:
                          0,
                      }}
                    >
                      {
                        card.title
                      }
                    </p>

                    <div
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "baseline",
                        gap: 6,
                      }}
                    >
                      <span
                        style={{
                          color:
                            "#fff",
                          fontWeight:
                            900,
                          fontSize:
                            "2rem",
                          lineHeight:
                            1,
                          letterSpacing:
                            "-0.02em",
                        }}
                      >
                        {
                          card.value
                        }
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius:
                        10,
                      background:
                        card.iconBg,
                      border: `1px solid ${card.iconBorder}`,
                      display:
                        "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      color:
                        card.iconColor,
                      flexShrink: 0,
                    }}
                  >
                    {
                      card.icon
                    }
                  </div>
                </div>

                <div
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "space-between",
                  }}
                >
                  <div
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: 4,
                    }}
                  >
                    <span
                      style={{
                        color:
                          card.trendColor,
                      }}
                    >
                      <IconTrendUp />
                    </span>

                    <span
                      style={{
                        color:
                          card.trendColor,
                        fontSize:
                          "0.7rem",
                        fontFamily:
                          "monospace",
                      }}
                    >
                      {
                        card.trend
                      }
                    </span>
                  </div>

                  <Sparkline
                    color={
                      card.iconColor
                    }
                    points={
                      card.points
                    }
                  />
                </div>
              </div>
            )
          )}
        </div>

        {/* ─── FILTERS ─── */}
        <section className="mb-5 overflow-visible rounded-[14px] border border-[rgba(0,229,255,0.09)] bg-[#0A1128]">
          <div className="h-0.5 bg-gradient-to-l from-[#00E5FF]/40 via-[#00E5FF]/10 to-transparent" />
          <div className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[12px] font-black text-slate-300">جستجو و فیلتر</span>
              <span className="text-[10px] font-bold text-slate-600">{filteredData.length.toLocaleString("fa-IR")} مورد</span>
            </div>
<div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
  <div className="relative">
    <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[17px] text-slate-600">
      ⌕
    </span>

    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="جستجوی شناسه پرونده، شماره تماس یا شرح حادثه..."
      className="h-10 w-full rounded-[8px] border border-white/[0.07] bg-[#0B1224] pr-10 pl-4 text-[11px] font-bold text-slate-300 outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/30"
    />
  </div>

  <CustomSelect
    value={filterStatus}
    onChange={setFilterStatus}
    options={[
      { value: "all", label: "همه وضعیت‌ها" },
      { value: "emergency", label: "جدید / اورژانسی" },
      { value: "reviewing", label: "در حال بررسی" },
      { value: "consulting", label: "ارجاع به مشاوره" },
      { value: "resolved", label: "مختومه (موفق)" },
      { value: "closed", label: "بسته شده" },
    ]}
  />
</div>
          </div>
        </section>

        {/* ─── DATA TABLE ─── */}

        <div
          style={{
            background:
              "#0A1128",
            border:
              "1px solid rgba(0,229,255,0.08)",
            borderRadius: 16,
            overflow:
              "hidden",
          }}
        >
          {/* Table header */}

          <div
            className="soc-table-header"
            style={{
              padding:
                "18px 22px",
              borderBottom:
                "1px solid rgba(0,229,255,0.07)",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "space-between",
              gap: 12,
            }}
          >
            <div>
              <h2
                style={{
                  color:
                    "#fff",
                  fontWeight:
                    700,
                  fontSize:
                    "0.95rem",
                  marginBottom:
                    2,
                  marginTop:
                    0,
                }}
              >
                آخرین گزارش‌های بحران و درخواست‌ها
              </h2>

              <p
                style={{
                  color:
                    "#334155",
                  fontSize:
                    "0.68rem",
                  fontFamily:
                    "monospace",
                  margin: 0,
                }}
              >
                {filteredData.length.toLocaleString(
                  "fa-IR"
                )}{" "}
                پرونده نمایش داده می‌شود
              </p>
            </div>

            <div className="text-[10px] font-bold text-slate-600">{filteredData.length.toLocaleString("fa-IR")} پرونده</div>
          </div>

          {/* Table */}

          <div
            style={{
              overflowX:
                "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom:
                      "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {[
                    "شناسه پرونده",
                    "نام / شناسه تماس",
                    "نوع حادثه",
                    "تاریخ ثبت",
                    "وضعیت",
                    "عملیات",
                  ].map(
                    (col) => (
                      <th
                        key={
                          col
                        }
                        style={{
                          padding:
                            "11px 20px",
                          textAlign:
                            "right",
                          color:
                            "#334155",
                          fontSize:
                            "0.7rem",
                          fontWeight:
                            600,
                          fontFamily:
                            "monospace",
                          letterSpacing:
                            "0.05em",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {
                          col
                        }
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={
                        6
                      }
                      style={{
                        padding:
                          "40px 20px",
                        textAlign:
                          "center",
                        color:
                          "#475569",
                        fontSize:
                          "0.8rem",
                      }}
                    >
                      در حال دریافت پرونده‌ها...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan={
                        6
                      }
                      style={{
                        padding:
                          "40px 20px",
                        textAlign:
                          "center",
                        color:
                          "#EF4444",
                        fontSize:
                          "0.8rem",
                      }}
                    >
                      {
                        error
                      }
                    </td>
                  </tr>
                ) : filteredData.length ===
                  0 ? (
                  <tr>
                    <td
                      colSpan={
                        6
                      }
                      style={{
                        padding:
                          "40px 20px",
                        textAlign:
                          "center",
                        color:
                          "#475569",
                        fontSize:
                          "0.8rem",
                      }}
                    >
                      پرونده‌ای برای نمایش وجود ندارد.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map(
                    (row) => {
                      const currentStatus = getStatusKey(row.status);

                      const status =
                        statusConfig[
                          currentStatus
                        ];

                      const incident =
                        incidentTypes[
                          row.incidentType
                        ];

                      const isHovered =
                        hoveredRow ===
                        row.trackingCode;

                      return (
                        <tr
                          key={
                            row._id
                          }
                          onMouseEnter={() =>
                            setHoveredRow(
                              row.trackingCode
                            )
                          }
                          onMouseLeave={() =>
                            setHoveredRow(
                              null
                            )
                          }
                          style={{
                            borderBottom:
                              "1px solid rgba(255,255,255,0.03)",
                            background:
                              isHovered
                                ? "rgba(0,229,255,0.035)"
                                : "transparent",
                            transition:
                              "background 0.15s",
                            cursor:
                              "default",
                          }}
                        >
                          {/* Case ID */}

                          <td
                            style={{
                              padding:
                                "13px 20px",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            <span
                              style={{
                                fontFamily:
                                  "monospace",
                                fontSize:
                                  "0.78rem",
                                color:
                                  "#00E5FF",
                                fontWeight:
                                  600,
                                letterSpacing:
                                  "0.06em",
                              }}
                            >
                              {
                                row.trackingCode
                              }
                            </span>
                          </td>

                          {/* Contact */}

                          <td
                            style={{
                              padding:
                                "13px 20px",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            <span
                              style={{
                                fontSize:
                                  "0.82rem",
                                color:
                                  "#94A3B8",
                                fontFamily:
                                  "monospace",
                              }}
                            >
                              {
                                row.contact
                              }
                            </span>
                          </td>

                          {/* Incident type */}

                          <td
                            style={{
                              padding:
                                "13px 20px",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            <div
                              style={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap: 6,
                              }}
                            >
                              <span
                                style={{
                                  width: 5,
                                  height: 5,
                                  borderRadius:
                                    "50%",
                                  background:
                                    incident?.color ||
                                    "#64748B",
                                  display:
                                    "inline-block",
                                  boxShadow: `0 0 5px ${
                                    incident?.color ||
                                    "#64748B"
                                  }88`,
                                }}
                              />

                              <span
                                style={{
                                  fontSize:
                                    "0.8rem",
                                  color:
                                    "#CBD5E1",
                                }}
                              >
                                {
                                  incident?.label ||
                                  row.incidentType
                                }
                              </span>
                            </div>
                          </td>

                          {/* Date */}

                          <td
                            style={{
                              padding:
                                "13px 20px",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            <span
                              style={{
                                fontSize:
                                  "0.76rem",
                                color:
                                  "#475569",
                                fontFamily:
                                  "monospace",
                              }}
                            >
                              {mounted ? formatRelativeDate(row.createdAt) : "—"}
                            </span>
                          </td>

                          {/* Status */}

{/* Status */}

<td
  style={{
    padding: "13px 20px",
    whiteSpace: "nowrap",
  }}
>
  <p style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",margin:0,borderRadius:99,fontSize:"0.7rem",fontWeight:600,background:status.bg,border:`1px solid ${status.border}`,color:status.color,fontFamily:"Vazirmatn,sans-serif",opacity:currentStatus==="resolved"?0.7:1}}><span style={{width:4,height:4,borderRadius:"50%",background:status.color,display:"inline-block"}} />{status.label}</p>
</td>

                          {/* Action */}

                          <td
                            style={{
                              padding:
                                "13px 20px",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                           <button
  type="button"
  onClick={() => { setSelectedReport(row); setView("case"); }}
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: "5px 12px",
    borderRadius: 7,
    fontSize: "0.74rem",
    fontWeight: 600,
    background: isHovered
      ? "rgba(0,229,255,0.12)"
      : "rgba(0,229,255,0.06)",
    border: "1px solid rgba(0,229,255,0.28)",
    color: "#00E5FF",
    cursor: "pointer",
    fontFamily: "Vazirmatn,sans-serif",
    transition: "all 0.15s",
  }}
>
  <IconEye />
  بررسی
</button>
                          </td>
                        </tr>
                      );
                    }

































                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}

          <div
            style={{
              padding:
                "12px 22px",
              borderTop:
                "1px solid rgba(255,255,255,0.04)",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "space-between",
            }}
          >
            <span
              style={{
                color:
                  "#515f76",
                fontSize:
                  "0.68rem",
                fontFamily:
                  "monospace",
              }}
            >
              نمایش {filteredData.length === 0 ? 0 : ((currentPage - 1) * pageSize) + 1} تا {Math.min(currentPage * pageSize, filteredData.length)} از {filteredData.length} پرونده <span style={{color:"#334155",marginRight:6}}>• {pageSize} پرونده در هر صفحه</span>
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} style={{ width: 30, height: 30, borderRadius: 7, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", color: currentPage === 1 ? "#334155" : "#94A3B8", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}>←</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2)).map((page) => (
                <button key={page} type="button" onClick={() => setCurrentPage(page)} style={{ minWidth: 30, height: 30, padding: "0 7px", borderRadius: 7, background: page === currentPage ? "rgba(0,229,255,.1)" : "rgba(255,255,255,.03)", border: page === currentPage ? "1px solid rgba(0,229,255,.3)" : "1px solid rgba(255,255,255,.06)", color: page === currentPage ? "#00E5FF" : "#64748B", cursor: "pointer", fontFamily: "Vazirmatn,sans-serif", fontSize: ".68rem" }}>{page.toLocaleString("fa-IR")}</button>
              ))}
              <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} style={{ width: 30, height: 30, borderRadius: 7, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", color: currentPage === totalPages ? "#334155" : "#94A3B8", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}>→</button>
            </div>
          </div>
        </div>
      </main>

        </>
      ) : selectedReport ? (
        <CaseReviewPage report={selectedReport} onBack={() => { setSelectedReport(null); setView("dashboard"); }} onStatusChange={updateReportStatus} onDeleteReport={deleteReport} />
      ) : null}

      {/* ─── KEYFRAMES ─── */}

      <style>{`
        @keyframes soc-pulse { 0%,100% { opacity:1; box-shadow:0 0 5px rgba(16,185,129,.9); } 50% { opacity:.5; box-shadow:0 0 2px rgba(16,185,129,.4); } }
        .soc-stat-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-bottom:28px}.soc-table-header{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.soc-filter-group{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:flex-start}.soc-filter-label{color:#64748B;font:700 .64rem Vazirmatn,sans-serif;margin-left:2px;white-space:nowrap}
        .case-review-page{min-height:100vh;width:100%;background:#050814;color:#E2E8F0;box-sizing:border-box;overflow-x:hidden}.case-review-header{min-height:72px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:18px;padding:0 22px;background:rgba(10,17,40,.98);border-bottom:1px solid rgba(0,229,255,.08);box-sizing:border-box}.case-review-header-side{display:flex;align-items:center;min-width:0}.case-review-header-right{justify-content:flex-start}.case-review-header-left{justify-content:flex-end;gap:10px}.case-back-top{display:flex;align-items:center;gap:7px;background:transparent;border:0;color:#475569;font:600 .78rem Vazirmatn,sans-serif;cursor:pointer;padding:6px}.case-back-top:hover{color:#00E5FF}.case-review-title{display:flex;align-items:center;justify-content:center;gap:14px;min-width:0}.case-review-title h1{margin:0;color:#fff;font-size:1rem;font-weight:900;white-space:nowrap}.case-review-title h1 span{font-family:monospace;color:#00E5FF}.case-emergency-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 11px;border-radius:99px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.28);color:#EF4444;font-size:.68rem;font-weight:700;white-space:nowrap}.case-emergency-badge i{width:5px;height:5px;border-radius:50%;background:#EF4444;box-shadow:0 0 6px rgba(239,68,68,.9)}.case-static-status{display:inline-flex;align-items:center;gap:6px;padding:7px 11px;border:1px solid;border-radius:9px;margin:0;font-size:.74rem;font-weight:700;white-space:nowrap}.case-static-status i{width:5px;height:5px;border-radius:50%;display:inline-block}.case-status-select-wrap{position:relative;display:flex;align-items:center;min-width:205px;z-index:30}.case-status-select-label{position:absolute;right:13px;top:-7px;padding:0 6px;background:#0A1128;color:#64748B;font-size:.55rem;font-weight:800;line-height:1;z-index:4;pointer-events:none}.case-status-select-trigger{position:relative;z-index:2;width:100%;min-height:42px;padding:8px 13px 8px 34px;border:1px solid;border-radius:12px;outline:none;display:flex;align-items:center;justify-content:space-between;direction:rtl;font:.74rem Vazirmatn,sans-serif;font-weight:900;cursor:pointer;transition:transform .18s,filter .18s,box-shadow .18s}.case-status-select-trigger:hover{filter:brightness(1.12);transform:translateY(-1px)}.case-status-select-value{display:flex;align-items:center;gap:9px;min-width:0}.case-status-select-value i{width:7px;height:7px;border-radius:50%;display:block;flex:0 0 7px}.case-status-select-chevron{position:absolute;left:13px;top:50%;width:10px;height:10px;transform:translateY(-65%);pointer-events:none;transition:transform .18s}.case-status-select-chevron span{display:block;width:7px;height:7px;border-right:1.8px solid #CBD5E1;border-bottom:1.8px solid #CBD5E1;transform:rotate(45deg);transition:border-color .18s}.case-status-select-chevron.up{transform:translateY(-30%)}.case-status-select-chevron.up span{transform:rotate(225deg);border-color:#00E5FF}.case-status-select-menu{position:absolute;top:calc(100% + 9px);left:0;right:0;pointer-events:auto;padding:7px;background:rgba(7,12,27,.98);border:1px solid rgba(0,229,255,.16);border-radius:14px;box-shadow:0 18px 45px rgba(0,0,0,.5),0 0 28px rgba(0,229,255,.07);backdrop-filter:blur(18px);z-index:100;animation:caseStatusMenuIn .16s ease-out}.case-status-option{appearance:none;-webkit-appearance:none;width:100%;display:flex;align-items:center;gap:10px;min-height:39px;padding:8px 10px;border:1px solid transparent;border-radius:9px;background:transparent;color:#94A3B8;font:.72rem Vazirmatn,sans-serif;font-weight:800;cursor:pointer;direction:rtl;text-align:right;transition:background .15s,border-color .15s,color .15s,transform .15s}.case-status-option:hover{background:rgba(0,229,255,.06);border-color:rgba(0,229,255,.1);color:#E2E8F0;transform:translateX(-2px)}.case-status-option.selected{background:rgba(0,229,255,.075);border-color:rgba(0,229,255,.16);color:#fff}.case-status-option-dot{width:7px;height:7px;border-radius:50%;flex:0 0 7px}.case-status-option-text{flex:1;min-width:0}.case-status-option svg{color:#00E5FF;flex:0 0 auto}.case-status-select-wrap.is-open .case-status-select-trigger{transform:translateY(-1px)}@keyframes caseStatusMenuIn{from{opacity:0;transform:translateY(-5px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}.case-save-button{display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:9px;background:#00E5FF;border:1px solid rgba(0,229,255,.5);color:#050814;font:700 .76rem Vazirmatn,sans-serif;cursor:pointer;white-space:nowrap}.case-save-button.is-saved{background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.35);color:#10B981}
        .case-review-content{display:grid;grid-template-columns:minmax(0,1.85fr) minmax(280px,.9fr);gap:18px;padding:22px;box-sizing:border-box;align-items:start}.case-primary-column,.case-side-column{min-width:0;display:flex;flex-direction:column;gap:16px}.case-panel{background:#0A1128;border:1px solid rgba(0,229,255,.1);border-radius:16px;overflow:hidden;box-shadow:0 0 40px rgba(0,229,255,.03)}.case-main-panel{position:relative}.case-panel-accent{height:2px;background:linear-gradient(90deg,rgba(0,229,255,.5),rgba(0,229,255,.08),transparent)}.case-panel-header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 22px;border-bottom:1px solid rgba(0,229,255,.07)}.case-panel-header div{display:flex;align-items:center;gap:8px}.case-panel-header h2{margin:0;color:#fff;font-size:.9rem;font-weight:800}.case-live-dot{width:6px;height:6px;border-radius:50%;background:#00E5FF;box-shadow:0 0 7px rgba(0,229,255,.8)}.case-code{color:#1E293B;font:600 .6rem monospace;letter-spacing:.1em}.case-panel-body{padding:22px;display:flex;flex-direction:column;gap:24px}.case-grid-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.case-stack{display:flex;flex-direction:column;gap:18px}.case-contact-value{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.case-contact-value span{font:600 .88rem monospace;color:#E2E8F0;word-break:break-word}.case-contact-value button{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:6px;background:rgba(0,229,255,.06);border:1px solid rgba(0,229,255,.18);color:rgba(0,229,255,.75);font:.65rem Vazirmatn,sans-serif;cursor:pointer}.case-muted-value{font:600 .82rem monospace;color:#94A3B8;word-break:break-word}.case-strong-mono{font:700 .82rem monospace;color:#E2E8F0;word-break:break-all}.case-dim-value{font:.8rem Vazirmatn,sans-serif;color:#475569}.case-incident-badge{display:inline-flex;align-items:center;padding:6px 13px;border:1px solid;border-radius:8px;font-size:.8rem;font-weight:700}.case-description{background:#060B19;border:1px solid rgba(255,255,255,.06);border-right:3px solid rgba(0,229,255,.2);border-radius:10px;padding:14px 16px}.case-description p{margin:0;color:#94A3B8;font-size:.84rem;line-height:2;white-space:pre-wrap;word-break:break-word}.case-small-header{padding:15px 18px;border-bottom:1px solid rgba(255,255,255,.04)}.case-small-header h3{margin:0;color:#fff;font-size:.84rem;font-weight:800}.case-actions-body{padding:16px 18px;display:flex;flex-direction:column;gap:10px}.case-action-button,.case-danger-button,.case-close-button,.case-permanent-delete-button{width:100%;display:flex;align-items:center;justify-content:center;gap:7px;padding:10px;border-radius:9px;font:.8rem Vazirmatn,sans-serif;font-weight:700;cursor:pointer;transition:.18s}.case-action-button{background:transparent;border:1px solid rgba(0,229,255,.25);color:#00E5FF}.case-action-button:hover{background:rgba(0,229,255,.06)}.case-action-button.done{background:rgba(16,185,129,.1);border-color:rgba(16,185,129,.35);color:#10B981}.case-danger-button{margin-top:8px;background:linear-gradient(180deg,rgba(239,68,68,.09),rgba(239,68,68,.045));border:1px solid rgba(239,68,68,.22);color:#F87171}.case-danger-button:hover{background:rgba(239,68,68,.12);border-color:rgba(239,68,68,.38);color:#FCA5A5;transform:translateY(-1px)}.case-close-button{background:linear-gradient(180deg,rgba(245,158,11,.1),rgba(245,158,11,.045));border:1px solid rgba(245,158,11,.24);color:#FBBF24}.case-close-button:hover{background:rgba(245,158,11,.15);border-color:rgba(245,158,11,.42);color:#FCD34D;transform:translateY(-1px)}.case-permanent-delete-button{margin-top:4px;background:linear-gradient(180deg,rgba(239,68,68,.11),rgba(127,29,29,.08));border:1px solid rgba(239,68,68,.28);color:#F87171}.case-permanent-delete-button:hover{background:rgba(239,68,68,.17);border-color:rgba(239,68,68,.48);color:#FCA5A5;transform:translateY(-1px)}.case-permanent-delete-button:disabled{opacity:.5;cursor:not-allowed;transform:none}.case-notes-header{display:flex;align-items:center;justify-content:space-between;gap:8px}.case-notes-header span{display:flex;align-items:center;gap:4px;padding:3px 7px;border-radius:6px;background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.18);color:rgba(239,68,68,.55);font:.56rem monospace}.case-notes-body{padding:16px 18px;display:flex;flex-direction:column;gap:12px}.case-notes-body textarea{width:100%;box-sizing:border-box;resize:none;outline:none;background:#060B19;color:#E2E8F0;border:1px solid;border-radius:10px;padding:10px 12px;font:.78rem Vazirmatn,sans-serif;line-height:1.75;caret-color:#00E5FF}.case-note-submit{display:flex;align-items:center;justify-content:center;gap:6px;padding:9px;border-radius:9px;background:rgba(0,229,255,.1);border:1px solid rgba(0,229,255,.3);color:#00E5FF;font:.78rem Vazirmatn,sans-serif;font-weight:700;cursor:pointer}.case-note-submit:disabled{opacity:.3;cursor:not-allowed}.case-timeline{display:flex;flex-direction:column;gap:14px;min-height:90px;max-height:340px;overflow-y:auto;padding:2px 4px 2px 0;scrollbar-width:thin;scrollbar-color:rgba(0,229,255,.2) transparent}.case-timeline::-webkit-scrollbar{width:5px}.case-timeline::-webkit-scrollbar-track{background:transparent}.case-timeline::-webkit-scrollbar-thumb{background:rgba(0,229,255,.18);border-radius:99px}.case-note-row{display:flex;gap:10px;min-width:0}.case-avatar{width:28px;height:28px;border-radius:50%;flex:0 0 28px;display:flex;align-items:center;justify-content:center}.case-avatar.admin{background:rgba(0,229,255,.1);border:1px solid rgba(0,229,255,.25);color:#00E5FF}.case-avatar.system{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);color:#334155}.case-note-content{min-width:0;flex:1}.case-note-content div{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-bottom:4px}.case-note-content b{color:#00E5FF;font-size:.7rem}.case-note-content span{color:#1E293B;font:.6rem monospace}.case-note-content p{margin:0;color:#64748B;font-size:.75rem;line-height:1.7;word-break:break-word}.case-notes-loading{padding:10px 2px;color:#475569;font-size:.72rem;text-align:center}.case-note-edit{margin-right:auto;display:inline-flex;align-items:center;justify-content:center;gap:5px;min-height:28px;padding:4px 9px;border-radius:8px;background:linear-gradient(180deg,rgba(0,229,255,.08),rgba(0,229,255,.03));border:1px solid rgba(0,229,255,.16);color:#94A3B8;font:.6rem Vazirmatn,sans-serif;font-weight:700;cursor:pointer;transition:all .18s;box-shadow:inset 0 1px 0 rgba(255,255,255,.03)}.case-note-edit svg{opacity:.8}.case-note-edit:hover{color:#00E5FF;border-color:rgba(0,229,255,.32);background:rgba(0,229,255,.09);transform:translateY(-1px);box-shadow:0 5px 16px rgba(0,229,255,.08)}.case-note-edit:active{transform:translateY(0)}.case-note-edit-box{display:flex;flex-direction:column;gap:8px}.case-note-edit-box textarea{width:100%;box-sizing:border-box;resize:vertical;outline:none;background:#060B19;color:#E2E8F0;border:1px solid rgba(0,229,255,.2);border-radius:9px;padding:9px 10px;font:.74rem Vazirmatn,sans-serif;line-height:1.75}.case-note-edit-actions{display:flex;gap:7px;justify-content:flex-start}.case-note-edit-actions button{padding:7px 10px;border-radius:7px;font:.65rem Vazirmatn,sans-serif;font-weight:700;cursor:pointer}.case-note-edit-cancel{background:transparent;border:1px solid rgba(255,255,255,.08);color:#64748B}.case-note-edit-save{background:rgba(0,229,255,.1);border:1px solid rgba(0,229,255,.25);color:#00E5FF}.case-note-edit-save:disabled{opacity:.35;cursor:not-allowed}.case-review-footer{position:fixed;left:22px;bottom:22px;z-index:80;display:flex;justify-content:flex-start;padding:0}.case-review-footer button{display:flex;align-items:center;gap:7px;padding:10px 16px;border-radius:10px;background:rgba(10,17,40,.96);border:1px solid rgba(0,229,255,.28);color:#00E5FF;font:.75rem Vazirmatn,sans-serif;font-weight:700;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.35);backdrop-filter:blur(10px)}
        @media (max-width:1100px){.soc-stat-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.case-review-content{grid-template-columns:minmax(0,1.5fr) minmax(250px,1fr)}}
        @media (max-width:800px){.soc-stat-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.soc-table-header{align-items:stretch}.soc-filter-group{width:100%}.case-review-header{grid-template-columns:1fr;gap:10px;padding:12px 16px}.case-review-header-side,.case-review-header-left,.case-review-header-right{justify-content:space-between}.case-review-title{justify-content:flex-start;flex-wrap:wrap}.case-review-content{grid-template-columns:1fr;padding:16px}.case-review-footer{left:16px;bottom:16px;padding:0}.case-grid-2{grid-template-columns:1fr}.case-panel-header{padding:16px}.case-panel-body{padding:18px}}
.case-status-select-native{appearance:none;-webkit-appearance:none;width:100%;min-height:42px;padding:8px 36px 8px 34px;border:1px solid;border-radius:12px;outline:none;direction:rtl;background:transparent;color:inherit;font:.74rem Vazirmatn,sans-serif;font-weight:900;cursor:pointer;transition:filter .18s,box-shadow .18s}.case-status-select-native:hover{filter:brightness(1.12)}.case-status-select-native option{background:#0A1128;color:#E2E8F0;font-family:Vazirmatn,sans-serif}.case-status-native-dot{position:absolute;right:14px;width:7px;height:7px;border-radius:50%;pointer-events:none}.case-status-native-chevron{position:absolute;left:12px;top:50%;transform:translateY(-60%);color:#94A3B8;font-size:15px;line-height:1;pointer-events:none}.case-delete-overlay{position:fixed;inset:0;z-index:999;background:rgba(2,6,23,.72);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;animation:caseDeleteFade .16s ease-out}.case-delete-modal{width:min(440px,100%);background:linear-gradient(180deg,#0d1630,#080e20);border:1px solid rgba(239,68,68,.2);border-radius:18px;padding:24px;box-shadow:0 25px 80px rgba(0,0,0,.55),0 0 35px rgba(239,68,68,.07);text-align:right;animation:caseDeletePop .18s ease-out}.case-delete-icon{width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.22);color:#F87171;margin-bottom:14px}.case-delete-icon svg{width:20px;height:20px}.case-delete-copy h3{margin:0 0 8px;color:#fff;font-size:1rem;font-weight:900}.case-delete-copy p{margin:0;color:#94A3B8;font-size:.76rem;line-height:1.9}.case-delete-copy strong{color:#E2E8F0;font-family:monospace}.case-delete-actions{display:flex;gap:9px;margin-top:20px}.case-delete-actions button{flex:1;min-height:40px;border-radius:9px;font:.74rem Vazirmatn,sans-serif;font-weight:800;cursor:pointer}.case-delete-cancel{background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.08);color:#94A3B8}.case-delete-confirm{display:flex;align-items:center;justify-content:center;gap:7px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.3);color:#F87171}.case-delete-confirm:hover{background:rgba(239,68,68,.18);border-color:rgba(239,68,68,.45)}.case-permanent-delete-overlay{position:fixed;inset:0;z-index:1000;background:rgba(2,6,23,.78);backdrop-filter:blur(9px);display:flex;align-items:center;justify-content:center;padding:20px;animation:caseDeleteFade .16s ease-out}.case-permanent-delete-modal{width:min(460px,100%);background:linear-gradient(180deg,#160d17,#0b0912);border:1px solid rgba(239,68,68,.28);border-radius:18px;padding:24px;box-shadow:0 25px 80px rgba(0,0,0,.62),0 0 40px rgba(239,68,68,.1);text-align:right;animation:caseDeletePop .18s ease-out}.case-permanent-delete-icon{width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;background:rgba(239,68,68,.11);border:1px solid rgba(239,68,68,.25);color:#F87171;margin-bottom:14px}.case-permanent-delete-icon svg{width:20px;height:20px}.case-permanent-delete-copy h3{margin:0 0 8px;color:#fff;font-size:1rem;font-weight:900}.case-permanent-delete-copy p{margin:0;color:#94A3B8;font-size:.76rem;line-height:1.9}.case-permanent-delete-copy strong{color:#F8FAFC;font-family:monospace}.case-permanent-delete-actions{display:flex;gap:9px;margin-top:20px}.case-permanent-delete-actions button{flex:1;min-height:40px;border-radius:9px;font:.74rem Vazirmatn,sans-serif;font-weight:800;cursor:pointer}.case-permanent-delete-actions button:disabled{opacity:.5;cursor:not-allowed}.case-permanent-delete-confirm{display:flex;align-items:center;justify-content:center;gap:7px;background:rgba(239,68,68,.14);border:1px solid rgba(239,68,68,.35);color:#F87171}.case-permanent-delete-confirm:hover:not(:disabled){background:rgba(239,68,68,.2);border-color:rgba(239,68,68,.5);color:#FCA5A5}.case-delete-cancel:disabled{opacity:.5;cursor:not-allowed}.@keyframes caseDeleteFade{from{opacity:0}to{opacity:1}}@keyframes caseDeletePop{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}        @media (max-width:560px){.soc-stat-grid{grid-template-columns:1fr;gap:12px}.case-review-title h1{font-size:.9rem}.case-review-header-left{width:100%;flex-wrap:wrap;align-items:stretch}.case-status-select-wrap,.case-save-button{flex:1}.case-status-select-wrap{min-width:0}.case-status-select-menu{position:absolute;top:calc(100% + 9px);left:0;right:0;width:auto;margin-top:0}.case-save-button{justify-content:center}.case-panel-header{align-items:flex-start;flex-direction:column}.case-code{align-self:flex-start}.case-panel-body{padding:15px}.case-review-content{padding:12px}.case-actions-body,.case-notes-body{padding:14px}.case-review-footer{left:12px;bottom:12px;padding:0}.case-review-footer button{width:auto;justify-content:center}}
.case-notes-body{min-height:360px;}
.case-timeline{max-height:430px;min-height:180px;overflow-y:auto;padding-inline-end:6px;}
.case-note-content div{color:rgba(245,248,255,.9);}
.case-note-content div b{color:#fff;}
.case-note-content div span{color:rgba(245,248,255,.82);}
.case-note-content div span + span{color:rgba(245,248,255,.9);}
.case-note-edit{color:rgba(245,248,255,.92)!important;border-color:rgba(255,255,255,.14)!important;background:rgba(255,255,255,.045)!important;}
.case-note-edit:hover{color:#fff!important;background:rgba(255,255,255,.085)!important;border-color:rgba(255,255,255,.24)!important;}
.case-note-edit svg{opacity:.95;}
.case-panel,.case-small-header,.case-actions-body,.case-notes-body{color:rgba(245,248,255,.92);}
.case-notes-loading{color:rgba(245,248,255,.82)!important;}

.case-status-select-trigger{appearance:none;-webkit-appearance:none;position:relative;z-index:2;width:100%;min-height:42px;padding:8px 13px 8px 34px;border:1px solid;border-radius:12px;outline:none;display:flex;align-items:center;justify-content:space-between;direction:rtl;font:.74rem Vazirmatn,sans-serif;font-weight:900;cursor:pointer;transition:transform .18s,filter .18s,box-shadow .18s;}
.case-status-select-trigger:hover{filter:brightness(1.1);transform:translateY(-1px);}
.case-status-select-trigger:focus-visible{box-shadow:0 0 0 3px rgba(0,229,255,.12)!important;}
.case-status-select-value{display:flex;align-items:center;gap:9px;min-width:0;}
.case-status-select-value span{color:inherit;font-weight:900;}
.case-status-select-value i{width:7px;height:7px;border-radius:50%;display:block;flex:0 0 7px;}
.case-status-select-chevron{position:absolute;left:13px;top:50%;width:11px;height:11px;transform:translateY(-65%);pointer-events:none;transition:transform .18s;}
.case-status-select-chevron span{display:block;width:7px;height:7px;border-right:1.8px solid #CBD5E1;border-bottom:1.8px solid #CBD5E1;transform:rotate(45deg);transition:border-color .18s,transform .18s;}
.case-status-select-chevron.up{transform:translateY(-30%);}
.case-status-select-chevron.up span{transform:rotate(225deg);border-color:#00E5FF;}
.case-status-select-menu{position:absolute;top:calc(100% + 9px);left:0;right:0;pointer-events:auto;padding:7px;background:rgba(7,12,27,.99);border:1px solid rgba(0,229,255,.18);border-radius:14px;box-shadow:0 18px 45px rgba(0,0,0,.58),0 0 28px rgba(0,229,255,.08);backdrop-filter:blur(18px);z-index:100;animation:caseStatusMenuIn .16s ease-out;}
.case-status-option{appearance:none;-webkit-appearance:none;width:100%;display:flex;align-items:center;gap:10px;min-height:41px;padding:8px 10px;border:1px solid transparent;border-radius:9px;background:transparent;color:#CBD5E1;font:.72rem Vazirmatn,sans-serif;font-weight:800;cursor:pointer;direction:rtl;text-align:right;transition:background .15s,border-color .15s,color .15s,transform .15s;}
.case-status-option:hover{background:rgba(0,229,255,.07);border-color:rgba(0,229,255,.13);color:#fff;transform:translateX(-2px);}
.case-status-option.selected{background:rgba(0,229,255,.085);border-color:rgba(0,229,255,.2);color:#fff;}
.case-status-option-dot{width:7px;height:7px;border-radius:50%;flex:0 0 7px;}
.case-status-option-text{flex:1;min-width:0;color:inherit!important;}
.case-status-option svg{color:#00E5FF;flex:0 0 auto;}
.case-status-select-wrap.is-open .case-status-select-trigger{transform:translateY(-1px);}
.case-status-select-wrap{z-index:120;}
.case-notes-body{min-height:360px;}
.case-timeline{min-height:180px;max-height:430px;overflow-y:auto;padding-inline-end:7px;}
.case-note-content div{color:rgba(248,250,252,.94)!important;}
.case-note-content div b{color:#fff!important;}
.case-note-content div span{color:rgba(226,232,240,.9)!important;font-weight:600;}
.case-note-content div span + span{color:rgba(248,250,252,.96)!important;font-weight:700;}
.case-note-content p{color:#CBD5E1!important;}
.case-note-edit{color:#E2E8F0!important;border-color:rgba(255,255,255,.16)!important;background:rgba(255,255,255,.055)!important;}
.case-note-edit:hover{color:#fff!important;background:rgba(255,255,255,.09)!important;border-color:rgba(255,255,255,.25)!important;}
.case-notes-loading{color:#CBD5E1!important;}
.case-small-header h3,.case-panel-header h2{color:#fff!important;}
.case-contact-value span,.case-strong-mono{color:#F1F5F9!important;}
.case-muted-value{color:#CBD5E1!important;}
.case-description p{color:#CBD5E1!important;}
      `}
</style>





    </div>
  );
}