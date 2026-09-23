"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-[#0A1128] px-6 text-[#E2E8F0]" style={{ fontFamily: "var(--font-vazirmatn), sans-serif" }}>
      <div className="w-full max-w-lg rounded-3xl border border-red-400/15 bg-[#07152d] p-8 text-center shadow-[0_25px_90px_rgba(0,0,0,.4)]">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-red-500/10 text-red-400 text-xl">!</div>
        <h1 className="mt-5 text-xl font-black text-white">خطایی در دریافت مقاله رخ داد</h1>
        <p className="mt-3 text-sm leading-7 text-slate-400">لطفاً دوباره تلاش کنید. اگر مشکل ادامه داشت، چند دقیقه بعد مجدداً وارد شوید.</p>
        <button onClick={() => reset()} className="mt-6 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-extrabold text-[#04101f] transition hover:bg-cyan-300">تلاش مجدد</button>
      </div>
    </div>
  );
}
