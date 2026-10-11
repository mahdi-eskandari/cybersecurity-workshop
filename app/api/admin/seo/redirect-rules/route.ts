// app/api/admin/seo/redirect-rules/route.ts   (فایل جدید - مسیر ادمین، محافظت‌شده با میدلور)
import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import SeoRedirect from "../../../../model/SeoRedirect";
import PageSeo from "../../../../model/PageSeo";

export const runtime = "nodejs";

const ALLOWED_STATUS = [301, 302, 307, 308, 410];

function cleanPath(value: string): string {
  let v = (value || "").trim().split("#")[0].split("?")[0];
  try {
    v = decodeURIComponent(v);
  } catch {}
  return v.replace(/^\/+|\/+$/g, "").trim();
}

const withSlash = (clean: string) => `/${clean}`;

const fail = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status });

async function findRule(clean: string) {
  return SeoRedirect.findOne({
    fromPath: { $in: [clean, withSlash(clean)] },
  })
    .lean()
    .exec() as Promise<any>;
}

export async function GET() {
  try {
    await connectDB();
    const rules = await SeoRedirect.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return NextResponse.json({ success: true, rules });
  } catch (error) {
    console.error("GET redirect-rules error:", error);
    return fail("دریافت ریدایرکت‌ها انجام نشد.", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json().catch(() => null);
    if (!body) return fail("درخواست نامعتبر است.");

    const statusCode = Number(body.statusCode);
    if (!ALLOWED_STATUS.includes(statusCode)) {
      return fail("کد وضعیت نامعتبر است.");
    }

    const rawFrom = String(body.fromPath || "");
    const rawTo = String(body.toPath || "");

    if (/^https?:\/\//i.test(rawFrom) || /^https?:\/\//i.test(rawTo)) {
      return fail("مسیرها را بدون دامنه وارد کنید. مثال: /old-url");
    }

    const from = cleanPath(rawFrom);
    const to = statusCode === 410 ? "" : cleanPath(rawTo);

    if (!from) return fail("مسیر قدیمی را وارد کنید (صفحه اصلی قابل ریدایرکت نیست).");
    if (/^(admin|api|_next)(\/|$)/.test(from)) {
      return fail("این مسیر قابل ریدایرکت نیست.");
    }

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

    if (statusCode !== 410) {
      if (!to) return fail("مسیر مقصد را وارد کنید.");
      if (from === to) return fail("مسیر مقصد نباید با مسیر قدیمی یکی باشد.");

      // جلوگیری از حلقه: A -> B -> ... -> A
      let current = to;
      for (let i = 0; i < 10; i++) {
        if (current === from) return fail("این ریدایرکت حلقه (loop) ایجاد می‌کند.");
        const next = await findRule(current);
        if (!next || !next.toPath || next.statusCode === 410) break;
        current = cleanPath(String(next.toPath));
      }
    }

    if (await findRule(from)) {
      return fail("برای این مسیر قبلاً قانون ثبت شده؛ اول آن را حذف کنید.", 409);
    }

    const rule = await SeoRedirect.create({
      fromPath: withSlash(from),
      toPath: to ? withSlash(to) : "",
      statusCode,
    });

    return NextResponse.json({ success: true, rule });
  } catch (error) {
    console.error("POST redirect-rules error:", error);
    return fail("ذخیره انجام نشد.", 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return fail("شناسه نامعتبر است.");
    await SeoRedirect.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE redirect-rules error:", error);
    return fail("حذف انجام نشد.", 500);
  }
}
