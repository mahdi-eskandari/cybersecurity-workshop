"use client";

import { useEffect, useMemo, useState } from "react";
import { isValidHighlightTitle } from "@/lib/highlightTitle";

type SeoPage = {
  _id?: string;
  pageKey: string;
  pageName: string;
  h1Title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  index: boolean;
  follow: boolean;
  canonical?: string;
    ogImage?: string;
  ogImageAlt?: string;
};

const PAGE_OPTIONS = [
  {
    value: "home",
    label: "صفحه اصلی",
  },
  {
    value: "services",
    label: "خدمات",
  },
  {
    value: "blogs",
    label: "وبلاگ",
  },
  {
    value: "about",
    label: "درباره ما",
  },
  {
    value: "contact",
    label: "تماس با ما",
  },
  {
    value: "privacy",
    label: "حریم خصوصی",
  },
  {
    value: "authors",
    label: "پژوهشگران و کارشناسان",
  },
  {
    value: "author-mohammadreza-yousefi",
    label: "محمدرضا یوسفی",
  },
  {
    value: "author-sara-mohammadzadeh",
    label: "سارا محمدزاده",
  },
];

const DEFAULT_PAGES: Record<string, SeoPage> = {
  home: {
    pageKey: "home",
    pageName: "صفحه اصلی",
    h1Title:
      "هیچ مجرمی در دنیای دیجیتال بی‌ردپا نیست.",
    slug: "",
    metaTitle:
      "پاراهور | تحقیقات سایبری و فارنزیک دیجیتال",
    metaDescription:
      "پاراهور ارائه‌دهنده خدمات تخصصی تحقیقات سایبری، فارنزیک دیجیتال و مشاوره‌های فنی و امنیتی.",
    index: true,
    follow: true,
  },

  services: {
    pageKey: "services",
    pageName: "خدمات",
    h1Title: "خدمات اجرایی و مشاوره‌های تخصصی پاراهور",
    slug: "services",
    metaTitle:
      "خدمات تخصصی تحقیقات سایبری | پاراهور",
    metaDescription:
      "ارائه خدمات تخصصی تحقیقات سایبری، فارنزیک دیجیتال و مشاوره فنی توسط پاراهور.",
    index: true,
    follow: true,
  },

  blogs: {
    pageKey: "blogs",
    pageName: "وبلاگ",
    h1Title:  "رادار پاراهور",
    slug: "blogs",
    metaTitle:
      "وبلاگ پاراهور | تحقیقات سایبری و امنیت",
    metaDescription:
      "مقالات و مطالب تخصصی درباره امنیت سایبری، فارنزیک دیجیتال و تحقیقات سایبری.",
    index: true,
    follow: true,
  },

  about: {
    pageKey: "about",
    pageName: "درباره ما",
    h1Title: "ما تاریکی‌های دنیای دیجیتال را روشن می‌کنیم.",
    slug: "about",
    metaTitle:
      "درباره پاراهور | تحقیقات و فارنزیک سایبری",
    metaDescription:
      "آشنایی با پاراهور و فعالیت‌های تخصصی این مجموعه در حوزه تحقیقات سایبری و فارنزیک دیجیتال.",
    index: true,
    follow: true,
  },

  contact: {
    pageKey: "contact",
    pageName: "تماس با ما",
    h1Title: "ارتباط امن با پاراهور",
    slug: "contact",
    metaTitle: "تماس با پاراهور",
    metaDescription:
      "برای دریافت مشاوره و اطلاعات بیشتر با تیم پاراهور در ارتباط باشید.",
    index: true,
    follow: true,
  },

  authors: {
    pageKey: "authors",
    pageName: "پژوهشگران و کارشناسان",
    h1Title: "پژوهشگران و کارشناسان",
    slug: "authors",
    metaTitle: "پژوهشگران و کارشناسان | پاراهور",
    metaDescription: "معرفی پژوهشگران و کارشناسان تخصصی پاراهور.",
    index: true,
    follow: true,
  },

  "author-mohammadreza-yousefi": {
    pageKey: "author-mohammadreza-yousefi",
    pageName: "محمدرضا یوسفی",
    h1Title: "محمدرضا یوسفی",
    slug: "mohammadreza-yousefi",
    metaTitle: "محمدرضا یوسفی | پاراهور",
    metaDescription: "معرفی محمدرضا یوسفی، پژوهشگر ارشد جرائم رایانه‌ای در پاراهور.",
    index: true,
    follow: true,
  },

  "author-sara-mohammadzadeh": {
    pageKey: "author-sara-mohammadzadeh",
    pageName: "سارا محمدزاده",
    h1Title: "سارا محمدزاده",
    slug: "sara-mohammadzadeh",
    metaTitle: "سارا محمدزاده | پاراهور",
    metaDescription: "معرفی سارا  محمدزاده، وکیل پایه یک دادگستری در پاراهور.",
    index: true,
    follow: true,
  },

  privacy: {
    pageKey: "privacy",
    pageName: "حریم خصوصی",
    h1Title: "سیاست حفظ حریم خصوصی و رازداری مطلق",
    slug: "privacy",
    metaTitle: "حریم خصوصی | پاراهور",
    metaDescription:
      "سیاست حفظ حریم خصوصی و نحوه جمع‌آوری، استفاده و حفاظت از اطلاعات کاربران در وب‌سایت پاراهور.",
    index: true,
    follow: true,
  },
};

const inputClass =
  "box-border w-full rounded-lg border border-[#1E3A8A]/[0.14] bg-[#F3F7FC] px-[10px] py-[9px] text-[0.8rem] text-slate-800 outline-none caret-[#1565C0] transition-all duration-150 focus:border-[#1565C0]/[0.6] focus:ring-[3px] focus:ring-[#1565C0]/[0.09]";

const SITE_HOST =
  (process.env.NEXT_PUBLIC_SITE_URL || "")
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "") || "yoursite.com";

// Canonical: خالی (خودکار) | مسیر داخلی مثل /services | آدرس کامل http(s)
function getCanonicalError(value: string): string {
  const v = value.trim();
  if (!v) return "";
  if (/\s/.test(v)) return "Canonical نباید فاصله داشته باشد.";
  if (v.length > 500) return "Canonical نباید بیشتر از 500 کاراکتر باشد.";
  if (v.startsWith("//")) return "Canonical معتبر نیست.";
  if (v.startsWith("/")) return "";
  try {
    const url = new URL(v);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "Canonical باید با /، http:// یا https:// شروع شود.";
    }
    return "";
  } catch {
    return "Canonical باید مسیر داخلی (مثل /services) یا آدرس کامل باشد.";
  }
}

function IconGlobe() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 010 20" />
      <path d="M12 2a15.3 15.3 0 000 20" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function IconSave() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

function CustomSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
    const [ogImage, setOgImage] = useState("");
  const [ogImageAlt, setOgImageAlt] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const selectedOption =
    options.find(
      (option) => option.value === value
    ) ?? options[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className={`flex h-10 w-full items-center justify-between rounded-[8px] border bg-[#F6F9FD] px-3 text-right text-[11px] font-bold outline-none transition-all ${
          open
            ? "border-[#1565C0]/[0.555] shadow-[0_0_16px_rgba(21,101,192,0.08)]"
            : "border-[#1E3A8A]/[0.14] hover:border-[#1565C0]/[0.255]"
        }`}
      >
        <span className="truncate text-slate-700">
          {selectedOption?.label ||
            "انتخاب صفحه"}
        </span>

        <span
          className={`mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-[#1E3A8A]/[0.1] bg-[#1E3A8A]/[0.04] text-slate-500 transition-all ${
            open
              ? "rotate-180 border-[#1565C0]/[0.255] bg-[#1565C0]/[0.075] text-[#1565C0]"
              : ""
          }`}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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

          <div className="absolute right-0 top-[calc(100%+6px)] z-50 max-h-[280px] w-full overflow-y-auto rounded-[9px] border border-[#1E3A8A]/[0.16] bg-[#F6F9FD] p-[6px] shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
            {options.map((option) => {
              const selected =
                option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-[7px] px-3 py-2.5 text-right text-[11px] font-bold transition-all ${
                    selected
                      ? "bg-[#1565C0]/[0.114] text-[#1565C0]"
                      : "text-slate-700 hover:bg-[#1E3A8A]/[0.075] hover:text-[#0F172A]"
                  }`}
                >
                  <span className="truncate">
                    {option.label}
                  </span>

                  {selected && (
                    <span className="mr-2 shrink-0 text-[#1565C0]">
                      <IconCheck />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function SideCard({
  title,
  icon,
  children,
  accentColor = "#1565C0",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  accentColor?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-[#1565C0]/[0.15] bg-[#FFFFFF]">
      <div
        className="h-0.5"
        style={{
          background: `linear-gradient(90deg,${accentColor}88,${accentColor}22,transparent)`,
        }}
      />

      <div className="flex items-center gap-[7px] border-b border-[#1E3A8A]/[0.08] px-4 py-[13px]">
        <span
          className="flex opacity-70"
          style={{ color: accentColor }}
        >
          {icon}
        </span>

        <span className="text-[0.82rem] font-bold text-[#0F172A]">
          {title}
        </span>
      </div>

      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[5px]">
      <label className="font-mono text-[0.68rem] font-semibold tracking-widest text-slate-600">
        {label}
      </label>

      {children}

      {hint && (
        <span className="text-[0.62rem] font-medium leading-5 text-slate-500">
          {hint}
        </span>
      )}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex w-full items-center justify-between rounded-lg border px-3 py-3 text-right transition-all ${
        checked
          ? "border-[#1565C0]/[0.255] bg-[#1565C0]/[0.075]"
          : "border-[#1E3A8A]/[0.14] bg-[#F3F7FC]"
      }`}
    >
      <div>
        <div
          className={`text-xs font-bold ${
            checked
              ? "text-[#1565C0]"
              : "text-slate-700"
          }`}
        >
          {title}
        </div>

        <div className="mt-1 text-[10px] leading-5 text-slate-500">
          {description}
        </div>
      </div>

      <span
        className={`relative h-5 w-9 shrink-0 rounded-full border transition-all ${
          checked
            ? "border-[#1565C0]/[0.4] bg-[#1565C0]/[0.2]"
            : "border-[#1E3A8A]/[0.16] bg-[#1E3A8A]/[0.054]"
        }`}
      >
        <span
          className={`absolute top-[3px] h-3 w-3 rounded-full transition-all ${
            checked
              ? "right-[3px] bg-[#1565C0] shadow-[0_0_8px_rgba(21,101,192,0.545)]"
              : "right-[18px] bg-slate-400"
          }`}
        />
      </span>
    </button>
  );
}

export default function SeoAdminPage() {
  const [pages, setPages] =
    useState<SeoPage[]>([]);

  const [pageKey, setPageKey] =
    useState("home");

  const [h1Title, setH1Title] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [metaTitle, setMetaTitle] =
    useState("");

  const [metaDescription, setMetaDescription] =
    useState("");

  const [index, setIndex] =
    useState(true);

  const [follow, setFollow] =
    useState(true);

  const [canonical, setCanonical] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");
    

  const selectedPage = useMemo(
    () =>
      pages.find(
        (page) =>
          page.pageKey === pageKey
      ),
    [pages, pageKey]
  );

  // ---------------------------------------------------------
  // LOAD PAGES
  // ---------------------------------------------------------

  const loadPages = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/seo",
        {
          cache: "no-store",
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "دریافت اطلاعات SEO انجام نشد."
        );
      }

      setPages(result.pages || []);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "خطا در دریافت اطلاعات SEO."
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // INITIAL LOAD
  // ---------------------------------------------------------

  useEffect(() => {
    loadPages();
  }, []);

  // ---------------------------------------------------------
  // LOAD SELECTED PAGE INTO FORM
  // ---------------------------------------------------------

  useEffect(() => {
    const page =
      selectedPage ||
      DEFAULT_PAGES[pageKey];

    if (!page) return;

    setH1Title(
      page.h1Title || ""
    );

    setSlug(
      page.slug || ""
    );

    setMetaTitle(
      page.metaTitle || ""
    );

    setMetaDescription(
      page.metaDescription || ""
    );

    setIndex(
      page.index ?? true
    );

    setFollow(
      page.follow ?? true
    );

    setCanonical(
      page.canonical || ""
    );

        setOgImage(page.ogImage || "");
    setOgImageAlt(page.ogImageAlt || "");

    setMessage("");
    setError("");
  }, [
    pageKey,
    selectedPage,
  ]);

  // ---------------------------------------------------------
  // PAGE CHANGE
  // ---------------------------------------------------------

  const handlePageChange = (
    newPageKey: string
  ) => {
    setPageKey(newPageKey);
  };

  // ---------------------------------------------------------
  // SLUG NORMALIZER
  // ---------------------------------------------------------

  const normalizeSlug = (
    value: string
  ) => {
    return value
      .toLowerCase()
      .replace(/^\/+/, "")
      .replace(/\/+$/, "")
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-");
  };



    const handleOgUpload = async (file: File) => {
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
      if (ogImageAlt.trim()) fd.append("alt", ogImageAlt.trim());

      const res = await fetch("/api/media", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.id) throw new Error(data.message || "آپلود تصویر انجام نشد.");

      setOgImage(`/api/media/${data.id}`);
      if (!ogImageAlt.trim() && data.alt) setOgImageAlt(data.alt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در آپلود تصویر.");
    } finally {
      setUploadingImage(false);
    }
  };

  // ---------------------------------------------------------
  // SAVE
  // ---------------------------------------------------------

  const handleSave = async () => {
    setMessage("");
    setError("");

    // Home must have root route
    if (
      pageKey === "home" &&
      slug.trim() !== ""
    ) {
      setError(
        "Route صفحه اصلی باید / باشد."
      );
      return;
    }

    // Other pages require slug
    if (
      pageKey !== "home" &&
      !slug.trim()
    ) {
      setError(
        "Route / Slug را وارد کنید."
      );
      return;
    }

    if (!h1Title.trim()) {
      setError(
        "عنوان H1 را وارد کنید."
      );
      return;
    }

        if (!isValidHighlightTitle(h1Title)) {
      setError(
        "آکولادهای عنوان H1 درست بسته نشده‌اند. مثال: هیچ {مجرمی} در دنیای دیجیتال بی‌ردپا نیست."
      );
      return;
    }

    if (!metaTitle.trim()) {
      setError(
        "Meta Title را وارد کنید."
      );
      return;
    }

    if (!metaDescription.trim()) {
      setError(
        "Meta Description را وارد کنید."
      );
      return;
    }

    if (metaTitle.trim().length > 70) {
      setError(
        "Meta Title نباید بیشتر از 70 کاراکتر باشد."
      );
      return;
    }

    if (
      metaDescription.trim().length >
      170
    ) {
      setError(
        "Meta Description نباید بیشتر از 170 کاراکتر باشد."
      );
      return;
    }

    const canonicalError =
      getCanonicalError(canonical);

    if (canonicalError) {
      setError(canonicalError);
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "/api/admin/seo",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            pageKey,
            h1Title:
              h1Title.trim(),

            slug:
              pageKey === "home"
                ? ""
                : normalizeSlug(slug),

            metaTitle:
              metaTitle.trim(),

            metaDescription:
              metaDescription.trim(),

            index,
            follow,

            canonical: canonical.trim(),
            ogImage: ogImage.trim(),
            ogImageAlt: ogImageAlt.trim(),
          }),
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "ذخیره تنظیمات انجام نشد."
        );
      }

      setMessage(
        "تنظیمات SEO با موفقیت ذخیره شد."
      );

      await loadPages();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "خطا در ذخیره تنظیمات."
      );
    } finally {
      setSaving(false);
    }
  };

  const currentPageLabel =
    PAGE_OPTIONS.find(
      (page) =>
        page.value === pageKey
    )?.label || "";

  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------

return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-[#EEF3FA] text-slate-800 "
    >
<div className="mx-auto grid w-full gap-4 px-6 py-6 md:px-7">
        {/* HEADER */}



        <div className="mb-7">
               <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: 7,
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius:
                    "50%",
                  background:
                    "#1565C0",
                  boxShadow:
                    "0 0 7px rgba(21,101,192,0.9)",
                    
                }}
              />

              <span
                style={{
                  fontFamily:
                    "monospace",
                  fontSize:
                    "0.6rem",
                  color:
                    "rgba(21,101,192,0.77)",
                  letterSpacing:
                    "0.18em",
                }}
              >
                SEO // PAGE SETTINGS
              </span>
            </div>
              <h1 className="text-xl font-black text-[#0F172A]"> تنظیمات SEO صفحات</h1>
              <p className="mt-1 text-xs font-medium text-slate-500">
                 عنوان، H1، توضیحات، Route و
            تنظیمات موتورهای جستجوی صفحات
            اصلی سایت</p>
            </div>

        {/* ERROR */}

        {error && (
          <div className="mb-5 rounded-[10px] border border-red-500/[0.255] bg-red-500/[0.075] px-4 py-3 text-xs font-bold text-red-700">
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {message && (
          <div className="mb-5 rounded-[10px] border border-emerald-500/[0.33] bg-emerald-500/[0.101] px-4 py-3 text-xs font-bold text-emerald-700">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">

          {/* MAIN CARD */}

          <div className="overflow-hidden rounded-[14px] border border-[#1565C0]/[0.15] bg-[#FFFFFF]">

            <div className="h-0.5 bg-gradient-to-r from-[#1565C0]/50 via-[#1565C0]/10 to-transparent" />

            <div className="flex items-center gap-2 border-b border-[#1E3A8A]/[0.08] px-5 py-4">
              <span className="text-[#1565C0]">
                <IconGlobe />
              </span>

              <span className="text-[0.82rem] font-bold text-[#0F172A]">
                اطلاعات صفحه
              </span>
            </div>

            <div className="grid gap-5 p-5">

              {/* PAGE SELECT */}

              <Field
                label="PAGE"
                hint="صفحه‌ای که می‌خواهید تنظیمات SEO آن را ویرایش کنید."
              >
                <CustomSelect
                  value={pageKey}
                  onChange={
                    handlePageChange
                  }
                  options={
                    PAGE_OPTIONS
                  }
                />
              </Field>

              {/* H1 */}

              <Field
                label="H1 TITLE"
                hint="این عنوان به عنوان H1 اصلی داخل خود صفحه نمایش داده می‌شود و مستقل از Meta Title است. کلمه‌ای که بین { } بنویسی (مثلاً: هیچ {مجرمی} بی‌ردپا نیست) با استایل مخصوص نمایش داده می‌شود."
              >
                <input
                  value={h1Title}
                  onChange={(e) =>
                    setH1Title(
                      e.target.value
                    )
                  }
                  className={
                    inputClass
                  }
                  placeholder="عنوان H1 صفحه"
                />
              </Field>

              {/* SLUG */}

              <Field
                label="ROUTE / SLUG"
                hint={
                  pageKey === "home"
                    ? "صفحه اصلی سایت از Route ریشه / استفاده می‌کند و نیازی به Slug ندارد."
                    : "فقط حروف انگلیسی، عدد و خط تیره. در صورت تغییر، Route قبلی با 301 به Route جدید منتقل می‌شود."
                }
              >
                <div className="flex items-center overflow-hidden rounded-lg border border-[#1E3A8A]/[0.14] bg-[#F3F7FC] transition-all focus-within:border-[#1565C0]/[0.6] focus-within:ring-[3px] focus-within:ring-[#1565C0]/[0.09]">

                  <span className="px-3 font-mono text-xs text-slate-500">
                    /
                  </span>

                  <input
                    dir="ltr"
                    value={slug}
                    disabled={
                      pageKey ===
                      "home"
                    }
                    onChange={(e) =>
                      setSlug(
                        e.target.value
                      )
                    }
                    onBlur={() =>
                      setSlug(
                        normalizeSlug(
                          slug
                        )
                      )
                    }
                    className={`w-full bg-transparent px-1 py-[9px] text-left font-mono text-[0.8rem] outline-none ${
                      pageKey ===
                      "home"
                        ? "cursor-not-allowed text-slate-400"
                        : "text-slate-800"
                    }`}
                    placeholder={
                      pageKey ===
                      "home"
                        ? "(root)"
                        : "services"
                    }
                  />
                </div>
              </Field>

              {/* CANONICAL */}

              <Field
                label="CANONICAL"
                hint={
                  canonical.trim()
                    ? "این آدرس به‌جای آدرس خود صفحه به‌عنوان canonical ثبت می‌شود."
                    : `اختیاری. اگر خالی بماند، آدرس خود صفحه (${SITE_HOST}/${
                        pageKey === "home" ? "" : slug || "..."
                      }) خودکار canonical می‌شود. فقط وقتی پر کن که این صفحه نسخه‌ی تکراریِ صفحه‌ی دیگری است.`
                }
              >
                <input
                  dir="ltr"
                  value={canonical}
                  onChange={(e) =>
                    setCanonical(
                      e.target.value
                    )
                  }
                  maxLength={500}
                  className={`${inputClass} text-left font-mono`}
                  placeholder="https://... یا /path (خالی = خودکار)"
                />
              </Field>

              {/* META TITLE */}

              <Field
                label="META TITLE"
                hint="عنوانی که برای موتورهای جستجو و عنوان تب مرورگر استفاده می‌شود."
              >
                <input
                  value={metaTitle}
                  onChange={(e) =>
                    setMetaTitle(
                      e.target.value
                    )
                  }
                  maxLength={70}
                  className={
                    inputClass
                  }
                  placeholder="عنوان صفحه برای موتورهای جستجو"
                />

                <div className="flex justify-end">
                  <span
                    className={`font-mono text-[10px] ${
                      metaTitle.length >
                      60
                        ? "text-amber-700"
                        : "text-slate-400"
                    }`}
                  >
                    {metaTitle.length}
                    /70
                  </span>
                </div>
              </Field>

              {/* META DESCRIPTION */}

              <Field
                label="META DESCRIPTION"
                hint="توضیح کوتاه و دقیق درباره محتوای صفحه."
              >
                <textarea
                  value={
                    metaDescription
                  }
                  onChange={(e) =>
                    setMetaDescription(
                      e.target.value
                    )
                  }
                  maxLength={170}
                  rows={4}
                  className={`${inputClass} min-h-[105px] resize-y leading-6`}
                  placeholder="توضیح این صفحه برای موتورهای جستجو..."
                />

                <div className="flex justify-end">
                  <span
                    className={`font-mono text-[10px] ${
                      metaDescription.length >
                      155
                        ? "text-amber-700"
                        : "text-slate-400"
                    }`}
                  >
                    {
                      metaDescription.length
                    }
                    /170
                  </span>
                </div>
              </Field>


                            {/* OG IMAGE */}
              <Field
                label="OG IMAGE"
                hint="تصویر پیش‌نمایش در تلگرام، توییتر و ...؛ اندازه مناسب حدود 1200×630. اگر خالی بماند، عکس پیش‌فرض سایت (از «سئو سراسری») استفاده می‌شود."
              >
                <div className="flex gap-2">
                  <input
                    dir="ltr"
                    value={ogImage}
                    maxLength={500}
                    onChange={(e) => setOgImage(e.target.value)}
                    className={`${inputClass} text-left font-mono`}
                    placeholder="/api/media/... یا https://..."
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
                        if (f) void handleOgUpload(f);
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>

                {ogImage && (
                  <div className="mt-1 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ogImage}
                      alt={ogImageAlt || "پیش‌نمایش"}
                      className="h-24 w-auto max-w-full rounded-lg border border-[#1E3A8A]/[0.14] bg-[#F3F7FC]"
                    />
                    <button
                      type="button"
                      onClick={() => setOgImage("")}
                      className="cursor-pointer border-0 bg-transparent text-[0.68rem] font-bold text-red-600"
                    >
                      حذف تصویر
                    </button>
                  </div>
                )}
              </Field>

              <Field label="OG IMAGE ALT" hint="متن جایگزین تصویر. اگر خالی بماند، نام صفحه استفاده می‌شود.">
                <input
                  value={ogImageAlt}
                  maxLength={200}
                  onChange={(e) => setOgImageAlt(e.target.value)}
                  className={inputClass}
                  placeholder="توضیح کوتاه تصویر"
                />
              </Field>
            </div>
          </div>

          {/* SIDEBAR */}

          <div className="space-y-4">

            {/* ROBOTS */}

            <SideCard
              title="Robots"
              icon={<IconGlobe />}
            >
              <div className="space-y-3">

                <Toggle
                  checked={index}
                  onChange={setIndex}
                  title="Index"
                  description="اجازه نمایش صفحه در نتایج جستجو"
                />

                <Toggle
                  checked={follow}
                  onChange={setFollow}
                  title="Follow"
                  description="اجازه دنبال کردن لینک‌های صفحه"
                />

              </div>
            </SideCard>

            {/* SEARCH PREVIEW */}

            <SideCard
              title="Search Preview"
              icon={<IconEye />}
              accentColor="#1565C0"
            >
              <div className="rounded-lg border border-[#1E3A8A]/[0.08] bg-[#F3F7FC] p-3">

                <div className="truncate text-sm font-bold text-[#1565C0]">
                  {metaTitle ||
                    "عنوان صفحه"}
                </div>

                <div
                  dir="ltr"
                  className="mt-1 truncate text-[10px] text-emerald-600"
                >
                  {pageKey ===
                  "home"
                    ? `${SITE_HOST}/`
                    : `${SITE_HOST}/${
                        slug ||
                        "page"
                      }`}
                </div>

                <div className="mt-2 line-clamp-3 text-[11px] leading-5 text-slate-600">
                  {metaDescription ||
                    "توضیحات صفحه در این قسمت نمایش داده می‌شود."}
                </div>

              </div>
            </SideCard>

            {/* ROBOTS PREVIEW */}

            <SideCard
              title="Robots Preview"
              icon={<IconEye />}
              accentColor="#7C3AED"
            >
              <div className="rounded-lg border border-[#1E3A8A]/[0.08] bg-[#F3F7FC] px-3 py-3">

                <div className="font-mono text-[10px] text-slate-500">
                  robots
                </div>

                <div className="mt-2 font-mono text-xs text-[#1565C0]">
                  {index
                    ? "index"
                    : "noindex"}
                  ,{" "}
                  {follow
                    ? "follow"
                    : "nofollow"}
                </div>

              </div>
            </SideCard>

          </div>
        </div>

        {/* SAVE BAR */}

        <div className="mt-5 flex flex-col gap-3 rounded-[14px] border border-[#1565C0]/[0.15] bg-[#FFFFFF] p-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="text-[11px] font-bold text-slate-700">
              {loading
                ? "در حال دریافت اطلاعات..."
                : `در حال ویرایش: ${currentPageLabel}`}
            </div>

            <div className="mt-1 text-[10px] text-slate-400">
              تغییرات بعد از ذخیره در صفحات سایت اعمال می‌شوند.
            </div>

          </div>

<button
            type="button"
            disabled={
              saving ||
              loading
            }
            onClick={
              handleSave
            }
            className={`flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-[12px] font-black transition-all ${
              saving ||
              loading
                ? "cursor-not-allowed border-[#1E3A8A]/[0.14] bg-[#1E3A8A]/[0.054] text-slate-500"
                : "cursor-pointer border-[#1565C0]/[0.77] bg-[#1565C0] text-[#FFFFFF] shadow-[0_8px_24px_rgba(21,101,192,0.3)] hover:bg-[#0D47A1]"
            }`}
          >
            {saving ? (
              // اسپینر لودینگ چرخان هنگام ذخیره
              <svg
                className="h-4 w-4 animate-spin text-[#FFFFFF]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeOpacity="0.25"
                  fill="none"
                />
                <path
                  d="M12 2a10 10 0 0110 10"
                  stroke="currentColor"
                  fill="none"
                />
              </svg>
            ) : (
              <IconSave />
            )}

            {saving
              ? "در حال ذخیره..."
              : "ذخیره تنظیمات"}
                    </button>

        </div>

        

      </div>
    </div>
  );
}