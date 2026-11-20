import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SuccessClient from "./SuccessClient";

export const metadata: Metadata = {
  title: "گزارش شما ثبت شد",
  description:
    "گزارش شما در محیطی امن ثبت شد و کارآگاهان پاراهور به‌زودی با شما تماس می‌گیرند.",
  robots: { index: false, follow: false },
};

export default async function ReportSubmittedPage() {
  const cookieStore = await cookies();
  const trackingCode = cookieStore.get("report_submitted")?.value;

  // فقط کسی که گزارش ثبت کرده اجازه ورود دارد
  if (!trackingCode) {
    redirect("/");
  }

  return <SuccessClient trackingCode={trackingCode} />;
}
