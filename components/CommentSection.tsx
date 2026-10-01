"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CommentSectionProps {
  postId: string;
  darkMode: boolean;
  initialComments: ApprovedComment[];
}

export interface ApprovedComment {
  _id: string;
  name: string;
  comment: string;
  createdAt: string;
}

const IconWarning = () => (
  <svg className="w-4 h-4 flex-shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const IconChat = ({ darkMode }: { darkMode: boolean }) => (
  <svg
    className="w-8 h-8"
    style={{ color: darkMode ? "#00E5FF" : "#1E3A8A", opacity: 0.35 }}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

// فرمت زمان نسبی به فارسی، بدون وابستگی به فایل/کامپوننت دیگه‌ای
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "همین الان";
  if (diffMinutes < 60) return `${diffMinutes} دقیقه پیش`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} ساعت پیش`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays} روز پیش`;

  return date.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
}

export default function CommentSection({ postId, darkMode, initialComments }: CommentSectionProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");

  const [errors, setErrors] = useState<{ name?: string; contact?: string; comment?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState<{ success: boolean; text: string } | null>(null);

  // نظرات تایید و منتشرشده، مستقیم از سرور (page.tsx) به‌عنوان prop
  // می‌رسن -- دیگه نیازی به فچ کلاینتی یا حالت لودینگ نیست، چون
  // همون اولین HTML سرور، این محتوا رو از قبل داره (سئوفرندلی).
  const [comments] = useState<ApprovedComment[]>(initialComments);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^09[0-9]{9}$/; // شماره موبایل 11 رقمی ایران با شروع 09

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerMessage(null);

    const newErrors: { name?: string; contact?: string; comment?: string } = {};

    if (!name.trim()) newErrors.name = "لطفاً نام خود را وارد کنید.";

    // اعتبارسنجی فیلد تماس (اگر کاربر چیزی وارد کرده باشد، بررسی می‌شود)
    if (contact.trim()) {
      const isEmail = emailRegex.test(contact.trim());
      const isPhone = phoneRegex.test(contact.trim());
      if (!isEmail && !isPhone) {
        newErrors.contact = "لطفاً یک ایمیل معتبر یا شماره موبایل صحیح وارد کنید.";
      }
    }

    if (!comment.trim()) newErrors.comment = "متن دیدگاه نمی‌تواند خالی باشد.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, name, contact, comment }),
      });

      const result = await response.json();

      if (response.ok) {
        setServerMessage({
          success: true,
          text: "نظر شما با موفقیت ثبت شد و در انتظار تایید ادمین است.",
        });
        setName("");
        setContact("");
        setComment("");
      } else {
        setServerMessage({ success: false, text: result.message || "خطایی رخ داد." });
      }
    } catch (error) {
      setServerMessage({ success: false, text: "خطا در ارتباط با سرور." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`mt-12 w-full max-w-4xl mx-auto px-4 sm:px-0 `}>

      {/* هدر بخش نظرات */}
      <div className="flex items-center gap-2 mb-6 px-1">
        <span
          style={{
            width: 4,
            height: 18,
            borderRadius: 99,
            background: darkMode ? "rgb(0,229,255)" : "rgb(21,101,192)",
          }}
        />
        <h3 className="font-bold text-base" style={{ color: darkMode ? "#E2E8F0" : "black" }}>
          نظرات و دیدگاه‌های کاربران
        </h3>
      </div>

      {/* کارت فرم با همون ساختار ساده قبلی، ولی با هاورها و رنگ‌ولعاب استایلِ شما */}
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-300 w-full p-6 md:p-8 mb-10 ${
          darkMode
            ? "border-[#00E5FF]/25 bg-white/[0.025] backdrop-blur-[10px]  shadow-[0_18px_42px_rgba(0,0,0,0.38),0_12px_40px_rgba(0,229,255,0.20)] "
            : "border-[#1565C0]/40 bg-white shadow-[0_16px_42px_rgb(21,101,192/)] shadow-[0_18px_42px_rgba(0,0,0,0.38),0_12px_40px_rgba(0,229,255,0.20)]"
        }`}
      >
        {/* خط نوری بالای کارت */}
<div className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent ${
  darkMode ? "via-[#00E5FF]/50" : "via-[#1565C0]/40"
} to-transparent`} />

        <h4 className="font-bold text-sm mb-2 relative z-10" style={{ color: darkMode ? "#FFFFFF" : "black" }}>
          دیدگاه خود را با ما به اشتراک بگذارید
        </h4>
        <p className="text-xs mb-6 relative z-10" style={{ color: darkMode ? "#94A3B8" : "#64748B" }}>
          نظر شما پس از بررسی و تایید تیم مدیریت در صفحه نمایش داده خواهد شد.
        </p>

        {/* بنر راهنمای کوچک بالایی */}
        <div className={`mb-6 flex items-center gap-2.5 rounded-xl border px-4 py-3 text-xs ${
          darkMode
            ? "border-[#00E5FF]/[0.08] bg-[#00E5FF]/[0.03] text-cyan-300/80"
            : "border-[#1565C0]/40 bg-[#1565C0]/[0.055] text-[#1565C0]"
        }`}>
          <IconWarning />
          <span>دیدگاه شما پس از بررسی و تایید ادمین در سایت نمایش داده خواهد شد.</span>
        </div>

        {/* پیام موفقیت ثبت نظر */}
        {serverMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 mb-6 rounded-xl text-xs font-medium flex items-center gap-3 ${
              serverMessage.success
                ? darkMode ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-500/10 text-red-400 border border-red-500/30"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            {serverMessage.text}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] mb-1.5 font-medium" style={{ color: darkMode ? "#CBD5E1" : "#334155" }}>
                نام و نام خانوادگی <span className="text-red-500">*</span>
              </label>
              <input
              onMouseEnter={(e) => {
  if (document.activeElement === e.currentTarget) return;
  e.currentTarget.style.borderColor = darkMode
    ? "rgba(0, 229, 255, 0.52)"
    : "#1565c0cf";
}}
onMouseLeave={(e) => {
  if (document.activeElement === e.currentTarget) return;
  e.currentTarget.style.borderColor = darkMode
    ? "rgba(0,229,255,0.15)"
    : "rgba(30, 59, 138, 0.12)";
}}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثلا: علی رضایی"
                className={`w-full px-4 py-3 rounded-xl text-xs outline-none transition-all duration-200 ${
                  darkMode
                    ? "bg-white/5 border border-[#00E5FF]/20 text-white focus:border-[#00E5FF]"
                    : "bg-slate-50 border border-[#1E3A8A]/20 text-slate-900 focus:border-[#1565C0]"
                }`}
              />
              {errors.name && <span className="text-[10px] text-red-400 mt-1 block">{errors.name}</span>}
            </div>

            <div>
              <label className="block text-[11px] mb-1.5 font-medium" style={{ color: darkMode ? "#CBD5E1" : "#334155" }}>
                ایمیل یا شماره تماس <span className="opacity-60">(اختیاری)</span>
              </label>
              <input
              onMouseEnter={(e) => {
  if (document.activeElement === e.currentTarget) return;
  e.currentTarget.style.borderColor = darkMode
    ? "rgba(0, 229, 255, 0.52)"
    : "#1565c0cf";
}}
onMouseLeave={(e) => {
  if (document.activeElement === e.currentTarget) return;
  e.currentTarget.style.borderColor = darkMode
    ? "rgba(0,229,255,0.15)"
    : "rgba(30, 59, 138, 0.12)";
}}
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="مثلا: example@gmail.com یا 09123456789"
                className={`w-full px-4 py-3 rounded-xl text-xs outline-none transition-all duration-200 ${
                  darkMode
                    ? "bg-white/5 border border-[#00E5FF]/20 text-white focus:border-[#00E5FF]"
                    : "bg-slate-50 border border-[#1E3A8A]/20 text-slate-900 focus:border-[#1565C0]"
                }`}
              />
              {errors.contact && <span className="text-[10px] text-red-400 mt-1 block">{errors.contact}</span>}
            </div>
          </div>

          <div>
            <label className="block text-[11px] mb-1.5 font-medium" style={{ color: darkMode ? "#CBD5E1" : "#334155" }}>
              متن دیدگاه <span className="text-red-500">*</span>
            </label>
            <textarea
                          onMouseEnter={(e) => {
  if (document.activeElement === e.currentTarget) return;
  e.currentTarget.style.borderColor = darkMode
    ? "rgba(0, 229, 255, 0.52)"
    : "#1565c0cf";
}}
onMouseLeave={(e) => {
  if (document.activeElement === e.currentTarget) return;
  e.currentTarget.style.borderColor = darkMode
    ? "rgba(0,229,255,0.15)"
    : "rgba(30, 59, 138, 0.12)";
}}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              placeholder="دیدگاه یا تجربه خود را بنویسید..."
              className={`w-full px-4 py-3 rounded-xl text-xs outline-none transition-all duration-200  resize-none ${
                darkMode
                  ? "bg-white/5 border border-[#00E5FF]/20 text-white focus:border-[#00E5FF]"
                  : "bg-slate-50 border border-[#1E3A8A]/20 text-slate-900 focus:border-[#1565C0]"
              }`}
            />
            {errors.comment && <span className="text-[10px] text-red-400 mt-1 block">{errors.comment}</span>}
          </div>

          <button
  type="submit"
  disabled={submitting}
  className={`px-7 py-3 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md hover:opacity-90 ${
    darkMode
      ? "bg-[#00E5FF] text-[#060B19] hover:shadow-[0_18px_42px_rgba(0,0,0,0.38),0_8px_40px_rgba(0,229,255,0.51)]"
      : "bg-[#1565C0] text-white hover:bg-[#0D47A1]"
  }`}
>
  {submitting ? "در حال ارسال..." : "ارسال دیدگاه"}
</button>
        </form>
      </div>

      {/* ───────────────── لیست نظرات تایید و منتشرشده ───────────────── */}

      <div className="flex items-center justify-between mb-5 px-1">
        <h4 className="font-bold text-sm" style={{ color: darkMode ? "#E2E8F0" : "#0F172A" }}>
          دیدگاه‌های ثبت‌شده
        </h4>

        {comments.length > 0 && (
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full  ${
              darkMode ? "bg-[#00E5FF]/10 text-[#00E5FF]" : "bg-[#1E3A8A]/8 text-[#1E3A8A]"
            }`}
          >
            {comments.length} دیدگاه
          </span>
        )}
      </div>

      {/* حالت خالی */}
      {comments.length === 0 && (
        <div
          className={`flex flex-col items-center justify-center gap-3 rounded-2xl border py-12 px-6 text-center ${
            darkMode ? "border-white/[0.06] bg-white/[0.015]" : "border-slate-200 bg-slate-50/60"
          }`}
        >
          <IconChat darkMode={darkMode} />
          <p className="text-xs font-semibold" style={{ color: darkMode ? "#94A3B8" : "#64748B" }}>
            هنوز دیدگاهی برای این مطلب ثبت نشده است.
          </p>
          <p className="text-[11px]" style={{ color: darkMode ? "#64748B" : "#94A3B8" }}>
            اولین نفری باشید که نظر خود را می‌نویسد.
          </p>
        </div>
      )}

      {/* لیست دیدگاه‌ها */}
      <div className="w-full bg-[rgba(235, 245, 251, 0.2)]">

{comments.length > 0 && (
  <div className="space-y-3 max-w-4xl mx-auto">
    <AnimatePresence initial={false}>
      {comments.map((c, index) => (
        <motion.div
          key={c._id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: Math.min(index, 6) * 0.04 }}
          className={`relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
            darkMode
              ? "border-white/[0.07] bg-white/[0.03] shadow-[0_4px_18px_rgba(0,0,0,0.35)] "
              : "border-[#1565C0]/40 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.07)] "
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-black mt-1"
              style={{
                background: darkMode ? "rgba(0,229,255,0.12)" : "rgba(148, 193, 229, 0.26)",
                color: darkMode ? "#00e5ffb2" : "#1565C0",
                border: darkMode ? "1px solid #00e5ffb2" : "1px solid #8ab4e4",
              }}
            >
              {c.name?.charAt(0) || "؟"}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mb-1.5">
                <span className="text-[12px] font-bold" style={{ color: darkMode ? "#E2E8F0" : "#0F172A" }}>
                  {c.name || "کاربر مهمان"}
                </span>
                <span className="text-[10px] font-medium" style={{ color: darkMode ? "#64748B" : "#94A3B8" }}>
                  {formatRelativeTime(c.createdAt)}
                </span>
              </div>

              <p
                className="text-[12.5px] leading-relaxed whitespace-pre-line"
                style={{ color: darkMode ? "#CBD5E1" : "#334155" }}
              >
                {c.comment}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
)}
      </div>
    </div>
  );
}
