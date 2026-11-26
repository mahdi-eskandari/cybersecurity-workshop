export const MAX_CANONICAL_LENGTH = 500;
export const MAX_OG_IMAGE_LENGTH = 500;
export const MAX_OG_ALT_LENGTH = 200;

type Parsed = { value: string } | { error: string };

/** خالی = خودکار | /path | http(s)://... */
export function parseCanonical(raw: unknown): Parsed {
  const v = String(raw ?? "").trim();
  if (!v) return { value: "" };

  if (v.length > MAX_CANONICAL_LENGTH)
    return { error: `Canonical نباید بیشتر از ${MAX_CANONICAL_LENGTH} کاراکتر باشد.` };
  if (/\s/.test(v)) return { error: "Canonical نباید فاصله داشته باشد." };

  if (v.startsWith("/")) {
    if (v.startsWith("//") || v.includes("\\"))
      return { error: "Canonical معتبر نیست." };
    return { value: v.split("#")[0] };
  }

  try {
    const url = new URL(v);
    if (url.protocol !== "http:" && url.protocol !== "https:")
      return { error: "Canonical باید با /، http:// یا https:// شروع شود." };
    url.hash = "";
    return { value: url.toString() };
  } catch {
    return { error: "Canonical باید مسیر داخلی (مثل /services) یا آدرس کامل باشد." };
  }
}

/** مسیر داخلی (/api/media/...) یا آدرس کامل http(s) */
export function parseOgImage(raw: unknown): Parsed {
  const v = String(raw ?? "").trim();
  if (!v) return { value: "" };
  if (v.length > MAX_OG_IMAGE_LENGTH)
    return { error: `آدرس تصویر نباید بیشتر از ${MAX_OG_IMAGE_LENGTH} کاراکتر باشد.` };

  const internal = v.startsWith("/") && !v.startsWith("//");
  const external = /^https?:\/\/\S+$/i.test(v);
  if (!internal && !external)
    return { error: "تصویر باید مسیر داخلی (/api/media/...) یا آدرس کامل http(s) باشد." };

  return { value: v };
}

export const cleanAlt = (raw: unknown) =>
  typeof raw === "string" ? raw.trim().slice(0, MAX_OG_ALT_LENGTH) : "";

/** canonical سفارشی اگر معتبر بود، وگرنه fallback */
export function resolveCanonical(
  custom: string | null | undefined,
  fallback: string,
  siteUrl: string
) {
  const v = (custom || "").trim();
  if (!v) return fallback;
  try {
    const url = new URL(v, siteUrl);
    if (url.protocol === "http:" || url.protocol === "https:") {
      url.hash = "";
      return url.toString();
    }
  } catch {}
  return fallback;
}

/** آدرس مطلق تصویر یا undefined */
export function resolveOgImage(
  value: string | null | undefined,
  siteUrl: string
): string | undefined {
  const v = (value || "").trim();
  if (!v) return undefined;
  if (/^https?:\/\//i.test(v)) return v;
  if (v.startsWith("/") && !v.startsWith("//")) return `${siteUrl.replace(/\/+$/, "")}${v}`;
  return undefined;
}