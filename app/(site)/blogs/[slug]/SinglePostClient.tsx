"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  author: string;
  categoryId: string;
  tags: string[];
  status: "draft" | "published";
  postType: "normal" | "special";
  featuredImage: string | null;
  featuredImageAlt: string | null;
  content: string;
  wordCount: number;
  readingTime: number;
  metaTitle: string;
  metaDescription: string;
  createdAt?: string;
  updatedAt?: string;
};

type MediaItem = { id: string; name: string; alt: string; url: string };

type Props = {
  post: BlogPost;
  allPosts: BlogPost[];
  mediaItems: MediaItem[];
};

const BLOG_CATEGORIES = [
  { id: "forensic-reports", label: "گزارش‌های جرم‌شناسی" },
  { id: "legal-news", label: "اخبار حقوقی" },
  { id: "solved-cases", label: "پرونده‌های حل‌شده" },
  { id: "security-alerts", label: "هشدارهای امنیتی" },
  { id: "security-education", label: "آموزش امنیت و تهدیدات سایبری" },
];

const getCategoryLabel = (id?: string | null) =>
  BLOG_CATEGORIES.find((item) => item.id === id)?.label || "گزارش جرم‌شناسی";

const getMediaUrl = (
  value: string | null | undefined,
  mediaItems: MediaItem[]
) => {
  if (!value) return "";
  if (/^(https?:|data:|blob:|\/)/i.test(value)) return value;
  return mediaItems.find((item) => item.id === value)?.url || value;
};

const formatPersianDate = (value?: string) => {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(value));
  } catch {
    return "";
  }
};

const getInitials = (name?: string | null) =>
  name
    ?.trim()
    .split(/\s+/)
    .map((item) => item[0] || "")
    .join("")
    .slice(0, 2)
    .toUpperCase() || "پ";

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "calendar") return <svg {...common}><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 9h18"/></svg>;
  if (name === "clock") return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
  if (name === "user") return <svg {...common}><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5"/></svg>;
  if (name === "shield") return <svg {...common}><path d="M12 3l7 3v5c0 4.6-2.8 8.2-7 10-4.2-1.8-7-5.4-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>;
  if (name === "arrow") return <svg {...common}><path d="M19 12H5M11 18l-6-6 6-6"/></svg>;
  if (name === "copy") return <svg {...common}><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M15 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2h3"/></svg>;
  if (name === "send") return <svg {...common}><path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4 18-7z"/></svg>;
  if (name === "share") return <svg {...common}><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/></svg>;
  if (name === "x") return <svg {...common}><path d="M5 5l14 14M19 5L5 19"/></svg>;
  if (name === "close") return <svg {...common}><path d="M6 6l12 12M18 6L6 18"/></svg>;
  if (name === "alert") return <svg {...common}><path d="M12 3l9 17H3L12 3z"/><path d="M12 9v5M12 17h.01"/></svg>;
  return null;
}

function EmergencyModal({ onClose }: { onClose: () => void }) {
  const [incidentType, setIncidentType] = useState("سرقت کریپتو");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [sending, setSending] = useState(false);
  const [sentCode, setSentCode] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    if (!contact.trim()) {
      setError("شماره تماس یا آیدی تلگرام الزامی است.");
      return;
    }
    if (description.length > 2000) {
      setError("شرح مشکل نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد.");
      return;
    }

    try {
      setSending(true);
      const response = await fetch("/api/crisis-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incidentType, description, contact }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.message || "ثبت گزارش انجام نشد.");
      setSentCode(result?.trackingCode || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "ثبت گزارش انجام نشد.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#08152d] shadow-[0_30px_100px_rgba(0,0,0,.6)]" onMouseDown={(e) => e.stopPropagation()} dir="rtl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-red-500/10 text-red-400"><Icon name="alert" size={22} /></span>
            <div><h3 className="text-lg font-extrabold text-white">گزارش فوری حادثه</h3><p className="mt-1 text-xs text-slate-400">اطلاعات شما محرمانه بررسی می‌شود.</p></div>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"><Icon name="close" /></button>
        </div>

        {sentCode ? (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-400"><Icon name="shield" size={30} /></div>
            <h4 className="text-xl font-extrabold text-white">گزارش با موفقیت ثبت شد</h4>
            <p className="mt-3 text-sm leading-7 text-slate-400">کد پیگیری خود را برای پیگیری‌های بعدی نگه دارید.</p>
            <div className="mx-auto mt-5 max-w-xs rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-4 font-mono text-lg font-bold tracking-widest text-cyan-300">{sentCode}</div>
            <button onClick={onClose} className="mt-6 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-extrabold text-[#04101f] transition hover:bg-cyan-300">بستن</button>
          </div>
        ) : (
          <div className="space-y-5 px-6 py-6">
            <div><label className="mb-2 block text-sm font-semibold text-slate-300">نوع حادثه</label><select value={incidentType} onChange={(e) => setIncidentType(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0c1d39] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50"><option>سرقت کریپتو</option><option>هک و نفوذ</option><option>مزاحمت و اخاذی</option></select></div>
            <div><label className="mb-2 block text-sm font-semibold text-slate-300">شرح مشکل</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} maxLength={2000} placeholder="شرح کوتاهی از حادثه..." className="w-full resize-y rounded-xl border border-white/10 bg-[#0c1d39] px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50" /></div>
            <div><label className="mb-2 block text-sm font-semibold text-slate-300">شماره تماس یا آیدی تلگرام</label><input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="مثلاً 09... یا @username" className="w-full rounded-xl border border-white/10 bg-[#0c1d39] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50" /></div>
            {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300">{error}</div>}
            <button disabled={sending} onClick={submit} className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60">{sending ? "در حال ثبت..." : "درخواست بررسی و رسیدگی پرونده"}<Icon name="alert" size={17} /></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SinglePostClient({ post, allPosts, mediaItems }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const category = getCategoryLabel(post.categoryId);
  const imageUrl = getMediaUrl(post.featuredImage, mediaItems);
  const imageAlt = post.featuredImageAlt?.trim() || post.title;
  const date = formatPersianDate(post.createdAt || post.updatedAt);

  const relatedPosts = useMemo(() => {
    const sameCategory = allPosts.filter(
      (item) => item._id !== post._id && item.categoryId === post.categoryId
    );
    const others = allPosts.filter(
      (item) => item._id !== post._id && item.categoryId !== post.categoryId
    );
    return [...sameCategory, ...others].slice(0, 3);
  }, [allPosts, post]);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const shareTelegram = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  };

  const shareX = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#0A1128] text-[#E2E8F0]" style={{ fontFamily: "Vazirmatn, sans-serif", backgroundImage: "linear-gradient(rgba(0,229,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,.03) 1px,transparent 1px)", backgroundSize: "52px 52px" }}>
      <header className="sticky top-0 z-50 border-b border-cyan-400/10 bg-[#060d1d]/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[68px] max-w-7xl items-center justify-between gap-5 px-5 lg:px-8">
          <Link href="/" className="text-right"><div className="text-lg font-black text-white">پاراهور <span className="text-cyan-400">•</span></div><div className="text-[9px] font-bold tracking-wider text-cyan-400">CYBER FORENSICS //</div></Link>
          <nav className="hidden items-center gap-8 text-sm font-bold text-slate-300 md:flex"><Link href="/services" className="transition hover:text-cyan-300">خدمات ما</Link><Link href="/blog" className="text-cyan-300">وبلاگ</Link><Link href="/about" className="transition hover:text-cyan-300">درباره ما</Link><Link href="/contact" className="transition hover:text-cyan-300">تماس با ما</Link></nav>
          <div className="flex items-center gap-3"><button onClick={() => setModalOpen(true)} className="rounded-xl bg-red-500 px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-red-400">تماس اورژانسی</button><span className="hidden h-9 w-9 place-items-center rounded-xl border border-white/10 text-slate-400 sm:grid">☼</span></div>
        </div>
      </header>

      <main>
        {/* Header intentionally uses min-height + auto height. It grows with title/meta content and never clips. */}
        <section className="border-b border-cyan-400/10 bg-transparent">
          <div className="mx-auto w-full max-w-5xl px-5 pb-14 pt-10 sm:px-8 sm:pb-18 sm:pt-12 lg:px-10 lg:pb-22 lg:pt-14">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-7 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
                <Link href="/" className="hover:text-cyan-300">خانه</Link><span>‹</span><Link href="/blog" className="hover:text-cyan-300">پایگاه دانش</Link><span>‹</span><span className="text-cyan-400">{category}</span>
              </div>

              <div className="mb-7 flex flex-wrap justify-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-xs font-bold text-cyan-300"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />{category}</span>
                {post.postType === "special" && <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1.5 text-xs font-bold text-amber-300">گزارش ویژه</span>}
              </div>

              {/* No fixed height / max-height / overflow-hidden here. Long titles wrap naturally. */}
              <h1 className="mx-auto w-full max-w-4xl break-all text-3xl font-black leading-[1.8] tracking-tight text-white sm:text-4xl sm:leading-[1.75] lg:text-5xl lg:leading-[1.7]">
                {post.title}
              </h1>

              <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/5 pt-6 text-xs text-slate-500">
                <span className="inline-flex items-center gap-2"><Icon name="calendar" size={15} />{date}</span>
                <span className="inline-flex items-center gap-2"><Icon name="user" size={15} />{post.author || "نویسنده پاراهور"}</span>
                <span className="inline-flex items-center gap-2"><Icon name="clock" size={15} />{post.readingTime || 0} دقیقه مطالعه</span>
                <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />گزارش منتشرشده</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="overflow-hidden rounded-2xl border border-cyan-400/10 bg-[#07152d] shadow-[0_25px_70px_rgba(0,0,0,.25)]">
            {imageUrl ? <img src={imageUrl} alt={imageAlt} className="block h-auto max-h-[520px] w-full object-cover" /> : <div className="grid h-[260px] place-items-center bg-[radial-gradient(circle_at_50%_20%,rgba(0,229,255,.16),transparent_55%)] text-sm text-slate-500">تصویر شاخص مقاله</div>}
          </div>

          <article className="mx-auto mt-8 max-w-4xl rounded-2xl border border-white/5 bg-[#07152d]/70 px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content || "" }} />

            {post.tags?.length > 0 && <div className="mt-10 border-t border-white/5 pt-6"><div className="mb-3 text-xs font-bold text-slate-500">برچسب‌ها:</div><div className="flex flex-wrap gap-2">{post.tags.map((tag) => <Link key={tag} href={`/blog?search=${encodeURIComponent(tag)}`} className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition hover:border-cyan-300/40 hover:bg-cyan-400/10">#{tag}</Link>)}</div></div>}
          </article>

          <section className="mx-auto mt-10 max-w-4xl rounded-3xl border border-cyan-400/30 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,.12),transparent_60%)] px-6 py-9 text-center shadow-[0_20px_70px_rgba(0,229,255,.06)] sm:px-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-300"><Icon name="alert" size={14} />توجه فوری</span>
            <h2 className="mt-5 text-2xl font-black text-white">آیا قربانی کلاهبرداری مشابهی شده‌اید؟</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400">هر ساعت مهم است. برای شروع بررسی پرونده، اطلاعات اولیه را برای ما ارسال کنید.</p>
            <button onClick={() => setModalOpen(true)} className="mt-6 rounded-xl bg-red-500 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-red-400">درخواست بررسی و رسیدگی پرونده</button>
          </section>

          <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-5 border-y border-white/5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 transition hover:text-cyan-200"><Icon name="arrow" size={17} />بازگشت به رادار پاراهور</Link>
            <div className="flex items-center gap-2"><span className="ml-2 text-xs text-slate-500">اشتراک‌گذاری:</span><button onClick={shareTelegram} aria-label="Telegram" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[.03] text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300"><Icon name="send" /></button><button onClick={shareX} aria-label="X" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[.03] text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300"><Icon name="x" /></button><button onClick={copyUrl} aria-label="Copy link" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[.03] text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300"><Icon name="copy" /></button>{copied && <span className="text-xs font-semibold text-emerald-400">لینک کپی شد</span>}</div>
          </div>

          {relatedPosts.length > 0 && <section className="mx-auto mt-10 max-w-4xl"><div className="mb-5 flex items-center gap-3"><span className="h-6 w-1 rounded-full bg-cyan-400" /><h2 className="text-xl font-black text-white">گزارش‌های مرتبط</h2></div><div className="grid gap-4 md:grid-cols-3">{relatedPosts.map((item) => { const src = getMediaUrl(item.featuredImage, mediaItems); return <Link key={item._id} href={`/blog/${item.slug || item._id}`} className="group overflow-hidden rounded-2xl border border-white/8 bg-[#07152d] transition hover:-translate-y-1 hover:border-cyan-400/30">{src ? <img src={src} alt={item.featuredImageAlt?.trim() || item.title} className="h-36 w-full object-cover transition duration-500 group-hover:scale-[1.03]" /> : <div className="h-36 bg-[radial-gradient(circle_at_50%_30%,rgba(0,229,255,.14),transparent_60%)]" />}<div className="p-4"><div className="mb-2 text-[10px] font-bold text-cyan-400">{getCategoryLabel(item.categoryId)}</div><h3 className="line-clamp-2 text-sm font-extrabold leading-6 text-white group-hover:text-cyan-200">{item.title}</h3><div className="mt-3 text-[11px] text-slate-500">{item.readingTime || 0} دقیقه مطالعه</div></div></Link>; })}</div></section>}
        </section>
      </main>

      <footer className="mt-10 border-t border-cyan-400/10 bg-[#060d1d]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between"><div><div className="text-xl font-black text-white">پاراهور <span className="text-cyan-400">•</span></div><div className="mt-1 text-[9px] font-bold tracking-wider text-cyan-400">CYBER FORENSICS //</div></div><nav className="flex flex-wrap gap-6 text-xs font-bold text-slate-400"><Link href="/services" className="hover:text-cyan-300">خدمات ما</Link><Link href="/blog" className="hover:text-cyan-300">وبلاگ</Link><Link href="/about" className="hover:text-cyan-300">درباره ما</Link><Link href="/contact" className="hover:text-cyan-300">تماس با ما</Link></nav><div className="text-xs text-slate-600">© 2025 Parahoor. All rights reserved.</div></div>
      </footer>

      {modalOpen && <EmergencyModal onClose={() => setModalOpen(false)} />}

      <style jsx global>{`
        .blog-content { color:#cbd5e1; font-size:1rem; line-height:2.15; }
        .blog-content p { margin:0 0 1.25rem; }
        .blog-content h1,.blog-content h2,.blog-content h3,.blog-content h4 { color:#fff; font-weight:800; line-height:1.8; margin:2rem 0 1rem; }
        .blog-content h1 { font-size:2rem; }
        .blog-content h2 { font-size:1.55rem; }
        .blog-content h3 { font-size:1.3rem; }
        .blog-content h4 { font-size:1.1rem; }
        .blog-content strong { color:#f8fafc; font-weight:800; }
        .blog-content em { color:#bae6fd; }
        .blog-content a { color:#22d3ee; text-decoration:underline; text-underline-offset:4px; }
        .blog-content ul,.blog-content ol { margin:1rem 0 1.5rem; padding-right:1.5rem; }
        .blog-content li { margin:.45rem 0; }
        .blog-content blockquote { margin:1.5rem 0; border-right:3px solid #22d3ee; border-radius:0 12px 12px 0; background:rgba(34,211,238,.06); padding:1rem 1.2rem; color:#cbd5e1; }
        .blog-content pre { overflow:auto; margin:1.5rem 0; border:1px solid rgba(34,211,238,.12); border-radius:14px; background:#030b18; padding:1rem; direction:ltr; text-align:left; }
        .blog-content code { border-radius:6px; background:rgba(34,211,238,.08); padding:.12rem .35rem; color:#67e8f9; }
        .blog-content pre code { background:transparent; padding:0; color:#cbd5e1; }
        .blog-content img { display:block; max-width:100%; height:auto; margin:1.75rem auto; border-radius:14px; }
        .blog-content hr { margin:2rem 0; border-color:rgba(255,255,255,.08); }
        .blog-content table { width:100%; margin:1.5rem 0; border-collapse:collapse; }
        .blog-content th,.blog-content td { border:1px solid rgba(255,255,255,.08); padding:.65rem .75rem; }
        .blog-content th { color:#fff; background:rgba(34,211,238,.05); }
        @media (max-width:640px) { .blog-content { font-size:.94rem; line-height:2.05; } .blog-content h1 {font-size:1.55rem}.blog-content h2{font-size:1.3rem}.blog-content h3{font-size:1.15rem} }
      `}</style>
    </div>
  );
}
