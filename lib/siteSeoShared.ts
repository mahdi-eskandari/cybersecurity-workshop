// lib/siteSeoShared.ts
// توابع خالص (بدون دیتابیس) — هم سرور و هم کلاینت می‌توانند ایمپورت کنند.

// همان قوانینی که قبلاً در app/robots.ts بود؛ تا وقتی ادمین چیزی تغییر ندهد
// خروجی robots.txt دقیقاً مثل قبل می‌ماند.
export const DEFAULT_DISALLOW = ["/*utm_", "/*profile", "/*?", "/*rsc"];

export type SiteSeoSettings = {
  /** کلید اصلی: noindex + nofollow + Disallow کل سایت */
  noindexAll: boolean;
  /** فقط متا robots = noindex روی همه‌ی صفحات */
  globalNoindex: boolean;
  /** فقط متا robots = nofollow روی همه‌ی صفحات */
  globalNofollow: boolean;
  /** فقط robots.txt = Disallow: / */
  robotsDisallowAll: boolean;
  /** خط Sitemap در robots.txt */
  includeSitemap: boolean;
  /** مسیرهای Disallow اضافه (هر کدام با /) */
  extraDisallow: string[];
  /** متن کامل robots.txt (خالی = تولید خودکار) */
  robotsCustomText: string;

    siteName: string;
  siteUrl: string;
  googleVerification: string;
  twitterHandle: string;
  orgEmail: string;
  orgPhone: string;
  defaultOgImage: string;
  defaultOgImageAlt: string;
};

export const SITE_SEO_DEFAULTS: SiteSeoSettings = {
  noindexAll: false,
  globalNoindex: false,
  globalNofollow: false,
  robotsDisallowAll: false,
  includeSitemap: true,
  extraDisallow: [],
  robotsCustomText: "",

    siteName: "",
  siteUrl: "",
  googleVerification: "",
  twitterHandle: "",
  orgEmail: "",
  orgPhone: "",
  defaultOgImage: "",
  defaultOgImageAlt: "",
};

export const MAX_EXTRA_DISALLOW = 200;
export const MAX_ROBOTS_TEXT_LENGTH = 5000;


const str = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export type BrandFields = Pick<
  SiteSeoSettings,
  | "siteName"
  | "siteUrl"
  | "googleVerification"
  | "twitterHandle"
  | "orgEmail"
  | "orgPhone"
  | "defaultOgImage"
  | "defaultOgImageAlt"
>;

/** اعتبارسنجی فیلدهای برند؛ مقدار تمیز یا خطا برمی‌گرداند */
export function parseBrandFields(
  input: any
): { value: BrandFields } | { error: string } {
  const siteName = str(input?.siteName, 100);
  const googleVerification = str(input?.googleVerification, 200);
  const twitterHandle = str(input?.twitterHandle, 40).replace(/^@+/, "");
  const orgEmail = str(input?.orgEmail, 200);
  const orgPhone = str(input?.orgPhone, 30);
  const defaultOgImage = str(input?.defaultOgImage, 500);
  const defaultOgImageAlt = str(input?.defaultOgImageAlt, 200);
  let siteUrl = str(input?.siteUrl, 300);

  if (siteUrl) {
    try {
      const u = new URL(siteUrl);
      if (u.protocol !== "http:" && u.protocol !== "https:") throw new Error();
      siteUrl = u.origin;
    } catch {
      return { error: "آدرس سایت باید با http:// یا https:// شروع شود." };
    }
  }

  if (googleVerification && !/^[A-Za-z0-9_-]{10,200}$/.test(googleVerification)) {
    return { error: "کد Google verification فقط باید خود مقدار content باشد (نه کل تگ)." };
  }

  if (twitterHandle && !/^[A-Za-z0-9_]{1,15}$/.test(twitterHandle)) {
    return { error: "آیدی توییتر معتبر نیست (بدون @، حداکثر 15 کاراکتر)." };
  }

  if (orgEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orgEmail)) {
    return { error: "ایمیل سازمان معتبر نیست." };
  }

  if (orgPhone && !/^\+?[0-9\s-]{5,20}$/.test(orgPhone)) {
    return { error: "تلفن سازمان معتبر نیست (مثال: +982188888888)." };
  }

  if (defaultOgImage) {
    const internal = defaultOgImage.startsWith("/") && !defaultOgImage.startsWith("//");
    const external = /^https?:\/\/\S+$/i.test(defaultOgImage);
    if (!internal && !external) {
      return { error: "تصویر Open Graph باید مسیر داخلی (/og.png) یا آدرس کامل باشد." };
    }
  }

  return {
    value: {
      siteName,
      siteUrl,
      googleVerification,
      twitterHandle,
      orgEmail,
      orgPhone,
      defaultOgImage,
      defaultOgImageAlt,
    },
  };
}

/** خروجی دیتابیس (یا undefined) → آبجکت کامل و تمیز */
export function normalizeSiteSeo(raw: any): SiteSeoSettings {
  const r = raw && typeof raw === "object" ? raw : {};

  return {
    noindexAll: r.noindexAll === true,
    globalNoindex: r.globalNoindex === true,
    globalNofollow: r.globalNofollow === true,
    robotsDisallowAll: r.robotsDisallowAll === true,
    includeSitemap: r.includeSitemap !== false,
    extraDisallow: Array.isArray(r.extraDisallow)
      ? r.extraDisallow.map((v: unknown) => String(v)).filter(Boolean)
      : [],
    robotsCustomText:
      typeof r.robotsCustomText === "string" ? r.robotsCustomText : "",

          siteName: str(r.siteName, 100),
    siteUrl: str(r.siteUrl, 300),
    googleVerification: str(r.googleVerification, 200),
    twitterHandle: str(r.twitterHandle, 40),
    orgEmail: str(r.orgEmail, 200),
    orgPhone: str(r.orgPhone, 30),
    defaultOgImage: str(r.defaultOgImage, 500),
    defaultOgImageAlt: str(r.defaultOgImageAlt, 200),
  };
}

/** ورودی متنی/آرایه‌ای Disallow → آرایه‌ی تمیز یا خطا */
export function parseDisallowLines(
  input: unknown
): { lines: string[] } | { error: string } {
  const arr: unknown[] = Array.isArray(input)
    ? input
    : String(input ?? "").split(/\r?\n/);

  if (arr.length > MAX_EXTRA_DISALLOW) {
    return { error: `حداکثر ${MAX_EXTRA_DISALLOW} مسیر مجاز است.` };
  }

  const lines: string[] = [];

  for (const item of arr) {
    const line = String(item ?? "").trim();
    if (!line) continue;

    if (!line.startsWith("/")) {
      return { error: `هر مسیر باید با / شروع شود: ${line.slice(0, 60)}` };
    }
    if (/\s/.test(line) || line.includes("#")) {
      return { error: `مسیر نباید فاصله یا # داشته باشد: ${line.slice(0, 60)}` };
    }
    if (line.length > 200) {
      return { error: "طول هر مسیر نباید بیشتر از 200 کاراکتر باشد." };
    }
    if (!lines.includes(line)) lines.push(line);
  }

  return { lines };
}

/**
 * مقدار متا robots که باید روی همه‌ی صفحات اضافه شود.
 * null = ادمین چیزی روشن نکرده؛ هیچ تغییری روی سایت اعمال نمی‌شود.
 */
export function resolveSiteRobotsMeta(s: SiteSeoSettings): string | null {
  const noindex = s.noindexAll || s.globalNoindex;
  const nofollow = s.noindexAll || s.globalNofollow;

  if (!noindex && !nofollow) return null;

  return `${noindex ? "noindex" : "index"}, ${nofollow ? "nofollow" : "follow"}`;
}

/** آیا سایت الان (از نظر robots.txt یا متا) برای گوگل بسته است؟ */
export function isSiteBlocked(s: SiteSeoSettings): boolean {
  return (
    s.noindexAll ||
    s.globalNoindex ||
    s.robotsDisallowAll
  );
}

/** متن نهایی robots.txt */
export function buildRobotsTxt(s: SiteSeoSettings, siteUrl: string): string {
  const base = siteUrl.replace(/\/+$/, "");
  const sitemapLine = `Sitemap: ${base}/sitemap.xml`;

  // بستن کل سایت همیشه از متن دلخواه جلوتره
  if (s.noindexAll || s.robotsDisallowAll) {
    return ["User-agent: *", "Disallow: /", ""].join("\n");
  }

  const custom = s.robotsCustomText.trim();

  if (custom) {
    // خط Host همیشه حذف می‌شود
    let text = custom
      .split(/\r?\n/)
      .filter((line) => !/^\s*host\s*:/i.test(line))
      .join("\n")
      .trim();

    if (s.includeSitemap && !/^\s*sitemap\s*:/im.test(text)) {
      text += `\n\n${sitemapLine}`;
    }

    return `${text}\n`;
  }

  const disallow = [...DEFAULT_DISALLOW];
  for (const path of s.extraDisallow) {
    if (!disallow.includes(path)) disallow.push(path);
  }

  const lines = ["User-agent: *", ...disallow.map((p) => `Disallow: ${p}`)];

  if (s.includeSitemap) {
    lines.push("", sitemapLine);
  }

  return `${lines.join("\n")}\n`;
}
