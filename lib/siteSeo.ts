// lib/siteSeo.ts  (فقط سمت سرور)
import connectDB from "./mongodb";
import SiteSeo from "../app/model/SiteSeo";
import {
  normalizeSiteSeo,
  SITE_SEO_DEFAULTS,
  type SiteSeoSettings,
} from "./siteSeoShared";

// کش کوتاه‌مدت تا layout روی هر درخواست دیتابیس نزند.
// از globalThis استفاده شده تا بین باندل‌های مختلف Next (layout / route) مشترک باشد.
const TTL_MS = 30_000;

type CacheEntry = { value: SiteSeoSettings; at: number };

const g = globalThis as unknown as { __siteSeoCache?: CacheEntry };

export async function getSiteSeo(): Promise<SiteSeoSettings> {
  const cached = g.__siteSeoCache;

  if (cached && Date.now() - cached.at < TTL_MS) {
    return cached.value;
  }

  try {
    await connectDB();

    const doc = await SiteSeo.findOne({ key: "site" }).lean().exec();
    const value = normalizeSiteSeo(doc);

    g.__siteSeoCache = { value, at: Date.now() };
    return value;
  } catch (error) {
    console.error("getSiteSeo error:", error);

    // Fail-safe: اگر دیتابیس مشکل داشت، چیزی بسته نمی‌شود.
    return cached?.value ?? SITE_SEO_DEFAULTS;
  }
}

export function clearSiteSeoCache() {
  g.__siteSeoCache = undefined;
}
