"use client";

// app/admin/site-seo/page.tsx  (اسم پوشه را هر چه خواستی می‌توانی عوض کنی)

import { useEffect, useMemo, useState } from "react";

import {
  buildRobotsTxt,
  isSiteBlocked,
  parseDisallowLines,
  SITE_SEO_DEFAULTS,
  type SiteSeoSettings,
} from "@/lib/siteSeoShared";

/* ─── shared classes (هماهنگ با صفحه‌ی SEO صفحات) ─── */

const cardClass = "overflow-hidden rounded-[14px] border border-[#1565C0]/[0.15] bg-white";



const textareaClass =
"box-border w-full rounded-lg border border-[#1E3A8A]/[0.14] bg-[#F3F7FC] px-3 py-2.5 text-[0.8rem] leading-6 text-slate-800 outline-none caret-[#1565C0] transition-all duration-150 placeholder:text-slate-400 focus:border-[#1565C0]/[0.6] focus:ring-[3px] focus:ring-[#1565C0]/[0.09]";
const inputClass = textareaClass;

const labelClass = "text-[0.72rem] font-bold text-slate-800";
const hintClass = "text-[0.65rem] font-medium leading-5 text-slate-500";

/* ─── small components ─── */


type MediaItem = {
  id: string;
  name: string;
  url: string;
  alt: string;
};

function MediaPicker({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (item: MediaItem) => void;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setErr("");

      const res = await fetch("/api/media", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "دریافت تصاویر انجام نشد.");
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "خطا در دریافت تصاویر.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) load();
  }, [open]);

  const upload = async (file: File) => {
    try {
      setUploading(true);
      setErr("");

      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/media", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "آپلود انجام نشد.");

      onSelect(data);
      onClose();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "خطا در آپلود.");
    } finally {
      setUploading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        dir="rtl"
        className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-[14px] border border-[#1565C0]/[0.15] bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[#1E3A8A]/[0.08] px-5 py-4">
          <h3 className="m-0 text-sm font-extrabold text-[#0F172A]">انتخاب تصویر</h3>

          <div className="flex items-center gap-2">
            <label
              className={`cursor-pointer rounded-lg border border-[#1565C0]/[0.77] bg-[#1565C0] px-4 py-2 text-[12px] font-black text-white hover:bg-[#0D47A1] ${
                uploading ? "pointer-events-none opacity-60" : ""
              }`}
            >
              {uploading ? "در حال آپلود..." : "آپلود تصویر جدید"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) upload(f);
                  e.target.value = "";
                }}
              />
            </label>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#1E3A8A]/[0.14] px-4 py-2 text-[12px] font-bold text-slate-700 hover:bg-[#F3F7FC]"
            >
              بستن
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-5">
          {err && <div className="mb-3 text-xs font-bold text-red-700">{err}</div>}

          {loading ? (
            <div className="text-xs font-bold text-slate-500">در حال دریافت...</div>
          ) : items.length === 0 ? (
            <div className="text-xs font-bold text-slate-500">هنوز تصویری آپلود نشده است.</div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="overflow-hidden rounded-lg border border-[#1E3A8A]/[0.14] bg-[#F3F7FC] text-right transition hover:border-[#1565C0]/[0.6]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt={item.alt || item.name} className="h-24 w-full object-cover" />
                  <div className="truncate px-2 py-1.5 text-[11px] font-medium text-slate-600">
                    {item.name}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cardClass}>
      <div className="h-0.5 bg-gradient-to-r from-[#1565C0]/50 via-[#1565C0]/10 to-transparent" />

      <div className="border-b border-[#1E3A8A]/[0.08] px-5 py-4">
        <h2 className="m-0 text-sm font-extrabold text-[#0F172A]">{title}</h2>
        {description && <p className="mt-1 text-[0.65rem] font-medium text-slate-500">{description}</p>}
      </div>

      <div className="grid gap-4 p-5">{children}</div>
    </section>
  );
}




function CheckRow({
  checked,
  onChange,
  disabled,
  title,
  description,
  danger,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  title: string;
  description?: string;
  danger?: boolean;
}) {
  const activeStyle = danger
    ? "border-red-500/[0.35] bg-red-500/[0.06]"
    : "border-[#1565C0]/[0.3] bg-[#1565C0]/[0.06]";

  return (
    <label
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 transition-colors ${
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:border-[#1565C0]/[0.3]"
      } ${checked ? activeStyle : "border-[#1E3A8A]/[0.14] bg-[#F6F9FD]"}`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className={`mt-0.5 h-4 w-4 shrink-0 ${danger ? "accent-red-600" : "accent-[#1565C0]"}`}
      />

      <span className="min-w-0">
        <span className={`block text-[0.8rem] font-bold ${checked && danger ? "text-red-700" : "text-slate-800"}`}>
          {title}
        </span>
        {description && <span className="mt-0.5 block text-[0.65rem] font-medium leading-5 text-slate-500">{description}</span>}
      </span>
    </label>
  );
}

/* ─── page ─── */

export default function SiteSeoAdminPage() {
  const [saved, setSaved] = useState<SiteSeoSettings>(SITE_SEO_DEFAULTS);
  const [form, setForm] = useState<SiteSeoSettings>(SITE_SEO_DEFAULTS);
  const [extraText, setExtraText] = useState("");
  const [siteUrl, setSiteUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const patch = (partial: Partial<SiteSeoSettings>) => setForm((prev) => ({ ...prev, ...partial }));

  useEffect(() => {
    setSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || window.location.origin);
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/admin/seo/site", { cache: "no-store" });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "دریافت تنظیمات انجام نشد.");
      }

      const settings: SiteSeoSettings = result.settings;
      setSaved(settings);
      setForm(settings);
      setExtraText(settings.extraDisallow.join("\n"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در دریافت تنظیمات.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // وقتی کلید اصلی روشن است، سه گزینه‌ی دیگر اجباراً روشن‌اند
  const master = form.noindexAll;

  const effective: SiteSeoSettings = useMemo(() => {
    const parsed = parseDisallowLines(extraText);
    return {
      ...form,
      extraDisallow: "lines" in parsed ? parsed.lines : [],
    };
  }, [form, extraText]);

  const preview = useMemo(
    () => buildRobotsTxt(effective, siteUrl || "https://example.com"),
    [effective, siteUrl]
  );

  const blockedNow = isSiteBlocked(saved);


  const handleImageUpload = async (file: File) => {
  setMessage("");
  setError("");

  if (!file.type.startsWith("image/")) {
    setError("فقط فایل تصویری مجاز است.");
    return;
  }

  try {
    setUploadingImage(true);

    const fd = new FormData();
    fd.append("file", file);
    if (form.defaultOgImageAlt.trim()) {
      fd.append("alt", form.defaultOgImageAlt.trim());
    }

    const res = await fetch("/api/media", { method: "POST", body: fd });
    const data = await res.json();

    if (!res.ok || !data.id) {
      throw new Error(data.message || "آپلود تصویر انجام نشد.");
    }

    patch({
      defaultOgImage: `/api/media/${data.id}`,
      defaultOgImageAlt: form.defaultOgImageAlt || data.alt || "",
    });
  } catch (err) {
    setError(err instanceof Error ? err.message : "خطا در آپلود تصویر.");
  } finally {
    setUploadingImage(false);
  }
};

  const handleSave = async () => {
    setMessage("");
    setError("");

    const parsed = parseDisallowLines(extraText);
    if ("error" in parsed) return setError(parsed.error);

    const closing =
      (form.noindexAll && !saved.noindexAll) ||
      (form.globalNoindex && !saved.globalNoindex) ||
      (form.robotsDisallowAll && !saved.robotsDisallowAll);

    if (
      closing &&
      !window.confirm("با این تنظیم سایت از نتایج گوگل خارج می‌شود (یا خزیدنش بسته می‌شود). مطمئنی؟")
    ) {
      return;
    }

    try {
      setSaving(true);

      const res = await fetch("/api/admin/seo/site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, extraDisallow: parsed.lines }),
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "ذخیره انجام نشد.");
      }

      const settings: SiteSeoSettings = result.settings;
      setSaved(settings);
      setForm(settings);
      setExtraText(settings.extraDisallow.join("\n"));
      setMessage("تنظیمات سراسری با موفقیت ذخیره شد. (اعمال کامل تا حدود 30 ثانیه طول می‌کشد)");
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ذخیره.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-[#EEF3FA] text-slate-800"
      style={{ fontFamily: "var(--font-vazirmatn), sans-serif" }}
    >
      <meta name="robots" content="noindex, nofollow, noarchive" />

      <main className="mx-auto grid w-full gap-4 px-6 py-6 md:px-7">
        {/* HEADER */}
        <header>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1565C0", boxShadow: "0 0 7px rgba(21,101,192,0.9)", marginBottom: "1px" }} />
                <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(21,101,192,0.77)", letterSpacing: "0.18em" }}>
                  SEO // GLOBAL
                </span>
              </div>
          <h1 className="m-0 text-xl font-black leading-tight text-[#0F172A]">تنظیمات سئو سراسری</h1>
          <p className="mt-1.5 text-xs font-medium text-slate-500">
            ایندکس/فالو برای کل وب‌سایت و robots.txt — یا خاموش کردن ایندکس کل سایت
          </p>
        </header>

        {/* STATUS */}
        {!loading && (
          <div
            className={`rounded-[10px] border px-4 py-3 text-xs font-bold ${
              blockedNow
                ? "border-red-500/[0.255] bg-red-500/[0.075] text-red-700"
                : "border-emerald-500/[0.33] bg-emerald-500/[0.1] text-emerald-700"
            }`}
          >
            {blockedNow
              ? "هشدار: الان سایت (کامل یا بخشی از آن) برای موتورهای جستجو بسته است."
              : "سایت الان برای موتورهای جستجو باز است."}
          </div>
        )}

        {error && (
          <div role="alert" className="rounded-[10px] border border-red-500/[0.255] bg-red-500/[0.075] px-4 py-3 text-xs font-bold text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div role="status" className="rounded-[10px] border border-emerald-500/[0.33] bg-emerald-500/[0.1] px-4 py-3 text-xs font-bold text-emerald-700">
            {message}
          </div>
        )}

        {/* ─── INDEX ─── */}
        <SectionCard
          title="ایندکس کل وب‌سایت"
          description="با یک کلیک کل سایت را از گوگل مخفی کنید، یا robots / noindex / nofollow را جدا تنظیم کنید"
        >
          <CheckRow
            danger
            checked={form.noindexAll}
            onChange={(v) => patch({ noindexAll: v })}
            title="کل وب‌سایت را از ایندکس خارج کن (robots.txt مسدودسازی + noindex + nofollow)"
          />

          <div className="grid gap-3 md:grid-cols-3">
            <CheckRow
              checked={master || form.globalNoindex}
              disabled={master}
              onChange={(v) => patch({ globalNoindex: v })}
              title="noindex سراسری (متا robots)"
            />
            <CheckRow
              checked={master || form.globalNofollow}
              disabled={master}
              onChange={(v) => patch({ globalNofollow: v })}
              title="nofollow سراسری (متا robots)"
            />
            <CheckRow
              checked={master || form.robotsDisallowAll}
              disabled={master}
              onChange={(v) => patch({ robotsDisallowAll: v })}
              title="robots.txt کل سایت را Disallow کند"
            />
          </div>

          <p className={hintClass}>
            noindex روی همه‌ی صفحات (خانه، بلاگ، خدمات، نویسندگان و ...) اعمال می‌شود. اگر صفحه‌ای جدا noindex
            داشته باشد همان هم رعایت می‌شود. نکته: وقتی robots.txt کل سایت را Disallow می‌کند، گوگل دیگر
            noindex صفحه‌ها را نمی‌خواند؛ صفحه‌هایی که از قبل ایندکس شده‌اند ممکن است مدتی فقط به‌صورت آدرس در
            نتایج بمانند.
          </p>
        </SectionCard>

        {/* ─── ROBOTS ─── */}
        <SectionCard
          title="robots.txt"
          description="از همین تنظیمات ساخته می‌شود و روی آدرس /robots.txt در دسترس است"
        >
          <CheckRow
            checked={form.includeSitemap}
            onChange={(v) => patch({ includeSitemap: v })}
            title="آدرس sitemap.xml (ایندکس سایت‌مپ‌ها) در robots.txt درج شود"
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="extra-disallow" className={labelClass}>
              مسیرهای اضافی Disallow (هر خط یک مسیر، با / شروع شود)
            </label>
            <textarea
              id="extra-disallow"
              dir="ltr"
              rows={4}
              value={extraText}
              onChange={(e) => setExtraText(e.target.value)}
              className={`${textareaClass} resize-y text-left font-mono`}
              placeholder={"/draft/\n/private/"}
            />
            <p className={hintClass}>
              قوانین پیش‌فرض فعلی (/*utm_ ، /*profile ، /*? ، /*rsc) همیشه حفظ می‌شوند و این مسیرها به آن‌ها اضافه می‌شوند.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="robots-custom" className={labelClass}>
              متن کامل robots.txt (اختیاری — اگر پر باشد جایگزین نسخه‌ی تولیدشده می‌شود)
            </label>
            <textarea
              id="robots-custom"
              dir="ltr"
              rows={8}
              value={form.robotsCustomText}
              onChange={(e) => patch({ robotsCustomText: e.target.value })}
              className={`${textareaClass} resize-y text-left font-mono`}
              placeholder={"User-agent: *\nDisallow: /private/"}
            />
            <p className={hintClass}>
              خالی بگذارید تا از گزینه‌های بالا ساخته شود. خط Sitemap در صورت فعال بودن اضافه می‌شود؛ خط Host
              همیشه حذف می‌شود. گزینه‌های «بستن کل سایت» همیشه از این متن جلوترند.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className={labelClass}>پیش‌نمایش robots.txt</span>
            <pre
              dir="ltr"
              className="m-0 overflow-x-auto whitespace-pre rounded-lg border border-[#1E3A8A]/[0.08] bg-[#F3F7FC] px-4 py-3 text-left font-mono text-[12px] leading-6 text-slate-700"
            >
              {preview}
            </pre>
          </div>
        </SectionCard>


                {/* ─── BRAND / SOCIAL ─── */}
        <SectionCard
          title="پیش‌فرض‌های شبکه‌های اجتماعی و برند"
          description="این مقادیر برای کل سایت استفاده می‌شوند. خالی بگذارید تا مقدار فعلی بدون تغییر بماند."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="site-name" className={labelClass}>نام سایت (og:site_name)</label>
              <input
                id="site-name"
                value={form.siteName}
                onChange={(e) => patch({ siteName: e.target.value })}
                maxLength={100}
                className={inputClass}
                placeholder="پاراهور"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="site-url" className={labelClass}>آدرس سایت (Canonical / Sitemap)</label>
              <input
                id="site-url"
                dir="ltr"
                value={form.siteUrl}
                onChange={(e) => patch({ siteUrl: e.target.value })}
                className={`${inputClass} text-left font-mono`}
                placeholder="https://parahoor.com"
              />
              <p className={hintClass}>بدون localhost. مثال: https://parahoor.com</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="google-verification" className={labelClass}>Google site verification</label>
            <input
              id="google-verification"
              dir="ltr"
              value={form.googleVerification}
              onChange={(e) => patch({ googleVerification: e.target.value })}
              className={`${inputClass} text-left font-mono`}
              placeholder="مقدار content تگ google-site-verification"
            />
            <p className={hintClass}>فقط مقدار content، نه کل تگ.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="twitter-handle" className={labelClass}>X / Twitter (بدون @)</label>
              <input
                id="twitter-handle"
                dir="ltr"
                value={form.twitterHandle}
                onChange={(e) => patch({ twitterHandle: e.target.value })}
                className={`${inputClass} text-left font-mono`}
                placeholder="parahoor"
              />
              <p className={hintClass}>برای twitter:site در کارت اشتراک‌گذاری</p>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="org-phone" className={labelClass}>تلفن سازمان (Schema)</label>
              <input
                id="org-phone"
                dir="ltr"
                value={form.orgPhone}
                onChange={(e) => patch({ orgPhone: e.target.value })}
                className={`${inputClass} text-left font-mono`}
                placeholder="+982100000000"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="org-email" className={labelClass}>ایمیل سازمان (Schema)</label>
            <input
              id="org-email"
              dir="ltr"
              value={form.orgEmail}
              onChange={(e) => patch({ orgEmail: e.target.value })}
              className={`${inputClass} text-left font-mono`}
              placeholder="info@parahoor.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="og-image" className={labelClass}>
              تصویر پیش‌فرض Open Graph (og:image)
            </label>

            <div className="flex gap-2">
              <input
                id="og-image"
                dir="ltr"
                value={form.defaultOgImage}
                onChange={(e) => patch({ defaultOgImage: e.target.value })}
                className={`${inputClass} text-left font-mono`}
                placeholder="/api/media/... یا /logo.jpg"
              />
<label
  className={`flex shrink-0 cursor-pointer items-center rounded-lg border border-[#1565C0]/[0.4] bg-[#1565C0]/[0.07] px-4 text-[12px] font-black text-[#1565C0] hover:bg-[#1565C0]/[0.14] ${
    uploadingImage ? "pointer-events-none opacity-60" : ""
  }`}
>
  {uploadingImage ? "در حال آپلود..." : "انتخاب تصویر"}
  <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const f = e.target.files?.[0];
      if (f) handleImageUpload(f);
      e.target.value = "";
    }}
  />
</label>
            </div>

            <p className={hintClass}>
              برای صفحاتی که تصویر اختصاصی ندارند. اندازه‌ی مناسب حدود 1200×630 پیکسل.
            </p>

{form.defaultOgImage && (
  <div className="mt-1 self-start overflow-hidden rounded-lg border border-[#1E3A8A]/[0.14] bg-[#F3F7FC]">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={form.defaultOgImage}
      alt={form.defaultOgImageAlt || "پیش‌نمایش"}
      className="block h-32 w-auto max-w-full"
    />
  </div>
)}
          </div>

          <MediaPicker
            open={pickerOpen}
            onClose={() => setPickerOpen(false)}
            onSelect={(item) =>
              patch({
                defaultOgImage: `/api/media/${item.id}`,
                defaultOgImageAlt: form.defaultOgImageAlt || item.alt || "",
              })
            }
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="og-image-alt" className={labelClass}>متن جایگزین تصویر (Alt)</label>
            <input
              id="og-image-alt"
              value={form.defaultOgImageAlt}
              onChange={(e) => patch({ defaultOgImageAlt: e.target.value })}
              maxLength={200}
              className={inputClass}
              placeholder="لوگوی پاراهور"
            />
          </div>
        </SectionCard>

        {/* SAVE BAR */}
        <div className="flex flex-col gap-3 rounded-[14px] border border-[#1565C0]/[0.15] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[11px] font-bold text-slate-600">
            {loading ? "در حال دریافت اطلاعات..." : "تغییرات بعد از ذخیره روی کل سایت اعمال می‌شوند."}
          </div>

          <button
            type="button"
            disabled={saving || loading}
            onClick={handleSave}
            className={`flex items-center justify-center rounded-lg border px-5 py-2.5 text-[12px] font-black transition-all ${
              saving || loading
                ? "cursor-not-allowed border-[#1E3A8A]/[0.14] bg-[#1E3A8A]/[0.054] text-slate-500"
                : "cursor-pointer border-[#1565C0]/[0.77] bg-[#1565C0] text-white shadow-[0_8px_24px_rgba(21,101,192,0.3)] hover:bg-[#0D47A1]"
            }`}
          >
            {saving ? "در حال ذخیره..." : "ذخیره تنظیمات سئو "}
          </button>
        </div>






<section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
  <div className="border-b border-slate-100 px-5 py-4">
    <h2 className="font-bold text-slate-900">چک‌لیست سئو فعال در پروژه</h2>
  </div>

  <div className="p-5 pr-10">
    <ul className="list-disc space-y-2 pe-5 text-[12px] leading-7 text-slate-600">
      <li>Title / Description / Canonical / Robots برای صفحات، بلاگ و خدمات</li>
      <li>noindex / nofollow سراسری از همین صفحه روی کل سایت اعمال می‌شود</li>
      <li>Open Graph + Twitter Card در همه صفحات کلیدی</li>
      <li>مدیریت ریدایرکت 301/302</li>
      <li>Sitemap ایندکس: /sitemap.xml → دسته‌بندی‌ها، وبلاگ، نویسنده‌ها، صفحات</li>
      <li>robots.txt از همین پنل (تولیدشده یا متن کامل)</li>
      <li>JSON-LD (Organization / Article / Person / FAQ)</li>
      <li>URL حروف بزرگ → 404 و حذف trailing slash</li>
      <li>Security headers پایه</li>
    </ul>
  </div>
</section>




      </main>
    </div>
  );
}
