"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import RegisterFormLayout from "./RegisterFormLayout"
import { useRouter } from "next/navigation";
type RegisterInputs = {
  username: string;
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
};

const inputClassName =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-4";


const helperText = {
  username: {
    required: "نام کاربری الزامی است.",
    minLength: "نام کاربری باید حداقل ۳ کاراکتر باشد.",
    maxLength: "نام کاربری نمی‌تواند بیشتر از ۲۰ کاراکتر باشد.",
    pattern: "فقط از حروف، اعداد و زیرخط استفاده کنید.",
  },

  email: {
    required: "ایمیل الزامی است.",
    pattern: "یک آدرس ایمیل معتبر وارد کنید.",
  },

  code: {
    required: "کد تأیید الزامی است.",
    pattern: "کد تأیید باید شامل ۶ رقم باشد.",
    validate: "کد تأیید نامعتبر است.",
  },

  password: {
    required: "رمز عبور الزامی است.",
    minLength: "رمز عبور باید حداقل ۸ کاراکتر باشد.",
    maxLength: "رمز عبور نمی‌تواند بیشتر از ۵۰ کاراکتر باشد.",
    pattern:
      "رمز عبور باید شامل حروف بزرگ، حروف کوچک، عدد و کاراکتر ویژه باشد.",
  },

  confirmPassword: {
    required: "لطفاً رمز عبور خود را تأیید کنید.",
    validate: "رمزهای عبور مطابقت ندارند.",
  },
}

export default function RegisterForm() {
  const [codeSent, setCodeSent] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [registering, setRegistering] = useState(false)

  const [countdown, setCountdown] = useState<number>(0);

  const router = useRouter()

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<RegisterInputs>({
    defaultValues: {
      username: "",
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
    },
  });


//تایمر معکوس 10 دقیقه 
useEffect(() => {
  if (countdown <= 0) return;

  const timer = setInterval(() => {
    setCountdown((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [countdown]);

const formatTimer = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};





  const onSubmit = async (data: RegisterInputs) => {
      clearErrors();
      setLoading(true)

     try {

        const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
    username: data.username,
    email: data.email,
    code: data.code,
    password: data.password
  }),
      });

      const result = await response.json();
      
      

      if (!response.ok) {
      const errorMsg = result.error || "ثبت‌نام ناموفق بود.";

      // ۱. اگر ارور مربوط به کد OTP بود (زیر اینپوت کد نمایش داده شود)
      if (errorMsg.toLowerCase().includes("code")) {
        setError("code", {
          type: "server",
          message: errorMsg,
        });
        return;
      }

      // ۳. سایر ارورهای عمومی (در بالای فرم نمایش داده شود)
      setError("root", {
        type: "server",
        message: errorMsg,
      });
      return;
    }



reset()
router.push("/")


    } catch (error) {
     console.error(error);
    setError("root", {
      type: "server",
      message: "خطای شبکه. لطفاً اتصال خود را بررسی کنید.",
    });      
    } finally {
      setLoading(false);
    }
}


const handleSendCode = async() => {
  try {
      const email = getValues("email");

   if (!email) {
      setError("email", {
        type: "manual",
        message: "لطفاً ابتدا آدرس ایمیل خود را وارد کنید.",
      });
      return;
    }

    setSendingCode(true)

    
    const response = await fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email}),
    });
    
    const data = await response.json();
    if (!response.ok) {
        setError("email", {
        type: "server",
        message: data.message || "ارسال کد تأیید ناموفق بود",
      });
      return;    }
    setCountdown(600)
    setCodeSent(true)

  } catch (error: unknown) {
    setError("email", {
      type: "server",
      message: "خطای شبکه. لطفاً دوباره تلاش کنید.",
    });
  } finally {
    setSendingCode(false);
  }
}




  return (



<div className="flex min-h-screen items-center justify-center w-[500px]">
  <div className="w-full max-w-[500px]">

  {/* <RegisterFormLayout> */}
  <form className="w-full" 
  onSubmit={handleSubmit(
    onSubmit,
    (errors) => {
      console.log("FORM VALIDATION ERRORS:", errors);
    }
  )}>

  <div className="flex w-full flex-col gap-4 rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl">
    



    {/* ۱. اینپوت نام کاربری */}
   <div className="flex w-full flex-col">
  <div className="relative flex h-12 w-full items-center">
    <span className="pointer-events-none absolute left-4 text-slate-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    </span>

    <input
      type="text"
      placeholder="نام کاربری"
      {...register("username", {
        required: true,
        minLength: 3,
        maxLength: 20,
        pattern: /^[a-zA-Z0-9_]+$/,
      })}
      className={`h-full w-full rounded-xl border bg-slate-800/60 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-400 outline-none transition focus:bg-slate-800/90 focus:ring-4 ${
        errors.username
          ? "border-red-500 focus:border-red-400 focus:ring-red-500/20"
          : "border-slate-700/80 focus:border-blue-500 focus:ring-blue-500/20"
      }`}
    />
  </div>

  {errors.username && (
  <p className="mt-1 text-xs text-red-400">
    {errors.username.message ||
      helperText.username[
        errors.username.type as keyof typeof helperText.username
      ] ||
      "نام کاربری نامعتبر است."}
  </p>
)}

</div>









    {/* ۲. اینپوت ایمیل */}
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

        className={`h-full w-full rounded-xl border border-slate-700/80 bg-slate-800/60 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-slate-800/90 focus:ring-4 focus:ring-blue-500/20 autofill:shadow-[0_0_0px_1000px_rgb(30_41_59)_inset] autofill:[-webkit-text-fill-color:#f8fafc] ${
      errors.email
        ? "border-red-500 focus:border-red-400"
        : "border-slate-700/80 focus:border-blue-500"
    }`}
      />
      </div>

 {errors.email && (
  <p className="mt-1 text-xs text-red-400">
    {errors.email.message ||
      helperText.email[
        errors.email.type as keyof typeof helperText.email
      ] ||
      "ایمیل نامعتبر است."}
  </p>
)}

    </div>









{/* send codd */}
{/* دکمه ارسال کد به ایمیل */}
<button
  type="button"
  onClick={handleSendCode}
  disabled={sendingCode || countdown > 0}
  className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 text-xs font-medium text-blue-400 transition hover:bg-blue-500/20 hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>
  {
    sendingCode 
    ? "در حال ارسال کد..."
    : countdown > 0
    ? `ارسال مجدد کد (${formatTimer(countdown)})`
    : codeSent
    ? "ارسال مجدد کد به ایمیل"
    : "ارسال کد تأیید"
  }
</button>









  {/* ۳. اینپوت کد تأیید (فقط عددی بدون فلش و اسپینر) */}
{codeSent && (
  <div className="flex w-full flex-col">
    <div className="relative flex h-12 w-full items-center">
      <span className="pointer-events-none absolute left-4 text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      </span>
      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        placeholder="کد ۶ رقمی"
        {...register("code", {
          required: true,
          pattern: /^\d{6}$/,
          onChange: (event) => {
            event.target.value = event.target.value.replace(/\D/g, "");
          },
        })}
        className={`h-full w-full rounded-xl border bg-slate-800/60 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-400 outline-none transition ${
          errors.code
            ? "border-red-500 ring-4 ring-red-500/20 focus:border-red-400 focus:ring-red-500/20"
            : "border-slate-700/80 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        }`}
      />
    </div>

    {errors.code && (
      <p className="mt-1 text-xs text-red-400">
        {errors.code.message ||
          helperText.code[errors.code.type as keyof typeof helperText.code] ||
          "کد نامعتبر است."}
      </p>
    )}
  </div>
)}

{/* ۴. اینپوت پسورد اول (همراه با دکمه چشم برای نمایش/مخفی‌سازی) */}
<div className="flex w-full flex-col">
  <div className="relative flex h-12 w-full items-center">
    <span className="pointer-events-none absolute left-4 text-slate-400">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    </span>

    <input
      type={show ? "text" : "password"}
      placeholder="رمز عبور"
      {...register("password", {
        required: true,
        minLength: 8,
        maxLength: 50,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*._\-+~])[A-Za-z\d!@#$%^&*._\-+~]{8,50}$/,
      })}
      className={`h-full w-full rounded-xl border border-slate-700/80 bg-slate-800/60 pl-11 pr-11 text-sm text-slate-100 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-slate-800/90 focus:ring-4 focus:ring-blue-500/20 autofill:shadow-[0_0_0px_1000px_rgb(30_41_59)_inset] autofill:[-webkit-text-fill-color:#f8fafc] ${
        errors.password
          ? "border-red-500 focus:border-red-400"
          : "border-slate-700/80 focus:border-blue-500"
      }`}
    />

    <button
      type="button"
      onClick={() => setShow((prev) => !prev)}
      className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-200 transition"
    >
      {show ? (
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

  {errors.password && (
    <p className="mt-1 text-xs text-red-400">
      {errors.password.message ||
        helperText.password[errors.password.type as keyof typeof helperText.password] ||
        "رمز عبور نامعتبر است."}
    </p>
  )}
</div>

{/* ۵. اینپوت تأیید پسورد */}
<div className="flex w-full flex-col">
  <div className="relative flex h-12 w-full items-center">
    <span className="pointer-events-none absolute left-4 text-slate-400">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    </span>
    <input
      type={show ? "text" : "password"}
      placeholder="تکرار رمز عبور"
      {...register("confirmPassword", {
        required: true,
        validate: (value) => value === getValues("password"),
      })}
      className={`h-full w-full rounded-xl border border-slate-700/80 bg-slate-800/60 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-slate-800/90 focus:ring-4 focus:ring-blue-500/20 autofill:shadow-[0_0_0px_1000px_rgb(30_41_59)_inset] autofill:[-webkit-text-fill-color:#f8fafc] ${
        errors.confirmPassword
          ? "border-red-500 focus:border-red-400"
          : "border-slate-700/80 focus:border-blue-500"
      }`}
    />
  </div>

  {errors.confirmPassword && (
    <p className="mt-1 text-xs text-red-400">
      {errors.confirmPassword.message ||
        helperText.confirmPassword[errors.confirmPassword.type as keyof typeof helperText.confirmPassword] ||
        "تکرار رمز عبور نامعتبر است."}
    </p>
  )}
</div>

<div>
  <button
    type="submit"
    disabled={registering}
    className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 text-xs font-medium text-blue-400 transition hover:bg-blue-500/20 hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
    {registering ? "در حال ایجاد..." : "ایجاد حساب"}
  </button>
</div>

{/* go to login */}
<div className="mt-1 flex items-center justify-center">
  <p className="text-[13px] font-medium text-slate-500">
    آیا قبلاً ثبت‌نام کرده‌اید؟{" "}
    <Link
      href="/login"
      className="font-semibold text-sky-600 hover:text-sky-700 hover:underline transition-colors"
    >
      ورود
    </Link>
  </p>
</div>

{/* ارور هایی که از روت میان و زیر فرم نمایش داده میشن */}
{errors.root && (
  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md text-center">
    {errors.root.message}
  </div>
)}

  </div>


    
  </form>
{/* </RegisterFormLayout> */}
</div>
</div>

  );
}
