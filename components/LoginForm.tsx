"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginFormLayout from "../components/LoginFormLayout"
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface LoginFormData {
  email: string;
  password: string;
}


const helperText = {
  email: {
    required: "ایمیل الزامی است.",
    pattern: "لطفاً یک آدرس ایمیل معتبر وارد کنید.",
  },
  password: {
    required: "رمز عبور الزامی است.",
    minLength: "رمز عبور باید حداقل ۸ کاراکتر باشد.",
  },
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormData>();


  const onSubmit = async (data: LoginFormData) => {
    try {
      clearErrors();
      setLoading(true);
      

      const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      }),
    });

    const result = await response.json()
    // ۱. بررسی ناموفق بودن درخواست
    if (!response.ok) {
      const errorMessage = result.error || result.message || "ایمیل یا رمز عبور نامعتبر است";

      // ارور را به react-hook-form بده تا زیر فرم یا اینپوت نمایش داده شود
      setError("root", {
        type: "server",
        message: errorMessage,
      });
      return; // حتماً متوقف شود تا به مرحله ریدایرکت نرسد
    }


    reset()
    router.push("/")
    router.refresh(); // برای به‌روزرسانی وضعیت کوکی در Server Components
      
    } catch (error) {
      console.error("Login submission error:", error);
    setError("root", {
      type: "server",
      message: "خطای شبکه. لطفاً دوباره تلاش کنید.",
    });
    } finally {
      setLoading(false);
    }

  };

  return (



<div className="flex min-h-screen items-center justify-center w-[500px]">
  <div className="w-full max-w-[500px]">
  {/* <LoginFormLayout> */}



    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col gap-4 rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl">
        
        {/* ۱. اینپوت ایمیل */}
        <div className="flex w-full flex-col">
          <div className="relative flex h-12 w-full items-center">
<span className="pointer-events-none absolute left-4 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="آدرس ایمیل"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
              className={`h-full w-full rounded-xl border bg-slate-800/60 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-400 outline-none transition focus:bg-slate-800/90 focus:ring-4 autofill:shadow-[0_0_0px_1000px_rgb(30_41_59)_inset] autofill:[-webkit-text-fill-color:#f8fafc] ${
                errors.email
                  ? "border-red-500 focus:border-red-400 focus:ring-red-500/20"
                  : "border-slate-700/80 focus:border-blue-500 focus:ring-blue-500/20"
              }`}
            />
          </div>

          {errors.email && (
      <p className="mt-1 text-xs text-red-400">
        {errors.email.message ||
          helperText.email[errors.email.type as keyof typeof helperText.email] ||
          "ایمیل نامعتبر است"}
      </p>
    )}
        </div>

        {/* ۲. اینپوت پسورد همراه با چشم */}
        <div className="flex w-full flex-col">
          <div className="relative flex h-12 w-full items-center">
            <span className="pointer-events-none absolute left-4 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
              className={`h-full w-full rounded-xl border bg-slate-800/60 pl-11 pr-11 text-sm text-slate-100 placeholder-slate-400 outline-none transition focus:bg-slate-800/90 focus:ring-4 autofill:shadow-[0_0_0px_1000px_rgb(30_41_59)_inset] autofill:[-webkit-text-fill-color:#f8fafc] ${
                errors.password
                  ? "border-red-500 focus:border-red-400 focus:ring-red-500/20"
                  : "border-slate-700/80 focus:border-blue-500 focus:ring-blue-500/20"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-200 transition"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              )}
            </button>
          </div>

         {errors.email && (
      <p className="mt-1 text-xs text-red-400">
        {errors.email.message ||
          helperText.email[errors.email.type as keyof typeof helperText.email] ||
          "ایمیل نامعتبر است."}
      </p>
    )}
        </div>

        {/* دکمه ارسال / ورود */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 text-xs font-medium text-blue-400 transition hover:bg-blue-500/20 hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </div>


{/* رفتن به ثبت‌نام */}
<div className="mt-1 flex items-center justify-center">
  <p className="text-[13px] font-medium text-slate-500">
    حساب کاربری ندارید؟{" "}
    <Link
      href="/register"
      className="font-semibold text-sky-600 hover:text-sky-700 hover:underline transition-colors"
    >
      ثبت‌نام کنید.
    </Link>
  </p>
</div>



{/* ارورهایی که از روت می‌آیند و زیر فرم نمایش داده می‌شوند */}
 {errors.root && (
    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-xs text-red-400">
      {errors.root.message}
    </div>
  )}


      </div>
    </form>


  {/* </LoginFormLayout> */}
  </div>
</div>



  );
}
