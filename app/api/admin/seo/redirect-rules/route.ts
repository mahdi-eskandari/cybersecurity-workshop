// app/api/admin/seo/redirect-rules/route.ts   (مسیر ادمین، محافظت‌شده با میدلور)
import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";

import connectDB from "@/lib/mongodb";
import SeoRedirect from "../../../../model/SeoRedirect";
import PageSeo from "../../../../model/PageSeo";
import { isAdmin } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MatchType = "exact" | "regex";

const ALLOWED_STATUS = [301, 302, 307, 308, 410];
const MAX_PATTERN_LENGTH = 300;
const MAX_REASON_LENGTH = 300;

// الگوی Regex هرگز نباید این مسیرها را بگیرد (قفل شدن پنل یا خراب شدن سایت)
const PROTECTED_SAMPLES = [
  "/",
  "/admin",
  "/admin/redirects",
  "/api/admin/seo/redirect-rules",
  "/_next/static/chunk.js",
];

/* ─── helpers ─── */

function cleanPath(value: string): string {
  let v = (value || "").trim().split("#")[0].split("?")[0];
  try {
    v = decodeURIComponent(v);
  } catch {}
  return v.replace(/^\/+|\/+$/g, "").trim();
}

const withSlash = (clean: string) => `/${clean}`;
const isExternal = (v: string) => /^https?:\/\//i.test(v);

const fail = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status });

/** قانون‌های قدیمی فیلد matchType / isActive / reason ندارند؛ خروجی را یکدست می‌کنیم */
function normalizeRule(rule: any) {
  return {
    ...rule,
    matchType: rule.matchType === "regex" ? "regex" : "exact",
    isActive: rule.isActive !== false,
    reason: rule.reason ?? "",
  };
}

/** فقط قانون‌های «تطبیق دقیق» (شامل قانون‌های قدیمی بدون matchType) */
async function findExactRule(clean: string) {
  return SeoRedirect.findOne({
    matchType: { $ne: "regex" },
    fromPath: { $in: [clean, withSlash(clean)] },
  })
    .lean()
    .exec() as Promise<any>;
}

type ParsedTarget = { value: string; internal: string | null } | { error: string };

/**
 * مقصد: مسیر داخلی یا http(s)://
 * - exact: نرمال می‌شود (/path)
 * - regex: همان‌طور که وارد شده می‌ماند ($1 و ... حفظ می‌شود)
 */
function parseTarget(raw: string, keepRaw: boolean): ParsedTarget {
  const t = raw.trim();
  if (!t) return { error: "مسیر مقصد را وارد کنید." };

  if (isExternal(t)) {
    try {
      new URL(t.replace(/\$\d+/g, "x"));
    } catch {
      return { error: "آدرس مقصد معتبر نیست." };
    }
    return { value: t, internal: null };
  }

  if (t.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(t)) {
    return { error: "مقصد باید مسیر داخلی یا آدرس کامل http(s) باشد." };
  }

  const noHash = t.split("#")[0];
  const q = noHash.indexOf("?");
  const pathPart = q === -1 ? noHash : noHash.slice(0, q);
  const query = q === -1 ? "" : noHash.slice(q);

  if (keepRaw) {
    const p = pathPart.startsWith("/") ? pathPart : `/${pathPart}`;
    return { value: p + query, internal: p };
  }

  const clean = cleanPath(pathPart);
  return { value: withSlash(clean) + query, internal: clean };
}

function validateRegex(pattern: string): { regex: RegExp } | { error: string } {
  if (!pattern) return { error: "مسیر قدیمی را وارد کنید." };
  if (pattern.length > MAX_PATTERN_LENGTH) {
    return { error: `طول الگو نباید بیشتر از ${MAX_PATTERN_LENGTH} کاراکتر باشد.` };
  }
  // جلوگیری از الگوهای مستعد ReDoS مثل (a+)+
  if (/\([^)]*[+*][^)]*\)\s*[+*{]/.test(pattern)) {
    return { error: "الگو بیش‌ازحد پیچیده است (تکرار تو در تو). آن را ساده‌تر کنید." };
  }
  try {
    return { regex: new RegExp(pattern) };
  } catch {
    return { error: "عبارت منظم (Regex) معتبر نیست." };
  }
}

/** مسیر همه‌ی صفحاتی که الان فعال‌اند (برای جلوگیری از ریدایرکت صفحه‌ی زنده) */
async function getLivePaths(): Promise<string[]> {
  const pages = (await PageSeo.find({})
    .select("slug pageKey")
    .limit(5000)
    .lean()
    .exec()) as any[];

  const paths: string[] = [];
  for (const p of pages) {
    const slug = String(p?.slug || "").replace(/^\/+|\/+$/g, "");
    if (!slug) continue;
    if (/^author-/.test(String(p?.pageKey || ""))) paths.push(`/authors/${slug}`);
    else paths.push(`/${slug}`);
  }
  return paths;
}

/* ─── GET ─── */

export async function GET() {
  try {
// اول هر تابع، داخل try:
if (!(await isAdmin())) {
  return NextResponse.json({ success: false, message: "دسترسی غیرمجاز" }, { status: 403 });
}

    await connectDB();
    const rules = await SeoRedirect.find({}).sort({ createdAt: -1 }).lean().exec();
    return NextResponse.json({ success: true, rules: rules.map(normalizeRule) });
  } catch (error) {
    console.error("GET redirect-rules error:", error);
    return fail("دریافت ریدایرکت‌ها انجام نشد.", 500);
  }
}

/* ─── POST ─── */

export async function POST(request: NextRequest) {
  try {
// اول هر تابع، داخل try:
if (!(await isAdmin())) {
  return NextResponse.json({ success: false, message: "دسترسی غیرمجاز" }, { status: 403 });
}

    await connectDB();

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return fail("درخواست نامعتبر است.");

    const statusCode = Number(body.statusCode);
    if (!ALLOWED_STATUS.includes(statusCode)) return fail("کد وضعیت نامعتبر است.");

    const matchType: MatchType = body.matchType === "regex" ? "regex" : "exact";
    const isActive = body.isActive !== false;
    const reason = String(body.reason ?? "").trim().slice(0, MAX_REASON_LENGTH);
    const rawFrom = String(body.fromPath ?? "");
    const rawTo = String(body.toPath ?? "");
    const is410 = statusCode === 410;

    // مقصد
    let toValue = "";
    let toInternal: string | null = null;
    if (!is410) {
      const parsed = parseTarget(rawTo, matchType === "regex");
      if ("error" in parsed) return fail(parsed.error);
      toValue = parsed.value;
      toInternal = parsed.internal;
    }

    /* ───── Regex ───── */
    if (matchType === "regex") {
      const pattern = rawFrom.trim();
      const checked = validateRegex(pattern);
      if ("error" in checked) return fail(checked.error);
      const { regex } = checked;

      if (PROTECTED_SAMPLES.some((p) => regex.test(p))) {
        return fail("این الگو مسیرهای محافظت‌شده (صفحه اصلی، admin، api) را هم شامل می‌شود. دقیق‌ترش کنید.");
      }

      const hit = (await getLivePaths()).find((p) => regex.test(p));
      if (hit) {
        return fail(`این الگو صفحه‌ی فعال ${hit} را هم شامل می‌شود. الگو را دقیق‌تر کنید.`);
      }

      if (!is410) {
        // ارجاع $n نباید از تعداد گروه‌های الگو بیشتر باشد
        const groups = (new RegExp(`${pattern}|`).exec("") || []).length - 1;
        const refs = (toValue.match(/\$\d+/g) || []).map((s) => Number(s.slice(1)));
        const maxRef = refs.length ? Math.max(...refs) : 0;
        if (maxRef > groups) {
          return fail(`مقصد از $${maxRef} استفاده کرده ولی الگو فقط ${groups} گروه دارد.`);
        }

        // مقصد داخلی نباید خودش با الگو تطبیق پیدا کند (حلقه)
        if (toInternal !== null && regex.test(toInternal.replace(/\$\d+/g, "x"))) {
          return fail("مسیر مقصد خودش با الگو تطابق دارد و حلقه (loop) ایجاد می‌کند.");
        }
      }

      const duplicate = await SeoRedirect.findOne({ matchType: "regex", fromPath: pattern })
        .lean()
        .exec();
      if (duplicate) return fail("برای این الگو قبلاً قانون ثبت شده؛ اول آن را حذف کنید.", 409);

      const rule = await SeoRedirect.create({
        fromPath: pattern,
        toPath: toValue,
        statusCode,
        matchType,
        isActive,
        reason,
      });
      return NextResponse.json({ success: true, rule: normalizeRule(rule.toObject()) });
    }

    /* ───── Exact ───── */
    if (isExternal(rawFrom)) return fail("مسیر قدیمی را بدون دامنه وارد کنید. مثال: /old-url");

    const from = cleanPath(rawFrom);
    if (!from) return fail("مسیر قدیمی را وارد کنید (صفحه اصلی قابل ریدایرکت نیست).");
    if (/^(admin|api|_next)(\/|$)/.test(from)) return fail("این مسیر قابل ریدایرکت نیست.");

    // صفحاتی که الان slug فعلی‌شان هستند
    const livePage = await PageSeo.exists({ slug: from });
    const liveAuthor = from.startsWith("authors/")
      ? await PageSeo.exists({
          pageKey: { $regex: /^author-/ },
          slug: from.slice("authors/".length),
        })
      : null;
    if (livePage || liveAuthor) {
      return fail("این مسیر الان یک صفحه‌ی فعال است. اول Route آن را از بالا تغییر دهید.");
    }

    if (!is410 && toInternal !== null) {
      if (from === toInternal) return fail("مسیر مقصد نباید با مسیر قدیمی یکی باشد.");

      // جلوگیری از حلقه: A -> B -> ... -> A
      let current = toInternal;
      for (let i = 0; i < 10; i++) {
        if (current === from) return fail("این ریدایرکت حلقه (loop) ایجاد می‌کند.");
        const next = await findExactRule(current);
        if (!next || !next.toPath || next.statusCode === 410 || isExternal(String(next.toPath))) break;
        current = cleanPath(String(next.toPath));
      }
    }

    if (await findExactRule(from)) {
      return fail("برای این مسیر قبلاً قانون ثبت شده؛ اول آن را حذف کنید.", 409);
    }

    const rule = await SeoRedirect.create({
      fromPath: withSlash(from),
      toPath: toValue,
      statusCode,
      matchType,
      isActive,
      reason,
    });

    return NextResponse.json({ success: true, rule: normalizeRule(rule.toObject()) });
  } catch (error) {
    console.error("POST redirect-rules error:", error);
    return fail("ذخیره انجام نشد.", 500);
  }
}

/* ─── PATCH (فعال / غیرفعال کردن) ─── */

export async function PATCH(request: NextRequest) {
  try {
// اول هر تابع، داخل try:
if (!(await isAdmin())) {
  return NextResponse.json({ success: false, message: "دسترسی غیرمجاز" }, { status: 403 });
}

    await connectDB();

    const body = await request.json().catch(() => null);
    const id = String(body?.id ?? "");
    if (!id || !isValidObjectId(id)) return fail("شناسه نامعتبر است.");
    if (typeof body?.isActive !== "boolean") return fail("وضعیت نامعتبر است.");

    const rule = await SeoRedirect.findByIdAndUpdate(
      id,
      { $set: { isActive: body.isActive } },
      { new: true }
    )
      .lean()
      .exec();

    if (!rule) return fail("قانون پیدا نشد.", 404);
    return NextResponse.json({ success: true, rule: normalizeRule(rule) });
  } catch (error) {
    console.error("PATCH redirect-rules error:", error);
    return fail("تغییر وضعیت انجام نشد.", 500);
  }
}

/* ─── DELETE ─── */

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const id = request.nextUrl.searchParams.get("id");
    if (!id || !isValidObjectId(id)) return fail("شناسه نامعتبر است.");

    const deleted = await SeoRedirect.findByIdAndDelete(id).lean().exec();
    if (!deleted) return fail("قانون پیدا نشد.", 404);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE redirect-rules error:", error);
    return fail("حذف انجام نشد.", 500);
  }
}
