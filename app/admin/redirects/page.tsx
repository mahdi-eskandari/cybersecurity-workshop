"use client";

import { useEffect, useState } from "react";

type MatchType = "exact" | "regex";

type RedirectRule = {
  _id: string;
  fromPath: string;
  toPath: string;
  statusCode: number;
  matchType?: MatchType;
  isActive?: boolean;
  reason?: string;
};

type SelectOption<T> = { value: T; label: string; description: string };

/* ─── OPTIONS ─── */

const STATUS_OPTIONS: SelectOption<number>[] = [
  { value: 301, label: "301 — انتقال دائمی", description: "بهترین گزینه برای سئو هنگام تغییر URL" },
  { value: 302, label: "302 — انتقال موقت", description: "برای جابه‌جایی کوتاه‌مدت" },
  { value: 307, label: "307 — موقت (حفظ متد)", description: "مثل 302 ولی متد HTTP حفظ می‌شود" },
  { value: 308, label: "308 — دائمی (حفظ متد)", description: "مثل 301 ولی متد HTTP حفظ می‌شود" },
  { value: 410, label: "410 — حذف دائمی", description: "محتوا دیگر وجود ندارد و برنمی‌گردد" },
];

const MATCH_TYPE_OPTIONS: SelectOption<MatchType>[] = [
  { value: "exact", label: "تطبیق دقیق", description: "مسیر باید دقیقاً برابر باشد" },
  { value: "regex", label: "عبارت منظم (Regex)", description: "الگوی پیشرفته با گروه‌های () و $1" },
];

/* ─── SHARED CLASSES ─── */

const labelClass = "text-[0.72rem] font-bold text-slate-800";
const hintClass = "text-[0.65rem] font-medium text-slate-400";

const inputClass =
  "w-full rounded-lg border border-[#1E3A8A]/[0.14] bg-[#F3F7FC] px-[10px] py-[8px] text-[0.8rem] font-medium text-slate-800 outline-none caret-[#1565C0] transition placeholder:text-slate-400 hover:border-[#1565C0]/[0.3] focus:border-[#1565C0]/[0.6] focus:ring-[3px] focus:ring-[#1565C0]/[0.09] disabled:cursor-not-allowed disabled:bg-[#E6ECF5] disabled:text-slate-400";

const cardClass =
  "rounded-2xl border border-[#1565C0]/[0.15] bg-white";

function badgeStyle(code: number) {
  if (code === 410) return { color: "#DC2626", bg: "rgba(220,38,38,0.08)", border: "rgba(220,38,38,0.25)" };
  if (code === 302 || code === 307)
    return { color: "#B45309", bg: "rgba(217,119,6,0.09)", border: "rgba(217,119,6,0.25)" };
  return { color: "#FFFFFF", bg: "#1565C0", border: "#1565C0" };
}

/* ─── ICONS ─── */

const IconChevron = ({ open }: { open: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/* ─── CUSTOM SELECT ─── */

function OptionSelect<T extends string | number>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: Array<SelectOption<T>>;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
        className={`flex w-full items-center justify-between gap-3 rounded-lg border bg-[#F6F9FD] px-[10px] py-[7px] text-right outline-none transition ${
          open
            ? "border-[#1565C0]/[0.55] ring-[3px] ring-[#1565C0]/[0.09]"
            : "border-[#1E3A8A]/[0.14] hover:border-[#1565C0]/[0.3] focus-visible:border-[#1565C0]/[0.55] focus-visible:ring-[3px] focus-visible:ring-[#1565C0]/[0.09]"
        }`}
      >
        <span className="min-w-0">
          <span className="block truncate text-[0.8rem] font-bold text-slate-900">{selected.label}</span>
          <span className="block truncate text-[0.65rem] font-medium text-slate-400">{selected.description}</span>
        </span>
        <span className="shrink-0 text-slate-400">
          <IconChevron open={open} />
        </span>
      </button>

      {open && (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-label="بستن منو"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            role="listbox"
            className="absolute inset-x-0 top-[calc(100%+8px)] z-50 max-h-[320px] overflow-y-auto rounded-[9px] border border-[#1E3A8A]/[0.16] bg-[#F6F9FD] p-[6px] shadow-[0_16px_40px_rgba(15,23,42,0.18)]"
          >
            {options.map((o) => {
              const isSelected = o.value === value;
              return (
                <button
                  key={String(o.value)}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-[7px] px-3 py-2.5 text-right transition ${
                    isSelected ? "bg-[#1565C0]/[0.11]" : "hover:bg-[#1E3A8A]/[0.07]"
                  }`}
                >
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${isSelected ? "bg-[#1565C0]" : "bg-[#1E3A8A]/[0.16]"}`}
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-[0.8rem] font-bold ${isSelected ? "text-[#1565C0]" : "text-slate-800"}`}
                    >
                      {o.label}
                    </span>
                    <span className="block text-[0.65rem] font-medium text-slate-400">{o.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */

export default function RedirectsSection() {
  const [rules, setRules] = useState<RedirectRule[]>([]);
  const [matchType, setMatchType] = useState<MatchType>("exact");
  const [statusCode, setStatusCode] = useState(301);
  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");
  const [reason, setReason] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const is410 = statusCode === 410;
  const isRegex = matchType === "regex";

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/seo/redirect-rules", { cache: "no-store" });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.message || "دریافت ریدایرکت‌ها انجام نشد.");
      setRules(result.rules || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در دریافت ریدایرکت‌ها.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    setMessage("");
    setError("");

    if (!fromPath.trim()) return setError("مسیر قدیمی را وارد کنید.");
    if (!is410 && !toPath.trim()) return setError("مسیر مقصد را وارد کنید.");

    if (isRegex) {
      try {
        new RegExp(fromPath.trim());
      } catch {
        return setError("عبارت منظم (Regex) واردشده معتبر نیست.");
      }
    }

    try {
      setSaving(true);
      const res = await fetch("/api/admin/seo/redirect-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          statusCode,
          matchType,
          fromPath: fromPath.trim(),
          toPath: is410 ? "" : toPath.trim(),
          reason: reason.trim(),
          isActive,
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.message || "ذخیره انجام نشد.");

      setFromPath("");
      setToPath("");
      setReason("");
      setIsActive(true);
      setMatchType("exact");
      setMessage("قانون با موفقیت ثبت شد.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ذخیره.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (rule: RedirectRule) => {
    setMessage("");
    setError("");
    const next = rule.isActive === false; // قانون غیرفعال → فعال می‌شود و برعکس
    try {
      const res = await fetch("/api/admin/seo/redirect-rules", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: rule._id, isActive: next }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.message || "تغییر وضعیت انجام نشد.");
      setRules((prev) => prev.map((r) => (r._id === rule._id ? { ...r, isActive: next } : r)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در تغییر وضعیت.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("این قانون حذف شود؟")) return;
    setMessage("");
    setError("");
    try {
      const res = await fetch(`/api/admin/seo/redirect-rules?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.message || "حذف انجام نشد.");
      setRules((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در حذف.");
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-[#EEF3FA] text-slate-800"
      style={{ fontFamily: "var(--font-vazirmatn), sans-serif" }}
    >
      {/* Admin pages should not be indexed */}
      <meta name="robots" content="noindex, nofollow, noarchive" />

      <main className="mx-auto grid w-full gap-4 px-6 py-6 md:px-7">
        {/* ─── PAGE TITLE ─── */}
        <header className="mb-2">


                        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1565C0", boxShadow: "0 0 7px rgba(21,101,192,0.9)", marginBottom: "1px" }} />
                <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(21,101,192,0.77)", letterSpacing: "0.18em" }}>
                  SEO // REDIRECTS
                </span>
              </div>
          <h1 className="m-0 text-xl font-black leading-tight text-[#0F172A]">مدیریت ریدایرکت</h1>
          <p className="mt-2 text-xs font-medium text-slate-500">
            ریدایرکت دقیق یا Regex با کدهای 301، 302، 307، 308 و حذف دائمی 410
          </p>
        </header>

        {/* ─── NEW REDIRECT CARD ─── */}
        <section className={cardClass}>
          <div className="border-b border-[#1E3A8A]/[0.08] px-5 py-3.5">
            <h2 className="m-0 text-sm font-bold text-[#0F172A]">ریدایرکت جدید</h2>
          </div>

          <div className="grid gap-4 p-5">
            {error && (
              <div
                role="alert"
                className="rounded-[10px] border border-red-500/[0.255] bg-red-500/[0.075] px-4 py-3 text-[12px] font-bold text-red-700"
              >
                {error}
              </div>
            )}
            {message && (
              <div
                role="status"
                className="rounded-[10px] border border-emerald-500/[0.33] bg-emerald-500/[0.1] px-4 py-3 text-[12px] font-bold text-emerald-700"
              >
                {message}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <span className={labelClass}>نوع تطبیق</span>
                <OptionSelect<MatchType> value={matchType} onChange={setMatchType} options={MATCH_TYPE_OPTIONS} />
              </div>

              <div className="flex flex-col gap-2">
                <span className={labelClass}>کد وضعیت</span>
                <OptionSelect<number> value={statusCode} onChange={setStatusCode} options={STATUS_OPTIONS} />
                <p className={hintClass}>کد HTTP که به مرورگر و موتور جستجو برمی‌گردد</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="redirect-from" className={labelClass}>
                  از مسیر (قدیمی) <span className="text-red-500">*</span>
                </label>
                <input
                  id="redirect-from"
                  dir="ltr"
                  value={fromPath}
                  onChange={(e) => setFromPath(e.target.value)}
                  className={`${inputClass} text-left`}
                  placeholder={isRegex ? "^/old-(.*)$" : "/old-url"}
                />
                <p className={hintClass}>
                  {isRegex
                    ? "الگو روی مسیر (با / ابتدایی) اجرا می‌شود؛ در مقصد می‌توانید از $1 و $2 استفاده کنید"
                    : "بدون دامنه، فقط مسیر داخلی؛ مثال: /old-url"}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="redirect-to" className={labelClass}>
                  به مسیر (جدید) {!is410 && <span className="text-red-500">*</span>}
                </label>
                <input
                  id="redirect-to"
                  dir="ltr"
                  value={is410 ? "" : toPath}
                  disabled={is410}
                  onChange={(e) => setToPath(e.target.value)}
                  className={`${inputClass} text-left`}
                  placeholder={is410 ? "برای 410 مقصد لازم نیست" : isRegex ? "/new-$1" : "/new-url"}
                />
                <p className={hintClass}>می‌تواند داخلی یا https://... باشد</p>
              </div>
            </div>

            <div className="grid items-end gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="redirect-reason" className={labelClass}>
                  یادداشت
                </label>
                <input
                  id="redirect-reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className={inputClass}
                  placeholder="دلیل تغییر یا حذف URL"
                />
              </div>

              <label className="flex h-[38px] w-fit cursor-pointer select-none items-center gap-2.5 rounded-lg border border-[#1E3A8A]/[0.14] bg-[#F6F9FD] px-3 text-[0.8rem] font-bold text-slate-700 transition hover:border-[#1565C0]/[0.3]">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 cursor-pointer accent-[#1565C0]"
                />
                فعال
              </label>
            </div>

            <div>
              <button
                type="button"
                disabled={saving}
                onClick={handleAdd}
                className="inline-flex items-center justify-center rounded-[10px] bg-[#1565C0] px-[18px] py-[9px] text-[0.82rem] font-bold text-white shadow-[0_8px_20px_rgba(21,101,192,0.3)] transition hover:bg-[#0D47A1] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1565C0]/[0.25] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "در حال ذخیره..." : "افزودن ریدایرکت"}
              </button>
            </div>
          </div>
        </section>

        {/* ─── RULES LIST ─── */}
        {loading || rules.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-[#1E3A8A]/[0.2] bg-white/60 px-5 py-14 text-center text-xs font-medium text-slate-500">
            {loading ? "در حال دریافت..." : "هنوز ریدایرکتی ثبت نشده است."}
          </section>
        ) : (
          <section className={cardClass}>
            <div className="flex items-center gap-3 border-b border-[#1E3A8A]/[0.08] px-5 py-3.5">
              <h2 className="m-0 text-sm font-bold text-[#0F172A]">قوانین ثبت‌شده</h2>
              <span className="rounded-full bg-[#1E3A8A]/[0.06] px-2.5 py-0.5 text-[11px] font-bold text-slate-500">
                {rules.length.toLocaleString("fa-IR")} مورد
              </span>
            </div>

            <div className="grid gap-2.5 p-4">
              {rules.map((rule) => {
                const badge = badgeStyle(rule.statusCode);
                const active = rule.isActive !== false;
                const isRuleRegex = rule.matchType === "regex";
                const fromLabel = isRuleRegex || rule.fromPath.startsWith("/") ? rule.fromPath : `/${rule.fromPath}`;

                return (
                  <div
                    key={rule._id}
                    className={`flex flex-col gap-3 rounded-xl border border-[#1E3A8A]/[0.08] bg-[#F6F9FD] px-4 py-3 transition-colors hover:border-[#1565C0]/[0.4] sm:flex-row sm:items-center sm:justify-between ${
                      active ? "" : "opacity-60"
                    }`}
                  >
                    <div className="flex min-w-0 flex-col items-start gap-2 sm:flex-1">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <span
                          className="inline-flex shrink-0 items-center rounded-full border px-2.5 py-[3px] text-[11px] font-bold"
                          style={{ color: badge.color, background: badge.bg, borderColor: badge.border }}
                        >
                          {rule.statusCode}
                        </span>

                        {isRuleRegex && (
                          <span className="inline-flex shrink-0 items-center rounded-full border border-violet-600/[0.3] bg-violet-600/[0.08] px-2.5 py-[3px] text-[11px] font-bold text-violet-700">
                            Regex
                          </span>
                        )}

                        {!active && (
                          <span className="inline-flex shrink-0 items-center rounded-full border border-slate-400/[0.35] bg-slate-400/[0.1] px-2.5 py-[3px] text-[11px] font-bold text-slate-500">
                            غیرفعال
                          </span>
                        )}

                        {rule.reason ? (
                          <span className="min-w-0 truncate text-[11px] font-medium text-slate-500">
                            {rule.reason}
                          </span>
                        ) : null}
                      </div>

                      <span
                        dir="ltr"
                        className="max-w-full break-all font-mono text-[12px] text-slate-700 sm:truncate sm:break-normal"
                      >
                        {fromLabel}
                        {rule.statusCode !== 410 ? (
                          <>
                            <span className="mx-2 text-slate-400">→</span>
                            {rule.toPath}
                          </>
                        ) : (
                          <span className="mx-2 text-red-600">(Gone)</span>
                        )}
                      </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(rule)}
                        className="rounded-lg border border-[#1E3A8A]/[0.14] bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 transition-colors hover:border-[#1565C0]/[0.4] hover:text-[#1565C0]"
                      >
                        {active ? "غیرفعال کردن" : "فعال کردن"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(rule._id)}
                        className="rounded-lg border border-red-500/[0.25] bg-red-500/[0.06] px-3 py-1.5 text-[11px] font-bold text-red-600 transition-colors hover:bg-red-500/[0.12]"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
