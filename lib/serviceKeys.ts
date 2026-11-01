export const SERVICE_KEYS = [
  "pentest",
  "ransomware",
  "forensics",
  "crypto",
  "identity",
  "threat-intel",
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const normalizeServiceKey = (v: unknown): ServiceKey | "" => {
  const s = typeof v === "string" ? v.trim() : "";
  return (SERVICE_KEYS as readonly string[]).includes(s) ? (s as ServiceKey) : "";
};

/* برای select پنل ادمین */
export const SERVICE_KEY_LABELS: Record<ServiceKey, string> = {
  pentest: "تست نفوذِ پسا-بحران",
  ransomware: "مقابله و مذاکره با باج‌افزارها",
  forensics: "فارنزیک و کالبدشکافی دیجیتال",
  crypto: "ردیابی رمزارز و تحلیل بلاک‌چین",
  identity: "هویت‌سنجی پنهان",
  "threat-intel": "هوش تهدیدات",
};

/* کلید نوع گزارش (مدال) ← متنی که تو دیتابیس/پنل ذخیره می‌شه */
export const INCIDENT_LABELS: Record<string, string> = {
  consulting: "مشاوره",
  crypto: "ردیابی رمزارز",
  identity: "کشف هویت پنهان",
  forensics: "کالبدشکافی دیجیتال",
  "device-surveillance": "شک به شنود یا هک شدن دیوایس",
  "online-fraud": "کلاهبرداری مالی و اینترنتی (فیشینگ، رسیدساز)",
  pentest: "تست نفوذ",
  impersonation: "جعل هویت و ساخت اکانت/پیج فیک",
  "threat-intel": "هوش تهدیدات",
  other: "سایر موارد",
  // قدیمی؛ تو مدال نشون داده نمی‌شه ولی کوکی‌های قدیمی خراب نشن
  ransomware: "مقابله با باج‌افزار",
};

export const isIncidentKey = (v: string) =>
  Object.prototype.hasOwnProperty.call(INCIDENT_LABELS, v);