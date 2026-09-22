"use client"

import { useState } from "react";
import type React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import EmergencyModal from "@/components/CrisisReportForm";
import { siTelegram } from "simple-icons";

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
const IconMail = ({ size = 14, color = "#00E5FF" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconPhone = ({ color = "#EF4444" }: { color?: string }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.2 3.4 5.6 3.9A2.2 2.2 0 0 0 4.1 6.5c1.15 6.1 6.05 11 12.15 12.15a2.2 2.2 0 0 0 2.6-1.5l.5-1.6-4.1-2.1-1.65 1.65a13.2 13.2 0 0 1-5.65-5.65L9.6 7.8 7.5 3.7a.28.28 0 0 0-.3-.3Z" />
  </svg>
);
const IconTelegramBig = ({ color = "#00E5FF" }: { color?: string }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ color }}
  >
    <path d={siTelegram.path} />
  </svg>
);

const IconLockMail = ({ color = "#1E3A8A" }: { color?: string }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);
const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconWarning = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const IconMapPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconShield = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/* ─── DECORATIVE MAP SVG ─── */
const DarkMap = ({ lightMode = false }: { lightMode?: boolean }) => {
  const blue = lightMode ? "#1E3A8A" : "#00E5FF";
  const blueSoft = lightMode ? "rgba(30,58,138,0.12)" : "rgba(0,229,255,0.12)";
  const blueMid = lightMode ? "rgba(30,58,138,0.20)" : "rgba(0,229,255,0.2)";
  const blueStrong = lightMode ? "rgba(30,58,138,0.42)" : "rgba(0,229,255,0.4)";
  const base = lightMode ? "#F8FAFC" : "#060D1F";
  const grid = lightMode ? "rgba(30,58,138,0.055)" : "rgba(255,255,255,0.04)";
  const block = lightMode ? "rgba(30,58,138,0.035)" : "rgba(255,255,255,0.02)";
  const blockStrong = lightMode ? "rgba(30,58,138,0.055)" : "rgba(255,255,255,0.035)";
  const road = lightMode ? "rgba(30,58,138,0.10)" : "rgba(255,255,255,0.08)";
  const roadMid = lightMode ? "rgba(30,58,138,0.07)" : "rgba(255,255,255,0.06)";
  const roadSoft = lightMode ? "rgba(30,58,138,0.055)" : "rgba(255,255,255,0.04)";
  const label = lightMode ? "rgba(15,23,42,0.35)" : "rgba(255,255,255,0.2)";
  const watermark = lightMode ? "rgba(15,23,42,0.12)" : "rgba(255,255,255,0.08)";

  return (
    <svg width="100%" height="100%" viewBox="0 0 900 420" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <defs>
        <radialGradient id={lightMode ? "mapglow-light" : "mapglow"} cx="55%" cy="48%" r="20%">
          <stop offset="0%" stopColor={lightMode ? "rgba(30,58,138,0.16)" : "rgba(0,229,255,0.18)"} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id={lightMode ? "mpblur-light" : "mpblur"}><feGaussianBlur stdDeviation="5" /></filter>
      </defs>

      <rect width="900" height="420" fill={base} />

      {[
        [40, 30, 110, 60], [170, 20, 80, 50], [310, 40, 120, 55], [490, 25, 90, 65],
        [640, 30, 100, 50], [790, 20, 80, 60], [40, 130, 90, 70], [190, 120, 130, 80],
        [380, 110, 100, 90], [530, 130, 110, 60], [690, 120, 100, 75], [820, 115, 65, 80],
        [50, 250, 120, 65], [230, 245, 90, 75], [370, 250, 130, 60], [560, 240, 100, 80],
        [710, 245, 110, 65], [40, 350, 100, 55], [200, 345, 120, 65], [380, 350, 90, 55],
        [520, 340, 130, 70], [700, 350, 100, 55], [840, 345, 50, 60],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill={i % 5 === 0 ? blockStrong : block} stroke={grid} strokeWidth="0.5" />
      ))}

      <line x1="0" y1="210" x2="900" y2="210" stroke={road} strokeWidth="4" />
      <line x1="450" y1="0" x2="450" y2="420" stroke={roadMid} strokeWidth="3" />
      <line x1="0" y1="140" x2="900" y2="140" stroke={roadSoft} strokeWidth="2" />
      <path d="M0 320 Q200 300 450 330 Q700 360 900 320" stroke={roadMid} strokeWidth="3" fill="none" />
      <path d="M100 0 Q150 210 200 420" stroke={roadSoft} strokeWidth="2" fill="none" />
      <path d="M700 0 Q720 210 760 420" stroke={roadSoft} strokeWidth="2" fill="none" />

      <circle cx="496" cy="205" r="60" fill={`url(#${lightMode ? "mapglow-light" : "mapglow"})`} />
      <circle cx="496" cy="205" r="40" fill="transparent" stroke={blueSoft} strokeWidth="1.5" />
      <circle cx="496" cy="205" r="26" fill="transparent" stroke={blueMid} strokeWidth="1.5" />
      <circle cx="496" cy="205" r="12" fill={lightMode ? "rgba(30,58,138,0.10)" : "rgba(0,229,255,0.15)"} stroke={blueStrong} strokeWidth="1.5" />
      <circle cx="496" cy="205" r="4" fill={blue} />

      <ellipse cx="496" cy="212" rx="5" ry="2.5" fill={lightMode ? "rgba(15,23,42,0.16)" : "rgba(0,0,0,0.5)"} filter={`url(#${lightMode ? "mpblur-light" : "mpblur"})`} />

      <path d="M496 175 C486 175 478 183 478 192 C478 204 496 220 496 220 C496 220 514 204 514 192 C514 183 506 175 496 175Z"
        fill={lightMode ? "rgba(153,27,27,0.08)" : "rgba(0,229,255,0.15)"} stroke={lightMode ? "#991B1B" : "#00E5FF"} strokeWidth="1.5" />
      <circle cx="496" cy="192" r="5" fill={lightMode ? "#991B1B" : "#00E5FF"} opacity="0.85" />

      <line x1="30" y1="398" x2="110" y2="398" stroke={label} strokeWidth="1.5" />
      <line x1="30" y1="394" x2="30" y2="402" stroke={label} strokeWidth="1.5" />
      <line x1="110" y1="394" x2="110" y2="402" stroke={label} strokeWidth="1.5" />
      <text x="70" y="413" textAnchor="middle" fontSize="9" fill={label} fontFamily="monospace">500m</text>
      <text x="860" y="415" textAnchor="end" fontSize="8" fill={watermark} fontFamily="monospace">© PARAHOOR MAP</text>
    </svg>
  );
};

/* ─── CONTACT FORM ─── */
type FeedbackFormValues = {
  name: string;
  contact: string;
  subject: string;
  message: string;
};

const ContactForm = ({ isDark }: { isDark: boolean }) => {
  const [sent, setSent] = useState(false);
  const [focus, setFocus] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [subjectOpen, setSubjectOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormValues>({
    mode: "onBlur",
    defaultValues: { name: "", contact: "", subject: "", message: "" },
  });

  const message = watch("message", "");
  const subject = watch("subject", "");

  const onSubmit = async (data: FeedbackFormValues) => {
    setSubmitError("");
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          contact: data.contact.trim(),
          subject: data.subject,
          message: data.message.trim(),
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.message || "خطایی در ثبت پیام رخ داد. لطفاً دوباره تلاش کنید.");
      setSent(true);
      reset();
    } catch (error) {
      console.error("Feedback form submit error:", error);
      setSubmitError(error instanceof Error ? error.message : "خطایی در ثبت پیام رخ داد. لطفاً دوباره تلاش کنید.");
    }
  };

  const field = (name: string) => [
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200",
    isDark
      ? "border-[#00E5FF]/20 bg-[#060B19] text-[#E2E8F0] placeholder:text-[#475569] caret-[#00E5FF] hover:border-[#00E5FF]/45 focus:border-[#00E5FF]/70 focus:ring-4 focus:ring-[#00E5FF]/[0.06]"
      : "border-[#1E3A8A]/25 bg-white text-[#0F172A] placeholder:text-[#94A3B8] caret-[#1E3A8A] hover:border-[#1E3A8A]/55 focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/[0.08]",
    focus === name && (isDark ? "border-[#00E5FF]/40 shadow-[0_0_16px_rgba(0,229,255,0.02)]" : "border-[#1E3A8A] shadow-[0_8px_20px_rgba(30,58,138,0.06)]"),
  ].filter(Boolean).join(" ");

  if (sent) return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <div className={`flex h-16 w-16 items-center justify-center rounded-full border ${isDark ? "border-[#00E5FF]/20 bg-[#00E5FF]/[0.06] shadow-[0_0_30px_rgba(0,229,255,0.08)]" : "border-[#1E3A8A]/20 bg-[#1E3A8A]/[0.08] shadow-[0_0_30px_rgba(30,58,138,0.08)]"}`}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isDark ? "text-[#00E5FF]" : "text-[#1E3A8A]"}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      </div>
      <h4 className={`text-base font-bold ${isDark ? "text-white" : "text-[#0F172A]"}`}>پیام شما ثبت شد</h4>
      <p className={`text-sm leading-7 ${isDark ? "text-[#475569]" : "text-slate-500"}`}>از اینکه نظر، پیشنهاد یا درخواست همکاری خود را با پاراهور در میان گذاشتید، سپاسگزاریم.</p>
      <div className={`rounded-xl border px-4 py-2.5 font-mono text-xs ${isDark ? "border-[#00E5FF]/10 bg-[#00E5FF]/[0.04] text-[#334155]" : "border-[#1E3A8A]/10 bg-[#F8FAFC] text-[#1E3A8A]"}`}>FEEDBACK // RECEIVED</div>
      <button type="button" onClick={() => { reset(); setSent(false); }} className={`mt-2 text-xs font-semibold transition-opacity hover:opacity-70 ${isDark ? "text-[#00E5FF]" : "text-[#1E3A8A]"}`}>ثبت پیام جدید</button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={`mb-2 block text-xs font-medium ${isDark ? "text-[#64748B]" : "text-slate-600"}`}>نام و نام خانوادگی <span className="text-[#991B1B]">*</span></label>
          <input type="text" placeholder="رضا احمدی" autoComplete="name" className={field("name")} {...register("name", { required: "لطفاً نام خود را وارد کنید.", minLength: { value: 2, message: "نام باید حداقل ۲ کاراکتر باشد." } })} onFocus={() => setFocus("name")} onBlur={() => setFocus(null)} />
          {errors.name && <p className="mt-1.5 text-[11px] text-[#991B1B]">{errors.name.message}</p>}
        </div>
        <div>
          <label className={`mb-2 block text-xs font-medium ${isDark ? "text-[#64748B]" : "text-slate-600"}`}>شماره تماس یا ایمیل <span className={isDark ? "text-[#475569]" : "text-slate-400"}>(اختیاری)</span></label>
          <input type="text" placeholder="09xxxxxxxxx یا email@..." autoComplete="email" className={field("contact")} {...register("contact")} onFocus={() => setFocus("contact")} onBlur={() => setFocus(null)} />
        </div>
      </div>

      <div>
        <label className={`mb-2 block text-xs font-medium ${isDark ? "text-[#64748B]" : "text-slate-600"}`}>موضوع پیام <span className="text-[#991B1B]">*</span></label>
        <div className="relative">
          <input type="hidden" {...register("subject", { required: "لطفاً موضوع پیام را انتخاب کنید." })} />
          <button
            type="button"
            onClick={() => { setSubjectOpen((v) => !v); setFocus("subject"); }}
            onBlur={() => setTimeout(() => setFocus(null), 120)}
            className={`${field("subject")} relative flex w-full items-center justify-between pr-4 pl-12 text-right cursor-pointer`}
            aria-haspopup="listbox"
            aria-expanded={subjectOpen}
          >
            <span className={subject ? (isDark ? "text-[#E2E8F0]" : "text-[#0F172A]") : (isDark ? "text-[#475569]" : "text-[#94A3B8]")}>
              {{
                "service-feedback": "انتقاد از خدمات و تجربه کاربری",
                "website-suggestion": "پیشنهاد برای بهبود سایت",
                "content-suggestion": "پیشنهاد محتوایی",
                "technical-feedback": "مشکل فنی یا خطای سایت",
                "partnership": "پیشنهاد همکاری با پاراهور",
                "feature-request": "پیشنهاد قابلیت یا ایده جدید",
                "other": "سایر انتقادات و پیشنهادات",
              }[subject] || "انتخاب موضوع پیام..."}
            </span>
            <span className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-200 ${subjectOpen ? "rotate-180" : ""} ${isDark ? "text-[#00E5FF]" : "text-[#1E3A8A]"}`}><IconChevronDown /></span>
          </button>
          {subjectOpen && (
            <div role="listbox" className={`absolute inset-x-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border p-1.5 shadow-2xl backdrop-blur-xl ${isDark ? "border-[#00E5FF]/30 bg-[#071126]/[0.98] shadow-[0_18px_42px_rgba(0,0,0,0.5),0_0_24px_rgba(0,229,255,0.08)]" : "border-[#1E3A8A]/25 bg-white/[0.98] shadow-[0_18px_42px_rgba(15,23,42,0.14),0_0_24px_rgba(30,58,138,0.08)]"}`}>
              {[
                ["service-feedback", "انتقاد از خدمات و تجربه کاربری"],
                ["website-suggestion", "پیشنهاد برای بهبود سایت"],
                ["content-suggestion", "پیشنهاد محتوایی"],
                ["technical-feedback", "مشکل فنی یا خطای سایت"],
                ["partnership", "پیشنهاد همکاری با پاراهور"],
                ["feature-request", "پیشنهاد قابلیت یا ایده جدید"],
                ["other", "سایر انتقادات و پیشنهادات"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  role="option"
                  aria-selected={subject === value}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => { setValue("subject", value, { shouldValidate: true, shouldDirty: true }); setSubjectOpen(false); setFocus(null); }}
                  className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-right text-xs transition-colors duration-150 ${subject === value ? (isDark ? "bg-[#00E5FF]/[0.10] text-[#00E5FF]" : "bg-[#1E3A8A]/[0.08] text-[#1E3A8A]") : (isDark ? "text-[#94A3B8] hover:bg-[#00E5FF]/[0.06] hover:text-[#E2E8F0]" : "text-[#475569] hover:bg-[#1E3A8A]/[0.06] hover:text-[#1E3A8A]")}`}
                >
                  <span>{label}</span>
                  {subject === value && <span className={`text-[11px] ${isDark ? "text-[#00E5FF]" : "text-[#1E3A8A]"}`}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
        {errors.subject && <p className="mt-1.5 text-[11px] text-[#991B1B]">{errors.subject.message}</p>}
      </div>

      <div>
        <label className={`mb-2 block text-xs font-medium ${isDark ? "text-[#64748B]" : "text-slate-600"}`}>متن پیام <span className="text-[#991B1B]">*</span></label>
        <textarea rows={4} placeholder="انتقاد، پیشنهاد یا درخواست همکاری خود را بنویسید..." className={`${field("message")} resize-none`} {...register("message", { required: "لطفاً متن پیام را وارد کنید.", minLength: { value: 10, message: "متن پیام باید حداقل ۱۰ کاراکتر باشد." } })} onFocus={() => setFocus("message")} onBlur={() => setFocus(null)} />
        <div className="mt-1.5 flex items-center justify-between">
          {errors.message ? <p className="text-[11px] text-[#991B1B]">{errors.message.message}</p> : <span />}
          <p className={`text-[10px] ${isDark ? "text-[#475569]" : "text-slate-400"}`}>{message.length} کاراکتر</p>
        </div>
      </div>

      <div className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-xs ${isDark ? "border-[#00E5FF]/[0.08] bg-[#00E5FF]/[0.03] text-[#475569]" : "border-[#1E3A8A]/10 bg-[#1E3A8A]/[0.035] text-[#64748B]"}`}>
        <span className={`mt-0.5 ${isDark ? "text-[#00E5FF]" : "text-[#1E3A8A]"}`}><IconShield /></span>
        <span>این بخش برای انتقاد، پیشنهاد و همکاری با پاراهور است و برای ثبت گزارش بحران استفاده نمی‌شود. اطلاعات تماس اختیاری است.</span>
      </div>

      {submitError && <div className="rounded-xl border border-[#991B1B]/[0.16] bg-[#991B1B]/[0.06] px-4 py-3 text-xs text-[#991B1B]" role="alert">{submitError}</div>}

      <button type="submit" disabled={isSubmitting} className={`flex w-full items-center justify-center gap-2.5 rounded-xl border py-3.5 text-sm font-bold font-[Vazirmatn,sans-serif] transition-all duration-300 ${isSubmitting ? (isDark ? "cursor-wait border-[#00E5FF]/20 bg-[#00E5FF]/10 text-[#00E5FF]/50" : "cursor-wait border-[#1E3A8A]/20 bg-[#1E3A8A]/10 text-[#1E3A8A]/50") : (isDark ? "cursor-pointer border-[#00E5FF]/40 bg-[#00E5FF] text-[#0A1128] shadow-[0_0_20px_rgba(0,229,255,0.22)] hover:bg-[#00D5EE] hover:shadow-[0_0_30px_rgba(0,229,255,0.28)]" : "cursor-pointer border-[#1E3A8A] bg-[#1E3A8A] text-white shadow-[0_10px_24px_rgba(30,58,138,0.17)] hover:bg-[#172F73] hover:shadow-[0_12px_26px_rgba(30,58,138,0.20)]")}`}>
        <IconSend />
        {isSubmitting ? "در حال ثبت..." : "ثبت انتقاد، پیشنهاد و همکاری"}
      </button>
    </form>
  );
};

/* ─── APP ─── */
export default function ContactPageClient({ h1Title = "ارتباط امن با پاراهور" }: { h1Title?: string }) {
  const { darkMode } = useTheme();

  // Keep the first client render identical to the server render.

const isDark = darkMode;
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [crisisOpen, setCrisisOpen] = useState(false);

  const themeBlue = isDark ? "#00E5FF" : "#1E3A8A";
  const themeRed = isDark ? "#EF4444" : "#991B1B";

  type ContactChannel = {
    icon: React.ReactNode;
    iconColor: string;
    badge: string;
    title: string;
    desc: string;
    value: string;
    valueLabel: string;
    urgent: boolean;
    accentColor: string;
    hoverColor?: string;
    href?: string;
    action?: () => void;
    actionLabel: string;
  };

  const channels: ContactChannel[] = [
    { icon: <IconPhone color={themeRed} />, iconColor: themeRed, badge: "CRISIS HOTLINE", title: "خط ویژه بحران", desc: "پاسخگویی فوری به پرونده‌های سرقت و هک", value: "۰۲۱-XXXXXXX", valueLabel: "شماره تماس", urgent: true, accentColor: themeRed, action: () => setCrisisOpen(true), actionLabel: "گزارش اورژانسی" },
    { icon: <IconTelegramBig color={themeBlue} />, iconColor: themeBlue, badge: "SECURE CHAT", title: "پشتیبانی امن تلگرام", desc: "ارسال سریع مستندات و لاگ‌ها", value: "@mahdi_eskandari_84", valueLabel: "آیدی تلگرام", urgent: false, accentColor: themeBlue, hoverColor: themeBlue, href: "https://t.me/mahdi_eskandari_84", actionLabel: "باز کردن تلگرام" },
    { icon: <IconLockMail color={themeBlue} />, iconColor: themeBlue, badge: "OFFICIAL EMAIL", title: "ایمیل سازمانی", desc: "برای مکاتبات رسمی و حقوقی", value: "info@parahoor.com", valueLabel: "آدرس ایمیل", urgent: false, accentColor: themeBlue, hoverColor: themeBlue, href: "mailto:info@parahoor.com", actionLabel: "ارسال ایمیل" },
  ];

  return (
    <>
    <div dir="rtl" className={`contact-page min-h-screen bg-[length:52px_52px] bg-fixed font-[Vazirmatn,sans-serif] transition-colors duration-300 ${isDark ? "bg-[#0A1128] text-[#E6F7FF] [background-image:linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)]" : "bg-white text-[#0F172A] [background-image:linear-gradient(rgba(30,58,138,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,138,0.045)_1px,transparent_1px)]"}`}>
      {/* HERO */}
      <motion.section className="contact-hero relative overflow-hidden px-6 pb-16 pt-20 text-center md:px-12 md:pb-20 md:pt-28" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: "easeOut" }}
       style={{
            background: darkMode
              ? "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(0, 229, 255, 0.06) 0%, transparent 70%)"
              : "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(84, 128, 215, 0.18) 0%, transparent 70%)",
          }}
      >
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className={`mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold ${isDark ? "border-[#00E5FF]/20 bg-[#00E5FF]/[0.07] text-[#00E5FF] " : "border-[#1E3A8A]/16 bg-[#1E3A8A]/[0.045] text-[#1E3A8A] "}`}>
            <PulseDot size={5} color={themeBlue} /><span className="font-mono tracking-[0.15em]">SECURE COMMUNICATION // END-TO-END ENCRYPTED</span>
          </div>
<h1
  className="glow-text font-black leading-tight mb-6"
  style={{
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    color: darkMode ? "#e8f4f8" : "#0c1a43",
    lineHeight: "1.3",
    fontWeight: 900,
    textShadow: darkMode
      ? undefined
      : "0 0 18px rgba(30,58,138,0.10)",
  }}
>
  {h1Title}
</h1>
          <p className={`mx-auto max-w-[560px] text-[clamp(0.9rem,1.8vw,1.05rem)] leading-[1.9] ${isDark ? "text-[#64748B]" : "text-[#475569]"}`}>برای انتقاد، پیشنهاد و ارتباط با تیم پاراهور، از مسیرهای ارتباطی زیر با ما در تماس باشید.</p>
          <div className={`mt-8 flex items-center justify-center gap-5 ${isDark ? "text-[#334155]" : "text-[#64748B]"}`}>
            {["رمزنگاری سرتاسری", "بدون ذخیره‌سازی ابری", "پروتکل PGP"].map((label) => <div key={label} className="flex items-center gap-1.5 text-[0.72rem]"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={themeBlue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg><span>{label}</span></div>)}
          </div>
        </div>
      </motion.section>

      {/* CONTACT CHANNELS */}
     {/* CONTACT CHANNELS */}
<motion.section
  className="contact-channels px-6 pb-16 md:px-12"
  initial={{ opacity: 0, y: 28 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.15 }}
  transition={{ duration: 0.65, ease: "easeOut" }}
>
  <div className="mx-auto max-w-5xl">
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {channels.map((ch, i) => {
        const isHov = hoveredCard === i;
        const ac = isHov && ch.hoverColor ? ch.hoverColor : ch.accentColor;
        const crisis = ch.urgent;

        return (
          <div
            key={i}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`contact-channel-card group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
              isDark
                ? "bg-white/[0.028] shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                : "border-[#1E3A8A]/[0.13] bg-white shadow-[0_8px_26px_rgba(15,23,42,0.055)] hover:-translate-y-[2px] hover:shadow-[0_14px_34px_rgba(30,58,138,0.15)]"
            } ${
              crisis && !isDark
                ? "hover:shadow-[0_14px_34px_rgba(153,27,27,0.15)]"
                : ""
            }`}
            style={{
              borderColor: isDark
                ? isHov
                  ? `${ac}45`
                  : `${ac}18`
                : undefined,
              background: isDark && isHov ? `${ac}09` : undefined,
              boxShadow:
                isDark && isHov
                  ? `0 16px 48px rgba(0,0,0,0.4), 0 0 30px ${ac}10`
                  : undefined,
            }}
          >
            <div
              className="h-0.5 transition-opacity duration-300"
              style={{
                background: `linear-gradient(90deg,transparent,${ac}90,transparent)`,
                opacity: isHov ? 1 : 0.4,
              }}
            />

            {crisis && (
              <div
                className={`absolute left-4 top-4 flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                  isDark
                    ? "border-[#EF4444]/30 bg-[#EF4444]/[0.12] text-[#EF4444]"
                    : "border-[#991B1B]/22 bg-[#991B1B]/[0.045] text-[#991B1B]"
                }`}
              >
                <PulseDot
                  size={5}
                  color={isDark ? "#EF4444" : "#991B1B"}
                />
                فوری
              </div>
            )}

            <div className="flex flex-1 flex-col p-7">
              <span
                className="mb-4 block font-mono text-[0.58rem] tracking-[0.14em]"
                style={{ color: `${ac}70` }}
              >
                {ch.badge}
              </span>

              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-[1.04] ${
                  isDark
                    ? "bg-white/[0.03]"
                    : "border-[#1E3A8A]/15 bg-[#1E3A8A]/[0.055] group-hover:bg-[#1E3A8A]/[0.09] group-hover:shadow-[0_10px_24px_rgba(30,58,138,0.10)]"
                }`}
                style={{
                  borderColor: isDark ? `${ac}25` : undefined,
                  background: isDark ? `${ac}0d` : undefined,
                }}
              >
                {ch.icon}
              </div>

              <h3
                className={`mb-2 text-[1.02rem] font-bold transition-colors duration-300 ${
                  isDark
                    ? "text-[#E2E8F0] group-hover:text-white"
                    : "text-[#0F172A] group-hover:text-[#1E3A8A]"
                }`}
              >
                {ch.title}
              </h3>

              <p
                className={`flex-grow text-[0.82rem] leading-[1.75] ${
                  isDark ? "text-[#475569]" : "text-[#64748B]"
                }`}
              >
                {ch.desc}
              </p>

              <div
                className={`mb-4 mt-5 rounded-xl border px-4 py-3 ${
                  isDark
                    ? "border-white/[0.06] bg-white/[0.03]"
                    : "border-[#1E3A8A]/10 bg-[#F8FAFC]"
                }`}
              >
                <span
                  className={`mb-1 block text-[0.65rem] ${
                    isDark ? "text-[#334155]" : "text-[#64748B]"
                  }`}
                >
                  {ch.valueLabel}
                </span>

                <span
                  className="block text-right font-mono text-[0.88rem] font-semibold"
                  style={{
                    color: ac,
                    direction: "ltr",
                  }}
                >
                  {ch.value}
                </span>
              </div>

              {ch.href ? (
                <a
                  href={ch.href}
                  target={ch.href.startsWith("http") ? "_blank" : undefined}
                  rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`w-full rounded-xl border py-2.5 text-center text-sm font-semibold transition-all duration-300 ${
                    isDark
                      ? "bg-[#00E5FF]/[0.06] text-[#00E5FF] hover:bg-[#00E5FF]/[0.13] hover:shadow-[0_8px_20px_rgba(0,229,255,0.10)]"
                      : "border-[#1E3A8A]/20 bg-[#1E3A8A]/[0.045] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white hover:shadow-[0_8px_18px_rgba(30,58,138,0.14)]"
                  }`}
                  style={{ borderColor: isDark ? `${ac}30` : undefined }}
                >
                  {ch.actionLabel}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={ch.action}
                  className={`w-full rounded-xl border py-2.5 text-sm font-semibold transition-all duration-300 ${
                    isDark
                      ? "bg-[#EF4444]/[0.06] text-[#EF4444] hover:bg-[#EF4444]/[0.13] hover:shadow-[0_8px_20px_rgba(239,68,68,0.10)]"
                      : "border-[#991B1B]/22 bg-[#991B1B]/[0.045] text-[#991B1B] hover:bg-[#991B1B] hover:text-white hover:shadow-[0_8px_18px_rgba(153,27,27,0.14)]"
                  }`}
                  style={{ borderColor: isDark ? `${ac}30` : undefined }}
                >
                  {ch.actionLabel}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</motion.section>

      {crisisOpen && <EmergencyModal onClose={() => setCrisisOpen(false)} />}

      {/* CONTACT FORM */}
      <motion.section className={`contact-form-section border-y px-6 py-16 md:px-12 ${isDark ? "border-[#00E5FF]/[0.06] bg-[#060B19]/50" : "border-[#1E3A8A]/[0.08] bg-[#F8FAFC]"}`} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, ease: "easeOut" }}>
        <div className="mx-auto max-w-5xl"><div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-16">
          <div className="contact-form-info w-full flex-shrink-0 lg:w-72">
            <div className="mb-5 flex items-center gap-3"><div className={`h-[22px] w-[3px] rounded-sm bg-gradient-to-b ${isDark ? "from-[#00E5FF] to-[#00E5FF]/10" : "from-[#1E3A8A] to-[#1E3A8A]/10"}`} /><span className={`font-mono text-[0.62rem] tracking-[0.18em] ${isDark ? "text-[#00E5FF]/40" : "text-[#1E3A8A]/52"}`}>SUPPORT CHANNEL</span></div>
            <h2 className={`mb-4 text-[clamp(1.1rem,2.5vw,1.5rem)] font-bold leading-[1.4] ${isDark ? "text-white" : "text-[#0F172A]"}`}>انتقادات و پیشنهادات و همکاری با ما</h2>
            <p className={`text-[0.85rem] leading-[1.85] ${isDark ? "text-[#475569]" : "text-[#64748B]"}`}>این بخش برای دریافت انتقادات، پیشنهادات و درخواست‌های همکاری است. گزارش‌های بحران و پرونده‌ها فقط از طریق فرم اورژانسی ثبت می‌شوند.</p>
            <div className="mt-6 space-y-3">{[{label:"انتقاد و بازخورد",time:"بررسی می‌شود"},{label:"پیشنهاد و ایده",time:"بررسی می‌شود"},{label:"همکاری با ما",time:"بررسی می‌شود"}].map(({label,time})=><div key={label} className={`flex w-1/2 items-center justify-between rounded-xl border px-4 py-3 transition-all duration-300  lg:w-full ${isDark ? "border-[#00E5FF]/15 bg-white/[0.02] hover:border-[#00E5FF]/40 hover:shadow-[0_8px_20px_rgba(0,229,255,0.05)]" : "border-[#1E3A8A]/18 bg-white shadow-[0_4px_14px_rgba(15,23,42,0.035)] hover:border-[#1E3A8A]/40 hover:shadow-[0_8px_20px_rgba(30,58,138,0.07)]"}`}><span className={`text-[0.78rem] ${isDark ? "text-[#475569]" : "text-[#64748B]"}`}>{label}</span><span className={`text-[0.72rem] font-bold ${isDark ? "text-[#00E5FF]" : "text-[#1E3A8A]"}`}>{time}</span></div>)}</div>
          </div>
          <div className="contact-form-wrap w-full flex-1"><div className={`contact-form-card relative overflow-hidden rounded-2xl border transition-all duration-300 ${isDark ? "border-[#00E5FF]/25 bg-white/[0.025] backdrop-blur-[10px] hover:shadow-[0_18px_42px_rgba(0,0,0,0.38),0_12px_28px_rgba(0,229,255,0.11)]" : "border-[#1E3A8A]/28 bg-white shadow-[0_16px_42px_rgba(15,23,42,0.07)] hover:shadow-[0_18px_42px_rgba(15,23,42,0.07),0_12px_28px_rgba(30,58,138,0.13)]"}`}>
            <div className={`h-[1.5px] bg-gradient-to-r from-transparent ${isDark ? "via-[#00E5FF]/50" : "via-[#1E3A8A]/42"} to-transparent`} />
            <div className="p-7 md:p-8"><div className={`mb-5 flex items-center gap-2.5 rounded-xl border px-4 py-3 text-xs ${isDark ? "border-[#00E5FF]/[0.08] bg-[#00E5FF]/[0.03] text-[#475569]" : "border-[#1E3A8A]/10 bg-[#1E3A8A]/[0.035] text-[#475569]"}`}><IconWarning /><span>این فرم برای انتقاد، پیشنهاد و همکاری با ماست؛ برای گزارش بحران از فرم اورژانسی استفاده کنید.</span></div><ContactForm isDark={isDark} /></div>
          </div></div>
        </div></div>
      </motion.section>

{/* MAP */}
<motion.section
  className="contact-map-section px-6 py-16 md:px-12"
  initial={{ opacity: 0, y: 28 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.12 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
>
  <div className="mx-auto max-w-5xl">
    <div className="mb-8 flex items-center gap-3">
      <div
        className={`h-[22px] w-[3px] rounded-sm bg-gradient-to-b ${
          isDark
            ? "from-[#00E5FF] to-[#00E5FF]/10"
            : "from-[#1E3A8A] to-[#1E3A8A]/10"
        }`}
      />

      <span
        className={`font-mono text-[0.62rem] tracking-[0.18em] ${
          isDark ? "text-[#00E5FF]/40" : "text-[#1E3A8A]/52"
        }`}
      >
        LOCATION // BY APPOINTMENT ONLY
      </span>
    </div>

    <div
      className={`contact-map relative h-[clamp(300px,45vw,420px)] overflow-hidden rounded-2xl border transition-all duration-300 ${
        isDark
          ? "border-[#00E5FF]/30 hover:shadow-[0_18px_44px_rgba(0,0,0,0.40),0_12px_30px_rgba(0,229,255,0.12)]"
          : "border-[#1E3A8A]/28 bg-white shadow-[0_16px_38px_rgba(15,23,42,0.06)] hover:shadow-[0_18px_44px_rgba(15,23,42,0.08),0_12px_30px_rgba(30,58,138,0.14)]"
      }`}
    >
      <a
        href="https://www.google.com/maps/search/?api=1&query=Parahoor%20Tehranpars%20Tehran"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="باز کردن موقعیت دفتر مرکزی پاراهور در نقشه"
        className="absolute inset-0 z-10 block cursor-pointer"
      >
        <DarkMap lightMode={!isDark} />
      </a>

      <div className="contact-map-info absolute right-5 top-5 z-20 max-w-[300px] max-md:left-3 max-md:right-3 max-md:top-3 max-md:max-w-none">
        <div
          className={`relative overflow-hidden rounded-xl border px-5 py-4 backdrop-blur-[16px] transition-all duration-300 ${
            isDark
              ? "border-[#00E5FF]/30 bg-[#060B1C]/[0.93] shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(0,229,255,0.06)]"
              : "border-[#1E3A8A]/15 bg-white/[0.96] text-[#0F172A] shadow-[0_12px_28px_rgba(15,23,42,0.10)]"
          }`}
        >
          <div
            className={`absolute left-0 right-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent ${
              isDark ? "via-[#00E5FF]/60" : "via-[#1E3A8A]/55"
            } to-transparent`}
          />

          <div className="flex items-start gap-3">
            {/* Location icon — Light Mode: dark blue */}
            <div className="mt-0.5 shrink-0">
              <div
                className={
                  isDark
                    ? "[&_svg]:!stroke-[#00E5FF]"
                    : "[&_svg]:!stroke-[#1E3A8A]"
                }
              >
                <IconMapPin />
              </div>
            </div>

            <div>
              <span
                className={`mb-[5px] block font-mono text-[0.58rem] tracking-[0.14em] ${
                  isDark ? "text-[#00E5FF]/40" : "text-[#1E3A8A]/58"
                }`}
              >
                HEADQUARTERS
              </span>

              <h4
                className={`mb-1.5 text-sm font-bold ${
                  isDark ? "text-white" : "text-[#0F172A]"
                }`}
              >
                دفتر مرکزی: تهران، تهرانپارس
              </h4>

              <p
                className={`text-[0.75rem] leading-[1.75] ${
                  isDark ? "text-[#475569]" : "text-[#64748B]"
                }`}
              >
                مراجعه حضوری صرفاً با هماهنگی قبلی و تعیین وقت مشاوره امکان‌پذیر است.
              </p>

              <div
                className={`mt-3 flex items-center gap-1.5 text-xs ${
                  isDark ? "text-[#334155]" : "text-[#64748B]"
                }`}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isDark ? "#00E5FF" : "#1E3A8A"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>

                تهران، تهرانپارس، ایران
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Open in Maps */}
      <a
        href="https://www.google.com/maps/search/?api=1&query=Parahoor%20Tehranpars%20Tehran"
        target="_blank"
        rel="noopener noreferrer"
        className={`contact-map-open group absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all duration-300 ${
          isDark
            ? "border-[#00E5FF]/20 bg-[#060B1C]/90 text-[#00E5FF] shadow-[0_10px_26px_rgba(0,229,255,0.08)] hover:bg-[#00E5FF]/12 hover:shadow-[0_10px_24px_rgba(0,229,255,0.11)]"
            : "border-[#1E3A8A]/16 bg-white text-[#1E3A8A] shadow-[0_10px_26px_rgba(15,23,42,0.12)] hover:bg-[#1E3A8A] hover:text-white hover:shadow-[0_14px_30px_rgba(30,58,138,0.22)]"
        }`}
      >
        <span
          className={
            isDark
              ? "[&_svg]:!stroke-[#00E5FF]"
              : "[&_svg]:!stroke-[#1E3A8A] group-hover:[&_svg]:!stroke-white"
          }
        >
          <IconMapPin />
        </span>

        باز کردن در نقشه
      </a>

      {/* Zoom controls */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-1">
        {["+", "−"].map((s) => (
          <div
            key={s}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${
              isDark
                ? "border border-[#00E5FF]/15 bg-[#060B1C]/90 text-[#475569]"
                : "border border-[#1E3A8A]/12 bg-white/[0.94] text-[#1E3A8A] shadow-[0_6px_16px_rgba(15,23,42,0.08)]"
            }`}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  </div>
</motion.section>
    </div>
    </>
  );
}


