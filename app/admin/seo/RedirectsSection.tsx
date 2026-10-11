"use client";

import { useEffect, useState } from "react";

type RedirectRule = {
  _id: string;
  fromPath: string;
  toPath: string;
  statusCode: number;
};

const STATUS_OPTIONS = [
  { value: 301, label: "301 — انتقال دائمی", description: "بهترین گزینه برای سئو هنگام تغییر URL" },
  { value: 302, label: "302 — انتقال موقت", description: "برای جابه‌جایی کوتاه‌مدت" },
  { value: 307, label: "307 — موقت (حفظ متد)", description: "مثل 302 ولی متد HTTP حفظ می‌شود" },
  { value: 308, label: "308 — دائمی (حفظ متد)", description: "مثل 301 ولی متد HTTP حفظ می‌شود" },
  { value: 410, label: "410 — حذف دائمی", description: "محتوا دیگر وجود ندارد و برنمی‌گردد" },
];

const inputClass =
  "box-border w-full rounded-lg border border-[#1E3A8A]/[0.14] bg-[#F3F7FC] px-[10px] py-[9px] text-[0.8rem] text-slate-800 outline-none caret-[#1565C0] transition-all duration-150 focus:border-[#1565C0]/[0.6] focus:ring-[3px] focus:ring-[#1565C0]/[0.09] disabled:cursor-not-allowed disabled:text-slate-400";

function badgeClass(code: number) {
  if (code === 410) return "border-red-500/[0.3] bg-red-500/[0.08] text-red-700";
  if (code === 302 || code === 307)
    return "border-amber-500/[0.3] bg-amber-500/[0.08] text-amber-700";
  return "border-[#1565C0]/[0.3] bg-[#1565C0]/[0.08] text-[#1565C0]";
}

function StatusSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = STATUS_OPTIONS.find((o) => o.value === value) ?? STATUS_OPTIONS[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`flex w-full items-center justify-between rounded-[8px] border bg-[#F6F9FD] px-3 py-2 text-right outline-none transition-all ${
          open
            ? "border-[#1565C0]/[0.555] shadow-[0_0_16px_rgba(21,101,192,0.08)]"
            : "border-[#1E3A8A]/[0.14] hover:border-[#1565C0]/[0.255]"
        }`}
      >
        <span className="min-w-0">
          <span className="block truncate text-[11px] font-bold text-slate-700">
            {selected.label}
          </span>
          <span className="block text-[10px] text-slate-500 sm:truncate">
            {selected.description}
          </span>
        </span>
        <span className={`mr-2 text-slate-500 transition-all ${open ? "rotate-180" : ""}`}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="بستن منو"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="absolute right-0 top-[calc(100%+6px)] z-50 max-h-[230px] w-full overflow-y-auto rounded-[9px] border border-[#1E3A8A]/[0.16] bg-[#F6F9FD] p-[6px] shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
            {STATUS_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`flex w-full flex-col items-start rounded-[7px] px-3 py-2.5 text-right transition-all ${
                  o.value === value
                    ? "bg-[#1565C0]/[0.114] text-[#1565C0]"
                    : "text-slate-700 hover:bg-[#1E3A8A]/[0.075]"
                }`}
              >
                <span className="text-[11px] font-bold">{o.label}</span>
                <span className="text-[10px] font-medium text-slate-500">{o.description}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function RedirectsSection() {
  const [rules, setRules] = useState<RedirectRule[]>([]);
  const [statusCode, setStatusCode] = useState(301);
  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const is410 = statusCode === 410;

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

    try {
      setSaving(true);
      const res = await fetch("/api/admin/seo/redirect-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          statusCode,
          fromPath: fromPath.trim(),
          toPath: is410 ? "" : toPath.trim(),
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.message || "ذخیره انجام نشد.");

      setFromPath("");
      setToPath("");
      setMessage("قانون با موفقیت ثبت شد.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ذخیره.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("این قانون حذف شود؟")) return;
    setMessage("");
    setError("");
    try {
      const res = await fetch(`/api/admin/seo/redirect-rules?id=${id}`, { method: "DELETE" });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.message || "حذف انجام نشد.");
      setRules((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در حذف.");
    }
  };

  return (
    <div className="mt-5 rounded-[14px] border border-[#1565C0]/[0.15] bg-white">
      <div className="h-0.5 rounded-t-[14px] bg-gradient-to-r from-[#1565C0]/50 via-[#1565C0]/10 to-transparent" />

      <div className="border-b border-[#1E3A8A]/[0.08] px-4 py-4 sm:px-5">
        <div className="text-[0.82rem] font-bold text-[#0F172A]">
          ریدایرکت 301 و حذف دائمی 410
        </div>
        <div className="mt-1 text-[10px] leading-5 text-slate-500">
          برای آدرس‌هایی که از قبل منتشر شده‌اند و دیگر وجود ندارند یا جابه‌جا شده‌اند.
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5">
        {error && (
          <div className="rounded-[10px] border border-red-500/[0.255] bg-red-500/[0.075] px-4 py-3 text-xs font-bold text-red-700">
            {error}
          </div>
        )}
        {message && (
          <div className="rounded-[10px] border border-emerald-500/[0.33] bg-emerald-500/[0.101] px-4 py-3 text-xs font-bold text-emerald-700">
            {message}
          </div>
        )}

        <div className="flex flex-col gap-[5px]">
          <label className="font-mono text-[0.68rem] font-semibold tracking-widest text-slate-600">
            کد وضعیت
          </label>
          <StatusSelect value={statusCode} onChange={setStatusCode} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-[5px]">
            <label className="font-mono text-[0.68rem] font-semibold tracking-widest text-slate-600">
              مسیر قدیمی (بدون دامنه)
            </label>
            <input
              dir="ltr"
              value={fromPath}
              onChange={(e) => setFromPath(e.target.value)}
              className={`${inputClass} text-left font-mono`}
              placeholder="/old-url"
            />
          </div>

          <div className="flex flex-col gap-[5px]">
            <label className="font-mono text-[0.68rem] font-semibold tracking-widest text-slate-600">
              مسیر مقصد (بدون دامنه)
            </label>
            <input
              dir="ltr"
              value={is410 ? "" : toPath}
              disabled={is410}
              onChange={(e) => setToPath(e.target.value)}
              className={`${inputClass} text-left font-mono`}
              placeholder={is410 ? "برای 410 مقصد لازم نیست" : "/new-url"}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            disabled={saving}
            onClick={handleAdd}
            className={`w-full rounded-lg border px-5 py-2.5 text-[12px] font-black transition-all sm:w-auto ${
              saving
                ? "cursor-not-allowed border-[#1E3A8A]/[0.14] bg-[#1E3A8A]/[0.054] text-slate-500"
                : "cursor-pointer border-[#1565C0]/[0.77] bg-[#1565C0] text-white shadow-[0_8px_24px_rgba(21,101,192,0.3)] hover:bg-[#0D47A1]"
            }`}
          >
            {saving ? "در حال ذخیره..." : "افزودن قانون"}
          </button>
        </div>

        <div className="border-t border-[#1E3A8A]/[0.08] pt-4">
          <div className="mb-3 text-[11px] font-bold text-slate-700">قوانین ثبت‌شده</div>

          {loading ? (
            <div className="text-[11px] text-slate-400">در حال دریافت...</div>
          ) : rules.length === 0 ? (
            <div className="text-[11px] text-slate-400">هنوز قانونی ثبت نشده است.</div>
          ) : (
            <div className="grid max-h-[560px] gap-2 overflow-y-auto pl-1">
              {rules.map((rule) => (
                <div
                  key={rule._id}
                  className="flex flex-col gap-2 rounded-lg border border-[#1E3A8A]/[0.08] bg-[#F3F7FC] px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                >
                  <div className="flex min-w-0 items-start gap-3 sm:items-center">
                    <span className={`shrink-0 rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold ${badgeClass(rule.statusCode)}`}>
                      {rule.statusCode}
                    </span>
                    <span dir="ltr" className="min-w-0 break-all font-mono text-[11px] text-slate-700 sm:truncate sm:break-normal">
                      {rule.fromPath.startsWith("/") ? rule.fromPath : `/${rule.fromPath}`}
                      {rule.statusCode !== 410 && (
                        <>
                          <span className="mx-2 text-slate-400">→</span>
                          {rule.toPath.startsWith("/") ? rule.toPath : `/${rule.toPath}`}
                        </>
                      )}
                      {rule.statusCode === 410 && (
                        <span className="mx-2 text-red-600">(Gone)</span>
                      )}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(rule._id)}
                    className="shrink-0 self-end rounded-md border border-red-500/[0.25] px-2.5 py-1 text-[10px] font-bold text-red-700 transition-all hover:bg-red-500/[0.08] sm:self-auto"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
