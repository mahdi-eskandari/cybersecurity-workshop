// app/api/admin/seo/site/route.ts   (مسیر ادمین، محافظت‌شده با میدلور)
import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import SiteSeo from "@/app/model/SiteSeo";
import { clearSiteSeoCache } from "@/lib/siteSeo";
import {
  MAX_ROBOTS_TEXT_LENGTH,
  normalizeSiteSeo,
  parseDisallowLines,
  parseBrandFields,
} from "@/lib/siteSeoShared";
import { isAdmin } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fail = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status });

export async function GET() {
  try {
// اول هر تابع، داخل try:
if (!(await isAdmin())) {
  return NextResponse.json({ success: false, message: "دسترسی غیرمجاز" }, { status: 403 });
}

    await connectDB();

    const doc = await SiteSeo.findOne({ key: "site" }).lean().exec();

    return NextResponse.json({
      success: true,
      settings: normalizeSiteSeo(doc),
    });
  } catch (error) {
    console.error("GET /api/admin/seo/site error:", error);
    return fail("دریافت تنظیمات سراسری انجام نشد.", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
// اول هر تابع، داخل try:
if (!(await isAdmin())) {
  return NextResponse.json({ success: false, message: "دسترسی غیرمجاز" }, { status: 403 });
}

    await connectDB();

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return fail("درخواست نامعتبر است.");

    const disallow = parseDisallowLines(body.extraDisallow);
    if ("error" in disallow) return fail(disallow.error);

    const robotsCustomText = String(body.robotsCustomText ?? "").trim();
    if (robotsCustomText.length > MAX_ROBOTS_TEXT_LENGTH) {
      return fail(
        `متن robots.txt نباید بیشتر از ${MAX_ROBOTS_TEXT_LENGTH} کاراکتر باشد.`
      );
    }

        const brand = parseBrandFields(body);
    if ("error" in brand) return fail(brand.error);

    const next = {
      noindexAll: body.noindexAll === true,
      globalNoindex: body.globalNoindex === true,
      globalNofollow: body.globalNofollow === true,
      robotsDisallowAll: body.robotsDisallowAll === true,
      includeSitemap: body.includeSitemap !== false,
      extraDisallow: disallow.lines,
      robotsCustomText,
            ...brand.value,
    };

    const saved = await SiteSeo.findOneAndUpdate(
      { key: "site" },
      { $set: next },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .lean()
      .exec();

    clearSiteSeoCache();

    return NextResponse.json({
      success: true,
      message: "تنظیمات سراسری با موفقیت ذخیره شد.",
      settings: normalizeSiteSeo(saved),
    });
  } catch (error) {
    console.error("POST /api/admin/seo/site error:", error);
    return fail("ذخیره انجام نشد.", 500);
  }
}
