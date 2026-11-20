import { normalizePhone } from "@/lib/otp";

type ReportInfo = {
  trackingCode: string;
  service: string;
  phone: string;
};

/**
 * ارسال پیامک گزارش جدید به ادمین‌ها (با پترن فراز).
 * هیچ‌وقت ارور پرتاب نمی‌کنه، چون خرابی پیامک ادمین نباید ثبت گزارش رو خراب کنه.
 */
export async function notifyAdminNewReport(info: ReportInfo) {
  const apiKey = process.env.FARAZ_API_KEY;
  const patternCode = process.env.FARAZ_ADMIN_PATTERN_CODE;

  const recipients = (process.env.ADMIN_NOTIFY_PHONES || "")
    .split(",")
    .map((p) => normalizePhone(p.trim()))
    .filter((p): p is string => Boolean(p));

  if (!apiKey || !patternCode || recipients.length === 0) {
    console.warn("Admin SMS skipped: env not configured");
    return;
  }



console.log("ADMIN SMS recipients:", recipients, "apiKey:", !!apiKey, "pattern:", !!patternCode);
  await Promise.allSettled(
    recipients.map(async (recipient) => {
      try {
        const res = await fetch("https://api.iranpayamak.com/ws/v1/sms/pattern", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Api-Key": apiKey,
          },
          body: JSON.stringify({
            code: patternCode,
            attributes: {
              code: info.trackingCode,
              service: info.service.slice(0, 30),
              phone: info.phone,
            },
            recipient,
            line_number: process.env.FARAZ_LINE_NUMBER,
            number_format: "english",
          }),
          signal: AbortSignal.timeout(5000),
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          console.error("Admin SMS error:", res.status, text.slice(0, 300));
        }
      } catch (err) {
        console.error("Admin SMS failed:", err);
      }
    })
  );
}